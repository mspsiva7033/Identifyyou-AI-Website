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
      { label: 'Industry Automation', href: '/deep-tech/industry-automation' },
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
    setOpenDropdown(prev => (prev === key ? null : key))
  }

  const cta = ctaButton || { label: 'Talk to an Expert', href: '/contact' }
  const brand = logo || { brandName: 'IdentifYou', tagline: 'Technologies', href: '/' }

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        <Link href={brand.href} className={styles.logo}>
          <span className={styles.logoName}>{brand.brandName}</span>
          <span className={styles.logoTag}>{brand.tagline}</span>
        </Link>

        {!isMobile && (
          <>
            <nav className={styles.nav}>
              {navItems.map((item) => {
                const key = item.label
                return (
                  <div key={key} className={styles.navItem}>
                    <a
                      href={item.subItems ? undefined : item.href}
                      onClick={item.subItems ? (e) => toggleDropdown(key, e) : undefined}
                      className={styles.navLink}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.label}
                      {item.subItems && <span className={styles.chevron}>▾</span>}
                    </a>
                    {item.subItems && openDropdown === key && (
                      <div className={styles.dropdown}>
                        {item.subItems.map((sub) => (
                          <Link key={sub.href} href={sub.href} className={styles.dropdownItem}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
            <Link href={cta.href} className={styles.ctaBtn}>
              {cta.label}
            </Link>
          </>
        )}

        {isMobile && (
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {isMobile && mobileOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.mobileGroup}>
              <a href={item.href} className={styles.mobileLink}>
                {item.label}
              </a>
              {item.subItems?.map((sub) => (
                <Link key={sub.href} href={sub.href} className={styles.mobileSubLink}>
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href={cta.href} className={styles.mobileCta}>
            {cta.label}
          </Link>
        </div>
      )}
    </header>
  )
}
