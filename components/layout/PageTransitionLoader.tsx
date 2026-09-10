'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './PageTransitionLoader.module.css'

export function PageTransitionLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const initialMount = useRef(true)

  // Track page transitions on route changes
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
      return
    }

    // Route change completed -> open top-bottom panels
    setIsClosed(true)
    const openTimer = setTimeout(() => {
      setIsOpening(true)
    }, 150)

    const hideTimer = setTimeout(() => {
      setIsLoading(false)
      setIsClosed(false)
      setIsOpening(false)
    }, 750)

    return () => {
      clearTimeout(openTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname, searchParams])

  // Listen to internal link clicks to trigger top-bottom closing transition
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Skip external links, anchors, new tabs
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.getAttribute('target') === '_blank'
      ) {
        return
      }

      // If navigating to a different page path
      const currentPath = window.location.pathname
      if (href !== currentPath) {
        setIsLoading(true)
        setIsOpening(false)
        // Trigger closing shutters
        requestAnimationFrame(() => {
          setIsClosed(true)
        })
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [])

  if (!isLoading) return null

  const containerStateClass = isOpening
    ? styles.open
    : isClosed
    ? styles.closed
    : ''

  return (
    <div className={`${styles.overlay} ${isLoading ? styles.overlayActive : ''} ${containerStateClass}`}>
      {/* Top Shutter */}
      <div className={styles.topPanel} />

      {/* Center Logo & Loader */}
      <div className={`${styles.centerContent} ${isClosed && !isOpening ? styles.centerContentVisible : ''}`}>
        <img
          src="/images/identifYou_logo.png"
          alt="IdentifYou Loading"
          className={styles.logoImg}
        />
        <div className={styles.loaderBox}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>Loading...</span>
        </div>
      </div>

      {/* Bottom Shutter */}
      <div className={styles.bottomPanel} />
    </div>
  )
}
