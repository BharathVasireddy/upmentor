import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export class EmailService {
  private static fromEmail = process.env.FROM_EMAIL || 'mentor@cloud9digital.in'

  static async sendEmail({
    to,
    subject,
    html,
    from,
  }: EmailOptions): Promise<boolean> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not configured')
        return false
      }

      const { data, error } = await resend.emails.send({
        from: from || this.fromEmail,
        to: [to],
        subject,
        html,
      })

      if (error) {
        console.error('Failed to send email:', error)
        return false
      }

      console.log('Email sent successfully:', data?.id)
      return true
    } catch (error) {
      console.error('Email service error:', error)
      return false
    }
  }

  static async sendVerificationEmail(
    email: string,
    token: string
  ): Promise<boolean> {
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verify-email?token=${token}`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - UpMentor</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0;">UpMentor</h1>
                <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">Mentorship Platform</p>
              </div>

              <!-- Content -->
              <div style="text-align: center;">
                <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                  Verify Your Email Address
                </h2>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                  Welcome to UpMentor! Please click the button below to verify your email address and complete your registration.
                </p>

                <a href="${verificationUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                          font-weight: 600; font-size: 16px; margin: 0 0 32px 0;">
                  Verify Email Address
                </a>

                <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 32px 0;">
                  <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                    Having trouble clicking the button?
                  </p>
                  <p style="color: #64748b; font-size: 14px; margin: 0; word-break: break-all;">
                    Copy and paste this link into your browser: <br>
                    <span style="color: #3b82f6;">${verificationUrl}</span>
                  </p>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
                  <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                    This verification link will expire in 24 hours. If you didn't create an account with UpMentor, you can safely ignore this email.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                © 2024 UpMentor. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: 'Verify Your Email Address - UpMentor',
      html,
    })
  }

  static async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<boolean> {
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password - UpMentor</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0;">UpMentor</h1>
                <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">Mentorship Platform</p>
              </div>

              <!-- Content -->
              <div style="text-align: center;">
                <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                  Reset Your Password
                </h2>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                  We received a request to reset your password. Click the button below to create a new password for your UpMentor account.
                </p>

                <a href="${resetUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                          font-weight: 600; font-size: 16px; margin: 0 0 32px 0;">
                  Reset Password
                </a>

                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 32px 0;">
                  <p style="color: #92400e; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                    Security Notice
                  </p>
                  <p style="color: #b45309; font-size: 14px; margin: 0;">
                    This password reset link will expire in 30 minutes. If you didn't request this reset, please ignore this email and your password will remain unchanged.
                  </p>
                </div>

                <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 32px 0;">
                  <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                    Having trouble clicking the button?
                  </p>
                  <p style="color: #64748b; font-size: 14px; margin: 0; word-break: break-all;">
                    Copy and paste this link into your browser: <br>
                    <span style="color: #3b82f6;">${resetUrl}</span>
                  </p>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
                  <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                    If you continue to have trouble accessing your account, please contact our support team.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                © 2024 UpMentor. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: 'Reset Your Password - UpMentor',
      html,
    })
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const loginUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to UpMentor!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0;">UpMentor</h1>
                <p style="color: #64748b; font-size: 16px; margin: 8px 0 0 0;">Mentorship Platform</p>
              </div>

              <!-- Content -->
              <div style="text-align: center;">
                <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">
                  Welcome to UpMentor, ${name}! 🎉
                </h2>
                
                <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                  Your email has been verified successfully! You're now ready to start your mentorship journey with UpMentor.
                </p>

                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 32px; margin: 32px 0; color: white; text-align: left;">
                  <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
                    What's Next?
                  </h3>
                  <ul style="color: white; font-size: 16px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Complete your profile to get better mentor matches</li>
                    <li style="margin-bottom: 8px;">Browse available mentors in your field</li>
                    <li style="margin-bottom: 8px;">Schedule your first mentorship session</li>
                    <li>Start building meaningful professional relationships</li>
                  </ul>
                </div>

                <a href="${loginUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                          font-weight: 600; font-size: 16px; margin: 0 0 32px 0;">
                  Get Started
                </a>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
                  <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                    Need help getting started? Check out our help center or contact our support team.
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                © 2024 UpMentor. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: 'Welcome to UpMentor! Your account is ready',
      html,
    })
  }
}
