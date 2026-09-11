import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Data Engineering — Turn Data Into a Trusted Business Asset | Snowflake Partner',
  description:
    'Certified Snowflake experts building enterprise data platforms, Cortex AI integrations, ingestion pipelines, and governance to turn fragmented data into trusted intelligence.',
}

const differenceNodes = ['Ingest', 'Integrate', 'Transform', 'Govern', 'Activate']

const platformNodes = [
  'Source Systems',
  'Fivetran / Snowpipe',
  'Snowflake AI Data Cloud',
  'DBT Transformation',
  'Governance',
  'Cortex AI / BI',
  'Business Decisions',
]

const snowflakeFeatures = [
  'Cortex AI',
  'Elastic Compute',
  'Data Sharing',
  'Zero-Copy Cloning',
  'Time Travel',
  'Role-Based Governance',
]

const gridCaseStudies = [
  {
    category: 'LOGISTICS · SNOWFLAKE',
    title: 'Optimizing Shipment and Fleet Operations with Snowflake',
    href: '/case-studies/optimizing-shipment-and-fleet-operations',
  },
  {
    category: 'LOGISTICS · SNOWFLAKE',
    title: 'Streamlining Shipment Planning and Carrier Selection',
    href: '/case-studies/streamlining-shipment-planning-and-carrier-selection',
  },
  {
    category: 'MANUFACTURING · MIGRATION',
    title: 'Migrating Hadoop and HANA to Snowflake for a Manufacturing Enterprise',
    href: '/case-studies/migrating-hadoop-and-hana-to-snowflake',
  },
]

export default function DataEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: ANNER */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroBannerCard}>
            <div>
              <span className={styles.greenPillBadge}>Live in Snowflake Marketplace</span>
              <h1 className={styles.heroBannerTitle}>
                Precision ABM, Powered by Cortex AI — Built Natively on Snowflake
              </h1>
              <p className={styles.heroBannerDesc}>
                Our account-based marketing application runs Cortex AI directly inside the Snowflake AI Data Cloud — no
                data movement, no separate AI stack. It&apos;s the proof point behind everything we build in data
                engineering.
              </p>
              <div className={styles.btnGroup}>
                <a
                  href="https://identifyyou.in/projects/precision-abm-powered-by-cortex-ai-within-the-snowflake-ai-data-cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  View the ABM Case Study ↗
                </a>
                <Link href="/contact" className={styles.btnSecondary}>
                  Talk to a Snowflake Expert
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualContainer}>
              <img
                src="/images/precision_abm_dashboard.png"
                alt="Precision ABM Account scoring and targeting screen"
                className={styles.realVisualImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SNOWFLAKE PARTNER STATS */}
      <section className={styles.sectionPartnerStats}>
        <div className={styles.partnerStatsCard}>
          <div>
            <div className={styles.eyebrowGreen}>SNOWFLAKE PARTNER</div>
            <h2 className={styles.partnerTitle}>Certified Snowflake Experts, Not Generalists</h2>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>Snowflake</span>
              <span className={styles.statLabel}>Certified Partner</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>Certified</span>
              <span className={styles.statLabel}>Snowflake Experts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>1</span>
              <span className={styles.statLabel}>App Live in Marketplace</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE DIFFERENCE */}
      <section className={styles.sectionDifference}>
        <div className={styles.containerNarrow}>
          <div className={styles.diffEyebrow}>THE DIFFERENCE</div>
          <h2 className={styles.diffTitle}>From Fragmented Data to a Trusted Foundation</h2>
          <p className={styles.diffDesc}>
            Data engineering is not just about loading data into a warehouse. It is about integrating, transforming and
            governing it — at the right quality and speed — so people, analytics and AI can all trust the same answer.
          </p>

          <div className={styles.pillsFlowBox}>
            {differenceNodes.map((node, i) => (
              <React.Fragment key={node}>
                <div className={styles.pillNode}>{node}</div>
                {i < differenceNodes.length - 1 && <span className={styles.pillArrow}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PLATFORM ENGINEERING */}
      <section className={styles.sectionPlatformEng}>
        <div className={styles.platformEngCard}>
          <div className={styles.diffEyebrow}>PLATFORM ENGINEERING</div>
          <h2 className={styles.diffTitle}>We Engineer the Complete Data Platform</h2>

          <div className={styles.diagramContainer}>
            <img
              src="/images/enterprise_data_platform_diagram.png"
              alt="Enterprise data platform diagram"
              className={styles.realDiagramImg}
              loading="lazy"
            />
          </div>

          <FlowChain nodes={platformNodes} />
        </div>
      </section>

      {/* SECTION 5: BUILT ON SNOWFLAKE'S AI DATA CLOUD */}
      <section className={styles.sectionBuiltOnSnowflake}>
        <div className={styles.twoColGrid}>
          <div className={styles.archDiagramContainer}>
            <img
              src="/images/snowflake_cortex_architecture.png"
              alt="Snowflake AI Data Cloud architecture"
              className={styles.realDiagramImg}
              loading="lazy"
            />
          </div>

          <div>
            <div className={styles.diffEyebrow}>BUILT ON SNOWFLAKE&apos;S AI DATA CLOUD</div>
            <h2 className={styles.builtContentTitle}>A Single Platform for Data, Analytics and AI</h2>
            <p className={styles.builtContentDesc}>
              Snowflake lets us bring data from ERP, POS, WMS, IoT and legacy systems into one governed platform —
              and layer Cortex AI directly on top, without moving data to a separate AI stack.
            </p>
            <div className={styles.featureTagsGrid}>
              {snowflakeFeatures.map((f) => (
                <span key={f} className={styles.featureTag}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMING NEXT BANNER */}
      <section className={styles.sectionComingNext}>
        <div className={styles.comingNextCard}>
          <div className={styles.eyebrowGreen}>COMING NEXT</div>
          <h2 className={styles.comingNextTitle}>Cost-to-Price Simulation Model — In the Pipeline</h2>
          <p className={styles.comingNextDesc}>
            A Cortex AI-powered simulation model to help manufacturers and distributors model cost changes through to
            pricing decisions — currently in development on the Snowflake AI Data Cloud.
          </p>
        </div>
      </section>

      {/* SECTION 7: SNOWFLAKE CASE STUDIES */}
      <section className={styles.sectionCaseStudies}>
        <h2 className={styles.csMainTitle}>Snowflake Case Studies</h2>

        <div className={styles.csThreeGrid}>
          <CaseStudyCard
            slug="revolutionizing-inventory-optimization"
            title="Revolutionizing Inventory Optimization with Snowflake"
            image="/images/retail_inventory_dashboard.png"
          />
          <CaseStudyCard
            href="/case-studies/optimizing-shipment-and-fleet-operations"
            title="Optimizing Shipment and Fleet Operations with Snowflake"
            image="/images/case-studies/optimizing-shipment-fleet-snowflake.png"
          />
          <CaseStudyCard
            href="/case-studies/streamlining-shipment-planning-and-carrier-selection"
            title="Streamlining Shipment Planning and Carrier Selection"
            image="/images/case-studies/precision-abm-snowflake-cortex.png"
          />
          <CaseStudyCard
            href="/case-studies/migrating-hadoop-and-hana-to-snowflake"
            title="Migrating Hadoop and HANA to Snowflake for a Manufacturing Enterprise"
            image="/images/case-studies/manufacturing-data-platform.png"
          />
        </div>
      </section>

      {/* SECTION 8: READY TO TURN DATA INTO A BUSINESS ASSET CTA */}
      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>Ready to Turn Data Into a Business Asset?</h2>
          <p className={styles.ctaDesc}>
            From migration to modernization, our certified Snowflake experts help enterprises build a data platform
            their business can actually trust.
          </p>
          <div className={styles.btnGroup} style={{ justifyContent: 'center' }}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Snowflake Expert
            </Link>
            <Link href="/case-studies" className={styles.btnSecondary}>
              Explore All Case Studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
