import axios from 'axios'

// NEXT_PUBLIC_API_URL must be set in Vercel environment variables
// It must be the HTTPS Railway URL e.g. https://glpkart-backend.up.railway.app
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

if (!API_URL && typeof window !== 'undefined') {
  console.error('NEXT_PUBLIC_API_URL is not set. Login will not work.')
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('glpkart_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth helpers
export const authApi = {
  sendOtp: (phone: string) => api.post('/auth/otp/send', { phone }),
  verifyOtp: (phone: string, code: string) => api.post('/auth/otp/verify', { phone, code }),
  logout: () => api.post('/auth/logout'),
}

// Journey helpers
export const journeyApi = {
  getDashboard: () => api.get('/journey/dashboard'),
  logWeight: (weightKg: number) => api.post('/journey/weight', { weightKg }),
  logInjection: (data: { medicineName: string; doseMg: number; injectionSite: string; dueAt: string }) =>
    api.post('/journey/injection', data),
}

// Consultation helpers
export const consultApi = {
  getSlots: (doctorId: string, date: string) =>
    api.get(`/consultations/slots/${doctorId}?date=${date}`),
  book: (doctorId: string, scheduledAt: string) =>
    api.post('/consultations', { doctorId, scheduledAt }),
  getAll: () => api.get('/consultations'),
}

// Prescription helpers
export const prescriptionApi = {
  getAll: () => api.get('/prescriptions'),
}

// Forum helpers
export const forumApi = {
  getPosts: (topic?: string, cursor?: string) =>
    api.get('/forum/posts', { params: { topic, cursor, limit: 20 } }),
  getPost: (id: string) => api.get(`/forum/posts/${id}`),
  createPost: (data: { title: string; body: string; topic: string }) =>
    api.post('/forum/posts', data),
  createReply: (postId: string, body: string) =>
    api.post(`/forum/posts/${postId}/reply`, { body }),
  markHelpful: (postId: string) => api.post(`/forum/posts/${postId}/helpful`),
  flag: (postId: string, reason: string) => api.post(`/forum/posts/${postId}/flag`, { reason }),
}
