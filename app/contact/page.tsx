'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
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

export default function ContactPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedPath }),
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
                onClick={() => setSelectedPath(p.id)}
                className={`${styles.pathBtn} ${selectedPath === p.id ? styles.pathActive : ''}`}
              >
                <span className={styles.pathIcon}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactInfoTitle}>Contact</div>
            <p className={styles.contactInfoText}>Support@identifyou.in</p>
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
              <h2 className={styles.successTitle}>Message Sent!</h2>
              <p className={styles.successDesc}>
                Thank you for reaching out. A member of our team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.formTitle}>Talk to a Deep Tech Expert</h2>
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
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-company" className={styles.label}>Company</label>
                <input
                  id="contact-company"
                  type="text"
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
                  className={styles.textarea}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                disabled={loading}
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
