import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { careerGoalsSchema } from '@/lib/validations'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = careerGoalsSchema.safeParse(body)
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
      preferredRoles: data.preferredRoles
        ? JSON.stringify(data.preferredRoles)
        : null,
      targetCompanies: data.targetCompanies
        ? JSON.stringify(data.targetCompanies)
        : null,
      desiredLocations: data.desiredLocations
        ? JSON.stringify(data.desiredLocations)
        : null,
      specificConcerns: data.specificConcerns
        ? JSON.stringify(data.specificConcerns)
        : null,
    }

    // Upsert career preferences for user
    const careerPreferences = await prisma.careerPreferences.upsert({
      where: { userId: data.userId },
      update: dbData,
      create: dbData,
    })

    return NextResponse.json({ careerPreferences }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update career goals' },
      { status: 500 }
    )
  }
}
