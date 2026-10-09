import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      return NextResponse.json({ error: 'Payload client unavailable' }, { status: 500 })
    }

    const existing = await payload.find({
      collection: 'case-studies',
      where: {
        slug: { equals: 'precision-abm-snowflake-cortex' }
      }
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Already exists', doc: existing.docs[0] })
    }

    const categories = await payload.find({
      collection: 'case-study-categories',
      limit: 1,
    })
    const categoryId = categories.docs[0]?.id

    const doc = await payload.create({
      collection: 'case-studies',
      draft: false,
      data: {
        title: 'Precision ABM, Powered by Cortex AI within the Snowflake AI Data Cloud',
        slug: 'precision-abm-snowflake-cortex',
        status: 'published',
        template: 'classic',
        category: categoryId as any,
        docItems: [
          { type: 'h2', text: 'Strategic Foundation' },
          { type: 'p', text: 'Empowering data-driven sales and marketing decisions, the Account Based Marketing solution unifies ICP Analysis, Account Fit Scoring, Engagement Intelligence, Deal Analytics, and Revenue Insights into a single analytical framework. By identifying high-value accounts, measuring engagement effectiveness, and tracking opportunity progression, organizations can prioritize efforts that drive measurable business outcomes.' },
          { type: 'h3', text: 'Strategy identifies the opportunity; data accelerates the outcome.' },
          { type: 'p', text: 'This four-phase Account Based Marketing Framework (Sales Foundation, Pre-Sales Engagement, Deals & Activities, and Sales Closure) provides end-to-end visibility across the customer journey, helping teams align marketing and sales efforts while improving conversion effectiveness.' },
          { type: 'h4', text: 'Smart Sales Framework' },
          { type: 'p', text: 'By integrating these critical business functions, organizations gain a unified analytical view that improves account prioritization, opportunity management, and revenue performance.' },
          { type: 'h2', text: 'ABM Analytics & Visualization Engine — Power BI & Snowflake' },
          { type: 'h3', text: 'Executive Intelligence' },
          { type: 'bullet', text: '**Account Visibility:** Monitor ICP Match Scores, Account Fit Scores, Intent Signals, and Opportunity Performance from a centralized dashboard.' },
          { type: 'bullet', text: '**Performance Insights:** Analyze engagement trends, pipeline progression, and conversion effectiveness.' },
          { type: 'bullet', text: '**Unified Reporting:** Consolidate marketing, sales, and account intelligence into a single decision-making platform.' },
          { type: 'h3', text: 'Operational Agility' },
          { type: 'bullet', text: '**Interactive Analytics:** Explore account performance through dynamic dashboards and drill-through reporting.' },
          { type: 'bullet', text: '**Engagement Intelligence:** Understand how contacts and accounts interact throughout the buying journey.' },
          { type: 'bullet', text: '**Revenue Optimization:** Identify high-potential opportunities and improve sales outcomes through data-driven insights.' }
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
        detail: {
          technologyUsed: 'Snowflake Cortex AI, Streamlit, Power BI',
        }
      }
    })

    return NextResponse.json({ message: 'Successfully seeded', doc })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
