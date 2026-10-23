import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../kmat-article.module.css'

export const metadata: Metadata = {
  title: 'KMAT Manufacturer Price Model App',
  description:
    'Policy-driven pricing, governed margin approvals, and automated quote generation powered by Snowflake. Explore the KMAT Pricing Command Center.',
  alternates: {
    canonical: '/deep-tech/data-engineering/kmat-manufacturer-price-model',
  },
}

export default function KmatManufacturerPriceModelPage() {
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
          <span className={styles.breadcrumbCurrent}>KMAT Manufacturer Price Model App</span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className={styles.articleHeader}>
          <span className={styles.badgePill}>Snowflake Native App · Pricing Intelligence</span>
          <h1 className={styles.articleTitle}>KMAT Manufacturer Price Model App</h1>

          <div className={styles.subtitleBox}>
            <p className={styles.subtitleText}>
              Policy-driven prices, governed approvals, and controlled revenue leakage, powered by your own cost data in Snowflake.
            </p>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <strong>Author:</strong> IdentifYou Deep Tech Team
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Category:</strong> Data Engineering &amp; Pricing Architecture
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Deployment:</strong> Snowflake Native App
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaItem}>
              <strong>Security:</strong> Zero Data Egress
            </span>
          </div>
        </header>

        {/* HERO VISUAL */}
        <div className={styles.heroVisualBox}>
          <Image
            src="/images/kmat_manufacturer_price_model.png"
            alt="KMAT Manufacturer Price Model App Interactive Command Center Dashboard"
            width={1200}
            height={675}
            priority
            className={styles.heroImg}
          />
          <div className={styles.heroCaption}>
            <span>
              <strong className={styles.captionTag}>Figure 1:</strong> The KMAT Intelligent Pricing Command Center on Snowflake AI Data Cloud
            </span>
            <span className={styles.captionTag}>Native App Dashboard</span>
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
              Pricing configurable products is hard. Every configuration carries a different cost, every discount erodes margin, and every exception needs someone to sign off. The KMAT Intelligent Pricing Command Center turns the simulated cost of each configuration into a policy-driven price, scores every quote, and routes it to the right approver, all in one Snowflake-native application. Your data stays in your Snowflake account.
            </p>
            <div className={styles.snowflakeCallout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Your data stays in your Snowflake account — Read-only references with zero data egress.</span>
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
                <h3 className={styles.featureTitle}>Cost-driven price corridor</h3>
              </div>
              <p className={styles.featureText}>
                Select a product and one of its cost simulations. The app reads material, labor, machine, and overhead cost and builds a floor, target, and ceiling price from the margin and buffer settings in the Pricing Policy Studio. The target is a true margin target, not a markup on cost.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Discount and demand controls</h3>
              </div>
              <ul className={styles.featureSublist}>
                <li className={styles.featureSubitem}>
                  <strong>Volume discount tiers:</strong> editable quantity bands that apply a discount automatically as order size grows.
                </li>
                <li className={styles.featureSubitem}>
                  <strong>Discount engine:</strong> combines volume, customer tier (Bronze to Platinum), manual, and competitor adjustments, then applies margin protection and a maximum-discount cap.
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Quote Health Score and approval routing</h3>
              </div>
              <p className={styles.featureText}>
                Every quote gets a 0–100 score built from margin achievement, leakage control, price-band adherence, and competitive position. The score routes the quote to auto-approval, Manager review, Director review, or CEO escalation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Executive approval workflow</h3>
              </div>
              <p className={styles.featureText}>
                Pending quotes wait in an approval queue. Approvals are guarded against double decisions, and rejected quotes move atomically to a rejected-quotes archive so they never distort portfolio KPIs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Scenario analysis and Digital Twin</h3>
              </div>
              <p className={styles.featureText}>
                Compare two to four configurations side by side with cost overrides, or run a live what-if sandbox with a cost waterfall, elasticity table, and discount-by-quantity margin heatmap.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={styles.featureCard}>
              <div className={styles.featureCardHeader}>
                <div className={styles.featureDot} />
                <h3 className={styles.featureTitle}>Pricing Playbook &amp; Advisor</h3>
              </div>
              <p className={styles.featureText}>
                Ask pricing questions answered from a built-in playbook, generate a daily intelligence brief, score deal risk, and get prioritized executive recommendations, with every action logged to a ledger.
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
                <strong>Margin protection:</strong> Every price starts from configured cost and your target margin, and below-floor quotes are flagged as loss-making.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Leakage visibility:</strong> The gap between target and quoted price is measured on every quote and classed as Healthy, Warning, or High Risk.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Faster approvals:</strong> Healthy quotes auto-approve, so only exceptions reach managers, directors, and executives.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Transparent results:</strong> Every price, score, and routing decision traces back to visible policy settings and cost data.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Built-in governance:</strong> Tiered approval thresholds, guarded decisions, atomic rejections, and an action ledger keep pricing auditable.
              </p>
            </div>

            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>✓</div>
              <p className={styles.benefitText}>
                <strong>Secure by design:</strong> Cost tables are read through revocable, read-only Snowflake references; nothing is copied out of your account.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHO IT'S FOR */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>TARGET PERSONAS</div>
            <h2 className={styles.sectionTitle}>Who It&apos;s For</h2>
          </div>

          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>01</div>
              <span>Sales and quoting teams building customer quotes</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>02</div>
              <span>Pricing and commercial managers who set margin, discount, and leakage policy</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>03</div>
              <span>Sales managers, commercial directors, and executives approving quotes</span>
            </div>

            <div className={styles.audienceCard}>
              <div className={styles.audienceBadge}>04</div>
              <span>Finance teams tracking margin, leakage, and product profitability</span>
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
                  Bind your Cost Model tables (product master, simulation header, cost summary, and component, operation, and overhead costs) in Customer Onboarding.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Set your policy</h3>
                <p className={styles.stepDesc}>
                  Choose target margin, floor and ceiling buffers, leakage thresholds, approval scores, and volume tiers in the Pricing Policy Studio.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Configure the quote</h3>
                <p className={styles.stepDesc}>
                  Pick a product and simulation, set quantity, discounts, and competitor prices, and review the price corridor and health score.
                </p>
              </div>
            </div>

            <div className={styles.stepRow}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Approve and analyze</h3>
                <p className={styles.stepDesc}>
                  Save the quote, approve or reject it on the Executive Dashboard, and track performance in Analytics.
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
            for onboarding, policy setup, or a walkthrough.
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
            Pricing results depend on the quality and completeness of the cost data and policy settings configured in your account and should be reviewed through your normal commercial approval processes.
          </p>
        </section>

        {/* CROSS-LINK TO SISTER KMAT MODEL */}
        <div className={styles.crossLinkBox}>
          <div>
            <p className={styles.crossLinkText}>
              Need to simulate configurable bill of materials and calculate manufacturing costs?
            </p>
            <strong style={{ fontSize: '16px', color: '#12181B' }}>
              Explore the KMAT Manufacturer Cost Model App
            </strong>
          </div>
          <Link
            href="/deep-tech/data-engineering/kmat-cost-model-app"
            className={styles.crossLinkBtn}
          >
            View Cost Model App →
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
