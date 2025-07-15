import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/auth-utils'
import { z } from 'zod'

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = verifyEmailSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      )
    }

    const { token } = parsed.data

    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 })
    }

    // Check if token is already used
    if (verificationToken.used) {
      return NextResponse.json(
        { error: 'Token has already been used' },
        { status: 400 }
      )
    }

    // Check if token is for email verification
    if (verificationToken.type !== 'EMAIL_VERIFICATION') {
      return NextResponse.json({ error: 'Invalid token type' }, { status: 400 })
    }

    // Check if user is already verified (prevent duplicate welcome emails)
    if (verificationToken.user.isVerified) {
      return NextResponse.json(
        {
          message: 'Email is already verified',
          user: {
            id: verificationToken.user.id,
            email: verificationToken.user.email,
            isVerified: true,
          },
        },
        { status: 200 }
      )
    }

    // Update user as verified and mark token as used
    const updatedUser = await prisma.$transaction(async tx => {
      const user = await tx.user.update({
        where: { id: verificationToken.userId },
        data: {
          isVerified: true,
          emailVerified: new Date(),
        },
      })

      await tx.verificationToken.update({
        where: { id: verificationToken.id },
        data: { used: true },
      })

      return user
    })

    // Send welcome email after successful verification (only once)
    try {
      await sendWelcomeEmail(updatedUser.email, updatedUser.name || 'User')
    } catch (emailError) {
      // Don't fail the verification if welcome email fails
      console.error('Failed to send welcome email:', emailError)
    }

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          isVerified: true,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}
