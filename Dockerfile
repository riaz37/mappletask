# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
# Install yarn
RUN apk add --no-cache yarn
# Copy package.json files from all packages
COPY package.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
# Install dependencies with yarn
RUN yarn install

# Build the app
FROM deps AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image for server
FROM base AS server
ENV NODE_ENV=production
WORKDIR /app/apps/server

# Copy necessary files
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/node_modules ./node_modules
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/apps/server/prisma ./prisma

# Run database migrations and start the server
CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/main.js"]

# Production image for web
FROM base AS web
ENV NODE_ENV=production
WORKDIR /app/apps/web

# Copy necessary files
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/apps/web/public ./public

# Start the app
CMD ["yarn", "start"]
