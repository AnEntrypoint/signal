//# allFunctionsCalledOnLoad
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,498332,h=>{var e=h.i(428607),t=h.i(902889),a=h.i(437052),r=h.i(510269);let n=function(h){let r=({width:h,height:e})=>`${h}px ${e}px`,n=t.X.map(h=>`--ground-${h}:url(${(0,t.x)(a.L.key,h)})`).join(";"),[o,...i]=t.A,v=e.H[o];return`#${h}{--ground-floor:${a.L.floor};--ground-accent:${a.L.accent};${n}}[data-curtain-ground]{position:absolute;inset:0;background-color:var(--ground-floor);background-position:50% 0;background-repeat:no-repeat,repeat-x;image-rendering:pixelated}[data-curtain-ground]{background-image:var(--ground-${o}),var(--ground-${t.R});background-size:${r(v.cover)},${r((0,e.O)(v))}}`+i.map(h=>`@media (max-width:${e.H[h].maxWidth}px){${(h=>{let{cover:t}=e.H[h];return`[data-curtain-ground]{background-image:var(--ground-${h});background-size:${r(t)}}`})(h)}}`).join("")}(r.R);function o(h){let e=t.X.map(e=>`--ground-${e}:url(${(0,t.x)(h.key,e)})`).join(";");return`#${r.R}{--ground-floor:${h.floor};--ground-accent:${h.accent};${e}}`}h.s(["W",0,n,"Z",0,function(h){return h?`${n}${o(h)}`:n},"$",0,o])},496149,h=>{var e=h.i(241019),t=h.i(339016),a=h.i(792711),r=h.i(566398),n=h.i(510269),o=h.i(967122);h.i(761096);let i=String.raw`(function () {
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
})();`,v="application/x-spawn-arrival";var m=h.i(15038);let s="data-curtain-arrival",l="data-curtain-arrival-shown",c="data-curtain-arrival-host",z="data-curtain-arrival-ran",d="__spawnCurtainArrivalAsk",u="spawn.curtain.arrival-asked",f="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",p="__spawnCurtainArrival";String.raw`(function () {
  ${(0,o.N)("reach")}
  var curtain = document.getElementById('${n.R}');
  if (!curtain || curtain.hasAttribute('${z}')) return;
  curtain.setAttribute('${z}', '');
  var spec = null;
  try { spec = JSON.parse(curtain.getAttribute('${s}') || 'null'); } catch (e) {}
  if (spec && typeof spec.url === 'string') spec.url = reach(spec.url);
  if (!spec || typeof spec.url !== 'string' || !window.WebGL2RenderingContext || !window.createImageBitmap || !window.fetch) return;
  ${i}
  var view = window.__spawnArrivalView;
  var host = document.createElement('div');
  host.setAttribute('${c}', '');
  curtain.insertBefore(host, curtain.firstChild);
  var handle = null, kept = false, last = null, seen = null, off = false, marked = false;
  function post(look) {
    last = look;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || !frame.contentWindow) return;
    var message = { type: '${m.F1}', yaw: look.yaw, pitch: look.pitch };
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
    curtain.setAttribute('${l}', '');
    if (!marked) { marked = true; try { performance.mark('${"spawn.curtain.arrival-shown"}'); } catch (e) {} }
    var look = handle && handle.look();
    if (look) post(look);
  }
  // a lost context took the picture off the screen: the screen's own ground, box, line and bar stand again until it is back
  function hidden() {
    curtain.removeAttribute('${l}');
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
  var asked = window['${d}'];
  var net = asked && asked.url === spec.url && asked.net ? asked.net : fetch(spec.url, ${f});
  window['${d}'] = null;
  if (!asked || asked.url !== spec.url) { try { performance.mark('${u}'); } catch (e) {} }
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
        if (handle) { handle.dispose(); handle = null; curtain.removeAttribute('${l}'); }
        return;
      }
      if (!response.ok || response.status === ${204}) return;
      if (!kept) start(response.clone());
      response.arrayBuffer().then(function (b) {
        var bytes = new Uint8Array(b), read = view.read(bytes);
        if (read && read.meta.handover === false) { forget(); return; }
        if (!kept) name(bytes);
        keep.then(function (box) { if (box && !off) box.put(spec.url, new Response(bytes, { headers: { 'content-type': '${v}' } })).catch(function () {}); });
      }, function () {});
    }, function () {});
  });
  function onAsk(event) {
    var d = event.data;
    if (!d || d.type !== '${m.rr}' || !event.source) return;
    try { event.source.postMessage({ type: '${m.fR}' }, '*'); } catch (e) {}
    if (last) post(last);
  }
  window.addEventListener('message', onAsk);
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${m.JW}' || d.worldHex !== spec.world) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    forget();
  });
  // the frame's kept view stands for the page's life: it is put away whenever it comes, the screen up or gone
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${m.UU}' || d.worldHex !== spec.world || !(d.bytes instanceof Uint8Array || d.bytes instanceof ArrayBuffer)) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    var bytes = d.bytes instanceof Uint8Array ? d.bytes : new Uint8Array(d.bytes);
    var read = view.read(bytes);
    if (off || !read || read.meta.worldHex !== spec.world) return;
    window.__spawnArrivalKept = { bytes: bytes.length, room: read.meta.room, faces: read.meta.faces.map(function (f) { return [f.face, f.size, f.length]; }) };
    keep.then(function (box) {
      if (box) box.put(keptUrl(read.meta.room), new Response(new Blob([bytes], { type: '${v}' }))).catch(function () {});
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
  var doc = document, ASK = '${d}', FRAME = 'iframe[data-spawn-kernel-frame]';
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
    var net = fetch(spec.url, ${f});
    net.catch(function () {});
    window[ASK] = { url: spec.url, net: net };
    try { performance.mark('${u}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let g="Spawn Pixel",w=`'${g}', system-ui, sans-serif`,b=(h,e)=>`@font-face{font-family:'${h}';src:url(${n.d}) format('woff2');font-display:${e};unicode-range:U+0100-FFFF}@font-face{font-family:'${h}';src:url(${n.y}) format('woff2');font-display:${e};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${h}';src:url(${n.k}) format('woff2');font-display:${e};unicode-range:U+0020-007E,U+00A0,U+2026}`;b(n.b,"swap"),t._,n.b;let M="data-curtain-dissolve",y="rgba(255,255,255,0.08)",$=h=>h.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x=e.L,k=`calc(${x} * 0.1)`,A=`rgba(255,255,255,${e.q})`,R='<span data-curtain-dot style="word-spacing:.57em"> </span>',E=`#${n.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${A},${A}) 50% 56%/.12em .12em no-repeat}`,_=h=>`radial-gradient(circle at ${e.G}px ${e.G}px,var(--ground-accent,#fff) ${e.G}px,transparent 0) 0 0/${h}px ${h}px`,T=`#${n.R} [data-curtain-bar]>i{display:block;width:${e.E}px;height:${e.o}px;background:rgba(255,255,255,${e.a})}#${n.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${n.R} [data-curtain-bar]>i[data-b="dense"]{background:${_(e.U)};animation:spawn-curtain-head ${e.O}ms ease-in-out infinite}#${n.R} [data-curtain-bar]>i[data-b="sparse"]{background:${_(e.$)};animation:spawn-curtain-head ${e.O}ms ease-in-out ${e.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${e.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${n.R} [data-curtain-bar]>i{animation:none}}`;function U(h){let t=h/e.D;return t<=.05?0:t>=.97?null:-1666*Math.log((.97-t)/(.97-.05))}let L=`#${n.R}[data-born]:not([${M}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,S=`[${n._}][${n.p}]{visibility:hidden}`,P=(h,e)=>{let t=`round(nearest,${e},1px)`;return"x"===h?`translate:${e} 0;translate:${t} 0`:`translate:0 ${e};translate:0 ${t}`},C=`#${n.R} [data-curtain-stage]>*{${P("x","calc((100cqw - 100%) / 2)")}}`,F=`html[${n.N}] #${n.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${e.v};margin-top:${e.u}px;translate:-50% 0!important;text-wrap:balance}`;h.s(["N",0,M,"J",0,g,"X",0,function(h){let t=`rgba(255,255,255,${e.a})`,a=[_(e.$),_(e.U),"var(--ground-accent,#fff)"],r=U(e.D-1)??1666,n=`${h} [data-curtain-bar]{display:flex;gap:${e.w}px}${h} [data-curtain-bar]>i{display:block;width:${e.E}px;height:${e.o}px;background:${t}}`;for(let o=0;o<e.D;o+=1){let e=[U(o-1),U(o),U(o+1)].flatMap((h,e)=>o+e-1<0||null===h?[]:[`${(h/r*100).toFixed(2)}%{background:${a[e]}}`]);n+=`@keyframes spawn-den-bar-${o}{0%{background:${t}}${e.join("")}}${h} [data-curtain-bar]>i:nth-child(${o+1}){animation:spawn-den-bar-${o} ${Math.round(r)}ms steps(1,end) forwards}`}return n},"F",0,function(h){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${e.u}px">${h}<div data-curtain-bar>${"<i></i>".repeat(e.D)}</div></div>`},"u",0,function(h){return`${h} [data-wisp-loop]{margin-bottom:${e.C-e.u}px}`},"A",0,function(h,t="",o="",i=null,v=null){var m;let z=h.face?i:null,d=h.face?null:v,u=h.groundArt?` data-curtain-ground-art="${$(h.groundArt)}"`:"",f=h.ground?` data-curtain-ground-paint="${$(JSON.stringify(h.ground))}"`:"",A=h.face?` ${M}`:"",_=h.face?null:h.arrival??null,U=function(h,t){let r=(0,a.l)(h),n=(0,e.H)(r,t);if(!r&&!n)return"";let o=r?`<span data-curtain-title style="color:rgba(255,255,255,${e.T})">${$(r)}</span>`:"",i=n?`${r?R:""}<span data-curtain-maker style="color:rgba(255,255,255,${e.q})">${$(n)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${e.v};text-align:center;overflow-wrap:anywhere;font-size:${e.P};line-height:${e.M}">${o}${i}</div>`}(h.title,h.maker),B=h.face?h.face.src:h.thumbnailUrl,I="";if(h.face){let h;h=B?`<img src="${$(B)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${y};user-select:none">`:"",I=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${e.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${y}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${B?"none":"flex"};align-items:flex-end;justify-content:center">${o}</div>`+h+"</div>"}else{let h;B&&(h=$(B),I=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${x};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${k} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${h}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${k} * -1);width:${k};transform:translateZ(calc(${k} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${h}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${n.R} id="${n.R}" aria-hidden="true"${u}${f}${A}${_?` ${s}="${JSON.stringify(_).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${w};transition:${n.S};container-type:size"><style>${b(g,"block")}${d?"":T}${z?.css??""}${U.includes(R)?E:""}${L}${S}${C}${F}${t}${d?.css??""}${_?(m=n.R,`#${m} [${c}]{position:absolute;inset:0;pointer-events:none}#${m}[${l}] [${c}]{pointer-events:auto}#${m}[${l}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(_?`<script>window.${p}&&window.${p}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${r.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${e.u}px;${P("y","calc((100cqh - 100%) / 2)")}">`+I+(d?.room??"")+U+(z?.html??"")+(d?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${e.w}px">${'<i data-b="empty"></i>'.repeat(e.D)}</div>`)+"</div></div>"+(d?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${r.u},0px),env(safe-area-inset-bottom)) - ${e.x}px);text-align:center;font-size:${e.p}px;line-height:${e.z}px;color:rgba(255,255,255,${e.y})"></div>`+`</${n.R}>`}],496149)},806108,h=>{h.s(["f",0,"AAAAeAAeAA_AA_AAeAAeAAAAAAAB_gB_gH_4H_4H_4H_4H_4H_4H_4"])},438248,h=>{var e=h.i(843476),t=h.i(271645),a=h.i(466006),r=h.i(556360);let n=new Map;function o(h,e="filled"){let t=`${h}\0${e}`,i=n.get(t);return void 0===i&&(i=(0,a.c)((0,r.a)(h,e)),n.set(t,i)),i}let i=(0,t.memo)(function({glyph:h,variant:t="filled",...r}){return(0,e.jsx)(a.Y,{d:o(h,t),grid:18,...r})});h.s(["Y",0,i,"h",0,o])},404296,h=>{var e=h.i(325738),t=h.i(165810),a=h.i(892437),r=h.i(816685),n=h.i(770865);let o=null;function i(h){return(0,a.j)()?.worldId===h&&((0,e.j)("den_to_standing"),!0)}function v(){o?.(),o=null}h.s(["o",0,function(h,a){(0,e.Q)("den_to_standing",{atEpochMs:a.pressAtEpochMs??(0,t.Q)(a.arrivedAtPageMs),world:h,reason:"make-page"})},"x",0,function(h){if(v(),i(h))return;let t=(0,a.j)()?.worldId??null,n=()=>{i(h)&&v()};window.addEventListener(a.w,n);let m=(0,r.Y)({onWorldCrossed:a=>{a.worldId!==h&&(v(),(0,e.j)("den_to_standing",a.worldId===t?{ended:"failed",reason:"refused"}:{ended:"left",reason:"crossed"}))}});o=()=>{window.removeEventListener(a.w,n),m()}},"H",0,function(){return"u"<typeof performance?{pressAtEpochMs:null,arrivedAtPageMs:0}:{pressAtEpochMs:(0,n.W)(),arrivedAtPageMs:!function(){let h="function"==typeof performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:void 0;if(void 0===h)return!1;try{return new URL(h.name,window.location.href).pathname===n.b}catch{return!1}}()?performance.now():0}},"z",0,v])},712451,455559,h=>{var e=h.i(438248),t=h.i(806108);let a=`<svg viewBox="0 0 18 18" width="82%" height="82%" shape-rendering="crispEdges" fill="rgba(255,255,255,0.5)" aria-hidden="true"><path d="${(0,e.h)(t.f)}"/></svg>`;var r=h.i(498332),n=h.i(496149),o=h.i(510269),i=h.i(241019);let v={cols:7,rows:12,tickMs:90,frames:[["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm0 1h1v1h-1z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 2h1v1h-1zm-1 1h1v1h-1zm4 0h1v1h-1zm-4 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-1 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 2h1v1h-1zm-2 6h1v1h-1zm4 0h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm1 1h1v1h-1zm-4 1h1v1h-1z","M3 3h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h2v1h-2zm-3 1h1v1h-1zm0 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-4 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 3h1v1h-1zm-2 2h2v1h-2zm3 0h2v1h-2zm1 3h2v1h-2z","M4 3h1v1h-1zm-3 3h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1zm0 1h1v1h-1z","M6 7h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 4h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h3v1h-3zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm0 2h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm0 1h1v1h-1z","M5 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 2h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm-1 2h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h2v1h-2zm0 1h1v1h-1z","M2 1h1v1h-1zm-1 5h1v1h-1zm4 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 8h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm-1 1h2v1h-2zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h2v1h-2zm-1 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1zm-1 1h2v1h-2zm5 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 1h2v1h-2zm1 1h1v1h-1zm0 3h1v1h-1z","M3 0h1v1h-1zm2 2h1v1h-1z","M1 9h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h4v1h-4zm1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h2v1h-2zm-1 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 3h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm1 1h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm1 1h1v1h-1zm-5 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M2 6h2v1h-2zm-1 1h4v1h-4zm2 1h2v1h-2zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1z","M2 4h2v1h-2zm0 1h3v1h-3zm-1 1h1v1h-1zm3 0h1v1h-1zm-2 2h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M2 2h3v1h-3zm1 1h1v1h-1zm-2 5h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M2 1h1v1h-1zm0 2h1v1h-1zm2 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 9h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3z","M3 7h2v1h-2zm0 1h2v1h-2zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M4 4h1v1h-1zm-2 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm3 0h1v1h-1zm1 3h1v1h-1zm0 1h1v1h-1z","M4 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M3 3h3v1h-3zm-1 1h1v1h-1zm-2 1h2v1h-2zm4 0h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M1 2h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm5 5h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 5h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h2v1h-2zm1 2h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm0 1h2v1h-2zm0 1h1v1h-1zm-1 2h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1z","M3 2h1v1h-1zm2 0h1v1h-1zm-4 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 10h2v1h-2zm1 1h1v1h-1z","M3 7h1v1h-1zm0 1h3v1h-3zm-2 1h4v1h-4zm3 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 4h3v1h-3zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 0h1v1h-1zm-5 3h1v1h-1z","M1 8h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h2v1h-2zm-3 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm-1 1h2v1h-2zm0 1h2v1h-2zm3 0h1v1h-1zm2 2h1v1h-1zm-5 1h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm2 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm1 1h2v1h-2zm-1 1h1v1h-1zm3 1h1v1h-1zm-4 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm-1 1h1v1h-1zm2 2h1v1h-1zm-1 1h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 7h1v1h-1zm-1 1h2v1h-2zm1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm0 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M1 5h1v1h-1zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M2 6h3v1h-3zm0 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h2v1h-2zm-2 1h1v1h-1zm2 0h3v1h-3zm-2 1h1v1h-1zm3 1h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M5 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm-1 1h2v1h-2zm3 1h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 5h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M2 10h1v1h-1zm1 1h1v1h-1z","M3 8h2v1h-2zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h2v1h-2z","M3 4h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm3 0h1v1h-1zm-4 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 5h1v1h-1zm-3 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h2v1h-2zm-1 1h4v1h-4zm2 1h1v1h-1zm-3 1h1v1h-1z","M2 4h1v1h-1zm1 1h2v1h-2zm-1 2h1v1h-1zm3 3h1v1h-1z","M1 4h1v1h-1zm2 0h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 6h2v1h-2zm1 1h1v1h-1zm-2 1h4v1h-4zm0 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1z","M3 5h2v1h-2zm-1 2h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm1 1h1v1h-1z","M3 4h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 2h1v1h-1zm-4 1h1v1h-1z","M5 6h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm-1 4h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3zm2 1h2v1h-2zm1 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h3v1h-3zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 5h2v1h-2zm3 0h1v1h-1zm-3 2h1v1h-1zm3 1h2v1h-2zm0 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-2 2h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z",""],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M4 6h1v1h-1zm-1 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z",""],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M2 5h3v1h-3zm0 1h1v1h-1zm2 1h1v1h-1zm-3 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 5h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-5 1h2v1h-2zm1 1h1v1h-1zm4 1h1v1h-1z","M2 5h1v1h-1zm3 1h1v1h-1zm0 2h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"]]},m=["core","bright","base","deep","fringe","eye"],s=["rgb(255,238,215)","rgb(255,208,141)","rgb(255,179,71)","rgb(179,122,8)","rgba(255,174,12,0.26)"],{cols:l,rows:c,tickMs:z}=v,d=v.frames,u=m.slice(0,-1),f=d.length*z,p=h=>`--wisp-${h}`,g=h=>`wisp-f${h}`,w="--wisp-at",b=Array.from({length:i.j},(h,e)=>Math.round(e*d.length/i.j)),M=/^rgba?\([\d., ]+\)$/,y=h=>h.length===u.length&&h.every(h=>M.test(h)),$=h=>u.map((e,t)=>`${p(e)}:${h[t]}`).join(";"),x=m.map(h=>"eye"===h?'fill="#070708"':`style="fill:var(${p(h)})"`),k='<svg width="0" height="0" style="position:absolute"><defs>'+d.map((h,e)=>`<g id="${g(e)}">`+h.map((h,e)=>h?`<path ${x[e]} d="${h}"/>`:"").join("")+"</g>").join("")+"</defs></svg>",A=d.map((h,e)=>{let t=0===e?"":` style="animation-delay:calc(var(${w}) - ${f-e*z}ms)"`;return`<svg viewBox="0 0 ${l} ${c}"${t}><use href="#${g(e)}"/></svg>`}).join("");function R(h=[]){let e=h.filter(y).slice(0,i.j),t=e.length>0?e.map(h=>`<i style="${$(h)}">${A}</i>`).join(""):`<i>${A}</i>`;return`<div data-wisp-loop aria-hidden="true">${k}${t}</div>`}let E=R();function _(h,e){let t=`${h} [data-wisp-loop]`,a=b.map((h,e)=>0===h?"":`${t}>i:nth-of-type(${e+1}){${w}:-${h*z}ms}`).join("");return`${t}{flex:none;position:relative;display:flex;height:${11*e}px;${$(s)}}${t}>i{flex:none;position:relative;width:${l*e}px;${w}:0ms}${t}>i+i{margin-left:${(i.X-l)*e}px}${t}>i>svg{position:absolute;left:0;bottom:0;display:block;width:${l*e}px;height:${c*e}px;opacity:0;shape-rendering:crispEdges;animation:spawn-wisp-frame ${f}ms step-end infinite;animation-delay:var(${w})}`+a+`@keyframes spawn-wisp-frame{from{opacity:1}${100/d.length}%{opacity:0}}`+`@media (prefers-reduced-motion:reduce){${t}{height:${8*e}px}${t}>i>svg{animation:none}${t}>i>svg:first-child{opacity:1}}`}h.s(["_",0,E,"e",0,_,"K",0,R],455559);let T=`#${o.R}`,U=_(T,i.Q)+(0,n.u)(T);function L(h){return{css:U,html:R(h??[])}}L();var S=h.i(589262),P=h.i(638755),C=h.i(789110);let F=(0,n.X)(`#${o.R}`),B=["solid","dense","sparse"];h.s(["x",0,function({avatarUrl:h,groundKey:e,wisps:t=null}){var o;let v,m=(v=(o={byline:"",own:!0,avatarUrl:h,groundArt:null,groundKey:e,wisps:t}).groundKey?(0,P._)(o.groundKey):null,{title:(0,i.h)(o.byline,o.own),thumbnailUrl:null,groundArt:o.groundArt,ground:v?{key:v.key,floor:v.floor,accent:v.accent,palette:v.palette}:null,maker:null,wisps:o.wisps??null,face:{src:o.avatarUrl&&o.avatarUrl!==C.V?(0,S.C)(o.avatarUrl,288):null}});return(0,n.A)(m,(0,r.Z)(m.ground),a,L(t))},"y",0,function(h,e){let t;return"document"===e?(t=0,h.replace(/<i data-b="empty">/g,()=>`<i data-b="${B[t++]??"empty"}">`)):`${h}<style>${F}</style>`}],712451)},638755,h=>{var e=h.i(370849),t=h.i(123424),a=h.i(574622),r=h.i(214950),n=h.i(503859);function o(h,e=r.f.page){return(0,a.T)((e,t)=>(0,n.X)(h,e,t),e)}let i={panel:0,panelRule:2,raised:1,raisedRule:2,field:1,chip:1,rail:0,railRule:2,scrim:0},v={l:.84,c:.11,h:190},m={gold:e.V[3],ice:(0,t.L)((0,t.t)(v))};var s=h.i(956174);let l=([h,e,t])=>`rgb(${Math.round(h)} ${Math.round(e)} ${Math.round(t)})`,c=[{l:.3,c:.06},{l:.49,c:.1},{l:.7,c:.13},{l:.86,c:.12}];function z(h){return{key:(0,s.M)(h),floor:l(o(h)[0]),accent:l(function(h){if(h.flat)return(0,t.t)(v);let e=Math.max(...Object.values(function(h,e=r.f.page){let t=o(h,e),a={};for(let h of Object.keys(i))a[h]=t[i[h]];return a}(h)).map(h=>(0,t.E)(function([h,e,t]){return[127.5+.5*h,127.5+.5*e,127.5+.5*t]}(h))));return(0,t.Q)(h.accent,h=>(0,t.E)(h)>=e)}(h)),mood:h.accentIsWarm?m.ice:m.gold,glowRamp:c.map(e=>(([h,e,t])=>`#${[h,e,t].map(h=>Math.round(h).toString(16).padStart(2,"0")).join("")}`)((0,t.P)({l:e.l,c:e.c*(h.flat?.5:1),h:h.bloomA}))),palette:o(h).map(([h,e,t])=>`${h} ${e} ${t}`),hues:h}}h.s(["S",0,z,"_",0,function(h){let e=(0,s._)(h);return e?z(e):null}],638755)},123424,h=>{let e=h=>{let e=h/255;return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)},t=h=>{let e=Math.max(0,Math.min(1,h));return(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)*255};function a(h,t,a){let r=e(h),n=e(t),o=e(a),i=Math.cbrt(.4122214708*r+.5363325363*n+.0514459929*o),v=Math.cbrt(.2119034982*r+.6806995451*n+.1073969566*o),m=Math.cbrt(.0883024619*r+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*v-.0040720468*m,1.9779984951*i-2.428592205*v+.4505937099*m,.0259040371*i+.7827717662*v-.808675766*m]}function r([h,e,t]){let a=h+.3963377774*e+.2158037573*t,n=h-.1055613458*e-.0638541728*t,o=h-.0894841775*e-1.291485548*t,i=a*a*a,v=n*n*n,m=o*o*o;return[4.0767416621*i-3.3077115913*v+.2309699292*m,-1.2684380046*i+2.6097574011*v-.3413193965*m,-.0041960863*i-.7034186147*v+1.707614701*m]}function n(h){let[e,a,n]=r(h);return[t(e),t(a),t(n)]}function o({l:h,c:e,h:t}){let a=t*Math.PI/180;return[h,Math.cos(a)*e,Math.sin(a)*e]}function i(h){return n(o(h))}function v(h){let[e,t,a]=i(h);return[Math.round(e),Math.round(t),Math.round(a)]}function m(h,e){let t=0,a=.5;for(let n=0;n<24;n++){let n=(t+a)/2;r(o({l:h,c:n,h:e})).every(h=>h>=0&&h<=1)?t=n:a=n}return t}h.s(["L",0,function([h,e,t]){return`#${[h,e,t].map(h=>h.toString(16).padStart(2,"0")).join("")}`},"O",0,function(h,e){let t=Math.abs(h-e)%360;return t>180?360-t:t},"M",0,n,"E",0,function([h,t,a]){return .2126*e(h)+.7152*e(t)+.0722*e(a)},"N",0,o,"P",0,i,"t",0,v,"s",0,a,"T",0,function(h,e,t){return function([h,e,t]){return{l:h,c:Math.hypot(e,t),h:(180*Math.atan2(t,e)/Math.PI%360+360)%360}}(a(h,e,t))},"Q",0,function(h,e){let t=e=>v({l:e,c:m(e,h),h}),a=0,r=1;for(let e=0;e<24;e++){let e=a+(r-a)/3,t=r-(r-a)/3;m(e,h)<m(t,h)?a=e:r=t}let n=(a+r)/2;if(e(t(n)))return t(n);let o=n,i=1;for(let h=0;h<24;h++){let h=(o+i)/2;e(t(h))?i=h:o=h}return t(i)},"w",0,function(h){return(h%360+360)%360}])},574622,390763,413194,956174,h=>{var e=h.i(123424),t=h.i(428607);function a(h){return h>=30&&h<=130}function r(h,t){return(0,e.M)(function(h,t){let a=h[0],r=h[h.length-1];if(t<=a.at)return(0,e.N)(a.color);if(t>=r.at)return(0,e.N)(r.color);for(let a=1;a<h.length;a++){let r=h[a];if(t<=r.at){let n=h[a-1],o=(t-n.at)/(r.at-n.at||1),i=(0,e.N)(n.color),v=(0,e.N)(r.color);return[i[0]+(v[0]-i[0])*o,i[1]+(v[1]-i[1])*o,i[2]+(v[2]-i[2])*o]}}return(0,e.N)(r.color)}(h.stops,t))}h.s(["K",0,function(h,t){let r=(0,e.T)(h[0],h[1],h[2]),n=(0,e.T)(t[0],t[1],t[2]).h,o=(0,e.O)(n,r.h);return function(h,t,r){if(h.meanChroma<.035)return{ground:h.hue,groundChroma:.035,bloomA:h.hue,bloomB:t??190,accent:190,accentIsWarm:!1,flat:!0};let n=r??(0,e.w)(h.hue+180);return{ground:h.hue,groundChroma:.05,bloomA:h.hue,bloomB:t??(0,e.w)(h.hue-60),accent:n,accentIsWarm:a(n),flat:!1}}({hue:r.h,meanChroma:r.c},o>=20?n:null,o>=90?n:null)},"m",0,a],390763);var n=h.i(214950);let o={a:.62,b:.58};function i(h,t){let a=(0,e.T)(h[0],h[1],h[2]),[r,n,o]=(0,e.P)({...a,l:a.l+t});return[Math.round(r),Math.round(n),Math.round(o)]}function v(h,t=n.f.page){let a=h.stops[0].color,m=[{role:"floor",rgb:i(r(h,1),-.0011)},{role:"mid",rgb:i(r(h,.46),.0055)},{role:"top",rgb:i(r(h,0),.011)}],s=h.glows[h.glows.length-1],l=h.glows[h.glows.length-2],c=(h,r,n)=>{let i=t.tints[r][n],v=.5*Math.max(0,h.color.l-o[r]),[m,s,l]=(0,e.P)({l:a.l+i.dl+v,c:a.c*i.dc,h:h.color.h});return[Math.round(m),Math.round(s),Math.round(l)]};return s&&(m.push({role:"bloomA-half",rgb:c(s,"a",0)}),m.push({role:"bloomA",rgb:c(s,"a",1)})),l&&(m.push({role:"bloomB-half",rgb:c(l,"b",0)}),m.push({role:"bloomB",rgb:c(l,"b",1)})),m}let m=[[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],[12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],[3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],[15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]];function s(h){let t=h.map(([h,t,a])=>(0,e.s)(h,t,a));return(h,a,r)=>{let[n,o,i]=(0,e.s)(h,a,r),v=0,m=1/0;for(let h=0;h<t.length;h++){let e=t[h],a=(n-e[0])**2+(o-e[1])**2+(i-e[2])**2;a<m&&(m=a,v=h)}return v}}h.s(["j",0,function(h,e){return m[7&e][7&h]},"L",0,s],413194);h.s(["n",0,class{width;height;palette;block;blockOrigin;form;stack;nearest;rowCount;ramp;stand;glowRgb;constructor(h,r,o=r.frame.height,i=!1){this.form=r,this.stand=i?n.f.alone:n.f.page,this.stack=h(r,this.stand),this.palette=function(h,t=n.f.page){let r=v(h,t).map(h=>h.rgb),o=a(h.glows[h.glows.length-2]?.color.h??0/0)?[...r.slice(0,5),r[3],r[4]]:r,i=[o[0],...[[0,1,3],[1,2,3],[2,3,2],[3,4,2],[2,5,2],[5,6,2]].filter(([h,e])=>o[h]&&o[e]).flatMap(([h,t,a])=>Array.from({length:a},(r,n)=>{var i,v,m;let s,l,c;return i=o[h],v=o[t],m=(n+1)/a,s=(0,e.s)(i[0],i[1],i[2]),l=(0,e.s)(v[0],v[1],v[2]),[Math.round((c=(0,e.M)([s[0]+(l[0]-s[0])*m,s[1]+(l[1]-s[1])*m,s[2]+(l[2]-s[2])*m]))[0]),Math.round(c[1]),Math.round(c[2])]}))];return i.filter((h,e)=>i.findIndex(e=>e[0]===h[0]&&e[1]===h[1]&&e[2]===h[2])===e)}(h(t.H.desktop,this.stand),this.stand),this.nearest=s(this.palette),this.block=r.block,this.blockOrigin=r.blockOrigin;let{width:m,height:l}=(0,t.g)(r);this.width=m,this.height=l,this.ramp=Math.max(r.frame.height,o),this.rowCount=Math.ceil(Math.max(l,Math.ceil(this.ramp/4))/this.block),this.glowRgb=new Float64Array(3*this.stack.glows.length),this.stack.glows.forEach((h,t)=>this.glowRgb.set((0,e.P)(h.color),3*t))}get glowReach(){let{frame:h}=this.form;return this.stack.glows.map(e=>e.cy*h.height+e.ry*e.fade)}get cover(){return{x0:0,y0:0,width:this.width,height:this.height}}write(h,e=null,t=this.cover){let{frame:a,cover:n}=this.form,o=this.stack.glows,i=o.length,v=new Float64Array(6*i);for(let h=0;h<i;h++){let t=o[h],r=e?.[h];v[6*h]=t.cx*a.width+(r?.dx??0),v[6*h+1]=t.cy*a.height+(r?.dy??0),v[6*h+2]=t.rx,v[6*h+3]=t.ry,v[6*h+4]=t.fade,v[6*h+5]=t.alpha*this.stand.glow*(r?.k??1)}let m=this.glowRgb,s=(n.width-a.width)/2,l=this.block,c=this.blockOrigin,z=4*l,d=.5*a.width,u=-.08*a.height,f=1700*this.form.bloomScaleX,p=this.stand.reach*this.ramp,g=Math.floor((t.x0-c)/l),w=Math.floor((t.x0+t.width-1-c)/l),b=Math.floor(t.y0/l),M=Math.floor((t.y0+t.height-1)/l),y=Math.floor(-c/l),$=Math.floor((this.width-1-c)/l);for(let e=b;e<=M;e++){let a=Math.max(0,e),n=(a+.5)*z,o=a>=this.rowCount;for(let a=g;a<=w;a++){let g=0;if(!o){let h=(a+.5)*z+4*c-s,e=((Math.min($,Math.max(y,a))+.5)*z+4*c-s-d)/f,t=(n-u)/p,o=r(this.stack,Math.min(1,Math.sqrt(e*e+t*t))),l=o[0],w=o[1],b=o[2];for(let e=0;e<i;e++){let t=6*e,a=(h-v[t])/v[t+2],r=(n-v[t+1])/v[t+3],o=Math.sqrt(a*a+r*r),i=v[t+4],s=o>=i?0:v[t+5]*(1-o/i);s>0&&(l=m[3*e]*s+l*(1-s),w=m[3*e+1]*s+w*(1-s),b=m[3*e+2]*s+b*(1-s))}g=this.nearest(l,w,b)}let w=Math.max(t.x0,a*l+c),b=Math.min(t.x0+t.width,(a+1)*l+c),M=Math.max(t.y0,e*l),x=Math.min(t.y0+t.height,(e+1)*l);for(let e=M;e<x;e++){let a=(e-t.y0)*t.width-t.x0;h.fill(g,a+w,a+b)}}}}},"Y",0,function(h,e,t){let a=(e-h.cover.width)/2,r=Math.floor(-a/4);return{window:{x0:r,y0:0,width:Math.max(1,Math.ceil((e-a)/4)-r),height:Math.max(1,Math.ceil(t/4))},coverLeft:a}},"T",0,function(h,e=n.f.page){return v(h(t.H.desktop,e),e).map(h=>h.rgb)}],574622);let l=/^v\d{1,3}-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})-([01])$/,c=h=>Math.round((0,e.w)(h))%360;h.s(["M",0,function(h,e="v7"){return`${e}-${c(h.ground)}-${c(h.bloomA)}-${c(h.bloomB)}-${c(h.accent)}-${+!!h.flat}`},"_",0,function(h){let e=l.exec(h);if(!e)return null;let[t,r,n,o]=[e[1],e[2],e[3],e[4]].map(Number);if([t,r,n,o].some(h=>h>=360))return null;let i="1"===e[5];return{ground:t,groundChroma:i?.035:.05,bloomA:r,bloomB:n,accent:o,accentIsWarm:!i&&a(o),flat:i}}],956174)},503859,214950,h=>{let e={page:{reach:.45,glow:.58,colour:1,tints:{a:[{dl:.04,dc:1.3},{dl:.08,dc:1.6}],b:[{dl:.025,dc:1.15},{dl:.06,dc:1.4}]}},alone:{reach:1.15,glow:1,colour:1.7,tints:{a:[{dl:.057,dc:1.64},{dl:.109,dc:2.18}],b:[{dl:.032,dc:1.33},{dl:.082,dc:1.82}]}}};h.s(["f",0,e],214950),h.s(["F",0,{ground:272,groundChroma:.05,bloomA:262,bloomB:215,accent:355,accentIsWarm:!1,flat:!1},"X",0,function(h,t,a=e.page){let r=t.bloomScaleX,n=t.bloomScaleY,o=h.flat?h.groundChroma:h.groundChroma*a.colour,i=e=>h.flat?Math.min(e,.07):e,v=h.bloomB>=30&&h.bloomB<=130;return{stops:[{color:{l:.25,c:o,h:h.ground},at:0},{color:{l:.21,c:.84*o,h:h.ground},at:.46},{color:{l:.175,c:.67*o,h:h.ground},at:1}],glows:[{cx:.86,cy:.02,rx:720*r,ry:380*n,color:{l:v?.72:.58,c:i(v?.14:.16),h:h.bloomB},alpha:v?.16:.18,fade:.72},{cx:.14,cy:-.06,rx:820*r,ry:420*n,color:{l:.62,c:i(.19),h:h.bloomA},alpha:.22,fade:.7}]}}],503859)},370849,h=>{h.s(["G",0,"#070708","V",0,["#3a2c14","#7a5a24","#c99b4a","#ffd9a0"]])}])})();