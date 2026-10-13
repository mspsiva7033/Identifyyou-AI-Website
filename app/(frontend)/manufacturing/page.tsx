import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { getManufacturingSolutions } from '@/lib/payload'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Intelligent Factory & Manufacturing AI',
  description:
    'Connect machines, materials, people, and processes with Vision AI, IIoT edge computing, and automated shop floor execution.',
  alternates: {
    canonical: '/manufacturing',
  },
}

const ecosystemFlow = ['Supplier', 'Procurement', 'Raw Material', 'Warehouse', 'Production', 'Quality', 'WIP', 'Inventory', 'Finished Goods', 'Logistics', 'Customer']
const ecosystemOverlay = ['AI', 'Vision AI', 'IIoT', 'Edge', 'Robotics', 'RFID', 'MES', 'SAP', 'Data', 'Analytics']

const seeActCards = [
  { label: 'SEE', title: 'Vision AI', desc: 'Automatically inspect components and measure dimensions.', tech: 'Basler Camera + Computer Vision + CNN + AI' },
  { label: 'CONNECT', title: 'IIoT & Edge', desc: 'Connect machines and capture real-time operational data.', tech: 'IIoT + OPC-UA + MQTT + Edge Computing' },
  { label: 'UNDERSTAND', title: 'AI & Analytics', desc: 'Convert operational data into intelligent insights.', tech: 'AI + PySpark + Snowflake Cortex AI + Power BI' },
  { label: 'ACT', title: 'Automation & Robotics', desc: 'Automate decisions and physical processes.', tech: 'Edge + Robotics + Industrial Automation' },
  { label: 'INTEGRATE', title: 'SAP + MES + Data', desc: 'Connect shop floor with enterprise systems.', tech: 'SAP + MES + APIs + Data Engineering' },
  { label: 'TRACE', title: 'RFID & Digital Traceability', desc: 'Track material, WIP, pallets and finished goods.', tech: 'RFID + Edge + Digital Engineering' },
]

const supplyChainFlow = ['Supplier', 'Procurement', 'Material', 'Warehouse', 'Manufacturing', 'Quality', 'Inventory', 'Logistics', 'Customer']

const mfgSolutionsImages: Record<string, { img: string; href: string }> = {
  'Smart Factory': { img: '/images/case-studies/connected-intelligent-plant.png', href: '/case-studies/connected-intelligent-plant' },
  'AI-Powered Procurement': { img: '/images/case-studies/procurement-operations-intelligence.png', href: '/case-studies/procurement-operations-intelligence' },
  'Inventory Intelligence': { img: '/images/retail_inventory_dashboard.png', href: '/case-studies/revolutionizing-inventory-optimization' },
  'Vision Inspection': { img: '/images/uv_light_defect_detection.png', href: '/deep-tech/vision-ai' },
  'Connected Factory': { img: '/images/end_to_end_inspection_cell.png', href: '/case-studies/fluke-t40' },
  'Material Traceability': { img: '/images/case-studies/towards-zero-inventory-variance-automation.png', href: '/case-studies/towards-zero-inventory-variance-automation' },
  'Production Intelligence': { img: '/images/precision_abm_dashboard.png', href: '/deep-tech/ai-intelligent-business' },
  'Manufacturing Data Platform': { img: '/images/snowflake_cortex_architecture.png', href: '/deep-tech/data-engineering' },
}

export default async function ManufacturingPage() {
  const manufacturingSolutions = await getManufacturingSolutions()

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Engineering the Intelligent Factory</h1>
        <p className={styles.heroDesc}>
          From raw material to finished product, we connect machines, materials, people, processes and enterprise systems to create intelligent, connected manufacturing operations.
        </p>
      </section>

      <section className={styles.content}>
        {/* Factory Hero Image */}
        <div className={styles.factoryImgWrapper}>
          <img
            src="/images/industry_automation_hero.png"
            alt="Intelligent Factory Banner"
            width="1200"
            height="600"
            className={styles.factoryHeroImg}
          />
        </div>

        {/* Ecosystem */}
        <div className={styles.ecosystemBox}>
          <div className={styles.ecosystemTitle}>Connected Manufacturing Ecosystem</div>
          <FlowChain nodes={ecosystemFlow} />
          <div className={styles.overlayTags}>
            {ecosystemOverlay.map((o) => <span key={o} className={styles.overlayTag}>{o}</span>)}
          </div>
        </div>

        {/* See/Act Cards */}
        <div className={styles.seeActHeader}>
          <h2 className={styles.h2}>What If Your Factory Could See, Understand and Act in Real Time?</h2>
        </div>
        <div className={styles.seeActGrid}>
          {seeActCards.map((c) => (
            <div key={c.title} className={styles.seeActCard}>
              <div className={styles.seeActLabel}>{c.label}</div>
              <div className={styles.seeActTitle}>{c.title}</div>
              <p className={styles.seeActDesc}>{c.desc}</p>
              <div className={styles.seeActTech}>{c.tech}</div>
            </div>
          ))}
        </div>

        {/* Solutions */}
        <h2 className={styles.h2Center}>Manufacturing Solutions</h2>
        <div className={styles.solGrid}>
          {manufacturingSolutions.map((m: { title: string; tagline: string; href?: string }) => {
            const extra = mfgSolutionsImages[m.title] || { img: '/images/industry_automation_hero.png', href: m.href || '/case-studies' }
            return (
              <div key={m.title} className={styles.solCard}>
                <img
                  src={extra.img}
                  alt={m.title}
                  width="600"
                  height="400"
                  className={styles.solCardImgTag}
                />
                <div className={styles.solCardOverlay}>
                  <div className={styles.solCardTitle}>{m.title}</div>
                  <p className={styles.solCardTagline}>{m.tagline}</p>
                  <Link href={extra.href} className={styles.solKnowMore}>Know More →</Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Supply Chain */}
        <div className={styles.supplyChainBlock}>
          <div className={styles.supplyBadge}>INTEGRATED SUPPLY CHAIN</div>
          <h2 className={styles.supplyTitle}>One Connected View From Supplier to Customer</h2>
          <FlowChain nodes={supplyChainFlow} variant="dark" />
          <Link href="/contact" className={styles.supplyBtn}>Discover Your Supply Chain AI Opportunities</Link>
        </div>

        <div className={styles.caseStudiesLink}>
          <Link href="/case-studies" className={styles.caseStudiesBtn}>See Manufacturing Success Stories</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
