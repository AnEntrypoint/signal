# Local run

Signal Stage runs from captured bytes with no network connection at runtime.

## Where the runner lives

- `.spawn/local/serve-local.mjs`: the server. It is workshop-only. `.spawn/` is not sent to the room (AGENTS.md), and the file imports `node:http` and `node:fs`, so it runs under Node in the workshop, never in the world.
- `.spawn/local/capture-snapshot.mjs`: builds the snapshot from the hosted site. It needs network access and runs only at build time.
- `.spawn/local/capture-missing.mjs`: captures pool modules that the kernel loads but the snapshot lacks. It makes GET requests only, follows the pool-name references in each captured module, and writes each file in the layout the server reads. Each capture is appended to `state/fetch-log.jsonl` with its sha256.
- The snapshot (`assets/`, `raw/`, `state/`) is about 170 MB and is not in git. `SNAPSHOT_ROOT` points at it. The default is `.spawn/local/snapshot`, which is git-ignored.

## How to start

```
SNAPSHOT_ROOT=/path/to/snapshot PORT=4173 node .spawn/local/serve-local.mjs
```

Open http://127.0.0.1:4173/. `GET /__health` reports the number of captured URL mappings and the number of misses since start.

## What is removed or changed

- The outer Next.js app does not run. `/` serves the captured HTML with the Next runtime scripts (`/_next/` script tags), their preload links and the `self.__next_f.push` data removed. The captured server markup is shown as is. React hydration error #418 no longer occurs.
- Hosted origins (play.spawn.co, spawn.co, spawnfile.io, kiln, bigspawn, maps.spawnfile.io) are rewritten to local `/__local/` routes, including origins that appear in backtick template literals. An inline localizer sends iframe `src` and string `fetch` URLs for the play, spawn and kiln origins to local routes.
- The sidebar: elements matching `[data-rail-group]` are hidden with `display:none`. They are not deleted from the DOM.
- Session grant: `/api/session/grant` and `/api/sdk/*` answer `503` JSON. No token or bearer is issued or replayed. The `503` is the decided behaviour.
- Outer static paths (`/_next/image`, `/icon.png`, and other `www.spawn.co` paths) are looked up with their query string, so the captured variant (for example `/_next/image?url=…&w=640&q=75`) is served.
- `/ready-plate` answers `200` with an empty body. See the note below.
- Cache probes: `only-if-cached` in served JS and HTML is rewritten to `default`, so the local server answers the probe.
- Module and session responses are `immutable`. After a change to the rewrite rules, clear the browser cache, or a profile keeps the old bytes.

## Final local witness

Current state, run on the server with the captured pool closure and the outer-path fixes, in fresh playwriter headless sessions with the browser cache cleared before each load:

- `/__health`: `misses: 0`, `mappings: 4322` (4284 before the closure capture; 38 modules added).
- Cold single tab, three runs: body text 2550 characters; one canvas in the outer page (the 300×150 canvas of the outer page, not the 3D world); all four `[data-rail-group]` elements `display:none`; 624 to 665 requests; 9 to 10 frame navigations; `requestfailed` 27, 26 and 36, all `ERR_ABORTED`; `pageErrors: []`; `nonLocal: []`. A first run measured 22 characters because the outer page had not rendered when it was read. The three runs after it all measured 2550.
- Two tabs loaded at the same time, three runs: `tab0` and `tab1` each have body text 2550, `pageErrors: 0`, `nonLocal: 0`. `requestfailed` per tab: 7 and 7; 7 and 30; 58 and 30.
- Response-level check on a cold load (`http-errs.js`): one response at status 400 or above, the `503` on `/api/session/grant`. No `404` remains.
- Every failure, grouped by error and host (`.spawn/local/witness-cold-tab.js`, one cold single-tab run, playwriter headless, cache cleared): `requests 661`, `failedCount 35`, body text 2550, 1 canvas, `pageErrors []`, `nonLocal 0`.
  - `net::ERR_ABORTED | play.spawn.co (pool module, relative name)`: 33. These are pool modules requested by their relative name (for example `9d5c4347-a9b4420234a28d53.mjs?wave=whole`, `14687fb3-6ccd5d525494356f.mjs`).
  - `net::ERR_ABORTED | r7ixd6719-playco.spawnfile.io`: 1, the `tome-ui/authored-realm-kept` document.
  - `net::ERR_ABORTED | play.spawn.co`: 1, a `world-store/values` read.
  - Every failure is `ERR_ABORTED`. None is a 4xx or 5xx, and none is a network error to a host other than the captured origins.

The `ERR_ABORTED` counts are the documented kernel behaviour below. The bar for the local run is zero page errors and zero non-local requests, and both are met.

## `/ready-plate`: the kernel does not need its content

The outer page calls `/ready-plate?to=…&reads=…` with `scenario: "graphics-wont-start"` and a device report (user agent, `softwareWebGL`, and other fields). The hosted plate would receive that report, so it was not captured. The served answer is `200` with an empty body.

The plate code (`__ready_early-plate.js`) parses the answer as HTML and reads only elements with `data-early-plate` and `data-early-plate-variant`, plus the `spawn-plate-sheet` meta. An empty body therefore yields no plate elements, the same as a `404`.

Verified on a cold single tab: `page.route` answered `/ready-plate` three ways, the cache was cleared before each load, and the page was read after 12 s. Each load had two `/ready-plate` requests.

| Answer to `/ready-plate` | Main body text | Compat wall visible | Main canvases | Kernel frame text / canvases | `requestfailed` | `pageErrors` |
|---|---|---|---|---|---|---|
| `200`, empty (served) | 2550 | yes, 416×544 | 1 | 2 / 0 | 11 | 0 |
| `404` | 2550 | yes, 416×544 | 1 | 2 / 0 | 14 | 0 |
| `200`, plate fragment | 2598 | yes, 416×544 | 1 | 2 / 0 | 40 | 0 |

Reading the table: the compat wall is already in the captured `/` page (`raw/http/dev-page.body`), so it is visible under all three answers. The fragment adds 48 characters, its own wall text. The kernel frame draws no canvas under any answer. The `requestfailed` counts are single runs and vary between runs; they do not follow the answer.

Conclusion: the kernel does not need the hosted `/ready-plate` content. The fragment is a stand-in cut from the snapshot's own wall, not the hosted plate. The served empty `200` is kept as the local answer; the request does not leave the machine.

## The 3D world does not draw: WebGPU adapter

Cause, measured in the installed playwriter:

- WebGL works. In the playwriter headless page, `getContext('webgl2')` and `getContext('webgl')` both return a context, and the renderer is SwiftShader.
- WebGPU exposes `navigator.gpu`, but `navigator.gpu.requestAdapter()` returns `null` for both the `high-performance`/`core` and `compatibility` requests. The kernel's frame logs `No available adapters`.
- The kernel requests a WebGPU adapter first (`requestAdapter` in the captured session module, then `compatibility`). With no adapter the session frame has no canvas, and the world does not draw.
- The launch path is `chromium.launch({ headless: true, executablePath })` in `playwriter/dist/executor.js` (around line 830). It passes no `args`, so no Chromium flag can be set through the installed playwriter.
- The settings the installed package does read: `AGENT_GRAPHICS` (kitty image output only), `HEADFUL` (test utilities only, not the session launch), and `PLAYWRITER_*` for the CLI and relay. None sets a GPU or WebGPU flag. `PLAYWRITER_WEBGPU` is not read anywhere in the package.
- `--use-angle` was not passed by hand, and no second Chromium was started.

The gm change needed, and the contract it is checked against:

- Variable name: `PLAYWRITER_CHROMIUM_ARGS`.
- Format: a JSON array of strings, for example `PLAYWRITER_CHROMIUM_ARGS='["<flag>", "<flag>"]'`. The strings are passed as given; the variable is not split on spaces.
- Where: the headless launch in `playwriter/dist/executor.js`, the `chromium.launch({ headless: true, executablePath })` call (around line 830). The change adds `args: <parsed array>` to that object. Unset or empty means no extra arguments, so the current behaviour is unchanged.
- Check after the change, in a fresh headless session with the variable set: `navigator.gpu.requestAdapter()` returns an adapter (not `null`), and the kernel frame has a canvas (the world draws). Without the variable, the same check returns `null` as measured above.

Which flags make a WebGPU adapter appear on this Linux headless Chromium is not verified here. That needs the launch change and a fresh browser, and `--use-angle` was not passed by hand. The item stays open in `docs/PENDING_VALIDATION.md`.

## Known kernel behaviour: the `ERR_ABORTED` loads

The aborted loads per page load are a known kernel behaviour, not a local-server fault. In the current state they range from 7 to 58 per tab; before the closure capture they were 41 to 82 per tab. They are kept as the captured kernel produces them, and no serve-time patch removes them with the 503 grant in place.

What the runtime trace showed (playwriter, an init script wrapping `AbortController.prototype.abort` and `fetch` to record the calling module):

- The aborted loads are the kernel's world-store plane reads and module fetches. The `?wave=whole` modules (`9d5c4347`, `c594a708`) are fetched from `uA`/`QA`/`bV` in `9d5c4347`, starting about 550 ms into the load.
- The only JS-initiated abort on those loads is the door-ask let-go: `b7` in `_v4_client_pool_60d2a80e` calls `asking.controller.abort("a later attempt took this door's ask, so it is let go")`, reached from `seed`. It runs when a door is seeded while an earlier ask is still in flight.
- Removing that cancel from the served text (a `split`/`join` in `serve-local.mjs`) left the counts unchanged (single tab 81, concurrent 40 and 50), and the unpatched run also gave 41 to 77. The cancel is therefore not the whole cause. The other aborts (`r7ixd6719 v4/client/pool`, `world-store/values`, `14687fb3`, `b01835d7`) are browser-side aborts that follow the session frame's navigations (9 to 10 frame navigations per load, `/kernel-witness`, `about:blank`, and the authored realm). The init-script run also reduced the count to about 8, so the instrumentation changes the timing and the counts are not stable across harnesses.
- Serving `/kernel-witness` and `/kernel-witness-host` as HTML documents left the counts unchanged (80, 0 page errors, 0 non-local requests).
- With the grant answered `200 {}` (a measurement only, not used) one cold run had 5 failed loads. The 503 grant is what drives the whole-closure fallback; that stub stays out.

## What still does not work

- Zero failed requests is not reached. The `ERR_ABORTED` requests come from the kernel's own frames. The session frame is created, then the kernel creates and removes helper frames (`/kernel-witness`, `about:blank`, the authored realm). Navigation aborts the loads the replaced frame had in flight. Frame detach events were not observed in the recorded runs.
- A localizer change that answered same-path session writes with `history.replaceState` was tried. The kernel's session writes do not go through `iframe.src`, so it did nothing, and it was reverted.
- The 3D world does not draw. The cause is the missing WebGPU adapter in the playwriter headless launch, described above. WebGL works, but the kernel does not fall back to it.
- The realtime WebSocket to the local origin fails.
- The local run shows the captured copy of the world in the snapshot. Commits to this repository do not change what it shows.

## Last measured run before the closure capture

Kept for the record. Headless playwriter session, cache cleared over CDP before each load, `http://127.0.0.1:4173/`:

- Single tab: body text 2191 characters; no canvas; all four `[data-rail-group]` elements `display:none`; about 1100 requests; 10 frame navigations; 77 to 82 `requestfailed`, all `ERR_ABORTED`; 0 page errors; 0 requests to any origin other than 127.0.0.1:4173.
- Two tabs: 41 and 50 `ERR_ABORTED` in one run; 82 in each tab in an earlier run; 0 page errors; 0 non-local requests.
