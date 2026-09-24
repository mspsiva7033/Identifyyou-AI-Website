import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

interface ArticleDetail {
  title: string
  category: string
  date: string
  readTime: string
  overview: string
  image?: string
  sections: { title: string; content: string }[]
  takeaways: string[]
  topics: string
}

const sampleArticles: Record<string, ArticleDetail> = {
  'ai-in-manufacturing-quality-inspection-2026': {
    title: 'How AI-Powered Vision Inspection is Transforming High-Precision Manufacturing',
    category: 'Vision AI & Quality',
    date: 'August 28, 2026',
    readTime: '6 min read',
    image: '/images/vision_ai_hero_new.png',
    overview:
      'Integrating high-speed industrial cameras with deep learning networks eliminates visual defect bottlenecks on automotive assembly lines. Sub-millimeter part measurements and micro-crack detection can now happen at full line speed.',
    sections: [
      {
        title: '1. Beyond Traditional Rule-Based Vision Systems',
        content:
          'Legacy machine vision relies on manual thresholding and edge algorithms that struggle with glare, surface oil, or geometric variations. Modern Convolutional Neural Networks (CNNs) train on thousands of component images, achieving robust anomaly detection even under shifting ambient factory lighting.',
      },
      {
        title: '2. High-Speed Edge Inferencing at Scale',
        content:
          'By pairing Basler optical hardware with edge inferencing chips (such as NVIDIA Jetson or TensorRT runtimes), component evaluation happens within 15-30 milliseconds per frame, triggering real-time PLC rejection gates without stopping the conveyor line.',
      },
      {
        title: '3. Measurable ROI Across Plant Operations',
        content:
          'Manufacturers adopting vision AI report a 95%+ drop in scrap escape rates, 100% automated quality logging into MES databases, and complete elimination of repetitive human visual fatigue.',
      },
    ],
    takeaways: [
      'Sub-millimeter measurement precision without slowing line throughput.',
      'Eliminates false positives caused by ambient lighting changes.',
      'Direct integration with PLC actuators for instant defect ejection.',
    ],
    topics: 'Vision AI · Computer Vision · Basler Cameras · TensorRT · MES Integration',
  },
  'building-connected-factories-opc-ua-mqtt-edge': {
    title: 'Architecting Connected Factories: From OPC-UA & MQTT to Edge Computing',
    category: 'Industrial Automation',
    date: 'August 14, 2026',
    readTime: '8 min read',
    image: '/images/end_to_end_inspection_cell.png',
    overview:
      'A comprehensive guide for factory managers on unifying legacy PLC signals, edge buffering, and real-time cloud data pipelines without disrupting ongoing plant operations.',
    sections: [
      {
        title: '1. Overcoming the Legacy Protocol Tower of Babel',
        content:
          'Industrial shop floors house machinery spanning multiple decades—Modbus, Profinet, Ethernet/IP, and serial controllers. OPC-UA serves as the unifying data protocol to expose standardized tags across the enterprise.',
      },
      {
        title: '2. Lightweight MQTT Telemetry & Edge Buffering',
        content:
          'Edge gateways aggregate OPC-UA nodes and convert payload structures into efficient MQTT Sparkplug B telemetry. Local storage buffers data during temporary network dropouts, guaranteeing zero data loss.',
      },
    ],
    takeaways: [
      'Standardized machine connectivity using OPC-UA standards.',
      'Resilient edge storage buffers preventing telemetry loss.',
      'Seamless cloud ingestion into Snowflake data lakehouses.',
    ],
    topics: 'OPC-UA · MQTT · IIoT · Edge Gateways · SCADA · Industrial Automation',
  },
  'snowflake-cortex-ai-manufacturing-data-platform': {
    title: 'Leveraging Snowflake Cortex AI for Intelligent Procurement and Supply Chain Analytics',
    category: 'Data Engineering',
    date: 'July 30, 2026',
    readTime: '5 min read',
    image: '/images/snowflake_cortex_architecture.png',
    overview:
      'How enterprise manufacturing teams use native Snowflake Cortex AI applications to forecast raw material pricing and mitigate stock-out risks.',
    sections: [
      {
        title: '1. Unifying Enterprise & Operational Telemetry',
        content:
          'By combining ERP purchase histories with IoT consumption data inside Snowflake, analytics teams gain real-time visibility into inventory depletion curves and vendor delivery timelines.',
      },
      {
        title: '2. Predictive Price Forecasting & Risk Scoring',
        content:
          'Snowflake Cortex AI native functions evaluate market indices and supplier lead times, automatically surfacing top vendor recommendations and price optimization alerts.',
      },
    ],
    takeaways: [
      'Native AI models running directly within Snowflake security perimeter.',
      'Automated inventory replenishment triggers.',
      'Real-time raw material price risk modeling.',
    ],
    topics: 'Snowflake Cortex AI · PySpark · Supply Chain · Procurement · Data Engineering',
  },
  'no-code-ai-platforms-for-enterprise-workflows': {
    title: 'The Shift Towards No-Code Enterprise Applications in Industrial Operations',
    category: 'Digital Engineering',
    date: 'July 12, 2026',
    readTime: '7 min read',
    image: '/images/ai_no_code_hero.png',
    overview:
      'Empowering plant engineers and floor supervisors to create custom tracking apps and workflow automations without traditional software development delays.',
    sections: [
      {
        title: '1. Democratizing Application Development on the Shop Floor',
        content:
          'No-code platforms allow domain experts—who understand operational nuances best—to configure digital work instructions, quality checklists, and material movement tracking forms in hours.',
      },
    ],
    takeaways: [
      'Rapid deployment of custom shop floor web and mobile apps.',
      'Seamless integration with backend databases and enterprise APIs.',
      'Significantly reduced dependency on IT development backlogs.',
    ],
    topics: 'Digital Engineering · No-Code Platforms · AI Applications · Shop Floor Automation',
  },
  'deep-tech-computer-vision-assembly-lines': {
    title: 'Computer Vision & Edge Inferencing on High-Speed Assembly Lines',
    category: 'Vision AI & Quality',
    date: 'June 25, 2026',
    readTime: '6 min read',
    image: '/images/vision_ai_hero_production_line.png',
    overview:
      'Exploring multi-camera vision synchronization and high-speed edge hardware to verify assembly accuracy on fast-moving conveyors.',
    sections: [
      {
        title: '1. Multi-Angle Verification',
        content:
          'Synchronizing multiple high-resolution optical sensors to verify bolt placement, wire harness routing, and surface finish simultaneously.',
      },
    ],
    takeaways: [
      'Synchronized multi-camera image acquisition.',
      'Sub-50ms deep learning classification per component.',
      'Direct integration with robotic cell controllers.',
    ],
    topics: 'Computer Vision · Edge Inferencing · High-Speed Assembly · Robotics',
  },
  'predictive-maintenance-iiot-sensor-fusion': {
    title: 'Predictive Maintenance at Scale with IIoT Sensor Fusion & Machine Learning',
    category: 'Industrial Automation',
    date: 'June 10, 2026',
    readTime: '7 min read',
    image: '/images/industry_automation_hero.png',
    overview:
      'Fusing thermal telemetry, vibration metrics, and current draw sensors to predict equipment failure before catastrophic downtime occurs.',
    sections: [
      {
        title: '1. Multi-Sensor Data Fusion',
        content:
          'Combining accelerometers, thermal gateways, and acoustic sensors to detect microscopic bearing wear weeks before physical failure.',
      },
    ],
    takeaways: [
      'Early detection of mechanical degradation signals.',
      'Drastic reduction in emergency maintenance costs.',
      'Extended machinery lifespan and maximum OEE.',
    ],
    topics: 'Predictive Maintenance · IIoT · Sensor Fusion · Machine Learning · Condition Monitoring',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = sampleArticles[slug]
  if (!article) return { title: 'Blog Post — IdentifYou Insights' }
  return {
    title: `${article.title} — IdentifYou Insights`,
    description: article.overview,
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = sampleArticles[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: 'Deep Tech & AI Insights',
    date: 'September 2026',
    readTime: '5 min read',
    image: '/images/digital_engineering_hero.png',
    overview: 'Empowering enterprise operations with automated visual workflows, connected systems, and intelligent decision platforms.',
    sections: [
      {
        title: 'Deep Tech Innovation',
        content: 'Building production-grade AI and industrial automation solutions tailored for enterprise requirements.',
      },
    ],
    takeaways: ['Empower operational teams.', 'Drive data-backed decision making.', 'Accelerate digital transformation.'],
    topics: 'Deep Tech · Artificial Intelligence · Enterprise Solutions',
  }

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        {' / '}
        <Link href="/blogs-and-news" className={styles.breadcrumbLink}>Blogs & News</Link>
        {' / '}
        {article.title}
      </div>

      <section className={styles.content}>
        <div className={styles.tagBadge}>{article.category}</div>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.metaLine}>
          <span>{article.date}</span> • <span>{article.readTime}</span>
        </div>

        <div className={styles.heroImgWrapper}>
          <img src={article.image || '/images/digital_engineering_hero.png'} alt={article.title} className={styles.heroImg} />
        </div>

        <h2 className={styles.h2}>Overview</h2>
        <p className={styles.overview}>{article.overview}</p>

        {article.sections && article.sections.length > 0 && (
          <div className={styles.sectionsList}>
            {article.sections.map((sec, idx) => (
              <div key={idx} className={styles.sectionBox}>
                <h3 className={styles.sectionTitle}>{sec.title}</h3>
                <p className={styles.sectionText}>{sec.content}</p>
              </div>
            ))}
          </div>
        )}

        {article.takeaways && article.takeaways.length > 0 && (
          <div className={styles.takeawaysBox}>
            <div className={styles.takeawaysTitle}>Key Takeaways</div>
            {article.takeaways.map((t, idx) => (
              <div key={idx} className={styles.takeawayItem}>• {t}</div>
            ))}
          </div>
        )}

        <div className={styles.techUsed}>
          <div className={styles.techUsedLabel}>Topics Covered</div>
          <div className={styles.techUsedValue}>{article.topics}</div>
        </div>

        <div className={styles.ctaBox}>
          <h3>Interested in implementing this in your operations?</h3>
          <p>Talk to our engineering team to explore custom AI & Automation deployments.</p>
          <Link href="/contact" className={styles.ctaBtn}>Contact Deep Tech Experts →</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

