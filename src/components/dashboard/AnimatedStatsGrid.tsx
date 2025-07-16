import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  BookOpen,
  Star,
  DollarSign,
  Target,
  Award,
  Activity,
  UserCheck,
  Clock,
  Zap,
  BarChart3,
} from 'lucide-react'

interface StatItem {
  id: string
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color: string
  bgGradient: string
  delay: number
}

interface AnimatedStatsGridProps {
  userType: 'student' | 'mentor' | 'admin' | 'support'
}

export default function AnimatedStatsGrid({
  userType,
}: AnimatedStatsGridProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(
    {}
  )

  const getStatsConfig = (): StatItem[] => {
    switch (userType) {
      case 'student':
        return [
          {
            id: 'sessions',
            title: 'Sessions Completed',
            value: 42,
            change: '+23%',
            changeType: 'positive',
            icon: <BookOpen className="h-6 w-6" />,
            color: 'text-violet-600',
            bgGradient: 'from-violet-500/20 to-purple-500/10',
            delay: 0,
          },
          {
            id: 'progress',
            title: 'Progress Score',
            value: 87,
            change: '+12%',
            changeType: 'positive',
            icon: <TrendingUp className="h-6 w-6" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-teal-500/10',
            delay: 100,
          },
          {
            id: 'goals',
            title: 'Goals Achieved',
            value: '8/12',
            change: '+2 this week',
            changeType: 'positive',
            icon: <Target className="h-6 w-6" />,
            color: 'text-indigo-600',
            bgGradient: 'from-indigo-500/20 to-blue-500/10',
            delay: 200,
          },
          {
            id: 'rating',
            title: 'Avg Rating',
            value: 4.9,
            change: 'Excellent',
            changeType: 'positive',
            icon: <Star className="h-6 w-6" />,
            color: 'text-amber-600',
            bgGradient: 'from-amber-500/20 to-orange-500/10',
            delay: 300,
          },
        ]

      case 'mentor':
        return [
          {
            id: 'students',
            title: 'Active Students',
            value: 156,
            change: '+18 this month',
            changeType: 'positive',
            icon: <Users className="h-6 w-6" />,
            color: 'text-blue-600',
            bgGradient: 'from-blue-500/20 to-cyan-500/10',
            delay: 0,
          },
          {
            id: 'earnings',
            title: 'This Month',
            value: '₹47,320',
            change: '+34%',
            changeType: 'positive',
            icon: <DollarSign className="h-6 w-6" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-green-500/10',
            delay: 100,
          },
          {
            id: 'rating',
            title: 'Rating',
            value: 4.94,
            change: 'Top 5%',
            changeType: 'positive',
            icon: <Star className="h-6 w-6" />,
            color: 'text-purple-600',
            bgGradient: 'from-purple-500/20 to-pink-500/10',
            delay: 200,
          },
          {
            id: 'sessions',
            title: 'Total Sessions',
            value: 847,
            change: '+67 this month',
            changeType: 'positive',
            icon: <BookOpen className="h-6 w-6" />,
            color: 'text-orange-600',
            bgGradient: 'from-orange-500/20 to-red-500/10',
            delay: 300,
          },
        ]

      case 'admin':
        return [
          {
            id: 'users',
            title: 'Total Users',
            value: 12847,
            change: '+456 this week',
            changeType: 'positive',
            icon: <Users className="h-6 w-6" />,
            color: 'text-blue-600',
            bgGradient: 'from-blue-500/20 to-indigo-500/10',
            delay: 0,
          },
          {
            id: 'mentors',
            title: 'Active Mentors',
            value: 1203,
            change: '+89 this month',
            changeType: 'positive',
            icon: <UserCheck className="h-6 w-6" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-teal-500/10',
            delay: 100,
          },
          {
            id: 'sessions',
            title: 'Sessions Today',
            value: 234,
            change: 'Peak: 2-4 PM',
            changeType: 'neutral',
            icon: <Activity className="h-6 w-6" />,
            color: 'text-purple-600',
            bgGradient: 'from-purple-500/20 to-violet-500/10',
            delay: 200,
          },
          {
            id: 'revenue',
            title: 'Revenue',
            value: '₹2.4M',
            change: '+18%',
            changeType: 'positive',
            icon: <BarChart3 className="h-6 w-6" />,
            color: 'text-orange-600',
            bgGradient: 'from-orange-500/20 to-amber-500/10',
            delay: 300,
          },
        ]

      default:
        return []
    }
  }

  const stats = getStatsConfig()

  // Animate numbers on mount
  useEffect(() => {
    stats.forEach((stat, index) => {
      if (typeof stat.value === 'number') {
        setTimeout(() => {
          let current = 0
          const target = stat.value as number
          const increment = target / 60 // 60 frames for 1 second

          const animate = () => {
            if (current < target) {
              current += increment
              setAnimatedValues(prev => ({
                ...prev,
                [stat.id]: Math.min(current, target),
              }))
              requestAnimationFrame(animate)
            } else {
              setAnimatedValues(prev => ({
                ...prev,
                [stat.id]: target,
              }))
            }
          }

          animate()
        }, stat.delay)
      }
    })
  }, [])

  const formatValue = (stat: StatItem) => {
    if (typeof stat.value === 'number') {
      const animated = animatedValues[stat.id] || 0
      if (stat.id === 'rating') {
        return animated.toFixed(1)
      }
      if (stat.value > 1000) {
        return Math.floor(animated).toLocaleString()
      }
      return Math.floor(animated).toString()
    }
    return stat.value
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/10"
          style={{ animationDelay: `${stat.delay}ms` }}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div
              className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${stat.bgGradient} opacity-50`}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 p-6">
            {/* Icon */}
            <div
              className={`inline-flex rounded-xl bg-gradient-to-br p-3 ${stat.bgGradient} ${stat.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              {stat.icon}
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {stat.title}
              </p>

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-foreground">
                  {formatValue(stat)}
                </p>

                {stat.change && (
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      stat.changeType === 'positive'
                        ? 'bg-emerald-100/50 text-emerald-600'
                        : stat.changeType === 'negative'
                          ? 'bg-red-100/50 text-red-600'
                          : 'bg-neutral-100/50 text-muted-foreground'
                    } `}
                  >
                    {stat.changeType === 'positive' && (
                      <TrendingUp className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
            </div>

            {/* Progress indicator for certain stats */}
            {(stat.id === 'progress' || stat.id === 'rating') && (
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className={`h-full bg-gradient-to-r ${stat.bgGradient} transition-all duration-1000 ease-out`}
                  style={{
                    width:
                      stat.id === 'progress'
                        ? `${animatedValues[stat.id] || 0}%`
                        : `${((animatedValues[stat.id] || 0) / 5) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Floating particle effect */}
          <div className="absolute right-4 top-4 h-2 w-2 animate-ping rounded-full bg-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  )
}
