'use client'

import { useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireVerification?: boolean
  requireOnboarding?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireVerification = true,
  requireOnboarding = false,
  redirectTo,
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    // If authentication is required but user is not authenticated
    if (requireAuth && !session) {
      const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`
      router.push(redirectTo || loginUrl)
      return
    }

    // If user is authenticated but shouldn't be (e.g., on login page)
    if (!requireAuth && session) {
      router.push(redirectTo || '/dashboard')
      return
    }

    // If email verification is required but user is not verified
    if (
      requireAuth &&
      session &&
      requireVerification &&
      !session.user.isVerified
    ) {
      router.push('/verify-email')
      return
    }

    // If onboarding is required but user hasn't completed it
    if (
      requireAuth &&
      session &&
      requireOnboarding &&
      !session.user.onboardingCompleted
    ) {
      router.push('/onboarding/academic-level')
      return
    }
  }, [
    session,
    status,
    requireAuth,
    requireVerification,
    requireOnboarding,
    router,
    pathname,
    redirectTo,
  ])

  // Show loading spinner while session is loading
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  // Show loading when redirecting
  if (
    (requireAuth && !session) ||
    (!requireAuth && session) ||
    (requireAuth &&
      session &&
      requireVerification &&
      !session.user.isVerified) ||
    (requireAuth &&
      session &&
      requireOnboarding &&
      !session.user.onboardingCompleted)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Redirecting...
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Convenience components for common use cases
export function ProtectedRoute({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requireAuth={true} requireVerification={true}>
      {children}
    </AuthGuard>
  )
}

export function AuthOnlyRoute({ children }: { children: ReactNode }) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>
}

export function DashboardRoute({ children }: { children: ReactNode }) {
  return (
    <AuthGuard
      requireAuth={true}
      requireVerification={true}
      requireOnboarding={true}
    >
      {children}
    </AuthGuard>
  )
}
