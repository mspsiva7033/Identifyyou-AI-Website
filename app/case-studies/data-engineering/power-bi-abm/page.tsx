import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../../[slug]/page.module.css'

export const metadata: Metadata = {
  title: 'Power BI ABM — Strategic Framework & Installation Guide | IdentifYou',
  description:
    'Complete installation, configuration, troubleshooting, and strategic user guide for the Power BI Account Based Marketing application on Snowflake AI Data Cloud.',
}

export default function PowerBIABMCaseStudyPage() {
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
        <Link href="/case-studies/data-engineering/precision-abm" className={styles.breadcrumbLink}>Precision ABM</Link>
        {' / '}
        Power BI ABM
      </div>

      <section className={styles.content}>
        <div
          className={styles.tagBadge}
          style={{ color: '#96c73d', backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }}
        >
          DATA ENGINEERING · POWER BI &amp; SNOWFLAKE · ABM
        </div>

        <h1 className={styles.title}>Account Based Marketing — Power BI ABM</h1>

        <div className={styles.heroImgWrapper}>
          <img
            src="/images/snowflake_cortex_architecture.png"
            alt="Power BI ABM Snowflake Analytics Engine"
            className={styles.heroIllustration}
          />
        </div>

        <div className={styles.metaBlockGrid}>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Category: </span>
            <span className={styles.metaBlockValue}>Data Engineering / Power BI</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Data Warehouse: </span>
            <span className={styles.metaBlockValue}>Snowflake AI Data Cloud</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>App Marketplace: </span>
            <span className={styles.metaBlockValue}>Microsoft AppSource</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Auth Type: </span>
            <span className={styles.metaBlockValue}>Basic Authentication</span>
          </div>
        </div>

        <div className={styles.docItemsBlock}>
          {/* Strategic Foundation */}
          <h2 className={styles.h2}>Strategic Foundation: Turning Account Intelligence into Revenue Growth</h2>
          <p className={styles.secPara}>
            Empowering data-driven sales and marketing decisions, the Account Based Marketing framework unifies ICP Analysis, Account Fit Scoring, Engagement Intelligence, Deal Analytics, and Revenue Insights into a single analytical framework. By identifying high-value accounts, measuring engagement effectiveness, and tracking opportunity progression, organizations can prioritize efforts that drive measurable business outcomes.
          </p>

          <h3 className={styles.h3}>Strategy identifies the opportunity; data accelerates the outcome.</h3>
          <p className={styles.secPara}>
            This four-phase Account Based Marketing Framework (Sales Foundation, Pre-Sales Engagement, Deals &amp; Activities, and Sales Closure) provides end-to-end visibility across the customer journey, helping teams align marketing and sales efforts while improving conversion effectiveness.
          </p>

          <h4 className={styles.h4}>Account Based Marketing Framework</h4>
          
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

          {/* Visualization Engine */}
          <h2 className={styles.h2}>The ABM &amp; Visualization Engine — Power BI &amp; Snowflake</h2>

          <h3 className={styles.h3}>1. Executive Intelligence</h3>
          <ul className={styles.secBullets}>
            <li><strong>Account Visibility:</strong> Monitor ICP Match Scores, Account Fit Scores, Intent Signals, and Opportunity Performance from a centralized dashboard.</li>
            <li><strong>Performance Insights:</strong> Analyze engagement trends, pipeline progression, and conversion effectiveness.</li>
            <li><strong>Unified Reporting:</strong> Consolidate marketing, sales, and account intelligence into a single decision-making platform.</li>
          </ul>

          <h3 className={styles.h3}>2. Operational Agility</h3>
          <ul className={styles.secBullets}>
            <li><strong>Interactive Analytics:</strong> Explore account performance through dynamic dashboards and drill-through reporting.</li>
            <li><strong>Engagement Intelligence:</strong> Understand how contacts and accounts interact throughout the buying journey.</li>
            <li><strong>Revenue Optimization:</strong> Identify high-potential opportunities and improve sales outcomes through data-driven insights.</li>
          </ul>

          <h3 className={styles.h3}>Business Outcome</h3>
          <p className={styles.secPara}>
            Transform account-level data into actionable intelligence that enables smarter decisions, stronger engagement, and predictable revenue growth.
          </p>

          {/* Installation Guide */}
          <h2 className={styles.h2}>Installation Guide</h2>

          <h3 className={styles.h3}>Prerequisites</h3>
          <p className={styles.secPara}>
            Before installing the Account Based Marketing application, ensure that:
          </p>
          <ul className={styles.secBullets}>
            <li>Microsoft Power BI access is available.</li>
            <li>A Snowflake account is available.</li>
            <li>Appropriate Snowflake permissions have been granted.</li>
            <li>Required databases, warehouses, and schemas are accessible.</li>
          </ul>

          <h3 className={styles.h3}>Installation Steps</h3>
          <ul className={styles.secBullets}>
            <li>Install the <strong>Account Based Marketing</strong> application from Microsoft AppSource.</li>
            <li>Launch the application.</li>
            <li>When prompted, provide Snowflake connection details.</li>
            <li>Authenticate using valid Snowflake credentials.</li>
            <li>Allow the application to load and refresh the data.</li>
            <li>Review the dashboards and reports.</li>
          </ul>

          {/* Configuration Guide */}
          <h2 className={styles.h2}>Configuration Guide</h2>

          <h3 className={styles.h3}>1. Authentication</h3>
          <p className={styles.secPara}>
            <strong>Authentication Type:</strong> Basic Authentication<br />
            Use your Snowflake username and password when prompted during setup.
          </p>

          <h3 className={styles.h3}>2. Snowflake Connection Parameters</h3>
          <p className={styles.secPara}>
            Provide the following details during configuration:
          </p>
          <ul className={styles.secBullets}>
            <li><strong>Account URL:</strong> For Example <code>&lt;PYPDXGT-BH31415.snowflakecomputing.com&gt;</code></li>
            <li><strong>Warehouse:</strong> For Example <code>&lt;COMPUTE_WH&gt;</code></li>
            <li><strong>Database:</strong> For Example <code>&lt;ABM&gt;</code></li>
            <li><strong>Schema:</strong> For Example <code>&lt;PUBLIC&gt;</code></li>
          </ul>

          <h3 className={styles.h3}>3. Validation</h3>
          <p className={styles.secPara}>
            <strong>After successful configuration:</strong>
          </p>
          <ul className={styles.secBullets}>
            <li>Sales Foundation dashboards should load successfully.</li>
            <li>Pre-Sales Engagement reports should be available.</li>
            <li>Deals &amp; Activities reports should display data.</li>
            <li>Sales Closure reports should be accessible.</li>
          </ul>

          <h3 className={styles.h3}>4. Troubleshooting</h3>
          
          <h4 className={styles.h4}>Unable to Connect to Snowflake</h4>
          <p className={styles.secPara}>Verify:</p>
          <ul className={styles.secBullets}>
            <li>Snowflake Account URL is correct.</li>
            <li>Username and password are valid.</li>
            <li>Warehouse, Database, and Schema values are correct.</li>
            <li>User account has appropriate access permissions.</li>
          </ul>

          <h4 className={styles.h4}>No Data Displayed</h4>
          <p className={styles.secPara}>Verify:</p>
          <ul className={styles.secBullets}>
            <li>Data refresh completed successfully.</li>
            <li>Snowflake objects are accessible.</li>
            <li>Connection parameters were entered correctly.</li>
          </ul>

          {/* User Guide */}
          <h2 className={styles.h2}>User Guide</h2>

          <h3 className={styles.h3}>Sales Foundation</h3>
          <p className={styles.secPara}>
            The Sales Foundation dashboard helps users identify and prioritize high-value target accounts.
          </p>
          <p className={styles.secPara}><strong>Key areas:</strong></p>
          <ul className={styles.secBullets}>
            <li>ICP Match Analysis</li>
            <li>Account Fit Scores</li>
            <li>Intent Score Distribution</li>
            <li>High Intent Accounts</li>
          </ul>
          <p className={styles.secPara}>
            Use this dashboard to identify accounts with the highest probability of engagement and conversion.
          </p>

          <h3 className={styles.h3}>Pre-Sales Engagement</h3>
          <p className={styles.secPara}>
            The Pre-Sales Engagement dashboard provides visibility into account and contact interactions.
          </p>
          <p className={styles.secPara}><strong>Key areas:</strong></p>
          <ul className={styles.secBullets}>
            <li>Engagement Insights</li>
            <li>Top Contact Activities</li>
            <li>Top Engaged Companies</li>
            <li>Sales Accepted Leads (SAL)</li>
            <li>Drop-off Rate</li>
          </ul>
          <p className={styles.secPara}>
            Use this dashboard to measure engagement effectiveness and optimize outreach efforts.
          </p>

          <h3 className={styles.h3}>Deals &amp; Activities</h3>
          <p className={styles.secPara}>
            The Deals &amp; Activities dashboard helps monitor pipeline progression and sales performance.
          </p>
          <p className={styles.secPara}><strong>Key areas:</strong></p>
          <ul className={styles.secBullets}>
            <li>Deal Velocity Score</li>
            <li>Account Level Sentiment Summary</li>
            <li>Sentiment Detailed Activity Data</li>
            <li>Opportunities vs No Opportunities</li>
          </ul>
          <p className={styles.secPara}>
            Use this dashboard to track deal progression and identify opportunities requiring attention.
          </p>

          <h3 className={styles.h3}>Sales Closure</h3>
          <p className={styles.secPara}>
            The Sales Closure dashboard provides insights into conversion performance.
          </p>
          <p className={styles.secPara}><strong>Key areas:</strong></p>
          <ul className={styles.secBullets}>
            <li>Close Rate Analysis</li>
            <li>Champion vs No Champion</li>
          </ul>
          <p className={styles.secPara}>
            Use this dashboard to evaluate conversion effectiveness and improve sales outcomes.
          </p>

          <div style={{ marginTop: '40px', padding: '24px', background: '#F1F5F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <p className={styles.secPara} style={{ margin: 0 }}>
              To Download this App on Microsoft Marketplace, <a href="https://marketplace.microsoft.com/en-us/product/power-bi/entifyoutechnologiesopcprivatelimited1682039191501.abm-powerbi-app?tab=Overview" target="_blank" rel="noopener noreferrer" style={{ color: '#96c73d', fontWeight: 700 }}>click here</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
