# Email Service Setup - Resend Integration

UpMentor uses [Resend](https://resend.com) as the email service provider for all transactional emails including user verification, password resets, and welcome messages.

## 📧 Email Features

### Verification Email

- **Trigger**: Sent automatically when a user registers
- **Purpose**: Verify user's email address
- **Content**: Professional email with verification link and UpMentor branding
- **Expiry**: 24 hours
- **Redirect**: Takes user to verification success page

### Password Reset Email

- **Trigger**: Sent when user requests password reset via `/forgot-password`
- **Purpose**: Secure password reset with time-limited token
- **Content**: Reset link with security warnings and branding
- **Expiry**: 30 minutes
- **Security**: Token invalidated after single use

### Welcome Email

- **Trigger**: Sent automatically after successful email verification
- **Purpose**: Welcome new users and guide next steps
- **Content**: Celebration message with getting started guide
- **Features**: Actionable next steps and platform overview

## 🔧 Configuration

### Environment Variables

Add these variables to your `.env` file:

```bash
# Resend Email Service
RESEND_API_KEY="re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E"
FROM_EMAIL="mentor@cloud9digital.in"

# NextAuth (required for email links)
NEXTAUTH_URL="http://localhost:3000"
```

### Domain Setup

1. **Verify Domain**: Ensure `cloud9digital.in` is verified in your Resend dashboard
2. **DNS Records**: Configure SPF, DKIM, and DMARC records for deliverability
3. **From Address**: Use `mentor@cloud9digital.in` as the sender address

## 🏗️ Implementation Details

### Email Service Architecture

```typescript
// Core service: src/lib/email.ts
export class EmailService {
  static async sendVerificationEmail(email: string, token: string)
  static async sendPasswordResetEmail(email: string, token: string)
  static async sendWelcomeEmail(email: string, name: string)
}
```

### Integration Points

1. **Registration Flow** (`/api/auth/register`)
   - Creates user account
   - Generates verification token
   - Sends verification email

2. **Password Reset Flow** (`/api/auth/forgot-password`)
   - Validates user existence
   - Creates reset token
   - Sends reset email

3. **Email Verification** (`/api/auth/verify-email`)
   - Validates token
   - Marks user as verified
   - Sends welcome email

### Email Templates

All emails feature:

- **Responsive Design**: Works on all devices
- **UpMentor Branding**: Consistent visual identity
- **Professional Layout**: Clean, modern design
- **Security Notices**: Clear warnings and expiry information
- **Fallback Links**: Copy-paste URLs for accessibility

## 🧪 Testing

### Manual Testing

```bash
# Test all email functions
npm run email:test

# Check environment variables
npm run email:test:env
```

### Test Script Features

- **Environment Validation**: Checks required API keys
- **Multiple Email Types**: Tests all three email types
- **Error Handling**: Graceful failure reporting
- **Success Verification**: Confirms delivery status

### API Testing

Test registration and email flow:

```bash
# Register a new user (triggers verification email)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "name": "Test User",
    "role": "STUDENT",
    "academicLevel": "undergraduate",
    "languages": ["English"]
  }'

# Test password reset (triggers reset email)
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

## 🔒 Security Features

### Token Management

- **Secure Generation**: Cryptographically secure random tokens
- **Time-Limited**: Different expiry times for different purposes
- **Single Use**: Tokens invalidated after use
- **Database Cleanup**: Expired tokens automatically removed

### Email Security

- **Domain Authentication**: SPF, DKIM, DMARC configured
- **HTTPS URLs**: All links use secure protocols
- **Rate Limiting**: Prevents email spam
- **User Validation**: Only send to verified user addresses

### Error Handling

- **Graceful Failures**: Email failures don't break user flow
- **Logging**: Comprehensive error logging for debugging
- **Fallback**: Console logging in development
- **User Feedback**: Clear error messages for users

## 📈 Monitoring & Analytics

### Resend Dashboard

- **Delivery Status**: Track email delivery rates
- **Bounce Handling**: Monitor undeliverable emails
- **Engagement**: Open and click tracking
- **Domain Health**: Monitor reputation and deliverability

### Application Logs

```bash
# Successful email sends
✅ Verification email sent to user@example.com
✅ Password reset email sent to user@example.com
✅ Welcome email sent to user@example.com

# Failed email sends
❌ Failed to send verification email to user@example.com
❌ Failed to send password reset email to user@example.com
```

## 🛠️ Customization

### Email Content

Modify email templates in `src/lib/email.ts`:

- **Subject Lines**: Update email subjects
- **HTML Content**: Customize email design
- **Brand Elements**: Update colors, logos, messaging
- **Call-to-Action**: Modify button text and styling

### Styling

- **Inline CSS**: All styles are inline for email client compatibility
- **Responsive**: Uses media queries for mobile optimization
- **Brand Colors**: Matches UpMentor visual identity
- **Accessibility**: ARIA labels and semantic HTML

### Configuration

- **Sender Name**: Customize sender display name
- **Reply-To**: Set up customer support email
- **Template Variables**: Add dynamic content
- **Localization**: Support for multiple languages

## 🚨 Troubleshooting

### Common Issues

1. **API Key Invalid**

   ```
   Error: RESEND_API_KEY is not configured
   Solution: Check .env file and restart server
   ```

2. **Domain Not Verified**

   ```
   Error: Domain not verified in Resend
   Solution: Complete domain verification in Resend dashboard
   ```

3. **Email Not Delivered**
   ```
   Check: Spam folder, DNS records, domain reputation
   Monitor: Resend dashboard for delivery status
   ```

### Debug Steps

1. **Environment**: Verify all environment variables are set
2. **API Key**: Test API key in Resend dashboard
3. **Domain**: Ensure domain is verified and configured
4. **Logs**: Check application logs for error details
5. **Test**: Use the test script to isolate issues

### Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **DNS Configuration**: Check domain DNS settings
- **Email Best Practices**: Follow deliverability guidelines
- **Rate Limits**: Monitor API usage and limits

## 🔄 Migration Notes

If switching from another email provider:

1. **Update Environment**: Change API keys and endpoints
2. **Test Templates**: Verify email rendering across clients
3. **DNS Records**: Update domain configuration
4. **Monitor**: Watch delivery rates during transition
5. **Fallback**: Keep old provider as backup during migration

---

**Status**: ✅ **Production Ready**  
**Last Updated**: December 2024  
**Maintainer**: UpMentor Development Team
