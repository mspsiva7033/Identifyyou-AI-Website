export type CategoryKey =
  | 'ai-intelligent-business'
  | 'ai-no-code'
  | 'vision-ai'
  | 'industry-automation'
  | 'data-engineering'
  | 'digital-engineering'
  | 'supply-chain'
  | 'manufacturing'
  | 'default'

export interface CategoryTheme {
  key: CategoryKey
  name: string
  tintColor: string // hex
  tintRgb: string // "r, g, b"
  tagColor: string // text color for tag badge
  gradientCss: string
  overlayOpacity: number
  hoverGlow: string
  badgeBg: string
}

export const CATEGORY_THEMES: Record<CategoryKey, CategoryTheme> = {
  'ai-no-code': {
    key: 'ai-no-code',
    name: 'AI & No-Code Platform',
    tintColor: '#06b6d4',
    tintRgb: '6, 182, 212',
    tagColor: '#22d3ee',
    gradientCss: 'linear-gradient(135deg, rgba(6, 182, 212, 0.14) 0%, rgba(14, 165, 233, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(6, 182, 212, 0.25)',
    badgeBg: 'rgba(6, 182, 212, 0.10)',
  },
  'ai-intelligent-business': {
    key: 'ai-intelligent-business',
    name: 'AI & Intelligent Business',
    tintColor: '#00b4d8',
    tintRgb: '0, 180, 216',
    tagColor: '#38bdf8',
    gradientCss: 'linear-gradient(135deg, rgba(0, 180, 216, 0.14) 0%, rgba(6, 182, 212, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(0, 180, 216, 0.25)',
    badgeBg: 'rgba(0, 180, 216, 0.10)',
  },
  'vision-ai': {
    key: 'vision-ai',
    name: 'Vision AI',
    tintColor: '#9d4edd',
    tintRgb: '157, 78, 221',
    tagColor: '#c06eff',
    gradientCss: 'linear-gradient(135deg, rgba(157, 78, 221, 0.14) 0%, rgba(147, 51, 234, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(157, 78, 221, 0.25)',
    badgeBg: 'rgba(157, 78, 221, 0.10)',
  },
  'industry-automation': {
    key: 'industry-automation',
    name: 'Industry Automation',
    tintColor: '#94C640',
    tintRgb: '16, 185, 129',
    tagColor: '#94C640',
    gradientCss: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.04) 100%)',
    overlayOpacity: 0.12,
    hoverGlow: 'rgba(16, 185, 129, 0.25)',
    badgeBg: 'rgba(16, 185, 129, 0.10)',
  },
  'data-engineering': {
    key: 'data-engineering',
    name: 'Data Engineering',
    tintColor: '#94C640',
    tintRgb: '148, 198, 64',
    tagColor: '#94C640',
    gradientCss: 'linear-gradient(135deg, rgba(148, 198, 64, 0.14) 0%, rgba(148, 198, 64, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(148, 198, 64, 0.25)',
    badgeBg: 'rgba(148, 198, 64, 0.10)',
  },
  'digital-engineering': {
    key: 'digital-engineering',
    name: 'Digital Engineering',
    tintColor: '#f4a261',
    tintRgb: '244, 162, 97',
    tagColor: '#fbbf24',
    gradientCss: 'linear-gradient(135deg, rgba(244, 162, 97, 0.14) 0%, rgba(217, 119, 6, 0.04) 100%)',
    overlayOpacity: 0.13,
    hoverGlow: 'rgba(244, 162, 97, 0.25)',
    badgeBg: 'rgba(244, 162, 97, 0.10)',
  },
  'supply-chain': {
    key: 'supply-chain',
    name: 'Supply Chain',
    tintColor: '#e76f51',
    tintRgb: '231, 111, 81',
    tagColor: '#fb7185',
    gradientCss: 'linear-gradient(135deg, rgba(231, 111, 81, 0.14) 0%, rgba(225, 29, 72, 0.04) 100%)',
    overlayOpacity: 0.13,
    hoverGlow: 'rgba(231, 111, 81, 0.25)',
    badgeBg: 'rgba(231, 111, 81, 0.10)',
  },
  'manufacturing': {
    key: 'manufacturing',
    name: 'Manufacturing',
    tintColor: '#48cae4',
    tintRgb: '72, 202, 228',
    tagColor: '#38bdf8',
    gradientCss: 'linear-gradient(135deg, rgba(72, 202, 228, 0.12) 0%, rgba(2, 132, 199, 0.04) 100%)',
    overlayOpacity: 0.12,
    hoverGlow: 'rgba(72, 202, 228, 0.25)',
    badgeBg: 'rgba(72, 202, 228, 0.10)',
  },
  default: {
    key: 'default',
    name: 'Deep Tech',
    tintColor: '#00b4d8',
    tintRgb: '0, 180, 216',
    tagColor: '#38bdf8',
    gradientCss: 'linear-gradient(135deg, rgba(0, 180, 216, 0.14) 0%, rgba(6, 182, 212, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(0, 180, 216, 0.25)',
    badgeBg: 'rgba(0, 180, 216, 0.10)',
  },
}

export function getCategoryTheme(params: {
  slug?: string
  categories?: string[]
  tag?: string
  industry?: string
  title?: string
  href?: string
}): CategoryTheme {
  const { slug = '', categories = [], tag = '', industry = '', title = '', href = '' } = params
  const catStr = categories.join(' ').toLowerCase()
  const tagStr = tag.toLowerCase()

  // 1. Direct Slug Exact Mapping (Highest Priority & Single Source of Truth for static case studies)
  if (
    slug === 'business-driven-software-system' ||
    slug === 'nlp-text-to-business-application' ||
    slug === 'data-to-application-development' ||
    slug === 'business-portals-around-existing-erp' ||
    slug === 'deployment-management'
  ) {
    return CATEGORY_THEMES['ai-no-code']
  }

  if (
    slug === 'procurement-operations-intelligence' ||
    slug === 'risk-insights-finance' ||
    slug === 'strategic-procurement-intelligence' ||
    slug === 'towards-zero-inventory-variance-ai'
  ) {
    return CATEGORY_THEMES['ai-intelligent-business']
  }

  if (
    slug === 'precision-abm-snowflake-cortex' ||
    slug === 'revolutionizing-inventory-optimization' ||
    slug === 'optimizing-shipment-fleet-snowflake' ||
    slug === 'streamlining-shipment-planning-and-carrier-selection' ||
    slug === 'migrating-hadoop-and-hana-to-snowflake' ||
    slug === 'optimizing-retail-demand-forecasting' ||
    slug === 'power-bi-abm'
  ) {
    return CATEGORY_THEMES['data-engineering']
  }

  if (
    slug === 'cost-model-simulation' ||
    slug === 'enhancing-support-efficiency-with-integrated-order-management' ||
    slug === 'overcoming-data-access-challenges-in-a-multi-business-environment-for-streamlined-decision-making' ||
    slug === 'enhancing-the-rfq-process-in-d365-business-central' ||
    slug === 'tailored-enterprise-solutions'
  ) {
    return CATEGORY_THEMES['digital-engineering']
  }

  if (
    slug === 'fluke-t40' ||
    slug === 'fluke-tv30' ||
    slug === 'industrial-edge-device-engineering' ||
    slug === 'industrial-edge-intelligence' ||
    slug === 'towards-zero-inventory-variance-automation' ||
    slug === 'connected-intelligent-plant'
  ) {
    return CATEGORY_THEMES['industry-automation']
  }

  if (
    slug === 'advanced-vision-inspection-surface' ||
    slug === 'vision-ai-bore-measurement' ||
    slug === 'machine-vision' ||
    slug === 'vision-ai-complex-dimension' ||
    slug === 'zebra-line-inspection' ||
    slug === 'precision-vision-ai-setup' ||
    slug === 'end-to-end-inspection-cell'
  ) {
    return CATEGORY_THEMES['vision-ai']
  }

  // 2. Explicit Categories Array Match (From Payload / Database)
  if (categories && categories.length > 0) {
    const primaryCat = categories[0].toLowerCase()
    if (primaryCat.includes('no-code') || primaryCat.includes('no code') || primaryCat.includes('text-to-application')) return CATEGORY_THEMES['ai-no-code']
    if (primaryCat.includes('intelligent business') || primaryCat.includes('ai & intelligent')) return CATEGORY_THEMES['ai-intelligent-business']
    if (primaryCat.includes('vision')) return CATEGORY_THEMES['vision-ai']
    if (primaryCat.includes('data engineering')) return CATEGORY_THEMES['data-engineering']
    if (primaryCat.includes('digital engineering')) return CATEGORY_THEMES['digital-engineering']
    if (primaryCat.includes('industry automation') || primaryCat.includes('automation')) return CATEGORY_THEMES['industry-automation']
    if (primaryCat.includes('supply chain')) return CATEGORY_THEMES['supply-chain']
    if (primaryCat.includes('manufacturing')) return CATEGORY_THEMES['manufacturing']
  }

  // 3. Fallback Tag / Keyword Matching
  if (tagStr.includes('no-code') || catStr.includes('no-code') || href.includes('ai-no-code')) return CATEGORY_THEMES['ai-no-code']
  if (tagStr.includes('intelligent business') || catStr.includes('intelligent business')) return CATEGORY_THEMES['ai-intelligent-business']
  if (tagStr.includes('vision ai') || catStr.includes('vision') || href.includes('vision')) return CATEGORY_THEMES['vision-ai']
  if (tagStr.includes('data engineering') || catStr.includes('data engineering') || href.includes('snowflake')) return CATEGORY_THEMES['data-engineering']
  if (tagStr.includes('digital engineering') || catStr.includes('digital engineering')) return CATEGORY_THEMES['digital-engineering']
  if (tagStr.includes('industry automation') || catStr.includes('industry automation')) return CATEGORY_THEMES['industry-automation']
  if (tagStr.includes('supply chain') || catStr.includes('supply chain')) return CATEGORY_THEMES['supply-chain']
  if (tagStr.includes('manufacturing') || catStr.includes('manufacturing')) return CATEGORY_THEMES['manufacturing']

  return CATEGORY_THEMES.default
}
