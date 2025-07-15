'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { Button } from '@/components/ui/button'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { LANGUAGE_OPTIONS } from '@/types/onboarding'
import { toast } from 'sonner'

export default function LanguagePreferencesPage() {
  const { state, setLanguagePreferences, setCurrentStep } = useOnboarding()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    state.data.languagePreferences || []
  )
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Sync local state with context when context changes
  useEffect(() => {
    setSelectedLanguages(state.data.languagePreferences || [])
  }, [state.data.languagePreferences])

  const handleLanguageToggle = (languageCode: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(languageCode)) {
        return prev.filter(code => code !== languageCode)
      } else {
        return [...prev, languageCode]
      }
    })
  }

  const handleContinue = async () => {
    if (selectedLanguages.length === 0) {
      toast.error('Please select at least one language')
      return
    }

    setIsLoading(true)

    try {
      // Save to context first
      setLanguagePreferences(selectedLanguages)

      // Save to backend
      const response = await fetch('/api/users/language-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ languagePreferences: selectedLanguages }),
      })

      if (!response.ok) {
        throw new Error('Failed to save language preferences')
      }

      // Move to next step
      setCurrentStep(3)
      router.push('/onboarding/goals')
    } catch (error) {
      console.error('Error saving language preferences:', error)
      toast.error('Failed to save your language preferences. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingLayout
      title="Which languages do you prefer?"
      description="Select the languages you're comfortable communicating in. This helps us match you with mentors who speak your preferred languages."
    >
      <div className="space-y-3">
        {LANGUAGE_OPTIONS.map(language => {
          const isSelected = selectedLanguages.includes(language.code)

          return (
            <button
              key={language.code}
              onClick={() => handleLanguageToggle(language.code)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-base font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'} `}
                  >
                    {language.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'} `}
                  >
                    {language.nativeName}
                  </p>
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
            </button>
          )
        })}
      </div>

      <div className="space-y-4 pt-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {selectedLanguages.length > 0
              ? `${selectedLanguages.length} language${selectedLanguages.length > 1 ? 's' : ''} selected`
              : 'No languages selected'}
          </p>
        </div>

        <Button
          onClick={handleContinue}
          disabled={selectedLanguages.length === 0 || isLoading}
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
