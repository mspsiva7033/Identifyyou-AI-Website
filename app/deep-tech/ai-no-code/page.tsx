import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI & No-Code Platform — Build Business Applications in Business Language',
  description:
    'Build business applications from natural language and enterprise data—with seamless system integration.',
}

const textToAppFlow = [
  'Business Language',
  'AI / Natural Language',
  'Application Generation',
  'Enterprise Data & Systems',
  'Working Business Application',
]

const dataToAppFlow = [
  'Enterprise Data',
  'Data-to-Application',
  'Business / Industrial Application',
]

const highlights = [
  'Business-language-driven application creation',
  'AI-assisted development',
  'No-code configuration',
  'Workflow automation',
  'Data integration',
  'Role-based applications',
  'SaaS capability',
  'Reduced dependency on traditional development',
]

const platformCapabilities = [
  {
    icon: '💬',
    title: 'Text-to-Application',
    desc: 'Transform natural language descriptions and business rules into relational schemas, form interfaces, and REST APIs automatically.',
    tag: 'NLP ENGINE',
  },
  {
    icon: '📊',
    title: 'Data-to-Application',
    desc: 'Automatically inspect enterprise databases and Excel sheets to build interactive CRUD portals, management tools, and analytics UI.',
    tag: 'DATA SYNTHESIS',
  },
  {
    icon: '🏢',
    title: 'Business & Industrial Apps',
    desc: 'Build operational tools for shop floor execution, procurement intelligence, supplier portals, and executive management.',
    tag: 'INDUSTRIAL READY',
  },
  {
    icon: '🔌',
    title: 'Enterprise System Integration',
    desc: 'Seamlessly integrate with ERP (SAP, Oracle), MES, relational databases, cloud APIs, and third-party enterprise platforms.',
    tag: 'SYSTEM CONNECTORS',
  },
  {
    icon: '🛡️',
    title: 'Role-Based Security & Governance',
    desc: 'Enterprise-grade RBAC, single sign-on (SSO), row-level data security, and audit trails baked natively into every generated app.',
    tag: 'ENTERPRISE RBAC',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native & Lifecycle Deployment',
    desc: 'Manage Dev, Staging, and Production environments with revision control, feature promotion, and cloud packaging.',
    tag: 'LIFECYCLE CONTROL',
  },
]

const successStories = [
  {
    title: 'Business Driven Software System',
    slug: 'business-driven-software-system',
    tag: 'ENTERPRISE OPERATIONS · BUSINESS ARCHITECTURE',
    desc: 'Enables business users to express requirements in business terms and build, change, and control business functions without writing code—shifting from software built for the business to software built by the business.',
    industry: 'Enterprise Operations',
    challenge: 'Traditional software development requires translating requirements to IT teams, creating bottlenecks where simple functional updates take weeks or months.',
    solution: 'Business-Owned No-Code Platform that understands business context (plants, suppliers, approval rules) to build business-driven software.',
    metricVal: 'Business-Owned',
    metricLbl: 'Rules & Logic Control',
  },
  {
    title: 'NLP based Text-to-Business Application',
    slug: 'nlp-text-to-business-application',
    tag: 'OPERATIONAL AUTOMATION · NLP ENGINE',
    desc: 'Translate natural language requirements directly into working business applications while leveraging a continuously evolving knowledge base of reusable business rules.',
    industry: 'Process Automation',
    challenge: 'Converting business requirements into software requires multiple analysis and dev cycles, often duplicating existing logic and workflows.',
    solution: 'NLP engine parsing plain text descriptions to assemble UIs, business rules, workflows, validations, and actions automatically.',
    metricVal: 'Text-to-App',
    metricLbl: 'Intelligent Rule Reuse',
  },
  {
    title: 'Data to Application Development',
    slug: 'data-to-application-development',
    tag: 'ENTERPRISE DATA · DATA-TO-APPLICATION',
    desc: 'Build structured business applications directly from existing enterprise data, databases, and Excel spreadsheets across 4 flexible starting points.',
    industry: 'Enterprise Data',
    challenge: 'Business data exists across databases and spreadsheets, but converting it into functional tools requires technical development effort.',
    solution: 'Built-in data connectors and mappers allowing users to select data points and build applications around their real operational processes.',
    metricVal: '4 Paths',
    metricLbl: 'Excel, DB, UI & Req Ingestion',
  },
  {
    title: 'Business Portals Around Existing ERP',
    slug: 'business-portals-around-existing-erp',
    tag: 'ENTERPRISE ERP · SAP & MES EXTENSION',
    desc: 'Build purpose-built Production, Inventory, Supplier, and Quality Portals around existing ERP and MES systems—extending, not replacing, core enterprise investments.',
    industry: 'Manufacturing & Enterprise Systems',
    challenge: 'Core ERP and MES systems lack custom operational workflows, leading to spreadsheet/email workarounds while modifying core systems is costly and risky.',
    solution: 'Application layer with built-in connectors providing a modern interface, workflows, and portals around existing ERP/MES investments.',
    metricVal: 'Extension Layer',
    metricLbl: 'Preserve Core ERP & MES',
  },
  {
    title: 'Deployment Management',
    slug: 'deployment-management',
    tag: 'CLOUD RUNTIME · REVISION CONTROL',
    desc: 'Manage the complete application lifecycle with configurable Development, Staging, and Production environments, built-in Revision Management, and feature pushing.',
    industry: 'Cloud Engineering & DevOps',
    challenge: 'Traditional deployment processes introduce technical dependencies and prevent business teams from controlling application versions and release timing.',
    solution: 'Configurable environment management and revision promotion framework enabling business-controlled application lifecycle management.',
    metricVal: 'Dev → Stage → Prod',
    metricLbl: 'Business-Controlled Lifecycle',
  },
]

export default function AINoCodePage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* 1. TOP HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/ai_no_code_hero.png"
          alt="AI-Powered No-Code Platform Background"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>AI-POWERED NO-CODE PLATFORM</div>
            <h1 className={styles.heroTitle}>
              Build Business Applications in Business Language — Not Code.
            </h1>
            <p className={styles.heroDesc}>
              Build business applications from natural language and enterprise data—with seamless system integration.
            </p>
            <div className={styles.heroAccentGreen}>
              Text-to-Application &amp; Data-to-Application for Enterprise Operations
            </div>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Explore No-Code Platform
              </Link>
              <Link href="/contact" className={styles.btnSecondaryDark}>
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTRO SECTION */}
      <section className={styles.sectionIntro}>
        <h2 className={styles.introTitle}>
          AI-Powered No-Code Platform — From Business Language &amp; Data to Applications
        </h2>
        <p className={styles.introParagraph}>
          IdentifYou&apos;s AI-Powered No-Code Platform is an enterprise application platform that transforms business language, natural language and enterprise data into working applications—without traditional software development. With Text-to-Application and Data-to-Application, organizations can rapidly build business and industrial applications that integrate with ERP, MES, databases, APIs and third-party systems.
        </p>
      </section>

      {/* 3. CONCEPTUAL WORKFLOW JOURNEY */}
      <section className={styles.sectionJourney}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>CONCEPTUAL WORKFLOW ARCHITECTURE</div>
            <h2 className={styles.sectionTitleDark}>From Business Language &amp; Enterprise Data to Live Applications</h2>
            <p className={styles.sectionDescLight}>
              Eliminate traditional software development bottlenecks. Our AI engine parses business intent and enterprise schemas to generate production-ready applications.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div className={styles.journeyBox}>
              <div style={{ color: '#96c73d', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                TEXT-TO-APPLICATION ARCHITECTURE
              </div>
              <FlowChain nodes={textToAppFlow} variant="dark" />
            </div>

            <div className={styles.journeyBox}>
              <div style={{ color: '#96c73d', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                DATA-TO-APPLICATION ARCHITECTURE
              </div>
              <FlowChain nodes={dataToAppFlow} variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM CAPABILITIES GRID */}
      <section className={styles.sectionCapabilities}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>PLATFORM CAPABILITIES</div>
            <h2 className={styles.sectionTitleDark}>Engineered for Enterprise Operational Velocity</h2>
            <p className={styles.sectionDescLight}>
              Empower domain experts and operational leaders to build, automate, and scale applications without traditional engineering overhead.
            </p>
          </div>
          <div className={styles.capabilitiesGrid}>
            {platformCapabilities.map((cap) => (
              <div key={cap.title} className={styles.capCard}>
                <div className={styles.capTopRow}>
                  <span className={styles.capIcon}>{cap.icon}</span>
                  <span className={styles.capTag}>{cap.tag}</span>
                </div>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capDesc}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLATFORM HIGHLIGHTS & CHIPS */}
      <section className={styles.sectionHighlights}>
        <div className={styles.container}>
          <div className={styles.highlightsCardDark}>
            <div className={styles.eyebrowGreen}>PLATFORM HIGHLIGHTS</div>
            <h2 className={styles.highlightsTitle}>Built for Business Autonomy &amp; Enterprise Governance</h2>
            <div className={styles.hlGrid}>
              {highlights.map((h) => (
                <span key={h} className={styles.hlTag}>
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUCCESS STORIES SECTION */}
      <section className={styles.sectionCaseStudy}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>SUCCESS STORIES</div>
            <h2 className={styles.sectionTitleDark}>Proven Enterprise Applications Built with No-Code</h2>
            <p className={styles.sectionDescLight}>
              Explore how IdentifYou&apos;s AI-Powered No-Code Platform transforms complex operational challenges into live software systems.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {successStories.map((cs) => (
              <div key={cs.slug} className={styles.csCardDark}>
                <div className={styles.csGrid}>
                  <div className={styles.csImgBox}>
                    <img
                      src={`/images/case-studies/${cs.slug}.svg`}
                      alt={cs.title}
                      className={styles.csImg}
                    />
                  </div>
                  <div className={styles.csContent}>
                    <div className={styles.csTagGreen}>{cs.tag}</div>
                    <h3 className={styles.csTitle}>{cs.title}</h3>
                    <p className={styles.csSection}>{cs.desc}</p>

                    <div className={styles.csSection}>
                      <span className={styles.csLabel}>Challenge: </span>
                      {cs.challenge}
                    </div>
                    <div className={styles.csSection}>
                      <span className={styles.csLabel}>Solution: </span>
                      {cs.solution}
                    </div>

                    <div className={styles.metricsRow}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricVal}>{cs.metricVal}</span>
                        <span className={styles.metricLbl}>{cs.metricLbl}</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricVal}>100%</span>
                        <span className={styles.metricLbl}>ERP &amp; System Integration</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricVal}>No Code</span>
                        <span className={styles.metricLbl}>Domain Leader Autonomy</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                      <Link href={`/case-studies/${cs.slug}`} className={styles.csBtn}>
                        Explore Success Story →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BLOCK */}
      <section className={styles.sectionCTA}>
        <div className={styles.container}>
          <div className={styles.ctaCardDark}>
            <h2 className={styles.ctaTitle}>Build Your First Intelligent Business Application</h2>
            <p className={styles.ctaDesc}>
              Empower your domain experts to build, automate, and scale enterprise applications in days instead of months.
            </p>
            <div className={styles.ctaBtnRow}>
              <Link href="/contact" className={styles.btnPrimary}>
                Talk to a No-Code Expert
              </Link>
              <Link href="/contact" className={styles.btnSecondaryDark}>
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
