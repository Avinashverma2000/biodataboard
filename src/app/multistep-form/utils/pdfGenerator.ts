import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { FormData } from '../MultiStepForm'

export const generatePDF = async (formData: FormData): Promise<void> => {
  try {
    // Get the PDF content element
    const element = document.getElementById('pdf-content')
    if (!element) {
      throw new Error('PDF content element not found')
    }

    // Configure html2canvas options for single page
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0
    })

    // A4 dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF with single page - scale content to fit
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // If content is taller than A4, scale it down to fit
    if (imgHeight > pageHeight) {
      const scaleFactor = pageHeight / imgHeight
      const scaledWidth = imgWidth * scaleFactor
      const scaledHeight = pageHeight
      const xOffset = (imgWidth - scaledWidth) / 2 // Center horizontally
      
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xOffset, 0, scaledWidth, scaledHeight)
    } else {
      // Content fits on one page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight)
    }

    // Generate filename with name and date
    const fileName = `${formData.name.replace(/\s+/g, '_')}_Biodata_${new Date().toISOString().split('T')[0]}.pdf`

    // Save the PDF
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}

export const previewPDF = async (formData: FormData): Promise<string> => {
  try {
    const element = document.getElementById('pdf-content')
    if (!element) {
      throw new Error('PDF content element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    return canvas.toDataURL('image/png')
  } catch (error) {
    console.error('Error generating PDF preview:', error)
    throw new Error('Failed to generate PDF preview.')
  }
}
