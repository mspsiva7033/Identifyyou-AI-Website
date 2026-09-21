'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './VideoModal.module.css'

interface VideoModalProps {
  videoSrc: string
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function VideoModal({ videoSrc, isOpen, onClose, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Auto-play when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.backdrop} onClick={handleClose} role="dialog" aria-modal="true" aria-label="Video Player">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.dot} />
            <span className={styles.title}>{title || 'IdentifYou Transformation'}</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Video */}
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )
}
