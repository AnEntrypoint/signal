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
- Hosted origins (play.spawn.co, spawn.co, spawnfile.io, kiln, bigspawn, maps.spawnfile.io) are rewritten to local `/__local/` routes, including origins that appear in backtick template literals. An inline localizer sends iframe `src` and string `fetch` URLs for the play, spawn and kiln origins to local routes.
- The sidebar: elements matching `[data-rail-group]` are hidden with `display:none`. They are not deleted from the DOM.
- Session grant: `/api/session/grant` and `/api/sdk/*` answer `503` JSON. No token or bearer is issued or replayed.
- Cache probes: `only-if-cached` in served JS and HTML is rewritten to `default`, so the local server answers the probe.
- Module and session responses are `immutable`. After a change to the rewrite rules, clear the browser cache, or a profile keeps the old bytes.

## Last measured run

Headless playwriter session (`playwriter session new --browser headless`), cache cleared over CDP before each load, `http://127.0.0.1:4173/`:

- Single tab: body text 2191 characters; no canvas; all four `[data-rail-group]` elements `display:none`; 1068 requests; 10 frame navigations; 82 `requestfailed`, all `ERR_ABORTED`; 0 page errors; 0 requests to any origin other than 127.0.0.1:4173 (the `blob:` URLs the page creates are not network requests).
- Two tabs loaded at the same time: each tab 82 `ERR_ABORTED`; 0 page errors; 0 non-local requests.

## What still does not work

- Zero failed requests is not reached. The `ERR_ABORTED` requests come from the kernel's own frames. The session frame is created, then the kernel creates and removes helper frames (`/kernel-witness`, `about:blank`, the authored realm). Frame removal and navigation abort the loads the removed frame had in flight. With the grant answered `200 {}` the count was about 7 on a warm cache, so the grant 503 is the main driver of the count.
- A localizer change that answered same-path session writes with `history.replaceState` was tried. The kernel's session writes do not go through `iframe.src`, so it did nothing, and it was reverted.
- The 3D world needs WebGL or WebGPU. The headless session draws no canvas.
- The realtime WebSocket to the local origin fails.
- The local run shows the captured copy of the world in the snapshot. Commits to this repository do not change what it shows.
