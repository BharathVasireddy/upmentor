'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  value: 'school' | 'college'
  onChange: (level: 'school' | 'college') => void
}

export default function AcademicLevelSelector({ value, onChange }: Props) {
  return (
    <div className="my-4 flex justify-center gap-4">
      <Button
        type="button"
        variant={value === 'school' ? 'default' : 'outline'}
        onClick={() => onChange('school')}
      >
        School
      </Button>
      <Button
        type="button"
        variant={value === 'college' ? 'default' : 'outline'}
        onClick={() => onChange('college')}
      >
        College
      </Button>
    </div>
  )
}
