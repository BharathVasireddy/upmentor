'use client'

import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ProgressStepper } from './ProgressStepper'
import { useRouter } from 'next/navigation'

interface OnboardingLayoutProps {
  children: ReactNode
  title: string
  description?: string
  showSkip?: boolean
}

export function OnboardingLayout({
  children,
  title,
  description,
  showSkip = true,
}: OnboardingLayoutProps) {
  const router = useRouter()

  const handleSkip = async () => {
    try {
      // Mark onboarding as skipped/completed
      const response = await fetch('/api/users/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.warn('Failed to mark onboarding as complete')
      }

      // Navigate directly to mentors page
      router.push('/mentors')
    } catch (error) {
      console.error('Error skipping onboarding:', error)
      // Navigate anyway
      router.push('/mentors')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <ProgressStepper showSkip={showSkip} onSkip={handleSkip} />

          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                {title}
              </h1>
              {description && (
                <p className="text-base leading-relaxed text-gray-600">
                  {description}
                </p>
              )}
            </div>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
