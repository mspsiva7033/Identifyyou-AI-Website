'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import type { BlogArticleSummary } from '@/lib/payload'
import styles from './page.module.css'

type Props = {
  categories: string[]
  topics: string[]
  articles: BlogArticleSummary[]
}

export function BlogsAndNewsClient({ categories = [], topics = [], articles = [] }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Build dynamic category options
  const categoryOptions = useMemo(() => {
    return ['All', ...categories.filter((c) => c && c.toLowerCase() !== 'all')]
  }, [categories])

  // Get active category from URL
  const getCategoryFromUrl = useCallback(() => {
    const param = searchParams.get('category')
    if (!param) return 'All'
    const trimmed = param.trim().toLowerCase()
    const match = categoryOptions.find((c) => c.toLowerCase() === trimmed)
    return match || 'All'
  }, [searchParams, categoryOptions])

  // Get active topic from URL
  const getTopicFromUrl = useCallback(() => {
    const param = searchParams.get('topic')
    if (!param) return 'All'
    const trimmed = param.trim().toLowerCase()
    const match = topics.find((t) => t.toLowerCase() === trimmed)
    return match || 'All'
  }, [searchParams, topics])

  const [activeCategory, setActiveCategory] = useState(getCategoryFromUrl)
  const [activeTopic, setActiveTopic] = useState(getTopicFromUrl)

  // Sync state on URL popstate / back button
  useEffect(() => {
    setActiveCategory(getCategoryFromUrl())
    setActiveTopic(getTopicFromUrl())
  }, [searchParams, getCategoryFromUrl, getTopicFromUrl])

  // Update URL helper
  const updateUrl = (cat: string, top: string) => {
    const params = new URLSearchParams()
    if (cat !== 'All') {
      params.set('category', cat)
    }
    if (top !== 'All') {
      params.set('topic', top)
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  // Handle Category click
  const handleCategorySelect = (category: string) => {
    let nextTopic = activeTopic
    if (category !== 'All' && activeTopic !== 'All') {
      const articlesInCat = articles.filter(
        (a) => a.category?.toLowerCase().trim() === category.toLowerCase().trim()
      )
      const topicExistsInCat = articlesInCat.some((a) =>
        a.topics?.some((t) => t.toLowerCase().trim() === activeTopic.toLowerCase().trim())
      )
      if (!topicExistsInCat) {
        nextTopic = 'All'
      }
    }
    setActiveCategory(category)
    setActiveTopic(nextTopic)
    updateUrl(category, nextTopic)
  }

  // Handle Topic click
  const handleTopicSelect = (topic: string) => {
    const newTopic = activeTopic === topic ? 'All' : topic
    setActiveTopic(newTopic)
    updateUrl(activeCategory, newTopic)
  }

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('All')
    setActiveTopic('All')
    router.replace(pathname, { scroll: false })
  }

  // Compute dynamic topic options: show topics present in currently selected category
  const dynamicTopics = useMemo(() => {
    const relevantArticles =
      activeCategory === 'All'
        ? articles
        : articles.filter((a) => a.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim())

    const topicSet = new Set<string>()
    relevantArticles.forEach((a) => {
      if (Array.isArray(a.topics)) {
        a.topics.forEach((t) => topicSet.add(t))
      }
    })
    return Array.from(topicSet).sort()
  }, [articles, activeCategory])

  // Filter visible articles: combination of Category AND Topic
  const visible = useMemo(() => {
    return articles.filter((article) => {
      // 1. Category matching
      const matchesCategory =
        activeCategory === 'All' ||
        article.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()

      // 2. Topic matching
      const matchesTopic =
        activeTopic === 'All' ||
        (Array.isArray(article.topics) &&
          article.topics.some((t) => t.toLowerCase().trim() === activeTopic.toLowerCase().trim()))

      return matchesCategory && matchesTopic
    })
  }, [articles, activeCategory, activeTopic])

  return (
    <section className={styles.articlesSection}>
      <div className={styles.container}>
        {/* Dynamic Category & Topic Filters */}
        {(categoryOptions.length > 1 || dynamicTopics.length > 0) && (
          <div className={styles.filterContainer}>
            {/* Category Tabs */}
            {categoryOptions.length > 1 && (
              <div className={styles.filters}>
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    id={`blog-category-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => handleCategorySelect(cat)}
                    className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Topic Pills */}
            {dynamicTopics.length > 0 && (
              <div className={styles.topicFilters}>
                <span className={styles.topicLabel}>Topic:</span>
                <button
                  id="blog-topic-all"
                  onClick={() => handleTopicSelect('All')}
                  className={`${styles.topicChip} ${activeTopic === 'All' ? styles.topicChipActive : ''}`}
                >
                  All Topics
                </button>
                {dynamicTopics.map((topic) => (
                  <button
                    key={topic}
                    id={`blog-topic-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => handleTopicSelect(topic)}
                    className={`${styles.topicChip} ${activeTopic === topic ? styles.topicChipActive : ''}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Article Cards Grid */}
        <div className={styles.grid}>
          {visible.map((article) => (
            <article key={article.slug} className={styles.card}>
              {article.image && (
                <div className={styles.cardImageWrapper}>
                  <img
                    src={article.image}
                    alt={article.title}
                    width="600"
                    height="340"
                    loading="lazy"
                    className={styles.cardImage}
                  />
                </div>
              )}
              <div className={styles.cardHeader}>
                {article.category && <span className={styles.category}>{article.category}</span>}
                <div className={styles.meta}>
                  <span>{article.date}</span> {article.readTime && `• ${article.readTime}`}
                </div>
              </div>

              <h2 className={styles.articleTitle}>{article.title}</h2>
              <p className={styles.excerpt}>{article.excerpt}</p>

              {/* Topic tags on card */}
              {Array.isArray(article.topics) && article.topics.length > 0 && (
                <div className={styles.cardTopics}>
                  {article.topics.map((top) => (
                    <span key={top} className={styles.cardTopicTag}>
                      {top}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.cardFooter}>
                <Link href={`/blogs-and-news/${article.slug}`} className={styles.readMore}>
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {visible.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsTitle}>No Articles Found</div>
            <p className={styles.noResultsText}>
              No articles match the selected category &ldquo;{activeCategory}&rdquo;
              {activeTopic !== 'All' ? ` and topic "${activeTopic}"` : ''}.
            </p>
            <button onClick={handleResetFilters} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
