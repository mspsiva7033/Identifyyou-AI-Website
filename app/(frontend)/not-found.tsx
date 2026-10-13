import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', background: '#FAFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Header />
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '72px', color: '#94C640', lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '28px', margin: '16px 0 12px', color: '#12181B' }}>Page Not Found</h1>
        <p style={{ fontSize: '16px', color: '#5B6862', marginBottom: '32px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#94C640',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '14.5px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  )
}
