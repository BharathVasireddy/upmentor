# GitHub Actions CI/CD Setup Guide

This guide explains how to set up and configure the CI/CD pipeline for the UpMentor project using GitHub Actions.

## 🚀 Overview

Our CI/CD pipeline includes:
- **Code Quality**: ESLint, TypeScript checks, Prettier formatting
- **Security**: Dependency auditing, CodeQL analysis, Snyk scanning
- **Testing**: Unit tests, integration tests, E2E tests
- **Building**: Next.js application build
- **Deployment**: Automated deployment to Vercel (staging & production)
- **Database**: Automated migrations

## 📋 Prerequisites

Before setting up the CI/CD pipeline, ensure you have:

1. **GitHub repository** with the UpMentor codebase
2. **Vercel account** for deployment
3. **Database** (PostgreSQL) for production
4. **Required API keys** and secrets

## 🔧 Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, then add:

### Vercel Deployment
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here
```

### Database
```
DATABASE_URL=postgresql://username:password@host:5432/database_name
```

### Security Tools (Optional)
```
SNYK_TOKEN=your_snyk_token_here
LHCI_GITHUB_APP_TOKEN=your_lighthouse_ci_token_here
```

## 🏗️ Workflow Files

Our CI/CD setup includes three main workflow files:

### 1. `ci-cd.yml` - Main CI/CD Pipeline
- **Triggers**: Push to `main`/`develop`, PRs to `main`/`develop`
- **Jobs**: Code quality, testing, building, deployment
- **Environments**: Staging (develop) and Production (main)

### 2. `security.yml` - Security & Dependencies
- **Triggers**: Weekly schedule (Mondays 9 AM UTC), manual dispatch
- **Jobs**: Security scanning, dependency updates, CodeQL analysis

### 3. `e2e-tests.yml` - End-to-End Testing
- **Triggers**: Push to `main`/`develop`, PRs to `main`, daily schedule
- **Jobs**: E2E tests, visual regression, performance testing

## 📝 Getting Vercel Credentials

### 1. Get Vercel Token
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Settings → Tokens
3. Create a new token with appropriate scope
4. Copy the token and add it as `VERCEL_TOKEN` secret

### 2. Get Organization ID
1. Go to your Vercel team/organization settings
2. Copy the "Team ID" (this is your `VERCEL_ORG_ID`)

### 3. Get Project ID
1. Go to your Vercel project settings
2. Copy the "Project ID" (this is your `VERCEL_PROJECT_ID`)

## 🌿 Branch Strategy

Our pipeline supports a GitFlow-inspired branch strategy:

- **`main`** → Production deployments
- **`develop`** → Staging deployments
- **Feature branches** → Run tests and quality checks only

## 🧪 Testing Strategy

### Unit Tests
- **Framework**: Jest with React Testing Library
- **Location**: `src/**/*.test.tsx`
- **Coverage**: 70% minimum threshold
- **Run**: `npm test`

### Integration Tests
- **Framework**: Jest with database setup
- **Location**: `src/**/*.integration.test.tsx`
- **Run**: `npm run test:integration`

### E2E Tests
- **Framework**: Playwright
- **Location**: `e2e/**/*.spec.ts`
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Run**: `npm run test:e2e`

## 🔒 Security Features

### 1. Dependency Scanning
- **npm audit**: Checks for known vulnerabilities
- **Snyk**: Advanced vulnerability scanning
- **Automated**: Runs weekly and on every push

### 2. Code Analysis
- **CodeQL**: GitHub's semantic code analysis
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting checks

### 3. Secret Scanning
- **GitHub**: Automatic secret detection
- **Push Protection**: Prevents accidental secret commits

## 🚀 Deployment Process

### Staging Deployment (develop branch)
1. Code pushed to `develop`
2. All tests pass
3. Application builds successfully
4. Deploys to Vercel staging environment

### Production Deployment (main branch)
1. Code pushed to `main` (usually via PR from develop)
2. All tests pass
3. Application builds successfully
4. Deploys to Vercel production environment
5. Database migrations run automatically

## 📊 Monitoring & Notifications

### Build Status
- **GitHub Checks**: Status shown on PRs
- **Vercel**: Deployment status and logs
- **Actions Tab**: Detailed workflow logs

### Failure Notifications
- **GitHub**: Email notifications for failed workflows
- **Slack**: Configure webhook for team notifications (optional)

## 🛠️ Local Development Setup

To run the same checks locally:

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Format code
npm run format
```

## 🔧 Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check environment variables
   - Verify database connection
   - Check timezone differences

2. **Deployment failing**
   - Verify Vercel secrets are correct
   - Check build logs for errors
   - Ensure all environment variables are set

3. **Security scan failures**
   - Update vulnerable dependencies
   - Check for exposed secrets
   - Review CodeQL suggestions

### Debug Commands

```bash
# Run tests with verbose output
npm test -- --verbose

# Run E2E tests with UI
npm run test:e2e:ui

# Check TypeScript errors
npm run type-check

# Run security audit
npm audit
```

## 🔄 Updating the Pipeline

To modify the CI/CD pipeline:

1. Edit workflow files in `.github/workflows/`
2. Test changes on a feature branch
3. Create PR to `develop` for staging tests
4. Merge to `main` for production

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs/concepts/deployments)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Playwright E2E Testing](https://playwright.dev/docs/intro)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🎯 Best Practices

1. **Keep secrets secure** - Never commit API keys or passwords
2. **Test thoroughly** - Ensure all tests pass before merging
3. **Monitor deployments** - Check deployment status and logs
4. **Update dependencies** - Keep packages up to date for security
5. **Use environments** - Separate staging and production configurations 