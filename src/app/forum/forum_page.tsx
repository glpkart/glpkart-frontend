'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { forumApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const G = '#16a34a'
const GL = '#EAF3DE'
const BORDER = '#e5e7eb'
const MUTED = '#6b7280'
const FAINT = '#9ca3af'
const SANS = "'DM Sans', -apple-system, sans-serif"
const SERIF = "'Playfair Display', Georgia, serif"

const TOPIC_LABELS: Record<string, string> = {
  All: 'All posts', SIDE_EFFECTS: 'Side effects', FOOD_AND_EATING: 'Food & eating',
  SUCCESS_STORIES: 'Success stories', DOSING_QUESTIONS: 'Dosing', MENTAL_HEALTH: 'Mental health',
  DOCTOR_ADVICE: 'Doctor advice', OTHER: 'Other',
}
const TOPICS = Object.keys(TOPIC_LABELS)
const TOPIC_COLORS: Record<string, string> = {
  SIDE_EFFECTS: '#fef9c3', FOOD_AND_EATING: '#dcfce9', SUCCESS_STORIES: '#dbeafe',
  DOSING_QUESTIONS: '#fce7f3', MENTAL_HEALTH: '#ede9fe', DOCTOR_ADVICE: '#ffedd5', OTHER: '#f3f4f6',
}

interface Post {
  id: string; personaName: string; title: string; body: string; topic: string
  isDoctorPost: boolean; helpfulCount: number; createdAt: string; _count?: { replies: number }
}

export default function ForumPage() {
  const router = useRouter()
  const { isLoggedIn, canAccessForum, user, logout } = useAuthStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [topic, setTopic] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newTopic, setNewTopic] = useState('OTHER')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Not logged in → go to login
    if (!isLoggedIn()) { router.push('/login?next=forum'); return }
    // Logged in but no consultation → show locked state, don't redirect
    if (!canAccessForum()) { setLoading(false); return }
    loadPosts()
  }, [topic])

  async function loadPosts() {
    setLoading(true)
    try {
      const res = await forumApi.getPosts(topic === 'All' ? undefined : topic)
      setPosts(res.data.posts)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function submitPost() {
    if (!newTitle.trim() || !newBody.trim()) { setError('Please fill in both fields'); return }
    setSubmitting(true); setError('')
    try {
      await forumApi.createPost({ title: newTitle, body: newBody, topic: newTopic })
      setShowNew(false); setNewTitle(''); setNewBody('')
      await loadPosts()
    } catch (err: any) { setError(err.response?.data?.error || 'Failed to post.') }
    setSubmitting(false)
  }

  async function markHelpful(postId: string) {
    try {
      await forumApi.markHelpful(postId)
      setPosts(posts.map(p => p.id === postId ? { ...p, helpfulCount: p.helpfulCount + 1 } : p))
    } catch (e) { console.error(e) }
  }

  function timeAgo(date: string) {
    const h = Math.floor((Date.now() - new Date(date).getTime()) / 3600000)
    if (h < 1) return 'Just now'
    if (h < 24) return h + 'h ago'
    return Math.floor(h / 24) + 'd ago'
  }

  function topicBtnStyle(t: string): React.CSSProperties {
    const active = topic === t
    return { padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: SANS, background: active ? G : 'white', color: active ? 'white' : MUTED, border: active ? `1px solid ${G}` : `1px solid ${BORDER}` }
  }

  // Nav (shared for both locked and unlocked states)
  const Nav = (
    <nav style={{ background: 'white', borderBottom: `1px solid ${BORDER}`, padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: '#14532b', textDecoration: 'none' }}>GLP<span style={{ color: G }}>Kart</span></Link>
      <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
        <Link href="/dashboard" style={{ color: MUTED, textDecoration: 'none' }}>Dashboard</Link>
        <Link href="/forum" style={{ color: G, fontWeight: 600, textDecoration: 'none' }}>Community</Link>
        <Link href="/book" style={{ color: MUTED, textDecoration: 'none' }}>Book consult</Link>
      </div>
      <button onClick={() => { logout(); router.push('/') }} style={{ fontSize: 13, color: FAINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: SANS }}>Sign out</button>
    </nav>
  )

  // LOCKED STATE — logged in but no consultation yet
  if (isLoggedIn() && !canAccessForum()) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
        {Nav}
        <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: GL, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="13" width="20" height="13" rx="2" stroke={G} strokeWidth="1.5"/><path d="M9 13V9a5 5 0 0110 0v4" stroke={G} strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Community unlocks after treatment starts</h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, marginBottom: 32 }}>
            The forum is available to patients who have completed their first consultation. This keeps the community genuine and medically grounded — real experiences from people actually on treatment.
          </p>
          <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 14, padding: 24, marginBottom: 24, textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#3B6D11', marginBottom: 12 }}>How to unlock</div>
            {['Book a consultation (₹799)', 'Complete your WhatsApp call with the doctor', 'Receive your prescription', 'Forum access is granted automatically'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#374151', marginBottom: 8, alignItems: 'center' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: G, color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                {step}
              </div>
            ))}
          </div>
          <Link href="/book" style={{ display: 'inline-flex', padding: '13px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600, background: G, color: 'white', textDecoration: 'none' }}>
            Book a consultation →
          </Link>
          <p style={{ fontSize: 12, color: FAINT, marginTop: 12 }}>₹799 · Free if not eligible</p>
        </div>
      </div>
    )
  }

  // UNLOCKED — logged in with consultation
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF7', fontFamily: SANS }}>
      {Nav}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Community</h1>
            <p style={{ fontSize: 14, color: MUTED }}>Anonymous, honest conversations. Your real name is never shown.</p>
          </div>
          <button onClick={() => setShowNew(true)} style={{ padding: '9px 20px', background: G, color: 'white', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: SANS, marginTop: 4 }}>
            New post
          </button>
        </div>

        <div style={{ background: GL, border: '1px solid #C0DD97', borderRadius: 10, padding: '10px 16px', marginBottom: 24, fontSize: 13, color: '#15803c', display: 'flex', gap: 8, alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1" stroke="#15803c" strokeWidth="1.2"/><path d="M4 6V4a3 3 0 016 0v2" stroke="#15803c" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Fully anonymous. Posts appear as {user?.forumPersona || 'your generated persona'} only.
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {TOPICS.map(t => <button key={t} onClick={() => setTopic(t)} style={topicBtnStyle(t)}>{TOPIC_LABELS[t]}</button>)}
        </div>

        {showNew && (
          <div style={{ background: 'white', borderRadius: 14, padding: 28, border: `1px solid ${BORDER}`, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>Share your experience</h3>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: FAINT }}>×</button>
            </div>
            <select value={newTopic} onChange={e => setNewTopic(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: SANS }}>
              {TOPICS.filter(t => t !== 'All').map(t => <option key={t} value={t}>{TOPIC_LABELS[t]}</option>)}
            </select>
            <input type="text" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: SANS }} />
            <textarea placeholder="Share your experience, question, or story..." value={newBody} onChange={e => setNewBody(e.target.value)} rows={4} style={{ width: '100%', padding: '12px 14px', border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: SANS, resize: 'vertical' }} />
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 10 }}>{error}</p>}
            <button onClick={submitPost} disabled={submitting} style={{ padding: '10px 24px', background: G, color: 'white', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: SANS }}>
              {submitting ? 'Posting...' : 'Post anonymously'}
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: FAINT }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: FAINT }}>No posts yet. Be the first!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {posts.map(post => (
              <div key={post.id} style={{ background: 'white', borderRadius: 14, padding: '20px 22px', border: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: GL, border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#3B6D11', flexShrink: 0 }}>{post.personaName[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{post.personaName}</div>
                    <div style={{ fontSize: 11, color: FAINT }}>{timeAgo(post.createdAt)}</div>
                  </div>
                  {post.isDoctorPost && <span style={{ fontSize: 10, background: '#dcfce9', color: '#15803c', padding: '2px 9px', borderRadius: 999, fontWeight: 700 }}>Doctor</span>}
                  <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 999, background: TOPIC_COLORS[post.topic] || '#f3f4f6', color: '#374151', fontWeight: 500 }}>{TOPIC_LABELS[post.topic] || post.topic}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{post.title}</h3>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65, marginBottom: 12 }}>
                  {post.body.length > 300 ? post.body.slice(0, 300) + '...' : post.body}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: FAINT }}>
                  <button onClick={() => markHelpful(post.id)} style={{ background: 'none', border: 'none', color: FAINT, cursor: 'pointer', fontSize: 12, fontFamily: SANS, padding: 0 }}>
                    ♥ {post.helpfulCount} helpful
                  </button>
                  <Link href={'/forum/' + post.id} style={{ color: FAINT, textDecoration: 'none' }}>{post._count?.replies || 0} replies →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
