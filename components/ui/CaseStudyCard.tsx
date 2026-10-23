'use client'

import React from 'react'
import Link from 'next/link'
import styles from './CaseStudyCard.module.css'
import { getCategoryTheme } from '@/lib/caseStudyCategories'

function cleanHeadingText(text: string): string {
  if (!text) return text
  return text.replace(/^(?:0?\d{1,2}\s*[—–\-.:)]\s*|0\d\s+)/, '').trim()
}

export type CaseStudyCardProps = {
  slug?: string
  title: string
  tag?: string
  industry?: string
  category?: {
    id: number | string
    name: string
    slug: string
  }
  categories?: string[]
  illustration?: string
  image?: string
  href?: string
  className?: string
  aspectRatio?: string
  isExternal?: boolean
}

export function CaseStudyCard({
  slug,
  title,
  tag,
  industry,
  category,
  categories,
  illustration,
  image,
  href,
  className,
  aspectRatio,
  isExternal = false,
}: CaseStudyCardProps) {
  const svgSlugs = [
    'advanced-vision-inspection-surface',
    'vision-ai-bore-measurement',
    'vision-ai-complex-dimension',
    'business-driven-software-system',
    'nlp-text-to-business-application',
    'data-to-application-development',
    'business-portals-around-existing-erp',
    'deployment-management',
  ]
  const isSvg = slug && svgSlugs.includes(slug)
  const imageSrc =
    illustration ||
    image ||
    (slug
      ? isSvg
        ? `/images/case-studies/${slug}.svg`
        : `/images/case-studies/thumbnails/${slug}.webp`
      : '/images/case-studies/placeholder.png')

  const linkHref = href || (slug ? `/case-studies/${slug}` : '/case-studies')

  const theme = getCategoryTheme({
    slug,
    categorySlug: category?.slug,
    categoryName: category?.name,
    categories,
    tag,
    industry,
    title,
    href: linkHref,
  })

  // Clean industry/tag string: Authoritative category takes primary precedence
  let rawTag =
    category?.name ||
    industry ||
    (categories && categories.length > 0 ? categories[0] : tag) ||
    theme.name

  if (rawTag.includes('http://') || rawTag.includes('https://')) {
    rawTag = (categories && categories.find((c) => !c.includes('http'))) || theme.name
  }

  if (rawTag.includes('FUNCTION:')) {
    rawTag = rawTag.split('FUNCTION:')[0].trim()
  }
  if (rawTag.includes('FOCUS:')) {
    rawTag = rawTag.split('FOCUS:')[0].trim()
  }
  if (rawTag.length > 40) {
    rawTag = rawTag.substring(0, 40).trim()
  }

  const industryText = rawTag.toUpperCase().startsWith('INDUSTRY:')
    ? rawTag.toUpperCase()
    : `INDUSTRY: ${rawTag.toUpperCase()}`

  const cardContent = (
    <>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={title}
          width="600"
          height="338"
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            if (slug && !target.src.endsWith(`/${slug}.png`)) {
              target.src = `/images/case-studies/${slug}.png`
            } else {
              target.src = '/images/case-studies/placeholder.png'
            }
          }}
        />
        <div
          className={styles.colorTintLayer}
          style={{ backgroundColor: theme.tintColor, opacity: theme.overlayOpacity }}
        />
        <div
          className={styles.colorGradientLayer}
          style={{ background: theme.gradientCss }}
        />
      </div>
      
      {/* Bottom Gradient overlay with Industry Tag and Title */}
      <div className={styles.bottomGradient}>
        <div className={styles.industryTag} style={{ color: theme.tagColor }}>
          {industryText}
        </div>
        <h3 className={styles.title}>{cleanHeadingText(title)}</h3>
      </div>

      {/* Hover Dark Semi-transparent Overlay */}
      <div className={styles.overlay} />

      {/* Centered Solid Circle Arrow + "Read Case Study" Text */}
      <div className={styles.centerContent}>
        <div className={styles.iconCircle} style={{ backgroundColor: theme.tintColor }}>
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <span className={styles.readText}>Read Case Study</span>
      </div>
    </>
  )

  const combinedClassName = `${styles.card} ${className || ''}`
  const customStyle = aspectRatio ? { aspectRatio } : undefined

  if (isExternal || linkHref.startsWith('http')) {
    return (
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        style={customStyle}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={linkHref} className={combinedClassName} style={customStyle}>
      {cardContent}
    </Link>
  )
}
