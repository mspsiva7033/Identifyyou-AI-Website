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
        const full = 'https://identifyyou.ai' + m[1];
        if (full.length > 115) results.push({ file: p, url: full, len: full.length });
      }
    }
  }
  return results;
}

const longUrls = scan('./app').concat(scan('./components'));
console.log('URLs > 115 chars found:', longUrls.length);
if (longUrls.length > 0) console.log(longUrls);
