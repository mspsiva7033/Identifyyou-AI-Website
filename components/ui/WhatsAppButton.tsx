'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import styles from './WhatsAppButton.module.css'

export function WhatsAppButton() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919597046682'
  const message = encodeURIComponent('Hello IdentifYou Technologies, I would like to inquire about your Deep Tech & Industrial AI solutions.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      aria-label="Chat on WhatsApp with IdentifYou Technologies"
      title="Chat with us on WhatsApp"
    >
      <svg className={styles.icon} viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.4a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.4 1.1 1.2-4.3-.3-.4a11.5 11.5 0 1 1 9.8 5.4zm6.5-8.5c-.35-.18-2.07-1.02-2.39-1.14s-.55-.18-.79.18-.9 1.14-1.1 1.38-.41.27-.76.09a9.6 9.6 0 0 1-2.82-1.74 10.6 10.6 0 0 1-1.95-2.43c-.2-.36-.02-.55.16-.73.16-.16.36-.42.54-.63a2.4 2.4 0 0 0 .36-.6.67.67 0 0 0-.03-.63c-.09-.18-.79-1.9-.1-2.61-.31-.7-.63-.6-.86-.6h-.73c-.25 0-.66.09-1 .47A4.24 4.24 0 0 0 6.6 12a7.37 7.37 0 0 0 1.54 3.9 16.8 16.8 0 0 0 6.45 5.7c.92.4 1.83.7 2.48.91a6 6 0 0 0 2.74.17 4.5 4.5 0 0 0 2.96-2.08 3.6 3.6 0 0 0 .25-2.08c-.1-.18-.36-.27-.71-.45z" />
      </svg>
      <span className={styles.tooltip}>Talk on WhatsApp</span>
    </a>
  )
}
