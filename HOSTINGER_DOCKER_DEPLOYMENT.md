# Hostinger VPS: Complete Docker Container Deployment Guide
## IdentifYou Next.js 15 + Payload CMS 3 + Umami Analytics

This guide provides step-by-step instructions for deploying both the **IdentifYou Website (Next.js + Payload CMS)** and **Umami Analytics** inside **Docker containers** on a **Hostinger VPS**.

---

## 🏛️ System Architecture

All services run inside isolated Docker containers on a shared bridge network:

```text
[ Browser / Visitors ]
          │  (HTTPS Port 443 & HTTP Port 80)
          ▼
[ Host Nginx Reverse Proxy + Let's Encrypt SSL ]
    │                                    │
    │ (Proxy: 127.0.0.1:3000)             │ (Proxy: 127.0.0.1:3001)
    ▼                                    ▼
┌─────────────────────────┐        ┌─────────────────────────┐
│ Container:              │        │ Container:              │
│ identifyyou_app         │        │ identifyyou_umami       │
│ (Next.js + Payload CMS) │        │ (Umami Analytics)       │
└────────────┬────────────┘        └────────────┬────────────┘
             │                                  │
             │         Docker Bridge            │
             └───────────────┬──────────────────┘
                             ▼
              ┌─────────────────────────────┐
              │ Container: identifyyou_db   │
              │ (PostgreSQL 16)             │
              │  - DB 1: identifyyou        │
              │  - DB 2: umami_db           │
              │ Volume: identifyyou_postgres│
              └─────────────────────────────┘
```

---

## Step 1: Hostinger VPS Selection & DNS Setup

### 1.1 VPS Operating System in Hostinger hPanel
In your **Hostinger hPanel**:
1. Go to **VPS** -> **Manage**.
2. Under **Operating System**, you can choose:
   - **Option A (Fastest):** Select the template **"Ubuntu 22.04 with Docker"** (Docker and Docker Compose come pre-installed).
   - **Option B:** Vanilla **"Ubuntu 22.04 64bit"** or **"Ubuntu 24.04 64bit"**.

### 1.2 Setup DNS Records in Hostinger
Go to **Domains** -> your domain -> **DNS / Nameservers**, and add these **A Records** pointing to your **VPS IP**:

| Type | Name / Subdomain | Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank for root) | `YOUR_HOSTINGER_VPS_IP` | 300 |
| **A** | `www` | `YOUR_HOSTINGER_VPS_IP` | 300 |
| **A** | `analytics` | `YOUR_HOSTINGER_VPS_IP` | 300 |

*(Wait ~5–15 minutes for DNS to propagate).*

---

## Step 2: VPS Initial Setup & Installing Tools

Connect to your VPS via SSH:
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### 2.1 Update System & Enable Swap Memory (Crucial!)
To prevent Next.js image building from running out of RAM:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw nginx certbot python3-certbot-nginx

# Setup 4GB Swap file
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 2.2 Install Docker & Docker Compose (If not already installed)
```bash
# If you chose the Ubuntu with Docker template, verify with:
docker --version
docker compose version

# If not installed, install with one command:
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable docker && sudo systemctl start docker
```

### 2.3 Configure Firewall
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Step 3: Clone Project & Configure Environment

### 3.1 Clone the Repository
```bash
git clone -b dev https://github.com/sivamsp5820/identifyyou-nextjs.git /var/www/identifyyou
cd /var/www/identifyyou
```

### 3.2 Create the Docker `.env` file
Copy the docker example environment template:
```bash
cp .env.docker.example .env
nano .env
```

Set the values:
```env
# ----------------------------------------------------------------------
# 1. DATABASE
# ----------------------------------------------------------------------
POSTGRES_USER=identifyyou
POSTGRES_PASSWORD=CreateYourStrongPassword123!

# ----------------------------------------------------------------------
# 2. PAYLOAD SECRET (Generate a random string: openssl rand -base64 32)
# ----------------------------------------------------------------------
PAYLOAD_SECRET=p9xX8bFq7zN3kLm2WvR4tYsA6cD1eH0g

# ----------------------------------------------------------------------
# 3. DOMAIN & URLS (Replace yourdomain.com with your real domain)
# ----------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# ----------------------------------------------------------------------
# 4. UMAMI ANALYTICS
# ----------------------------------------------------------------------
UMAMI_APP_SECRET=random_32_characters_secret_for_umami_app
NEXT_PUBLIC_UMAMI_HOST_URL=https://analytics.yourdomain.com
# Leave NEXT_PUBLIC_UMAMI_WEBSITE_ID blank for initial startup; we add it in Step 5!
NEXT_PUBLIC_UMAMI_WEBSITE_ID=

# ----------------------------------------------------------------------
# 5. EMAIL NOTIFICATIONS (Microsoft Graph API & Optional SMTP)
# ----------------------------------------------------------------------
MS_GRAPH_TENANT_ID=your_azure_tenant_id_here
MS_GRAPH_CLIENT_ID=your_azure_client_id_here
MS_GRAPH_CLIENT_SECRET=your_azure_client_secret_here
MS_GRAPH_SENDER_EMAIL=notifications@yourdomain.com
CONTACT_EMAIL_TO=office@yourdomain.com
MS_GRAPH_SAVE_TO_SENT_ITEMS=true

# Optional: Hostinger SMTP (for Payload admin recovery)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your_hostinger_mailbox_password
SMTP_FROM=contact@yourdomain.com
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

---

## Step 4: Build & Launch Containers

From `/var/www/identifyyou`:
```bash
cd /var/www/identifyyou
docker compose up -d --build
```

### Check Container Status
```bash
docker compose ps
```
You should see all 3 containers running with `healthy` or `Up` status:
- `identifyyou_db` (Up, healthy)
- `identifyyou_umami` (Up)
- `identifyyou_app` (Up)

To check live logs:
```bash
docker compose logs -f
```

---

## Step 5: Setup Umami & Add Website ID

1. Open your browser and navigate to:
   `http://YOUR_HOSTINGER_VPS_IP:3001`
2. Log in with default Umami credentials:
   - **Username:** `admin`
   - **Password:** `umami`
3. Click your profile icon at the top right and **Change Password** immediately.
4. Go to **Settings** -> **Websites** -> **Add Website**:
   - **Name:** `IdentifYou Technologies`
   - **Domain:** `yourdomain.com` (your live domain)
5. Click **Save**, then click the **Edit** icon next to the website.
6. Copy the **Website ID** (looks like: `3fa85f64-5717-4562-b3fc-2c963f66afa6`).
7. Update `.env` in `/var/www/identifyyou`:
   ```bash
   nano /var/www/identifyyou/.env
   ```
   Set:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=3fa85f64-5717-4562-b3fc-2c963f66afa6
   ```
8. Rebuild and restart the Next.js app container:
   ```bash
   docker compose up -d --build app
   ```

---

## Step 6: Configure Host Nginx & SSL (Let's Encrypt)

Host Nginx will act as the secure entry point, handling SSL certificates and reverse-proxying requests to Docker.

### 6.1 Create Nginx Config for Next.js Website
```bash
sudo nano /etc/nginx/sites-available/identifyyou.conf
```
Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Allow up to 50MB for Payload CMS media uploads
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

    # Static assets caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }
}
```

### 6.2 Create Nginx Config for Umami Analytics
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

### 6.3 Enable Sites and Test Nginx
```bash
sudo ln -s /etc/nginx/sites-available/identifyyou.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/umami.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 6.4 Issue Free Let's Encrypt SSL Certificates
Run Certbot:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d analytics.yourdomain.com
```
Enter your email address and accept terms. Certbot will automatically issue certificates and configure SSL in Nginx!

---

## Step 7: Verification Checklist

1. **Main Website**: Visit `https://yourdomain.com` (SSL locked, loads fast).
2. **Payload CMS Admin**: Visit `https://yourdomain.com/admin` (Sign up your first master admin account).
3. **Umami Dashboard**: Visit `https://analytics.yourdomain.com` (Log in with your new password).
4. **Umami Realtime Tracking**: Visit pages on `https://yourdomain.com` and watch realtime visitor counts increment live in `https://analytics.yourdomain.com`!

---

## Step 8: Updating Your Site & Database Backups

### How to Deploy Updates from Git (Dev/Master)
Whenever you push code changes to GitHub:
```bash
cd /var/www/identifyyou
git pull origin dev
docker compose up -d --build app
```
*(Your PostgreSQL database and media uploads are stored in persistent Docker volumes and will never be touched or lost during updates).*

### How to Backup the Docker Database
Run a database backup dump at any time:
```bash
docker exec -t identifyyou_db pg_dump -U identifyyou identifyyou > /var/www/identifyyou/backup_$(date +%F_%H%M%S).sql
```
