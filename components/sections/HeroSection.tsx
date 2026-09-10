import Link from 'next/link'
import styles from './HeroSection.module.css'

type HeroSectionProps = {
  badge?: string
  headline1?: string
  headline2?: string
  subheading?: string
  description?: string
  primaryButtonLabel?: string
  primaryButtonHref?: string
  secondaryButtonLabel?: string
  secondaryButtonHref?: string
}

export function HeroSection({
  badge = 'Business First. Technology That Delivers.',
  headline1 = 'IdentifYou Engineers Smarter Businesses,',
  headline2 = 'Connected Industries and Intelligent Manufacturing',
  subheading = '',
  description = 'We bring together ML/AI, Vision AI, Industry Automation, No-Code, Data Engineering and Digital Engineering to transform business challenges into intelligent, connected and scalable solutions.',
  primaryButtonLabel = 'Explore Our Deep Tech',
  primaryButtonHref = '/deep-tech',
  secondaryButtonLabel = 'Talk to an Expert',
  secondaryButtonHref = '/contact',
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      {/* Background overlay */}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.badge}>{badge}</div>
          <h1 className={styles.headline}>
            {headline1} <span className={styles.headlineAccent}>{headline2}</span>
          </h1>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
          <p className={styles.description}>{description}</p>
          <div className={styles.buttons}>
            <Link href={primaryButtonHref} className={styles.btnPrimary}>
              {primaryButtonLabel}
            </Link>
            <Link href={secondaryButtonHref} className={styles.btnSecondary}>
              {secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
