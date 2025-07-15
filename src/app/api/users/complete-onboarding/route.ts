import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const completeOnboardingSchema = z.object({
  profile_image: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = completeOnboardingSchema.parse(body)

    // TODO: Get user ID from session/auth
    const userId = 'mock-user-id' // Replace with actual user ID from auth

    // Update user to mark onboarding as completed
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        profileImage: validatedData.profile_image || null,
        updatedAt: new Date(),
      },
    })

    // Create user role for student
    await prisma.userRole.upsert({
      where: { userId: userId },
      update: {
        roleType: 'STUDENT',
        isActive: true,
      },
      create: {
        userId: userId,
        roleType: 'STUDENT',
        permissions: JSON.stringify([
          'view_profile',
          'book_sessions',
          'view_mentors',
        ]),
        isActive: true,
        assignedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser.id,
        onboardingCompleted: updatedUser.onboardingCompleted,
        profileImage: updatedUser.profileImage,
      },
    })
  } catch (error) {
    console.error('Error completing onboarding:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}
