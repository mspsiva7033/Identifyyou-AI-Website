'use client'

import React, { useState, useEffect } from 'react'
import styles from './CookieConsent.module.css'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const consent = localStorage.getItem('iy_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('iy_cookie_consent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('iy_cookie_consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <span className={styles.icon}>🍪</span>
        <div className={styles.textGroup}>
          <strong className={styles.title}>Privacy & Analytics Preferences</strong>
          <p className={styles.desc}>
            We use anonymized cookies to improve website performance, understand user geography, and measure case study engagement.
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleDecline} className={styles.declineBtn}>
          Essential Only
        </button>
        <button onClick={handleAccept} className={styles.acceptBtn}>
          Accept All
        </button>
      </div>
    </div>
  )
}
