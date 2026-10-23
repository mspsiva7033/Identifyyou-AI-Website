import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudiesClient } from './CaseStudiesClient'
import { getCaseStudies } from '@/lib/payload'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Deep Tech Case Studies & Client Stories',
  description:
    'Explore enterprise case studies across Vision AI, industrial automation, predictive maintenance, and cloud data platforms.',
  alternates: {
    canonical: '/case-studies',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Deep Tech in the <span className={styles.heroTitleGreen}>Real World</span>
        </h1>
        <p className={styles.heroSub}>Enterprise case studies and technical success stories.</p>
      </section>
      <Suspense
        fallback={
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 96px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
              {caseStudies.slice(0, 12).map((cs) => (
                <div key={cs.slug} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <Link href={`/case-studies/${cs.slug}`} style={{ fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>
                    {cs.title} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <CaseStudiesClient caseStudies={caseStudies} />
      </Suspense>
      <Footer />
    </div>
  )
}
