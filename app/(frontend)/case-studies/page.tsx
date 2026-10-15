import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudiesClient } from './CaseStudiesClient'
import { getCaseStudies } from '@/lib/payload'

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
    <>
      <Header />
      <Suspense
        fallback={
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '72px 32px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#0f172a' }}>
              Deep Tech in the <span style={{ color: '#94C640' }}>Real World</span>
            </h1>
            <p style={{ color: '#64748b' }}>Enterprise case studies and technical success stories.</p>
          </div>
        }
      >
        <CaseStudiesClient caseStudies={caseStudies} />
      </Suspense>
      <Footer />
    </>
  )
}
