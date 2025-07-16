import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Calendar,
  Users,
  BookOpen,
  Settings,
  MessageSquare,
  Video,
  Star,
  Target,
  CreditCard,
  FileText,
  Bell,
  Search,
  Zap,
  Sparkles,
} from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  bgGradient: string
  shortcut?: string
  primary?: boolean
}

interface FloatingActionPanelProps {
  userType: 'student' | 'mentor' | 'admin' | 'support'
}

export default function FloatingActionPanel({
  userType,
}: FloatingActionPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  const getQuickActions = (): QuickAction[] => {
    switch (userType) {
      case 'student':
        return [
          {
            id: 'book-session',
            label: 'Book Session',
            icon: <Plus className="h-5 w-5" />,
            color: 'text-white',
            bgGradient: 'from-purple-600 to-pink-600',
            shortcut: 'B',
            primary: true,
          },
          {
            id: 'find-mentors',
            label: 'Find Mentors',
            icon: <Search className="h-4 w-4" />,
            color: 'text-blue-600',
            bgGradient: 'from-blue-500/20 to-cyan-500/10',
            shortcut: 'F',
          },
          {
            id: 'my-progress',
            label: 'Progress',
            icon: <Target className="h-4 w-4" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-teal-500/10',
            shortcut: 'P',
          },
          {
            id: 'upcoming',
            label: 'Schedule',
            icon: <Calendar className="h-4 w-4" />,
            color: 'text-purple-600',
            bgGradient: 'from-purple-500/20 to-pink-500/10',
            shortcut: 'S',
          },
          {
            id: 'messages',
            label: 'Messages',
            icon: <MessageSquare className="h-4 w-4" />,
            color: 'text-orange-600',
            bgGradient: 'from-orange-500/20 to-amber-500/10',
            shortcut: 'M',
          },
        ]

      case 'mentor':
        return [
          {
            id: 'manage-sessions',
            label: 'Sessions',
            icon: <Video className="h-5 w-5" />,
            color: 'text-white',
            bgGradient: 'from-emerald-600 to-teal-600',
            shortcut: 'S',
            primary: true,
          },
          {
            id: 'availability',
            label: 'Availability',
            icon: <Calendar className="h-4 w-4" />,
            color: 'text-blue-600',
            bgGradient: 'from-blue-500/20 to-cyan-500/10',
            shortcut: 'A',
          },
          {
            id: 'students',
            label: 'Students',
            icon: <Users className="h-4 w-4" />,
            color: 'text-purple-600',
            bgGradient: 'from-purple-500/20 to-pink-500/10',
            shortcut: 'U',
          },
          {
            id: 'earnings',
            label: 'Earnings',
            icon: <CreditCard className="h-4 w-4" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-teal-500/10',
            shortcut: 'E',
          },
          {
            id: 'reviews',
            label: 'Reviews',
            icon: <Star className="h-4 w-4" />,
            color: 'text-amber-600',
            bgGradient: 'from-amber-500/20 to-orange-500/10',
            shortcut: 'R',
          },
        ]

      case 'admin':
        return [
          {
            id: 'overview',
            label: 'Overview',
            icon: <Zap className="h-5 w-5" />,
            color: 'text-white',
            bgGradient: 'from-red-600 to-pink-600',
            shortcut: 'O',
            primary: true,
          },
          {
            id: 'users',
            label: 'Users',
            icon: <Users className="h-4 w-4" />,
            color: 'text-blue-600',
            bgGradient: 'from-blue-500/20 to-cyan-500/10',
            shortcut: 'U',
          },
          {
            id: 'mentors',
            label: 'Mentors',
            icon: <BookOpen className="h-4 w-4" />,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-500/20 to-teal-500/10',
            shortcut: 'M',
          },
          {
            id: 'analytics',
            label: 'Analytics',
            icon: <FileText className="h-4 w-4" />,
            color: 'text-purple-600',
            bgGradient: 'from-purple-500/20 to-pink-500/10',
            shortcut: 'A',
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: <Settings className="h-4 w-4" />,
            color: 'text-orange-600',
            bgGradient: 'from-orange-500/20 to-amber-500/10',
            shortcut: 'S',
          },
        ]

      default:
        return []
    }
  }

  const actions = getQuickActions()
  const primaryAction = actions.find(action => action.primary)
  const secondaryActions = actions.filter(action => !action.primary)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Secondary Actions */}
      <div
        className={`mb-4 flex flex-col gap-3 transition-all duration-300 ease-out ${
          isExpanded
            ? 'translate-y-0 transform opacity-100'
            : 'pointer-events-none translate-y-4 transform opacity-0'
        } `}
      >
        {secondaryActions.map((action, index) => (
          <div
            key={action.id}
            className="group flex items-center gap-3"
            style={{ transitionDelay: `${index * 50}ms` }}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
          >
            {/* Action Label */}
            <div
              className={`whitespace-nowrap rounded-lg bg-black/80 px-3 py-2 text-sm text-white backdrop-blur-sm transition-all duration-200 ${
                hoveredAction === action.id
                  ? 'translate-x-0 transform opacity-100'
                  : 'translate-x-2 transform opacity-0'
              } `}
            >
              {action.label}
              {action.shortcut && (
                <kbd className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs">
                  {action.shortcut}
                </kbd>
              )}
            </div>

            {/* Action Button */}
            <Button
              size="lg"
              className={`group h-12 w-12 rounded-full border-0 bg-white/10 text-foreground shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white/20 ${hoveredAction === action.id ? 'ring-2 ring-white/20' : ''} `}
            >
              <div className={`${action.color}`}>{action.icon}</div>
            </Button>
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      {primaryAction && (
        <Button
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-16 w-16 rounded-full border-0 bg-gradient-to-r shadow-2xl ${primaryAction.bgGradient} hover:shadow-3xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${isExpanded ? 'rotate-45' : 'rotate-0'} `}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Icon */}
          <div
            className={`relative z-10 ${primaryAction.color} transition-transform duration-300`}
          >
            {isExpanded ? <Plus className="h-6 w-6" /> : primaryAction.icon}
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 scale-0 rounded-full bg-white/20 transition-transform duration-200 group-active:scale-100" />
        </Button>
      )}

      {/* Keyboard shortcut hint */}
      {!isExpanded && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
            Click or press Space
          </div>
        </div>
      )}

      {/* Background overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}
