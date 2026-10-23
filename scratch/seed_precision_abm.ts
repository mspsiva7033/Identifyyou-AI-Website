import { getPayloadClient } from '../lib/payload'

async function seedPrecisionAbm() {
  console.log('--- Seeding Precision ABM Case Study ---')
  const payload = await getPayloadClient()
  if (!payload) {
    console.error('Payload client not available')
    process.exit(1)
  }

  // 1. Check if already exists
  const existing = await payload.find({
    collection: 'case-studies' as any,
    where: { slug: { equals: 'precision-abm-snowflake-cortex' } },
  })

  // 2. Find Data Engineering category
  const categories = await payload.find({
    collection: 'case-study-categories' as any,
    where: { slug: { equals: 'data-engineering' } },
  })

  const categoryId = categories.docs[0]?.id || 60
  console.log('Data Engineering category ID:', categoryId)

  const abmData = {
    title: 'Precision ABM, Powered by Cortex AI within the Snowflake AI Data Cloud',
    slug: 'precision-abm-snowflake-cortex',
    status: 'published',
    template: 'classic',
    category: categoryId as any,
    tags: [{ tag: 'ENTERPRISE · DATA ENGINEERING · SNOWFLAKE CORTEX AI' }],
    filterCategories: [
      { category: 'Data Engineering' },
      { category: 'Data' },
      { category: 'AI' }
    ],
    docItems: [
      { type: 'h2', text: 'Strategic Foundation' },
      { type: 'p', text: 'Empowering data-driven sales and marketing decisions, the Account Based Marketing solution unifies ICP Analysis, Account Fit Scoring, Engagement Intelligence, Deal Analytics, and Revenue Insights into a single analytical framework. By identifying high-value accounts, measuring engagement effectiveness, and tracking opportunity progression, organizations can prioritize efforts that drive measurable business outcomes.' },
      { type: 'h3', text: 'Strategy identifies the opportunity; data accelerates the outcome.' },
      { type: 'p', text: 'This four-phase Account Based Marketing Framework (Sales Foundation, Pre-Sales Engagement, Deals & Activities, and Sales Closure) provides end-to-end visibility across the customer journey, helping teams align marketing and sales efforts while improving conversion effectiveness.' },
      { type: 'h4', text: 'Smart Sales Framework' },
      { type: 'p', text: 'By integrating these critical business functions, organizations gain a unified analytical view that improves account prioritization, opportunity management, and revenue performance.' },
      { type: 'h2', text: 'ABM Analytics & Visualization Engine — Power BI & Snowflake' },
      { type: 'h3', text: 'Executive Intelligence' },
      { type: 'bullet', text: 'Account Visibility: Monitor ICP Match Scores, Account Fit Scores, Intent Signals, and Opportunity Performance from a centralized dashboard.' },
      { type: 'bullet', text: 'Performance Insights: Analyze engagement trends, pipeline progression, and conversion effectiveness.' },
      { type: 'bullet', text: 'Unified Reporting: Consolidate marketing, sales, and account intelligence into a single decision-making platform.' },
      { type: 'h3', text: 'Operational Agility' },
      { type: 'bullet', text: 'Interactive Analytics: Explore account performance through dynamic dashboards and drill-through reporting.' },
      { type: 'bullet', text: 'Engagement Intelligence: Understand how contacts and accounts interact throughout the buying journey.' },
      { type: 'bullet', text: 'Revenue Optimization: Identify high-potential opportunities and improve sales outcomes through data-driven insights.' }
    ],
    tableBlock: {
      headers: ["Phase", "Strategic Focus", "Business Outcome"],
      rows: [
        ["Sales Foundation", "ICP analysis, account fit evaluation, and intent identification.", "Account Intelligence"],
        ["Pre-Sales Engagement", "Engagement monitoring and contact activity analysis.", "Engagement Insights"],
        ["Deals & Activities", "Deal velocity, pipeline visibility, and opportunity tracking.", "Sales Performance"],
        ["Sales Closure", "Close-rate analysis and revenue optimization.", "Conversion Intelligence"]
      ]
    },
    customCTA: {
      title: "Sub-Case Study: Power BI ABM Analytics & Installation Guide",
      desc: "Access the complete Power BI ABM framework, deployment guide, Snowflake connection parameters, configuration options, validation steps, troubleshooting, and user guide below.",
      linkLabel: "POWER BI ABM →",
      linkHref: "/case-studies/power-bi-abm"
    },
    summary: {
      challenge: 'Fragmented sales and marketing telemetry across CRM and marketing automation preventing accurate account prioritization and revenue forecasting.',
      solution: 'IdentifYou engineered a unified Precision ABM Lakehouse on Snowflake Cortex AI combining ICP scoring, intent signals, and deal velocity analytics.',
      tech: 'Snowflake Cortex AI, Streamlit, Power BI, Python, SQL, REST APIs',
      outcome: '3.5x boost in high-intent account engagement and unified revenue intelligence.'
    },
    detail: {
      shortDescription: 'Precision ABM framework integrating Snowflake Cortex AI and Power BI for enterprise account intelligence.',
      technologyUsed: 'Snowflake Cortex AI, Streamlit, Power BI, Python, SQL, REST APIs',
      results: [
        { stat: '3.5x', label: 'High-Intent Account Engagement Boost' },
        { stat: '100%', label: 'Unified Sales & Marketing Pipeline Visibility' },
        { stat: 'Real-Time', label: 'Snowflake Cortex AI Intent Scoring' }
      ]
    }
  }

  if (existing.docs.length > 0) {
    console.log('Updating existing doc ID:', existing.docs[0].id)
    const updated = await payload.update({
      collection: 'case-studies' as any,
      id: existing.docs[0].id,
      data: abmData,
    })
    console.log('Successfully updated:', updated.slug)
  } else {
    console.log('Creating new precision-abm-snowflake-cortex doc...')
    const created = await payload.create({
      collection: 'case-studies' as any,
      draft: false,
      data: abmData,
    })
    console.log('Successfully created:', created.slug, 'ID:', created.id)
  }

  console.log('--- Completed Successfully ---')
  process.exit(0)
}

seedPrecisionAbm().catch((e) => {
  console.error(e)
  process.exit(1)
})
