;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;var J$={};J5(J$,{cellLightBindingsWgsl:()=>F5,FAR_BOUNCE_SHARE:()=>V5,CELL_LIGHT_UNDER_FLOOR_RINGS:()=>C9,CELL_LIGHT_TOPS_SIDE_TEXELS:()=>P7,CELL_LIGHT_TOPS_EYE_REACH_TEXELS:()=>Z$,CELL_LIGHT_SUN_TERM_WGSL:()=>P5,CELL_LIGHT_SKY_TERM_WGSL:()=>M5,CELL_LIGHT_SKY_AT_TERM_WGSL:()=>G5,CELL_LIGHT_READ_WGSL:()=>H5,CELL_LIGHT_READ_FOLDS:()=>j5,CELL_LIGHT_REACH_WGSL:()=>U5,CELL_LIGHT_MATTER_SKY:()=>Q$,CELL_LIGHT_LOCAL_TERM_WGSL:()=>A5,CELL_LIGHT_IRRADIANCE_WGSL:()=>W7,CELL_LIGHT_GLOW_TERM_WGSL:()=>N5,CELL_LIGHT_GLOW_IRRADIANCE:()=>G7,CELL_LIGHT_GLOW_DAY:()=>$$,CELL_LIGHT_FADE_TEXELS:()=>D9,CELL_LIGHT_EYE_REACH_TEXELS:()=>M7,CELL_LIGHT_CORNER_SHADE_WGSL:()=>B5,CELL_LIGHT_BARE_SUN_TERM_WGSL:()=>W5});var o0=9,k2=o0*16;var s0=new $7("ibl-environment");var Q7=0.294;var V1=1-o9*o9*0.3;var w=[{texelCells:1,width:128,height:64,depth:128,solidShows:"least"},{texelCells:4,width:128,height:64,depth:128,solidShows:"least"}],Z7=0.125,J7=8;var S=32,z7=8,s9=32;var W=2;var y=0.08,c=[0.05,0.3],i=63,a0=95;function e0($){if(!($>0))return 0;return Math.min(255,Math.max(1,Math.round(255+S*Math.log2($))))}function _($){if(!($>0))return 0;let Q=2**(-255/S);return(2**((Math.min(255,$)-255)/S)-Q)/(1-Q)}function r9($){let Q=_($),Z=new Uint8Array(256);for(let J=$+1;J<256;J+=1)Z[J]=Math.max(1,Math.round(255*Math.sqrt((_(J)-Q)/(1-Q))));return Z}var B1=e0(y);var M1=r9(0),G1=r9(i),P1=r9(a0);var b=w[0].width,J9=w[0].height,o=w[0].depth,t9=W+1,P=w.length-1,$5=J9+1,Q5=W*$5,N1=Q5+4,Z5=20,s=8,a9=8,C1=t9*Z5+s*12+a9;;var D9=8,M7=b/2-3*e9/4-1-D9,G7=8,z5=[0.09,0.17,0.5],q5=0.25,q7=[1.189207115002721,1.681792830507429],W9=[16,48],$$=[0.05,0.35],K7=[0.1,0.4],X7=[-0.1,0.02];function K5($){return`smoothstep(${Y(K7[0])}, ${Y(K7[1])}, dot(${$}, vec3<f32>(0.2126, 0.7152, 0.0722))) * smoothstep(${Y(X7[0])}, ${Y(X7[1])}, (${$}.r - ${$}.b) / (${$}.r + ${$}.b + 0.0001))`}var X5=0.5,Y5=0.5,Y7=0.02,A9=0.97,Q$=0.02,P7=4,z9=P7,Z$=b/2-3*e9/4-z9,C9=[2,4,8],V5=0.5,V7=($)=>$.slice(0,-1).reduceRight((Q,Z,J)=>`select(${Q}, ${Y(Z)}, ring == ${J})`,Y($[$.length-1])),U7=w[P].texelCells/w[0].texelCells,U5=`fn lighting_cellReach(P: vec3<f32>, cell: f32) -> f32 {
  var texel = cell * ${Y(U7)};
  for (var cells = 1; cells < ${J7}; cells = cells * 2) {
    texel = select(texel, texel * 2.0, texel < ${Y(Z7*U7*0.999999)});
  }
  let across = max(abs(P.x - frame.cameraPosition.x), abs(P.z - frame.cameraPosition.z)) / max(texel, 1e-6);
  return select(clamp((${Y(Z$)} - across) / ${Y(z9)}, 0.0, 1.0), 0.0, cell <= 0.0);
}`;function F5($){return`struct CellLightLevel {
  origin: vec4<f32>,
  slot: vec4<f32>,
  shownMin: vec4<f32>,
  shownMax: vec4<f32>,
  far: vec4<f32>,
}
struct CellLightWindow {
  levels: array<CellLightLevel, ${t9}>,
  lights: array<vec4<f32>, ${s*3}>,
  topsBefore: array<vec4<f32>, ${a9/4}>,
}
@group(${$}) @binding(${F7}) var cellLightMap: texture_2d_array<f32>;
@group(${$}) @binding(${j7}) var cellLightSampler: sampler;
@group(${$}) @binding(${H7}) var<uniform> cellLight: CellLightWindow;`}var j5=B7,H5=`override ${N9}: bool = true;
override lightingFlat: bool = false;
fn lighting_cellGate(word: f32) -> f32 {
  return select(0.0, word, ${N9});
}
var<private> lighting_cellReady: bool;
var<private> lighting_cellGlow: vec3<f32>;
var<private> lighting_cellAmbient: vec3<f32>;
var<private> lighting_cellLand: vec3<f32>;
var<private> lighting_cellSunGate: f32 = 1.0;
var<private> lighting_cellOpenness: f32 = 1.0;
var<private> lighting_cellCover: f32;
var<private> lighting_cellFine: f32;
var<private> lighting_cellGlowLevel: f32;
var<private> lighting_cellPastSky: f32 = 1.0;
var<private> lighting_cellTopsIn: f32;
var<private> lighting_cellPast: f32 = 1.0;
var<private> lighting_cellShownSky: f32 = 1.0;
var<private> lighting_farSkyShare: f32 = 1.0;
fn lighting_cellReset() {
  lighting_cellReady = false;
  lighting_cellGlow = vec3<f32>(0.0);
  lighting_cellAmbient = vec3<f32>(0.0);
  lighting_cellLand = vec3<f32>(0.0);
  lighting_cellSunGate = 1.0;
  lighting_cellOpenness = 1.0;
  lighting_cellCover = 0.0;
  lighting_cellFine = 0.0;
  lighting_cellGlowLevel = 0.0;
  lighting_cellPastSky = 1.0;
  lighting_cellTopsIn = 0.0;
  lighting_cellPast = 1.0;
  lighting_cellShownSky = 1.0;
  lighting_farSkyShare = 1.0;
  shade_surfaceAirLit = 0.0;
}
fn lighting_cellPointAt(origin: vec4<f32>, P: vec3<f32>, N: vec3<f32>) -> vec3<f32> {
  let p = (P - origin.xyz) * origin.w;
  let toFace = select(floor(p + vec3<f32>(${Y(Y7)})) - p, ceil(p - vec3<f32>(${Y(Y7)})) - p, N >= vec3<f32>(0.0));
  return p + abs(N) * toFace + N * 0.5;
}
fn lighting_cellPoint(index: i32, P: vec3<f32>, N: vec3<f32>) -> vec3<f32> {
  return lighting_cellPointAt(cellLight.levels[index].origin, P, N);
}
fn lighting_cellTopsOf(at: vec2<f32>, first: f32, y: f32) -> vec2<f32> {
  let column = textureSampleLevel(cellLightMap, cellLightSampler, at, i32(first), 0.0);
  let inTop = clamp(y - column.g * 255.0 + 1.5, 0.0, 1.0);
  var gap = inTop * column.b;
  if (inTop < 1.0) {
    let low = textureSampleLevel(cellLightMap, cellLightSampler, at, i32(first) + 1, 0.0);
    gap = gap + (1.0 - inTop) * clamp(y - low.r * 255.0 + 1.5, 0.0, 1.0) * mix(low.g, low.a, clamp(y - low.b * 255.0 + 0.5, 0.0, 1.0));
  }
  let open = clamp(y - column.r * 255.0 + 1.5, 0.0, 1.0);
  return vec2<f32>(mix(gap, 1.0, open), gap * (1.0 - open));
}
fn lighting_cellUnderSides(q: vec3<f32>, slot: vec4<f32>, texelsPerMetre: f32) -> f32 {
  for (var k = 0; k < ${C9.length*4}; k = k + 1) {
    let way = k % 4;
    let ring = k / 4;
    let step = select(vec2<f32>(0.0, select(-1.0, 1.0, way == 3)), vec2<f32>(select(-1.0, 1.0, way == 1), 0.0), way < 2) * ${V7(C9)} * texelsPerMetre;
    let t = q.xz + step;
    var open = 1.0;
    if (min(t.x, t.y) > 0.0 && t.x < ${Y(b)} && t.y < ${Y(o)}) {
      let column = textureSampleLevel(cellLightMap, cellLightSampler, vec2<f32>((t.x + slot.x) / ${Y(b)}, (t.y + slot.z) / ${Y(o)}), i32(slot.w), 0.0);
      open = clamp(1.5 - column.r * 255.0, 0.0, 1.0);
    }
    if (open > 0.0) {
      return open * ${V7(C9.map(($)=>Math.round(2**(-$*z7/S/2)*1e4)/1e4))};
    }
  }
  return 0.0;
}
fn lighting_cellTopsWith(q: vec3<f32>, slot: vec4<f32>, reach: vec3<f32>, eye: f32, past: f32) -> vec3<f32> {
  let inside = min(min(q.x, ${Y(b)} - q.x), min(q.z, ${Y(o)} - q.z));
  let known = clamp((reach.z - 1.0 - max(abs(q.x - reach.x - 0.5), abs(q.z - reach.y - 0.5))) / ${Y(z9)}, 0.0, 1.0);
  let weight = min(min(clamp(inside / ${Y(z9)}, 0.0, 1.0), known), eye);
  if (weight <= 0.0 || q.y >= ${Y(J9)}) {
    return vec3<f32>(past, 0.0, 0.0);
  }
  let at = vec2<f32>((q.x + slot.x) / ${Y(b)}, (q.z + slot.z) / ${Y(o)});
  let y = max(q.y, 0.0);
  var answer = lighting_cellTopsOf(at, slot.w, y);
  if (q.y < 0.0) {
    if (answer.x < 1.0) {
      answer.x = max(answer.x, lighting_cellUnderSides(q, slot, cellLight.levels[${W}].origin.w));
    }
    answer.x = min(answer.x, past);
  }
  return vec3<f32>(mix(past, answer.x, weight), answer.y * weight, weight);
}
fn lighting_cellTopsPast(P: vec3<f32>, N: vec3<f32>, past: f32) -> vec2<f32> {
  let land = cellLight.levels[${W}];
  let q = lighting_cellPointAt(land.origin, P, N);
  let eye = lighting_cellEyeReach(${W}, q, ${Y(Z$)}, ${Y(z9)});
  let walk = land.shownMax.x;
  let before = cellLight.topsBefore[0];
  let beforeAt = cellLight.topsBefore[1];
  var answer = vec3<f32>(0.0);
  let sets = select(1, 2, walk < 1.0);
  for (var k = 0; k < sets; k = k + 1) {
    let was = k == 1;
    let read = lighting_cellTopsWith(select(q, q - before.xyz, was), select(land.slot, vec4<f32>(beforeAt.z, 0.0, beforeAt.w, land.slot.w + 2.0), was), select(land.shownMax.yzw, vec3<f32>(beforeAt.xy, before.w), was), eye, past);
    answer = select(read, mix(read, answer, walk), was);
  }
  lighting_cellTopsIn = answer.z;
  return answer.xy;
}
fn lighting_cellEyeReach(index: i32, texel: vec3<f32>, reach: f32, fade: f32) -> f32 {
  let origin = cellLight.levels[index].origin;
  let eye = (frame.cameraPosition - origin.xyz) * origin.w;
  let across = max(abs(texel.x - eye.x), abs(texel.z - eye.z));
  return clamp((reach - across) / fade, 0.0, 1.0);
}
fn lighting_cellWeight(index: i32, texel: vec3<f32>) -> f32 {
  let least = cellLight.levels[index].shownMin;
  let inside = min(texel - least.xyz, cellLight.levels[index].shownMax.xyz - texel);
  let boxed = clamp((min(inside.x, min(inside.y, inside.z)) - 1.0) / ${Y(D9)}, 0.0, 1.0);
  return min(boxed, lighting_cellEyeReach(index, texel, ${Y(M7)}, ${Y(D9)})) * least.w;
}
fn lighting_cellTexels(index: i32, texel: vec3<f32>) -> vec4<f32> {
  let slot = cellLight.levels[index].slot;
  let at = texel + slot.xyz;
  let y = at.y - 0.5;
  let wrapped = y - ${Y(J9)} * floor(y / ${Y(J9)});
  let near = floor(wrapped);
  let plane = vec2<f32>(at.x / ${Y(b)}, at.z / ${Y(o)});
  let layer = i32(slot.w + near);
  return mix(textureSampleLevel(cellLightMap, cellLightSampler, plane, layer, 0.0), textureSampleLevel(cellLightMap, cellLightSampler, plane, layer + 1, 0.0), wrapped - near);
}
fn lighting_cellPath(to: vec3<f32>) -> f32 {
  let most = max(to.x, max(to.y, to.z));
  let least = min(to.x, min(to.y, to.z));
  let mid = to.x + to.y + to.z - most - least;
  let edge = ${Y(Math.round(s9*Math.SQRT2*10)/10)};
  return select((most + mid + least) * 0.5 * edge, (mid + least) * edge + (most - mid - least) * ${Y(s9)}, most >= mid + least);
}
fn lighting_cellMoved(P: vec3<f32>, N: vec3<f32>) -> vec3<f32> {
  var moved = vec3<f32>(0.0);
  let at = P + N * (0.5 / cellLight.levels[0].origin.w);
  let count = i32(lighting_cellGate(cellLight.levels[0].far.w));
  for (var i = 0; i < count; i = i + 1) {
    let light = cellLight.lights[i];
    let pool = cellLight.lights[i + ${s*2}];
    if (pool.w <= 0.0 || light.w <= 0.0) {
      continue;
    }
    let levels = min(pool.rgb - vec3<f32>(lighting_cellPath(abs(at - light.xyz))), vec3<f32>(255.0));
    let held = (exp2((levels - vec3<f32>(255.0)) / ${Y(S)}) - vec3<f32>(${Y(2**(-255/S))})) / ${Y(1-2**(-255/S))};
    let lit = max((held - vec3<f32>(${Y(_(i))})) / ${Y(1-_(i))}, vec3<f32>(0.0));
    var gate = 1.0;
    let flood = cellLight.lights[i + ${s}];
    if (flood.w > 0.0) {
      gate = mix(1.0, smoothstep(${Y(-W9[1])}, ${Y(-W9[0])}, lighting_cellGlowLevel - (light.w - lighting_cellPath(abs(at - flood.xyz)))), flood.w);
    }
    moved = max(moved, lit * (gate * pool.w));
  }
  return moved;
}
fn lighting_cellFarSky(sky: f32) {
  lighting_cellReady = true;
  lighting_cellPast = 1.0;
  let landFade = lighting_cellGate(cellLight.levels[${W}].shownMin.w);
  if (landFade > 0.0) {
    let far = cellLight.levels[${W}].far.rgb;
    lighting_cellLand = far * far * landFade;
  }
  lighting_cellSunGate = smoothstep(${Y(c[0])}, ${Y(c[1])}, sky);
  lighting_cellOpenness = max(sky, ${Y(y)});
  lighting_cellCover = (1.0 - lighting_cellOpenness) * smoothstep(${Y(y)}, ${Y(y+0.25)}, sky);
  lighting_cellAmbient = passLights.ambientColor * lighting_cellCover;
}
fn lighting_cellMarkedRead(P: vec3<f32>, N: vec3<f32>, sky: f32) {
  lighting_cellPastSky = sqrt(sky);
  lighting_cellRead(P, N);
  if (lighting_cellPast >= 1.0 || lighting_cellShownSky < ${Y(Q$)}) {
    lighting_cellFarSky(sky);
  }
}
fn lighting_cellHeldLight(sky: f32, coarse: vec4<f32>, coarseWeight: f32, fine: vec4<f32>, fineWeight: f32) -> vec4<f32> {
  var light = vec4<f32>(0.0, 0.0, 0.0, sky);
  if (coarseWeight > 0.0) {
    light = mix(light, coarse, coarseWeight);
  }
  return mix(light, fine, fineWeight);
}
fn lighting_cellRead(P: vec3<f32>, N: vec3<f32>) {
  if (lighting_cellReady) {
    return;
  }
  lighting_cellReady = true;
  let fineFade = lighting_cellGate(cellLight.levels[0].shownMin.w);
  let coarseFade = lighting_cellGate(cellLight.levels[${P}].shownMin.w);
  let landFade = lighting_cellGate(cellLight.levels[${W}].shownMin.w);
  let topsFade = lighting_cellGate(cellLight.levels[${W}].shownMax.w);
  if (!${N9} || fineFade + coarseFade + landFade + topsFade <= 0.0) {
    if (lighting_cellPastSky < 1.0) {
      let pastShown = lighting_cellPastSky * lighting_cellPastSky;
      lighting_cellSunGate = smoothstep(${Y(c[0])}, ${Y(c[1])}, pastShown);
      lighting_cellOpenness = max(pastShown, ${Y(y)});
      lighting_cellCover = (1.0 - lighting_cellOpenness) * smoothstep(${Y(y)}, ${Y(y+0.25)}, pastShown);
      lighting_cellAmbient = passLights.ambientColor * lighting_cellCover;
    }
    return;
  }
  if (landFade > 0.0) {
    let far = cellLight.levels[${W}].far.rgb;
    lighting_cellLand = far * far * landFade;
  }
  var fineWeight = 0.0;
  var fineLight = vec4<f32>(0.0, 0.0, 0.0, 1.0);
  var spill = 1.0;
  if (fineFade > 0.0) {
    let fineTexel = lighting_cellPoint(0, P, N);
    fineWeight = lighting_cellWeight(0, fineTexel);
    if (fineWeight > 0.0) {
      fineLight = lighting_cellTexels(0, fineTexel);
      if (!lightingFlat) {
        let behind = lighting_cellTexels(0, fineTexel - N * 2.0).rgb;
        let here = max(fineLight.r, max(fineLight.g, fineLight.b));
        let there = max(behind.r, max(behind.g, behind.b));
        spill = mix(1.0, 1.0 - ${Y(1-q5)} * smoothstep(${Y(q7[0])}, ${Y(q7[1])}, there / max(here, 0.004)), fineWeight);
      }
    }
  }
  var coarseWeight = 0.0;
  var coarseLight = vec4<f32>(0.0);
  if (fineWeight < 1.0 && coarseFade > 0.0 && !lightingFlat) {
    let coarseTexel = lighting_cellPoint(${P}, P, N);
    coarseWeight = lighting_cellWeight(${P}, coarseTexel);
    if (coarseWeight > 0.0) {
      coarseLight = lighting_cellTexels(${P}, coarseTexel);
    }
  }
  let held = fineWeight + coarseWeight;
  let first = held < 1.0;
  var columns = vec2<f32>(lighting_cellPastSky, 0.0);
  if (topsFade > 0.0 && (first || lighting_cellHeldLight(lighting_cellPastSky, coarseLight, coarseWeight, fineLight, fineWeight).a < ${Y(A9)}) && !lightingFlat) {
    let tops = lighting_cellTopsPast(P, N, lighting_cellPastSky);
    columns.y = tops.y;
    if (first && tops.x * tops.x >= ${Y(Q$)}) {
      columns.x = tops.x;
    }
  }
  lighting_cellPast = (1.0 - min(held, 1.0)) * (1.0 - lighting_cellTopsIn);
  if (held <= 0.0 && columns.x >= 1.0) {
    return;
  }
  var light = lighting_cellHeldLight(columns.x, coarseLight, coarseWeight, fineLight, fineWeight);
  if (held > 0.0 && topsFade > 0.0 && light.a < ${Y(A9)}) {
    light.a = max(light.a, columns.y);
  }
  lighting_cellFine = fineWeight;
  let brightest = max(light.r, max(light.g, light.b));
  lighting_cellGlowLevel = 255.0 + ${Y(S)} * log2(brightest * brightest * ${Y(1-_(i))} + ${Y(_(i))});
  let shown = light * light;
  lighting_cellShownSky = shown.a;
  lighting_cellSunGate = smoothstep(${Y(c[0])}, ${Y(c[1])}, shown.a);
  lighting_cellOpenness = max(shown.a, ${Y(y)});
  lighting_cellCover = (1.0 - lighting_cellOpenness) * smoothstep(${Y(y)}, ${Y(y+0.25)}, shown.a);
  lighting_cellGlow = max(shown.rgb * spill, lighting_cellMoved(P, N) * min(held, 1.0)) * ${Y(G7)};
  lighting_cellAmbient = passLights.ambientColor * lighting_cellCover;
}
fn lighting_cellHeld(P: vec3<f32>, N: vec3<f32>) -> f32 {
  var held = 0.0;
  if (lighting_cellGate(cellLight.levels[0].shownMin.w) > 0.0) {
    held = lighting_cellWeight(0, lighting_cellPoint(0, P, N));
  }
  if (held < 1.0 && lighting_cellGate(cellLight.levels[${P}].shownMin.w) > 0.0) {
    held = held + lighting_cellWeight(${P}, lighting_cellPoint(${P}, P, N));
  }
  return held;
}
fn lighting_cellSkyAt(P: vec3<f32>, N: vec3<f32>, past: f32) -> f32 {
  let topsFade = lighting_cellGate(cellLight.levels[${W}].shownMax.w);
  var fineWeight = 0.0;
  var fineSky = 1.0;
  if (lighting_cellGate(cellLight.levels[0].shownMin.w) > 0.0) {
    let fineTexel = lighting_cellPoint(0, P, N);
    fineWeight = lighting_cellWeight(0, fineTexel);
    if (fineWeight > 0.0) {
      fineSky = lighting_cellTexels(0, fineTexel).a;
    }
  }
  var coarseWeight = 0.0;
  var coarseLight = vec4<f32>(0.0);
  if (fineWeight < 1.0 && lighting_cellGate(cellLight.levels[${P}].shownMin.w) > 0.0) {
    let coarseTexel = lighting_cellPoint(${P}, P, N);
    coarseWeight = lighting_cellWeight(${P}, coarseTexel);
    if (coarseWeight > 0.0) {
      coarseLight = lighting_cellTexels(${P}, coarseTexel);
    }
  }
  let held = fineWeight + coarseWeight;
  let fineLight = vec4<f32>(0.0, 0.0, 0.0, fineSky);
  let first = held < 1.0;
  var columns = vec2<f32>(past, 0.0);
  if (topsFade > 0.0 && (first || lighting_cellHeldLight(past, coarseLight, coarseWeight, fineLight, fineWeight).a < ${Y(A9)})) {
    let tops = lighting_cellTopsPast(P, N, past);
    columns = vec2<f32>(select(past, tops.x, first), tops.y);
  }
  var sky = lighting_cellHeldLight(columns.x, coarseLight, coarseWeight, fineLight, fineWeight).a;
  if (held > 0.0 && topsFade > 0.0 && sky < ${Y(A9)}) {
    sky = max(sky, columns.y);
  }
  return sky * sky;
}
fn lighting_cellIrradiance(N: vec3<f32>, sunDown: vec3<f32>, skyUp: vec3<f32>, skyNow: f32) -> vec3<f32> {
  let open = smoothstep(0.0, ${Y(X5)}, lighting_cellOpenness);
  let land = lighting_cellLand * (max(${Y(Y5)}, lighting_cellOpenness) * open);
  let day = ${K5("sunDown")};
  return lighting_cellGlow * (1.0 - smoothstep(${Y($$[0])}, ${Y($$[1])}, day * lighting_cellOpenness)) + lighting_cellAmbient + vec3<f32>(${z5.map(Y).join(", ")}) * (min(skyNow * ${Y(1/Q7)}, 1.0) * lighting_cellCover) + land * (sunDown + skyUp) * (0.5 - 0.5 * N.y);
}
fn lighting_cellSky(P: vec3<f32>, N: vec3<f32>) -> f32 {
  lighting_cellRead(P, N);
  shade_surfaceAirLit = lighting_cellSunGate;
  return max(lighting_cellOpenness * lighting_farSkyShare, ${Y(y)});
}
fn lighting_cellSun(P: vec3<f32>, N: vec3<f32>) -> f32 {
  lighting_cellRead(P, N);
  return lighting_cellSunGate;
}
fn lighting_cellLocalGate(best: i32, P: vec3<f32>, N: vec3<f32>) -> f32 {
  if (u32(best) >= u32(lighting_cellGate(cellLight.levels[${P}].far.w))) {
    return 1.0;
  }
  let flood = cellLight.lights[best + ${s}];
  if (flood.w <= 0.0) {
    return 1.0;
  }
  lighting_cellRead(P, N);
  if (lighting_cellFine <= 0.0) {
    return 1.0;
  }
  let path = lighting_cellPath(abs(P + N * (0.5 / cellLight.levels[0].origin.w) - flood.xyz));
  let gate = smoothstep(${Y(-W9[1])}, ${Y(-W9[0])}, lighting_cellGlowLevel - (cellLight.lights[best].w - path));
  return mix(1.0, gate, lighting_cellFine * flood.w);
}`,B5="(ao - (1.0 - ao) * (1.0 - ao))",M5=" * lighting_cellSky(P, N)",G5=" * lighting_cellSkyAt(P, N, lighting_cellPastSky)",P5=" * lighting_cellSun(P, shadingNormal)",W5=" * lighting_cellSun(P, N)",A5=`  if (isPoint && slotBase < 0.0) {
    lightShadow = lightShadow * lighting_cellLocalGate(i32(light.directionCone.y) - 1, P, N);
  }
`,W7="lighting_cellIrradiance(N, passLights.sunColor * (passLights.sunIntensity * max(passLights.sunDirection.y, 0.0)), lighting_ambientIrradiance(vec3<f32>(0.0, 1.0, 0.0)), dot(lighting_ambientIrradiance(vec3<f32>(0.0, 1.0, 0.0)) + lighting_iblShIrradiance(vec3<f32>(0.0, 1.0, 0.0)) * (passLights.iblParams.x * 3.14159265359), vec3<f32>(0.2126, 0.7152, 0.0722)))",N5=` + shade_ambientPbr(N, V, albedo, pixelRoughness, metalness, ${W7})`;function A7($){$.side="double",$.depthTest=!0,$.colorNode??=y9().mul(O(L,1))}var r={color:"ctx.terrain.ground.color",normal:"ctx.terrain.ground.normal",roughness:"ctx.terrain.ground.roughness",metalness:"ctx.terrain.ground.metalness",emissive:"ctx.terrain.ground.emissive"},C5=new Set(Object.values(r));function N7(){return{color:k(r.color,"vec3f",{fragmentOnly:!0}),normal:k(r.normal,"vec3f",{fragmentOnly:!0}),roughness:k(r.roughness,"f32",{fragmentOnly:!0}),metalness:k(r.metalness,"f32",{fragmentOnly:!0}),emissive:k(r.emissive,"vec3f",{fragmentOnly:!0})}}var D5=($)=>$.meta.kind==="input"&&C5.has($.meta.name);function C7($){let Q=[];for(let z of x9){let q=$[z];if(q)Q.push(q)}let Z=f($);if(Z)I9(Z,Q);let J=new Set;return Q.some((z)=>k9(z,J,D5))}var D7=2147483648,z$=1073741824,q9=24,y7=62,x7=16777215;var T7=6,y5=T7*4,x5=4,m1=y5+x5;var S7=`
const DECOR_CANDIDATE_WORDS: u32 = ${T7}u;

fn decor_candidateBase(candidateIndex: u32) -> u32 {
  return candidateIndex * DECOR_CANDIDATE_WORDS;
}

fn decor_octEncode(normalInput: vec3<f32>) -> vec2<f32> {
  let normal = normalize(select(vec3<f32>(0.0, 1.0, 0.0), normalInput, length(normalInput) > 1e-6));
  var encoded = normal.xz / max(abs(normal.x) + abs(normal.y) + abs(normal.z), 1e-6);
  if (normal.y < 0.0) {
    encoded = (vec2<f32>(1.0) - abs(encoded.yx)) * sign(select(vec2<f32>(1.0), encoded, abs(encoded) > vec2<f32>(1e-6)));
  }
  return clamp(encoded, vec2<f32>(-1.0), vec2<f32>(1.0));
}

fn decor_octDecode(encodedInput: vec2<f32>) -> vec3<f32> {
  var encoded = clamp(encodedInput, vec2<f32>(-1.0), vec2<f32>(1.0));
  var normal = vec3<f32>(encoded.x, 1.0 - abs(encoded.x) - abs(encoded.y), encoded.y);
  if (normal.y < 0.0) {
    let folded = (vec2<f32>(1.0) - abs(normal.zx)) * sign(select(vec2<f32>(1.0), normal.xz, abs(normal.xz) > vec2<f32>(1e-6)));
    normal.x = folded.x;
    normal.z = folded.y;
  }
  return normalize(normal);
}

fn decor_packNormal(normal: vec3<f32>) -> u32 {
  return pack2x16snorm(decor_octEncode(normal));
}

fn decor_unpackNormal(packed: u32) -> vec3<f32> {
  return decor_octDecode(unpack2x16snorm(packed));
}

fn decor_packTintCoverage(tint: vec3<f32>, coverageInput: f32) -> u32 {
  let coverage = select(0.0, max(coverageInput, 1.0 / 255.0), coverageInput > 0.0);
  return pack4x8unorm(vec4<f32>(clamp(tint, vec3<f32>(0.0), vec3<f32>(1.0)), clamp(coverage, 0.0, 1.0)));
}

fn decor_unpackTintCoverage(packed: u32) -> vec4<f32> {
  return unpack4x8unorm(packed);
}

fn decor_mix(input: u32) -> u32 {
  var value = input;
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return value;
}

fn decor_candidateId(cell: vec2<i32>, seed: u32) -> u32 {
  let a = decor_mix((u32(cell.x) * 0x8da6b343u) ^ (seed * 0xcb1ab31fu));
  return decor_mix(a ^ (u32(cell.y) * 0xd8163841u));
}
`,O7=`
fn decor_levelHideOf(word: u32) -> f32 {
  let share = f32((word >> ${q9}u) & 0x3fu) * (1.0 / ${y7}.0);
  return select(share, share - 1.0, (word & ${z$}u) != 0u);
}

fn decor_levelDoorCut(hide: f32, pixel: vec2<f32>) -> bool {
  let noise = ${R7("pixel")};
  return select(noise, 1.0 - noise, hide < 0.0) < abs(hide);
}
`;function v7($){return`${k7($,"","decorSurvivorWord")}
  let decorLevelFaded = decorSurvivorWord >= ${D7}u && !lumeSurvivorCulled;
  let survivorSlot = select(decorSurvivorWord, decorSurvivorWord & ${x7}u, decorLevelFaded);
  let decorLevelHide = select(0.0, decor_levelHideOf(decorSurvivorWord), decorLevelFaded);`}var w7="  if (in.levelHide != 0.0 && decor_levelDoorCut(in.levelHide, in.position.xy)) { discard; }",I7=256,I5=z$>>>q9|63;function b7($){return`select(${$}, 2.0 + 2.0 * f32((decorSurvivorWord >> ${q9}u) & ${I5}u) + ${$}, decorLevelHide != 0.0)`}var L7=["  if (in.laneCoverage > 1.5) {","    let decorDoorCode = floor((in.laneCoverage - 1.5) * 0.5);",`    let decorReveal = clamp(round((in.laneCoverage - 2.0 - 2.0 * decorDoorCode) * ${I7}.0) * (1.0 / ${I7}.0), 0.0, 1.0);`,`    if ((decorReveal < 1.0 && lume_screenDoor(in.position.xy) > decorReveal) || decor_levelDoorCut(decor_levelHideOf(u32(decorDoorCode) << ${q9}u), in.position.xy)) { discard; }`,"  }"];var h7=1.3;function g7($,Q){return`@group(${$}) @binding(${Q}) var<storage, read> bendField: array<vec2<u32>>;

fn decor_pressCell(cell: vec2<i32>) -> vec4<f32> {
  let words = bendField[u32(cell.x & ${q$-1}) | (u32(cell.y & ${q$-1}) << 8u)];
  return vec4<f32>(unpack2x16snorm(words.x), unpack2x16snorm(words.y));
}

fn decor_pressHolds(instanceXZ: vec2<f32>) -> bool {
  let rel = abs(instanceXZ - (frame.focus.xz + frame.renderOrigin.xz));
  return max(rel.x, rel.y) <= ${(f7-2*K$).toFixed(2)};
}

fn decor_pressLean(instanceXZ: vec2<f32>) -> vec4<f32> {
  if (!decor_pressHolds(instanceXZ)) { return vec4<f32>(0.0); }
  let p = instanceXZ * ${(1/K$).toFixed(1)} - vec2<f32>(0.5);
  let c0 = vec2<i32>(floor(p));
  let f = p - vec2<f32>(c0);
  let a = decor_pressCell(c0);
  let b = decor_pressCell(c0 + vec2<i32>(1, 0));
  let c = decor_pressCell(c0 + vec2<i32>(0, 1));
  let d = decor_pressCell(c0 + vec2<i32>(1, 1));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}`}var k5="1.0",R5=`fn decor_coverTexel(mask: texture_depth_2d_array, texel: vec2<i32>, first: f32, movers: bool) -> f32 {
  let layers = textureNumLayers(mask);
  var held = first;
  if (movers && layers > 1u) { held = min(held, textureLoad(mask, texel, 1, 0)); }
  if (layers > 2u) { held = min(held, textureLoad(mask, texel, 2, 0)); }
  return held;
}

fn decor_coverSurface(depth: f32, yMin: f32, yRange: f32) -> f32 {
  if (depth >= 1.0) { return 1e9; }
  return yMin + depth * yRange;
}

fn decor_coverClears(overRoot: f32, height: f32) -> bool {
  return overRoot > -${k5} && overRoot < height + 0.35;
}`,T5=9;function E7($,Q){return`@group(${$}) @binding(${Q}) var coverDepth: texture_depth_2d_array;
@group(${$}) @binding(${T5}) var coverBefore: texture_depth_2d_array;

${R5}

fn decor_coverHeightIn(worldX: f32, worldZ: f32, before: bool) -> f32 {
  let texels = i32(item.coverA.w);
  if (texels <= 0) { return 1e9; }
  let tx = i32(floor((worldX - item.coverA.x) * item.coverA.z));
  let tz = i32(floor((worldZ - item.coverA.y) * item.coverA.z));
  if (tx < 0 || tz < 0 || tx >= texels || tz >= texels) { return 1e9; }
  let at = vec2<i32>(tx, tz);
  var held = textureLoad(coverDepth, at, 0, 0);
  if (before) { held = textureLoad(coverBefore, at, 0, 0); }
  let depth = decor_coverTexel(coverDepth, at, held, item.geometry.w < 1.0 || !decor_pressHolds(vec2<f32>(worldX, worldZ)));
  return decor_coverSurface(depth, item.coverB.x, item.coverB.y);
}

fn decor_covered(worldX: f32, worldZ: f32, rootY: f32) -> bool {
  return decor_coverClears(decor_coverHeightIn(worldX, worldZ, false) - rootY, item.law.z);
}

fn decor_coverKeep(worldX: f32, worldZ: f32, rootY: f32) -> f32 {
  let now = select(1.0, 0.0, decor_covered(worldX, worldZ, rootY));
  if (item.coverB.w <= 0.0) { return now; }
  let t = (frame.fadeTime - item.coverB.z) / item.coverB.w;
  if (t >= 1.0) { return now; }
  let before = select(1.0, 0.0, decor_coverClears(decor_coverHeightIn(worldX, worldZ, true) - rootY, item.law.z));
  return mix(before, now, smoothstep(0.0, 1.0, t));
}`}var S5=668265263,p7=0.05;var O5=374761393;var _7=2654435769;var v5=1;var K9=7.5,X9=[2,4],d7=900,n7=0.5,l7=0.7;function c7($){return Math.min(1,($/K9)**2)*m7(X9[0],X9[1],$)}var u7=[K9,K9*3];var X$=[4.74,2.99,X9[0]],Y$=[1,c7(X$[0]),c7(X$[1]),0];var i7=`
fn decor_footprintDensity(footprintPx: f32) -> f32 {
  let full = min(1.0, (footprintPx / ${Y(K9)}) * (footprintPx / ${Y(K9)}));
  return full * smoothstep(${Y(X9[0])}, ${Y(X9[1])}, footprintPx);
}

fn decor_footprintWear(footprintPx: f32) -> f32 {
  return 1.0 - smoothstep(${Y(u7[0])}, ${Y(u7[1])}, footprintPx);
}

fn decor_levelFraction(level: u32) -> f32 {
  if (level == 0u) { return 1.0; }
  if (level == 1u) { return ${Y(Y$[1])}; }
  if (level == 2u) { return ${Y(Y$[2])}; }
  return 0.0;
}

fn decor_levelKeep(densityFraction: f32, level: u32) -> f32 {
  let hi = decor_levelFraction(level);
  let lo = decor_levelFraction(level + 1u);
  return clamp((densityFraction - lo) / max(hi - lo, 1e-6), 0.0, 1.0);
}

fn decor_smoothVisibility(distanceToFocus: f32, fullRadiusInput: f32, zeroRadiusInput: f32) -> f32 {
  let fullRadius = max(fullRadiusInput, 0.0);
  let zeroRadius = max(zeroRadiusInput, fullRadius + 1e-4);
  return 1.0 - smoothstep(fullRadius, zeroRadius, distanceToFocus);
}

fn decor_stableThreshold(candidateId: u32, salt: u32) -> f32 {
  var value = candidateId ^ salt;
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return f32(value) / 4294967296.0;
}

fn decor_distanceKeep(rootVisibility: f32, candidateId: u32, groundCover: bool) -> f32 {
  let keep = clamp(rootVisibility, 0.0, 1.0);
  if (keep <= 0.0) { return 0.0; }
  if (keep >= 1.0) { return 1.0; }
  let threshold = decor_stableThreshold(candidateId, 0x${S5.toString(16)}u);
  if (groundCover) { return select(0.0, 1.0, threshold < keep); }
  return smoothstep(threshold - ${Y(p7)}, threshold + ${Y(p7)}, keep);
}

fn decor_tailKeep(tail: f32, candidateId: u32) -> f32 {
  if (tail >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${O5.toString(16)}u) < tail);
}

fn decor_qualityKeep(keep: f32, candidateId: u32) -> f32 {
  if (keep >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${_7.toString(16)}u) < keep);
}

fn decor_nearKeep(distance: f32, radius: f32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let share = min(1.0, radius / max(distance, 1e-6));
  return share * share;
}

fn decor_nearArrivalWear(distance: f32, radius: f32, floor: f32, candidateId: u32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let threshold = decor_stableThreshold(candidateId, 0x${_7.toString(16)}u);
  if (threshold < floor) { return 0.0; }
  let share = radius / max(distance, 1e-6);
  return 1.0 - clamp((share * share - threshold) / (${Y(v5)} * max(threshold, 1e-6)), 0.0, 1.0);
}

fn decor_staticKeep(coverage: f32, candidateId: u32) -> f32 {
  if (coverage >= 1.0) { return 1.0; }
  if (coverage <= 0.0) { return 0.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x85ebca6bu) < coverage);
}
`;var o7=17;var U$=3,L5="1.45";function r7($){return`struct DecorItem {
  color: vec4f,
  scaleRanges: vec4f,
  windA: vec4f,
  windB: vec4f,
  tipColor: vec4f,
  fx: vec4f,
  regions: array<vec4f, ${U$}>,
  geometry: vec4f,
  uvRegion: vec4f,
  transition: vec4f,
  tileBirthLods: array<vec4f, ${U$}>,
  tileBirthMeta: vec4f,
  flags: vec4f,
  law: vec4f,
  coverA: vec4f,
  coverB: vec4f,
  recordsShift: vec4f,
  runClamp: vec4u,
  runMirror: vec4u,
  runEase: vec4u,
}
@group(${$}) @binding(0) var<uniform> item: DecorItem;`}function t7(){return`fn decor_levelForSlot(slot: u32) -> u32 {
  if (item.regions[2].y > 0.5 && slot >= u32(item.regions[2].x)) { return 2u; }
  if (item.regions[1].y > 0.5 && slot >= u32(item.regions[1].x)) { return 1u; }
  return 0u;
}

fn decor_footprintPixels(distance: f32) -> f32 {
  let focal = min(frame.proj[1][1] * frame.lodHeight * 0.5, ${Y(d7)});
  let orthographic = frame.proj[3][3] > 0.5;
  return item.law.x * focal / select(max(distance, 1e-3), 1.0, orthographic);
}

fn decor_nearEyeKeep(toEye: vec3f) -> f32 {
  let scale = frame.proj[1][1] / max(length(toEye.xz), 1e-3);
  let root = max(-frame.eyeRise * scale, -1.0);
  let top = clamp((item.law.z - frame.eyeRise) * scale, -1.0, 1.0);
  return 1.0 - smoothstep(${Y(n7)}, ${Y(l7)}, (top - root) * 0.5);
}

fn decor_propTail(distance: f32) -> f32 {
  let reach = item.law.y * max(distance, 0.0);
  if (reach <= 1.0) { return 1.0; }
  let near = 1.0 / reach;
  return near * near;
}

fn decor_lawKeep(toEye: vec3f, level: u32, prop: bool) -> f32 {
  return select(decor_levelKeep(decor_footprintDensity(decor_footprintPixels(length(toEye))) * decor_nearEyeKeep(toEye), level), 1.0, prop);
}

fn decor_birthVisibility(time: f32) -> f32 {
  return select(1.0, smoothstep(item.transition.x, item.transition.x + item.transition.y, time), item.transition.y > 1e-5);
}

fn decor_tileBirthStart(worldPosition: vec3f) -> f32 {
  for (var lod = 0u; lod < ${U$}u; lod += 1u) {
    let info = item.tileBirthLods[lod];
    let gridSize = i32(info.w);
    if (gridSize <= 0 || info.z <= 0.0) { continue; }
    let cell = vec2i(floor((worldPosition.xz - info.xy) * info.z));
    if (any(cell < vec2i(0)) || any(cell >= vec2i(gridSize))) { continue; }
    let index = u32(item.tileBirthMeta[lod]) + u32(cell.y * gridSize + cell.x);
    let birth = tileBirths[index];
    if (birth >= 0.0) { return birth; }
  }
  return -1.0;
}

fn decor_tileBirthVisibility(worldPosition: vec3f, time: f32) -> f32 {
  let birth = decor_tileBirthStart(worldPosition);
  let duration = max(item.tileBirthMeta.w, 1e-4);
  return select(1.0, smoothstep(birth, birth + duration, time), birth >= 0.0);
}

fn decor_gust(instanceXZ: vec2f, travel: vec2f, clock: f32) -> vec2f {
  let windDirLen = length(frame.wind.xy);
  let windDir = select(vec2f(0.0, -1.0), frame.wind.xy / max(windDirLen, 1e-4), windDirLen > 1e-4);
  let windSpeed = max(frame.wind.z, 0.0);
  let gustClock = clock * item.windA.w;
  let phase = terrain_hash2D(instanceXZ + vec2f(53.0, 91.0), 0.0);
  let gustUv = (instanceXZ - travel * item.windA.w) * (item.windA.z * 0.22) + vec2f(phase * 0.31);
  let gust = terrain_noise2D(gustUv, 3.1);
  let lean = 0.32 + 0.68 * gust;
  let shimmer = (terrain_noise2D(gustUv * 2.7 + vec2f(19.0, 41.0), 7.7) - 0.5) * 0.5
    + sin(gustClock * (2.6 + phase * 2.2) + phase * 6.2831853) * 0.14;
  let swayDir = windDir * lean + vec2f(-windDir.y, windDir.x) * shimmer;
  return swayDir * (item.windA.y * (windSpeed * 0.5));
}

fn decor_bend(v: vec3f, up: vec3f, gust: vec2f, weight: f32) -> vec3f {
  let lean = length(gust);
  let angle = min(lean * item.windB.x * weight, ${L5});
  if (angle < 1e-5) { return v; }
  let dir = vec3f(gust.x, 0.0, gust.y) / lean;
  let axis = normalize(cross(up, dir));
  let c = cos(angle);
  let s = sin(angle);
  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);
}`}var f5=64;function a7(){return`fn decor_runSample(uv: vec2f, layer: i32) -> vec4f {
  if (all((item.runClamp | item.runMirror) == vec4u(0u))) { return textureSample(itemTexture, itemSampler, uv, layer); }
  let gx = dpdx(uv);
  let gy = dpdy(uv);
  let size = vec2f(textureDimensions(itemTexture));
  let foot = max(abs(gx), abs(gy)) * size;
  let wide = max(foot.x, foot.y);
  let reach = max(max(wide, 0.5), f32(item.runEase.x) + 0.5 * wide);
  let edge = min(vec2f(reach) / size, vec2f(0.5));
  let at = u32(layer);
  let bit = vec2u(select(0u, 1u << (at & 31u), at < ${f5}u));
  let mirrored = (select(item.runMirror.xy, item.runMirror.zw, at >= 32u) & bit) != vec2u(0u);
  let held = mirrored | ((select(item.runClamp.xy, item.runClamp.zw, at >= 32u) & bit) != vec2u(0u));
  let tile = fract(uv * 0.5);
  let folded = select(uv, vec2f(1.0) - abs(tile * 2.0 - vec2f(1.0)), mirrored);
  let turn = select(vec2f(1.0), vec2f(-1.0), mirrored & (tile >= vec2f(0.5)));
  return textureSampleGrad(itemTexture, itemSampler, select(folded, clamp(folded, edge, vec2f(1.0) - edge), held), layer, gx * turn, gy * turn);
}`}function e7($,Q=!1,Z=null,J=!1){return["  let base = decor_candidateBase(survivorSlot);","  let instancePosition = vec3f(bitcast<f32>(records[base]), bitcast<f32>(records[base + 1u]), bitcast<f32>(records[base + 2u])) + item.recordsShift.xyz;","  let sampledNormal = decor_unpackNormal(records[base + 3u]);","  let tintCoverage = decor_unpackTintCoverage(records[base + 4u]);","  let candidateId = records[base + 5u];","  let instanceWorld = lume_worldFromRender(instancePosition);","  let instanceXZ = instanceWorld.xz;",J?"  let coverKeep = select(1.0, 0.0, decor_covered(instanceXZ.x, instanceXZ.y, instanceWorld.y));":"  let coverKeep = decor_coverKeep(instanceXZ.x, instanceXZ.y, instanceWorld.y);","  let level = decor_levelForSlot(survivorSlot);","  let region = item.regions[level];","  let dissolve = item.geometry.y <= 0.0;","  let toEyeNow = instancePosition - frame.cameraPosition;","  let toFocusNow = instancePosition - frame.focus;","  let distanceNow = select(length(toFocusNow), length(toFocusNow.xz), dissolve);","  let rootRampNow = decor_lawKeep(toEyeNow, level, dissolve) * decor_smoothVisibility(distanceNow, region.z, region.w);",J?"  let arrivalNow = coverKeep;":"  let arrivalNow = decor_birthVisibility(frame.fadeTime) * decor_tileBirthVisibility(instanceWorld, frame.fadeTime) * coverKeep;","  let rootNow = decor_distanceKeep(rootRampNow * select(arrivalNow, 1.0, dissolve), candidateId, !dissolve);","  let qualityNow = decor_qualityKeep(max(item.transition.z, decor_nearKeep(distanceNow, item.transition.w)), candidateId);","  let tailNow = decor_tailKeep(decor_propTail(length(toFocusNow)), candidateId);","  let revealNow = rootNow * qualityNow * select(1.0, arrivalNow, dissolve) * tailNow;","  let staticKeep = decor_staticKeep(tintCoverage.a, candidateId);","  let visibilityNow = select(tintCoverage.a * revealNow, staticKeep * step(1e-6, revealNow), dissolve);","  let up = select(vec3f(0.0, 1.0, 0.0), sampledNormal, item.geometry.x > 0.5);","  let reference = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(up.y) > 0.9);","  let right = normalize(cross(up, reference));","  let forward = cross(right, up);","  let heightFraction = clamp(position.y * item.windB.x + item.windB.y + item.geometry.z, 0.0, 1.0);","  let authoredUv = item.uvRegion.xy + uv * item.uvRegion.zw;","  var localPos = position;","  var localNormal = normal;","  if (item.flags.x > 0.5) {","    let widthScale = mix(item.scaleRanges.x, item.scaleRanges.y, terrain_hash2D(instanceXZ + vec2f(7.0, 13.0), 0.0));","    let heightScale = mix(item.scaleRanges.z, item.scaleRanges.w, terrain_hash2D(instanceXZ + vec2f(19.0, 23.0), 0.0));","    localPos = vec3f(localPos.x * widthScale, localPos.y * heightScale, localPos.z * widthScale);","    if (item.windA.x > 0.5) {","      let angle = terrain_hash2D(instanceXZ + vec2f(42.0, 19.0), 0.0) * 6.28318530718;","      let ca = cos(angle);","      let sa = sin(angle);","      localPos = vec3f(localPos.x * ca - localPos.z * sa, localPos.y, localPos.x * sa + localPos.z * ca);","      localNormal = vec3f(localNormal.x * ca - localNormal.z * sa, localNormal.y, localNormal.x * sa + localNormal.z * ca);","    }","  }","  var gustNow = vec2f(0.0);",...J?[]:["  if (item.flags.y > 0.5) {","    gustNow = decor_gust(instanceXZ, frame.windTravel.xy, frame.time);","  }","  if (item.geometry.w > 0.0) {",`    let press = decor_pressLean(instanceXZ) * (${h7} * item.geometry.w / max(item.windB.x, 1e-3));`,"    gustNow += press.xy;","  }"],"  let scatterWind = vec3f(dot(vec3f(gustNow.x, 0.0, gustNow.y), right), 0.0, dot(vec3f(gustNow.x, 0.0, gustNow.y), forward));",...$===null?["  let laneDisplaced = false;"]:[$],"  let bendWeight = select(sway, 0.0, laneDisplaced);","  let localNow = localPos * visibilityNow;","  let offsetNow = decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustNow, bendWeight);","  let decorWorld = instancePosition + offsetNow;",...Q?["  var gustPrev = gustNow;","  if (item.flags.y > 0.5) { gustPrev += decor_gust(instanceXZ, frame.prevWindTravel.xy, frame.prevTime) - decor_gust(instanceXZ, frame.windTravel.xy, frame.time); }",...Z===null?["  let worldPrev = instancePosition + decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustPrev, bendWeight);"]:["  let scatterWindPrev = vec3f(dot(vec3f(gustPrev.x, 0.0, gustPrev.y), right), 0.0, dot(vec3f(gustPrev.x, 0.0, gustPrev.y), forward));","  var localPrevPos = localPos;",Z,"  let localPrev = localPrevPos * visibilityNow;","  let worldPrev = instancePosition + decor_bend(right * localPrev.x + up * localPrev.y + forward * localPrev.z, up, gustPrev, bendWeight);"]]:[],"  let geometryNormal = normalize(decor_bend(right * localNormal.x + up * localNormal.y + forward * localNormal.z, up, gustNow, bendWeight));","  let decorNormal = select(geometryNormal, sampledNormal, item.fx.w > 0.5);"]}var $6=3,h5=6,g5=[{name:"position",format:"float32x3",offset:0},{name:"normal",format:"float32x3",offset:12},{name:"uv",format:"float32x2",offset:24},{name:"color",format:"float32x3",offset:32},{name:"sway",format:"float32",offset:44},{name:"tex",format:"float32",offset:48},{name:"layer",format:"float32",offset:52},{name:"glow",format:"float32x2",offset:56},{name:"pbr",format:"float32",offset:64}],E5=o7*4,p5=4,_5=5,c5=6,u5=7,m5=8,d5=9;function Q6($,Q=2,Z=h5){if($==="vertex")return"";return`@group(${Q}) @binding(${Z}) var<storage, read> decorArena: array<f32>;
${s7({structName:"DecorVertex",fnName:"decor_pullVertex",bufferName:"decorArena",attributes:g5,arrayStride:E5,baseElementExpr:"vertexIndex"})}`}function Z6($=!1,Q=!1){return["@location(0) position: vec3f","@location(1) normal: vec3f","@location(2) uv: vec2f",`@location(${p5}) color: vec3f`,`@location(${_5}) sway: f32`,`@location(${c5}) tex: f32`,`@location(${u5}) layer: f32`,...$?[`@location(${m5}) glow: vec2f`]:[],...Q?[`@location(${d5}) pbr: f32`]:[]]}function J6($,Q=!1,Z=!1){if($==="vertex")return"";return`  let decorVertex = decor_pullVertex(vertexIndex);
  let position = decorVertex.position;
  let normal = decorVertex.normal;
  let uv = decorVertex.uv;
  let color = decorVertex.color;
  let sway = decorVertex.sway;
  let tex = decorVertex.tex;
  let layer = decorVertex.layer;${Q?ba():""}${Z?`
  let pbr = decorVertex.pbr;`:""}`}var R=256;var l5=8;var R9=($,Q)=>`fn ${$}(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = p - i;
  let at = i - ${R}.0 * floor(i / ${R}.0);
  return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / ${R}.0, 0.0).${Q};
}`,i5=`@group(2) @binding(${l5}) var groundLattice: texture_2d<f32>;`,p4=[i5,R9("terrain_lattice0","r"),R9("terrain_lattice1","g"),R9("terrain_lattice2","b"),R9("terrain_lattice3","a")].join(`
`);var j$=127;var z6=4,a4=(1<<z6*z6)-1;var s5=`fn terrain_hash2D(p: vec2<f32>, seed: f32) -> f32 {
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

//${R}${R/2}${R/2}
fn terrain_latticeWrap(i: vec2<f32>) -> vec2<f32> {
  return i - ${R}.0 * floor((i + vec2<f32>(${R/2}.0)) / ${R}.0);
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
}`,r5=($)=>`${s5}

fn terrain_fractalNoise(p: vec2<f32>, seed: f32) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var frequency = 1.0;
  for (var octave = 0; octave < ${$}; octave++) {
    value += terrain_noise2D(p * frequency, seed + f32(octave) * 17.0) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return clamp(value, 0.0, 1.0);
}

`,q6=r5("3");var GZ=`fn terrain_wordLayers(word: u32) -> vec3<u32> { return (vec3<u32>(word) >> vec3<u32>(26u, 20u, 14u)) & vec3<u32>(0x3fu); }
fn terrain_wordQuanta(word: u32) -> vec3<u32> {
  let q = (vec2<u32>(word) >> vec2<u32>(7u, 0u)) & vec2<u32>(0x7fu);
  return vec3<u32>(q, ${j$}u - min(q.x + q.y, ${j$}u));
}`;var t5=3,a5=4,e5=5,$Q=6,QQ=7,ZQ=8,B$="lume:decorPaint";var T9=($)=>$==="dissolve",H$="  // @lume:positionNode",K6="  // @lume:positionNode:previous",JQ="  let decorModel: mat4x4<f32> = mat4x4<f32>(vec4<f32>(right, 0.0), vec4<f32>(up, 0.0), vec4<f32>(forward, 0.0), vec4<f32>(instancePosition, 1.0));";function zQ($="vertex",Q="vertex",Z="dissolve",J=!1){let z=(q)=>[...Q==="storage"?[J6(Q)]:[],v7($),V6({struct:"Varyings"}),...e7(H$,J&&!q,J&&!q?K6:null,q).flatMap((X)=>X===H$?[JQ,X]:[X]),"  let worldPos = vec4<f32>(decorWorld, 1.0);"];return{key:`terrain/decor-scatter${U6($)}${Q==="storage"?"-attr-s":""}-${Z}`,declarationsWgsl:`${r7(3)}
@group(3) @binding(1) var<storage, read> records: array<u32>;
@group(3) @binding(2) var<storage, read> tileBirths: array<f32>;
${g7(3,e5)}
${E7(3,$Q)}
${X6($,3,t5)}
${Q6(Q,3,a5)}
${q6}
${S7}
${O7}
${i7}
${t7()}
${qQ}`,entryParams:[...Q==="storage"?[]:Z6(),Y6($,$6),"@builtin(vertex_index) vertexIndex: u32",...$==="storage"?[]:["@builtin(instance_index) instanceIndex: u32"]],positionWgsl:z(!1),...J?{previousPositionWgsl:["  let previousWorldPos = vec4<f32>(worldPrev, 1.0);"]}:{},...T9(Z)?{coverage:b7("revealNow")}:{},...T9(Z)?{casts:!0,casterPositionWgsl:z(!0)}:{},fragmentCut:T9(Z)?{lines:L7,varyings:[]}:{lines:[w7],varyings:[{input:"lume:levelHide",name:"levelHide",type:"f32",flat:!0}],entries:Z==="keep"?"plain":"cut"},lightsOnce:!0,localPositionSlot:{marker:H$,variable:"localPos",displacedFlag:"laneDisplaced",...J?{previous:{marker:K6,variable:"localPrevPos",renames:{scatterWind:"scatterWindPrev"}}}:{}},normalFacingKept:"select(0.0, 1.0, item.fx.w > 0.5)",inputs:{uv:"authoredUv",normalWorld:"decorNormal",normalLocal:"localNormal",positionLocal:"localPos",positionGeometry:"position",positionWorld:"(instancePosition + right * localPos.x + up * localPos.y + forward * localPos.z)",modelMatrix:"decorModel",vertexColor:"vec4<f32>(color, 1.0)","attribute:scatterRandom":"terrain_hash2D(instanceXZ + vec2<f32>(29.0, 47.0), 0.0)","attribute:scatterPosition":"instanceWorld","attribute:scatterGroundTint":"tintCoverage.rgb","attribute:scatterHeightFraction":"heightFraction","attribute:scatterWind":"scatterWind","attribute:scatterFar":"select(1.0 - decor_footprintDensity(decor_footprintPixels(length(toEyeNow))) * decor_smoothVisibility(distanceNow, region.z, region.w), 0.0, dissolve)",...T9(Z)?{}:{"lume:levelHide":"decorLevelHide"},"lume:decorPaintUv":"vec2<f32>(authoredUv.x, 1.0 - authoredUv.y)","lume:decorPaintWord":"tex","lume:decorPaintTint":"select(mix(item.color.rgb, item.tipColor.rgb, item.tipColor.a * heightFraction) * color, color, tex > 0.5)"},varyings:[{input:"attribute:scatterRandom",name:"scatterRandom",type:"f32",flat:!0},{input:"attribute:scatterPosition",name:"scatterPosition",type:"vec3f",flat:!0},{input:"attribute:scatterGroundTint",name:"scatterGroundTint",type:"vec3f",flat:!0},{input:"attribute:scatterHeightFraction",name:"scatterHeightFraction",type:"f32"},{input:"attribute:scatterWind",name:"scatterWind",type:"vec3f",flat:!0},{input:"attribute:scatterFar",name:"scatterFar",type:"f32",flat:!0}],fragmentReads:{inputs:{[B$]:"decorPaint"},lines:["  let decorPaint = decor_paint(in.decorPaintUv, in.decorPaintWord, in.decorPaintTint);"],varyings:[{input:"lume:decorPaintUv",name:"decorPaintUv",type:"vec2f"},{input:"lume:decorPaintWord",name:"decorPaintWord",type:"f32",flat:!0},{input:"lume:decorPaintTint",name:"decorPaintTint",type:"vec3f"}]}}}var qQ=`@group(3) @binding(${QQ}) var itemTexture: texture_2d_array<f32>;
@group(3) @binding(${ZQ}) var itemSampler: sampler;
${a7()}
fn decor_paint(uv: vec2<f32>, word: f32, tint: vec3<f32>) -> vec4<f32> {
  let picture = decor_runSample(uv, max(i32(round(word)) - 1, 0));
  return select(vec4<f32>(tint, 1.0), vec4<f32>(picture.rgb * tint, picture.a), word > 0.5);
}`;function F6($){return{vertexPath:zQ($.survivorSource,$.attributeSource,$.arm,$.motion),pass:$.pass,motion:$.motion,instancing:"none"}}var KQ=0.5,j6=()=>({random:G("scatterRandom","f32"),position:G("scatterPosition","vec3f"),groundTint:G("scatterGroundTint","vec3f"),heightFraction:G("scatterHeightFraction","f32"),wind:G("scatterWind","vec3f"),far:G("scatterFar","f32")});function XQ($){return $.opacityNode!==null||$.alphaTest>0||$.colorNode?.type==="vec4f"}function H6($,Q){if(Q?.color!==void 0)$.color=Q.color;if(Q?.emissive!==void 0)$.emissive=Q.emissive;if(Q?.emissiveIntensity!==void 0)$.emissiveIntensity=Q.emissiveIntensity;if(Q?.metalness!==void 0)$.metalness=Q.metalness;if(Q?.roughness!==void 0)$.roughness=Q.roughness;if(Q?.alphaTest!==void 0)$.alphaTest=Q.alphaTest;$.side="double",$.transparent=!1,$.transmission=0;let Z=XQ($);if(Z)$.alphaTest=Math.max($.alphaTest,KQ);if($.colorNode===null){let J=k(B$,"vec4f",{fragmentOnly:!0});$.colorNode=Z?O(L.mul(J.xyz),J.w):L.mul(J.xyz)}}function M6($){switch($){case"add":case"screen":return"add";case"multiply":return"multiply";case"subtract":return"subtract";case"distort":return"distort";case"alpha":default:return"alpha"}}var LZ=-B6*0.25;var G6="0.002";var x6="fx",P6=["x","y","z","w"];function YQ($){return new Proxy($,{get(Q,Z){if(typeof Z!=="string")return;return Q[Z]??Y9(0)},has:()=>!0})}function VQ($,Q){let Z=Q===void 0||Q===null?M$:M$.add(A(Q).mul(A(1,-1)));return $.sample(Z)}function G$($,Q=!1){let Z={},J=G("fxParams","vec4f");return $.slice(0,P6.length).forEach(function(z,q){Z[z]=J.swizzle(P6[q])}),{uvAlong:u().x,uvAcross:u().y,viewDir:G("fxViewDir","vec3f"),normal:C6,color:G("fxColor","vec3f"),alpha:G("fxAlpha","f32"),size:G("fxSize","f32"),seed:G("fxSeed","f32"),params:YQ(Z),scene(z){return VQ(O9,z)},texture(z){return UQ(Q,z)}}}function UQ($,Q){if(!$)return O(1,1,1,1);let Z=Q===void 0||Q===null?u():A(Q);return e("vec4f")`textureSample(fx_ribbon_tex, fx_ribbon_smp, ${A(Z.x,D6(Z.y))}, 0)`}function FQ($){switch($){case"add":return"additive";case"multiply":return"multiply";case"subtract":return"subtractive";case"alpha":case"distort":return"normal"}}function P$($){return{blend:$.blend===null?null:M6($.blend),soft:$.soft,twoSided:$.path!=="mesh"||$.twoSided}}function S9($,Q){if(Q.blend!==null&&!$.transparent&&$.blending==="normal")V9($),$.blending=FQ(Q.blend);if(Q.twoSided&&!$.sideAuthored)$.side="double";if(Q.soft>0&&$.transparent&&$.blending!=="none"){let Z=$.opacityNode??Y9($.opacity);$.opacityNode=Z.mul(A6(Q.soft))}}function W6($,Q,Z){let J=Z.mul(Q.texture().w),z=A(Q.color.x,Q.color.y).mul(J);$.colorNode=Q.scene(z).xyz,$.opacityNode=J.mul(y6(0,Number(G6),N6(z))),V9($),$.blending="normal"}function I6($,Q,Z=!1){let J=P$($),z=J.blend,q=Q.alpha;if($.path!=="mesh"){let V=new a("unlit");if(V.fog=z===null||z==="alpha",V.depthWrite=!1,z==="distort")W6(V,Q,q);else if($.textured){let U=Q.texture();V.colorNode=Q.color.mul(U.xyz),V.opacityNode=q.mul(U.w)}else V.colorNode=Q.color,V.opacityNode=q;return S9(V,{...J,blend:z==="distort"?null:z??"alpha"}),V}let X=new a(Z?"pbr":"lambert");if(Z)X.roughnessNode=1,X.metalnessNode=0;if(z==="distort")W6(X,Q,q);else if(X.colorNode=Q.color,z!==null)X.opacityNode=q;return S9(X,{...J,blend:z==="distort"?null:z}),X}var jQ=($,Q)=>HQ($?.filter,Q?.filter,"pixel","linear");function HQ($,Q,Z,J){let z=$===Z||$===J?$:Q;if(z===Z)return Z;return z===J?J:void 0}function h($){return typeof $==="string"&&$.length>0?$:null}function BQ($,Q){let Z=MQ($),J=jQ($,Q);return Z!==null&&J!==void 0?{...Z,filter:J}:Z}function MQ($){if(!$)return null;let Q=h($.albedoHeightMap),Z=h($.nroMap),J=h($.emissiveMap);if(Q!==null||Z!==null)return{kind:"packed",albedoHeight:Q,nro:Z,emissive:J};let z=h($.map),q=z!==null&&!k6(z)?z:null,X=h($.normalMap),V=h($.roughnessMap),U=h($.metalnessMap),K=h($.alphaMap);if(X!==null||V!==null||U!==null||K!==null||J!==null)return ca(q,X,V,U,K,J);return da(q);}function GQ($){if($.kind==="packed")return $.albedoHeight;return $.kind==="singles"?$.baseColor:$.map}function R6($){let Q=BQ($);return Q===null||Q.kind==="packed"?null:GQ(Q)};var b6=[{binding:O6,variable:v6},{binding:w6,variable:"airVolume"},{binding:11,variable:"cloudShadowField"}];var PQ=1;function W$($){let Q=0;for(let Z of $)if(Z.texture!==void 0&&(Z.visibility&2)!==0)Q+=1;return Q}function WQ(){let $=new Set(b6.map((Q)=>Q.binding));return W$(A$.filter((Q)=>!$.has(Q.binding)))}function AQ(){return W$(h6)+W$(A$)+PQ}function NQ($){let Q=L6($).size;return($.shadingModel==="matcap"&&$.matcapTexture!==null?1:0)+(f6($)?1:0)+($._surfaceMap!==null?1:0)+Q}function g6($,Q){let Z=$?.maxSampledTexturesPerShaderStage;if(Z===void 0)return null;let J=NQ(Q);return{ownArm:Z-(Q.shadingModel==="unlit"?0:WQ())-J,everyArm:Z-AQ()-J}}function J8($,Q){return JSON.stringify(Q===b9?$:{...$,hold:(Q&n6)===0?null:$.hold,cut:(Q&l6)===0?null:$.cut})}function R$($,Q=o6){let Z=Q($.library,$.entry,$.script,{placeId:$.placeId,drawsWearerColors:$.groundSurface===void 0,still:$.still,groundSurface:$.groundSurface,cameraFace:t6($.overrides)!==null,liveGates:$.liveGates});if(!Z)return null;return wQ(Z,$.overrides),{shade:Z,surfaceUnread:Z.colorNode!==null&&!z8(Z)}}function z8($){let Q=x9.flatMap((z)=>$[z]??[]),Z=f($);if(Z)I9(Z,Q);let J=new Set;return Q.some((z)=>k9(z,J,(q)=>q.meta.kind==="input"&&q.meta.name==="materialColor"))}function q8($,Q){let Z=i6($)?.viewRef??null;if(!$.sideAuthored&&$.side==="double"&&Z8($)!==void 0&&Z===null)$.side="front",$.sideAuthored=!1;let J=RQ($,Q.overrides,Q.surface),z=Q.base.vertexLayout?.attributes.map((F)=>F.name)??[],q=(Q.surface?.maps??[]).map((F)=>xQ($,F,z));if(IQ($,z),kQ($))$.alphaTest=0;let X=g6(Q.limits,$);if(X!==null)r6($,X);let V=f($),U={...Q.base,lighting:Q.lighting,fragmentScope:V,vertexScope:V},K=N$(m($,U),Q.quietOnce),j=S6(Q.limits,[...(K.storages??[]).map((F)=>F.ref),...(K.compute??[]).flatMap((F)=>F.storages)],K.compute??[]);if(j)throw j;let H=T6(Q.limits,K.textures,K.compute??[]);if(H)throw H;let M=Q.motionToo&&K.motion!==!0?N$(m($,E6(U,K,"motion")),Q.quietOnce):null,B=Q.marksToo&&K.loopMarks===!0&&!K.throughMarks?N$(m($,E6(U,K,"loopMarks")),Q.quietOnce):null;return{shade:$,assembled:K,motionAssembled:M,marksAssembled:B,surfaceTexture:J,slotMaps:q,options:U}}var CQ={pbr:3,physical:3,phong:2,lambert:2,toon:2,matcap:1,unlit:0},DQ=I$(Q8),yQ=I$($8);function xQ($,{slot:Q,handle:Z,uv:J,transform:z,scale:q,channel:X,factors:V},U){let K={normal:$.normalNode,occlusion:$.aoNode,metalRough:$.metalnessNode&&$.roughnessNode,roughness:$.roughnessNode,metalness:$.metalnessNode}[Q];if((Q==="normal"?0:1+Number(Q!=="occlusion"))>=CQ[$.shadingModel]||K)return null;let j=K8(Z);j.readsData=!0;let H=X8(u(J),z??void 0),M=j.sample(H);if(Q==="normal"){let B=(F)=>(X==="xy"?D$(yQ,"patina_packedNormalTs",[F,Y9(q)],"vec3f"):m6(F,q)).mul(c6(1,-1,1));$.normalNode=d6(D$(DQ,"lume_meanFreeNormal",[B(M),B(j.sampleLevel(A(0.5),32))],"vec3f"),H)}else if(Q==="occlusion")$.aoNode=M.r.sub(1).mul(q).add(1);else{let B=X==="b"?M.b:M.g;if(V)[$.metalness,$.roughness]=[$._metalnessAuthored?$.metalness:V[0],$._roughnessAuthored?$.roughness:V[1]];if(Q!=="roughness")$.metalnessNode??=w9(U,!0).mul(M.b);if(Q!=="metalness")$.roughnessNode??=w9(U,!1).mul(q===1?B:B.sub(1).mul(q).add(1))}return j}function E6($,Q,Z){return{...$,[Z]:!0,materialBlocks:Q.materialBlocks?"kept":void 0}}function IQ($,Q){if(Q.includes("pbr"))$.emissiveNode??=_6,$.metalnessNode??=w9(Q,!0);if(Q.includes("roughness"))$.roughnessNode??=w9(Q,!1)}function w9($,Q){let Z=Q?e("f32")`material.metalness`:e("f32")`material.roughness`,J=Q?G("pbr","vec4f").w:G("roughness","f32");return $.includes(Q?"pbr":"roughness")?e("f32")`select(${Z}, ${J}, ${J} >= 0.0)`:Z}function kQ($){if($.alphaTest<=0||$.alphaTest>=1||$.colorNode?.type==="vec4f")return!1;let Q=$.opacityNode;return Q!==null&&Q.meta.kind==="const"&&Q.meta.values.length>0&&Q.meta.values.every((Z)=>Z>=1)}function N$($,Q){if(!Q)return $;let{text:Z,added:J}=e6($.wgsl,!0);if(Z===$.wgsl)return $;let z=[...$.pipelineKeyParts],q=z.indexOf("wgsl");if(q>=0)z[q+1]=a6(Z);return{...$,wgsl:Z,pipelineKeyParts:z,declaredFolds:$.declaredFolds|J}}function RQ($,Q,Z){if(!Z)return null;let J=z8($),z=Z.partPicture===!0?R6(Q):null,q=z!==null||Z.textureHandle!==void 0,X=()=>TQ(z!==null?s6($,z):K8(Z.textureHandle),Q);if($.colorNode){if(!J||!q)return null;let j=X();return $._surfaceMap=p6(j,Z),z!==null?null:j}if(Q?.color===void 0){if(z!==null)$.color=typeof Q?.tint==="number"?v9(Q.tint):[1,1,1];else if(Z.color)$.color=[...Z.color]}let V=null,U=null,K=!1;if(q)if(V=X(),J)$._surfaceMap=p6(V,Z),U=O(L,k(u6,"f32",{fragmentOnly:!0})),K=!0;else U=V.sample(X8(u(Z.textureUv??0),Z.textureTransform));if(Z.vertexColor){let j=y9();U=U?U.mul(j):j}if(!U)return null;return $.colorNode=K?U:U.mul(O(L,1)),z!==null?null:V}function K8($){let Q=x$($);Q._measured=!0;let Z=k$($);if(Z!==void 0)Q._residency=Z;return Q}function TQ($,Q){let Z=Q?.filter;if(Z==="pixel")$.magFilter=1003;else if(Z==="linear")$.magFilter=1006,$.minFilter=1008;return $}function p6($,Q){return{texture:$,uv:Q.textureUv??0,transform:Q.textureTransform}}function X8($,Q){if(Q===void 0)return $;let Z=$.mul(A(Q.scale[0],Q.scale[1])),J=Math.cos(Q.rotation),z=Math.sin(Q.rotation);return(Q.rotation===0?Z:A(Z.dot(A(J,z)),Z.dot(A(-z,J)))).add(A(Q.offset[0],Q.offset[1]))}var SQ=["metalness","roughness","opacity","emissiveIntensity","alphaTest","polygonOffsetFactor","polygonOffsetUnits"],OQ=["wireframe","depthWrite","depthTest","polygonOffset","premultipliedAlpha","colorWrite","clipIntersection","clipShadows"],vQ=["blending","blendSrc","blendDst","blendEquation","blendSrcAlpha","blendDstAlpha","blendEquationAlpha","clippingPlanes"];function C$($,Q,Z,J){for(let z of Z){let q=Q[z];if(J===void 0?q!==void 0:typeof q===J)Reflect.set($,z,q)}}function wQ($,Q){if(!Q)return;if(typeof Q.color==="number")$.color=v9(Q.color);if(typeof Q.emissive==="number")$.emissive=v9(Q.emissive);if(Q.side)$.side=Q.side;C$($,Q,SQ,"number"),C$($,Q,OQ,"boolean"),C$($,Q,vQ,void 0);let Z=bQ(Q);if(Z!==void 0)$.renderOrder=Z;if(!$.transparent&&(Q.transparent===!0||$.opacity<1))V9($);if(Q.drawsOver&&y$())$.depthTest=!0}function bQ($){if($?.drawsOver&&y$())return 0;let Q=$?.renderOrder;return T(Q)?Q:void 0}var p9=0,R8=1,b$=2,T8=3,S8=4,I=5,L9=14,LQ=["N","U","V","T","B","W","F","C","O"],Y8=I,fQ=I+1,hQ=I+2,gQ=I+3,EQ=I+4,pQ=I+5,_Q=I+6,cQ=I+7,$9=I+8,uQ=-134217728,mQ=134217727,g=p9,dQ=16|p9,nQ=32|p9,lQ=48|p9;var N=($,Q)=>Q<<4|$,d=($)=>$&15,E=($)=>$>>4,h9=5,L$=5,O8=2,p=5,T$=3,g9=3,v8=0,_9=1,f$=2,h$=3,E9=4,w8=5,b8=6,c9=7,V8=8,iQ=16;class x extends Error{constructor($){var $lpt0;super(`a graph image cannot carry ${$}`),"what"in this?$lpd0(this,"what",void 0):this.what=void 0;this.what=$;this.name="GraphImageRefusal"}}class g${constructor($,Q){this.words=void 0;this.n=0;this.make=void 0;this.make=$,this.words=$(Q)}push($){if(this.n===this.words.length){ea.call(this);}return this.words[this.n]=$,this.n++}done(){let $=this.make(this.n);return $.set(this.words.subarray(0,this.n)),$}}var v=()=>new g$(($)=>new Int32Array($),64),U8=()=>new g$(($)=>new Float64Array($),16),oQ=($)=>$===null||typeof $!=="object"&&typeof $!=="function"&&typeof $!=="symbol",F8=($,Q)=>Q===void 0?$:`${$} ${Q}`;function sQ($){let Q;for(let Z of D8){let J=$[Z];if(Number.isFinite(J))(Q??={})[Z]=J}return Q}function rQ($){let Q=sQ($);return{h:g,f:$.flipY,w:$.wrap,s:$.sampleType,...$.fragmentOnly===void 0?{}:{fo:$.fragmentOnly,foi:$.fragmentOnlyInput??""},...$.decodeSrgb===!0?{ds:!0}:{},...$.readsData===!0?{rd:!0}:{},...$._measured===!0?{ms:!0}:{},...Q===void 0?{}:{sw:Q},...$.dimension===void 0?{}:{dm:$.dimension}}}var j8=0,H8=1,B8=2,M8=3,G8=4,P8=5;class E${constructor($){this.options=void 0;this.strs=[];this.strIndex=new Map;this.types=[];this.models=[];this.nums=U8();this.nodes=v();this.ins=v();this.slots=v();this.slotVals=U8();this.vars=v();this.objs=v();this.ents=v();this.fns=v();this.comps=v();this.roots=v();this.bins=[];this.texs=[];this.stors=[];this.blks=[];this.mods=[];this.memo=new Map;this.blocks=new Map;this.pendingKind=[];this.pendingIndex=[];this.pendingObject=[];this.singletonNames=new Map;this.options=$;if($.singletons)for(let[Q,Z]of $.singletons)this.singletonNames.set(Z,Q)}write($){fa.call(this,$);for(let Q=this.pendingKind.pop();Q!==void 0;Q=this.pendingKind.pop()){let Z=this.pendingIndex.pop()??ga(),J=this.pendingObject.pop()??ha();this.fill(Q,Z,J)}return ia.call(this);}refOf($){let Q=this.memo.get($);if(Q===void 0)return null;let Z=d(Q);if(Z===L9)return["G",this.strs[E(Q)]];return Z>=I&&Z<L9?[LQ[Z-I],E(Q)]:null}str($){let Q=this.strIndex.get($);if(Q===void 0)Q=this.strs.push($)-1,this.strIndex.set($,Q);return Q}type($){let Q=this.types.indexOf($);return Q>=0?Q:this.types.push($)-1}num($){return Number.isInteger($)&&$>=uQ&&$<=mQ&&!Object.is($,-0)?N(R8,$):N(b$,this.nums.push($))}ref($,Q,Z){if(oQ($))switch(typeof $){case"undefined":return dQ;case"boolean":return $?lQ:nQ;case"number":return this.num($);case"string":return N(T8,this.str($));case"bigint":return N(S8,this.str(String($)));default:return g}if(typeof $==="function")ja(Q,Z);if(typeof $==="symbol")ka(Q,Z);let J=$,z=this.memo.get(J);if(z!==void 0)return z;let q=this.singletonNames.get(J),X=q===void 0?this.row(J):N(L9,this.str(q));return this.memo.set(J,X),X}row($){if($ instanceof O$){let Z=this.nodes.n/h9;return this.nodes.push(this.type($.type)),this.nodes.push(g),this.nodes.push(0),this.nodes.push(0),this.nodes.push(0),this.later(Y8,j8,Z,$)}if($ instanceof x8){let Z,J;{la.call(this,$);Z=aa[0];J=aa[1]}for(let z=0;z<J.length;z+=1)this.slotVals.push(J[z]);return N(fQ,Z)}if($ instanceof y8){let Z=this.vars.n/O8;return this.vars.push(this.type($.type)),this.vars.push($.label===null?0:this.str($.label)+1),N(hQ,Z)}if(f9($))return this.later(gQ,H8,this.texs.push(rQ($))-1,$);if(w$($))return ma.call(this,$);if(I8($))return na.call(this,$);if(v$($)){return oa.call(this,$);}if($ instanceof S$){return pa.call(this,$);}let Q=this.objs.n/p;for(let Z=0;Z<p;Z+=1)this.objs.push(0);return this.later($9,P8,Q,$)}blockRow($){let Q=this.blocks.get($);if(Q!==void 0)return Q;let Z={k:$.kind,m:$.module===null?-1:this.str($.module),ms:[],w:$.words,bd:g},J=this.blks.push(Z)-1;return this.blocks.set($,J),Z.ms=$.members.map((z)=>this.ref(z,"storage block member")),Z.bd=$.bound===null?g:this.ref($.bound,"storage block"),J}later($,Q,Z,J){return this.pendingKind.push(Q),this.pendingIndex.push(Z),this.pendingObject.push(J),N($,Z)}fill($,Q,Z){switch($){case j8:if(Z instanceof O$)this.fillNode(Q,Z);return;case H8:qa.call(this,Z,Q);return;case B8:{if((sa=ta.call(this,Z,Q))!==ra)return sa}case M8:{if((sa=ua.call(this,Z,Q))!==ra)return sa}case G8:va.call(this,Z,Q);return;case P8:this.objectRow(Q,Z);return}}fillNode($,Q){let Z=Q.inputs,J=this.ins.n;for(let K=0;K<Z.length;K+=1){let j=this.ref(Z[K],"an input of node",Q.meta.kind);if(d(j)!==Y8)wa(Q);this.ins.push(E(j))}let z=this.ref(Q.meta,"the meta of node",Q.meta.kind),q=this.options.compatSlotOf?.(Q)??null,X=q===null?0:E(this.ref(q,"the compat slot of node",Q.meta.kind))+1,V=$*h9,U=this.nodes.words;U[V+1]=z,U[V+2]=X,U[V+3]=J,U[V+4]=Z.length}objectRow($,Q){let Z=this.ents.n,J,z=0,q=0,X=0;if(ArrayBuffer.isView(Q)||Q instanceof ArrayBuffer)J=E9,z=this.bins.push(Q)-1;else if(Array.isArray(Q)){J=_9|(Object.isFrozen(Q)?V8:0);for(let K=0;K<Q.length;K+=1)this.ents.push(this.ref(Q[K],"array index",K));q=Q.length}else if(Q instanceof Map)J=f$,q=this.mapEntries(Q);else if(Q instanceof Set){J=h$;xa.call(this,Q);q=Q.size}else if(Q instanceof a){J=w8;let K=this.models.indexOf(Q.shadingModel);z=K>=0?K:this.models.push(Q.shadingModel)-1,q=this.fields(Q,"material",(H)=>H!=="shadingModel"&&H!=="userData");{X=ya.call(this,X,Q)}}else{let K=Object.getPrototypeOf(Q);if(K===Object.prototype||K===null)J=v8|(Object.isFrozen(Q)?V8:0)|(K===null?iQ:0),q=this.fields(Q,"object",null);else{let j=this.classOf(Q,K);J=b8,z=this.str(j),q=this.fields(Q,j,null)}}let V=$*p,U=this.objs.words;U[V]=J,U[V+1]=z,U[V+2]=Z,U[V+3]=q,U[V+4]=X}mapEntries($){for(let[Q,Z]of $){let J=this.ref(Q,"<key>"),z=this.ref(Z,"<value>");this.ents.push(J),this.ents.push(z)}return $.size}classOf($,Q){let Z=this.options.classes??{},J=Object.keys(Z).find((z)=>Z[z].prototype===Q);if(J===void 0)throw new x(`an instance of ${k8($)??"an unknown class"}`);return J}fields($,Q,Z){let J=0;for(let z of Object.keys($)){let q=Object.getOwnPropertyDescriptor($,z);if(q===void 0)continue;if(q.get!==void 0||q.set!==void 0)Aa(Q,z);if(Z!==null&&!Z(z))continue;let X=this.str(z),V=this.ref(q.value,Q,z);this.ents.push(X),this.ents.push(V),J+=1}return J}}function Q9($,Q={}){return new E$(Q).write($)}function L8($,Q,Z){let J=new E$(Q);return{image:J.write($),marks:Z.map((q)=>J.refOf(q))}}function W8($){throw Error(`graph image: ${$}`)}function f8($){let Q=[];for(let Z=0;Z<$.slots.length;Z+=L$)Q.push(Array.from($.slotVals.subarray($.slots[Z+3],$.slots[Z+3]+$.slots[Z+4])));return Q}function h8($,Q){if(Q[0]!=="O"||typeof Q[1]!=="number")return null;let Z=Q[1],J=Z*p;if(J>=$.objs.length||($.objs[J]&c9)!==v8)return null;let z=[],q=$.objs[J+2];for(let V=0;V<$.objs[J+3];V+=1){let U=$.ents[q+2*V+1];if(d(U)>=I&&!tQ($,U,z))return null}let X=new Map([[N($9,Z),0]]);for(let V of z)X.set(N($9,V),0);aQ($,function(V){let U=X.get(V);if(U!==void 0)X.set(V,U+1)});for(let V of z)if(X.get(N($9,V))!==1)return null;return{index:Z,holders:X.get(N($9,Z))??0,tables:z}}var A8=($)=>d($)===R8||d($)===b$;function N8($,Q){if(d(Q)!==$9)return null;let Z=E(Q)*p;if(Z>=$.objs.length||($.objs[Z]&c9)!==_9||$.objs[Z+4]!==0)return null;return[$.objs[Z+2],$.objs[Z+3]]}function tQ($,Q,Z){let J=N8($,Q);if(J===null)return!1;Z.push(E(Q));for(let z=0;z<J[1];z+=1){let q=$.ents[J[0]+z];if(A8(q))continue;let X=N8($,q);if(X===null)return!1;for(let V=0;V<X[1];V+=1)if(!A8($.ents[X[0]+V]))return!1;Z.push(E(q))}return!0}function aQ($,Q){for(let Z=1;Z<$.nodes.length;Z+=h9)Q($.nodes[Z]);Ba($,Q);for(let Z=0;Z<$.objs.length;Z+=p){let J=$.objs[Z]&c9,z=$.objs[Z+2],q=$.objs[Z+3]+$.objs[Z+4];if(J===_9||J===h$)for(let X=0;X<q;X+=1)Q($.ents[z+X]);else if(J===f$)for(let X=0;X<2*q;X+=1)Q($.ents[z+X]);else if(J!==E9)for(let X=0;X<q;X+=1)Q($.ents[z+2*X+1])}Ca($,Q);}function eQ($,Q){return function(Z){let J=E(Z);switch(d(Z)){case b$:{let z=$.nums[J];return`n${Object.is(z,-0)?"-0":String(z)}`}case T8:return`s${Q($.strs[J])}`;case S8:return`b${$.strs[J]}`;case L9:return`g${Q($.strs[J])}`;default:return String(Z)}}}function $2($,Q,Z,J,z,q){let X=Q*p,V=$.objs[X],U=V&c9,K=$.objs[X+1],j=$.objs[X+2],H=$.objs[X+3],M=$.objs[X+4],B="-";if(U===E9)B=q($.bins[K]);else if(U===w8)B=z($.models[K]);else if(U===b8)B=z($.strs[K]);if(Z.push(String(V),B,String(H),String(M)),U===_9||U===h$)for(let F=0;F<H;F+=1)Z.push(J($.ents[j+F]));else if(U===f$)for(let F=0;F<2*H;F+=1)Z.push(J($.ents[j+F]));else if(U!==E9)for(let F=0;F<H+M;F+=1)Z.push(z($.strs[$.ents[j+2*F]]),J($.ents[j+2*F+1]))}function g8($,Q,Z,J){let z=$.strs,q=[String($.v)],X=eQ($,Z),V=(K)=>K===0?"-":Z(z[K-1]),U=$.types;q.push("N");for(let K=0;K<$.nodes.length;K+=h9)q.push(Z(U[$.nodes[K]]),X($.nodes[K+1]),String($.nodes[K+2]),String($.nodes[K+3]),String($.nodes[K+4]));Da(q,$,Z,U,V);for(let K=0;K<$.vars.length;K+=O8)q.push(Z(U[$.vars[K]]),V($.vars[K+1]));Ea(q,$,X,J,Z,z);for(let K=0;K*p<$.objs.length;K+=1)if(Q?.has(K)===!0)q.push("0");else $2($,K,q,X,Z,J);return Fa(q,$,X);}var E8=null;function Z2(){return E8??=new Map([["std.sceneColorTexture",O9]]),E8}var _$={classes:{Vector2:c8,Vector3:u8,Plane:m8},get singletons(){return Z2()},skipUserData:($)=>$===d8||$===n8||$===l8,compatSlotOf:_8,decorateCompat:p8,holdText:p$};function u9($){if($===void 0)return;try{return{ok:$()}}catch(Q){return{refused:t(Q)}}}function m9($){let{symbols:Q,outlineMask:Z,surfaceBuffer:J,seeThrough:z,lookPlane:q,uniformLayout:X,...V}=$,U=new Map;for(let D of X.slots)U.set(D.id,D);let K=[];for(let[D,n]of X.offsets){let l=U.get(D);if(l===void 0)throw new x(`an offset for slot ${D} the layout does not list`);K.push([l,n])}let j=u9(Z),H=u9(J),M=u9(z),B=u9(q),F={wgsl:U9($.wgsl),...$.vertexWgsl?{vertexWgsl:U9($.vertexWgsl)}:{},...$.shadowVertexWgsl?{shadowVertexWgsl:U9($.shadowVertexWgsl)}:{},...H!==void 0&&"ok"in H?{surface:U9(H.ok.wgsl)}:{}};return{...V,doorTexts:F,uniformLayout:{...X,offsets:K},...j===void 0?{}:{outlineMask:j},...H===void 0?{}:{surfaceBuffer:H},...M===void 0?{}:{seeThrough:M},...B===void 0?{}:{lookPlane:B}}}function i8($,Q,Z){return{graph:Q9(s8($),_$),surfaceUnread:Q,taints:Z}}function o8($,Q,Z,J){let{image:z,marks:q}=L8(s8($),_$,J);return{image:{graph:z,surfaceUnread:Q,taints:Z},marks:q}}function s8($){let Q=j9($.shade);return[$.shade,m9($.assembled),$.motionAssembled===null?null:m9($.motionAssembled),F9($.shade),$.surfaceTexture,Q,$.marksAssembled===null?null:m9($.marksAssembled),$.slotMaps]}function c$($,Q,Z,J=[]){let z=Q.map(([q,X])=>[q,m9(X)]);return{graph:Q9([$,F9($),j9($),z,...J],_$),taints:Z}}var r8=null,t8=new Map,m$=new Map,a8=null,e8=0;function J2($,Q){if(r8!==$)r8=$,t8=new Map,m$=new Map;return V$(t8,Q)}function z2($,Q){let Z=h8($,Q);return Z!==null&&Z.holders===1?new Set([Z.index,...Z.tables]):null}function d$($){return F$(m$,$,()=>`\x00${m$.size}`)}function q2($){let Q=new Map;return $.forEach(function(Z,J){if(typeof Z==="string"){if(!Q.has(Z))Q.set(Z,`\x03${J}`);return}Z.forEach(function(z,q){if(!Q.has(z))Q.set(z,`\x03${J}.${q}`)})}),Q.size===0?d$:(Z)=>Q.get(Z)??d$(Z)}function Z0($){return $ instanceof ArrayBuffer?`$ab:${$.byteLength}:${u$(new Uint8Array($))}`:`$v:${$.constructor.name}:${$.byteLength}:${u$($)}`}function K2($,Q){switch(typeof Q){case"string":return d$(Q);case"boolean":return Q;case"number":return Ga(Q);case"object":if(Q===null||Array.isArray(Q))return Q;if(Q instanceof ArrayBuffer||ArrayBuffer.isView(Q))return{$y:Z0(Q)};return Q;case"undefined":return{$u:1};case"bigint":return{$b:String(Q)};default:return Q}}function X2($){return(Q,Z)=>typeof Z==="string"?$(Z):K2(Q,Z)}function Y2(){return a8??=typeof crypto<"u"&&Ha()?crypto.randomUUID():String(performance.timeOrigin),e8+=1,`${a8}.${e8}`}function V2($){if($===null)return{};let Q={};for(let[Z,J]of Object.entries($))if(typeof J==="number"||typeof J==="boolean"||typeof J==="string")Q[Z]=J;else if(U2(J))Q[Z]=J;else return null;return Q}function U2($){return Array.isArray($)&&$0($)===null}function J0($,Q,Z){let J=$.twins;if(J===void 0)return Q;try{let z=Q.image.graph,q=[];for(let F of Z.layoutRefs){if(F?.[0]!=="U"||typeof F[1]!=="number")return Q;q.push(F[1])}let X=V2(Z.params),V=Z.paramsRef===null?null:z2(z,Z.paramsRef);if(X===null||Z.paramsRef!==null&&V===null)return Q;let U=J2($.realmPrint,J.group),K=q2(Z.textures),j=`${g8(z,V,K,Z0)}\x02${JSON.stringify([Q.image.surfaceUnread,Q.image.taints,Q.ownLighting,Q.words,Q.realmPrint],X2(K))}`,H=f8(z),M=U.get(j);if(M===void 0||J.whole){let F=M?.name??Y2();return U.set(j,{values:H,name:F}),{...Q,print:F}}if(M.values.length!==H.length)return Q;let B=new Set(q);for(let F=0;F<H.length;F+=1)if(!B.has(F)&&!Q0(M.values[F],H[F]))return Q;return{kind:"twin",of:M.name,values:q.map((F)=>H[F]),params:X,textures:Z.textures,surfaceUnread:Q.image.surfaceUnread,taints:Q.image.taints,ownLighting:Q.ownLighting,realmPrint:Q.realmPrint,words:Q.words,reports:Q.reports}}catch{return Q}}function z0($){let Q=new Map;for(let z of $.uniformSlots)Q.set(z.id,z);let Z=[];for(let[z,q]of $.uniformOffsets){let X=Q.get(z);if(X===void 0)throw new x(`a sky offset for slot ${z} its program does not list`);Z.push([X,q])}let J={...$,uniformOffsets:Z};return Q9([J])}function q0($){return Q9([$])}var F2={getTexture:()=>null,retainTexture:()=>null,subscribe:()=>function(){return}},j2=[0,0,0,0],H2={binding:null,window:j2,subscribe:()=>function(){return},release:function(){return}},B2={lease:()=>H2},K0="";function h0($){I0($.session);let Q=JSON.stringify($.sunShadow);if(Q!==K0)K0=Q,H0($.sunShadow);if(w0()!==null!==$.cellLight)b0($.cellLight?J$:null);let Z=$.dials;if(v0(Z.farSun),R0()!==Z.lightOnce)k0(Z.lightOnce);if(T0(Z.newerBuild),x0($.device),j0($.device.uniformBytes),B0($.hold),y0()!==$.cut)D0($.cut);if(O0()!==$.depthRoad)S0($.depthRoad)}function g0($,Q,Z){let J=W0(),z=G0(),q=F0();i$($.assets?F2:null),l$($.fields?B2:null),n$((X)=>Q.engine.push(X)),o$((X)=>Q.scripted.push(X));try{return Z()}finally{o$(null),n$(q),l$(z),i$(J)}}var M2=10;function E0($,Q,Z){if(!V0($,Q,Z))return!0;if(Y0($,Q,Z)&&!$.parser.arriving())return!1;return null}var H9=[],s$=!1;function G2(){s$=!1;let $=[];for(let Q=0;Q<H9.length;){let Z=H9[Q],J=E0(Z.std,Z.entry,Z.ref);if(J===null){Q+=1;continue}H9.splice(Q,1),$.push({settle:Z.settle,stood:J})}for(let{settle:Q,stood:Z}of $)Q(Z);p0()}function p0(){if(s$||H9.length===0)return;s$=!0,setTimeout(G2,M2)}function B9($,Q,Z){let J=E0($,Q,Z);if(J!==null)return Promise.resolve(J);return new Promise(function(z){H9.push({std:$,entry:Q,ref:Z,settle:z}),p0()})}function Y3($,Q){if("family"in Q)return Promise.resolve(!0);if("fx"in Q)return Q.scripted===null?Promise.resolve(!0):B9($,Q.scripted.entry,Q.scripted.script.ref);return"program"in Q?B9($,Q.entry,Q.ref):B9($,Q.entry,Q.script.ref)}function r$($,Q){return{kind:"refused",message:t($),code:$ instanceof U0?$.detail?.code??null:null,reports:Q}}function l9(){let $={words:0,run:(Q)=>M0(function(Z){$.words|=Z},Q)};return $}function i9($,Q){let Z=P0();return N0(Z,{scripts:{[$]:Q}}),Z}var t$="material(ctx) read a picture's colour word, which the renderer holds",_0=($)=>$ instanceof x?$.message:`the builder fell: ${t($)}`;async function V3($,Q){if("family"in Q)return X0(Q);if("program"in Q)return P2($,Q);if("fx"in Q)return W2($,Q);let Z=[],J=[],z={scripted:Z,engine:J};if(!await B9($,Q.entry,Q.script.ref))return C("a door of the builder's realm did not stand",z);let q;try{h0(Q.realm),q=g0(Q.realm,{scripted:Z,engine:J},()=>y2($,Q,z))}catch(X){return C(_0(X),z)}return q.twin===null||q.reply.kind!=="built"?q.reply:J0(Q,q.reply,q.twin)}async function c0($,Q,Z,J){let X={scripted:[],engine:[]};if(Z!==null&&!await B9($,Z.entry,Z.ref))return C("a door of the builder's realm did not stand",X);try{return h0(Q),g0(Q,X,()=>J(X))}catch(V){return C(_0(V),X)}}var P2=($,Q)=>c0($,Q.realm,Q,(Z)=>G9(Q.realm.lume,()=>C2($,Q,Z))),W2=($,Q)=>c0($,Q.realm,Q.scripted&&{entry:Q.scripted.entry,ref:Q.scripted.script.ref},(Z)=>A2($,Q,Z));function A2($,Q,Z){let J=Q.fx,z=n9(Q.lighting),q=l9(),X=function(B){let F=f(B),D=!B.transparent||B.blending==="none";return m(B,{...D?J.coverage:J.blended,lighting:z,fragmentScope:F,vertexScope:F})},V=null,U=null,K=null;if(Q.scripted!==null){let{entry:B,script:F,still:D}=Q.scripted,n=i9(F.ref,B);if(V=q.run(()=>P9(n,$,B,F,{still:D,fx:()=>G$(J.paramNames,J.words.textured)})),n.parserHeldRefs.has(F.ref))return C("the sink's script waits for a door of the builder's realm",Z);if((q.words&M9)!==0)return C(t$,Z);if(U=V===null?"none":"built",V!==null)S9(V,P$(J.words)),K=a$(z,{ref:F.ref,hash:B.hash},V)}let j=null,H=q.run(()=>d9(()=>G9(Q.realm.lume,function(){if(V!==null)try{return{shade:V,assembled:X(V)}}catch(F){return j=F,null}let B=I6(J.words,G$(J.paramNames,J.words.textured),J.worldLit);return{shade:B,assembled:X(B)}}))),M=H.value;if(M===null)return r$(j,Z);return{kind:"fx",image:c$(M.shade,[[x6,M.assembled]],H.taints),script:U,ownLighting:K,realmPrint:e$(Q,q.words),words:q.words,reports:Z}}function N2($,Q,Z,J){let z=i9(Q.script.ref,Q.entry),q=l9(),X=q.run(()=>P9(z,$,Q.entry,Q.script,{scatter:j6,still:Q.still,liveGates:Q.liveGates}));if(z.parserHeldRefs.has(Q.script.ref))return C("the layer's script waits for a door of the builder's realm",J);if((q.words&M9)!==0)return C(t$,J);if(X===null)return{kind:"none",reports:J};let V=X.transparent;return H6(X,Q.overrides),u0(Q,X,Z,(U)=>F6(U.bed),q,J,[V])}function u0($,Q,Z,J,z,q,X){let V=n9($.lighting),U=f(Q),K=[],j=null,H=z.run(()=>d9(()=>G9($.realm.lume,function(){for(let M of Z)try{K.push([M.key,m(Q,{...J(M),lighting:V,fragmentScope:U,vertexScope:U})])}catch(B){j??=B}})));if(K.length===0)return r$(j,q);return{kind:"arms",image:c$(Q,K,H.taints,X),ownLighting:a$(V,{ref:$.script.ref,hash:$.entry.hash},Q),realmPrint:e$($,z.words),words:z.words,reports:q}}function a$($,Q,Z){let J=F9(Z);return J===null?null:L0(f0($,Q,J))}function e$($,Q){return Q===b9?$.realmPrint:J8($.realm,Q)}function C2($,Q,Z){let J={quality:!1,words:0};if(Q.program==="sky"){let q=$.compiler.compileSkyScriptFromEntry(Q.entry,Q.ref,$,Q.tier,J);return{kind:"program",image:q===null?null:z0(q),read:J,realmPrint:Q.realmPrint,reports:Z}}let z=$.compiler.compileLightingScriptFromEntry(Q.entry,Q.ref,$,Q.tier,J);return{kind:"program",image:z===null?null:q0(z),read:J,realmPrint:Q.realmPrint,reports:Z}}function D2($){if($.surface===void 0)return;let{texture:Q,...Z}=$.surface;return Q?{...Z,textureHandle:null}:Z}function y2($,Q,Z){if(Q.ground!==void 0)return{reply:x2($,Q,Q.ground.arms,Z),twin:null};if(Q.decoration!==void 0)return{reply:N2($,Q,Q.decoration.arms,Z),twin:null};let J=Q.base;if(J===null)return{reply:C("the ask names no assembly base and no bed",Z),twin:null};let z=i9(Q.script.ref,Q.entry),q=n9(Q.lighting),X=D2(Q),V=l9(),U=V.run(()=>R$({library:z,entry:Q.entry,script:Q.script,overrides:Q.overrides,surface:X,placeId:Q.placeId,still:Q.still,liveGates:Q.liveGates},(Z9,n0,l0,i0)=>P9(Z9,$,n0,l0,i0)));if(U===null)return{reply:A0(Q.entry.hash)?{kind:"none",reports:Z,faulted:!0}:{kind:"none",reports:Z},twin:null};if((V.words&M9)!==0)return{reply:C(t$,Z),twin:null};let K;try{K=V.run(()=>d9(()=>G9(Q.realm.lume,()=>q8(U.shade,{overrides:Q.overrides,surface:X,base:J,lighting:q,limits:Q.limits,motionToo:Q.motionToo,marksToo:!0,quietOnce:Q.realm.dials.quietOnce}))))}catch(Z9){return{reply:r$(Z9,Z),twin:null}}let j=K.value,H=V.words;if((H&M9)!==0)return{reply:C("the grant folds the material's pictures by their colour words, which the renderer holds",Z),twin:null};let M=a$(q,{ref:Q.script.ref,hash:Q.entry.hash},j.shade),B=e$(Q,H);if(Q.twins===void 0)return{reply:{kind:"built",image:i8(j,U.surfaceUnread,K.taints),ownLighting:M,realmPrint:B,words:H,reports:Z},twin:null};let F=C0(j.shade),D=j.assembled.uniformLayout.slots,{image:n,marks:l}=o8(j,U.surfaceUnread,K.taints,F===null?D:[F,...D]),m0=j9(j.shade).textures.map(([Z9])=>Z9),d0={params:F,paramsRef:F===null?null:l[0],layoutRefs:F===null?l:l.slice(1),textures:m0};return{reply:{kind:"built",image:n,ownLighting:M,realmPrint:B,words:H,reports:Z},twin:d0}}function x2($,Q,Z,J){let z=i9(Q.script.ref,Q.entry),q=l9(),X=q.run(()=>R$({library:z,entry:Q.entry,script:Q.script,overrides:void 0,surface:void 0,placeId:Q.placeId,still:Q.still,groundSurface:N7,liveGates:Q.liveGates},(U,K,j,H)=>P9(U,$,K,j,H)));if(X===null)return{kind:"none",reports:J};let V=X.shade;if(C7(V))return C("the ground's look reads ctx.terrain.ground, whose arms are its pools' words");return A7(V),u0(Q,V,Z,(U)=>U.base,q,J)};

function ba(){return(`
  let glow = decorVertex.glow;`)}
function ca(q,X,V,U,K,J){return{kind:"singles",baseColor:q,normal:X,roughness:V,metalness:U,alpha:K,emissive:J};
}
function da(q){if(q!==null)return{kind:"map",map:q};return null
}
function ea(){let Q=this.make(this.words.length*2);Q.set(this.words),this.words=Q
}
function fa($){for(let Q=0;Q<$.length;Q+=1)this.roots.push(this.ref($[Q],"root",Q));
}
function ga(){return(W8("a pending record without its index"))}
function ha(){return(W8("a pending record without its object"))}
function ia(){return{v:2,strs:this.strs,types:this.types,models:this.models,nums:this.nums.done(),nodes:this.nodes.done(),ins:this.ins.done(),slots:this.slots.done(),slotVals:this.slotVals.done(),vars:this.vars.done(),objs:this.objs.done(),ents:this.ents.done(),bins:this.bins,fns:this.fns.done(),comps:this.comps.done(),texs:this.texs,stors:this.stors,blks:this.blks,mods:this.mods,roots:this.roots.done()}
}
function ja(Q,Z){throw new x(`a function at ${F8(Q,Z)}`);
}
function ka(Q,Z){throw new x(`a symbol at ${F8(Q,Z)}`);
}
function la($){let Z=this.slots.n/L$,J=$.componentValues;this.slots.push(this.type($.type)),this.slots.push($.name===null?0:this.str($.name)+1),this.slots.push($.rows),this.slots.push(this.slotVals.n),this.slots.push(J.length);
aa[0]=Z,aa[1]=J}
function ma($){return this.later(EQ,B8,this.stors.push({t:$.elementType,a:$.access,c:$.count,seed:$.seed,h:g,at:$.atomic,...$.engine===void 0?{}:{e:$.engine},n:$.name,...$.shared===void 0?{}:{s:$.shared},...$.workgroup===!0?{wg:!0}:{},...$.copies===!0?{cp:!0}:{}})-1,$);
}
function na($){return N(pQ,this.mods.push($.fragmentOnly===void 0?{s:this.str($.source)}:{s:this.str($.source),fo:$.fragmentOnly})-1);
}
function oa($){let Z=this.fns.n/T$;for(let J=0;J<T$;J+=1)this.fns.push(g);return this.later(_Q,M8,Z,$)
}
function pa($){let Z=this.comps.n/g9;return this.comps.push(g),this.comps.push($.count),this.comps.push($.workgroupSize),this.later(cQ,G8,Z,$)
}
function qa(Z,Q){if(f9(Z))this.texs[Q].h=this.ref(Z.handle,"texture handle");
}
function ta(Z,Q){{if(!w$(Z))return;let J=this.stors[Q];if(J.h=this.ref(Z.handle,"storage handle"),Z.pack!==null)J.p=[this.blockRow(Z.pack.block),Z.pack.offset,Z.pack.index];if(Z.block!==null)J.b=this.blockRow(Z.block);return}
return ra}
function ua(Z,Q){{if(!v$(Z))return;let J=Q*T$,z=this.ref(Z.params,"fn params"),q=this.ref(Z.body,"fn body"),X=this.ref(Z.returns,"fn returns");this.fns.words[J]=z,this.fns.words[J+1]=q,this.fns.words[J+2]=X;return}
return ra}
function va(Z,Q){if(Z instanceof S$){let J=this.ref(Z.scope,"compute scope");this.comps.words[Q*g9]=J}
}
function wa(Q){throw new x(`an input of node ${Q.kind} that is not a node`);
}
function xa(Q){for(let K of Q)this.ents.push(this.ref(K,"<member>"));
}
function ya(X,Q){let j=this.options.skipUserData;X=this.fields(Q.userData,"material.userData",(H)=>j?.(H)!==!0)
return X}
function Aa(Q,z){throw new x(`an accessor ${Q}.${z}`);
}
function Ba($,Q){for(let Z of $.texs)Q(Z.h);for(let Z of $.stors)Q(Z.h);for(let Z of $.blks){for(let J of Z.ms)Q(J);Q(Z.bd)}for(let Z=0;Z<$.fns.length;Z+=1)Q($.fns[Z]);for(let Z=0;Z<$.comps.length;Z+=g9)Q($.comps[Z]);
}
function Ca($,Q){for(let Z=0;Z<$.roots.length;Z+=1)Q($.roots[Z])
}
function Da(q,$,Z,U,V){q.push("I",$.ins.join(",")),q.push("U");for(let K=0;K<$.slots.length;K+=L$)q.push(Z(U[$.slots[K]]),V($.slots[K+1]),String($.slots[K+2]),String($.slots[K+4]));q.push("V");
}
function Ea(q,$,X,J,Z,z){q.push("T");for(let K of $.texs)q.push(X(K.h),JSON.stringify({...K,h:0}));q.push("B");for(let K of $.stors)q.push(X(K.h),JSON.stringify({...K,h:0,seed:K.seed===null?null:J(K.seed)}));q.push("K");for(let K of $.blks)q.push(K.k,K.m<0?"-":Z(z[K.m]),String(K.w),X(K.bd),K.ms.map(X).join(","));q.push("W");for(let K of $.mods)q.push(Z(z[K.s]),K.fo===void 0?"-":Z(K.fo));q.push("F");for(let K=0;K<$.fns.length;K+=1)q.push(X($.fns[K]));q.push("C");for(let K=0;K<$.comps.length;K+=g9)q.push(X($.comps[K]),String($.comps[K+1]),String($.comps[K+2]));q.push("O");
}
function Fa(q,$,X){q.push("R");for(let K=0;K<$.roots.length;K+=1)q.push(X($.roots[K]));return q.join("\x01")
}
function Ga(Q){return T(Q)&&!Object.is(Q,-0)?Q:{$n:Object.is(Q,-0)?"-0":String(Q)};
}
function Ha(){return(typeof crypto.randomUUID==="function")}
function ra(){}var sa;function aa(){}

;function $lpd0(o,k,v){Object.defineProperty(o,k,{value:v,writable:!0,enumerable:!0,configurable:!0})}import"./26ceb10f-49e18729068cd5df.mjs";import"./36bad4b5-c35867ec88f49b93.mjs";import"./6013db8f3213cfbc.mjs";import"./4953a97fb1e990b7.mjs";import"./46b1c77c67f7de91.mjs";import"./9959d013-206ed91ad8a1f4fe.mjs";import"./e5b41542678465dc.mjs";import"./f81c9654-bc62d8684fd20379.mjs";import"./59031fb6a4af82a1.mjs";import"./bfa01a2f-723b97e3b6c6dddd.mjs";import"./97a46b49-6989b287046b7cf1.mjs";import"./3cfbfb472a64e141.mjs";import"./2998d8b4-fc0f4b775b52b986.mjs";import"./9b93e26679f0ec35.mjs";import"./13edbdb4-f3014b8bf4f5e3aa.mjs";import{$5B as Q8,A1L as h6,Aow as I9,Cs7 as S0,Cw7 as N0,D22 as n8,DBZ as B7,DPz as s7,Dq1 as V6,EJQ as s6,EVH as R7,Ea5 as n9,Ebw as k7,FQh as f6,Gjb as D0,HFv as L0,Hmv as m,IMw as t6,IYr as d8,KCq as Q0,KmW as H7,MEB as j9,N08 as F9,Nr6 as o9,PK8 as Y6,PeZ as P0,QJb as e6,R9u as T0,RUM as K$,T9a as l$,VgU as Z8,Vr8 as b0,Z4F as y0,a7W as X6,bZs as i$,bl4 as f7,c7w as f,cDU as d9,cfP as v0,cii as i6,d7R as P9,dTe as x0,em3 as f0,fSQ as A$,hro as C0,j$c as A0,jfM as o6,luT as $8,mJB as B6,mkv as I0,nIf as N9,nnU as w0,oJ8 as k0,pOR as r6,rF3 as G0,sbj as L6,tOJ as k9,tfD as W0,uBa as w6,vIf as l8,vbn as U6,vkm as k$,vow as a6,wTD as O0,yAY as F7,yEi as R0,yJT as j7,y_0 as q$,zr7 as o$}from"./6f3832a6-f9bac2bcce40e220.mjs";import{DSQ as u8,NaR as V9,R97 as k8,RYv as a,SNI as x9,VV1 as u6,_zz as $0,and as j0,qth as c8,tn4 as m8,xN3 as k6}from"./d412131d-2f33616861f6281a.mjs";import{foc as v9}from"./7e3067944ae4690c.mjs";import"./21dddadc9711121d.mjs";import{PNt as H0}from"./70ee4a567231822f.mjs";import{$PV as p8,Brh as Y9,BuM as e,Cn3 as G,Cuk as k,DcR as O9,GS5 as y6,IVI as O$,Iwu as A,Kd$ as d6,KlB as D6,L$T as D8,LY8 as m6,Ln4 as x$,MNf as u,N96 as O,Ose as y8,Pm8 as x8,Rvr as C6,UbZ as f9,XSv as L,Zvs as N6,dQ3 as U0,etR as n$,fHq as c6,gwl as _8,kEV as A6,nbl as _6,ncX as y9,nwK as M$,oZN as w$,oaY as F0,rFh as I$,sU6 as v$,sfu as D$,tej as S$,to8 as I8}from"./75f9d7a9-b9b452ef9ed9d1b4.mjs";import"./d876e061714751a8.mjs";import{IFj as V0,JPf as F$,JQV as v6,MTL as M9,NKp as J5,Ozc as O6,RGt as t,S1x as G9,TD3 as B0,Tfx as C,USd as Y0,VCM as $7,Zpc as V$,_0n as X0,_Td as Y,e3w as T,e5m as m7,i_3 as M0,nYo as l6,scD as y$,srL as n6,zEL as U9,zuW as b9}from"./5484a777-e1e49d428a1f3b31.mjs";import"./258eeb1cbf5cd6e2.mjs";import"./18ea22c9b82695fd.mjs";import"./34ae66e4b4067b04.mjs";import"./f45ed7628e579dd0.mjs";import"./0d81a0c485a46081.mjs";import"./56170bd2000c30bc.mjs";import"./a456fdcda3b62cf4.mjs";import"./e6e669f0a5877881.mjs";import{SOb as u$}from"./e02a43301fdbeb7a.mjs";import"./87b08933741aae03.mjs";import{wMe as e9}from"./bfa01a2f-723b97e3b6c6dddd.mjs";import{FaJ as S6,Icq as p$,Lcw as T6}from"./13edbdb4-f3014b8bf4f5e3aa.mjs";export{V3 as serveMaterialBuild,Y3 as askDoorsStand};
