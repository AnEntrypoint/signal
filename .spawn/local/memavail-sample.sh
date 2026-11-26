#!/bin/bash
OUT="$1"
while :; do
  echo "$(date +%s%3N) $(awk '/MemAvailable/{print $2}' /proc/meminfo)" >> "$OUT/memavail.txt"
  sleep 2
done
