const http = require('http');

http.get('http://localhost:3000/some-404-url-test', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const headMatch = body.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    console.log('404 HEAD CONTENT:\n', headMatch ? headMatch[1] : 'NO HEAD');
  });
});
