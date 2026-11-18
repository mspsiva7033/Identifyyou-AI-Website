import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { RenderedDocxResult } from '@/lib/docx-renderer'
import styles from './LegalDocumentView.module.css'

interface LegalDocumentViewProps {
  title?: string
  breadcrumbTitle: string
  doc: RenderedDocxResult
  badgeText?: string
}

export function LegalDocumentView({
  title,
  breadcrumbTitle,
  doc,
  badgeText,
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
          {badgeText && <span className={styles.badge}>{badgeText}</span>}
          {title && <h1 className={styles.title}>{title}</h1>}

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
