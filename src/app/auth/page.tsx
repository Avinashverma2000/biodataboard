'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from './login'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePasswordLogin = async (formData: { username: string; password: string }) => {
    setIsLoading(true)
    console.log('Password login attempted with:', formData)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically make an API call to authenticate the user
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (response.ok) {
      //   router.push('/multistep-form')
      // } else {
      //   setError('Invalid credentials')
      // }
      
      // On successful login, redirect to multistep form
      router.push('/multistep-form')
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPLogin = async (formData: { phoneNumber: string; otp: string }) => {
    setIsLoading(true)
    console.log('OTP login attempted with:', formData)
    
    try {
      // Simulate API call for OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would verify the OTP
      // Example:
      // const response = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (response.ok) {
      //   router.push('/multistep-form')
      // } else {
      //   setError('Invalid OTP')
      // }
      
      // On successful OTP verification, redirect to multistep form
      router.push('/multistep-form')
    } catch (error) {
      console.error('OTP verification error:', error)
      alert('OTP verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOTP = async (phoneNumber: string) => {
    setIsLoading(true)
    console.log('Sending OTP to:', phoneNumber)
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would send the OTP via SMS
      // Example:
      // const response = await fetch('/api/auth/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber })
      // })
      // if (!response.ok) {
      //   throw new Error('Failed to send OTP')
      // }
      
      alert(`OTP sent to ${phoneNumber}`)
    } catch (error) {
      console.error('Send OTP error:', error)
      alert('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Login 
      onLogin={handlePasswordLogin}
      onOTPLogin={handleOTPLogin}
      onSendOTP={handleSendOTP}
      isLoading={isLoading}
    />
  )
}
