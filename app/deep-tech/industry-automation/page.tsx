import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Industry Automation & Vision AI — Connected Industrial Intelligence & Robotics',
  description: 'Connect machines, sensors, industrial cameras, robots, and edge gateways to automate manufacturing operations with closed-loop Vision AI.',
}

const flow = [
  'Sensors & Cameras',
  'PLC / Machine Interface',
  'OPC-UA / MQTT Gateway',
  'Edge Inferencing & Vision AI',
  'Automated Robotic Action',
  'MES / SCADA Integration',
  'Business Intelligence',
]

const caps = [
  'Vision AI & Quality Inspection',
  'IIoT & Edge Gateways',
  'Machine Connectivity & PLCs',
  'OPC-UA & MQTT Protocols',
  'Robotic Pick & Place',
  'Line-Speed Defect Rejection',
  'Industrial Camera Integration',
  'Real-Time Shop Floor Analytics',
  'Predictive Maintenance',
  'Closed-Loop Automation',
]

export default function IndustryAutomationPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: FULL-PAGE HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCard}>
            <div>
              <div className={styles.eyebrowGreen}>INDUSTRY AUTOMATION</div>
              <h1 className={styles.heroTitle}>Connect. Automate. Optimize.</h1>
              <h2 className={styles.heroSubtitle}>Unified Machine Connectivity, Edge Robotics &amp; Industrial IoT</h2>
              <p className={styles.heroDesc}>
                Unifying machine connectivity, sensors, edge computing, computer vision, and industrial robotics into one
                intelligent, connected operational capability on the factory floor.
              </p>
              <div className={styles.btnGroup}>
                <Link href="/contact" className={styles.btnPrimary}>
                  Explore Industry Automation
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  Talk to an Expert
                </Link>
              </div>
            </div>

            <div className={styles.heroVisualBox}>
              <img
                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop"
                alt="Industry Automation & Edge Robotics"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTENT & FLOW */}
      <section className={styles.content}>
        <div className={styles.flowBox}>
          <FlowChain nodes={flow} />
        </div>
        <div className={styles.capsGrid}>
          {caps.map((c) => (
            <span key={c} className={styles.cap}>
              {c}
            </span>
          ))}
        </div>
        <div className={styles.techRow}>
          Basler Industrial Cameras • Computer Vision (CNN) • OPC-UA • MQTT • Edge Gateways • Industrial Robotics • Python • AI
        </div>
        <CTABlock
          headline="Explore Vision AI &amp; Industry Automation Solutions"
          buttonLabel="Talk to an Automation &amp; Vision Expert"
          buttonHref="/contact"
        />
      </section>

      <Footer />
    </div>
  )
}
