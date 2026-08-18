#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$HOME/projects/engineering-portfolio"
NPM_ENV="$HOME/docker/secrets/npm.env"

MAINT_ENABLE="$HOME/docker/stacks/maintenance-page/enable-maintenance.sh"
MAINT_DISABLE="$HOME/docker/stacks/maintenance-page/disable-maintenance.sh"

log() {
    printf "\n\033[1;34m==>\033[0m %s\n" "$1"
}

success() {
    printf "\033[1;32m✓\033[0m %s\n" "$1"
}

fail() {
    printf "\033[1;31m✗\033[0m %s\n" "$1" >&2
    exit 1
}

cleanup() {
    exit_code=$?

    if [[ $exit_code -ne 0 ]]; then
        echo
        echo "=============================================="
        echo "DEPLOYMENT FAILED"
        echo "=============================================="
        echo
        echo "Attempting to restore live site..."

        if [[ -x "$MAINT_DISABLE" ]]; then
            "$MAINT_DISABLE" || true
        fi

        echo
        echo "Maintenance mode cleanup attempted."
    fi

    exit "$exit_code"
}

trap cleanup EXIT


#
# Load NPM secrets
#

if [[ ! -r "$NPM_ENV" ]]; then
    fail "Missing NPM environment file: $NPM_ENV"
fi

log "Loading NPM environment"

set -a
source "$NPM_ENV"
set +a


: "${NPM_TOKEN:?NPM_TOKEN is not set}"
: "${NPM_URL:?NPM_URL is not set}"
: "${NPM_PROXY_ID:?NPM_PROXY_ID is not set}"

success "NPM environment loaded"


#
# Enter project
#

cd "$PROJECT_DIR"


#
# Enable maintenance
#

log "Enabling maintenance mode"

"$MAINT_ENABLE"

success "Maintenance enabled"


#
# Update source
#

log "Updating source repository"

git pull

success "Source repository updated"


#
# Build image
#

log "Building engineering portfolio image"

docker build \
    -t james-roberts/engineering-portfolio:latest \
    .

success "Image built"


#
# Restart container
#

log "Restarting engineering portfolio"

docker compose up -d --force-recreate

success "Container restarted"


#
# Health check
#

log "Waiting for application health"

sleep 10

if ! docker ps | grep engineering-portfolio | grep -q healthy; then
    docker ps
    docker logs engineering-portfolio --tail 50
    fail "Container health check failed"
fi

success "Application healthy"


#
# Disable maintenance
#

log "Restoring live service"

"$MAINT_DISABLE"

success "Maintenance disabled"


echo
echo "=============================================="
echo "DEPLOYMENT COMPLETE"
echo "=============================================="
echo
echo "https://me.jrwroberts.co.uk"
echo
