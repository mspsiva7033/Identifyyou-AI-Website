import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { FlowChain } from '@/components/ui/FlowChain'
import { CaseStudyCard } from '@/components/ui/CaseStudyCard'
import { SmartFactoryCard } from '@/components/ui/SmartFactoryCard'
import AnimatedMetrics from './components/AnimatedMetrics'
import { getCategoryTheme } from '@/lib/caseStudyCategories'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'IdentifYou Technologies — Deep Tech. Built Around Business.',
  description:
    'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
}

// ----------------------------------------------------------------------
// DATA STRUCTURES FOR HOME PAGE
// ----------------------------------------------------------------------

// const featuredPillars = [
//   {
//     n: '01',
//     title: 'Vision AI',
//     tagline: 'Camera → Image → Computer Vision → AI → Measurement → Decision',
//     href: '/deep-tech/vision-ai',
//     bgGradient: 'linear-gradient(135deg, #0B1913 0%, #152A20 100%)',
//     icon: '👁️',
//   },
//   {
//     n: '02',
//     title: 'AI & Intelligent Business',
//     tagline: 'Business Data → AI → Prediction → Recommendation → Decision',
//     href: '/deep-tech/ai-intelligent-business',
//     bgGradient: 'linear-gradient(135deg, #111E26 0%, #1A2E3B 100%)',
//     icon: '🧠',
//   },
//   {
//     n: '03',
//     title: 'AI-Powered No-Code + Automation',
//     tagline: 'AI Decision → Workflow → Automation → Action',
//     href: '/deep-tech/ai-no-code',
//     bgGradient: 'linear-gradient(135deg, #1A1810 0%, #2E291B 100%)',
//     icon: '⚡',
//   },
// ]

const supportingPillars = [
  {
    n: '04',
    title: 'Industry Automation',
    subtext: 'Connect. Automate. Optimize.',
    desc: 'Industrial robotics and machine connectivity.',
    href: '/deep-tech/industry-automation',
    icon: '🤖',
  },
  {
    n: '05',
    title: 'Data Engineering',
    subtext: 'Turn Data Into a Trusted Business Asset.',
    desc: 'Enterprise data pipeline visualization.',
    href: '/deep-tech/data-engineering',
    icon: '📊',
  },
  {
    n: '06',
    title: 'Digital Engineering',
    subtext: 'Engineer Digital Products That Solve Real Business Problems.',
    desc: 'Enterprise application / SaaS product screen.',
    href: '/deep-tech/digital-engineering',
    icon: '💻',
  },
]

// ----------------------------------------------------------------------
// DATA STRUCTURES FOR HOME PAGE
// ----------------------------------------------------------------------

const aiTopRowPillars = [
  {
    type: 'vision-ai',
    badge: 'COMPUTER VISION',
    eyebrow: 'AI That Sees',
    title: 'Vision AI',
    subtext: 'See. Inspect. Measure. Decide.',
    flow: 'Camera → Image → Computer Vision → AI → Measurement → Decision',
    href: '/deep-tech/vision-ai',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
  },
  {
    type: 'ai-business',
    badge: 'DECISION ENGINE',
    eyebrow: 'AI That Thinks',
    title: 'AI & Intelligent Business',
    subtext: 'Turn Business Decisions Into Intelligent Decisions.',
    flow: 'Business Data → AI → Prediction → Recommendation → Decision',
    href: '/deep-tech/ai-intelligent-business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
        <polyline points="6 10 10 7 14 11 18 7"></polyline>
      </svg>
    ),
  },
]

const aiBottomRowPillars = [
  {
    type: 'no-code',
    badge: 'NO-CODE PLATFORM',
    eyebrow: 'AI That Acts',
    title: 'AI-Powered No-Code + Automation',
    subtext: 'Build Intelligent Applications Without Traditional Code.',
    flow: 'AI Decision → Workflow → Automation → Action',
    href: '/deep-tech/ai-no-code',
    image: '/images/deep-tech-chip.jpg',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    type: 'automation',
    badge: 'ROBOTICS & PLCs',
    eyebrow: 'AI That Acts',
    title: 'Industry Automation',
    subtext: 'Connect. Automate. Optimize.',
    flow: 'Robots → PLCs → Sensors → Edge → Automation',
    href: '/deep-tech/industry-automation',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8.01" y2="16"></line>
        <line x1="16" y1="16" x2="16.01" y2="16"></line>
      </svg>
    ),
  },
  {
    type: 'data-engineering',
    badge: 'DATA PIPELINES',
    eyebrow: 'AI That Acts',
    title: 'Data Engineering',
    subtext: 'Turn Data Into a Trusted Business Asset.',
    flow: 'Raw Data → Ingestion → Pipeline → Analytics → Asset',
    href: '/deep-tech/data-engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
  },
  {
    type: 'digital-engineering',
    badge: 'ENTERPRISE SaaS',
    eyebrow: 'AI That Acts',
    title: 'Digital Engineering',
    subtext: 'Engineer Digital Products That Solve Real Business Problems.',
    flow: 'Workflow → Architecture → Cloud → SaaS → Business Value',
    href: '/deep-tech/digital-engineering',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
]

// FEATURED 2 LARGE CASE STUDIES FOR INTELLIGENT BUSINESS (Top Row)
const featuredIntelligentBusinessCaseStudies = [
  {
    title: 'Smart Factory',
    industry: 'MANUFACTURING · MES & DIGITAL SHOP FLOOR',
    href: '/case-studies/connected-intelligent-plant',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Risk Insights Finance',
    industry: 'FINANCIAL SERVICES · RISK INTELLIGENCE',
    href: '/case-studies/risk-insights-finance',
    image: '/images/case-studies/risk-insights-finance.png',
  },
]

// REMAINING 3 SMALL CASE STUDIES FOR INTELLIGENT BUSINESS (Bottom Row, 3 Columns)
const smallIntelligentBusinessCaseStudies = [
  {
    title: 'Zebra Line Inspection',
    industry: 'MANUFACTURING · VISION AI',
    href: '/case-studies/zebra-line-inspection',
    image: '/images/case-studies/advanced-vision-inspection-surface.svg',
  },
  {
    title: 'Machine Vision',
    industry: 'MANUFACTURING · PRECISION METROLOGY',
    href: '/case-studies/machine-vision',
    image: '/images/case-studies/vision-ai-bore-measurement.svg',
  },
  {
    title: 'Thinking Factory',
    industry: 'AI & AUTONOMOUS DECISIONS',
    href: '/thinking-factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
  },
]

// OTHER DEEP TECH PILLARS CASE STUDIES (2 Big Cards)
const otherPillarCaseStudies = [
  {
    title: 'Enterprise Inventory Optimization',
    desc: 'Real-time data ingestion into Snowflake with automated ML safety stock replenishment models.',
    href: '/case-studies/revolutionizing-inventory-optimization',
    image: '/images/retail_inventory_dashboard.png',
  },
  {
    title: 'UV Light based Defect Detection',
    desc: 'Specialized ultraviolet illumination coupled with high-resolution vision models for micro-crack detection.',
    href: '/case-studies/advanced-vision-inspection-surface',
    image: '/images/uv_light_defect_detection.png',
  },
]

const mfgSubcategories = [
  { sub1: 'Automotive & Auto Components', sub2: 'Engineering & Industrial' },
  { sub1: 'Metal Forming / Forging', sub2: 'Discrete Manufacturing' },
  { sub1: 'Process Manufacturing', sub2: 'Quality & Inspection' },
]

// PRODUCTS BY CATEGORY TABLE DATA
const productCategories = [
  {
    category: 'IIOT & EDGE',
    items: [
      { name: 'Industrial Edge Gateway – Fluke Thermalert T40 / TV30', status: 'Available' },
      { name: 'Multi-protocol machine gateway', status: 'Available' },
      { name: 'Edge monitoring & alerting app', status: 'Available' },
    ],
  },
  {
    category: 'ENTERPRISE AI',
    items: [
      { name: 'Precision ABM on Snowflake Cortex AI', status: 'Snowflake Native App' },
      { name: 'Intelligent procurement application', status: 'Available' },
      { name: 'Quality intelligence application', status: 'Available' },
    ],
  },
  {
    category: 'CRM & SERVICE',
    items: [
      { name: 'Automerger of Duplicate Tickets in Freshdesk', status: 'Dynamically builds merge algorithm' },
      { name: 'Azure DevOps – monday.com Integration', status: 'Rapid information exchange' },
      { name: 'Further Freshworks & Zendesk plugins', status: 'Available' },
    ],
  },
  {
    category: 'ERP',
    items: [
      { name: 'Multi Vendor for Purchase Quotation', status: 'MS D365 Business Central' },
      { name: 'ERP extensions & connectors', status: 'Available' },
    ],
  },
]

// METRICS
const metrics = [
  { stat: '6+', label: 'YEARS IN BUSINESS' },
  { stat: '150+', label: 'CUSTOMERS' },
  { stat: '20+', label: 'PLUGINS' },
  { stat: '1M+', label: 'CUSTOMER REQUESTS' },
]

// PARTNERSHIPS
const partnerships = [
  {
    name: 'Snowflake',
    desc: 'Partner practice. Certified professionals, Cortex AI, Native Apps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" /><line x1="20" y1="7" x2="4" y2="17" /><line x1="20" y1="17" x2="4" y2="7" />
        <polyline points="9 5 12 2 15 5" /><polyline points="9 19 12 22 15 19" />
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    desc: 'Power BI, Azure and D365 Business Central.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Freshworks',
    desc: 'Marketplace plugins and integration platforms.',
    icon: <img src="/images/freshworks-logo.webp" alt="Freshworks" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />,
  },
  {
    name: 'monday.com',
    desc: 'Work management integrations, including Azure DevOps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="4" fill="#FF3366" />
        <circle cx="12" cy="12" r="4" fill="#FFCC00" />
        <circle cx="19" cy="12" r="4" fill="#00CA72" />
      </svg>
    ),
  },
  {
    name: 'Zendesk',
    desc: 'Service platform integrations and apps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#03363D">
        <path d="M12 2L2 12h7v10l10-10h-7V2z" />
      </svg>
    ),
  },
  {
    name: 'Basler',
    desc: 'Industrial cameras, 2D/3D vision hardware and sensor integration.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    name: 'Vision hardware & software vendors',
    desc: '2D CAMERA, 3D PROFILER, VISION AI SOFTWARE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
    ),
  },
]

// TESTIMONIALS
const testimonials = [
  {
    quote:
      'We recently had the pleasure of working with IdentifYou on an integration project, and the team met all our expectations — from initial consultation to final delivery, with a high level of expertise and dedication.',
    company: 'BW Group',
  },
  {
    quote:
      'Great job done. I was impressed by the way your team got the entire portal done. Sure, will reach out to you in the near future.',
    company: 'Disprz',
  },
  {
    quote:
      'They understand manufacturing & technology equally well, which makes a big difference when building floor-to-cloud applications.',
    company: 'Leading Auto OEM Supplier',
  },
  {
    quote: "The app is working as expected. Appreciate you and your team's support on this.",
    company: 'BATA',
  },
]

// ----------------------------------------------------------------------
// HOME PAGE COMPONENT
// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* 1. HERO SECTION (Page 1) */}
      <HeroSection />

      {/* 2. INTRO STATEMENT & HEADING */}
      <section className={styles.sectionIntro}>
        <div className={styles.containerText}>
          <h2 className={styles.h2Center}>Deep Tech That Solves Real Business Problems</h2>
          <div className={styles.introBetweenLine} />
          <p className={styles.introParagraph}>
            We don&apos;t start with technology. We start with the business problem, operational challenge or growth
            opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience
            across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution
            around it.
          </p>
        </div>
      </section>

      {/* 3. AI THAT SEES, THINKS, ACTS & DEEP TECH CAPABILITIES */}
      <section className={styles.sectionDark}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2Dark}>
            AI <span className={styles.wordThat}>that</span> <span className={styles.wordSees}>SEES</span>, AI <span className={styles.wordThat}>that</span> <span className={styles.wordThinks}>THINKS</span> <span className={styles.wordAnd}>and</span> AI <span className={styles.wordThat}>that</span> <span className={styles.wordActs}>ACTS</span>
          </h2>

          {/* Row 1: Vision AI and AI & Intelligent Business (2 Bigger Boxes) */}
          <div className={styles.aiRowTopGrid}>
            {aiTopRowPillars.map((item) => (
              <Link key={item.title} href={item.href} className={styles.aiCardFullCoverBig}>
                <div className={styles.aiCardBgVisual}>
                  <img src={item.image} alt={item.title} className={styles.aiCardBgImg} loading="lazy" />
                  <div className={styles.aiCardGradientOverlay} />
                </div>
                <div className={styles.aiCardTopHeader}>
                  <span className={styles.aiCardPillBadge}>{item.badge}</span>
                  <div className={styles.aiCardIconBox}>{item.iconSvg}</div>
                </div>
                <div className={styles.aiCardContentFull}>
                  <span className={styles.aiEyebrowFull}>{item.eyebrow}</span>
                  <h3 className={styles.aiTitleFullBig}>{item.title}</h3>
                  <p className={styles.aiSubtextFullBig}>{item.subtext}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2: Remaining 4 Pillars (4 Smaller Boxes) */}
          <div className={styles.aiRowBottomGrid}>
            {aiBottomRowPillars.map((item) => (
              <Link key={item.title} href={item.href} className={styles.aiCardFullCover}>
                <div className={styles.aiCardBgVisual}>
                  <img src={item.image} alt={item.title} className={styles.aiCardBgImg} loading="lazy" />
                  <div className={styles.aiCardGradientOverlay} />
                </div>
                <div className={styles.aiCardTopHeader}>
                  <span className={styles.aiCardPillBadgeSmall}>{item.badge}</span>
                  <div className={styles.aiCardIconBoxSmall}>{item.iconSvg}</div>
                </div>
                <div className={styles.aiCardContentFull}>
                  <span className={styles.aiEyebrowFull}>{item.eyebrow}</span>
                  <h3 className={styles.aiTitleFull}>{item.title}</h3>
                  <p className={styles.aiSubtextFull}>{item.subtext}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1. VISION AI CASE STUDY (Banner Type Layout, Black BG) */}
      <section className={styles.sectionBannerDark}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerTag}>VISION AI</div>
          <h2 className={styles.bannerTitleDark}>
            Transforming Manufacturing Quality with Visual Intelligence — Powered by AI
          </h2>
          <div className={styles.bannerGrid}>
            <div className={styles.bannerDescDark}>
              <p>
                Manufacturing quality is not just about seeing defects. It is about making the right quality decision, at the right time, on the production line.
              </p>
              <p>
                IdentifYou uses Visual Intelligence and AI to help manufacturers continuously understand what is happening on the production line, identify quality risks and turn visual information into real-time operational decisions — detecting defects, verifying processes, identifying deviations and enabling automated decisions in real time.
              </p>
              <p>
                By engineering AI-driven visual inspection into the manufacturing process, quality control can move from a reactive cost centre to a proactive capability that improves quality, reduces waste, strengthens process control and drives operational performance.
              </p>
              <Link href="/case-studies/advanced-vision-inspection-surface" className={styles.bannerBtnPrimary}>
                Explore Vision AI Case Study →
              </Link>
            </div>
            <div className={styles.bannerImgWrapDark}>
              <img
                src="/images/vision_ai_hero_production_line.png"
                alt="Vision AI Automated Inspection"
                className={styles.bannerImg}
              />
              <div className={styles.colorTintLayer} style={{ backgroundColor: getCategoryTheme({ categories: ['Vision AI'] }).tintColor, opacity: getCategoryTheme({ categories: ['Vision AI'] }).overlayOpacity }} />
              <div className={styles.colorGradientLayer} style={{ background: getCategoryTheme({ categories: ['Vision AI'] }).gradientCss }} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABM – SNOWFLAKE CORTEX (DATA ENGINEERING) (Banner Type Layout, White BG) */}
      <section className={styles.sectionBannerLight}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerTag} style={{ color: getCategoryTheme({ categories: ['Data Engineering'] }).tagColor }}>DATA ENGINEERING</div>
          <h2 className={styles.bannerTitleLight}>
            Precision ABM &amp; Demand Intelligence with Snowflake Cortex AI
          </h2>
          <div className={styles.bannerGrid}>
            <div className={styles.bannerImgWrap}>
              <img
                src="/images/case-studies/precision-abm-snowflake-cortex.png"
                alt="Precision ABM Snowflake Cortex AI"
                className={styles.bannerImg}
              />
              <div className={styles.colorTintLayer} style={{ backgroundColor: getCategoryTheme({ categories: ['Data Engineering'] }).tintColor, opacity: getCategoryTheme({ categories: ['Data Engineering'] }).overlayOpacity }} />
              <div className={styles.colorGradientLayer} style={{ background: getCategoryTheme({ categories: ['Data Engineering'] }).gradientCss }} />
            </div>
            <div className={styles.bannerDescLight}>
              <p>
                Enterprise B2B marketing and sales teams often struggle with fragmented intent signals scattered across CRM, marketing automation, web telemetry, and ERP data stores.
              </p>
              <p>
                IdentifYou unified multi-source enterprise data into Snowflake AI Data Cloud, deploying dbt data pipeline modeling and Snowflake Cortex AI natural language intelligence for real-time B2B account scoring.
              </p>
              <p>
                Delivering a 3.5x boost in high-intent account engagement and unified automated data pipelines.
              </p>
              <Link href="/case-studies/precision-abm-snowflake-cortex" className={styles.bannerBtnOutline}>
                Explore ABM Snowflake Cortex Success Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLUKE T430 / FLUKE T40 (Banner Type Layout, Black BG) */}
      <section className={styles.sectionBannerDark}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerTag} style={{ color: getCategoryTheme({ categories: ['Industry Automation'] }).tagColor }}>INDUSTRY AUTOMATION</div>
          <h2 className={styles.bannerTitleDark}>
            Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer
          </h2>
          <div className={styles.bannerGrid}>
            <div className={styles.bannerDescDark}>
              <p>
                Undetected thermal spikes in extreme manufacturing processes can cause sudden catastrophic machinery failures and expensive unpredicted downtime.
              </p>
              <p>
                We engineered an IP65 industrial edge gateway running Raspberry Pi 4 ARM hardware with RS485 pyrometer polling, local sub-second anomaly detection, and automated rich WhatsApp alerts.
              </p>
              <p>
                Achieving 99.4% equipment uptime, continuous 24/7 thermal assurance, and zero unpredicted critical failures.
              </p>
              <Link href="/case-studies/fluke-t40" className={styles.bannerBtnPrimary}>
                Explore Fluke T40 Success Story →
              </Link>
            </div>
            <div className={styles.bannerImgWrapDark}>
              <img
                src="/images/case-studies/fluke-t40.png"
                alt="Fluke Thermalert T40 Edge Gateway"
                className={styles.bannerImg}
              />
              <div className={styles.colorTintLayer} style={{ backgroundColor: getCategoryTheme({ categories: ['Industry Automation'] }).tintColor, opacity: getCategoryTheme({ categories: ['Industry Automation'] }).overlayOpacity }} />
              <div className={styles.colorGradientLayer} style={{ background: getCategoryTheme({ categories: ['Industry Automation'] }).gradientCss }} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES IN INTELLIGENT BUSINESS (2 Featured Large Cards + 3 Small Cards Below, White BG) */}
      <section id="case-studies" className={styles.sectionSolutions}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>AI &amp; INTELLIGENT BUSINESS</div>
          <h2 className={styles.h2SolutionsTitle}>Success Stories in Intelligent Business</h2>

          {/* Top Row: 2 Featured Large Cards */}
          <div className={styles.featuredTwoGrid}>
            {/* Smart Factory — triggers video modal with full media controls */}
            <SmartFactoryCard
              title="Smart Factory"
              industry="MANUFACTURING · MES & DIGITAL SHOP FLOOR"
              image="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop"
              aspectRatio="16 / 9"
              videoSrc="/videos/identifyyou_transformation.mp4"
              videoTitle="IdentifYou Transformation — Smart Factory"
            />
            {/* Risk Insights Finance — standard navigation */}
            <CaseStudyCard
              key="Risk Insights Finance"
              title="Risk Insights Finance"
              industry="FINANCIAL SERVICES · RISK INTELLIGENCE"
              image="/images/case-studies/risk-insights-finance.png"
              href="/case-studies/risk-insights-finance"
              aspectRatio="16 / 9"
            />
          </div>

          {/* Bottom Row: 3 Small Cards in 3-Column Layout (Zebra Line Inspection, Machine Vision, Thinking Factory) */}
          <div className={styles.solutionsThreeColGrid}>
            {smallIntelligentBusinessCaseStudies.map((cs) => (
              <CaseStudyCard
                key={cs.title}
                title={cs.title}
                industry={cs.industry}
                image={cs.image}
                href={cs.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEEPTECH ACROSS INDUSTRIES (White BG) */}
      <section className={styles.sectionIndustries}>
        <div className={styles.container}>
          <h2 className={styles.h2CenterTitle}>Deep Tech Across Industries</h2>
          <div className={styles.industriesGrid}>
            {/* Primary Industry Card */}
            <div className={styles.primaryMfgCard}>
              <img
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1000&auto=format&fit=crop"
                alt="Manufacturing Industry"
                className={styles.primaryMfgBgImg}
              />
              <div className={styles.mfgCardOverlay} />
              <div className={styles.primaryMfgContent}>
                {/* <div className={styles.cardBadgeTag}>PRIMARY INDUSTRY</div> */}
                <h3 className={styles.mfgTitle}>Manufacturing</h3>
                <div className={styles.mfgSubGrid}>
                  {mfgSubcategories.map((sub, i) => (
                    <div key={i} className={styles.mfgSubRow}>
                      <span className={styles.mfgSubItem}>{sub.sub1}</span>
                      <span className={styles.mfgSubItem}>{sub.sub2}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Industry Cards */}
            <div className={styles.secondaryIndustriesCol}>
              <div className={styles.secondaryCard}>
                {/* <span className={styles.secBadge}>SECONDARY</span> */}
                <h3 className={styles.secTitle}>Healthcare</h3>
                <p className={styles.secDesc}>
                  Digital workflows, data engineering, AI, automation, enterprise applications and analytics.
                </p>
              </div>
              <div className={styles.secondaryCard}>
                {/* <span className={styles.secBadge}>SECONDARY</span> */}
                <h3 className={styles.secTitle}>Financial Services &amp; FinTech</h3>
                <p className={styles.secDesc}>
                  Data platforms, AI, analytics, intelligent decision support, digital engineering and enterprise integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CASE STUDIES ACROSS DEEP TECH PILLARS */}
      <section className={styles.sectionSolutions}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>DEEP TECH IN PRACTICE</div>
          <h2 className={styles.h2SolutionsTitle}>Case Studies Across Deep Tech</h2>

          <div className={styles.solutionsTwoColGrid}>
            {otherPillarCaseStudies.map((cs) => (
              <CaseStudyCard
                key={cs.title}
                title={cs.title}
                image={cs.image}
                href={cs.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. NO-CODE PLATFORM */}
      <section className={styles.sectionNoCodeBanner}>
        <div className={styles.container}>
          <div className={styles.noCodeBannerFrame}>
            <div className={styles.noCodeBackgroundPattern} />
            <div className={styles.noCodeBannerInner}>
              <div className={styles.noCodeBadgeBox}>
                AI-POWERED NO-CODE PLATFORM
              </div>

              <h2 className={styles.noCodeBannerHeadline}>
                Describe It. Build It. Run It. <br />
                <span className={styles.noCodeHeadlineGreen}>No-Code Enterprise Transformation</span>
              </h2>

              <p className={styles.noCodeBannerSub}>
                Build automated workflows, vision AI pipelines, and intelligent operational tools 10x faster—with zero traditional coding overhead.
              </p>

              <div className={styles.noCodeFeaturesInline}>
                <div className={styles.noCodeFeatureItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Visual Drag &amp; Drop Workflows</span>
                </div>
                <div className={styles.noCodeFeatureItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Native AI Agent Integrations</span>
                </div>
                <div className={styles.noCodeFeatureItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94C640" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Enterprise ERP &amp; MES Connectors</span>
                </div>
              </div>

              <div className={styles.noCodeCTAWrap}>
                <Link href="/deep-tech/ai-no-code" className={styles.noCodePrimaryBtn}>
                  Explore No-Code Platform →
                </Link>
                <Link href="/contact?type=demo" className={styles.noCodeSecondaryBtn}>
                  Schedule a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 12. BUSINESS CTA */}
      <section className={styles.sectionBusinessCta}>
        <div className={styles.containerNarrow}>
          <div className={styles.ctaDarkCard}>
            <h2 className={styles.ctaDarkTitle}>Let&apos;s Solve a Business Problem</h2>
            <p className={styles.ctaDarkDesc}>
              Tell us what you&apos;re trying to improve. We&apos;ll help identify where Deep Tech can create measurable
              business value.
            </p>
            <Link href="/contact" className={styles.ctaGreenBtn}>
              Talk to a Deep Tech Expert
            </Link>
          </div>
        </div>
      </section>

      {/* 13. YEARS OF EXPERIENCE / BUSINESS METRICS */}
      <section className={styles.sectionMetrics}>
        <div className={styles.container}>
          <AnimatedMetrics
            metrics={metrics}
            gridClassName={styles.metricsGrid}
            itemClassName={styles.metricItem}
            numClassName={styles.metricNum}
            labelClassName={styles.metricLabel}
          />
        </div>
      </section>

      {/* 14. PARTNERSHIPS */}
      <section className={styles.sectionPartnerships}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>PARTNERSHIPS</div>
          <h2 className={styles.h2PartnersTitle}>Partnership summary</h2>

          <div className={styles.partnersGrid}>
            {partnerships.map((p) => (
              <div key={p.name} className={styles.partnerCard}>
                <div className={styles.partnerHeader}>
                  <div className={styles.partnerIconBox}>{p.icon}</div>
                  <h3 className={styles.partnerName}>{p.name}</h3>
                </div>
                <p className={styles.partnerDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. TESTIMONIALS */}
      <section className={styles.sectionTestimonials}>
        <div className={styles.containerNarrow}>
          <div className={styles.eyebrowAccent}>WHY PEOPLE WORK WITH US</div>
          <h2 className={styles.h2TestimonialsTitle}>Testimonials</h2>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.company} className={styles.testimonialCard}>
                <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.testimonialCompany}>{t.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. FOOTER */}
      <Footer />
    </div>
  )
}
