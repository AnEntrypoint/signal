#!/bin/bash
PROBE="$1"
OUT="$2"
TARGET="$3"
sed -e "s|__TARGET__|$TARGET|" -e "s|__OUT__|$OUT|" -e "s|__KEEP__|${KEEP_PREBORN:-0}|" -e "s|__FORCE__|${FORCE_ROAD:-}|" -e "s|__SAMPLE__|${SAMPLE:-0}|" -e "s|__READ__|${READ:-1}|g" -e "s|__VIEW_W__|${VIEW_W:-1280}|g" -e "s|__VIEW_H__|${VIEW_H:-800}|g" "$PROBE"
