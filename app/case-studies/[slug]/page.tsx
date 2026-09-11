import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { getCaseStudyBySlug, getCaseStudies, DocItem } from '@/lib/payload'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

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

function renderDocItems(docItems: DocItem[]) {
  const elements: React.ReactNode[] = []
  let currentBullets: string[] = []

  const flushBullets = (key: string) => {
    if (currentBullets.length > 0) {
      elements.push(
        <ul key={key} className={styles.secBullets}>
          {currentBullets.map((b, bIdx) => (
            <li key={bIdx}>{b}</li>
          ))}
        </ul>
      )
      currentBullets = []
    }
  }

  docItems.forEach((item, idx) => {
    if (item.type === 'bullet') {
      currentBullets.push(item.text)
    } else {
      flushBullets(`bullets-${idx}`)
      if (item.type === 'h2') {
        elements.push(<h2 key={idx} className={styles.h2}>{item.text}</h2>)
      } else if (item.type === 'h3') {
        elements.push(<h3 key={idx} className={styles.h3}>{item.text}</h3>)
      } else if (item.type === 'h4') {
        elements.push(<h4 key={idx} className={styles.h4}>{item.text}</h4>)
      } else if (item.type === 'p') {
        elements.push(<p key={idx} className={styles.secPara}>{item.text}</p>)
      }
    }
  })
  flushBullets(`bullets-end`)

  return elements
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

        <div className={styles.heroImgWrapper}>
          <img
            src={cs.illustration || `/images/case-studies/${slug}.${['advanced-vision-inspection-surface', 'vision-ai-bore-measurement', 'vision-ai-complex-dimension'].includes(slug) ? 'svg' : 'png'}`}
            alt={cs.title}
            className={styles.heroIllustration}
          />
        </div>

        {cs.metaBlock && cs.metaBlock.length > 0 && (
          <div className={styles.metaBlockGrid}>
            {cs.metaBlock.map((m, idx) => (
              <div key={idx} className={styles.metaBlockItem}>
                <span className={styles.metaBlockLabel}>{m.label}: </span>
                <span className={styles.metaBlockValue}>{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Render docItems hierarchy if present */}
        {cs.docItems && cs.docItems.length > 0 ? (
          <div className={styles.docItemsBlock}>
            {renderDocItems(cs.docItems)}
          </div>
        ) : cs.sections && cs.sections.length > 0 ? (
          <div className={styles.sectionsList}>
            {cs.sections.map((sec, i) => (
              <div key={sec.title || i} className={styles.sectionBlock}>
                {sec.title && <h2 className={styles.h2}>{sec.title}</h2>}
                {sec.subtitle && <p className={styles.secSubtitle}>{sec.subtitle}</p>}
                {sec.content && sec.content.map((p, pIdx) => (
                  <p key={pIdx} className={styles.secPara}>{p}</p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className={styles.secBullets}>
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {cs.overview && (
              <>
                <h2 className={styles.h2}>Overview</h2>
                <p className={styles.overview}>{cs.overview}</p>
              </>
            )}

            {cs.challenges && cs.challenges.length > 0 && (
              <>
                <h2 className={styles.h2}>Challenges</h2>
                <div className={styles.challengesList}>
                  {cs.challenges.map((c, i) => (
                    <div key={c.n || i} className={styles.challengeItem}>
                      <div className={styles.challengeTitle}>{c.n || i + 1}. {c.title}</div>
                      <p className={styles.challengeDesc}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Workflow Diagram */}
        {cs.workflow && cs.workflow.length > 0 && (
          <div className={styles.workflowBlock}>
            <h2 className={styles.h2}>How the Intelligence Layer Works</h2>
            <div className={styles.workflowChain}>
              {cs.workflow.map((step, idx) => (
                <div key={idx} className={styles.workflowStep}>
                  <div className={styles.workflowCard}>{step}</div>
                  {idx < cs.workflow!.length - 1 && <div className={styles.workflowArrow}>↓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {cs.comparisonTable && (
          <div className={styles.tableBlock}>
            <h2 className={styles.h2}>From Experience-Driven to Intelligence-Driven</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.compTable}>
                <thead>
                  <tr>
                    <th>{cs.comparisonTable.headers[0]}</th>
                    <th>{cs.comparisonTable.headers[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {cs.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className={styles.tradCol}>{row[0]}</td>
                      <td className={styles.aiCol}>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results */}
        {cs.results && cs.results.length > 0 && (
          <div className={styles.resultsGrid}>
            {cs.results.map((r, i) => (
              <div key={r.stat || i} className={styles.resultCard}>
                <div className={styles.resultStat}>{r.stat}</div>
                <div className={styles.resultLabel}>{r.label}</div>
              </div>
            ))}
          </div>
        )}

        {cs.technologyUsed && (
          <div className={styles.techUsed}>
            <div className={styles.techUsedLabel}>Technology Used</div>
            <div className={styles.techUsedValue}>{cs.technologyUsed}</div>
          </div>
        )}
      </section>

      {/* More Case Studies */}
      {cs.more && cs.more.length > 0 && (
        <section className={styles.moreSection}>
          <div className={styles.moreInner}>
            <h2 className={styles.moreTitle}>More Case Studies</h2>
            <div className={styles.moreGrid}>
              {cs.more.map((m) => (
                <CaseStudyCard key={m.slug} slug={m.slug} title={m.title} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
