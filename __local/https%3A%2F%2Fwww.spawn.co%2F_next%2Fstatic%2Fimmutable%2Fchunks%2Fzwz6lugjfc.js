//# allFunctionsCalledOnLoad
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,573741,146475,e=>{"use strict";let t="bootLedger";e.s(["f",0,t],146475);let a="spawn.preview-startup.",n="loadingScreenHiddenMs",o="spawn.curtain.shown";String.raw`() => {
    const meta = document.querySelector('meta[name="${"spawn-boot-ledger"}"]');
    return !!meta && !(meta.content === 'rig' && /[?&]${t}=off(?:&|$)/.test(window.location.search));
  }`,String.raw`(s) =>
    !!s &&
    (s.boot
      ? !!(s.boot.at && s.boot.at.playable > 0)
      : (s.world !== undefined ? s.world === 'shown' : s.phase === 'ready') &&
        (s.body !== undefined ? s.body === 'standing' : s.phase === 'ready'))`,String.raw`() =>
    performance.getEntriesByName('${a}${n}', 'mark').length > 0 ||
    performance.getEntriesByName('${o}', 'mark').length === 0`,e.s(["f",0,"data-boot-door","g",0,"__spawnBootLeftSent","d",0,"iframeSrcSetMs","e",0,"kernelLoadingStateSeenMs","$",0,"spawn.curtain.early","i",0,n,"m",0,o,"A",0,"sessionAttachedMs","c",0,e=>`${a}${e}`],573741)}]);