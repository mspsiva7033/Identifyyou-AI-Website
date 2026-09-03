import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

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

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
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
