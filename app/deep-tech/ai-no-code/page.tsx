import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI-Powered No-Code Platform — Describe It. Build It. Run It.',
  description: 'Build intelligent business applications by describing what your business needs — in business language.',
}

const journey = [
  'Business User',
  'Describe Business Requirement',
  'AI Understands',
  'Application / Workflow Generated',
  'Configure',
  'Deploy',
  'Run as Business Application / SaaS',
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

export default function AINoCodePage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: FULL-PAGE HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCard}>
            <div>
              <div className={styles.eyebrowGreen}>AI-POWERED NO-CODE PLATFORM</div>
              <h1 className={styles.heroTitle}>Describe It. Build It. Run It.</h1>
              <h2 className={styles.heroSubtitle}>No-Code Enterprise Application &amp; Workflow Transformation</h2>
              <p className={styles.heroDesc}>
                Build intelligent business applications by describing what your business needs in natural business language.
                Generate workflows, data pipelines, and operational applications 10x faster — with zero traditional code overhead.
              </p>
              <div className={styles.btnGroup}>
                <Link href="/contact" className={styles.btnPrimary}>
                  Explore No-Code Platform
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  Schedule a Demo
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualBox}>
              <img
                src="/images/deep-tech-chip.jpg"
                alt="AI-Powered No-Code Platform Interface"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT & JOURNEY */}
      <section className={styles.content}>
        <div className={styles.journeyBox}>
          <div className={styles.journeyLabel}>Conceptual Workflow Journey</div>
          <FlowChain nodes={journey} />
        </div>

        <div className={styles.hlLabel}>Platform Highlights &amp; Capabilities</div>
        <div className={styles.hlGrid}>
          {highlights.map((h) => (
            <span key={h} className={styles.hlTag}>
              {h}
            </span>
          ))}
        </div>

        <p className={styles.disclaimer}>
          * Claims such as &ldquo;zero IT required&rdquo; are used only where verified for a specific implementation.
        </p>

        <CTABlock
          headline="Build Your First Intelligent Business Application"
          buttonLabel="Talk to a No-Code Expert"
          buttonHref="/contact"
        />
      </section>

      <Footer />
    </div>
  )
}
