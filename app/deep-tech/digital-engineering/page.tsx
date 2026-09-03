import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Digital Engineering — Engineer Digital Products That Solve Real Business Problems',
  description: 'Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling. Built around the workflow, not the other way around.',
}

const capabilities = [
  'Enterprise Web Applications',
  'SaaS Platform Engineering',
  'Mobile Applications',
  'API Design & Integration',
  'Workflow Automation',
  'Cloud Engineering (Azure / AWS)',
  'Application Modernization',
  'Microservices Architecture',
]

const techStack = ['Python', 'Node.js', 'React.js', 'Next.js', 'TypeScript', 'Azure', 'AWS', 'PostgreSQL', 'REST / GraphQL APIs']

export default function DigitalEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Deep Tech — 06</div>
        <h1 className={styles.title}>Engineer Digital Products That Solve Real Business Problems.</h1>
        <p className={styles.desc}>Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling — built around the workflow, not the other way around.</p>
      </section>
      <section className={styles.content}>
        <div className={styles.capGrid}>
          {capabilities.map((c) => <span key={c} className={styles.capTag}>{c}</span>)}
        </div>
        <div className={styles.techBox}>
          <div className={styles.techLabel}>Technology Stack</div>
          <div className={styles.techGrid}>
            {techStack.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
          </div>
        </div>
        <div className={styles.checkList}>
          <div className={styles.checkItem}>✓ Enterprise applications and SaaS platforms</div>
          <div className={styles.checkItem}>✓ Workflow automation and API integration</div>
          <div className={styles.checkItem}>✓ Cloud engineering on Azure and AWS</div>
        </div>
        <CTABlock headline="Build Your Digital Product" description="Tell us the problem — we'll engineer the right digital solution around it." buttonLabel="Talk to an Expert" buttonHref="/contact" />
      </section>
      <Footer />
    </div>
  )
}
