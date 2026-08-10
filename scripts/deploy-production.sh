#!/usr/bin/env bash

# =============================================================================
# Engineering Portfolio – Production Deployment
# =============================================================================
#
# Source:
#   /home/james/projects/engineering-portfolio
#
# Production:
#   /home/james/docker/stacks/engineering-portfolio
#
# Usage:
#   ./scripts/deploy-production.sh
#
# Clean image rebuild:
#   ./scripts/deploy-production.sh --no-cache
#
# =============================================================================

set -Eeuo pipefail

SOURCE_DIR="/home/james/projects/engineering-portfolio"
PRODUCTION_DIR="/home/james/docker/stacks/engineering-portfolio"

CONTAINER_NAME="engineering-portfolio"
PROXY_CONTAINER="npm"
PROXY_URL="http://engineering-portfolio:80"

NO_CACHE=false

if [[ "${1:-}" == "--no-cache" ]]; then
    NO_CACHE=true
elif [[ -n "${1:-}" ]]; then
    echo "Usage: $0 [--no-cache]"
    exit 1
fi

log() {
    printf '\n\033[1;34m==>\033[0m %s\n' "$1"
}

success() {
    printf '\033[1;32m✓\033[0m %s\n' "$1"
}

fail() {
    printf '\033[1;31m✗\033[0m %s\n' "$1" >&2
    exit 1
}

cleanup_on_error() {
    echo
    echo "Deployment failed."
    echo "Current container status:"
    docker ps -a --filter "name=${CONTAINER_NAME}" || true

    echo
    echo "Recent container logs:"
    docker logs "${CONTAINER_NAME}" --tail 50 2>/dev/null || true
}

trap cleanup_on_error ERR

# -----------------------------------------------------------------------------
# Pre-flight checks
# -----------------------------------------------------------------------------

log "Running pre-flight checks"

[[ -d "${SOURCE_DIR}" ]] ||
    fail "Development directory not found: ${SOURCE_DIR}"

[[ -f "${SOURCE_DIR}/package.json" ]] ||
    fail "package.json not found in development repository"

[[ -f "${SOURCE_DIR}/Dockerfile" ]] ||
    fail "Dockerfile not found in development repository"

[[ -f "${SOURCE_DIR}/compose.yml" ]] ||
    fail "compose.yml not found in development repository"

command -v npm >/dev/null 2>&1 ||
    fail "npm is not installed"

command -v rsync >/dev/null 2>&1 ||
    fail "rsync is not installed"

command -v docker >/dev/null 2>&1 ||
    fail "Docker is not installed"

docker info >/dev/null 2>&1 ||
    fail "Docker daemon is unavailable"

success "Pre-flight checks passed"

# -----------------------------------------------------------------------------
# Show source status
# -----------------------------------------------------------------------------

log "Checking Git status"

cd "${SOURCE_DIR}"

git status --short || true

if ! git diff --quiet || ! git diff --cached --quiet; then
    echo
    echo "Warning: the development repository contains uncommitted changes."
    echo "These changes will still be deployed."
fi

# -----------------------------------------------------------------------------
# Validate Astro build
# -----------------------------------------------------------------------------

log "Validating Astro production build"

npm run build

success "Astro build completed successfully"

# -----------------------------------------------------------------------------
# Prepare production directory
# -----------------------------------------------------------------------------

log "Preparing production directory"

mkdir -p "${PRODUCTION_DIR}"

# Preserve the production environment file. It is excluded from rsync below.
if [[ ! -f "${PRODUCTION_DIR}/.env" ]]; then
    echo "Warning: ${PRODUCTION_DIR}/.env does not exist."
    echo "Dashboard URLs and other production variables may be unavailable."
fi

# -----------------------------------------------------------------------------
# Synchronise source into production
# -----------------------------------------------------------------------------

log "Synchronising development files to production"

rsync -av --delete \
    --exclude='.git/' \
    --exclude='node_modules/' \
    --exclude='dist/' \
    --exclude='.astro/' \
    --exclude='.env' \
    --exclude='*.log' \
    "${SOURCE_DIR}/" \
    "${PRODUCTION_DIR}/"

success "Production files synchronised"

# -----------------------------------------------------------------------------
# Validate production files
# -----------------------------------------------------------------------------

log "Validating production stack"

cd "${PRODUCTION_DIR}"

[[ -f "compose.yml" ]] ||
    fail "Production compose.yml is missing"

[[ -f "Dockerfile" ]] ||
    fail "Production Dockerfile is missing"

[[ -f "docker/nginx.conf" ]] ||
    fail "Production Nginx configuration is missing"

docker compose config >/dev/null

success "Docker Compose configuration is valid"

# -----------------------------------------------------------------------------
# Build the production image
# -----------------------------------------------------------------------------

log "Building production image"

if [[ "${NO_CACHE}" == true ]]; then
    docker compose build --no-cache
else
    docker compose build
fi

success "Production image built"

# -----------------------------------------------------------------------------
# Recreate production container
# -----------------------------------------------------------------------------

log "Recreating production container"

docker compose up -d --force-recreate --remove-orphans

success "Container recreation requested"

# -----------------------------------------------------------------------------
# Wait for container startup
# -----------------------------------------------------------------------------

log "Waiting for the container to become available"

for attempt in {1..30}; do
    status="$(
        docker inspect \
            --format '{{.State.Status}}' \
            "${CONTAINER_NAME}" 2>/dev/null || true
    )"

    if [[ "${status}" == "running" ]]; then
        break
    fi

    sleep 2
done

status="$(
    docker inspect \
        --format '{{.State.Status}}' \
        "${CONTAINER_NAME}" 2>/dev/null || true
)"

[[ "${status}" == "running" ]] ||
    fail "${CONTAINER_NAME} did not enter the running state"

success "${CONTAINER_NAME} is running"

# -----------------------------------------------------------------------------
# Check Nginx inside the application container
# -----------------------------------------------------------------------------

log "Checking application health endpoint"

docker exec "${CONTAINER_NAME}" \
    wget -q --spider http://127.0.0.1/healthz

success "Application health endpoint responded"

# -----------------------------------------------------------------------------
# Check Docker networking and NPM connectivity
# -----------------------------------------------------------------------------

log "Checking connectivity from Nginx Proxy Manager"

docker inspect "${PROXY_CONTAINER}" >/dev/null 2>&1 ||
    fail "Nginx Proxy Manager container '${PROXY_CONTAINER}' was not found"

docker exec "${PROXY_CONTAINER}" \
    curl --fail --silent --show-error \
    --head "${PROXY_URL}/" >/dev/null

success "Nginx Proxy Manager can reach the portfolio"

# -----------------------------------------------------------------------------
# Check important routes through NPM
# -----------------------------------------------------------------------------

log "Checking important portfolio routes"

routes=(
    "/"
    "/about/"
    "/leadership/"
    "/projects/"
    "/projects/kubernetes/"
    "/projects/birdnet/"
    "/beyond-engineering/"
)

for route in "${routes[@]}"; do
    docker exec "${PROXY_CONTAINER}" \
        curl --fail --silent --show-error \
        --head "${PROXY_URL}${route}" >/dev/null

    success "Route available: ${route}"
done

# -----------------------------------------------------------------------------
# List deployed downloadable files
# -----------------------------------------------------------------------------

log "Checking deployed files"

if docker exec "${CONTAINER_NAME}" \
    test -d /usr/share/nginx/html/files; then

    docker exec "${CONTAINER_NAME}" \
        find /usr/share/nginx/html/files \
        -maxdepth 1 \
        -type f \
        -printf '  %f\n' | sort
else
    echo "No /files directory was included in this deployment."
fi

# -----------------------------------------------------------------------------
# Final status
# -----------------------------------------------------------------------------

log "Deployment complete"

docker ps \
    --filter "name=${CONTAINER_NAME}" \
    --format 'Container: {{.Names}}
Image:     {{.Image}}
Status:    {{.Status}}'

echo
echo "Live site:"
echo "  https://me.jrwroberts.co.uk"
echo
echo "Recent logs:"
echo "  docker logs ${CONTAINER_NAME} --tail 50"
