export type UserType = 'STUDENT' | 'PARENT' | 'PROFESSIONAL'

export type LanguageOption = {
  code: string
  name: string
  nativeName: string
}

export type Goal = {
  id: string
  title: string
  description: string
  icon: string
}

export interface OnboardingData {
  userType?: UserType
  languagePreferences?: string[]
  goals?: string[]
}

export const USER_TYPES = [
  {
    value: 'STUDENT' as UserType,
    title: 'Student',
    description: 'I am currently studying and looking for academic guidance',
    icon: 'GraduationCap',
  },
  {
    value: 'PARENT' as UserType,
    title: 'Parent',
    description: "I want to find mentors for my child's academic journey",
    icon: 'Users',
  },
  {
    value: 'PROFESSIONAL' as UserType,
    title: 'Working Professional',
    description: 'I am working and seeking career growth opportunities',
    icon: 'Briefcase',
  },
]

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
]

export const GOAL_OPTIONS: Goal[] = [
  {
    id: 'academic_excellence',
    title: 'Academic Excellence',
    description: 'Get better grades and master my subjects',
    icon: 'BookOpen',
  },
  {
    id: 'career_guidance',
    title: 'Career Guidance',
    description: 'Explore career paths and plan my future',
    icon: 'Target',
  },
  {
    id: 'skill_development',
    title: 'Skill Development',
    description: 'Learn new skills and improve existing ones',
    icon: 'TrendingUp',
  },
  {
    id: 'exam_preparation',
    title: 'Exam Preparation',
    description: 'Prepare for competitive exams and tests',
    icon: 'FileText',
  },
  {
    id: 'personal_growth',
    title: 'Personal Growth',
    description: 'Build confidence and develop soft skills',
    icon: 'Lightbulb',
  },
  {
    id: 'networking',
    title: 'Professional Networking',
    description: 'Connect with industry professionals and peers',
    icon: 'Network',
  },
]
