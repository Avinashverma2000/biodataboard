import React from 'react'
import Image from 'next/image'
import { FormData, FormErrors } from '../MultiStepForm'
import styles from '../MultiStepForm.module.css'

interface Step1Props {
  formData: FormData
  errors: FormErrors
  onUpdate: (data: Partial<FormData>) => void
  onUpdateErrors: (errors: FormErrors) => void
  onNext: () => void
}

function Step1PersonalDetails({ formData, errors, onUpdate, onUpdateErrors, onNext }: Step1Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      onUpdateErrors({ ...errors, [name]: '' })
    }
  }

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        onUpdateErrors({ ...errors, photo: 'Please select a valid image file (JPEG, PNG, WebP)' })
        return
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        onUpdateErrors({ ...errors, photo: 'File size must be less than 5MB' })
        return
      }
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        const preview = event.target?.result as string
        onUpdate({ 
          photo: file, 
          photoPreview: preview 
        })
      }
      reader.readAsDataURL(file)
      
      // Clear any previous errors
      if (errors.photo) {
        onUpdateErrors({ ...errors, photo: '' })
      }
    }
  }

  // Remove photo
  const handleRemovePhoto = () => {
    onUpdate({ photo: null, photoPreview: '' })
    // Reset the file input
    const fileInput = document.getElementById('photo') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  // Auto-calculate age when date of birth changes
  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onUpdate({ dateOfBirth: value })
    
    if (value) {
      const birthDate = new Date(value)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      onUpdate({ dateOfBirth: value, age: age.toString() })
    }
    
    if (errors.dateOfBirth) {
      onUpdateErrors({ ...errors, dateOfBirth: '' })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    
    if (!formData.height.trim()) {
      newErrors.height = 'Height is required'
    }
    
    if (!formData.caste.trim()) {
      newErrors.caste = 'Caste is required'
    }
    
    if (!formData.religion.trim()) {
      newErrors.religion = 'Religion is required'
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
        {/* Photo Upload */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Profile Photo
            <span className={styles.optionalText}> (Optional)</span>
          </label>
          <div className={styles.photoUploadContainer}>
            {formData.photoPreview ? (
              <div className={styles.photoPreviewContainer}>
                <Image
                  src={formData.photoPreview}
                  alt="Profile preview"
                  width={120}
                  height={120}
                  className={styles.photoPreview}
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className={styles.removePhotoButton}
                >
                  ✕
                </button>
              </div>
            ) : (
              <label htmlFor="photo" className={styles.photoUploadLabel}>
                <div className={styles.photoUploadContent}>
                  <div className={styles.photoUploadIcon}>📷</div>
                  <p className={styles.photoUploadText}>Click to upload photo</p>
                  <p className={styles.photoUploadSubtext}>
                    JPEG, PNG, WebP up to 5MB
                  </p>
                </div>
              </label>
            )}
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handlePhotoChange}
              className={styles.photoInput}
            />
          </div>
          {errors.photo && (
            <span className={styles.errorMessage}>{errors.photo}</span>
          )}
        </div>

        {/* Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className={styles.inputGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleDateOfBirthChange}
            className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
          />
          {errors.dateOfBirth && (
            <span className={styles.errorMessage}>{errors.dateOfBirth}</span>
          )}
        </div>

        {/* Age (Auto-calculated) */}
        <div className={styles.inputGroup}>
          <label htmlFor="age" className={styles.label}>
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            readOnly
            placeholder="Age will be calculated automatically"
            className={`${styles.input} ${styles.readOnlyInput}`}
          />
        </div>

        {/* Height */}
        <div className={styles.inputGroup}>
          <label htmlFor="height" className={styles.label}>
            Height *
          </label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g., 5'6&quot; or 168 cm"
            className={`${styles.input} ${errors.height ? styles.inputError : ''}`}
          />
          {errors.height && (
            <span className={styles.errorMessage}>{errors.height}</span>
          )}
        </div>

        {/* Caste */}
        <div className={styles.inputGroup}>
          <label htmlFor="caste" className={styles.label}>
            Caste *
          </label>
          <input
            type="text"
            id="caste"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            placeholder="Enter your caste"
            className={`${styles.input} ${errors.caste ? styles.inputError : ''}`}
          />
          {errors.caste && (
            <span className={styles.errorMessage}>{errors.caste}</span>
          )}
        </div>

        {/* Religion */}
        <div className={styles.inputGroup}>
          <label htmlFor="religion" className={styles.label}>
            Religion *
          </label>
          <select
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className={`${styles.input} ${styles.select} ${errors.religion ? styles.inputError : ''}`}
          >
            <option value="">Select your religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Sikh">Sikh</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Jain">Jain</option>
            <option value="Other">Other</option>
          </select>
          {errors.religion && (
            <span className={styles.errorMessage}>{errors.religion}</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigationContainer}>
        <div></div> {/* Empty div for spacing */}
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

export default Step1PersonalDetails
