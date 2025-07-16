'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WelcomeHero from '@/components/dashboard/WelcomeHero'
import AnimatedStatsGrid from '@/components/dashboard/AnimatedStatsGrid'
import InteractiveActivityFeed from '@/components/dashboard/InteractiveActivityFeed'
import FloatingActionPanel from '@/components/dashboard/FloatingActionPanel'
import { getUserType, getMentorStatus } from '@/lib/auth-utils'
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [userType, setUserType] = useState<
    'student' | 'mentor' | 'admin' | 'support' | null
  >(null)
  const [mentorStatus, setMentorStatus] = useState<
    'pending' | 'approved' | 'rejected' | null
  >(null)
  const [viewMode, setViewMode] = useState<'mentor' | 'student'>('mentor')
  const [sessionUpdated, setSessionUpdated] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user) {
      const type = getUserType(session)
      const mentorStatus = getMentorStatus(session)

      setUserType(type)
      setMentorStatus(mentorStatus)

      // Auto-fix session if user has mentor verification status but no MENTOR role
      if (
        !sessionUpdated &&
        session?.user?.mentorVerificationStatus &&
        session?.user?.roles &&
        !session.user.roles.includes('MENTOR')
      ) {
        setSessionUpdated(true)
        update() // Force session refresh
      }
    }
  }, [session, status, router, update, sessionUpdated])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="space-y-6 text-center">
            {/* Animated loading circle */}
            <div className="relative mx-auto h-20 w-20">
              <div className="absolute inset-0 animate-pulse rounded-full border-4 border-purple-200"></div>
              <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-purple-600"></div>
              <div className="absolute inset-4 animate-pulse rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Preparing your dashboard
              </h3>
              <p className="text-sm text-muted-foreground">
                Crafting your personalized experience...
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentUserType =
    userType === 'mentor' && viewMode === 'student' ? 'student' : userType
  const displayUserType = currentUserType || 'student'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 antialiased">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Dashboard Header with View Switcher */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                  Your Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground">
                {displayUserType === 'mentor' &&
                  'Inspire and guide the next generation'}
                {displayUserType === 'student' &&
                  'Your learning journey continues here'}
                {displayUserType === 'admin' &&
                  'Command center for platform excellence'}
                {displayUserType === 'support' &&
                  'Help users achieve their goals'}
              </p>
            </div>

            {/* Enhanced View Switcher for Mentors */}
            {userType === 'mentor' && (
              <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/80 p-1.5 shadow-lg backdrop-blur-sm">
                <Button
                  variant={viewMode === 'mentor' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mentor')}
                  className={`rounded-xl transition-all duration-300 ${
                    viewMode === 'mentor'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'text-muted-foreground hover:bg-white/50 hover:text-foreground'
                  } `}
                >
                  <GraduationCap className="h-4 w-4" />
                  Mentor Mode
                </Button>
                <Button
                  variant={viewMode === 'student' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('student')}
                  className={`rounded-xl transition-all duration-300 ${
                    viewMode === 'student'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-muted-foreground hover:bg-white/50 hover:text-foreground'
                  } `}
                >
                  <BookOpen className="h-4 w-4" />
                  Student Mode
                </Button>
              </div>
            )}
          </div>

          {/* Welcome Hero Section */}
          <WelcomeHero
            userType={displayUserType}
            userName={session?.user?.name || ''}
            mentorStatus={mentorStatus}
          />

          {/* Animated Stats Grid */}
          <AnimatedStatsGrid userType={displayUserType} />

          {/* Interactive Activity Feed */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <InteractiveActivityFeed userType={displayUserType} />
            </div>

            {/* Quick Insights Sidebar */}
            <div className="space-y-6">
              {/* Quick Insights Card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/50 p-6 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                <div className="relative space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Quick Insights
                  </h3>

                  <div className="space-y-3">
                    {displayUserType === 'student' && (
                      <>
                        <div className="rounded-xl border border-blue-200/50 bg-blue-50 p-3">
                          <p className="text-sm font-medium text-blue-800">
                            Next Milestone
                          </p>
                          <p className="text-xs text-blue-600">
                            Complete 3 more sessions to unlock "Consistent
                            Learner" badge
                          </p>
                        </div>
                        <div className="rounded-xl border border-emerald-200/50 bg-emerald-50 p-3">
                          <p className="text-sm font-medium text-emerald-800">
                            Trending Skill
                          </p>
                          <p className="text-xs text-emerald-600">
                            React development is popular in your area
                          </p>
                        </div>
                      </>
                    )}

                    {displayUserType === 'mentor' && (
                      <>
                        <div className="rounded-xl border border-purple-200/50 bg-purple-50 p-3">
                          <p className="text-sm font-medium text-purple-800">
                            Peak Hours
                          </p>
                          <p className="text-xs text-purple-600">
                            Most bookings happen 6-8 PM on weekdays
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-200/50 bg-amber-50 p-3">
                          <p className="text-sm font-medium text-amber-800">
                            Popular Topic
                          </p>
                          <p className="text-xs text-amber-600">
                            Career guidance requests up 40% this month
                          </p>
                        </div>
                      </>
                    )}

                    {displayUserType === 'admin' && (
                      <>
                        <div className="rounded-xl border border-red-200/50 bg-red-50 p-3">
                          <p className="text-sm font-medium text-red-800">
                            Action Required
                          </p>
                          <p className="text-xs text-red-600">
                            12 mentor applications pending review
                          </p>
                        </div>
                        <div className="rounded-xl border border-green-200/50 bg-green-50 p-3">
                          <p className="text-sm font-medium text-green-800">
                            System Health
                          </p>
                          <p className="text-xs text-green-600">
                            All services running optimally
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievement Preview */}
              <div className="relative overflow-hidden rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-800">
                    🏆 Recent Achievement
                  </h3>

                  <div className="space-y-3 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                      <span className="text-2xl">🔥</span>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800">
                        {displayUserType === 'student'
                          ? 'Learning Streak'
                          : displayUserType === 'mentor'
                            ? 'Top Rated'
                            : 'Platform Growth'}
                      </p>
                      <p className="text-sm text-amber-600">
                        {displayUserType === 'student'
                          ? '7 days in a row!'
                          : displayUserType === 'mentor'
                            ? '4.9 stars this month'
                            : '1000+ new users'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Panel */}
      <FloatingActionPanel userType={displayUserType} />

      <Footer />
    </div>
  )
}
