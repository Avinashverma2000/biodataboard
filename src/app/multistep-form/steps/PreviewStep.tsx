import React, { useState } from 'react'
import Image from 'next/image'
import { FormData } from '../MultiStepForm'
import PDFTemplate from '../components/PDFTemplate'
import { generatePDF } from '../utils/pdfGenerator'
import styles from '../MultiStepForm.module.css'

interface PreviewStepProps {
  formData: FormData
  onEdit: (step: number) => void
}

function PreviewStep({ formData, onEdit }: PreviewStepProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showPDFPreview, setShowPDFPreview] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(formData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const togglePDFPreview = () => {
    setShowPDFPreview(!showPDFPreview)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const sections = [
    {
      title: 'Personal Details',
      step: 1,
      data: [
        { label: 'Name', value: formData.name },
        { label: 'Date of Birth', value: formatDate(formData.dateOfBirth) },
        { label: 'Age', value: formData.age ? `${formData.age} years` : 'Not calculated' },
        { label: 'Height', value: formData.height },
        { label: 'Caste', value: formData.caste },
        { label: 'Religion', value: formData.religion }
      ]
    },
    {
      title: 'Professional Details',
      step: 2,
      data: [
        { label: 'Education', value: formData.education },
        { label: 'Job Title', value: formData.jobTitle },
        { label: 'Company', value: formData.company },
        { 
          label: 'Work Location', 
          value: formData.workFromHome ? 'Work from Home' : formData.workLocation 
        }
      ]
    },
    {
      title: 'Family Details',
      step: 3,
      data: [
        { label: 'Mother\'s Name', value: formData.motherName },
        { label: 'Mother\'s Occupation', value: formData.motherOccupation },
        { label: 'Father\'s Name', value: formData.fatherName },
        { label: 'Father\'s Occupation', value: formData.fatherOccupation },
        { label: 'Siblings', value: formData.siblings || 'Not mentioned' }
      ]
    },
    {
      title: 'Hobbies & Interests',
      step: 4,
      data: [
        { label: 'Hobbies', value: formData.hobbies }
      ]
    }
  ]

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <p className={styles.previewSubtitle}>
          Please review all your information before submitting
        </p>
        
        {/* PDF Actions */}
        <div className={styles.pdfActions}>
          <button
            type="button"
            onClick={togglePDFPreview}
            className={styles.pdfPreviewButton}
          >
            {showPDFPreview ? '👁️ Hide PDF Preview' : '👁️ Show PDF Preview'}
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className={styles.downloadPdfButton}
          >
            {isGeneratingPDF ? '⏳ Generating...' : '📄 Download PDF'}
          </button>
        </div>
      </div>

      {/* PDF Preview */}
      {showPDFPreview && (
        <div className={styles.pdfPreviewContainer}>
          <h3 className={styles.previewSectionTitle}>PDF Preview</h3>
          <div className={styles.pdfPreviewWrapper}>
            <PDFTemplate formData={formData} isPreview={true} />
          </div>
        </div>
      )}

      {/* Photo Preview */}
      {formData.photoPreview && (
        <div className={styles.previewPhotoSection}>
          <h3 className={styles.previewSectionTitle}>Profile Photo</h3>
          <div className={styles.previewPhotoContainer}>
            <Image
              src={formData.photoPreview}
              alt="Profile photo"
              width={150}
              height={150}
              className={styles.previewPhoto}
            />
          </div>
        </div>
      )}

      {sections.map((section) => (
        <div key={section.step} className={styles.previewSection}>
          <div className={styles.previewSectionHeader}>
            <h3 className={styles.previewSectionTitle}>{section.title}</h3>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className={styles.editButton}
            >
              Edit
            </button>
          </div>

          <div className={styles.previewData}>
            {section.data.map((item) => (
              <div key={item.label} className={styles.previewItem}>
                <span className={styles.previewLabel}>{item.label}:</span>
                <span className={styles.previewValue}>
                  {item.value || 'Not provided'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary Card */}
      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Summary</h3>
        <div className={styles.summaryContent}>
          <p>
            <strong>{formData.name}</strong>, {formData.age} years old
          </p>
          <p>
            {formData.jobTitle} at {formData.company}
          </p>
          <p>
            {formData.religion} {formData.caste && `• ${formData.caste}`}
          </p>
          {formData.hobbies && (
            <p className={styles.hobbiesPreview}>
              <strong>Interests:</strong> {formData.hobbies.length > 100 
                ? `${formData.hobbies.substring(0, 100)}...` 
                : formData.hobbies}
            </p>
          )}
        </div>
      </div>
      
      {/* Hidden PDF Template for Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <PDFTemplate formData={formData} isPreview={false} />
      </div>
    </div>
  )
}

export default PreviewStep
