const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      scan(p, results);
    } else if (/\.(tsx|ts|js|jsx)$/.test(f)) {
      const content = fs.readFileSync(p, 'utf8');
      const matches = content.matchAll(/https?:\/\/[^\s'"`,;><)\\\*]+/g);
      for (const m of matches) {
        results.push({ file: p.replace(/.*identifyyou-nextjs[\\\/]/, ''), url: m[0] });
      }
    }
  }
  return results;
}

const dirs = ['./app', './components', './lib'];
let all = [];
for (const d of dirs) {
  if (fs.existsSync(d)) all = all.concat(scan(d));
}

const map = new Map();
for (const item of all) {
  if (!map.has(item.url)) map.set(item.url, []);
  map.get(item.url).push(item.file);
}

console.log('=== APP, COMPONENTS, LIB URL SCAN ===');
for (const [u, files] of map.entries()) {
  console.log(`${u} => ${[...new Set(files)].join(', ')}`);
}
