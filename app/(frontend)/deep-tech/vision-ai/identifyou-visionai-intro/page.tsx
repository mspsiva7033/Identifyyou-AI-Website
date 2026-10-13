import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../page.module.css'

export const metadata: Metadata = {
  title: 'Vision AI Architecture & Intro',
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
            From high-speed camera acquisition and custom optical lighting to edge AI model deployment and closed-loop PLC actuation, IdentifYou engineers production-grade systems built around your line speed and accuracy targets.
          </p>
          <p className={styles.precisionDesc} style={{ marginTop: '16px' }}>
            Traditional computer vision depends on brittle rule-based filters that fail when ambient lighting shifts or minor surface scratches appear. Our deep learning vision models learn nuanced defect morphology across thousands of production samples. Sub-millimeter surface scratches, dimensional burrs, pinholes, and assembly misalignment are categorized within milliseconds at full line velocity.
          </p>
          <p className={styles.precisionDesc} style={{ marginTop: '16px' }}>
            Edge compute controllers run optimized TensorRT inference engines on local hardware, completely decoupled from internet dependency. When an anomaly is detected, high-speed industrial I/O signals trigger automated reject gates or diverters before defective parts reach downstream assembly steps.
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
