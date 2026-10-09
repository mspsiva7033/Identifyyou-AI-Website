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
            padding: '9px 18px',
            background: 'linear-gradient(135deg, #96c73d 0%, #82b032 100%)',
            color: '#090E0C',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(150, 199, 61, 0.25)',
          }}
        >
          Open Analytics Dashboard &rarr;
        </Link>
      </div>

      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(150, 199, 61, 0.2)',
          }}
        >
          <div style={{ background: '#141F1B', border: '1px solid rgba(150, 199, 61, 0.2)', padding: '14px 16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A6B4AD', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Active Visitors
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F0F5F2', marginTop: '4px' }}>
              {stats.activeUsers.toLocaleString()}
            </div>
          </div>
          <div style={{ background: '#141F1B', border: '1px solid rgba(150, 199, 61, 0.2)', padding: '14px 16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A6B4AD', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Page Views
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F0F5F2', marginTop: '4px' }}>
              {stats.pageViews.toLocaleString()}
            </div>
          </div>
          <div style={{ background: '#141F1B', border: '1px solid rgba(150, 199, 61, 0.2)', padding: '14px 16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#96c73d', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Leads Acquired
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#96c73d', marginTop: '4px' }}>
              {stats.leadsGenerated.toLocaleString()}
            </div>
          </div>
          <div style={{ background: '#141F1B', border: '1px solid rgba(150, 199, 61, 0.2)', padding: '14px 16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#A6B4AD', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              Engine Status
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#96c73d', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🟢 Live Active
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
