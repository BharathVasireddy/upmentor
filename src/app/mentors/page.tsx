'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  ChevronDown,
  BookOpen,
  Award,
  Languages,
  Badge,
  MessageCircle,
  Video,
  CheckCircle,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge as BadgeComponent } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Mentor {
  id: number
  name: string
  title: string
  company: string
  expertise: string[]
  rating: number
  reviews: number
  hourlyRate: number
  languages: string[]
  location: string
  avatar: string
  responseTime: string
  totalSessions: number
  experience: string
  verified: boolean
  bio?: string
}

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [selectedResponseTime, setSelectedResponseTime] = useState('all')

  const categories = [
    { id: 'all', name: 'Categories' },
    { id: 'engineering', name: 'Engineering & Tech' },
    { id: 'medical', name: 'Medical & Healthcare' },
    { id: 'business', name: 'Business & MBA' },
    { id: 'design', name: 'Design & Creative' },
    { id: 'science', name: 'Science & Research' },
    { id: 'finance', name: 'Finance & Banking' },
  ]

  const languages = [
    { id: 'all', name: 'Language' },
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'telugu', name: 'Telugu' },
    { id: 'tamil', name: 'Tamil' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
  ]

  const experienceLevels = [
    { id: 'all', name: 'Experience' },
    { id: '0-2', name: '0-2 years' },
    { id: '3-5', name: '3-5 years' },
    { id: '6-10', name: '6-10 years' },
    { id: '10+', name: '10+ years' },
  ]

  const priceRanges = [
    { id: 'all', name: 'Price Range' },
    { id: '0-100', name: '$0 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: '200+', name: '$200+' },
  ]

  const responseTimes = [
    { id: 'all', name: 'Response Time' },
    { id: '1', name: 'Within 1 hour' },
    { id: '4', name: 'Within 4 hours' },
    { id: '24', name: 'Within 24 hours' },
  ]

  const mentors: Mentor[] = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design', 'Career Development'],
      rating: 4.9,
      reviews: 124,
      hourlyRate: 150,
      languages: ['English', 'Hindi'],
      location: 'Bangalore, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 2 hours',
      totalSessions: 89,
      experience: '8+ years',
      verified: true,
      bio: 'Passionate about helping developers grow their careers in tech. Specialized in full-stack development and system design.',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      title: 'Data Scientist',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis'],
      rating: 4.8,
      reviews: 96,
      hourlyRate: 120,
      languages: ['English', 'Hindi', 'Telugu'],
      location: 'Hyderabad, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 4 hours',
      totalSessions: 156,
      experience: '6+ years',
      verified: true,
      bio: 'Expert in machine learning and data science with experience in building ML models at scale.',
    },
    {
      id: 3,
      name: 'Dr. Anita Desai',
      title: 'Medical Professor',
      company: 'AIIMS Delhi',
      expertise: [
        'NEET Preparation',
        'Biology',
        'Medical Research',
        'Academic Writing',
      ],
      rating: 4.9,
      reviews: 78,
      hourlyRate: 180,
      languages: ['English', 'Hindi'],
      location: 'New Delhi, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 6 hours',
      totalSessions: 234,
      experience: '12+ years',
      verified: true,
      bio: 'Distinguished professor helping students excel in medical entrance exams and research.',
    },
    {
      id: 4,
      name: 'Amit Patel',
      title: 'Product Manager',
      company: 'Amazon',
      expertise: [
        'Product Strategy',
        'MBA Preparation',
        'Leadership',
        'Business Development',
      ],
      rating: 4.7,
      reviews: 112,
      hourlyRate: 200,
      languages: ['English', 'Hindi'],
      location: 'Mumbai, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 3 hours',
      totalSessions: 67,
      experience: '10+ years',
      verified: true,
      bio: 'Product management expert with deep experience in strategy, leadership, and business growth.',
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      title: 'UX Designer',
      company: 'Adobe',
      expertise: ['UI/UX Design', 'Figma', 'Design Thinking', 'User Research'],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 140,
      languages: ['English', 'Telugu', 'Hindi'],
      location: 'Bangalore, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 2 hours',
      totalSessions: 123,
      experience: '7+ years',
      verified: true,
      bio: 'Creative designer passionate about crafting exceptional user experiences and mentoring new designers.',
    },
    {
      id: 6,
      name: 'Prof. Vikram Singh',
      title: 'IIT Professor',
      company: 'IIT Bombay',
      expertise: [
        'JEE Advanced',
        'Physics',
        'Mathematics',
        'Engineering Entrance',
      ],
      rating: 4.9,
      reviews: 145,
      hourlyRate: 220,
      languages: ['English', 'Hindi'],
      location: 'Mumbai, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 4 hours',
      totalSessions: 289,
      experience: '15+ years',
      verified: true,
      bio: 'Renowned professor helping students achieve their engineering dreams through JEE preparation.',
    },
  ]

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'engineering' &&
        mentor.expertise.some(skill =>
          [
            'React',
            'Node.js',
            'Python',
            'System Design',
            'Machine Learning',
          ].some(tech => skill.toLowerCase().includes(tech.toLowerCase()))
        )) ||
      (selectedCategory === 'medical' &&
        mentor.expertise.some(
          skill =>
            skill.toLowerCase().includes('neet') ||
            skill.toLowerCase().includes('biology') ||
            skill.toLowerCase().includes('medical')
        )) ||
      (selectedCategory === 'business' &&
        mentor.expertise.some(
          skill =>
            skill.toLowerCase().includes('mba') ||
            skill.toLowerCase().includes('business') ||
            skill.toLowerCase().includes('product')
        )) ||
      (selectedCategory === 'design' &&
        mentor.expertise.some(
          skill =>
            skill.toLowerCase().includes('design') ||
            skill.toLowerCase().includes('ux') ||
            skill.toLowerCase().includes('ui')
        ))

    const matchesLanguage =
      selectedLanguage === 'all' ||
      mentor.languages.some(
        lang =>
          lang.toLowerCase() ===
          languages.find(l => l.id === selectedLanguage)?.name.toLowerCase()
      )

    const matchesPriceRange =
      selectedPriceRange === 'all' ||
      (selectedPriceRange === '0-100' && mentor.hourlyRate <= 100) ||
      (selectedPriceRange === '100-200' &&
        mentor.hourlyRate > 100 &&
        mentor.hourlyRate <= 200) ||
      (selectedPriceRange === '200+' && mentor.hourlyRate > 200)

    return (
      matchesSearch && matchesCategory && matchesLanguage && matchesPriceRange
    )
  })

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedLanguage('all')
    setSelectedExperience('all')
    setSelectedPriceRange('all')
    setSelectedResponseTime('all')
  }

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedLanguage !== 'all' ||
    selectedExperience !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedResponseTime !== 'all'

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-4 font-display text-4xl font-bold text-neutral-900">
                Find Your Perfect Mentor
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-neutral-600">
                Connect with verified professors and certified experts who
                understand your goals and can guide you towards success.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Filters - All in single line */}
        <div className="sticky top-16 z-40 border-b border-neutral-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Search Bar - Reduced width */}
              <div className="relative lg:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="h-11 pl-10"
                />
              </div>

              {/* All Filters */}
              <div className="flex flex-1 flex-wrap gap-3 lg:flex-nowrap">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-11 w-full lg:w-44">
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="h-11 w-full lg:w-36">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedExperience}
                  onValueChange={setSelectedExperience}
                >
                  <SelectTrigger className="h-11 w-full lg:w-36">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger className="h-11 w-full lg:w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedResponseTime}
                  onValueChange={setSelectedResponseTime}
                >
                  <SelectTrigger className="h-11 w-full lg:w-44">
                    <SelectValue placeholder="Response Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {responseTimes.map(time => (
                      <SelectItem key={time.id} value={time.id}>
                        {time.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="h-11 whitespace-nowrap px-4 text-neutral-600 hover:text-neutral-900"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Sort Header */}
          <div className="mb-6 flex justify-end">
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="sessions">Most Sessions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Horizontal Mentor Cards */}
          <div className="space-y-6">
            {filteredMentors.map(mentor => (
              <div
                key={mentor.id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Left: Avatar and Basic Info */}
                    <div className="flex items-start gap-4 lg:flex-shrink-0">
                      <div className="relative">
                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200">
                          <User className="h-12 w-12 text-brand-600" />
                        </div>
                        {mentor.verified && (
                          <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand-600 shadow-sm">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 lg:w-72">
                        <h3 className="mb-1 font-display text-2xl font-bold text-neutral-900">
                          {mentor.name}
                        </h3>
                        <p className="mb-1 text-lg font-semibold text-neutral-700">
                          {mentor.title}
                        </p>
                        <p className="mb-3 text-base font-bold text-brand-600">
                          {mentor.company}
                        </p>
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-bold">
                              {mentor.rating}
                            </span>
                          </div>
                          <span className="text-sm text-neutral-500">
                            ({mentor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Bio and Details */}
                    <div className="min-w-0 flex-1">
                      {/* Bio */}
                      {mentor.bio && (
                        <p className="mb-4 text-base leading-relaxed text-neutral-700">
                          {mentor.bio}
                        </p>
                      )}

                      {/* Expertise Tags */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {mentor.expertise.slice(0, 4).map((skill, index) => (
                          <BadgeComponent
                            key={index}
                            variant="secondary"
                            className="border-brand-200 bg-brand-50 px-3 py-1.5 text-sm text-brand-700"
                          >
                            {skill}
                          </BadgeComponent>
                        ))}
                        {mentor.expertise.length > 4 && (
                          <BadgeComponent
                            variant="outline"
                            className="border-neutral-300 px-3 py-1.5 text-sm"
                          >
                            +{mentor.expertise.length - 4} more
                          </BadgeComponent>
                        )}
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">
                              {mentor.responseTime}
                            </p>
                            <p className="text-xs text-neutral-500">
                              Response time
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">
                              {mentor.totalSessions}
                            </p>
                            <p className="text-xs text-neutral-500">Sessions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                            <Award className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">
                              {mentor.experience}
                            </p>
                            <p className="text-xs text-neutral-500">
                              Experience
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                            <Languages className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">
                              {mentor.languages.slice(0, 2).join(', ')}
                            </p>
                            <p className="text-xs text-neutral-500">
                              Languages
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{mentor.location}</span>
                      </div>
                    </div>

                    {/* Right: Price and Actions */}
                    <div className="flex flex-col justify-between lg:w-48 lg:flex-shrink-0">
                      <div className="mb-6 text-center lg:mb-0 lg:text-right">
                        <p className="text-3xl font-bold text-neutral-900">
                          ${mentor.hourlyRate}
                        </p>
                        <p className="text-sm font-medium text-neutral-500">
                          per hour
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="w-full">
                        <Button
                          className="h-12 w-full bg-brand-600 text-base font-semibold shadow-sm hover:bg-brand-700"
                          size="lg"
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredMentors.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
                <Search className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                No mentors found
              </h3>
              <p className="mx-auto mb-6 max-w-md text-neutral-600">
                Try adjusting your search criteria or browse all mentors to find
                the perfect match for your goals.
              </p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
