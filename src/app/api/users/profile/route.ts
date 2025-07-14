import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { profileCompletionSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = profileCompletionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { userId, profileImage, preferences, onboardingCompleted } = parsed.data;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profileImage,
        preferredIndustries: preferences,
        onboardingCompleted: onboardingCompleted ?? true,
      },
    });
    return NextResponse.json({ user: { id: user.id, profileImage: user.profileImage, onboardingCompleted: user.onboardingCompleted } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to complete profile' }, { status: 500 });
  }
}
