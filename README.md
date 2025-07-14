# UpMentor - Modern Mentorship Platform

A comprehensive mentorship platform built with Next.js 14, connecting students with experienced mentors for personalized guidance and career development.

## 🚀 Features

### For Students

- **Smart Mentor Matching**: AI-powered matching based on academic background, career goals, and interests
- **Multi-step Onboarding**: Comprehensive profile setup with academic details, goals assessment, and preferences
- **Interactive Dashboard**: Track progress, manage tasks, and view session history
- **Advanced Search**: Filter mentors by expertise, ratings, availability, and languages
- **Session Management**: Book, reschedule, and manage mentorship sessions

### For Mentors

- **Profile Management**: Showcase expertise, experience, and availability
- **Student Insights**: View student profiles and matching compatibility
- **Session Tools**: Integrated calendar and session management
- **Impact Tracking**: Monitor mentorship effectiveness and student progress

### Platform Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Real-time Communication**: Integrated messaging and video calls
- **Progress Tracking**: Comprehensive analytics and reporting
- **Secure Authentication**: Role-based access control with NextAuth.js
- **Payment Integration**: Stripe integration for session payments

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Lucide Icons
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/upmentor.git
   cd upmentor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/upmentor"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂 Project Structure

```
upmentor/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   └── onboarding/        # Onboarding flow
│   ├── components/            # React components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   ├── onboarding/       # Onboarding components
│   │   └── ui/               # UI components (Shadcn)
│   ├── lib/                  # Utility functions
│   └── styles/               # Global styles
├── prisma/                   # Database schema and migrations
├── docs/                     # Documentation
└── public/                   # Static assets
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Database Management

- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client

## 🎨 Design System

The platform uses a modern, clean design system with:

- **Color Palette**: Slate-based colors for professional appearance
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: Consistent Lucide icons (w-5 h-5 standard, w-6 h-6 for emphasis)
- **Components**: Shadcn/ui components with custom styling
- **Responsive**: Mobile-first approach with breakpoint-specific designs

## 📱 Key Pages

- **Landing Page** (`/`) - Hero section, features, testimonials, pricing
- **Dashboard** (`/dashboard`) - Student/mentor dashboard with tasks and progress
- **Mentors** (`/mentors`) - Browse and filter available mentors
- **Onboarding** (`/onboarding/*`) - Multi-step profile setup
- **Authentication** (`/register`) - User registration and login

## 🔒 Authentication & Security

- Role-based access control (Student, Mentor, Admin)
- Secure session management with NextAuth.js
- Protected API routes with middleware
- Input validation and sanitization
- CSRF protection

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployments on push to main branch

For other platforms, ensure you have:

- Node.js 18+ runtime
- PostgreSQL database
- Environment variables configured

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js 14 and modern web technologies. # GitHub Actions Secrets Added
