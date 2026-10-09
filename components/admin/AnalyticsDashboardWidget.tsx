'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export function AnalyticsDashboardWidget() {
  const [stats, setStats] = useState<{
    activeUsers: number
    pageViews: number
    leadsGenerated: number
    activeNow: number
    status: string
  } | null>(null)

  useEffect(() => {
    fetch('/api/admin/analytics?range=30d')
      .then((res) => res.json())
      .then((data) => {
        if (data?.summary) {
          setStats({
            activeUsers: data.summary.activeUsers,
            pageViews: data.summary.pageViews,
            leadsGenerated: data.funnel?.leadsGenerated || 0,
            activeNow: data.realtime?.activeVisitorsNow || 0,
            status: data.status,
          })
        }
      })
      .catch((err) => console.error('Failed to load widget analytics:', err))
  }, [])

  return (
    <div
      style={{
        marginBottom: '24px',
        padding: '20px 24px',
        background: 'var(--theme-elevation-0, #ffffff)',
        border: '1px solid var(--theme-elevation-150, #e2e8f0)',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: '#dcfce7',
                color: '#15803d',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              PostgreSQL In-App Engine
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                background: '#ecfdf5',
                color: '#065f46',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              🟢 {stats?.activeNow || 0} online now
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Website Traffic & Client Analytics
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
            Real-time prospect traffic, technical case study reads, and lead inquiries stored in your database.
          </p>
        </div>
        <Link
          href="/admin/analytics"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: '#2563eb',
            color: '#ffffff',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          Open Analytics Dashboard &rarr;
        </Link>
      </div>

      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--theme-elevation-100, #f1f5f9)',
          }}
        >
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              Active Visitors
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              {stats.activeUsers.toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              Page Views
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              {stats.pageViews.toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#16a34a', textTransform: 'uppercase' }}>
              Leads Acquired
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>
              {stats.leadsGenerated.toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              Engine Status
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a34a', marginTop: '6px' }}>
              🟢 Live Active
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
