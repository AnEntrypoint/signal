;const{FOr:z,leN:Q,rbV:J}=$Lr;
;var M=6144,c=256,y=32,I=0.035,V=0.05,W=48+Q*8,p=8,C=2,U=256,k=16,q=J/z,F=32,B=`
fn shell_lightKey(bx: i32, bz: i32) -> u32 {
  return shell_key(bx, bz) ^ 0x80000000u;
}
fn shell_lightTopOf(e: vec4u) -> i32 {
  return (i32(e.w << 16u)) >> 16u;
}`,D=(j)=>`${B}

fn shell_lightShellAt(k0: u32, d: f32) -> u32 {
  let count = shells.head.x;
  var k = k0;
  loop {
    if (k + 1u >= count || shells.rows[k].metres.x * 128.0 >= d) {
      break;
    }
    k++;
  }
  return k;
}

fn shell_lightTop(k0: u32, x: f32, z: f32) -> vec4f {
  let count = shells.head.x;
  for (var k = k0; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(x / b)) + row.anchor.x;
    let bz = i32(floor(z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return vec4f(f32(shell_lightTopOf(e)) * row.metres.x, f32(shell_baseMatter(e)), 1.0, select(0.0, 1.0, k == k0));
    }
  }
  return vec4f(0.0);
}

fn shells_light(id: vec3u, groups: vec3u) {
  let i = id.y * groups.x * 64u + id.x;
  let total = job.run.z;
  var g = 0u;
  if (i < job.run.y) {
    g = (job.run.x + i) % total;
  } else if (i < job.run.y + job.run.w) {
    g = jobList[i - job.run.y];
  } else {
    return;
  }
  if (g >= total) {
    return;
  }
  let count = shells.head.x;
  var k = 0u;
  var s = g;
  loop {
    if (k >= count) {
      return;
    }
    let w = shells.rows[k].slots.x;
    if (s < w * w) {
      break;
    }
    s = s - w * w;
    k++;
  }
  let row = shells.rows[k];
  let e = shell_record(k, s);
  if (e.x == 0xffffffffu || (e.y >> 16u) == 0u) {
    return;
  }
  let bx = (i32(e.x << 16u)) >> 16u;
  let bz = i32(e.x) >> 16u;
  let c = row.metres.x;
  let b = c * 8.0;
  let at = vec2f(f32(bx - row.anchor.x) + 0.5, f32(bz - row.anchor.y) + 0.5) * b;
  let top = f32(shell_lightTopOf(e)) * c;
  let sun = job.sun.xyz;
  var open = 0.0;
  var past = 0.0;
  var bounce = vec3f(0.0);
  for (var a = 0; a < i32(job.word.y); a = a + 1) {
    let turn = f32(a) * 0.7853982 + 0.3926991;
    let dir = vec2f(cos(turn), sin(turn));
    var best = 0.0;
    var bestPast = 0.0;
    var matter = 0u;
    var d = c * 12.0;
    for (var n = 0; n < i32(job.word.y); n = n + 1) {
      let q = at + dir * d;
      let t = shell_lightTop(shell_lightShellAt(k, d * 2.0), q.x, q.y);
      if (t.z > 0.5) {
        let rise = (t.x - top - c * 0.5) / d;
        if (rise > best) {
          best = rise;
          matter = u32(t.y);
        }
        if (d > ${y}.0 && t.w > 0.5) {
          bestPast = max(bestPast, rise);
        }
      }
      d *= 1.8;
    }
    let hidden = best * best / (1.0 + best * best);
    open = open + 1.0 - hidden;
    past = past + 1.0 - bestPast * bestPast / (1.0 + bestPast * bestPast);
    if (hidden > 0.0 && job.sun.w > 0.5) {
      let facing = max(dot(vec3f(-dir.x, 0.0, -dir.y), sun), 0.0);
      bounce = bounce + shellTones[matter * ${j}u + 1u].rgb * (hidden * facing);
    }
  }
  let q = vec3u(clamp(bounce * (31.5 / 8.0), vec3f(0.0), vec3f(63.0)));
  shellLight[g] = vec2u(u32(clamp(open / 8.0, 0.0, 1.0) * 255.0) | (u32(clamp(past / 8.0, 0.0, 1.0) * 63.0) << 8u) | (q.x << 14u) | (q.y << 20u) | (q.z << 26u), e.x ^ 0x80000000u);
}`,x=(j,Y,m)=>`@group(${j}) @binding(${Y}) var<storage, read> shellLight: array<vec2u>;
@group(${j}) @binding(${m}) var<storage, read> shellPool: array<u32>;
${B}
${v()}
struct ShellFarLight {
  under: bool,
  open: bool,
  sky: f32,
  skyPast: f32,
  bounce: vec3f,
  top: f32,
  cube: f32,
  cave: f32,
  sun: f32,
}
fn shell_roofed(k: u32, p: vec3f) -> bool {
  let row = shells.rows[k];
  let c = row.metres.x;
  let cx = i32(floor(p.x / c)) + row.anchor.x * 8;
  let cz = i32(floor(p.z / c)) + row.anchor.y * 8;
  let bx = cx >> 3u;
  let bz = cz >> 3u;
  let e = shell_column(k, bx, bz);
  if (!shell_present(e, bx, bz)) {
    return false;
  }
  if ((e.w & ${$<<16>>>0}u) == 0u) {
    return false;
  }
  return i32(floor(p.y / c)) < shell_roofOf(e, cx & 7, cz & 7);
}
fn shell_caveSky(k: u32, ro: vec3f, n: vec3f) -> f32 {
  let c = shells.rows[k].metres.x;
  let f = ro + n * (0.5 * c);
  let toEye = shells.eye.xyz - f;
  let reach = length(toEye);
  let v = toEye / max(reach, 1e-3);
  let most = min(reach, select(${k}.0, ${U}.0, shells.head.w != 0u));
  var lo = 0.0;
  var hi = most;
  var t = c;
  var q = 0.0;
  var h = -2;
  loop {
    let roofed = shell_roofed(k, f + v * q);
    if (roofed) {
      lo = q;
    } else {
      hi = q;
    }
    if (h == -2) {
      if (!roofed) {
        return 1.0;
      }
      h = -1;
      q = min(t, most);
      continue;
    }
    if (h == -1) {
      if (roofed) {
        if (t >= most) {
          return exp2(-${q} * most);
        }
        t *= 2.0;
        q = min(t, most);
        continue;
      }
      h = 0;
    }
    h++;
    if (h == 5) {
      break;
    }
    q = 0.5 * (lo + hi);
  }
  return exp2(-${q} * 0.5 * (lo + hi));
}
fn shell_cellLand(e: vec4u, cx: i32, cy: i32, cz: i32) -> bool {
  let by = cy >> 3u;
  let y0 = shell_y0(e);
  if (by < y0) {
    return shell_baseMatter(e) != 0u;
  }
  if (by >= y0 + i32(e.y >> 16u)) {
    return false;
  }
  let entry = shellDir[e.z + u32(by - y0)];
  if (entry == 0u || (entry & ${Z>>>0}u) != 0u) {
    return entry != 0u;
  }
  return shell_nibble(entry - 1u, vec3i(cx & 7, cy & 7, cz & 7)) != 0u;
}
fn shell_caveSun(k: u32, ro: vec3f, n: vec3f, sun: vec3f) -> f32 {
  let row = shells.rows[k];
  let c = row.metres.x;
  var p = ro + n * (0.5 * c);
  let step = sun * (2.0 * c);
  for (var i = 0; i < ${F}; i = i + 1) {
    p += step;
    let cx = i32(floor(p.x / c)) + row.anchor.x * 8;
    let cy = i32(floor(p.y / c));
    let cz = i32(floor(p.z / c)) + row.anchor.y * 8;
    let e = shell_column(k, cx >> 3u, cz >> 3u);
    if (!shell_present(e, cx >> 3u, cz >> 3u) || cy >= shell_lightTopOf(e)) {
      return 1.0;
    }
    if (shell_cellLand(e, cx, cy, cz)) {
      return 0.0;
    }
  }
  return 0.0;
}
fn shell_farLight(ro: vec3f, n: vec3f, sun: vec3f) -> ShellFarLight {
  var out = ShellFarLight(false, false, 1.0, 1.0, vec3f(0.0), 0.0, 1.0, 1.0, 1.0);
  let count = shells.head.x;
  let d = distance(ro, shells.eye.xyz);
  let drawn = shell_drawnAt(d);
  for (var k = 0u; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(ro.x / b)) + row.anchor.x;
    let bz = i32(floor(ro.z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (!shell_present(e, bx, bz)) {
      continue;
    }
    let coarse = shell_tooCoarse(k, drawn, d);
    out.under = shell_underIn(k, e, ro, coarse);
    out.top = f32(shell_lightTopOf(e)) * row.metres.x;
    out.cube = row.metres.x;
    if (!out.under && !coarse) {
      out.cave = shell_caveSky(k, ro, n);
    }
    if (out.cave < 1.0 && sun.y > 0.0 && dot(n, sun) > 0.0) {
      out.sun = shell_caveSun(k, ro, n, sun);
    }
    let u = (ro.xz + n.xz * b) / b - vec2f(0.5);
    let i0 = vec2i(floor(u)) + vec2i(row.anchor.x, row.anchor.y);
    let f = u - floor(u);
    let base = row.slots.y - shells.rows[0].slots.y;
    var weight = 0.0;
    var sky = vec2f(0.0);
    var bounce = vec3f(0.0);
    for (var j = 0; j < 4; j = j + 1) {
      let o = vec2i(j & 1, j >> 1u);
      let cx = i0.x + o.x;
      let cz = i0.y + o.y;
      let w = shellLight[base + shell_slot(k, cx, cz)];
      if (w.y == shell_lightKey(cx, cz)) {
        let ww = select(1.0 - f.x, f.x, o.x == 1) * select(1.0 - f.y, f.y, o.y == 1) + 1e-4;
        weight += ww;
        sky = sky + ww * vec2f(f32(w.x & 255u) / 255.0, f32((w.x >> 8u) & 63u) / 63.0);
        bounce = bounce + ww * vec3f(f32((w.x >> 14u) & 63u), f32((w.x >> 20u) & 63u), f32(w.x >> 26u)) / 31.5;
      }
    }
    if (weight > 0.0) {
      out.open = true;
      out.sky = sky.x / weight;
      out.skyPast = sky.y / weight;
      out.bounce = bounce / weight;
    }
    return out;
  }
  return out;
}`;var u={wgsl:X,uniformBytes:K*4,light:x};
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{MG9 as $,ZP$ as v,itw as K,t8w as X,vk8 as Z}from"./3996015f42da7dfa.mjs";export{C as HNR,D as xAB,I as ZXr,M as USY,V as uDE,W as jVu,c as c9H,p as dHS,u as zaw};
