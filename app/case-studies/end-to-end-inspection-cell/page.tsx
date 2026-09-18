import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from '../[slug]/page.module.css'

export const metadata: Metadata = {
  title: 'End-to-End Inspection Cell Engineering — From Part Feeding to Intelligent Production | IdentifYou',
  description:
    'IdentifYou engineers, builds, integrates, tests and deploys the complete production automation system around the inspection requirement — from part feeding to intelligent production.',
}

export default function EndToEndInspectionCellCaseStudyPage() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        {' / '}
        <Link href="/case-studies" className={styles.breadcrumbLink}>Case Studies</Link>
        {' / '}
        End-to-End Inspection Cell Engineering
      </div>

      <section className={styles.content}>
        <div className={styles.tagBadge}>VISION AI · PRODUCTION ENGINEERING</div>
        <h1 className={styles.title}>End-to-End Inspection Cell Engineering</h1>

        <div className={styles.heroImgWrapper}>
          <img
            src="/images/end_to_end_inspection_cell.png"
            alt="End-to-End Inspection Cell Engineering"
            className={styles.heroIllustration}
          />
        </div>

        <div className={styles.metaBlockGrid}>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Category: </span>
            <span className={styles.metaBlockValue}>Vision AI · Automation</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Domain: </span>
            <span className={styles.metaBlockValue}>Industrial Manufacturing</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Type: </span>
            <span className={styles.metaBlockValue}>Engineering Case Study</span>
          </div>
          <div className={styles.metaBlockItem}>
            <span className={styles.metaBlockLabel}>Scope: </span>
            <span className={styles.metaBlockValue}>Complete Production System</span>
          </div>
        </div>

        <div className={styles.docItemsBlock}>

          {/* Opening */}
          <h2 className={styles.h2}>From Part Feeding to Intelligent Production</h2>
          <h3 className={styles.h3}>Engineering, Building and Deploying the Complete Production System — Not Just the Vision System</h3>

          <p className={styles.secPara}>
            In modern manufacturing, automated inspection cannot be treated as an isolated camera-and-software problem.
          </p>
          <p className={styles.secPara}>
            A vision system can identify a defect. AI can make a decision. But neither can deliver production value
            unless the part is <strong>presented correctly, inspected reliably, handled at the required speed, and
            automatically moved to the right next process.</strong>
          </p>
          <p className={styles.secPara}>
            That is where IdentifYou Technologies takes a different approach.
          </p>
          <p className={styles.secPara}>
            <strong>IdentifYou does not just develop a Vision System or an AI Decision-Making System.</strong>
          </p>
          <p className={styles.secPara}>
            We engineer, build, integrate, test and deploy the <strong>complete production automation system</strong> around
            the inspection requirement.
          </p>
          <p className={styles.secPara}>
            From the moment a part enters the system to the moment it is accepted, rejected, sorted or transferred
            to the next operation, IdentifYou engineers the complete journey.
          </p>

          {/* The Challenge */}
          <h2 className={styles.h2}>The Challenge</h2>
          <h3 className={styles.h3}>The Requirement Was Not Simply &quot;Inspect the Part&quot;</h3>

          <p className={styles.secPara}>
            The initial requirement may appear straightforward:
          </p>
          <p className={styles.secPara}>
            <strong>&ldquo;Inspect every component and identify defective parts.&rdquo;</strong>
          </p>
          <p className={styles.secPara}>
            But production immediately introduces a much larger engineering challenge.
          </p>

          <ul className={styles.secBullets}>
            <li>How should the parts be fed?</li>
            <li>How should individual parts be separated?</li>
            <li>How should the part be oriented?</li>
            <li>How should it be presented to the camera?</li>
            <li>What fixture is required to achieve repeatable positioning?</li>
            <li>What lighting will reveal the defect?</li>
            <li>What camera or 3D profiler will provide the required resolution?</li>
            <li>What is the inspection cycle time?</li>
            <li>Can the system achieve the required production throughput?</li>
            <li>What happens when a defective part is detected?</li>
            <li>How does the robot handle the component?</li>
            <li>Where does the rejected part go?</li>
            <li>How does the accepted part move to the next process?</li>
            <li>What happens when the part geometry changes?</li>
            <li>How does the system recover from a jam or failed inspection?</li>
          </ul>

          <p className={styles.secPara}>And ultimately:</p>
          <p className={styles.secPara}>
            <strong>How does the complete system operate reliably on the factory floor?</strong>
          </p>
          <p className={styles.secPara}>
            IdentifYou approaches these questions as <strong>one engineering problem—not as separate technology components.</strong>
          </p>

          {/* The IdentifYou Approach */}
          <h2 className={styles.h2}>The IdentifYou Approach</h2>
          <h3 className={styles.h3}>We Engineer Everything That Makes Inspection Work.</h3>

          <p className={styles.secPara}>
            From the first part entering the feeder to the final part reaching its next operation, IdentifYou takes
            responsibility for the complete engineering journey.
          </p>

          <ul className={styles.secBullets}>
            <li>We understand the <strong>part.</strong></li>
            <li>We understand the <strong>process.</strong></li>
            <li>We understand the <strong>machine.</strong></li>
            <li>We understand the <strong>inspection requirement.</strong></li>
            <li>We understand the <strong>cycle time.</strong></li>
            <li>We understand the <strong>space constraints.</strong></li>
            <li>We understand the <strong>lighting and imaging requirements.</strong></li>
            <li>We understand the <strong>robotics and handling requirements.</strong></li>
          </ul>

          <p className={styles.secPara}>
            And we understand how all of these elements must work together on the factory floor.
          </p>
          <p className={styles.secPara}>
            At the same time, the physical production environment is evaluated.
          </p>
          <p className={styles.secPara}>
            <strong>Available space. Machine interfaces. Operator access. Material flow. Safety requirements.
            Lighting conditions. Existing automation. PLC interfaces. Upstream and downstream processes.</strong>
          </p>
          <p className={styles.secPara}>The question is not:</p>
          <p className={styles.secPara}><strong>&ldquo;Which camera should we use?&rdquo;</strong></p>
          <p className={styles.secPara}>The question is:</p>
          <p className={styles.secPara}>
            <strong>&ldquo;What production system will reliably deliver the required inspection and throughput?&rdquo;</strong>
          </p>
          <p className={styles.secPara}>
            <strong>That is how Vision AI becomes production intelligence.</strong>
          </p>

          {/* Journey */}
          <h4 className={styles.h4}>Feed → Present → See → Understand → Decide → Act → Continue</h4>

          {/* What IdentifYou Really Delivers */}
          <h2 className={styles.h2}>What IdentifYou Really Delivers</h2>
          <h3 className={styles.h3}>Not a Camera. Not an AI Model. A Production System.</h3>

          <p className={styles.secPara}>
            A conventional approach may deliver: <strong>Camera + Software + AI Model</strong>
          </p>
          <p className={styles.secPara}>
            IdentifYou goes further and Owns the Journey from Concept to Production
          </p>

          {/* Step 1 */}
          <h4 className={styles.h4}>Production Requirement</h4>
          <p className={styles.secPara}>
            In modern manufacturing, automated inspection cannot be treated as an isolated camera-and-software problem.
          </p>
          <p className={styles.secPara}>
            A vision system can identify a defect. AI can make a decision. But neither can deliver production value
            unless the part is <strong>presented correctly, inspected reliably, handled at the required speed,
            and automatically moved to the right next process.</strong>
          </p>
          <p className={styles.secPara}>
            Every industrial automation project has constraints.
          </p>
          <p className={styles.secPara}>
            <strong>Space, Cycle Time, Throughput, Part Variation, Lighting, Mechanical Tolerances, Robot Reach,
            Operator Accessibility, Safety, Maintenance, Changeover.</strong>
          </p>

          {/* Step 2 */}
          <h4 className={styles.h4}>Engineering Study</h4>
          <p className={styles.secPara}>
            (Ultimately: How does the complete system operate reliably on the factory floor?)
          </p>
          <p className={styles.secPara}>
            IdentifYou approaches these questions as <strong>one engineering problem—not as separate technology components.</strong>
          </p>

          {/* Step 3 */}
          <h4 className={styles.h4}>Feeder Design (A feeder is not designed without considering the conveyor)</h4>
          <p className={styles.secPara}>
            Vibratory Bowl Feeders • Step Feeders • Centrifugal Feeders • Linear Feeders • Belt Feeders • Tray
            Feeding • Flexible Feeding • Robot-Based Feeding
          </p>

          {/* Step 4 */}
          <h4 className={styles.h4}>Singulation &amp; Orientation</h4>
          <p className={styles.secPara}>
            Singulation → Orientation → Separation → Controlled Presentation
          </p>
          <p className={styles.secPara}>
            Mechanical tooling, escapements, indexing mechanisms, tracks, guides, pockets and intelligent
            vision-guided mechanisms can be combined depending on the application.
          </p>
          <p className={styles.secPara}>
            The objective is to create a stable and repeatable part presentation for the inspection process.
          </p>

          {/* Step 5 */}
          <h4 className={styles.h4}>Conveyor / Transfer (The conveyor is not designed without considering the fixture)</h4>
          <p className={styles.secPara}>
            Cycle Time | Throughput | Part Stability | Inspection Window | Robot Reach | Space Constraints
          </p>
          <p className={styles.secPara}>
            Conveyor systems, indexing mechanisms, rotary tables, tracks, carriers and custom transfer mechanisms
            can be incorporated into the design.
          </p>
          <p className={styles.secPara}>
            The conveyor is therefore not simply a transport mechanism. <strong>It becomes part of the inspection architecture.</strong>
          </p>

          {/* Step 6 */}
          <h4 className={styles.h4}>Fixture &amp; Presentation (The fixture is not designed without considering the camera)</h4>
          <p className={styles.secPara}>
            The objective is to create the <strong>ideal inspection condition—not simply mount a camera above a conveyor.</strong>
          </p>
          <p className={styles.secPara}>
            Part geometry | Datum references | Required inspection surfaces | Camera field of view | Working
            distance | Lighting geometry | Robot accessibility | Cycle time | Changeover requirements
          </p>

          {/* Step 7 */}
          <h4 className={styles.h4}>Vision + Illumination</h4>
          <p className={styles.secPara}>
            Designed around optics, resolution, field of view and illumination.
          </p>
          <p className={styles.secPara}>
            The camera, lens, illumination, mounting arrangement and acquisition strategy are engineered together.
          </p>
          <p className={styles.secPara}>
            The objective is not to select the most sophisticated camera.
          </p>
          <p className={styles.secPara}>
            <strong>The objective is to create the most reliable sensing architecture for the production problem.</strong>
          </p>

          {/* Step 8 */}
          <h4 className={styles.h4}>AI / Machine Vision (The Vision AI system is not developed without considering the robot)</h4>
          <p className={styles.secPara}>
            Designed around inspection criteria, accuracy and decision confidence.
          </p>

          {/* Step 9 */}
          <h4 className={styles.h4}>Robot / Handling (The robot is not programmed without considering the downstream process)</h4>
          <p className={styles.secPara}>
            Designed around reach, payload, cycle time and handling requirements.
          </p>

          {/* Step 10 */}
          <h4 className={styles.h4}>Sorting / Next Process</h4>
          <p className={styles.secPara}>
            A production-grade inspection system must do more than say <strong>PASS</strong> or <strong>FAIL</strong>.
            It must physically execute that decision.
          </p>
          <p className={styles.secPara}>Accepted components may be transferred to:</p>
          <p className={styles.secPara}>
            <strong>Assembly → Machining → Packaging → Storage → Next Production Operation</strong>
          </p>
          <p className={styles.secPara}>Rejected components may be directed to:</p>
          <p className={styles.secPara}>
            <strong>Reject Bin → Rework → Quarantine → Separate Inspection</strong>
          </p>
          <p className={styles.secPara}>
            The handling mechanism is engineered to ensure that the physical material flow remains synchronized
            with the digital inspection decision.
          </p>

          {/* Step 11 */}
          <h4 className={styles.h4}>Controls &amp; Integration</h4>
          <p className={styles.secPara}>
            Detection → Classification → Measurement → Defect Identification → Pattern Recognition → Pass/Fail Decision
          </p>

          {/* Step 12 */}
          <h4 className={styles.h4}>Testing &amp; Validation</h4>

          {/* Step 13 */}
          <h4 className={styles.h4}>Production Deployment</h4>
          <p className={styles.secPara}>
            This is the difference between building an <strong>inspection solution</strong> and engineering
            a <strong>production-ready intelligent automation system.</strong>
          </p>

          {/* Closing */}
          <h2 className={styles.h2}>IdentifYou Technologies — From Existing Production to Intelligent Automation</h2>

          <p className={styles.secPara}>
            The final outcome is not simply an automated inspection station.
          </p>
          <p className={styles.secPara}>
            It is a production system where <strong>mechanical engineering, machine vision, AI, robotics and
            industrial automation operate as one connected system.</strong>
          </p>

          <ul className={styles.secBullets}>
            <li><strong>From Feeder Design to Vision AI.</strong></li>
            <li><strong>From Engineering to Production.</strong></li>
            <li><strong>From Inspection to Intelligent Automation.</strong></li>
          </ul>

        </div>
      </section>

      <Footer />
    </div>
  )
}
