'use client'

import React from 'react'
import { FormData } from '../MultiStepForm'

interface PDFTemplateProps {
  formData: FormData
  isPreview?: boolean
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({ formData, isPreview = false }) => {
  return (
    <div 
      id={isPreview ? "pdf-preview" : "pdf-content"}
      style={{
        width: '210mm',
        height: '297mm',
        padding: '8mm',
        backgroundColor: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
        color: '#333',
        margin: '0 auto',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Ganesh Ji Image at Top - Outside Border */}
      <div style={{
        textAlign: 'center',
        marginBottom: '8px'
      }}>
        <img
          src="/ganesh_jee.jpeg"
          alt="Ganesh Ji"
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '2px solid #667eea',
            backgroundColor: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Main Content with Border Frame */}
      <div style={{
        border: '3px solid #667eea',
        borderRadius: '10px',
        padding: '15px',
        height: 'calc(100% - 60px)',
        position: 'relative',
        backgroundColor: '#fafbff',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '15px',
          borderBottom: '2px solid #667eea',
          paddingBottom: '10px'
        }}>
          <h1 style={{
            margin: '0 0 5px 0',
            fontSize: '22px',
            color: '#667eea',
            fontWeight: 'bold'
          }}>
            BIODATA
          </h1>
        </div>

        {/* Content Area - Single Column */}
        <div style={{
          flex: '1',
          overflow: 'hidden'
        }}>
          {/* Personal Details Section with Photo */}
          <div style={{ 
            marginBottom: '15px',
            display: 'flex',
            gap: '15px'
          }}>
            {/* Personal Details - Left Side */}
            <div style={{ flex: '1' }}>
              <h2 style={{
                fontSize: '14px',
                color: '#667eea',
                marginBottom: '8px',
                borderBottom: '1px solid #e0e7ff',
                paddingBottom: '3px',
                fontWeight: 'bold'
              }}>
                Personal Details
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '4px'
              }}>
                {[
                  { label: 'Name', value: formData.name },
                  { label: 'Date of Birth', value: formData.dateOfBirth },
                  { label: 'Age', value: formData.age },
                  { label: 'Height', value: formData.height },
                  { label: 'Religion', value: formData.religion },
                  { label: 'Caste', value: formData.caste }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    fontSize: '10px',
                    marginBottom: '2px'
                  }}>
                    <span style={{
                      fontWeight: 'bold',
                      color: '#374151',
                      minWidth: '80px',
                      marginRight: '10px'
                    }}>
                      {item.label}:
                    </span>
                    <span style={{
                      color: '#6b7280',
                      flex: '1'
                    }}>
                      {item.value || 'Not specified'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* User Photo - Right Side */}
            <div style={{ flex: '0 0 auto' }}>
              {formData.photoPreview ? (
                <div style={{
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  padding: '3px',
                  backgroundColor: '#f8f9ff'
                }}>
                  <img
                    src={formData.photoPreview}
                    alt="Profile"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      display: 'block'
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  width: '80px',
                  height: '80px',
                  border: '2px dashed #667eea',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9ff',
                  fontSize: '10px',
                  color: '#667eea',
                  textAlign: 'center'
                }}>
                  Photo
                </div>
              )}
            </div>
          </div>

          {/* Professional Details Section */}
          <div style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              color: '#667eea',
              marginBottom: '8px',
              borderBottom: '1px solid #e0e7ff',
              paddingBottom: '3px',
              fontWeight: 'bold'
            }}>
              Professional Details
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4px'
            }}>
              {[
                { label: 'Education', value: formData.education },
                { label: 'Job Title', value: formData.jobTitle },
                { label: 'Company', value: formData.company },
                { label: 'Work Location', value: formData.workLocation },
                { label: 'Work From Home', value: formData.workFromHome ? 'Yes' : 'No' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  fontSize: '10px',
                  marginBottom: '2px'
                }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: '#374151',
                    minWidth: '80px',
                    marginRight: '10px'
                  }}>
                    {item.label}:
                  </span>
                  <span style={{
                    color: '#6b7280',
                    flex: '1'
                  }}>
                    {item.value || 'Not specified'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Family Details Section */}
          <div style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              color: '#667eea',
              marginBottom: '8px',
              borderBottom: '1px solid #e0e7ff',
              paddingBottom: '3px',
              fontWeight: 'bold'
            }}>
              Family Details
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4px'
            }}>
              {[
                { label: 'Father\'s Name', value: formData.fatherName },
                { label: 'Father\'s Occupation', value: formData.fatherOccupation },
                { label: 'Mother\'s Name', value: formData.motherName },
                { label: 'Mother\'s Occupation', value: formData.motherOccupation },
                { label: 'Siblings', value: formData.siblings }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  fontSize: '10px',
                  marginBottom: '2px'
                }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: '#374151',
                    minWidth: '80px',
                    marginRight: '10px'
                  }}>
                    {item.label}:
                  </span>
                  <span style={{
                    color: '#6b7280',
                    flex: '1'
                  }}>
                    {item.value || 'Not specified'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies Section */}
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{
              fontSize: '14px',
              color: '#667eea',
              marginBottom: '8px',
              borderBottom: '1px solid #e0e7ff',
              paddingBottom: '3px',
              fontWeight: 'bold'
            }}>
              Hobbies & Interests
            </h2>
            <div style={{
              fontSize: '10px',
              color: '#6b7280',
              lineHeight: '1.3'
            }}>
              {formData.hobbies || 'Not specified'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid #667eea',
          paddingTop: '8px',
          fontSize: '9px',
          color: '#6b7280',
          marginTop: 'auto'
        }}>
          Generated on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default PDFTemplate
