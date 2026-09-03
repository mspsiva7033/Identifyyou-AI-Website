import { getPayload } from 'payload'
import config from '@payload-config'

export interface CaseStudySummary {
  slug: string
  title: string
  tag: string
  categories: string[]
  challenge: string
  objective: string
  solution: string
  deepTech: string
  tech: string
  integration: string
  outcome: string
}

export interface CaseStudyDetail {
  title: string
  breadcrumb: string
  overview: string
  challenges: { n: number; title: string; desc: string }[]
  results: { stat: string; label: string }[]
  solutionSteps: { n: number; title: string; challenge: string; solution: string; outcome: string }[]
  technologyUsed: string
  tag: string
  more: { tag: string; title: string; slug: string }[]
}

export interface ManufacturingSolutionItem {
  title: string
  tagline: string
  href: string
}

export interface DeepTechCapabilityItem {
  n: string
  title: string
  href: string
  linkLabel: string
  challenge: string
  solution: string
  deepTech: string
  tech: string
  outcome: string
}

// Fallback Static Data
export const FALLBACK_CASE_STUDIES: CaseStudySummary[] = [
  {
    slug: 'ai-powered-procurement',
    title: 'AI-Powered Procurement',
    tag: 'Manufacturing · AI',
    categories: ['Manufacturing', 'Supply Chain', 'AI'],
    challenge: 'Supplier selection depends heavily on manual analysis.',
    objective: 'Reduce manual effort and improve supplier decision quality.',
    solution: 'AI-powered Top 5 Supplier Recommendation.',
    deepTech: 'AI + Explainable AI.',
    tech: 'Python + PySpark + Snowflake Cortex AI',
    integration: 'SAP ERP.',
    outcome: 'Faster and more data-driven procurement decisions.',
  },
  {
    slug: 'automated-dimensional-inspection',
    title: 'Automated Dimensional Inspection',
    tag: 'Manufacturing · Vision AI',
    categories: ['Manufacturing', 'Vision AI', 'AI', 'Automation'],
    challenge: 'Manual measurement is slow and inconsistent.',
    objective: 'Replace manual measurement with automated inspection.',
    solution: 'Vision AI-based inspection replacing manual measurement.',
    deepTech: 'Computer Vision + CNN.',
    tech: 'Basler Cameras + OpenCV + Python',
    integration: 'MES / Quality System.',
    outcome: 'Faster, more consistent inspection at line speed.',
  },
  {
    slug: 'manufacturing-data-platform',
    title: 'Enterprise Manufacturing Data Platform',
    tag: 'Manufacturing · Data Engineering',
    categories: ['Manufacturing', 'Data', 'Engineering'],
    challenge: 'Shop floor and enterprise data operate in isolated silos.',
    objective: 'Create a single source of truth for manufacturing intelligence.',
    solution: 'Snowflake-powered data platform unifying MES, SAP & IoT.',
    deepTech: 'Enterprise Data Platform + Cloud Data Architecture.',
    tech: 'Snowflake + DBT + Matillion + Azure',
    integration: 'MES + SAP + SCADA.',
    outcome: 'Unified data access and real-time operational reporting.',
  },
  {
    slug: 'rfid-wip-tracking',
    title: 'RFID Material & WIP Tracking',
    tag: 'Manufacturing · Industry Automation',
    categories: ['Manufacturing', 'Automation', 'Industry 4.0'],
    challenge: 'Work-in-progress inventory status is tracked manually.',
    objective: 'Gain 100% automated visibility of materials across plant floor.',
    solution: 'Industrial RFID tracking at key process checkpoints.',
    deepTech: 'IIoT + RFID Sensor Networks.',
    tech: 'Edge Gateway + OPC-UA + Python + PostgreSQL',
    integration: 'SAP WM + Shop Floor Systems.',
    outcome: 'Zero misplaced WIP items and complete lot traceability.',
  },
  {
    slug: 'ai-powered-claims-processing',
    title: 'AI Claims & Document Intelligence',
    tag: 'Financial Services · AI',
    categories: ['Financial Services', 'AI', 'Document AI'],
    challenge: 'Claims processing involves tedious manual document verification.',
    objective: 'Automate intake, document OCR and risk verification.',
    solution: 'AI document parsing and automated workflow engine.',
    deepTech: 'Multimodal AI + Document NLP.',
    tech: 'Python + PyTorch + FastAPI + React',
    integration: 'Enterprise Core System.',
    outcome: '70% reduction in document processing turnaround time.',
  },
  {
    slug: 'revolutionizing-inventory-optimization',
    title: 'Revolutionizing Inventory Optimization With AI and Data Engineering',
    tag: 'Manufacturing · Data Engineering · AI',
    categories: ['Manufacturing', 'Supply Chain', 'AI', 'Data'],
    challenge: 'Batch-oriented systems delay insight into current stock levels.',
    objective: 'Real-time visibility and predictive demand forecasting.',
    solution: 'Unified inventory platform on Snowflake with predictive models.',
    deepTech: 'Data Engineering + Predictive AI.',
    tech: 'Snowflake + PySpark + Snowflake Cortex AI + Power BI',
    integration: 'POS + WMS + IoT Sensors',
    outcome: '40% reduction in stockouts of high-demand items.',
  },
]

export const FALLBACK_CASE_STUDIES_MAP: Record<string, CaseStudyDetail> = {
  'revolutionizing-inventory-optimization': {
    title: 'Revolutionizing Inventory Optimization With AI and Data Engineering',
    breadcrumb: 'Inventory Intelligence',
    tag: 'Manufacturing · Data Engineering · AI',
    overview: 'Inventory management sits at the center of manufacturing and retail operations, balancing the line between stockouts and overstock. Traditional inventory systems often struggle to provide real-time insight, leading to lost sales or excess carrying cost. IdentifYou built a data platform that gives real-time tracking, predictive analytics and actionable insight to keep stock levels where they should be.',
    challenges: [
      { n: 1, title: 'Lack of Real-Time Visibility', desc: 'Batch-oriented systems delay insight into current stock levels, leading to stockouts or overstocking.' },
      { n: 2, title: 'Unreliable Demand Forecasting', desc: 'Historical data alone misses seasonal trends, promotions and external disruptions.' },
      { n: 3, title: 'High Carrying Costs', desc: 'Overstock increases warehousing expense and the risk of unsold inventory going obsolete.' },
      { n: 4, title: 'Difficulty Responding to Seasonal Peaks', desc: 'Limited predictive capability makes it hard to prepare for high-demand periods.' },
    ],
    results: [
      { stat: '↓ 40%', label: 'Stockouts of high-demand items' },
      { stat: '↑ 15%', label: 'Seasonal sales revenue' },
      { stat: '↓ 20%', label: 'Operational / carrying costs' },
    ],
    solutionSteps: [
      { n: 1, title: 'Real-Time Inventory Tracking', challenge: 'Delayed visibility into inventory levels caused operational inefficiencies.', solution: 'Unified data from POS, warehouse management systems and IoT sensors into one platform.', outcome: 'Real-time tracking of stock movement across stores and warehouses.' },
      { n: 2, title: 'Predictive Demand Forecasting', challenge: 'Traditional forecasting could not account for dynamic market conditions.', solution: 'Machine learning models trained on historical trends, real-time sales and external factors.', outcome: 'High-demand items stay available while excess inventory is minimized.' },
      { n: 3, title: 'Peak Season Preparation', challenge: 'Insufficient inventory during high-demand seasons led to missed revenue.', solution: 'Scalable real-time analytics and predictive replenishment ahead of demand spikes.', outcome: 'Stockouts avoided during critical shopping seasons.' },
      { n: 4, title: 'Stock Optimization Across Locations', challenge: 'Imbalanced stock distribution across stores and warehouses caused inefficiency.', solution: 'Regional demand and turnover analysis to rebalance inventory.', outcome: 'Better allocation, fewer transfers, lower logistics cost.' },
    ],
    technologyUsed: 'Snowflake + PySpark + Snowflake Cortex AI + Power BI + Python',
    more: [
      { tag: 'Manufacturing · AI', title: 'AI-Powered Procurement', slug: 'ai-powered-procurement' },
      { tag: 'Manufacturing · Vision AI', title: 'Automated Dimensional Inspection', slug: 'automated-dimensional-inspection' },
    ],
  },
}

export const FALLBACK_MANUFACTURING_SOLUTIONS: ManufacturingSolutionItem[] = [
  { title: 'Smart Factory', tagline: 'MES, production monitoring and digital shop-floor workflows.', href: '/case-studies' },
  { title: 'AI-Powered Procurement', tagline: 'Supplier recommendation, price intelligence and forecasting.', href: '/case-studies' },
  { title: 'Inventory Intelligence', tagline: 'Inventory variance, WIP visibility and stock optimization.', href: '/case-studies/revolutionizing-inventory-optimization' },
  { title: 'Vision Inspection', tagline: 'Visual inspection, dimensional measurement and defect detection.', href: '/case-studies' },
  { title: 'Connected Factory', tagline: 'IIoT, edge computing and machine connectivity.', href: '/case-studies' },
  { title: 'Material Traceability', tagline: 'RFID, QR, lot tracking and pallet tracking.', href: '/case-studies' },
  { title: 'Production Intelligence', tagline: 'Production monitoring, scheduling and analytics.', href: '/case-studies' },
  { title: 'Manufacturing Data Platform', tagline: 'Enterprise manufacturing data, analytics and AI.', href: '/case-studies' },
]

export const FALLBACK_DEEP_TECH_CAPABILITIES: DeepTechCapabilityItem[] = [
  { n: '01', title: 'Vision AI', href: '/deep-tech/vision-ai', linkLabel: 'Explore Vision AI', challenge: 'Manual visual and dimensional inspection is slow and inconsistent.', solution: 'Automated visual inspection and dimensional measurement of manufactured components.', deepTech: 'Computer Vision + CNN / Deep Learning.', tech: 'Basler Industrial Cameras + OpenCV + Python', outcome: 'Faster, more consistent quality inspection.' },
  { n: '02', title: 'AI & Intelligent Business', href: '/deep-tech/ai-intelligent-business', linkLabel: 'Explore AI & Intelligent Business', challenge: 'Procurement, sales and inventory decisions rely on manual analysis.', solution: 'AI-powered recommendations for procurement, sales, forecasting and inventory.', deepTech: 'Machine Learning + Predictive Analytics.', tech: 'PySpark + Snowflake Cortex AI + Python', outcome: 'Faster, more data-driven business decisions.' },
  { n: '03', title: 'AI-Powered No-Code Platform', href: '/deep-tech/ai-no-code', linkLabel: 'Explore the No-Code Platform', challenge: 'Building business applications depends heavily on traditional software development.', solution: 'Build, configure and operate intelligent business applications using business language.', deepTech: 'AI-assisted application generation.', tech: 'Python + LLM Technologies + React.js + Node.js', outcome: 'Reduced dependency on traditional development.' },
  { n: '04', title: 'Industry Automation', href: '/deep-tech/industry-automation', linkLabel: 'Explore Industry Automation', challenge: 'Machines, sensors and enterprise systems operate as disconnected islands.', solution: 'Connect machines and enterprise systems into one intelligent industrial operation.', deepTech: 'IIoT + Edge Computing + Robotics.', tech: 'OPC-UA + MQTT + Edge Computing', outcome: 'Real-time visibility and automated response.' },
  { n: '05', title: 'Data Engineering', href: '/deep-tech/data-engineering', linkLabel: 'Explore Data Engineering', challenge: 'Enterprise and operational data is fragmented across systems.', solution: 'Enterprise data platforms and pipelines that convert fragmented data into trusted intelligence.', deepTech: 'Data Integration + Transformation.', tech: 'Snowflake + DBT + Fivetran + Matillion + Snowpipe', outcome: 'Data as a trusted, unified business asset.' },
  { n: '06', title: 'Digital Engineering', href: '/deep-tech/digital-engineering', linkLabel: 'Explore Digital Engineering', challenge: 'Legacy systems and manual workflows limit business agility.', solution: 'Engineer intelligent enterprise applications, SaaS platforms, workflows and APIs.', deepTech: 'Cloud-native application engineering.', tech: 'Python + Node.js + React.js + Azure + AWS', outcome: 'Digital products that solve real business problems.' },
]

export async function getPayloadClient() {
  try {
    return await getPayload({ config })
  } catch {
    return null
  }
}

export async function getCaseStudies(): Promise<CaseStudySummary[]> {
  try {
    const payload = await getPayloadClient()
    if (!payload) return FALLBACK_CASE_STUDIES

    const result = await payload.find({
      collection: 'case-studies',
      where: {
        status: { equals: 'published' },
      },
      sort: 'displayOrder',
    })

    if (!result.docs || result.docs.length === 0) {
      return FALLBACK_CASE_STUDIES
    }

    return result.docs.map((doc: any) => ({
      slug: doc.slug,
      title: doc.title,
      tag: doc.tags?.[0]?.tag || 'Deep Tech',
      categories: doc.filterCategories?.map((c: any) => c.category) || [],
      challenge: doc.summary?.challenge || '',
      objective: doc.summary?.objective || '',
      solution: doc.summary?.solution || '',
      deepTech: doc.summary?.deepTech || '',
      tech: doc.summary?.tech || '',
      integration: doc.summary?.integration || '',
      outcome: doc.summary?.outcome || '',
    }))
  } catch (error) {
    console.warn('Failed to fetch case studies from Payload, using fallback static data.', error)
    return FALLBACK_CASE_STUDIES
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  try {
    const payload = await getPayloadClient()
    if (!payload) return FALLBACK_CASE_STUDIES_MAP[slug] || null

    const result = await payload.find({
      collection: 'case-studies',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return FALLBACK_CASE_STUDIES_MAP[slug] || null
    }

    const doc: any = result.docs[0]
    return {
      title: doc.title,
      breadcrumb: doc.breadcrumb || doc.title,
      tag: doc.tags?.[0]?.tag || 'Deep Tech',
      overview: doc.detail?.shortDescription || doc.summary?.solution || '',
      challenges: doc.detail?.challenges?.map((c: any, index: number) => ({
        n: index + 1,
        title: c.title,
        desc: c.description,
      })) || [],
      results: doc.detail?.results?.map((r: any) => ({
        stat: r.stat,
        label: r.label,
      })) || [],
      solutionSteps: doc.detail?.solutionSteps?.map((s: any, index: number) => ({
        n: index + 1,
        title: s.title,
        challenge: s.challenge || '',
        solution: s.solution || '',
        outcome: s.outcome || '',
      })) || [],
      technologyUsed: doc.detail?.technologyUsed || doc.summary?.tech || '',
      more: [
        { tag: 'Manufacturing · AI', title: 'AI-Powered Procurement', slug: 'ai-powered-procurement' },
        { tag: 'Manufacturing · Vision AI', title: 'Automated Dimensional Inspection', slug: 'automated-dimensional-inspection' },
      ],
    }
  } catch (error) {
    console.warn(`Failed to fetch case study ${slug} from Payload CMS, using fallback data.`, error)
    return FALLBACK_CASE_STUDIES_MAP[slug] || null
  }
}

export async function getManufacturingSolutions(): Promise<ManufacturingSolutionItem[]> {
  try {
    const payload = await getPayloadClient()
    if (!payload) return FALLBACK_MANUFACTURING_SOLUTIONS

    const result = await payload.find({
      collection: 'manufacturing-solutions',
      sort: 'displayOrder',
    })

    if (!result.docs || result.docs.length === 0) {
      return FALLBACK_MANUFACTURING_SOLUTIONS
    }

    return result.docs.map((doc: any) => ({
      title: doc.title,
      tagline: doc.tagline,
      href: doc.href || '/case-studies',
    }))
  } catch {
    return FALLBACK_MANUFACTURING_SOLUTIONS
  }
}

export async function getDeepTechCapabilities(): Promise<DeepTechCapabilityItem[]> {
  try {
    const payload = await getPayloadClient()
    if (!payload) return FALLBACK_DEEP_TECH_CAPABILITIES

    const result = await payload.find({
      collection: 'deep-tech-capabilities',
      sort: 'displayOrder',
    })

    if (!result.docs || result.docs.length === 0) {
      return FALLBACK_DEEP_TECH_CAPABILITIES
    }

    return result.docs.map((doc: any) => ({
      n: doc.number || doc.n || '01',
      title: doc.title,
      href: doc.href,
      linkLabel: doc.linkLabel,
      challenge: doc.challenge,
      solution: doc.solution,
      deepTech: doc.deepTech,
      tech: doc.tech,
      outcome: doc.outcome,
    }))
  } catch {
    return FALLBACK_DEEP_TECH_CAPABILITIES
  }
}

export async function saveContactSubmission(submission: {
  name: string
  email: string
  company?: string
  selectedPath?: string
  message?: string
}) {
  try {
    const payload = await getPayloadClient()
    if (payload) {
      await payload.create({
        collection: 'contact-submissions',
        data: submission,
      })
      console.log('Successfully saved contact submission to Payload CMS.')
      return true
    }
  } catch (error) {
    console.error('Failed to save contact submission to Payload CMS:', error)
  }
  return false
}
