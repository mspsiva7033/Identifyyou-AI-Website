import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'

export interface RenderedDocxResult {
  html: string
  isCustomDocx: boolean
  lastModified: string
  downloadUrl?: string
}

/**
 * Automatically reads and converts a .docx file from /public/docs/ to clean HTML.
 * If the file is not yet uploaded, falls back to a clean default template.
 */
export async function getDocxContent(
  filename: string,
  docType: 'privacy-policy' | 'terms-and-conditions'
): Promise<RenderedDocxResult> {
  const docsDir = path.join(process.cwd(), 'public', 'docs')
  let filePath = path.join(docsDir, filename)
  let resolvedFilename = filename

  // Check direct file or detect any matching .docx in public/docs
  if (!fs.existsSync(filePath) && fs.existsSync(docsDir)) {
    try {
      const files = fs.readdirSync(docsDir)
      const pattern = docType === 'privacy-policy' ? /privacy/i : /terms/i
      const match = files.find(
        (f) => !f.startsWith('~$') && f.toLowerCase().endsWith('.docx') && pattern.test(f)
      )
      if (match) {
        filePath = path.join(docsDir, match)
        resolvedFilename = match
      }
    } catch {
      // ignore directory read errors
    }
  }

  if (fs.existsSync(filePath)) {
    try {
      const stats = fs.statSync(filePath)
      const lastModified = stats.mtime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const result = await mammoth.convertToHtml({ path: filePath })

      if (result.value && result.value.trim().length > 0) {
        return {
          html: result.value,
          isCustomDocx: true,
          lastModified,
          downloadUrl: `/docs/${encodeURIComponent(resolvedFilename)}`,
        }
      }
    } catch (err) {
      console.error(`[DocxRenderer] Error converting ${filePath}:`, err)
    }
  }

  // Fallback default templates if .docx is not yet placed in public/docs/
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (docType === 'privacy-policy') {
    return {
      html: `
        <h2>1. Introduction & Overview</h2>
        <p>IdentifYou Technologies (&ldquo;IdentifYou&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy, confidentiality, and security of our clients, website visitors, and business partners. This Privacy Policy outlines our standards and practices regarding the collection, use, processing, and safeguarding of personal and operational business data across our deep-tech engineering platforms, website, and commercial engagements.</p>

        <h2>2. Data We Collect</h2>
        <p>We only collect information necessary to fulfill commercial inquiries, deliver deep-tech solutions, and improve user experiences. This includes:</p>
        <ul>
          <li><strong>Direct Inquiries:</strong> Contact information provided via our online consultation forms (such as your full name, work email address, company name, phone number, and inquiry messages).</li>
          <li><strong>Enterprise Telemetry:</strong> Anonymized, cookie-free server telemetry (such as page views, referrer domains, and high-level device types) stored directly in our secured PostgreSQL databases for aggregate platform analytics.</li>
          <li><strong>Technical Metadata:</strong> System logs strictly utilized for cybersecurity monitoring, error diagnosis, and server performance optimization.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>Your information is processed strictly for legitimate business purposes:</p>
        <ul>
          <li>Responding to project evaluations, consultation requests, and deep-tech architecture inquiries.</li>
          <li>Delivering, maintaining, and improving our artificial intelligence, Vision AI, and enterprise data solutions.</li>
          <li>Communicating operational updates, project milestones, and technical support notices.</li>
          <li>Fulfilling legal, statutory, and regulatory compliance obligations.</li>
        </ul>

        <h2>4. Data Protection & Cybersecurity Standards</h2>
        <p>IdentifYou enforces enterprise-grade security protocols to protect all operational and personal data against unauthorized access, loss, or alteration. Our infrastructure employs encrypted data transmission (HTTPS / TLS 1.3), isolated network perimeters, strict Role-Based Access Controls (RBAC), and automated audit trails.</p>

        <h2>5. Information Sharing & Third-Party Disclosure</h2>
        <p>We do not sell, rent, monetize, or trade your personal or business information. Data is never shared with third-party advertising networks. We may only disclose data to trusted cloud and infrastructure service providers bound by strict confidentiality agreements, or when mandated by law.</p>

        <h2>6. Your Rights & Contact Details</h2>
        <p>You have the right to request access to, correction of, or deletion of your personal contact data. If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our data governance team at:</p>
        <p><strong>IdentifYou Technologies</strong><br />
        Email: <a href="mailto:ai.support@identifyyou.in">ai.support@identifyyou.in</a><br />
        Phone: +91 9597046682 / +91 95009 46929</p>
      `,
      isCustomDocx: false,
      lastModified: today,
    }
  }

  return {
    html: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or utilizing the website, digital portals, or deep-tech consulting services provided by IdentifYou Technologies, you acknowledge and agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>

      <h2>2. Intellectual Property Rights</h2>
      <p>All content, architecture diagrams, technical benchmarks, case studies, software blueprints, logos, and materials published on this website are the proprietary intellectual property of IdentifYou Technologies, protected under international copyright, trademark, and trade secret laws.</p>

      <h2>3. Permitted Use</h2>
      <p>You are granted a limited, non-exclusive, non-transferable license to access and review information on this website for legitimate business evaluation and informational purposes. You agree not to reverse engineer, scrape, reproduce, or redistribute any technical materials without explicit prior written authorization.</p>

      <h2>4. Disclaimers & Limitation of Liability</h2>
      <p>The materials on this website are provided on an &ldquo;as is&rdquo; basis for informational purposes. While we endeavor to ensure high accuracy and currency, IdentifYou makes no warranties regarding the completeness or suitability of the website materials for specific commercial deployments without formal technical engagement.</p>

      <h2>5. Governing Law & Jurisdiction</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of or related to the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.</p>

      <h2>6. Inquiries & Legal Notices</h2>
      <p>For legal notices or questions regarding these terms, please contact our legal desk at <a href="mailto:ai.support@identifyyou.in">ai.support@identifyyou.in</a>.</p>
    `,
    isCustomDocx: false,
    lastModified: today,
  }
}
