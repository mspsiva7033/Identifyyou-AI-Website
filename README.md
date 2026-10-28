# IdentifYou Technologies — Enterprise AI & Deep Tech Platform

The official enterprise web application and CMS platform for **IdentifYou Technologies**, built with **Next.js 16 (App Router)**, **Payload CMS 3 (PostgreSQL)**, and **Umami Analytics**.

---

## 🚀 Quick Start (Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Ensure `.env.local` is present with required secrets and database parameters.

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) for the frontend, and [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin panel.

4. **Run Verification & Diagnostic Suites:**
   ```bash
   # Production readiness and database SSL heuristics
   npm run test:prod

   # Role-Based Access Control (RBAC) security checks
   npm run test:rbac
   ```

---

## 🐳 Production Docker Deployment

For self-hosted production deployment on Linux VPS (Hostinger, Ubuntu, Debian, AWS EC2, DigitalOcean), refer to the comprehensive guide:

👉 **[Complete Docker Deployment Guide](DOCKER_DEPLOYMENT_GUIDE.md)**

### Key Docker Commands:
```bash
# 1. Build and launch the container stack
docker compose up -d --build

# 2. Check container health status
docker compose ps

# 3. View live application logs
docker compose logs -f app

# 4. Zero-downtime update after git pull
docker compose up -d --build app
```

---

## 🏛️ Technology Stack

- **Framework:** Next.js 16.3.4 (React 19, TypeScript 5, Webpack)
- **CMS:** Payload CMS 3.88.0 (Lexical RichText, PostgreSQL Adapter)
- **Database:** PostgreSQL 16 Alpine
- **Telemetry & Analytics:** Native in-app PostgreSQL events + Umami Analytics
- **Image Pipeline:** Sharp 0.33.5 with automated responsive sizing
- **Email Delivery:** Microsoft Graph API (OAuth2) with SMTP fallback
- **Containerization:** Multi-stage Docker + Docker Compose v2
