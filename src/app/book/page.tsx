'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { consultApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const G = '#16a34a'
const GL = '#EAF3DE'
const GD = '#14532b'
const BORDER = '#e5e7eb'
const MUTED = '#6b7280'
const FAINT = '#9ca3af'
const INK = '#1a1a1a'
const SANS = "'DM Sans', -apple-system, sans-serif"
const SERIF = "'Playfair Display', Georgia, serif"

export default function BookPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [booking, setBooking] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) router.push('/login?next=book')
  }, [])

  async function handleBook() {
    setBooking(true)
    setError('')
    try {
      // Instant booking — scheduledAt is now, doctor calls ASAP
      const doctorId = process.env.NEXT_PUBLIC_DOCTOR_ID || ''
      if (!doctorId) {
        setError('No doctor available right now. Please try again shortly.')
        setBooking(false)
        return
      }
      await consultApi.book(doctorId, new Date().toISOString())
      setDone(true)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.')
      setBooking(false)
    }
  }

  const Nav = (
    <nav style={{ background: 'white', borderBottom: `1px solid ${BORDER}`, padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: SANS }}>
      <Link href="/" style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: GD, textDecoration: 'none' }}>
        GLP<span style={{ color: G }}>Kart</span>
      </Link>
      <Link href="/dashboard" style={{ fontSize: 14, color: MUTED, textDecoration: 'none' }}>← Back to dashboard</Link>
    </nav>
  )

  // ─── Success state ───────────────────────────────────────────────────────────
  if (done) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: GL, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke={G} strokeWidth="2"/>
            <path d="M10 16l4 4 8-8" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: INK, marginBottom: 12 }}>
          Consultation requested!
        </h1>
        <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, marginBottom: 32 }}>
          Your request has been sent to our doctor. They will call you on WhatsApp as soon as possible — usually within a few hours.
        </p>
        <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 14, padding: 24, marginBottom: 32, textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3B6D11', marginBottom: 12 }}>What happens next</div>
          {[
            'Doctor reviews your profile before calling',
            'You receive a WhatsApp call — keep your phone handy',
            '30-minute consultation to assess your eligibility',
            'Prescription and treatment plan sent after the call',
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#374151', alignItems: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: G, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              {s}
            </div>
          ))}
        </div>
        <Link href="/dashboard" style={{ display: 'inline-flex', padding: '13px 32px', background: G, color: 'white', borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
          Go to dashboard →
        </Link>
      </div>
    </div>
  )

  // ─── Booking page ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: INK, marginBottom: 8 }}>
          Book a consultation
        </h1>
        <p style={{ fontSize: 15, color: MUTED, marginBottom: 36, lineHeight: 1.7 }}>
          Speak with a licensed endocrinologist on WhatsApp. They will assess your eligibility, answer your questions, and prescribe the right GLP-1 medication.
        </p>

        {/* Doctor card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, border: `1px solid ${BORDER}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: GL, border: `2px solid #C0DD97`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👨‍⚕️</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: INK }}>Available Endocrinologist</div>
              <div style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>MBBS, MD (Endocrinology)</div>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65 }}>
                Specialised in metabolic disorders, PCOS, and GLP-1 therapy. 8+ years experience. Fluent in English, Hindi, Marathi.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid #f3f4f6`, display: 'flex', gap: 20, fontSize: 13, color: MUTED, flexWrap: 'wrap' }}>
            <span>📱 WhatsApp call</span>
            <span>⏱ 30 minutes</span>
            <span>💰 ₹799</span>
            <span>🔒 Private &amp; confidential</span>
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, border: `1px solid ${BORDER}`, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 16 }}>How instant booking works</div>
          {[
            { icon: '📋', title: 'Request sent instantly', desc: 'Your consultation request goes to the next available doctor.' },
            { icon: '📲', title: 'Doctor calls you on WhatsApp', desc: 'No need to pick a slot — the doctor calls as soon as they\'re available, usually within a few hours.' },
            { icon: '💊', title: 'Prescription on the same day', desc: 'If eligible, you get your prescription and treatment plan right after the call.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: i < 2 ? 18 : 0, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 14, padding: '16px 20px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#3B6D11' }}>Consultation fee</div>
            <div style={{ fontSize: 12, color: '#639922', marginTop: 2 }}>Full refund if GLP-1 isn't suitable for you</div>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: GD }}>₹799</div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#b91c1c' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleBook}
          disabled={booking}
          style={{
            width: '100%', padding: '16px', background: booking ? '#86efac' : G,
            color: 'white', borderRadius: 12, fontSize: 16, fontWeight: 600,
            border: 'none', cursor: booking ? 'not-allowed' : 'pointer',
            fontFamily: SANS, transition: 'background 0.2s',
          }}
        >
          {booking ? 'Requesting consultation…' : 'Request consultation — ₹799 →'}
        </button>

        <p style={{ marginTop: 12, fontSize: 12, color: FAINT, textAlign: 'center', lineHeight: 1.7 }}>
          By booking you agree to our Terms of Service. Payment collected by the doctor after consultation.
        </p>
      </div>
    </div>
  )
}
