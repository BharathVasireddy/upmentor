'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  Users,
  Target,
  Star,
  Check,
  Shield,
  Clock,
  Globe,
  GraduationCap,
  Award,
  TrendingUp,
  Search,
  Calendar,
} from 'lucide-react'
import WebsiteLayout from '@/components/layout/WebsiteLayout'

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: Users,
      title: 'Expert Mentors',
      description:
        'Connect with verified professionals and academics who understand your journey.',
    },
    {
      icon: Globe,
      title: 'Language Support',
      description:
        'Get guidance in your preferred language with culturally aware mentors.',
    },
    {
      icon: Target,
      title: 'Personalized Goals',
      description:
        'Tailored mentorship based on your academic level and career aspirations.',
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description:
        'All mentors are background-checked and verified for your safety.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description:
        'Book sessions that fit your schedule with easy rescheduling options.',
    },
    {
      icon: BookOpen,
      title: 'Progress Tracking',
      description:
        'Monitor your growth with detailed progress reports and milestones.',
    },
  ]

  const steps = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your profile and tell us about your goals',
      icon: Users,
    },
    {
      step: '2',
      title: 'Find Mentors',
      description: 'Browse verified mentors in your field and language',
      icon: TrendingUp,
    },
    {
      step: '3',
      title: 'Book Session',
      description: 'Schedule a session at your convenient time',
      icon: Calendar,
    },
    {
      step: '4',
      title: 'Learn & Grow',
      description: 'Get personalized guidance and track your progress',
      icon: TrendingUp,
    },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Engineering Student',
      content:
        'My mentor helped me crack JEE Advanced and guided me through college applications. The personalized approach made all the difference.',
      rating: 5,
      avatar: '/api/placeholder/48/48',
    },
    {
      name: 'Arjun Patel',
      role: 'MBA Aspirant',
      content:
        'Got amazing career guidance in Hindi. My mentor understood the Indian job market and helped me land my dream job.',
      rating: 5,
      avatar: '/api/placeholder/48/48',
    },
    {
      name: 'Sneha Reddy',
      role: 'Medical Student',
      content:
        'The NEET preparation sessions were incredibly helpful. Having a mentor who spoke Telugu made learning so much easier.',
      rating: 5,
      avatar: '/api/placeholder/48/48',
    },
  ]

  const plans = [
    {
      name: 'Basic',
      price: '₹999',
      period: 'per session',
      features: [
        '1-on-1 video sessions',
        'Session recordings',
        'Basic progress tracking',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: '₹4999',
      period: 'per month',
      features: [
        'Unlimited sessions',
        'Priority mentor matching',
        'Advanced analytics',
        'WhatsApp support',
        'Career resources',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'for institutions',
      features: [
        'Bulk student accounts',
        'Institution dashboard',
        'Custom integrations',
        'Dedicated support',
        'Custom reporting',
      ],
    },
  ]

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <GraduationCap className="mr-2 h-4 w-4" />
              Trusted by 10,000+ students
            </div>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl">
              Find Your Perfect
              <span className="block text-slate-900">Mentor</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-600">
              Connect with expert mentors who understand your academic journey
              and career goals. Get personalized guidance in your preferred
              language.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => router.push('/mentors')}
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Find Mentors
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => router.push('/register')}
                className="rounded-lg border-2 border-slate-900 px-8 py-4 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Why Choose UpMentor?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              We connect you with verified mentors who speak your language and
              understand your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                  <feature.icon className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Get started with mentorship in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Students', icon: Users },
              { value: '500+', label: 'Expert Mentors', icon: Award },
              { value: '25+', label: 'Languages', icon: Globe },
              { value: '95%', label: 'Success Rate', icon: Target },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <stat.icon className="h-6 w-6 text-slate-700" />
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              What Students Say
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Real stories from students who found success with our mentors.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-slate-50 p-8">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-500"
                    />
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-slate-700">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Choose the plan that works best for your learning journey.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl border bg-white p-8 shadow-sm ${plan.popular ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <div className="mb-2 text-4xl font-bold text-slate-900">
                    {plan.price}
                  </div>
                  <p className="text-slate-600">{plan.period}</p>
                </div>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push('/register')}
                  className={`w-full rounded-lg py-3 font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Join thousands of students who are already getting personalized
            mentorship.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => router.push('/register')}
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Get Started Free
            </button>
            <button
              onClick={() => router.push('/mentors')}
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white hover:text-slate-900"
            >
              Browse Mentors
            </button>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  )
}
