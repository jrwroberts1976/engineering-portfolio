# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build

WORKDIR /app

ARG PUBLIC_GRAFANA_SECURITY_DASHBOARD=""
ARG PUBLIC_GRAFANA_PLATFORM_DASHBOARD=""
ARG PUBLIC_GRAFANA_BIRDNET_DASHBOARD=""
ARG PUBLIC_HOMELAB_DEFENDER_URL=""

ENV PUBLIC_GRAFANA_SECURITY_DASHBOARD=${PUBLIC_GRAFANA_SECURITY_DASHBOARD}
ENV PUBLIC_GRAFANA_PLATFORM_DASHBOARD=${PUBLIC_GRAFANA_PLATFORM_DASHBOARD}
ENV PUBLIC_GRAFANA_BIRDNET_DASHBOARD=${PUBLIC_GRAFANA_BIRDNET_DASHBOARD}
ENV PUBLIC_HOMELAB_DEFENDER_URL=${PUBLIC_HOMELAB_DEFENDER_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

ARG BUILD_REVISION=unknown
ARG BUILD_CREATED=unknown
ARG BUILD_SOURCE=https://github.com/jrwroberts1976/engineering-portfolio

LABEL org.opencontainers.image.title="James Roberts Engineering Portfolio" \
      org.opencontainers.image.description="Engineering portfolio and homelab case studies" \
      org.opencontainers.image.source="$BUILD_SOURCE" \
      org.opencontainers.image.revision="$BUILD_REVISION" \
      org.opencontainers.image.created="$BUILD_CREATED"

RUN rm -rf /usr/share/nginx/html/*

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK \
  --interval=30s \
  --timeout=5s \
  --start-period=10s \
  --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
