'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import styles from './page.module.css'

type CaseStudy = {
  slug: string
  title: string
  tag: string
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
  caseStudies: CaseStudy[]
}

const filterLabels = [
  'All',
  'AI & Intelligent Business',
  'AI & No-Code Platform',
  'Data Engineering',
  'Digital Engineering',
  'Industry Automation',
  'Vision AI',
]

export function CaseStudiesClient({ caseStudies }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read active filter from URL — persists across back navigation
  const getFilterFromUrl = useCallback(() => {
    const param = searchParams.get('filter')
    return param && filterLabels.includes(param) ? param : 'All'
  }, [searchParams])

  const [filter, setFilter] = useState(getFilterFromUrl)

  // Sync state when URL changes (e.g. back button)
  useEffect(() => {
    setFilter(getFilterFromUrl())
  }, [searchParams, getFilterFromUrl])

  // When user clicks a filter, update both state AND URL
  const handleFilter = (label: string) => {
    setFilter(label)
    const params = new URLSearchParams(searchParams.toString())
    if (label === 'All') {
      params.delete('filter')
    } else {
      params.set('filter', label)
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  const visible =
    filter === 'All'
      ? caseStudies
      : caseStudies.filter((c) => {
          return Array.isArray(c.categories) && c.categories.includes(filter)
        })

  return (
    <div className={styles.mainWrapper}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Deep Tech in the <span className={styles.heroTitleGreen}>Real World</span>
        </h1>
        <p className={styles.heroSub}>Illustrative examples below — pending verified success stories from confirmed engagements.</p>
      </section>

      <section className={styles.content}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
            Featured Enterprise Case Studies
          </h2>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {filterLabels.map((label) => (
            <button
              key={label}
              id={`filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleFilter(label)}
              className={`${styles.filterBtn} ${filter === label ? styles.filterActive : ''}`}
            >
              {label}
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
              categories={cs.categories}
              illustration={cs.illustration}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <div className={styles.noResults}>No success stories found for &ldquo;{filter}&rdquo;.</div>
        )}
      </section>
    </div>
  )
}
