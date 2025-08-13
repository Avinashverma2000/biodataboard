import React from 'react'
import { FormData, FormErrors } from '../MultiStepForm'
import styles from '../MultiStepForm.module.css'
import { generatePDF } from '../utils/pdfGenerator'
import { useRouter } from 'next/navigation'

interface Step4Props {
  formData: FormData
  errors: FormErrors
  onUpdate: (data: Partial<FormData>) => void
  onUpdateErrors: (errors: FormErrors) => void
  onPreview: () => void
  onPrevious: () => void
  onSubmit: () => void
  isLoading: boolean
}

function Step4Hobbies({ 
  formData, 
  errors, 
  onUpdate, 
  onUpdateErrors, 
  onPreview, 
  onPrevious, 
  onSubmit, 
  isLoading 
}: Step4Props) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      onUpdateErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.hobbies.trim()) {
      newErrors.hobbies = 'Please mention your hobbies and interests'
    }
    
    onUpdateErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePreview = () => {
    if (validateStep()) {
      onPreview()
    }
  }

  const handleDirectSubmit = async () => {
    if (validateStep()) {
      await generatePDF(formData); // Download the PDF
      onSubmit(); // Submit the data
      router.push('/success'); // Redirect to success screen
    }
  }

  const handleExit = async () => {
    if (validateStep()) {
      onSubmit(); // Submit the data
      router.push('/success'); // Redirect to success screen
    }
  }

  const popularHobbies = [
    'Reading', 'Traveling', 'Music', 'Dancing', 'Cooking', 'Photography',
    'Sports', 'Yoga', 'Meditation', 'Painting', 'Gaming', 'Gardening',
    'Movies', 'Swimming', 'Cycling', 'Writing', 'Shopping', 'Fitness'
  ]

  const addHobby = (hobby: string) => {
    const currentHobbies = formData.hobbies
    if (currentHobbies) {
      if (!currentHobbies.toLowerCase().includes(hobby.toLowerCase())) {
        onUpdate({ hobbies: `${currentHobbies}, ${hobby}` })
      }
    } else {
      onUpdate({ hobbies: hobby })
    }
  }

  return (
    <div className={styles.stepContainer}>
      <div className={styles.fieldsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="hobbies" className={styles.label}>
            Hobbies & Interests *
          </label>
          <textarea
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="Tell us about your hobbies, interests, and activities you enjoy..."
            className={`${styles.input} ${styles.textarea} ${styles.largeTextarea} ${errors.hobbies ? styles.inputError : ''}`}
            rows={5}
          />
          {errors.hobbies && (
            <span className={styles.errorMessage}>{errors.hobbies}</span>
          )}
          <p className={styles.helpText}>
            Share your interests, hobbies, and what you like to do in your free time
          </p>
        </div>

        {/* Popular Hobbies Quick Add */}
        <div className={styles.hobbySuggestions}>
          <h4 className={styles.suggestionTitle}>Popular Hobbies (Click to add)</h4>
          <div className={styles.hobbyTags}>
            {popularHobbies.map((hobby) => (
              <button
                key={hobby}
                type="button"
                onClick={() => addHobby(hobby)}
                className={styles.hobbyTag}
              >
                + {hobby}
              </button>
            ))}
          </div>
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
        
        <div className={styles.finalButtons}>
          <button
            type="button"
            onClick={handlePreview}
            className={styles.previewButton}
            disabled={isLoading}
          >
            Preview & Download Form
          </button>
          {/* <button
            type="button"
            onClick={handleDirectSubmit}
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Generating PDF...' : 'Download PDF'}
          </button> */}
          {/* <button
            type="button"
            onClick={handleExit}
            className={styles.exitButton}
            disabled={isLoading}
          >
            Exit
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default Step4Hobbies
