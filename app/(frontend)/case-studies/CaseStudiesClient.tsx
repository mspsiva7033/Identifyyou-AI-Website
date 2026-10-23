'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import type { CaseStudyCategory } from '@/lib/payload'
import styles from './page.module.css'

type CaseStudy = {
  slug: string
  title: string
  tag: string
  category?: {
    id: number | string
    name: string
    slug: string
  }
  categories: string[]
  challenge: string
  objective: string
  solution: string
  deepTech: string
  tech: string
  integration: string
  outcome: string
  illustration?: string
}

type Props = {
  categories: CaseStudyCategory[]
  caseStudies: CaseStudy[]
}

export function CaseStudiesClient({ categories = [], caseStudies = [] }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Generate dynamic filter tabs from CMS categories
  const filterTabs = useMemo(() => {
    const validCats = (categories || [])
      .filter((cat) => cat && cat.slug && cat.name && cat.slug !== 'all')
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      }))

    return [
      { id: 'all', name: 'All', slug: 'all' },
      ...validCats,
    ]
  }, [categories])

  // Read active filter from URL: matches either category.slug or category.name
  const getFilterSlugFromUrl = useCallback(() => {
    const param = searchParams.get('filter')
    if (!param) return 'all'
    const trimmed = param.trim().toLowerCase()
    const slugFormat = trimmed.replace(/[^a-z0-9]+/g, '-')

    const match = filterTabs.find((tab) => {
      const tabSlug = tab.slug.toLowerCase()
      const tabName = tab.name.toLowerCase()
      return (
        tabSlug === trimmed ||
        tabSlug === slugFormat ||
        tabName === trimmed ||
        (tab.name === 'Industry Automation' && trimmed.includes('industry-automation')) ||
        (tab.name === 'Vision AI' && (trimmed === 'vision-ai' || trimmed === 'vision ai'))
      )
    })

    return match ? match.slug : 'all'
  }, [searchParams, filterTabs])

  const [activeSlug, setActiveSlug] = useState(getFilterSlugFromUrl)

  // Sync state when URL changes (e.g. browser back/forward button)
  useEffect(() => {
    setActiveSlug(getFilterSlugFromUrl())
  }, [searchParams, getFilterSlugFromUrl])

  // When user clicks a filter tab, update state and URL query param
  const handleFilterSelect = (tab: { slug: string; name: string }) => {
    setActiveSlug(tab.slug)
    const params = new URLSearchParams(searchParams.toString())
    if (tab.slug === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', tab.name)
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  // Filter case studies strictly by authoritative category relationship:
  const visible = useMemo(() => {
    if (activeSlug === 'all') return caseStudies

    return caseStudies.filter((c) => {
      // 1. Authoritative category slug match
      if (c.category?.slug && c.category.slug === activeSlug) return true

      // 2. Authoritative category name match
      const targetTab = filterTabs.find((t) => t.slug === activeSlug)
      if (targetTab && c.category?.name?.toLowerCase() === targetTab.name.toLowerCase()) return true
      if (targetTab && Array.isArray(c.categories) && c.categories.includes(targetTab.name)) return true

      return false
    })
  }, [activeSlug, caseStudies, filterTabs])

  const currentTab = filterTabs.find((t) => t.slug === activeSlug) || filterTabs[0]

  return (
    <>
      <section className={styles.content}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
            Featured Enterprise Case Studies
          </h2>
        </div>

        {/* Dynamic Filters from CMS */}
        <div className={styles.filters}>
          {filterTabs.map((tab) => (
            <button
              key={tab.slug}
              id={`filter-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleFilterSelect(tab)}
              className={`${styles.filterBtn} ${activeSlug === tab.slug ? styles.filterActive : ''}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {visible.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              slug={cs.slug}
              title={cs.title}
              tag={cs.tag}
              category={cs.category}
              categories={cs.categories}
              illustration={cs.illustration}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <div className={styles.noResults}>
            No success stories found for &ldquo;{currentTab.name}&rdquo;.
          </div>
        )}
      </section>
    </>
  )
}
