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
| 12 | Capture the 32 missing pool modules and their closure (38 new files, GET only, sha256 in the fetch log) | `.spawn/local/capture-missing.mjs`; `assets/play.spawn.co/_v4_client_pool_*`; `state/fetch-log.jsonl` | Verified: `/__health` `misses: 0`, `mappings: 4322` |
| 13 | Outer static lookup uses the query string (`/_next/image?url=…`, `/icon.png?…`); fallback lookup for `www.spawn.co` paths | `.spawn/local/serve-local.mjs` (`STATIC_ORIGIN_PREFIXES` branch, fallback branch) | Verified: no 404 for `/_next/image` or `/icon.png` on the cold load |
| 14 | `/ready-plate` answers `200` with an empty body (local stub; the hosted page is not captured because the request carries a device report) | `.spawn/local/serve-local.mjs` | Verified: no 404; the page renders. The stub is not the hosted plate |
| 15 | Verified the kernel does not need `/ready-plate` content: `404`, empty `200` and a snapshot fragment give the same page state | `docs/LOCAL-RUN.md` (`/ready-plate` section) | Verified: table with `page.route` witness |

Open, not verified:

- Zero `ERR_ABORTED` (single tab and concurrent tabs). Not reached. Per-load counts with the 503 grant ranged from 7 to 58 in the current state and 41 to 82 before the closure capture; the trace is in `docs/LOCAL-RUN.md`. Documented as known kernel behaviour.
- The 3D world does not draw. The cause is measured: WebGL works (SwiftShader), but `navigator.gpu.requestAdapter()` returns `null`, and the installed playwriter launches Chromium with `chromium.launch({ headless: true, executablePath })` and no `args` (`playwriter/dist/executor.js`, around line 830). No installed setting reaches that call: `PLAYWRITER_WEBGPU` is not read, `AGENT_GRAPHICS` is kitty output, and `HEADFUL` is test-only. The gm change needed: read a Chromium argument list from an environment variable (for example `PLAYWRITER_CHROMIUM_ARGS`) and pass it as `args` at that call. Which flags produce a WebGPU adapter here is not verified; that needs the change and a fresh browser.
- The `ready-plate` stub is local only. The kernel does not need the hosted content: a `404`, the empty `200`, and a snapshot-derived fragment give the same page state (see the table in `docs/LOCAL-RUN.md`).

Tried and not kept:

- Serve-time cancel removal in the kernel's door-ask let-go (`b7` in `_v4_client_pool_60d2a80e`, and the same string in `f844f1a1`): the cancel `$.asking?.controller.abort(...)` was stripped from the served text. The trace showed it was the only JS-initiated abort on the `?wave=whole` loads, but after the strip single-tab stayed at 81 and concurrent went to 40 and 50. The unpatched code then gave 77 single-tab and 41 and 50 concurrent, so the change had no measurable effect. Reverted; `.spawn/local/serve-local.mjs` matches HEAD.

- A localizer that answers same-path session writes with `history.replaceState` instead of navigating: the kernel does not write through `iframe.src`, so it never ran. Reverted.
- Rewriting `cache:"reload"` to `cache:"default"`: the same aborts remained. Reverted.
- Removing the eager kernel frame's `src`: the aborts went away, but the session never loaded.
