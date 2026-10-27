const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) getFiles(p, fileList);
    else if (/\.(tsx|jsx)$/.test(f)) fileList.push(p);
  }
  return fileList;
}

const files = getFiles('./app/(frontend)').concat(getFiles('./components'));

const issues = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const headings = [];
  const regex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1].substring(1), 10),
      tag: match[1],
      text: match[2].replace(/<[^>]+>/g, '').trim(),
    });
  }

  let lastLevel = 0;
  for (const h of headings) {
    if (lastLevel > 0 && h.level > lastLevel + 1) {
      issues.push({
        file: file.replace(/.*identifyyou-nextjs[\\\/]/, '').replace(/\\/g, '/'),
        msg: `Jump from <h${lastLevel}> to <h${h.level}> ("${h.text}")`,
      });
    }
    lastLevel = h.level;
  }
}

console.log('Heading hierarchy skip issues:', issues.length);
if (issues.length > 0) console.log(issues);
