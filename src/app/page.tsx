'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Users,
  BookOpen,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBeta={true} />

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl">
              Connect with
              <span className="text-brand-600">
                {' '}
                Professors & Certified Experts
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600">
              Get personalized guidance from university professors and certified
              industry professionals. Our exclusive network of verified experts
              will accelerate your academic and career growth.
            </p>
          </div>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild className="min-w-48">
              <Link href="/register" className="flex items-center gap-2">
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="min-w-48">
              <Link href="/mentors">Browse Mentors</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-1 font-display text-3xl font-bold text-neutral-900">
                5,000+
              </div>
              <div className="text-sm text-neutral-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-display text-3xl font-bold text-neutral-900">
                500+
              </div>
              <div className="text-sm text-neutral-600">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="mb-1 font-display text-3xl font-bold text-neutral-900">
                95%
              </div>
              <div className="text-sm text-neutral-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-neutral-900">
              Why Choose UpMentor?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              We've built the most comprehensive platform for professional
              growth and career advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                  <Users className="h-6 w-6 text-brand-600" />
                </div>
                <CardTitle>Professors & Certified Experts</CardTitle>
                <CardDescription>
                  Learn from university professors and certified professionals
                  from top institutions and companies like MIT, Stanford,
                  Google, and Meta.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Target className="h-6 w-6 text-brand-700" />
                </div>
                <CardTitle>Personalized Learning</CardTitle>
                <CardDescription>
                  Get customized learning paths and career guidance tailored to
                  your specific goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                  <BookOpen className="h-6 w-6 text-neutral-700" />
                </div>
                <CardTitle>Structured Sessions</CardTitle>
                <CardDescription>
                  Organized mentorship sessions with clear objectives and
                  measurable outcomes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                  <TrendingUp className="h-6 w-6 text-brand-600" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your growth with detailed analytics and milestone
                  tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                  <Shield className="h-6 w-6 text-neutral-700" />
                </div>
                <CardTitle>Secure Platform</CardTitle>
                <CardDescription>
                  Your data and conversations are protected with
                  enterprise-grade security.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Zap className="h-6 w-6 text-brand-700" />
                </div>
                <CardTitle>Instant Matching</CardTitle>
                <CardDescription>
                  Find the perfect mentor in minutes with our AI-powered
                  matching algorithm.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-neutral-900">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Get started with mentorship in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Create Your Profile
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Tell us about your background, goals, and what you're looking to
                achieve in your career.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Find Your Mentor
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Browse our curated list of mentors or let our AI match you with
                the perfect fit.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Start Growing
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Schedule sessions, set goals, and track your progress as you
                advance in your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-neutral-900">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Join thousands of professionals who have accelerated their careers
              with UpMentor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-warning-400 text-warning-400 h-4 w-4"
                    />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "UpMentor connected me with an amazing mentor who helped me
                  transition into tech. I landed my dream job at a Fortune 500
                  company within 6 months!"
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-neutral-100 pt-4">
                <div className="font-medium text-neutral-900">Sarah Chen</div>
                <div className="text-sm text-neutral-600">
                  Software Engineer at Google
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-warning-400 text-warning-400 h-4 w-4"
                    />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "The personalized guidance I received was invaluable. My
                  mentor helped me develop leadership skills and I was promoted
                  to Senior Manager."
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-neutral-100 pt-4">
                <div className="font-medium text-neutral-900">
                  Michael Rodriguez
                </div>
                <div className="text-sm text-neutral-600">
                  Senior Manager at Amazon
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-medium">
              <CardHeader>
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-warning-400 text-warning-400 h-4 w-4"
                    />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "As a career changer, I was lost. UpMentor matched me with
                  someone who had made the same transition. Their insights were
                  game-changing."
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t border-neutral-100 pt-4">
                <div className="font-medium text-neutral-900">
                  Emily Johnson
                </div>
                <div className="text-sm text-neutral-600">
                  Product Designer at Meta
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-display text-4xl font-bold text-neutral-900">
              Ready to Transform Your Career?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600">
              Join UpMentor today and connect with mentors who will guide you to
              success. Your future self will thank you.
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild className="min-w-48">
                <Link href="/register" className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="min-w-48">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                Free to get started
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
