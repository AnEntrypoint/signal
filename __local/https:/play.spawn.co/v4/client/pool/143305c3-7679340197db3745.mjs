;;;;;;;;;;;;;;;;;;;;;;;
;;;;;var N=1.9,R=1100;var O=1,M2=2;var U={low:{skyViewWidth:96,skyViewHeight:54,environmentSize:16,environmentUpdateDegrees:3,prefilterSamples:32,cloudInterior:O,cloudSlabSteps:0,milkyWayPoints:1e5},medium:{skyViewWidth:96,skyViewHeight:54,environmentSize:32,environmentUpdateDegrees:2,prefilterSamples:64,cloudInterior:O,cloudSlabSteps:0,milkyWayPoints:180000},high:{skyViewWidth:192,skyViewHeight:108,environmentSize:64,environmentUpdateDegrees:1,prefilterSamples:128,cloudInterior:O,cloudSlabSteps:0,milkyWayPoints:300000},ultra:{skyViewWidth:256,skyViewHeight:144,environmentSize:64,environmentUpdateDegrees:0.5,prefilterSamples:128,cloudInterior:M2,cloudSlabSteps:12,milkyWayPoints:300000}};var L3=R*N;var u=1024,H2=($)=>$==="near"?u:2048;var g3=H2(null);var m2=0.5,R3=u*m2;var T=Object.freeze({cascades:3,mapSize:2048,maxFar:250}),y=Object.freeze({low:{cascades:1,mapSize:1024,maxFar:60},medium:{cascades:2,mapSize:1024,maxFar:100},high:T,ultra:T});var H={maxLights:1024,gridX:24,gridY:16,gridZ:24,clusterNear:0.1,clusterFar:600,cullIntensityEpsilon:0.005},i3={low:{tier:"low",shadowMaps:!0,clustered:{...H,maxLights:64,gridX:16,gridY:9,gridZ:32,clusterFar:300},sun:y.low,sky:U.low,localShadows:{atlasSize:0,maxShadowedLights:0,rendersPerFrame:0,maxSlotSize:0,shadowMaxDistance:0}},medium:{tier:"medium",shadowMaps:!0,clustered:{...H,maxLights:1024,gridX:16,gridY:9,gridZ:24,clusterFar:400},sun:y.medium,sky:U.medium,localShadows:{atlasSize:2048,maxShadowedLights:8,rendersPerFrame:2,maxSlotSize:512,shadowMaxDistance:40}},high:{tier:"high",shadowMaps:!0,clustered:{...H,maxLights:1024,gridX:24,gridY:16,gridZ:24},sun:y.high,sky:U.high,localShadows:{atlasSize:4096,maxShadowedLights:24,rendersPerFrame:4,maxSlotSize:1024,shadowMaxDistance:80}},ultra:{tier:"ultra",shadowMaps:!0,clustered:{...H,maxLights:2048,gridX:32,gridY:18,gridZ:32},sun:y.ultra,sky:U.ultra,localShadows:{atlasSize:4096,maxShadowedLights:48,rendersPerFrame:8,maxSlotSize:1024,shadowMaxDistance:120}}};var d=null;var D2=new WeakMap;var N2={ultra:"refracted",high:"worley2",medium:"worley1",low:"worley1-unshadowed"};var n=1.75,E=`
fn water_causticWavefront(p: vec2<f32>, t: f32) -> vec4<f32> {
  let phaseW = vec2<f32>(dot(p, vec2<f32>(0.61, 0.37)) + t * 0.19, dot(p, vec2<f32>(-0.43, 0.72)) - t * 0.23);
  let q = (p + sin(phaseW) * 0.6) * 4.6;
  let w = cos(phaseW) * 0.6;
  let qDx = vec2<f32>(1.0 + w.x * 0.61, -w.y * 0.43) * 4.6;
  let qDy = vec2<f32>(w.x * 0.37, 1.0 + w.y * 0.72) * 4.6;
  let phaseA = vec3<f32>(dot(q, vec2<f32>(2.13, 0.61)), dot(q, vec2<f32>(-0.81, 2.41)), dot(q, vec2<f32>(1.74, -1.51))) + t * vec3<f32>(-0.62, 0.77, -0.93) + vec3<f32>(0.0, 1.3, 2.7);
  let phaseB = vec3<f32>(dot(q, vec2<f32>(-1.81, 2.71)), dot(q, vec2<f32>(2.63, 1.22)), dot(q, vec2<f32>(0.43, 3.17))) + t * vec3<f32>(0.73, -0.81, 0.64) + vec3<f32>(2.1, 0.5, 1.8);
  let value = sin(phaseA) + sin(phaseB) * 0.6;
  let a = cos(phaseA);
  let b = cos(phaseB) * 0.6;
  let gradientX = a * vec3<f32>(2.13, -0.81, 1.74) + b * vec3<f32>(-1.81, 2.63, 0.43);
  let gradientY = a * vec3<f32>(0.61, 2.41, -1.51) + b * vec3<f32>(2.71, 1.22, 3.17);
  let g0 = vec2<f32>(gradientX.x, gradientY.x);
  let g1 = vec2<f32>(gradientX.y, gradientY.y);
  let g2 = vec2<f32>(gradientX.z, gradientY.z);
  var high = value.x; var middle = value.y; var low = value.z;
  var highG = g0; var middleG = g1; var lowG = g2;
  var highI = 0; var middleI = 1; var lowI = 2;
  if (high < middle) { let temp = high; high = middle; middle = temp; let tg = highG; highG = middleG; middleG = tg; let ti = highI; highI = middleI; middleI = ti; }
  if (middle < low) { let temp = middle; middle = low; low = temp; let tg = middleG; middleG = lowG; lowG = tg; let ti = middleI; middleI = lowI; lowI = ti; }
  if (high < middle) { let temp = high; high = middle; middle = temp; let tg = highG; highG = middleG; middleG = tg; let ti = highI; highI = middleI; middleI = ti; }
  let gradientQ = highG - middleG;
  let gradientP = vec2<f32>(dot(gradientQ, qDx), dot(gradientQ, qDy));
  let third = (high - low) / max(length(highG - lowG) * 4.6, 1.0);
  let focus = 1.0 - smoothstep(0.008, 0.07, third);
  let beat = 0.5 + 0.5 * sin(phaseA.x + phaseB.y * 0.7 + phaseA.z * 0.3);
  let power = 0.25 + 0.85 * beat * beat + 1.6 * focus;
  let side = select(-1.0, 1.0, highI < middleI);
  return vec4<f32>((high - middle) * side, power, gradientP * side);
}
fn water_causticWavefrontLight(field: vec4<f32>, footprint: f32) -> f32 {
  let slope = max(length(field.zw), 1.0);
  let distance = field.x / slope;
  let width = 0.011 + 0.010 / (0.5 + field.y);
  let aa = max(footprint / slope, 0.002);
  let variance = width * width + aa * aa * 0.3333333;
  let core = exp2(-2.0 * distance * distance / variance) * width * inverseSqrt(variance);
  let shoulder = exp2(-max(distance, 0.0) / max(width * 2.2 + aa, 0.001)) * smoothstep(-aa, aa, distance) * 0.1 * width * inverseSqrt(variance);
  return clamp((core + shoulder) * field.y, 0.0, 1.0);
}
fn water_caustics(p: vec2<f32>, t: f32) -> f32 {
  let field = water_causticWavefront(p, t);
  return water_causticWavefrontLight(field, fwidth(field.x) * 0.65);
}
fn water_caustics1(p: vec2<f32>, t: f32) -> f32 { return water_caustics(p, t); }
fn water_causticsPrepared(p: vec2<f32>, t: f32, pDx: vec2<f32>, pDy: vec2<f32>) -> f32 {
  let field = water_causticWavefront(p, t);
  let footprint = abs(dot(field.zw, pDx)) + abs(dot(field.zw, pDy));
  return water_causticWavefrontLight(field, footprint * 0.65);
}
`;var c=8,h=3,_=($)=>G*Math.round($*C/G)/C,O2=[32,18];var a=0.24,C2=2.2;function P2($){return _(G/$*Math.sqrt(9.81*C2))}var w=[0.22,0.34,0.52,0.8,1.15],c2=[0.58,0.42,0.3,0.16,0.1],v0=[0.72,0.92,1.18,1.52,1.95].map(_);var h2=0.32,o=[31,47,73,113],P=0.3;var t=[[1,-0.8,0.9,0.7],[-0.8,1,0.7,-0.9],[0.7,0.9,-1,0.8],[0.9,0.7,0.8,-1],[-0.9,-1,0.7,1]],G0=o.map(function($,Q){let j=0.3+Q*m*(3-Math.sqrt(5)),f=G/$;return[Math.cos(j)*f,Math.sin(j)*f]}),b0=t.map(($)=>$.map((Q,j)=>Q*P*o[j]/G)),X0=t.map(($)=>1/Math.sqrt(1+P*P*$.reduce((Q,j)=>Q+j*j,0)/2)),V0=h2*c2.reduce(($,Q)=>$+Q,0);var y0=Math.cos(a),k0=Math.sin(a),M0=O2.map(P2);var m0=new Float64Array(w.length),F0=new Float64Array(w.length),D0=new Float64Array(w.length);var $2=9.81,F=[[0,1.55,0.085],[1.9,1.1,0.08],[-1.15,0.78,0.075],[2.7,0.56,0.07],[0.65,0.41,0.06],[-2.3,0.3,0.05]],J2=4,w2=[[-0.45,0.47,0.065]],W=[...F.slice(0,J2),...w2];var W2=(function($){let Q=(j)=>W[j][2]*2*m/W[j][1];return Q(0)/Q($)});var k=0.6;var p=0.5,p2=0.3,I2=0.7,L2=0.12,g2=k*p,R2=0.7,u2=[2.7,3.3,3.9,4.7,2.3,5.3],T2=0.2,i=7,d2=0.03;function I($){let Q=Z(Math.sin($)),j=Z(Math.cos($));return`vec2<f32>(flow.x * ${j} - flow.y * ${Q}, flow.x * ${Q} + flow.y * ${j})`}function s($,Q=1,j="t",f=0,B=3.1,x=!1){let[Y,q,z]=$,v=G/q,b=Math.sqrt($2*v),V=z*Q/v,X=Y+1.22,D=G/B,v2=f>0?` + ${Z(f)} * sin(dot(p, ${I(X)}) * ${Z(D)} * tile)`:"",G2=x?`
    let w = 1.0 - smoothstep(${Z(q/c)}, ${Z(q/h)}, footprintTile);
    kept += w * w * ${Z(z*z)};`:"",b2=x?" * w":"";return`  {
    let d = ${I(Y)};
    let k = ${Z(v)} * tile;
    let phase = dot(p, d) * k - ${j} * (${Z(b)} * sqrt(tile) + dot(flow, d) * flowSpeed * k)${v2};${G2}
    slope += d * (${Z(V)} / tile * k * cos(phase) * gust${b2});
  }`}function e($,Q,j){let f=function(B,x,Y){let q=G/B,z=Math.sqrt($2*q)*j;return`sin(dot(xz, ${I(x)}) * ${Z(q)} * tile - ${Q} * ${Z(z)} * sqrt(tile) + ${Z(Y)})`};return`  let p = xz + (${Z($)} / tile) * vec2<f32>(${f(4.3,0.6,0)}, ${f(3.6,-1.7,1.3)});`}var A2=F.reduce((($,[,,Q])=>$+Q*Q),0);function r2(){return`
//${F.length}

fn water_rippleSlopeLod(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, footprint: f32) -> vec3<f32> {
${e(L2,"t",g2)}
  let footprintTile = footprint * tile;
  var slope = vec2<f32>(0.0, 0.0);
  var kept = 0.0;
${F.map((($,Q)=>s($,1,"t",R2,u2[Q],!0))).join(`
`)}
  return vec3<f32>(slope, kept * ${Z(1/A2)});
}
fn water_rippleSlope(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  return water_rippleSlopeLod(xz, t, tile, flow, flowSpeed, gust, 0.0).xy;
}
//${J2}
//${k}
//${p}
fn water_rippleSlopeCoarse(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  let tc = t * ${Z(k)};
${e(p2,"tc",p)}
  var slope = vec2<f32>(0.0, 0.0);
${W.map((($,Q)=>s($,W2(Q),"tc",I2))).join(`
`)}
  return slope;
}
fn water_rippleNormal(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, strength: f32) -> vec3<f32> {
  let s = water_rippleSlope(xz, t, tile, flow, flowSpeed, gust) * strength;
  return normalize(vec3<f32>(-s.x, 1.0, -s.y));
}
fn water_transmittance(deepTint: vec3<f32>, tintDistance: f32, depth: f32) -> vec3<f32> {
  let sigma = -log2(clamp(deepTint, vec3<f32>(0.0001), vec3<f32>(0.98))) / max(tintDistance, 0.05);
  return exp2(-sigma * max(depth, 0.0));
}
${E}
fn water_causticSurfacePoint(floor: vec3<f32>, surfaceY: f32, sunDir: vec3<f32>) -> vec2<f32> {
  let depth = max(surfaceY - floor.y, 0.0);
  let toSun = normalize(sunDir);
  let refractedXZ = toSun.xz * (1.0 / 1.333);
  let refractedY = sqrt(max(1.0 - dot(refractedXZ, refractedXZ), 0.01));
  return floor.xz + refractedXZ * (depth / refractedY);
}
fn water_refractedRun(sunDir: vec3<f32>, s: vec2<f32>, eta: f32) -> vec2<f32> {
  let n = normalize(vec3<f32>(-s.x, 1.0, -s.y));
  let incident = -sunDir;
  let r = refract(incident, n, eta);
  return r.xz / max(-r.y, 0.05);
}
fn water_causticFootprint(run0: vec2<f32>, runX: vec2<f32>, runZ: vec2<f32>, eps: f32, depthRgb: vec3<f32>) -> vec3<f32> {
  let gx = (runX - run0) / eps;
  let gz = (runZ - run0) / eps;
  return (1.0 + depthRgb * gx.x) * (1.0 + depthRgb * gz.y) - depthRgb * depthRgb * (gz.x * gx.y);
}
fn water_causticRefractionDet(floor: vec3<f32>, surfaceY: f32, sunDir: vec3<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, steepness: f32, baseSlope: vec2<f32>, dispersion: f32) -> vec3<f32> {
  let depth = max(surfaceY - floor.y, 0.0);
  let focusDepth = depth / (1.0 + depth / 1.2);
  let s0 = water_causticSurfacePoint(floor, surfaceY, sunDir);
  let eps = ${Z(T2)} / max(tile, 0.05);
  let eta = 1.0 / 1.333;
  let slope0 = water_rippleSlopeCoarse(s0, t, tile, flow, flowSpeed, gust) * steepness + baseSlope;
  let slopeX = water_rippleSlopeCoarse(s0 + vec2<f32>(eps, 0.0), t, tile, flow, flowSpeed, gust) * steepness + baseSlope;
  let slopeZ = water_rippleSlopeCoarse(s0 + vec2<f32>(0.0, eps), t, tile, flow, flowSpeed, gust) * steepness + baseSlope;
  let run0 = water_refractedRun(sunDir, slope0, eta);
  let runX = water_refractedRun(sunDir, slopeX, eta);
  let runZ = water_refractedRun(sunDir, slopeZ, eta);
  let depthRgb = focusDepth * vec3<f32>(1.0 - dispersion, 1.0, 1.0 + dispersion);
  let det = water_causticFootprint(run0, runX, runZ, eps, depthRgb);
  return det;
}
fn water_causticGain(det: vec3<f32>, softness: f32) -> vec3<f32> {
  let raw = (1.0 + softness) / (abs(det) + vec3<f32>(softness));
  let k = ${Z(1/(i-1))};
  let gain = raw * (1.0 + k) / (1.0 + raw * k);
  let finite = (gain == gain) & (abs(gain) <= vec3<f32>(3.0e38));
  return select(vec3<f32>(1.0), clamp(gain, vec3<f32>(0.0), vec3<f32>(${Z(i)})), finite);
}

fn water_causticsRefracted(floor: vec3<f32>, surfaceY: f32, sunDir: vec3<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, steepness: f32, baseSlope: vec2<f32>, dispersion: f32) -> vec3<f32> {
  let depth = max(surfaceY - floor.y, 0.0);
  let det = water_causticRefractionDet(floor, surfaceY, sunDir, t, tile, flow, flowSpeed, gust, steepness, baseSlope, dispersion);
  let softness = ${Z(d2)} + 0.05 * depth + fwidth(det.y) * 1.5;
  return water_causticGain(det, softness);
}
fn water_fresnel(nDotV: f32, f0: f32) -> f32 {
  let m = clamp(1.0 - nDotV, 0.0, 1.0);
  let m2 = m * m;
  return f0 + (1.0 - f0) * m2 * m2 * m;
}
`}var Q2=r2();var B2=`
fn water_foamTextureUv(xz: vec2<f32>, time: f32, velocity: vec2<f32>, scale: f32) -> vec2<f32> {
  return (xz - velocity * time) * max(scale, 0.05);
}
fn water_foamTextureCoverage(amount: f32, sample: f32, softness: f32) -> f32 {
  let a = clamp(amount, 0.0, 1.0);
  let film = clamp(sample, 0.0, 1.0);
  let core = smoothstep(clamp(0.72 - softness, 0.4, 0.95), 1.0, a);
  return a * mix(film, 1.0, core);
}
fn water_foamTextureLod(scale: f32, footprint: f32, dimensions: vec2<u32>) -> f32 {
  let texels = f32(max(dimensions.x, dimensions.y));
  return log2(max(max(footprint, 0.0) * max(scale, 0.05) * texels, 1.0));
}
`;var j2=`
fn water_medium(scene: vec3<f32>, transmission: vec3<f32>, scatter: vec3<f32>) -> vec3<f32> {
  let T = clamp(transmission, vec3<f32>(0.0), vec3<f32>(1.0));
  return scene * T + scatter * (vec3<f32>(1.0) - T);
}
fn water_underwaterDistortion(uv: vec2<f32>, t: f32, distance: f32, visibility: f32, strength: f32) -> vec2<f32> {
  let immersed = 1.0 - exp2(-max(distance, 0.0) / max(visibility, 0.05));
  let phase = uv * vec2<f32>(19.0, 23.0);
  return vec2<f32>(sin(phase.y + t * 0.73) + 0.4 * sin(phase.x * 0.7 - t * 0.43), cos(phase.x + t * 0.61) + 0.4 * sin(phase.y * 0.8 + t * 0.37)) * (strength * immersed);
}
fn water_rayBoxDistance(origin: vec3<f32>, direction: vec3<f32>, lower: vec3<f32>, upper: vec3<f32>, sceneDistance: f32) -> f32 {
  let parallel = abs(direction) <= vec3<f32>(1e-8);
  if (any(parallel & ((origin < lower) | (origin > upper)))) { return 0.0; }
  let d = select(direction, vec3<f32>(1.0), parallel);
  let a = (lower - origin) / d;
  let b = (upper - origin) / d;
  let entry = select(min(a, b), vec3<f32>(-1e30), parallel);
  let exit = select(max(a, b), vec3<f32>(1e30), parallel);
  let near = max(0.0, max(entry.x, max(entry.y, entry.z)));
  let far = min(max(sceneDistance, 0.0), min(exit.x, min(exit.y, exit.z)));
  return max(0.0, far - near);
}
`;var L=M(j2);function J($,Q,j,f){if($ instanceof Y2)return q2($,Q);if(typeof $==="number"&&Q==="f32")return x2($,"f32");throw TypeError(`${j}(): \`${f}\` takes a ${Q} node${Q==="f32"?" or a number":""}. Got ${typeof $}.`)}function Z2(){return{waterMedium:($,Q,j)=>K(L,"water_medium",[J($,"vec3f","waterMedium","scene"),J(Q,"vec3f","waterMedium","transmission"),J(j,"vec3f","waterMedium","scatter")],"vec3f"),waterUnderwaterDistortion:($,Q,j,f,B)=>K(L,"water_underwaterDistortion",[J($,"vec2f","waterUnderwaterDistortion","uv"),J(Q,"f32","waterUnderwaterDistortion","time"),J(j,"f32","waterUnderwaterDistortion","distance"),J(f,"f32","waterUnderwaterDistortion","visibility"),J(B,"f32","waterUnderwaterDistortion","strength")],"vec2f"),waterRayBoxDistance:($,Q,j,f,B)=>K(L,"water_rayBoxDistance",[J($,"vec3f","waterRayBoxDistance","origin"),J(Q,"vec3f","waterRayBoxDistance","direction"),J(j,"vec3f","waterRayBoxDistance","lower"),J(f,"vec3f","waterRayBoxDistance","upper"),J(B,"f32","waterRayBoxDistance","sceneDistance")],"f32")}}function l2(){try{let v$1;{if(d===null){{throw Error("lighting quality read before the session set its tier (setActiveLightingQuality): the class resolves at renderer init, never a module default");
}}v$1=d;}return (N2[(v$1.tier)])}catch{return"worley2"}}function g($,Q){let[j,f,B,x,Y,q,z,v,b,V,X]=Q;return[J(j,"vec3f",$,"floor"),J(f,"f32",$,"surfaceY"),J(B,"vec3f",$,"sunDir"),J(x,"f32",$,"t"),J(Y,"f32",$,"tile"),J(q,"vec2f",$,"flow"),J(z,"f32",$,"flowSpeed"),J(v,"f32",$,"gust"),J(b,"f32",$,"steepness"),J(V,"vec2f",$,"baseSlope"),J(X,"f32",$,"dispersion")]}function S2(){let $=M(Q2);let Q=M(B2);let j=function(B,x,Y,q,z,v){let b=J(z,"f32",B,"scale");let V=K(Q,"water_foamTextureUv",[J(x,"vec2f",B,"xz"),J(Y,"f32",B,"time"),J(q,"vec2f",B,"flowVelocity"),b],"vec2f");let X;{let $=z2;let Q=r(null,{flipY:!1,wrap:"repeat"});X=(Q._measured=!0,D2.set(Q,$),Q);}if(v===void 0)return X.sample(V).swizzle("x");let D=K(Q,"water_foamTextureLod",[b,J(v,"f32",B,"footprint"),X.size()],"f32");return X.sampleLevel(V,D).swizzle("x")};let f=(B,x,Y,q)=>K(Q,"water_foamTextureCoverage",[J(x,"f32",B,"amount"),J(Y,"f32",B,"field"),J(q,"f32",B,"softness")],"f32");return{...Z2(),waterFoam:(B,x,Y,q,z=1,v=0.08)=>f("waterFoam",q,j("waterFoam",B,x,Y,z),v),waterFoamField:(B,x,Y,q=1)=>j("waterFoamField",B,x,Y,q),waterFoamFieldLod:(B,x,Y,q,z)=>j("waterFoamFieldLod",B,x,Y,q,z),waterFoamCoverage:(B,x,Y=0.08)=>f("waterFoamCoverage",B,x,Y),waterRippleSlope:(B,x,Y,q,z,v)=>K($,"water_rippleSlope",[J(B,"vec2f","waterRippleSlope","xz"),J(x,"f32","waterRippleSlope","t"),J(Y,"f32","waterRippleSlope","tile"),J(q,"vec2f","waterRippleSlope","flow"),J(z,"f32","waterRippleSlope","flowSpeed"),J(v,"f32","waterRippleSlope","gust")],"vec2f"),waterTransmittance:(B,x,Y)=>K($,"water_transmittance",[J(B,"vec3f","waterTransmittance","deepTint"),J(x,"f32","waterTransmittance","tintDistance"),J(Y,"f32","waterTransmittance","depth")],"vec3f"),waterCaustics:(B,x)=>K($,"water_caustics",[J(B,"vec2f","waterCaustics","p"),J(x,"f32","waterCaustics","t")],"f32"),waterCausticsAt:function(...B){let x=l2();if(x==="refracted")return K($,"water_causticsRefracted",g("waterCausticsAt",B),"vec3f");let Y=g("waterCausticsAt",B),q=K($,"water_causticSurfacePoint",[Y[0],Y[1],Y[2]],"vec2f"),z=Y[3].mul(k),v=q.sub(Y[5].mul(Y[6]).mul(z));return K($,x==="worley2"?"water_caustics":"water_caustics1",[v.mul(Y[4]).mul(1.7),z],"f32").mul(n).add(1).toVec3()},waterCausticsRefracted:(...B)=>K($,"water_causticsRefracted",g("waterCausticsRefracted",B),"vec3f"),waterFresnel:(B,x)=>K($,"water_fresnel",[J(B,"f32","waterFresnel","nDotV"),J(x,"f32","waterFresnel","f0")],"f32")}}var f2=null;function _0($){f2??=S2();return K2("builtin/water",f2,$)}
;



;import"./f40adb82a0184cd2.mjs";import"./60d2a80e-d0be0a5e0e7ba6f2.mjs";import"./26ceb10f-96826d3638767842.mjs";import"./f11f54a2bd263bff.mjs";import"./20f93b1007c06457.mjs";import"./f81c9654-0df44d858734c87d.mjs";import"./694b4455cf715332.mjs";import"./46b1c77c67f7de91.mjs";import"./4765ec0c-dcdcc72a40accabf.mjs";import"./7bd312a93b206269.mjs";import"./f0b74ac624602668.mjs";import"./91980117e2af0872.mjs";import"./e64e88f270dfa002.mjs";import"./53014685cab86940.mjs";import"./59f8a5d8-d93c26e95fbdb447.mjs";import"./27f01cb8-8687318165f77a10.mjs";import"./cc84bae45fb0690e.mjs";import"./6c6cfe9d-6700db0d9f7bf7c9.mjs";import"./ecc0184c-4264a1f20927bd4f.mjs";import"./0f10571c8a393ec6.mjs";import"./4710582d60103e43.mjs";import"./414058c0-4353705c031abc6d.mjs";import"./9f8a6830-cf059f9edfafc903.mjs";import{O1h as C}from"./0a49faba3ab7acd1.mjs";import{NDw as Z}from"./5e6ad52ab358f807.mjs";import{MOE as z2}from"./24b178968117d022.mjs";import{$O8 as M,$g6 as K2,aFT as q2,dnj as r,hiU as Y2,rjS as K,tq7 as x2}from"./38bdf344-f1fdba80b5caa613.mjs";import{baH as G,ts0 as m}from"./67ea825d7b2190bd.mjs";export{_0 as ev_};
