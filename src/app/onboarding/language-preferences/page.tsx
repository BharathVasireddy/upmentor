'use client'

import { useRouter } from 'next/navigation'
import LanguagePreferences from '@/components/onboarding/LanguagePreferences'
import ProgressStepper from '@/components/onboarding/ProgressStepper'

const steps = ['Academic Level', 'Profile', 'Language', 'Goals', 'Complete']

export default function LanguagePreferencesPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/onboarding/goals-assessment')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-2xl">
        <ProgressStepper currentStep={2} steps={steps} />
        <div className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Language Preferences
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Help us match you with mentors who speak your preferred languages.
          </p>
          <LanguagePreferences
            userId="mock-user-id"
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  )
}
