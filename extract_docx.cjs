const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const docxPath = 'E:/identifyyou_website/case studies/Pillar Case Studies/Vision AI/supporting document/end to end Inspection Cell.docx';
const tempDir = 'E:/identifyyou_website/temp_docx_extract';

// Extract
try { fs.mkdirSync(tempDir, { recursive: true }); } catch(e) {}
execSync(`powershell -Command "Expand-Archive -Path '${docxPath}' -DestinationPath '${tempDir}' -Force"`);

const xml = fs.readFileSync(path.join(tempDir, 'word', 'document.xml'), 'utf8');

// Parse paragraphs - simple approach
const paraMatches = xml.split('<w:p ').slice(1);

for (const para of paraMatches) {
  const fullPara = '<w:p ' + para.split('</w:p>')[0] + '</w:p>';
  
  // Get style
  let style = 'Normal';
  const sm = fullPara.match(/<w:pStyle w:val="([^"]+)"/);
  if (sm) style = sm[1];
  
  // Get all text nodes
  const tMatches = fullPara.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
  const text = tMatches.map(t => t.replace(/<[^>]*>/g, '')).join('');
  
  if (text.trim()) {
    console.log('[' + style + '] ' + text);
  }
}
