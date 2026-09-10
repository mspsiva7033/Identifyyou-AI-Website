import { getPayload } from 'payload'
import config from '../payload.config'

export async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Payload CMS data...')

  // Seed Case Study Categories
  const manufacturingCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'Smart factory, MES, and connected manufacturing case studies.',
      displayOrder: 1,
    },
  })

  const supplyChainCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Supply Chain',
      slug: 'supply-chain',
      description: 'Procurement, inventory and logistics case studies.',
      displayOrder: 2,
    },
  })

  // Seed Case Studies
  await payload.create({
    collection: 'case-studies',
    draft: false,
    data: {
      title: 'Revolutionizing Inventory Optimization With AI and Data Engineering',
      slug: 'revolutionizing-inventory-optimization',
      template: 'classic',
      category: supplyChainCat.id,
      status: 'published',
      displayOrder: 1,
      tags: [{ tag: 'Manufacturing · Data Engineering · AI' }],
      filterCategories: [{ category: 'Manufacturing' }, { category: 'Supply Chain' }, { category: 'AI' }, { category: 'Data' }],
      summary: {
        challenge: 'Batch-oriented systems delay insight into current stock levels.',
        objective: 'Real-time visibility and predictive demand forecasting.',
        solution: 'Unified inventory platform on Snowflake with predictive models.',
        deepTech: 'Data Engineering + Predictive AI.',
        tech: 'Snowflake + PySpark + Snowflake Cortex AI + Power BI',
        integration: 'POS + WMS + IoT Sensors',
        outcome: '40% reduction in stockouts of high-demand items.',
      },
      detail: {
        shortDescription: 'Inventory management sits at the center of manufacturing and retail operations.',
        technologyUsed: 'Snowflake + PySpark + Snowflake Cortex AI + Power BI + Python',
        challenges: [
          { title: 'Lack of Real-Time Visibility', description: 'Batch-oriented systems delay insight into current stock levels.' },
          { title: 'Unreliable Demand Forecasting', description: 'Historical data alone misses seasonal trends.' },
          { title: 'High Carrying Costs', description: 'Overstock increases warehousing expense.' },
        ],
        results: [
          { stat: '↓ 40%', label: 'Stockouts of high-demand items' },
          { stat: '↑ 15%', label: 'Seasonal sales revenue' },
          { stat: '↓ 20%', label: 'Operational / carrying costs' },
        ],
      },
    },
  })

  await payload.create({
    collection: 'case-studies',
    draft: false,
    data: {
      title: 'AI-Powered Procurement',
      slug: 'ai-powered-procurement',
      template: 'classic',
      category: manufacturingCat.id,
      status: 'published',
      displayOrder: 2,
      tags: [{ tag: 'Manufacturing · AI' }],
      filterCategories: [{ category: 'Manufacturing' }, { category: 'Supply Chain' }, { category: 'AI' }],
      summary: {
        challenge: 'Supplier selection depends heavily on manual analysis.',
        objective: 'Reduce manual effort and improve supplier decision quality.',
        solution: 'AI-powered Top 5 Supplier Recommendation.',
        deepTech: 'AI + Explainable AI.',
        tech: 'Python + PySpark + Snowflake Cortex AI',
        integration: 'SAP ERP.',
        outcome: 'Faster and more data-driven procurement decisions.',
      },
      detail: {
        shortDescription: 'Enterprise procurement teams handle thousands of vendor contracts and purchase orders annually.',
        technologyUsed: 'Python + PySpark + Snowflake Cortex AI + SAP ERP Integration',
        challenges: [
          { title: 'Manual Vendor Evaluation', description: 'Evaluating vendor track records across lead times and pricing involved hundreds of manual spreadsheets.' },
          { title: 'Volatile Raw Material Prices', description: 'Lack of predictive intelligence meant buying at price spikes.' },
        ],
        results: [
          { stat: '↑ 28%', label: 'Procurement decision speed' },
          { stat: '↓ 12%', label: 'Raw material procurement costs' },
        ],
      },
    },
  })

  await payload.create({
    collection: 'case-studies',
    draft: false,
    data: {
      title: 'Automated Dimensional Inspection',
      slug: 'automated-dimensional-inspection',
      template: 'classic',
      category: manufacturingCat.id,
      status: 'published',
      displayOrder: 3,
      tags: [{ tag: 'Manufacturing · Vision AI' }],
      filterCategories: [{ category: 'Manufacturing' }, { category: 'Vision AI' }, { category: 'AI' }, { category: 'Automation' }],
      summary: {
        challenge: 'Manual measurement is slow and inconsistent.',
        objective: 'Replace manual measurement with automated inspection.',
        solution: 'Vision AI-based inspection replacing manual measurement.',
        deepTech: 'Computer Vision + CNN.',
        tech: 'Basler Cameras + OpenCV + Python',
        integration: 'MES / Quality System.',
        outcome: 'Faster, more consistent inspection at line speed.',
      },
      detail: {
        shortDescription: 'Manual caliper and gauge measurements on precision machined parts are labor-intensive and subject to human error.',
        technologyUsed: 'Basler Industrial Cameras + OpenCV + Python + TensorRT + MES',
        challenges: [
          { title: 'Inconsistent Measurement Quality', description: 'Human operators measured parts with varying precision across shifts.' },
          { title: 'Production Line Bottlenecks', description: 'Manual sampling limited quality checks to 5% of manufactured components.' },
        ],
        results: [
          { stat: '100%', label: 'Parts inspected at line speed' },
          { stat: '< 0.01mm', label: 'Measurement resolution accuracy' },
        ],
      },
    },
  })

  // Seed Manufacturing Solutions
  const solutions = [
    { title: 'Smart Factory', tagline: 'MES, production monitoring and digital shop-floor workflows.', href: '/case-studies', imagePlaceholder: 'Smart Factory MES' },
    { title: 'AI-Powered Procurement', tagline: 'Supplier recommendation, price intelligence and forecasting.', href: '/case-studies', imagePlaceholder: 'AI Procurement' },
    { title: 'Inventory Intelligence', tagline: 'Inventory variance, WIP visibility and stock optimization.', href: '/case-studies/revolutionizing-inventory-optimization', imagePlaceholder: 'Inventory Intelligence' },
    { title: 'Vision Inspection', tagline: 'Visual inspection, dimensional measurement and defect detection.', href: '/case-studies', imagePlaceholder: 'Vision Inspection' },
    { title: 'Connected Factory', tagline: 'IIoT, edge computing and machine connectivity.', href: '/case-studies', imagePlaceholder: 'Connected Factory' },
    { title: 'Material Traceability', tagline: 'RFID, QR, lot tracking and pallet tracking.', href: '/case-studies', imagePlaceholder: 'Material Traceability' },
  ]

  for (let i = 0; i < solutions.length; i++) {
    await payload.create({
      collection: 'manufacturing-solutions',
      data: {
        ...solutions[i],
        displayOrder: i + 1,
      },
    })
  }

  // Seed Deep Tech Capabilities
  const capabilities = [
    { number: '01', title: 'Vision AI', href: '/deep-tech/vision-ai', linkLabel: 'Explore Vision AI', challenge: 'Manual visual inspection is slow.', solution: 'Automated visual inspection of manufactured components.', deepTech: 'Computer Vision + CNN', tech: 'Basler Cameras + OpenCV', outcome: 'Faster, more consistent quality inspection.' },
    { number: '02', title: 'AI & Intelligent Business', href: '/deep-tech/ai-intelligent-business', linkLabel: 'Explore AI & Intelligent Business', challenge: 'Decisions rely on manual analysis.', solution: 'AI-powered recommendations for procurement and sales.', deepTech: 'Machine Learning + Predictive Analytics', tech: 'PySpark + Snowflake Cortex AI', outcome: 'Faster, data-driven decisions.' },
    { number: '03', title: 'AI-Powered No-Code Platform', href: '/deep-tech/ai-no-code', linkLabel: 'Explore the No-Code Platform', challenge: 'Building applications depends on traditional dev.', solution: 'Build business applications using natural language.', deepTech: 'AI-assisted application generation', tech: 'Python + LLM Technologies + React.js', outcome: 'Reduced dev dependency.' },
    { number: '04', title: 'Industry Automation', href: '/deep-tech/industry-automation', linkLabel: 'Explore Industry Automation', challenge: 'Machines operate as disconnected islands.', solution: 'Connect machines into an intelligent industrial operation.', deepTech: 'IIoT + Edge Computing', tech: 'OPC-UA + MQTT + Edge', outcome: 'Real-time visibility.' },
    { number: '05', title: 'Data Engineering', href: '/deep-tech/data-engineering', linkLabel: 'Explore Data Engineering', challenge: 'Data is fragmented across systems.', solution: 'Enterprise data platforms and pipelines.', deepTech: 'Data Integration + Transformation', tech: 'Snowflake + DBT + Fivetran', outcome: 'Trusted data asset.' },
    { number: '06', title: 'Digital Engineering', href: '/deep-tech/digital-engineering', linkLabel: 'Explore Digital Engineering', challenge: 'Legacy systems limit business agility.', solution: 'Engineer intelligent enterprise applications and APIs.', deepTech: 'Cloud-native engineering', tech: 'Python + Node.js + React.js', outcome: 'Solves real business problems.' },
  ]

  for (let i = 0; i < capabilities.length; i++) {
    await payload.create({
      collection: 'deep-tech-capabilities',
      data: {
        ...capabilities[i],
        displayOrder: i + 1,
      },
    })
  }

  console.log('Seeding completed successfully!')
}

if (process.argv[2] === '--run') {
  seed().then(() => process.exit(0)).catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}
