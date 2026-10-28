import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudiesClient } from './CaseStudiesClient'
import { getCaseStudies, getCaseStudyCategories } from '@/lib/payload'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Enterprise Deep Tech Success Stories',
  description:
    'Explore enterprise success stories across Vision AI, industrial automation, predictive maintenance, and cloud data platforms.',
  alternates: {
    canonical: '/success-stories',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SuccessStoriesPage() {
  const [categories, caseStudies] = await Promise.all([
    getCaseStudyCategories(),
    getCaseStudies(),
  ])

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Deep Tech in the <span className={styles.heroTitleGreen}>Real World</span>
        </h1>
        <p className={styles.heroSub}>Enterprise technical success stories and proven business outcomes.</p>
      </section>
      <Suspense
        fallback={
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 96px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
              {caseStudies.slice(0, 12).map((cs) => (
                <div key={cs.slug} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
                  <Link href={`/success-stories/${cs.slug}`} style={{ fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>
                    {cs.title} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <CaseStudiesClient categories={categories} caseStudies={caseStudies} />
      </Suspense>
      <Footer />
    </div>
  )
}
