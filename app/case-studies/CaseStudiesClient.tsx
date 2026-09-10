'use client'

import { useState } from 'react'
import Link from 'next/link'
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
}

type Props = {
  caseStudies: CaseStudy[]
}

const filterLabels = [
  'All',
  'AI & Intelligent Business',
  'Data Engineering',
  'Digital Engineering',
  'Industry Automation',
  'Vision AI',
]

export function CaseStudiesClient({ caseStudies }: Props) {
  const [filter, setFilter] = useState('All')

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
    <main>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Deep Tech in the Real World</h1>
        <p className={styles.heroSub}>Illustrative examples below — pending verified case studies from confirmed engagements.</p>
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
            <div key={cs.slug} className={styles.card}>
              <div className={styles.cardTag}>{cs.tag}</div>
              <div className={styles.cardTitle}>{cs.title}</div>
              <div className={styles.cardDetails}>
                <div><span className={styles.detailLabel}>Challenge — </span><span className={styles.detailVal}>{cs.challenge}</span></div>
                <div><span className={styles.detailLabel}>Objective — </span><span className={styles.detailVal}>{cs.objective}</span></div>
                <div><span className={styles.detailLabel}>Solution — </span><span className={styles.detailVal}>{cs.solution}</span></div>
                <div><span className={styles.detailLabel}>Deep Tech — </span><span className={styles.detailVal}>{cs.deepTech}</span></div>
                <div><span className={styles.detailLabel}>Technology — </span><span className={styles.detailTech}>{cs.tech}</span></div>
                <div><span className={styles.detailLabel}>Integration — </span><span className={styles.detailVal}>{cs.integration}</span></div>
                <div className={styles.outcomeRow}>
                  <span className={styles.detailLabel}>Outcome — </span>
                  <span className={styles.outcomeVal}>{cs.outcome}</span>
                </div>
              </div>
              <Link href={`/case-studies/${cs.slug}`} className={styles.readMore}>Read Case Study →</Link>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className={styles.noResults}>No case studies found for &ldquo;{filter}&rdquo;.</div>
        )}
      </section>
    </main>
  )
}
