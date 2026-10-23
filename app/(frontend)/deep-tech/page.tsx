import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDeepTechCapabilities } from '@/lib/payload'
import styles from './deep-tech.module.css'

export const metadata: Metadata = {
  title: 'Deep Tech Pillars & Capabilities',
  description:
    'Discover IdentifYou deep tech capabilities across Vision AI, industrial automation, AI no-code, and enterprise data platforms.',
  alternates: {
    canonical: '/deep-tech',
  },
}

export default async function DeepTechPage() {
  const capabilities = await getDeepTechCapabilities()

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Deep Tech. <span className={styles.heroAccent}>Built Around Business.</span>
        </h1>
        <p className={styles.heroDesc}>
          IdentifYou engineers deep technology architectures tailored directly to commercial priorities. We integrate computer vision inspection cells with industrial IoT sensor gateways. We build modern data lakehouses and custom enterprise applications. Our solutions turn operational complexity into measurable competitive advantage.
        </p>
      </section>

      <section className={styles.capabilitiesSection}>
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#12181B', margin: '0 0 8px' }}>
            Core Deep Tech Architecture &amp; Capabilities
          </h2>
          <p style={{ color: '#5B6862', fontSize: '15.5px', margin: '0 0 16px', maxWidth: '780px' }}>
            Each pillar addresses a specific operational bottleneck. We combine physical edge telemetry with automated decision intelligence and enterprise system integrations.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', margin: '0 0 16px', maxWidth: '780px' }}>
            Our engineering methodology bridges shop-floor machinery with corporate IT networks. We deploy hardened edge hardware running local neural networks alongside cloud analytics. Plants gain real-time visibility and automated quality assurance without latency or network disruptions.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', margin: '0 0 24px', maxWidth: '780px' }}>
            Across automotive assembly lines, discrete manufacturing facilities, and complex logistics networks, IdentifYou delivers production-tested systems. From micro-defect surface vision classification to Snowflake Cortex predictive pricing models, each implementation guarantees enterprise-grade security, deterministic latency, and auditable business ROI.
          </p>
        </div>

        {capabilities.map((c) => (
          <div key={c.title} className={styles.capCard}>
            <div className={styles.capLeft}>
              <div className={styles.capN}>{c.n}</div>
              <div className={styles.capTitle}>{c.title}</div>
              <Link href={c.href} className={styles.capLink}>{c.linkLabel} →</Link>
            </div>
            <div className={styles.capRight}>
              <div className={styles.capRow}><span className={styles.capLabel}>Business Challenge — </span><span className={styles.capVal}>{c.challenge}</span></div>
              <div className={styles.capRow}><span className={styles.capLabel}>Solution — </span><span className={styles.capVal}>{c.solution}</span></div>
              <div className={styles.capRow}><span className={styles.capLabel}>Deep Tech — </span><span className={styles.capVal}>{c.deepTech}</span></div>
              <div className={styles.capRow}><span className={styles.capLabel}>Technology — </span><span className={styles.capTech}>{c.tech}</span></div>
              <div className={styles.capRowBorder}><span className={styles.capLabel}>Outcome — </span><span className={styles.capVal}>{c.outcome}</span></div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  )
}
