const fs = require('fs');
const path = require('path');

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeText(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
  const words = text.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '')).filter(w => w.length > 0);
  if (sentences.length === 0 || words.length === 0) return { score: 100, avgWords: 0 };

  const totalWords = words.length;
  const totalSentences = sentences.length;
  let totalSyllables = 0;
  for (const w of words) totalSyllables += countSyllables(w);

  // Flesch Reading Ease = 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
  const asl = totalWords / totalSentences;
  const asw = totalSyllables / totalWords;
  const score = 206.835 - (1.015 * asl) - (84.6 * asw);
  return { score: Math.round(score), avgWords: Math.round(asl), words: totalWords };
}

function cleanJsx(content) {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^\}]+\}/g, ' ')
    .replace(/import[\s\S]*?from\s*['"][^'"]+['"]/g, '')
    .replace(/export[\s\S]*?\{[\s\S]*?\}/g, '')
    .replace(/const[\s\S]*?=/g, '')
    .replace(/\s+/g, ' ');
}

const dir = './app/(frontend)';
function scan(d, list = []) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) scan(p, list);
    else if (f === 'page.tsx') list.push(p);
  }
  return list;
}

const pages = scan(dir);
console.log('=== FLESCH READABILITY CHECK ===');
for (const p of pages) {
  const raw = fs.readFileSync(p, 'utf8');
  const text = cleanJsx(raw);
  const stats = analyzeText(text);
  const rel = p.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/');
  console.log(`${rel}: Words=${stats.words}, AvgSentenceLen=${stats.avgWords}, FleschScore=${stats.score}`);
}
