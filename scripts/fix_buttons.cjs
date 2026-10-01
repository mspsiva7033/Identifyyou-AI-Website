const fs = require('fs');
const path = require('path');

const directory = 'e:/identifyyou_website/identifyyou-nextjs';

function getCssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getCssFiles(fullPath, fileList);
    } else if (file.endsWith('.css')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const cssFiles = getCssFiles(directory);

function fixCss(content) {
  // Regex to find CSS rule blocks
  const pattern = /([^{]+)\{([^}]+)\}/g;
  
  return content.replace(pattern, (match, selector, body) => {
    // If this rule has background: #94C640
    if (body.includes('background: #94C640') || body.includes('background-color: #94C640')) {
      // Check if hover
      if (selector.includes(':hover')) {
        // Add or replace color to white
        if (body.includes('color:')) {
          body = body.replace(/color:\s*[^;]+;/, 'color: #FFFFFF;');
        } else {
          body = body.trimEnd() + ' color: #FFFFFF; ';
        }
      } else {
        // Add or replace color to black
        if (body.includes('color:')) {
          body = body.replace(/color:\s*[^;]+;/, 'color: #0D1612;');
        } else {
          body = body.trimEnd() + ' color: #0D1612; ';
        }
        
        // Add transition if missing
        if (!body.includes('transition:')) {
          body = body.trimEnd() + ' transition: all 150ms ease; ';
        }
      }
    }
    return `${selector}{${body}}`;
  });
}

for (const filepath of cssFiles) {
  const content = fs.readFileSync(filepath, 'utf8');
  const newContent = fixCss(content);
  if (newContent !== content) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Updated ${filepath}`);
  }
}
