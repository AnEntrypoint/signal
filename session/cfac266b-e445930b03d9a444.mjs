import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(j,V,q,Z,z,K,Q){let Y=l,F=!1,$=0,N=null,G=null;for(let H=0;H<z.length;H++){let{layerId:M,grid:J,floatBase:A}=z[H],I=K(M);if(I===void 0||J.data===null||!(J.gridSize>0))continue;let X=J.bedGpu;if(X?.device===j&&!X.mark.lost&&X.gridSize===J.gridSize&&X.cellSize===J.cellSize&&X.originX===J.originX&&X.originZ===J.originZ&&X.shape===I&&!B.has(J))continue;let L=V?.pipeline??null;if(L===null||q===null||typeof j.createCommandEncoder!=="function"){F=!0;continue}let T=i(j,q,Z,J,X,I);T.floatBase=A,T.gridSize=J.gridSize,T.cellSize=J.cellSize,T.originX=J.originX,T.originZ=J.originZ,O[0]=J.gridSize,O[1]=A,O[2]=I.members.length,O[3]=0,W[4]=J.cellSize,W[5]=J.originX-I.anchorX,W[6]=J.originZ-I.anchorZ,W[7]=0,j.queue.writeBuffer(T.uniform,0,D),B.delete(J),J.zeroed=!1,N??=j.createCommandEncoder({label:"terrain decor bed shapes"}),G??=N.beginComputePass({label:"terrain decor bed shapes"}),G.setPipeline(L),G.setBindGroup(0,T.group),G.dispatchWorkgroups(J.gridSize),Q.add(M),$=Math.max($,A+J.gridSize*J.gridSize)}if(N!==null)G?.end(),j.queue.submit([N.finish()]);return Y.owed=F,Y.writtenFloats=$,Y})',()=>'(function(j,V,q,Z,z,K){let Q=z?.device===j&&!z.mark.lost?z:null;if(z?.device===j&&z.mark.lost)P(z.uniform),P(z.words);let Y=Q?.mark??{lost:!1},F=Q?.uniform??U(j,{label:"terrain decor bed shape uniform",size:32,usage:64|8},Y),$=Q?.words??null,N=Math.max(16,K.words.byteLength);if($===null||$.size<N)P(Q?.words),$=U(j,{label:"terrain decor bed shape words",size:Math.ceil(N/4)*4,usage:128|8},Y);if(Q?.wordsOf!==K.words||Q.words!==$)j.queue.writeBuffer($,0,K.words);let G=Q?.tileMaps===q&&Q.words===$&&Q.uniform===F?Q.group:j.createBindGroup({label:"terrain decor bed shape",layout:V,entries:[{binding:0,resource:{buffer:F}},{binding:1,resource:{buffer:$}},{binding:2,resource:{buffer:q}}]}),H={device:j,mark:Y,tileMaps:q,floatBase:-1,gridSize:0,cellSize:0,originX:NaN,originZ:NaN,shape:K,uniform:F,words:$,wordsOf:K.words,group:G};return Z.bedGpu=H,H})']}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,196138117365760);
;const{JK_:P,L$P:U,MTG:f,No2:c,bpe:S,niV:v,q6p:R,t9t:m,wRZ:x,wTy:b,wnb:_,x8f:E}=$Lr;
;;;;;;;;;;;;;;;;var w=h,y=1024,n=64,C=4;function u(j,V){let q=j/C;if(!Number.isInteger(q)||q<1||(q&q-1)!==0)throw Error(`the bed shape kernel's workgroup of ${j} lanes gives each of its ${C} sub-rows ${q} lanes, which is not a power of two`);let Z=V*4/32;if(!Number.isInteger(Z)||Z<1)throw Error(`the bed shape kernel's widest grid of ${V} cells gives a sub-row of ${V*4} sub-taps, which is not a whole count of 32-bit words`);let z=31-Math.clz32(q);return{subRowWords:Z,subRowLanes:q,laneShift:z,slotShift:5+z,ownedWords:Math.ceil(Z/q)}}var t=[x(0,4,"uniform"),x(1,4,"read-only-storage"),x(2,4,"storage")];function p(j=n,V=w){let q=u(j,V),Z=(z)=>Array.from({length:q.ownedWords},(K,Q)=>z(Q,Q===0?"":` + ${Q*q.subRowLanes}u`)).join(`
`);return`
struct BedShapeUniform {
  gridSize: u32,
  floatBase: u32,
  members: u32,
  pad0: u32,
  cell: f32,
  offX: f32,
  offZ: f32,
  pad1: f32,
};

@group(0) @binding(0) var<uniform> u: BedShapeUniform;
@group(0) @binding(1) var<storage, read> words: array<f32>;
@group(0) @binding(2) var<storage, read_write> grid: array<f32>;

const WG: u32 = ${j}u;
const SUBROW_WORDS: u32 = ${q.subRowWords}u;
const ROW_LIST: u32 = ${y}u;
const HEAD: u32 = ${f}u;
const MEMBER: u32 = ${c}u;
const EDGE_BASE: f32 = 8388608.0;
const NO_CROSSING: u32 = 0xffffffffu;
const RIM_KEEP: f32 = 0.3;
const CIRCLE: i32 = ${b};
const RECTANGLE: i32 = ${R};
const RING: i32 = ${S};
const POLYGON: i32 = ${E};
const PATH: i32 = ${m};
const KEEP_EDGE: i32 = ${v};
const KEEP_CLUSTERED: i32 = ${_};

var<workgroup> toggles: array<u32, ${C*q.subRowWords}>;
var<workgroup> acc: array<f32, ${V}>;
var<workgroup> rowList: array<u32, ${y}>;
var<workgroup> laneEdges: array<u32, ${j}>;
var<workgroup> crossings: array<u32, ${j*4}>;
var<workgroup> rowCount: u32;
var<workgroup> memberWord: i32;

fn mixHash(i: i32, j: i32, seed: u32, k: u32) -> f32 {
  var h = (bitcast<u32>(i) * 0x8da6b343u) ^ (bitcast<u32>(j) * 0xd8163841u) ^ (seed * 0xcb1ab31fu) ^ (k * 0x9e3779b9u);
  h ^= h >> 16u;
  h *= 0x7feb352du;
  h ^= h >> 15u;
  h *= 0x846ca68bu;
  h ^= h >> 16u;
  return f32(h >> 8u) / 16777216.0;
}

fn segmentDistance(px: f32, pz: f32, ax: f32, az: f32, bx: f32, bz: f32) -> f32 {
  let dx = bx - ax;
  let dz = bz - az;
  let len2 = dx * dx + dz * dz;
  var t = 0.0;
  if (len2 > 0.0) { t = clamp(((px - ax) * dx + (pz - az) * dz) / len2, 0.0, 1.0); }
  let qx = ax + t * dx - px;
  let qz = az + t * dz - pz;
  return sqrt(qx * qx + qz * qz);
}

fn outlineDistance(base: u32, kind: i32, px: f32, pz: f32) -> f32 {
  let count = u32(words[base + 10u]);
  let off = u32(words[base + 11u]);
  let listed = rowCount;
  var best = 3.0e38;
  if (listed <= ROW_LIST) {
    for (var l = 0u; l < listed; l++) {
      let e = rowList[l];
      let j = select(e + 1u, 0u, e + 1u == count);
      best = min(best, segmentDistance(px, pz, words[off + e * 2u], words[off + e * 2u + 1u], words[off + j * 2u], words[off + j * 2u + 1u]));
    }
    return best;
  }
  let segments = select(count, count - 1u, kind == PATH);
  for (var e = 0u; e < segments; e++) {
    let j = select(e + 1u, 0u, e + 1u == count);
    best = min(best, segmentDistance(px, pz, words[off + e * 2u], words[off + e * 2u + 1u], words[off + j * 2u], words[off + j * 2u + 1u]));
  }
  return best;
}

fn edgeMeetsBand(off: u32, count: u32, e: u32, z0: f32, z1: f32) -> bool {
  let j = select(e + 1u, 0u, e + 1u == count);
  let az = words[off + e * 2u + 1u];
  let bz = words[off + j * 2u + 1u];
  return max(az, bz) >= z0 && min(az, bz) <= z1;
}

fn edgeAt(listAt: u32, p: u32) -> u32 {
  if (listAt == 0u) { return p; }
  return u32(words[listAt + p]);
}

fn listRowEdges(lid: u32, off: u32, count: u32, listAt: u32, edges: u32, z0: f32, z1: f32) {
  var mine = 0u;
  for (var p = lid; p < edges; p += WG) {
    if (edgeMeetsBand(off, count, edgeAt(listAt, p), z0, z1)) { mine += 1u; }
  }
  laneEdges[lid] = mine;
  workgroupBarrier();
  if (lid == 0u) {
    var total = 0u;
    for (var l = 0u; l < WG; l++) {
      let lane = laneEdges[l];
      laneEdges[l] = total;
      total += lane;
    }
    rowCount = total;
  }
  workgroupBarrier();
  var at = laneEdges[lid];
  for (var p = lid; p < edges; p += WG) {
    let e = edgeAt(listAt, p);
    if (edgeMeetsBand(off, count, e, z0, z1)) {
      if (at < ROW_LIST) { rowList[at] = e; }
      at += 1u;
    }
  }
  workgroupBarrier();
}

fn insideAt(base: u32, kind: i32, x: f32, z: f32) -> bool {
  let a = words[base + 5u];
  let b = words[base + 6u];
  if (kind == CIRCLE) { return x * x + z * z <= a * a; }
  if (kind == RECTANGLE) { return abs(x) <= a && abs(z) <= b; }
  if (kind == RING) { let d2 = x * x + z * z; return d2 >= a * a && d2 <= b * b; }
  return outlineDistance(base, kind, x, z) <= a;
}

fn keepAt(base: u32, kind: i32, keep: i32, x: f32, z: f32) -> f32 {
  let band = words[base + 7u];
  if (keep == KEEP_EDGE) {
    let a = words[base + 5u];
    let b = words[base + 6u];
    var d = 0.0;
    if (kind == CIRCLE) { d = abs(a - sqrt(x * x + z * z)); }
    else if (kind == RECTANGLE) { d = min(a - abs(x), b - abs(z)); }
    else if (kind == RING) { let r = sqrt(x * x + z * z); d = min(r - a, b - r); }
    else if (kind == PATH) { d = a - outlineDistance(base, kind, x, z); }
    else { d = outlineDistance(base, kind, x, z); }
    return select(0.0, 1.0, d <= band);
  }
  if (keep == KEEP_CLUSTERED) {
    let square = words[base + 8u];
    if (!(square > 0.0) || !(band > 0.0)) { return 0.0; }
    let seed = u32(words[base + 9u]);
    let ix = i32(floor(x / square));
    let iz = i32(floor(z / square));
    let reach = min(i32(ceil(band / square)), 4);
    var best = 0.0;
    for (var dz = -reach; dz <= reach; dz++) {
      for (var dx = -reach; dx <= reach; dx++) {
        let gx = ix + dx;
        let gz = iz + dz;
        let cx = (f32(gx) + mixHash(gx, gz, seed, 0u)) * square;
        let cz = (f32(gz) + mixHash(gx, gz, seed, 1u)) * square;
        let t = sqrt((x - cx) * (x - cx) + (z - cz) * (z - cz)) / band;
        if (t < 1.0) { best = max(best, 1.0 - (1.0 - RIM_KEEP) * t * t); }
      }
    }
    return best;
  }
  return 1.0;
}

@compute @workgroup_size(${j})
fn main(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_index) lid: u32) {
  let n = u.gridSize;
  let row = wg.x;
  if (row >= n) { return; }
  let cell = u.cell;
  let sub = cell * 0.25;
  let subCols = n * 4u;
  let rowWords = (subCols + 31u) / 32u;
  let rowZ0 = u.offZ + f32(row) * cell;
  for (var i = lid; i < n; i += WG) { acc[i] = 0.0; }
  for (var m = 0u; m < u.members; m++) {
    let base = HEAD + m * MEMBER;
    if (lid == 0u) {
      var word = i32(words[base]) | (i32(words[base + 1u]) << 4u);
      let ox = words[base + 2u];
      let oz = words[base + 3u];
      let pairs = u32(words[base + 10u]);
      let kind = i32(words[base]);
      if (!(words[base + 4u] > 0.0)) { word = -1; }
      if (oz + words[base + 13u] > rowZ0 + cell || oz + words[base + 15u] < rowZ0) { word = -1; }
      if (ox + words[base + 12u] > u.offX + f32(n) * cell || ox + words[base + 14u] < u.offX) { word = -1; }
      if ((kind == POLYGON && pairs < 3u) || (kind == PATH && pairs < 2u)) { word = -1; }
      memberWord = word;
    }
    let word = workgroupUniformLoad(&memberWord);
    if (word < 0) { continue; }
    let kind = word & 15;
    let keep = word >> 4u;
    let ox = words[base + 2u];
    let oz = words[base + 3u];
    let scale = words[base + 4u];
    let lx0 = u.offX - ox;
    let lz0 = rowZ0 - oz;
    let count = u32(words[base + 10u]);
    let off = u32(words[base + 11u]);
    var margin = 0.0;
    if (kind == PATH || keep == KEEP_EDGE) { margin = cell; }
    if (kind == PATH) { margin += words[base + 5u]; }
    if (keep == KEEP_EDGE) { margin += words[base + 7u]; }
    if (kind == PATH) { listRowEdges(lid, off, count, 0u, count - 1u, lz0 - margin, lz0 + cell + margin); }
    if (kind == POLYGON) {
      let crossingAt = off + count * 2u;
      let crossingEdges = u32(words[crossingAt]);
      listRowEdges(lid, off, count, crossingAt + 1u, crossingEdges, lz0, lz0 + cell);
      let listed = workgroupUniformLoad(&rowCount);
      let every = listed > ROW_LIST;
      let edges = select(listed, crossingEdges, every);
      let subRow = lid >> ${q.laneShift}u;
      let column = lid & ${q.subRowLanes-1}u;
${Z((z)=>`      var own${z} = 0u;`)}
      for (var first = 0u; first < edges; first += WG) {
        for (var s = 0u; s < 4u; s++) { crossings[s * WG + lid] = NO_CROSSING; }
        let l = first + lid;
        if (l < edges) {
          var e = 0u;
          if (every) { e = edgeAt(crossingAt + 1u, l); } else { e = rowList[l]; }
          let j = select(e + 1u, 0u, e + 1u == count);
          var ax = words[off + e * 2u];
          var az = words[off + e * 2u + 1u];
          var bx = words[off + j * 2u];
          var bz = words[off + j * 2u + 1u];
          if (az > bz) {
            let tx = ax;
            ax = bx;
            bx = tx;
            let tz = az;
            az = bz;
            bz = tz;
          }
          if (bz >= lz0 && az <= lz0 + cell) {
            for (var s = 0u; s < 4u; s++) {
              let z = lz0 + (f32(s) + 0.5) * sub;
              if (az <= z && z < bz) {
                let x = (bx - ax) * (z - az) / (bz - az) + ax;
                let t = ceil((x - lx0) / sub - 0.5);
                if (t < f32(subCols)) { crossings[s * WG + lid] = u32(max(t, 0.0)); }
              }
            }
          }
        }
        workgroupBarrier();
        let chunk = min(WG, edges - first);
        for (var k = 0u; k < chunk; k++) {
          let ti = crossings[subRow * WG + k];
          if (ti != NO_CROSSING && ((ti >> 5u) & ${q.subRowLanes-1}u) == column) {
            let bit = 1u << (ti & 31u);
            let slot = ti >> ${q.slotShift}u;
${Z((z)=>`            own${z} ^= select(0u, bit, slot == ${z}u);`)}
          }
        }
        workgroupBarrier();
      }
      let ownAt = subRow * SUBROW_WORDS + column;
${Z((z,K)=>`      if (column${K} < rowWords) { toggles[ownAt${K}] = own${z}; }`)}
      workgroupBarrier();
      if (lid < 4u) {
        var carry = 0u;
        for (var w = 0u; w < rowWords; w++) {
          var v = toggles[lid * SUBROW_WORDS + w];
          v ^= v << 1u;
          v ^= v << 2u;
          v ^= v << 4u;
          v ^= v << 8u;
          v ^= v << 16u;
          v ^= 0u - carry;
          toggles[lid * SUBROW_WORDS + w] = v;
          carry = v >> 31u;
        }
      }
      workgroupBarrier();
      if (keep == KEEP_EDGE) { listRowEdges(lid, off, count, 0u, count, lz0 - margin, lz0 + cell + margin); }
      for (var i = lid; i < n; i += WG) {
        let w = i >> 3u;
        let shift = (i & 7u) * 4u;
        var hits = 0u;
        for (var s = 0u; s < 4u; s++) { hits += countOneBits((toggles[s * SUBROW_WORDS + w] >> shift) & 15u); }
        if (hits > 0u) { acc[i] += f32(hits) / 16.0 * keepAt(base, kind, keep, lx0 + (f32(i) + 0.5) * cell, lz0 + 0.5 * cell) * scale; }
      }
      workgroupBarrier();
      continue;
    }
    let minX = words[base + 12u];
    let maxX = words[base + 14u];
    for (var i = lid; i < n; i += WG) {
      let cx = lx0 + (f32(i) + 0.5) * cell;
      if (cx + cell < minX || cx - cell > maxX) { continue; }
      var hits = 0u;
      for (var sz = 0u; sz < 4u; sz++) {
        let z = lz0 + (f32(sz) + 0.5) * sub;
        for (var sx = 0u; sx < 4u; sx++) {
          if (insideAt(base, kind, lx0 + f32(i) * cell + (f32(sx) + 0.5) * sub, z)) { hits += 1u; }
        }
      }
      if (hits > 0u) { acc[i] += f32(hits) / 16.0 * keepAt(base, kind, keep, cx, lz0 + 0.5 * cell) * scale; }
    }
    workgroupBarrier();
  }
  workgroupBarrier();
  for (var i = lid; i < n; i += WG) {
    let at = u.floatBase + row * n + i;
    let held = grid[at];
    if (held < 0.0) { continue; }
    let value = min(acc[i], 1.0);
    if (held >= EDGE_BASE) {
      let bits = u32(held - EDGE_BASE);
      let paint = u32(clamp(round(value * 63.0) + 63.0, 0.0, 127.0));
      grid[at] = EDGE_BASE + f32((bits & ~127u) | paint);
    } else {
      grid[at] = value;
    }
  }
}
`}function Qj(j,V){return g(j,V,k,t,p,"main")}var B=new WeakSet;function Vj(j){B.add(j)}var D=new ArrayBuffer(32),O=new Uint32Array(D),W=new Float32Array(D);function Zj(a,b,c,d,e,f,g){return (Zj=$c0C(0)).call(this,a,b,c,d,e,f,g)}var l={owed:!1,writtenFloats:0.5};function i(a,b,c,d,e,f){return (i=$c0C(1)).call(this,a,b,c,d,e,f)};

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{qfn as h}from"./bffdfbee-a798754a8572ed12.mjs";import"./c613c8867c778e0a.mjs";import"./25fe2a11ea18f806.mjs";import{ggH as g}from"./8e0fe05c09de6331.mjs";import{tk_ as k}from"./c61abaa2-862a46069bf7b32a.mjs";import"./2e5fd6befe42cca7.mjs";import"./d78d80a5-ec7dd8a579991798.mjs";import"./15b7dc390eb7835d.mjs";import"./3a143d46-c72a17da50e9068c.mjs";import"./73c224890e5dcb5e.mjs";import"./74261a44b2d4bab9.mjs";import"./8036015a501379d5.mjs";import"./47cd27b7baa599f1.mjs";import"./fe1722910da55e5a.mjs";import"./c89c4d81f3aa5de7.mjs";import"./044cde0b47918ed4.mjs";export{Qj as getBedShapePipeline,Vj as noteBedShapeSectionWritten,Zj as drawBedShapeSections,p as bedShapeWgsl,t as BED_SHAPE_BIND_GROUP_LAYOUT_ENTRIES,u as bedShapeLanesOf};
