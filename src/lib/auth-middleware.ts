import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { RoleType } from '@prisma/client'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    name: string
    roles: RoleType[]
    isVerified: boolean
    onboardingCompleted: boolean
    mentorVerificationStatus: string | null
  }
}

// Check if user has required role
export function hasRole(
  userRoles: RoleType[],
  requiredRole: RoleType
): boolean {
  return userRoles.includes(requiredRole)
}

// Check if user has any of the required roles
export function hasAnyRole(
  userRoles: RoleType[],
  requiredRoles: RoleType[]
): boolean {
  return requiredRoles.some(role => userRoles.includes(role))
}

// Check if user is admin
export function isAdmin(userRoles: RoleType[]): boolean {
  return hasRole(userRoles, 'ADMIN')
}

// Check if user is mentor
export function isMentor(userRoles: RoleType[]): boolean {
  return hasRole(userRoles, 'MENTOR')
}

// Check if user is student
export function isStudent(userRoles: RoleType[]): boolean {
  return hasRole(userRoles, 'STUDENT')
}

// Middleware to require authentication
export async function requireAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // Add user info to request
  const authenticatedReq = req as AuthenticatedRequest
  authenticatedReq.user = {
    id: token.userId,
    email: token.email!,
    name: token.name!,
    roles: token.roles,
    isVerified: token.isVerified,
    onboardingCompleted: token.onboardingCompleted,
    mentorVerificationStatus: token.mentorVerificationStatus,
  }

  return handler(authenticatedReq)
}

// Middleware to require specific role
export async function requireRole(
  req: NextRequest,
  requiredRole: RoleType,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireAuth(req, async authenticatedReq => {
    if (!hasRole(authenticatedReq.user!.roles, requiredRole)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }
    return handler(authenticatedReq)
  })
}

// Middleware to require any of the specified roles
export async function requireAnyRole(
  req: NextRequest,
  requiredRoles: RoleType[],
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireAuth(req, async authenticatedReq => {
    if (!hasAnyRole(authenticatedReq.user!.roles, requiredRoles)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }
    return handler(authenticatedReq)
  })
}

// Middleware to require admin role
export async function requireAdmin(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(req, 'ADMIN', handler)
}

// Middleware to require mentor role
export async function requireMentor(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(req, 'MENTOR', handler)
}

// Middleware to require student role
export async function requireStudent(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(req, 'STUDENT', handler)
}

// Middleware to require email verification
export async function requireEmailVerification(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireAuth(req, async authenticatedReq => {
    if (!authenticatedReq.user!.isVerified) {
      return NextResponse.json(
        { error: 'Email verification required' },
        { status: 403 }
      )
    }
    return handler(authenticatedReq)
  })
}

// Middleware to require completed onboarding
export async function requireOnboarding(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireAuth(req, async authenticatedReq => {
    if (!authenticatedReq.user!.onboardingCompleted) {
      return NextResponse.json(
        { error: 'Onboarding completion required' },
        { status: 403 }
      )
    }
    return handler(authenticatedReq)
  })
}

// Middleware to require mentor verification
export async function requireMentorVerification(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireMentor(req, async authenticatedReq => {
    if (authenticatedReq.user!.mentorVerificationStatus !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Mentor verification required' },
        { status: 403 }
      )
    }
    return handler(authenticatedReq)
  })
}

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now })
    return true
  }

  if (now - record.lastReset > windowMs) {
    record.count = 1
    record.lastReset = now
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Middleware with rate limiting
export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  maxRequests: number = 10,
  windowMs: number = 60000
): Promise<NextResponse> {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const identifier = `${ip}:${req.nextUrl.pathname}`

  if (!rateLimit(identifier, maxRequests, windowMs)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  return handler(req)
}
