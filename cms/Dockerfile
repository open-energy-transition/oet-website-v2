FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS source
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

FROM source AS build
ENV NODE_ENV=production \
    DATABASE_URL=postgres://build:build@localhost:5432/build \
    PAYLOAD_SECRET=build-time-only \
    PAYLOAD_PUBLIC_URL=http://localhost:3000 \
    WEB_URL=http://localhost:4321 \
    MEDIA_STORAGE=disk \
    MEDIA_DIR=/app/media
RUN pnpm build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
RUN mkdir media && chown node:node media
USER node
EXPOSE 3000
CMD ["node", "server.js"]
