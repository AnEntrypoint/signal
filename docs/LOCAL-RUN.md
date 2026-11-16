# Local run

Signal Stage runs from captured bytes with no network connection at runtime.

## Where the runner lives

- `.spawn/local/serve-local.mjs`: the server. It is workshop-only. `.spawn/` is not sent to the room (AGENTS.md), and the file imports `node:http` and `node:fs`, so it runs under Node in the workshop, never in the world.
- `.spawn/local/capture-snapshot.mjs`: builds the snapshot from the hosted site. It needs network access and runs only at build time.
- `.spawn/local/capture-missing.mjs`: captures pool modules that the kernel loads but the snapshot lacks. It makes GET requests only, follows the pool-name references in each captured module, and writes each file in the layout the server reads. Each capture is appended to `state/fetch-log.jsonl` with its sha256.
- The snapshot (`assets/`, `raw/`, `state/`) is about 170 MB and is not in git. In this workshop it is `/workspace/signal`, the directory that holds `assets/`, `raw/` and `state/` directly. `SNAPSHOT_ROOT` must point there. Without it the server uses `.spawn/local/snapshot`, which is git-ignored and does not exist here, so the server starts with no captured mappings.

## How to start

Run from `world/signal-stage`:

```
SNAPSHOT_ROOT=/workspace/signal PORT=4173 HOST=127.0.0.1 node .spawn/local/serve-local.mjs
```

Open http://127.0.0.1:4173/.

The server reads its mappings once, at startup, from three files in `state/`: `fetch-log.jsonl`, `local-engine-fetch.jsonl` and `local-engine-runtime.jsonl`. The mapping count is pinned at that moment and does not change until a restart. `GET /__health` reports:

- `mappings`: the pinned count of unique URLs.
- `loaded`: for each file, whether it was present, its line count, how many lines mapped a URL, and its sha256.
- `misses`: the distinct URLs answered with a 404 since start.

To pin the count for a run, set `EXPECT_MAPPINGS`. The server exits with an error, naming the files it read, if the loaded count differs:

```
EXPECT_MAPPINGS=4322 SNAPSHOT_ROOT=/workspace/signal PORT=4173 HOST=127.0.0.1 node .spawn/local/serve-local.mjs
```

The count of 4322 is for the current `state/` files. It changes when a capture appends to `fetch-log.jsonl`; `capture-missing.mjs` appended 38 lines, which is why a server started before that capture reported 4284 mappings and 33 misses.

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

## The "Restart Chrome to play" wall

The captured `/` page shows this wall. The check that produces it, what it needs, and whether the local run can meet it:

Chain, from the captured outer page (`assets/www.spawn.co/`):

- The outer page reports a scenario to `/ready-plate`: `scenario: "gpu" in navigator ? "graphics-wont-start" : "no-graphics"` (`__lanmower.bin`). So the check is the presence of the WebGPU API object, `navigator.gpu`.
- For scenario `graphics-wont-start`, the card builder `eC(e)` (`__next_static_immutable_chunks_gy8snau9a8.js`) returns `e$(e)` for a browser in the set Chrome, Edge, Brave, unless an earlier branch applies. `e$` returns `id: "restart-browser"`, heading `Restart ${browser} to play`, and the steps "Press Copy address", "Open a new tab", "Paste it at the top", "Chrome restarts". The address is `chrome://restart`.
- The Windows and macOS driver branch applies only after a restart was already told. This host is Linux, so the Chrome restart card is what shows.
- The WebGL2 probe does not decide the scenario. The WebGL context probe (`detectSoftwareWebGLRenderer`) feeds `softwareWebGL` into `classifyCompatVerdict`, which chooses the explanatory line on the card, not the card.
- The browser version does not gate this card. `classifyCompatVerdict` uses Chrome major below 113 and at or above 121 only for its verdict. This host runs Chrome 155.

Witness (`.spawn/local/witness-wall.js`, the same playwriter headless browser, one fresh page per variant, the reported scenario read from the `/ready-plate` request):

- Baseline: `navigator.gpu` present; reported scenario `graphics-wont-start`; 2 plate requests; the wall visible at 2021 ms with the Chrome restart text.
- `navigator.gpu` removed: `gpu` absent; reported scenario `no-graphics`; the wall visible at 1014 ms, without the Chrome restart text.
- Diagnostic only, `navigator.gpu` with a stub adapter whose `requestDevice` throws: `gpu` present; reported scenario `graphics-wont-start`; the wall visible at 2073 ms with the Chrome restart text.

Answer: the wall needs `navigator.gpu` to exist, which the playwriter headless browser already provides. It does not need a WebGL2 context, a browser version, or a working adapter, since the stub adapter still gives the wall. The local run cannot clear the wall through the playwriter setup. Removing `navigator.gpu` changes the wall to `no-graphics` and is not a fix. The wall would clear only when the kernel starts with a working WebGPU adapter and device. The playwriter launch cannot provide that yet; the change recorded under the 3D item (`PLAYWRITER_CHROMIUM_ARGS`) is the route. Whether a working adapter clears the wall was not measured.

## WebGL2 fallback: checked, not reached

Question: does the kernel have a WebGL2 renderer that draws when WebGPU is missing, and does it draw here?

Source (the captured kernel modules, `assets/play.spawn.co/`):

- A WebGL2 world renderer exists: `engine-stand.mjs` (`_v4_client_pool_08ed00dd-9dbe4fd4465c4429.mjs`). It binds vertex arrays and draws with `bindVertexArray`, `uniformMatrix4fv`, `drawElements` and `drawArrays`, which are WebGL2 calls. Its companion `engine-stand-page.mjs` is `52cbc291`.
- The session world's own renderer path is WebGPU: it requests `GPU.requestAdapter` and `createRenderPipeline`. The WebGL2 code in the session module is a capability probe. It refuses when no WebGL2 context exists (`if (gl2 === null) return refusal()`), so it is not a renderer.
- The module that loads `engine-stand.mjs` is not in the captured bins. The session bin maps names to hashes (`"engine-stand.mjs":"08ed00dd-…"`), but I found no string in it that chooses `engine-stand` when `navigator.gpu` is missing. The engine value comes from a protocol message, and its source is not located.
- The text "No available adapters" is not in the kernel. Chrome logs it.

Runtime (`.spawn/local/witness-renderer.js`, one fresh headless session, cache cleared, 12 s):

- Requested modules: `engine-stand` 0, `engine-stand-page` 0, `engine-film` 0, `engine-film-renderer` 0, the WebGPU pipeline compiler 0, the authored-realm loader 2, the world-stand module `9d5c4347` 3.
- Frames: the outer page has one canvas, 104×104, a 2D context (the wisp). The session frame has no canvas. The kernel-witness frame has none.
- Console: `No available adapters` 4 times; `503` 5 times on the grant.
- Screenshot of the page: the captured compat wall reads "Restart Chrome to play" and "A restart may bring Chrome's graphics back". The world is not visible.

One earlier probe showed two canvases in the session frame (300×150 and 1280×720). A later probe showed none. The session frame is replaced during boot, so its canvas count is not stable across loads, and the probe that saw 1280×720 did not inspect its context.

Result: the captured kernel has a WebGL2 renderer, but in this setup the kernel does not load it, and the 3D world does not draw. Two things would settle the remaining question: the module that chooses `engine-stand` (not in the captured bins), or a WebGPU adapter (the `PLAYWRITER_CHROMIUM_ARGS` change above). The 3D item stays open.

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

## Headed run on :1: the adapter works, the world does not draw

Route: `DISPLAY=:1 PLAYWRITER_BROWSER_PATH=/usr/bin/chromium playwriter browser start --headed --user-data-dir /tmp/verify/pw-headed-<ts>`, then a session with `playwriter session new` (no `--browser headless`). The browser started in 3.0 s wall (wrapper PID 1830743, `chromium.real` PID 1830746); the extension connected. Both PIDs were stopped with `kill` after the witnesses and are gone. The headless Chromium PID 1766856 was not started by this run and was left running.

The four `PLAYWRITER_CHROMIUM_ARGS` flags were not applied. playwriter 0.9.0 reads `PLAYWRITER_BROWSER_PATH` but no chromium-args setting; the process has only the wrapper's flags (`--use-vulkan`, `--enable-features=Vulkan,VaapiVideoDecoder`, `--ignore-gpu-blocklist`). This is a gm defect: the bundled playwriter must read the args setting before the flags can be tested.

`witness-headed.js` (one run in a new headed tab, step times from the run):

| step | t |
|---|---|
| `/__health` loaded | 738 ms |
| `navigator.gpu.requestAdapter()` on 127.0.0.1:4173 | 939 ms (88 ms in the call) |
| kernel committed | 1005 ms |
| wall state `no-wall` | 1147 ms |
| 40 s poll done | 41744 ms |
| canvases listed | 50698 ms |
| pixels read | 88272 ms |

Witness output: `SUMMARY {"adapter":{"secureContext":true,"userAgent":"Chrome/155.0.0.0","gpu":true,"adapterMs":88,"adapter":true,"vendor":"nvidia","architecture":"ampere","features":19},"scenario":null,"plateHits":0,"transitions":[{"atMs":1147,"state":"no-wall"}],"requested":{"engine-stand (WebGL2 world renderer)":0,"engine-stand-page":0,"engine-film":0,"engine-film-renderer":0,"worker-pipeline-compiler (WebGPU pipelines)":0,"authored-realm loader":1,"world-stand module (9d5c4347)":2}, ...}`

Reading:

- Adapter: met on the localhost page through the headed route (`adapter: true`, NVIDIA Ampere).
- Wall: the `graphics-wont-start` card did not appear, and `/ready-plate` was never requested, so the scenario was not read. The wall is gone in this run, but the reason is the page never reaching that check, not a check that passed.
- World: the outer page carries `data-spawn-stood` but not `spawn-world-shown`. No WebGL2 or WebGPU renderer module was requested. `witness-headed-state.js` took two screenshots 3 s apart: both 64138 bytes with the same hash, so nothing animates.
- Cause: `witness-headed-faults.js` (30 s after load) counted 64 failed responses: 30 `world-store/values`, 1 `world-store/manifests/.../closure`, 4 `cdn/watch`, 3 `cdn/value.*.mp3`, 2 `worlds/summary`, 1 `cdn/resolve`, 1 `derived`, 2 `__local/*.mjs`, plus 9 `api/session/grant` 503s (the decided grant answer). The capture recorded the same 404s: `state/fetch-log.jsonl` has 37 `404` entries, 461 lines name `world-store/values`, and each 404 body is the same 35-byte JSON. The world's models and textures are not in the snapshot, which matches the `[Tome] ... spawned with no model` warnings.
- Not proven: that the missing closure manifest is what stops the kernel from requesting the renderer modules. It is the likely gate.
- Fixing it means fetching those values from `play.spawn.co`. This run was told nothing leaves the host, so it was not done. The 3D world stays open until the values are captured with the owner's go-ahead.

playwriter defect, for gm: `newCDPSession` on a session's page fails with `Target.attachToBrowserTarget: No tab found`, also after `session reset`. The cache-clear step was dropped, so this run's profile was fresh, not cold-cache-cleared.

## Missing world content: what exists locally, what does not

Local search, no request leaves the host. `.spawn/local/audit-world-values.mjs <failures.json>` reproduces the counts below from `state/fetch-log.jsonl` and the manifests in `assets/play.spawn.co/`.

- The two manifests `b095eb29…` and `f9148572…` reference 337 distinct values. 257 have a real body in `assets/play.spawn.co/_world-store_values_<hash>.bin` and are served. 80 have no body: the capture recorded them as 404 on both `play.spawn.co/world-store/values` and `spawnfile.io/dev/magic-assets/v5/values`. Those 80 are 138 `js.cut` paths (world script bundles), 16 `yml.cut` paths (data files), one `index.main.ground` and two list digests.
- The headed kernel (`witness-headed-faults.js`, 30 s after load) made 38 distinct failing URLs (64 failed responses in the run): 37 URLs return 404 and one, the grant, returns 503. No failing request has a local body, so there was nothing to serve and the server was not changed. The headed witness was rerun once without a change to serving.
- 35 of the 38 were never captured; 3 were captured as 404 (`cdn/value.<sha>.mp3`, whose hashes match world-store values that the capture recorded as `value_not_found`).
- Which of the 80 the kernel needs is not measured: the headed kernel never requested them. The kernel requested nine pool modules (`/__local/<name>.mjs`) that are not in the pool capture. The session body's module map lists them, headed by `0ee7f7f7-a3f6c0cc75abc82f` with twelve dependencies; the boot graph is partial in the session body, so whether these nine block the renderer is not established.
- Whether the kernel can run without the missing items is not determined. The headed kernel marks `data-spawn-stood` and does not mark `spawn-world-shown`. Removing a module from the served graph would change the page rather than measure it, and no missing item can be answered from this host.
- Host search: a whole-host search for the nine module names, the three CDN audio hashes and the music clip name returned zero hits in its first pass. The second pass did not finish within the time limit, so the host search is incomplete. The open rows are 23 to 32 in `docs/PENDING_VALIDATION.md`.

Playwriter defect, carried from the headed run: `newCDPSession` on a session's page fails with `No tab found`, so cache clearing was not used for these runs.
