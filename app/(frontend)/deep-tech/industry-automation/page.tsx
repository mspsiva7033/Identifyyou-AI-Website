import type { Metadata } from 'next'
import { IndustryAutomationClient } from './IndustryAutomationClient'

export const metadata: Metadata = {
  title: 'Connected Industrial Automation & IIoT',
  description:
    'Deploy connected industrial automation, edge devices, and robotic orchestration to eliminate bottlenecks and optimize modern manufacturing plants.',
  alternates: {
    canonical: '/deep-tech/industry-automation',
  },
}

export default function IndustryAutomationPage() {
  return <IndustryAutomationClient />
}
