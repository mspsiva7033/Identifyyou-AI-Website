const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) getFiles(p, fileList);
    else if (f === 'page.tsx') fileList.push(p);
  }
  return fileList;
}

const pages = getFiles('./app/(frontend)');

console.log('=== HEADING AUDIT ACROSS ALL ' + pages.length + ' PAGES ===\n');

for (const p of pages) {
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  const content = fs.readFileSync(p, 'utf8');

  // Extract all headings in order of appearance
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1].substring(1), 10),
      tag: match[1].toLowerCase(),
      text: match[2].replace(/<[^>]+>/g, '').trim(),
    });
  }

  const h1s = headings.filter(h => h.level === 1);
  const h2s = headings.filter(h => h.level === 2);
  const h2Texts = h2s.map(h => h.text);
  const duplicateH2s = h2Texts.filter((item, index) => h2Texts.indexOf(item) !== index);

  // Check hierarchy issues
  const hierarchyErrors = [];
  let lastLevel = 0;
  for (const h of headings) {
    if (lastLevel > 0 && h.level > lastLevel + 1) {
      hierarchyErrors.push(`Skipped level: <h${lastLevel}> followed directly by <h${h.level}> ("${h.text}")`);
    }
    lastLevel = h.level;
  }

  // Also check if multiple H2s exist without H1 or if H1 comes after H2
  const firstH1Idx = headings.findIndex(h => h.level === 1);
  const firstH2Idx = headings.findIndex(h => h.level === 2);
  if (firstH2Idx !== -1 && firstH1Idx !== -1 && firstH2Idx < firstH1Idx) {
    hierarchyErrors.push(`Inappropriate order: <h2 (${headings[firstH2Idx].text})> appears BEFORE <h1 (${headings[firstH1Idx].text})>`);
  }

  const hasIssues = h1s.length !== 1 || h1s.some(h => h.text.length > 70) || duplicateH2s.length > 0 || hierarchyErrors.length > 0;

  if (hasIssues) {
    console.log(`PAGE: ${rel}`);
    if (h1s.length === 0) console.log(`  [ISSUE] Missing H1`);
    if (h1s.length > 1) console.log(`  [ISSUE] Multiple H1s (${h1s.length}):`, h1s.map(h => `"${h.text}" (${h.text.length}c)`));
    h1s.filter(h => h.text.length > 70).forEach(h => console.log(`  [ISSUE] H1 over 70 chars (${h.text.length}c): "${h.text}"`));
    if (duplicateH2s.length > 0) console.log(`  [ISSUE] Duplicate H2s:`, duplicateH2s);
    if (hierarchyErrors.length > 0) console.log(`  [ISSUE] Hierarchy:`, hierarchyErrors);
    console.log('');
  }
}
