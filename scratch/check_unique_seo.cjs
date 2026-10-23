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
const titles = new Map();
const descriptions = new Map();
const h1s = new Map();
const dupTitles = [];
const dupDesc = [];
const shortTitles = [];
const longH1s = [];

for (const p of pages) {
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  const content = fs.readFileSync(p, 'utf8');

  // Extract export const metadata: Metadata = { ... }
  const metaMatch = content.match(/export const metadata(?::\s*Metadata)?\s*=\s*\{([\s\S]*?)\n\}/);
  if (metaMatch) {
    const metaBlock = metaMatch[1];
    const absMatch = metaBlock.match(/absolute:\s*['"]([^'"]+)['"]/);
    const titleMatch = metaBlock.match(/title:\s*['"]([^'"]+)['"]/);
    const title = absMatch ? absMatch[1] : (titleMatch ? titleMatch[1] : null);

    if (title) {
      if (titles.has(title)) {
        dupTitles.push({ title, pages: [titles.get(title), rel] });
      } else {
        titles.set(title, rel);
      }
      if (title.length < 30) {
        shortTitles.push({ rel, title, len: title.length });
      }
    }

    const descMatch = metaBlock.match(/description:\s*['"]([^'"]+)['"]/);
    if (descMatch) {
      const desc = descMatch[1];
      if (descriptions.has(desc)) {
        dupDesc.push({ desc, pages: [descriptions.get(desc), rel] });
      } else {
        descriptions.set(desc, rel);
      }
    }
  }

  // H1 check
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1Match) {
    const rawH1 = h1Match[1].replace(/<[^>]+>/g, '').trim();
    if (rawH1.length > 70) {
      longH1s.push({ rel, h1: rawH1, len: rawH1.length });
    }
  }
}

console.log('=== SCAN RESULTS ===');
console.log('Total pages analyzed:', pages.length);
console.log('Duplicate titles:', dupTitles.length);
if (dupTitles.length > 0) console.log(dupTitles);
console.log('Titles below 30 chars:', shortTitles.length);
if (shortTitles.length > 0) console.log(shortTitles);
console.log('Duplicate descriptions:', dupDesc.length);
if (dupDesc.length > 0) console.log(dupDesc);
console.log('H1 over 70 chars in page.tsx:', longH1s.length);
if (longH1s.length > 0) console.log(longH1s);

console.log('\n--- Title List ---');
for (const [t, p] of titles.entries()) {
  console.log(`${p}: "${t}" (${t.length} chars)`);
}

console.log('\n--- Description List ---');
for (const [d, p] of descriptions.entries()) {
  console.log(`${p}: "${d}" (${d.length} chars)`);
}

