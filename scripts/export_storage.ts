/**
 * export_storage.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Media/Storage export script for IdentifYou
 *
 * Usage:
 *   npm run storage:export
 *   node --import tsx/esm scripts/export_storage.ts
 *
 * What it does:
 *   1. Scans the /public folder (images, videos, assets)
 *   2. Copies all media files to backups/storage/YYYY-MM-DD_HH-MM-SS/
 *   3. Also checks Supabase S3 bucket and downloads any files found there
 *   4. Prints a full summary of exported files + sizes
 * ─────────────────────────────────────────────────────────────────────────────
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  ListBucketsCommand,
  type ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3'
import { Readable } from 'stream'

// ── Resolve project root ──────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ── Load .env.local ───────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.resolve(ROOT, '.env.local')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/)
      if (match) {
        const key = match[1].trim()
        const val = match[2].trim()
        if (!process.env[key]) process.env[key] = val
      }
    })
  }
}
loadEnv()

// ── Config ────────────────────────────────────────────────────────────────────
const S3_REGION            = process.env.S3_REGION            || 'us-east-1'
const S3_ACCESS_KEY_ID     = process.env.S3_ACCESS_KEY_ID     || ''
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || ''

// Auto-fix Supabase endpoint to include /storage/v1/s3
let S3_ENDPOINT = process.env.S3_ENDPOINT || ''
if (S3_ENDPOINT && S3_ENDPOINT.includes('supabase.co') && !S3_ENDPOINT.includes('/storage/v1/s3')) {
  S3_ENDPOINT = S3_ENDPOINT.replace(/\/$/, '') + '/storage/v1/s3'
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function timestamp(): string {
  return new Date()
    .toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '')
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function copyDirRecursive(src: string, dest: string): { count: number; bytes: number } {
  let count = 0
  let bytes = 0

  if (!fs.existsSync(src)) return { count, bytes }

  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      const sub = copyDirRecursive(srcPath, destPath)
      count += sub.count
      bytes += sub.bytes
    } else {
      fs.mkdirSync(path.dirname(destPath), { recursive: true })
      fs.copyFileSync(srcPath, destPath)
      const size = fs.statSync(srcPath).size
      count++
      bytes += size
      process.stdout.write(`  Copied: ${entry.name} (${formatBytes(size)})\n`)
    }
  }
  return { count, bytes }
}

async function streamToFile(stream: Readable, filePath: string): Promise<void> {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath)
    stream.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
    stream.on('error', reject)
  })
}

async function listAllS3Objects(client: S3Client, bucket: string): Promise<Array<{ Key: string; Size: number }>> {
  const objects: Array<{ Key: string; Size: number }> = []
  let token: string | undefined

  do {
    const res: ListObjectsV2CommandOutput = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token })
    )
    if (res.Contents) {
      for (const obj of res.Contents) {
        if (obj.Key) objects.push({ Key: obj.Key, Size: obj.Size ?? 0 })
      }
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined
  } while (token)

  return objects
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('IdentifYou - Storage Export')
  console.log('============================')

  const ts = timestamp()
  const exportDir = path.resolve(ROOT, 'backups', 'storage', ts)
  fs.mkdirSync(exportDir, { recursive: true })
  console.log(`Export folder: backups/storage/${ts}\n`)

  let totalFiles = 0
  let totalBytes = 0

  // ── PART 1: Local /public folder ─────────────────────────────────────────
  const publicDir = path.resolve(ROOT, 'public')
  console.log('[ 1/2 ] Exporting local /public folder...')
  console.log(`        Source: ${publicDir}\n`)

  const localExportDir = path.join(exportDir, 'public')

  // Media subdirectories to export
  const mediaDirs = ['images', 'videos']
  for (const dir of mediaDirs) {
    const srcDir = path.join(publicDir, dir)
    if (fs.existsSync(srcDir)) {
      console.log(`  -- public/${dir}/ --`)
      const result = copyDirRecursive(srcDir, path.join(localExportDir, dir))
      totalFiles += result.count
      totalBytes += result.bytes
      console.log(`  => ${result.count} file(s), ${formatBytes(result.bytes)}\n`)
    }
  }

  // Also copy root-level media files (logo.png, etc.)
  const rootFiles = fs.readdirSync(publicDir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|pdf)$/i.test(e.name))
  if (rootFiles.length > 0) {
    console.log('  -- public/ (root media files) --')
    for (const file of rootFiles) {
      const src = path.join(publicDir, file.name)
      const dest = path.join(localExportDir, file.name)
      fs.copyFileSync(src, dest)
      const size = fs.statSync(src).size
      console.log(`  Copied: ${file.name} (${formatBytes(size)})`)
      totalFiles++
      totalBytes += size
    }
    console.log()
  }

  // ── PART 2: Supabase S3 bucket ───────────────────────────────────────────
  console.log('[ 2/2 ] Checking Supabase S3 Storage...')

  if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY || !S3_ENDPOINT) {
    console.log('        S3 credentials not configured — skipping.\n')
  } else {
    const client = new S3Client({
      region: S3_REGION,
      endpoint: S3_ENDPOINT,
      forcePathStyle: true,
      credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
    })

    try {
      // Discover actual bucket names
      const bucketsRes = await client.send(new ListBucketsCommand({}))
      const buckets = bucketsRes.Buckets?.map(b => b.Name).filter(Boolean) as string[] || []
      console.log(`        Buckets found: ${buckets.length > 0 ? buckets.join(', ') : 'none'}`)

      for (const bucket of buckets) {
        const objects = await listAllS3Objects(client, bucket!)
        if (objects.length === 0) {
          console.log(`        Bucket "${bucket}": empty — skipping.\n`)
          continue
        }

        const bucketSize = objects.reduce((s, o) => s + o.Size, 0)
        console.log(`\n  Bucket "${bucket}": ${objects.length} file(s), ${formatBytes(bucketSize)}`)

        const s3ExportDir = path.join(exportDir, 's3', bucket!)
        let s3Downloaded = 0

        for (const obj of objects) {
          const localPath = path.join(s3ExportDir, obj.Key)
          process.stdout.write(`  [${s3Downloaded + 1}/${objects.length}] ${obj.Key} (${formatBytes(obj.Size)})...`)

          try {
            const res = await client.send(new GetObjectCommand({ Bucket: bucket!, Key: obj.Key }))
            if (res.Body instanceof Readable) {
              await streamToFile(res.Body, localPath)
            } else if (res.Body) {
              const chunks: Uint8Array[] = []
              // @ts-ignore
              for await (const chunk of res.Body) chunks.push(chunk)
              const dir2 = path.dirname(localPath)
              if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true })
              fs.writeFileSync(localPath, Buffer.concat(chunks))
            }
            console.log(' OK')
            s3Downloaded++
            totalFiles++
            totalBytes += obj.Size
          } catch (err: unknown) {
            console.log(` FAILED: ${err instanceof Error ? err.message : String(err)}`)
          }
        }
      }
    } catch (err: unknown) {
      console.log(`        S3 check failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n=============================================')
  console.log('Storage export complete!')
  console.log(`  Total files : ${totalFiles}`)
  console.log(`  Total size  : ${formatBytes(totalBytes)}`)
  console.log(`  Location    : backups/storage/${ts}`)
  console.log('=============================================')
  console.log('\nTo share with your team, ZIP this folder:')
  console.log(`  backups\\storage\\${ts}`)
}

main().catch((err) => {
  console.error('\nStorage export failed:', err.message)
  process.exit(1)
})
