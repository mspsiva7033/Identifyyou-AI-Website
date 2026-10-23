const fs = require('fs');
const path = require('path');

const targetPages = [
  'app/(frontend)/about/page.tsx',
  'app/(frontend)/deep-tech/page.tsx',
  'app/(frontend)/deep-tech/manufacturing/page.tsx',
  'app/(frontend)/deep-tech/supply-chain/page.tsx',
  'app/(frontend)/deep-tech/vision-ai/identifyou-visionai-intro/page.tsx',
];

function extractVisibleWords(content) {
  // Strip import/export statements and JSX tags
  let text = content
    .replace(/import[\s\S]*?from\s*['"][^'"]+['"];?/g, ' ')
    .replace(/export const metadata[\s\S]*?\n\};?/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^\}]+\}/g, ' ')
    .replace(/const\s+[\s\S]*?=\s*\[[\s\S]*?\];?/g, ' ')
    .replace(/const\s+[\s\S]*?=\s*\{[\s\S]*?\};?/g, ' ')
    .replace(/className=[^\s>]+/g, ' ')
    .replace(/style=\{[^\}]+\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text.split(/\s+/).filter(w => /[a-zA-Z0-9]/.test(w));
  return { words: words.length, sample: words.slice(0, 25).join(' ') };
}

console.log('=== LOW-CONTENT PAGES CHECK ===');
for (const p of targetPages) {
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, 'utf8');
    // Also include text from data structures rendered on page
    const totalWords = raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/import[\s\S]*?from\s*['"][^'"]+['"];?/g, ' ')
      .replace(/export const metadata[\s\S]*?\n\};?/g, ' ')
      .replace(/[{}()=;<>:'",`]/g, ' ')
      .split(/\s+/)
      .filter(w => /^[a-zA-Z]{2,}$/.test(w)).length;

    console.log(`${p}: ~${totalWords} words`);
  } else {
    console.log(`${p}: NOT FOUND`);
  }
}
