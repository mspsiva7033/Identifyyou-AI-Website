import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Us — Deep Tech Engineering',
  description:
    'Learn how IdentifYou engineers AI, Vision AI, industrial automation, and enterprise data systems built around real business problems.',
  alternates: {
    canonical: '/about',
  },
}

const differentiators = [
  { title: 'Business First', desc: 'We understand the commercial priority before designing any technical solution.' },
  { title: 'Deep Tech Architecture', desc: 'We engineer solutions with Vision AI, IIoT sensors, edge computing, and real-time models.' },
  { title: 'Factory Floor Expertise', desc: 'We understand physical assembly lines and machine controls, not just software layers.' },
  { title: 'Integrated Operations', desc: 'We unify procurement, warehouse stock, shop-floor MES, and enterprise ERP systems.' },
  { title: 'Full-Stack Delivery', desc: 'From hardware sensors and edge gateways to data lakehouses and user interfaces.' },
  { title: 'Measurable ROI', desc: 'We measure success through reduced cycle times, lower scrap, and tangible productivity gains.' },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.title}>About IdentifYou Technologies</h1>
        <p className={styles.subtitle}>Deep Tech. Built Around Business.</p>
        <p className={styles.desc}>
          IdentifYou was founded to solve a simple problem: technology is often built in isolation from the business outcomes it needs to deliver. We bridge that gap by designing industrial intelligence directly around physical operations and enterprise workflows.
        </p>
      </section>

      <section className={styles.content}>
        <div style={{ maxWidth: '840px', margin: '0 auto 48px', color: '#475569', fontSize: '16px', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '16px' }}>
            We work alongside plant managers, operations leaders, and digital transformation teams across manufacturing, supply chain, financial services, and healthcare. Our multidisciplinary engineering team develops custom computer vision cells, edge IoT gateways, automated replenishment algorithms, and cloud analytics.
          </p>
          <p style={{ margin: 0 }}>
            Every deployment begins with clear operational metrics. Whether eliminating inspection bottlenecks on high-speed assembly lines, reconciling inventory in real time, or automating equipment telemetry, our focus remains on reliability, speed, and clear business returns.
          </p>
        </div>

        <h2 className={styles.h2Center}>Why Leading Enterprises Partner with IdentifYou</h2>
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
