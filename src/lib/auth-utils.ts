import { prisma } from './prisma'
import { TokenType } from '@prisma/client'
import crypto from 'crypto'

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

// Check if user account is locked
export async function isAccountLocked(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lockedUntil: true },
  })

  if (!user?.lockedUntil) return false

  return user.lockedUntil > new Date()
}

// Increment login attempts and lock account if necessary
export async function handleFailedLogin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { loginAttempts: true },
  })

  if (!user) return

  const newAttempts = user.loginAttempts + 1
  const maxAttempts = 5
  const lockDurationMinutes = 15

  let updateData: any = {
    loginAttempts: newAttempts,
  }

  // Lock account if max attempts reached
  if (newAttempts >= maxAttempts) {
    updateData.lockedUntil = new Date(
      Date.now() + lockDurationMinutes * 60 * 1000
    )
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  })
}

// Reset login attempts on successful login
export async function resetLoginAttempts(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      loginAttempts: 0,
      lockedUntil: null,
      lastActive: new Date(),
    },
  })
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
