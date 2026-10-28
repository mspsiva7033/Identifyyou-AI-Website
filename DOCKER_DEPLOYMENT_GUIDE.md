# Complete Production Docker Deployment Guide
## IdentifYou Next.js 16 + Payload CMS 3 + PostgreSQL 16 + Umami Analytics

This guide provides an end-to-end, enterprise-ready walkthrough for deploying the **IdentifYou Technologies** platform inside Docker containers on any Linux VPS or Dedicated Cloud Server (Hostinger VPS, Ubuntu, Debian, AWS EC2, DigitalOcean, Hetzner, etc.).

---

## 📋 Table of Contents
1. [Architecture & Topology](#1-architecture--topology)
2. [Server Requirements & Sizing](#2-server-requirements--sizing)
3. [VPS Initialization & Security Hardening](#3-vps-initialization--security-hardening)
4. [Docker & Compose Installation](#4-docker--compose-installation)
5. [Project Cloning & Environment Configuration](#5-project-cloning--environment-configuration)
6. [Dockerfile & Compose Architecture Breakdown](#6-dockerfile--compose-architecture-breakdown)
7. [Building & Launching the Stack](#7-building--launching-the-stack)
8. [First-Time Onboarding & Setup](#8-first-time-onboarding--setup)
   - [8.1 Super-Admin Creation in Payload](#81-super-admin-creation-in-payload)
   - [8.2 Umami Analytics Configuration](#82-umami-analytics-configuration)
9. [Host Nginx Reverse Proxy & SSL (Let's Encrypt)](#9-host-nginx-reverse-proxy--ssl-lets-encrypt)
10. [Media Storage & Persistent Volumes](#10-media-storage--persistent-volumes)
11. [Database Backups, Migrations & Disaster Recovery](#11-database-backups-migrations--disaster-recovery)
12. [CI/CD & Zero-Downtime Updates](#12-cicd--zero-downtime-updates)
13. [Troubleshooting & Diagnostics](#13-troubleshooting--diagnostics)

---

## 1. Architecture & Topology

The production setup uses a dual-layer approach:
- **Host Layer:** Nginx reverse proxy with automated Let's Encrypt SSL certificates, UFW firewall, and 4GB Swap file.
- **Docker Layer:** 3 isolated containers connected through an internal Docker bridge network (`identifyyou_network`).

```text
                                 ┌─────────────────────────────────┐
                                 │       Public Internet           │
                                 │   https://yourdomain.com        │
                                 │   https://analytics.yourdomain  │
                                 └───────────────┬─────────────────┘
                                                 │ Ports 80, 443 (SSL)
                                                 ▼
               ┌─────────────────────────────────────────────────────────────────┐
               │              HOST OS (Ubuntu 22.04 / 24.04 LTS)                 │
               │                                                                 │
               │  [ UFW Firewall: 22, 80, 443 ]      [ 4GB Swap Memory ]         │
               │                                                                 │
               │  [ Nginx Reverse Proxy + Let's Encrypt SSL (Certbot) ]          │
               │        │                                        │               │
               │        │ Proxy to 127.0.0.1:3000                │ Proxy: 3001   │
               │        ▼                                        ▼               │
               │  ┌───────────────────────────┐    ┌──────────────────────────┐  │
               │  │ Container: identifyyou_app│    │ Container: identifyyou_  │  │
               │  │ (Next.js 16 + Payload CMS)│    │              umami       │  │
               │  └─────────────┬─────────────┘    └────────────┬─────────────┘  │
               │                │                               │                │
               │                │   Docker Bridge Network       │                │
               │                └───────────────┬───────────────┘                │
               │                                ▼                                │
               │                 ┌─────────────────────────────┐                 │
               │                 │ Container: identifyyou_db   │                 │
               │                 │ (PostgreSQL 16 Alpine)      │                 │
               │                 │  - DB 1: identifyyou        │                 │
               │                 │  - DB 2: umami_db           │                 │
               │                 └──────────────┬──────────────┘                 │
               │                                │                                │
               │     Named Volumes:             ▼                                │
               │     - identifyyou_postgres_data (Persistent Database)           │
               │     - identifyyou_media_uploads (Persistent Uploaded Media)     │
               └─────────────────────────────────────────────────────────────────┘
```

---

## 2. Server Requirements & Sizing

| Metric | Minimum Recommended | Production Recommended |
| :--- | :--- | :--- |
| **CPU** | 2 vCPU | 4 vCPU |
| **RAM** | 2 GB (+ 4GB Swap mandatory) | 4 GB - 8 GB RAM |
| **Disk** | 20 GB SSD / NVMe | 50+ GB NVMe |
| **Operating System** | Ubuntu 22.04 / 24.04 LTS | Ubuntu 24.04 LTS 64-bit |
| **Node / Docker** | Docker Engine 24+ & Compose v2 | Docker Engine 27+ & Compose v2 |

> [!IMPORTANT]
> **Next.js & Webpack Build Memory:**
> Compiling Next.js with Payload CMS admin bundles requires significant memory during `docker build`. On servers with 2GB RAM, configuring a **4GB Swap file** is strictly required to prevent the Linux Out-Of-Memory (OOM) killer from terminating the build.

---

## 3. VPS Initialization & Security Hardening

Connect to your server via SSH:
```bash
ssh root@YOUR_SERVER_IP
```

### 3.1 Update OS Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ufw nginx certbot python3-certbot-nginx ca-certificates gnupg
```

### 3.2 Configure 4GB Swap File
```bash
# Check if swap already exists
swapon --show

# If none, create 4GB swap
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent across reboots
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Optimize swap aggressiveness
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

### 3.3 Configure UFW Firewall
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp     # SSH (adjust if using custom port)
sudo ufw allow 80/tcp     # HTTP for Let's Encrypt
sudo ufw allow 443/tcp    # HTTPS
sudo ufw --force enable
sudo ufw status
```

---

## 4. Docker & Compose Installation

If Docker is not pre-installed on your VPS template:

```bash
# 1. Add official Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 2. Add repository to Apt sources
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Install Docker Engine and Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Verify installation
docker --version
docker compose version
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 5. Project Cloning & Environment Configuration

### 5.1 Clone Repository
```bash
# Standard directory
sudo mkdir -p /var/www/identifyyou
sudo chown -R $USER:$USER /var/www/identifyyou
git clone https://github.com/sivamsp5820/identifyyou-nextjs.git /var/www/identifyyou
cd /var/www/identifyyou
```

### 5.2 Configure `.env`
Copy the dedicated Docker environment template:
```bash
cp .env.docker.example .env
nano .env
```

Set your production values:

```env
# ======================================================================
# 1. POSTGRESQL DATABASE CREDENTIALS
# ======================================================================
POSTGRES_USER=identifyyou
# Replace with a strong, random password:
POSTGRES_PASSWORD=YourStrongDatabasePassword123!#
DATABASE_SSL=false

# ======================================================================
# 2. PAYLOAD CMS SECRET (Generate: openssl rand -base64 32)
# ======================================================================
PAYLOAD_SECRET=p9xX8bFq7zN3kLm2WvR4tYsA6cD1eH0g9K2mP5vL8xQ=

# ======================================================================
# 3. PRODUCTION DOMAIN & URLS
# ======================================================================
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# ======================================================================
# 4. UMAMI ANALYTICS CONFIGURATION
# ======================================================================
# Random 32+ char secret for Umami encryption
UMAMI_APP_SECRET=umami_secret_key_random_32_characters_here
NEXT_PUBLIC_UMAMI_HOST_URL=https://analytics.yourdomain.com
# Leave blank on first boot; populated in Step 8.2 after creating the website in Umami
NEXT_PUBLIC_UMAMI_WEBSITE_ID=

# ======================================================================
# 5. EMAIL NOTIFICATIONS (Microsoft Graph API & Optional SMTP)
# ======================================================================
MS_GRAPH_TENANT_ID=your_azure_tenant_id_here
MS_GRAPH_CLIENT_ID=your_azure_client_id_here
MS_GRAPH_CLIENT_SECRET=your_azure_client_secret_here
MS_GRAPH_SENDER_EMAIL=notifications@yourdomain.com
CONTACT_EMAIL_TO=office@yourdomain.com
MS_GRAPH_SAVE_TO_SENT_ITEMS=true

# Optional: SMTP fallback (Hostinger Mail, Google Workspace, etc.)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your_email_password
SMTP_FROM=contact@yourdomain.com
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

---

## 6. Dockerfile & Compose Architecture Breakdown

### 6.1 Multi-Stage `Dockerfile`
The platform uses a 4-stage build to minimize image size and protect build secrets:

1. **`base`**: Node 20 LTS slim base with `openssl`, `ca-certificates`, and `curl` for Sharp native bindings and container healthcheck.
2. **`deps`**: Runs `npm install --ignore-scripts` followed by `node scripts/patch-payload-hydration.js` for clean Payload CMS client hydration.
3. **`builder`**: Ingests build arguments (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_UMAMI_HOST_URL`) and produces the Next.js production build (`npm run build`).
4. **`runner`**: Lightweight runtime containing only production assets, creating `/app/public/media` volume mount point, built-in curl healthcheck at `/api/health/live`, and executes `npm run start`.

### 6.2 `docker-compose.yml` Services
- **`postgres` (`identifyyou_db`)**:
  - Image: `postgres:16-alpine`
  - Mounts `./docker/init-db.sql` into `/docker-entrypoint-initdb.d/init-db.sql` to initialize both `identifyyou` and `umami_db` automatically.
  - Bound only to `127.0.0.1:5432` for local host security (not exposed to the public internet).
  - Healthcheck: `pg_isready` before dependent apps boot.
- **`umami` (`identifyyou_umami`)**:
  - Image: `ghcr.io/umami-software/umami:postgresql-latest`
  - Connected to internal database `postgres:5432/umami_db`.
  - Exposed locally on `127.0.0.1:3001`.
- **`app` (`identifyyou_app`)**:
  - Built from project `Dockerfile`.
  - Connected to internal database `postgres:5432/identifyyou`.
  - Exposed locally on `127.0.0.1:3000`.
  - Mounts persistent volume `identifyyou_media_uploads` to `/app/public/media`.
  - Healthcheck query on `/api/health/live`.

---

## 7. Building & Launching the Stack

From `/var/www/identifyyou`:

```bash
# 1. Build and launch all containers in detached mode
docker compose up -d --build

# 2. Check container status
docker compose ps
```

Expected output:
```text
NAME                IMAGE                                               COMMAND                  SERVICE    STATUS
identifyyou_db      postgres:16-alpine                                  "docker-entrypoint.s…"   postgres   Up (healthy)
identifyyou_umami   ghcr.io/umami-software/umami:postgresql-latest     "docker-entrypoint.s…"   umami      Up
identifyyou_app     identifyyou-nextjs-app                              "docker-entrypoint.s…"   app        Up (healthy)
```

### Inspect Container Logs
```bash
# View combined live logs
docker compose logs -f

# View application logs only
docker compose logs -f app

# View database logs only
docker compose logs -f postgres
```

### Run Health Diagnostic
Test that the Next.js and Payload health APIs respond on localhost:
```bash
curl -I http://127.0.0.1:3000/api/health/live
# Expected: HTTP/1.1 200 OK

curl http://127.0.0.1:3000/api/health/ready
# Expected: {"status":"ready","database":"connected","payload":"ready",...}
```

---

## 8. First-Time Onboarding & Setup

### 8.1 Super-Admin Creation in Payload
1. Ensure your host reverse proxy or temporary SSH port-forwarding is active:
   ```bash
   # From your local machine (if Nginx SSL is not yet configured):
   ssh -L 3000:127.0.0.1:3000 root@YOUR_SERVER_IP
   ```
2. In your browser, open `http://localhost:3000/admin` (or `https://yourdomain.com/admin`).
3. Payload CMS will display the **"Create First User"** setup screen:
   - **Email:** `admin@yourdomain.com` (or your company email)
   - **Password:** Enter a strong password
   - **Confirm Password:** Re-enter password
4. Click **Create**. The user bootstrap guard automatically designates this initial account as `superadmin`.

### 8.2 Umami Analytics Configuration
1. Open `http://YOUR_SERVER_IP:3001` (or `https://analytics.yourdomain.com`).
2. Log in with initial Umami credentials:
   - **Username:** `admin`
   - **Password:** `umami`
3. Click your profile icon and **Change Password** immediately.
4. Navigate to **Settings** -> **Websites** -> **Add Website**:
   - **Name:** `IdentifYou Technologies`
   - **Domain:** `yourdomain.com`
5. Click **Save**, then click the **Edit** icon next to the website.
6. Copy the **Website ID** (UUID format, e.g. `c4b1e5a8-201a-4d43-982c-15a9b7c8df01`).
7. Update `.env`:
   ```bash
   nano /var/www/identifyyou/.env
   ```
   Set:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=c4b1e5a8-201a-4d43-982c-15a9b7c8df01
   ```
8. Rebuild and restart the app container to bake in the Website ID:
   ```bash
   docker compose up -d --build app
   ```

---

## 9. Host Nginx Reverse Proxy & SSL (Let's Encrypt)

Host Nginx securely terminates SSL, proxies traffic to the internal Docker ports, and enforces asset caching.

### 9.1 DNS Setup
Ensure DNS A records point to your VPS IP:
- `@` -> `YOUR_SERVER_IP`
- `www` -> `YOUR_SERVER_IP`
- `analytics` -> `YOUR_SERVER_IP`

### 9.2 Main Site Configuration
Create `/etc/nginx/sites-available/identifyyou.conf`:
```bash
sudo nano /etc/nginx/sites-available/identifyyou.conf
```

Paste the following configuration (replace `yourdomain.com` with your actual domain):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Allow up to 50MB for Payload CMS media uploads
    client_max_body_size 50M;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Next.js Application & Payload Admin Proxy
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

    # Next.js Static Asset Caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }

    # Uploaded Media Serving & Caching
    location /media/ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        access_log off;
    }
}
```

### 9.3 Umami Subdomain Configuration
Create `/etc/nginx/sites-available/umami.conf`:
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

### 9.4 Enable Sites & Issue Free SSL Certificates
```bash
# Enable configs
sudo ln -s /etc/nginx/sites-available/identifyyou.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/umami.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Issue Let's Encrypt SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d analytics.yourdomain.com
```

Certbot will automatically verify domains, issue SSL certificates, and configure HTTPS redirection.

---

## 10. Media Storage & Persistent Volumes

Payload CMS saves uploaded images and documents into the container at `/app/public/media`.
In `docker-compose.yml`, this directory is backed by the named volume **`identifyyou_media_uploads`**:

```yaml
volumes:
  - media_uploads:/app/public/media
```

### Inspecting Media on the Host
Docker stores named volumes in `/var/lib/docker/volumes/identifyyou_media_uploads/_data`:
```bash
sudo ls -lh /var/lib/docker/volumes/identifyyou_media_uploads/_data
```

### Backing Up Uploaded Media
To create a compressed tarball backup of all uploaded media:
```bash
tar -czvf /var/www/identifyyou/media_backup_$(date +%F).tar.gz -C /var/lib/docker/volumes/identifyyou_media_uploads/_data .
```

---

## 11. Database Backups, Migrations & Disaster Recovery

### 11.1 On-Demand Database Backup
Run `pg_dump` directly inside the database container without installing PostgreSQL client on the host:
```bash
docker exec -t identifyyou_db pg_dump -U identifyyou identifyyou > /var/www/identifyyou/backups/db_backup_$(date +%F_%H%M%S).sql
```

### 11.2 Automated Daily Cron Backup
Create a backup directory and automated script:
```bash
mkdir -p /var/www/identifyyou/backups
nano /var/www/identifyyou/scripts/backup_cron.sh
```

Paste:
```bash
#!/bin/bash
BACKUP_DIR="/var/www/identifyyou/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p $BACKUP_DIR

# Backup PostgreSQL database
docker exec -t identifyyou_db pg_dump -U identifyyou identifyyou > "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Keep only the last 14 days of backups
find $BACKUP_DIR -name "db_*.sql" -mtime +14 -exec rm {} \;
```

Make executable and add to crontab:
```bash
chmod +x /var/www/identifyyou/scripts/backup_cron.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/identifyyou/scripts/backup_cron.sh") | crontab -
```

### 11.3 Restoring Database from SQL Dump
```bash
# Copy dump into database container
cat /path/to/backup.sql | docker exec -i identifyyou_db psql -U identifyyou -d identifyyou
```

### 11.4 Running Migrations Inside Container
```bash
docker compose exec app npm run db:migrate
```

### 11.5 Seeding Data Inside Container
```bash
docker compose exec app npm run seed
```

---

## 12. CI/CD & Zero-Downtime Updates

To deploy new code updates from GitHub without service disruption:

```bash
cd /var/www/identifyyou

# 1. Pull latest code from production branch
git pull origin main

# 2. Rebuild and restart the Next.js app container
docker compose up -d --build app

# 3. Clean up dangling images to save disk space
docker image prune -f
```

The database container (`identifyyou_db`) remains untouched and active throughout the update.

---

## 13. Troubleshooting & Diagnostics

### Container Fails to Start (Status `Restarting`)
Check the container logs:
```bash
docker compose logs app
```

Common causes:
1. **Missing Environment Variable:** If `PAYLOAD_SECRET` or `POSTGRES_PASSWORD` is missing in `.env`, the startup process terminates immediately with an explanatory error.
2. **Database Connection Refusal:** Ensure `postgres` service is running and healthy: `docker compose ps postgres`.
3. **Out of Memory During Build:** If the build fails with `Killed` or `SIGKILL`, confirm that swap memory is active: `free -h`.

### Database Connection Issues
Test database connectivity directly from the application container:
```bash
docker compose exec app node -e "
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URI });
  pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('Connection Error:', err);
    else console.log('DB Connected successfully:', res.rows[0]);
    pool.end();
  });
"
```

### Resetting Administrator Password
If you ever need to reset an admin account password via CLI:
```bash
docker compose exec app npm run admin:reset-password
```

---

## 14. Deployment Summary Checklist

- [ ] VPS provisioned with Ubuntu 22.04 / 24.04 LTS
- [ ] 4GB Swap file active (`free -h`)
- [ ] UFW firewall enabled (`ufw status`) with ports 22, 80, 443 open
- [ ] Docker Engine and Compose v2 installed
- [ ] Repository cloned to `/var/www/identifyyou`
- [ ] Production `.env` populated with strong secrets
- [ ] Containers running healthy: `docker compose up -d --build`
- [ ] Super-Admin registered at `https://yourdomain.com/admin`
- [ ] Umami password updated & Website ID configured in `.env`
- [ ] Host Nginx configured for `yourdomain.com` and `analytics.yourdomain.com`
- [ ] Let's Encrypt SSL certificates issued via `certbot --nginx`
- [ ] Daily automated database backup cron job configured
