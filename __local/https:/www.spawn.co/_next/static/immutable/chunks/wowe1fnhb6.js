(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,354999,(e=>{var t=e.i(479821),n=e.i(15038),r=e.i(996124),a=e.i(315616);e.s(["B",0,(function({frame:e,getIsOverlayOpen:r}){let i=()=>{e.contentWindow?.postMessage({type:n.xJ,isOverlayOpen:r()},(0,t.f)(e))},o=document.activeElement===e,l=()=>{o=!0},s=(()=>{o=document.hasFocus()&&document.activeElement===e}),u=(()=>{let e=o;o=!1,e||i()}),d=()=>{"visible"===document.visibilityState&&i()},c=(0,a.Y)([n.r3],t=>{t.source!==e.contentWindow||("object"==typeof t.data&&null!==t.data?t.data.type:null)===n.r3&&i()});return e.addEventListener("focus",l),window.addEventListener("blur",s),window.addEventListener("focus",u),document.addEventListener("visibilitychange",d),()=>{c(),e.removeEventListener("focus",l),window.removeEventListener("blur",s),window.removeEventListener("focus",u),document.removeEventListener("visibilitychange",d)}}),"J",0,(function(e){return!!e&&e.type===r.D&&"string"==typeof e.phase&&(0,r.h)({phase:e.phase,world:(0,n.Oe)(e.world)?e.world:void 0})})])}),595660,(e=>{var t=e.i(344364);e.i(960305),e.s(["f",0,function(e,n){return(0,t.a)((0,t.m)(e),3*n)}])}),498332,(e=>{var t=e.i(428607),n=e.i(902889),r=e.i(437052),a=e.i(510269);let i=(function(e){let a=(({width:e,height:t})=>`${e}px ${t}px`),i=n.X.map(e=>`--ground-${e}:url(${(0,n.x)(r.L.key,e)})`).join(";"),[o,...l]=n.A,s=t.H[o];return`#${e}{--ground-floor:${r.L.floor};--ground-accent:${r.L.accent};${i}}[data-curtain-ground]{position:absolute;inset:0;background-color:var(--ground-floor);background-position:50% 0;background-repeat:no-repeat,repeat-x;image-rendering:pixelated}[data-curtain-ground]{background-image:var(--ground-${o}),var(--ground-${n.R});background-size:${a(s.cover)},${a((0,t.O)(s))}}`+l.map((e=>`@media (max-width:${t.H[e].maxWidth}px){${(e=>{let{cover:n}=t.H[e];return`[data-curtain-ground]{background-image:var(--ground-${e});background-size:${a(n)}}`})(e)}}`)).join("")})(a.R);function o(e){let t=n.X.map(t=>`--ground-${t}:url(${(0,n.x)(e.key,t)})`).join(";");return`#${a.R}{--ground-floor:${e.floor};--ground-accent:${e.accent};${t}}`}e.s(["W",0,i,"Z",0,(function(e){return e?`${i}${o(e)}`:i}),"$",0,o])}),496149,(e=>{var t=e.i(241019),n=e.i(339016),r=e.i(792711),a=e.i(566398),i=e.i(510269),o=e.i(967122);e.i(761096);let l=String.raw`(function () {
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
})();`,s="application/x-spawn-arrival";var u=e.i(15038);let d="data-curtain-arrival",c="data-curtain-arrival-shown",f="data-curtain-arrival-host",p="data-curtain-arrival-ran",m="__spawnCurtainArrivalAsk",h="spawn.curtain.arrival-asked",g="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",w="__spawnCurtainArrival";String.raw`(function () {
  ${(0,o.N)("reach")}
  var curtain = document.getElementById('${i.R}');
  if (!curtain || curtain.hasAttribute('${p}')) return;
  curtain.setAttribute('${p}', '');
  var spec = null;
  try { spec = JSON.parse(curtain.getAttribute('${d}') || 'null'); } catch (e) {}
  if (spec && typeof spec.url === 'string') spec.url = reach(spec.url);
  if (!spec || typeof spec.url !== 'string' || !window.WebGL2RenderingContext || !window.createImageBitmap || !window.fetch) return;
  ${l}
  var view = window.__spawnArrivalView;
  var host = document.createElement('div');
  host.setAttribute('${f}', '');
  curtain.insertBefore(host, curtain.firstChild);
  var handle = null, kept = false, last = null, seen = null, off = false, marked = false;
  function post(look) {
    last = look;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || !frame.contentWindow) return;
    var message = { type: '${u.F1}', yaw: look.yaw, pitch: look.pitch };
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
    curtain.setAttribute('${c}', '');
    if (!marked) { marked = true; try { performance.mark('${"spawn.curtain.arrival-shown"}'); } catch (e) {} }
    var look = handle && handle.look();
    if (look) post(look);
  }
  // a lost context took the picture off the screen: the screen's own ground, box, line and bar stand again until it is back
  function hidden() {
    curtain.removeAttribute('${c}');
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
  var asked = window['${m}'];
  var net = asked && asked.url === spec.url && asked.net ? asked.net : fetch(spec.url, ${g});
  window['${m}'] = null;
  if (!asked || asked.url !== spec.url) { try { performance.mark('${h}'); } catch (e) {} }
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
        if (handle) { handle.dispose(); handle = null; curtain.removeAttribute('${c}'); }
        return;
      }
      if (!response.ok || response.status === ${204}) return;
      if (!kept) start(response.clone());
      response.arrayBuffer().then(function (b) {
        var bytes = new Uint8Array(b), read = view.read(bytes);
        if (read && read.meta.handover === false) { forget(); return; }
        if (!kept) name(bytes);
        keep.then(function (box) { if (box && !off) box.put(spec.url, new Response(bytes, { headers: { 'content-type': '${s}' } })).catch(function () {}); });
      }, function () {});
    }, function () {});
  });
  function onAsk(event) {
    var d = event.data;
    if (!d || d.type !== '${u.rr}' || !event.source) return;
    try { event.source.postMessage({ type: '${u.fR}' }, '*'); } catch (e) {}
    if (last) post(last);
  }
  window.addEventListener('message', onAsk);
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${u.JW}' || d.worldHex !== spec.world) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    forget();
  });
  // the frame's kept view stands for the page's life: it is put away whenever it comes, the screen up or gone
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${u.UU}' || d.worldHex !== spec.world || !(d.bytes instanceof Uint8Array || d.bytes instanceof ArrayBuffer)) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    var bytes = d.bytes instanceof Uint8Array ? d.bytes : new Uint8Array(d.bytes);
    var read = view.read(bytes);
    if (off || !read || read.meta.worldHex !== spec.world) return;
    window.__spawnArrivalKept = { bytes: bytes.length, room: read.meta.room, faces: read.meta.faces.map(function (f) { return [f.face, f.size, f.length]; }) };
    keep.then(function (box) {
      if (box) box.put(keptUrl(read.meta.room), new Response(new Blob([bytes], { type: '${s}' }))).catch(function () {});
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
  ${(0,o.N)("reach")}
  var doc = document, ASK = '${m}', FRAME = 'iframe[data-spawn-kernel-frame]';
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
    var net = fetch(spec.url, ${g});
    net.catch(function () {});
    window[ASK] = { url: spec.url, net: net };
    try { performance.mark('${h}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let v="Spawn Pixel",b=`'${v}', system-ui, sans-serif`,y=((e,t)=>`@font-face{font-family:'${e}';src:url(${i.d}) format('woff2');font-display:${t};unicode-range:U+0100-FFFF}@font-face{font-family:'${e}';src:url(${i.y}) format('woff2');font-display:${t};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${e}';src:url(${i.k}) format('woff2');font-display:${t};unicode-range:U+0020-007E,U+00A0,U+2026}`);y(i.b,"swap"),n._,i.b;let k="data-curtain-dissolve",x="rgba(255,255,255,0.08)",$=(e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),A=t.L,E=`calc(${A} * 0.1)`,S=`rgba(255,255,255,${t.q})`,_='<span data-curtain-dot style="word-spacing:.57em"> </span>',R=`#${i.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${S},${S}) 50% 56%/.12em .12em no-repeat}`,I=(e=>`radial-gradient(circle at ${t.G}px ${t.G}px,var(--ground-accent,#fff) ${t.G}px,transparent 0) 0 0/${e}px ${e}px`),L=`#${i.R} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:rgba(255,255,255,${t.a})}#${i.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${i.R} [data-curtain-bar]>i[data-b="dense"]{background:${I(t.U)};animation:spawn-curtain-head ${t.O}ms ease-in-out infinite}#${i.R} [data-curtain-bar]>i[data-b="sparse"]{background:${I(t.$)};animation:spawn-curtain-head ${t.O}ms ease-in-out ${t.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${t.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${i.R} [data-curtain-bar]>i{animation:none}}`;function M(e){let n=e/t.D;return n<=.05?0:n>=.97?null:-1666*Math.log((.97-n)/(.97-.05))}let F=`#${i.R}[data-born]:not([${k}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,T=`[${i._}][${i.p}]{visibility:hidden}`,U=(e,t)=>{let n=`round(nearest,${t},1px)`;return"x"===e?`translate:${t} 0;translate:${n} 0`:`translate:0 ${t};translate:0 ${n}`},H=`#${i.R} [data-curtain-stage]>*{${U("x","calc((100cqw - 100%) / 2)")}}`,O=`html[${i.N}] #${i.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${t.v};margin-top:${t.u}px;translate:-50% 0!important;text-wrap:balance}`;e.s(["N",0,k,"J",0,v,"X",0,(function(e){let n=`rgba(255,255,255,${t.a})`,r=[I(t.$),I(t.U),"var(--ground-accent,#fff)"],a=M(t.D-1)??1666,i=`${e} [data-curtain-bar]{display:flex;gap:${t.w}px}${e} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:${n}}`;for(let o=0;o<t.D;o+=1){let t=[M(o-1),M(o),M(o+1)].flatMap(((e,t)=>o+t-1<0||null===e?[]:[`${(e/a*100).toFixed(2)}%{background:${r[t]}}`]));i+=`@keyframes spawn-den-bar-${o}{0%{background:${n}}${t.join("")}}${e} [data-curtain-bar]>i:nth-child(${o+1}){animation:spawn-den-bar-${o} ${Math.round(a)}ms steps(1,end) forwards}`}return i}),"F",0,(function(e){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${t.u}px">${e}<div data-curtain-bar>${"<i></i>".repeat(t.D)}</div></div>`}),"u",0,(function(e){return`${e} [data-wisp-loop]{margin-bottom:${t.C-t.u}px}`}),"A",0,(function(e,n="",o="",l=null,s=null){var u;let p=e.face?l:null,m=e.face?null:s,h=e.groundArt?` data-curtain-ground-art="${$(e.groundArt)}"`:"",g=e.ground?` data-curtain-ground-paint="${$(JSON.stringify(e.ground))}"`:"",S=e.face?` ${k}`:"",I=e.face?null:e.arrival??null,M=(function(e,n){let a=(0,r.l)(e),i=(0,t.H)(a,n);if(!a&&!i)return"";let o=a?`<span data-curtain-title style="color:rgba(255,255,255,${t.T})">${$(a)}</span>`:"",l=i?`${a?_:""}<span data-curtain-maker style="color:rgba(255,255,255,${t.q})">${$(i)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${t.v};text-align:center;overflow-wrap:anywhere;font-size:${t.P};line-height:${t.M}">${o}${l}</div>`})(e.title,e.maker),P=e.face?e.face.src:e.thumbnailUrl,C="";if(e.face){let e;e=P?`<img src="${$(P)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${x};user-select:none">`:"",C=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${t.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${x}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${P?"none":"flex"};align-items:flex-end;justify-content:center">${o}</div>`+e+"</div>"}else{let e;P&&(e=$(P),C=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${A};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${E} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${e}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${E} * -1);width:${E};transform:translateZ(calc(${E} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${e}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${i.R} id="${i.R}" aria-hidden="true"${h}${g}${S}${I?` ${d}="${JSON.stringify(I).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${b};transition:${i.S};container-type:size"><style>${y(v,"block")}${m?"":L}${p?.css??""}${M.includes(_)?R:""}${F}${T}${H}${O}${n}${m?.css??""}${I?(u=i.R,`#${u} [${f}]{position:absolute;inset:0;pointer-events:none}#${u}[${c}] [${f}]{pointer-events:auto}#${u}[${c}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(I?`<script>window.${w}&&window.${w}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${a.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${t.u}px;${U("y","calc((100cqh - 100%) / 2)")}">`+C+(m?.room??"")+M+(p?.html??"")+(m?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${t.w}px">${'<i data-b="empty"></i>'.repeat(t.D)}</div>`)+"</div></div>"+(m?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${a.u},0px),env(safe-area-inset-bottom)) - ${t.x}px);text-align:center;font-size:${t.p}px;line-height:${t.z}px;color:rgba(255,255,255,${t.y})"></div>`+`</${i.R}>`})],496149)}),676787,(e=>{var m=(function(e=document,t=null){(0,f.d)(e);let h=e.getElementById(p.y),g=h instanceof HTMLTemplateElement?h.content.firstElementChild:null;if(g?.tagName!=="IFRAME"||!(0,c.$)(g.getAttribute("data-preview-for-src"))||null!==f.X.claimed||null!==e.querySelector(`iframe[${p.a}="true"]`)||!0!==window.crossOriginIsolated||!(function(e){if((0,d.w)())return!1;if(null===e)return!0;let t=new URLSearchParams(window.location.search).has("mobile")?null:(0,n.p)();if(null===t)return!1;let a="desktop"===t.class?"desktop":"mobile";return e.split(" ").includes(a)&&("desktop"===a?"holds"===(0,r.F)():"gpu"in window.navigator)})(t??g.getAttribute(p.j)))return null;(0,f.Y)();let w=e.importNode(g,!0),v=window[p.V];v?.(w);let b=w.getAttribute("src");null!==b&&w.setAttribute("src",(0,i.v)(b));let y=e.body.appendChild((0,f.a)((function(e){for(let t of u){let n=e.getAttribute(t);if(null!==n){let r=(0,s.h)((0,o.Y)((0,o.q)((0,o.Y)((0,s.a)(n),0),(0,o.m)()),(0,l.f)()),(0,s.C)());r!==n&&e.setAttribute(t,r)}}return e})(w)));return(0,a.g)(y),y});var t=e.i(271645),n=e.i(96185),r=e.i(222156),a=e.i(514093),i=e.i(145217),o=e.i(967122),l=e.i(839477),s=e.i(7483);let u=["src","data-preview-for-src"];var d=e.i(123901),c=e.i(140880),f=e.i(498526),p=e.i(266497);;e.s(["PendingFrameInstallOnSoftEntry",0,(function(){return(0,t.useLayoutEffect)(()=>{m()},[]),null}),"installPendingFrameFromTemplate",0,m],676787)}),864573,(e=>{var R=(function(e,t){let n=(0,_.Y)(t.worldId);return null!==n&&(function(e){let t=new Set;for(let n of e.head?.forkedFrom??[]){let e="string"==typeof n?(0,_.Y)(n):null;null!==e&&t.add(e)}return t})(e).has(n)});var T=(function(e){F?.(),F=null,null!==e&&(e.contentWindow?.postMessage({type:n.xJ,isOverlayOpen:!0},"*"),F=(0,t.B)({frame:e,getIsOverlayOpen:(()=>!0)}))});var U=(function(){let e=(0,u.F)();if(null!==e){if(T(null),e.carried)return void(0,u.i)(null);null!==L&&clearTimeout(L),L=setTimeout((()=>{L=null,(0,u.F)()===e&&(e.frame.style.opacity="0",e.frame.style.zIndex="-1",(0,u.i)(null))}),1500)}});var H=(function(e){if(null===e)return!1;let t="string"==typeof e.body?"standing"===e.body:"ready"===e.phase;return("string"==typeof e.world?"shown"===e.world:"ready"===e.phase)&&(t||(0,c.o)())});var O=(function(e,t,n){M.set(e,t);let a={worldId:t,link:n};(0,r.z)(e,a);let i=(0,u.F)();i?.frame===e&&(0,u.i)({...i,worldId:t}),(0,b.z)(t).catch((()=>null)).then((async function(n){if((0,u.F)()?.frame!==e)return;n&&((0,y.h)(t,(0,y.O)(n)),(0,r.z)(e,{...a,...(0,y.s)(n)}));let{data:i}=await (0,x.createClient)().auth.getSession(),o=(0,u.F)();o?.frame===e&&(0,u.i)({...o,userId:i.session?.user.id??null})})).catch((()=>void 0))});var D=(function(e){C?.worldId!==e&&(C={worldId:e,atMs:performance.now()})});var z=(function(){let e=(0,u.F)()?.frame??(0,S.pendingKernelFrameOf)(document);return null!==e&&e.isConnected&&(0,k.$)(e.getAttribute("data-preview-for-src"))?e:null});var B=(function(e){let t=(0,u.F)(),n=z();if(null===n||!0!==window.crossOriginIsolated)return null;let r=M.get(n),a=P.get(n)??W.get(n);return void 0!==r&&a===r||(t?.worldId??r??e)===e?n:null});var q=(function(e){for(let[t]of i.T)e.removeAttribute(t);e.setAttribute(i.k,"true"),e.style.transition="",e.style.opacity="1",e.style.filter="",e.style.zIndex=String(11),e.style.pointerEvents="auto",(0,p.Z)(e)});var K=(function(){(0,f.l)(),(0,g.T)()});var t=e.i(354999),n=e.i(15038),r=e.i(498526),a=e.i(676787),i=e.i(266497),o=e.i(510269),l=e.i(396008),s=e.i(96185),u=e.i(791401),d=e.i(814480),c=e.i(281573),f=e.i(70983),p=e.i(514093),m=e.i(507710),h=e.i(67635),g=e.i(892437),w=e.i(315616),v=e.i(226019),b=e.i(438297),y=e.i(521840),k=e.i(140880),x=e.i(853454),$=e.i(271645),A=e.i(937233),E=e.i(741199),S=e.i(608375),_=e.i(535650);;var I=e.i(804224);let L=null,M=new WeakMap,F=null;;let P=new WeakMap,C=null;;let W=new WeakMap,j=!1,N=null;;let G=new WeakSet;;e.s(["H",0,K,"B",0,(function(e){let t=N?.worldId===e?N:null,n=C?.worldId===e?C:null;(0,h.beginPreviewStartupBoot)("birth",t?.pressAtMs??n?.atMs??performance.now(),"in-place",{worldId:e}),K()}),"a",0,(function(e,t){var n;let a=B(e.worldId);if(null===a)return console.info("[den-backdrop] the world takes the document road: no warm frame can take it"),!1;let i=(0,u.F)(),o=(0,A.u)(e.worldId),l=null!==o&&(P.has(a)||!((0,r.x)(a)&&!(0,r.y)(a)))?o:null,s=(0,r.s)(a);M.set(a,e.worldId),W.delete(a),P.delete(a),D(e.worldId),null!==i&&(0,u.i)({...i,carried:!0,worldId:e.worldId});let d=t??l;return d&&(s?.hold!==!0||s.worldId===e.worldId||(n={worldId:e.worldId,head:d.head},s.head?.manifest!==void 0&&s.head.manifest===n.head?.manifest||R(n,s)||R(s,n)))?(0,E.L)(e,a,d):(0,E.K)(e,a),!0}),"u",0,(function(e){let t=(0,S.pendingKernelFrameOf)(document);return null!==t&&W.get(t)===e}),"Y",0,(function(e){let t=(0,S.pendingKernelFrameOf)(document);return null!==t&&W.get(t)===e&&(0,r.F)(t)}),"g",0,(function(e,t){let n=e.grant;if(j||t()||null!==(0,u.F)())return;let a=(0,S.pendingKernelFrameOf)(document);null!==a&&a.isConnected&&!0===window.crossOriginIsolated&&(0,r.P)(a,(()=>{let o=M.get(a);if(!t()&&null===(0,u.F)()&&a.isConnected&&(0,r.V)(a)&&(null!==n||(0,r.y)(a))&&(void 0===o||o===e.worldId)){if(W.get(a)!==e.worldId){var l;let t;M.set(a,e.worldId),W.set(a,e.worldId),l=e.worldId,t=(0,w.Y)([I.E],(e=>{let n=e.data;e.source!==a.contentWindow||n?.worldId!==l||(t(),W.get(a)===l&&(j=!0,W.delete(a),M.delete(a),a.remove(),console.info(`[den-backdrop] world:${l} let go: the frame holding it gives its memory back, and the press takes the create road`)))})),a.style.cssText=i.C,(0,r.l)(a,()=>(0,r.$)(a,(()=>{W.get(a)!==e.worldId||G.has(a)||(a.style.cssText=i.h)})))}(0,r.z)(a,{worldId:e.worldId,link:e.link,head:e.head,...n?(0,y.s)(n):{},hold:!0})}}))}),"c",0,z,"Z",0,(function(e,t=performance.now()){let n=(0,S.pendingKernelFrameOf)(document);return null!==n&&W.get(n)===e&&!!(0,r.b)(n,e)&&(W.delete(n),N={worldId:e,pressAtMs:t},(0,r.F)(n)?q(n):n.style.cssText=i.C,!0)}),"C",0,(function(e){let t=(0,S.pendingKernelFrameOf)(document);null!==t&&M.get(t)===e&&(M.delete(t),W.delete(t),t.remove(),(0,a.installPendingFrameFromTemplate)())}),"R",0,(function(e){let t=(0,S.pendingKernelFrameOf)(document);return null!==t&&W.get(t)===e&&!!(0,r.F)(t)&&(G.add(t),q(t),!0)}),"K",0,(function(e){let t=(0,u.F)();null!==t&&null===t.worldId&&(M.get(t.frame)??e)===e&&t.frame.isConnected&&(0,k.$)(t.frame.getAttribute("data-preview-for-src"))&&((0,u.i)({...t,carried:!0}),D(e),O(t.frame,e,(0,v.K)(e,"dev")))}),"O",0,(function({active:e,shown:t,onUnavailable:n}){let a=t?.kind??null,c=null!==t&&"edition"===t.kind?t.worldId:null,f=null!==t&&"birth"===t.kind?t.twin??null:null;(0,$.useEffect)((()=>{if(!e||null===a)return;null!==L&&(clearTimeout(L),L=null);let t=(0,u.F)();if(null===t||!t.frame.isConnected){var i,o,p;let e=(0,S.pendingKernelFrameOf)(document);if(null===e||!0!==window.crossOriginIsolated)return void n();if((0,u.i)({frame:e,worldId:null,userId:null,carried:!1}),null!==c){let t=(0,v.K)(c,"dev");O(e,c,`${t}/room:${(0,u.k)()}`)}null!==f&&((0,l.U)()??(0,s.p)()?.class==="desktop")&&(i=e,o=f,p=(()=>g(!0)),(0,d.readFirstDenEdition)().then((e=>{let t=e?.edition;t?.worldId===o&&t.sessionEra&&(0,r.P)(i,(()=>{let e=(0,u.F)();if(e?.frame===i&&!e.carried&&i.isConnected){if(M.get(i)===o&&W.get(i)===o){W.delete(i),P.set(i,o),(0,r.$)(i,p);return}!M.has(i)&&(0,r.V)(i)&&(0,r.y)(i)&&(M.set(i,o),P.set(i,o),(0,r.z)(i,{worldId:o,link:(0,v.K)(o,"dev"),head:t.head,hold:!0}),(0,r.$)(i,p))}}))})))}return U}),[e,a,c,f,n]);let p=(0,m.useKernelLoadingAnswer)(H,e),[h,g]=(0,$.useState)(!1);(0,$.useEffect)((()=>{let t=(0,u.F)();if(!e||null===t||!t.frame.hasAttribute(i.a))return;let{frame:n}=t;if(!(p||h&&1)||n.hasAttribute(i.k))return;let r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l="edition"===a?"opacity 1400ms cubic-bezier(0.5, 0, 0.75, 0), filter 1400ms cubic-bezier(0.5, 0, 0.75, 0)":o.S;if(n.style.transition=r?"":l,n.style.zIndex="2",n.style.pointerEvents="none",n.setAttribute(i.k,"true"),T(n),r){n.style.opacity="1",n.style.filter="";return}requestAnimationFrame(()=>{n.style.opacity="1",n.style.filter=""})}),[e,p,h,a])}),"b",0,B],864573)}),942511,(e=>{var t=e.i(134920),n=e.i(271645);let r=null,a=(0,t.f)(),i=(()=>r),o=(()=>null);e.s(["T",0,(function(e){r=e,a.notify()}),"H",0,(function(){return(0,n.useSyncExternalStore)(a.subscribe,i,o)})])}),717746,(e=>{var o=(function(e){return(0,n.w)(r,i,e)});var F=(function({world:e,art:t}){let n=(0,I.f)(),[r,a]=(0,k.useState)(!1);(0,k.useEffect)((()=>{if(!n)return;let e=window.setTimeout((()=>a(!0)),500);return(()=>window.clearTimeout(e))}),[n]);let{name:i,handle:o}=e,l=(0,k.useMemo)((()=>{var e;let n;return`${(0,_.A)((e={name:i,handle:o},n=(0,L.m)({handle:e.handle}),{title:e.name,maker:n.door?n.words:null,thumbnailUrl:t?(0,E.a)((0,E.m)(t),640):null,groundArt:null}),S.W)}<style>${M}</style>`}),[i,o,t]);return r?null:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{className:"contents","data-pressed-screen":!0,dangerouslySetInnerHTML:{__html:l}}),n?(0,A.jsx)("style",{children:`#${R.R}{opacity:0!important;transition:${R.S}}`}):null]})});var T=(function({world:e}){let t=(0,k.useRef)(null);return(0,k.useLayoutEffect)((()=>{if(t.current!==e){let n;t.current=e,n=a===e,a=null,n||((0,f.beginPreviewStartupBoot)("remount"),(0,x.H)())}}),[e]),(0,k.useLayoutEffect)(()=>(i=e,()=>{i===e&&(i=null)}),[e]),(0,A.jsxs)(A.Fragment,{children:[e.screen?(0,A.jsx)(F,{world:e,art:e.screen.art}):null,(0,A.jsx)(n.D,{world:e})]})});var U=(function(e){return null!==e&&(0,s.f)()&&(0,d.a)({engineSemver:e.engineVersion,localKernelLane:(0,v.M)(),pinnedEdgeConfigured:!!"".trim()})});var H=(function(e){if(!U(e)||(0,y.n)(e.worldId))return!1;let n=(0,x.b)(e.worldId);return null!==n&&(0,t.x)(n)&&!(0,c.frameBehindEraHead)(n)});var O=(function(e,n){let r=U(e)&&!(0,y.n)(e.worldId)?(0,x.b)(e.worldId):null;if(null===r)return void n(!1);let a=null,i=!1,o=!1,l=(()=>{if(!o&&null!==a&&i){if(o=!0,a&&(0,c.frameBehindEraHead)(r)){(0,c.noteWarmFrameBehind)(r,"press"),n(!1);return}n(a)}}),s=(()=>{i=!0,l()});"visible"===document.visibilityState&&(0,c.eraHeadAsking)()?((0,c.whenEraHeadAnswered)(s),requestAnimationFrame((()=>requestAnimationFrame(s)))):i=!0,(0,t.D)(r,(e=>{a=e,l()}))});var P=(function(e){let t=performance.now(),n=e?.timeStamp;return"number"==typeof n&&n>0&&n<=t?n:t});var D=(function(e,t,n){return!!z(e,t,n)&&(B(e),!0)});var z=(function(e,t,r=performance.now()){return!!H(e)&&!!(0,x.a)(e)&&(C={world:e,atMs:r},(0,u.e)(t,e.appId),(0,n.M)().catch((()=>void 0)),(0,w.z)(e.worldId).catch((t=>{var n;t instanceof w.Z&&t.code!==l.v&&(n=e,C?.world===n?W(n):o(window.location.pathname)===n&&(0,h.O)(window.location.href,"boundary-reload",{replace:!0}))})),!0)});var B=(function(e,t){let i=void 0!==t&&"bornAtMs"in t,o=C?.world===e,l=C?.world===e?C.atMs:performance.now();void 0!==t&&(l="bornAtMs"in t?t.bornAtMs:t.pressAtMs),C=null,o||(0,u.e)((0,u.U)(window.location.href,window.location.hostname,(0,u.L)(e.path)),e.appId),(0,n.r)(e.path),(0,f.beginPreviewStartupBoot)(i?"birth":"press",l,"in-place",{worldId:e.worldId}),(0,x.H)(),(0,u.Y)(e.appId),r=e,a=e,Z()});var W=(function(e){C?.world===e&&(C=null),r!==e&&(0,t.S)()});var j=(function(e,t,n,r){if(e.defaultPrevented||!(0,p.f)(e))return;e.preventDefault();let a=P(e);O(t,(e=>{if(e&&D(t,n,a))return;let i=new URL(r,window.location.href);(0,g.j)(i.pathname),(0,h.O)(i.href,"boundary-click")}))});var N=(function(e,t,n,r){let a=e.app,i=a.creator_username?.trim(),o=a.adventure_name?.trim();if(r||e.home||!i||!o||!a.world_id||"agent"===a.creator_actor_class)return;let l={appId:a.id,worldId:a.world_id,handle:i,adventureName:o,path:t,name:n,engineVersion:a.engine_version??null,screen:{art:e.posted?.customThumbnailUrl??e.clip?.thumbnail_asset_url??null}};if(U(l))return{link:{[m.A]:"",onClick:(e=>j(e,l,"make",t))},entersNow:(()=>H(l))}});var q=(function(e,t,n,r,a,i){let o=e.games?.world_id,l=e.profiles?.username,u=e.games?.adventure_name;return(0,s.f)()&&o&&t&&(0,b.H)(t)&&null!==n&&r===n&&l&&u&&e.profiles?.actor_class!=="agent"&&!1!==e.works_on_desktop?{appId:e.app_id,worldId:o,handle:l,adventureName:u,path:n,name:a,engineVersion:t,screen:{art:e.custom_thumbnail_url??null},play:{publicUrl:`${i}${n}`,platformSupport:{desktop:e.works_on_desktop,mobile:e.works_on_mobile,engineSupportsMobile:!0===e.mobile_playable,bootTarget:{appId:e.app_id,engineVersionOverride:null,roomMode:"live",updateSlug:null,bootRoom:{source:"viewer"}},title:a,boxArtUrl:e.custom_thumbnail_url??null}}}:null});var G=(function(e,t,n,r,a,i,o=performance.now()){let l=q(e,t,n,r,a,i);if(null===l)return null;let s=!1;return{begin(){let e=!1;return Promise.resolve().then((()=>{e||O(l,(t=>{!e&&((s=t&&z(l,"box",o))||fetch(r,{credentials:"include"}).catch((()=>{})))}))})),(()=>{e=!0,s&&(s=!1,W(l))})},stand:(()=>!!s&&C?.world===l&&(B(l),!0))}});var K=(function(e){let t=o(e);return t?(0,k.createElement)(T,{world:t}):null});var Y=(function(e){let n=e.key;("pointerdown"===e.type||"Enter"===n||" "===n)&&((0,t.r)(),(0,c.askEraHeadFor)((0,x.c)(),!1))});var V=(function(){"visible"===document.visibilityState&&(0,c.askEraHeadFor)((0,x.c)())});var J=(function(e){let t=e.target instanceof Element?e.target.closest(`[${m.A}]`):null;if(null===t)return;let n=e.relatedTarget;n instanceof Node&&t.contains(n)||(0,c.askEraHeadFor)((0,x.c)())});var Z=(function(){X||(X=!0,document.addEventListener("pointerover",J,!0),document.addEventListener("focusin",J,!0),document.addEventListener("pointerdown",Y,!0),document.addEventListener("keydown",Y,!0),document.addEventListener("visibilitychange",V),window.addEventListener("focus",V)),(0,$.T)({stageAt:K,card:N,box:G})});var t=e.i(498526),n=e.i(741199);let r=null,a=null,i=null;;var l=e.i(91019),s=e.i(792539),u=e.i(281330),d=e.i(973554),c=e.i(926660),f=e.i(67635),p=e.i(217246),m=e.i(942798),h=e.i(221813),g=e.i(520795),w=e.i(438297),v=e.i(645017),b=e.i(133579),y=e.i(427580),k=e.i(271645),x=e.i(864573),$=e.i(942511),A=e.i(843476);e.i(595660);var E=e.i(344364),S=e.i(498332),_=e.i(496149),R=e.i(510269),I=e.i(17477);e.i(960305);var L=e.i(80697);let M=(0,_.X)(`#${R.R}`);;let C=null;;let X=!1;;e.s(["armPress",0,Z,"beginPress",0,z,"boxPressOf",0,G,"boxWorldOf",0,q,"cardPress",0,N,"leavePress",0,W,"pressFrameStands",0,H,"pressLink",0,j,"pressMayEnter",0,U,"pressMoment",0,P,"pressWorld",0,D,"standPress",0,B,"whenPressFrameStands",0,O],717746)}),396008,(e=>{var a=(function(e,t,r){let a=new URLSearchParams(r).get(e);("on"===a||"off"===a)&&(0,n.B)("session",t,a);let i=(0,n.r)("session",t);return"on"===i||"off"===i?"on"===i:null});var t=e.i(258918),n=e.i(417695),r=e.i(123901);;function i(e,t=(0,r.A)()){let n=new URLSearchParams(e).get("pipelineWarm");return"on"===n||"held"===n?n:null}e.s(["f",0,function(e=window.location.search){return a(t.D,t.o,e)},"U",0,(function(e=window.location.search){return a("denTwin","spawn:den-twin",e)}),"r",0,(function(e){return null!==i(e)}),"Q",0,i])}),779174,(e=>{function t(){let e=window.__spawnVisitorDen;return"object"==typeof e&&null!==e?e:null}let n=!1;e.s(["q",0,function(){let e=n?null:t()?.edition??null;return n=!0,e},"l",0,function(){return t()?.take()??null},"B",0,function(){return null!==t()}],779174)}),222156,(e=>{var t=e.i(558150);function n(e){return null!==e.heapLimitBytes&&e.heapLimitBytes<t.m?"heap":null!==e.deviceMemoryGb&&0x40000000*e.deviceMemoryGb<t.m?"memory":null===e.heapLimitBytes&&null===e.deviceMemoryGb?"unread":"holds"}let r=e=>"number"==typeof e&&Number.isFinite(e)&&e>0?e:null;function a(){let e=window.performance.memory;return{heapLimitBytes:r("object"==typeof e&&null!==e?Reflect.get(e,"jsHeapSizeLimit"):void 0),deviceMemoryGb:r(window.navigator.deviceMemory)}}e.s(["n",0,a,"F",0,function(){return n(a())},"k",0,n])}),791401,(e=>{var t=e.i(271645),n=e.i(134920);let r=null,a=!1,i=null,o=(0,n.f)();e.s(["F",0,(function(){return r}),"A",0,function(e){return null!==r&&!r.carried&&null!==r.userId&&r.userId!==e},"k",0,function(){let e=new Uint8Array(6);return crypto.getRandomValues(e),`arrival-${Array.from(e,(e=>e.toString(16).padStart(2,"0"))).join("")}`},"i",0,(function(e){r=e,o.notify()}),"J",0,(function(e){a=e,o.notify()}),"v",0,(function(e,t){(null!==e||void 0===t||i===t)&&(i=e,o.notify())}),"P",0,(function(){return(0,t.useSyncExternalStore)(o.subscribe,()=>null!==r||a,(()=>!1))}),"U",0,(function(){return(0,t.useSyncExternalStore)(o.subscribe,(()=>i),(()=>null))})])}),814480,(e=>{var t=e.i(779174),n=e.i(143075);let r="/api/first-den/edition";function a(e){if("object"!=typeof e||null===e)return null;let{edition:t,guestBuild:r}=e;return"boolean"!=typeof r?null:null===t?{edition:null,guestBuild:r}:"string"==typeof t?.worldId&&""!==t.worldId&&"string"==typeof t.engineVersion&&(0,n.X)(t.head)?{edition:{worldId:t.worldId,head:t.head,engineVersion:t.engineVersion,sessionEra:!0===t.sessionEra},guestBuild:r}:null}let i=null;e.s(["FIRST_DEN_EDITION_DOOR",0,r,"parseFirstDenEditionAnswer",0,a,"readFirstDenEdition",0,function(e=fetch){if(null===i){let n=((0,t.q)()??e(r,{credentials:"omit"}).then(e=>e.ok?e.json():null)).then(a).catch((()=>null)).then(e=>(null===e&&i===n&&(i=null),e));i=n}return i},"resetFirstDenEditionForTests",0,function(){i=null}])}),281330,420916,(e=>{var s=(function(e){try{return decodeURIComponent(e).toLowerCase()}catch{return e.toLowerCase()}});var t=e.i(744639),n=e.i(671040);let r="spawn:play-from";e.s(["v",0,["connecting","warming","restoring"],"M",0,"play_door","y",0,r,"H",0,"__spawnPlayStartAtParse"],420916);var a=e.i(873821),i=e.i(417695);let o=new Set;function l(e,t,n){let r=null;try{r=e?new URL(e):null}catch{r=null}if(!r)return"direct";if(r.hostname.toLowerCase()!==t.toLowerCase())return"outside";let a=r.pathname.split("/").filter(Boolean).map(s),i=a[0]??"";return i?"notifications"===i?"bell":"chats"===i?"chats":"create"===i?"numbers"===a[1]?"numbers":"make":"den"===i?"den":i.startsWith("@")?1===a.length?"den":`/${i}/${a[1]}`===n?"game-page":"exit":"site":"home"};function u(e){let[t,n]=e.split("/").filter(Boolean).map(s);return t&&n?`/${t}/${n}`:""}e.s(["$",0,(function(e){try{let t=(0,i.r)("session",r);t&&JSON.parse(t).appId===e&&(0,i.p)("session",r)}catch{return}}),"L",0,u,"Y",0,(function(e){o.delete(e)}),"Z",0,(function(e){let r=function(e,n,r){if(!e)return null;try{let a=JSON.parse(e);if(a.appId!==n||"number"!=typeof a.at||r-a.at>12e4)return null;return(0,t.c)(a.from)}catch{return null}}(e.remembered,e.appId,e.now);if(r)return r;if(!e.firstWorld)return"portal";let i=(0,t.M)(e.hash);if(i)return i;let o=(0,n.v)((0,a.v)(e.cookie,n.S))??(null==e.inviteSeenAt?null:{seenAt:e.inviteSeenAt});return o&&o.seenAt>=e.pageStartMs?"invite":l(e.referrer,e.ownHost,u(e.pathname))}),"U",0,l,"e",0,(function(e,t,n=Date.now()){(0,i.B)("session",r,JSON.stringify({from:e,appId:t,at:n}))}),"Q",0,(function(){return(0,i.r)("session",r)}),"D",0,(function(e){if(o.has(e))return null;let t=0===o.size;return o.add(e),{firstWorld:t}})],281330)}),973554,(e=>{var t=e.i(919204),n=e.i(133579);e.s(["Y",0,(function(e){if(e.sessionMount)return"posture";let n=(0,t.P)(e.engineSemver,"5.1.13");return null!==n&&n>=0?"posture":"legacy"}),"a",0,(function(e){if(e.localKernelLane){var t;return!((t={engineSemver:e.engineSemver,pinnedEdgeConfigured:!0===e.pinnedEdgeConfigured}).pinnedEdgeConfigured&&(0,n.B)(t.engineSemver))||(0,n.H)(e.engineSemver)}return(0,n.H)(e.engineSemver)})])}),926660,(e=>{var d=(function(e){let n=(0,l.j)(e);return null===n?null:{build:n.build,stamp:(0,t.eM)(n.engineStamp)?n.engineStamp:null,heldHead:(0,t.q8)({...n,engineHash:n.build})}});var w=(function(e,n=null){let i=(0,a.f)(e);if(null===i||(0,r.k)())return;let o={build:i,stamp:(0,t.eM)(n)?n:null};null!==c&&g(o.stamp,c.stamp)||(c=o)});var v=(function(e=!0,t=fetch){if((0,r.k)())return Promise.resolve();if(null!==f)return m||=e,f;m=e;let n=(async function(){try{let e=await t(s,{cache:"no-store",credentials:"same-origin"});if(!e.ok)return;let n=await e.json();for(let e of(w(n.sessionEraHead,n.sessionEraHeadStamp??null),p))x(e)}catch{}})().finally((()=>{p.clear(),f=null,m=!1;let e=h;for(let t of(h=[],e))t()}));return f=n,n});var b=(function(){return null!==f&&m});var y=(function(e,t){return null!==e&&null!==t&&(e.heldHead??e.build)!==t.build&&!g(t.stamp,e.stamp)});var k=(function(e){return y(d(e.contentWindow),c)});var x=(function(e){let n=e.contentWindow;null!==c&&null!==n&&e.isConnected&&k(e)&&n.postMessage({type:t.mp,head:c.build},(0,i.f)(e))});var t=e.i(15038),n=e.i(381225),r=e.i(64964),a=e.i(391037),i=e.i(479821),o=e.i(537100),l=e.i(132193);let s="/api/engine/head",u="warm-frame";;let c=null,f=null,p=new Set,m=!1,h=[],g=((e,t)=>null!==e&&null!==t&&Date.parse(e)<Date.parse(t));;e.s(["ERA_HEAD_DOOR",0,s,"WARM_FRAME_LOG_CLASS",0,u,"askEraHead",0,v,"askEraHeadFor",0,(function(e,t=!0){null===e||!e.isConnected||null===d(e.contentWindow)||k(e)||(p.add(e),v(t))}),"eraHeadAsking",0,b,"eraHeadHeard",0,(function(){return c}),"frameBehindEraHead",0,k,"noteEraHead",0,w,"noteWarmFrameBehind",0,(function(e,t){x(e);let r=d(e.contentWindow);(0,o.shipBrowserLog)(u,"warm_frame_behind_head",{event:"warm_frame_behind_head",warm_frame:{road:t,frame_build:r?.build??null,frame_stamp:r?.stamp??null,frame_held_head:r?.heldHead??null,head_build:c?.build??null,head_stamp:c?.stamp??null},...(0,n.f)("the warm frame head read (row 47441)")},"info")}),"resetEraHeadDoorForTests",0,(function(){c=null,p.clear(),f=null,m=!1,h=[]}),"whenEraHeadAnswered",0,(function(e){b()?h.push(e):e()}),"wordsBehindHead",0,y])}),960305,995147,(e=>{var l=(function(){let e;return`${((e="".trim().replace(/\/+$/,""))?n[e]??null:null)??""}${i}`});var t=e.i(344364);let n={"/signal/__local/https%3A%2F%2Fplay.bigspawn.net":"","https://staging.play.bigspawn.net":""};var r=e.i(414750);let a="",i="/value-origin";[...r.U.keys(),...r.l.keys()],e.s(["I",0,a,"m",0,i],995147);let o=["spawnfile.io"];;e.s(["u",0,(function(e){let n=(0,t.z)(e);return(0,t.H)(n,o)?n:(0,t.L)(e)}),"c",0,(function(e){if(!e)return e;let n=(0,t.z)(e);return n.startsWith(`${a}/`)?`${i}${n.slice(a.length)}`:e}),"$",0,l,"A",0,(function(e){if(!e)return e;let n=(0,t.z)(e);return n.startsWith(`${a}/`)?`${l()}${n.slice(a.length)}`:e}),"o",0,(function(e){return({src:n,width:r,quality:a})=>(0,t.a)(n,Math.min(r,e),a)})],960305)}),132193,(e=>{var t=e.i(391037);let n=[],r=0,a=new WeakMap,i=new WeakMap,o=null,l=new WeakMap,s=(e=>(e?l.get(e)?.build:void 0)??null);e.s(["x",0,s,"j",0,(e=>(e?l.get(e):void 0)??null),"S",0,(function(e,t){let o=null===e.source?void 0:a.get(e.source);if(void 0!==o&&e.at>=o)return;let l={...e,data:t(e.data),rows:1};for(n.push(l),r+=l.rows;r>1e3&&n.length>1;){let e=n.shift();if(r-=e.rows,null===e.source)continue;let t=i.get(e.source)??{rollups:0,lines:0};t.rollups+=1,t.lines+=e.rows,i.set(e.source,t)}}),"J",0,((e,n,r={})=>{if(!e)return;let a=(0,t.f)(n);null!==a?l.set(e,{build:a,engineStamp:r.engineStamp,engineHeld:r.engineHeld,engineHead:r.engineHead}):l.delete(e)}),"Y",0,(function(e){o=e}),"P",0,(function(e){if(!e)return[];a.has(e)||a.set(e,Date.now());let t=i.get(e);if(void 0!==t&&(i.delete(e),o?.(t.rollups,t.lines,s(e))),0===n.length)return[];let l=[],u=[];for(let t of n)(t.source===e?l:u).push(t);return n=u,r=u.reduce((e,t)=>e+t.rows,0),l})])}),919204,(e=>{let t=/^(\d+)\.(\d+)\.(\d+)$/;e.s(["P",0,(function(e,n){let r=t.exec(e?.trim()??""),a=t.exec(n?.trim()??"");if(null===r||null===a)return null;for(let e=1;e<=3;e+=1){let t=Number(r[e]),n=Number(a[e]);if(t!==n)return t<n?-1:1}return 0}),"L",0,e=>`Update my game to engine v${e}`])}),558150,(e=>{e.s(["m",0,0xa0000000,"d",0,1048576e3])})])})();