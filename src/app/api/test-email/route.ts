import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const testType = url.searchParams.get('type') || 'delivered'

    // Map test types to Resend's official test addresses
    const testEmails = {
      delivered: 'delivered@resend.dev',
      bounced: 'bounced@resend.dev',
      spam: 'complained@resend.dev',
    }

    const testEmail =
      testEmails[testType as keyof typeof testEmails] || testEmails.delivered
    const testDescriptions = {
      delivered: 'Simulates successful email delivery',
      bounced: 'Simulates a bounced email (mailbox not found)',
      spam: 'Simulates email being marked as spam',
    }

    console.log(`🧪 Testing email with type: ${testType}`)
    console.log(`📧 Sending to: ${testEmail}`)
    console.log(
      `📋 Purpose: ${testDescriptions[testType as keyof typeof testDescriptions]}`
    )

    // Send test email using EmailService
    const emailSent = await EmailService.sendVerificationEmail(
      testEmail,
      'test-token-from-api'
    )

    if (!emailSent) {
      throw new Error('Email service returned false')
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully`,
      details: {
        testType,
        emailAddress: testEmail,
        description:
          testDescriptions[testType as keyof typeof testDescriptions],
        note: 'This email was sent to a Resend test address and simulates the specified delivery scenario',
      },
      availableTests: {
        delivered: '/api/test-email?type=delivered',
        bounced: '/api/test-email?type=bounced',
        spam: '/api/test-email?type=spam',
      },
    })
  } catch (error: any) {
    console.error('Test email failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        statusCode: error.statusCode,
        troubleshooting: {
          tip1: 'Ensure RESEND_API_KEY is set in your .env file',
          tip2: 'Verify FROM_EMAIL is configured correctly',
          tip3: 'Check that your Resend domain is verified',
          validTestEmails: [
            'delivered@resend.dev (successful delivery)',
            'bounced@resend.dev (bounced email)',
            'complained@resend.dev (spam complaint)',
          ],
          invalidEmails: [
            'Avoid @example.com, @test.com, @localhost domains',
            'These domains are blocked by Resend to protect sender reputation',
          ],
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address is required',
          example: { email: 'delivered@resend.dev' },
        },
        { status: 400 }
      )
    }

    // Validate against blocked domains
    const blockedDomains = ['example.com', 'test.com', 'localhost']
    const domain = email.split('@')[1]?.toLowerCase()

    if (blockedDomains.includes(domain)) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot send to ${domain} domain`,
          message:
            'This domain is blocked by Resend to protect sender reputation',
          validAlternatives: [
            'delivered@resend.dev (simulates successful delivery)',
            'bounced@resend.dev (simulates bounced email)',
            'complained@resend.dev (simulates spam complaint)',
            'Use your real email address for actual testing',
          ],
        },
        { status: 422 }
      )
    }

    console.log(`🧪 Testing email to custom address: ${email}`)

    // Send test email using EmailService
    const emailSent = await EmailService.sendVerificationEmail(
      email,
      'test-token-from-custom'
    )

    if (!emailSent) {
      throw new Error('Email service returned false')
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${email}`,
      note: email.includes('@resend.dev')
        ? 'This is a Resend test address that simulates delivery scenarios'
        : 'This email was sent to a real address - check your inbox',
    })
  } catch (error: any) {
    console.error('Custom test email failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        statusCode: error.statusCode,
      },
      { status: 500 }
    )
  }
}
