import { getPayloadClient } from '../lib/payload'

async function inspectCaseStudies() {
  const payload = await getPayloadClient()
  if (!payload) process.exit(1)

  const caseStudies = await payload.find({
    collection: 'case-studies' as any,
    limit: 100,
    depth: 1,
  })

  console.log(`Total case studies: ${caseStudies.docs.length}`)
  caseStudies.docs.forEach((cs: any) => {
    const catName = cs.category?.name || cs.category
    const catId = cs.category?.id || cs.category
    console.log(`[${cs.slug}] category ID: ${catId} (${catName}), filterCategories:`, JSON.stringify(cs.filterCategories))
  })

  process.exit(0)
}

inspectCaseStudies().catch((e) => {
  console.error(e)
  process.exit(1)
})
