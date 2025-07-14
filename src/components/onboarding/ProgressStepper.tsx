import React from 'react'

type Props = {
  currentStep: number
  steps: string[]
}

export default function ProgressStepper({ currentStep, steps }: Props) {
  return (
    <div className="my-6 flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold ${
              i === currentStep
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-600'
            }`}
          >
            {i + 1}
          </div>
          <span
            className={`text-xs ${i === currentStep ? 'font-bold text-blue-600' : 'text-gray-500'}`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="h-1 w-8 rounded bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}
