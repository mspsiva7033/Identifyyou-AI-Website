import sharp from 'sharp'
import path from 'path'

async function run() {
  const svg = `<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0f172a"/>
    <circle cx="800" cy="450" r="300" fill="#0284c7" opacity="0.4"/>
    <text x="50%" y="45%" font-size="54" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">IdentifYou Admin QA Test</text>
    <text x="50%" y="55%" font-size="32" fill="#38bdf8" text-anchor="middle" font-family="sans-serif">High-Resolution Image Upload Verification</text>
  </svg>`

  const dest = path.resolve('public/images/test-admin-upload.png')
  await sharp(Buffer.from(svg)).png().toFile(dest)
  console.log(`Successfully created test upload image at: ${dest}`)
}

run().catch(console.error)
