import styles from '@/components/ui/PageTransitionLoader.module.css'

export default function Loading() {
  return (
    <div className={`${styles.loaderOverlay} ${styles.visible}`}>
      <div className={styles.loaderContent}>
        <div className={styles.logoRingWrapper}>
          <div className={styles.spinnerRing} />
          <div className={styles.innerPulseRing} />
          <img
            src="/images/identifyou-logo.png"
            alt="IdentifYou Loading"
            width="160"
            height="40"
            className={styles.logoImg}
          />
        </div>
      </div>
    </div>
  )
}
