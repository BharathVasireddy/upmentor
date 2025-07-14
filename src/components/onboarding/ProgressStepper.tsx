import React from 'react';

type Props = {
  currentStep: number;
  steps: string[];
};

export default function ProgressStepper({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-sm ${
              i === currentStep
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {i + 1}
          </div>
          <span className={`text-xs ${i === currentStep ? 'font-bold text-blue-600' : 'text-gray-500'}`}>{step}</span>
          {i < steps.length - 1 && <span className="w-8 h-1 bg-gray-300 rounded" />}
        </div>
      ))}
    </div>
  );
}
