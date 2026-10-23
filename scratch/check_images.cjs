const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      scan(p, results);
    } else if (/\.(png|jpe?g|webp|gif)$/i.test(f)) {
      const stats = fs.statSync(p);
      results.push({ path: p.replace(/.*identifyyou-nextjs[\\\/]/, ''), sizeKB: Math.round(stats.size / 1024), bytes: stats.size });
    }
  }
  return results;
}

const images = scan('./public/images');
const over100KB = images.filter(img => img.bytes > 102400);

console.log('=== IMAGE SIZE VALIDATION ===');
console.log('Total images scanned:', images.length);
console.log('Images over 100 KB:', over100KB.length);
if (over100KB.length > 0) {
  console.log(over100KB);
} else {
  console.log('ALL images are strictly under 100 KB!');
}
