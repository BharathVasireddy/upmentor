import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const goalsAssessmentSchema = z.object({
  career_goals: z.array(z.string()).min(1, 'At least one career goal is required'),
  interests: z.array(z.string()).min(1, 'At least one interest is required'),
  challenges: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = goalsAssessmentSchema.parse(body);

    // TODO: Get user ID from session/auth
    const userId = 'mock-user-id'; // Replace with actual user ID from auth

    // Update user with career preferences
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        career_goals: validatedData.career_goals,
        interests: validatedData.interests,
        updated_at: new Date(),
      },
    });

    // Create career preferences record
    await prisma.careerPreferences.upsert({
      where: { user_id: userId },
      update: {
        preferred_roles: validatedData.career_goals,
        specific_concerns: validatedData.challenges || [],
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        preferred_roles: validatedData.career_goals,
        specific_concerns: validatedData.challenges || [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Goals assessment saved successfully',
      user: {
        id: updatedUser.id,
        career_goals: updatedUser.career_goals,
        interests: updatedUser.interests,
      },
    });

  } catch (error) {
    console.error('Error saving goals assessment:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save goals assessment' },
      { status: 500 }
    );
  }
} 