'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {
  Search,
  Book,
  Users,
  CreditCard,
  Settings,
  MessageCircle,
} from 'lucide-react'

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of using UpMentor',
    articles: [
      'How to create an account',
      'Setting up your profile',
      'Finding the right mentor',
      'Booking your first session',
    ],
  },
  {
    title: 'Sessions & Booking',
    icon: Users,
    description: 'Everything about mentoring sessions',
    articles: [
      'How to book a session',
      'Rescheduling and cancellation',
      'Session preparation tips',
      'Technical requirements',
    ],
  },
  {
    title: 'Payments & Billing',
    icon: CreditCard,
    description: 'Billing, payments, and refunds',
    articles: [
      'Payment methods accepted',
      'Understanding our pricing',
      'Refund policy',
      'Billing FAQ',
    ],
  },
  {
    title: 'Account Settings',
    icon: Settings,
    description: 'Manage your account and preferences',
    articles: [
      'Updating your profile',
      'Notification settings',
      'Privacy controls',
      'Deleting your account',
    ],
  },
]

const faqs = [
  {
    question: 'How do I book a session with a mentor?',
    answer:
      'Browse our mentor profiles, select a mentor that matches your needs, choose an available time slot, and complete the booking with payment.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer:
      'You can cancel or reschedule up to 24 hours before your session for a full refund. For cancellations within 24 hours, a 50% refund applies.',
  },
  {
    question: 'How are mentors verified?',
    answer:
      'All mentors go through a comprehensive verification process including background checks, credential verification, and trial sessions.',
  },
  {
    question: 'What technology do I need for sessions?',
    answer:
      'You need a computer or mobile device with a stable internet connection, webcam, and microphone. We use Zoom for video sessions.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Help Center
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-neutral-600">
              Find answers to your questions and learn how to make the most of
              UpMentor.
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full rounded-lg border border-neutral-300 bg-white py-3 pl-10 pr-4 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-neutral-900">
            Browse by Category
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="transition-shadow hover:shadow-md">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100">
                      <IconComponent className="h-6 w-6 text-brand-600" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-neutral-600">
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link
                            href="#"
                            className="text-brand-600 hover:underline"
                          >
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center font-display text-3xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <MessageCircle className="mx-auto mb-6 h-16 w-16 text-brand-600" />
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Still need help?
            </h2>
            <p className="mb-8 text-lg text-neutral-600">
              Can't find what you're looking for? Our support team is here to
              help you 24/7.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:support@upmentor.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
