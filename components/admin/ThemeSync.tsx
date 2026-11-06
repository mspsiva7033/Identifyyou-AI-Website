'use client'

import { useEffect, useRef } from 'react'
import { useAuth, useTheme } from '@payloadcms/ui'

export function ThemeSync() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const appliedRef = useRef<string | null>(null)

  useEffect(() => {
    const pref = (user as any)?.themePreference
    if (pref && pref !== appliedRef.current) {
      appliedRef.current = pref
      if (pref !== theme) {
        setTheme(pref)
      }
    }
  }, [user, theme, setTheme])

  return null
}

