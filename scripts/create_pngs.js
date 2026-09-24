import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const csDir = path.resolve('public/images/case-studies');
const imgDir = path.resolve('public/images');

const svgFiles = [
  'business-driven-software-system',
  'nlp-text-to-business-application',
  'data-to-application-development',
  'business-portals-around-existing-erp',
  'deployment-management',
];

async function generatePNGs() {
  // 1. Convert SVG to PNG
  for (const name of svgFiles) {
    const svgPath = path.join(csDir, `${name}.svg`);
    const pngPath = path.join(csDir, `${name}.png`);
    if (fs.existsSync(svgPath)) {
      await sharp(svgPath)
        .png()
        .toFile(pngPath);
      console.log(`Created PNG from SVG: ${name}.png`);
    }
  }

  // 2. Retail Demand Forecasting
  const retailSrc = path.join(imgDir, 'retail_inventory_dashboard.png');
  const retailDest = path.join(csDir, 'optimizing-retail-demand-forecasting.png');
  if (fs.existsSync(retailSrc)) {
    fs.copyFileSync(retailSrc, retailDest);
    console.log('Created optimizing-retail-demand-forecasting.png');
  }

  // 3. Optimizing Shipment and Fleet Operations
  const shipmentSrc = path.join(csDir, 'optimizing-shipment-fleet-snowflake.png');
  const shipmentDest = path.join(csDir, 'optimizing-shipment-and-fleet-operations.png');
  if (fs.existsSync(shipmentSrc)) {
    fs.copyFileSync(shipmentSrc, shipmentDest);
    console.log('Created optimizing-shipment-and-fleet-operations.png');
  }

  // 4. Streamlining Shipment Planning and Carrier Selection
  const streamliningDest = path.join(csDir, 'streamlining-shipment-planning-and-carrier-selection.png');
  if (fs.existsSync(shipmentSrc)) {
    fs.copyFileSync(shipmentSrc, streamliningDest);
    console.log('Created streamlining-shipment-planning-and-carrier-selection.png');
  }

  // 5. Migrating Hadoop and HANA to Snowflake
  const abmSrc = path.join(csDir, 'precision-abm-snowflake-cortex.png');
  const hadoopDest = path.join(csDir, 'migrating-hadoop-and-hana-to-snowflake.png');
  if (fs.existsSync(abmSrc)) {
    fs.copyFileSync(abmSrc, hadoopDest);
    console.log('Created migrating-hadoop-and-hana-to-snowflake.png');
  }

  // 6. Placeholder.png
  const placeholderDest = path.join(csDir, 'placeholder.png');
  if (fs.existsSync(shipmentSrc)) {
    fs.copyFileSync(shipmentSrc, placeholderDest);
    console.log('Created placeholder.png');
  }
}

generatePNGs().catch(console.error);
