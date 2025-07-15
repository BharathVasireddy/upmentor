import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  isAccountLocked,
  handleFailedLogin,
  resetLoginAttempts,
} from './auth-utils'
import bcrypt from 'bcryptjs'
import { RoleType, VerificationStatus } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        // Find user with roles
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            userRoles: {
              where: { isActive: true },
              select: { roleType: true },
            },
            mentor: {
              select: { verificationStatus: true },
            },
          },
        })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        // Check if account is locked
        if (await isAccountLocked(user.id)) {
          throw new Error('Account is temporarily locked')
        }

        // Check if account is active
        if (user.accountStatus !== 'ACTIVE') {
          throw new Error('Account is not active')
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isValidPassword) {
          // Handle failed login attempt
          await handleFailedLogin(user.id)
          throw new Error('Invalid credentials')
        }

        // Allow login but let middleware handle verification redirect
        // This allows users to access the verify-email page if needed

        // Reset login attempts on successful login
        await resetLoginAttempts(user.id)

        // Get user roles
        const roles = user.userRoles.map(role => role.roleType)

        // If no roles assigned, assign default STUDENT role
        if (roles.length === 0) {
          await prisma.userRole.create({
            data: {
              userId: user.id,
              roleType: 'STUDENT',
              isActive: true,
              assignedAt: new Date(),
            },
          })
          roles.push('STUDENT')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.profileImage || undefined,
          roles,
          isVerified: user.isVerified,
          onboardingCompleted: user.onboardingCompleted,
          mentorVerificationStatus: user.mentor?.verificationStatus || null,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign in
      if (user) {
        token.userId = user.id
        token.roles = user.roles
        token.isVerified = user.isVerified
        token.onboardingCompleted = user.onboardingCompleted
        token.mentorVerificationStatus = user.mentorVerificationStatus
      }

      // Update token on session update
      if (trigger === 'update') {
        // Refresh user data from database
        const freshUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          include: {
            userRoles: {
              where: { isActive: true },
              select: { roleType: true },
            },
            mentor: {
              select: { verificationStatus: true },
            },
          },
        })

        if (freshUser) {
          token.roles = freshUser.userRoles.map(role => role.roleType)
          token.isVerified = freshUser.isVerified
          token.onboardingCompleted = freshUser.onboardingCompleted
          token.mentorVerificationStatus =
            freshUser.mentor?.verificationStatus || null
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string
        session.user.roles = token.roles as RoleType[]
        session.user.isVerified = token.isVerified as boolean
        session.user.onboardingCompleted = token.onboardingCompleted as boolean
        session.user.mentorVerificationStatus =
          token.mentorVerificationStatus as VerificationStatus | null
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects after sign in/out

      // If it's a relative URL, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      // If it's an absolute URL from the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url
      }

      // For sign-in, default to dashboard if user is verified and onboarded
      if (url.includes('signin') || url.includes('login')) {
        return `${baseUrl}/dashboard`
      }

      // For sign-out, go to home page
      if (url.includes('signout') || url.includes('logout')) {
        return baseUrl
      }

      // Default to home page for any other case
      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/verify-email',
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log successful sign in
      console.log(`User ${user.email} signed in successfully`)
    },
    async signOut({ session, token }) {
      // Log sign out
      console.log(`User signed out`)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
