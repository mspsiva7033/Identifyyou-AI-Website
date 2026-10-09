'use client'

import React, { useState, useEffect } from 'react'
import styles from './AnalyticsView.module.css'

interface AnalyticsData {
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
  realtime?: {
    activeVisitorsNow: number
    recentEvents: Array<{
      id: string
      eventName: string
      path: string
      title: string
      deviceCategory: string
      browser: string
      os: string
      country: string
      createdAt: string
    }>
  }
  funnel?: {
    totalVisitors: number
    caseStudyReaders: number
    leadsGenerated: number
    conversionRate: number
  }
  hardwareAndLocale?: {
    languages: Array<{ language: string; count: number; percentage: number }>
    timezones: Array<{ timezone: string; count: number }>
    screens: Array<{ resolution: string; count: number }>
    theme: { dark: number; light: number }
  }
  landingPages?: Array<{ path: string; count: number }>
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

export function AnalyticsView() {
  const [range, setRange] = useState<'today' | '7d' | '30d' | '90d' | 'custom'>('30d')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      let url = `/api/admin/analytics?range=${range}`
      if (range === 'custom' && customStart && customEnd) {
        url += `&startDate=${customStart}&endDate=${customEnd}`
      }
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Auto-refresh real-time numbers every 30 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 30000)
    return () => clearInterval(interval)
  }, [range])

  const handleExportCSV = () => {
    if (!data) return
    const rows: string[][] = [
      ['IdentifYou Analytics Export Report', `Range: ${data.dateRange.rangeKey}`],
      ['Generated At', new Date().toISOString()],
      ['Status', data.status],
      [],
      ['KPI Metrics', 'Value'],
      ['Total Users', String(data.summary.totalUsers)],
      ['Active Users', String(data.summary.activeUsers)],
      ['New Users', String(data.summary.newUsers)],
      ['Returning Users', String(data.summary.returningUsers)],
      ['Sessions', String(data.summary.sessions)],
      ['Page Views', String(data.summary.pageViews)],
      ['Avg Engagement Time (sec)', String(data.summary.avgEngagementTimeSec)],
      [],
      ['B2B Conversion Funnel', 'Count'],
      ['Total Visitors', String(data.funnel?.totalVisitors || data.summary.totalUsers)],
      ['Case Study Readers', String(data.funnel?.caseStudyReaders || 0)],
      ['Leads Generated', String(data.funnel?.leadsGenerated || 0)],
      ['Conversion Rate (%)', `${data.funnel?.conversionRate || 0}%`],
      [],
      ['Top Visited Pages', 'Pageviews', 'Active Users'],
      ...data.topPages.map((p) => [p.path, String(p.pageViews), String(p.activeUsers)]),
      [],
      ['Traffic Sources', 'Medium', 'Active Users', 'Sessions'],
      ...data.trafficSources.map((s) => [s.source, s.medium, String(s.users), String(s.sessions)]),
      [],
      ['Geographic Countries', 'Active Users', 'Pageviews'],
      ...data.geography.countries.map((c) => [c.country, String(c.users), String(c.pageViews)]),
      [],
      ['Tracked Events', 'Event Count'],
      ...data.events.map((e) => [e.eventName, String(e.count)]),
    ]

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute(
      'download',
      `identifYou_analytics_${data.dateRange.rangeKey}_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatSecs = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const s = sec % 60
    return mins > 0 ? `${mins}m ${s}s` : `${s}s`
  }

  const formatTimeAgo = (isoDate: string) => {
    try {
      const diffMs = Date.now() - new Date(isoDate).getTime()
      const diffSec = Math.floor(diffMs / 1000)
      if (diffSec < 60) return 'Just now'
      const diffMin = Math.floor(diffSec / 60)
      if (diffMin < 60) return `${diffMin}m ago`
      const diffHr = Math.floor(diffMin / 60)
      return `${diffHr}h ago`
    } catch {
      return ''
    }
  }

  const getEventIcon = (eventName: string) => {
    switch (eventName) {
      case 'pageview':
        return '📄'
      case 'generate_lead':
        return '🎯'
      case 'view_case_study':
        return '💼'
      case 'cta_click':
        return '🖱️'
      case 'whatsapp_click':
        return '💬'
      case 'file_download':
        return '📥'
      default:
        return '⚡'
    }
  }

  return (
    <div className={styles.container}>
      {/* Header bar */}
      <div className={styles.header}>
        <div>
          <div className={styles.badgeRow}>
            <span className={styles.tag}>IdentifYou Admin</span>
            {data?.status === 'live' ? (
              <span className={`${styles.statusBadge} ${styles.statusLive}`}>
                <span className={styles.pulseDot} /> Live In-App Analytics (PostgreSQL)
              </span>
            ) : (
              <span className={`${styles.statusBadge} ${styles.statusDemo}`}>
                ℹ Live Analytics Active
              </span>
            )}
            {/* Real-time online counter */}
            <div className={styles.realtimeBadge}>
              <span className={styles.realtimePulse} />
              <span>
                <strong>{data?.realtime?.activeVisitorsNow || 0}</strong> active now
              </span>
            </div>
          </div>
          <h1 className={styles.title}>Website Analytics Dashboard</h1>
          <p className={styles.subtitle}>
            Privacy-friendly real-time website traffic, user interactions, and performance metrics
            stored directly in your PostgreSQL database.
          </p>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className={styles.select}
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Date Range</option>
          </select>

          {range === 'custom' && (
            <div className={styles.customDates}>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className={styles.dateInput}
              />
              <span className={styles.dateSep}>to</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className={styles.dateInput}
              />
              <button onClick={fetchData} className={styles.applyBtn}>
                Apply
              </button>
            </div>
          )}

          <button
            onClick={fetchData}
            className={styles.refreshBtn}
            title="Refresh Analytics Data"
          >
            🔄 {loading ? 'Loading...' : 'Refresh'}
          </button>

          <button
            onClick={handleExportCSV}
            className={styles.applyBtn}
            title="Export Report as CSV"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Users</div>
          <div className={styles.kpiValue}>
            {data?.summary.totalUsers.toLocaleString() || 0}
          </div>
          <div className={styles.kpiSub}>Visitors across selected period</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Active Users</div>
          <div className={styles.kpiValue}>
            {data?.summary.activeUsers.toLocaleString() || 0}
          </div>
          <div className={styles.kpiSub}>Engaged site visitors</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>New Users</div>
          <div className={styles.kpiValue}>{data?.summary.newUsers.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>First-time website visits</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Pageviews</div>
          <div className={styles.kpiValue}>
            {data?.summary.pageViews.toLocaleString() || 0}
          </div>
          <div className={styles.kpiSub}>Pages viewed by visitors</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Sessions</div>
          <div className={styles.kpiValue}>
            {data?.summary.sessions.toLocaleString() || 0}
          </div>
          <div className={styles.kpiSub}>Visitor browsing sessions</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Avg. Engagement Time</div>
          <div className={styles.kpiValue}>
            {formatSecs(data?.summary.avgEngagementTimeSec || 0)}
          </div>
          <div className={styles.kpiSub}>Average active user time</div>
        </div>
      </div>

      {/* B2B Lead Conversion Funnel */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>
              🎯 B2B Lead Acquisition & Conversion Funnel
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
              Tracks prospective enterprise clients from initial visit through case study engagement to qualified contact form submission.
            </p>
          </div>
          <div style={{ background: '#eef2ff', color: '#4338ca', padding: '6px 14px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem' }}>
            ⚡ {data?.funnel?.conversionRate || 0}% Conversion Rate
          </div>
        </div>

        <div className={styles.funnelContainer}>
          <div className={styles.funnelStep}>
            <div className={styles.funnelStepHeader}>
              <span className={styles.funnelStepLabel}>1. Total Website Visitors</span>
              <span className={styles.funnelStepNum}>Stage 1</span>
            </div>
            <div className={styles.funnelStepValue}>
              {(data?.funnel?.totalVisitors || data?.summary.totalUsers || 0).toLocaleString()}
            </div>
            <div className={styles.funnelStepSub}>Total unique prospect visits</div>
          </div>

          <div className={styles.funnelStep}>
            <div className={styles.funnelStepHeader}>
              <span className={styles.funnelStepLabel}>2. Case Study Readers</span>
              <span className={styles.funnelStepNum}>Stage 2</span>
            </div>
            <div className={styles.funnelStepValue}>
              {(data?.funnel?.caseStudyReaders || 0).toLocaleString()}
            </div>
            <div className={styles.funnelStepSub}>
              {data?.funnel?.totalVisitors
                ? `${Math.round(((data.funnel.caseStudyReaders || 0) / data.funnel.totalVisitors) * 100)}% of visitors read technical case studies`
                : 'High-intent technical evaluations'}
            </div>
          </div>

          <div className={styles.funnelStep} style={{ borderLeft: '4px solid #10b981' }}>
            <div className={styles.funnelStepHeader}>
              <span className={styles.funnelStepLabel}>3. Inquiries & Leads</span>
              <span className={styles.funnelStepNum} style={{ background: '#dcfce7', color: '#15803d' }}>
                Converted
              </span>
            </div>
            <div className={styles.funnelStepValue} style={{ color: '#059669' }}>
              {(data?.funnel?.leadsGenerated || 0).toLocaleString()}
            </div>
            <div className={styles.funnelStepSub}>Contact form & RFP submissions</div>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>📈 Users & Page Views Over Time</h3>
        {data?.usersOverTime && data.usersOverTime.length > 0 ? (
          <div className={styles.chartContainer}>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.colorDot} style={{ background: '#3b82f6' }} /> Active Users
              </span>
              <span className={styles.legendItem}>
                <span className={styles.colorDot} style={{ background: '#10b981' }} /> Page Views
              </span>
            </div>
            <div className={styles.barChart}>
              {data.usersOverTime.map((pt, idx) => {
                const maxVal = Math.max(
                  ...data.usersOverTime.map((d) => Math.max(d.activeUsers, d.pageViews, 1))
                )
                const uHeight = Math.max(8, (pt.activeUsers / maxVal) * 120)
                const pvHeight = Math.max(8, (pt.pageViews / maxVal) * 120)

                return (
                  <div key={idx} className={styles.barGroup}>
                    <div className={styles.bars}>
                      <div
                        className={styles.userBar}
                        style={{ height: `${uHeight}px` }}
                        title={`Users: ${pt.activeUsers}`}
                      />
                      <div
                        className={styles.pvBar}
                        style={{ height: `${pvHeight}px` }}
                        title={`Pageviews: ${pt.pageViews}`}
                      />
                    </div>
                    <div className={styles.barDate}>
                      {pt.date.split('-').slice(1).join('/')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>No timeline data available for this range.</div>
        )}
      </div>

      {/* Live Recent Activity Feed */}
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 className={styles.cardTitle} style={{ margin: 0 }}>
            ⚡ Live Activity Stream (Recent Events)
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Auto-updates every 30s</span>
        </div>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
          Real-time stream of visitors browsing, reading case studies, and interacting with the website.
        </p>

        {data?.realtime?.recentEvents && data.realtime.recentEvents.length > 0 ? (
          <div className={styles.liveFeedList}>
            {data.realtime.recentEvents.map((ev) => (
              <div key={ev.id} className={styles.liveFeedItem}>
                <div className={styles.liveFeedLeft}>
                  <span className={styles.liveEventIcon}>{getEventIcon(ev.eventName)}</span>
                  <div className={styles.liveFeedContent}>
                    <span className={styles.liveFeedPath} title={ev.path}>
                      {ev.path}
                    </span>
                    <span className={styles.liveFeedTitle}>
                      {ev.title || ev.eventName}
                    </span>
                  </div>
                </div>

                <div className={styles.liveFeedRight}>
                  <span className={styles.liveFeedBadge}>
                    {ev.deviceCategory === 'mobile' ? '📱 Mobile' : '💻 Desktop'} &bull; {ev.browser}
                  </span>
                  <span className={styles.liveFeedBadge} style={{ background: '#f1f5f9' }}>
                    🌐 {ev.country}
                  </span>
                  <span className={styles.liveFeedTime}>
                    {formatTimeAgo(ev.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            No live events recorded yet. Browse around the website in another tab to see real-time events appear!
          </div>
        )}
      </div>

      {/* Grid: Top Pages & Traffic Sources */}
      <div className={styles.grid2}>
        {/* Top Pages */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📄 Most Visited Pages</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Page Path</th>
                  <th>Pageviews</th>
                  <th>Active Users</th>
                </tr>
              </thead>
              <tbody>
                {data?.topPages.map((page, i) => (
                  <tr key={i}>
                    <td className={styles.pathCell} title={page.title}>
                      <span className={styles.pagePath}>{page.path}</span>
                      <span className={styles.pageTitle}>{page.title}</span>
                    </td>
                    <td>
                      <strong>{page.pageViews.toLocaleString()}</strong>
                    </td>
                    <td>{page.activeUsers.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🧭 Traffic Channels & Sources</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Source / Medium</th>
                  <th>Users</th>
                  <th>Sessions</th>
                </tr>
              </thead>
              <tbody>
                {data?.trafficSources.map((src, i) => (
                  <tr key={i}>
                    <td>
                      <span className={styles.sourceTag}>{src.source}</span> / {src.medium}
                    </td>
                    <td>
                      <strong>{src.users.toLocaleString()}</strong>
                    </td>
                    <td>{src.sessions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid: Geography & Device Breakdown */}
      <div className={styles.grid2}>
        {/* Geography */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🌍 Visitor Location & Geography</h3>
          <div className={styles.locationSection}>
            <h4 className={styles.subHeading}>Top Countries</h4>
            <div className={styles.progressList}>
              {data?.geography.countries.map((c, i) => {
                const maxCount = data.geography.countries[0]?.users || 1
                const pct = Math.round((c.users / maxCount) * 100)
                return (
                  <div key={i} className={styles.progressItem}>
                    <div className={styles.progressHeader}>
                      <span>🌐 {c.country}</span>
                      <strong>{c.users.toLocaleString()} users</strong>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${pct}%`, background: '#3b82f6' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Devices & Events */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📱 Devices & User Event Interactions</h3>

          <h4 className={styles.subHeading}>Device Categories</h4>
          <div className={styles.progressList}>
            {data?.devices.map((d, i) => (
              <div key={i} className={styles.progressItem}>
                <div className={styles.progressHeader}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {d.deviceCategory === 'desktop'
                      ? '💻'
                      : d.deviceCategory === 'mobile'
                      ? '📱'
                      : '📟'}{' '}
                    {d.deviceCategory}
                  </span>
                  <strong>
                    {d.percentage}% ({d.users} users)
                  </strong>
                </div>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${d.percentage}%`, background: '#10b981' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h4 className={styles.subHeading} style={{ marginTop: '20px' }}>
            Tracked User Events
          </h4>
          <div className={styles.eventGrid}>
            {data?.events.map((ev, i) => (
              <div key={i} className={styles.eventItem}>
                <span className={styles.eventName}>{ev.eventName}</span>
                <span className={styles.eventCount}>{ev.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Hardware, Displays, Global Locales & Landing Pages */}
      <div className={styles.grid2}>
        {/* Hardware, Displays & Locales */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💻 Client Hardware, Displays & Global Locales</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
            Captured automatically using 100% free standard browser APIs (zero paid third-party lookups).
          </p>

          <div className={styles.specGrid}>
            {/* Languages */}
            <div className={styles.specCard}>
              <div className={styles.specCardTitle}>🌐 Browser Languages</div>
              {data?.hardwareAndLocale?.languages && data.hardwareAndLocale.languages.length > 0 ? (
                data.hardwareAndLocale.languages.map((l, i) => (
                  <div key={i} className={styles.specItem}>
                    <span className={styles.specItemKey}>{l.language}</span>
                    <span className={styles.specItemVal}>{l.percentage}% ({l.count})</span>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No language data recorded.</div>
              )}
            </div>

            {/* Screen Resolutions */}
            <div className={styles.specCard}>
              <div className={styles.specCardTitle}>🖥️ Screen Resolutions</div>
              {data?.hardwareAndLocale?.screens && data.hardwareAndLocale.screens.length > 0 ? (
                data.hardwareAndLocale.screens.map((s, i) => (
                  <div key={i} className={styles.specItem}>
                    <span className={styles.specItemKey}>{s.resolution}</span>
                    <span className={styles.specItemVal}>{s.count} users</span>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No screen data recorded.</div>
              )}
            </div>

            {/* Timezones */}
            <div className={styles.specCard}>
              <div className={styles.specCardTitle}>⏰ Visitor Timezones</div>
              {data?.hardwareAndLocale?.timezones && data.hardwareAndLocale.timezones.length > 0 ? (
                data.hardwareAndLocale.timezones.map((tz, i) => (
                  <div key={i} className={styles.specItem}>
                    <span className={styles.specItemKey} title={tz.timezone}>{tz.timezone.replace('_', ' ')}</span>
                    <span className={styles.specItemVal}>{tz.count}</span>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No timezone data recorded.</div>
              )}
            </div>

            {/* Color Theme Preference */}
            <div className={styles.specCard}>
              <div className={styles.specCardTitle}>🌓 Color Theme Preference</div>
              {data?.hardwareAndLocale?.theme ? (
                <div>
                  <div className={styles.themeBar}>
                    <div style={{ width: `${Math.round((data.hardwareAndLocale.theme.dark / Math.max(1, data.hardwareAndLocale.theme.dark + data.hardwareAndLocale.theme.light)) * 100)}%`, background: '#1e293b' }} />
                    <div style={{ width: `${Math.round((data.hardwareAndLocale.theme.light / Math.max(1, data.hardwareAndLocale.theme.dark + data.hardwareAndLocale.theme.light)) * 100)}%`, background: '#94a3b8' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                    <span>🌙 Dark: {data.hardwareAndLocale.theme.dark}</span>
                    <span>☀️ Light: {data.hardwareAndLocale.theme.light}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.empty}>No theme data recorded.</div>
              )}
            </div>
          </div>
        </div>

        {/* Landing Pages */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🚪 Top Landing Pages (First Touch)</h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
            The initial entry URL where visitors entered your site before exploring other sections.
          </p>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Landing Path</th>
                  <th>Entry Sessions</th>
                </tr>
              </thead>
              <tbody>
                {data?.landingPages && data.landingPages.length > 0 ? (
                  data.landingPages.map((lp, i) => (
                    <tr key={i}>
                      <td><span className={styles.pagePath}>{lp.path}</span></td>
                      <td><strong>{lp.count.toLocaleString()}</strong></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className={styles.empty}>No landing page data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
