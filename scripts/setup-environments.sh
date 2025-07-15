#!/bin/bash

# UpMentor Environment Setup Script
echo "🚀 Setting up UpMentor environments..."

# Function to setup local development with PostgreSQL
setup_local_postgresql() {
    echo "📝 Creating .env file for local PostgreSQL development..."
    cat > .env << 'EOF'
# UpMentor Local Development Environment (PostgreSQL)
# Consistent with production schema

# Database - Local PostgreSQL (matches production schema)
DATABASE_URL="postgresql://postgres:password@localhost:5432/upmentor_local"

# NextAuth Configuration  
NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E
FROM_EMAIL=mentor@cloud9digital.in

# Development Settings
NODE_ENV=development
EOF

    echo "✅ Local PostgreSQL .env created!"
    echo "⚠️  You need to set up local PostgreSQL:"
    echo "   1. Install PostgreSQL: brew install postgresql"
    echo "   2. Start PostgreSQL: brew services start postgresql" 
    echo "   3. Create database: createdb upmentor_local"
    echo "   4. Run: npx prisma db push"
}

# Function to setup with existing Neon database (shared for local dev)
setup_neon_shared() {
    echo "📝 Creating .env file using Neon database..."
    cat > .env << 'EOF'
# UpMentor Development Environment (Neon Database)
# Using production database for local development

# Database - Neon PostgreSQL (shared with production)
DATABASE_URL="postgresql://neondb_owner:npg_9zCYn3MUcKrA@ep-bold-salad-a1z4so8u-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E
FROM_EMAIL=mentor@cloud9digital.in

# Development Settings
NODE_ENV=development
EOF

    echo "✅ Neon shared .env created!"
    echo "⚠️  WARNING: This uses the production database!"
    echo "   Only use this for testing, not active development"
}

# Function to create separate Neon database for local
setup_neon_separate() {
    echo "📝 Creating .env file for separate Neon local database..."
    cat > .env << 'EOF'
# UpMentor Local Development Environment (Separate Neon DB)
# You need to create a separate database on Neon

# Database - Neon PostgreSQL (separate local database)
DATABASE_URL="postgresql://neondb_owner:password@your-neon-host/upmentor_local?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E
FROM_EMAIL=mentor@cloud9digital.in

# Development Settings
NODE_ENV=development
EOF

    echo "✅ Separate Neon .env template created!"
    echo "🔧 Next steps:"
    echo "   1. Go to https://console.neon.tech"
    echo "   2. Create a new database: upmentor_local"
    echo "   3. Update DATABASE_URL in .env with the new connection string"
    echo "   4. Run: npx prisma db push"
}

# Main menu
echo ""
echo "Choose your local development setup:"
echo "1) Local PostgreSQL (recommended for development)"
echo "2) Shared Neon database (quick start, but shares production data)"
echo "3) Separate Neon database (recommended for production-like local setup)"
echo "4) Show current production configuration"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        setup_local_postgresql
        ;;
    2)
        setup_neon_shared
        ;;
    3)
        setup_neon_separate
        ;;
    4)
        echo "📊 Current Production Configuration:"
        echo ""
        echo "🌐 Production Database:"
        echo "   Provider: Neon PostgreSQL"
        echo "   URL: postgresql://neondb_owner:***@ep-bold-salad-a1z4so8u-pooler.ap-southeast-1.aws.neon.tech/neondb"
        echo "   Location: ap-southeast-1 (Singapore)"
        echo "   Connection: Pooled with SSL"
        echo ""
        echo "🚀 Deployment:"
        echo "   Platform: Vercel"
        echo "   CI/CD: GitHub Actions"
        echo "   Environment Variables:"
        echo "     - DATABASE_URL_PRODUCTION (for main branch)"
        echo "     - DATABASE_URL_STAGING (for develop branch)"
        echo ""
        echo "📁 Your CI/CD is already configured with proper environment separation!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🔧 Setting up database schema..."

# Generate Prisma client and apply schema
npx prisma generate

if [ $choice -eq 1 ]; then
    echo "⚠️  Make sure PostgreSQL is running locally first!"
    echo "Run these commands if you haven't already:"
    echo "  brew install postgresql"
    echo "  brew services start postgresql"
    echo "  createdb upmentor_local"
    echo ""
    read -p "Press Enter when PostgreSQL is ready, or Ctrl+C to exit..."
fi

npx prisma db push

echo ""
echo "🎉 Environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Visit http://localhost:3000"
echo "3. Register a test user using delivered@resend.dev"
echo ""
echo "📚 Documentation:"
echo "- Database environments: docs/DATABASE_SETUP.md"
echo "- Email testing: docs/EMAIL_SETUP.md"
echo "" 