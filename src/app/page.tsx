'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Community', href: '#forum' },
  { label: 'Pricing', href: '#pricing' },
]

const STATS = [
  { value: '18%', label: 'Average body weight lost' },
  { value: '6×', label: 'More than diet alone' },
  { value: '₹799', label: 'To see a specialist doctor' },
]

const STEPS = [
  { n: '01', title: 'Check eligibility', body: 'A 3-minute anonymous quiz. No signup, no judgment. You\'ll know immediately if GLP-1 therapy is right for you.' },
  { n: '02', title: 'Consult a specialist', body: 'Book a WhatsApp call with an endocrinologist who understands GLP-1. They review your history, ask the right questions, prescribe if suitable.' },
  { n: '03', title: 'Receive licensed medication', body: 'Authentic Ozempic or Mounjaro — not compounded, not grey market. Delivered discreetly to your door in Mumbai.' },
  { n: '04', title: 'Journey with community', body: 'Track your progress, log injections, and join an anonymous community of people on the same path. Real stories, no shame.' },
]

const FAQS = [
  { q: 'Is this safe?', a: 'GLP-1 medications (Ozempic, Mounjaro) are approved globally and prescribed by our registered endocrinologists. They are not suitable for everyone — the consultation exists precisely to screen for contraindications.' },
  { q: 'What medications do you use?', a: 'Only branded, licensed medications from Novo Nordisk (Ozempic) and Eli Lilly (Mounjaro). We do not use compounded semaglutide.' },
  { q: 'What if I\'m not eligible?', a: 'If the doctor decides GLP-1 isn\'t suitable for you, you pay nothing. No questions asked.' },
  { q: 'Is Mumbai the only city?', a: 'We\'re starting with Mumbai for delivery. Teleconsultations work for anyone in India.' },
  { q: 'Is my data private?', a: 'Your forum posts are fully anonymous using a generated persona. Your medical data is stored encrypted and never shared without consent, in compliance with DPDPA 2023.' },
]

const FORUM_PREVIEWS = [
  { persona: 'QuietRiver_42', topic: 'Side effects', body: 'Week 3 on 0.25mg — nausea mostly gone by day 5. Eating so much less without even trying. Down 2.1kg already.', replies: 14, time: '2h ago' },
  { persona: 'MapleDawn_18', topic: 'Success', body: 'Hit 10kg down today. 11 weeks. I wore a dress I haven\'t touched in 4 years. Just wanted to share this somewhere safe.', replies: 47, time: '5h ago', doctor: true },
  { persona: 'EmberPath_67', topic: 'Dosing', body: 'Dr said to step up to 0.5mg next week. Nervous about it. Anyone else felt more nausea at the higher dose?', replies: 9, time: '8h ago' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sticky eligibility bar */}
      <div style={{ background: 'var(--brand)', color: 'white', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 13, fontWeight: 500, position: 'sticky', top: 0, zIndex: 100 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#86efac', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
        Doctors available today in Mumbai
        <Link href="/quiz" style={{ color: 'white', textDecoration: 'underline', marginLeft: 8 }}>Check if you qualify — free →</Link>
      </div>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 37, zIndex: 90,
        background: scrolled ? 'rgba(250,250,247,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e5e7eb' : 'none',
        padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s'
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--brand-dark)' }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#374151' }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#374151')}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/login" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'var(--brand)', border: '1.5px solid var(--brand)', textDecoration: 'none', transition: 'all 0.2s' }}>Log in</Link>
          <Link href="/quiz" style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, background: 'var(--brand)', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 40px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#dcfce9', border: '1px solid #86efac', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: '#15803c', fontWeight: 500, marginBottom: 32 }}>
          <span>India's first GLP-1 telehealth platform</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 700, lineHeight: 1.1, color: '#1a1a1a', marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          Your body isn't<br />
          <span style={{ color: 'var(--brand)' }}>failing you.</span><br />
          Your diet plan was.
        </h1>
        <p style={{ fontSize: 18, color: '#4b5563', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          GLP-1 medications work by fixing the hormone that controls hunger — not by willpower. Doctor consultation, licensed medication, anonymous community support.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quiz" className="btn-primary" style={{ fontSize: 16, padding: '14px 36px', borderRadius: 12 }}>
            Check your eligibility — free
          </Link>
          <a href="#how" className="btn-outline" style={{ fontSize: 16, padding: '14px 36px', borderRadius: 12 }}>
            How it works
          </a>
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: '#9ca3af' }}>
          No payment until you see a doctor. If you're not eligible, you pay nothing.
        </p>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', borderTop: '1px solid #f0f0eb', borderBottom: '1px solid #f0f0eb', padding: '40px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.value}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: 'var(--brand)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: '#6b7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Science section */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>The science</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: '#1a1a1a', marginBottom: 24 }}>
              It's a hormone problem, not a willpower problem.
            </h2>
            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 20 }}>
              GLP-1 (glucagon-like peptide-1) is a hormone your gut releases after eating. It tells your brain you're full and slows digestion. In many people, this signal is weaker than it should be.
            </p>
            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8 }}>
              GLP-1 receptor agonists like semaglutide (Ozempic) and tirzepatide (Mounjaro) mimic this hormone. The hunger signal works the way it was supposed to — and weight loss follows.
            </p>
          </div>
          <div style={{ background: '#f0fdf6', borderRadius: 20, padding: 40 }}>
            {[
              { step: 'Medication injected', detail: 'Once weekly, subcutaneous' },
              { step: 'GLP-1 receptors activated', detail: 'In gut, brain, and pancreas' },
              { step: 'Hunger signal normalised', detail: 'You feel full sooner, eat less' },
              { step: 'Blood sugar stabilised', detail: 'Slower glucose absorption' },
              { step: 'Sustained weight loss', detail: '18% avg over 68 weeks in trials' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 4 ? 20 : 0, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0, marginTop: 2 }}>{i+1}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{item.step}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ background: '#1a2e1a', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: 'white' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: 'var(--brand)', fontWeight: 700, marginBottom: 16, opacity: 0.7 }}>{s.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum preview */}
      <section id="forum" style={{ maxWidth: 1080, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Community</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: '#1a1a1a', marginBottom: 24 }}>You're not doing this alone.</h2>
            <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8, marginBottom: 24 }}>
              India has very few places to talk honestly about weight. Our anonymous forum is one of them. Real experiences, zero judgment, no real names ever.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['Fully anonymous — generated persona only', 'Doctor-verified replies highlighted', 'No direct messages, no profiles', 'Mumbai-focused, India-aware'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: '#374151' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#dcfce9', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/forum" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--brand)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
              Read the community →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FORUM_PREVIEWS.map((p, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0fdf6', border: '1.5px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--brand)' }}>
                    {p.persona[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{p.persona}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{p.time}</div>
                  </div>
                  {p.doctor && <span style={{ marginLeft: 'auto', fontSize: 10, background: '#dcfce9', color: '#15803c', padding: '2px 8px', borderRadius: 999, fontWeight: 600 }}>Doctor replied</span>}
                  <span style={{ marginLeft: p.doctor ? 0 : 'auto', fontSize: 10, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 999 }}>{p.topic}</span>
                </div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, marginBottom: 10 }}>{p.body}</p>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{p.replies} replies</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: 'white', padding: '80px 40px', borderTop: '1px solid #f0f0eb' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Simple, honest pricing</h2>
          <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 48 }}>Pay per consult. No subscriptions, no lock-ins.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ padding: 36, borderRadius: 20, border: '2px solid #e5e7eb', textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>Consultation</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>₹799</div>
              <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>per doctor session</div>
              {['30-min WhatsApp call', 'Licensed endocrinologist', 'Digital prescription', 'Free if not eligible'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 14, color: '#374151', alignItems: 'center' }}>
                  <span style={{ color: 'var(--brand)' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <div style={{ padding: 36, borderRadius: 20, border: '2px solid var(--brand)', background: '#f0fdf6', textAlign: 'left', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: 24, background: 'var(--brand)', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 999 }}>Most value</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>Medication (approx)</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>₹4,500</div>
              <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>4-week supply Ozempic 0.25mg</div>
              {['Authentic branded medication', 'Discreet Mumbai delivery', 'Delivered as "GK Healthcare"', 'Prescription required'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 14, color: '#374151', alignItems: 'center' }}>
                  <span style={{ color: 'var(--brand)' }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#1a1a1a', marginBottom: 40, textAlign: 'center' }}>Questions</h2>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #e5e7eb', marginBottom: 0 }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a' }}>{faq.q}</span>
              <span style={{ fontSize: 20, color: 'var(--brand)', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {openFaq === i && (
              <div style={{ paddingBottom: 20, fontSize: 15, color: '#4b5563', lineHeight: 1.7 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 24 }}>
            Your body isn't broken.<br />It just needs the right support.
          </h2>
          <p style={{ fontSize: 16, color: '#9ca3af', marginBottom: 40, lineHeight: 1.7 }}>
            Check if you're eligible in 3 minutes. Anonymous. No commitment. No payment until you meet a doctor.
          </p>
          <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--brand)', color: 'white', padding: '16px 40px', borderRadius: 12, fontSize: 16, fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>
            Check eligibility — free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111', padding: '40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'white' }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          © 2026 GLPKart · Mumbai, India · hello@glpkart.com
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
          {['Privacy', 'Terms', 'DPDPA Notice'].map(l => (
            <a key={l} href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}
