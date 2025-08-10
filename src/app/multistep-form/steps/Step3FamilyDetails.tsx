import React from 'react'
import { FormData, FormErrors } from '../MultiStepForm'
import styles from '../MultiStepForm.module.css'

interface Step3Props {
  formData: FormData
  errors: FormErrors
  onUpdate: (data: Partial<FormData>) => void
  onUpdateErrors: (errors: FormErrors) => void
  onNext: () => void
  onPrevious: () => void
}

function Step3FamilyDetails({ formData, errors, onUpdate, onUpdateErrors, onNext, onPrevious }: Step3Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      onUpdateErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.motherName.trim()) {
      newErrors.motherName = 'Mother\'s name is required'
    }
    
    if (!formData.motherOccupation.trim()) {
      newErrors.motherOccupation = 'Mother\'s occupation is required'
    }
    
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'Father\'s name is required'
    }
    
    if (!formData.fatherOccupation.trim()) {
      newErrors.fatherOccupation = 'Father\'s occupation is required'
    }
    
    // Siblings is optional, so no validation needed
    
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
        {/* Mother's Details */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Mother&apos;s Details</h3>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="motherName" className={styles.label}>
            Mother&apos;s Name *
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Enter your mother's full name"
            className={`${styles.input} ${errors.motherName ? styles.inputError : ''}`}
          />
          {errors.motherName && (
            <span className={styles.errorMessage}>{errors.motherName}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="motherOccupation" className={styles.label}>
            Mother&apos;s Occupation *
          </label>
          <input
            type="text"
            id="motherOccupation"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
            placeholder="e.g., Teacher, Housewife, Business"
            className={`${styles.input} ${errors.motherOccupation ? styles.inputError : ''}`}
          />
          {errors.motherOccupation && (
            <span className={styles.errorMessage}>{errors.motherOccupation}</span>
          )}
        </div>

        {/* Father's Details */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Father&apos;s Details</h3>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="fatherName" className={styles.label}>
            Father&apos;s Name *
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter your father's full name"
            className={`${styles.input} ${errors.fatherName ? styles.inputError : ''}`}
          />
          {errors.fatherName && (
            <span className={styles.errorMessage}>{errors.fatherName}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="fatherOccupation" className={styles.label}>
            Father&apos;s Occupation *
          </label>
          <input
            type="text"
            id="fatherOccupation"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            placeholder="e.g., Engineer, Doctor, Business"
            className={`${styles.input} ${errors.fatherOccupation ? styles.inputError : ''}`}
          />
          {errors.fatherOccupation && (
            <span className={styles.errorMessage}>{errors.fatherOccupation}</span>
          )}
        </div>

        {/* Siblings */}
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Siblings (Optional)</h3>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="siblings" className={styles.label}>
            Brothers/Sisters
            <span className={styles.optionalText}> (Optional)</span>
          </label>
          <textarea
            id="siblings"
            name="siblings"
            value={formData.siblings}
            onChange={handleChange}
            placeholder="e.g., 1 elder brother (Software Engineer), 1 younger sister (Student)"
            className={`${styles.input} ${styles.textarea}`}
            rows={3}
          />
          <p className={styles.helpText}>
            Please mention number and basic details about your siblings
          </p>
        </div>
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

export default Step3FamilyDetails
