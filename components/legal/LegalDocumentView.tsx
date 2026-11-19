import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { RenderedDocxResult } from '@/lib/docx-renderer'
import styles from './LegalDocumentView.module.css'

interface LegalDocumentViewProps {
  title: string
  breadcrumbTitle?: string
  doc: RenderedDocxResult
  badgeText?: string
}

export function LegalDocumentView({
  title,
  doc,
}: LegalDocumentViewProps) {
  const org = doc.organization || 'IdentifYou Technologies (OPC) Private Limited'
  const effectiveDate = doc.effectiveDate || '1-Jan-2024'
  const lastUpdated = doc.lastUpdated || '18-Nov-2026'
  const websites = doc.websites || [
    { label: 'https://identifyyou.ai', url: 'https://identifyyou.ai' },
    { label: 'https://deiaaix.ai', url: 'https://deiaaix.ai' },
  ]

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <strong>Organization:</strong>
              <span>{org}</span>
            </div>
            <div className={styles.metaItem}>
              <strong>Effective Date:</strong>
              <span>{effectiveDate}</span>
            </div>
            <div className={styles.metaItem}>
              <strong>Last Updated:</strong>
              <span>{lastUpdated}</span>
            </div>
          </div>

          <div className={styles.calloutBox}>
            <div className={styles.calloutOrg}>{org}</div>
            <div className={styles.calloutDates}>
              <strong>Effective Date:</strong> <span>{effectiveDate}</span>
              <span className={styles.divider}>|</span>
              <strong>Last Updated:</strong> <span>{lastUpdated}</span>
            </div>
            <div className={styles.calloutWebsites}>
              <strong>Websites:</strong>{' '}
              {websites.map((w, idx) => (
                <React.Fragment key={w.url}>
                  <a href={w.url} target="_blank" rel="noopener noreferrer">
                    {w.label}
                  </a>
                  {idx < websites.length - 1 && <span className={styles.dot}>·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <article className={styles.docArticle}>
            <div
              className={styles.docContent}
              dangerouslySetInnerHTML={{ __html: doc.html }}
            />

            <div className={styles.contactBox}>
              <div className={styles.contactBoxTitle}>Questions or Inquiries?</div>
              <p className={styles.contactBoxText}>
                If you have questions regarding this policy or our data practices, contact us at{' '}
                <a href="mailto:ai.support@identifyyou.in">ai.support@identifyyou.in</a> or visit our{' '}
                <Link href="/contact">Contact Page</Link>.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
