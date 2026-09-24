import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../deep-tech.module.css'

export const metadata: Metadata = {
  title: 'Deep Tech Capabilities — IdentifYou Technologies',
  description: 'Explore IdentifYou Deep Tech capabilities spanning Vision AI, Industry Automation, Data Engineering, and Digital Engineering.',
}

export default function DefaultDeepTechPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <span className={styles.greenPillBadge}>DEEP TECH PORTFOLIO</span>
          <h1 className={styles.heroTitle}>IdentifYou Deep Tech Capabilities</h1>
          <p className={styles.heroDesc}>
            Deploying AI-powered vision systems, IIoT edge gateways, modern data lakehouses, and custom no-code enterprise platforms.
          </p>
          <div style={{ marginTop: '24px' }}>
            <Link href="/deep-tech" className={styles.btnPrimary}>
              View All Deep Tech Pillars →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
