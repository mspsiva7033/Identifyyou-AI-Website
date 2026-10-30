import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { microsoftGraphEmailAdapter } from './lib/email'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { getPoolConfig } from './lib/db-config'
import { migrations } from './migrations'

// Read .env or .env.local if DATABASE_URI is not set
if (!process.env.DATABASE_URI) {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.resolve(process.cwd(), envFile)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      envContent.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
        if (match && !process.env[match[1].trim()]) {
          process.env[match[1].trim()] = match[2].trim()
        }
      })
      break
    }
  }
}

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { CaseStudyCategories } from './payload/collections/CaseStudyCategories'
import { CaseStudies } from './payload/collections/CaseStudies'
import { ManufacturingSolutions } from './payload/collections/ManufacturingSolutions'
import { DeepTechCapabilities } from './payload/collections/DeepTechCapabilities'
import { ContactSubmissions } from './payload/collections/ContactSubmissions'
import { BlogsAndNews } from './payload/collections/BlogsAndNews'
import { LeadershipTeam } from './payload/collections/LeadershipTeam'
import { AuditLogs } from './payload/collections/AuditLogs'

import { HeaderGlobal } from './payload/globals/Header'
import { FooterGlobal } from './payload/globals/Footer'
import { SiteSettings } from './payload/globals/SiteSettings'
import { HomePageData } from './payload/globals/HomePageData'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'http://localhost:3000'

const allowedOrigins = Array.from(
  new Set([
    serverURL,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://identifyyou.ai',
    'https://www.identifyyou.ai',
    'https://sivamsp-lenovo-b490.tail00b6b9.ts.net',
    ...(process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : []),
  ].filter(Boolean))
)

export default buildConfig({
  serverURL: serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: 'users',
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: '— IdentifYou Admin',
    },
    livePreview: {
      url: serverURL,
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['case-studies'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: [
        '/components/admin/AnalyticsDashboardWidget#AnalyticsDashboardWidget',
      ],
      afterNavLinks: [
        '/components/admin/AnalyticsNav#AnalyticsNav',
      ],
      views: {
        analytics: {
          Component: '/components/admin/AnalyticsView#AnalyticsView',
          path: '/analytics',
          meta: {
            title: 'Analytics Dashboard',
          },
        },
      },
    },
  },
  collections: [
    Users,
    Media,
    CaseStudyCategories,
    CaseStudies,
    ManufacturingSolutions,
    DeepTechCapabilities,
    ContactSubmissions,
    BlogsAndNews,
    LeadershipTeam,
    AuditLogs,
  ],
  globals: [
    HeaderGlobal,
    FooterGlobal,
    SiteSettings,
    HomePageData,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-at-least-32-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: getPoolConfig(),
    push: false,
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  email: (() => {
    // 1. Prefer Microsoft Graph API if Azure / Microsoft 365 credentials exist in environment
    const hasGraph = Boolean(
      (process.env.MS_GRAPH_TENANT_ID || process.env.AZURE_TENANT_ID) &&
      (process.env.MS_GRAPH_CLIENT_ID || process.env.AZURE_CLIENT_ID) &&
      (process.env.MS_GRAPH_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET) &&
      (process.env.MS_GRAPH_SENDER_EMAIL || process.env.AZURE_SENDER_EMAIL || process.env.CONTACT_EMAIL_FROM)
    )

    if (hasGraph) {
      return microsoftGraphEmailAdapter()
    }

    // 2. Fallback to Nodemailer SMTP if configured
    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const isConfigured = Boolean(
      host &&
      user &&
      pass &&
      !user.includes('your-email') &&
      !pass.includes('your-email-password')
    )

    if (!isConfigured) {
      return undefined
    }

    return nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || 'ai.support@identifyyou.in',
      defaultFromName: 'IdentifYou Technologies',
      skipVerify: process.env.SMTP_SKIP_VERIFY === 'true',
      transportOptions: {
        host,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user,
          pass,
        },
      } as any,
    })
  })(),
  plugins: [
    ...(process.env.USE_S3 === 'true' && process.env.S3_BUCKET
      ? [
        s3Storage({
          collections: {
            media: true,
          },
          bucket: process.env.S3_BUCKET,
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true,
          },
        }),
      ]
      : []),
  ],
})
