//# allFunctionsCalledOnLoad
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,498332,e=>{var t=e.i(428607),h=e.i(902889),n=e.i(437052),r=e.i(510269);let a=function(e){let r=({width:e,height:t})=>`${e}px ${t}px`,a=h.X.map(e=>`--ground-${e}:url(${(0,h.x)(n.L.key,e)})`).join(";"),[o,...i]=h.A,l=t.H[o];return`#${e}{--ground-floor:${n.L.floor};--ground-accent:${n.L.accent};${a}}[data-curtain-ground]{position:absolute;inset:0;background-color:var(--ground-floor);background-position:50% 0;background-repeat:no-repeat,repeat-x;image-rendering:pixelated}[data-curtain-ground]{background-image:var(--ground-${o}),var(--ground-${h.R});background-size:${r(l.cover)},${r((0,t.O)(l))}}`+i.map(e=>`@media (max-width:${t.H[e].maxWidth}px){${(e=>{let{cover:h}=t.H[e];return`[data-curtain-ground]{background-image:var(--ground-${e});background-size:${r(h)}}`})(e)}}`).join("")}(r.R);function o(e){let t=h.X.map(t=>`--ground-${t}:url(${(0,h.x)(e.key,t)})`).join(";");return`#${r.R}{--ground-floor:${e.floor};--ground-accent:${e.accent};${t}}`}e.s(["W",0,a,"Z",0,function(e){return e?`${a}${o(e)}`:a},"$",0,o])},496149,e=>{var t=e.i(241019),h=e.i(339016),n=e.i(792711),r=e.i(566398),a=e.i(510269),o=e.i(967122);e.i(761096);let i=String.raw`(function () {
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
})();`,l="application/x-spawn-arrival";var v=e.i(15038);let s="data-curtain-arrival",m="data-curtain-arrival-shown",c="data-curtain-arrival-host",u="data-curtain-arrival-ran",d="__spawnCurtainArrivalAsk",z="spawn.curtain.arrival-asked",f="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",p="__spawnCurtainArrival";String.raw`(function () {
  ${(0,o.N)("reach")}
  var curtain = document.getElementById('${a.R}');
  if (!curtain || curtain.hasAttribute('${u}')) return;
  curtain.setAttribute('${u}', '');
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
    var message = { type: '${v.F1}', yaw: look.yaw, pitch: look.pitch };
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
    curtain.setAttribute('${m}', '');
    if (!marked) { marked = true; try { performance.mark('${"spawn.curtain.arrival-shown"}'); } catch (e) {} }
    var look = handle && handle.look();
    if (look) post(look);
  }
  // a lost context took the picture off the screen: the screen's own ground, box, line and bar stand again until it is back
  function hidden() {
    curtain.removeAttribute('${m}');
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
  if (!asked || asked.url !== spec.url) { try { performance.mark('${z}'); } catch (e) {} }
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
        if (handle) { handle.dispose(); handle = null; curtain.removeAttribute('${m}'); }
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
    if (!d || d.type !== '${v.rr}' || !event.source) return;
    try { event.source.postMessage({ type: '${v.fR}' }, '*'); } catch (e) {}
    if (last) post(last);
  }
  window.addEventListener('message', onAsk);
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${v.JW}' || d.worldHex !== spec.world) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    forget();
  });
  // the frame's kept view stands for the page's life: it is put away whenever it comes, the screen up or gone
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${v.UU}' || d.worldHex !== spec.world || !(d.bytes instanceof Uint8Array || d.bytes instanceof ArrayBuffer)) return;
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
    try { performance.mark('${z}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let g="Spawn Pixel",w=`'${g}', system-ui, sans-serif`,b=(e,t)=>`@font-face{font-family:'${e}';src:url(${a.d}) format('woff2');font-display:${t};unicode-range:U+0100-FFFF}@font-face{font-family:'${e}';src:url(${a.y}) format('woff2');font-display:${t};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${e}';src:url(${a.k}) format('woff2');font-display:${t};unicode-range:U+0020-007E,U+00A0,U+2026}`;b(a.b,"swap"),h._,a.b;let M="data-curtain-dissolve",y="rgba(255,255,255,0.08)",$=e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x=t.L,k=`calc(${x} * 0.1)`,A=`rgba(255,255,255,${t.q})`,R='<span data-curtain-dot style="word-spacing:.57em"> </span>',E=`#${a.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${A},${A}) 50% 56%/.12em .12em no-repeat}`,_=e=>`radial-gradient(circle at ${t.G}px ${t.G}px,var(--ground-accent,#fff) ${t.G}px,transparent 0) 0 0/${e}px ${e}px`,L=`#${a.R} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:rgba(255,255,255,${t.a})}#${a.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${a.R} [data-curtain-bar]>i[data-b="dense"]{background:${_(t.U)};animation:spawn-curtain-head ${t.O}ms ease-in-out infinite}#${a.R} [data-curtain-bar]>i[data-b="sparse"]{background:${_(t.$)};animation:spawn-curtain-head ${t.O}ms ease-in-out ${t.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${t.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${a.R} [data-curtain-bar]>i{animation:none}}`;function U(e){let h=e/t.D;return h<=.05?0:h>=.97?null:-1666*Math.log((.97-h)/(.97-.05))}let S=`#${a.R}[data-born]:not([${M}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,I=`[${a._}][${a.p}]{visibility:hidden}`,T=(e,t)=>{let h=`round(nearest,${t},1px)`;return"x"===e?`translate:${t} 0;translate:${h} 0`:`translate:0 ${t};translate:0 ${h}`},P=`#${a.R} [data-curtain-stage]>*{${T("x","calc((100cqw - 100%) / 2)")}}`,C=`html[${a.N}] #${a.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${t.v};margin-top:${t.u}px;translate:-50% 0!important;text-wrap:balance}`;e.s(["N",0,M,"J",0,g,"X",0,function(e){let h=`rgba(255,255,255,${t.a})`,n=[_(t.$),_(t.U),"var(--ground-accent,#fff)"],r=U(t.D-1)??1666,a=`${e} [data-curtain-bar]{display:flex;gap:${t.w}px}${e} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:${h}}`;for(let o=0;o<t.D;o+=1){let t=[U(o-1),U(o),U(o+1)].flatMap((e,t)=>o+t-1<0||null===e?[]:[`${(e/r*100).toFixed(2)}%{background:${n[t]}}`]);a+=`@keyframes spawn-den-bar-${o}{0%{background:${h}}${t.join("")}}${e} [data-curtain-bar]>i:nth-child(${o+1}){animation:spawn-den-bar-${o} ${Math.round(r)}ms steps(1,end) forwards}`}return a},"F",0,function(e){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${t.u}px">${e}<div data-curtain-bar>${"<i></i>".repeat(t.D)}</div></div>`},"u",0,function(e){return`${e} [data-wisp-loop]{margin-bottom:${t.C-t.u}px}`},"A",0,function(e,h="",o="",i=null,l=null){var v;let u=e.face?i:null,d=e.face?null:l,z=e.groundArt?` data-curtain-ground-art="${$(e.groundArt)}"`:"",f=e.ground?` data-curtain-ground-paint="${$(JSON.stringify(e.ground))}"`:"",A=e.face?` ${M}`:"",_=e.face?null:e.arrival??null,U=function(e,h){let r=(0,n.l)(e),a=(0,t.H)(r,h);if(!r&&!a)return"";let o=r?`<span data-curtain-title style="color:rgba(255,255,255,${t.T})">${$(r)}</span>`:"",i=a?`${r?R:""}<span data-curtain-maker style="color:rgba(255,255,255,${t.q})">${$(a)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${t.v};text-align:center;overflow-wrap:anywhere;font-size:${t.P};line-height:${t.M}">${o}${i}</div>`}(e.title,e.maker),F=e.face?e.face.src:e.thumbnailUrl,j="";if(e.face){let e;e=F?`<img src="${$(F)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${y};user-select:none">`:"",j=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${t.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${y}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${F?"none":"flex"};align-items:flex-end;justify-content:center">${o}</div>`+e+"</div>"}else{let e;F&&(e=$(F),j=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${x};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${k} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${e}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${k} * -1);width:${k};transform:translateZ(calc(${k} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${e}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${a.R} id="${a.R}" aria-hidden="true"${z}${f}${A}${_?` ${s}="${JSON.stringify(_).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${w};transition:${a.S};container-type:size"><style>${b(g,"block")}${d?"":L}${u?.css??""}${U.includes(R)?E:""}${S}${I}${P}${C}${h}${d?.css??""}${_?(v=a.R,`#${v} [${c}]{position:absolute;inset:0;pointer-events:none}#${v}[${m}] [${c}]{pointer-events:auto}#${v}[${m}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(_?`<script>window.${p}&&window.${p}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${r.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${t.u}px;${T("y","calc((100cqh - 100%) / 2)")}">`+j+(d?.room??"")+U+(u?.html??"")+(d?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${t.w}px">${'<i data-b="empty"></i>'.repeat(t.D)}</div>`)+"</div></div>"+(d?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${r.u},0px),env(safe-area-inset-bottom)) - ${t.x}px);text-align:center;font-size:${t.p}px;line-height:${t.z}px;color:rgba(255,255,255,${t.y})"></div>`+`</${a.R}>`}],496149)},510269,241019,e=>{var t=e.i(628856),h=e.i(417695),n=e.i(711621),r=e.i(69605);(0,r.U)(12);let a=(0,r.m)(12),o="clamp(88px, 14vh, 144px)",i="clamp(14px, 1.9vh, 20px)",l=`min(480px, calc(100vw - 2 * ${a}))`,v=`calc(50dvh - (${o} + ${i} * 1.4 + 138px) / 2 + ${o} + 18px)`;e.s(["D",0,12,"a",0,.12,"w",0,3,"o",0,12,"E",0,9,"L",0,"clamp(132px, 24vh, 260px)","U",0,3,"G",0,1,"K",0,v,"V",0,o,"y",0,.5,"x",0,18,"z",0,16,"p",0,12,"u",0,18,"A",0,.35,"O",0,1600,"W",0,200,"M",0,1.4,"q",0,.5,"v",0,l,"P",0,i,"T",0,.85,"_",0,a,"$",0,4,"C",0,2,"Q",0,8,"j",0,3,"X",0,6,"Y",0,"Still trying to connect\u2026","H",0,function(e,t){let h=t?.replace(/^@+/,"").toLowerCase();return!t||(0,n.f)(h)||h&&e?.toLowerCase().includes(h)?null:t},"h",0,function(e,t){return t?"visiting your den":`visiting ${e}`}],241019);let s="spawn:kernel:boot-terminal",m=[t.P.gpuApiMissing,t.P.gpuUnavailable,t.P.gpuCoreUnsupported];e.s(["v",0,"fixed inset-0 flex justify-center overflow-y-auto bg-background py-10 [align-items:safe_center] phone:!pl-gutter","Q",0,"Before you play","P",0,s,"z",0,{above:!0},"m",0,"spawn:kernel:boot-word","N",0,"data-chat-column","C",0,"data-curtain-boots","R",0,"spawn-curtain","p",0,"data-curtain-over","k",0,"/signal/fonts/geist-pixel/GeistPixel-Square-ascii.woff2","d",0,"/signal/fonts/geist-pixel/GeistPixel-Square.woff2","y",0,"/signal/fonts/geist-pixel/GeistPixel-Square-latin-rest.woff2","V",0,"spawn-loading-curtain","W",0,"spawn:kernel:liveness-port:held","A",0,"__spawnKernelLivenessPort","b",0,"Spawn Pixel Page","_",0,"data-rail-caption","S",0,"opacity 500ms cubic-bezier(0, 0, 0.2, 1), filter 500ms cubic-bezier(0, 0, 0.2, 1)","O",0,function(){window.dispatchEvent(new CustomEvent(s))},"q",0,function(e){if("object"!=typeof e||null===e)return!1;let{phase:t,verdict:h}=e;if("error"!==t||"object"!=typeof h||null===h)return!1;let{code:n,retriable:r}=h;return!1===r&&"string"==typeof n&&m.includes(n)},"f",0,function(e,t){try{(t??(0,h.n)("session")).setItem("spawn-born-arrival",new URL(e,window.location.href).pathname)}catch{}},"B",0,function(e,t,n=Date.now(),r){try{(r??(0,h.n)("session")).setItem("spawn-curtain-handoff",JSON.stringify({path:new URL(e,window.location.href).pathname,html:t,at:n}))}catch{}}],510269)},806108,e=>{e.s(["f",0,"AAAAeAAeAA_AA_AAeAAeAAAAAAAB_gB_gH_4H_4H_4H_4H_4H_4H_4"])},438248,e=>{var t=e.i(843476),h=e.i(271645),n=e.i(466006),r=e.i(556360);let a=new Map;function o(e,t="filled"){let h=`${e}\0${t}`,i=a.get(h);return void 0===i&&(i=(0,n.c)((0,r.a)(e,t)),a.set(h,i)),i}let i=(0,h.memo)(function({glyph:e,variant:h="filled",...r}){return(0,t.jsx)(n.Y,{d:o(e,h),grid:18,...r})});e.s(["Y",0,i,"h",0,o])},589262,160787,e=>{var t=e.i(344364);let h="/api/agent/v1/pfp/";function n(e){try{let t=new URL(e,"https://spawn.co");return t.pathname.startsWith(h)?`${t.pathname}${t.search}`:null}catch{return null}}e.s(["l",0,h,"F",0,"/faces/default-person.svg"],160787),e.s(["f",0,n,"C",0,function(e,h=128){let r,a=e.startsWith("//")?`https:${e}`:e,o=n(a);return o?o:function(e){try{let{pathname:t}=new URL(e),h=t.toLowerCase();return h.endsWith(".svg")||h.endsWith("/svg")}catch{return!1}}(a)?null:(r=a.toLowerCase()).includes(".svg")||r.includes("dicebear")?(0,t.L)(a):(0,t.a)(a,h)}],589262)},404296,e=>{var t=e.i(325738),h=e.i(165810),n=e.i(892437),r=e.i(816685),a=e.i(770865);let o=null;function i(e){return(0,n.j)()?.worldId===e&&((0,t.j)("den_to_standing"),!0)}function l(){o?.(),o=null}e.s(["o",0,function(e,n){(0,t.Q)("den_to_standing",{atEpochMs:n.pressAtEpochMs??(0,h.Q)(n.arrivedAtPageMs),world:e,reason:"make-page"})},"x",0,function(e){if(l(),i(e))return;let h=(0,n.j)()?.worldId??null,a=()=>{i(e)&&l()};window.addEventListener(n.w,a);let v=(0,r.Y)({onWorldCrossed:n=>{n.worldId!==e&&(l(),(0,t.j)("den_to_standing",n.worldId===h?{ended:"failed",reason:"refused"}:{ended:"left",reason:"crossed"}))}});o=()=>{window.removeEventListener(n.w,a),v()}},"H",0,function(){return"u"<typeof performance?{pressAtEpochMs:null,arrivedAtPageMs:0}:{pressAtEpochMs:(0,a.W)(),arrivedAtPageMs:!function(){let e="function"==typeof performance.getEntriesByType?performance.getEntriesByType("navigation")[0]:void 0;if(void 0===e)return!1;try{return new URL(e.name,window.location.href).pathname===a.b}catch{return!1}}()?performance.now():0}},"z",0,l])},712451,455559,e=>{var t=e.i(438248),h=e.i(806108);let n=`<svg viewBox="0 0 18 18" width="82%" height="82%" shape-rendering="crispEdges" fill="rgba(255,255,255,0.5)" aria-hidden="true"><path d="${(0,t.h)(h.f)}"/></svg>`;var r=e.i(498332),a=e.i(496149),o=e.i(510269),i=e.i(241019);let l={cols:7,rows:12,tickMs:90,frames:[["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm0 1h1v1h-1z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 2h1v1h-1zm-1 1h1v1h-1zm4 0h1v1h-1zm-4 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2z","M3 7h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm0 1h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-1 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 2h1v1h-1zm-2 6h1v1h-1zm4 0h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm1 1h1v1h-1zm-4 1h1v1h-1z","M3 3h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm0 1h2v1h-2zm-3 1h1v1h-1zm0 1h1v1h-1zm0 1h1v1h-1z","M4 3h1v1h-1zm-4 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2z","M3 4h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 3h1v1h-1zm-2 2h2v1h-2zm3 0h2v1h-2zm1 3h2v1h-2z","M4 3h1v1h-1zm-3 3h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 4h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 3h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1zm0 1h1v1h-1z","M6 7h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 4h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h3v1h-3zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm0 2h1v1h-1zm4 0h1v1h-1z","","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm1 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm0 1h1v1h-1z","M5 6h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 2h1v1h-1zm0 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm-1 2h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h2v1h-2zm0 1h1v1h-1z","M2 1h1v1h-1zm-1 5h1v1h-1zm4 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 8h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 6h1v1h-1zm-1 1h2v1h-2zm2 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 3h2v1h-2zm-1 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1zm-1 1h2v1h-2zm5 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 1h2v1h-2zm1 1h1v1h-1zm0 3h1v1h-1z","M3 0h1v1h-1zm2 2h1v1h-1z","M1 9h1v1h-1zm2 0h1v1h-1z"],["M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h3v1h-3z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h4v1h-4zm1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 3h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 2h2v1h-2zm-1 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 3h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1zm1 1h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm1 1h1v1h-1zm-5 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3z","M2 6h2v1h-2zm-1 1h4v1h-4zm2 1h2v1h-2zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1z","M2 4h2v1h-2zm0 1h3v1h-3zm-1 1h1v1h-1zm3 0h1v1h-1zm-2 2h1v1h-1zm-1 2h1v1h-1zm4 0h1v1h-1z","M2 2h3v1h-3zm1 1h1v1h-1zm-2 5h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M2 1h1v1h-1zm0 2h1v1h-1zm2 0h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 9h2v1h-2zm1 1h1v1h-1zm-1 1h3v1h-3z","M3 7h2v1h-2zm0 1h2v1h-2zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M4 4h1v1h-1zm-2 1h2v1h-2zm-1 1h4v1h-4zm1 1h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm3 0h1v1h-1zm1 3h1v1h-1zm0 1h1v1h-1z","M4 1h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M3 3h3v1h-3zm-1 1h1v1h-1zm-2 1h2v1h-2zm4 0h1v1h-1zm-3 2h1v1h-1zm4 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M1 2h1v1h-1zm2 0h1v1h-1zm-1 1h1v1h-1zm-1 1h1v1h-1zm5 5h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3z","M3 7h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1z","M3 5h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h2v1h-2zm1 2h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm0 1h2v1h-2zm0 1h1v1h-1zm-1 2h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm-4 1h1v1h-1z","M3 2h1v1h-1zm2 0h1v1h-1zm-4 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M2 10h2v1h-2zm1 1h1v1h-1z","M3 7h1v1h-1zm0 1h3v1h-3zm-2 1h4v1h-4zm3 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","M3 4h3v1h-3zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm3 0h1v1h-1zm-5 3h1v1h-1z","M1 8h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h2v1h-2zm-3 1h2v1h-2zm3 0h2v1h-2zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 4h2v1h-2zm-1 1h2v1h-2zm0 1h2v1h-2zm3 0h1v1h-1zm2 2h1v1h-1zm-5 1h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm2 2h1v1h-1z","M2 8h1v1h-1zm2 0h1v1h-1z"],["M3 9h1v1h-1zm0 1h1v1h-1zm0 1h2v1h-2z","M3 7h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h3v1h-3zm-1 1h2v1h-2zm3 0h2v1h-2zm-3 1h1v1h-1zm3 0h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M2 3h2v1h-2zm1 1h2v1h-2zm-1 1h1v1h-1zm3 1h1v1h-1zm-4 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 1h1v1h-1zm-1 1h1v1h-1zm2 2h1v1h-1zm-1 1h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 7h1v1h-1zm-1 1h2v1h-2zm1 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm0 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M1 5h1v1h-1zm3 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M2 6h3v1h-3zm0 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h2v1h-2zm-2 1h1v1h-1zm2 0h3v1h-3zm-2 1h1v1h-1zm3 1h1v1h-1zm-3 2h1v1h-1zm4 0h1v1h-1z","M5 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h3v1h-3zm-1 1h2v1h-2zm3 1h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm0 1h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 3h1v1h-1zm1 5h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M2 10h1v1h-1zm1 1h1v1h-1z","M3 8h2v1h-2zm0 1h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h2v1h-2z","M3 4h2v1h-2zm-1 1h2v1h-2zm0 1h1v1h-1zm3 0h1v1h-1zm-4 1h2v1h-2zm3 0h1v1h-1zm-3 3h1v1h-1zm4 0h1v1h-1z","M4 5h1v1h-1zm-3 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h2v1h-2zm-1 1h4v1h-4zm2 1h1v1h-1zm-3 1h1v1h-1z","M2 4h1v1h-1zm1 1h2v1h-2zm-1 2h1v1h-1zm3 3h1v1h-1z","M1 4h1v1h-1zm2 0h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 6h2v1h-2zm1 1h1v1h-1zm-2 1h4v1h-4zm0 1h1v1h-1zm3 0h1v1h-1zm-3 1h1v1h-1z","M3 5h2v1h-2zm-1 2h1v1h-1zm2 0h1v1h-1zm1 3h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1zm1 1h1v1h-1z","M3 4h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm-1 1h2v1h-2zm3 0h1v1h-1zm1 2h1v1h-1zm-4 1h1v1h-1z","M5 6h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm-1 4h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M2 9h2v1h-2zm0 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h2v1h-2zm0 1h1v1h-1zm-1 1h3v1h-3zm2 1h2v1h-2zm1 1h1v1h-1z","M3 5h1v1h-1zm-1 1h1v1h-1zm0 1h1v1h-1zm2 0h1v1h-1zm-3 3h1v1h-1z","M3 4h1v1h-1zm-1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h3v1h-3zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M2 5h2v1h-2zm3 0h1v1h-1zm-3 2h1v1h-1zm3 1h2v1h-2zm0 1h1v1h-1zm-4 1h1v1h-1zm4 0h1v1h-1z","","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm-2 2h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 8h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1z","M3 5h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z","M2 10h1v1h-1zm2 0h1v1h-1z"],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm1 1h2v1h-2zm-2 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1z",""],["M3 11h1v1h-1z","M3 9h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1z","M4 6h1v1h-1zm-1 1h2v1h-2zm-1 1h3v1h-3zm0 1h1v1h-1z","M3 5h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm-1 3h1v1h-1zm4 0h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1z",""],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm-1 1h2v1h-2zm0 1h1v1h-1zm2 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1z","M2 5h3v1h-3zm0 1h1v1h-1zm2 1h1v1h-1zm-3 1h1v1h-1zm0 1h1v1h-1zm4 0h1v1h-1zm0 1h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-2 1h2v1h-2zm3 0h2v1h-2zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 6h1v1h-1zm0 1h2v1h-2zm-1 1h1v1h-1zm2 0h1v1h-1zm-3 1h2v1h-2zm3 0h1v1h-1z","M3 5h1v1h-1zm-2 1h2v1h-2zm3 0h1v1h-1zm-2 1h1v1h-1zm3 2h1v1h-1z","M3 4h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"],["M3 10h1v1h-1zm0 1h1v1h-1z","M3 8h1v1h-1zm0 1h1v1h-1zm-1 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1z","M3 5h1v1h-1zm0 1h1v1h-1zm-1 1h3v1h-3zm0 1h1v1h-1zm2 0h1v1h-1zm-2 1h1v1h-1zm2 0h2v1h-2zm-3 1h1v1h-1z","M3 4h1v1h-1zm1 1h1v1h-1zm-2 1h1v1h-1zm2 0h1v1h-1zm-3 1h1v1h-1zm4 0h1v1h-1zm-5 1h2v1h-2zm1 1h1v1h-1zm4 1h1v1h-1z","M2 5h1v1h-1zm3 1h1v1h-1zm0 2h1v1h-1z","M2 9h1v1h-1zm2 0h1v1h-1z"]]},v=["core","bright","base","deep","fringe","eye"],s=["rgb(255,238,215)","rgb(255,208,141)","rgb(255,179,71)","rgb(179,122,8)","rgba(255,174,12,0.26)"],{cols:m,rows:c,tickMs:u}=l,d=l.frames,z=v.slice(0,-1),f=d.length*u,p=e=>`--wisp-${e}`,g=e=>`wisp-f${e}`,w="--wisp-at",b=Array.from({length:i.j},(e,t)=>Math.round(t*d.length/i.j)),M=/^rgba?\([\d., ]+\)$/,y=e=>e.length===z.length&&e.every(e=>M.test(e)),$=e=>z.map((t,h)=>`${p(t)}:${e[h]}`).join(";"),x=v.map(e=>"eye"===e?'fill="#070708"':`style="fill:var(${p(e)})"`),k='<svg width="0" height="0" style="position:absolute"><defs>'+d.map((e,t)=>`<g id="${g(t)}">`+e.map((e,t)=>e?`<path ${x[t]} d="${e}"/>`:"").join("")+"</g>").join("")+"</defs></svg>",A=d.map((e,t)=>{let h=0===t?"":` style="animation-delay:calc(var(${w}) - ${f-t*u}ms)"`;return`<svg viewBox="0 0 ${m} ${c}"${h}><use href="#${g(t)}"/></svg>`}).join("");function R(e=[]){let t=e.filter(y).slice(0,i.j),h=t.length>0?t.map(e=>`<i style="${$(e)}">${A}</i>`).join(""):`<i>${A}</i>`;return`<div data-wisp-loop aria-hidden="true">${k}${h}</div>`}let E=R();function _(e,t){let h=`${e} [data-wisp-loop]`,n=b.map((e,t)=>0===e?"":`${h}>i:nth-of-type(${t+1}){${w}:-${e*u}ms}`).join("");return`${h}{flex:none;position:relative;display:flex;height:${11*t}px;${$(s)}}${h}>i{flex:none;position:relative;width:${m*t}px;${w}:0ms}${h}>i+i{margin-left:${(i.X-m)*t}px}${h}>i>svg{position:absolute;left:0;bottom:0;display:block;width:${m*t}px;height:${c*t}px;opacity:0;shape-rendering:crispEdges;animation:spawn-wisp-frame ${f}ms step-end infinite;animation-delay:var(${w})}`+n+`@keyframes spawn-wisp-frame{from{opacity:1}${100/d.length}%{opacity:0}}`+`@media (prefers-reduced-motion:reduce){${h}{height:${8*t}px}${h}>i>svg{animation:none}${h}>i>svg:first-child{opacity:1}}`}e.s(["_",0,E,"e",0,_,"K",0,R],455559);let L=`#${o.R}`,U=_(L,i.Q)+(0,a.u)(L);function S(e){return{css:U,html:R(e??[])}}S();var I=e.i(589262),T=e.i(638755),P=e.i(789110);let C=(0,a.X)(`#${o.R}`),F=["solid","dense","sparse"];e.s(["x",0,function({avatarUrl:e,groundKey:t,wisps:h=null}){var o;let l,v=(l=(o={byline:"",own:!0,avatarUrl:e,groundArt:null,groundKey:t,wisps:h}).groundKey?(0,T._)(o.groundKey):null,{title:(0,i.h)(o.byline,o.own),thumbnailUrl:null,groundArt:o.groundArt,ground:l?{key:l.key,floor:l.floor,accent:l.accent,palette:l.palette}:null,maker:null,wisps:o.wisps??null,face:{src:o.avatarUrl&&o.avatarUrl!==P.V?(0,I.C)(o.avatarUrl,288):null}});return(0,a.A)(v,(0,r.Z)(v.ground),n,S(h))},"y",0,function(e,t){let h;return"document"===t?(h=0,e.replace(/<i data-b="empty">/g,()=>`<i data-b="${F[h++]??"empty"}">`)):`${e}<style>${C}</style>`}],712451)},638755,e=>{var t=e.i(370849),h=e.i(123424),n=e.i(574622),r=e.i(214950),a=e.i(503859);function o(e,t=r.f.page){return(0,n.T)((t,h)=>(0,a.X)(e,t,h),t)}let i={panel:0,panelRule:2,raised:1,raisedRule:2,field:1,chip:1,rail:0,railRule:2,scrim:0},l={l:.84,c:.11,h:190},v={gold:t.V[3],ice:(0,h.L)((0,h.t)(l))};var s=e.i(956174);let m=([e,t,h])=>`rgb(${Math.round(e)} ${Math.round(t)} ${Math.round(h)})`,c=[{l:.3,c:.06},{l:.49,c:.1},{l:.7,c:.13},{l:.86,c:.12}];function u(e){return{key:(0,s.M)(e),floor:m(o(e)[0]),accent:m(function(e){if(e.flat)return(0,h.t)(l);let t=Math.max(...Object.values(function(e,t=r.f.page){let h=o(e,t),n={};for(let e of Object.keys(i))n[e]=h[i[e]];return n}(e)).map(e=>(0,h.E)(function([e,t,h]){return[127.5+.5*e,127.5+.5*t,127.5+.5*h]}(e))));return(0,h.Q)(e.accent,e=>(0,h.E)(e)>=t)}(e)),mood:e.accentIsWarm?v.ice:v.gold,glowRamp:c.map(t=>(([e,t,h])=>`#${[e,t,h].map(e=>Math.round(e).toString(16).padStart(2,"0")).join("")}`)((0,h.P)({l:t.l,c:t.c*(e.flat?.5:1),h:e.bloomA}))),palette:o(e).map(([e,t,h])=>`${e} ${t} ${h}`),hues:e}}e.s(["S",0,u,"_",0,function(e){let t=(0,s._)(e);return t?u(t):null}],638755)},816685,270782,e=>{e.i(792365);var t=e.i(817593),h=e.i(526759),n=e.i(878063),r=e.i(15038),a=e.i(932365),o=e.i(98138),i=e.i(514093),l=e.i(892437),v=e.i(635173);let s="spawn:kernel:world-crossed",m="__spawnLastKernelWorldCrossed",c="__spawnLastKernelWorldCrossedFrame",u="__spawnLastKernelArrivalStanding",d="__spawnLastKernelArrivalStandingFrame";e.s(["X",0,d,"b",0,u,"G",0,c,"Z",0,m,"T",0,s],270782);var z=e.i(315616),f=e.i(221813);let p=e=>"object"==typeof e&&null!==e;function g(e){if(!p(e)||e.type!==s||"string"!=typeof e.worldId||0===e.worldId.length)return null;let t="string"==typeof e.link&&e.link.length>0?e.link:void 0,h="number"==typeof e.epoch&&Number.isInteger(e.epoch)&&e.epoch>=0?e.epoch:void 0;return{type:s,worldId:e.worldId,...void 0!==t?{link:t}:{},...void 0!==h?{epoch:h}:{},...!0===e.arrivalStanding?{arrivalStanding:!0}:{}}}function w(){let e=document.querySelector(i.K);return e?.contentWindow??null}let b=new Map,M=0;function y(e){return"number"==typeof e&&Number.isFinite(e)&&e>=0?e:void 0}function $(){return"u"<typeof performance?0:performance.now()}function x(){let e=window,t=e[c];if(null==t||t!==w())return null;let h=e[m];if(!p(h)||"number"!=typeof h.seq)return null;let n=g({...h,type:s});if(null===n)return null;let r=y(h.atMs);return{...n,seq:h.seq,...void 0!==r?{atMs:r}:{}}}function k(){let e=window,t=e[d];if(null==t||t!==w())return null;let h=e[u];if(!p(h)||"string"!=typeof h.worldId||0===h.worldId.length)return null;let n=y(h.atMs);return{worldId:h.worldId,...void 0!==n?{atMs:n}:{}}}let A=!1;function R(e,t){return{worldId:e.worldId,...void 0!==e.link?{link:e.link}:{},...void 0!==e.epoch?{epoch:e.epoch}:{},atMs:t??$(),...!0===e.arrivalStanding?{arrivalStanding:!0}:{}}}let E="spawn:kernel:world-elsewhere";e.s(["a",0,function(e){let t=(0,z.Y)([r.kV],t=>{if(!(0,v.f)(t))return;let h=(0,r.R3)(t.data);if(!h)return;let n=k(),a=n?.worldId===h.worldId?n.atMs:void 0;e({worldId:h.worldId,atMs:a??$()})}),h=k();return null!==h&&void 0!==h.atMs&&e({worldId:h.worldId,atMs:h.atMs}),t},"Y",0,function({onWorldCrossed:e,follower:t}){A||(A=!0,(0,z.Y)([s,r.kV,r.kf,l.h],e=>{if(!(0,v.f)(e))return;let t=g(e.data);if(t)return void(0,o.V)(t.worldId,(0,l.j)()?.worldId??null,!0===t.arrivalStanding,t.epoch??null);if((0,r.R3)(e.data))return void(0,o.v)();let h=(0,r.MA)(e.data);h?(0,o.o)(h.epoch??null):(0,l.c)(e.data)&&(0,o.u)()}));let h=(0,z.Y)([s],h=>{if(!(0,v.f)(h))return;let n=g(h.data);if(n){let h,r;void 0!==t&&null!==(h=x())&&h.seq>(b.get(t)??0)&&b.set(t,h.seq),e(R(n,null!==(r=x())&&r.worldId===n.worldId&&r.epoch===n.epoch?r.atMs:void 0))}}),n=void 0===t?null:function(e){let t=x();if(null===t||t.seq<=(b.get(e)??0))return null;b.set(e,t.seq);let{seq:h,...n}=t;if(console.info(`[world-crossing] the kernel crossed into world ${n.worldId} before the page's ${e} listener stood (the bridge's word ${h}); it follows the crossing now`),h>M){var r;M=h,(0,o.V)(n.worldId,(0,l.j)()?.worldId??null,!0===n.arrivalStanding&&(r=n.worldId,k()?.worldId!==r),n.epoch??null)}return n}(t);return null!==n&&e(R(n,n.atMs)),h},"T",0,function({onElsewhere:e}){return(0,z.Y)([E],r=>{if(!(0,v.f)(r))return;let a=function(e){let r,a;if(!p(e)||e.type!==E)return null;let o="string"==typeof e.address?e.address:null,i=null!==o?(r=(0,n.D)(`/${o}`)).ok&&null===r.value.ref&&null===r.value.room&&null===r.value.place?r.value:null:null;if(null===o||null===i)return null;let l="string"==typeof e.link&&e.link.length>0?e.link:void 0;return{path:(a=void 0!==l?(0,h.v)(l):null,(0,n.A)({...i,ref:(0,t.Y)(l)===t.J?t.J:null,room:a?.ok?(0,h.S)(a.value)??null:null,place:null})),address:o,...void 0!==l?{link:l}:{}}}(r.data);a&&e(a)})},"b",0,function({path:e}){(0,a.p)(()=>(0,f.O)(e,"boundary-click"))},"X",0,g],816685)},789110,e=>{let t="/signal/__local/https%3A%2F%2Fspawnfile.io%2Fgame%2Fassets%2Fneutral-default-avatar-5.glb",h="neutral-default-avatar.glb",n=`/cdn/${h}`;e.s(["a",0,t,"V",0,"/signal/__local/https%3A%2F%2Fspawnfile.io%2Ftrellis-testing%2Fhunyuan-models%2Fneutral-default-pfp.png","b",0,function(e){if(!e)return!1;let r=e.split("#")[0].split("?")[0];return r===t||r===n||r.endsWith(`/magic/${h}`)||r.endsWith(`/cdn/${h}`)},"F",0,function(e){return`${e}/magic/${h}`}])},344364,548266,e=>{let t=["spawn.co","spawnfile.io","spawncdn.io"];function h(e){let t=e.toLowerCase();return t.startsWith("data:")||t.startsWith("blob:")}function n(e){let t=globalThis.location?.protocol;return t?`${t}${e}`:`https:${e}`}function r(e,t){let r=e.trim();if(!r||r.startsWith("/")||h(r))return r||e;let a=r.startsWith("//")?n(r):r;if(!a.startsWith("http://")&&!a.startsWith("https://"))return r;try{let e=new URL("/api/media","https://spawn.co");return e.searchParams.set("url",new URL(a).toString()),t&&e.searchParams.set("pass",t),`${e.pathname}${e.search}`}catch{return r}}function a(e,t){if(!e.startsWith("https://"))return!1;try{let{hostname:h}=new URL(e);return t.some(e=>h===e||h.endsWith(`.${e}`))}catch{return!1}}function o(e){let t=e.trim();return t.startsWith("//")?n(t):t}e.s(["R",0,t,"P",0,function(e){if(!e)return null;try{return new URL(e).origin}catch{return null}}],548266);let i=[...t,"jacob-a34.workers.dev","bigspawn.net"];function l(e){let t=o(e);return a(t,i)?t:r(e)}let v=[16,32,48,64,96,128,256,384,640,750,828,1080,1200,1920,2048,3840],s=[35,60,75];e.s(["F",0,2,"_",0,s,"z",0,o,"m",0,function(e){if(e.startsWith("/")||e.startsWith("data:")||e.startsWith("blob:"))return e;let t=e.includes("?")?"&":"?";return`${e}${t}v=2`},"H",0,a,"a",0,function(e,t,n=75){let r=e.trim();if(!r||h(r))return r||e;let a=l(r),o=v.find(e=>e>=t)??3840,i=s.find(e=>e>=n)??75;return`/signal/__local/${encodeURIComponent(String(a).split("?")[0])}?w=${o}&q=${i}`},"L",0,r,"D",0,l],344364)},123424,e=>{let t=e=>{let t=e/255;return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)},h=e=>{let t=Math.max(0,Math.min(1,e));return(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)*255};function n(e,h,n){let r=t(e),a=t(h),o=t(n),i=Math.cbrt(.4122214708*r+.5363325363*a+.0514459929*o),l=Math.cbrt(.2119034982*r+.6806995451*a+.1073969566*o),v=Math.cbrt(.0883024619*r+.2817188376*a+.6299787005*o);return[.2104542553*i+.793617785*l-.0040720468*v,1.9779984951*i-2.428592205*l+.4505937099*v,.0259040371*i+.7827717662*l-.808675766*v]}function r([e,t,h]){let n=e+.3963377774*t+.2158037573*h,a=e-.1055613458*t-.0638541728*h,o=e-.0894841775*t-1.291485548*h,i=n*n*n,l=a*a*a,v=o*o*o;return[4.0767416621*i-3.3077115913*l+.2309699292*v,-1.2684380046*i+2.6097574011*l-.3413193965*v,-.0041960863*i-.7034186147*l+1.707614701*v]}function a(e){let[t,n,a]=r(e);return[h(t),h(n),h(a)]}function o({l:e,c:t,h}){let n=h*Math.PI/180;return[e,Math.cos(n)*t,Math.sin(n)*t]}function i(e){return a(o(e))}function l(e){let[t,h,n]=i(e);return[Math.round(t),Math.round(h),Math.round(n)]}function v(e,t){let h=0,n=.5;for(let a=0;a<24;a++){let a=(h+n)/2;r(o({l:e,c:a,h:t})).every(e=>e>=0&&e<=1)?h=a:n=a}return h}e.s(["L",0,function([e,t,h]){return`#${[e,t,h].map(e=>e.toString(16).padStart(2,"0")).join("")}`},"O",0,function(e,t){let h=Math.abs(e-t)%360;return h>180?360-h:h},"M",0,a,"E",0,function([e,h,n]){return .2126*t(e)+.7152*t(h)+.0722*t(n)},"N",0,o,"P",0,i,"t",0,l,"s",0,n,"T",0,function(e,t,h){return function([e,t,h]){return{l:e,c:Math.hypot(t,h),h:(180*Math.atan2(h,t)/Math.PI%360+360)%360}}(n(e,t,h))},"Q",0,function(e,t){let h=t=>l({l:t,c:v(t,e),h:e}),n=0,r=1;for(let t=0;t<24;t++){let t=n+(r-n)/3,h=r-(r-n)/3;v(t,e)<v(h,e)?n=t:r=h}let a=(n+r)/2;if(t(h(a)))return h(a);let o=a,i=1;for(let e=0;e<24;e++){let e=(o+i)/2;t(h(e))?i=e:o=e}return h(i)},"w",0,function(e){return(e%360+360)%360}])},574622,390763,413194,956174,e=>{var t=e.i(123424),h=e.i(428607);function n(e){return e>=30&&e<=130}function r(e,h){return(0,t.M)(function(e,h){let n=e[0],r=e[e.length-1];if(h<=n.at)return(0,t.N)(n.color);if(h>=r.at)return(0,t.N)(r.color);for(let n=1;n<e.length;n++){let r=e[n];if(h<=r.at){let a=e[n-1],o=(h-a.at)/(r.at-a.at||1),i=(0,t.N)(a.color),l=(0,t.N)(r.color);return[i[0]+(l[0]-i[0])*o,i[1]+(l[1]-i[1])*o,i[2]+(l[2]-i[2])*o]}}return(0,t.N)(r.color)}(e.stops,h))}e.s(["K",0,function(e,h){let r=(0,t.T)(e[0],e[1],e[2]),a=(0,t.T)(h[0],h[1],h[2]).h,o=(0,t.O)(a,r.h);return function(e,h,r){if(e.meanChroma<.035)return{ground:e.hue,groundChroma:.035,bloomA:e.hue,bloomB:h??190,accent:190,accentIsWarm:!1,flat:!0};let a=r??(0,t.w)(e.hue+180);return{ground:e.hue,groundChroma:.05,bloomA:e.hue,bloomB:h??(0,t.w)(e.hue-60),accent:a,accentIsWarm:n(a),flat:!1}}({hue:r.h,meanChroma:r.c},o>=20?a:null,o>=90?a:null)},"m",0,n],390763);var a=e.i(214950);let o={a:.62,b:.58};function i(e,h){let n=(0,t.T)(e[0],e[1],e[2]),[r,a,o]=(0,t.P)({...n,l:n.l+h});return[Math.round(r),Math.round(a),Math.round(o)]}function l(e,h=a.f.page){let n=e.stops[0].color,v=[{role:"floor",rgb:i(r(e,1),-.0011)},{role:"mid",rgb:i(r(e,.46),.0055)},{role:"top",rgb:i(r(e,0),.011)}],s=e.glows[e.glows.length-1],m=e.glows[e.glows.length-2],c=(e,r,a)=>{let i=h.tints[r][a],l=.5*Math.max(0,e.color.l-o[r]),[v,s,m]=(0,t.P)({l:n.l+i.dl+l,c:n.c*i.dc,h:e.color.h});return[Math.round(v),Math.round(s),Math.round(m)]};return s&&(v.push({role:"bloomA-half",rgb:c(s,"a",0)}),v.push({role:"bloomA",rgb:c(s,"a",1)})),m&&(v.push({role:"bloomB-half",rgb:c(m,"b",0)}),v.push({role:"bloomB",rgb:c(m,"b",1)})),v}let v=[[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],[12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],[3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],[15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]];function s(e){let h=e.map(([e,h,n])=>(0,t.s)(e,h,n));return(e,n,r)=>{let[a,o,i]=(0,t.s)(e,n,r),l=0,v=1/0;for(let e=0;e<h.length;e++){let t=h[e],n=(a-t[0])**2+(o-t[1])**2+(i-t[2])**2;n<v&&(v=n,l=e)}return l}}e.s(["j",0,function(e,t){return v[7&t][7&e]},"L",0,s],413194);e.s(["n",0,class{width;height;palette;block;blockOrigin;form;stack;nearest;rowCount;ramp;stand;glowRgb;constructor(e,r,o=r.frame.height,i=!1){this.form=r,this.stand=i?a.f.alone:a.f.page,this.stack=e(r,this.stand),this.palette=function(e,h=a.f.page){let r=l(e,h).map(e=>e.rgb),o=n(e.glows[e.glows.length-2]?.color.h??0/0)?[...r.slice(0,5),r[3],r[4]]:r,i=[o[0],...[[0,1,3],[1,2,3],[2,3,2],[3,4,2],[2,5,2],[5,6,2]].filter(([e,t])=>o[e]&&o[t]).flatMap(([e,h,n])=>Array.from({length:n},(r,a)=>{var i,l,v;let s,m,c;return i=o[e],l=o[h],v=(a+1)/n,s=(0,t.s)(i[0],i[1],i[2]),m=(0,t.s)(l[0],l[1],l[2]),[Math.round((c=(0,t.M)([s[0]+(m[0]-s[0])*v,s[1]+(m[1]-s[1])*v,s[2]+(m[2]-s[2])*v]))[0]),Math.round(c[1]),Math.round(c[2])]}))];return i.filter((e,t)=>i.findIndex(t=>t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2])===t)}(e(h.H.desktop,this.stand),this.stand),this.nearest=s(this.palette),this.block=r.block,this.blockOrigin=r.blockOrigin;let{width:v,height:m}=(0,h.g)(r);this.width=v,this.height=m,this.ramp=Math.max(r.frame.height,o),this.rowCount=Math.ceil(Math.max(m,Math.ceil(this.ramp/4))/this.block),this.glowRgb=new Float64Array(3*this.stack.glows.length),this.stack.glows.forEach((e,h)=>this.glowRgb.set((0,t.P)(e.color),3*h))}get glowReach(){let{frame:e}=this.form;return this.stack.glows.map(t=>t.cy*e.height+t.ry*t.fade)}get cover(){return{x0:0,y0:0,width:this.width,height:this.height}}write(e,t=null,h=this.cover){let{frame:n,cover:a}=this.form,o=this.stack.glows,i=o.length,l=new Float64Array(6*i);for(let e=0;e<i;e++){let h=o[e],r=t?.[e];l[6*e]=h.cx*n.width+(r?.dx??0),l[6*e+1]=h.cy*n.height+(r?.dy??0),l[6*e+2]=h.rx,l[6*e+3]=h.ry,l[6*e+4]=h.fade,l[6*e+5]=h.alpha*this.stand.glow*(r?.k??1)}let v=this.glowRgb,s=(a.width-n.width)/2,m=this.block,c=this.blockOrigin,u=4*m,d=.5*n.width,z=-.08*n.height,f=1700*this.form.bloomScaleX,p=this.stand.reach*this.ramp,g=Math.floor((h.x0-c)/m),w=Math.floor((h.x0+h.width-1-c)/m),b=Math.floor(h.y0/m),M=Math.floor((h.y0+h.height-1)/m),y=Math.floor(-c/m),$=Math.floor((this.width-1-c)/m);for(let t=b;t<=M;t++){let n=Math.max(0,t),a=(n+.5)*u,o=n>=this.rowCount;for(let n=g;n<=w;n++){let g=0;if(!o){let e=(n+.5)*u+4*c-s,t=((Math.min($,Math.max(y,n))+.5)*u+4*c-s-d)/f,h=(a-z)/p,o=r(this.stack,Math.min(1,Math.sqrt(t*t+h*h))),m=o[0],w=o[1],b=o[2];for(let t=0;t<i;t++){let h=6*t,n=(e-l[h])/l[h+2],r=(a-l[h+1])/l[h+3],o=Math.sqrt(n*n+r*r),i=l[h+4],s=o>=i?0:l[h+5]*(1-o/i);s>0&&(m=v[3*t]*s+m*(1-s),w=v[3*t+1]*s+w*(1-s),b=v[3*t+2]*s+b*(1-s))}g=this.nearest(m,w,b)}let w=Math.max(h.x0,n*m+c),b=Math.min(h.x0+h.width,(n+1)*m+c),M=Math.max(h.y0,t*m),x=Math.min(h.y0+h.height,(t+1)*m);for(let t=M;t<x;t++){let n=(t-h.y0)*h.width-h.x0;e.fill(g,n+w,n+b)}}}}},"Y",0,function(e,t,h){let n=(t-e.cover.width)/2,r=Math.floor(-n/4);return{window:{x0:r,y0:0,width:Math.max(1,Math.ceil((t-n)/4)-r),height:Math.max(1,Math.ceil(h/4))},coverLeft:n}},"T",0,function(e,t=a.f.page){return l(e(h.H.desktop,t),t).map(e=>e.rgb)}],574622);let m=/^v\d{1,3}-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})-([01])$/,c=e=>Math.round((0,t.w)(e))%360;e.s(["M",0,function(e,t="v7"){return`${t}-${c(e.ground)}-${c(e.bloomA)}-${c(e.bloomB)}-${c(e.accent)}-${+!!e.flat}`},"_",0,function(e){let t=m.exec(e);if(!t)return null;let[h,r,a,o]=[t[1],t[2],t[3],t[4]].map(Number);if([h,r,a,o].some(e=>e>=360))return null;let i="1"===t[5];return{ground:h,groundChroma:i?.035:.05,bloomA:r,bloomB:a,accent:o,accentIsWarm:!i&&n(o),flat:i}}],956174)},503859,214950,e=>{let t={page:{reach:.45,glow:.58,colour:1,tints:{a:[{dl:.04,dc:1.3},{dl:.08,dc:1.6}],b:[{dl:.025,dc:1.15},{dl:.06,dc:1.4}]}},alone:{reach:1.15,glow:1,colour:1.7,tints:{a:[{dl:.057,dc:1.64},{dl:.109,dc:2.18}],b:[{dl:.032,dc:1.33},{dl:.082,dc:1.82}]}}};e.s(["f",0,t],214950),e.s(["F",0,{ground:272,groundChroma:.05,bloomA:262,bloomB:215,accent:355,accentIsWarm:!1,flat:!1},"X",0,function(e,h,n=t.page){let r=h.bloomScaleX,a=h.bloomScaleY,o=e.flat?e.groundChroma:e.groundChroma*n.colour,i=t=>e.flat?Math.min(t,.07):t,l=e.bloomB>=30&&e.bloomB<=130;return{stops:[{color:{l:.25,c:o,h:e.ground},at:0},{color:{l:.21,c:.84*o,h:e.ground},at:.46},{color:{l:.175,c:.67*o,h:e.ground},at:1}],glows:[{cx:.86,cy:.02,rx:720*r,ry:380*a,color:{l:l?.72:.58,c:i(l?.14:.16),h:e.bloomB},alpha:l?.16:.18,fade:.72},{cx:.14,cy:-.06,rx:820*r,ry:420*a,color:{l:.62,c:i(.19),h:e.bloomA},alpha:.22,fade:.7}]}}],503859)},370849,e=>{e.s(["G",0,"#070708","V",0,["#3a2c14","#7a5a24","#c99b4a","#ffd9a0"]])}])})();