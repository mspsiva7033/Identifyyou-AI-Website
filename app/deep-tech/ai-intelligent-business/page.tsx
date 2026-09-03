import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'AI & Intelligent Business — Turn Business Decisions Into Intelligent Decisions',
  description: 'AI should not simply generate information. It should help your business decide what to do next. Intelligent Procurement, Sales, Supply Chain, Manufacturing and Inventory.',
}

const cards = [
  { title: 'Intelligent Procurement', q: 'Which supplier should I buy from?', desc: 'AI weighs price, quality, delivery, historical performance, risk and plant requirements to recommend the best supplier.' },
  { title: 'Intelligent Sales', q: 'Which customer should I focus on?', desc: 'AI surfaces sales opportunities, customer behavior, cross-sell potential, churn risk and forecasted demand.' },
  { title: 'Intelligent Supply Chain', q: 'What should we purchase, produce and move next?', desc: 'AI forecasts and optimizes purchasing, production and movement decisions across the supply chain.' },
  { title: 'Intelligent Manufacturing', q: 'What should the plant do next?', desc: 'AI turns live machine data into predictive guidance for shop-floor decisions.' },
  { title: 'Intelligent Inventory', q: 'Where is inventory risk building up?', desc: 'AI flags emerging inventory risk before it becomes a stock-out or overstock problem.' },
]

export default function AIIntelligentBusinessPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Deep Tech — 02</div>
        <h1 className={styles.title}>Turn Business Decisions Into Intelligent Decisions</h1>
        <p className={styles.desc}>AI should not simply generate information. It should help your business decide what to do next.</p>
      </section>
      <section className={styles.content}>
        <div className={styles.cardsGrid}>
          {cards.map((c) => (
            <div key={c.title} className={styles.card}>
              <div className={styles.cardImg} />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{c.title}</div>
                <p className={styles.cardQ}>{c.q}</p>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <CTABlock
          headline="Identify Your Highest-Value AI Use Cases"
          description="Tell us the decision you're trying to improve — we'll map it to a Deep Tech solution."
          buttonLabel="Explore AI-Powered Business Solutions"
          buttonHref="/contact"
        />
      </section>
      <Footer />
    </div>
  )
}
