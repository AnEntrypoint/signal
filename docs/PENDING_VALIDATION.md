# Pending validation

Each change is committed locally. "Verified" means a playwriter run on http://127.0.0.1:4173/ showed the stated result.

| # | Change | Where | Status |
|---|---|---|---|
| 1 | Runner moved out of the world tree to the workshop-only path `.spawn/local/`; `SNAPSHOT_ROOT` picks the snapshot | `.spawn/local/serve-local.mjs`, `.spawn/local/capture-snapshot.mjs` | Syntax checked; Phase B check pending |
| 2 | Snapshot directory ignored under the new path | `.gitignore` | Added |
| 3 | `/` drops the Next runtime scripts, preload links and `__next_f` pushes, so the outer app does not hydrate | `.spawn/local/serve-local.mjs` (`outerStatic`) | Verified: 0 page errors on both loads (React #418 gone) |
| 4 | `only-if-cached` rewritten to `default` in served text | `.spawn/local/serve-local.mjs` (`rewrite`) | Removes the warm-load `ERR_CACHE_MISS` failures; verified in the Phase B check |
| 5 | Session grant answers `200 {}`, SDK stays `503` | `.spawn/local/serve-local.mjs` | Verified: the grant failures that caused reloads are gone; 7 to 8 \`ERR_ABORTED\` remain from the kernel's own navigations |
| 6 | Sidebar hidden with `[data-rail-group]{display:none!important}` | `.spawn/local/serve-local.mjs` (localizer) | Verified: rail groups \`display:none\` on both loads |
| 7 | Docs rewritten for the new path, the removed items and the open failures | `docs/LOCAL-RUN.md` | Added |
| 8 | This list | `docs/PENDING_VALIDATION.md` | Added |

Tried and not kept:

- Rewriting `cache:"reload"` to `cache:"default"`: the same 5 `ERR_ABORTED` remained.
- Removing the eager kernel frame's `src`: the aborts went away, but the session never loaded, so the world did not run.
- Starting the eager frame at the URL the kernel navigates to (`?standRows=on`): the kernel still navigates again, and 6 requests failed.
