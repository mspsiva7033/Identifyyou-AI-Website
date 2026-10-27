const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      scan(p, results);
    } else if (/\.(tsx|ts|jsx|js)$/.test(f)) {
      const content = fs.readFileSync(p, 'utf8');
      const matches = content.matchAll(/href=["'](https?:\/\/[^"']+)["']/g);
      for (const m of matches) {
        results.push({ file: p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/'), url: m[1] });
      }
    }
  }
  return results;
}

const externalHrefs = scan('./app').concat(scan('./components'));
console.log('=== EXTERNAL HREF LINKS IN JSX/COMPONENTS ===');
console.log(externalHrefs);
