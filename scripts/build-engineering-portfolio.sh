#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:---validate-only}"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPOSITORY_ROOT="$(git -C "$SCRIPT_DIR/.." rev-parse --show-toplevel)"
COMPOSE_FILE="${REPOSITORY_ROOT}/compose.yml"
SOURCE_URL="https://github.com/jrwroberts1976/engineering-portfolio"
IMAGE_REFERENCE="james-roberts/engineering-portfolio:local"

case "$MODE" in
    --validate-only|--build)
        ;;
    *)
        echo "Usage: $0 [--validate-only|--build]" >&2
        exit 1
        ;;
esac

if [[ -n "$(git -C "$REPOSITORY_ROOT" status --porcelain)" ]]; then
    echo "ERROR: Portfolio source or Compose state is not clean." >&2
    git -C "$REPOSITORY_ROOT" status --short >&2
    exit 1
fi

BUILD_REVISION="$(git -C "$REPOSITORY_ROOT" rev-parse HEAD)"
BUILD_CREATED="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
BUILD_SOURCE="$SOURCE_URL"

export BUILD_REVISION
export BUILD_CREATED
export BUILD_SOURCE

docker compose \
    --file "$COMPOSE_FILE" \
    --project-directory "$REPOSITORY_ROOT" \
    config --quiet

printf 'Build revision: %s\n' "$BUILD_REVISION"
printf 'Build created:  %s\n' "$BUILD_CREATED"
printf 'Build source:   %s\n' "$BUILD_SOURCE"

if [[ "$MODE" == "--validate-only" ]]; then
    echo "Validation only: no image was built and no container was changed."
    exit 0
fi

docker compose \
    --file "$COMPOSE_FILE" \
    --project-directory "$REPOSITORY_ROOT" \
    build engineering-portfolio

IMAGE_ID="$(
    docker image inspect "$IMAGE_REFERENCE" \
        --format '{{.Id}}' 2>/dev/null
)"

if [[ -z "$IMAGE_ID" ]]; then
    echo "ERROR: candidate image was not resolved from $IMAGE_REFERENCE." >&2
    exit 1
fi

IMAGE_REVISION="$(
    docker image inspect "$IMAGE_ID" \
        --format '{{index .Config.Labels "org.opencontainers.image.revision"}}'
)"

if [[ "$IMAGE_REVISION" != "$BUILD_REVISION" ]]; then
    echo "ERROR: candidate revision does not match the requested build." >&2
    printf 'Expected: %s\nActual:   %s\n' \
        "$BUILD_REVISION" "$IMAGE_REVISION" >&2
    exit 1
fi

docker image inspect "$IMAGE_ID" |
jq -r --arg reference "$IMAGE_REFERENCE" '.[0] | {
  reference: $reference,
  image_id: .Id,
  created: .Created,
  source: .Config.Labels["org.opencontainers.image.source"],
  revision: .Config.Labels["org.opencontainers.image.revision"],
  build_created: .Config.Labels["org.opencontainers.image.created"]
}'

echo "Image build completed. No container was recreated or restarted."
