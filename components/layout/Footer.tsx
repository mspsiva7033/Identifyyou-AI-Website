import Link from 'next/link'
import styles from './Footer.module.css'

type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

type FooterProps = {
  brand?: { name: string; tagline: string }
  columns?: FooterColumn[]
  contact?: { email: string; phone: string; indiaAddress?: string; ukAddress?: string }
  copyright?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Deep Tech',
    links: [
      { label: 'Vision AI', href: '/deep-tech/vision-ai' },
      { label: 'AI & Intelligent Business', href: '/deep-tech/ai-intelligent-business' },
      { label: 'AI-Powered No-Code', href: '/deep-tech/ai-no-code' },
      { label: 'Smart Factory', href: '/case-studies' },
      { label: 'Industry Automation', href: '/deep-tech/industry-automation' },
      { label: 'Data Engineering', href: '/deep-tech/data-engineering' },
      { label: 'Digital Engineering', href: '/deep-tech/digital-engineering' },
    ],
  },
  {
    title: 'Manufacturing',
    links: [
      { label: 'Manufacturing', href: '/manufacturing' },
      { label: 'Industrial Robots', href: '/industrial-robots' },
      { label: 'Smart Factory', href: '/case-studies' },
      { label: 'Vision Inspection', href: '/case-studies' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Manufacturing', href: '/manufacturing' },
      { label: 'Industrial Robots', href: '/industrial-robots' },
      { label: 'Financial Services & FinTech', href: '/contact' },
      { label: 'Healthcare', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Success Stories', href: '/case-studies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer({
  brand,
  columns = defaultColumns,
  contact,
  copyright,
}: FooterProps) {
  const b = brand || { name: 'IdentifYou Technologies', tagline: 'Deep Tech. Built Around Business.' }
  const c = contact || { email: 'Support@identifyou.in', phone: '+91 9597046682' }
  const copy = copyright || '© 2026 IdentifYou Technologies. All rights reserved.'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src="/images/identifYou_logo.png" alt="IdentifYou" style={{ height: '44px', width: 'auto', marginBottom: '8px' }} />
            <div className={styles.brandTag}>{b.tagline}</div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <div className={styles.colTitle}>{col.title}</div>
              <div className={styles.colLinks}>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className={styles.colLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.column}>
            <div className={styles.colTitle}>Contact</div>
            <div className={styles.colLinks}>
              <Link href="/contact" className={styles.colLink}>Talk to a Deep Tech Expert</Link>
              <span className={styles.colText}>{c.email}</span>
              <span className={styles.colText}>{c.phone}</span>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>{copy}</div>
      </div>
    </footer>
  )
}
