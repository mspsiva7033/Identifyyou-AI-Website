import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from '../industry-automation/page.module.css'

export const metadata: Metadata = {
  title: 'Manufacturing Deep Tech Solutions',
  description:
    'Engineering the intelligent factory with Vision AI, IIoT edge gateways, MES interlocks, and ERP integrations for connected shop floor execution.',
  alternates: {
    canonical: '/deep-tech/manufacturing',
  },
}

const mfgNodes = ['Raw Material', 'Supplier ERP', 'Warehouse', 'IIoT Edge Gateway', 'Shop Floor MES', 'Vision AI Quality', 'Finished Goods']

export default function ManufacturingDeepTechPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/industry_automation_hero.png"
          alt="Manufacturing Deep Tech"
          width="1920"
          height="1080"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <span className={styles.eyebrowGreen}>MANUFACTURING DEEP TECH</span>
            <h1 className={styles.heroBannerTitle}>
              Manufacturing Deep Tech &amp; Production Control
            </h1>
            <p className={styles.heroBannerDesc}>
              Connecting shop-floor sensors, robotics, vision inspection cells, and enterprise SAP and MES systems.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionIntro}>
        <div className={styles.eyebrowGreen}>INTELLIGENT MANUFACTURING</div>
        <h2 className={styles.introTitle}>From Machine Islands to Autonomous Plant Execution</h2>
        <p className={styles.introParagraph}>
          IdentifYou provides end-to-end industrial software engineering, converting manual assembly lines and isolated machine cells into unified, data-driven manufacturing platforms. By embedding intelligent edge gateways directly alongside PLC controllers, we ingest high-frequency telemetry at sub-second intervals.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          This real-time edge processing layer filters noise, computes running health indexes, and streams structured events into enterprise MES and SAP environments. Factory managers gain instant visibility into machine availability, micro-stoppages, and quality deviations before scrap accumulates.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          Our field-tested architecture eliminates data silos between operational technology (OT) and enterprise IT. With integrated computer vision inspection and robotic machine tending, production facilities achieve resilient throughput, lower operational costs, and closed-loop process control.
        </p>
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link href="/manufacturing" className={styles.btnPrimary}>
            Explore Full Manufacturing Ecosystem →
          </Link>
        </div>
      </section>

      <section className={styles.sectionJourney}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>PLANT ARCHITECTURE</div>
            <h2 className={styles.sectionTitleDark}>Edge-to-Cloud Manufacturing Pipeline</h2>
          </div>
          <div className={styles.journeyBox}>
            <FlowChain nodes={mfgNodes} variant="dark" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
