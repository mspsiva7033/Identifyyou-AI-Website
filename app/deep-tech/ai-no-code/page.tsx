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

const journey = [
  'Business User',
  'Describe Business Requirement',
  'AI Engine Parses Intent',
  'Schema & Workflow Generated',
  'Validate & Connect Data',
  'Deploy to Enterprise Cloud',
  'Run as Business Application',
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
    desc: 'Automatically inspect enterprise databases and warehouses to build interactive CRUD portals, management tools, and analytics UI.',
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
    title: 'Cloud-Native & SaaS Deployment',
    desc: 'Containerize and deploy applications into secure cloud environments or expose them instantly as multi-tenant SaaS modules.',
    tag: 'MULTI-TENANT SCALE',
  },
]

const successStories = [
  {
    title: 'Business Driven Software System',
    slug: 'business-driven-software-system',
    tag: 'ENTERPRISE OPERATIONS · AI NO-CODE',
    desc: 'Transform business domain intent, process models, and operational logic into production-grade software applications without traditional development friction.',
    industry: 'Enterprise Operations',
    challenge: 'Disconnect between domain leaders and technical IT sprints delayed application delivery.',
    solution: 'AI platform converting business language definitions directly into operational schemas and web applications.',
    metricVal: '80%',
    metricLbl: 'Faster Time-to-Market',
  },
  {
    title: 'NLP based Text-to-Business Application',
    slug: 'nlp-text-to-business-application',
    tag: 'OPERATIONAL AUTOMATION · NLP ENGINE',
    desc: 'Convert natural language descriptions and conversational prompts directly into forms, database models, and automated approval workflows.',
    industry: 'Process Automation',
    challenge: 'Non-technical managers lacked coding tools to build custom operational workflow tools.',
    solution: 'Natural language processing engine parsing text instructions into dynamic web forms and approval chains.',
    metricVal: '< 10 Min',
    metricLbl: 'Prompt to Live App',
  },
  {
    title: 'Data to Application Development',
    slug: 'data-to-application-development',
    tag: 'ENTERPRISE DATA · DATA INTEGRATION',
    desc: 'Instantly turn raw databases, data warehouses, and API streams into functional, secure, and interactive enterprise web portals.',
    industry: 'Enterprise Data',
    challenge: 'Operational data trapped in data lakes without intuitive operational UI write-back.',
    solution: 'Automated schema discovery compiler building responsive grid views and write-back portals over databases.',
    metricVal: 'Instant',
    metricLbl: 'Portal Generation',
  },
  {
    title: 'Business Portals Around Existing ERP',
    slug: 'business-portals-around-existing-erp',
    tag: 'ERP EXTENSION · SAP INTEGRATION',
    desc: 'Extend legacy ERP systems like SAP, Oracle, and Dynamics with modern, agile business portals without modifying core ERP logic.',
    industry: 'Manufacturing & ERP',
    challenge: 'Custom ERP modifications were expensive, slow, and risked core operational stability.',
    solution: 'Non-invasive API connectors binding agile role-specific portals to SAP RFCs and enterprise endpoints.',
    metricVal: '6x',
    metricLbl: 'Faster Deployment',
  },
  {
    title: 'Deployment Management',
    slug: 'deployment-management',
    tag: 'CLOUD RUNTIME · DEVOPS ORCHESTRATION',
    desc: 'Automate cloud containerization, security vulnerability scanning, multi-tenant isolation, and continuous runtime governance.',
    industry: 'Cloud Engineering',
    challenge: 'Deploying generated apps required manual container packaging and security review bottlenecks.',
    solution: 'Automated cloud deployment engine managing Docker container packaging, SAST scans, and SSO bindings.',
    metricVal: '100%',
    metricLbl: 'Automated Pipeline',
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
            <div className={styles.eyebrowGreen}>CONCEPTUAL WORKFLOW</div>
            <h2 className={styles.sectionTitleDark}>From Natural Language &amp; Data to Live Application</h2>
            <p className={styles.sectionDescLight}>
              Eliminate traditional software development bottlenecks. Our AI engine parses business intent and enterprise schemas to generate production-ready applications.
            </p>
          </div>
          <div className={styles.journeyBox}>
            <FlowChain nodes={journey} variant="dark" />
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
                      src={`/images/case-studies/${cs.slug}.png`}
                      alt={cs.title}
                      className={styles.csImg}
                      onError={(e) => {
                        // Fallback image if specific PNG does not exist
                        e.currentTarget.src = '/images/ai_no_code_hero.png'
                      }}
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
