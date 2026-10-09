import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import crypto from 'crypto'

async function setupUmami() {
  console.log('🚀 Starting Umami Analytics setup for IdentifYou...')

  const projectRoot = process.cwd()
  const umamiDir = path.resolve(projectRoot, 'umami')

  // 1. Clone Umami if not already present
  if (!fs.existsSync(umamiDir)) {
    console.log('📥 Cloning Umami repository into ./umami...')
    execSync('git clone --depth 1 https://github.com/umami-software/umami.git umami', {
      cwd: projectRoot,
      stdio: 'inherit',
    })
  } else {
    console.log('✅ Umami directory ./umami already exists.')
  }

  // 2. Read database configuration from root .env / .env.local
  let dbUri = process.env.DATABASE_URI || ''
  if (!dbUri) {
    for (const envFile of ['.env.local', '.env']) {
      const fullPath = path.resolve(projectRoot, envFile)
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8')
        const match = content.match(/DATABASE_URI\s*=\s*(.+)/)
        if (match) {
          dbUri = match[1].trim().replace(/^['"]|['"]$/g, '')
          break
        }
      }
    }
  }

  // Derive Umami DATABASE_URL from dbUri or fallback
  let umamiDbUrl = ''
  if (dbUri) {
    try {
      const parsedUrl = new URL(dbUri)
      parsedUrl.pathname = '/umami_db'
      umamiDbUrl = parsedUrl.toString()
    } catch {
      umamiDbUrl = dbUri.replace(/\/[^/?]+(\?|$)/, '/umami_db$1')
    }
  } else {
    umamiDbUrl = 'postgresql://postgres:password@127.0.0.1:5432/umami_db'
  }

  // Generate a random 32-character secret
  const appSecret = crypto.randomBytes(32).toString('hex')

  // 3. Write umami/.env
  const umamiEnvPath = path.resolve(umamiDir, '.env')
  if (!fs.existsSync(umamiEnvPath)) {
    const umamiEnvContent = `# Umami Analytics Environment Configuration
DATABASE_URL=${umamiDbUrl}
DATABASE_TYPE=postgresql
APP_SECRET=${appSecret}
PORT=3001
`
    fs.writeFileSync(umamiEnvPath, umamiEnvContent, 'utf8')
    console.log('✅ Created ./umami/.env with database configuration.')
  } else {
    console.log('ℹ️ ./umami/.env already exists.')
  }

  // 4. Install dependencies
  console.log('📦 Installing Umami dependencies...')
  execSync('npm install', {
    cwd: umamiDir,
    stdio: 'inherit',
  })

  // 5. Build Umami
  console.log('🔨 Building Umami production bundle...')
  execSync('npm run build', {
    cwd: umamiDir,
    stdio: 'inherit',
  })

  console.log('\n🎉 Umami Analytics setup complete!')
  console.log('----------------------------------------------------')
  console.log('Next steps:')
  console.log('1. Ensure PostgreSQL database "umami_db" exists:')
  console.log('   psql -U postgres -c "CREATE DATABASE umami_db;"')
  console.log('2. Start both IdentifYou and Umami together with PM2:')
  console.log('   pm2 start ecosystem.config.cjs')
  console.log('   pm2 status')
  console.log('3. Access Umami at: http://localhost:3001')
  console.log('   Default Login: admin / umami')
  console.log('----------------------------------------------------\n')
}

setupUmami().catch((err) => {
  console.error('❌ Failed to setup Umami:', err)
  process.exit(1)
})
