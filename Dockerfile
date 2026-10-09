# ----------------------------------------------------------------------
# IdentifYou Next.js 15 + Payload CMS 3 Production Dockerfile
# Base Image: Node 20 LTS Slim (Debian-based for optimal Sharp/libvips compatibility)
# ----------------------------------------------------------------------

FROM node:20-slim AS base

# Install OpenSSL, CA certificates and necessary build dependencies for Sharp
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Disable Next.js telemetry during builds and runtime
ENV NEXT_TELEMETRY_DISABLED=1

# ----------------------------------------------------------------------
# Dependencies Layer
# ----------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
# Install dependencies cleanly
RUN npm install --no-audit --no-fund

# ----------------------------------------------------------------------
# Builder Layer
# ----------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass build-time environment variables or defaults
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_UMAMI_HOST_URL
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_UMAMI_HOST_URL=$NEXT_PUBLIC_UMAMI_HOST_URL
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID

# Run Next.js / Payload production build
RUN npm run build

# ----------------------------------------------------------------------
# Runner Layer (Production Runtime)
# ----------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Ensure public/media directory exists for local Payload media uploads
RUN mkdir -p /app/public/media

# Copy node_modules and built assets from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/payload ./payload
COPY --from=builder /app/payload-types.ts ./payload-types.ts
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/components ./components
COPY --from=builder /app/app ./app
COPY --from=builder /app/scripts ./scripts

# Expose Next.js port
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/api/health/live || exit 1

CMD ["npm", "run", "start"]
