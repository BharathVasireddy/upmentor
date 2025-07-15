'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  ArrowLeft,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type VerificationState = 'loading' | 'success' | 'error' | 'missing-token'

function VerifyEmailPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = React.useState<VerificationState>('loading')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isResending, setIsResending] = React.useState(false)

  const token = searchParams.get('token')

  const verifyEmail = React.useCallback(
    async (token: string) => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const result = await response.json()

        if (response.ok) {
          setState('success')
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login?verified=true')
          }, 3000)
        } else {
          setState('error')
          setErrorMessage(result.error || 'Verification failed')
        }
      } catch (error) {
        setState('error')
        setErrorMessage('Something went wrong. Please try again.')
      }
    },
    [router]
  )

  React.useEffect(() => {
    if (!token) {
      setState('missing-token')
      return
    }

    verifyEmail(token)
  }, [token, verifyEmail])

  async function resendVerification() {
    setIsResending(true)
    // Note: In a real app, you'd need to store the email somewhere accessible
    // For now, we'll just show a message to go to the resend page
    router.push('/resend-verification')
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600 dark:text-brand-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Verifying your email
            </CardTitle>
            <CardDescription>
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              Email verified!
            </CardTitle>
            <CardDescription>
              Your email has been successfully verified. You can now sign in to
              your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm text-green-800 dark:text-green-200">
                Redirecting you to the sign-in page in 3 seconds...
              </p>
            </div>
            <Button
              onClick={() => router.push('/login?verified=true')}
              className="w-full"
            >
              Sign in now
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-100 dark:bg-red-900">
              <AlertCircle className="h-8 w-8 text-error-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-error-600 dark:text-red-400">
              Verification failed
            </CardTitle>
            <CardDescription>
              We couldn't verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-error-800 text-sm dark:text-red-200">
                {errorMessage}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                This might happen if:
              </p>
              <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• The verification link has expired</li>
                <li>• The link has already been used</li>
                <li>• The link is invalid or corrupted</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button
                onClick={resendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  'Get a new verification link'
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  <ArrowLeft className="mr-1 inline h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Missing token state - improved UX
  if (state === 'missing-token') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>
            <CardDescription>
              To verify your email address, please click the verification link
              we sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Next steps:</strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>1. Check your email inbox</li>
                <li>2. Click the "Verify Email Address" button</li>
                <li>3. You'll be redirected back here automatically</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                Didn't receive the email?
              </p>
              <ul className="space-y-1 text-xs text-neutral-500 dark:text-neutral-500">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• Wait a few minutes for the email to arrive</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => router.push('/resend-verification')}
                className="w-full"
              >
                Send a new verification email
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  <ArrowLeft className="mr-1 inline h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

export default function VerifyEmailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-brand-600"></div>
        </div>
      }
    >
      <VerifyEmailPageContent />
    </React.Suspense>
  )
}
