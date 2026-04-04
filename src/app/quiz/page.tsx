'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'age',
    q: 'How old are you?',
    sub: 'GLP-1 therapy is for adults 18 and above.',
    type: 'choice',
    options: ['18–30', '31–45', '46–60', '60+', 'Under 18'],
    disqualify: ['Under 18'],
  },
  {
    id: 'height_weight',
    q: 'What is your height and weight?',
    sub: 'We use this to calculate your BMI. For South Asian adults, GLP-1 is typically suitable at BMI ≥ 27.5.',
    type: 'bmi',
  },
  {
    id: 'conditions',
    q: 'Do you have any of these conditions?',
    sub: 'Select all that apply. Some conditions affect eligibility.',
    type: 'multi',
    options: ['Type 2 diabetes', 'PCOS', 'Hypertension', 'None of these'],
  },
  {
    id: 'contraindications',
    q: 'Have you ever been diagnosed with any of the following?',
    sub: 'These are important safety questions. Select all that apply.',
    type: 'multi',
    options: ['Medullary thyroid cancer (MTC) or family history of MTC', 'Pancreatitis', 'Severe kidney disease', 'Pregnant or trying to get pregnant', 'None of these'],
    disqualifyAny: ['Medullary thyroid cancer (MTC) or family history of MTC', 'Pancreatitis', 'Severe kidney disease', 'Pregnant or trying to get pregnant'],
  },
  {
    id: 'current_meds',
    q: 'Are you currently taking insulin or sulfonylurea medications?',
    sub: 'This helps the doctor assess potential drug interactions.',
    type: 'choice',
    options: ['Yes', 'No', 'Not sure'],
  },
  {
    id: 'goal',
    q: 'What is your primary goal?',
    sub: 'This helps the doctor personalise your care plan.',
    type: 'choice',
    options: ['Weight loss', 'Better blood sugar control', 'PCOS management', 'All of the above'],
  },
  {
    id: 'mumbai',
    q: 'Are you based in Mumbai or surrounding areas?',
    sub: 'We currently deliver medication within Mumbai. Teleconsultations are available across India.',
    type: 'choice',
    options: ['Yes, Mumbai', 'Near Mumbai (Thane, Navi Mumbai, etc.)', 'Rest of Maharashtra', 'Another state'],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [result, setResult] = useState<'eligible' | 'ineligible' | null>(null)

  const q = QUESTIONS[step]
  const progress = ((step) / QUESTIONS.length) * 100

  function calcBMI() {
    const h = parseFloat(heightCm) / 100
    const w = parseFloat(weightKg)
    if (!h || !w) return 0
    return w / (h * h)
  }

  function handleChoice(option: string) {
    const newAnswers = { ...answers, [q.id]: option }
    setAnswers(newAnswers)

    // Check disqualification
    if (q.disqualify?.includes(option)) {
      setResult('ineligible')
      return
    }
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setResult('eligible')
    }
  }

  function handleMulti(option: string) {
    const current = (answers[q.id] as string[]) || []
    const next = option === 'None of these'
      ? ['None of these']
      : current.includes('None of these')
        ? [option]
        : current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option]
    setAnswers({ ...answers, [q.id]: next })
  }

  function submitMulti() {
    const selected = (answers[q.id] as string[]) || []
    if (q.disqualifyAny?.some(d => selected.includes(d))) {
      setResult('ineligible')
      return
    }
    if (step < QUESTIONS.length - 1) setStep(step + 1)
    else setResult('eligible')
  }

  function submitBMI() {
    const bmi = calcBMI()
    if (bmi < 27.5) {
      setResult('ineligible')
      return
    }
    setAnswers({ ...answers, height_cm: heightCm, weight_kg: weightKg, bmi: bmi.toFixed(1) })
    setStep(step + 1)
  }

  if (result === 'ineligible') {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: 48, marginBottom: 20, textAlign: 'center' }}>🌿</div>
          <h2 style={headingStyle}>Not the right fit right now</h2>
          <p style={subStyle}>Based on your answers, GLP-1 therapy may not be suitable for you at this time. This could be due to safety reasons or because your BMI doesn't meet the threshold.</p>
          <p style={{ ...subStyle, marginTop: 12 }}>We strongly recommend speaking with a doctor about your weight management options.</p>
          <Link href="/" style={btnStyle}>Return home</Link>
        </div>
      </div>
    )
  }

  if (result === 'eligible') {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ fontSize: 48, marginBottom: 20, textAlign: 'center' }}>✅</div>
          <h2 style={{ ...headingStyle, color: 'var(--brand)' }}>You appear to be eligible</h2>
          <p style={subStyle}>Based on your responses, GLP-1 therapy may be suitable for you. The next step is a consultation with one of our doctors to confirm and discuss your treatment plan.</p>
          <div style={{ background: '#f0fdf6', borderRadius: 12, padding: 20, margin: '24px 0', fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--brand-dark)' }}>Your BMI: {calcBMI() > 0 ? Number(answers.bmi || calcBMI().toFixed(1)) : '—'}</strong>
            <br />Consultation: ₹799 · 30 min WhatsApp call · Licensed endocrinologist
          </div>
          <Link href="/login?next=book" style={{ ...btnStyle, textAlign: 'center' as const }}>Book consultation — ₹799 →</Link>
          <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>If the doctor decides GLP-1 isn't right for you, you pay nothing.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--brand-dark)', textDecoration: 'none' }}>
            GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
          </Link>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Question {step + 1} of {QUESTIONS.length}</span>
        </div>

        {/* Progress */}
        <div style={{ height: 4, background: '#e5e7eb', borderRadius: 2, marginBottom: 40, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--brand)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{q.q}</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>{q.sub}</p>

          {q.type === 'choice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options!.map(opt => (
                <button key={opt} onClick={() => handleChoice(opt)} style={optionStyle}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {q.type === 'multi' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {q.options!.map(opt => {
                  const selected = ((answers[q.id] as string[]) || []).includes(opt)
                  return (
                    <button key={opt} onClick={() => handleMulti(opt)} style={{
                      ...optionStyle,
                      background: selected ? '#f0fdf6' : 'white',
                      border: selected ? '2px solid var(--brand)' : '2px solid #e5e7eb',
                      color: selected ? 'var(--brand-dark)' : '#374151',
                    }}>
                      {selected ? '✓ ' : ''}{opt}
                    </button>
                  )
                })}
              </div>
              <button onClick={submitMulti} style={{ ...btnStyle, width: '100%' }} disabled={!answers[q.id] || (answers[q.id] as string[]).length === 0}>
                Continue →
              </button>
            </div>
          )}

          {q.type === 'bmi' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 8 }}>Height (cm)</label>
                  <input type="number" placeholder="e.g. 165" value={heightCm} onChange={e => setHeightCm(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 8 }}>Weight (kg)</label>
                  <input type="number" placeholder="e.g. 85" value={weightKg} onChange={e => setWeightKg(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
              {heightCm && weightKg && (
                <div style={{ background: '#f3f4f6', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 14, textAlign: 'center' as const }}>
                  Your BMI: <strong>{calcBMI().toFixed(1)}</strong>
                  <span style={{ marginLeft: 8, color: calcBMI() >= 27.5 ? 'var(--brand)' : '#ef4444', fontWeight: 500 }}>
                    {calcBMI() >= 27.5 ? '✓ Meets threshold' : '✗ Below 27.5 threshold'}
                  </span>
                </div>
              )}
              <button onClick={submitBMI} style={{ ...btnStyle, width: '100%' }} disabled={!heightCm || !weightKg}>
                Continue →
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 24 }}>
          Anonymous · Your answers are not stored unless you create an account
        </p>
      </div>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
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
}

const headingStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 28,
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: 16,
  textAlign: 'center',
}

const subStyle: React.CSSProperties = {
  fontSize: 15,
  color: '#4b5563',
  lineHeight: 1.7,
  textAlign: 'center',
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 32px',
  background: 'var(--brand)',
  color: 'white',
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: "'DM Sans', sans-serif",
  marginTop: 16,
}

const optionStyle: React.CSSProperties = {
  padding: '14px 20px',
  background: 'white',
  border: '2px solid #e5e7eb',
  borderRadius: 10,
  fontSize: 15,
  color: '#374151',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.15s',
  fontFamily: "'DM Sans', sans-serif",
}
