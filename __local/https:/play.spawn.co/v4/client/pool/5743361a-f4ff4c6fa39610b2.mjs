import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(){return`${Hj}\n@group(0) @binding(1) var<uniform> bake: SkyBake;\n@group(0) @binding(2) var cloudMask: texture_2d_array<f32>;\n@group(0) @binding(3) var cloudMaskSampler: sampler;\n\n${wj("cloudMask","cloudMaskSampler")}\nfn bake_run(dest: u32, extent: u32, span: u32, run: u32) -> vec2<f32> {\n  let end = dest + extent;\n  switch (run) {\n    case 0u: { return vec2<f32>(f32(dest), f32(min(end, span))); }\n    case 1u: { return vec2<f32>(0.0, f32(max(end, span) - span)); }\n    default: { return select(vec2<f32>(0.0), vec2<f32>(f32(span), f32(span) + 1.0), dest == 0u || end > span); }\n  }\n}\n\n@vertex\nfn bakeRun(@builtin(vertex_index) corner: u32, @builtin(instance_index) run: u32) -> @builtin(position) vec4<f32> {\n  let x = bake_run(bake.fieldDestX, bake.width, bake.fieldSpan, run % 3u);\n  let y = bake_run(bake.fieldDestY, bake.height, bake.fieldSpan, run / 3u);\n  let at = vec2<f32>(select(x.x, x.y, (corner & 1u) == 1u), select(y.x, y.y, corner > 1u)) * 2.0 / f32(bake.fieldSpan + 1u) - 1.0;\n  return vec4<f32>(at.x, -at.y, 0.0, 1.0);\n}\n\n@fragment\nfn bakeFar(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {\n  let span = vec2<u32>(bake.fieldSpan);\n  let gid = (vec2<u32>(position.xy) % span + span - vec2<u32>(bake.fieldDestX, bake.fieldDestY)) % span;\n  let texel = bake_cloudField(bake.fieldPlaneOrigin + (vec2<f32>(gid) + 0.5) * bake.fieldTexel);\n  let quarters = round(saturate(texel.r) * 4092.0);\n  let high = floor(quarters * 0.25);\n  return vec4<f32>(high / 1023.0, texel.g, texel.b, (quarters - high * 4.0) / 3.0);\n}\n`})',()=>'(function(j,q,$){let z=j.createShaderModule({label:q,code:bj()});return{label:q,layout:$,vertex:{module:z,entryPoint:"bakeRun"},fragment:{module:z,entryPoint:"bakeFar",targets:[{format:fj}]},primitive:{topology:"triangle-strip"}}})',()=>'(function(j,q,$,z,J){let Y=o(j,{label:q,size:{width:1,height:1,depthOrArrayLayers:$},format:w,usage:z},(N)=>J((N.createView({label:q,dimension:"2d-array"}))));return ((Y.resource).createView({label:q,dimension:"2d-array"}))})',()=>"(function(j,q,$,z){let J;y$$:{let q=u.get(j);if(q){J=q;break y$$;}J=ca(j);}return j.createBindGroup({label:$,layout:q,entries:[{binding:0,resource:z.sky??{buffer:J.skyBuffer}},{binding:1,resource:{buffer:z.params,offset:z.paramsOffset??0,size:Zj}},{binding:2,resource:z.transmittanceLut??J.sampled2d},{binding:3,resource:z.multiScatterLut??J.sampled2d},{binding:4,resource:z.sampler??J.sampler},{binding:5,resource:z.target??J.storage2d},{binding:6,resource:z.arrayTarget??J.storageArray},{binding:8,resource:z.captureArray??J.sampledArray},{binding:9,resource:{buffer:z.shOut??J.shBuffer}},{binding:10,resource:{buffer:z.shFrom??J.shRead}},{binding:11,resource:{buffer:z.shTo??J.shRead}},{binding:12,resource:z.cloudFieldFar??J.sampled2d}]})})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,4,3698478223982592);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[2,3]]);
;const{BE2:g,Cdy:F,Ck1:i,EiQ:n,FKD:S,JKU:D,Me$:r,N4y:zj,NU1:a,O4w:d,Q6V:C,QDv:jj,VPA:k,X0w:p,ZZw:E,_rr:H,bli:o,dvf:e,f8P:I,hSg:W,jC6:t,jqS:b,nhK:R,nzB:h,r1H:qj,w1F:T,wRZ:X,wXdl:l,wwl:x,xca:_,yjv:L,z98:s}=$Lr;
;;;var w="rgba16float",fj="rgb10a2unorm",M=8,Cj="sky/bake/v1",Mj="sky/cloud-field-bake/far",Gj=0,Wj=1,Dj=2,Pj=3,Uj=4,Yj=5,Fj=6,kj=7,Rj=8,A=-16,U=20,Zj=U*4,xj=new Float32Array(1),hj=new Uint32Array(xj.buffer);function Ij(j,q){if(j.length<U){{throw Error(`lume sky bake: params array needs ${U} words, got ${j.length}`);
}}j[0]=q.mode;j[1]=q.width??0;j[2]=q.height??0;j[3]=q.samples??0;j[4]=q.octavesBase??0;j[5]=l;j[6]=(xj[0]=(q.roughness??0),hj[0]);j[7]=q.field?.dest[0]??0;j[8]=(xj[0]=(q.field?.planeOrigin[0]??0),hj[0]);j[9]=(xj[0]=(q.field?.planeOrigin[1]??0),hj[0]);j[10]=(xj[0]=(q.field?.texel??0),hj[0]);j[11]=q.field?.dest[1]??0;j[13]=q.octavesCoarse??q.octavesBase??0;j[14]=q.field?.span??0;j[15]=(xj[0]=(q.weight??0),hj[0]);return j}function $q(j,q,$=1,z=[0,0,0]){return z[0]=Math.ceil(j/M),z[1]=Math.ceil(q/M),z[2]=$,z}var Hj=`struct SkyBake {
  mode: u32,
  width: u32,
  height: u32,
  samples: u32,
  octavesBase: u32,
  puffJobs: u32,
  roughnessBits: u32,
  fieldDestX: u32,
  fieldPlaneOrigin: vec2<f32>,
  fieldTexel: f32,
  fieldDestY: u32,
  unused12: u32,
  octavesCoarse: u32,
  fieldSpan: u32,
  weightBits: u32,
  eye: vec4<f32>,
}`,Tj=`
const SKY_BAKE_EYE_TAPS = 2048u;
const SKY_BAKE_EYE_WEDGE_SOFT = 0.17;
const SKY_BAKE_GOLDEN_ANGLE = 2.399963230;

fn sky_cloudColumnClear(field: f32) -> f32 {
  return sky_cloudClear(1.0 - exp(-sky_cloudDensity(field) * sky.cloudsDensity * SKY_CLOUD_PSEUDO_THICKNESS));
}

fn sky_cloudBeam(planePos: vec2<f32>, fade: f32) -> f32 {
  let fieldUv = (planePos - sky.cloudFieldCenter) * sky.cloudFieldInvWidth + 0.5;
  let lobe = sky_cloudFieldFarOf(textureSampleLevel(cloudFieldFar, lutSampler, sky_cloudFieldWrapUv(fieldUv, sky.cloudFieldPhase, textureDimensions(cloudFieldFar)), 0, 0.0)).x;
  return min(mix(sky_cloudColumnClear(lobe), 1.0, 1.0 - sky_cloudFieldRim(fieldUv) * fade), sky_cloudColumnClear(sky_cloudSheet()));
}

fn sky_groundBeam(ground: vec2<f32>, sun: vec3<f32>, rise: f32) -> f32 {
  let foot = ground + sun.xz * (rise / sun.y);
  let basePoint = vec3<f32>(foot.x, sky.cloudsAltitudeM, foot.y);
  let fade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * rise, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * rise, SKY_CLOUD_FADE_FLOOR_M * 3.0), distance(basePoint, sky.cloudEye));
  return sky_cloudBeam(sky_cloudPlanePos(basePoint), fade);
}

fn bake_foldLanes(lane: u32, sum: vec3<f32>) -> vec3<f32> {
  reduceShared[lane] = sum;
  workgroupBarrier();
  for (var stride = ${P/2}u; stride > 0u; stride /= 2u) {
    if (lane < stride) {
      reduceShared[lane] = reduceShared[lane] + reduceShared[lane + stride];
    }
    workgroupBarrier();
  }
  return reduceShared[0];
}

fn bake_eyeShadow(lane: u32) {
  let sun = sky_lightBody();
  let rise = sky.cloudsAltitudeM - sky.cloudEye.y;
  let shades = sky.cloudsEnabled >= 0.5 && rise > 0.0 && sun.y > 0.02;
  var sum = vec3<f32>(0.0);
  if (shades) {
    let reach = max(SKY_CLOUD_FADE_NEAR * rise, SKY_CLOUD_FADE_FLOOR_M);
    let level = length(bake.eye.xy);
    let heading = bake.eye.xy / max(level, 1e-6);
    let halfWidth = atan(1.0 / max(bake.eye.z, 1e-6));
    let wedgeOpen = 1.0 - smoothstep(0.1, 0.4, level) * (1.0 - bake.eye.w);
    let edgeIn = cos(halfWidth);
    let edgeOut = cos(min(halfWidth + SKY_BAKE_EYE_WEDGE_SOFT, 3.14159265));
    for (var tap = lane; tap < SKY_BAKE_EYE_TAPS; tap += ${P}u) {
      let radial = sqrt((f32(tap) + 0.5) / f32(SKY_BAKE_EYE_TAPS));
      let azimuth = f32(tap) * SKY_BAKE_GOLDEN_ANGLE;
      let toward = vec2<f32>(cos(azimuth), sin(azimuth));
      let weight = mix(smoothstep(edgeOut, edgeIn, dot(toward, heading)), 1.0, wedgeOpen);
      let beam = sky_groundBeam(sky.cloudEye.xz + toward * (radial * reach), sun, rise);
      sum += vec3<f32>(beam * weight, weight, beam);
    }
  }
  let total = bake_foldLanes(lane, sum);
  if (lane == 0u) {
    var share = 1.0;
    if (shades) {
      let mean = select(total.z / f32(SKY_BAKE_EYE_TAPS), total.x / total.y, total.y > 0.5);
      share = mix(1.0, mean, smoothstep(0.02, 0.15, sun.y));
    }
    shOut[0].x = share;
  }
}
`,gj=`
fn bake_eyeBlock(block: vec2<u32>) -> vec2<f32> {
  var acc = vec2<f32>(0.0);
  for (var j = 0u; j < 2u; j = j + 1u) {
    for (var i = 0u; i < 2u; i = i + 1u) {
      let uv = (vec2<f32>(f32(block.x * 2u + i), f32(block.y * 2u + j)) + vec2<f32>(0.5)) / 32.0;
      let rgb = textureSampleLevel(transmittanceLutTex, lutSampler, uv, 0, 0.0).rgb;
      let raw = dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722));
      let finite = (bitcast<u32>(raw) & 0x7f800000u) != 0x7f800000u;
      let light = min(max(select(0.0, raw, finite), exp2(${A}.0)), 65504.0);
      let off = uv * 2.0 - vec2<f32>(1.0);
      let w = select(0.0, exp(-dot(off, off)), finite);
      acc = acc + vec2<f32>(w * sqrt(light), w);
    }
  }
  return acc;
}

fn bake_eyeMeter(lane: u32) {
  var sum = vec2<f32>(0.0);
  for (var block = lane; block < 16u * 16u; block += ${P}u) {
    sum += bake_eyeBlock(vec2<u32>(block % 16u, block / 16u));
  }
  let total = bake_foldLanes(lane, vec3<f32>(sum, 0.0));
  if (lane == 0u) {
    shOut[0] = vec4<f32>(2.0 * log2(max(total.x / max(total.y, 1e-6), exp2(${A/2}.0))), total.y, select(0.0, 1.0, total.y > 0.0), 0.0);
  }
}
`,v=d/64,wj=(j,q)=>`${zj.source}

${e}
fn bake_blobs(p: vec3<f32>, period: i32) -> f32 {
  let frac = fract(p);
  let whole = vec3<i32>(floor(p));
  let span = vec2(period);
  var sum = 0.0;
  let home = (whole.xy % span + span) % span;
  let lo = -vec2<i32>(frac.xy < vec2(0.7000035));
  let hi = vec2<i32>(frac.xy > vec2(0.2999965));
  for (var x = lo.x; x <= hi.x; x++) {
    for (var y = lo.y; y <= hi.y; y++) {
      var at = home + vec2(x, y);
      at = select(at, at + span, at < vec2(0));
      at = select(at, at - span, at >= span);
      for (var z: i32 = -1; z <= 1; z++) {
        let feature = bake_blobFeature(vec3(at, whole.z + z)) + vec3<f32>(vec3(x, y, z)) - frac;
        let lobe = max(1.0 - dot(feature, feature) / (${h} * ${h}), 0.0);
        sum += exp(${I} * lobe) - 1.0;
      }
    }
  }
  return log(1.0 + sum) / ${I};
}

fn bake_cloudPuffs(base: vec2<f32>, fine: vec2<f32>) -> vec3<f32> {
  var puffs = vec3(0.0);
  for (var job = 0u; job < bake.puffJobs; job++) {
    let channel = job / ${x.length}u;
    let octave = job % ${x.length}u;
    let scale = 1u << octave;
    let at = select(vec3(fine, select(${s}, ${t}, channel == 1u)), vec3(base * ${r}, ${D}), channel == 0u);
    let period = select(${i}, ${a}, channel == 0u);
    let weight = select(select(${x[2]}, ${x[1]}, octave == 1u), ${x[0]}, octave == 0u);
    puffs += select(vec3(0.0), vec3(bake_blobs(at * f32(scale), period * i32(scale)) * weight), vec3(channel) == vec3(0u, 1u, 2u));
  }
  return saturate(puffs);
}

fn bake_cloudMask(position: vec2<f32>) -> f32 {
  let whole = vec2<f32>(textureDimensions(${j}));
  if (any(whole < vec2(2.0))) { return -1.0; }
  let lod = log2(max(bake.fieldTexel * whole.x / ${v}, 1.0));
  let texel = textureSampleLevel(${j}, ${q}, position / ${v}, 0, lod);
  return saturate(dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722)) * texel.a);
}

fn bake_cloudField(position: vec2<f32>) -> vec4<f32> {
  let base = position * ${p};
  let fine = position * ${_};
  let authored = bake_cloudMask(position);
  if (authored >= 0.0) {
    let detail = bake_cloudPuffs(base, fine);
    return vec4(authored, detail.y, detail.z, authored);
  }
  let body = shade_fractal3(vec3(base, ${D}), i32(bake.octavesBase), ${k}, ${R}) * 0.5 + 0.5;
  let puffs = bake_cloudPuffs(base, fine);
  let baseShape = puffs.x * smoothstep(${T}, ${g}, body);
  var coarseShape = baseShape;
  if (bake.octavesCoarse < bake.octavesBase) {
    let coarseBody = shade_fractal3(vec3(base, ${D}), i32(bake.octavesCoarse), ${k}, ${R}) * 0.5 + 0.5;
    coarseShape = puffs.x * smoothstep(${T}, ${g}, coarseBody);
  }
  return vec4(baseShape, puffs.y, puffs.z, coarseShape);
}
`;function Lj(){return`${jj}
${Hj}
@group(0) @binding(0) var<uniform> sky: Sky;
@group(0) @binding(1) var<uniform> bake: SkyBake;
@group(0) @binding(2) var transmittanceLutTex: texture_2d_array<f32>;
@group(0) @binding(3) var multiScatterLutTex: texture_2d_array<f32>;
@group(0) @binding(4) var lutSampler: sampler;
@group(0) @binding(5) var bakeOut: texture_storage_2d_array<${w}, write>;
@group(0) @binding(6) var bakeOutArray: texture_storage_2d_array<${w}, write>;
@group(0) @binding(8) var envCaptureArray: texture_2d_array<f32>;
@group(0) @binding(9) var<storage, read_write> shOut: array<vec4<f32>, ${C}>;
@group(0) @binding(10) var<storage, read> shFrom: array<vec4<f32>, ${C}>;
@group(0) @binding(11) var<storage, read> shTo: array<vec4<f32>, ${C}>;
@group(0) @binding(12) var cloudFieldFar: texture_2d_array<f32>;

${Xj}
${Qj}
${Tj}
${gj}
${$j}
${Jj}
${Vj}
${wj("transmittanceLutTex","lutSampler")}
fn sky_media() -> AtmosphereMedia {
  return AtmosphereMedia(sky.rayleighScattering, sky.mieScattering, sky.ozoneAbsorption, sky.mieAbsorption, sky.groundAlbedo, sky.mieAnisotropy);
}

fn bake_transmittance(uv: vec2<f32>) -> vec4<f32> {
  let media = sky_media();

  let rMu = atm_transmittanceRMuFromUv(uv);
  let viewRadius = rMu.x;
  let cosZenith = rMu.y;

  let origin = vec3(0.0, viewRadius, 0.0);
  let direction = vec3(sqrt(max(1.0 - cosZenith * cosZenith, 0.0)), cosZenith, 0.0);
  let distanceToTop = max(atm_raySphereIntersectNearest(origin, direction, ATM_TOP_RADIUS_KM), 0.0);
  let stepSize = distanceToTop / f32(bake.samples);

  var opticalDepth = vec3(0.0);
  for (var i = 0u; i < bake.samples; i++) {
    let t = (f32(i) + 0.5) * stepSize;
    let samplePosition = origin + direction * t;
    opticalDepth += atm_sampleExtinction(samplePosition, media) * stepSize;
  }

  return vec4(exp(-opticalDepth), 1.0);
}

fn bake_multiScatter(uv: vec2<f32>) -> vec4<f32> {
  let media = sky_media();

  let cosSunZenith = uv.x * 2.0 - 1.0;
  let sunDirection = vec3(sqrt(max(1.0 - cosSunZenith * cosSunZenith, 0.0)), cosSunZenith, 0.0);
  let viewRadius = mix(ATM_PLANET_RADIUS_KM + ATM_PLANET_RADIUS_OFFSET_KM, ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_OFFSET_KM, uv.y);
  let origin = vec3(0.0, viewRadius, 0.0);

  var luminanceTotal = vec3(0.0);
  var multiScatTotal = vec3(0.0);

  for (var d = 0u; d < ${W}u; d++) {
    let gridU = (f32(d % 8u) + 0.5) / 8.0;
    let gridV = (f32(d / 8u) + 0.5) / 8.0;
    let dirCosZenith = 1.0 - gridU * 2.0;
    let dirSinZenith = sqrt(max(1.0 - dirCosZenith * dirCosZenith, 0.0));
    let dirPhi = gridV * 2.0 * ATM_PI;
    let rayDirection = vec3(dirSinZenith * cos(dirPhi), dirCosZenith, dirSinZenith * sin(dirPhi));

    let distanceToGround = atm_raySphereIntersectNearest(origin, rayDirection, ATM_PLANET_RADIUS_KM);
    let distanceToTop = atm_raySphereIntersectNearest(origin, rayDirection, ATM_TOP_RADIUS_KM);
    let marchDistance = select(max(distanceToTop, 0.0), distanceToGround, distanceToGround > 0.0);
    let stepSize = marchDistance / f32(bake.samples);

    var throughput = vec3(1.0);
    var luminance = vec3(0.0);
    var multiScatAs1 = vec3(0.0);

    for (var j = 0u; j < bake.samples; j++) {
      let t = (f32(j) + 0.5) * stepSize;
      let samplePosition = origin + rayDirection * t;
      let sampleRadius = length(samplePosition);
      let upAtSample = samplePosition / max(sampleRadius, 1e-4);
      let cosSunZenithAtSample = dot(upAtSample, sunDirection);

      let extinction = max(atm_sampleExtinction(samplePosition, media), vec3(1e-6));
      let scattering = atm_sampleRayleighScattering(samplePosition, media) + atm_sampleMieScattering(samplePosition, media);
      let transmittanceToSun = atm_sampleTransmittanceLut(transmittanceLutTex, lutSampler, sampleRadius, cosSunZenithAtSample);
      let earthShadow = select(0.0, 1.0, atm_raySphereIntersectNearest(samplePosition + upAtSample * ATM_PLANET_RADIUS_OFFSET_KM, sunDirection, ATM_PLANET_RADIUS_KM) < 0.0);

      let segmentTransmittance = exp(-extinction * stepSize);
      let inscatterSource = scattering * transmittanceToSun * earthShadow * (1.0 / (4.0 * ATM_PI));
      luminance += throughput * ((inscatterSource - inscatterSource * segmentTransmittance) / extinction);
      multiScatAs1 += throughput * ((scattering - scattering * segmentTransmittance) / extinction);
      throughput *= segmentTransmittance;
    }

    if (distanceToGround > 0.0) {
      let hitPosition = origin + rayDirection * distanceToGround;
      let upAtHit = normalize(hitPosition);
      let cosSunZenithAtHit = dot(upAtHit, sunDirection);
      let transmittanceToSun = atm_sampleTransmittanceLut(transmittanceLutTex, lutSampler, ATM_PLANET_RADIUS_KM, cosSunZenithAtHit);
      luminance += throughput * transmittanceToSun * max(cosSunZenithAtHit, 0.0) * media.groundAlbedo * (1.0 / ATM_PI);
    }

    luminanceTotal += luminance;
    multiScatTotal += multiScatAs1;
  }

  let secondOrder = luminanceTotal / ${W}.0;
  let transferFactor = multiScatTotal / ${W}.0;
  let psi = secondOrder / max(vec3(1.0) - transferFactor, vec3(1e-3));

  return vec4(psi, 1.0);
}

fn bake_skyView(uv: vec2<f32>) -> vec4<f32> {
  let media = sky_media();

  let angles = atm_skyViewAnglesFromUv(uv, f32(bake.width), f32(bake.height), sky.viewHeightKm);
  let cosViewZenith = angles.x;
  let cosAzimuth = angles.y;
  let sinViewZenith = sqrt(max(1.0 - cosViewZenith * cosViewZenith, 0.0));
  let sinAzimuth = sqrt(max(1.0 - cosAzimuth * cosAzimuth, 0.0));
  let viewDirection = vec3(sinViewZenith * cosAzimuth, cosViewZenith, sinViewZenith * sinAzimuth);

  let cosSunZenith = clamp(sky.sunDirection.y, -1.0, 1.0);
  let sunDirection = vec3(sqrt(max(1.0 - cosSunZenith * cosSunZenith, 0.0)), cosSunZenith, 0.0);

  let origin = vec3(0.0, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, 0.0);
  let openSky = sky.openSky > 0.5;
  let distanceToGround = atm_raySphereIntersectNearest(origin, viewDirection, ATM_PLANET_RADIUS_KM);
  let distanceToTop = atm_raySphereIntersectNearest(origin, viewDirection, ATM_TOP_RADIUS_KM);
  let hitsGround = distanceToGround > 0.0 && !openSky;
  let marchDistance = select(max(distanceToTop, 0.0), distanceToGround, hitsGround);
  let stepSize = marchDistance / f32(bake.samples);

  let cosTheta = dot(viewDirection, sunDirection);
  let phaseR = atm_rayleighPhase(cosTheta);
  let phaseM = atm_miePhase(cosTheta, sky.mieAnisotropy) * (1.0 - ATM_MIE_FORWARD_LOBE_WEIGHT);

  var throughput = vec3(1.0);
  var luminance = vec3(0.0);

  for (var i = 0u; i < bake.samples; i++) {
    let t = (f32(i) + 0.5) * stepSize;
    var samplePosition = origin + viewDirection * t;
    if (openSky) {
      let rawRadius = length(samplePosition);
      if (rawRadius < ATM_PLANET_RADIUS_KM) {
        samplePosition *= (ATM_PLANET_RADIUS_KM / max(rawRadius, 1e-3));
      }
    }
    let sampleRadius = length(samplePosition);
    let upAtSample = samplePosition / max(sampleRadius, 1e-4);
    let cosSunZenithAtSample = dot(upAtSample, sunDirection);

    let extinction = max(atm_sampleExtinction(samplePosition, media), vec3(1e-6));
    let rayleighScattering = atm_sampleRayleighScattering(samplePosition, media);
    let mieScattering = atm_sampleMieScattering(samplePosition, media);
    let transmittanceToSun = atm_sampleTransmittanceLut(transmittanceLutTex, lutSampler, sampleRadius, cosSunZenithAtSample);
    let earthShadow = select(0.0, 1.0, atm_raySphereIntersectNearest(samplePosition + upAtSample * ATM_PLANET_RADIUS_OFFSET_KM, sunDirection, ATM_PLANET_RADIUS_KM) < 0.0);
    let multiScatter = atm_sampleMultiScatterLut(multiScatterLutTex, lutSampler, sampleRadius, cosSunZenithAtSample);

    let phasedScattering = rayleighScattering * phaseR + mieScattering * phaseM;
    let inscatterSource = phasedScattering * transmittanceToSun * earthShadow + (rayleighScattering + mieScattering) * multiScatter;

    let segmentTransmittance = exp(-extinction * stepSize);
    luminance += throughput * ((inscatterSource - inscatterSource * segmentTransmittance) / extinction);
    throughput *= segmentTransmittance;
  }

  if (hitsGround) {
    let hitPosition = origin + viewDirection * distanceToGround;
    let upAtHit = normalize(hitPosition);
    let cosSunZenithAtHit = dot(upAtHit, sunDirection);
    let transmittanceToSun = atm_sampleTransmittanceLut(transmittanceLutTex, lutSampler, ATM_PLANET_RADIUS_KM, cosSunZenithAtHit);
    luminance += throughput * transmittanceToSun * max(cosSunZenithAtHit, 0.0) * media.groundAlbedo * (1.0 / ATM_PI);
    let skyIrradiance = atm_sampleMultiScatterLut(multiScatterLutTex, lutSampler, ATM_PLANET_RADIUS_KM, cosSunZenithAtHit);
    luminance += throughput * skyIrradiance * media.groundAlbedo * sky.groundLitBySky;
  }

  return vec4(luminance * sky.sunIlluminance, 1.0);
}

@compute @workgroup_size(${M}, ${M}, 1)
fn skyBake(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_index) thread: u32) {
  if (bake.mode == ${Yj}u) { ibl_shProject(thread, bake.width); return; }
  if (bake.mode == ${kj}u) { bake_eyeShadow(thread); return; }
  if (bake.mode == ${Rj}u) { bake_eyeMeter(thread); return; }
  if (bake.mode == ${Fj}u) {
    let w = bitcast<f32>(bake.weightBits);
    if (gid.z == 0u && all(gid.xy < vec2<u32>(${M}u)) && thread < ${C}u) {
      let a = shFrom[thread];
      shOut[thread] = a + (shTo[thread] - a) * w;
    }
    if (gid.x >= bake.width + 2u || gid.y >= bake.height + 2u) { return; }
    let texel = vec2<i32>(gid.xy) - vec2<i32>(1) + vec2<i32>((i32(textureDimensions(bakeOutArray).x) - i32(bake.width)) / 2);
    let a = textureLoad(transmittanceLutTex, texel, i32(gid.z), 0);
    textureStore(bakeOutArray, texel, i32(gid.z), a + (textureLoad(multiScatterLutTex, texel, i32(gid.z), 0) - a) * w);
    return;
  }
  if (bake.mode == ${Pj}u) {
    if (gid.x >= bake.width || gid.y >= bake.height) { return; }
    let span = bake.fieldSpan;
    let at = (vec2<u32>(bake.fieldDestX, bake.fieldDestY) + gid.xy) % vec2<u32>(span);
    let texel = bake_cloudField(bake.fieldPlaneOrigin + (vec2<f32>(gid.xy) + 0.5) * bake.fieldTexel);
    textureStore(bakeOut, vec2<i32>(at), 0, texel);
    let guard = select(at, vec2<u32>(span), at == vec2<u32>(0u));
    if (guard.x != at.x) { textureStore(bakeOut, vec2<i32>(i32(span), i32(at.y)), 0, texel); }
    if (guard.y != at.y) { textureStore(bakeOut, vec2<i32>(i32(at.x), i32(span)), 0, texel); }
    if (all(guard != at)) { textureStore(bakeOut, vec2<i32>(guard), 0, texel); }
    return;
  }
  if (bake.mode == ${Uj}u) {
    if (gid.x >= bake.width + 2u || gid.y >= bake.height + 2u) { return; }
    let ij = vec2<i32>(gid.xy) - vec2<i32>(1);
    let source = ibl_paddedSource(gid.z, ij, bake.width);
    let border = (i32(textureDimensions(bakeOutArray).x) - i32(bake.width)) / 2;
    textureStore(bakeOutArray, ij + vec2<i32>(border), i32(gid.z), ibl_prefilter(u32(source.z), vec2<u32>(source.xy), (vec2<f32>(source.xy) + 0.5) / f32(bake.width), bitcast<f32>(bake.roughnessBits), bake.samples));
    return;
  }
  if (gid.x >= bake.width || gid.y >= bake.height) { return; }
  let uv = (vec2<f32>(gid.xy) + 0.5) / vec2<f32>(f32(bake.width), f32(bake.height));
  var result = vec4<f32>(0.0);
  switch (bake.mode) {
    case ${Gj}u: { result = bake_transmittance(uv); }
    case ${Wj}u: { result = bake_multiScatter(uv); }
    case ${Dj}u: { result = bake_skyView(uv); }
    default: {}
  }
  textureStore(bakeOut, vec2<i32>(gid.xy), 0, result);
}
`}function bj(){return (bj=$c0C(0)).call(this)}var yj=[X(0,4,"uniform"),X(1,4,"uniform"),H(2,4,"float","2d-array"),H(3,4,"float","2d-array"),b(4,4,"filtering"),F(5,4,w,"2d-array"),F(6,4,w,"2d-array"),H(8,4,"unfilterable-float","2d-array"),X(9,4,"storage"),X(10,4,"read-only-storage"),X(11,4,"read-only-storage"),H(12,4,"float","2d-array")];var Bj=[X(1,1|2,"uniform"),H(2,2,"float","2d-array"),b(3,2,"filtering")];var Kj=new WeakMap;var Oj=new WeakMap;var mj=((j,q,$)=>({label:q,layout:$,compute:{module:j.createShaderModule({label:q,code:Lj()}),entryPoint:"skyBake"}}));function Aj(a,b,c){return $c0C(1).call(this,a,b,c)}var vj=((j,q,$)=>j.getComputePipeline(q,$)),uj=(j,q,$)=>j.getRenderPipeline(q,$);var Jq=(function(j,q){return Nj(j,q,Kj,Cj,yj,"sky bake",mj,vj)});function Qq(j,q){return Nj(j,q,Oj,Mj,Bj,"sky cloud field bake",Aj,uj)}function Nj(j,q,$,z,J,Q,Y,N){let V=$.get(q)?.get(z);if(V?.device===j&&S(V.record.handle)!==null&&V.generation===q.generation)return V.record;let B=q.getBindGroupLayout(J,Q);let Z=V?.device===j?V:null;let K=Z?.descriptor??cj(j,q,z,J,Q,Y);let O=N(q,z,K);if(Z===null){return ba(j,q,z,B,O,K,$);}return Z.generation=q.generation,Z.record.layout=B,Z.record.handle=O,Z.record}function cj(j,q,$,z,J,Q){return()=>Q(j,$,j.createPipelineLayout({label:$,bindGroupLayouts:[q.getBindGroupLayout(z,J)]}))}var Xq=(function(j,q,$){let z=j.createBuffer({label:q,size:Zj,usage:64|8});return j.queue.writeBuffer(z,0,Ij(new Uint32Array(U),$)),z});function Vq(j,q){return j.createTexture({label:q,size:{width:1,height:1},format:w,usage:4})}var u=new WeakMap;function G(a,b,c,d,e){return (G=$c0C(2)).call(this,a,b,c,d,e)}function Zq(j){let v$1;y:{let q=u.get(j);if(q){v$1=q;break y;}v$1=ca(j);}return v$1.sampled2d}function xq(j){let v$2;y$:{let q=u.get(j);if(q){v$2=q;break y$;}v$2=ca(j);}return v$2.maskSampler}var c=new WeakMap;function Hq(j){let q=c.get(j);if(q===void 0){q=da(q,j)}return q}function wq(a,b,c,d){return (wq=$c0C(3)).call(this,a,b,c,d)}
;


function ba(j,q,z,B,O,K,$){let m={device:j,generation:q.generation,record:{key:z,layout:B,handle:O},descriptor:K};return n($,q).set(z,m),m.record
}
function ca(j){let $={skyBuffer:j.createBuffer({label:"sky bake placeholder (sky uniform)",size:qj,usage:64}),sampled2d:G(j,"sky bake placeholder (sampled 2d)",1,4,(z)=>$.sampled2d=z),sampledArray:G(j,"sky bake placeholder (sampled array)",6,4,(z)=>$.sampledArray=z),storage2d:G(j,"sky bake placeholder (storage 2d)",1,8,(z)=>$.storage2d=z),storageArray:G(j,"sky bake placeholder (storage array)",6,8,(z)=>$.storageArray=z),shBuffer:j.createBuffer({label:"sky bake placeholder (sh)",size:L,usage:128}),shRead:E(j,{label:"sky bake placeholder (sh read)",size:L,usage:128},(z)=>$.shRead=z).resource,sampler:j.createSampler({label:"sky bake placeholder sampler",minFilter:"linear",magFilter:"linear"}),maskSampler:j.createSampler({label:"sky cloud mask sampler",addressModeU:"repeat",addressModeV:"repeat",minFilter:"linear",magFilter:"linear",mipmapFilter:"linear"})};return u.set(j,$),$
}
function da(q,j){q=j.createView({dimension:"2d-array"}),c.set(j,q);
return q}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{HvO as P,u8Q as Vj}from"./3258b159047464c6.mjs";import{dA2 as Qj,zuP as Xj}from"./1ae8c261-e8cfc2badbd84146.mjs";import{tXk as Jj,wj8 as $j}from"./15ea558ca116591f.mjs";export{$q as j08,A as vlQ,Dj as ELT,Fj as wVg,Gj as lqB,Hq as O_v,Ij as fFr,Jq as HXL,Pj as QEd,Qq as Spe,Rj as DPY,U as IDn,Uj as SCu,Vq as mGn,Wj as E_g,Xq as b8x,Yj as jOr,Zj as taM,Zq as JwY,fj as XSd,kj as tRM,w as cnG,wq as mxr,xq as XwM};
