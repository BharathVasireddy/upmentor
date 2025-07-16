import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  MessageSquare,
  Video,
  Clock,
  Sparkles,
  Target,
  Users,
  Calendar,
  ArrowRight,
  Play,
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'achievement' | 'session' | 'milestone' | 'review' | 'goal'
  title: string
  description: string
  time: string
  status: 'completed' | 'ongoing' | 'upcoming'
  icon: React.ReactNode
  color: string
  bgGradient: string
  value?: string
  actionLabel?: string
}

interface InteractiveActivityFeedProps {
  userType: 'student' | 'mentor' | 'admin' | 'support'
}

export default function InteractiveActivityFeed({
  userType,
}: InteractiveActivityFeedProps) {
  const [activeTab, setActiveTab] = useState<
    'recent' | 'upcoming' | 'achievements'
  >('recent')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const getActivities = (): ActivityItem[] => {
    if (userType === 'student') {
      return [
        {
          id: '1',
          type: 'session',
          title: 'Career Strategy Session',
          description: 'Discussed growth opportunities in tech',
          time: '2 hours ago',
          status: 'completed',
          icon: <Video className="h-5 w-5" />,
          color: 'text-blue-600',
          bgGradient: 'from-blue-500/20 to-cyan-500/10',
          value: '5.0 ⭐',
          actionLabel: 'View Summary',
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Learning Streak!',
          description: 'Completed 7 consecutive sessions',
          time: '1 day ago',
          status: 'completed',
          icon: <Award className="h-5 w-5" />,
          color: 'text-amber-600',
          bgGradient: 'from-amber-500/20 to-orange-500/10',
          value: '🔥 7',
          actionLabel: 'Share Achievement',
        },
        {
          id: '3',
          type: 'goal',
          title: 'React Mastery Progress',
          description: 'Completed advanced hooks module',
          time: '3 days ago',
          status: 'ongoing',
          icon: <Target className="h-5 w-5" />,
          color: 'text-purple-600',
          bgGradient: 'from-purple-500/20 to-pink-500/10',
          value: '75%',
          actionLabel: 'Continue Learning',
        },
        {
          id: '4',
          type: 'session',
          title: 'Mock Interview',
          description: 'Practice technical interview with Sarah',
          time: 'Tomorrow 3:00 PM',
          status: 'upcoming',
          icon: <Calendar className="h-5 w-5" />,
          color: 'text-emerald-600',
          bgGradient: 'from-emerald-500/20 to-teal-500/10',
          actionLabel: 'Join Session',
        },
      ]
    } else if (userType === 'mentor') {
      return [
        {
          id: '1',
          type: 'session',
          title: 'Mentoring Session with Rahul',
          description: 'Career guidance and technical interview prep',
          time: '1 hour ago',
          status: 'completed',
          icon: <Video className="h-5 w-5" />,
          color: 'text-blue-600',
          bgGradient: 'from-blue-500/20 to-cyan-500/10',
          value: '5.0 ⭐',
          actionLabel: 'Add Notes',
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Top Mentor Badge',
          description: 'Achieved 4.9+ rating for 3 months',
          time: '2 days ago',
          status: 'completed',
          icon: <Award className="h-5 w-5" />,
          color: 'text-amber-600',
          bgGradient: 'from-amber-500/20 to-orange-500/10',
          value: '🏆',
          actionLabel: 'View Badge',
        },
        {
          id: '3',
          type: 'milestone',
          title: '100th Student Milestone!',
          description: 'Reached 100 students mentored',
          time: '1 week ago',
          status: 'completed',
          icon: <Users className="h-5 w-5" />,
          color: 'text-purple-600',
          bgGradient: 'from-purple-500/20 to-pink-500/10',
          value: '💯',
          actionLabel: 'Celebrate',
        },
        {
          id: '4',
          type: 'session',
          title: 'Group Session: React Best Practices',
          description: 'Teaching 5 students about React patterns',
          time: 'Today 4:00 PM',
          status: 'upcoming',
          icon: <Calendar className="h-5 w-5" />,
          color: 'text-emerald-600',
          bgGradient: 'from-emerald-500/20 to-teal-500/10',
          actionLabel: 'Prepare Session',
        },
      ]
    } else {
      return [
        {
          id: '1',
          type: 'milestone',
          title: 'Platform Growth',
          description: '10,000+ users milestone reached',
          time: '1 hour ago',
          status: 'completed',
          icon: <TrendingUp className="h-5 w-5" />,
          color: 'text-emerald-600',
          bgGradient: 'from-emerald-500/20 to-teal-500/10',
          value: '10K+',
          actionLabel: 'View Analytics',
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Quality Milestone',
          description: 'Average platform rating: 4.8/5',
          time: '6 hours ago',
          status: 'completed',
          icon: <Star className="h-5 w-5" />,
          color: 'text-amber-600',
          bgGradient: 'from-amber-500/20 to-orange-500/10',
          value: '4.8⭐',
          actionLabel: 'Quality Report',
        },
      ]
    }
  }

  const activities = getActivities()
  const filteredActivities = activities.filter(activity => {
    if (activeTab === 'recent') return activity.status === 'completed'
    if (activeTab === 'upcoming') return activity.status === 'upcoming'
    if (activeTab === 'achievements')
      return activity.type === 'achievement' || activity.type === 'milestone'
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      case 'ongoing':
        return <Play className="h-4 w-4 text-blue-500" />
      case 'upcoming':
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Activity Feed
          </h2>
          <p className="text-muted-foreground">
            Stay updated with your latest activities
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
          {[
            {
              id: 'recent',
              label: 'Recent',
              icon: <CheckCircle2 className="h-4 w-4" />,
            },
            {
              id: 'upcoming',
              label: 'Upcoming',
              icon: <Clock className="h-4 w-4" />,
            },
            {
              id: 'achievements',
              label: 'Achievements',
              icon: <Award className="h-4 w-4" />,
            },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-sm dark:bg-neutral-700'
                  : 'text-muted-foreground hover:text-foreground'
              } `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="group relative"
            onMouseEnter={() => setHoveredItem(activity.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Timeline line */}
            {index !== filteredActivities.length - 1 && (
              <div className="absolute left-6 top-12 h-16 w-0.5 bg-gradient-to-b from-neutral-200 to-transparent dark:from-neutral-700" />
            )}

            {/* Activity Card */}
            <div
              className={`relative flex gap-4 rounded-2xl border p-6 transition-all duration-300 ${
                hoveredItem === activity.id
                  ? '-translate-y-1 border-white/20 bg-white/50 shadow-xl backdrop-blur-sm'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              } `}
            >
              {/* Icon with animated background */}
              <div
                className={`relative flex-shrink-0 rounded-xl p-3 transition-all duration-300 ${hoveredItem === activity.id ? 'scale-110' : ''} bg-gradient-to-br ${activity.bgGradient} `}
              >
                <div className={`${activity.color}`}>{activity.icon}</div>

                {/* Status indicator */}
                <div className="absolute -right-1 -top-1">
                  {getStatusIcon(activity.status)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground transition-colors group-hover:text-purple-600">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>

                  {/* Value/Rating */}
                  {activity.value && (
                    <Badge
                      variant="outline"
                      className={`bg-gradient-to-r ${activity.bgGradient} border-0 font-medium text-foreground ${hoveredItem === activity.id ? 'animate-pulse' : ''} `}
                    >
                      {activity.value}
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </span>

                  {/* Action Button */}
                  {activity.actionLabel && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-xs opacity-0 transition-all duration-300 hover:bg-gradient-to-r group-hover:opacity-100 ${activity.bgGradient} hover:text-foreground ${hoveredItem === activity.id ? 'translate-x-0' : 'translate-x-2'} `}
                    >
                      {activity.actionLabel}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="space-y-4 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10">
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">
                No activities yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Start your journey to see activities here
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
