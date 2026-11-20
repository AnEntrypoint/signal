;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;var J$={};q5(J$,{cellLightBindingsWgsl:()=>H5,FAR_BOUNCE_SHARE:()=>F5,CELL_LIGHT_UNDER_FLOOR_RINGS:()=>C9,CELL_LIGHT_TOPS_SIDE_TEXELS:()=>W7,CELL_LIGHT_TOPS_EYE_REACH_TEXELS:()=>Z$,CELL_LIGHT_SUN_TERM_WGSL:()=>A5,CELL_LIGHT_SKY_TERM_WGSL:()=>P5,CELL_LIGHT_SKY_AT_TERM_WGSL:()=>W5,CELL_LIGHT_READ_WGSL:()=>M5,CELL_LIGHT_READ_FOLDS:()=>B5,CELL_LIGHT_REACH_WGSL:()=>j5,CELL_LIGHT_MATTER_SKY:()=>Q$,CELL_LIGHT_LOCAL_TERM_WGSL:()=>C5,CELL_LIGHT_IRRADIANCE_WGSL:()=>A7,CELL_LIGHT_GLOW_TERM_WGSL:()=>D5,CELL_LIGHT_GLOW_IRRADIANCE:()=>P7,CELL_LIGHT_GLOW_DAY:()=>$$,CELL_LIGHT_FADE_TEXELS:()=>D9,CELL_LIGHT_EYE_REACH_TEXELS:()=>G7,CELL_LIGHT_CORNER_SHADE_WGSL:()=>G5,CELL_LIGHT_BARE_SUN_TERM_WGSL:()=>N5});var r0=9,T2=r0*16;var t0=new Q7("ibl-environment");var Z7=0.294;var F1=1-o9*o9*0.3;var w=[{texelCells:1,width:128,height:64,depth:128,solidShows:"least"},{texelCells:4,width:128,height:64,depth:128,solidShows:"least"}],J7=0.125,z7=8;var S=32,q7=8,s9=32;var W=2;var y=0.08,c=[0.05,0.3],i=63,$5=95;function Q5($){if(!($>0))return 0;return Math.min(255,Math.max(1,Math.round(255+S*Math.log2($))))}function _($){if(!($>0))return 0;let Q=2**(-255/S);return(2**((Math.min(255,$)-255)/S)-Q)/(1-Q)}function r9($){let Q=_($),Z=new Uint8Array(256);for(let J=$+1;J<256;J+=1)Z[J]=Math.max(1,Math.round(255*Math.sqrt((_(J)-Q)/(1-Q))));return Z}var G1=Q5(y);var P1=r9(0),W1=r9(i),A1=r9($5);var b=w[0].width,J9=w[0].height,o=w[0].depth,t9=W+1,P=w.length-1,Z5=J9+1,J5=W*Z5,D1=J5+4,z5=20,s=8,a9=8,y1=t9*z5+s*12+a9;;var D9=8,G7=b/2-3*e9/4-1-D9,P7=8,K5=[0.09,0.17,0.5],X5=0.25,K7=[1.189207115002721,1.681792830507429],W9=[16,48],$$=[0.05,0.35],X7=[0.1,0.4],Y7=[-0.1,0.02];function Y5($){return`smoothstep(${Y(X7[0])}, ${Y(X7[1])}, dot(${$}, vec3<f32>(0.2126, 0.7152, 0.0722))) * smoothstep(${Y(Y7[0])}, ${Y(Y7[1])}, (${$}.r - ${$}.b) / (${$}.r + ${$}.b + 0.0001))`}var V5=0.5,U5=0.5,V7=0.02,A9=0.97,Q$=0.02,W7=4,z9=W7,Z$=b/2-3*e9/4-z9,C9=[2,4,8],F5=0.5,U7=($)=>$.slice(0,-1).reduceRight((Q,Z,J)=>`select(${Q}, ${Y(Z)}, ring == ${J})`,Y($[$.length-1])),F7=w[P].texelCells/w[0].texelCells,j5=`fn lighting_cellReach(P: vec3<f32>, cell: f32) -> f32 {
  var texel = cell * ${Y(F7)};
  for (var cells = 1; cells < ${z7}; cells = cells * 2) {
    texel = select(texel, texel * 2.0, texel < ${Y(J7*F7*0.999999)});
  }
  let across = max(abs(P.x - frame.cameraPosition.x), abs(P.z - frame.cameraPosition.z)) / max(texel, 1e-6);
  return select(clamp((${Y(Z$)} - across) / ${Y(z9)}, 0.0, 1.0), 0.0, cell <= 0.0);
}`;function H5($){return`struct CellLightLevel {
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
@group(${$}) @binding(${j7}) var cellLightMap: texture_2d_array<f32>;
@group(${$}) @binding(${H7}) var cellLightSampler: sampler;
@group(${$}) @binding(${B7}) var<uniform> cellLight: CellLightWindow;`}var B5=M7,M5=`override ${N9}: bool = true;
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
  let toFace = select(floor(p + vec3<f32>(${Y(V7)})) - p, ceil(p - vec3<f32>(${Y(V7)})) - p, N >= vec3<f32>(0.0));
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
    let step = select(vec2<f32>(0.0, select(-1.0, 1.0, way == 3)), vec2<f32>(select(-1.0, 1.0, way == 1), 0.0), way < 2) * ${U7(C9)} * texelsPerMetre;
    let t = q.xz + step;
    var open = 1.0;
    if (min(t.x, t.y) > 0.0 && t.x < ${Y(b)} && t.y < ${Y(o)}) {
      let column = textureSampleLevel(cellLightMap, cellLightSampler, vec2<f32>((t.x + slot.x) / ${Y(b)}, (t.y + slot.z) / ${Y(o)}), i32(slot.w), 0.0);
      open = clamp(1.5 - column.r * 255.0, 0.0, 1.0);
    }
    if (open > 0.0) {
      return open * ${U7(C9.map(($)=>Math.round(2**(-$*q7/S/2)*1e4)/1e4))};
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
  return min(boxed, lighting_cellEyeReach(index, texel, ${Y(G7)}, ${Y(D9)})) * least.w;
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
        spill = mix(1.0, 1.0 - ${Y(1-X5)} * smoothstep(${Y(K7[0])}, ${Y(K7[1])}, there / max(here, 0.004)), fineWeight);
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
  lighting_cellGlow = max(shown.rgb * spill, lighting_cellMoved(P, N) * min(held, 1.0)) * ${Y(P7)};
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
  let open = smoothstep(0.0, ${Y(V5)}, lighting_cellOpenness);
  let land = lighting_cellLand * (max(${Y(U5)}, lighting_cellOpenness) * open);
  let day = ${Y5("sunDown")};
  return lighting_cellGlow * (1.0 - smoothstep(${Y($$[0])}, ${Y($$[1])}, day * lighting_cellOpenness)) + lighting_cellAmbient + vec3<f32>(${K5.map(Y).join(", ")}) * (min(skyNow * ${Y(1/Z7)}, 1.0) * lighting_cellCover) + land * (sunDown + skyUp) * (0.5 - 0.5 * N.y);
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
}`,G5="(ao - (1.0 - ao) * (1.0 - ao))",P5=" * lighting_cellSky(P, N)",W5=" * lighting_cellSkyAt(P, N, lighting_cellPastSky)",A5=" * lighting_cellSun(P, shadingNormal)",N5=" * lighting_cellSun(P, N)",C5=`  if (isPoint && slotBase < 0.0) {
    lightShadow = lightShadow * lighting_cellLocalGate(i32(light.directionCone.y) - 1, P, N);
  }
`,A7="lighting_cellIrradiance(N, passLights.sunColor * (passLights.sunIntensity * max(passLights.sunDirection.y, 0.0)), lighting_ambientIrradiance(vec3<f32>(0.0, 1.0, 0.0)), dot(lighting_ambientIrradiance(vec3<f32>(0.0, 1.0, 0.0)) + lighting_iblShIrradiance(vec3<f32>(0.0, 1.0, 0.0)) * (passLights.iblParams.x * 3.14159265359), vec3<f32>(0.2126, 0.7152, 0.0722)))",D5=` + shade_ambientPbr(N, V, albedo, pixelRoughness, metalness, ${A7})`;function N7($){$.side="double",$.depthTest=!0,$.colorNode??=y9().mul(O(L,1))}var r={color:"ctx.terrain.ground.color",normal:"ctx.terrain.ground.normal",roughness:"ctx.terrain.ground.roughness",metalness:"ctx.terrain.ground.metalness",emissive:"ctx.terrain.ground.emissive"},y5=new Set(Object.values(r));function C7(){return{color:k(r.color,"vec3f",{fragmentOnly:!0}),normal:k(r.normal,"vec3f",{fragmentOnly:!0}),roughness:k(r.roughness,"f32",{fragmentOnly:!0}),metalness:k(r.metalness,"f32",{fragmentOnly:!0}),emissive:k(r.emissive,"vec3f",{fragmentOnly:!0})}}var x5=($)=>$.meta.kind==="input"&&y5.has($.meta.name);function D7($){let Q=[];for(let z of x9){let q=$[z];if(q)Q.push(q)}let Z=f($);if(Z)I9(Z,Q);let J=new Set;return Q.some((z)=>k9(z,J,x5))}var y7=2147483648,z$=1073741824,q9=24,x7=62,I7=16777215;var S7=6,I5=S7*4,k5=4,n1=I5+k5;var O7=`
const DECOR_CANDIDATE_WORDS: u32 = ${S7}u;

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
`,v7=`
fn decor_levelHideOf(word: u32) -> f32 {
  let share = f32((word >> ${q9}u) & 0x3fu) * (1.0 / ${x7}.0);
  return select(share, share - 1.0, (word & ${z$}u) != 0u);
}

fn decor_levelDoorCut(hide: f32, pixel: vec2<f32>) -> bool {
  let noise = ${T7("pixel")};
  return select(noise, 1.0 - noise, hide < 0.0) < abs(hide);
}
`;function w7($){return`${R7($,"","decorSurvivorWord")}
  let decorLevelFaded = decorSurvivorWord >= ${y7}u && !lumeSurvivorCulled;
  let survivorSlot = select(decorSurvivorWord, decorSurvivorWord & ${I7}u, decorLevelFaded);
  let decorLevelHide = select(0.0, decor_levelHideOf(decorSurvivorWord), decorLevelFaded);`}var b7="  if (in.levelHide != 0.0 && decor_levelDoorCut(in.levelHide, in.position.xy)) { discard; }",k7=256,R5=z$>>>q9|63;function L7($){return`select(${$}, 2.0 + 2.0 * f32((decorSurvivorWord >> ${q9}u) & ${R5}u) + ${$}, decorLevelHide != 0.0)`}var f7=["  if (in.laneCoverage > 1.5) {","    let decorDoorCode = floor((in.laneCoverage - 1.5) * 0.5);",`    let decorReveal = clamp(round((in.laneCoverage - 2.0 - 2.0 * decorDoorCode) * ${k7}.0) * (1.0 / ${k7}.0), 0.0, 1.0);`,`    if ((decorReveal < 1.0 && lume_screenDoor(in.position.xy) > decorReveal) || decor_levelDoorCut(decor_levelHideOf(u32(decorDoorCode) << ${q9}u), in.position.xy)) { discard; }`,"  }"];var g7=1.3;function E7($,Q){return`@group(${$}) @binding(${Q}) var<storage, read> bendField: array<vec2<u32>>;

fn decor_pressCell(cell: vec2<i32>) -> vec4<f32> {
  let words = bendField[u32(cell.x & ${q$-1}) | (u32(cell.y & ${q$-1}) << 8u)];
  return vec4<f32>(unpack2x16snorm(words.x), unpack2x16snorm(words.y));
}

fn decor_pressHolds(instanceXZ: vec2<f32>) -> bool {
  let rel = abs(instanceXZ - (frame.focus.xz + frame.renderOrigin.xz));
  return max(rel.x, rel.y) <= ${(h7-2*K$).toFixed(2)};
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
}`}var T5="1.0",S5=`fn decor_coverTexel(mask: texture_depth_2d_array, texel: vec2<i32>, first: f32, movers: bool) -> f32 {
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
  return overRoot > -${T5} && overRoot < height + 0.35;
}`,O5=9;function p7($,Q){return`@group(${$}) @binding(${Q}) var coverDepth: texture_depth_2d_array;
@group(${$}) @binding(${O5}) var coverBefore: texture_depth_2d_array;

${S5}

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
}`}var v5=668265263,_7=0.05;var w5=374761393;var c7=2654435769;var b5=1;var K9=7.5,X9=[2,4],n7=900,l7=0.5,i7=0.7;function u7($){return Math.min(1,($/K9)**2)*d7(X9[0],X9[1],$)}var m7=[K9,K9*3];var X$=[4.74,2.99,X9[0]],Y$=[1,u7(X$[0]),u7(X$[1]),0];var o7=`
fn decor_footprintDensity(footprintPx: f32) -> f32 {
  let full = min(1.0, (footprintPx / ${Y(K9)}) * (footprintPx / ${Y(K9)}));
  return full * smoothstep(${Y(X9[0])}, ${Y(X9[1])}, footprintPx);
}

fn decor_footprintWear(footprintPx: f32) -> f32 {
  return 1.0 - smoothstep(${Y(m7[0])}, ${Y(m7[1])}, footprintPx);
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
  let threshold = decor_stableThreshold(candidateId, 0x${v5.toString(16)}u);
  if (groundCover) { return select(0.0, 1.0, threshold < keep); }
  return smoothstep(threshold - ${Y(_7)}, threshold + ${Y(_7)}, keep);
}

fn decor_tailKeep(tail: f32, candidateId: u32) -> f32 {
  if (tail >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${w5.toString(16)}u) < tail);
}

fn decor_qualityKeep(keep: f32, candidateId: u32) -> f32 {
  if (keep >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${c7.toString(16)}u) < keep);
}

fn decor_nearKeep(distance: f32, radius: f32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let share = min(1.0, radius / max(distance, 1e-6));
  return share * share;
}

fn decor_nearArrivalWear(distance: f32, radius: f32, floor: f32, candidateId: u32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let threshold = decor_stableThreshold(candidateId, 0x${c7.toString(16)}u);
  if (threshold < floor) { return 0.0; }
  let share = radius / max(distance, 1e-6);
  return 1.0 - clamp((share * share - threshold) / (${Y(b5)} * max(threshold, 1e-6)), 0.0, 1.0);
}

fn decor_staticKeep(coverage: f32, candidateId: u32) -> f32 {
  if (coverage >= 1.0) { return 1.0; }
  if (coverage <= 0.0) { return 0.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x85ebca6bu) < coverage);
}
`;var s7=17;var U$=3,h5="1.45";function t7($){return`struct DecorItem {
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
@group(${$}) @binding(0) var<uniform> item: DecorItem;`}function a7(){return`fn decor_levelForSlot(slot: u32) -> u32 {
  if (item.regions[2].y > 0.5 && slot >= u32(item.regions[2].x)) { return 2u; }
  if (item.regions[1].y > 0.5 && slot >= u32(item.regions[1].x)) { return 1u; }
  return 0u;
}

fn decor_footprintPixels(distance: f32) -> f32 {
  let focal = min(frame.proj[1][1] * frame.lodHeight * 0.5, ${Y(n7)});
  let orthographic = frame.proj[3][3] > 0.5;
  return item.law.x * focal / select(max(distance, 1e-3), 1.0, orthographic);
}

fn decor_nearEyeKeep(toEye: vec3f) -> f32 {
  let scale = frame.proj[1][1] / max(length(toEye.xz), 1e-3);
  let root = max(-frame.eyeRise * scale, -1.0);
  let top = clamp((item.law.z - frame.eyeRise) * scale, -1.0, 1.0);
  return 1.0 - smoothstep(${Y(l7)}, ${Y(i7)}, (top - root) * 0.5);
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
  let angle = min(lean * item.windB.x * weight, ${h5});
  if (angle < 1e-5) { return v; }
  let dir = vec3f(gust.x, 0.0, gust.y) / lean;
  let axis = normalize(cross(up, dir));
  let c = cos(angle);
  let s = sin(angle);
  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);
}`}var g5=64;function e7(){return`fn decor_runSample(uv: vec2f, layer: i32) -> vec4f {
  if (all((item.runClamp | item.runMirror) == vec4u(0u))) { return textureSample(itemTexture, itemSampler, uv, layer); }
  let gx = dpdx(uv);
  let gy = dpdy(uv);
  let size = vec2f(textureDimensions(itemTexture));
  let foot = max(abs(gx), abs(gy)) * size;
  let wide = max(foot.x, foot.y);
  let reach = max(max(wide, 0.5), f32(item.runEase.x) + 0.5 * wide);
  let edge = min(vec2f(reach) / size, vec2f(0.5));
  let at = u32(layer);
  let bit = vec2u(select(0u, 1u << (at & 31u), at < ${g5}u));
  let mirrored = (select(item.runMirror.xy, item.runMirror.zw, at >= 32u) & bit) != vec2u(0u);
  let held = mirrored | ((select(item.runClamp.xy, item.runClamp.zw, at >= 32u) & bit) != vec2u(0u));
  let tile = fract(uv * 0.5);
  let folded = select(uv, vec2f(1.0) - abs(tile * 2.0 - vec2f(1.0)), mirrored);
  let turn = select(vec2f(1.0), vec2f(-1.0), mirrored & (tile >= vec2f(0.5)));
  return textureSampleGrad(itemTexture, itemSampler, select(folded, clamp(folded, edge, vec2f(1.0) - edge), held), layer, gx * turn, gy * turn);
}`}function $6($,Q=!1,Z=null,J=!1){return["  let base = decor_candidateBase(survivorSlot);","  let instancePosition = vec3f(bitcast<f32>(records[base]), bitcast<f32>(records[base + 1u]), bitcast<f32>(records[base + 2u])) + item.recordsShift.xyz;","  let sampledNormal = decor_unpackNormal(records[base + 3u]);","  let tintCoverage = decor_unpackTintCoverage(records[base + 4u]);","  let candidateId = records[base + 5u];","  let instanceWorld = lume_worldFromRender(instancePosition);","  let instanceXZ = instanceWorld.xz;",J?"  let coverKeep = select(1.0, 0.0, decor_covered(instanceXZ.x, instanceXZ.y, instanceWorld.y));":"  let coverKeep = decor_coverKeep(instanceXZ.x, instanceXZ.y, instanceWorld.y);","  let level = decor_levelForSlot(survivorSlot);","  let region = item.regions[level];","  let dissolve = item.geometry.y <= 0.0;","  let toEyeNow = instancePosition - frame.cameraPosition;","  let toFocusNow = instancePosition - frame.focus;","  let distanceNow = select(length(toFocusNow), length(toFocusNow.xz), dissolve);","  let rootRampNow = decor_lawKeep(toEyeNow, level, dissolve) * decor_smoothVisibility(distanceNow, region.z, region.w);",J?"  let arrivalNow = coverKeep;":"  let arrivalNow = decor_birthVisibility(frame.fadeTime) * decor_tileBirthVisibility(instanceWorld, frame.fadeTime) * coverKeep;","  let rootNow = decor_distanceKeep(rootRampNow * select(arrivalNow, 1.0, dissolve), candidateId, !dissolve);","  let qualityNow = decor_qualityKeep(max(item.transition.z, decor_nearKeep(distanceNow, item.transition.w)), candidateId);","  let tailNow = decor_tailKeep(decor_propTail(length(toFocusNow)), candidateId);","  let revealNow = rootNow * qualityNow * select(1.0, arrivalNow, dissolve) * tailNow;","  let staticKeep = decor_staticKeep(tintCoverage.a, candidateId);","  let visibilityNow = select(tintCoverage.a * revealNow, staticKeep * step(1e-6, revealNow), dissolve);","  let up = select(vec3f(0.0, 1.0, 0.0), sampledNormal, item.geometry.x > 0.5);","  let reference = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(up.y) > 0.9);","  let right = normalize(cross(up, reference));","  let forward = cross(right, up);","  let heightFraction = clamp(position.y * item.windB.x + item.windB.y + item.geometry.z, 0.0, 1.0);","  let authoredUv = item.uvRegion.xy + uv * item.uvRegion.zw;","  var localPos = position;","  var localNormal = normal;","  if (item.flags.x > 0.5) {","    let widthScale = mix(item.scaleRanges.x, item.scaleRanges.y, terrain_hash2D(instanceXZ + vec2f(7.0, 13.0), 0.0));","    let heightScale = mix(item.scaleRanges.z, item.scaleRanges.w, terrain_hash2D(instanceXZ + vec2f(19.0, 23.0), 0.0));","    localPos = vec3f(localPos.x * widthScale, localPos.y * heightScale, localPos.z * widthScale);","    if (item.windA.x > 0.5) {","      let angle = terrain_hash2D(instanceXZ + vec2f(42.0, 19.0), 0.0) * 6.28318530718;","      let ca = cos(angle);","      let sa = sin(angle);","      localPos = vec3f(localPos.x * ca - localPos.z * sa, localPos.y, localPos.x * sa + localPos.z * ca);","      localNormal = vec3f(localNormal.x * ca - localNormal.z * sa, localNormal.y, localNormal.x * sa + localNormal.z * ca);","    }","  }","  var gustNow = vec2f(0.0);",...J?[]:["  if (item.flags.y > 0.5) {","    gustNow = decor_gust(instanceXZ, frame.windTravel.xy, frame.time);","  }","  if (item.geometry.w > 0.0) {",`    let press = decor_pressLean(instanceXZ) * (${g7} * item.geometry.w / max(item.windB.x, 1e-3));`,"    gustNow += press.xy;","  }"],"  let scatterWind = vec3f(dot(vec3f(gustNow.x, 0.0, gustNow.y), right), 0.0, dot(vec3f(gustNow.x, 0.0, gustNow.y), forward));",...$===null?["  let laneDisplaced = false;"]:[$],"  let bendWeight = select(sway, 0.0, laneDisplaced);","  let localNow = localPos * visibilityNow;","  let offsetNow = decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustNow, bendWeight);","  let decorWorld = instancePosition + offsetNow;",...Q?["  var gustPrev = gustNow;","  if (item.flags.y > 0.5) { gustPrev += decor_gust(instanceXZ, frame.prevWindTravel.xy, frame.prevTime) - decor_gust(instanceXZ, frame.windTravel.xy, frame.time); }",...Z===null?["  let worldPrev = instancePosition + decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustPrev, bendWeight);"]:["  let scatterWindPrev = vec3f(dot(vec3f(gustPrev.x, 0.0, gustPrev.y), right), 0.0, dot(vec3f(gustPrev.x, 0.0, gustPrev.y), forward));","  var localPrevPos = localPos;",Z,"  let localPrev = localPrevPos * visibilityNow;","  let worldPrev = instancePosition + decor_bend(right * localPrev.x + up * localPrev.y + forward * localPrev.z, up, gustPrev, bendWeight);"]]:[],"  let geometryNormal = normalize(decor_bend(right * localNormal.x + up * localNormal.y + forward * localNormal.z, up, gustNow, bendWeight));","  let decorNormal = select(geometryNormal, sampledNormal, item.fx.w > 0.5);"]}var Q6=3,E5=6,p5=[{name:"position",format:"float32x3",offset:0},{name:"normal",format:"float32x3",offset:12},{name:"uv",format:"float32x2",offset:24},{name:"color",format:"float32x3",offset:32},{name:"sway",format:"float32",offset:44},{name:"tex",format:"float32",offset:48},{name:"layer",format:"float32",offset:52},{name:"glow",format:"float32x2",offset:56},{name:"pbr",format:"float32",offset:64}],_5=s7*4,c5=4,u5=5,m5=6,d5=7,n5=8,l5=9;function Z6($,Q=2,Z=E5){if($==="vertex")return"";return`@group(${Q}) @binding(${Z}) var<storage, read> decorArena: array<f32>;
${r7({structName:"DecorVertex",fnName:"decor_pullVertex",bufferName:"decorArena",attributes:p5,arrayStride:_5,baseElementExpr:"vertexIndex"})}`}function J6($=!1,Q=!1){return["@location(0) position: vec3f","@location(1) normal: vec3f","@location(2) uv: vec2f",`@location(${c5}) color: vec3f`,`@location(${u5}) sway: f32`,`@location(${m5}) tex: f32`,`@location(${d5}) layer: f32`,...$?[`@location(${n5}) glow: vec2f`]:[],...Q?[`@location(${l5}) pbr: f32`]:[]]}function z6($,Q=!1,Z=!1){if($==="vertex")return"";return`  let decorVertex = decor_pullVertex(vertexIndex);
  let position = decorVertex.position;
  let normal = decorVertex.normal;
  let uv = decorVertex.uv;
  let color = decorVertex.color;
  let sway = decorVertex.sway;
  let tex = decorVertex.tex;
  let layer = decorVertex.layer;${Q?ba():""}${Z?`
  let pbr = decorVertex.pbr;`:""}`}var R=256;var o5=8;var R9=($,Q)=>`fn ${$}(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = p - i;
  let at = i - ${R}.0 * floor(i / ${R}.0);
  return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / ${R}.0, 0.0).${Q};
}`,s5=`@group(2) @binding(${o5}) var groundLattice: texture_2d<f32>;`,c4=[s5,R9("terrain_lattice0","r"),R9("terrain_lattice1","g"),R9("terrain_lattice2","b"),R9("terrain_lattice3","a")].join(`
`);var j$=127;var q6=4,$Z=(1<<q6*q6)-1;var t5=`fn terrain_hash2D(p: vec2<f32>, seed: f32) -> f32 {
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
}`,a5=($)=>`${t5}

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

`,K6=a5("3");var WZ=`fn terrain_wordLayers(word: u32) -> vec3<u32> { return (vec3<u32>(word) >> vec3<u32>(26u, 20u, 14u)) & vec3<u32>(0x3fu); }
fn terrain_wordQuanta(word: u32) -> vec3<u32> {
  let q = (vec2<u32>(word) >> vec2<u32>(7u, 0u)) & vec2<u32>(0x7fu);
  return vec3<u32>(q, ${j$}u - min(q.x + q.y, ${j$}u));
}`;var e5=3,$Q=4,QQ=5,ZQ=6,JQ=7,zQ=8,B$="lume:decorPaint";var T9=($)=>$==="dissolve",H$="  // @lume:positionNode",X6="  // @lume:positionNode:previous",qQ="  let decorModel: mat4x4<f32> = mat4x4<f32>(vec4<f32>(right, 0.0), vec4<f32>(up, 0.0), vec4<f32>(forward, 0.0), vec4<f32>(instancePosition, 1.0));";function KQ($="vertex",Q="vertex",Z="dissolve",J=!1){let z=(q)=>[...Q==="storage"?[z6(Q)]:[],w7($),U6({struct:"Varyings"}),...$6(H$,J&&!q,J&&!q?X6:null,q).flatMap((X)=>X===H$?[qQ,X]:[X]),"  let worldPos = vec4<f32>(decorWorld, 1.0);"];return{key:`terrain/decor-scatter${F6($)}${Q==="storage"?"-attr-s":""}-${Z}`,declarationsWgsl:`${t7(3)}
@group(3) @binding(1) var<storage, read> records: array<u32>;
@group(3) @binding(2) var<storage, read> tileBirths: array<f32>;
${E7(3,QQ)}
${p7(3,ZQ)}
${Y6($,3,e5)}
${Z6(Q,3,$Q)}
${K6}
${O7}
${v7}
${o7}
${a7()}
${XQ}`,entryParams:[...Q==="storage"?[]:J6(),V6($,Q6),"@builtin(vertex_index) vertexIndex: u32",...$==="storage"?[]:["@builtin(instance_index) instanceIndex: u32"]],positionWgsl:z(!1),...J?{previousPositionWgsl:["  let previousWorldPos = vec4<f32>(worldPrev, 1.0);"]}:{},...T9(Z)?{coverage:L7("revealNow")}:{},...T9(Z)?{casts:!0,casterPositionWgsl:z(!0)}:{},fragmentCut:T9(Z)?{lines:f7,varyings:[]}:{lines:[b7],varyings:[{input:"lume:levelHide",name:"levelHide",type:"f32",flat:!0}],entries:Z==="keep"?"plain":"cut"},lightsOnce:!0,localPositionSlot:{marker:H$,variable:"localPos",displacedFlag:"laneDisplaced",...J?{previous:{marker:X6,variable:"localPrevPos",renames:{scatterWind:"scatterWindPrev"}}}:{}},normalFacingKept:"select(0.0, 1.0, item.fx.w > 0.5)",inputs:{uv:"authoredUv",normalWorld:"decorNormal",normalLocal:"localNormal",positionLocal:"localPos",positionGeometry:"position",positionWorld:"(instancePosition + right * localPos.x + up * localPos.y + forward * localPos.z)",modelMatrix:"decorModel",vertexColor:"vec4<f32>(color, 1.0)","attribute:scatterRandom":"terrain_hash2D(instanceXZ + vec2<f32>(29.0, 47.0), 0.0)","attribute:scatterPosition":"instanceWorld","attribute:scatterGroundTint":"tintCoverage.rgb","attribute:scatterHeightFraction":"heightFraction","attribute:scatterWind":"scatterWind","attribute:scatterFar":"select(1.0 - decor_footprintDensity(decor_footprintPixels(length(toEyeNow))) * decor_smoothVisibility(distanceNow, region.z, region.w), 0.0, dissolve)",...T9(Z)?{}:{"lume:levelHide":"decorLevelHide"},"lume:decorPaintUv":"vec2<f32>(authoredUv.x, 1.0 - authoredUv.y)","lume:decorPaintWord":"tex","lume:decorPaintTint":"select(mix(item.color.rgb, item.tipColor.rgb, item.tipColor.a * heightFraction) * color, color, tex > 0.5)"},varyings:[{input:"attribute:scatterRandom",name:"scatterRandom",type:"f32",flat:!0},{input:"attribute:scatterPosition",name:"scatterPosition",type:"vec3f",flat:!0},{input:"attribute:scatterGroundTint",name:"scatterGroundTint",type:"vec3f",flat:!0},{input:"attribute:scatterHeightFraction",name:"scatterHeightFraction",type:"f32"},{input:"attribute:scatterWind",name:"scatterWind",type:"vec3f",flat:!0},{input:"attribute:scatterFar",name:"scatterFar",type:"f32",flat:!0}],fragmentReads:{inputs:{[B$]:"decorPaint"},lines:["  let decorPaint = decor_paint(in.decorPaintUv, in.decorPaintWord, in.decorPaintTint);"],varyings:[{input:"lume:decorPaintUv",name:"decorPaintUv",type:"vec2f"},{input:"lume:decorPaintWord",name:"decorPaintWord",type:"f32",flat:!0},{input:"lume:decorPaintTint",name:"decorPaintTint",type:"vec3f"}]}}}var XQ=`@group(3) @binding(${JQ}) var itemTexture: texture_2d_array<f32>;
@group(3) @binding(${zQ}) var itemSampler: sampler;
${e7()}
fn decor_paint(uv: vec2<f32>, word: f32, tint: vec3<f32>) -> vec4<f32> {
  let picture = decor_runSample(uv, max(i32(round(word)) - 1, 0));
  return select(vec4<f32>(tint, 1.0), vec4<f32>(picture.rgb * tint, picture.a), word > 0.5);
}`;function j6($){return{vertexPath:KQ($.survivorSource,$.attributeSource,$.arm,$.motion),pass:$.pass,motion:$.motion,instancing:"none"}}var YQ=0.5,H6=()=>({random:G("scatterRandom","f32"),position:G("scatterPosition","vec3f"),groundTint:G("scatterGroundTint","vec3f"),heightFraction:G("scatterHeightFraction","f32"),wind:G("scatterWind","vec3f"),far:G("scatterFar","f32")});function VQ($){return $.opacityNode!==null||$.alphaTest>0||$.colorNode?.type==="vec4f"}function B6($,Q){if(Q?.color!==void 0)$.color=Q.color;if(Q?.emissive!==void 0)$.emissive=Q.emissive;if(Q?.emissiveIntensity!==void 0)$.emissiveIntensity=Q.emissiveIntensity;if(Q?.metalness!==void 0)$.metalness=Q.metalness;if(Q?.roughness!==void 0)$.roughness=Q.roughness;if(Q?.alphaTest!==void 0)$.alphaTest=Q.alphaTest;$.side="double",$.transparent=!1,$.transmission=0;let Z=VQ($);if(Z)$.alphaTest=Math.max($.alphaTest,YQ);if($.colorNode===null){let J=k(B$,"vec4f",{fragmentOnly:!0});$.colorNode=Z?O(L.mul(J.xyz),J.w):L.mul(J.xyz)}}function G6($){switch($){case"add":case"screen":return"add";case"multiply":return"multiply";case"subtract":return"subtract";case"distort":return"distort";case"alpha":default:return"alpha"}}var hZ=-M6*0.25;var P6="0.002";var I6="fx",W6=["x","y","z","w"];function UQ($){return new Proxy($,{get(Q,Z){if(typeof Z!=="string")return;return Q[Z]??Y9(0)},has:()=>!0})}function FQ($,Q){let Z=Q===void 0||Q===null?M$:M$.add(A(Q).mul(A(1,-1)));return $.sample(Z)}function G$($,Q=!1){let Z={},J=G("fxParams","vec4f");return $.slice(0,W6.length).forEach(function(z,q){Z[z]=J.swizzle(W6[q])}),{uvAlong:u().x,uvAcross:u().y,viewDir:G("fxViewDir","vec3f"),normal:D6,color:G("fxColor","vec3f"),alpha:G("fxAlpha","f32"),size:G("fxSize","f32"),seed:G("fxSeed","f32"),params:UQ(Z),scene(z){return FQ(O9,z)},texture(z){return jQ(Q,z)}}}function jQ($,Q){if(!$)return O(1,1,1,1);let Z=Q===void 0||Q===null?u():A(Q);return e("vec4f")`textureSample(fx_ribbon_tex, fx_ribbon_smp, ${A(Z.x,y6(Z.y))}, 0)`}function HQ($){switch($){case"add":return"additive";case"multiply":return"multiply";case"subtract":return"subtractive";case"alpha":case"distort":return"normal"}}function P$($){return{blend:$.blend===null?null:G6($.blend),soft:$.soft,twoSided:$.path!=="mesh"||$.twoSided}}function S9($,Q){if(Q.blend!==null&&!$.transparent&&$.blending==="normal")V9($),$.blending=HQ(Q.blend);if(Q.twoSided&&!$.sideAuthored)$.side="double";if(Q.soft>0&&$.transparent&&$.blending!=="none"){let Z=$.opacityNode??Y9($.opacity);$.opacityNode=Z.mul(N6(Q.soft))}}function A6($,Q,Z){let J=Z.mul(Q.texture().w),z=A(Q.color.x,Q.color.y).mul(J);$.colorNode=Q.scene(z).xyz,$.opacityNode=J.mul(x6(0,Number(P6),C6(z))),V9($),$.blending="normal"}function k6($,Q,Z=!1){let J=P$($),z=J.blend,q=Q.alpha;if($.path!=="mesh"){let V=new a("unlit");if(V.fog=z===null||z==="alpha",V.depthWrite=!1,z==="distort")A6(V,Q,q);else if($.textured){let U=Q.texture();V.colorNode=Q.color.mul(U.xyz),V.opacityNode=q.mul(U.w)}else V.colorNode=Q.color,V.opacityNode=q;return S9(V,{...J,blend:z==="distort"?null:z??"alpha"}),V}let X=new a(Z?"pbr":"lambert");if(Z)X.roughnessNode=1,X.metalnessNode=0;if(z==="distort")A6(X,Q,q);else if(X.colorNode=Q.color,z!==null)X.opacityNode=q;return S9(X,{...J,blend:z==="distort"?null:z}),X}var BQ=($,Q)=>MQ($?.filter,Q?.filter,"pixel","linear");function MQ($,Q,Z,J){let z=$===Z||$===J?$:Q;if(z===Z)return Z;return z===J?J:void 0}function h($){return typeof $==="string"&&$.length>0?$:null}function GQ($,Q){let Z=PQ($),J=BQ($,Q);return Z!==null&&J!==void 0?{...Z,filter:J}:Z}function PQ($){if(!$)return null;let Q=h($.albedoHeightMap),Z=h($.nroMap),J=h($.emissiveMap);if(Q!==null||Z!==null)return{kind:"packed",albedoHeight:Q,nro:Z,emissive:J};let z=h($.map),q=z!==null&&!R6(z)?z:null,X=h($.normalMap),V=h($.roughnessMap),U=h($.metalnessMap),K=h($.alphaMap);if(X!==null||V!==null||U!==null||K!==null||J!==null)return ca(q,X,V,U,K,J);return da(q);}function WQ($){if($.kind==="packed")return $.albedoHeight;return $.kind==="singles"?$.baseColor:$.map}function T6($){let Q=GQ($);return Q===null||Q.kind==="packed"?null:WQ(Q)};var L6=[{binding:v6,variable:w6},{binding:b6,variable:"airVolume"},{binding:11,variable:"cloudShadowField"}];var AQ=1;function W$($){let Q=0;for(let Z of $)if(Z.texture!==void 0&&(Z.visibility&2)!==0)Q+=1;return Q}function NQ(){let $=new Set(L6.map((Q)=>Q.binding));return W$(A$.filter((Q)=>!$.has(Q.binding)))}function CQ(){return W$(g6)+W$(A$)+AQ}function DQ($){let Q=f6($).size;return($.shadingModel==="matcap"&&$.matcapTexture!==null?1:0)+(h6($)?1:0)+($._surfaceMap!==null?1:0)+Q}function E6($,Q){let Z=$?.maxSampledTexturesPerShaderStage;if(Z===void 0)return null;let J=DQ(Q);return{ownArm:Z-(Q.shadingModel==="unlit"?0:NQ())-J,everyArm:Z-CQ()-J}}function z8($,Q){return JSON.stringify(Q===b9?$:{...$,hold:(Q&l6)===0?null:$.hold,cut:(Q&i6)===0?null:$.cut})}function T$($,Q=s6){let Z=Q($.library,$.entry,$.script,{placeId:$.placeId,drawsWearerColors:$.groundSurface===void 0,still:$.still,groundSurface:$.groundSurface,cameraFace:a6($.overrides)!==null,liveGates:$.liveGates});if(!Z)return null;return LQ(Z,$.overrides),{shade:Z,surfaceUnread:Z.colorNode!==null&&!q8(Z)}}function q8($){let Q=x9.flatMap((z)=>$[z]??[]),Z=f($);if(Z)I9(Z,Q);let J=new Set;return Q.some((z)=>k9(z,J,(q)=>q.meta.kind==="input"&&q.meta.name==="materialColor"))}function K8($,Q){let Z=o6($)?.viewRef??null;if(!$.sideAuthored&&$.side==="double"&&J8($)!==void 0&&Z===null)$.side="front",$.sideAuthored=!1;let J=SQ($,Q.overrides,Q.surface),z=Q.base.vertexLayout?.attributes.map((F)=>F.name)??[];kQ($,Q.surface?.factors);let q=(Q.surface?.maps??[]).map((F)=>IQ($,F,z));if(RQ($,z),TQ($))$.alphaTest=0;let X=E6(Q.limits,$);if(X!==null)t6($,X);let V=f($),U={...Q.base,lighting:Q.lighting,fragmentScope:V,vertexScope:V},K=N$(m($,U),Q.quietOnce),j=O6(Q.limits,[...(K.storages??[]).map((F)=>F.ref),...(K.compute??[]).flatMap((F)=>F.storages)],K.compute??[]);if(j)throw j;let H=S6(Q.limits,K.textures,K.compute??[]);if(H)throw H;let M=Q.motionToo&&K.motion!==!0?N$(m($,p6(U,K,"motion")),Q.quietOnce):null,B=Q.marksToo&&K.loopMarks===!0&&!K.throughMarks?N$(m($,p6(U,K,"loopMarks")),Q.quietOnce):null;return{shade:$,assembled:K,motionAssembled:M,marksAssembled:B,surfaceTexture:J,slotMaps:q,options:U}}var X8={pbr:3,physical:3,phong:2,lambert:2,toon:2,matcap:1,unlit:0},yQ=k$(Z8),xQ=k$(Q8);function IQ($,{slot:Q,handle:Z,uv:J,transform:z,scale:q,channel:X},V){let U={normal:$.normalNode,occlusion:$.aoNode,metalRough:$.metalnessNode&&$.roughnessNode,roughness:$.roughnessNode,metalness:$.metalnessNode}[Q];if((Q==="normal"?0:1+Number(Q!=="occlusion"))>=X8[$.shadingModel]||U)return null;let K=Y8(Z);K.readsData=!0;let j=V8(u(J),z??void 0),H=K.sample(j);if(Q==="normal"){let M=(B)=>(X==="xy"?D$(xQ,"patina_packedNormalTs",[B,Y9(q)],"vec3f"):d6(B,q)).mul(u6(1,-1,1));$.normalNode=n6(D$(yQ,"lume_meanFreeNormal",[M(H),M(K.sampleLevel(A(0.5),32))],"vec3f"),j)}else if(Q==="occlusion")$.aoNode=H.r.sub(1).mul(q).add(1);else{let M=X==="b"?H.b:H.g;if(Q!=="roughness")$.metalnessNode??=w9(V,!0).mul(H.b);if(Q!=="metalness")$.roughnessNode??=w9(V,!1).mul(q===1?M:M.sub(1).mul(q).add(1))}return K}function kQ($,Q){if(!Q||X8[$.shadingModel]<3)return;if(!y$($,"metalness"))$.metalness=Q[0];if(!y$($,"roughness"))$.roughness=Q[1]}function p6($,Q,Z){return{...$,[Z]:!0,materialBlocks:Q.materialBlocks?"kept":void 0}}function RQ($,Q){if(Q.includes("pbr"))$.emissiveNode??=c6,$.metalnessNode??=w9(Q,!0);if(Q.includes("roughness"))$.roughnessNode??=w9(Q,!1)}function w9($,Q){let Z=Q?e("f32")`material.metalness`:e("f32")`material.roughness`,J=Q?G("pbr","vec4f").w:G("roughness","f32");return $.includes(Q?"pbr":"roughness")?e("f32")`select(${Z}, ${J}, ${J} >= 0.0)`:Z}function TQ($){if($.alphaTest<=0||$.alphaTest>=1||$.colorNode?.type==="vec4f")return!1;let Q=$.opacityNode;return Q!==null&&Q.meta.kind==="const"&&Q.meta.values.length>0&&Q.meta.values.every((Z)=>Z>=1)}function N$($,Q){if(!Q)return $;let{text:Z,added:J}=$8($.wgsl,!0);if(Z===$.wgsl)return $;let z=[...$.pipelineKeyParts],q=z.indexOf("wgsl");if(q>=0)z[q+1]=e6(Z);return{...$,wgsl:Z,pipelineKeyParts:z,declaredFolds:$.declaredFolds|J}}function SQ($,Q,Z){if(!Z)return null;let J=q8($),z=Z.partPicture===!0?T6(Q):null,q=z!==null||Z.textureHandle!==void 0,X=()=>OQ(z!==null?r6($,z):Y8(Z.textureHandle),Q);if($.colorNode){if(!J||!q)return null;let j=X();return $._surfaceMap=_6(j,Z),z!==null?null:j}if(Q?.color===void 0){if(z!==null)$.color=typeof Q?.tint==="number"?v9(Q.tint):[1,1,1];else if(Z.color)$.color=[...Z.color]}let V=null,U=null,K=!1;if(q)if(V=X(),J)$._surfaceMap=_6(V,Z),U=O(L,k(m6,"f32",{fragmentOnly:!0})),K=!0;else U=V.sample(V8(u(Z.textureUv??0),Z.textureTransform));if(Z.vertexColor){let j=y9();U=U?U.mul(j):j}if(!U)return null;return $.colorNode=K?U:U.mul(O(L,1)),z!==null?null:V}function Y8($){let Q=I$($);Q._measured=!0;let Z=R$($);if(Z!==void 0)Q._residency=Z;return Q}function OQ($,Q){let Z=Q?.filter;if(Z==="pixel")$.magFilter=1003;else if(Z==="linear")$.magFilter=1006,$.minFilter=1008;return $}function _6($,Q){return{texture:$,uv:Q.textureUv??0,transform:Q.textureTransform}}function V8($,Q){if(Q===void 0)return $;let Z=$.mul(A(Q.scale[0],Q.scale[1])),J=Math.cos(Q.rotation),z=Math.sin(Q.rotation);return(Q.rotation===0?Z:A(Z.dot(A(J,z)),Z.dot(A(-z,J)))).add(A(Q.offset[0],Q.offset[1]))}var vQ=["metalness","roughness","opacity","emissiveIntensity","alphaTest","polygonOffsetFactor","polygonOffsetUnits"],wQ=["wireframe","depthWrite","depthTest","polygonOffset","premultipliedAlpha","colorWrite","clipIntersection","clipShadows"],bQ=["blending","blendSrc","blendDst","blendEquation","blendSrcAlpha","blendDstAlpha","blendEquationAlpha","clippingPlanes"];function C$($,Q,Z,J){for(let z of Z){let q=Q[z];if(J===void 0?q!==void 0:typeof q===J)Reflect.set($,z,q)}}function LQ($,Q){if(!Q)return;if(typeof Q.color==="number")$.color=v9(Q.color);if(typeof Q.emissive==="number")$.emissive=v9(Q.emissive);if(Q.side)$.side=Q.side;C$($,Q,vQ,"number"),C$($,Q,wQ,"boolean"),C$($,Q,bQ,void 0);let Z=fQ(Q);if(Z!==void 0)$.renderOrder=Z;if(!$.transparent&&(Q.transparent===!0||$.opacity<1))V9($);if(Q.drawsOver&&x$())$.depthTest=!0}function fQ($){if($?.drawsOver&&x$())return 0;let Q=$?.renderOrder;return T(Q)?Q:void 0}var p9=0,S8=1,L$=2,O8=3,v8=4,I=5,L9=14,hQ=["N","U","V","T","B","W","F","C","O"],U8=I,gQ=I+1,EQ=I+2,pQ=I+3,_Q=I+4,cQ=I+5,uQ=I+6,mQ=I+7,$9=I+8,dQ=-134217728,nQ=134217727,g=p9,lQ=16|p9,iQ=32|p9,oQ=48|p9;var N=($,Q)=>Q<<4|$,d=($)=>$&15,E=($)=>$>>4,h9=5,f$=5,w8=2,p=5,S$=3,g9=3,b8=0,_9=1,h$=2,g$=3,E9=4,L8=5,f8=6,c9=7,F8=8,sQ=16;class x extends Error{constructor($){var $lpt0;super(`a graph image cannot carry ${$}`),"what"in this?$lpd0(this,"what",void 0):this.what=void 0;this.what=$;this.name="GraphImageRefusal"}}class E${constructor($,Q){this.words=void 0;this.n=0;this.make=void 0;this.make=$,this.words=$(Q)}push($){if(this.n===this.words.length){ea.call(this);}return this.words[this.n]=$,this.n++}done(){let $=this.make(this.n);return $.set(this.words.subarray(0,this.n)),$}}var v=()=>new E$(($)=>new Int32Array($),64),j8=()=>new E$(($)=>new Float64Array($),16),rQ=($)=>$===null||typeof $!=="object"&&typeof $!=="function"&&typeof $!=="symbol",H8=($,Q)=>Q===void 0?$:`${$} ${Q}`;function tQ($){let Q;for(let Z of x8){let J=$[Z];if(Number.isFinite(J))(Q??={})[Z]=J}return Q}function aQ($){let Q=tQ($);return{h:g,f:$.flipY,w:$.wrap,s:$.sampleType,...$.fragmentOnly===void 0?{}:{fo:$.fragmentOnly,foi:$.fragmentOnlyInput??""},...$.decodeSrgb===!0?{ds:!0}:{},...$.readsData===!0?{rd:!0}:{},...$._measured===!0?{ms:!0}:{},...Q===void 0?{}:{sw:Q},...$.dimension===void 0?{}:{dm:$.dimension}}}var B8=0,M8=1,G8=2,P8=3,W8=4,A8=5;class p${constructor($){this.options=void 0;this.strs=[];this.strIndex=new Map;this.types=[];this.models=[];this.nums=j8();this.nodes=v();this.ins=v();this.slots=v();this.slotVals=j8();this.vars=v();this.objs=v();this.ents=v();this.fns=v();this.comps=v();this.roots=v();this.bins=[];this.texs=[];this.stors=[];this.blks=[];this.mods=[];this.memo=new Map;this.blocks=new Map;this.pendingKind=[];this.pendingIndex=[];this.pendingObject=[];this.singletonNames=new Map;this.options=$;if($.singletons)for(let[Q,Z]of $.singletons)this.singletonNames.set(Z,Q)}write($){fa.call(this,$);for(let Q=this.pendingKind.pop();Q!==void 0;Q=this.pendingKind.pop()){let Z=this.pendingIndex.pop()??ga(),J=this.pendingObject.pop()??ha();this.fill(Q,Z,J)}return ia.call(this);}refOf($){let Q=this.memo.get($);if(Q===void 0)return null;let Z=d(Q);if(Z===L9)return["G",this.strs[E(Q)]];return Z>=I&&Z<L9?[hQ[Z-I],E(Q)]:null}str($){let Q=this.strIndex.get($);if(Q===void 0)Q=this.strs.push($)-1,this.strIndex.set($,Q);return Q}type($){let Q=this.types.indexOf($);return Q>=0?Q:this.types.push($)-1}num($){return Number.isInteger($)&&$>=dQ&&$<=nQ&&!Object.is($,-0)?N(S8,$):N(L$,this.nums.push($))}ref($,Q,Z){if(rQ($))switch(typeof $){case"undefined":return lQ;case"boolean":return $?oQ:iQ;case"number":return this.num($);case"string":return N(O8,this.str($));case"bigint":return N(v8,this.str(String($)));default:return g}if(typeof $==="function")ja(Q,Z);if(typeof $==="symbol")ka(Q,Z);let J=$,z=this.memo.get(J);if(z!==void 0)return z;let q=this.singletonNames.get(J),X=q===void 0?this.row(J):N(L9,this.str(q));return this.memo.set(J,X),X}row($){if($ instanceof v$){let Z=this.nodes.n/h9;return this.nodes.push(this.type($.type)),this.nodes.push(g),this.nodes.push(0),this.nodes.push(0),this.nodes.push(0),this.later(U8,B8,Z,$)}if($ instanceof k8){let Z,J;{la.call(this,$);Z=aa[0];J=aa[1]}for(let z=0;z<J.length;z+=1)this.slotVals.push(J[z]);return N(gQ,Z)}if($ instanceof I8){let Z=this.vars.n/w8;return this.vars.push(this.type($.type)),this.vars.push($.label===null?0:this.str($.label)+1),N(EQ,Z)}if(f9($))return this.later(pQ,M8,this.texs.push(aQ($))-1,$);if(b$($))return ma.call(this,$);if(R8($))return na.call(this,$);if(w$($)){return oa.call(this,$);}if($ instanceof O$){return pa.call(this,$);}let Q=this.objs.n/p;for(let Z=0;Z<p;Z+=1)this.objs.push(0);return this.later($9,A8,Q,$)}blockRow($){let Q=this.blocks.get($);if(Q!==void 0)return Q;let Z={k:$.kind,m:$.module===null?-1:this.str($.module),ms:[],w:$.words,bd:g},J=this.blks.push(Z)-1;return this.blocks.set($,J),Z.ms=$.members.map((z)=>this.ref(z,"storage block member")),Z.bd=$.bound===null?g:this.ref($.bound,"storage block"),J}later($,Q,Z,J){return this.pendingKind.push(Q),this.pendingIndex.push(Z),this.pendingObject.push(J),N($,Z)}fill($,Q,Z){switch($){case B8:if(Z instanceof v$)this.fillNode(Q,Z);return;case M8:qa.call(this,Z,Q);return;case G8:{if((sa=ta.call(this,Z,Q))!==ra)return sa}case P8:{if((sa=ua.call(this,Z,Q))!==ra)return sa}case W8:va.call(this,Z,Q);return;case A8:this.objectRow(Q,Z);return}}fillNode($,Q){let Z=Q.inputs,J=this.ins.n;for(let K=0;K<Z.length;K+=1){let j=this.ref(Z[K],"an input of node",Q.meta.kind);if(d(j)!==U8)wa(Q);this.ins.push(E(j))}let z=this.ref(Q.meta,"the meta of node",Q.meta.kind),q=this.options.compatSlotOf?.(Q)??null,X=q===null?0:E(this.ref(q,"the compat slot of node",Q.meta.kind))+1,V=$*h9,U=this.nodes.words;U[V+1]=z,U[V+2]=X,U[V+3]=J,U[V+4]=Z.length}objectRow($,Q){let Z=this.ents.n,J,z=0,q=0,X=0;if(ArrayBuffer.isView(Q)||Q instanceof ArrayBuffer)J=E9,z=this.bins.push(Q)-1;else if(Array.isArray(Q)){J=_9|(Object.isFrozen(Q)?F8:0);for(let K=0;K<Q.length;K+=1)this.ents.push(this.ref(Q[K],"array index",K));q=Q.length}else if(Q instanceof Map)J=h$,q=this.mapEntries(Q);else if(Q instanceof Set){J=g$;xa.call(this,Q);q=Q.size}else if(Q instanceof a){J=L8;let K=this.models.indexOf(Q.shadingModel);z=K>=0?K:this.models.push(Q.shadingModel)-1,q=this.fields(Q,"material",(H)=>H!=="shadingModel"&&H!=="userData");{X=ya.call(this,X,Q)}}else{let K=Object.getPrototypeOf(Q);if(K===Object.prototype||K===null)J=b8|(Object.isFrozen(Q)?F8:0)|(K===null?sQ:0),q=this.fields(Q,"object",null);else{let j=this.classOf(Q,K);J=f8,z=this.str(j),q=this.fields(Q,j,null)}}let V=$*p,U=this.objs.words;U[V]=J,U[V+1]=z,U[V+2]=Z,U[V+3]=q,U[V+4]=X}mapEntries($){for(let[Q,Z]of $){let J=this.ref(Q,"<key>"),z=this.ref(Z,"<value>");this.ents.push(J),this.ents.push(z)}return $.size}classOf($,Q){let Z=this.options.classes??{},J=Object.keys(Z).find((z)=>Z[z].prototype===Q);if(J===void 0)throw new x(`an instance of ${T8($)??"an unknown class"}`);return J}fields($,Q,Z){let J=0;for(let z of Object.keys($)){let q=Object.getOwnPropertyDescriptor($,z);if(q===void 0)continue;if(q.get!==void 0||q.set!==void 0)Aa(Q,z);if(Z!==null&&!Z(z))continue;let X=this.str(z),V=this.ref(q.value,Q,z);this.ents.push(X),this.ents.push(V),J+=1}return J}}function Q9($,Q={}){return new p$(Q).write($)}function h8($,Q,Z){let J=new p$(Q);return{image:J.write($),marks:Z.map((q)=>J.refOf(q))}}function N8($){throw Error(`graph image: ${$}`)}function g8($){let Q=[];for(let Z=0;Z<$.slots.length;Z+=f$)Q.push(Array.from($.slotVals.subarray($.slots[Z+3],$.slots[Z+3]+$.slots[Z+4])));return Q}function E8($,Q){if(Q[0]!=="O"||typeof Q[1]!=="number")return null;let Z=Q[1],J=Z*p;if(J>=$.objs.length||($.objs[J]&c9)!==b8)return null;let z=[],q=$.objs[J+2];for(let V=0;V<$.objs[J+3];V+=1){let U=$.ents[q+2*V+1];if(d(U)>=I&&!eQ($,U,z))return null}let X=new Map([[N($9,Z),0]]);for(let V of z)X.set(N($9,V),0);$2($,function(V){let U=X.get(V);if(U!==void 0)X.set(V,U+1)});for(let V of z)if(X.get(N($9,V))!==1)return null;return{index:Z,holders:X.get(N($9,Z))??0,tables:z}}var C8=($)=>d($)===S8||d($)===L$;function D8($,Q){if(d(Q)!==$9)return null;let Z=E(Q)*p;if(Z>=$.objs.length||($.objs[Z]&c9)!==_9||$.objs[Z+4]!==0)return null;return[$.objs[Z+2],$.objs[Z+3]]}function eQ($,Q,Z){let J=D8($,Q);if(J===null)return!1;Z.push(E(Q));for(let z=0;z<J[1];z+=1){let q=$.ents[J[0]+z];if(C8(q))continue;let X=D8($,q);if(X===null)return!1;for(let V=0;V<X[1];V+=1)if(!C8($.ents[X[0]+V]))return!1;Z.push(E(q))}return!0}function $2($,Q){for(let Z=1;Z<$.nodes.length;Z+=h9)Q($.nodes[Z]);Ba($,Q);for(let Z=0;Z<$.objs.length;Z+=p){let J=$.objs[Z]&c9,z=$.objs[Z+2],q=$.objs[Z+3]+$.objs[Z+4];if(J===_9||J===g$)for(let X=0;X<q;X+=1)Q($.ents[z+X]);else if(J===h$)for(let X=0;X<2*q;X+=1)Q($.ents[z+X]);else if(J!==E9)for(let X=0;X<q;X+=1)Q($.ents[z+2*X+1])}Ca($,Q);}function Q2($,Q){return function(Z){let J=E(Z);switch(d(Z)){case L$:{let z=$.nums[J];return`n${Object.is(z,-0)?"-0":String(z)}`}case O8:return`s${Q($.strs[J])}`;case v8:return`b${$.strs[J]}`;case L9:return`g${Q($.strs[J])}`;default:return String(Z)}}}function Z2($,Q,Z,J,z,q){let X=Q*p,V=$.objs[X],U=V&c9,K=$.objs[X+1],j=$.objs[X+2],H=$.objs[X+3],M=$.objs[X+4],B="-";if(U===E9)B=q($.bins[K]);else if(U===L8)B=z($.models[K]);else if(U===f8)B=z($.strs[K]);if(Z.push(String(V),B,String(H),String(M)),U===_9||U===g$)for(let F=0;F<H;F+=1)Z.push(J($.ents[j+F]));else if(U===h$)for(let F=0;F<2*H;F+=1)Z.push(J($.ents[j+F]));else if(U!==E9)for(let F=0;F<H+M;F+=1)Z.push(z($.strs[$.ents[j+2*F]]),J($.ents[j+2*F+1]))}function p8($,Q,Z,J){let z=$.strs,q=[String($.v)],X=Q2($,Z),V=(K)=>K===0?"-":Z(z[K-1]),U=$.types;q.push("N");for(let K=0;K<$.nodes.length;K+=h9)q.push(Z(U[$.nodes[K]]),X($.nodes[K+1]),String($.nodes[K+2]),String($.nodes[K+3]),String($.nodes[K+4]));Da(q,$,Z,U,V);for(let K=0;K<$.vars.length;K+=w8)q.push(Z(U[$.vars[K]]),V($.vars[K+1]));Ea(q,$,X,J,Z,z);for(let K=0;K*p<$.objs.length;K+=1)if(Q?.has(K)===!0)q.push("0");else Z2($,K,q,X,Z,J);return Fa(q,$,X);}var _8=null;function z2(){return _8??=new Map([["std.sceneColorTexture",O9]]),_8}var c$={classes:{Vector2:m8,Vector3:d8,Plane:n8},get singletons(){return z2()},skipUserData:($)=>$===l8||$===i8||$===o8,compatSlotOf:u8,decorateCompat:c8,holdText:_$};function u9($){if($===void 0)return;try{return{ok:$()}}catch(Q){return{refused:t(Q)}}}function m9($){let{symbols:Q,outlineMask:Z,surfaceBuffer:J,seeThrough:z,lookPlane:q,uniformLayout:X,...V}=$,U=new Map;for(let D of X.slots)U.set(D.id,D);let K=[];for(let[D,n]of X.offsets){let l=U.get(D);if(l===void 0)throw new x(`an offset for slot ${D} the layout does not list`);K.push([l,n])}let j=u9(Z),H=u9(J),M=u9(z),B=u9(q),F={wgsl:U9($.wgsl),...$.vertexWgsl?{vertexWgsl:U9($.vertexWgsl)}:{},...$.shadowVertexWgsl?{shadowVertexWgsl:U9($.shadowVertexWgsl)}:{},...H!==void 0&&"ok"in H?{surface:U9(H.ok.wgsl)}:{}};return{...V,doorTexts:F,uniformLayout:{...X,offsets:K},...j===void 0?{}:{outlineMask:j},...H===void 0?{}:{surfaceBuffer:H},...M===void 0?{}:{seeThrough:M},...B===void 0?{}:{lookPlane:B}}}function s8($,Q,Z){return{graph:Q9(t8($),c$),surfaceUnread:Q,taints:Z}}function r8($,Q,Z,J){let{image:z,marks:q}=h8(t8($),c$,J);return{image:{graph:z,surfaceUnread:Q,taints:Z},marks:q}}function t8($){let Q=j9($.shade);return[$.shade,m9($.assembled),$.motionAssembled===null?null:m9($.motionAssembled),F9($.shade),$.surfaceTexture,Q,$.marksAssembled===null?null:m9($.marksAssembled),$.slotMaps]}function u$($,Q,Z,J=[]){let z=Q.map(([q,X])=>[q,m9(X)]);return{graph:Q9([$,F9($),j9($),z,...J],c$),taints:Z}}var a8=null,e8=new Map,d$=new Map,$0=null,Q0=0;function q2($,Q){if(a8!==$)a8=$,e8=new Map,d$=new Map;return V$(e8,Q)}function K2($,Q){let Z=E8($,Q);return Z!==null&&Z.holders===1?new Set([Z.index,...Z.tables]):null}function n$($){return F$(d$,$,()=>`\x00${d$.size}`)}function X2($){let Q=new Map;return $.forEach(function(Z,J){if(typeof Z==="string"){if(!Q.has(Z))Q.set(Z,`\x03${J}`);return}Z.forEach(function(z,q){if(!Q.has(z))Q.set(z,`\x03${J}.${q}`)})}),Q.size===0?n$:(Z)=>Q.get(Z)??n$(Z)}function z0($){return $ instanceof ArrayBuffer?`$ab:${$.byteLength}:${m$(new Uint8Array($))}`:`$v:${$.constructor.name}:${$.byteLength}:${m$($)}`}function Y2($,Q){switch(typeof Q){case"string":return n$(Q);case"boolean":return Q;case"number":return Ga(Q);case"object":if(Q===null||Array.isArray(Q))return Q;if(Q instanceof ArrayBuffer||ArrayBuffer.isView(Q))return{$y:z0(Q)};return Q;case"undefined":return{$u:1};case"bigint":return{$b:String(Q)};default:return Q}}function V2($){return(Q,Z)=>typeof Z==="string"?$(Z):Y2(Q,Z)}function U2(){return $0??=typeof crypto<"u"&&Ha()?crypto.randomUUID():String(performance.timeOrigin),Q0+=1,`${$0}.${Q0}`}function F2($){if($===null)return{};let Q={};for(let[Z,J]of Object.entries($))if(typeof J==="number"||typeof J==="boolean"||typeof J==="string")Q[Z]=J;else if(j2(J))Q[Z]=J;else return null;return Q}function j2($){return Array.isArray($)&&Z0($)===null}function q0($,Q,Z){let J=$.twins;if(J===void 0)return Q;try{let z=Q.image.graph,q=[];for(let F of Z.layoutRefs){if(F?.[0]!=="U"||typeof F[1]!=="number")return Q;q.push(F[1])}let X=F2(Z.params),V=Z.paramsRef===null?null:K2(z,Z.paramsRef);if(X===null||Z.paramsRef!==null&&V===null)return Q;let U=q2($.realmPrint,J.group),K=X2(Z.textures),j=`${p8(z,V,K,z0)}\x02${JSON.stringify([Q.image.surfaceUnread,Q.image.taints,Q.ownLighting,Q.words,Q.realmPrint],V2(K))}`,H=g8(z),M=U.get(j);if(M===void 0||J.whole){let F=M?.name??U2();return U.set(j,{values:H,name:F}),{...Q,print:F}}if(M.values.length!==H.length)return Q;let B=new Set(q);for(let F=0;F<H.length;F+=1)if(!B.has(F)&&!J0(M.values[F],H[F]))return Q;return{kind:"twin",of:M.name,values:q.map((F)=>H[F]),params:X,textures:Z.textures,surfaceUnread:Q.image.surfaceUnread,taints:Q.image.taints,ownLighting:Q.ownLighting,realmPrint:Q.realmPrint,words:Q.words,reports:Q.reports}}catch{return Q}}function K0($){let Q=new Map;for(let z of $.uniformSlots)Q.set(z.id,z);let Z=[];for(let[z,q]of $.uniformOffsets){let X=Q.get(z);if(X===void 0)throw new x(`a sky offset for slot ${z} its program does not list`);Z.push([X,q])}let J={...$,uniformOffsets:Z};return Q9([J])}function X0($){return Q9([$])}var H2={getTexture:()=>null,retainTexture:()=>null,subscribe:()=>function(){return}},B2=[0,0,0,0],M2={binding:null,window:B2,subscribe:()=>function(){return},release:function(){return}},G2={lease:()=>M2},Y0="";function E0($){R0($.session);let Q=JSON.stringify($.sunShadow);if(Q!==Y0)Y0=Q,M0($.sunShadow);if(L0()!==null!==$.cellLight)f0($.cellLight?J$:null);let Z=$.dials;if(b0(Z.farSun),S0()!==Z.lightOnce)T0(Z.lightOnce);if(O0(Z.newerBuild),k0($.device),B0($.device.uniformBytes),G0($.hold),I0()!==$.cut)x0($.cut);if(w0()!==$.depthRoad)v0($.depthRoad)}function p0($,Q,Z){let J=N0(),z=W0(),q=H0();o$($.assets?H2:null),i$($.fields?G2:null),l$((X)=>Q.engine.push(X)),s$((X)=>Q.scripted.push(X));try{return Z()}finally{s$(null),l$(q),i$(z),o$(J)}}var P2=10;function _0($,Q,Z){if(!U0($,Q,Z))return!0;if(F0($,Q,Z)&&!$.parser.arriving())return!1;return null}var H9=[],r$=!1;function W2(){r$=!1;let $=[];for(let Q=0;Q<H9.length;){let Z=H9[Q],J=_0(Z.std,Z.entry,Z.ref);if(J===null){Q+=1;continue}H9.splice(Q,1),$.push({settle:Z.settle,stood:J})}for(let{settle:Q,stood:Z}of $)Q(Z);c0()}function c0(){if(r$||H9.length===0)return;r$=!0,setTimeout(W2,P2)}function B9($,Q,Z){let J=_0($,Q,Z);if(J!==null)return Promise.resolve(J);return new Promise(function(z){H9.push({std:$,entry:Q,ref:Z,settle:z}),c0()})}function U3($,Q){if("family"in Q)return Promise.resolve(!0);if("fx"in Q)return Q.scripted===null?Promise.resolve(!0):B9($,Q.scripted.entry,Q.scripted.script.ref);return"program"in Q?B9($,Q.entry,Q.ref):B9($,Q.entry,Q.script.ref)}function t$($,Q){return{kind:"refused",message:t($),code:$ instanceof j0?$.detail?.code??null:null,reports:Q}}function l9(){let $={words:0,run:(Q)=>P0(function(Z){$.words|=Z},Q)};return $}function i9($,Q){let Z=A0();return D0(Z,{scripts:{[$]:Q}}),Z}var a$="material(ctx) read a picture's colour word, which the renderer holds",u0=($)=>$ instanceof x?$.message:`the builder fell: ${t($)}`;async function F3($,Q){if("family"in Q)return V0(Q);if("program"in Q)return A2($,Q);if("fx"in Q)return N2($,Q);let Z=[],J=[],z={scripted:Z,engine:J};if(!await B9($,Q.entry,Q.script.ref))return C("a door of the builder's realm did not stand",z);let q;try{E0(Q.realm),q=p0(Q.realm,{scripted:Z,engine:J},()=>I2($,Q,z))}catch(X){return C(u0(X),z)}return q.twin===null||q.reply.kind!=="built"?q.reply:q0(Q,q.reply,q.twin)}async function m0($,Q,Z,J){let X={scripted:[],engine:[]};if(Z!==null&&!await B9($,Z.entry,Z.ref))return C("a door of the builder's realm did not stand",X);try{return E0(Q),p0(Q,X,()=>J(X))}catch(V){return C(u0(V),X)}}var A2=($,Q)=>m0($,Q.realm,Q,(Z)=>G9(Q.realm.lume,()=>y2($,Q,Z))),N2=($,Q)=>m0($,Q.realm,Q.scripted&&{entry:Q.scripted.entry,ref:Q.scripted.script.ref},(Z)=>C2($,Q,Z));function C2($,Q,Z){let J=Q.fx,z=n9(Q.lighting),q=l9(),X=function(B){let F=f(B),D=!B.transparent||B.blending==="none";return m(B,{...D?J.coverage:J.blended,lighting:z,fragmentScope:F,vertexScope:F})},V=null,U=null,K=null;if(Q.scripted!==null){let{entry:B,script:F,still:D}=Q.scripted,n=i9(F.ref,B);if(V=q.run(()=>P9(n,$,B,F,{still:D,fx:()=>G$(J.paramNames,J.words.textured)})),n.parserHeldRefs.has(F.ref))return C("the sink's script waits for a door of the builder's realm",Z);if((q.words&M9)!==0)return C(a$,Z);if(U=V===null?"none":"built",V!==null)S9(V,P$(J.words)),K=e$(z,{ref:F.ref,hash:B.hash},V)}let j=null,H=q.run(()=>d9(()=>G9(Q.realm.lume,function(){if(V!==null)try{return{shade:V,assembled:X(V)}}catch(F){return j=F,null}let B=k6(J.words,G$(J.paramNames,J.words.textured),J.worldLit);return{shade:B,assembled:X(B)}}))),M=H.value;if(M===null)return t$(j,Z);return{kind:"fx",image:u$(M.shade,[[I6,M.assembled]],H.taints),script:U,ownLighting:K,realmPrint:$7(Q,q.words),words:q.words,reports:Z}}function D2($,Q,Z,J){let z=i9(Q.script.ref,Q.entry),q=l9(),X=q.run(()=>P9(z,$,Q.entry,Q.script,{scatter:H6,still:Q.still,liveGates:Q.liveGates}));if(z.parserHeldRefs.has(Q.script.ref))return C("the layer's script waits for a door of the builder's realm",J);if((q.words&M9)!==0)return C(a$,J);if(X===null)return{kind:"none",reports:J};let V=X.transparent;return B6(X,Q.overrides),d0(Q,X,Z,(U)=>j6(U.bed),q,J,[V])}function d0($,Q,Z,J,z,q,X){let V=n9($.lighting),U=f(Q),K=[],j=null,H=z.run(()=>d9(()=>G9($.realm.lume,function(){for(let M of Z)try{K.push([M.key,m(Q,{...J(M),lighting:V,fragmentScope:U,vertexScope:U})])}catch(B){j??=B}})));if(K.length===0)return t$(j,q);return{kind:"arms",image:u$(Q,K,H.taints,X),ownLighting:e$(V,{ref:$.script.ref,hash:$.entry.hash},Q),realmPrint:$7($,z.words),words:z.words,reports:q}}function e$($,Q,Z){let J=F9(Z);return J===null?null:h0(g0($,Q,J))}function $7($,Q){return Q===b9?$.realmPrint:z8($.realm,Q)}function y2($,Q,Z){let J={quality:!1,words:0};if(Q.program==="sky"){let q=$.compiler.compileSkyScriptFromEntry(Q.entry,Q.ref,$,Q.tier,J);return{kind:"program",image:q===null?null:K0(q),read:J,realmPrint:Q.realmPrint,reports:Z}}let z=$.compiler.compileLightingScriptFromEntry(Q.entry,Q.ref,$,Q.tier,J);return{kind:"program",image:z===null?null:X0(z),read:J,realmPrint:Q.realmPrint,reports:Z}}function x2($){if($.surface===void 0)return;let{texture:Q,...Z}=$.surface;return Q?{...Z,textureHandle:null}:Z}function I2($,Q,Z){if(Q.ground!==void 0)return{reply:k2($,Q,Q.ground.arms,Z),twin:null};if(Q.decoration!==void 0)return{reply:D2($,Q,Q.decoration.arms,Z),twin:null};let J=Q.base;if(J===null)return{reply:C("the ask names no assembly base and no bed",Z),twin:null};let z=i9(Q.script.ref,Q.entry),q=n9(Q.lighting),X=x2(Q),V=l9(),U=V.run(()=>T$({library:z,entry:Q.entry,script:Q.script,overrides:Q.overrides,surface:X,placeId:Q.placeId,still:Q.still,liveGates:Q.liveGates},(Z9,i0,o0,s0)=>P9(Z9,$,i0,o0,s0)));if(U===null)return{reply:C0(Q.entry.hash)?{kind:"none",reports:Z,faulted:!0}:{kind:"none",reports:Z},twin:null};if((V.words&M9)!==0)return{reply:C(a$,Z),twin:null};let K;try{K=V.run(()=>d9(()=>G9(Q.realm.lume,()=>K8(U.shade,{overrides:Q.overrides,surface:X,base:J,lighting:q,limits:Q.limits,motionToo:Q.motionToo,marksToo:!0,quietOnce:Q.realm.dials.quietOnce}))))}catch(Z9){return{reply:t$(Z9,Z),twin:null}}let j=K.value,H=V.words;if((H&M9)!==0)return{reply:C("the grant folds the material's pictures by their colour words, which the renderer holds",Z),twin:null};let M=e$(q,{ref:Q.script.ref,hash:Q.entry.hash},j.shade),B=$7(Q,H);if(Q.twins===void 0)return{reply:{kind:"built",image:s8(j,U.surfaceUnread,K.taints),ownLighting:M,realmPrint:B,words:H,reports:Z},twin:null};let F=y0(j.shade),D=j.assembled.uniformLayout.slots,{image:n,marks:l}=r8(j,U.surfaceUnread,K.taints,F===null?D:[F,...D]),n0=j9(j.shade).textures.map(([Z9])=>Z9),l0={params:F,paramsRef:F===null?null:l[0],layoutRefs:F===null?l:l.slice(1),textures:n0};return{reply:{kind:"built",image:n,ownLighting:M,realmPrint:B,words:H,reports:Z},twin:l0}}function k2($,Q,Z,J){let z=i9(Q.script.ref,Q.entry),q=l9(),X=q.run(()=>T$({library:z,entry:Q.entry,script:Q.script,overrides:void 0,surface:void 0,placeId:Q.placeId,still:Q.still,groundSurface:C7,liveGates:Q.liveGates},(U,K,j,H)=>P9(U,$,K,j,H)));if(X===null)return{kind:"none",reports:J};let V=X.shade;if(D7(V))return C("the ground's look reads ctx.terrain.ground, whose arms are its pools' words");return N7(V),d0(Q,V,Z,(U)=>U.base,q,J)};

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
function ga(){return(N8("a pending record without its index"))}
function ha(){return(N8("a pending record without its object"))}
function ia(){return{v:2,strs:this.strs,types:this.types,models:this.models,nums:this.nums.done(),nodes:this.nodes.done(),ins:this.ins.done(),slots:this.slots.done(),slotVals:this.slotVals.done(),vars:this.vars.done(),objs:this.objs.done(),ents:this.ents.done(),bins:this.bins,fns:this.fns.done(),comps:this.comps.done(),texs:this.texs,stors:this.stors,blks:this.blks,mods:this.mods,roots:this.roots.done()}
}
function ja(Q,Z){throw new x(`a function at ${H8(Q,Z)}`);
}
function ka(Q,Z){throw new x(`a symbol at ${H8(Q,Z)}`);
}
function la($){let Z=this.slots.n/f$,J=$.componentValues;this.slots.push(this.type($.type)),this.slots.push($.name===null?0:this.str($.name)+1),this.slots.push($.rows),this.slots.push(this.slotVals.n),this.slots.push(J.length);
aa[0]=Z,aa[1]=J}
function ma($){return this.later(_Q,G8,this.stors.push({t:$.elementType,a:$.access,c:$.count,seed:$.seed,h:g,at:$.atomic,...$.engine===void 0?{}:{e:$.engine},n:$.name,...$.shared===void 0?{}:{s:$.shared},...$.workgroup===!0?{wg:!0}:{},...$.copies===!0?{cp:!0}:{}})-1,$);
}
function na($){return N(cQ,this.mods.push($.fragmentOnly===void 0?{s:this.str($.source)}:{s:this.str($.source),fo:$.fragmentOnly})-1);
}
function oa($){let Z=this.fns.n/S$;for(let J=0;J<S$;J+=1)this.fns.push(g);return this.later(uQ,P8,Z,$)
}
function pa($){let Z=this.comps.n/g9;return this.comps.push(g),this.comps.push($.count),this.comps.push($.workgroupSize),this.later(mQ,W8,Z,$)
}
function qa(Z,Q){if(f9(Z))this.texs[Q].h=this.ref(Z.handle,"texture handle");
}
function ta(Z,Q){{if(!b$(Z))return;let J=this.stors[Q];if(J.h=this.ref(Z.handle,"storage handle"),Z.pack!==null)J.p=[this.blockRow(Z.pack.block),Z.pack.offset,Z.pack.index];if(Z.block!==null)J.b=this.blockRow(Z.block);return}
return ra}
function ua(Z,Q){{if(!w$(Z))return;let J=Q*S$,z=this.ref(Z.params,"fn params"),q=this.ref(Z.body,"fn body"),X=this.ref(Z.returns,"fn returns");this.fns.words[J]=z,this.fns.words[J+1]=q,this.fns.words[J+2]=X;return}
return ra}
function va(Z,Q){if(Z instanceof O$){let J=this.ref(Z.scope,"compute scope");this.comps.words[Q*g9]=J}
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
function Da(q,$,Z,U,V){q.push("I",$.ins.join(",")),q.push("U");for(let K=0;K<$.slots.length;K+=f$)q.push(Z(U[$.slots[K]]),V($.slots[K+1]),String($.slots[K+2]),String($.slots[K+4]));q.push("V");
}
function Ea(q,$,X,J,Z,z){q.push("T");for(let K of $.texs)q.push(X(K.h),JSON.stringify({...K,h:0}));q.push("B");for(let K of $.stors)q.push(X(K.h),JSON.stringify({...K,h:0,seed:K.seed===null?null:J(K.seed)}));q.push("K");for(let K of $.blks)q.push(K.k,K.m<0?"-":Z(z[K.m]),String(K.w),X(K.bd),K.ms.map(X).join(","));q.push("W");for(let K of $.mods)q.push(Z(z[K.s]),K.fo===void 0?"-":Z(K.fo));q.push("F");for(let K=0;K<$.fns.length;K+=1)q.push(X($.fns[K]));q.push("C");for(let K=0;K<$.comps.length;K+=g9)q.push(X($.comps[K]),String($.comps[K+1]),String($.comps[K+2]));q.push("O");
}
function Fa(q,$,X){q.push("R");for(let K=0;K<$.roots.length;K+=1)q.push(X($.roots[K]));return q.join("\x01")
}
function Ga(Q){return T(Q)&&!Object.is(Q,-0)?Q:{$n:Object.is(Q,-0)?"-0":String(Q)};
}
function Ha(){return(typeof crypto.randomUUID==="function")}
function ra(){}var sa;function aa(){}

;function $lpd0(o,k,v){Object.defineProperty(o,k,{value:v,writable:!0,enumerable:!0,configurable:!0})}import"./26ceb10f-156258ddd53795f5.mjs";import"./60d2a80e-3b2a74e2c618d12a.mjs";import"./f11f54a2bd263bff.mjs";import"./db293faeb5424f3a.mjs";import"./f81c9654-1abf69790c44cc71.mjs";import"./4765ec0c-9a9e938d93b51874.mjs";import"./59031fb6a4af82a1.mjs";import"./6693f96d-39d85c02b2906ffa.mjs";import"./cfe2ed5d1ccaf3c8.mjs";import"./5bfc27ec75dfbbea.mjs";import"./066edad7-f7400e45e1d275b5.mjs";import"./9b93e26679f0ec35.mjs";import"./13edbdb4-856331cc94157d5f.mjs";import{$5B as Z8,A1L as g6,Aow as I9,Cs7 as v0,Cw7 as D0,D22 as i8,DBZ as M7,DPz as r7,Dq1 as U6,EJQ as r6,EVH as T7,Ea5 as n9,Ebw as R7,FQh as h6,Gjb as x0,HFv as h0,Hmv as m,IMw as a6,IYr as l8,KCq as J0,KmW as B7,MEB as j9,N08 as F9,Nr6 as o9,PK8 as V6,PeZ as A0,QJb as $8,R9u as O0,RUM as K$,T9a as i$,VgU as J8,Vr8 as f0,Z4F as I0,a7W as Y6,bZs as o$,bl4 as h7,c7w as f,cDU as d9,cfP as b0,cii as o6,d7R as P9,dTe as k0,em3 as g0,fSQ as A$,hro as y0,j$c as C0,jfM as s6,luT as Q8,mJB as M6,mkv as R0,nIf as N9,nnU as L0,oJ8 as T0,pOR as t6,rF3 as W0,sbj as f6,tOJ as k9,tfD as N0,uBa as b6,vIf as o8,vbn as F6,vkm as R$,vow as e6,wTD as w0,yAY as j7,yEi as S0,yJT as H7,y_0 as q$,zr7 as s$}from"./6f3832a6-16f818a35b86f3d3.mjs";import{DSQ as d8,NaR as V9,Pf4 as y$,R97 as T8,RYv as a,SNI as x9,VV1 as m6,_zz as Z0,and as B0,qth as m8,tn4 as n8,xN3 as R6}from"./d412131d-4739c10f2839415d.mjs";import{foc as v9}from"./67196ef97dba1df8.mjs";import"./431db51f371d337d.mjs";import{PNt as M0}from"./43e9ec0ee260a7c4.mjs";import{$PV as c8,Brh as Y9,BuM as e,Cn3 as G,Cuk as k,DcR as O9,GS5 as x6,IVI as v$,Iwu as A,Kd$ as n6,KlB as y6,L$T as x8,LY8 as d6,Ln4 as I$,MNf as u,N96 as O,Ose as I8,Pm8 as k8,Rvr as D6,UbZ as f9,XSv as L,Zvs as C6,dQ3 as j0,etR as l$,fHq as u6,gwl as u8,kEV as N6,nbl as c6,ncX as y9,nwK as M$,oZN as b$,oaY as H0,rFh as k$,sU6 as w$,sfu as D$,tej as O$,to8 as R8}from"./75f9d7a9-007e085d86a246da.mjs";import"./72febfebe1981a8e.mjs";import{JPf as F$,JQV as w6,MTL as M9,NKp as q5,Ozc as v6,S1x as G9,TD3 as G0,Tfx as C,VCM as Q7,Zpc as V$,_0n as V0,_Td as Y,e3w as T,e5m as d7,i_3 as P0,k$w as t,kCV as F0,nYo as i6,scD as x$,srL as l6,tDa as U0,zEL as U9,zuW as b9}from"./5484a777-fd0f9ebe9e6458c5.mjs";import"./bb88cdd4b0f7fceb.mjs";import"./c7e7e2bfe45137b2.mjs";import"./ff1dcf034e62820a.mjs";import"./7963a4de78405a38.mjs";import"./18d16e05ecc6f3aa.mjs";import"./3cad786478980b2a.mjs";import"./9d27713d1810e54b.mjs";import"./3041b4833540ee3e.mjs";import{SOb as m$}from"./39c62b1c8c58eeae.mjs";import"./4ede4b89009bc4d4.mjs";import{wMe as e9}from"./6693f96d-39d85c02b2906ffa.mjs";import{FaJ as O6,Icq as _$,Lcw as S6}from"./13edbdb4-856331cc94157d5f.mjs";export{F3 as serveMaterialBuild,U3 as askDoorsStand};
