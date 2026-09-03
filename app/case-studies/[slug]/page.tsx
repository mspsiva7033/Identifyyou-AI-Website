import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/payload'
import styles from './page.module.css'

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return { title: 'Case Study Not Found' }
  return {
    title: cs.title,
    description: cs.overview ? cs.overview.substring(0, 160) : cs.title,
  }
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)

  if (!cs) notFound()

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        {' / '}
        <Link href="/case-studies" className={styles.breadcrumbLink}>Case Studies</Link>
        {' / '}
        {cs.breadcrumb}
      </div>

      <section className={styles.content}>
        <div className={styles.tagBadge}>{cs.tag}</div>
        <h1 className={styles.title}>{cs.title}</h1>

        <div className={styles.heroImg} />

        <h2 className={styles.h2}>Overview</h2>
        <p className={styles.overview}>{cs.overview}</p>

        <h2 className={styles.h2}>Challenges</h2>
        <div className={styles.challengesList}>
          {cs.challenges.map((c) => (
            <div key={c.n} className={styles.challengeItem}>
              <div className={styles.challengeTitle}>{c.n}. {c.title}</div>
              <p className={styles.challengeDesc}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className={styles.resultsGrid}>
          {cs.results.map((r) => (
            <div key={r.stat} className={styles.resultCard}>
              <div className={styles.resultStat}>{r.stat}</div>
              <div className={styles.resultLabel}>{r.label}</div>
            </div>
          ))}
        </div>

        <h2 className={styles.h2}>How It Was Solved</h2>
        <div className={styles.stepsList}>
          {cs.solutionSteps.map((s) => (
            <div key={s.n} className={styles.stepCard}>
              <div className={styles.stepTitle}>{s.n}. {s.title}</div>
              <div className={styles.stepDetails}>
                <div><span className={styles.stepLabel}>Challenge — </span><span className={styles.stepVal}>{s.challenge}</span></div>
                <div><span className={styles.stepLabel}>Solution — </span><span className={styles.stepVal}>{s.solution}</span></div>
                <div><span className={styles.stepLabel}>Outcome — </span><span className={styles.stepOutcome}>{s.outcome}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.techUsed}>
          <div className={styles.techUsedLabel}>Technology Used</div>
          <div className={styles.techUsedValue}>{cs.technologyUsed}</div>
        </div>
      </section>

      {/* More Case Studies */}
      <section className={styles.moreSection}>
        <div className={styles.moreInner}>
          <h2 className={styles.moreTitle}>More Case Studies</h2>
          <div className={styles.moreGrid}>
            {cs.more.map((m) => (
              <Link key={m.slug} href={`/case-studies/${m.slug}`} className={styles.moreCard}>
                <div className={styles.moreTag}>{m.tag}</div>
                <div className={styles.moreCardTitle}>{m.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
