#!/usr/bin/env bash
CHROME_BASE=(--no-first-run --no-default-browser-check --enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader)
MEM_FLOOR_KB=2621440

alive() {
  local s
  s=$(ps -o stat= -p "$1" 2>/dev/null | tr -d ' ')
  case "$s" in ''|Z*) return 1 ;; esac
  return 0
}

ancestry() {
  local p=$$ s=" "
  while [ -n "$p" ] && [ "$p" -gt 1 ]; do
    s="$s$p "
    p=$(ps -o ppid= -p "$p" 2>/dev/null | tr -d ' ')
  done
  echo "$s"
}

free_port() {
  local p
  for p in $(shuf -i 20000-60000 -n 40); do
    ss -ltn | grep -q ":$p " || { echo "$p"; return 0; }
  done
  return 1
}

snapshot_to() {
  ps -eo pid=,ppid=,args= > "$1"
}

descend_in() {
  local snap=$1 frontier all= next p
  shift
  frontier="$*"
  while [ -n "$frontier" ]; do
    all="$all $frontier"
    next=""
    for p in $frontier; do
      next="$next $(awk -v q="$p" '$2==q{print $1}' "$snap")"
    done
    frontier=$(echo $next)
  done
  echo $all
}

stop_pids() {
  local p i left
  for p in "$@"; do kill -TERM "$p" 2>/dev/null; done
  for i in $(seq 1 20); do
    left=""
    for p in "$@"; do alive "$p" && left="$left $p"; done
    [ -z "$left" ] && return 0
    sleep 0.5
  done
  for p in $left; do kill -KILL "$p" 2>/dev/null; done
  sleep 1
  return 0
}

wait_devtools() {
  local i
  for i in $(seq 1 60); do
    curl -sf "http://127.0.0.1:$1/json/version" > "$2" && break
    sleep 0.5
  done
}

open_session() {
  local try
  for try in 1 2 3; do
    SESSION_OUT=$(playwriter session new --direct "$1" 2>&1)
    SESSION_ID=$(echo "$SESSION_OUT" | grep -o "Session [0-9]*" | awk '{print $2}')
    [ -n "$SESSION_ID" ] && return 0
    sleep 3
  done
  return 1
}

close_session() {
  playwriter session delete "$1" > /dev/null 2>&1
}

proc_check() {
  local label=$1 self tmp hits left=0 pid args s
  shift
  self=$(ancestry)
  tmp=$(mktemp)
  hits=$(mktemp)
  ps -eo pid=,args= > "$tmp"
  grep -F 'browser-witness' "$tmp" | grep -v -F 'grep -F' > "$hits"
  echo "== proc-check $label $(date -u +%H:%M:%S) browser-witness processes (this check's ancestry excluded)"
  while read -r pid args; do
    case "$self" in *" $pid "*) continue ;; esac
    echo "  $pid $args" | cut -c1-200
    left=$((left + 1))
  done < "$hits"
  for pid in "$@"; do
    s=$(ps -o stat= -p "$pid" 2>/dev/null | tr -d ' ')
    case "$s" in ''|Z*) ;; *) echo "  recorded pid=$pid alive stat=$s"; left=$((left + 1)) ;; esac
  done
  rm -f "$tmp" "$hits"
  if [ "$left" -eq 0 ]; then echo "PROC_CHECK $label clear"; return 0; fi
  echo "PROC_CHECK $label left=$left"
  return 1
}

mem_gate() {
  local kb
  kb=$(awk '/^MemAvailable:/{print $2}' /proc/meminfo)
  echo "MEM $1 kb=$kb floor=$MEM_FLOOR_KB"
  [ "$kb" -ge "$MEM_FLOOR_KB" ]
}

if [ "${BASH_SOURCE[0]}" = "$0" ]; then "$@"; fi
