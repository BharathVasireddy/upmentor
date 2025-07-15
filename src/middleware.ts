import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/resend-verification',
  '/api/auth',
  '/api/test-email',
  '/api/users/user-type',
  '/api/users/language-preferences',
  '/api/users/goals',
  '/api/users/complete-onboarding',
  '/_next',
  '/favicon.ico',
]

// Define auth routes (should redirect to dashboard if already authenticated)
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]

// Define onboarding routes
const onboardingRoutes = [
  '/onboarding',
  '/onboarding/user-type',
  '/onboarding/language-preferences',
  '/onboarding/goals',
]

// Helper to check if a path is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => {
    if (route === '/') return pathname === '/'
    return pathname.startsWith(route)
  })
}

// Helper to check if a path is an auth route
function isAuthRoute(pathname: string): boolean {
  return authRoutes.includes(pathname)
}

// Helper to check if a path is an onboarding route
function isOnboardingRoute(pathname: string): boolean {
  return onboardingRoutes.some(route => pathname.startsWith(route))
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  try {
    // Get the token from the request
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // If user is authenticated but trying to access auth routes, redirect to dashboard
    if (token && isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Allow public routes and API routes to pass through for unauthenticated users
    if (isPublicRoute(pathname)) {
      return NextResponse.next()
    }

    // If no token (not authenticated) and trying to access protected route
    if (!token) {
      // Redirect to login with callback URL
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check email verification for authenticated users
    if (!token.isVerified && !isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL('/verify-email', req.url))
    }

    // Check onboarding completion for authenticated users
    if (!token.onboardingCompleted && !isOnboardingRoute(pathname)) {
      const onboardingUrl = new URL('/onboarding/user-type', req.url)
      return NextResponse.redirect(onboardingUrl)
    }

    // If user has completed onboarding but is still on onboarding routes
    if (token.onboardingCompleted && isOnboardingRoute(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)

    // On error, redirect to login
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
