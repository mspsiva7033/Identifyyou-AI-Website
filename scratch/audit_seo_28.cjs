const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Helper to get all files in directory
function getFiles(dir, matchExt = /\.(tsx|ts|jsx|js)$/, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, matchExt, fileList);
    } else if (matchExt.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 1. Scan all static pages in app/(frontend)
const pageFiles = getFiles('./app/(frontend)', /page\.tsx$/);

console.log('Total pages found:', pageFiles.length);

const results = {
  shortTitles: [],
  longTitles: [],
  pixelRiskTitles: [],
  duplicateTitles: new Map(),
  missingCanonicals: [],
  duplicateDescriptions: new Map(),
  shortDescriptions: [],
  longDescriptions: [],
  multiH1: [],
  longH1: [],
  duplicateH1: new Map(),
  duplicateH2: [],
  hierarchyIssues: [],
  readabilityScores: [],
  lowContentPages: [],
  imagesOver100KB: [],
  longUrls: [],
  internalLinksToRedirects: [],
  internal404s: [],
  externalUrls: new Set(),
};

// Check images over 100KB
const imageFiles = getFiles('./public', /\.(png|jpe?g|webp|gif|svg|ico)$/i);
for (const img of imageFiles) {
  const stat = fs.statSync(img);
  if (stat.size > 102400) {
    results.imagesOver100KB.push({ file: img.replace(/\\/g, '/'), size: Math.round(stat.size / 1024) + ' KB' });
  }
}

// Analyze pages
for (const p of pageFiles) {
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  const content = fs.readFileSync(p, 'utf8');

  // Title & description & canonical
  const metaMatch = content.match(/export const metadata(?::\s*Metadata)?\s*=\s*\{([\s\S]*?)\n\}/);
  let title = null;
  let desc = null;
  let canonical = null;

  if (metaMatch) {
    const metaBlock = metaMatch[1];
    const absMatch = metaBlock.match(/absolute:\s*['"]([^'"]+)['"]/);
    const titleMatch = metaBlock.match(/title:\s*['"]([^'"]+)['"]/);
    title = absMatch ? absMatch[1] : (titleMatch ? titleMatch[1] : null);

    const descMatch = metaBlock.match(/description:\s*['"]([^'"]+)['"]/);
    if (descMatch) desc = descMatch[1];

    const canMatch = metaBlock.match(/canonical:\s*['"]([^'"]+)['"]/);
    if (canMatch) canonical = canMatch[1];
  }

  // Next.js layout title template adds " | IdentifYou" (+14 characters) unless absolute is used
  // Or in dynamic pages generateMetadata is used
  if (title) {
    // If layout appends " | IdentifYou", full title is:
    const fullTitle = title.includes('IdentifYou') ? title : `${title} | IdentifYou`;
    
    if (fullTitle.length < 30) {
      results.shortTitles.push({ rel, title, fullTitle, len: fullTitle.length });
    }
    if (fullTitle.length > 60) {
      results.longTitles.push({ rel, title, fullTitle, len: fullTitle.length });
    }
    // Titles exceeding ~561 pixels: roughly > 55-60 characters or many wide characters
    if (fullTitle.length > 57) {
      results.pixelRiskTitles.push({ rel, fullTitle, len: fullTitle.length });
    }

    if (!results.duplicateTitles.has(title)) results.duplicateTitles.set(title, []);
    results.duplicateTitles.get(title).push(rel);
  } else if (!content.includes('generateMetadata') && !content.includes('redirect(')) {
    results.shortTitles.push({ rel, title: 'MISSING', len: 0 });
  }

  if (desc) {
    if (!results.duplicateDescriptions.has(desc)) results.duplicateDescriptions.set(desc, []);
    results.duplicateDescriptions.get(desc).push(rel);
  }

  if (!canonical && !content.includes('generateMetadata') && !content.includes('redirect(')) {
    results.missingCanonicals.push(rel);
  }

  // Heading check (H1 & H2)
  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  if (h1Matches.length > 1) {
    results.multiH1.push({ rel, count: h1Matches.length, h1s: h1Matches });
  }
  for (const h1 of h1Matches) {
    if (h1.length > 70) results.longH1.push({ rel, h1, len: h1.length });
    if (!results.duplicateH1.has(h1)) results.duplicateH1.set(h1, []);
    results.duplicateH1.get(h1).push(rel);
  }

  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2Set = new Set();
  const dupH2InPage = [];
  for (const h2 of h2Matches) {
    if (h2Set.has(h2)) dupH2InPage.push(h2);
    else h2Set.add(h2);
  }
  if (dupH2InPage.length > 0) {
    results.duplicateH2.push({ rel, duplicates: dupH2InPage });
  }

  // Check URLs exceeding 115 chars
  // Route path length:
  const routePath = rel.replace('app/(frontend)', '').replace('/page.tsx', '') || '/';
  const fullCanonicalUrl = `https://identifyyou.ai${routePath}`;
  if (fullCanonicalUrl.length > 115) {
    results.longUrls.push({ rel, fullCanonicalUrl, len: fullCanonicalUrl.length });
  }
}

// Find external URLs
const allCodeFiles = getFiles('./app').concat(getFiles('./components')).concat(getFiles('./lib'));
for (const file of allCodeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const urls = content.match(/https?:\/\/[^\s'"`,;><)\\\*]+/g);
  if (urls) {
    for (const u of urls) {
      if (!u.includes('localhost') && !u.includes('127.0.0.1') && !u.includes('schema.org') && !u.includes('w3.org') && !u.includes('fonts.googleapis') && !u.includes('fonts.gstatic')) {
        results.externalUrls.add(u);
      }
    }
  }
}

console.log('=== AUDIT PREVIEW ===');
console.log('Short titles (<30 full):', results.shortTitles);
console.log('Long titles (>60 full):', results.longTitles);
console.log('Pixel risk titles (>57 full):', results.pixelRiskTitles);
console.log('Duplicate titles:', Array.from(results.duplicateTitles.entries()).filter(([t, p]) => p.length > 1));
console.log('Duplicate descriptions:', Array.from(results.duplicateDescriptions.entries()).filter(([d, p]) => p.length > 1));
console.log('Missing canonicals:', results.missingCanonicals);
console.log('Duplicate H2s:', results.duplicateH2);
console.log('Multi H1s:', results.multiH1);
console.log('Long H1s (>70):', results.longH1);
console.log('Duplicate H1s:', Array.from(results.duplicateH1.entries()).filter(([h, p]) => p.length > 1));
console.log('Images over 100KB:', results.imagesOver100KB);
console.log('URLs > 115 chars:', results.longUrls);
console.log('External URLs found:', Array.from(results.externalUrls));
