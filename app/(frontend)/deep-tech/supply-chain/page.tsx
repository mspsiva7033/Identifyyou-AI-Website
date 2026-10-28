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
          Modern supply chains require fast synchronization across suppliers, warehouses, fleets, and retail hubs. IdentifYou engineers cloud data streaming pipelines and edge telemetry layers. Our systems convert raw spatial and ERP signals into actionable replenishment, routing, and risk management decisions.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          We integrate GPS tracking, temperature sensors, and RFID gate scans into a centralized cloud lakehouse. Operations teams receive proactive alerts before delivery delays compromise assembly schedules. Automated routing models calculate optimal consignment routes using historical traffic patterns, weather updates, and dock availability.
        </p>
        <p className={styles.introParagraph} style={{ marginTop: '16px' }}>
          This transparency connects enterprise resource planning with real-world shipping conditions. Supply chain leaders eliminate deadhead miles and protect perishable cargo integrity. Companies maintain minimal working capital while preserving high on-time fulfillment rates.
        </p>

        <div style={{ marginTop: '24px', textAlign: 'left', maxWidth: '780px', margin: '24px auto 0', padding: '20px', background: '#F8F9FA', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#12181B', marginBottom: '8px' }}>
            How We Streamline Supply Chains:
          </h3>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6, marginBottom: '8px' }}>
            1. <strong>Track Shipments in Real Time:</strong> GPS and temperature sensors show exactly where trucks are. Dispatchers know arrival times before trucks pull into the yard.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6, marginBottom: '8px' }}>
            2. <strong>Prevent Stockouts Before They Happen:</strong> Smart forecast models check store inventory and sales daily. Warehouses reorder goods automatically before shelves run empty.
          </p>
          <p style={{ color: '#5B6862', fontSize: '15px', lineHeight: 1.6 }}>
            3. <strong>Cut Unnecessary Fuel and Miles:</strong> Route planning tools find the fastest paths around traffic and bad weather. Fleets use less fuel and deliver on schedule.
          </p>
        </div>
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
                  <Link href={`/success-stories/${cs.slug}`} className={styles.csBtn}>
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
