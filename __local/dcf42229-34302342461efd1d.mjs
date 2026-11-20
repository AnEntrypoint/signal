;const{NDw:e,O1h:h,baH:a,bgV:B,ts0:y}=$Lr;
var I=120,O=240;var q=8,Y=3,G=(f)=>a*Math.round(f*h/a)/h,C=[32,18],m2=[1,0.42],g=0.24,N=2.2,r2=0.24,s2=0.7,h2=0.35,n2=0.4,q2=1.6;function R(f){return G(a/f*Math.sqrt(9.81*N))}var Y2=16,z2=8,$2=2.55,Q2=0.4,J2=2.5,o2=0.2,B2=0.4,G2=8,z=[0.22,0.34,0.52,0.8,1.15],P=[0.58,0.42,0.3,0.16,0.1],g2=[0.72,0.92,1.18,1.52,1.95].map(G),b2=[0.24,0.2,0.16,0.12,0.08],j2=[0.8408,0.5405],W=0.32,b=[31,47,73,113],n=0.3,u2=[0,1.7,3.9,5.3],j=[[1,-0.8,0.9,0.7],[-0.8,1,0.7,-0.9],[0.7,0.9,-1,0.8],[0.9,0.7,0.8,-1],[-0.9,-1,0.7,1]],w2=b.map(function(f,t){let c=0.3+t*y*(3-Math.sqrt(5)),v=a/f;return[Math.cos(c)*v,Math.sin(c)*v]}),K2=j.map((f)=>f.map((t,c)=>t*n*b[c]/a)),H2=j.map((f)=>1/Math.sqrt(1+n*n*f.reduce((t,c)=>t+c*c,0)/2)),Z2=W*P.reduce((f,t)=>f+t,0);var U2=Math.cos(g),F2=Math.sin(g),k2=C.map(R),V2=()=>({displacement:new Float64Array(3),slope:new Float64Array(2),lean:new Float64Array(4),phase:0,breakSignal:0});function M2(f,t){return B(f,2*f,t)}var p2=new Float64Array(z.length),I2=new Float64Array(z.length),O2=new Float64Array(z.length);var N2=1.75,u=`
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
`;var P2=`
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
`;var Z=9.81,m=[[0,1.55,0.085],[1.9,1.1,0.08],[-1.15,0.78,0.075],[2.7,0.56,0.07],[0.65,0.41,0.06],[-2.3,0.3,0.05]],X=4,L=[[-0.45,0.47,0.065]],$=[...m.slice(0,X),...L];var Q=0.6;var J=0.5,S=0.3,A=0.7,_=0.12,E=Q*J,f2=0.7,t2=[2.7,3.3,3.9,4.7,2.3,5.3],e2=0.2,w=7,c2=0.03;function o(f){let t=e(Math.sin(f)),c=e(Math.cos(f));return`vec2<f32>(flow.x * ${c} - flow.y * ${t}, flow.x * ${t} + flow.y * ${c})`}function K(f,t=1,c="t",v=0,r=3.1,d=!1){let[i,x,l]=f,s=a/x,U=Math.sqrt(Z*s),F=l*t/s,k=i+1.22,V=a/r,D=v>0?` + ${e(v)} * sin(dot(p, ${o(k)}) * ${e(V)} * tile)`:"",M=d?`
    let w = 1.0 - smoothstep(${e(x/q)}, ${e(x/Y)}, footprintTile);
    kept += w * w * ${e(l*l)};`:"",p=d?" * w":"";return`  {
    let d = ${o(i)};
    let k = ${e(s)} * tile;
    let phase = dot(p, d) * k - ${c} * (${e(U)} * sqrt(tile) + dot(flow, d) * flowSpeed * k)${D};${M}
    slope += d * (${e(F)} / tile * k * cos(phase) * gust${p});
  }`}function H(f,t,c){let v=function(r,d,i){let x=a/r,l=Math.sqrt(Z*x)*c;return`sin(dot(xz, ${o(d)}) * ${e(x)} * tile - ${t} * ${e(l)} * sqrt(tile) + ${e(i)})`};return`  let p = xz + (${e(f)} / tile) * vec2<f32>(${v(4.3,0.6,0)}, ${v(3.6,-1.7,1.3)});`}var _2=2,E2=4,a2=m.reduce((f,[,,t])=>f+t*t,0);function v2(){return`
//${m.length}

fn water_rippleSlopeLod(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, footprint: f32) -> vec3<f32> {
${H(_,"t",E)}
  let footprintTile = footprint * tile;
  var slope = vec2<f32>(0.0, 0.0);
  var kept = 0.0;
${m.map((f,t)=>K(f,1,"t",f2,t2[t],!0)).join(`
`)}
  return vec3<f32>(slope, kept * ${e(1/a2)});
}
fn water_rippleSlope(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  return water_rippleSlopeLod(xz, t, tile, flow, flowSpeed, gust, 0.0).xy;
}
//${X}
//${Q}
//${J}
fn water_rippleSlopeCoarse(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  let tc = t * ${e(Q)};
${H(S,"tc",J)}
  var slope = vec2<f32>(0.0, 0.0);
${$.map((f,t)=>K(f,(($[(0)][2]*2*y/$[(0)][1])/($[t][2]*2*y/$[t][1])),"tc",A)).join(`
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
${u}
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
  let eps = ${e(e2)} / max(tile, 0.05);
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
  let k = ${e(1/(w-1))};
  let gain = raw * (1.0 + k) / (1.0 + raw * k);
  let finite = (gain == gain) & (abs(gain) <= vec3<f32>(3.0e38));
  return select(vec3<f32>(1.0), clamp(gain, vec3<f32>(0.0), vec3<f32>(${e(w)})), finite);
}

fn water_causticsRefracted(floor: vec3<f32>, surfaceY: f32, sunDir: vec3<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, steepness: f32, baseSlope: vec2<f32>, dispersion: f32) -> vec3<f32> {
  let depth = max(surfaceY - floor.y, 0.0);
  let det = water_causticRefractionDet(floor, surfaceY, sunDir, t, tile, flow, flowSpeed, gust, steepness, baseSlope, dispersion);
  let softness = ${e(c2)} + 0.05 * depth + fwidth(det.y) * 1.5;
  return water_causticGain(det, softness);
}
fn water_fresnel(nDotV: f32, f0: f32) -> f32 {
  let m = clamp(1.0 - nDotV, 0.0, 1.0);
  let m2 = m * m;
  return f0 + (1.0 - f0) * m2 * m2 * m;
}
`}var f3=v2();var c3=`
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
`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$2 as Z_w,B2 as tV$,C as MTU,E as N3y,E2 as WeM,G2 as eTV,H2 as bnc,I as qBY,J2 as EOz,K2 as OXS,M2 as QRB,N as DTe,N2 as pK_,O as euq,P as z4n,P2 as yHM,Q as j3q,Q2 as L6d,R as rzO,V2 as RIw,W as usB,Y as ZTI,Y2 as BZQ,Z as dke,Z2 as OjY,_ as ofI,_2 as HXe,a2 as Du6,b2 as DkF,c3 as g1N,f2 as fOx,f3 as flP,g as iWF,g2 as V6O,h2 as XoK,j2 as FZo,m as BXK,m2 as Co8,n2 as A8T,o as KV3K,o2 as Eha,q as jGl,q2 as UYQ,r2 as aPR,s2 as wAz,t2 as mRT,u2 as p39,w2 as c8X,z as b8o,z2 as Xus};
