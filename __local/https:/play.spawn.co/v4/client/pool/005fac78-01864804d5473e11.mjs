import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(j){return`\nfn sky_transmittance(direction: vec3<f32>) -> vec3<f32> {\n  return atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, direction.y);\n}\n\nfn sky_sunRadianceOf(sunDirection: vec3<f32>) -> vec3<f32> {\n  return sky.sunIlluminance * atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, clamp(sunDirection.y, -1.0, 1.0));\n}\nfn sky_sunRadiance(sunDirection: vec3<f32>) -> vec3<f32> {\n  return ${j?"sky_held.sunLight":"sky_sunRadianceOf(sunDirection)"};\n}\n\nfn sky_sunToward() -> vec3<f32> {\n  return ${j?"sky_held.sunToward":"normalize(sky.sunDirection)"};\n}\n\nfn sky_aureole(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {\n  let lobe = atm_henyeyGreensteinPhase(dot(direction, sunDirection), ATM_MIE_FORWARD_LOBE_G) * ATM_MIE_FORWARD_LOBE_WEIGHT;\n  let airMass = 1.0 / (max(direction.y, 0.0) + 1.0 / ATM_MIE_HORIZON_AIR_MASS);\n  let mieDepth = sky.mieScattering * ATM_MIE_SCALE_HEIGHT_KM * airMass;\n  let sunUp = ${j?"sky_held.sunUp":"sky_sunUp(sunDirection)"};\n  return sky_sunRadiance(sunDirection) * (lobe * mieDepth * sunUp);\n}\n\nfn sky_skyView(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {\n${j?"  let skyViewUv = atm_skyViewUvHeld(direction, sky_held.sunFlat, sky_held.horizonZenith, sky_held.subUv);":`  let skyViewSize = vec2<f32>(textureDimensions(skyViewLut, 0));\n  let skyViewUv = atm_skyViewUvFromDirection(direction, sunDirection, skyViewSize.x, skyViewSize.y, sky.viewHeightKm);`}\n  return textureSampleLevel(skyViewLut, lutSampler, skyViewUv, 0.0).rgb;\n}\n\nfn sky_atmosphere(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {\n  return sky_skyView(direction, sunDirection) + sky_aureole(direction, sunDirection);\n}\n\nfn sky_sunDisc(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>, size: f32) -> vec3<f32> {\n  let angularRadius = max(sky.sunDiskAngularRadius * size, 1e-4);\n  let angle = acos(clamp(dot(direction, sunDirection), -1.0, 1.0));\n  return sky.sunIlluminance * atm_sunLimbDarkening(clamp(angle / angularRadius, 0.0, 1.0)) * transmittance * sky_discMask(angle, angularRadius) * sky.sunDiskIntensity * ${k0};\n}\n\nstruct SkyNight {\n  celestial: vec3<f32>,\n  moonlit: vec3<f32>,\n}\n\nfn sky_nightAir(direction: vec3<f32>) -> vec3<f32> {\n  let up = clamp(direction.y, 0.0, 1.0);\n  let horizon = vec3<f32>(${k[0]}, ${k[1]}, ${k[2]});\n  let zenith = vec3<f32>(${P[0]}, ${P[1]}, ${P[2]});\n  return mix(horizon, zenith, smoothstep(0.0, 0.3, up)) + horizon * 0.6 * exp(-up / 0.06);\n}\n\nfn sky_night(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>) -> SkyNight {\n  var night: SkyNight;\n  night.celestial = vec3<f32>(0.0);\n  night.moonlit = vec3<f32>(0.0);\n  let nightVisibility = sky_fadeOut(${M}, ${F}, sunDirection.y);\n\n  if (nightVisibility > 0.0) {\n    night.moonlit = sky_nightAir(direction) * nightVisibility;\n\n    let moon = sky_moonLayer(direction, 1.0);\n    night.celestial = moon.rgb * nightVisibility * transmittance;\n  }\n  return night;\n}\n\nfn sky_nightVisible(sunDirection: vec3<f32>) -> bool {\n  return sky_fadeOut(${M}, ${F}, sunDirection.y) > 0.0;\n}\n\nfn sky_nightAt(direction: vec3<f32>, sunDirection: vec3<f32>) -> SkyNight {\n  var night: SkyNight;\n  if (sky_nightVisible(sunDirection)) {\n    night = sky_night(direction, sunDirection, sky_transmittance(direction));\n  }\n  return night;\n}\n\nfn sky_tintPlain() -> bool {\n  return all(sky.horizonTint == vec3<f32>(1.0)) && all(sky.zenithTint == vec3<f32>(1.0)) && sky.saturation == 1.0;\n}\n\nfn sky_sunUp(sunDirection: vec3<f32>) -> f32 {\n  return smoothstep(-0.03, 0.0, sunDirection.y);\n}\n`})']},function(){return[()=>"(function(j,q,$){if($.step===1)return`@group(${j}) @binding(${q}) var skyGrid: texture_2d<f32>;\nfn sky_gridSample(uv: vec2<f32>, rect: vec4<f32>) -> f32 {\n  let texel = clamp(uv * rect.zw, vec2<f32>(0.5), rect.zw - vec2<f32>(0.5));\n  return textureSampleLevel(skyGrid, lutSampler, (rect.xy + texel) / vec2<f32>(${$.width}.0, ${$.height}.0), 0.0).r;\n}\n`;return`@group(${j}) @binding(${q}) var skyGrid: texture_2d<f32>;\nfn sky_gridSample(uv: vec2<f32>, rect: vec4<u32>) -> f32 {\n  let texels = textureDimensions(skyGrid);\n  let shift = vec2<u32>(${31-Math.clz32($.width)}u - firstLeadingBit(texels.x));\n  let size = vec2<f32>((rect.zw + (vec2<u32>(1u) << shift) - vec2<u32>(1u)) >> shift);\n  let texel = clamp(uv * size, vec2<f32>(0.5), size - vec2<f32>(0.5));\n  return textureSampleLevel(skyGrid, lutSampler, (vec2<f32>(rect.xy >> shift) + texel) / vec2<f32>(texels), 0.0).r;\n}\n`})",()=>"(function(j){return`// lume sky dome - one shader, every sky kind behind a uniform selector\n${Z}\n${x({sunDisc:!0,group:2,...j?{script:{...j,paramsBinding:{group:3,binding:e}}}:{held:!0}})}\n${Y0(j!==void 0,!1)}`})",()=>'(function(){let j=l2;return`\nstruct SkyKeptVsOut {\n  @builtin(position) position: vec4<f32>,\n  @location(0) ndc: vec2<f32>,\n  @location(1) @interpolate(flat) turn: u32,\n}\n\n@vertex fn skyKeptVs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) turn: u32) -> SkyKeptVsOut {\n${N}  var out: SkyKeptVsOut;\n  out.ndc = corner * 2.0 - 1.0;\n  out.position = vec4<f32>(out.ndc, 0.0, 1.0);\n  out.turn = turn;\n  return out;\n}\n\nfn sky_keptRay(ndc: vec2<f32>) -> vec3<f32> {\n  return normalize(${T});\n}\n\nfn sky_keptOpen(p: vec2<i32>) -> bool {\n  let dims = vec2<i32>(textureDimensions(skyHalfDepth));\n  if (any(vec2<f32>(dims) != frame.viewportSize)) {\n    return true;\n  }\n  let last = dims - vec2<i32>(1);\n  for (var y = -1; y <= 1; y += 1) {\n    for (var x = -1; x <= 1; x += 1) {\n      if (textureLoad(skyHalfDepth, clamp(p + vec2<i32>(x, y), vec2<i32>(0), last), 0) <= ${b}) {\n        return true;\n      }\n    }\n  }\n  return false;\n}\n\n@fragment fn skyAskFs(in: SkyKeptVsOut) -> @location(0) vec4<f32> {\n  let p = vec2<i32>(in.position.xy) * ${j} + vec2<i32>(i32(in.turn % ${j}u), i32(in.turn / ${j}u));\n  let full = vec2<f32>(p) + vec2<f32>(0.5);\n  let direction = sky_keptRay(vec2<f32>(full.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - full.y / frame.viewportSize.y * 2.0));\n  let pixelAngle = length(fwidth(direction)) * ${(1/j).toFixed(6)} * (frame.viewportSize.x / frame.canvasSize.x);\n  if (any(full >= frame.viewportSize) || !sky_keptOpen(p)) {\n    return vec4<f32>(0.0);\n  }\n  sky_starLight = sky_starLayerAt(full);\n  return vec4<f32>(sky_scripted(direction, pixelAngle, frame.worldTime, sky_domeCloudSteps(), ${u("full")}, sky.cloudMap), 1.0);\n}\n\nfn sky_keptHeld(held: vec3<f32>, p: vec2<i32>, turn: vec2<i32>, askDims: vec2<i32>) -> vec3<f32> {\n  if (any(sky_starLayerAt(vec2<f32>(p) + vec2<f32>(0.5)) != vec3<f32>(0.0))) {\n    return held;\n  }\n  let block = (p - turn + vec2<i32>(${j} / 2)) / vec2<i32>(${j});\n  var lo = vec3<f32>(1e30);\n  var hi = vec3<f32>(-1e30);\n  for (var y = -1; y <= 1; y += 1) {\n    for (var x = -1; x <= 1; x += 1) {\n      let a = textureLoad(skyHalf, clamp(block + vec2<i32>(x, y), vec2<i32>(0), askDims - vec2<i32>(1)), 0);\n      if (a.a > 0.0) {\n        lo = min(lo, a.rgb);\n        hi = max(hi, a.rgb);\n      }\n    }\n  }\n  if (lo.x > hi.x) {\n    return held;\n  }\n  let slack = (hi - lo) * 0.0625 + max(hi, vec3<f32>(1e-4)) * 0.02;\n  return clamp(held, lo - slack, hi + slack);\n}\n\n@fragment fn skyKeepFs(in: SkyKeptVsOut) -> @location(0) vec4<f32> {\n  let p = vec2<i32>(in.position.xy);\n  let turn = vec2<i32>(i32(in.turn % ${j}u), i32(in.turn / ${j}u));\n  let askDims = vec2<i32>(textureDimensions(skyHalf));\n  if (all(p % vec2<i32>(${j}) == turn)) {\n    let asked = textureLoad(skyHalf, min(p / vec2<i32>(${j}), askDims - vec2<i32>(1)), 0);\n    if (asked.a > 0.0) {\n      return vec4<f32>(asked.rgb, 1.0);\n    }\n  }\n  let clip = frame.prevViewProj * vec4<f32>(sky_keptRay(in.ndc), 0.0);\n  let lastDims = vec2<f32>(textureDimensions(skyHalfTiles));\n  if (clip.w > 1e-6 && all(lastDims == frame.viewportSize)) {\n    let q = vec2<f32>((clip.x / clip.w * 0.5 + 0.5) * lastDims.x, (0.5 - clip.y / clip.w * 0.5) * lastDims.y);\n    if (all(q >= vec2<f32>(0.0)) && all(q < lastDims)) {\n      let held = textureLoad(skyHalfTiles, vec2<i32>(q), 0);\n      if (held.a > 0.0 && held.a < ${c2}.0) {\n        return vec4<f32>(sky_keptHeld(held.rgb, p, turn, askDims), held.a + 1.0);\n      }\n    }\n  }\n  let at = clamp(vec2<f32>(p - turn) / ${j}.0 + vec2<f32>(0.5), vec2<f32>(0.5), vec2<f32>(askDims) - vec2<f32>(0.5)) / vec2<f32>(askDims);\n  let near = textureSampleLevel(skyHalf, lutSampler, at, 0.0);\n  if (near.a > 0.0) {\n    return vec4<f32>(near.rgb / near.a, 2.0);\n  }\n  return vec4<f32>(0.0);\n}\n\n@fragment fn skyKeptFs(in: SkyVsOut) -> @location(0) vec4<f32> {\n${_}  let direction = sky_keptRay(in.ndc);\n  let outputPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);\n  let dims = vec2<i32>(textureDimensions(skyHalf));\n  let kept = textureLoad(skyHalf, clamp(vec2<i32>(in.position.xy), vec2<i32>(0), dims - vec2<i32>(1)), 0);\n  var shown = kept.rgb;\n  if (kept.a <= 0.0 || any(vec2<f32>(dims) != frame.viewportSize)) {\n    sky_starLight = sky_starLayerAt(in.position.xy);\n    shown = sky_scripted(direction, outputPixelAngle, frame.worldTime, sky_domeCloudSteps(), ${u("in.position.xy")}, sky.cloudMap);\n  }\n  return sky_domeFinish(direction, in.position.xy, shown);\n}\n`})']},function(){return[()=>'(function(j){let q="directional";if(j===null)q="select(pow(directional, skybox.gradientCurve), directional, skybox.gradientCurve == 1.0)";else if(j)q="pow(directional, skybox.gradientCurve)";return`\nfn sky_domeGradient(direction: vec3<f32>, position: vec2<f32>) -> vec3<f32> {\n  let screenUv = position / frame.viewportSize;\n  let directional = clamp(direction.y, 0.0, 1.0);\n  let curved = ${q};\n  let elevation = mix(curved, 1.0 - screenUv.y, skybox.screenWeight);\n  return mix(skybox.horizonColor, skybox.zenithColor, elevation);\n}`})',()=>'(function(j,q){let $=j.indexOf("@fragment fn skyFs("),z=j.indexOf("  var color = skybox.clearColor;",$),v=j.indexOf(`  return vec4<f32>(color, 1.0);\n}\n`,z)+34,J=`fn sky_domeFinish(direction: vec3<f32>, position: vec2<f32>, scripted: vec3<f32>) -> vec4<f32> {\n${j.slice(z,v).replaceAll("in.position.xy","position")}`;return`${j.slice(0,$)}${J}\n${G0(q)}\n${j.slice($,z)}  return sky_domeFinish(direction, in.position.xy, scripted);\n}\n${j.slice(v)}`})',()=>'(function(j){let q=j(i),$=j(_2)?`\n  color = sky_artistic(color - light, direction) + light;`:"",z=q?"sky_nightAir(direction) * in.night":"vec3<f32>(0.0)";if(j(t))return`  var color = sky_skyView(direction, sky_held.sunToward);${q?`\n  color = color + ${z};`:""}${j(G)?`\n  let cover = sky_flatCloudCover(direction, skybox.flatCloud);\n  let light = sky_flatCloudLight(skybox.flatCloud) * cover;\n  color = color * (1.0 - cover) + light;`:`\n  let light = vec3<f32>(0.0);`}${$}`;let v=j(S);if(!v&&!j(G))return`  var color = sky_atmosphere(direction, sky_held.sunToward);${q?`\n  color = color + ${z};`:""}\n  let light = vec3<f32>(0.0);${$}`;return`  let moonlit = ${z};\n  let layer = ${v?"sky_cloudMapRead(direction, sky.cloudMap)":`sky_cloudLayer(direction, sky_domeCloudSteps(), ${u("in.position.xy")})`};\n  var clouds = vec4<f32>(0.0);\n  if (layer.w > 0.0) {\n    clouds = sky_cloudsLit(layer, direction, sky_sunRadiance(sky_held.sunToward), sky_cloudAmbient(direction, sky_held.sunToward, moonlit));\n  }\n  var color = mix(sky_atmosphere(direction, sky_held.sunToward) + moonlit, clouds.rgb, clouds.a);\n  let light = clouds.rgb * clouds.a;${$}`})',()=>'(function(j){let q=j(i2),$=j(z0);if(!q&&!$)return{varying:"",held:"",mix:""};let z=j(q0),v=j($0),J=j(S)||j(G)&&!j(t),Q=z&&!v,X=`passLights.fogFar * ${a}`;if(!q)X="0.0";else if(v)X="shade_fogHeightColumn()";else if(z)X=`1.7320508 / max(passLights.fogDensity, 1e-6) * ${a}`;let m="max(passLights.fogFar, passLights.fogNear + 1e-4)";if(!q)m="0.0";else if(Q)m="shade_fogFarPlane()";let q2=Q?"select(in.fog.x / 1e-4, min(in.fog.x / max(direction.y, 1e-4), in.fog.y), direction.y > 0.0)":"in.fog.x / max(direction.y, 1e-4)",$2=$?"let authored":"let fog",z2="";if(q)z2=z?`  let fogDepth = passLights.fogDensity * ${q2};\n  ${$2} = 1.0 - exp(-(fogDepth * fogDepth));\n`:`  ${$2} = smoothstep(passLights.fogNear, in.fog.y, ${q2});\n`;let J2="smoothstep(passLights.viewFogNear, in.fog.w, in.fog.z / max(direction.y, 1e-4)) * passLights.viewFogAmount";return{varying:`\n  @location(6) @interpolate(flat) fog: vec4<f32>,`,held:`\n  out.fog = vec4<f32>(${X}, ${m}, passLights.viewFogFar * ${a}, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4));`,mix:`${z2}${$?`  let fog = ${q?`max(authored, ${J2})`:J2};\n`:""}  if (fog > 0.0) {\n    let fogColor = shade_fogLean(direction, shade_fogTurn(direction));\n    color = mix(color, fogColor, fog);\n${J?Z0:""}  }\n`}})']},function(){return[()=>'(function(j){let q=J0(j),$=(m)=>Q0(j,m),z=I0($);if(j===O)return`\n${h}\n${Y(!0)}\n@group(3) @binding(0) var<uniform> skybox: SkyBackground;\n@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {\n${N}  return vec4<f32>(corner * 2.0 - 1.0, ${b}, 1.0);\n}\n@fragment fn skyFs() -> @location(0) vec4<f32> {\n  return vec4<f32>(skybox.clearColor, 1.0);\n}\n`;let v=q===C,J=v&&$(i),Q="  var color = skybox.clearColor;",X="";if(q===H)Q="  var color = sky_domeGradient(direction, in.position.xy);";else if(v)Q=A0($),X=x({sunDisc:!1,group:2,held:!0});else if(q===d)X=U,Q=$(j0)?"  var color = lume_cubeSampleLevel(equirectBlurCube, equirectSampler, direction, skybox.equirectBlurMip, skybox.equirectBlurLevels).rgb;":`  let cosYaw = cos(skybox.equirectYaw);\n  let sinYaw = sin(skybox.equirectYaw);\n  let rotated = vec3<f32>(direction.x * cosYaw - direction.z * sinYaw, direction.y, direction.x * sinYaw + direction.z * cosYaw);\n  let pixelAngle = length(fwidth(direction));\n  let texelsPerRadian = skybox.equirectWidth * ${1/n};\n  let lod = max(log2(max(pixelAngle * texelsPerRadian, 1e-6)), 0.0);\n  var color = textureSampleLevel(equirectTex, equirectSampler, sky_equirectUv(rotated), lod).rgb;`;return`\n${Z}\n${X}\n${B0}\n${s}\n${q===H?u0($(s2)):""}\nstruct SkyVsOut {\n  @builtin(position) position: vec4<f32>,\n  @location(0) ray: vec3<f32>,${v?f0:""}${J?`\n  @location(5) @interpolate(flat) night: f32,`:""}${z.varying}\n}\n\n@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32) -> SkyVsOut {\n${N}  var out: SkyVsOut;\n  let ndc = corner * 2.0 - 1.0;\n  out.position = vec4<f32>(ndc, ${b}, 1.0);\n${$(S2)?`  let nearPoint = frame.inverseViewProj * vec4<f32>(ndc, ${o}, 1.0);\n  let farPoint = frame.inverseViewProj * vec4<f32>(ndc, ${b}, 1.0);\n  out.ray = farPoint.xyz / farPoint.w - nearPoint.xyz / nearPoint.w;`:`  out.ray = ${T};`}${v?w0:""}${J?`\n  out.night = sky_fadeOut(${M}, ${F}, held.sunToward.y);`:""}${z.held}\n  return out;\n}\n\n@fragment fn skyFs(in: SkyVsOut) -> @location(0) vec4<f32> {\n${v?x0:""}  let direction = normalize(in.ray);\n${Q}\n${z.mix}  return vec4<f32>(color, 1.0);\n}\n`})']}],$c0XU=[0,1,4,8];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,9,2170072081629184);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[0]]);
;const{$Wk:R2,$_l:n2,ACB:s,Ahoa:s2,CDk:t,Cae:D,Cip:g,DyN:T2,EBj:W2,EVH:u,FHk:G2,GJk:o,Ggy:Z,HGI:a2,HZl_:$0,IOE:I,IUU:_2,Ijf:U,J_E:R,JuK:S2,KLm:H,KRJ:o2,Lxj:S,MQw:F2,N4y:u2,Nr6:w2,OjA:D2,PWW:L,QDv:x2,RBS:F,Rlj:l2,SSR:f2,SUW:N2,TYO:B2,TjB:b,TwD:A,UOx:d,VHJ:e2,WQP:p2,WtZ:O,YW8:H2,Zg5:c,_2Q:z0,_AU:j0,amQ:k,apl:r,bAE:C,baH:n,blZ:C2,dFZ:q0,dOa:t2,e71:r2,eP0:P,fI7:M2,fIC:Y,fOD:B,feF:i,fkO:e,h7r:h2,hAX:b2,hJc:c2,haM:A2,iBo:h,ihj:i2,iqx:E2,kWy:U2,lYn:V,lnN:E,mdD:M,oBv:Y2,pGn:O2,pro:y,qeB:y2,r1G:J0,rV2:Q0,rd3:I2,rwD:d2,sAG:f,sr4:G,tDqN:L2,ts0:K,wGc:g2,y7_:l,zUs:K2,zWa:a}=$Lr;
;;var Q2=`struct FullscreenOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

@vertex fn fullscreenVs(@builtin(vertex_index) vertexIndex: u32) -> FullscreenOut {
  let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
  var out: FullscreenOut;
  out.position = vec4<f32>(corner * 2.0 - 1.0, 0.0, 1.0);
  out.uv = vec2<f32>(corner.x, 1.0 - corner.y);
  return out;
}
`;var k0=2.5;function P0(j){return`${x2}
@group(${j}) @binding(0) var<uniform> sky: Sky;
@group(${j}) @binding(1) var skyViewLut: texture_2d<f32>;
@group(${j}) @binding(2) var transmittanceLut: texture_2d<f32>;
@group(${j}) @binding(4) var cloudField: texture_2d<f32>;
@group(${j}) @binding(5) var lutSampler: sampler;
@group(${j}) @binding(9) var cloudFieldNear: texture_2d<f32>;
@group(${j}) @binding(10) var<storage, read> cloudMap: array<u32>;
`}var M0=`
fn sky_fadeOut(edge0: f32, edge1: f32, value: f32) -> f32 {
  return 1.0 - smoothstep(edge0, edge1, value);
}
`,F0=`
fn sky_discMask(angle: f32, angularRadius: f32) -> f32 {
  return sky_fadeOut(angularRadius - max(angularRadius * 0.06, 0.0008), angularRadius, angle);
}

fn sky_moonLayer(direction: vec3<f32>, size: f32) -> vec4<f32> {
  let moonDirection = normalize(sky.moonDirection);
  let angularRadius = max(sky.moonAngularRadius * size, 1e-4);
  let discMask = sky_discMask(acos(clamp(dot(direction, moonDirection), -1.0, 1.0)), angularRadius);

  var disc = vec3<f32>(0.0);
  if (discMask > 0.0) {
    let right = normalize(cross(vec3<f32>(0.0, 1.0, 0.0), moonDirection) + vec3<f32>(1e-4, 0.0, 0.0));
    let up = cross(moonDirection, right);
    let localX = clamp(dot(direction, right) / angularRadius, -1.0, 1.0);
    let localY = clamp(dot(direction, up) / angularRadius, -1.0, 1.0);
    let localZ = sqrt(max(1.0 - localX * localX - localY * localY, 0.0));
    let surfaceNormal = right * localX + up * localY - moonDirection * localZ;

    let phaseAngle = sky.moonPhase * 6.28318530718;
    let authoredLight = right * sin(phaseAngle) + moonDirection * cos(phaseAngle);
    let lightDirection = select(normalize(authoredLight), normalize(sky.sunDirection), sky.moonPhase < 0.0);

    let lambert = max(dot(surfaceNormal, lightDirection), 0.0);
    var mottling = vec2<f32>(0.0);
    for (var leg = 0u; leg < 2u; leg = leg + 1u) {
      let craterLeg = leg == 1u;
      let stack = shade_fractal3(surfaceNormal * select(3.5, 9.0, craterLeg) + select(11.0, 37.0, craterLeg), select(4, 3, craterLeg), select(2.2, 2.0, craterLeg), select(0.55, 0.5, craterLeg));
      mottling[leg] = clamp(stack * 0.5 + 0.5, 0.0, 1.0);
    }
    let maria = mottling.x;
    let craters = mottling.y;
    let albedo = 0.5 + maria * 0.5 - pow(craters, 2.0) * 0.25;
    let earthshine = 0.03;

    disc = sky.moonColor * albedo * max(lambert, earthshine) * discMask;
  }
  return vec4<f32>(disc * sky.moonEnabled, discMask * sky.moonEnabled);
}
`;function U0(a){return (U0=$c0C(0)).call(this,a)}var y0=`
struct SkyHeld {
  sunToward: vec3<f32>,
  sunUp: f32,
  sunLight: vec3<f32>,
  horizonZenith: f32,
  sunFlat: vec3<f32>,
  tintPlain: f32,
  subUv: vec4<f32>,
}
var<private> sky_held: SkyHeld;

fn sky_holdView() -> SkyHeld {
  var held: SkyHeld;
  held.sunToward = normalize(sky.sunDirection);
  held.sunUp = sky_sunUp(held.sunToward);
  held.sunLight = sky_sunRadianceOf(held.sunToward);
  held.horizonZenith = acos(clamp(atm_horizonCosZenith(sky.viewHeightKm), -1.0, 1.0));
  held.sunFlat = normalize(vec3<f32>(held.sunToward.x, 0.0, held.sunToward.z) + vec3<f32>(1e-5, 0.0, 0.0));
  held.tintPlain = select(0.0, 1.0, sky_tintPlain());
  let size = vec2<f32>(textureDimensions(skyViewLut, 0));
  held.subUv = vec4<f32>(0.5 / size.x, size.x / (size.x + 1.0), 0.5 / size.y, size.y / (size.y + 1.0));
  return held;
}
`,v2=`  let cover = mix(settled.w, slice.w, sky.cloudMapPending);
  let shares = mix(settled.xyz * settled.w, slice.xyz * slice.w, sky.cloudMapPending) / max(cover, 1e-4);
  return vec4<f32>(shares, cover);
}`,H0=`
fn sky_cloudMapShown(direction: vec3<f32>, mapSide: f32) -> vec4<f32> {
  let settled = sky_cloudMapRead(direction, mapSide);
  if (sky.cloudMapPending <= 0.0) {
    return settled;
  }
  let slice = sky_cloudLayer(direction, 0u, 0.5);
${v2}

fn sky_cloudLayerShown(direction: vec3<f32>, mapSide: f32, marchDirection: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
  let mapped = mapSide > 0.5;
  var settled = vec4<f32>(0.0);
  if (mapped) {
    settled = sky_cloudMapRead(direction, mapSide);
    if (sky.cloudMapPending <= 0.0) {
      return settled;
    }
  }
  let slice = sky_cloudLayer(select(marchDirection, direction, mapped), select(steps, 0u, mapped), select(jitter, 0.5, mapped));
  if (!mapped) {
    return slice;
  }
${v2}

fn sky_domeCloudSteps() -> u32 {
  return select(u32(sky.cloudSteps), 0u, sky.cloudMapPending >= 1.0);
}
`,C0=`
var<private> sky_starLight: vec3<f32>;

fn sky_nightLayer(direction: vec3<f32>, pixelAngle: f32, t: f32) -> vec3<f32> {
  let sunDirection = normalize(sky.sunDirection);
  let night = sky_night(direction, sunDirection, sky_transmittance(direction));
  return night.celestial + night.moonlit + sky_starLight;
}

fn sky_weather(planeKm: vec2<f32>) -> f32 {
  return sky_cloudField(sky_cloudPlanePos(vec3<f32>(planeKm.x * 1000.0, 0.0, planeKm.y * 1000.0)));
}
`,T0="skyScriptDisc";function h0(a,b,c){return (h0=$c0C(1)).call(this,a,b,c)}var X2=/\b(?:dpdx|dpdy|fwidth)(?:Coarse|Fine)?\s*\(/;function V2(j){return!X2.test(j.defs)&&!X2.test(j.body)}function g0(j){let q=j.script;if(!q)return"";return`${C0}
${j.familyReader?`
override ${T0}: f32 = 0.0;
var<private> sky_toneMapWord: f32 = 0.0;
fn sky_frameToneMap() -> f32 { return sky_toneMapWord; }`:`
const skyScriptDisc: f32 = ${j.sunDisc?"1.0":"0.0"};
fn sky_frameToneMap() -> f32 { return ${j.toneMapWgsl??"frame.toneMap"}; }`}
${q.paramsStruct}
@group(${q.paramsBinding.group}) @binding(${q.paramsBinding.binding}) var<uniform> skyScript: SkyScriptParams;
${q.grids?h0(q.paramsBinding.group,q.paramsBinding.binding+f2,q.grids):""}
var<private> ${I}: f32 = 0.0;
${V2(q)?q.defs:q.defs.replace(/^fn /gm,`${A} fn `)}

${V2(q)?"":`${A} `}fn sky_scripted(directionIn: vec3<f32>, pixelAngle: f32, t: f32, cloudSteps: u32, cloudJitter: f32, cloudMapSide: f32) -> vec3<f32> {
  ${I} = t;
  let direction = normalize(directionIn);
  let sunDirection = normalize(sky.sunDirection);
${q.body}
  return out_color;
}
`}function x(j){let q=j.sunDisc?`let r = max(sky.sunDiskAngularRadius, 1e-4);
  if (dot(direction, sunDirection) >= 1.0 - r * r) {
    return sky_sunDisc(direction, sunDirection, sky_transmittance(direction), 1.0);
  }
  `:"";return b2(`${P0(j.group)}
${m2}
${u2.source}
${M0}
${U}
${F0}
${Z2}
${B2}
${g("cloudMap","","sky.cloudMapHalf","0u")}
${H0}
${j.held?y0:""}
${U0(j.held===!0)}
fn sky_cloudAmbient(direction: vec3<f32>, sunDirection: vec3<f32>, moonlit: vec3<f32>) -> vec3<f32> {
  let view = select(direction, vec3<f32>(direction.x, -direction.y, direction.z), direction.y < 0.0);
  let skyView = sky_skyView(view, sunDirection);
  let deck = vec3<f32>(dot(skyView, vec3<f32>(0.2126, 0.7152, 0.0722)));
  return mix(skyView + sky_aureole(view, sunDirection), deck, sky_cloudClosing()) + moonlit + sky_moonDeck() * sky.cloudsCoverage;
}

fn sky_sunPoint(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
  ${q}return vec3<f32>(0.0);
}

fn sky_artistic(color: vec3<f32>, direction: vec3<f32>) -> vec3<f32> {
  let elevation = smoothstep(0.0, ${w2.toFixed(2)}, clamp(direction.y, 0.0, 1.0));
  let tint = mix(sky.horizonTint, sky.zenithTint, elevation);
  return atm_adjustSaturation(color * tint, sky.saturation);
}

var<private> sky_tintsLayer: f32 = 0.0;
var<private> sky_deck: vec4<f32>;
fn sky_radianceLayer(direction: vec3<f32>, layer: vec4<f32>, night: SkyNight) -> vec3<f32> {
  let sunDirection = sky_sunToward();
  let atmosphere = sky_atmosphere(direction, sunDirection);
  var clouds = vec4<f32>(0.0);
  if (layer.w > 0.0) {
    clouds = sky_cloudsLit(layer, direction, sky_sunRadiance(sunDirection), sky_cloudAmbient(direction, sunDirection, night.moonlit));
  }
  sky_deck = clouds;

  let clear = sky_cloudClear(clouds.a);
  let total = mix(atmosphere + night.moonlit, clouds.rgb, clouds.a) + (night.celestial + sky_sunPoint(direction, sunDirection)) * clear;
  if (${j.held?"sky_held.tintPlain > 0.5":"sky_tintPlain()"}) {
    return total;
  }
  let light = clouds.rgb * clouds.a * (1.0 - sky_tintsLayer);
  return sky_artistic(total - light, direction) + light;
}

fn sky_radiance(directionIn: vec3<f32>, pixelAngle: f32, t: f32, cloudSteps: u32, cloudJitter: f32) -> vec3<f32> {
  let direction = normalize(directionIn);
  var layer = vec4<f32>(0.0);
  if (sky.cloudsEnabled > 0.5) {
    layer = sky_cloudLayer(direction, cloudSteps, cloudJitter);
  }
  return sky_radianceLayer(direction, layer, sky_nightAt(direction, sky_sunToward()));
}
${g0(j)}`)}var T="vec3<f32>((ndc.x + frame.proj[2][0]) / frame.proj[0][0], (ndc.y + frame.proj[2][1]) / frame.proj[1][1], -1.0) * mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz)",_=`  if (skybox.kind == ${O}.0 && skybox.fogSky <= 0.0 && passLights.viewFogAmount <= 0.0 && skybox.groundShare <= 0.0) {
    return vec4<f32>(skybox.clearColor, 1.0);
  }
`,N=`  let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
`,V0=`  sky_toneMapWord = frame.toneMap;
`,b0=`fn sky_flatRadiance(direction: vec3<f32>, night: SkyNight) -> vec3<f32> {
  let total = sky_skyView(direction, sky_sunToward()) + night.moonlit;
  let cover = sky_flatCloudCover(direction, skybox.flatCloud);
  return sky_artistic(total * (1.0 - cover) + (night.celestial + sky_sunPoint(direction, sky_sunToward())) * sky_cloudClear(cover), direction) + sky_flatCloudLight(skybox.flatCloud) * cover;
}
`;function U1(a){return (U1=$c0C(2)).call(this,a)}var W0=`@group(3) @binding(${t2}) var skyStarLayer: texture_2d<f32>;

fn sky_starLayerAt(position: vec2<f32>) -> vec3<f32> {
  let last = textureDimensions(skyStarLayer) - vec2<u32>(1u);
  return textureLoad(skyStarLayer, min(vec2<u32>(position), last), 0).rgb;
}
`,a0=`@group(3) @binding(${O2}) var skyHalf: texture_2d<f32>;
@group(3) @binding(${d2}) var skyHalfDepth: texture_depth_2d;
@group(3) @binding(${e2}) var skyHalfTiles: texture_2d<f32>;

fn sky_halfTexel(i: vec2<i32>, last: vec2<i32>) -> vec4<f32> {
  return textureLoad(skyHalf, clamp(i, vec2<i32>(0), last), 0);
}

fn sky_halfBlend(position: vec2<f32>) -> vec3<f32> {
  let dims = vec2<f32>(textureDimensions(skyHalf));
  let at = clamp(position * 0.5, vec2<f32>(0.5), dims - vec2<f32>(0.5)) / dims;
  let s = textureSampleLevel(skyHalf, lutSampler, at, 0.0);
  return s.rgb / max(s.a, 1e-6);
}

fn sky_halfOpen(cell: vec2<i32>) -> bool {
  let dims = vec2<i32>(textureDimensions(skyHalfDepth));
  if (any(vec2<f32>(dims) != frame.viewportSize)) {
    return true;
  }
  let last = dims - vec2<i32>(1);
  for (var y = -1; y <= 2; y += 1) {
    for (var x = -1; x <= 2; x += 1) {
      if (textureLoad(skyHalfDepth, clamp(cell * 2 + vec2<i32>(x, y), vec2<i32>(0), last), 0) <= ${b}) {
        return true;
      }
    }
  }
  return false;
}
`;function G0(j){let q=j?V0:"",$=f/2+4,z=(J,Q)=>`t${Q}_${J}`,v=[];for(let J=0;J<$;J+=1)for(let Q=0;Q<$;Q+=1)if(Q%($-1)+J%($-1)>0)v.push(`  let ${z(Q,J)} = sky_halfTexel(base + vec2<i32>(${Q}, ${J}), last);`);for(let J=0;J<$;J+=1)for(let Q=0;Q<$;Q+=1){if(Q<1||J<1||Q>$-2||J>$-2)continue;let X=`${z(Q,J)}.rgb`;v.push(`  asked = min(asked, ${z(Q,J)}.w);`,`  top = max(top, ${X});`,`  excess = max(excess, abs(${z(Q-1,J)}.rgb - 2.0 * ${X} + ${z(Q+1,J)}.rgb) + abs(${z(Q,J-1)}.rgb - 2.0 * ${X} + ${z(Q,J+1)}.rgb) - ${X} * ${A2.toFixed(9)});`)}return`@fragment fn skyHalfFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${q}  let full = in.position.xy * 2.0;
  let ndc = vec2<f32>(full.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - full.y / frame.viewportSize.y * 2.0);
  let direction = normalize(${T});
  let halfPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);
  sky_starLight = vec3<f32>(0.0);
  if (!sky_halfOpen(vec2<i32>(in.position.xy))) {
    return vec4<f32>(0.0);
  }
  if (sky.cloudMap <= 0.5 && sky.cloudInterior >= 1.5 && sky.cloudsEnabled >= 0.5 && sky_domeCloudSteps() > 0u) {
    return vec4<f32>(0.0);
  }
  let asked = sky_scripted(direction, halfPixelAngle, frame.worldTime, 0u, 0.5, sky.cloudMap);
  return vec4<f32>(asked, 1.0);
}

@fragment fn skyHalfTilesFs(in: SkyVsOut) -> @location(0) vec4<f32> {
  let tile = vec2<i32>(in.position.xy);
  let last = vec2<i32>(textureDimensions(skyHalf)) - vec2<i32>(1);
  let base = tile * ${f/2} - vec2<i32>(2);
  var asked = 1.0;
  var top = vec3<f32>(0.0);
  var excess = vec3<f32>(-1.0);
${v.join(`
`)}
  var marked = asked < 1.0 || any(top >= vec3<f32>(${I2.toFixed(1)})) || (skybox.halfAlone < 0.5 && any(excess > vec3<f32>(1e-6)));
  let starDims = vec2<i32>(textureDimensions(skyStarLayer));
  if (starDims.x > 1) {
    let starLast = starDims - vec2<i32>(1);
    for (var y = 0; y < ${f}; y += 1) {
      for (var x = 0; x < ${f}; x += 1) {
        marked = marked || any(textureLoad(skyStarLayer, clamp(tile * ${f} + vec2<i32>(x, y), vec2<i32>(0), starLast), 0).rgb != vec3<f32>(0.0));
      }
    }
  }
  return vec4<f32>(select(0.0, 1.0, marked), 0.0, 0.0, 1.0);
}

@fragment fn skyBlendFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${q}${_}  let ndc = in.ndc;
  let direction = normalize(${T});
  return sky_domeFinish(direction, in.position.xy, sky_halfBlend(in.position.xy));
}

@vertex fn skyTileVs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) tileIndex: u32) -> SkyVsOut {
  let grid = textureDimensions(skyHalfTiles);
  let tile = vec2<u32>(tileIndex % grid.x, tileIndex / grid.x);
  let corner = vec2<f32>(f32((0x32u >> vertexIndex) & 1u), f32((0x2Cu >> vertexIndex) & 1u));
  let pixel = min((vec2<f32>(tile) + corner) * ${f}.0, frame.viewportSize);
  let marked = textureLoad(skyHalfTiles, vec2<i32>(tile), 0).r > 0.5;
  let ndc = select(vec2<f32>(2.0), vec2<f32>(pixel.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - pixel.y / frame.viewportSize.y * 2.0), marked);
  var out: SkyVsOut;
  out.position = vec4<f32>(ndc, ${b}, 1.0);
  out.ndc = ndc;
  return out;
}
`}function y1(){return (y1=$c0C(3)).call(this)}var B0=`${h}
${Y(!0)}
${r}
@group(1) @binding(0) var<uniform> passLights: PassLights;
${Y2(1)}
${n2}
${a2}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(3) @binding(1) var equirectTex: texture_2d<f32>;
@group(3) @binding(2) var equirectSampler: sampler;
@group(3) @binding(3) var equirectBlurCube: texture_2d_array<f32>;`,f0=`
  @location(1) @interpolate(flat) heldSun: vec4<f32>,
  @location(2) @interpolate(flat) heldLight: vec4<f32>,
  @location(3) @interpolate(flat) heldFlat: vec4<f32>,
  @location(4) @interpolate(flat) heldSubUv: vec4<f32>,`,w0=`
  let held = sky_holdView();
  out.heldSun = vec4<f32>(held.sunToward, held.sunUp);
  out.heldLight = vec4<f32>(held.sunLight, held.horizonZenith);
  out.heldFlat = vec4<f32>(held.sunFlat, held.tintPlain);
  out.heldSubUv = held.subUv;`,x0=`  sky_held = SkyHeld(in.heldSun.xyz, in.heldSun.w, in.heldLight.xyz, in.heldLight.w, in.heldFlat.xyz, in.heldFlat.w, in.heldSubUv);
`;function u0(a){return (u0=$c0C(4)).call(this,a)}var Z0=`    let rise = sky.cloudEye.y - sky.cloudsAltitudeM - sky.cloudsThicknessM;
    if (clouds.a > 0.0 && direction.y < 0.0 && rise > 0.0 && frame.proj[2][3] != 0.0) {
      let reach = rise / -direction.y;
      let depth = reach * max(-(frame.view * vec4<f32>(direction, 0.0)).z, 1e-3);
      color = mix(color, mix(clouds.rgb, fogColor, shade_fogFactor(depth, direction.y * reach)), clouds.a * fog);
    }
`,K0=`
  let fog = shade_skyFogFactor(direction, skybox.fogSky, skybox.openSky);
  var fogColor = vec3<f32>(0.0);
  if (fog > 0.0 || skybox.groundShare > 0.0) {
    fogColor = shade_fogLean(direction, shade_fogTurn(direction));
  }
  if (fog > 0.0) {
    color = mix(color, fogColor, fog);
    let clouds = sky_deck;
${Z0}  }
`,D0=`fn sky_bodySpan(across: f32, forward: f32, sine: f32) -> vec2<f32> {
  let reach = across * across + forward * forward - sine * sine;
  if (reach <= 0.0) { return vec2<f32>(-1e30, 1e30); }
  let k = sqrt(reach);
  let low = forward * k + across * sine;
  let high = forward * k - across * sine;
  return vec2<f32>(select(-1e30, (across * k - forward * sine) / low, low > 0.0), select(1e30, (across * k + forward * sine) / high, high > 0.0));
}

fn sky_bodyNdc(body: u32, corner: vec2<f32>) -> vec2<f32> {
  if (body == 0u) { return corner * 2.0 - 1.0; }
  let moon = body == 2u;
  let sunRadius = max(sky.sunDiskAngularRadius, 1e-4);
  let sunCos = 1.0 - sunRadius * sunRadius;
  let moonRadius = max(sky.moonAngularRadius, 1e-4);
  let disc = select(select(sqrt(max(1.0 - sunCos * sunCos, 0.0)), 1.0, sunCos <= 0.0), select(sin(moonRadius), 1.0, moonRadius >= 1.5), moon);
  let sine = min(disc * 1.02 + 0.001, 1.0);
  let toward = mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz) * normalize(select(sky.sunDirection, sky.moonDirection, moon));
  if (frame.proj[2][3] == 0.0 || -toward.z <= -sine) { return vec2<f32>(2.0); }
  let x = sky_bodySpan(toward.x, -toward.z, sine) * frame.proj[0][0] - frame.proj[2][0];
  let y = sky_bodySpan(toward.y, -toward.z, sine) * frame.proj[1][1] - frame.proj[2][1];
  let pad = 4.0 / frame.viewportSize;
  let low = clamp(vec2<f32>(min(x.x, x.y), min(y.x, y.y)) - pad, vec2<f32>(-1.0), vec2<f32>(1.0));
  let high = clamp(vec2<f32>(max(x.x, x.y), max(y.x, y.y)) + pad, vec2<f32>(-1.0), vec2<f32>(1.0));
  return low + corner * (high - low);
}
`;function N0(j,q){let $=j?"sky_scripted":"sky_radiance",z=!j;return`${B0}
${j?W0+a0:""}${s}

struct SkyVsOut {
  @builtin(position) position: vec4<f32>,
  @location(0) ndc: vec2<f32>,${z?f0:""}
}

${z?D0:""}@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32${z?", @builtin(instance_index) body: u32":""}) -> SkyVsOut {
${N}  var out: SkyVsOut;
  let ndc = ${z?"sky_bodyNdc(body, corner)":"corner * 2.0 - 1.0"};
  out.position = vec4<f32>(ndc, ${b}, 1.0);
  out.ndc = ndc;${z?w0:""}
  return out;
}

${u0(null)}

${j?"":b0}
@fragment fn skyFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${q?V0:""}${_}${z?x0:""}
  var direction: vec3<f32>;
  if (frame.proj[2][3] != 0.0) {
    let ndc = in.ndc;
    direction = normalize(${T});
  } else {
    let nearPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${o}, 1.0);
    let farPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${b}, 1.0);
    direction = normalize(farPoint.xyz / farPoint.w - nearPoint.xyz / nearPoint.w);
  }
${j?`  let outputPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);
  let cloudJitter = ${u("in.position.xy")};
  sky_starLight = sky_starLayerAt(in.position.xy);
  let scripted = ${$}(direction, outputPixelAngle, frame.worldTime, sky_domeCloudSteps(), cloudJitter, sky.cloudMap);
`:""}
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${H}.0) {
    color = sky_domeGradient(direction, in.position.xy);
  } else if (kind == ${C}.0) {
${j?"    color = mix(sky_domeGradient(direction, in.position.xy), scripted, skybox.physicalBlend);":`
    let night = sky_nightAt(direction, sky_sunToward());
    var radiance = vec3<f32>(0.0);
    if (skybox.flatShare < 1.0) {
      var layer = vec4<f32>(0.0);
      if (sky.cloudMap > 0.5 || sky.cloudsEnabled > 0.5) {
        let cloudJitter = ${u("in.position.xy")};
        layer = sky_cloudLayerShown(direction, sky.cloudMap, direction, sky_domeCloudSteps(), cloudJitter);
      }
      radiance = sky_radianceLayer(direction, layer, night);
    }
    if (skybox.flatShare > 0.0) {
      radiance = mix(radiance, sky_flatRadiance(direction, night), skybox.flatShare);
    }
    color = radiance;
    if (skybox.physicalBlend < 1.0) {
      color = mix(sky_domeGradient(direction, in.position.xy), radiance, skybox.physicalBlend);
    }
    sky_deck.a = sky_deck.a * (1.0 - skybox.flatShare) * skybox.physicalBlend;`}
  } else if (kind == ${d}.0) {
    let cosYaw = cos(skybox.equirectYaw);
    let sinYaw = sin(skybox.equirectYaw);
    let rotated = vec3<f32>(direction.x * cosYaw - direction.z * sinYaw, direction.y, direction.x * sinYaw + direction.z * cosYaw);
    let pixelAngle = length(fwidth(direction));
    let texelsPerRadian = skybox.equirectWidth * ${1/n};
    let lod = max(log2(max(pixelAngle * texelsPerRadian, 1e-6)), 0.0);
    let sharp = textureSampleLevel(equirectTex, equirectSampler, sky_equirectUv(rotated), lod).rgb;
    let blurred = lume_cubeSampleLevel(equirectBlurCube, equirectSampler, direction, skybox.equirectBlurMip, skybox.equirectBlurLevels).rgb;
    color = mix(sharp, blurred, skybox.equirectBlurLane);
  }
${K0}  if (skybox.groundShare > 0.0) {
    let lit = skybox.groundColor * (0.31830988618 * (passLights.ambientMean + max(passLights.sunDirection.y, 0.0) * passLights.sunColor * passLights.sunIntensity));
    let ground = mix(lit, fogColor, shade_fogFactor(${E2}.0 / max(-direction.y, 1e-4), direction.y));
    color = mix(color, ground, skybox.groundShare * (1.0 - smoothstep(-0.002, 0.0, direction.y)));
  }
  return vec4<f32>(color, 1.0);
}
`}function Y0(j,q){let $=N0(j,q);return j?n0($,q):$}function n0(a,b){return (n0=$c0C(5)).call(this,a,b)}function A0(a){return (A0=$c0C(6)).call(this,a)}function I0(a){return (I0=$c0C(7)).call(this,a)}function H1(a){return (H1=$c0C(8)).call(this,a)}var j2=2,l0=K*(3-Math.sqrt(5)),p=256,W=p/2;function C1(){return`
${Z}
${x({sunDisc:!1,group:j2})}
${h}
@group(1) @binding(${L2}) var<storage, read_write> skyFlatCloudOut: SkyBackground;
var<workgroup> skyFlatCloudSum: array<vec4<f32>, ${W}>;

fn sky_flatCloudRay(direction: vec3<f32>) -> vec4<f32> {
  let layer = sky_cloudLayer(direction, 0u, 0.5);
  if (layer.w <= 0.0) {
    return vec4<f32>(0.0);
  }
  let sunDirection = normalize(sky.sunDirection);
  let night = sky_night(direction, sunDirection, sky_transmittance(direction));
  let lit = sky_cloudsLit(layer, direction, sky_sunRadiance(sunDirection), sky_cloudAmbient(direction, sunDirection, night.moonlit));
  return vec4<f32>(lit.rgb * lit.a, lit.a);
}

fn sky_flatCloudRayAt(i: u32) -> vec4<f32> {
  let up = (f32(i) + 0.5) / ${p}.0;
  let azimuth = f32(i) * ${l0.toFixed(9)};
  let across = sqrt(max(1.0 - up * up, 0.0));
  return sky_flatCloudRay(vec3<f32>(cos(azimuth) * across, up, sin(azimuth) * across));
}

@compute @workgroup_size(${W})
fn flatCloudCs(@builtin(local_invocation_index) ray: u32) {
  skyFlatCloudSum[ray] = sky_flatCloudRayAt(ray) + sky_flatCloudRayAt(ray + ${W}u);
  workgroupBarrier();
  for (var stride = ${W/2}u; stride > 0u; stride = stride / 2u) {
    if (ray < stride) {
      skyFlatCloudSum[ray] = skyFlatCloudSum[ray] + skyFlatCloudSum[ray + stride];
    }
    workgroupBarrier();
  }
  if (ray == 0u) {
    skyFlatCloudOut.flatCloud = skyFlatCloudSum[0] / ${p}.0;
  }
}
`}function T1(){return`
${Z}
${x({sunDisc:!1,group:j2})}
${W2()}
@group(1) @binding(0) var<uniform> cloudMapParams: CloudMapParams;
@group(1) @binding(1) var<storage, read_write> cloudMapRw: array<u32>;
${g("cloudMapRw","Rw","cloudMapParams.half","cloudMapParams.frame")}

var<workgroup> cloudMapEntry: u32;

@compute @workgroup_size(${y}, ${y})
fn cloudMapCs(@builtin(workgroup_id) group: vec3<u32>, @builtin(local_invocation_id) local: vec3<u32>, @builtin(local_invocation_index) lane: u32) {
  let side = u32(cloudMapParams.side);
  let perSide = side / ${y}u;
  let stamped = ${C2}u | (sky_cloudMapStamp(cloudMapParams.frame) << ${T2}u);
  for (var block = group.x; block < perSide * perSide; block = block + ${g2}u) {
    if (lane == 0u) {
      cloudMapEntry = cloudMapRw[${y2}u + block];
    }
    let entry = workgroupUniformLoad(&cloudMapEntry);
    if ((entry & ~${h2}u) == stamped) {
      sky_cloudMapMarchTexel(vec2<u32>(block % perSide, block / perSide) * ${y}u + local.xy, entry);
    }
  }
}

fn sky_cloudMapMarchTexel(id: vec2<u32>, entry: u32) {
  let side = u32(cloudMapParams.side);
  let texel = vec2<f32>(id.xy) + 0.5;
  let direction = sky_cloudMapDirection(texel / cloudMapParams.side);
  let t = vec2<i32>(id.xy);
  if (sky_cloudMapOtherHalf(t, i32(side), cloudMapParams.half)) {
    return;
  }
  let index = sky_cloudMapWordAt(t, entry, cloudMapRw[${H2}]);
  let tag = cloudMapRw[index + 1u];
  let frameStamp = sky_cloudMapStamp(cloudMapParams.frame);
  var count = sky_cloudMapCount(tag);
  if (((frameStamp - sky_cloudMapStamp(tag)) & ${L}u) > ${l}u) {
    count = 0u;
  }
  let clip = frame.viewProj * vec4<f32>(direction, 0.0);
  let margin = cloudMapParams.texelAngle * 4.0 * vec2<f32>(frame.proj[0][0], frame.proj[1][1]);
  if (clip.w <= 1e-6 || any(abs(clip.xy / clip.w) > 1.0 + margin)) {
    if (count == 0u && sky_cloudMapCount(tag) > 0u) {
      cloudMapRw[index + 1u] = tag & ~(${F2}u << ${M2}u);
    }
    return;
  }
  var history = sky_cloudMapDecode(cloudMapRw[index], tag);
  let eyeDelta = sky.cloudEye - cloudMapParams.prevEye;
  if (count > 0u && dot(eyeDelta, eyeDelta) > ${c*c}.0) {
    count = 0u;
  }
  if (count > 0u && dot(eyeDelta, eyeDelta) > 1e-6) {
    let tBase = sky_cloudPlaneDistance(direction, sky.cloudsAltitudeM);
    let tTop = sky_cloudPlaneDistance(direction, sky.cloudsAltitudeM + sky.cloudsThicknessM);
    let tNear = min(max(tBase, 0.0), max(tTop, 0.0));
    let tFar = min(max(max(tBase, 0.0), max(tTop, 0.0)), tNear + SKY_CLOUD_SLAB_REACH_M);
    if (tNear > 0.0 && tFar < 3.0 * tNear) {
      let depth = 2.0 / (1.0 / tNear + 1.0 / tFar);
      let previous = sky_cloudMapUv(normalize(sky.cloudEye + direction * depth - cloudMapParams.prevEye)) * cloudMapParams.side;
      if (any(abs(previous - texel) > vec2<f32>(0.1))) {
        let previousTag = sky_cloudMapTapRw(vec2<i32>(floor(previous)), i32(side)).y;
        let previousValid = ((frameStamp - sky_cloudMapStamp(previousTag)) & ${L}u) <= ${l}u;
        history = sky_cloudMapBilinearRw(previous, i32(side));
        count = min(count, select(0u, sky_cloudMapCount(previousTag), previousValid));
      }
    }
  }
  let texelIndex = f32(id.y * side + id.x);
  let jitter = fract(shade_hash11(texelIndex) + f32(frameStamp) * 0.6180339887);
  let angularSeed = vec2<f32>(shade_hash11(texelIndex + 17.0), shade_hash11(texelIndex + 113.0));
  let marches = select(1u, max(cloudMapParams.youngMarches, 1u), count < ${U2}u);
  var sample = vec4<f32>(0.0);
  for (var k = 0u; k < marches; k = k + 1u) {
    let angularSample = f32(frameStamp) * f32(marches) + f32(k);
    let angularOffset = fract(angularSeed + angularSample * vec2<f32>(0.7548776662, 0.5698402910));
    let sampleDirection = sky_cloudMapDirection((vec2<f32>(id.xy) + angularOffset) / cloudMapParams.side);
    let current = sky_cloudLayer(sampleDirection, u32(sky.cloudSteps), fract(jitter + f32(k) / f32(marches)));
    sample = sample + vec4<f32>(current.xyz * current.w, current.w);
  }
  sample = sample / f32(marches);
  let settled = mix(sample, history, min(cloudMapParams.historyWeight, f32(count) / f32(count + 1u)));
  let words = sky_cloudMapEncode(settled, count + 1u, frameStamp);
  cloudMapRw[index] = words.x;
  cloudMapRw[index + 1u] = words.y;
}
`}var w=8,h1=N2*w*V*16,g1=R+1,k2=(j)=>D2.reduce((q,$,z)=>`select(${q}, ${$.toFixed(4)}, ${j} == ${z+1}u)`,D.toFixed(4)),c0=`fn sky_stepMedian(first: u32) -> vec3f {
${"0:0 1:32 2:64 3:96 4:128 5:160 6:192 7:224".replace(/(\d):(\d+) ?/g,`  var r$1 = fogHorizonRays[first + $2u].xyz;
`)}${"0:01 1:23 2:45 3:67 4:02 5:13 6:46 7:57 8:12 9:56 10:04 11:15 12:26 13:37 14:24 15:35 16:12 17:34 18:56".replace(/(\d+):(\d)(\d) ?/g,`  let lo$1 = min(r$2, r$3);
  r$3 = max(r$2, r$3);
  r$2 = lo$1;
`)}  return r3 * 0.5 + r4 * 0.5;
}`,L0=1,W1=2,P2=3,a1=4,E0=`struct SkyOffscreen {
  faceIndex: u32,
  toneMap: f32,
  _pad: u32,
  horizon: u32,
}
@group(1) @binding(${r2}) var<uniform> skyOffscreen: SkyOffscreen;`,m0="select(skyOffscreen.toneMap, frame.toneMap, skyOffscreen.horizon != 0u)";function p0(j,q){let $=j?"sky_scripted":"sky_radiance",z=n/V,v=Math.sqrt(1-D*D).toFixed(9),J=j?`    let phi = (f32(index) + (f32(strand) + 0.5) / ${w}.0 - 0.5) * ${z.toFixed(9)};`:`    let sunToward = normalize(sky.sunDirection);
    let along = (f32(index) + (f32(strand) + 0.5) / ${w}.0 - 0.5) * ${(2/V).toFixed(9)};
    let share = along - 2.0 * floor((along + 1.0) * 0.5);
    let phi = select(atan2(sunToward.z, sunToward.x), 0.0, length(sunToward.xz) < 1e-6) + ${K.toFixed(9)} * share * abs(share);`;return`${h}
${Y(!0)}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(1) @binding(${p2}) var<storage, read_write> fogHorizonOut: array<vec4<f32>>;
@group(1) @binding(${o2}) var<storage, read_write> fogHorizonRays: array<vec4<f32>>;
${E0}
${v0}
${Q2}
${j?"":b0}
${c0}
@fragment fn offscreenFs(in: FullscreenOut) -> @location(0) vec4<f32> {
${q?`  sky_toneMapWord = ${m0};
`:""}  sky_tintsLayer = f32(skyOffscreen.horizon == 0u);
  let horizon = skyOffscreen.horizon != 0u;
  let mirror = horizon && skyOffscreen.horizon >= ${P2}u;
  let faceDirection = env_cubeFaceDirection(skyOffscreen.faceIndex, in.uv);
  let faceAngle = length(fwidth(faceDirection));
  let index = u32(in.position.x);
  let ray = u32(in.position.y) / 2u;
  let perspective = frame.proj[2][3] != 0.0;
  let picture = 2.0 / max(abs(frame.proj[1][1]) * frame.canvasSize.y, 1.0);
  let pixelAngle = select(faceAngle, select(${z.toFixed(6)}, picture, perspective), horizon);
  let t = select(0.0, frame.worldTime, horizon);
  var direction = faceDirection;
  if (horizon) {
    let strand = ray % ${w}u;
    let rise = ${k2(`ray / ${w}u`)};
    let level = select(sqrt(max(1.0 - rise * rise, 0.0)), ${v}, ray < ${w}u);
${J}
    let mirrorPhi = (f32(index) + 0.5) * ${(K/B).toFixed(9)};
    let up = (f32(ray) + 0.5) / ${E}.0 - 1.0;
    let ring = sqrt(max(1.0 - up * up, 0.0));
    direction = select(vec3<f32>(cos(phi) * level, rise, sin(phi) * level), vec3<f32>(cos(mirrorPhi) * ring, up, sin(mirrorPhi) * ring), mirror);
  }
  var radiance = vec3<f32>(0.0) + ${$}(direction, pixelAngle, t, min(u32(sky.cloudSteps), ${X0}u), 0.5${j?", 0.0":""});
${j?"":`
  if (horizon && !mirror && skybox.flatShare > 0.0) {
    radiance = mix(radiance, sky_flatRadiance(direction, sky_nightAt(direction, sky_sunToward())), skybox.flatShare);
  }
`}  if (!horizon) {
    return vec4<f32>(radiance, 1.0);
  }
  if (skyOffscreen.horizon == ${L0}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${V}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  if (skyOffscreen.horizon == ${P2}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${2*B}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  let row = u32(in.position.y);
  let ringRow = !mirror && row > 0u;
  if (ringRow && index >= ${V}u) {
    return vec4<f32>(0.0);
  }
  let rise = select(${k2("row")}, max((f32(row) + 0.5) * ${(2/E).toFixed(9)} - 1.0, 0.0), mirror);
  let curved = select(pow(rise, skybox.gradientCurve), rise, skybox.gradientCurve == 1.0);
  let gradient = mix(skybox.horizonColor, skybox.zenithColor, curved);
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${H}.0) {
    color = gradient;
  } else if (kind == ${C}.0) {
    radiance = vec3<f32>(0.0);
    if (mirror) {
      let first = 2u * row * ${2*B}u + 2u * index;
      let a = fogHorizonRays[first].xyz;
      let b = fogHorizonRays[first + 1u].xyz;
      let c = fogHorizonRays[first + ${2*B}u].xyz;
      let d = fogHorizonRays[first + ${2*B+1}u].xyz;
      radiance = (a + b + c + d - max(max(a, b), max(c, d)) - min(min(a, b), min(c, d))) * 0.5;
    } else if (index < ${V}u) {
      radiance = sky_stepMedian(row * ${w*V}u + index);
    } else if (index == ${G2}u) {
${j?`
      for (var each = 0u; each < ${V}u; each++) {
        radiance += sky_stepMedian(each);
      }
      radiance /= ${V}.0;`:`
      for (var each = 0u; each < ${V}u; each++) {
        let u = (f32(each) + vec2f(-0.5, 0.5)) * ${(2/V).toFixed(9)};
        let g = select(u * abs(u), 2.0 - (2.0 - u) * (2.0 - u), u > vec2f(1.0));
        radiance += sky_stepMedian(each) * (g.y - g.x);
      }
      radiance *= 0.5;`}
    }
    color = mix(gradient, radiance, skybox.physicalBlend);
  }
  let sunEntry = ${j?"vec4<f32>(0.0)":`vec4<f32>(normalize(sky.sunDirection), select(0.0, 1.0, kind == ${C}.0))`};
  let at = select(select(index, ${K2}u + (row - 1u) * ${V}u + index, ringRow), row * ${B}u + index, mirror);
  fogHorizonOut[at] = select(vec4<f32>(color, select(select(${j?"sky_scriptWarmAir":"1.0"}, skybox.fogSky, ringRow), 1.0 + skybox.openSky, mirror)), sunEntry, !mirror && !ringRow && index == ${R}u);
  return vec4<f32>(0.0);
}
`}function G1(j){return`// lume sky offscreen reader - the light's capture and the fog's table over one radiance call
${Z}
${j?`${r}
@group(1) @binding(${R2}) var<uniform> passLights: PassLights;
`:""}${x({sunDisc:!1,group:j2,toneMapWgsl:m0,...j?{script:{defs:j.defs,body:j.body,paramsStruct:j.paramsStruct,paramsBinding:{group:3,binding:e},...j.grids?{grids:j.grids}:{}}}:{}})}
${p0(j!==void 0,!1)}`}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{Cfo as m2,Gw5 as X0,zNe as Z2}from"./1ae8c261-e8cfc2badbd84146.mjs";import{wj8 as v0}from"./15ea558ca116591f.mjs";export{C1 as ZKm,G1 as i7m,H1 as HK_,L0 as mnt,P2 as r$K,Q2 as Yo4,T0 as lHV,T1 as edbz,U1 as sqJ,W1 as Yia,Y0 as omX,a1 as IB_,g1 as HCB,h1 as CSR,j2 as xce,p0 as NM0,w as SoE,x as WqO,y1 as hsW};
