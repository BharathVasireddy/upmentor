import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define route patterns
const ADMIN_API_PATH = /^\/api\/admin\//
const MENTOR_API_PATH = /^\/api\/mentors\//
const USER_API_PATH = /^\/api\/users\//

// Public API routes that don't require authentication
const PUBLIC_API_ROUTES = [
  '/api/auth/register',
  '/api/auth/mentor-register',
  '/api/auth/verify-email',
  '/api/auth/resend-verification',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/session',
  '/api/auth/csrf',
  '/api/auth/providers',
  '/api/auth/callback',
  '/api/health',
  '/api/test-email',
]

// Public page routes (accessible by anyone)
const PUBLIC_PAGE_ROUTES = [
  '/',
  '/mentors',
  '/how-it-works',
  '/success-stories',
  '/privacy',
  '/terms',
  '/help',
  '/contact',
]

// Auth-only routes (redirect to dashboard if already authenticated)
const AUTH_ONLY_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/resend-verification',
]

// Protected routes (require authentication)
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/onboarding']

// Check if API route is public
function isPublicApiRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some(route => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1))
    }
    return pathname === route || pathname.startsWith(route + '/')
  })
}

// Check if page route is public
function isPublicPageRoute(pathname: string): boolean {
  return PUBLIC_PAGE_ROUTES.some(route => {
    return (
      pathname === route || (route !== '/' && pathname.startsWith(route + '/'))
    )
  })
}

// Check if route is auth-only (should redirect authenticated users away)
function isAuthOnlyRoute(pathname: string): boolean {
  return AUTH_ONLY_ROUTES.some(route => {
    return pathname === route || pathname.startsWith(route + '/')
  })
}

// Check if route is protected (requires authentication)
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    return pathname === route || pathname.startsWith(route + '/')
  })
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/_next/') ||
    pathname.includes('.') // Static files (images, favicon, etc.)
  ) {
    return NextResponse.next()
  }

  // Get authentication token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isAuthenticated = !!token

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // Allow public API routes without authentication
    if (isPublicApiRoute(pathname)) {
      return NextResponse.next()
    }

    // Require authentication for protected API routes
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Role-based access control for API routes
    const userRoles = (token.roles as string[]) || []

    if (ADMIN_API_PATH.test(pathname)) {
      if (!userRoles.includes('ADMIN')) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
    } else if (MENTOR_API_PATH.test(pathname)) {
      if (!userRoles.includes('MENTOR') && !userRoles.includes('ADMIN')) {
        return NextResponse.json(
          { error: 'Mentor access required' },
          { status: 403 }
        )
      }
    }

    return NextResponse.next()
  }

  // Handle page routes

  // Public routes - accessible by anyone
  if (isPublicPageRoute(pathname)) {
    return NextResponse.next()
  }

  // Auth-only routes - redirect authenticated users to dashboard
  if (isAuthOnlyRoute(pathname)) {
    if (isAuthenticated) {
      // Redirect authenticated users away from auth pages
      const redirectUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
  }

  // Protected routes - require authentication
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login with return URL
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if email is verified for protected routes
    if (!token.isVerified) {
      const verifyUrl = new URL('/verify-email', req.url)
      return NextResponse.redirect(verifyUrl)
    }

    // Check if onboarding is completed for certain routes
    if (pathname.startsWith('/dashboard') && !token.onboardingCompleted) {
      const onboardingUrl = new URL('/onboarding/academic-level', req.url)
      return NextResponse.redirect(onboardingUrl)
    }

    return NextResponse.next()
  }

  // For any other routes not explicitly defined, treat as protected
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
    '/api/(.*)',
  ],
}
