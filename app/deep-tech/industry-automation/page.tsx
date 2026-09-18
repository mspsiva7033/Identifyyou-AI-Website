'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

const comparisonData = [
  { traditional: 'Machine data is isolated', connected: 'Machine data is connected' },
  { traditional: 'Manual production reporting', connected: 'Real-time production visibility' },
  { traditional: 'Periodic status updates', connected: 'Continuous operational awareness' },
  { traditional: 'Reactive quality control', connected: 'Predictive quality intelligence' },
  { traditional: 'Static production plans', connected: 'Context-aware optimization' },
  { traditional: 'Manual traceability', connected: 'Digital traceability' },
  { traditional: 'ERP knows transactions', connected: 'ERP is connected to operational reality' },
  { traditional: 'Dashboards show history', connected: 'Intelligence supports decisions' },
  { traditional: 'People discover problems', connected: 'Systems detect and highlight problems' },
  { traditional: 'Data describes what happened', connected: 'AI helps determine what should happen next' },
]

const floorCapabilities: Record<
  string,
  { title: string; challenge: string; howItWorks: string; tags: string[] }
> = {
  'Robotic machine tending': {
    title: 'Robotic Machine Tending',
    challenge: 'Manual loading and unloading of CNC machines causes spindle idle time and operator fatigue.',
    howItWorks: 'Robotic arms interface directly with CNC door triggers and chuck clamps for synchronized part loading.',
    tags: ['Robot Arm', 'CNC Interface', 'Part Nest'],
  },
  'AGV/AMR material movement': {
    title: 'AGV/AMR Material Movement',
    challenge: 'Manual movement between warehouse, buffer and station is slow and inconsistent.',
    howItWorks: 'Autonomous vehicles move material along a coordinated route, triggered by a dispatch signal.',
    tags: ['AGV / AMR', 'Warehouse Buffer', 'Dispatch Signal'],
  },
  'Automated visual inspection': {
    title: 'Automated Visual Inspection',
    challenge: 'Human visual checks miss high-speed surface defects and micron-level dimensional variations.',
    howItWorks: 'High-resolution camera sensors capture images under optical strobes, with AI model classifying defects instantly.',
    tags: ['Basler Camera', 'Strobe Illumination', 'AI Inferencing'],
  },
  'AMHS coordination': {
    title: 'AMHS Coordination',
    challenge: 'Uncoordinated material handling leads to bottlenecks and idle production lines.',
    howItWorks: 'Automated Material Handling Systems (AMHS) schedule overhead hoists and tracks based on line demand.',
    tags: ['Overhead Hoist', 'Line Demand', 'PLC Signal'],
  },
  'Production traceability': {
    title: 'Production Traceability',
    challenge: 'Lack of serialization makes quality tracking and root-cause analysis difficult across lots.',
    howItWorks: '2D DPM barcodes and RFID tags are scanned at every station, storing continuous genealogy in MES.',
    tags: ['DPM Barcode', 'RFID Scanner', 'MES Genealogy'],
  },
  'Multi-cell orchestration': {
    title: 'Multi-Cell Orchestration',
    challenge: 'Isolated island cells create inventory buffers and uneven cycle time across assembly lines.',
    howItWorks: 'Centralized orchestration controller synchronizes work-in-progress transfer across multiple robotic cells.',
    tags: ['Cell Controller', 'Cycle Time Sync', 'SCADA Integration'],
  },
}

export default function IndustryAutomationPage() {
  const [selectedCap, setSelectedCap] = useState<string>('AGV/AMR material movement')
  const currentCapData = floorCapabilities[selectedCap]

  return (
    <div className={styles.page}>
      <Header />

      {/* 1. HERO / BANNER */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/industry_automation_hero.png"
          alt="Industrial Automation Background"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <div className={styles.eyebrowGreen}>INDUSTRIAL AUTOMATION</div>
            <h1 className={styles.heroTitle}>From production challenges to deployed automation.</h1>
            <p className={styles.heroDesc}>
              We design, develop, and deploy automation systems that connect production processes, move materials
              intelligently, and help plants scale with confidence.
            </p>
            <div className={styles.heroAccentGreen}>Connect. Automate. Orchestrate. Improve.</div>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Talk to an Automation Expert
              </Link>
              <a href="#capabilities" className={styles.btnSecondaryDark}>
                Explore Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTRODUCTION */}
      <section className={styles.sectionIntro}>
        <h2 className={styles.introTitle}>
          Intelligent Industry Automation, Connected Operations &amp; Autonomous Execution
        </h2>
        <p className={styles.introParagraph}>
          At IdentifYou Technologies, we engineer intelligent industry automation that connects machines, robotics,
          sensors, edge intelligence, and enterprise systems into a unified operational ecosystem. We transform isolated
          automation into <span className={styles.introBold}>connected, data-driven, and intelligent operations</span>,
          enabling factories to <span className={styles.introBold}>sense, respond, and continuously improve</span>. The
          result is a <span className={styles.introBold}>connected, intelligent, and increasingly autonomous factory</span>{' '}
          built for greater operational efficiency, agility, and continuous improvement.
        </p>
      </section>

      {/* 3. FROM REACTIVE MANUFACTURING TO INTELLIGENT MANUFACTURING */}
      <section className={styles.sectionComparison}>
        <h2 className={styles.compHeading}>From Reactive Manufacturing to Intelligent Manufacturing</h2>

        <div className={styles.compTable}>
          <div className={styles.compHeaderRow}>
            <div className={styles.compHeader}>Traditional Factory</div>
            <div className={`${styles.compHeader} ${styles.compHeaderRight}`}>
              Connected Intelligent Factory
            </div>
          </div>

          {comparisonData.map((row, idx) => (
            <div key={idx} className={styles.compRow}>
              <div className={styles.compCellLeft}>{row.traditional}</div>
              <div className={styles.compCellRight}>{row.connected}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SUPPORTING DOCUMENT CARD (CONNECTED INTELLIGENT PLANT) */}
      <section className={styles.sectionSupportingCard}>
        <div className={styles.supportingCard}>
          <div>
            <div className={styles.supportingPath}>
              Industry_Automation → Supporting Document → connected_intelligent_plant
            </div>
            <h3 className={styles.supportingTitle}>Connected Intelligent Plant Architecture</h3>
            <p className={styles.supportingDesc}>
              Explore the detailed architecture for connecting shop-floor machines, PLCs, edge inferencing, and cloud
              intelligence into a unified autonomous plant.
            </p>
          </div>
          <Link href="/contact" className={styles.btnPrimary} style={{ whiteSpace: 'nowrap' }}>
            Explore Connected Intelligent Plant →
          </Link>
        </div>
      </section>

      {/* 5. FLUKE TV30 SUCCESS STORY */}
      <section className={styles.sectionCaseStudy}>
        <div className={styles.csCardDark}>
          <div className={styles.csGrid}>
            <div>
              <div className={styles.csTag}>FEATURED SUCCESS STORY · INDUSTRY AUTOMATION</div>
              <h2 className={styles.csTitle}>
                Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer
              </h2>
              <p className={styles.csDesc}>
                In high-stakes industrial environments, a slight temperature deviation can mean the difference between
                seamless production and costly equipment failure. Our Industrial Edge Gateway, purpose-built for the
                Fluke Thermalert TV30 Pyrometer, transforms raw thermal data into actionable business intelligence.
              </p>
              <p className={styles.csDesc}>
                We engineered an IP65 industrial edge gateway running Raspberry Pi 4 ARM hardware with RS485 pyrometer
                polling, local sub-second anomaly detection, and automated rich WhatsApp alerts.
              </p>
              <p className={styles.csDesc} style={{ color: '#96c73d', fontWeight: '700' }}>
                Achieving 99.4% equipment uptime, continuous 24/7 thermal assurance, and zero unpredicted critical
                failures.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/case-studies/fluke-t40" className={styles.btnPrimary}>
                  Explore Fluke TV30 Success Story →
                </Link>
              </div>
            </div>

            <div className={styles.csImgBox}>
              <img
                src="/images/case-studies/fluke-t40.png"
                alt="Fluke Thermalert TV30 Edge Gateway"
                className={styles.realImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. MACHINE VISION */}
      <section className={styles.sectionCaseStudy}>
        <div className={styles.csCardDark} style={{ background: '#121C17' }}>
          <div className={styles.csGrid}>
            <div className={styles.csImgBox}>
              <img
                src="/images/vision_ai_hero_production_line.png"
                alt="Machine Vision Quality Inspection"
                className={styles.realImg}
              />
            </div>

            <div>
              <div className={styles.csTag}>VISION AI &amp; MACHINE VISION</div>
              <h2 className={styles.csTitle}>Machine Vision &amp; Visual Quality Inspection</h2>
              <p className={styles.csDesc}>
                Manufacturing quality is not just about seeing defects. It is about making the right quality decision, at
                the right time, on the production line.
              </p>
              <p className={styles.csDesc}>
                IdentifYou uses Visual Intelligence and AI to help manufacturers continuously understand what is happening on
                the production line, identify quality risks and turn visual information into real-time operational decisions —
                detecting defects, verifying processes, identifying deviations and enabling automated decisions in real time.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/deep-tech/vision-ai" className={styles.btnPrimary}>
                  Explore Machine Vision Solutions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHERE THIS SHOWS UP ON THE FLOOR */}
      <section id="capabilities" className={styles.sectionCapabilities}>
        <div className={styles.capsCardDark}>
          <h2 className={styles.capsTitle}>Where This Shows Up on the Floor</h2>

          <div className={styles.capsPillGroup}>
            {Object.keys(floorCapabilities).map((capKey) => (
              <button
                key={capKey}
                onClick={() => setSelectedCap(capKey)}
                className={`${styles.capsPill} ${
                  selectedCap === capKey ? styles.capsPillActive : ''
                }`}
              >
                {capKey}
              </button>
            ))}
          </div>

          {currentCapData && (
            <div className={styles.capDetailPanel}>
              <div>
                <h3 className={styles.capDetailTitle}>{currentCapData.title}</h3>
                <p className={styles.capDetailRow}>
                  <span className={styles.capDetailLabel}>Challenge — </span>
                  {currentCapData.challenge}
                </p>
                <p className={styles.capDetailRow}>
                  <span className={styles.capDetailLabel}>How it works — </span>
                  {currentCapData.howItWorks}
                </p>

                <div className={styles.capTagsGroup}>
                  {currentCapData.tags.map((tag) => (
                    <span key={tag} className={styles.capTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.processVisual}>
                <div className={styles.processNode}>Input</div>
                <div className={styles.processLine} />
                <div className={`${styles.processNode} ${styles.processNodeActive}`}>
                  Process
                </div>
                <div className={styles.processLine} />
                <div className={styles.processNode}>Output</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>
            Ready to turn a manufacturing challenge into a working automation system?
          </h2>
          <p className={styles.ctaDesc}>
            Start with the process, the constraint, or the opportunity — we&apos;ll help define where automation creates
            practical value.
          </p>
          <div className={styles.btnGroup} style={{ justifyContent: 'center' }}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to an Automation Expert
            </Link>
            <Link href="/contact" className={styles.btnSecondary}>
              Explore an Opportunity
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  )
}
