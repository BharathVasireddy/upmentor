#!/usr/bin/env tsx

/**
 * Email Testing Script for Resend Integration
 * Usage: npx tsx src/scripts/test-email.ts
 */

import { EmailService } from '@/lib/email'

async function testEmail() {
  console.log('🧪 Testing email functionality with Resend test addresses...\n')

  const testCases = [
    {
      name: 'Successful Delivery Test',
      email: 'delivered@resend.dev',
      description: 'This should simulate a successful email delivery',
    },
    {
      name: 'Bounce Test',
      email: 'bounced@resend.dev',
      description: 'This should simulate a bounced email',
    },
    {
      name: 'Spam Test',
      email: 'complained@resend.dev',
      description: 'This should simulate an email marked as spam',
    },
  ]

  for (const testCase of testCases) {
    console.log(`\n📧 ${testCase.name}`)
    console.log(`📍 Testing with: ${testCase.email}`)
    console.log(`ℹ️  ${testCase.description}`)

    try {
      const emailSent = await EmailService.sendVerificationEmail(
        testCase.email,
        'test-token-123'
      )

      if (emailSent) {
        console.log(`✅ Email sent successfully to ${testCase.email}`)
      } else {
        console.log(`❌ Email service returned false for ${testCase.email}`)
      }
    } catch (error: any) {
      console.log(`❌ Failed to send email to ${testCase.email}:`)
      console.log(`   Error: ${error.message}`)
      if (error.statusCode) {
        console.log(`   Status Code: ${error.statusCode}`)
      }
    }

    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log(
    "\n📝 Note: These are Resend's official test addresses that simulate different delivery scenarios."
  )
  console.log(
    '📋 For actual testing, use your real email address or these test addresses.'
  )
  console.log(
    '🚫 Avoid using @example.com, @test.com, or similar fake domains.'
  )
}

// Run the test
testEmail().catch(console.error)
