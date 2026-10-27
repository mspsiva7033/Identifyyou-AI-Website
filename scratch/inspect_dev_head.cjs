const http = require('http');

http.get('http://localhost:3000/case-studies/precision-abm-snowflake-cortex', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const headMatch = body.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const head = headMatch ? headMatch[1] : '';
    console.log('Status:', res.statusCode);
    console.log('Head length:', head.length);
    console.log('Body length:', body.length);
    console.log('head has <title:', head.includes('<title'));
    console.log('body has <title:', body.includes('<title'));
    console.log('head has description:', head.includes('name="description"'));
    console.log('body has description:', body.includes('name="description"'));
    console.log('head has canonical:', head.includes('rel="canonical"'));
    console.log('body has canonical:', body.includes('rel="canonical"'));
  });
});
