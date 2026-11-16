# Pending validation

Each change below is committed locally and is not yet confirmed by a browser run unless its status says so.

| # | Change | Where | Status |
|---|---|---|---|
| 1 | Server copied from the snapshot workspace; data root now comes from `SNAPSHOT_ROOT`, defaulting to `local/snapshot` | `local/serve-local.mjs` | Confirmed in Phase B: served on 4173, 4284 mappings, 0 misses |
| 2 | Capture script copied; data root from `SNAPSHOT_ROOT` | `local/capture-snapshot.mjs` | Syntax checked; not re-run |
| 3 | Template-literal-safe path class (excludes backtick, `{`, `}`, `$`) | `local/serve-local.mjs` | Verified earlier: page body non-empty |
| 4 | Cacheable headers on session, world-store, module and static responses | `local/serve-local.mjs` | Verified earlier, partial |
| 5 | Quoted hosted origins rewritten to the local base; map keys followed by `:` left alone | `local/serve-local.mjs` | Verified earlier: no postMessage origin warnings |
| 6 | Inline localizer: iframe `src`, `setAttribute('src')`, string `fetch` for hosted origins | `local/serve-local.mjs` | Verified earlier: 0 remote requests on warm load |
| 7 | Sidebar hidden with `[data-rail-group]{display:none!important}` | `local/serve-local.mjs` | Confirmed in Phase B: all 4 groups `display:none` |
| 8 | `/api/session/grant` and `/api/sdk/*` answer 503 JSON | `local/serve-local.mjs` | Verified earlier |
| 9 | Ignore the snapshot directory | `.gitignore` | Added |
| 10 | Run and limits documented | `docs/LOCAL-RUN.md` | Added |
| 11 | This list | `docs/PENDING_VALIDATION.md` | Added |
