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
            <div className={styles.calloutHeader}>
              <div className={styles.calloutOrg}>
                <svg
                  className={styles.calloutOrgIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{org}</span>
              </div>
              <span className={styles.calloutBadge}>Official Policy</span>
            </div>

            <div className={styles.calloutDivider} />

            <div className={styles.calloutGrid}>
              <div className={styles.calloutItem}>
                <span className={styles.calloutLabel}>Effective Date</span>
                <span className={styles.calloutValue}>{effectiveDate}</span>
              </div>

              <div className={styles.calloutItem}>
                <span className={styles.calloutLabel}>Last Updated</span>
                <span className={styles.calloutValue}>{lastUpdated}</span>
              </div>

              <div className={styles.calloutItem}>
                <span className={styles.calloutLabel}>Websites</span>
                <div className={styles.calloutLinks}>
                  {websites.map((w, idx) => (
                    <React.Fragment key={w.url}>
                      <a
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.calloutLink}
                      >
                        <span>{w.label}</span>
                        <svg
                          className={styles.linkIcon}
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                      {idx < websites.length - 1 && (
                        <span className={styles.linkDot}>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
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
