import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Enterprise Digital Engineering Solutions',
  description:
    'Custom business applications, enterprise integrations, customer platforms, and low-code operational tools built for performance.',
  alternates: {
    canonical: '/deep-tech/digital-engineering',
  },
}

const techEcosystemPills = [
  'Microsoft PowerApps',
  'Python',
  'Node.js',
  'React.js',
  'Freshdesk',
  'Azure',
  'AWS',
  'SQL',
]

const digitalCaseStudies = [
  {
    slug: 'cost-model-simulation',
    title: 'Cost Model for K-Type Configuration Manufacturing',
    tag: 'MANUFACTURING · COST SIMULATION · DIGITAL ENGINEERING',
    categories: ['Digital Engineering', 'Manufacturing', 'Automation'],
    image: '/images/case-studies/cost-model-simulation.png',
  },
  {
    slug: 'enhancing-support-efficiency-with-integrated-order-management',
    title: 'Integrating & Extending CRM Platforms Like Freshdesk',
    tag: 'CRM & SUPPORT · FRESHDESK · ORDER MANAGEMENT',
    categories: ['Digital Engineering', 'Automation'],
    image: '/images/case-studies/enhancing-support-efficiency-with-integrated-order-management.png',
  },
  {
    slug: 'overcoming-data-access-challenges',
    title: 'Overcoming Data Access Challenges in a Multi-Business Environment',
    tag: 'MULTI-BUSINESS DATA · BI ANALYTICS · DECISION MAKING',
    categories: ['Digital Engineering', 'Data'],
    image: '/images/case-studies/overcoming-data-access-challenges.png',
  },
]

export default function DigitalEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: TOP HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/digital_engineering_hero.png"
          alt="Digital Engineering Background"
          width="1920"
          height="1080"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>DIGITAL ENGINEERING</div>
            <h1 className={styles.heroTitle}>
              Engineering Digital Solutions That Drive Business
            </h1>
            <p className={styles.heroDesc}>
              We engineer digital solutions that simplify complexity and drive business value.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Talk to a Digital Engineering Expert
              </Link>
              <Link href="/success-stories" className={styles.btnSecondaryDark}>
                Explore Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MAIN INTRO SECTION */}
      <section className={styles.sectionIntro}>
        <div className={styles.eyebrowGreen}>BUSINESS FIRST APPROACH</div>
        <h2 className={styles.introTitle}>
          Engineering Digital Solutions for Real-World Business
        </h2>
        <p className={styles.introParagraph}>
          IdentifYou engineers custom digital solutions that solve complex business and operational challenges.
          We combine modern application engineering, cloud, data, AI and integration capabilities to build scalable digital solutions.
          From business applications and enterprise integrations to customer and operational platforms, we connect technology with real business needs.
          Our Business First approach ensures every solution is designed around measurable business value, agility and long-term growth.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          We help companies replace slow manual processes with fast digital workflows. Our tools integrate cleanly with your existing databases, ERPs, and CRM systems. Your team gets work done faster, with fewer manual errors and lower operating costs.
        </p>
      </section>

      {/* SECTION 3: FEATURED SUCCESS STORY SHOWCASE */}
      <section id="case-studies" className={styles.sectionCaseStudyCard}>
        <div className={styles.container}>
          <div className={styles.csCardBorder}>
            <div className={styles.csHeaderRow}>
              <div className={styles.eyebrowGreen}>FEATURED SUCCESS STORY</div>
              <h3 className={styles.csHeaderTitle}>
                Digital Transformation of the RFQ Management Process in D365 Business Central
              </h3>
            </div>

            <div className={styles.csSplitGrid}>
              <div className={styles.csVisualBox}>
                <Link href="/success-stories/enhancing-the-rfq-process-in-d365-business-central">
                  <img
                    src="/images/case-studies/enhancing-the-rfq-process-in-d365-business-central.png"
                    alt="RFQ management dashboard with vendor comparison view"
                    width="600"
                    height="400"
                    className={styles.csImg}
                  />
                </Link>
                <div className={styles.csCaptionOverlay}>
                  RFQ management dashboard with vendor comparison view
                </div>
              </div>

              <div className={styles.csContentBox}>
                <div className={styles.csEyebrow}>INDUSTRY — MANUFACTURING</div>
                <h3 className={styles.csTitle}>
                  <Link href="/success-stories/enhancing-the-rfq-process-in-d365-business-central" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Streamlining Quotation &amp; Vendor Management in D365
                  </Link>
                </h3>

                <p className={styles.csDetailRow}>
                  <span className={styles.csDetailLabel}>Challenge — </span>
                  Incomplete RFQs, unorganized vendor communication, and zero visibility into request status.
                </p>

                <p className={styles.csDetailRow}>
                  <span className={styles.csDetailLabel}>Solution — </span>
                  A Microsoft PowerApps system for requirement capture, vendor communication, tracking, and comparative response analysis.
                </p>

                <div className={styles.csStatRow}>
                  <span className={styles.csStatBadge}>⚡ 30% Faster Vendor Onboarding</span>
                  <span className={styles.csStatBadge}>📈 50% Faster Evaluation</span>
                </div>

                <div>
                  <Link
                    href="/success-stories/enhancing-the-rfq-process-in-d365-business-central"
                    className={styles.btnPrimary}
                    style={{ textDecoration: 'none' }}
                  >
                    Read the Full Success Story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIGITAL ENGINEERING SUCCESS STORIES GRID */}
      <section className={styles.sectionCaseStudyBanner}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen} style={{ textAlign: 'center' }}>
            MORE DIGITAL ENGINEERING SUCCESS STORIES
          </div>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '36px' }}>
            Proven Digital Solutions in Action
          </h2>

          <div className={styles.caseStudiesGrid}>
            {digitalCaseStudies.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                slug={cs.slug}
                title={cs.title}
                tag={cs.tag}
                categories={cs.categories}
                image={cs.image}
                href={`/success-stories/${cs.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNOLOGY ECOSYSTEM */}
      <section className={styles.sectionTechEcosystem}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>TECHNOLOGY ECOSYSTEM</div>
          <h2 className={styles.sectionTitle}>Powered by the Right Application Technology</h2>
          <p className={styles.techSubtitle}>
            Enterprise application engineering requires the right combination of low-code platforms, custom code and integration tooling.
          </p>

          <div className={styles.techPillsRow}>
            {techEcosystemPills.map((pill) => (
              <div key={pill} className={styles.techPill}>
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA BANNER */}
      <section className={styles.sectionCtaDark}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>
            Ready to Engineer Your Next Business Application?
          </h2>
          <p className={styles.ctaSubtitle}>
            From RFQ management to customer support, we help enterprises build applications people actually adopt.
          </p>
          <div className={styles.ctaBtnGroup}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Digital Engineering Expert
            </Link>
            <Link href="/success-stories" className={styles.btnSecondaryDark}>
              Explore All Success Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
