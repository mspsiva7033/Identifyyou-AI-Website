'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { trackContactFormSubmit, trackGAEvent, getStoredUTMs } from '@/lib/gtag'
import styles from './page.module.css'

const paths = [
  { id: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
  { id: 'supply-chain', label: 'Supply Chain & Procurement', icon: '🔗' },
  { id: 'vision-ai', label: 'Vision AI & Inspection', icon: '👁' },
  { id: 'ai-business', label: 'AI & Intelligent Business', icon: '🧠' },
  { id: 'data-engineering', label: 'Data Engineering', icon: '📊' },
  { id: 'digital-engineering', label: 'Digital Engineering', icon: '💻' },
  { id: 'not-sure', label: "I'm not sure — need guidance", icon: '❓' },
]

// Common free/personal email domains to block for work email validation
const freeEmailDomains = [
  'gmail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.in', 'hotmail.com', 'hotmail.co.uk',
  'outlook.com', 'live.com', 'icloud.com', 'me.com', 'aol.com', 'mail.com',
  'protonmail.com', 'proton.me', 'tutanota.com', 'zohomail.com', 'yandex.com',
  'rediffmail.com', 'gmx.com', 'inbox.com', 'fastmail.com', 'msn.com',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmailFormat(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

function isWorkEmail(email: string): boolean {
  if (!isValidEmailFormat(email)) return false
  const domain = email.split('@')[1]?.toLowerCase().trim()
  if (!domain) return false
  return !freeEmailDomains.includes(domain)
}

export default function ContactPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const formStarted = useRef(false)

  const handleInputFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true
      trackGAEvent('form_start', { category: 'Contact Form', label: 'Started typing' })
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForm((f) => ({ ...f, email: val }))
    if (!val) {
      setEmailError('')
    } else if (!isValidEmailFormat(val)) {
      setEmailError('Please enter a valid email address (e.g. name@company.com)')
    } else if (!isWorkEmail(val)) {
      setEmailError('Please use your work email address (not Gmail, Yahoo, Hotmail, etc.)')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmailFormat(form.email)) {
      setEmailError('Please enter a valid email address (e.g. name@company.com)')
      return
    }
    if (!isWorkEmail(form.email)) {
      setEmailError('Please use your work email address (not Gmail, Yahoo, Hotmail, etc.)')
      return
    }
    setLoading(true)
    trackContactFormSubmit(selectedPath)

    const utmData = getStoredUTMs()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedPath, ...utmData }),
      })
      setSubmitted(true)
    } catch {
      // fallback — still show success
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* Left: info + path selector */}
        <div className={styles.leftPanel}>
          <div className={styles.eyebrow}>Get in Touch</div>
          <h1 className={styles.title}>Let&apos;s Solve a Business Problem</h1>
          <p className={styles.desc}>
            Tell us what you&apos;re trying to improve. We&apos;ll help identify where Deep Tech can create measurable
            business value.
          </p>

          <div className={styles.pathLabel}>What area are you interested in?</div>
          <div className={styles.paths}>
            {paths.map((p) => (
              <button
                key={p.id}
                id={`path-${p.id}`}
                onClick={() => {
                  setSelectedPath(p.id)
                  trackGAEvent('select_interest_path', { category: 'Contact Form', label: p.label })
                }}
                className={`${styles.pathBtn} ${selectedPath === p.id ? styles.pathActive : ''}`}
              >
                <span className={styles.pathIcon}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>


          <div className={styles.contactInfo}>
            <div className={styles.contactInfoTitle}>Contact</div>
            <p className={styles.contactInfoText}>Support@identifyyou.in</p>
            <p className={styles.contactInfoText}>+91 9597046682</p>
            <p className={styles.contactInfoText}>Pandi Kovil Ring Road, Madurai, Tamil Nadu 625107</p>
            <p className={styles.contactInfoText}>3 Northwood Avenue, Purley, London CR8 2ER</p>
          </div>
        </div>

        {/* Right: form */}
        <div className={styles.rightPanel}>
          {submitted ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Request Received!</h2>
              <p className={styles.successDesc}>
                We have received your inquiry. An expert from our team will contact you within 24 hours at your provided email.
              </p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.formTitle}>Talk to a Deep Tech Expert</h2>
              {/* <p className={styles.formSubtitle}>
                Your message will be sent to <strong>Support@identifyyou.in</strong>
              </p> */}
              {selectedPath && (
                <div className={styles.selectedPathBadge}>
                  Re: {paths.find((p) => p.id === selectedPath)?.label}
                </div>
              )}
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  onFocus={handleInputFocus}
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>Work Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  onFocus={handleInputFocus}
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                  value={form.email}
                  onChange={handleEmailChange}
                  placeholder="you@yourcompany.com"
                />
                {emailError && (
                  <p className={styles.fieldError}>{emailError}</p>
                )}
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-company" className={styles.label}>Company</label>
                <input
                  id="contact-company"
                  type="text"
                  onFocus={handleInputFocus}
                  className={styles.input}
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>What are you trying to improve?</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  onFocus={handleInputFocus}
                  className={styles.textarea}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                disabled={loading || !!emailError}
                className={styles.submitBtn}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
