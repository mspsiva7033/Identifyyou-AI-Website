import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import globalStyles from '../success-stories/[slug]/page.module.css'
import customStyles from './page.module.css'

export const metadata: Metadata = {
  title: 'Automotive Thinking Factory Case Study',
  description:
    'How an automotive components plant transformed into an intelligent operating system connecting machines, materials, and enterprise systems.',
  alternates: {
    canonical: '/thinking-factory',
  },
}

export default function ThinkingFactoryCaseStudyPage() {
  return (
    <div className={globalStyles.page}>
      <Header />

      <div className={globalStyles.breadcrumb}>
        <Link href="/" className={globalStyles.breadcrumbLink}>Home</Link>
        {' / '}
        Thinking Factory
      </div>

      <section className={globalStyles.content}>
        <div className={globalStyles.tagBadge}>SMART FACTORY · INDUSTRY AUTOMATION</div>
        <h1 className={globalStyles.title}>Turning Automotive Plants into Thinking Factories</h1>

        <div className={globalStyles.heroImgWrapper}>
          <img
            src="/images/industry_automation_hero.png"
            alt="Intelligent Manufacturing and Thinking Factory"
            width="1200"
            height="600"
            className={globalStyles.heroIllustration}
          />
        </div>

        <div className={globalStyles.metaBlockGrid}>
          <div className={globalStyles.metaBlockItem}>
            <span className={globalStyles.metaBlockLabel}>Category: </span>
            <span className={globalStyles.metaBlockValue}>Smart Factory · Operations</span>
          </div>
          <div className={globalStyles.metaBlockItem}>
            <span className={globalStyles.metaBlockLabel}>Domain: </span>
            <span className={globalStyles.metaBlockValue}>Automotive Components</span>
          </div>
          <div className={globalStyles.metaBlockItem}>
            <span className={globalStyles.metaBlockLabel}>Type: </span>
            <span className={globalStyles.metaBlockValue}>Transformation Success Story</span>
          </div>
          <div className={globalStyles.metaBlockItem}>
            <span className={globalStyles.metaBlockLabel}>Scope: </span>
            <span className={globalStyles.metaBlockValue}>Intelligent Operating System</span>
          </div>
        </div>

        <div className={globalStyles.docItemsBlock}>
          
          <p className={globalStyles.overview}>
            A Tier 2 automotive components group transformed its existing manufacturing environment into an intelligent operating system — connecting machines, materials, processes and enterprise systems <strong>without replacing the factory already in place.</strong>
          </p>

          <h2 className={globalStyles.h2}>The Challenge</h2>
          <h3 className={globalStyles.h3}>The plant was productive, but its intelligence was fragmented.</h3>
          
          <p className={globalStyles.secPara}>
            A mix of legacy and modern machines operated across machining, forging, heat treatment and warehousing. Machine data remained within individual equipment. Material movements depended heavily on operators, manual records and disconnected identification systems. Production, quality, warehouse and ERP information existed in separate systems, making it difficult to establish a single, real-time view of what was actually happening on the shop floor.
          </p>
          <p className={globalStyles.secPara}>
            The plant could produce — but it could not continuously sense, understand and respond to its own operational reality.
          </p>
          <p className={globalStyles.secPara}>
            Leadership could see what had already happened. What was missing was the ability to understand what was happening now, why it was happening, and what should happen next.
          </p>
          <p className={globalStyles.secPara}>
            <strong>The challenge was therefore not simply to digitize the factory. It was to create an intelligence layer capable of connecting physical operations with business decisions.</strong>
          </p>

          <h2 className={globalStyles.h2}>The Approach</h2>
          
          <p className={globalStyles.secPara}>
            IdentifYou did not replace the factory. It built intelligence around the assets, processes and systems already in place.
          </p>
          <p className={globalStyles.secPara}>
            The transformation started at the physical layer, with intelligent edge devices connecting legacy and modern machines, capturing machine and process signals, and translating heterogeneous industrial protocols into meaningful operational events.
          </p>
          <p className={globalStyles.secPara}>
            From there, machines, materials, movements, production processes, quality events and enterprise transactions were brought into a connected operating layer — creating the digital context required for AI-driven visibility, prediction and decision-making.
          </p>

          {/* Cards Section */}
          <div className={customStyles.cardsGrid}>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Machine</h3>
              <p className={customStyles.cardText}>
                An intelligent edge device connected every machine — modern and legacy — capturing machine, PLC, CNC and sensor data across OPC UA, MQTT and other industrial protocols. The machines became connected intelligence nodes rather than isolated production assets.
              </p>
            </div>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Material &amp; Movement</h3>
              <p className={customStyles.cardText}>
                Materials, pallets, bins and WIP received digital identities and became traceable across the plant. RFID, QR and location technologies connected physical movement with material, production order, quantity, process and location.
              </p>
            </div>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Process</h3>
              <p className={customStyles.cardText}>
                Work orders moved from ERP into the factory, while actual production events moved back into the digital environment. Planned production could now be continuously compared with what was physically happening on the floor.
              </p>
            </div>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Product</h3>
              <p className={customStyles.cardText}>
                Each component could be associated with its material, lot or heat, production order, machine, process, inspection and dispatch history — establishing a digital genealogy across the manufacturing lifecycle.
              </p>
            </div>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Inspection</h3>
              <p className={customStyles.cardText}>
                Vision inspection and process data were brought together with material and production context, enabling quality intelligence to move beyond defect detection toward identifying process drift and emerging quality risks.
              </p>
            </div>
            <div className={customStyles.card}>
              <h3 className={customStyles.cardTitle}>Every Asset &amp; System</h3>
              <p className={customStyles.cardText}>
                Machine behaviour was continuously observed through the intelligent edge for predictive maintenance. SAP, MES, WMS, QMS, and analytics were connected through a common architecture, creating bi-directional flow between enterprise intent and physical execution.
              </p>
            </div>
          </div>

          <h2 className={globalStyles.h2}>From Connected Data to Operational Intelligence</h2>
          <p className={globalStyles.secPara}>
            With the factory connected, IdentifYou introduced an intelligence layer that could bring together signals that previously existed in isolation. A machine event could now be understood in the context of the production order, material, WIP, routing, quality status, machine capacity and delivery requirement.
          </p>
          <p className={globalStyles.secPara}>
            This changed the role of data. It was no longer simply information to be viewed. <strong>It became information that could be understood, predicted and acted upon.</strong>
          </p>

          {/* Visual Flow Component */}
          <div className={customStyles.flowContainer}>
            <div className={customStyles.flowStep}>
              <div className={customStyles.flowStepBox}>Sense</div>
            </div>
            <div className={customStyles.flowArrow}>→</div>
            <div className={customStyles.flowStep}>
              <div className={customStyles.flowStepBox}>Connect</div>
            </div>
            <div className={customStyles.flowArrow}>→</div>
            <div className={customStyles.flowStep}>
              <div className={customStyles.flowStepBox}>Understand</div>
            </div>
            <div className={customStyles.flowArrow}>→</div>
            <div className={customStyles.flowStep}>
              <div className={customStyles.flowStepBox}>Decide</div>
            </div>
            <div className={customStyles.flowArrow}>→</div>
            <div className={customStyles.flowStep}>
              <div className={customStyles.flowStepBox}>Act</div>
            </div>
          </div>

          <p className={globalStyles.secPara}>
            The factory evolved from reporting what happened to understanding what was happening — and increasingly determining what should happen next.
          </p>

          <h2 className={globalStyles.h2}>When a Machine Stops, the Factory Responds</h2>
          <p className={globalStyles.secPara}>
            Consider a critical production machine stopping unexpectedly.
          </p>

          {/* Comparative Workflow */}
          <div className={customStyles.scenarioContainer}>
            <div className={`${customStyles.scenarioBox} ${customStyles.scenarioBoxConventional}`}>
              <div className={customStyles.scenarioTitle}>Conventional Environment</div>
              <p className={customStyles.scenarioText}>
                The event may trigger phone calls, manual investigation and delayed replanning. The breakdown is treated simply as a maintenance event.
              </p>
            </div>
            <div className={`${customStyles.scenarioBox} ${customStyles.scenarioBoxIntelligent}`}>
              <div className={customStyles.scenarioTitle}>Intelligent Factory</div>
              <p className={customStyles.scenarioText}>
                The machine&apos;s edge device immediately captures the event. The Smart Factory already knows which order was running, how much quantity remains, where the material is located, what operations are pending, and which alternative machines are available.
              </p>
              <br />
              <p className={customStyles.scenarioText}>
                AI evaluates the operational context and recommends the best response — from rerouting production to another machine, to moving material, adjusting the schedule or notifying the appropriate teams.
              </p>
            </div>
          </div>

          <p className={globalStyles.secPara}>
            The machine breakdown is no longer simply a maintenance event. <strong>It becomes an intelligent operational event.</strong> The factory can understand the impact and respond accordingly.
          </p>

          <h2 className={globalStyles.h2}>The Transformation</h2>

          <table className={customStyles.comparisonTable}>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={customStyles.tdFrom}>Disconnected machines</td>
                <td className={customStyles.tdTo}>Connected intelligent machines</td>
              </tr>
              <tr>
                <td className={customStyles.tdFrom}>Manual material visibility</td>
                <td className={customStyles.tdTo}>Real-time material and WIP visibility</td>
              </tr>
              <tr>
                <td className={customStyles.tdFrom}>Fragmented production information</td>
                <td className={customStyles.tdTo}>Digitally executed production</td>
              </tr>
              <tr>
                <td className={customStyles.tdFrom}>Reactive quality inspection</td>
                <td className={customStyles.tdTo}>Context-aware AI quality</td>
              </tr>
              <tr>
                <td className={customStyles.tdFrom}>Reactive machine maintenance</td>
                <td className={customStyles.tdTo}>Predictive asset intelligence</td>
              </tr>
              <tr>
                <td className={customStyles.tdFrom}>Delayed operational decisions</td>
                <td className={customStyles.tdTo}>Real-time decision support</td>
              </tr>
            </tbody>
          </table>

          <h2 className={globalStyles.h2}>The Business Outcome</h2>
          <p className={globalStyles.secPara}>
            The transformation created a connected operational foundation in which the physical factory and enterprise systems could continuously exchange information.
          </p>
          <ul className={globalStyles.secBullets}>
            <li>Leadership gained greater visibility into the real state of production.</li>
            <li>Operations gained contextual information instead of isolated machine or ERP data.</li>
            <li>Material movements became traceable, and product history became available across the manufacturing lifecycle.</li>
            <li>Quality intelligence could be connected to process conditions.</li>
            <li>Machine events could be evaluated in their production context rather than treated as isolated incidents.</li>
          </ul>
          <p className={globalStyles.secPara}>
            Most importantly, the factory moved from data collection to operational intelligence. It became capable of sensing its environment, understanding operational context, recommending decisions and initiating action.
          </p>

          <h2 className={globalStyles.h2}>The IdentifYou Difference</h2>
          
          <p className={globalStyles.secPara}>
            IdentifYou approaches Smart Factory transformation from the factory outward — not from technology inward. Existing machines, legacy equipment, material handling systems, operators and enterprise applications remain part of the transformation.
          </p>
          <p className={globalStyles.secPara}>
            The difference is the intelligent architecture that connects them.
          </p>
          <ul className={globalStyles.secBullets}>
            <li>Every machine becomes intelligent.</li>
            <li>Every material becomes identifiable.</li>
            <li>Every movement becomes visible.</li>
            <li>Every process becomes executable.</li>
            <li>Every product becomes traceable.</li>
            <li>Every inspection becomes intelligent.</li>
            <li>Every asset becomes predictive.</li>
            <li>Every system becomes connected.</li>
          </ul>

          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <h3 className={globalStyles.h3} style={{ color: '#0f172a' }}>
              The result is not simply a connected factory. <br />
              It is a factory that can increasingly understand what is happening and determine what should happen next.
            </h3>
            
            <div style={{ display: 'inline-block', margin: '40px auto 0', padding: '32px 48px', background: '#0f172a', borderRadius: '12px' }}>
              <p style={{ color: '#94C640', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
                FROM AN EXISTING FACTORY
              </p>
              <div style={{ color: '#ffffff', fontSize: '28px', fontWeight: 'bold', margin: '0 0 24px 0' }}>
                TO AN INTELLIGENT THINKING FACTORY
              </div>
              <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
                IdentifYou<br />
                Intelligent Manufacturing. Connected Operations. Smarter Decisions.
              </p>
            </div>
            
            <div style={{ marginTop: '40px' }}>
              <p style={{ color: '#0f172a', fontSize: '20px', fontWeight: '600' }}>
                We don&apos;t replace the factory.<br />
                We connect it, understand it and make it intelligent.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
