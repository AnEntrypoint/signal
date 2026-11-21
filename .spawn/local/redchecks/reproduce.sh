#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
LOCAL=$(cd "$HERE/.." && pwd)
SITE=$(realpath "$1")
SCRATCH=$(mktemp -d /workspace/tmp/signal/reproduce.XXXXXX)
trap 'rm -rf "$SCRATCH"' EXIT
PAGES_OUT="$SCRATCH/pages-export" node --max-old-space-size=10000 "$LOCAL/export-pages.mjs" > "$SCRATCH/build.out" 2>&1 || { tail -n 5 "$SCRATCH/build.out"; echo "BUILD_FAILED"; exit 1; }
node "$LOCAL/export-compare.mjs" "$SCRATCH/pages-export" "$SITE"
