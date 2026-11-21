#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
node "$HERE/red-preload-check.cjs" "$SITE" || { echo RED_PRELOAD_FAILED; exit 1; }
echo RED_PRELOAD_OK
