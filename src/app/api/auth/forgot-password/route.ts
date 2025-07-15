import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  createVerificationToken,
  sendPasswordResetEmail,
} from '@/lib/auth-utils'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = forgotPasswordSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const { email } = parsed.data

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    const successMessage =
      'If an account with this email exists, a password reset link has been sent.'

    if (!user) {
      return NextResponse.json({ message: successMessage }, { status: 200 })
    }

    // Check if account is active
    if (user.accountStatus !== 'ACTIVE') {
      return NextResponse.json({ message: successMessage }, { status: 200 })
    }

    // Generate password reset token (30 minutes expiry)
    const resetToken = await createVerificationToken(
      user.id,
      'PASSWORD_RESET',
      30 // 30 minutes expiry
    )

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken.token)

    return NextResponse.json({ message: successMessage }, { status: 200 })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
}
