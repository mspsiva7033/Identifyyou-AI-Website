'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
export const UMAMI_HOST_URL = (process.env.NEXT_PUBLIC_UMAMI_HOST_URL || 'https://cloud.umami.is').replace(/\/$/, '')

// Declare global window.umami object for TypeScript
declare global {
  interface Window {
    umami?: {
      track: {
        (eventName: string, eventData?: Record<string, any>): void
        (callback: (props: any) => { name: string; data?: any }): void
      }
      identify?: (data: Record<string, any>) => void
    }
  }
}

export interface UTMData {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  referrer?: string
}

/**
 * Capture & Retrieve UTM Campaign parameters from URL or sessionStorage
 */
export const getStoredUTMs = (): UTMData => {
  if (typeof window === 'undefined') return {}
  try {
    const cached = sessionStorage.getItem('iy_utm_data')
    if (cached) return JSON.parse(cached)
  } catch {
    // Ignore storage restrictions
  }
  return {}
}

const parseAndStoreUTMs = (searchParams: URLSearchParams | null) => {
  if (typeof window === 'undefined') return
  try {
    const existing = getStoredUTMs()
    const source = searchParams?.get('utm_source') || searchParams?.get('gclid') || undefined
    const medium = searchParams?.get('utm_medium') || undefined
    const campaign = searchParams?.get('utm_campaign') || undefined
    const term = searchParams?.get('utm_term') || undefined
    const content = searchParams?.get('utm_content') || undefined
    const referrer = document.referrer ? new URL(document.referrer).hostname : undefined

    if (source || medium || campaign || referrer) {
      const utmData: UTMData = {
        utmSource: source || existing.utmSource,
        utmMedium: medium || existing.utmMedium,
        utmCampaign: campaign || existing.utmCampaign,
        utmTerm: term || existing.utmTerm,
        utmContent: content || existing.utmContent,
        referrer: referrer || existing.referrer,
      }
      sessionStorage.setItem('iy_utm_data', JSON.stringify(utmData))
    }
  } catch {
    // Ignore
  }
}

/**
 * Dispatches an event to the internal PostgreSQL In-App Analytics engine
 */
const sendNativeAnalyticsEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window === 'undefined') return

  try {
    // Generate or retrieve persistent browser session ID (session-only)
    let sessionId = sessionStorage.getItem('iy_sess_id')
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      sessionStorage.setItem('iy_sess_id', sessionId)
    }

    // Retrieve or set first landing page in this session
    let landingPage = sessionStorage.getItem('iy_landing_page')
    if (!landingPage) {
      landingPage = window.location.pathname || '/'
      sessionStorage.setItem('iy_landing_page', landingPage)
    }

    // Capture standard browser client specs (100% free web APIs)
    const screen = `${window.screen.width}x${window.screen.height}`
    const language = navigator.language || 'en'
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    const colorTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const utms = getStoredUTMs()
    const payload = JSON.stringify({
      eventName,
      path: window.location.pathname || '/',
      title: document.title || '',
      referrer: document.referrer || '',
      sessionId,
      screen,
      language,
      timezone,
      colorTheme,
      landingPage,
      metadata: data || {},
      utms: {
        source: utms.utmSource,
        medium: utms.utmMedium,
        campaign: utms.utmCampaign,
        term: utms.utmTerm,
        content: utms.utmContent,
      },
    })

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/track', blob)
    } else {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Fail silently on client
  }
}

/**
 * Track custom event in both Native In-App Analytics and Umami (if enabled)
 */
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  // 1. Dispatch to Native PostgreSQL In-App Analytics (100% inside Next.js)
  sendNativeAnalyticsEvent(eventName, data)

  // 2. Dispatch to Umami if present on window
  if (typeof window !== 'undefined' && window.umami?.track) {
    window.umami.track(eventName, data)
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`[In-App Analytics Event - ${eventName}]:`, data)
  }
}

// Backward-compatible alias
export const trackGAEvent = trackEvent


/**
 * Specific Trackers for Website Features
 */
export const trackCaseStudyView = (slug: string, title: string, category?: string) => {
  trackEvent('view_case_study', {
    title,
    slug,
    category: category || 'Uncategorized',
  })
}

export const trackCaseStudyCategoryClick = (categoryName: string) => {
  trackEvent('filter_case_study_category', {
    category: categoryName,
  })
}

export const trackContactFormSubmit = (selectedPath?: string | null) => {
  const utms = getStoredUTMs()
  trackEvent('generate_lead', {
    interest: selectedPath || 'General',
    ...utms,
  })
}

export const trackCTAClick = (buttonText: string, targetPath?: string) => {
  trackEvent('cta_click', {
    label: buttonText,
    target: targetPath,
  })
}

export const trackWhatsAppClick = (location: string) => {
  trackEvent('whatsapp_click', {
    location,
  })
}

export const trackExternalLinkClick = (url: string) => {
  trackEvent('external_link_click', {
    url,
  })
}

export const trackDownload = (fileName: string, fileUrl: string) => {
  trackEvent('file_download', {
    filename: fileName,
    url: fileUrl,
  })
}

/**
 * Global Umami Analytics Tracker Component
 * Automatically listens to route changes, UTMs, scroll depth, downloads, and outbound links
 */
export function UmamiAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageStartTime = useRef<number>(Date.now())

  // 1. Route change, pageview & UTM tracking
  useEffect(() => {
    if (!pathname) return
    parseAndStoreUTMs(searchParams)
    pageStartTime.current = Date.now()

    // Record pageview event in Native In-App Analytics
    trackEvent('pageview', { path: pathname, title: typeof document !== 'undefined' ? document.title : '' })

    return () => {
      const timeSpentSec = Math.round((Date.now() - pageStartTime.current) / 1000)
      if (timeSpentSec > 2) {
        trackEvent('time_on_page', {
          page: pathname,
          seconds: timeSpentSec,
        })
      }
    }
  }, [pathname, searchParams])

  // 2. Global event listeners (Scroll depth, Outbound links, Downloads)
  useEffect(() => {
    if (typeof window === 'undefined') return

    let scroll50Fired = false
    let scroll90Fired = false

    const handleScroll = () => {
      const scrollPercent = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      )

      if (scrollPercent >= 50 && !scroll50Fired) {
        scroll50Fired = true
        trackEvent('scroll_50', { page: pathname })
      }
      if (scrollPercent >= 90 && !scroll90Fired) {
        scroll90Fired = true
        trackEvent('scroll_90', { page: pathname })
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target || !target.href) return

      const href = target.href
      const isExternal = href.startsWith('http') && !href.includes(window.location.hostname)
      const isDownload = /\.(pdf|zip|docx|xlsx|pptx|png|jpg|csv)$/i.test(href)

      if (isExternal) {
        trackExternalLinkClick(href)
      }
      if (isDownload) {
        trackDownload(href.split('/').pop() || 'file', href)
      }
    }

    const handleCopy = () => {
      try {
        const selection = window.getSelection()?.toString() || ''
        if (selection.includes('@') || /\+?\d[\d -]{7,}\d/.test(selection)) {
          trackEvent('copy_contact_info', {
            snippet: selection.slice(0, 60),
            page: pathname,
          })
        }
      } catch {
        // ignore
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)
    document.addEventListener('copy', handleCopy)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('copy', handleCopy)
    }
  }, [pathname])

  return null
}
