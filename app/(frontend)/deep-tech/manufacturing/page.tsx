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
          IdentifYou provides end-to-end industrial software engineering. We convert manual assembly lines and isolated machine cells into unified, data-driven manufacturing platforms. We embed intelligent edge gateways directly alongside PLC controllers. This architecture ingests high-frequency telemetry at sub-second intervals.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          Our real-time edge processing layer filters electrical noise and computes running health indexes. It streams structured events directly into enterprise MES and SAP environments. Factory managers gain instant visibility into machine availability and micro-stoppages. Quality deviations are identified before scrap accumulates.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          Our field-tested architecture eliminates data silos between operational technology and enterprise IT. We integrate computer vision inspection cells with robotic machine tending. Production facilities achieve resilient throughput, lower operational overhead, and reliable closed-loop process control. Real-time telemetry ensures instant traceability across every manufactured part.
        </p>

        <div style={{ marginTop: '24px', textAlign: 'left', maxWidth: '780px', margin: '24px auto 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#12181B', marginBottom: '8px' }}>
            Core Operational Capabilities Delivered:
          </h3>
          <ul style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6, paddingLeft: '20px' }}>
            <li><strong>Automated Vision Inspection:</strong> Inline dimensional verification and cosmetic defect classification at full conveyor line speed.</li>
            <li><strong>Intelligent Edge Gateways:</strong> Standardized OPC-UA and MQTT telemetry extraction from legacy and modern PLCs.</li>
            <li><strong>Closed-Loop ERP Interlocks:</strong> Direct synchronization between shop-floor bill-of-materials and enterprise ERP inventory records.</li>
          </ul>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'left', maxWidth: '780px', margin: '24px auto 0', padding: '20px', background: '#F8F9FA', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#12181B', marginBottom: '8px' }}>
            How It Works in Practice:
          </h3>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6, marginBottom: '8px' }}>
            1. <strong>Smart Sensors Watch Every Part:</strong> High-speed cameras check parts as they move down the belt. The system catches errors in less than a second. This stops bad parts from reaching customers.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6, marginBottom: '8px' }}>
            2. <strong>Machines Talk to Each Other:</strong> Old and new machines connect to a central hub. Teams see when tools need care before they break down. This keeps production lines running without surprise stops.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6 }}>
            3. <strong>Teams Make Faster Decisions:</strong> Plant managers see live data on their screens. They know exact output numbers at any time of day. This saves time and cuts waste across the factory floor.
          </p>
        </div>

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
