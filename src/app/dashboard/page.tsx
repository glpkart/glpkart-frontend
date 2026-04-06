'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { journeyApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

// ─── Types matching backend /journey/dashboard response exactly ───────────────
interface WeightLog { date: string; weightKg: number }
interface NextInjection { medicineName: string; doseMg: number; dueAt: string }
interface NextConsult { scheduledAt: string; doctorName: string }
interface Profile {
  fullName: string | null
  currentWeightKg: number | null
  startWeightKg: number | null
  goalWeightKg: number | null
  totalLostKg: number
  weekNumber: number
  assignedDoctor: string | null
}
interface DashboardData {
  profile: Profile
  weightLogs: WeightLog[]
  nextInjection: NextInjection | null
  nextConsult: NextConsult | null
}

// ─── Constants ────────────────────────────────────────────────────────────────
const G = '#16a34a'
const GL = '#EAF3DE'
const GD = '#14532b'
const BORDER = '#e5e7eb'
const MUTED = '#6b7280'
const FAINT = '#9ca3af'
const INK = '#1a1a1a'
const SANS = "'DM Sans', -apple-system, sans-serif"
const SERIF = "'Playfair Display', Georgia, serif"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

// ─── Mini sparkline SVG ───────────────────────────────────────────────────────
function WeightSparkline({ logs }: { logs: WeightLog[] }) {
  if (logs.length < 2) return null
  const vals = logs.map(l => l.weightKg)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const w = 280, h = 60, pad = 4
  const points = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const trend = vals[vals.length - 1] < vals[0]
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={trend ? G : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {vals.map((v, i) => {
        const x = pad + (i / (vals.length - 1)) * (w - pad * 2)
        const y = h - pad - ((v - min) / range) * (h - pad * 2)
        return i === vals.length - 1
          ? <circle key={i} cx={x} cy={y} r="3.5" fill={trend ? G : '#ef4444'} />
          : null
      })}
    </svg>
  )
}

// ─── Weight log modal ─────────────────────────────────────────────────────────
function LogWeightModal({ onClose, onLogged }: { onClose: () => void; onLogged: () => void }) {
  const [weight, setWeight] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    const kg = parseFloat(weight)
    if (isNaN(kg) || kg < 20 || kg > 300) { setError('Enter a valid weight (20–300 kg)'); return }
    setLoading(true); setError('')
    try {
      await journeyApi.logWeight(kg)
      onLogged()
      onClose()
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to log weight. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, fontFamily: SANS }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 32, width: 360, border: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: INK }}>Log today's weight</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: FAINT }}>×</button>
        </div>
        <div style={{ display: 'flex', border: `2px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
          <input
            type="number"
            placeholder="e.g. 82.5"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            autoFocus
            style={{ flex: 1, padding: '12px 16px', border: 'none', outline: 'none', fontSize: 20, fontFamily: SANS }}
          />
          <div style={{ padding: '12px 16px', background: '#f9fafb', color: MUTED, fontSize: 15, borderLeft: `2px solid ${BORDER}`, display: 'flex', alignItems: 'center' }}>kg</div>
        </div>
        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button
          onClick={submit}
          disabled={loading || !weight}
          style={{ width: '100%', padding: '12px', background: G, color: 'white', borderRadius: 10, fontSize: 15, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: SANS, opacity: !weight ? 0.6 : 1 }}
        >
          {loading ? 'Logging...' : 'Log weight'}
        </button>
      </div>
    </div>
  )
}

// ─── Metric card ──────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{ background: accent ? GL : 'white', borderRadius: 14, padding: '20px 22px', border: `1px solid ${accent ? '#C0DD97' : BORDER}` }}>
      <div style={{ fontSize: 12, color: accent ? '#3B6D11' : MUTED, marginBottom: 6, fontWeight: 500 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: accent ? G : INK, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? '#639922' : FAINT, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// ─── Empty state (new user, no profile yet) ───────────────────────────────────
function NewUserState({ user }: { user: any }) {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '60px 24px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: GL, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="6" stroke={G} strokeWidth="2"/><path d="M6 27c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={G} strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <h2 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 700, color: INK, marginBottom: 10 }}>
        Welcome to GLPKart{user?.forumPersona ? `, ${user.forumPersona}` : ''}
      </h2>
      <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, marginBottom: 32 }}>
        Your account is set up. The next step is booking a consultation with one of our doctors — they'll assess your eligibility, prescribe the right medication, and set your treatment plan.
      </p>
      <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 14, padding: 24, marginBottom: 28, textAlign: 'left' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3B6D11', marginBottom: 12 }}>What happens next</div>
        {[
          'Book a 30-min WhatsApp consultation (₹799)',
          'Doctor reviews your history and prescribes',
          'Medication delivered within 48 hours',
          'Track weight and injections on your dashboard',
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#374151', alignItems: 'center' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: G, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
            {s}
          </div>
        ))}
      </div>
      <Link href="/book" style={{ display: 'inline-flex', padding: '14px 36px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>
        Book consultation — ₹799 →
      </Link>
      <p style={{ fontSize: 12, color: FAINT, marginTop: 12 }}>Free if the doctor finds GLP-1 isn't suitable for you</p>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter()
  const { user, token, isLoggedIn, logout } = useAuthStore()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showLogWeight, setShowLogWeight] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login?next=dashboard'); return }
    loadDashboard()
  }, [])

  async function loadDashboard() {
    setLoading(true); setError('')
    try {
      const res = await journeyApi.getDashboard()
      setData(res.data)
    } catch (e: any) {
      // 404 means profile doesn't exist yet — new user state
      if (e.response?.status === 404) {
        setData(null)
      } else {
        setError('Failed to load dashboard.')
      }
    }
    setLoading(false)
  }

  function handleLogout() { logout(); router.push('/') }

  // ─── Nav ────────────────────────────────────────────────────────────────────
  const Nav = (
    <nav style={{ background: 'white', borderBottom: `1px solid ${BORDER}`, padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: SANS }}>
      <Link href="/" style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: GD, textDecoration: 'none' }}>
        GLP<span style={{ color: G }}>Kart</span>
      </Link>
      <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
        <Link href="/dashboard" style={{ color: G, fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
        <Link href="/forum" style={{ color: MUTED, textDecoration: 'none' }}>Community</Link>
        <Link href="/book" style={{ color: MUTED, textDecoration: 'none' }}>Book consult</Link>
      </div>
      <button onClick={handleLogout} style={{ fontSize: 13, color: FAINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
        Sign out
      </button>
    </nav>
  )

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 58px)', color: FAINT, fontSize: 15 }}>
        Loading your dashboard…
      </div>
    </div>
  )

  // ─── Error ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 58px)', flexDirection: 'column', gap: 12 }}>
        <p style={{ color: '#ef4444', fontSize: 15 }}>{error}</p>
        <button onClick={loadDashboard} style={{ padding: '8px 20px', background: G, color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: SANS }}>Retry</button>
      </div>
    </div>
  )

  // ─── New user — no profile yet ──────────────────────────────────────────────
  if (!data) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <NewUserState user={user} />
    </div>
  )

  const { profile, weightLogs, nextInjection, nextConsult } = data
  const hasData = weightLogs.length > 0 || nextInjection || nextConsult

  // ─── Full dashboard ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}

      {showLogWeight && (
        <LogWeightModal onClose={() => setShowLogWeight(false)} onLogged={loadDashboard} />
      )}

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: INK, marginBottom: 4 }}>
              {profile.fullName ? `Hi, ${profile.fullName.split(' ')[0]}` : 'Your dashboard'}
            </h1>
            <p style={{ fontSize: 14, color: MUTED }}>
              {profile.weekNumber > 0 ? `Week ${profile.weekNumber} of treatment` : 'Track your progress here'}
              {profile.assignedDoctor && ` · Dr. ${profile.assignedDoctor}`}
            </p>
          </div>
          <button
            onClick={() => setShowLogWeight(true)}
            style={{ padding: '9px 20px', background: G, color: 'white', borderRadius: 9, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: SANS }}
          >
            + Log weight
          </button>
        </div>

        {/* If new user with profile but no data yet */}
        {!hasData && (
          <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 14, padding: '20px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#3B6D11' }}>Ready to start your journey?</div>
              <div style={{ fontSize: 13, color: '#639922', marginTop: 3 }}>Book a consultation to get your prescription and begin treatment.</div>
            </div>
            <Link href="/book" style={{ padding: '10px 22px', background: G, color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Book consult →
            </Link>
          </div>
        )}

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          <MetricCard
            label="Current weight"
            value={profile.currentWeightKg ? `${profile.currentWeightKg} kg` : '—'}
            sub={profile.startWeightKg ? `Started at ${profile.startWeightKg} kg` : 'Not recorded yet'}
            accent={!!profile.currentWeightKg}
          />
          <MetricCard
            label="Total lost"
            value={profile.totalLostKg > 0 ? `${profile.totalLostKg.toFixed(1)} kg` : '—'}
            sub={profile.goalWeightKg ? `Goal: ${profile.goalWeightKg} kg` : 'Set a goal with your doctor'}
          />
          <MetricCard
            label="Week"
            value={profile.weekNumber > 0 ? `#${profile.weekNumber}` : '—'}
            sub={profile.weekNumber > 0 ? 'of treatment' : 'Not started yet'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

          {/* Weight chart */}
          <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', border: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Weight over time</div>
              <button
                onClick={() => setShowLogWeight(true)}
                style={{ fontSize: 12, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS, fontWeight: 500 }}
              >
                + Log
              </button>
            </div>
            {weightLogs.length >= 2 ? (
              <>
                <WeightSparkline logs={weightLogs} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: FAINT }}>
                  <span>{formatDate(weightLogs[0].date)}</span>
                  <span>{formatDate(weightLogs[weightLogs.length - 1].date)}</span>
                </div>
              </>
            ) : weightLogs.length === 1 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: MUTED, fontSize: 14 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: G, fontFamily: SERIF, marginBottom: 4 }}>{weightLogs[0].weightKg} kg</div>
                <div style={{ fontSize: 13, color: FAINT }}>Log more entries to see your trend</div>
              </div>
            ) : (
              <div style={{ padding: '28px 0', textAlign: 'center', color: FAINT, fontSize: 14 }}>
                <div style={{ marginBottom: 12 }}>No weight logs yet</div>
                <button onClick={() => setShowLogWeight(true)} style={{ fontSize: 13, color: G, background: GL, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: SANS, fontWeight: 500 }}>
                  Log your first weight
                </button>
              </div>
            )}
          </div>

          {/* Next up — injection + consult */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Next injection */}
            <div style={{ background: 'white', borderRadius: 14, padding: '20px 22px', border: `1px solid ${BORDER}`, flex: 1 }}>
              <div style={{ fontSize: 13, color: MUTED, fontWeight: 500, marginBottom: 10 }}>Next injection</div>
              {nextInjection ? (
                <>
                  <div style={{ fontSize: 17, fontWeight: 600, color: INK, marginBottom: 4 }}>{nextInjection.medicineName}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 8 }}>{nextInjection.doseMg} mg</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: GL, borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600, color: '#3B6D11' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={G} strokeWidth="1.2"/><path d="M6 3.5v3l1.5 1.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/></svg>
                    {daysUntil(nextInjection.dueAt)} · {formatDate(nextInjection.dueAt)}
                  </div>
                </>
              ) : (
                <div style={{ color: FAINT, fontSize: 14, paddingTop: 4 }}>
                  No injections scheduled yet.<br />
                  <span style={{ fontSize: 13 }}>Your doctor sets this after consultation.</span>
                </div>
              )}
            </div>

            {/* Next consultation */}
            <div style={{ background: 'white', borderRadius: 14, padding: '20px 22px', border: `1px solid ${BORDER}`, flex: 1 }}>
              <div style={{ fontSize: 13, color: MUTED, fontWeight: 500, marginBottom: 10 }}>Next consultation</div>
              {nextConsult ? (
                <>
                  <div style={{ fontSize: 17, fontWeight: 600, color: INK, marginBottom: 8 }}>{nextConsult.doctorName}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dbeafe', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600, color: '#1d4ed8' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#1d4ed8" strokeWidth="1.2"/><path d="M6 3.5v3l1.5 1.5" stroke="#1d4ed8" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    Doctor will call you on WhatsApp soon
                  </div>
                </>
              ) : (
                <div>
                  <div style={{ color: FAINT, fontSize: 14, marginBottom: 12 }}>No consultation booked.</div>
                  <Link href="/book" style={{ display: 'inline-flex', padding: '8px 18px', background: G, color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                    Book now →
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 14 }}>
          {[
            { href: '/book', label: 'Book a consultation', sub: 'Instant · WhatsApp call', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke={G} strokeWidth="1.4"/><path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={G} strokeWidth="1.4" strokeLinecap="round"/></svg> },
            { href: '/forum', label: 'Community forum', sub: 'Anonymous · peer support', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 3h14v10H9l-4 3v-3H2V3z" stroke={G} strokeWidth="1.4" strokeLinejoin="round"/></svg> },
            { href: '/quiz', label: 'Eligibility quiz', sub: 'Check or recheck', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2.5" stroke={G} strokeWidth="1.4"/><path d="M6 9h6M9 6v6" stroke={G} strokeWidth="1.4" strokeLinecap="round"/></svg> },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ background: 'white', borderRadius: 12, padding: '16px 18px', border: `1px solid ${BORDER}`, textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: GL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 12, color: FAINT, marginTop: 2 }}>{item.sub}</div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
