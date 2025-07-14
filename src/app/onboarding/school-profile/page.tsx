'use client'

import { useRouter } from 'next/navigation'
import SchoolProfileForm from '@/components/onboarding/SchoolProfileForm'
import ProgressStepper from '@/components/onboarding/ProgressStepper'

const steps = ['Academic Level', 'Profile', 'Language', 'Goals', 'Complete']

export default function SchoolProfilePage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/onboarding/language-preferences')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-2xl">
        <ProgressStepper currentStep={1} steps={steps} />
        <div className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-center text-2xl font-bold">
            School Profile
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Tell us about your school details to help mentors understand your
            background.
          </p>
          <SchoolProfileForm userId="mock-user-id" onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}
