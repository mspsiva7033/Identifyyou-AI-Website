import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { FlowChain } from '@/components/ui/FlowChain'
import AnimatedMetrics from './components/AnimatedMetrics'
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
    eyebrow: 'AI THAT SEES',
    title: 'Vision AI',
    subtext: 'See. Inspect. Measure. Decide.',
    flow: 'Camera → Image → Computer Vision → AI → Measurement → Decision',
    href: '/deep-tech/vision-ai',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
  },
  {
    type: 'ai-business',
    badge: 'DECISION ENGINE',
    eyebrow: 'AI THAT THINKS',
    title: 'AI & Intelligent Business',
    subtext: 'Turn Business Decisions Into Intelligent Decisions.',
    flow: 'Business Data → AI → Prediction → Recommendation → Decision',
    href: '/deep-tech/ai-intelligent-business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    eyebrow: 'AI THAT ACTS',
    title: 'AI-Powered No-Code + Automation',
    subtext: 'Build Intelligent Applications Without Traditional Code.',
    flow: 'AI Decision → Workflow → Automation → Action',
    href: '/deep-tech/ai-no-code',
    image: '/images/deep-tech-chip.jpg',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    type: 'automation',
    badge: 'ROBOTICS & PLCs',
    eyebrow: 'AI THAT CONNECTS',
    title: 'Industry Automation',
    subtext: 'Connect. Automate. Optimize.',
    flow: 'Robots → PLCs → Sensors → Edge → Automation',
    href: '/deep-tech/industry-automation',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    eyebrow: 'AI THAT ENABLES',
    title: 'Data Engineering',
    subtext: 'Turn Data Into a Trusted Business Asset.',
    flow: 'Raw Data → Ingestion → Pipeline → Analytics → Asset',
    href: '/deep-tech/data-engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
  },
  {
    type: 'digital-engineering',
    badge: 'ENTERPRISE SAAS',
    eyebrow: 'AI THAT DELIVERS',
    title: 'Digital Engineering',
    subtext: 'Engineer Digital Products That Solve Real Business Problems.',
    flow: 'Workflow → Architecture → Cloud → SaaS → Business Value',
    href: '/deep-tech/digital-engineering',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
]

// AI & INTELLIGENT BUSINESS CASE STUDIES (4 Cards Before Deep Tech Across Industries)
const aiIntelligentBusinessCaseStudies = [
  {
    title: 'ABM – Snowflake Solution',
    desc: 'Precision ABM powered by Cortex AI within the Snowflake AI Data Cloud.',
    href: 'https://identifyyou.in/projects/precision-abm-powered-by-cortex-ai-within-the-snowflake-ai-data-cloud/',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    isExternal: true,
  },
  {
    title: 'Zebra Line Inspection',
    desc: 'Infusing AI and Deep Learning into floating glass on-line inspection systems.',
    href: 'https://identifyyou.in/projects/infusing-ai-and-deep-learning-into-floating-glass-on-line-inspection-systems/',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    isExternal: true,
  },
  {
    title: 'Machine Vision',
    desc: 'Beyond the lens: Revolutionizing manufacturing through machine vision.',
    href: 'https://identifyyou.in/projects/beyond-the-lens-revolutionizing-manufacturing-through-machine-vision/',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    isExternal: true,
  },
  {
    title: 'Risk Insights Finance',
    desc: 'AI-driven risk analysis and automated financial decision support.',
    href: '/case-studies/risk-insights-finance',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    isExternal: false,
  },
]

// OTHER 4 PILLARS CASE STUDIES (2 Big Cards After Deep Tech Across Industries)
const otherPillarCaseStudies = [
  {
    title: 'Fluke T40 Case Study',
    desc: 'Thermal edge gateway integration for real-time condition monitoring and temperature sensing.',
    href: '/case-studies/fluke-t40',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'UV Light based Defect Detection',
    desc: 'Specialized ultraviolet illumination coupled with high-resolution vision models for micro-crack detection.',
    href: '/case-studies/uv-light-defect-detection',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop',
  },
]

const businessFirstSteps = [
  { n: '01', title: 'Understand', sub: 'Business objective' },
  { n: '02', title: 'Discover', sub: 'Process & operational challenges' },
  { n: '03', title: 'Engineer', sub: 'Right technology architecture' },
  { n: '04', title: 'Integrate', sub: 'Enterprise + operational ecosystem' },
]

const visionCapabilities = [
  { c1: 'Dimensional Inspection', c2: 'Surface Inspection' },
  { c1: 'Defect Detection', c2: 'Counting & Classification' },
  { c1: 'Assembly Verification', c2: 'Visual Identification' },
]

const mfgSubcategories = [
  { sub1: 'Automotive & Auto Components', sub2: 'Engineering & Industrial' },
  { sub1: 'Metal Forming / Forging', sub2: 'Discrete Manufacturing' },
  { sub1: 'Process Manufacturing', sub2: 'Quality & Inspection' },
]

// FEATURED SOLUTION CARDS (Smart Factory & Thinking Factory)
const featuredSolutions = [
  {
    title: 'Smart Factory',
    subtitle: 'IdentifYou Transformation',
    desc: 'MES, production monitoring, digital shop-floor workflows, and transformation video.',
    href: '/case-studies/manufacturing-data-platform',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    hasVideo: true,
  },
  {
    title: 'Thinking Factory',
    subtitle: 'AI & Autonomous Decisions',
    desc: 'Closed-loop AI inferencing driving shop floor optimization and predictive actions.',
    href: '/case-studies/thinking-factory',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    hasVideo: false,
  },
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
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
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
        <circle cx="5" cy="12" r="4" fill="#FF3366"/>
        <circle cx="12" cy="12" r="4" fill="#FFCC00"/>
        <circle cx="19" cy="12" r="4" fill="#00CA72"/>
      </svg>
    ),
  },
  {
    name: 'Zendesk',
    desc: 'Service platform integrations and apps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#03363D">
        <path d="M12 2L2 12h7v10l10-10h-7V2z"/>
      </svg>
    ),
  },
  {
    name: 'Basler',
    desc: 'Industrial cameras, 2D/3D vision hardware and sensor integration.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E8B62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    name: 'Vision hardware & software vendors',
    desc: '2D CAMERA, 3D PROFILER, VISION AI SOFTWARE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E8B62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
        <line x1="9.69" y1="8" x2="21.17" y2="8"/>
        <line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
        <line x1="9.69" y1="16" x2="3.95" y2="6.06"/>
        <line x1="14.31" y1="16" x2="2.83" y2="16"/>
        <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
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
          <h2 className={styles.h2Dark}>All that Sees, All that Thinks and All that Act</h2>
          
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

      {/* 4. VISION AI CASE STUDY SECTION (Next to All that Sees, All that Thinks and All that Act) */}
      <section className={styles.sectionVisionCaseStudy}>
        <div className={styles.containerNarrow}>
          <div className={styles.visionCaseStudyBox}>
            <div className={styles.visionCaseStudyTag}>Vision AI Case Study</div>
            <h2 className={styles.visionCaseStudyTitle}>
              Transforming Manufacturing Quality with Visual Intelligence — Powered by AI
            </h2>

            <div className={styles.visionCaseStudyGrid}>
              <div className={styles.visionCaseStudyDesc}>
                <p>
                  Manufacturing quality is not just about seeing defects. It is about making the right quality decision, at the right time, on the production line.
                </p>
                <p>
                  IdentifYou uses Visual Intelligence and AI to help manufacturers continuously understand what is happening on the production line, identify quality risks and turn visual information into real-time operational decisions — detecting defects, verifying processes, identifying deviations and enabling automated decisions in real time.
                </p>
                <p>
                  The value goes beyond capturing images. It lies in turning what the production line sees into data, data into intelligence, and intelligence into action.
                </p>
                <p>
                  By engineering AI-driven visual inspection into the manufacturing process, quality control can move from a reactive cost centre to a proactive capability that improves quality, reduces waste, strengthens process control and drives operational performance.
                </p>
              </div>

              <div className={styles.visionCaseStudyCaps}>
                <div className={styles.visionCapsTitle}>Capabilities & Offerings</div>
                <div className={styles.visionCapsList}>
                  {visionCapabilities.map((cap, idx) => (
                    <React.Fragment key={idx}>
                      <div className={styles.visionCapBadge}>{cap.c1}</div>
                      <div className={styles.visionCapBadge}>{cap.c2}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUSINESS-FIRST PROCESS (Black Background) */}
      <section className={styles.sectionDarkProcess}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2DarkProcess}>We start with the Business. Not the Technology</h2>
          <div className={styles.processStepsHorizontal}>
            {businessFirstSteps.map((step, idx) => (
              <div key={step.n} className={styles.processStepHorizWrap}>
                <div className={styles.processStepHoriz}>
                  <span className={styles.stepBadgeHoriz}>{step.n}</span>
                  <h3 className={styles.stepNameHoriz}>{step.title}</h3>
                  <p className={styles.stepSubHoriz}>{step.sub}</p>
                </div>
                {idx < businessFirstSteps.length - 1 && (
                  <span className={styles.stepArrowHoriz}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEFORE DEEP TECH ACROSS INDUSTRIES: 4 CARDS FOR CASE STUDIES OF 'AI & INTELLIGENT BUSINESS' */}
      <section className={styles.sectionSolutions}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>AI & INTELLIGENT BUSINESS</div>
          <h2 className={styles.h2SolutionsTitle}>Case Studies in Intelligent Business</h2>

          <div className={styles.solutionsTwoColGrid}>
            {aiIntelligentBusinessCaseStudies.map((cs) => (
              <a
                key={cs.title}
                href={cs.href}
                target={cs.isExternal ? '_blank' : '_self'}
                rel={cs.isExternal ? 'noopener noreferrer' : undefined}
                className={styles.solutionCardFull}
              >
                <div className={styles.solutionBgVisual}>
                  <img src={cs.image} alt={cs.title} className={styles.solRealImg} loading="lazy" />
                  <div className={styles.solGlow} />
                </div>
                <div className={styles.solOverlayContent}>
                  <h3 className={styles.solTitleFull}>{cs.title}</h3>
                  <p className={styles.solDescFull}>{cs.desc}</p>
                  <div className={styles.knowMoreHoverBtn}>
                    View Case Study {cs.isExternal ? '↗' : '→'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DEEP TECH ACROSS INDUSTRIES */}
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
                <div className={styles.cardBadgeTag}>PRIMARY INDUSTRY</div>
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
                <span className={styles.secBadge}>SECONDARY</span>
                <h3 className={styles.secTitle}>Healthcare</h3>
                <p className={styles.secDesc}>
                  Digital workflows, data engineering, AI, automation, enterprise applications and analytics.
                </p>
              </div>
              <div className={styles.secondaryCard}>
                <span className={styles.secBadge}>SECONDARY</span>
                <h3 className={styles.secTitle}>Financial Services & FinTech</h3>
                <p className={styles.secDesc}>
                  Data platforms, AI, analytics, intelligent decision support, digital engineering and enterprise integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. AFTER DEEP TECH ACROSS INDUSTRIES: 2 BIG CARDS FOR CASE STUDIES OF OTHER 4 PILLARS */}
      <section className={styles.sectionSolutions}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>DEEP TECH IN PRACTICE</div>
          <h2 className={styles.h2SolutionsTitle}>Case Studies Across Deep Tech Pillars</h2>

          <div className={styles.solutionsTwoColGrid}>
            {otherPillarCaseStudies.map((cs) => (
              <Link key={cs.title} href={cs.href} className={styles.solutionCardFull}>
                <div className={styles.solutionBgVisual}>
                  <img src={cs.image} alt={cs.title} className={styles.solRealImg} loading="lazy" />
                  <div className={styles.solGlow} />
                </div>
                <div className={styles.solOverlayContent}>
                  <h3 className={styles.solTitleFull}>{cs.title}</h3>
                  <p className={styles.solDescFull}>{cs.desc}</p>
                  <div className={styles.knowMoreHoverBtn}>
                    Explore Case Study →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NO-CODE PLATFORM HERO BANNER */}
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Visual Drag & Drop Workflows</span>
                </div>
                <div className={styles.noCodeFeatureItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Native AI Agent Integrations</span>
                </div>
                <div className={styles.noCodeFeatureItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FCB90" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Enterprise ERP & MES Connectors</span>
                </div>
              </div>

              <div className={styles.noCodeCTAWrap}>
                <Link href="/deep-tech/ai-no-code" className={styles.noCodePrimaryBtn}>
                  Explore No-Code Platform →
                </Link>
                <Link href="/contact" className={styles.noCodeSecondaryBtn}>
                  Schedule a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SMART FACTORY & CAPABILITY CASE STUDIES */}
      <section className={styles.sectionSolutions}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>SMART FACTORY CAPABILITY</div>
          <h2 className={styles.h2SolutionsTitle}>
            Capability Case Studies: Smart Factory
          </h2>

          <div className={styles.solutionsTwoColGrid}>
            {featuredSolutions.map((sol) => (
              <Link key={sol.title} href={sol.href} className={styles.solutionCardFull}>
                <div className={styles.solutionBgVisual}>
                  {sol.hasVideo ? (
                    <video
                      src="/videos/identifyyou_transformation.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.solRealImg}
                    />
                  ) : (
                    <img src={sol.image} alt={sol.title} className={styles.solRealImg} loading="lazy" />
                  )}
                  <div className={styles.solGlow} />
                </div>
                <div className={styles.solOverlayContent}>
                  <span className={styles.aiEyebrowFull}>{sol.subtitle}</span>
                  <h3 className={styles.solTitleFull}>{sol.title}</h3>
                  <p className={styles.solDescFull}>{sol.desc}</p>
                  <div className={styles.knowMoreHoverBtn}>
                    Explore Capability →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ENGAGEMENT MODELS & STAFF AUGMENTATION */}
      <section className={styles.sectionEngagement}>
        <div className={styles.container}>
          <div className={styles.eyebrowGreen}>ENGAGEMENT MODELS</div>
          <h2 className={styles.h2EngageTitle}>Choose the Model That Fits Your Business</h2>

          <div className={styles.engageGrid}>
            {/* Outcome-Based Delivery */}
            <div className={styles.engageCard}>
              <h3 className={styles.engageCardTitle}>Outcome-Based Delivery</h3>
              <p className={styles.engageCardDesc}>
                From problem definition to deployed solution. You define the business outcome; we take responsibility
                for delivering it end to end.
              </p>
              <div className={styles.phaseTags}>
                <span className={styles.phaseTag}>DISCOVERY</span>
                <span className={styles.phaseTag}>ARCHITECTURE</span>
                <span className={styles.phaseTag}>DESIGN</span>
                <span className={styles.phaseTag}>ENGINEERING</span>
                <span className={styles.phaseTag}>INTEGRATION</span>
                <span className={styles.phaseTag}>DEPLOYMENT</span>
                <span className={styles.phaseTag}>TRAINING</span>
                <span className={styles.phaseTag}>SUPPORT</span>
              </div>
            </div>

            {/* Staff Augmentation */}
            <div className={styles.engageCard}>
              <h3 className={styles.engageCardTitle}>Staff Augmentation</h3>
              <p className={styles.engageCardDesc}>
                Extend your engineering capabilities with specialised talent, working inside your process and tooling.
              </p>
              <div className={styles.staffRolesGrid}>
                <div className={styles.roleItem}>• AI Engineers</div>
                <div className={styles.roleItem}>• Data Engineers</div>
                <div className={styles.roleItem}>• Edge / IIOT Engineers</div>
                <div className={styles.roleItem}>• Automation Engineers</div>
                <div className={styles.roleItem}>• Cloud Engineers</div>
                <div className={styles.roleItem}>• Software Engineers</div>
                <div className={styles.roleItem}>• Computer Vision Engineers</div>
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
