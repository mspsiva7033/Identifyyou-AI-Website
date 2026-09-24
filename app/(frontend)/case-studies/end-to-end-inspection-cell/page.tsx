import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/payload'
import CaseStudyDetailPage from '../[slug]/page'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const cs = await getCaseStudyBySlug('end-to-end-inspection-cell')
  if (!cs) return { title: 'End-to-End Inspection Cell Engineering | IdentifYou' }
  return {
    title: `${cs.title} | IdentifYou`,
    description: cs.overview || cs.title,
  }
}

export default async function EndToEndInspectionCellPage() {
  const cs = await getCaseStudyBySlug('end-to-end-inspection-cell')
  if (!cs) notFound()

  return <CaseStudyDetailPage params={Promise.resolve({ slug: 'end-to-end-inspection-cell' })} />
}

