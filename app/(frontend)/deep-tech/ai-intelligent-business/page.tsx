import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI Powered Intelligent Business — IdentifYou',
  description:
    'IdentifYou helps businesses turn complex operational challenges and critical decisions into measurable outcomes through AI, data, engineering, and automation solutions.',
}

const methodologySteps = [
  {
    n: '01 · UNDERSTAND',
    text: 'Identify the business priority and the decision it depends on.',
    isHighlight: false,
  },
  {
    n: '02 · CONNECT DATA',
    text: 'Bring ERP, MES, procurement and finance data into one reconciled picture.',
    isHighlight: false,
  },
  {
    n: '03 · BUILD THE MODEL',
    text: 'Forecasting, anomaly detection or optimization — fit to the decision, not the dataset.',
    isHighlight: false,
  },
  {
    n: '04 · VALIDATE WITH OWNERS',
    text: 'Test recommendations with the finance, procurement or ops team who will act on them.',
    isHighlight: false,
  },
  {
    n: '05 · DEPLOY & ACT',
    text: 'Put recommendations directly into the workflow where the decision is made.',
    isHighlight: false,
  },
  {
    n: '06 · LEARN & SHARPEN',
    text: 'Outcomes feed back into the model, improving accuracy every cycle.',
    isHighlight: false,
  },
]

export default function AIIntelligentBusinessPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* 1. TOP CTA / HERO INTRO */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/ai_intelligent_business_hero.png"
          alt="AI & Intelligent Business Background"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>DECISION ENGINE</div>
            <h1 className={styles.heroTitle}>
              Intelligence Isn&apos;t a Dashboard. It&apos;s a Decision Made Earlier.
            </h1>
            <p className={styles.heroDesc}>
              Data creates visibility. Models create foresight. People make the call — earlier, with more evidence, and with
              less to react to later.
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

      {/* 2 & 3. MAIN PAGE TITLE & INTRO POSITIONING CONTENT */}
      <section className={styles.sectionIntro}>
        <h1 className={styles.introTitle}>AI Powered Intelligent Business</h1>
        <p className={styles.introParagraph}>
          IdentifYou helps businesses turn complex operational challenges and critical decisions into measurable outcomes
          through intelligent solutions. We combine <span className={styles.introBold}>AI, data, engineering, and automation</span> with
          deep business understanding to build intelligence around your processes, data, and decisions. Our solutions move
          organizations from <span className={styles.introBold}>insight to action</span>, enabling smarter decisions, greater operational
          agility, and continuous improvement at scale. The result is a business that becomes{' '}
          <span className={styles.introBold}>more intelligent, connected, and responsive</span>.
        </p>
      </section>

      {/* 4. FEATURED SUCCESS STORY — TOWARDS ZERO INVENTORY VARIANCE */}
      <section className={styles.sectionCaseStudy1}>
        <div className={styles.csCardDark}>
          <div className={styles.csGridDark}>
            <div>
              <div className={styles.csTagGreen}>FEATURED SUCCESS STORY</div>
              <h2 className={styles.csTitleDark}>Towards Zero Inventory Variance</h2>
              <p className={styles.csDescDark}>
                Physical stock and system stock drift apart for reasons that rarely surface until a count. We reconcile
                material movement, production consumption and warehouse transactions continuously — closing variance at the
                source instead of at month-end.
              </p>
              <Link
                href="/thinking-factory"
                className={styles.csLinkGreen}
              >
                Read the success story →
              </Link>
            </div>

            <div className={styles.imageBox}>
              <img
                src="/images/retail_inventory_dashboard.png"
                alt="Image: warehouse / inventory reconciliation"
                className={styles.realImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SUCCESS STORY — RISK INSIGHTS IN FINANCE */}
      <section className={styles.sectionCaseStudy2}>
        <div className={styles.csCardLight}>
          <div className={styles.csGridLight}>
            <div className={styles.imageBox}>
              <img
                src="/images/precision_abm_dashboard.png"
                alt="Image: finance risk / working capital"
                className={styles.realImg}
              />
            </div>

            <div>
              <div className={styles.csTagGreen}>FEATURED SUCCESS STORY</div>
              <h2 className={styles.csTitleLight}>Risk Insights in Finance</h2>
              <p className={styles.csDescLight}>
                Cost overruns and working-capital pressure usually originate in operations, long before they reach a financial
                statement. We connect operational cost drivers to financial exposure — giving finance leaders early visibility
                into risk building up on the floor.
              </p>
              <Link href="/case-studies/risk-insights-finance" className={styles.csLinkGreen}>
                Read the success story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI IMPLEMENTATION METHODOLOGY */}
      <section className={styles.sectionMethodology}>
        <div className={styles.methodCardDark}>
          <div className={styles.methodTag}>IDENTIFYYOU METHODOLOGY FOR AI IMPLEMENTATION</div>
          <h2 className={styles.methodTitle}>
            Understand the Priority → Build the Model → Prove the Decision
          </h2>

          <div className={styles.methodGrid}>
            {methodologySteps.map((step) => (
              <div
                key={step.n}
                className={step.isHighlight ? styles.methodBlockHighlight : styles.methodBlock}
              >
                <div className={styles.methodN}>{step.n}</div>
                <p className={step.isHighlight ? styles.methodTextHighlight : styles.methodText}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MORE SUCCESS STORIES (PROCUREMENT INTELLIGENCE) */}
      <section className={styles.sectionProcurement}>
        <div className={styles.sectionHeaderLight}>
          <div className={styles.csTagGreen}>MORE SUCCESS STORIES</div>
          <h2 className={styles.introTitle} style={{ textAlign: 'left', margin: '8px 0 0' }}>
            Procurement Intelligence, Applied Two Ways.
          </h2>
        </div>

        <div className={styles.procurementGrid}>
          <div className={styles.procurementCard}>
            <div>
              <div className={styles.csTagGreen}>STRATEGY</div>
              <h3 className={styles.cardTitle}>Strategic Procurement Intelligence</h3>
              <p className={styles.cardDesc}>
                Vendor performance, lead-time trends, price movement and demand forecasts brought into one model — so
                sourcing decisions anticipate supply risk instead of reacting to a shortage.
              </p>
            </div>
            <Link
              href="/case-studies/strategic-procurement-intelligence"
              className={styles.csLinkGreen}
            >
              Read more →
            </Link>
          </div>

          <div className={styles.procurementCard}>
            <div>
              <div className={styles.csTagGreen}>OPERATIONS</div>
              <h3 className={styles.cardTitle}>Procurement Operations Intelligence</h3>
              <p className={styles.cardDesc}>
                Purchase order status, receipt accuracy and vendor delivery adherence tracked continuously — flagging
                exceptions before they delay production.
              </p>
            </div>
            <Link
              href="/case-studies/procurement-operations-intelligence"
              className={styles.csLinkGreen}
            >
              Read more →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
