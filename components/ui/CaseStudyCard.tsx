'use client'

import React from 'react'
import Link from 'next/link'
import styles from './CaseStudyCard.module.css'

export type CaseStudyCardProps = {
  slug?: string
  title: string
  tag?: string
  industry?: string
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
  ]
  const ext = slug && svgSlugs.includes(slug) ? 'svg' : 'png'
  const imageSrc =
    illustration ||
    image ||
    (slug ? `/images/case-studies/${slug}.${ext}` : '/images/case-studies/placeholder.png')

  const linkHref = href || (slug ? `/case-studies/${slug}` : '/case-studies')

  // Clean industry/tag string
  let rawTag = industry || (categories && categories.length > 0 ? categories[0] : tag) || 'AUTOMOTIVE & ENGINEERING'

  if (rawTag.includes('http://') || rawTag.includes('https://')) {
    rawTag = (categories && categories.find((c) => !c.includes('http'))) || 'DEEP TECH'
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
      <img src={imageSrc} alt={title} className={styles.image} loading="lazy" />
      
      {/* Bottom Gradient overlay with Industry Tag and Title */}
      <div className={styles.bottomGradient}>
        <div className={styles.industryTag}>{industryText}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {/* Hover Dark Semi-transparent Overlay */}
      <div className={styles.overlay} />

      {/* Centered Solid Green Circle Arrow + "Read Case Study" Text */}
      <div className={styles.centerContent}>
        <div className={styles.iconCircle}>
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
