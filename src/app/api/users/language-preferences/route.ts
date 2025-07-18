import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const languagePreferencesSchema = z.object({
  languagePreferences: z
    .array(z.string())
    .min(1, 'Please select at least one language'),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = languagePreferencesSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Store language preferences in languagesSpoken field as JSON array
        languagesSpoken: validatedData.languagePreferences,
        // Set primary language as the first selected language
        primaryLanguage: validatedData.languagePreferences[0],
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        languagePreferences: updatedUser.languagesSpoken,
        primaryLanguage: updatedUser.primaryLanguage,
      },
    })
  } catch (error) {
    console.error('Error saving language preferences:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid language preferences data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save language preferences' },
      { status: 500 }
    )
  }
}
