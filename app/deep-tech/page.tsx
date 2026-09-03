import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDeepTechCapabilities } from '@/lib/payload'
import styles from './deep-tech.module.css'

export const metadata: Metadata = {
  title: 'Deep Tech — Six Pillars Built Around Business',
  description: 'Six Deep Tech pillars — Vision AI, AI & Intelligent Business, AI-Powered No-Code, Industry Automation, Data Engineering and Digital Engineering — each engineered around a real business problem.',
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
          Six Deep Tech pillars — each engineered around a real business problem, never presented as technology in isolation.
        </p>
      </section>
      <section className={styles.capabilitiesSection}>
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
