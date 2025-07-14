'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { GraduationCap, BookOpen, Users, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export default function AcademicLevelPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const academicLevels = [
    {
      id: 'school',
      title: 'School Student',
      description:
        'Class 6-12 student looking for academic and career guidance',
      icon: BookOpen,
      features: [
        'Subject guidance',
        'Exam preparation',
        'Career exploration',
        'Study techniques',
      ],
    },
    {
      id: 'college',
      title: 'College Student',
      description: 'Undergraduate or graduate student seeking mentorship',
      icon: GraduationCap,
      features: [
        'Academic projects',
        'Career planning',
        'Industry insights',
        'Skill development',
      ],
    },
  ]

  const handleSubmit = async () => {
    if (!selectedLevel) {
      toast.error('Please select your academic level')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/users/academic-level', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          academic_level: selectedLevel,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save academic level')
      }

      toast.success('Academic level saved successfully!')

      // Navigate to appropriate profile form
      if (selectedLevel === 'school') {
        router.push('/onboarding/school-profile')
      } else {
        router.push('/onboarding/college-profile')
      }
    } catch (error) {
      console.error('Error saving academic level:', error)
      toast.error('Failed to save academic level. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container">
        <div className="mobile-content">
          {/* Progress */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Step 1 of 6
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                17%
              </span>
            </div>
            <Progress value={17} className="h-2" />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">
              What's your academic level?
            </h1>
            <p className="text-muted-foreground">
              This helps us match you with the right mentors and customize your
              experience.
            </p>
          </div>

          {/* Academic Level Options */}
          <div className="mb-8 space-y-4">
            {academicLevels.map(level => {
              const Icon = level.icon
              return (
                <Card
                  key={level.id}
                  className={`cursor-pointer transition-all ${
                    selectedLevel === level.id
                      ? 'border-primary ring-2 ring-primary'
                      : 'hover:shadow-medium'
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`rounded-lg p-3 ${
                          selectedLevel === level.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold">{level.title}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">
                          {level.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {level.features.map(feature => (
                            <div
                              key={feature}
                              className="flex items-center space-x-2"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              <span className="text-xs text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedLevel || isLoading}
            className="h-12 w-full"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
