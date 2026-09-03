import type { Metadata } from 'next'
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

const aiSeesThinkActs = [
  {
    n: '01',
    eyebrow: 'AI THAT SEES',
    title: 'Vision AI',
    subtext: 'See. Inspect. Measure. Decide.',
    flow: 'Camera → Image → Computer Vision → AI → Measurement → Decision',
    href: '/deep-tech/vision-ai',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    n: '02',
    eyebrow: 'AI THAT THINKS',
    title: 'AI & Intelligent Business',
    subtext: 'Turn Business Decisions Into Intelligent Decisions.',
    flow: 'Business Data → AI → Prediction → Recommendation → Decision',
    href: '/deep-tech/ai-intelligent-business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    n: '03',
    eyebrow: 'AI THAT ACTS',
    title: 'AI-Powered No-Code + Automation',
    subtext: 'Build Intelligent Applications Without Traditional Code.',
    flow: 'AI Decision → Workflow → Automation → Action',
    href: '/deep-tech/ai-no-code',
    image: '/images/deep-tech-chip.jpg',
  },
  {
    n: '04',
    eyebrow: 'AI THAT CONNECTS',
    title: 'Industry Automation',
    subtext: 'Connect. Automate. Optimize.',
    flow: 'Robots → PLCs → Sensors → Edge → Automation',
    href: '/deep-tech/industry-automation',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop',
  },
  {
    n: '05',
    eyebrow: 'AI THAT ENABLES',
    title: 'Data Engineering',
    subtext: 'Turn Data Into a Trusted Business Asset.',
    flow: 'Raw Data → Ingestion → Pipeline → Analytics → Asset',
    href: '/deep-tech/data-engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
  {
    n: '06',
    eyebrow: 'AI THAT DELIVERS',
    title: 'Digital Engineering',
    subtext: 'Engineer Digital Products That Solve Real Business Problems.',
    flow: 'Workflow → Architecture → Cloud → SaaS → Business Value',
    href: '/deep-tech/digital-engineering',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
]

const businessFirstSteps = [
  { n: '01', title: 'Understand', sub: 'Business objective' },
  { n: '02', title: 'Discover', sub: 'Process & operational challenges' },
  { n: '03', title: 'Engineer', sub: 'Right technology architecture' },
  { n: '04', title: 'Integrate', sub: 'Enterprise + operational ecosystem' },
]

const visionCapabilities = [
  { c1: 'Defect detection', c2: 'Surface inspection' },
  { c1: 'Dimensional inspection', c2: 'Assembly verification' },
  { c1: 'Counting & classification', c2: 'OCR & visual identification' },
]

const mfgSubcategories = [
  { sub1: 'Automotive & Auto Components', sub2: 'Engineering & Industrial' },
  { sub1: 'Metal Forming / Forging', sub2: 'Discrete Manufacturing' },
  { sub1: 'Process Manufacturing', sub2: 'Quality & Inspection' },
]

const mfgArchitectureLayers = [
  { level: 'L5 ENTERPRISE', stack: 'ERP · CRM · Data Platform · BI', desc: 'Enterprise Planning & Intelligence' },
  { level: 'L4 OPERATIONS', stack: 'MES · Production & Quality Apps', desc: 'Shop-Floor Execution & Operations' },
  { level: 'L3 INTELLIGENCE', stack: 'Vision AI · ML Models · Anomaly Detection', desc: 'Real-time AI & Inferencing' },
  { level: 'L2 EDGE', stack: 'Gateways · Local Compute · Buffering', desc: 'Low-latency Local Processing' },
  { level: 'L1 CONTROL', stack: 'PLC · Robots · OPC UA · MQTT · RS485', desc: 'Machine & Robot Control' },
  { level: 'L0 SHOP FLOOR', stack: 'Machines · Sensors · Cameras · RFID', desc: 'Physical Hardware & Sensors' },
]

// FEATURED SOLUTION CARDS (Smart Factory & AI-Powered Procurement - 2 Cards 1 Line)
const featuredSolutions = [
  {
    title: 'Smart Factory',
    desc: 'MES, production monitoring and digital shop-floor workflows.',
    href: '/case-studies/manufacturing-data-platform',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'AI-Powered Procurement',
    desc: 'Supplier recommendation, price intelligence and forecasting.',
    href: '/case-studies/ai-powered-procurement',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
  },
]

// PRODUCTS BY CATEGORY TABLE DATA (Page 4)
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

// METRICS (Page 5)
const metrics = [
  { stat: '6+', label: 'YEARS IN BUSINESS' },
  { stat: '150+', label: 'CUSTOMERS' },
  { stat: '20+', label: 'PLUGINS' },
  { stat: '1M+', label: 'CUSTOMER REQUESTS' },
]

// PARTNERSHIPS (Page 5)
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

// WHY IDENTIFYOU (Page 6 WITH MANDATORY PROMPT UPDATES - 100% Unique Faceless Images)
const whyIdentifYouCards = [
  {
    title: 'Business First',
    desc: 'We understand the business before designing technology.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Deep Tech',
    desc: 'We engineer solutions using AI, Vision AI, IIoT, Edge and Automation.',
    image: '/images/deep-tech-chip.jpg',
  },
  {
    title: 'Domain and Technology',
    desc: 'Engineers who understand the process on the floor as well as the stack above it.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Outcome Ownership',
    desc: 'Founded in 2017 on integrity, excellence and customer delight. We stay accountable to the result.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'End-to-End Engineering',
    desc: 'From machine and edge to cloud, data, AI and enterprise applications.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Outcome Driven',
    desc: 'We measure success through business impact.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop',
  },
]

// TESTIMONIALS (Page 6)
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

      {/* 2. INTRO STATEMENT & HEADING (Page 1 & 2) */}
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

      {/* 3. AI THAT SEES, THINKS, ACTS & DEEP TECH CAPABILITIES (Cards 01 to 06) */}
      <section className={styles.sectionDark}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2Dark}>AI That Sees. AI That Thinks. AI That Acts.</h2>
          <div className={styles.aiCardsGrid}>
            {aiSeesThinkActs.map((item) => (
              <Link key={item.title} href={item.href} className={styles.aiCardFullCover}>
                <div className={styles.aiCardBgVisual}>
                  <img src={item.image} alt={item.title} className={styles.aiCardBgImg} loading="lazy" />
                  <div className={styles.aiCardGradientOverlay} />
                </div>
                <div className={styles.aiCardTopHeader}>
                  <span className={styles.aiCardNumFull}>{item.n}</span>
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

      {/* 5. BUSINESS-FIRST PROCESS (Horizontal Row) */}
      <section className={styles.sectionDarkProcess}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2DarkProcess}>We Start With the Business. Not the Technology.</h2>
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

      {/* 6. VISION AI SECTION (Page 3) */}
      <section className={styles.sectionVisionAI}>
        <div className={styles.container}>
          <div className={styles.visionTwoCol}>
            <div className={styles.visionTextCol}>
              <div className={styles.eyebrowGreen}>VISION AI</div>
              <h2 className={styles.h2Vision}>AI-Powered Visual Intelligence for the Factory Floor</h2>
              <p className={styles.visionParagraph}>
                Machine vision is not a camera above a conveyor. It is a sensory organ for manufacturing and quality
                control, feeding image data into ML and AI systems that turn what is seen into an automated decision.
              </p>
              <p className={styles.visionParagraph}>
                The value is in the transition from image to data — and from data to a decision the line can act on.
                Shifting the focus from buying a camera to architecting an ML/AI-driven process is what turns quality
                control from a cost centre into an advantage.
              </p>
              <div className={styles.capabilitiesHeader}>CAPABILITIES & OFFERINGS</div>
              <div className={styles.capabilitiesGrid}>
                {visionCapabilities.map((cap, idx) => (
                  <div key={idx} className={styles.capRow}>
                    <div className={styles.capItem}>• {cap.c1}</div>
                    <div className={styles.capItem}>• {cap.c2}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.visionVisualCol}>
              <div className={styles.visionGraphicCard}>
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                  alt="Vision AI Inspection Station"
                  className={styles.visionRealImgClean}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEEP TECH ACROSS INDUSTRIES (Page 3) */}
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

      {/* 8. MANUFACTURING ARCHITECTURE (Page 3 - Dark Stack) */}
      {/* <section className={styles.sectionArchitecture}>
        <div className={styles.containerNarrow}>
          <div className={styles.eyebrowGreen}>MANUFACTURING ARCHITECTURE</div>
          <h2 className={styles.h2DarkArch}>The plant, layer by layer</h2>
          <p className={styles.archDesc}>
            Machine and sensor signals travel up through gateways and edge compute, into vision and AI, then into
            manufacturing and enterprise applications. Automation commands travel back down the same path.
          </p>

          <div className={styles.archStack}>
            {mfgArchitectureLayers.map((layer) => (
              <div key={layer.level} className={styles.archLayerRow}>
                <div className={styles.archLevelCol}>{layer.level}</div>
                <div className={styles.archStackCol}>{layer.stack}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 9. SOLUTION CARDS (Page 3 & 4) */}
      <section className={styles.sectionSolutions}>
        <div className={styles.container}>
          <h2 className={styles.h2SolutionsTitle}>
            What If Your Factory Could See, Understand<br />and Act in Real Time?
          </h2>

          {/* UNIFORM 2 CARDS PER LINE GRID */}
          <div className={styles.solutionsTwoColGrid}>
            {featuredSolutions.map((sol) => (
              <Link key={sol.title} href={sol.href} className={styles.solutionCardFull}>
                <div className={styles.solutionBgVisual}>
                  <img src={sol.image} alt={sol.title} className={styles.solRealImg} loading="lazy" />
                  <div className={styles.solGlow} />
                </div>
                <div className={styles.solOverlayContent}>
                  <h3 className={styles.solTitleFull}>{sol.title}</h3>
                  <p className={styles.solDescFull}>{sol.desc}</p>
                  <div className={styles.knowMoreHoverBtn}>
                    Know More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* 11. ENGAGEMENT MODELS (Page 5) */}
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
                <div className={styles.roleItem}>• Software Engineers</div>
                <div className={styles.roleItem}>• Edge / IIoT Engineers</div>
                <div className={styles.roleItem}>• Computer Vision Engineers</div>
                <div className={styles.roleItem}>• Automation Engineers</div>
                <div className={styles.roleItem}>• Cloud Engineers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BUSINESS CTA (Page 5) */}
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

      {/* 13. YEARS OF EXPERIENCE / BUSINESS METRICS (Page 5) */}
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

      {/* 14. PARTNERSHIPS (Page 5) */}
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

      {/* 15. TESTIMONIALS (Page 6 - Dark Section) */}
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
