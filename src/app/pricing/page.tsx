'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    duration: 'Forever',
    description: 'Perfect for exploring the platform',
    features: [
      'Browse mentor profiles',
      'Read reviews and ratings',
      'Basic search and filters',
      'Contact mentors directly',
      'Community access',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Student',
    price: '₹199',
    duration: 'per month',
    description: 'Best for regular mentoring sessions',
    features: [
      'Everything in Free',
      'Book unlimited sessions',
      'Priority mentor matching',
      'Session recordings',
      'Progress tracking',
      'Email support',
    ],
    buttonText: 'Start Learning',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    name: 'Professional',
    price: '₹399',
    duration: 'per month',
    description: 'For career advancement and skill development',
    features: [
      'Everything in Student',
      'Premium mentor access',
      'Career path guidance',
      'Portfolio reviews',
      'Interview preparation',
      'Priority support',
      'Certification guidance',
    ],
    buttonText: 'Advance Career',
    buttonVariant: 'default' as const,
    popular: false,
  },
]

const features = [
  'No setup fees or hidden charges',
  'Cancel or pause anytime',
  'All sessions protected by our guarantee',
  'Pay-per-session option available',
  'Group session discounts',
  'Student verification discounts',
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Choose the plan that works for you. Start free and upgrade when
              you're ready to accelerate your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? 'border-brand-200 shadow-lg' : 'border-neutral-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-brand-600 px-4 py-1 text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-neutral-900">
                      {plan.price}
                    </span>
                    <span className="text-neutral-600">/{plan.duration}</span>
                  </div>
                  <p className="mt-2 text-neutral-600">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check className="h-4 w-4 text-brand-600" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      variant={plan.buttonVariant}
                      className="w-full"
                      size="lg"
                      asChild
                    >
                      <Link
                        href="/register"
                        className="flex items-center justify-center gap-2"
                      >
                        {plan.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-8 font-display text-3xl font-bold text-neutral-900">
              What's Included
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 rounded-lg bg-white p-4"
                >
                  <Check className="h-5 w-5 text-brand-600" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-display text-3xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  Can I change my plan anytime?
                </h3>
                <p className="text-neutral-600">
                  Yes! You can upgrade, downgrade, or cancel your plan at any
                  time. Changes take effect immediately.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  What if I'm not satisfied with a session?
                </h3>
                <p className="text-neutral-600">
                  We offer a 100% satisfaction guarantee. If you're not happy
                  with a session, we'll provide a full refund or help you find a
                  better mentor match.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  Are there any additional fees?
                </h3>
                <p className="text-neutral-600">
                  No hidden fees! The prices shown include everything. You only
                  pay the mentor's hourly rate plus our small platform fee.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  Can I book sessions without a subscription?
                </h3>
                <p className="text-neutral-600">
                  Yes! You can always book individual sessions on a
                  pay-per-session basis without any subscription commitment.
                </p>
              </div>
            </div>
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
            Join thousands of students already accelerating their careers with
            expert mentorship.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/register" className="flex items-center gap-2">
                Start Free Trial
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
