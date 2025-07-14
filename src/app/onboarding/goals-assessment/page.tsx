'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Target, Lightbulb, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface CareerGoal {
  id: string;
  name: string;
  category: string;
}

interface Interest {
  id: string;
  name: string;
  category: string;
}

interface Challenge {
  id: string;
  name: string;
  category: string;
}

const careerGoals: CareerGoal[] = [
  { id: 'engineering', name: 'Engineering', category: 'Technical' },
  { id: 'medicine', name: 'Medicine', category: 'Healthcare' },
  { id: 'business', name: 'Business/Management', category: 'Business' },
  { id: 'arts', name: 'Arts & Design', category: 'Creative' },
  { id: 'science', name: 'Pure Sciences', category: 'Research' },
  { id: 'law', name: 'Law', category: 'Legal' },
  { id: 'education', name: 'Education', category: 'Teaching' },
  { id: 'technology', name: 'Technology/IT', category: 'Technical' },
  { id: 'finance', name: 'Finance', category: 'Business' },
  { id: 'marketing', name: 'Marketing', category: 'Business' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'Business' },
  { id: 'research', name: 'Research & Development', category: 'Research' },
];

const interests: Interest[] = [
  { id: 'coding', name: 'Coding & Programming', category: 'Technical' },
  { id: 'mathematics', name: 'Mathematics', category: 'Academic' },
  { id: 'physics', name: 'Physics', category: 'Academic' },
  { id: 'chemistry', name: 'Chemistry', category: 'Academic' },
  { id: 'biology', name: 'Biology', category: 'Academic' },
  { id: 'literature', name: 'Literature', category: 'Arts' },
  { id: 'history', name: 'History', category: 'Arts' },
  { id: 'geography', name: 'Geography', category: 'Arts' },
  { id: 'economics', name: 'Economics', category: 'Business' },
  { id: 'psychology', name: 'Psychology', category: 'Social' },
  { id: 'sports', name: 'Sports & Fitness', category: 'Physical' },
  { id: 'music', name: 'Music', category: 'Arts' },
  { id: 'art', name: 'Art & Drawing', category: 'Arts' },
  { id: 'cooking', name: 'Cooking', category: 'Lifestyle' },
  { id: 'travel', name: 'Travel', category: 'Lifestyle' },
  { id: 'photography', name: 'Photography', category: 'Arts' },
];

const challenges: Challenge[] = [
  { id: 'time_management', name: 'Time Management', category: 'Academic' },
  { id: 'study_techniques', name: 'Study Techniques', category: 'Academic' },
  { id: 'exam_anxiety', name: 'Exam Anxiety', category: 'Mental Health' },
  { id: 'subject_difficulty', name: 'Subject Difficulty', category: 'Academic' },
  { id: 'career_confusion', name: 'Career Confusion', category: 'Career' },
  { id: 'motivation', name: 'Lack of Motivation', category: 'Mental Health' },
  { id: 'peer_pressure', name: 'Peer Pressure', category: 'Social' },
  { id: 'family_expectations', name: 'Family Expectations', category: 'Social' },
  { id: 'technology_gap', name: 'Technology Gap', category: 'Technical' },
  { id: 'language_barrier', name: 'Language Barrier', category: 'Communication' },
  { id: 'financial_constraints', name: 'Financial Constraints', category: 'Practical' },
  { id: 'health_issues', name: 'Health Issues', category: 'Physical' },
];

export default function GoalsAssessmentPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleChallengeToggle = (challengeId: string) => {
    setSelectedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleSubmit = async () => {
    if (selectedGoals.length === 0) {
      toast.error('Please select at least one career goal');
      return;
    }

    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/users/goals-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          career_goals: selectedGoals,
          interests: selectedInterests,
          challenges: selectedChallenges,
          additional_notes: additionalNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save goals assessment');
      }

      toast.success('Goals assessment saved successfully!');
      router.push('/onboarding/completion');
    } catch (error) {
      console.error('Error saving goals assessment:', error);
      toast.error('Failed to save goals assessment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/onboarding/language-preferences');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 5 of 6</span>
            <span className="text-sm font-medium text-gray-700">83%</span>
          </div>
          <Progress value={83} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Goals & Interests Assessment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help us understand your career aspirations, interests, and challenges so we can match you with the perfect mentors.
          </p>
        </div>

        <div className="space-y-8">
          {/* Career Goals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Career Goals
              </CardTitle>
              <CardDescription>
                Select the career paths you're interested in pursuing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {careerGoals.map((goal) => (
                  <Badge
                    key={goal.id}
                    variant={selectedGoals.includes(goal.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    {goal.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interests Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Interests & Hobbies
              </CardTitle>
              <CardDescription>
                Select subjects and activities that interest you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <Badge
                    key={interest.id}
                    variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedInterests.includes(interest.id)
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    {interest.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Challenges Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Current Challenges
              </CardTitle>
              <CardDescription>
                Select the challenges you're currently facing (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {challenges.map((challenge) => (
                  <Badge
                    key={challenge.id}
                    variant={selectedChallenges.includes(challenge.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedChallenges.includes(challenge.id)
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleChallengeToggle(challenge.id)}
                  >
                    {challenge.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
              <CardDescription>
                Share any specific concerns or additional information that would help mentors understand you better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tell us about your specific goals, challenges, or any other information that would help us match you with the right mentors..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || selectedGoals.length === 0 || selectedInterests.length === 0}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
