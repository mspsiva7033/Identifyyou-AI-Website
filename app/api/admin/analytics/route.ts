import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

export const dynamic = 'force-dynamic'

interface AnalyticsReportResponse {
  configured: boolean
  propertyId: string | null
  status: 'live' | 'demo_mode'
  message?: string
  dateRange: {
    startDate: string
    endDate: string
    rangeKey: string
  }
  summary: {
    totalUsers: number
    activeUsers: number
    newUsers: number
    returningUsers: number
    sessions: number
    pageViews: number
    avgEngagementTimeSec: number
  }
  usersOverTime: Array<{ date: string; activeUsers: number; pageViews: number }>
  topPages: Array<{ path: string; title: string; pageViews: number; activeUsers: number }>
  caseStudies: Array<{ path: string; title: string; views: number }>
  trafficSources: Array<{ source: string; medium: string; users: number; sessions: number }>
  geography: {
    countries: Array<{ country: string; users: number; pageViews: number }>
    regions: Array<{ region: string; users: number }>
    cities: Array<{ city: string; country: string; users: number }>
  }
  devices: Array<{ deviceCategory: string; users: number; percentage: number }>
  browsers: Array<{ browser: string; users: number }>
  operatingSystems: Array<{ os: string; users: number }>
  events: Array<{ eventName: string; count: number }>
}

function calculateDateRange(rangeKey: string, customStart?: string, customEnd?: string) {
  let startDate = '30daysAgo'
  let endDate = 'today'

  switch (rangeKey) {
    case 'today':
      startDate = 'today'
      endDate = 'today'
      break
    case '7d':
      startDate = '7daysAgo'
      endDate = 'today'
      break
    case '30d':
      startDate = '30daysAgo'
      endDate = 'today'
      break
    case '90d':
      startDate = '90daysAgo'
      endDate = 'today'
      break
    case 'custom':
      if (customStart) startDate = customStart
      if (customEnd) endDate = customEnd
      break
  }

  return { startDate, endDate, rangeKey }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const rangeKey = searchParams.get('range') || '30d'
  const customStart = searchParams.get('startDate') || undefined
  const customEnd = searchParams.get('endDate') || undefined

  const dateRange = calculateDateRange(rangeKey, customStart, customEnd)

  const propertyId = process.env.GA_PROPERTY_ID || process.env.NEXT_PUBLIC_GA_PROPERTY_ID
  const clientEmail = process.env.GA_CLIENT_EMAIL
  let privateKey = process.env.GA_PRIVATE_KEY

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n')
  }

  // Check if live credentials exist
  const isConfigured = Boolean(propertyId && clientEmail && privateKey)

  if (!isConfigured) {
    return NextResponse.json(getDemoAnalyticsData(dateRange, 'GA4 API Service Account credentials not configured in environment variables.'))
  }

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    })

    const formattedProperty = `properties/${propertyId}`

    // 1. Core Summary & Overview Metrics
    const overviewRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'userEngagementDuration' },
      ],
    })

    const overviewReport = overviewRes[0]
    const summaryRow = overviewReport.rows?.[0]?.metricValues || []
    const activeUsers = parseInt(summaryRow[0]?.value || '0', 10)
    const newUsers = parseInt(summaryRow[1]?.value || '0', 10)
    const totalUsers = parseInt(summaryRow[2]?.value || '0', 10) || activeUsers
    const sessions = parseInt(summaryRow[3]?.value || '0', 10)
    const pageViews = parseInt(summaryRow[4]?.value || '0', 10)
    const totalEngagementSec = parseFloat(summaryRow[5]?.value || '0')
    const avgEngagementTimeSec = activeUsers > 0 ? Math.round(totalEngagementSec / activeUsers) : 0
    const returningUsers = Math.max(0, activeUsers - newUsers)

    // 2. Users & Page Views Over Time
    const timeSeriesRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
    })

    const timeSeriesReport = timeSeriesRes[0]
    const usersOverTime = (timeSeriesReport.rows || []).map((row: any) => {
      const rawDate = row.dimensionValues?.[0]?.value || ''
      const formattedDate = rawDate.length === 8 
        ? `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`
        : rawDate

      return {
        date: formattedDate,
        activeUsers: parseInt(row.metricValues?.[0]?.value || '0', 10),
        pageViews: parseInt(row.metricValues?.[1]?.value || '0', 10),
      }
    })

    // 3. Top Visited Pages & Case Studies
    const pagesRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 15,
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    })

    const pagesReport = pagesRes[0]
    const topPages: Array<{ path: string; title: string; pageViews: number; activeUsers: number }> = []
    const caseStudies: Array<{ path: string; title: string; views: number }> = []

    if (pagesReport.rows) {
      for (const row of pagesReport.rows) {
        const path = row.dimensionValues?.[0]?.value || '/'
        const title = row.dimensionValues?.[1]?.value || 'Page'
        const views = parseInt(row.metricValues?.[0]?.value || '0', 10)
        const users = parseInt(row.metricValues?.[1]?.value || '0', 10)

        topPages.push({ path, title, pageViews: views, activeUsers: users })

        if (path.includes('/case-studies/')) {
          caseStudies.push({ path, title, views })
        }
      }
    }

    // 4. Traffic Sources
    const sourcesRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      limit: 10,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    })

    const sourcesReport = sourcesRes[0]
    const trafficSources = (sourcesReport.rows || []).map((row: any) => ({
      source: row.dimensionValues?.[0]?.value || '(direct)',
      medium: row.dimensionValues?.[1]?.value || '(none)',
      users: parseInt(row.metricValues?.[0]?.value || '0', 10),
      sessions: parseInt(row.metricValues?.[1]?.value || '0', 10),
    }))

    // 5. Geography (Country, Region, City)
    const countryRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      limit: 10,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    })

    const cityRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'city' }, { name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 10,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    })

    const countryReport = countryRes[0]
    const cityReport = cityRes[0]

    const countries = (countryReport.rows || []).map((row: any) => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0', 10),
      pageViews: parseInt(row.metricValues?.[1]?.value || '0', 10),
    }))

    const cities = (cityReport.rows || []).map((row: any) => ({
      city: row.dimensionValues?.[0]?.value || 'Unknown',
      country: row.dimensionValues?.[1]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }))

    // 6. Devices, Browsers, OS
    const techRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'deviceCategory' }, { name: 'browser' }, { name: 'operatingSystem' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 15,
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    })

    const techReport = techRes[0]
    const deviceMap: Record<string, number> = {}
    const browserMap: Record<string, number> = {}
    const osMap: Record<string, number> = {}

    if (techReport.rows) {
      for (const row of techReport.rows) {
        const dev = row.dimensionValues?.[0]?.value || 'desktop'
        const browser = row.dimensionValues?.[1]?.value || 'Chrome'
        const os = row.dimensionValues?.[2]?.value || 'Windows'
        const u = parseInt(row.metricValues?.[0]?.value || '0', 10)

        deviceMap[dev] = (deviceMap[dev] || 0) + u
        browserMap[browser] = (browserMap[browser] || 0) + u
        osMap[os] = (osMap[os] || 0) + u
      }
    }

    const devices = Object.entries(deviceMap).map(([dev, count]) => ({
      deviceCategory: dev,
      users: count,
      percentage: activeUsers > 0 ? Math.round((count / activeUsers) * 100) : 0,
    }))

    const browsers = Object.entries(browserMap)
      .map(([b, count]) => ({ browser: b, users: count }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 5)

    const operatingSystems = Object.entries(osMap)
      .map(([os, count]) => ({ os, users: count }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 5)

    // 7. Custom Events
    const eventsRes = await analyticsDataClient.runReport({
      property: formattedProperty,
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      limit: 15,
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    })

    const eventsReport = eventsRes[0]
    const events = (eventsReport.rows || []).map((row: any) => ({
      eventName: row.dimensionValues?.[0]?.value || 'event',
      count: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }))

    const result: AnalyticsReportResponse = {
      configured: true,
      propertyId: propertyId!,
      status: 'live',
      dateRange,
      summary: {
        totalUsers,
        activeUsers,
        newUsers,
        returningUsers,
        sessions,
        pageViews,
        avgEngagementTimeSec,
      },
      usersOverTime,
      topPages,
      caseStudies,
      trafficSources,
      geography: {
        countries,
        regions: [],
        cities,
      },
      devices,
      browsers,
      operatingSystems,
      events,
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('GA4 API Error:', error)
    return NextResponse.json(
      getDemoAnalyticsData(dateRange, `GA4 API Error: ${error.message || 'Failed to fetch live GA4 data.'}`)
    )
  }
}

// Fallback preview generator when credentials are not configured yet
function getDemoAnalyticsData(dateRange: { startDate: string; endDate: string; rangeKey: string }, message: string): AnalyticsReportResponse {
  return {
    configured: false,
    propertyId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null,
    status: 'demo_mode',
    message,
    dateRange,
    summary: {
      totalUsers: 1420,
      activeUsers: 1280,
      newUsers: 940,
      returningUsers: 340,
      sessions: 2150,
      pageViews: 4890,
      avgEngagementTimeSec: 142,
    },
    usersOverTime: [
      { date: '2026-09-24', activeUsers: 110, pageViews: 340 },
      { date: '2026-09-25', activeUsers: 145, pageViews: 410 },
      { date: '2026-09-26', activeUsers: 130, pageViews: 380 },
      { date: '2026-09-27', activeUsers: 95, pageViews: 290 },
      { date: '2026-09-28', activeUsers: 180, pageViews: 520 },
      { date: '2026-09-29', activeUsers: 210, pageViews: 640 },
      { date: '2026-09-30', activeUsers: 240, pageViews: 710 },
    ],
    topPages: [
      { path: '/', title: 'IdentifYou Technologies — Deep Tech. Built Around Business.', pageViews: 1850, activeUsers: 980 },
      { path: '/deep-tech/vision-ai', title: 'Vision AI & Inspection — IdentifYou', pageViews: 820, activeUsers: 490 },
      { path: '/case-studies', title: 'Case Studies & Success Stories — IdentifYou', pageViews: 640, activeUsers: 410 },
      { path: '/contact', title: 'Contact Us — IdentifYou Technologies', pageViews: 510, activeUsers: 380 },
      { path: '/case-studies/industrial-ai-inspection', title: 'AI Visual Inspection in Manufacturing', pageViews: 390, activeUsers: 290 },
      { path: '/deep-tech/industry-automation', title: 'Industry Automation Solutions', pageViews: 310, activeUsers: 220 },
    ],
    caseStudies: [
      { path: '/case-studies/industrial-ai-inspection', title: 'AI Visual Inspection in Manufacturing', views: 390 },
      { path: '/case-studies/predictive-maintenance', title: 'Predictive Maintenance Engine', views: 250 },
    ],
    trafficSources: [
      { source: 'google', medium: 'organic', users: 680, sessions: 990 },
      { source: '(direct)', medium: '(none)', users: 340, sessions: 520 },
      { source: 'linkedin.com', medium: 'referral', users: 180, sessions: 290 },
      { source: 'twitter.com', medium: 'referral', users: 80, sessions: 130 },
    ],
    geography: {
      countries: [
        { country: 'India', users: 740, pageViews: 2450 },
        { country: 'United Kingdom', users: 290, pageViews: 1120 },
        { country: 'United States', users: 180, pageViews: 780 },
        { country: 'Germany', users: 70, pageViews: 240 },
      ],
      regions: [],
      cities: [
        { city: 'Madurai', country: 'India', users: 320 },
        { city: 'London', country: 'United Kingdom', users: 210 },
        { city: 'Bengaluru', country: 'India', users: 190 },
        { city: 'San Jose', country: 'United States', users: 95 },
      ],
    },
    devices: [
      { deviceCategory: 'desktop', users: 890, percentage: 70 },
      { deviceCategory: 'mobile', users: 350, percentage: 27 },
      { deviceCategory: 'tablet', users: 40, percentage: 3 },
    ],
    browsers: [
      { browser: 'Chrome', users: 780 },
      { browser: 'Safari', users: 290 },
      { browser: 'Edge', users: 140 },
      { browser: 'Firefox', users: 70 },
    ],
    operatingSystems: [
      { os: 'Windows', users: 610 },
      { os: 'macOS', users: 310 },
      { os: 'iOS', users: 210 },
      { os: 'Android', users: 150 },
    ],
    events: [
      { eventName: 'page_view', count: 4890 },
      { eventName: 'generate_lead', count: 42 },
      { eventName: 'select_interest_path', count: 185 },
      { eventName: 'cta_click', count: 320 },
      { eventName: 'whatsapp_click', count: 88 },
      { eventName: 'scroll_50', count: 1240 },
      { eventName: 'scroll_90', count: 650 },
      { eventName: 'external_link_click', count: 54 },
    ],
  }
}
