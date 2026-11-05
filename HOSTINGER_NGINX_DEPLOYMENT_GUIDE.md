# Hostinger VPS Native Nginx + PM2 Complete Deployment & Seeding Guide
## IdentifYou Next.js 15 + Payload CMS 3 + PostgreSQL

This guide provides the complete, production-ready, step-by-step instructions to deploy the **IdentifYou Website** natively using **Nginx reverse proxy, Node.js 20 LTS, PM2 process manager, and PostgreSQL** on a **Hostinger Ubuntu VPS** (or any Ubuntu 22.04 / 24.04 VPS).

---

## 🏛️ System Architecture

```text
[ Browser / Public Visitors ]
             │  (HTTPS Port 443 & HTTP Port 80)
             ▼
[ Host Nginx Reverse Proxy + Let's Encrypt SSL ]
  - Enforces client_max_body_size 50M (Image uploads)
  - Caches /_next/static/ assets
             │  (Proxy pass: http://127.0.0.1:3000)
             ▼
[ PM2 Process Manager: "identifyyou" ]
  - Next.js 15 App Router + Payload CMS 3
  - Upload directory: /var/www/identifyyou/public/media/
             │  (PostgreSQL Connection URI)
             ▼
[ PostgreSQL Database ]
  - Option A: Remote Supabase Cloud PostgreSQL (Recommended)
  - Option B: Local PostgreSQL 16 on VPS (127.0.0.1:5432)
```

---

## 📋 Table of Contents
1. [Prerequisites & DNS Configuration](#step-1-prerequisites--dns-configuration)
2. [Step 1: VPS Base Setup, Swap & Security](#step-2-vps-base-setup-swap--security)
3. [Step 2: Install Node.js 20 LTS & PM2](#step-3-install-nodejs-20-lts--pm2)
4. [Step 3: Database Selection (Supabase vs. Local PostgreSQL)](#step-4-database-selection)
5. [Step 4: Clone Code & Configure `.env.local`](#step-5-clone-code--configure-envlocal)
6. [Step 5: Initialize Database & Run Full Seeding](#step-6-initialize-database--run-full-seeding)
7. [Step 6: Build the Production Application](#step-7-build-the-production-application)
8. [Step 7: Launch Application with PM2](#step-8-launch-application-with-pm2)
9. [Step 8: Configure Nginx & Free SSL (Let's Encrypt)](#step-9-configure-nginx--free-ssl-lets-encrypt)
10. [Step 9: Final Verification & Post-Deployment Checklist](#step-10-final-verification--post-deployment-checklist)
11. [Step 10: Routine Updates & Maintenance (Git Pulls)](#step-11-routine-updates--maintenance-git-pulls)

---

## Step 1: Prerequisites & DNS Configuration

Before logging into your server, configure your domain's DNS in **Hostinger hPanel** (or your DNS registrar):

1. Go to **Hostinger hPanel** -> **Domains** -> your domain -> **DNS / Nameservers**.
2. Add or update these **A Records** pointing to your **Hostinger VPS IP Address**:

| Type | Name / Host | Points to | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (blank) | `YOUR_HOSTINGER_VPS_IP` | 300 | Main site (`identifyyou.ai`) |
| **A** | `www` | `YOUR_HOSTINGER_VPS_IP` | 300 | WWW subdomain |

*(Wait ~5 to 15 minutes for DNS propagation before setting up SSL).*

---

## Step 2: VPS Base Setup, Swap & Security

Connect to your VPS via SSH:
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### 2.1 Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget unzip htop ufw software-properties-common ca-certificates gnupg
```

### 2.2 Configure 4GB Swap Space (CRUCIAL!)
Next.js 15 compilation and TypeScript checks require RAM during `npm run build`. Creating a 4GB swap prevents `Out of Memory (OOM)` errors on entry/mid-tier VPS plans:
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent across server reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2.3 Setup UFW Firewall
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH access
sudo ufw allow 80/tcp     # HTTP web
sudo ufw allow 443/tcp    # HTTPS secure web
sudo ufw enable           # Type 'y' and press Enter
```

---

## Step 3: Install Node.js 20 LTS & PM2

### 3.1 Install Node.js 20 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v    # Should show v20.x.x
npm -v     # Should show v10.x.x
```

### 3.2 Install PM2 Process Manager
```bash
sudo npm install -g pm2
pm2 -v
```

---

## Step 4: Database Selection

Choose one of the two options below:

### Option A: Remote Supabase PostgreSQL (Recommended - Zero Maintenance)
If you are using Supabase Cloud PostgreSQL, no database installation on the VPS is needed! 
Simply ensure you have your connection string ready for `.env.local`:
```text
DATABASE_URI=postgresql://postgres.stlnxavuccvpnitwkohn:YOUR_PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

### Option B: Local PostgreSQL on the VPS
If you prefer running PostgreSQL natively on your Hostinger VPS:
```bash
sudo apt install -y postgresql postgresql-contrib

# Switch to postgres user and create database & user
sudo -u postgres psql
```
Inside the `psql` shell:
```sql
CREATE DATABASE identifyyou;
CREATE USER identifyyou_user WITH ENCRYPTED PASSWORD 'ChooseAStrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE identifyyou TO identifyyou_user;
ALTER DATABASE identifyyou OWNER TO identifyyou_user;
\q
```
Then your connection string in `.env.local` will be:
```text
DATABASE_URI=postgresql://identifyyou_user:ChooseAStrongPassword123!@127.0.0.1:5432/identifyyou
```

---

## Step 5: Clone Code & Configure `.env.local`

### 5.1 Clone Repository into `/var/www/identifyyou`
```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/YOUR_ORGANIZATION/YOUR_REPO.git identifyyou
cd /var/www/identifyyou
```

### 5.2 Set Folder Permissions for Uploads
Ensure your local media directory exists and has write permissions:
```bash
sudo mkdir -p /var/www/identifyyou/public/media
sudo chmod -R 775 /var/www/identifyyou/public/media
```

### 5.3 Install Node Dependencies
```bash
cd /var/www/identifyyou
npm install
```

### 5.4 Create Production `.env.local`
```bash
nano /var/www/identifyyou/.env.local
```

Paste your production environment variables (replace with your actual domain and credentials):

```env
# ----------------------------------------------------------------------
# 1. APPLICATION ENVIRONMENT
# ----------------------------------------------------------------------
NODE_ENV=production
PORT=3000

# ----------------------------------------------------------------------
# 2. DOMAIN & SERVER URLS (MUST MATCH YOUR LIVE DOMAIN)
# ----------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://identifyyou.ai
NEXT_PUBLIC_SERVER_URL=https://identifyyou.ai
PAYLOAD_PUBLIC_SERVER_URL=https://identifyyou.ai

# ----------------------------------------------------------------------
# 3. PAYLOAD CMS SECRET (Generate a random 32+ char hex string)
# ----------------------------------------------------------------------
PAYLOAD_SECRET=a8b3c9d0e1f234567890abcdef1234567890abcdef1234567890abcdef123456

# ----------------------------------------------------------------------
# 4. DATABASE CONNECTION
# ----------------------------------------------------------------------
# If using Supabase Cloud:
DATABASE_URI=postgresql://postgres.stlnxavuccvpnitwkohn:mspsiva9876%23@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
# OR if using local VPS Postgres:
# DATABASE_URI=postgresql://identifyyou_user:ChooseAStrongPassword123!@127.0.0.1:5432/identifyyou

# ----------------------------------------------------------------------
# 5. SUPABASE S3 STORAGE (Optional for cloud media backup)
# ----------------------------------------------------------------------
# Set USE_S3=true if you want uploads stored on Supabase S3 instead of VPS disk
USE_S3=false
S3_BUCKET=identifyyou
S3_ENDPOINT=https://stlnxavuccvpnitwkohn.storage.supabase.co
S3_REGION=ap-northeast-1
S3_ACCESS_KEY_ID=7dd17c9b634c3d6b6a01347489d9e0ad
S3_SECRET_ACCESS_KEY=9436ad254b12f7652fdfac60c986bf28ab0ced787b696ddb3002a0c92e1435f2

# ----------------------------------------------------------------------
# 6. EMAIL NOTIFICATIONS (Microsoft Graph / SMTP)
# ----------------------------------------------------------------------
MS_GRAPH_TENANT_ID=
MS_GRAPH_CLIENT_ID=
MS_GRAPH_CLIENT_SECRET=
MS_GRAPH_SENDER_EMAIL=ai.support@identifyyou.in
CONTACT_EMAIL_TO=ai.support@identifyyou.in
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

# ----------------------------------------------------------------------
# 7. ANALYTICS (Umami)
# ----------------------------------------------------------------------
NEXT_PUBLIC_UMAMI_HOST_URL=https://identifyyou.ai
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
```
Save and exit: press `Ctrl + O`, then `Enter`, then `Ctrl + X`.

---

## Step 6: Initialize Database & Run Full Seeding

This step creates all database schemas, tables, indexes, and seeds all 37 Case Studies, categories, admin user, and content.

### 6.1 Initialize Database Tables
```bash
cd /var/www/identifyyou
npm run db:init
```
*(You will see: `📦 Verifying PostgreSQL database tables & baseline migrations... Done`)*.

### 6.2 Seed the Entire Database
Run the automated seeder:
```bash
npm run seed
```
This automatically seeds:
- Default Admin Account: `admin@identifyyou.ai` / `IdentifYou@2026!`
- All 6 Success Story Categories (Vision AI, Industry Automation, Digital Engineering, etc.)
- All 37 Full Case Studies (including the 5 Digital Engineering stories)
- Deep Tech Capabilities & Manufacturing Solutions
- Leadership Team data

### 6.3 Run Production Readiness Verification
Verify everything is 100% healthy:
```bash
npm run test:prod
```
*(All tests should pass with 0 errors).*

---

## Step 7: Build the Production Application

### 7.1 Generate Payload Import Map
```bash
npm run generate:importmap
```

### 7.2 Run Next.js Production Build
```bash
npm run build
```
*(Next.js will compile all pages, server components, and static routes. Thanks to the 4GB swap space configured in Step 2, this will complete smoothly).*

---

## Step 8: Launch Application with PM2

### 8.1 Start Application via PM2 Ecosystem
The repository includes [`ecosystem.config.cjs`](file:///e:/identifyyou_website/identifyyou-nextjs/ecosystem.config.cjs) preconfigured for production:
```bash
cd /var/www/identifyyou
pm2 start ecosystem.config.cjs
```

### 8.2 Verify Process Status
```bash
pm2 status
```
You should see:
```text
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ identifyyou        │ fork     │ 0    │ online    │ 0%       │ 120mb    │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

Check logs to ensure Next.js is listening on port 3000:
```bash
pm2 logs identifyyou --lines 20
```

### 8.3 Make PM2 Auto-Start on System Reboots
```bash
pm2 save
pm2 startup
```
*(PM2 will output a `sudo env PATH=...` command &mdash; copy and paste that line into your terminal and press Enter).*

---

## Step 9: Configure Nginx & Free SSL (Let's Encrypt)

### 9.1 Install Nginx & Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 9.2 Create the Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/identifyyou.conf
```

Paste the following production configuration (replace `identifyyou.ai` with your actual domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name identifyyou.ai www.identifyyou.ai;

    # ------------------------------------------------------------------
    # CRITICAL: Allow up to 50MB for Payload CMS image uploads
    # ------------------------------------------------------------------
    client_max_body_size 50M;

    # ------------------------------------------------------------------
    # Reverse Proxy to Next.js Application (Port 3000)
    # ------------------------------------------------------------------
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # ------------------------------------------------------------------
    # Cache Static Next.js Assets for Performance
    # ------------------------------------------------------------------
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }
}
```
Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`).

### 9.3 Enable Nginx Configuration
```bash
sudo ln -s /etc/nginx/sites-available/identifyyou.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 9.4 Obtain Free Let's Encrypt SSL Certificate
```bash
sudo certbot --nginx -d identifyyou.ai -d www.identifyyou.ai
```
* Enter your email address for renewal notifications.
* Agree to terms (`y`).
* Choose `2` (Redirect HTTP to HTTPS automatically).

Certbot will automatically update the Nginx configuration with SSL keys, HSTS, and HTTP &rarr; HTTPS redirection. Certbot also sets up an automatic daily renewal timer.

---

## Step 10: Final Verification & Post-Deployment Checklist

Test your live deployment:

1. **Visit the Frontend:**
   * Open `https://identifyyou.ai/success-stories` in your browser.
   * Verify all case study cards display with industry tags, gradient overlays, and images.
2. **Visit the CMS Admin:**
   * Open `https://identifyyou.ai/admin`.
   * Log in using:
     * **Email:** `admin@identifyyou.ai`
     * **Password:** `IdentifYou@2026!`
3. **Test Creating a Case Study with an Image:**
   * Go to **Success Stories** &rarr; **Create New**.
   * Fill in **Title** and **Category**.
   * Expand the **"Detail Page Content"** section.
   * Upload an image to **"Thumbnail"** and **"Hero Image"**.
   * In the sidebar, set **Status** to **`Published`**.
   * Click **Publish Changes**.
   * Open `https://identifyyou.ai/success-stories` in an incognito window &rarr; your new card and uploaded image will appear immediately!

---

## Step 11: Routine Updates & Maintenance (Git Pulls)

Whenever you push new code to GitHub and want to update your live server:

### Quick Update Script
Save this script as `/var/www/identifyyou/deploy.sh`:
```bash
nano /var/www/identifyyou/deploy.sh
```

Paste:
```bash
#!/bin/bash
set -e

echo "🚀 Pulling latest changes from Git..."
cd /var/www/identifyyou
git pull origin main

echo "📦 Installing any new dependencies..."
npm install

echo "🛠️ Generating Payload import map..."
npm run generate:importmap

echo "🏗️ Building Next.js production bundle..."
npm run build

echo "🔄 Gracefully reloading PM2..."
pm2 reload identifyyou

echo "✅ Deployment completed successfully!"
```

Make it executable:
```bash
chmod +x /var/www/identifyyou/deploy.sh
```

Now, whenever you want to deploy updates in the future, just run:
```bash
/var/www/identifyyou/deploy.sh
```
*(Your `/public/media/` folder and uploaded images are untouched by git pull because they are safely protected in `.gitignore`).*

