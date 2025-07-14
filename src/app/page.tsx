'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Users, Target, Star, Check, Shield, Clock, Globe, GraduationCap, Award, TrendingUp, Search, Calendar } from 'lucide-react';
import WebsiteLayout from '@/components/layout/WebsiteLayout';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Connect with verified professionals and academics who understand your journey.'
    },
    {
      icon: Globe,
      title: 'Language Support',
      description: 'Get guidance in your preferred language with culturally aware mentors.'
    },
    {
      icon: Target,
      title: 'Personalized Goals',
      description: 'Tailored mentorship based on your academic level and career aspirations.'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All mentors are background-checked and verified for your safety.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with easy rescheduling options.'
    },
    {
      icon: BookOpen,
      title: 'Progress Tracking',
      description: 'Monitor your growth with detailed progress reports and milestones.'
    }
  ];

  const steps = [
    { 
      step: '1', 
      title: 'Sign Up', 
      description: 'Create your profile and tell us about your goals',
      icon: Users
    },
    { 
      step: '2', 
      title: 'Find Mentors', 
      description: 'Browse verified mentors in your field and language',
      icon: TrendingUp
    },
    { 
      step: '3', 
      title: 'Book Session', 
      description: 'Schedule a session at your convenient time',
      icon: Calendar
    },
    { 
      step: '4', 
      title: 'Learn & Grow', 
      description: 'Get personalized guidance and track your progress',
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Engineering Student',
      content: 'My mentor helped me crack JEE Advanced and guided me through college applications. The personalized approach made all the difference.',
      rating: 5,
      avatar: '/api/placeholder/48/48'
    },
    {
      name: 'Arjun Patel',
      role: 'MBA Aspirant',
      content: 'Got amazing career guidance in Hindi. My mentor understood the Indian job market and helped me land my dream job.',
      rating: 5,
      avatar: '/api/placeholder/48/48'
    },
    {
      name: 'Sneha Reddy',
      role: 'Medical Student',
      content: 'The NEET preparation sessions were incredibly helpful. Having a mentor who spoke Telugu made learning so much easier.',
      rating: 5,
      avatar: '/api/placeholder/48/48'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '₹999',
      period: 'per session',
      features: [
        '1-on-1 video sessions',
        'Session recordings',
        'Basic progress tracking',
        'Email support'
      ]
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
        'Career resources'
      ],
      popular: true
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
        'Custom reporting'
      ]
    }
  ];

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-8">
              <GraduationCap className="w-4 h-4 mr-2" />
              Trusted by 10,000+ students
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Find Your Perfect
              <span className="text-slate-900 block">Mentor</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with expert mentors who understand your academic journey and career goals. 
              Get personalized guidance in your preferred language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/mentors')}
                className="px-8 py-4 bg-slate-900 text-white rounded-lg text-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                Find Mentors
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/register')}
                className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose UpMentor?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We connect you with verified mentors who speak your language and understand your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started with mentorship in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Students', icon: Users },
              { value: '500+', label: 'Expert Mentors', icon: Award },
              { value: '25+', label: 'Languages', icon: Globe },
              { value: '95%', label: 'Success Rate', icon: Target }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-slate-700" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real stories from students who found success with our mentors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that works best for your learning journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-sm border relative ${plan.popular ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{plan.price}</div>
                  <p className="text-slate-600">{plan.period}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => router.push('/register')}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
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
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already getting personalized mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="px-8 py-4 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Get Started Free
            </button>
            <button
              onClick={() => router.push('/mentors')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors"
            >
              Browse Mentors
            </button>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
