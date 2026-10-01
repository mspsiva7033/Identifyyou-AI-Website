'use client'

import React from 'react'
import Link from 'next/link'

export function AnalyticsNav() {
  return (
    <div style={{ padding: '8px 16px', margin: '4px 0' }}>
      <Link
        href="/admin/analytics"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          borderRadius: '6px',
          color: 'var(--theme-elevation-800, #334155)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          background: 'var(--theme-elevation-50, rgba(0,0,0,0.03))',
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>📊</span>
        <span>Analytics</span>
      </Link>
    </div>
  )
}
