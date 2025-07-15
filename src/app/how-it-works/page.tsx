'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {
  Search,
  Calendar,
  Video,
  Award,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Star,
} from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Find Your Mentor',
    description:
      'Browse through hundreds of verified professors and industry experts. Filter by subject, language, experience, and ratings to find your perfect match.',
    icon: Search,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    step: '02',
    title: 'Book a Session',
    description:
      'Choose a convenient time slot and share your learning goals. No complex paperwork - just tell us what you want to achieve.',
    icon: Calendar,
    color: 'bg-green-50 text-green-600',
  },
  {
    step: '03',
    title: 'Learn & Grow',
    description:
      'Join your mentor for a personalized 1-on-1 video session. Get expert guidance, ask questions, and receive actionable advice.',
    icon: Video,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    step: '04',
    title: 'Track Progress',
    description:
      'Build lasting mentorship relationships. Track your progress, schedule follow-ups, and achieve your academic and career goals.',
    icon: Award,
    color: 'bg-orange-50 text-orange-600',
  },
]

const benefits = [
  {
    title: 'Verified Experts',
    description:
      'All mentors are carefully verified professors and industry professionals with proven track records.',
    icon: CheckCircle,
  },
  {
    title: 'Flexible Scheduling',
    description:
      'Book sessions that fit your schedule. Available 7 days a week with mentors across different time zones.',
    icon: Clock,
  },
  {
    title: 'Quality Guaranteed',
    description:
      'Every session is backed by our quality guarantee. Not satisfied? Get a full refund, no questions asked.',
    icon: Star,
  },
  {
    title: 'Community Support',
    description:
      'Join a community of learners and mentors. Share experiences, get advice, and grow together.',
    icon: Users,
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              How UpMentor Works
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Get personalized academic guidance from verified experts in just
              four simple steps. Start your learning journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.step} className="relative">
                  <Card className="h-full border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`rounded-xl p-3 ${step.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 text-sm font-bold text-brand-600">
                            STEP {step.step}
                          </div>
                          <CardTitle className="text-xl">
                            {step.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-600">{step.description}</p>
                    </CardContent>
                  </Card>

                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 hidden h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full bg-brand-100 lg:flex">
                      <ArrowRight className="h-4 w-4 text-brand-600" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Why Choose UpMentor?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              We're committed to providing the best mentorship experience with
              verified experts, flexible scheduling, and guaranteed quality.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                    <IconComponent className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold">
            Ready to Start Learning?
          </h2>
          <p className="mb-8 text-xl text-brand-100">
            Join thousands of students already learning with expert mentors.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/register" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="ghost"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
