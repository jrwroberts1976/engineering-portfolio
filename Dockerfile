# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build

WORKDIR /app

ARG PUBLIC_GRAFANA_SECURITY_DASHBOARD=""
ARG PUBLIC_GRAFANA_PLATFORM_DASHBOARD=""
ARG PUBLIC_GRAFANA_BIRDNET_DASHBOARD=""

ENV PUBLIC_GRAFANA_SECURITY_DASHBOARD=${PUBLIC_GRAFANA_SECURITY_DASHBOARD}
ENV PUBLIC_GRAFANA_PLATFORM_DASHBOARD=${PUBLIC_GRAFANA_PLATFORM_DASHBOARD}
ENV PUBLIC_GRAFANA_BIRDNET_DASHBOARD=${PUBLIC_GRAFANA_BIRDNET_DASHBOARD}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

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
