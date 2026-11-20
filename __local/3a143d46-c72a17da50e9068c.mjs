import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q,$,j,Q,Z,k){let X=Math.min(Q,C2),J=X+1;for(let K=1;J>X;K*=2){if(K>1)for(let V=j;V<j+Q;V++)$[V]=Y3($[V],K);q.reset();let v$1;O2:{let J=0,K=-1,V=0;for(let Y=0;Y<Q;Y++){let U=$[j+Y];if(U!==K){if(V=q.codeOf(U,J),V===J){if(J>=X){v$1=X+1;break O2;}k[J++]=U}K=U}Z[Y]=V}v$1=J;}J=v$1}return J})",()=>"(function(q,$,j){return`${p2($,j,!1,!1)}\n\n${c2(q)}\n\nfn terrain_casterSkirtY(slot: u32, gx: i32, gz: i32, along: vec2<i32>, drawn: f32, origin: vec4<f32>, sides: vec4<f32>, stride: u32) -> f32 {\n  let eye = vec3<f32>(0.0, 1.0, 0.0);\n${B2(!1)}\n  if (joined) { return drawn - max(hang, pool.spacing); }\n  return terrain_skirtLow(slot, gx, gz, along, drawn, cap) - max(hang, pool.spacing);\n}`})",()=>"(()=>(`      let pickRow = far_row(far_slot, 1u);\n      var p = (pickRow.xy + worldPos.xz * ${G}.0) * frequency;\n      var period = pickRow.z * frequency;\n      var seed = 11.0 + f32(k) * 17.0;\n      if (isDither) { let r = far_row(far_slot, 2u); p = r.xy + worldPos.xz * ${C}.0; period = r.z; seed = f32(index) * 31.0 + 7.0; }\n      else if (!isMv) { let r = far_layerRow(far_slot, index, 3u); p = (r.xy + worldPos.xz / max(aux.x, 1e-4)) * frequency; period = r.z * frequency; seed = aux.y + f32(k) * 17.0; }\n      let v = far_noise2D(p, seed, period);`))",()=>'(()=>("    mixed = terrain_applyMacroNoise(mixed, far_macroNoise(far_slot, firstLayer, worldPos.xz, terrain_macroScaleOf(firstLayer)), driftRow.w, driftRow.z);"))',()=>'(()=>("      let macroNoise = far_macroNoise(far_slot, index, worldPos.xz, macroScale);"))',()=>'((q)=>`  let drawnLength = length(drawnCross);\n  var drawnNormal = abs(normalLocal);\n  if (drawnLength > 0.0) { drawnNormal = abs(drawnCross) / drawnLength; }\n  if (abs(normalLocal.y) < ${M} || drawnNormal.y < ${y}) {\n    let keptShares = terrain_projectionShares(normalLocal) * smoothstep(vec3<f32>(${d2.toFixed(2)}), vec3<f32>(${y}), drawnNormal.yxz);\n    let projectionShares = keptShares + (1.0 - keptShares.x - keptShares.y - keptShares.z) * terrain_projectionShares(drawnNormal);\n    sideWeight = 1.0 - projectionShares.x;\n    sideShare = projectionShares.yz / max(projectionShares.y + projectionShares.z, 1e-6);${q?`\n    if (sideWeight > 0.0) {\n      var cornerHeights = terrain_wordCornerHeights(tile, gx, gz);\n      var footHeight = min(min(cornerHeights.x, cornerHeights.y), min(cornerHeights.z, cornerHeights.w));\n      var faceWeight = sideWeight;\n      let wordStep = terrain_wordStep();\n      if (footHeight > in.drawnHeight + 0.5 * pool.spacing && wordStep == 1) {\n        let low = (vec2<i32>(gx, gz) - vec2<i32>(1)) / 4 * 4 + vec2<i32>(1);\n        let high = min(low + vec2<i32>(4), vec2<i32>(i32(pool.resolution)));\n        let coarseHeights = vec4<f32>(terrain_heightTexel(tile, low.x, low.y), terrain_heightTexel(tile, high.x, low.y), terrain_heightTexel(tile, low.x, high.y), terrain_heightTexel(tile, high.x, high.y));\n        let coarseFoot = min(min(coarseHeights.x, coarseHeights.y), min(coarseHeights.z, coarseHeights.w));\n        if (coarseFoot < footHeight) {\n          let foot = select(select(select(high, vec2<i32>(low.x, high.y), coarseHeights.z == coarseFoot), vec2<i32>(high.x, low.y), coarseHeights.y == coarseFoot), low, coarseHeights.x == coarseFoot);\n          gx = select(foot.x, foot.x - 1, foot.x > gx);\n          gz = select(foot.y, foot.y - 1, foot.y > gz);\n          cornerHeights = vec4<f32>(terrain_heightTexel(tile, gx, gz), terrain_heightTexel(tile, gx + 1, gz), terrain_heightTexel(tile, gx, gz + 1), terrain_heightTexel(tile, gx + 1, gz + 1));\n          footHeight = coarseFoot;\n          bilinear = vec4<f32>(0.25);\n          faceWeight = 1.0;\n        }\n      }\n      let held = bilinear * exp2(-max(cornerHeights - vec4<f32>(in.drawnHeight), vec4<f32>(0.0)) * f32(wordStep) / pool.spacing);\n      let footMask = select(vec4<f32>(0.0), vec4<f32>(1.0), cornerHeights == vec4<f32>(footHeight));\n      bilinear = mix(bilinear, held + (1.0 - held.x - held.y - held.z - held.w) * footMask / (footMask.x + footMask.y + footMask.z + footMask.w), faceWeight);\n    }`:""}\n  }`)']},function(){return[()=>"(()=>(`  var rawWeightSum = 0.0;\n  var squareSum = 0.0;\n  for (var c = 0u; c < candidateCount; c++) {\n    let pw = terrain_f3(pickW, c);\n    rawWeightSum += pw;\n    squareSum += pw * pw;\n  }\n  let normalizedWeightSum = max(rawWeightSum, 1e-5);\n  let squareSumInv = 1.0 / max(squareSum, 1e-10);\n  var macroVariation = 1.0;\n  var maxAdjusted = -1.0;\n  var blendWidth = 0.0;\n  var grainShare = 0.0;\n  var colorSum = vec3<f32>(0.0);\n  var weightSum = 0.0;\n  var normalSum = vec3<f32>(0.0);\n  var sideReliefSum = vec3<f32>(0.0);\n  var roughnessSum = 0.0;\n  var metalnessSum = 0.0;\n  var emissiveSum = vec3<f32>(0.0);\n  let creaseTell = select(0.0, smoothstep(${a2}, ${L2}, groundBend), sharpen && !carve);\n  let first = select(candidateCount, 0u, sharpen);\n  let ditherFade = 1.0 - smoothstep(0.25, 0.75, noiseFootprint * ${C}.0);\n`))",()=>"(()=>(`      let aaWidth = max(fwidth(maxAdjusted), 1e-4);\n      if (carve) {\n        // The window widens by the share of the grain the pixel no longer resolves, so the far pixel draws the grain's average: a crossfade as wide as the grain would have dithered. A relief that decided the pick on its own widens nothing.\n        blendWidth = max(aaWidth, max(${D2}, (1.0 - ditherFade) * ${c} * grainShare));\n      } else {\n        blendWidth = aaWidth;\n      }\n`))",()=>"(function(q){if(!q)return`${(G3??=$c0I(6))}  for (var walk = first; walk < 2u * candidateCount; walk++) {\n    if (walk == candidateCount && sharpen) {\n${(C3??=$c0I(7))}    }\n${W3}  }\n${O3}`;return`${(G3??=$c0I(6))}  var walk = first;\n  for (var sweep = 0u; sweep < 2u; sweep++) {\n    if (sweep == 1u && sharpen) {\n${(C3??=$c0I(7))}    }\n  for (; walk < (sweep + 1u) * candidateCount; walk++) {\n${W3}  }\n  }\n${O3}`})",()=>"(()=>(`var<private> far_slot: u32;\nvar<private> far_local: vec3<f32>;\n\nfn far_row(slot: u32, row: u32) -> vec4<f32> {\n  return slotLattices[slot * (3u + 7u * u32(max(pool.layerCount, 1.0))) + row];\n}\n\nfn far_layerRow(slot: u32, layer: u32, row: u32) -> vec4<f32> {\n  return far_row(slot, 3u + min(layer, u32(max(pool.layerCount, 1.0)) - 1u) * 7u + row);\n}\n\nfn far_wrap(p: vec2<f32>, period: f32) -> vec2<f32> {\n  return p - vec2<f32>(period) * floor(p / period + vec2<f32>(0.5));\n}\n\nfn far_noise2D(p: vec2<f32>, seed: f32, period: f32) -> f32 {\n  let i = floor(p);\n  let f = fract(p);\n  let a = terrain_hash2D(far_wrap(i, period), seed);\n  let b = terrain_hash2D(far_wrap(i + vec2<f32>(1.0, 0.0), period), seed);\n  let c = terrain_hash2D(far_wrap(i + vec2<f32>(0.0, 1.0), period), seed);\n  let d = terrain_hash2D(far_wrap(i + vec2<f32>(1.0, 1.0), period), seed);\n  let u = f * f * (vec2<f32>(3.0) - f * 2.0);\n  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);\n}\n\nfn far_macroNoise(slot: u32, layer: u32, localXZ: vec2<f32>, scaleMeters: f32) -> vec2<f32> {\n  let scale = scaleMeters;\n  let r1 = far_layerRow(slot, layer, 4u);\n  let r23 = far_layerRow(slot, layer, 5u);\n  let r07 = far_layerRow(slot, layer, 6u);\n  let n = far_noise2D(r1.xy + localXZ / scale, 71.0, r1.z) * 0.6667 + far_noise2D(r23.xy + localXZ * (2.3 / scale) + vec2<f32>(13.7, 5.1), 89.0, r23.z) * 0.3333;\n  let h = far_noise2D(r07.xy + localXZ * (0.7 / scale) + vec2<f32>(41.3, 27.9), 107.0, r07.z);\n  return vec2<f32>(n, h);\n}\n\nfn far_planeUv(layer: u32, acrossIsZ: bool, planeLocal: vec2<f32>, uvScale: f32) -> vec2<f32> {\n  let f = far_layerRow(far_slot, layer, 1u);\n  return vec2<f32>(select(f.x, f.y, acrossIsZ), f.z) + planeLocal * uvScale;\n}`))"]},function(){return[()=>'(function(q){let $=[["@group(3) @binding(1) var<storage, read> slotOrigins: array<vec4<f32>>;",`@group(3) @binding(1) var<storage, read> slotOrigins: array<vec4<f32>>;\n@group(3) @binding(${J3}) var<storage, read> slotLattices: array<vec4<f32>>;\n${(A0??=$c0I(9))}`],[`  @location(13) groundBend: f32,\n}`,`  @location(13) groundBend: f32,\n  @location(10) farLocal: vec3<f32>,\n  @location(11) @interpolate(flat) heightBase: f32,\n}`],[`  out.worldPos = worldPos;\n  out.uvMeters = uv;`,`  out.worldPos = worldPos;\n  out.uvMeters = uv;\n  out.farLocal = vec3<f32>(position.x, localY, position.z);\n  out.heightBase = far_row(slot, 0u).x;`],[H2,N0],[w2,(d0??=$c0I(4))],[h2,(s0??=$c0I(3))],["  let worldPos = lume_worldFromRender(in.worldPos);",`  far_slot = in.slot;\n  far_local = in.farLocal;\n  let worldPos = in.farLocal;`],["        let cellSpace = (select(worldPos.xz, vec2<f32>(across, worldPos.y), isSide) * uvScale) / ",`        let cells = far_layerRow(far_slot, layerIndex, 0u);\n        let cellSpace = (select(cells.xy, vec2<f32>(select(cells.x, cells.y, acrossZ), cells.w), isSide) + select(worldPos.xz, vec2<f32>(across, worldPos.y), isSide) * uvScale) / `],["stochastic_offsetFor(corner, ",`stochastic_offsetFor(far_wrap(corner, cells.z / ${n.toFixed(2)}), `],["        uv = vec2<f32>(across, worldPos.y) * uvScale;","        uv = far_planeUv(layerIndex, acrossZ, vec2<f32>(across, worldPos.y), uvScale);"],[m2,(L0??=$c0I(2))]],j=q;for(let[X,J]of $){if(j.split(X).length!==2)throw Error("terrain far arm: a swap no longer stands once in the plain text");j=j.replace(X,J)}let Q="terrain_tilePhase(tileOrigin, uvScale)";if(j.split(Q).length<2)throw Error("terrain far arm: the tile phase no longer stands");j=j.split(Q).join("far_layerRow(far_slot, layerIndex, 1u).xy");let Z=j.slice(j.indexOf("@vertex"));for(let X of["terrain_noise2D(","terrain_fractalNoise","stochastic_tileSample(","terrain_tilePhase(","lume_worldFromRender(in.worldPos)"])if(Z.includes(X))throw Error("terrain far arm: a world-keyed read stands unswapped");let k="(height - pool.verticalMin) * pool.verticalRangeInv";return j.split(k).join("(height + out.heightBase) * pool.verticalRangeInv")})',()=>'(function(q,$,j="",Q=!1){let Z=`\n  let hL = terrain_heightTexel(heightTile, gridX, gridZ + 1);\n  let hR = terrain_heightTexel(heightTile, gridX + 2, gridZ + 1);\n  let hD = terrain_heightTexel(heightTile, gridX + 1, gridZ);\n  let hU = terrain_heightTexel(heightTile, gridX + 1, gridZ + 2);\n  let dx = (hR - hL) / (pool.spacing * 2.0);\n  let dz = (hU - hD) / (pool.spacing * 2.0);\n  out.normalLocal = normalize(vec3<f32>(-dx, 1.0, -dz));\n  if (arrival.x < 1.0) { out.normalLocal = normalize(mix(terrain_scaleNormal(heightTile, gridX, gridZ, i32(arrival.y)), out.normalLocal, arrival.x)); }\n  out.heightNorm = clamp((height - pool.verticalMin) * pool.verticalRangeInv, 0.0, 1.0);${$?`\n  out.groundBend = max(abs(hL + hR - 2.0 * height), abs(hD + hU - 2.0 * height)) / (pool.spacing * pool.spacing);`:""}`;return`${z0}\n\nstruct VsOut {\n  @builtin(position) @invariant position: vec4<f32>,\n  @location(0) worldPos: vec3<f32>,\n  @location(1) uvMeters: vec2<f32>,\n  @location(2) @interpolate(flat) tileOrigin: vec2<f32>,\n  @location(3) @interpolate(flat) slot: u32,\n  @location(4) viewZ: f32,\n  @location(5) normalLocal: vec3<f32>,\n  @location(6) heightNorm: f32,\n  @location(12) drawnHeight: f32,${$?`\n  @location(13) groundBend: f32,`:""}${Q?`\n  @location(14) @interpolate(flat) tileLayer: u32,`:""}\n}\n\n${o0(q)}\n  out.drawnHeight = groundY;\n  let localY = groundY - slotOrigin.x - TERRAIN_SURFACE_DRAW_DROP;\n  let worldPos = (transform * vec4<f32>(position.x, localY, position.z, 1.0)).xyz;\n  out.worldPos = worldPos;\n  out.uvMeters = uv;\n  out.tileOrigin = lume_worldFromRender(transform[3].xyz).xz;\n  out.slot = slot;${Q?`\n  out.tileLayer = terrain_tileLayer(slot);`:""}\n  let viewPos = frame.view * vec4<f32>(worldPos, 1.0);\n  out.viewZ = -viewPos.z;\n  out.position = frame.viewProj * vec4<f32>(worldPos, 1.0);\n${v3}${j}${Z}\n  return out;\n}`})']}],$c0XU=[0,6,10];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,12,129465378144256);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[0]]);var $c0I=$c0C.i;
;const{$Aj:x,DM3:V2,DYe:f2,Dq1:d3,Ebw:s3,GNc:n3,Ggy:S3,Jai:g3,Khe:Q3,LZG:F,NDw:w,Nx2:R3,PK8:N3,TwD:D3,VWW:g,Vfz:j3,ZB0:R,a7W:L3,aWy:q2,apd:d,b0T:K2,baH:E3,bin:_3,bjk:v,cYp:r3,eGX:j2,eWw:b,i2z:A3,iFn:t3,icb:Y3,jki:u,kM2:z,ke5:I3,lSa:i3,mR0:T3,nvi:e3,oRc:J3,unL:$3,vcF:l3,x4S:$2,yE3:o3,ynn:a3}=$Lr;
;;;;;var z3=`
fn wet_grazingGleam(roughness: f32) -> f32 {
  let x = 1.0 - roughness;
  return (0.0016 - 0.00088 * roughness + 0.9984 * (x * x * x + 0.0425 - 0.0275 * roughness)) / (1.0 - 0.047142832 * roughness);
}
fn wet_roughnessOfGleam(gleam: f32) -> f32 {
  var lo = 0.0;
  var hi = 1.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let mid = 0.5 * (lo + hi);
    let over = wet_grazingGleam(mid) > gleam;
    lo = select(lo, mid, over);
    hi = select(mid, hi, over);
  }
  return hi;
}
fn wet_roughness(dryRgb: vec3<f32>, dryRoughness: f32, wetRgb: vec3<f32>, wetRoughness: f32) -> f32 {
  let luma = vec3<f32>(0.2126, 0.7152, 0.0722);
  let dry = clamp(dot(dryRgb, luma), 0.0, 1.0);
  let wet = clamp(dot(wetRgb, luma), 0.0, 1.0);
  if (wet > dry) { return wetRoughness; }
  let dryLight = dry + (1.0 - dry) * wet_grazingGleam(clamp(dryRoughness, 0.0, 1.0));
  return max(wetRoughness, wet_roughnessOfGleam((dryLight - wet) / max(1.0 - wet, 1e-4)));
}`;var k3=function(q){let $=1-q;return(0.0016-0.00088*q+0.9984*($*$*$+0.0425-0.0275*q))/(1-0.047142832*q)};var u2=function(q){let $=0,j=1;for(let Q=0;Q<8;Q+=1){let Z=0.5*($+j);if(k3(Z)>q)$=Z;else j=Z}return j};var _0=function(q,$,j,Q){let Z=u(q),k=u(j);if(k>Z)return Q;let X=Z+(1-Z)*k3(u($));return Math.max(Q,u2((X-k)/Math.max(1-k,0.0001)))};var G=5;var C=6;var c=0.4;var v3="  if (abs(out.position.w) < 0.5 * out.position.z) { out.position.w = 0.5 * out.position.z; }";var l=`fn terrain_hash2D(p: vec2<f32>, seed: f32) -> f32 {
  var p3 = fract(vec3<f32>(p.x, p.y, p.x) * vec3<f32>(0.1031, 0.103, 0.0973));
  let shifted = p3 + vec3<f32>(dot(p3, p3.yzx + (vec3<f32>(seed) + vec3<f32>(33.33))));
  return fract((shifted.x + shifted.y) * shifted.z);
}

fn terrain_noise2D(p: vec2<f32>, seed: f32) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let a = terrain_hash2D(i, seed);
  let b = terrain_hash2D(i + vec2<f32>(1.0, 0.0), seed);
  let c = terrain_hash2D(i + vec2<f32>(0.0, 1.0), seed);
  let d = terrain_hash2D(i + vec2<f32>(1.0, 1.0), seed);
  let u = f * f * (vec2<f32>(3.0) - f * 2.0);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

//${b} cells, each to [-${b/2}, ${b/2}), so a reader that hashes and a reader that taps the lattice texture read one field at any distance. The macro drift is this noise for every reader.
fn terrain_latticeWrap(i: vec2<f32>) -> vec2<f32> {
  return i - ${b}.0 * floor((i + vec2<f32>(${b/2}.0)) / ${b}.0);
}

fn terrain_latticeNoise2D(p: vec2<f32>, seed: f32) -> f32 {
  let i = floor(p);
  let f = p - i;
  let a = terrain_hash2D(terrain_latticeWrap(i), seed);
  let b = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(1.0, 0.0)), seed);
  let c = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(0.0, 1.0)), seed);
  let d = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(1.0, 1.0)), seed);
  let u = f * f * (vec2<f32>(3.0) - f * 2.0);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}`;var X4=(`${l}

fn terrain_fractalNoise(p: vec2<f32>, seed: f32) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var frequency = 1.0;
  for (var octave = 0; octave < ${("3")}; octave++) {
    value += terrain_noise2D(p * frequency, seed + f32(octave) * 17.0) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return clamp(value, 0.0, 1.0);
}

`);var Z4=`fn terrain_paintNoise(p: vec2<f32>, seed: f32) -> f32 {
  return clamp(terrain_noise2D(p, seed) * 0.5 + terrain_noise2D(p * 2.0, seed + 17.0) * 0.25 + terrain_noise2D(p * 4.0, seed + 34.0) * 0.125, 0.0, 1.0);
}`;var f3=`fn terrain_wordLayers(word: u32) -> vec3<u32> { return (vec3<u32>(word) >> vec3<u32>(26u, 20u, 14u)) & vec3<u32>(0x3fu); }
fn terrain_wordQuanta(word: u32) -> vec3<u32> {
  let q = (vec2<u32>(word) >> vec2<u32>(7u, 0u)) & vec2<u32>(0x7fu);
  return vec3<u32>(q, ${d}u - min(q.x + q.y, ${d}u));
}`;var z4=`fn terrain_gradHash2(p: vec2<f32>) -> vec2<f32> {
  let px = dot(p, vec2<f32>(127.1, 311.7));
  let py = dot(p, vec2<f32>(269.5, 183.3));
  return fract(vec2<f32>(sin(px), sin(py)) * 43758.5453123) * 2.0 - 1.0;
}

fn terrain_gradientNoise2D(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let n00 = dot(terrain_gradHash2(i), f);
  let n10 = dot(terrain_gradHash2(i + vec2<f32>(1.0, 0.0)), f - vec2<f32>(1.0, 0.0));
  let n01 = dot(terrain_gradHash2(i + vec2<f32>(0.0, 1.0)), f - vec2<f32>(0.0, 1.0));
  let n11 = dot(terrain_gradHash2(i + vec2<f32>(1.0, 1.0)), f - vec2<f32>(1.0, 1.0));
  return mix(mix(n00, n10, u.x), mix(n01, n11, u.x), u.y);
}
`;var k4=`fn terrain_hilbert(p: vec2<i32>, level: i32) -> i32 {
  var d = 0;
  var pv = p;
  for (var i = 0; i < min(level, 16); i++) {
    let n = level - i - 1;
    let rx = (pv.x >> u32(n)) & 1;
    let ry = (pv.y >> u32(n)) & 1;
    d += ((3 * rx) ^ ry) << u32(2 * n);
    if (ry == 0) {
      if (rx == 1) {
        pv = vec2<i32>((1 << u32(n)) - 1) - pv;
      }
      pv = vec2<i32>(pv.y, pv.x);
    }
  }
  return d;
}

fn terrain_blueNoise(p: vec2<i32>, level: i32) -> f32 {
  let d = terrain_hilbert(p, level);
  let x = 0x80000000u + 2654435789u * u32(d);
  return f32(x) / 4294967296.0;
}
`;var n=0.5,K4=0.11,W=8,K3=`fn stochastic_hash2(p: vec2f, seed: f32) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7)) + seed) * 43758.5453);
}

struct StochasticTileSample {
  offsetA: vec2f,
  offsetB: vec2f,
  offsetC: vec2f,
  weights: vec3f,
}

fn stochastic_offsetFor(corner: vec2f, instanceSeed: f32) -> vec2f {
  let seeded = corner + vec2f(instanceSeed);
  return vec2f(stochastic_hash2(seeded, 17.0), stochastic_hash2(seeded, 31.0));
}

fn stochastic_tileSample(uv: vec2f, instanceSeed: f32) -> StochasticTileSample {
  let cellSpace = uv / ${0.5 .toFixed(2)};
  let base = floor(cellSpace);
  let local = fract(cellSpace);
  let upper = step(1.0, local.x + local.y);
  let cornerA = base + vec2f(upper, upper);
  let cornerB = base + vec2f(1.0, 0.0);
  let cornerC = base + vec2f(0.0, 1.0);
  let weightA = upper * (local.x + local.y - 1.0) + (1.0 - upper) * (1.0 - local.x - local.y);
  let weightB = upper * (1.0 - local.y) + (1.0 - upper) * local.x;
  let weightC = 1.0 - weightA - weightB;

  let offsetA = stochastic_offsetFor(cornerA, instanceSeed);
  let offsetB = stochastic_offsetFor(cornerB, instanceSeed);
  let offsetC = stochastic_offsetFor(cornerC, instanceSeed);

  let sharpA = pow(weightA, 8.0);
  let sharpB = pow(weightB, 8.0);
  let sharpC = pow(weightC, 8.0);
  let total = max(sharpA + sharpB + sharpC, 1e-6);

  var result: StochasticTileSample;
  result.offsetA = offsetA;
  result.offsetB = offsetB;
  result.offsetC = offsetC;
  result.weights = vec3f(sharpA, sharpB, sharpC) / total;
  return result;
}

fn stochastic_keepContrast(blend: vec4f, mean: vec4f, weights: vec3f) -> vec4f {
  return clamp(mean + (blend - mean) * inverseSqrt(max(dot(weights, weights), 1e-6)), vec4f(0.0), vec4f(1.0));
}`;var F4=20,B=0,P=1,S=2,i=3,I=7,m=11,A=12,H=13,T=14,O=15,r=16,t=17,Y4=18,o=19,U4=4,V3={none:0,stochastic:1},b4=0,y4=1,M4=2,p4=3;var U3=4;var b3=0;var y3=U3;var B4=4;var C2=65536;var M3=(q,$)=>Math.ceil(q*$/32);var P4=(q)=>q<=1?0:Math.ceil(Math.log2(q));var F3=32;var p3=(q)=>Math.ceil(q/F3)*F3;var m4=(q,$,j)=>p3(j+(1<<q)+M3($,q));var H4=(q,$)=>(q|$)>>>0;var h4=(q)=>(q&4294967264)>>>0;var w4=(q)=>q&31;function x3(q,$,j){return`fn ${q}(${$}entry: u32, texel: i32) -> u32 {
  let dictionary = (entry & 0xffffffe0u);
  let log = entry & 31u;
  if (log == 0u) { return ${j("dictionary")}; }
  let bit = u32(texel) * log;
  let at = dictionary + (1u << log) + (bit >> 5u);
  let shift = bit & 31u;
  var code = ${j("at")} >> shift;
  if (shift + log > 32u) { code |= ${j("at + 1u")} << (32u - shift); }
  return ${j("dictionary + extractBits(code, 0u, log)")};
}`}var u4=(q)=>p3(U3+q);var G4=(q)=>Uint32Array.of(q>0?1:0,0,0,0);var c3=17;var D=1<<c3;var W2=D-1;class B3{constructor(){this.keys=new Uint32Array(D);this.codes=new Uint16Array(D);this.stamps=new Uint32Array(D);this.stamp=0;}reset(){if(this.stamp=this.stamp+1>>>0,this.stamp===0)this.stamps.fill(0),this.stamp=1}codeOf(q,$){let j=Math.imul(q,2654435761)>>>32-c3;while(this.stamps[j]===this.stamp){if(this.keys[j]===q)return this.codes[j];j=j+1&W2}return this.stamps[j]=this.stamp,this.keys[j]=q,this.codes[j]=$,$}}var C4=new B3;function W4(a,b,c,d,e,f){return (W4=$c0C(0)).call(this,a,b,c,d,e,f)}function O4(q,$,j,Q){Q.fill(0,0,M3($,j));for(let Z=0,k=0;Z<$;Z++,k+=j){let X=k>>>5,J=k&31;if(Q[X]|=q[Z]<<J,J+j>32)Q[X+1]|=q[Z]>>>32-J}}var P3=`fn terrain_tilePhase(origin: vec2<f32>, repeatsPerMetre: f32) -> vec2<f32> {
  let high = bitcast<f32>(bitcast<u32>(repeatsPerMetre) & 0xfffff000u);
  return fract(fract(origin * high) + origin * (repeatsPerMetre - high));
}`;var m3=[0.9,1.08],H3=0.07,E=0.18,D2=0.06,g2=2,a2=0.08,L2=0.4,Y2="in.viewZ * frame.lensDepth",N2=`let heightInfluence = 1.0 - smoothstep(48.0, 96.0, ${Y2});`,s2=(q,$)=>`let heightBias = clamp((${q} - 0.5) * heightInfluence, -${E}, ${E});
let undecided = select(1.0, 1.0 - abs(heightBias) / ${E}, ${$});`,M=0.8,y=0.55,d2=2*y-M,l2=0.4,h3=2,w3=2,L=3,f={pbr:4,detailNormals:8,emissive:16,noise:32,gradient:64,heightTint:128,biplanar:256,carve:512,fineAlbedo:1024,stochastic:2048,wholeTiles:4096,textured:8192,wet:16384,pixel:32768},X3=16,U2=18,b2=[["hasPbrLayers","pbr"],["detailNormals","detailNormals"],["hasEmissiveLayers","emissive"],["hasNoiseLayers","noise"],["hasGradientLayers","gradient"],["hasHeightTint","heightTint"],["biplanar","biplanar"],["carvesSeams","carve"],["hasFineAlbedo","fineAlbedo"],["hasStochasticLayers","stochastic"],["textured","textured"],["wet","wet"],["hasPixelLayers","pixel"],["wholeTiles","wholeTiles"]];function M6(q){let $=q.tier&L|(q.drifts&3)<<X3|(q.layers&15)<<U2;for(let[j,Q]of b2)if(q[j])$|=f[Q];return $}function p6(q){let $={tier:q&L,drifts:q>>X3&3,layers:q>>U2&15};for(let[j,Q]of b2)$[j]=(q&f[Q])!==0;return $}var x6=44,n2=V2,c6={resolution:0,textureResolution:1,chunkWorldSize:2,skirtDepth:3,verticalMin:4,verticalRangeInv:5,spacing:6,maxSlot:7,layerCount:8,shading:9,holeHeapWord:10,morph:11,fallbackColorR:12,fallbackColorG:13,fallbackColorB:14,morphWalk:15,morphFrom:16,morphTo:20,morphHorizon:24,morphRowStep:28,morphErrorFrom:29,morphErrorTo:30,eyeUnder:31,yieldSide:32,renderOrigin:36,blendResolution:39,yieldWord:40},S2=0.002,B6=0.05,i2=`struct TerrainPool {
  resolution: f32,
  textureResolution: f32,
  chunkWorldSize: f32,
  skirtDepth: f32,
  verticalMin: f32,
  verticalRangeInv: f32,
  spacing: f32,
  maxSlot: f32,
  layerCount: f32,
  shading: f32,
  holeHeapWord: f32,
  morph: f32,
  fallbackColor: vec3<f32>,
  morphWalk: f32,
  morphFrom: vec4<f32>,
  morphTo: vec4<f32>,
  morphHorizon: vec4<f32>,
  morphRowStep: f32,
  morphErrorFrom: f32,
  morphErrorTo: f32,
  eyeUnder: f32,
  yieldSide: f32,
  renderOrigin: vec3<f32>,
  blendResolution: f32,
  yieldWord: f32,
}
const TERRAIN_SURFACE_DRAW_DROP: f32 = ${S2};`,I2=(q,$)=>`@group(${q}) @binding(${$}) var<storage, read> slotTransforms: array<mat4x4<f32>>;
fn terrain_slotTransform(slot: u32) -> mat4x4<f32> {
  let m = slotTransforms[slot];
  let shift = vec3<f32>(m[0].w, m[1].w, m[2].w) - pool.renderOrigin.xyz;
  return mat4x4<f32>(vec4<f32>(m[0].xyz, 0.0), vec4<f32>(m[1].xyz, 0.0), vec4<f32>(m[2].xyz, 0.0), vec4<f32>(m[3].xyz + shift, 1.0));
}`,A2=`@group(2) @binding(0) var<uniform> pool: TerrainPool;
@group(2) @binding(1) var<storage, read> heights: array<u32>;
@group(2) @binding(2) var<storage, read> blendWords: array<u32>;
@group(2) @binding(3) var<storage, read> layerParams: array<vec4<f32>>;
@group(2) @binding(4) var albedoArray: texture_2d_array<f32>;
@group(2) @binding(5) var atlasSampler: sampler;
@group(2) @binding(6) var nroArray: texture_2d_array<f32>;
@group(2) @binding(7) var albedoFine: texture_2d_array<f32>;
@group(2) @binding(${t3}) var nroFine: texture_2d_array<f32>;
${I2(3,0)}
@group(3) @binding(1) var<storage, read> slotOrigins: array<vec4<f32>>;`,y2=`  let tileChunkForm = (survivorSlot & ${R}u) != 0u;
  let tileSlot = survivorSlot & ~${R}u;
  let tileLast = u32(pool.resolution) - 1u;
  let tileCells = (tileLast + ${z-1}u) / ${z}u;
  let patchLast = select(tileCells, tileLast, tileChunkForm);
  let tilePatch = tileSlot % ${v}u;
  let tilePatchAt = vec2<u32>(tilePatch % ${z}u, tilePatch / ${z}u);
  let tilePatchOrigin = select(tilePatchAt * tileCells, vec2<u32>(0u), tileChunkForm);
  var ringLocal = vertexIndex;
  var ringStride = patchLast;
  var ringN = 2u;
  var ringLevel = true;
  for (var r = 0u; r < ${x.length}u; r++) {
    let stride = 1u << r;
    let n = (tileCells + stride - 1u) / stride + 1u;
    let span = n * n + 4u * n;
    if (ringLocal < span) { ringStride = stride; ringN = n; ringLevel = false; break; }
    ringLocal -= span;
  }
  let tileGridCount = ringN * ringN;
  var tileGx = 0u;
  var tileGz = 0u;
  var skirt = 0.0;
  var skirtAlong = vec2<i32>(0, 0);
  var skirtOut = vec2<f32>(0.0, 0.0);
  if (ringLocal < tileGridCount) {
    let cellFolds = tileChunkForm && tilePatch != 0u;
    tileGx = select(min((ringLocal % ringN) * ringStride, patchLast), 0u, cellFolds);
    tileGz = select(min((ringLocal / ringN) * ringStride, patchLast), 0u, cellFolds);
  } else {
    let s = ringLocal - tileGridCount;
    var edge = s / ringN;
    var p = min((s % ringN) * ringStride, patchLast);
    let ringSides = tilePatchAt.x % ${z-1}u == 0u;
    let ringBandX = (edge < 2u) == ringSides;
    let ringTurns = select(tilePatchAt.y, tilePatchAt.x, ringBandX) == ${z-1}u;
    skirt = select(1.0, 0.0, ringLevel && (edge & 1u) == 0u);
    edge = select(edge, select(2u, 0u, ringBandX) + u32(ringTurns), ringLevel);
    p = select(p, patchLast - p, ringLevel && (ringTurns != !ringSides));
    let alongZ = edge < 2u;
    let across = select(0u, patchLast, (edge & 1u) == 1u);
    tileGx = select(p, across, alongZ);
    tileGz = select(across, p, alongZ);
    skirtAlong = vec2<i32>(i32(!alongZ), i32(alongZ));
    let out = f32(edge & 1u) * 2.0 - 1.0;
    skirtOut = select(vec2<f32>(0.0, out), vec2<f32>(out, 0.0), alongZ);
  }`,M2=`  tileGx = min(tileGx + tilePatchOrigin.x, tileLast);
  tileGz = min(tileGz + tilePatchOrigin.y, tileLast);
  let position = vec3<f32>(f32(tileGx) * pool.spacing, 0.0, f32(tileGz) * pool.spacing);
  let uv = position.xz;`,P6=`${y2}
${M2}`,T2=`${y2}
  let tileLattice = vec2<u32>(tileGx, tileGz);
  let tileStitch = terrain_seamStitch(tileSlot, tilePatch, vec2<u32>(tileGx, tileGz), patchLast, ringStride);
  tileGx = tileStitch.x;
  tileGz = tileStitch.y;
${M2}`,r2=`  let slot = min(tileSlot / ${v}u, u32(pool.maxSlot));`,t2=`  let slotOrigin = slotOrigins[slot * ${F}u];
  let slotSides = slotOrigins[slot * ${F}u + 1u];`,a=x[4],p=x[2],Z3=a*4,o2=2,E2=-1,u3=-2,R2=Z3+0.5,e2=`fn terrain_besidePatch(word: f32, at: u32) -> i32 {
  if (word < 0.5) { return -1; }
  return i32(${v}u * (u32(word) - 1u) + at);
}

fn terrain_patchAcross(survivorSlot: u32, own: u32, side: u32, beside: vec4<f32>) -> i32 {
  let column = own % ${z}u;
  let row = own / ${z}u;
  if (side == 0u) { if (column > 0u) { return i32(survivorSlot) - 1; } return terrain_besidePatch(beside.x, own + ${z-1}u); }
  if (side == 1u) { if (column < ${z-1}u) { return i32(survivorSlot) + 1; } return terrain_besidePatch(beside.y, own - ${z-1}u); }
  if (side == 2u) { if (row > 0u) { return i32(survivorSlot) - ${z}; } return terrain_besidePatch(beside.z, own + ${v-z}u); }
  if (row < ${z-1}u) { return i32(survivorSlot) + ${z}; }
  return terrain_besidePatch(beside.w, own - ${v-z}u);
}

fn terrain_seamStitch(survivorSlot: u32, own: u32, at: vec2<u32>, last: u32, stride: u32) -> vec2<u32> {
  let onX = at.x == 0u || at.x == last;
  let onZ = at.y == 0u || at.y == last;
  if (onX == onZ) { return at; }
  let chunk = min(survivorSlot / ${v}u, u32(pool.maxSlot));
  let side = select(select(3u, 2u, at.y == 0u), select(1u, 0u, at.x == 0u), onX);
  let across = terrain_patchAcross(survivorSlot, own, side, slotOrigins[chunk * ${F}u + 2u]);
  if (across < 0 || terrain_patchYields(u32(across))) { return at; }
  let m = terrain_ringMemory[u32(across)];
  let drawn = select(1u << m, last, m > ${x.length-1}u);
  if (drawn <= stride) { return at; }
  let p = select(at.x, at.y, onX);
  let q = min(((p + drawn / 2u) / drawn) * drawn, last);
  return select(vec2<u32>(q, at.y), vec2<u32>(at.x, q), onX);
}`;function p2(q,$,j,Q){return`${`@group(${q}) @binding(${$}) var<storage, read> terrain_ringMemory: array<u32>;`}

fn terrain_seamFlush(survivorSlot: u32, own: u32, gx: i32, gz: i32, out: vec2<f32>) -> bool {
  let at = select(gz, gx, out.x != 0.0);
  if (at <= 0 || at >= i32(pool.resolution) - 1) { return false; }
  let across = u32(i32(own) + i32(out.x) + i32(out.y) * ${z});
  return across < ${v}u && !terrain_patchYields(survivorSlot - own + across);
}

${e2}

fn terrain_lineJoined(slot: u32, side: u32, arrival: vec2<f32>) -> bool {
  if (arrival.x < 1.0) { return false; }
  let beside = slotOrigins[slot * ${F}u + 2u];
  let word = beside[side];
  if (word < 0.5) { return false; }
  let across = min(u32(word) - 1u, u32(pool.maxSlot));
  let back = slotOrigins[across * ${F}u + 2u];
  let toward = back[side ^ 1u];
  return toward == f32(slot + 1u)${j?` && terrain_arrival(slotOrigins[across * ${F}u].zw).x >= 1.0`:""} && !terrain_pieceYields(across)${Q?" && terrain_chunkForm(slot) == terrain_chunkForm(across)":""};
}

fn terrain_chunkForm(slot: u32) -> bool {
  return terrain_ringMemory[slot * ${v}u] == ${I3}u;
}

fn terrain_pieceYields(slot: u32) -> bool {
  for (var p = 0u; p < ${v}u; p++) { if (terrain_patchYields(slot * ${v}u + p)) { return true; } }
  return false;
}`}var _=(q,$)=>$3()?`${q} & (-${$})`:`(${q} / ${$}) * ${$}`,x2=`  for (var q = 0u; q < passes * 3u; q++) {
    let half = q / 3u;
    let step = q - half * 3u;
    let unit = select(1, i32(words.y), half == 1u);
    if (step == 0u) {
      let reach = vec2<f32>(eye / f32(unit));
      let left = clamp((reach - pool.morphFrom.xz) * pool.morphFrom.yw, vec2<f32>(0.0), vec2<f32>(1.0));
      let toward = clamp((reach - pool.morphTo.xz) * pool.morphTo.yw, vec2<f32>(0.0), vec2<f32>(1.0));
      m = mix(left, toward, walk);
    }
    let share = select(m.y, m.x, step == 1u);
    if (step == 0u && half == 0u) {
      h = height;
    } else if (step == 0u || share > 0.0) {
      let stride = terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, select(select(${p} * unit, 2 * unit, step == 1u), unit, step == 0u));
      h = select(mix(h, stride, share), stride, step == 0u);
    }
    if (step == 2u) {
      if (half == 0u) { level = h; } else { start = h; }
    }
  }`,_2=`  if (passes == 1u) {
    let reach = vec2<f32>(eye);
    let left = clamp((reach - pool.morphFrom.xz) * pool.morphFrom.yw, vec2<f32>(0.0), vec2<f32>(1.0));
    let toward = clamp((reach - pool.morphTo.xz) * pool.morphTo.yw, vec2<f32>(0.0), vec2<f32>(1.0));
    let share = mix(left, toward, walk);
    if (share.x > 0.0) { h = mix(h, terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, 2), share.x); }
    if (share.y > 0.0) { h = mix(h, terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, ${p}), share.y); }
    level = h;
  } else {
${x2.replace(/^/gm,"  ")}
  }`,q0=()=>$3()?_2:x2;function $0(q,$=o3,j=!0){return`${p2(3,$,j,!0)}

${c2(q)}

fn terrain_skirtY(slot: u32, gx: i32, gz: i32, along: vec2<i32>, drawn: f32, origin: vec4<f32>, sides: vec4<f32>, transform: mat4x4<f32>, uv: vec2<f32>, stride: u32, arrival: vec2<f32>) -> f32 {
  let eye = frame.cameraPosition - (transform * vec4<f32>(uv.x, drawn - origin.x, uv.y, 1.0)).xyz;
${B2(!0)}
  let focal = max(frame.proj[1][1] * frame.lodHeight * 0.5, 1.0);
  let reach = select(length(eye), 1.0, frame.proj[3][3] > 0.5);
  let cover = min(pool.spacing, ${w(o2)} * reach / focal);
  if (joined) { return drawn - max(hang, cover); }
  return terrain_skirtLow(slot, gx, gz, along, drawn, cap) - max(hang, cover);
}

fn terrain_skirtFaces(transform: mat4x4<f32>, out: vec2<f32>, at: vec2<f32>) -> bool {
  if (pool.eyeUnder > 0.5 || frame.proj[3][3] > 0.5) { return true; }
  let edge = (transform * vec4<f32>(at.x, 0.0, at.y, 1.0)).xyz;
  let outward = (transform * vec4<f32>(out.x, 0.0, out.y, 0.0)).xyz;
  return dot(outward, frame.cameraPosition - edge) >= 0.0;
}`}function c2(q){return`fn terrain_skirtLow(slot: u32, gx: i32, gz: i32, along: vec2<i32>, drawn: f32, cap: i32) -> f32 {
  let at = vec2<i32>(gx, gz);
  let p = dot(at, along);
  let base = at - along * p;
  let last = i32(pool.resolution) - 1;
  let tile = ${q}_tile(slot);
  var low = min(drawn, ${q}(tile, gx + 1, gz + 1));
  for (var steps = 2; steps <= min(cap, ${Z3}); steps = steps * 2) {
    let p0 = ${_("p","steps")};
    let p1 = min(p0 + steps, last);
    let q0 = base + along * p0;
    let q1 = base + along * p1;
    let f = f32(p - p0) / f32(max(p1 - p0, 1));
    low = min(low, mix(${q}(tile, q0.x + 1, q0.y + 1), ${q}(tile, q1.x + 1, q1.y + 1), f));
  }
  return low;
}

fn terrain_skirtDip(slot: u32, gx: i32, gz: i32, along: vec2<i32>, reach: i32) -> f32 {
  let at = vec2<i32>(gx, gz);
  let p = dot(at, along);
  let base = at - along * p;
  let last = i32(pool.resolution) - 1;
  let q0 = max(p - reach, 1);
  let q1 = min(p + reach, last - 1);
  var dip = 0.0;
  if (q0 > q1) { return dip; }
  let a = base + along * (q0 - 1);
  let b = a + along;
  let tile = ${q}_tile(slot);
  var h0 = ${q}(tile, a.x + 1, a.y + 1);
  var h1 = ${q}(tile, b.x + 1, b.y + 1);
  for (var q = q0; q <= q1; q++) {
    let c = base + along * (q + 1);
    let h2 = ${q}(tile, c.x + 1, c.y + 1);
    dip = max(dip, (h0 + h2) * 0.5 - h1);
    h0 = h1;
    h1 = h2;
  }
  return dip;
}

fn terrain_lineRound(slot: u32, side: u32) -> f32 {
  let beside = slotOrigins[slot * ${F}u + 2u];
  let word = beside[side];
  if (word < 0.5) { return 0.0; }
  return max(${q}_lattice(min(u32(word) - 1u, u32(pool.maxSlot))) - ${q}_lattice(slot), 0.0);
}`}function B2(q){return`  let last = i32(pool.resolution) - 1;
  var chord = max(min(${a}, (last + ${z-1}) / ${z}), ${p});
${q?`  if (arrival.x < 1.0 && origin.w >= 2.0) { chord = max(chord, ${p} * i32(origin.w)); }
`:""}  var cap = min(chord, ${a});
  let at = select(gz, gx, along.y == 1);
  let chunkLine = at == 0 || at == last;
  let side = select(2u, 0u, along.y == 1) + u32(at == last);
  let line = sides[side];
  var hang = 0.0;
  var joined = false;
  if (chunkLine) {
    cap = select(i32(line), ${a}, line < 0.0);
    joined = line < 0.0 && terrain_lineJoined(slot, side, ${q?"arrival":"vec2<f32>(1.0)"});
    if (joined) {
      let rounding = terrain_lineRound(slot, side);
      if (line > ${w((E2+u3)/2)}) { return drawn - rounding; }
      hang = max(${w(u3)} - line, 0.0) + rounding;
    } else { hang = max(terrain_skirtDip(slot, gx, gz, along, i32(stride)), max(origin.y, (line - ${R2}) * f32(eye.y > 0.0))); }
  }`}function m6(a,b,c){return $c0C(1).call(this,a,b,c)}function j0(q){return`@builtin(vertex_index) vertexIndex: u32, ${N3(q,j3)}`}var Q0=`fn terrain_holeEdge(i: u32) -> f32 {
  return bitcast<f32>(heights[i]);
}

${Z2("terrain_holeCutGone","terrain_holeEdge")}

fn terrain_holeGone(slot: u32, cell: vec2<i32>, f: vec2<f32>) -> bool {
  let cells = u32(pool.resolution) - 1u;
  let tile = heights[slot * ${z2}u + ${k2}u];
  if (tile == 0u) { return false; }
  let word = bitcast<f32>(heights[tile + u32(cell.y) * cells + u32(cell.x)]);
  if (word <= 0.0) { return word < 0.0; }
  return terrain_holeCutGone(word, u32(pool.holeHeapWord) + u32(bitcast<f32>(heights[tile + cells * cells])), f);
}`,J0=`fn terrain_lowBilinear(tile: vec3u, texelF: vec2f) -> f32 {
  let r = min(vec2f(3.0), min(texelF, f32(terrain_texRes()) - texelF) - 0.5);
  return dot(2.25 / (r * r), vec2f(terrain_ringBilinear(tile, texelF, vec2f(r.x, 0.0)), terrain_ringBilinear(tile, texelF, vec2f(0.0, r.y))) - 2.0 * terrain_heightBilinear(tile, texelF));
}`,X0=`  let holeAt = in.uvMeters / pool.spacing;
  let holeCell = clamp(vec2<i32>(floor(holeAt)), vec2<i32>(0), vec2<i32>(i32(pool.resolution) - 2));
  if (terrain_holeGone(in.slot, holeCell, clamp(holeAt - vec2<f32>(holeCell), vec2<f32>(0.0), vec2<f32>(1.0)))) { discard; }`,Z0=1e4,h=16;function H6(q){return q>0?v+Math.ceil(q*q/h):0}var z0=`const TERRAIN_YIELD_SINK_M: f32 = ${Z0.toFixed(1)};

fn terrain_yieldCellGone(block: u32, side: u32, cells: u32, origin: vec2<u32>, last: u32, x: i32, z: i32) -> bool {
  if (x < 0 || z < 0 || u32(x) >= last || u32(z) >= last) { return true; }
  let cell = origin + vec2<u32>(u32(x), u32(z));
  if (cell.x >= cells || cell.y >= cells) { return true; }
  let chunk = (cell * side) / cells;
  let bit = chunk.y * side + chunk.x;
  return ((u32(bitcast<f32>(heights[block + ${v}u + bit / ${h}u])) >> (bit % ${h}u)) & 1u) != 0u;
}

fn terrain_yieldBlock(slot: u32, side: u32) -> u32 {
  return u32(pool.yieldWord) + slot * (${v}u + (side * side + ${h-1}u) / ${h}u);
}

fn terrain_patchYields(survivor: u32) -> bool {
  let side = u32(pool.yieldSide);
  return side != 0u && bitcast<f32>(heights[terrain_yieldBlock(min(survivor / ${v}u, u32(pool.maxSlot)), side) + survivor % ${v}u]) < 0.0;
}

fn terrain_yieldSunk(slot: u32, patchIndex: u32, origin: vec2<u32>, last: u32, at: vec2<u32>, stride: u32) -> bool {
  let side = u32(pool.yieldSide);
  if (side == 0u) { return false; }
  let cells = u32(pool.resolution) - 1u;
  let block = terrain_yieldBlock(slot, side);
  let whole = bitcast<f32>(heights[block + patchIndex]);
  if (whole < 0.0) { return true; }
  if (whole == 0.0 || stride != 1u) { return false; }
  let x = i32(at.x);
  let z = i32(at.y);
  return terrain_yieldCellGone(block, side, cells, origin, last, x - 1, z - 1) && terrain_yieldCellGone(block, side, cells, origin, last, x, z - 1) && terrain_yieldCellGone(block, side, cells, origin, last, x - 1, z) && terrain_yieldCellGone(block, side, cells, origin, last, x, z);
}`;var k0="  if (terrain_yieldSunk(slot, tilePatch, tilePatchOrigin, patchLast, tileLattice, ringStride)) { groundY -= TERRAIN_YIELD_SINK_M; }";var v0=()=>`
fn terrain_strideHeight(tile: vec3<u32>, gx: i32, gz: i32, stride: i32) -> f32 {
  let x0 = ${_("gx","stride")};
  let z0 = ${_("gz","stride")};
  if (x0 == gx && z0 == gz) { return terrain_heightTexel(tile, gx + 1, gz + 1); }
  let last = i32(pool.resolution) - 1;
  let x1 = min(x0 + stride, last);
  let z1 = min(z0 + stride, last);
  let fx = f32(gx - x0) / f32(max(x1 - x0, 1));
  let fz = f32(gz - z0) / f32(max(z1 - z0, 1));
  let h10 = terrain_heightTexel(tile, x1 + 1, z0 + 1);
  let h01 = terrain_heightTexel(tile, x0 + 1, z1 + 1);
  if (fx + fz <= 1.0) {
    let h00 = terrain_heightTexel(tile, x0 + 1, z0 + 1);
    return h00 + fx * (h10 - h00) + fz * (h01 - h00);
  }
  let h11 = terrain_heightTexel(tile, x1 + 1, z1 + 1);
  return h11 + (1.0 - fx) * (h01 - h11) + (1.0 - fz) * (h10 - h11);
}`;var h6=`fn terrain_casterHeight(slot: u32, gx: i32, gz: i32, height: f32, renderXZ: vec2<f32>, eyeXZ: vec2<f32>) -> f32 {
  if (pool.morph == 0.0) { return height; }
  let eye = length(renderXZ - eyeXZ);
  let near = vec2<f32>(max(eye - ${e.toFixed(1)}, 0.0));
  let far = vec2<f32>(eye + ${e.toFixed(1)});
  let least = min(clamp((near - pool.morphFrom.xz) * pool.morphFrom.yw, vec2<f32>(0.0), vec2<f32>(1.0)), clamp((near - pool.morphTo.xz) * pool.morphTo.yw, vec2<f32>(0.0), vec2<f32>(1.0)));
  let most = max(clamp((far - pool.morphFrom.xz) * pool.morphFrom.yw, vec2<f32>(0.0), vec2<f32>(1.0)), clamp((far - pool.morphTo.xz) * pool.morphTo.yw, vec2<f32>(0.0), vec2<f32>(1.0)));
  var h = height;
  if (most.x > 0.0) {
    let two = terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, ${x[1]});
    h = mix(h, two, select(least.x, most.x, two < h));
  }
  if (most.y > 0.0) {
    let four = terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, ${p});
    h = mix(h, four, select(least.y, most.y, four < h));
  }
  let narrow = min(pool.morphErrorFrom, pool.morphErrorTo);
  let wide = max(pool.morphErrorFrom, pool.morphErrorTo);
  if (wide > 0.0) { h = min(h, height + narrow * min(near.x, 1.0)); }
  if (narrow > 0.0) { h = max(h, height - wide * max(far.x, 1.0)); }
  return h;
}
`;var f0=(q)=>`const TERRAIN_MORPH_WALK_S: f32 = ${w(q2)};
const TERRAIN_HORIZON_THETA_STEP: f32 = ${E3/F2};

fn terrain_morphCoverage(anchor: f32) -> f32 {
  let a = clamp((frame.fadeTime - anchor) / TERRAIN_MORPH_WALK_S, 0.0, 1.0);
  return a * a * (3.0 - 2.0 * a);
}

${v0()}

fn terrain_localHeight(tile: vec3<u32>, local: vec2<f32>) -> f32 {
  return terrain_heightBilinear(tile, local / pool.spacing + vec2<f32>(1.5));
}

fn terrain_horizonHeight(slot: u32, uv: vec2<f32>, worldXZ: vec2<f32>, outside: f32) -> f32 {
  let rel = worldXZ - pool.morphHorizon.xy;
  let r = length(rel);
  let inner = pool.morphHorizon.z;
  let seam = pool.morphHorizon.w;
  let rowStep = pool.morphRowStep;
  if (rowStep <= 0.0 || r < inner || r >= seam) { return outside; }
  let rows = (r - inner) / rowStep;
  let row = floor(rows);
  let fr = rows - row;
  let r0 = inner + row * rowStep;
  let r1 = r0 + rowStep;
  var theta = atan2(rel.y, rel.x);
  if (theta < 0.0) { theta = theta + 6.283185307179586; }
  let columns = theta / TERRAIN_HORIZON_THETA_STEP;
  let column = floor(columns);
  let fc = columns - column;
  let d0 = vec2<f32>(cos(column * TERRAIN_HORIZON_THETA_STEP), sin(column * TERRAIN_HORIZON_THETA_STEP));
  let d1 = vec2<f32>(cos((column + 1.0) * TERRAIN_HORIZON_THETA_STEP), sin((column + 1.0) * TERRAIN_HORIZON_THETA_STEP));
  let centre = uv - rel;
  var hOuter = 0.0;
  var hInnerNext = 0.0;
  var hInner = 0.0;
  var hOuterNext = 0.0;
  let tile = terrain_heightTexel_tile(slot);
  for (var k = 0u; k <= ${q}; k++) {
    let at = select(select(select(d1 * r1, d0 * r0, k == 2u), d1 * r0, k == 1u), d0 * r1, k == 0u);
    let hk = terrain_localHeight(tile, centre + at);
    if (k == 0u) { hOuter = hk; } else if (k == 1u) { hInnerNext = hk; } else if (k == 2u) { hInner = hk; } else { hOuterNext = hk; }
  }
  var ring = 0.0;
  if (abs(hInner - hOuterNext) < abs(hOuter - hInnerNext)) {
    if (fr >= fc) {
      ring = hInner + fr * (hOuter - hInner) + fc * (hOuterNext - hOuter);
    } else {
      ring = hInner + fc * (hInnerNext - hInner) + fr * (hOuterNext - hInnerNext);
    }
  } else if (fr + fc <= 1.0) {
    ring = hInner + fr * (hOuter - hInner) + fc * (hInnerNext - hInner);
  } else {
    ring = hOuterNext + (1.0 - fr) * (hInnerNext - hOuterNext) + (1.0 - fc) * (hOuter - hOuterNext);
  }
  let edge = smoothstep(inner, inner + rowStep, r) * (1.0 - smoothstep(seam - rowStep, seam, r));
  return mix(outside, ring, edge);
}

fn terrain_arrival(words: vec2<f32>) -> vec2<f32> {
  if (pool.morph == 0.0 || words.y == 0.0) { return vec2<f32>(1.0); }
  let scale = select(max(round(pool.morphRowStep / pool.spacing), 1.0), words.y, words.y >= 2.0);
  return vec2<f32>(words.x, scale);
}

fn terrain_scaleNormal(tile: vec3<u32>, gx: i32, gz: i32, scale: i32) -> vec3<f32> {
  let hL = terrain_heightTexel(tile, gx + 1 - scale, gz + 1);
  let hR = terrain_heightTexel(tile, gx + 1 + scale, gz + 1);
  let hD = terrain_heightTexel(tile, gx + 1, gz + 1 - scale);
  let hU = terrain_heightTexel(tile, gx + 1, gz + 1 + scale);
  let across = pool.spacing * 2.0 * f32(scale);
  return normalize(vec3<f32>(-(hR - hL) / across, 1.0, -(hU - hD) / across));
}

fn terrain_drawnHeight(slot: u32, gx: i32, gz: i32, height: f32, transform: mat4x4<f32>, uv: vec2<f32>, words: vec2<f32>, arrival: vec2<f32>) -> f32 {
  if (pool.morph == 0.0) { return height; }
  if (arrival.x >= 1.0 && ((gx | gz) & ${p-1}) == 0) { return height; }
  let renderXZ = (transform * vec4<f32>(uv.x, 0.0, uv.y, 1.0)).xz;
  let eye = length(renderXZ - frame.cameraPosition.xz);
  let walk = terrain_morphCoverage(pool.morphWalk);
  let passes = select(1u, 2u, arrival.x < 1.0 && words.y >= 2.0);
  var level = height;
  var start = height;
  var h = height;
  var m = vec2<f32>(0.0);
${q0()}
  let hold = mix(select(0.0, 1.0, pool.morphErrorFrom > 0.0), select(0.0, 1.0, pool.morphErrorTo > 0.0), walk);
  if (hold > 0.0) {
    let limit = mix(pool.morphErrorFrom, pool.morphErrorTo, walk) * select(eye, 1.0, frame.proj[3][3] > 0.5);
    level = mix(level, height + clamp(level - height, -limit, limit), hold);
  }
  if (arrival.x >= 1.0) { return level; }
  if (words.y < 2.0) {
    start = level;
    if (words.y < 0.0) {
      start = terrain_horizonHeight(slot, uv, lume_worldFromRender(vec3<f32>(renderXZ.x, 0.0, renderXZ.y)).xz, level);
    }
  }
  return mix(start, level, terrain_arrivalAt(slot, gx, gz, arrival.x));
}

fn terrain_arrivalAt(slot: u32, gx: i32, gz: i32, share: f32) -> f32 {
  let last = max(f32(i32(pool.resolution) - 1), 1.0);
  let g = vec4<f32>(f32(gx), last - f32(gx), f32(gz), last - f32(gz));
  let hold = select(saturate(1.0 - g / last), vec4<f32>(0.0), slotOrigins[slot * ${F}u + 1u] > vec4<f32>(${Z3}.25));
  return mix(share, 1.0, max(max(hold.x, hold.y), max(hold.z, hold.w)));
}`;var K0=`fn terrain_wordStep() -> i32 {
  return max(i32(round((pool.blendResolution - 1.0) / max(pool.resolution - 1.0, 1.0))), 1);
}
fn terrain_vertexWordAt(slot: u32, gridX: i32, gridZ: i32) -> u32 {
  let step = terrain_wordStep();
  return terrain_blendWordAt(slot, gridX * step + 1, gridZ * step + 1);
}
fn terrain_wordCornerHeights(tile: vec3<u32>, gx: i32, gz: i32) -> vec4<f32> {
  let step = terrain_wordStep();
  let word = max(vec2<i32>(gx - 1, gz - 1), vec2<i32>(0));
  let cell = word / step;
  let share = 1.0 / f32(step);
  let low = vec2<f32>(word - cell * step) * share;
  let high = low + vec2<f32>(share);
  let near = vec2<f32>(terrain_heightTexel(tile, cell.x + 1, cell.y + 1), terrain_heightTexel(tile, cell.x + 1, cell.y + 2));
  let far = vec2<f32>(terrain_heightTexel(tile, cell.x + 2, cell.y + 1), terrain_heightTexel(tile, cell.x + 2, cell.y + 2));
  let columnLow = mix(near, far, low.x);
  let columnHigh = mix(near, far, high.x);
  return vec4<f32>(mix(columnLow.x, columnLow.y, low.y), mix(columnHigh.x, columnHigh.y, low.y), mix(columnLow.x, columnLow.y, high.y), mix(columnHigh.x, columnHigh.y, high.y));
}`;var V0=`fn terrain_blendTexRes() -> i32 {
  return i32(pool.blendResolution) + 2;
}
fn terrain_blendRow(z: i32) -> i32 {
  let texRes = terrain_blendTexRes();
  return clamp(z, 0, texRes - 1) * texRes;
}
fn terrain_blendCol(x: i32) -> i32 {
  return clamp(x, 0, terrain_blendTexRes() - 1);
}
fn terrain_blendEntry(slot: u32) -> u32 {
  return blendWords[${y3}u + slot];
}
${x3("terrain_blendCodedWord","",(q)=>`blendWords[${q}]`)}
fn terrain_blendWordAt(slot: u32, x: i32, z: i32) -> u32 {
  return terrain_blendCodedWord(terrain_blendEntry(slot), terrain_blendRow(z) + terrain_blendCol(x));
}
${K0}
${f3}
fn terrain_layerOf(slot: u32, local: u32) -> u32 {
  if (blendWords[${b3}u] == 0u) { return local; }
  return blendWords[(terrain_blendEntry(slot) & 0xffffffe0u) - ${n2}u + local];
}`;var F0=`  let wordCol0 = terrain_blendCol(gx);
  let wordCol1 = terrain_blendCol(gx + 1);
  let wordRow0 = terrain_blendRow(gz);
  let wordRow1 = terrain_blendRow(gz + 1);
  let wordEntry = terrain_blendEntry(in.slot);
  let word00 = terrain_blendCodedWord(wordEntry, wordRow0 + wordCol0);
  let word10 = terrain_blendCodedWord(wordEntry, wordRow0 + wordCol1);
  let word01 = terrain_blendCodedWord(wordEntry, wordRow1 + wordCol0);
  let word11 = terrain_blendCodedWord(wordEntry, wordRow1 + wordCol1);`;var Y0=`fn terrain_paramsRow(layer: u32, row: u32) -> vec4<f32> {
  return layerParams[row * u32(pool.layerCount) + min(layer, u32(pool.layerCount) - 1u)];
}`;var U0=`fn terrain_texRes() -> i32 {
  return i32(pool.textureResolution);
}

${v2("terrain_heightTexel")}

fn terrain_texel(i: i32) -> u32 {
  return u32(clamp(i, 0, terrain_texRes() - 1));
}`;var b0=(q)=>`${U0}

fn terrain_heightBilinear(tile: vec3<u32>, texelF: vec2<f32>) -> f32 {
  let p = texelF - vec2<f32>(0.5);
  let i0 = floor(p);
  let f = p - i0;
  let x0 = i32(i0.x);
  let z0 = i32(i0.y);
  let col0 = terrain_texel(x0);
  let col1 = terrain_texel(x0 + 1);
  let row0 = terrain_texel(z0);
  let row1 = terrain_texel(z0 + 1);
  let texRes = u32(terrain_texRes());
  let h00 = terrain_heightTexel_post(tile, col0, row0, texRes);
  let h10 = terrain_heightTexel_post(tile, col1, row0, texRes);
  let h01 = terrain_heightTexel_post(tile, col0, row1, texRes);
  let h11 = terrain_heightTexel_post(tile, col1, row1, texRes);
  return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}

fn terrain_ringBilinear(tile: vec3u, texelF: vec2f, d: vec2f) -> f32 {
${q==="3u"?"  return terrain_heightBilinear(tile, texelF - d) + terrain_heightBilinear(tile, texelF + d);":`  var sum = 0.0;
  for (var i = 0u; i <= ${q}; i += 2u) {
    sum += terrain_heightBilinear(tile, texelF + d * (f32(i & 2u) - 1.0));
  }
  return sum;`}
}

${f0(q)}

${V0}

${Y0}

${J2("terrain_floorGradScale")}

fn terrain_projectionShares(normal: vec3<f32>) -> vec3<f32> {
  let facing = abs(normal);
  let top = smoothstep(${y}, ${M}, facing.y);
  let across = facing.xz / max(length(facing.xz), 1e-6);
  let planes = smoothstep(vec2<f32>(${y}), vec2<f32>(${M}), across);
  return vec3<f32>(top, planes / max(planes.x + planes.y, 1e-6) * (1.0 - top));
}
`;var y0=j2("terrain_applyTint");var M0=$2("terrain_applyTintFold");var p0=`fn terrain_preJoinColor(word: f32, tint: vec3<f32>, fold: vec3<f32>) -> vec3<f32> {
  if (word < 0.5) { return tint; }
  let hex = u32(word - 1.0);
  let srgb = vec3<f32>(f32((hex >> 16u) & 255u), f32((hex >> 8u) & 255u), f32(hex & 255u)) / 255.0;
  let linear = select(pow(srgb * 0.9478672986 + 0.0521327014, vec3<f32>(2.4)), srgb * 0.0773993808, srgb < vec3<f32>(0.04045));
  return terrain_applyTintFold(linear, tint, fold);
}`;function w6(q,$,j,Q,Z,k,X,J,K){if(j<0.5){q[$]=Q,q[$+1]=Z,q[$+2]=k;return}let V=Math.trunc(j-1),Y=g((V>>>16&255)/255),U=g((V>>>8&255)/255),N=g((V&255)/255),s=Y*0.2126+U*0.7152+N*0.0722;q[$]=Y*K+Q*(Y*X+s*J),q[$+1]=U*K+Z*(U*X+s*J),q[$+2]=N*K+k*(N*X+s*J)}var x0=`    let detailFade = 1.0 - smoothstep(60.0, 140.0, ${Y2}) * 0.65;
    let detailTs = mix(vec3<f32>(0.0, 0.0, 1.0), finalNormalTs, detailFade);
    let geoTs = vec3<f32>(normalLocal.x, normalLocal.z, normalLocal.y);
    let combinedTs = vec3<f32>(geoTs.xy + detailTs.xy, max(geoTs.z * detailTs.z, 1e-4));
    N = normalize(vec3<f32>(combinedTs.x, combinedTs.z, combinedTs.y) + finalSideRelief * detailFade);`;function c0(q){return`let groundWet = passLights.groundWet;
if (groundWet > 0.0) {
  let facesSky = clamp(N.y, 0.0, 1.0);
  let soak = groundWet * facesSky;
  let lowness = clamp(${q} / 0.35, 0.0, 1.0);
  let puddle = smoothstep(0.2, 0.8, lowness) * groundWet * groundWet * facesSky;
  let dryAlbedo = finalAlbedo;
  let soaked = finalAlbedo * (1.0 - 0.45 * soak);
  finalAlbedo = soaked * (1.0 - 0.35 * puddle);
  let film = mix(roughness, 0.3, soak);
  let soakRoughness = select(film, wet_roughness(dryAlbedo, roughness, soaked, film), passLights.iblParams.x > 0.0);
  roughness = mix(soakRoughness, 0.04, puddle);
  N = normalize(mix(N, vec3<f32>(0.0, 1.0, 0.0), puddle));
}`}var B0=`fn terrain_applyMacroNoise(color: vec3<f32>, noise: vec2<f32>, hueRadians: f32, value: f32) -> vec3<f32> {
  if (hueRadians == 0.0 && value == 0.0) { return color; }
  let n = noise.x;
  let h = noise.y;
  let shaded = color * (1.0 + (n - 0.5) * 2.0 * value);
  let angle = (h - 0.5) * 2.0 * hueRadians;
  let k = vec3<f32>(0.57735026919);
  let cosA = cos(angle);
  let sinA = sin(angle);
  return max(shaded * cosA + cross(k, shaded) * sinA + k * dot(k, shaded) * (1.0 - cosA), vec3<f32>(0.0));
}`,P0=`fn terrain_macroNoise(worldXZ: vec2<f32>, scaleMeters: f32) -> vec2<f32> {
  let p = worldXZ / scaleMeters;
  let n = terrain_latticeNoise2D(p, 71.0) * 0.6667 + terrain_latticeNoise2D(p * 2.3 + vec2<f32>(13.7, 5.1), 89.0) * 0.3333;
  let h = terrain_latticeNoise2D(p * 0.7 + vec2<f32>(41.3, 27.9), 107.0);
  return vec2<f32>(n, h);
}`,m0=`${P0}
${B0}
fn terrain_applyMacro(color: vec3<f32>, worldXZ: vec2<f32>, scaleMeters: f32, hueRadians: f32, value: f32) -> vec3<f32> {
  if (hueRadians == 0.0 && value == 0.0) { return color; }
  return terrain_applyMacroNoise(color, terrain_macroNoise(worldXZ, scaleMeters), hueRadians, value);
}`,H0=`fn terrain_colorFromStops(s0: vec4<f32>, s1: vec4<f32>, s2: vec4<f32>, s3: vec4<f32>, t: f32, stopCount: f32) -> vec3<f32> {
  var color = s0.rgb;
  color = mix(color, s1.rgb, smoothstep(s0.a, max(s1.a, s0.a + 1e-4), t) * f32(stopCount > 1.5));
  color = mix(color, s2.rgb, smoothstep(s1.a, max(s2.a, s1.a + 1e-4), t) * f32(stopCount > 2.5));
  color = mix(color, s3.rgb, smoothstep(s2.a, max(s3.a, s2.a + 1e-4), t) * f32(stopCount > 3.5));
  return color;
}`,h0=`
fn terrain_noisePlane(worldPos: vec3<f32>, plane: u32) -> vec2<f32> {
  return select(select(worldPos.xy, worldPos.zy, plane == 1u), worldPos.xz, plane == 0u);
}
fn terrain_noiseShares(sideWeight: f32, sideShare: vec2<f32>) -> vec3<f32> {
  return vec3<f32>(1.0 - sideWeight, sideWeight * sideShare.x, sideWeight * sideShare.y);
}
fn terrain_noiseShare(shares: vec3<f32>, plane: u32) -> f32 {
  return select(select(shares.z, shares.y, plane == 1u), shares.x, plane == 0u);
}`,w0=`
fn terrain_patinaRoughness(sample: f32, intensity: f32) -> f32 {
  let polished = sample * min(intensity, 1.0);
  let matte = clamp(intensity - 1.0, 0.0, 1.0);
  return clamp(mix(polished, 1.0, matte), 0.0, 1.0);
}`,u0=`${w0}

fn terrain_sideRelief(planeX: vec2<f32>, planeZ: vec2<f32>, strength: f32, sideShare: vec2<f32>, geoNormal: vec3<f32>) -> vec3<f32> {
  let x = patina_packedNormalTs(vec4<f32>(planeX, 0.0, 0.0), strength) * vec3<f32>(1.0, -1.0, 1.0);
  let z = patina_packedNormalTs(vec4<f32>(planeZ, 0.0, 0.0), strength) * vec3<f32>(1.0, -1.0, 1.0);
  return sideShare.x * vec3<f32>(geoNormal.x * (x.z - 1.0), x.y, x.x) + sideShare.y * vec3<f32>(z.x, z.y, geoNormal.z * (z.z - 1.0));
}

fn terrain_luma(rgb: vec3<f32>) -> f32 {
  return dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722));
}

fn terrain_albedoTexelAtMip(layerDdx: vec2<f32>, layerDdy: vec2<f32>, texSize: vec2<f32>) -> vec2<f32> {
  let footprint = max(length(layerDdx * texSize), length(layerDdy * texSize));
  let mip = floor(max(0.0, log2(max(footprint, 1e-6))));
  return vec2<f32>(exp2(mip)) / texSize;
}`,G0=(q)=>`
fn terrain_albedoTexels(fine: vec2<f32>) -> vec2<f32> {
  if (${q}) { return vec2<f32>(textureDimensions(albedoFine, 0)); }
  return vec2<f32>(textureDimensions(albedoArray, 0));
}

fn terrain_albedoGrad(uv: vec2<f32>, mainLayer: i32, fine: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>) -> vec4<f32> {
  if (${q}) { return textureSampleGrad(albedoFine, atlasSampler, uv, i32(fine.x - 1.0), ddx, ddy); }
  return textureSampleGrad(albedoArray, atlasSampler, uv, mainLayer, ddx, ddy);
}

fn terrain_albedoLevel(uv: vec2<f32>, mainLayer: i32, fine: vec2<f32>, lod: f32) -> vec4<f32> {
  if (${q}) { return textureSampleLevel(albedoFine, atlasSampler, uv, i32(fine.x - 1.0), lod); }
  return textureSampleLevel(albedoArray, atlasSampler, uv, mainLayer, lod);
}`,C0=(q)=>`
fn terrain_nroTexels(nfine: vec2<f32>) -> vec2<f32> {
  if (${q}) { return vec2<f32>(textureDimensions(nroFine, 0)); }
  return vec2<f32>(textureDimensions(nroArray, 0));
}

fn terrain_nroGrad(uv: vec2<f32>, mainLayer: i32, nfine: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>) -> vec4<f32> {
  if (${q}) { return textureSampleGrad(nroFine, atlasSampler, uv, i32(nfine.x - 1.0), ddx, ddy); }
  return textureSampleGrad(nroArray, atlasSampler, uv, mainLayer, ddx, ddy);
}`,W0=X2("terrain_pixelEdgeUv"),O0=`${u0}

${W0}

${G0("fine.x >= 1.0")}

${C0("nfine.x >= 1.0")}`,D0=`${H0}

${y0}

${M0}

${p0}

${m0}

fn terrain_macroScaleOf(layer: u32) -> f32 {
  return terrain_paramsRow(layer, ${A}u).w;
}

${h0}
fn terrain_jobNoise(point: vec2<f32>, k: u32, frequency: f32, isDither: bool, isMacro: bool, isMv: bool, macroScale: f32, aux: vec4<f32>, index: u32) -> f32 {
  let macroP = point / macroScale;
  let p = (point * ${G}.0) * frequency;
  if (isDither) { return terrain_lattice3(point * ${C}.0 + vec2<f32>(f32(index) * 37.0, f32(index) * 59.0)); }
  if (isMacro) {
    if (k == 0u) { return terrain_lattice0(macroP); }
    if (k == 1u) { return terrain_lattice1(macroP * 2.3 + vec2<f32>(13.7, 5.1)); }
    return terrain_lattice2(macroP * 0.7 + vec2<f32>(41.3, 27.9));
  }
  if (isMv) {
    if (k == 0u) { return terrain_lattice3(p); }
    return terrain_lattice1(p);
  }
  return terrain_noise2D((point / max(aux.x, 1e-4)) * frequency, aux.y + f32(k) * 17.0);
}
${O0}
`,g0=`  let shading = u32(pool.shading);
  let tier = shading & ${L}u;
  let pbr = (shading & ${f.pbr}u) != 0u;
  let carve = (shading & ${f.carve}u) != 0u;
  let detail = (shading & ${f.detailNormals}u) != 0u;
  let biplanar = (shading & ${f.biplanar}u) != 0u;
  let candidateCount = ${g2}u;
  let sharpen = tier < 2u && (carve || tier == 0u);
  let shadesNormals = tier < 2u && (pbr || detail);
  let nroTaps = pbr && tier < 2u;
  let derivesNormal = detail && tier < 2u;
  let drifts = (shading >> ${X3}u) & 3u;`,a0="0.5",q3="1.5",P2="2.5",m2=`      var v = 0.0;
      let topAlone = isDither || isMacro || noisePlanes.x >= 1.0;
      for (var plane = select(planeFirst, 0u, topAlone); plane < select(3u, 1u, topAlone); plane++) {
        let share = select(terrain_noiseShare(noisePlanes, plane), 1.0, topAlone);
        if (share > 0.0) { v += share * terrain_jobNoise(terrain_noisePlane(worldPos, plane), k, frequency, isDither, isMacro, isMv, macroScale, aux, index); }
      }`,L0,H2="    let macroJobs = select(0u, 3u, live && whole && drifts >= 2u);",N0="    let macroJobs = 0u;",h2="    mixed = terrain_applyMacroNoise(mixed, terrain_drift(worldPos.xz, terrain_macroScaleOf(firstLayer)), driftRow.w, driftRow.z);",s0,w2="      let macroNoise = vec2<f32>(macroN.x * 0.6667 + macroN.y * 0.3333, macroN.z);",d0,l0=`struct TerrainLayerSurface {
  color: vec3<f32>,
  height: f32,
  heightPacked: f32,
  normalTs: vec3<f32>,
  roughness: f32,
  metalness: f32,
  emissive: vec3<f32>,
  sideRelief: vec3<f32>,
}

fn terrain_layerSurface(layerIndex: u32, baseUv: vec2<f32>, tileOrigin: vec2<f32>, uvDdx: vec2<f32>, uvDdy: vec2<f32>, worldPos: vec3<f32>, heightNorm: f32, worldDdx: vec3<f32>, worldDdy: vec3<f32>, sideWeight: f32, sideShare: vec2<f32>, geoNormal: vec3<f32>, includeNro: bool, deriveNormal: bool, stopNoise: f32, meanResponse: bool) -> TerrainLayerSurface {
  var surface: TerrainLayerSurface;
  surface.color = vec3<f32>(0.0);
  surface.height = 0.5;
  surface.heightPacked = 0.0;
  surface.normalTs = vec3<f32>(0.0, 0.0, 1.0);
  surface.roughness = 1.0;
  surface.metalness = 0.0;
  surface.emissive = vec3<f32>(0.0);
  surface.sideRelief = vec3<f32>(0.0);
  let shading = u32(pool.shading);
  let tier = shading & ${L}u;
  let pbr = (shading & ${f.pbr}u) != 0u;
  let carve = (shading & ${f.carve}u) != 0u;
  let biplanar = (shading & ${f.biplanar}u) != 0u;
  let layerType = terrain_paramsRow(layerIndex, ${B}u).x;
  if (layerType < ${a0}) {
    let top = sideWeight < 1.0;
    let side = biplanar && sideWeight > 1e-3;
    let stochastic = tier < 2u && u32(terrain_paramsRow(layerIndex, ${H}u).y) == ${V3.stochastic}u;
    let antiTiling = top && stochastic;
    let sideJitter = side && stochastic;
    let nroOn = includeNro && terrain_paramsRow(layerIndex, ${m}u).x >= 0.0;
    let derive = top && !nroOn && deriveNormal;
    let fineRow = terrain_paramsRow(layerIndex, ${r}u).xy;
    let albedoTexels = terrain_albedoTexels(fineRow);
    let nroFineRow = terrain_paramsRow(layerIndex, ${t}u).xy;
    let pixelEdge = terrain_paramsRow(layerIndex, ${t}u).z;
    let nroTexels = terrain_nroTexels(nroFineRow);
    var topAlbedo = vec4<f32>(0.0);
    var topNro = vec3<f32>(0.0);
    var sideAlbedo = vec4<f32>(0.0);
    var sideRough = 0.0;
    var sideNroX = vec2<f32>(0.0);
    var sideNroZ = vec2<f32>(0.0);
    var lumaCentre = 0.0;
    var lumaU = 0.0;
    var lumaV = 0.0;
    var jitterFirst = 0.0;
    for (var t = 0u; t < groundDraw.twelve; t++) {
      let isTop = t < 3u;
      let isSide = t >= 6u;
      let isDerive = !isTop && !isSide;
      let acrossZ = t < 9u;
      let k = select(t, select(t - 9u, t - 6u, acrossZ), isSide);
      let planeShare = select(sideShare.y, sideShare.x, acrossZ);
      var on = false;
      if (isTop) { on = top && (t == 0u || antiTiling); }
      else if (isDerive) { on = derive && (t != 3u || antiTiling); }
      else { on = side && planeShare > 0.0 && (k == 0u || sideJitter); }
      if (!on) { continue; }
      let mainRow = terrain_paramsRow(layerIndex, ${B}u);
      let uvScale = mainRow.z;
      let lodFloor = terrain_paramsRow(layerIndex, ${O}u).xy;
      let albedoLodFloor = select(lodFloor.x, fineRow.y, fineRow.x >= 1.0);
      let layerUv = terrain_tilePhase(tileOrigin, uvScale) + baseUv * uvScale;
      let layerDdx = uvDdx * uvScale;
      let layerDdy = uvDdy * uvScale;
      var uv = layerUv;
      var gx = layerDdx;
      var gy = layerDdy;
      var w = 1.0;
      let across = select(worldPos.x, worldPos.z, acrossZ);
      if (isSide) {
        let acrossDdx = select(worldDdx.x, worldDdx.z, acrossZ);
        let acrossDdy = select(worldDdy.x, worldDdy.z, acrossZ);
        uv = vec2<f32>(across, worldPos.y) * uvScale;
        gx = vec2<f32>(acrossDdx, worldDdx.y) * uvScale;
        gy = vec2<f32>(acrossDdy, worldDdy.y) * uvScale;
      }
      let jit = (isTop && antiTiling) || (isSide && sideJitter);
      var weights = vec3<f32>(0.0);
      if (jit) {
        let cellSpace = (select(worldPos.xz, vec2<f32>(across, worldPos.y), isSide) * uvScale) / ${n.toFixed(2)};
        let cellBase = floor(cellSpace);
        let cellLocal = fract(cellSpace);
        let upper = step(1.0, cellLocal.x + cellLocal.y);
        let weightA = upper * (cellLocal.x + cellLocal.y - 1.0) + (1.0 - upper) * (1.0 - cellLocal.x - cellLocal.y);
        let weightB = upper * (1.0 - cellLocal.y) + (1.0 - upper) * cellLocal.x;
        let weightC = 1.0 - weightA - weightB;
        let sharpA = pow(weightA, ${W}.0);
        let sharpB = pow(weightB, ${W}.0);
        let sharpC = pow(weightC, ${W}.0);
        let total = max(sharpA + sharpB + sharpC, 1e-6);
        weights = vec3<f32>(sharpA, sharpB, sharpC) / total;
        w = terrain_f3(weights, k);
        jitterFirst = weights.x;
        let corner = select(select(cellBase + vec2f(0.0, 1.0), cellBase + vec2f(1.0, 0.0), k == 1u), cellBase + vec2f(upper, upper), k == 0u);
        uv = uv + stochastic_offsetFor(corner, f32(layerIndex) * 13.0);
      } else if (t == 4u || t == 5u) {
        let texel = terrain_albedoTexelAtMip(layerDdx * terrain_floorGradScale(layerDdx, layerDdy, albedoTexels, albedoLodFloor), layerDdy * terrain_floorGradScale(layerDdx, layerDdy, albedoTexels, albedoLodFloor), albedoTexels);
        uv = layerUv + select(vec2<f32>(0.0, texel.y), vec2<f32>(texel.x, 0.0), t == 4u);
      }
      let albedoFloor = terrain_floorGradScale(gx, gy, albedoTexels, albedoLodFloor);
      var a = terrain_albedoGrad(terrain_pixelEdgeUv(uv, gx, gy, albedoTexels, pixelEdge), i32(max(mainRow.y, 0.0)), fineRow, gx * albedoFloor, gy * albedoFloor);
      if (jit) { a = stochastic_keepContrast(a, terrain_albedoLevel(uv, i32(max(mainRow.y, 0.0)), fineRow, 32.0), weights); }
      var n = vec3<f32>(0.0);
      if (nroOn && (isTop || pbr)) {
        let nroFloor = terrain_floorGradScale(gx, gy, nroTexels, select(lodFloor.y, nroFineRow.y, nroFineRow.x >= 1.0));
        n = terrain_nroGrad(terrain_pixelEdgeUv(uv, gx, gy, nroTexels, pixelEdge), i32(max(terrain_paramsRow(layerIndex, ${m}u).x, 0.0)), nroFineRow, gx * nroFloor, gy * nroFloor).xyz;
      }
      if (isTop) {
        if (!antiTiling || t == 0u) { topAlbedo = a; topNro = n; }
        else if (t == 1u) { topAlbedo = topAlbedo * jitterFirst + a * w; topNro = topNro * jitterFirst + n * w; }
        else { topAlbedo = topAlbedo + a * w; topNro = topNro + n * w; }
      } else if (isSide) {
        let share = w * planeShare;
        sideAlbedo += a * share;
        sideRough += n.z * share;
        if (acrossZ) { sideNroX += n.xy * w; } else { sideNroZ += n.xy * w; }
      } else {
        let luma = terrain_luma(a.rgb);
        if (t == 3u) { lumaCentre = luma; } else if (t == 4u) { lumaU = luma; } else { lumaV = luma; }
      }
    }
    let mainRow = terrain_paramsRow(layerIndex, ${B}u);
    let uvScale = mainRow.z;
    let tintRow = terrain_paramsRow(layerIndex, ${P}u);
    let tintFold = terrain_paramsRow(layerIndex, ${T}u).xyz;
    let pbrRow = terrain_paramsRow(layerIndex, ${m}u);
    let pbr2Row = terrain_paramsRow(layerIndex, ${H}u);
    var nroShift = vec2<f32>(0.0);
    if (nroOn && terrain_paramsRow(layerIndex, ${r}u).z >= 0.5) { nroShift = terrain_paramsRow(layerIndex, ${o}u).rg - vec2<f32>(0.5); }
    if (meanResponse && !nroOn && pbrRow.x >= 0.0) { surface.roughness = terrain_patinaRoughness(patina_packedRoughness(terrain_paramsRow(layerIndex, ${o}u)), pbr2Row.x); }
    var meanSample = vec4<f32>(0.0);
    if (carve && pbrRow.w <= 0.5 && (top || side)) {
      meanSample = textureSampleLevel(albedoArray, atlasSampler, terrain_tilePhase(tileOrigin, uvScale) + baseUv * uvScale, i32(max(mainRow.y, 0.0)), 32.0);
    }
    if (top) {
      surface.color = terrain_applyTintFold(topAlbedo.rgb, tintRow.rgb, tintFold);
      if (carve) {
        if (pbrRow.w > 0.5) {
          surface.height = patina_packedHeight(topAlbedo);
          surface.heightPacked = 1.0;
        } else {
          surface.height = clamp(0.5 + (terrain_luma(topAlbedo.rgb) - terrain_luma(meanSample.rgb)) * ${h3.toFixed(2)}, 0.0, 1.0);
        }
      }
      if (nroOn) {
        surface.normalTs = patina_packedNormalTs(vec4<f32>(topNro.xy - nroShift, topNro.z, 0.0), pbrRow.y) * vec3<f32>(1.0, -1.0, 1.0);
        surface.roughness = terrain_patinaRoughness(topNro.z, pbr2Row.x);
      } else if (derive) {
        if (!antiTiling) { lumaCentre = terrain_luma(topAlbedo.rgb); }
        surface.normalTs = normalize(vec3<f32>(-(lumaU - lumaCentre) * ${w3.toFixed(2)}, -(lumaV - lumaCentre) * ${w3.toFixed(2)}, 1.0));
      }
    }
    if (side) {
      surface.color = mix(surface.color, terrain_applyTintFold(sideAlbedo.rgb, tintRow.rgb, tintFold), sideWeight);
      surface.normalTs = mix(surface.normalTs, vec3<f32>(0.0, 0.0, 1.0), sideWeight);
      if (carve) {
        var sideHeight = 0.5;
        if (pbrRow.w > 0.5) {
          sideHeight = patina_packedHeight(sideAlbedo);
          surface.heightPacked = 1.0;
        } else {
          sideHeight = clamp(0.5 + (terrain_luma(sideAlbedo.rgb) - terrain_luma(meanSample.rgb)) * ${h3.toFixed(2)}, 0.0, 1.0);
        }
        surface.height = mix(surface.height, sideHeight, sideWeight);
      }
      if (pbr && nroOn) {
        surface.roughness = mix(surface.roughness, terrain_patinaRoughness(sideRough, pbr2Row.x), sideWeight);
        surface.sideRelief = terrain_sideRelief(sideNroX - nroShift, sideNroZ - nroShift, pbrRow.y, sideShare, geoNormal) * sideWeight;
      }
    }
    let lodFloorRow = terrain_paramsRow(layerIndex, ${O}u);
    surface.color = mix(surface.color, terrain_preJoinColor(lodFloorRow.w, tintRow.rgb, tintFold), lodFloorRow.z);
  } else if (layerType < ${q3}) {
    let lodFloorRow = terrain_paramsRow(layerIndex, ${O}u);
    surface.color = terrain_preJoinColor(lodFloorRow.w, terrain_paramsRow(layerIndex, ${P}u).rgb, terrain_paramsRow(layerIndex, ${T}u).xyz);
  } else {
    surface.color = terrain_paramsRow(layerIndex, ${P}u).rgb;
  }
  //${i}${I}
  let tintRow = terrain_paramsRow(layerIndex, ${P}u);
  let aux = terrain_paramsRow(layerIndex, ${S}u);
  let baseStops = layerType >= ${q3} && (((shading & ${f.noise}u) != 0u) || ((shading & ${f.gradient}u) != 0u));
  let tintStops = ((shading & ${f.heightTint}u) != 0u) && tintRow.a > 0.0;
  for (var stopPass = select(1u, 0u, baseStops); stopPass < select(1u, 2u, tintStops); stopPass++) {
    var t = heightNorm;
    if (stopPass == 0u && (shading & ${f.noise}u) != 0u && layerType < ${P2}) {
      t = stopNoise;
    }
    let first = select(${I}u, ${i}u, stopPass == 0u);
    let stopCount = select(aux.w, aux.z, stopPass == 0u);
    var stop = terrain_paramsRow(layerIndex, first);
    var color = stop.rgb;
    for (var k = 1u; k < groundDraw.bounds.x; k++) {
      let next = terrain_paramsRow(layerIndex, first + k);
      color = mix(color, next.rgb, smoothstep(stop.a, max(next.a, stop.a + 1e-4), t) * f32(stopCount > f32(k) + 0.5));
      stop = next;
    }
    if (stopPass == 0u) { surface.color = color; } else { surface.color = terrain_applyTint(surface.color, color, tintRow.a); }
  }
  return surface;
}`,n0=`fn terrain_f3(v: vec3<f32>, i: u32) -> f32 { return select(select(v.z, v.y, i == 1u), v.x, i == 0u); }
fn terrain_u3(v: vec3<u32>, i: u32) -> u32 { return select(select(v.z, v.y, i == 1u), v.x, i == 0u); }
fn terrain_u4(v: vec4<u32>, i: u32) -> u32 { return select(select(select(v.w, v.z, i == 2u), v.y, i == 1u), v.x, i == 0u); }
fn terrain_f4(v: vec4<f32>, i: u32) -> f32 { return select(select(select(v.w, v.z, i == 2u), v.y, i == 1u), v.x, i == 0u); }

struct TerrainEntry { index: u32, weight: f32, }

fn terrain_entry(k: u32, words: vec4<u32>, bilinear: vec4<f32>) -> TerrainEntry {
  let corner = k / 3u;
  let slot = k - corner * 3u;
  let word = terrain_u4(words, corner);
  return TerrainEntry(terrain_wordLayers(word)[slot], f32(terrain_wordQuanta(word)[slot]) / 127.0 * terrain_f4(bilinear, corner));
}`,S0=(q)=>(S0=$c0C(5))(q),i0=`  let words = vec4<u32>(word00, word10, word01, word11);
  let oneWord = words.x == words.y && words.x == words.z && words.x == words.w;
  var pick = vec3<u32>(0u);
  var pickW = vec3<f32>(0.0);
  let oneLayers = terrain_wordLayers(words.x);
  let oneWeights = vec3<f32>(terrain_wordQuanta(words.x)) / 127.0;
  let corners = groundDraw.twelve / groundDraw.three;
  for (var i = 0u; i < select(groundDraw.twelve, groundDraw.three, oneWord); i++) {
    var index = 0u;
    var total = 0.0;
    if (oneWord) {
      index = terrain_u3(oneLayers, i);
      let same = select(vec3<f32>(0.0), vec3<f32>(1.0), oneLayers == vec3<u32>(index));
      for (var c = 0u; c < corners; c++) {
        let share = terrain_f4(bilinear, c);
        total += oneWeights.x * share * same.x;
        total += oneWeights.y * share * same.y;
        total += oneWeights.z * share * same.z;
      }
    } else {
      index = terrain_entry(i, words, bilinear).index;
      for (var j = 0u; j < groundDraw.twelve; j++) {
        let ej = terrain_entry(j, words, bilinear);
        total += ej.weight * f32(ej.index == index);
      }
    }
    if ((pick.x == index && pickW.x > 0.0) || (pick.y == index && pickW.y > 0.0) || (pick.z == index && pickW.z > 0.0)) { continue; }
    if (total > pickW.x) {
      pick = vec3<u32>(index, pick.xy); pickW = vec3<f32>(total, pickW.xy);
    } else if (total > pickW.y) {
      pick = vec3<u32>(pick.x, index, pick.y); pickW = vec3<f32>(pickW.x, total, pickW.y);
    } else if (total > pickW.z) {
      pick.z = index; pickW.z = total;
    }
  }
  var pickWord = 0u;
  for (var c = 0u; c < candidateCount; c++) { pickWord = pickWord | (terrain_u3(pick, c) << (8u * c)); }`,G3,C3,W3=`    let whole = walk >= candidateCount;
    let c = select(walk, walk - candidateCount, whole);
    let index = terrain_layerOf(in.slot, (pickWord >> (8u * c)) & 0x3fu);
    let weight = terrain_f3(pickW, c);
    let live = weight > 0.0;
    let mainRow = terrain_paramsRow(index, ${B}u);
    let aux = terrain_paramsRow(index, ${S}u);
    let macroScale = terrain_macroScaleOf(index);
    let mvJobs = select(0u, select(1u, groundDraw.three - 1u, tier == 0u), walk == first && sharpen);
    let ditherJobs = select(0u, 1u, live && sharpen);
${H2}
    let stopJobs = select(0u, groundDraw.three, live && whole && mainRow.x >= ${q3} && mainRow.x < ${P2} && (shading & ${f.noise}u) != 0u);
    let macroFootprint = planeFootprint * ${G}.0;
    var mvValue = 0.0;
    var layerNoise = 0.0;
    var macroN = vec3<f32>(0.0);
    var stopValue = 0.0;
    for (var j = 0u; j < mvJobs + ditherJobs + macroJobs + stopJobs; j++) {
      let isMv = j < mvJobs;
      let isDither = !isMv && j < mvJobs + ditherJobs;
      let isMacro = !isMv && !isDither && j < mvJobs + ditherJobs + macroJobs;
      let k = select(select(select(j - mvJobs - ditherJobs - macroJobs, j - mvJobs - ditherJobs, isMacro), 0u, isDither), j, isMv);
      let frequency = ldexp(1.0, i32(k));
      let amplitude = ldexp(0.5, -i32(k));
${m2}
      if (isMv) {
        if (tier == 0u) { mvValue += mix(0.5, v, 1.0 - smoothstep(0.25, 0.75, macroFootprint * frequency)) * amplitude; }
        else { mvValue = mix(0.5, v, 1.0 - smoothstep(0.25, 0.75, macroFootprint)); }
      } else if (isDither) { layerNoise = v; }
      else if (isMacro) { macroN = select(macroN, vec3<f32>(v), vec3<u32>(k) == vec3<u32>(0u, 1u, 2u)); }
      else { stopValue += v * amplitude; }
    }
    if (mvJobs > 0u) {
      macroVariation = mix(${1-H3}, ${1+H3}, select(mvValue, clamp(mvValue, 0.0, 1.0), tier == 0u));
    }
    if (ditherJobs > 0u && !whole && !carve) {
      let faceCarve = smoothstep(${y}, ${M}, normalLocal.y);
      maxAdjusted = max(maxAdjusted, weight / normalizedWeightSum + (layerNoise - 0.5) * ditherFade * ${c} * faceCarve);
    }
    if (live && (whole || carve)) {
      var surface = terrain_layerSurface(index, baseUvMeters, in.tileOrigin, uvDdx, uvDdy, worldPos, heightNorm, worldDdx, worldDdy, sideWeight, sideShare, normalLocal, whole && nroTaps && (tier == 0u || c == 0u), whole && (derivesNormal || nroTaps) && c == 0u, clamp(stopValue, 0.0, 1.0), whole && pbr);
      if (pbr) { surface.metalness = clamp(terrain_paramsRow(index, ${m}u).z, 0.0, 1.0); }
      if ((shading & ${f.emissive}u) != 0u) { surface.emissive = terrain_paramsRow(index, ${A}u).rgb; }
      if (drifts >= 2u) {
${w2}
        let macroRow = terrain_paramsRow(index, ${H}u);
        surface.color = terrain_applyMacroNoise(surface.color, macroNoise, macroRow.w, macroRow.z);
      }
      var adjusted = -1.0;
      ${N2}
      let faceCarve = smoothstep(${y}, ${M}, normalLocal.y);
      let sharpness = select(ditherFade * (1.0 - creaseTell), heightInfluence, carve);
      if (sharpen) {
        let normalizedWeight = weight / normalizedWeightSum;
        if (carve) {
          ${s2("surface.height","surface.heightPacked > 0.5")}
          grainShare = max(grainShare, undecided);
          adjusted = normalizedWeight + (heightBias + (layerNoise - 0.5) * ditherFade * ${c} * undecided) * faceCarve;
        } else {
          adjusted = normalizedWeight + (layerNoise - 0.5) * ditherFade * ${c} * faceCarve;
        }
      }
      if (!whole) {
        maxAdjusted = max(maxAdjusted, adjusted);
      } else {
        let farWeight = mix(weight * weight * squareSumInv, weight / normalizedWeightSum, creaseTell);
        var resolvedWeight = farWeight;
        if (sharpen) {
          resolvedWeight = mix(farWeight, smoothstep(maxAdjusted - blendWidth, maxAdjusted, adjusted), sharpness);
        }
        colorSum += surface.color * resolvedWeight;
        normalSum += surface.normalTs * resolvedWeight;
        sideReliefSum += surface.sideRelief * resolvedWeight;
        roughnessSum += surface.roughness * resolvedWeight;
        metalnessSum += surface.metalness * resolvedWeight;
        emissiveSum += surface.emissive * resolvedWeight;
        weightSum += resolvedWeight;
      }
    } else if (!whole) {
      maxAdjusted = max(maxAdjusted, -1.0);
    }
`,O3=`  let hasBlend = weightSum > 1e-5;
  let resolvedInv = 1.0 / max(weightSum, 1e-5);
  var mixed = colorSum * resolvedInv;
  mixed *= macroVariation;
  if (drifts == 1u) {
    let firstLayer = terrain_layerOf(in.slot, pickWord & 0x3fu);
    let driftRow = terrain_paramsRow(firstLayer, ${H}u);
${h2}
  }
  var finalAlbedo = clamp(select(pool.fallbackColor, mixed * mix(${m3[0]}, ${m3[1]}, heightNorm), hasBlend), vec3<f32>(0.0), vec3<f32>(1.0));
  let finalEmissive = select(vec3<f32>(0.0), emissiveSum * resolvedInv, hasBlend);
  let finalNormalTs = select(vec3<f32>(0.0, 0.0, 1.0), normalize(normalSum * resolvedInv + vec3<f32>(0.0, 0.0, 1e-4)), hasBlend);
  let finalSideRelief = select(vec3<f32>(0.0), sideReliefSum * resolvedInv, hasBlend);
  let finalRoughness = clamp(select(1.0, roughnessSum * resolvedInv, hasBlend), 0.0, 1.0);
  let finalMetalness = clamp(select(0.0, metalnessSum * resolvedInv, hasBlend), 0.0, 1.0);`;function I0(a){return (I0=$c0C(8)).call(this,a)}var A0;function T0(a){return (T0=$c0C(10)).call(this,a)}function r0(q){return`  if (${f2}) {
${a3("fog","!(shade_fogFactor(in.viewZ * 0.99, (in.worldPos.y - frame.cameraPosition.y) * 0.99) >= 1.0)","==")}
    lume_surfacePoint = in.worldPos;
    return ${q?"lume_surfaceStillMotion(lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), pool.fallbackColor, 1.0, 0.0, 1.0, vec3<f32>(0.0)), in.worldPos)":"lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), pool.fallbackColor, 1.0, 0.0, 1.0, vec3<f32>(0.0))"};
  }
  }
`}function t0(q,$){if(!("surface"in q))return{entry:"",decl:"",skip:""};return{entry:`${D3} `,decl:K2,skip:r0($)}}function o0(q,$=!1){return`@vertex
fn vs(${j0(q)}) -> VsOut {
${s3(q)}
${d3({struct:"VsOut"})}
${T2}
  var out: VsOut;
${r2}
  let transform = terrain_slotTransform(slot);
${t2}
  let gridX = i32(round(uv.x / pool.spacing));
  let gridZ = i32(round(uv.y / pool.spacing));
  let heightTile = terrain_heightTexel_tile(slot);
  let height = terrain_heightTexel(heightTile, gridX + 1, gridZ + 1);${$?`
  let arrival = vec2<f32>(1.0);
  let drawnHeight = height;`:`
  let arrival = terrain_arrival(slotOrigin.zw);
  let drawnHeight = terrain_drawnHeight(slot, gridX, gridZ, height, transform, uv, slotOrigin.zw, arrival);`}
  var groundY = drawnHeight;
  if (skirt > 0.5 && terrain_skirtFaces(transform, skirtOut, uv) && !terrain_seamFlush(tileSlot, tilePatch, gridX, gridZ, skirtOut)) { groundY = terrain_skirtY(slot, gridX, gridZ, skirtAlong, drawnHeight, slotOrigin, slotSides, transform, uv, ringStride, arrival); }
${k0}`}function E0(a,b){return (E0=$c0C(11)).apply(this,arguments)}function R0(q,$,j=!1,Q=!1,Z=!1,k=!1){if(Z){return T0(R0(q,$,j,Q,!1,k));}let X=t0($,Q),J=["//",S3];if(Q)J.push("surface"in $?e3:_3);if(J.push(R3,$.preamble,A3),X.decl!=="")J.push(X.decl);if(J.push(i2,A2,L3(q,3,Q3),l,T3,r3,b0("groundDraw.three"),$0("terrain_heightTexel")),j)J.push(Q0);if(J.push(J0,z3,D0,Q2,K3,P3,l0,n0,E0(q,!0)),J.push(`${X.entry}@fragment
fn fs(in: VsOut) -> ${"surface"in $?l3(Q):n3(Q)} {`,g0),j)J.push(X0);J.push(`  let texelF = in.uvMeters / pool.chunkWorldSize * (pool.resolution - 1.0) + vec2<f32>(1.5);
  let baseUv = in.uvMeters / pool.chunkWorldSize;
  let baseUvMeters = in.uvMeters;
  let uvDdx = dpdx(baseUvMeters);
  let uvDdy = dpdy(baseUvMeters);
  let worldPos = lume_worldFromRender(in.worldPos);
  let worldDdx = dpdx(in.worldPos);
  let worldDdy = dpdy(in.worldPos);
  let noiseFootprint = max(length(worldDdx.xz), length(worldDdy.xz));
${X.skip}
  let normalLocal = normalize(in.normalLocal);
  let heightNorm = in.heightNorm;
  let groundBend = in.groundBend;
  let tile = terrain_heightTexel_tile(in.slot);`,`  let texelB = in.uvMeters / pool.chunkWorldSize * (pool.blendResolution - 1.0) + vec2<f32>(1.5);
  let gatherOrigin = floor(texelB - vec2<f32>(0.5));
  let gatherFrac = texelB - vec2<f32>(0.5) - gatherOrigin;
  var bilinear = vec4<f32>(
    (1.0 - gatherFrac.x) * (1.0 - gatherFrac.y),
    gatherFrac.x * (1.0 - gatherFrac.y),
    (1.0 - gatherFrac.x) * gatherFrac.y,
    gatherFrac.x * gatherFrac.y);
  var gx = i32(gatherOrigin.x);
  var gz = i32(gatherOrigin.y);
  var sideWeight = 0.0;
  var sideShare = vec2<f32>(0.0);
  if (biplanar) {
    let drawnCross = cross(worldDdx, worldDdy);
${S0(!0).replace(/^/gm,"  ")}
  }
  let noisePlanes = terrain_noiseShares(sideWeight, sideShare);
  let planeFirst = select(0u, 1u, noisePlanes.x <= 0.0);
  let planeFootprint = select(noiseFootprint, max(length(worldDdx), length(worldDdy)), noisePlanes.x < 1.0);`);J.push(F0,i0,I0(k&&X.skip!==""));J.push(`  var N = normalLocal;
  var roughness = 1.0;
  var metalness = 0.0;
  if (pbr) {
    roughness = clamp(finalRoughness, ${l2}, 1.0);
    metalness = finalMetalness;
  }
  if (shadesNormals) {
${x0}
  }`,c0("terrain_lowBilinear(tile, texelF)"));if("surface"in $)J.push("  lume_surfacePoint = in.worldPos;",Q?`  return lume_surfaceStillMotion(lume_surfaceOut(N, finalAlbedo, roughness, metalness, 1.0, finalEmissive), in.worldPos);
}`:`  return lume_surfaceOut(N, finalAlbedo, roughness, metalness, 1.0, finalEmissive);
}`);else J.push(`  let V = ${i3("frame.cameraPosition - in.worldPos")};
  var lit = ${$.lit};`,`  lit += finalEmissive;
  lit = shade_applyFog(lit, in.viewZ, in.worldPos - frame.cameraPosition);`,Q?`  return lume_staticMotionFragment(vec4f(lit, 1.0), in.worldPos);
}`:`  return vec4<f32>(lit, 1.0);
}`);return g3(J.filter((K)=>K.length>0),`
`)}function u6(q){return q?[q]:void 0}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{QE8 as Z2,i7u as z2,j6w as v2,pVs as k2}from"./73c224890e5dcb5e.mjs";import{kO2 as F2}from"./74261a44b2d4bab9.mjs";import{HU1 as X2,HYK as J2}from"./8036015a501379d5.mjs";import{luT as Q2}from"./fe1722910da55e5a.mjs";import{DNS as e}from"./c89c4d81f3aa5de7.mjs";export{$0 as Sq4,A as Xza,A2 as Jgx,B as JUa,B0 as xWK,B4 as PIV,B6 as SVa,C as RnX,C0 as twK,C4 as Hqb,D2 as BsO,E0 as HT9,E2 as inU,F0 as rQq,F4 as lGU,G as GX7,G0 as OUg,G4 as r93,H as _rl,H0 as nme,H3 as ENZ,H4 as FUD,H6 as HZl,I as SlZ,I2 as NQ5,J0 as I0P,K3 as IKF,K4 as sbL,L as HX3,L2 as u1a4,M as b1b,M0 as ppB,M3 as NM0J,M4 as uqy,M6 as NUg,N2 as YVS,O as cTx,O4 as jCm,P as gDc,P0 as QQm,P3 as Ffa,P4 as ig8,Q0 as Hqj,R0 as Mi0,R2 as AsN,S as mv4,S0 as Z2I,T as hcB,T2 as _lr,U4 as S$p,V3 as kpD,W0 as U$V,W4 as nlX,X0 as cdu,X4 as eNv,Y4 as Nvx,Z3 as dvw,Z4 as u5c,_0 as Y44,a as e7S,a2 as HWj,b0 as rYt,b3 as Hma,b4 as Fyt,c as M_u,c0 as _HQ,c6 as Jde,f as ZSS,f3 as frd,g2 as JUY,h as DS8,h0 as tER,h3 as $Ur,h4 as t16,h6 as z1F,i as YNC,i2 as L1d,j0 as BHw,k0 as KEp,k4 as yqf,l as CSp,l2 as aDK,m as Y91,m0 as eBN,m3 as U_O,m4 as JQN,m6 as NyZ,n2 as $Zq,o as MhP,o0 as x4$,p as g8$,p4 as x8s,p6 as naD,r as LSY,r2 as GVV,s2 as QQZ,t as yFn,t0 as AOH,t2 as s0C,u0 as MCH,u3 as zw8,u4 as DQU,u6 as _oE,v0 as Nzs,v3 as ImK,w0 as sdW,w3 as R$O,w4 as k2g,w6 as L$S,x0 as NGQ,x3 as jIK,x6 as XUj,y as QD5,y0 as YrD,y3 as FNv,y4 as LSm,z0 as pes,z3 as HHM,z4 as g4_};
