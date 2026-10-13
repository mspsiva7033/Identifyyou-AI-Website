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
          IdentifYou engineers deep technology architectures tailored directly to commercial priorities. We integrate computer vision inspection cells, industrial IoT sensor gateways, modern data lakehouses, and custom no-code enterprise software to turn operational complexity into measurable advantage.
        </p>
      </section>

      <section className={styles.capabilitiesSection}>
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#12181B', margin: '0 0 8px' }}>
            Core Deep Tech Architecture &amp; Capabilities
          </h2>
          <p style={{ color: '#5B6862', fontSize: '15.5px', margin: '0 0 24px', maxWidth: '780px' }}>
            Each pillar addresses a specific operational bottleneck, combining physical edge telemetry, automated decision intelligence, and enterprise integrations.
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
