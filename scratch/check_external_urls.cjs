const https = require('https');
const http = require('http');
const url = require('url');

const urlsToTest = [
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1000&auto=format&fit=crop',
  'https://cloud.umami.is',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    const parsed = new url.URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.request(targetUrl, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 8000 }, (res) => {
      resolve({ url: targetUrl, status: res.statusCode });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ url: targetUrl, status: 'TIMEOUT / NO_RESPONSE' });
    });
    req.on('error', (err) => {
      resolve({ url: targetUrl, status: 'ERROR: ' + err.message });
    });
    req.end();
  });
}

async function run() {
  console.log('=== CHECKING EXTERNAL URL STATUS CODES ===');
  for (const u of urlsToTest) {
    const res = await checkUrl(u);
    console.log(`${res.status} => ${res.url}`);
  }
}

run();
