'use client'

import { useEffect, useRef } from 'react'
import { useAuth, useTheme } from '@payloadcms/ui'

export function ThemeSync() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const initializedRef = useRef<boolean>(false)

  useEffect(() => {
    if (initializedRef.current) return
    const pref = (user as any)?.themePreference
    if (pref === 'light' || pref === 'dark') {
      initializedRef.current = true
      let storedTheme: string | null = null
      try {
        const match = document.cookie.match(/(?:^|;\s*)payload-theme=(light|dark)(?:;|$)/)
        storedTheme = match ? match[1] : localStorage.getItem('payload-theme')
      } catch {}

      if (!storedTheme) {
        document.documentElement.setAttribute('data-theme', pref)
        document.cookie = `payload-theme=${pref};path=/;max-age=31536000;SameSite=Lax`
        try {
          localStorage.setItem('payload-theme', pref)
        } catch {}
        if (pref !== theme) {
          setTheme(pref)
        }
      }
    }
  }, [user, theme, setTheme])

  return null
}
