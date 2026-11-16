# Local run

This is the Signal Stage world served with no network connection at runtime.

## What runs

`local/serve-local.mjs` is a Node static server. It serves a captured Spawn session (kernel document, client-pool modules, world-store values, fonts and static assets) from a snapshot directory. It makes no outbound requests. Captured hosted URLs are rewritten to `/__local/<encoded-url>` routes that resolve to files in the snapshot.

`local/capture-snapshot.mjs` fills the snapshot directory from the hosted site. It needs network access and runs only when the snapshot is built, not when the world runs.

## What was removed

- Hosted origins in the page: play.spawn.co, spawn.co, spawnfile.io, kiln, bigspawn. Served HTML and JS are rewritten to local routes. An inline shim redirects iframe `src`, `setAttribute('src')` and string `fetch` URLs for those origins to local routes.
- The sidebar: elements matching `[data-rail-group]` are hidden with `display:none`. They are not deleted from the captured DOM.
- Session grant and SDK calls: `/api/session/grant` and `/api/sdk/*` answer `503` JSON locally. No bearer token is replayed.

## What is served locally

- `/`: the captured outer page, rewritten and shimmed.
- Session routes: the captured kernel document.
- `/__local/...`: snapshot files for every captured module, world-store value, font, and `_next`, `_ready`, `ground`, `datadog` static path.

## How to start

The snapshot directory is not in git (about 170 MB). It must contain `assets/`, `raw/http/dev-page.body`, `raw/http/session-dev.body` and `state/fetch-log.jsonl`.

```
SNAPSHOT_ROOT=/path/to/snapshot PORT=4173 node local/serve-local.mjs
```

Then open http://127.0.0.1:4173/. `SNAPSHOT_ROOT` defaults to `local/snapshot`, which is git-ignored.

## Last measured run

Playwriter, `http://127.0.0.1:4173/`, load, then a 15 s settle: body text 2239 characters; all four `[data-rail-group]` elements computed `display:none`; 460 requests, 10 of them `blob:` URLs created by the page and 0 to any other origin; 5 `requestfailed` (`ERR_ABORTED`); 2 page errors (React #418).

## What still does not work

- React hydration error #418 is thrown on load (2 page errors per load).
- 5 kernel requests end as `ERR_ABORTED` on each load (superseded navigations and waves). The page does not report them as user-visible errors, but they are failed requests.
- The 3D world does not draw in a browser without WebGL or WebGPU.
- The realtime WebSocket to the local origin fails.
- The local run serves the captured copy of the world in the snapshot. Commits pushed to this repository do not change what the local run shows.
