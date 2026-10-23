const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const pages = getFiles('./app/(frontend)');
const missingCanonicals = [];
const canonicalMap = [];

for (const p of pages) {
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  const content = fs.readFileSync(p, 'utf8');

  // Check for static canonical or generateMetadata canonical
  const hasStaticCanonical = /canonical:\s*['"]([^'"]+)['"]/.test(content);
  const hasDynamicCanonical = /canonical:\s*`[^`]+`/.test(content);

  if (hasStaticCanonical || hasDynamicCanonical) {
    const m = content.match(/canonical:\s*(?:['"]([^'"]+)['"]|`([^`]+)`)/);
    canonicalMap.push({ page: rel, canonical: m ? (m[1] || m[2]) : 'present' });
  } else {
    // Check if it's a redirect page
    if (!content.includes('redirect(')) {
      missingCanonicals.push(rel);
    }
  }
}

console.log('=== CANONICAL URL VALIDATION ===');
console.log('Pages without canonical:', missingCanonicals.length);
if (missingCanonicals.length > 0) console.log(missingCanonicals);

console.log('\n--- Canonical URLs found (' + canonicalMap.length + ') ---');
for (const c of canonicalMap) {
  console.log(`${c.page} => ${c.canonical}`);
}
