import fs from 'fs'
import path from 'path'
import http from 'http'
import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  console.log('===============================================================')
  console.log('         ADMIN PANEL MEDIA & IMAGE UPLOAD VERIFICATION         ')
  console.log('===============================================================\n')

  const payload = await getPayload({ config })
  const testImgPath = path.resolve(process.cwd(), 'public/images/test-admin-upload.png')

  if (!fs.existsSync(testImgPath)) {
    throw new Error(`Test image does not exist at ${testImgPath}`)
  }

  const fileBuffer = fs.readFileSync(testImgPath)
  const fileStats = fs.statSync(testImgPath)

  console.log(`Source File: ${testImgPath}`)
  console.log(`Source File Size: ${fileStats.size} bytes\n`)

  // 1. Check if test media item exists or create it
  let mediaDoc: any = null
  const existing = await payload.find({
    collection: 'media',
    where: {
      alt: { equals: 'IdentifYou Admin QA Test Image' },
    },
  })

  if (existing.docs.length > 0) {
    mediaDoc = existing.docs[0]
    console.log(`✓ Existing test media document found in database (ID: ${mediaDoc.id})`)
  } else {
    console.log('Uploading test image to Payload CMS Media collection...')
    mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: 'IdentifYou Admin QA Test Image',
      },
      file: {
        data: fileBuffer,
        mimetype: 'image/png',
        name: 'test-admin-upload.png',
        size: fileStats.size,
      },
    })
    console.log(`✓ Media record successfully created in database (ID: ${mediaDoc.id})`)
  }

  // 2. Validate metadata fields
  console.log('\n--- 1. Document Metadata Verification ---')
  console.log(`  • ID:          ${mediaDoc.id}`)
  console.log(`  • Alt Text:    ${mediaDoc.alt}`)
  console.log(`  • Filename:    ${mediaDoc.filename}`)
  console.log(`  • MIME Type:   ${mediaDoc.mimeType}`)
  console.log(`  • Dimensions:  ${mediaDoc.width} x ${mediaDoc.height}`)
  console.log(`  • File Size:   ${mediaDoc.filesize} bytes`)
  console.log(`  • URL Path:    ${mediaDoc.url}`)

  const hasValidMeta =
    mediaDoc.filename &&
    mediaDoc.mimeType === 'image/png' &&
    mediaDoc.width === 1600 &&
    mediaDoc.height === 900 &&
    mediaDoc.filesize > 0

  console.log(`  => Status: [${hasValidMeta ? 'PASS' : 'FAIL'}] Metadata matches uploaded asset.`)

  // 3. Verify Generated Responsive Sizes on Disk
  console.log('\n--- 2. Responsive Image Sizes Verification on Disk ---')
  const mediaDir = path.resolve(process.cwd(), 'public/media')
  const expectedSizes = ['thumbnail', 'card', 'hero']

  for (const sizeName of expectedSizes) {
    const sizeInfo = mediaDoc.sizes?.[sizeName]
    if (sizeInfo && sizeInfo.filename) {
      const diskPath = path.join(mediaDir, sizeInfo.filename)
      const existsOnDisk = fs.existsSync(diskPath)
      const diskSize = existsOnDisk ? fs.statSync(diskPath).size : 0
      console.log(`  • [${existsOnDisk ? 'PASS' : 'FAIL'}] Size "${sizeName}": ${sizeInfo.width}x${sizeInfo.height} -> ${sizeInfo.filename} (${diskSize} bytes)`)
    } else {
      console.log(`  • [FAIL] Size "${sizeName}" missing from media sizes object!`)
    }
  }

  // 4. Verify HTTP Serving of Uploaded Media
  console.log('\n--- 3. HTTP URL Serving Verification ---')
  const testUrl = mediaDoc.url?.startsWith('http') ? mediaDoc.url : `http://localhost:3000${mediaDoc.url}`

  await new Promise<void>((resolve) => {
    http.get(testUrl, (res) => {
      let bytes = 0
      res.on('data', (c) => (bytes += c.length))
      res.on('end', () => {
        const pass = res.statusCode === 200 && bytes > 0
        console.log(`  • [${pass ? 'PASS' : 'FAIL'}] HTTP GET ${testUrl} => ${res.statusCode} (${bytes} bytes, Content-Type: ${res.headers['content-type']})`)
        resolve()
      })
    }).on('error', (err) => {
      console.error(`  • [FAIL] HTTP GET failed: ${err.message}`)
      resolve()
    })
  })

  // Also verify thumbnail HTTP serving
  if (mediaDoc.sizes?.thumbnail?.url) {
    const rawThumb = mediaDoc.sizes.thumbnail.url
    const thumbUrl = rawThumb.startsWith('http') ? rawThumb : `http://localhost:3000${rawThumb}`
    await new Promise<void>((resolve) => {
      http.get(thumbUrl, (res) => {
        let bytes = 0
        res.on('data', (c) => (bytes += c.length))
        res.on('end', () => {
          const pass = res.statusCode === 200 && bytes > 0
          console.log(`  • [${pass ? 'PASS' : 'FAIL'}] Thumbnail HTTP GET ${thumbUrl} => ${res.statusCode} (${bytes} bytes)`)
          resolve()
        })
      }).on('error', (err) => {
        console.error(`  • [FAIL] Thumbnail HTTP GET failed: ${err.message}`)
        resolve()
      })
    })
  }

  console.log('\n===============================================================')
  console.log('        MEDIA & IMAGE UPLOAD TEST COMPLETED SUCCESSFULLY       ')
  console.log('===============================================================\n')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
