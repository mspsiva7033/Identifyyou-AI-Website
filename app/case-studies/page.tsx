import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudiesClient } from './CaseStudiesClient'
import { getCaseStudies } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Case Studies — Deep Tech in the Real World',
  description: 'Illustrative case studies showing AI-powered, Vision AI, Data Engineering and Industry Automation solutions in manufacturing, financial services and healthcare.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <CaseStudiesClient caseStudies={caseStudies} />
      </Suspense>
      <Footer />
    </>
  )
}
