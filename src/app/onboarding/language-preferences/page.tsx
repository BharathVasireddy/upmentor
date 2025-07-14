'use client';

import { useRouter } from 'next/navigation';
import LanguagePreferences from '@/components/onboarding/LanguagePreferences';
import ProgressStepper from '@/components/onboarding/ProgressStepper';

const steps = ['Academic Level', 'Profile', 'Language', 'Goals', 'Complete'];

export default function LanguagePreferencesPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/onboarding/goals-assessment');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={2} steps={steps} />
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Language Preferences</h1>
          <p className="text-gray-600 text-center mb-8">
            Help us match you with mentors who speak your preferred languages.
          </p>
          <LanguagePreferences userId="mock-user-id" onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
