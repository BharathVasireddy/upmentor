import { prisma } from './prisma'
import { TokenType } from '@prisma/client'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { RoleType, VerificationStatus } from '@prisma/client'
import { Session } from 'next-auth'

// Generate secure random token
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Create verification token
export async function createVerificationToken(
  userId: string,
  type: TokenType,
  expiresInMinutes: number = 60
) {
  const token = generateSecureToken()
  const expires = new Date(Date.now() + expiresInMinutes * 60 * 1000)

  // Delete any existing tokens of the same type for this user
  await prisma.verificationToken.deleteMany({
    where: {
      userId,
      type,
    },
  })

  // Create new token
  const verificationToken = await prisma.verificationToken.create({
    data: {
      userId,
      token,
      type,
      expires,
    },
  })

  return verificationToken
}

// Send verification email using Resend
export async function sendVerificationEmail(email: string, token: string) {
  try {
    const { EmailService } = await import('./email')
    const success = await EmailService.sendVerificationEmail(email, token)
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`

    if (success) {
      console.log(`✅ Verification email sent to ${email}`)
    } else {
      console.error(`❌ Failed to send verification email to ${email}`)
    }

    return { success, verificationUrl }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, verificationUrl: null }
  }
}

// Send password reset email using Resend
export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const { EmailService } = await import('./email')
    const success = await EmailService.sendPasswordResetEmail(email, token)
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    if (success) {
      console.log(`✅ Password reset email sent to ${email}`)
    } else {
      console.error(`❌ Failed to send password reset email to ${email}`)
    }

    return { success, resetUrl }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, resetUrl: null }
  }
}

// Send welcome email using Resend
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { EmailService } = await import('./email')
    const success = await EmailService.sendWelcomeEmail(email, name)

    if (success) {
      console.log(`✅ Welcome email sent to ${email}`)
    } else {
      console.error(`❌ Failed to send welcome email to ${email}`)
    }

    return { success }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false }
  }
}

// Clean up expired tokens
export async function cleanupExpiredTokens() {
  const result = await prisma.verificationToken.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  })

  return result.count
}

// Helper function to check if account is locked
export async function isAccountLocked(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lockedUntil: true },
  })

  if (!user?.lockedUntil) return false

  // Check if lock has expired
  if (user.lockedUntil <= new Date()) {
    // Clear the lock
    await prisma.user.update({
      where: { id: userId },
      data: { lockedUntil: null, loginAttempts: 0 },
    })
    return false
  }

  return true
}

// Handle failed login attempts
export async function handleFailedLogin(userId: string): Promise<void> {
  const maxAttempts = 5
  const lockDuration = 15 * 60 * 1000 // 15 minutes

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { loginAttempts: true },
  })

  const attempts = (user?.loginAttempts || 0) + 1
  const lockUntil =
    attempts >= maxAttempts ? new Date(Date.now() + lockDuration) : null

  await prisma.user.update({
    where: { id: userId },
    data: {
      loginAttempts: attempts,
      lockedUntil: lockUntil,
    },
  })
}

// Reset login attempts on successful login
export async function resetLoginAttempts(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      loginAttempts: 0,
      lockedUntil: null,
      lastActive: new Date(),
    },
  })
}

// Role checking utilities
export function hasRole(session: Session | null, role: RoleType): boolean {
  if (!session?.user?.roles) return false
  return session.user.roles.includes(role)
}

export function hasAnyRole(
  session: Session | null,
  roles: RoleType[]
): boolean {
  if (!session?.user?.roles) return false
  return roles.some(role => session.user.roles.includes(role))
}

export function isAdmin(session: Session | null): boolean {
  return hasRole(session, 'ADMIN')
}

export function isMentor(session: Session | null): boolean {
  return hasRole(session, 'MENTOR')
}

export function isStudent(session: Session | null): boolean {
  return hasRole(session, 'STUDENT')
}

export function isSupport(session: Session | null): boolean {
  return hasRole(session, 'SUPPORT')
}

export function isApprovedMentor(session: Session | null): boolean {
  return (
    hasRole(session, 'MENTOR') &&
    session?.user?.mentorVerificationStatus === 'APPROVED'
  )
}

export function isPendingMentor(session: Session | null): boolean {
  return (
    hasRole(session, 'MENTOR') &&
    session?.user?.mentorVerificationStatus !== 'APPROVED'
  )
}

// Get primary user type for display purposes
export function getUserType(
  session: Session | null
): 'student' | 'mentor' | 'admin' | 'support' | null {
  if (!session?.user?.roles) return null

  const roles = session.user.roles

  // Priority order: ADMIN > SUPPORT > MENTOR > STUDENT
  if (roles.includes('ADMIN')) return 'admin'
  if (roles.includes('SUPPORT')) return 'support'
  if (roles.includes('MENTOR')) return 'mentor' // All mentors get mentor dashboard
  return 'student' // Default for STUDENT role or no roles
}

// Get mentor verification status for display purposes
export function getMentorStatus(
  session: Session | null
): 'pending' | 'approved' | 'rejected' | null {
  if (!session?.user?.mentorVerificationStatus) return null

  const status = session.user.mentorVerificationStatus

  if (status === 'APPROVED') return 'approved'
  if (status === 'REJECTED') return 'rejected'
  return 'pending' // All other statuses are considered pending
}

// Get dashboard redirect URL based on user roles
export function getDashboardUrl(session: Session | null): string {
  const userType = getUserType(session)

  switch (userType) {
    case 'admin':
      return '/admin/dashboard'
    case 'support':
      return '/support/dashboard'
    case 'mentor':
      return '/mentor/dashboard'
    case 'student':
    default:
      return '/dashboard'
  }
}

// Validate password strength
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Generate user-friendly error messages
export function getAuthErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    CredentialsSignin: 'Invalid email or password',
    EmailNotVerified: 'Please verify your email before signing in',
    AccountLocked:
      'Account is temporarily locked due to too many failed attempts',
    TokenExpired: 'Verification token has expired',
    TokenUsed: 'Verification token has already been used',
    UserNotFound: 'No account found with this email address',
    WeakPassword: 'Password does not meet security requirements',
  }

  return errorMessages[error] || 'An unexpected error occurred'
}
