import type { Metadata } from 'next'
import { Manrope, IBM_Plex_Sans } from 'next/font/google'
import { Suspense } from 'react'
import Script from 'next/script'
import { PageTransitionLoader } from '@/components/ui/PageTransitionLoader'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { CookieConsent } from '@/components/ui/CookieConsent'
import { JsonLdSchema } from '@/components/seo/JsonLdSchema'
import { GoogleAnalyticsTracker, GA_MEASUREMENT_ID } from '@/lib/gtag'
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

export const metadata: Metadata = {
  title: {
    default: 'IdentifYou Technologies — Deep Tech. Built Around Business.',
    template: '%s | IdentifYou Technologies',
  },
  description:
    'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://identifyou.in'),
  openGraph: {
    type: 'website',
    siteName: 'IdentifYou Technologies',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
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
      <head>
        <JsonLdSchema />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body suppressHydrationWarning className={`${manrope.variable} ${ibmPlexSans.variable}`}>
        <Suspense fallback={null}>
          <PageTransitionLoader />
          <GoogleAnalyticsTracker />
        </Suspense>
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  )
}


