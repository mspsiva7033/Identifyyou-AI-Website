const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) scan(p, results);
    else if (/\.(tsx|ts|jsx|js)$/.test(f)) {
      const content = fs.readFileSync(p, 'utf8');
      const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
      for (const m of hrefMatches) {
        results.push({ file: p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/'), href: m[1] });
      }
    }
  }
  return results;
}

const allLinks = scan('./app').concat(scan('./components'));
const linkMap = new Map();
for (const l of allLinks) {
  if (!linkMap.has(l.href)) linkMap.set(l.href, new Set());
  linkMap.get(l.href).add(l.file);
}

console.log('=== ALL UNIQUE INTERNAL LINKS (' + linkMap.size + ') ===');
for (const [href, files] of linkMap.entries()) {
  console.log(href + '  <=  ' + Array.from(files).join(', '));
}
