'use client'

import { useEffect } from 'react'

/**
 * GlobalThemeEnforcer ensures the chosen theme (dark/light)
 * is persistently and uniformly applied across 100% of admin pages.
 */
export function GlobalThemeEnforcer() {
  useEffect(() => {
    // 1. Read stored theme from cookie or localStorage
    const getStoredTheme = (): 'light' | 'dark' => {
      try {
        const match = document.cookie.match(/(?:^|;\s*)payload-theme=(light|dark)(?:;|$)/)
        if (match) return match[1] as 'light' | 'dark'
        const ls = localStorage.getItem('payload-theme')
        if (ls === 'light' || ls === 'dark') return ls
      } catch {}
      return 'dark'
    }

    const applyTheme = (t: 'light' | 'dark') => {
      document.documentElement.setAttribute('data-theme', t)
      document.cookie = `payload-theme=${t};path=/;max-age=31536000;SameSite=Lax`
      try {
        localStorage.setItem('payload-theme', t)
      } catch {}
    }

    const current = getStoredTheme()
    applyTheme(current)

    // Mutation observer to maintain data-theme if any router reset attempts to strip it
    const observer = new MutationObserver(() => {
      const active = document.documentElement.getAttribute('data-theme')
      const target = getStoredTheme()
      if (active !== target) {
        document.documentElement.setAttribute('data-theme', target)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return null
}

