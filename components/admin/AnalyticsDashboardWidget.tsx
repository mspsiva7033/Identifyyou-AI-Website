'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export function AnalyticsDashboardWidget() {
  const [stats, setStats] = useState<{
    activeUsers: number
    pageViews: number
    sessions: number
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
            sessions: data.summary.sessions,
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
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Website Traffic & Analytics (Last 30 Days)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--theme-elevation-500, #64748b)' }}>
            Track visitors, locations, case study views, and user interactions.
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
          View Full Analytics Dashboard →
        </Link>
      </div>

      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--theme-elevation-100, #f1f5f9)',
          }}
        >
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              Active Users
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
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              Total Sessions
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              {stats.sessions.toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'var(--theme-elevation-50, #f8fafc)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
              GA4 Status
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: stats.status === 'live' ? '#16a34a' : '#d97706', marginTop: '4px' }}>
              {stats.status === 'live' ? '🟢 Live Connected' : 'ℹ Demo Mode'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
