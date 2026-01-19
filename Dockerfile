# ----------------------------
# Stage 1: Install dependencies
# ----------------------------
FROM node:20-slim AS deps
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm install

# ----------------------------
# Stage 2: Build the app
# ----------------------------
FROM node:20-slim AS build
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
RUN npx prisma generate
RUN npm run build

# ----------------------------
# Stage 3: Production image
# ----------------------------
FROM node:20-slim AS prod
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY package.json package-lock.json* ./

EXPOSE 3000
CMD ["node", "dist/main.js"]

