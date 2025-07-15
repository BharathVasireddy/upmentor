# Database Environment Setup

This document explains how to properly configure separate databases for local development, staging, and production environments.

## Current Status

✅ **Schema Updated**: Now uses PostgreSQL with environment variables  
⚠️ **Environment Setup Needed**: You need to configure separate databases

## Database Architecture

### Local Development

- **Database**: SQLite (for quick local development)
- **File**: `dev.db` in project root
- **Provider**: `sqlite`

### Staging/Production

- **Database**: PostgreSQL (recommended)
- **Provider**: `postgresql`
- **Options**: Neon, Supabase, Railway, PlanetScale, or self-hosted

## Environment Configuration

### 1. Create `.env` file (Local Development)

```bash
# Copy this to your .env file
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E
FROM_EMAIL=mentor@cloud9digital.in
```

### 2. Staging Environment

```bash
DATABASE_URL="postgresql://user:password@staging-host:5432/upmentor_staging?sslmode=require"
NEXTAUTH_SECRET=different-secret-for-staging
NEXTAUTH_URL=https://staging.upmentor.com
RESEND_API_KEY=re_staging_api_key
FROM_EMAIL=mentor@yourdomain.com
NODE_ENV=staging
```

### 3. Production Environment

```bash
DATABASE_URL="postgresql://user:password@prod-host:5432/upmentor_prod?sslmode=require"
NEXTAUTH_SECRET=strong-production-secret-32-chars-minimum
NEXTAUTH_URL=https://upmentor.com
RESEND_API_KEY=re_production_api_key
FROM_EMAIL=mentor@yourdomain.com
NODE_ENV=production
```

## Database Providers Comparison

### Neon (Recommended)

- ✅ PostgreSQL-compatible
- ✅ Generous free tier
- ✅ Automatic scaling
- ✅ Built-in connection pooling
- 🔗 [neon.tech](https://neon.tech)

### Supabase

- ✅ PostgreSQL-compatible
- ✅ Includes auth & real-time features
- ✅ Good free tier
- 🔗 [supabase.com](https://supabase.com)

### Railway

- ✅ Simple deployment
- ✅ PostgreSQL support
- ✅ Good for staging/production
- 🔗 [railway.app](https://railway.app)

## Migration Guide

### Step 1: Update Schema (✅ Done)

The schema has been updated to use PostgreSQL with environment variables.

### Step 2: Set Up Local Development

```bash
# For SQLite local development (quick setup)
echo 'DATABASE_URL="file:./dev.db"' > .env

# Add other required variables to .env
echo 'NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production' >> .env
echo 'NEXTAUTH_URL=http://localhost:3000' >> .env
echo 'RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E' >> .env
echo 'FROM_EMAIL=mentor@cloud9digital.in' >> .env

# Update schema for SQLite
# Temporarily change schema.prisma provider to "sqlite" for local dev
```

### Step 3: Create Production Database

1. **Sign up for a database provider** (Neon recommended)
2. **Create a new PostgreSQL database**
3. **Get the connection string**
4. **Set up environment variables in your deployment platform**

### Step 4: Deploy Schema

```bash
# For local SQLite development
npx prisma db push

# For production PostgreSQL
DATABASE_URL="your-production-url" npx prisma db push
```

## Development Workflow

### Local Development (SQLite)

```bash
# Quick local setup - no external dependencies
DATABASE_URL="file:./dev.db" npx prisma db push
npm run dev
```

### Production Deployment

```bash
# Set environment variables in your platform
# Then deploy and run migrations
npx prisma generate
npx prisma db push
```

## Prisma Schema Flexibility

The current schema is set up for PostgreSQL but can work with SQLite by:

1. **Changing provider**:

   ```prisma
   datasource db {
     provider = "sqlite"  // Change from "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Array fields**: PostgreSQL supports `String[]`, SQLite needs `String` (JSON)

## Security Best Practices

### Database URLs

- ✅ Always use environment variables
- ✅ Never commit database URLs to git
- ✅ Use different databases for each environment
- ✅ Enable SSL for production connections

### Secrets

- ✅ Generate unique `NEXTAUTH_SECRET` for each environment
- ✅ Use strong, random secrets (32+ characters)
- ✅ Rotate secrets regularly in production

## Deployment Platform Examples

### Vercel

```bash
# Set environment variables in Vercel dashboard
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

### Railway

```bash
# Set in Railway dashboard or railway.json
{
  "deploy": {
    "envVars": {
      "DATABASE_URL": "${{DATABASE_URL}}",
      "NEXTAUTH_SECRET": "${{NEXTAUTH_SECRET}}"
    }
  }
}
```

### Docker

```dockerfile
# Use environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
```

## Troubleshooting

### Connection Issues

1. **Check URL format**: Ensure correct PostgreSQL URL format
2. **SSL settings**: Most providers require `?sslmode=require`
3. **Firewall**: Ensure your deployment can reach the database
4. **Credentials**: Verify username/password are correct

### Migration Issues

1. **Schema differences**: PostgreSQL vs SQLite field types
2. **Array fields**: Use `String[]` for PostgreSQL, `String` for SQLite
3. **Backup first**: Always backup before schema changes

## Next Steps

1. **Choose a database provider** for staging/production
2. **Set up staging environment** with PostgreSQL
3. **Configure deployment platform** with environment variables
4. **Test migrations** on staging before production
5. **Set up database monitoring** and backups

For immediate local development, your current SQLite setup works fine. For production deployment, set up a PostgreSQL database with one of the recommended providers.
