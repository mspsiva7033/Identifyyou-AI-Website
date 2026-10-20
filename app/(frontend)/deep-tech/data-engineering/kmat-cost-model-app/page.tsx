import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../kmat-article.module.css'

export const metadata: Metadata = {
  title: 'KMAT Manufacturer Cost Model App | Rule-Based Snowflake Native Cost Simulation',
  description:
    'Accurate, explainable manufacturing costs and faster RFQ quotes, powered by your own data in Snowflake. Explore the KMAT Manufacturer Cost Model App.',
  alternates: {
    canonical: '/deep-tech/data-engineering/kmat-cost-model-app',
  },
}

export default function KmatCostModelAppPage() {
  return (
    <div className={styles.page}>
      <Header />

      <article className={styles.articleContainer}>
        {/* BREADCRUMB */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/deep-tech" className={styles.breadcrumbLink}>
            Deep Tech
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/deep-tech/data-engineering" className={styles.breadcrumbLink}>
            Data Engineering
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>KMAT Manufacturer Cost Model App</span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className={styles.articleHeader}>
          <span className={styles.badgePill}>Snowflake Native App · Rule-Based Cost Simulation</span>
          <h1 className={styles.articleTitle}>KMAT Manufacturer Cost Model App</h1>

          <div className={styles.subtitleBox}>
            <p className={styles.subtitleText}>
              Accurate, explainable manufacturing costs and faster RFQ quotes, powered by your own data in Snowflake
            </p>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <strong>Author:</strong> IdentifYou Deep Tech Team
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Category:</strong> Manufacturing Cost Engineering &amp; RFQ Intelligence
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Deployment:</strong> Snowflake Native App
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Architecture:</strong> Fully Rule-Based
            </span>
          </div>
        </header>

        {/* HERO VISUAL */}
        <div className={styles.heroVisualBox}>
          <Image
            src="/images/kmat_cost_model_app.png"
            alt="KMAT Manufacturer Cost Model App Interactive Simulation Dashboard"
            width={1200}
            height={675}
            priority
            className={styles.heroImg}
          />
          <div className={styles.heroCaption}>
            <span>
              <strong className={styles.captionTag}>Figure 1:</strong> The KMAT Rule-Based Cost Model App running natively on Snowflake
            </span>
            <span className={styles.captionTag}>Simulation &amp; RFQ Dashboard</span>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>EXECUTIVE SUMMARY</div>
            <h2 className={styles.sectionTitle}>Overview</h2>
          </div>
          <div className={styles.overviewCard}>
            <p className={styles.overviewParagraph}>
              Quoting configurable products is complex. Every engine, cab, wheel, or body option changes the bill of materials, the routing, and the final cost. The KMAT Manufacturer Cost Model App brings this into one Snowflake-native application that calculates product costs from your own master data and turns customer RFQs into reliable quotes.
            </p>
            <p className={styles.overviewParagraph}>
              Your data stays in your Snowflake account. The app is fully rule-based.
            </p>
            <div className={styles.snowflakeCallout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Your data stays in your Snowflake account. The app is fully rule-based.</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT IT DOES */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>CORE CAPABILITIES</div>
            <h2 className={styles.sectionTitle}>What It Does</h2>
          </div>

          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Configuration-based cost simulation</h3>
              </div>
              <p className={styles.featureText}>
                Select a product, choose its characteristics, and run a simulation. The app uses a dependency rule engine to include only the components, operations, and overheads that apply, then returns a full breakdown of material, labor, machine, and overhead costs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Built-in cost risk adjustments</h3>
              </div>
              <ul className={styles.featureSublist}>
                <li className={styles.featureSubitem}>
                  <strong>Configuration Scrap Score (CSS):</strong> accounts for scrap risk based on configuration complexity.
                </li>
                <li className={styles.featureSubitem}>
                  <strong>Forward Material Index (FMIS):</strong> adjusts commodity-sensitive materials using forward-looking price forecasts.
                </li>
                <li className={styles.featureSubitem}>
                  <strong>Tool Degradation Factor (TDS):</strong> reflects tool and machine wear in maintenance costs.
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>RFQ intake and quoting</h3>
              </div>
              <p className={styles.featureText}>
                Paste RFQ text or upload PDF, DOCX, or TXT documents. The app extracts product characteristics, maps them to your configured values, and runs the quote workflow.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Quote confidence scoring</h3>
              </div>
              <p className={styles.featureText}>
                Every RFQ gets a BOM Match Confidence Score (BMCS) that shows whether the quote is auto approved, recommended for review, or requires mandatory engineering review.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Scenario analysis</h3>
              </div>
              <p className={styles.featureText}>
                Compare configurations side by side, review scenario history, and see which components drive cost.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: KEY BENEFITS */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>BUSINESS IMPACT</div>
            <h2 className={styles.sectionTitle}>Key Benefits</h2>
          </div>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Faster quoting:</strong> Cut manual effort in turning RFQs into cost configurations.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Transparent results:</strong> Every figure is explainable and auditable, and fallbacks are clearly flagged.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Risk-aware pricing:</strong> Scrap, commodity, and tool-wear risks are built into the cost.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Built-in governance:</strong> Confidence thresholds, route low-confidence quotes to engineering review.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Secure by design:</strong> Runs entirely inside your Snowflake environment.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Flexible product coverage:</strong> Supports trucks, cars, buses, and any other configurable product line you define.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHO IT'S FOR */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>TARGET PERSONAS</div>
            <h2 className={styles.sectionTitle}>Who It’s For</h2>
          </div>

          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>01</div>
              <span>Manufacturing cost engineers and estimators</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>02</div>
              <span>Sales and quoting teams handling RFQs</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>03</div>
              <span>Engineering teams reviewing configuration feasibility</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>04</div>
              <span>Finance and pricing teams analyzing cost drivers</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: HOW IT WORKS */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>END-TO-END WORKFLOW</div>
            <h2 className={styles.sectionTitle}>How It Works</h2>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Connect your data</h3>
                <p className={styles.stepDesc}>
                  Link your BOM, routing, cost, rate, overhead, and rule tables to the app.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Select and configure</h3>
                <p className={styles.stepDesc}>
                  Choose a product and its characteristics or process an RFQ document.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Simulate</h3>
                <p className={styles.stepDesc}>
                  Run the cost simulation and review the baseline and risk-adjusted results.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Review and quote</h3>
                <p className={styles.stepDesc}>
                  Check the confidence score, compare scenarios, and prepare your quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: GET STARTED */}
        <section className={styles.getStartedCard}>
          <div className={styles.eyebrow} style={{ color: '#94C640' }}>READY TO DEPLOY</div>
          <h2 className={styles.getStartedTitle}>Get Started</h2>
          <p className={styles.getStartedDesc}>
            Available on the Snowflake Marketplace. Contact us at{' '}
            <a href="mailto:ai.support@identifyyou.in" className={styles.emailLink}>
              ai.support@identifyyou.in
            </a>{' '}
            for onboarding, product setup, or a walkthrough.
          </p>

          <div className={styles.btnGroup}>
            <a href="mailto:ai.support@identifyyou.in" className={styles.btnPrimary}>
              Contact ai.support@identifyyou.in
            </a>
            <Link href="/contact" className={styles.btnSecondary}>
              Schedule a Walkthrough
            </Link>
          </div>

          <p className={styles.disclaimerText}>
            Cost results depend on the quality and completeness of the master data and rules configured in your account and should be reviewed through your normal commercial and engineering approval processes.
          </p>
        </section>

        {/* CROSS-LINK TO SISTER KMAT MODEL */}
        <div className={styles.crossLinkBox}>
          <div>
            <p className={styles.crossLinkText}>
              Need to turn calculated manufacturing costs into policy-driven prices and approval workflows?
            </p>
            <strong style={{ fontSize: '16px', color: '#12181B' }}>
              Explore the KMAT Manufacturer Price Model App
            </strong>
          </div>
          <Link
            href="/deep-tech/data-engineering/kmat-manufacturer-price-model"
            className={styles.crossLinkBtn}
          >
            View Price Model App →
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
