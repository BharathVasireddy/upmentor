import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { academicDetailsSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = academicDetailsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const data = parsed.data;
    // Upsert academic details for user
    const academicDetails = await prisma.academicDetails.upsert({
      where: { userId: data.userId },
      update: { ...data },
      create: { ...data },
    });
    // Optionally, mark onboarding step as complete
    await prisma.user.update({
      where: { id: data.userId },
      data: { onboardingCompleted: false }, // Set to true after all steps
    });
    return NextResponse.json({ academicDetails }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update academic details' }, { status: 500 });
  }
}
