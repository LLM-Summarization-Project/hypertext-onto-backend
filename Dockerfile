# ----------------------------
# Stage 1: Install dependencies
# ----------------------------
FROM node:20-slim AS deps
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install --no-frozen-lockfile

# ----------------------------
# Stage 2: Build the app
# ----------------------------
FROM node:20-slim AS build
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@9 --activate
RUN npx prisma generate
RUN pnpm build

# ----------------------------
# Stage 3: Production image
# ----------------------------
FROM node:20-slim AS prod
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml* ./

EXPOSE 3000
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

