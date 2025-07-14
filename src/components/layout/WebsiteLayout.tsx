'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Menu,
  X,
  Search,
  User,
  BookOpen,
  MessageCircle,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Calendar,
  Home,
} from 'lucide-react'

const navigation = [
  { name: 'Find Mentors', href: '/mentors', icon: Search },
  { name: 'How it Works', href: '/how-it-works', icon: BookOpen },
  { name: 'Success Stories', href: '/success-stories', icon: User },
]

interface WebsiteLayoutProps {
  children: React.ReactNode
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Mock user data - replace with actual auth
  const user = {
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'student',
  }

  const isLoggedIn = true // Replace with actual auth check
  const isDashboardPage = pathname?.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">
                  UpMentor
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-8 md:flex">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {isLoggedIn ? (
                <>
                  {/* Dashboard Link */}
                  <Link
                    href="/dashboard"
                    className={`hidden items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:flex ${
                      isDashboardPage
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Notifications */}
                  <button className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      3
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-slate-50"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full border-2 border-slate-200"
                      />
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-100 bg-white py-2 shadow-lg">
                        <div className="border-b border-slate-100 px-4 py-3">
                          <p className="text-sm font-medium text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <Home className="mr-3 h-4 w-4" />
                            Dashboard
                          </Link>
                          <Link
                            href="/sessions"
                            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <Calendar className="mr-3 h-4 w-4" />
                            My Sessions
                          </Link>
                          <Link
                            href="/messages"
                            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <MessageCircle className="mr-3 h-4 w-4" />
                            Messages
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            <Settings className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 pt-2">
                          <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="mr-3 h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-50 md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="space-y-2 px-4 py-4">
              {/* Search on mobile */}
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium ${
                    pathname === item.href
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium ${
                      isDashboardPage
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/sessions"
                    className="flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>My Sessions</span>
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </>
              ) : (
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-lg bg-slate-900 px-3 py-3 text-base font-medium text-white hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">
                  UpMentor
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Connect with expert mentors and accelerate your academic and
                career journey.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-900">
                For Students
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <Link
                    href="/mentors"
                    className="transition-colors hover:text-slate-900"
                  >
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects"
                    className="transition-colors hover:text-slate-900"
                  >
                    Browse Subjects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="transition-colors hover:text-slate-900"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="transition-colors hover:text-slate-900"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-900">For Mentors</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <Link
                    href="/become-mentor"
                    className="transition-colors hover:text-slate-900"
                  >
                    Become a Mentor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentor-resources"
                    className="transition-colors hover:text-slate-900"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentor-community"
                    className="transition-colors hover:text-slate-900"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentor-support"
                    className="transition-colors hover:text-slate-900"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-900">Company</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors hover:text-slate-900"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="transition-colors hover:text-slate-900"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-slate-900"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-slate-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 UpMentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
