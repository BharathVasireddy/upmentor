"use client";

import React from 'react';

type Props = {
  value: 'school' | 'college';
  onChange: (level: 'school' | 'college') => void;
};

export default function AcademicLevelSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-4 justify-center my-4">
      <button
        type="button"
        className={`px-4 py-2 rounded border font-semibold ${value === 'school' ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
        onClick={() => onChange('school')}
      >
        School
      </button>
      <button
        type="button"
        className={`px-4 py-2 rounded border font-semibold ${value === 'college' ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
        onClick={() => onChange('college')}
      >
        College
      </button>
    </div>
  );
}
