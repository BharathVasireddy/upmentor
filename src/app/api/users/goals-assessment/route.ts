import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const goalsAssessmentSchema = z.object({
  career_goals: z
    .array(z.string())
    .min(1, 'At least one career goal is required'),
  interests: z.array(z.string()).min(1, 'At least one interest is required'),
  challenges: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = goalsAssessmentSchema.parse(body)

    // TODO: Get user ID from session/auth
    const userId = 'mock-user-id' // Replace with actual user ID from auth

    // Update user with career preferences
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        careerGoals: validatedData.career_goals,
        interests: validatedData.interests,
        updatedAt: new Date(),
      },
    })

    // Create career preferences record
    await prisma.careerPreferences.upsert({
      where: { userId: userId },
      update: {
        preferredRoles: JSON.stringify(validatedData.career_goals),
        specificConcerns: JSON.stringify(validatedData.challenges || []),
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        preferredRoles: JSON.stringify(validatedData.career_goals),
        specificConcerns: JSON.stringify(validatedData.challenges || []),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Goals assessment saved successfully',
      user: {
        id: updatedUser.id,
        careerGoals: updatedUser.careerGoals,
        interests: updatedUser.interests,
      },
    })
  } catch (error) {
    console.error('Error saving goals assessment:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save goals assessment' },
      { status: 500 }
    )
  }
}
