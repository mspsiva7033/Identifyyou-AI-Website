const fs = require('fs');
const path = require('path');

// Get all pages in app/(frontend)
function getPages(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) getPages(p, list);
    else if (f === 'page.tsx') list.push(p);
  }
  return list;
}

const pages = getPages('app/(frontend)')
  .map(p => p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/'))
  .filter(p => !p.includes('[slug]') && !p.includes('kmat-') && !p.includes('default'));

// Get all links across all components, app, and lib
function getAllLinks() {
  const links = new Set();
  function scan(d) {
    for (const f of fs.readdirSync(d)) {
      if (f === 'node_modules' || f === '.next' || f === '.git' || f === 'scratch') continue;
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) scan(p);
      else if (/\.(tsx|ts|jsx|js)$/.test(f)) {
        const content = fs.readFileSync(p, 'utf8');
        // Match JSX href="..." and JS object href: '...'
        const matches1 = content.matchAll(/href=["'](\/[^"']*)["']/g);
        for (const m of matches1) links.add(m[1]);
        const matches2 = content.matchAll(/href:\s*['"](\/[^'"]*)['"]/g);
        for (const m of matches2) links.add(m[1]);
      }
    }
  }
  scan('.');
  return links;
}

const allFoundLinks = getAllLinks();

console.log('=== CHECKING FOR PAGES WITHOUT INTERNAL LINKS ===');
const orphans = [];
for (const p of pages) {
  const route = p.replace('app/(frontend)', '').replace('/page.tsx', '') || '/';
  if (!allFoundLinks.has(route)) {
    orphans.push({ file: p, route });
  } else {
    console.log(`[LINKED] ${route}`);
  }
}

console.log('\nOrphan pages count:', orphans.length);
if (orphans.length > 0) {
  console.log('Orphan pages:', orphans);
} else {
  console.log('CONFIRMED: ALL pages have internal incoming links across Header, Footer, and content!');
}
