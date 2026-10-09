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

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `identifYou_analytics_${data.dateRange.rangeKey}_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatSecs = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const s = sec % 60
    return mins > 0 ? `${mins}m ${s}s` : `${s}s`
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
                <span className={styles.pulseDot} /> Live GA4 API Connected
              </span>
            ) : (
              <span className={`${styles.statusBadge} ${styles.statusDemo}`}>
                ℹ Demo Preview Mode
              </span>
            )}
          </div>
          <h1 className={styles.title}>Google Analytics 4 Dashboard</h1>
          <p className={styles.subtitle}>
            Real-time website traffic, user interactions, geography, and performance metrics.
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

          <button onClick={fetchData} className={styles.refreshBtn} title="Refresh Analytics Data">
            🔄 {loading ? 'Loading...' : 'Refresh'}
          </button>

          <button onClick={handleExportCSV} className={styles.applyBtn} title="Export Report as CSV">
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Configuration notice banner if credentials missing */}
      {data && !data.configured && (
        <div className={styles.configNotice}>
          <div className={styles.noticeIcon}>⚙️</div>
          <div className={styles.noticeText}>
            <strong>Setup Live Umami Analytics Reporting:</strong>
            <p>
              To enable 100% open-source, privacy-first analytics, add your Umami Website ID to your <code>.env.local</code>:
            </p>
            <pre className={styles.envCode}>
              NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-website-id{"\n"}
              NEXT_PUBLIC_UMAMI_HOST_URL=http://YOUR_VPS_IP:3001
            </pre>
          </div>
        </div>
      )}

      {/* Main Stats KPIs */}
      <div className={styles.statsGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Users</div>
          <div className={styles.kpiValue}>{data?.summary.totalUsers.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>Visitors across selected period</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Active Users</div>
          <div className={styles.kpiValue}>{data?.summary.activeUsers.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>Engaged site visitors</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>New Users</div>
          <div className={styles.kpiValue}>{data?.summary.newUsers.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>First-time website visits</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Pageviews</div>
          <div className={styles.kpiValue}>{data?.summary.pageViews.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>Pages viewed by visitors</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Sessions</div>
          <div className={styles.kpiValue}>{data?.summary.sessions.toLocaleString() || 0}</div>
          <div className={styles.kpiSub}>Visitor browsing sessions</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Avg. Engagement Time</div>
          <div className={styles.kpiValue}>{formatSecs(data?.summary.avgEngagementTimeSec || 0)}</div>
          <div className={styles.kpiSub}>Average active user time</div>
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
                const maxVal = Math.max(...data.usersOverTime.map((d) => Math.max(d.activeUsers, d.pageViews, 1)))
                const uHeight = Math.max(8, (pt.activeUsers / maxVal) * 120)
                const pvHeight = Math.max(8, (pt.pageViews / maxVal) * 120)

                return (
                  <div key={idx} className={styles.barGroup}>
                    <div className={styles.bars}>
                      <div className={styles.userBar} style={{ height: `${uHeight}px` }} title={`Users: ${pt.activeUsers}`} />
                      <div className={styles.pvBar} style={{ height: `${pvHeight}px` }} title={`Pageviews: ${pt.pageViews}`} />
                    </div>
                    <div className={styles.barDate}>{pt.date.split('-').slice(1).join('/')}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>No timeline data available for this range.</div>
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
                    <td><strong>{page.pageViews.toLocaleString()}</strong></td>
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
                    <td><strong>{src.users.toLocaleString()}</strong></td>
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
                      <span>{c.country}</span>
                      <strong>{c.users.toLocaleString()} users</strong>
                    </div>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: `${pct}%`, background: '#3b82f6' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <h4 className={styles.subHeading} style={{ marginTop: '20px' }}>Top Cities</h4>
            <div className={styles.pillGrid}>
              {data?.geography.cities.map((city, i) => (
                <div key={i} className={styles.cityPill}>
                  <span>📍 {city.city} ({city.country})</span>
                  <strong>{city.users} users</strong>
                </div>
              ))}
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
                    {d.deviceCategory === 'desktop' ? '💻' : d.deviceCategory === 'mobile' ? '📱' : '📟'} {d.deviceCategory}
                  </span>
                  <strong>{d.percentage}% ({d.users} users)</strong>
                </div>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: `${d.percentage}%`, background: '#10b981' }} />
                </div>
              </div>
            ))}
          </div>

          <h4 className={styles.subHeading} style={{ marginTop: '20px' }}>Tracked User Events</h4>
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
    </div>
  )
}
