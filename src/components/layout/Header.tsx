'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  LogIn,
  UserPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Find Mentors', href: '/mentors' },
  { name: 'How it Works', href: '/how-it-works' },
  { name: 'Success Stories', href: '/success-stories' },
]

interface HeaderProps {
  variant?: 'default' | 'simple'
  showBeta?: boolean
}

export default function Header({
  variant = 'default',
  showBeta = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const isAuthenticated = !!session?.user
  const isDashboardPage = pathname?.startsWith('/dashboard')

  if (variant === 'simple') {
    return (
      <header className="border-b border-neutral-200 bg-white px-4 py-4">
        <div className="container mx-auto max-w-6xl">
          <Logo size="md" />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo size="lg" showBeta={showBeta} />

          {/* Desktop Navigation - Centered */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center space-x-8 md:flex">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  className={`hidden items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:flex ${
                    isDashboardPage
                      ? 'bg-brand-100 text-brand-900'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                {/* Notifications */}
                <button className="relative rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-xs text-white">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                  >
                    <Avatar className="h-8 w-8 border-2 border-neutral-200">
                      <AvatarImage
                        src={session.user.image || ''}
                        alt={session.user.name || 'User'}
                      />
                      <AvatarFallback className="bg-brand-100 text-sm font-medium text-brand-600">
                        {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-neutral-200 bg-white py-2 shadow-large">
                      <div className="border-b border-neutral-100 px-4 py-3">
                        <p className="text-sm font-medium text-neutral-900">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {session.user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        >
                          <User className="mr-3 h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-neutral-100 pt-2">
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex w-full items-center px-4 py-2 text-sm text-error-600 hover:bg-error-50"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Sign In / Sign Up */}
                <Button variant="ghost" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-50 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-100 bg-white md:hidden">
            <div className="space-y-1 px-4 py-3">
              {/* Navigation links */}
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium ${
                    pathname === item.href
                      ? 'bg-brand-100 text-brand-900'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="space-y-2 border-t border-neutral-100 pt-4">
                  <Link
                    href="/dashboard"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block rounded-lg bg-brand-600 px-3 py-3 text-base font-medium text-white hover:bg-brand-700"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t border-neutral-100 pt-4">
                  <Link
                    href="/login"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-lg bg-brand-600 px-3 py-3 text-base font-medium text-white hover:bg-brand-700"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
