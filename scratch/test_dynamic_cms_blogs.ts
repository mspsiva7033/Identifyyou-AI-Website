import { getPayloadClient, getBlogsAndNews, getBlogCategoriesAndTopics } from '../lib/payload'

async function runDynamicCmsLifecycleTest() {
  console.log('--- Starting Dynamic CMS Lifecycle Test for Blogs & News ---')
  const payload = await getPayloadClient()
  if (!payload) {
    throw new Error('Failed to initialize Payload client')
  }

  const testSlug = 'dynamic-qa-test-article-' + Date.now()
  const initialCategory = 'Industry Insights'
  const initialTopic = 'QA Autonomous Systems'

  console.log(`\nStep 1: Creating published test article [${testSlug}] with category "${initialCategory}" and topic "${initialTopic}"...`)
  const createdDoc = await payload.create({
    collection: 'blogs-and-news' as any,
    data: {
      slug: testSlug,
      title: 'QA Dynamic CMS Test Article',
      category: initialCategory,
      topics: `${initialTopic} · Edge QA`,
      excerpt: 'Temporary test article to verify dynamic CMS taxonomy and filter propagation.',
      overview: 'Overview for dynamic CMS test article.',
      publishedAt: new Date().toISOString(),
      readTime: '3 min read',
      status: 'published',
      sections: [{ title: 'Section 1', content: 'Content 1' }],
      takeaways: [{ point: 'Dynamic CMS integration verified' }],
    },
  })
  console.log('Created doc ID:', createdDoc.id)

  try {
    console.log('\nStep 2: Testing dynamic topic and article detection...')
    const taxonomyAfterCreate = await getBlogCategoriesAndTopics()
    const articlesAfterCreate = await getBlogsAndNews()

    const topicFound = taxonomyAfterCreate.topics.includes(initialTopic)
    const articleFound = articlesAfterCreate.some((a) => a.slug === testSlug)
    const categoryArticles = articlesAfterCreate.filter((a) => a.category === initialCategory)
    const foundInCategory = categoryArticles.some((a) => a.slug === testSlug)

    console.log(`- Topic "${initialTopic}" dynamically present in taxonomy:`, topicFound ? 'PASS' : 'FAIL')
    console.log(`- Article "${testSlug}" returned by getBlogsAndNews:`, articleFound ? 'PASS' : 'FAIL')
    console.log(`- Article found under category "${initialCategory}":`, foundInCategory ? 'PASS' : 'FAIL')

    if (!topicFound || !articleFound || !foundInCategory) {
      throw new Error('Dynamic creation verification failed!')
    }

    console.log('\nStep 3: Testing category & topic reassignment (Industry Insights -> Data Engineering)...')
    const updatedCategory = 'Data Engineering'
    const updatedTopic = 'QA Data Pipelines'
    await payload.update({
      collection: 'blogs-and-news' as any,
      id: createdDoc.id,
      data: {
        category: updatedCategory,
        topics: updatedTopic,
      },
    })

    const taxonomyAfterUpdate = await getBlogCategoriesAndTopics()
    const articlesAfterUpdate = await getBlogsAndNews()

    const oldTopicPresent = taxonomyAfterUpdate.topics.includes(initialTopic)
    const newTopicPresent = taxonomyAfterUpdate.topics.includes(updatedTopic)
    const updatedArticle = articlesAfterUpdate.find((a) => a.slug === testSlug)

    console.log('- Old topic removed from dynamic topics:', !oldTopicPresent ? 'PASS' : 'FAIL')
    console.log('- New topic added to dynamic topics:', newTopicPresent ? 'PASS' : 'FAIL')
    console.log('- Article reassigned to new category in CMS:', updatedArticle?.category === updatedCategory ? 'PASS' : 'FAIL')

    if (oldTopicPresent || !newTopicPresent || updatedArticle?.category !== updatedCategory) {
      throw new Error('Reassignment verification failed!')
    }

    console.log('\nStep 4: Testing unpublish workflow (changing status to draft)...')
    await payload.update({
      collection: 'blogs-and-news' as any,
      id: createdDoc.id,
      data: {
        status: 'draft',
      },
    })

    const taxonomyAfterUnpublish = await getBlogCategoriesAndTopics()
    const articlesAfterUnpublish = await getBlogsAndNews()

    const articleStillPresent = articlesAfterUnpublish.some((a) => a.slug === testSlug)
    const unpubTopicPresent = taxonomyAfterUnpublish.topics.includes(updatedTopic)

    console.log(`- Draft article excluded from public listing:`, !articleStillPresent ? 'PASS' : 'FAIL')
    console.log(`- Topics from draft articles excluded from taxonomy:`, !unpubTopicPresent ? 'PASS' : 'FAIL')

    if (articleStillPresent || unpubTopicPresent) {
      throw new Error('Unpublish verification failed: draft article or its topics leaked!')
    }
  } finally {
    console.log('\nStep 5: Safely cleaning up temporary test article from CMS...')
    await payload.delete({
      collection: 'blogs-and-news' as any,
      id: createdDoc.id,
    })
    console.log('Cleanup completed successfully.')
  }

  console.log('\n--- ALL DYNAMIC CMS LIFECYCLE TESTS PASSED PERFECTLY! ---')
  process.exit(0)
}

runDynamicCmsLifecycleTest().catch((err) => {
  console.error('Test failed:', err)
  process.exit(1)
})
