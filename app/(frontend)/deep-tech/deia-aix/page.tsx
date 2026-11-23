import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'DEIA AIX: Data to Knowledge to Intelligence | IdentifYou',
  description:
    'DEIA AIX by IdentifYou: AI-native Command Centers and AIX Platforms for manufacturing.',
  alternates: {
    canonical: '/deep-tech/deia-aix',
  },
}

export default function DeepTechDEIAAIXPage() {
  return (
    <div className={styles.pageWrap}>
      <Header />

      {/* 1. TOP HERO BANNER (MATCHES ALL OTHER DEEP TECH HEROES: 450px) */}
      <section className={styles.sectionHeroBanner}>
        <div className={styles.heroContainer}>
          <div className={styles.heroCardDark}>
            <p className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/deep-tech">Deep Tech</Link> / DEIA AIX
            </p>
            <div className={styles.eyebrowGreen}>AI-NATIVE ENTERPRISE INTELLIGENCE · MANUFACTURING FIRST</div>
            <h1 className={styles.heroTitle}>
              DEIA AIX: Data to Knowledge to <span>Intelligence.</span>
            </h1>
            <p className={styles.heroDesc}>
              AI-native Command Centers and AIX Platforms, built by IdentifYou for manufacturing. DEIA AIX turns the data already in your ERP, MES and IIoT into knowledge every team shares, and that knowledge into intelligence that acts, with people in control.
            </p>
            <div className={styles.btnGroup}>
              <Link className={`${styles.btn} ${styles.btnLime}`} href="/contact">
                Request a Demo
              </Link>
              <a
                className={`${styles.btn} ${styles.btnGhost}`}
                href="https://deiaaix.ai/?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit deiaaix.ai ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. STATS BANNER */}
      <section className={styles.statsBanner}>
        <div className={styles.container}>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <b>6 products</b>
              <span>Live today for manufacturing</span>
            </div>
            <div className={styles.stat}>
              <b>5 steps</b>
              <span>Sense → Monitor, in every product</span>
            </div>
            <div className={styles.stat}>
              <b>Private AI</b>
              <span>Runs inside your environment</span>
            </div>
            <div className={styles.stat}>
              <b>No rip-and-replace</b>
              <span>Works on top of your ERP, MES and IIoT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why DEIA AIX */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Why DEIA AIX</p>
          <h2 className={styles.h2}>From early warning to a proven result.</h2>
          <p className={styles.intro}>
            Manufacturers have the data. The decisions still come too late, and nobody proves what worked. DEIA AIX closes that gap.
          </p>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <p className={styles.num}>01</p>
              <h3>Command Centers for every function</h3>
              <p>Production, Procurement and Service take each function from early warning to an approved action.</p>
            </div>
            <div className={styles.pillar}>
              <p className={styles.num}>02</p>
              <h3>AIX Platforms alongside your systems</h3>
              <p>Plant AIX runs the floor, Machine AIX predicts failures, Viz AIX gives one trusted picture.</p>
            </div>
            <div className={styles.pillar}>
              <p className={styles.num}>03</p>
              <h3>Private AI, people in control</h3>
              <p>Models run in your environment. People approve every action, and every decision is recorded.</p>
            </div>
            <div className={styles.pillar}>
              <p className={styles.num}>04</p>
              <h3>Start with one plant</h3>
              <p>Configurable KPIs on top of the systems you already run. Start small and grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="products">
        <div className={styles.container}>
          <p className={styles.eyebrow}>The DEIA AIX portfolio</p>
          <h2 className={styles.h2}>Products, live today for manufacturing.</h2>

          <div className={styles.groupTitle} id="command-centers">
            <h3>Command Centers</h3>
            <small>DECISION LAYER</small>
            <p>See what matters, act with control, prove what worked.</p>
          </div>
          <div className={styles.productsGrid}>
            <a
              className={styles.productCard}
              href="https://deiaaix.ai/production-command-center.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Production Command Center</h4>
              <p className={styles.productTagline}>See what matters. Act with control. Prove what worked.</p>
              <ul className={styles.productList}>
                <li>Early warning of risks to the plan</li>
                <li>AI recommendations, approved by people</li>
                <li>Every action measured against its baseline</li>
              </ul>
              <p className={styles.productFor}>For: Plant heads, COO</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>

            <a
              className={styles.productCard}
              href="https://deiaaix.ai/procurement-command-center.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Procurement Command Center</h4>
              <p className={styles.productTagline}>Predict supply risk. Act before it costs.</p>
              <ul className={styles.productList}>
                <li>Shortages flagged before they stop the line</li>
                <li>Supplier OTIF and delivery risk in one view</li>
                <li>Approved actions sent back to the ERP</li>
              </ul>
              <p className={styles.productFor}>For: CPO, procurement and supply chain heads</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>

            <a
              className={styles.productCard}
              href="https://deiaaix.ai/service-command-center.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.productTag}>EARLY ACCESS</span>
              <h4>Service Command Center</h4>
              <p className={styles.productTagline}>Keep customer assets running. Keep every service promise.</p>
              <ul className={styles.productList}>
                <li>Field issues seen before the customer calls</li>
                <li>The right engineer and part, first time</li>
                <li>Service-level outcomes proved</li>
              </ul>
              <p className={styles.productFor}>For: Service and after-sales heads</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>
          </div>

          <div className={styles.groupTitle} id="aix-platforms">
            <h3>AIX Platforms</h3>
            <small>INTELLIGENCE LAYER</small>
            <p>Platforms that run alongside your ERP, MES and IIoT.</p>
          </div>
          <div className={styles.productsGrid}>
            <a
              className={styles.productCard}
              href="https://deiaaix.ai/plant-aix.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Plant AIX</h4>
              <p className={styles.productTagline}>Run the plant floor in real time.</p>
              <ul className={styles.productList}>
                <li>Work orders, material flow and inventory, live</li>
                <li>Machine status, alerts and OEE</li>
                <li>Production orders kept in step with SAP</li>
              </ul>
              <p className={styles.productFor}>For: Plant and production managers</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>

            <a
              className={styles.productCard}
              href="https://deiaaix.ai/machine-aix.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Machine AIX</h4>
              <p className={styles.productTagline}>Turn machine data into predictive intelligence.</p>
              <ul className={styles.productList}>
                <li>Health and anomaly detection</li>
                <li>Predictive maintenance and AI root cause</li>
                <li>Works with any IIoT platform</li>
              </ul>
              <p className={styles.productFor}>For: Maintenance and reliability heads</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>

            <a
              className={styles.productCard}
              href="https://deiaaix.ai/viz-aix.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Viz AIX</h4>
              <p className={styles.productTagline}>The Enterprise AI Platform for Visualisation.</p>
              <ul className={styles.productList}>
                <li>Governed, trusted numbers from any data</li>
                <li>Configurable KPIs, such as OEE and First Pass Yield</li>
                <li>Manufacturing is the first domain</li>
              </ul>
              <p className={styles.productFor}>For: CXOs, analytics and IT leaders</p>
              <span className={styles.productMore}>Learn more ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Five Steps */}
      <section className={`${styles.section} ${styles.sectionLightBg}`}>
        <div className={`${styles.container} ${styles.center}`}>
          <p className={styles.eyebrow}>IdentifYou’s approach</p>
          <h2 className={styles.h2}>Sense → Predict → Recommend → Automate → Monitor</h2>
          <p className={styles.intro}>
            Business intelligence tells you what happened. DEIA AIX carries on to what to do about it, and proves that it worked.
          </p>
          <div className={styles.steps5}>
            <div className={styles.step5}>
              <span className={styles.step5Num}>1</span>
              <h4>AI Sense</h4>
              <p>Measure what is happening now, from every system, with one trusted number.</p>
            </div>
            <div className={styles.step5}>
              <span className={styles.step5Num}>2</span>
              <h4>AI Predict</h4>
              <p>Find risks, anomalies and opportunities before they show up in the results.</p>
            </div>
            <div className={styles.step5}>
              <span className={styles.step5Num}>3</span>
              <h4>AI Recommend</h4>
              <p>The right action, with the evidence behind it, for a person to approve.</p>
            </div>
            <div className={styles.step5}>
              <span className={styles.step5Num}>4</span>
              <h4>AI Automate</h4>
              <p>Approved actions flow back into the ERP, MES and teams that carry them out.</p>
            </div>
            <div className={styles.step5}>
              <span className={styles.step5Num}>5</span>
              <h4>AI Monitor</h4>
              <p>Measure every action against its baseline, so you know what worked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Challenges */}
      <section className={`${styles.section} ${styles.sectionBlack}`}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Challenges it addresses</p>
          <h2 className={styles.h2}>The KPIs DEIA AIX protects.</h2>
          <div className={styles.challenges}>
            <div className={styles.challenge}>
              <small>KPI AT RISK · OEE</small>
              <h4>Losses surface a day late</h4>
              <p>Problems show up in the next day’s report, after the shift that could have recovered them.</p>
              <p className={styles.challengeFix}>→ Production Command Center, Plant AIX</p>
            </div>
            <div className={styles.challenge}>
              <small>KPI AT RISK · MATERIAL AVAILABILITY</small>
              <h4>Shortages found when the line stops</h4>
              <p>Nobody sees a critical material running out until production is waiting.</p>
              <p className={styles.challengeFix}>→ Procurement Command Center</p>
            </div>
            <div className={styles.challenge}>
              <small>KPI AT RISK · UNPLANNED DOWNTIME</small>
              <h4>Machine warnings no one sees</h4>
              <p>The warning is in the machine data, lost among thousands of signals.</p>
              <p className={styles.challengeFix}>→ Machine AIX</p>
            </div>
            <div className={styles.challenge}>
              <small>KPI AT RISK · TRUST IN THE NUMBERS</small>
              <h4>Every plant has its own number</h4>
              <p>Meetings argue about the number instead of the action.</p>
              <p className={styles.challengeFix}>→ Viz AIX</p>
            </div>
            <div className={styles.challenge}>
              <small>KPI AT RISK · SLA COMPLIANCE</small>
              <h4>Service starts when the customer calls</h4>
              <p>Field teams hear about a failing asset from the customer, not its data.</p>
              <p className={styles.challengeFix}>→ Service Command Center</p>
            </div>
            <div className={styles.challenge}>
              <small>KPI AT RISK · RETURN ON ACTIONS</small>
              <h4>Nobody checks if it worked</h4>
              <p>No one measures whether the KPI recovered, so the same problems return.</p>
              <p className={styles.challengeFix}>→ Production &amp; Procurement Command Centers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Systems: No rip-and-replace */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={`${styles.container} ${styles.center}`}>
          <p className={styles.eyebrow}>No rip-and-replace</p>
          <h2 className={styles.h2}>Works on top of the systems you already run.</h2>
          <div className={styles.systems}>
            <span>SAP</span>
            <span>Microsoft Dynamics 365</span>
            <span>MES</span>
            <span>IIoT platforms</span>
            <span>Historians</span>
            <span>Spreadsheets &amp; files</span>
          </div>
        </div>
      </section>

      {/* 7. Videos */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>See it in action</p>
          <h2 className={styles.h2}>A minute each. Real outcomes.</h2>
          <p className={styles.intro}>
            Short videos on sample manufacturing data. The full series is on deiaaix.ai.
          </p>
          <div className={styles.videos}>
            <a
              className={styles.videoCard}
              href="https://deiaaix.ai/resources.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.videoThumb}>
                <span className={styles.videoPlay}>▶</span>
                <span className={styles.videoDur}>1:34</span>
              </div>
              <div className={styles.videoMeta}>
                <small>DEIA AIX · OVERVIEW</small>
                <b>Recover the order before it is late</b>
              </div>
            </a>

            <a
              className={styles.videoCard}
              href="https://deiaaix.ai/resources.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.videoThumb}>
                <span className={styles.videoPlay}>▶</span>
                <span className={styles.videoDur}>0:55</span>
              </div>
              <div className={styles.videoMeta}>
                <small>PROCUREMENT · PREDICT</small>
                <b>Shortages seen two weeks early</b>
              </div>
            </a>

            <a
              className={styles.videoCard}
              href="https://deiaaix.ai/resources.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.videoThumb}>
                <span className={styles.videoPlay}>▶</span>
                <span className={styles.videoDur}>1:01</span>
              </div>
              <div className={styles.videoMeta}>
                <small>MACHINE AIX · PREDICT</small>
                <b>Catch the failure before it stops the line</b>
              </div>
            </a>

            <a
              className={styles.videoCard}
              href="https://deiaaix.ai/resources.html?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.videoThumb}>
                <span className={styles.videoPlay}>▶</span>
                <span className={styles.videoDur}>1:07</span>
              </div>
              <div className={styles.videoMeta}>
                <small>VIZ AIX · MONITOR</small>
                <b>From a red number to its root cause</b>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className={styles.ctaBand}>
        <div className={`${styles.container} ${styles.ctaBandInner}`}>
          <div>
            <h2>See DEIA AIX on your own data.</h2>
            <p>Start with one plant. We’ll show where DEIA AIX can protect your KPIs first.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/contact">
              Request a Demo
            </Link>
            <a
              className={`${styles.btn} ${styles.btnOutlineDark}`}
              href="https://deiaaix.ai/?utm_source=identifyyou.ai&utm_medium=referral&utm_campaign=deia_aix_page_cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit deiaaix.ai ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
