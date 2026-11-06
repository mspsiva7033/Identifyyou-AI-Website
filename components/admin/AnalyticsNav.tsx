'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth, useTheme } from '@payloadcms/ui'
import { ThemeSync } from './ThemeSync'

export function AnalyticsNav() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const active = document.documentElement.getAttribute('data-theme')
    if (active === 'light' || active === 'dark') {
      setCurrentTheme(active)
    } else if (theme === 'light' || theme === 'dark') {
      setCurrentTheme(theme)
    }
  }, [theme])

  const toggleTheme = async () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setCurrentTheme(nextTheme)
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)

    if (user?.id) {
      try {
        await fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themePreference: nextTheme }),
        })
      } catch (err) {
        console.warn('Could not save theme preference to user profile:', err)
      }
    }
  }

  return (
    <>
      <ThemeSync />
      <div style={{ padding: '8px 16px', margin: '4px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

        {/* 1-Click Instant Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--theme-border-color, rgba(150, 199, 61, 0.2))',
            color: 'var(--theme-text, #F0F5F2)',
            background: 'var(--theme-elevation-100, #101815)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={`Currently in ${currentTheme} mode. Click to switch.`}
        >
          <span>{currentTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
          <span
            style={{
              fontSize: '0.72rem',
              opacity: 0.85,
              padding: '2px 8px',
              background: 'var(--theme-elevation-200, #192722)',
              borderRadius: '4px',
              border: '1px solid var(--theme-border-color, rgba(150, 199, 61, 0.2))',
            }}
          >
            Switch
          </span>
        </button>
      </div>
    </>
  )
}
