(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,99597,[[["static/immutable/chunks/hs5dvo1vqj.js",["static/immutable/chunks/6w41b5b7mg.js","static/immutable/chunks/c03z9pnpop.js"],[1,1]],"static/immutable/chunks/d58gbicc20.js",["static/immutable/chunks/hvxgugf8k8.js",["static/immutable/chunks/s1qqmawtym.js","static/immutable/chunks/9pf97cdpsc.js","static/immutable/chunks/d7uwrnmsxv.js","static/immutable/chunks/twhp5y5p15.js","static/immutable/chunks/3j417ko1uo.js","static/immutable/chunks/w7zq5ycny5.js","static/immutable/chunks/tnrosiyuar.js","static/immutable/chunks/fp1mk1b8tv.js","static/immutable/chunks/0x2wwtam1j.js","static/immutable/chunks/ii008ipz2w.js","static/immutable/chunks/x8wl98cu3z.js","static/immutable/chunks/00rxojyq8b.js","static/immutable/chunks/9nldqtte8h.js","static/immutable/chunks/l9nx87h0ti.js","static/immutable/chunks/9pnvvay2y4.js","static/immutable/chunks/vehlpil66q.js"],[1,1,1,1,1,1,1,2,3,1,1,1,1,1,13,12]]],431660],468020,[[["static/immutable/chunks/09qo0ckmdj.js",["static/immutable/chunks/1fbsujnn2j.js","static/immutable/chunks/uknjb1uxgx.js"],[1,1]],["static/immutable/chunks/pg8y3x6i15.js",["static/immutable/chunks/1wdyxozzl0.js","static/immutable/chunks/0je42zdxon.js","static/immutable/chunks/ikp7i92rn5.js","static/immutable/chunks/gkxxeso08u.js","static/immutable/chunks/urprmmtosg.js","static/immutable/chunks/9m8kzsmnhu.js","static/immutable/chunks/le86mpympi.js","static/immutable/chunks/zzx596xfkg.js","static/immutable/chunks/u10gvbk8jo.js","static/immutable/chunks/to64eewcv7.js","static/immutable/chunks/vspuw566d5.js","static/immutable/chunks/5adtvw62fm.js","static/immutable/chunks/8tad7qzmmt.js","static/immutable/chunks/i76ji17azz.js"],[15,2,18,1,1,6,3,1,1,2,1,2,3,14]],["static/immutable/chunks/dba08y0ofr.js",["static/immutable/chunks/w2co94wrz4.js","static/immutable/chunks/s0h8x2fgc4.js","static/immutable/chunks/h6wu4zqigf.js","static/immutable/chunks/pr07cv64hv.js","static/immutable/chunks/o796va42bk.js","static/immutable/chunks/ek25pwnkmx.js","static/immutable/chunks/awo99ay3k3.js","static/immutable/chunks/i5ih1xvnfe.js","static/immutable/chunks/tnrosiyuar.js","static/immutable/chunks/fp1mk1b8tv.js","static/immutable/chunks/8cx9oag44z.js","static/immutable/chunks/mfcel35z7g.js"],[2,9,1,1,1,1,1,1,1,2,1,16]],"static/immutable/chunks/9xel6lp0rl.js",["static/immutable/chunks/x95618w7cv.js",["static/immutable/chunks/s3wkj2mpia.js","static/immutable/chunks/ls5xs6eejo.js","static/immutable/chunks/ciewu5x67c.js","static/immutable/chunks/u1h859fwxq.js","static/immutable/chunks/p9h0b5g3vj.js","static/immutable/chunks/5b0wi6o33o.js","static/immutable/chunks/95sr0aa5cp.js","static/immutable/chunks/h2uuluqfja.js","static/immutable/chunks/6sdegmgizb.js","static/immutable/chunks/ahoknan3vn.js","static/immutable/chunks/y2f4k5yy14.js","static/immutable/chunks/4jxiu0h5bb.js","static/immutable/chunks/4eyltn9huu.js","static/immutable/chunks/8ykpf7cna1.js","static/immutable/chunks/3qisvaxpyt.js","static/immutable/chunks/bxbqtjojmg.js","static/immutable/chunks/43yowigpkm.js","static/immutable/chunks/umobajw8wc.js","static/immutable/chunks/uwiz8venod.js","static/immutable/chunks/rfkd7doek7.js","static/immutable/chunks/lf7q26uhy4.js"],[26,3,6,1,1,1,2,1,1,5,1,1,3,3,1,2,1,9,5,1,26]],"static/immutable/chunks/trbewz42jl.js","static/immutable/chunks/5i88dl2z9h.css"],835320],496149,(e=>{"use strict";var T=(function(e){let a=e/t.D;return a<=.05?0:a>=.97?null:-1666*Math.log((.97-a)/(.97-.05))});var t=e.i(241019),a=e.i(339016),n=e.i(792711),r=e.i(566398),i=e.i(510269),s=e.i(967122);e.i(761096);let o=String.raw`(function () {
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
})();`,c="application/x-spawn-arrival";var l=e.i(15038);let u="data-curtain-arrival",d="data-curtain-arrival-shown",m="data-curtain-arrival-host",f="data-curtain-arrival-ran",h="__spawnCurtainArrivalAsk",p="spawn.curtain.arrival-asked",b="{ cache: 'no-store', credentials: 'omit', mode: 'cors' }",v="__spawnCurtainArrival";String.raw`(function () {
  ${(0,s.N)("reach")}
  var curtain = document.getElementById('${i.R}');
  if (!curtain || curtain.hasAttribute('${f}')) return;
  curtain.setAttribute('${f}', '');
  var spec = null;
  try { spec = JSON.parse(curtain.getAttribute('${u}') || 'null'); } catch (e) {}
  if (spec && typeof spec.url === 'string') spec.url = reach(spec.url);
  if (!spec || typeof spec.url !== 'string' || !window.WebGL2RenderingContext || !window.createImageBitmap || !window.fetch) return;
  ${o}
  var view = window.__spawnArrivalView;
  var host = document.createElement('div');
  host.setAttribute('${m}', '');
  curtain.insertBefore(host, curtain.firstChild);
  var handle = null, kept = false, last = null, seen = null, off = false, marked = false;
  function post(look) {
    last = look;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || !frame.contentWindow) return;
    var message = { type: '${l.F1}', yaw: look.yaw, pitch: look.pitch };
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
  var asked = window['${h}'];
  var net = asked && asked.url === spec.url && asked.net ? asked.net : fetch(spec.url, ${b});
  window['${h}'] = null;
  if (!asked || asked.url !== spec.url) { try { performance.mark('${p}'); } catch (e) {} }
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
        keep.then(function (box) { if (box && !off) box.put(spec.url, new Response(bytes, { headers: { 'content-type': '${c}' } })).catch(function () {}); });
      }, function () {});
    }, function () {});
  });
  function onAsk(event) {
    var d = event.data;
    if (!d || d.type !== '${l.rr}' || !event.source) return;
    try { event.source.postMessage({ type: '${l.fR}' }, '*'); } catch (e) {}
    if (last) post(last);
  }
  window.addEventListener('message', onAsk);
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${l.JW}' || d.worldHex !== spec.world) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    forget();
  });
  // the frame's kept view stands for the page's life: it is put away whenever it comes, the screen up or gone
  window.addEventListener('message', function (event) {
    var d = event.data;
    if (!d || d.type !== '${l.UU}' || d.worldHex !== spec.world || !(d.bytes instanceof Uint8Array || d.bytes instanceof ArrayBuffer)) return;
    var frame = document.querySelector('iframe[data-spawn-kernel-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    var bytes = d.bytes instanceof Uint8Array ? d.bytes : new Uint8Array(d.bytes);
    var read = view.read(bytes);
    if (off || !read || read.meta.worldHex !== spec.world) return;
    window.__spawnArrivalKept = { bytes: bytes.length, room: read.meta.room, faces: read.meta.faces.map(function (f) { return [f.face, f.size, f.length]; }) };
    keep.then(function (box) {
      if (box) box.put(keptUrl(read.meta.room), new Response(new Blob([bytes], { type: '${c}' }))).catch(function () {});
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
  ${(0,s.N)("reach")}
  var doc = document, ASK = '${h}', FRAME = 'iframe[data-spawn-kernel-frame]';
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
    var net = fetch(spec.url, ${b});
    net.catch(function () {});
    window[ASK] = { url: spec.url, net: net };
    try { performance.mark('${p}'); } catch (e) {}
    return true;
  }
  if (ask()) return;
  var watch = new MutationObserver(function () { if (ask()) watch.disconnect(); });
  watch.observe(doc.documentElement, { childList: true, subtree: true });
  doc.addEventListener('DOMContentLoaded', function () { watch.disconnect(); });
})();`;let g="Spawn Pixel",k=`'${g}', system-ui, sans-serif`,w=((e,t)=>`@font-face{font-family:'${e}';src:url(${i.d}) format('woff2');font-display:${t};unicode-range:U+0100-FFFF}@font-face{font-family:'${e}';src:url(${i.y}) format('woff2');font-display:${t};unicode-range:U+0000-001F,U+007F-009F,U+00A1-00FF,U+2000-2025,U+2027-206F,U+20AC,U+2122}@font-face{font-family:'${e}';src:url(${i.k}) format('woff2');font-display:${t};unicode-range:U+0020-007E,U+00A0,U+2026}`);w(i.b,"swap"),a._,i.b;let y="data-curtain-dissolve",x="rgba(255,255,255,0.08)",$=(e=>e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),j=t.L,A=`calc(${j} * 0.1)`,E=`rgba(255,255,255,${t.q})`,R='<span data-curtain-dot style="word-spacing:.57em"> </span>',_=`#${i.R}[data-curtain-inked] [data-curtain-dot]{background:linear-gradient(${E},${E}) 50% 56%/.12em .12em no-repeat}`,z=(e=>`radial-gradient(circle at ${t.G}px ${t.G}px,var(--ground-accent,#fff) ${t.G}px,transparent 0) 0 0/${e}px ${e}px`),M=`#${i.R} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:rgba(255,255,255,${t.a})}#${i.R} [data-curtain-bar]>i[data-b="solid"]{background:var(--ground-accent,#fff)}#${i.R} [data-curtain-bar]>i[data-b="dense"]{background:${z(t.U)};animation:spawn-curtain-head ${t.O}ms ease-in-out infinite}#${i.R} [data-curtain-bar]>i[data-b="sparse"]{background:${z(t.$)};animation:spawn-curtain-head ${t.O}ms ease-in-out ${t.W}ms infinite}@keyframes spawn-curtain-head{0%,100%{opacity:${t.A}}50%{opacity:1}}@media (prefers-reduced-motion:reduce){#${i.R} [data-curtain-bar]>i{animation:none}}`;;let q=`#${i.R}[data-born]:not([${y}]) :is([data-curtain-box],[data-curtain-line],[data-curtain-bar]){display:none!important}`,L=`[${i._}][${i.p}]{visibility:hidden}`,P=((e,t)=>{let a=`round(nearest,${t},1px)`;return"x"===e?`translate:${t} 0;translate:${a} 0`:`translate:0 ${t};translate:0 ${a}`}),U=`#${i.R} [data-curtain-stage]>*{${P("x","calc((100cqw - 100%) / 2)")}}`,S=`html[${i.N}] #${i.R} [data-curtain-stage]>[data-curtain-foot]{top:100%!important;left:50%!important;right:auto!important;width:max-content;max-width:${t.v};margin-top:${t.u}px;translate:-50% 0!important;text-wrap:balance}`;e.s(["N",0,y,"J",0,g,"X",0,(function(e){let a=`rgba(255,255,255,${t.a})`,n=[z(t.$),z(t.U),"var(--ground-accent,#fff)"],r=T(t.D-1)??1666,i=`${e} [data-curtain-bar]{display:flex;gap:${t.w}px}${e} [data-curtain-bar]>i{display:block;width:${t.E}px;height:${t.o}px;background:${a}}`;for(let s=0;s<t.D;s+=1){let t=[T(s-1),T(s),T(s+1)].flatMap((e,t)=>s+t-1<0||null===e?[]:[`${(e/r*100).toFixed(2)}%{background:${n[t]}}`]);i+=`@keyframes spawn-den-bar-${s}{0%{background:${a}}${t.join("")}}${e} [data-curtain-bar]>i:nth-child(${s+1}){animation:spawn-den-bar-${s} ${Math.round(r)}ms steps(1,end) forwards}`}return i}),"F",0,(function(e){return`<div style="display:flex;flex-direction:column;align-items:center;gap:${t.u}px">${e}<div data-curtain-bar>${"<i></i>".repeat(t.D)}</div></div>`}),"u",0,(function(e){return`${e} [data-wisp-loop]{margin-bottom:${t.C-t.u}px}`}),"A",0,(function(e,a="",s="",o=null,c=null){var l;let f=e.face?o:null,h=e.face?null:c,p=e.groundArt?` data-curtain-ground-art="${$(e.groundArt)}"`:"",b=e.ground?` data-curtain-ground-paint="${$(JSON.stringify(e.ground))}"`:"",E=e.face?` ${y}`:"",z=e.face?null:e.arrival??null,T=(function(e,a){let r=(0,n.l)(e),i=(0,t.H)(r,a);if(!r&&!i)return"";let s=r?`<span data-curtain-title style="color:rgba(255,255,255,${t.T})">${$(r)}</span>`:"",o=i?`${r?R:""}<span data-curtain-maker style="color:rgba(255,255,255,${t.q})">${$(i)}</span>`:"";return`<div data-curtain-line style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;max-width:${t.v};text-align:center;overflow-wrap:anywhere;font-size:${t.P};line-height:${t.M}">${s}${o}</div>`})(e.title,e.maker),C=e.face?e.face.src:e.thumbnailUrl,F="";if(e.face){let e;e=C?`<img src="${$(C)}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:${x};user-select:none">`:"",F=`<div data-curtain-face style="position:relative;flex-shrink:0;width:${t.V};aspect-ratio:1;border-radius:50%;overflow:hidden;background:${x}"><div data-curtain-face-fallback style="position:absolute;inset:0;display:${C?"none":"flex"};align-items:flex-end;justify-content:center">${s}</div>`+e+"</div>"}else{let e;C&&(e=$(C),F=`<div data-curtain-box style="position:relative;flex-shrink:0;width:${j};aspect-ratio:2 / 3;perspective:600px;perspective-origin:center center"><div style="position:relative;height:100%;width:100%;transform-style:preserve-3d;transform:rotateY(16deg) scale(0.95)"><div style="position:absolute;inset:0;overflow:hidden;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);transform:translateZ(calc(${A} / 2));backface-visibility:hidden"><div style="position:absolute;top:0;bottom:0;right:0;width:${100/.9}%"><img src="${e}" alt="" draggable="false" fetchpriority="high" decoding="async" style="position:absolute;inset:0;height:100%;width:100%;object-fit:fill;object-position:right;user-select:none"></div></div><div style="position:absolute;top:0;height:100%;overflow:hidden;left:calc(${A} * -1);width:${A};transform:translateZ(calc(${A} / 2)) rotateY(-75deg);transform-origin:right center"><img src="${e}" alt="" draggable="false" style="position:absolute;inset:0;height:100%;width:100%;object-fit:cover;object-position:left;user-select:none"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.25)"></div></div></div><div aria-hidden="true" style="position:absolute;bottom:-8px;left:8px;right:8px;height:16px;background:rgba(0,0,0,0.4);filter:blur(12px);border-radius:50%;opacity:0.45"></div></div>`)}return`<${i.R} id="${i.R}" aria-hidden="true"${p}${b}${E}${z?` ${u}="${JSON.stringify(z).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}"`:""} style="position:fixed;inset:0;z-index:24;opacity:0.999;pointer-events:none;font-family:${k};transition:${i.S};container-type:size"><style>${w(g,"block")}${h?"":M}${f?.css??""}${T.includes(R)?_:""}${q}${L}${U}${S}${a}${h?.css??""}${z?(l=i.R,`#${l} [${m}]{position:absolute;inset:0;pointer-events:none}#${l}[${d}] [${m}]{pointer-events:auto}#${l}[${d}] :is([data-curtain-ground],[data-curtain-box],[data-curtain-line],[data-curtain-bar]){visibility:hidden!important}`):""}</style>`+(z?`<script>window.${v}&&window.${v}()</script>`:"")+'<div data-curtain-ground aria-hidden="true"></div>'+`<div style="position:absolute;inset:0 0 var(${r.u}, 0px);padding:40px 24px;container-type:size">`+`<div data-curtain-stage style="position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:${t.u}px;${P("y","calc((100cqh - 100%) / 2)")}">`+F+(h?.room??"")+T+(f?.html??"")+(h?"":`<div data-curtain-bar role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="5" style="display:flex;gap:${t.w}px">${'<i data-b="empty"></i>'.repeat(t.D)}</div>`)+"</div></div>"+(h?.html??"")+`<div data-curtain-foot style="position:absolute;top:0;left:24px;right:24px;translate:0 calc(100cqh - 100% - max(var(${r.u},0px),env(safe-area-inset-bottom)) - ${t.x}px);text-align:center;font-size:${t.p}px;line-height:${t.z}px;color:rgba(255,255,255,${t.y})"></div>`+`</${i.R}>`})],496149)}),230439,575092,(e=>{"use strict";var _=(function(e,t,a,n,r,i=8){let s=e.gap??6,o=Math.max(8,Math.min(e.left,n-8-a)),c=r-8-e.bottom-s,l=e.top-s-i;if(Math.max(c,l)>=Math.min(t,240)){let a=c>=t||c>=l,n=a?c:l;return{top:a?e.bottom+s:e.top-s-Math.min(t,n),left:o,maxHeight:n}}let u=r-8-i,d=Math.max(i,Math.min(e.top,r-8-Math.min(t,u))),m=e.right+s;return{top:d,left:m+a<=n-8?m:Math.max(8,e.left-s-a),maxHeight:u}});var z=(function(e){let t=e.querySelector(`[${b.N}]`);return e.scrollHeight+(t?Math.max(0,t.scrollHeight-t.clientHeight):0)});var M=(function(){return"function"==typeof window.matchMedia&&window.matchMedia(A).matches});var t=e.i(843476);e.i(510269),e.i(66372);var a=e.i(340640),n=e.i(418926);e.i(28668);var r=e.i(566398),i=e.i(215992),s=e.i(289588),o=e.i(101446),c=e.i(891719),l=e.i(898653),u=e.i(80697),d=e.i(69605),m=e.i(87404),f=e.i(266027),h=e.i(271645),p=e.i(214792),b=e.i(707074),v=e.i(140999),g=e.i(496149),k=e.i(360293),w=e.i(583913),y=e.i(241019);let x=`calc(${y.V} + ${y.u+8}px)`,$="__spawnPersonDockShut",j="__spawnPersonDockLive",A=k.q,E=`(function(){var w=window,d=document.querySelector('[data-person-dock]');if(!d)return;function shut(){if(w.${j})return;d.style.display='none';w.${$}=true}d.addEventListener('click',function(e){var t=e.target;if(t&&t.closest&&t.closest('[data-testid="person-close"]'))shut()});w.addEventListener('keydown',function(e){if(e.key==='Escape')shut()},true);var y=null,up=false;d.addEventListener('touchstart',function(e){var t=e.target;up=!!(w.matchMedia&&w.matchMedia('${A}').matches);var end=up?d.scrollTop+d.clientHeight>=d.scrollHeight-1:d.scrollTop===0;y=end&&!(t&&t.closest&&t.closest('[${b.N}]'))?e.touches[0].clientY:null},{passive:true});d.addEventListener('touchend',function(e){if(y!==null&&(up?y-e.changedTouches[0].clientY:e.changedTouches[0].clientY-y)>56)shut();y=null},{passive:true})})();`,R=`html:not([${w.P}]) [data-person-dock]{font-family:'${g.J}',system-ui,sans-serif!important;--font-geist-pixel:'${g.J}',system-ui,sans-serif!important}@media ${A}{[data-person-dock]{top:${v.H}!important;bottom:auto!important;left:8px!important;width:min(var(--card-width),calc(100vw - ${(0,d.m)(24)}))!important;max-height:max(168px,calc(${y.K} - 8px - ${v.H}))!important}[data-person-dock]>[data-dock-handle]{display:block!important;order:1;margin:8px auto!important}html.${w.I} [data-person-dock]{display:none!important}html:has([data-person-dock]) [data-curtain-stage]{top:${x};top:round(nearest,${x},1px)}}`;;e.s(["F",0,j,"K",0,E,"H",0,$,"k",0,R,"o",0,A],575092),e.s(["PersonCardFloat",0,(function({userId:e,handle:v,member:g,anchor:k=null,initial:w,onClose:y,onPressAway:x=y,leave:$,docked:j=!1,here:A}){let E=(0,h.useRef)(null),[R,T]=(0,h.useState)(null);(0,c.m)(R);let q=(0,h.useCallback)((e=>{E.current=e,T(e)}),[]),L=(0,h.useRef)(null),[P,U]=(0,h.useState)(null),S=(0,h.useRef)(y);S.current=y,(function(e,t,a,r=!0){let i=(0,h.useRef)(t);i.current=t;let s=(0,h.useRef)(a);s.current=a,(0,n.z)(!0,e=>{let t=e.target;t instanceof HTMLElement&&t.matches("input, textarea")||i.current()},{besideTheGame:!r}),(0,h.useEffect)(()=>{let t=(t=>{if(!r||document.querySelector('[data-testid="person-more-menu"]'))return;let a=t.target;a instanceof Node&&e.current?.contains(a)||a instanceof Element&&a.closest('[data-testid="person-more-menu"], [data-sonner-toaster], [data-card-scrim]')||s.current(a)}),a=window.setTimeout(()=>{window.addEventListener("pointerdown",t,!0)},0);return()=>{window.clearTimeout(a),window.removeEventListener("pointerdown",t,!0)}},[e,r])})(E,y,x,!j);let C=(0,m.f)(e)?e:w?.profile.userId??null,F=(0,f.f)({queryKey:s.f.relationByHandle(v??""),queryFn:(()=>(0,i.A)(v)),enabled:!C&&!!v,staleTime:3e4}),H=C??F.data?.profile.userId??null,I=(0,i.f)(H,w??F.data),O=void 0!==I.data||I.isError||F.isError,N=I.data?.profile.suspended===!0?k?.width??400:360;(0,h.useLayoutEffect)((()=>{let e=E.current;if(!k||!e)return void U(null);let t=k.element??null,a=(()=>{if(t&&!t.isConnected)return void S.current();let a=t?.getBoundingClientRect();U(_(a?{top:a.top,bottom:a.bottom,left:a.left,right:a.right,gap:k.gap}:k,z(e),N,window.innerWidth,window.innerHeight,function(){let e=document.querySelector("nav[data-site-chrome]:not([data-tab-bar])");if(!e)return 8;let t=getComputedStyle(e);return Math.max(8,e.getBoundingClientRect().bottom-parseFloat(t.paddingBottom||"0")+6)}()))});a();let n="function"==typeof ResizeObserver?new ResizeObserver(a):null;n?.observe(e);let r=t&&"function"==typeof MutationObserver?new MutationObserver(a):null;return r?.observe(document.body,{childList:!0,subtree:!0}),window.addEventListener("resize",a),()=>{n?.disconnect(),r?.disconnect(),window.removeEventListener("resize",a)}}),[k,O,N]);let D=O&&(!k||null!==P);(0,h.useEffect)((()=>{let e=E.current;!D||j||!e||e.contains(document.activeElement)||(0,o.m)(e.querySelector('[data-testid="person-close"]')??e.querySelector("button, a[href]"),e)}),[D,j]);let B={"--card-width":`${N}px`,...j?{zIndex:25,"--dock-consent":`var(${r.u}, 0px)`,"--dock-clear":(0,d.m)(24)}:{},...P?{"--card-top":`${P.top}px`,"--card-left":`${P.left}px`,"--card-max-h":`${P.maxHeight}px`}:{}};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{"aria-hidden":!0,"data-card-scrim":"",className:(0,l.c)("fixed inset-0 z-popover hidden bg-surface-scrim",D&&!j&&"phone:block"),onClick:(e=>x(e.target))}),(0,t.jsxs)("div",{ref:q,...c.a,role:"dialog",tabIndex:-1,"aria-label":v?(0,u.m)({handle:v,agent:(I.data??F.data)?.profile.actorClass==="agent"}).words:"a person","data-testid":b.n,...j?{"data-person-dock":""}:{},style:B,onTouchStart:j?(e=>{var t,a,n;t=E.current,a=e.target,n=e.touches[0]?.clientY,L.current=!t||void 0===n||a instanceof Element&&a.closest(`[${b.N}]`)?null:(M()?t.scrollTop+t.clientHeight>=t.scrollHeight-1:0===t.scrollTop)?n:null}):void 0,onTouchEnd:j?(e=>{var t,a;let n=L.current;L.current=null;let r=e.changedTouches[0]?.clientY;null!==n&&void 0!==r&&(t=n,a=r,(M()?t-a:a-t)>56)&&y()}):void 0,className:(0,l.c)(a.f,"fixed flex w-[var(--card-width)] flex-col overflow-y-auto outline-none",j?"bottom-[calc(var(--dock-gap)+var(--dock-consent))] left-3 max-h-[min(640px,calc(100dvh-96px))] [--dock-gap:12px] phone:left-2 phone:max-h-[60dvh] phone:w-[min(var(--card-width),calc(100vw-var(--dock-clear)))] phone:[--dock-gap:calc(8px+env(safe-area-inset-bottom,0px))]":"z-popover max-h-[min(720px,var(--card-max-h,calc(100dvh-16px)))]",!j&&(k?"left-[var(--card-left)] top-[var(--card-top)]":"left-1/2 top-[88px] -translate-x-1/2"),!j&&"phone:bottom-0 phone:left-0 phone:right-0 phone:top-auto phone:max-h-[80dvh] phone:w-auto phone:translate-x-0 phone:rounded-b-none phone:border-x-0 phone:border-b-0 phone:pb-[env(safe-area-inset-bottom,0px)]",!D&&"invisible"),children:[(0,t.jsx)("div",{"aria-hidden":!0,...j?{"data-dock-handle":""}:{},className:"mx-auto mt-2 hidden h-1 w-9 flex-none rounded-hairline bg-white/20 phone:block"}),H?(0,t.jsx)(p.P,{userId:H,member:g,initial:w??F.data,here:A,onClose:y,leave:$}):(0,t.jsx)("div",{className:"flex items-center justify-between gap-2 px-[14px] py-3 text-[12px] text-white/50",children:(0,t.jsx)("span",{children:"This person did not load \xb7 try again"})})]})]})}),"cardNaturalHeight",0,z,"cardPlace",0,_],230439)}),151653,[["static/immutable/chunks/po79npbcfv.js"],879491],485290,[["static/immutable/chunks/l1fqyj1w9s.js"],372275],538419,[[["static/immutable/chunks/vp8fkqbcpx.js",["static/immutable/chunks/j20v5k0msu.js","static/immutable/chunks/xlv1jhpa7j.js"],[1,1]]],945432],10122,[[],448833],252151,[[["static/immutable/chunks/hch5u2to5v.js",["static/immutable/chunks/t8cm7lwrto.js","static/immutable/chunks/cpceheoha6.js","static/immutable/chunks/6t2er7wrrg.js"],[8,1,1]]],413082],977948,[[["static/immutable/chunks/rf7qb5nxpu.js",["static/immutable/chunks/9pf97cdpsc.js","static/immutable/chunks/d7uwrnmsxv.js","static/immutable/chunks/yp3oo77nvi.js","static/immutable/chunks/3ufydqvsgg.js","static/immutable/chunks/n87q88lae3.js"],[1,1,1,1,4]]],507860],297911,[[],311917],154721,[["static/immutable/chunks/nyjo2l6cfk.js"],174922],617999,[[["static/immutable/chunks/yttbhr37we.js",["static/immutable/chunks/wkxu8xjgs4.js","static/immutable/chunks/7szqcgw2dx.js","static/immutable/chunks/o3wjrouaoq.js","static/immutable/chunks/7lfuq0o4jd.js","static/immutable/chunks/nk3npk1fbg.js"],[12,6,7,2,7]]],26465],414544,[["static/immutable/chunks/2nlj3qhim4.js"],934059],75633,[["static/immutable/chunks/q31umcvyp1.js"],934788],639811,[[],352608],432918,[[["static/immutable/chunks/sr9wchbq68.js",["static/immutable/chunks/qe39w4jjn2.js","static/immutable/chunks/sq3nmvke0n.js"],[26,2]]],852580]]);