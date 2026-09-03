import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Vision AI — AI-Powered Visual & Dimensional Inspection',
  description: 'IdentifYou combines industrial cameras, computer vision, image processing and AI to automatically inspect and measure manufactured components.',
}

const useCases = ['Visual defect detection', 'Dimensional measurement', 'Surface inspection', 'Component verification', 'Assembly inspection', 'OCR / OCV', 'Presence / absence', 'Quality classification']
const arch = ['Basler Camera', 'Image Acquisition', 'Image Processing', 'Computer Vision / CNN', 'AI Model', 'Dimensional Measurement', 'Quality Decision', 'MES / Quality System']

export default function VisionAIPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.heroGrid}>
        <div>
          <div className={styles.eyebrow}>Deep Tech — 01</div>
          <h1 className={styles.title}>See More. Measure Precisely. Decide Faster.</h1>
          <p className={styles.subtitle}>AI-Powered Visual & Dimensional Inspection</p>
          <p className={styles.desc}>
            IdentifYou combines industrial cameras, computer vision, image processing and AI to automatically
            inspect and measure manufactured components.
          </p>
        </div>
        <div className={styles.heroImg}>
          <div className={styles.imgPlaceholder} style={{ aspectRatio: '1/1', borderRadius: '14px' }} />
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.labelRow}>Use Cases</div>
        <div className={styles.tagGrid}>
          {useCases.map((u) => <span key={u} className={styles.tag}>{u}</span>)}
        </div>

        <div className={styles.labelRow}>Technology Architecture</div>
        <div className={styles.archBox}>
          <FlowChain nodes={arch} />
        </div>

        <CTABlock
          headline="Business Challenge → Solution → Deep Tech → Outcome"
          description={undefined}
          buttonLabel="Explore Automated Inspection"
          buttonHref="/contact"
        />
        <div className={styles.ctaDetails}>
          <div><span className={styles.detailLabel}>Challenge — </span><span>Manual inspection is slow, subjective and inconsistent.</span></div>
          <div><span className={styles.detailLabel}>Solution — </span><span>Automated visual and dimensional inspection at line speed.</span></div>
          <div><span className={styles.detailLabel}>Deep Tech — </span><span>Computer Vision + CNN / Deep Learning.</span></div>
          <div><span className={styles.detailLabel}>Technology — </span><span className={styles.detailTech}>Basler Cameras + OpenCV + Python + AI/ML Models</span></div>
          <div><span className={styles.detailLabel}>Outcome — </span><span>Faster, more consistent quality inspection.</span></div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
