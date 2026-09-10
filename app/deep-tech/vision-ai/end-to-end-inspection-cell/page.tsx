import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'End-to-End Inspection Cell Engineering | IdentifYou Vision AI',
  description:
    'Detailed architecture, tooling, fixtures, robotics, and automation integration for turnkey production-grade inspection cells.',
}

const cellFlow = [
  'Part Feeder / Infeed',
  'Conveyor Transport',
  'Precision Fixture & Nesting',
  'Camera & Strobe Lighting Trigger',
  'Edge Inferencing & Vision AI Model',
  'Pneumatic / Robotic Actuation',
  'Accept / Reject Sorting Bins',
]

const cellComponents = [
  {
    title: '1. Custom Fixtures & Part Nesting',
    desc: 'Precision mechanical tooling designed to repeatably position components within sub-millimeter tolerances under the camera lens.',
  },
  {
    title: '2. High-Speed Optical Acquisition',
    desc: 'Basler 2D matrix cameras, line scan sensors, or 3D laser profilers paired with industrial LED strobe lighting to eliminate motion blur at line speeds.',
  },
  {
    title: '3. Real-Time Edge Inferencing',
    desc: 'Sub-second AI model inferencing running on local industrial GPUs, executing defect classification, dimensional measurement, and surface inspection.',
  },
  {
    title: '4. Industrial Automation & PLC Control',
    desc: 'Direct OPC-UA / Modbus / PROFINET interfacing with Siemens / Rockwell PLCs to trigger pneumatic rejection arms, diverters, or pick-and-place robots.',
  },
]

export default function EndToEndInspectionCellPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.eyebrowGreen}>SUPPORTING DOCUMENTATION</div>
            <h1 className={styles.heroTitle}>End-to-End Inspection Cell Engineering</h1>
            <p className={styles.heroDesc}>
              A comprehensive technical guide to how IdentifYou designs, builds, and deploys turnkey automated
              inspection cells on high-speed manufacturing lines.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Schedule a Cell Architecture Review
              </Link>
              <Link href="/deep-tech/vision-ai" className={styles.btnSecondary}>
                ← Back to Vision AI Overview
              </Link>
            </div>
          </div>

          <div className={styles.heroVisualBox}>
            <img
              src="/images/end_to_end_inspection_cell.png"
              alt="End to End Inspection Cell Architecture"
              className={styles.realImg}
            />
          </div>
        </div>
      </section>

      <section className={styles.sectionDarkCell}>
        <div className={styles.darkCellCard}>
          <div className={styles.eyebrowGreen}>CELL WORKFLOW</div>
          <h2 className={styles.darkCellTitle}>Automated Inspection Cell Process Flow</h2>
          <FlowChain nodes={cellFlow} />
        </div>
      </section>

      <section className={styles.sectionPov}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>SYSTEM COMPONENTS</div>
          <h2 className={styles.csMainTitle}>Core Mechanical, Optical &amp; AI Subsystems</h2>

          <div className={styles.povThreeGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
            {cellComponents.map((comp) => (
              <div key={comp.title} className={styles.partnerCard}>
                <h3 className={styles.partnerTitle}>{comp.title}</h3>
                <p className={styles.partnerDesc} style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.csMainTitle} style={{ color: '#FFFFFF', marginBottom: '20px' }}>
            Need a Turnkey Inspection Cell for Your Factory?
          </h2>
          <Link href="/contact" className={styles.btnPrimary}>
            Talk to an Automation &amp; Vision Engineer
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
