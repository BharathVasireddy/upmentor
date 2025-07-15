import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { EmailService } from '@/lib/email'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  academicLevel: z.string().min(1, 'Academic level is required').optional(),
  primaryLanguage: z.string().min(1, 'Primary language is required').optional(),
})

// Helper function to validate email domain
function isValidEmailForTesting(email: string): boolean {
  const blockedDomains = [
    'example.com',
    'test.com',
    'localhost',
    'example.org',
    'test.org',
    'fake.com',
    'dummy.com',
  ]

  const domain = email.split('@')[1]?.toLowerCase()
  return !blockedDomains.includes(domain)
}

// Helper function to suggest valid test emails
function getTestEmailSuggestion(): string {
  return 'For testing, please use: delivered@resend.dev, bounced@resend.dev, or a real email address'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)
    const {
      email,
      password,
      name,
      academicLevel = 'college', // Default value
      primaryLanguage = 'English', // Default value
    } = validatedData

    // Check if email domain is valid for sending
    if (!isValidEmailForTesting(email)) {
      return NextResponse.json(
        {
          error: 'Invalid email domain for testing',
          message: `Cannot send to ${email.split('@')[1]} domain. ${getTestEmailSuggestion()}`,
          suggestions: [
            'delivered@resend.dev (simulates successful delivery)',
            'bounced@resend.dev (simulates bounced email)',
            'Use your real email address for actual testing',
          ],
        },
        { status: 422 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        academicLevel,
        primaryLanguage,
        isVerified: false, // Keep email verification enabled
        onboardingCompleted: false,
        accountStatus: 'ACTIVE',
        loginAttempts: 0,
        twoFactorEnabled: false,
      },
    })

    // Generate verification token
    const verificationToken = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token:
          Math.random().toString(36).substr(2, 15) + Date.now().toString(36),
        type: 'EMAIL_VERIFICATION',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        used: false,
      },
    })

    // Send verification email
    try {
      const emailSent = await EmailService.sendVerificationEmail(
        user.email,
        verificationToken.token
      )

      if (!emailSent) {
        throw new Error('Email service returned false')
      }

      console.log(`✅ Verification email sent successfully to ${user.email}`)
    } catch (emailError: any) {
      console.error('Failed to send email:', emailError)

      // Handle specific Resend errors
      if (
        emailError?.statusCode === 422 ||
        emailError?.message?.includes('validation_error')
      ) {
        // Delete the user since email sending failed
        await prisma.user.delete({ where: { id: user.id } })
        await prisma.verificationToken.delete({
          where: { id: verificationToken.id },
        })

        return NextResponse.json(
          {
            error: 'Invalid email address',
            message: `Email service rejected ${email}. ${getTestEmailSuggestion()}`,
            resendError: emailError.message,
            suggestions: [
              'delivered@resend.dev (simulates successful delivery)',
              'bounced@resend.dev (simulates bounced email)',
              'Use your real email address for actual testing',
            ],
          },
          { status: 422 }
        )
      }

      // For other email errors, still create the user but warn about email
      console.log(`❌ Failed to send verification email to ${user.email}`)
      return NextResponse.json(
        {
          message:
            'Account created successfully, but verification email could not be sent. Please contact support.',
          userId: user.id,
          emailError: true,
        },
        { status: 201 }
      )
    }

    return NextResponse.json(
      {
        message: 'Please check your email to verify your account',
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
