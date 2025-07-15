'use client'

import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const STEP_LABELS = ['Your Role', 'Language', 'Goals']

interface ProgressStepperProps {
  showSkip?: boolean
  onSkip?: () => void
}

export function ProgressStepper({
  showSkip = true,
  onSkip,
}: ProgressStepperProps) {
  const { state, prevStep } = useOnboarding()
  const router = useRouter()
  const [isSkipping, setIsSkipping] = useState(false)

  const { currentStep, totalSteps } = state
  const progressPercentage = (currentStep / totalSteps) * 100

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep()
    } else {
      router.push('/')
    }
  }

  const handleSkip = async () => {
    if (onSkip) {
      setIsSkipping(true)
      await onSkip()
      setIsSkipping(false)
    } else {
      router.push('/mentors')
    }
  }

  return (
    <div className="w-full">
      {/* Header with back button and skip */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {showSkip && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            disabled={isSkipping}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {isSkipping ? 'Skipping...' : 'Skip for now'}
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}% complete
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Desktop: Step indicators */}
      <div className="mb-8 hidden items-center justify-center sm:flex">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                  } `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'} `}
                >
                  {label}
                </span>
              </div>

              {index < STEP_LABELS.length - 1 && (
                <div
                  className={`mx-4 mt-[-20px] h-0.5 w-16 ${stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-200'} `}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Current step label */}
      <div className="mb-6 text-center sm:hidden">
        <h2 className="text-xl font-semibold text-gray-900">
          {STEP_LABELS[currentStep - 1]}
        </h2>
      </div>
    </div>
  )
}
