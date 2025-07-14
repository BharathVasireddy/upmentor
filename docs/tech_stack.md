# Tech Stack & Architecture Reference

## Core Technology Stack
- **Frontend + Backend:** Next.js 14 with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (battle-tested)
- **Video:** Zoom SDK (most reliable)
- **Payments:** Stripe (global standard)
- **Storage:** AWS S3 (industry standard)
- **Deployment:** Vercel (optimized for Next.js)

## Rationale
- **Next.js:** Mature, scalable, stable, large community
- **PostgreSQL:** Reliable, complex queries
- **Stripe:** Global leader, best documentation
- **AWS S3:** Never goes down, industry standard
- **Zoom SDK:** Enterprise-grade, reliable video

## Key Architectural Patterns
- **Monorepo:** Full-stack Next.js (App Router)
- **TypeScript-first:** Type safety throughout
- **Atomic Design:** UI components
- **RESTful API:** Grouped by feature
- **Zod Validation:** For all API inputs
- **Prisma ORM:** For DB access
- **Zustand:** For state management
- **Shadcn/ui + Tailwind:** For UI
- **Server Components:** For performance
- **Vercel:** For deployment

## Best Practices
- File-based routing
- Server components by default
- Streaming/Suspense for fast loads
- SEO optimization
- Parallel routes for complex UI
- Colocation of files
- Middleware for auth/protection
- Hot reload, error boundaries, loading states 