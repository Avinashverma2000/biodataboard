import React from 'react'
import { FormData, FormErrors } from '../MultiStepForm'
import styles from '../MultiStepForm.module.css'

interface Step2Props {
  formData: FormData
  errors: FormErrors
  onUpdate: (data: Partial<FormData>) => void
  onUpdateErrors: (errors: FormErrors) => void
  onNext: () => void
  onPrevious: () => void
}

function Step2ProfessionalDetails({ formData, errors, onUpdate, onUpdateErrors, onNext, onPrevious }: Step2Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      onUpdate({ [name]: checked })
    } else {
      onUpdate({ [name]: value })
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      onUpdateErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.education.trim()) {
      newErrors.education = 'Education is required'
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.workFromHome && !formData.workLocation.trim()) {
      newErrors.workLocation = 'Work location is required when not working from home'
    }
    
    onUpdateErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      onNext()
    }
  }

  return (
    <div className={styles.stepContainer}>
      <div className={styles.fieldsContainer}>
        {/* Education */}
        <div className={styles.inputGroup}>
          <label htmlFor="education" className={styles.label}>
            Education *
          </label>
          <textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., Bachelor's in Computer Science from XYZ University"
            className={`${styles.input} ${styles.textarea} ${errors.education ? styles.inputError : ''}`}
            rows={3}
          />
          {errors.education && (
            <span className={styles.errorMessage}>{errors.education}</span>
          )}
        </div>

        {/* Job Title */}
        <div className={styles.inputGroup}>
          <label htmlFor="jobTitle" className={styles.label}>
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g., Software Engineer, Marketing Manager"
            className={`${styles.input} ${errors.jobTitle ? styles.inputError : ''}`}
          />
          {errors.jobTitle && (
            <span className={styles.errorMessage}>{errors.jobTitle}</span>
          )}
        </div>

        {/* Company */}
        <div className={styles.inputGroup}>
          <label htmlFor="company" className={styles.label}>
            Company *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter your company name"
            className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
          />
          {errors.company && (
            <span className={styles.errorMessage}>{errors.company}</span>
          )}
        </div>

        {/* Work From Home Checkbox */}
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="workFromHome"
              checked={formData.workFromHome}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>I work from home</span>
          </label>
        </div>

        {/* Office Location (shown only if not working from home) */}
        {!formData.workFromHome && (
          <div className={styles.inputGroup}>
            <label htmlFor="workLocation" className={styles.label}>
              Office Location *
            </label>
            <input
              type="text"
              id="workLocation"
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              placeholder="e.g., Mumbai, Bangalore, New York"
              className={`${styles.input} ${errors.workLocation ? styles.inputError : ''}`}
            />
            {errors.workLocation && (
              <span className={styles.errorMessage}>{errors.workLocation}</span>
            )}
          </div>
        )}

        {formData.workFromHome && (
          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              ✓ You&apos;ve selected that you work from home
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className={styles.navigationContainer}>
        <button
          type="button"
          onClick={onPrevious}
          className={styles.previousButton}
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={styles.nextButton}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default Step2ProfessionalDetails
