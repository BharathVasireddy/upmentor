'use client'

import React from 'react'

type Props = {
  value: 'school' | 'college'
  onChange: (level: 'school' | 'college') => void
}

export default function AcademicLevelSelector({ value, onChange }: Props) {
  return (
    <div className="my-4 flex justify-center gap-4">
      <button
        type="button"
        className={`rounded border px-4 py-2 font-semibold ${value === 'school' ? 'bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}
        onClick={() => onChange('school')}
      >
        School
      </button>
      <button
        type="button"
        className={`rounded border px-4 py-2 font-semibold ${value === 'college' ? 'bg-blue-600 text-white' : 'border-gray-300 bg-white'}`}
        onClick={() => onChange('college')}
      >
        College
      </button>
    </div>
  )
}
