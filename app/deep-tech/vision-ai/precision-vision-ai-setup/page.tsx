import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Precision Vision AI Setup | IdentifYou Tech',
  description:
    'Detailed technical specifications, optical calibration, lighting geometry, and measurement accuracy standards for precision Vision AI installations.',
}

const setupFlow = [
  'Optical Calibration',
  'Lighting Geometry',
  'Sub-Pixel Edge Detection',
  'AI Model Inferencing',
  'Tolerance Verification',
  'Automated Action Signal',
]

export default function PrecisionVisionAISetupPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroCard}>
          <div>
            <div className={styles.eyebrowGreen}>SUPPORTING DOCUMENTATION</div>
            <h1 className={styles.heroTitle}>Precision Vision AI Setup</h1>
            <p className={styles.heroDesc}>
              A deep-dive technical specification covering sub-micron optical calibration, lighting selection, lens
              distortion correction, and closed-loop measurement verification.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                Request Optical Specifications
              </Link>
              <Link href="/deep-tech/vision-ai" className={styles.btnSecondary}>
                ← Back to Vision AI Overview
              </Link>
            </div>
          </div>

          <div className={styles.heroVisualBox}>
            <img
              src="/images/precision_mechanical_measurement.png"
              alt="Precision Vision AI Setup"
              className={styles.realImg}
            />
          </div>
        </div>
      </section>

      <section className={styles.sectionPrecision}>
        <div className={styles.containerNarrow}>
          <div className={styles.eyebrowGreen}>OPTICAL ARCHITECTURE</div>
          <h2 className={styles.precisionTitle}>Precision Measurement &amp; Calibration Cycle</h2>
          <FlowChain nodes={setupFlow} />

          <div className={styles.statMetricsGrid} style={{ marginTop: '36px' }}>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>Sub-Pixel</span>
              <span className={styles.statMetricLabel}>Edge Accuracy</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>Telecentric</span>
              <span className={styles.statMetricLabel}>Lens Geometry</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>0.01 mm</span>
              <span className={styles.statMetricLabel}>Resolution</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>Real-Time</span>
              <span className={styles.statMetricLabel}>SPC Analytics</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.csMainTitle} style={{ color: '#FFFFFF', marginBottom: '20px' }}>
            Have Tight Measurement Tolerances on Your Line?
          </h2>
          <Link href="/contact" className={styles.btnPrimary}>
            Consult with a Vision Optics Specialist
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
