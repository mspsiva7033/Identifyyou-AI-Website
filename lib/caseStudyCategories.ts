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
    tintColor: '#3a86ef',
    tintRgb: '58, 134, 239',
    tagColor: '#60a5fa',
    gradientCss: 'linear-gradient(135deg, rgba(58, 134, 239, 0.14) 0%, rgba(37, 99, 235, 0.04) 100%)',
    overlayOpacity: 0.14,
    hoverGlow: 'rgba(58, 134, 239, 0.25)',
    badgeBg: 'rgba(58, 134, 239, 0.10)',
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
  const combined = `${slug} ${tag} ${industry} ${title} ${href} ${categories.join(' ')}`.toLowerCase()

  // 1. Check explicit categories array
  if (categories && categories.length > 0) {
    const catStr = categories.join(' ').toLowerCase()
    if (catStr.includes('no-code') || catStr.includes('no code') || catStr.includes('text-to-application') || catStr.includes('data-to-application')) return CATEGORY_THEMES['ai-no-code']
    if (catStr.includes('vision')) return CATEGORY_THEMES['vision-ai']
    if (catStr.includes('data engineering') || catStr.includes('data platform')) return CATEGORY_THEMES['data-engineering']
    if (catStr.includes('digital engineering')) return CATEGORY_THEMES['digital-engineering']
    if (catStr.includes('industry automation') || catStr.includes('automation')) return CATEGORY_THEMES['industry-automation']
    if (catStr.includes('ai & intelligent') || catStr.includes('intelligent business') || (catStr.includes('ai') && !catStr.includes('vision'))) return CATEGORY_THEMES['ai-intelligent-business']
    if (catStr.includes('supply chain')) return CATEGORY_THEMES['supply-chain']
    if (catStr.includes('manufacturing')) return CATEGORY_THEMES['manufacturing']
  }

  // 2. Slugs & Hrefs mapping
  if (
    slug.includes('business-driven-software') ||
    slug.includes('nlp-text-to-business') ||
    slug.includes('data-to-application') ||
    slug.includes('business-portals-around-existing-erp') ||
    slug.includes('deployment-management') ||
    slug.includes('ai-no-code') ||
    slug.includes('no-code') ||
    href.includes('ai-no-code')
  ) {
    return CATEGORY_THEMES['ai-no-code']
  }
  if (
    slug.includes('vision') ||
    slug.includes('surface') ||
    slug.includes('bore') ||
    slug.includes('dimension') ||
    slug.includes('inspection') ||
    slug.includes('metrology') ||
    href.includes('vision') ||
    href.includes('inspection')
  ) {
    return CATEGORY_THEMES['vision-ai']
  }

  if (
    slug.includes('snowflake') ||
    slug.includes('data') ||
    slug.includes('abm') ||
    slug.includes('analytics') ||
    slug.includes('hadoop') ||
    href.includes('snowflake') ||
    href.includes('data')
  ) {
    return CATEGORY_THEMES['data-engineering']
  }

  if (
    slug.includes('fluke') ||
    slug.includes('pyrometer') ||
    slug.includes('edge-device') ||
    slug.includes('edge-intelligence') ||
    slug.includes('automation') ||
    href.includes('fluke')
  ) {
    return CATEGORY_THEMES['industry-automation']
  }

  if (
    slug.includes('tailored-enterprise') ||
    slug.includes('digital-engineering') ||
    combined.includes('digital engineering')
  ) {
    return CATEGORY_THEMES['digital-engineering']
  }

  if (
    slug.includes('procurement') ||
    slug.includes('risk-insights') ||
    slug.includes('intelligent') ||
    combined.includes('ai & intelligent')
  ) {
    return CATEGORY_THEMES['ai-intelligent-business']
  }

  if (slug.includes('fleet') || slug.includes('logistics') || combined.includes('supply chain')) {
    return CATEGORY_THEMES['supply-chain']
  }

  // 3. Fallback string searching
  if (combined.includes('vision')) return CATEGORY_THEMES['vision-ai']
  if (combined.includes('data engineering') || combined.includes('snowflake') || combined.includes('data')) return CATEGORY_THEMES['data-engineering']
  if (combined.includes('digital engineering')) return CATEGORY_THEMES['digital-engineering']
  if (combined.includes('industry automation') || combined.includes('pyrometer') || combined.includes('edge')) return CATEGORY_THEMES['industry-automation']
  if (combined.includes('ai & intelligent') || combined.includes('intelligent business') || combined.includes('procurement') || combined.includes('risk')) return CATEGORY_THEMES['ai-intelligent-business']
  if (combined.includes('supply chain') || combined.includes('inventory') || combined.includes('fleet')) return CATEGORY_THEMES['supply-chain']
  if (combined.includes('manufacturing')) return CATEGORY_THEMES['manufacturing']

  return CATEGORY_THEMES.default
}
