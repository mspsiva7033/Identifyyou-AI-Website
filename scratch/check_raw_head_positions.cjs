const http = require('http');

const routes = [
  '/',
  '/about',
  '/case-studies',
  '/case-studies/overcoming-data-access-challenges',
  '/blogs-and-news',
  '/blogs-and-news/ai-in-manufacturing-quality-inspection-2026',
  '/deep-tech',
  '/some-404-url-test',
];

function checkRawHtml(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const headEndIdx = body.indexOf('</head>');
        const bodyStartIdx = body.indexOf('<body');
        
        // Check positions of tags
        const titleIdx = body.indexOf('<title');
        const descIdx = body.indexOf('name="description"');
        const canonicalIdx = body.indexOf('rel="canonical"');
        const robotsIdx = body.indexOf('name="robots"');

        const titleInHead = headEndIdx !== -1 && titleIdx !== -1 && titleIdx < headEndIdx;
        const descInHead = headEndIdx !== -1 && descIdx !== -1 && descIdx < headEndIdx;
        const canonicalInHead = headEndIdx !== -1 && canonicalIdx !== -1 && canonicalIdx < headEndIdx;
        const robotsInHead = headEndIdx !== -1 && robotsIdx !== -1 && robotsIdx < headEndIdx;

        resolve({
          route,
          status: res.statusCode,
          headEndIdx,
          bodyStartIdx,
          titleInHead,
          descInHead,
          canonicalInHead,
          robotsInHead,
        });
      });
    });
  });
}

async function run() {
  console.log('=== RAW HTML HEAD TAG POSITION VALIDATION ===');
  for (const r of routes) {
    const res = await checkRawHtml(r);
    console.log(`${res.route} (HTTP ${res.status}):`);
    console.log(`  <title> in <head>: ${res.titleInHead}`);
    console.log(`  <meta description> in <head>: ${res.descInHead}`);
    console.log(`  <link canonical> in <head>: ${res.canonicalInHead}`);
    console.log(`  <meta robots> in <head>: ${res.robotsInHead}`);
    console.log('');
  }
}

run();
