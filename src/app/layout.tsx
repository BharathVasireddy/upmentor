import '../styles/globals.css'
import React from 'react'
import { Toaster } from 'sonner'

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
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
