import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

async function checkImages() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'case-studies',
    limit: 100,
  })

  console.log(`Checking ${result.docs.length} case studies...`)
  let missingCount = 0

  for (const doc of result.docs) {
    const slug = doc.slug
    const illustration = (doc as any).illustration
    const image = (doc as any).image

    const publicDir = path.resolve(process.cwd(), 'public')
    let found = false
    let imagePathUsed = ''

    if (illustration && typeof illustration === 'string') {
      const p = path.join(publicDir, illustration)
      if (fs.existsSync(p)) {
        found = true
        imagePathUsed = illustration
      }
    }

    if (!found && image && typeof image === 'string') {
      const p = path.join(publicDir, image)
      if (fs.existsSync(p)) {
        found = true
        imagePathUsed = image
      }
    }

    if (!found && slug) {
      const pngPath = path.join(publicDir, 'images', 'case-studies', `${slug}.png`)
      const svgPath = path.join(publicDir, 'images', 'case-studies', `${slug}.svg`)
      const jpgPath = path.join(publicDir, 'images', 'case-studies', `${slug}.jpg`)

      if (fs.existsSync(pngPath)) {
        found = true
        imagePathUsed = `/images/case-studies/${slug}.png`
      } else if (fs.existsSync(svgPath)) {
        found = true
        imagePathUsed = `/images/case-studies/${slug}.svg`
      } else if (fs.existsSync(jpgPath)) {
        found = true
        imagePathUsed = `/images/case-studies/${slug}.jpg`
      }
    }

    if (found) {
      console.log(`[OK] ${slug} -> ${imagePathUsed}`)
    } else {
      console.log(`[MISSING] ${slug} has no matching image file!`)
      missingCount++
    }
  }

  console.log(`Summary: ${result.docs.length - missingCount}/${result.docs.length} have valid images. ${missingCount} missing.`)
  process.exit(0)
}

checkImages()
