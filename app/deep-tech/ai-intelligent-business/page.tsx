import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI Powered Intelligent Business — Turn Business Decisions Into Intelligent Decisions',
  description:
    'IdentifYou helps businesses turn complex operational challenges and critical decisions into measurable outcomes through AI, data, engineering, and automation solutions.',
}

const methodologySteps = [
  {
    n: '01 · UNDERSTAND',
    text: 'Identify the business priority and the decision it depends on.',
  },
  {
    n: '02 · CONNECT DATA',
    text: 'Bring ERP, MES, procurement and finance data into one reconciled picture.',
  },
  {
    n: '03 · BUILD THE MODEL',
    text: 'Forecasting, anomaly detection or optimization — fit to the decision, not the dataset.',
  },
  {
    n: '04 · VALIDATE WITH OWNERS',
    text: 'Test recommendations with the finance, procurement or ops team who will act on them.',
  },
  {
    n: '05 · DEPLOY & ACT',
    text: 'Put recommendations directly into the workflow where the decision is made.',
  },
  {
    n: '06 · LEARN & SHARPEN',
    text: 'Outcomes feed back into the model, improving accuracy every cycle.',
  },
]

export default function AIIntelligentBusinessPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: FULL-PAGE HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <h1 className={styles.heroTitle}>
              Intelligence Isn&apos;t a Dashboard. It&apos;s a Decision Made Earlier.
            </h1>
            <p className={styles.heroDesc}>
              Data creates visibility. Models create foresight. People make the call — earlier, with more evidence, and
              with less to react to later.
            </p>
            <div className={styles.heroAccentGreen}>Let&apos;s Build Your Intelligent Business Layer.</div>
            <div>
              <Link href="/contact" className={styles.btnPrimary}>
                Talk to an Intelligence Architect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI POWERED INTELLIGENT BUSINESS INTRO */}
      <section className={styles.sectionIntro}>
        <h2 className={styles.introTitle}>AI Powered Intelligent Business</h2>
        <p className={styles.introParagraph}>
          IdentifYou helps businesses turn complex operational challenges and critical decisions into measurable outcomes
          through intelligent solutions. We combine <span className={styles.introBold}>AI, data, engineering, and automation</span> with
          deep business understanding to build intelligence around your processes, data, and decisions. Our solutions move
          organizations from <span className={styles.introBold}>insight to action</span>, enabling smarter decisions, greater operational
          agility, and continuous improvement at scale. The result is a business that becomes{' '}
          <span className={styles.introBold}>more intelligent, connected, and responsive</span>.
        </p>
      </section>

      {/* SECTION 3: FEATURED CASE STUDY 1 (ZERO INVENTORY VARIANCE) */}
      <section className={styles.sectionCaseStudy1}>
        <div className={styles.csCardDark}>
          <div className={styles.csGrid}>
            <div>
              <div className={styles.csTag}>FEATURED CASE STUDY</div>
              <h3 className={styles.csTitle}>Towards Zero Inventory Variance</h3>
              <p className={styles.csDesc}>
                Physical stock and system stock drift apart for reasons that rarely surface until a count. We reconcile
                material movement, production consumption and warehouse transactions continuously — closing variance at the
                source instead of at month-end.
              </p>
              <Link href="/case-studies/revolutionizing-inventory-optimization" className={styles.csLink}>
                Read the case study →
              </Link>
            </div>

            <div className={styles.csVisualBox}>
              <img
                src="/images/retail_inventory_dashboard.png"
                alt="Towards Zero Inventory Variance - Warehouse & Inventory Reconciliation"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED CASE STUDY 2 (RISK INSIGHTS IN FINANCE) */}
      <section className={styles.sectionCaseStudy2}>
        <div className={styles.csCardLight}>
          <div className={styles.csGrid}>
            <div className={styles.csVisualBox}>
              <img
                src="/images/precision_abm_dashboard.png"
                alt="Risk Insights in Finance - Finance Risk & Working Capital"
                className={styles.realImg}
                loading="lazy"
              />
            </div>

            <div>
              <div className={styles.csTagLight}>FEATURED CASE STUDY</div>
              <h3 className={styles.csTitleLight}>Risk Insights in Finance</h3>
              <p className={styles.csDescLight}>
                Cost overruns and working-capital pressure usually originate in operations, long before they reach a
                financial statement. We connect operational cost drivers to financial exposure — giving finance leaders
                early visibility into risk building up on the floor.
              </p>
              <Link href="/case-studies/risk-insights-finance" className={styles.csLinkLight}>
                Read the case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: IDENTIFYOU METHODOLOGY FOR AI IMPLEMENTATION */}
      <section className={styles.sectionMethodology}>
        <div className={styles.methodCardDark}>
          <div className={styles.csTag} style={{ textAlign: 'center' }}>
            IDENTIFYOU METHODOLOGY FOR AI IMPLEMENTATION
          </div>
          <h2 className={styles.methodTitle}>
            Understand the Priority → Build the Model → Prove the Decision
          </h2>

          <div className={styles.methodGrid}>
            {methodologySteps.map((step) => (
              <div key={step.n} className={styles.methodBlock}>
                <div className={styles.methodN}>{step.n}</div>
                <p className={styles.methodText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: MORE CASE STUDIES (PROCUREMENT INTELLIGENCE) */}
      <section className={styles.sectionProcurement}>
        <div className={styles.csTagLight}>MORE CASE STUDIES</div>
        <h2 className={styles.introTitle} style={{ textAlign: 'left', margin: '8px 0 0' }}>
          Procurement Intelligence, Applied Two Ways.
        </h2>

        <div className={styles.procurementGrid}>
          <div className={styles.procurementCard}>
            <div>
              <div className={styles.tagGreen}>STRATEGY</div>
              <h3 className={styles.cardTitle}>Strategic Procurement Intelligence</h3>
              <p className={styles.cardDesc}>
                Vendor performance, lead-time trends, price movement and demand forecasts brought into one model — so
                sourcing decisions anticipate supply risk instead of reacting to a shortage.
              </p>
            </div>
            <Link href="/case-studies" className={styles.csLinkLight}>
              Read more →
            </Link>
          </div>

          <div className={styles.procurementCard}>
            <div>
              <div className={styles.tagGreen}>OPERATIONS</div>
              <h3 className={styles.cardTitle}>Procurement Operations Intelligence</h3>
              <p className={styles.cardDesc}>
                Purchase order status, receipt accuracy and vendor delivery adherence tracked continuously — flagging
                exceptions before they delay production.
              </p>
            </div>
            <Link href="/case-studies" className={styles.csLinkLight}>
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: NEWS & BLOGS */}
      <section className={styles.sectionNews}>
        <div className={styles.csTagLight}>NEWS &amp; BLOGS</div>
        <h2 className={styles.introTitle} style={{ textAlign: 'left', margin: '8px 0 0' }}>
          From the IdentifYou Team.
        </h2>

        <div className={styles.newsGrid}>
          <Link href="/blogs-and-news" className={styles.newsCard}>
            <div className={styles.newsImgBox}>
              <img
                src="/images/enterprise_data_platform_diagram.png"
                alt="Why inventory variance is a data-reconciliation problem"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
            <div className={styles.newsBody}>
              <div className={styles.newsTag}>BLOG</div>
              <h3 className={styles.newsTitle}>
                Why inventory variance is a data-reconciliation problem, not a counting problem
              </h3>
            </div>
          </Link>

          <Link href="/blogs-and-news" className={styles.newsCard}>
            <div className={styles.newsImgBox}>
              <img
                src="/images/snowflake_cortex_architecture.png"
                alt="IdentifYou expands intelligence practice into finance risk analytics"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
            <div className={styles.newsBody}>
              <div className={styles.newsTag}>NEWS</div>
              <h3 className={styles.newsTitle}>
                IdentifYou expands intelligence practice into finance risk analytics
              </h3>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
