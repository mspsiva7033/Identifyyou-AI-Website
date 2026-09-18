import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Digital Engineering — Engineer Digital Products That Solve Real Business Problems',
  description:
    'Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling. Built around the workflow, not the other way around.',
}

const engineeringFlow = [
  'Workflow Discovery',
  'Architecture & Schema',
  'Modular Microservices',
  'Cloud Infrastructure',
  'CI/CD & QA',
  'Production Scale',
]

const capabilities = [
  {
    title: 'SaaS Platform Engineering',
    tag: 'Multi-Tenant Cloud',
    desc: 'Scalable multi-tenant SaaS products designed for high availability, sub-100ms API response times, secure subscription management, and seamless end-user experiences.',
    features: ['Multi-tenant Isolation', 'Role-Based Access Control (RBAC)', 'Subscription & Billing Engines', 'High-Throughput API Gateways'],
    icon: '⚡',
  },
  {
    title: 'Enterprise Web Applications',
    tag: 'Modern Full-Stack',
    desc: 'High-performance web applications built with Next.js, React, Node.js, and TypeScript, engineered to automate complex enterprise workflows and operational data entry.',
    features: ['Responsive UI/UX System', 'Server-Side Rendering (SSR)', 'Complex Data Tables & Dashboards', 'Real-Time WebSockets'],
    icon: '💻',
  },
  {
    title: 'Mobile Application Engineering',
    tag: 'iOS & Android',
    desc: 'Cross-platform native mobile solutions with offline-first synchronization, secure local caching, and seamless integration with cloud backends.',
    features: ['Offline-First Data Sync', 'Biometric Security & Encrypted Caching', 'Push Notifications & Telemetry', 'Field-Force Operational Tools'],
    icon: '📱',
  },
  {
    title: 'Microservices & API Architecture',
    tag: 'Cloud-Native',
    desc: 'Decoupled, event-driven microservice architectures built on REST, GraphQL, and gRPC to bridge legacy ERP systems with modern cloud infrastructure.',
    features: ['RESTful & GraphQL API Design', 'Event-Driven Messaging (Kafka/RabbitMQ)', 'Containerization & Docker Orchestration', 'API Gateway & Security Throttling'],
    icon: '🔌',
  },
  {
    title: 'Workflow & Process Automation',
    tag: 'Zero Friction',
    desc: 'Replacing manual spreadsheet processes with bespoke web applications that interlock data validation, automated approval gates, and instant ERP updates.',
    features: ['Automated Approval Workflows', 'PDF & Document Generation', 'Real-Time Audit Logging', 'Third-Party System Connectors'],
    icon: '⚙️',
  },
  {
    title: 'Cloud Modernization & DevOps',
    tag: 'AWS / Azure',
    desc: 'Migrating legacy monoliths into cloud-native architectures with automated CI/CD pipelines, zero-downtime deployments, and infrastructure as code.',
    features: ['Infrastructure as Code (Terraform)', 'Kubernetes & Container Orchestration', 'Automated Testing & Deployment', 'SOC2 / HIPAA Compliant Security'],
    icon: '☁️',
  },
]

const techCategories = [
  {
    name: 'Frontend & UI',
    items: ['React.js', 'Next.js', 'TypeScript', 'CSS Modules', 'WebSockets', 'HTML5/Canvas'],
  },
  {
    name: 'Backend & Microservices',
    items: ['Node.js', 'Python', 'Express / NestJS', 'REST & GraphQL APIs', 'gRPC', 'Microservices'],
  },
  {
    name: 'Cloud & DevOps',
    items: ['Microsoft Azure', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines'],
  },
  {
    name: 'Database & Data Storage',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'Snowflake', 'Prisma ORM', 'Vector DBs'],
  },
]

const metrics = [
  { val: '99.99%', label: 'Uptime SLA Availability' },
  { val: '<100ms', label: 'Average API Response Time' },
  { val: '60%', label: 'Faster Release Cycles' },
  { val: '100%', label: 'Cloud-Native Architecture' },
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
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>ENTERPRISE SAAS &amp; DIGITAL PRODUCTS</div>
            <h1 className={styles.heroTitle}>
              Engineer Digital Products That Solve Real Business Problems
            </h1>
            <p className={styles.heroDesc}>
              Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling — built around
              your actual business workflow, not the other way around.
            </p>
            <div className={styles.heroAccentGreen}>Cloud-Native Enterprise Web, Mobile &amp; SaaS Platforms</div>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Explore Digital Solutions
              </Link>
              <Link href="#capabilities" className={styles.btnSecondaryDark}>
                View Core Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MAIN INTRO SECTION */}
      <section className={styles.sectionIntro}>
        <h2 className={styles.introTitle}>Digital Engineering for Modern Enterprises</h2>
        <p className={styles.introParagraph}>
          We replace manual processes and rigid legacy systems with bespoke web applications, microservices, and mobile platforms.
          Interlock data validation, automated approval gates, and instant enterprise system updates. <span className={styles.introBold}>High performance. Zero friction. Enterprise scale.</span>
        </p>
      </section>

      {/* SECTION 2: ENGINEERING METHODOLOGY & FLOW */}
      <section className={styles.sectionFlow}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>OUR METHODOLOGY</div>
          <h2 className={styles.sectionTitle}>Engineered for Scale, Security, and Agility</h2>
          <p className={styles.sectionDesc}>
            From early architectural blueprinting to continuous production optimization, we follow a rigorous engineering methodology that ensures code quality, zero-downtime releases, and robust performance under peak operational load.
          </p>
          <div className={styles.flowWrapper}>
            <FlowChain nodes={engineeringFlow} />
          </div>
        </div>
      </section>

      {/* SECTION 3: CAPABILITIES GRID */}
      <section id="capabilities" className={styles.sectionCapabilities}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>CORE CAPABILITIES</div>
          <h2 className={styles.sectionTitle}>Full-Lifecycle Digital Engineering</h2>
          <p className={styles.sectionDesc}>
            End-to-end product development tailored to solve complex operational challenges, replace legacy monoliths, and drive growth.
          </p>

          <div className={styles.capGridContainer}>
            {capabilities.map((cap) => (
              <div key={cap.title} className={styles.capCard}>
                <div className={styles.capHeader}>
                  <span className={styles.capIcon}>{cap.icon}</span>
                  <span className={styles.capBadge}>{cap.tag}</span>
                </div>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capDesc}>{cap.desc}</p>
                <ul className={styles.capFeatureList}>
                  {cap.features.map((f) => (
                    <li key={f} className={styles.capFeatureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TECH STACK SHOWCASE */}
      <section className={styles.sectionTechStack}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>MODERN TECH STACK</div>
          <h2 className={styles.sectionTitle}>Built with Industry-Leading Technologies</h2>
          <p className={styles.sectionDesc}>
            We select modern, resilient, and enterprise-proven tech stacks to power your web, cloud, and mobile digital platforms.
          </p>

          <div className={styles.techCategoriesGrid}>
            {techCategories.map((cat) => (
              <div key={cat.name} className={styles.techCatCard}>
                <h3 className={styles.techCatName}>{cat.name}</h3>
                <div className={styles.techPillsGrid}>
                  {cat.items.map((item) => (
                    <span key={item} className={styles.techPill}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SUCCESS STORIES IN ACTION */}
      <section className={styles.sectionCaseStudies}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>REAL WORLD IMPACT</div>
          <h2 className={styles.sectionTitle}>Digital Engineering in Action</h2>
          <p className={styles.sectionDesc}>
            Explore how our digital engineering capabilities deliver high-performance enterprise applications and automated operational solutions.
          </p>

          <div className={styles.csThreeGrid}>
            <CaseStudyCard
              slug="tailored-enterprise-solutions"
              title="Tailored Enterprise Digital Solutions & Modular Platform Engineering"
            />
            <CaseStudyCard
              slug="precision-abm-snowflake-cortex"
              title="Precision ABM & Demand Intelligence with Snowflake Cortex AI"
            />
            <CaseStudyCard
              slug="procurement-operations-intelligence"
              title="Transforming Routine Procurement to Intelligent Automation"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA BLOCK */}
      <section className={styles.sectionCta}>
        <div className={styles.container}>
          <CTABlock
            headline="Build Your Digital Product"
            description="Tell us your requirements — we'll engineer the right digital solution tailored around your business workflow."
            buttonLabel="Talk to a Digital Engineering Expert"
            buttonHref="/contact"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
