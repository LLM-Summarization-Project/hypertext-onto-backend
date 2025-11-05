# ----------------------------
# Stage 1: Install dependencies
# ----------------------------
FROM node:20-slim AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install --no-frozen-lockfile

# ----------------------------
# Stage 2: Build the app
# ----------------------------
FROM node:20-slim AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm build

# ----------------------------
# Stage 3: Production image
# ----------------------------
FROM node:20-slim AS prod
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install --prod --no-frozen-lockfile

EXPOSE 3000
CMD ["node", "dist/main.js"]
