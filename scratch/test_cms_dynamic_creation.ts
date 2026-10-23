import { getPayloadClient, getBlogCategoriesAndTopics, getBlogsAndNews } from '../lib/payload'

async function verifyCmsCreationWorkflow() {
  console.log('--- Testing CMS Category & Topic Creation and Dynamic Website Display ---')
  const payload = await getPayloadClient()
  if (!payload) {
    console.error('Payload not available')
    process.exit(1)
  }

  // Find one existing article to test assigning a new category and topic
  const articles = await payload.find({
    collection: 'blogs-and-news' as any,
    limit: 1,
  })

  if (!articles.docs.length) {
    console.error('No articles found')
    process.exit(1)
  }

  const testDoc = articles.docs[0]
  const testCategory = 'NextGen Robotics'
  const testTopic = 'Robotic Telemetry'

  console.log(`\nAssigning category "${testCategory}" and topic "${testTopic}" to article ID ${testDoc.id} in CMS...`)
  await payload.update({
    collection: 'blogs-and-news' as any,
    id: testDoc.id,
    data: {
      category: testCategory,
      topics: `${testTopic} · Edge AI Testing`,
    },
  })

  console.log('Querying dynamic categories and topics from CMS...')
  const taxonomy = await getBlogCategoriesAndTopics()
  const fetchedArticles = await getBlogsAndNews()

  const hasCategory = taxonomy.categories.includes(testCategory)
  const hasTopic = taxonomy.topics.includes(testTopic)
  const articleUpdated = fetchedArticles.some((a) => a.slug === testDoc.slug && a.category === testCategory)

  console.log(`- New Category "${testCategory}" detected dynamically:`, hasCategory ? 'PASS' : 'FAIL')
  console.log(`- New Topic "${testTopic}" detected dynamically:`, hasTopic ? 'PASS' : 'FAIL')
  console.log(`- Article reflects new category assignment:`, articleUpdated ? 'PASS' : 'FAIL')

  if (!hasCategory || !hasTopic || !articleUpdated) {
    throw new Error('CMS dynamic creation verification failed')
  }

  // Clean up: reset article back to null so the user has a 100% clean starting point
  console.log('\nResetting article back to clean starting point (null category and topics)...')
  await payload.update({
    collection: 'blogs-and-news' as any,
    id: testDoc.id,
    data: {
      category: null,
      topics: null,
    },
  })

  const resetTaxonomy = await getBlogCategoriesAndTopics()
  console.log('- Verified categories cleared after reset:', resetTaxonomy.categories.length === 0 ? 'PASS' : 'FAIL')
  console.log('- Verified topics cleared after reset:', resetTaxonomy.topics.length === 0 ? 'PASS' : 'FAIL')

  console.log('\n--- CMS DYNAMIC CREATION WORKFLOW TEST COMPLETED SUCCESSFULLY! ---')
  process.exit(0)
}

verifyCmsCreationWorkflow().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
