const http = require('http');

function getPage(path) {
  return new Promise((resolve) => {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: path,
      headers: { 'Accept': 'text/html' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', (e) => resolve({ status: 500, error: e.message }));
  });
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function calculateFlesch(text) {
  // Strip code, scripts, etc.
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.match(/\b[A-Za-z]+\b/g) || [];
  if (words.length === 0 || sentences.length === 0) return { score: 100, words: 0, sentences: 0 };
  
  let syllables = 0;
  for (const w of words) {
    syllables += countSyllables(w);
  }

  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = syllables / words.length;
  // Flesch Reading Ease formula
  const flesch = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
  return {
    score: Math.round(flesch * 10) / 10,
    words: words.length,
    sentences: sentences.length,
    syllables
  };
}

function extractMainText(html) {
  // remove <script>, <style>, <svg>, <nav>, <header>, <footer>
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  clean = clean.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '');
  clean = clean.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '');
  clean = clean.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');
  // strip tags
  clean = clean.replace(/<[^>]+>/g, ' ');
  // unescape entities
  clean = clean.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return clean.replace(/\s+/g, ' ').trim();
}

async function run() {
  const routes = [
    '/',
    '/about',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/deep-tech',
    '/deep-tech/vision-ai',
    '/deep-tech/vision-ai/identifyou-visionai-intro',
    '/deep-tech/industrial-automation',
    '/deep-tech/data-engineering',
    '/deep-tech/digital-engineering',
    '/deep-tech/manufacturing',
    '/deep-tech/supply-chain',
    '/industrial-robots',
    '/thinking-factory',
    '/blogs-and-news',
    '/case-studies',
    '/case-studies/overcoming-data-access-challenges',
    '/case-studies/towards-zero-inventory-variance-automation',
    '/case-studies/procurement-operations-intelligence',
    '/blogs-and-news/ai-in-manufacturing-quality-inspection-2026',
    '/blogs-and-news/building-connected-factories-opc-ua-mqtt-edge',
    '/blogs-and-news/snowflake-cortex-ai-manufacturing-data-platform'
  ];

  console.log('ROUTE | WORDS | FLESCH SCORE | RATING');
  for (const r of routes) {
    const res = await getPage(r);
    if (res.status === 200) {
      const text = extractMainText(res.html);
      const metrics = calculateFlesch(text);
      let rating = 'Normal (60-100)';
      if (metrics.score < 30) rating = 'VERY DIFFICULT (<30)';
      else if (metrics.score < 50) rating = 'DIFFICULT (30-50)';
      else if (metrics.score < 60) rating = 'Fairly Difficult (50-60)';
      
      const low = metrics.words < 250 ? ' [LOW CONTENT]' : '';
      console.log(`${r} | ${metrics.words} words | Flesch ${metrics.score} | ${rating}${low}`);
    } else {
      console.log(`${r} -> Status ${res.status}`);
    }
  }
}

run();
