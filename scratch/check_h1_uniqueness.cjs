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
const h1Map = new Map();
const multiH1 = [];
const dupH1 = [];

for (const p of pages) {
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  const content = fs.readFileSync(p, 'utf8');

  // Match all <h1> tags
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length > 1) {
    multiH1.push({ page: rel, count: h1Matches.length, h1s: h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim()) });
  }

  for (const m of h1Matches) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text) {
      if (h1Map.has(text)) {
        dupH1.push({ h1: text, pages: [h1Map.get(text), rel] });
      } else {
        h1Map.set(text, rel);
      }
    }
  }
}

console.log('=== H1 VALIDATION SCAN ===');
console.log('Multiple H1 pages:', multiH1.length);
if (multiH1.length > 0) console.log(multiH1);
console.log('Duplicate H1 across different pages:', dupH1.length);
if (dupH1.length > 0) console.log(dupH1);

console.log('\n--- H1 List per Page ---');
for (const [h1, p] of h1Map.entries()) {
  console.log(`${p} (${h1.length} chars) => ${h1}`);
}
