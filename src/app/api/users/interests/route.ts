import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { interestsChallengesSchema } from '@/lib/validations'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = interestsChallengesSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { userId, interests, challenges, goals } = parsed.data
    // Update interests in User, challenges/goals in AcademicDetails
    const user = await prisma.user.update({
      where: { id: userId },
      data: { interests },
    })
    await prisma.academicDetails.updateMany({
      where: { userId },
      data: { challenges, goals },
    })
    return NextResponse.json(
      { user: { id: user.id, interests }, challenges, goals },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update interests and challenges' },
      { status: 500 }
    )
  }
}
