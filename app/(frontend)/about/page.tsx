import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Us — Deep Tech Built Around Business',
  description: 'IdentifYou Technologies engineers AI-powered, connected and intelligent solutions across Manufacturing, Supply Chain, Financial Services and Healthcare.',
}

const differentiators = [
  { title: 'Business First', desc: 'We understand the business before designing technology.' },
  { title: 'Deep Tech', desc: 'We engineer solutions using AI, Vision AI, IIoT, Edge and Automation.' },
  { title: 'Manufacturing Expertise', desc: 'We understand real-world factory operations, not just IT systems.' },
  { title: 'Integrated Supply Chain', desc: 'We connect procurement, inventory, manufacturing, logistics and enterprise systems.' },
  { title: 'End-to-End Engineering', desc: 'From machine and edge to cloud, data, AI and enterprise applications.' },
  { title: 'Outcome Driven', desc: 'We measure success through business impact.' },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.title}>About IdentifYou Technologies</h1>
        <p className={styles.subtitle}>Deep Tech. Built Around Business.</p>
        <p className={styles.desc}>
          We don&apos;t start with technology. We start with the business problem, operational challenge or growth opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution around it.
        </p>
      </section>

      <section className={styles.content}>
        <h2 className={styles.h2Center}>Why IdentifYou?</h2>
        <div className={styles.differGrid}>
          {differentiators.map((d) => (
            <div key={d.title} className={styles.differCard}>
              <div className={styles.differTitle}>{d.title}</div>
              <p className={styles.differDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
          <p className={styles.ctaDesc}>Talk to our team of deep tech experts to discover how AI and automation can elevate your operational performance.</p>
          <Link href="/contact" className={styles.ctaBtn}>Talk to an Expert</Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
