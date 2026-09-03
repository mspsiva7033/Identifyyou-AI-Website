import Link from 'next/link'
import styles from './CTABlock.module.css'

type CTABlockProps = {
  headline: string
  description?: string
  buttonLabel: string
  buttonHref: string
}

export function CTABlock({ headline, description, buttonLabel, buttonHref }: CTABlockProps) {
  return (
    <div className={styles.block}>
      <h2 className={styles.headline}>{headline}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <Link href={buttonHref} className={styles.button}>
        {buttonLabel}
      </Link>
    </div>
  )
}
