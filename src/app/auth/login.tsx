'use client'

import React, { useState, useEffect } from 'react'
import styles from './login.module.css'

interface LoginFormData {
  username: string
  password: string
}

interface OTPFormData {
  phoneNumber: string
  otp: string
}

interface LoginProps {
  onLogin?: (formData: LoginFormData) => void
  onOTPLogin?: (formData: OTPFormData) => void
  onSendOTP?: (phoneNumber: string) => void
  isLoading?: boolean
  otpSent?: boolean
}

type LoginMode = 'password' | 'otp'
type OTPStep = 'phone' | 'verify'

function Login({ onLogin, onOTPLogin, onSendOTP, isLoading = false, otpSent = false }: LoginProps) {
  const [loginMode, setLoginMode] = useState<LoginMode>('password')
  const [otpStep, setOTPStep] = useState<OTPStep>('phone')
  const [countdown, setCountdown] = useState(0)

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  })
  
  const [otpFormData, setOTPFormData] = useState<OTPFormData>({
    phoneNumber: '',
    otp: ''
  })
  
  const [errors, setErrors] = useState<Partial<LoginFormData & OTPFormData>>({})

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Reset to phone step when switching to OTP mode
  useEffect(() => {
    if (loginMode === 'otp') {
      setOTPStep('phone')
      setCountdown(0)
    }
  }, [loginMode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (loginMode === 'password') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setOTPFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof (LoginFormData & OTPFormData)]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validatePasswordForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePhoneNumber = (): boolean => {
    const newErrors: Partial<OTPFormData> = {}
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/
    
    if (!otpFormData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!phoneRegex.test(otpFormData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOTP = (): boolean => {
    const newErrors: Partial<OTPFormData> = {}
    
    if (!otpFormData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (otpFormData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    } else if (!/^\d{6}$/.test(otpFormData.otp)) {
      newErrors.otp = 'OTP must contain only numbers'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePasswordForm()) {
      onLogin?.(formData)
    }
  }

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePhoneNumber()) {
      onSendOTP?.(otpFormData.phoneNumber)
      setOTPStep('verify')
      setCountdown(30) // 30 second countdown
    }
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateOTP()) {
      onOTPLogin?.(otpFormData)
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      onSendOTP?.(otpFormData.phoneNumber)
      setCountdown(30)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    
    // Format as needed (this is a simple example)
    if (digits.length <= 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = name === 'phoneNumber' ? formatPhoneNumber(value) : value
    
    setOTPFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
    
    if (errors[name as keyof OTPFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>
          {loginMode === 'password' 
            ? 'Please sign in to your account'
            : otpStep === 'phone' 
              ? 'Enter your phone number to receive OTP'
              : 'Enter the OTP sent to your phone'
          }
        </p>
        
        {/* Login Mode Toggle */}
        <div className={styles.toggleContainer}>
          <button
            type="button"
            className={`${styles.toggleButton} ${loginMode === 'password' ? styles.active : ''}`}
            onClick={() => setLoginMode('password')}
          >
            Password
          </button>
          <button
            type="button"
            className={`${styles.toggleButton} ${loginMode === 'otp' ? styles.active : ''}`}
            onClick={() => setLoginMode('otp')}
          >
            OTP
          </button>
        </div>

        {/* Password Login Form */}
        {loginMode === 'password' && (
          <form onSubmit={handlePasswordSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.username && (
                <span className={styles.errorMessage}>{errors.username}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* OTP Login Forms */}
        {loginMode === 'otp' && (
          <>
            {/* Phone Number Step */}
            {otpStep === 'phone' && (
              <form onSubmit={handleSendOTP} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={otpFormData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter your phone number"
                    className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''}`}
                    disabled={isLoading}
                  />
                  {errors.phoneNumber && (
                    <span className={styles.errorMessage}>{errors.phoneNumber}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {/* OTP Verification Step */}
            {otpStep === 'verify' && (
              <form onSubmit={handleVerifyOTP} className={styles.form}>
                <div className={styles.otpInfo}>
                  <p className={styles.otpSentMessage}>
                    OTP sent to {otpFormData.phoneNumber}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOTPStep('phone')}
                    className={styles.changeNumberButton}
                  >
                    Change number
                  </button>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="otp" className={styles.label}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otpFormData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className={`${styles.input} ${styles.otpInput} ${errors.otp ? styles.inputError : ''}`}
                    disabled={isLoading}
                  />
                  {errors.otp && (
                    <span className={styles.errorMessage}>{errors.otp}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className={styles.resendContainer}>
                  {countdown > 0 ? (
                    <p className={styles.countdownText}>
                      Resend OTP in {countdown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className={styles.resendButton}
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            )}
          </>
        )}

        <div className={styles.footer}>
          <a href="#" className={styles.link}>
            Need help?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login