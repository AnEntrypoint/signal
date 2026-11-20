#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
T=$(mktemp -d "$HERE/.red-shown.XXXXXX")
mk() { mkdir -p "$1"; printf '%s' "{\"reqs\":[],\"consoles\":[],\"errs\":[],\"failed\":[],\"okUrls\":[],\"frames\":[{\"url\":\"https://anentrypoint.github.io/signal/session/world:x@dev/\",\"info\":{\"canvases\":[\"300x150\",\"1280x800\"],\"shown\":$2}}]}" > "$1/trace.json"; }
mk "$T/shown" true
mk "$T/hidden" false
node "$HERE/browser-result.cjs" "$T/shown" > "$T/shown.out" 2>&1; S1=$?
node "$HERE/browser-result.cjs" "$T/hidden" > "$T/hidden.out" 2>&1; S2=$?
echo "shown rc=$S1 hidden rc=$S2"
grep "WORLD NOT SHOWN\|FAIL COUNT" "$T/hidden.out" | head -n 3
rm -rf "$T"
if [ "$S1" -eq 0 ] && [ "$S2" -ne 0 ]; then echo RED_SHOWN_OK; exit 0; fi
echo RED_SHOWN_FAILED
exit 1
