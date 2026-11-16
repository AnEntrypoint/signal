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

Playwriter, http://127.0.0.1:4173/, two loads in fresh pages (profile cache kept between them):

- Load A: body text 2550 characters; one canvas; all four `[data-rail-group]` elements `display:none`; 307 requests; 0 page errors; 0 requests to any origin other than 127.0.0.1:4173 (the 10 `blob:` URLs created by the page are not network requests); 8 `requestfailed`, all `ERR_ABORTED`.
- Load B: body text 2550 characters; one canvas; rail hidden; 243 requests; 0 page errors; 0 non-local requests; 7 `requestfailed`, all `ERR_ABORTED`.

## What still does not work

- The kernel navigates its session frame several times at startup (session, session with `?standRows=on` or `?oneask=on`, then `about:blank`). Each navigation aborts the previous document's in-flight loads. 7 to 8 requests end `ERR_ABORTED` on each load in a single tab. This is not fixed. With other kernel tabs open on the same server, one check showed 39 and another 165, so measure with one tab open.
- The 3D world needs WebGL or WebGPU. The playwriter browser runs with `--disable-gpu`, so the world may not draw there.
- The realtime WebSocket to the local origin fails.
- The local run shows the captured copy of the world in the snapshot. Commits to this repository do not change what it shows.
