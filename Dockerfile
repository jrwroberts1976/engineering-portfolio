# syntax=docker/dockerfile:1

# ============================================================================
# Stage 1: Astro production build
# ============================================================================
#
# Debian is used instead of Alpine for the build stage because Astro's
# JavaScript toolchain includes platform-specific native dependencies.
#
# The final runtime remains a small Nginx Alpine image.
#

FROM node:22-bookworm-slim AS build

WORKDIR /app

# Public Grafana links compiled into the static website.
ARG PUBLIC_GRAFANA_SECURITY_DASHBOARD=""
ARG PUBLIC_GRAFANA_PLATFORM_DASHBOARD=""
ARG PUBLIC_GRAFANA_BIRDNET_DASHBOARD=""

ENV PUBLIC_GRAFANA_SECURITY_DASHBOARD=${PUBLIC_GRAFANA_SECURITY_DASHBOARD}
ENV PUBLIC_GRAFANA_PLATFORM_DASHBOARD=${PUBLIC_GRAFANA_PLATFORM_DASHBOARD}
ENV PUBLIC_GRAFANA_BIRDNET_DASHBOARD=${PUBLIC_GRAFANA_BIRDNET_DASHBOARD}

# Copy dependency metadata separately for Docker layer caching.
COPY package.json package-lock.json ./

# Install the exact dependencies recorded in package-lock.json.
RUN npm ci

# Copy the remainder of the application.
COPY . .

# Generate the static Astro site in /app/dist.
RUN npm run build


# ============================================================================
# Stage 2: Nginx production runtime
# ============================================================================

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
