'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'



const ResponsiveStyles = () => (
  <style>{`
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .stats-strip { grid-template-columns: 1fr !important; gap: 16px !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
      .meds-grid { grid-template-columns: 1fr !important; }
      .science-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .trust-grid { grid-template-columns: 1fr 1fr !important; }
      .cta-grid { grid-template-columns: 1fr !important; text-align: center !important; }
      .nav-links { display: none !important; }
      .nav-buttons { gap: 6px !important; }
      .nav-buttons a, .nav-buttons a span { font-size: 12px !important; padding: 7px 12px !important; }
      .footer-inner { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
      .mission-text { font-size: 15px !important; }
    }
    @media (max-width: 480px) {
      .trust-grid { grid-template-columns: 1fr !important; }
      .stat-cards-sub { grid-template-columns: 1fr !important; }
    }
  `}</style>
)

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

// WhatsApp number  --  update when AiSensy number is live
const WA_NUMBER = '919999999999'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20GLP-1%20therapy`
const WA_QUIZ_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%20just%20completed%20the%20eligibility%20quiz%20and%20I%27m%20eligible.%20I%27d%20like%20to%20book%20a%20consultation.`

const FAQS = [
  { q: 'Is this safe?', a: 'GLP-1 therapy is prescribed only after a full medical consultation with a licensed endocrinologist. Our doctors screen for contraindications including thyroid conditions, pancreatitis history, and kidney disease. If GLP-1 is not suitable for you, it will not be prescribed.' },
  { q: "What's the difference between branded and generic?", a: 'Generic GLP-1 medications contain the same active ingredient at the same dose as branded versions but cost 60-70% less. Your doctor will discuss both options and recommend based on your goals and budget.' },
  { q: 'What if I am not eligible?', a: 'If the doctor determines GLP-1 therapy is not right for you, you pay nothing. No questions asked, full refund.' },
  { q: 'Is Mumbai the only city for delivery?', a: 'Medication delivery is currently available within Mumbai, Thane, and Navi Mumbai. Teleconsultations are available for anyone across India.' },
  { q: 'How does the WhatsApp consultation work?', a: 'After checking your eligibility, message us on WhatsApp. Our team will verify your quiz answers, connect you with an available endocrinologist, and the doctor will call you directly on WhatsApp for a 30-minute consultation. Everything happens on WhatsApp  --  no app downloads, no login required.' },
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
      
      <ResponsiveStyles />

      {/* Top bar */}
      <div style={{ background: G, color: 'white', textAlign: 'center', padding: '9px 20px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#86efac', display: 'inline-block' }} />
        Doctors available today in Mumbai &nbsp; ÃÂ· &nbsp; GLP-1 consultations on WhatsApp  --  Ã¢ÂÂ¹799
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 90, background: scrolled ? 'rgba(250,250,247,0.97)' : CREAM, borderBottom: `1px solid ${BORDER}`, padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.3s' }}>
        <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: GD }}>GLP<span style={{ color: G }}>Kart</span></div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, color: '#374151' }} className="nav-links">
          <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit' }}>How it works</a>
          <a href="#medication" style={{ textDecoration: 'none', color: 'inherit' }}>Medication</a>
          <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
        </div>
        <div style={{ display: 'flex', gap: 10 }} className="nav-buttons">
          <Link href="/quiz" style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, color: G, border: `1.5px solid ${G}`, textDecoration: 'none', fontWeight: 500 }}>
            Check eligibility
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, background: '#25D366', color: 'white', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat with us
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: DARK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end' }} className="hero-grid">
          {/* Left copy */}
          <div style={{ paddingBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(22,163,74,0.2)', border: '1px solid rgba(134,239,172,0.3)', borderRadius: 999, padding: '5px 14px', fontSize: 12, color: '#86efac', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              India's first GLP-1 telehealth platform
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 4.5vw, 54px)', fontWeight: 700, color: 'white', lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.5px' }}>
              Weight loss<br />that works<br /><span style={{ color: '#4ade80' }}>with your body.</span>
            </h1>
            <p style={{ fontSize: 16, color: FAINT, lineHeight: 1.75, maxWidth: 420, marginBottom: 36 }}>
              GLP-1 therapy works by restoring the hunger hormone your body was always meant to have. Doctor-led, science-backed, delivered to your door.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <Link href="/quiz" style={{ padding: '14px 30px', borderRadius: 10, fontSize: 15, background: G, color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                Check eligibility  --  free
              </Link>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 26px', borderRadius: 10, fontSize: 15, color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              {['Licensed doctors only', 'No app download needed', 'Free if not eligible'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: MUTED }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: G, display: 'inline-block' }} />{t}
                </div>
              ))}
            </div>
          </div>

          {/* Right - stat cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 40 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 24px' }}>
              <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Average weight lost</div>
              <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 700, color: 'white', lineHeight: 1 }}>18<span style={{ fontSize: 20, color: MUTED }}>%</span></div>
              <div style={{ fontSize: 13, color: FAINT, marginTop: 4 }}>body weight over 68 weeks in clinical trials</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 12, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '18%', background: G, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="stat-cards-sub">
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>vs diet alone</div>
                <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1 }}>6xÃÂ</div>
                <div style={{ fontSize: 13, color: FAINT, marginTop: 4 }}>more effective</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>First consult</div>
                <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1 }}>Ã¢ÂÂ¹799</div>
                <div style={{ fontSize: 13, color: FAINT, marginTop: 4 }}>via WhatsApp</div>
              </div>
            </div>
            <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#4ade80" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Eligible patients only</div>
                <div style={{ fontSize: 12, color: MUTED }}>Doctor screens before prescribing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 24 }} className="stats-strip">
            {[{ n: '500+', l: 'Patients on GLP-1' }, { n: '3 min', l: 'To check eligibility' }, { n: '48h', l: 'Consult to delivery' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: '#4ade80' }}>{s.n}</div>
                <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 48px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Your journey</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: INK, lineHeight: 1.15, marginBottom: 12 }}>Four steps. All on WhatsApp.</h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>Everything handled end-to-end. No app, no login, no forms.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="steps-grid">
          {[
            { n: '01', title: 'Take the quiz', body: '3-minute anonymous eligibility check on this website. No signup needed. Find out immediately if GLP-1 could work for you.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" stroke={G} strokeWidth="1.5"/><path d="M7 11h8M11 7v8" stroke={G} strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { n: '02', title: 'Chat on WhatsApp', body: 'Message us on WhatsApp. Our team connects you with an available endocrinologist who calls you for a 30-min consultation.', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill={G}/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z" fill={G}/></svg> },
            { n: '03', title: 'Receive medication', body: 'Licensed GLP-1  --  branded or generic. Prescription shared on WhatsApp. Delivered discreetly in Mumbai within 48 hours.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><ellipse cx="11" cy="11" rx="8" ry="5" stroke={G} strokeWidth="1.5"/><path d="M3 11h16" stroke={G} strokeWidth="1.5"/></svg> },
            { n: '04', title: 'Ongoing on WhatsApp', body: 'Weekly check-ins, injection reminders, dose adjustments, and prescription renewals  --  all managed through WhatsApp.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 16l4-4 3 3 7-7" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map((step, i) => (
            <div key={i} style={{ background: 'white', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '28px 22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: G }} />
              <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 700, color: '#e5e7eb', marginBottom: 14 }}>{step.n}</div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>{step.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{step.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/quiz" style={{ display: 'inline-flex', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>
            Check eligibility  --  free Ã¢ÂÂ
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: '#25D366', color: 'white', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Medication */}
      <div id="medication" style={{ background: DARK2, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Medication</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 700, color: 'white', marginBottom: 48, lineHeight: 1.15 }}>Licensed GLP-1 medication.<br />Branded and generic options.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="meds-grid">
            {[
              { name: 'Semaglutide', type: 'GLP-1 receptor agonist', badge: 'Weekly injection', desc: 'The most studied GLP-1 medication for weight loss. Average 15-18% body weight reduction in clinical trials. Available in branded and generic forms.', feats: ['Once weekly', '0.25mg Ã¢ÂÂ 2.4mg', 'Subcutaneous', 'Prescription only'] },
              { name: 'Tirzepatide', type: 'GLP-1 + GIP dual agonist', badge: 'Dual-action', desc: 'Targets two hunger hormones simultaneously. Newer mechanism showing 20-22% weight reduction  --  the highest of any currently approved medication. Available in branded and generic forms.', feats: ['Once weekly', '2.5mg Ã¢ÂÂ 15mg', 'Subcutaneous', 'Prescription only'] },
            ].map((med, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><ellipse cx="13" cy="13" rx="9" ry="5.5" stroke="#4ade80" strokeWidth="1.5"/><path d="M4 13h18" stroke="#4ade80" strokeWidth="1.5"/></svg>
                  </div>
                  <span style={{ fontSize: 11, background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: 999, fontWeight: 600, border: '1px solid rgba(74,222,128,0.2)' }}>{med.badge}</span>
                </div>
                <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 4 }}>{med.name}</div>
                <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>{med.type}  ÃÂ·  Branded & generic available</div>
                <div style={{ fontSize: 14, color: FAINT, lineHeight: 1.7, marginBottom: 20 }}>{med.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {med.feats.map((f, j) => (
                    <span key={j} style={{ fontSize: 12, color: FAINT, background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)' }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '16px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, fontSize: 13, color: MUTED, textAlign: 'center' }}>
            Your doctor selects the right medication and dose based on your health history, goals, and budget. Generic options reduce cost by 60-70%.
          </div>
        </div>
      </div>

      {/* Science */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="science-grid">
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>The science</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: INK, lineHeight: 1.15, marginBottom: 18 }}>A hormone problem, not a willpower problem.</h2>
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, marginBottom: 14 }}>GLP-1 is the hormone your gut releases after eating to signal fullness to your brain. In many people, this signal is weaker than it should be  --  making appetite feel impossible to control.</p>
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>GLP-1 therapy restores this signal. You feel full sooner. You eat less naturally. Weight loss follows  --  measurably and consistently.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[{ n: '68 weeks', l: 'avg trial duration' }, { n: '2x faster', l: 'vs diet + exercise' }, { n: '85%', l: 'lose >5% body weight' }].map((st, i) => (
                <div key={i} style={{ background: GL, borderRadius: 10, padding: '12px 18px' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: G }}>{st.n}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{st.l}</div>
                </div>
              ))}
            </div>
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

      {/* Trust */}
      <div style={{ background: 'white', padding: '72px 40px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 48px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Why GLPKart</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: INK }}>Built around your safety.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="trust-grid">
            {[
              { title: 'Licensed doctors only', body: 'Every prescription issued by a registered endocrinologist. No auto-prescribing.' },
              { title: 'Everything on WhatsApp', body: 'Consultation, prescription, reminders, and support  --  all in your existing WhatsApp.' },
              { title: 'Branded & generic', body: 'Access to both options. Your doctor recommends based on your budget and goals.' },
              { title: 'Free if not eligible', body: 'If GLP-1 is not right for you, the consultation is free. No questions asked.' },
            ].map((t, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
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


      {/* Mission */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Our mission</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: INK, lineHeight: 1.3, marginBottom: 20 }}>
          Make world-class metabolic care<br />reachable for every Indian.
        </h2>
        <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.85, marginBottom: 24, maxWidth: 640, margin: '0 auto 24px' }}>
          Guided by trusted doctors, backed by genuine medicines, and supported at every step. Because good health is not a privilege  --  it's every Indian's right.
        </p>
        <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: G, letterSpacing: '0.02em' }}>
          Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â¶Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¾Ã Â¤Â¸, Ã Â¤Â¸Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¾, Ã Â¤Â¸Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¾Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¥Ã Â¥ÂÃ Â¤Â¯.
        </p>
      </div>


      {/* Mission */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Our mission</div>
        <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: INK, lineHeight: 1.3, marginBottom: 20 }}>
          Make world-class metabolic care<br />reachable for every Indian.
        </h2>
        <p className="mission-text" style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.85, maxWidth: 640, margin: '0 auto 24px' }}>
          Guided by trusted doctors, backed by genuine medicines, and supported at every step. Because good health is not a privilege â it's every Indian's right.
        </p>
        <p style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: G, letterSpacing: '0.02em' }}>
          à¤µà¤¿à¤¶à¥à¤µà¤¾à¤¸, à¤¸à¥à¤µà¤¾, à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯.
        </p>
      </div>

      {/* WhatsApp CTA section  --  replaces community sign-in wall */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ background: DARK, borderRadius: 24, padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }} className="cta-grid">
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Get started</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 14 }}>Start your journey<br />on WhatsApp.</h2>
            <p style={{ fontSize: 15, color: FAINT, lineHeight: 1.75, maxWidth: 440 }}>Check your eligibility on this page, then message us on WhatsApp. No login, no forms, no app download. A doctor calls you directly.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['No app download', 'Doctor calls you', 'Ã¢ÂÂ¹799 consultation'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: MUTED }}>
                  <span style={{ color: '#4ade80' }}>ÃÂ¢ÃÂÃÂ</span> {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220 }}>
            <Link href="/quiz" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>
              Check eligibility Ã¢ÂÂ
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: '#25D366', color: 'white', textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
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

      {/* Final CTA */}
      <div style={{ background: DARK, padding: '90px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 18 }}>Your body isn't broken.<br />It needs the right signal.</h2>
        <p style={{ fontSize: 16, color: FAINT, marginBottom: 40, lineHeight: 1.75 }}>Check eligibility in 3 minutes. Then message us on WhatsApp  --  a doctor calls you.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quiz" style={{ display: 'inline-flex', padding: '16px 40px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>
            Check eligibility  --  free Ã¢ÂÂ
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: '#25D366', color: 'white', textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.497 3.908 1.371 5.572L0 24l6.621-1.339A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.359-.214-3.728.755.784-3.627-.234-.372A9.818 9.818 0 1112 21.818z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
        <p style={{ fontSize: 12, color: '#4b5563', marginTop: 16 }}>Free if not eligible  ÃÂ·  Licensed doctors only  ÃÂ·  DPDPA 2023 compliant</p>
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0a0a', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }} className="footer-inner">
        <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: 'white' }}>GLP<span style={{ color: G }}>Kart</span></div>
        <div style={{ fontSize: 12, color: '#4b5563' }}>ÃÂ© 2026 Teleswasth Private Limited  ÃÂ·  Mumbai  ÃÂ·  hello@glpkart.com</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'DPDPA'].map(l => <a key={l} href="#" style={{ color: '#4b5563', fontSize: 12, textDecoration: 'none' }}>{l}</a>)}
        </div>
      </div>

    </div>
  )
}
