//# allFunctionsCalledOnLoad
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,617446,e=>{var t=e.i(241019);let a=String.raw`function makeModel(startMs) {
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
  }`,o=String.raw`function watchBar() {
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
  }`,i=String.raw`function dropBoxOnDeadArt(root) {
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
  }`;var l=e.i(510269),c=e.i(566398),u=e.i(72873);let d="__spawnDenWaitSince",f="data-den-wait-driven",h=String.raw`
(function () {
  var win = window, doc = document, me = doc.currentScript, curtain = me && me.previousElementSibling;
  if (!curtain || curtain.id !== '${l.R}' || curtain.hasAttribute('${f}')) return;
  curtain.setAttribute('${f}', '');
  var P = ${JSON.stringify({start:.0834,hold:.9,firstTauMs:1e4,floorTauMs:3e3,paceMs:2e3,quietMark:.34,quietPaceMs:500,marks:[[50,.25],[60,.34],[85,.6],[95,.84]],tickMs:120})}, BLOCKS = ${t.D}, CELL = ${4};
  var BAR_VAR = '${c.u}', FOOT_LINE = ${t.z}, GAP = ${t.u}, DOCK_ATTR = '${l.N}';
  var barAt = null, dockedAt = false, ticker = null, receipt = {};
  function now() { return win.performance && typeof win.performance.now === 'function' ? win.performance.now() : Date.now(); }
  function shown(state) { return typeof state.world === 'string' ? state.world === 'shown' : state.phase === 'ready'; }
  ${a}
  ${r}
  ${n}
  ${o}
  ${i}
  ${s}
  var since = win.${d};
  if (typeof since !== 'number') since = win.${d} = Date.now();
  var model = makeModel(now() - Math.max(0, Date.now() - since));
  var placed = false, shownLoop = null, watch = null, watchBack = false, barWatch = null, WORD = 'spawn:kernel:loading-state:cache', SAID = '${l.m}';
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
      if (!doc.querySelector('[${f}]')) delete win.${d};
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
    var all = doc.querySelectorAll('[id="${l.R}"]');
    for (var i = 0; i < all.length; i++) if (all[i] !== curtain && all[i].getBoundingClientRect().width > 0) return true;
    return false;
  }
  function standAhead() {
    if (!curtain || !curtain.isConnected || placed || ahead || !host.closest('[hidden]') || standsElsewhere()) return;
    ahead = host.cloneNode(false);
    ahead.setAttribute('${"data-den-wait-ahead"}', '');
    ahead.removeAttribute('data-testid');
    var copy = curtain.cloneNode(true), again = (${u.c})(doc);
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
`.replace(/^[ \t]*\/\*(?:(?!\*\/)[\s\S])*\*\/[ \t]*$/gm,"").replace(/\n\s*\n/g,"\n"),p=null;e.s(["k",0,f,"P",0,h,"r",0,function(e=window){let t=e[d];return"number"==typeof t?t:null},"Y",0,function(e=window){delete e[d]},"U",0,function(e){p=e},"e",0,function(){return p}],617446)},498332,e=>{var t=e.i(428607),a=e.i(902889),r=e.i(437052),n=e.i(510269);let o=function(e){let n=({width:e,height:t})=>`${e}px ${t}px`,o=a.X.map(e=>`--ground-${e}:url(${(0,a.x)(r.L.key,e)})`).join(";"),[i,...s]=a.A,l=t.H[i];return`#${e}{--ground-floor:${r.L.floor};--ground-accent:${r.L.accent};${o}}[data-curtain-ground]{position:absolute;inset:0;background-color:var(--ground-floor);background-position:50% 0;background-repeat:no-repeat,repeat-x;image-rendering:pixelated}[data-curtain-ground]{background-image:var(--ground-${i}),var(--ground-${a.R});background-size:${n(l.cover)},${n((0,t.O)(l))}}`+s.map(e=>`@media (max-width:${t.H[e].maxWidth}px){${(e=>{let{cover:a}=t.H[e];return`[data-curtain-ground]{background-image:var(--ground-${e});background-size:${n(a)}}`})(e)}}`).join("")}(n.R);function i(e){let t=a.X.map(t=>`--ground-${t}:url(${(0,a.x)(e.key,t)})`).join(";");return`#${n.R}{--ground-floor:${e.floor};--ground-accent:${e.accent};${t}}`}e.s(["W",0,o,"Z",0,function(e){return e?`${o}${i(e)}`:o},"$",0,i])},496149,e=>{var t=e.i(241019),a=e.i(339016),r=e.i(792711),n=e.i(566398),o=e.i(510269),i=e.i(967122);e.i(761096);let s=String.raw`(function () {
  ${"var keepGl = function (canvas, attributes, hooks) { var gl = canvas.getContext('webgl2', attributes); if (!gl) return null; var lost = false, returned = false, element = canvas.style || null; var onLost = function (event) { event.preventDefault(); if (lost) return; lost = true; returned = false; if (element) element.visibility = 'hidden'; if (hooks.lost) hooks.lost(); }; var onRestored = function () { if (!lost || gl.isContextLost()) return; lost = false; returned = true; if (!hooks.make || !hooks.make(gl)) { lost = true; returned = false; } }; canvas.addEventListener('webglcontextlost', onLost); canvas.addEventListener('webglcontextrestored', onRestored); return { gl: gl, gone: function () { return lost || gl.isContextLost(); }, dark: function () { return lost || returned || gl.isContextLost(); }, drawn: function () { if (!returned || lost) return; returned = false; if (element) element.visibility = ''; if (hooks.back) hooks.back(); }, end: function () { canvas.removeEventListener('webglcontextlost', onLost); canvas.removeEventListener('webglcontextrestored', onRestored); } }; };"}
  var MAGIC = 'SPAWNARV';
  var PITCH_MAX = 1.45;
  var LOOK_MARGIN = 0.12;
  function read(bytes) {
    if (!bytes || bytes.length < 12) return null;
    for (var i = 0; i < 8; i++) if (bytes[i] !== MAGIC.charCodeAt(i)) return null;
    var n = bytes[8] | (bytes[9] << 8) | (bytes[10] << 16) | (bytes[11] * 16777216);
    if (n <= 0 || n > 16384 || bytes.length < 12 + n) return null;
    var meta;
    try { meta = JSON.parse(new TextDecoder().decode(bytes.subarray(12, 12 + n))); } catch (e) { return null; }
    if (!meta || meta.v !== 2 || !meta.faces || (!meta.faces.length && meta.handover !== false)) return null;
    if (!(meta.fovYDeg > 0 && meta.fovYDeg < 180) || !(meta.lookRadiansPerPx > 0) || !isFinite(meta.yaw) || !isFinite(meta.pitch)) return null;
    return { meta: meta, payloadStart: 12 + n };
  }
  function shows(meta, now) {
    if (meta.handover === false) return false;
    var sky = meta.sky;
    if (!sky) return true;
    var into = (((now - sky.at) % sky.periodMs) + sky.periodMs) % sky.periodMs;
    return into <= sky.after || sky.periodMs - into <= sky.before;
  }
  function shader(gl, type, text) {
    var s = gl.createShader(type);
    gl.shaderSource(s, text);
    gl.compileShader(s);
    return s;
  }
  function mount(host, source, options) {
    options = options || {};
    var canvas = document.createElement('canvas');
    canvas.setAttribute('data-arrival-view', '');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;opacity:0';
    // the context on the one road a page canvas of ours takes through a lost context (@spawn/core/gl-keep): it asks a lost context back
    // and hides the canvas at once, makes the view's objects again when the context returns, and shows the canvas at its first picture after it
    var kept = keepGl(canvas, { alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'low-power' }, { lost: onLost, make: onMade });
    if (!kept) return null;
    var gl = kept.gl;
    var uM, uF, uR, uU;
    // the context's own objects: made at the mount, and made again when a lost context comes back
    function build() {
      var program = gl.createProgram();
      gl.attachShader(program, shader(gl, gl.VERTEX_SHADER, '#version 300 es\nin vec2 p;uniform mat4 m;uniform vec3 f;uniform vec3 r;uniform vec3 u;out vec2 t;void main(){t=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=m*vec4(f+p.x*r+p.y*u,1.);}'));
      gl.attachShader(program, shader(gl, gl.FRAGMENT_SHADER, '#version 300 es\nprecision mediump float;in vec2 t;uniform sampler2D s;out vec4 o;void main(){o=vec4(texture(s,t).rgb,1.);}'));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);
      var quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var at = gl.getAttribLocation(program, 'p');
      gl.enableVertexAttribArray(at);
      gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
      uM = gl.getUniformLocation(program, 'm'); uF = gl.getUniformLocation(program, 'f'); uR = gl.getUniformLocation(program, 'r'); uU = gl.getUniformLocation(program, 'u');
      return true;
    }
    if (!build()) return null;
    host.appendChild(canvas);
    var meta = null, start = 0, faces = [], yaw = 0, pitch = 0, shown = false, gone = false, epoch = 0, frame = 0, clear = [0.05, 0.05, 0.06], decoded = [];
    // a face stands near the screen when no edge plane of the screen's frustum, each widened by LOOK_MARGIN, has all four of its corners outside
    function nearby(face, R, U, F, tanH, tanV) {
      var out = [0, 0, 0, 0, 0];
      for (var j = 0; j < 4; j++) {
        var sr = j & 1 ? 1 : -1, su = j & 2 ? 1 : -1;
        var px = face.forward[0] + sr * face.right[0] + su * face.up[0], py = face.forward[1] + sr * face.right[1] + su * face.up[1], pz = face.forward[2] + sr * face.right[2] + su * face.up[2];
        var x = R[0] * px + R[1] * py + R[2] * pz, y = U[0] * px + U[1] * py + U[2] * pz, z = F[0] * px + F[1] * py + F[2] * pz;
        if (z <= 0) out[0]++;
        if (x > tanH * z) out[1]++;
        if (x < -tanH * z) out[2]++;
        if (y > tanV * z) out[3]++;
        if (y < -tanV * z) out[4]++;
      }
      return out.indexOf(4) < 0;
    }
    function upload(item) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, item.bitmap);
      if (item.bitmap.close) item.bitmap.close();
      item.face.texture = texture;
    }
    function draw() {
      frame = 0;
      if (gone || kept.gone() || !meta) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      var first = -1;
      for (var q = 0; q < decoded.length; q++) if (first < 0 || decoded[q].index < decoded[first].index) first = q;
      if (first >= 0) upload(decoded.splice(first, 1)[0]);
      gl.viewport(0, 0, w, h);
      gl.clearColor(clear[0], clear[1], clear[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var fx = -sy * cp, fy = sp, fz = -cy * cp, rx = cy, ry = 0, rz = -sy;
      var ux = ry * fz - rz * fy, uy = rz * fx - rx * fz, uz = rx * fy - ry * fx;
      var half = (meta.fovYDeg * Math.PI) / 360, k = 1 / Math.tan(half), a = w / h, near = 0.05, far = 10;
      var c = (far + near) / (near - far), d = (2 * far * near) / (near - far);
      var m = new Float32Array([(k / a) * rx, k * ux, -c * fx, fx, (k / a) * ry, k * uy, -c * fy, fy, (k / a) * rz, k * uz, -c * fz, fz, 0, 0, d, 0]);
      var tanH = Math.tan(Math.min(1.5, Math.atan(Math.tan(half) * a) + LOOK_MARGIN)), tanV = Math.tan(Math.min(1.5, half + LOOK_MARGIN));
      for (var n = 0; n < faces.length; n++) {
        var next = faces[n];
        if (!next.asked && next.whole && nearby(next, [rx, ry, rz], [ux, uy, uz], [fx, fy, fz], tanH, tanV)) {
          next.asked = true;
          land(next, n, new Blob([held.subarray(start + next.at, start + next.at + next.length)], { type: next.type }));
        }
      }
      gl.uniformMatrix4fv(uM, false, m);
      for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        if (!face.texture) continue;
        gl.bindTexture(gl.TEXTURE_2D, face.texture);
        gl.uniform3fv(uF, face.forward);
        gl.uniform3fv(uR, face.right);
        gl.uniform3fv(uU, face.up);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!shown && faces[0] && faces[0].texture) {
        shown = true;
        canvas.style.opacity = '1';
        if (options.onShown) options.onShown();
      }
      kept.drawn();
      if (decoded.length) ask();
    }
    function ask() {
      if (!frame && !gone && !kept.gone()) frame = requestAnimationFrame(draw);
    }
    function land(face, index, blob) {
      var asked = epoch;
      createImageBitmap(blob, { imageOrientation: 'none', premultiplyAlpha: 'none', colorSpaceConversion: 'none' }).then(function (bitmap) {
        if (gone || asked !== epoch) { if (bitmap.close) bitmap.close(); return; }
        decoded.push({ face: face, index: index, bitmap: bitmap });
        ask();
      }, function () {});
    }
    var held = new Uint8Array(0);
    function take(bytes) {
      held = bytes;
      if (!meta) {
        var r = read(held);
        if (!r) return;
        if (options.accept && !options.accept(r.meta)) { handle.dispose(); return; }
        meta = r.meta; start = r.payloadStart; yaw = meta.yaw; pitch = meta.pitch;
        for (var i = 0; i < meta.faces.length; i++) {
          var f = meta.faces[i];
          faces.push({ face: f.face, forward: new Float32Array(f.forward), right: new Float32Array(f.right), up: new Float32Array(f.up), at: f.at, length: f.length, type: f.type, asked: false, whole: false, texture: null });
        }
      }
      // a frame is asked only when a face's bytes have just come whole: the look then judges whether it is near
      var whole = false;
      for (var k = 0; k < faces.length; k++) if (!faces[k].whole && start + faces[k].at + faces[k].length <= held.length) { faces[k].whole = true; whole = true; }
      if (whole) ask();
    }
    var finger = null, lastX = 0, lastY = 0;
    function down(e) {
      if (finger !== null || !meta) return;
      finger = e.pointerId; lastX = e.clientX; lastY = e.clientY;
      try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
    }
    function move(e) {
      if (e.pointerId !== finger || !meta) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      var gains = options.lookGains;
      var gain = !gains ? 1 : e.pointerType === 'touch' ? (gains.touch * gains.touchAtPx) / Math.max(1, Math.min(window.innerWidth, window.innerHeight)) : gains.mouse;
      yaw -= dx * gain * meta.lookRadiansPerPx;
      pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, pitch - dy * gain * meta.lookRadiansPerPx));
      if (options.onLook) options.onLook({ yaw: yaw, pitch: pitch });
      ask();
      e.preventDefault();
    }
    function up(e) {
      if (e.pointerId === finger) finger = null;
    }
    // A LOST CONTEXT (the GPU process died, the device was reset) takes the view off the screen at once: the road hides the canvas and
    // asks the context back, and the view drops its textures and its decodes. When the context comes back the view makes its objects
    // again, decodes its faces again from the bytes it holds, and shows again.
    function onLost() {
      if (gone) return;
      epoch++;
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      canvas.style.opacity = '0';
      for (var b = 0; b < decoded.length; b++) if (decoded[b].bitmap.close) decoded[b].bitmap.close();
      decoded = [];
      for (var i = 0; i < faces.length; i++) { faces[i].texture = null; faces[i].asked = false; }
      if (shown) { shown = false; if (options.onHidden) options.onHidden(); }
    }
    function onMade() {
      if (gone || !build()) return false;
      ask();
      return true;
    }
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    window.addEventListener('resize', ask);
    var handle = {
      look: function () { return meta ? { yaw: yaw, pitch: pitch } : null; },
      meta: function () { return meta; },
      dispose: function () {
        gone = true;
        if (frame) cancelAnimationFrame(frame);
        for (var b = 0; b < decoded.length; b++) if (decoded[b].bitmap.close) decoded[b].bitmap.close();
        decoded = [];
        window.removeEventListener('resize', ask);
        kept.end();
        var lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
    if (source instanceof Uint8Array) take(source);
    else if (source && source.body && source.body.getReader) {
      // one buffer the body lands in, sized by the answer's length where it names one
      var reader = source.body.getReader(), total = 0, buffer = new Uint8Array(Number(source.headers && source.headers.get && source.headers.get('content-length')) || 65536);
      var pump = function () {
        reader.read().then(function (step) {
          if (gone || step.done) return;
          var chunk = step.value;
          if (total + chunk.length > buffer.length) {
            var grown = new Uint8Array(Math.max(buffer.length * 2, total + chunk.length));
            grown.set(buffer.subarray(0, total));
            buffer = grown;
          }
          buffer.set(chunk, total);
          total += chunk.length;
          take(buffer.subarray(0, total));
          pump();
        }, function () {});
      };
      pump();
    }
    return handle;
  }
  window.__spawnArrivalView = { read: read, mount: mount, shows: shows };
})();`,l="application/x-spawn-arrival";var c=e.i(15038);let u="data-curtain-arrival",d="data-curtain-arrival-shown",f="data-curtain-arrival-host",h="data-curtain-arrival-ran",p="__spawnCurtainArrivalAsk",g="spawn.curtain.arrival-asked",m="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",v="__spawnCurtainArrival";String.raw`(function () {
  ${(0,i.N)("reach")}
  var curtain = document.getElementById('${o.R}');
  if (!curtain || curtain.hasAttribute('${h}')) return;
  curtain.setAttribute('${h}', '');
  var spec = null;
  try { spec = JSON.parse(curtain.getAttribute('${u}') || 'null'); } catch (e) {}
  if (spec && typeof spec.url === 'string') spec.url = reach(spec.url);
  if (!spec || typeof spec.url !== 'string' || !window.WebGL2RenderingContext || !window.createImageBitmap || !window.fetch) return;
  ${s}
  var view = window.__spawnArrivalView;
  var host = document.createElement('div');
  host.setAttribute('${f}', '');
  curtain.insertBefore(host, curtain.firstChild);
  var handle = null, kept = false, last = null, seen = null, off = false, marked = false;
  function post(look) {
    last = look;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || !frame.contentWindow) return;
    var message = { type: '${c.F1}', yaw: look.yaw, pitch: look.pitch };
    if (seen) message.tier = seen;
    try { frame.contentWindow.postMessage(message, '*'); } catch (e) {}
  }
  function forget() {
    off = true;
    keep.then(function (box) {
      if (!box) return;
      box.delete(spec.url).catch(function () {});
      box.keys().then(function (requests) {
        var mine = location.origin + '/__arrival-keep/' + spec.world + '/';
        for (var i = 0; i < requests.length; i++) if (requests[i].url.indexOf(mine) === 0) box.delete(requests[i]).catch(function () {});
      }, function () {});
    });
  }
  function accept(meta) {
    if (meta.handover === false) forget();
    return (meta.room === null || meta.room === spec.room) && view.shows(meta, Date.now());
  }
  function name(bytes) {
    if (!window.crypto || !crypto.subtle) return;
    var read = view.read(bytes);
    if (!read) return;
    crypto.subtle.digest('SHA-256', bytes).then(function (digest) {
      var hex = '', b = new Uint8Array(digest);
      for (var i = 0; i < b.length; i++) hex += (b[i] < 16 ? '0' : '') + b[i].toString(16);
      seen = { value: hex, place: read.meta.place, eye: read.meta.eye };
      if (last && handle && handle.meta() && handle.meta().worldHex === read.meta.worldHex && handle.meta().bakedAtSeq === read.meta.bakedAtSeq) post(last);
    }, function () {});
  }
  function shown() {
    curtain.setAttribute('${d}', '');
    if (!marked) { marked = true; try { performance.mark('${"spawn.curtain.arrival-shown"}'); } catch (e) {} }
    var look = handle && handle.look();
    if (look) post(look);
  }
  // a lost context took the picture off the screen: the screen's own ground, box, line and bar stand again until it is back
  function hidden() {
    curtain.removeAttribute('${d}');
  }
  function start(source) {
    if (handle) return;
    handle = view.mount(host, source, { accept: accept, onShown: shown, onHidden: hidden, onLook: post, lookGains: { touch: ${7}, touchAtPx: ${390}, mouse: ${1.75} } });
  }
  var keep = window.caches ? caches.open('${"spawn-arrival-v1"}').catch(function () { return null; }) : Promise.resolve(null);
  // THE PLAYER'S OWN VIEW of this world (the frame keeps it at a rest, kept here alone), under the room its land stands for ('-' for a
  // land that reads no room): the link's room's own view, else the world's room-free one
  function keptUrl(room) { return location.origin + '/__arrival-keep/' + spec.world + '/' + encodeURIComponent(room || '-'); }
  // THE ASK THE HEAD'S PROGRAM PARKED when the kernel frame stood (this document's one ask of this address), else the screen's own;
  // the parking place is closed either way, so the head's watch asks nothing after the screen stands
  var asked = window['${p}'];
  var net = asked && asked.url === spec.url && asked.net ? asked.net : fetch(spec.url, ${m});
  window['${p}'] = null;
  if (!asked || asked.url !== spec.url) { try { performance.mark('${g}'); } catch (e) {} }
  // a refusal (a blocked read, a device offline) is heard from the ask: it lands while the kept views are still being read
  net.catch(function () {});
  keep.then(function (box) {
    if (!box) return [];
    var asks = [spec.room === null ? undefined : box.match(keptUrl(spec.room)), box.match(keptUrl(null)), box.match(spec.url)];
    return Promise.all(asks.map(function (ask) { return ask ? ask.catch(function () { return undefined; }) : undefined; }));
  }).catch(function () { return []; }).then(function (hits) {
    // the first kept tier this link may show: readable (its version's room is true) and of the link's room, or of no room
    return Promise.all(hits.map(function (hit) { return hit ? hit.arrayBuffer().then(function (b) { return new Uint8Array(b); }, function () { return null; }) : null; }));
  }).then(function (keptBytes) {
    for (var i = 0; i < keptBytes.length; i++) {
      var read = keptBytes[i] && view.read(keptBytes[i]);
      if (read && accept(read.meta)) {
        kept = true;
        // the third ask is the device's copy of the world's own tier; the first two, its player's own views
        if (i === 2) name(keptBytes[i]);
        start(keptBytes[i]);
        break;
      }
    }
    net.then(function (response) {
      // a tier that retired with its scene: no view of the world stands, kept or shown
      if (response.status === ${410}) {
        forget();
        if (handle) { handle.dispose(); handle = null; curtain.removeAttribute('${d}'); }
        return;
      }
      if (!response.ok || response.status === ${204}) return;
      if (!kept) start(response.clone());
      response.arrayBuffer().then(function (b) {
        var bytes = new Uint8Array(b), read = view.read(bytes);
        if (read && read.meta.handover === false) { forget(); return; }
        if (!kept) name(bytes);
        keep.then(function (box) { if (box && !off) box.put(spec.url, new Response(bytes, { headers: { 'content-type': '${l}' } })).catch(function () {}); });
      }, function () {});
    }, function () {});
  });
  function onAsk(event) {
    var d = event.data;
    if (!d || d.type !== '${c.rr}' || !event.source) return;
    try { event.source.postMessage({ type: '${c.fR}' }, '*'); } catch (e) {}
    if (last) post(last);
  }
  window.addEventListener('message', onAsk);
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${c.JW}' || d.worldHex !== spec.world) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    forget();
  });
  // the frame's kept view stands for the page's life: it is put away whenever it comes, the screen up or gone
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${c.UU}' || d.worldHex !== spec.world || !(d.bytes instanceof Uint8Array || d.bytes instanceof ArrayBuffer)) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    var bytes = d.bytes instanceof Uint8Array ? d.bytes : new Uint8Array(d.bytes);
    var read = view.read(bytes);
    if (off || !read || read.meta.worldHex !== spec.world) return;
    window.__spawnArrivalKept = { bytes: bytes.length, room: read.meta.room, faces: read.meta.faces.map(function (f) { return [f.face, f.size, f.length]; }) };
    keep.then(function (box) {
      if (box) box.put(keptUrl(read.meta.room), new Response(new Blob([bytes], { type: '${l}' }))).catch(function () {});
    });
  });
  var leave = new MutationObserver(function () {
    if (curtain.isConnected) return;
    leave.disconnect();
    window.removeEventListener('message', onAsk);
    if (handle) handle.dispose();
  });
  leave.observe(document.body, { childList: true });
})();`,String.raw`(function () {
  ${(0,i.N)("reach")}
  var doc = document, ASK = '${p}', FRAME = 'iframe[data-spawn-kernel-frame]';
  if (window[ASK] !== undefined || typeof fetch !== 'function' || typeof MutationObserver !== 'function') return;
  function word() {
    var meta = doc.querySelector('meta[name="${"spawn-curtain-arrival"}"]'), spec = null;
    try { spec = meta ? JSON.parse(meta.getAttribute('content') || 'null') : null; } catch (e) { spec = null; }
    if (spec && typeof spec === 'object' && typeof spec.url === 'string') spec.url = reach(spec.url);
    return spec && typeof spec === 'object' && typeof spec.url === 'string' ? spec : null;
  }
  var spec = word();
  if (!spec) return;
  function ask() {
    if (window[ASK] !== undefined) return true;
    if (!doc.querySelector(FRAME)) return false;
    var net = fetch(spec.url, ${m});
    net.catch(function () {});
    window[ASK] = { url: spec.url, net: net };
    try { performance.mark('${g}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let w="Spawn Pixel",b=`'${w}', system-ui, sans-serif`,y=(e,t)=>`@font-face{font-family:'${e}';src:url(${o.d}) format('woff2');font-display:${t};unicode-range:U+0100-FFFF}@font-face{font-family:'${e}';src:url(${o.y}) format('woff2');font-display:${t};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${e}';src:url(${o.k}) format('woff2');font-display:${t};unicode-range:U+0020-007E,U+00A0,U+2026}`;y(o.b,"swap"),a._,o.b;let k="data-curtain-dissolve",x="rgba(255,255,255,0.08)",$=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),A=t.L,M=`calc(${A} * 0.1)`,E=`rgba(255,255,255,${t.q})`,R='<span data-curtain-dot style="word-spacing:.57em"> </span>',L=`#${o.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${E},${E}) 50% 56%/.12em .12em no-repeat}`,S=e=>`radial-gradient(circle at ${t.G}px ${t.G}px,var(--ground-accent,#fff) ${t.G}px,transparent 0) 0 0/${e}px ${e}px`,T=`#${o.R} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:rgba(255,255,255,${t.a})}#${o.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${o.R} [data-curtain-bar]>i[data-b="dense"]{background:${S(t.U)};animation:spawn-curtain-head ${t.O}ms ease-in-out infinite}#${o.R} [data-curtain-bar]>i[data-b="sparse"]{background:${S(t.$)};animation:spawn-curtain-head ${t.O}ms ease-in-out ${t.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${t.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${o.R} [data-curtain-bar]>i{animation:none}}`;function C(e){let a=e/t.D;return a<=.05?0:a>=.97?null:-1666*Math.log((.97-a)/(.97-.05))}let _=`#${o.R}[data-born]:not([${k}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,P=`[${o._}][${o.p}]{visibility:hidden}`,O=(e,t)=>{let a=`round(nearest,${t},1px)`;return"x"===e?`translate:${t} 0;translate:${a} 0`:`translate:0 ${t};translate:0 ${a}`},B=`#${o.R} [data-curtain-stage]>*{${O("x","calc((100cqw - 100%) / 2)")}}`,N=`html[${o.N}] #${o.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${t.v};margin-top:${t.u}px;translate:-50% 0!important;text-wrap:balance}`;e.s(["N",0,k,"J",0,w,"X",0,function(e){let a=`rgba(255,255,255,${t.a})`,r=[S(t.$),S(t.U),"var(--ground-accent,#fff)"],n=C(t.D-1)??1666,o=`${e} [data-curtain-bar]{display:flex;gap:${t.w}px}${e} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:${a}}`;for(let i=0;i<t.D;i+=1){let t=[C(i-1),C(i),C(i+1)].flatMap((e,t)=>i+t-1<0||null===e?[]:[`${(e/n*100).toFixed(2)}%{background:${r[t]}}`]);o+=`@keyframes spawn-den-bar-${i}{0%{background:${a}}${t.join("")}}${e} [data-curtain-bar]>i:nth-child(${i+1}){animation:spawn-den-bar-${i} ${Math.round(n)}ms steps(1,end) forwards}`}return o},"F",0,function(e){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${t.u}px">${e}<div data-curtain-bar>${"<i></i>".repeat(t.D)}</div></div>`},"u",0,function(e){return`${e} [data-wisp-loop]{margin-bottom:${t.C-t.u}px}`},"A",0,function(e,a="",i="",s=null,l=null){var c;let h=e.face?s:null,p=e.face?null:l,g=e.groundArt?` data-curtain-ground-art="${$(e.groundArt)}"`:"",m=e.ground?` data-curtain-ground-paint="${$(JSON.stringify(e.ground))}"`:"",E=e.face?` ${k}`:"",S=e.face?null:e.arrival??null,C=function(e,a){let n=(0,r.l)(e),o=(0,t.H)(n,a);if(!n&&!o)return"";let i=n?`<span data-curtain-title style="color:rgba(255,255,255,${t.T})">${$(n)}</span>`:"",s=o?`${n?R:""}<span data-curtain-maker style="color:rgba(255,255,255,${t.q})">${$(o)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${t.v};text-align:center;overflow-wrap:anywhere;font-size:${t.P};line-height:${t.M}">${i}${s}</div>`}(e.title,e.maker),U=e.face?e.face.src:e.thumbnailUrl,F="";if(e.face){let e;e=U?`<img src="${$(U)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${x};user-select:none">`:"",F=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${t.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${x}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${U?"none":"flex"};align-items:flex-end;justify-content:center">${i}</div>`+e+"</div>"}else{let e;U&&(e=$(U),F=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${A};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${M} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${e}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${M} * -1);width:${M};transform:translateZ(calc(${M} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${e}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${o.R} id="${o.R}" aria-hidden="true"${g}${m}${E}${S?` ${u}="${JSON.stringify(S).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${b};transition:${o.S};container-type:size"><style>${y(w,"block")}${p?"":T}${h?.css??""}${C.includes(R)?L:""}${_}${P}${B}${N}${a}${p?.css??""}${S?(c=o.R,`#${c} [${f}]{position:absolute;inset:0;pointer-events:none}#${c}[${d}] [${f}]{pointer-events:auto}#${c}[${d}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(S?`<script>window.${v}&&window.${v}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${n.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${t.u}px;${O("y","calc((100cqh - 100%) / 2)")}">`+F+(p?.room??"")+C+(h?.html??"")+(p?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${t.w}px">${'<i data-b="empty"></i>'.repeat(t.D)}</div>`)+"</div></div>"+(p?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${n.u},0px),env(safe-area-inset-bottom)) - ${t.x}px);text-align:center;font-size:${t.p}px;line-height:${t.z}px;color:rgba(255,255,255,${t.y})"></div>`+`</${o.R}>`}],496149)},971828,e=>{var t=e.i(447761);e.i(15038);var a=e.i(996124),r=e.i(617446),n=e.i(498332),o=e.i(496149),i=e.i(510269),s=e.i(638755),l=e.i(507710),c=e.i(72873);let u="data-loading-screen-again",d=null;e.s(["LOADING_SCREEN_AGAIN_ATTR",0,u,"endLoadingScreenAgain",0,function(){d?.(),d=null},"standLoadingScreenAgain",0,function(e=document,f=(0,l.getInMemoryParentKernelLoadingState)()){try{let h=function(e,d){let f,h=e.defaultView;if(!h||!e.body||e.getElementById(i.R))return null;let p=(0,l.getInMemoryParentKernelLoadingState)(),g=null!==p&&p!==d;if(g&&null!==p&&(0,a.h)(p))return null;let m=((f=e.getElementById(i.V))instanceof HTMLTemplateElement&&f.content.firstElementChild?.id===i.R?f.innerHTML:(0,r.e)())||null;if(null===m)return null;let v=e.createElement("div");v.setAttribute(u,""),v.setAttribute("aria-hidden","true"),v.style.display="contents",v.innerHTML=m;let w=v.firstElementChild;if(!(w instanceof h.HTMLElement)||w.id!==i.R)return null;w.style.pointerEvents="auto",v.insertAdjacentHTML("beforeend",function(e,a){let r=Reflect.get(a,t.f)?.ground;if("string"!=typeof r)try{r=JSON.parse(e.getAttribute("data-curtain-ground-paint")??"null")?.key}catch{r=null}let o="string"==typeof r?(0,s._)(r):null;return o?`<style>${(0,n.$)(o)}</style>`:""}(w,h)),(0,r.Y)(h),e.body.appendChild(v);let b=(0,c.D)(e);b.textContent=r.P,w.after(b);let y=e.location.pathname,k=!1,x=e=>{if(k)return;if(k=!0,h.removeEventListener(l.PARENT_KERNEL_LOADING_STATE_CACHE_EVENT,M),h.removeEventListener(i.P,$),h.removeEventListener("popstate",A),!e||h.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return void v.remove();let t=w.hasAttribute(o.N);t&&(w.style.transition="opacity 700ms linear"),w.style.pointerEvents="none",w.style.opacity="0",h.setTimeout(()=>v.remove(),t?700:500)},$=()=>x(!1),A=()=>{e.location.pathname!==y&&x(!1)},M=e=>{let t=e.detail;t&&("error"===t.phase?x(!1):(0,a.h)(t)?g&&x(!0):g=!0)};return h.addEventListener(l.PARENT_KERNEL_LOADING_STATE_CACHE_EVENT,M),h.addEventListener(i.P,$),h.addEventListener("popstate",A),$}(e,f);return d=h??d,h}catch{return null}}])},638755,e=>{var t=e.i(370849),a=e.i(123424),r=e.i(574622),n=e.i(214950),o=e.i(503859);function i(e,t=n.f.page){return(0,r.T)((t,a)=>(0,o.X)(e,t,a),t)}let s={panel:0,panelRule:2,raised:1,raisedRule:2,field:1,chip:1,rail:0,railRule:2,scrim:0},l={l:.84,c:.11,h:190},c={gold:t.V[3],ice:(0,a.L)((0,a.t)(l))};var u=e.i(956174);let d=([e,t,a])=>`rgb(${Math.round(e)} ${Math.round(t)} ${Math.round(a)})`,f=[{l:.3,c:.06},{l:.49,c:.1},{l:.7,c:.13},{l:.86,c:.12}];function h(e){return{key:(0,u.M)(e),floor:d(i(e)[0]),accent:d(function(e){if(e.flat)return(0,a.t)(l);let t=Math.max(...Object.values(function(e,t=n.f.page){let a=i(e,t),r={};for(let e of Object.keys(s))r[e]=a[s[e]];return r}(e)).map(e=>(0,a.E)(function([e,t,a]){return[127.5+.5*e,127.5+.5*t,127.5+.5*a]}(e))));return(0,a.Q)(e.accent,e=>(0,a.E)(e)>=t)}(e)),mood:e.accentIsWarm?c.ice:c.gold,glowRamp:f.map(t=>(([e,t,a])=>`#${[e,t,a].map(e=>Math.round(e).toString(16).padStart(2,"0")).join("")}`)((0,a.P)({l:t.l,c:t.c*(e.flat?.5:1),h:e.bloomA}))),palette:i(e).map(([e,t,a])=>`${e} ${t} ${a}`),hues:e}}e.s(["S",0,h,"_",0,function(e){let t=(0,u._)(e);return t?h(t):null}],638755)},123424,e=>{let t=e=>{let t=e/255;return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)},a=e=>{let t=Math.max(0,Math.min(1,e));return(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)*255};function r(e,a,r){let n=t(e),o=t(a),i=t(r),s=Math.cbrt(.4122214708*n+.5363325363*o+.0514459929*i),l=Math.cbrt(.2119034982*n+.6806995451*o+.1073969566*i),c=Math.cbrt(.0883024619*n+.2817188376*o+.6299787005*i);return[.2104542553*s+.793617785*l-.0040720468*c,1.9779984951*s-2.428592205*l+.4505937099*c,.0259040371*s+.7827717662*l-.808675766*c]}function n([e,t,a]){let r=e+.3963377774*t+.2158037573*a,o=e-.1055613458*t-.0638541728*a,i=e-.0894841775*t-1.291485548*a,s=r*r*r,l=o*o*o,c=i*i*i;return[4.0767416621*s-3.3077115913*l+.2309699292*c,-1.2684380046*s+2.6097574011*l-.3413193965*c,-.0041960863*s-.7034186147*l+1.707614701*c]}function o(e){let[t,r,o]=n(e);return[a(t),a(r),a(o)]}function i({l:e,c:t,h:a}){let r=a*Math.PI/180;return[e,Math.cos(r)*t,Math.sin(r)*t]}function s(e){return o(i(e))}function l(e){let[t,a,r]=s(e);return[Math.round(t),Math.round(a),Math.round(r)]}function c(e,t){let a=0,r=.5;for(let o=0;o<24;o++){let o=(a+r)/2;n(i({l:e,c:o,h:t})).every(e=>e>=0&&e<=1)?a=o:r=o}return a}e.s(["L",0,function([e,t,a]){return`#${[e,t,a].map(e=>e.toString(16).padStart(2,"0")).join("")}`},"O",0,function(e,t){let a=Math.abs(e-t)%360;return a>180?360-a:a},"M",0,o,"E",0,function([e,a,r]){return .2126*t(e)+.7152*t(a)+.0722*t(r)},"N",0,i,"P",0,s,"t",0,l,"s",0,r,"T",0,function(e,t,a){return function([e,t,a]){return{l:e,c:Math.hypot(t,a),h:(180*Math.atan2(a,t)/Math.PI%360+360)%360}}(r(e,t,a))},"Q",0,function(e,t){let a=t=>l({l:t,c:c(t,e),h:e}),r=0,n=1;for(let t=0;t<24;t++){let t=r+(n-r)/3,a=n-(n-r)/3;c(t,e)<c(a,e)?r=t:n=a}let o=(r+n)/2;if(t(a(o)))return a(o);let i=o,s=1;for(let e=0;e<24;e++){let e=(i+s)/2;t(a(e))?s=e:i=e}return a(s)},"w",0,function(e){return(e%360+360)%360}])},574622,390763,413194,956174,e=>{var t=e.i(123424),a=e.i(428607);function r(e){return e>=30&&e<=130}function n(e,a){return(0,t.M)(function(e,a){let r=e[0],n=e[e.length-1];if(a<=r.at)return(0,t.N)(r.color);if(a>=n.at)return(0,t.N)(n.color);for(let r=1;r<e.length;r++){let n=e[r];if(a<=n.at){let o=e[r-1],i=(a-o.at)/(n.at-o.at||1),s=(0,t.N)(o.color),l=(0,t.N)(n.color);return[s[0]+(l[0]-s[0])*i,s[1]+(l[1]-s[1])*i,s[2]+(l[2]-s[2])*i]}}return(0,t.N)(n.color)}(e.stops,a))}e.s(["K",0,function(e,a){let n=(0,t.T)(e[0],e[1],e[2]),o=(0,t.T)(a[0],a[1],a[2]).h,i=(0,t.O)(o,n.h);return function(e,a,n){if(e.meanChroma<.035)return{ground:e.hue,groundChroma:.035,bloomA:e.hue,bloomB:a??190,accent:190,accentIsWarm:!1,flat:!0};let o=n??(0,t.w)(e.hue+180);return{ground:e.hue,groundChroma:.05,bloomA:e.hue,bloomB:a??(0,t.w)(e.hue-60),accent:o,accentIsWarm:r(o),flat:!1}}({hue:n.h,meanChroma:n.c},i>=20?o:null,i>=90?o:null)},"m",0,r],390763);var o=e.i(214950);let i={a:.62,b:.58};function s(e,a){let r=(0,t.T)(e[0],e[1],e[2]),[n,o,i]=(0,t.P)({...r,l:r.l+a});return[Math.round(n),Math.round(o),Math.round(i)]}function l(e,a=o.f.page){let r=e.stops[0].color,c=[{role:"floor",rgb:s(n(e,1),-.0011)},{role:"mid",rgb:s(n(e,.46),.0055)},{role:"top",rgb:s(n(e,0),.011)}],u=e.glows[e.glows.length-1],d=e.glows[e.glows.length-2],f=(e,n,o)=>{let s=a.tints[n][o],l=.5*Math.max(0,e.color.l-i[n]),[c,u,d]=(0,t.P)({l:r.l+s.dl+l,c:r.c*s.dc,h:e.color.h});return[Math.round(c),Math.round(u),Math.round(d)]};return u&&(c.push({role:"bloomA-half",rgb:f(u,"a",0)}),c.push({role:"bloomA",rgb:f(u,"a",1)})),d&&(c.push({role:"bloomB-half",rgb:f(d,"b",0)}),c.push({role:"bloomB",rgb:f(d,"b",1)})),c}let c=[[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],[12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],[3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],[15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]];function u(e){let a=e.map(([e,a,r])=>(0,t.s)(e,a,r));return(e,r,n)=>{let[o,i,s]=(0,t.s)(e,r,n),l=0,c=1/0;for(let e=0;e<a.length;e++){let t=a[e],r=(o-t[0])**2+(i-t[1])**2+(s-t[2])**2;r<c&&(c=r,l=e)}return l}}e.s(["j",0,function(e,t){return c[7&t][7&e]},"L",0,u],413194);e.s(["n",0,class{width;height;palette;block;blockOrigin;form;stack;nearest;rowCount;ramp;stand;glowRgb;constructor(e,n,i=n.frame.height,s=!1){this.form=n,this.stand=s?o.f.alone:o.f.page,this.stack=e(n,this.stand),this.palette=function(e,a=o.f.page){let n=l(e,a).map(e=>e.rgb),i=r(e.glows[e.glows.length-2]?.color.h??0/0)?[...n.slice(0,5),n[3],n[4]]:n,s=[i[0],...[[0,1,3],[1,2,3],[2,3,2],[3,4,2],[2,5,2],[5,6,2]].filter(([e,t])=>i[e]&&i[t]).flatMap(([e,a,r])=>Array.from({length:r},(n,o)=>{var s,l,c;let u,d,f;return s=i[e],l=i[a],c=(o+1)/r,u=(0,t.s)(s[0],s[1],s[2]),d=(0,t.s)(l[0],l[1],l[2]),[Math.round((f=(0,t.M)([u[0]+(d[0]-u[0])*c,u[1]+(d[1]-u[1])*c,u[2]+(d[2]-u[2])*c]))[0]),Math.round(f[1]),Math.round(f[2])]}))];return s.filter((e,t)=>s.findIndex(t=>t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2])===t)}(e(a.H.desktop,this.stand),this.stand),this.nearest=u(this.palette),this.block=n.block,this.blockOrigin=n.blockOrigin;let{width:c,height:d}=(0,a.g)(n);this.width=c,this.height=d,this.ramp=Math.max(n.frame.height,i),this.rowCount=Math.ceil(Math.max(d,Math.ceil(this.ramp/4))/this.block),this.glowRgb=new Float64Array(3*this.stack.glows.length),this.stack.glows.forEach((e,a)=>this.glowRgb.set((0,t.P)(e.color),3*a))}get glowReach(){let{frame:e}=this.form;return this.stack.glows.map(t=>t.cy*e.height+t.ry*t.fade)}get cover(){return{x0:0,y0:0,width:this.width,height:this.height}}write(e,t=null,a=this.cover){let{frame:r,cover:o}=this.form,i=this.stack.glows,s=i.length,l=new Float64Array(6*s);for(let e=0;e<s;e++){let a=i[e],n=t?.[e];l[6*e]=a.cx*r.width+(n?.dx??0),l[6*e+1]=a.cy*r.height+(n?.dy??0),l[6*e+2]=a.rx,l[6*e+3]=a.ry,l[6*e+4]=a.fade,l[6*e+5]=a.alpha*this.stand.glow*(n?.k??1)}let c=this.glowRgb,u=(o.width-r.width)/2,d=this.block,f=this.blockOrigin,h=4*d,p=.5*r.width,g=-.08*r.height,m=1700*this.form.bloomScaleX,v=this.stand.reach*this.ramp,w=Math.floor((a.x0-f)/d),b=Math.floor((a.x0+a.width-1-f)/d),y=Math.floor(a.y0/d),k=Math.floor((a.y0+a.height-1)/d),x=Math.floor(-f/d),$=Math.floor((this.width-1-f)/d);for(let t=y;t<=k;t++){let r=Math.max(0,t),o=(r+.5)*h,i=r>=this.rowCount;for(let r=w;r<=b;r++){let w=0;if(!i){let e=(r+.5)*h+4*f-u,t=((Math.min($,Math.max(x,r))+.5)*h+4*f-u-p)/m,a=(o-g)/v,i=n(this.stack,Math.min(1,Math.sqrt(t*t+a*a))),d=i[0],b=i[1],y=i[2];for(let t=0;t<s;t++){let a=6*t,r=(e-l[a])/l[a+2],n=(o-l[a+1])/l[a+3],i=Math.sqrt(r*r+n*n),s=l[a+4],u=i>=s?0:l[a+5]*(1-i/s);u>0&&(d=c[3*t]*u+d*(1-u),b=c[3*t+1]*u+b*(1-u),y=c[3*t+2]*u+y*(1-u))}w=this.nearest(d,b,y)}let b=Math.max(a.x0,r*d+f),y=Math.min(a.x0+a.width,(r+1)*d+f),k=Math.max(a.y0,t*d),A=Math.min(a.y0+a.height,(t+1)*d);for(let t=k;t<A;t++){let r=(t-a.y0)*a.width-a.x0;e.fill(w,r+b,r+y)}}}}},"Y",0,function(e,t,a){let r=(t-e.cover.width)/2,n=Math.floor(-r/4);return{window:{x0:n,y0:0,width:Math.max(1,Math.ceil((t-r)/4)-n),height:Math.max(1,Math.ceil(a/4))},coverLeft:r}},"T",0,function(e,t=o.f.page){return l(e(a.H.desktop,t),t).map(e=>e.rgb)}],574622);let d=/^v\d{1,3}-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})-([01])$/,f=e=>Math.round((0,t.w)(e))%360;e.s(["M",0,function(e,t="v7"){return`${t}-${f(e.ground)}-${f(e.bloomA)}-${f(e.bloomB)}-${f(e.accent)}-${+!!e.flat}`},"_",0,function(e){let t=d.exec(e);if(!t)return null;let[a,n,o,i]=[t[1],t[2],t[3],t[4]].map(Number);if([a,n,o,i].some(e=>e>=360))return null;let s="1"===t[5];return{ground:a,groundChroma:s?.035:.05,bloomA:n,bloomB:o,accent:i,accentIsWarm:!s&&r(i),flat:s}}],956174)},503859,214950,e=>{let t={page:{reach:.45,glow:.58,colour:1,tints:{a:[{dl:.04,dc:1.3},{dl:.08,dc:1.6}],b:[{dl:.025,dc:1.15},{dl:.06,dc:1.4}]}},alone:{reach:1.15,glow:1,colour:1.7,tints:{a:[{dl:.057,dc:1.64},{dl:.109,dc:2.18}],b:[{dl:.032,dc:1.33},{dl:.082,dc:1.82}]}}};e.s(["f",0,t],214950),e.s(["F",0,{ground:272,groundChroma:.05,bloomA:262,bloomB:215,accent:355,accentIsWarm:!1,flat:!1},"X",0,function(e,a,r=t.page){let n=a.bloomScaleX,o=a.bloomScaleY,i=e.flat?e.groundChroma:e.groundChroma*r.colour,s=t=>e.flat?Math.min(t,.07):t,l=e.bloomB>=30&&e.bloomB<=130;return{stops:[{color:{l:.25,c:i,h:e.ground},at:0},{color:{l:.21,c:.84*i,h:e.ground},at:.46},{color:{l:.175,c:.67*i,h:e.ground},at:1}],glows:[{cx:.86,cy:.02,rx:720*n,ry:380*o,color:{l:l?.72:.58,c:s(l?.14:.16),h:e.bloomB},alpha:l?.16:.18,fade:.72},{cx:.14,cy:-.06,rx:820*n,ry:420*o,color:{l:.62,c:s(.19),h:e.bloomA},alpha:.22,fade:.7}]}}],503859)},370849,e=>{e.s(["G",0,"#070708","V",0,["#3a2c14","#7a5a24","#c99b4a","#ffd9a0"]])}])})();