# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Install libc compat for native modules (bcrypt, etc.)
RUN apk add --no-cache libc6-compat python3 make g++

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# ─── Stage 2: Build the Next.js app ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args that get baked into the image at build time
# (NEXT_PUBLIC_* vars only – secrets go in runtime .env)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Enable standalone output so we get a minimal production server
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── Stage 3: Minimal production image ────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Standalone output: server.js + dependencies are self-contained
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets must be copied manually into the standalone folder
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use node server.js — required for standalone output (next start does NOT work)
CMD ["node", "server.js"]
