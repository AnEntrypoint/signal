# Local run

Signal Stage runs from captured bytes with no network connection at runtime.

## Where the runner lives

- `.spawn/local/serve-local.mjs`: the server. It is workshop-only. `.spawn/` is not sent to the room (AGENTS.md), and the file imports `node:http` and `node:fs`, so it runs under Node in the workshop, never in the world.
- `.spawn/local/capture-snapshot.mjs`: builds the snapshot from the hosted site. It needs network access and runs only at build time.
- The snapshot (`assets/`, `raw/`, `state/`) is about 170 MB and is not in git. `SNAPSHOT_ROOT` points at it. The default is `.spawn/local/snapshot`, which is git-ignored.

## How to start

```
SNAPSHOT_ROOT=/path/to/snapshot PORT=4173 node .spawn/local/serve-local.mjs
```

Open http://127.0.0.1:4173/. `GET /__health` reports the number of captured URL mappings.

## What is removed or changed

- The outer Next.js app does not run. `/` serves the captured HTML with the Next runtime scripts (`/_next/` script tags), their preload links and the `self.__next_f.push` data removed. The captured server markup is shown as is. React hydration error #418 no longer occurs.
- Hosted origins (play.spawn.co, spawn.co, spawnfile.io, kiln, bigspawn) are rewritten to local `/__local/` routes. An inline localizer sends iframe `src` and string `fetch` URLs for those origins to local routes.
- The sidebar: elements matching `[data-rail-group]` are hidden with `display:none`. They are not deleted from the DOM.
- Session grant: `/api/session/grant` answers `200 {}`. It issues no token and no bearer, and no hosted credential is replayed. `/api/sdk/*` answers `503`.
- Cache probes: `only-if-cached` in served JS and HTML is rewritten to `default`. The local server answers the probe, so it no longer fails with `ERR_CACHE_MISS`.

## Last measured run

Filled in by the Phase B check of this commit (see the Phase B note at the end of this file).

## What still does not work

- The kernel navigates its session frame several times at startup. Each navigation aborts the previous document's in-flight loads. Five requests end `ERR_ABORTED` on a warm load. This is not fixed.
- The 3D world needs WebGL or WebGPU. The playwriter browser runs with `--disable-gpu`, so the world may not draw there.
- The realtime WebSocket to the local origin fails.
- The local run shows the captured copy of the world in the snapshot. Commits to this repository do not change what it shows.
