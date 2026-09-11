import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Vision AI & Industrial Inspection — Production-Grade Automation',
  description:
    'IdentifYou engineers complete Vision AI inspection systems combining advanced 2D/3D imaging, AI deep learning, precision measurement, custom fixtures, and robotics integration.',
}

const cellNodes = [
  'Part Feeder',
  'Conveyor',
  'Fixture',
  'Vision System',
  'AI Decision',
  'Robot',
  'Sorting / Next Process',
]

const precisionNodes = [
  'Image Acquisition',
  'Processing',
  'AI Inference',
  'Measurement',
  'Decision',
  'Automated Action',
]

const topSenseFlow = ['Sense', 'Analyze', 'Measure', 'Decide', 'Act']

const equipmentTags = [
  'Custom Fixtures & Nests',
  'Production-Grade Inspection Stations',
  'Conveyors',
  'Pick-and-Place Robots',
  'Robotic Arms',
  'Feeders',
  'Pneumatic / Linear Mechanisms',
  'PLCs',
  'Sorting / Reject Systems',
  'Industrial Communication',
  'Safety & Guarding',
]

const externalCaseStudies = [
  {
    title: 'Transforming Wind Turbine Telemetry into Predictive AI Intelligence',
    href: 'https://identifyyou.in/projects/transforming-wind-turbine-telemetry-into-predictive-ai-intelligence/',
  },
  {
    title: 'Infusing AI and Deep Learning into Floating Glass On-Line Inspection Systems',
    href: 'https://identifyyou.in/projects/infusing-ai-and-deep-learning-into-floating-glass-on-line-inspection-systems/',
  },
  {
    title: 'Transforming Effluent Treatment Plants (ETP) through AI-Driven Industrial IoT (IIoT)',
    href: 'https://identifyyou.in/projects/transforming-effluent-treatment-plants-etp-through-ai-driven-industrial-iot-iiot/',
  },
]

export default function VisionAIPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* SECTION 1: FULL-PAGE HERO BANNER (MATCHING HOME PAGE HERO) */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroOverlayPattern} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCard}>
            <div>
              <div className={styles.eyebrowGreen}>VISION AI</div>
              <h1 className={styles.heroTitle}>
                Vision AI for Intelligent, Production-Grade Inspection &amp; Automation
              </h1>
              <h2 className={styles.heroSubtitle}>From Vision Intelligence to Production-Ready Automation</h2>
              <p className={styles.heroDesc}>
                We don&apos;t just develop a vision model or install a camera. We engineer complete Vision AI inspection
                systems — combining advanced imaging, AI, precision measurement, custom fixtures, automation and
                production-line integration.
              </p>
              <div className={styles.btnGroup}>
                <Link href="/deep-tech/vision-ai/end-to-end-inspection-cell" className={styles.btnPrimary}>
                  Explore Vision AI
                </Link>
                <a href="#case-studies" className={styles.btnSecondary}>
                  View Case Studies
                </a>
              </div>
            </div>

            <div className={styles.heroVisualBox}>
              <img
                src="/images/vision_ai_hero_production_line.png"
                alt="Production line: camera + 3D profiler inspecting a component, robotic arm and conveyor visible"
                className={styles.realImg}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPLETE INSPECTION CELL (DARK) */}
      <section className={styles.sectionDarkCell}>
        <div className={styles.darkCellCard}>
          <div className={styles.eyebrowGreen}>PRODUCTION ENGINEERING</div>
          <h2 className={styles.darkCellTitle}>We Engineer the Complete Inspection Cell</h2>

          <div className={styles.cellDiagramBox}>
            <img
              src="/images/end_to_end_inspection_cell.png"
              alt="Full inspection cell: part feeder, conveyor, fixture, vision system, robot arm, sorting bins"
              className={styles.realImg}
              loading="lazy"
            />
          </div>

          <FlowChain nodes={cellNodes} />

          <div className={styles.equipmentTagsGrid}>
            {equipmentTags.map((tag) => (
              <span key={tag} className={styles.equipmentTag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.quoteBox}>
            <p className={styles.quoteText}>
              &ldquo;The objective is not merely to achieve inspection accuracy. It is to achieve that accuracy reliably
              within the production line&apos;s required cycle time and throughput.&rdquo;
            </p>
          </div>

          <div style={{ marginTop: '28px' }}>
            <Link href="/deep-tech/vision-ai/end-to-end-inspection-cell" className={styles.btnPrimary}>
              Explore More → End to End Inspection Cell
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRECISION & PERFORMANCE */}
      <section className={styles.sectionPrecision}>
        <div className={styles.precisionGrid}>
          <div className={styles.precisionVisualBox}>
            <img
              src="/images/precision_mechanical_measurement.png"
              alt="Precision mechanical component with dimensional measurement overlays"
              className={styles.realImg}
              loading="lazy"
            />
          </div>

          <div>
            <div className={styles.eyebrowGreen} style={{ color: '#96c73d' }}>
              PRECISION + PERFORMANCE
            </div>
            <h2 className={styles.precisionTitle}>Precision Without Compromising Production Speed</h2>
            <p className={styles.precisionDesc}>
              Complex manufacturing applications often demand extremely tight tolerances. Our Vision AI systems are
              engineered around the required accuracy, resolution, repeatability and production cycle time — not simply
              around the choice of camera.
            </p>

            <div className={styles.statMetricsGrid}>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>99.9%</span>
                <span className={styles.statMetricLabel}>Accuracy</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>±5 µm</span>
                <span className={styles.statMetricLabel}>Repeatability</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>&lt;1.5 sec</span>
                <span className={styles.statMetricLabel}>Cycle Time</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>2,400/hr</span>
                <span className={styles.statMetricLabel}>Throughput</span>
              </div>
            </div>

            <FlowChain nodes={precisionNodes} />

            <div style={{ marginTop: '24px' }}>
              <Link href="/deep-tech/vision-ai/precision-vision-ai-setup" className={styles.btnPrimary}>
                Explore Precision Vision AI Setup →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: VISION AI IN ACTION (CASE STUDIES) */}
      <section id="case-studies" className={styles.sectionCaseStudies}>
        <h2 className={styles.csMainTitle}>Vision AI in Action</h2>

        {/* Vision AI Case Study Cards */}
        <div className={styles.csThreeGrid}>
          <CaseStudyCard
            slug="advanced-vision-inspection-surface"
            title="Advanced Vision Inspection for Surface & Edge Integrity"
          />
          <CaseStudyCard
            slug="vision-ai-bore-measurement"
            title="High-Speed Micron-Level Bore & Interface Inspection"
          />
          <CaseStudyCard
            slug="vision-ai-complex-dimension"
            title="Precision Inspection of Complex Threads & Internal Geometries"
          />
        </div>
      </section>

      {/* SECTION 5: THE DIFFERENCE (DARK STACK) */}
      <section className={styles.sectionDarkDifference}>
        <div className={styles.darkDiffCard}>
          <div className={styles.eyebrowGreen}>THE DIFFERENCE</div>
          <h2 className={styles.darkCellTitle}>From Vision Inspection to Production-Ready Automation</h2>
          <p style={{ maxWidth: '760px', margin: '0 auto 28px', color: '#A0B0A7', fontSize: '15px' }}>
            Industrial inspection is not just about seeing a defect. It is about reliably inspecting the right feature,
            at the right accuracy, at production speed — and automatically acting on the result.
          </p>

          <div style={{ marginBottom: '32px' }}>
            <FlowChain nodes={topSenseFlow} />
          </div>

          <div className={styles.stackedFlowGrid}>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>1. Advanced Imaging</div>
              <div className={styles.stackedSub}>2D • 3D • UV • Thermal • Line Scan</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>2. AI &amp; Vision Intelligence</div>
              <div className={styles.stackedSub}>Detection • Classification • Anomaly Detection • Measurement</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>3. Precision Engineering</div>
              <div className={styles.stackedSub}>Fixtures • Nests • Tooling • Positioning</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>4. Industrial Automation</div>
              <div className={styles.stackedSub}>Conveyors • Robots • Pick &amp; Place • PLC • Sorting</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>5. Production Deployment</div>
              <div className={styles.stackedSub}>Cycle Time • Throughput • Integration • Commissioning</div>
            </div>
          </div>

          <p style={{ margin: '24px 0 0', fontSize: '13.5px', color: '#a6d64c', fontWeight: '600' }}>
            From a proof-of-concept on the lab bench to a production-ready inspection cell on the factory floor.
          </p>
        </div>
      </section>

      {/* SECTION 6: POINT OF VIEW */}
      <section className={styles.sectionPov}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen} style={{ color: '#96c73d' }}>
            VISION AI POINT OF VIEW
          </div>

          <div className={styles.povThreeGrid}>
            <div className={styles.povCard}>
              <div>
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '180px', marginBottom: '16px' }}>
                  <img
                    src="/images/threed_component_profiling.png"
                    alt="3D-scanned component with dimensional overlays"
                    className={styles.realImg}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.povTitle}>Why 3D Profiling is Transforming Industrial Inspection</h3>
                <p className={styles.povDesc}>
                  Explore how 3D profiling enables manufacturers to inspect complex geometry, depth, height, profiles
                  and dimensional characteristics that conventional 2D vision may not reliably capture.
                </p>
              </div>
              <Link href="/blogs-and-news" className={styles.csLink}>
                Read the POV →
              </Link>
            </div>

            <div className={styles.povCard}>
              <div>
                <div className={styles.csFeaturedTag}>POINT OF VIEW</div>
                <h3 className={styles.povTitle}>AI Deep Learning vs Traditional Rule-Based Vision</h3>
                <p className={styles.povDesc}>
                  Understanding when to use deep learning neural networks versus classical computer vision algorithms
                  for high-speed factory quality inspection.
                </p>
              </div>
              <Link href="/blogs-and-news" className={styles.csLink}>
                Read the POV →
              </Link>
            </div>

            <div className={styles.povCard}>
              <div>
                <div className={styles.csFeaturedTag}>POINT OF VIEW</div>
                <h3 className={styles.povTitle}>Integrating Vision Inspection with PLC and Robotics</h3>
                <p className={styles.povDesc}>
                  Best practices for zero-latency triggers, rejection mechanisms, and robotic guidance on automated
                  assembly lines.
                </p>
              </div>
              <Link href="/blogs-and-news" className={styles.csLink}>
                Read the POV →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: ECOSYSTEM */}
      <section className={styles.sectionPartners}>
        <div className={styles.eyebrowGreen} style={{ color: '#96c73d' }}>
          TECHNOLOGY &amp; PARTNERSHIP ECOSYSTEM
        </div>
        <h2 className={styles.csMainTitle}>Powered by the Right Technology Ecosystem</h2>
        <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#5B6862' }}>
          Production-grade Vision AI requires the right combination of cameras, sensors, optics, lighting, computing,
          automation and industrial engineering.
        </p>

        <div className={styles.partnersGrid}>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>Basler Cameras</h3>
            <p className={styles.partnerDesc}>
              Industrial 2D matrix cameras, line scan sensors, 3D laser profilers, and high-speed optics integration.
            </p>
          </div>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>Vision AI Hardware &amp; GPUs</h3>
            <p className={styles.partnerDesc}>
              NVIDIA Jetson edge inferencing, industrial PCs, optical illumination arrays, and IP67 enclosures.
            </p>
          </div>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>Robotics &amp; Automation</h3>
            <p className={styles.partnerDesc}>
              PLC controllers (Siemens / Rockwell), pneumatic rejectors, linear actuators, and pick-and-place robots.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA BLOCK */}
      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.csMainTitle} style={{ color: '#FFFFFF', marginBottom: '24px' }}>
            Ready to See What Your Inspection Process Is Missing?
          </h2>
          <Link href="/contact" className={styles.btnPrimary}>
            Talk to a Vision AI Expert
          </Link>
        </div>
      </section>

      {/* SECTION 9: NEWS & INSIGHTS */}
      <section className={styles.sectionNews}>
        <div className={styles.eyebrowGreen} style={{ color: '#96c73d' }}>
          LATEST NEWS &amp; INSIGHTS
        </div>

        <div className={styles.newsGrid}>
          <Link href="/blogs-and-news" className={styles.newsCard}>
            <div className={styles.newsTag}>NEWS</div>
            <h3 className={styles.newsTitle}>Transforming Manufacturing Quality with AI Visual Intelligence</h3>
            <p className={styles.newsDesc}>
              How modern computer vision and deep learning are elevating quality control from reactive cost centers to
              proactive competitive advantages.
            </p>
            <span className={styles.csLink}>Read More →</span>
          </Link>

          <Link href="/blogs-and-news" className={styles.newsCard}>
            <div className={styles.newsTag}>BLOG</div>
            <h3 className={styles.newsTitle}>Key Considerations for Line-Speed Optical Inspection</h3>
            <p className={styles.newsDesc}>
              Balancing cycle time, exposure, strobe lighting, and inferencing latency on high-throughput assembly
              lines.
            </p>
            <span className={styles.csLink}>Read More →</span>
          </Link>

          <Link href="/blogs-and-news" className={styles.newsCard}>
            <div className={styles.newsTag}>INSIGHT</div>
            <h3 className={styles.newsTitle}>Reducing Scrap and Re-Work using Closed-Loop Vision Control</h3>
            <p className={styles.newsDesc}>
              Connecting inspection decisions directly to PLC actuators and upstream tooling to prevent defect propagation.
            </p>
            <span className={styles.csLink}>Read More →</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
