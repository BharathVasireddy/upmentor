import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Rocket,
  Zap,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  Target,
} from 'lucide-react'

interface WelcomeHeroProps {
  userType: 'student' | 'mentor' | 'admin' | 'support'
  userName: string
  mentorStatus?: 'pending' | 'approved' | 'rejected' | null
}

export default function WelcomeHero({
  userType,
  userName,
  mentorStatus,
}: WelcomeHeroProps) {
  const getWelcomeConfig = () => {
    switch (userType) {
      case 'student':
        return {
          title: `Ready to level up, ${userName?.split(' ')[0]}?`,
          subtitle: 'Your next breakthrough is just one session away ✨',
          gradient: 'from-violet-600 via-purple-600 to-indigo-600',
          bgPattern: 'from-violet-500/10 via-purple-500/5 to-indigo-500/10',
          icon: <Rocket className="h-8 w-8 text-white" />,
          primaryAction: 'Book Epic Session',
          secondaryAction: 'Discover Mentors',
        }
      case 'mentor':
        return {
          title: `Time to inspire, ${userName?.split(' ')[0]}! 🌟`,
          subtitle: 'Your wisdom shapes the future, one student at a time',
          gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
          bgPattern: 'from-emerald-500/10 via-teal-500/5 to-cyan-500/10',
          icon: <Target className="h-8 w-8 text-white" />,
          primaryAction: 'Manage Sessions',
          secondaryAction: 'Update Availability',
        }
      case 'admin':
        return {
          title: `Command Center Active! 🚀`,
          subtitle: 'Orchestrating excellence across the platform',
          gradient: 'from-red-600 via-pink-600 to-rose-600',
          bgPattern: 'from-red-500/10 via-pink-500/5 to-rose-500/10',
          icon: <Zap className="h-8 w-8 text-white" />,
          primaryAction: 'Platform Overview',
          secondaryAction: 'Manage Users',
        }
      default:
        return {
          title: 'Welcome Back!',
          subtitle: 'Ready to make a difference',
          gradient: 'from-blue-600 via-indigo-600 to-purple-600',
          bgPattern: 'from-blue-500/10 via-indigo-500/5 to-purple-500/10',
          icon: <Sparkles className="h-8 w-8 text-white" />,
          primaryAction: 'Get Started',
          secondaryAction: 'Explore',
        }
    }
  }

  const config = getWelcomeConfig()

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12">
      {/* Animated Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.bgPattern} backdrop-blur-3xl`}
      />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm" />

      {/* Floating orbs animation */}
      <div className="absolute left-0 top-0 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tl from-white/5 to-transparent blur-3xl delay-1000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          {/* Icon + Status */}
          <div className="flex items-center gap-4">
            <div
              className={`rounded-2xl bg-gradient-to-br p-4 ${config.gradient} shadow-2xl shadow-black/20`}
            >
              {config.icon}
            </div>

            {/* Mentor Status Badge */}
            {userType === 'mentor' && mentorStatus && (
              <Badge
                variant="outline"
                className={`border px-3 py-1 text-sm font-medium backdrop-blur-sm ${
                  mentorStatus === 'pending'
                    ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                } `}
              >
                {mentorStatus === 'pending' ? (
                  <>
                    <Clock className="mr-1 h-3 w-3 animate-spin" />
                    Verification Pending
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified Mentor
                  </>
                )}
              </Badge>
            )}
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-foreground lg:text-5xl">
              {config.title}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground lg:text-xl">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[200px] lg:flex-col">
          <Button
            size="lg"
            className={`bg-gradient-to-r ${config.gradient} group relative overflow-hidden border-0 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25`}
          >
            <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]" />
            <Plus className="mr-2 h-5 w-5" />
            {config.primaryAction}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-white/20 bg-white/5 text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
          >
            {config.secondaryAction}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
