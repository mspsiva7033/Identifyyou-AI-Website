const path = require('path')
const fs = require('fs')

// Auto-detect umami directory: either inside project './umami' or sister directory '/var/www/umami'
const localUmami = path.resolve(__dirname, 'umami')
const umamiCwd = fs.existsSync(localUmami) ? localUmami : '/var/www/umami'
const hasUmami = fs.existsSync(umamiCwd)

const apps = [
  {
    name: 'identifyyou',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: __dirname,
    instances: 1, // Set to 'max' for high-RAM multi-core VPS
    exec_mode: 'fork', // Set to 'cluster' if instances > 1
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    max_memory_restart: '800M',
    restart_delay: 5000,
  },
]

// Automatically attach Umami Analytics to PM2 if the directory exists
if (hasUmami) {
  apps.push({
    name: 'umami',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3001',
    cwd: umamiCwd,
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    max_memory_restart: '500M',
    restart_delay: 5000,
  })
}

module.exports = { apps }
