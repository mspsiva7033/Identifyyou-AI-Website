const fs = require('fs');
const content = fs.readFileSync('lib/payload.ts', 'utf8');

const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const longTitles = titleMatches.filter(t => t.length > 70);
console.log('Total titles found in payload.ts:', titleMatches.length);
console.log('Titles > 70 chars in payload.ts:', longTitles.length);
for (const t of longTitles) {
  console.log(`(${t.length}c): "${t}"`);
}
