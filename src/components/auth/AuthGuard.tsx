'use client'

import { useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireOnboarding = true,
  redirectTo = '/login',
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    // Check authentication
    if (requireAuth && !session) {
      router.push(redirectTo)
      return
    }

    // Check onboarding completion
    if (requireOnboarding && session?.user) {
      // Type assertion to access our custom user properties
      const user = session.user as any

      // Check if user has completed onboarding
      if (!user.onboardingCompleted) {
        router.push('/onboarding/user-type')
        return
      }
    }
  }, [session, status, router, requireAuth, requireOnboarding, redirectTo])

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't render children if auth check fails
  if (requireAuth && !session) {
    return null
  }

  // Don't render children if onboarding required but not completed
  if (requireOnboarding && session?.user) {
    const user = session.user as any
    if (!user.onboardingCompleted) {
      return null
    }
  }

  return <>{children}</>
}

// Convenience components for common use cases
export function ProtectedRoute({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requireAuth={true} requireOnboarding={true}>
      {children}
    </AuthGuard>
  )
}

export function AuthOnlyRoute({ children }: { children: ReactNode }) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>
}

export function DashboardRoute({ children }: { children: ReactNode }) {
  return (
    <AuthGuard requireAuth={true} requireOnboarding={true}>
      {children}
    </AuthGuard>
  )
}
