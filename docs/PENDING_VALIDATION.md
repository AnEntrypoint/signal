# Pending validation

Each change is committed locally. "Verified" means a headless playwriter run on http://127.0.0.1:4173/ showed the stated result.

| # | Change | Where | Status |
|---|---|---|---|
| 1 | Runner at the workshop-only path `.spawn/local/`; `SNAPSHOT_ROOT` picks the snapshot | `.spawn/local/serve-local.mjs`, `.spawn/local/capture-snapshot.mjs` | Verified: served on 4173 from this path |
| 2 | Snapshot directory ignored under the new path | `.gitignore` | Added |
| 3 | `/` drops the Next runtime scripts, preload links and `__next_f` pushes | `.spawn/local/serve-local.mjs` (`outerStatic`) | Verified: 0 page errors |
| 4 | `only-if-cached` rewritten to `default` in served text | `.spawn/local/serve-local.mjs` (`rewrite`) | Verified: no `ERR_CACHE_MISS` |
| 5 | Session grant and SDK answer `503` JSON (was `200 {}` in `04601ff`) | `.spawn/local/serve-local.mjs` | Verified: the page loads; 82 `ERR_ABORTED` remain |
| 6 | Sidebar hidden with `[data-rail-group]{display:none!important}` | `.spawn/local/serve-local.mjs` (localizer) | Verified: all four groups `display:none` |
| 7 | Origin `https://maps.spawnfile.io` added to the rewrite list | `.spawn/local/serve-local.mjs` (`origins`) | Verified: 0 non-local requests after a cache clear |
| 8 | Rewrite also matches origins preceded by a backtick | `.spawn/local/serve-local.mjs` (`rewrite`, `externalUrl`) | Verified with row 7 |
| 9 | Docs rewritten for the current state | `docs/LOCAL-RUN.md` | Added |
| 10 | This list | `docs/PENDING_VALIDATION.md` | Added |

Open, not verified:

- Zero `ERR_ABORTED` (single tab and concurrent tabs). Not reached: 82 per tab with the 503 grant.

Tried and not kept:

- A localizer that answers same-path session writes with `history.replaceState` instead of navigating: the kernel does not write through `iframe.src`, so it never ran. Reverted.
- Rewriting `cache:"reload"` to `cache:"default"`: the same aborts remained. Reverted.
- Removing the eager kernel frame's `src`: the aborts went away, but the session never loaded.
