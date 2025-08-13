'use client'

import { useState } from 'react'
import MultiStepForm, { FormData } from './MultiStepForm'

export default function MultiStepFormPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<string | null>(null)

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true)
    console.log('Form submitted with data:', formData)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      // Example:
      // const response = await fetch('/api/biodata', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // 
      // if (response.ok) {
      //   const result = await response.json()
      //   setSubmissionResult('success')
      // } else {
      //   throw new Error('Submission failed')
      // }
      
      // For demo purposes
      setSubmissionResult('success')
      alert('Biodata form submitted successfully!')
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionResult('error')
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submissionResult === 'success') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h1 style={{ color: '#10b981', marginBottom: '16px' }}>Success!</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Your biodata form has been submitted successfully. Thank you for providing your information.
          </p>
          <button
            onClick={() => setSubmissionResult(null)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Create Another BioData
          </button>
        </div>
      </div>
    )
  }

  return (
    <MultiStepForm 
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
    />
  )
}
