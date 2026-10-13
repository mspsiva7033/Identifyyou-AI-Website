import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

async function generateThumbnails() {
  const srcDir = path.resolve(process.cwd(), 'public/images/case-studies')
  const destDir = path.resolve(srcDir, 'thumbnails')

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const files = fs.readdirSync(srcDir)
  let count = 0

  for (const file of files) {
    if (!file.endsWith('.png')) continue

    const inputPath = path.join(srcDir, file)
    const baseName = path.basename(file, '.png')
    const outputPath = path.join(destDir, `${baseName}.webp`)

    try {
      const stats = fs.statSync(inputPath)
      await sharp(inputPath)
        .resize({ width: 500, height: 320, fit: 'cover', position: 'centre' })
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath)

      const outStats = fs.statSync(outputPath)
      console.log(`✓ ${file} (${Math.round(stats.size / 1024)} KB) -> thumbnails/${baseName}.webp (${Math.round(outStats.size / 1024)} KB)`)
      count++
    } catch (err) {
      console.error(`Error processing ${file}:`, err)
    }
  }

  console.log(`\nSuccessfully generated ${count} compressed thumbnails in ${destDir}!`)
}

generateThumbnails().catch((err) => {
  console.error(err)
  process.exit(1)
})
