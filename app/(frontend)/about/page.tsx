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

import { getLeadershipTeam, getAboutThankYouData } from '@/lib/payload'

export default async function AboutPage() {
  const leadershipTeam = await getLeadershipTeam()
  const thankYouData = await getAboutThankYouData()
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <h1 className={styles.title}>About IdentifYou Technologies</h1>
        <p className={styles.subtitle}>Deep Tech. Built Around Business.</p>
        <p className={styles.desc}>
          We don't start with technology. We start with the business problem, operational challenge or growth opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution around it.
        </p>
      </section>

      <section className={styles.content}>
        {/* <div style={{ maxWidth: '840px', margin: '0 auto 48px', color: '#475569', fontSize: '16px', lineHeight: 1.7 }}>
          <p style={{ marginBottom: '16px' }}>
            We work alongside plant managers, operations leaders, and digital transformation teams. Our focus spans high-precision manufacturing, supply chain logistics, financial services, and healthcare systems. Our multidisciplinary engineering team develops custom computer vision cells, edge IoT gateways, automated replenishment algorithms, and cloud data platforms.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Every deployment begins with clear operational metrics. We eliminate inspection bottlenecks on high-speed assembly lines. We reconcile inventory balances in real time. We automate equipment telemetry across multi-vendor industrial networks. Our engineers prioritize system reliability, sub-second latency, and measurable business returns.
          </p>
          <p style={{ margin: 0 }}>
            By fusing operational technology on the shop floor with enterprise cloud systems, we turn routine machine signals into competitive advantages. Our client engagements deliver reduced scrap, faster production cycles, and dependable operational transparency.
          </p>
          <p style={{ marginTop: '16px' }}>
            Our goal is straightforward: build reliable tools that help teams work smarter. We partner closely with your staff to solve day-to-day challenges and generate measurable cost savings.
          </p>
        </div> */}

        {/* ── Leadership Team Section ────────────────────────────── */}
        <section className={styles.leadershipSection}>
          <div className={styles.leadershipHeader}>
            <span className={styles.leadershipCategory}>DATA &amp; AI INNOVATION</span>
            <h2 className={styles.leadershipTitle}>Leadership Team</h2>
          </div>

          <div className={styles.leadershipGrid}>
            {leadershipTeam.map((member) => (
              <div key={member.name} className={styles.memberCard}>
                <div className={styles.imagePlaceholder}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.memberPhoto}
                    />
                  ) : (
                    <>
                      <span className={styles.placeholderBadge}>{member.initials}</span>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                      <span className={styles.placeholderHint}>Photo Placeholder</span>
                    </>
                  )}
                </div>

                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <div className={styles.memberRole}>{member.role}</div>
                  <div className={styles.memberExp}>{member.experience}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2 className={styles.h2Center}>Why Leading Enterprises Partner with IdentifYou</h2>
        <div className={styles.differGrid}>
          {differentiators.map((d) => (
            <div key={d.title} className={styles.differCard}>
              <div className={styles.differTitle}>{d.title}</div>
              <p className={styles.differDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Thank You / Global Presence Section (Seamless, No Card UI) ────────────────── */}
        {/* <section className={styles.thankYouSection} aria-label="Thank You and Office Locations">
          <h2 className={styles.thankYouTitle}>{thankYouData.title}</h2>

          <div className={styles.thankYouContactRow}>
            <a
              href={thankYouData.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItemLink}
            >
              {thankYouData.website}
            </a>
            <span className={styles.contactSeparator} aria-hidden="true">·</span>
            <a
              href={`mailto:${thankYouData.email}`}
              className={styles.contactItemLink}
            >
              {thankYouData.email}
            </a>
            <span className={styles.contactSeparator} aria-hidden="true">·</span>
            <a
              href={`tel:${thankYouData.phone.replace(/[\s-]/g, '')}`}
              className={styles.contactItemLink}
            >
              {thankYouData.phone}
            </a>
          </div>

          <div className={styles.officesGrid}>
            {thankYouData.offices.map((office) => (
              <div key={office.label} className={styles.officeColumn}>
                <h3 className={styles.officeLabel}>{office.label}</h3>
                <div className={styles.officeAddress}>
                  {office.lines.map((line, idx) => (
                    <p key={idx} className={styles.officeAddressLine}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle} style={{ color: '#0F172A', display: 'block', visibility: 'visible', opacity: 1 }}>
            Ready to Transform Your Business?
          </h2>
          <p className={styles.ctaDesc} style={{ color: '#475569', display: 'block', visibility: 'visible', opacity: 1 }}>
            Talk to our team of deep tech experts to discover how AI and automation can elevate your operational performance.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>Talk to an Expert</Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
