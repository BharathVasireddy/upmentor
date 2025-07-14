"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Find Mentors', href: '/mentors', icon: Search },
  { name: 'How it Works', href: '/how-it-works', icon: BookOpen },
  { name: 'Success Stories', href: '/success-stories', icon: User },
];

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock user data - replace with actual auth
  const user = {
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'student'
  };

  const isLoggedIn = true; // Replace with actual auth check
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">UpMentor</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    className="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {isLoggedIn ? (
                <>
                  {/* Dashboard Link */}
                  <Link
                    href="/dashboard"
                    className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDashboardPage
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Notifications */}
                  <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-slate-200"
                      />
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </button>

                    {profileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Home className="w-4 h-4 mr-3" />
                            Dashboard
                          </Link>
                          <Link href="/sessions" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Calendar className="w-4 h-4 mr-3" />
                            My Sessions
                          </Link>
                          <Link href="/messages" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <MessageCircle className="w-4 h-4 mr-3" />
                            Messages
                          </Link>
                          <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 pt-2">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="w-4 h-4 mr-3" />
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
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 py-4 space-y-2">
              {/* Search on mobile */}
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search mentors..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium ${
                    pathname === item.href
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium ${
                      isDashboardPage
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/sessions"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>My Sessions</span>
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Messages</span>
                  </Link>
                </>
              ) : (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <Link
                    href="/login"
                    className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-3 rounded-lg text-base font-medium bg-slate-900 text-white hover:bg-slate-800"
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
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">UpMentor</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect with expert mentors and accelerate your academic and career journey.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">For Students</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/mentors" className="hover:text-slate-900 transition-colors">Find Mentors</Link></li>
                <li><Link href="/subjects" className="hover:text-slate-900 transition-colors">Browse Subjects</Link></li>
                <li><Link href="/how-it-works" className="hover:text-slate-900 transition-colors">How it Works</Link></li>
                <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">For Mentors</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/become-mentor" className="hover:text-slate-900 transition-colors">Become a Mentor</Link></li>
                <li><Link href="/mentor-resources" className="hover:text-slate-900 transition-colors">Resources</Link></li>
                <li><Link href="/mentor-community" className="hover:text-slate-900 transition-colors">Community</Link></li>
                <li><Link href="/mentor-support" className="hover:text-slate-900 transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-slate-900 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 mt-8 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 UpMentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 