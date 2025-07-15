import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const goalsSchema = z.object({
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = goalsSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Store goals in careerGoals field as JSON array
        careerGoals: validatedData.goals,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        goals: updatedUser.careerGoals,
      },
    })
  } catch (error) {
    console.error('Error saving user goals:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid goals data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save user goals' },
      { status: 500 }
    )
  }
}
