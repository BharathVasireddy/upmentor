# 📧 Quick Email Setup for UpMentor

## Step 1: Create .env file

Create a `.env` file in the project root with the following content:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/upmentor"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Resend Email Service
RESEND_API_KEY="re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E"
FROM_EMAIL="mentor@cloud9digital.in"

# Optional: For development
NODE_ENV="development"
```

## Step 2: Test Email Integration

```bash
# Test the email service
npm run email:test
```

## Step 3: Verify Domain Setup

1. Log into your Resend dashboard
2. Ensure `cloud9digital.in` domain is verified
3. Check DNS records (SPF, DKIM, DMARC) are configured

## Step 4: Test Registration Flow

```bash
# Start the development server
npm run dev

# Register a new user at http://localhost:3000/register
# Check your email for verification link
```

## 🎯 What's Working

- ✅ **Verification emails** sent automatically on registration
- ✅ **Password reset emails** for forgotten passwords
- ✅ **Welcome emails** after successful email verification
- ✅ **Professional templates** with UpMentor branding
- ✅ **Secure token handling** with time-based expiry
- ✅ **Error handling** and logging

## 📋 Email Types

1. **Email Verification** (24h expiry)
2. **Password Reset** (30min expiry)
3. **Welcome Message** (after verification)

## 🔧 Configuration

All email settings are configured in:

- `src/lib/email.ts` - Email service and templates
- `src/lib/auth-utils.ts` - Integration with auth flow
- Environment variables in `.env`

---

**Next Steps**: Register a test user and verify the complete email flow works end-to-end!
