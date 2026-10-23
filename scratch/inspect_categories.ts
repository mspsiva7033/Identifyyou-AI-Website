import { getPayloadClient } from '../lib/payload'

async function inspectCategories() {
  const payload = await getPayloadClient()
  if (!payload) {
    console.error('Payload not available')
    process.exit(1)
  }

  const categories = await payload.find({
    collection: 'case-study-categories' as any,
    limit: 100,
  })

  console.log('--- ALL CASE STUDY CATEGORIES IN DB ---')
  categories.docs.forEach((c: any) => {
    console.log(`ID: ${c.id} | Name: "${c.name}" | Slug: "${c.slug}" | Order: ${c.displayOrder}`)
  })

  const caseStudies = await payload.find({
    collection: 'case-studies' as any,
    limit: 100,
    depth: 1,
  })

  console.log('\n--- CASE STUDY CATEGORY USAGE ---')
  const catUsage: Record<string, number> = {}
  caseStudies.docs.forEach((cs: any) => {
    const catName = cs.category?.name || cs.category
    catUsage[catName] = (catUsage[catName] || 0) + 1
  })
  console.log('Category usage in case studies:', catUsage)

  process.exit(0)
}

inspectCategories().catch((e) => {
  console.error(e)
  process.exit(1)
})
