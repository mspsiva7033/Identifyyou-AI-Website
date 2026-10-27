const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  console.log('Optimizing public/media/sample-deep-tech-chip.jpg...');
  const inputChip = fs.readFileSync('public/media/sample-deep-tech-chip.jpg');
  const chipBuffer = await sharp(inputChip)
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();
  fs.writeFileSync('public/media/sample-deep-tech-chip.jpg', chipBuffer);
  console.log('New sample-deep-tech-chip.jpg size:', chipBuffer.length, 'bytes (~' + Math.round(chipBuffer.length / 1024) + ' KB)');

  console.log('Optimizing public/images/case-studies/risk-insights-finance.png...');
  const inputRisk = fs.readFileSync('public/images/case-studies/risk-insights-finance.png');
  const riskBuffer = await sharp(inputRisk)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
  fs.writeFileSync('public/images/case-studies/risk-insights-finance.png', riskBuffer);
  console.log('New risk-insights-finance.png size:', riskBuffer.length, 'bytes (~' + Math.round(riskBuffer.length / 1024) + ' KB)');
}

optimize().catch(console.error);
