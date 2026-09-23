'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import styles from './page.module.css'

const connectedCaseStudies = [
  {
    slug: 'connected-intelligent-plant',
    title: 'Connected Intelligent Plant Architecture',
    tag: 'CONNECTED OPERATIONS · AUTOMATED EXECUTION',
    categories: ['Industry Automation', 'Automation', 'Manufacturing'],
    image: '/images/case-studies/connected-intelligent-plant.png',
  },
  {
    slug: 'industrial-edge-device-engineering',
    title: 'Industrial Edge Device Engineering — Hardware Foundation for Edge AI',
    tag: 'HARDWARE FOUNDATION · EDGE AI',
    categories: ['Industry Automation', 'Automation', 'Manufacturing'],
    image: '/images/case-studies/industrial-edge-device-engineering.png',
  },
  {
    slug: 'towards-zero-inventory-variance-automation',
    title: 'Towards Zero Inventory Variance — Digitally Controlled Material Execution',
    tag: 'MATERIAL TRACEABILITY · MES EXECUTION',
    categories: ['Industry Automation', 'Automation', 'Supply Chain'],
    image: '/images/case-studies/towards-zero-inventory-variance-automation.png',
  },
]

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

const useCaseCards = [
  {
    id: 'tv30',
    navLabel: '1. TV30 Pyrometer Gateway',
    tag: 'FEATURED SUCCESS STORY · INDUSTRY AUTOMATION',
    title: 'Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer',
    desc1:
      'In high-stakes industrial environments, a slight temperature deviation can mean the difference between seamless production and costly equipment failure. Our Industrial Edge Gateway, purpose-built for the Fluke Thermalert TV30 Pyrometer, transforms raw thermal data into actionable business intelligence.',
    desc2:
      'We engineered an IP65 industrial edge gateway running Raspberry Pi 4 ARM hardware with RS485 pyrometer polling, local sub-second anomaly detection, and automated rich WhatsApp alerts.',
    highlight:
      'Achieving 99.4% equipment uptime, continuous 24/7 thermal assurance, and zero unpredicted critical failures.',
    btnLabel: 'Explore Fluke TV30 Success Story →',
    btnHref: '/case-studies/fluke-tv30',
    image: '/images/case-studies/fluke-tv30.png',
  },
  {
    id: 't40',
    navLabel: '2. T40 Pyrometer Gateway',
    tag: 'FEATURED SUCCESS STORY · INDUSTRY AUTOMATION',
    title: 'Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer',
    desc1:
      'Thermal monitoring across continuous casting and heat-treatment lines requires non-stop telemetry polling without cloud latency or connection drops.',
    desc2:
      'Our T40 Edge Gateway processes high-frequency pyrometer telemetry at the edge, detecting micro-spikes instantly and pushing real-time alerts to maintenance engineers.',
    highlight:
      'Sub-second edge anomaly detection with zero unpredicted thermal shutdowns.',
    btnLabel: 'Explore Fluke T40 Success Story →',
    btnHref: '/case-studies/fluke-t40',
    image: '/images/case-studies/fluke-t40.png',
  },
  {
    id: 'edge-intelligence',
    navLabel: '3. Industrial Edge Intelligence',
    tag: 'SOFTWARE PLATFORM · EDGE AI',
    title: 'Edge Intelligence & Software Platform for Industrial Applications',
    desc1:
      'Deploying containerized microservices and AI workloads across distributed factory edge gateways without OT downtime.',
    desc2:
      'IdentifYou Edge Intelligence software runtime brings Docker/K3s container orchestration, store-and-forward time-series caching, and centralized OTA management to shop-floor hardware.',
    highlight:
      'Sub-10ms real-time edge processing and fleet-wide OTA application management.',
    btnLabel: 'Explore Industrial Edge Intelligence →',
    btnHref: '/case-studies/industrial-edge-intelligence',
    image: '/images/case-studies/industrial-edge-intelligence.png',
  },
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
  const [activeUseCase, setActiveUseCase] = useState<string>('tv30')
  const [selectedCap, setSelectedCap] = useState<string>('AGV/AMR material movement')

  const currentCapData = floorCapabilities[selectedCap]
  const currentUseCase = useCaseCards.find((c) => c.id === activeUseCase) || useCaseCards[0]

  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: HERO / BANNER */}
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
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Talk to an Automation Expert
              </Link>
              <a href="#capabilities" className={styles.btnSecondary}>
                Explore Capabilities
              </a>
            </div>
          </div>

          {/* CIRCULAR PLANT OPERATIONS CYCLE GRAPHIC */}
          <div className={styles.circularVisualBox}>
            <div className={styles.circleOuterDashed} />
            <div className={styles.circleCenter}>
              PLANT<br />OPERATIONS
            </div>
            <div className={`${styles.circleNode} ${styles.nodeConnect}`}>Connect</div>
            <div className={`${styles.circleNode} ${styles.nodeAutomate}`}>Automate</div>
            <div className={`${styles.circleNode} ${styles.nodeOrchestrate}`}>Orchestrate</div>
            <div className={`${styles.circleNode} ${styles.nodeImprove}`}>Improve</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MAIN INTRODUCTION */}
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

      {/* SECTION 3: CONNECTED OPERATIONS SUCCESS STORIES */}
      <section className={styles.sectionConnectedCaseStudies}>
        <div className={styles.connectedHeaderRow}>
          <div className={styles.eyebrowGreen}>CONNECTED OPERATIONS</div>
          <h2 className={styles.connectedSectionTitle}>Pillar Success Stories &amp; Architecture</h2>
          <p className={styles.connectedSectionSub}>
            Real-world success stories demonstrating connected operations, edge device engineering, and zero inventory variance execution.
          </p>
        </div>

        <div className={styles.caseStudiesGrid}>
          {connectedCaseStudies.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              slug={cs.slug}
              title={cs.title}
              tag={cs.tag}
              categories={cs.categories}
              image={cs.image}
              href={`/case-studies/${cs.slug}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: THREE FEATURED USE CASE CARDS */}
      <section className={styles.sectionThreeUseCases}>
        <div className={styles.useCaseHeaderRow}>
          <div className={styles.eyebrowGreen}>SUCCESS STORIES &amp; HARDWARE PLATFORMS</div>
          <h2 className={styles.useCaseTitle}>Featured Industrial Automation Solutions</h2>

          <div className={styles.useCaseNavTabs}>
            {useCaseCards.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`${styles.useCaseTab} ${
                  activeUseCase === uc.id ? styles.useCaseTabActive : ''
                }`}
              >
                {uc.navLabel}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.csCardDark}>
          <div className={styles.csGrid}>
            <div>
              <div className={styles.csTag}>{currentUseCase.tag}</div>
              <h3 className={styles.csTitle}>{currentUseCase.title}</h3>
              <p className={styles.csDesc}>{currentUseCase.desc1}</p>
              <p className={styles.csDesc}>{currentUseCase.desc2}</p>
              <p className={styles.csDesc} style={{ color: '#96c73d', fontWeight: '700' }}>
                {currentUseCase.highlight}
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href={currentUseCase.btnHref} className={styles.btnPrimary}>
                  {currentUseCase.btnLabel}
                </Link>
              </div>
            </div>

            <div className={styles.csImgBox}>
              <img
                src={currentUseCase.image}
                alt={currentUseCase.title}
                className={styles.realImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON TABLE */}
      <section className={styles.sectionComparison}>
        <div className={styles.eyebrowGreen} style={{ textAlign: 'center' }}>
          OPERATIONAL TRANSFORMATION
        </div>
        <h2 className={styles.compHeading}>
          Traditional Factory vs. Connected Intelligent Factory
        </h2>
        <p className={styles.compSubheading}>
          A side-by-side breakdown of legacy operational siloes versus a modern, connected intelligent plant ecosystem.
        </p>

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

      {/* SECTION 6: WHERE THIS SHOWS UP ON THE FLOOR */}
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

      {/* SECTION 7: FINAL CTA BANNER */}
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

      <Footer />
    </div>
  )
}
