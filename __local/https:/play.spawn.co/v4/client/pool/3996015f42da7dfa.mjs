;const{Bo7:H,Eki:d,IRB:O,L3a:x,PDF:w,TmD:C,Zxs:F,lMp:R}=$Lr.$S;const{E9X:K,JHy:k,TQj:M,leN:T}=$Lr;
var v=16,J=24,a=64,_=4,l=a*a/32,I=a*a,r=-32768,$=128,S=2147483647,ss=3,as=128,Ts=8,xs=J+T*v+I+$,Fs=4,Y=32768,m=16384,Z=`struct ShellRow {
  slots: vec4u,
  metres: vec4f,
  anchor: vec4i,
  things: vec4i,
}
struct ShellsDraw {
  head: vec4u,
  eye: vec4f,
  far: vec4f,
  paint: vec4f,
  cover: vec4f,
  band: vec4f,
  rows: array<ShellRow, ${T}>,
  near: array<vec4u, ${I/4}>, //${a}
  sunPass: array<vec4u, ${$/4}>,
}`,j=`
fn shell_wrap(a: i32, w: i32, inv: f32) -> i32 {
  var r = a - w * i32(floor(f32(a) * inv));
  r = select(r, r - w, r >= w);
  return select(r, r + w, r < 0);
}

fn shell_slot(k: u32, bx: i32, bz: i32) -> u32 {
  let row = shells.rows[k];
  let w = i32(row.slots.x);
  return u32(shell_wrap(bz, w, row.metres.z) * w + shell_wrap(bx, w, row.metres.z));
}

fn shell_record(k: u32, slot: u32) -> vec4u {
  let at = (shells.rows[k].slots.y + slot) * 4u;
  return vec4u(shellDir[at], shellDir[at + 1u], shellDir[at + 2u], shellDir[at + 3u]);
}

fn shell_column(k: u32, bx: i32, bz: i32) -> vec4u {
  return shell_record(k, shell_slot(k, bx, bz));
}

fn shell_key(bx: i32, bz: i32) -> u32 {
  return (u32(bx) & 0xffffu) | ((u32(bz) & 0xffffu) << 16u);
}

fn shell_present(e: vec4u, bx: i32, bz: i32) -> bool {
  return (e.y >> 16u) != 0u && e.x == shell_key(bx, bz);
}

fn shell_y0(e: vec4u) -> i32 {
  return (i32(e.y << 16u)) >> 16u;
}

fn shell_baseMatter(e: vec4u) -> u32 {
  return (e.w >> 16u) & ${65535&~(Y|m)}u;
}

//${x} where none (after its list's brick entries, two a word)
fn shell_roofOf(e: vec4u, lx: i32, lz: i32) -> i32 {
  let q = u32(lz * 8 + lx);
  let w = shellDir[e.z + (e.y >> 16u) + (q >> 1u)];
  return i32(w << (16u * (1u - (q & 1u)))) >> 16u;
}`,z=(s)=>`
fn shell_nibble(slot: u32, l: vec3i) -> u32 {
  let index = u32((l.y * 8 + l.z) * 8 + l.x);
  let code = slot >> 24u;
${s?`  let raw = code == ${F}u;
  let bits = select(select(code, 4u, code == 0u), 32u, raw);`:"  let bits = select(code, 4u, code == 0u);"}
  let bit = index * bits;
  let at = (slot & 0xffffffu) * ${C}u + ${s?`select(1u << (bits - 1u), ${O}u, raw)`:"(1u << (bits - 1u))"} + (bit >> 5u);
  let shift = bit & 31u;
  var cell = shellPool[at] >> shift;
  if (shift + bits > 32u) {
    cell |= shellPool[at + 1u] << (32u - shift);
  }
  return cell & ${s?"select((1u << bits) - 1u, 0xffffu, raw)":"((1u << bits) - 1u)"};
}`,q=z(!1),Os=z(!0),G=`fn shell_paletteMatter(slot: u32, nibble: u32) -> u32 {
  let word = shellPool[(slot & 0xffffffu) * SHELL_UNIT_WORDS + (nibble >> 1u)];
  return (word >> ((nibble & 1u) * 16u)) & 0xffffu;
}`,Cs=()=>q,Ks=()=>G,f=`
fn shell_under(ro: vec3f) -> bool {
  let count = shells.head.x;
  for (var k = 0u; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(ro.x / b)) + row.anchor.x;
    let bz = i32(floor(ro.z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return i32(floor(ro.y / b)) < shell_y0(e) && (e.w >> 16u) != 0u;
    }
  }
  return false;
}
fn shell_drawnAt(d: f32) -> u32 {
  let count = shells.head.x;
  var drawn = 0u;
  loop {
    if (drawn + 1u >= count || shells.rows[drawn].metres.y > d) {
      break;
    }
    drawn++;
  }
  return drawn;
}
fn shell_tooCoarse(k: u32, drawn: u32, d: f32) -> bool {
  let c = shells.rows[k].metres.x;
  return k > drawn && shells.head.w == 0u && c > ${k} && c > ${M}.0 * shells.far.y * d;
}
fn shell_underIn(k: u32, e: vec4u, ro: vec3f, coarse: bool) -> bool {
  let c = shells.rows[k].metres.x;
  let b = c * 8.0;
  return select(i32(floor(ro.y / b)) < shell_y0(e), ro.y + c < f32(shell_y0(e)) * b, coarse) && (e.w >> 16u) != 0u && (e.w & ${m<<16>>>0}u) == 0u;
}
fn shell_underLand(ro: vec3f) -> bool {
  let d = distance(ro, shells.eye.xyz);
  let drawn = shell_drawnAt(d);
  let count = shells.head.x;
  for (var k = 0u; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(ro.x / b)) + row.anchor.x;
    let bz = i32(floor(ro.z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return shell_underIn(k, e, ro, shell_tooCoarse(k, drawn, d));
    }
  }
  return false;
}`,Ms=(s,B,U)=>`${Z}
@group(${s}) @binding(${B}) var<${K()}> shells: ShellsDraw;
@group(${s}) @binding(${U}) var<storage, read> shellDir: array<u32>;
${j}
${f}`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$ as y4M,C as _W6,Cs as ZP$,F as Cnk,Fs as bEz,H as vk8,I as IfO,J as YHA,Ks as Tri,Ms as t8w,O as b12,Os as vEN,R as UEq,S as QBk,Ts as v7G,Y as MG9,Z as NFc,_ as Umk,a as Qhb,as as HWC,d as wHe,f as M1k,j as nNv,l as SSH,m as KeE,r as zOh,ss as _Oc,v as f6k,w as ndO,x as Ipq,xs as itw};
