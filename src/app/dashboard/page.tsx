'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { journeyApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

interface DashboardData {
  profile: {
    fullName: string
    currentWeightKg: number
    startWeightKg: number
    goalWeightKg: number
    totalLostKg: number
    weekNumber: number
    assignedDoctor: string
  }
  weightLogs: { date: string; weightKg: number }[]
  nextInjection: { medicineName: string; doseMg: number; dueAt: string } | null
  nextConsult: { scheduledAt: string; doctorName: string } | null
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoggedIn } = useAuthStore()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [weightInput, setWeightInput] = useState('')
  const [logging, setLogging] = useState(false)
  const [logSuccess, setLogSuccess] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login?next=dashboard'); return }
    journeyApi.getDashboard()
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function logWeight() {
    if (!weightInput) return
    setLogging(true)
    try {
      await journeyApi.logWeight(parseFloat(weightInput))
      setLogSuccess(true)
      setWeightInput('')
      const r = await journeyApi.getDashboard()
      setData(r.data)
      setTimeout(() => setLogSuccess(false), 3000)
    } catch {}
    setLogging(false)
  }

  function handleLogout() {
    logout()
    router.push('/')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center', color: '#6b7280' }}>Loading your dashboard...</div>
    </div>
  )

  const profile = data?.profile
  const lostPct = profile && profile.startWeightKg > 0
    ? Math.round((profile.totalLostKg / profile.startWeightKg) * 100 * 10) / 10
    : 0
  const toGoalKg = profile && profile.goalWeightKg
    ? Math.max(0, profile.currentWeightKg - profile.goalWeightKg)
    : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--brand-dark)' }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <Link href="/dashboard" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/book" style={{ color: '#6b7280', textDecoration: 'none' }}>Book consult</Link>
          <Link href="/forum" style={{ color: '#6b7280', textDecoration: 'none' }}>Community</Link>
        </div>
        <button onClick={handleLogout} style={{ fontSize: 13, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>Sign out</button>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
            {profile?.fullName ? `Welcome back, ${profile.fullName.split(' ')[0]}.` : 'Your dashboard'}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280' }}>
            Week {profile?.weekNumber || '—'} of your GLP-1 journey
            {profile?.assignedDoctor && ` · Dr. ${profile.assignedDoctor}`}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Current weight', value: profile ? `${profile.currentWeightKg} kg` : '—', sub: `Started at ${profile?.startWeightKg || '—'} kg` },
            { label: 'Total lost', value: profile ? `${profile.totalLostKg} kg` : '—', sub: `${lostPct}% of starting weight` },
            { label: 'To goal', value: toGoalKg !== null ? `${toGoalKg} kg` : '—', sub: 'Keep going' },
            { label: 'Week', value: `#${profile?.weekNumber || '—'}`, sub: 'On GLP-1 therapy' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: i === 1 ? 'var(--brand)' : '#1a1a1a', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {/* Weight chart */}
          <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 20 }}>Weight trend</h3>
            {data?.weightLogs && data.weightLogs.length > 1 ? (
              <div style={{ position: 'relative', height: 120 }}>
                {/* Simple sparkline */}
                <svg width="100%" height="120" viewBox={`0 0 300 120`} preserveAspectRatio="none">
                  {(() => {
                    const logs = data.weightLogs.slice(-14)
                    const min = Math.min(...logs.map(l => l.weightKg))
                    const max = Math.max(...logs.map(l => l.weightKg))
                    const range = max - min || 1
                    const pts = logs.map((l, i) => {
                      const x = (i / (logs.length - 1)) * 280 + 10
                      const y = 110 - ((l.weightKg - min) / range) * 100
                      return `${x},${y}`
                    }).join(' ')
                    return (
                      <>
                        <polyline points={pts} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {logs.map((l, i) => {
                          const x = (i / (logs.length - 1)) * 280 + 10
                          const y = 110 - ((l.weightKg - min) / range) * 100
                          return <circle key={i} cx={x} cy={y} r="3" fill="#16a34a" />
                        })}
                      </>
                    )
                  })()}
                </svg>
              </div>
            ) : (
              <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
                Log your weight to see the trend
              </div>
            )}

            {/* Log weight */}
            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              <input
                type="number" placeholder="Today's weight (kg)" value={weightInput}
                onChange={e => setWeightInput(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              />
              <button onClick={logWeight} disabled={logging || !weightInput} style={{ padding: '10px 18px', background: 'var(--brand)', color: 'white', borderRadius: 8, border: 'none', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                {logging ? '...' : 'Log'}
              </button>
            </div>
            {logSuccess && <p style={{ fontSize: 12, color: 'var(--brand)', marginTop: 8 }}>✓ Weight logged</p>}
          </div>

          {/* Next steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Next injection */}
            <div style={{ background: data?.nextInjection ? '#f0fdf6' : 'white', borderRadius: 14, padding: 24, border: `1px solid ${data?.nextInjection ? '#bbf7d2' : '#e5e7eb'}`, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: data?.nextInjection ? 'var(--brand)' : '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next injection</div>
              {data?.nextInjection ? (
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
                    {data.nextInjection.medicineName} {data.nextInjection.doseMg}mg
                  </div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    Due: {new Date(data.nextInjection.dueAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: 14, color: '#9ca3af' }}>No injection scheduled yet. Your doctor will set this after consultation.</p>
              )}
            </div>

            {/* Next consult */}
            <div style={{ background: data?.nextConsult ? '#eff6ff' : 'white', borderRadius: 14, padding: 24, border: `1px solid ${data?.nextConsult ? '#bfdbfe' : '#e5e7eb'}`, flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: data?.nextConsult ? '#1d4ed8' : '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next consultation</div>
              {data?.nextConsult ? (
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
                    Dr. {data.nextConsult.doctorName}
                  </div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    {new Date(data.nextConsult.scheduledAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>No upcoming consultation</p>
                  <Link href="/book" style={{ fontSize: 13, fontWeight: 500, color: '#1d4ed8', textDecoration: 'none' }}>Book a consultation →</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Book consultation', desc: '₹799 · 30 min with a doctor', href: '/book', color: 'var(--brand)' },
            { label: 'Community forum', desc: 'Anonymous discussion & support', href: '/forum', color: '#7c3aed' },
            { label: 'My prescriptions', desc: 'View and download your Rx', href: '/prescriptions', color: '#0891b2' },
          ].map(a => (
            <Link key={a.label} href={a.href} style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e5e7eb', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{a.label}</div>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>{a.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
