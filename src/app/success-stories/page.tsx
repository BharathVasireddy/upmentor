'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  Star,
  Quote,
  ArrowRight,
  Award,
  TrendingUp,
  Users,
  BookOpen,
} from 'lucide-react'

const successStories = [
  {
    id: 1,
    name: 'Arjun Patel',
    role: 'Engineering Student',
    university: 'IIT Delhi',
    image: '/api/placeholder/64/64',
    achievement: 'Cracked JEE Advanced with AIR 247',
    story:
      'With help from my physics mentor Dr. Sharma, I improved my problem-solving approach and gained confidence. Her personalized guidance was exactly what I needed to succeed.',
    rating: 5,
    subject: 'Physics & Mathematics',
    mentorName: 'Dr. Priya Sharma',
    duration: '6 months',
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    role: 'Medical Student',
    university: 'AIIMS Hyderabad',
    image: '/api/placeholder/64/64',
    achievement: 'NEET AIR 156 - Got into AIIMS',
    story:
      'My biology mentor helped me understand complex concepts in a simple way. The regular mock tests and personalized feedback made all the difference in my preparation.',
    rating: 5,
    subject: 'Biology & Chemistry',
    mentorName: 'Dr. Anita Desai',
    duration: '8 months',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    role: 'Computer Science Student',
    university: 'BITS Pilani',
    image: '/api/placeholder/64/64',
    achievement: 'Landed SDE role at Google',
    story:
      'My mentor guided me through data structures, algorithms, and system design. The mock interviews and coding practice sessions were incredibly valuable for my placement preparation.',
    rating: 5,
    subject: 'Computer Science',
    mentorName: 'Rajesh Kumar',
    duration: '4 months',
  },
  {
    id: 4,
    name: 'Priya Ghosh',
    role: 'MBA Student',
    university: 'IIM Bangalore',
    image: '/api/placeholder/64/64',
    achievement: 'CAT 99.8 percentile - IIM Bangalore',
    story:
      'My mentor helped me develop a strategic study plan for CAT. The personalized attention to my weak areas and regular progress tracking led to this amazing result.',
    rating: 5,
    subject: 'MBA Preparation',
    mentorName: 'Amit Patel',
    duration: '10 months',
  },
  {
    id: 5,
    name: 'Karthik Iyer',
    role: 'Design Student',
    university: 'NID Ahmedabad',
    image: '/api/placeholder/64/64',
    achievement: 'Selected for NID with scholarship',
    story:
      'My design mentor helped me build a strong portfolio and improve my creative thinking. The feedback on my projects was invaluable for my NID entrance preparation.',
    rating: 5,
    subject: 'Design & Creative Arts',
    mentorName: 'Sneha Reddy',
    duration: '5 months',
  },
  {
    id: 6,
    name: 'Anjali Sharma',
    role: 'Research Scholar',
    university: 'Indian Institute of Science',
    image: '/api/placeholder/64/64',
    achievement: 'Published 3 research papers',
    story:
      'My research mentor guided me through the entire research process, from literature review to publication. Her expertise in my field was exactly what I needed to excel.',
    rating: 5,
    subject: 'Research Methodology',
    mentorName: 'Prof. Vikram Singh',
    duration: '12 months',
  },
]

const stats = [
  {
    number: '10,000+',
    label: 'Students Mentored',
    icon: Users,
  },
  {
    number: '95%',
    label: 'Success Rate',
    icon: TrendingUp,
  },
  {
    number: '500+',
    label: 'Expert Mentors',
    icon: Award,
  },
  {
    number: '50,000+',
    label: 'Hours of Learning',
    icon: BookOpen,
  },
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Success Stories
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Real students, real achievements. See how personalized mentorship
              has helped thousands of students reach their academic and career
              goals.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                    <IconComponent className="h-8 w-8 text-brand-600" />
                  </div>
                  <div className="mb-2 text-3xl font-bold text-neutral-900">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Student Success Stories
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              From entrance exam success to career achievements, our students
              are reaching new heights with personalized mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map(story => (
              <Card
                key={story.id}
                className="h-full border-0 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="mb-4 h-8 w-8 text-brand-600" />

                  {/* Story */}
                  <p className="mb-6 italic leading-relaxed text-neutral-700">
                    "{story.story}"
                  </p>

                  {/* Rating */}
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>
                        {story.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {story.name}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {story.role}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {story.university}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className="mt-4 rounded-lg bg-brand-50 p-3">
                    <div className="text-sm font-semibold text-brand-900">
                      🎉 {story.achievement}
                    </div>
                    <div className="mt-1 text-xs text-brand-700">
                      Subject: {story.subject} • Duration: {story.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold">
            Ready to Write Your Success Story?
          </h2>
          <p className="mb-8 text-xl text-brand-100">
            Join thousands of students who have achieved their dreams with
            expert mentorship.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/register" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="ghost"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/mentors">Find Your Mentor</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
