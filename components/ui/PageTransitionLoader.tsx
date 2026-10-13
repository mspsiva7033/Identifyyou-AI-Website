'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import styles from './PageTransitionLoader.module.css'

export function PageTransitionLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Smoothly fade out loader when pathname or search parameters update
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 180)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement
      if (!target || !target.href) return

      try {
        const targetUrl = new URL(target.href, window.location.href)
        const currentUrl = new URL(window.location.href)

        // Only trigger loader if navigating to a different internal route
        const isInternal = targetUrl.origin === currentUrl.origin
        const isDifferentPath =
          targetUrl.pathname !== currentUrl.pathname ||
          targetUrl.search !== currentUrl.search

        // Ignore hash-only, target="_blank", or download links
        const isSamePageAnchor =
          targetUrl.pathname === currentUrl.pathname && targetUrl.hash !== ''
        const isNewTab = target.target === '_blank'

        if (isInternal && isDifferentPath && !isSamePageAnchor && !isNewTab) {
          setIsLoading(true)
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    }

    const attachListeners = () => {
      const anchors = document.querySelectorAll('a[href]')
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener)
        anchor.addEventListener('click', handleAnchorClick as EventListener)
      })
    }

    // Initial attach
    attachListeners()

    // MutationObserver to attach to dynamically rendered links
    const observer = new MutationObserver(() => {
      attachListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    const handlePopState = () => {
      setIsLoading(true)
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      observer.disconnect()
      window.removeEventListener('popstate', handlePopState)
      const anchors = document.querySelectorAll('a[href]')
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener)
      })
    }
  }, [])

  return (
    <div
      className={`${styles.loaderOverlay} ${isLoading ? styles.visible : ''}`}
      aria-hidden={!isLoading}
      aria-live="polite"
    >
      <div className={styles.loaderContent}>
        <div className={styles.logoRingWrapper}>
          <div className={styles.spinnerRing} />
          <div className={styles.innerPulseRing} />
          <img
            src="/images/identifyou-logo.png"
            alt="IdentifYou Loading"
            width="160"
            height="40"
            className={styles.logoImg}
          />
        </div>
      </div>
    </div>
  )
}
