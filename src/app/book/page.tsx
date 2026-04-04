'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { consultApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

// Hardcoded doctor for MVP — in production, fetch from /doctors
const MVP_DOCTOR = {
  id: '', // filled from env or first fetch
  name: 'Available Endocrinologist',
  qualification: 'MBBS, MD (Endocrinology)',
  bio: 'Specialised in metabolic disorders, PCOS, and GLP-1 therapy. 8+ years experience. Fluent in English, Hindi, Marathi.',
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
]

function getNext7Days() {
  const days = []
  for (let i = 1; i <= 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d)
  }
  return days
}

declare global {
  interface Window { Razorpay: any }
}

export default function BookPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuthStore()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [booking, setBooking] = useState(false)
  const [error, setError] = useState('')
  const days = getNext7Days()

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login?next=book'); return }
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.head.appendChild(script)
  }, [])

  async function handleBook() {
    if (!selectedDate || !selectedTime) { setError('Please select a date and time'); return }
    if (!isLoggedIn()) { router.push('/login?next=book'); return }
    setBooking(true)
    setError('')

    try {
      const scheduledAt = new Date(selectedDate)
      const [h, m] = selectedTime.split(':')
      scheduledAt.setHours(parseInt(h), parseInt(m), 0, 0)

      // For MVP: use first available doctor ID
      // In production: fetch from /doctors and let patient choose
      const doctorId = process.env.NEXT_PUBLIC_DOCTOR_ID || 'PLACEHOLDER_DOCTOR_ID'

      const res = await consultApi.book(doctorId, scheduledAt.toISOString())
      const { razorpayOrderId, amountPaise, razorpayKeyId } = res.data

      // Open Razorpay
      const options = {
        key: razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: amountPaise,
        currency: 'INR',
        name: 'GLPKart',
        description: 'GLP-1 Doctor Consultation',
        order_id: razorpayOrderId,
        handler: () => {
          // Payment captured — webhook handles the rest
          router.push('/dashboard?booked=1')
        },
        prefill: { contact: '' },
        theme: { color: '#16a34a' },
        modal: { ondismiss: () => setBooking(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.')
      setBooking(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--brand-dark)', textDecoration: 'none' }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </Link>
        <Link href="/dashboard" style={{ fontSize: 14, color: '#6b7280', textDecoration: 'none' }}>← Back to dashboard</Link>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>Book a consultation</h1>
        <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 40 }}>30-minute WhatsApp call with a licensed endocrinologist. ₹799 only.</p>

        {/* Doctor card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #e5e7eb', marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f0fdf6', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍⚕️</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#1a1a1a' }}>{MVP_DOCTOR.name}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{MVP_DOCTOR.qualification}</div>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}>{MVP_DOCTOR.bio}</p>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6', display: 'flex', gap: 20, fontSize: 13, color: '#6b7280' }}>
            <span>📱 WhatsApp call</span>
            <span>⏱ 30 minutes</span>
            <span>💰 ₹799</span>
            <span>🔒 Private & confidential</span>
          </div>
        </div>

        {/* Date selection */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Select a date</h3>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {days.map((d, i) => {
              const selected = selectedDate?.toDateString() === d.toDateString()
              return (
                <button key={i} onClick={() => { setSelectedDate(d); setSelectedTime(null) }} style={{
                  padding: '12px 16px', borderRadius: 12, border: '2px solid', cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit', textAlign: 'center',
                  background: selected ? 'var(--brand)' : 'white',
                  borderColor: selected ? 'var(--brand)' : '#e5e7eb',
                  color: selected ? 'white' : '#1a1a1a',
                }}>
                  <div style={{ fontSize: 11, marginBottom: 2 }}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{d.getDate()}</div>
                  <div style={{ fontSize: 11 }}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time slots */}
        {selectedDate && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Select a time (IST)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {TIME_SLOTS.map(t => {
                const selected = selectedTime === t
                return (
                  <button key={t} onClick={() => setSelectedTime(t)} style={{
                    padding: '10px 8px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
                    background: selected ? 'var(--brand)' : 'white',
                    borderColor: selected ? 'var(--brand)' : '#e5e7eb',
                    color: selected ? 'white' : '#374151',
                  }}>
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Summary & pay */}
        {selectedDate && selectedTime && (
          <div style={{ background: '#f0fdf6', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #bbf7d2' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--brand-dark)', marginBottom: 12 }}>Booking summary</h3>
            <div style={{ fontSize: 14, color: '#374151', lineHeight: 2 }}>
              <div>📅 {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div>🕐 {selectedTime} IST</div>
              <div>👨‍⚕️ {MVP_DOCTOR.name}</div>
              <div>💰 ₹799 · Paid via Razorpay</div>
            </div>
          </div>
        )}

        {error && <p style={{ color: '#ef4444', fontSize: 14, marginBottom: 16 }}>{error}</p>}

        <button onClick={handleBook} disabled={booking || !selectedDate || !selectedTime} style={{
          width: '100%', padding: '16px', background: 'var(--brand)', color: 'white', borderRadius: 12,
          fontSize: 16, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          opacity: (!selectedDate || !selectedTime) ? 0.5 : 1,
        }}>
          {booking ? 'Processing...' : 'Pay ₹799 & confirm booking →'}
        </button>
        <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
          If the doctor decides GLP-1 isn't suitable for you, you get a full refund.
        </p>
      </div>
    </div>
  )
}
