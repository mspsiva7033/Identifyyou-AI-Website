import crypto from 'crypto'
import { NextRequest } from 'next/server'

export interface ParsedClient {
  deviceCategory: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
}

export function parseUserAgent(uaString: string | null): ParsedClient {
  if (!uaString) {
    return { deviceCategory: 'desktop', browser: 'Other', os: 'Other' }
  }

  const ua = uaString.toLowerCase()

  // 1. Device Category
  let deviceCategory: 'desktop' | 'mobile' | 'tablet' = 'desktop'
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceCategory = 'tablet'
  } else if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    deviceCategory = 'mobile'
  }

  // 2. Operating System
  let os = 'Other'
  if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/windows/i.test(ua)) os = 'Windows'
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua)) os = 'Linux'

  // 3. Browser
  let browser = 'Other'
  if (/edg/i.test(ua)) browser = 'Edge'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'

  return { deviceCategory, browser, os }
}

/**
 * Generate a privacy-preserving visitor hash (GDPR compliant - no raw IPs stored)
 */
export function generateVisitorHash(ip: string, userAgent: string): string {
  const secretSalt = process.env.PAYLOAD_SECRET || 'identifYou_analytics_salt_key'
  return crypto
    .createHmac('sha256', secretSalt)
    .update(`${ip}:${userAgent}`)
    .digest('hex')
    .slice(0, 32)
}

/**
 * Extract client IP from headers
 */
export function extractClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.headers.get('x-real-ip') || '127.0.0.1'
}

/**
 * Infer country name from client timezone when reverse proxy headers are not present
 */
export function inferCountryFromTimezone(tz?: string | null): string {
  if (!tz) return 'Direct / Unknown'

  const timezone = tz.toLowerCase()
  if (timezone.includes('kolkata') || timezone.includes('calcutta')) return 'India'
  if (timezone.includes('new_york') || timezone.includes('chicago') || timezone.includes('los_angeles') || timezone.includes('denver') || timezone.includes('phoenix')) return 'United States'
  if (timezone.includes('london')) return 'United Kingdom'
  if (timezone.includes('berlin') || timezone.includes('frankfurt')) return 'Germany'
  if (timezone.includes('paris')) return 'France'
  if (timezone.includes('tokyo')) return 'Japan'
  if (timezone.includes('singapore')) return 'Singapore'
  if (timezone.includes('dubai')) return 'United Arab Emirates'
  if (timezone.includes('toronto') || timezone.includes('vancouver') || timezone.includes('montreal')) return 'Canada'
  if (timezone.includes('sydney') || timezone.includes('melbourne') || timezone.includes('brisbane')) return 'Australia'
  if (timezone.includes('amsterdam')) return 'Netherlands'
  if (timezone.includes('zurich')) return 'Switzerland'
  if (timezone.includes('riyadh')) return 'Saudi Arabia'
  if (timezone.includes('seoul')) return 'South Korea'
  if (timezone.includes('hong_kong')) return 'Hong Kong'

  // Extract Continent or Region fallback
  const parts = tz.split('/')
  return parts.length > 1 ? parts[0] : 'Direct / Unknown'
}

/**
 * Extract country code/name from reverse proxy headers with timezone fallback
 */
export function extractCountry(req: NextRequest, timezone?: string | null): string {
  const headerCountry =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('x-country-code')

  if (headerCountry && headerCountry !== 'XX' && headerCountry !== 'T1') {
    return headerCountry
  }

  return inferCountryFromTimezone(timezone)
}

