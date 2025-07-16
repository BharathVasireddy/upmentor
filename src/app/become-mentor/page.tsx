'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Award,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  BookOpen,
  Globe,
  Shield,
  Upload,
  X,
  FileText,
  Mail,
  Loader2,
} from 'lucide-react'

// Success Modal Component
const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const router = useRouter()

  if (!isOpen) return null

  const handleGoToDashboard = () => {
    router.push('/dashboard?mentor=true')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-neutral-900">
            Application Submitted Successfully!
          </h3>

          <p className="mb-6 text-neutral-600">
            Thank you for applying to become a mentor. We'll review your
            application and get back to you within 2-3 business days.
          </p>

          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">What's Next?</span>
            </div>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Check your email for confirmation</li>
              <li>• We'll verify your documents</li>
              <li>• Interview scheduling (if approved)</li>
              <li>• Welcome to the mentor community!</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={handleGoToDashboard}
              className="flex-1 bg-brand-600 hover:bg-brand-700"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// File Upload Component
const FileUpload = ({
  label,
  accept,
  required = false,
  file,
  onFileChange,
  description,
}: {
  label: string
  accept: string
  required?: boolean
  file: File | null
  onFileChange: (file: File | null) => void
  description: string
}) => {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        onFileChange(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        onFileChange(file)
      }
    }
  }

  const validateFile = (file: File) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = accept.split(',').map(type => type.trim())

    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return false
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (
      !allowedTypes.some(
        type =>
          type.includes(fileExtension) ||
          file.type.includes(type.replace('.', ''))
      )
    ) {
      alert(`File type not allowed. Please upload: ${accept}`)
      return false
    }

    return true
  }

  const removeFile = () => {
    onFileChange(null)
  }

  return (
    <div>
      <Label className="mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {file ? (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-green-900">{file.name}</p>
              <p className="text-sm text-green-700">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            dragOver
              ? 'border-brand-400 bg-brand-50'
              : 'border-neutral-300 hover:border-neutral-400'
          }`}
          onDrop={handleDrop}
          onDragOver={e => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          <Upload className="mx-auto mb-2 h-8 w-8 text-neutral-400" />
          <p className="mb-1 text-sm text-neutral-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-neutral-500">{description}</p>

          <input
            id={`file-${label}`}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  )
}

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic information about you' },
  {
    id: 2,
    title: 'Professional Experience',
    description: 'Your expertise and background',
  },
  {
    id: 3,
    title: 'Teaching Preferences',
    description: 'Subjects and availability',
  },
  { id: 4, title: 'Documents', description: 'Verification documents' },
]

const languages = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Odia',
  'Urdu',
  'Spanish',
  'French',
]

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Engineering',
  'Medicine',
  'Business',
  'Economics',
  'Finance',
  'Design',
  'Arts',
  'Literature',
  'History',
  'Psychology',
]

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn ₹500-₹2000/hour',
    description:
      'Set your own rates and earn competitive fees for your expertise.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description:
      'Work on your own schedule. Set availability that works for you.',
  },
  {
    icon: Users,
    title: 'Impact Lives',
    description:
      'Help students achieve their dreams and build meaningful connections.',
  },
  {
    icon: Award,
    title: 'Professional Recognition',
    description: 'Build your reputation as a trusted mentor in your field.',
  },
]

interface FormData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  state: string
  country: string

  // Professional Experience
  currentTitle: string
  currentCompany: string
  university: string
  degree: string
  experienceYears: string
  expertise: string[]
  bio: string
  linkedinUrl: string

  // Teaching Preferences
  subjectsToTeach: string[]
  studentLevels: string[]
  languagesSpoken: string[]
  hourlyRate: string
  availability: string[]

  // Documents
  documents: {
    resume: File | null
    degreeProof: File | null
    experienceProof: File | null
    idProof: File | null
  }

  // Agreements
  agreeToTerms: boolean
  agreeToBackground: boolean
}

export default function BecomeMentorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',

    // Professional Experience
    currentTitle: '',
    currentCompany: '',
    university: '',
    degree: '',
    experienceYears: '',
    expertise: [],
    bio: '',
    linkedinUrl: '',

    // Teaching Preferences
    subjectsToTeach: [],
    studentLevels: [],
    languagesSpoken: [],
    hourlyRate: '',
    availability: [],

    // Documents
    documents: {
      resume: null,
      degreeProof: null,
      experienceProof: null,
      idProof: null,
    },

    // Agreements
    agreeToTerms: false,
    agreeToBackground: false,
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDocumentChange = (
    docType: keyof FormData['documents'],
    file: File | null
  ) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file,
      },
    }))
  }

  const handleArrayChange = (
    field: keyof FormData,
    value: string,
    checked: boolean | 'indeterminate'
  ) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      return {
        ...prev,
        [field]:
          checked === true
            ? [...currentArray, value]
            : currentArray.filter((item: string) => item !== value),
      }
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.city &&
          formData.state
        )
      case 2:
        return !!(
          formData.currentTitle &&
          formData.currentCompany &&
          formData.university &&
          formData.degree &&
          formData.experienceYears &&
          formData.bio
        )
      case 3:
        return !!(
          formData.subjectsToTeach.length > 0 &&
          formData.studentLevels.length > 0 &&
          formData.languagesSpoken.length > 0 &&
          formData.hourlyRate
        )
      case 4:
        return !!(
          formData.documents.resume &&
          formData.documents.degreeProof &&
          formData.documents.idProof &&
          formData.agreeToTerms &&
          formData.agreeToBackground
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else if (!validateStep(currentStep)) {
      alert('Please fill in all required fields before proceeding.')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      alert('Please complete all required fields and upload documents.')
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'documents') {
          Object.entries(value).forEach(([docKey, file]) => {
            if (file && file instanceof File) {
              submitData.append(docKey, file)
            }
          })
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else if (typeof value === 'boolean') {
          submitData.append(key, value.toString())
        } else {
          submitData.append(key, value as string)
        }
      })

      console.log('Submitting mentor application...')

      const response = await fetch('/api/mentors/apply', {
        method: 'POST',
        body: submitData,
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        setShowSuccessModal(true)
      } else {
        const errorData = await response.json()

        if (response.status === 409 && errorData.existingApplication) {
          alert(
            'You already have a mentor application on file. Please contact support at support@upmentor.com if you need to update your application.'
          )
        } else {
          throw new Error(errorData.error || 'Application submission failed')
        }
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={e => handleInputChange('firstName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={e => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={e => handleInputChange('city', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={e => handleInputChange('state', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={value => handleInputChange('country', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderProfessionalExperience = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="currentTitle">Current Title/Position *</Label>
          <Input
            id="currentTitle"
            value={formData.currentTitle}
            onChange={e => handleInputChange('currentTitle', e.target.value)}
            placeholder="e.g., Senior Software Engineer, Professor"
            required
          />
        </div>
        <div>
          <Label htmlFor="currentCompany">Current Organization *</Label>
          <Input
            id="currentCompany"
            value={formData.currentCompany}
            onChange={e => handleInputChange('currentCompany', e.target.value)}
            placeholder="e.g., Google, IIT Delhi"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="university">University/Institution *</Label>
          <Input
            id="university"
            value={formData.university}
            onChange={e => handleInputChange('university', e.target.value)}
            placeholder="Where you completed your highest degree"
            required
          />
        </div>
        <div>
          <Label htmlFor="degree">Highest Degree *</Label>
          <Select
            value={formData.degree}
            onValueChange={value => handleInputChange('degree', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="postdoc">Post-Doc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="experienceYears">Years of Experience *</Label>
        <Select
          value={formData.experienceYears}
          onValueChange={value => handleInputChange('experienceYears', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10+">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="bio">Professional Bio *</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={e => handleInputChange('bio', e.target.value)}
          placeholder="Tell us about your background, achievements, and teaching philosophy..."
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
        <Input
          id="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={e => handleInputChange('linkedinUrl', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
    </div>
  )

  const renderTeachingPreferences = () => (
    <div className="space-y-6">
      <div>
        <Label>Subjects You Can Teach *</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
          {subjects.map(subject => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={`subject-${subject}`}
                checked={formData.subjectsToTeach.includes(subject)}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  handleArrayChange('subjectsToTeach', subject, checked)
                }
              />
              <Label htmlFor={`subject-${subject}`} className="text-sm">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Student Levels You Can Mentor *</Label>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
          {[
            'High School',
            'Undergraduate',
            'Graduate',
            'Working Professionals',
          ].map(level => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level}`}
                checked={formData.studentLevels.includes(level)}
                onCheckedChange={checked =>
                  handleArrayChange('studentLevels', level, checked)
                }
              />
              <Label htmlFor={`level-${level}`} className="text-sm">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Languages You Can Speak *</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {languages.map(language => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={`lang-${language}`}
                checked={formData.languagesSpoken.includes(language)}
                onCheckedChange={checked =>
                  handleArrayChange('languagesSpoken', language, checked)
                }
              />
              <Label htmlFor={`lang-${language}`} className="text-sm">
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="hourlyRate">Preferred Hourly Rate (₹) *</Label>
        <Select
          value={formData.hourlyRate}
          onValueChange={value => handleInputChange('hourlyRate', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your hourly rate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="500-750">₹500 - ₹750</SelectItem>
            <SelectItem value="750-1000">₹750 - ₹1000</SelectItem>
            <SelectItem value="1000-1500">₹1000 - ₹1500</SelectItem>
            <SelectItem value="1500-2000">₹1500 - ₹2000</SelectItem>
            <SelectItem value="2000+">₹2000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="rounded-lg bg-amber-50 p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-600" />
          <span className="font-medium text-amber-900">
            Document Verification Required
          </span>
        </div>
        <p className="mt-2 text-sm text-amber-800">
          To ensure quality and safety, we require verification documents. All
          information is kept confidential and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FileUpload
          label="Resume/CV"
          accept=".pdf,.doc,.docx"
          required={true}
          file={formData.documents.resume}
          onFileChange={file => handleDocumentChange('resume', file)}
          description="PDF, DOC up to 10MB"
        />

        <FileUpload
          label="Degree Certificate"
          accept=".pdf,.jpg,.jpeg,.png"
          required={true}
          file={formData.documents.degreeProof}
          onFileChange={file => handleDocumentChange('degreeProof', file)}
          description="PDF, JPG, PNG up to 10MB"
        />

        <FileUpload
          label="Experience Proof"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          required={false}
          file={formData.documents.experienceProof}
          onFileChange={file => handleDocumentChange('experienceProof', file)}
          description="Work certificate, offer letter, etc."
        />

        <FileUpload
          label="Government ID"
          accept=".pdf,.jpg,.jpeg,.png"
          required={true}
          file={formData.documents.idProof}
          onFileChange={file => handleDocumentChange('idProof', file)}
          description="Aadhaar, PAN, Passport"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={checked =>
              handleInputChange('agreeToTerms', checked)
            }
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to the{' '}
            <Link href="/terms" className="text-brand-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-600 hover:underline">
              Privacy Policy
            </Link>{' '}
            *
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToBackground"
            checked={formData.agreeToBackground}
            onCheckedChange={checked =>
              handleInputChange('agreeToBackground', checked)
            }
          />
          <Label htmlFor="agreeToBackground" className="text-sm">
            I consent to background verification checks as part of the mentor
            approval process *
          </Label>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderProfessionalExperience()
      case 3:
        return renderTeachingPreferences()
      case 4:
        return renderDocuments()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 font-display text-4xl font-bold text-neutral-900 lg:text-5xl">
              Become a Mentor
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-neutral-600">
              Share your expertise, inspire the next generation, and earn money
              while making a meaningful impact on students' lives.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
              Why Become a Mentor?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                    <IconComponent className="h-8 w-8 text-brand-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-neutral-900">
                Mentor Application
              </h2>
              <p className="text-lg text-neutral-600">
                Complete the application below to get started. Our team will
                review your application within 2-3 business days.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        currentStep >= step.id
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-medium ${
                          currentStep >= step.id
                            ? 'text-brand-600'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="hidden text-xs text-neutral-500 sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !validateStep(4)}
                      className="bg-brand-600 hover:bg-brand-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  )
}
