const http = require('http');

http.get('http://localhost:3000/case-studies/overcoming-data-access-challenges', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const canonicalMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
    const robotsMatch = body.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
    const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('HTTP Status:', res.statusCode);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
    console.log('Canonical:', canonicalMatch ? canonicalMatch[0] : 'NONE');
    console.log('Robots:', robotsMatch ? robotsMatch[0] : 'NONE');
    console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE');
  });
});
