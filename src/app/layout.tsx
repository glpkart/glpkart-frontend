import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GLPKart — GLP-1 Weight Loss, Done Right',
  description: 'India\'s first science-backed GLP-1 weight loss platform. Doctor consultation, licensed Ozempic & Mounjaro, anonymous community support.',
  keywords: 'Ozempic India, Mounjaro India, GLP-1 weight loss, semaglutide India, weight loss doctor',
  openGraph: {
    title: 'GLPKart — GLP-1 Weight Loss, Done Right',
    description: 'Doctor consultation + licensed GLP-1 medication + community support. Starting ₹799.',
    url: 'https://glpkart.com',
    siteName: 'GLPKart',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
