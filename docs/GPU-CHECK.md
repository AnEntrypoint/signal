# Owner GPU check: the warm arm and the world shown

Row 403 of `docs/PENDING_VALIDATION.md` stays open until this run exists. The witness on this host runs headless Chromium with SwiftShader and no GPU, so the static export and the live site both read `shown: false` here. This check runs in a browser with a real GPU and compares the published page with live in that same browser.

## Before you start

- Use desktop Chrome or Chromium on a machine with a GPU. Open `chrome://gpu` and note the WebGPU line in your report.
- Open DevTools before you navigate, turn on Preserve log, and clear the cache.

## Steps

1. Open https://anentrypoint.github.io/signal/ in one tab and wait 60 seconds.
2. In the console, switch the context dropdown from `top` to the frame whose URL contains `/session/world`. Paste this one line and press Enter:

```js
({ shown: document.documentElement.classList.contains('spawn-world-shown'), canvases: [...document.querySelectorAll('canvas')].map(c => c.width + 'x' + c.height), laneBits: window.__spawnArrivalLaneBits ?? null })
```

3. Copy the output. Then filter the console for `warm arm`, then for `[Tome]`, then for `[scripts]`, and copy every matching line. Take a screenshot of the world area.
4. Repeat steps 1 to 3 in the same browser for the live site, after a cache clear: https://www.spawn.co/@lanmower/signal-stage, and wait 60 seconds first.

## Reading the result

The check passes when all of these hold on both URLs:

- The `warm arm` line `[scripts] the warm arm ran N units in X ms and ended by ...` is present.
- No `[Tome]` line says `renders NOTHING` or `has no renderable bounds`.
- `shown` is `true`, and it is the same value on the published page and on live.
- The canvases are not `0x0`, and the world area in the screenshot is not black.

Report back the `chrome://gpu` WebGPU line, the snippet output for each URL, the filtered lines for each URL, and the two screenshots. If any part fails, send the same material and say which URL failed. Do not change the export to make a result pass: the result decides what changes next.