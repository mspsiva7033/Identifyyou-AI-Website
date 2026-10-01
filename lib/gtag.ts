'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Declare global gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
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
 * Track page view manually
 */
export const trackGAPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  })
}

/**
 * Track generic custom event to GA4
 */
export const trackGAEvent = (
  action: string,
  params?: {
    category?: string
    label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA4 Event - ${action}]:`, params)
    }
    return
  }
  window.gtag('event', action, {
    event_category: params?.category || 'engagement',
    event_label: params?.label,
    value: params?.value,
    ...params,
  })
}

/**
 * Specific Trackers for Website Features
 */
export const trackCaseStudyView = (slug: string, title: string, category?: string) => {
  trackGAEvent('view_case_study', {
    category: 'Case Studies',
    label: title,
    case_study_slug: slug,
    case_study_category: category || 'Uncategorized',
  })
}

export const trackCaseStudyCategoryClick = (categoryName: string) => {
  trackGAEvent('filter_case_study_category', {
    category: 'Case Studies',
    label: categoryName,
    case_study_category: categoryName,
  })
}

export const trackContactFormSubmit = (selectedPath?: string | null) => {
  const utms = getStoredUTMs()
  trackGAEvent('generate_lead', {
    category: 'Contact Form',
    label: selectedPath || 'General Inquiry',
    selected_interest: selectedPath || 'General',
    ...utms,
  })
}

export const trackCTAClick = (buttonText: string, targetPath?: string) => {
  trackGAEvent('cta_click', {
    category: 'CTA Button',
    label: buttonText,
    target_path: targetPath,
  })
}

export const trackWhatsAppClick = (location: string) => {
  trackGAEvent('whatsapp_click', {
    category: 'Contact',
    label: location,
  })
}

export const trackExternalLinkClick = (url: string) => {
  trackGAEvent('external_link_click', {
    category: 'Outbound',
    label: url,
    destination_url: url,
  })
}

export const trackDownload = (fileName: string, fileUrl: string) => {
  trackGAEvent('file_download', {
    category: 'Downloads',
    label: fileName,
    file_url: fileUrl,
  })
}

/**
 * Global Analytics Listener Component
 * Automatically tracks page views on client-side route changes,
 * UTM parameters, external links, downloads, scroll depth, and time on page.
 */
export function GoogleAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageStartTime = useRef<number>(Date.now())

  // 1. Route change & UTM tracking
  useEffect(() => {
    if (!pathname) return
    parseAndStoreUTMs(searchParams)

    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname
    trackGAPageView(url)
    pageStartTime.current = Date.now()

    return () => {
      const timeSpentSec = Math.round((Date.now() - pageStartTime.current) / 1000)
      if (timeSpentSec > 2) {
        trackGAEvent('time_on_page', {
          category: 'Engagement',
          label: pathname,
          value: timeSpentSec,
          seconds: timeSpentSec,
        })
      }
    }
  }, [pathname, searchParams])

  // 2. Global event listeners
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
        trackGAEvent('scroll_50', { category: 'Engagement', label: pathname })
      }
      if (scrollPercent >= 90 && !scroll90Fired) {
        scroll90Fired = true
        trackGAEvent('scroll_90', { category: 'Engagement', label: pathname })
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
    }
  }, [pathname])

  return null
}
