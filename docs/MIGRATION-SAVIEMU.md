# Spawn to saviemu migration

## Status

../saviemu is not on this host. The sibling path from the signal-stage checkout (../saviemu), /workspace/saviemu, and a depth-4 search of / all come up empty. Nothing in this document was checked against saviemu. It records what the signal-stage static site now does, so that a saviemu port can reproduce it.

## What moved

- The server side is gone. serve-local.mjs, its grant replacement, the session grant and telemetry handling, and the probe, holder, heavy, tree and witness tooling were removed (commit d2f892bf). The export reads the snapshot in-process through .spawn/local/static-source.mjs.
- The export is .spawn/local/export-pages.mjs. It crawls the static source, rebases root-absolute references under /signal/, and writes the site with a manifest and a summary.
- Batched world-store POSTs are answered at export time (commit ba458441, rows 374 to 378 of docs/PENDING_VALIDATION.md). The transport seam h=($,Z)=>n!==null?n($,Z):fetch($,Z) is rewritten in every module that has it to call __replayFetch($,Z,n), from world-store-values.mjs.
- The localizer is a raw literal (row 375). The session origin branch now returns base+'/session/'.

## Tried and failed

- Injecting the POST replay into about:blank frames: rejected by the user. The frames bypassed the localizer fetch wrapper, so the replay did not reach them, and the design left a hidden dependency on frame creation.
- Answering the session grant and SDK with 503 JSON (row 5): the page loads, but 82 ERR_ABORTED remained.
- Rail hiding by CSS ([data-rail-group]{display:none!important}, row 6) was verified and is kept in the localizer.
- Stripping the door-ask cancel from the served kernel text (the note on _v4_client_pool_60d2a80e in docs/PENDING_VALIDATION.md). Not carried into the export.
- A localizer that answers same-path session writes with history.replaceState: the kernel never writes through iframe.src, so it never ran. Reverted.
- Rewriting cache:"reload" to cache:"default": the same aborts remained. Reverted.
- Removing the eager kernel frame src: the aborts went away, but the session never loaded.
- The probe and holder footprint measurements (Phase B window 5 record) were removed with the tooling; their results remain in the ledger.

## Decided

1. Value POSTs become per-hash GETs of world-store/values/<hash>, framed as before: a uint32 big-endian length then the payload for each value present; absent values are skipped. The engine sees the same bytes it got from the old server.
2. POSTs with a captured snapshot reply are answered by route (path and query) plus SHA-256 of the body, from post-replies/<hash>-<n>.bin with the recorded content type. The snapshot holds 29 such records: values 7, scans 12, closure 7, cdn/resolve 3, with 28 distinct body hashes. The old server did the same lookup, and it took precedence over value frames.
3. Any other POST is answered 404 locally, with no network request. The static host cannot answer POSTs, and this keeps the console free of 501 errors.
4. GETs with the query ?absent are answered 404 locally. The snapshot has no derived store, so the answer is the same one the old server gave.
5. The inline /api/ guard stays. kernel-witness answers {}.
6. Values: the export writes 527 value bodies, every hash that the fetch log resolves to a served file, and fails if the count differs from the snapshot list. The snapshot holds 1,003 files named _world-store_values_*: 502 bodies and 501 .headers.txt sidecars. The sidecars are not exported, because no caller reads them.

## Open

- A POST whose body is not in the snapshot gets the local 404. Six cdn/watch POSTs per load have no snapshot reply, so they get it on every load. The browser run reports no console errors, but the watch behaviour is not reproduced.
- A scans, closure or cdn/resolve body that the snapshot never captured gets the local 404. Coverage is whatever the live capture recorded.
- The 1,003 figure in the original brief counts sidecars. The exported value set is 527 bodies.
- saviemu port: not checked, since ../saviemu is not on this host.
