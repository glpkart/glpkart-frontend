'use client'
import { useState } from 'react'
import Link from 'next/link'

const WA_NUMBER = '919999999999'

const QUESTIONS = [
  { id: 'age', q: 'How old are you?', sub: 'GLP-1 therapy is for adults 18 and above.', type: 'choice', options: ['18–30', '31–45', '46–60', '60+', 'Under 18'], disqualify: ['Under 18'] },
  { id: 'height_weight', q: 'What is your height and weight?', sub: 'We use this to calculate your BMI. For South Asian adults, GLP-1 is typically suitable at BMI ≥ 27.5.', type: 'bmi' },
  { id: 'conditions', q: 'Do you have any of these conditions?', sub: 'Select all that apply.', type: 'multi', options: ['Type 2 diabetes', 'PCOS', 'Hypertension', 'None of these'] },
  { id: 'contraindications', q: 'Have you ever been diagnosed with any of the following?', sub: 'These are important safety questions.', type: 'multi', options: ['Medullary thyroid cancer (MTC) or family history of MTC', 'Pancreatitis', 'Severe kidney disease', 'Pregnant or trying to get pregnant', 'None of these'], disqualifyAny: ['Medullary thyroid cancer (MTC) or family history of MTC', 'Pancreatitis', 'Severe kidney disease', 'Pregnant or trying to get pregnant'] },
  { id: 'current_meds', q: 'Are you currently taking insulin or sulfonylurea medications?', sub: 'This helps the doctor assess potential drug interactions.', type: 'choice', options: ['Yes', 'No', 'Not sure'] },
  { id: 'goal', q: 'What is your primary goal?', sub: 'This helps the doctor personalise your care plan.', type: 'choice', options: ['Weight loss', 'Better blood sugar control', 'PCOS management', 'All of the above'] },
  { id: 'location', q: 'Where are you based?', sub: 'We currently deliver medication within Mumbai. Teleconsultations are available across India.', type: 'choice', options: ['Mumbai', 'Near Mumbai (Thane, Navi Mumbai, etc.)', 'Rest of Maharashtra', 'Another state'] },
]

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [result, setResult] = useState<'eligible' | 'ineligible' | null>(null)
  const q = QUESTIONS[step]
  const progress = (step / QUESTIONS.length) * 100
  function calcBMI() { const h = parseFloat(heightCm) / 100; const w = parseFloat(weightKg); if (!h || !w) return 0; return w / (h * h) }
  function handleChoice(option: string) { const na = { ...answers, [q.id]: option }; setAnswers(na); if (q.disqualify?.includes(option)) { setResult('ineligible'); return }; if (step < QUESTIONS.length - 1) setStep(step + 1); else setResult('eligible') }
  function handleMulti(option: string) { const cur = (answers[q.id] as string[]) || []; const next = option === 'None of these' ? ['None of these'] : cur.includes('None of these') ? [option] : cur.includes(option) ? cur.filter(o => o !== option) : [...cur, option]; setAnswers({ ...answers, [q.id]: next }) }
  function submitMulti() { const sel = (answers[q.id] as string[]) || []; if (q.disqualifyAny?.some(d => sel.includes(d))) { setResult('ineligible'); return }; if (step < QUESTIONS.length - 1) setStep(step + 1); else setResult('eligible') }
  function submitBMI() { const bmi = calcBMI(); if (bmi < 27.5) { setResult('ineligible'); return }; setAnswers({ ...answers, height_cm: heightCm, weight_kg: weightKg, bmi: bmi.toFixed(1) }); setStep(step + 1) }
  const bmi = calcBMI()
  const waText = encodeURIComponent(`Hi, I completed the GLPKart eligibility quiz and I appear to be eligible.\n\nBMI: ${answers.bmi || bmi.toFixed(1)}\nGoal: ${answers.goal || 'Not specified'}\n\nI'd like to book a consultation.`)
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`
  const cs: React.CSSProperties = { minHeight: '100vh', background: '#FAFAF7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: "'DM Sans', sans-serif" }
  const card: React.CSSProperties = { background: 'white', borderRadius: 20, padding: 40, border: '1px solid #e5e7eb', width: '100%' }
  const hs: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 16, textAlign: 'center' }
  const ss: React.CSSProperties = { fontSize: 15, color: '#4b5563', lineHeight: 1.7, textAlign: 'center' }
  const bs: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 32px', background: '#16a34a', color: 'white', borderRadius: 10, fontSize: 15, fontWeight: 500, border: 'none', cursor: 'pointer', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", marginTop: 16 }
  const os: React.CSSProperties = { padding: '14px 20px', background: 'white', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, color: '#374151', cursor: 'pointer', textAlign: 'left', fontFamily: "'DM Sans', sans-serif" }
  if (result === 'ineligible') return (
    <div style={cs}><div style={card}>
      <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 20 }}>🌿</div>
      <h2 style={hs}>Not the right fit right now</h2>
      <p style={ss}>Based on your answers, GLP-1 therapy may not be suitable for you at this time — due to safety reasons or BMI threshold.</p>
      <p style={{ ...ss, marginTop: 12 }}>We strongly recommend speaking with a doctor about your weight management options.</p>
      <Link href="/" style={{ ...bs, display: 'flex', justifyContent: 'center', marginTop: 24 }}>← Return home</Link>
    </div></div>
  )
  if (result === 'eligible') return (
    <div style={cs}><div style={card}>
      <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 20 }}>✅</div>
      <h2 style={{ ...hs, color: '#16a34a' }}>You appear to be eligible</h2>
      <p style={ss}>Based on your responses, GLP-1 therapy may be suitable for you. The next step is a quick chat on WhatsApp to book your consultation.</p>
      <div style={{ background: '#f0fdf6', borderRadius: 12, padding: 20, margin: '24px 0', fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
        <strong style={{ color: '#14532b' }}>Your BMI: {Number(answers.bmi || bmi.toFixed(1))}</strong><br />
        Consultation: ₹799 · WhatsApp call · Licensed endocrinologist<br />
        <span style={{ fontSize: 12, color: '#6b7280' }}>Full refund if GLP-1 isn't right for you</span>
      </div>
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '16px 24px', background: '#25D366', color: 'white', borderRadius: 12, fontSize: 16, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
        Book consultation on WhatsApp →
      </a>
      <p style={{ marginTop: 10, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>Opens WhatsApp with your quiz results pre-filled.</p>
    </div></div>
  )
  return (
    <div style={cs}>
      <div style={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#14532b', textDecoration: 'none' }}>GLP<span style={{ color: '#16a34a' }}>Kart</span></Link>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Question {step + 1} of {QUESTIONS.length}</span>
        </div>
        <div style={{ height: 4, background: '#e5e7eb', borderRadius: 2, marginBottom: 40, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#16a34a', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
        <div style={card}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{q.q}</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32, lineHeight: 1.6 }}>{q.sub}</p>
          {q.type === 'choice' && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{q.options!.map(opt => <button key={opt} onClick={() => handleChoice(opt)} style={os}>{opt}</button>)}</div>}
          {q.type === 'multi' && <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {q.options!.map(opt => { const sel = ((answers[q.id] as string[]) || []).includes(opt); return <button key={opt} onClick={() => handleMulti(opt)} style={{ ...os, background: sel ? '#f0fdf6' : 'white', border: sel ? '2px solid #16a34a' : '2px solid #e5e7eb', color: sel ? '#14532b' : '#374151' }}>{sel ? '✓ ' : ''}{opt}</button> })}
            </div>
            <button onClick={submitMulti} style={{ ...bs, width: '100%' }} disabled={!answers[q.id] || (answers[q.id] as string[]).length === 0}>Continue →</button>
          </div>}
          {q.type === 'bmi' && <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 8 }}>Height (cm)</label><input type="number" placeholder="e.g. 165" value={heightCm} onChange={e => setHeightCm(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit' }} /></div>
              <div><label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 8 }}>Weight (kg)</label><input type="number" placeholder="e.g. 85" value={weightKg} onChange={e => setWeightKg(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: 10, fontSize: 15, outline: 'none', fontFamily: 'inherit' }} /></div>
            </div>
            {heightCm && weightKg && <div style={{ background: '#f3f4f6', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 14, textAlign: 'center' }}>Your BMI: <strong>{calcBMI().toFixed(1)}</strong><span style={{ marginLeft: 8, color: calcBMI() >= 27.5 ? '#16a34a' : '#ef4444', fontWeight: 500 }}>{calcBMI() >= 27.5 ? '✓ Meets threshold' : '✗ Below 27.5 threshold'}</span></div>}
            <button onClick={submitBMI} style={{ ...bs, width: '100%' }} disabled={!heightCm || !weightKg}>Continue →</button>
          </div>}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 24 }}>Anonymous · Your answers are not stored</p>
      </div>
    </div>
  )
}