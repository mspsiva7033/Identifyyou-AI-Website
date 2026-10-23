const http = require('http');

http.get('http://localhost:3000/case-studies/overcoming-data-access-challenges', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const titles = body.match(/<title[^>]*>([\s\S]*?)<\/title>/gi);
    const canonicals = body.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi);
    const descriptions = body.match(/<meta[^>]+name=["']description["'][^>]*>/gi);
    console.log('TITLES FOUND:', titles);
    console.log('CANONICALS FOUND:', canonicals);
    console.log('DESCRIPTIONS FOUND:', descriptions);
  });
});
