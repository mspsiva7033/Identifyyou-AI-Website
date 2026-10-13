import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const targetFile = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/next/dist/layouts/Root/index.js'
)

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8')
  let modified = false

  // Ensure head, style, and body have suppressHydrationWarning
  const targetSnippet = `children: [/*#__PURE__*/_jsx("head", {
      children: /*#__PURE__*/_jsx("style", {
        children: \`@layer payload-default, payload;\`
      })
    }), /*#__PURE__*/_jsxs("body", {`

  const replacementSnippet = `children: [/*#__PURE__*/_jsx("head", {
      suppressHydrationWarning: true,
      children: /*#__PURE__*/_jsx("style", {
        suppressHydrationWarning: true,
        children: \`@layer payload-default, payload;\`
      })
    }), /*#__PURE__*/_jsxs("body", {
      suppressHydrationWarning: true,`

  if (content.includes(targetSnippet)) {
    content = content.replace(targetSnippet, replacementSnippet)
    modified = true
  }

  if (modified) {
    fs.writeFileSync(targetFile, content, 'utf8')
    console.log('✓ Successfully patched @payloadcms/next RootLayout to suppress hydration warnings on head, style, and body.')
  } else {
    console.log('• @payloadcms/next RootLayout already patched or snippet not found.')
  }
} else {
  console.log('• @payloadcms/next RootLayout not found (node_modules might not be installed yet).')
}
