"use client";

import { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, ChevronDown, BookOpen, Award, Languages } from 'lucide-react';
import WebsiteLayout from '@/components/layout/WebsiteLayout';

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical' },
    { id: 'business', name: 'Business' },
    { id: 'arts', name: 'Arts & Design' },
    { id: 'science', name: 'Science' }
  ];

  const languages = [
    { id: 'all', name: 'All Languages' },
    { id: 'english', name: 'English' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'telugu', name: 'Telugu' },
    { id: 'tamil', name: 'Tamil' }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.9,
      reviews: 124,
      hourlyRate: 150,
      languages: ['English', 'Hindi'],
      location: 'Bangalore, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 2 hours',
      totalSessions: 89,
      experience: '8+ years',
      verified: true
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      title: 'Data Scientist',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'Statistics'],
      rating: 4.8,
      reviews: 96,
      hourlyRate: 120,
      languages: ['English', 'Hindi', 'Telugu'],
      location: 'Hyderabad, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 4 hours',
      totalSessions: 156,
      experience: '6+ years',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Anita Desai',
      title: 'Medical Professor',
      company: 'AIIMS Delhi',
      expertise: ['NEET', 'Biology', 'Medical Research'],
      rating: 4.9,
      reviews: 78,
      hourlyRate: 180,
      languages: ['English', 'Hindi'],
      location: 'New Delhi, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 6 hours',
      totalSessions: 234,
      experience: '12+ years',
      verified: true
    },
    {
      id: 4,
      name: 'Amit Patel',
      title: 'Product Manager',
      company: 'Amazon',
      expertise: ['Product Strategy', 'MBA Prep', 'Leadership'],
      rating: 4.7,
      reviews: 112,
      hourlyRate: 200,
      languages: ['English', 'Hindi'],
      location: 'Mumbai, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 3 hours',
      totalSessions: 67,
      experience: '10+ years',
      verified: true
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      title: 'UX Designer',
      company: 'Adobe',
      expertise: ['UI/UX Design', 'Figma', 'Design Thinking'],
      rating: 4.8,
      reviews: 89,
      hourlyRate: 140,
      languages: ['English', 'Telugu', 'Hindi'],
      location: 'Bangalore, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 2 hours',
      totalSessions: 123,
      experience: '7+ years',
      verified: true
    },
    {
      id: 6,
      name: 'Prof. Vikram Singh',
      title: 'IIT Professor',
      company: 'IIT Bombay',
      expertise: ['JEE Advanced', 'Physics', 'Mathematics'],
      rating: 4.9,
      reviews: 145,
      hourlyRate: 220,
      languages: ['English', 'Hindi'],
      location: 'Mumbai, India',
      avatar: '/api/placeholder/64/64',
      responseTime: '< 4 hours',
      totalSessions: 289,
      experience: '15+ years',
      verified: true
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           mentor.expertise.some(skill => skill.toLowerCase().includes(selectedCategory));
    const matchesLanguage = selectedLanguage === 'all' ||
                           mentor.languages.some(lang => lang.toLowerCase() === selectedLanguage);
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <WebsiteLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-lg text-slate-600">
            Connect with verified experts who understand your goals and speak your language.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Language Filter */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              >
                {languages.map(language => (
                  <option key={language.id} value={language.id}>{language.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2 text-slate-600" />
              <span className="text-slate-600">Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {filtersOpen && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Experience</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
                    <option>Any Experience</option>
                    <option>0-2 years</option>
                    <option>3-5 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
                    <option>Any Price</option>
                    <option>₹0 - ₹100</option>
                    <option>₹100 - ₹200</option>
                    <option>₹200 - ₹300</option>
                    <option>₹300+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
                    <option>Any Rating</option>
                    <option>4.8+ stars</option>
                    <option>4.5+ stars</option>
                    <option>4.0+ stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
                    <option>Any Time</option>
                    <option>Available Now</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full border-2 border-slate-200 mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-slate-900">{mentor.name}</h3>
                      {mentor.verified && (
                        <Award className="w-4 h-4 text-blue-600 ml-2" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{mentor.title}</p>
                    <p className="text-xs text-slate-500">{mentor.company}</p>
                  </div>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm font-medium text-slate-900">{mentor.rating}</span>
                  <span className="text-xs text-slate-500 ml-1">({mentor.reviews} reviews)</span>
                </div>
                <div className="text-sm text-slate-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {mentor.responseTime}
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                      +{mentor.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Languages and Location */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Languages className="w-4 h-4 mr-2" />
                  <span>{mentor.languages.join(', ')}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{mentor.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-900">{mentor.totalSessions}</div>
                  <div className="text-xs text-slate-600">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-900">{mentor.experience}</div>
                  <div className="text-xs text-slate-600">Experience</div>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-slate-900">₹{mentor.hourlyRate}</span>
                  <span className="text-sm text-slate-600">/hour</span>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredMentors.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
              Load More Mentors
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No mentors found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search criteria or filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLanguage('all');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </WebsiteLayout>
  );
} 