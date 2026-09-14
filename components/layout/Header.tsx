'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from './Header.module.css'

type SubItem = {
  label: string
  href: string
}

type NavItem = {
  label: string
  href: string
  subItems?: SubItem[]
}

type HeaderProps = {
  logo?: { brandName: string; tagline: string; href: string }
  navItems?: NavItem[]
  ctaButton?: { label: string; href: string }
}

const defaultNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Deep Tech',
    href: '/deep-tech',
    subItems: [
      { label: 'Vision AI', href: '/deep-tech/vision-ai' },
      { label: 'AI & Intelligent Business', href: '/deep-tech/ai-intelligent-business' },
      { label: 'AI-Powered No-Code Platform', href: '/deep-tech/ai-no-code' },
      { label: 'Data Engineering', href: '/deep-tech/data-engineering' },
      { label: 'Digital Engineering', href: '/deep-tech/digital-engineering' },
    ],
  },
  {
    label: 'Industries',
    href: '/manufacturing',
    subItems: [
      { label: 'Manufacturing', href: '/manufacturing' },
      { label: 'Industrial Robots', href: '/industrial-robots' },
      { label: 'Financial Services & FinTech', href: '/contact' },
      { label: 'Healthcare', href: '/contact' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blogs & News', href: '/blogs-and-news' },
]

const megaMenuData: Record<
  string,
  { title: string; description: string; ctaText: string; ctaHref: string }
> = {
  'Deep Tech': {
    title: 'About Deep Tech',
    description:
      'We deliver excellence and create value for enterprise business and connected industries — turning complexity into opportunities and creating meaningful change with AI, Automation, Data, and Digital Engineering.',
    ctaText: 'Discover the difference →',
    ctaHref: '/deep-tech',
  },
  Industries: {
    title: 'Industry Solutions',
    description:
      'Domain-tailored deep tech solutions engineered for intelligent manufacturing, robotics, financial risk intelligence, and healthcare digital transformation.',
    ctaText: 'Explore industry solutions →',
    ctaHref: '/manufacturing',
  },
}

export function Header({ logo, navItems = defaultNav, ctaButton }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1060px)')
    const onChange = () => {
      setIsMobile(mq.matches)
      setMobileOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  const cta = ctaButton || { label: 'Talk to an Expert', href: '/contact' }
  const brand = logo || { brandName: 'IdentifYou', tagline: 'Technologies', href: '/' }

  const activeDropdownItem = navItems.find((item) => item.label === openDropdown)

  return (
    <header ref={headerRef} className={`${styles.header} ${openDropdown ? styles.headerExpanded : ''}`}>
      <div className={styles.inner}>
        <Link href={brand.href} className={styles.logo} onClick={() => setOpenDropdown(null)}>
          <img src="/images/identifYou_logo.png" alt="IdentifYou" className={styles.logoImg} />
        </Link>

        {!isMobile && (
          <>
            <nav className={styles.nav}>
              {navItems.map((item) => {
                const key = item.label
                const isOpen = openDropdown === key
                return (
                  <div key={key} className={styles.navItem}>
                    {item.subItems ? (
                      <button
                        onClick={(e) => toggleDropdown(key, e)}
                        className={`${styles.navLink} ${isOpen ? styles.navLinkOpen : ''}`}
                      >
                        <span>{item.label}</span>
                        <span className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}>
                          {isOpen ? '▲' : '▾'}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={styles.navLink}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>
            <Link href={cta.href} className={styles.ctaBtn} onClick={() => setOpenDropdown(null)}>
              {cta.label}
            </Link>
          </>
        )}

        {isMobile && (
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Expanded Navbar Panel */}
      {!isMobile && activeDropdownItem?.subItems && (
        <div className={styles.megaDrawer}>
          <div className={styles.megaInner}>
            <div className={styles.megaColLeft}>
              <h3 className={styles.megaTitle}>
                {megaMenuData[openDropdown!]?.title || openDropdown}
              </h3>
              <p className={styles.megaDesc}>
                {megaMenuData[openDropdown!]?.description ||
                  'Discover enterprise-grade deep tech solutions built around business.'}
              </p>
              <Link
                href={megaMenuData[openDropdown!]?.ctaHref || activeDropdownItem.href}
                className={styles.megaCtaLink}
                onClick={() => setOpenDropdown(null)}
              >
                {megaMenuData[openDropdown!]?.ctaText || 'Discover the difference →'}
              </Link>
            </div>

            <div className={styles.megaColRight}>
              <ul className={styles.megaList}>
                {activeDropdownItem.subItems.map((sub) => (
                  <li key={`${sub.label}-${sub.href}`} className={styles.megaListItem}>
                    <Link
                      href={sub.href}
                      className={styles.megaLink}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && mobileOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.mobileGroup}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
              {item.subItems?.map((sub) => (
                <Link
                  key={`${sub.label}-${sub.href}`}
                  href={sub.href}
                  className={styles.mobileSubLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href={cta.href}
            className={styles.mobileCta}
            onClick={() => setMobileOpen(false)}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </header>
  )
}
