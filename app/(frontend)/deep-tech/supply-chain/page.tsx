import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from '../ai-intelligent-business/page.module.css'

export const metadata: Metadata = {
  title: 'Supply Chain & Logistics Intelligence',
  description:
    'Real-time fleet tracking, inventory variance reduction, and automated procurement intelligence powered by Snowflake AI Data Cloud and Edge IIoT.',
  alternates: {
    canonical: '/deep-tech/supply-chain',
  },
}

const supplyChainFlow = [
  'Supplier Telemetry',
  'Procurement AI',
  'Warehouse & Inventory',
  'Geospatial Telematics',
  'Route Optimization',
  'Automated Replenishment',
]

const successStories = [
  {
    title: 'Optimizing Logistics, Shipment & Fleet Operations with Snowflake',
    slug: 'optimizing-shipment-fleet-snowflake',
    tag: 'SUPPLY CHAIN · FLEET INTELLIGENCE',
    desc: 'Cloud data streaming architecture aggregating telematics, GPS, and consignment tracking into live Snowflake dashboards to eliminate transit delays and reduce fuel consumption.',
  },
  {
    title: 'Revolutionizing Enterprise Inventory Optimization with Snowflake',
    slug: 'revolutionizing-inventory-optimization',
    tag: 'SUPPLY CHAIN · INVENTORY INTELLIGENCE',
    desc: 'High-throughput stream ingestion into Snowflake with automated ML replenishment models, reducing stockouts by 40%.',
  },
  {
    title: 'Transforming Routine Procurement to Intelligent Automation',
    slug: 'procurement-operations-intelligence',
    tag: 'PROCUREMENT OPERATIONS · AI DECISION LAYER',
    desc: 'IdentifYou AI operational layer transforming raw ERP procurement data into guided purchasing recommendations.',
  },
]

export default function SupplyChainDeepTechPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* TOP HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/retail_inventory_dashboard.png"
          alt="Supply Chain Background"
          width="1920"
          height="1080"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <span className={styles.eyebrowGreen}>SUPPLY CHAIN &amp; LOGISTICS</span>
            <h1 className={styles.heroBannerTitle}>
              Intelligent Supply Chain Operations &amp; Logistics
            </h1>
            <p className={styles.heroBannerDesc}>
              Unify telematics, inventory movements, and procurement signals into continuous, AI-driven operational decision making.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.sectionIntro}>
        <div className={styles.eyebrowGreen}>REAL-TIME VISIBILITY</div>
        <h2 className={styles.introTitle}>Unified Fleet &amp; Logistics Control</h2>
        <p className={styles.introParagraph}>
          Modern supply chains require sub-second synchronization across suppliers, warehouses, fleets, and retail networks. IdentifYou engineers cloud data streaming pipelines and edge telemetry layers that convert raw spatial and ERP signals into actionable replenishment, routing, and risk management decisions.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          By integrating GPS tracking, temperature logging, and RFID gate scans into a centralized cloud lakehouse, operations teams receive proactive warnings before delivery delays compromise assembly schedules. Automated dynamic routing models calculate optimal consignment itineraries based on historical traffic congestion, weather disruptions, and dock availability.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          This unified transparency bridges enterprise resource planning with real-world shipping conditions. Supply chain leaders eliminate deadhead miles, safeguard perishable cargo integrity, and maintain minimal working capital while preserving 99.8% customer order fulfillment rates.
        </p>
      </section>

      {/* FLOW CHAIN */}
      <section className={styles.sectionJourney}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>SUPPLY CHAIN FLOW</div>
            <h2 className={styles.sectionTitleDark}>End-to-End Supply Chain Telemetry</h2>
          </div>
          <div className={styles.journeyBox}>
            <FlowChain nodes={supplyChainFlow} variant="dark" />
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className={styles.sectionCaseStudy}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <div className={styles.eyebrowGreen}>SUCCESS STORIES</div>
            <h2 className={styles.sectionTitleDark}>Supply Chain Success Stories</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {successStories.map((cs) => (
              <div key={cs.slug} className={styles.csCardDark}>
                <div className={styles.csTagGreen}>{cs.tag}</div>
                <h3 className={styles.csTitle}>{cs.title}</h3>
                <p className={styles.csSection}>{cs.desc}</p>
                <div style={{ marginTop: '16px' }}>
                  <Link href={`/case-studies/${cs.slug}`} className={styles.csBtn}>
                    Explore Success Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
