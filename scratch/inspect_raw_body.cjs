const http = require('http');

http.get('http://localhost:3000/case-studies/overcoming-data-access-challenges', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const headEnd = body.indexOf('</head>');
    console.log('</head> index:', headEnd);
    const titleIdx = body.indexOf('<title');
    console.log('<title> index:', titleIdx);
    console.log('Snippet around <title>:\n', body.substring(titleIdx - 150, titleIdx + 300));
  });
});
