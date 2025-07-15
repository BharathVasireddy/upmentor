'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { Button } from '@/components/ui/button'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { GOAL_OPTIONS } from '@/types/onboarding'
import { toast } from 'sonner'
import {
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  Lightbulb,
  Network,
} from 'lucide-react'

const getGoalIcon = (iconName: string) => {
  const iconProps = { size: 20, className: 'text-blue-600' }
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen {...iconProps} />
    case 'Target':
      return <Target {...iconProps} />
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />
    case 'FileText':
      return <FileText {...iconProps} />
    case 'Lightbulb':
      return <Lightbulb {...iconProps} />
    case 'Network':
      return <Network {...iconProps} />
    default:
      return null
  }
}

export default function GoalsPage() {
  const { state, setGoals, setCurrentStep, reset } = useOnboarding()
  const { update } = useSession()
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    state.data.goals || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Sync local state with context when context changes
  useEffect(() => {
    setSelectedGoals(state.data.goals || [])
  }, [state.data.goals])

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId)
      } else {
        return [...prev, goalId]
      }
    })
  }

  const handleComplete = async () => {
    if (selectedGoals.length === 0) {
      toast.error('Please select at least one goal')
      return
    }

    setIsLoading(true)

    try {
      // Save to context first
      setGoals(selectedGoals)

      // Save to backend
      const response = await fetch('/api/users/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goals: selectedGoals }),
      })

      if (!response.ok) {
        throw new Error('Failed to save goals')
      }

      // Mark onboarding as complete
      const completeResponse = await fetch('/api/users/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!completeResponse.ok) {
        console.warn('Failed to mark onboarding as complete')
      }

      // Update the session to reflect onboarding completion
      await update()

      // Clear onboarding data and navigate to mentors
      reset()
      toast.success("Welcome to UpMentor! Let's find you some great mentors.")
      router.push('/mentors')
    } catch (error) {
      console.error('Error completing onboarding:', error)
      toast.error('Failed to save your goals. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout
      title="What are your goals?"
      description="Select what you want to achieve. We'll help match you with mentors who can guide you towards these goals."
      showSkip={false} // Don't show skip on final step
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {GOAL_OPTIONS.map(goal => {
          const isSelected = selectedGoals.includes(goal.id)

          return (
            <button
              key={goal.id}
              onClick={() => handleGoalToggle(goal.id)}
              className={`h-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } `}
            >
              <div className="flex h-full flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                    {getGoalIcon(goal.icon)}
                  </div>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    } `}
                  >
                    {isSelected && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3
                    className={`mb-2 text-base font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'} `}
                  >
                    {goal.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${isSelected ? 'text-blue-700' : 'text-gray-600'} `}
                  >
                    {goal.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="space-y-4 pt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {selectedGoals.length > 0
              ? `${selectedGoals.length} goal${selectedGoals.length > 1 ? 's' : ''} selected`
              : 'No goals selected'}
          </p>
        </div>

        <Button
          onClick={handleComplete}
          disabled={selectedGoals.length === 0 || isLoading}
          size="xl"
          className="w-full min-w-48"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Setting up your profile...
            </div>
          ) : (
            'Start Learning'
          )}
        </Button>
      </div>
    </OnboardingLayout>
  )
}
