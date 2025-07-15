'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Target,
  Award,
  Clock,
  Globe,
  Calculator,
  Code,
  Beaker,
  Building,
  Briefcase,
  HeartHandshake,
  MessageSquare,
  TrendingUp,
  Shield,
  Sparkles,
} from 'lucide-react'

const subjects = [
  {
    name: 'Mathematics',
    count: '2,847',
    icon: Calculator,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Computer Science',
    count: '1,923',
    icon: Code,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Engineering',
    count: '1,534',
    icon: Building,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Science',
    count: '1,287',
    icon: Beaker,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Business',
    count: '2,156',
    icon: Briefcase,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    name: 'Medicine',
    count: '987',
    icon: HeartHandshake,
    color: 'bg-red-100 text-red-600',
  },
]

const featuredMentors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    subject: 'Computer Science',
    university: 'MIT',
    rating: 4.9,
    reviews: 127,
    price: '$85/hour',
    image: '/api/placeholder/64/64',
    specialties: ['Machine Learning', 'Algorithms', 'Data Structures'],
    quote: 'Helping students bridge theory and practice in CS',
  },
  {
    id: 2,
    name: 'Prof. Michael Rodriguez',
    subject: 'Mathematics',
    university: 'Stanford',
    rating: 4.8,
    reviews: 203,
    price: '$75/hour',
    image: '/api/placeholder/64/64',
    specialties: ['Calculus', 'Linear Algebra', 'Statistics'],
    quote: 'Making complex math concepts accessible to all',
  },
  {
    id: 3,
    name: 'Dr. Emily Johnson',
    subject: 'Engineering',
    university: 'CalTech',
    rating: 5.0,
    reviews: 89,
    price: '$95/hour',
    image: '/api/placeholder/64/64',
    specialties: ['Mechanical Engineering', 'Robotics', 'Design'],
    quote: "Engineering solutions for tomorrow's challenges",
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    role: 'Computer Science Student',
    university: 'UC Berkeley',
    rating: 5,
    content:
      'My mentor helped me land internships at Google and Meta. The personalized guidance was invaluable for my career development.',
    mentor: 'Dr. Sarah Chen',
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'Engineering Graduate',
    university: 'Georgia Tech',
    rating: 5,
    content:
      "From struggling with calculus to graduating summa cum laude. My mentor's teaching approach made all the difference.",
    mentor: 'Prof. Michael Rodriguez',
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Med School Applicant',
    university: 'Harvard',
    rating: 5,
    content:
      "Got into Harvard Medical School thanks to my mentor's guidance on research, applications, and interview prep.",
    mentor: 'Dr. Emily Johnson',
  },
]

export default function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  return (
    <div className="min-h-screen bg-white">
      <Header showBeta={true} />

      {/* Hero Section */}
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-neutral-900 lg:text-6xl">
                  Learn faster with your
                  <span className="text-brand-600"> best academic mentor</span>
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-neutral-600">
                  Connect with university professors and industry experts for
                  personalized academic guidance. Get the support you need to
                  excel in your studies and career.
                </p>
              </div>

              {/* Quick Mentor Finder */}
              <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="mb-4 font-display text-lg font-semibold text-neutral-900">
                  Find your perfect mentor
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Choose subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject.name} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg" className="mt-4 w-full" asChild>
                  <Link
                    href="/mentors"
                    className="flex items-center justify-center gap-2"
                  >
                    Find My Mentor
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="text-center">
                  <div className="mb-1 font-display text-2xl font-bold text-neutral-900">
                    5,000+
                  </div>
                  <div className="text-sm text-neutral-600">Expert mentors</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 font-display text-2xl font-bold text-neutral-900">
                    50,000+
                  </div>
                  <div className="text-sm text-neutral-600">5-star reviews</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 font-display text-2xl font-bold text-neutral-900">
                    120+
                  </div>
                  <div className="text-sm text-neutral-600">
                    Subjects taught
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-1 font-display text-2xl font-bold text-neutral-900">
                    4.9
                  </div>
                  <div className="text-sm text-neutral-600">Average rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Mentor */}
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md border-0 shadow-large">
                <CardHeader className="text-center">
                  <Avatar className="mx-auto mb-4 h-20 w-20 border-4 border-white shadow-medium">
                    <AvatarImage
                      src={featuredMentors[0].image}
                      alt={featuredMentors[0].name}
                    />
                    <AvatarFallback className="bg-brand-100 text-xl font-semibold text-brand-600">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">
                    {featuredMentors[0].name}
                  </CardTitle>
                  <CardDescription className="text-brand-600">
                    {featuredMentors[0].subject} •{' '}
                    {featuredMentors[0].university}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="fill-warning-400 text-warning-400 h-4 w-4" />
                      <span className="font-medium">
                        {featuredMentors[0].rating}
                      </span>
                    </div>
                    <span className="text-neutral-500">•</span>
                    <span className="text-sm text-neutral-600">
                      {featuredMentors[0].reviews} reviews
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-center italic text-neutral-600">
                    "{featuredMentors[0].quote}"
                  </p>
                  <div className="mb-4 flex flex-wrap justify-center gap-2">
                    {featuredMentors[0].specialties.map(specialty => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="mb-2 font-semibold text-neutral-900">
                      {featuredMentors[0].price}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/mentors/${featuredMentors[0].id}`}>
                        Book Trial Session
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Categories */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Find mentors in 120+ subjects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              From fundamental courses to advanced specializations, our expert
              mentors cover every academic field.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map(subject => {
              const IconComponent = subject.icon
              return (
                <Link
                  key={subject.name}
                  href={`/mentors?subject=${subject.name.toLowerCase()}`}
                >
                  <Card className="group cursor-pointer border-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-large">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className={`rounded-xl p-3 ${subject.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-brand-600">
                          {subject.name}
                        </CardTitle>
                        <CardDescription>
                          {subject.count} mentors available
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/mentors">View All Subjects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Meet our top-rated mentors
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Learn from professors and industry experts from the world's
              leading institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredMentors.map(mentor => (
              <Card
                key={mentor.id}
                className="group cursor-pointer border-0 shadow-medium transition-all duration-200 hover:-translate-y-1 hover:shadow-large"
              >
                <CardHeader className="text-center">
                  <Avatar className="mx-auto mb-4 h-16 w-16 border-2 border-neutral-200">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback className="bg-brand-100 text-brand-600">
                      {mentor.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg group-hover:text-brand-600">
                    {mentor.name}
                  </CardTitle>
                  <CardDescription>
                    {mentor.subject} • {mentor.university}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="fill-warning-400 text-warning-400 h-4 w-4" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                    <span className="text-neutral-500">•</span>
                    <span className="text-sm text-neutral-600">
                      {mentor.reviews} reviews
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 italic text-neutral-600">
                    "{mentor.quote}"
                  </p>
                  <div className="mb-4 flex flex-wrap justify-center gap-1">
                    {mentor.specialties.slice(0, 2).map(specialty => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs"
                      >
                        {specialty}
                      </Badge>
                    ))}
                    {mentor.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mentor.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="mb-3 font-semibold text-neutral-900">
                    {mentor.price}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/mentors/${mentor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              How UpMentor works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Get started with academic mentoring in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Find your mentor
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Browse our curated list of expert mentors by subject,
                university, or specialty. Read reviews and compare profiles to
                find your perfect match.
              </p>
              <div className="mt-4 flex justify-center">
                <Users className="h-8 w-8 text-brand-600" />
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Start learning
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Book a trial session to meet your mentor and discuss your goals.
                Then schedule regular sessions that fit your availability and
                learning style.
              </p>
              <div className="mt-4 flex justify-center">
                <BookOpen className="h-8 w-8 text-brand-600" />
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-4 font-display text-xl font-semibold text-neutral-900">
                Achieve your goals
              </h3>
              <p className="leading-relaxed text-neutral-600">
                Track your progress, master new concepts, and advance in your
                academic journey with personalized guidance and continuous
                support.
              </p>
              <div className="mt-4 flex justify-center">
                <Target className="h-8 w-8 text-brand-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Sessions you'll love. Guaranteed.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Join thousands of students who have accelerated their academic
              success with UpMentor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="border-0 shadow-medium">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="fill-warning-400 text-warning-400 h-4 w-4"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-t border-neutral-100 pt-4">
                  <div className="font-medium text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.university}
                  </div>
                  <div className="mt-2 text-xs text-brand-600">
                    Mentored by {testimonial.mentor}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="mx-auto max-w-md rounded-xl bg-brand-50 p-6">
              <Shield className="mx-auto mb-3 h-8 w-8 text-brand-600" />
              <h3 className="mb-2 font-semibold text-brand-900">
                Satisfaction Guarantee
              </h3>
              <p className="text-sm text-brand-700">
                Not satisfied with your first session? We'll find you another
                mentor or provide a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Mentor */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-3xl font-bold">
                Become a mentor
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-brand-100">
                Share your expertise with the next generation of students. Earn
                money while making a real impact on academic careers.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-200" />
                  <span className="text-brand-100">
                    Find eager students to mentor
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-200" />
                  <span className="text-brand-100">
                    Set your own schedule and rates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-200" />
                  <span className="text-brand-100">
                    Get paid securely and reliably
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link
                    href="/become-mentor"
                    className="flex items-center gap-2"
                  >
                    Become a Mentor
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/mentor-info">How it Works</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="text-3xl font-bold text-white">$50-150</div>
                    <div className="text-brand-200">Average hourly rate</div>
                  </CardHeader>
                </Card>
                <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-brand-200">Active mentors</div>
                  </CardHeader>
                </Card>
                <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="text-3xl font-bold text-white">4.9★</div>
                    <div className="text-brand-200">Mentor satisfaction</div>
                  </CardHeader>
                </Card>
                <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-brand-200">Support available</div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Training */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-neutral-50 p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Building className="h-8 w-8 text-brand-600" />
                  <h2 className="font-display text-2xl font-bold text-neutral-900">
                    Corporate Academic Training
                  </h2>
                </div>
                <p className="mb-6 text-lg text-neutral-600">
                  Upskill your team with personalized academic mentoring.
                  Perfect for companies investing in employee education and
                  professional development.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-neutral-700">
                      Customized learning programs
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-neutral-700">
                      Progress tracking and reporting
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success-500" />
                    <span className="text-neutral-700">
                      Dedicated account management
                    </span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/corporate">Book a Demo</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/corporate-info">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-white p-6 shadow-medium">
                    <div className="mb-3 flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-brand-600" />
                      <span className="font-semibold text-neutral-900">
                        85% skill improvement
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Average employee skill increase after 3 months
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-6 shadow-medium">
                    <div className="mb-3 flex items-center gap-3">
                      <Users className="h-6 w-6 text-brand-600" />
                      <span className="font-semibold text-neutral-900">
                        500+ companies
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Trust UpMentor for employee development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Sparkles className="mx-auto mb-6 h-12 w-12 text-brand-200" />
            <h2 className="mb-6 font-display text-4xl font-bold">
              Ready to accelerate your academic journey?
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-brand-100">
              Join thousands of students already learning with expert mentors.
              Start your personalized academic mentoring experience today.
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                variant="secondary"
                asChild
                className="min-w-48"
              >
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="ghost"
                className="min-w-48 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/mentors">Browse Mentors</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Free trial session
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                No subscription required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
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
