//# allFunctionsCalledOnLoad
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,617446,e=>{"use strict";var t=e.i(241019);let a=String.raw`function makeModel(startMs) {
    var value = P.start, painted = P.start, lastMs = startMs, top = P.quietMark, tau = P.firstTauMs, pace = 0, far = false, spoken = false, frozen = false, step = '';
    function integrate(nowMs) {
      var dt = Math.max(0, nowMs - lastMs);
      lastMs = nowMs;
      if (frozen || dt === 0) return;
      if (value < top) value = far && !spoken ? Math.min(top, value + dt * pace) : top - (top - value) * Math.exp(-dt / tau);
      painted = Math.min(Math.max(value, P.quietMark - (P.quietMark - P.start) * Math.exp((startMs - nowMs) / P.floorTauMs)), painted + dt / (BLOCKS * P.tickMs));
    }
    return {
      observe: function (state, nowMs) {
        integrate(nowMs);
        frozen = state.phase === 'error' || state.phase === 'disconnected';
        if (state.bootWaitCondition || state.body || state.world) spoken = true;
        var n = shown(state) ? 100 : state.progress, said = state.phase + '/' + n + '/' + state.body + '/' + state.world;
        for (var i = 0; i < P.marks.length; i++) if (n >= P.marks[i][0]) { far = true; top = P.hold; value = Math.max(value, P.marks[i][1], spoken ? 0 : P.quietMark); }
        if (far && said !== step) { step = said; pace = value / (nowMs - startMs + (spoken ? P.paceMs : P.quietPaceMs)); tau = Math.max(1, (top - value) / pace); }
      },
      valueAt: function (nowMs) { integrate(nowMs); return painted; }
    };
  }`,r=String.raw`function bar(progress) {
    var p = Math.max(0, Math.min(1, progress)), solid = p >= 1 ? BLOCKS : Math.floor(p * BLOCKS + 1e-6), out = [];
    for (var i = 0; i < BLOCKS; i++) out.push(i < solid ? 'solid' : i === solid ? 'dense' : i === solid + 1 ? 'sparse' : 'empty');
    return out;
  }`,n=String.raw`function paintBar() {
    if (!curtain) return;
    var el = curtain.querySelector('[data-curtain-bar]'); if (!el) return;
    var value = Math.max(0, Math.min(1, model.valueAt(now()))), blocks = bar(value);
    receipt.progress = value;
    el.setAttribute('aria-valuenow', String(Math.round(value * 100)));
    for (var i = 0; i < el.children.length && i < blocks.length; i++) {
      if (el.children[i].getAttribute('data-b') !== blocks[i]) el.children[i].setAttribute('data-b', blocks[i]);
    }
  }`,i=String.raw`function watchBar() {
    if (!curtain) return false;
    var bar = doc.documentElement.style.getPropertyValue(BAR_VAR), docked = doc.documentElement.hasAttribute(DOCK_ATTR);
    if (bar === barAt && docked === dockedAt) return false;
    barAt = bar;
    dockedAt = docked;
    refit();
    return true;
  }
  function refit() { hangFoot(); fitBox(true); snapStage(); }
  function hangFoot() {
    var foot = curtain.querySelector('[data-curtain-foot]'), home = dockedAt ? curtain.querySelector('[data-curtain-stage]') : curtain;
    if (foot && home && foot.parentNode !== home) home.appendChild(foot);
  }
  function snapStage() {
    var stage = curtain && curtain.querySelector('[data-curtain-stage]'), wisp = stage && stage.querySelector('[data-wisp-loop]'), floor = curtain && curtain.querySelector('[data-curtain-ground]');
    if (!wisp || !floor) return;
    stage.style.left = stage.style.top = '';
    var g = floor.getBoundingClientRect(), r = wisp.getBoundingClientRect(), dpr = win.devicePixelRatio || 1, down = r.top - g.top, step = parseFloat(win.getComputedStyle(stage).top) || 0;
    stage.style.left = Math.round((g.left + (g.width - r.width) / 2) * dpr) / dpr - r.left + 'px';
    stage.style.top = step + Math.round(down / CELL) * CELL - down + 'px';
  }
  function fitBox(fresh) {
    var box = curtain.querySelector('[data-curtain-box],[data-curtain-face]'), stage = curtain.querySelector('[data-curtain-stage]'), foot = curtain.querySelector('[data-curtain-foot]');
    if (!box || !stage || !foot) return;
    if (fresh) box.style.display = '';
    if (!barAt || box.style.display === 'none') return;
    var s = stage.getBoundingClientRect(), f = foot.getBoundingClientRect();
    var short = dockedAt ? f.top + 2 * FOOT_LINE > win.innerHeight - (parseFloat(barAt) || 0) : s.bottom + GAP > Math.min(f.top, f.bottom - 2 * FOOT_LINE);
    if (s.top < 0 || short) box.style.display = 'none';
  }
  function boxed(entries) {
    for (var i = 0; i < entries.length; i++) if (entries[i].contentRect.width > 0 && entries[i].contentRect.height > 0) return true;
    return false;
  }`,o=String.raw`function dropBoxOnDeadArt(root) {
    var face = root.querySelector('[data-curtain-face] img');
    if (face) {
      var bare = function () { var person = root.querySelector('[data-curtain-face-fallback]'); if (face.parentNode) face.parentNode.removeChild(face); if (person) person.style.display = 'flex'; };
      if (face.complete && face.naturalWidth === 0 && face.getAttribute('src')) bare(); else face.addEventListener('error', bare);
    }
    var box = root.querySelector('[data-curtain-box]');
    if (!box) return;
    var drop = function () { if (box.parentNode) box.parentNode.removeChild(box); };
    var arts = box.querySelectorAll('img');
    for (var i = 0; i < arts.length; i++) {
      if (arts[i].complete && arts[i].naturalWidth === 0 && arts[i].getAttribute('src')) { drop(); return; }
      arts[i].addEventListener('error', drop);
    }
  }`,s=String.raw`function runLoopsFrom(ranMs) {
    if (!curtain || !curtain.getAnimations) return;
    try { var loops = curtain.getAnimations({ subtree: true }); for (var i = 0; i < loops.length; i++) loops[i].currentTime = ranMs; } catch (e) {}
  }`;var c=e.i(510269),u=e.i(566398),d=e.i(72873);let l="__spawnDenWaitSince",f="data-den-wait-driven",p=String.raw`
(function () {
  var win = window, doc = document, me = doc.currentScript, curtain = me && me.previousElementSibling;
  if (!curtain || curtain.id !== '${c.R}' || curtain.hasAttribute('${f}')) return;
  curtain.setAttribute('${f}', '');
  var P = ${JSON.stringify({start:.0834,hold:.9,firstTauMs:1e4,floorTauMs:3e3,paceMs:2e3,quietMark:.34,quietPaceMs:500,marks:[[50,.25],[60,.34],[85,.6],[95,.84]],tickMs:120})}, BLOCKS = ${t.D}, CELL = ${4};
  var BAR_VAR = '${u.u}', FOOT_LINE = ${t.z}, GAP = ${t.u}, DOCK_ATTR = '${c.N}';
  var barAt = null, dockedAt = false, ticker = null, receipt = {};
  function now() { return win.performance && typeof win.performance.now === 'function' ? win.performance.now() : Date.now(); }
  function shown(state) { return typeof state.world === 'string' ? state.world === 'shown' : state.phase === 'ready'; }
  ${a}
  ${r}
  ${n}
  ${i}
  ${o}
  ${s}
  var since = win.${l};
  if (typeof since !== 'number') since = win.${l} = Date.now();
  var model = makeModel(now() - Math.max(0, Date.now() - since));
  var placed = false, shownLoop = null, watch = null, watchBack = false, barWatch = null, WORD = 'spawn:kernel:loading-state:cache', SAID = '${c.m}';
  var host = curtain.parentNode, ahead = null, aheadAsk = null, aheadWatch = null;
  function place() {
    if (!curtain || curtain.getBoundingClientRect().width <= 0) return false;
    dropAhead();
    if (watchBar()) letStageGo();
    keepClock();
    return true;
  }
  function wispLoop() {
    var wisp = curtain.querySelector('[data-wisp-loop]'), loops = wisp && wisp.getAnimations ? wisp.getAnimations({ subtree: true }) : [];
    return loops.length ? loops[0] : null;
  }
  function keepClock() {
    var loop = wispLoop();
    if (placed && loop === shownLoop) return;
    placed = true;
    shownLoop = loop;
    runLoopsFrom(Math.max(0, Date.now() - since));
  }
  function started(event) { var t = event.target; if (curtain && t && t.closest && t.closest('[data-wisp-loop]') && curtain.getBoundingClientRect().width > 0) keepClock(); }
  curtain.addEventListener('animationstart', started);
  function paint() {
    if (!curtain.isConnected) {
      dropAhead();
      if (ticker !== null) win.clearInterval(ticker);
      if (watch) { watch.disconnect(); watch = null; }
      if (barWatch) barWatch.disconnect();
      win.removeEventListener('resize', resized);
      curtain.removeEventListener('animationstart', started);
      win.removeEventListener(WORD, hear);
      win.removeEventListener(SAID, say);
      curtain = null;
      if (!doc.querySelector('[${f}]')) delete win.${l};
      return;
    }
    place();
    paintBar();
  }
  dropBoxOnDeadArt(curtain);
  var stage = curtain.querySelector('[data-curtain-stage]');
  if (stage && win.ResizeObserver) { watch = new win.ResizeObserver(function (entries) { if (boxed(entries) && place()) snapStage(); }); watch.observe(stage); }
  function letStageGo() {
    if (!watch || watchBack) return;
    watch.unobserve(stage);
    watchBack = true;
    win.requestAnimationFrame(function () { watchBack = false; if (watch && curtain && curtain.isConnected) watch.observe(stage); });
  }
  if (win.MutationObserver) { barWatch = new win.MutationObserver(function () { if (doc.documentElement.style.getPropertyValue(BAR_VAR) !== barAt || doc.documentElement.hasAttribute(DOCK_ATTR) !== dockedAt) place(); }); barWatch.observe(doc.documentElement, { attributes: true, attributeFilter: ['style', DOCK_ATTR] }); }
  function resized() { if (place()) refit(); }
  win.addEventListener('resize', resized);
  function hear(event) {
    var state = event.detail;
    if (curtain && state && typeof state.phase === 'string' && !shown(state)) { model.observe(state, now()); paintBar(); }
  }
  win.addEventListener(WORD, hear);
  function say(event) {
    var d = event.detail, foot = curtain && curtain.querySelector('[data-curtain-foot]'), line = d && d.above === true ? '' : typeof d === 'string' ? d : '';
    if (foot && foot.textContent !== line) { foot.textContent = line; if (place()) { fitBox(false); snapStage(); } }
  }
  win.addEventListener(SAID, say);
  ticker = win.setInterval(paint, P.tickMs);
  paint();
  function dropAhead() {
    if (aheadAsk) { aheadAsk.disconnect(); aheadAsk = null; }
    if (aheadWatch) { aheadWatch.disconnect(); aheadWatch = null; }
    if (ahead) { if (ahead.parentNode) ahead.parentNode.removeChild(ahead); ahead = null; }
  }
  function settleAhead() {
    if (!curtain || !curtain.isConnected) dropAhead();
    else if (!host.closest('[hidden]')) { place(); dropAhead(); }
  }
  function standsElsewhere() {
    var all = doc.querySelectorAll('[id="${c.R}"]');
    for (var i = 0; i < all.length; i++) if (all[i] !== curtain && all[i].getBoundingClientRect().width > 0) return true;
    return false;
  }
  function standAhead() {
    if (!curtain || !curtain.isConnected || placed || ahead || !host.closest('[hidden]') || standsElsewhere()) return;
    ahead = host.cloneNode(false);
    ahead.setAttribute('${"data-den-wait-ahead"}', '');
    ahead.removeAttribute('data-testid');
    var copy = curtain.cloneNode(true), again = (${d.c})(doc);
    copy.removeAttribute('${f}');
    again.textContent = me.textContent;
    ahead.appendChild(copy);
    ahead.appendChild(again);
    doc.body.appendChild(ahead);
    if (win.MutationObserver) { aheadWatch = new win.MutationObserver(settleAhead); aheadWatch.observe(doc.documentElement, { childList: true, subtree: true }); }
    win.setTimeout(dropAhead, ${3e3});
  }
  if (doc.body && host && host.closest && host.closest('[hidden]') && win.ResizeObserver) {
    aheadAsk = new win.ResizeObserver(function () { if (aheadAsk) { aheadAsk.disconnect(); aheadAsk = null; } standAhead(); });
    aheadAsk.observe(doc.documentElement);
  }
})();
`.replace(/^[ \t]*\/\*(?:(?!\*\/)[\s\S])*\*\/[ \t]*$/gm,"").replace(/\n\s*\n/g,"\n"),h=null;e.s(["k",0,f,"P",0,p,"r",0,function(e=window){let t=e[l];return"number"==typeof t?t:null},"Y",0,function(e=window){delete e[l]},"U",0,function(e){h=e},"e",0,function(){return h}],617446)}]);