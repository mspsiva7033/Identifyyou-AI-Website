import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug } from '@/lib/payload'
import CaseStudyDetailPage from '../[slug]/page'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const cs = await getCaseStudyBySlug('precision-vision-ai-setup')
  if (!cs) return { title: 'Precision Vision AI Setup | IdentifYou' }
  return {
    title: `${cs.title} | IdentifYou`,
    description: cs.overview || cs.title,
  }
}

export default async function PrecisionVisionAISetupPage() {
  const cs = await getCaseStudyBySlug('precision-vision-ai-setup')
  if (!cs) notFound()

  return <CaseStudyDetailPage params={Promise.resolve({ slug: 'precision-vision-ai-setup' })} />
}

