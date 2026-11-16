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
| 11 | Runtime trace of the `ERR_ABORTED` source (no code change kept) | `docs/LOCAL-RUN.md` | Documented as known kernel behaviour |

Open, not verified:

- Zero `ERR_ABORTED` (single tab and concurrent tabs). Not reached. Per-load counts with the 503 grant ranged from 41 to 82 across runs of the same code; the trace is in `docs/LOCAL-RUN.md`.

Tried and not kept:

- Serve-time cancel removal in the kernel's door-ask let-go (`b7` in `_v4_client_pool_60d2a80e`, and the same string in `f844f1a1`): the cancel `$.asking?.controller.abort(...)` was stripped from the served text. The trace showed it was the only JS-initiated abort on the `?wave=whole` loads, but after the strip single-tab stayed at 81 and concurrent went to 40 and 50. The unpatched code then gave 77 single-tab and 41 and 50 concurrent, so the change had no measurable effect. Reverted; `.spawn/local/serve-local.mjs` matches HEAD.

- A localizer that answers same-path session writes with `history.replaceState` instead of navigating: the kernel does not write through `iframe.src`, so it never ran. Reverted.
- Rewriting `cache:"reload"` to `cache:"default"`: the same aborts remained. Reverted.
- Removing the eager kernel frame's `src`: the aborts went away, but the session never loaded.
