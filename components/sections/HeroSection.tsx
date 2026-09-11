'use client'

import React from 'react'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  badge?: string
  headline1?: string
  headline2?: string
  subheading?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

const businessFirstSteps = [
  { n: '01', title: 'Understand', sub: 'Business objective' },
  { n: '02', title: 'Discover', sub: 'Process & operational challenges' },
  { n: '03', title: 'Engineer', sub: 'Right technology architecture' },
  { n: '04', title: 'Integrate', sub: 'Enterprise + operational ecosystem' },
]

export function HeroSection({
  badge = '',
  headline1 = 'Deep Tech.',
  headline2 = 'Built Around Business.',
  subheading = 'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses.',
  description = 'IdentifYou engineers AI-powered, connected and intelligent solutions using Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
  buttonLabel = 'Discover More',
  buttonHref = '#case-studies',
}: HeroSectionProps) {
  const handleScrollToCaseStudies = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonHref.startsWith('#')) {
      e.preventDefault()
      const targetId = buttonHref.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className={styles.hero}>
      {/* Background overlay */}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.card}>
          {badge && <div className={styles.badge}>{badge}</div>}
          <h1 className={styles.headline}>
            {headline1} <span className={styles.headlineAccent}>{headline2}</span>
          </h1>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
          <p className={styles.description}>{description}</p>
        </div>

        {/* Bottom Action Row: Discover More Button + 4 Process Steps in the SAME line */}
        <div className={styles.heroBottomRow}>
          <div className={styles.buttons}>
            <a href={buttonHref} onClick={handleScrollToCaseStudies} className={styles.btnPrimary}>
              {buttonLabel}
            </a>
          </div>

          <div className={styles.processStepsHorizontal}>
            {businessFirstSteps.map((step, idx) => (
              <div key={step.n} className={styles.processStepHorizWrap}>
                <div className={styles.processStepHoriz}>
                  <span className={styles.stepBadgeHoriz}>{step.n}</span>
                  <h3 className={styles.stepNameHoriz}>{step.title}</h3>
                  <p className={styles.stepSubHoriz}>{step.sub}</p>
                </div>
                {idx < businessFirstSteps.length - 1 && (
                  <span className={styles.stepArrowHoriz}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
