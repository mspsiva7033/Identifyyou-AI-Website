'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState(() => {
    const param = searchParams.get('filter')
    return param && filterLabels.includes(param) ? param : 'All'
  })

  useEffect(() => {
    const param = searchParams.get('filter')
    if (param && filterLabels.includes(param)) {
      setFilter(param)
    }
  }, [searchParams])

  const visible = filter === 'All'
    ? caseStudies
    : caseStudies.filter((c) => {
        if (Array.isArray(c.categories) && c.categories.includes(filter)) return true
        const f = filter.toLowerCase()
        if (c.tag && c.tag.toLowerCase().includes(f)) return true
        if (c.title && c.title.toLowerCase().includes(f)) return true
        if (c.deepTech && c.deepTech.toLowerCase().includes(f)) return true
        return false
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
        {/* Filters */}
        <div className={styles.filters}>
          {filterLabels.map((label) => (
            <button
              key={label}
              id={`filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setFilter(label)}
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
