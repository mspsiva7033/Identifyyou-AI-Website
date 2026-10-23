import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Vision AI Industrial Inspection',
  description:
    'An introduction to IdentifYou VisionAI capabilities, architectural approach, and AI-powered visual inspection solutions for modern manufacturing.',
  alternates: {
    canonical: '/deep-tech/vision-ai/identifyou-visionai-intro',
  },
}

export default function IdentifYouVisionAIIntroPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.sectionTopBanner}>
        <div className={styles.containerNarrow}>
          <div className={styles.topBannerTagLine}>SUPPORTING DOCUMENT</div>
          <h1 className={styles.topBannerTitle}>IdentifYou VisionAI Introduction</h1>
          <p className={styles.topBannerParagraph}>
            IdentifYou VisionAI is designed from the ground up to solve complex visual quality, measurement, and automated
            inspection challenges in high-speed, precision manufacturing environments.
          </p>
          <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '24px' }}>
            <Link href="/contact" className={styles.btnPrimary}>
              Talk to a Vision AI Expert
            </Link>
            <Link href="/deep-tech/vision-ai" className={styles.btnSecondary}>
              ← Back to Vision AI Overview
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionPrecision}>
        <div className={styles.containerNarrow}>
          <div className={styles.eyebrowGreen}>CORE CAPABILITIES</div>
          <h2 className={styles.precisionTitle}>End-to-End Visual Intelligence Architecture</h2>
          <p className={styles.precisionDesc}>
            IdentifYou engineers production-grade vision systems built for demanding factory environments. We handle optical lighting, high-speed camera acquisition, edge neural networks, and closed-loop PLC actuation.
          </p>
          <p className={styles.precisionDesc} style={{ marginTop: '16px' }}>
            Traditional computer vision relies on rigid threshold filters. These systems struggle when ambient light changes or minor surface scratches appear. Our deep learning models learn subtle defect patterns across thousands of samples. They categorize sub-millimeter scratches, dimensional burrs, pinholes, and misalignment in milliseconds.
          </p>
          <p className={styles.precisionDesc} style={{ marginTop: '16px' }}>
            Edge controllers run optimized inference engines locally without relying on internet connections. When an anomaly is detected, high-speed industrial I/O signals trigger automated reject gates immediately. Defective parts are diverted before reaching downstream assembly steps.
          </p>

          <div className={styles.statMetricsGrid} style={{ marginTop: '32px' }}>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>2D &amp; 3D</span>
              <span className={styles.statMetricLabel}>Imaging Modalities</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>Sub-MS</span>
              <span className={styles.statMetricLabel}>Edge AI Inference</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>PLC / OPC-UA</span>
              <span className={styles.statMetricLabel}>Factory Integration</span>
            </div>
            <div className={styles.statMetricBox}>
              <span className={styles.statMetricVal}>Zero Defect</span>
              <span className={styles.statMetricLabel}>Quality Assurance</span>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#12181B', marginBottom: '12px' }}>
              Four-Phase Vision AI Deployment Methodology
            </h3>
            <p className={styles.precisionDesc}>
              Every Vision AI installation follows a rigorous industrial deployment lifecycle. First, our optical engineers design specialized wavelength lighting and telecentric lens configurations. Second, we curate real production image datasets to train optimized convolutional networks. Third, deep learning models are quantized and compiled onto edge inference hardware such as NVIDIA Jetson or TensorRT runtimes. Finally, hardware I/O lines are wired directly to PLC safety relays to execute sub-second reject triggering.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionCta}>
        <div className={styles.ctaCardDark}>
          <h2 className={styles.ctaTitle}>Ready to Deploy Vision AI on Your Production Line?</h2>
          <Link href="/contact" className={styles.btnPrimary}>
            Get in Touch with Our Engineers
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
