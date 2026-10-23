const http = require('http');
const https = require('https');
const url = require('url');

const BASE_URL = 'http://localhost:3000';

const routesToTest = [
  '/',
  '/about',
  '/contact',
  '/deep-tech',
  '/deep-tech/vision-ai',
  '/deep-tech/vision-ai/identifyou-visionai-intro',
  '/deep-tech/manufacturing',
  '/deep-tech/supply-chain',
  '/deep-tech/ai-intelligent-business',
  '/deep-tech/ai-no-code',
  '/deep-tech/data-engineering',
  '/deep-tech/data-engineering/kmat-cost-model-app',
  '/deep-tech/data-engineering/kmat-manufacturer-price-model',
  '/deep-tech/digital-engineering',
  '/deep-tech/industry-automation',
  '/manufacturing',
  '/industrial-robots',
  '/thinking-factory',
  '/case-studies',
  '/case-studies/overcoming-data-access-challenges',
  '/blogs-and-news',
  '/blogs-and-news/ai-in-manufacturing-quality-inspection-2026',
  // Redirect tests
  '/deep-tech/default',
  '/case-studies/overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making',
  '/blogs-and-news/kmat-cost-model-app',
  '/blogs-and-news/kmat-manufacturer-price-model',
];

function fetchRoute(routePath) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${routePath}`;
    http.get(fullUrl, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          path: routePath,
          statusCode: res.statusCode,
          headers: res.headers,
          location: res.headers['location'],
          body,
        });
      });
    }).on('error', (err) => {
      resolve({
        path: routePath,
        error: err.message,
      });
    });
  });
}

async function run() {
  console.log('=== STARTING COMPLETE LIVE HTTP / SEO ROUTE AUDIT ===\n');
  const results = [];

  for (const r of routesToTest) {
    const data = await fetchRoute(r);
    if (data.error) {
      console.log(`[FAIL] ${r} -> Error: ${data.error}`);
      results.push({ path: r, status: 'ERROR', error: data.error });
      continue;
    }

    if (data.statusCode >= 300 && data.statusCode < 400) {
      console.log(`[REDIRECT ${data.statusCode}] ${r} -> ${data.location}`);
      results.push({
        path: r,
        status: `REDIRECT_${data.statusCode}`,
        destination: data.location,
        hasXFrame: !!data.headers['x-frame-options'],
        hasXContentType: !!data.headers['x-content-type-options'],
        hasReferrer: !!data.headers['referrer-policy'],
        hasCsp: !!data.headers['content-security-policy'],
      });
      continue;
    }

    const body = data.body;
    const headMatch = body.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const head = headMatch ? headMatch[1] : '';

    // Search head first, fall back to entire body for streaming SSR metadata chunks
    const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = head.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || body.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1].trim() : null;

    const canonicalMatch = head.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

    const robotsMatch = head.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i) || body.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    const robots = robotsMatch ? robotsMatch[1].trim() : null;

    const h1Matches = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2Matches = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // Check security headers
    const xFrame = data.headers['x-frame-options'];
    const xContentType = data.headers['x-content-type-options'];
    const referrerPolicy = data.headers['referrer-policy'];
    const csp = data.headers['content-security-policy'];

    // Check for localhost in canonical
    const canonicalHasLocalhost = canonical ? (canonical.includes('localhost') || canonical.includes('127.0.0.1')) : false;

    // Check image tags
    const imgMatches = [...body.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
    const imagesWithoutDimensions = imgMatches.filter(m => !m[0].includes('width=') || !m[0].includes('height='));

    results.push({
      path: r,
      statusCode: data.statusCode,
      xFrame: xFrame || 'MISSING',
      xContentType: xContentType || 'MISSING',
      referrerPolicy: referrerPolicy || 'MISSING',
      hasCsp: !!csp,
      title: title || 'MISSING',
      titleLength: title ? title.length : 0,
      titleInHead: !!titleMatch,
      descLength: desc ? desc.length : 0,
      descInHead: !!descMatch,
      canonical: canonical || 'MISSING',
      canonicalInHead: !!canonicalMatch,
      canonicalHasLocalhost,
      robots: robots || 'none',
      h1Count: h1Matches.length,
      h1: h1Matches[0] || 'NONE',
      h1Over70: h1Matches.some(h => h.length > 70),
      h2Count: h2Matches.length,
      duplicateH2s: h2Matches.length !== new Set(h2Matches).size,
      imagesMissingDimensions: imagesWithoutDimensions.length,
    });

    console.log(`[STATUS ${data.statusCode}] ${r}`);
    console.log(`  Title (${title ? title.length : 0}c): "${title}" [inHead: ${!!titleMatch}]`);
    console.log(`  Desc (${desc ? desc.length : 0}c): "${desc ? desc.slice(0, 60) + '...' : 'MISSING'}" [inHead: ${!!descMatch}]`);
    console.log(`  Canonical: "${canonical}" [inHead: ${!!canonicalMatch}, hasLocalhost: ${canonicalHasLocalhost}]`);
    console.log(`  Robots: "${robots}" | H1 (${h1Matches.length}): "${h1Matches[0] || 'NONE'}"`);
    console.log(`  H2 count: ${h2Matches.length} | Duplicate H2s: ${h2Matches.length !== new Set(h2Matches).size}`);
    console.log(`  Security Headers: X-Frame=${xFrame}, X-Content-Type=${xContentType}, Referrer=${referrerPolicy}, CSP=${!!csp}`);
    console.log('');
  }

  // Summary
  console.log('=== SUMMARY OF LIVE HTTP VERIFICATION ===');
  const missingHeaders = results.filter(r => r.statusCode === 200 && (r.xFrame === 'MISSING' || r.xContentType === 'MISSING' || r.referrerPolicy === 'MISSING' || !r.hasCsp));
  const missingCanonicals = results.filter(r => r.statusCode === 200 && (!r.canonicalInHead || r.canonical === 'MISSING'));
  const titlesOutsideHead = results.filter(r => r.statusCode === 200 && !r.titleInHead);
  const descsOutsideHead = results.filter(r => r.statusCode === 200 && !r.descInHead);
  const badTitles = results.filter(r => r.statusCode === 200 && (r.titleLength < 30 || r.titleLength > 60));
  const badH1s = results.filter(r => r.statusCode === 200 && (r.h1Count !== 1 || r.h1Over70));
  const dupH2Pages = results.filter(r => r.statusCode === 200 && r.duplicateH2s);
  const localhostCanonicals = results.filter(r => r.canonicalHasLocalhost);

  console.log(`Total routes checked: ${results.length}`);
  console.log(`Pages with missing security headers: ${missingHeaders.length}`);
  console.log(`Pages with canonicals missing or outside <head>: ${missingCanonicals.length}`);
  console.log(`Pages with titles outside <head>: ${titlesOutsideHead.length}`);
  console.log(`Pages with descriptions outside <head>: ${descsOutsideHead.length}`);
  console.log(`Pages with title length issues (<30 or >60): ${badTitles.length}`);
  console.log(`Pages with H1 issues (!=1 or >70): ${badH1s.length}`);
  console.log(`Pages with duplicate H2s: ${dupH2Pages.length}`);
  console.log(`Pages with localhost canonicals: ${localhostCanonicals.length}`);
}

run();
