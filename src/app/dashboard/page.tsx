'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Users,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Mail,
  Phone,
  Settings,
  Bell,
} from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userType, setUserType] = useState<
    'student' | 'mentor' | 'pending' | null
  >(null)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user?.email) {
      // TODO: Fetch user type and dashboard data from API
      // For now, check if this is a new mentor application
      const isNewMentor = window.location.search.includes('mentor=true')
      if (isNewMentor) {
        setUserType('pending')
      } else {
        setUserType('student') // Default for existing users
      }
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
            <p className="mt-4 text-neutral-600">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const renderPendingMentorDashboard = () => (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-600" />
            <div>
              <CardTitle className="text-amber-900">
                Application Under Review
              </CardTitle>
              <p className="text-sm text-amber-700">
                Your mentor application is being processed
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                Status: Pending Review
              </Badge>
              <p className="text-sm text-amber-800">
                Thank you for applying to become a mentor! Our team is currently
                reviewing your application and documents. You can expect to hear
                from us within 2-3 business days.
              </p>
            </div>

            <div className="rounded-lg bg-white p-4">
              <h4 className="mb-3 font-medium text-amber-900">
                Application Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Application submitted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">
                    Document verification (in progress)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-neutral-400" />
                  <span className="text-sm text-neutral-500">
                    Background check
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-neutral-400" />
                  <span className="text-sm text-neutral-500">
                    Interview scheduling
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-neutral-400" />
                  <span className="text-sm text-neutral-500">
                    Final approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            What to Expect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Email Confirmation</h4>
                <p className="text-sm text-neutral-600">
                  You'll receive an email confirmation once we begin reviewing
                  your application.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Interview Call</h4>
                <p className="text-sm text-neutral-600">
                  If your documents are approved, we'll schedule a brief
                  interview call.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Platform Training</h4>
                <p className="text-sm text-neutral-600">
                  Once approved, you'll receive training on how to use our
                  mentoring platform.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-neutral-600">
            Have questions about your application or the mentor program? We're
            here to help!
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
            <Button variant="outline" size="sm">
              View FAQ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-brand-200 bg-brand-50">
        <CardHeader>
          <CardTitle className="text-brand-900">
            Welcome back, {session?.user?.name || 'Student'}!
          </CardTitle>
          <p className="text-brand-700">
            Continue your learning journey with expert mentors
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button className="bg-brand-600 hover:bg-brand-700">
              Find a Mentor
            </Button>
            <Button variant="outline">Complete Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Sessions Completed</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Learning Progress</p>
                <p className="text-2xl font-bold">0%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Average Rating</p>
                <p className="text-2xl font-bold">-</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Calendar className="mx-auto mb-3 h-12 w-12 text-neutral-400" />
            <p className="mb-4 text-neutral-600">
              No upcoming sessions scheduled
            </p>
            <Button>Book Your First Session</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Mentors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recommended Mentors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Users className="mx-auto mb-3 h-12 w-12 text-neutral-400" />
            <p className="mb-4 text-neutral-600">
              Complete your profile to get personalized mentor recommendations
            </p>
            <Button variant="outline">Complete Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="mt-2 text-neutral-600">
              {userType === 'pending' && 'Track your mentor application status'}
              {userType === 'student' && 'Manage your learning journey'}
              {userType === 'mentor' && 'Manage your mentoring activities'}
            </p>
          </div>

          {/* Dashboard Content */}
          {userType === 'pending' && renderPendingMentorDashboard()}
          {userType === 'student' && renderStudentDashboard()}
          {userType === 'mentor' && (
            <div className="py-20 text-center">
              <p>Mentor dashboard coming soon...</p>
            </div>
          )}

          {!userType && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
              <p className="mt-4 text-neutral-600">Loading your dashboard...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
