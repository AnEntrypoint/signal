//# allFunctionsCalledOnLoad
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,498332,e=>{var h=e.i(428607),t=e.i(902889),a=e.i(437052),r=e.i(510269);let n=function(e){let r=({width:e,height:h})=>`${e}px ${h}px`,n=t.X.map(e=>`--ground-${e}:url(${(0,t.x)(a.L.key,e)})`).join(";"),[o,...i]=t.A,v=h.H[o];return`#${e}{--ground-floor:${a.L.floor};--ground-accent:${a.L.accent};${n}}[data-curtain-ground]{position:absolute;inset:0;background-color:var(--ground-floor);background-position:50% 0;background-repeat:no-repeat,repeat-x;image-rendering:pixelated}[data-curtain-ground]{background-image:var(--ground-${o}),var(--ground-${t.R});background-size:${r(v.cover)},${r((0,h.O)(v))}}`+i.map(e=>`@media (max-width:${h.H[e].maxWidth}px){${(e=>{let{cover:t}=h.H[e];return`[data-curtain-ground]{background-image:var(--ground-${e});background-size:${r(t)}}`})(e)}}`).join("")}(r.R);function o(e){let h=t.X.map(h=>`--ground-${h}:url(${(0,t.x)(e.key,h)})`).join(";");return`#${r.R}{--ground-floor:${e.floor};--ground-accent:${e.accent};${h}}`}e.s(["W",0,n,"Z",0,function(e){return e?`${n}${o(e)}`:n},"$",0,o])},496149,e=>{var h=e.i(241019),t=e.i(339016),a=e.i(792711),r=e.i(566398),n=e.i(510269),o=e.i(967122);e.i(761096);let i=String.raw`(function () {
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
})();`,v="application/x-spawn-arrival";var m=e.i(15038);let s="data-curtain-arrival",l="data-curtain-arrival-shown",c="data-curtain-arrival-host",z="data-curtain-arrival-ran",u="__spawnCurtainArrivalAsk",d="spawn.curtain.arrival-asked",f="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",p="__spawnCurtainArrival";String.raw`(function () {
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
  var asked = window['${u}'];
  var net = asked && asked.url === spec.url && asked.net ? asked.net : fetch(spec.url, ${f});
  window['${u}'] = null;
  if (!asked || asked.url !== spec.url) { try { performance.mark('${d}'); } catch (e) {} }
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
  var doc = document, ASK = '${u}', FRAME = 'iframe[data-spawn-kernel-frame]';
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
    try { performance.mark('${d}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let g="Spawn Pixel",w=`'${g}', system-ui, sans-serif`,b=(e,h)=>`@font-face{font-family:'${e}';src:url(${n.d}) format('woff2');font-display:${h};unicode-range:U+0100-FFFF}@font-face{font-family:'${e}';src:url(${n.y}) format('woff2');font-display:${h};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${e}';src:url(${n.k}) format('woff2');font-display:${h};unicode-range:U+0020-007E,U+00A0,U+2026}`;b(n.b,"swap"),t._,n.b;let M="data-curtain-dissolve",y="rgba(255,255,255,0.08)",$=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x=h.L,k=`calc(${x} * 0.1)`,A=`rgba(255,255,255,${h.q})`,R='<span data-curtain-dot style="word-spacing:.57em"> </span>',E=`#${n.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${A},${A}) 50% 56%/.12em .12em no-repeat}`,_=e=>`radial-gradient(circle at ${h.G}px ${h.G}px,var(--ground-accent,#fff) ${h.G}px,transparent 0) 0 0/${e}px ${e}px`,T=`#${n.R} [data-curtain-bar]>i{display:block;width:${h.E}px;height:${h.o}px;background:rgba(255,255,255,${h.a})}#${n.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${n.R} [data-curtain-bar]>i[data-b="dense"]{background:${_(h.U)};animation:spawn-curtain-head ${h.O}ms ease-in-out infinite}#${n.R} [data-curtain-bar]>i[data-b="sparse"]{background:${_(h.$)};animation:spawn-curtain-head ${h.O}ms ease-in-out ${h.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${h.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${n.R} [data-curtain-bar]>i{animation:none}}`;function U(e){let t=e/h.D;return t<=.05?0:t>=.97?null:-1666*Math.log((.97-t)/(.97-.05))}let L=`#${n.R}[data-born]:not([${M}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,S=`[${n._}][${n.p}]{visibility:hidden}`,P=(e,h)=>{let t=`round(nearest,${h},1px)`;return"x"===e?`translate:${h} 0;translate:${t} 0`:`translate:0 ${h};translate:0 ${t}`},F=`#${n.R} [data-curtain-stage]>*{${P("x","calc((100cqw - 100%) / 2)")}}`,C=`html[${n.N}] #${n.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${h.v};margin-top:${h.u}px;translate:-50% 0!important;text-wrap:balance}`;e.s(["N",0,M,"J",0,g,"X",0,function(e){let t=`rgba(255,255,255,${h.a})`,a=[_(h.$),_(h.U),"var(--ground-accent,#fff)"],r=U(h.D-1)??1666,n=`${e} [data-curtain-bar]{display:flex;gap:${h.w}px}${e} [data-curtain-bar]>i{display:block;width:${h.E}px;height:${h.o}px;background:${t}}`;for(let o=0;o<h.D;o+=1){let h=[U(o-1),U(o),U(o+1)].flatMap((e,h)=>o+h-1<0||null===e?[]:[`${(e/r*100).toFixed(2)}%{background:${a[h]}}`]);n+=`@keyframes spawn-den-bar-${o}{0%{background:${t}}${h.join("")}}${e} [data-curtain-bar]>i:nth-child(${o+1}){animation:spawn-den-bar-${o} ${Math.round(r)}ms steps(1,end) forwards}`}return n},"F",0,function(e){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${h.u}px">${e}<div data-curtain-bar>${"<i></i>".repeat(h.D)}</div></div>`},"u",0,function(e){return`${e} [data-wisp-loop]{margin-bottom:${h.C-h.u}px}`},"A",0,function(e,t="",o="",i=null,v=null){var m;let z=e.face?i:null,u=e.face?null:v,d=e.groundArt?` data-curtain-ground-art="${$(e.groundArt)}"`:"",f=e.ground?` data-curtain-ground-paint="${$(JSON.stringify(e.ground))}"`:"",A=e.face?` ${M}`:"",_=e.face?null:e.arrival??null,U=function(e,t){let r=(0,a.l)(e),n=(0,h.H)(r,t);if(!r&&!n)return"";let o=r?`<span data-curtain-title style="color:rgba(255,255,255,${h.T})">${$(r)}</span>`:"",i=n?`${r?R:""}<span data-curtain-maker style="color:rgba(255,255,255,${h.q})">${$(n)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${h.v};text-align:center;overflow-wrap:anywhere;font-size:${h.P};line-height:${h.M}">${o}${i}</div>`}(e.title,e.maker),B=e.face?e.face.src:e.thumbnailUrl,I="";if(e.face){let e;e=B?`<img src="${$(B)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${y};user-select:none">`:"",I=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${h.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${y}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${B?"none":"flex"};align-items:flex-end;justify-content:center">${o}</div>`+e+"</div>"}else{let e;B&&(e=$(B),I=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${x};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${k} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${e}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${k} * -1);width:${k};transform:translateZ(calc(${k} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${e}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${n.R} id="${n.R}" aria-hidden="true"${d}${f}${A}${_?` ${s}="${JSON.stringify(_).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${w};transition:${n.S};container-type:size"><style>${b(g,"block")}${u?"":T}${z?.css??""}${U.includes(R)?E:""}${L}${S}${F}${C}${t}${u?.css??""}${_?(m=n.R,`#${m} [${c}]{position:absolute;inset:0;pointer-events:none}#${m}[${l}] [${c}]{pointer-events:auto}#${m}[${l}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(_?`<script>window.${p}&&window.${p}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${r.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${h.u}px;${P("y","calc((100cqh - 100%) / 2)")}">`+I+(u?.room??"")+U+(z?.html??"")+(u?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${h.w}px">${'<i data-b="empty"></i>'.repeat(h.D)}</div>`)+"</div></div>"+(u?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${r.u},0px),env(safe-area-inset-bottom)) - ${h.x}px);text-align:center;font-size:${h.p}px;line-height:${h.z}px;color:rgba(255,255,255,${h.y})"></div>`+`</${n.R}>`}],496149)},806108,e=>{e.s(["f",0,"AAAAeAAeAA_AA_AAeAAeAAAAAAAB_gB_gH_4H_4H_4H_4H_4H_4H_4"])},556360,e=>{function h(e,h){let t=[];for(let a=0;a<h*h;a++){a%h==0&&t.push([]);let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".indexOf(e[Math.floor(a/6)]??"A");t[t.length-1].push(r>>5-a%6&1)}return t}function t(e){return e.map((h,t)=>h.map((a,r)=>{if(!a)return 0;let n=e[t-1]?.[r]??0,o=e[t+1]?.[r]??0,i=h[r-1]??0,v=h[r+1]??0;return n&&o&&i&&v?0:1}))}let a=new Map,r=new Map;e.s(["C",0,t,"a",0,function(e,n="filled"){let o=a.get(e);if(o||(o=h(e,18),a.set(e,o)),"filled"===n)return o;let i=r.get(e);return i||(i=t(o),r.set(e,i)),i},"w",0,h])},438248,e=>{var h=e.i(843476),t=e.i(271645),a=e.i(466006),r=e.i(556360);let n=new Map;function o(e,h="filled"){let t=`${e}\0${h}`,i=n.get(t);return void 0===i&&(i=(0,a.c)((0,r.a)(e,h)),n.set(t,i)),i}let i=(0,t.memo)(function({glyph:e,variant:t="filled",...r}){return(0,h.jsx)(a.Y,{d:o(e,t),grid:18,...r})});e.s(["Y",0,i,"h",0,o])},404296,e=>{var h=e.i(325738),t=e.i(165810),a=e.i(892437),r=e.i(816685),n=e.i(770865);let o=null;function i(e){return(0,a.j)()?.worldId===e&&((0,h.j)("den_to_standing"),!0)}function v(){o?.(),o=null}e.s(["o",0,function(e,a){(0,h.Q)("den_to_standing",{atEpochMs:a.pressAtEpochMs??(0,t.Q)(a.arrivedAtPageMs),world:e,reason:"make-page"})},"x",0,function(e){if(v(),i(e))return;let t=(0,a.j)()?.worldId??null,n=()=>{i(e)&&v()};window.addEventListener(a.w,n);let m=(0,r.Y)({onWorldCrossed:a=>{a.worldId!==e&&(v(),(0,h.j)("den_to_standing",a.worldId===t?{ended:"failed",reason:"refused"}:{ended:"left",reason:"crossed"}))}});o=()=>{window.removeEventListener(a.w,n),m()}},"H",0,function(){return"u"<typeof performance?{pressAtEpochMs:null,arrivedAtPageMs:0}:{pressAtEpochMs:(0,n.W)(),arrivedAtPageMs:!function(){let e="function"==typeof performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:void 0;if(void 0===e)return!1;try{return new URL(e.name,window.location.href).pathname===n.b}catch{return!1}}()?performance.now():0}},"z",0,v])},712451,455559,e=>{var h=e.i(438248),t=e.i(806108);let a=`<svg viewBox="0 0 18 18" width="82%" height="82%" shape-rendering="crispEdges" fill="rgba(255,255,255,0.5)" aria-hidden="true"><path d="${(0,h.h)(t.f)}"/></svg>`;var r=e.i(498332),n=e.i(496149),o=e.i(510269),i=e.i(241019);let v={cols:7,rows:12,tickMs:90,frames:[["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm0 1h1v1h-1z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 2h1v1h-1zm-1 1h1v1h-1zm4 0h1v1h-1zm-4 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-1 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 2h1v1h-1zm-2 6h1v1h-1zm4 0h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm1 1h1v1h-1zm-4 1h1v1h-1z","M3 3h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h2v1h-2zm-3 1h1v1h-1zm0 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-4 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 3h1v1h-1zm-2 2h2v1h-2zm3 0h2v1h-2zm1 3h2v1h-2z","M4 3h1v1h-1zm-3 3h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1zm0 1h1v1h-1z","M6 7h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 4h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h3v1h-3zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm0 2h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm0 1h1v1h-1z","M5 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 2h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm-1 2h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h2v1h-2zm0 1h1v1h-1z","M2 1h1v1h-1zm-1 5h1v1h-1zm4 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 8h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm-1 1h2v1h-2zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h2v1h-2zm-1 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1zm-1 1h2v1h-2zm5 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 1h2v1h-2zm1 1h1v1h-1zm0 3h1v1h-1z","M3 0h1v1h-1zm2 2h1v1h-1z","M1 9h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h4v1h-4zm1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h2v1h-2zm-1 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 3h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm1 1h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm1 1h1v1h-1zm-5 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M2 6h2v1h-2zm-1 1h4v1h-4zm2 1h2v1h-2zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1z","M2 4h2v1h-2zm0 1h3v1h-3zm-1 1h1v1h-1zm3 0h1v1h-1zm-2 2h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M2 2h3v1h-3zm1 1h1v1h-1zm-2 5h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M2 1h1v1h-1zm0 2h1v1h-1zm2 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 9h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3z","M3 7h2v1h-2zm0 1h2v1h-2zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M4 4h1v1h-1zm-2 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm3 0h1v1h-1zm1 3h1v1h-1zm0 1h1v1h-1z","M4 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M3 3h3v1h-3zm-1 1h1v1h-1zm-2 1h2v1h-2zm4 0h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M1 2h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm5 5h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 5h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h2v1h-2zm1 2h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm0 1h2v1h-2zm0 1h1v1h-1zm-1 2h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1z","M3 2h1v1h-1zm2 0h1v1h-1zm-4 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 10h2v1h-2zm1 1h1v1h-1z","M3 7h1v1h-1zm0 1h3v1h-3zm-2 1h4v1h-4zm3 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 4h3v1h-3zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 0h1v1h-1zm-5 3h1v1h-1z","M1 8h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h2v1h-2zm-3 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm-1 1h2v1h-2zm0 1h2v1h-2zm3 0h1v1h-1zm2 2h1v1h-1zm-5 1h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm2 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm1 1h2v1h-2zm-1 1h1v1h-1zm3 1h1v1h-1zm-4 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm-1 1h1v1h-1zm2 2h1v1h-1zm-1 1h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 7h1v1h-1zm-1 1h2v1h-2zm1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm0 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M1 5h1v1h-1zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M2 6h3v1h-3zm0 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h2v1h-2zm-2 1h1v1h-1zm2 0h3v1h-3zm-2 1h1v1h-1zm3 1h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M5 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm-1 1h2v1h-2zm3 1h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 5h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M2 10h1v1h-1zm1 1h1v1h-1z","M3 8h2v1h-2zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h2v1h-2z","M3 4h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm3 0h1v1h-1zm-4 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 5h1v1h-1zm-3 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h2v1h-2zm-1 1h4v1h-4zm2 1h1v1h-1zm-3 1h1v1h-1z","M2 4h1v1h-1zm1 1h2v1h-2zm-1 2h1v1h-1zm3 3h1v1h-1z","M1 4h1v1h-1zm2 0h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 6h2v1h-2zm1 1h1v1h-1zm-2 1h4v1h-4zm0 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1z","M3 5h2v1h-2zm-1 2h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm1 1h1v1h-1z","M3 4h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 2h1v1h-1zm-4 1h1v1h-1z","M5 6h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm-1 4h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3zm2 1h2v1h-2zm1 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h3v1h-3zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 5h2v1h-2zm3 0h1v1h-1zm-3 2h1v1h-1zm3 1h2v1h-2zm0 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-2 2h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z",""],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M4 6h1v1h-1zm-1 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z",""],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M2 5h3v1h-3zm0 1h1v1h-1zm2 1h1v1h-1zm-3 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 5h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-5 1h2v1h-2zm1 1h1v1h-1zm4 1h1v1h-1z","M2 5h1v1h-1zm3 1h1v1h-1zm0 2h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"]]},m=["core","bright","base","deep","fringe","eye"],s=["rgb(255,238,215)","rgb(255,208,141)","rgb(255,179,71)","rgb(179,122,8)","rgba(255,174,12,0.26)"],{cols:l,rows:c,tickMs:z}=v,u=v.frames,d=m.slice(0,-1),f=u.length*z,p=e=>`--wisp-${e}`,g=e=>`wisp-f${e}`,w="--wisp-at",b=Array.from({length:i.j},(e,h)=>Math.round(h*u.length/i.j)),M=/^rgba?\([\d., ]+\)$/,y=e=>e.length===d.length&&e.every(e=>M.test(e)),$=e=>d.map((h,t)=>`${p(h)}:${e[t]}`).join(";"),x=m.map(e=>"eye"===e?'fill="#070708"':`style="fill:var(${p(e)})"`),k='<svg width="0" height="0" style="position:absolute"><defs>'+u.map((e,h)=>`<g id="${g(h)}">`+e.map((e,h)=>e?`<path ${x[h]} d="${e}"/>`:"").join("")+"</g>").join("")+"</defs></svg>",A=u.map((e,h)=>{let t=0===h?"":` style="animation-delay:calc(var(${w}) - ${f-h*z}ms)"`;return`<svg viewBox="0 0 ${l} ${c}"${t}><use href="#${g(h)}"/></svg>`}).join("");function R(e=[]){let h=e.filter(y).slice(0,i.j),t=h.length>0?h.map(e=>`<i style="${$(e)}">${A}</i>`).join(""):`<i>${A}</i>`;return`<div data-wisp-loop aria-hidden="true">${k}${t}</div>`}let E=R();function _(e,h){let t=`${e} [data-wisp-loop]`,a=b.map((e,h)=>0===e?"":`${t}>i:nth-of-type(${h+1}){${w}:-${e*z}ms}`).join("");return`${t}{flex:none;position:relative;display:flex;height:${11*h}px;${$(s)}}${t}>i{flex:none;position:relative;width:${l*h}px;${w}:0ms}${t}>i+i{margin-left:${(i.X-l)*h}px}${t}>i>svg{position:absolute;left:0;bottom:0;display:block;width:${l*h}px;height:${c*h}px;opacity:0;shape-rendering:crispEdges;animation:spawn-wisp-frame ${f}ms step-end infinite;animation-delay:var(${w})}`+a+`@keyframes spawn-wisp-frame{from{opacity:1}${100/u.length}%{opacity:0}}`+`@media (prefers-reduced-motion:reduce){${t}{height:${8*h}px}${t}>i>svg{animation:none}${t}>i>svg:first-child{opacity:1}}`}e.s(["_",0,E,"e",0,_,"K",0,R],455559);let T=`#${o.R}`,U=_(T,i.Q)+(0,n.u)(T);function L(e){return{css:U,html:R(e??[])}}L();var S=e.i(589262),P=e.i(638755),F=e.i(789110);let C=(0,n.X)(`#${o.R}`),B=["solid","dense","sparse"];e.s(["x",0,function({avatarUrl:e,groundKey:h,wisps:t=null}){var o;let v,m=(v=(o={byline:"",own:!0,avatarUrl:e,groundArt:null,groundKey:h,wisps:t}).groundKey?(0,P._)(o.groundKey):null,{title:(0,i.h)(o.byline,o.own),thumbnailUrl:null,groundArt:o.groundArt,ground:v?{key:v.key,floor:v.floor,accent:v.accent,palette:v.palette}:null,maker:null,wisps:o.wisps??null,face:{src:o.avatarUrl&&o.avatarUrl!==F.V?(0,S.C)(o.avatarUrl,288):null}});return(0,n.A)(m,(0,r.Z)(m.ground),a,L(t))},"y",0,function(e,h){let t;return"document"===h?(t=0,e.replace(/<i data-b="empty">/g,()=>`<i data-b="${B[t++]??"empty"}">`)):`${e}<style>${C}</style>`}],712451)},770865,e=>{var h=e.i(417695);let t="spawn:make-press";e.s(["b",0,"/create","a",0,function(e){Number.isFinite(e)&&(0,h.B)("session",t,String(Math.round(e)))},"W",0,function(){let e=(0,h.r)("session",t);if(null===e)return null;(0,h.p)("session",t);let a=Number(e);return Number.isFinite(a)?a:null}])},638755,e=>{var h=e.i(370849),t=e.i(123424),a=e.i(574622),r=e.i(214950),n=e.i(503859);function o(e,h=r.f.page){return(0,a.T)((h,t)=>(0,n.X)(e,h,t),h)}let i={panel:0,panelRule:2,raised:1,raisedRule:2,field:1,chip:1,rail:0,railRule:2,scrim:0},v={l:.84,c:.11,h:190},m={gold:h.V[3],ice:(0,t.L)((0,t.t)(v))};var s=e.i(956174);let l=([e,h,t])=>`rgb(${Math.round(e)} ${Math.round(h)} ${Math.round(t)})`,c=[{l:.3,c:.06},{l:.49,c:.1},{l:.7,c:.13},{l:.86,c:.12}];function z(e){return{key:(0,s.M)(e),floor:l(o(e)[0]),accent:l(function(e){if(e.flat)return(0,t.t)(v);let h=Math.max(...Object.values(function(e,h=r.f.page){let t=o(e,h),a={};for(let e of Object.keys(i))a[e]=t[i[e]];return a}(e)).map(e=>(0,t.E)(function([e,h,t]){return[127.5+.5*e,127.5+.5*h,127.5+.5*t]}(e))));return(0,t.Q)(e.accent,e=>(0,t.E)(e)>=h)}(e)),mood:e.accentIsWarm?m.ice:m.gold,glowRamp:c.map(h=>(([e,h,t])=>`#${[e,h,t].map(e=>Math.round(e).toString(16).padStart(2,"0")).join("")}`)((0,t.P)({l:h.l,c:h.c*(e.flat?.5:1),h:e.bloomA}))),palette:o(e).map(([e,h,t])=>`${e} ${h} ${t}`),hues:e}}e.s(["S",0,z,"_",0,function(e){let h=(0,s._)(e);return h?z(h):null}],638755)},123424,e=>{let h=e=>{let h=e/255;return h<=.04045?h/12.92:Math.pow((h+.055)/1.055,2.4)},t=e=>{let h=Math.max(0,Math.min(1,e));return(h<=.0031308?12.92*h:1.055*Math.pow(h,1/2.4)-.055)*255};function a(e,t,a){let r=h(e),n=h(t),o=h(a),i=Math.cbrt(.4122214708*r+.5363325363*n+.0514459929*o),v=Math.cbrt(.2119034982*r+.6806995451*n+.1073969566*o),m=Math.cbrt(.0883024619*r+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*v-.0040720468*m,1.9779984951*i-2.428592205*v+.4505937099*m,.0259040371*i+.7827717662*v-.808675766*m]}function r([e,h,t]){let a=e+.3963377774*h+.2158037573*t,n=e-.1055613458*h-.0638541728*t,o=e-.0894841775*h-1.291485548*t,i=a*a*a,v=n*n*n,m=o*o*o;return[4.0767416621*i-3.3077115913*v+.2309699292*m,-1.2684380046*i+2.6097574011*v-.3413193965*m,-.0041960863*i-.7034186147*v+1.707614701*m]}function n(e){let[h,a,n]=r(e);return[t(h),t(a),t(n)]}function o({l:e,c:h,h:t}){let a=t*Math.PI/180;return[e,Math.cos(a)*h,Math.sin(a)*h]}function i(e){return n(o(e))}function v(e){let[h,t,a]=i(e);return[Math.round(h),Math.round(t),Math.round(a)]}function m(e,h){let t=0,a=.5;for(let n=0;n<24;n++){let n=(t+a)/2;r(o({l:e,c:n,h})).every(e=>e>=0&&e<=1)?t=n:a=n}return t}e.s(["L",0,function([e,h,t]){return`#${[e,h,t].map(e=>e.toString(16).padStart(2,"0")).join("")}`},"O",0,function(e,h){let t=Math.abs(e-h)%360;return t>180?360-t:t},"M",0,n,"E",0,function([e,t,a]){return .2126*h(e)+.7152*h(t)+.0722*h(a)},"N",0,o,"P",0,i,"t",0,v,"s",0,a,"T",0,function(e,h,t){return function([e,h,t]){return{l:e,c:Math.hypot(h,t),h:(180*Math.atan2(t,h)/Math.PI%360+360)%360}}(a(e,h,t))},"Q",0,function(e,h){let t=h=>v({l:h,c:m(h,e),h:e}),a=0,r=1;for(let h=0;h<24;h++){let h=a+(r-a)/3,t=r-(r-a)/3;m(h,e)<m(t,e)?a=h:r=t}let n=(a+r)/2;if(h(t(n)))return t(n);let o=n,i=1;for(let e=0;e<24;e++){let e=(o+i)/2;h(t(e))?i=e:o=e}return t(i)},"w",0,function(e){return(e%360+360)%360}])},574622,390763,413194,956174,e=>{var h=e.i(123424),t=e.i(428607);function a(e){return e>=30&&e<=130}function r(e,t){return(0,h.M)(function(e,t){let a=e[0],r=e[e.length-1];if(t<=a.at)return(0,h.N)(a.color);if(t>=r.at)return(0,h.N)(r.color);for(let a=1;a<e.length;a++){let r=e[a];if(t<=r.at){let n=e[a-1],o=(t-n.at)/(r.at-n.at||1),i=(0,h.N)(n.color),v=(0,h.N)(r.color);return[i[0]+(v[0]-i[0])*o,i[1]+(v[1]-i[1])*o,i[2]+(v[2]-i[2])*o]}}return(0,h.N)(r.color)}(e.stops,t))}e.s(["K",0,function(e,t){let r=(0,h.T)(e[0],e[1],e[2]),n=(0,h.T)(t[0],t[1],t[2]).h,o=(0,h.O)(n,r.h);return function(e,t,r){if(e.meanChroma<.035)return{ground:e.hue,groundChroma:.035,bloomA:e.hue,bloomB:t??190,accent:190,accentIsWarm:!1,flat:!0};let n=r??(0,h.w)(e.hue+180);return{ground:e.hue,groundChroma:.05,bloomA:e.hue,bloomB:t??(0,h.w)(e.hue-60),accent:n,accentIsWarm:a(n),flat:!1}}({hue:r.h,meanChroma:r.c},o>=20?n:null,o>=90?n:null)},"m",0,a],390763);var n=e.i(214950);let o={a:.62,b:.58};function i(e,t){let a=(0,h.T)(e[0],e[1],e[2]),[r,n,o]=(0,h.P)({...a,l:a.l+t});return[Math.round(r),Math.round(n),Math.round(o)]}function v(e,t=n.f.page){let a=e.stops[0].color,m=[{role:"floor",rgb:i(r(e,1),-.0011)},{role:"mid",rgb:i(r(e,.46),.0055)},{role:"top",rgb:i(r(e,0),.011)}],s=e.glows[e.glows.length-1],l=e.glows[e.glows.length-2],c=(e,r,n)=>{let i=t.tints[r][n],v=.5*Math.max(0,e.color.l-o[r]),[m,s,l]=(0,h.P)({l:a.l+i.dl+v,c:a.c*i.dc,h:e.color.h});return[Math.round(m),Math.round(s),Math.round(l)]};return s&&(m.push({role:"bloomA-half",rgb:c(s,"a",0)}),m.push({role:"bloomA",rgb:c(s,"a",1)})),l&&(m.push({role:"bloomB-half",rgb:c(l,"b",0)}),m.push({role:"bloomB",rgb:c(l,"b",1)})),m}let m=[[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],[12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],[3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],[15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]];function s(e){let t=e.map(([e,t,a])=>(0,h.s)(e,t,a));return(e,a,r)=>{let[n,o,i]=(0,h.s)(e,a,r),v=0,m=1/0;for(let e=0;e<t.length;e++){let h=t[e],a=(n-h[0])**2+(o-h[1])**2+(i-h[2])**2;a<m&&(m=a,v=e)}return v}}e.s(["j",0,function(e,h){return m[7&h][7&e]},"L",0,s],413194);e.s(["n",0,class{width;height;palette;block;blockOrigin;form;stack;nearest;rowCount;ramp;stand;glowRgb;constructor(e,r,o=r.frame.height,i=!1){this.form=r,this.stand=i?n.f.alone:n.f.page,this.stack=e(r,this.stand),this.palette=function(e,t=n.f.page){let r=v(e,t).map(e=>e.rgb),o=a(e.glows[e.glows.length-2]?.color.h??0/0)?[...r.slice(0,5),r[3],r[4]]:r,i=[o[0],...[[0,1,3],[1,2,3],[2,3,2],[3,4,2],[2,5,2],[5,6,2]].filter(([e,h])=>o[e]&&o[h]).flatMap(([e,t,a])=>Array.from({length:a},(r,n)=>{var i,v,m;let s,l,c;return i=o[e],v=o[t],m=(n+1)/a,s=(0,h.s)(i[0],i[1],i[2]),l=(0,h.s)(v[0],v[1],v[2]),[Math.round((c=(0,h.M)([s[0]+(l[0]-s[0])*m,s[1]+(l[1]-s[1])*m,s[2]+(l[2]-s[2])*m]))[0]),Math.round(c[1]),Math.round(c[2])]}))];return i.filter((e,h)=>i.findIndex(h=>h[0]===e[0]&&h[1]===e[1]&&h[2]===e[2])===h)}(e(t.H.desktop,this.stand),this.stand),this.nearest=s(this.palette),this.block=r.block,this.blockOrigin=r.blockOrigin;let{width:m,height:l}=(0,t.g)(r);this.width=m,this.height=l,this.ramp=Math.max(r.frame.height,o),this.rowCount=Math.ceil(Math.max(l,Math.ceil(this.ramp/4))/this.block),this.glowRgb=new Float64Array(3*this.stack.glows.length),this.stack.glows.forEach((e,t)=>this.glowRgb.set((0,h.P)(e.color),3*t))}get glowReach(){let{frame:e}=this.form;return this.stack.glows.map(h=>h.cy*e.height+h.ry*h.fade)}get cover(){return{x0:0,y0:0,width:this.width,height:this.height}}write(e,h=null,t=this.cover){let{frame:a,cover:n}=this.form,o=this.stack.glows,i=o.length,v=new Float64Array(6*i);for(let e=0;e<i;e++){let t=o[e],r=h?.[e];v[6*e]=t.cx*a.width+(r?.dx??0),v[6*e+1]=t.cy*a.height+(r?.dy??0),v[6*e+2]=t.rx,v[6*e+3]=t.ry,v[6*e+4]=t.fade,v[6*e+5]=t.alpha*this.stand.glow*(r?.k??1)}let m=this.glowRgb,s=(n.width-a.width)/2,l=this.block,c=this.blockOrigin,z=4*l,u=.5*a.width,d=-.08*a.height,f=1700*this.form.bloomScaleX,p=this.stand.reach*this.ramp,g=Math.floor((t.x0-c)/l),w=Math.floor((t.x0+t.width-1-c)/l),b=Math.floor(t.y0/l),M=Math.floor((t.y0+t.height-1)/l),y=Math.floor(-c/l),$=Math.floor((this.width-1-c)/l);for(let h=b;h<=M;h++){let a=Math.max(0,h),n=(a+.5)*z,o=a>=this.rowCount;for(let a=g;a<=w;a++){let g=0;if(!o){let e=(a+.5)*z+4*c-s,h=((Math.min($,Math.max(y,a))+.5)*z+4*c-s-u)/f,t=(n-d)/p,o=r(this.stack,Math.min(1,Math.sqrt(h*h+t*t))),l=o[0],w=o[1],b=o[2];for(let h=0;h<i;h++){let t=6*h,a=(e-v[t])/v[t+2],r=(n-v[t+1])/v[t+3],o=Math.sqrt(a*a+r*r),i=v[t+4],s=o>=i?0:v[t+5]*(1-o/i);s>0&&(l=m[3*h]*s+l*(1-s),w=m[3*h+1]*s+w*(1-s),b=m[3*h+2]*s+b*(1-s))}g=this.nearest(l,w,b)}let w=Math.max(t.x0,a*l+c),b=Math.min(t.x0+t.width,(a+1)*l+c),M=Math.max(t.y0,h*l),x=Math.min(t.y0+t.height,(h+1)*l);for(let h=M;h<x;h++){let a=(h-t.y0)*t.width-t.x0;e.fill(g,a+w,a+b)}}}}},"Y",0,function(e,h,t){let a=(h-e.cover.width)/2,r=Math.floor(-a/4);return{window:{x0:r,y0:0,width:Math.max(1,Math.ceil((h-a)/4)-r),height:Math.max(1,Math.ceil(t/4))},coverLeft:a}},"T",0,function(e,h=n.f.page){return v(e(t.H.desktop,h),h).map(e=>e.rgb)}],574622);let l=/^v\d{1,3}-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})-([01])$/,c=e=>Math.round((0,h.w)(e))%360;e.s(["M",0,function(e,h="v7"){return`${h}-${c(e.ground)}-${c(e.bloomA)}-${c(e.bloomB)}-${c(e.accent)}-${+!!e.flat}`},"_",0,function(e){let h=l.exec(e);if(!h)return null;let[t,r,n,o]=[h[1],h[2],h[3],h[4]].map(Number);if([t,r,n,o].some(e=>e>=360))return null;let i="1"===h[5];return{ground:t,groundChroma:i?.035:.05,bloomA:r,bloomB:n,accent:o,accentIsWarm:!i&&a(o),flat:i}}],956174)},503859,214950,e=>{let h={page:{reach:.45,glow:.58,colour:1,tints:{a:[{dl:.04,dc:1.3},{dl:.08,dc:1.6}],b:[{dl:.025,dc:1.15},{dl:.06,dc:1.4}]}},alone:{reach:1.15,glow:1,colour:1.7,tints:{a:[{dl:.057,dc:1.64},{dl:.109,dc:2.18}],b:[{dl:.032,dc:1.33},{dl:.082,dc:1.82}]}}};e.s(["f",0,h],214950),e.s(["F",0,{ground:272,groundChroma:.05,bloomA:262,bloomB:215,accent:355,accentIsWarm:!1,flat:!1},"X",0,function(e,t,a=h.page){let r=t.bloomScaleX,n=t.bloomScaleY,o=e.flat?e.groundChroma:e.groundChroma*a.colour,i=h=>e.flat?Math.min(h,.07):h,v=e.bloomB>=30&&e.bloomB<=130;return{stops:[{color:{l:.25,c:o,h:e.ground},at:0},{color:{l:.21,c:.84*o,h:e.ground},at:.46},{color:{l:.175,c:.67*o,h:e.ground},at:1}],glows:[{cx:.86,cy:.02,rx:720*r,ry:380*n,color:{l:v?.72:.58,c:i(v?.14:.16),h:e.bloomB},alpha:v?.16:.18,fade:.72},{cx:.14,cy:-.06,rx:820*r,ry:420*n,color:{l:.62,c:i(.19),h:e.bloomA},alpha:.22,fade:.7}]}}],503859)},370849,e=>{e.s(["G",0,"#070708","V",0,["#3a2c14","#7a5a24","#c99b4a","#ffd9a0"]])}])})();