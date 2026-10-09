import { NextRequest, NextResponse } from 'next/server'
import { getDbPool } from '@/lib/db-pool'
import {
  parseUserAgent,
  generateVisitorHash,
  extractClientIp,
  extractCountry,
} from '@/lib/analytics-utils'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    let body: any
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      body = await req.json()
    } else {
      // Handles navigator.sendBeacon text/plain or blob payloads
      const text = await req.text()
      try {
        body = JSON.parse(text)
      } catch {
        body = {}
      }
    }

    const {
      eventName = 'pageview',
      path = '/',
      title = '',
      referrer = '',
      sessionId = '',
      screen = null,
      language = null,
      timezone = null,
      colorTheme = null,
      landingPage = null,
      metadata = {},
      utms = {},
    } = body

    // 1. Client attributes
    const clientIp = extractClientIp(req)
    const userAgent = req.headers.get('user-agent') || ''
    const { deviceCategory, browser, os } = parseUserAgent(userAgent)
    const visitorId = generateVisitorHash(clientIp, userAgent)
    const country = extractCountry(req, timezone)

    // Merge structured specs into metadata jsonb
    const enrichedMetadata = {
      ...(typeof metadata === 'object' && metadata !== null ? metadata : {}),
      screen: screen || undefined,
      language: language || undefined,
      timezone: timezone || undefined,
      colorTheme: colorTheme || undefined,
      landingPage: landingPage || undefined,
    }

    // 2. UTM parameters
    const utmSource = utms?.source || null
    const utmMedium = utms?.medium || null
    const utmCampaign = utms?.campaign || null
    const utmTerm = utms?.term || null
    const utmContent = utms?.content || null

    // 3. Insert asynchronously into PostgreSQL
    const pool = getDbPool()
    await pool.query(
      `INSERT INTO analytics_events (
        event_name,
        path,
        title,
        referrer,
        visitor_id,
        session_id,
        device_category,
        browser,
        os,
        country,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        eventName.slice(0, 100),
        path,
        title ? title.slice(0, 500) : null,
        referrer ? referrer.slice(0, 500) : null,
        visitorId,
        sessionId ? sessionId.slice(0, 64) : null,
        deviceCategory,
        browser,
        os,
        country,
        utmSource ? utmSource.slice(0, 100) : null,
        utmMedium ? utmMedium.slice(0, 100) : null,
        utmCampaign ? utmCampaign.slice(0, 100) : null,
        utmTerm ? utmTerm.slice(0, 100) : null,
        utmContent ? utmContent.slice(0, 100) : null,
        JSON.stringify(enrichedMetadata),
      ]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    // Analytics endpoints should fail silently without crashing client requests
    console.error('Analytics tracking error:', err)
    return NextResponse.json({ success: false, error: 'Failed to record event' }, { status: 500 })
  }
}
