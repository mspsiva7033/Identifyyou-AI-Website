import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Digital Engineering — Engineer Digital Products That Solve Real Business Problems',
  description:
    'Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling. Built around the workflow, not the other way around.',
}

const capabilities = [
  'Enterprise Web Applications',
  'SaaS Platform Engineering',
  'Mobile Applications',
  'API Design & Integration',
  'Workflow Automation',
  'Cloud Engineering (Azure / AWS)',
  'Application Modernization',
  'Microservices Architecture',
]

const techStack = ['Python', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Azure', 'AWS', 'PostgreSQL', 'REST / GraphQL APIs']

export default function DigitalEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: FULL-PAGE HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCard}>
            <div>
              <div className={styles.eyebrowGreen}>DIGITAL ENGINEERING</div>
              <h1 className={styles.heroTitle}>
                Engineer Digital Products That Solve Real Business Problems
              </h1>
              <h2 className={styles.heroSubtitle}>Cloud-Native Enterprise Web, Mobile &amp; SaaS Applications</h2>
              <p className={styles.heroDesc}>
                Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling — built around
                your actual business workflow, not the other way around.
              </p>
              <div className={styles.btnGroup}>
                <Link href="/contact" className={styles.btnPrimary}>
                  Explore Digital Solutions
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  Talk to a Digital Expert
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualBox}>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                alt="Digital Engineering Enterprise SaaS Application"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT & CAPABILITIES */}
      <section className={styles.content}>
        <div className={styles.capGrid}>
          {capabilities.map((c) => (
            <span key={c} className={styles.capTag}>
              {c}
            </span>
          ))}
        </div>

        <div className={styles.techBox}>
          <div className={styles.techLabel}>Modern Technology Stack</div>
          <div className={styles.techGrid}>
            {techStack.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.checkList}>
          <div className={styles.checkItem}>✓ Enterprise applications and SaaS platforms</div>
          <div className={styles.checkItem}>✓ Workflow automation and API integration</div>
          <div className={styles.checkItem}>✓ Cloud engineering on Azure and AWS</div>
        </div>

        <CTABlock
          headline="Build Your Digital Product"
          description="Tell us the problem — we'll engineer the right digital solution around it."
          buttonLabel="Talk to a Digital Engineering Expert"
          buttonHref="/contact"
        />
      </section>

      <Footer />
    </div>
  )
}
