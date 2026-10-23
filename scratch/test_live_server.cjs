const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('SECURITY HEADERS:');
  console.log('x-frame-options:', res.headers['x-frame-options']);
  console.log('x-content-type-options:', res.headers['x-content-type-options']);
  console.log('referrer-policy:', res.headers['referrer-policy']);
  console.log('content-security-policy:', res.headers['content-security-policy']);

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML HEAD DETAILS:');
    const headMatch = data.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      const head = headMatch[1];
      const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const desc = head.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      const canonical = head.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      const robots = head.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);

      console.log('Title in <head>:', title ? title[1] : 'MISSING');
      console.log('Meta description in <head>:', desc ? desc[1] : 'MISSING');
      console.log('Canonical in <head>:', canonical ? canonical[1] : 'MISSING');
      console.log('Robots in <head>:', robots ? robots[1] : 'MISSING');
    } else {
      console.log('NO <head> FOUND');
    }
  });
}).on('error', (e) => {
  console.error('ERROR:', e.message);
});
