import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Vision AI for Intelligent, Production-Grade Inspection & Automation — IdentifYou',
  description:
    'IdentifYou engineers complete Vision AI inspection systems combining advanced imaging, AI deep learning, precision measurement, custom fixtures, and robotics integration.',
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

const threeCaseStudies = [
  {
    title: 'Transforming Wind Turbine Telemetry into Predictive AI Intelligence',
    tag: 'RENEWABLE ENERGY · PREDICTIVE AI',
    url: '/case-studies',
    desc: 'Transforming wind turbine telemetry into real-time predictive AI intelligence for failure prevention, gearbox health monitoring, and energy yield optimization.',
  },
  {
    title: 'Infusing AI and Deep Learning into Floating Glass On-Line Inspection Systems',
    tag: 'GLASS MANUFACTURING · VISION AI',
    url: '/case-studies',
    desc: 'High-speed, continuous float glass web inspection using multi-spectral cameras and deep learning models to detect optical defects, bubbles, and inclusions at line speeds.',
  },
  {
    title: 'Transforming Effluent Treatment Plants (ETP) through AI-Driven Industrial IoT (IIoT)',
    tag: 'PROCESS & ETP · INDUSTRIAL IOT',
    url: '/case-studies',
    desc: 'AI-driven IIoT architecture for continuous water quality monitoring, automated chemical dosing optimization, and real-time compliance management in effluent treatment plants.',
  },
]

export default function VisionAIPage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* 1. TOP HERO BANNER */}
      <section className={styles.sectionHeroBanner}>
        <img
          src="/images/vision_ai_hero_new.png"
          alt="Vision AI Background"
          className={styles.heroBgImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <h1 className={styles.heroTitle}>
              Intelligent Vision for Intelligent Manufacturing
            </h1>
            <p className={styles.heroDesc}>
              Transform images into actionable intelligence for quality, production and automated operations.
              IdentifYou engineers AI-powered visual intelligence for modern manufacturing, transforming visual data into
              precise, real-time operational decisions.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/case-studies" className={styles.btnSecondaryDark}>
                Explore More Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTRO SECTION */}
      <section className={styles.sectionIntro}>
        <h2 className={styles.introTitle}>AI-Powered Visual Intelligence for Manufacturing</h2>
        <p className={styles.introParagraph}>
          We don&apos;t just develop a vision model or install a camera. We engineer complete Vision AI inspection
          systems — combining advanced imaging, AI, precision measurement, custom fixtures, automation and
          production-line integration. From precision inspection and measurement to intelligent process control, we engineer
          solutions designed for real-world manufacturing environments. <span className={styles.introBold}>See better. Decide faster. Operate smarter.</span>
        </p>
      </section>

      {/* 3. INSPECTION CELL SECTION (PDF Page 2 Top) */}
      <section className={styles.sectionDarkCell}>
        <div className={styles.darkCellCard}>
          <div className={styles.eyebrowGreen}>PRODUCTION ENGINEERING</div>
          <h2 className={styles.darkCellTitle}>We Engineer the Complete Inspection Cell</h2>

          <div className={styles.cellDiagramBox}>
            <img
              src="/images/end_to_end_inspection_cell.png"
              alt="Full inspection cell: part feeder, conveyor, fixture, vision system, robot arm, sorting bins"
              className={styles.realImg}
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
            <Link href="/case-studies/end-to-end-inspection-cell" className={styles.btnPrimary}>
              Explore More → End to End Inspection Cell
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRECISION VISION AI SECTION (PDF Page 2 Bottom) */}
      <section className={styles.sectionPrecision}>
        <div className={styles.precisionGrid}>
          <div className={styles.precisionVisualBox}>
            <img
              src="/images/precision_mechanical_measurement.png"
              alt="Precision mechanical component with dimensional measurement overlays"
              className={styles.realImg}
            />
          </div>

          <div>
            <div className={styles.eyebrowGreen}>PRECISION + PERFORMANCE</div>
            <h2 className={styles.precisionTitle}>Precision Without Compromising Production Speed</h2>
            <p className={styles.precisionDesc}>
              Complex manufacturing applications often demand extremely tight tolerances. Our Vision AI systems are
              engineered around the required accuracy, resolution, repeatability and production cycle time — not simply
              around the choice of camera.
            </p>

            <div className={styles.statMetricsGrid}>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>[XX.X%]</span>
                <span className={styles.statMetricLabel}>Accuracy</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>[±X µm]</span>
                <span className={styles.statMetricLabel}>Repeatability</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>[XX sec]</span>
                <span className={styles.statMetricLabel}>Cycle Time</span>
              </div>
              <div className={styles.statMetricBox}>
                <span className={styles.statMetricVal}>[XXX /hr]</span>
                <span className={styles.statMetricLabel}>Throughput</span>
              </div>
            </div>

            <FlowChain nodes={precisionNodes} />

            <div style={{ marginTop: '28px' }}>
              <Link href="/case-studies/precision-vision-ai-setup" className={styles.btnPrimary}>
                Explore Precision Vision AI Setup →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISION AI IN ACTION / SUCCESS STORIES (PDF Page 3) */}
      <section id="case-studies" className={styles.sectionCaseStudies}>
        <h2 className={styles.csMainTitle}>Vision AI in Action</h2>

        {/* Featured Success Story: UV Light-Based Inspection (Copied from Home Page Machine Vision Solution) */}
        <div className={styles.featuredCsCard}>
          <div className={styles.csVisualBox}>
            <img
              src="/images/uv_light_defect_detection.png"
              alt="UV Light-Based Inspection"
              className={styles.realImg}
            />
          </div>

          <div>
            <div className={styles.csFeaturedTag}>FEATURED SUCCESS STORY</div>
            <h3 className={styles.csFeaturedTitle}>UV Light-Based Inspection</h3>
            <h4 className={styles.csSubtitle}>
              Transforming Manufacturing Quality with Visual Intelligence — Powered by AI
            </h4>

            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Industry — </span>Manufacturing · Quality Inspection
            </p>
            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Challenge — </span>Micro-crack &amp; surface defect detection at line speed
            </p>
            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Solution — </span>UV Camera + AI + Lighting + Fixture + Automation
            </p>
            <p className={styles.csDetailRow}>
              <span className={styles.csDetailLabel}>Outcome — </span>Verified real-time zero-defect inspection
            </p>

            <p className={styles.csBodyPara}>
              Specialized ultraviolet illumination coupled with high-resolution vision models for micro-crack detection
              and surface integrity inspection. IdentifYou uses Visual Intelligence and AI to help manufacturers
              continuously understand what is happening on the production line, identify quality risks and turn visual
              information into real-time operational decisions — detecting defects, verifying processes, identifying
              deviations and enabling automated decisions in real time.
            </p>
            <p className={styles.csBodyPara}>
              By engineering AI-driven visual inspection into the manufacturing process, quality control can move from
              a reactive cost centre to a proactive capability that improves quality, reduces waste, strengthens
              process control and drives operational performance.
            </p>

            <div className={styles.csStatBadges}>
              <span className={styles.csStatBadge}>Inspection Accuracy</span>
              <span className={styles.csStatBadge}>Cycle Time</span>
              <span className={styles.csStatBadge}>Throughput</span>
              <span className={styles.csStatBadge}>Manual Inspection Reduction</span>
            </div>

            <Link href="/case-studies/advanced-vision-inspection-surface" className={styles.btnPrimary}>
              View Vision AI Success Story →
            </Link>
          </div>
        </div>

        {/* 6. THREE SUCCESS STORY CARDS (PDF Page 3) */}
        <div className={styles.csThreeGrid}>
          {threeCaseStudies.map((cs) => (
            <div key={cs.title} className={styles.csCard}>
              <div>
                <div className={styles.csGridTag}>{cs.tag}</div>
                <h3 className={styles.csGridTitle}>{cs.title}</h3>
                <p className={styles.csDesc}>{cs.desc}</p>
              </div>
              <Link
                href={cs.url}
                className={styles.csLink}
              >
                View Vision AI Success Story →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FROM VISION INSPECTION TO PRODUCTION-READY AUTOMATION (PDF Page 3 Bottom - Dark Section) */}
      <section className={styles.sectionDarkDifference}>
        <div className={styles.darkDiffCard}>
          <div className={styles.eyebrowGreen}>THE DIFFERENCE</div>
          <h2 className={styles.darkCellTitle}>From Vision Inspection to Production-Ready Automation</h2>
          <p className={styles.darkDiffDesc}>
            Industrial inspection is not just about seeing a defect. It is about reliably inspecting the right feature,
            at the right accuracy, at production speed — and automatically acting on the result.
          </p>

          <div style={{ marginBottom: '32px' }}>
            <FlowChain nodes={topSenseFlow} />
          </div>

          <div className={styles.stackedFlowGrid}>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>1. Advanced Imaging</div>
              <div className={styles.stackedSub}>2D · 3D · UV · Thermal</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>2. AI &amp; Vision Intelligence</div>
              <div className={styles.stackedSub}>Detection · Classification · Anomaly Detection · Measurement</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>3. Precision Engineering</div>
              <div className={styles.stackedSub}>Fixtures · Nests · Tooling · Positioning</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>4. Industrial Automation</div>
              <div className={styles.stackedSub}>Conveyors · Robots · Pick &amp; Place · PLC · Sorting</div>
            </div>
            <div className={styles.stackedFlowBlock}>
              <div className={styles.stackedTitle}>5. Production Deployment</div>
              <div className={styles.stackedSub}>Cycle Time · Throughput · Integration · Commissioning</div>
            </div>
          </div>

          <p className={styles.diffSummaryQuote}>
            From a proof-of-concept on the lab bench to a production-ready inspection cell on the factory floor.
          </p>
        </div>
      </section>

      {/* 8. VISION AI POINT OF VIEW (PDF Page 4 Top) */}
      <section className={styles.sectionPov}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>VISION AI POINT OF VIEW</div>

          <div className={styles.povThreeGrid}>
            <div className={styles.povCard}>
              <div>
                <div className={styles.povImgBox}>
                  <img
                    src="/images/threed_component_profiling.png"
                    alt="3D-scanned component with dimensional overlays"
                    className={styles.realImg}
                  />
                </div>
                <h3 className={styles.povTitle}>Why 3D Profiling Is Transforming Industrial Inspection</h3>
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
                <span className={styles.placeholderBadge}>[Future Vision AI POV]</span>
                <h3 className={styles.povTitle}>[Future Vision AI POV]</h3>
                <p className={styles.povDesc}>[Teaser pending]</p>
              </div>
              <Link href="/blogs-and-news" className={styles.csLink}>
                Read the POV →
              </Link>
            </div>

            <div className={styles.povCard}>
              <div>
                <span className={styles.placeholderBadge}>[Future Vision AI POV]</span>
                <h3 className={styles.povTitle}>[Future Vision AI POV]</h3>
                <p className={styles.povDesc}>[Teaser pending]</p>
              </div>
              <Link href="/blogs-and-news" className={styles.csLink}>
                Read the POV →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TECHNOLOGY & PARTNERSHIP ECOSYSTEM (PDF Page 4 Middle) */}
      <section className={styles.sectionPartners}>
        <div className={styles.eyebrowGreen}>TECHNOLOGY &amp; PARTNERSHIP ECOSYSTEM</div>
        <h2 className={styles.csMainTitle}>Powered by the Right Technology Ecosystem</h2>
        <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#5B6862' }}>
          Production-grade Vision AI requires the right combination of cameras, sensors, optics, lighting, computing,
          automation and industrial engineering.
        </p>

        <div className={styles.partnersGrid}>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>[Basler Cameras]</h3>
            <p className={styles.partnerDesc}>
              [Partnership / technology description — pending confirmation]
            </p>
          </div>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>[Partner Name]</h3>
            <p className={styles.partnerDesc}>
              [Technology / capability — pending confirmation]
            </p>
          </div>
          <div className={styles.partnerCard}>
            <h3 className={styles.partnerTitle}>[Partner Name]</h3>
            <p className={styles.partnerDesc}>
              [Technology / capability — pending confirmation]
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA (PDF Page 4 Bottom) */}
      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>
            Ready to See What Your Inspection Process Is Missing?
          </h2>
          <Link href="/contact" className={styles.btnPrimary}>
            Talk to a Vision AI Expert
          </Link>
        </div>
      </section>

      {/* 11. LATEST NEWS & INSIGHTS (PDF Page 5 Top) */}
      <section className={styles.sectionNews}>
        <div className={styles.eyebrowGreen}>LATEST NEWS &amp; INSIGHTS</div>

        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <div>
              <div className={styles.newsTag}>NEWS</div>
              <h3 className={styles.newsTitle}>[News Article]</h3>
              <p className={styles.newsDesc}>[Short description]</p>
            </div>
            <Link href="/blogs-and-news" className={styles.csLink}>
              Read More →
            </Link>
          </div>

          <div className={styles.newsCard}>
            <div>
              <div className={styles.newsTag}>BLOG</div>
              <h3 className={styles.newsTitle}>[Vision AI Blog]</h3>
              <p className={styles.newsDesc}>[Short description]</p>
            </div>
            <Link href="/blogs-and-news" className={styles.csLink}>
              Read More →
            </Link>
          </div>

          <div className={styles.newsCard}>
            <div>
              <div className={styles.newsTag}>INSIGHT</div>
              <h3 className={styles.newsTitle}>[Industry Insight]</h3>
              <p className={styles.newsDesc}>[Short description]</p>
            </div>
            <Link href="/blogs-and-news" className={styles.csLink}>
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FOOTER (PDF Page 5 Bottom) */}
      <Footer />
    </div>
  )
}
