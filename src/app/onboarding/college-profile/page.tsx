'use client';

import { useRouter } from 'next/navigation';
import CollegeProfileForm from '@/components/onboarding/CollegeProfileForm';
import ProgressStepper from '@/components/onboarding/ProgressStepper';

const steps = ['Academic Level', 'Profile', 'Language', 'Goals', 'Complete'];

export default function CollegeProfilePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/onboarding/language-preferences');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <ProgressStepper currentStep={1} steps={steps} />
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-center mb-6">College Profile</h1>
          <p className="text-gray-600 text-center mb-8">
            Tell us about your college details to help mentors understand your background.
          </p>
          <CollegeProfileForm userId="mock-user-id" onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
