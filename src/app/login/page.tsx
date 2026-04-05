'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPage = searchParams.get('next') || 'dashboard'
  const setAuth = useAuthStore(s => s.setAuth)

  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugOtp, setDebugOtp] = useState('')

  async function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await authApi.sendOtp(phone)
      if (res.data.debug_otp) setDebugOtp(res.data.debug_otp)
      setStep('otp')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.')
    }
    setLoading(false)
  }

  async function verifyOtp() {
    if (otp.length !== 6) { setError('Enter the 6-digit OTP'); return }
    setLoading(true)
    setError('')
    try {
      const res = await authApi.verifyOtp(phone, otp)
      const { user, accessToken } = res.data
      setAuth(user, accessToken)
      router.push(`/${nextPage}`)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Incorrect OTP. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={outerStyle}>
      <div style={cardStyle}>
        <Link href='/' style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none', marginBottom: 16, display: 'block' }}>
          ← Back
        </Link>
        
        <Link href='/' style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--brand-dark)', textDecoration: 'none', display: 'block', textAlign: 'center', marginBottom: 32 }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </Link>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 8, textAlign: 'center' }}>
          {step === 'phone' ? 'Sign in or create account' : 'Enter your OTP'}
        </h2>
        <p style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 32 }}>
          {step === 'phone'
            ? 'We\'ll send a 6-digit code to your WhatsApp'
            : `Code sent to +91 ${phone}`}
        </p>

        {step === 'phone' && (
          <div>
            <div style={{ display: 'flex', border: '2px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', color: '#6b7280', fontSize: 15, borderRight: '2px solid #e5e7eb', whiteSpace: 'nowrap' }}>+91</div>
              <input
                type='tel' placeholder='98765 43210' value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onKeyDown={e => e.key === 'Enter' && sendOtp()}
                style={{ flex: 1, padding: '12px 16px', border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit' }}
              />
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button onClick={sendOtp} disabled={loading || phone.length !== 10} style={btnStyle}>
              {loading ? 'Sending...' : 'Send OTP to WhatsApp →'}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div>
            {debugOtp && (
              <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: '#713f12', textAlign: 'center' }}>
                Dev mode — OTP: <strong>{debugOtp}</strong>
              </div>
            )}
            <input
              type='number' placeholder='000000' value={otp}
              onChange={e => setOtp(e.target.value.slice(0, 6))}
              onKeyDown={e => e.key === 'Enter' && verifyOtp()}
              style={{ width: '100%', padding: '16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 28, textAlign: 'center', outline: 'none', fontFamily: 'inherit', letterSpacing: '0.3em' }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button onClick={verifyOtp} disabled={loading || otp.length !== 6} style={btnStyle}>
              {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>
            <button onClick={() => { setStep('phone'); setOtp(''); setError('') }} style={{ display: 'block', width: '100%', marginTop: 12, padding: '10px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>
              ← Change number
            </button>
          </div>
        )}

        <p style={{ marginTop: 24, fontSize: 12, color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Your data is protected under DPDPA 2023.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

const outerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'var(--cream)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 24px',
  fontFamily: "'DM Sans', sans-serif",
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: 20,
  padding: 40,
  border: '1px solid #e5e7eb',
  width: '100%',
  maxWidth: 440,
}

const btnStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  background: 'var(--brand)',
  color: 'white',
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
}