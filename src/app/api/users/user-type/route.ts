import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const userTypeSchema = z.object({
  userType: z.enum(['STUDENT', 'PARENT', 'PROFESSIONAL']),
})

export async function POST(req: NextRequest) {
  console.log('🚨 USER-TYPE API ROUTE HIT! 🚨')
  try {
    console.log('🔍 API called - checking session...')
    const session = await getServerSession(authOptions)
    console.log('📋 Session data:', JSON.stringify(session, null, 2))

    if (!session?.user?.id) {
      console.log('❌ No session or user ID found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('✅ Valid session found for user:', session.user.id)

    const body = await req.json()
    console.log('📝 Request body:', body)
    const validatedData = userTypeSchema.parse(body)
    console.log('✅ Validated data:', validatedData)

    // Map user types to database role types
    const roleTypeMapping = {
      STUDENT: 'STUDENT',
      PARENT: 'STUDENT', // Parents are essentially students for their children
      PROFESSIONAL: 'STUDENT', // Professionals seeking mentorship are students
    } as const

    const dbRoleType = roleTypeMapping[validatedData.userType]
    console.log('🗂️ Mapped role type:', dbRoleType)

    // Update or create user role
    console.log('💾 Upserting user role...')
    await prisma.userRole.upsert({
      where: { userId: session.user.id },
      update: {
        roleType: dbRoleType,
        isActive: true,
        assignedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        roleType: dbRoleType,
        permissions: JSON.stringify([
          'view_profile',
          'book_sessions',
          'view_mentors',
        ]),
        isActive: true,
        assignedAt: new Date(),
      },
    })
    console.log('✅ UserRole upsert completed')

    // Update user with original user type and timestamp
    console.log('📝 Updating user with currentGrade...')
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        currentGrade: validatedData.userType, // Store original selection
        updatedAt: new Date(),
      },
    })
    console.log('✅ User update completed:', updatedUser.currentGrade)

    console.log('🎉 API success - returning response')
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        userType: validatedData.userType,
      },
    })
  } catch (error) {
    console.error('Error saving user type:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid user type', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save user type' },
      { status: 500 }
    )
  }
}
