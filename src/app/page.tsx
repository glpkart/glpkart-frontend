'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { forumApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const TOPICS = ['All', 'SIDE_EFFECTS', 'FOOD_AND_EATING', 'SUCCESS_STORIES', 'DOSING_QUESTIONS', 'MENTAL_HEALTH', 'DOCTOR_ADVICE', 'OTHER']
const TOPIC_LABELS: Record<string, string> = {
  All: 'All posts',
  SIDE_EFFECTS: 'Side effects',
  FOOD_AND_EATING: 'Food & eating',
  SUCCESS_STORIES: 'Success stories',
  DOSING_QUESTIONS: 'Dosing questions',
  MENTAL_HEALTH: 'Mental health',
  DOCTOR_ADVICE: 'Doctor advice',
  OTHER: 'Other',
}
const TOPIC_COLORS: Record<string, string> = {
  SIDE_EFFECTS: '#fef9c3',
  FOOD_AND_EATING: '#dcfce9',
  SUCCESS_STORIES: '#dbeafe',
  DOSING_QUESTIONS: '#fce7f3',
  MENTAL_HEALTH: '#ede9fe',
  DOCTOR_ADVICE: '#ffedd5',
  OTHER: '#f3f4f6',
}

interface Post {
  id: string
  personaName: string
  title: string
  body: string
  topic: string
  isDoctorPost: boolean
  helpfulCount: number
  createdAt: string
  _count?: { replies: number }
}

export default function ForumPage() {
  const { isLoggedIn } = useAuthStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [topic, setTopic] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newTopic, setNewTopic] = useState('OTHER')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadPosts() }, [topic])

  async function loadPosts() {
    setLoading(true)
    try {
      const res = await forumApi.getPosts(topic === 'All' ? undefined : topic)
      setPosts(res.data.posts)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  async function submitPost() {
    if (!newTitle.trim() || !newBody.trim()) { setError('Please fill in both title and body'); return }
    if (!isLoggedIn()) { setError('Please log in to post'); return }
    setSubmitting(true)
    setError('')
    try {
      await forumApi.createPost({ title: newTitle, body: newBody, topic: newTopic })
      setShowNew(false)
      setNewTitle('')
      setNewBody('')
      await loadPosts()
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to post. Please try again.')
    }
    setSubmitting(false)
  }

  async function markHelpful(postId: string) {
    if (!isLoggedIn()) return
    try {
      await forumApi.markHelpful(postId)
      setPosts(posts.map(p => p.id === postId ? { ...p, helpfulCount: p.helpfulCount + 1 } : p))
    } catch (e) { console.error(e) }
  }

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'Just now'
    if (hours < 24) return hours + 'h ago'
    return Math.floor(hours / 24) + 'd ago'
  }

  function topicBtnStyle(t: string) {
    const active = topic === t
    return {
      padding: '6px 16px',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
      fontFamily: 'inherit',
      background: active ? 'var(--brand)' : 'white',
      color: active ? 'white' : '#6b7280',
      border: active ? '1px solid var(--brand)' : '1px solid #e5e7eb',
    } as React.CSSProperties
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--brand-dark)', textDecoration: 'none' }}>
          GLP<span style={{ color: 'var(--brand)' }}>Kart</span>
        </Link>
        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/forum" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>Community</Link>
          <Link href="/book" style={{ color: '#6b7280', textDecoration: 'none' }}>Book consult</Link>
        </div>
        {isLoggedIn()
          ? <button onClick={() => setShowNew(true)} style={{ padding: '8px 20px', background: 'var(--brand)', color: 'white', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>New post</button>
          : <Link href="/login?next=forum" style={{ padding: '8px 20px', background: 'var(--brand)', color: 'white', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Join community</Link>
        }
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>Community</h1>
          <p style={{ fontSize: 15, color: '#6b7280' }}>Anonymous, honest conversations about GLP-1. Your real name is never shown.</p>
        </div>

        <div style={{ background: '#f0fdf6', border: '1px solid #bbf7d2', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: '#15803c' }}>
          <span>🔒</span>
          <div>
            <strong>Fully anonymous.</strong> Your posts appear under a generated persona (e.g. QuietRiver_42). Your real name or phone number is never shown to anyone.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(t)} style={topicBtnStyle(t)}>
              {TOPIC_LABELS[t]}
            </button>
          ))}
        </div>

        {showNew && (
          <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Share your experience</h3>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>
            <select value={newTopic} onChange={e => setNewTopic(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: 'inherit' }}>
              {TOPICS.filter(t => t !== 'All').map(t => <option key={t} value={t}>{TOPIC_LABELS[t]}</option>)}
            </select>
            <input type="text" placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 15, marginBottom: 12, outline: 'none', fontFamily: 'inherit' }} />
            <textarea placeholder="Share your experience..." value={newBody} onChange={e => setNewBody(e.target.value)} rows={4}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button onClick={submitPost} disabled={submitting} style={{ padding: '10px 24px', background: 'var(--brand)', color: 'white', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              {submitting ? 'Posting...' : 'Post anonymously'}
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af', fontSize: 15 }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af', fontSize: 15 }}>No posts yet. Be the first to share!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map(post => (
              <div key={post.id} style={{ background: 'white', borderRadius: 16, padding: 24, border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0fdf6', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: 'var(--brand)', flexShrink: 0 }}>
                    {post.personaName[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{post.personaName}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{timeAgo(post.createdAt)}</div>
                  </div>
                  {post.isDoctorPost && (
                    <span style={{ fontSize: 11, background: '#dcfce9', color: '#15803c', padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>Doctor</span>
                  )}
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, fontWeight: 500, background: TOPIC_COLORS[post.topic] || '#f3f4f6', color: '#374151' }}>
                    {TOPIC_LABELS[post.topic] || post.topic}
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{post.title}</h3>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7, marginBottom: 16 }}>
                  {post.body.length > 300 ? post.body.slice(0, 300) + '...' : post.body}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#9ca3af' }}>
                  <button onClick={() => markHelpful(post.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: 0 }}>
                    ♥ {post.helpfulCount} helpful
                  </button>
                  <Link href={'/forum/' + post.id} style={{ color: '#9ca3af', textDecoration: 'none' }}>
                    {post._count?.replies || 0} replies →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
