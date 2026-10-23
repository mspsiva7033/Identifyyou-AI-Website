import type { Metadata } from 'next'
import { Manrope, IBM_Plex_Sans } from 'next/font/google'
import { Suspense } from 'react'
import Script from 'next/script'
import { PageTransitionLoader } from '@/components/ui/PageTransitionLoader'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CookieConsent } from '@/components/ui/CookieConsent'
import { JsonLdSchema } from '@/components/seo/JsonLdSchema'
import { UmamiAnalyticsTracker, UMAMI_WEBSITE_ID, UMAMI_HOST_URL } from '@/lib/umami'
import '../globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex',
  display: 'swap',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost') &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes('127.0.0.1')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://identifyyou.ai'

export const metadata: Metadata = {
  title: {
    default: 'IdentifYou — Deep Tech Built Around Business',
    template: '%s | IdentifYou',
  },
  description:
    'AI-powered solutions for intelligent manufacturing, connected industries, Vision AI, data engineering, and enterprise operations.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'IdentifYou Technologies',
    locale: 'en_US',
    url: siteUrl,
  },
  icons: {
    icon: '/images/identifyou-logo.png',
    shortcut: '/images/identifyou-logo.png',
    apple: '/images/identifyou-logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${manrope.variable} ${ibmPlexSans.variable}`}>
        <JsonLdSchema />
        {UMAMI_WEBSITE_ID && (
          <Script
            defer
            src={`${UMAMI_HOST_URL}/script.js`}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
        <Suspense fallback={null}>
          <PageTransitionLoader />
          <UmamiAnalyticsTracker />
        </Suspense>
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}


