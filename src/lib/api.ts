import axios from 'axios'

// All API calls go to /api/backend/* on the same domain (glpkart.com)
// Next.js rewrites these server-side to the Railway backend
// This completely avoids mixed content and CORS issues
const API_URL = '/api/backend'

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

// Auth
export const authApi = {
  sendOtp: (phone: string) => api.post('/auth/otp/send', { phone }),
  verifyOtp: (phone: string, code: string) => api.post('/auth/otp/verify', { phone, code }),
  logout: () => api.post('/auth/logout'),
}

// Journey
export const journeyApi = {
  getDashboard: () => api.get('/journey/dashboard'),
  logWeight: (weightKg: number) => api.post('/journey/weight', { weightKg }),
}

// Consultations
export const consultApi = {
  getSlots: (doctorId: string, date: string) =>
    api.get(`/consultations/slots/${doctorId}?date=${date}`),
  book: (doctorId: string, scheduledAt: string) =>
    api.post('/consultations', { doctorId, scheduledAt }),
  getAll: () => api.get('/consultations'),
}

// Prescriptions
export const prescriptionApi = {
  getAll: () => api.get('/prescriptions'),
}

// Forum
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

// Doctors
export const doctorApi = {
  getAll: () => api.get('/doctors'),
}
