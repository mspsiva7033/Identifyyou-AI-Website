import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      process.env[key] = value
    }
  })
}

import { getPayload } from 'payload'
import config from '../payload.config'

export async function seed() {
  console.log('Connecting to database:', process.env.DATABASE_URI ? 'URI Present' : 'URI Missing')
  const payload = await getPayload({ config })

  console.log('Seeding Payload CMS data...')

  // Clear existing case studies and categories
  try {
    const existing = await payload.find({ collection: 'case-studies', limit: 100 })
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'case-studies', id: doc.id })
    }
  } catch (err) {
    console.log('No previous case studies found to delete.')
  }

  try {
    const existingCats = await payload.find({ collection: 'case-study-categories', limit: 100 })
    for (const doc of existingCats.docs) {
      await payload.delete({ collection: 'case-study-categories', id: doc.id })
    }
  } catch (err) {
    console.log('No previous categories found to delete.')
  }

  // Seed Categories
  const manufacturingCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'Smart factory, MES, and connected manufacturing case studies.',
      displayOrder: 1,
    },
  })

  const supplyChainCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Supply Chain',
      slug: 'supply-chain',
      description: 'Procurement, inventory and logistics case studies.',
      displayOrder: 2,
    },
  })

  const aiCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'AI & Intelligent Business',
      slug: 'ai-intelligent-business',
      description: 'AI, ML, decision intelligence and business risk case studies.',
      displayOrder: 3,
    },
  })

  const visionCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Vision AI',
      slug: 'vision-ai',
      description: 'Computer vision, surface inspection, and 3D metrology case studies.',
      displayOrder: 4,
    },
  })

  const automationCat = await payload.create({
    collection: 'case-study-categories',
    data: {
      name: 'Industry Automation',
      slug: 'industry-automation',
      description: 'Edge gateways, pyrometry, and IIoT automation case studies.',
      displayOrder: 5,
    },
  })

  const FULL_DOCX_MAP: Record<string, any> = {
  "procurement-operations-intelligence": {
    "title": "Transforming Routine Procurement from Manual Processing to Intelligent Automation",
    "breadcrumb": "Transforming Routine Procurement from Manual Processing to Intelligent Automation",
    "tag": "Industry: Automotive & Engineering ManufacturingFunction: Procurement OperationsFocus: Standard Items • Routine Purchases • Replenishment",
    "docItems": [
      {
        "type": "p",
        "text": "Transforming Routine Procurement from Manual Processing to Intelligent Automation"
      },
      {
        "type": "p",
        "text": "Industry: Automotive & Engineering ManufacturingFunction: Procurement OperationsFocus: Standard Items • Routine Purchases • Replenishment"
      },
      {
        "type": "h2",
        "text": "The Challenge"
      },
      {
        "type": "p",
        "text": "Routine Procurement Creates a High-Volume Operational Burden"
      },
      {
        "type": "p",
        "text": "Procurement teams in manufacturing operate across thousands of purchase requirements every day, spanning raw materials, standard components, consumables, maintenance spares and other frequently purchased items across multiple plants. While many of these purchases are routine, each decision still depends on multiple pieces of information being reviewed and interpreted before action can be taken."
      },
      {
        "type": "p",
        "text": "A buyer may need to check current and usable inventory, historical consumption, open purchase orders, pending deliveries, production requirements, supplier lead times, supplier availability, previous purchase prices and outstanding commitments before deciding what needs to be purchased, when it should be purchased and from whom."
      },
      {
        "type": "p",
        "text": "As procurement volumes grow, this decision-making becomes increasingly dependent on manual monitoring, spreadsheets, ERP searches, emails, supplier calls and individual buyer experience. Procurement teams spend valuable time searching for information and following up on transactions rather than focusing on higher-value decisions."
      },
      {
        "type": "p",
        "text": "This creates a recurring set of operational challenges:"
      },
      {
        "type": "bullet",
        "text": "Replenishment decisions are delayed because buyers must manually consolidate information from multiple sources before acting."
      },
      {
        "type": "bullet",
        "text": "Stock-out risks increase when upcoming requirements, consumption trends, open PO delays or supplier lead times are not identified early enough."
      },
      {
        "type": "bullet",
        "text": "Excess inventory builds up when purchasing decisions do not sufficiently consider existing stock, open commitments and actual consumption patterns."
      },
      {
        "type": "bullet",
        "text": "Supplier and price evaluation becomes repetitive, requiring buyers to repeatedly compare historical prices, supplier performance, lead times and availability."
      },
      {
        "type": "bullet",
        "text": "Purchase orders and supplier follow-ups consume significant time, particularly when hundreds or thousands of open orders require continuous monitoring."
      },
      {
        "type": "bullet",
        "text": "Procurement exceptions remain hidden because critical issues are often discovered only when a buyer manually reviews the data or receives an escalation from production or management."
      },
      {
        "type": "bullet",
        "text": "Decision quality becomes dependent on individual experience, making it difficult to consistently apply the best procurement decision across buyers, plants and material categories."
      },
      {
        "type": "p",
        "text": "The fundamental challenge, therefore, is no longer simply having procurement data available in an ERP system."
      },
      {
        "type": "p",
        "text": "The real challenge is transforming that data into timely procurement intelligence—automatically identifying what needs attention, understanding why it matters, determining the potential business impact, and guiding the procurement team toward the right action."
      },
      {
        "type": "h3",
        "text": "The shift is from:"
      },
      {
        "type": "p",
        "text": "“Here is the procurement data. Find the problem.”"
      },
      {
        "type": "p",
        "text": "To"
      },
      {
        "type": "p",
        "text": "“Here is what requires your attention today, why it matters, what could happen if you do nothing, and what action you should take.”"
      },
      {
        "type": "p",
        "text": "This is the foundation for moving from transaction-driven procurement to intelligent, proactive procurement operations."
      },
      {
        "type": "p",
        "text": "The AI-Powered Approach"
      },
      {
        "type": "p",
        "text": "From Monitoring Every Transaction to Managing Only What Matters"
      },
      {
        "type": "p",
        "text": "IdentifYou adds an AI-powered operational procurement intelligence layer over the organization’s existing ERP, procurement and business systems—without requiring procurement teams to replace the systems they already use."
      },
      {
        "type": "p",
        "text": "Instead of making buyers search through ERP transactions, spreadsheets, open purchase orders and supplier records to determine what requires attention, IdentifYou continuously brings these signals together and interprets them in the context of the business."
      },
      {
        "type": "p",
        "text": "AI continuously analyzes:"
      },
      {
        "type": "p",
        "text": "Inventory + Consumption + Demand + Open POs + Production Requirements + Lead Times + Supplier Performance + Historical Prices + Procurement Policies + Business Rules"
      },
      {
        "type": "p",
        "text": "to understand the current procurement position, detect emerging requirements, identify risks and determine where intervention is needed."
      },
      {
        "type": "p",
        "text": "The platform moves procurement from reactive transaction processing to proactive decision-making:"
      },
      {
        "type": "p",
        "text": "SENSE → UNDERSTAND → PREDICT → RECOMMEND → ACT → MONITOR"
      },
      {
        "type": "bullet",
        "text": "Sense — Continuously observe inventory, demand, consumption, open POs, deliveries, suppliers, prices and procurement activity across plants."
      },
      {
        "type": "bullet",
        "text": "Understand — Connect these signals to determine the actual procurement situation rather than looking at each transaction in isolation."
      },
      {
        "type": "bullet",
        "text": "Predict — Identify upcoming shortages, replenishment requirements, delivery risks, price deviations and potential inventory build-up before they become operational problems."
      },
      {
        "type": "bullet",
        "text": "Recommend — Recommend what to buy, when to buy, how much to buy, from whom, and what action should be taken, with the reasoning and business context behind every recommendation."
      },
      {
        "type": "bullet",
        "text": "Act — Automate routine procurement activities where appropriate—such as alerts, follow-ups, RFQ initiation, PO preparation and workflow triggers—while keeping critical purchasing decisions under buyer control."
      },
      {
        "type": "bullet",
        "text": "Monitor — Continuously track outcomes, supplier commitments, procurement decisions and exceptions, allowing the system to learn from actual business results."
      },
      {
        "type": "h3",
        "text": "From “Data Available” to “Action Identified”"
      },
      {
        "type": "p",
        "text": "The objective is not to give procurement teams another dashboard filled with data. It is to give every buyer a continuously prioritized view of what requires attention."
      },
      {
        "type": "p",
        "text": "Instead of:"
      },
      {
        "type": "p",
        "text": "“Here are 10,000 purchase records. Find what needs attention.”"
      },
      {
        "type": "p",
        "text": "IdentifYou delivers:"
      },
      {
        "type": "p",
        "text": "“These 12 requirements need attention today. Three may cause production shortages, two suppliers are likely to miss their commitments, four purchase prices are above expected levels, and three orders can be safely deferred based on current inventory and demand.”"
      },
      {
        "type": "p",
        "text": "Every recommendation can be supported by explainable AI, confidence levels, business rules and the underlying procurement signals, allowing buyers and managers to understand why the system is recommending an action—not simply accept a black-box decision."
      },
      {
        "type": "p",
        "text": "Human-in-the-Loop by Design"
      },
      {
        "type": "p",
        "text": "IdentifYou does not attempt to remove the procurement professional from the decision."
      },
      {
        "type": "p",
        "text": "It augments the buyer's experience with continuous intelligence."
      },
      {
        "type": "p",
        "text": "The AI identifies patterns, anticipates risks, prioritizes exceptions and recommends actions. The procurement professional validates, overrides or approves the decision based on commercial relationships, business context and organizational policy."
      },
      {
        "type": "p",
        "text": "Every buyer interaction then becomes another source of learning, enabling the system to continuously improve its recommendations over time."
      },
      {
        "type": "p",
        "text": "Intelligent Procurement Automation"
      },
      {
        "type": "p",
        "text": "AI Demand & Replenishment"
      },
      {
        "type": "p",
        "text": "Predict upcoming requirements by analyzing consumption patterns, inventory position, open orders and supplier lead times."
      },
      {
        "type": "p",
        "text": "AI identifies what to buy, when to buy and how much to buy."
      },
      {
        "type": "p",
        "text": "Intelligent Purchase Recommendations"
      },
      {
        "type": "p",
        "text": "Generate purchase recommendations using inventory, demand, MOQ, lead time, supplier and procurement policies."
      },
      {
        "type": "p",
        "text": "Requirement → AI Recommendation → Buyer Approval"
      },
      {
        "type": "p",
        "text": "Automated Supplier Selection"
      },
      {
        "type": "p",
        "text": "For established standard items, AI recommends the appropriate approved supplier using price, delivery performance, quality and historical purchasing patterns."
      },
      {
        "type": "p",
        "text": "Exception Intelligence"
      },
      {
        "type": "p",
        "text": "Instead of monitoring every transaction manually, buyers receive alerts for situations that require attention:"
      },
      {
        "type": "p",
        "text": "Stock-Out Risk • Excess Inventory • Delayed PO • Price Anomaly • Supplier Risk • Unfulfilled Requirement"
      },
      {
        "type": "p",
        "text": "Procurement Workflow Automation"
      },
      {
        "type": "p",
        "text": "Approved recommendations can trigger downstream procurement workflows, reducing repetitive activities between requirement identification and purchase execution."
      },
      {
        "type": "h2",
        "text": "The Transformation"
      },
      {
        "type": "p",
        "text": "From Transaction Processing to Intelligent Procurement Operations"
      },
      {
        "type": "p",
        "text": "Traditional"
      },
      {
        "type": "p",
        "text": "Monitor → Check Data → Analyze → Select Supplier → Create PO → Follow Up"
      },
      {
        "type": "p",
        "text": "AI-Powered"
      },
      {
        "type": "p",
        "text": "Sense → Predict → Recommend → Approve → Automate → Manage Exceptions"
      },
      {
        "type": "p",
        "text": "The buyer moves from processing every transaction to managing the exceptions and decisions that require human judgment."
      },
      {
        "type": "h2",
        "text": "Business Impact"
      },
      {
        "type": "p",
        "text": "Making Procurement Faster, Smarter & More Scalable"
      },
      {
        "type": "p",
        "text": "Higher Buyer ProductivityReduce repetitive data analysis, supplier checks and transaction-processing activities."
      },
      {
        "type": "p",
        "text": "Improved Inventory EfficiencyAlign replenishment decisions with actual consumption, inventory and demand signals."
      },
      {
        "type": "p",
        "text": "Reduced Stock-Out RiskIdentify potential shortages before they become urgent procurement requirements."
      },
      {
        "type": "p",
        "text": "Faster Procurement CyclesAccelerate routine purchasing from requirement identification to execution."
      },
      {
        "type": "p",
        "text": "Better Supplier ExecutionContinuously monitor supplier commitments and surface delivery exceptions."
      },
      {
        "type": "p",
        "text": "Scalable OperationsSupport increasing procurement volumes without proportionally increasing manual effort."
      },
      {
        "type": "h2",
        "text": "IdentifYou Value"
      },
      {
        "type": "p",
        "text": "AI That Works Within the Procurement Process"
      },
      {
        "type": "p",
        "text": "IdentifYou combines manufacturing domain expertise, procurement intelligence, AI, data engineering, ERP integration and process automation to build intelligent procurement operations."
      },
      {
        "type": "p",
        "text": "The objective is not to automate procurement blindly."
      },
      {
        "type": "p",
        "text": "It is to create an operating model where:"
      },
      {
        "type": "p",
        "text": "AI Predicts → AI Recommends → Automation Executes → Humans Manage Exceptions"
      },
      {
        "type": "p",
        "text": "Automate the routine. Surface the exceptions. Empower the buyer."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "risk-insights-finance": {
    "title": "AI-Powered Risk Intelligence",
    "breadcrumb": "AI-Powered Risk Intelligence",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "AI-Powered Risk Intelligence"
      },
      {
        "type": "p",
        "text": "Predict Risk. Explain Why. Quantify Confidence. Enable Action."
      },
      {
        "type": "p",
        "text": "Industry: Financial ServicesFunction: Risk Management & OperationsFocus: Risk Prediction • Anomaly Detection • Risk Scoring • Explainable AIApproach: Domain Intelligence + Data Engineering + AI/ML + Decision Intelligence"
      },
      {
        "type": "h2",
        "text": "01 — The Challenge"
      },
      {
        "type": "p",
        "text": "Risk Signals Are Everywhere. Actionable Risk Intelligence Is Not."
      },
      {
        "type": "p",
        "text": "Financial-services enterprises generate vast volumes of data across transactions, accounts, customers, payments, lending, servicing and operational processes."
      },
      {
        "type": "p",
        "text": "Risk teams often have rules, reports and alerts—but identifying the most meaningful emerging risks can still require significant manual analysis."
      },
      {
        "type": "p",
        "text": "The critical questions are:"
      },
      {
        "type": "p",
        "text": "Which events represent genuine risk?How serious is the risk?Why is the system predicting it?How confident is the prediction?What action should the risk team take?"
      },
      {
        "type": "p",
        "text": "IdentifYou addresses this gap by transforming fragmented enterprise data into predictive, explainable and actionable risk intelligence."
      },
      {
        "type": "h2",
        "text": "02 — The IdentifYou Risk Intelligence Layer"
      },
      {
        "type": "p",
        "text": "From Risk Data to Explainable Decisions"
      },
      {
        "type": "p",
        "text": "IdentifYou creates an intelligence layer across the existing financial-services ecosystem."
      },
      {
        "type": "p",
        "text": "It combines enterprise data, business rules, historical patterns and AI models to continuously identify and prioritize emerging risks."
      },
      {
        "type": "p",
        "text": "Enterprise Data↓Data Engineering & Feature Engineering↓Domain Rules + AI/ML Models↓Risk Prediction & Scoring↓Confidence & Explainability Layer↓Risk Insight & Recommended Action↓Human Decision"
      },
      {
        "type": "p",
        "text": "The intelligence layer augments existing risk systems—it does not require replacing them."
      },
      {
        "type": "h2",
        "text": "03 — The Intelligence Behind Every Risk Prediction"
      },
      {
        "type": "p",
        "text": "A Prediction Is Only Valuable When the Business Can Trust It."
      },
      {
        "type": "p",
        "text": "IdentifYou's approach goes beyond simply generating a risk score."
      },
      {
        "type": "p",
        "text": "Every significant prediction is designed to provide four dimensions of intelligence:"
      },
      {
        "type": "h2",
        "text": "01 — Risk Score"
      },
      {
        "type": "p",
        "text": "How significant is the predicted risk?"
      },
      {
        "type": "p",
        "text": "A dynamic score helps prioritize cases based on their relative risk level."
      },
      {
        "type": "p",
        "text": "Example:Risk Score: 87 / 100 — High Risk"
      },
      {
        "type": "h2",
        "text": "02 — Confidence Score"
      },
      {
        "type": "p",
        "text": "How confident is the AI in its prediction?"
      },
      {
        "type": "p",
        "text": "The model communicates its level of confidence, helping risk teams distinguish between strong predictions and cases requiring additional validation."
      },
      {
        "type": "p",
        "text": "Example:Prediction Confidence: 93%"
      },
      {
        "type": "p",
        "text": "Confidence indicates the model's confidence in its prediction—not the probability that the predicted event will definitely occur."
      },
      {
        "type": "h2",
        "text": "03 — Risk Drivers"
      },
      {
        "type": "p",
        "text": "Why is the system predicting this risk?"
      },
      {
        "type": "p",
        "text": "The intelligence layer identifies the key factors contributing to the prediction."
      },
      {
        "type": "p",
        "text": "Example:"
      },
      {
        "type": "p",
        "text": "Primary Risk Drivers"
      },
      {
        "type": "bullet",
        "text": "Significant behavioral deviation"
      },
      {
        "type": "bullet",
        "text": "Unusual transaction pattern"
      },
      {
        "type": "bullet",
        "text": "Rapid change in activity"
      },
      {
        "type": "bullet",
        "text": "Historical risk indicators"
      },
      {
        "type": "p",
        "text": "This transforms an AI prediction from a black-box alert into an explainable business insight."
      },
      {
        "type": "h2",
        "text": "04 — Recommended Action"
      },
      {
        "type": "p",
        "text": "What should the business do next?"
      },
      {
        "type": "p",
        "text": "The system can translate the risk insight into an appropriate next-step recommendation."
      },
      {
        "type": "p",
        "text": "Example:"
      },
      {
        "type": "p",
        "text": "Recommended Action:Prioritize for risk-team review and investigation."
      },
      {
        "type": "p",
        "text": "The final decision remains with the authorized business team."
      },
      {
        "type": "h2",
        "text": "04 — Intelligent Risk Insights"
      },
      {
        "type": "p",
        "text": "Predictive Risk Scoring"
      },
      {
        "type": "p",
        "text": "AI evaluates multiple signals to generate dynamic risk scores and prioritize cases requiring attention."
      },
      {
        "type": "p",
        "text": "Risk Score + Confidence + Drivers = Explainable Risk Prediction"
      },
      {
        "type": "p",
        "text": "Emerging Risk Detection"
      },
      {
        "type": "p",
        "text": "Identify behavioral and transactional patterns that deviate from expected conditions and may indicate emerging risk."
      },
      {
        "type": "p",
        "text": "The objective is to identify risk before it becomes a significant business event."
      },
      {
        "type": "p",
        "text": "Risk Pattern Intelligence"
      },
      {
        "type": "p",
        "text": "Analyze relationships across customers, accounts, transactions, entities and activities to identify connected patterns that may not be visible when records are examined individually."
      },
      {
        "type": "p",
        "text": "Intelligent Anomaly Detection"
      },
      {
        "type": "p",
        "text": "Identify unusual activity using a combination of historical patterns, business rules and AI-driven anomaly detection."
      },
      {
        "type": "p",
        "text": "Rather than treating every anomaly as equally important, the system helps distinguish high-value risk signals from normal operational variation."
      },
      {
        "type": "h2",
        "text": "05 — From Alerts to Explainable Risk Decisions"
      },
      {
        "type": "p",
        "text": "Traditional Risk Monitoring"
      },
      {
        "type": "p",
        "text": "Detect → Generate Alert → Manual Investigation → Decision"
      },
      {
        "type": "p",
        "text": "Large volumes of alerts can result in significant manual effort and alert fatigue."
      },
      {
        "type": "p",
        "text": "Intelligent Risk Operations"
      },
      {
        "type": "p",
        "text": "Detect → Predict → Score → Explain → Prioritize → Recommend → Act"
      },
      {
        "type": "p",
        "text": "The risk team receives a contextualized risk insight rather than simply another alert."
      },
      {
        "type": "h2",
        "text": "06 — Example Risk Insight"
      },
      {
        "type": "p",
        "text": "AI-Generated Risk Intelligence"
      },
      {
        "type": "p",
        "text": "Risk Level: HighRisk Score: 87 / 100Prediction Confidence: 93%"
      },
      {
        "type": "p",
        "text": "Predicted Risk: Elevated risk requiring investigation"
      },
      {
        "type": "p",
        "text": "Key Risk Drivers:"
      },
      {
        "type": "bullet",
        "text": "Unusual transaction behavior"
      },
      {
        "type": "bullet",
        "text": "Significant deviation from historical activity"
      },
      {
        "type": "bullet",
        "text": "Recent change in behavioral pattern"
      },
      {
        "type": "bullet",
        "text": "Additional contextual risk indicators"
      },
      {
        "type": "p",
        "text": "Recommended Action:Prioritize the case for risk-team review."
      },
      {
        "type": "p",
        "text": "Why This Matters"
      },
      {
        "type": "p",
        "text": "The business does not have to ask:"
      },
      {
        "type": "p",
        "text": "“Why did AI flag this?”"
      },
      {
        "type": "p",
        "text": "The answer is presented alongside the prediction."
      },
      {
        "type": "h2",
        "text": "07 — Business Value"
      },
      {
        "type": "p",
        "text": "Making Risk Management Predictive, Explainable & Actionable"
      },
      {
        "type": "p",
        "text": "Earlier Risk VisibilityIdentify emerging risk patterns before they develop into larger incidents."
      },
      {
        "type": "p",
        "text": "Better Risk PrioritizationFocus teams on high-impact and high-confidence risk cases."
      },
      {
        "type": "p",
        "text": "Explainable AIUnderstand the factors behind every important prediction."
      },
      {
        "type": "p",
        "text": "Confidence-Aware DecisionsDistinguish stronger AI predictions from cases requiring additional human validation."
      },
      {
        "type": "p",
        "text": "Reduced Alert FatigueMove from large volumes of alerts toward prioritized risk intelligence."
      },
      {
        "type": "p",
        "text": "Faster Risk ResponseGive risk teams contextual insights and recommended next actions."
      },
      {
        "type": "p",
        "text": "Scalable Risk OperationsApply consistent intelligence across growing transaction and operational volumes."
      },
      {
        "type": "h2",
        "text": "08 — IdentifYou Value"
      },
      {
        "type": "p",
        "text": "We Don't Just Predict Risk. We Explain It."
      },
      {
        "type": "p",
        "text": "IdentifYou combines financial-domain understanding, data engineering, AI/ML and decision intelligence to create risk intelligence that business teams can understand and act upon."
      },
      {
        "type": "p",
        "text": "Our approach brings together:"
      },
      {
        "type": "p",
        "text": "Risk Score"
      },
      {
        "type": "p",
        "text": "How significant is the risk?"
      },
      {
        "type": "p",
        "text": "Confidence Score"
      },
      {
        "type": "p",
        "text": "How confident is the prediction?"
      },
      {
        "type": "p",
        "text": "Risk Drivers"
      },
      {
        "type": "p",
        "text": "Why does the AI believe this?"
      },
      {
        "type": "p",
        "text": "Recommended Action"
      },
      {
        "type": "p",
        "text": "What should happen next?"
      },
      {
        "type": "p",
        "text": "Together, these transform AI from a prediction engine into a decision-support capability."
      },
      {
        "type": "p",
        "text": "Predict the Risk. Explain the Reason. Quantify the Confidence. Enable the Decision."
      },
      {
        "type": "p",
        "text": "Data → Intelligence → Explanation → Decision → Action"
      },
      {
        "type": "p",
        "text": "IdentifYou — Engineering Intelligent Risk Operations"
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "strategic-procurement-intelligence": {
    "title": "Strategic Procurement Intelligence",
    "breadcrumb": "Strategic Procurement Intelligence",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Strategic Procurement Intelligence"
      },
      {
        "type": "p",
        "text": "AI-Powered Intelligence for Smarter CAPEX, Raw Material & Tooling Decisions"
      },
      {
        "type": "p",
        "text": "Industry: Automotive & Engineering ManufacturingFunction: Procurement & Strategic SourcingFocus: CAPEX • Raw Materials • ToolingApproach: Manufacturing Domain Intelligence + AI + Decision Science"
      },
      {
        "type": "p",
        "text": "From Procurement Data to Strategic Decisions"
      },
      {
        "type": "p",
        "text": "Procurement decisions directly influence product cost, production continuity, working capital and supplier risk."
      },
      {
        "type": "p",
        "text": "However, strategic procurement teams often work with fragmented ERP data, historical transactions, supplier information, quotations, spreadsheets and individual buyer experience. While organizations know what they purchased in the past, they often lack the intelligence to answer:"
      },
      {
        "type": "p",
        "text": "Who should we buy from? What should we pay? How much should we buy? What risks should we consider?"
      },
      {
        "type": "p",
        "text": "IdentifYou transforms procurement data into AI-powered strategic insights and explainable recommendations, helping procurement leaders make faster, more consistent and data-driven decisions."
      },
      {
        "type": "p",
        "text": "The Procurement Challenge"
      },
      {
        "type": "p",
        "text": "Strategic procurement across CAPEX, raw materials and tooling involves very different decision parameters."
      },
      {
        "type": "bullet",
        "text": "CAPEX: technical suitability, supplier capability, commercial evaluation, lifecycle cost and project risk"
      },
      {
        "type": "bullet",
        "text": "Raw Materials: price, demand, quantity, quality, lead time and supply continuity"
      },
      {
        "type": "bullet",
        "text": "Tooling: supplier performance, tool cost, consumption, replacement patterns and availability"
      },
      {
        "type": "p",
        "text": "Traditional procurement processes often depend heavily on historical information and individual expertise, making it difficult to consistently identify the best business decision."
      },
      {
        "type": "p",
        "text": "Three Strategic Intelligence Domains"
      },
      {
        "type": "h2",
        "text": "01 — CAPEX Intelligence"
      },
      {
        "type": "p",
        "text": "Make better investment and supplier decisions."
      },
      {
        "type": "p",
        "text": "AI brings together equipment specifications, supplier quotations, historical purchases, supplier performance, delivery and commissioning experience to support structured CAPEX evaluation."
      },
      {
        "type": "p",
        "text": "The intelligence layer helps procurement and business teams compare suppliers across technical capability, commercial competitiveness, lifecycle value, delivery risk and service capability—rather than selecting suppliers based on price alone."
      },
      {
        "type": "p",
        "text": "Key Intelligence"
      },
      {
        "type": "bullet",
        "text": "Supplier capability & suitability"
      },
      {
        "type": "bullet",
        "text": "Technical–commercial comparison"
      },
      {
        "type": "bullet",
        "text": "CAPEX price benchmarking"
      },
      {
        "type": "bullet",
        "text": "Total cost of ownership"
      },
      {
        "type": "bullet",
        "text": "Delivery & commissioning risk"
      },
      {
        "type": "bullet",
        "text": "Investment decision support"
      },
      {
        "type": "h2",
        "text": "02 — Raw Material Intelligence"
      },
      {
        "type": "p",
        "text": "Optimize cost, supply continuity and purchasing decisions."
      },
      {
        "type": "p",
        "text": "AI analyzes historical purchase prices, material requirements, supplier performance, inventory, open orders, lead times and demand patterns to recommend the most appropriate sourcing decision."
      },
      {
        "type": "p",
        "text": "Procurement teams gain a forward-looking view of preferred suppliers, target prices, purchase quantities, supply risks and sourcing opportunities."
      },
      {
        "type": "p",
        "text": "Key Intelligence"
      },
      {
        "type": "bullet",
        "text": "AI supplier recommendation"
      },
      {
        "type": "bullet",
        "text": "Intelligent price benchmarking"
      },
      {
        "type": "bullet",
        "text": "Demand & requirement forecasting"
      },
      {
        "type": "bullet",
        "text": "Purchase quantity intelligence"
      },
      {
        "type": "bullet",
        "text": "Supplier risk prediction"
      },
      {
        "type": "bullet",
        "text": "Multi-plant sourcing opportunities"
      },
      {
        "type": "h2",
        "text": "03 — Tooling Intelligence"
      },
      {
        "type": "p",
        "text": "Optimize tooling cost, supplier performance and availability."
      },
      {
        "type": "p",
        "text": "Tooling procurement requires visibility into supplier reliability, tool consumption, replacement frequency, historical pricing and production requirements."
      },
      {
        "type": "p",
        "text": "AI identifies purchasing patterns and supplier performance to support better tooling sourcing, cost control and availability decisions."
      },
      {
        "type": "p",
        "text": "Key Intelligence"
      },
      {
        "type": "bullet",
        "text": "Tool supplier ranking"
      },
      {
        "type": "bullet",
        "text": "Price & cost trend analysis"
      },
      {
        "type": "bullet",
        "text": "Consumption intelligence"
      },
      {
        "type": "bullet",
        "text": "Replacement pattern analysis"
      },
      {
        "type": "bullet",
        "text": "Supplier performance monitoring"
      },
      {
        "type": "bullet",
        "text": "Tooling sourcing optimization"
      },
      {
        "type": "h2",
        "text": "How the Intelligence Layer Works"
      },
      {
        "type": "p",
        "text": "IdentifYou creates an intelligence layer over the existing procurement and ERP ecosystem."
      },
      {
        "type": "p",
        "text": "ERP & Procurement Data↓Data Engineering & Feature Engineering↓AI / Analytics Models↓Strategic Procurement Intelligence↓Explainable Recommendations↓Buyer / Procurement Decision↓Procurement Execution & Outcome Feedback"
      },
      {
        "type": "p",
        "text": "The objective is not to replace procurement expertise."
      },
      {
        "type": "p",
        "text": "AI provides the intelligence. Procurement makes the decision."
      },
      {
        "type": "p",
        "text": "From Experience-Driven to Intelligence-Driven Procurement"
      },
      {
        "type": "p",
        "text": "Business Outcome"
      },
      {
        "type": "h2",
        "text": "The transformation enables procurement organizations to achieve:"
      },
      {
        "type": "p",
        "text": "Better DecisionsMore consistent, evidence-based supplier and sourcing decisions."
      },
      {
        "type": "p",
        "text": "Cost IntelligenceBetter visibility into price benchmarks, sourcing opportunities and negotiation positions."
      },
      {
        "type": "p",
        "text": "Supply Risk IntelligenceEarlier identification of supplier, delivery and fulfillment risks."
      },
      {
        "type": "p",
        "text": "Enterprise Procurement LeverageVisibility across plants to identify consolidation, harmonization and volume opportunities."
      },
      {
        "type": "p",
        "text": "Higher Procurement ProductivityLess time spent searching, comparing and consolidating data—and more time spent on strategic decisions."
      },
      {
        "type": "p",
        "text": "IdentifYou Strategic Value"
      },
      {
        "type": "p",
        "text": "IdentifYou combines manufacturing domain expertise, procurement process knowledge, data engineering and AI to build intelligence around real procurement decisions."
      },
      {
        "type": "p",
        "text": "We don't start with an AI model. We start with the procurement decision."
      },
      {
        "type": "p",
        "text": "From CAPEX investment to raw material sourcing and tooling procurement, IdentifYou helps organizations move from:"
      },
      {
        "type": "p",
        "text": "Data → Intelligence → Decision → Business Value"
      },
      {
        "type": "p",
        "text": "Strategic Procurement Intelligence — turning procurement data into a competitive advantage."
      }
    ],
    "technologyUsed": "",
    "more": [],
    "comparisonTable": {
      "headers": [
        "Traditional Procurement",
        "AI-Powered Procurement"
      ],
      "rows": [
        [
          "Search historical purchases",
          "Analyze purchasing patterns"
        ],
        [
          "Compare suppliers manually",
          "AI-ranked supplier recommendations"
        ],
        [
          "Rely on previous prices",
          "Data-driven price benchmarks"
        ],
        [
          "React to supplier issues",
          "Predict supplier risks"
        ],
        [
          "Analyze plant-by-plant",
          "Identify enterprise-wide opportunities"
        ],
        [
          "Buyer judgment alone",
          "Explainable AI + buyer judgment"
        ]
      ]
    }
  },
  "towards-zero-inventory-variance-ai": {
    "title": "Towards Zero Inventory Variance",
    "breadcrumb": "Towards Zero Inventory Variance",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Towards Zero Inventory Variance"
      },
      {
        "type": "p",
        "text": "Digitally Controlled Material Execution for Real-Time Inventory Accountability"
      },
      {
        "type": "p",
        "text": "Industry: Automotive Component ManufacturingSolution: MES | RFID | Edge Devices | Material Traceability | Digital Production ExecutionBusiness Focus: Inventory Accuracy | WIP Control | Material Traceability | Production Execution"
      },
      {
        "type": "p",
        "text": "Problem Statement"
      },
      {
        "type": "p",
        "text": "Inventory Variance Was a Symptom of Uncontrolled Material Movement"
      },
      {
        "type": "p",
        "text": "In a complex discrete manufacturing environment, inventory does not remain stationary. It continuously moves between raw material stores, production processes, intermediate WIP locations, SFG stages and final processing operations."
      },
      {
        "type": "p",
        "text": "With multiple finished goods following different and sometimes non-linear routings, material can move back and forth across several process modules before reaching the finished-goods stage."
      },
      {
        "type": "p",
        "text": "The situation becomes more complex when different manufacturing processes use different material-handling methods. While most operations handle components piece by piece, processes such as chemical treatment may require components to be accumulated and processed in bulk."
      },
      {
        "type": "p",
        "text": "A postponement strategy further introduces an intermediate SFG inventory point, where common material is held before being converted into different Finished Goods based on actual production requirements."
      },
      {
        "type": "p",
        "text": "In such an environment, even small gaps in material identification, movement recording or production-order association can accumulate into significant inventory discrepancies."
      },
      {
        "type": "p",
        "text": "The business objective"
      },
      {
        "type": "p",
        "text": "Establish a digitally controlled manufacturing environment in which every material movement is authorized, every piece remains traceable and every inventory transaction is accountable—driving inventory variance towards zero."
      },
      {
        "type": "h2",
        "text": "02 — Challenges with the Current Process"
      },
      {
        "type": "p",
        "text": "Where Inventory Variance Begins"
      },
      {
        "type": "h2",
        "text": "The challenge was not simply the absence of material tracking. The fundamental issue was that physical material movement and digital inventory transactions were not sufficiently synchronized and controlled at the point of execution."
      },
      {
        "type": "p",
        "text": "Complex Routing"
      },
      {
        "type": "p",
        "text": "Different Finished Goods follow different process routes. Material may move between multiple process modules based on product, production order and process requirements."
      },
      {
        "type": "p",
        "text": "This makes it difficult to manually determine whether a material is at the right location, for the right order and ready for the right operation."
      },
      {
        "type": "p",
        "text": "Operator-Dependent Material Movement"
      },
      {
        "type": "p",
        "text": "Material movement decisions can depend heavily on operator knowledge and manual transactions. This creates the possibility of material being moved to an incorrect location or against an incorrect production order."
      },
      {
        "type": "p",
        "text": "Bulk Processing"
      },
      {
        "type": "p",
        "text": "Chemical treatment and similar operations may require multiple pieces to be processed together. When material moves from piece-level handling to bulk processing, maintaining individual material identity becomes significantly more challenging."
      },
      {
        "type": "p",
        "text": "FIFO Challenges"
      },
      {
        "type": "p",
        "text": "When multiple lots or production orders are waiting for the same process, FIFO can become dependent on manual identification and operator discipline."
      },
      {
        "type": "p",
        "text": "Postponement Complexity"
      },
      {
        "type": "p",
        "text": "Holding common SFG inventory is strategically beneficial, but it introduces another control requirement: the plant must know exactly which SFG is available, where it is located and which Finished Goods production order it can fulfil."
      },
      {
        "type": "p",
        "text": "Inventory Accountability"
      },
      {
        "type": "p",
        "text": "When physical movement is not digitally controlled at every critical transaction point, inventory discrepancies are often identified only during periodic reconciliation."
      },
      {
        "type": "p",
        "text": "By then, identifying where, when and why the variance occurred can be difficult."
      },
      {
        "type": "h2",
        "text": "03 — Proposed Solution"
      },
      {
        "type": "p",
        "text": "From Material Tracking to Material Control"
      },
      {
        "type": "p",
        "text": "The proposed solution establishes a digitally interlocked material execution system connecting the MES with RFID, industrial handheld devices and edge devices."
      },
      {
        "type": "p",
        "text": "The MES becomes the intelligence layer that understands the production order, routing, material status and required process sequence."
      },
      {
        "type": "p",
        "text": "When a movement is required, MES generates the appropriate instruction and communicates it to the relevant shop-floor device. RFID and handheld technologies identify the physical material, while edge devices capture and transmit operational events between the shop floor and MES."
      },
      {
        "type": "p",
        "text": "Before the material is permitted to move, the system validates its identity, production order, current location, routing and intended destination."
      },
      {
        "type": "p",
        "text": "Only an authorized movement is allowed to proceed."
      },
      {
        "type": "p",
        "text": "The completed movement is then digitally recorded, allowing the MES to maintain an up-to-date representation of the physical material position."
      },
      {
        "type": "p",
        "text": "The control principle"
      },
      {
        "type": "p",
        "text": "MES decides → Device instructs → RFID identifies → System validates → Material moves → Movement is confirmed → Inventory is updated"
      },
      {
        "type": "p",
        "text": "This transforms material movement from a manual activity into a controlled manufacturing execution event."
      },
      {
        "type": "h2",
        "text": "04 — Manufacturing Strategies Implemented"
      },
      {
        "type": "p",
        "text": "Combining Lean Manufacturing Principles with Digital Execution"
      },
      {
        "type": "h2",
        "text": "The solution does not rely on technology alone. It embeds key manufacturing strategies into the material execution process."
      },
      {
        "type": "p",
        "text": "Production-Order-Based Material Execution"
      },
      {
        "type": "p",
        "text": "Material movement is directly associated with the production order and its routing."
      },
      {
        "type": "p",
        "text": "The system knows which material is required, which operation it needs to reach and which location is authorized to receive it."
      },
      {
        "type": "p",
        "text": "This reduces the dependence on operator judgement for determining material destinations."
      },
      {
        "type": "p",
        "text": "Controlled Material Flow & Digital Interlocking"
      },
      {
        "type": "p",
        "text": "The system creates a digital interlock between material, production order, process and destination."
      },
      {
        "type": "p",
        "text": "If material is attempted to be moved to the wrong process, wrong location or wrong production order, the system identifies the mismatch and prevents the unauthorized movement."
      },
      {
        "type": "p",
        "text": "The principle changes from:"
      },
      {
        "type": "p",
        "text": "Detect the wrong movement later"
      },
      {
        "type": "p",
        "text": "to:"
      },
      {
        "type": "p",
        "text": "Prevent the wrong movement at source."
      },
      {
        "type": "p",
        "text": "Postponement & Common SFG Strategy"
      },
      {
        "type": "p",
        "text": "Instead of maintaining separate Finished Goods inventory for every variant, common processing is completed up to a defined SFG postponement/decoupling point."
      },
      {
        "type": "p",
        "text": "Common SFG inventory can then be converted into the required Finished Good when the actual production requirement is known."
      },
      {
        "type": "p",
        "text": "This supports:"
      },
      {
        "type": "p",
        "text": "Inventory pooling → Lower FG inventory → Greater flexibility → Reduced variant-specific inventory"
      },
      {
        "type": "p",
        "text": "The digital movement system ensures that the correct SFG is subsequently routed to the correct final processing operation."
      },
      {
        "type": "p",
        "text": "FIFO-Based Material Management"
      },
      {
        "type": "p",
        "text": "FIFO is incorporated into the execution logic rather than being left entirely to manual practice."
      },
      {
        "type": "p",
        "text": "The system can identify eligible material based on its availability, production order, process readiness and defined priority rules."
      },
      {
        "type": "p",
        "text": "This helps prevent older WIP or SFG from remaining behind newer material and reduces unnecessary inventory ageing."
      },
      {
        "type": "p",
        "text": "Piece-to-Batch-to-Piece Traceability"
      },
      {
        "type": "p",
        "text": "Where processes such as chemical treatment require bulk loading, the solution maintains the relationship between:"
      },
      {
        "type": "p",
        "text": "Individual Pieces → Processing Batch → Production Order → Process → Individual Pieces"
      },
      {
        "type": "p",
        "text": "This allows the plant to accommodate bulk-processing requirements without losing the digital identity of individual pieces."
      },
      {
        "type": "p",
        "text": "Hybrid RFID + Edge Execution"
      },
      {
        "type": "p",
        "text": "RFID, handheld devices and edge devices are combined according to the nature of the shop-floor operation."
      },
      {
        "type": "p",
        "text": "RFID enables rapid material identification and automated movement capture, handheld devices support operator-guided execution and confirmations, while edge devices provide the connectivity between physical operations and MES."
      },
      {
        "type": "h2",
        "text": "05 — How the Solution Drives Towards Zero Inventory Variance"
      },
      {
        "type": "p",
        "text": "Control the Event That Creates the Variance"
      },
      {
        "type": "p",
        "text": "The most important principle behind the solution is:"
      },
      {
        "type": "p",
        "text": "Inventory accuracy should be engineered into every material movement rather than verified only during inventory reconciliation."
      },
      {
        "type": "p",
        "text": "Every movement becomes a controlled digital event."
      },
      {
        "type": "p",
        "text": "1. Identify"
      },
      {
        "type": "p",
        "text": "The material is digitally identified through RFID or handheld devices."
      },
      {
        "type": "p",
        "text": "2. Validate"
      },
      {
        "type": "p",
        "text": "MES validates the material against its production order, routing, current status and destination."
      },
      {
        "type": "p",
        "text": "3. Authorize"
      },
      {
        "type": "p",
        "text": "Only a valid movement is authorized."
      },
      {
        "type": "p",
        "text": "4. Execute"
      },
      {
        "type": "p",
        "text": "The operator or device executes the approved movement."
      },
      {
        "type": "p",
        "text": "5. Confirm"
      },
      {
        "type": "p",
        "text": "The actual movement is captured and transmitted to MES."
      },
      {
        "type": "p",
        "text": "6. Update"
      },
      {
        "type": "p",
        "text": "The corresponding WIP/SFG/inventory position is updated digitally."
      },
      {
        "type": "p",
        "text": "7. Reconcile"
      },
      {
        "type": "p",
        "text": "Physical material position and system inventory position remain continuously aligned."
      },
      {
        "type": "p",
        "text": "The Zero Inventory Variance Control Loop"
      },
      {
        "type": "p",
        "text": "Physical Material"
      },
      {
        "type": "p",
        "text": "↓Identify↓Validate↓Authorize↓Move↓Confirm↓Update MES↓"
      },
      {
        "type": "p",
        "text": "Digital Inventory Position"
      },
      {
        "type": "p",
        "text": "This creates a continuous relationship between:"
      },
      {
        "type": "p",
        "text": "What physically exists in the plant"
      },
      {
        "type": "p",
        "text": "and"
      },
      {
        "type": "p",
        "text": "What the system says exists in the plant."
      },
      {
        "type": "p",
        "text": "The closer every physical inventory-changing event is captured and controlled, the smaller the opportunity for unexplained inventory variance."
      },
      {
        "type": "p",
        "text": "Strategic objective"
      },
      {
        "type": "p",
        "text": "Physical Inventory ≈ System Inventory"
      },
      {
        "type": "p",
        "text": "Inventory Variance → 0"
      },
      {
        "type": "h2",
        "text": "06 — Business Value"
      },
      {
        "type": "p",
        "text": "From Inventory Reconciliation to Inventory Accountability"
      },
      {
        "type": "h2",
        "text": "The solution creates value beyond traceability."
      },
      {
        "type": "p",
        "text": "Reduced Inventory Variance"
      },
      {
        "type": "p",
        "text": "By controlling and digitally recording material movements, the plant can progressively reduce the sources of unexplained inventory differences."
      },
      {
        "type": "p",
        "text": "Improved WIP Visibility"
      },
      {
        "type": "p",
        "text": "Production and plant leadership gain greater visibility into where material is physically located and what production order it belongs to."
      },
      {
        "type": "p",
        "text": "Prevention of Wrong-Material Movement"
      },
      {
        "type": "p",
        "text": "The interlocked system prevents material from being moved to an unauthorized process or production order."
      },
      {
        "type": "p",
        "text": "Improved Inventory Accuracy"
      },
      {
        "type": "p",
        "text": "Inventory positions are continuously updated through operational events instead of relying primarily on periodic manual reconciliation."
      },
      {
        "type": "p",
        "text": "Improved FIFO Compliance"
      },
      {
        "type": "p",
        "text": "System-guided sequencing reduces dependency on manual FIFO management and helps minimize WIP ageing."
      },
      {
        "type": "p",
        "text": "Lower Finished Goods Inventory"
      },
      {
        "type": "p",
        "text": "Postponement allows the plant to maintain common SFG inventory and delay final differentiation until the actual requirement is known."
      },
      {
        "type": "p",
        "text": "Improved Production Flexibility"
      },
      {
        "type": "p",
        "text": "Common SFG can be dynamically allocated to downstream Finished Goods requirements without maintaining excessive variant-specific inventory."
      },
      {
        "type": "p",
        "text": "Complete Material Genealogy"
      },
      {
        "type": "p",
        "text": "The plant gains a digital history of material movement across processes, including the relationship between individual pieces and bulk-processing batches."
      },
      {
        "type": "p",
        "text": "Stronger Accountability"
      },
      {
        "type": "p",
        "text": "Inventory discrepancies can be traced back to specific material movements, production orders, locations, processes and transactions, making it easier to identify the source of variance."
      },
      {
        "type": "h2",
        "text": "07 — Transformation at a Glance"
      },
      {
        "type": "h2",
        "text": "08 — Executive Outcome"
      },
      {
        "type": "p",
        "text": "Every Piece. Every Movement. Every Order. Accounted For."
      },
      {
        "type": "h2",
        "text": "The transformation establishes a digitally controlled material execution environment where production orders, routing, material identity, physical movement and inventory transactions are connected."
      },
      {
        "type": "p",
        "text": "What began as a material movement challenge becomes a broader inventory accuracy and manufacturing execution strategy."
      },
      {
        "type": "h2",
        "text": "The resulting control chain:"
      },
      {
        "type": "p",
        "text": "Production Order→ Material Identification→ Routing Validation→ Movement Authorization→ Process Execution→ Traceability→ Inventory Update→ Accountability"
      },
      {
        "type": "p",
        "text": "Business Outcome"
      },
      {
        "type": "p",
        "text": "By controlling material movement at the point of execution and maintaining continuous digital traceability, the solution creates the foundation for real-time inventory accountability and drives the organization towards its strategic objective of Zero Inventory Variance."
      },
      {
        "type": "p",
        "text": "Towards Zero Inventory Variance"
      },
      {
        "type": "p",
        "text": "When every movement is controlled, every piece is traceable, and every inventory event is accountable."
      },
      {
        "type": "p",
        "text": "IdentifYou enables manufacturers to connect production orders, MES, RFID, edge devices and shop-floor execution into one digitally controlled material flow—turning inventory accuracy from a periodic reconciliation exercise into a continuous manufacturing discipline."
      }
    ],
    "technologyUsed": "",
    "more": [],
    "comparisonTable": {
      "headers": [
        "From",
        "To"
      ],
      "rows": [
        [
          "Operator-driven movement",
          "System-controlled movement"
        ],
        [
          "Manual routing decisions",
          "MES-driven routing"
        ],
        [
          "Periodic inventory reconciliation",
          "Event-driven inventory control"
        ],
        [
          "Material tracking",
          "Material authorization + tracking"
        ],
        [
          "Process-level traceability",
          "Piece-level traceability"
        ],
        [
          "Bulk processing with traceability gaps",
          "Piece-to-batch-to-piece genealogy"
        ],
        [
          "Manual FIFO",
          "System-guided FIFO"
        ],
        [
          "Variant-specific FG inventory",
          "Common SFG + postponement"
        ],
        [
          "Variance discovered later",
          "Movement controlled at source"
        ],
        [
          "Inventory discrepancy investigation",
          "Movement-level accountability"
        ]
      ]
    }
  },
  "revolutionizing-inventory-optimization": {
    "title": "ABM Case Study link :",
    "breadcrumb": "ABM Case Study link :",
    "tag": "https://identifyyou.in/projects/precision-abm-powered-by-cortex-ai-within-the-snowflake-ai-data-cloud/",
    "docItems": [
      {
        "type": "p",
        "text": "ABM Case Study link :"
      },
      {
        "type": "p",
        "text": "https://identifyyou.in/projects/precision-abm-powered-by-cortex-ai-within-the-snowflake-ai-data-cloud/"
      },
      {
        "type": "p",
        "text": "Inventory Optimization Link:"
      },
      {
        "type": "p",
        "text": "https://identifyyou.in/projects/revolutionizing-inventory-optimization-with-snowflake/"
      },
      {
        "type": "p",
        "text": "Optimizing Shipment and Fleet Operations with Snowflake"
      },
      {
        "type": "p",
        "text": "https://identifyyou.in/projects/optimizing-shipment-and-fleet-operations-with-snowflake/"
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "tailored-enterprise-solutions": {
    "title": "Digital Engineering",
    "breadcrumb": "Digital Engineering",
    "tag": "https://identifyyou.in/tailored-enterprise-solutions/",
    "docItems": [
      {
        "type": "p",
        "text": "Digital Engineering"
      },
      {
        "type": "p",
        "text": "https://identifyyou.in/tailored-enterprise-solutions/"
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "fluke-t40": {
    "title": "Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer",
    "breadcrumb": "Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Industrial Edge Gateway for Fluke Thermalert® T40 Pyrometer"
      },
      {
        "type": "p",
        "text": "In high-stakes industrial environments, a slight temperature deviation can mean the difference between seamless production and costly equipment failure. Our Industrial Edge Gateway, purpose-built for the Fluke Thermalert T40 Pyrometer, transforms raw thermal data into actionable business intelligence."
      },
      {
        "type": "p",
        "text": "Business-First Thermal Intelligence Instead of just monitoring heat, our solution ensures operational continuity. By leveraging high-performance edge computing, the gateway processes data at the source, allowing for instantaneous decision-making without the latency of cloud-only processing."
      },
      {
        "type": "h2",
        "text": "Core Capabilities"
      },
      {
        "type": "h3",
        "text": "➤ High-Performance Edge Computing"
      },
      {
        "type": "p",
        "text": "Move beyond static thresholds with an engine that analyzes real-time thermal patterns and subtle deviations. By identifying irregularities that simple alarms miss, the system flags potential issues in their early stages, allowing your team to intervene before they escalate into critical failures or costly downtime."
      },
      {
        "type": "bullet",
        "text": "Raspberry Pi 4 Model B (64 bit Quad Core Cortex-A72 ARM V8 @ 1.5GHz) Provides the high-speed computational backbone needed to manage heavy data loads and complex 64-bit processing with industrial-grade efficiency."
      },
      {
        "type": "bullet",
        "text": "4GB LPDDR4-3200 SDRAM for robust data processing High-performance memory that ensures smooth, real-time data handling and prevents bottlenecks during peak operational workloads."
      },
      {
        "type": "bullet",
        "text": "64GB Industrial microSDXC (Class 10, A1) storage High-endurance, professional-grade storage built for continuous data logging and long-term reliability in demanding environments."
      },
      {
        "type": "bullet",
        "text": "Optimized for real-time anomaly detection algorithms Custom-engineered software tuned specifically for the hardware to deliver ultra-low latency and immediate recognition of thermal irregularities."
      },
      {
        "type": "h3",
        "text": "➤ Intelligent Anomaly Detection Engine"
      },
      {
        "type": "p",
        "text": "Move beyond static thresholds. Our system identifies real-time thermal patterns and irregularities, flagging potential issues before they escalate into failures."
      },
      {
        "type": "bullet",
        "text": "Customizable Threshold Management"
      },
      {
        "type": "bullet",
        "text": "Advanced signal processing algorithms"
      },
      {
        "type": "h3",
        "text": "➤ Industry-Grade Reliability"
      },
      {
        "type": "p",
        "text": "Built to withstand harsh floor environments, ensuring 24/7 uptime and data integrity where it matters most."
      },
      {
        "type": "bullet",
        "text": "Operating Temperature: -40°C to +85°C"
      },
      {
        "type": "bullet",
        "text": "Designed for harsh industrial environments"
      },
      {
        "type": "bullet",
        "text": "IP65 compatible enclosure options"
      },
      {
        "type": "bullet",
        "text": "24/7 continuous operation capability"
      },
      {
        "type": "h3",
        "text": "➤ Seamless Integration"
      },
      {
        "type": "bullet",
        "text": "Industrial-Grade RS485 interface"
      },
      {
        "type": "bullet",
        "text": "Networkable"
      },
      {
        "type": "bullet",
        "text": "Galvanically isolated communication for noise immunity"
      },
      {
        "type": "bullet",
        "text": "Continuous RS485 polling of T40 temperature data"
      },
      {
        "type": "h3",
        "text": "➤ Instant WhatsApp Alert System"
      },
      {
        "type": "p",
        "text": "Immediate group messaging when thresholds are exceeded. The system instantly sends rich WhatsApp alerts containing:"
      },
      {
        "type": "bullet",
        "text": "Sensor ID & Address"
      },
      {
        "type": "bullet",
        "text": "Current temperature reading"
      },
      {
        "type": "bullet",
        "text": "Threshold setting value"
      },
      {
        "type": "bullet",
        "text": "Timestamp"
      },
      {
        "type": "h3",
        "text": "➤ Seamless Intelligent Connectivity"
      },
      {
        "type": "p",
        "text": "Bridging the gap between OT and IT, the gateway integrates effortlessly with existing infrastructure, ensuring your data is always accessible."
      },
      {
        "type": "bullet",
        "text": "Gigabit Ethernet for high-speed data transmission"
      },
      {
        "type": "bullet",
        "text": "Real-time monitoring via web dashboard"
      },
      {
        "type": "bullet",
        "text": "Local data logging with timestamp synchronization"
      },
      {
        "type": "bullet",
        "text": "Log direct link to the dashboard"
      },
      {
        "type": "p",
        "text": "Any Where, Anytime Visibility"
      },
      {
        "type": "p",
        "text": "We believe information should find the person, not the other way around. Our dual-platform approach ensures you are always in control:"
      },
      {
        "type": "bullet",
        "text": "Desktop Command Centre: For deep-dive analysis and full-scale plant monitoring."
      },
      {
        "type": "bullet",
        "text": "Mobile Pulse: A streamlined mobile version for supervisors on the move."
      },
      {
        "type": "bullet",
        "text": "Instant WhatsApp Alerts: Critical anomalies are pushed directly to your WhatsApp, ensuring the right people are notified the second a threshold is breached."
      },
      {
        "type": "h2",
        "text": "Strategic Impact"
      },
      {
        "type": "bullet",
        "text": "Reduce Unplanned Downtime: Early detection of anomalies allows for predictive maintenance."
      },
      {
        "type": "bullet",
        "text": "Enhanced Safety: Automated alerts for dangerous temperature spikes protect both assets and personnel."
      },
      {
        "type": "bullet",
        "text": "Data-Driven Efficiency: Use historical thermal trends to optimize your manufacturing or processing parameters."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "fluke-tv30": {
    "title": "Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer",
    "breadcrumb": "Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Industrial Edge Gateway for Fluke Thermalert® TV30 Pyrometer"
      },
      {
        "type": "p",
        "text": "In high-stakes industrial environments, a slight temperature deviation can mean the difference between seamless production and costly equipment failure. Our Industrial Edge Gateway, purpose-built for the Fluke Thermalert TV30 Pyrometer, transforms raw thermal data into actionable business intelligence."
      },
      {
        "type": "p",
        "text": "Business-First Thermal Intelligence Instead of just monitoring heat, our solution ensures operational continuity. By leveraging high-performance edge computing, the gateway processes data at the source, allowing for instantaneous decision-making without the latency of cloud-only processing."
      },
      {
        "type": "h2",
        "text": "Core Capabilities"
      },
      {
        "type": "p",
        "text": "High-Performance Edge Computing"
      },
      {
        "type": "p",
        "text": "Move beyond static thresholds with an engine that analyzes real-time thermal patterns and subtle deviations. By identifying irregularities that simple alarms miss, the system flags potential issues in their early stages, allowing your team to intervene before they escalate into critical failures or costly downtime."
      },
      {
        "type": "bullet",
        "text": "Raspberry Pi 4 Model B (64 bit Quad Core Cortex-A72 ARM V8 @ 1.5GHz) Provides the high-speed computational backbone needed to manage heavy data loads and complex 64-bit processing with industrial-grade efficiency."
      },
      {
        "type": "bullet",
        "text": "4GB LPDDR4-3200 SDRAM for robust data processing High-performance memory that ensures smooth, real-time data handling and prevents bottlenecks during peak operational workloads."
      },
      {
        "type": "bullet",
        "text": "64GB Industrial microSDXC (Class 10, A1) storage High-endurance, professional-grade storage built for continuous data logging and long-term reliability in demanding environments."
      },
      {
        "type": "bullet",
        "text": "Optimized for real-time anomaly detection algorithms Custom-engineered software tuned specifically for the hardware to deliver ultra-low latency and immediate recognition of thermal irregularities."
      },
      {
        "type": "p",
        "text": "Intelligent Anomaly Detection Engine"
      },
      {
        "type": "p",
        "text": "Move beyond static thresholds. Our system identifies real-time thermal patterns and irregularities, flagging potential issues before they escalate into failures."
      },
      {
        "type": "bullet",
        "text": "Customizable Threshold Management"
      },
      {
        "type": "bullet",
        "text": "Advanced signal processing algorithms"
      },
      {
        "type": "p",
        "text": "Industry-Grade Reliability"
      },
      {
        "type": "p",
        "text": "Built to withstand harsh floor environments, ensuring 24/7 uptime and data integrity where it matters most."
      },
      {
        "type": "bullet",
        "text": "Operating Temperature: -40°C to +85°C"
      },
      {
        "type": "bullet",
        "text": "Designed for harsh industrial environments"
      },
      {
        "type": "bullet",
        "text": "IP65 compatible enclosure options"
      },
      {
        "type": "bullet",
        "text": "24/7 continuous operation capability"
      },
      {
        "type": "p",
        "text": "Seamless Integration"
      },
      {
        "type": "bullet",
        "text": "Industrial-Grade RS485 interface"
      },
      {
        "type": "bullet",
        "text": "Networkable"
      },
      {
        "type": "bullet",
        "text": "Galvanically isolated communication for noise immunity"
      },
      {
        "type": "bullet",
        "text": "Continuous RS485 polling of TV30 temperature data"
      },
      {
        "type": "p",
        "text": "Instant WhatsApp Alert System"
      },
      {
        "type": "p",
        "text": "Immediate group messaging when thresholds are exceeded. The system instantly sends rich WhatsApp alerts containing:"
      },
      {
        "type": "bullet",
        "text": "Sensor ID & Address"
      },
      {
        "type": "bullet",
        "text": "Current temperature reading"
      },
      {
        "type": "bullet",
        "text": "Threshold setting value"
      },
      {
        "type": "bullet",
        "text": "Timestamp"
      },
      {
        "type": "p",
        "text": "Seamless Intelligent Connectivity"
      },
      {
        "type": "p",
        "text": "Bridging the gap between OT and IT, the gateway integrates effortlessly with existing infrastructure, ensuring your data is always accessible."
      },
      {
        "type": "bullet",
        "text": "Gigabit Ethernet for high-speed data transmission"
      },
      {
        "type": "bullet",
        "text": "Real-time monitoring via web dashboard"
      },
      {
        "type": "bullet",
        "text": "Local data logging with timestamp synchronization"
      },
      {
        "type": "bullet",
        "text": "Log direct link to the dashboard"
      },
      {
        "type": "p",
        "text": "Any Where, Anytime Visibility"
      },
      {
        "type": "p",
        "text": "We believe information should find the person, not the other way around. Our dual-platform approach ensures you are always in control:"
      },
      {
        "type": "bullet",
        "text": "Desktop Command Centre: For deep-dive analysis and full-scale plant monitoring."
      },
      {
        "type": "bullet",
        "text": "Mobile Pulse: A streamlined mobile version for supervisors on the move."
      },
      {
        "type": "bullet",
        "text": "Instant WhatsApp Alerts: Critical anomalies are pushed directly to your WhatsApp, ensuring the right people are notified the second a threshold is breached."
      },
      {
        "type": "h2",
        "text": "Strategic Impact"
      },
      {
        "type": "bullet",
        "text": "Reduce Unplanned Downtime: Early detection of anomalies allows for predictive maintenance."
      },
      {
        "type": "bullet",
        "text": "Enhanced Safety: Automated alerts for dangerous temperature spikes protect both assets and personnel."
      },
      {
        "type": "bullet",
        "text": "Data-Driven Efficiency: Use historical thermal trends to optimize your manufacturing or processing parameters."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "industrial-edge-device-engineering": {
    "title": "Industrial Edge Device Engineering",
    "breadcrumb": "Industrial Edge Device Engineering",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Industrial Edge Device Engineering"
      },
      {
        "type": "p",
        "text": "Engineering the Hardware Foundation for the Intelligent Edge"
      },
      {
        "type": "p",
        "text": "Building a secure, high-performance and extensible Edge platform for the connected world"
      },
      {
        "type": "p",
        "text": "Industrial environments contain machines, sensors, controllers and systems built across different generations of technology. Connecting them reliably requires more than a conventional gateway. The Edge platform must communicate across protocols, process data locally, operate despite intermittent connectivity, protect devices and data, and provide sufficient computing capability for future AI workloads."
      },
      {
        "type": "p",
        "text": "IdentifYou engineered a next-generation Industrial Edge Device designed to bring connectivity, computing, storage and security together in a single extensible platform."
      },
      {
        "type": "h2",
        "text": "The Challenge"
      },
      {
        "type": "p",
        "text": "Traditional industrial gateways are often limited by restricted protocol support, network dependency, basic processing capability and limited device-management features."
      },
      {
        "type": "p",
        "text": "The objective was to create an Edge platform capable of acting as a secure computing layer between the physical and digital worlds — connecting industrial assets while locally processing, storing and securing operational data."
      },
      {
        "type": "h2",
        "text": "The Solution"
      },
      {
        "type": "p",
        "text": "A Full-Stack Industrial Edge Device"
      },
      {
        "type": "p",
        "text": "The platform is engineered around five core capabilities:"
      },
      {
        "type": "p",
        "text": "Connect → Compute → Store → Secure → Extend"
      },
      {
        "type": "p",
        "text": "Connect — Universal Industrial Connectivity"
      },
      {
        "type": "p",
        "text": "The device is designed to communicate with diverse industrial equipment, sensors, controllers and enterprise systems."
      },
      {
        "type": "p",
        "text": "Protocols: OPC UA, MQTT, Modbus TCP, Modbus RTU, HTTP, HTTPS, REST APIs, TCP/IP, UDP, WebSocket, Serial, CAN"
      },
      {
        "type": "p",
        "text": "Ports & Interfaces: Gigabit Ethernet, 10Gb Ethernet, USB 2.0, USB 3.0, USB-C, RS-232, RS-485, CAN, Digital I/O, GPIO, HDMI, M.2, PCIe, SIM/eSIM, SD/microSD"
      },
      {
        "type": "p",
        "text": "Wireless: Wi-Fi, Bluetooth, BLE, 4G LTE, 5G, Cellular, GNSS, GPS, LoRaWAN, Zigbee, Thread"
      },
      {
        "type": "p",
        "text": "This broad connectivity foundation enables the platform to integrate with both modern and legacy industrial environments."
      },
      {
        "type": "p",
        "text": "Compute — Processing at the Edge"
      },
      {
        "type": "p",
        "text": "Instead of transmitting every data point to centralized systems, the Edge Device can process, filter, transform and analyze information locally."
      },
      {
        "type": "p",
        "text": "Compute: Multi-core CPU, ARM, x86, GPU, AI Accelerator, NPU, Real-Time Processing, Parallel Processing, Event Processing, Local Analytics, AI Inference"
      },
      {
        "type": "p",
        "text": "This enables faster response, reduced network dependency and support for computationally intensive Edge applications."
      },
      {
        "type": "p",
        "text": "Store — Resilient Local Data"
      },
      {
        "type": "p",
        "text": "Industrial connectivity can be intermittent. Local storage enables the device to continue collecting and retaining important information until connectivity is restored."
      },
      {
        "type": "p",
        "text": "Storage: eMMC, SSD, NVMe SSD, SD Card, Industrial Flash, Local Database, Time-Series Data, Event Buffering, Caching, Store-and-Forward"
      },
      {
        "type": "p",
        "text": "This provides resilience against temporary network outages while maintaining data continuity."
      },
      {
        "type": "p",
        "text": "Secure — Security by Design"
      },
      {
        "type": "p",
        "text": "Security is incorporated from the hardware layer through device communication, applications and remote management."
      },
      {
        "type": "p",
        "text": "Security: Secure Boot, TPM, Hardware Root of Trust, Device Identity, Firmware Signing, Encryption at Rest, TLS, HTTPS, Certificate Authentication, PKI, RBAC, MFA, Application Isolation, Firewall, VPN, Network Segmentation, Secure OTA Updates, Audit Logging"
      },
      {
        "type": "p",
        "text": "The architecture establishes a trusted foundation for deploying Edge infrastructure across distributed environments."
      },
      {
        "type": "p",
        "text": "Extend — From Gateway to Computing Platform"
      },
      {
        "type": "p",
        "text": "The device is designed to support modern operating systems, applications and containerized workloads."
      },
      {
        "type": "p",
        "text": "OS & Runtime: Linux, Ubuntu, Yocto Linux, Debian, Windows IoT, Android, Docker, Kubernetes, K3s"
      },
      {
        "type": "p",
        "text": "Software: Python, C, C++, Java, Node.js, REST APIs, MQTT Client, OPC UA Client, Database Connectors, API Gateway, Message Broker, Rules Engine, Workflow Engine, Containers, Microservices"
      },
      {
        "type": "p",
        "text": "This allows the same hardware foundation to evolve as application requirements change."
      },
      {
        "type": "p",
        "text": "Edge AI Ready"
      },
      {
        "type": "p",
        "text": "The computing architecture is designed to support AI workloads directly at the edge, reducing the need to continuously transfer raw data to the cloud."
      },
      {
        "type": "p",
        "text": "Edge AI: Computer Vision, Machine Learning, Deep Learning, Neural Networks, AI Inference, TensorFlow Lite, ONNX Runtime, OpenVINO, CUDA, TensorRT, GPU/NPU Acceleration, Anomaly Detection, Classification, Object Detection, Predictive Analytics"
      },
      {
        "type": "p",
        "text": "This creates a foundation for intelligent inspection, anomaly detection, predictive applications and real-time decision-making."
      },
      {
        "type": "p",
        "text": "Enterprise & Cloud Connectivity"
      },
      {
        "type": "p",
        "text": "The Edge Device operates as part of a larger digital ecosystem rather than as an isolated gateway."
      },
      {
        "type": "p",
        "text": "Integration: SAP, Microsoft Azure, AWS, Microsoft Power Platform, REST APIs, GraphQL, Webhooks, SQL, PostgreSQL, MySQL, SQL Server, Data Lakes, Data Warehouses, Cloud Storage, Message Queues"
      },
      {
        "type": "p",
        "text": "This enables operational data to flow securely from physical assets to enterprise applications, analytics platforms and cloud services."
      },
      {
        "type": "p",
        "text": "Manage Every Device Remotely"
      },
      {
        "type": "p",
        "text": "For distributed deployments, centralized management is essential."
      },
      {
        "type": "p",
        "text": "Device Management: Provisioning, Remote Configuration, Remote Monitoring, OTA Firmware Updates, OTA Application Updates, Certificate Management, Health Monitoring, Application Monitoring, Log Management, Diagnostics, Fleet Management"
      },
      {
        "type": "p",
        "text": "Observability: CPU, Memory, Storage, Network, Application Health, Protocol Connectivity, Device Health, System Logs, Application Logs, Errors, Metrics, Health Checks, Alerts, Telemetry"
      },
      {
        "type": "p",
        "text": "Organizations can therefore manage an Edge fleet as a unified infrastructure rather than as individual devices."
      },
      {
        "type": "p",
        "text": "Engineering Outcome"
      },
      {
        "type": "p",
        "text": "The Industrial Edge Device transforms the traditional gateway into a secure, extensible computing platform capable of:"
      },
      {
        "type": "p",
        "text": "Universal Connectivity — connecting diverse industrial equipment and protocols."
      },
      {
        "type": "p",
        "text": "Local Intelligence — processing, analyzing and acting on data closer to its source."
      },
      {
        "type": "p",
        "text": "Data Resilience — maintaining operational data through buffering and store-and-forward."
      },
      {
        "type": "p",
        "text": "Security by Design — protecting hardware, applications, communication and data."
      },
      {
        "type": "p",
        "text": "Edge AI Readiness — supporting computer vision, ML and AI inference."
      },
      {
        "type": "p",
        "text": "Enterprise Integration — connecting physical operations with ERP, analytics and cloud platforms."
      },
      {
        "type": "p",
        "text": "Fleet Management — remotely managing configuration, updates, health and diagnostics."
      },
      {
        "type": "p",
        "text": "Why IdentifYou"
      },
      {
        "type": "p",
        "text": "IdentifYou brings together industrial connectivity, embedded systems, hardware architecture, software engineering, data engineering, cloud integration and AI to build sophisticated Edge platforms."
      },
      {
        "type": "h2",
        "text": "The result is not simply a device that collects and forwards data."
      },
      {
        "type": "p",
        "text": "It is a computing foundation designed to connect, process, secure, store and intelligently act on data at the edge."
      },
      {
        "type": "p",
        "text": "Gateway → Connected Edge → Intelligent Edge"
      },
      {
        "type": "p",
        "text": "IdentifYou engineers the hardware foundation for the intelligent edge."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "industrial-edge-intelligence": {
    "title": "Edge Intelligence & Software Platform",
    "breadcrumb": "Edge Intelligence & Software Platform",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Edge Intelligence & Software Platform"
      },
      {
        "type": "p",
        "text": "Turning Connected Edge Devices into Intelligent Computing Platforms"
      },
      {
        "type": "p",
        "text": "Building the software layer for real-time data processing, Edge AI, application execution and enterprise integration"
      },
      {
        "type": "p",
        "text": "Connecting machines and devices is only the beginning. The real value of Edge computing comes from what happens after data is collected — how it is processed, analyzed, stored, acted upon and integrated with enterprise systems."
      },
      {
        "type": "p",
        "text": "IdentifYou engineered an Edge Intelligence & Software Platform that transforms an industrial Edge Device from a connectivity gateway into an intelligent computing node."
      },
      {
        "type": "p",
        "text": "The platform provides the software foundation to run applications locally, process streaming data, execute AI models, manage workloads, maintain data continuity and securely connect the Edge with enterprise and cloud platforms."
      },
      {
        "type": "h2",
        "text": "The Challenge"
      },
      {
        "type": "p",
        "text": "Sending all operational data to centralized systems creates latency, bandwidth dependency and limited responsiveness."
      },
      {
        "type": "p",
        "text": "At the same time, distributed Edge devices introduce another challenge: applications, AI models, configurations, data and security policies must be managed consistently across potentially hundreds or thousands of devices."
      },
      {
        "type": "p",
        "text": "The objective was to create a software platform that could process data locally, run intelligent applications, operate independently when required and remain centrally manageable."
      },
      {
        "type": "h2",
        "text": "The Solution"
      },
      {
        "type": "p",
        "text": "An Intelligent Software Layer at the Edge"
      },
      {
        "type": "p",
        "text": "The platform is designed around six capabilities:"
      },
      {
        "type": "p",
        "text": "Ingest → Process → Store → Analyse → Act → Integrate"
      },
      {
        "type": "p",
        "text": "Ingest — Bring Data Together"
      },
      {
        "type": "p",
        "text": "The platform collects data from machines, sensors, controllers, cameras and external systems through multiple protocols and interfaces."
      },
      {
        "type": "p",
        "text": "Connectivity"
      },
      {
        "type": "p",
        "text": "OPC UA, MQTT, Modbus TCP, Modbus RTU, HTTP, HTTPS, REST APIs, TCP/IP, UDP, WebSocket, Serial, CAN"
      },
      {
        "type": "p",
        "text": "Data can be normalized into a common structure before being consumed by downstream applications."
      },
      {
        "type": "p",
        "text": "Process — Turn Raw Data into Operational Data"
      },
      {
        "type": "p",
        "text": "Instead of forwarding raw data, the Edge platform can perform local processing, filtering, transformation, aggregation and event detection."
      },
      {
        "type": "p",
        "text": "Data Processing"
      },
      {
        "type": "p",
        "text": "Data Normalization, Filtering, Transformation, Aggregation, Event Processing, Rules Engine, Stream Processing, Real-Time Analytics, Data Validation, Data Enrichment"
      },
      {
        "type": "p",
        "text": "This reduces unnecessary data movement while enabling applications to respond closer to the point where events occur."
      },
      {
        "type": "p",
        "text": "Store — Create a Local Data Layer"
      },
      {
        "type": "p",
        "text": "The Edge platform maintains a local data layer to support temporary disconnection, high-frequency data and application requirements."
      },
      {
        "type": "p",
        "text": "Data Layer"
      },
      {
        "type": "p",
        "text": "Local Database, Time-Series Database, Event Store, Caching, Data Buffering, Store-and-Forward, Data Retention, Data Synchronization"
      },
      {
        "type": "p",
        "text": "Operational data can continue to be captured locally and synchronized with enterprise or cloud systems when connectivity becomes available."
      },
      {
        "type": "p",
        "text": "Analyze — Bring Intelligence to the Edge"
      },
      {
        "type": "p",
        "text": "The platform provides a foundation for running analytics and AI workloads directly on Edge devices."
      },
      {
        "type": "p",
        "text": "AI & Analytics"
      },
      {
        "type": "p",
        "text": "Machine Learning, Deep Learning, Computer Vision, Neural Networks, Anomaly Detection, Object Detection, Classification, Predictive Analytics, Pattern Recognition, AI Inference"
      },
      {
        "type": "p",
        "text": "AI Runtime"
      },
      {
        "type": "p",
        "text": "ONNX Runtime, TensorFlow Lite, OpenVINO, CUDA, TensorRT, GPU Acceleration, NPU Acceleration"
      },
      {
        "type": "p",
        "text": "This enables applications to make decisions locally without depending on continuous cloud connectivity."
      },
      {
        "type": "p",
        "text": "Act — From Insight to Action"
      },
      {
        "type": "p",
        "text": "Edge intelligence becomes valuable when insights can trigger actions."
      },
      {
        "type": "p",
        "text": "The platform can support event-driven applications, rules and workflows that respond to operational conditions in near real time."
      },
      {
        "type": "p",
        "text": "Application Capabilities"
      },
      {
        "type": "p",
        "text": "Rules Engine, Workflow Engine, Event Triggers, Alerts, Notifications, API Calls, Command Execution, Local Decision Logic, Automation Workflows"
      },
      {
        "type": "p",
        "text": "This creates a closed-loop architecture:"
      },
      {
        "type": "p",
        "text": "Sense → Process → Understand → Decide → Act"
      },
      {
        "type": "p",
        "text": "Application Runtime"
      },
      {
        "type": "p",
        "text": "Run Multiple Workloads on the Same Edge Platform"
      },
      {
        "type": "p",
        "text": "The platform is designed to support independent applications and services without tightly coupling them to the underlying hardware."
      },
      {
        "type": "p",
        "text": "Runtime"
      },
      {
        "type": "p",
        "text": "Linux, Ubuntu, Yocto Linux, Docker, Kubernetes, K3s, Containers, Microservices"
      },
      {
        "type": "p",
        "text": "Development"
      },
      {
        "type": "p",
        "text": "Python, C, C++, Java, Node.js, REST APIs, MQTT Client, OPC UA Client, SQL, Database Connectors"
      },
      {
        "type": "p",
        "text": "Containerized workloads allow applications to be deployed, updated and scaled independently while maintaining application isolation."
      },
      {
        "type": "p",
        "text": "Enterprise & Cloud Integration"
      },
      {
        "type": "p",
        "text": "The Edge should not become another data silo."
      },
      {
        "type": "p",
        "text": "The platform provides APIs and integration capabilities to connect operational data with enterprise applications, analytics platforms and cloud services."
      },
      {
        "type": "p",
        "text": "Integration"
      },
      {
        "type": "p",
        "text": "SAP, Microsoft Azure, AWS, Microsoft Power Platform, REST APIs, GraphQL, Webhooks, SQL, PostgreSQL, MySQL, SQL Server, Data Lakes, Data Warehouses, Cloud Storage, Message Queues"
      },
      {
        "type": "p",
        "text": "This creates a continuous digital path:"
      },
      {
        "type": "p",
        "text": "Physical Assets → Edge → Enterprise → Cloud → Analytics → Business Decisions"
      },
      {
        "type": "p",
        "text": "Security Across the Software Stack"
      },
      {
        "type": "p",
        "text": "Security extends beyond the physical device into applications, data and communications."
      },
      {
        "type": "p",
        "text": "Application Security"
      },
      {
        "type": "p",
        "text": "Application Isolation, Role-Based Access Control, Authentication, Authorization, Secure APIs"
      },
      {
        "type": "p",
        "text": "Data Security"
      },
      {
        "type": "p",
        "text": "Encryption at Rest, Encryption in Transit, TLS, HTTPS, Certificate Authentication, PKI"
      },
      {
        "type": "p",
        "text": "Platform Security"
      },
      {
        "type": "p",
        "text": "Secure Application Deployment, Signed Packages, Secure OTA Updates, Audit Logging, Security Policies"
      },
      {
        "type": "p",
        "text": "The platform is designed to provide controlled and trusted execution of applications across distributed Edge environments."
      },
      {
        "type": "p",
        "text": "Centralized Edge Management"
      },
      {
        "type": "p",
        "text": "Managing intelligent Edge infrastructure requires visibility and control across the complete device fleet."
      },
      {
        "type": "p",
        "text": "Fleet Management"
      },
      {
        "type": "p",
        "text": "Device Provisioning, Remote Configuration, Application Deployment, Application Updates, OTA Updates, Certificate Management, Device Monitoring, Application Monitoring, Remote Diagnostics, Log Management"
      },
      {
        "type": "p",
        "text": "Observability"
      },
      {
        "type": "p",
        "text": "CPU, Memory, Storage, Network, Application Health, Protocol Connectivity, Device Health, System Logs, Application Logs, Metrics, Errors, Alerts, Telemetry"
      },
      {
        "type": "p",
        "text": "Operations teams can centrally monitor and manage distributed Edge workloads without physically accessing every device."
      },
      {
        "type": "p",
        "text": "From Device to Distributed Intelligence"
      },
      {
        "type": "p",
        "text": "The platform establishes a distributed computing architecture in which intelligence can exist at multiple levels."
      },
      {
        "type": "p",
        "text": "Device EdgeData acquisition, protocol connectivity, local control"
      },
      {
        "type": "p",
        "text": "↓"
      },
      {
        "type": "p",
        "text": "Intelligent EdgeData processing, analytics, AI inference, event detection"
      },
      {
        "type": "p",
        "text": "↓"
      },
      {
        "type": "p",
        "text": "Enterprise & CloudCentralized analytics, data engineering, enterprise workflows, AI/ML platforms"
      },
      {
        "type": "p",
        "text": "This architecture allows organizations to decide where data should be processed and where decisions should be made based on latency, security, bandwidth and business requirements."
      },
      {
        "type": "p",
        "text": "Engineering Outcome"
      },
      {
        "type": "p",
        "text": "The Edge Intelligence Platform transforms connected hardware into an intelligent software-defined computing environment."
      },
      {
        "type": "p",
        "text": "Real-Time Processing — Analyze operational data closer to its source."
      },
      {
        "type": "p",
        "text": "Edge AI — Run AI inference without continuously sending raw data to the cloud."
      },
      {
        "type": "p",
        "text": "Data Resilience — Continue operating through temporary connectivity interruptions."
      },
      {
        "type": "p",
        "text": "Application Flexibility — Deploy containerized applications and microservices on the Edge."
      },
      {
        "type": "p",
        "text": "Event-Driven Intelligence — Convert data and events into automated actions."
      },
      {
        "type": "p",
        "text": "Enterprise Integration — Connect Edge operations with ERP, cloud and analytics platforms."
      },
      {
        "type": "p",
        "text": "Centralized Management — Monitor, update and manage distributed Edge workloads remotely."
      },
      {
        "type": "p",
        "text": "Scalable Architecture — Establish a common software foundation across multiple Edge deployments."
      },
      {
        "type": "p",
        "text": "Why IdentifYou"
      },
      {
        "type": "p",
        "text": "IdentifYou combines Edge engineering, software development, data engineering, cloud platforms and AI to create intelligent software layers for connected environments."
      },
      {
        "type": "p",
        "text": "Our approach moves beyond simply collecting industrial data."
      },
      {
        "type": "p",
        "text": "We help organizations build Edge platforms that can understand data, make decisions and trigger actions closer to where the data is generated."
      },
      {
        "type": "p",
        "text": "Connect → Process → Understand → Decide → Act"
      },
      {
        "type": "p",
        "text": "IdentifYou turns connected Edge devices into intelligent computing platforms."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "towards-zero-inventory-variance-automation": {
    "title": "Towards Zero Inventory Variance",
    "breadcrumb": "Towards Zero Inventory Variance",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Towards Zero Inventory Variance"
      },
      {
        "type": "p",
        "text": "Digitally Controlled Material Execution"
      },
      {
        "type": "p",
        "text": "Industry: Automotive Component ManufacturingFocus: Inventory Accuracy • WIP Control • Material Traceability • Production ExecutionSolution: MES • RFID • Edge Devices • Industrial Handhelds • Digital Material Control"
      },
      {
        "type": "p",
        "text": "Problem Statement"
      },
      {
        "type": "p",
        "text": "Inventory Variance Was a Symptom of Uncontrolled Material Movement"
      },
      {
        "type": "p",
        "text": "In a complex discrete manufacturing environment, material continuously moves across raw material stores, production processes, WIP locations, SFG stages and final operations."
      },
      {
        "type": "p",
        "text": "With multiple products following different and sometimes non-linear routings, material can move across several process modules before becoming a finished good. Bulk-processing operations such as chemical treatment and postponement-based SFG inventory add further complexity."
      },
      {
        "type": "p",
        "text": "When physical material movement and digital inventory transactions are not synchronized, small gaps in identification, movement recording and production-order association can accumulate into significant inventory variance."
      },
      {
        "type": "p",
        "text": "Business Objective"
      },
      {
        "type": "p",
        "text": "Create a digitally controlled material flow where every movement is authorized, every piece remains traceable and every inventory transaction is accountable—driving Inventory Variance towards Zero."
      },
      {
        "type": "p",
        "text": "Challenges in the Current Process"
      },
      {
        "type": "p",
        "text": "Where Inventory Variance Begins"
      },
      {
        "type": "p",
        "text": "Complex RoutingDifferent finished goods follow different routes, making it difficult to manually determine whether material is at the right location, for the right production order and ready for the right operation."
      },
      {
        "type": "p",
        "text": "Operator-Dependent MovementMaterial movement and routing decisions can depend heavily on operator knowledge and manual transactions, creating opportunities for incorrect movements."
      },
      {
        "type": "p",
        "text": "Bulk ProcessingProcesses such as chemical treatment require multiple pieces to be processed together, making piece-level identity difficult to maintain."
      },
      {
        "type": "p",
        "text": "FIFO ManagementFIFO can become dependent on manual identification and operator discipline when multiple lots or production orders are waiting for the same process."
      },
      {
        "type": "p",
        "text": "Postponement & SFGCommon SFG inventory improves flexibility, but requires precise visibility of what SFG exists, where it is located and which production requirement it can fulfil."
      },
      {
        "type": "p",
        "text": "Delayed Variance DetectionWhen movement is not controlled at the point of execution, discrepancies are often discovered only during periodic reconciliation—making the source difficult to identify."
      },
      {
        "type": "h2",
        "text": "03 — Proposed Solution"
      },
      {
        "type": "p",
        "text": "A Digital Intelligence & Control Layer Around Existing Machines"
      },
      {
        "type": "p",
        "text": "Instead of replacing legacy machines, IdentifYou introduces a digitally interlocked material execution layer that connects the existing shop floor with MES, RFID, industrial handhelds and edge devices."
      },
      {
        "type": "p",
        "text": "The MES understands the production order, routing, material identity, process status and destination."
      },
      {
        "type": "p",
        "text": "When movement is required:"
      },
      {
        "type": "p",
        "text": "MES decides → Device instructs → RFID identifies → System validates → Material moves → Movement is confirmed → Inventory is updated"
      },
      {
        "type": "p",
        "text": "Before material is allowed to move, the system validates:"
      },
      {
        "type": "bullet",
        "text": "Material identity"
      },
      {
        "type": "bullet",
        "text": "Production order"
      },
      {
        "type": "bullet",
        "text": "Current location"
      },
      {
        "type": "bullet",
        "text": "Process status"
      },
      {
        "type": "bullet",
        "text": "Routing"
      },
      {
        "type": "bullet",
        "text": "Intended destination"
      },
      {
        "type": "p",
        "text": "Only an authorized movement is permitted."
      },
      {
        "type": "p",
        "text": "This changes material movement from a manual activity into a digitally controlled manufacturing execution event."
      },
      {
        "type": "p",
        "text": "Designed for Legacy Manufacturing Environments"
      },
      {
        "type": "h2",
        "text": "The solution does not require the plant to replace its existing production machines."
      },
      {
        "type": "p",
        "text": "Legacy Machines + Digital Edge + RFID + MES = Connected Manufacturing Execution"
      },
      {
        "type": "p",
        "text": "This enables manufacturers to digitally transform material flow while protecting existing machine investments and minimizing disruption to production."
      },
      {
        "type": "h2",
        "text": "04 — How It Drives Inventory Variance Towards Zero"
      },
      {
        "type": "p",
        "text": "Control the Event That Creates the Variance"
      },
      {
        "type": "p",
        "text": "Inventory accuracy is engineered into the material movement process rather than checked only during periodic reconciliation."
      },
      {
        "type": "p",
        "text": "Every critical inventory-changing movement follows a controlled cycle:"
      },
      {
        "type": "p",
        "text": "Identify → Validate → Authorize → Execute → Confirm → Update"
      },
      {
        "type": "p",
        "text": "IdentifyRFID readers, handheld scanners, or connected devices digitally identify the material, pallet, batch, or container at the point of movement."
      },
      {
        "type": "p",
        "text": "ValidateThe MES validates the identified material against its production order, routing, current process status, quantity, and intended destination to ensure that the movement is correct."
      },
      {
        "type": "p",
        "text": "AuthorizeThe system determines whether the movement is permitted. Only a valid, authorized material movement can proceed, preventing incorrect material, process, or destination movements."
      },
      {
        "type": "p",
        "text": "ExecuteThe operator physically moves the material based on the digitally validated instruction, while the connected edge device captures the execution event."
      },
      {
        "type": "p",
        "text": "ConfirmThe completed movement is digitally confirmed, creating a reliable transaction record linking the material, production order, process, location, and timestamp."
      },
      {
        "type": "p",
        "text": "UpdateThe MES immediately updates the material's digital position and status, accurately reflecting whether it is in WIP, SFG, FG, or inventory."
      },
      {
        "type": "h2",
        "text": "The result is a continuous relationship between:"
      },
      {
        "type": "p",
        "text": "Physical Material Position ↔ Digital Inventory Position"
      },
      {
        "type": "p",
        "text": "This enables the plant to prevent wrong movements at source, rather than discovering them later during reconciliation."
      },
      {
        "type": "h2",
        "text": "Built-In Manufacturing Controls"
      },
      {
        "type": "p",
        "text": "Production-Order-Based MovementMaterial is routed according to the production order and defined process sequence."
      },
      {
        "type": "p",
        "text": "Digital InterlockingWrong material, wrong location, wrong process or wrong production order can be blocked before movement."
      },
      {
        "type": "p",
        "text": "Piece-to-Batch-to-Piece TraceabilityBulk processes maintain the relationship between individual pieces, processing batch, production order and subsequent pieces."
      },
      {
        "type": "p",
        "text": "System-Guided FIFOFIFO becomes part of execution logic rather than depending entirely on manual practice."
      },
      {
        "type": "p",
        "text": "Postponement & Common SFGCommon SFG can be held at the appropriate decoupling point and converted into the required Finished Goods based on actual demand."
      },
      {
        "type": "h2",
        "text": "05 — Outcomes"
      },
      {
        "type": "p",
        "text": "From Inventory Reconciliation to Inventory Accountability"
      },
      {
        "type": "p",
        "text": "Reduced Inventory VarianceControl material movement at the point of execution by validating every transfer against the production order, process, quantity, and destination—reducing the root causes of unexplained inventory differences."
      },
      {
        "type": "p",
        "text": "Real-Time WIP VisibilityMaintain a continuously updated digital view of material across production stages, showing where the material is physically located, what process it is in, its quantity, and which production order it belongs to."
      },
      {
        "type": "p",
        "text": "Wrong-Material Movement PreventionPrevent incorrect or unauthorized material movements before they occur by digitally validating the material identity, production order, routing, process status, and intended destination."
      },
      {
        "type": "p",
        "text": "Improved Inventory AccuracyKeep physical material movement synchronized with digital inventory transactions, ensuring that every confirmed movement is immediately reflected in the corresponding WIP, SFG, FG, or inventory position."
      },
      {
        "type": "p",
        "text": "Complete Material GenealogyCreate an end-to-end digital history of material movement across piece-level and bulk-processing operations, maintaining traceability from the original material through production, inspection, and finished goods."
      },
      {
        "type": "p",
        "text": "Lower Variant-Specific InventoryEnable postponement strategies and common SFG inventory without losing material control or traceability, allowing production to respond more flexibly to demand while reducing the need to hold variant-specific finished inventory."
      },
      {
        "type": "p",
        "text": "Stronger AccountabilityCreate a digital transaction trail for every material movement, making it possible to trace discrepancies back to the material, production order, process, location, movement, and execution event responsible."
      },
      {
        "type": "h2",
        "text": "06 — Value Proposition"
      },
      {
        "type": "p",
        "text": "Digitally Transform the Plant Without Replacing the Plant"
      },
      {
        "type": "p",
        "text": "IdentifYou combines MES, RFID, edge computing, industrial devices and manufacturing domain intelligence to create a digital control layer around existing production infrastructure."
      },
      {
        "type": "h2",
        "text": "The transformation is not about replacing legacy machines."
      },
      {
        "type": "p",
        "text": "It is about making them part of a connected, controlled and traceable manufacturing ecosystem."
      },
      {
        "type": "p",
        "text": "Legacy Machines → Digital Connectivity → Controlled Material Flow → Real-Time Inventory Accountability"
      },
      {
        "type": "p",
        "text": "Every Piece. Every Movement. Every Order. Accounted For."
      },
      {
        "type": "p",
        "text": "Towards Zero Inventory Variance"
      },
      {
        "type": "p",
        "text": "IdentifYou enables manufacturers to move from periodic inventory reconciliation to continuous inventory accountability—while extending the digital capabilities of their existing plant infrastructure."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "advanced-vision-inspection-surface": {
    "title": "Advanced Vision Inspection for Surface & Edge Integrity",
    "breadcrumb": "Advanced Vision Inspection for Surface & Edge Integrity",
    "tag": "Industry: Automotive & Industrial ComponentsApplication: Machined / Forged Component Surface InspectionTechnology: 2D Vision + Controlled Illumination + Vision AI",
    "docItems": [
      {
        "type": "p",
        "text": "Advanced Vision Inspection for Surface & Edge Integrity"
      },
      {
        "type": "p",
        "text": "Industry: Automotive & Industrial ComponentsApplication: Machined / Forged Component Surface InspectionTechnology: 2D Vision + Controlled Illumination + Vision AI"
      },
      {
        "type": "h2",
        "text": "THE CHALLENGE"
      },
      {
        "type": "p",
        "text": "Detecting Small Defects on Complex Metal Surfaces"
      },
      {
        "type": "p",
        "text": "Machined and forged components can develop surface and edge defects that are difficult to detect consistently through conventional visual inspection. Metallic reflections, varying surface finishes, complex geometries and small defect sizes can make defects appear differently under changing lighting and viewing conditions."
      },
      {
        "type": "p",
        "text": "The inspection system needed to identify critical defects such as surface marks, scratches, dents, burrs, edge damage and machining abnormalities, while maintaining consistent detection across different component variants."
      },
      {
        "type": "h2",
        "text": "THE SOLUTION"
      },
      {
        "type": "p",
        "text": "Intelligent 2D Vision for Surface & Edge Inspection"
      },
      {
        "type": "p",
        "text": "IdentifYou implemented a high-resolution 2D vision system with controlled illumination and Vision AI to capture and analyze critical surface and edge regions."
      },
      {
        "type": "p",
        "text": "High-Resolution 2D Vision — Defect Detection"
      },
      {
        "type": "p",
        "text": "The high-resolution camera system captures detailed images of critical component surfaces and edges, enabling the inspection system to identify defects such as scratches, dents, burrs, edge damage, machining marks and other surface abnormalities. Where complex component geometry creates blind spots, multiple camera views and inspection angles are used to provide comprehensive coverage of critical surfaces and edges that cannot be reliably inspected from a single viewpoint."
      },
      {
        "type": "p",
        "text": "Controlled Lighting — Making Defects Visible"
      },
      {
        "type": "p",
        "text": "Because machined metal surfaces can produce significant glare and reflections, illumination becomes a critical part of the inspection system."
      },
      {
        "type": "p",
        "text": "Optimized diffused / directional lighting enhances defect contrast while reducing unwanted reflections, shadows and background variations."
      },
      {
        "type": "p",
        "text": "This helps expose subtle surface abnormalities that may otherwise blend into the component surface."
      },
      {
        "type": "p",
        "text": "Vision AI — Distinguishing Defects from Surface Variation"
      },
      {
        "type": "p",
        "text": "Vision AI analyzes the captured images to distinguish actual manufacturing defects from normal variations in surface texture, machining patterns and component appearance."
      },
      {
        "type": "p",
        "text": "The inspection logic evaluates the relevant surface regions and generates an automated:"
      },
      {
        "type": "p",
        "text": "PASS / FAIL Decision"
      },
      {
        "type": "p",
        "text": "BUILT FOR PRODUCTION VARIABILITY"
      },
      {
        "type": "p",
        "text": "The inspection system is designed to accommodate variations across component variants, including differences in surface finish, component geometry, critical inspection areas and defect acceptance criteria. A recipe-driven inspection architecture enables the appropriate camera views, inspection parameters and defect thresholds to be configured for each variant, ensuring consistent surface and edge inspection as the product mix evolves."
      },
      {
        "type": "h2",
        "text": "THE OUTCOME"
      },
      {
        "type": "p",
        "text": "Consistent Surface Inspection"
      },
      {
        "type": "p",
        "text": "Automated detection of critical surface and edge defects."
      },
      {
        "type": "p",
        "text": "Improved Defect Visibility"
      },
      {
        "type": "p",
        "text": "Controlled illumination reveals subtle abnormalities on reflective metal surfaces."
      },
      {
        "type": "p",
        "text": "Reduced Subjectivity"
      },
      {
        "type": "p",
        "text": "Consistent machine-based inspection replaces variation associated with manual visual inspection."
      },
      {
        "type": "p",
        "text": "Variant-Ready"
      },
      {
        "type": "p",
        "text": "Configurable inspection recipes support different component geometries and surface conditions."
      },
      {
        "type": "p",
        "text": "Digital Quality Evidence"
      },
      {
        "type": "p",
        "text": "Inspection images and defect classifications provide evidence for every inspection decision."
      },
      {
        "type": "p",
        "text": "From Visual Inspection to Intelligent Surface Quality"
      },
      {
        "type": "p",
        "text": "By combining high-resolution machine vision, optimized illumination and Vision AI, IdentifYou transforms challenging surface and edge inspection into a consistent, automated and scalable quality-control process."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "vision-ai-bore-measurement": {
    "title": "Precision at the Point of Connection",
    "breadcrumb": "Precision at the Point of Connection",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Precision at the Point of Connection"
      },
      {
        "type": "p",
        "text": "High-Speed, Micron-Level Bore & Interface Inspection"
      },
      {
        "type": "p",
        "text": "Industry: Automotive ComponentsApplication: Sprocket / Drive-Shaft InterfaceTechnology: 3D Profiling + 2D Vision + Vision AI"
      },
      {
        "type": "h2",
        "text": "THE CHALLENGE"
      },
      {
        "type": "p",
        "text": "The bore and keyway form a critical mechanical interface between the sprocket and drive shaft. Even micron-level deviations can affect fitment, alignment and torque transmission."
      },
      {
        "type": "p",
        "text": "The manufacturer needed to detect:"
      },
      {
        "type": "p",
        "text": "Undersized / Oversized Bore | Out-of-Round Bore | Keyway Width & Depth Deviation | Angular Keyway Offset"
      },
      {
        "type": "h2",
        "text": "The challenge was compounded by multiple component variants, customer-specific requirements and a 9-second production cycle."
      },
      {
        "type": "h2",
        "text": "THE SOLUTION"
      },
      {
        "type": "bullet",
        "text": "Hybrid 3D + 2D Vision Inspection"
      },
      {
        "type": "p",
        "text": "A high-speed inspection architecture combines 3D profiling for dimensional accuracy with 2D vision for positional and geometric characteristics. The two inspection streams are synchronized and evaluated against the specification of the specific component variant."
      },
      {
        "type": "bullet",
        "text": "3D Profiler — Dimensional & Geometric Inspection"
      },
      {
        "type": "p",
        "text": "The 3D profiler captures the bore and keyway geometry as a high-resolution 3D profile, enabling non-contact measurement of critical interface dimensions."
      },
      {
        "type": "p",
        "text": "It is used to evaluate:"
      },
      {
        "type": "bullet",
        "text": "Bore Diameter: Detects undersized and oversized bore conditions."
      },
      {
        "type": "bullet",
        "text": "Bore Roundness: Identifies out-of-round conditions by analyzing the bore profile."
      },
      {
        "type": "bullet",
        "text": "Keyway Width: Measures the actual keyway opening against the specified tolerance."
      },
      {
        "type": "bullet",
        "text": "Keyway Depth: Determines whether the keyway reaches the required machining depth."
      },
      {
        "type": "bullet",
        "text": "Interface Geometry: Evaluates the dimensional relationship between the bore and keyway."
      },
      {
        "type": "p",
        "text": "The system performs these measurements against micron-level tolerance limits, providing precise and repeatable inspection of the shaft–sprocket interface."
      },
      {
        "type": "bullet",
        "text": "2D Camera + Diffused Lighting — Position & Angular Inspection"
      },
      {
        "type": "p",
        "text": "A high-resolution 2D industrial camera captures the keyway and surrounding interface using controlled diffused illumination."
      },
      {
        "type": "p",
        "text": "The vision system analyzes:"
      },
      {
        "type": "bullet",
        "text": "Keyway Presence"
      },
      {
        "type": "bullet",
        "text": "Keyway Position"
      },
      {
        "type": "bullet",
        "text": "Keyway Orientation"
      },
      {
        "type": "bullet",
        "text": "Angular Keyway Offset"
      },
      {
        "type": "bullet",
        "text": "Reference-edge alignment"
      },
      {
        "type": "p",
        "text": "Image processing identifies the relevant edges and reference features, allowing the system to calculate the angular and positional deviation of the keyway relative to the bore reference."
      },
      {
        "type": "p",
        "text": "Diffused lighting helps minimize glare, reflections and inconsistent illumination from machined metallic surfaces, improving edge detection and measurement stability."
      },
      {
        "type": "bullet",
        "text": "Vision AI / Inspection Logic — Intelligent Decision Layer"
      },
      {
        "type": "p",
        "text": "The inspection engine combines the 3D dimensional measurements and 2D positional measurements to make the final interface-quality decision."
      },
      {
        "type": "p",
        "text": "For each component, the system identifies the applicable:"
      },
      {
        "type": "p",
        "text": "Part Variant → Customer Specification → Inspection Recipe → Tolerance Limits"
      },
      {
        "type": "p",
        "text": "The inspection logic then evaluates every critical characteristic against its specified limits and generates an automated:"
      },
      {
        "type": "bullet",
        "text": "PASS / FAIL Decision"
      },
      {
        "type": "p",
        "text": "For failed components, the system can identify the specific Bore or Interface Error, such as:"
      },
      {
        "type": "p",
        "text": "Bore Oversize | Bore Undersize | Out-of-Round Bore | Keyway Width Deviation | Keyway Depth Deviation | Angular Keyway Offset"
      },
      {
        "type": "p",
        "text": "This creates a single integrated inspection solution for the complete bore-to-keyway interface, rather than treating each defect as an independent inspection."
      },
      {
        "type": "p",
        "text": "Designed for 9-Second Production Cycles"
      },
      {
        "type": "p",
        "text": "The 2D and 3D acquisition, measurement and decision processes are optimized to operate within the 9-second production cycle, enabling micron-level bore and interface inspection without slowing the production line."
      },
      {
        "type": "p",
        "text": "ENGINEERED FOR PRODUCTION SPEED"
      },
      {
        "type": "p",
        "text": "The inspection system was optimized to match the 9-second production cycle, allowing critical bore and interface characteristics to be inspected without slowing production."
      },
      {
        "type": "p",
        "text": "9 Seconds: Production Cycle = Inspection Cycle"
      },
      {
        "type": "p",
        "text": "BUILT FOR VARIANT GROWTH"
      },
      {
        "type": "p",
        "text": "A recipe-driven architecture manages different:"
      },
      {
        "type": "p",
        "text": "Bore Dimensions → Keyway Specifications → Micron-Level Tolerances → Customer Requirements"
      },
      {
        "type": "p",
        "text": "New component variants can be added through inspection recipes without redesigning the complete system."
      },
      {
        "type": "h2",
        "text": "THE RESULT"
      },
      {
        "type": "bullet",
        "text": "Micron-Level InspectionPrecise measurement of critical bore and keyway characteristics."
      },
      {
        "type": "bullet",
        "text": "9-Second Cycle TimeInspection synchronized with production."
      },
      {
        "type": "bullet",
        "text": "Complete Interface InspectionBore, keyway and angular deviations checked automatically."
      },
      {
        "type": "bullet",
        "text": "Scalable for VariantsOne inspection architecture supporting multiple component configurations."
      },
      {
        "type": "bullet",
        "text": "Digital Inspection Evidence2D images, 3D profiles and measurement results available for every inspection."
      },
      {
        "type": "p",
        "text": "From Measuring Components to Assuring the Mechanical Interface"
      },
      {
        "type": "p",
        "text": "IdentifYou combines 3D metrology, 2D machine vision and Vision AI to deliver fast, precise and scalable inspection of critical Bore & Interface Errors."
      }
    ],
    "technologyUsed": "",
    "more": []
  },
  "vision-ai-complex-dimension": {
    "title": "Precision Inspection of Complex Threads & Internal Geometries",
    "breadcrumb": "Precision Inspection of Complex Threads & Internal Geometries",
    "tag": "Case Study",
    "docItems": [
      {
        "type": "p",
        "text": "Precision Inspection of Complex Threads & Internal Geometries"
      },
      {
        "type": "p",
        "text": "(Beyond the Limits of Conventional 2D Vision)"
      },
      {
        "type": "p",
        "text": "Industry: Automotive & Industrial ComponentsApplication: Thread & Internal Feature InspectionTechnology: 3D Profiling + 2D Vision + Vision AI"
      },
      {
        "type": "h2",
        "text": "THE CHALLENGE"
      },
      {
        "type": "p",
        "text": "Inspecting Threads Where Conventional Vision Struggles"
      },
      {
        "type": "p",
        "text": "Thread inspection becomes significantly more complex when critical features are located inside the component."
      },
      {
        "type": "p",
        "text": "The combination of a large outer diameter and relatively small inner diameter, coupled with deep internal geometry and multiple thread dimensions, creates a challenging inspection environment. As the thread extends deeper into the component, line-of-sight becomes increasingly restricted, while the complex thread profile can create occlusion, shadows and inconsistent visibility within a conventional 2D image."
      },
      {
        "type": "p",
        "text": "These geometric constraints make it difficult for a 2D camera to reliably capture and distinguish the complete thread profile and its internal features, particularly when precise dimensional inspection is required.A standard 2D image may capture the outer geometry clearly while providing limited visibility into the actual thread profile and deeper internal features."
      },
      {
        "type": "p",
        "text": "The inspection challenge"
      },
      {
        "type": "p",
        "text": "The inspection system needed to reliably identify and measure thread and internal interface characteristics across a wide range of component geometries, where variations in thread diameter, thread depth, internal dimensions and overall geometry can significantly affect feature visibility and measurement accuracy. The solution therefore had to adapt its inspection parameters to the specific geometry and dimensional requirements of each component variant."
      },
      {
        "type": "h2",
        "text": "THE SOLUTION"
      },
      {
        "type": "p",
        "text": "Hybrid 3D + 2D Thread Inspection"
      },
      {
        "type": "p",
        "text": "IdentifYou combines 3D profiling and 2D vision so that dimensional and visual characteristics can be inspected using the most appropriate sensing technology."
      },
      {
        "type": "p",
        "text": "3D Profiler — Thread & Internal Geometry"
      },
      {
        "type": "p",
        "text": "The 3D profiler captures the component's three-dimensional profile, providing depth and geometric information that cannot be reliably obtained from a conventional 2D image. This enables inspection of critical thread and internal features, including thread profile and depth, pitch-related geometry, internal diameter, step and shoulder dimensions, and other internal feature characteristics."
      },
      {
        "type": "p",
        "text": "By capturing the geometry at different depths, the 3D profile helps overcome line-of-sight and occlusion challenges, enabling more reliable identification of thread profile deviations and dimensional variations within the component."
      },
      {
        "type": "p",
        "text": "2D Camera + Controlled Illumination — Visual & Reference Features"
      },
      {
        "type": "p",
        "text": "The high-resolution 2D camera captures visual and positional characteristics that are more effectively evaluated from top or side views, including the thread entrance, reference edges, surface features, component orientation and visible thread characteristics. The captured images can also be used to establish the relationship between the external and internal features of the component."
      },
      {
        "type": "p",
        "text": "Controlled diffused lighting enhances feature visibility on reflective machined surfaces, minimizes glare and shadows, and improves the consistency of thread-edge detection for reliable 2D inspection."
      },
      {
        "type": "p",
        "text": "OVERCOMING THE 2D THREAD INSPECTION CHALLENGE"
      },
      {
        "type": "p",
        "text": "A key challenge in thread inspection is the significant difference between the component’s outer and inner diameters. When a large outer diameter surrounds a relatively small inner diameter, the available viewing area for a conventional 2D camera becomes restricted, limiting visibility of the internal thread features. As the thread extends deeper into the component, occlusion, shadows and restricted line-of-sight can further obscure portions of the thread profile, making reliable detection and dimensional assessment difficult."
      },
      {
        "type": "p",
        "text": "To overcome these limitations, the solution combines optimized viewing perspectives with 3D depth profiling, providing greater visibility and measurement capability across the complete internal thread geometry."
      },
      {
        "type": "p",
        "text": "INTELLIGENT INSPECTION"
      },
      {
        "type": "p",
        "text": "Vision AI and inspection logic combine the 2D and 3D results to determine whether the complete thread and internal geometry meets the required specification."
      },
      {
        "type": "p",
        "text": "The inspection recipe defines:"
      },
      {
        "type": "p",
        "text": "Component Variant → Thread Specification → Internal Dimensions → Tolerance Limits"
      },
      {
        "type": "p",
        "text": "The system then generates an automated:"
      },
      {
        "type": "p",
        "text": "PASS / FAIL"
      },
      {
        "type": "p",
        "text": "with the ability to identify the specific thread or internal-geometry deviation."
      },
      {
        "type": "p",
        "text": "BUILT FOR COMPLEX VARIANTS"
      },
      {
        "type": "p",
        "text": "Different components may have different:"
      },
      {
        "type": "p",
        "text": "Outer Diameters | Inner Diameters | Thread Profiles | Thread Depths | Internal Features"
      },
      {
        "type": "p",
        "text": "A recipe-driven architecture allows these variations to be configured within a common inspection framework, making the solution scalable as new thread variants are introduced."
      },
      {
        "type": "h2",
        "text": "THE OUTCOME"
      },
      {
        "type": "p",
        "text": "Better Thread Visibility"
      },
      {
        "type": "p",
        "text": "3D depth information supplements areas where conventional 2D vision has limited line-of-sight."
      },
      {
        "type": "p",
        "text": "Multi-Dimensional Inspection"
      },
      {
        "type": "p",
        "text": "Thread profile, depth, diameter and internal geometry can be evaluated together."
      },
      {
        "type": "p",
        "text": "Reduced Dependency on 2D Alone"
      },
      {
        "type": "p",
        "text": "The inspection architecture uses the appropriate sensing method for each feature."
      },
      {
        "type": "p",
        "text": "Variant-Ready"
      },
      {
        "type": "p",
        "text": "Different thread and internal geometries can be handled through configurable inspection recipes."
      },
      {
        "type": "p",
        "text": "High-Speed Automated Inspection"
      },
      {
        "type": "p",
        "text": "Designed to integrate with production-cycle requirements while maintaining precise thread inspection."
      },
      {
        "type": "p",
        "text": "From Difficult-to-See Threads to Measurable Geometry"
      },
      {
        "type": "p",
        "text": "3D depth + 2D vision + intelligent inspection logic enables automated inspection of complex thread and internal geometries that are difficult to reliably evaluate using conventional 2D vision alone."
      }
    ],
    "technologyUsed": "",
    "more": []
  }
}

  const caseStudiesList = [
    { slug: 'procurement-operations-intelligence', categoryId: supplyChainCat.id, filter: [{ category: 'AI & Intelligent Business' }, { category: 'AI' }, { category: 'Manufacturing' }, { category: 'Supply Chain' }] },
    { slug: 'risk-insights-finance', categoryId: aiCat.id, filter: [{ category: 'AI & Intelligent Business' }, { category: 'AI' }, { category: 'Financial Services' }] },
    { slug: 'strategic-procurement-intelligence', categoryId: supplyChainCat.id, filter: [{ category: 'AI & Intelligent Business' }, { category: 'AI' }, { category: 'Manufacturing' }, { category: 'Supply Chain' }] },
    { slug: 'towards-zero-inventory-variance-ai', categoryId: manufacturingCat.id, filter: [{ category: 'AI & Intelligent Business' }, { category: 'AI' }, { category: 'Manufacturing' }, { category: 'Supply Chain' }] },
    { slug: 'precision-abm-snowflake-cortex', categoryId: supplyChainCat.id, filter: [{ category: 'Data Engineering' }, { category: 'Data' }, { category: 'AI' }] },
    { slug: 'revolutionizing-inventory-optimization', categoryId: supplyChainCat.id, filter: [{ category: 'Data Engineering' }, { category: 'Data' }, { category: 'Manufacturing' }, { category: 'Supply Chain' }] },
    { slug: 'optimizing-shipment-fleet-snowflake', categoryId: supplyChainCat.id, filter: [{ category: 'Data Engineering' }, { category: 'Data' }, { category: 'Supply Chain' }] },
    { slug: 'tailored-enterprise-solutions', categoryId: manufacturingCat.id, filter: [{ category: 'Digital Engineering' }, { category: 'Automation' }, { category: 'Manufacturing' }] },
    { slug: 'fluke-t40', categoryId: automationCat.id, filter: [{ category: 'Industry Automation' }, { category: 'Automation' }, { category: 'Manufacturing' }] },
    { slug: 'fluke-tv30', categoryId: automationCat.id, filter: [{ category: 'Industry Automation' }, { category: 'Automation' }, { category: 'Manufacturing' }] },
    { slug: 'industrial-edge-device-engineering', categoryId: automationCat.id, filter: [{ category: 'Industry Automation' }, { category: 'Automation' }, { category: 'Manufacturing' }] },
    { slug: 'industrial-edge-intelligence', categoryId: automationCat.id, filter: [{ category: 'Industry Automation' }, { category: 'Automation' }, { category: 'AI' }] },
    { slug: 'towards-zero-inventory-variance-automation', categoryId: automationCat.id, filter: [{ category: 'Industry Automation' }, { category: 'Automation' }, { category: 'Manufacturing' }, { category: 'Supply Chain' }] },
    { slug: 'advanced-vision-inspection-surface', categoryId: visionCat.id, filter: [{ category: 'Vision AI' }, { category: 'AI' }, { category: 'Manufacturing' }] },
    { slug: 'vision-ai-bore-measurement', categoryId: visionCat.id, filter: [{ category: 'Vision AI' }, { category: 'AI' }, { category: 'Manufacturing' }] },
    { slug: 'vision-ai-complex-dimension', categoryId: visionCat.id, filter: [{ category: 'Vision AI' }, { category: 'AI' }, { category: 'Manufacturing' }] },
  ]

  let count = 0
  for (const item of caseStudiesList) {
    const docData = FULL_DOCX_MAP[item.slug]
    if (!docData) continue

    await payload.create({
      collection: 'case-studies',
      draft: false,
      data: {
        title: docData.title,
        slug: item.slug,
        category: item.categoryId,
        template: 'classic',
        status: 'published',
        displayOrder: ++count,
        tags: [{ tag: docData.tag || 'Deep Tech' }],
        filterCategories: item.filter,
        docItems: docData.docItems || [],
        comparisonTable: docData.comparisonTable || null,
        detail: {
          shortDescription: docData.docItems?.[0]?.text || docData.title,
          technologyUsed: docData.technologyUsed || '',
        },
      },
    })
  }

  console.log(`Successfully seeded ${count} Case Studies into Payload CMS database!`)
}

if (process.argv[2] === '--run') {
  seed().then(() => process.exit(0)).catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
}
