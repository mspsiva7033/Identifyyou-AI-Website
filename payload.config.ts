import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Read .env.local if DATABASE_URI is not set
if (!process.env.DATABASE_URI) {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
      if (match) {
        process.env[match[1].trim()] = match[2].trim()
      }
    })
  }
}


import { Media } from './payload/collections/Media'
import { CaseStudyCategories } from './payload/collections/CaseStudyCategories'
import { CaseStudies } from './payload/collections/CaseStudies'
import { ManufacturingSolutions } from './payload/collections/ManufacturingSolutions'
import { DeepTechCapabilities } from './payload/collections/DeepTechCapabilities'
import { ContactSubmissions } from './payload/collections/ContactSubmissions'

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

export default buildConfig({
  serverURL: serverURL,
  cors: [serverURL],
  csrf: [serverURL],
  admin: {
    user: 'users',
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
            title: 'Analytics Dashboard — IdentifYou Admin',
          },
        },
      },
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => true,
        update: () => true,
      },
      fields: [],
    },
    Media,
    CaseStudyCategories,
    CaseStudies,
    ManufacturingSolutions,
    DeepTechCapabilities,
    ContactSubmissions,
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
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:password@localhost:5432/identifyyou',
      ssl: process.env.DATABASE_URI?.includes('supabase') || process.env.DATABASE_URI?.includes('neon') || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    },
  }),
  plugins: [
    ...(process.env.S3_BUCKET
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
