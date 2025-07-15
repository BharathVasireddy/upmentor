import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const country = formData.get('country') as string

    const currentTitle = formData.get('currentTitle') as string
    const currentCompany = formData.get('currentCompany') as string
    const university = formData.get('university') as string
    const degree = formData.get('degree') as string
    const experienceYears = formData.get('experienceYears') as string
    const bio = formData.get('bio') as string
    const linkedinUrl = formData.get('linkedinUrl') as string

    const subjectsToTeach = JSON.parse(
      (formData.get('subjectsToTeach') as string) || '[]'
    )
    const studentLevels = JSON.parse(
      (formData.get('studentLevels') as string) || '[]'
    )
    const languagesSpoken = JSON.parse(
      (formData.get('languagesSpoken') as string) || '[]'
    )
    const hourlyRate = formData.get('hourlyRate') as string

    const agreeToTerms = formData.get('agreeToTerms') === 'true'
    const agreeToBackground = formData.get('agreeToBackground') === 'true'

    // Extract files
    const resumeFile = formData.get('resume') as File | null
    const degreeProofFile = formData.get('degreeProof') as File | null
    const experienceProofFile = formData.get('experienceProof') as File | null
    const idProofFile = formData.get('idProof') as File | null

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !currentTitle ||
      !currentCompany ||
      !university ||
      !degree ||
      !experienceYears ||
      !bio ||
      !hourlyRate ||
      !agreeToTerms ||
      !agreeToBackground ||
      !resumeFile ||
      !degreeProofFile ||
      !idProofFile
    ) {
      return NextResponse.json(
        { error: 'Missing required fields or documents' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingApplication = await prisma.user.findUnique({
      where: { email },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 409 }
      )
    }

    // Create uploads directory
    const uploadsDir = join(
      process.cwd(),
      'public',
      'uploads',
      'mentor-applications'
    )
    await mkdir(uploadsDir, { recursive: true })

    // Function to save file
    const saveFile = async (file: File, prefix: string) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileExtension = file.name.split('.').pop()
      const fileName = `${prefix}_${randomUUID()}.${fileExtension}`
      const filePath = join(uploadsDir, fileName)
      await writeFile(filePath, buffer)
      return `/uploads/mentor-applications/${fileName}`
    }

    // Save uploaded files
    const documentUrls: { [key: string]: string } = {}

    if (resumeFile) {
      documentUrls.resume = await saveFile(resumeFile, 'resume')
    }
    if (degreeProofFile) {
      documentUrls.degreeProof = await saveFile(degreeProofFile, 'degree')
    }
    if (experienceProofFile) {
      documentUrls.experienceProof = await saveFile(
        experienceProofFile,
        'experience'
      )
    }
    if (idProofFile) {
      documentUrls.idProof = await saveFile(idProofFile, 'id')
    }

    // Create user and mentor application in database
    const result = await prisma.$transaction(async tx => {
      // Create user first
      const user = await tx.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          passwordHash: '', // Will be set when they first login
          phone,
          profileImage: '',
          dateOfBirth: new Date('1990-01-01'), // Placeholder
          gender: 'Other',
          city,
          state,
          country,
          timezone: 'Asia/Kolkata',
          primaryLanguage: languagesSpoken[0] || 'English',
          languagesSpoken,
          interests: [],
          careerGoals: [],
          preferredIndustries: [],
          onboardingCompleted: false,
          isVerified: false,
          lastActive: new Date(),
          accountStatus: 'ACTIVE', // Use valid enum value
        },
      })

      // Create mentor application
      const mentor = await tx.mentor.create({
        data: {
          userId: user.id,
          title: currentTitle,
          university,
          company: currentCompany,
          experienceYears: parseInt(experienceYears.split('-')[0]) || 0,
          expertiseAreas: JSON.stringify(subjectsToTeach), // Store as JSON string
          academicSpecializations: JSON.stringify(subjectsToTeach),
          industryFocus: JSON.stringify([currentCompany]),
          studentLevelsServed: JSON.stringify(studentLevels),
          hourlyRate: parseFloat(hourlyRate.split('-')[0]) || 500,
          bio,
          linkedinUrl: linkedinUrl || '',
          verificationStatus: 'PENDING',
          verificationDocs: JSON.stringify(Object.values(documentUrls)),
          totalSessions: 0,
          avgRating: 0,
          responseTime: 24,
          primaryLanguage: languagesSpoken[0] || 'English',
          languagesSpoken,
          timezone: 'Asia/Kolkata',
          isActive: false, // Will be activated after approval
          mentorType: 'PROFESSIONAL',
        },
      })

      // Create mentor verification records
      const verificationPromises = Object.entries(documentUrls).map(
        ([docType, url]) =>
          tx.mentorVerification.create({
            data: {
              mentorId: mentor.id,
              verificationType: 'DOCUMENT',
              documentType: docType.toUpperCase(),
              documentUrl: url,
              verificationStatus: 'PENDING',
              submittedAt: new Date(),
            },
          })
      )

      await Promise.all(verificationPromises)

      return { user, mentor }
    })

    // TODO: Send confirmation email to applicant
    // TODO: Send notification to admin team
    // TODO: Create calendar invite for interview if needed

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: result.mentor.id,
      userId: result.user.id,
    })
  } catch (error) {
    console.error('Error processing mentor application:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
