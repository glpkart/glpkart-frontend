'use client'
import { create } from 'zustand'

interface User {
  id: string
  phone: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  forumPersona?: string
  hasCompletedConsultation?: boolean
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isLoggedIn: () => boolean
  canAccessForum: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('glpkart_token') : null,

  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('glpkart_token', token)
      localStorage.setItem('glpkart_user', JSON.stringify(user))
    }
    set({ user, token })
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('glpkart_token')
      localStorage.removeItem('glpkart_user')
    }
    set({ user: null, token: null })
  },

  isLoggedIn: () => !!get().token,

  // Forum only accessible after at least 1 consultation completed
  canAccessForum: () => {
    const { user, token } = get()
    return !!token && !!user?.hasCompletedConsultation
  },
}))

// Hydrate from localStorage on client
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('glpkart_user')
  const token = localStorage.getItem('glpkart_token')
  if (stored && token) {
    try {
      useAuthStore.setState({ user: JSON.parse(stored), token })
    } catch {}
  }
}
