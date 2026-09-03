import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FlowChain } from '@/components/ui/FlowChain'
import { CTABlock } from '@/components/ui/CTABlock'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Industry Automation — Connect. Automate. Optimize.',
  description: 'Bring machines, sensors, robots and enterprise systems together to create intelligent industrial operations.',
}

const flow = ['Machine', 'PLC / Sensors', 'OPC-UA / MQTT', 'Edge Computing', 'AI / Data', 'MES / ERP', 'Business Intelligence']
const caps = ['IIoT', 'Edge Computing', 'Machine Connectivity', 'Industrial Gateways', 'OPC-UA', 'MQTT', 'Robotics', 'Pick & Place', 'Industrial Automation', 'Real-Time Monitoring']

export default function IndustryAutomationPage() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Deep Tech — 04</div>
        <h1 className={styles.title}>Connect. Automate. Optimize.</h1>
        <p className={styles.desc}>Bring machines, sensors, robots and enterprise systems together to create intelligent industrial operations.</p>
      </section>
      <section className={styles.content}>
        <div className={styles.flowBox}>
          <FlowChain nodes={flow} />
        </div>
        <div className={styles.capsGrid}>
          {caps.map((c) => <span key={c} className={styles.cap}>{c}</span>)}
        </div>
        <div className={styles.techRow}>OPC-UA • MQTT • Edge Computing • Industrial Gateways • Robotics • Python • AI</div>
        <CTABlock headline="Explore Industry Automation" buttonLabel="Talk to an Expert" buttonHref="/contact" />
      </section>
      <Footer />
    </div>
  )
}
