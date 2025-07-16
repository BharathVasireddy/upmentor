import '../styles/globals.css'
import React from 'react'
import { Toaster } from 'sonner'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { OnboardingProvider } from '@/contexts/OnboardingContext'

export const metadata = {
  title: 'UpMentor - Student Mentorship Platform',
  description: 'Connect with expert mentors for academic and career guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <OnboardingProvider>
            <div className="min-h-screen bg-neutral-50">{children}</div>
          </OnboardingProvider>
        </SessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
