import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getBlogsAndNews, BlogArticleSummary } from '@/lib/payload'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blogs & News — IdentifYou Technologies',
  description:
    'Insights, articles, and industry updates on Vision AI, Industrial Automation, Manufacturing Data Platforms, and Enterprise Deep Tech.',
}

const articles: BlogArticleSummary[] = [
  {
    slug: 'ai-in-manufacturing-quality-inspection-2026',
    category: 'Vision AI & Quality',
    date: 'August 28, 2026',
    readTime: '6 min read',
    title: 'How AI-Powered Vision Inspection is Transforming High-Precision Manufacturing',
    excerpt:
      'Discover how integrating high-speed Basler industrial cameras with convolutional neural networks eliminates visual defect bottlenecks on automotive assembly lines.',
  },
  {
    slug: 'building-connected-factories-opc-ua-mqtt-edge',
    category: 'Industrial Automation',
    date: 'August 14, 2026',
    readTime: '8 min read',
    title: 'Architecting Connected Factories: From OPC-UA & MQTT to Edge Computing',
    excerpt:
      'A comprehensive guide for factory managers on unifying legacy PLC signals, edge buffering, and real-time cloud data pipelines without disrupting ongoing operations.',
  },
  {
    slug: 'snowflake-cortex-ai-manufacturing-data-platform',
    category: 'Data Engineering',
    date: 'July 30, 2026',
    readTime: '5 min read',
    title: 'Leveraging Snowflake Cortex AI for Intelligent Procurement and Supply Chain Analytics',
    excerpt:
      'How enterprise manufacturing teams use native Snowflake Cortex AI applications to forecast raw material pricing and mitigate stock-out risks.',
  },
  {
    slug: 'no-code-ai-platforms-for-enterprise-workflows',
    category: 'Digital Engineering',
    date: 'July 12, 2026',
    readTime: '7 min read',
    title: 'The Shift Towards No-Code Enterprise Applications in Industrial Operations',
    excerpt:
      'Empowering plant engineers and floor supervisors to create custom tracking apps and workflow automations without traditional software development delays.',
  },
  {
    slug: 'deep-tech-computer-vision-assembly-lines',
    category: 'Vision AI & Quality',
    date: 'June 25, 2026',
    readTime: '6 min read',
    title: 'Computer Vision & Edge Inferencing on High-Speed Assembly Lines',
    excerpt:
      'Synchronizing multi-angle camera feeds with edge TensorRT inferencing to verify component placement, wiring, and surface finish in sub-50ms cycles.',
  },
  {
    slug: 'predictive-maintenance-iiot-sensor-fusion',
    category: 'Industrial Automation',
    date: 'June 10, 2026',
    readTime: '7 min read',
    title: 'Predictive Maintenance at Scale with IIoT Sensor Fusion & Machine Learning',
    excerpt:
      'Fusing thermal telemetry, vibration metrics, and current draw sensors to predict equipment failure before catastrophic downtime occurs.',
  },
]

export default async function BlogsAndNewsPage() {
  const cmsArticles = await getBlogsAndNews()
  const displayArticles =
    cmsArticles.length > 0
      ? [...cmsArticles, ...articles.filter((a) => !cmsArticles.some((c) => c.slug === a.slug))]
      : articles

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.badge}>Insights & Updates</div>
          <h1 className={styles.heroTitle}>Blogs & Industry News</h1>
          <p className={styles.heroSub}>
            Explore our latest thinking on Deep Tech, Industrial AI, Manufacturing Intelligence, and Digital Engineering.
          </p>
        </div>
      </section>

      <section className={styles.articlesSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {displayArticles.map((article) => (
              <article key={article.slug} className={styles.card}>
                {article.image && (
                  <div style={{ width: '100%', height: '180px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{article.category}</span>
                  <div className={styles.meta}>
                    <span>{article.date}</span> • <span>{article.readTime}</span>
                  </div>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.cardFooter}>
                  <Link href={`/blogs-and-news/${article.slug}`} className={styles.readMore}>
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Want to stay updated with Deep Tech Insights?</h2>
          <p className={styles.ctaDesc}>
            Connect with our team to learn how IdentifYou can help engineer intelligent solutions for your enterprise.
          </p>
          <Link href="/contact" className={styles.btnPrimary}>
            Talk to a Deep Tech Expert
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
