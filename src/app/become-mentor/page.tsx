'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Award,
  TrendingUp,
  Globe,
  MessageCircle,
  Video,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function BecomeMentorPage() {
  const [email, setEmail] = useState('')

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Competitive Income',
      description:
        'Set your own rates and earn $50-$500+ per hour based on your expertise',
      highlight: 'Top mentors earn $200K+ annually',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description:
        'Choose when you want to mentor. Work as little as 2 hours per week',
      highlight: 'Complete schedule control',
    },
    {
      icon: TrendingUp,
      title: 'Build Your Personal Brand',
      description: 'Establish yourself as a thought leader in your industry',
      highlight: 'Grow your professional network',
    },
    {
      icon: Users,
      title: 'Make Real Impact',
      description: 'Help students and professionals achieve their career goals',
      highlight: 'Shape the next generation',
    },
  ]

  const stats = [
    { number: '50K+', label: 'Students Helped' },
    { number: '$2M+', label: 'Mentor Earnings' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '95%', label: 'Mentor Satisfaction' },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'ML Engineer at Google',
      image: '/api/placeholder/64/64',
      quote:
        "Mentoring on UpMentor has allowed me to give back while building my personal brand. I've helped 200+ students and earned over $50K in my spare time.",
      rating: 5,
      sessions: 342,
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Computer Science Professor, MIT',
      image: '/api/placeholder/64/64',
      quote:
        "The platform makes it incredibly easy to connect with motivated students. It's rewarding to see their growth and success.",
      rating: 5,
      sessions: 156,
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Product Manager at Meta',
      image: '/api/placeholder/64/64',
      quote:
        'UpMentor has transformed how I mentor. The quality of students is exceptional, and the platform handles all the logistics seamlessly.',
      rating: 5,
      sessions: 289,
    },
  ]

  const steps = [
    {
      step: '1',
      title: 'Apply & Get Verified',
      description:
        'Submit your application with credentials. We verify all mentors to maintain quality.',
      icon: CheckCircle,
    },
    {
      step: '2',
      title: 'Set Your Profile',
      description:
        'Create your mentor profile, set your rates, and define your expertise areas.',
      icon: Award,
    },
    {
      step: '3',
      title: 'Start Mentoring',
      description:
        'Get matched with students, schedule sessions, and start making an impact.',
      icon: Users,
    },
  ]

  const requirements = [
    'Advanced degree or 5+ years of professional experience',
    'Expertise in a high-demand field (Tech, Medicine, Business, etc.)',
    'Strong communication skills and passion for teaching',
    'Professional background at top companies or institutions',
    'Commitment to providing quality mentorship',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-50 via-white to-brand-50 pb-16 pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 font-display text-5xl font-bold text-neutral-900">
                Share Your Expertise.
                <br />
                <span className="text-brand-600">Transform Careers.</span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-xl text-neutral-600">
                Join thousands of professors and industry experts who are making
                an impact while earning substantial income through mentorship.
              </p>

              {/* CTA Form */}
              <div className="mx-auto mb-12 max-w-md">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 flex-1"
                  />
                  <Button size="lg" className="h-12 px-8">
                    Apply Now
                  </Button>
                </div>
                <p className="mt-3 text-sm text-neutral-500">
                  Join our exclusive network of verified experts
                </p>
              </div>

              {/* Stats */}
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-1 text-3xl font-bold text-brand-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
                Why Top Experts Choose UpMentor
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                Join a platform designed for professionals who want to make an
                impact while building their career.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                      <benefit.icon className="h-6 w-6 text-brand-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                      {benefit.title}
                    </h3>
                    <p className="mb-3 text-sm text-neutral-600">
                      {benefit.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="border-brand-200 bg-brand-50 text-brand-700"
                    >
                      {benefit.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-lg text-neutral-600">
                Our streamlined process gets you mentoring in days, not weeks.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                      {step.step}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-8 hidden h-6 w-6 text-neutral-300 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
                What Our Mentors Say
              </h2>
              <p className="text-lg text-neutral-600">
                Join thousands of satisfied mentors making a difference.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                        <Users className="h-6 w-6 text-neutral-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-neutral-500">
                        {testimonial.sessions} sessions
                      </span>
                    </div>

                    <p className="italic text-neutral-700">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
                Mentor Requirements
              </h2>
              <p className="text-lg text-neutral-600">
                We maintain high standards to ensure the best experience for
                students.
              </p>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                      <span className="text-neutral-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-600 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-display text-3xl font-bold text-white">
              Ready to Start Your Mentoring Journey?
            </h2>
            <p className="mb-8 text-xl text-brand-100">
              Join our exclusive network and start making an impact today.
            </p>

            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-white bg-white text-brand-600 hover:bg-brand-50"
              >
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="flex-1 border-white text-white hover:bg-brand-700"
              >
                Learn More
              </Button>
            </div>

            <p className="mt-6 text-sm text-brand-200">
              Application review typically takes 2-3 business days
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
