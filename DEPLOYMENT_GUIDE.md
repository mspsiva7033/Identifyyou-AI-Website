# Complete Production Deployment Guide: Next.js + Payload CMS + Self-Hosted Umami on VPS (Ubuntu/Debian)

This comprehensive guide covers the full deployment of the **IdentifYou Next.js + Payload CMS** web application and **Umami Analytics** on a single Ubuntu VPS (Hostinger, Hetzner, DigitalOcean, AWS EC2, or any Linux VPS).

---

## 🏗️ Architecture Overview

| Component | Technology | Default Port | Internal URL / Target | Public URL |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend & Payload CMS** | Next.js 15 + Payload 3.88 | `3000` | `http://127.0.0.1:3000` | `https://yourdomain.com` |
| **Analytics Engine** | Umami (Node.js service via PM2) | `3001` | `http://127.0.0.1:3001` | `https://analytics.yourdomain.com` |
| **Primary Database** | PostgreSQL 16+ (Local service) | `5432` | `identifyyou` DB | Internal only (`127.0.0.1`) |
| **Analytics Database** | PostgreSQL 16+ (Local service) | `5432` | `umami_db` DB | Internal only (`127.0.0.1`) |
| **Process Manager** | PM2 (Dual-App Ecosystem) | - | Manages both Port 3000 & 3001 | Auto-restart daemon |
| **Reverse Proxy & SSL** | Nginx + Certbot | `80`, `443` | Reverse proxy to ports 3000 & 3001 | Public Web |

---

## 📋 Table of Contents
1. [Prerequisites & DNS Configuration](#1-prerequisites--dns-configuration)
2. [Step 1: VPS Base Setup & Security](#step-1-vps-base-setup--security)
3. [Step 2: Install Node.js, PM2, PostgreSQL & Nginx](#step-2-install-nodejs-pm2-postgresql--nginx)
4. [Step 3: Setup PostgreSQL for App and Umami](#step-3-setup-postgresql-for-app-and-umami)
5. [Step 4: Deploy IdentifYou Next.js & Payload CMS](#step-4-deploy-identifyou-nextjs--payload-cms)
6. [Step 5: Setup & Deploy Umami Analytics with PM2](#step-5-setup--deploy-umami-analytics-with-pm2)
7. [Step 6: Configure Nginx & Free SSL (Let's Encrypt)](#step-6-configure-nginx--free-ssl-lets-encrypt)
8. [Step 7: Verification & Testing](#step-7-verification--testing)
9. [Step 8: Automated Backups & Routine Maintenance](#step-8-automated-backups--routine-maintenance)
10. [Troubleshooting & Common Pitfalls](#troubleshooting--common-pitfalls)

---

## 1. Prerequisites & DNS Configuration

Before beginning on the server, configure your domain's DNS records at your domain registrar (Hostinger, Cloudflare, GoDaddy, Namecheap, etc.):

| Type | Host / Name | Value / Points To | TTL | Note |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or `yourdomain.com`) | `YOUR_VPS_PUBLIC_IP` | Automatic / 300 | Main site |
| **A** | `www` | `YOUR_VPS_PUBLIC_IP` | Automatic / 300 | WWW redirect |
| **A** | `analytics` | `YOUR_VPS_PUBLIC_IP` | Automatic / 300 | Umami dashboard & tracking script |

*(DNS propagation usually takes 5 to 30 minutes).*

---

## Step 1: VPS Base Setup & Security

Log in to your VPS via SSH:
```bash
ssh root@YOUR_VPS_PUBLIC_IP
```

### 1.1 Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip htop ufw software-properties-common ca-certificates gnupg lsb-release
```

### 1.2 Setup Swap Memory (Crucial for Next.js builds on 1GB - 4GB RAM VPS)
Next.js builds and TypeScript checking require noticeable memory. Adding a 2GB–4GB swapfile prevents "Out of Memory" (OOM) compilation crashes:
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make swap permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 1.3 Configure Firewall (UFW)
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable           # Type 'y' when prompted
```

---

## Step 2: Install Node.js, PM2, Git & Nginx

### 2.1 Install Node.js 20 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # Should output v20.x.x
npm -v
```

### 2.2 Install PM2 Process Manager globally
```bash
sudo npm install -g pm2
```

### 2.3 Install Nginx & Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## Step 3: Setup PostgreSQL for App and Umami

### 3.1 Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### 3.2 Create Databases & Users
Open the PostgreSQL command line:
```bash
sudo -u postgres psql
```

Run the following SQL commands (replace `SECURE_PASSWORD_1` and `SECURE_PASSWORD_2` with strong random passwords):

```sql
-- 1. IDENTIFYOUT NEXT.JS / PAYLOAD CMS DATABASE
CREATE DATABASE identifyyou;
CREATE USER identifyyou_user WITH ENCRYPTED PASSWORD 'SECURE_PASSWORD_1';
GRANT ALL PRIVILEGES ON DATABASE identifyyou TO identifyyou_user;
\c identifyyou
GRANT ALL ON SCHEMA public TO identifyyou_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO identifyyou_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO identifyyou_user;

-- 2. UMAMI ANALYTICS DATABASE
CREATE DATABASE umami_db;
CREATE USER umami_user WITH ENCRYPTED PASSWORD 'SECURE_PASSWORD_2';
GRANT ALL PRIVILEGES ON DATABASE umami_db TO umami_user;
\c umami_db
GRANT ALL ON SCHEMA public TO umami_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO umami_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO umami_user;

\q
```

---

## Step 4: Deploy IdentifYou Next.js & Payload CMS

### 4.1 Clone Repository
Create the web root directory and clone the repository:
```bash
sudo mkdir -p /var/www/identifyyou
sudo chown -R $USER:$USER /var/www/identifyyou
git clone -b dev https://github.com/sivamsp5820/identifyyou-nextjs.git /var/www/identifyyou
cd /var/www/identifyyou
```

### 4.2 Configure Environment Variables (`.env.local`)
Create your production `.env.local`:
```bash
nano /var/www/identifyyou/.env.local
```

Fill in the exact values:
```env
# ----------------------------------------------------------------------
# DATABASE (Local PostgreSQL on VPS)
# ----------------------------------------------------------------------
DATABASE_URI=postgresql://identifyyou_user:SECURE_PASSWORD_1@127.0.0.1:5432/identifyyou

# ----------------------------------------------------------------------
# PAYLOAD CMS CONFIGURATION
# ----------------------------------------------------------------------
# Generate a random 32+ character key: openssl rand -base64 32
PAYLOAD_SECRET=your_generated_random_payload_secret_32_chars_minimum

# ----------------------------------------------------------------------
# DOMAIN & SERVER URLS
# ----------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# ----------------------------------------------------------------------
# UMAMI ANALYTICS (Bare-Metal PM2 on Port 3001)
# ----------------------------------------------------------------------
NEXT_PUBLIC_UMAMI_HOST_URL=https://analytics.yourdomain.com
# Leave NEXT_PUBLIC_UMAMI_WEBSITE_ID empty initially; fill in after Step 5!
NEXT_PUBLIC_UMAMI_WEBSITE_ID=

# ----------------------------------------------------------------------
# EMAIL / SMTP (Contact Form & Notifications)
# ----------------------------------------------------------------------
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your_email_password
SMTP_FROM=contact@yourdomain.com
CONTACT_EMAIL_TO=office@yourdomain.com

# ----------------------------------------------------------------------
# DATABASE BACKUPS
# ----------------------------------------------------------------------
BACKUP_KEEP=10
```

Save with `Ctrl+O`, `Enter`, and exit with `Ctrl+X`.

### 4.3 Ensure Media Upload Directories Exist & Have Permissions
When using local storage for media uploads, ensure the directories exist and are writable:
```bash
mkdir -p /var/www/identifyyou/public/media
chmod -R 775 /var/www/identifyyou/public/media
```

### 4.4 Install Dependencies, Build & Initialize Database
```bash
cd /var/www/identifyyou
npm install
npm run build
npm run db:init
```

*(Note: `npm run db:init` ensures all required PostgreSQL tables and schemas are created before launching PM2!).*

### 4.5 Optional: Seed Initial Content
If you want to seed default case studies, blogs, and settings:
```bash
npm run seed
```

---

## Step 5: Setup & Deploy Umami Analytics with PM2

Umami runs natively alongside IdentifYou on port `3001`, completely without Docker.

### 5.1 Run Automated Umami Setup
Inside your project directory, run the built-in setup script:
```bash
cd /var/www/identifyyou
npm run umami:setup
```

This single command will automatically:
1. Clone the lightweight Umami repository into `/var/www/identifyyou/umami`.
2. Generate `./umami/.env` with your PostgreSQL database `umami_db` and a secure random `APP_SECRET`.
3. Install Umami dependencies (`npm install`).
4. Build the production Umami bundle (`npm run build`).

### 5.2 Start Both Applications with PM2
The repository includes a ready-to-use `ecosystem.config.cjs` that automatically starts both **IdentifYou (Port 3000)** and **Umami (Port 3001)**:

```bash
cd /var/www/identifyyou
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
# Run the copy-paste command printed by pm2 startup (if shown)
```

Verify that both applications are running:
```bash
pm2 status
```
You should see both processes listed as `online`:
* `identifyyou` (Port 3000)
* `umami` (Port 3001)

### 5.3 Configure Umami Dashboard & Connect Tracking
1. Visit `http://YOUR_VPS_IP:3001` (or `https://analytics.yourdomain.com` once Nginx is configured in Step 6).
2. Log in with the default credentials:
   - **Username:** `admin`
   - **Password:** `umami`
3. **Change the password immediately**: Click your avatar (top right) &rarr; **Profile** &rarr; Change Password.
4. Go to **Settings** &rarr; **Websites** &rarr; **Add Website**:
   - **Name:** `IdentifYou Technologies`
   - **Domain:** `yourdomain.com`
5. Click **Save**, then click the **Edit** button next to your website.
6. Copy your **Website ID** (UUID format, e.g., `b3b6f272-98e3-4f9e-a0e2-7634f1ec52c9`).
7. Update your `.env.local`:
   ```bash
   nano /var/www/identifyyou/.env.local
   ```
   Set:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-copied-website-id
   ```
8. Reload IdentifYou with PM2 so it picks up the tracking ID:
   ```bash
   pm2 restart identifyyou --update-env
   ```

---

## Step 6: Configure Nginx & Free SSL (Let's Encrypt)

### 6.1 Create Nginx Configuration for Main Website
```bash
sudo nano /etc/nginx/sites-available/identifyyou.conf
```

Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Allow large media file uploads in Payload CMS admin
    client_max_body_size 50M;

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

    # Cache static Next.js assets
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }
}
```

### 6.2 Create Nginx Configuration for Umami Analytics
```bash
sudo nano /etc/nginx/sites-available/umami.conf
```

Paste:
```nginx
server {
    listen 80;
    server_name analytics.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6.3 Enable Sites and Verify Syntax
```bash
sudo ln -s /etc/nginx/sites-available/identifyyou.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/umami.conf /etc/nginx/sites-enabled/

# Remove default nginx site if still present
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 6.4 Install Let's Encrypt SSL Certificates with Certbot
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d analytics.yourdomain.com
```
Certbot will ask for an email for renewal notices and will automatically update the Nginx configuration to force HTTPS redirects.

Certbot automatically schedules an auto-renewal cronjob. You can verify renewal with:
```bash
sudo certbot renew --dry-run
```

---

## Step 7: Verification & Testing

### 7.1 Verify Main Website
- Visit `https://yourdomain.com` in your browser.
- Verify pages: `/`, `/capabilities/vision-ai`, `/industries/manufacturing`, `/blogs-and-news`, `/contact`.

### 7.2 Verify Payload CMS Admin
- Visit `https://yourdomain.com/admin`.
- Create your first admin user account (prompted on first visit).
- Check **Media**, **Blogs & News**, **Case Studies**, and **Analytics Dashboard**.

### 7.3 Verify Umami Tracking
1. Open developer tools (F12) on `https://yourdomain.com`.
2. Inspect **Network** tab -> Filter for `script.js`.
3. You should see `https://analytics.yourdomain.com/script.js` loading with HTTP 200.
4. Navigate across a couple of pages.
5. In another tab, open `https://analytics.yourdomain.com` -> You should see realtime active visitors and page views immediately registering!

---

## Step 8: Automated Backups & Routine Maintenance

### 8.1 Database Backup Script
This repository includes a database backup utility:
```bash
cd /var/www/identifyyou
npm run db:backup
```
The backup creates a timestamped SQL dump in `/var/www/identifyyou/backups/`.

### 8.2 Automate Daily Backups via Crontab
To run an automated backup every night at 2:00 AM:
```bash
crontab -e
```
Add:
```cron
0 2 * * * cd /var/www/identifyyou && npm run db:backup >> /var/log/identifyyou_backup.log 2>&1
```

### 8.3 Application Updates Workflow (Deploying New Git Commits)
Whenever you push changes to GitHub (`dev` or `master`), update your VPS in 4 commands:
```bash
cd /var/www/identifyyou
git pull origin dev
npm install
npm run build
pm2 reload identifyyou
```

---

## Troubleshooting & Common Pitfalls

| Issue | Cause | Resolution |
| :--- | :--- | :--- |
| **`npm run build` fails / Killed** | Out of RAM during Next.js compilation | Enable 4GB swapfile (see [Step 1.2](#12-setup-swap-memory-crucial-for-nextjs-builds-on-1gb---4gb-ram-vps)). |
| **502 Bad Gateway on Main Site** | Next.js process not running on port 3000 | Check `pm2 status` and `pm2 logs identifyyou`. Verify database credentials in `.env.local`. |
| **502 Bad Gateway on Analytics** | Umami Docker container stopped | Run `sudo docker compose logs -f` in `/opt/umami`. Verify `DATABASE_URL`. |
| **Payload CMS File Upload Fails (413 Request Entity Too Large)** | Nginx blocking upload above 1MB | Add `client_max_body_size 50M;` to `/etc/nginx/sites-available/identifyyou.conf` and `sudo systemctl reload nginx`. |
| **Umami Tracking script not loading** | `NEXT_PUBLIC_UMAMI_HOST_URL` missing or SSL not configured on `analytics` subdomain | Verify `.env.local` contains `NEXT_PUBLIC_UMAMI_HOST_URL=https://analytics.yourdomain.com` and run `npm run build && pm2 reload identifyyou`. |
| **Missing Tables (relation "users" does not exist)** | Pending migrations not executed | Run `npm run db:init` (or `npm run db:migrate`) to apply initial migrations. |
| **PostgreSQL SSL Error** | SSL enabled on local Docker DB without SSL support | Set `DATABASE_SSL=false` in `.env` / environment variables. |

---

## 🐳 Alternative Deployment: Docker Compose (Bodhi Linux / Server)

If deploying using Docker Compose with the services `postgres` and `app`:

### 1. Environment Configuration (`.env`)
Create `.env` based on `.env.docker.example`:
```env
NODE_ENV=production
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=identifyyou
DATABASE_SSL=false
DATABASE_URI=postgres://postgres:your_secure_password@postgres:5432/identifyyou
PAYLOAD_SECRET=your_long_secure_payload_secret_32_chars_min
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

### 2. Build and Deploy
```bash
# 1. Take a database backup if an existing database volume is in use
docker compose exec postgres pg_dump -U postgres identifyyou > pre_deploy_backup.sql

# 2. Build updated images
docker compose build --no-cache

# 3. Start database and wait for healthy state
docker compose up -d postgres

# 4. Apply schema migrations safely
docker compose run --rm app npm run db:init

# 5. Start or update application
docker compose up -d app

# 6. Verify health
docker compose ps
curl -f http://localhost:3000/api/health/ready
```

