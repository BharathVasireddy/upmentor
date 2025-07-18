#!/bin/bash

# UpMentor Local Environment Setup Script
echo "🚀 Setting up UpMentor local development environment..."

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
fi

# Create .env file for local development
echo "📝 Creating .env file for local development..."
cat > .env << 'EOF'
# UpMentor Local Development Environment
# Generated by setup-local-env.sh

# Database - SQLite for local development
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-jwt-key-here-min-32-chars-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_GAQ1SiK9_GBkNDP3Lv7Q4UfGPYWCUZA9E
FROM_EMAIL=mentor@cloud9digital.in

# Development Settings
NODE_ENV=development
EOF

echo "✅ .env file created successfully!"

# Set up database
echo "🗄️  Setting up local SQLite database..."
npx prisma generate
npx prisma db push

echo ""
echo "🎉 Local environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Visit http://localhost:3000"
echo "3. For production deployment, see docs/DATABASE_SETUP.md"
echo ""
echo "📚 Documentation:"
echo "- Database setup: docs/DATABASE_SETUP.md"
echo "- Email setup: docs/EMAIL_SETUP.md"
echo "" 