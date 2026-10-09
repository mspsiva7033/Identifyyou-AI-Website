'use client'

import { useEffect } from 'react'
import { trackCaseStudyView } from '@/lib/umami'

interface CaseStudyTrackerProps {
  slug: string
  title: string
  category?: string
}

export function CaseStudyTracker({ slug, title, category }: CaseStudyTrackerProps) {
  useEffect(() => {
    if (slug && title) {
      trackCaseStudyView(slug, title, category)
    }
  }, [slug, title, category])

  return null
}
