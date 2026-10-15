# Multi-stage production image for the Noir Bijoux Express API.
# The database is not inside this image: at runtime DATABASE_URL points to Supabase.

FROM node:22-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Generate Prisma Client during the image build without contacting Supabase.
# These dummy URLs are build-time placeholders only; runtime gets the real URL.
RUN DATABASE_URL='postgresql://ci:ci@127.0.0.1:5432/noir_bijoux_ci?schema=public' \
    DIRECT_URL='postgresql://ci:ci@127.0.0.1:5432/noir_bijoux_ci?schema=public' \
    npx prisma generate \
    && npm run build

FROM node:22-bookworm-slim AS production
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production \
    PORT=4000 \
    UPLOAD_DIR=uploads

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build --chown=node:node /app/dist ./dist
RUN mkdir -p /app/uploads/avatars && chown -R node:node /app/uploads

USER node
EXPOSE 4000
CMD ["npm", "start"]
