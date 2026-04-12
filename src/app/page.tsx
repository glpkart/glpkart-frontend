'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const G = '#16a34a'
const GD = '#14532b'
const GL = '#EAF3DE'
const DARK = '#0f1f0f'
const DARK2 = '#111d11'
const CREAM = '#FAFAF7'
const INK = '#1a1a1a'
const MUTED = '#6b7280'
const FAINT = '#9ca3af'
const BORDER = '#e5e7eb'
const SERIF = "'Playfair Display', Georgia, serif"
const SANS = "'DM Sans', -apple-system, sans-serif"

// TODO: Replace with your AiSensy WhatsApp number when live
const WA_NUMBER = '919999999999'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20GLP-1%20therapy`

const FAQS = [
  { q: 'Is this safe?', a: 'GLP-1 therapy is prescribed only after a full medical consultation with a licensed endocrinologist. Our doctors screen for contraindications including thyroid conditions, pancreatitis history, and kidney disease. If GLP-1 is not suitable for you, it will not be prescribed.' },
  { q: "What's the difference between branded and generic?", a: 'Generic GLP-1 medications contain the same active ingredient at the same dose as branded versions but cost 60–70% less. Your doctor will discuss both options and recommend based on your goals and budget.' },
  { q: 'What if I am not eligible?', a: 'If the doctor determines GLP-1 therapy is not right for you, you pay nothing. No questions asked, full refund.' },
  { q: 'Is Mumbai the only city for delivery?', a: 'Medication delivery is currently available within Mumbai, Thane, and Navi Mumbai. Teleconsultations are available for anyone across India.' },
  { q: 'How does the WhatsApp consultation work?', a: 'After checking your eligibility, message us on WhatsApp. Our team will verify your quiz answers, connect you with an available endocrinologist, and the doctor will call you directly on WhatsApp for a 30-minute consultation. Everything happens on WhatsApp — no app downloads, no login required.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: SANS, color: INK, overflowX: 'hidden' }}>
      <div style={{ background: G, color: 'white', textAlign: 'center', padding: '9px 20px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#86efac', display: 'inline-block' }} />
        Doctors available today in Mumbai · GLP-1 consultations on WhatsApp — ₹799
      </div>
      <nav style={{ position: 'sticky', top: 0, zIndex: 90, background: scrolled ? 'rgba(250,250,247,0.97)' : CREAM, borderBottom: `1px solid ${BORDER}`, padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.3s' }}>
        <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: GD }}>GLP<span style={{ color: G }}>Kart</span></div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, color: '#374151' }}>
          <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit' }}>How it works</a>
          <a href="#medication" style={{ textDecoration: 'none', color: 'inherit' }}>Medication</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
          <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/quiz" style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, color: G, border: `1.5px solid ${G}`, textDecoration: 'none', fontWeight: 500 }}>Check eligibility</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, background: '#25D366', color: 'white', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat with us
          </a>
        </div>
      </nav>
      <div style={{ background: DARK, padding: '80px 40px 60px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(22,163,74,0.2)', border: '1px solid rgba(134,239,172,0.3)', borderRadius: 999, padding: '5px 14px', fontSize: 12, color: '#86efac', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />India's first GLP-1 telehealth platform
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, color: 'white', lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.5px' }}>
            Weight loss that works<br /><span style={{ color: '#4ade80' }}>with your body.</span>
          </h1>
          <p style={{ fontSize: 17, color: FAINT, lineHeight: 1.75, maxWidth: 540, margin: '0 auto 40px' }}>
            GLP-1 therapy works by restoring the hunger hormone your body was always meant to have. Doctor-led, science-backed, delivered to your door.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            <Link href="/quiz" style={{ padding: '15px 34px', borderRadius: 10, fontSize: 16, background: G, color: 'white', textDecoration: 'none', fontWeight: 600 }}>Check eligibility — free</Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', borderRadius: 10, fontSize: 16, color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, background: '#25D366' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ n: '18%', l: 'avg weight loss in trials' }, { n: '6×', l: 'more effective than diet alone' }, { n: '₹799', l: 'WhatsApp consultation' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '18px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: '#4ade80' }}>{s.n}</div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="how-it-works" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 48px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Your journey</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: INK, lineHeight: 1.15, marginBottom: 12 }}>Four steps. All on WhatsApp.</h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>No app download. No login. No forms.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: '01', title: 'Take the quiz', body: '3-minute anonymous eligibility check. No signup needed. Instant result.' },
            { n: '02', title: 'Chat on WhatsApp', body: 'Message us. Our team connects you with an available endocrinologist who calls you.' },
            { n: '03', title: 'Receive medication', body: 'Prescription sent on WhatsApp. Medication delivered discreetly in Mumbai in 48h.' },
            { n: '04', title: 'Ongoing support', body: 'Weekly check-ins, injection reminders, dose adjustments — all on WhatsApp.' },
          ].map((step, i) => (
            <div key={i} style={{ background: 'white', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '28px 22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: G }} />
              <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 700, color: '#e5e7eb', marginBottom: 14 }}>{step.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{step.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/quiz" style={{ display: 'inline-flex', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>Check eligibility — free →</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: '#25D366', color: 'white', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div id="medication" style={{ background: DARK2, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Medication</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: 'white', marginBottom: 48, lineHeight: 1.15 }}>Licensed GLP-1 medication.<br />Branded and generic options.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { name: 'Semaglutide', type: 'GLP-1 receptor agonist', badge: 'Weekly injection', desc: 'The most studied GLP-1 medication for weight loss. Average 15–18% body weight reduction in clinical trials.', feats: ['Once weekly', '0.25mg → 2.4mg', 'Prescription only'] },
              { name: 'Tirzepatide', type: 'GLP-1 + GIP dual agonist', badge: 'Dual-action', desc: 'Targets two hunger hormones simultaneously. Showing 20–22% weight reduction — the highest of any currently approved medication.', feats: ['Once weekly', '2.5mg → 15mg', 'Prescription only'] },
            ].map((med, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: 'white' }}>{med.name}</div>
                  <span style={{ fontSize: 11, background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: 999, fontWeight: 600 }}>{med.badge}</span>
                </div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}>{med.type}</div>
                <div style={{ fontSize: 14, color: FAINT, lineHeight: 1.7, marginBottom: 16 }}>{med.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {med.feats.map((f, j) => (<span key={j} style={{ fontSize: 12, color: FAINT, background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)' }}>{f}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>The science</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: INK, lineHeight: 1.15, marginBottom: 18 }}>A hormone problem, not a willpower problem.</h2>
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, marginBottom: 14 }}>GLP-1 is the hormone your gut releases after eating to signal fullness to your brain. In many people, this signal is weaker than it should be.</p>
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>GLP-1 therapy restores this signal. You feel full sooner. You eat less naturally. Weight loss follows — measurably and consistently.</p>
          </div>
          <div style={{ background: GL, borderRadius: 20, padding: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#3B6D11', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>How it works in your body</div>
            {[
              { t: 'Medication injected once weekly', s: 'Subcutaneous, just under the skin' },
              { t: 'GLP-1 receptors activated', s: 'In gut, brain stem, and pancreas' },
              { t: 'Brain receives "full" signal', s: 'Appetite naturally decreases' },
              { t: 'Blood sugar stabilises', s: 'Slower glucose absorption' },
              { t: 'Sustained weight loss', s: 'Consistent and measurable' },
            ].map((step, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: G, color: 'white', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{step.t}</div>
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{step.s}</div>
                  </div>
                </div>
                {i < 4 && <div style={{ width: 1, height: 14, background: '#C0DD97', margin: '3px 0 3px 12px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: 'white', padding: '72px 40px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Why GLPKart</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: INK, marginBottom: 40 }}>Built around your safety.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { title: 'Licensed doctors only', body: 'Every prescription issued by a registered endocrinologist. No auto-prescribing.' },
              { title: 'Everything on WhatsApp', body: 'Consultation, prescription, reminders — all in your existing WhatsApp.' },
              { title: 'Branded & generic', body: 'Your doctor recommends based on your budget and goals.' },
              { title: 'Free if not eligible', body: 'If GLP-1 is not right for you, the consultation is free. No questions asked.' },
            ].map((t, i) => (
              <div key={i} style={{ padding: '24px 16px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: GL, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke={G} strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="pricing" style={{ background: CREAM, padding: '80px 40px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Pricing</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: INK, marginBottom: 10 }}>Honest, simple pricing.</h2>
          <p style={{ fontSize: 15, color: MUTED, marginBottom: 48 }}>Pay per consult. No subscriptions. No lock-in.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ padding: 36, borderRadius: 20, border: `2px solid ${BORDER}`, textAlign: 'left', background: 'white' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Consultation</div>
              <div style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, color: INK, lineHeight: 1 }}>₹799</div>
              <div style={{ fontSize: 13, color: FAINT, margin: '6px 0 24px' }}>per doctor session</div>
              {['30-min WhatsApp call', 'Licensed endocrinologist', 'Digital prescription on WhatsApp', 'Free if not eligible'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#374151', alignItems: 'center' }}><span style={{ color: G, fontWeight: 700 }}>✓</span>{f}</div>
              ))}
            </div>
            <div style={{ padding: 36, borderRadius: 20, border: `2px solid ${G}`, background: GL, textAlign: 'left', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: 20, background: G, color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 999 }}>Most value</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#3B6D11', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Medication (monthly approx)</div>
              <div style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 700, color: INK, lineHeight: 1 }}>₹3,500+</div>
              <div style={{ fontSize: 13, color: MUTED, margin: '6px 0 24px' }}>generic semaglutide, 4-week supply</div>
              {['Generic & branded options', 'Discreet Mumbai delivery', 'Delivered as "GK Healthcare"', 'Prescription required'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13, color: '#374151', alignItems: 'center' }}><span style={{ color: G, fontWeight: 700 }}>✓</span>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="faq" style={{ maxWidth: 680, margin: '0 auto', padding: '80px 40px' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: INK, marginBottom: 40, textAlign: 'center' }}>Questions</h2>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12, fontFamily: SANS }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: INK }}>{faq.q}</span>
              <span style={{ fontSize: 22, color: G, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
            </button>
            {openFaq === i && <div style={{ paddingBottom: 20, fontSize: 14, color: '#4b5563', lineHeight: 1.75 }}>{faq.a}</div>}
          </div>
        ))}
      </div>
      <div style={{ background: DARK, padding: '90px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 18 }}>Your body isn't broken.<br />It needs the right signal.</h2>
        <p style={{ fontSize: 16, color: FAINT, marginBottom: 40, lineHeight: 1.75 }}>Check eligibility in 3 minutes. Then message us on WhatsApp — a doctor calls you.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quiz" style={{ display: 'inline-flex', padding: '16px 40px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>Check eligibility — free →</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: '#25D366', color: 'white', textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
        <p style={{ fontSize: 12, color: '#4b5563', marginTop: 16 }}>Free if not eligible · Licensed doctors only · DPDPA 2023 compliant</p>
      </div>
      <div style={{ background: '#0a0a0a', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: 'white' }}>GLP<span style={{ color: G }}>Kart</span></div>
        <div style={{ fontSize: 12, color: '#4b5563' }}>© 2026 GLPKart · Mumbai · hello@glpkart.com</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'DPDPA'].map(l => <a key={l} href="#" style={{ color: '#4b5563', fontSize: 12, textDecoration: 'none' }}>{l}</a>)}
        </div>
      </div>
    </div>
  )
}