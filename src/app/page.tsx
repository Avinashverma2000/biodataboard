'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    // Comment out login step for now - go directly to form
    router.push('/multistep-form')
    // router.push('/auth') // Uncomment this line to enable login step
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '24px',
          animation: 'pulse 2s ease-in-out infinite alternate'
        }}>
          💍
        </div>
        <h1 style={{ 
          margin: '0 0 16px 0', 
          fontSize: '48px',
          fontWeight: 'bold',
          letterSpacing: '-1px'
        }}>
          Shaadi Biodata
        </h1>
        <p style={{ 
          margin: '0 0 32px 0', 
          opacity: 0.9,
          fontSize: '18px',
          lineHeight: '1.6'
        }}>
          Create beautiful, professional biodata for matrimonial purposes. 
          Fill in your details step by step and generate a stunning profile.
        </p>
        <button
          onClick={handleGetStarted}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '16px 32px',
            fontSize: '18px',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600',
            letterSpacing: '0.5px',
            backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(0px)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Get Started →
        </button>
        <div style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          opacity: 0.8
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
            <div style={{ fontSize: '14px' }}>Easy Form</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✨</div>
            <div style={{ fontSize: '14px' }}>Beautiful Design</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
            <div style={{ fontSize: '14px' }}>Mobile Friendly</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
