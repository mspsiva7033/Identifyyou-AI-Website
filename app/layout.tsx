import type { Metadata } from 'next'
import { Manrope, IBM_Plex_Sans } from 'next/font/google'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${ibmPlexSans.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

