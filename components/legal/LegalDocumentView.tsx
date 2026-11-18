import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { RenderedDocxResult } from '@/lib/docx-renderer'
import styles from './LegalDocumentView.module.css'

interface LegalDocumentViewProps {
  title: string
  breadcrumbTitle: string
  doc: RenderedDocxResult
  badgeText?: string
}

export function LegalDocumentView({
  title,
  breadcrumbTitle,
  doc,
  badgeText = 'LEGAL & COMPLIANCE',
}: LegalDocumentViewProps) {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          {' / '}
          <span>{breadcrumbTitle}</span>
        </nav>

        <section className={styles.container}>
          <span className={styles.badge}>{badgeText}</span>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.metaBar}>
            <div className={styles.metaInfo}>
              <span>Last updated: <strong>{doc.lastModified}</strong></span>
              {doc.isCustomDocx && (
                <span className={styles.docxPill} title="Rendered from Word document">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Word Document (.docx)
                </span>
              )}
            </div>

            {doc.downloadUrl && (
              <a
                href={doc.downloadUrl}
                download
                className={styles.downloadBtn}
                title="Download original document"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Document
              </a>
            )}
          </div>

          <article className={styles.card}>
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
