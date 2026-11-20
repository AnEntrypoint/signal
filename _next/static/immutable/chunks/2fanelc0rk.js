//# allFunctionsCalledOnLoad
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,17158,e=>{"use strict";let t="data-spawn-world-page";String.raw`
(function () {
  try {
    if (typeof window === 'undefined' || window.__spawnGameSurfaceGestureLaw) return;
    var tally = { cancelled: 0, uncancelable: 0 };
    window.__spawnGameSurfaceGestureLaw = tally;

    var nonPassive = { capture: true, passive: false };

    var html = document.documentElement;
    var refuse = function (event) {
      if (!html.hasAttribute('${t}')) return;
      if (event.cancelable === false) {
        tally.uncancelable += 1;
        return;
      }
      event.preventDefault();
      tally.cancelled += 1;
    };
    var preventMultiTouch = function (event) {
      if (event.touches && event.touches.length > 1) refuse(event);
    };
    var preventGesture = function (event) {
      refuse(event);
    };
    var preventCtrlWheel = function (event) {
      if (event.ctrlKey) refuse(event);
    };

    window.addEventListener('touchstart', preventMultiTouch, nonPassive);
    window.addEventListener('touchmove', preventMultiTouch, nonPassive);
    window.addEventListener('gesturestart', preventGesture, nonPassive);
    window.addEventListener('gesturechange', preventGesture, nonPassive);
    window.addEventListener('gestureend', preventGesture, nonPassive);
    window.addEventListener('wheel', preventCtrlWheel, nonPassive);
  } catch (error) {}
})();
`,e.s(["S",0,"__spawnGameSurfaceGestureLaw","C",0,t])}]);