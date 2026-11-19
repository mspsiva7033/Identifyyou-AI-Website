import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'
import sanitizeHtml from 'sanitize-html'

export interface RenderedDocxResult {
  html: string
  isCustomDocx: boolean
  lastModified: string
  downloadUrl?: string
  organization?: string
  effectiveDate?: string
  lastUpdated?: string
  websites?: { label: string; url: string }[]
}

/**
 * Strict server-side HTML sanitization configuration for converted document HTML.
 * Strips script tags, unsafe iframes, javascript: URI schemes, and inline event handlers.
 */
export const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del',
    'ul', 'ol', 'li',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'blockquote', 'hr', 'br', 'code', 'pre',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    th: ['colspan', 'rowspan', 'align'],
    td: ['colspan', 'rowspan', 'align'],
    span: ['class'],
    p: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href || ''
      const isExternal = href.startsWith('http://') || href.startsWith('https://')
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        },
      }
    },
  },
}

/**
 * Sanitizes raw HTML using sanitize-html before rendering to prevent XSS.
 */
export function sanitizeDocHtml(rawHtml: string): string {
  return sanitizeHtml(rawHtml, sanitizeOptions)
}

/**
 * Automatically reads, converts, and sanitizes a .docx file from /public/docs/ to clean, safe HTML.
 * Strips redundant raw document preambles so metadata renders in a clean callout box.
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

  const defaultMeta = {
    organization: 'IdentifYou Technologies (OPC) Private Limited',
    effectiveDate: '1-Jan-2024',
    lastUpdated: '18-Nov-2026',
    websites: [
      { label: 'https://identifyyou.ai', url: 'https://identifyyou.ai' },
      { label: 'https://deiaaix.ai', url: 'https://deiaaix.ai' },
    ],
  }

  if (fs.existsSync(filePath)) {
    try {
      const stats = fs.statSync(filePath)
      const lastModified = stats.mtime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      const result = await mammoth.convertToHtml({ path: filePath })

      if (result.value && result.value.trim().length > 0) {
        let rawHtml = result.value

        // Remove redundant preamble paragraphs before '1. Introduction'
        const introIndex = rawHtml.search(/<h[1-2][^>]*>\s*1\.\s*Introduction/i)
        if (introIndex !== -1) {
          rawHtml = rawHtml.substring(introIndex)
        }

        return {
          html: sanitizeDocHtml(rawHtml),
          isCustomDocx: true,
          lastModified,
          downloadUrl: `/docs/${encodeURIComponent(resolvedFilename)}`,
          ...defaultMeta,
        }
      }
    } catch (err) {
      console.error(`[DocxRenderer] Error converting ${filePath}:`, err)
    }
  }

  // Fallback default templates if .docx is not yet placed in public/docs/
  const today = '18-Nov-2026'

  if (docType === 'privacy-policy') {
    return {
      html: sanitizeDocHtml(`
        <h1>1. Introduction</h1>
        <p>IdentifYou Technologies (OPC) Private Limited (&ldquo;IdentifYou Technologies&rdquo;, &ldquo;IdentifYou&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects individuals' privacy and is committed to protecting personal information entrusted to us across our deep-tech engineering platforms, website, and commercial engagements.</p>

        <h1>2. Information We Collect</h1>
        <p>We only collect information necessary to fulfill commercial inquiries, deliver deep-tech solutions, and improve user experiences. This includes:</p>
        <ul>
          <li><strong>Direct Inquiries:</strong> Contact information provided via our online consultation forms (such as your full name, work email address, company name, phone number, and inquiry messages).</li>
          <li><strong>Enterprise Telemetry:</strong> Anonymized, cookie-free server telemetry stored directly in our secured PostgreSQL databases for aggregate platform analytics.</li>
          <li><strong>Technical Metadata:</strong> System logs strictly utilized for cybersecurity monitoring, error diagnosis, and server performance optimization.</li>
        </ul>

        <h1>3. How We Use Your Information</h1>
        <p>Your information is processed strictly for legitimate business purposes:</p>
        <ul>
          <li>Responding to project evaluations, consultation requests, and deep-tech architecture inquiries.</li>
          <li>Delivering, maintaining, and improving our artificial intelligence, Vision AI, and enterprise data solutions.</li>
          <li>Communicating operational updates, project milestones, and technical support notices.</li>
          <li>Fulfilling legal, statutory, and regulatory compliance obligations.</li>
        </ul>

        <h1>4. Data Protection & Cybersecurity Standards</h1>
        <p>IdentifYou enforces enterprise-grade security protocols to protect all operational and personal data against unauthorized access, loss, or alteration. Our infrastructure employs encrypted data transmission (HTTPS / TLS 1.3), isolated network perimeters, strict Role-Based Access Controls (RBAC), and automated audit trails.</p>

        <h1>5. Information Sharing & Third-Party Disclosure</h1>
        <p>We do not sell, rent, monetize, or trade your personal or business information. Data is never shared with third-party advertising networks. We may only disclose data to trusted cloud and infrastructure service providers bound by strict confidentiality agreements, or when mandated by law.</p>

        <h1>6. Your Rights & Contact Details</h1>
        <p>You have the right to request access to, correction of, or deletion of your personal contact data. If you have questions regarding this Privacy Policy or wish to exercise your data rights, please contact our data governance team at:</p>
        <p><strong>IdentifYou Technologies</strong><br />
        Email: <a href="mailto:ai.support@identifyyou.in">ai.support@identifyyou.in</a><br />
        Phone: +91 9597046682 / +91 95009 46929</p>
      `),
      isCustomDocx: false,
      lastModified: today,
      ...defaultMeta,
    }
  }

  return {
    html: sanitizeDocHtml(`
      <h1>1. Introduction</h1>
      <p>These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern access to the websites and, where expressly incorporated into applicable product terms or customer agreements, the products and applications of IdentifYou Technologies (OPC) Private Limited (&ldquo;IdentifYou Technologies&rdquo;, &ldquo;IdentifYou&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).</p>

      <h1>2. Intellectual Property Rights</h1>
      <p>All content, architecture diagrams, technical benchmarks, case studies, software blueprints, logos, and materials published on this website are the proprietary intellectual property of IdentifYou Technologies, protected under international copyright, trademark, and trade secret laws.</p>

      <h1>3. Permitted Use</h1>
      <p>You are granted a limited, non-exclusive, non-transferable license to access and review information on this website for legitimate business evaluation and informational purposes. You agree not to reverse engineer, scrape, reproduce, or redistribute any technical materials without explicit prior written authorization.</p>

      <h1>4. Disclaimers & Limitation of Liability</h1>
      <p>The materials on this website are provided on an &ldquo;as is&rdquo; basis for informational purposes. While we endeavor to ensure high accuracy and currency, IdentifYou makes no warranties regarding the completeness or suitability of the website materials for specific commercial deployments without formal technical engagement.</p>

      <h1>5. Governing Law & Jurisdiction</h1>
      <p>These terms and conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of or related to the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.</p>

      <h1>6. Inquiries & Legal Notices</h1>
      <p>For legal notices or questions regarding these terms, please contact our legal desk at <a href="mailto:ai.support@identifyyou.in">ai.support@identifyyou.in</a>.</p>
    `),
    isCustomDocx: false,
    lastModified: today,
    ...defaultMeta,
  }
}
