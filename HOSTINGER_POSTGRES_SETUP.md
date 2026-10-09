# Hostinger VPS — PostgreSQL Setup Guide for Payload CMS

This document outlines the step-by-step instructions to set up the PostgreSQL database on a Hostinger VPS for the **IdentifYou** website.

---

## 📌 Executive Summary

* **Do we need to write manual SQL queries to create tables?**  
  **No.** You do **not** need to create any tables or write SQL schemas.
* **How are tables created?**  
  Payload CMS (v3) uses **Drizzle ORM** under the hood. It reads our TypeScript collection schemas (`case-studies`, `media`, `users`, etc.) and automatically creates all required tables, relations, and indexes upon connection.
* **What is required on the VPS?**  
  Only a **fresh, empty PostgreSQL database** and a dedicated database user with full privileges.

---

## 1. Setup Instructions on Hostinger VPS (Ubuntu / Debian)

### Step 1.1: Install PostgreSQL
SSH into your Hostinger VPS as `root` (or with `sudo`) and run:

```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install PostgreSQL and contrib packages
sudo apt install -y postgresql postgresql-contrib

# Ensure PostgreSQL service is active and enabled on boot
sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo systemctl status postgresql
```

---

### Step 1.2: Create the Database and User

Log into the PostgreSQL CLI:
```bash
sudo -u postgres psql
```

Execute the following commands (replace `your_secure_password` with a strong password):

```sql
-- 1. Create a clean, empty database
CREATE DATABASE identifyyou;

-- 2. Create the application user
CREATE USER identifyyou_user WITH ENCRYPTED PASSWORD 'your_secure_password';

-- 3. Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE identifyyou TO identifyyou_user;

-- 4. Grant schema permissions (required for PostgreSQL 15+)
\c identifyyou
GRANT ALL ON SCHEMA public TO identifyyou_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO identifyyou_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO identifyyou_user;

-- 5. Exit psql
\q
```

---

### Step 1.3: Remote Access Configuration *(Only if Next.js runs on a different server)*

> 💡 **Note:** If Next.js runs on the **same VPS**, you can skip this step and connect via `localhost:5432`.

If the Next.js application runs outside this VPS (e.g., local dev or another server), allow remote connections:

1. **Edit `postgresql.conf`:**
   ```bash
   sudo nano /etc/postgresql/*/main/postgresql.conf
   ```
   Find `listen_addresses` and change it to:
   ```ini
   listen_addresses = '*'
   ```

2. **Edit `pg_hba.conf`:**
   ```bash
   sudo nano /etc/postgresql/*/main/pg_hba.conf
   ```
   Add this line at the bottom:
   ```ini
   host    identifyyou     identifyyou_user     0.0.0.0/0     scram-sha-256
   ```

3. **Restart PostgreSQL:**
   ```bash
   sudo systemctl restart postgresql
   ```

4. **Allow port 5432 in firewall (UFW):**
   ```bash
   sudo ufw allow 5432/tcp
   ```

---

## 2. Connection String Configuration

Once the database is created, provide the connection string to the development team:

### If Next.js runs on the same VPS:
```env
DATABASE_URI=postgresql://identifyyou_user:your_secure_password@localhost:5432/identifyyou
```

### If Next.js connects remotely:
```env
DATABASE_URI=postgresql://identifyyou_user:your_secure_password@YOUR_VPS_PUBLIC_IP:5432/identifyyou
```

Add this variable into the project's `.env.local` (or production `.env`).

---

## 3. How Tables & Data Get Populated

You have two options to populate the database:

### Option A: Clean Initialization (Payload Auto-Creation)
1. Point `DATABASE_URI` to the newly created database.
2. Start the app once in development mode:
   ```bash
   npm run dev
   ```
3. Payload will connect and automatically generate all tables (`case_studies`, `media`, `users`, `payload_locked_documents`, etc.) within seconds.
4. Stop the dev server (`Ctrl + C`) and build for production:
   ```bash
   npm run build
   npm run start
   ```

---

### Option B: Direct Clone from Current Supabase (Recommended)
To keep all existing case studies, admin users, media links, and site settings without manually re-entering content:

1. **Export existing database from Supabase:**
   ```bash
   pg_dump "postgresql://postgres.stlnxavuccvpnitwkohn:mspsiva9876%23@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres" --clean --if-exists --no-owner --no-privileges > full_backup.sql
   ```

2. **Import directly into the Hostinger VPS database:**
   ```bash
   psql -U identifyyou_user -d identifyyou -h localhost -f full_backup.sql
   ```
   *(Or using our project script: `npm run db:restore`)*

This creates all tables and imports all live records in one command.

---

## 4. Verification

To verify that the tables have been created successfully on the VPS:

```bash
sudo -u postgres psql -d identifyyou
\dt
```

You should see all Payload collections listed (e.g., `case_studies`, `media`, `users`, `footer`, `header`, etc.).
