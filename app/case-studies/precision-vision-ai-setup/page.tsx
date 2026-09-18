import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getCategoryTheme } from '@/lib/caseStudyCategories'
import styles from '../[slug]/page.module.css'

export const metadata: Metadata = {
  title: 'Precision Vision AI Setup — Engineering Micron-Level Inspection | IdentifYou',
  description:
    'IdentifYou engineers micron-level inspection as an end-to-end engineering challenge, combining mechanics, optics, AI, and robotics into one production-ready system.',
}

export default function PrecisionVisionAISetupCaseStudyPage() {
  const theme = getCategoryTheme({ categories: ['Vision AI'] })

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        {' / '}
        <Link href="/case-studies" className={styles.breadcrumbLink}>Case Studies</Link>
        {' / '}
        Precision Vision AI Setup
      </div>

      <section className={styles.content}>
        <div
          className={styles.tagBadge}
          style={{ color: theme.tagColor, backgroundColor: theme.badgeBg, borderColor: theme.tintColor }}
        >
          VISION AI · PRECISION INSPECTION
        </div>
        <h1 className={styles.title}>Precision Vision AI Setup</h1>

        <div className={styles.heroImgWrapper}>
          <img
            src="/images/case-studies/precision-vision-ai-setup.png"
            alt="Precision Vision AI Setup"
            className={styles.heroIllustration}
          />
          <div
            className={styles.colorTintLayer}
            style={{ backgroundColor: theme.tintColor, opacity: theme.overlayOpacity }}
          />
          <div
            className={styles.colorGradientLayer}
            style={{ background: theme.gradientCss }}
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
            <span className={styles.metaBlockValue}>Micron-Level Production Inspection</span>
          </div>
        </div>

        <div className={styles.docItemsBlock}>

          {/* Introduction */}
          <h2 className={styles.h2}>The Challenge</h2>
          <h3 className={styles.h3}>Engineering Challenges at Micron-Level Tolerances</h3>

          <p className={styles.secPara}>
            This created several engineering challenges simultaneously.
          </p>

          <h4 className={styles.h4}>Measurement Precision</h4>
          <p className={styles.secPara}>
            At micron-level tolerances, even small variations in imaging geometry can influence the measurement. 
            A seemingly minor change in camera orientation, working distance or component position can translate into significant measurement variation.
          </p>

          <h4 className={styles.h4}>Illumination Control</h4>
          <p className={styles.secPara}>
            Lighting is not simply used to make the component visible. At this level of inspection, the lighting architecture directly influences measurement quality. 
            Light angle, intensity, reflection, shadows and surface characteristics must be engineered around the inspection feature.
          </p>

          <h4 className={styles.h4}>Repeatable Part Presentation</h4>
          <p className={styles.secPara}>
            The component must arrive at the inspection point in a highly repeatable position. 
            Any uncontrolled movement, rotation or variation in presentation can directly affect measurement consistency.
          </p>

          <h4 className={styles.h4}>Production Speed</h4>
          <p className={styles.secPara}>
            The system cannot achieve precision by simply slowing down the production line. 
            Inspection accuracy and production throughput must coexist.
          </p>

          <h4 className={styles.h4}>Reliability & Consistency</h4>
          <p className={styles.secPara}>
            The system must produce reliable measurements repeatedly—not just deliver accurate results during a controlled demonstration.
          </p>
          <p className={styles.secPara}>
            <strong>The objective is therefore: Precision that survives real production.</strong>
          </p>

          <h2 className={styles.h2}>The Objective</h2>
          <h3 className={styles.h3}>Measurement Accuracy & Production-Ready Precision Inspection</h3>
          <p className={styles.secPara}>
            For micron-level production inspection, success is determined by multiple variables working together:
          </p>
          <ul className={styles.secBullets}>
            <li>Mechanical Repeatability</li>
            <li>Optical Stability</li>
            <li>Illumination Control</li>
            <li>AI / Vision Intelligence</li>
            <li>Cycle Time</li>
            <li>Throughput</li>
            <li>Handling Reliability</li>
          </ul>
          <p className={styles.secPara}>
            A highly accurate vision algorithm is of limited value if the component is inconsistently positioned. A precision camera is of limited value if the lighting is unstable. A perfect measurement system is of limited value if it slows the production line. IdentifYou engineers all of these variables as one system.
          </p>

          <h2 className={styles.h2}>IdentifYou&apos;s Engineering Approach</h2>
          <h3 className={styles.h3}>The Engineering Equation: Accuracy Alone Is Not Enough.</h3>

          <p className={styles.secPara}>
            <strong>IdentifYou approaches micron-level inspection as an end-to-end engineering challenge.</strong>
          </p>
          <p className={styles.secPara}>
            Instead of beginning with a camera, we begin with the production requirement:
          </p>

          <ul className={styles.secBullets}>
            <li>What must be measured?</li>
            <li>What is the tolerance?</li>
            <li>How fast must the part be inspected?</li>
            <li>How must the part be presented?</li>
            <li>What optical characteristics are required?</li>
            <li>What lighting geometry will produce the most stable measurement?</li>
            <li>How should the part be handled after inspection?</li>
            <li>What throughput must the system achieve?</li>
          </ul>

          <p className={styles.secPara}>
            These requirements drive the architecture.
          </p>
          <p className={styles.secPara}>
            The resulting solution combines mechanical engineering, precision part presentation, optics, illumination, machine vision, AI, robotics, industrial computing and automated segregation into one production-ready system.
          </p>

          <h2 className={styles.h2}>Engineering the Complete Inspection Cell for Precision Measurement</h2>
          
          <p className={styles.secPara}>
            IdentifYou Engineers the Environment in Which Vision Must Perform the precision measurement. This is where IdentifYou&apos;s capability extends beyond conventional machine-vision development.
          </p>
          <p className={styles.secPara}>
            We don&apos;t simply ask: &quot;Can the camera detect it?&quot;
          </p>
          <p className={styles.secPara}>
            We ask: &quot;Can the complete production system detect it accurately, repeatedly and at production speed?&quot;
          </p>
          <p className={styles.secPara}>
            The inspection system is engineered as a connected production cell. <strong>Every layer is engineered to support the inspection objective.</strong>
          </p>

          <h4 className={styles.h4}>Feeding</h4>
          <p className={styles.secPara}>
            Parts are automatically introduced into the system using the appropriate feeding mechanism. Depending on component geometry and production requirements, this can include: <strong>Roller Feeding • Belt Conveyors • Part Feeders • Controlled Infeed Systems</strong>. The objective is to establish a stable and predictable flow of components.
          </p>

          <h4 className={styles.h4}>Part Presentation</h4>
          <p className={styles.secPara}>
            Before measurement begins, the component must be presented consistently. IdentifYou engineers the interaction between: <strong>Feeder → Conveyor → Fixture → Inspection Position</strong>. The mechanical architecture is designed to minimize positional variation and create a repeatable inspection condition.
          </p>

          <h4 className={styles.h4}>Precision Vision</h4>
          <p className={styles.secPara}>
            Different inspection characteristics require different sensing technologies. IdentifYou selects and integrates the appropriate combination of:
          </p>
          <ul className={styles.secBullets}>
            <li>2D Cameras for high-resolution visual and dimensional features</li>
            <li>3D Profilers for profile, height, depth and complex dimensional characteristics</li>
          </ul>
          <p className={styles.secPara}>
            The technologies are selected based on the measurement requirement—not because a particular technology is available.
          </p>

          <h4 className={styles.h4}>Precision Illumination</h4>
          <p className={styles.secPara}>
            <strong>Lighting Becomes Part of the Measurement System.</strong> At micron-level inspection, illumination is engineered as carefully as the camera. The system considers: <strong>Light Direction → Intensity → Angle → Reflection → Surface Characteristics → Feature Contrast</strong>. 
          </p>
          <p className={styles.secPara}>
            UV Illumination is used for inspection conditions where conventional illumination cannot provide sufficient contrast or feature separation. The objective is to create a stable visual signature for the measurement feature. This is particularly important for metallic, reflective, machined or complex-surface components where small changes in illumination can influence the detected edge or surface.
          </p>
          <p className={styles.secPara}>
            <strong>The camera captures the image. The lighting creates the conditions that make the right measurement possible.</strong>
          </p>

          <h4 className={styles.h4}>Vision AI & Measurement Intelligence</h4>
          <p className={styles.secPara}>
            <strong>From Image to Micron-Level Decision.</strong> The captured data is processed through the vision and AI pipeline to identify, measure and evaluate critical features. The system can combine: <strong>Feature Detection → Edge Detection → Dimensional Measurement → Surface Analysis → Defect Detection → Classification → Pass/Fail Decision</strong>.
          </p>
          <p className={styles.secPara}>
            Where appropriate, multiple sensing modalities can be combined to improve inspection coverage and reliability. <strong>The objective is not simply to produce an image. The objective is to produce a trusted production decision.</strong>
          </p>

          <h4 className={styles.h4}>Industrial Computing & Decision Control</h4>
          <p className={styles.secPara}>
            The inspection intelligence operates on an industrial computing architecture designed for continuous production operation.
          </p>
          <p className={styles.secPara}>
            <strong>The system manages: Image Acquisition → Processing → Measurement → AI Decision → Production Response → Data / Indication</strong>
          </p>
          <p className={styles.secPara}>
            The resulting decision can be communicated through industrial indication systems and integrated into the downstream automation sequence. This transforms the inspection system from a standalone measurement station into an active production-control component.
          </p>

          <h4 className={styles.h4}>Robotic Handling</h4>
          <p className={styles.secPara}>
            <strong>The Inspection Decision Becomes Physical Action.</strong> Once the component is classified, the system must execute the decision. Pick-and-place robotics can be integrated to: <strong>Pick → Transfer → Reorient → Place → Segregate</strong>.
          </p>
          <p className={styles.secPara}>
            The robot is engineered around the required: <strong>Cycle Time • Reach • Payload • Gripper Configuration • Part Geometry • Workspace</strong>. This ensures that inspection does not become a bottleneck in the production process.
          </p>

          <h4 className={styles.h4}>Automated Segregation</h4>
          <p className={styles.secPara}>
            <strong>Pass and Fail Are Physically Separated.</strong> A production inspection system must close the loop. The system automatically directs components based on the inspection result.
          </p>
          <ul className={styles.secBullets}>
            <li><strong>PASS</strong> → Continue to the next production process</li>
            <li><strong>FAIL</strong> → Automated rejection / segregation / quarantine / rework</li>
          </ul>
          <p className={styles.secPara}>
            Different segregation mechanisms can be engineered depending on the component and production environment. The result is a complete chain: <strong>Measure → Decide → Act → Continue</strong>.
          </p>

          <h2 className={styles.h2}>A Production-Ready Vision AI System</h2>
          <h3 className={styles.h3}>Designed for Precision. Engineered for Reality.</h3>
          <p className={styles.secPara}>
            Micron-level inspection cannot be achieved by AI alone. It requires the right mechanics, optics, illumination, sensing, computation, intelligence and automation working together. That is the capability IdentifYou brings to the factory floor.
          </p>
          <p className={styles.secPara}>
            We design and deploy Vision AI systems where 6–16 micron tolerance levels meet real production conditions—while maintaining the reliability, consistency, cycle time and throughput demanded by manufacturing.
          </p>
          <p className={styles.secPara}>
            <strong>IdentifYou Technologies — Engineering Vision AI for Production.</strong>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  )
}
