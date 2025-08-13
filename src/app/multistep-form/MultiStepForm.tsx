'use client'

import React, { useState } from 'react'
import styles from './MultiStepForm.module.css'
import Step1PersonalDetails from './steps/Step1PersonalDetails'
import Step2ProfessionalDetails from './steps/Step2ProfessionalDetails'
import Step3FamilyDetails from './steps/Step3FamilyDetails'
import Step4Hobbies from './steps/Step4Hobbies'
import PreviewStep from './steps/PreviewStep'

export interface FormData {
  // Step 1: Personal Details
  name: string
  dateOfBirth: string
  age: string
  height: string
  caste: string
  religion: string
  photo: File | null
  photoPreview: string
  
  // Step 2: Professional Details
  education: string
  jobTitle: string
  company: string
  workLocation: string
  workFromHome: boolean
  
  // Step 3: Family Details
  motherName: string
  motherOccupation: string
  fatherName: string
  fatherOccupation: string
  siblings: string // Optional
  
  // Step 4: Hobbies
  hobbies: string
}

export interface FormErrors {
  name?: string
  dateOfBirth?: string
  height?: string
  caste?: string
  religion?: string
  photo?: string
  education?: string
  jobTitle?: string
  company?: string
  workLocation?: string
  motherName?: string
  motherOccupation?: string
  fatherName?: string
  fatherOccupation?: string
  hobbies?: string
}

interface MultiStepFormProps {
  onSubmit?: (formData: FormData) => void
  isLoading?: boolean
}

const TOTAL_STEPS = 4

function MultiStepForm({ onSubmit, isLoading = false }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    name: '',
    dateOfBirth: '',
    age: '',
    height: '',
    caste: '',
    religion: '',
    photo: null,
    photoPreview: '',
    
    // Step 2
    education: '',
    jobTitle: '',
    company: '',
    workLocation: '',
    workFromHome: false,
    
    // Step 3
    motherName: '',
    motherOccupation: '',
    fatherName: '',
    fatherOccupation: '',
    siblings: '',
    
    // Step 4
    hobbies: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }

  const updateErrors = (stepErrors: FormErrors) => {
    setErrors(stepErrors)
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
    if (showPreview) {
      setShowPreview(false)
    }
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const getStepTitle = () => {
    if (showPreview) return 'Preview Your Details'
    
    switch (currentStep) {
      case 1: return 'Personal Details'
      case 2: return 'Professional Details'
      case 3: return 'Family Details'
      case 4: return 'Hobbies & Interests'
      default: return 'Form'
    }
  }

  const renderCurrentStep = () => {
    if (showPreview) {
      return (
        <PreviewStep
          formData={formData}
          onEdit={(step: number) => {
            setCurrentStep(step)
            setShowPreview(false)
          }}
        />
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalDetails
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
            onUpdateErrors={updateErrors}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <Step2ProfessionalDetails
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
            onUpdateErrors={updateErrors}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 3:
        return (
          <Step3FamilyDetails
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
            onUpdateErrors={updateErrors}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )
      case 4:
        return (
          <Step4Hobbies
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
            onUpdateErrors={updateErrors}
            onPreview={handlePreview}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        {/* Progress Bar */}
        {!showPreview && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
            <div className={styles.stepIndicators}>
              {Array.from({ length: TOTAL_STEPS }, (_, index) => (
                <div
                  key={index}
                  className={`${styles.stepIndicator} ${
                    index + 1 <= currentStep ? styles.completed : ''
                  } ${index + 1 === currentStep ? styles.active : ''}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <p className={styles.stepText}>
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>
        )}

        {/* Form Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{getStepTitle()}</h1>
          {!showPreview && (
            <p className={styles.subtitle}>
              Please fill in all the required information
            </p>
          )}
        </div>

        {/* Form Content */}
        <div className={styles.content}>
          {renderCurrentStep()}
        </div>

        {/* Navigation for Preview */}
        {showPreview && (
          <div className={styles.navigationContainer}>
            <button
              type="button"
              onClick={handlePrevious}
              className={styles.previousButton}
            >
              ← Back to Edit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiStepForm
