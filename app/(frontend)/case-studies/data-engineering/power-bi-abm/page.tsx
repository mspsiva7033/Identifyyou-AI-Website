import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/payload'
import CaseStudyDetailPage from '../../[slug]/page'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const cs = await getCaseStudyBySlug('power-bi-abm')
  if (!cs) return { title: 'Account Based Marketing — Power BI ABM | IdentifYou' }
  return {
    title: `${cs.title} | IdentifYou`,
    description: cs.overview || cs.title,
  }
}

export default async function PowerBIABMCaseStudyPage() {
  const cs = await getCaseStudyBySlug('power-bi-abm')
  if (!cs) notFound()

  return <CaseStudyDetailPage params={Promise.resolve({ slug: 'power-bi-abm' })} />
}

