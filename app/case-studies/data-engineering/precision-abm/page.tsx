import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../../[slug]/page.module.css'

export const metadata: Metadata = {
  title: 'Precision ABM, Powered by Cortex AI within the Snowflake AI Data Cloud — IdentifYou',
  description:
    'Comprehensive case study on Precision ABM leveraging Snowflake Cortex AI, Streamlit, Power BI, and dbt to unify customer intelligence and accelerate B2B revenue pipeline.',
}

export default function PrecisionABMCaseStudyPage() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        {' / '}
        <Link href="/case-studies" className={styles.breadcrumbLink}>Case Studies</Link>
        {' / '}
        <Link href="/deep-tech/data-engineering" className={styles.breadcrumbLink}>Data Engineering</Link>
        {' / '}
        Precision ABM, Powered by Cortex AI
      </div>

      <section className={styles.content}>
        <div
          className={styles.tagBadge}
          style={{ color: '#96c73d', backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }}
        >
          ENTERPRISE · DATA ENGINEERING · SNOWFLAKE CORTEX AI
        </div>

        <h1 className={styles.title}>
          Precision ABM, Powered by Cortex AI within the Snowflake AI Data Cloud
        </h1>

        <div className={styles.heroImgWrapper}>
          <img
            src="/images/snowflake_cortex_architecture.png"
            alt="Precision ABM Powered by Snowflake Cortex AI"
            className={styles.heroIllustration}
          />
        </div>

        <div className={styles.metaBlockGrid}>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Industry: </span>
            <span className={styles.metaBlockValue}>Enterprise &amp; B2B Technology</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Platform: </span>
            <span className={styles.metaBlockValue}>Snowflake AI Data Cloud</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>AI Engine: </span>
            <span className={styles.metaBlockValue}>Snowflake Cortex AI</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Visualization: </span>
            <span className={styles.metaBlockValue}>Streamlit &amp; Power BI</span>
          </div>
        </div>

        <div className={styles.docItemsBlock}>
          <h2 className={styles.h2}>Strategic Foundation</h2>
          <p className={styles.secPara}>
            Empowering data-driven sales and marketing decisions, the Account Based Marketing solution unifies ICP Analysis, Account Fit Scoring, Engagement Intelligence, Deal Analytics, and Revenue Insights into a single analytical framework. By identifying high-value accounts, measuring engagement effectiveness, and tracking opportunity progression, organizations can prioritize efforts that drive measurable business outcomes.
          </p>

          <h3 className={styles.h3}>Strategy identifies the opportunity; data accelerates the outcome.</h3>
          <p className={styles.secPara}>
            This four-phase Account Based Marketing Framework (Sales Foundation, Pre-Sales Engagement, Deals &amp; Activities, and Sales Closure) provides end-to-end visibility across the customer journey, helping teams align marketing and sales efforts while improving conversion effectiveness.
          </p>

          <h4 className={styles.h4}>Smart Sales Framework</h4>
          
          <div className={styles.tableBlock}>
            <div className={styles.tableWrapper}>
              <table className={styles.compTable}>
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Strategic Focus</th>
                    <th>Business Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tradCol}><strong>Sales Foundation</strong></td>
                    <td>ICP analysis, account fit evaluation, and intent identification.</td>
                    <td className={styles.aiCol}>Account Intelligence</td>
                  </tr>
                  <tr>
                    <td className={styles.tradCol}><strong>Pre-Sales Engagement</strong></td>
                    <td>Engagement monitoring and contact activity analysis.</td>
                    <td className={styles.aiCol}>Engagement Insights</td>
                  </tr>
                  <tr>
                    <td className={styles.tradCol}><strong>Deals &amp; Activities</strong></td>
                    <td>Deal velocity, pipeline visibility, and opportunity tracking.</td>
                    <td className={styles.aiCol}>Sales Performance</td>
                  </tr>
                  <tr>
                    <td className={styles.tradCol}><strong>Sales Closure</strong></td>
                    <td>Close-rate analysis and revenue optimization.</td>
                    <td className={styles.aiCol}>Conversion Intelligence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className={styles.secPara}>
            By integrating these critical business functions, organizations gain a unified analytical view that improves account prioritization, opportunity management, and revenue performance.
          </p>

          <h2 className={styles.h2}>ABM Analytics &amp; Visualization Engine — Power BI &amp; Snowflake</h2>
          
          <h3 className={styles.h3}>Executive Intelligence</h3>
          <ul className={styles.secBullets}>
            <li><strong>Account Visibility:</strong> Monitor ICP Match Scores, Account Fit Scores, Intent Signals, and Opportunity Performance from a centralized dashboard.</li>
            <li><strong>Performance Insights:</strong> Analyze engagement trends, pipeline progression, and conversion effectiveness.</li>
            <li><strong>Unified Reporting:</strong> Consolidate marketing, sales, and account intelligence into a single decision-making platform.</li>
          </ul>

          <h3 className={styles.h3}>Operational Agility</h3>
          <ul className={styles.secBullets}>
            <li><strong>Interactive Analytics:</strong> Explore account performance through dynamic dashboards and drill-through reporting.</li>
            <li><strong>Engagement Intelligence:</strong> Understand how contacts and accounts interact throughout the buying journey.</li>
            <li><strong>Revenue Optimization:</strong> Identify high-potential opportunities and improve sales outcomes through data-driven insights.</li>
          </ul>

          <div style={{ marginTop: '48px', padding: '28px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>
              Sub-Case Study: Power BI ABM Analytics &amp; Installation Guide
            </div>
            <p className={styles.secPara} style={{ margin: 0 }}>
              Access the complete Power BI ABM framework, deployment guide, Snowflake connection parameters, configuration options, validation steps, troubleshooting, and user guide below.
            </p>
            <Link
              href="/case-studies/data-engineering/power-bi-abm"
              className={styles.btnPrimary}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#96c73d',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
            >
              POWER BI ABM →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
