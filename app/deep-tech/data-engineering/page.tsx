import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Data Engineering — Turn Data Into a Trusted Business Asset',
  description: 'Enterprise data platforms, integration, transformation and pipelines that convert fragmented enterprise and operational data into trusted intelligence.',
}

const caps = ['Enterprise Data Platforms', 'Data Pipelines', 'Data Integration', 'Data Transformation', 'Data Quality', 'Manufacturing Data Platforms']
const flow = ['Business Problem', 'Enterprise Data Platform', 'Data Engineering', 'Snowflake + DBT + Fivetran + Matillion + Snowpipe', 'AI + Analytics', 'Business Outcome']

export default function DataEngineeringPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Deep Tech — 05</div>
        <h1 className={styles.title}>Turn Data Into a Trusted Business Asset</h1>
        <p className={styles.desc}>Enterprise data platforms, integration, transformation and pipelines that convert fragmented enterprise and operational data into trusted intelligence.</p>
      </section>
      <section className={styles.content}>
        <div className={styles.capsGrid}>
          {caps.map((c) => <span key={c} className={styles.cap}>{c}</span>)}
        </div>
        <div className={styles.flowBox}>
          <div className={styles.flowLabel}>Business Problem → Business Outcome</div>
          <FlowChain nodes={flow} direction="vertical" />
        </div>
        <CTABlock headline="Modernize Your Data Platform" buttonLabel="Talk to an Expert" buttonHref="/contact" />
      </section>
      <Footer />
    </div>
  )
}
