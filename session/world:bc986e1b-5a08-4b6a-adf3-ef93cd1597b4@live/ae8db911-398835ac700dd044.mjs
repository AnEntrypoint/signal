var $c0F,$c0N=[],$c0T=[function(){return[()=>'(()=>({ultra:"refracted",high:"worley2",medium:"worley1",low:"worley1-unshadowed"}))',()=>"(()=>(`\nfn water_foamTextureUv(xz: vec2<f32>, time: f32, velocity: vec2<f32>, scale: f32) -> vec2<f32> {\n  return (xz - velocity * time) * max(scale, 0.05);\n}\nfn water_foamTextureCoverage(amount: f32, sample: f32, softness: f32) -> f32 {\n  let a = clamp(amount, 0.0, 1.0);\n  let film = clamp(sample, 0.0, 1.0);\n  let core = smoothstep(clamp(0.72 - softness, 0.4, 0.95), 1.0, a);\n  return a * mix(film, 1.0, core);\n}\nfn water_foamTextureLod(scale: f32, footprint: f32, dimensions: vec2<u32>) -> f32 {\n  let texels = f32(max(dimensions.x, dimensions.y));\n  return log2(max(max(footprint, 0.0) * max(scale, 0.05) * texels, 1.0));\n}\n`))",()=>'(function(x,$,j,Z){if(x instanceof Y2)return v2(x,$);if(typeof x==="number"&&$==="f32")return q2(x,"f32");throw TypeError(`${j}(): \\`${Z}\\` takes a ${$} node${$==="f32"?" or a number":""}. Got ${typeof x}.`)})',()=>'(function(){return{waterMedium:(x,$,j)=>X(p,"water_medium",[J(x,"vec3f","waterMedium","scene"),J($,"vec3f","waterMedium","transmission"),J(j,"vec3f","waterMedium","scatter")],"vec3f"),waterUnderwaterDistortion:(x,$,j,Z,Q)=>X(p,"water_underwaterDistortion",[J(x,"vec2f","waterUnderwaterDistortion","uv"),J($,"f32","waterUnderwaterDistortion","time"),J(j,"f32","waterUnderwaterDistortion","distance"),J(Z,"f32","waterUnderwaterDistortion","visibility"),J(Q,"f32","waterUnderwaterDistortion","strength")],"vec2f"),waterRayBoxDistance:(x,$,j,Z,Q)=>X(p,"water_rayBoxDistance",[J(x,"vec3f","waterRayBoxDistance","origin"),J($,"vec3f","waterRayBoxDistance","direction"),J(j,"vec3f","waterRayBoxDistance","lower"),J(Z,"vec3f","waterRayBoxDistance","upper"),J(Q,"f32","waterRayBoxDistance","sceneDistance")],"f32")}})',()=>'(function(x,$){let[j,Z,Q,Y,B,q,f,b,z,V,G]=$;return[J(j,"vec3f",x,"floor"),J(Z,"f32",x,"surfaceY"),J(Q,"vec3f",x,"sunDir"),J(Y,"f32",x,"t"),J(B,"f32",x,"tile"),J(q,"vec2f",x,"flow"),J(f,"f32",x,"flowSpeed"),J(b,"f32",x,"gust"),J(z,"f32",x,"steepness"),J(V,"vec2f",x,"baseSlope"),J(G,"f32",x,"dispersion")]})',()=>'(function(){let x=h(Q2);let $=h((j2??=$c0I(1)));let j=function(Q,Y,B,q,f,b){let z=J(f,"f32",Q,"scale");let V=X($,"water_foamTextureUv",[J(Y,"vec2f",Q,"xz"),J(B,"f32",Q,"time"),J(q,"vec2f",Q,"flowVelocity"),z],"vec2f");let G;{let x=a;let $=d(null,{flipY:!1,wrap:"repeat"});G=($._measured=!0,h2.set($,x),$);}if(b===void 0)return G.sample(V).swizzle("x");let F=X($,"water_foamTextureLod",[z,J(b,"f32",Q,"footprint"),G.size()],"f32");return G.sampleLevel(V,F).swizzle("x")};let Z=(Q,Y,B,q)=>X($,"water_foamTextureCoverage",[J(Y,"f32",Q,"amount"),J(B,"f32",Q,"field"),J(q,"f32",Q,"softness")],"f32");return{...Z2(),waterFoam:(Q,Y,B,q,f=1,b=0.08)=>Z("waterFoam",q,j("waterFoam",Q,Y,B,f),b),waterFoamField:(Q,Y,B,q=1)=>j("waterFoamField",Q,Y,B,q),waterFoamFieldLod:(Q,Y,B,q,f)=>j("waterFoamFieldLod",Q,Y,B,q,f),waterFoamCoverage:(Q,Y,B=0.08)=>Z("waterFoamCoverage",Q,Y,B),waterRippleSlope:(Q,Y,B,q,f,b)=>X(x,"water_rippleSlope",[J(Q,"vec2f","waterRippleSlope","xz"),J(Y,"f32","waterRippleSlope","t"),J(B,"f32","waterRippleSlope","tile"),J(q,"vec2f","waterRippleSlope","flow"),J(f,"f32","waterRippleSlope","flowSpeed"),J(b,"f32","waterRippleSlope","gust")],"vec2f"),waterTransmittance:(Q,Y,B)=>X(x,"water_transmittance",[J(Q,"vec3f","waterTransmittance","deepTint"),J(Y,"f32","waterTransmittance","tintDistance"),J(B,"f32","waterTransmittance","depth")],"vec3f"),waterCaustics:(Q,Y)=>X(x,"water_caustics",[J(Q,"vec2f","waterCaustics","p"),J(Y,"f32","waterCaustics","t")],"f32"),waterCausticsAt:function(...Q){let Y;T2:{try{let v$1;{if(A===null){{throw Error("lighting quality read before the session set its tier (setActiveLightingQuality): the class resolves at renderer init, never a module default");\n}}v$1=A;}{Y=(m2??=$c0I(0))[(v$1.tier)];break T2;}}catch{{Y="worley2";break T2;}}}if(Y==="refracted")return X(x,"water_causticsRefracted",I("waterCausticsAt",Q),"vec3f");let B=I("waterCausticsAt",Q),q=X(x,"water_causticSurfacePoint",[B[0],B[1],B[2]],"vec2f"),f=B[3].mul(k),b=q.sub(B[5].mul(B[6]).mul(f));return X(x,Y==="worley2"?"water_caustics":"water_caustics1",[b.mul(B[4]).mul(1.7),f],"f32").mul(n).add(1).toVec3()},waterCausticsRefracted:(...Q)=>X(x,"water_causticsRefracted",I("waterCausticsRefracted",Q),"vec3f"),waterFresnel:(Q,Y)=>X(x,"water_fresnel",[J(Q,"f32","waterFresnel","nDotV"),J(Y,"f32","waterFresnel","f0")],"f32")}})']}],$c0XU=[0];function $c0C(n){return($c0F||($c0F=new Array(6)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+2281424917889024)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+2281424917889024))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}function $c0I(n){var g=$c0XE(n);($c0F||($c0F=new Array(6)))[n]=0;return g()}

;;;;var c=1,V2=2;var H={low:{skyViewWidth:96,skyViewHeight:54,environmentSize:16,environmentUpdateDegrees:3,prefilterSamples:32,cloudInterior:c,cloudSlabSteps:0,milkyWayPoints:1e5},medium:{skyViewWidth:96,skyViewHeight:54,environmentSize:32,environmentUpdateDegrees:2,prefilterSamples:64,cloudInterior:c,cloudSlabSteps:0,milkyWayPoints:180000},high:{skyViewWidth:192,skyViewHeight:108,environmentSize:64,environmentUpdateDegrees:1,prefilterSamples:128,cloudInterior:c,cloudSlabSteps:0,milkyWayPoints:300000},ultra:{skyViewWidth:256,skyViewHeight:144,environmentSize:64,environmentUpdateDegrees:0.5,prefilterSamples:128,cloudInterior:V2,cloudSlabSteps:12,milkyWayPoints:300000}};var j3=u*R;var L=1024,H2=(x)=>x==="near"?L:2048;var B3=H2(null);var y2=0.5,Y3=L*y2;var T=Object.freeze({cascades:3,mapSize:2048,maxFar:250}),y=Object.freeze({low:{cascades:1,mapSize:1024,maxFar:60},medium:{cascades:2,mapSize:1024,maxFar:100},high:T,ultra:T});var m={maxLights:1024,gridX:24,gridY:16,gridZ:24,clusterNear:0.1,clusterFar:600,cullIntensityEpsilon:0.005},m3={low:{tier:"low",shadowMaps:!0,clustered:{...m,maxLights:64,gridX:16,gridY:9,gridZ:32,clusterFar:300},sun:y.low,sky:H.low,localShadows:{atlasSize:0,maxShadowedLights:0,rendersPerFrame:0,maxSlotSize:0,shadowMaxDistance:0}},medium:{tier:"medium",shadowMaps:!0,clustered:{...m,maxLights:1024,gridX:16,gridY:9,gridZ:24,clusterFar:400},sun:y.medium,sky:H.medium,localShadows:{atlasSize:2048,maxShadowedLights:8,rendersPerFrame:2,maxSlotSize:512,shadowMaxDistance:40}},high:{tier:"high",shadowMaps:!0,clustered:{...m,maxLights:1024,gridX:24,gridY:16,gridZ:24},sun:y.high,sky:H.high,localShadows:{atlasSize:4096,maxShadowedLights:24,rendersPerFrame:4,maxSlotSize:1024,shadowMaxDistance:80}},ultra:{tier:"ultra",shadowMaps:!0,clustered:{...m,maxLights:2048,gridX:32,gridY:18,gridZ:32},sun:y.ultra,sky:H.ultra,localShadows:{atlasSize:4096,maxShadowedLights:48,rendersPerFrame:8,maxSlotSize:1024,shadowMaxDistance:120}}};var A=null;var h2=new WeakMap;var a="water/crest-foam";var P3=Array.from({length:31},function(x,$){return`water/caustics/${String($).padStart(2,"0")}`});var m2;var n=1.75,_=`
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
`;var D=3600;var w=8,N=3,t=(x)=>K*Math.round(x*D/K)/D,U2=[32,18];var i=0.24,M2=2.2;function F2(x){return t(K/x*Math.sqrt(9.81*M2))}var W=[0.22,0.34,0.52,0.8,1.15],c2=[0.58,0.42,0.3,0.16,0.1],A3=[0.72,0.92,1.18,1.52,1.95].map(t);var D2=0.32,E=[31,47,73,113],P=0.3;var o=[[1,-0.8,0.9,0.7],[-0.8,1,0.7,-0.9],[0.7,0.9,-1,0.8],[0.9,0.7,0.8,-1],[-0.9,-1,0.7,1]],r3=E.map(function(x,$){let j=0.3+$*U*(3-Math.sqrt(5)),Z=K/x;return[Math.cos(j)*Z,Math.sin(j)*Z]}),d3=o.map((x)=>x.map(($,j)=>$*P*E[j]/K)),l3=o.map((x)=>1/Math.sqrt(1+P*P*x.reduce(($,j)=>$+j*j,0)/2)),a3=D2*c2.reduce((x,$)=>x+$,0);var n3=Math.cos(i),_3=Math.sin(i),t3=U2.map(F2);var E3=new Float64Array(W.length),o3=new Float64Array(W.length),s3=new Float64Array(W.length);var $2=9.81,M=[[0,1.55,0.085],[1.9,1.1,0.08],[-1.15,0.78,0.075],[2.7,0.56,0.07],[0.65,0.41,0.06],[-2.3,0.3,0.05]],J2=4,P2=[[-0.45,0.47,0.065]],O=[...M.slice(0,J2),...P2];function w2(x){let $=(j)=>O[j][2]*2*U/O[j][1];return $(0)/$(x)}var k=0.6;var C=0.5,N2=0.3,W2=0.7,O2=0.12,C2=k*C,g2=0.7,p2=[2.7,3.3,3.9,4.7,2.3,5.3],I2=0.2,s=7,R2=0.03;function g(x){let $=v(Math.sin(x)),j=v(Math.cos(x));return`vec2<f32>(flow.x * ${j} - flow.y * ${$}, flow.x * ${$} + flow.y * ${j})`}function e(x,$=1,j="t",Z=0,Q=3.1,Y=!1){let[B,q,f]=x,b=K/q,z=Math.sqrt($2*b),V=f*$/b,G=B+1.22,F=K/Q,K2=Z>0?` + ${v(Z)} * sin(dot(p, ${g(G)}) * ${v(F)} * tile)`:"",z2=Y?`
    let w = 1.0 - smoothstep(${v(q/w)}, ${v(q/N)}, footprintTile);
    kept += w * w * ${v(f*f)};`:"",G2=Y?" * w":"";return`  {
    let d = ${g(B)};
    let k = ${v(b)} * tile;
    let phase = dot(p, d) * k - ${j} * (${v(z)} * sqrt(tile) + dot(flow, d) * flowSpeed * k)${K2};${z2}
    slope += d * (${v(V)} / tile * k * cos(phase) * gust${G2});
  }`}function x2(x,$,j){let Z=function(Q,Y,B){let q=K/Q,f=Math.sqrt($2*q)*j;return`sin(dot(xz, ${g(Y)}) * ${v(q)} * tile - ${$} * ${v(f)} * sqrt(tile) + ${v(B)})`};return`  let p = xz + (${v(x)} / tile) * vec2<f32>(${Z(4.3,0.6,0)}, ${Z(3.6,-1.7,1.3)});`}var u2=M.reduce((x,[,,$])=>x+$*$,0);function L2(){return`
//${M.length}

fn water_rippleSlopeLod(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, footprint: f32) -> vec3<f32> {
${x2(O2,"t",C2)}
  let footprintTile = footprint * tile;
  var slope = vec2<f32>(0.0, 0.0);
  var kept = 0.0;
${M.map((x,$)=>e(x,1,"t",g2,p2[$],!0)).join(`
`)}
  return vec3<f32>(slope, kept * ${v(1/u2)});
}
fn water_rippleSlope(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  return water_rippleSlopeLod(xz, t, tile, flow, flowSpeed, gust, 0.0).xy;
}
//${J2}
//${k}
//${C}
fn water_rippleSlopeCoarse(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32) -> vec2<f32> {
  let tc = t * ${v(k)};
${x2(N2,"tc",C)}
  var slope = vec2<f32>(0.0, 0.0);
${O.map((x,$)=>e(x,w2($),"tc",W2)).join(`
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
${_}
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
  let eps = ${v(I2)} / max(tile, 0.05);
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
  let k = ${v(1/(s-1))};
  let gain = raw * (1.0 + k) / (1.0 + raw * k);
  let finite = (gain == gain) & (abs(gain) <= vec3<f32>(3.0e38));
  return select(vec3<f32>(1.0), clamp(gain, vec3<f32>(0.0), vec3<f32>(${v(s)})), finite);
}

fn water_causticsRefracted(floor: vec3<f32>, surfaceY: f32, sunDir: vec3<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, steepness: f32, baseSlope: vec2<f32>, dispersion: f32) -> vec3<f32> {
  let depth = max(surfaceY - floor.y, 0.0);
  let det = water_causticRefractionDet(floor, surfaceY, sunDir, t, tile, flow, flowSpeed, gust, steepness, baseSlope, dispersion);
  let softness = ${v(R2)} + 0.05 * depth + fwidth(det.y) * 1.5;
  return water_causticGain(det, softness);
}
fn water_fresnel(nDotV: f32, f0: f32) -> f32 {
  let m = clamp(1.0 - nDotV, 0.0, 1.0);
  let m2 = m * m;
  return f0 + (1.0 - f0) * m2 * m2 * m;
}
`}var Q2=L2();var j2;var B2=`
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
`;var p=h(B2);function J(a,b,c,d){return (J=$c0C(2)).call(this,a,b,c,d)}function Z2(){return (Z2=$c0C(3)).call(this)}function I(a,b){return (I=$c0C(4)).call(this,a,b)}function A2(){return (A2=$c0C(5)).call(this)}var f2=null;var M0={records:{},entries:[["builtin/water",function(x){{f2??=A2();return X2("builtin/water",f2,x)}}]]};;



;import{$T4 as u,LDF as R,NDw as v,baH as K,ts0 as U}from"./5f1977e6deccae83.mjs";import{$O8 as h,$g6 as X2,aFT as v2,dnj as d,hiU as Y2,rjS as X,tq7 as q2}from"./80ce81ba-083cf25db4698b45.mjs";import"./3de17ee77b792674.mjs";import"./1dc340d57b62442d.mjs";export{M0 as WATER_FAMILY};
