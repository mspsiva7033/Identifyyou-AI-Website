import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI-Powered No-Code Platform — Describe It. Build It. Run It.',
  description:
    'Build intelligent business applications by describing what your business needs in natural business language. Generate workflows, data pipelines, and operational applications 10x faster — with zero traditional code overhead.',
}

const journey = [
  'Business User',
  'Describe Requirement',
  'AI Engine Understands',
  'Application / Workflow Generated',
  'Configure & Validate',
  'Deploy to Cloud',
  'Run as Business App / SaaS',
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
    title: 'Natural Language App Generation',
    desc: 'Transform plain-English business rules and process descriptions into full-stack relational schemas, UI forms, and REST APIs automatically.',
    tag: 'NLP ENGINE',
  },
  {
    icon: '⚡',
    title: 'Visual Workflow & Automation',
    desc: 'Drag-and-drop workflow builders interlocked with AI decision nodes, approval routing, and automated document generation.',
    tag: 'ZERO FRICTION',
  },
  {
    icon: '🔌',
    title: 'Enterprise Data Connectors',
    desc: 'Instantly connect legacy ERPs (SAP, Oracle), databases, and cloud APIs into unified business applications without custom code.',
    tag: 'UNIFIED DATA',
  },
  {
    icon: '🛡️',
    title: 'Role-Based Access & Security',
    desc: 'Enterprise-grade RBAC, single sign-on (SSO), row-level data governance, and audit trails baked into every generated app.',
    tag: 'ENTERPRISE GOVERNANCE',
  },
  {
    icon: '🔄',
    title: 'Continuous AI Refinement',
    desc: 'Modify live applications by describing updates in natural language—allowing domain experts to evolve business tools instantly.',
    tag: 'AGILE EVOLUTION',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native & SaaS Ready',
    desc: 'Deploy generated applications into secure, scalable containerized environments or expose them directly as SaaS modules.',
    tag: 'MULTI-TENANT SCALE',
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
              Describe It. Build It. Run It.
            </h1>
            <p className={styles.heroDesc}>
              Build intelligent business applications by describing what your business needs in natural business language.
              Generate workflows, data pipelines, and operational applications 10x faster — with zero traditional code overhead.
            </p>
            <div className={styles.heroAccentGreen}>No-Code Enterprise Application &amp; Workflow Transformation</div>
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
        <h2 className={styles.introTitle}>AI-Powered No-Code Platform</h2>
        <p className={styles.introParagraph}>
          Empower domain experts and operational leaders to build, automate, and scale enterprise applications in days instead of months.
          Integrate data pipelines, approval workflows, and native AI agents with zero traditional development friction. <span className={styles.introBold}>Build faster. Automate smarter. Scale seamlessly.</span>
        </p>
      </section>

      {/* 2. CONCEPTUAL WORKFLOW JOURNEY */}
      <section className={styles.sectionJourney}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>CONCEPTUAL WORKFLOW</div>
            <h2 className={styles.sectionTitleDark}>From Natural Language Description to Live Application</h2>
            <p className={styles.sectionDescLight}>
              Eliminate the traditional software development bottleneck. Our AI engine parses business intent and converts it into production-ready software components.
            </p>
          </div>
          <div className={styles.journeyBox}>
            <FlowChain nodes={journey} variant="dark" />
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CAPABILITIES GRID */}
      <section className={styles.sectionCapabilities}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>PLATFORM CAPABILITIES</div>
            <h2 className={styles.sectionTitleDark}>Engineered for Enterprise Operational Velocity</h2>
            <p className={styles.sectionDescLight}>
              Empower non-technical domain experts to build robust, secure, and integrated applications without burdening engineering resources.
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

      {/* 4. PLATFORM HIGHLIGHTS & CHIPS */}
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
            <p className={styles.disclaimer}>
              * Claims such as &ldquo;zero IT required&rdquo; are used only where verified for a specific implementation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED SUCCESS STORY */}
      <section className={styles.sectionCaseStudy}>
        <div className={styles.container}>
          <div className={styles.csCardDark}>
            <div className={styles.csGrid}>
              <div className={styles.csImgBox}>
                <img
                  src="/images/case-studies/tailored-enterprise-solutions.png"
                  alt="Tailored Enterprise Solutions & Rapid No-Code Deployment"
                  className={styles.csImg}
                />
              </div>
              <div className={styles.csContent}>
                <div className={styles.csTagGreen}>FEATURED SUCCESS STORY</div>
                <h3 className={styles.csTitle}>Tailored Enterprise Solutions &amp; Rapid No-Code Deployment</h3>
                <div className={styles.csSection}>
                  <span className={styles.csLabel}>Industry:</span> Enterprise Operations &amp; Manufacturing
                </div>
                <div className={styles.csSection}>
                  <span className={styles.csLabel}>Challenge:</span> Traditional IT development backlogs delayed critical operational tools by 6-9 months, impacting field productivity.
                </div>
                <div className={styles.csSection}>
                  <span className={styles.csLabel}>Solution:</span> Deployed an AI-powered no-code workflow platform, allowing operational teams to describe, generate, and launch 12 custom business applications in under 4 weeks.
                </div>
                <div className={styles.metricsRow}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>10x</span>
                    <span className={styles.metricLbl}>Faster Time-to-Market</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>-80%</span>
                    <span className={styles.metricLbl}>Development Cost</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>100%</span>
                    <span className={styles.metricLbl}>Business User Adoption</span>
                  </div>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/contact" className={styles.csBtn}>
                    Request Success Story Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BLOCK */}
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
