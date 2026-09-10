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

export interface DocItem {
  type: 'h2' | 'h3' | 'h4' | 'p' | 'bullet'
  text: string
}

export interface CaseStudyDetail {
  title: string
  breadcrumb: string
  overview?: string
  metaBlock?: { label: string; value: string }[]
  challenges?: { n: number; title: string; desc: string }[]
  results?: { stat: string; label: string }[]
  solutionSteps?: { n: number; title: string; challenge?: string; solution?: string; outcome?: string }[]
  sections?: { title?: string; subtitle?: string; content?: string[]; bullets?: string[] }[]
  docItems?: DocItem[]
  workflow?: string[]
  comparisonTable?: { headers: [string, string]; rows: [string, string][] }
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
  // --- AI & Intelligent Business ---
  {
    slug: 'procurement-operations-intelligence',
    title: 'Transforming Routine Procurement to Intelligent Automation',
    tag: 'Automotive · AI & Intelligent Business · Procurement Operations',
    categories: ['AI & Intelligent Business', 'AI', 'Manufacturing', 'Supply Chain'],
    challenge: 'High-volume operational burden across thousands of purchase requirements every day.',
    objective: 'Transform raw ERP procurement data into timely, guided purchasing recommendations.',
    solution: 'IdentifYou AI operational layer providing Sense → Predict → Recommend → Automate decision workflows.',
    deepTech: 'Operational Procurement Intelligence + Explainable AI',
    tech: 'ERP Connectors + Python + PySpark + Snowflake Cortex AI',
    integration: 'SAP ERP & Procurement Portals',
    outcome: 'Faster replenishment cycles, zero blind purchases, and managed exceptions.',
  },
  {
    slug: 'risk-insights-finance',
    title: 'AI-Powered Risk Intelligence: Predict, Explain & Act',
    tag: 'Financial Services · AI & Intelligent Business · Risk Intelligence',
    categories: ['AI & Intelligent Business', 'AI', 'Financial Services', 'FinTech'],
    challenge: 'Vast volume of alerts causing fatigue and delayed detection of high-impact risk signals.',
    objective: 'Predict risk, quantify confidence, explain underlying drivers, and enable immediate action.',
    solution: 'Intelligence layer combining ML models, dynamic risk scoring (0-100), and explainable drivers.',
    deepTech: 'Explainable Risk AI + Anomaly Detection + Decision Intelligence',
    tech: 'Python + PySpark + Snowflake AI + REST API',
    integration: 'Core Banking & Payment Processing Networks',
    outcome: 'Reduced alert fatigue, high confidence scoring, and instant threat mitigation.',
  },
  {
    slug: 'strategic-procurement-intelligence',
    title: 'Strategic Procurement Intelligence for CAPEX, Raw Materials & Tooling',
    tag: 'Automotive · AI & Intelligent Business · Strategic Sourcing',
    categories: ['AI & Intelligent Business', 'AI', 'Manufacturing', 'Supply Chain'],
    challenge: 'CAPEX, raw material, and tooling sourcing dependent on manual spreadsheets and buyer experience.',
    objective: 'Deliver data-driven supplier rankings, price benchmarking, and TCO evaluations.',
    solution: 'Strategic procurement intelligence layer analyzing lifecycle costs, supplier risk, and price trends.',
    deepTech: 'Decision Science + TCO Benchmarking + Supplier Risk Prediction',
    tech: 'Python + Snowflake + Custom Decision Intelligence',
    integration: 'Enterprise ERP + Supplier Portals',
    outcome: 'Evidence-based supplier selection, optimized CAPEX spend, and proactive risk control.',
  },
  {
    slug: 'towards-zero-inventory-variance-ai',
    title: 'Towards Zero Inventory Variance — Digitally Controlled Material Execution',
    tag: 'Automotive · AI & Intelligent Business · Material Execution',
    categories: ['AI & Intelligent Business', 'AI', 'Manufacturing', 'Supply Chain'],
    challenge: 'Physical material movements and digital inventory transactions lack synchronization at point of execution.',
    objective: 'Establish a digitally interlocked execution environment to drive inventory variance towards zero.',
    solution: 'MES-linked digital interlocks using RFID, handhelds, and postponement SFG inventory pooling.',
    deepTech: 'Digital Material Interlocking + Piece-to-Batch Genealogy + Postponement Strategy',
    tech: 'MES + RFID Readers + Edge Gateways + Python',
    integration: 'MES + SAP ERP + Shop Floor Devices',
    outcome: 'Zero unauthorized material movements, 100% material genealogy, and physical-to-digital alignment.',
  },

  // --- Data Engineering ---
  {
    slug: 'precision-abm-snowflake-cortex',
    title: 'Precision ABM & Demand Intelligence with Snowflake Cortex AI',
    tag: 'Enterprise · Data Engineering · Snowflake Cortex AI',
    categories: ['Data Engineering', 'Data', 'AI', 'Manufacturing', 'Financial Services'],
    challenge: 'Fragmented intent signals preventing targeted B2B account engagement and demand forecasting.',
    objective: 'Unify multi-source enterprise data into Snowflake AI Data Cloud for real-time account scoring.',
    solution: 'Lakehouse data platform leveraging dbt models and Snowflake Cortex AI natural language intelligence.',
    deepTech: 'Snowflake Cortex AI + Lakehouse Architecture + Modern Data Stack',
    tech: 'Snowflake + Cortex AI + dbt + Python + Airflow',
    integration: 'Salesforce CRM + Marketo + ERP + Web Analytics',
    outcome: '3.5x boost in high-intent account engagement and unified data pipelines.',
  },
  {
    slug: 'revolutionizing-inventory-optimization',
    title: 'Revolutionizing Enterprise Inventory Optimization with Snowflake',
    tag: 'Manufacturing · Data Engineering · Supply Chain',
    categories: ['Data Engineering', 'Data', 'Manufacturing', 'Supply Chain'],
    challenge: 'Batch-oriented legacy systems delay insight into current stock, increasing carrying costs and stockouts.',
    objective: 'Build real-time data pipelines and predictive safety stock triggers.',
    solution: 'High-throughput stream ingestion into Snowflake with automated ML replenishment models.',
    deepTech: 'Real-Time Data Pipelines + Cloud Data Warehouse + Automated ML',
    tech: 'Snowflake + PySpark + Snowpark + dbt + Airflow',
    integration: 'POS + WMS + SAP ERP + IoT Sensors',
    outcome: '40% reduction in high-demand stockouts and 20% lower inventory carrying costs.',
  },
  {
    slug: 'optimizing-shipment-fleet-snowflake',
    title: 'Optimizing Logistics, Shipment & Fleet Operations with Snowflake',
    tag: 'Supply Chain · Data Engineering · Fleet Intelligence',
    categories: ['Data Engineering', 'Data', 'Supply Chain', 'Automation'],
    challenge: 'Disconnected telematics, GPS, and shipment feeds cause routing delays and excessive fuel use.',
    objective: 'Provide real-time fleet tracking, dynamic route optimization, and accurate ETA calculations.',
    solution: 'Cloud data streaming architecture aggregating telematics and consignment tracking into live dashboards.',
    deepTech: 'Geospatial Telematics Ingestion + Stream Processing + Predictive Logistics',
    tech: 'Snowflake + Snowpark + Apache Kafka + Python',
    integration: 'Vehicle Telematics + GPS Trackers + WMS + Carrier APIs',
    outcome: '22% decrease in transit delay times and 15% reduction in fleet fuel consumption.',
  },

  // --- Digital Engineering ---
  {
    slug: 'tailored-enterprise-solutions',
    title: 'Tailored Enterprise Digital Solutions & Modular Platform Engineering',
    tag: 'Enterprise · Digital Engineering · Modern Architecture',
    categories: ['Digital Engineering', 'Automation', 'Manufacturing', 'Financial Services'],
    challenge: 'Legacy monolithic architecture restricting operational agility and slowing software release cycles.',
    objective: 'Engineer microservices-driven enterprise applications tailored to complex operational workflows.',
    solution: 'Modular full-stack product engineering with cloud-native APIs, Next.js, and containerized deployment.',
    deepTech: 'Microservices Architecture + Cloud Native API Integration + Full-Stack Product Design',
    tech: 'Next.js + React + Node.js + TypeScript + PostgreSQL + Docker + AWS',
    integration: 'Enterprise Core Systems + SaaS APIs + Legacy Databases',
    outcome: '60% faster application release velocity and zero-downtime modular scaling.',
  },

  // --- Industry Automation ---
  {
    slug: 'fluke-t40',
    title: 'Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer',
    tag: 'Manufacturing · Industry Automation · Edge Thermal Intelligence',
    categories: ['Industry Automation', 'Automation', 'Manufacturing', 'Data'],
    challenge: 'Undetected thermal spikes in production machinery cause sudden, expensive equipment breakdowns.',
    objective: 'Process thermal sensor telemetry locally at the edge for sub-second anomaly detection.',
    solution: 'Industrial Edge Gateway (Raspberry Pi 4 ARM) with RS485 polling and instant rich WhatsApp alerts.',
    deepTech: 'Edge Thermal Processing + Ultra-Low Latency Anomaly Detection + WhatsApp Alarming',
    tech: 'Fluke T40 Pyrometer + Raspberry Pi 4 + RS485 + Python + WhatsApp Business API',
    integration: 'SCADA + Industrial RS485 + Web Dashboards',
    outcome: '99.4% equipment uptime, immediate WhatsApp alerts, and zero unpredicted critical failures.',
  },
  {
    slug: 'fluke-tv30',
    title: 'Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer',
    tag: 'Manufacturing · Industry Automation · Pyrometry Analytics',
    categories: ['Industry Automation', 'Automation', 'Manufacturing', 'Data'],
    challenge: 'Extreme temperature manufacturing processes require non-contact 24/7 thermal integrity monitoring.',
    objective: 'Deploy ruggedized edge computing hardware capable of continuous thermal trend analysis.',
    solution: 'IP65-compatible industrial gateway continuous polling Fluke TV30 pyrometers with dual-platform visibility.',
    deepTech: 'Non-Contact Pyrometry Signal Processing + Rugged Edge Compute',
    tech: 'Fluke TV30 Pyrometer + Raspberry Pi 4 + RS485 + WebSockets + WhatsApp Alarming',
    integration: 'Plant SCADA + Maintenance Command Center + Mobile Pulse',
    outcome: 'Continuous thermal assurance, zero heat degradation incidents, and automated alerts.',
  },
  {
    slug: 'industrial-edge-device-engineering',
    title: 'Industrial Edge Device Engineering — Hardware Foundation for Edge AI',
    tag: 'Industrial IoT · Industry Automation · Edge Hardware',
    categories: ['Industry Automation', 'Automation', 'Manufacturing'],
    challenge: 'Conventional gateways suffer from restricted protocol support, poor local compute, and cloud dependency.',
    objective: 'Build an extensible industrial hardware platform combining connectivity, compute, storage, and security.',
    solution: 'Multi-core hardware platform supporting OPC UA, Modbus, MQTT, TPM 2.0 security, and NVMe local storage.',
    deepTech: 'Universal Protocol Gateway + TPM 2.0 Hardware Security + Edge AI Computing Platform',
    tech: 'ARM/x86 Multi-Core + TPM 2.0 + OPC UA + Modbus + MQTT + Docker + Yocto Linux',
    integration: 'Industrial PLCs + Sensors + Enterprise Cloud Lakes',
    outcome: 'Secure OT/IT bridge, resilient store-and-forward local caching, and Edge AI readiness.',
  },
  {
    slug: 'industrial-edge-intelligence',
    title: 'Edge Intelligence & Software Platform for Industrial Applications',
    tag: 'Industry Automation · Software Platform · Edge AI',
    categories: ['Industry Automation', 'Automation', 'AI', 'Data'],
    challenge: 'Deploying and managing edge microservices and AI workloads across remote factory gateways is complex.',
    objective: 'Build a containerized edge software layer for real-time processing and remote OTA management.',
    solution: 'Modular Edge runtime with Docker/K3s orchestration, time-series data buffering, and centralized updates.',
    deepTech: 'Containerized Edge Execution + Microservices Orchestration + Remote OTA Fleet Management',
    tech: 'Linux + Docker + K3s + Python + C++ + TimescaleDB + Web Dashboards',
    integration: 'Cloud IoT Hubs + Local Edge Devices + Enterprise Systems',
    outcome: 'Centralized OTA application deployment and sub-10ms real-time edge processing loops.',
  },
  {
    slug: 'towards-zero-inventory-variance-automation',
    title: 'MES & RFID-Driven Material Traceability & Execution',
    tag: 'Manufacturing · Industry Automation · MES & RFID',
    categories: ['Industry Automation', 'Automation', 'Manufacturing', 'Supply Chain'],
    challenge: 'Manual tracking of material routings results in misplaced inventory and wrong-order processing.',
    objective: 'Automate material movement tracking and enforce physical-to-digital validation at each station.',
    solution: 'Integrated MES and RFID system verifying material identity and routing before authorizing physical movement.',
    deepTech: 'Digital Material Interlocking + Hardware Sensing + Real-Time Verification',
    tech: 'RFID Readers + Edge Controllers + OPC UA + MES API + Handheld Scanners',
    integration: 'MES + Industrial Scanners + SAP WM',
    outcome: '100% automated lot traceability, zero incorrect routing events, and instant WIP visibility.',
  },

  // --- Vision AI ---
  {
    slug: 'advanced-vision-inspection-surface',
    title: 'Advanced Vision Inspection for Surface & Edge Integrity',
    tag: 'Manufacturing · Vision AI · Quality Inspection',
    categories: ['Vision AI', 'AI', 'Manufacturing', 'Automation'],
    challenge: 'Surface micro-cracks, burrs, and forging flaws are difficult for manual inspectors to catch consistently.',
    objective: 'Implement automated 100% inline visual defect inspection under controlled multi-angle lighting.',
    solution: 'Deep learning CNN vision models integrated with high-speed GigE cameras and inline PLC rejection.',
    deepTech: '2D Vision + Controlled Multi-Angle Illumination + Deep Learning CNN Inferences',
    tech: 'Basler Cameras + UV/RGB LED Illumination + PyTorch + TensorRT + Industrial PC',
    integration: 'Line Rejection PLC + Quality Control Dashboard + MES',
    outcome: '99.8% flaw detection accuracy, zero defect escapes, and 100% inline inspection speed.',
  },
  {
    slug: 'vision-ai-bore-measurement',
    title: 'High-Speed Micron-Level Bore & Interface Inspection',
    tag: 'Manufacturing · Vision AI · Precision Metrology',
    categories: ['Vision AI', 'AI', 'Manufacturing', 'Automation'],
    challenge: 'Internal bore diameter and keyway tolerances require sub-5-micron precision at high line speeds.',
    objective: 'Achieve real-time non-contact dimensional inspection on the moving conveyor.',
    solution: 'Hybrid 3D optical laser profiling and high-res 2D vision running GPU-accelerated metrology models.',
    deepTech: '3D Optical Profiling + Sub-Pixel Edge Analytics + Metrology AI',
    tech: '3D Laser Profilers + High-Res GigE Cameras + NVIDIA Jetson + OpenCV + C++',
    integration: 'Precision Conveyor PLC + Tooling Compensation + Quality System',
    outcome: '< 3 micron measurement repeatability, 1.2s cycle time, and zero manual gauge errors.',
  },
  {
    slug: 'vision-ai-complex-dimension',
    title: 'Precision Inspection of Complex Threads & Internal Geometries',
    tag: 'Manufacturing · Vision AI · 3D Metrology',
    categories: ['Vision AI', 'AI', 'Manufacturing', 'Automation'],
    challenge: 'Internal thread pitch, blind holes, and recessed geometry features cannot be verified by 2D vision.',
    objective: 'Deliver automated dimensional and surface inspection inside deep internal component cavities.',
    solution: 'Specialized endoscopic optical probes paired with 3D point-cloud reconstruction and vision AI.',
    deepTech: 'Endoscopic Micro-Optics + 3D Point-Cloud Geometric Reconstruction + Vision AI',
    tech: 'Custom Endoscopic Probe + 3D Laser Scanner + PyTorch + TensorRT',
    integration: 'Automated Inspection Cell PLC + MES + Quality Database',
    outcome: '100% internal thread pitch & depth verification with 0.8s cycle time per part.',
  },
]

export const FALLBACK_CASE_STUDIES_MAP: Record<string, CaseStudyDetail> = {
  "procurement-operations-intelligence": {
    "title": "procurement-operations-intelligence",
    "breadcrumb": "procurement-operations-intelligence",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "risk-insights-finance": {
    "title": "risk-insights-finance",
    "breadcrumb": "risk-insights-finance",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "strategic-procurement-intelligence": {
    "title": "strategic-procurement-intelligence",
    "breadcrumb": "strategic-procurement-intelligence",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "towards-zero-inventory-variance-ai": {
    "title": "towards-zero-inventory-variance-ai",
    "breadcrumb": "towards-zero-inventory-variance-ai",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "revolutionizing-inventory-optimization": {
    "title": "revolutionizing-inventory-optimization",
    "breadcrumb": "revolutionizing-inventory-optimization",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "tailored-enterprise-solutions": {
    "title": "tailored-enterprise-solutions",
    "breadcrumb": "tailored-enterprise-solutions",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "fluke-t40": {
    "title": "fluke-t40",
    "breadcrumb": "fluke-t40",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "fluke-tv30": {
    "title": "fluke-tv30",
    "breadcrumb": "fluke-tv30",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "industrial-edge-device-engineering": {
    "title": "industrial-edge-device-engineering",
    "breadcrumb": "industrial-edge-device-engineering",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "industrial-edge-intelligence": {
    "title": "industrial-edge-intelligence",
    "breadcrumb": "industrial-edge-intelligence",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "towards-zero-inventory-variance-automation": {
    "title": "towards-zero-inventory-variance-automation",
    "breadcrumb": "towards-zero-inventory-variance-automation",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "advanced-vision-inspection-surface": {
    "title": "advanced-vision-inspection-surface",
    "breadcrumb": "advanced-vision-inspection-surface",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "vision-ai-bore-measurement": {
    "title": "vision-ai-bore-measurement",
    "breadcrumb": "vision-ai-bore-measurement",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  },
  "vision-ai-complex-dimension": {
    "title": "vision-ai-complex-dimension",
    "breadcrumb": "vision-ai-complex-dimension",
    "tag": "Case Study",
    "docItems": [],
    "technologyUsed": "",
    "more": []
  }
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
      sort: 'displayOrder',
    })

    const validDocs = (result.docs || []).filter(
      (doc: any) => doc.slug && doc.slug !== 'mollitia-fugit-similique-placeat' && doc.title && !doc.title.includes('Mollitia')
    )

    if (validDocs.length === 0) {
      return FALLBACK_CASE_STUDIES
    }

    return validDocs.map((doc: any) => ({
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
      },
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return FALLBACK_CASE_STUDIES_MAP[slug] || null
    }

    const doc: any = result.docs[0]
    if (doc.slug === 'mollitia-fugit-similique-placeat' || !doc.title || doc.title.includes('Mollitia')) {
      return FALLBACK_CASE_STUDIES_MAP[slug] || null
    }

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
        { tag: 'Manufacturing · AI', title: 'Procurement Operations Intelligence', slug: 'procurement-operations-intelligence' },
        { tag: 'Manufacturing · Vision AI', title: 'Advanced Surface Inspection', slug: 'advanced-vision-inspection-surface' },
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
