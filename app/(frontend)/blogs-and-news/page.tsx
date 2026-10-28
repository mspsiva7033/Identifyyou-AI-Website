import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getBlogsAndNews, getBlogCategoriesAndTopics } from '@/lib/payload'
import { BlogsAndNewsClient } from './BlogsAndNewsClient'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Deep Tech Blogs & Industry Insights',
  description:
    'Insights, articles, and industry updates on Vision AI, Industrial Automation, Manufacturing Data Platforms, and Enterprise Deep Tech.',
  alternates: {
    canonical: '/blogs-and-news',
  },
}

export default async function BlogsAndNewsPage() {
  const [taxonomy, articles] = await Promise.all([
    getBlogCategoriesAndTopics(),
    getBlogsAndNews(),
  ])

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

      <Suspense fallback={<div className={styles.container} style={{ textAlign: 'center', padding: '60px 0' }}>Loading articles...</div>}>
        <BlogsAndNewsClient
          categories={taxonomy.categories}
          topics={taxonomy.topics}
          articles={articles}
        />
      </Suspense>

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
