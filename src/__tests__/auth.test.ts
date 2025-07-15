import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { createMocks } from 'node-mocks-http'
import { POST as registerHandler } from '../src/app/api/auth/register/route'
import { POST as verifyEmailHandler } from '../src/app/api/auth/verify-email/route'
import { POST as forgotPasswordHandler } from '../src/app/api/auth/forgot-password/route'
import { POST as resetPasswordHandler } from '../src/app/api/auth/reset-password/route'
import { prisma } from '../src/lib/prisma'
import { createVerificationToken } from '../src/lib/auth-utils'

// Mock NextAuth
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}))

describe('Authentication System', () => {
  beforeEach(async () => {
    // Clean up test data
    await prisma.verificationToken.deleteMany({
      where: { user: { email: { contains: 'test' } } },
    })
    await prisma.user.deleteMany({
      where: { email: { contains: 'test' } },
    })
  })

  afterEach(async () => {
    // Clean up test data
    await prisma.verificationToken.deleteMany({
      where: { user: { email: { contains: 'test' } } },
    })
    await prisma.user.deleteMany({
      where: { email: { contains: 'test' } },
    })
  })

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'TestPass123!',
          confirmPassword: 'TestPass123!',
          primaryLanguage: 'English',
          academicLevel: 'college',
        },
      })

      const response = await registerHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.message).toContain('Registration successful')
      expect(data.user).toHaveProperty('id')
      expect(data.user.email).toBe('test@example.com')
      expect(data.user.isVerified).toBe(false)
    })

    it('should reject registration with weak password', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'weak',
          confirmPassword: 'weak',
          primaryLanguage: 'English',
          academicLevel: 'college',
        },
      })

      const response = await registerHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })

    it('should reject registration with mismatched passwords', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'TestPass123!',
          confirmPassword: 'DifferentPass123!',
          primaryLanguage: 'English',
          academicLevel: 'college',
        },
      })

      const response = await registerHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })

    it('should reject duplicate email registration', async () => {
      // First registration
      const { req: req1 } = createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'TestPass123!',
          confirmPassword: 'TestPass123!',
          primaryLanguage: 'English',
          academicLevel: 'college',
        },
      })

      await registerHandler(req1 as any)

      // Second registration with same email
      const { req: req2 } = createMocks({
        method: 'POST',
        body: {
          name: 'Another User',
          email: 'test@example.com',
          password: 'TestPass123!',
          confirmPassword: 'TestPass123!',
          primaryLanguage: 'English',
          academicLevel: 'college',
        },
      })

      const response = await registerHandler(req2 as any)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('Email already registered')
    })
  })

  describe('Email Verification', () => {
    it('should verify email with valid token', async () => {
      // Create a user first
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          passwordHash: 'hashedpassword',
          primaryLanguage: 'English',
          academicLevel: 'college',
          isVerified: false,
        },
      })

      // Create verification token
      const verificationToken = await createVerificationToken(
        user.id,
        'EMAIL_VERIFICATION',
        60
      )

      const { req } = createMocks({
        method: 'POST',
        body: {
          token: verificationToken.token,
        },
      })

      const response = await verifyEmailHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Email verified successfully')
      expect(data.user.isVerified).toBe(true)
    })

    it('should reject invalid token', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          token: 'invalid-token',
        },
      })

      const response = await verifyEmailHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid or expired token')
    })

    it('should reject expired token', async () => {
      // Create a user first
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          passwordHash: 'hashedpassword',
          primaryLanguage: 'English',
          academicLevel: 'college',
          isVerified: false,
        },
      })

      // Create expired verification token
      const expiredToken = await prisma.verificationToken.create({
        data: {
          userId: user.id,
          token: 'expired-token',
          type: 'EMAIL_VERIFICATION',
          expires: new Date(Date.now() - 1000), // Expired 1 second ago
        },
      })

      const { req } = createMocks({
        method: 'POST',
        body: {
          token: expiredToken.token,
        },
      })

      const response = await verifyEmailHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Token has expired')
    })
  })

  describe('Password Reset', () => {
    it('should send password reset email for valid user', async () => {
      // Create a user first
      await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          passwordHash: 'hashedpassword',
          primaryLanguage: 'English',
          academicLevel: 'college',
          isVerified: true,
        },
      })

      const { req } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
        },
      })

      const response = await forgotPasswordHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toContain('password reset link has been sent')
    })

    it('should not reveal if user does not exist', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          email: 'nonexistent@example.com',
        },
      })

      const response = await forgotPasswordHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toContain('password reset link has been sent')
    })

    it('should reset password with valid token', async () => {
      // Create a user first
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          passwordHash: 'hashedpassword',
          primaryLanguage: 'English',
          academicLevel: 'college',
          isVerified: true,
        },
      })

      // Create reset token
      const resetToken = await createVerificationToken(
        user.id,
        'PASSWORD_RESET',
        30
      )

      const { req } = createMocks({
        method: 'POST',
        body: {
          token: resetToken.token,
          password: 'NewPassword123!',
          confirmPassword: 'NewPassword123!',
        },
      })

      const response = await resetPasswordHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Password reset successfully')
    })

    it('should reject weak password during reset', async () => {
      // Create a user first
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          passwordHash: 'hashedpassword',
          primaryLanguage: 'English',
          academicLevel: 'college',
          isVerified: true,
        },
      })

      // Create reset token
      const resetToken = await createVerificationToken(
        user.id,
        'PASSWORD_RESET',
        30
      )

      const { req } = createMocks({
        method: 'POST',
        body: {
          token: resetToken.token,
          password: 'weak',
          confirmPassword: 'weak',
        },
      })

      const response = await resetPasswordHandler(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBeDefined()
    })
  })
})
