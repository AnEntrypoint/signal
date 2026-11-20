;const{Abz:b,C0A:G,C4Q:$,CaC:Z,CaK:o,E2f:Q,ERH:C,F70:f,FEt:z,FMf:s,GyK:A,HIu:W,KMh:y,Lgt:T,Ln2:I,NYX:v,OAU:H,PUb:i,Wwq:n,YQK:X,Yn8:l,YnL:P,ZW4:k,Zmy:J,_oj:a,aXz:x,aja:h,asZ:R,bk7:c,doI:q,hvD:p,igm:g,kF2w:V,kpO:w,lCC:F,m86:U,nQF:m,oAJ:Y,p0g:u,r5I:r,r_l:M,tPW:j,vS7:N,v_S:e,vfa:S,vo3:t}=$Lr;
var O=8;var wv=-Math.log(n)/f,E=y*s/H,_=0.06,vv=0.3,fv=0.42,nv=`
const SKY_CLOUD_UNITS_PER_M: f32 = ${e};
const SKY_CLOUD_PSEUDO_THICKNESS: f32 = ${f};
const SKY_CLOUD_EROSION: f32 = ${b};
const SKY_CLOUD_POWDER: f32 = ${o};
const SKY_CLOUD_BELLY_AMBIENT: f32 = ${z};
const SKY_CLOUD_BELLY_SKY: f32 = ${J};
const SKY_CLOUD_GROUND_BOUNCE: f32 = ${m};
const SKY_CLOUD_EDGE: f32 = ${P};
const SKY_CLOUD_EROSION_REACH: f32 = ${j};
const SKY_CLOUD_SLICE_EDGE: f32 = ${u};
const SKY_CLOUD_SLICE_DEPTH: f32 = ${r};
const SKY_CLOUD_SLAB_REACH_M: f32 = ${Y};
const SKY_CLOUD_FADE_NEAR: f32 = ${X};
const SKY_CLOUD_FADE_FAR: f32 = ${q};
const SKY_CLOUD_FADE_FLOOR_M: f32 = ${w};
const SKY_CLOUD_SLAB_OD: f32 = ${k};
const SKY_CLOUD_MIN_STEP_M: f32 = ${p};
const SKY_CLOUD_OPAQUE_T: f32 = ${n};
const SKY_CLOUD_DOME_POWER: f32 = ${$};
const SKY_CLOUD_LOBE_TOP: f32 = ${Z};
const SKY_CLOUD_LOBE_WAIST: f32 = ${h};
const SKY_CLOUD_LIGHT_EDGE: f32 = ${Q};
const SKY_CLOUD_SLAB_SKIN: f32 = ${c};
const SKY_CLOUD_MOON_ILLUMINANCE: f32 = ${E};
const SKY_CLOUD_MOON_DECK_LIGHT: f32 = ${_};
const SKY_CLOUD_MOON_BEAM: f32 = 0.036;
const SKY_SUN_TO_MOON_HANDOVER_START: f32 = ${G};
const SKY_SUN_TO_MOON_HANDOVER_END: f32 = ${W};

fn sky_cloudFieldWrapUv(windowUv: vec2<f32>, phase: vec2<f32>, dims: vec2<u32>) -> vec2<f32> {
  let span = max(vec2<f32>(dims) - 1.0, vec2<f32>(1.0));
  let s = windowUv * span + phase - 0.5;
  return (s - floor(s / span) * span + 0.5) / vec2<f32>(dims);
}

fn sky_cloudFieldRim(fieldUv: vec2<f32>) -> f32 {
  return 1.0 - smoothstep(0.46, 0.5, max(abs(fieldUv.x - 0.5), abs(fieldUv.y - 0.5)));
}

fn sky_cloudFieldFarOf(far: vec4<f32>) -> vec3<f32> {
  return vec3<f32>(fma(far.a, ${F}, far.r), far.gb);
}

fn sky_cloudClosing() -> f32 {
  return smoothstep(${x}, 1.0, sky.cloudsCoverage);
}

fn sky_cloudSheet() -> f32 {
  return select(0.0, 1.0 - sky.cloudsCoverage + ${t} * sky_cloudClosing(), sky.cloudsCoverage > ${x});
}

fn sky_cloudFieldOf(tap: vec3<f32>) -> f32 {
  return max(tap.r, sky_cloudSheet());
}

fn sky_cloudDensity(field: f32) -> f32 {
  let threshold = 1.0 - sky.cloudsCoverage;
  return clamp((field - threshold) / SKY_CLOUD_EDGE, 0.0, 1.0);
}

fn sky_cloudPlanePos(world: vec3<f32>) -> vec2<f32> {
  return world.xz * SKY_CLOUD_UNITS_PER_M - sky.cloudFieldDrift;
}

fn sky_moonShines() -> bool {
  return normalize(sky.sunDirection).y < SKY_SUN_TO_MOON_HANDOVER_START && sky.moonEnabled > 0.5;
}

fn sky_lightBody() -> vec3<f32> {
  return select(normalize(sky.sunDirection), normalize(sky.moonDirection), sky_moonShines());
}

fn sky_cloudClear(a: f32) -> f32 {
  return clamp((1.0 - a - SKY_CLOUD_OPAQUE_T) / (1.0 - SKY_CLOUD_OPAQUE_T), 0.0, 1.0);
}
`,K=`  let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
  let sliceFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tSilhouette);`,Xv=`${nv}
fn sky_cloudFieldFarTap(planePos: vec2<f32>) -> vec3<f32> {
  let fieldUv = (planePos - sky.cloudFieldCenter) * sky.cloudFieldInvWidth + 0.5;
  return sky_cloudFieldFarOf(textureSampleLevel(cloudField, lutSampler, sky_cloudFieldWrapUv(fieldUv, sky.cloudFieldPhase, textureDimensions(cloudField)), 0.0)) * sky_cloudFieldRim(fieldUv) * step(1e-6, sky.cloudFieldInvWidth);
}

const SKY_CLOUD_NEAR_FINE: f32 = ${vv};
const SKY_CLOUD_NEAR_HANDOVER: f32 = ${fv};

fn sky_cloudFieldTap(planePos: vec2<f32>, withNear: bool) -> vec3<f32> {
  let nearUv = (planePos - sky.cloudNearCenter) * sky.cloudNearInvWidth + 0.5;
  let nearRadius = length(nearUv - 0.5);
  let nearWeight = (1.0 - smoothstep(SKY_CLOUD_NEAR_HANDOVER, 0.5, nearRadius)) * step(1e-6, sky.cloudNearInvWidth);
  let farOnly = !withNear || nearWeight <= 0.0;
  var nearTap = vec3<f32>(0.0);
  if (!farOnly) {
    let near = textureSampleLevel(cloudFieldNear, lutSampler, sky_cloudFieldWrapUv(nearUv, sky.cloudNearPhase, textureDimensions(cloudFieldNear)), 0.0);
    nearTap = vec3<f32>(mix(near.r, near.a, smoothstep(SKY_CLOUD_NEAR_FINE, SKY_CLOUD_NEAR_HANDOVER, nearRadius)), near.g, near.b);
  }
  let far = sky_cloudFieldFarTap(planePos);
  return select(mix(far, nearTap, nearWeight), far, farOnly);
}

fn sky_cloudField(planePos: vec2<f32>) -> f32 {
  return sky_cloudFieldOf(sky_cloudFieldTap(planePos, true));
}

fn sky_moonIlluminance() -> vec3<f32> {
  let nightFactor = 1.0 - smoothstep(SKY_SUN_TO_MOON_HANDOVER_END, SKY_SUN_TO_MOON_HANDOVER_START, normalize(sky.sunDirection).y);
  return sky.moonColor * sky.moonIntensity * sky.moonEnabled * SKY_CLOUD_MOON_ILLUMINANCE * nightFactor;
}

fn sky_moonDeck() -> vec3<f32> {
  return sky_moonIlluminance() * max(normalize(sky.moonDirection).y, 0.0) * SKY_CLOUD_MOON_DECK_LIGHT;
}

fn sky_cloudPlaneDistance(direction: vec3<f32>, planeY: f32) -> f32 {
  let rise = planeY - sky.cloudEye.y;
  return rise / select(direction.y, 1e-4, abs(direction.y) < 1e-4);
}

fn sky_cloudFill(field: f32) -> f32 {
  return clamp((field - (1.0 - sky.cloudsCoverage)) / max(sky.cloudsCoverage, 1e-3), 0.0, 1.0);
}

fn sky_lobeProfile(z: f32) -> f32 {
  let reach = select(SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST, SKY_CLOUD_LOBE_WAIST, z < SKY_CLOUD_LOBE_WAIST);
  return pow(abs(z - SKY_CLOUD_LOBE_WAIST) / reach, SKY_CLOUD_DOME_POWER);
}

fn sky_lobeHeight(fill: f32) -> f32 {
  return SKY_CLOUD_LOBE_WAIST + pow(fill, 1.0 / SKY_CLOUD_DOME_POWER) * (SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST);
}

fn sky_slabColumn(planePos: vec2<f32>, z: f32, edge: f32, near: bool) -> f32 {
  if (z <= 0.0 || z >= 1.0) {
    return 0.0;
  }
  let tap = sky_cloudFieldTap(planePos, near);
  let dome = sky_lobeProfile(z) * sky.cloudsCoverage;
  let excess = sky_cloudFieldOf(tap) - (1.0 - sky.cloudsCoverage);
  let margin = excess - dome;
  if (margin <= 0.0) {
    return 0.0;
  }
  let s = smoothstep(0.0, 1.0, z);
  let detail = clamp((mix(tap.g, tap.b, s) - 0.5) * inverseSqrt(1.0 - 2.0 * s * (1.0 - s)) + 0.5, 0.0, 1.0);
  let shell = 1.0 - smoothstep(0.0, SKY_CLOUD_EROSION_REACH, margin);
  let erode = SKY_CLOUD_EROSION * SKY_CLOUD_EROSION_REACH * mix(0.6, 1.0, z) * (1.0 - detail) * shell * smoothstep(0.0, SKY_CLOUD_EROSION_REACH, excess);
  return clamp((margin - erode) / edge, 0.0, 1.0) * smoothstep(0.0, 0.05, z);
}

fn sky_cloudPhases(cosTheta: f32) -> array<f32, ${v}> {
  var phases = array<f32, ${v}>();
  var eccentricity = 1.0;
  for (var k = 0u; k < ${v}u; k = k + 1u) {
    phases[k] = atm_henyeyGreensteinPhase(cosTheta, 0.8 * eccentricity) * 0.8 + atm_henyeyGreensteinPhase(cosTheta, -0.2 * eccentricity) * 0.2;
    eccentricity = eccentricity * ${V};
  }
  return phases;
}

fn sky_cloudShares(d: f32, dq: f32, z: f32, sunUp: f32, sigma: f32, phases: array<f32, ${v}>, powderWeight: f32, sunGate: f32, groundShare: f32) -> vec2<f32> {
  let pathLength = sky.cloudsThicknessM * max(1.0 - z, 0.0) / sunUp;
  let lightOd = (d * 0.4 + dq * 0.6) * sigma * pathLength;
  var sun = 0.0;
  var attenuation = 1.0;
  var contribution = 1.0;
  for (var k = 0u; k < ${v}u; k = k + 1u) {
    sun = sun + attenuation * exp(-lightOd * contribution) * phases[k];
    attenuation = attenuation * ${g};
    contribution = contribution * ${i};
  }
  let powder = mix(1.0, 1.0 - exp(-2.0 * lightOd), powderWeight * d);
  let skyShare = mix(SKY_CLOUD_BELLY_AMBIENT + SKY_CLOUD_BELLY_SKY * (1.0 - sky.cloudsCoverage), 1.0, z) * 0.7;
  return vec2<f32>(sunGate * (sun * powder + groundShare * (1.0 - z)), skyShare);
}

fn sky_cloudsLit(layer: vec4<f32>, direction: vec3<f32>, sunLight: vec3<f32>, ambient: vec3<f32>) -> vec4<f32> {
  let moonDirection = normalize(sky.moonDirection);
  let moonGlow = sky.moonColor * sky.moonIntensity * sky.moonEnabled * smoothstep(0.0, 0.25, moonDirection.y) * (atm_henyeyGreensteinPhase(dot(direction, moonDirection), 0.45) * 0.75 + 0.08) * 0.025;
  let phaseCosine = select(cos(sky.moonPhase * 6.28318530718), dot(normalize(sky.sunDirection), moonDirection), sky.moonPhase < 0.0);
  let bodyLight = select(sunLight, sky_moonIlluminance() * (0.5 - 0.5 * phaseCosine) * SKY_CLOUD_MOON_BEAM, sky_moonShines());
  let lit = (bodyLight * layer.x + ambient * layer.y + moonGlow) * sky.cloudsColor;
  return select(vec4<f32>(lit, layer.w), vec4<f32>(0.0), layer.w <= 0.0);
}

fn sky_cloudLayer(direction: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
  let body = sky_lightBody();
  let baseY = sky.cloudsAltitudeM;
  let topY = baseY + sky.cloudsThicknessM;
  let density = sky.cloudsDensity;

  let tBase = sky_cloudPlaneDistance(direction, baseY);
  let tTop = sky_cloudPlaneDistance(direction, topY);
  let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
  let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
  let tEnter = select(min(max(tBase, 0.0), max(tTop, 0.0)), 0.0, insideLayer);
  let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
  let horizonFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tEnter);
  if (!reaches || horizonFade <= 0.0 || sky.cloudsEnabled < 0.5) {
    return vec4<f32>(0.0);
  }
  let cosTheta = dot(direction, body);
  let sunUp = max(body.y, 0.15);
  let sunGate = smoothstep(-0.06, -0.005, body.y);

  let sigma = density * SKY_CLOUD_SLAB_OD / max(sky.cloudsThicknessM, 1.0);
  let phases = sky_cloudPhases(cosTheta);
  let powderWeight = SKY_CLOUD_POWDER * (1.0 - smoothstep(-0.5, 0.3, cosTheta));
  let groundShare = max(body.y, 0.0) * SKY_CLOUD_GROUND_BOUNCE * (1.0 - sky.cloudsCoverage) / ATM_PI;

  let interior = sky.cloudInterior;
  if (interior >= 1.5 && steps > 0u) {
    let tExit = min(max(max(tBase, 0.0), max(tTop, 0.0)), tEnter + SKY_CLOUD_SLAB_REACH_M);
    let span = max(tExit - tEnter, 1.0);
    let probes = max(steps / 3u, 4u);
    let probeStep = span / f32(probes);
    var first = probes;
    var last = 0u;
    for (var i = 0u; i < probes; i = i + 1u) {
      let p = sky.cloudEye + direction * (tEnter + (f32(i) + jitter) * probeStep);
      let hit = sky_cloudDensity(sky_cloudFieldOf(sky_cloudFieldFarTap(sky_cloudPlanePos(p)))) > 0.0;
      first = select(first, min(first, i), hit);
      last = select(last, max(last, i), hit);
    }
    if (first >= probes) {
      return vec4<f32>(0.0);
    }
    let tStart = tEnter + (f32(max(first, 1u) - 1u) + jitter) * probeStep;
    let tEnd = tEnter + (f32(min(last + 1u, probes - 1u)) + jitter) * probeStep;
    let marchSpan = max(tEnd - tStart, 1.0);
    let stepLength = max(marchSpan / f32(steps), SKY_CLOUD_MIN_STEP_M);
    let fineSteps = clamp(u32(ceil(marchSpan / stepLength)), 1u, steps);
    var transmittance = 1.0;
    var scattered = vec2<f32>(0.0);
    for (var i = 0u; i < fineSteps; i = i + 1u) {
      let segment = min(stepLength, marchSpan - f32(i) * stepLength);
      let t = tStart + f32(i) * stepLength + jitter * segment;
      let p = sky.cloudEye + direction * t;
      let z = (p.y - baseY) / sky.cloudsThicknessM;
      if (z <= 0.0 || z >= 1.0) {
        continue;
      }
      let q = p + body * (max(topY - p.y, 0.0) / sunUp * 0.5);
      let d = sky_slabColumn(sky_cloudPlanePos(p), z, SKY_CLOUD_SLAB_SKIN, true);
      if (d <= 0.001) {
        continue;
      }
      let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
      let stepOd = d * sigma * segment;
      let stepTransmittance = exp(-stepOd);
      let source = sky_cloudShares(d, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare);
      let after = max(transmittance * stepTransmittance, SKY_CLOUD_OPAQUE_T);
      scattered = scattered + source * (transmittance - after);
      transmittance = after;
      if (transmittance <= SKY_CLOUD_OPAQUE_T) {
        break;
      }
    }
    let coverage = 1.0 - transmittance;
    let alpha = coverage * horizonFade;
    return vec4<f32>(scattered / max(coverage, 1e-4), 0.0, alpha);
  }

${K}
  let silhouettePos = sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette);
  let field = sky_cloudField(silhouettePos);
  let threshold = 1.0 - sky.cloudsCoverage;
  let soft = clamp((field - threshold) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
  let alpha = (1.0 - exp(-soft * density * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
  if (alpha <= 0.0) {
    return vec4<f32>(0.0);
  }
  let height = sky_lobeHeight(sky_cloudFill(field));
  let fromBelow = sky.cloudEye.y < baseY;
  let z = select(mix(0.5, 1.0, height), SKY_CLOUD_SLICE_DEPTH, fromBelow);
  let q = sky.cloudEye + direction * tSilhouette + body * (sky.cloudsThicknessM * (1.0 - z) / sunUp * 0.5);
  let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
  return vec4<f32>(sky_cloudShares(soft, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare), 0.0, alpha);
}

fn sky_cloudSilhouette(direction: vec3<f32>) -> f32 {
  let baseY = sky.cloudsAltitudeM;
  let topY = baseY + sky.cloudsThicknessM;
  let tBase = sky_cloudPlaneDistance(direction, baseY);
  let tTop = sky_cloudPlaneDistance(direction, topY);
  let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
  let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
  if (!reaches || sky.cloudsEnabled < 0.5) {
    return 0.0;
  }
  let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
${K}
  if (sliceFade <= 0.0) {
    return 0.0;
  }
  let field = sky_cloudField(sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette));
  let soft = clamp((field - (1.0 - sky.cloudsCoverage)) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
  return (1.0 - exp(-soft * sky.cloudsDensity * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
}

fn sky_flatCloudCover(direction: vec3<f32>, mean: vec4<f32>) -> f32 {
  if (mean.a <= 1e-4) {
    return 0.0;
  }
  return sky_cloudSilhouette(direction);
}

fn sky_flatCloudLight(mean: vec4<f32>) -> vec3<f32> {
  return mean.rgb / max(mean.a, 1e-4);
}
`;var D=`
const ATM_PLANET_RADIUS_KM: f32 = ${T}.0;
const ATM_TOP_RADIUS_KM: f32 = ${l}.0;
const ATM_VIEW_HEIGHT_KM: f32 = ${S};
const ATM_PLANET_RADIUS_OFFSET_KM: f32 = ${U};
const ATM_RAYLEIGH_SCALE_HEIGHT_KM: f32 = ${C}.0;
const ATM_MIE_SCALE_HEIGHT_KM: f32 = ${I};
const ATM_MIE_FORWARD_LOBE_G: f32 = ${a};
const ATM_MIE_FORWARD_LOBE_WEIGHT: f32 = ${M};
const ATM_MIE_HORIZON_AIR_MASS: f32 = ${R};
const ATM_OZONE_CENTER_KM: f32 = ${N}.0;
const ATM_OZONE_HALF_WIDTH_KM: f32 = ${A}.0;
const ATM_PI: f32 = 3.14159265358979;

struct AtmosphereMedia {
  rayleighScattering: vec3<f32>,
  mieScattering: f32,
  ozoneAbsorption: vec3<f32>,
  mieAbsorption: f32,
  groundAlbedo: vec3<f32>,
  mieAnisotropy: f32,
}

fn atm_raySphereIntersectNearest(rayOrigin: vec3<f32>, rayDirection: vec3<f32>, radiusKm: f32) -> f32 {
  let b = dot(rayOrigin, rayDirection);
  let c = dot(rayOrigin, rayOrigin) - radiusKm * radiusKm;
  let discriminant = b * b - c;
  let sqrtDiscriminant = sqrt(max(discriminant, 0.0));
  let t0 = -b - sqrtDiscriminant;
  let t1 = -b + sqrtDiscriminant;
  let nearest = select(t0, t1, t0 < 0.0);
  return select(nearest, -1.0, discriminant < 0.0 || t1 < 0.0);
}

fn atm_rayleighDensity(heightKm: f32) -> f32 { return exp(-heightKm / ATM_RAYLEIGH_SCALE_HEIGHT_KM); }
fn atm_mieDensity(heightKm: f32) -> f32 { return exp(-heightKm / ATM_MIE_SCALE_HEIGHT_KM); }
fn atm_ozoneDensity(heightKm: f32) -> f32 { return clamp(1.0 - abs(heightKm - ATM_OZONE_CENTER_KM) / ATM_OZONE_HALF_WIDTH_KM, 0.0, 1.0); }

fn atm_sampleExtinction(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  let heightKm = length(positionKm) - ATM_PLANET_RADIUS_KM;
  let rayleigh = media.rayleighScattering * atm_rayleighDensity(heightKm);
  let mie = (media.mieScattering + media.mieAbsorption) * atm_mieDensity(heightKm);
  let ozone = media.ozoneAbsorption * atm_ozoneDensity(heightKm);
  return rayleigh + vec3<f32>(mie) + ozone;
}

fn atm_sampleRayleighScattering(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  return media.rayleighScattering * atm_rayleighDensity(length(positionKm) - ATM_PLANET_RADIUS_KM);
}

fn atm_sampleMieScattering(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  return vec3<f32>(media.mieScattering * atm_mieDensity(length(positionKm) - ATM_PLANET_RADIUS_KM));
}

fn atm_rayleighPhase(cosTheta: f32) -> f32 {
  return (3.0 / (16.0 * ATM_PI)) * (1.0 + cosTheta * cosTheta);
}

fn atm_miePhase(cosTheta: f32, anisotropy: f32) -> f32 {
  let g2 = anisotropy * anisotropy;
  let numerator = (1.0 - g2) * (1.0 + cosTheta * cosTheta);
  let denominator = (2.0 + g2) * pow(1.0 + g2 - 2.0 * anisotropy * cosTheta, 1.5);
  return (3.0 / (8.0 * ATM_PI)) * numerator / max(denominator, 1e-5);
}

fn atm_henyeyGreensteinPhase(cosTheta: f32, anisotropy: f32) -> f32 {
  let g2 = anisotropy * anisotropy;
  let denominator = pow(1.0 + g2 - 2.0 * anisotropy * cosTheta, 1.5);
  return (1.0 / (4.0 * ATM_PI)) * (1.0 - g2) / max(denominator, 1e-5);
}

fn atm_transmittanceLutUv(viewRadiusKm: f32, cosViewZenith: f32) -> vec2<f32> {
  let horizon = sqrt(max(ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let rho = sqrt(max(viewRadiusKm * viewRadiusKm - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let discriminant = viewRadiusKm * viewRadiusKm * (cosViewZenith * cosViewZenith - 1.0) + ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM;
  let distanceToTop = max(-viewRadiusKm * cosViewZenith + sqrt(max(discriminant, 0.0)), 0.0);
  let dMin = ATM_TOP_RADIUS_KM - viewRadiusKm;
  let dMax = rho + horizon;
  let xMu = (distanceToTop - dMin) / max(dMax - dMin, 1e-5);
  let xR = rho / max(horizon, 1e-5);
  return vec2<f32>(clamp(xMu, 0.0, 1.0), clamp(xR, 0.0, 1.0));
}

fn atm_transmittanceRMuFromUv(uv: vec2<f32>) -> vec2<f32> {
  let horizon = sqrt(max(ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let rho = horizon * uv.y;
  let viewRadius = sqrt(rho * rho + ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM);
  let dMin = ATM_TOP_RADIUS_KM - viewRadius;
  let dMax = rho + horizon;
  let distanceToTop = mix(dMin, dMax, uv.x);
  let cosViewZenith = select(clamp((horizon * horizon - rho * rho - distanceToTop * distanceToTop) / (2.0 * viewRadius * distanceToTop), -1.0, 1.0), 1.0, distanceToTop < 1e-4);
  return vec2<f32>(viewRadius, cosViewZenith);
}

fn atm_unitToSubUvBy(value: f32, halfTexel: f32, scale: f32) -> f32 {
  return (value + halfTexel) * scale;
}

fn atm_subUvToUnit(value: f32, resolution: f32) -> f32 {
  return (value - 0.5 / resolution) * (resolution / (resolution - 1.0));
}

fn atm_horizonCosZenith(viewHeightKm: f32) -> f32 {
  let viewRadius = ATM_PLANET_RADIUS_KM + viewHeightKm;
  let horizonDistance = sqrt(viewRadius * viewRadius - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM);
  return -horizonDistance / viewRadius;
}

fn atm_skyViewUvFromDirection(viewDirection: vec3<f32>, sunDirection: vec3<f32>, width: f32, height: f32, viewHeightKm: f32) -> vec2<f32> {
  let horizonZenithAngle = acos(clamp(atm_horizonCosZenith(viewHeightKm), -1.0, 1.0));
  let sunFlat = normalize(vec3<f32>(sunDirection.x, 0.0, sunDirection.z) + vec3<f32>(1e-5, 0.0, 0.0));
  return atm_skyViewUvHeld(viewDirection, sunFlat, horizonZenithAngle, vec4<f32>(0.5 / width, width / (width + 1.0), 0.5 / height, height / (height + 1.0)));
}

fn atm_skyViewUvHeld(viewDirection: vec3<f32>, sunFlat: vec3<f32>, horizonZenithAngle: f32, subUv: vec4<f32>) -> vec2<f32> {
  let viewZenithAngle = acos(clamp(viewDirection.y, -1.0, 1.0));

  let aboveCoord = (1.0 - sqrt(max(1.0 - viewZenithAngle / max(horizonZenithAngle, 1e-4), 0.0))) * 0.5;
  let belowCoord = sqrt((viewZenithAngle - horizonZenithAngle) / max(ATM_PI - horizonZenithAngle, 1e-4)) * 0.5 + 0.5;
  let v = select(belowCoord, aboveCoord, viewZenithAngle < horizonZenithAngle);

  let viewFlat = normalize(vec3<f32>(viewDirection.x, 0.0, viewDirection.z) + vec3<f32>(1e-5, 0.0, 0.0));
  let cosAzimuth = clamp(dot(viewFlat, sunFlat), -1.0, 1.0);
  let u = sqrt(0.5 - cosAzimuth * 0.5);
  return vec2<f32>(atm_unitToSubUvBy(u, subUv.x, subUv.y), atm_unitToSubUvBy(v, subUv.z, subUv.w));
}

fn atm_skyViewAnglesFromUv(uvRaw: vec2<f32>, width: f32, height: f32, viewHeightKm: f32) -> vec2<f32> {
  let u = atm_subUvToUnit(uvRaw.x, width);
  let v = atm_subUvToUnit(uvRaw.y, height);
  let horizonZenithAngle = acos(clamp(atm_horizonCosZenith(viewHeightKm), -1.0, 1.0));

  let aboveT = 1.0 - v * 2.0;
  let aboveAngle = (1.0 - aboveT * aboveT) * horizonZenithAngle;
  let belowT = clamp(v * 2.0 - 1.0, 0.0, 1.0);
  let belowAngle = belowT * belowT * (ATM_PI - horizonZenithAngle) + horizonZenithAngle;
  let viewZenithAngle = select(belowAngle, aboveAngle, v < 0.5);

  let cosAzimuth = clamp(1.0 - u * u * 2.0, -1.0, 1.0);
  return vec2<f32>(clamp(cos(viewZenithAngle), -1.0, 1.0), cosAzimuth);
}

fn atm_sunLimbDarkening(centerToEdge: f32) -> vec3<f32> {
  let mu = sqrt(max(1.0 - centerToEdge * centerToEdge, 0.0));
  return vec3<f32>(pow(mu, 0.397), pow(mu, 0.503), pow(mu, 0.652));
}

fn atm_adjustSaturation(color: vec3<f32>, saturation: f32) -> vec3<f32> {
  let luma = dot(color, vec3<f32>(0.2126, 0.7152, 0.0722));
  return mix(vec3<f32>(luma), color, saturation);
}

`,L=((B,d)=>`fn atm_sampleTransmittanceLut(lut: ${B}, lutSampler: sampler, radiusKm: f32, cosZenith: f32) -> vec3<f32> {
  return textureSampleLevel(lut, lutSampler, atm_transmittanceLutUv(radiusKm, cosZenith), ${d}0.0).rgb;
}

fn atm_sampleMultiScatterLut(lut: ${B}, lutSampler: sampler, radiusKm: f32, cosSunZenith: f32) -> vec3<f32> {
  let heightT = clamp((radiusKm - ATM_PLANET_RADIUS_KM) / (ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM), 0.0, 1.0);
  let uv = vec2<f32>(clamp(cosSunZenith * 0.5 + 0.5, 0.0, 1.0), heightT);
  return textureSampleLevel(lut, lutSampler, uv, ${d}0.0).rgb;
}`),iv=`${D}${L("texture_2d<f32>","")}
`,Vv=`${D}${L("texture_2d_array<f32>","0, ")}
`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{O as Gw5,Vv as zuP,Xv as zNe,iv as Cfo,nv as dA2};
