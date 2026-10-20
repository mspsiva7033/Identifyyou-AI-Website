import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Enterprise Data Engineering & Lakehouse',
  description:
    'Connect, engineer and transform enterprise data into trusted, AI-ready intelligence with certified Snowflake experts.',
  alternates: {
    canonical: '/deep-tech/data-engineering',
  },
}

const platformNodes = [
  'Source Systems',
  'Fivetran / Snowpipe',
  'Snowflake AI Data Cloud',
  'DBT Transformation',
  'Governance',
  'Cortex AI / BI',
  'Business Decisions',
]

const fourCaseStudies = [
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
    title: 'Migrating Hadoop and HANA to Snowflake for Manufacturing',
    href: '/case-studies/migrating-hadoop-and-hana-to-snowflake',
  },
  {
    category: 'RETAIL · FORECASTING',
    title: 'Optimizing Retail Demand Forecasting and Peak Season',
    href: '/case-studies/optimizing-retail-demand-forecasting',
  },
]

export default function DataEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* 1. TOP HERO BANNER (<Banner>) */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/snowflake_cortex_architecture.png"
          alt="Data Engineering Background"
          width="1920"
          height="1080"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>DATA ENGINEERING</div>
            <h1 className={styles.heroBannerTitle}>
              From Enterprise Data to Business Intelligence
            </h1>
            <p className={styles.heroBannerDesc}>
              Connect, engineer and transform data into trusted intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTORY CONTENT SECTION */}
      <section className={styles.sectionIntro}>
        <div className={styles.eyebrowGreen}>DATA FOUNDATION</div>
        <h2 className={styles.introTitle}>
          Engineering the Data Foundation for Intelligent Business
        </h2>
        <p className={styles.introParagraph}>
          Enterprise data is fragmented across ERP, applications, databases and operational systems. IdentifYou connects and engineers this data into a trusted, scalable and AI-ready foundation. We build modern data pipelines, integrations, transformations and quality frameworks to make data reliable and accessible. By unifying data across business functions, we enable a connected view of the enterprise. This foundation powers business intelligence, AI and faster, more informed decisions.
        </p>
      </section>

      {/* 3. PRECISION ABM FEATURED APPLICATION CARD */}
      <section className={styles.sectionPrecisionAbm}>
        <div className={styles.precisionAbmCard}>
          <div className={styles.precisionAbmGrid}>
            <div className={styles.precisionAbmContent}>
              <span className={styles.greenPillBadge}>Live in Snowflake Marketplace</span>
              <h2 className={styles.precisionAbmTitle}>
                Precision ABM, Powered by Cortex AI — Built Natively on Snowflake
              </h2>
              <p className={styles.precisionAbmDesc}>
                Our account-based marketing application runs Cortex AI directly inside the Snowflake AI Data Cloud — no data movement, no separate AI stack. It&apos;s the proof point behind everything we build in data engineering.
              </p>
              <div className={styles.btnGroup}>
                <Link
                  href="/case-studies/precision-abm-snowflake-cortex"
                  className={styles.btnPrimary}
                >
                  View the ABM Success Story
                </Link>
                <Link href="/contact" className={styles.btnSecondaryDark}>
                  Talk to a Snowflake Expert
                </Link>
              </div>
            </div>
            <div className={styles.precisionAbmVisual}>
              <img
                src="/images/precision_abm_dashboard.png"
                alt="Precision ABM scoring and targeting screen"
                width="600"
                height="400"
                loading="lazy"
                className={styles.realAbmImg}
              />
            </div>
          </div>
          <div className={styles.precisionAbmCaption}>
            <Link href="/case-studies/precision-abm-snowflake-cortex" className={styles.captionLink}>
              Precision ABM, Powered by Cortex AI within the Snowflake AI Data Cloud — IdentifYou | IdentifYou Technologies
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COMING NEXT BANNER SECTION */}
      <section className={styles.sectionComingNext}>
        <div className={styles.comingNextCard}>
          <span className={styles.greenPillBadge}>COMING NEXT</span>
          <h2 className={styles.comingNextTitle}>Cost-to-Price Simulation Model — In the Pipeline</h2>
          <p className={styles.comingNextDesc}>
            A Cortex AI-powered simulation model to help manufacturers and distributors model cost changes through to pricing decisions — currently in development on the Snowflake AI Data Cloud.
          </p>
        </div>
      </section>

      {/* 4B. KMAT BLOG-STYLE CONTENT MODELS CARDS */}
      <section className={styles.sectionNews}>
        <div className={styles.newsContainer}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className={styles.greenPillBadge}>KMAT APPLICATIONS</span>
            <h2 className={styles.newsMainTitle} style={{ marginBottom: '14px' }}>
              KMAT Cost-to-Price Simulation Models
            </h2>
            <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15.5px', color: '#5B6862', lineHeight: '1.65' }}>
              Explore our Snowflake-native applications designed to turn complex configuration rules and master data into accurate product costs and policy-governed prices.
            </p>
          </div>

          <div className={styles.newsGrid}>
            {/* Card 1: KMAT Manufacturer Price Model */}
            <Link
              href="/deep-tech/data-engineering/kmat-manufacturer-price-model"
              className={styles.newsCard}
            >
              <div className={styles.newsImgBox}>
                <img
                  src="/images/kmat_manufacturer_price_model.png"
                  alt="KMAT Manufacturer Price Model App"
                  width="600"
                  height="340"
                  loading="lazy"
                  className={styles.realNewsImg}
                />
              </div>
              <div className={styles.newsBody}>
                <div className={styles.newsTag}>PRICING MODEL · SNOWFLAKE NATIVE</div>
                <h3 className={styles.newsTitle}>KMAT Manufacturer Price Model</h3>
                <p className={styles.newsDesc}>
                  Policy-driven prices, governed approvals, and controlled revenue leakage, powered by your own cost data in Snowflake. Turn simulated costs into policy-driven prices, score quote health, and route approvals.
                </p>
                <span className={styles.newsLink}>
                  Read Article →
                </span>
              </div>
            </Link>

            {/* Card 2: KMAT Cost Model App */}
            <Link
              href="/deep-tech/data-engineering/kmat-cost-model-app"
              className={styles.newsCard}
            >
              <div className={styles.newsImgBox}>
                <img
                  src="/images/kmat_cost_model_app.png"
                  alt="KMAT Cost Model App"
                  width="600"
                  height="340"
                  loading="lazy"
                  className={styles.realNewsImg}
                />
              </div>
              <div className={styles.newsBody}>
                <div className={styles.newsTag}>COST SIMULATION · RULE-BASED</div>
                <h3 className={styles.newsTitle}>KMAT Cost Model App</h3>
                <p className={styles.newsDesc}>
                  Accurate, explainable manufacturing costs and faster RFQ quotes, powered by your own data in Snowflake. Rule-based cost simulation, built-in scrap and commodity risk adjustments, and quote confidence scoring.
                </p>
                <span className={styles.newsLink}>
                  Read Article →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SUCCESS STORY SECTION (<Success Story>) */}
      <section className={styles.sectionCaseStudies}>
        <div className={styles.featuredCaseStudyCard}>
          <div className={styles.csVisualContainer}>
            <img
              src="/images/retail_inventory_dashboard.png"
              alt="Retail inventory dashboard powered by Snowflake"
              width="600"
              height="400"
              loading="lazy"
              className={styles.realCsImg}
            />
          </div>

          <div>
            <div className={styles.csFeaturedTag}>FEATURED SUCCESS STORY</div>
            <h2 className={styles.csFeaturedTitle}>
              Revolutionizing Inventory Optimization with Snowflake
            </h2>

            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Industry — </span>Retail
            </p>
            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Challenge — </span>Lack of real-time inventory visibility, unreliable demand forecasting and high carrying costs.
            </p>
            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Solution — </span>Unified POS, WMS and IoT data on Snowflake with predictive analytics for demand forecasting.
            </p>

            <div className={styles.csStatBadges}>
              <span className={styles.csStatBadge}>40% fewer stockouts</span>
              <span className={styles.csStatBadge}>+15% seasonal revenue</span>
              <span className={styles.csStatBadge}>-20% operational cost</span>
            </div>

            <Link
              href="/case-studies/revolutionizing-inventory-optimization"
              className={styles.csLink}
            >
              Read the full success story →
            </Link>
          </div>
        </div>

        {/* 4 Additional Success Stories Grid */}
        <div className={styles.csFourGrid}>
          {fourCaseStudies.map((cs) => (
            <Link key={cs.title} href={cs.href} className={styles.csGridCard}>
              <div>
                <div className={styles.csCategoryTag}>{cs.category}</div>
                <h3 className={styles.csGridTitle}>{cs.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. SNOWFLAKE PARTNER BANNER (<Success Story> <Banner>) */}
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

      {/* 7. PLATFORM ENGINEERING SECTION */}
      <section className={styles.sectionPlatformEng}>
        <div className={styles.platformEngCard}>
          <div className={styles.eyebrowGreen}>PLATFORM ENGINEERING</div>
          <h2 className={styles.diffTitle}>We Engineer the Complete Data Platform</h2>

          <div className={styles.diagramContainer}>
            <img
              src="/images/enterprise_data_platform_diagram.png"
              alt="Enterprise data platform complete architecture diagram"
              width="1200"
              height="675"
              loading="lazy"
              className={styles.realDiagramImg}
            />
          </div>

          <FlowChain nodes={platformNodes} />
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>Ready to Turn Data Into a Business Asset?</h2>
          <p className={styles.ctaDesc}>
            From migration to modernization, our certified Snowflake experts help enterprises build a data platform their business can actually trust.
          </p>
          <div className={styles.btnGroup} style={{ justifyContent: 'center' }}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Snowflake Expert
            </Link>
            <Link href="/case-studies" className={styles.btnSecondary}>
              Explore All Success Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

