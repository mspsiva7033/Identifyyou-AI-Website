const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git' && f !== 'scratch') scan(p, results);
    } else if (/\.(tsx|ts|js|jsx|json)$/.test(f)) {
      const content = fs.readFileSync(p, 'utf8');
      const matches = content.matchAll(/https?:\/\/[^\s'"`,;><)\\\*]+/g);
      for (const m of matches) {
        results.push({ file: p.replace(/.*identifyyou-nextjs[\\\/]/, ''), url: m[0] });
      }
    }
  }
  return results;
}

const urls = scan('.');
const urlSet = new Map();
for (const item of urls) {
  if (!urlSet.has(item.url)) urlSet.set(item.url, []);
  urlSet.get(item.url).push(item.file);
}

console.log('=== EXTERNAL AND ABSOLUTE URL SCAN ===');
console.log('Unique URLs found:', urlSet.size);
for (const [u, files] of urlSet.entries()) {
  console.log(`${u} (in ${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''})`);
}
