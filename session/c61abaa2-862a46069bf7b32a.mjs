import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(z){return`${A(z,"","decorSurvivorWord")}\n  let decorLevelFaded = decorSurvivorWord >= ${wz}u && !lumeSurvivorCulled;\n  let survivorSlot = select(decorSurvivorWord, decorSurvivorWord & ${yz}u, decorLevelFaded);\n  let decorLevelHide = select(0.0, decor_levelHideOf(decorSurvivorWord), decorLevelFaded);`})',()=>'(function(z){let $=fz.get(z);if($===void 0)$={handle:y(z,{label:"terrain decor deck dead",size:l,usage:64|8},(Q)=>z.queue.writeBuffer(Q,0,mz(f.keys))),revision:-1},fz.set(z,$);let q=f.revision;if($.revision!==q)$.revision=q,z.queue.writeBuffer($.handle.resource,0,mz(f.keys));return $.handle.resource})',()=>"(function(z){return`struct DecorItem {\n  color: vec4f,\n  scaleRanges: vec4f,\n  windA: vec4f,\n  windB: vec4f,\n  tipColor: vec4f,\n  fx: vec4f,\n  regions: array<vec4f, ${j}>,\n  geometry: vec4f,\n  uvRegion: vec4f,\n  transition: vec4f,\n  tileBirthLods: array<vec4f, ${j}>,\n  tileBirthMeta: vec4f,\n  flags: vec4f,\n  law: vec4f,\n  coverA: vec4f,\n  coverB: vec4f,\n  recordsShift: vec4f,\n  runClamp: vec4u,\n  runMirror: vec4u,\n  runEase: vec4u,\n}\n@group(${z}) @binding(0) var<uniform> item: DecorItem;`})",()=>"(function(){return`fn decor_levelForSlot(slot: u32) -> u32 {\n  if (item.regions[2].y > 0.5 && slot >= u32(item.regions[2].x)) { return 2u; }\n  if (item.regions[1].y > 0.5 && slot >= u32(item.regions[1].x)) { return 1u; }\n  return 0u;\n}\n\nfn decor_footprintPixels(distance: f32) -> f32 {\n  let focal = min(frame.proj[1][1] * frame.lodHeight * 0.5, ${B(Az)});\n  let orthographic = frame.proj[3][3] > 0.5;\n  return item.law.x * focal / select(max(distance, 1e-3), 1.0, orthographic);\n}\n\nfn decor_nearEyeKeep(toEye: vec3f) -> f32 {\n  let scale = frame.proj[1][1] / max(length(toEye.xz), 1e-3);\n  let root = max(-frame.eyeRise * scale, -1.0);\n  let top = clamp((item.law.z - frame.eyeRise) * scale, -1.0, 1.0);\n  return 1.0 - smoothstep(${B(Lz)}, ${B(Cz)}, (top - root) * 0.5);\n}\n\nfn decor_propTail(distance: f32) -> f32 {\n  let reach = item.law.y * max(distance, 0.0);\n  if (reach <= 1.0) { return 1.0; }\n  let near = 1.0 / reach;\n  return near * near;\n}\n\nfn decor_lawKeep(toEye: vec3f, level: u32, prop: bool) -> f32 {\n  return select(decor_levelKeep(decor_footprintDensity(decor_footprintPixels(length(toEye))) * decor_nearEyeKeep(toEye), level), 1.0, prop);\n}\n\nfn decor_birthVisibility(time: f32) -> f32 {\n  return select(1.0, smoothstep(item.transition.x, item.transition.x + item.transition.y, time), item.transition.y > 1e-5);\n}\n\nfn decor_tileBirthStart(worldPosition: vec3f) -> f32 {\n  for (var lod = 0u; lod < ${j}u; lod += 1u) {\n    let info = item.tileBirthLods[lod];\n    let gridSize = i32(info.w);\n    if (gridSize <= 0 || info.z <= 0.0) { continue; }\n    let cell = vec2i(floor((worldPosition.xz - info.xy) * info.z));\n    if (any(cell < vec2i(0)) || any(cell >= vec2i(gridSize))) { continue; }\n    let index = u32(item.tileBirthMeta[lod]) + u32(cell.y * gridSize + cell.x);\n    let birth = tileBirths[index];\n    if (birth >= 0.0) { return birth; }\n  }\n  return -1.0;\n}\n\nfn decor_tileBirthVisibility(worldPosition: vec3f, time: f32) -> f32 {\n  let birth = decor_tileBirthStart(worldPosition);\n  let duration = max(item.tileBirthMeta.w, 1e-4);\n  return select(1.0, smoothstep(birth, birth + duration, time), birth >= 0.0);\n}\n\nfn decor_gust(instanceXZ: vec2f, travel: vec2f, clock: f32) -> vec2f {\n  let windDirLen = length(frame.wind.xy);\n  let windDir = select(vec2f(0.0, -1.0), frame.wind.xy / max(windDirLen, 1e-4), windDirLen > 1e-4);\n  let windSpeed = max(frame.wind.z, 0.0);\n  let gustClock = clock * item.windA.w;\n  let phase = terrain_hash2D(instanceXZ + vec2f(53.0, 91.0), 0.0);\n  let gustUv = (instanceXZ - travel * item.windA.w) * (item.windA.z * 0.22) + vec2f(phase * 0.31);\n  let gust = terrain_noise2D(gustUv, 3.1);\n  let lean = 0.32 + 0.68 * gust;\n  let shimmer = (terrain_noise2D(gustUv * 2.7 + vec2f(19.0, 41.0), 7.7) - 0.5) * 0.5\n    + sin(gustClock * (2.6 + phase * 2.2) + phase * 6.2831853) * 0.14;\n  let swayDir = windDir * lean + vec2f(-windDir.y, windDir.x) * shimmer;\n  return swayDir * (item.windA.y * (windSpeed * 0.5));\n}\n\nfn decor_bend(v: vec3f, up: vec3f, gust: vec2f, weight: f32) -> vec3f {\n  let lean = length(gust);\n  let angle = min(lean * item.windB.x * weight, ${U1});\n  if (angle < 1e-5) { return v; }\n  let dir = vec3f(gust.x, 0.0, gust.y) / lean;\n  let axis = normalize(cross(up, dir));\n  let c = cos(angle);\n  let s = sin(angle);\n  return v * c + cross(axis, v) * s + axis * dot(axis, v) * (1.0 - c);\n}`})"]},function(){return[()=>'(function(z,$=!1,q=null,J=!1){return["  let base = decor_candidateBase(survivorSlot);","  let instancePosition = vec3f(bitcast<f32>(records[base]), bitcast<f32>(records[base + 1u]), bitcast<f32>(records[base + 2u])) + item.recordsShift.xyz;","  let sampledNormal = decor_unpackNormal(records[base + 3u]);","  let tintCoverage = decor_unpackTintCoverage(records[base + 4u]);","  let candidateId = records[base + 5u];","  let instanceWorld = lume_worldFromRender(instancePosition);","  let instanceXZ = instanceWorld.xz;",J?"  let coverKeep = select(1.0, 0.0, decor_covered(instanceXZ.x, instanceXZ.y, instanceWorld.y));":"  let coverKeep = decor_coverKeep(instanceXZ.x, instanceXZ.y, instanceWorld.y);","  let level = decor_levelForSlot(survivorSlot);","  let region = item.regions[level];","  let dissolve = item.geometry.y <= 0.0;","  let toEyeNow = instancePosition - frame.cameraPosition;","  let toFocusNow = instancePosition - frame.focus;","  let distanceNow = select(length(toFocusNow), length(toFocusNow.xz), dissolve);","  let rootRampNow = decor_lawKeep(toEyeNow, level, dissolve) * decor_smoothVisibility(distanceNow, region.z, region.w);",J?"  let arrivalNow = coverKeep;":"  let arrivalNow = decor_birthVisibility(frame.fadeTime) * decor_tileBirthVisibility(instanceWorld, frame.fadeTime) * coverKeep;","  let rootNow = decor_distanceKeep(rootRampNow * select(arrivalNow, 1.0, dissolve), candidateId, !dissolve);","  let qualityNow = decor_qualityKeep(max(item.transition.z, decor_nearKeep(distanceNow, item.transition.w)), candidateId);","  let tailNow = decor_tailKeep(decor_propTail(length(toFocusNow)), candidateId);","  let revealNow = rootNow * qualityNow * select(1.0, arrivalNow, dissolve) * tailNow;","  let staticKeep = decor_staticKeep(tintCoverage.a, candidateId);","  let visibilityNow = select(tintCoverage.a * revealNow, staticKeep * step(1e-6, revealNow), dissolve);","  let up = select(vec3f(0.0, 1.0, 0.0), sampledNormal, item.geometry.x > 0.5);","  let reference = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(up.y) > 0.9);","  let right = normalize(cross(up, reference));","  let forward = cross(right, up);","  let heightFraction = clamp(position.y * item.windB.x + item.windB.y + item.geometry.z, 0.0, 1.0);","  let authoredUv = item.uvRegion.xy + uv * item.uvRegion.zw;","  var localPos = position;","  var localNormal = normal;","  if (item.flags.x > 0.5) {","    let widthScale = mix(item.scaleRanges.x, item.scaleRanges.y, terrain_hash2D(instanceXZ + vec2f(7.0, 13.0), 0.0));","    let heightScale = mix(item.scaleRanges.z, item.scaleRanges.w, terrain_hash2D(instanceXZ + vec2f(19.0, 23.0), 0.0));","    localPos = vec3f(localPos.x * widthScale, localPos.y * heightScale, localPos.z * widthScale);","    if (item.windA.x > 0.5) {","      let angle = terrain_hash2D(instanceXZ + vec2f(42.0, 19.0), 0.0) * 6.28318530718;","      let ca = cos(angle);","      let sa = sin(angle);","      localPos = vec3f(localPos.x * ca - localPos.z * sa, localPos.y, localPos.x * sa + localPos.z * ca);","      localNormal = vec3f(localNormal.x * ca - localNormal.z * sa, localNormal.y, localNormal.x * sa + localNormal.z * ca);","    }","  }","  var gustNow = vec2f(0.0);",...J?[]:["  if (item.flags.y > 0.5) {","    gustNow = decor_gust(instanceXZ, frame.windTravel.xy, frame.time);","  }","  if (item.geometry.w > 0.0) {",`    let press = decor_pressLean(instanceXZ) * (${Tz} * item.geometry.w / max(item.windB.x, 1e-3));`,"    gustNow += press.xy;","  }"],"  let scatterWind = vec3f(dot(vec3f(gustNow.x, 0.0, gustNow.y), right), 0.0, dot(vec3f(gustNow.x, 0.0, gustNow.y), forward));",...z===null?["  let laneDisplaced = false;"]:[z],"  let bendWeight = select(sway, 0.0, laneDisplaced);","  let localNow = localPos * visibilityNow;","  let offsetNow = decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustNow, bendWeight);","  let decorWorld = instancePosition + offsetNow;",...$?["  var gustPrev = gustNow;","  if (item.flags.y > 0.5) { gustPrev += decor_gust(instanceXZ, frame.prevWindTravel.xy, frame.prevTime) - decor_gust(instanceXZ, frame.windTravel.xy, frame.time); }",...q===null?["  let worldPrev = instancePosition + decor_bend(right * localNow.x + up * localNow.y + forward * localNow.z, up, gustPrev, bendWeight);"]:["  let scatterWindPrev = vec3f(dot(vec3f(gustPrev.x, 0.0, gustPrev.y), right), 0.0, dot(vec3f(gustPrev.x, 0.0, gustPrev.y), forward));","  var localPrevPos = localPos;",q,"  let localPrev = localPrevPos * visibilityNow;","  let worldPrev = instancePosition + decor_bend(right * localPrev.x + up * localPrev.y + forward * localPrev.z, up, gustPrev, bendWeight);"]]:[],"  let geometryNormal = normalize(decor_bend(right * localNormal.x + up * localNormal.y + forward * localNormal.z, up, gustNow, bendWeight));","  let decorNormal = select(geometryNormal, sampledNormal, item.fx.w > 0.5);"]})']},function(){return[()=>'(()=>([{name:"position",format:"float32x3",offset:0},{name:"normal",format:"float32x3",offset:12},{name:"uv",format:"float32x2",offset:24},{name:"color",format:"float32x3",offset:32},{name:"sway",format:"float32",offset:44},{name:"tex",format:"float32",offset:48},{name:"layer",format:"float32",offset:52},{name:"glow",format:"float32x2",offset:56},{name:"pbr",format:"float32",offset:64}]))',()=>'(function(z,$=2,q=C){if(z==="vertex")return"";return`@group(${$}) @binding(${q}) var<storage, read> decorArena: array<f32>;\n${Iz({structName:"DecorVertex",fnName:"decor_pullVertex",bufferName:"decorArena",attributes:(uz??=$c0I(5)),arrayStride:n,baseElementExpr:"vertexIndex"})}`})',()=>'(function(z=!1,$=!1){return["@location(0) position: vec3f","@location(1) normal: vec3f","@location(2) uv: vec2f",`@location(${s}) color: vec3f`,`@location(${t}) sway: f32`,`@location(${i}) tex: f32`,`@location(${r}) layer: f32`,...z?[`@location(${a}) glow: vec2f`]:[],...$?[`@location(${e}) pbr: f32`]:[]]})',()=>'(function(z,$=!1,q=!1){if(z==="vertex")return"";return`  let decorVertex = decor_pullVertex(vertexIndex);\n  let position = decorVertex.position;\n  let normal = decorVertex.normal;\n  let uv = decorVertex.uv;\n  let color = decorVertex.color;\n  let sway = decorVertex.sway;\n  let tex = decorVertex.tex;\n  let layer = decorVertex.layer;${$?aa():""}${q?`\n  let pbr = decorVertex.pbr;`:""}`})',()=>"(function(z){return`fn decor_writeCandidate(id: u32, worldPosition: vec3<f32>, normal: vec3<f32>, tint: vec3<f32>, coverage: f32, candidateId: u32) {\n  let base = ${z};\n  outData[base] = bitcast<u32>(worldPosition.x);\n  outData[base + 1u] = bitcast<u32>(worldPosition.y);\n  outData[base + 2u] = bitcast<u32>(worldPosition.z);\n  outData[base + 3u] = decor_packNormal(normal);\n  outData[base + 4u] = decor_packTintCoverage(tint, coverage);\n  outData[base + 5u] = candidateId;\n}\n`})",()=>'(function(z){let $=function(H,u){let m=new Uint32Array([u,0,0,0]),h=y(z,{label:H,size:16,usage:64|8},(T)=>z.queue.writeBuffer(T,0,m));return z.queue.writeBuffer(h.resource,0,m),h},q=new Float32Array(Ez/4);W1(q);let J=$("terrain decor phase place",I1),Q=$("terrain decor phase cover floor",z1),X=y(z,{label:"terrain decor quiet floor params",size:A1*4,usage:64},F),x=qz(z,{label:"terrain decor quiet floor",size:{width:1,height:1},format:"r32float",usage:8},F),k=y(z,{label:"terrain decor quiet uniforms",size:C1,usage:64},F),K=y(z,{label:"terrain decor quiet records",size:16,usage:128},F),w=y(z,{label:"terrain decor quiet pools",size:16,usage:128},F),V=qz(z,{label:"terrain decor quiet albedo",size:{width:1,height:1,depthOrArrayLayers:1},format:"rgba8unorm",usage:4},F),Z=y(z,{label:"terrain decor quiet ground rows",size:Ez,usage:64|8},(H)=>z.queue.writeBuffer(H,0,q));z.queue.writeBuffer(Z.resource,0,q);let N=z.createSampler({label:"terrain decor quiet sampler",magFilter:"linear",minFilter:"linear"}),G=()=>({phasePlace:J.resource,phaseFloor:Q.resource,floorParams:X.resource,floorOut:x.resource.createView({label:"terrain decor quiet floor"}),uniforms:k.resource,records:K.resource,pools:w.resource,albedo:V.resource.createView({label:"terrain decor quiet albedo",dimension:"2d-array"}),sampler:N,groundRows:Z.resource}),I={quiet:G(),reissues:S(),read:G};return q1.set(z,I),I})']},function(){return[()=>"(()=>(`fn decor_glowOf(words: vec2<f32>) -> vec3<f32> {\n  let a = u32(words.x);\n  let b = u32(words.y);\n  let blue = (a >> 15u) | ((b >> 15u) << 9u);\n  return vec3<f32>(lume_half_to_f32(a & 0x7fffu), lume_half_to_f32(b & 0x7fffu), lume_half_to_f32(blue));\n}`))",()=>"(()=>(`fn decor_pbrOf(word: f32) -> vec2<f32> {\n  let w = u32(word);\n  let steps = vec2<f32>(f32(w & 2047u), f32(w >> 11u));\n  return select(vec2<f32>(-1.0), (steps - 1.0) / 1023.0, steps > vec2<f32>(0.0));\n}`))",()=>'(function(z){if(!z.dissolve)return{module:"",varying:`\n  @location(8) nearWear: f32, //`,vertex:`\n  out.nearWear = decor_nearArrivalWear(distanceNow, item.transition.w, item.transition.z, candidateId);`,fragment:"",tintedWear:`\n    albedo = mix(albedo, in.groundTint * mix(1.0, tonalShape, ${B(Hz)}), in.nearWear);`,cardWear:"max(decor_footprintWear(decor_footprintPixels(distance(frame.cameraPosition, in.worldPos))), in.nearWear)",plainWear:`\n  albedo = mix(albedo, in.groundTint, in.nearWear);`,arrivalDoor:z.cutout||z.runCutout===!0?`  if (${L("in.position.xy")} < in.nearWear) { discard; }\n`:""};return{module:N0,varying:`\n  @location(8) reveal: f32, //`,vertex:`\n  out.reveal = revealNow;`,fragment:`  if (in.reveal < 1.0 && lume_screenDoor(in.position.xy) > in.reveal) { discard; }\n`,tintedWear:"",cardWear:"decor_footprintWear(decor_footprintPixels(distance(frame.cameraPosition, in.worldPos)))",plainWear:"",arrivalDoor:""}})',()=>"((z)=>`  let wetAlbedo = albedo * (1.0 - 0.35 * passLights.groundWet);\n  let dryRoughness = ${z};\n  let wetRoughness = wet_roughness(albedo, dryRoughness, wetAlbedo, mix(dryRoughness, min(dryRoughness, 0.45), passLights.groundWet));`)",()=>'(()=>({modules:[],varying:"",vertex:"",clip:"decorClip",cutoutSource:"",runSource:"",fragment:[],emissive:"vec3<f32>(0.0)"}))',()=>'(function(z){if(!z)return (o1??=$c0I(15));return{modules:[Q0,(O1??=$c0I(11))],varying:`\n  @location(6) glow: vec3<f32>, //`,vertex:`\n  let decorGlow = decor_glowOf(glow);\n  out.glow = decorGlow;\n${C0("decorClip","decorGlow","offsetNow").join(`\n`)}`,clip:"lume_clipOut",cutoutSource:`\n  let decorGlowSource = vec3<f32>(1.0);`,runSource:`\n  let decorGlowSource = mix(vec3<f32>(1.0), runSample.rgb, min(in.textured, 1.0));`,fragment:[...g0("in.worldPos","in.glow"),"  let decorEmissive = in.glow * decorGlowSource * lume_emitterScale;"],emissive:"decorEmissive"}})',()=>'(()=>({modules:[],varying:"",vertex:"",metalness:"0.0",dryRoughness:Z1}))',()=>'(function(z){if(!z)return (s1??=$c0I(17));return{modules:[(R1??=$c0I(12))],varying:`\n  @location(9) pbr: vec2<f32>, //`,vertex:`\n  out.pbr = decor_pbrOf(pbr);`,metalness:"max(in.pbr.x, 0.0)",dryRoughness:`select(${Z1}, in.pbr.y, in.pbr.y >= 0.0)`}})',()=>'(function(z,$="vertex",q="vertex",J=p()){if(z=Vz(z),z.surface===!0)J=Kz();let Q=E1(z),X=V0("pbr",J),x=n1(z.glow===!0),k=t1(z.pbr===!0),K=z.levelFade===!0||X1(z),w=K?`${hz}\n`:"",V=X.litColor({N:"N",V:"V",P:"in.worldPos",albedo:"wetAlbedo",roughness:"wetRoughness",metalness:k.metalness,emissive:x.emissive,toonSteps:"4.0",transmission:"0.0",...z.receiveShadow===!1?{receiveShadow:"0.0"}:{}}),Z=[];if(Z.push(`//${JSON.stringify(z)}`),Z.push(B0),z.motion)Z.push(p0);if(Z.push(b0),Z.push(J.wgslDefs),Z.push(z.surface===!0?G0(z.motion===!0):X.defs),Z.push(u0),Z.push(kz),Z.push(v),K)Z.push(Fz);if(Z.push(c0),Q.module)Z.push(Q.module);if(Z.push(...x.modules),Z.push(...k.modules),Z.push(gz(2)),Z.push(`@group(2) @binding(1) var<storage, read> records: array<u32>;\n@group(2) @binding(2) var itemTexture: texture_2d_array<f32>;\n@group(2) @binding(3) var itemSampler: sampler;\n@group(2) @binding(4) var<storage, read> tileBirths: array<f32>;\n${A0(2,J1)}\n${a0(2,Q1)}\n${X0($,2,j1)}\n${Oz(q)}\nstruct VsOut {\n  @builtin(position) position: vec4<f32>,\n  @location(0) worldPos: vec3<f32>,\n  @location(1) worldNormal: vec3<f32>,\n  @location(2) uv: vec2<f32>,\n  @location(3) depthHeight: vec2<f32>,\n  @location(4) jitter: vec2<f32>,\n  @location(5) groundTint: vec3<f32>,\n  @location(7) vertexColor: vec3<f32>,\n  ${z.motion?"@location(11) currentClip: vec4<f32>, @location(12) previousClip: vec4<f32>,":""}\n  @location(10) @interpolate(flat) textured: f32, //${Q.varying}${x.varying}${k.varying}${K?`\n  @location(13) @interpolate(flat) levelHide: f32, //`:""}\n}\n${z.motion?"struct DecorationOutput { @location(0) color: vec4<f32>, @location(1) motion: vec2<f32> }":""}\n${!z.cutout||z.runCutout===!0?Sz():""}\n\nfn decor_hueRotate(c: vec3<f32>, angle: f32) -> vec3<f32> {\n  let k = vec3<f32>(0.57735026919);\n  let cosA = cos(angle);\n  let sinA = sin(angle);\n  return c * cosA + cross(k, c) * sinA + k * dot(k, c) * (1.0 - cosA);\n}\n\n${cz()}\n\n@vertex\nfn vs(${v1(q,$,z.glow===!0,z.pbr===!0)}) -> VsOut {\n${vz(q,z.glow===!0,z.pbr===!0)}\n${K?Pz($):A($)}\n${Y0({struct:"VsOut"})}\n  var out: VsOut;${K?`\n  out.levelHide = decorLevelHide;`:""}\n${_(null,z.motion).join(`\n`)}\n  out.worldPos = decorWorld;${Q.vertex}\n  out.worldNormal = decorNormal;\n  out.groundTint = tintCoverage.rgb;\n  out.vertexColor = color;\n  out.textured = tex;${k.vertex}\n  out.depthHeight.y = heightFraction;\n  out.jitter = vec2<f32>(0.0, 1.0);\n  if (item.flags.w > 0.5) {\n    out.jitter = vec2<f32>(\n      (terrain_hash2D(instanceXZ + vec2<f32>(3.7, 9.1), 0.0) * 2.0 - 1.0) * item.fx.x,\n      1.0 + (terrain_hash2D(instanceXZ + vec2<f32>(11.3, 5.9), 0.0) * 2.0 - 1.0) * item.fx.y);\n  }`),Z.push(`  out.uv = vec2<f32>(authoredUv.x, 1.0 - authoredUv.y);\n  let viewPos = frame.view * vec4<f32>(decorWorld, 1.0);\n  out.depthHeight.x = -viewPos.z;\n  let decorClip = frame.viewProj * vec4<f32>(decorWorld, 1.0);${x.vertex}\n  let layerFaced: f32 = ${rz("layer","decorNormal","decorWorld")};\n${az("layerSlope","layerFaced","decorNormal","decorWorld").join(`\n`)}\n  out.position = vec4<f32>(${x.clip}.xy, ${z0("decorClip",ez("layerFaced","layerSlope"))}, decorClip.w);\n  ${z.motion?"out.currentClip = decorClip; out.previousClip = frame.prevViewProj * vec4<f32>(worldPrev, 1.0);":""}\n  return out;\n}\n\n@fragment\nfn fs(in: VsOut, @builtin(front_facing) front: bool) -> ${i1(z)} {\n${Q.fragment}${w}${Q.arrivalDoor}  var albedo: vec3<f32>;`),z.cutout)Z.push(`  let sample = textureSample(itemTexture, itemSampler, in.uv, 0);\n  if (sample.a < item.color.a) { discard; }\n  let gray = dot(sample.rgb, vec3<f32>(0.2126, 0.7152, 0.0722));\n  let contrastedGray = smoothstep(0.08, 0.92, gray);\n  let tonalShape = mix(0.35, 1.65, contrastedGray);\n  if (item.flags.z > 0.5) {\n    let patternGain = min(1.0, item.fx.z * 3.5);\n    albedo = in.groundTint * mix(1.0, tonalShape, patternGain);\n    let sourceChroma = clamp(sample.rgb / max(gray, 0.08), vec3<f32>(0.65), vec3<f32>(1.4));\n    albedo = albedo * mix(vec3<f32>(1.0), sourceChroma, min(0.35, item.fx.z * 0.35));${Q.tintedWear}\n  } else {\n    albedo = sample.rgb * item.color.rgb;\n    if (item.geometry.y > 0.5) {\n      let wear = ${Q.cardWear};\n      albedo = mix(albedo, in.groundTint * mix(1.0, tonalShape, ${B(Hz)}), wear);\n    }\n  }${x.cutoutSource}`);else Z.push(`  let runLayer = max(i32(round(in.textured)) - 1, 0);\n  let runSample = decor_runSample(in.uv, runLayer);\n${z.runCutout===!0?`  if (in.textured > 0.5 && runSample.a < item.color.a) { discard; }\n`:""}  if (item.flags.z > 0.5) {\n    albedo = in.groundTint * mix(1.0, 1.15, in.depthHeight.y);\n  } else {\n    albedo = mix(item.color.rgb, item.tipColor.rgb, item.tipColor.a * in.depthHeight.y) * in.vertexColor;\n  }\n  albedo = mix(albedo, runSample.rgb * in.vertexColor, min(in.textured, 1.0));${Q.plainWear}${x.runSource}`);return Z.push(...x.fragment),Z.push(`  if (item.flags.w > 0.5) { albedo = max(decor_hueRotate(albedo, in.jitter.x) * in.jitter.y, vec3<f32>(0.0)); }\n  var N = normalize(in.worldNormal);\n  if (item.fx.w < 0.5) { N = N * select(1.0, -1.0, !front); }\n${_1(k.dryRoughness)}\n${z.surface===!0?`  lume_surfacePoint = in.worldPos;\n  let surface = lume_surfaceOut(N, wetAlbedo, wetRoughness, ${k.metalness}, ${z.receiveShadow===!1?"0.0":"1.0"}, ${x.emissive});\n  return ${z.motion?"lume_surfaceMotion(surface, lume_motionVector(in.currentClip, in.previousClip))":"surface"};\n}`:`  let V = ${F0("frame.cameraPosition - in.worldPos")};\n  var lit = ${V};\n  lit = shade_applyFog(lit, in.depthHeight.x, in.worldPos - frame.cameraPosition);\n  ${z.motion?"return DecorationOutput(vec4<f32>(lit, 1.0), lume_motionVector(in.currentClip, in.previousClip));":"return vec4<f32>(lit, 1.0);"}\n}`}\n\n@fragment\nfn fsDepth(in: VsOut) -> @location(0) vec4<f32> {\n${Q.fragment}${w}${Q.arrivalDoor}${z.cutout?`  if (textureSample(itemTexture, itemSampler, in.uv, 0).a < item.color.a) { discard; }\n`:""}${z.runCutout===!0?`  let runLayer = max(i32(round(in.textured)) - 1, 0);\n  let runCut = decor_runSample(in.uv, runLayer);\n  if (in.textured > 0.5 && runCut.a < item.color.a) { discard; }\n`:""}  return vec4<f32>(0.0);\n}`),tz(Z,`\n`)})']},function(){return[()=>'(function(z,$,q,J,Q,X,x=p(),k){J=Vz(J);let K=J.surface===!0,w=K?D():1,V=`terrain/decor-${z}/${a1(J)}/${K?U0(J.motion===!0,w):J0({motion:J.motion})}${K0(Q)}${X==="storage"?"-attrpull":""}`;x=K?Kz():jz(x,V);let Z=K||z==="depth"?0:h0(),N=x.programKey?`${V}/light/${Qz(x)}`:V,G=`${N}${g(Z)}`,I=K?void 0:[...k?.map((H)=>jz(H,V)).map((H)=>`${H.programKey?`${V}/light/${Qz(H)}`:V}${g(Z)}`)??[],...Z===0?[]:m0().map((H)=>`${N}${g(H)}`)];return T0(x,G),q.getRenderPipeline(G,function(){let H=Z===0?oz(J,Q,X,x):I0(oz(J,Q,X,x)),u=f0(Z&W0(H)),m=K?w0(H,"fs",w):H,h=$.createShaderModule({label:G,code:m}),T=H0(q,[m]),Y1=M0($,G,[q.getBindGroupLayout(P0,"lume frame"),T,q.getBindGroupLayout(d1(Q,X),`terrain decor item${X==="storage"?" attr-storage":""}`)],T);return{label:G,layout:Y1,vertex:{module:h,entryPoint:"vs",buffers:r1(Q,X)},fragment:z==="depth"?{module:h,entryPoint:"fsDepth",targets:K?Jz(J.motion===!0,w).map((K1)=>({...K1,writeMask:0})):$z({writeMask:0,motion:J.motion,motionWriteMask:0})}:{module:h,entryPoint:"fs",constants:u,targets:K?Jz(J.motion===!0,w):$z({motion:J.motion})},depthStencil:z==="depth"?k0(sz):sz,multisample:{count:D()}}},{peelCull:!0,standIn:I?.filter((H)=>H!==G),bodyProgram:!0})})']}],$c0XU=[0,4,5,11,20];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,21,587458086436864);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[9,10]]);var $c0I=$c0C.i;
;const{BfK:f,Cdy:iz,D7m:ez,DIS:g,DM3:M,DPz:Iz,Dq1:Y0,EVH:L,Ebw:A,Fcm:c,GEa:j0,Ggy:B0,Hed:S,IX3:wz,J_p:I0,Jai:tz,KdH:$0,LZW:O,MfU:$z,N0E:p,NDw:B,Nx2:b0,P2_:jz,PK8:x0,U4E:J0,X4S:w0,XK8:Jz,YkK:m0,ZZw:y,ZcG1:k0,_7c:W0,_rr:b,a7W:X0,bZM:A0,b_t:yz,bli:qz,cBV:F,cWR:Tz,eYb:V0,fX9:T0,i4q:L0,jJo:G0,jN3:az,jqS:Yz,kMd:z0,kQP:D,lKR:U0,lSa:F0,mGj:Z0,mq1:P0,nvi:p0,nym:rz,oAB:Qz,pWA:W,pfC:f0,rvA:q0,tGw:Gz,tcT:N0,thB:h0,uMP:H0,ueV:Kz,v08:R0,vbn:K0,vcF:y0,wRZ:Y,yfJ:M0,zcs:Q0}=$Lr;
;;;;;;var Bz=6,H1=Bz*4,M1=4,q4=H1+M1,R=18,J4={positionX:0,positionY:1,positionZ:2,normal:3,tintCoverage:4,id:5};function Q4(z){return{tint:[(z&255)/255,(z>>>8&255)/255,(z>>>16&255)/255],coverage:(z>>>24&255)/255}}var v=`
const DECOR_CANDIDATE_WORDS: u32 = ${Bz}u;

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
`,Fz=`
fn decor_levelHideOf(word: u32) -> f32 {
  let share = f32((word >> ${W}u) & 0x3fu) * (1.0 / ${Gz}.0);
  return select(share, share - 1.0, (word & ${O}u) != 0u);
}

fn decor_levelDoorCut(hide: f32, pixel: vec2<f32>) -> bool {
  let noise = ${L("pixel")};
  return select(noise, 1.0 - noise, hide < 0.0) < abs(hide);
}
`;function Pz(a){return (Pz=$c0C(0)).call(this,a)}var hz="  if (in.levelHide != 0.0 && decor_levelDoorCut(in.levelHide, in.position.xy)) { discard; }",Uz=256,k1=O>>>W|63;function j4(z){return`select(${z}, 2.0 + 2.0 * f32((decorSurvivorWord >> ${W}u) & ${k1}u) + ${z}, decorLevelHide != 0.0)`}var Z4=["  if (in.laneCoverage > 1.5) {","    let decorDoorCode = floor((in.laneCoverage - 1.5) * 0.5);",`    let decorReveal = clamp(round((in.laneCoverage - 2.0 - 2.0 * decorDoorCode) * ${Uz}.0) * (1.0 / ${Uz}.0), 0.0, 1.0);`,`    if ((decorReveal < 1.0 && lume_screenDoor(in.position.xy) > decorReveal) || decor_levelDoorCut(decor_levelHideOf(u32(decorDoorCode) << ${W}u), in.position.xy)) { discard; }`,"  }"];var d=15,l=16384,bz=l/16-1,pz=bz*4,Nz=`struct DecorDeckDead {
  head: vec4<u32>,
  keys: array<vec4<u32>, ${bz}>,
}

@group(0) @binding(${d}) var<uniform> deckDead: DecorDeckDead;

fn decor_deckDeadKeyAt(i: u32) -> u32 {
  return deckDead.keys[i / 4u][i % 4u];
}

fn decor_deckDead(seed: u32, candidateId: u32) -> bool {
  let count = min(deckDead.head.x, ${pz}u);
  if (count == 0u) { return false; }
  let key = candidateId ^ (seed * 0x9e3779b1u);
  var lo = 0u;
  var hi = count;
  while (lo < hi) {
    let mid = (lo + hi) / 2u;
    if (decor_deckDeadKeyAt(mid) < key) { lo = mid + 1u; } else { hi = mid; }
  }
  return lo < count && decor_deckDeadKeyAt(lo) == key;
}`;function mz(z){let $=new Uint32Array(l/4),q=Math.min(z.length,pz);return $[0]=q,$.set(z.subarray(0,q),4),$}var Wz=new WeakMap;function H4(z,$=!1){let q=Wz.get(z),J=f.revision;if($)Wz.set(z,J);return q!==J&&($||q!==void 0)}var fz=new WeakMap;function M4(a){return (M4=$c0C(1)).call(this,a)}var j=3,U1="1.45";function gz(a){return (gz=$c0C(2)).call(this,a)}function cz(){return (cz=$c0C(3)).call(this)}var Dz=64;function Sz(){return`fn decor_runSample(uv: vec2f, layer: i32) -> vec4f {
  if (all((item.runClamp | item.runMirror) == vec4u(0u))) { return textureSample(itemTexture, itemSampler, uv, layer); }
  let gx = dpdx(uv);
  let gy = dpdy(uv);
  let size = vec2f(textureDimensions(itemTexture));
  let foot = max(abs(gx), abs(gy)) * size;
  let wide = max(foot.x, foot.y);
  let reach = max(max(wide, 0.5), f32(item.runEase.x) + 0.5 * wide);
  let edge = min(vec2f(reach) / size, vec2f(0.5));
  let at = u32(layer);
  let bit = vec2u(select(0u, 1u << (at & 31u), at < ${Dz}u));
  let mirrored = (select(item.runMirror.xy, item.runMirror.zw, at >= 32u) & bit) != vec2u(0u);
  let held = mirrored | ((select(item.runClamp.xy, item.runClamp.zw, at >= 32u) & bit) != vec2u(0u));
  let tile = fract(uv * 0.5);
  let folded = select(uv, vec2f(1.0) - abs(tile * 2.0 - vec2f(1.0)), mirrored);
  let turn = select(vec2f(1.0), vec2f(-1.0), mirrored & (tile >= vec2f(0.5)));
  return textureSampleGrad(itemTexture, itemSampler, select(folded, clamp(folded, edge, vec2f(1.0) - edge), held), layer, gx * turn, gy * turn);
}`}function _(a){return (_=$c0C(4)).apply(this,arguments)}var o=3,C=6,uz,n=E*4,s=4,t=5,i=6,r=7,a=8,e=9;function Oz(a){return (Oz=$c0C(6)).apply(this,arguments)}function Rz(){return (Rz=$c0C(7)).apply(this,arguments)}function vz(a){return (vz=$c0C(8)).apply(this,arguments)}var dz=`
fn decor_paintCellAt(floatBase: f32, idx: i32) -> f32 {
  let f = i32(floatBase) + idx;
  let element = tileMaps[f >> 1];
  return select(element.x, element.y, (f & 1) == 1);
}

fn decor_paintDensityIn(worldX: f32, worldZ: f32, paintA: vec4<f32>, floatBase: f32, follows: f32) -> f32 {
  let gridSize = i32(paintA.w);
  if (gridSize <= 0) { return 0.0; }
  let ix = i32(floor((worldX - paintA.x) * paintA.z));
  let iz = i32(floor((worldZ - paintA.y) * paintA.z));
  if (ix < 0 || iz < 0 || ix >= gridSize || iz >= gridSize) { return select(0.0, -1.0, follows > 0.5); }
  let value = decor_paintCellAt(floatBase, iz * gridSize + ix);
  if (value < 8388608.0) { return value; }
  let bits = u32(value - 8388608.0);
  let sx = min(u32(max((worldX - paintA.x) * paintA.z - f32(ix), 0.0) * 4.0), 3u);
  let sz = min(u32(max((worldZ - paintA.y) * paintA.z - f32(iz), 0.0) * 4.0), 3u);
  if (((bits >> (7u + sz * 4u + sx)) & 1u) == 1u) { return -1.0; }
  return (f32(bits & 127u) - 63.0) / 63.0;
}

fn decor_paintDensity(worldX: f32, worldZ: f32) -> f32 {
  return decor_paintDensityIn(worldX, worldZ, uniforms.paintA, uniforms.paintB.x, uniforms.paintB.z);
}
`;var e0=j*4,U=4,P=R0,w1=2,zz=64,lz="0.3",G1="-1e29",y1=16+j*12+j*16+M+U+4+4+8+4+12+e0*4,q5={center:0,chunkSize:3,upMode:4,clusterGate:5,clusterRadius:6,clusterFalloff:7,clusterStrength:8,noiseScale:9,noiseSeed:10,noiseThreshold:11,count:12,waterGate:13,waterMaxDepth:14,noiseGate:15,regions:16,regionStride:12,lods:16+j*12,lodStride:16,bindingMask:16+j*12+j*16,clusterLattice:16+j*12+j*16+M,ground:16+j*12+j*16+M+U,constraints:16+j*12+j*16+M+U+4,paintA:16+j*12+j*16+M+U+8,paintB:16+j*12+j*16+M+U+12,renderOrigin:16+j*12+j*16+M+U+16,refresh:16+j*12+j*16+M+U+20,refreshRect:16+j*12+j*16+M+U+24,refreshRunHead:16+j*12+j*16+M+U+28,refreshRuns:16+j*12+j*16+M+U+32},B1="0.25",F1=[Y(0,4,"uniform"),Y(1,4,"read-only-storage"),Y(2,4,"read-only-storage"),Y(3,4,"read-only-storage"),Y(4,4,"read-only-storage"),Y(5,4,"read-only-storage"),Y(6,4,"read-only-storage"),Y(7,4,"read-only-storage"),Y(8,4,"storage"),b(9,4,"float","2d-array"),Yz(10,4,"filtering"),Y(11,4,"uniform"),iz(12,4,"r32float"),Y(13,4,"uniform"),Y(14,4,"uniform"),Y(d,4,"uniform")],P1=`struct DecorRegion {
  a: vec4<f32>,
  b: vec4<f32>,
  c: vec4<f32>,
}

struct DecorLod {
  a: vec4<f32>,
  b: vec4<f32>,
  c: vec4<f32>,
  d: vec4<f32>,
}

struct DecorUniforms {
  centerChunk: vec4<f32>,
  clusterA: vec4<f32>,
  clusterB: vec4<f32>,
  countPad: vec4<f32>,
  regions: array<DecorRegion, ${j}>,
  lods: array<DecorLod, ${j}>,
  bindingMask: array<vec4<f32>, ${M/4}>,
  clusterLattice: vec4<f32>,
  ground: vec4<f32>,
  constraintRanges: vec4<f32>,
  paintA: vec4<f32>,
  paintB: vec4<f32>,
  renderOrigin: vec4<f32>,
  refresh: vec4<f32>,
  refreshRect: vec4<f32>,
  refreshRunHead: vec4<f32>,
  refreshRuns: array<vec4<f32>, ${e0}>,
}`,h1=14,Ez=P*64,m1=`struct DecorGround {
  tintPalette: array<vec4<f32>, ${P}>,
  albedoRows: array<vec4<f32>, ${P}>,
  macroRows: array<vec4<f32>, ${P}>,
  joinRows: array<vec4<f32>, ${P}>,
}

@group(0) @binding(${h1}) var<uniform> ground: DecorGround;`;function W1(z,$=0){let q=P;for(let J=$;J<q;J++){z.fill(1,J*4,J*4+4);let Q=(q+J)*4;z[Q]=O0,z.fill(0,Q+1,Q+4),z.fill(0,(q*2+J)*4,(q*2+J)*4+4);let X=(q*3+J)*4;z[X]=1,z[X+1]=1,z[X+2]=1,z[X+3]=0}return z}var Xz=24,f1=M*Xz,b1=`fn decor_maskAt(libraryIndex: u32) -> f32 {
  if (libraryIndex >= ${f1}u) { return 0.0; }
  let word = libraryIndex / ${Xz}u;
  let bits = u32(uniforms.bindingMask[word / 4u][word % 4u]);
  return f32((bits >> (libraryIndex % ${Xz}u)) & 1u);
}`,J5=`  let region = uniforms.regions[regionId];
  let gridW = max(i32(region.a.z), 1);
  let level = i32(region.a.w);
  let placementRadius = max(region.b.x, 1e-4);
  let cellSize = placementRadius * 2.0 / f32(gridW);
  let seed = i32(region.b.w);
  let hilbertMask = (1 << u32(level)) - 1;
  let pWrapped = vec2<i32>(gx & hilbertMask, gz & hilbertMask);
  let seedWrappedX = (seed ^ (seed >> 8u)) & hilbertMask;
  let seedWrappedZ = ((seed >> 16u) ^ (seed >> 24u)) & hilbertMask;
  let jitterXP = vec2<i32>((pWrapped.x + seedWrappedX + 17) & hilbertMask, (pWrapped.y + seedWrappedZ + 31) & hilbertMask);
  let jitterZP = vec2<i32>((pWrapped.x + seedWrappedZ + 73) & hilbertMask, (pWrapped.y + seedWrappedX + 11) & hilbertMask);
  let jitterX = terrain_blueNoise(jitterXP, level);
  let jitterZ = terrain_blueNoise(jitterZP, level);
  let worldX = (f32(gx) + jitterX + region.c.x) * cellSize;
  let worldZ = (f32(gz) + jitterZ + region.c.y) * cellSize;`,p1=`fn decor_clusterCenter(cell: vec2<i32>, seed: u32, cellSize: f32) -> vec2<f32> {
  let a = decor_mix((u32(cell.x) * 0x8da6b343u) ^ (seed * 0xcb1ab31fu));
  let b = decor_mix(a ^ (u32(cell.y) * 0xd8163841u));
  return (vec2<f32>(f32(cell.x), f32(cell.y)) + vec2<f32>(f32(a & 0xffffu), f32(b & 0xffffu)) / 65536.0) * cellSize;
}

fn decor_clusterMod(worldX: f32, worldZ: f32) -> f32 {
  let cellSize = max(uniforms.clusterLattice.x, 1.0);
  let seed = u32(uniforms.clusterLattice.y);
  let reach = clamp(i32(uniforms.clusterLattice.z), 1, ${w1});
  let p = vec2<f32>(worldX, worldZ);
  let cell = vec2<i32>(floor(p / cellSize));
  var minDist = 1e9;
  for (var dz = -reach; dz <= reach; dz++) {
    for (var dx = -reach; dx <= reach; dx++) {
      minDist = min(minDist, length(p - decor_clusterCenter(cell + vec2<i32>(dx, dz), seed, cellSize)));
    }
  }
  let clusterRadius = max(0.001, uniforms.clusterA.z);
  let falloff = clamp(uniforms.clusterA.w, 0.0, 1.0);
  var clusterMod = 1.0;
  if (falloff <= 0.0001) {
    clusterMod = select(0.0, 1.0, minDist <= clusterRadius);
  } else {
    clusterMod = 1.0 - smoothstep(clusterRadius * (1.0 - falloff), clusterRadius, minDist);
  }
  let clusterStrength = clamp(uniforms.clusterB.x, 0.0, 1.0);
  return (1.0 - clusterStrength) + clusterMod * clusterStrength;
}
`,N1=`fn decor_heightWord(lod: u32, index: u32) -> u32 {
  var value: u32;
  if (lod == 0u) { value = heights0[index]; } else if (lod == 1u) { value = heights1[index]; } else { value = heights2[index]; }
  return value;
}

${S0("decor_heightPost","lod: u32, ",(z)=>`decor_heightWord(lod, ${z})`)}

fn decor_slotWord(lod: u32, slot: i32, word: u32) -> u32 {
  return decor_heightWord(lod, u32(slot) * ${D0}u + word);
}

fn decor_blendAt(lod: u32, index: u32) -> u32 {
  var value: u32;
  if (lod == 0u) { value = blend0[index]; } else if (lod == 1u) { value = blend1[index]; } else { value = blend2[index]; }
  return value;
}

${o0("decor_blendWord","lod: u32, ",(z)=>`decor_blendAt(lod, ${z})`)}

fn decor_heightTexel(lod: u32, tile: vec3<u32>, x: i32, z: i32, texRes: i32) -> f32 {
  let cx = clamp(x, 0, texRes - 1);
  let cz = clamp(z, 0, texRes - 1);
  return decor_heightPost(lod, tile, u32(cx), u32(cz), u32(texRes));
}

fn decor_heightBilinear(lod: u32, slot: i32, p: vec2<f32>, texRes: i32) -> f32 {
  let i0 = floor(p);
  let f = p - i0;
  let x0 = i32(i0.x);
  let z0 = i32(i0.y);
  let tile = decor_heightPostHead(lod, decor_slotWord(lod, slot, 0u));
  let h00 = decor_heightTexel(lod, tile, x0, z0, texRes);
  let h10 = decor_heightTexel(lod, tile, x0 + 1, z0, texRes);
  let h01 = decor_heightTexel(lod, tile, x0, z0 + 1, texRes);
  let h11 = decor_heightTexel(lod, tile, x0 + 1, z0 + 1, texRes);
  return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}

fn decor_waterTexel(lod: u32, tile: vec3<u32>, water: vec3<u32>, seaLevel: f32, x: i32, z: i32, texRes: i32) -> f32 {
  var depth = max(seaLevel - decor_heightTexel(lod, tile, x, z, texRes), 0.0);
  if (water.x > 0u) { depth = max(depth, decor_heightTexel(lod, water, x, z, texRes)); }
  return depth;
}

fn decor_waterBilinear(lod: u32, slot: i32, waterTile: u32, seaLevel: f32, p: vec2<f32>, texRes: i32) -> f32 {
  let i0 = floor(p);
  let f = p - i0;
  let x0 = i32(i0.x);
  let z0 = i32(i0.y);
  let tile = decor_heightPostHead(lod, decor_slotWord(lod, slot, 0u));
  let water = decor_heightPostHead(lod, waterTile);
  let d00 = decor_waterTexel(lod, tile, water, seaLevel, x0, z0, texRes);
  let d10 = decor_waterTexel(lod, tile, water, seaLevel, x0 + 1, z0, texRes);
  let d01 = decor_waterTexel(lod, tile, water, seaLevel, x0, z0 + 1, texRes);
  let d11 = decor_waterTexel(lod, tile, water, seaLevel, x0 + 1, z0 + 1, texRes);
  return mix(mix(d00, d10, f.x), mix(d01, d11, f.x), f.y);
}

fn decor_sampleLod(lod: u32, worldX: f32, worldZ: f32, sample: ptr<function, DecorSample>) {
  let lodInfo = uniforms.lods[lod];
  if (lodInfo.b.z < 0.5) { (*sample).valid = 0; return; }
  let chunkSize = max(lodInfo.c.x, 1e-4);
  let tileGridSize = max(i32(lodInfo.a.z), 1);
  let tmX = floor((worldX - lodInfo.b.x) / chunkSize);
  let tmZ = floor((worldZ - lodInfo.b.y) / chunkSize);
  if (tmX < 0.0 || tmZ < 0.0 || tmX >= f32(tileGridSize) || tmZ >= f32(tileGridSize)) { (*sample).valid = 0; return; }
  let tmXi = i32(tmX);
  let tmZi = i32(tmZ);
  let cell = tileMaps[i32(lodInfo.a.w) + tmZi * tileGridSize + tmXi];
  let slot = i32(cell.x);
  let mapWord = i32(cell.y);
  (*sample).valid = select(0, 1, mapWord >= 1);
  if (mapWord < 1) { return; }
  let chunkOriginX = lodInfo.b.x + f32(tmXi) * chunkSize;
  let chunkOriginZ = lodInfo.b.y + f32(tmZi) * chunkSize;
  let localU = clamp((worldX - chunkOriginX) / chunkSize, 0.0, 1.0);
  let localV = clamp((worldZ - chunkOriginZ) / chunkSize, 0.0, 1.0);
  if (mapWord >= 2) {
    let sub = vec2<u32>(min(vec2<f32>(localU, localV) * ${c}.0, vec2<f32>(${c-1}.0)));
    if (((u32(mapWord - 2) >> (sub.y * ${c}u + sub.x)) & 1u) != 0u) { (*sample).valid = 0; return; }
  }
  let resMinus1 = max(lodInfo.a.x - 1.0, 1.0);
  let texRes = i32(max(lodInfo.a.y, 1.0));
  let texel = vec2<f32>(localU, localV) * resMinus1 + vec2<f32>(1.0);
  let texelF = texel + vec2<f32>(0.5);
  let waterTable = i32(lodInfo.b.w);
  let seaLevel = lodInfo.c.w;
  let wantWater = uniforms.countPad.y > 0.5 && (waterTable > 0 || seaLevel > ${G1});
  let taps = u32(uniforms.refresh.w) + 2u;
  var hC = 0.0; var hL = 0.0; var hR = 0.0; var hD = 0.0; var hU = 0.0;
  for (var t = 0u; t < taps; t++) {
    let off = vec2<f32>(select(0.0, f32(t) * 2.0 - 3.0, t == 1u || t == 2u), select(0.0, f32(t) * 2.0 - 7.0, t >= 3u));
    let v = decor_heightBilinear(lod, slot, texel + off, texRes);
    if (t == 0u) { hC = v; } else if (t == 1u) { hL = v; } else if (t == 2u) { hR = v; } else if (t == 3u) { hD = v; } else { hU = v; }
  }
  let level = bitcast<f32>(decor_slotWord(lod, slot, ${Mz}u));
  (*sample).height = hC + level;
  let worldStep = chunkSize / resMinus1;
  (*sample).normal = normalize(vec3<f32>((hL - hR) / (worldStep * 2.0), 1.0, (hD - hU) / (worldStep * 2.0)));
  let entry = decor_blendAt(lod, ${_0}u + u32(slot));
  let word = decor_blendWord(lod, entry, i32(floor(texelF.y)) * texRes + i32(floor(texelF.x)));
  var blendIndex = terrain_wordLayers(word);
  let blendWeight = vec3<f32>(terrain_wordQuanta(word)) / 127.0;
  if (decor_blendAt(lod, ${E0}u) > 0u) {
    let palette = (entry & 0xffffffe0u) - ${s0}u;
    blendIndex = vec3<u32>(decor_blendAt(lod, palette + blendIndex.x), decor_blendAt(lod, palette + blendIndex.y), decor_blendAt(lod, palette + blendIndex.z));
  }
  (*sample).boundWeight = blendWeight.x * decor_maskAt(blendIndex.x) + blendWeight.y * decor_maskAt(blendIndex.y) + blendWeight.z * decor_maskAt(blendIndex.z);
  (*sample).dominantBound = decor_maskAt(blendIndex.x);
  let chunkOrigin = vec2<f32>(chunkOriginX, chunkOriginZ);
  let chunkLocal = vec2<f32>(worldX - chunkOriginX, worldZ - chunkOriginZ);
  let worldXZ = vec2<f32>(worldX, worldZ);
  var groundSum = vec3<f32>(0.0);
  for (var k = 0u; k < u32(uniforms.refresh.w); k++) {
    groundSum += blendWeight[k] * decor_groundColor(blendIndex[k], chunkOrigin, chunkLocal, worldXZ);
  }
  let groundWeight = blendWeight.x + blendWeight.y + blendWeight.z;
  let heightShade = mix(${Zz[0]}, ${Zz[1]}, clamp(((*sample).height - lodInfo.c.y) * lodInfo.c.z, 0.0, 1.0));
  (*sample).tint = select(vec3<f32>(1.0), (groundSum / max(groundWeight, 1e-3)) * heightShade, groundWeight > 1e-3);
  if (wantWater) {
    var waterTile = 0u;
    if (waterTable > 0) { waterTile = decor_slotWord(lod, slot, u32(waterTable)); }
    (*sample).waterDepth = decor_waterBilinear(lod, slot, waterTile, seaLevel - level, texel, texRes);
  }
}
`,I1=0,z1=1,$1=3,T1=12,A1=8+$1*T1,L1=`struct FloorLod {
  a: vec4<f32>,
  b: vec4<f32>,
  c: vec4<f32>,
}

struct FloorParams {
  window: vec4<f32>,
  depth: vec4<f32>,
  lods: array<FloorLod, ${$1}>,
}

@group(0) @binding(11) var<uniform> params: FloorParams;
@group(0) @binding(12) var floorOut: texture_storage_2d<r32float, write>;
@group(0) @binding(13) var<uniform> phase: vec4<u32>;

fn cover_floorLod(lod: u32, lo: vec2<f32>, hi: vec2<f32>, low: ptr<function, f32>) -> bool {
  let info = params.lods[lod];
  if (info.b.z < 0.5) { return false; }
  let chunkSize = max(info.c.x, 1e-4);
  let grid = max(i32(info.a.z), 1);
  let cells = max(i32(info.a.x) - 1, 1);
  let texRes = max(i32(info.a.y), 1);
  let step = chunkSize / f32(cells);
  let t0 = vec2<i32>(floor((lo - info.b.xy) / chunkSize));
  let t1 = vec2<i32>(floor((hi - info.b.xy) / chunkSize));
  var answered = false;
  for (var tz = max(t0.y, 0); tz <= min(t1.y, grid - 1); tz = tz + 1) {
    for (var tx = max(t0.x, 0); tx <= min(t1.x, grid - 1); tx = tx + 1) {
      let cell = tileMaps[i32(info.a.w) + tz * grid + tx];
      if (i32(cell.y) < 1) { continue; }
      let tile = decor_heightPostHead(lod, decor_slotWord(lod, i32(cell.x), 0u));
      let level = bitcast<f32>(decor_slotWord(lod, i32(cell.x), ${Mz}u));
      let origin = info.b.xy + vec2<f32>(f32(tx), f32(tz)) * chunkSize;
      let k0 = clamp(vec2<i32>(floor((lo - origin) / step)), vec2<i32>(0), vec2<i32>(cells));
      let k1 = clamp(vec2<i32>(ceil((hi - origin) / step)), vec2<i32>(0), vec2<i32>(cells));
      for (var kz = k0.y; kz <= k1.y; kz = kz + 1) {
        for (var kx = k0.x; kx <= k1.x; kx = kx + 1) {
          *low = min(*low, decor_heightPost(lod, tile, u32(kx + 1), u32(kz + 1), u32(texRes)) + level);
        }
      }
      answered = true;
    }
  }
  return answered;
}

fn cover_floor(id: vec2<u32>) {
  let texels = u32(params.window.w);
  if (id.x >= texels || id.y >= texels) { return; }
  let lo = params.window.xy + vec2<f32>(id.xy) * params.window.z;
  let hi = lo + vec2<f32>(params.window.z);
  var low = 3.0e38;
  var answered = false;
  for (var lod = 0u; lod < u32(params.depth.z); lod++) {
    answered = cover_floorLod(lod, lo, hi, &low) || answered;
  }
  let depth = select(-1.0, (low - params.depth.x) * params.depth.y, answered);
  textureStore(floorOut, vec2<i32>(id.xy), vec4<f32>(depth, 0.0, 0.0, 0.0));
}`,xz=16,C1=xz*y1*4,Q5=4294967295;function g1(a){return (g1=$c0C(9)).call(this,a)}function c1(){let z=[];return z.push("//"),z.push(P1),z.push(`@group(0) @binding(0) var<uniform> decorJobs: array<DecorUniforms, ${xz}>;
var<private> decorJob: u32;
@group(0) @binding(1) var<storage, read> heights0: array<u32>;
@group(0) @binding(2) var<storage, read> heights1: array<u32>;
@group(0) @binding(3) var<storage, read> heights2: array<u32>;
@group(0) @binding(4) var<storage, read> blend0: array<u32>;
@group(0) @binding(5) var<storage, read> blend1: array<u32>;
@group(0) @binding(6) var<storage, read> blend2: array<u32>;
@group(0) @binding(7) var<storage, read> tileMaps: array<vec2<f32>>;
@group(0) @binding(8) var<storage, read_write> outData: array<u32>;
@group(0) @binding(9) var groundAlbedo: texture_2d_array<f32>;
@group(0) @binding(10) var groundSampler: sampler;

${m1}

${Nz}

struct DecorSample {
  valid: i32,
  height: f32,
  normal: vec3<f32>,
  boundWeight: f32,
  dominantBound: f32,
  tint: vec3<f32>,
  waterDepth: f32,
}

${b1}

fn decor_groundColor(libraryIndex: u32, chunkOrigin: vec2<f32>, chunkLocalMeters: vec2<f32>, worldXZ: vec2<f32>) -> vec3<f32> {
  if (libraryIndex >= ${P}u) { return vec3<f32>(1.0); }
  let index = libraryIndex;
  let tint = ground.tintPalette[index].rgb;
  let row = ground.albedoRows[index];
  let drift = ground.macroRows[index];
  let joinRow = ground.joinRows[index];
  if (row.x >= 0.5) { return terrain_applyMacro(joinRow.rgb, worldXZ, drift.x, drift.y, drift.z); }
  let texSize = vec2<f32>(textureDimensions(groundAlbedo, 0));
  let texelsPerFootprint = ${B1} * abs(row.z) * max(texSize.x, texSize.y);
  let lod = max(log2(max(texelsPerFootprint, 1.0)), drift.w);
  let albedo = textureSampleLevel(groundAlbedo, groundSampler, terrain_tilePhase(chunkOrigin, row.z) + chunkLocalMeters * row.z, i32(max(row.y, 0.0)), lod).rgb;
  return terrain_applyMacro(mix(terrain_applyTint(albedo, tint, row.w), joinRow.rgb, joinRow.w), worldXZ, drift.x, drift.y, drift.z);
}

${dz}`),z.push(v),z.push(p1),z.push(l0),z.push(v0),z.push(d0),z.push(t0),z.push(n0),z.push(kz),z.push(i0),z.push(N1),z.push(`
fn decor_windowCell(lo: i32, slot: i32, n: i32) -> i32 {
  return lo + (((slot - lo) % n) + n) % n;
}

fn decor_cellInMovedGround(cellX: i32, cellZ: i32, cellSize: f32) -> bool {
  let rect = uniforms.refreshRect;
  if (rect.x > rect.z) { return false; }
  let x0 = f32(cellX - 1) * cellSize;
  let z0 = f32(cellZ - 1) * cellSize;
  return x0 <= rect.z && x0 + 3.0 * cellSize >= rect.x && z0 <= rect.w && z0 + 3.0 * cellSize >= rect.y;
}

fn decor_jobBase(candidateIndex: u32) -> u32 {
  return bitcast<u32>(uniforms.refreshRunHead.z) + decor_candidateBase(candidateIndex);
}

${g1("decor_jobBase(id)")}
fn decor_batchRow(regionId: i32, id: u32, count: u32) -> u32 {
  var first = 0u;
  for (var r = 0; r < regionId; r++) { first += u32(uniforms.regions[r].c.w); }
  var lo = first;
  var hi = first + u32(uniforms.regions[regionId].c.w) - 1u;
  let table = decor_jobBase(count);
  while (lo < hi) {
    let mid = (lo + hi + 1u) / 2u;
    if (outData[table + mid * ${R}u] <= id) { lo = mid; } else { hi = mid - 1u; }
  }
  return table + lo * ${R}u;
}

fn decor_runSlot(thread: u32) -> u32 {
  var run = uniforms.refreshRuns[0];
  for (var k = 1u; k < u32(uniforms.refreshRunHead.x); k++) {
    if (u32(uniforms.refreshRuns[k].w) > thread) { break; }
    run = uniforms.refreshRuns[k];
  }
  let local = thread - u32(run.w);
  let width = max(u32(run.y), 1u);
  return u32(run.x) + (local / width) * u32(run.z) + local % width;
}

fn decor_place(gid: vec3<u32>, grid: vec3<u32>) {
  let dispatched = gid.x + gid.y * grid.x * ${zz}u;
  var job = 0u;
  var open = true;
${Array.from({length:xz-1},($,q)=>`  open = open & (bitcast<u32>(decorJobs[${q+1}u].refreshRunHead.w) <= dispatched);
  job += select(0u, 1u, open);
`).join("")}  decorJob = job;
  let thread = dispatched - bitcast<u32>(decorJobs[job].refreshRunHead.w);
  var id = thread;
  if (uniforms.refresh.z > 1.5) {
    if (thread >= u32(uniforms.refreshRunHead.y)) { return; }
    id = decor_runSlot(thread);
  }
  let count = u32(uniforms.countPad.x);
  if (id >= count) { return; }
  let idInt = i32(id);

  var regionId = 0;
  if (idInt >= i32(uniforms.regions[2].a.x)) { regionId = 2; }
  else if (idInt >= i32(uniforms.regions[1].a.x)) { regionId = 1; }
  var region = uniforms.regions[regionId];
  var regionOffset = i32(region.a.x);
  var regionCount = i32(region.a.y);
  var center = uniforms.centerChunk.xyz;
  var paintA = uniforms.paintA;
  var paintBase = uniforms.paintB.x;
  var paintFollows = uniforms.paintB.z;
  let batched = region.c.w > 0.5;
  var anchoredRow = false;
  if (batched) {
    let row = decor_batchRow(regionId, id, count);
    regionOffset = i32(outData[row]);
    regionCount = i32(outData[row + 1u]);
    region.a.z = bitcast<f32>(outData[row + 2u]);
    region.a.w = bitcast<f32>(outData[row + 3u]);
    region.b.x = bitcast<f32>(outData[row + 4u]);
    region.b.w = bitcast<f32>(outData[row + 5u]);
    region.c.x = bitcast<f32>(outData[row + 6u]);
    region.c.y = bitcast<f32>(outData[row + 7u]);
    region.c.z = bitcast<f32>(outData[row + 8u]);
    anchoredRow = bitcast<f32>(outData[row + 17u]) < 0.5;
    if (anchoredRow) {
      center.x = bitcast<f32>(outData[row + 9u]);
      center.z = bitcast<f32>(outData[row + 10u]);
    }
    paintBase = bitcast<f32>(outData[row + 11u]);
    paintA = vec4<f32>(bitcast<f32>(outData[row + 12u]), bitcast<f32>(outData[row + 13u]), bitcast<f32>(outData[row + 14u]), bitcast<f32>(outData[row + 15u]));
    paintFollows = bitcast<f32>(outData[row + 16u]);
  }
  let localId = idInt - regionOffset;
  let inRegionRange = localId >= 0 && localId < regionCount;

  let gridW = max(i32(region.a.z), 1);
  let level = i32(region.a.w);
  let placementRadius = max(region.b.x, 1e-4);
  let cellSize = placementRadius * 2.0 / f32(gridW);
  let ix = localId % gridW;
  let iy = localId / gridW;
  let snapCellX = i32(floor(center.x / cellSize));
  let snapCellZ = i32(floor(center.z / cellSize));
  let halfW = gridW / 2;
  var worldCellX = snapCellX + ix - halfW;
  var worldCellZ = snapCellZ + iy - halfW;
  let rows = max(regionCount / gridW, 1);
  let windowed = regionCount == gridW * rows;
  if (windowed) {
    let halfH = rows / 2;
    worldCellX = decor_windowCell(snapCellX - halfW, ix, gridW);
    worldCellZ = decor_windowCell(snapCellZ - halfH, iy, rows);
    if (uniforms.refresh.z < 0.5 && !anchoredRow) {
      let lastLoX = i32(floor(uniforms.refresh.x / cellSize)) - halfW;
      let lastLoZ = i32(floor(uniforms.refresh.y / cellSize)) - halfH;
      if (decor_windowCell(lastLoX, ix, gridW) == worldCellX && decor_windowCell(lastLoZ, iy, rows) == worldCellZ && !decor_cellInMovedGround(worldCellX, worldCellZ, cellSize)) { return; }
    }
  }

  let seed = i32(region.b.w);
  let block = max(i32(region.c.z), 1);
  var latticeCell = vec2<i32>(worldCellX, worldCellZ);
  if (block > 1) {
    let pick = i32(decor_candidateId(latticeCell, u32(seed) ^ 0x68e31da4u) % u32(block * block));
    latticeCell = latticeCell * block + vec2<i32>(pick % block, pick / block);
  }
  let latticeSize = cellSize / f32(block);
  let hilbertMask = (1 << u32(level)) - 1;
  let pWrapped = vec2<i32>(latticeCell.x & hilbertMask, latticeCell.y & hilbertMask);
  let seedWrappedX = (seed ^ (seed >> 8u)) & hilbertMask;
  let seedWrappedZ = ((seed >> 16u) ^ (seed >> 24u)) & hilbertMask;
  let jitterXP = vec2<i32>((pWrapped.x + seedWrappedX + 17) & hilbertMask, (pWrapped.y + seedWrappedZ + 31) & hilbertMask);
  let jitterZP = vec2<i32>((pWrapped.x + seedWrappedZ + 73) & hilbertMask, (pWrapped.y + seedWrappedX + 11) & hilbertMask);
  let hashP = vec2<i32>((pWrapped.x + seedWrappedZ + 99) & hilbertMask, (pWrapped.y + seedWrappedX + 53) & hilbertMask);
  let paintP = vec2<i32>((pWrapped.x + seedWrappedX + 57) & hilbertMask, (pWrapped.y + seedWrappedZ + 91) & hilbertMask);
  var jitterX = 0.0;
  var jitterZ = 0.0;
  var hashVal = 0.0;
  var paintHash = 0.0;
  for (var q = 0u; q < u32(uniforms.refresh.w) + 1u; q++) {
    var bp = jitterXP;
    if (q == 1u) { bp = jitterZP; } else if (q == 2u) { bp = hashP; } else if (q == 3u) { bp = paintP; }
    let v = terrain_blueNoise(bp, level);
    if (q == 0u) { jitterX = v; } else if (q == 1u) { jitterZ = v; } else if (q == 2u) { hashVal = v; } else { paintHash = v; }
  }
  let worldX = (f32(latticeCell.x) + jitterX + region.c.x) * latticeSize;
  let worldZ = (f32(latticeCell.y) + jitterZ + region.c.y) * latticeSize;
  let candidateId = decor_candidateId(latticeCell, u32(seed));

  let dx = worldX - center.x;
  let dz = worldZ - center.z;
  let distSq = dx * dx + dz * dz;
  let skipByRegion = !inRegionRange || (!windowed && distSq > placementRadius * placementRadius) || decor_deckDead(u32(seed), candidateId);
  var outPos = vec3<f32>(worldX, 0.0, worldZ) - uniforms.renderOrigin.xyz;
  var outNormal = vec3<f32>(0.0, 1.0, 0.0);
  var outTint = vec3<f32>(1.0);
  var outCoverage = 0.0;

  var sample: DecorSample;
  sample.valid = 0;
  sample.height = 0.0;
  sample.normal = vec3<f32>(0.0, 1.0, 0.0);
  sample.boundWeight = 0.0;
  sample.dominantBound = 0.0;
  sample.tint = vec3<f32>(1.0);
  sample.waterDepth = 0.0;
  for (var lod = 0u; lod < select(u32(uniforms.refresh.w), 0u, skipByRegion); lod++) {
    decor_sampleLod(lod, worldX, worldZ, &sample);
    if (sample.valid != 0) { break; }
  }
  if (!skipByRegion && sample.valid == 0) {
    outPos = vec3<f32>(worldX, 0.0, worldZ);
  }
  if (!skipByRegion && sample.valid != 0) {

  let slope = clamp(1.0 - sample.normal.y, 0.0, 1.0);
  let placementAllowed = slope >= uniforms.constraintRanges.x &&
    slope <= uniforms.constraintRanges.y && sample.height >= uniforms.constraintRanges.z &&
    sample.height <= uniforms.constraintRanges.w;`),z.push(`

  let paintD = decor_paintDensityIn(worldX, worldZ, paintA, paintBase, paintFollows);
  var isBound = sample.boundWeight > max(hashVal, ${B(L0)});
  if (paintD > 0.0 && paintHash < paintD) { isBound = true; }
  if (uniforms.paintB.y > 0.5) { isBound = paintD > 0.0 && paintHash < paintD && sample.dominantBound > 0.5; }

  var effectiveScale = 1.0;
  if (uniforms.clusterA.y > 0.5) { effectiveScale *= decor_clusterMod(worldX, worldZ); }
  if (uniforms.countPad.w > 0.5) {
    let noiseSeed = uniforms.clusterB.z;
    let noiseCoord = vec2<f32>(worldX + noiseSeed * 17.31, worldZ + noiseSeed * 31.17) * uniforms.clusterB.y;
    let noiseValue = terrain_gradientNoise2D(noiseCoord) * 0.5 + 0.5;
    let t = (noiseValue - uniforms.clusterB.w) / 0.12;
    effectiveScale *= clamp(t, 0.0, 1.0);
  }
  if (paintD > 0.0) { effectiveScale = max(effectiveScale, min(paintD, 1.0)); }
  if (paintD <= -1.0 || (paintD < 0.0 && paintHash < -paintD)) { effectiveScale = 0.0; }
  //${lz}
  if (uniforms.countPad.y > 0.5) {
    effectiveScale *= 1.0 - smoothstep(uniforms.countPad.z, uniforms.countPad.z + ${lz}, sample.waterDepth);
  }
  //`),z.push(`
  outCoverage = select(0.0, clamp(effectiveScale, 0.0, 1.0), isBound && placementAllowed);
  outPos = vec3<f32>(worldX, sample.height, worldZ) - uniforms.renderOrigin.xyz;
  outNormal = sample.normal;
  outTint = sample.tint;
  }
  decor_writeCandidate(id, outPos, outNormal, outTint, outCoverage, candidateId);
}

${L1}

@compute @workgroup_size(${zz})
fn main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) grid: vec3<u32>, @builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  if (phase.x == ${z1}u) {
    //${zz}
    cover_floor(wg.xy * 8u + vec2<u32>(li % 8u, li / 8u));
    return;
  }
  decor_place(gid, grid);
}`),z.join(`
`).replace(/\buniforms\./g,"decorJobs[decorJob].")}var D1="terrain/decor-sampler",j5="terrain/decor-bed-shape",q1=new WeakMap;function Z5(z){let $=q1.get(z)??S1(z);if($.reissues!==S())ba($);return $.quiet}function S1(a){return (S1=$c0C(10)).call(this,a)}function X5(z,$){let q=D1;return $.getComputePipeline(q,function(){let J=c1(),Q=z.createPipelineLayout({label:q,bindGroupLayouts:[$.getBindGroupLayout(F1,"terrain decor sampler")]});return{label:q,layout:Q,compute:{module:z.createShaderModule({label:q,code:J}),entryPoint:"main"}}},{bodyProgram:!0})}var x5=96,_z={colorR:0,colorG:1,colorB:2,alphaTest:3,widthScaleMin:4,widthScaleMax:5,heightScaleMin:6,heightScaleMax:7,randomRotation:8,windForce:9,windScale:10,windSpeed:11,cardHeightInv:12,sink:13,instanceCount:14,uvShiftV:15,tipColorR:16,tipColorG:17,tipColorB:18,tipBlend:19,jitterHue:20,jitterValue:21,patternStrength:22,terrainNormal:23,regions:24,regionStride:4,geometry:36,uvRegion:40,transition:44,tileBirthLods:48,tileBirthMeta:60,flags:64,flagVariation:64,flagWind:65,flagTinted:66,flagJitter:67,law:68,lawFootprint:68,lawWholeInverse:69,lawHeight:70,lawRoughness:71,coverA:72,coverB:76,recordsShift:80,runClamp:84,runMirror:88,runEase:92},Y5=_z.runEase+4-_z.runClamp,J1=7,Q1=8,u1=[Y(0,1|2,"uniform"),Y(1,1,"read-only-storage"),b(2,2,"float","2d-array"),Yz(3,2,"filtering"),Y(4,1,"read-only-storage"),Y(J1,1,"read-only-storage"),b(Q1,1,"depth","2d-array"),b(r0,1,"depth","2d-array")],j1=5,O1,R1;function v1(z,$,q=!1,J=!1){let Q=x0($,o);if(z==="storage")return`@builtin(vertex_index) vertexIndex: u32, ${Q}`;return`${Rz(q,J).join(", ")}, ${Q}`}function d1(z,$="vertex"){return l1(u1,j1,C,z,$)}function l1(z,$,q,J,Q){let X=J==="storage"?[...z,Z0($)]:z;return Q==="storage"?[...X,{binding:q,visibility:1,buffer:{type:"read-only-storage"}}]:X}function E1(a){return (E1=$c0C(13)).call(this,a)}var K5={draw:(z)=>z.cutout||z.runCutout===!0||z.dissolve||z.levelFade===!0},Z1="select(0.95, item.law.w, item.law.w > 0.0)",_1=(z)=>(_1=$c0C(14))(z),o1;function n1(a){return (n1=$c0C(16)).call(this,a)}var s1;function t1(a){return (t1=$c0C(18)).call(this,a)}var X1=(z)=>z.cutout||z.runCutout===!0||z.dissolve;function Vz(z){if(z.levelFade!==!0||!X1(z))return z;let{levelFade:$,...q}=z;return q}function oz(a){return (oz=$c0C(19)).apply(this,arguments)}function i1(z){if(z.surface===!0)return y0(z.motion===!0);return z.motion?"DecorationOutput":"@location(0) vec4<f32>"}var nz=[{arrayStride:n,stepMode:"vertex",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32x3",offset:12,shaderLocation:1},{format:"float32x2",offset:24,shaderLocation:2},{format:"float32x3",offset:32,shaderLocation:s},{format:"float32",offset:44,shaderLocation:t},{format:"float32",offset:48,shaderLocation:i},{format:"float32",offset:52,shaderLocation:r},{format:"float32x2",offset:56,shaderLocation:a},{format:"float32",offset:64,shaderLocation:e}]},j0(o)];function r1(z,$="vertex"){let q=$==="storage"?[]:[nz[0]];if(z==="storage")return q;return[...q,nz[1]]}function H5(z,$,q,J=0){let Q=q==="storage"?[]:[{buffer:z}],X=$?[...Q,J>0?{buffer:$,offset:J}:{buffer:$}]:Q;return X.length>0?X:void 0}function a1(z){return z=Vz(z),`${z.cutout?"c":""}${z.runCutout===!0?"k":""}${z.dissolve?"d":""}${z.receiveShadow===!1?"u":""}${z.glow===!0?"g":""}${z.pbr===!0?"p":""}${z.levelFade===!0?"f":""}`||"-"}function M5(z,$,q,J="vertex",Q="vertex",X=p(),x){return x1("draw",z,$,q,J,Q,X,x)}function k5(z){return D()===1&&(z||!q0())}var sz=$0(!0);function V5(z,$,q,J="vertex",Q="vertex",X=p()){return x1("depth",z,$,q,J,Q,X)}function x1(a,b,c,d,e,f){return (x1=$c0C(20)).apply(this,arguments)}
;

function aa(){return(`
  let glow = decorVertex.glow;`)}
function ba($){$.reissues=S(),$.quiet=$.read();
}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{azj as a0,s48 as r0}from"./2e5fd6befe42cca7.mjs";import{sdd as E}from"./d78d80a5-ec7dd8a579991798.mjs";import{kOT as C0,nbA as g0}from"./15b7dc390eb7835d.mjs";import{$Zq as s0,FNv as _0,Ffa as n0,HHM as u0,Hma as E0,LSm as O0,U_O as Zz,YrD as t0,eBN as i0,eNv as kz,frd as v0,g4_ as d0,jIK as o0,yqf as l0}from"./3a143d46-c72a17da50e9068c.mjs";import{CfE as S0,NP4 as Mz,i7u as D0}from"./73c224890e5dcb5e.mjs";import{D9n as Hz,EJ8 as Cz,Gwp as Lz,TW5 as Az,aFe as c0}from"./47cd27b7baa599f1.mjs";export{$1 as jRI,A1 as z2K,Bz as qe8,C as SCU,C1 as BmU,D1 as DLO,Dz as erX,Ez as g_F,F1 as rgn,Fz as RBG,H1 as vlr,H4 as n6j,H5 as n0j,J1 as RS2,J4 as S4G,J5 as NHy,K5 as XT_,M4 as cEv,M5 as _Np,Oz as Xdx,P as fWP,P1 as Hrg,Pz as F1k,Q1 as qG5,Q4 as H0F,Q5 as Qj_,R as z7h,Rz as jYA,Sz as m1V8,T1 as KjW,V5 as BvO,X5 as Vvg,Xz as udQ,Y5 as RMw,Z4 as SIS,Z5 as v2Q,_ as BO6,_z as Oeu,b1 as TeC,cz as PK9,d as orv,d1 as R2w,dz as MK4,e0 as VAD,f1 as CgJ,g1 as ffx,gz as $m5,h1 as ifh,hz as mQ3,j as S1p,j1 as Slh,j4 as jWu,j5 as tk_,k5 as j9M,l1 as aJn,lz as Dlo,o as HZa,p1 as Ht7,q5 as g0A,r1 as mkB,v as P5$,vz as XJQ,w1 as W$e,x5 as fez,xz as TR_,y1 as UXj,zz as hmF};
