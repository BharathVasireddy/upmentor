'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react'
import { OnboardingData, UserType } from '@/types/onboarding'

interface OnboardingState {
  data: OnboardingData
  currentStep: number
  totalSteps: number
  isLoading: boolean
}

type OnboardingAction =
  | { type: 'SET_USER_TYPE'; payload: UserType }
  | { type: 'SET_LANGUAGE_PREFERENCES'; payload: string[] }
  | { type: 'SET_GOALS'; payload: string[] }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' }
  | { type: 'LOAD_DATA'; payload: OnboardingData }

const initialState: OnboardingState = {
  data: {},
  currentStep: 1,
  totalSteps: 3,
  isLoading: false,
}

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return {
        ...state,
        data: { ...state.data, userType: action.payload },
      }
    case 'SET_LANGUAGE_PREFERENCES':
      return {
        ...state,
        data: { ...state.data, languagePreferences: action.payload },
      }
    case 'SET_GOALS':
      return {
        ...state,
        data: { ...state.data, goals: action.payload },
      }
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'LOAD_DATA':
      return {
        ...state,
        data: action.payload,
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface OnboardingContextType {
  state: OnboardingState
  setUserType: (userType: UserType) => void
  setLanguagePreferences: (languages: string[]) => void
  setGoals: (goals: string[]) => void
  setCurrentStep: (step: number) => void
  setLoading: (loading: boolean) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
  saveData: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
)

const STORAGE_KEY = 'upmentor_onboarding_data'

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading onboarding data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
  }, [state.data])

  const setUserType = (userType: UserType) => {
    dispatch({ type: 'SET_USER_TYPE', payload: userType })
  }

  const setLanguagePreferences = (languages: string[]) => {
    dispatch({ type: 'SET_LANGUAGE_PREFERENCES', payload: languages })
  }

  const setGoals = (goals: string[]) => {
    dispatch({ type: 'SET_GOALS', payload: goals })
  }

  const setCurrentStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const nextStep = () => {
    if (state.currentStep < state.totalSteps) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 })
    }
  }

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 })
    }
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'RESET' })
  }

  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
  }

  const value: OnboardingContextType = {
    state,
    setUserType,
    setLanguagePreferences,
    setGoals,
    setCurrentStep,
    setLoading,
    nextStep,
    prevStep,
    reset,
    saveData,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
