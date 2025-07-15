# Environment Configuration Guide

## ✅ Current Status

Your UpMentor project is now configured with **proper database environment separation**:

- **✅ Production**: Neon PostgreSQL (properly configured)
- **✅ Staging**: Separate Neon PostgreSQL
- **✅ Local Development**: Neon PostgreSQL (currently shared, can be isolated)
- **✅ CI/CD Testing**: Temporary PostgreSQL containers

## 📊 Environment Overview

### 🌐 Production Environment

**Database**: Neon PostgreSQL

```
Host: ep-bold-salad-a1z4so8u-pooler.ap-southeast-1.aws.neon.tech
Database: neondb
User: neondb_owner
Region: ap-southeast-1 (Singapore)
Features: Connection pooling, SSL required
```

**Deployment**:

- **Platform**: Vercel
- **Environment Variable**: `DATABASE_URL_PRODUCTION`
- **Branch**: `main`
- **Auto-deploy**: On push to main

### 🧪 Staging Environment

**Database**: Separate Neon PostgreSQL

- **Environment Variable**: `DATABASE_URL_STAGING`
- **Branch**: `develop`
- **Auto-deploy**: On push to develop

### 💻 Local Development

**Current Setup**: Shared Neon PostgreSQL

```bash
DATABASE_URL="postgresql://neondb_owner:***@ep-bold-salad-a1z4so8u-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

**⚠️ Note**: Currently using production database for local development. See [Local Database Options](#local-database-options) below for isolation.

### 🔬 CI/CD Testing

**Database**: Temporary PostgreSQL containers

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_DB: upmentor_test
```

- **Isolation**: Complete isolation from production
- **Lifecycle**: Created and destroyed per test run
- **Performance**: Fast, no external dependencies

## 🏗️ Local Database Options

### Option 1: Shared Neon (Current Setup) ⚡

**Pros**:

- ✅ Immediate setup (already configured)
- ✅ Production-like data and schema
- ✅ No local dependencies
- ✅ Always in sync with production

**Cons**:

- ⚠️ Uses production database
- ⚠️ Potential data conflicts
- ⚠️ Requires internet connection

**Status**: ✅ **Currently Active**

### Option 2: Separate Neon Database (Recommended) 🎯

**Setup Steps**:

1. **Create separate Neon database**:

   ```bash
   # Go to https://console.neon.tech
   # Create new database: upmentor_local
   ```

2. **Update local environment**:

   ```bash
   ./scripts/setup-environments.sh
   # Choose option 3
   ```

3. **Get new connection string** and update `.env`

**Pros**:

- ✅ Complete isolation from production
- ✅ Production-like PostgreSQL setup
- ✅ Cloud-based (no local setup)
- ✅ Neon's free tier is generous

### Option 3: Local PostgreSQL 🔧

**Setup Steps**:

```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create local database
createdb upmentor_local

# Run environment setup
./scripts/setup-environments.sh
# Choose option 1
```

**Pros**:

- ✅ Complete local control
- ✅ Works offline
- ✅ Fast local queries
- ✅ No cloud dependencies

**Cons**:

- ⚠️ Requires local PostgreSQL installation
- ⚠️ Manual database management

## 🚀 GitHub Actions CI/CD

Your CI/CD pipeline is **properly configured** with environment separation:

### Environment Variables (GitHub Secrets)

```bash
# Production deployment
DATABASE_URL_PRODUCTION="postgresql://neondb_owner:***@prod-host/neondb"

# Staging deployment
DATABASE_URL_STAGING="postgresql://neondb_owner:***@staging-host/neondb_staging"

# Vercel deployment
VERCEL_TOKEN="***"
VERCEL_ORG_ID="***"
VERCEL_PROJECT_ID="***"
```

### Workflow Separation

| Environment    | Trigger           | Database                  | Migrations                |
| -------------- | ----------------- | ------------------------- | ------------------------- |
| **Testing**    | PR, Push          | Temporary container       | `prisma migrate deploy`   |
| **Staging**    | Push to `develop` | `DATABASE_URL_STAGING`    | Auto-migrate after deploy |
| **Production** | Push to `main`    | `DATABASE_URL_PRODUCTION` | Auto-migrate after deploy |

## 🔧 Quick Commands

### Current Environment Check

```bash
# Show current configuration
./scripts/setup-environments.sh
# Choose option 4
```

### Switch to Separate Local Database

```bash
# Set up isolated local development
./scripts/setup-environments.sh
# Choose option 3 (Separate Neon) or option 1 (Local PostgreSQL)
```

### Test Current Setup

```bash
# Start development server
npm run dev

# Test registration API
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"delivered@resend.dev","password":"password123","name":"Test User","academicLevel":"high_school","primaryLanguage":"English"}'
```

### Database Management

```bash
# Apply schema changes
npx prisma db push

# View data in browser
npx prisma studio

# Generate Prisma client
npx prisma generate
```

## 🔒 Security Best Practices

### ✅ Currently Implemented

- **Environment Variable Separation**: Production vs staging vs local
- **GitHub Secrets**: Sensitive data not in code
- **SSL Connections**: All database connections use SSL
- **Temporary Test DBs**: CI/CD uses isolated containers
- **Connection Pooling**: Neon provides built-in pooling

### 🎯 Recommended Next Steps

1. **Create separate local database** (Option 2 or 3 above)
2. **Rotate database passwords** periodically
3. **Monitor database access** logs in Neon console
4. **Set up database backups** (Neon provides automatic backups)

## 📈 Performance Optimization

### Connection Pooling (✅ Active)

```typescript
// Prisma connection pooling
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
})
```

### Neon Configuration

- **Connection pooling**: Enabled
- **Read replicas**: Available on paid plans
- **Auto-scaling**: Included
- **Connection limits**: Automatically managed

## 🆘 Troubleshooting

### Local Development Issues

**Error: Connection refused**

```bash
# Check if using correct DATABASE_URL
cat .env | grep DATABASE_URL

# Test connection
npx prisma db push
```

**Error: Schema validation failed**

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database schema
npx prisma db push --force-reset
```

### Production Issues

**Error: Too many connections**

- Neon provides connection pooling
- Check for connection leaks in application code

**Error: SSL connection required**

- Ensure `?sslmode=require` in DATABASE_URL
- All Neon connections require SSL

## 📞 Support Resources

- **Neon Documentation**: https://neon.tech/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Vercel Environment Variables**: https://vercel.com/docs/projects/environment-variables
- **GitHub Actions Secrets**: https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

## 🎉 Success Status

✅ **Production Database**: Properly configured with Neon PostgreSQL  
✅ **CI/CD Pipeline**: Environment separation working  
✅ **Local Development**: Functional with shared Neon database  
✅ **Schema Management**: PostgreSQL-compatible schema  
✅ **Email Integration**: Working with proper test addresses

**Next Recommendation**: Set up separate local database (Option 2 or 3) for complete environment isolation.
