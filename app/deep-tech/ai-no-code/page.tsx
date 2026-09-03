import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI-Powered No-Code Platform — Describe It. Build It. Run It.',
  description: 'Build intelligent business applications by describing what your business needs — in business language.',
}

const journey = ['Business User', 'Describe Business Requirement', 'AI Understands', 'Application / Workflow Generated', 'Configure', 'Deploy', 'Run as Business Application / SaaS']
const highlights = ['Business-language-driven application creation', 'AI-assisted development', 'No-code configuration', 'Workflow automation', 'Data integration', 'Role-based applications', 'SaaS capability', 'Reduced dependency on traditional development']

export default function AINoCodePage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Deep Tech — 03</div>
        <h1 className={styles.title}>AI-Powered No-Code Platform</h1>
        <p className={styles.desc}>Build intelligent business applications by describing what your business needs — in business language.</p>
      </section>
      <section className={styles.content}>
        <div className={styles.journeyBox}>
          <div className={styles.journeyLabel}>Conceptual Journey</div>
          <FlowChain nodes={journey} direction="vertical" />
        </div>
        <div className={styles.hlLabel}>Highlights</div>
        <div className={styles.hlGrid}>
          {highlights.map((h) => <span key={h} className={styles.hlTag}>{h}</span>)}
        </div>
        <p className={styles.disclaimer}>Claims such as &ldquo;zero IT required&rdquo; are used only where verified for a specific implementation.</p>
        <CTABlock
          headline="Build Your First Intelligent Business Application"
          buttonLabel="Talk to an Expert"
          buttonHref="/contact"
        />
      </section>
      <Footer />
    </div>
  )
}
