import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { academicDetailsSchema } from '@/lib/validations'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = academicDetailsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const data = parsed.data

    // Convert array fields to JSON strings for database storage
    const dbData = {
      ...data,
      subjects: data.subjects ? JSON.stringify(data.subjects) : null,
      extracurricular: data.extracurricular
        ? JSON.stringify(data.extracurricular)
        : null,
      projects: data.projects ? JSON.stringify(data.projects) : null,
      internships: data.internships ? JSON.stringify(data.internships) : null,
      achievements: data.achievements
        ? JSON.stringify(data.achievements)
        : null,
      goals: data.goals ? JSON.stringify(data.goals) : null,
      challenges: data.challenges ? JSON.stringify(data.challenges) : null,
    }

    // Upsert academic details for user
    const academicDetails = await prisma.academicDetails.upsert({
      where: { userId: data.userId },
      update: dbData,
      create: dbData,
    })

    // Optionally, mark onboarding step as complete
    await prisma.user.update({
      where: { id: data.userId },
      data: { onboardingCompleted: false }, // Set to true after all steps
    })

    return NextResponse.json({ academicDetails }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update academic details' },
      { status: 500 }
    )
  }
}
