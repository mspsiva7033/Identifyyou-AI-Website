import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { FlowChain } from '@/components/ui/FlowChain'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'IdentifYou Technologies — Deep Tech. Built Around Business.',
  description:
    'AI-powered solutions for intelligent manufacturing, connected industries and smarter businesses. Vision AI, Industry Automation, AI-Powered No-Code, Data Engineering and Digital Engineering.',
}

// Static data — migrated from original HTML
const featuredPillars = [
  { n: '01', title: 'Vision AI', tagline: 'See. Inspect. Measure. Decide.', href: '/deep-tech/vision-ai' },
  { n: '02', title: 'AI & Intelligent Business', tagline: 'Turn Business Decisions Into Intelligent Decisions.', href: '/deep-tech/ai-intelligent-business' },
]

const supportingPillars = [
  { n: '03', title: 'AI-Powered No-Code Platform', tagline: 'Build Intelligent Business Applications Without Traditional Development.', href: '/deep-tech/ai-no-code' },
  { n: '04', title: 'Industry Automation', tagline: 'Connect. Automate. Optimize.', href: '/deep-tech/industry-automation' },
  { n: '05', title: 'Data Engineering', tagline: 'Turn Data Into a Trusted Business Asset.', href: '/deep-tech/data-engineering' },
  { n: '06', title: 'Digital Engineering', tagline: 'Engineer Digital Products That Solve Real Business Problems.', href: '/deep-tech/digital-engineering' },
]

const aiSeesThinkActs = [
  { eyebrow: 'AI That Sees', title: 'Vision AI', flow: 'Camera → Image → Computer Vision → AI → Measurement → Decision' },
  { eyebrow: 'AI That Thinks', title: 'AI & Intelligent Business', flow: 'Business Data → AI → Prediction → Recommendation → Decision' },
  { eyebrow: 'AI That Acts', title: 'AI-Powered No-Code + Automation', flow: 'AI Decision → Workflow → Automation → Action' },
]

const businessFirstSteps = [
  { n: '01', title: 'Understand', sub: 'Business objective' },
  { n: '02', title: 'Discover', sub: 'Process & operational challenges' },
  { n: '03', title: 'Engineer', sub: 'Right technology architecture' },
  { n: '04', title: 'Integrate', sub: 'Enterprise + operational ecosystem' },
  { n: '05', title: 'Measure', sub: 'Business outcomes' },
]

const ecosystemFlow = ['Supplier', 'Procurement', 'Raw Material', 'Warehouse', 'Production', 'Quality', 'WIP', 'Inventory', 'Finished Goods', 'Logistics', 'Customer']
const ecosystemOverlay = ['AI', 'Vision AI', 'IIoT', 'Edge', 'Robotics', 'RFID', 'MES', 'SAP', 'Data', 'Analytics']

const seeActCards = [
  { label: 'SEE', title: 'Vision AI', desc: 'Automatically inspect components and measure dimensions.', tech: 'Basler Camera + Computer Vision + CNN + AI' },
  { label: 'CONNECT', title: 'IIoT & Edge', desc: 'Connect machines and capture real-time operational data.', tech: 'IIoT + OPC-UA + MQTT + Edge Computing' },
  { label: 'UNDERSTAND', title: 'AI & Analytics', desc: 'Convert operational data into intelligent insights.', tech: 'AI + PySpark + Snowflake Cortex AI + Power BI' },
  { label: 'ACT', title: 'Automation & Robotics', desc: 'Automate decisions and physical processes.', tech: 'Edge + Robotics + Industrial Automation' },
  { label: 'INTEGRATE', title: 'SAP + MES + Data', desc: 'Connect shop floor with enterprise systems.', tech: 'SAP + MES + APIs + Data Engineering' },
  { label: 'TRACE', title: 'RFID & Digital Traceability', desc: 'Track material, WIP, pallets and finished goods.', tech: 'RFID + Edge + Digital Engineering' },
]

const featuredSolutions = [
  { title: 'Smart Factory', tagline: 'MES, production monitoring and digital shop-floor workflows.', href: '/case-studies' },
  { title: 'Manufacturing Data Platform', tagline: 'Enterprise manufacturing data, analytics and AI.', href: '/case-studies' },
]

const supportingSolutions = [
  { title: 'AI-Powered Procurement', tagline: 'Supplier recommendation, price intelligence and forecasting.', href: '/case-studies' },
  { title: 'Inventory Intelligence', tagline: 'Inventory variance, WIP visibility and stock optimization.', href: '/case-studies/revolutionizing-inventory-optimization' },
  { title: 'Vision Inspection', tagline: 'Visual inspection, dimensional measurement and defect detection.', href: '/case-studies' },
  { title: 'Connected Factory', tagline: 'IIoT, edge computing and machine connectivity.', href: '/case-studies' },
  { title: 'Material Traceability', tagline: 'RFID, QR, lot tracking and pallet tracking.', href: '/case-studies' },
  { title: 'Production Intelligence', tagline: 'Production monitoring, scheduling and analytics.', href: '/case-studies' },
]

const statBanner = [
  { stat: '6+ Years', label: 'In Business' },
  { stat: '150+', label: 'Customers' },
  { stat: '20+', label: 'Integrations Built' },
  { stat: '1M+', label: 'Customer Requests Processed' },
]

const visionUseCases = ['Visual defect detection', 'Dimensional measurement', 'Surface inspection', 'Component verification', 'Assembly inspection', 'OCR / OCV', 'Presence / absence', 'Quality classification']
const visionArch = ['Basler Camera', 'Image Acquisition', 'Image Processing', 'Computer Vision / CNN', 'AI Model', 'Dimensional Measurement', 'Quality Decision', 'MES / Quality System']

const aiBusinessCards = [
  { title: 'Intelligent Procurement', q: 'Which supplier should I buy from?', desc: 'AI weighs price, quality, delivery, historical performance, risk and plant requirements to recommend the best supplier.' },
  { title: 'Intelligent Sales', q: 'Which customer should I focus on?', desc: 'AI surfaces sales opportunities, customer behavior, cross-sell potential, churn risk and forecasted demand.' },
  { title: 'Intelligent Supply Chain', q: 'What should we purchase, produce and move next?', desc: 'AI forecasts and optimizes purchasing, production and movement decisions across the supply chain.' },
  { title: 'Intelligent Manufacturing', q: 'What should the plant do next?', desc: 'AI turns live machine data into predictive guidance for shop-floor decisions.' },
  { title: 'Intelligent Inventory', q: 'Where is inventory risk building up?', desc: 'AI flags emerging inventory risk before it becomes a stock-out or overstock problem.' },
]

const automationFlow = ['Machine', 'PLC / Sensors', 'OPC-UA / MQTT', 'Edge Computing', 'AI / Data', 'MES / ERP', 'Business Intelligence']
const automationCaps = ['IIoT', 'Edge Computing', 'Machine Connectivity', 'Industrial Gateways', 'OPC-UA', 'MQTT', 'Robotics', 'Pick & Place', 'Industrial Automation', 'Real-Time Monitoring']

const supplyChainFlow = ['Supplier', 'Procurement', 'Material', 'Warehouse', 'Manufacturing', 'Quality', 'Inventory', 'Logistics', 'Customer']
const supplyChainOverlay = ['AI', 'RFID', 'IIoT', 'MES', 'SAP', 'Data Engineering', 'Analytics']
const supplyChainCaps = ['Procurement Intelligence', 'Demand Forecasting', 'Supply Planning', 'Inventory Optimization', 'Material Traceability', 'Production Intelligence', 'Warehouse Intelligence', 'Logistics Visibility', 'Supply Chain Analytics']

const testimonials = [
  { quote: 'We recently had the pleasure of working with IdentifYou on an integration project, and the team met all our expectations — from initial consultation to final delivery, with a high level of expertise and dedication.', company: 'BW Group' },
  { quote: 'Great job done. I was impressed by the way your team got the entire portal done. Sure, will reach out to you in the near future.', company: 'Disprz' },
  { quote: "Thank you, IdentifYou team for being pro-active in solving the client's asks. Glad to have worked with you.", company: 'Freshworks' },
  { quote: "The app is working as expected. Appreciate you and your team's support on this.", company: 'BATA' },
]

const partners = ['Microsoft', 'monday.com', 'Zendesk', 'Snowflake']

const differentiators = [
  { title: 'Business First', desc: 'We understand the business before designing technology.' },
  { title: 'Deep Tech', desc: 'We engineer solutions using AI, Vision AI, IIoT, Edge and Automation.' },
  { title: 'Manufacturing Expertise', desc: 'We understand real-world factory operations, not just IT systems.' },
  { title: 'Integrated Supply Chain', desc: 'We connect procurement, inventory, manufacturing, logistics and enterprise systems.' },
  { title: 'End-to-End Engineering', desc: 'From machine and edge to cloud, data, AI and enterprise applications.' },
  { title: 'Outcome Driven', desc: 'We measure success through business impact.' },
]

const insightCategories = [
  { title: 'AI', tags: ['AI Procurement', 'AI Sales', 'GenAI', 'Predictive Analytics'] },
  { title: 'Manufacturing', tags: ['Smart Factory', 'MES', 'Industry 4.0', 'Vision AI', 'Digital Manufacturing'] },
  { title: 'Supply Chain', tags: ['Procurement', 'Inventory', 'Logistics', 'Supply Chain AI'] },
  { title: 'Deep Tech', tags: ['Vision AI', 'Edge Computing', 'IIoT', 'Robotics', 'AI'] },
  { title: 'Data Engineering – Snowflake', tags: ['Snowflake', 'Data Engineering', 'Data Architecture', 'Manufacturing Data Platforms'] },
  { title: 'Digital Engineering', tags: ['SaaS Engineering', 'Enterprise Applications', 'Cloud Engineering', 'Application Modernization'] },
]

const leadCTAs = [
  { tag: 'Manufacturing', title: "Assess Your Factory's Digital Maturity" },
  { tag: 'Supply Chain', title: 'Discover Your Supply Chain AI Opportunities' },
  { tag: 'AI', title: 'Identify Your Highest-Value AI Use Cases' },
  { tag: 'Vision AI', title: 'Explore Automated Inspection' },
  { tag: 'No-Code', title: 'Build Your First Intelligent Business Application' },
]

const finCategories = ['AI / Intelligent Financial Operations', 'Data Engineering & Analytics', 'Digital Engineering / Workflow Automation', 'FinTech Customer / CRM Transformation']
const healthCategories = ['Healthcare Data & Analytics', 'AI-Enabled Healthcare Operations', 'Digital Healthcare Applications', 'Healthcare Workflow Automation']

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Header />

      {/* HERO */}
      <HeroSection />

      {/* INTRO STATEMENT */}
      <section className={styles.intro}>
        <p className={styles.introText}>
          We don&apos;t start with technology. We start with the business problem, operational challenge or growth
          opportunity — with deep expertise in Manufacturing and Integrated Supply Chain, and extensive experience
          across Financial Services, Investment, FinTech and Healthcare — and engineer the right AI-powered solution
          around it.
        </p>
      </section>

      {/* DEEP TECH PILLARS */}
      <section className={styles.sectionPillars}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2}>Deep Tech That Solves Real Business Problems</h2>
            <p className={styles.sectionSub}>
              We don&apos;t start with technology. We start with the business problem, operational challenge or growth
              opportunity—and engineer the right technology solution around it.
            </p>
          </div>
          <div className={styles.featuredPillars}>
            {featuredPillars.map((p) => (
              <Link key={p.title} href={p.href} className={styles.pillarCard}>
                <div className={styles.pillarCardImg}>
                  <div className={styles.imgPlaceholder} />
                </div>
                <div className={styles.pillarCardBody}>
                  <div className={styles.pillarMeta}>
                    <span className={styles.pillarN}>{p.n}</span>
                    <h3 className={styles.pillarTitle}>{p.title}</h3>
                  </div>
                  <p className={styles.pillarTagline}>{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.supportingPillars}>
            {supportingPillars.map((p) => (
              <Link key={p.title} href={p.href} className={styles.supportCard}>
                <div className={styles.supportCardImg}>
                  <div className={styles.imgPlaceholder} />
                </div>
                <div className={styles.supportCardBody}>
                  <div className={styles.pillarMeta}>
                    <span className={styles.pillarNSm}>{p.n}</span>
                    <h3 className={styles.pillarTitleSm}>{p.title}</h3>
                  </div>
                  <p className={styles.pillarTaglineSm}>{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI SEES THINKS ACTS */}
      <section className={styles.sectionDark}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2Dark}>AI That Sees. AI That Thinks. AI That Acts.</h2>
          <div className={styles.aiCardsGrid}>
            {aiSeesThinkActs.map((a) => (
              <div key={a.title} className={styles.aiCard}>
                <div className={styles.aiCardImg}>
                  <div className={styles.imgPlaceholderDark} />
                </div>
                <div className={styles.aiCardBody}>
                  <div className={styles.eyebrow}>{a.eyebrow}</div>
                  <div className={styles.aiCardTitle}>{a.title}</div>
                  <div className={styles.aiCardFlow}>{a.flow}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BANNER: NO-CODE PLATFORM */}
      <section className={styles.featureBanner}>
        <div className={styles.featureBannerInner}>
          <div className={styles.featureBannerImg}>
            <div className={styles.imgPlaceholder} style={{ aspectRatio: '5/4' }} />
          </div>
          <div className={styles.featureBannerContent}>
            <div className={styles.eyebrowGreen}>Deep Tech — AI That Acts</div>
            <h2 className={styles.featureBannerTitle}>Describe It. Build It. Run It.</h2>
            <p className={styles.featureBannerSub}>The AI-Powered No-Code Platform</p>
            <p className={styles.featureBannerDesc}>
              Describe what your business needs in business language — AI generates the application, no-code
              configuration makes it yours.
            </p>
            <div className={styles.checkList}>
              <div className={styles.checkItem}>✓ Business-language-driven application creation</div>
              <div className={styles.checkItem}>✓ No-code workflows and role-based applications</div>
              <div className={styles.checkItem}>✓ Reduced dependency on traditional development</div>
            </div>
            <Link href="/deep-tech/ai-no-code" className={styles.btnGreen}>
              Explore the Platform →
            </Link>
          </div>
        </div>
      </section>

      {/* BUSINESS FIRST APPROACH */}
      <section className={styles.sectionDark}>
        <div className={styles.containerText}>
          <h2 className={styles.h2Dark}>We Start With the Business. Not the Technology.</h2>
          <div className={styles.stepsChain}>
            {businessFirstSteps.map((s, i) => (
              <div key={s.n} className={styles.stepItem}>
                {i > 0 && <span className={styles.stepArrow}>↓</span>}
                <div className={styles.stepContent}>
                  <div className={styles.stepN}>{s.n}</div>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <div className={styles.stepSub}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.businessFirstBottom}>Technology is the enabler. Business value is the destination.</div>
        </div>
      </section>

      {/* MANUFACTURING */}
      <section id="manufacturing" className={styles.sectionManufacturing}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2} style={{ fontSize: 'clamp(30px, 3.8vw, 44px)' }}>Engineering the Intelligent Factory</h2>
            <p className={styles.sectionSub}>
              From raw material to finished product, we connect machines, materials, people, processes and enterprise
              systems to create intelligent, connected manufacturing operations.
            </p>
          </div>

          <div className={styles.factoryImg}>
            <div className={styles.imgPlaceholderRounded} style={{ aspectRatio: '16/6' }}>
              <div className={styles.factoryOverlay}>
                <div className={styles.factoryOverlayTitle}>AI-Powered Production Intelligence</div>
                <div className={styles.factoryOverlaySub}>Connecting machines, materials and enterprise systems in real time.</div>
              </div>
            </div>
          </div>

          <div className={styles.ecosystemBox}>
            <FlowChain nodes={ecosystemFlow} />
            <div className={styles.ecosystemTags}>
              {ecosystemOverlay.map((t) => (
                <span key={t} className={styles.ecosystemTag}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.seeActHeader}>
            <h3 className={styles.h3}>What If Your Factory Could See, Understand and Act in Real Time?</h3>
          </div>
          <div className={styles.seeActGrid}>
            {seeActCards.map((c) => (
              <div key={c.title} className={styles.seeActCard}>
                <div className={styles.seeActLabel}>{c.label}</div>
                <div className={styles.seeActTitle}>{c.title}</div>
                <p className={styles.seeActDesc}>{c.desc}</p>
                <div className={styles.seeActTech}>{c.tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING SOLUTIONS */}
      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <h2 className={styles.h2} style={{ textAlign: 'center', marginBottom: '40px' }}>Manufacturing Solutions</h2>
          <div className={styles.featuredSolutions}>
            {featuredSolutions.map((m) => (
              <div key={m.title} className={styles.featuredSolCard}>
                <div className={styles.featuredSolImg}>
                  <div className={styles.imgPlaceholder} style={{ aspectRatio: '16/10' }} />
                </div>
                <div className={styles.solCardOverlay}>
                  <div className={styles.solCardTitle}>{m.title}</div>
                  <p className={styles.solCardTagline}>{m.tagline}</p>
                  <Link href={m.href} className={styles.solKnowMore}>Know More →</Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.supportingSolutions}>
            {supportingSolutions.map((m) => (
              <div key={m.title} className={styles.supportSolCard}>
                <div className={styles.imgPlaceholder} style={{ aspectRatio: '4/3' }} />
                <div className={styles.solCardOverlay}>
                  <div className={styles.solCardTitleSm}>{m.title}</div>
                  <p className={styles.solCardTaglineSm}>{m.tagline}</p>
                  <Link href={m.href} className={styles.solKnowMoreSm}>Know More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className={styles.statsBanner}>
        <div className={styles.statsGrid}>
          {statBanner.map((s) => (
            <div key={s.stat} className={styles.statItem}>
              <div className={styles.statNum}>{s.stat}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED: DIGITAL ENGINEERING */}
      <section className={styles.featureBannerWhite}>
        <div className={styles.featureBannerInnerReverse}>
          <div className={styles.featureBannerContent}>
            <div className={styles.eyebrowGreen}>Deep Tech — Digital Engineering</div>
            <h2 className={styles.featureBannerTitle}>Engineer Digital Products That Solve Real Business Problems.</h2>
            <p className={styles.featureBannerDesc}>
              Web, mobile, enterprise and SaaS applications engineered with modern cloud-native tooling — built around
              the workflow, not the other way around.
            </p>
            <div className={styles.checkList}>
              <div className={styles.checkItem}>✓ Enterprise applications and SaaS platforms</div>
              <div className={styles.checkItem}>✓ Workflow automation and API integration</div>
              <div className={styles.checkItem}>✓ Cloud engineering on Azure and AWS</div>
            </div>
            <Link href="/deep-tech/digital-engineering" className={styles.btnGreen}>
              Explore Digital Engineering →
            </Link>
          </div>
          <div className={styles.featureBannerImg}>
            <div className={styles.imgPlaceholder} style={{ aspectRatio: '5/4' }} />
          </div>
        </div>
      </section>

      {/* VISION AI */}
      <section className={styles.sectionDark}>
        <div className={styles.visionGrid}>
          <div>
            <h2 className={styles.h2Dark}>See More. Measure Precisely. Decide Faster.</h2>
            <p className={styles.visionSub}>AI-Powered Visual & Dimensional Inspection</p>
            <p className={styles.visionDesc}>
              IdentifYou combines industrial cameras, computer vision, image processing and AI to automatically inspect
              and measure manufactured components.
            </p>
            <div className={styles.tagGrid}>
              {visionUseCases.map((u) => (
                <span key={u} className={styles.tagDark}>{u}</span>
              ))}
            </div>
            <div className={styles.visionArchWrap}>
              <FlowChain nodes={visionArch} variant="dark" />
            </div>
            <Link href="/deep-tech/vision-ai" className={styles.btnGreenSolid}>Explore Vision AI</Link>
          </div>
          <div className={styles.visionImgWrap}>
            <div className={styles.imgPlaceholderRounded} style={{ aspectRatio: '1/1' }} />
          </div>
        </div>
      </section>

      {/* AI FOR BUSINESS */}
      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.h2}>Turn Business Decisions Into Intelligent Decisions</h2>
            <p className={styles.sectionSub}>AI should not simply generate information. It should help your business decide what to do next.</p>
          </div>
          <div className={styles.aiBusinessGrid}>
            {aiBusinessCards.map((c) => (
              <div key={c.title} className={styles.aiBusinessCard}>
                <div className={styles.imgPlaceholder} style={{ aspectRatio: '16/10' }} />
                <div className={styles.aiBusinessBody}>
                  <div className={styles.aiBusinessTitle}>{c.title}</div>
                  <p className={styles.aiBusinessQ}>{c.q}</p>
                  <p className={styles.aiBusinessDesc}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/deep-tech/ai-intelligent-business" className={styles.btnGreen}>
              Explore AI-Powered Business Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRY AUTOMATION */}
      <section className={styles.sectionLight}>
        <div className={styles.containerText}>
          <div className={styles.eyebrowGreen} style={{ textAlign: 'center', marginBottom: '12px' }}>Industry Automation</div>
          <h2 className={styles.h2} style={{ textAlign: 'center', marginBottom: '14px' }}>Connect the Physical World to the Digital World.</h2>
          <p className={styles.sectionSub} style={{ textAlign: 'center', marginBottom: '36px' }}>
            Bring machines, sensors, robots and enterprise systems together to create intelligent industrial operations.
          </p>
          <div style={{ marginBottom: '32px' }}>
            <FlowChain nodes={automationFlow} variant="white" />
          </div>
          <div className={styles.tagGridCenter}>
            {automationCaps.map((a) => (
              <span key={a} className={styles.tagLight}>{a}</span>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href="/deep-tech/industry-automation" className={styles.btnGreen}>Explore Industry Automation</Link>
          </div>
        </div>
      </section>

      {/* INTEGRATED SUPPLY CHAIN */}
      <section className={styles.sectionDark}>
        <div className={styles.containerNarrow} style={{ textAlign: 'center' }}>
          <div className={styles.strongDiff}>STRONGEST DIFFERENTIATOR</div>
          <h2 className={styles.h2Dark}>Connect the Entire Supply Chain</h2>
          <p className={styles.visionDesc} style={{ marginBottom: '36px' }}>One connected view from supplier to customer.</p>
          <div style={{ marginBottom: '20px' }}>
            <FlowChain nodes={supplyChainFlow} variant="dark" />
          </div>
          <div className={styles.tagGridCenter} style={{ marginBottom: '20px' }}>
            {supplyChainOverlay.map((o) => (
              <span key={o} className={styles.accentTag}>{o}</span>
            ))}
          </div>
          <div className={styles.tagGridCenter}>
            {supplyChainCaps.map((c) => (
              <span key={c} className={styles.darkTag}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER INDUSTRIES */}
      <section className={styles.sectionWhite} style={{ padding: '72px 32px' }}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.h2} style={{ textAlign: 'center', marginBottom: '32px' }}>Deep Tech Across Industries</h2>
          <Link href="/manufacturing" className={styles.industryMfgCard}>
            <div className={styles.industryMfgImg}>
              <div className={styles.imgPlaceholder} style={{ minHeight: '220px' }} />
            </div>
            <div className={styles.industryMfgContent}>
              <div className={styles.eyebrowGreen} style={{ marginBottom: '8px' }}>Primary Industry</div>
              <div className={styles.industryMfgTitle}>Manufacturing</div>
              <p className={styles.industryMfgDesc}>Engineering the Intelligent Factory — deep expertise in Manufacturing and Integrated Supply Chain.</p>
            </div>
          </Link>
          <div className={styles.otherIndustries}>
            <div className={styles.industryCard}>
              <div className={styles.industryCardTitle}>Financial Services & FinTech</div>
              <p className={styles.industryCardDesc}>
                Our Deep Tech, AI, Data Engineering and Digital Engineering capabilities extend into financial
                institutions, investment organizations and FinTech businesses.
              </p>
              <div className={styles.tagGridWrap}>
                {finCategories.map((f) => <span key={f} className={styles.tagChip}>{f}</span>)}
              </div>
            </div>
            <div className={styles.industryCard}>
              <div className={styles.industryCardTitle}>Healthcare</div>
              <p className={styles.industryCardDesc}>
                We apply AI, Data Engineering and Digital Engineering to help healthcare organizations improve
                operational efficiency, data accessibility and intelligent decision-making.
              </p>
              <div className={styles.tagGridWrap}>
                {healthCategories.map((h) => <span key={h} className={styles.tagChip}>{h}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.sectionDark}>
        <div className={styles.containerNarrow}>
          <div className={styles.eyebrowAccent} style={{ textAlign: 'center', marginBottom: '16px' }}>Why People Work With Us</div>
          <h2 className={styles.h2Dark} style={{ textAlign: 'center', marginBottom: '44px' }}>Testimonials</h2>
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

      {/* PARTNERSHIPS */}
      <section className={styles.sectionWhite} style={{ padding: '56px 32px' }}>
        <div className={styles.containerText} style={{ textAlign: 'center' }}>
          <div className={styles.eyebrowMuted} style={{ marginBottom: '24px' }}>Technology & Platform Ecosystem</div>
          <div className={styles.partnersRow}>
            {partners.map((p) => (
              <span key={p} className={styles.partner}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IDENTIFYOU */}
      <section className={styles.sectionLight}>
        <div className={styles.container}>
          <h2 className={styles.h2} style={{ textAlign: 'center', marginBottom: '40px' }}>Why IdentifYou?</h2>
          <div className={styles.differGrid}>
            {differentiators.map((d) => (
              <div key={d.title} className={styles.differCard}>
                <div className={styles.differTitle}>{d.title}</div>
                <p className={styles.differDesc}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className={styles.sectionWhite}>
        <div className={styles.container}>
          <h2 className={styles.h2} style={{ textAlign: 'center', marginBottom: '40px' }}>Deep Tech & Industry Insights</h2>
          <div className={styles.insightGrid}>
            {insightCategories.map((ic) => (
              <div key={ic.title} className={styles.insightCard}>
                <div className={styles.insightTitle}>{ic.title}</div>
                <div className={styles.insightTags}>
                  {ic.tags.map((t) => (
                    <span key={t} className={styles.insightTag}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD GENERATION */}
      <section className={styles.sectionLight} style={{ padding: '72px 32px' }}>
        <div className={styles.container} style={{ marginBottom: '56px' }}>
          <div className={styles.leadCtaGrid}>
            {leadCTAs.map((c) => (
              <Link key={c.tag} href="/contact" className={styles.leadCtaCard}>
                <div className={styles.leadCtaTag}>{c.tag}</div>
                <div className={styles.leadCtaTitle}>{c.title}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.mainCtaBlock}>
          <h2 className={styles.mainCtaTitle}>Let&apos;s Solve a Business Problem</h2>
          <p className={styles.mainCtaDesc}>
            Tell us what you&apos;re trying to improve. We&apos;ll help identify where Deep Tech can create measurable business value.
          </p>
          <Link href="/contact" className={styles.mainCtaBtn}>Talk to a Deep Tech Expert</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
