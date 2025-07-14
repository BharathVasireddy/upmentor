import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const completeOnboardingSchema = z.object({
  profile_image: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = completeOnboardingSchema.parse(body);

    // TODO: Get user ID from session/auth
    const userId = 'mock-user-id'; // Replace with actual user ID from auth

    // Update user to mark onboarding as completed
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        onboarding_completed: true,
        profile_image: validatedData.profile_image || null,
        updated_at: new Date(),
      },
    });

    // Create user role for student
    await prisma.userRoles.upsert({
      where: { user_id: userId },
      update: {
        role_type: 'student',
        is_active: true,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        role_type: 'student',
        permissions: ['view_profile', 'book_sessions', 'view_mentors'],
        is_active: true,
        assigned_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: updatedUser.id,
        onboarding_completed: updatedUser.onboarding_completed,
        profile_image: updatedUser.profile_image,
      },
    });

  } catch (error) {
    console.error('Error completing onboarding:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
} 