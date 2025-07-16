import NextAuth from 'next-auth'
import { RoleType, VerificationStatus } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      roles: RoleType[]
      isVerified: boolean
      onboardingCompleted: boolean
      mentorVerificationStatus: VerificationStatus | null
    }
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string
    roles: RoleType[]
    isVerified: boolean
    onboardingCompleted: boolean
    mentorVerificationStatus: VerificationStatus | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    roles: RoleType[]
    isVerified: boolean
    onboardingCompleted: boolean
    mentorVerificationStatus: VerificationStatus | null
  }
}
