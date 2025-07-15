'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { Button } from '@/components/ui/button'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { USER_TYPES, UserType } from '@/types/onboarding'
import { toast } from 'sonner'
import { GraduationCap, Users, Briefcase } from 'lucide-react'

const getIcon = (iconName: string) => {
  const iconProps = { size: 24, className: 'text-blue-600' }
  switch (iconName) {
    case 'GraduationCap':
      return <GraduationCap {...iconProps} />
    case 'Users':
      return <Users {...iconProps} />
    case 'Briefcase':
      return <Briefcase {...iconProps} />
    default:
      return null
  }
}

export default function UserTypePage() {
  const { state, setUserType, setCurrentStep } = useOnboarding()
  const [selectedType, setSelectedType] = useState<UserType | undefined>(
    state.data.userType
  )
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Sync local state with context when context changes
  useEffect(() => {
    setSelectedType(state.data.userType)
  }, [state.data.userType])

  const handleContinue = async () => {
    if (!selectedType) {
      toast.error('Please select your role to continue')
      return
    }

    setIsLoading(true)

    try {
      // Save to context first
      setUserType(selectedType)

      // Save to backend
      console.log('🌐 Frontend making API call to:', '/api/users/user-type')
      console.log('📤 Sending data:', { userType: selectedType })
      const response = await fetch('/api/users/user-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType: selectedType }),
      })
      console.log('📥 API Response status:', response.status)
      console.log('📥 API Response ok:', response.ok)

      if (!response.ok) {
        throw new Error('Failed to save user type')
      }

      // Move to next step
      setCurrentStep(2)
      router.push('/onboarding/language-preferences')
    } catch (error) {
      console.error('Error saving user type:', error)
      toast.error('Failed to save your selection. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout
      title="What brings you here?"
      description="Tell us about yourself so we can personalize your experience and connect you with the right mentors."
    >
      <div className="space-y-4">
        {USER_TYPES.map(type => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
              selectedType === type.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            } `}
          >
            <div className="flex items-start space-x-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                {getIcon(type.icon)}
              </div>
              <div className="flex-1">
                <h3
                  className={`mb-1 text-lg font-semibold ${selectedType === type.value ? 'text-blue-900' : 'text-gray-900'} `}
                >
                  {type.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${selectedType === type.value ? 'text-blue-700' : 'text-gray-600'} `}
                >
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedType || isLoading}
          size="xl"
          className="w-full min-w-48"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Saving...
            </div>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </OnboardingLayout>
  )
}
