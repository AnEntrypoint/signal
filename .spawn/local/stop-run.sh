#!/bin/bash
set -u
OUT="$1"
if [ ! -d "$OUT" ]; then echo "no run dir: $OUT" >&2; exit 2; fi
walk() { echo "$1"; for c in $(ps -o pid= --ppid "$1"); do walk "$c"; done; }
owned() {
  local pid="$1" kind="$2"
  [ -d "/proc/$pid" ] || return 1
  local cmd
  cmd=$(tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null)
  case "$kind" in
    browser) case "$cmd" in *"$OUT/profile"*) return 0 ;; esac ;;
    server) case "$cmd" in *serve-local.mjs*) return 0 ;; esac ;;
  esac
  return 1
}
for kind in browser server; do
  f="$OUT/$kind.pid"
  [ -f "$f" ] || continue
  root=$(tr -d '[:space:]' < "$f")
  if [ ! -d "/proc/$root" ]; then echo "$kind pid $root already exited"; continue; fi
  if ! owned "$root" "$kind"; then echo "refused $kind pid $root: command line is not this run's $kind" >&2; continue; fi
  pgid=$(ps -o pgid= -p "$root" | tr -d ' ')
  if [ "$pgid" = "$root" ]; then kill -TERM -- "-$root" 2>/dev/null; fi
  for p in $(walk "$root"); do kill -TERM "$p" 2>/dev/null; done
  echo "stopped $kind tree rooted at $root"
done
