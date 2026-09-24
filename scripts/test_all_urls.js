import http from 'http';

const urls = [
  '/',
  '/case-studies/optimizing-shipment-and-fleet-operations',
  '/case-studies/streamlining-shipment-planning-and-carrier-selection',
  '/case-studies',
  '/manufacturing',
  '/case-studies/data-to-application-development',
  '/case-studies/business-driven-software-system',
  '/case-studies/deployment-management',
  '/case-studies/business-portals-around-existing-erp',
  '/case-studies/nlp-text-to-business-application',
  '/blogs-and-news/snowflake-cortex-ai-manufacturing-data-platform',
  '/blogs-and-news/no-code-ai-platforms-for-enterprise-workflows',
  '/blogs-and-news/deep-tech-computer-vision-assembly-lines',
  '/blogs-and-news/predictive-maintenance-iiot-sensor-fusion',
  '/blogs-and-news/building-connected-factories-opc-ua-mqtt-edge',
  '/blogs-and-news/ai-in-manufacturing-quality-inspection-2026',
  '/case-studies/optimizing-retail-demand-forecasting',
  '/images/case-studies/business-driven-software-system.png',
  '/images/case-studies/nlp-text-to-business-application.png',
  '/images/case-studies/data-to-application-development.png',
  '/images/case-studies/business-portals-around-existing-erp.png',
  '/images/case-studies/deployment-management.png',
  '/deep-tech/supply-chain',
  '/deep-tech/default',
  '/images/case-studies/optimizing-retail-demand-forecasting.png',
  '/deep-tech/manufacturing',
  '/case-studies/migrating-hadoop-and-hana-to-snowflake',
  '/case-studies/precision-abm-snowflake-cortex',
  '/deep-tech/ai-no-code',
];

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      resolve({ url: urlPath, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url: urlPath, status: 'ERROR: ' + err.message });
    });
  });
}

async function testAll() {
  console.log('Testing URLs on http://localhost:3000...');
  let passCount = 0;
  for (const url of urls) {
    const res = await fetchUrl(url);
    const pass = res.status === 200;
    if (pass) passCount++;
    console.log(`[${pass ? 'PASS 200' : 'FAIL ' + res.status}] ${res.url}`);
  }
  console.log(`Summary: ${passCount}/${urls.length} passed.`);
}

testAll().catch(console.error);
