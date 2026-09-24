import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Industrial Robotics & Automation — IdentifYou Technologies',
  description:
    'Intelligent industrial robotic arms, automated pick-and-place, machine vision integration, and connected factory automation.',
}

const robotCapabilities = [
  {
    icon: '🤖',
    title: 'Autonomous Pick & Place',
    desc: 'High-speed robotic sorting and bin picking powered by 3D Vision AI and deep learning neural networks.',
    spec: 'Sub-millimeter accuracy · 120 cycles/min',
  },
  {
    icon: '👁️',
    title: 'Vision-Guided Robotic Arms',
    desc: 'Integrated Basler industrial camera feedback loops for real-time path calculation and dynamic object pose estimation.',
    spec: '6-DOF Articulated Arms · Real-time Pose Estimation',
  },
  {
    icon: '⚡',
    title: 'Collaborative Robots (Cobots)',
    desc: 'Safe human-robot collaboration on assembly lines with collision detection and adaptive force sensing.',
    spec: 'ISO/TS 15066 Compliant · Zero-Fencing Design',
  },
  {
    icon: '📡',
    title: 'OPC-UA & Edge Connectivity',
    desc: 'Direct PLC, ROS2, and MQTT integration feeding operational telemetry straight into MES and ERP systems.',
    spec: 'Latency < 5ms · Multi-protocol Gateway',
  },
]

const roboticsSolutions = [
  {
    title: 'Automated Quality Inspection & Sorting',
    category: 'Inspection & Sorting',
    desc: 'Robotic arms equipped with high-resolution area scan cameras automatically inspect components on conveyor lines and sort defective parts into reject bins in real time.',
    tags: ['Vision AI', '6-Axis Arm', 'Defect Sorting'],
  },
  {
    title: 'Robotic Welding & Surface Finishing',
    category: 'Precision Manufacturing',
    desc: 'AI-driven trajectory planning for seam welding and automated surface polishing in automotive auto-component manufacturing.',
    tags: ['Automotive', 'Trajectory AI', 'Quality Control'],
  },
  {
    title: 'Palletizing & Material Handling',
    category: 'Logistics & Warehouse',
    desc: 'Heavy-payload industrial manipulators with dynamic layer pattern generation and barcode/RFID tag verification.',
    tags: ['RFID', 'Heavy Payload', 'Layer Optimization'],
  },
]

export default function IndustrialRobotsPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* HERO BANNER */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.badge}>Industrial Automation & Robotics</div>
          <h1 className={styles.heroTitle}>
            Next-Generation <span className={styles.accentText}>Industrial Robotics</span> for Connected Factories
          </h1>
          <p className={styles.heroSub}>
            We engineer intelligent robotic arms, vision-guided automation, and autonomous material handling systems that see, think, and act on the shop floor.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Robotics Expert
            </Link>
            <Link href="/deep-tech/vision-ai" className={styles.btnSecondary}>
              Explore Vision-Guided AI
            </Link>
          </div>
        </div>
      </section>

      {/* ROBOTICS SHOWCASE GRAPHIC */}
      <section className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.showcaseCard}>
            <div className={styles.robotGraphicBox}>
              <div className={styles.gridOverlay} />
              <div className={styles.robotVisual}>
                {/* High Tech Animated Industrial Robot Visual */}
                <div className={styles.robotArmContainer}>
                  <div className={styles.armBase} />
                  <div className={styles.armJoint1} />
                  <div className={styles.armSegment1} />
                  <div className={styles.armJoint2} />
                  <div className={styles.armSegment2} />
                  <div className={styles.laserBeam} />
                  <div className={styles.targetComponent} />
                </div>
                <div className={styles.scannerHud}>
                  <div className={styles.hudLine}>VISION_AI // TARGET_LOCKED</div>
                  <div className={styles.hudStat}>ACCURACY: 99.98% | LATENCY: 2.4ms</div>
                  <div className={styles.hudStatus}>STATUS: OPERATIONAL</div>
                </div>
              </div>
            </div>
            <div className={styles.showcaseContent}>
              <div className={styles.eyebrow}>Intelligent Shop Floor</div>
              <h2 className={styles.h2Light}>Bridge Physical Execution with AI Intelligence</h2>
              <p className={styles.descText}>
                Modern industrial robots are no longer hardcoded script executors. By fusing 6-axis articulated manipulators with Vision AI and edge compute, IdentifYou enables robots to adapt dynamically to changing component geometries, orientation shifts, and real-time quality standards.
              </p>
              <ul className={styles.featureList}>
                <li>✓ Real-time 3D pose estimation and bin picking</li>
                <li>✓ Closed-loop visual inspection and defect rejection</li>
                <li>✓ Seamless integration with Siemens PLCs and ROS2</li>
                <li>✓ Automated telemetry sync with SAP & MES platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className={styles.capsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2Dark}>Robotics & Automation Capabilities</h2>
            <p className={styles.subText}>Architected for high-throughput, zero-downtime manufacturing environments.</p>
          </div>
          <div className={styles.capsGrid}>
            {robotCapabilities.map((cap) => (
              <div key={cap.title} className={styles.capCard}>
                <div className={styles.capIcon}>{cap.icon}</div>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capDesc}>{cap.desc}</p>
                <div className={styles.capSpec}>{cap.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className={styles.solutionsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2Light}>Turnkey Industrial Robotics Solutions</h2>
            <p className={styles.subTextLight}>Deployed across Automotive, Metals, Electronics, and Discrete Manufacturing.</p>
          </div>
          <div className={styles.solutionsGrid}>
            {roboticsSolutions.map((sol) => (
              <div key={sol.title} className={styles.solCard}>
                <div className={styles.solCategory}>{sol.category}</div>
                <h3 className={styles.solTitle}>{sol.title}</h3>
                <p className={styles.solDesc}>{sol.desc}</p>
                <div className={styles.tagWrap}>
                  {sol.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to Automate Your Manufacturing Line?</h2>
          <p className={styles.ctaDesc}>
            Speak with our industrial automation & robotics engineers to evaluate your factory floor requirements.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Robotics Expert
            </Link>
            <span className={styles.contactPhone}>Direct Line: +91 9597046682</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
