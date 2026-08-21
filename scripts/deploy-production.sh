#!/usr/bin/env bash
set -Eeuo pipefail
# Load Nginx Proxy Manager credentials used by maintenance mode
NPM_ENV="$HOME/docker/secrets/npm.env"

if [[ ! -r "$NPM_ENV" ]]; then
    echo "ERROR: Cannot read $NPM_ENV"
    exit 1
fi

set -a
# shellcheck disable=SC1090
source "$NPM_ENV"
set +a

: "${NPM_TOKEN:?NPM_TOKEN is not set in $NPM_ENV}"
# =============================================================================
# Engineering Portfolio – Production Deployment
# =============================================================================
#
# Remote repository:
#   https://github.com/jrwroberts1976/engineering-portfolio
#
# Source:
#   /home/james/docker/stacks/engineering-portfolio-git
#
# Production:
#   /home/james/docker/stacks/engineering-portfolio
#
# Maintenance:
#   /home/james/docker/stacks/maintenance-page
#
# Usage:
#   ./deploy-production.sh
#
# Clean image rebuild:
#   ./deploy-production.sh --no-cache
#
# =============================================================================

SOURCE_DIR="/home/james/docker/stacks/engineering-portfolio-git"
PRODUCTION_DIR="/home/james/docker/stacks/engineering-portfolio"
MAINTENANCE_DIR="/home/james/docker/stacks/maintenance-page"

CONTAINER_NAME="engineering-portfolio"
PROXY_CONTAINER="npm"
PROXY_URL="http://engineering-portfolio:80"

NO_CACHE=false
MAINTENANCE_ENABLED=false

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
    echo "=============================================="
    echo "DEPLOYMENT FAILED"
    echo "=============================================="
    echo
    echo "Maintenance mode will remain ENABLED."
    echo
    echo "Current container status:"
    docker ps -a --filter "name=${CONTAINER_NAME}" || true

    echo
    echo "Recent container logs:"
    docker logs "${CONTAINER_NAME}" --tail 50 2>/dev/null || true

    echo
    echo "To restore the previous live site after investigation:"
    echo "  ${MAINTENANCE_DIR}/disable-maintenance.sh"
}

trap cleanup_on_error ERR

# =============================================================================
# Pre-flight
# =============================================================================

log "Running pre-flight checks"

[[ -d "${SOURCE_DIR}" ]] ||
    fail "Source repository not found: ${SOURCE_DIR}"

[[ -d "${SOURCE_DIR}/.git" ]] ||
    fail "Source directory is not a Git repository"

[[ -f "${SOURCE_DIR}/package.json" ]] ||
    fail "package.json not found"

[[ -f "${SOURCE_DIR}/Dockerfile" ]] ||
    fail "Dockerfile not found"

[[ -f "${SOURCE_DIR}/compose.yml" ]] ||
    fail "compose.yml not found"

[[ -x "${MAINTENANCE_DIR}/enable-maintenance.sh" ]] ||
    fail "Maintenance enable script not found or not executable"

[[ -x "${MAINTENANCE_DIR}/disable-maintenance.sh" ]] ||
    fail "Maintenance disable script not found or not executable"

command -v git >/dev/null 2>&1 ||
    fail "Git is not installed"

command -v npm >/dev/null 2>&1 ||
    fail "npm is not installed"

command -v rsync >/dev/null 2>&1 ||
    fail "rsync is not installed"

command -v docker >/dev/null 2>&1 ||
    fail "Docker is not installed"

docker info >/dev/null 2>&1 ||
    fail "Docker daemon is unavailable"

success "Pre-flight checks passed"

# =============================================================================
# Update source from GitHub
# =============================================================================

log "Updating source repository from GitHub"

cd "${SOURCE_DIR}"

git fetch origin

git checkout main

git pull --ff-only origin main

success "Source repository updated"

echo
echo "Current commit:"
git log -1 --oneline

# =============================================================================
# Enable maintenance
# =============================================================================

log "Enabling maintenance mode"

"${MAINTENANCE_DIR}/enable-maintenance.sh"

MAINTENANCE_ENABLED=true

success "Maintenance mode enabled"

# =============================================================================
# Validate source
# =============================================================================

log "Checking source Git status"

git status --short

# =============================================================================
# Install dependencies
# =============================================================================

log "Installing production dependencies"

npm ci

success "Dependencies installed"

# =============================================================================
# Validate Astro build
# =============================================================================

log "Validating Astro production build"

npm run build

success "Astro build completed successfully"

# =============================================================================
# Prepare production directory
# =============================================================================

log "Preparing production directory"

mkdir -p "${PRODUCTION_DIR}"

if [[ ! -f "${PRODUCTION_DIR}/.env" ]]; then
    echo "Warning: ${PRODUCTION_DIR}/.env does not exist."
fi

# =============================================================================
# Synchronise source to production
# =============================================================================

log "Synchronising source to production"

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

# =============================================================================
# Validate production stack
# =============================================================================

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

# =============================================================================
# Build production image
# =============================================================================

log "Building production image"

if [[ "${NO_CACHE}" == true ]]; then
    docker compose build --no-cache
else
    docker compose build
fi

success "Production image built"

# =============================================================================
# Recreate production container
# =============================================================================

log "Recreating production container"

docker compose up -d --force-recreate --remove-orphans

success "Container recreation requested"

# =============================================================================
# Wait for container
# =============================================================================

log "Waiting for the portfolio container"

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

# =============================================================================
# Application readiness
# =============================================================================

log "Waiting for application readiness"

ready=false

for attempt in {1..30}; do
    health_status="$(
        docker inspect \
            --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' \
            "${CONTAINER_NAME}" 2>/dev/null || true
    )"

    if [[ "${health_status}" == "unhealthy" ]]; then
        fail "${CONTAINER_NAME} reported an unhealthy Docker health status"
    fi

    if docker exec "${CONTAINER_NAME}" \
        wget -q --spider http://127.0.0.1/healthz 2>/dev/null; then
        ready=true
        break
    fi

    sleep 2
done

[[ "${ready}" == true ]] ||
    fail "Application health endpoint did not become ready within 60 seconds"

health_status="$(
    docker inspect \
        --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' \
        "${CONTAINER_NAME}" 2>/dev/null || true
)"

success "Application health endpoint responded (Docker health: ${health_status})"

# =============================================================================
# NPM connectivity
# =============================================================================

log "Checking connectivity from Nginx Proxy Manager"

docker inspect "${PROXY_CONTAINER}" >/dev/null 2>&1 ||
    fail "Nginx Proxy Manager container '${PROXY_CONTAINER}' was not found"

docker exec "${PROXY_CONTAINER}" \
    curl --fail --silent --show-error \
    --head "${PROXY_URL}/" >/dev/null

success "Nginx Proxy Manager can reach the portfolio"

# =============================================================================
# Route checks
# =============================================================================

log "Checking important portfolio routes"

routes=(
    "/"
    "/about/"
    "/leadership/"
    "/projects/"
    "/projects/container-version-control/"
    "/projects/kubernetes/"
    "/projects/birdnet/"
    "/projects/disaster-recovery/"
    "/projects/dr-recovery/"
    "/beyond-engineering/"
)

for route in "${routes[@]}"; do

    docker exec "${PROXY_CONTAINER}" \
        curl --fail --silent --show-error \
        --head "${PROXY_URL}${route}" >/dev/null

    success "Route available: ${route}"
done

# =============================================================================
# Maintenance OFF
# =============================================================================

log "Deployment validation passed"

log "Disabling maintenance mode"

"${MAINTENANCE_DIR}/disable-maintenance.sh"

MAINTENANCE_ENABLED=false

success "Production site restored"

# =============================================================================
# Final status
# =============================================================================

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
echo "Deployed commit:"
cd "${SOURCE_DIR}"
git log -1 --oneline

echo
echo "Recent logs:"
echo "  docker logs ${CONTAINER_NAME} --tail 50"
