import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(($)=>`struct WaterHold {\n  inv0: vec4<f32>,\n  inv1: vec4<f32>,\n  inv2: vec4<f32>,\n  sphere: vec4<f32>,\n  span: vec4<f32>,\n}\nstruct WaterHolds {\n  count: vec4<f32>,\n  holds: array<WaterHold, 16>,\n  planes: array<vec4<f32>, ${$.planes}>,\n}\n@group(3) @binding(${f7}) var<${$.storage?"storage, read":"uniform"}> waterHolds: WaterHolds;\nfn water_holdDryness(p: vec3<f32>, restY: f32, ground: f32) -> f32 {\n  var dry = 0.0;\n  let count = u32(waterHolds.count.x);\n  for (var i = 0u; i < count; i++) {\n    let sphere = waterHolds.holds[i].sphere;\n    let span = waterHolds.holds[i].span;\n    let open = 1.0 - smoothstep(span.z - ${D1}, span.z, restY);\n    let d = p - sphere.xyz;\n    if (open <= dry || span.w > ground || dot(d, d) > sphere.w * sphere.w) { continue; }\n    let q = vec4<f32>(p, 1.0);\n    let local = vec3<f32>(dot(waterHolds.holds[i].inv0, q), dot(waterHolds.holds[i].inv1, q), dot(waterHolds.holds[i].inv2, q));\n    var inside = true;\n    let last = u32(span.x + span.y);\n    for (var j = u32(span.x); j < last; j++) {\n      let plane = waterHolds.planes[j];\n      if (dot(plane.xyz, local) > plane.w) {\n        inside = false;\n        break;\n      }\n    }\n    if (inside) { dry = open; }\n  }\n  return dry;\n}`)',()=>'(function($){if((k$($)?.rays??1)===1)return[];return["  let mirrorPdx = dpdx(waterNear);","  let mirrorPdy = dpdy(waterNear);","  let mirrorNdx = dpdx(waterMirrorNormal);","  let mirrorNdy = dpdy(waterMirrorNormal);"]})',()=>"(()=>`@group(2) @binding(0) var<uniform> water: WaterUniforms;\n@group(2) @binding(1) var waterNormalTex: texture_2d<f32>;\n@group(2) @binding(2) var waterRepeatSampler: sampler;\n@group(2) @binding(3) var waterCausticsTex: texture_2d_array<f32>;\n@group(2) @binding(4) var waterCrestFoamTex: texture_2d<f32>;\n@group(2) @binding(5) var waterShoreFoamTex: texture_2d<f32>;\n@group(2) @binding(6) var waterSceneColorTex: texture_2d<f32>;\n@group(2) @binding(7) var waterSceneDepthTex: texture_2d<f32>;\n@group(2) @binding(8) var waterClampSampler: sampler;\n@group(2) @binding(9) var waterPointSampler: sampler;\n${Q2}\n${p2}\n@group(3) @binding(${U9}) var waterRows: texture_2d<f32>;\n@group(3) @binding(${M9}) var waterVertices: texture_2d<u32>;\n@group(3) @binding(${G9}) var waterWindows: texture_2d<f32>;\n${B9}`)",()=>"(()=>(`fn water_planeOutside(plane: vec4<f32>, p: vec4<f32>, radius: f32) -> bool {\n  return dot(plane, p) < -radius * length(plane.xyz);\n}\nfn water_drawUnseen() -> bool {\n  let bound = waterDraw.bound;\n  if (bound.w < 0.0) { return false; }\n  var centre = (waterDraw.model * vec4<f32>(bound.xyz, 1.0)).xyz + (waterDraw.anchor.xyz - frame.sourceOrigin);\n  if (frame.guest != 0.0) { centre = (frame.guestMap * vec4<f32>(centre, 1.0)).xyz; }\n  let m = frame.viewProj;\n  let x = vec4<f32>(m[0][0], m[1][0], m[2][0], m[3][0]);\n  let y = vec4<f32>(m[0][1], m[1][1], m[2][1], m[3][1]);\n  let z = vec4<f32>(m[0][2], m[1][2], m[2][2], m[3][2]);\n  let w = vec4<f32>(m[0][3], m[1][3], m[2][3], m[3][3]);\n  let p = vec4<f32>(centre, 1.0);\n  let r = bound.w;\n  return water_planeOutside(w + x, p, r) || water_planeOutside(w - x, p, r) || water_planeOutside(w + y, p, r) || water_planeOutside(w - y, p, r) || water_planeOutside(w - z, p, r) || (waterDraw.fade.z <= 0.0 && water_planeOutside(z, p, r));\n}\nfn water_unseenVertex() -> WaterVaryings {\n  var out: WaterVaryings;\n  out.position = vec4<f32>(0.0, 0.0, -2.0, 1.0);\n  return out;\n}`))"]},function(){return[()=>"(()=>(`fn water_nearEye(v: WaterVaryings) -> WaterVaryings {\n  var out = v;\n  out.positionRender = v.positionRender - lume_eyeAnchor();\n  out.sourcePositionRender = v.sourcePositionRender - water_sourceAnchor();\n  return out;\n}`))",()=>'(($=!1)=>`${J4($)}\n${EY}\n${(_Y??=$c0I(4))}\n${wY}\n${(fY??=$c0I(3))}\n@vertex fn vs(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> WaterVaryings {\n  let grid = instance >= ${t0}u;\n  var slot = instance;\n  if (grid) { slot = vertex >> ${$7}u; }\n  water_cullRow(slot);\n  if (water_drawUnseen()) { return water_unseenVertex(); }\n  water_restOfRow(slot);${$?`\n  water_priorRow(slot);`:""}\n  var point = vec4<f32>(0.0);\n  var channel = vec2<f32>(0.0);\n  var farPoint = vec3<f32>(0.0);\n  if (grid) {\n    let corner = vertex & ${2**$7-1}u;\n    point = water_gridPoint(vec3<f32>(f32(corner % ${D2}u), f32(corner / ${D2}u), 0.0), instance - ${t0}u, slot);\n  } else {\n    let own = water_arenaVertex(vertex - u32(waterDraw.arena.x));\n    point = vec4<f32>(own.position, 1.0);\n    channel = own.channel;\n    farPoint = own.position;\n  }\n  var out: WaterVaryings;\n  if (point.w > 0.0) {\n    out = water_nearEye(water_pastFar(water_surfaceVertex(point.xyz, channel), farPoint));\n  } else {\n    out = water_nearEye(water_pastFar(water_unseenVertex(), farPoint));\n  }\n  out.slot = slot;\n  return out;\n}`)',()=>'(function($){let J=$.depthPipelineEnabled&&$.shoreFoamEnabled?R1($.causticClass):0;if(J===0)return"  let wakeFormation = 0.0;";let Q=(K)=>`water_wakeObstacle(in.positionWorld, surfaceClip, ${K}, channelTap)`;let Z=(K)=>`water_bowObstacle(in.positionWorld, surfaceClip, ${K}, channelTap)`;let {fractions:q,table:Y}=l2(J,(K)=>1-0.7*K);let X=`    var wakeAlong = array<vec2<f32>, ${q.length}>(${Y});\n    var wakeLast = 0.0;\n    for (var wakeAt = 0u; wakeAt < ${q.length}u; wakeAt = wakeAt + 1u) {\n      let wake = wakeAlong[wakeAt];\n      let wakeTap = ${Q("wakeStepWorld * wake.x")};\n      if (wakeAt > 0u) {\n        wakeSignal = max(wakeSignal, min(wakeLast, wakeTap) * wake.y);\n      }\n      wakeLast = wakeTap;\n    }`;return`  var wakeFormation = 0.0;\n  if (${S0} && water.shoreFoamMix > 0.001 && water.flowSpeed > ${F(d1)} && water.foamStrength > 0.0 && water.shorelineFoamStrength > 0.0 && hasDepthHit > 0.5 && frontFace > 0.5) {\n    let wakeLength = ${F(_1)} + ${F(w1)} * localFlowSpeed;\n    let wakeStepWorld = -flowT * wakeLength;\n    let surfaceClip = water_clipOf(in.positionRender);\n    let channelTap = water_channelTapAt(in.channel.x, channelGradS);\n    var wakeSignal = 0.0;\n${X}\n    let bowDistance = ${F(g1)} * clamp(localFlowSpeed / ${F(u1)}, 0.6, 2.0);\n    let bowStep = -bowDistance / wakeLength;\n    let bowNearStep = bowStep * ${F(m1)};\n    var bowSignal = 0.0;\n    for (var bowAt = 0u; bowAt < 2u; bowAt = bowAt + 1u) {\n      let bowFar = bowAt == 1u;\n      bowSignal = max(bowSignal, ${Z("wakeStepWorld * select(bowNearStep, bowStep, bowFar)")} * select(1.0, ${F(p1)}, bowFar));\n    }\n    wakeFormation = clamp(max(wakeSignal * 0.68, bowSignal * 0.92) * smoothstep(0.02, 0.2, localFlowSpeed), 0.0, 1.0) * hasDepthHit * frontFace * mix(1.0, smoothstep(${F(e7)}, ${F(n2)}, meetFlow.z), meetW);\n  }`})']},function(){return[()=>"((W)=>`        let ringDir = ${W}Ring[${W}At];\n        let ringStep = vec2<f32>((ringDir.x * bodyCos - ringDir.y * bodySin) * bodyWave, (ringDir.x * bodySin + ringDir.y * bodyCos) * bodyWave);\n        tapOffset = ringStep * bodyReach;`)",()=>'((z,j,q)=>(W,k,O)=>O===0?"":`${z(W,k,O)}\n    for (var ${W}At = 0u; ${W}At < ${O}u; ${W}At = ${W}At + 1u) {\n      var tapOffset = vec2<f32>(0.0);\n${j(W)}\n      let ringTap = ${q("tapOffset","bodyReach")};\n      ${W}Hit = max(${W}Hit, ringTap.x);\n      bodyDistance = min(bodyDistance, select(bodyDistance, ringTap.y, ringTap.x > 0.0));\n    }`)',()=>'(function($,J,Q,Z,q,Y,X,K){let j=q===""?[]:[q],z="water_safeNormalize(mix(N, foamN, foamVisible), N)",V="mix(albedo, foamAlbedo, foamVisible)",B=`mix(${X}, 0.85, foamVisible)`;if(K!==null)return j.push(`  let lit = ${K.evaluate({N:"water_safeNormalize(mix(N, foamN, foamVisible), N)",V:"V",P:"in.positionRender",albedo:"mix(albedo, foamAlbedo, foamVisible)",roughness:B,metalness:"0.0",emissive:"vec3<f32>(0.0)"})};`),j.join(`\n`);let U=`${Z?", frameN":""}${Y?", 0u":""}`;if(!$)return j.push(`  let lit = lighting_evaluate(water_safeNormalize(mix(N, foamN, foamVisible), N), V, in.positionRender, mix(albedo, foamAlbedo, foamVisible), ${B}, 0.0, 1.0, in.position.xy, 1.0${U});`),j.join(`\n`);let H=$.sunFacingGate?"foamVisible > 0.001":`(${t6}) && foamVisible > 0.0`,G=$.usesSun?`lighting_sunShadowPrepared(N, in.positionRender, lightViewDepth, in.position.xy, select(frontFace, 1.0, foamVisible > 0.0), lightPositionDx, lightPositionDy, ${$.sunFacingGate?"true":"false"})`:"1.0";return j.push(`  let lightViewDepth = lighting_viewDepth(in.positionRender);\n  var litN = N;\n  var litAlbedo = albedo;\n  var litRoughness = ${X};\n  if (${H}) {\n${J}\n${Q}\n    litN = water_safeNormalize(mix(N, foamN, foamVisible), N);\n    litAlbedo = mix(albedo, foamAlbedo, foamVisible);\n    litRoughness = ${B};\n  }\n${$.usesSun?`  lighting_cloudPrepare(in.positionRender);\n`:""}  let sunShadow = ${G};\n  let lit = lighting_evaluateWithSunShadow(litN, V, in.positionRender, litAlbedo, litRoughness, 0.0, 1.0, in.position.xy, 1.0, lightViewDepth, sunShadow, lightPositionDx, lightPositionDy${U});`),j.join(`\n`)})',()=>'(function($,J=!0){let Q=`\n  let holdDry = water_holdDryness(in.sourcePositionRender, in.restRender, waterDraw.fade.w);${$&&O2()?"":`\n  if (holdDry >= 1.0) { discard; }`}`;return`  let drops = water_dropsOf(in, waterFrontFacing);\n  ${$?"let waterCut = drops.x > 0.5;":"if (drops.x > 0.5) { discard; }"}${J?Q:""}\n  let fadeShow = drops.y${J?" * (1.0 - holdDry)":""};`})',()=>'(()=>({view:[],vars:"",args:"vec3<f32>(0.0), 0.0",reads:"",normal:[],meetArgs:"vec3<f32>(0.0), 0.0",meetReads:""}))',()=>'(function($){if(!K7($.causticClass))return (B4??=$c0I(11));return{view:[`  let rippleAxisA = select(frameU, flowT.x * frameU + flowT.y * frameV, ${S0});\n  let rippleAxisB = select(frameV, flowN.x * frameU + flowN.y * frameV, ${S0});`,`  let mirrorEye = toCamera / max(camDist, 1e-4);\n  let mirrorView = vec3<f32>(dot(mirrorEye, rippleAxisA), dot(mirrorEye, rippleAxisB), dot(mirrorEye, frameN));\n  let mirrorPx = 0.5 * frame.proj[1][1] * frame.viewportSize.y * normalStrengthByDistance * 3.2;`],vars:`\n  var mirrorRippleSlope = vec2<f32>(0.0, 0.0);\n  var mirrorRippleSpread = vec2<f32>(0.0, 0.0);`,args:"mirrorView, mirrorPx",reads:`\n    mirrorRippleSlope = ripple.mirrorSlope * (normalStrengthByDistance * 3.2);\n    mirrorRippleSpread = sqrt(ripple.mirrorSpread) * (normalStrengthByDistance * 3.2);`,meetArgs:"vec3<f32>(dot(mirrorEye, frameU), dot(mirrorEye, frameV), dot(mirrorEye, frameN)), mirrorPx",meetReads:`\n      mirrorRippleSlope = mix(mirrorRippleSlope, meetRipple.mirrorSlope * (normalStrengthByDistance * 3.2) * toFlow, meetW);\n      mirrorRippleSpread = mix(mirrorRippleSpread, sqrt(meetRipple.mirrorSpread) * (normalStrengthByDistance * 3.2), meetW);`,normal:[`  let mirrorRippleWorld = select(mirrorRippleSlope, mirrorRippleSlope.x * flowT + mirrorRippleSlope.y * flowN, ${S0});\n  let waterMirrorNormal = water_safeNormalize(mix(water_guestDirection(macroNormal + swellTilt), frameN, steepFace) - (mirrorRippleWorld.x + movingSlope.x) * frameU - (mirrorRippleWorld.y + movingSlope.y) * frameV, frameN);`,...k$($)?.rays===1?[]:[`  let mirrorLobeA = rippleAxisA * -mirrorRippleSpread.x;\n  let mirrorLobeB = rippleAxisB * -mirrorRippleSpread.y;`]]}})']},function(){return[()=>'(()=>("water_sceneMirrorHit(in.positionRender, waterMirrorNormal, frameN, V, mirrorRaySpread, mirrorSide)"))',()=>'(()=>("mix(albedo * water_bodyLight(), mirrorHit.colour, select(vec3<f32>(1.0), exp2(-water.extinction * mirrorHit.distance), underside > 0.5))"))',()=>'(function($,J){if(J){return oY();}if($.rays===1)return`${e6}\n  let mirrorHit = ${($8??=$c0I(13))};\n  let sceneMirror = vec4<f32>(${(t7??=$c0I(14))}, mirrorHit.weight);`;return`${e6}\n  var sceneMirror = vec4<f32>(0.0);\n  if (${e$}) {\n    let mirrorHit = ${($8??=$c0I(13))};\n    sceneMirror = vec4<f32>(${(t7??=$c0I(14))}, mirrorHit.weight);\n  } else {\n  var mirrorFootprint = array<vec2<f32>, ${n0.length}>(${n0.map(([Q,Z])=>`vec2<f32>(${F(Q)}, ${F(Z)})`).join(", ")});\n  var mirrorLobe = array<vec2<f32>, ${s6.length}>(${s6.map(([Q,Z])=>`vec2<f32>(${F(Q)}, ${F(Z)})`).join(", ")});\n  var mirrorSum = vec4<f32>(0.0);\n  for (var m = 0u; m < ${n0.length}u; m = m + 1u) {\n    let at = mirrorFootprint[m];\n    let q = mirrorLobe[m];\n    let mirrorHit = water_sceneMirrorHit(in.positionRender + mirrorPdx * at.x + mirrorPdy * at.y, water_safeNormalize(waterMirrorNormal + mirrorNdx * at.x + mirrorNdy * at.y + mirrorLobeA * q.x + mirrorLobeB * q.y, waterMirrorNormal), frameN, V, mirrorRaySpread, mirrorSide);\n    mirrorSum = mirrorSum + vec4<f32>(${(t7??=$c0I(14))} * mirrorHit.weight, mirrorHit.weight);\n  }\n  sceneMirror = vec4<f32>(mirrorSum.rgb / max(mirrorSum.a, 1e-4), mirrorSum.a * ${F(1/n0.length)});\n  }`})',()=>"(function(){let $=[];n0.forEach(function([q,Y],X){$[(q>0?1:0)+(Y>0?2:0)]=X});let J=$.map(function(q,Y){let X=(Y&1)===1,K=Y>>1===1;return{at:[2*n0[q][0]-(X?0.5:-0.5),2*n0[q][1]-(K?0.5:-0.5)],stratum:s6[q]}});let Q=([q,Y])=>`vec2<f32>(${F(q)}, ${F(Y)})`;let Z=(q)=>`select(select(${Q(q(J[0]))}, ${Q(q(J[1]))}, mirrorOdd.x), select(${Q(q(J[2]))}, ${Q(q(J[3]))}, mirrorOdd.x), mirrorOdd.y)`;return`  let mirrorOdd = (vec2<u32>(in.position.xy) & vec2<u32>(1u)) == vec2<u32>(1u);\n  let mirrorAt = ${Z((q)=>q.at)};\n  let mirrorStratum = ${Z((q)=>q.stratum)};\n${e6}\n  var mirrorHit: WaterSceneMirrorHit;\n  if (${e$}) {\n    mirrorHit = ${($8??=$c0I(13))};\n  } else {\n    mirrorHit = water_sceneMirrorHit(in.positionRender + mirrorPdx * mirrorAt.x + mirrorPdy * mirrorAt.y, water_safeNormalize(waterMirrorNormal + mirrorNdx * mirrorAt.x + mirrorNdy * mirrorAt.y + mirrorLobeA * mirrorStratum.x + mirrorLobeB * mirrorStratum.y, waterMirrorNormal), frameN, V, mirrorRaySpread, mirrorSide);\n  }\n  let mirrorLit = ${(t7??=$c0I(14))};\n  var sceneMirror = vec4<f32>(mirrorLit, mirrorHit.weight);\n  if (!${e$}) {\n    sceneMirror = water_quadMirror(vec4<f32>(mirrorLit * mirrorHit.weight, mirrorHit.weight), mirrorOdd);\n  }`})",()=>'(function($){let J=[`@fragment fn ${T2}(lume_in: WaterVaryings, ${D9}) -> @location(0) vec4<f32> {`,G8,C9(!1),"  if (holdDry >= 0.5) { discard; }"];return J.push("  let time = frame.time;","  let waveTime = frame.worldTime;",...M4($,(B4??=$c0I(11))),"  return vec4<f32>(waterSurfaceNormal, 1.0);","}"),J.join(`\n`)})',()=>'(function($){return[$.underwaterColor,$.underwaterVisibility,$.underwaterScatter,$.underwaterDistortion,...$.causticsEnabled?[1,$.causticScale,$.causticStrength,$.normalScale,...$.flowDirection,$.flowSpeed,$.detailNormalStrength]:[0]].join("/")})']},function(){return[()=>'(function($,J=2,Q=2,Z=1,q=!1){let Y=$||Z<=1;return`@group(${J}) @binding(${Q}) var mediumSceneDepth: ${Y?"texture_2d<f32>":"texture_depth_multisampled_2d"};\nfn water_mediumDepth(pixel: vec2<i32>) -> f32 {\n  return ${q?"1.0 - ":""}textureLoad(mediumSceneDepth, pixel, 0)${Y?".r":""};\n}\nfn water_mediumRender(uv: vec2<f32>, depth: f32) -> vec3<f32> {\n  let p = frame.inverseViewProj * vec4<f32>(uv * vec2<f32>(2.0, -2.0) + vec2<f32>(-1.0, 1.0), depth, 1.0);\n  return p.xyz / max(p.w, 1e-6);\n}\n`})',()=>"(function($,J=1,Q=!1){return L0([Q7,F$,j9,C$,J7,L4,P8($,2,2,J,Q),Q4,`\n@vertex fn vs(@builtin(vertex_index) vertex: u32) -> WaterVaryings {\n  let count = u32(medium.vertexCount);\n  let slot = u32(medium.slot);\n  water_cullRow(slot);\n  water_restOfRow(slot);\n  let local = water_arenaVertex(vertex % count).position;\n  let base = (waterDraw.model * vec4<f32>(local, 1.0)).xyz + (waterDraw.anchor.xyz - frame.sourceOrigin);\n  var out: WaterVaryings;\n  if (vertex < count) {\n    out = water_surfaceVertex(local, vec2<f32>(0.0));\n  } else {\n    let floorLift = vec3<f32>(0.0, water.surfaceYOffset - medium.depth, 0.0);\n    out.positionRender = base + floorLift;\n    out.positionWorld = base + frame.sourceOrigin + floorLift;\n    out.sourcePositionRender = out.positionRender;\n    out.position = frame.viewProj * vec4<f32>(out.positionRender, 1.0);\n  }\n  out.channel.x = base.y + water.surfaceYOffset - frame.cameraPosition.y;\n  out.position.z = max(out.position.z, 0.0);\n  return out;\n}\n${R4}\n`])})",()=>'(function($,J,Q=1,Z=!1,q){return L0([J,F$,S4,J7,`@group(3) @binding(${q?.mediumBinding??2}) var<uniform> medium: WaterMediumUniforms;`,P8($,3,q?.depthBinding??3,Q,Z),`\n@vertex fn vs(@builtin(vertex_index) vertex: u32${q?.instanceSet?", @builtin(instance_index) copyIndex: u32":""}) -> WaterVaryings {\n  let count = u32(medium.vertexCount);\n  let top = lume_materialRenderPosition(vertex % count, u32(medium.instanceIndex)${q?.instanceSet?" + copyIndex":""});\n  var out: WaterVaryings;\n  out.positionRender = top;\n  out.positionWorld = lume_worldFromRender(top);\n  if (vertex >= count) { out.positionRender.y -= medium.depth; out.positionWorld.y -= medium.depth; }\n  out.position = frame.viewProj * vec4<f32>(out.positionRender, 1.0);\n  out.channel.x = top.y - frame.cameraPosition.y;\n  out.position.z = max(out.position.z, 0.0);\n  return out;\n}\n${R4}`])})',()=>'(function($,J,Q){let{depthIsFloat:Z,causticClass:q}=Q;let Y=Q.depthSamples??1;let X=Q.depthInverted===!0;let K=J.getBindGroupLayout([c(0,1,"unfilterable-float"),c(1,1,"uint")],"lume water volume draw");let j=[E0(0,1|2,"uniform"),E0(1,1|2,"uniform"),{binding:2,visibility:2,texture:{sampleType:(Z||Y<=1?"unfilterable-float":"depth"),...Y>1?{multisampled:!0}:{}}}];let z=J.getBindGroupLayout(j,"lume water volume");let V=J.getBindGroupLayout([...j,c(3,2,"float"),c(4,2,"float"),T$(5,2,"filtering")],"lume underwater");let B=`${Z?"float":"depth"}/${q}/${N0()}${Y>1?"/msaa":""}${X?"/inverted":""}`;let U=J.getRenderPipeline(`water/volume/${B}`,function(){let D=VX(Z,Y,X);let M=$.createShaderModule({label:"lume water volume",code:D});let C={color:{operation:"add",srcFactor:"one",dstFactor:"one"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one"}};let W=P$(J,[D]);return{layout:y$($,void 0,[Q.frameLayout,W,z,K],W),vertex:{module:M,entryPoint:"vs"},fragment:{module:M,entryPoint:"fs",targets:[{format:"rgba16float",blend:C}]}}});let H=(D)=>J.getRenderPipeline(`water/medium/${B}${D>1?`/into${D}`:""}`,function(){let M=BX(Z,Y,X);let C=$.createShaderModule({label:"lume underwater",code:M});let W=P$(J,[M]);return{layout:y$($,void 0,[Q.frameLayout,W,V,K],W),vertex:{module:C,entryPoint:"vs"},fragment:{module:C,entryPoint:"fs",targets:[{format:N0()}]},...D>1?{multisample:{count:D}}:{}}});let G=Q.targetSamples??1;return{volume:U,medium:H(1),mediumInto:G>1?H(G):null,drawLayout:K,volumeLayout:z,mediumLayout:V}})']},function(){return[()=>'(function($){if($.every((J)=>J.pipeline))return null;return Promise.all($.map((J)=>J.ready)).then(function(){if($.some((J)=>!J.pipeline))throw Error("lume: an underwater pipeline did not become ready")})})',()=>'(function(){let $=[];let J={format:"rgba16float",clearValue:{r:0,g:0,b:0,a:0}};let Q=[];let Z={slots:[],draws:$,first:null,pipeline:null,groups:[null,null,null,null],volumeColour:J,volumePass:{isolated:void 0,colorAttachments:[J],draws:$},intoColour:{format:"rgba16float",samples:1,store:"store"},outputColour:{format:"rgba16float"},mediumColours:Q,mediumPass:{isolated:void 0,colorAttachments:Q,draws:function(q){{let $=q,J=Z;if(J.pipeline!==null)T4($,J.pipeline,J.groups)}}},medium:null,rows:null,label:void 0,at:0,volumeName:"",mediumName:""};return Z})',()=>'(function($,J,Q,Z){if($===null){let q={buffer:J.waterBuffer},Y={buffer:J.mediumBuffer},X={binding:2,resource:Z};return{ask:{label:`lume water volume ${J.id}`,layout:Q,entries:[{binding:0,resource:q},{binding:1,resource:Y},X]},named:J.id,water:q,medium:Y,depth:X}}return N9($,"lume water volume ",J.id),$.ask.layout=Q,$.water.buffer=J.waterBuffer,$.medium.buffer=J.mediumBuffer,$.depth.resource=Z,$})',()=>'(function($,J,Q){if($===null){let Z={binding:0,resource:J.rows.rows},q={binding:1,resource:J.rows.vertices};return{ask:{label:`lume water volume draw ${J.id}`,layout:Q,entries:[Z,q]},named:J.id,rows:Z,vertices:q}}return N9($,"lume water volume draw ",J.id),$.ask.layout=Q,$.rows.resource=J.rows.rows,$.vertices.resource=J.rows.vertices,$})',()=>'(function($,J,Q,Z,q){let Y=$;if(Y===null){let j={buffer:J.mediumBuffer};Y={ask:{label:`lume scripted water volume ${J.id}`,layout:Z,entries:[]},named:J.id,medium:{binding:Q.inputs.mediumBinding,resource:j},mediumBuffer:j,depth:{binding:Q.inputs.depthBinding,resource:q}}}N9(Y,"lume scripted water volume ",J.id),Y.ask.layout=Z;let X=Y.ask.entries,K=Q.bindings;for(let j=0;j<K.length;j+=1)X[j]=K[j];if(Y.medium.binding=Q.inputs.mediumBinding,Y.mediumBuffer.buffer=J.mediumBuffer,X[K.length]=Y.medium,Y.depth.binding=Q.inputs.depthBinding,Y.depth.resource=q,X[K.length+1]=Y.depth,X.length!==K.length+2)X.length=K.length+2;return Y})',()=>'(function($,J,Q,Z,q,Y,X){if($===null){let K={buffer:J.waterBuffer},j={buffer:J.mediumBuffer},z={binding:2,resource:Z},V={binding:3,resource:q},B={binding:4,resource:Y},U={binding:5,resource:X};return{ask:{label:`lume underwater ${J.id}`,layout:Q,entries:[{binding:0,resource:K},{binding:1,resource:j},z,V,B,U]},named:J.id,water:K,medium:j,depth:z,volume:V,input:B,sampler:U}}return N9($,"lume underwater ",J.id),$.ask.layout=Q,$.water.buffer=J.waterBuffer,$.medium.buffer=J.mediumBuffer,$.depth.resource=Z,$.volume.resource=q,$.input.resource=Y,$.sampler.resource=X,$})',()=>"(function($){let J=this.built;if(J===null)return null;if(J.generation!==this.pipelines.generation||J.frameLayout!==$.frameLayout||J.depthIsFloat!==$.depthIsFloat||J.depthSamples!==($.depthSamples??1)||J.depthInverted!==($.depthInverted===!0)||J.causticClass!==$.causticClass||J.targetSamples!==($.targetSamples??1)||J.colorFormat!==N0())return null;return J.pipelines})"]},function(){return[()=>"(function($){let J=this.builtPipelines($);if(J!==null)return J;let Q=HX(this.device,this.pipelines,$);let Z=o0(Q.medium);if(o0(Q.volume)!==null&&Z!==null&&(Q.mediumInto===null?Z:o0(Q.mediumInto))!==null)this.built={frameLayout:$.frameLayout,depthIsFloat:$.depthIsFloat,depthSamples:$.depthSamples??1,depthInverted:$.depthInverted===!0,causticClass:$.causticClass,targetSamples:$.targetSamples??1,colorFormat:N0(),generation:this.pipelines.generation,pipelines:Q};return Q})",()=>'(function($,J){let Q=$.depthSamples??1;let Z=$.depthInverted===!0;let q=this.pipelines.getBindGroupLayout([...J.inputs.drawBindings,E0(J.inputs.mediumBinding,1|2,"uniform"),{binding:J.inputs.depthBinding,visibility:2,texture:{sampleType:(($.depthIsFloat)||Q<=1?"unfilterable-float":"depth"),...Q>1?{multisampled:!0}:{}}}],"lume scripted water volume draw");return{handle:this.pipelines.getRenderPipeline(`water/volume-scripted/${$.depthIsFloat?"float":"depth"}/${J.key}${Q>1?"/msaa":""}${Z?"/inverted":""}`,()=>{let X=zX($.depthIsFloat,J.program,Q,Z,J.inputs);let K=this.device.createShaderModule({label:"lume scripted water volume",code:X});let j={color:{operation:"add",srcFactor:"one",dstFactor:"one"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one"}};let z=P$(this.pipelines,[X]);return{layout:y$(this.device,void 0,[$.frameLayout,z,J.material.materialBindGroupLayout,q],z),vertex:{module:K,entryPoint:"vs"},fragment:{module:K,entryPoint:"fs",targets:[{format:"rgba16float",blend:j}]}}}),drawLayout:q}})',()=>"(function($,J,Q,Z){let q=this.groups,Y=0;for(let K=0;K<J.length;K+=1){let j=J[K],z=0;while(z<Y&&q[z].key!==j.opticsKey)z+=1;let V=q[z];if(z===Y){if(V===void 0)V={key:j.opticsKey,surfaces:[],count:0},q[z]=V;V.key=j.opticsKey,V.count=0,Y+=1}V.surfaces[V.count]=j,V.count+=1}let X=0;for(let K=0;K<Y;K+=1){let j=q[K];let z=this.joins[Z+X]??=FX();let V=0;z.first=null;for(let B=0;B<j.count;B+=1){let U=j.surfaces[B];if(j.surfaces[B]=null,U===null)continue;let H=z.slots[V]??=({command:null,plain:{indexCount:0},instanced:{indexCount:0,instanceCount:1},volume:null,rows:null,scripted:null});let G=this.prepareVolumeDraw($,U,Q,H);if(G===null)continue;z.draws[V]=G,V+=1,z.first??=U}if(j.count=0,z.draws.length!==V)z.draws.length=V;if(z.first!==null)X+=1}return X})",()=>'(function($,J,Q,Z,q,Y,X){let{graph:K,source:j}=$,z=Q.first;if(z===null)return Z;let V=this.volumeAsk;V.width=j.width,V.height=j.height,this.volume=W8(this.device,this.volume,V);let B=this.volume,U=q%2,H=j;if(Y===null){let W=this.outputAsks[U];W.width=j.width,W.height=j.height,W.format=N0();let k=W8(this.device,this.outputs[U],W);this.outputs[U]=k,H=k}CX:{let $$2=Q,J$2=$.label,Q$1=q;{let $=$$2,J=J$2,Q=Q$1;if($.volumeName!==""&&$.label===J&&$.at===Q)break CX;$.label=J,$.at=Q,$.volumeName=`${J??"water"}.volume.${Q}`,$.mediumName=`${J??"water"}.medium.${Q}`}}Q.volumeColour.view=B.view;Q.volumePass.isolated=$.isolated;K.addRenderPass(Q.volumeName,Q.volumePass);Q.medium=OX(Q.medium,z,J.mediumLayout,$.depth,B.view,Z.view,this.sampler);let G=this.pipelines.getBindGroup(Q.medium.ask),D=this.volumeDrawGroup(Q,J.drawLayout,z),M=Q.groups;M[0]=$.frameBindGroup,M[1]=$.passBindGroup,M[2]=G,M[3]=D,Q.pipeline=X;let C=Y!==null?Q.intoColour:Q.outputColour;if(C.view=Y??H.view,C.format=N0(),Y!==null)C.samples=$.targetSamples??1;return Q.mediumColours[0]=C,Q.mediumPass.isolated=$.isolated,K.addRenderPass(Q.mediumName,Q.mediumPass),H})']},function(){return[()=>'(function($,J,Q,Z){let{drawLayout:q,volumeLayout:Y}=Q,X=Q.volume.pipeline,K=Q.medium.pipeline,j=J.vertex,z=j?this.getScriptedVolume($,j):null,V=z?z.handle.pipeline:X;if(!V||!K)return null;let B=j?.material.getBindGroup()??null;if(z&&!B)return null;let U=B;if(!z){Z.volume=kX(Z.volume,J,Y,$.depth);U=this.pipelines.getBindGroup(Z.volume.ask);}let H;if(z&&j){Z.scripted=NX(Z.scripted,J,j,z.drawLayout,$.depth);H=this.pipelines.getBindGroup(Z.scripted.ask);}else H=this.volumeDrawGroup(Z,q,J);let G=j?.inputs.instanceSet?Z.instanced:Z.plain;if(G.indexCount=J.volume.indexCount,j?.inputs.instanceSet)Z.instanced.instanceCount=j.instanceCount;let D=((J.volume.indexBuffer));let M=Z.command;if(M===null)return M={pipeline:V,bindGroups:[$.frameBindGroup,$.passBindGroup,U,H],indexBuffer:{buffer:D,format:"uint32"},draw:G},Z.command=M,M;M.pipeline=V;let C=M.bindGroups;return C[0]=$.frameBindGroup,C[1]=$.passBindGroup,C[2]=U,C[3]=H,M.indexBuffer.buffer=D,M.draw=G,M})',()=>"(function(){return{rowsVersion:-1,byEntity:new Map,holds:[],fresh:[],moved:[],prepares:0,queue:null,hides:null,originRevision:-1,eyeLayers:-1,layoutOwed:!1,picked:[],overfull:!1,pickedEye:new Float64Array(3),block:new Float32Array(0),buffer:null,device:null,binding:null}})",()=>"(function($,J,Q){let Z=[],q=0;for(let K of $.holds){if(K.slot=-1,!K.tested)continue;Z.push(K),q+=K.planeCount}if($.overfull=Z.length>C6||q>J.planes,$.overfull)Z.sort((K,j)=>H7(K.sphere,Q)-H7(j.sphere,Q));$.pickedEye[0]=Q[0],$.pickedEye[1]=Q[1],$.pickedEye[2]=Q[2];let Y=$.block;$.picked.length=0;let X=0;for(let K of Z){if($.picked.length===C6)break;if(X+K.planeCount>J.planes)continue;K.slot=$.picked.length,$.picked.push(K),p4(Y,K,X);let j=K.planeFirst*4,z=K.value.planes,V=RJ+X*4;for(let B=0;B<K.planeCount*4;B++)Y[V+B]=z[j+B];X+=K.planeCount}Y[0]=$.picked.length,$.layoutOwed=!1})",()=>"(function($,J,Q,Z,q,Y){let X=e($).revision,K=f4($),j=X!==J.originRevision||Y||K!==J.eyeLayers;J.originRevision=X,J.eyeLayers=K,J.moved.length=0,J.prepares+=1,y8($,J,j?J.holds:J.fresh,q),J.fresh.length=0;for(let z=0;z<Q.size;z++){let V=J.byEntity.get(Q.at(z));if(V===void 0)continue;y8($,J,V,q),Q.hearPlaceMotion(Q.at(z))}if(Z.size!==0)for(let z of Z)y8($,J,J.byEntity.get(z)??SX,q);Q.clear(),M7(Z)})",()=>'(function($,J,Q,Z){if($.picked.length===0&&!Z)return;if($.buffer===null||Z){$.buffer??=J.createBuffer({label:"lume water dry holds",size:$.block.byteLength,usage:(Q.storage?128:64)|8}),J.queue.writeBuffer($.buffer,0,$.block);return}for(let q of $.moved){if(q.slot<0)continue;let Y=k6+q.slot*h7;p4($.block,q,$.block[Y+16]),J.queue.writeBuffer($.buffer,Y*4,$.block,Y,h7)}})',()=>"(function($,J,Q,Z,q,Y,X){let K=y9($);if(K===null||K.byEntity.size===0){if(J.holds.length!==0||J.queue!==null){IX($,J);}if(J.rowsVersion=K?.version??-1,J.hides!==null)M7(J.hides);return 0}if(K.version!==J.rowsVersion){J.rowsVersion=K.version;{let $$3=J,J$3=K.byEntity;{let $=$$3,J=J$3;for(let[Q,Z]of $.byEntity){if(J.get(Q)===Z[0].value)continue;$.byEntity.delete(Q),$.layoutOwed=!0}for(let[Q,Z]of J){if($.byEntity.has(Q))continue;let q=bX(Q,Z);$.byEntity.set(Q,q);for(let Y of q)$.fresh.push(Y);$.layoutOwed=!0}$.holds.length=0;for(let Q of $.byEntity.values())for(let Z of Q)$.holds.push(Z)}}}if(J.device!==Q)J.device=Q,J.buffer=null;if(J.binding?.storage!==Z.storage||J.binding.planes!==Z.planes){if(J.binding!==null)J.buffer?.destroy();J.binding=Z;J.buffer=null;J.block=new Float32Array((324+Z.planes*4));J.layoutOwed=!0}J.queue??=b9($);J.hides??=g4($);LX($,J,J.queue,J.hides,Y,X);let j=J.layoutOwed||vX(J,q);if(j){AX(J,Z,q);}RX(J,Q,Z,j);return J.picked.length})"]},function(){return[()=>'(function($,J){if($.entries===0&&$.foams===0)return null;let Q=[];if($.entries>0){Q.push(`${$.entries} entry ring(s) (highest ${$.entryHeight.toFixed(3)} m, ${l4($.entryWho,$.entryOwner)} entered at ${n4($.entryX,$.entryZ,$.entryEye)}, falling ${$.entryFall.toFixed(1)} m/s)`);}if($.foams>0){Q.push(`${$.foams} frame(s) of foam from a body moving fast (most ${$.foam.toFixed(4)}, ${l4($.foamWho,$.foamOwner)} at ${n4($.foamX,$.foamZ,$.foamEye)}, moving ${$.foamSpeed.toFixed(1)} m/s)`);}return`[ripple watch] over ${J.toFixed(1)} s the field wrote ${Q.join("; ")}`})',()=>'(function($,J){return J.getComputePipeline(S$,()=>({label:S$,layout:$.createPipelineLayout({label:S$,bindGroupLayouts:[J.getBindGroupLayout(O3,S$)]}),compute:{module:J.shaderModule(J2(),S$),entryPoint:"ripple_step"}}))})',()=>'(function($,J){let Q=X3(J,{label:"lume water ripples rest",size:[1,1],format:"rgba16float",usage:4},Y3),Z=Q.resource.createView(),q=J.createBuffer({label:"lume water ripples step",size:_6*4,usage:64|8}),Y=J.createBuffer({label:"lume water ripples frame",size:r$*4,usage:64|8});return $.gpu={device:J,field:null,shade:null,shadeView:Z,rest:Q,restView:Z,stepBuffer:q,pipeline:null,fragmentBuffer:Y,dispatchRow:null},$.current=0,$.originKnown=!1,$.clearOwed=!0,$.fragmentWritten=!1,$.gpu})',()=>'(function($,J){let Q=$.device;let Z=(z)=>({label:z,size:[B0,B0],format:"rgba32float",usage:8|4});let q=[Q.createTexture(Z("lume water ripples state a")),Q.createTexture(Z("lume water ripples state b"))];let Y=[q[0].createView(),q[1].createView()];if($.shade===null)$.shade=Q.createTexture({label:"lume water ripples shade",size:[B0,B0],format:"rgba16float",usage:8|4}),$.shadeView=$.shade.createView();let X=$.shade.createView(),K=J.getBindGroupLayout(O3,S$),j=(z)=>Q.createBindGroup({label:`lume water ripples step from ${z}`,layout:K,entries:[{binding:0,resource:Y[z]},{binding:1,resource:Y[1-z]},{binding:2,resource:{buffer:$.stepBuffer}},{binding:3,resource:X}]});return $.field={states:q,bindGroups:[j(0),j(1)]}})',()=>"(function($,J,Q){let{position:Z,rotation:q,scale:Y}=G7($,w8($,J)),X=!1;for(let K=0;K<3;K++){if(Q[K]!==Z[K])X=!0;if(Q[K]=Z[K],Q[7+K]!==Y[K])X=!0;Q[7+K]=Y[K]}for(let K=0;K<4;K++){if(Q[3+K]!==q[K])X=!0;Q[3+K]=q[K]}return X})",()=>"(function($,J,Q,Z){let q=(Q.bottom-Z.bottom)/N[g0];if(!(q>uX))return;let Y=Math.min(k3,mX*q*Z.radius*2);$.impacts.push({x:Z.x,z:Z.z,radius:Z.radius,height:Y,bornAt:N[G0],liquid:Z.liquid,who:J,fall:q,told:!1})})",()=>"(function($,J,Q){let Z=$.watch;for(let q=0;q<$.sourceCount;q++){let Y=$.sources[q],X=Y.impact;if(X!==null){if(X.told)continue;if(X.told=!0,Z.entries+=1,X.height<=Z.entryHeight)continue;Z.entryHeight=X.height,Z.entryWho=X.who,Z.entryOwner=w8(J,X.who),Z.entryX=X.x+Q[0],Z.entryZ=X.z+Q[2],Z.entryEye=Z$(X.x-N[u8],X.z-N[m8]),Z.entryFall=X.fall}else if(Y.foam>0){if(Z.foams+=1,Y.foam<=Z.foam)continue;Z.foam=Y.foam,Z.foamWho=Y.who,Z.foamOwner=w8(J,Y.who),Z.foamX=Y.fx+Q[0],Z.foamZ=Y.fz+Q[2],Z.foamEye=Z$(Y.fx-N[u8],Y.fz-N[m8]),Z.foamSpeed=Y.speed}}})",()=>"(function($,J){l[0]=J.nx-N[E$],l[1]=J.nz-N[f$],k7(l,0,1,l,2);let Q=l[2],Z=$.sourceCount;if(Z>=l0){let Y=0;for(let X=1;X<l0;X++)if($.sources[X].distance>$.sources[Y].distance)Y=X;if($.sources[Y].distance<=Q)return;Z=Y}else $.sourceCount+=1;let q=$.sources[Z];q.nx=J.nx,q.nz=J.nz,q.nr=J.nr,q.nw=J.nw,q.bx=J.bx,q.bz=J.bz,q.br=J.br,q.bw=J.bw,q.push=J.push,q.foam=J.foam,q.fx=J.fx,q.fz=J.fz,q.distance=Q,q.liquid=J.liquid,q.who=J.who,q.speed=J.speed,q.impact=J.impact})"]},function(){return[()=>"(function($,J,Q,Z){let q=h9(J,Z.device);let Y=Z.renderOrigin??u3;E3(J,Z,Y);f3(J);_3(J,$,Q,Y,Z);let X=Math.floor(N[f9]/Y0)-B0/2,K=Math.floor(N[_9]/Y0)-B0/2;if(J.active){q.pipeline??=eX(Z.device,Z.pipelines);}let j=q.pipeline?.pipeline??null;if(!J.active||j===null){if(!J.active)b3(q);return J.originCellX=X,J.originCellZ=K,J.originKnown=!0,F7(J,q,!1,Y),!1}if(N[g0]<=0)return F7(J,q,!0,Y),!0;let z=J.clearOwed||!J.originKnown;if(N[R3]=z?B0:X-J.originCellX,N[h3]=z?B0:K-J.originCellZ,J.originCellX=X,J.originCellZ=K,J.originKnown=!0,z)J.held.fill(0);N[D7]=X*Y0-Y[0];N[C7]=K*Y0-Y[2];if(!MK(J,Q))return J.clearOwed=!0,F7(J,q,!1,Y),!1;J.clearOwed=!1;HK(J,$,Y);TK(J,q,q.field??JK(q,Z.pipelines),Z,j,Y);F7(J,q,!0,Y);return !0})",()=>"(function($,J){let Q=N[D7],Z=N[C7],q=$.runs,Y=$.tileHalfLife,X=$.tileFilter;q.fill(0),Y.fill(0),X.fill(0),g8.fill(0),N[S9]=0;let K=y,j=y,z=-1,V=-1,B=d0*Y0;E[0]=Q-B,E[1]=Z-B,E[2]=Q+A0+B,E[3]=Z+A0+B;let U=J.near(E),H=J.found;for(let D=0;D<U;D++){let M=H[D],C=M.bounds,W=I9(C,0,D7,-d0),k=I9(C,3,D7,d0),O=I9(C,2,C7,-d0),P=I9(C,5,C7,d0);if(k<0||P<0||W>=y||O>=y)continue;let T=Math.max(0,W),S=Math.min(y-1,k),v=Math.max(0,O),w=Math.min(y-1,P);A9[0]=M.halfLife,A9[1]=M.filter;let d=A9[0],i=A9[1];for(let J0=v;J0<=w;J0++)for(let o=T;o<=S;o++){let g=J0*y+o;if(q[g>>>5]|=1<<(g&31),Y[g]!==0&&(d!==Y[g]||i!==X[g]))g8[g]=1;if(Y[g]===0||M.halfLife<Y[g]||M.halfLife===Y[g]&&M.filter>X[g])Y[g]=M.halfLife,X[g]=M.filter}if(M.halfLife>N[S9])N[S9]=M.halfLife;K=Math.min(K,T),j=Math.min(j,v),z=Math.max(z,S),V=Math.max(V,w)}if(z<0)return!1;{let Q=N[D7],Z=N[C7],q=FK;for(let Y=0;Y<y*y;Y++){if(g8[Y]===0)continue;q[0]=Q+(Y%y+0.5)*J3,q[1]=Z+(Math.floor(Y/y)+0.5)*J3;let X=null;E[0]=q[0],E[1]=q[1],E[2]=q[0],E[3]=q[1];let K=J.near(E),j=J.found;for(let z=0;z<K;z++){let V=j[z];if(!WK(V,Y,q))continue;if(X===null||q[2]>q[3]||q[2]===q[3]&&(V.halfLife<X.halfLife||V.halfLife===X.halfLife&&V.filter>X.filter))X=V,q[3]=q[2]}if(X===null)continue;$.tileHalfLife[Y]=X.halfLife,$.tileFilter[Y]=X.filter}}let G=$.runBox;return G[0]=K,G[1]=j,G[2]=z-K+1,G[3]=V-j+1,$.restAfterS=N7*N[S9]/D0,!0})",()=>"(function($,J,Q){let Z=$.bounds;if(Q[0]<Z[0]||Q[0]>Z[3]||Q[1]<Z[2]||Q[1]>Z[5])return!1;let q=$.field;if(q===null)return Q[2]=$.restY,!0;let Y=Z3.get($);if(Y===void 0)Y={metres:new Float64Array(y*y*2),levels:new Float64Array(y*y),state:new Uint8Array(y*y)},Z3.set($,Y);let X=kK;if(X[0]=Math.round(Q[0]),X[1]=Math.round(Q[1]),Y.state[J]===DK||Y.metres[J*2]!==X[0]||Y.metres[J*2+1]!==X[1])if(Y.metres[J*2]=X[0],Y.metres[J*2+1]=X[1],W7(q,$.transform,X))Y.levels[J]=X[2],Y.state[J]=CK;else Y.state[J]=Q3;if(Y.state[J]===Q3)return!1;return Q[2]=Y.levels[J],!0})",()=>"(function($,J,Q){let Z=J.timeSeconds;N[G0]=Z;let q=Math.min(v6,Math.max(0,Z-$.lastFrameSeconds));if(q>=0)N[g0]=q;else N[g0]=0.016666666666666666;$.lastFrameSeconds=Z,$.readAt=Z;let Y=J.camera.position,X=J.camera.view,K=-X[2],j=-X[10];l[0]=K,l[1]=j,k7(l,0,1,l,2);let z=l[2];if(z>0.0001)l[0]=A0*iJ/z;else l[0]=0;let V=l[0];N[E$]=Y[0]+K*V,N[f$]=Y[2]+j*V,N[f9]=N[E$]+Q[0],N[_9]=N[f$]+Q[2],N[u8]=Y[0],N[m8]=Y[2]})",()=>"(function($){let J=$.watch,Q=N[G0];if(Q-J.start<i4&&Q>=J.start)return;t4:{let $$5=J,J$5=Q;{let $=$$5,J=J$5;if(!(J>=0)){(null);break t4;}let Q=$.start>=0&&J>=$.start?hX($,J-$.start):null;if($.start=J,$.entries=0,$.entryHeight=0,$.foams=0,$.foam=0,Q!==null)__sc.info(Q);(Q);}}})"]},function(){return[()=>"(function($){E[0]=N[E$]-h$,E[1]=N[f$]-h$,E[2]=N[E$]+h$,E[3]=N[f$]+h$;let J=$.near(E),Q=$.found;for(let Z=0;Z<J;Z++){let q=Q[Z].bounds;if(q[3]>=E[0]&&q[0]<=E[2]&&q[5]>=E[1]&&q[2]<=E[3])return!0}return!1})",()=>'(function($,J,Q,Z,q,Y){let X=N[g0],K=$.stepBlock,j=$.runBox;K.fill(0);K[0]=$.originCellX*Y0-Y[0];K[1]=$.originCellZ*Y0-Y[2];K[2]=A0;K[3]=Y0;K[4]=N[R3];K[5]=N[h3];K[6]=1;K[7]=$.sourceCount;K[8]=(sX*X*X/tX);K[11]=X;K[12]=j[0];K[13]=j[1];$.stepWords.set($.runs,h6);$.stepWords.set($.held,E6);{let J$8=K;{let J=J$8;let Q=N[g0],Z=$.runs,q=$.tileHalfLife,Y=AK;Y[v8]=-1,Y[R8]=0,Y[h8]=0;for(let X=0;X<y*y;X++){if((Z[X>>>5]>>>(X&31)&1)===0)continue;let K=q[X];if(K!==Y[v8])Y[v8]=K,Y[R8]=Math.pow(2,2*Q/K)-1,Y[h8]=Math.pow(0.5,Q*D0/(K*sJ));J[o$+4*X]=Y[R8],J[o$+4*X+1]=Y[h8],J[o$+4*X+2]=Math.min(rJ,$.tileFilter[X]*Q/u7)}}}{let J=K;for(let Q=0;Q<$.sourceCount;Q++){let Z=$.sources[Q],q=f6+Q*R6;J[q]=Z.nx,J[q+1]=Z.nz,J[q+2]=Z.nr,J[q+3]=Z.nw,J[q+4]=Z.bx,J[q+5]=Z.bz,J[q+6]=Z.br,J[q+7]=Z.bw,J[q+8]=Z.push,J[q+9]=Z.foam,J[q+10]=Z.fx,J[q+11]=Z.fz}}J.device.queue.writeBuffer(J.stepBuffer,0,K);$.held.set($.runs);let z=J.dispatchRow??={pipeline:q,bindGroups:[null],dispatch:[j[2],j[3],1]};z.dispatch[0]=j[2],z.dispatch[1]=j[3],z.pipeline=q,z.bindGroups[0]=Q.bindGroups[$.current],$.dispatches.length=1,$.dispatches[0]=z,Z.graph.addCompute("water-ripples",$.computeDesc),$.current=$.current===0?1:0})',()=>"(function($,J,Q,Z,q=!1){M0[R9]=0;if(Q){M0[c8]=$.restAfterS;M0[d8]=$.lastHeardSeconds;M0[l8]=N[G0];m3(M0);}let Y=M0[R9],X=$.fragmentBlock,K=vK;K.fill(0),K[0]=$.originCellX*Y0-Z[0],K[1]=$.originCellZ*Y0-Z[2],K[2]=A0,K[3]=Y0,K[4]=Y>0?1:0,K[5]=lX*Y,K[6]=nX*Y,$.read=Y,K[7]=$.moverCount,K[8]=$.stillCount,K[9]=q?1:0;for(let z=0;z<($.moverCount+$.stillCount)*4;z++)K[12+z]=$.named[z];let j=$.liquidHeard;for(let z=0;z<Math.min($.liquidHeardCount,$2);z++){K[c7+2*z]=j[z].liquid;E8[0]=1;if(Y>0){LK($,z,E8,0);}K[c7+2*z+1]=E8[0]}if($.fragmentWritten){let z=!0;for(let V=0;V<r$&&z;V++)z=X[V]===K[V];if(z)return}X.set(K),J.device.queue.writeBuffer(J.fragmentBuffer,0,X),$.fragmentWritten=!0})",()=>"(function($,J,Q){let Z=J[0]*Q.u[0]+J[4]*Q.u[1]+J[8]*Q.u[2],q=J[1]*Q.u[0]+J[5]*Q.u[1]+J[9]*Q.u[2],Y=J[2]*Q.u[0]+J[6]*Q.u[1]+J[10]*Q.u[2],X=J[0]*Q.v[0]+J[4]*Q.v[1]+J[8]*Q.v[2],K=J[1]*Q.v[0]+J[5]*Q.v[1]+J[9]*Q.v[2],j=J[2]*Q.v[0]+J[6]*Q.v[1]+J[10]*Q.v[2],z=t(Z,q,Y),V=t(X,K,j);if(!(z>0&&V>0))return null;let B=[Z/z,q/z,Y/z],U=[X/V,K/V,j/V];if(Math.abs(B[0]*U[0]+B[1]*U[1]+B[2]*U[2])>l3)return null;let H=B[1]*U[2]-B[2]*U[1],G=B[2]*U[0]-B[0]*U[2],D=B[0]*U[1]-B[1]*U[0],M=t(H,G,D);if(!(M>0))return null;let C=[H/M,G/M,D/M],W=J[0]*Q.origin[0]+J[4]*Q.origin[1]+J[8]*Q.origin[2]+J[12],k=J[1]*Q.origin[0]+J[5]*Q.origin[1]+J[9]*Q.origin[2]+J[13],O=J[2]*Q.origin[0]+J[6]*Q.origin[1]+J[10]*Q.origin[2]+J[14],P=W*B[0]+k*B[1]+O*B[2],T=W*U[0]+k*U[1]+O*U[2];return{member:$,hu:B,hv:U,n:C,d:W*C[0]+k*C[1]+O*C[2],u0:P,u1:P+z,v0:T,v1:T+V}})",()=>"(function($,J,Q,Z){let q=$[J],Y=q[Q],X=[Y];Z.add(Y);for(let z=Q+1;z<q.length;z++){let V=q[z];if(Z.has(V)||!f0(V.u0,X[X.length-1].u1))break;X.push(V),Z.add(V)}let K=X.map((z)=>[z.u0,z.u1]),j=Y.v1;for(let z=J+1;z<$.length;z++){let V=$[z];if(!f0(V[0].v0,j))break;let B=V.findIndex((H)=>f0(H.u0,Y.u0)&&!Z.has(H));let U=B<0?null:fK(V,B,K,Z);if(U===null)break;for(let H of U)X.push(H),Z.add(H);j=V[0].v1}return X})"]},function(){return[()=>"(function($,J){let Q=J[0],Z=1/0,q=-1/0,Y=1/0,X=-1/0;for(let W of J)Z=Math.min(Z,W.u0),q=Math.max(q,W.u1),Y=Math.min(Y,W.v0),X=Math.max(X,W.v1);let{hu:K,hv:j,n:z,d:V}=Q;let B=w9($.transform,gK);let U=(W,k)=>d3(B,W*K[0]+k*j[0]+V*z[0],W*K[1]+k*j[1]+V*z[1],W*K[2]+k*j[2]+V*z[2]);let H=U(Z,Y);let G=c3(B,(q-Z)*K[0],(q-Z)*K[1],(q-Z)*K[2]);let D=c3(B,(X-Y)*j[0],(X-Y)*j[1],(X-Y)*j[2]);let M=[1/0,1/0,1/0];let C=[-1/0,-1/0,-1/0];for(let W of[H,U(q,Y),U(Z,X),U(q,X)])for(let k=0;k<3;k++)M[k]=Math.min(M[k],W[k]),C[k]=Math.max(C[k],W[k]);return{sheet:{origin:H,u:G,v:D},localBounds:{min:M,max:C}}})",()=>"(function($,J){let Q=[],Z=[];for(let q=0;q<$.length;q++){let Y=hK(q,$[q].transform,$[q].sheet);if(Y===null){Q.push({rep:q,members:[q],sheet:$[q].sheet,localBounds:$[q].localBounds});continue}let X=Z.find((K)=>p3(K[0].hu,Y.hu)&&p3(K[0].hv,Y.hv)&&f0(K[0].d,Y.d));if(X===void 0)Z.push(X=[]);X.push(Y)}for(let q of Z){let v$15;{let $$33=q;{let $=$$33;let v$6;{let J=$.slice().sort((Z,q)=>f0(Z.v0,q.v0)?Z.u0-q.u0:Z.v0-q.v0),Q=[];for(let Z of J){let q=Q.at(-1);if(q!==void 0&&f0(q[0].v0,Z.v0)&&f0(q[0].v1,Z.v1))q.push(Z);else Q.push([Z])}v$6=Q;}let J=v$6;let Q=new Set;let Z=[];for(let q=0;q<J.length;q++){for(let Y=0;Y<J[q].length;Y++){if(!Q.has(J[q][Y])){Z.push(_K(J,q,Y,Q));}}}v$15=Z;}}for(let Y of v$15){let X=Y.map((j)=>j.member);if(Y.length===1){let j=X[0];Q.push({rep:j,members:X,sheet:$[j].sheet,localBounds:$[j].localBounds});continue}let K=X.find(J)??X[0];Q.push({rep:K,members:X,...uK($[K],Y)})}}return Q})",()=>"(function($){if($.waveHeightScale===0)return[];let J=2*Math.min($.coastHalfExtent[0],$.coastHalfExtent[1]),Q=[];if($.waveIntensity>0&&$.waveFrequency>0)for(let Z of R0){let q=L/(Z*$.waveFrequency);if(q$(q,J)>0)Q.push(q)}if($.swellAmplitude>0){for(let Z of r)if(q$(Z,J)>0)Q.push(Z)}return Q})",()=>"(function($,J){let Q=z0,Z=J.u,q=J.v,Y=J.origin,X=$[0]*Z[0]+$[4]*Z[1]+$[8]*Z[2],K=$[1]*Z[0]+$[5]*Z[1]+$[9]*Z[2],j=$[2]*Z[0]+$[6]*Z[1]+$[10]*Z[2],z=$[0]*q[0]+$[4]*q[1]+$[8]*q[2],V=$[1]*q[0]+$[5]*q[1]+$[9]*q[2],B=$[2]*q[0]+$[6]*q[1]+$[10]*q[2],U=t(X,K,j),H=t(z,V,B);Q[m$]=U,Q[p$]=H,Q[m]=X/U,Q[m+1]=K/U,Q[m+2]=j/U,Q[p]=z/H,Q[p+1]=V/H,Q[p+2]=B/H;let G=Q[m]*Q[p]+Q[m+1]*Q[p+1]+Q[m+2]*Q[p+2];Q[O7]=G,Q[u$]=Math.max(1-G*G,0.000001),Q[$0]=$[0]*Y[0]+$[4]*Y[1]+$[8]*Y[2]+$[12],Q[$0+1]=$[1]*Y[0]+$[5]*Y[1]+$[9]*Y[2]+$[13],Q[$0+2]=$[2]*Y[0]+$[6]*Y[1]+$[10]*Y[2]+$[14];let D=Q[m+1]*Q[p+2]-Q[m+2]*Q[p+1],M=Q[m+2]*Q[p]-Q[m]*Q[p+2],C=Q[m]*Q[p+1]-Q[m+1]*Q[p],W=Math.max(t(D,M,C),0.000000000001);Q[K0]=D/W,Q[K0+1]=M/W,Q[K0+2]=C/W})",()=>"(function($,J,Q,Z,q){let Y=z0,X=Q-Y[$0],K=Z-Y[$0+1],j=q-Y[$0+2],z=X*Y[m]+K*Y[m+1]+j*Y[m+2],V=X*Y[p]+K*Y[p+1]+j*Y[p+2];$[J]=(z-Y[O7]*V)/Y[u$],$[J+1]=(V-Y[O7]*z)/Y[u$],$[J+2]=X*Y[K0]+K*Y[K0+1]+j*Y[K0+2]})",()=>"(function($){if(!(Math.abs($[0]*$[5]-$[4]*$[1])>0.000000000001)||!b0($[3],0)||!b0($[7],0))return null;if(b0($[11],-1)&&b0($[15],0)&&b0($[12],0)&&b0($[13],0))return!1;if(b0($[11],0)&&b0($[15],1)&&b0($[8],0)&&b0($[9],0))return!0;return null})",()=>"(function($,J,Q,Z){let q=z0,Y=p9+J*3,X=p9+Q*3;if((q[Y+2]-Z)*(q[X+2]-Z)>=0)return;let K=(Z-q[Y+2])/(q[X+2]-q[Y+2]);{let J=q[Y]+(q[X]-q[Y])*K,Q=q[Y+1]+(q[X+1]-q[Y+1])*K;$[0]=Math.min($[0],J),$[1]=Math.min($[1],Q),$[2]=Math.max($[2],J),$[3]=Math.max($[3],Q)}})"]},function(){return[()=>"(function($,J,Q,Z,q,Y){let X=tK(q);if(X===null||!sK(Z))return!1;b7(J,Q);let K=z0,j=K[m$],z=K[p$];if(!(j>0&&z>0))return!1;let V=-(Z[0]*Z[12]+Z[1]*Z[13]+Z[2]*Z[14]),B=-(Z[4]*Z[12]+Z[5]*Z[13]+Z[6]*Z[14]),U=-(Z[8]*Z[12]+Z[9]*Z[13]+Z[10]*Z[14]),H=Y/Math.sqrt(K[u$]);{let J$10=Z,Q$5=Y,Z$1=H;{let J=J$10,Q=Q$5,Z=Z$1;let q=z0,Y=1/0,X=-1/0;for(let K=0;K<8;K++){let j=oK(J,K&1?q[m$]+Z:-Z,K&2?q[p$]+Z:-Z,K&4?Q:-Q);Y=Math.min(Y,j),X=Math.max(X,j)}$[0]=Y,$[1]=X}}let G=X?$[0]:Math.max($[0],0),D=$[1];if($[0]=$[1]=1/0,$[2]=$[3]=-1/0,D<G)return!0;let M=q[0]*q[5]-q[4]*q[1],C=(X?0:q[8])-q[12],W=(X?0:q[9])-q[13];for(let k=0;k<8;k++){let O=k&3,P=(O===1||O===2?1:-1)+C,T=(O>=2?1:-1)+W,S=(q[5]*P-q[4]*T)/M,v=(q[0]*T-q[1]*P)/M,w=k>=4?D:G,d=X?1:w,i=p9+k*3;$5(K,i,V+(Z[0]*S+Z[1]*v)*d-Z[2]*w,B+(Z[4]*S+Z[5]*v)*d-Z[6]*w,U+(Z[8]*S+Z[9]*v)*d-Z[10]*w);if(Math.abs(K[i+2])<=Y){{let J=K[i],Q=K[i+1];$[0]=Math.min($[0],J),$[1]=Math.min($[1],Q),$[2]=Math.max($[2],J),$[3]=Math.max($[3],Q)}}}for(let k=0;k<4;k++){let O=k+1&3;g$($,k,k+4,-Y),g$($,k,k+4,Y),g$($,k,O,-Y),g$($,k,O,Y),g$($,k+4,O+4,-Y),g$($,k+4,O+4,Y)}if($[0]>$[2])return!0;return $[0]=Math.max($[0]-H,0),$[1]=Math.max($[1]-H,0),$[2]=Math.min($[2]+H,j),$[3]=Math.min($[3]+H,z),!0})",()=>"(function($,J,Q,Z,q,Y,X,K,j,z){let{xs:V,zs:B}=Z,U=$j;U.origin[0]=V[0],U.origin[1]=(q.min[1]+q.max[1])/2,U.origin[2]=B[0],U.u[0]=V[V.length-1]-V[0],U.v[2]=B[B.length-1]-B[0],b7(Y,U),$5(e0,0,X[0],X[1],X[2]);let H=U.u[0]/z0[m$],G=U.v[2]/z0[p$],D=eK;D[0]=m9(V,U.origin[0]+H*e0[0]),D[1]=m9(B,U.origin[2]+G*e0[1]);let M=a8;if(D[2]=0,D[3]=0,D[4]=V.length-2,D[5]=B.length-2,K!==null&&KQ(M,Y,U,K,j,z+(q.max[1]-q.min[1])/2*t(Y[4],Y[5],Y[6])))if(M[0]>M[2]||M[1]>M[3])D[4]=D[5]=-1;else D[2]=g9(V,V[0]+H*M[0],0),D[3]=g9(B,B[0]+G*M[1],0),D[4]=g9(V,V[0]+H*M[2],t8-1),D[5]=g9(B,B[0]+G*M[3],t8-1);if($?.grid===Z){let k=0;while(k<6&&$.key[k]===D[k])k++;if(k===6)return $}let C=$;if(C===void 0||C.grid!==Z)C?.buffer.destroy(),C={grid:Z,key:new Int32Array(6),count:0,buffer:J.createBuffer({label:`lume water far-first ${Q}`,size:Z.triangles.byteLength,usage:16|8})};if(C.key.set(D),u9===null||u9.length<Z.triangles.length)u9=new Uint32Array(Z.triangles.length);let W=u9.subarray(0,Z.triangles.length);if(C.count=$Q(Z,W,D),C.count>0)J.queue.writeBuffer(C.buffer,0,W.subarray(0,C.count));return C})",()=>"(function($,J,Q,Z,q,Y,X,K,j,z,V){b7(J,Q);let B=z0,U=B[m$],H=B[p$],G=R*Z,D=0,M=0,C=4*Math.max(U,H),W=0,k=0,O=q!==null&&U>0&&H>0;if(O){$5(e0,0,q[0],q[1],q[2]);let Q0=e0[0],V0=e0[1],F0=Math.abs(e0[2]);if(Y!==null&&Y[15]>0.5)F0=Math.max(F0,2/Math.max(Math.abs(Y[5]),0.000001));let c0=Math.max(0,Math.ceil(Math.log2(Math.max(F0*(1-dK),0.000001)/(Z7*G)))-1);M=Math.max(0,-Q0,Q0-U,-V0,V0-H),C=Math.max(Math.abs(Q0),Math.abs(U-Q0),Math.abs(V0),Math.abs(H-V0));let v7=M>Z?Math.max(0,Math.ceil(Math.log2((M-Z)/(pK*G*t3)))):0;D=Math.max(c0,v7),W=Q0/Z+X[K+2],k=V0/Z+X[K+3]}let P=C*t3+Z,T=Math.max(D+1,P<=a3*G?1:Math.ceil(Math.log2(P/(a3*G)))+1),S=Math.min(T,j)-1,v=Math.max(D,j),w=X[K+2],d=X[K+3],i=w+U/Z,J0=d+H/Z,o=0;if(O&&z!==null&&Y!==null&&KQ(a8,J,Q,z,Y,V))o=x$,$.window.set(a8),w=Math.max(w,X[K+2]+$.window[0]/Z-r3),d=Math.max(d,X[K+3]+$.window[1]/Z-r3),i=Math.min(i,X[K+2]+$.window[2]/Z),J0=Math.min(J0,X[K+3]+$.window[3]/Z);if($.firstInstance=Math.max(S,0)*2**G$+o,$.fanFirstInstance=(T-1)*2**G$+o+H8,!O)return $.instanceCount=i3*Math.max(S-D+1,0),$.fanInstanceCount=i3*Math.max(T-v,0),$;let g=0,I=0;for(let Q0=T-1;Q0>=D;Q0--){let V0=R*2**Q0,F0=o3(W,X[K],w,i,V0)*o3(k,X[K+1],d,J0,V0);if(Q0>=j)I+=F0;else g+=F0}return $.instanceCount=g,$.fanInstanceCount=I,$})"]},function(){return[()=>'(function($){let J=e3.get($);if(J)return J;let v$7;{let $=new Uint16Array(c9+s8),J=0;for(let Y=0;Y<R;Y++)for(let X=0;X<R;X++){let K=Y*_$+X,j=K+_$;$.set([K,K+1,j+1,K,j+1,j],J),J+=6}let Q=R,Z=Q/2*_$+Q/2,q=[];for(let Y=0;Y<Q;Y++)q.push(Y);for(let Y=0;Y<Q;Y++)q.push(Y*_$+Q);for(let Y=Q;Y>0;Y--)q.push(Q*_$+Y);for(let Y=Q;Y>0;Y--)q.push(Y*_$);for(let Y=0;Y<q.length;Y++)$.set([Z,q[Y],q[(Y+1)%q.length]],J),J+=3;v$7=$;}let Q=v$7;let Z=$.createBuffer({label:"lume water eye grid quads",size:Q.byteLength,usage:16|8});return $.queue.writeBuffer(Z,0,Q),e3.set($,Z),Z})',()=>"(function($,J,Q,Z,q,Y,X){let K=$.createTexture({label:J,size:{width:q,height:Y},format:Q,usage:4|2|1});return{texture:K,view:K.createView(),lines:Y,maxLines:X,across:q,format:Q,texelBytes:Z,label:J}})",()=>'(function($){let J=(Math.min(MQ($),Math.floor(o2/k0)));let Q=(Math.min(MQ($),Math.floor(s2/a0)));let Z=a9($,"lume water rows","rgba32float",16,k0*b$,Math.min(qj,J),J);let q=a9($,"lume water arena vertices","rgba32uint",16,a0,Math.min(Yj,Q),Q);let Y=Math.floor(Zj($)/4);let X=GQ($,"lume water arena indices",Math.min(Xj,Y),Y);return{device:$,rows:Z,vertices:q,indices:X,vertexSpans:{free:[],top:0},indexSpans:{free:[],top:0},slots:J*k0,texels:Q*a0,views:{rows:Z.view,vertices:q.view},version:0,staging:new Uint32Array(0)}})',()=>"(function($,J,Q){if(Q<=J.lines)return J;let Z=J.lines;while(Z<Q)Z*=2;Z=Math.min(Z,J.maxLines);let q=a9($,J.label,J.format,J.texelBytes,J.across,Z,J.maxLines),Y=$.createCommandEncoder({label:`${J.label} grows`});return Y.copyTextureToTexture({texture:J.texture},{texture:q.texture},{width:J.across,height:J.lines}),$.queue.submit([Y.finish()]),J.texture.destroy(),q})",()=>"(function($,J,Q,Z,q,Y){let{across:X,texelBytes:K,texture:j}=J,z=Q,V=Y,B=Z;while(B>0){let U=z%X,H=Math.floor(z/X),G;if(U===0&&B>=X){let D=Math.floor(B/X);$.queue.writeTexture({texture:j,origin:{x:0,y:H}},q,{offset:V,bytesPerRow:X*K,rowsPerImage:D},{width:X,height:D}),G=D*X}else G=Math.min(B,X-U),$.queue.writeTexture({texture:j,origin:{x:U,y:H}},q,{offset:V,bytesPerRow:G*K},{width:G,height:1});z+=G,V+=G*K,B-=G}})",()=>"(function($,J,Q){if(Q<=0)return;let Z=$.free,q=0;while(q<Z.length&&Z[q]<J)q+=2;if(Z.splice(q,0,J,Q),q+2<Z.length&&Z[q]+Z[q+1]===Z[q+2])Z[q+1]+=Z[q+3],Z.splice(q+2,2);if(q>=2&&Z[q-2]+Z[q-1]===Z[q])Z[q-1]+=Z[q+1],Z.splice(q,2),q-=2;if(Z[q]+Z[q+1]===$.top)$.top=Z[q],Z.splice(q,2)})",()=>"(function($,J,Q,Z){let q=Q*(Z===null?1:2);if(q===0)return 0;let Y=bQ($.vertexSpans,q,$.texels);if(Y<0)return-1;jj:{let J=$.vertices,Q=Math.ceil($.vertexSpans.top/J.across);if(Q<=J.lines)break jj;$.vertices=q5($.device,J,Q),$.views.vertices=$.vertices.view,$.version+=1}j5($,Y,J,Q,Z);return Y})",()=>"(function($,J,Q,Z,q){let Y=q===null?1:2,X=Z*Y,K=xQ($,X*4),j=new Uint32Array(Q.buffer,Q.byteOffset,Z*3),z=q===null?null:new Uint32Array(q.buffer,q.byteOffset,Z*2);for(let V=0;V<Z;V+=1){let B=V*Y*4;if(K[B]=j[V*3],K[B+1]=j[V*3+1],K[B+2]=j[V*3+2],K[B+3]=0,z!==null)K[B+4]=z[V*2],K[B+5]=z[V*2+1],K[B+6]=0,K[B+7]=0}Y5($.device,$.vertices,J,X,K,0)})",()=>"(function($,J,Q){if(Q===0)return 0;let Z=bQ($.indexSpans,Q,$.indices.maxCorners);if(Z<0)return-1;Vj:{let J=$.indices,Q=$.indexSpans.top;if(Q<=J.corners)break Vj;let Z=J.corners;while(Z<Q)Z*=2;let q=GQ($.device,J.label,Math.min(Z,J.maxCorners),J.maxCorners);let Y=$.device.createCommandEncoder({label:`${J.label} grows`});Y.copyBufferToBuffer(J.buffer,0,q.buffer,0,J.corners*4),$.device.queue.submit([Y.finish()]),J.buffer.destroy(),$.indices=q,$.version+=1}V5($,Z,J,Q);return Z})"]},function(){return[()=>"(function($,J,Q,Z){let q=Q.buffer;if(Q instanceof Uint32Array&&q instanceof ArrayBuffer){$.device.queue.writeBuffer($.indices.buffer,J*4,new Uint32Array(q,Q.byteOffset,Z),0,Z);return}let Y=xQ($,Z);for(let X=0;X<Z;X+=1)Y[X]=Q[X];$.device.queue.writeBuffer($.indices.buffer,J*4,Y,0,Z)})",()=>"(function($,J,Q){let Z=Math.max(0,$.waveIntensity)*Math.abs($.waveHeightScale)*M$,q=r8($),Y=q,X=4*q;for(let K=0;K<R0.length;K++){let j=Z*w0[K],z=R0[K]*$.waveFrequency;Y+=j,X+=Math.min(2*j,0.5*j*(z*z*zj[K]+z*Bj[K])*Q)+2*j*(J?1:H$[K])}return Math.min(2*Y,X)})",()=>"(function($,J,Q,Z,q,Y,X,K){let j=$.levels,z=J.transform,V=J.sortCentre,B=J.sortAxes,U=Z.position[0]+q[0]-V[0],H=Z.position[1]+q[1]-V[1],G=Z.position[2]+q[2]-V[2],D=0;for(let P=0;P<9;P++)D+=B[P]*B[P];let M=Math.max(t(U,H,G)-Math.sqrt(D),0),C=s9(z,0),W=Z.projection[15]>0.5,k=0;for(let P=1;P<j.length&&!K;P++){if(!(TQ(j[P].error*C+Uj(J.params,J.sea||J.geometry.meets===!0,(j[P].spread+j[0].spread)*C*C),M,Y,W)<=AQ*(P>X?B5:1/B5)))break;k=P}let O=j[k];return Q.firstIndex=J.indexAt+O.firstIndex,Q.indexCount=O.triangles*3,k})",()=>"(function($,J){let Q=$.geometry.sheet;if(!Q||$.surface===!1||$.vertexSource||J.channelFrame||$.overrides?.coastHalfExtent!==void 0||!(b7(($.transform),Q),Math.abs(z0[K0+1])>=V9))return 0;{let $$10=J;{let $=$$10;let J=QQ($);return J.length>0?Math.min(...J)/K8:0}}})",()=>"(function($,J){for(let Z of[...$.surfaces.keys()])Wj(J,Z);E9($.ripples);let Q=$.ripples.gpu;if(Q){for(let Z of Q.field?.states??[])Z.destroy();Q.shade?.destroy(),Q.rest.release(),Q.stepBuffer.destroy(),Q.fragmentBuffer.destroy(),$.ripples.gpu=null}$.holds.buffer?.destroy(),$.holds.buffer=null,$.motion?.dispose(),$.motion=null,$.releaseFoamTexture?.(),$.releaseFoamTexture=null;for(let Z of $.gpu?.placeholders??[])Z.destroy();if($.gpu)Bq($,$.gpu);$.gpu=null})",()=>"(function($,J){let Q=[];return{get count(){return J.surfaces.size},found:Q,near(Z){let q=e($).origin,Y=J.nearBox;Y[0]=Z[0]+q[0],Y[1]=Z[1]+q[2],Y[2]=Z[2]+q[0],Y[3]=Z[3]+q[2];let X=J.near.query(Y,J.nearScratch),K=0;for(let j=0;j<X;j+=1){let z=J.nearScratch[j].rippleColumn;if(z!==null)Q[K++]=z}return K}}})",()=>"(function($,J,Q){if(J.fadeWord===Q)return;let Z=J$(J.fadeWord);let q=J$(Q);if(Z!==q)$.unseen+=Number(q)-Number(Z);if(J.fadeWord=Q,J.transformDirty=!0,Math.abs(Q)>1)$.fading.add(J);else $.fading.delete(J);if(J.sliceOf!==null)$.foldDirty.add(J.sliceOf);P0($,J)})",()=>"(function($,J,Q){let Z=$.peekStore(j0),q=Z?.surfaces.get(J);if(!Z||!q)return!1;if(!q.surface)return!0;let Y=Q.lighting??v0();let X=Q.motionVectors===!0;let K;{let $=Z,J=q;let Q=tq($.refractionCut,J.params);K=(Q&n)!==0?Q:Q|(aq((W9(k9().tier)))?n$:0);}let j=q.look??q;let z=q.look?.cutsDrawn[X?1:0]??K;let V=Q$(j,Y,X,K).key;if(Q.pipelines.peekRenderPipeline(V)!==null||Q.pipelines.peekRenderPipeline((`${V}/first-sight`))!==null)return!0;return z!==K&&Q.pipelines.peekRenderPipeline(Q$(j,Y,X,z).key)!==null})",()=>'(function($,J){let Q=J.sharerCount>0;let Z=J.guestSharerCount>0;let q=(pZ()||!JZ());J.refractionCut=q;J.sharing=Q;J.colourAsked=Q&&(!q||K7((W9(k9().tier))));$.setViewportSharer("water",Q&&{color:J.colourAsked,depth:!0},Z)})']},function(){return[()=>"(function($,J,Q,Z){if($.foamUsers+=Number(Q)-Number(J),Z!==void 0&&Z!==$.foamAssets||$.foamUsers===0){if($.releaseFoamTexture?.(),$.releaseFoamTexture=null,$.textures.crestFoam)$.textures.crestFoam=null,$.texturesVersion+=1}if(Z)$.foamAssets=Z;if($.foamUsers>0&&$.foamAssets&&!$.releaseFoamTexture){$.releaseFoamTexture=bJ($.foamAssets,function(Y){$.textures.crestFoam=Y,$.texturesVersion+=1})}})",()=>'(($,J)=>[c(U9,1|2,"unfilterable-float"),c(M9,1,"uint"),c(G9,1,"unfilterable-float"),...$&H6?[{binding:H9,visibility:1,buffer:{type:"read-only-storage"}},{binding:F9,visibility:1,buffer:{type:"uniform"}}]:[],{binding:f7,visibility:2,buffer:{type:J?"read-only-storage":"uniform"}}])',()=>'(function($){{let $$1=$.limits,J$1=ZZ($,[z7,YZ,Kq,jq(H6,!1)],"storage buffers").fragment;{let $=$$1,J=J$1;let Q=$?.maxUniformBufferBindingSize;if(Q===void 0||Q>=17680)return W6;if(J>0){return{storage:!0,planes:vJ($?.maxStorageBufferBindingSize)};}return{storage:!1,planes:vJ(Q)}}}})',()=>"(function($,J){{let $=J.arena;$.rows.texture.destroy(),$.vertices.texture.destroy(),$.indices.buffer.destroy()}J.motionWords[0].destroy();J.motionWords[1].destroy();J.guestPrior.destroy();J.holdsStandIn?.release();for(let Q of $.looks.values())Q.gpu?.uniformBuffer.destroy(),Q.gpu=null;for(let Q of $.views)oq(Q)})",()=>"(function($,J,Q,Z,q){return[{binding:0,resource:{buffer:Q}},{binding:1,resource:o9($.textures.normal,J.placeholderNormalView)},{binding:2,resource:J.repeatSampler},{binding:3,resource:o9($.textures.caustics,J.placeholderWhiteArrayView)},{binding:4,resource:o9($.textures.crestFoam,J.placeholderWhiteView)},{binding:5,resource:o9($.textures.shoreFoam,J.placeholderWhiteView)},{binding:6,resource:Z?.colorView??J.placeholderSceneColorView},{binding:7,resource:Z?.depthView??J.placeholderSceneDepthView},{binding:8,resource:J.clampSampler},{binding:9,resource:J.pointSampler},...Pj($),{binding:$J,resource:q===void 0?J.placeholderChannelProfileView:t5(q)}]})",()=>"(function($){let v$3;{let $$6=$.ripples;{let $=$$6;let J=$.gpu;v$3=J?{view:J.shadeView,buffer:J.fragmentBuffer}:null;}}let J=v$3;if(J===null){da();}return[{binding:d7,resource:J.view},{binding:l7,resource:{buffer:J.buffer}}]})",()=>"(function($,J,Q){let Z=Q.gpu;if(Z===null){let q=J.device.createBuffer({label:`lume water look ${Q.serial}`,size:U0.byteSize,usage:64|8});Z={uniformBuffer:q,materialBindGroup:A5($,J,q,null,Q.channelProfile),shareGroups:new WeakMap,texturesVersion:$.texturesVersion},Q.gpu=Z,Q.uniformsDirty=!0}if(Z.texturesVersion!==$.texturesVersion)Z.materialBindGroup=A5($,J,Z.uniformBuffer,null,Q.channelProfile),Z.shareGroups=new WeakMap,Z.texturesVersion=$.texturesVersion;if(Q.uniformsDirty){Q.uniformsDirty=!1;let q=Q.uniformArray,Y=q[F5];if($.refractionOff)q[F5]=0;J.device.queue.writeBuffer(Z.uniformBuffer,0,q),q[F5]=Y}return Z})",()=>"(function($,J,Q){let Z=J.mediumFiled;if(Z===Q)return;if(Z!==null){let q=$.media.get(Z);if(q?.delete(J),q?.size===0)$.media.delete(Z);$.mediaCount-=1}if(J.mediumFiled=Q,Q!==null)h5($.media,Q).add(J),$.mediaCount+=1;if(Q!==null&&J.medium?.vertex)$.vertexMedia.add(J);else $.vertexMedia.delete(J)})"]},function(){return[()=>"(function($,J,Q){if(J.ground||J.cells||J.authoredDepth)return!1;let Z=J.geometry.sheet??JJ(J.geometry.localBounds);if(!Z)return!1;let v$16;JQ:{let $$34=J.transform,J$30=Z,Q$15=Q[0],Z$10=Q[2];{let $=$$34,J=J$30,Q=Q$15,Z=Z$10;if(!(b7($,J),Math.abs(z0[K0+1])>=V9)){v$16=NaN;break JQ;}let q=z0;v$16=q[$0+1]-(q[K0]*(Q-q[$0])+q[K0+2]*(Z-q[$0+2]))/q[K0+1];}}let q=v$16+J.params.surfaceYOffset;return q>Q[1]&&rZ($,Q[0],q,Q[2],Q[1])})",()=>"(function($,J,Q,Z,q){if($.holdCount===0)return!1;let Y=-1/0;for(let X=0;X<Q;X+=1){let K=$.media.get(J[X]);if(K===void 0)continue;for(let j of K)if(j.medium&&j.ground===q)Y=Math.max(Y,j.holdRestY)}return Y>-1/0&&d4($.holds,Z,Y,q)})",()=>"(function($){let J=$.projection;l5(J,$.view,S5),w9(S5,RQ);let Q=RQ,Z=0;for(let q=0;q<4;q++){let Y=q&1?1:-1,X=q&2?1:-1,K=1-X6,j=Q[3]*Y+Q[7]*X+Q[11]*K+Q[15];if(j<=0.000001)return 1/0;Z=Math.max(Z,t((Q[0]*Y+Q[4]*X+Q[8]*K+Q[12])/j-$.position[0],(Q[1]*Y+Q[5]*X+Q[9]*K+Q[13])/j-$.position[1],(Q[2]*Y+Q[6]*X+Q[10]*K+Q[14])/j-$.position[2]))}return Z})",()=>"(function($,J,Q){let Z=J.look;if(Z!==null&&Z.key===Q)return;if(Z!==null){if(Z.members-=1,Z.members===0){$.looks.delete(Z.key),Z.gpu?.uniformBuffer.destroy(),Z.gpu=null;for(let Y of $.views){let X=Y.looks.get(Z);if(X===void 0||X.entries>0)continue;Y.looks.delete(Z)}}}if(J.look=null,Q===null)return;let q=$.looks.get(Q);if(q===void 0)q={key:Q,serial:$.nextLookSerial++,params:J.params,structuralKey:J.structuralKey,channelProfile:J.geometry.channelProfile,uniformArray:new Float32Array($.lookWords),uniformsDirty:!0,members:0,gpu:null,cutsDrawn:[0,0]},$.looks.set(Q,q);q.members+=1,J.look=q})",()=>"(function($,J){let Q=J.geometry;let Z=(J.params.channelFrame&&J.geometry.channel!==void 0?J.geometry.channel:null);let q=Q.indices??null;if(J.vertexAt>=0&&J.arenaPositions===Q.positions&&J.arenaIndices===q&&J.arenaChannel===Z)return aj;UJ($,J);let Y=Q.vertexCount;let X=BJ(J);let K=q?.length??0;if(!X5($,X,K))return Nq;J.vertexAt=PQ($,Q.positions,Y,Z);J.vertexTexels=X;J.indexTexels=K;J.indexAt=q===null?-1:yQ($,q,q.length);J.triangles=Q.ladder?.levels[0].triangles??Math.floor((q?.length??Y)/3);J.arenaPositions=Q.positions;J.arenaIndices=q;J.arenaChannel=Z;return L5})",()=>'(function($,J,Q){let Z=J.arena,q=!1;if(Q.slot<0){if(!kj($,Q,Z.slots))return v5($,J,Q),!1;CQ:{let $$11=Z,J$11=$.slots.length;{let $=$$11,J=J$11;let Q=Math.ceil(J/k0);if(Q<=$.rows.lines)break CQ;$.rows=q5($.device,$.rows,Q),$.views.rows=$.rows.view,$.version+=1}}q=!0;Q.transformDirty=!0;Q.uniformsDirty=!0}let Y=Q.vertexTexels+Q.indexTexels>0;let X=tj(Z,Q);if(X===Nq)return v5($,J,Q),!1;if(X===L5&&Y)$.roomOwed=!0;if($.homeless.delete(Q)&&$.homeless.size===0)__sc.info("[lume water] every surface stands on the GPU again");return q||X===L5})',()=>"(function($,J,Q,Z){let q=e($).origin,Y=J.roomEye,X=Z[0]+q[0],K=Z[1]+q[1],j=Z[2]+q[2];if(!a(X+K+j))return!1;if(!J.roomOwed&&t(X-Y[0],K-Y[1],j-Y[2])+J.roomDrift<=J.roomSlack)return!1;J.roomOwed=!1,Y[0]=X,Y[1]=K,Y[2]=j;let z=Q.arena,V=J.roomOrder;V.length=0;for(let M of J.surfaces.values()){M.roomDistance=xq(M,Y);V.push(M);}V.sort(oj);let{slots:B,texels:U}=z,H=z.indices.maxCorners;for(let M of V){let C=BJ(M);let W=bq(M);if(M.roomKept=B>0&&C<=U&&W<=H,!M.roomKept)continue;B-=1,U-=C,H-=W}let G=!1;for(let M of V){if(M.roomKept||M.slot<0)continue;v5(J,Q,M),G=!0}let D=!1;for(let M of V){if(!M.roomKept||M.slot>=0)continue;if(!D&&!ej(J,z,M)){$V($,J,Q,V,Z);D=!0;}yq($,J,Q,M,Z);G=!0}J.roomOwed=!1;J.roomDrift=0;J.roomSlack=ZV(V);return G})"]},function(){return[()=>"(function($,J,Q,Z,q){let Y=Q.arena,X=J.roomCompact;X.length=0;for(let j of Z)if(j.slot>=0&&j.arenaPositions!==null)X.push(j);let K=0;X.sort(JV);for(let j of X){if(j.vertexTexels===0)continue;let z=j.arenaPositions;if(z!==null&&j.vertexAt!==K){let V=j.arenaChannel;j5(Y,K,z,j.vertexTexels/(V===null?1:2),V),j.vertexAt=K,j.roomMoved=!0}K+=j.vertexTexels}z5(Y.vertexSpans,K);K=0;X.sort(QV);for(let j of X){let z=j.arenaIndices;if(z===null||j.indexTexels===0)continue;if(j.indexAt!==K)V5(Y,K,z,j.indexTexels),j.indexAt=K,j.roomMoved=!0;K+=j.indexTexels}z5(Y.indexSpans,K);for(let j of X){if(!j.roomMoved)continue;j.roomMoved=!1;yq($,J,Q,j,q)}})",()=>"(function($,J){if(J.vertexAt>=0)K5($.vertexSpans,J.vertexAt,J.vertexTexels);if(J.indexAt>=0)K5($.indexSpans,J.indexAt,J.indexTexels);J.vertexAt=-1,J.indexAt=-1,J.vertexTexels=0,J.indexTexels=0,J.arenaPositions=null,J.arenaIndices=null,J.arenaChannel=null})",()=>"(function($,J){let{min:Q,max:Z}=U6($),q=$.transform,Y=(Q[0]+Z[0])/2,X=(Q[1]+Z[1])/2,K=(Q[2]+Z[2])/2,j=[(Z[0]-Q[0])/2,(Z[1]-Q[1])/2,(Z[2]-Q[2])/2],z=e9(q,[Y,X,K],1,$.sortCentre);for(let B=0;B<3;B++)z[B]+=J[B];let V=$.sortAxes;for(let B=0;B<3;B++)for(let U=0;U<3;U++)V[B*3+U]=q[B*4+U]*j[B]})",()=>"(function($,J,Q){let{sortCentre:Z,sortAxes:q}=J,Y=$[2],X=$[6],K=$[10],j=-(Y*(Z[0]-Q[0])+X*(Z[1]-Q[1])+K*(Z[2]-Q[2])+$[14]),z=Math.abs(Y*q[0]+X*q[1]+K*q[2])+Math.abs(Y*q[3]+X*q[4]+K*q[5])+Math.abs(Y*q[6]+X*q[7]+K*q[8]);return Math.max(0,j+z)})",()=>"(function($,J){if(J.overOwed.size===0&&!J.overMoved)return;let Q=$.peekStore(b5)??(J.surfaces.size===0?void 0:$.store(b5,xZ));if(Q===void 0){J.overOwed.clear(),J.overMoved=!1;return}for(let Z of J.overOwed)if(J.surfaces.get(Z.id)!==Z||!fQ(J,Q,Z))vq(J,Z);for(let Z of J.overHanded)if(Z.overAt>=0&&fQ(J,Q,Z))J.overMoved=!0;J.overHanded.clear(),J.overOwed.clear(),TZ(Q,J.overRecords.length,J.overMoved),J.overMoved=!1})",()=>"(function($,J,Q){if(Q.slot<0||!Q.surface||!Q.params.transparent||Q.foldedBy!==null||Q.uniformsDirty||Q.look===null)return!1;let Z=QJ(Q)??JJ(U6(Q));if(!Z)return!1;let q=Q.transform,Y=Z.u,X=Z.v,[K,j,z]=e9(q,Y,0,zV),[V,B,U]=e9(q,X,0,BV),H=z*V-K*U,G=t(j*U-z*B,H,K*B-j*V);if(!(G>0)||Math.abs(H)<VV*G)return!1;if(Q.overAt<0)Q.overAt=$.overRecords.length,$.overRecords.push(Q),$.overMoved=!0;let[D,M,C]=e9(q,Z.origin,1,UV),W=M+(j+B)/2+Q.params.surfaceYOffset,k=Math.min(D,D+K,D+V,D+K+V),O=Math.max(D,D+K,D+V,D+K+V),P=Math.min(C,C+z,C+U,C+z+U),T=Math.max(C,C+z,C+U,C+z+U),S=Q.look.uniformArray,v=S[HV];if(PZ(J,Q.overAt,W,k,P,O,T,S[M5]+v,S[M5+1]+v,S[M5+2]+v))$.overMoved=!0;let w=Q.medium;if(yZ(J,Q.overAt,w!==null&&Q.wet,w===null?null:Q.mediumUniformArray))$.overMoved=!0;return!0})",()=>"(function($,J,Q){J.params=D6(J.bareParams,F6(J.transform,Q,$.foldOrigin),J.authoredCoast,Rq(J.transform,J.geometry,J.ground));J.gridFlat=d9(J.params,J.gridSigma);J.gridReach=e8(J.params);J.uniformsDirty=!0;J.transformDirty=!0;P0($,J)})",()=>'(function($,J){let Q=null,Z=!1;for(let q of J){if(_Q(q)===null){Z=G5($,q)||Z;continue}let Y;{let $=q;let J=Qq($.fadeWord)?String($.fadeWord):"0";let Q=$.clipPlane===null?"":a5($.clipPlane).join(",");Y=`${$.sliceOf}\n${$.structuralKey}\n${J}\n${Q}\n${$.params.transparent?1:0}\n${$.gridSigma}`;}Q??=new Map;let X=Q.get(Y);if(X===void 0)Q.set(Y,[q]);else X.push(q)}if(Q===null)return Z;for(let q of Q.values()){if(q.length<2){Z=G5($,q[0])||Z;continue}let Y=q.map((X)=>({transform:X.transform,sheet:_Q(X)??CV,localBounds:X.geometry.localBounds}));for(let X of n3(Y,(K)=>q[K].gpu!==null)){if(X.members.length<2)Z=G5($,q[X.rep])||Z;else {let v$10;kV:{let J$19=q[X.rep],Q$10=X,Z$5=X.members.map((K)=>q[K]);{let J=J$19,Q=Q$10,Z=Z$5;let q=J.fold;if(q!==null&&J.foldedBy===null&&GV(q.sheet,Q.sheet)&&y7(q.members,Z)){v$10=!1;break kV;}if(J.foldedBy!==null)P0($,J);J.foldedBy=null,J.fold={sheet:Q.sheet,localBounds:Q.localBounds,members:Z},hq($,J,Q.localBounds);for(let Y of Z){if(Y===J)continue;if(Y.fold!==null)MJ($,Y);if(Y.foldedBy!==J)P0($,Y);Y.foldedBy=J}v$10=!0;}}Z=v$10||Z}}}return Z})']},function(){return[()=>"(function($,J,Q,Z){if((pZ()||!JZ())!==J.refractionCut||J.sharing&&(!(J.refractionCut)||K7((W9(k9().tier))))!==J.colourAsked)Z6($,J);let q=J.refractionCut||J.refractionOff&&!Z?.colorView;if(q===J.refractionOff)return!1;J.refractionOff=q;for(let Y of J.looks.values())Y.uniformsDirty=!0,KJ(J,Q,Y);return!0})",()=>'(function($,J,Q){if(!J||Q.channel!==void 0)return!0;if(!$.warnedMissingChannel)$.warnedMissingChannel=!0,__sc.warn("[lume water] a channelFrame surface arrived without channel coordinates; skipped");return!1})',()=>'(function($,J,Q,Z,q,Y){let{params:X,causticClass:K,lit:j,key:z,folds:V,guard:B}=Z;return function(){let{vertex:U,fragment:H,texts:G}=yV($,Q,K,j,q,Y,B,V);let D=BZ(V&(gq.get(H)??0));let M=(Y&(n$|n))===n$&&(((IY[K])?.rays??1)>1)?{...D,...i2}:D;let v$8;{let Q$7=q?H6:0,Z$3=[...G,(O4(V8(Q.params,K,!1,I7($.device)),j,q,$.holdsBinding))];{let Q=Q$7,Z=Z$3;let q=P$(J,Z),Y=$.pipelineLayouts[Q]??=new Map,X=Y.get(q);if(X===void 0){let K=[J.getBindGroupLayout(z7,"lume frame"),q,$.materialLayout,Vq($,J,Q)];X=y$($.device,XJ[Q],K,q),Y.set(q,X)}v$8=X;}}return{label:z,layout:v$8,vertex:{module:U,entryPoint:"vs",buffers:[]},fragment:{module:H,entryPoint:"fs",...M!==void 0?{constants:M}:{},targets:f5({motion:q,...X.transparent?{blend:rQ,motionBlend:eQ}:{}})},depthStencil:$Z(X.depthWrite),multisample:{count:A$()}}}})',()=>"(function($,J,Q){if(o0(Q)!==null||cQ.has(Q))return;cQ.add(Q);Q.ready.then(function(){let Z=cq($);let q=Z.get(J);if(q===void 0)return;if(Z.delete(J),o0(q.handle)===null)$.supersedeQueued(q.handle)},function(){return})})",()=>"(function($,J,Q,Z,q,Y){if(Q)return null;let X=$.geometry.grid;if(!X||!$.gpu||!lq($)){{let $$26=J,J$23=$;{let $=$$26,J=J$23;$.farFirst.get(J)?.buffer.destroy(),$.farFirst.delete(J)}}return null;}let K=jQ(J.farFirst.get($),Y,$.id,X,$.geometry.localBounds,$.transform,q.position,Z?q.view:null,q.projection,$.gridReach);return J.farFirst.set($,K),K})",()=>"(function($,J,Q,Z,q,Y,X,K,j=0,z=null,V=!1){s.gpu=J;s.pipelines=Q.pipelines;s.look=q;s.lighting=Y;s.motion=X;s.stood=K;s.cuts=j;s.twin=z;s.same=V;s.share=mV(Q,Z);try{return $.standRows?.has(Z.id)===!0?Q.pipelines.pictureScope(dQ):dQ()}finally{s.gpu=null,s.pipelines=null,s.look=null,s.lighting=null,s.stood=null,s.twin=null}})",()=>"(function($,J,Q,Z,q,Y,X,K,j){let z=X?1:0,V=Q.pipelines,B=Q$(q,Y,X,j);if(j6()&&(j&n)===0&&!nQ(J,V,q,Y,X,n)&&V.peekRenderPipeline(B.key)!==null){uV(J,V,q,Y,X,u5,n);}let U=q.cutsDrawn[z];let H=U!==j&&nQ(J,V,q,Y,X,U)?Q$(q,Y,X,U).key:null;let G=H!==null&&(U&~j)===0&&((U^j)&(n$|n))===0;let D=lQ($,J,Q,Z,q,Y,X,K,j,H,G);if(H===null||D.pipeline)q.cutsDrawn[z]=j;if(!D.failed||!eZ(V.parkWord(D)))return D;if(mq(B.lit,B.lane)?.watchdogSmaller!==void 0)return D;let M=lQ($,J,Q,Z,q,Y,X,K,i$);if(M.pipeline)q.cutsDrawn[z]=i$;return M})",()=>"(function($,J,Q){let{heldWords:Z,nextWords:q}=$;q[0]=j6()?1:0;q[1]=(z6()?1:0)|(s5()?2:0);q[2]=aq((W9(k9().tier)))?1:0;q[3]=($.refractionOff?1:0)|($.refractionCut?2:0);q[4]=$.colourAsked?1:0;q[5]=$.holdCount>0?1:0;q[6]=Q.generation;q[7]=c$($.motion?.buffer);q[8]=$.holdCount>0?c$($.holds.buffer):0;q[9]=iQ(nV,(W9(k9().tier)));q[10]=A$();q[11]=iQ(iV,N0());q[12]=p5();q[13]=c5();q[14]=d$()?1:0;q[15]=J.arena.version;let Y=!0;for(let X=0;X<R5&&Y;X+=1)Y=Z[X]===q[X];if(Y)return;Z.set(q),$.wordsRevision+=1})"]},function(){return[()=>"(function($,J,Q,Z){let q=Z.motionVectors===!0,Y=Z.motionFrameId!==void 0,X=q&&Y?$.motion?.buffer??null:null;if(q&&Y&&X===null)return null;let K=q?H6:0;let j=$.holdCount>0&&$.holds.buffer!==null?$.holds.buffer:Oj(J);let z=J.arena;let V=(Q.windows=Q.windows===null?kQ(J.arena):WQ(J.arena,Q.windows));let B=K*2+(Y?1:0);let U=`${z.version}/${c$(X)}/${c$(j)}/${c$(V.texture)}`;let H=Q.drawGroups[B];if(H!==null&&Q.drawGroupKeys[B]===U)return H;let G=[{binding:U9,resource:z.rows.view},{binding:M9,resource:z.vertices.view},{binding:G9,resource:V.view}];if(q)G.push({binding:H9,resource:{buffer:X??J.guestPrior}},{binding:F9,resource:{buffer:J.motionWords[Y?0:1]}});G.push({binding:f7,resource:{buffer:j}});let D=J.device.createBindGroup({label:XJ[K],layout:Vq(J,Z.pipelines,K),entries:G});return Q.drawGroups[B]=D,Q.drawGroupKeys[B]=U,D})",()=>"(function($,J,Q,Z,q,Y=!1){if(!Q.params.transparent)return null;let X=Q$(Q,Z,q,n),K=X.descriptor;if(K===null||X.gpu!==$||X.pipelines!==J||!C8(M6(Q.params,X.causticClass,n,I7($.device))))return null;let j=Y?u5:jZ;if(Y)J.enterCalm();J.enterScope(j);try{return J.getRenderPipeline(`${X.key}/floor-tint`,()=>rV(K(),q))}finally{if(J.leaveScope(j),Y)J.leaveCalm()}})",()=>'(function($,J,Q){let Z=$.pipeline;if(Z===null)throw Error("internal: a water look\'s command made with no pipeline");return{pipeline:Z,bindGroups:$.bindGroups,...Q!==void 0?{indexBuffer:Q}:{},draw:J,throughTwin:!1,liquid:!0}})',()=>"(function($,J,Q,Z,q){let Y=J.viewLook.tint;if(J.stride===2&&Y!==null){let X=eV(Y,Q);J.commands.push(X),J.at.push(-1),J.sortables.push({command:X,sortDepth:0})}if(J.commands.push(Q),J.at.push(-1),!Z){J.sortables.push(null);return}Q.throughTwin=$.twin,Q.readsSceneColor=q,J.sortables.push({command:Q,sortDepth:0})})",()=>"(function($,J,Q,Z,q,Y){let X=J.at[Q];if(X>=0===Z)return;let K=J.sortables[Q];if(!Z){if(K===null){tQ($.opaque,$.opaqueOwners,$.opaqueSub,X);}else {tQ($.alpha,$.alphaOwners,$.alphaSub,X);}J.at[Q]=-1;return}if(K===null){sQ($.opaque,$.opaqueOwners,$.opaqueSub,J.commands[Q],J,Q);return}if(q!==null&&Y!==null)K.sortDepth=Iq(q,J.record,Y);sQ($.alpha,$.alphaOwners,$.alphaSub,K,J,Q)})",()=>"(function($,J,Q){let Z=J.camera.view,q=$.sortedView,Y=!$.sorted||$.sortedOrigin[0]!==Q[0]||$.sortedOrigin[1]!==Q[1]||$.sortedOrigin[2]!==Q[2];for(let j=0;j<16&&!Y;j+=1)Y=q[j]!==Z[j];if(!Y)return;q.set(Z),$.sortedOrigin[0]=Q[0],$.sortedOrigin[1]=Q[1],$.sortedOrigin[2]=Q[2],$.sorted=!0;let{alpha:X,alphaOwners:K}=$;for(let j=0;j<X.length;j+=1)X[j].sortDepth=Iq(q,K[j].record,$.sortedOrigin)})"]}],$c0XU=[0,4,7,13,19,23,30,34,40,48,53,58,65,68,77,86,94,101,109,117];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,123,1954154106847232);var $c0I=$c0C.i;function $c0P(f,h,k){h[k]=f;return f}
;const{$T1:W8,Aqv:H7,AsX:m5,B3p:SZ,BYe:H3,BYs:zZ,Bes:JJ,Bpv:J9,Brz:Z9,Bxn:HZ,C2z:QZ,C5q:EZ,C9b:V3,CDb:y7,CM4:B3,C_k:mZ,CcE:j6,CcR:M3,Cdy:f8,D4c:gZ,DEr:c5,DIS:d5,EBB:S7,EEU:d3,EVH:L2,EiQ:u0,EsG:cZ,FAr:G7,FKD:o0,GgD:eZ,Ggy:Q7,Gj9:vZ,HfE:FZ,Hq$:PZ,ICu:kZ,Isb:s9,JLE:CZ,J_p:AZ,Jai:L0,KLH:xZ,KOT:B7,KdH:$Z,KtM:N5,Kwj:T4,LR1:J5,LiM:K3,M$n:z3,MDG:f4,MDX:bZ,ME_:RZ,MN3:g5,MZH:n5,MfU:f5,MvF:TQ,MwQ:b5,N0E:v0,N4y:E2,NDw:b,Nx2:F$,OTr:x5,OVv:LZ,OuE:I0,P2_:J6,PeD:Q6,R8A:x9,RPR:OZ,SeW:z6,SlX:X6,THT:jZ,TRl:uZ,TjB:_,Tkv:Y6,To5:e,TwD:W2,U4$:a$,U4E:E5,UJM:t5,UV$:P9,Uaj:B5,UcB:GZ,V3g:yZ,W8g:u5,WmQ:h5,Wqm:i9,X2s:r5,XRk:I2,Xqr:p5,YBk:o5,ZFi:w4,ZSe:P4,ZT7:ZZ,ZZw:KZ,Zoa:c6,ZtX:N8,_7c:$6,_S$:l5,_rr:c,a6E:T2,aj7:w5,am7:W5,baA:a7,baH:L,bli:X3,cBV:Y3,cSw:WZ,clN:x4,cuT:dZ,dBL:Q9,duP:wZ,dxN:hZ,eV4:XZ,eza:v2,fEN:s5,fRd:t,fSQ:YZ,fTC:VZ,fVj:AQ,fX9:IZ,fbp:j3,gSa:HQ,gZr:MQ,gnz:b2,gqQ:M7,gw5:b9,gxUT:pZ,h1y:a,hFV:UZ,hR0:O5,hTL:NZ,hxd:P2,iWF:qZ,j2v:V$,jYa:Hj,jj$:$Q,jqS:T$,kQP:A$,knu:_4,l$A:x2,l9h:U7,lSa:y2,lbZ:Q8,liZ:a5,m3o:JZ,mq1:z7,mxB:i5,nZy:OJ,nvi:S2,nzJ:R2,p$i:U3,pD7:MZ,pJh:q9,pSj:w9,paB:TZ,pfC:BZ,pvq:V6,q43:N0,r2n:d$,rvA:O2,rx1:g4,s0T:A2,s7R:rQ,sVa:k7,tOW:_Z,tZ9:I7,taY:Z$,ts0:i0,tyR:W9,uMP:P$,ubO:DZ,vSR:y9,vdl:r0,vu_:K6,wRZ:E0,wiI:rZ,xFq:eQ,xv5:y4,xzm:k9,yeF:m9,yfJ:y$,ynn:N2,zfZ:_5,zox:h2}=$Lr;var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;var z1=0.01;function F6($,J,Q=[0,0,0]){let Z=1/0,q=-1/0,Y=1/0,X=-1/0;for(let K=0;K<8;K++){let j=K&1?J.max[0]:J.min[0],z=K&2?J.max[1]:J.min[1],V=K&4?J.max[2]:J.min[2],B=$[0]*j+$[4]*z+$[8]*V+$[12],U=$[2]*j+$[6]*z+$[10]*V+$[14];if(B<Z)Z=B;if(B>q)q=B;if(U<Y)Y=U;if(U>X)X=U}if(!a(Z)||!a(q)||!a(Y)||!a(X))return{center:[0,0],halfExtent:[0,0]};return{center:[(Z+q)/2+Q[0],(Y+X)/2+Q[2]],halfExtent:[Math.max(0,(q-Z)/2),Math.max(0,(X-Y)/2)]}}function H1($){if($===void 0||!a($)||$<0)return G6;return Math.min(G6,$*WJ)}var M1=Math.fround(kJ.depthColorDistance??NaN);function G1($,J){if(Math.fround($)!==M1)return 1;if(J===void 0||!a(J)||J<=0)return 1;let Q=$/(2*J);return isFinite(Math.fround(Q))?Math.max(1,Q):1}function D6($,J,Q,Z){let q=Q?$.coastCenter:J.center;let Y=Q?$.coastHalfExtent:J.halfExtent;let X=2*Math.min(Y[0],Y[1]);let K=(Math.min(($.waveIntensity),Math.max(0,X)*z1/y0));let j=$.swellAmplitude*(q$(r[0],X));return{...$,coastCenter:q,coastHalfExtent:Y,swellAmplitude:j,waveIntensity:K,crestFoamEnabled:$.crestFoamEnabled&&$.waveHeightScale>0&&(K>0||j>0),shoreBodyScale:Q?$.shoreBodyScale:H1(Z),bodyColumnGain:Q?$.bodyColumnGain:G1($.depthColorDistance,Z)}}var Pz=NJ();function bJ($,J){let Q=!0,Z={},q=null,Y=function(){if(!Q)return;let K=$.retainTextureAsset(a$);if(!K)return;if(K.snapshot.handle===q?.snapshot.handle){K.release();return}let j=q;q=K,J(OJ(K.snapshot.handle)),j?.release()};Y();let X=$.subscribeTextureAsset(a$,Y);return $.noteTextureTilePixels?.(a$,1/0,Z),function(){if(!Q)return;Q=!1,X(),$.withdrawTextureTilePixels?.(a$,Z),q?.release(),q=null}}var PJ=($,J)=>Math.fround(-Math.log2($)/Math.max(Math.fround(J),Math.fround(0.05)));function R7($,J,Q,Z=1){let q=$.map(Math.fround);let Y=q.map((K)=>Math.fround(-Math.log2((Math.min(Math.max(K,Math.fround((0.002))),Math.fround(0.98))))));let X=Math.min(...Y);return{extinction:q.map((K)=>PJ((Math.min(Math.max(K,Math.fround((0.0001))),Math.fround(0.98))),J)),scatter:q.map((K,j)=>Math.fround(Math.fround(K*Math.fround((X/Y[j])**Z))*Math.fround(Q)))}}function TJ($,J){return (Math.fround($)>=1)?0:J}var F1=1208925819614629200000000;function AJ($,J){if((Math.fround($)>=1))return F1;return PJ(Math.fround(1-Math.min(Math.max(Math.fround($),0),Math.fround(0.999))),J)}var IJ=function($){let J=(Z)=>`water_foamHash(${$?`water_foamWrap(${Z}, cells)`:Z}).x`,Q=(Z)=>$?`, period${Z}`:"";return`
fn water_foamHash(p: vec2<f32>) -> vec2<f32> {
  var q = fract(vec3<f32>(p.x, p.y, p.x) * vec3<f32>(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + vec3<f32>(33.33));
  return fract((q.xx + q.yz) * q.zy);
}${$?`
fn water_foamWrap(i: vec2<f32>, cells: f32) -> vec2<f32> {
  if (cells > 0.0) {
    return vec2<f32>(i.x - cells * floor(i.x / cells), i.y);
  }
  return i;
}
fn water_foamLoopFit(uv: vec2<f32>, period: f32) -> vec2<f32> {
  if (period > 0.0) {
    return vec2<f32>(uv.x * max(1.0, round(period)) / period, uv.y);
  }
  return uv;
}`:""}
fn water_foamNoise(${$?`at: vec2<f32>, period: f32) -> f32 {
  var p = at;
  var cells = 0.0;
  if (period > 0.0) {
    cells = max(1.0, round(period));
    p.x = at.x * cells / period;
  }`:"p: vec2<f32>) -> f32 {"}
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = ${J("i")};
  let b = ${J("i + vec2<f32>(1.0, 0.0)")};
  let c = ${J("i + vec2<f32>(0.0, 1.0)")};
  let d = ${J("i + vec2<f32>(1.0, 1.0)")};
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
fn water_foamMass(p: vec2<f32>, time: f32, broadKeep: f32, fineKeep: f32${Q(": f32")}) -> f32 {
  let broad = mix(0.5, water_foamNoise(p + vec2<f32>(time * 0.04, -time * 0.07)${Q("")}), broadKeep);
  let fine = mix(0.5, water_foamNoise(p * 2.15 + vec2<f32>(13.7 - time * 0.09, 9.2 + time * 0.03)${Q(" * 2.15")}), fineKeep);
  return broad * 0.64 + fine * 0.36;
}
`};var SJ=IJ(!1);var LJ=IJ(!0);var C6=16;var h7=20,k6=4,RJ=324;var W6={storage:!1,planes:1024},vJ=($)=>$===void 0?1024:Math.max(1,Math.min(1024,Math.floor(($/4-324)/4)));var D1=0.04,f7=2,N6=($)=>(N6=$c0C(0))($);var C1=`fn water_loopDir(d: vec2<f32>, k: f32, loopLength: f32) -> vec2<f32> {
  if (loopLength > 0.0) {
    let turn = ${b(L)} / max(loopLength, 1e-6);
    return vec2<f32>(round(d.x * k / turn) * turn, d.y * k) / k;
  }
  return d;
}
fn water_loopGust(at: vec2<f32>, t: f32, loopLength: f32) -> vec3<f32> {
  if (loopLength > 0.0) {
    let turn = ${b(L)} * fract(at.x / (loopLength * 0.11));
    let radius = loopLength * 0.11 / ${b(L)};
    return vec3<f32>(radius * cos(turn) + t * 0.05, radius * sin(turn), at.y);
  }
  return vec3<f32>(at, t * 0.05);
}
`;function uJ($){let J=(q,Y)=>$?`water_loopDir(${q}, ${Y}, loopLength)`:q;let Q=function(q,Y,X,K){let j=L/Y,z=Math.sqrt(O6*j)*EJ;return`  let wd${q} = ${J(y6(X),`${b(j)} * tile`)};
  let wp${q} = dot(xz, wd${q}) * ${b(j)} * tile - t * ${b(z)} * sqrt(tile) + ${b(K)};`};let Z=b6.map(function([q,Y,X],K){let j=L/Y,z=Math.sqrt(O6*j),V=q+1.22,B=L/fJ[K],U=[Math.cos(q),Math.sin(q),Math.cos(V),Math.sin(V)].map(b).join(", "),H=[j,B,z,X].map(b).join(", ");return`  water_rippleTerm(&sum, p, t, tile, flow, flowSpeed, gust, warpedDx, warpedDy, mirrorView, mirrorPx, ${$?"loopLength, ":""}vec4<f32>(${U}), vec4<f32>(${H}), vec2<f32>(${b(X*X)}, ${b(X*X/2)}));`});return`struct WaterRipplePrepared {
  slope: vec2<f32>,
  kept: f32,
  mirrorSlope: vec2<f32>,
  mirrorSpread: vec2<f32>,
}
${$?C1:""}fn water_rippleTerm(sum: ptr<function, WaterRipplePrepared>, p: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, gust: f32, warpedDx: vec2<f32>, warpedDy: vec2<f32>, mirrorView: vec3<f32>, mirrorPx: f32, ${$?"loopLength: f32, ":""}r: vec4<f32>, c: vec4<f32>, s: vec2<f32>) {
  let d = ${J("vec2<f32>(flow.x * r.x - flow.y * r.y, flow.x * r.y + flow.y * r.x)","c.x * tile")};
  let j = ${J("vec2<f32>(flow.x * r.z - flow.y * r.w, flow.x * r.w + flow.y * r.z)","c.y * tile")};
  let k = c.x * tile;
  let jp = dot(p, j) * c.y * tile;
  let bend = ${b(P6)} * sin(jp);
  let phase = dot(p, d) * k - t * (c.z * sqrt(tile) + dot(flow, d) * flowSpeed * k) + bend;
  let phaseStep = vec2<f32>(dot(warpedDx, d), dot(warpedDy, d)) * k + vec2<f32>(dpdx(bend), dpdy(bend));
  let phaseFootprint = max(abs(phaseStep.x), abs(phaseStep.y));
  let w = 1.0 - smoothstep(${b(L/_7)}, ${b(L/t$)}, phaseFootprint);
  let towardEye = d.x * mirrorView.x + d.y * mirrorView.y;
  let hitRange = c.w * gust * mirrorPx * 2.0 * sqrt(towardEye * towardEye + mirrorView.z * mirrorView.z) * phaseFootprint;
  let wm = w * (1.0 - smoothstep(${b(_J)}, ${b(wJ)}, hitRange));
  (*sum).kept += w * w * s.x;
  let wave = c.w * cos(phase) * gust;
  (*sum).slope += d * (wave * w);
  (*sum).mirrorSlope += d * (wave * wm);
  (*sum).mirrorSpread += d * d * ((w * w - wm * wm) * s.y * gust * gust);
}
fn water_rippleSlopePrepared(xz: vec2<f32>, t: f32, tile: f32, flow: vec2<f32>, flowSpeed: f32, pDx: vec2<f32>, pDy: vec2<f32>, mirrorView: vec3<f32>, mirrorPx: f32${$?", loopLength: f32":""}) -> WaterRipplePrepared {
  var gust = 1.0;
  if (!water_rippleGone(tile, flow, pDx, pDy)) {
    gust = 0.55 + 0.9 * shade_perlin3(${$?"water_loopGust(xz * 0.11 - flow * (t * 0.35), t, loopLength)":"vec3<f32>(xz * 0.11 - flow * (t * 0.35), t * 0.05)"});
  }
${Q(0,4.3,0.6,0)}
${Q(1,3.6,-1.7,1.3)}
  let warpOffset = (${b(x6)} / tile) * vec2<f32>(sin(wp0), sin(wp1));
  let p = xz + warpOffset;
  let warpedDx = pDx + dpdx(warpOffset);
  let warpedDy = pDy + dpdy(warpOffset);
  var sum = WaterRipplePrepared(vec2<f32>(0.0), 0.0, vec2<f32>(0.0), vec2<f32>(0.0));
${Z.join(`
`)}
  sum.kept = sum.kept * ${b(1/gJ)};
  return sum;
}
`}function mJ(){let $=L/t$+2*P6,J=b6.map(function([Q,Z]){let q=L/Z;return`  {
    let d = ${y6(Q)};
    least = min(least, (max(abs(dot(pDx, d)), abs(dot(pDy, d))) - warpStep * length(d)) * (${b(q)} * tile));
  }`});return`fn water_rippleGone(tile: f32, flow: vec2<f32>, pDx: vec2<f32>, pDy: vec2<f32>) -> bool {
  let warpStep = ${b(2*Math.SQRT2*x6)} / tile;
  var least = 1e30;
${J.join(`
`)}
  return least > ${b($*1.001)};
}
`}var pJ=`${uJ(!1)}
${mJ()}`,cJ=`${uJ(!0)}
${mJ()}`;var B0=256,A0=32,iJ=0.22,aJ=9.81,A6=1,D0=3.2,X$=0.18,tJ=0.25,d0=12,I6=40,sJ=1.8,k1=0.8,W1=0.75,N1=3,s$=0.45,S6=0.8,T6=3,L6=0.005,oJ=0.008,rJ=0.015625,l0=16,u7=0.016666666666666666,v6=0.1,h=6,O1=[[0,1],[1,0.678276606],[2,0.444564895],[4,0.156420803],[5,0.072257536],[8,-0.049938777],[9,-0.065327391],[10,-0.073774851],[13,-0.075937865],[16,-0.064447811],[17,-0.0599648],[18,-0.055537014],[20,-0.047262519],[25,-0.03143321],[26,-0.02907282],[29,-0.023276902],[32,-0.019006733],[34,-0.016789616],[36,-0.01495682],[37,-0.014159108],[40,-0.012144644],[41,-0.011577904],[45,-0.009704215],[50,-0.007999069],[52,-0.007455794],[61,-0.005640889],[72,-0.004262207]],b1=2.097912288995911,dJ=0.15;function m7($){let J=O1.find(([Z])=>Z===$);if(J===void 0){aa($);}let Q=2*h+1;let v$1;x1:{if($===0){v$1=4*dJ;break x1;}if($===1){v$1=-dJ;break x1;}v$1=0;}return J[1]-b1/(Q*Q)+v$1}var Z0=16,_0=Z0+2*h,y=B0/Z0,p7=Math.ceil(y*y/32),w7=Math.ceil(p7/4),lJ=Math.log2(Z0),R6=12,h6=16,E6=h6+w7*4,o$=E6+w7*4,f6=o$+y*y*4,_6=f6+l0*R6,T0=l0,nJ=0.05,g7=4,$2=2*g7,c7=12+4*T0,r$=c7+4*g7,Y$=4,P1=Z0*Z0/Y$,w6=($,J)=>`rh${$+h}_${J+h}`;function y1($){if($===0)return"cb";return $>0?`cb + ${$}u`:`cb - ${-$}u`}function T1(){let $=[];for(let J=-h;J<Y$+h;J++){for(let Q=-h;Q<=h;Q++){$.push(`  let ${w6(Q,J)} = rippleTile[${y1(J*_0+Q)}];`);}}return $.join(`
`)}function A1($){let J=new Map;for(let Z=-h;Z<=h;Z++){for(let q=-h;q<=h;q++){let Y=q*q+Z*Z,X=J.get(Y)??[];X.push(w6(q,Z+$));J.set(Y,X)}}let Q=["    var conv = 0.0;"];for(let[Z,q]of[...J.entries()].sort((Y,X)=>Y[0]-X[0]))Q.push(`    conv += ${b(Number(m7(Z).toPrecision(9)))} * (${q.join(" + ")});`);return Q.join(`
`)}function I1($){let J=(Q,Z)=>w6(Q,Z+$);return`  {
    let lxy = vec2i(i32(local.x), i32(local.y) * ${Y$} + ${$});
    let cell = tileAt * ${Z0} + lxy;
${A1($)}
    let here = ripple_load(cell + slide);
    let h = ${J(0,0)};
    let hBefore = here.y;
    let edge = f32(ripple_edge(open, lxy));
    let sponge = 1.0 - smoothstep(0.0, ${b(d0)}, edge);
    let alphaDt = fade.x + sponge * sponge * ${b(I6)} * ripple.wave.w;
    let filtered = h - fade.z * (20.0 * h - 8.0 * (${J(1,0)} + ${J(-1,0)} + ${J(0,1)} + ${J(0,-1)}) + 2.0 * (${J(1,1)} + ${J(-1,1)} + ${J(1,-1)} + ${J(-1,-1)}) + ${J(2,0)} + ${J(-2,0)} + ${J(0,2)} + ${J(0,-2)});
    var next = (filtered * (2.0 - alphaDt) - hBefore - ripple.wave.x * conv) / (1.0 + alphaDt);
    next += ${b(L6)} * ripple.wave.w * ${b(1/u7)} * (${J(1,0)} + ${J(-1,0)} + ${J(0,1)} + ${J(0,-1)} - 4.0 * h);
    var foam = here.z * fade.y;
    let p = ripple.domain.xy + (vec2f(cell) + 0.5) * ripple.domain.w;
    for (var i = 0u; i < sourceCount; i++) {
      let s = ripple.sources[i];
      let nowPush = ripple_push(p, s.now.xy, s.now.z);
      next += s.now.w * nowPush - s.before.w * ripple_push(p, s.before.xy, s.before.z) + s.push.x * nowPush;
      foam += s.push.y * ripple_disk(p, s.push.zw, s.now.z * ${b(S6)});
    }
    let gx = (${J(1,0)} - ${J(-1,0)}) * inv2dx;
    let gz = (${J(0,1)} - ${J(0,-1)}) * inv2dx;
    foam += max(length(vec2f(gx, gz)) - ${b(W1)}, 0.0) * ${b(N1)} * ripple.wave.w;
    foam = clamp(foam, 0.0, ${b(k1)});
    next = clamp(next, -2.0, 2.0);
    textureStore(rippleDst, cell, vec4f(next, filtered, foam, 0.0));
    if (ripple.step.z > 0.5) {
      textureStore(rippleShade, cell, vec4f(gx, gz, foam, next));
    }
  }`}var J2=()=>`struct RippleSource {
  now: vec4f,
  before: vec4f,
  push: vec4f,
}
struct RippleStep {
  domain: vec4f,
  step: vec4f,
  wave: vec4f,
  first: vec4f,
  runs: array<vec4u, ${w7}>,
  held: array<vec4u, ${w7}>,
  fade: array<vec4f, ${y*y}>,
  sources: array<RippleSource, ${l0}>,
}
@group(0) @binding(0) var rippleSrc: texture_2d<f32>;
@group(0) @binding(1) var rippleDst: texture_storage_2d<rgba32float, write>;
@group(0) @binding(2) var<uniform> ripple: RippleStep;
@group(0) @binding(3) var rippleShade: texture_storage_2d<rgba16float, write>;

var<workgroup> rippleTile: array<f32, ${_0*_0}>;

fn ripple_tile_index(t: vec2i) -> i32 {
  let tiles = i32(${y});
  if (t.x < 0 || t.y < 0 || t.x >= tiles || t.y >= tiles) { return -1; }
  return t.y * tiles + t.x;
}

fn ripple_runs(t: vec2i) -> bool {
  let i = ripple_tile_index(t);
  if (i < 0) { return false; }
  let k = u32(i);
  return ((ripple.runs[k / 128u][(k / 32u) % 4u] >> (k % 32u)) & 1u) != 0u;
}

fn ripple_load(q: vec2i) -> vec4f {
  let i = ripple_tile_index(vec2i(q.x >> ${lJ}u, q.y >> ${lJ}u));
  if (i < 0) { return vec4f(0.0); }
  let k = u32(i);
  if (((ripple.held[k / 128u][(k / 32u) % 4u] >> (k % 32u)) & 1u) == 0u) { return vec4f(0.0); }
  return textureLoad(rippleSrc, q, 0);
}

fn ripple_open_sides(t: vec2i) -> u32 {
  var open = 0u;
  if (!ripple_runs(t + vec2i(-1, 0))) { open |= 1u; }
  if (!ripple_runs(t + vec2i(1, 0))) { open |= 2u; }
  if (!ripple_runs(t + vec2i(0, -1))) { open |= 4u; }
  if (!ripple_runs(t + vec2i(0, 1))) { open |= 8u; }
  if (!ripple_runs(t + vec2i(-1, -1))) { open |= 16u; }
  if (!ripple_runs(t + vec2i(1, -1))) { open |= 32u; }
  if (!ripple_runs(t + vec2i(-1, 1))) { open |= 64u; }
  if (!ripple_runs(t + vec2i(1, 1))) { open |= 128u; }
  return open;
}

fn ripple_edge(open: u32, l: vec2i) -> i32 {
  let lo = l;
  let hi = vec2i(${Z0-1}) - l;
  var edge = ${Z0};
  if ((open & 1u) != 0u) { edge = min(edge, lo.x); }
  if ((open & 2u) != 0u) { edge = min(edge, hi.x); }
  if ((open & 4u) != 0u) { edge = min(edge, lo.y); }
  if ((open & 8u) != 0u) { edge = min(edge, hi.y); }
  if ((open & 16u) != 0u) { edge = min(edge, max(lo.x, lo.y)); }
  if ((open & 32u) != 0u) { edge = min(edge, max(hi.x, lo.y)); }
  if ((open & 64u) != 0u) { edge = min(edge, max(lo.x, hi.y)); }
  if ((open & 128u) != 0u) { edge = min(edge, max(hi.x, hi.y)); }
  return edge;
}

fn ripple_disk(p: vec2f, centre: vec2f, radius: f32) -> f32 {
  let d = length(p - centre) / max(radius, ${b(s$)});
  return exp(-2.5 * d * d);
}
fn ripple_push(p: vec2f, centre: vec2f, radius: f32) -> f32 {
  let r = max(radius, ${b(s$)});
  let d = length(p - centre) / r;
  let skirt = d / ${b(T6)};
  return (radius * radius) / (r * r) * (exp(-2.5 * d * d) - exp(-2.5 * skirt * skirt) * ${b(1/(T6*T6))});
}

@compute @workgroup_size(${Z0}, ${Z0/Y$})
fn ripple_step(@builtin(local_invocation_id) local: vec3u, @builtin(workgroup_id) group: vec3u, @builtin(local_invocation_index) li: u32) {
  let tileAt = vec2i(group.xy) + vec2i(ripple.first.xy);
  let runs = ripple_runs(tileAt);
  let slide = vec2i(i32(ripple.step.x), i32(ripple.step.y));
  let tileOrigin = tileAt * ${Z0} - vec2i(${h}) + slide;
  if (runs) {
    for (var i = li; i < ${_0*_0}u; i += ${P1}u) {
      let t = vec2i(i32(i % ${_0}u), i32(i / ${_0}u));
      rippleTile[i] = ripple_load(tileOrigin + t).x;
    }
  }
  workgroupBarrier();
  if (!runs) { return; }
  let fade = ripple.fade[u32(ripple_tile_index(tileAt))];
  let open = ripple_open_sides(tileAt);
  let sourceCount = u32(ripple.step.w);
  let inv2dx = 0.5 / ripple.domain.w;
  let cb = (local.y * ${Y$}u + ${h}u) * ${_0}u + local.x + ${h}u;
${T1()}
${Array.from({length:Y$},($,J)=>I1(J)).join(`
`)}
}`;var g6="waterRipple.still.y > 0.5";var d7=10;var l7=11;var Q2=`struct WaterRippleFrame {
  window: vec4f,
  read: vec4f,
  still: vec4f,
  things: array<vec4f, ${T0}>,
  liquids: array<vec4f, ${g7}>,
}
@group(2) @binding(${d7}) var waterRippleTex: texture_2d<f32>;
@group(2) @binding(${l7}) var<uniform> waterRipple: WaterRippleFrame;
fn water_rippleShare(halfLife: f32) -> f32 {
  for (var i = 0u; i < ${g7}u; i = i + 1u) {
    let row = waterRipple.liquids[i];
    if (row.x == halfLife) { return row.y; }
    if (row.z == halfLife) { return row.w; }
  }
  return 0.0;
}
fn water_rippleField(p: vec2f, pixelFootprint: f32, share: f32) -> vec4f {
  if (waterRipple.read.x < 0.5) { return vec4f(0.0); }
  let uv = (p - waterRipple.window.xy) / waterRipple.window.z;
  if (uv.x <= 0.0 || uv.y <= 0.0 || uv.x >= 1.0 || uv.y >= 1.0) { return vec4f(0.0); }
  let edgeUv = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
  let edgeKeep = smoothstep(0.0, 0.12, edgeUv);
  let footprintKeep = 1.0 - smoothstep(waterRipple.window.w * 1.2, waterRipple.window.w * 4.0, pixelFootprint);
  let keep = edgeKeep * footprintKeep;
  if (keep <= 0.0) { return vec4f(0.0); }
  let field = textureSampleLevel(waterRippleTex, waterClampSampler, uv, 0.0);
  return vec4f(field.xy * (waterRipple.read.y * share * keep), clamp(field.z * (waterRipple.read.z * share), 0.0, 1.0) * edgeKeep, keep);
}
fn water_rippleVeto(hit: vec2f, tap: vec2f) -> f32 {
  let movers = min(u32(waterRipple.read.w), ${T0}u);
  let count = min(movers + u32(waterRipple.still.x), ${T0}u);
  let margin = vec2f(${b(nJ)});
  for (var i = 0u; i < count; i = i + 1u) {
    let box = waterRipple.things[i];
    let low = box.xy - margin;
    let high = box.zw + margin;
    if (all(hit >= low) && all(hit <= high) && (i < movers || any(tap < low) || any(tap > high))) { return 1.0; }
  }
  return 0.0;
}
fn water_rippleMoverCrossed(start: vec2f, along: vec2f, hidden: vec2f) -> f32 {
  let movers = min(u32(waterRipple.read.w), ${T0}u);
  let margin = vec2f(${b(nJ)});
  let inverse = 1.0 / select(along, vec2f(1e-6), abs(along) < vec2f(1e-6));
  var found = 0.0;
  for (var i = 0u; i < movers; i = i + 1u) {
    let box = waterRipple.things[i];
    let near = (min(box.xy, box.xy + hidden) - margin - start) * inverse;
    let far = (max(box.zw, box.zw + hidden) + margin - start) * inverse;
    let enter = max(max(min(near.x, far.x), min(near.y, far.y)), 0.0);
    let leave = min(min(max(near.x, far.x), max(near.y, far.y)), 1.0);
    found = max(found, select(0.0, 1.0, enter <= leave));
  }
  return found;
}`;var F=function($){if(!a($)){{throw Error(`lume water: non-finite WGSL literal ${$}`);
}}return b($)};var z$=($)=>`vec4<f32>(${$.map((J)=>F(J)).join(", ")})`;var S1=function($){let J=Y7[$];return`  let bend${$+1} = dot(${z$(J)}, bendSin);
  let bendGrad${$+1} = vec2<f32>(dot(${z$(J.map((Q,Z)=>Q*C0[Z][0]))}, bendCos), dot(${z$(J.map((Q,Z)=>Q*C0[Z][1]))}, bendCos));`};var Z2=`fn water_gerstnerWave(xz: vec2<f32>, t: f32, displacementIntensity: f32, normalIntensity: f32, frequency: f32, flowDir: vec2<f32>, extent: f32) -> WaterWaveSample {
  let crossDir = vec2<f32>(-flowDir.y, flowDir.x);
  let diagDirA = normalize(flowDir * 0.82 + crossDir * 0.57);
  let diagDirB = normalize(flowDir * -0.45 + crossDir * 0.89);
  let fixedDir = vec2<f32>(${l6[0]}, ${l6[1]});
  let displacementAmplitudeScale = displacementIntensity * ${M$};
  let normalAmplitudeScale = normalIntensity * ${M$};
  let bendArg = ${z$(C0.map(($)=>$[0]))} * xz.x + ${z$(C0.map(($)=>$[1]))} * xz.y + ${z$(w2)};
  let bendSin = sin(bendArg);
  let bendCos = cos(bendArg);
  var horizontal = vec2<f32>(0.0);
  var height = 0.0;
  var normalX = 0.0;
  var normalY = 1.0;
  var normalZ = 0.0;
  var shedSum = 0.0;
${["flowDir","crossDir","diagDirA","diagDirB","fixedDir"].map(($,J,Q,Z=J+1)=>`  let k${Z} = ${R0[J]} * frequency;
  let h${Z} = water_hold(k${Z}, extent) * water_gridKeep(${F(L)} / k${Z});
  let l${Z} = water_lookKeep(k${Z}, ${$});
  let g${Z} = h${Z} * l${Z};
  let dA${Z} = displacementAmplitudeScale * ${w0[J]} * g${Z};
  let nA${Z} = normalAmplitudeScale * ${F(w0[J]*g2[J])} * g${Z};
${S1(J)}
  let p${Z} = (dot(xz, ${$}) + bend${Z}) * k${Z} - t * ${j8[J]};
  horizontal += ${$} * (dA${Z} * ${H$[J]} * cos(p${Z}));
  height += sin(p${Z}) * dA${Z};
  normalX -= (${$}.x + bendGrad${Z}.x) * k${Z} * nA${Z} * cos(p${Z});
  normalY -= k${Z} * nA${Z} * ${H$[J]} * sin(p${Z});
  normalZ -= (${$}.y + bendGrad${Z}.y) * k${Z} * nA${Z} * cos(p${Z});
  shedSum += ${F(w0[J]*w0[J])} * k${Z} * k${Z} * h${Z} * h${Z} * (1.0 - l${Z} * l${Z});`).join(`
`)}
  let shed = 0.5 * normalAmplitudeScale * normalAmplitudeScale * shedSum;
  return WaterWaveSample(vec3<f32>(horizontal.x, height, horizontal.y), water_safeNormalize(vec3<f32>(normalX, normalY, normalZ), vec3<f32>(0.0, 1.0, 0.0)), 1.0 - normalY, shed);
}`;var q2=`fn water_swell(xz: vec2<f32>, t: f32, amplitude: f32, dir: vec2<f32>, coastCenter: vec2<f32>, coastHalfExtent: vec2<f32>, surfWidth: f32, farFade: f32) -> WaterSwellSample {
  let shelf = water_coastDistance(xz, coastCenter, coastHalfExtent) / max(surfWidth, 1.0);
  let breakSignal = 1.0 - smoothstep(${F(q8)}, ${F(Y8)}, shelf);
  let steepness = mix(${F(Y9)}, ${F(D$)}, breakSignal);
  let a = water_swellLocalAmplitude(amplitude, xz, coastCenter, coastHalfExtent, surfWidth, farFade);
  let dir2 = vec2<f32>(dir.x * ${F(Math.cos(K$))} - dir.y * ${F(Math.sin(K$))}, dir.x * ${F(Math.sin(K$))} + dir.y * ${F(Math.cos(K$))});
  let k1 = ${F(L/r[0])};
  let k2 = ${F(L/r[1])};
  let grid1 = water_gridKeep(${F(r[0])});
  let look1 = water_lookKeep(k1, dir);
  let keep1 = grid1 * look1;
  let grid2 = water_gridKeep(${F(r[1])});
  let look2 = water_lookKeep(k2, dir2);
  let keep2 = grid2 * look2;
  let a1 = a * ${F(f[0])} * keep1;
  let a2 = a * ${F(f[1])} * keep2;
  let p1 = dot(xz, dir) * k1 - t * ${F(U$(r[0]))};
  let p2 = dot(xz, dir2) * k2 - t * ${F(U$(r[1]))};
  let s1 = sin(p1);
  let c1 = cos(p1);
  let s2 = sin(p2);
  let c2 = cos(p2);
  let q1 = steepness * ${F(f[0]/(f[0]+f[1]))} / k1 * keep1;
  let q2 = steepness * ${F(f[1]/(f[0]+f[1]))} / k2 * keep2;
  let present = select(0.0, 1.0, a > 1e-6);
  let horizontal = (dir * (q1 * c1) + dir2 * (q2 * c2)) * present;
  let height = a1 * s1 + a2 * s2;
  let slope = dir * (k1 * a1 * c1) + dir2 * (k2 * a2 * c2);
  let shed = 0.5 * a * a * (${F(f[0]*f[0])} * k1 * k1 * grid1 * grid1 * (1.0 - look1 * look1) + ${F(f[1]*f[1])} * k2 * k2 * grid2 * grid2 * (1.0 - look2 * look2));
  return WaterSwellSample(vec3<f32>(horizontal.x, height, horizontal.y), slope, p1, breakSignal * present, shed * present);
}`;var Y2=($,J)=>$.replace(/fn \w+\(([^)]*)\) -> \w+ \{/,(Q,Z)=>`fn ${J}(${Z.replace("normalIntensity: f32, ","")}) -> vec3<f32> {`).split(`
`).filter((Q)=>!/^ {2}(\/\/|(let |var )?(g\d|keep\d|l\d|look\d|nA\d|normal\w*|bendCos|bendGrad\d|slope|shed\w*) )/.test(Q)).join(`
`).replace(/\bg(\d)\b/g,"h$1").replace(/\bkeep(\d)\b/g,"grid$1").replace(/return \w+\(vec3<f32>\(horizontal\.x, height, horizontal\.y\).*/,"return vec3<f32>(horizontal.x, height, horizontal.y);");var c2=`fn water_safeNormalize(v: vec3<f32>, up: vec3<f32>) -> vec3<f32> {
  let len2 = dot(v, v);
  let valid = (len2 == len2) && (len2 > 1e-12) && (len2 <= 3.0e38);
  return select(up, v * inverseSqrt(max(len2, 1e-12)), valid);
}`;var j9=`struct WaterWaveSample {
  displacement: vec3<f32>,
  normal: vec3<f32>,
  compression: f32,
  shed: f32,
}
${c2}
fn water_extent(coastHalfExtent: vec2<f32>) -> f32 {
  return 2.0 * min(coastHalfExtent.x, coastHalfExtent.y);
}
fn water_hold(k: f32, extent: f32) -> f32 {
  return smoothstep(${F(L)} / k, ${F(4*i0)} / k, extent);
}
var<private> water_gridSigma: f32 = 0.0;
fn water_gridKeep(wavelength: f32) -> f32 {
  if (water_gridSigma <= 0.0 || wavelength > 1.0e30) { return 1.0; }
  return 1.0 - smoothstep(${F(X8)} * wavelength, ${F(q7)} * wavelength, water_gridSigma);
}
fn water_gridFarFade() -> f32 {
  return select(1.0, 0.0, water_gridSigma > 0.0);
}
var<private> water_lookDx: vec2<f32> = vec2<f32>(0.0);
var<private> water_lookDy: vec2<f32> = vec2<f32>(0.0);
fn water_lookKeep(k: f32, dir: vec2<f32>) -> f32 {
  let reach = max(abs(dot(water_lookDx, dir)), abs(dot(water_lookDy, dir)));
  if (reach <= 0.0) { return 1.0; }
  let wavelength = ${F(L)} / k;
  return 1.0 - smoothstep(wavelength / ${F(_7)}, wavelength / ${F(t$)}, reach);
}

${Z2}
${Y2(Z2,"water_gerstnerLift")}
struct WaterSwellSample {
  displacement: vec3<f32>,
  slope: vec2<f32>,
  phase: f32,
  breakSignal: f32,
  shed: f32,
}
fn water_coastDistance(xz: vec2<f32>, coastCenter: vec2<f32>, coastHalfExtent: vec2<f32>) -> f32 {
  let inset = coastHalfExtent - abs(xz - coastCenter);
  return min(inset.x, inset.y);
}
fn water_containHorizontal(h: vec2<f32>, edge: f32) -> vec2<f32> {
  return h * min(1.0, max(edge, 0.0) / max(length(h), 1e-6));
}
//${Z8} m), the water the beach looks at), the steepness is the Gerstner Q\u00b7k\u00b7A: ${Y9} at sea
//${D$} over the inner shelf (a sharp, leaning crest - the sum stays under 1, so the
//${d6} m of coast where the ocean grid is too coarse to
fn water_swellLocalAmplitude(amplitude: f32, xz: vec2<f32>, coastCenter: vec2<f32>, coastHalfExtent: vec2<f32>, surfWidth: f32, farFade: f32) -> f32 {
  let s = water_coastDistance(xz, coastCenter, coastHalfExtent);
  let runOut = ${F(s7)} + ${F(1-s7)} * smoothstep(0.0, 1.0, s / max(surfWidth, 1.0));
  let far = 1.0 - farFade * smoothstep(${F(d6)}, ${F(_2)}, s);
  return amplitude * runOut * far;
}
${q2}
${Y2(q2,"water_swellLift")}`;var S0="water.channelFrame > 0.5";var L1="any(water.meetLine.xz != vec2<f32>(0.0))";var C$=`struct WaterUniforms {
  waterSurfaceColor: vec3<f32>,
  waveIntensity: f32,
  waterHighlightColor: vec3<f32>,
  waveFrequency: f32,
  extinction: vec3<f32>,
  waveHeightScale: f32,
  causticTint: vec3<f32>,
  surfaceYOffset: f32,
  foamColor: vec3<f32>,
  flowSpeed: f32,
  emissiveColor: vec3<f32>,
  murkExtinction: f32,
  foamStrength: f32,
  crestFoamCoverage: f32,
  crestFoamStrength: f32,
  crestWaveSignalScale: f32,
  detailNormalStrength: f32,
  normalScale: f32,
  contactFoamWidth: f32,
  shorelineFoamStrength: f32,
  shorelineFoamSoftness: f32,
  causticScale: f32,
  causticStrength: f32,
  depthColorDistance: f32,
  refractionStrength: f32,
  surfaceOpacity: f32,
  baseRoughness: f32,
  detailNormalMix: f32,
  depthPipelineMix: f32,
  causticsMix: f32,
  shoreFoamMix: f32,
  crestFoamMix: f32,
  refractionMix: f32,
  scatterR: f32,
  scatterGB: vec2<f32>,
  swellAmplitude: f32,
  surfWidth: f32,
  swellDirection: vec2<f32>,
  shoreBodyScale: f32,
  foamScale: f32,
  foamFootprintScale: f32,
  foamMassScale: f32,
  rippleHalfLife: f32,
  channelFrame: f32,
  bodyColumnGain: f32,
  channelLoop: vec2<f32>,
  meetLine: vec4<f32>,
  meetTail: vec4<f32>,
  meetHead: vec4<f32>,
}`;var U0=(function(){let $={},J=0;for(let[,Q,Z]of C$.matchAll(/(\w+): (\w+)/g)){let q=Z==="f32"?4:Number(Z[3])*4,Y=q===12?16:q;J=Math.ceil(J/Y)*Y,$[Q]={offset:J,size:q},J+=q}return{byteSize:Math.ceil(J/16)*16,fields:$}})();var v1=["waveIntensity","waveFrequency","waveHeightScale","surfaceYOffset","flowSpeed","foamStrength","crestFoamCoverage","crestFoamStrength","detailNormalStrength","normalScale","contactFoamWidth","shorelineFoamStrength","shorelineFoamSoftness","causticScale","causticStrength","depthColorDistance","refractionStrength","surfaceOpacity","baseRoughness","swellAmplitude","surfWidth","swellDirection","bodyColumnGain"];function d2($,J){if($.length<U0.byteSize/4)throw Error(`lume water: uniform array needs ${U0.byteSize/4} floats, got ${$.length}`);let Q=(K)=>U0.fields[K].offset/4;for(let K of v1){let j=J[K];if(typeof j==="number")$[Q(K)]=j;else $.set(j,Q(K))}$.set(I0(J.waterSurface),Q("waterSurfaceColor")),$.set(I0(J.waterHighlight),Q("waterHighlightColor")),$.set(I0(J.causticTint),Q("causticTint")),$.set(I0(J.foamColorHex),Q("foamColor"));let Z=R7(I0(J.waterDeep),J.depthColorDistance,NY);$.set(Z.extinction,Q("extinction"));$.set(Z.scatter,Q("scatterR"));$[Q("murkExtinction")]=AJ(J.surfaceOpacity,J.depthColorDistance);let q=I0(J.emissiveHex),Y=Math.fround(J.emissiveIntensity);for(let K=0;K<3;K++)$[Q("emissiveColor")+K]=Math.fround(q[K])*Y;$[Q("crestWaveSignalScale")]=f2(J.waveIntensity);$[Q("detailNormalMix")]=J.detailNormalEnabled?1:0;$[Q("depthPipelineMix")]=J.depthPipelineEnabled?1:0;$[Q("causticsMix")]=J.causticsEnabled?1:0;$[Q("shoreFoamMix")]=J.shoreFoamEnabled&&J.depthPipelineEnabled?1:0;$[Q("crestFoamMix")]=J.crestFoamEnabled?1:0;$[Q("refractionMix")]=J.refractionEnabled?1:0;$[Q("channelFrame")]=J.channelFrame?1:0;$[Q("shoreBodyScale")]=TJ(J.surfaceOpacity,J.shoreBodyScale);let X=Math.max(J.foamScale,0.05);if($[Q("foamScale")]=X,$[Q("foamFootprintScale")]=0.12/X,$[Q("foamMassScale")]=X*0.8,$.set(J.channelLoop??[0,0],Q("channelLoop")),$.fill(0,Q("meetLine"),U0.byteSize/4),J.riverMeet)$.set(J.riverMeet,Q("meetLine"));return $}var B$=($,J)=>$.loop===!0?`, ${J}`:"";function V8($,J,Q=!1,Z=!1,q=!1){let Y={depthPipelineEnabled:$.depthPipelineEnabled,shoreFoamEnabled:$.depthPipelineEnabled,refractionEnabled:$.refractionEnabled,causticClass:J,channelFrame:$.channelFrame};if($.transparent&&!$.depthWrite)Y.blended=!0;if(Q&&$.refractionEnabled)Y.refractionCut=!0;if(q)Y.stillCut=!0;if(Z)Y.compatibility=!0;if(($.channelLoop?.[1]??0)>0)Y.loop=!0;return Y}var j$=($)=>$.refractionEnabled&&$.refractionCut!==!0;function R1($){switch($){case"refracted":case"worley2":return 6;case"worley1":return 3;default:return 0}}var h1=[0.1,0.22,0.37,0.55,0.76,1];function E1($){return $==="worley1-unshadowed"?0:2}function f1($){return $==="refracted"||$==="worley2"}function l2($,J){let Q=h1.slice(0,$);return{fractions:Q,table:Q.map((Z,q)=>`vec2<f32>(${F(Z)}, ${F(q===0?0:J((q-1)/$))})`).join(", ")}}var _1=4,w1=16,g1=0.7,u1=0.25,m1=0.4,p1=0.55,c1=0.6,d1=0.02,e7=0.1,n2=0.3,n6=`smoothstep(${F(e7)}, ${F(n2)}, localFlowSpeed)`,l1=0.45,n1=1.5;function i1($){switch($){case"refracted":case"worley2":return{line:0,inner:4,outer:8};case"worley1":return{line:0,inner:0,outer:4};default:return{line:0,inner:0,outer:4}}}var u6=[[1,0],[-1,0],[0,1],[0,-1],[Math.SQRT1_2,Math.SQRT1_2],[-Math.SQRT1_2,Math.SQRT1_2],[Math.SQRT1_2,-Math.SQRT1_2],[-Math.SQRT1_2,-Math.SQRT1_2]],X2=0.6,a1=0.3,t1=0.4,s1=2,o1=1,K2=0.5,r1=0.96,j2=0.9,e1=0.68,$Y=0.3,m6=0.2,V2=0.65,JY=0.55,QY=12,ZY=0.64,z2=2,B2=12,U2=1.5,qY=4,i6=2,H2=0.1,a6=1,YY=3,XY=0.7,KY=0.04,jY=0.25,VY=0.1,zY=0.15,BY=0.02,M2=0.35,z8=1.333,UY=0.35,HY=0.25,V9=0.5,MY=0.9,GY=0.02,FY=0.2,t6="water.foamStrength > 0.001 || fallFoam > 0.001",DY=0.7,CY=0.5,kY=0.07,WY=7.5,NY=0.5,G2=0.22,OY=0.025,n0=[[-0.125,-0.375],[0.375,-0.125],[0.125,0.375],[-0.375,0.125]],s6=[[-1.15,-0.32],[-0.32,1.15],[1.15,0.32],[0.32,-1.15]],bY=0.7666666666666666,xY=24,F2=0.25,PY=5,n7=200,yY=0.08,TY=3,AY=2,p6="1e30",IY=Object.freeze({refracted:Object.freeze({rays:4,steps:xY,refineSteps:PY,silhouetteProbes:TY,silhouetteRefineSteps:AY}),worley2:Object.freeze({rays:1,steps:12,refineSteps:4,silhouetteProbes:3,silhouetteRefineSteps:2}),worley1:Object.freeze({rays:1,steps:8,refineSteps:3,silhouetteProbes:2,silhouetteRefineSteps:1}),"worley1-unshadowed":null});function k$($){return (IY[($.causticClass)])}var e$="water_mirrorCut",i2=Object.freeze({[e$]:1});function a2($){return k$($)?.rays===4&&$.compatibility!==!0}function SY(a){return (SY=$c0C(1)).call(this,a)}function K7($){return (IY[$])!==null}function LY(){return`
    let causticDrift = waterDraw.arena.yz * (time * (0.05 + water.flowSpeed * 0.4));
    let causticP = causticSurfaceXZ * (water.causticScale * 1.7) - causticDrift;
    causticPattern = water.causticTint * (water_causticsPrepared(causticP, time * 0.6, causticSurfaceDx, causticSurfaceDy) * ${F(X9)});`}var vY=28,RY=`struct WaterDraw {
  model: mat4x4<f32>,
  anchor: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
}`,W$=vY,h0=W$+4,N$=h0+12,t2=-1,z9=N$+4,s0=z9+4,W0=s0+4,O$=W0+4,j7=O$+4,U8=2,hY=RY.replace(`
}`,`
  fade: vec4<f32>,
  sheetOrigin: vec4<f32>,
  sheetU: vec4<f32>,
  sheetV: vec4<f32>,
  sheetLattice: vec4<f32>,
  bound: vec4<f32>,
  coast: vec4<f32>,
  words: vec4<f32>,
  arena: vec4<f32>,
}`),k0=64,b$=j7/4,a0=4096,s2=16777216,t0=8388608,$7=10,o2=2**(31-$7),D2=R+1,o6=[["anchor",4],["clipPlane",5],["clipPlane2",6],["fade",7],["sheetOrigin",8],["sheetU",9],["sheetV",10],["sheetLattice",11],["bound",12],["coast",13],["words",14],["arena",15]],r6=($,J)=>`  waterDraw.${$} = water_rowTexel(slot, ${J}u);`,r2="  waterDraw.model = mat4x4<f32>(water_rowTexel(slot, 0u), water_rowTexel(slot, 1u), water_rowTexel(slot, 2u), water_rowTexel(slot, 3u));",C2=new Set(["anchor","fade","bound"]),B9=`${hY}
var<private> waterDraw: WaterDraw;
fn water_rowTexel(slot: u32, texel: u32) -> vec4<f32> {
  return textureLoad(waterRows, vec2<u32>((slot % ${k0}u) * ${b$}u + texel, slot / ${k0}u), 0);
}
fn water_cullRow(slot: u32) {
${r2}
${o6.filter(([$])=>C2.has($)).map(([$,J])=>r6($,J)).join(`
`)}
}
fn water_restOfRow(slot: u32) {
${o6.filter(([$])=>!C2.has($)).map(([$,J])=>r6($,J)).join(`
`)}
}
fn water_arenaTexel(at: u32) -> vec2<u32> {
  return vec2<u32>(at % ${a0}u, at / ${a0}u);
}
struct WaterArenaVertex {
  position: vec3<f32>,
  channel: vec2<f32>,
}
fn water_arenaVertex(local: u32) -> WaterArenaVertex {
  let channel = (u32(waterDraw.arena.w) & ${U8}u) != 0u;
  let at = u32(waterDraw.arena.x) + local * select(1u, 2u, channel);
  var vertex: WaterArenaVertex;
  vertex.position = bitcast<vec3<f32>>(textureLoad(waterVertices, water_arenaTexel(at), 0).xyz);
  if (channel) { vertex.channel = bitcast<vec2<f32>>(textureLoad(waterVertices, water_arenaTexel(at + 1u), 0).xy); }
  return vertex;
}`;function e2($){let J=[],Q=$.replace(B9,"");if(/(?<![\w])waterDraw\.model\b/.test(Q))J.push(r2);for(let[Z,q]of o6)if(new RegExp(`(?<![\\w])waterDraw\\.${Z}\\b`).test(Q))J.push(r6(Z,q));return`fn water_fragmentRow(slot: u32) {
${J.join(`
`)}
}`}var $4=()=>($4=$c0C(2))(),U9=0,H9=1,M9=3,G9=4,F9=6,J7=`struct WaterVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) positionWorld: vec3<f32>,
  @location(1) waveBase: vec2<f32>,
  @location(2) waveHeight: f32,
  @location(3) farClamp: f32,
  @location(4) channel: vec2<f32>,
  @location(5) positionRender: vec3<f32>,
  @location(6) restRender: f32,
  @location(7) @interpolate(flat) slot: u32,
  @location(8) clipDistances: vec2<f32>,
  @location(9) sourcePositionRender: vec3<f32>,
}`;function J4($=!1,J=`fn water_surfaceVertex(position: vec3<f32>, channel: vec2<f32>) -> WaterVaryings {
  let anchorBase = (waterDraw.model * vec4<f32>(position, 1.0)).xyz;
  let renderBase = anchorBase + (waterDraw.anchor.xyz - frame.sourceOrigin);
  let worldBase = anchorBase + waterDraw.anchor.xyz;
  let seaHeld = waterDraw.fade.z > 0.0 && waterDraw.sheetOrigin.w <= 0.0 && (bitcast<u32>(position.x) & bitcast<u32>(position.z) & 1u) == 0u;
  let meetHeld = waterDraw.sheetOrigin.w < 0.0 && (bitcast<u32>(position.y) & 1u) == 1u;
  let carry = select(1.0, 0.0, seaHeld || meetHeld);
  let lift = water.waveHeightScale * carry;
  let wave = water_gerstnerLift(worldBase.xz, frame.worldTime, water.waveIntensity, water.waveFrequency, waterDraw.arena.yz, water_extent(waterDraw.coast.zw));
  var displaced = vec3<f32>(worldBase.x + wave.x * lift, worldBase.y + water.surfaceYOffset + wave.y * lift, worldBase.z + wave.z * lift);
  if (water.swellAmplitude > 0.0) {
    let sw = water_swellLift(worldBase.xz, frame.worldTime, water.swellAmplitude, water.swellDirection, waterDraw.coast.xy, waterDraw.coast.zw, water.surfWidth, water_gridFarFade());
    displaced = displaced + sw * lift;
  }
  let edge = water_coastDistance(worldBase.xz, waterDraw.coast.xy, waterDraw.coast.zw);
  let contained = water_containHorizontal(displaced.xz - worldBase.xz, edge);
  displaced = vec3<f32>(worldBase.x + contained.x, displaced.y, worldBase.z + contained.y);
  let sourcePositionRender = renderBase + (displaced - worldBase);
  var positionRender = sourcePositionRender;
  if (frame.guest != 0.0) { positionRender = (frame.guestMap * vec4<f32>(positionRender, 1.0)).xyz; }
  var out: WaterVaryings;
  out.position = frame.viewProj * vec4<f32>(positionRender, 1.0);
  out.positionWorld = displaced;
  out.positionRender = positionRender;
  out.sourcePositionRender = sourcePositionRender;
  let anchorPosition = anchorBase + (displaced - worldBase);
  let clipA = dot(waterDraw.clipPlane.xyz, anchorPosition) + waterDraw.clipPlane.w;
  let clipB = dot(waterDraw.clipPlane2.xyz, anchorPosition) + waterDraw.clipPlane2.w;
  out.clipDistances = select(vec2<f32>(clipA, clipB), vec2<f32>(1.0), frame.guest != 0.0);

  out.waveBase = worldBase.xz;
  out.waveHeight = wave.y * carry;
  out.restRender = renderBase.y + water.surfaceYOffset;
  out.channel = channel;
  return out;
}`){if(!$)return J;let Q=J.indexOf("  let anchorBase"),Z=J.indexOf("  var out: WaterVaryings;");return`${`fn water_previousPosition(position: vec3<f32>) -> vec3<f32> {
${J.slice(Q,Z).replaceAll("waterDraw.","previousWaterDraw.").replaceAll("frame.worldTime","frame.prevWorldTime")}
  return positionRender;
}`}
${J.replace("  out.positionWorld = displaced;",`  out.currentClip = out.position;
  out.previousClip = select(out.currentClip, frame.prevViewProj * vec4<f32>(water_previousPosition(position), 1.0), previousWaterDraw.clipPlane.w > 0.5);
  out.positionWorld = displaced;`)}`}var Q4=J4(),i7=q0/2,k2=0.001,G$=16,Z4=5,x$=2**(G$+Z4),H8=2*x$,EY=`fn water_gridCentre(eyeUnits: vec2<f32>, anchor: vec2<i32>, span: i32) -> vec2<i32> {
  let rest = anchor & vec2<i32>(span - 1i);
  return vec2<i32>(round((eyeUnits + vec2<f32>(rest)) / f32(span))) * span - rest;
}
fn water_gridFarFirst(k: i32, eye: i32, lo: i32, hi: i32) -> i32 {
  let below = eye - lo;
  let above = hi - eye;
  let pair = min(below, above);
  let j = k - abs(below - above);
  let d = pair - (j >> 1u);
  return select(select(select(eye + d, eye - d, (j & 1i) == 0i), eye, j >= 2i * pair), select(hi - k, lo + k, below > above), j < 0i);
}
fn water_gridClipSides(clip: vec4<f32>) -> vec4<bool> {
  return vec4<bool>((clip.x < -clip.w), (clip.x > clip.w), (clip.y < -clip.w), (clip.y > clip.w));
}
fn water_gridOutside(origin: vec3<f32>, uHat: vec3<f32>, vHat: vec3<f32>, lo: vec2<f32>, hi: vec2<f32>, reach: f32) -> bool {
  var low = origin + uHat * lo.x + vHat * lo.y - vec3<f32>(0.0, reach, 0.0);
  var edgeU = uHat * (hi.x - lo.x);
  var edgeV = vHat * (hi.y - lo.y);
  var edgeY = vec3<f32>(0.0, 2.0 * reach, 0.0);
  if (frame.guest != 0.0) {
    let turn = mat3x3<f32>(frame.guestMap[0].xyz, frame.guestMap[1].xyz, frame.guestMap[2].xyz);
    low = (frame.guestMap * vec4<f32>(low, 1.0)).xyz;
    edgeU = turn * edgeU;
    edgeV = turn * edgeV;
    edgeY = turn * edgeY;
  }
  let c000 = frame.viewProj * vec4<f32>(low, 1.0);
  let du = frame.viewProj[0] * edgeU.x + frame.viewProj[1] * edgeU.y + frame.viewProj[2] * edgeU.z;
  let dv = frame.viewProj[0] * edgeV.x + frame.viewProj[1] * edgeV.y + frame.viewProj[2] * edgeV.z;
  let dy = frame.viewProj[0] * edgeY.x + frame.viewProj[1] * edgeY.y + frame.viewProj[2] * edgeY.z;
  let c100 = c000 + du;
  let c010 = c000 + dv;
  let c110 = c100 + dv;
  let c001 = c000 + dy;
  let c101 = c100 + dy;
  let c011 = c010 + dy;
  let c111 = c110 + dy;
  let outside = water_gridClipSides(c000) & water_gridClipSides(c100) & water_gridClipSides(c010) & water_gridClipSides(c110) & water_gridClipSides(c001) & water_gridClipSides(c101) & water_gridClipSides(c011) & water_gridClipSides(c111);
  let behind = vec4<bool>((c000.z > c000.w), (c100.z > c100.w), (c010.z > c010.w), (c110.z > c110.w)) & vec4<bool>((c001.z > c001.w), (c101.z > c101.w), (c011.z > c011.w), (c111.z > c111.w));
  return any(outside) || all(behind);
}
fn water_gridPoint(corner: vec3<f32>, instance: u32, slot: u32) -> vec4<f32> {
  let sigma0 = waterDraw.sheetOrigin.w;
  let uRender = (waterDraw.model * vec4<f32>(waterDraw.sheetU.xyz, 0.0)).xyz;
  let vRender = (waterDraw.model * vec4<f32>(waterDraw.sheetV.xyz, 0.0)).xyz;
  let lengths = vec2<f32>(length(uRender), length(vRender));
  let uHat = uRender / lengths.x;
  let vHat = vRender / lengths.y;
  let origin = (waterDraw.model * vec4<f32>(waterDraw.sheetOrigin.xyz, 1.0)).xyz + (waterDraw.anchor.xyz - frame.sourceOrigin);
  let toEye = water_sourceRender(frame.cameraPosition) - origin;
  let shear = dot(uHat, vHat);
  let det = max(1.0 - shear * shear, 1e-6);
  let along = vec2<f32>(dot(toEye, uHat), dot(toEye, vHat));
  let eye = (along - shear * along.yx) / det;
  var height = abs(dot(toEye, normalize(cross(uHat, vHat))));
  if (frame.proj[3][3] > 0.5) { height = max(height, 2.0 / max(abs(frame.proj[1][1]), 1e-6)); }
  let patch0 = ${F(R)} * sigma0;
  let innermost = i32(max(0.0, ceil(log2(max(height, 1e-6) / (${F(Z7)} * patch0))) - 1.0));
  let anchor = vec2<i32>(waterDraw.sheetLattice.xy);
  let phase = waterDraw.sheetLattice.zw;
  let eyeUnits = eye / sigma0 + phase;
  let sheetEnd = phase + lengths / sigma0;
  let reach = waterDraw.sheetU.w;
  let flatLevel = i32(waterDraw.sheetV.w);
  var low = phase;
  var high = sheetEnd;
  if ((instance & ${x$}u) != 0u) {
    let window = textureLoad(waterWindows, vec2<u32>(slot % ${k0}u, slot / ${k0}u), 0);
    low = max(phase, phase + window.xy / sigma0);
    high = min(sheetEnd, phase + window.zw / sigma0);
  }
  let fan = (instance & ${H8}u) != 0u;
  var rest = i32(instance & ${(1<<G$)-1}u);
  var level = i32((instance >> ${G$}u) & ${2**Z4-1}u);
  var block = vec2<i32>(0i);
  var firstPatch = vec2<i32>(0i);
  var count = vec2<i32>(0i);
  loop {
    if (level < innermost || (fan && level < flatLevel)) { return vec4<f32>(0.0); }
    let levelSpan = ${R}i << u32(level);
    block = water_gridCentre(eyeUnits, anchor, 2i * levelSpan) - vec2<i32>(${i7}i * levelSpan);
    firstPatch = clamp(vec2<i32>(floor((low - vec2<f32>(block)) / f32(levelSpan))), vec2<i32>(0i), vec2<i32>(${q0}i));
    let endPatch = clamp(vec2<i32>(ceil((high - vec2<f32>(block)) / f32(levelSpan))), vec2<i32>(0i), vec2<i32>(${q0}i));
    count = select(max(endPatch - firstPatch, vec2<i32>(0i)), vec2<i32>(0i), any(high < low));
    if (rest < count.x * count.y) { break; }
    rest = rest - count.x * count.y;
    level = level - 1i;
  }
  let step = 1i << u32(level);
  let span = ${R}i * step;
  let eyePatch = clamp(vec2<i32>(floor((eyeUnits - vec2<f32>(block)) / f32(span))), vec2<i32>(0i), vec2<i32>(${q0-1}i));
  let first = block + vec2<i32>(water_gridFarFirst(rest % count.x, eyePatch.x, firstPatch.x, firstPatch.x + count.x - 1i), water_gridFarFirst(rest / count.x, eyePatch.y, firstPatch.y, firstPatch.y + count.y - 1i)) * span;
  let hole = water_gridCentre(eyeUnits, anchor, span) - vec2<i32>(${i7/2}i * span);
  let holeEnd = hole + vec2<i32>(${i7}i * span);
  if (level > innermost && all(first >= hole) && all(first < holeEnd)) { return vec4<f32>(0.0); }
  let lo = clamp((vec2<f32>(first) - phase) * sigma0, vec2<f32>(0.0), lengths);
  let hi = clamp((vec2<f32>(first + vec2<i32>(span)) - phase) * sigma0, vec2<f32>(0.0), lengths);
  if (any(hi <= lo) || water_gridOutside(origin, uHat, vHat, lo - vec2<f32>(reach), hi + vec2<f32>(reach), reach)) { return vec4<f32>(0.0); }
  let offset = vec2<f32>(first) + vec2<f32>(0.5 * f32(span)) - eyeUnits;
  let walk = select(corner.xy, corner.yx, abs(offset.x) > abs(offset.y));
  let quad = select(walk, vec2<f32>(${R}.0) - walk, offset > vec2<f32>(0.0));
  var ab = vec2<f32>(0.0);
  if (level >= flatLevel) {
    let meets = select(${R/2}.0, 1.0, level == flatLevel);
    let alongY = level > innermost && first.y >= hole.y && first.y < holeEnd.y;
    let alongX = level > innermost && first.x >= hole.x && first.x < holeEnd.x;
    var keep = select(vec4<f32>(${R}.0), vec4<f32>(meets), vec4<bool>(alongY && first.x == holeEnd.x, alongY && first.x + span == hole.x, alongX && first.y == holeEnd.y, alongX && first.y + span == hole.y));
    let lowOut = vec2<f32>(first) < phase - vec2<f32>(${F(k2)});
    let highOut = vec2<f32>(first + vec2<i32>(span)) > sheetEnd + vec2<f32>(${F(k2)});
    keep = select(keep, vec4<f32>(${R}.0), vec4<bool>(lowOut.x, highOut.x, lowOut.y, highOut.y));
    let onX = quad.x == 0.0 || quad.x == ${R}.0;
    let onY = quad.y == 0.0 || quad.y == ${R}.0;
    var q = quad;
    if (onX && !onY) {
      let k = select(keep.y, keep.x, quad.x == 0.0);
      q.y = min(floor((quad.y + 0.5 * k) / k) * k, ${R}.0);
    }
    if (onY && !onX) {
      let k = select(keep.w, keep.z, quad.y == 0.0);
      q.x = min(floor((quad.x + 0.5 * k) / k) * k, ${R}.0);
    }
    ab = 0.5 * (lo + hi);
    if (onX || onY) { ab = clamp((vec2<f32>(first + vec2<i32>(q) * step) - phase) * sigma0, vec2<f32>(0.0), lengths); }
  } else {
    let lattice = first + vec2<i32>(quad) * step;
    let point = clamp((vec2<f32>(lattice) - phase) * sigma0, vec2<f32>(0.0), lengths);
    let patchMetres = f32(span) * sigma0;
    let near = max(max(abs(point.x - eye.x), abs(point.y - eye.y)), height);
    let morph = clamp((near - ${F(o7)} * patchMetres) / (${F(r7)} * patchMetres), 0.0, 1.0);
    let odd = vec2<f32>(((lattice + anchor) >> vec2<u32>(u32(level))) & vec2<i32>(1i));
    ab = clamp(((vec2<f32>(lattice) - odd * (f32(step) * morph)) - phase) * sigma0, vec2<f32>(0.0), lengths);
  }
  let far = max(max(max(abs(ab.x - eye.x), abs(ab.y - eye.y)), height), 1e-6);
  let band = floor(max(log2(far / (${F((i7-1)/2)} * patch0)), 0.0));
  let bandPatch = patch0 * exp2(band);
  water_gridSigma = sigma0 * exp2(band) * (1.0 + clamp((far - ${F(o7)} * bandPatch) / (${F(r7)} * bandPatch), 0.0, 1.0));
  let local = waterDraw.sheetOrigin.xyz + waterDraw.sheetU.xyz * (ab.x / lengths.x) + waterDraw.sheetV.xyz * (ab.y / lengths.y);
  return vec4<f32>(local, 1.0);
}`,fY,_Y,wY=`fn water_pastFar(v: WaterVaryings, position: vec3<f32>) -> WaterVaryings {
  var out = v;
  out.farClamp = 0.0;
  let openSea = waterDraw.fade.z > 0.0 && (bitcast<u32>(position.x) & 1u) == 1u;
  if (openSea && frame.guest == 0.0 && out.position.w > 0.0 && out.position.z < ${_} * out.position.w && textureDimensions(waterSceneDepthTex).x > 1u) {
    out.position.z = ${_} * out.position.w;
    out.farClamp = 1.0;
  }
  return out;
}`,gY=`@group(3) @binding(${H9}) var<storage, read> waterPriorRows: array<WaterDraw>;
@group(3) @binding(${F9}) var<uniform> waterMotionWord: vec4<f32>;
var<private> previousWaterDraw: WaterDraw;
fn water_priorRow(slot: u32) {
  if (waterMotionWord.x > 0.5) {
    previousWaterDraw = waterDraw;
  } else {
    previousWaterDraw = waterPriorRows[slot];
  }
}`,uY=(...a)=>(uY=$c0C(5))(...a),q4=`fn water_sourceAnchor() -> vec3<f32> {
  return select(lume_eyeAnchor(), vec3<f32>(0.0), frame.guest != 0.0);
}
fn water_guestDirection(v: vec3<f32>) -> vec3<f32> {
  if (frame.guest != 0.0) { return (frame.guestMap * vec4<f32>(v, 0.0)).xyz; }
  return v;
}
fn water_sourceDirection(v: vec3<f32>) -> vec3<f32> {
  if (frame.guest != 0.0) { return transpose(mat3x3<f32>(frame.guestMap[0].xyz, frame.guestMap[1].xyz, frame.guestMap[2].xyz)) * v; }
  return v;
}
fn water_sourceRender(v: vec3<f32>) -> vec3<f32> {
  if (frame.guest != 0.0) { return water_sourceDirection(v - frame.guestMap[3].xyz); }
  return v;
}
fn water_sceneDepth(uv: vec2<f32>) -> f32 {
  return textureSampleLevel(waterSceneDepthTex, waterPointSampler, uv, 0.0).r;
}

fn water_renderFromUvDepth(uv: vec2<f32>, depth: f32) -> vec3<f32> {
  let ndc = vec4<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, depth, 1.0);
  let render = frame.inverseViewProj * ndc;
  return render.xyz / max(render.w, 1e-6);
}
fn water_worldFromUvDepth(uv: vec2<f32>, depth: f32) -> vec3<f32> {
  return water_sourceRender(water_renderFromUvDepth(uv, depth)) + frame.sourceOrigin;
}

fn water_clipOf(render: vec3<f32>) -> vec4<f32> {
  return frame.viewProj * vec4<f32>(render, 1.0);
}
fn water_pastFarHidden(farClamp: f32, pixel: vec2<f32>, render: vec3<f32>) -> bool {
  if (farClamp <= 0.0) { return false; }
  let clip = water_clipOf(render);
  return water_sceneDepth(pixel / frame.viewportSize) > max(clip.z / max(clip.w, 1e-6), ${_});
}
fn water_eye() -> vec3<f32> {
  return water_sourceRender(frame.cameraPosition) + frame.sourceOrigin;
}
fn water_tapStands(sceneXZ: vec2<f32>, tapXZ: vec2<f32>, reach: f32) -> f32 {
  let tapDistance = length(tapXZ - water_eye().xz);
  let tolerance = max(${F(i6)} * reach, ${F(H2)} * tapDistance);
  return 1.0 - smoothstep(tolerance, 2.0 * tolerance, length(sceneXZ - tapXZ));
}
fn water_tapClip(surfaceClip: vec4<f32>, tapOffset: vec2<f32>, rise: f32) -> vec4<f32> {
  return surfaceClip + frame.viewProj * vec4<f32>(water_guestDirection(vec3<f32>(tapOffset.x, rise, tapOffset.y)), 0.0);
}
fn water_channelRise(channel: WaterChannelTap, tapOffset: vec2<f32>) -> f32 {
  if (channel.last < 1.0) {
    return 0.0;
  }
  return (water_channelSample(channel.last, channel.at.x + dot(channel.at.yz, tapOffset)) - channel.at.w) * waterDraw.model[1].y;
}
fn water_tapUV(clip: vec4<f32>) -> vec2<f32> {
  return (clip.xy / max(clip.w, 1e-4)) * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
}
fn water_tapOn(clip: vec4<f32>) -> f32 {
  let uv = water_tapUV(clip);
  return select(0.0, 1.0, clip.w > 0.0 && all(uv >= vec2<f32>(0.0)) && all(uv <= vec2<f32>(1.0)));
}
fn water_tapScene(clip: vec4<f32>) -> vec4<f32> {
  let uv = water_tapUV(clip);
  let depth = water_sceneDepth(clamp(uv, vec2<f32>(0.0), vec2<f32>(1.0)));
  return vec4<f32>(water_worldFromUvDepth(uv, depth), select(0.0, 1.0, depth > ${_}) * water_tapOn(clip));
}
fn water_wakeObstacle(surfacePos: vec3<f32>, surfaceClip: vec4<f32>, tapOffset: vec2<f32>, channel: WaterChannelTap) -> f32 {
  let rise = water_channelRise(channel, tapOffset);
  let scene = water_tapScene(water_tapClip(surfaceClip, tapOffset, rise));
  let column = surfacePos.y + rise - scene.y;
  let obstacle = 1.0 - smoothstep(0.0, ${F(l1)}, column);
  let notOccluder = select(0.0, 1.0, column > -${F(n1)});
  let stands = water_tapStands(scene.xz, surfacePos.xz + tapOffset, ${F(a6/i6)});
  let found = obstacle * notOccluder * stands * scene.w;
  if (found <= 0.0) { return found; }
  return found * (1.0 - water_rippleVeto(scene.xz, surfacePos.xz + tapOffset));
}
fn water_bowObstacle(surfacePos: vec3<f32>, surfaceClip: vec4<f32>, tapOffset: vec2<f32>, channel: WaterChannelTap) -> f32 {
  let tap = water_wakeObstacle(surfacePos, surfaceClip, tapOffset, channel);
  if (tap <= 0.0) {
    return 0.0;
  }
  let eyeToTap = surfacePos.xz + tapOffset - water_eye().xz;
  let across = vec2<f32>(-eyeToTap.y, eyeToTap.x) * (${F(c1)} / max(length(eyeToTap), 1e-4));
  var found = 0.0;
  for (var side = 0u; side < 2u; side = side + 1u) {
    found = max(found, water_wakeObstacle(surfacePos, surfaceClip, tapOffset + select(across, -across, side == 1u), channel));
  }
  return tap * max(found, max(water_tapOffScreen(surfaceClip, tapOffset + across, channel), water_tapOffScreen(surfaceClip, tapOffset - across, channel)));
}
fn water_tapOffScreen(surfaceClip: vec4<f32>, tapOffset: vec2<f32>, channel: WaterChannelTap) -> f32 {
  return 1.0 - water_tapOn(water_tapClip(surfaceClip, tapOffset, water_channelRise(channel, tapOffset)));
}
fn water_bodyTap(surfacePos: vec3<f32>, surfaceClip: vec4<f32>, restY: f32, tapOffset: vec2<f32>, reach: f32, valid: f32) -> vec2<f32> {
  let scene = water_tapScene(water_tapClip(surfaceClip, tapOffset, 0.0));
  let column = restY - scene.y;
  let tapPoint = vec3<f32>(surfacePos.x + tapOffset.x, surfacePos.y, surfacePos.z + tapOffset.y);
  let before = select(0.0, 1.0, length(scene.xyz - water_eye()) < length(tapPoint - water_eye()) - 0.01);
  let body = select(0.0, 1.0, column > -${F(X2)}) * before;
  let stands = water_tapStands(scene.xz, surfacePos.xz + tapOffset, reach);
  let weight = body * stands * scene.w * valid;
  return vec2<f32>(weight, length(scene.xz - surfacePos.xz));
}
fn water_bodyMoverOnFlow(surfacePos: vec3<f32>, bow: vec2<f32>, wake: vec2<f32>) -> f32 {
  let eye = water_eye();
  let run = length(surfacePos.xz - eye.xz);
  let toward = min(${F(X2)} * run / max(eye.y - surfacePos.y, 1e-3), 2.0 * max(${F(a6)}, ${F(H2)} * (run + length(wake))));
  return water_rippleMoverCrossed(surfacePos.xz + bow, wake - bow, (surfacePos.xz - eye.xz) * (toward / max(run, 1e-3)));
}`,mY=`
fn water_quadMirror(own: vec4<f32>, odd: vec2<bool>) -> vec4<f32> {
  let row = own + (own + select(1.0, -1.0, odd.x) * dpdxFine(own));
  let sum = row + (row + select(1.0, -1.0, odd.y) * dpdyFine(row));
  return vec4<f32>(sum.rgb / max(sum.a, 1e-4), sum.a * 0.25);
}`;function pY($,J){return`${u2.trim()}

fn water_ssrBehindAt(uv: vec2<f32>, rayDepth: f32, sceneDepth: f32) -> f32 {
  let drawn = sceneDepth > ${_};
  return select(-1e9, viewZFromDepth(rayDepth, uv) - viewZFromDepth(sceneDepth, uv), drawn);
}
fn water_ssrIsBehind(rayDepth: f32, sceneDepth: f32) -> bool {
  return sceneDepth > ${_} && frame.proj[3].z * (sceneDepth - rayDepth) > 0.0;
}
fn water_ssrStays(uv: vec2<f32>, rayDepth: f32, hitSceneZ: f32, thickness: f32) -> bool {
  let at = clamp(uv, vec2<f32>(0.0), vec2<f32>(1.0));
  let sceneDepth = water_sceneDepth(at);
  return sceneDepth > ${_} && viewZFromDepth(sceneDepth, at) < max(hitSceneZ, viewZFromDepth(rayDepth, uv)) + thickness;
}
struct WaterSceneMirrorHit {
  colour: vec3<f32>,
  weight: f32,
  distance: f32,
}
${J?mY:""}${$.rays>1?`
override ${e$}: bool = false;`:""}
fn water_sceneMirrorHit(surfaceRender: vec3<f32>, N: vec3<f32>, sheetN: vec3<f32>, V: vec3<f32>, raySpread: f32, side: f32) -> WaterSceneMirrorHit {
  var D = reflect(-V, N);
  D.y = abs(D.y) * side;
  let eyeSheet = dot(V, sheetN);
  let c0 = water_clipOf(surfaceRender);
  var c1 = water_clipOf(surfaceRender + D * ${F(n7)});
  let wMin = 0.05;
  var share = 1.0;
  if (c1.w < wMin) {
    share = (c0.w - wMin) / max(c0.w - c1.w, 1e-6);
    c1 = mix(c0, c1, share);
  }
  let h0 = c0.xyz / max(c0.w, 1e-6);
  let h1 = c1.xyz / max(c1.w, wMin);
  let uv0 = h0.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
  let uv1 = h1.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
  let duv = uv1 - uv0;
  let edgeDen = select(vec2<f32>(1.0), duv, abs(duv) > vec2<f32>(1e-6));
  let toEdgeX = select(select(1.0, (1.0 - uv0.x) / edgeDen.x, duv.x > 1e-6), -uv0.x / edgeDen.x, duv.x < -1e-6);
  let toEdgeY = select(select(1.0, (1.0 - uv0.y) / edgeDen.y, duv.y > 1e-6), -uv0.y / edgeDen.y, duv.y < -1e-6);
  let tMax = clamp(min(min(toEdgeX, toEdgeY), 1.0), 0.0, 1.0);
  let dz = h1.z - h0.z;
  var tPrev = 0.0;
  var behindPrev = false;
  var sceneDepthPrev = ${_};
  var hiddenZ = ${p6};
  var hiddenT = 0.0;
  var hitT = -1.0;
  var hitBehind = 0.0;
  var hitSceneZ = 0.0;
  var hitThickness = 0.0;
  var reach = ${F(F2/n7)};
  for (var i = 0u; i < ${$.steps}u; i = i + 1u) {
    let s = select(min(reach / share, 1.0), 1.0, i + 1u == ${$.steps}u);
    let t = min(s * c1.w / mix(c0.w, c1.w, s), tMax);
    let uv = uv0 + duv * t;
    let rayDepth = h0.z + dz * t;
    let sceneDepth = water_sceneDepth(uv);
    let behind = water_ssrIsBehind(rayDepth, sceneDepth);
    if (behind && !behindPrev) {
      var lo = tPrev;
      var hi = t;
      var hiBehind = water_ssrBehindAt(uv, rayDepth, sceneDepth);
      var loDepth = sceneDepthPrev;
      for (var j = 0u; j < ${$.refineSteps}u; j = j + 1u) {
        let mid = 0.5 * (lo + hi);
        let midUv = uv0 + duv * mid;
        let midDepth = water_sceneDepth(midUv);
        let midBehind = water_ssrBehindAt(midUv, h0.z + dz * mid, midDepth);
        let inFront = midBehind <= 0.0;
        lo = select(lo, mid, inFront);
        hi = select(mid, hi, inFront);
        hiBehind = select(midBehind, hiBehind, inFront);
        loDepth = select(loDepth, midDepth, inFront);
      }
      let sceneZ = viewZFromDepth(h0.z + dz * hi, uv0 + duv * hi) - hiBehind;
      let thickness = screenMarchThickness(sceneZ);
      let frontBehind = viewZFromDepth(h0.z + dz * lo, uv0 + duv * lo) - sceneZ;
      if (frontBehind < thickness) {
        hitT = hi;
        hitBehind = max(frontBehind, 0.0) / thickness;
        hitSceneZ = sceneZ;
        hitThickness = thickness;
        break;
      }
      let hiddenUv = uv0 + duv * lo;
      let hiddenAt = water_renderFromUvDepth(hiddenUv, loDepth) - surfaceRender;
      if (loDepth > ${_} && hiddenAt.y * side > 0.0 && dot(hiddenAt, sheetN) * eyeSheet > 0.0) {
        hiddenZ = viewZFromDepth(loDepth, hiddenUv);
        hiddenT = lo;
      }
    }
    if (behind && hiddenZ < ${p6}) {
      if (viewZFromDepth(rayDepth, uv) >= hiddenZ) {
        hitT = hiddenT;
        hitBehind = 0.0;
        hitSceneZ = hiddenZ;
        hitThickness = screenMarchThickness(hiddenZ);
        break;
      }
    }
    hiddenZ = select(hiddenZ, ${p6}, !behind);
    behindPrev = behind;
    sceneDepthPrev = sceneDepth;
    tPrev = t;
    if (t >= tMax) {
      break;
    }
    reach = reach * ${F(Math.pow(n7/F2,1/($.steps-1)))};
  }
  if (hitT < 0.0) {
    return WaterSceneMirrorHit(vec3<f32>(0.0), 0.0, 0.0);
  }
  let uvHit = uv0 + duv * hitT;
  let colour = textureSampleLevel(waterSceneColorTex, waterClampSampler, clamp(uvHit, vec2<f32>(0.0), vec2<f32>(1.0)), 0.0).rgb;
  let texels = vec2<f32>(textureDimensions(waterSceneDepthTex));
  let pathTexels = duv * texels;
  let hitLength = hitT * c0.w / max(mix(c1.w, c0.w, hitT), 1e-6) * share * ${F(n7)};
  let spreadTexels = max(raySpread * hitLength / (c0.w - frame.proj[2][3] * hitLength) * 0.5 * frame.proj[1][1] * texels.y, 1.0);
  let spreadUv = pathTexels / max(length(pathTexels), 1e-6) * spreadTexels / texels;
  let spreadT = spreadTexels / max(length(pathTexels), 1e-6);
  var onLo = 0.0;
  var offHi = 1.0;
  var off = false;
  for (var k = 1u; k <= ${$.silhouetteProbes}u; k = k + 1u) {
    let f = f32(k) / ${$.silhouetteProbes}.0;
    if (!off) {
      let stays = water_ssrStays(uvHit + spreadUv * f, h0.z + dz * min(hitT + spreadT * f, 1.0), hitSceneZ, hitThickness);
      onLo = select(onLo, f, stays);
      offHi = select(f, offHi, stays);
      off = !stays;
    }
  }
  if (off) {
    for (var j = 0u; j < ${$.silhouetteRefineSteps}u; j = j + 1u) {
      let f = 0.5 * (onLo + offHi);
      let stays = water_ssrStays(uvHit + spreadUv * f, h0.z + dz * min(hitT + spreadT * f, 1.0), hitSceneZ, hitThickness);
      onLo = select(onLo, f, stays);
      offHi = select(f, offHi, stays);
    }
  }
  let silhouetteFade = select(1.0, 0.5 * (onLo + offHi), off);
  let border = min(min(uvHit.x, 1.0 - uvHit.x), min(uvHit.y, 1.0 - uvHit.y));
  let edgeFade = smoothstep(0.0, ${F(yY)}, border);
  let thicknessFade = 1.0 - smoothstep(0.5, 1.0, hitBehind);
  return WaterSceneMirrorHit(colour, edgeFade * thicknessFade * silhouetteFade, hitLength);
}`}function cY(a){return (cY=$c0C(6)).call(this,a)}function dY($){if(!$.depthPipelineEnabled||!$.shoreFoamEnabled||$.stillCut===!0)return"  let bodyFormation = 0.0;";let Q=i1($.causticClass);if(Q.outer===0)return"  let bodyFormation = 0.0;";let Z=E1($.causticClass);let q=(W,k)=>`water_bodyTap(in.positionWorld, surfaceClip, bodyRestY, ${W}, ${k}, frontFace)`;let {fractions:Y,table:X}=l2(Z,(W)=>(1-0.7*W)**2);let K=f1($.causticClass)?`
    if (flowTaps && max(max(bowFar, wakeSignal), outerHit) > 0.0) {
      bodyFlowTap = bodyFlowGate * (1.0 - water_bodyMoverOnFlow(in.positionWorld, bowWorld, wakeStepWorld * ${F(Y[Y.length-1]??0)}));
      bowFar = select(0.0, bowFar, bodyFlowTap > 0.0);
      wakeSignal = select(0.0, wakeSignal, bodyFlowTap > 0.0);
    }`:"";let j=(W)=>(j=$c0C(7))(W);let z=(W,k,O)=>`    var ${W}Ring = array<vec2<f32>, ${O}>(${u6.slice(0,O).map(([P,T])=>`vec2<f32>(${F(P*k)}, ${F(T*k)})`).join(", ")});`;let V=(W,k,O)=>(V=$c0C(8)(z,j,q))(W,k,O);let B=`    var bowNear = 0.0;
    var bowFar = 0.0;
    var wakeSignal = 0.0;
    var bowWorld = vec2<f32>(0.0, 0.0);`;let U=Math.min(Q.outer,u6.length);let H=Z>0&&U>0?`${B}
    var wakeStepWorld = vec2<f32>(0.0, 0.0);
    let flowTaps = water.flowSpeed > ${F(e7)};
    if (flowTaps) {
      bowWorld = flowT * (bodyReach * ${F(U2)} * bodyWave);
      let wakeLength = ${F(z2)} + ${F(B2)} * localFlowSpeed;
      wakeStepWorld = -flowT * wakeLength;
    }
${z("outer",1,U)}
    var wakeAlong = array<vec2<f32>, ${Z}>(${X});
    var wakeLast = 0.0;
    for (var outerAt = 0u; outerAt < select(${U}u, ${U+1+Z}u, flowTaps); outerAt = outerAt + 1u) {
      var tapOffset = bowWorld;
      var tapReach = bodyReach;
      if (outerAt < ${U}u) {
${j("outer")}
      } else if (outerAt > ${U}u) {
        let wake = wakeAlong[outerAt - ${U+1}u];
        tapOffset = wakeStepWorld * wake.x;
        tapReach = ${F(a6/i6)};
      }
      let ringTap = ${q("tapOffset","tapReach")};
      if (outerAt < ${U}u) {
        outerHit = max(outerHit, ringTap.x);
        bodyDistance = min(bodyDistance, select(bodyDistance, ringTap.y, ringTap.x > 0.0));
      } else if (outerAt == ${U}u) {
        bowFar = ringTap.x * bodyFlowGate;
      } else {
        let wakeAt = outerAt - ${U+1}u;
        if (wakeAt > 0u) {
          wakeSignal = max(wakeSignal, min(wakeLast, ringTap.x) * wakeAlong[wakeAt].y);
        }
        wakeLast = ringTap.x;
      }
    }
    if (flowTaps) {
      wakeSignal = wakeSignal * bodyFlowGate;
    }
    var bodyFlowTap = bodyFlowGate;${K}`:`${V("outer",1,U)}
${B}
    //`;let G=Math.min(Q.inner,u6.length);let D=Z>0&&G>0?`${z("inner",K2,G)}
    for (var innerAt = 0u; innerAt < ${G+1}u; innerAt = innerAt + 1u) {
      var tapOffset = bowWorld * 0.5;
      if (innerAt < ${G}u) {
${j("inner")}
      }
      let ringTap = ${q("tapOffset","bodyReach")};
      if (innerAt < ${G}u) {
        innerHit = max(innerHit, ringTap.x);
        bodyDistance = min(bodyDistance, select(bodyDistance, ringTap.y, ringTap.x > 0.0));
      } else {
        bowNear = ringTap.x * bodyFlowTap;
      }
    }`:`${V("inner",K2,G)}
${Z>0?`      bowNear = ${q("bowWorld * 0.5","bodyReach")}.x * bodyFlowTap;`:"      //"}`;let M=`bodyReach * ${F(1+m6)}`;let C=Z>0?`select(${M}, max(bodyReach * ${F(U2)} * ${F(1+m6)}, ${F(z2)} + ${F(B2)} * localFlowSpeed), water.flowSpeed > ${F(e7)})`:M;return`  
  var bodyFormation = 0.0;
  let bodyEnergy = max(smoothstep(0.08, 0.45, water.waveIntensity), ${n6});
  let bodyReach = mix(${F(a1)}, ${F(t1)}, bodyEnergy) * clamp(water.contactFoamWidth / 0.5, 0.05, 8.0);
  let bodyLod = smoothstep(${F(o1)}, ${F(s1)}, ${C} * frame.proj[1][1] * frame.viewportSize.y / (2.0 * max(viewZ, 0.05)));
  if (!(${S0}) && !(${g6}) && water.shoreFoamMix > 0.001 && water.foamStrength > 0.001 && water.shorelineFoamStrength > 0.001 && hasDepthHit > 0.5 && frontFace > 0.5 && bodyLod > 0.0) {
    let bodyFlowGate = ${n6};
    let bodyRestY = in.positionWorld.y - in.waveHeight * water.waveHeightScale;
    let surfaceClip = water_clipOf(in.positionRender);
    let bodyFlowVelocity = flowT * (localFlowSpeed * ${F(QY)});
    let bodyMoved = in.positionWorld.xz - bodyFlowVelocity * time;
    let bodyRot = vec2<f32>(cos(${F(V2)}), sin(${F(V2)}));
    let bodyDomain = vec2<f32>(bodyMoved.x * bodyRot.x - bodyMoved.y * bodyRot.y, bodyMoved.x * bodyRot.y + bodyMoved.y * bodyRot.x);
    let bodyWarpA = water_foamNoise(bodyDomain * ${F(JY)} + vec2<f32>(13.7, 5.1)${B$($,"0.0")}) - 0.5;
    let bodyAngle = (bodyWarpA + 0.5) * ${F(Q8)};
    let bodyCos = cos(bodyAngle);
    let bodySin = sin(bodyAngle);
    let bodyWave = 1.0 + bodyWarpA * ${F(2*m6)};
    var innerHit = 0.0;
    var outerHit = 0.0;
    var bodyDistance = bodyReach * 2.0;
${H}
    let bodyZone = clamp(max(max(outerHit, bowFar), wakeSignal * 4.0), 0.0, 1.0);
    if (bodyZone > 0.0) {
${D}
      let bodyD = bodyDistance / max(bodyReach, 1e-4);
      let bodyEdge = smoothstep(0.35, 1.0, bodyD);
      let bodyDenseAmount = mix(${F(e1)}, ${F(j2)}, bodyEnergy);
      let bodyRingAmount = mix(bodyDenseAmount, ${F($Y)}, bodyEdge) * clamp(max(outerHit, innerHit), 0.0, 1.0);
      let bodyContactFade = 1.0 - smoothstep(0.45, 1.0, bodyD);
      let bodyFlowAmount = max(max(${F(r1)} * bowNear, ${F(j2)} * bowFar), ${F(ZY)} * wakeSignal);
      let bodyRingLife = mix(0.22, 1.0, smoothstep(0.1, 0.8, shoreSurge));
      let bodyAmount = max(bodyRingAmount * bodyContactFade * mix(bodyRingLife, 1.0, bodyFlowGate), bodyFlowAmount);
      let bodyGate = hasDepthHit * frontFace;
      bodyFormation = clamp(bodyAmount * bodyZone * bodyGate * bodyLod, 0.0, 1.0);
    }
  }`}function lY(a,b,c,d,e,f,g,h){return (lY=$c0C(9)).call(this,a,b,c,d,e,f,g,h)}function nY($,J,Q=!1){let Z=`  let foamDx = ${J?"vec2<f32>(dot(lightPositionDx, frameU), dot(lightPositionDx, frameV))":"dpdx(fieldRender)"};
  let foamDy = ${J?"vec2<f32>(dot(lightPositionDy, frameU), dot(lightPositionDy, frameV))":"dpdy(fieldRender)"};
  let foamDet = foamDx.x * foamDy.y - foamDx.y * foamDy.x;
  let foamDetSafe = select(-max(abs(foamDet), 1e-8), max(abs(foamDet), 1e-8), foamDet >= 0.0);
  let foamGrad = clamp(vec2<f32>(${J?"foamDetailDx":"dpdx(foamDetailNoise)"} * foamDy.y - ${J?"foamDetailDy":"dpdy(foamDetailNoise)"} * foamDx.y, ${J?"foamDetailDy":"dpdy(foamDetailNoise)"} * foamDx.x - ${J?"foamDetailDx":"dpdx(foamDetailNoise)"} * foamDy.x) / foamDetSafe, vec2<f32>(-16.0), vec2<f32>(16.0));
  let foamN = water_safeNormalize(waterSurfaceNormal - (foamGrad.x * frameU + foamGrad.y * frameV) * 0.008, waterSurfaceNormal);`,q="  let foamAlbedo = water.foamColor * mix(0.87, 1.0, smoothstep(0.15, 0.8, foamDetailNoise));",Y=[];Y.push(`  var foamPos: vec2<f32>;
  var foamOrigin: vec2<f32>;${$.loop===!0?`
  var foamLoop = 0.0;`:""}
  if (${S0}) {
    let foamStreak = 1.0 / (1.0 + 4.0 * water.flowSpeed);
    foamPos = vec2<f32>((fieldPos.x - time * (water.flowSpeed * ${V$}.0)) * foamStreak, fieldPos.y);
    foamOrigin = vec2<f32>(0.0);${$.loop===!0?`
    foamLoop = water.channelLoop.y * foamStreak;`:""}
  } else {
    let streakDir = select(select(waterDraw.arena.yz, water.swellDirection, water.swellAmplitude > 0.0), fieldFlow, steepFace > 0.5);
    let streakStretch = 1.0 + ${F(XY)} * shoreWaveGate;
    let waveScale = mix(1.0, 1.0 / streakStretch, shoreWaveGate);
    let waveFrame = mat2x2<f32>(
      vec2<f32>(1.0, 0.0) + streakDir * (streakDir.x * (waveScale - 1.0)),
      vec2<f32>(0.0, 1.0) + streakDir * (streakDir.y * (waveScale - 1.0)));
    let flowGate = ${n6};
    let flowStreak = 1.0 / (1.0 + ${F(qY)} * localFlowSpeed);
    let flowScale = mix(1.0, flowStreak, flowGate);
    let flowFrame = mat2x2<f32>(
      vec2<f32>(1.0, 0.0) + flowT * (flowT.x * (flowScale - 1.0)),
      vec2<f32>(0.0, 1.0) + flowT * (flowT.y * (flowScale - 1.0)));
    let foamFrame = flowFrame * waveFrame;
    let foamMoved = vec2<f32>(dot(in.sourcePositionRender, sourceFrameU), dot(in.sourcePositionRender, sourceFrameV)) - flowT * (localFlowSpeed * ${V$}.0 * time);
    foamPos = foamFrame * foamMoved;
    foamOrigin = foamFrame * vec2<f32>(dot(frame.sourceOrigin, sourceFrameU), dot(frame.sourceOrigin, sourceFrameV));
  }`);Y.push(`  let foamDepthFade = clamp(shoreFoamContactFade, 0.0, 1.0);
  let foamTextureUv = ${$.loop===!0?"water_foamLoopFit(water_foamTextureUv(foamPos, time, vec2<f32>(0.0), water.foamScale), foamLoop * max(water.foamScale, 0.05))":"water_foamTextureUv(foamPos, time, vec2<f32>(0.0), water.foamScale)"} + fract(foamOrigin * water.foamScale);
  let foamTextureDx = dpdx(foamTextureUv);
  let foamTextureDy = dpdy(foamTextureUv);
  let meetFoamScale = max(water.foamScale, 0.05);
  let meetFoamAt = in.sourcePositionRender.xz + frame.sourceOrigin.xz - meetFlow.xy * (meetFlow.z * ${V$}.0 * time);
  let meetFoamUv = meetFoamAt * meetFoamScale;
  let swashLineAA = max(fwidth(shoreFoamWaterColumnDepth), 0.002);
  let swashLine = (1.0 - smoothstep(0.0, ${F(KY)} * shoreBandScale + swashLineAA, shoreFoamWaterColumnDepth)) * shoreFoamHasDepthHit * shoreFoamFloor * shoreWaveGate;
  var localSwellAmplitude = 0.0;
  if (water.swellAmplitude > 0.0) {
    localSwellAmplitude = water_swellLocalAmplitude(water.swellAmplitude, in.positionWorld.xz, waterDraw.coast.xy, waterDraw.coast.zw, water.surfWidth, select(1.0, 0.0, waterDraw.sheetOrigin.w > 0.0));
  }
  let waveSurge = clamp(lookWave.displacement.y * water.crestWaveSignalScale * 0.5 + 0.5, 0.0, 1.0);
  let shoreSurge = select(waveSurge, sin(lookSwell.x) * 0.5 + 0.5, localSwellAmplitude > 0.001);
  let shoreLife = smoothstep(0.1, 0.9, shoreSurge);
  let shoreAmount = max(pow(foamDepthFade, 1.15) * mix(0.2, 0.96, shoreLife), 0.94 * swashLine * mix(0.25, 1.0, shoreLife));
  let shoreDecay = smoothstep(0.0, 0.1, foamDepthFade) * shoreFoamHasDepthHit * shoreFoamFloor;
  let shoreFormation = shoreAmount * shoreDecay;

  let compressionRange = max(water.waveIntensity * water.waveHeightScale * water.waveFrequency * ${F(M$*R0.reduce((X,K,j)=>X+K*w0[j]*H$[j],0))}, 1e-5);
  let crestCompression = clamp(lookWave.compression / compressionRange * 0.5 + 0.5, 0.0, 1.0);
  let crestPotential = smoothstep(0.58, 0.74, crestCompression) * smoothstep(0.16, 0.6, water.waveIntensity);
  let crestFormation = crestPotential * 0.9 * mix(1.0, ${F(M2)}, underside);

  var swellShoreFormation = 0.0;
  var swellCrestFormation = 0.0;
  var swellBreakFormation = 0.0;
  if (localSwellAmplitude > 0.001) {
    let crestAge = fract((${F(Q8)} - lookSwell.x) * ${F(1/L)}) * ${F(L/U$(r[0]))};
    let nextCrest = ${F(L/U$(r[0]))} - crestAge;
    let crestBirth = 1.0 - smoothstep(0.0, 0.38, min(crestAge, nextCrest));
    let crestResidue = exp2(-crestAge / 0.85) * (1.0 - smoothstep(1.8, 2.5, crestAge));
    let waveDepthRatio = localSwellAmplitude / max(shoreFoamWaterColumnDepth, 0.05);
    let breakGate = smoothstep(0.18, 0.55, waveDepthRatio) * shoreFoamHasDepthHit * frontFace * shoreFoamFloor;
    let swashBand = (1.0 - smoothstep(0.02, 0.25, shoreFoamWaterColumnDepth)) * shoreFoamHasDepthHit * frontFace * shoreFoamFloor;
    let breakingFoam = max(0.97 * crestBirth, 0.74 * crestResidue) * breakGate;
    let swashFoam = swashBand * (0.3 + 0.65 * shoreLife);
    let whitecap = max(0.83 * crestBirth, 0.38 * crestResidue) * (1.0 - breakGate) * smoothstep(0.12, 0.45, localSwellAmplitude) * mix(1.0, ${F(M2)}, underside);
    swellShoreFormation = swashFoam;
    swellCrestFormation = whitecap;
    swellBreakFormation = breakingFoam;
  }`);Y.push(cY($));Y.push(dY($));Y.push(`  let shoreFoamGain = water.shoreFoamMix * water.shorelineFoamStrength;
  let crestFoamGain = water.crestFoamMix * water.crestFoamStrength;
  let shoreSources = max(shoreFormation, max(wakeFormation, swellShoreFormation) * levelFace);
  let crestSources = max(crestFormation, swellCrestFormation) * levelFace;
  let fallFlow = smoothstep(${F(GY)}, ${F(FY)}, localFlowSpeed);
  let fallFoam = steepFace * ${F(MY)} * fallFlow;
  let coverageWanted = select(water.crestFoamCoverage, max(water.crestFoamCoverage, ${F(DY)} * fallFlow), steepFace > 0.5);
  var crestCoverage = select(0.0, 1.0, coverageWanted > 0.0);
  if ((crestFoamGain > 0.001 || fallFoam > 0.001) && coverageWanted > 0.0 && coverageWanted < 1.0 && max(max(crestSources, swellBreakFormation), fallFoam) > 0.001) {
    let region = water_foamNoise((foamPos + foamOrigin) * select(vec2<f32>(0.12), vec2<f32>(${F(CY)}, ${F(kY)}), steepFace > 0.5)${B$($,"foamLoop * 0.12")});
    let rank = smoothstep(0.2, 0.8, region);
    let footprint = max(length(foamTextureDx), length(foamTextureDy)) * water.foamFootprintScale;
    let edge = max(select(${F(zY)}, ${F(BY)}, steepFace > 0.5), footprint * 2.0);
    let selected = smoothstep(1.0 - coverageWanted - edge, 1.0 - coverageWanted + edge, rank);
    crestCoverage = mix(coverageWanted, selected, 1.0 - smoothstep(0.3, 0.9, footprint));
  }
  let foamSource = clamp(max(max(max(max(shoreSources * shoreFoamGain, bodyFormation * levelFace), max(crestSources * crestFoamGain, fallFoam * water.crestFoamStrength) * crestCoverage), swellBreakFormation * levelFace * shoreFoamGain * crestFoamGain * crestCoverage), rippleField.z * levelFace), 0.0, 1.0);
  var foamFormation = foamSource;
  if ((${t6}) && foamSource > 0.001) {
    let massP = (foamPos + foamOrigin) * water.foamMassScale;
    let massFootprint = max(length(foamTextureDx), length(foamTextureDy)) * 0.8;
    let massKeep = 1.0 - smoothstep(0.12, 0.75, massFootprint);
    let smallKeep = 1.0 - smoothstep(0.12, 0.75, massFootprint * 2.15);
    var mass = water_foamMass(massP, time, massKeep, smallKeep${B$($,"foamLoop * water.foamMassScale")});
    if (meetW > 0.0) {
      mass = mix(mass, water_foamMass(meetFoamAt * water.foamMassScale, time, massKeep, smallKeep${B$($,"0.0")}), meetW);
    }
    foamFormation = clamp(foamSource + 3.2 * foamSource * (1.0 - foamSource) * (mass - 0.25), 0.0, 1.0);
  }
  var foamTextureSample = 1.0;
  if ((${t6}) && foamFormation > 0.001) {
    foamTextureSample = textureSampleGrad(waterCrestFoamTex, waterRepeatSampler, foamTextureUv, foamTextureDx, foamTextureDy).r;
    if (meetW > 0.0) {
      foamTextureSample = mix(foamTextureSample, textureSampleGrad(waterCrestFoamTex, waterRepeatSampler, meetFoamUv, fieldRenderDx * meetFoamScale, fieldRenderDy * meetFoamScale).r, meetW);
    }
  }
  let foamMask = water_foamTextureCoverage(foamFormation, foamTextureSample, water.shorelineFoamSoftness);
  let foamDetailNoise = foamTextureSample;
  let foamBlendStrength = max(clamp(water.foamStrength, 0.0, 1.0), fallFoam);
  let foamVisible = foamMask * foamBlendStrength;
  let shoreEdgeKeep = mix(shoreEdgeFade, 1.0, foamVisible);
${J?`  let foamDetailDx = dpdx(foamDetailNoise);
  let foamDetailDy = dpdy(foamDetailNoise);`:Z}`);return iY(Y,$,J,Q,Z,"  let foamAlbedo = water.foamColor * mix(0.87, 1.0, smoothstep(0.15, 0.8, foamDetailNoise));")}function iY($,J,Q,Z,q,Y){if($.push(`  let N = waterSurfaceNormal;
  let V = ${y2("waterEyeNear - waterNear")};
  let NdotV = dot(N, V);
  let fresnel = water_fresnel(max(NdotV, 0.0), 0.02);
`),J.refractionEnabled)$.push(`  let refractiveTransmissionActive = clamp(max(columnSeen, underside) * ${j$(J)?"water.refractionMix":"0.0"}, 0.0, 1.0);
  let floorVisibility = (1.0 - fresnel) * (1.0 - foamVisible) * refractiveTransmissionActive;
  let bodyAlbedo = select(mix(waterColor, waterColor * (1.0 - floorTransmittance) * (1.0 - fresnel), clamp(max(columnSeen, underside), 0.0, 1.0)), waterColor, underside > 0.5);`);else $.push("  let bodyAlbedo = waterColor;");if(!Q)$.push(Y);if($.push(`  let albedo = bodyAlbedo;
  let surfaceOpacity = clamp(water.surfaceOpacity, 0.0, 1.0);
  let opacityWithFoam = mix(surfaceOpacity, 1.0, foamVisible);
  let distanceFadeRatio = mix(1.0, 0.18, distanceNormalBlend);
  let rippleVarianceRemoved = clamp(1.0 - distanceFadeRatio * distanceFadeRatio * rippleVarianceKept, 0.0, 1.0);
  let farDetailShare = clamp(water.detailNormalStrength / ${F(OY)}, 0.0, 1.0);
  let farDetailGain = sqrt(max(water.detailNormalStrength / ${F(h2)}, 1.0));
  let farRoughness = clamp(water.baseRoughness + rippleVarianceRemoved * ${F(G2)} * farDetailShare * farDetailShare * farDetailGain, 0.0, 1.0);
  let farAlpha = farRoughness * farRoughness;
  let lookRoughness = min(sqrt(sqrt(farAlpha * farAlpha + lookShed)), 1.0);
  let roughness = max(lookRoughness, ${F(c6)});`),!Z)return{source:$.join(`
`),foamNormal:q,foamAlbedo:Y,bodyRoughness:"roughness"};return $.push(`  let scriptRoughness = max(clamp(water.baseRoughness + rippleVarianceRemoved * ${F(G2)} * farDetailShare * farDetailShare, 0.0, 1.0), ${F(c6)});`),{source:$.join(`
`),foamNormal:q,foamAlbedo:Y,bodyRoughness:"scriptRoughness"}}function Y4($){return $?"WaterOutput":"@location(0) vec4<f32>"}function X4($,J){return J?`let color = ${$}; return WaterOutput(color, vec4<f32>(lume_motionVector(in.currentClip, in.previousClip), 0.0, color.a));`:`return ${$};`}var D9="@builtin(front_facing) waterFrontFacing: bool";function C9(a){return (C9=$c0C(10)).apply(this,arguments)}var K4=($,J)=>J?`select(water_faded(${$}, fadeShow), vec4<f32>(0.0), waterCut)`:`water_faded(${$}, fadeShow)`,j4=`fn water_dropsOf(in: WaterVaryings, front: bool) -> vec2<f32> {
  var cut = any(in.clipDistances < vec2<f32>(0.0)) || water_pastFarHidden(in.farClamp, in.position.xy, in.positionRender) || (waterDraw.words.z != 0.0 && front != (waterDraw.words.z > 0.0));
  var fadeShow = 1.0;
  let fadeMag = abs(waterDraw.fade.x);
  if (fadeMag > 0.0) {
    var fadeHide = min(fadeMag, 1.0);
    if (fadeMag > 1.0) {
      fadeHide = ${A2("fadeMag")};
    }
    if (waterDraw.fade.y > 0.5) {
      let fadeDoor = ${L2("in.position.xy")};
      if (select(fadeDoor, 1.0 - fadeDoor, waterDraw.fade.x < 0.0) < fadeHide) { cut = true; }
    } else {
      fadeShow = 1.0 - fadeHide;
    }
  }
  return vec2<f32>(f32(cut), fadeShow);
}
fn water_faded(color: vec4<f32>, show: f32) -> vec4<f32> {
  return vec4<f32>(color.rgb, color.a * show);
}`,V4=`fn water_bodyLight() -> vec3<f32> {
  return (lighting_indirectIrradiance(vec3<f32>(0.0, 1.0, 0.0)) + passLights.sunColor * passLights.sunIntensity * max(passLights.sunDirection.y, 0.0)) * 0.31830988618;
}
fn water_eyeMedium(color: vec3<f32>, camDist: f32, underside: f32) -> vec3<f32> {
  if (underside <= 0.5 || passLights.waterOverPlane.z <= 0.5 || waterDraw.words.y <= 0.5) { return color; }
  return mix(passLights.waterOverRect.rgb * water_bodyLight(), color, exp2(-passLights.waterOverExtinction.rgb * camDist));
}
fn water_fresnelBelow(cosI: f32) -> f32 {
  let n = ${F(z8)};
  let sinT2 = n * n * (1.0 - cosI * cosI);
  if (sinT2 >= 1.0) { return 1.0; }
  let cosT = sqrt(1.0 - sinT2);
  let rs = (n * cosI - cosT) / (n * cosI + cosT);
  let rp = (n * cosT - cosI) / (n * cosT + cosI);
  return 0.5 * (rs * rs + rp * rp);
}`,z4=($)=>[...$.includes("fn lighting_shIrradiance(")?[]:[Q9],...$.includes("fn lighting_indirectIrradiance(")?[]:[Z9]],B4;function aY(a){return (aY=$c0C(12)).call(this,a)}function tY($){return K7($)?[`  let mirrorRaySpread = length(fwidth(reflect(-V, waterMirrorNormal))) + 2.0 * roughness * roughness + ${F(2*bY)} * length(mirrorRippleSpread);`]:[]}var e6="  let mirrorSide = select(1.0, -1.0, underside > 0.5);",$8,t7;function sY(a,b){return (sY=$c0C(15)).call(this,a,b)}function oY(){return (oY=$c0C(16)).call(this)}function rY($,J=null){let Q=[];let Z=k$($);if(Z){Q.push(sY(Z,a2($)),"  var frontSkyMirror = vec3<f32>(0.0);","  var frontSkyFill = vec3<f32>(0.0);");}if(Q.push("  if (underside <= 0.5) {"),J!==null)Q.push(`
  let skyMirrorDir = reflect(-V, N);
  let skyMirror = ${J.indirectIrradiance("skyMirrorDir")} * ${F(1/i0)};`);else Q.push(`  
  let skyMirrorDir = reflect(-V, N);
  let skyIblBound = passLights.iblParams.x > 0.0;
  let skyCubeMirror = lume_cubeSampleLevel(iblEnvMap, iblSampler, skyMirrorDir, roughness * passLights.iblParams.y, passLights.iblParams.y + 1.0).rgb * passLights.iblParams.x * ${F(1/a7-1)};
  let skyMirror = select(lighting_ambientIrradiance(skyMirrorDir) * ${F(1/i0)}, skyCubeMirror, skyIblBound) * lighting_groundOcclusion(in.positionRender, N); //`);if(Z){let q=J!==null?"  let skyFillCarried = vec3<f32>(0.0);":`  let skyFillShare = lighting_multiscatter(vec3<f32>(0.04), lighting_dfgApprox(roughness, clamp(NdotV, 0.0, 1.0))).single.x;
  let skyFillCarried = select(vec3<f32>(0.0), skyMirror * ${F(a7/(1-a7))}, skyIblBound) * skyFillShare;`;Q.push(`${q}
  frontSkyMirror = skyMirror;
  frontSkyFill = skyFillCarried;`)}else Q.push("  surfaceColor = surfaceColor + skyMirror * (fresnel * (1.0 - foamVisible));");if(Q.push("  }"),Z)Q.push(`  let sceneMirrorWeight = sceneMirror.a * frontFace;
  let mirror = mix(frontSkyMirror, sceneMirror.rgb, sceneMirrorWeight) * fresnel - frontSkyFill * sceneMirrorWeight;
  surfaceColor = select(surfaceColor, max(surfaceColor + mirror * (1.0 - foamVisible), vec3<f32>(0.0)), underside <= 0.5);`);return Q}var $9="water.depthColorDistance * 6.0",eY=($)=>$.depthPipelineEnabled?` else if (columnSeen > hasDepthHit) {
    alpha = shoreEdgeKeep;
  }`:"",U4="water_swell(in.waveBase, waveTime, water.swellAmplitude, water.swellDirection, waterDraw.coast.xy, waterDraw.coast.zw, water.surfWidth, select(1.0, 0.0, waterDraw.sheetOrigin.w > 0.0))",H4=`  water_lookDx = dpdx(in.waveBase);
  water_lookDy = dpdy(in.waveBase);
  var lookWave = water_gerstnerWave(in.waveBase, waveTime, water.waveIntensity, water.waveIntensity * water.waveHeightScale, water.waveFrequency, waterDraw.arena.yz, water_extent(waterDraw.coast.zw));`,M8=`  let faceCross = cross(dpdx(lume_in.sourcePositionRender), dpdy(lume_in.sourcePositionRender));
  let faceCrossLen = length(faceCross);
  let faceLevel = faceCrossLen > 1e-12 && abs(faceCross.y) >= ${F(V9)} * faceCrossLen;
  let eyeRise = in.sourcePositionRender.y - lume_in.restRender + sourceToCamera.y;
  let levelEyeSide = select(select(sourceToCamera.y, faceCross.y * dot(faceCross, sourceToCamera), faceLevel), eyeRise, abs(eyeRise) > (${F(y0)} * abs(water.waveIntensity) + max(water.swellAmplitude, 0.0) * ${F(f[0]+f[1])}) * abs(water.waveHeightScale));
  let underside = select(select(0.0, 1.0, levelEyeSide < 0.0), clamp(waterDraw.words.x, 0.0, 1.0), waterDraw.words.x >= 0.0);`,G8=`  water_fragmentRow(lume_in.slot);
  var in: WaterVaryings = lume_in;
  let waterNear = lume_in.positionRender;
  let waterSourceNear = lume_in.sourcePositionRender;
  let waterEyeNear = frame.cameraPosition - lume_eyeAnchor();
  in.positionRender = lume_in.positionRender + lume_eyeAnchor();
  in.sourcePositionRender = lume_in.sourcePositionRender + water_sourceAnchor();
  let toCamera = waterEyeNear - waterNear;
  let viewZ = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;`;function M4($,J){let Q=[];Q.push(`  let sourceToCamera = water_sourceDirection(toCamera);
${M8}
  let frontFace = 1.0 - underside;
  let camDist = length(toCamera);
  let distanceNormalBlend = clamp(camDist * 0.018, 0.0, 1.0);
  let normalStrengthByDistance = mix(water.detailNormalStrength, water.detailNormalStrength * 0.18, distanceNormalBlend) * water.detailNormalMix;
  let sinGraze = clamp(abs(sourceToCamera.y) / max(camDist, 0.05), 0.05, 1.0);
  let pixelFootprint = (2.0 * max(viewZ, 0.05)) / (frame.proj[1][1] * frame.viewportSize.y * sinGraze);`),Q.push(`  let channelFace = ${S0};
  let faceNormal = select(vec3<f32>(0.0, 1.0, 0.0), faceCross * (select(-1.0, 1.0, dot(faceCross, sourceToCamera) >= 0.0) / faceCrossLen), faceCrossLen > 1e-12);
  let steepFace = select(0.0, 1.0, faceCrossLen > 1e-12 && !faceLevel && !channelFace);
  let downFace = water_safeNormalize(vec3<f32>(0.0, -1.0, 0.0) + faceNormal * faceNormal.y, vec3<f32>(0.0, 0.0, 1.0));
  let acrossFace = cross(faceNormal, downFace);
  let sourceFrameU = select(vec3<f32>(1.0, 0.0, 0.0), acrossFace, steepFace > 0.5);
  let sourceFrameV = select(vec3<f32>(0.0, 0.0, 1.0), downFace, steepFace > 0.5);
  let sourceFrameN = select(vec3<f32>(0.0, 1.0, 0.0), faceNormal, steepFace > 0.5);
  let sourceColumnN = select(sourceFrameN, faceCross * (sign(faceCross.y) / faceCrossLen), waterDraw.words.x >= 0.0 && faceCrossLen > 1e-12 && (faceLevel || channelFace));
  var fieldPos: vec2<f32>;
  var fieldFlow: vec2<f32>;
  var flowT: vec2<f32>;
  var channelGradS = vec2<f32>(1.0, 0.0);
  if (channelFace) {
    fieldPos = in.channel;
    fieldFlow = vec2<f32>(1.0, 0.0);
    let dsX = dpdx(in.channel.x);
    let dsY = dpdy(in.channel.x);
    let dpX = dpdx(waterSourceNear.xz);
    let dpY = dpdy(waterSourceNear.xz);
    let frameDet = dpX.x * dpY.y - dpX.y * dpY.x;
    let gradS = select(vec2<f32>(1.0, 0.0), vec2<f32>(dsX * dpY.y - dsY * dpX.y, dsY * dpX.x - dsX * dpY.x) / frameDet, abs(frameDet) > 1e-9);
    let gradSLen = length(gradS);
    channelGradS = gradS;
    flowT = select(vec2<f32>(1.0, 0.0), gradS / gradSLen, gradSLen > 1e-5);
  } else {
    fieldPos = select(in.positionWorld.xz, vec2<f32>(dot(in.positionWorld, acrossFace), dot(in.positionWorld, downFace)), steepFace > 0.5);
    fieldFlow = select(waterDraw.arena.yz, vec2<f32>(0.0, 1.0), steepFace > 0.5);
    flowT = fieldFlow;
  }
  let flowN = vec2<f32>(-flowT.y, flowT.x);
  let localFlowSpeed = water.flowSpeed;
  let levelFace = 1.0 - steepFace;
  let frameU = water_guestDirection(sourceFrameU);
  let frameV = water_guestDirection(sourceFrameV);
  let frameN = water_guestDirection(sourceFrameN);
  let columnN = water_guestDirection(sourceColumnN);`),Q.push(`  let fieldRender = select(vec2<f32>(dot(waterSourceNear, sourceFrameU), dot(waterSourceNear, sourceFrameV)), waterSourceNear.xz, channelFace);
  let fieldRenderDx = dpdx(fieldRender);
  let fieldRenderDy = dpdy(fieldRender);
  let rippleDx = select(fieldRenderDx, dpdx(in.channel), channelFace);
  let rippleDy = select(fieldRenderDy, dpdy(in.channel), channelFace);`),Q.push(...J.view);let Z=$.stillCut!==!0;if(Q.push(`  let meetEnds = smoothstep(vec2<f32>(0.0), vec2<f32>(1.0), in.channel.x * water.meetLine.xz + water.meetLine.yw);
  let meetW = max(meetEnds.x, meetEnds.y);
  let meetFlow = select(water.meetHead, water.meetTail, meetEnds.x >= meetEnds.y);`),Q.push(`  var rippleSlope = vec2<f32>(0.0, 0.0);
  var rippleVarianceKept = 1.0;${J.vars}`),Z)Q.push(`  if (water.detailNormalMix > 0.001 && !(${g6})) {
    let ripple = water_rippleSlopePrepared(fieldPos, time, water.normalScale * 4.0, fieldFlow, water.flowSpeed * ${V$}.0, rippleDx, rippleDy, ${J.args}${B$($,"water.channelLoop.y")});
    rippleSlope = ripple.slope * (normalStrengthByDistance * 3.2);
    rippleVarianceKept = ripple.kept;${J.reads}
    if (${L1}) {
      let meetRipple = water_rippleSlopePrepared(in.positionWorld.xz, time, water.normalScale * 4.0, meetFlow.xy, meetFlow.z * ${V$}.0, fieldRenderDx, fieldRenderDy, ${J.meetArgs}${B$($,"0.0")});
      let toFlow = mat2x2<f32>(flowT, flowN);
      rippleSlope = mix(rippleSlope, meetRipple.slope * (normalStrengthByDistance * 3.2) * toFlow, meetW);
      rippleVarianceKept = mix(rippleVarianceKept, meetRipple.kept, meetW);${J.meetReads}
    }
  }`);return Q.push("  let rippleSlopeWorld = select(rippleSlope, rippleSlope.x * flowT + rippleSlope.y * flowN, channelFace);"),Q.push(`${H4}
  if (meetW > 0.0) {
    let stillWave = water_gerstnerWave(in.waveBase, waveTime, meetFlow.w, meetFlow.w * water.waveHeightScale, water.waveFrequency, meetFlow.xy, water_extent(waterDraw.coast.zw));
    lookWave.normal = water_safeNormalize(mix(lookWave.normal, stillWave.normal, meetW), vec3<f32>(0.0, 1.0, 0.0));
    lookWave.shed = mix(lookWave.shed, stillWave.shed, meetW);
  }
  var lookShed = lookWave.shed;
  var lookSwell = vec4<f32>(0.0);
  if (water.swellAmplitude > 0.0) {
    let sw = ${U4};
    lookSwell = vec4<f32>(sw.phase, sw.breakSignal, sw.slope * water.waveHeightScale);
    lookShed = lookShed + sw.shed * water.waveHeightScale * water.waveHeightScale;
  }`),Q.push(`  let rippleField = ${Z?"water_rippleField(in.sourcePositionRender.xz, pixelFootprint, water_rippleShare(water.rippleHalfLife))":"vec4<f32>(0.0)"};
  let movingSlope = rippleField.xy * levelFace;
  let detailNormal = -(rippleSlopeWorld.x + movingSlope.x) * frameU - (rippleSlopeWorld.y + movingSlope.y) * frameV;
  let macroNormal = lookWave.normal;
  let swellTilt = vec3<f32>(-lookSwell.z, 0.0, -lookSwell.w);
  let waterSurfaceNormal = water_safeNormalize(mix(water_guestDirection(macroNormal + swellTilt), frameN, steepFace) + detailNormal, frameN);`),Q}var G4=`  let transmittanceLum = dot(transmittance, vec3<f32>(0.2126, 0.7152, 0.0722));
  let shallowColor = mix(water.waterSurfaceColor, water.waterHighlightColor, 0.12);
  let scatterColor = vec3<f32>(water.scatterR, water.scatterGB);
  var waterColor = mix(water.waterSurfaceColor, water.waterHighlightColor, 0.08);
  waterColor = mix(waterColor, mix(shallowColor, scatterColor, 1.0 - transmittanceLum), water.depthPipelineMix);`;function $X($,J,Q=!1,Z=!1,q="",Y=!1,X=!1,K=null){let j=k$($)?`    let underEyeTransmittance = exp2(-water.extinction * max(camDist * (1.0 - waterDraw.words.y), 0.0));
    let underMirrorLit = mix(underLit * underMirrorTransmittance, sceneMirror.rgb * underEyeTransmittance, sceneMirror.a);`:"    let underMirrorLit = underLit * underMirrorTransmittance;";let z=`    let underLit = albedo * water_bodyLight();
    let underCosI = clamp(-NdotV, 0.0, 1.0);
    let fresnelBelow = water_fresnelBelow(underCosI);
    let underRefractDir = refract(-V, -N, ${F(z8)});
    let underReflectDir = reflect(-V, N);
    let underMirrorColumn = camDist * (1.0 - waterDraw.words.y) + water.depthColorDistance * ${F(UY)} * clamp(-water_sourceDirection(underReflectDir).y, 0.0, 1.0);
    let underMirrorTransmittance = exp2(-water.extinction * max(underMirrorColumn, 0.0));
${j}
    let underMirrorShare = fresnelBelow * (1.0 - foamVisible);
    let underBodyWeight = (1.0 - fresnelBelow) * (1.0 - transmittance) * (1.0 - foamVisible);
    let underWindowShare = (1.0 - fresnelBelow) * (1.0 - foamVisible);`;let V=[];let B=$.blended===!0;V.push(`${W2} @fragment fn fs(lume_in: WaterVaryings, ${D9}) -> ${Y4(Q)} {
${G8}`);V.push(C9(B),`  var exitColor = vec3<f32>(0.0);
  var exitBackdrop = vec3<f32>(0.0);
  var exitKeep = 1.0;
  var exitDist = 0.0;
  var exitUnder = 0.0;
  var exitAlpha = 1.0;
${N2("fog","passLights.waterOverPlane.z > 0.5 || shade_depthFactor(viewZ, -toCamera) < 1.0","!=")}`);V.push("  let screenUV = in.position.xy / frame.viewportSize;");V.push("  let time = frame.time;","  let waveTime = frame.worldTime;");if(J)V.push(`  let lightPositionDx = dpdx(waterNear);
  let lightPositionDy = dpdy(waterNear);`);let U=aY($);if(V.push(...M4($,U)),V.push(...U.normal),j$($))V.push(`  var depthUV = screenUV;
  if (water.refractionMix > 0.001) {
    let unrefractedDepth = water_sceneDepth(screenUV);
    let unrefractedWorld = water_worldFromUvDepth(screenUV, unrefractedDepth);
    let unrefractedColumn = clamp(dot(in.positionWorld - unrefractedWorld, sourceColumnN), 0.0, 6.0) * select(0.0, 1.0, unrefractedDepth > ${_});
    let surfaceSlope = -vec2<f32>(dot(waterSurfaceNormal, frameU), dot(waterSurfaceNormal, frameV)) / max(dot(waterSurfaceNormal, frameN), 0.2);
    let floorShiftWorld = surfaceSlope * (0.25 * unrefractedColumn);
    let pixelsPerMeter = frame.proj[1][1] / max(viewZ, 0.5);
    let refractionOffset = clamp(floorShiftWorld * (0.5 * pixelsPerMeter * water.refractionStrength * ${F(WY)}), vec2<f32>(-0.06), vec2<f32>(0.06));
    let refractedUV = clamp(screenUV + refractionOffset, vec2<f32>(0.0), vec2<f32>(1.0));
    let refractedDepth = water_sceneDepth(refractedUV);
    let refractedWorldPosition = water_worldFromUvDepth(refractedUV, refractedDepth);
    let refractedHasDepthHit = select(0.0, 1.0, refractedDepth > ${_});
    let refractedColumn = dot(in.positionWorld - refractedWorldPosition, sourceColumnN);
    let refractedUVIsValid = refractedHasDepthHit * select(0.0, 1.0, refractedColumn > 0.02);
    depthUV = mix(screenUV, refractedUV, refractedUVIsValid * clamp(refractedColumn / max(unrefractedColumn, 0.02), 0.0, 1.0));
  }`);else V.push("  let depthUV = screenUV;");if($.depthPipelineEnabled)V.push(`  var sceneRenderPosition = in.positionRender;
  var sceneWorldPosition = in.positionWorld;
  var waterColumnDepth = 0.0;
  var hasDepthHit = 0.0;
  var columnSeen = 0.0;
  if (water.depthPipelineMix > 0.001) {
    let sceneDepth = water_sceneDepth(depthUV);
    sceneRenderPosition = water_renderFromUvDepth(depthUV, sceneDepth);
    sceneWorldPosition = water_sourceRender(sceneRenderPosition) + frame.sourceOrigin;
    waterColumnDepth = max(dot(in.positionWorld - sceneWorldPosition, sourceColumnN), 0.0);
    hasDepthHit = select(0.0, 1.0, sceneDepth > ${_});
    columnSeen = max(hasDepthHit, frontFace * select(0.0, 1.0, textureDimensions(waterSceneDepthTex).x > 1u));
  }`);else V.push(`  let sceneRenderPosition = in.positionRender;
  let sceneWorldPosition = in.positionWorld;
  let waterColumnDepth = 0.0;
  let hasDepthHit = 0.0;
  let columnSeen = 0.0;`);if(V.push(`  let shoreWaveGate = smoothstep(0.1, 0.8, water.waveIntensity);
  let shoreBandScale = select(mix(0.25, 1.0, shoreWaveGate), max(mix(0.25, 1.0, shoreWaveGate), smoothstep(0.02, 0.35, localFlowSpeed)), ${S0});
  let contactFlowReach = select(1.0, 1.0 + ${F(YY)} * localFlowSpeed, ${S0});
  let calmFoamScale = max(mix(${F(VY)}, 1.0, smoothstep(0.08, 0.45, water.waveIntensity)), smoothstep(0.02, 0.35, localFlowSpeed));`),V.push("  let contactReach = water.contactFoamWidth * shoreBandScale * contactFlowReach * calmFoamScale;"),$.depthPipelineEnabled)V.push(`  var shoreFoamWaterColumnDepth = 0.0;
  var shoreFoamHasDepthHit = 0.0;
  var shoreFoamFloor = 1.0;
  if (water.depthPipelineMix > 0.001) {
    let shoreDepth = water_sceneDepth(screenUV);
    let shoreRender = water_renderFromUvDepth(screenUV, shoreDepth);
    shoreFoamWaterColumnDepth = max(dot(in.positionRender - shoreRender, columnN), 0.0);
    shoreFoamHasDepthHit = select(0.0, 1.0, shoreDepth > ${_}) * frontFace;
    let shoreNormal = cross(dpdx(shoreRender), dpdy(shoreRender));
    let shoreNormalLen = length(shoreNormal);
    let shoreUp = abs(dot(shoreNormal, water_guestDirection(vec3<f32>(0.0, 1.0, 0.0)))) / max(shoreNormalLen, 1e-12);
    shoreFoamFloor = select(1.0, smoothstep(${F(HY)}, ${F(V9)}, shoreUp), shoreNormalLen > 1e-12 && shoreNormalLen < 1e30);
  }`);else V.push(`  let shoreFoamWaterColumnDepth = 0.0;
  let shoreFoamHasDepthHit = 0.0;
  let shoreFoamFloor = 1.0;`);if(V.push($.depthPipelineEnabled?`  let shoreEdgeReach = max(${F(jY)} * min(clamp(water.contactFoamWidth / 0.18, 1.0, 1.6), water.shoreBodyScale), 1e-4);
  let shoreEdgeFade = mix(1.0, smoothstep(0.0, shoreEdgeReach, waterColumnDepth), hasDepthHit * frontFace * shoreFoamFloor);`:"  let shoreEdgeFade = 1.0;"),$.shoreFoamEnabled&&$.depthPipelineEnabled)V.push(`  var shoreFoamContactFade = 0.0;
  if (water.shoreFoamMix > 0.001) {
    shoreFoamContactFade = clamp(1.0 - clamp(shoreFoamWaterColumnDepth / contactReach, 0.0, 1.0), 0.0, 1.0) * shoreFoamHasDepthHit * shoreFoamFloor;
  }`);else V.push("  let shoreFoamContactFade = 0.0;");if($.depthPipelineEnabled)V.push(`  let waterPathLength = max(length(sceneWorldPosition - in.positionWorld), waterColumnDepth);
  let columnForOptics = mix(${$9}, waterPathLength, hasDepthHit) * frontFace * water.bodyColumnGain + camDist * underside * (1.0 - waterDraw.words.y);
  var transmittance = vec3<f32>(0.0, 0.0, 0.0);
  var floorTransmittance = vec3<f32>(0.0, 0.0, 0.0);
  if (water.depthPipelineMix > 0.001) {
    transmittance = exp2(-water.extinction * max(columnForOptics, 0.0));
    let murkClear = exp2(-water.murkExtinction * columnForOptics);
    floorTransmittance = transmittance * murkClear;
  }`);else V.push(`  let transmittance = vec3<f32>(0.0, 0.0, 0.0);
  let floorTransmittance = vec3<f32>(0.0, 0.0, 0.0);`);V.push(G4);let G=`
  let causticSunRadiance = passLights.sunColor * passLights.sunIntensity;
  let sourceSunDirection = water_sourceDirection(passLights.sunDirection);
  var causticGain = vec3<f32>(0.0);
  if (water.causticsMix > 0.001 && sourceSunDirection.y > 0.0 && causticSunRadiance.r + causticSunRadiance.g + causticSunRadiance.b > 0.0 && water.causticStrength != 0.0) {
  let causticReceiverDx = dpdx(sceneRenderPosition);
  let causticReceiverDy = dpdy(sceneRenderPosition);
  let causticReceiverCross = cross(causticReceiverDx, causticReceiverDy);
  let causticReceiverNormal = causticReceiverCross * inverseSqrt(max(dot(causticReceiverCross, causticReceiverCross), 1e-12))
    * select(-1.0, 1.0, dot(causticReceiverCross, frame.cameraPosition - sceneRenderPosition) >= 0.0);
    let causticDepthIn = smoothstep(0.05, 0.6, waterColumnDepth);
    let causticDepthOut = 1.0 - smoothstep(1.5, water.depthColorDistance * 1.6, waterColumnDepth);
    let sunUp = clamp(sourceSunDirection.y, 0.0, 1.0) * passLights.sunIntensity;
    let causticVisibility = causticDepthIn * causticDepthOut * min(sunUp * 2.0, 1.0) * hasDepthHit * levelFace;
    let causticReceiver = mix(in.positionWorld - vec3<f32>(0.0, 1.0, 0.0), sceneWorldPosition, hasDepthHit);
    let causticSurfaceXZ = water_causticSurfacePoint(causticReceiver, in.positionWorld.y, sourceSunDirection);
    let causticReceiverRender = mix(in.sourcePositionRender - vec3<f32>(0.0, 1.0, 0.0), water_sourceRender(sceneRenderPosition), hasDepthHit);
    let causticSurfaceRender = water_causticSurfacePoint(causticReceiverRender, in.sourcePositionRender.y, sourceSunDirection);
    let causticSurfaceDx = dpdx(causticSurfaceRender) * (water.causticScale * 1.7);
    let causticSurfaceDy = dpdy(causticSurfaceRender) * (water.causticScale * 1.7);
    if (waterDraw.words.x <= 0.5 && causticVisibility != 0.0 && floorVisibility != 0.0 && shoreEdgeKeep != 0.0 && any(floorTransmittance != vec3<f32>(0.0))) {
      let receiverShadow = ${K!==null?"1.0":"lighting_cascadeShadowPrepared(sceneRenderPosition, causticReceiverDx, causticReceiverDy, causticReceiverNormal, lighting_viewDepth(sceneRenderPosition), in.position.xy)"};
      let receiverGain = causticVisibility * receiverShadow * water.causticStrength * abs(dot(causticReceiverNormal, passLights.sunDirection));
      if (receiverGain != 0.0) {
        var causticPattern = vec3<f32>(0.0);
${LY()}
        causticGain = causticPattern * receiverGain;
      }
    }
  }`;let D=nY($,J,X);if(V.push(D.source),j$($)&&!J)V.push(G);V.push(lY(J,D.foamNormal,D.foamAlbedo,Z,q,Y,D.bodyRoughness,K));V.push("  var surfaceColor = lit + water.emissiveColor;");V.push(...SY($));V.push(...tY($.causticClass));V.push(...rY($,K));let M=($.refractionEnabled&&$.depthPipelineEnabled?` else if (hasDepthHit > 0.5) {
    let floorShare = dot(floorTransmittance, vec3<f32>(0.2126, 0.7152, 0.0722)) * (1.0 - fresnel) * (1.0 - foamVisible);
    let coverage = 1.0 - floorShare;
    surfaceColor = min(surfaceColor / coverage, vec3<f32>(65504.0));
    alpha = coverage * shoreEdgeKeep;
  }`:"")+eY($);let C=`${z}
    surfaceColor = underMirrorLit * underMirrorShare + underLit * underBodyWeight + lit * transmittance * foamVisible + water.emissiveColor;
    alpha = mix(opacityWithFoam, 1.0, fresnelBelow);`;if(j$($)&&J)V.push(G);return V.push(`${j$($)?`  let refracting = water.refractionMix > 0.001;
  if (refracting) {
    exitBackdrop = textureSampleLevel(waterSceneColorTex, waterClampSampler, depthUV, 0.0).rgb;
    exitKeep = shoreEdgeKeep;
  }
  var alpha = select(opacityWithFoam * shoreEdgeKeep, mix(opacityWithFoam, 1.0, refractiveTransmissionActive), refracting);
  if (underside > 0.5) {
${C}
    if (refracting) {
    let underSceneDistance = select(200.0, length(sceneWorldPosition - in.positionWorld), hasDepthHit > 0.5);
    let underClip = water_clipOf(in.positionRender + underRefractDir * underSceneDistance);
    let underUvRaw = (underClip.xy / max(underClip.w, 1e-3)) * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
    let underUv = select(depthUV, clamp(underUvRaw, vec2<f32>(0.0), vec2<f32>(1.0)), underClip.w > 1e-3 && fresnelBelow < 1.0);
    let underTapDepth = water_sceneDepth(underUv);
    let underTapSubmerged = underTapDepth > ${_} && water_worldFromUvDepth(underUv, underTapDepth).y < in.positionWorld.y - 0.05;
    let windowUv = select(underUv, depthUV, underTapSubmerged);
    let windowBackdrop = textureSampleLevel(waterSceneColorTex, waterClampSampler, windowUv, 0.0).rgb;
    surfaceColor += windowBackdrop * transmittance * underWindowShare;
    alpha = 1.0;
    }
  } else if (refracting) {
    surfaceColor = surfaceColor + exitBackdrop * floorTransmittance * (1.0 + causticGain) * floorVisibility;
  }`:`  var alpha = opacityWithFoam * shoreEdgeKeep;
  if (underside > 0.5) {
${C}
  }`}${M}
  exitColor = surfaceColor;
  exitDist = camDist;
  exitUnder = underside;
  exitAlpha = alpha;
  }
  ${X4(K4("vec4<f32>(water_eyeMedium(mix(exitBackdrop, shade_applyFog(exitColor, viewZ, -toCamera), exitKeep), exitDist, exitUnder), exitAlpha)",B),Q)}
}`),V.join(`
`)}var F8="fsFirstSight",JX=`fn water_floorFog(color: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  let factor = shade_depthFactor(viewZ, toward);
  let aerial = shade_aerialPerspective(color, viewZ);
  let unit = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
  return ${b2("mix(aerial, shade_fogLean(unit, shade_fogTurn(unit)), factor)")};
}`;function QX($,J=v0(),Q=!1,Z=null){let{head:q,vertex:Y,fragment:X}=k4($,J,Q,Z);return`${L0([...q,Y[Y.length-1],...X])}
`}function F4($,J=v0(),Q=!1,Z=null,q=!1){let{head:Y,vertex:X,fragment:K}=k4($,J,Q,Z);return{vertex:`${L0(X)}
`,fragment:`${L0([...Y,...K,...q?[J8($,Q)]:[]])}
`}}var D4=($)=>[Q7.trim(),F$,I2,...$?[S2,"struct WaterOutput { @location(0) color: vec4<f32>, @location(1) motion: vec4<f32> }"]:[]],C4=($)=>$?J7.replace(`
}`,`
  @location(10) currentClip: vec4<f32>,
  @location(11) previousClip: vec4<f32>,
}`):J7;function k4($,J,Q,Z){let q=qX($,J.preparedEvaluation)?v2(J.evaluateDefs??"","in.positionRender","N"):{defs:J.evaluateDefs??"",read:""};let Y=k$($);let X=D4(Q);let K=E2.source.trim();let j=[J.wgslDefs,P2,q.defs,K];let z=K9+($.loop===!0?cJ:pJ);let V=[$.loop===!0?LJ:SJ,m2];let B=[j9,C$,$4(),C4(Q),...Q?[gY]:[],N6(Z??W6),q4];let U=[...X,...j,z,...V,...B,...Y?[pY(Y,a2($))]:[],j4];let H=[...U,...z4(U.join(`
`)),V4];let G=[$X($,J.preparedEvaluation,Q,J.readsGeometryNormal===!0,q.read,J.readsAttribute===!0,Boolean(J.programKey),q9(J)?J:null),...V7($)?[N4()]:[]];return{head:H,vertex:[...X,K,z,...B,uY(Q)],fragment:[e2([...H,...G].join(`
`)),...G]}}var D8="fsFloorTint",W4={color:{srcFactor:"zero",dstFactor:"src",operation:"add"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}},C8=($)=>$.refractionEnabled&&V7($);function k8($,J,Q=!1,Z=!1,q=null,Y=!1){let X=q!==null,K=[...D4(J),R2(Z),C$,$4(),C4(J),...X?[N6(q)]:[],q4,j4,...Q?[JX]:[],...Y?[j9]:[]];if(!Q||Z)K.push(...z4(K.join(`
`)),V4);let j=[J8($,J,Q,Z,!1,X,Y?ZX:void 0),...Z&&C8($)?[J8($,J,Q,Z,!0,X)]:[],...Q&&V7($)?[c2,N4(X)]:[]];return`${L0([...K,e2([...K,...j].join(`
`)),...j])}
`}var ZX=`  let waveTime = frame.worldTime;
${H4}
  var tilt = vec3<f32>(0.0);
  if (water.swellAmplitude > 0.0) {
    let sw = ${U4};
    tilt = vec3<f32>(-sw.slope.x, 0.0, -sw.slope.y) * water.waveHeightScale;
  }
  let waveUp = select(up, water_guestDirection(water_safeNormalize(lookWave.normal + tilt, vec3<f32>(0.0, 1.0, 0.0))), faceLevel);`;function J8($,J,Q=!1,Z=!1,q=!1,Y=!1,X="  let waveUp = up;"){let K=$.blended===!0,j=!Q||Z;return`@fragment fn ${q&&D8||(Q?"fs":F8)}(lume_in: WaterVaryings, ${D9}) -> ${q?"@location(0) vec4f":Y4(J)} {
${G8}
${C9(K,Y)}
  let sourceToCamera = water_sourceDirection(toCamera);
${M8}
  let camDist = max(length(toCamera), 1e-4);
  let up = water_guestDirection(vec3f(0.0, 1.0, 0.0));
${X}
  let N = select(waveUp, -waveUp, underside > 0.5);
  let V = toCamera / camDist;
  let fresnel = 0.02 + 0.98 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);
  let screenUV = in.position.xy / frame.viewportSize;
  var column = ${$9};
  var hasDepthHit = 0.0;
  let columnSeen = select(0.0, 1.0, ${$.depthPipelineEnabled} && textureDimensions(waterSceneDepthTex).x > 1u && underside < 0.5);
  if (columnSeen > 0.5) {
    let sceneDepth = water_sceneDepth(screenUV);
    if (sceneDepth > ${_}) {
      column = length(water_worldFromUvDepth(screenUV, sceneDepth) - in.positionWorld);
      hasDepthHit = 1.0;
    }
  }
  var transmittance = vec3f(0.0);
  var floorTransmittance = vec3f(0.0);
  if (water.depthPipelineMix > 0.001 && columnSeen > 0.5) {
    let path = column * water.bodyColumnGain;
    transmittance = exp2(-water.extinction * path);
    floorTransmittance = transmittance * exp2(-water.murkExtinction * path);
  }
${G4}
  let sunRadiance = passLights.sunColor * passLights.sunIntensity;
  let L = passLights.sunDirection;
  let body = waterColor${$.refractionEnabled?" * (1.0 - floorTransmittance)":""} * (lighting_indirectIrradiance(waveUp) + sunRadiance * max(dot(waveUp, L), 0.0)${Z?" + lighting_wrapClusteredIrradiance(waveUp, in.positionRender, in.position.xy, 0.0)":""}) * 0.31830988618;
  let mirrorRay = water_sourceDirection(${j?`select(reflect(-V, N), refract(-V, N, ${F(z8)}), underside > 0.5)`:"reflect(-V, N)"});
  let skyRay = normalize(vec3f(mirrorRay.x, max(mirrorRay.y, 0.02), mirrorRay.z));
  let sky = ${j?"shade_fogSky":"shade_fogLean"}(skyRay, shade_fogTurn(skyRay));
  let roughness = max(water.baseRoughness, 0.03);
  let shininess = 2.0 / (roughness * roughness * roughness * roughness) - 2.0;
  let glint = sunRadiance * passLights.iblParams.z * (pow(max(dot(N, normalize(L + V)), 0.0), shininess) * (shininess + 2.0) * 0.125) * fresnel * max(dot(N, L), 0.0);
  var surfaceColor = select(body * (1.0 - fresnel) + sky * fresnel + glint, ${j?"mix(sky, body, water_fresnelBelow(clamp(dot(N, V), 0.0, 1.0)))":"body"}, underside > 0.5) + water.emissiveColor;
  var alpha = clamp(water.surfaceOpacity, 0.0, 1.0);
  if (underside > 0.5) {
    alpha = 1.0;
  }${$.refractionEnabled&&$.depthPipelineEnabled?` else if (hasDepthHit > 0.5) {
    let coverage = 1.0 - dot(floorTransmittance, vec3f(0.2126, 0.7152, 0.0722)) * (1.0 - fresnel);
    surfaceColor = min(surfaceColor / coverage, vec3f(65504.0));
    alpha = coverage;
  }`:""} else if (columnSeen > hasDepthHit) {
    alpha = 1.0;
  }
  let toward = -toCamera;${q?`
  let floorShare = floorTransmittance * (1.0 - fresnel);
  let floorGrey = dot(floorShare, vec3f(0.2126, 0.7152, 0.0722));
  let floorTint = select(vec3f(1.0), floorShare / max(floorGrey, 1e-4), hasDepthHit > 0.5 && underside < 0.5 && floorGrey > 1e-4);
  let tintShow = select(fadeShow * (1.0 - shade_depthFactor(viewZ, toward)), 0.0, ${K?"waterCut":"false"});
  return vec4f(mix(vec3f(1.0), floorTint, tintShow), 1.0);
}`:`
  let fogged = ${j?`water_eyeMedium(${Q?"water_floorFog":"shade_applyFog"}(surfaceColor, viewZ, toward), camDist, underside)`:"water_floorFog(surfaceColor, viewZ, toward)"};
  ${X4(K4("vec4f(fogged, alpha)",K),J)}
}`}`}var V7=($)=>$.blended===!0&&$.depthPipelineEnabled;function N4($=!0){return`
fn water_floorBeside(pixelUv: vec2<f32>, stepUv: vec2<f32>, reach: f32, surfaceY: f32) -> vec2<f32> {
  var found = vec2<f32>(0.0, 0.0);
  if (reach < 1.0) { return found; }
  let steps = min(u32(ceil(log2(reach))) + 1u, 32u);
  for (var i = 0u; i < steps; i = i + 1u) {
    let span = min(f32(1u << i), reach);
    let uv = pixelUv + stepUv * span;
    let depth = water_sceneDepth(uv);
    if (depth > ${_}) {
      if (water_worldFromUvDepth(uv, depth).y < surfaceY) {
        found = vec2<f32>(span, depth);
        break;
      }
    } else if (water_sourceDirection(water_renderFromUvDepth(uv, 0.5) - water_renderFromUvDepth(uv, 1.0)).y >= 0.0) {
      found = vec2<f32>(-1.0, 0.0);
      break;
    }
    if (span >= reach) { break; }
  }
  return found;
}
fn water_floorBetween(a: vec2<f32>, b: vec2<f32>) -> f32 {
  return (a.y * b.x + b.y * a.x) / (a.x + b.x);
}
@fragment fn ${J9}(lume_in: WaterVaryings, ${D9}) -> @builtin(frag_depth) f32 {
  water_fragmentRow(lume_in.slot);
  var in: WaterVaryings = lume_in;
  in.positionRender = lume_in.positionRender + lume_eyeAnchor();
  in.sourcePositionRender = lume_in.sourcePositionRender + water_sourceAnchor();
${C9(!0,$)}
  if (waterCut || fadeShow < ${x2.toFixed(2)}) { discard; }
  let sourceToCamera = water_sourceDirection((frame.cameraPosition - lume_eyeAnchor()) - lume_in.positionRender);
${M8}
  if (underside > 0.5 || water.depthPipelineMix <= 0.001 || textureDimensions(waterSceneDepthTex).x <= 1u) { discard; }
  let pixelUv = in.position.xy / frame.viewportSize;
  let sceneDepth = water_sceneDepth(pixelUv);
  let pixelRay = water_safeNormalize(water_renderFromUvDepth(pixelUv, 0.5) - water_renderFromUvDepth(pixelUv, 1.0), in.positionRender - frame.cameraPosition);
  let columnClip = frame.viewProj * vec4<f32>(in.positionRender + pixelRay * (${$9}), 1.0);
  let columnDepth = columnClip.z / max(columnClip.w, 1e-6);
  var floorDepth = sceneDepth;
  if (sceneDepth <= ${_}) {
    floorDepth = columnDepth;
    let rowStep = vec2<f32>(0.0, 1.0 / frame.viewportSize.y);
    let colStep = vec2<f32>(1.0 / frame.viewportSize.x, 0.0);
    let toFirst = in.position.xy - vec2<f32>(0.5);
    let toLast = frame.viewportSize - vec2<f32>(0.5) - in.position.xy;
    let above = water_floorBeside(pixelUv, -rowStep, toFirst.y, in.positionWorld.y);
    if (above.x >= 0.0) {
      var below = vec2<f32>(0.0, 0.0);
      if (above.x > 0.0) { below = water_floorBeside(pixelUv, rowStep, toLast.y, in.positionWorld.y); }
      if (above.x > 0.0 && below.x > 0.0) {
        floorDepth = water_floorBetween(above, below);
      } else if (below.x >= 0.0) {
        let left = water_floorBeside(pixelUv, -colStep, toFirst.x, in.positionWorld.y);
        if (left.x > 0.0) {
          let right = water_floorBeside(pixelUv, colStep, toLast.x, in.positionWorld.y);
          if (right.x > 0.0) { floorDepth = water_floorBetween(left, right); }
        }
      }
    }
  }
  floorDepth = clamp(floorDepth, 0.0, in.position.z);
  let floorInColumn = length(water_worldFromUvDepth(pixelUv, floorDepth) - in.positionWorld) <= ${$9};
  if (floorInColumn && sceneDepth > ${_}) { discard; }
  return clamp(select(columnDepth, floorDepth, floorInColumn), 0.0, in.position.z);
}`}function qX($,J){return J?J.usesSun:!j$($)}function YX(a){return (YX=$c0C(17)).call(this,a)}function O4($,J=v0(),Q=!1,Z=null){return`${QX($,J,Q,Z)}
${YX($)}
`}var XX=1.4;function KX($,J){let Q=0;for(let Z=0;Z<$.length;Z+=1)Q=Math.max(Q,Math.abs($[Z].params.underwaterDistortion));return Q>0?Math.ceil(XX*Q*J/64)+1:0}function jX($){let J=A$();return{frameLayout:$.getBindGroupLayout(z7,"lume frame"),depthIsFloat:J>1,causticClass:W9(k9().tier),targetSamples:J}}var b8=16;function x8(a){return (x8=$c0C(18)).call(this,a)}function I4($,J,Q,Z,q=0,Y=0){let{extinction:X,scatter:K}=R7(I0(J.underwaterColor),J.underwaterVisibility,Math.fround(0.7)*Math.fround(J.underwaterScatter),0);$.set(X,0),$[3]=J.underwaterVisibility,$[4]=J.underwaterDepth,$[5]=K[0],$[6]=J.underwaterDistortion,$[7]=Math.sign(U7(Z,Q.normal)),$[8]=Q.vertexCount,$[9]=q,$[10]=K[1],$[11]=K[2],$[12]=Y,$.set(J.flowDirection,14)}var S4=`struct WaterMediumUniforms {
  extinction: vec3<f32>,
  visibility: f32,
  depth: f32,
  scatterR: f32,
  distortion: f32,
  orientation: f32,
  vertexCount: f32,
  instanceIndex: f32,
  scatterGB: vec2<f32>,
  slot: f32,
  flow: vec2<f32>,
};`,L4=`${S4}
@group(2) @binding(0) var<uniform> water: WaterUniforms;
@group(2) @binding(1) var<uniform> medium: WaterMediumUniforms;
@group(3) @binding(0) var waterRows: texture_2d<f32>;
@group(3) @binding(1) var waterVertices: texture_2d<u32>;
${B9}
`;function P8(a){return (P8=$c0C(19)).apply(this,arguments)}var R4=`@fragment fn fs(in: WaterVaryings, @builtin(front_facing) front: bool) -> @location(0) vec4<f32> {
  let uv = in.position.xy / frame.viewportSize;
  let depth = water_mediumDepth(vec2<i32>(in.position.xy));
  let near = water_mediumRender(uv, 1.0 - ${_});
  let scene = water_mediumRender(uv, depth);
  let far = water_mediumRender(uv, ${_});
  let ray = normalize(far - near);
  let faceDistance = dot(in.positionRender - near, ray);
  let sceneDistance = max(dot(scene - near, ray), 0.0);
  let distance = max(0.0, min(faceDistance, sceneDistance));
  let sign = select(1.0, -1.0, front) * medium.orientation;
  let receiverScale = max(max(abs(faceDistance), sceneDistance), max(abs(scene.x), max(abs(scene.y), abs(scene.z))));
  let receiverTolerance = 0.000003814697265625 * max(receiverScale, 1.0);
  return vec4<f32>(distance * sign, sign, in.channel.x * sign, select(0.0, sign, faceDistance + receiverTolerance >= sceneDistance));
}`;function VX(a){return (VX=$c0C(20)).apply(this,arguments)}function zX(a,b){return (zX=$c0C(21)).apply(this,arguments)}function BX($,J=1,Q=!1){let q=`vec3<f32>(water_causticsPrepared(causticDomain, frame.time * 0.6, causticDx, causticDy) * ${X9})`;return L0([Q7,F$,x4(1),P4(),Q9,Z9,C$,L4,P8($,2,2,J,Q),K9,A4,`@group(2) @binding(3) var mediumVolume: texture_2d<f32>;
@group(2) @binding(4) var mediumSceneColor: texture_2d<f32>;
@group(2) @binding(5) var mediumSampler: sampler;
`,y4,`
@fragment fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  let pixel = vec2<i32>(position.xy);
  let size = vec2<f32>(textureDimensions(mediumVolume));
  let uv = position.xy / size;
  let sourceVolume = textureLoad(mediumVolume, pixel, 0);
  let sourceImmersed = clamp(sourceVolume.y, 0.0, 1.0);
  let sourceDistance = max(sourceVolume.x, 0.0) * sourceImmersed;
  var sceneUv = uv;
  var volume = sourceVolume;
  if (sourceDistance > 0.0 && medium.distortion != 0.0) {
    let shift = water_underwaterDistortion(uv, frame.time, sourceDistance, medium.visibility, medium.distortion) * (size.y / 64.0) / size;
    let shiftedUv = clamp(uv + shift, vec2<f32>(0.5) / size, vec2<f32>(1.0) - vec2<f32>(0.5) / size);
    let shiftedVolume = textureSampleLevel(mediumVolume, mediumSampler, shiftedUv, 0.0);
    let distortionInside = 1.0 - abs(clamp(shiftedVolume.y, 0.0, 1.0) - sourceImmersed);
    sceneUv = mix(uv, shiftedUv, distortionInside);
    volume = mix(sourceVolume, shiftedVolume, distortionInside);
  }
  let immersed = clamp(volume.y, 0.0, 1.0);
  let distance = max(volume.x, 0.0) * immersed;
  let scenePixel = vec2<i32>(sceneUv * size);
  let depth = water_mediumDepth(scenePixel);
  let hasHit = select(0.0, 1.0, depth > ${_});
  let scenePoint = water_mediumRender(sceneUv, depth);
  let receiver = mix(frame.cameraPosition - vec3<f32>(0.0, 1.0, 0.0), scenePoint, hasHit);
  let dx = dpdx(receiver);
  let dy = dpdy(receiver);
  let crossed = cross(dx, dy);
  let receiverNormal = crossed * inverseSqrt(max(dot(crossed, crossed), 1e-12))
    * select(-1.0, 1.0, dot(crossed, frame.cameraPosition - receiver) >= 0.0);
  let surfaceY = frame.cameraPosition.y + volume.z / max(volume.y, 1.0);
  let causticSurfaceRender = water_causticSurfacePoint(receiver, surfaceY, passLights.sunDirection);
  let causticScale = 1.7 * water.causticScale;
  let causticDrift = medium.flow * (frame.time * (0.05 + water.flowSpeed * 0.4));
  let causticDomain = (causticSurfaceRender + frame.renderOrigin.xz) * causticScale - causticDrift;
  let causticDx = dpdx(causticSurfaceRender) * causticScale;
  let causticDy = dpdy(causticSurfaceRender) * causticScale;
  if (immersed <= 0.0 || distance <= 0.0) {
    return vec4<f32>(textureLoad(mediumSceneColor, pixel, 0).rgb, 1.0);
  }
  let column = max(surfaceY - receiver.y, 0.0);
  let receiverInWater = hasHit * clamp(volume.w, 0.0, 1.0) * smoothstep(0.03, 0.18, column) * immersed;
  let T = exp2(-medium.extinction * distance);
  let light = (lighting_indirectIrradiance(vec3<f32>(0.0, 1.0, 0.0)) + passLights.sunColor * passLights.sunIntensity * max(passLights.sunDirection.y, 0.0)) * 0.31830988618;
  let scatter = vec3<f32>(medium.scatterR, medium.scatterGB) * light;
  let causticSunRadiance = passLights.sunColor * passLights.sunIntensity;
  var causticGain = vec3<f32>(0.0);
  if (water.causticsMix > 0.001 && receiverInWater > 0.0 && passLights.sunDirection.y > 0.0 && causticSunRadiance.r + causticSunRadiance.g + causticSunRadiance.b > 0.0 && water.causticStrength != 0.0) {
    let shadow = lighting_cascadeShadowPrepared(receiver, dx, dy, receiverNormal, lighting_viewDepth(receiver), position.xy);
    let surfaceFacing = abs(dot(receiverNormal, passLights.sunDirection));
    let gain = receiverInWater * shadow * water.causticStrength * max(passLights.sunDirection.y, 0.0) * min(passLights.sunIntensity * 2.0, 1.0) * surfaceFacing;
    if (gain != 0.0) {
      let pattern = ${q};
      let lightDown = exp2(-medium.extinction * (column / max(passLights.sunDirection.y, 0.15)));
      causticGain = pattern * gain * lightDown;
    }
  }
  let scene = textureSampleLevel(mediumSceneColor, mediumSampler, sceneUv, 0.0).rgb;
  let color = water_medium(scene * (vec3<f32>(1.0) + causticGain), T, scatter);
  return vec4<f32>(color, 1.0);
}
`])}function HX(a,b,c){return (HX=$c0C(22)).call(this,a,b,c)}function MX(a){return (MX=$c0C(23)).call(this,a)}function FX(){return (FX=$c0C(24)).call(this)}function N9($,J,Q){if($.named===Q)return;$.named=Q,$.ask.label=`${J}${Q}`}function kX(a,b,c,d){return (kX=$c0C(25)).call(this,a,b,c,d)}function WX(a,b,c){return (WX=$c0C(26)).call(this,a,b,c)}function NX(a,b,c,d,e){return (NX=$c0C(27)).call(this,a,b,c,d,e)}function OX(a,b,c,d,e,f,g){return (OX=$c0C(28)).call(this,a,b,c,d,e,f,g)}class h4{constructor($,J){this.device=void 0;this.pipelines=void 0;this.volume=null;this.outputs=[null,null];this.volumeAsk={label:"lume water path",width:1,height:1,format:"rgba16float"};this.outputAsks=[0,1].map(($)=>({label:`lume underwater ${$}`,width:1,height:1,format:"rgba16float",usage:16|4|1}));this.groups=[];this.joins=[];this.joinsFrame=-1;this.joinsTaken=0;this.sampler=void 0;this.built=null;this.device=$;this.pipelines=J;this.sampler=$.createSampler({label:"lume underwater clamp",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear"})}builtPipelines(a){return $c0P($c0C(29),h4.prototype,"builtPipelines").call(this,a)}getPipelines(a){return $c0P($c0C(30),h4.prototype,"getPipelines").call(this,a)}getScriptedVolume(a,b){return $c0P($c0C(31),h4.prototype,"getScriptedVolume").call(this,a,b)}pending($,J=[]){return MX(this.pipelinesAsked($,J))}pipelinesAsked($,J){let{volume:Q,medium:Z,mediumInto:q}=this.getPipelines($);return[Q,Z,...q?[q]:[],...J.flatMap((Y)=>Y.vertex?[this.getScriptedVolume($,Y.vertex).handle]:[])]}declareInto($,J){let Q=this.getPipelines($);if(Q.medium.pipeline===null||($.targetSamples??1)>1&&(Q.mediumInto?.pipeline??null)===null)return!1;return this.declare($,J),!0}declare($,J,Q=null){let{source:Z}=$,q=B7();if(J.length===0){if(this.builtPipelines($)===null)this.askAhead($);if(q!==this.joinsFrame||this.joinsTaken===0)this.release(Q);return Z}let Y=this.getPipelines($),X=Y.medium.pipeline,K=$.into??null,j=($.targetSamples??1)>1?Y.mediumInto?.pipeline??null:X,z=K===null?null:j;if(q!==this.joinsFrame)this.joinsFrame=q,this.joinsTaken=0;let V=this.joinsTaken,B=this.joinsOf($,J,Y,V);if(this.joinsTaken=V+B,X===null||K!==null&&z===null)return Z;let U=Z;for(let H=0;H<B;H+=1){let G=H===B-1?z:null;U=this.declareJoin($,Y,this.joins[V+H],U,H,G===null?null:K,G??X)}return U}askAhead($){this.pipelines.namedDrawScope(()=>this.pipelines.warmScope(()=>this.getPipelines($),"late"))}joinsOf(a,b,c,d){return $c0P($c0C(32),h4.prototype,"joinsOf").call(this,a,b,c,d)}declareJoin(a,b,c,d,e,f,g){return $c0P($c0C(33),h4.prototype,"declareJoin").call(this,a,b,c,d,e,f,g)}prepareVolumeDraw(a,b,c,d){return $c0P($c0C(34),h4.prototype,"prepareVolumeDraw").call(this,a,b,c,d)}volumeDrawGroup($,J,Q){$.rows=WX($.rows,Q,J);return this.pipelines.getBindGroup($.rows.ask)}release($=null){this.volume=N8(this.volume);for(let J=0;J<2;J+=1)if(this.outputs[J]?.texture!==$)this.outputs[J]=N8(this.outputs[J])}}var E4=1;function m4(){return (m4=$c0C(35)).call(this)}var bX=function($,J){let Q=[],Z=0;for(let q=0;q<J.planeEnds.length;q++){let Y=J.planeEnds[q];Q.push({entityId:$,value:J,piece:q,planeFirst:Z,planeCount:Y-Z,derivedAt:-1,tested:!1,inverse:new Float32Array(12),sphere:new Float32Array(4),lowY:0,slot:-1}),Z=Y}return Q};function PX($,J,Q,Z,q,Y,X){let[K,j,z,V]=Y,B=K+K,U=j+j,H=z+z,G=1-(j*U+z*H),D=K*U+V*H,M=K*H-V*U,C=K*U-V*H,W=1-(K*B+z*H),k=j*H+V*B,O=K*H+V*U,P=j*H-V*B,T=1-(K*B+j*U),S=q[0],v=q[1],w=q[2],d=1/X[0],i=1/X[1],J0=1/X[2];$[0]=G*d,$[1]=D*d,$[2]=M*d,$[3]=-(G*S+D*v+M*w)*d,$[4]=C*i,$[5]=W*i,$[6]=k*i,$[7]=-(C*S+W*v+k*w)*i,$[8]=O*J0,$[9]=P*J0,$[10]=T*J0,$[11]=-(O*S+P*v+T*w)*J0;let o=Q.spheres,g=o[Z*4]*X[0],I=o[Z*4+1]*X[1],Q0=o[Z*4+2]*X[2];J[0]=S+G*g+C*I+O*Q0,J[1]=v+D*g+W*I+P*Q0,J[2]=w+M*g+k*I+T*Q0,J[3]=o[Z*4+3]*Math.max(Math.abs(X[0]),Math.abs(X[1]),Math.abs(X[2]));let V0=1/0,F0=Q.corners;for(let c0=Z===0?0:Q.cornerEnds[Z-1];c0<Q.cornerEnds[Z];c0++){let v7=v+D*F0[c0*3]*X[0]+W*F0[c0*3+1]*X[1]+P*F0[c0*3+2]*X[2];if(v7<V0)V0=v7}return V0}function TX($,J,Q,Z){let q=J.tested;J.tested=!1;if((J.value.key.startsWith("air:")||w4($,J.entityId)!==0&&_4($,J.entityId,Z))&&r0($,J.entityId)&&P9($,J.entityId)!==-1){let Y=G7($,J.entityId),X=Y.scale;if(X[0]!==0&&X[1]!==0&&X[2]!==0){J.lowY=PX(J.inverse,J.sphere,J.value,J.piece,u4($,J.entityId,Y),Y.rotation,X);for(let K of Q.values()){let v$2;{let $$4=J.sphere,J$4=K.holdBounds;{let $=$$4,J=J$4;let Q=$[3];v$2=$[0]+Q>=J[0]&&$[0]-Q<=J[3]&&$[1]+Q>=J[1]&&$[1]-Q<=J[4]&&$[2]+Q>=J[2]&&$[2]-Q<=J[5];}}if(!v$2)continue;J.tested=!0;break}}}return J.tested!==q}function p4($,J,Q){let Z=k6+J.slot*h7;$.set(J.inverse,Z),$.set(J.sphere,Z+12),$[Z+16]=Q,$[Z+17]=J.planeCount,$[Z+18]=J.lowY,$[Z+19]=J.value.ground===!0?1:0}function AX(a,b,c){return (AX=$c0C(36)).call(this,a,b,c)}function IX($,J){if(J.queue!==null)x9($,J.queue);J.queue=null,J.byEntity.clear(),J.holds.length=0,J.fresh.length=0,J.moved.length=0,J.picked.length=0,J.block[0]=0,J.layoutOwed=!1}var SX=[];function LX(a,b,c,d,e,f){return (LX=$c0C(37)).call(this,a,b,c,d,e,f)}function y8($,J,Q,Z){for(let q=0;q<Q.length;q+=1){let Y=Q[q];if(Y.derivedAt===J.prepares)continue;Y.derivedAt=J.prepares;if(TX($,Y,Z,J.eyeLayers))J.layoutOwed=!0;J.moved.push(Y)}}function vX($,J){return $.overfull&&H7(J,$.pickedEye)>E4*E4}function RX(a,b,c,d){return (RX=$c0C(38)).call(this,a,b,c,d)}function c4(a,b,c,d,e,f,g){return (c4=$c0C(39)).call(this,a,b,c,d,e,f,g)}function d4($,J,Q,Z){for(let q of $.picked){if(!(q.lowY>Q)||q.value.ground===!0&&!Z)continue;let Y=q.sphere;if(H7(J,Y)>Y[3]*Y[3])continue;let X=q.inverse,K=X[0]*J[0]+X[1]*J[1]+X[2]*J[2]+X[3],j=X[4]*J[0]+X[5]*J[1]+X[6]*J[2]+X[7],z=X[8]*J[0]+X[9]*J[1]+X[10]*J[2]+X[11],V=q.value.planes,B=!0;for(let U=q.planeFirst*4;U<(q.planeFirst+q.planeCount)*4&&B;U+=4)B=V[U]*K+V[U+1]*j+V[U+2]*z<=V[U+3];if(B)return!0}return!1}var i4=10;function hX(a,b){return (hX=$c0C(40)).call(this,a,b)}function l4($,J){return J===$||J===""?$:`${$} under ${J}`}function n4($,J,Q){return`(${$.toFixed(2)}, ${J.toFixed(2)}), ${Q.toFixed(1)} m from the eye`}var Y0=A0/B0;var N7=9;var EX=1;var v9=0.15;var s4=1.2;var _8=0.18;var L9=4;var fX=0.35;var C3=4;var _X=1.4;var wX=0.04;var gX=5;var uX=1.8;var mX=0.012;var k3=0.09;var pX=0.7;var cX=0.22;var dX=2.6;var lX=1;var nX=1;var iX=12;var aX=L*Y0/A6;var tX;;(function(){{let $=aX;let J=0;for(let Q=-h;Q<=h;Q++)for(let Z=-h;Z<=h;Z++)J+=m7(Q*Q+Z*Z)*Math.cos($*Z);tX=J;}})();var sX=aJ*2*i0/A6;var E=new Float64Array(4);function p8($,J){if(J!==null&&J!==void 0&&a(J))return Math.max(oX,Math.max(0,J)*D0/N7);if($===null||$===void 0||!a($))return D0;let Q=Math.min(1,Math.max(X$,$));return D0*Math.pow(2,(X$-Q)/tJ)}function W3($){if($===null||$===void 0||!a($)||$<=X$)return 0;return oJ*(Math.min(1,$)-X$)/(1-X$)}var oX;;(function(){{let $=v6;let J=0;for(let q=-h;q<=h;q++)for(let Y=-h;Y<=h;Y++)J+=m7(q*q+Y*Y)*((q+Y)%2===0?1:-1);let Q=8*L6*($/u7);let Z=(4-(sX*$*$/tX)*J-Q)/Q-I6*$;oX=2*$/Math.log2(1+Z);}})();function N3(){let $=[],J=new Float32Array(_6);return{queue:null,queueScene:null,seed:void 0,unheard:new Set,widest:0,unwatchBodies:null,bodies:new Map,bodyList:[],spareBodies:[],impacts:[],watch:({start:NaN,entries:0,entryHeight:0,entryWho:"",entryOwner:"",entryX:0,entryZ:0,entryEye:0,entryFall:0,foams:0,foam:0,foamWho:"",foamOwner:"",foamX:0,foamZ:0,foamEye:0,foamSpeed:0}),sources:Array.from({length:l0},()=>({nx:0,nz:0,nr:0,nw:0,bx:0,bz:0,br:0,bw:0,push:0,foam:0,fx:0,fz:0,distance:0,liquid:D0,who:"",speed:0,impact:null})),sourceCount:0,current:0,originCellX:0,originCellZ:0,originKnown:!1,active:!1,lastHeardSeconds:-1/0,lastFrameSeconds:NaN,prunedAt:0,clearOwed:!0,runs:new Uint32Array(p7),held:new Uint32Array(p7),runBox:[0,0,0,0],tileHalfLife:new Float32Array(y*y),tileFilter:new Float32Array(y*y),liquidHeard:[],liquidHeardCount:0,restAfterS:N7,read:0,readAt:0,stepBlock:J,stepWords:new Uint32Array(J.buffer),fragmentBlock:new Float32Array(r$),fragmentWritten:!1,boundShadeView:null,named:new Float64Array(T0*4),namedDistance:new Float64Array(T0),moverCount:0,stillCount:0,gpu:null,dispatches:$,computeDesc:{dispatches:$}}}var O3=[c(0,4,"unfilterable-float","2d"),f8(1,4,"rgba32float","2d"),E0(2,4,"uniform"),f8(3,4,"rgba16float","2d")],S$="lume water ripples step";function eX(a,b){return (eX=$c0C(41)).call(this,a,b)}function h9($,J){return $.gpu?.device===J?$.gpu:$K($,J)}function $K(a,b){return ($K=$c0C(42)).call(this,a,b)}function JK(a,b){return (JK=$c0C(43)).call(this,a,b)}function b3($){let J=$.field;if(J===null)return;if(J.states[0].destroy(),J.states[1].destroy(),$.field=null,$.dispatchRow!==null)$.dispatchRow.bindGroups[0]=null}function E9($){if($.queue&&$.queueScene)x9($.queueScene,$.queue);$.unwatchBodies?.(),$.unwatchBodies=null,$.queue=null,$.queueScene=null,$.seed=void 0,$.unheard.clear(),$.widest=0,$.bodies.clear(),$.bodyList.length=0,$.spareBodies.length=0,$.impacts.length=0,$.liquidHeardCount=0,$.active=!1}var R$=null,QK=new Float64Array(4);var A={area:0,x:0,z:0,depth:0,points:0,px:0,pz:0,level:NaN};var H0=new Float64Array(24);var O0=new Float64Array(24);var I$=[0,0,0,0,0,0,0,0,0,0,0,0];var T8=new Float64Array(12);var qK=function($,J,Q){let Z=A.level,q=($.min[0]+$.max[0])*0.5,Y=($.min[1]+$.max[1])*0.5,X=($.min[2]+$.max[2])*0.5,K=($.max[0]-$.min[0])*0.5,j=($.max[1]-$.min[1])*0.5,z=($.max[2]-$.min[2])*0.5,V=1/0,B=-1/0;for(let H=0;H<8;H++){let G=H&1?K:-K,D=H&2?j:-j,M=H&4?z:-z,C=q+G,W=Y+D,k=X+M,O=J[Q+1]*C+J[Q+5]*W+J[Q+9]*k+J[Q+13];H0[H*3]=J[Q]*C+J[Q+4]*W+J[Q+8]*k+J[Q+12],H0[H*3+1]=O-Z,H0[H*3+2]=J[Q+2]*C+J[Q+6]*W+J[Q+10]*k+J[Q+14],V=Math.min(V,O),B=Math.max(B,O)}if(V>=Z||B<=Z)return;A.depth=Math.max(A.depth,Z-V);let U=0;for(let H=0;H<8;H++)for(let G=1;G<=4;G<<=1){if(H&G)continue;let D=H|G,M=H0[H*3+1],C=H0[D*3+1];if(M<0===C<0)continue;let W=M/(M-C);O0[U*2]=H0[H*3]+(H0[D*3]-H0[H*3])*W,O0[U*2+1]=H0[H*3+2]+(H0[D*3+2]-H0[H*3+2])*W,U++}YK:{let $$9=U;{let $=$$9;let J=0,Q=0;for(let K=0;K<$;K++)J+=O0[K*2],Q+=O0[K*2+1];J/=$,Q/=$,A.px+=J,A.pz+=Q,A.points+=1;for(let K=0;K<$;K++){T8[K]=Math.atan2(O0[K*2+1]-Q,O0[K*2]-J);let j=K;while(j>0&&T8[I$[j-1]]>T8[K])I$[j]=I$[j-1],j--;I$[j]=K}let Z=0,q=0,Y=0;for(let K=0;K<$;K++){let j=I$[K],z=I$[(K+1)%$],V=O0[j*2]-J,B=O0[j*2+1]-Q,U=O0[z*2]-J,H=O0[z*2+1]-Q,G=V*H-U*B;Z+=G,q+=(V+U)*G,Y+=(B+H)*G}let X=Math.abs(Z)*0.5;if(X<=0.000000001)break YK;A.area+=X,A.x+=(J+q/(3*Z))*X,A.z+=(Q+Y/(3*Z))*X}}};var L$={x:0,z:0,cx:0,cz:0,radius:0,weight:0,bottom:0,x0:0,z0:0,x1:0,z1:0,inReach:!1,near:!1,liquid:NaN,level:NaN},KK={min:[0,0,0],max:[0,0,0]};function jK($,J,Q){let Z=L$;Z.x=0,Z.z=0,Z.cx=0,Z.cz=0,Z.radius=0,Z.weight=0,Z.bottom=0,Z.x0=Z.z0=Z.x1=Z.z1=0,Z.inReach=Z.near=!1,Z.liquid=NaN;let q=r0($,J)&&P9($,J)!==-1?F3($,J,KK):null;if(q===null)return Z;Z.x0=q.min[0],Z.z0=q.min[2],Z.x1=q.max[0],Z.z1=q.max[2],Z.x=Z.cx=(q.min[0]+q.max[0])*0.5,Z.z=Z.cz=(q.min[2]+q.max[2])*0.5;let Y=Math.max(Math.abs(Z.x-N[E$]),Math.abs(Z.z-N[f$]));if(Z.near=Y<=h$,Y>A0*0.5+L9)return Z;Z.inReach=!0;Z.bottom=q.min[1];let v$5;{let $$8=Q,J$7=Z,Q$3=q;{let $=$$8,J=J$7,Q=Q$3;let Z=QK;Z[0]=J.x,Z[1]=J.z,Z[3]=0;let q=Q.min[1],Y=Q.max[1];R$=null,E[0]=Z[0],E[1]=Z[1],E[2]=Z[0],E[3]=Z[1];let X=$.near(E),K=$.found;for(let j=0;j<X;j++){let z=K[j],V=z.bounds;if(Z[0]<V[0]||Z[0]>V[3]||Z[1]<V[2]||Z[1]>V[5])continue;if(z.field===null)Z[2]=z.restY;else if(!W7(z.field,z.transform,Z))continue;if(q>Z[2]+0.02||Y<Z[2]-fX)continue;if(R$===null||Z[2]>Z[3])Z[3]=Z[2],R$=z}v$5=(J.level=Z[3],R$!==null);}}if(!v$5||R$===null)return Z;Z.liquid=R$.halfLife;let X;XK:{let Q=Z;if(A.area=0,A.x=0,A.z=0,A.depth=0,A.points=0,A.px=0,A.pz=0,A.level=Q.level,!G3($,J,qK)){X=null;break XK;}if(A.area>0)A.x/=A.area,A.z/=A.area;else if(A.points>0)A.x=A.px/A.points,A.z=A.pz/A.points;X=A;}if(X===null)return Z.radius=Math.min(L9,Math.max(_8,Math.max(q.max[0]-q.min[0],q.max[2]-q.min[2])*0.5)),Z.weight=Math.min(s4,Math.max(0,Z.level-q.min[1]),Math.max(0,q.max[1]-q.min[1]))*v9,Z;if(X.points===0)return Z;return Z.x=X.x,Z.z=X.z,Z.radius=Math.min(L9,Math.max(_8,Math.sqrt(X.area/i0))),Z.weight=Math.min(s4,X.depth)*v9,Z}var VK=10;function w8($,J){let Q=J;for(let Z=J;;){let q=H3($,Z);if(q!==null){Q=Z=q.parentId;continue}let Y=M3($,Z);if(Y===null)return Q;Z=Y}}function T3(a,b,c){return (T3=$c0C(44)).call(this,a,b,c)}function zK($,J,Q,Z,q){let Y=$.spareBodies.pop()??({id:"",x:0.5,z:0.5,radius:0.5,weight:0.5,bottom:0.5,heardAt:0.5,pose:new Float64Array(VK),box:new Float64Array(4),stirred:!1,liquid:0.5,measured:!1});if(Y.id=Q,v$(Y,Z),Z.weight===0)Y.radius=_8,Y.liquid=D0;T3(J,Q,Y.pose);{let $=Z,J=q,Q=Y.box;Q[0]=$.x0+J[0],Q[1]=$.z0+J[2],Q[2]=$.x1+J[0],Q[3]=$.z1+J[2]}Y.stirred=!1;$.bodies.set(Q,Y);$.bodyList.push(Y)}function v$($,J,Q=!0){if($.x=J.x,$.z=J.z,Q)$.radius=J.radius;if($.weight=J.weight,$.bottom=J.bottom,$.heardAt=N[G0],J.weight>0)$.liquid=J.liquid;$.measured=Q}function UK(a,b,c,d){return (UK=$c0C(45)).call(this,a,b,c,d)}function HK(a,b,c){return (HK=$c0C(46)).call(this,a,b,c)}function I3($,J,Q,Z,q){let Y=N[G0];let X=N[g0];let K=$.bodies.get(Q);let j=jK(J,Q,Z);let {x:z,z:V,cx:B,cz:U,radius:H,weight:G,bottom:D,inReach:M,liquid:C}=j;let W=K!==void 0&&T3(J,Q,K.pose);if(K!==void 0){{let $=j,J=q,Q=K.box;Q[0]=$.x0+J[0],Q[1]=$.z0+J[2],Q[2]=$.x1+J[0],Q[3]=$.z1+J[2]}}if(!M){if(K)v$(K,j,!1);return}if(K===void 0){zK($,J,Q,j,q);return}if(G===0&&K.weight===0){v$(K,j);return}if(!K.measured||!W){v$(K,j);return}let k=K;if(k.weight===0)u[T9]=B-k.x,u[A8]=U-k.z;else u[T9]=z-k.x,u[A8]=V-k.z;k7(u,T9,1,u,r4);let O=u[T9],P=u[A8],T=u[r4];if(T>C3){v$(K,j);return}if(G>0&&k.weight>0&&O===0&&P===0&&G===k.weight&&H===k.radius){K.bottom=D,K.heardAt=Y;return}if(X>0)u[I8]=T/X;else u[I8]=0;let S=u[I8];if(G>0&&k.weight===0&&X>0){UK($,Q,k,j);}let v=Math.min(1,(S6*H/s$)**2);o4(j,u,e4);o4(k,u,$3);if(G>0)u[S8]=Math.max(0,S-_X)*wX*Math.min(1,u[e4]/(0.5*v9))*v*X*60;else u[S8]=0;let w=u[S8];if(T>0.0001)u[L8]=H*0.15/T;else u[L8]=0;let d=u[L8],i=z-O*d,J0=V-P*d,o=1/(1+S/gX),g=u[$3]*o;if(G>0)K.liquid=C;let I=L3;if(G>0)I.nx=z,I.nz=V,I.nr=H,I.nw=(G-k.weight)*o+g,I.bw=g;else I.nx=k.x,I.nz=k.z,I.nr=k.radius,I.nw=0,I.bw=k.weight*o;I.bx=k.x,I.bz=k.z,I.br=k.radius,I.push=0,I.foam=w,I.fx=i,I.fz=J0,I.liquid=K.liquid,I.who=Q,I.speed=S,I.impact=null,S3($,I),v$(K,j),K.stirred=!0}function o4($,J,Q){J[Q]=Math.min($.weight,Math.max($.radius,s$)/Math.sqrt(5)*v9)}function S3(a,b){return (S3=$c0C(47)).call(this,a,b)}var u=new Float64Array(8),T9=0,A8=1,r4=2,I8=3,S8=4,L8=5,e4=6,$3=7,L3={nx:0,nz:0,nr:0,nw:0,bx:0,bz:0,br:0,bw:0,push:0,foam:0,fx:0,fz:0,distance:0,liquid:D0,who:"",speed:0,impact:null};function v3(a,b,c,d){return (v3=$c0C(48)).call(this,a,b,c,d)}function MK(a,b){return (MK=$c0C(49)).call(this,a,b)}var g8=new Uint8Array(y*y),A9=new Float32Array(2),J3=Z0*Y0;var FK=new Float64Array(4),DK=0,CK=1,Q3=2,Z3=new WeakMap,kK=new Float64Array(3);function WK(a,b,c){return (WK=$c0C(50)).call(this,a,b,c)}function I9($,J,Q,Z){let q=$[J]-N[Q];if(q!==q)return Z<0?-1:y;let Y=Math.floor((Math.floor(q/Y0)+Z)/Z0);if(Y<0)return-1;if(Y>=y)return y;return Y|0}var N=new Float64Array(13),l=new Float64Array(3),G0=0,g0=1,E$=2,f$=3,f9=4,_9=5,D7=6,C7=7,R3=8,h3=9,u8=10,m8=11,S9=12;function E3(a,b,c){return (E3=$c0C(51)).call(this,a,b,c)}function f3(a){return (f3=$c0C(52)).call(this,a)}function _3($,J,Q,Z,q){let Y=N[G0];if($.queue===null||$.queueScene!==J){E9($);let j=b9(J);$.queue=j,$.queueScene=J,$.unwatchBodies=U3(J,function(z){if(z!==null)j.add(z)},()=>!1)}let X=$.queue;$.sourceCount=0;let K=Q.count>0&&NK(Q);X.edge[0]=N[f9],X.edge[1]=N[_9],X.edge[2]=K?h$+$.widest:-1;for(let j=0;j<X.size;j++)(K?w3:OK)($,J,X.at(j),Q,Z);if(K){{if($.seed===void 0)$.seed=B3(J);let Y=$.unheard;j3(q);for(let X=0;!(X>0&&X%K3===0&&V3());X++){let K=Y.size>0?Y.values().next():$.seed?.next();if(K===void 0||K.done===!0){$.seed=null;break}w3($,J,K.value,Q,Z)}z3(J,q)}}X.clear();{let J=N[G0],Q=N[g0];for(let Z=$.impacts.length-1;Z>=0;Z--){let q=$.impacts[Z],Y=J-q.bornAt;if(Y>pX){$.impacts.splice(Z,1);continue}let X=q.height*Math.exp(-Y/cX)*Math.sin(L*dX*Y)*Q*60,K=L3;K.nx=K.bx=K.fx=q.x,K.nz=K.bz=K.fz=q.z,K.nr=K.br=q.radius,K.nw=K.bw=0,K.push=X,K.foam=Y<0.2?0.08*(q.height/k3)*Q*60:0,K.liquid=q.liquid,K.who=q.who,K.speed=0,K.impact=q,S3($,K)}}if($.bodies.size>0&&Y-$.prunedAt>2){{let Q=N[G0];$.prunedAt=Q;let Z=$.bodyList,q=0;for(let Y=0;Y<Z.length;Y++){let X=Z[Y];if(Q-X.heardAt>iX&&!(X.weight>0&&r0(J,X.id)))$.bodies.delete(X.id),$.spareBodies.push(X);else Z[q++]=X}Z.length=q}}if($.sourceCount>0){if(!$.active)$.clearOwed=!0;$.active=!0;$.lastHeardSeconds=Y;{let J=N[G0],Q=$.liquidHeard;for(let Z=0;Z<$.sourceCount;Z++){let q=$.sources[Z].liquid,Y=0;while(Y<$.liquidHeardCount&&Q[Y].liquid!==q)Y++;if(Y===$.liquidHeardCount)(Q[$.liquidHeardCount++]??={liquid:q,heard:J}).liquid=q;Q[Y].heard=J}}}else if($.active&&Y-$.lastHeardSeconds>$.restAfterS)$.active=!1,$.liquidHeardCount=0;$.moverCount=q3($,J,!0,0),$.stillCount=q3($,J,!1,$.moverCount)}var h$=A0*0.5+L9+C3;function NK(a){return (NK=$c0C(53)).call(this,a)}function w3($,J,Q,Z,q){$.unheard.delete(Q),I3($,J,Q,Z,q);let Y=G7(J,Q).position;if(L$.x0!==L$.x1)$.widest=Math.max($.widest,Math.abs(L$.x-Y[0]),Math.abs(L$.z-Y[2]));$.queue?.hearPlaceMotion(Q,L$.near)}function OK($,J,Q,Z,q){let Y=$.bodies.get(Q);if(Y!==void 0&&Y.weight>0)return I3($,J,Q,Z,q);if($.queue?.hearPlaceMotion(Q,!1),Y===void 0){if(r0(J,Q))$.unheard.add(Q);else $.unheard.delete(Q);return}Y.heardAt=N[G0],Y.measured=!1}function q3($,J,Q,Z){let q=N[f9],Y=N[_9],X=$.namedDistance,K=T0-Z,j=0;if(K<=0)return 0;let z=$.bodyList;for(let V=0;V<z.length;V++){let B=z[V];if(B.weight<=0||(B.stirred||D3(J,B.id))!==Q||!r0(J,B.id))continue;let U=B.box;l[0]=(U[0]+U[2])*0.5-q,l[1]=(U[1]+U[3])*0.5-Y,k7(l,0,1,l,2);let H=l[2],G=Z+j;if(j>=K){G=Z;for(let D=Z+1;D<Z+j;D++)if(X[D]>X[G])G=D;if(X[G]<=H)continue}else j++;X[G]=H,$.named.set(U,G*4)}return j}function TK(a,b,c,d,e,f){return (TK=$c0C(54)).call(this,a,b,c,d,e,f)}var AK=new Float64Array(3),v8=0,R8=1,h8=2;var u3=[0,0,0];function LK($,J,Q,Z){let q=$.liquidHeard[J];M0[c8]=N7*q.liquid/D0;M0[d8]=q.heard;M0[l8]=$.readAt;m3(M0);Q[Z]=Math.min(1,M0[R9]/$.read)}function m3($){let J=$[c8],Q=EX*J/N7;$[R9]=Math.min(1,Math.max(0,(J-($[l8]-$[d8]))/Q))}var vK=new Float32Array(r$),M0=new Float64Array(4),c8=0,d8=1,l8=2,R9=3,E8=new Float64Array(1);function F7(a,b,c,d){return (F7=$c0C(55)).apply(this,arguments)}var RK=0.001,l3=0.000001;function hK(a,b,c){return (hK=$c0C(56)).call(this,a,b,c)}var p3=($,J)=>$[0]*J[0]+$[1]*J[1]+$[2]*J[2]>=1-l3,f0=($,J)=>Math.abs($-J)<=RK;function fK($,J,Q,Z){let q=[];for(let Y=0;Y<Q.length;Y++){let X=$[J+Y];if(X===void 0||Z.has(X)||!f0(X.u0,Q[Y][0])||!f0(X.u1,Q[Y][1]))return null;q.push(X)}return q}function _K(a,b,c,d){return (_K=$c0C(57)).call(this,a,b,c,d)}var gK=new Float32Array(16);function c3($,J,Q,Z){return[$[0]*J+$[4]*Q+$[8]*Z,$[1]*J+$[5]*Q+$[9]*Z,$[2]*J+$[6]*Q+$[10]*Z]}function uK(a,b){return (uK=$c0C(58)).call(this,a,b)}function n3(a,b){return (n3=$c0C(59)).call(this,a,b)}var mK=0.24,i3=q0*q0,c9=R*R*6,s8=R*4*3,_$=R+1,a3=q0/2-1,pK=q0/2+1,t3=1.02,cK=0.0001,dK=0.001;function QQ(a){return (QQ=$c0C(60)).call(this,a)}function d9($,J){let Q=QQ($);if(!(J>0)||Q.length===0)return 0;let Z=Math.max(...Q)*q7*(1+cK),q=0;while(J*2**q<Z)q++;return q}function r8($){if(!($.swellAmplitude>0))return 0;let J=f[0]+f[1],Q=$.swellAmplitude*J;for(let Z=0;Z<r.length;Z++)Q+=D$*f[Z]*r[Z]/J/L;return Q*Math.abs($.waveHeightScale)}function e8($){return (Math.max(0,$.waveIntensity)*y0*(1+mK)*Math.abs($.waveHeightScale)+r8($))+Math.abs($.surfaceYOffset)+1}var n8=8388608,nK=0.001,qQ=0.001,m$=0,p$=1,m=2,p=5,O7=8,u$=9,$0=10,K0=13,p9=16,z0=new Float64Array(p9+24);function b7(a,b){return (b7=$c0C(61)).call(this,a,b)}function $5(a,b,c,d,e){return ($5=$c0C(62)).call(this,a,b,c,d,e)}function o3($,J,Q,Z,q){if(Q>Z)return 0;let Y=2*q,X=J%Y,K=($+X)/Y,j=Math.floor(K);if(Math.abs(K-j-0.5)<nK)return Math.max(i8(j,Y,X,Q,Z,q),i8(j+1,Y,X,Q,Z,q));return i8(K-j>0.5?j+1:j,Y,X,Q,Z,q)}function i8($,J,Q,Z,q,Y){let X=$*J-Q-q0/2*Y,K=Math.min(Math.max(Math.floor((Z-X)/Y),0),q0),j=Math.min(Math.max(Math.ceil((q-X)/Y+qQ),0),q0);return Math.max(0,j-K)}var r3=qQ*R,iK=0.000001,aK=0.0001,b0=($,J)=>Math.abs($-J)<=iK,x0=($,J)=>Math.abs($-J)<=aK;function tK(a){return (tK=$c0C(63)).call(this,a)}var w$=($,J,Q)=>$[J]*$[Q]+$[J+4]*$[Q+4]+$[J+8]*$[Q+8];function sK($){return x0(w$($,0,0),1)&&x0(w$($,1,1),1)&&x0(w$($,2,2),1)&&x0(w$($,0,1),0)&&x0(w$($,0,2),0)&&x0(w$($,1,2),0)&&x0($[3],0)&&x0($[7],0)&&x0($[11],0)&&x0($[15],1)}function oK($,J,Q,Z){let q=z0,Y=q[$0]+q[m]*J+q[p]*Q+q[K0]*Z,X=q[$0+1]+q[m+1]*J+q[p+1]*Q+q[K0+1]*Z,K=q[$0+2]+q[m+2]*J+q[p+2]*Q+q[K0+2]*Z;return-($[2]*Y+$[6]*X+$[10]*K+$[14])}function g$(a,b,c,d){return (g$=$c0C(64)).call(this,a,b,c,d)}function KQ(a,b,c,d,e,f){return (KQ=$c0C(65)).call(this,a,b,c,d,e,f)}var a8=new Float64Array(4),e0=new Float64Array(3),t8=8;function g9($,J,Q){let Z=Math.min(Math.max(m9($,J),0),$.length-2);return Math.min(Z-Z%t8+Q,$.length-2)}var eK=new Int32Array(6),$j={origin:[0,0,0],u:[0,0,0],v:[0,0,0]},u9=null;function jQ(a,b,c,d,e,f,g,h,i,j){return (jQ=$c0C(66)).call(this,a,b,c,d,e,f,g,h,i,j)}function VQ(a,b,c,d,e,f,g,h,i,j,k){return (VQ=$c0C(67)).call(this,a,b,c,d,e,f,g,h,i,j,k)}var e3=new WeakMap;function zQ(a){return (zQ=$c0C(68)).call(this,a)}var l9=16,n9=31;function BQ(){return{nearCells:[],nearLevel:0,nearStamp:0,nearOpen:!1,nearPlaced:!1}}class Q5{constructor(){this.levels=Array.from({length:n9},()=>new Map);this.levelCounts=new Int32Array(n9);this.open=[];this.stamp=0;}place($,J){this.remove($);let Q=J[0],Z=J[1],q=J[2],Y=J[3];if($.nearPlaced=!0,!(isFinite(Q)&&isFinite(Z)&&isFinite(q)&&isFinite(Y))||q<Q||Y<Z){$.nearOpen=!0,this.open.push($);return}let X=Math.max(q-Q,Y-Z),K=Math.min(n9-1,X<=l9?0:Math.ceil(Math.log2(X/l9))),j=l9*2**K,z=this.levels[K],V=Math.floor(Q/j),B=Math.floor(q/j),U=Math.floor(Z/j),H=Math.floor(Y/j);for(let G=V;G<=B;G+=1){let D=u0(z,G);for(let M=U;M<=H;M+=1)i9(D,M).push($),$.nearCells.push(G,M)}$.nearLevel=K,this.levelCounts[K]+=1}remove($){if(!$.nearPlaced)return;if($.nearPlaced=!1,$.nearOpen){$.nearOpen=!1,J5(this.open,$);return}let J=$.nearCells;if(J.length===0)return;this.levelCounts[$.nearLevel]-=1;let Q=this.levels[$.nearLevel];for(let Z=0;Z<J.length;Z+=2){let q=Q.get(J[Z]),Y=q?.get(J[Z+1]);if(q===void 0||Y===void 0)continue;if(J5(Y,$),Y.length>0)continue;if(q.delete(J[Z+1]),q.size===0)Q.delete(J[Z])}J.length=0}query($,J){let Q=$[0],Z=$[1],q=$[2],Y=$[3];this.stamp+=1;let X=this.stamp,K=0;for(let j=0;j<this.open.length;j+=1){let z=this.open[j];z.nearStamp=X,J[K++]=z}for(let j=0;j<n9;j+=1){if(this.levelCounts[j]===0)continue;let z=this.levels[j],V=l9*2**j,B=Math.floor(Q/V),U=Math.floor(q/V),H=Math.floor(Z/V),G=Math.floor(Y/V);for(let D=B;D<=U;D+=1){let M=z.get(D);if(M===void 0)continue;for(let C=H;C<=G;C+=1){let W=M.get(C);if(W===void 0)continue;for(let k=0;k<W.length;k+=1){let O=W[k];if(O.nearStamp===X)continue;O.nearStamp=X,J[K++]=O}}}}return K}}var Qj=b$*16;function a9(a,b,c,d,e,f,g){return (a9=$c0C(69)).call(this,a,b,c,d,e,f,g)}function Zj($){let J=Reflect.get($,"limits"),Q=HQ(J)?Reflect.get(J,"maxBufferSize"):void 0;return typeof Q==="number"&&Q>=4?Q:1/0}function GQ($,J,Q,Z){return{buffer:$.createBuffer({label:J,size:Q*4,usage:16|8|4}),corners:Q,maxCorners:Z,label:J}}var qj=8,Yj=32768/a0,Xj=65536;function FQ(a){return (FQ=$c0C(70)).call(this,a)}function q5(a,b,c){return (q5=$c0C(71)).call(this,a,b,c)}function Y5(a,b,c,d,e,f){return (Y5=$c0C(72)).call(this,a,b,c,d,e,f)}function kQ($){return a9($.device,"lume water windows","rgba32float",16,k0,$.rows.lines,$.rows.maxLines)}function WQ($,J){return q5($.device,J,$.rows.lines)}var NQ=new Uint8Array(16),Kj=new Float32Array(NQ.buffer);function t9($,J,Q,Z=0,q=b$){if(Q<0)return;Y5($.device,$.rows,Q*b$+Z,q,new Uint8Array(J.buffer,J.byteOffset,J.byteLength),Q*Qj+Z*16)}function Z5($,J,Q){let Z=$.free;for(let q=0;q<Z.length;q+=2)if(Z[q+1]>=J)return q;return $.top+J<=Q?Z.length:-1}function bQ($,J,Q){let Z=Z5($,J,Q);if(Z<0)return-1;let q=$.free;if(Z===q.length){let X=$.top;return $.top+=J,X}let Y=q[Z];if(q[Z+1]===J)q.splice(Z,2);else q[Z]+=J,q[Z+1]-=J;return Y}function X5($,J,Q){return(J===0||Z5($.vertexSpans,J,$.texels)>=0)&&(Q===0||Z5($.indexSpans,Q,$.indices.maxCorners)>=0)}function K5(a,b,c){return (K5=$c0C(73)).call(this,a,b,c)}function xQ($,J){if($.staging.length<J)$.staging=new Uint32Array(Math.max(J,$.staging.length*2));return $.staging}function PQ(a,b,c,d){return (PQ=$c0C(74)).call(this,a,b,c,d)}function j5(a,b,c,d,e){return (j5=$c0C(75)).call(this,a,b,c,d,e)}function yQ(a,b,c){return (yQ=$c0C(76)).call(this,a,b,c)}function V5(a,b,c,d){return (V5=$c0C(77)).call(this,a,b,c,d)}function z5($,J){$.free.length=0,$.top=J}var zj=Y7.map(($)=>(1+$.reduce((J,Q,Z)=>J+Math.abs(Q)*Z$(C0[Z][0],C0[Z][1]),0))**2),Bj=Y7.map(($)=>$.reduce((J,Q,Z)=>J+Math.abs(Q)*(C0[Z][0]**2+C0[Z][1]**2),0));function Uj(a,b,c){return (Uj=$c0C(78)).call(this,a,b,c)}function IQ(a,b,c,d,e,f,g,h){return (IQ=$c0C(79)).call(this,a,b,c,d,e,f,g,h)}var $$=j7;var Mj=$$*4;var Gj=23;var QJ=($)=>$.fold!==null?$.fold.sheet:$.geometry.sheet;var $q=($)=>$.gridSigma>0?QJ($):null;var U6=($)=>$.fold!==null?$.fold.localBounds:$.geometry.localBounds;function Fj(a,b){return (Fj=$c0C(80)).call(this,a,b)}function Dj(a,b){return $c0C(81).call(this,a,b)}var j0=new _5("water",Dj),y5=new _5("water-ripple-turn");function ZJ($,J=!0){let Q=$.store(j0,function(){let Z={scene:$,registered:!1,standRows:null,surfaces:new Map,slots:[],freeSlots:[],drawRows:new Float32Array($$*16),homeless:new Set,homeRow:new Float32Array(j7),roomOwed:!1,roomEye:new Float64Array(3),roomSlack:0,roomDrift:0,roomOrder:[],roomCompact:[],nextSerial:0,owed:new Set,looks:new Map,nextLookSerial:0,lookWords:new Float32Array(U0.byteSize/4),near:new Q5,nearBox:new Float64Array(4),nearScratch:[],eyeNear:[],eyeSideReads:0,media:new Map,mediaCount:0,vertexMedia:new Set,mediumSources:[],mediumViewSources:[],mediumViewKeys:[],mediumOut:[],mediumSortScratch:[],wet:[],wetReads:0,hasMedium:!1,stillCount:0,fading:new Set,textures:{normal:null,caustics:null,crestFoam:null,shoreFoam:null},texturesVersion:0,foamUsers:0,foamAssets:null,releaseFoamTexture:null,gridScratch:{firstInstance:0,instanceCount:1,fanFirstInstance:0,fanInstanceCount:0,window:new Float32Array(4)},share:null,sharerCount:0,guestSharerCount:0,sharing:!1,mediumSharing:!1,refractionCut:!1,refractionOff:!1,colourAsked:!1,unseen:0,foldRows:new Map,foldDirty:new Set,foldOrigin:[0,0,0],gpu:null,drawsMoved:!1,drawsPending:!1,wallWithheld:0,holds:m4(),holdCount:0,holdSurfacesMoved:!0,overRecords:[],overMoved:!1,ripples:N3(),rippleColumns:{count:0,found:[],near:()=>0},rippleOwed:!1,lighting:null,lightingStood:null,lightingWhole:!1,motion:null,live:new Set,farFirst:new Set,views:[],viewByGroup:new WeakMap,wordsRevision:0,heldWords:new Float64Array(R5).fill(NaN),nextWords:new Float64Array(R5),groupsTexturesVersion:0,overOwed:new Set,overHanded:new Set,mediumHolders:new Set,motionKeyOf:function(){return}};Z.rippleColumns=Cj($,Z);Z.motionKeyOf=bV(Z);return Z});if(J&&!Q.registered){Q.registered=!0;$.register({id:"water",commitMotion:(Z)=>Q.motion?.commitMotion(Z)===!0,prepare:function(Z){let q=Q.drawsMoved||Q.drawsPending;if(Q.drawsMoved=!1,Q.drawsPending=!1,!hQ($,Q,Z)&&!q)$.noteUniformOnlyPrepare("water")},postPrepare:function(Z){if(!Q.rippleOwed)return;Q.rippleOwed=!1;if(z6()){{let J$6=Q.ripples,Q$2=Q.rippleColumns;{let J=J$6,Q=Q$2;let q=h9(J,Z.device);let Y=Z.renderOrigin??u3;E3(J,Z,Y);f3(J);_3(J,$,Q,Y,Z);J.sourceCount=0;J.impacts.length=0;J.active=!1;J.clearOwed=!0;J.lastHeardSeconds=-1/0;J.liquidHeardCount=0;b3(q);F7(J,q,!1,Y,!0)}}}else {v3($,Q.ripples,Q.rippleColumns,Z)}},captureRefit:function(Z){if(hQ($,Q,Z,!1))Q.drawsMoved=!0},mainDraws:(Z)=>Vz($,Q,Z)});}return Q}function Cj(a,b){return (Cj=$c0C(82)).call(this,a,b)}function qJ($,J){for(let Q of $.views)Q.owed.add(J)}function P0($,J){$.owed.add(J),J.drawsOwed=!0,$.drawsMoved=!0}function XM($,J){let Q=$.peekStore(j0);if(Q)Q.standRows=J}function kj($,J,Q){if($.freeSlots.length===0&&$.slots.length>=Q)return!1;let Z=$.freeSlots.pop()??$.slots.length;$.slots[Z]=J;J.slot=Z;if((Z+1)*$$>$.drawRows.length){$.drawRows=FZ($.drawRows,Math.max($.drawRows.length*2,(Z+1)*$$));for(let q of $.slots){if(q!==void 0){q.drawArray=SQ($,q.slot)}}}J.drawArray=SQ($,Z);J.drawArray.fill(0);$.motion?.markRow(Z);return !0}function Jq($,J){if(J.slot<0)return;$.slots[J.slot]=void 0,$.freeSlots.push(J.slot),$.motion?.markRow(J.slot),J.slot=-1,J.drawArray=$.homeRow}var SQ=($,J)=>$.drawRows.subarray(J*$$,J*$$+j7);function KM($,J,Q){let Z=ZJ($);let q=e5(Q.overrides,$.peekStore(y5)?.followsWaves===!0);let Y=a(Q.overrides?.detailNormalStrength);let X=Q.overrides?.coastHalfExtent!==void 0;let K=a(Q.overrides?.underwaterDepth);let j=D6(q,F6(Q.transform,Q.geometry.localBounds,e($).origin),X,Rq(Q.transform,Q.geometry,Q.ground===!0));let z=Fj(Q,j);let V={clipPlane:Q.clipPlane?hZ(Q.clipPlane):null,geometry:Q.geometry,surface:Q.surface!==!1,still:Q.still===!0,cells:Q.cells===!0,ground:Q.ground===!0,vertexSource:Q.vertexSource,vertexReach:Q.vertexReach,params:j,bareParams:q,rippleNamed:Y,authoredCoast:X,authoredDepth:K,structuralKey:aZ(Q.overrides),mediumOpticsKey:x8(j),gridSigma:z,gridReach:e8(j),gridFlat:d9(j,z),uniformsDirty:!0,transformDirty:!0};let B=Z.surfaces.get(J);let U=Q.sliceOf??null;if(Z.holdSurfacesMoved=!0,Xq(Z,!!B?.surface&&B.params.foamStrength>0,Q.surface!==!1&&j.foamStrength>0,Q.assets),B){if(B.sliceOf!==U)T5(Z,B,U);else if(U!==null)Z.foldDirty.add(U);if(r9(Z,B,-1),Zq(Z,B,Q.fade??0),B.transform.set(Q.transform),Z.stillCount+=Number(V.still)-Number(B.still),Object.assign(B,V),B.fold!==null){if(B.fold=null,U!==null)Z.foldDirty.add(U)}r9(Z,B,1),P0(Z,B),Z6($,Z);return}let H={...BQ(),...V,id:J,cameraLayers:i5,slot:-1,serial:Z.nextSerial++,drawArray:Z.homeRow,transform:new Float32Array(Q.transform),look:null,eyeUnder:P5,eyeUnderCrests:P5,mediumEnabled:!1,arenaPositions:null,arenaIndices:null,arenaChannel:null,vertexAt:-1,vertexTexels:0,indexAt:-1,indexTexels:0,triangles:0,fadeWord:Q.fade??0,gpu:null,medium:null,mediumFiled:null,mediumUniformArray:new Float32Array(b8),holdBounds:new Float32Array(6),holdRestY:0,rippleColumn:null,sea:sZ(J),sliceOf:null,foldedBy:null,fold:null,sortCentre:new Float64Array(3),sortAxes:new Float64Array(9),overAt:-1,drawsOwed:!1,roomDistance:NaN,roomKept:!1,roomMoved:!1,eyeNearAt:-1,eyeSideRead:0,mediumRead:-1,wet:!1,wetRead:0};Z.surfaces.set(J,H);T5(Z,H,U);if(J$(H.fadeWord))Z.unseen+=1;if(Math.abs(H.fadeWord)>1)Z.fading.add(H);Z.stillCount+=Number(H.still),r9(Z,H,1),P0(Z,H),Z6($,Z)}function jM($,J){let Q=$.peekStore(y5);if((Q?.followsWaves??!1)===J)return;(Q??$.store(y5,()=>({followsWaves:J}))).followsWaves=J;let Z=$.peekStore(j0);if(!Z)return;ca(Z,J);}function VM($,J,Q){let Z=$.peekStore(j0),q=Z?.surfaces.get(J);if(!Z||!q)return;q.transform.set(Q);Aq(q);Z.holdSurfacesMoved=!0;{let $=Z,J=q;$.overOwed.add(J)}}function Qq($){if($<=1&&$>=-1)return!1;let J=UZ($,GZ());return $>0?J<1:J<0}var J$=($)=>$===1||$===-1;function Zq(a,b,c){return (Zq=$c0C(83)).call(this,a,b,c)}function zM($,J,Q){let Z=$.peekStore(j0),q=Z?.surfaces.get(J);if(!Z||!q||q.cameraLayers===Q)return;q.cameraLayers=Q;Z.drawsMoved=!0;qJ(Z,q)}function BM($,J,Q){let Z=$.peekStore(j0),q=Z?.surfaces.get(J);if(Z&&q)Zq(Z,q,Q)}function Wj($,J){let Q=ZJ($),Z=Q.surfaces.get(J);if(!Z)return;Q.drawsMoved=!0;Q.holdSurfacesMoved=!0;if(J$(Z.fadeWord))Q.unseen-=1;if(T5(Q,Z,null),r9(Q,Z,-1),Xq(Q,Z.surface&&Z.params.foamStrength>0,!1),Z.gpu?.mediumBuffer?.destroy(),Z.gpu?.vertexPack?.lease.release(),Q.gpu)UJ(Q.gpu.arena,Z);Wq(Q,Z,null),Q.stillCount-=Number(Z.still),Q.surfaces.delete(J),Q.owed.delete(Z),Q.fading.delete(Z),Q.live.delete(Z),Q.farFirst.delete(Z),Q.near.remove(Z),HJ(Q,Z),I5(Q,Z,null),vq(Q,Z);let q=Z.wet?Q.wet.indexOf(Z):-1;if(Z.wet=!1,q>=0)Q.wet.splice(q,1);Q.overOwed.delete(Z),Q.overHanded.delete(Z),Q.mediumHolders.delete(Z);for(let Y of Q.views){rq(Y,Z);{let $=Y,J=Z;$.farFirst.get(J)?.buffer.destroy(),$.farFirst.delete(J)}}if(Z.slot>=0)Q.roomOwed=!0;Jq(Q,Z),Q.homeless.delete(Z),Z6($,Q)}function T5($,J,Q){let Z=J.sliceOf;if(Z!==null){let Y=$.foldRows.get(Z);if(Y?.delete(J),Y?.size===0)$.foldRows.delete(Z);$.foldDirty.add(Z);let X=J.foldedBy??J;for(let K of X.fold?.members??[])MJ($,K)}if(J.sliceOf=Q,Q===null)return;h5($.foldRows,Q).add(J),$.foldDirty.add(Q)}function UM(a,b,c){return (UM=$c0C(84)).call(this,a,b,c)}function r9($,J,Q){if(!(J.surface&&J.params.transparent&&J.params.depthPipelineEnabled))return;if($.sharerCount+=Q,J.clipPlane!==null)$.guestSharerCount+=Q}function Z6(a,b){return (Z6=$c0C(85)).call(this,a,b)}function Yq($,J){let Q=J.mediumSources.length>0;if(Q===J.mediumSharing)return;J.mediumSharing=Q,$.setViewportSharer("water-medium",Q&&{color:!0,depth:!0,chainOnly:!0})}function Xq(a,b,c,d){return (Xq=$c0C(86)).call(this,a,b,c,d)}var Kq=[E0(0,1|2,"uniform"),c(1,2,"float","2d"),T$(2,2,"filtering"),c(3,2,"float","2d-array"),c(4,2,"float","2d"),c(5,2,"float","2d"),c(6,2,"float","2d"),c(7,1|2,"unfilterable-float","2d"),T$(8,2,"filtering"),T$(9,2,"non-filtering"),c(d7,2,"float","2d"),E0(l7,2,"uniform"),c($J,2,"unfilterable-float","2d")];var H6=1;var jq=($,J)=>(jq=$c0C(87))($,J);var Nj=function(a){return (Nj=$c0C(88)).call(this,a)};var XJ=["lume water draw","lume water motion draw"];var Oj=($)=>($.holdsStandIn??=KZ($.device,{label:"lume water no holds",size:(324+($.holdsBinding).planes*4)*4,usage:$.holdsBinding.storage?128:64},function(){return})).resource;function Vq($,J,Q){return $.drawLayouts[Q]??=J.getBindGroupLayout(jq(Q,$.holdsBinding.storage),XJ[Q])}function x7($,J,Q,Z,q){let Y=$.createTexture({label:J,size:{width:1,height:1},format:Q,usage:4|2});return $.queue.writeTexture({texture:Y},Z,{bytesPerRow:q},{width:1,height:1}),Y}function zq($,J,Q){if($.gpu?.device===J)return $.gpu;for(let M of $.surfaces.values())M.gpu?.vertexPack?.lease.release(),M.gpu=null,M.medium=null,M.slot=-1,M.drawArray=$.homeRow,M.vertexAt=-1,M.indexAt=-1,M.vertexTexels=0,M.indexTexels=0,M.arenaPositions=null,M.uniformsDirty=!0,M.transformDirty=!0,P0($,M);$.slots.length=0,$.freeSlots.length=0,$.homeless.clear();for(let M of $.looks.values())M.gpu=null,M.uniformsDirty=!0;if($.gpu)Bq($,$.gpu);$.motion?.dispose(),$.motion=null;let Z=J.createSampler({label:"lume water repeat",addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),q=J.createSampler({label:"lume water clamp",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear"}),Y=J.createSampler({label:"lume water point",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"nearest",minFilter:"nearest"}),X=x7(J,"lume water normal placeholder","rgba8unorm",new Uint8Array([128,128,255,255]),4),K=x7(J,"lume water white placeholder","rgba8unorm",new Uint8Array([255,255,255,255]),4),j=x7(J,"lume water caustics placeholder","rgba8unorm",new Uint8Array([255,255,255,255]),4),z=x7(J,"lume water scene-color placeholder","rgba8unorm",new Uint8Array([0,0,0,255]),4),V=x7(J,"lume water scene-depth placeholder","r32float",new Float32Array([X6]),4),B=J.createTexture({label:"lume water channel profile placeholder",size:{width:P7.length,height:1},format:"r32float",usage:4|2});J.queue.writeTexture({texture:B},P7,{bytesPerRow:P7.byteLength},{width:P7.length,height:1});let U=Q.getBindGroupLayout(Kq,"lume water material"),H=function(M){let C=J.createBuffer({label:`lume water motion word ${M}`,size:16,usage:64|8});return J.queue.writeBuffer(C,0,new Float32Array([M,0,0,0])),C},G=[H(0),H(1)],D=J.createBuffer({label:"lume water guest prior",size:Mj,usage:128});h9($.ripples,J);$.gpu={device:J,repeatSampler:Z,clampSampler:q,pointSampler:Y,placeholderNormalView:X.createView(),placeholderWhiteView:K.createView(),placeholderWhiteArrayView:j.createView({dimension:"2d-array"}),placeholderSceneColorView:z.createView(),placeholderSceneDepthView:V.createView(),placeholderChannelProfileView:B.createView(),placeholders:[X,K,j,z,V,B],materialLayout:U,drawLayouts:[null,null],pipelineLayouts:[null,null],holdsBinding:Nj(J),holdsStandIn:null,arena:FQ(J),motionWords:G,guestPrior:D,shaderModules:new WeakMap,madeTexts:new WeakMap,vertexStreams:lZ(J)};return $.gpu}function Bq(a,b){return (Bq=$c0C(89)).call(this,a,b)}function o9($,J){return $?t5($.view):J}function A5($,J,Q,Z,q){return J.device.createBindGroup({label:Z?"lume water material (shared)":"lume water material",layout:J.materialLayout,entries:xj($,J,Q,Z,q)})}function xj(a,b,c,d,e){return (xj=$c0C(90)).call(this,a,b,c,d,e)}function Pj(a){return (Pj=$c0C(91)).call(this,a)}function KJ(a,b,c){return (KJ=$c0C(92)).call(this,a,b,c)}function HM($,J){let Q=$.peekStore(j0);if(!Q?.hasMedium)return null;return ea(J,Q,$);}function I5(a,b,c){return (I5=$c0C(93)).call(this,a,b,c)}var Tj=($,J)=>$.serial<J.serial,x={store:null,camera:null,view:null,device:null,guest:!1,windowed:!1,clearOfCells:!1,groundDry:!1,otherDry:!1,focal:0,count:0};function L7(){x.store=null,x.camera=null,x.view=null,x.device=null}function Aj($){let J=x.store;if(J===null)return;if($.vertexSource!==void 0)Uq($);if($.medium&&$.mediumFiled!==null&&!(x.clearOfCells&&$.cells)&&!($.ground?x.groundDry:x.otherDry))J.mediumOut[x.count++]=$}function Uq($){let J=x.store,Q=$.gpu;if(!J?.gpu||Q===null||$.mediumRead===J.eyeSideReads)return;if($.mediumRead=J.eyeSideReads,($.vertexSource?.()??null)===Q.vertexRead&&(Q.vertexPack?.lease.buffer??null)===Q.vertexWornBuffer)return;mj:{let $$17=J,J$16=J.gpu,Q$8=$,Z$4=VJ(J,J.gpu,$,Q);{let $=$$17,J=J$16,Q=Q$8,Z=Z$4;if(Z===Q.mediumEnabled)break mj;Q.mediumEnabled=Z,Q.drawArray[W0+1]=Z?1:0,t9(J.arena,$.drawRows,Q.slot,Dq,1)}}}function Ij($){let J=x.store;if(J===null||!Qq($.fadeWord))return;if(x.count+=1,$.sliceOf!==null)J.foldDirty.add($.sliceOf)}function Sj($){let{view:J,camera:Q,device:Z}=x;if(J===null||Q===null||Z===null)return;let q=J.entries.get($),Y=q?.farFirst;if(!q||!Y)return;if(nq($,J,x.guest,x.windowed,Q,Z)!==Y)J.owed.add($);else{let X=q.commands[0]?.draw;if(X!==void 0&&!("indirect"in X))X.indexCount=Y.count}}function Hq($,J,Q,Z){let q=$.mediumViewKeys;let Y=Q.eyeClearOfLiquid===!0;let X=Lj($,J,Q,Y);let K=$.mediumOut;let j=0;if(X>0){x.store=$,x.clearOfCells=Y,x.groundDry=vQ($,q,X,Q.position,!0),x.otherDry=vQ($,q,X,Q.position,!1),x.count=0;for(let B=0;B<X;B+=1)$.media.get(q[B])?.forEach(Aj);j=x.count,L7()}p0(K,j),XZ(K,$.mediumSortScratch,Tj);let z=!1,V=0;for(let B=0;B<j;B+=1){let U=K[B].medium;if(U===null)continue;Z[V++]=U,z||=K[B].still}return p0(Z,V),z}function Lj($,J,Q,Z){let q=$.mediumViewKeys,Y=0;Ej:{let $$15=Q;{let $=$$15;let J=$.projection,Q=jJ;if(J[11]===-1&&J[15]===0&&J[2]===0&&J[6]===0){if(Q[2]=Math.abs(J[0]),Q[2]<0.000001)Q[2]=0.000001;if(Q[3]=Math.abs(J[5]),Q[3]<0.000001)Q[3]=0.000001;Q[1]=1,Q[2]=(1+Math.abs(J[8]))/Q[2],Q[3]=(1+Math.abs(J[9]))/Q[3],qZ(Q,1,1,Q,4),Q[0]=Math.abs(J[14]/(1-X6+J[10]))*Q[4];break Ej;}Q[0]=fj($)}}let X=jJ[0];if($.mediaCount>0&&X<1/0){let K=e(J).origin,j=Q.position,z=$.nearBox;z[0]=j[0]+K[0]-X,z[1]=j[2]+K[2]-X,z[2]=j[0]+K[0]+X,z[3]=j[2]+K[2]+X;let V=$.near.query(z,$.nearScratch);U5[0]=j[0],U5[1]=j[2];for(let B=0;B<V;B+=1){let U=$.nearScratch[B],H=$.vertexMedia.has(U);if(H||W7(U.geometry.eyeSide??U.geometry,U.transform,U5))Y=LQ($,J,U,Q,Z,Y,H)}}else if($.mediaCount>0)for(let K of $.media.values())for(let j of K)Y=LQ($,J,j,Q,Z,Y,$.vertexMedia.has(j));return p0(q,Y),Y}function LQ($,J,Q,Z,q,Y,X){let K=Q.medium,j=$.mediumViewKeys;if(Q.mediumFiled===null||K===null||q&&Q.cells)return Y;if(!(X?wj(Q,Z):Gq(Q.holdBounds,Z)&&!vj(J,Q,Z.position))||Rj(j,Y,K.opticsKey))return Y;return j[Y]=K.opticsKey,Y+1}function vj(a,b,c){return (vj=$c0C(94)).call(this,a,b,c)}var U5=new Float64Array(3);function vQ(a,b,c,d,e){return (vQ=$c0C(95)).call(this,a,b,c,d,e)}function Rj($,J,Q){for(let Z=0;Z<J;Z+=1)if($[Z]===Q)return!0;return!1}var X0=new Float64Array(6);var S5=new Float32Array(16),RQ=new Float32Array(16),jJ=new Float64Array(5);function fj(a){return (fj=$c0C(96)).call(this,a)}var _j=new Float32Array(6);function wj($,J){let Q=Mq($);if(Q===null)return!0;let Z=_j;Z.set($.holdBounds);for(let q=0;q<3;q++)Z[q]=Math.min(Z[q],Q[q]-Q[3]-(q===1?$.params.underwaterDepth:0)),Z[q+3]=Math.max(Z[q+3],Q[q]+Q[3]);return Gq(Z,J)}var H5=new Float64Array(4);function Mq($){let J=$.vertexReach?.()??null;if(J===null)return null;let Q=$.transform;for(let Z=0;Z<3;Z++)H5[Z]=Q[Z]*J[0]+Q[4+Z]*J[1]+Q[8+Z]*J[2]+Q[12+Z];return H5[3]=J[3]*s9(Q,0),H5}function Gq($,J){let Q=jJ;for(let Z=0;Z<3;Z++)if(J.position[Z]<$[Z]-Q[0]||J.position[Z]>$[Z+3]+Q[0])return!1;return!0}function gj($,J,Q){let Z=J.vertexSource?.()??null;Q.vertexRead=Z,Q.vertexWornBuffer=null;let q=Z?.packedStreams;if(!q||!J.params.underwaterEnabled)return Q.vertexPack?.lease.release(),Q.vertexPack=null,Z;let Y=J.geometry.vertexCount,X=Q.vertexPack;if(X?.vertexCount!==Y||!nZ(X.streams,q.streams))X?.lease.release(),Q.vertexPack={streams:q.streams,vertexCount:Y,lease:$.vertexStreams.acquire(q.streams,Y)};let K=Q.vertexWornBuffer=Q.vertexPack?.lease.buffer??null;if(!K||!Z)return null;return{...Z,bindings:[...Z.bindings,{binding:q.binding,resource:{buffer:K}}]}}function VJ($,J,Q,Z){let q=gj(J,Q,Z);let Y=Q.geometry.volumes?Q.geometry.volumes[q?.volumeLevel??0]??void 0:Q.geometry.volume;let X=Y===void 0?0:U7(Q.transform,Y.normal);let K=Q.slot>=0&&Q.params.underwaterEnabled&&Y!==void 0&&Math.abs(X)>0.00000001;if(Q.vertexSource!==void 0&&q===null)$.live.add(Q);else $.live.delete(Q);let j=Q.look?.gpu?.uniformBuffer;if(K&&Y&&Z.mediumBuffer&&j){let z=!1;if(Q.medium?.mediumBuffer!==Z.mediumBuffer){if(z=!0,!Q.ground&&!Q.cells)_Z();Q.medium={id:Q.id,params:Q.params,opticsKey:Q.mediumOpticsKey,volume:Y,rows:J.arena.views,waterBuffer:j,mediumBuffer:Z.mediumBuffer,vertex:null}}Q.medium.waterBuffer=j,Q.medium.params=Q.params,Q.medium.opticsKey=Q.mediumOpticsKey;let V=Q.medium.volume!==Y;Q.medium.volume=Y;let B=q?.instanceIndex!==Q.medium.vertex?.instanceIndex;if(Q.medium.vertex=q,z||B||V)$.overOwed.add(Q);if(z||Q.uniformsDirty||B||V||Math.sign(X)!==Q.mediumUniformArray[7]){I4(Q.mediumUniformArray,Q.params,Y,Q.transform,q?.instanceIndex??0,Q.slot);J.device.queue.writeBuffer(Z.mediumBuffer,0,Q.mediumUniformArray);}$.mediumHolders.add(Q);I5($,Q,(!Q.vertexSource||q)&&!J$(Q.fadeWord)?Q.mediumOpticsKey:null)}else $.mediumHolders.delete(Q),I5($,Q,null);return K}function hQ($,J,Q,Z=!0){let q=!1;S7("water",J.surfaces.size-Math.max(J.unseen,J.stillCount));if(J.surfaces.size===0){{S7("water-fade",0);let Z=!1;if(J.motion!==null&&Q.motionFrameId!==void 0)J.motion.dispose(),J.motion=null,Z=!0;if(p0(J.mediumSources,0),J.hasMedium=!1,Lq($,J),Yq($,J),J.holds.hides!==null)M7(J.holds.hides);if(J.ripples.queue!==null)E9(J.ripples);return Z}}let Y=zq(J,Q.device,Q.pipelines);let v$4;P3:{let $$7=J.ripples;{let $=$$7;let J=$.gpu;if(J===null){v$4=!1;break P3;}if(J.field===null&&J.shade!==null)J.shade.destroy(),J.shade=null,J.shadeView=J.restView;let Q=$.boundShadeView!==J.shadeView;v$4=($.boundShadeView=J.shadeView,Q);}}if(v$4)J.texturesVersion+=1;if(J.texturesVersion!==J.groupsTexturesVersion){J.groupsTexturesVersion=J.texturesVersion;for(let z of J.surfaces.values())P0(J,z)}let X=Q.viewportShare??null;if(X!==null&&(X.colorView!==J.share?.colorView||X.depthView!==J.share?.depthView))J.share=X,q=!0;if(PV($,J,Y,X))q=!0;if(J.foldDirty.size>0&&FV(J,e($).origin))q=!0;let K=Q.camera.position;if(J.owed.size>0){q=!0;for(let z of J.owed)Fq($,J,Y,z,K);J.owed.clear()}if(Z&&J.homeless.size>0&&rj($,J,Y,K))q=!0;let v$12;xV:{let Q$12=Y,Z$6=Q;{let Q=Q$12,Z=Z$6;if(y9($)===null){v$12=!1;break xV;}let Y=J.holdSurfacesMoved;J.holdSurfacesMoved=!1;let X=c4($,J.holds,Q.device,Q.holdsBinding,Z.camera.position,J.surfaces,Y);let K=X>0!==J.holdCount>0;v$12=(J.holdCount=X,K);}}if(v$12)q=!0;if(J.eyeSideReads+=1,J.live.size>0)x.store=J,J.live.forEach(Uq),L7();qV($,J,Y,K);{let $$18=J;{let $=$$18;if(x.store=$,x.count=0,$.fading.size>0)$.fading.forEach(Ij);let J=x.count;L7(),S7("water-fade",J)}}let v$11;OV:{let $$24=J,J$21=Q;{let $=$$24,J=J$21;if(J.motionFrameId===void 0){v$11=!1;break OV;}if(!J.motionVectors){if($.motion===null){v$11=!1;break OV;}{v$11=($.motion.dispose(),$.motion=null,!0);break OV;}}v$11=($.motion??=new fZ($$,[[0,16]],"lume water previous",!1,!1,Gj),$.motion.prepareRows(J,$.drawRows,$.slots.length,$.motionKeyOf));}}if(v$11)q=!0;if(Z)J.rippleOwed=!0;J.hasMedium=J.mediumHolders.size>0;let j=Hq(J,$,Q.camera,J.mediumSources);{let $$19=J;{let $=$$19;let{mediumOut:J,wet:Q}=$,Z=$.wetReads+=1;for(let q=0;q<J.length;q+=1)J[q].wetRead=Z;for(let q=0;q<Q.length;q+=1){let Y=Q[q];if(Y.wetRead===Z)continue;Y.wet=!1,$.overOwed.add(Y)}for(let q=0;q<J.length;q+=1){let Y=J[q];if(Y.wet)continue;Y.wet=!0,$.overOwed.add(Y)}for(let q=0;q<J.length;q+=1)Q[q]=J[q];p0(Q,J.length)}}Lq($,J);Yq($,J);uj:{let $$16=J,J$15=j;{let $=$$16,J=J$15;if($.stillCount===0||!J)break uj;S7("water",$.surfaces.size-$.stillCount+1)}}return q}function Fq($,J,Q,Z,q){if(Z.transformDirty||Z.uniformsDirty||!Z.nearPlaced){{let Q$9=Z;{let Q=Q$9;let Z=e($).origin;V6(X0,Q.geometry.localBounds,Q.transform);let q=J.nearBox;q[0]=X0[0]+Z[0];q[1]=X0[2]+Z[2];q[2]=X0[3]+Z[0];q[3]=X0[5]+Z[2];if(Q.vertexSource!==void 0){XV(Q,q,Z);}J.near.place(Q,q);jV(Q,Z);Aq(Q)}}if(J.homeless.size>0){let U=Math.abs(xq(Z,J.roomEye)-Z.roomDistance);if(isNaN(U))J.roomOwed=!0;else J.roomDrift=Math.max(J.roomDrift,U)}}let Y=sj(J,Q,Z);let X;{let $$13=Q,J$13=Z;{let $=$$13,J=J$13;let Q=J.geometry.volume!==void 0||J.geometry.volumes?.some((q)=>q!==null)===!0,Z=J.gpu??={mediumBuffer:null,vertexPack:null,vertexRead:void 0,vertexWornBuffer:null};if(Q&&Z.mediumBuffer===null)Z.mediumBuffer=$.device.createBuffer({label:`lume underwater uniforms ${J.id}`,size:b8*4,usage:64|8});X=Z;}}if(Z.uniformsDirty){let v$9;{let $$20=J,J$17=Z;{let $=$$20,J=J$17;let Q=$.lookWords,Z=J.params;d2(Q,Z);Q[nj]=Math.fround(p8(Z.viscosity,Z.wakeSeconds));v$9=`${J.structuralKey}
${Z.transparent?1:0}${Z.depthWrite?1:0}
${c$(J.geometry.channelProfile)}
${Q.join(",")}`;}}Wq(J,Z,v$9);}if(Z.look!==null)KJ(J,Q,Z.look);let{eyeUnder:K,eyeUnderCrests:j,mediumEnabled:z}=Z,V=Y||Z.transformDirty||Z.uniformsDirty;Z.mediumEnabled=VJ(J,Q,Z,X);let B=Z.geometry.eyeSide??null;Z.eyeUnder=B6(B,Z.transform,Z.geometry.localBounds,q);Z.eyeUnderCrests=kq(Z,B,Z.eyeUnder,q);if(B!==null&&Z.eyeUnderCrests!==m0){Tq(J,Z);}else HJ(J,Z);if(V||Z.eyeUnder!==K||Z.eyeUnderCrests!==j||Z.mediumEnabled!==z){lj($,Z);t9(Q.arena,J.drawRows,Z.slot);if(Z.slot>=0)J.motion?.markRow(Z.slot)}Z.uniformsDirty=!1;Z.transformDirty=!1;{let $$22=J,J$18=Z;{let $=$$22,J=J$18;$.overOwed.add(J)}}if(Z.surface&&Z.foldedBy===null&&lq(Z))J.farFirst.add(Z);else J.farFirst.delete(Z);if(Z.drawsOwed){Z.drawsOwed=!1;qJ(J,Z)}}function lj($,J){let Q=J.drawArray;if(J.transformDirty){let q=e($).origin;{let $$23=Q,J$20=J.transform,Q$11=q;{let $=$$23,J=J$20,Q=Q$11;$.set(J);let Z=[J[12]+Q[0],J[13]+Q[1],J[14]+Q[2]],q=HZ(Z);for(let Y=0;Y<3;Y+=1)$[12+Y]=Z[Y]-q[Y],$[16+Y]=q[Y];$[19]=0}}Q.fill(0,20,s0);if(J.clipPlane!==null)Q.set(a5(J.clipPlane),20),Q[23]+=Q[20]*Q[16]+Q[21]*Q[17]+Q[22]*Q[18],Q[27]+=Q[24]*Q[16]+Q[25]*Q[17]+Q[26]*Q[18];Q[W$]=J.fadeWord;Q[W$+1]=J.params.transparent?0:1;Q[W$+2]=J.sea?1:0;Q[W$+3]=J.ground?1:0;WV(Q,J,q);{let $$21=Q;{let $=$$21;let Q=z9,{min:Z,max:q}=U6(J),Y=(Z[0]+q[0])/2,X=(Z[1]+q[1])/2,K=(Z[2]+q[2])/2,j=J.sortAxes,z=0;for(let B=0;B<4;B++){let U=B&1?1:-1,H=B&2?1:-1;z=Math.max(z,t(j[0]+U*j[3]+H*j[6],j[1]+U*j[4]+H*j[7],j[2]+U*j[5]+H*j[8]))}let V=z*1.0001+Math.max(J.gridReach,0)+0.01;$[Q]=Y,$[Q+1]=X,$[Q+2]=K,$[Q+3]=J.vertexSource===void 0&&isFinite(V)&&isFinite(Y+X+K)?V:-1}}}let Z=J.params;Q[s0]=Z.coastCenter[0],Q[s0+1]=Z.coastCenter[1],Q[s0+2]=Z.coastHalfExtent[0],Q[s0+3]=Z.coastHalfExtent[1],Q[W0]=J.eyeUnder,Q[W0+1]=J.mediumEnabled?1:0,Q[W0+2]=Cq(J.geometry.closed,J.transform,J.eyeUnderCrests),Q[W0+3]=0,Q[O$]=Math.max(J.vertexAt,0),Q[O$+1]=Z.flowDirection[0],Q[O$+2]=Z.flowDirection[1],Q[O$+3]=J.arenaChannel!==null?U8:0}var nj=U0.fields.rippleHalfLife.offset/4,Dq=W0/4;function Cq($,J,Q){if($===void 0||Q!==m0)return 0;let Z=J[0]*(J[5]*J[10]-J[6]*J[9])-J[4]*(J[1]*J[10]-J[2]*J[9])+J[8]*(J[1]*J[6]-J[2]*J[5]);if(Z===0)return 0;return Z>0?$:-$}function zJ($){let J=Math.max(0,$.swellAmplitude)*(f[0]+f[1]);return $.surfaceYOffset+(y0*Math.abs($.waveIntensity)+J)*Math.abs($.waveHeightScale)}function kq($,J,Q,Z){if($.geometry.closed===void 0||Q!==m0)return Q;return B6(J,$.transform,$.geometry.localBounds,Z,zJ($.params))}function EQ($,J,Q){if(Q.drawArray[W0]=Q.eyeUnder,Q.drawArray[W0+2]=Cq(Q.geometry.closed,Q.transform,Q.eyeUnderCrests),!$.owed.has(Q))t9(J.arena,$.drawRows,Q.slot,Dq,1)}function Wq(a,b,c){return (Wq=$c0C(97)).call(this,a,b,c)}var aj=0,L5=1,Nq=2;var BJ=($)=>$.geometry.vertexCount*(($.params.channelFrame&&$.geometry.channel!==void 0?$.geometry.channel:null)===null?1:2);var bq=($)=>$.geometry.indices?.length??0;function tj(a,b){return (tj=$c0C(98)).call(this,a,b)}function sj(a,b,c){return (sj=$c0C(99)).call(this,a,b,c)}function v5($,J,Q){let Z=Q.slot>=0||Q.vertexAt>=0;if(UJ(J.arena,Q),Q.triangles=0,Jq($,Q),Q.gpu!==null)Q.mediumEnabled=VJ($,J,Q,Q.gpu);if(!$.homeless.has(Q)){if($.homeless.size===0)__sc.warn(`[lume water] the GPU's water room is full (${J.arena.slots} rows, ${J.arena.texels} texels, ${J.arena.indices.maxCorners} corners): the farthest surfaces wait`);$.homeless.add(Q),$.roomOwed=!0}if(Z)$.roomOwed=!0;$.overOwed.add(Q);qJ($,Q)}function xq($,J){let Q=$.sortCentre;let Z=t(Q[0]-J[0],Q[1]-J[1],Q[2]-J[2])-Pq($);return Z>0?Z:0}function Pq($){let J=0;for(let Q of $.sortAxes)J+=Q*Q;return Math.sqrt(J)}var oj=($,J)=>$.roomDistance-J.roomDistance||$.serial-J.serial;function rj(a,b,c,d){return (rj=$c0C(100)).call(this,a,b,c,d)}function yq($,J,Q,Z,q){Z.transformDirty=!0,Z.uniformsDirty=!0,Z.drawsOwed=!0,Fq($,J,Q,Z,q)}function ej($,J,Q){if(Q.slot<0&&$.freeSlots.length===0&&$.slots.length>=J.slots)return!1;return X5(J,BJ(Q),bq(Q))}function $V(a,b,c,d,e){return ($V=$c0C(101)).call(this,a,b,c,d,e)}var JV=($,J)=>$.vertexAt-J.vertexAt,QV=($,J)=>$.indexAt-J.indexAt;function ZV($){let J=1/0;for(let Q=1;Q<$.length;Q+=1)if($[Q].roomKept!==$[Q-1].roomKept)J=Math.min(J,$[Q].roomDistance-$[Q-1].roomDistance);return J/2}function UJ(a,b){return (UJ=$c0C(102)).call(this,a,b)}function qV($,J,Q,Z){let q=e($).origin,Y=J.nearBox;Y[0]=Z[0]+q[0],Y[1]=Z[2]+q[2],Y[2]=Y[0],Y[3]=Y[1];let X=J.near.query(Y,J.nearScratch),K=J.eyeSideReads;for(let z=0;z<X;z+=1){let V=J.nearScratch[z],B=V.geometry.eyeSide??null;if(B===null)continue;let U=B6(B,V.transform,V.geometry.localBounds,Z),H=kq(V,B,U,Z);if(U!==V.eyeUnder||H!==V.eyeUnderCrests)V.eyeUnder=U,V.eyeUnderCrests=H,EQ(J,Q,V);if(H!==m0)V.eyeSideRead=K}let j=J.eyeNear;for(let z=j.length-1;z>=0;z-=1){let V=j[z];if(V.eyeSideRead===K)continue;if(HJ(J,V),V.eyeUnderCrests===m0)continue;V.eyeUnder=m0,V.eyeUnderCrests=m0,EQ(J,Q,V)}for(let z=0;z<X;z+=1){let V=J.nearScratch[z];if(V.eyeSideRead===K){Tq(J,V)}}}function Tq($,J){if(J.eyeNearAt>=0)return;J.eyeNearAt=$.eyeNear.length,$.eyeNear.push(J)}function HJ($,J){let Q=J.eyeNearAt;if(Q<0)return;J.eyeNearAt=-1;let Z=$.eyeNear,q=Z[Z.length-1];if(Z.length-=1,q===J)return;Z[Q]=q,q.eyeNearAt=Q}function XV($,J,Q){let Z=Mq($);if(Z===null)return void J.fill(NaN);for(let q=0;q<3;q+=2)J[q/2]=Math.min(J[q/2],Z[q]+Q[q]-Z[3]),J[q/2+2]=Math.max(J[q/2+2],Z[q]+Q[q]+Z[3])}function Aq($){{let $$14=$.holdBounds,J$14=$;{let $=$$14,J=J$14;V6(X0,J.geometry.localBounds,J.transform),$.set(X0),$[1]+=J.params.surfaceYOffset-J.params.underwaterDepth,$[4]+=zJ(J.params)}}let J=$.params;$.holdRestY=$.holdBounds[4]-zJ(J)+J.surfaceYOffset;$.rippleColumn=$.surface?{bounds:new Float32Array($.holdBounds),restY:$.holdRestY,field:$.geometry.eyeSide??null,transform:$.transform,halfLife:p8(J.viscosity,J.wakeSeconds),filter:W3(J.viscosity)}:null}function jV(a,b){return (jV=$c0C(103)).call(this,a,b)}function Iq(a,b,c){return (Iq=$c0C(104)).call(this,a,b,c)}var VV=0.9999;function Lq(a,b){return (Lq=$c0C(105)).call(this,a,b)}function e9($,J,Q,Z){for(let q=0;q<3;q++)Z[q]=$[q]*J[0]+$[q+4]*J[1]+$[q+8]*J[2]+$[q+12]*Q;return Z}var zV=new Float64Array(3),BV=new Float64Array(3),UV=new Float64Array(3);function fQ(a,b,c){return (fQ=$c0C(106)).call(this,a,b,c)}var M5=U0.fields.extinction.offset/4,HV=U0.fields.murkExtinction.offset/4;function vq($,J){let Q=J.overAt;if(Q<0)return;J.overAt=-1,$.overMoved=!0;let Z=$.overRecords.pop();if(Z===void 0||Z===J)return;$.overRecords[Q]=Z,Z.overAt=Q,$.overHanded.add(Z)}function Rq($,J,Q){let Z=J.volume;if(Q||Z===void 0||J.bodyRadius===void 0)return;let q=Math.abs(U7($,Z.normal));if(!(q>0.000001))return;return J.bodyRadius*Math.sqrt(q)}function MJ($,J){if(J.foldedBy!==null)J.foldedBy=null,P0($,J);if(J.fold===null)return;J.fold=null,hq($,J,J.geometry.localBounds)}function hq(a,b,c){return (hq=$c0C(107)).call(this,a,b,c)}var GV=($,J)=>y7($.origin,J.origin)&&y7($.u,J.u)&&y7($.v,J.v);function FV($,J){$.foldOrigin=J;let Q=!1;for(let Z of $.foldDirty){let q=$.foldRows.get(Z);if(q!==void 0&&DV($,q))Q=!0}return $.foldDirty.clear(),Q}function DV(a,b){return (DV=$c0C(108)).call(this,a,b)}var CV={origin:[0,0,0],u:[0,0,0],v:[0,0,0]};function _Q($){if($.sliceOf===null||!$.surface||$.still||$.vertexSource!==void 0||$.gridSigma<=0||J$($.fadeWord))return null;return $.geometry.sheet??null}function G5($,J){let Q=J.foldedBy!==null||J.fold!==null;return MJ($,J),Q}function WV($,J,Q){let Z=$q(J);if(Z&&$.length>=N$+4){$.set(Z.origin,h0);$[h0+3]=J.gridSigma;$.set(Z.u,h0+4);$[h0+7]=J.gridReach;$.set(Z.v,h0+8);$[h0+11]=J.gridFlat;YQ:{let J$9=N$,Q$4=J.transform,q$1=J.gridSigma,Y$1=Q;{let J=J$9,Q=Q$4,q=q$1,Y=Y$1;b7(Q,Z);let X=z0;if($.fill(0,J,J+4),!(X[m$]>0&&X[p$]>0&&q>0))break YQ;let K=X[$0]+Y[0],j=X[$0+1]+Y[1],z=X[$0+2]+Y[2],V=K*X[m]+j*X[m+1]+z*X[m+2],B=K*X[p]+j*X[p+1]+z*X[p+2];{let Q=(V-X[O7]*B)/X[u$]/q;let Z=Math.floor(Q);$[J]=(Z%n8+n8)%n8,$[J+2]=Q-Z}{let J$31=J+1,Q$16=(B-X[O7]*V)/X[u$]/q;{let J=J$31,Q=Q$16;let Z=Math.floor(Q);$[J]=(Z%n8+n8)%n8,$[J+2]=Q-Z}}}}}else if(J.surface&&J.ground&&!J.sea&&J.sliceOf===null&&J.vertexSource===void 0&&J.gridSigma<=0&&J.geometry.meets===!0&&$.length>=N$)$[h0+3]=t2}function bV($){return function(J){let Q=$.slots[J];return Q!==void 0&&Q.surface&&Q.gpu!==null&&Q.foldedBy===null?Q:void 0}}var F5=U0.fields.refractionMix.offset/4;function PV(a,b,c,d){return (PV=$c0C(109)).call(this,a,b,c,d)}var GJ=1,n$=2,FJ=4,n=8,i$=16,Eq=($)=>`${$&GJ?"/cut":""}${$&n$?"/mirror1":""}${$&FJ?"/still":""}${$&n?"/plain":""}${$&i$?"/floor":""}`,M6=($,J,Q,Z=!1)=>V8($,J,(Q&GJ)!==0,Z,(Q&FJ)!==0);function fq($,J,Q,Z,q,Y){let X=(Z&n)!==0&&!m5();return`${$.structuralKey}/${J}/${E5({motion:Q})}${Eq(Z&~n$)}${q?"/quiet-once":""}${X?"/looks":""}${d5(o5(Y))}`}function _q($,J,Q,Z,q,Y,X,K){let j=(Y&n)!==0;let z=j&&!m5();let V=M6(J.params,Q,Y,I7($.device));let B=j||(Y&i$)!==0;let U=F4(V,Z,q,$.holdsBinding,!B&&w5($.device));let H=AZ(B?k8(V,q,!0,j,j?$.holdsBinding:null,z):U.fragment,X);return{vertex:U.vertex,fragment:K===null?H:r5(H,K)}}function yV($,J,Q,Z=v0(),q=!1,Y=0,X=d$(),K=0){let j=fq(J,Q,q,Y,X,K);return $.shaderModules.get(Z)?.get(j)??wq($,Z,j,_q($,J,Q,Z,q,Y,X,K))}function wq($,J,Q,Z){let q=dq($.device,Z.vertex,"lume water vertex"),Y=Y6(u0(g5($.device).waterFragments,J),Z.fragment,function(){let K=$.device.createShaderModule({label:"lume water",code:Z.fragment});return gq.set(K,$6(Z.fragment)),K}),X={vertex:q,fragment:Y,texts:[Z.vertex,Z.fragment]};return u0($.shaderModules,J).set(Q,X),X}function TV($,J,Q,Z,q){let{causticClass:Y,lit:X,guard:K,folds:j}=Q,z=fq(J,Y,Z,q,K,j),V=()=>$.shaderModules.get(X)?.has(z)===!0;if(V())return;uZ(),mZ(u0($.madeTexts,X),z,function(B){if(V())return B(null);let U=_q($,J,Y,X,Z,q,K,null);x5(function(){if(V())return B(null);let H={vertex:U.vertex,fragment:r5(U.fragment,j)};x5(function(){let G=gZ();if(G===null||V())return B(null);let D=QZ($.device);O5(G,`water/${Q.key}/vertex`,N5(H.vertex,D),(M)=>O5(G,`water/${Q.key}/fragment`,N5(H.fragment,D),function(C){if(M&&C&&!V())W5($.device,...M,()=>W5($.device,...C,()=>wq($,X,z,H)));B(null)}))})})})}var gq=new WeakMap;function AV($,J,Q,Z,q){return Y6(u0($.liquidModules??=new WeakMap,Z),`${J.structuralKey}/${Q}/${q?"motion":"plain"}`,()=>$.device.createShaderModule({label:"lume water liquid",code:(O4(V8(J.params,Q,!1,I7($.device)),Z,q,$.holdsBinding))}))}function IV(a,b,c){return (IV=$c0C(110)).call(this,a,b,c)}function SV($,J,Q,Z,q,Y){let X=i9(Z.shareGroups,Y);for(let j=0;j<X.length;j+=1)if(X[j].colorView===q)return X[j].group;let K=A5($,J,Z.uniformBuffer,{colorView:q,depthView:Y},Q.channelProfile);return X.push({colorView:q,group:K}),K}var LV={through:J9},wQ=new WeakMap;function Q$($,J,Q,Z=0){let q=wQ.get($);if(q===void 0)q=Array(16).fill(void 0),wQ.set($,q);let Y=(Q?1:0)|Z<<1;let X=$.params;let K=(W9(k9().tier));let j=N0();let z=A$();let V=q[Y];if(V?.params!==X||V.structuralKey!==$.structuralKey||V.causticClass!==K||V.colorFormat!==j||V.samples!==z){let G=`water/${$.structuralKey}/${K}/${X.transparent?"alpha":"opaque"}:dw${X.depthWrite?1:0}/${E5({motion:Q})}${Eq(Z)}`;let D=Q6(J6(J,G));let M;gQ:{let $=D;if(d$()){M=c5()&(uQ($)|zZ);break gQ;}let J=p5()&uQ($);M=(J&VZ)===0?o5(J):J;}let C=V7(M6(X,K,Z))?LV:void 0;V={params:X,structuralKey:$.structuralKey,causticClass:K,colorFormat:j,samples:z,lane:G,lit:D,folds:M,guard:d$(),foldsBefore:M,key:T7(G,D,M),descriptor:null,gpu:null,pipelines:null,standIn:void 0,standInProgram:void 0,twin:null,twinFrom:void 0,twinSame:!1,twinOptions:void 0,firstFrom:null,firstKey:null,firstOptions:void 0,firstDescriptor:null,textsOwed:!1,through:C,options:void 0};q[Y]=V;return V}let B=Q6(J6(J,V.lane));let U;gQ$:{let $=B;if(d$()){U=c5()&(uQ($)|zZ);break gQ$;}let J=p5()&uQ($);U=(J&VZ)===0?o5(J):J;}let H=d$();if(V.lit!==B||V.folds!==U||V.guard!==H){if(V.lit=B,V.folds!==U)V.foldsBefore=V.folds;V.folds=U;V.guard=H;V.key=T7(V.lane,B,U);V.descriptor=null;V.standIn=void 0}return V}var T7=($,J,Q)=>`${$}${SZ(J)}${d5(Q)}`;function uQ($){let J=mQ.get($);if(J===void 0)J=$6($.wgslDefs)|$6($.evaluateDefs??""),mQ.set($,J);return J}var mQ=new WeakMap;function RV($,J,Q,Z,q){let{causticClass:Y,lit:X}=Q;return{...Q.through,...q?null:mq(X,Q.lane),liquid:()=>AV($,J,Y,X,Z)}}function mq($,J){let Q=LZ($,J,"water");if(Q!==null)return Q;return q9($)?{watchdogMargin:!0}:null}function hV(a,b,c,d,e,f){return (hV=$c0C(111)).call(this,a,b,c,d,e,f)}function DJ($,J,Q,Z,q=!1,Y=null,X=0,K=null,j=!1,z=!1,V=0){let B=Q$(Q,Z,q,X);if(B.descriptor===null||B.gpu!==$||B.pipelines!==J){B.gpu=$;B.pipelines=J;B.descriptor=hV($,J,Q,B,q,X);B.options=RV($,Q,B,q,(X&(i$|n))!==0);B.standIn=void 0;B.firstFrom=null;B.firstDescriptor=null;B.textsOwed=!0;}let v$13;vV:{let $$25=B,J$22=Y;{let $=$$25,J=J$22;let Q=J===null?null:Q6(J6(J,$.lane)),Z=Q!==null&&Q.programKey!==$.lit.programKey?Q:null,q=$.foldsBefore!==$.folds;if(Z===null&&!q){v$13=$.options;break vV;}let Y=Z===null?"":`/light/${Z.programKey??""}`;if($.standIn===void 0||$.standInProgram!==Y){$.standInProgram=Y;let X=[];if(Z!==null){X.push(T7($.lane,Z,$.folds));}if(q){X.push(T7($.lane,$.lit,$.foldsBefore));}if(Z!==null&&q){X.push(T7($.lane,Z,$.foldsBefore));}$.standIn={...$.options,standIn:X}}v$13=$.standIn;}}let U=gV(B,v$13,K,j,(X&n)!==0);let H=z&&EV(J,B.key,U);let G=U;if(H&&(X&i$)===0){let C=J.enterLead(V);try{G=fV($,J,Q,B,B.descriptor,q,X,U)}finally{J.leaveLead(C)}}IZ(B.lit,B.key);let D=H&&G===U?J.enterLead(V):-1,M;try{M=J.getRenderPipeline(B.key,B.descriptor,G)}finally{if(D>=0)J.leaveLead(D)}if(G!==U){_V(J,B.key,M);}if(B.textsOwed&&wZ()){B.textsOwed=!1;if(J.peekRenderPipeline(B.key)===null){TV($,Q,B,q,X)}}return M}function EV($,J,Q){if($.peekRenderPipeline(J)!==null)return!1;return K6(Q?.standIn).every((Z)=>$.peekRenderPipeline(Z)===null)}function fV($,J,Q,Z,q,Y,X,K){let j=K6(K?.standIn);let z=cq(J);let V=null;for(let B=0;B<j.length&&V===null;B+=1){let U=z.get(j[B]);if(U===void 0)continue;U.handle=pQ(J,U.key,U.descriptor),V=U.key}if(V===null&&(X&n)!==0)return K;if(V===null){V=(`${(Z.key)}/first-sight`);if(Z.firstDescriptor===null){let B=M6(Q.params,Z.causticClass,X,I7($.device)),U=V;Z.firstDescriptor=function(){let H=q(),G=w5($.device)&&H.fragment!==void 0?H.fragment.module:dq($.device,k8(B,Y),"lume water first sight");return{...H,label:U,fragment:{module:G,entryPoint:F8,targets:H.fragment?.targets??[]}}}}z.set(Z.key,{key:V,descriptor:Z.firstDescriptor,handle:pQ(J,V,Z.firstDescriptor)})}if(Z.firstFrom!==K||Z.firstKey!==V||Z.firstOptions===void 0)Z.firstFrom=K,Z.firstKey=V,Z.firstOptions={...K,standIn:[...j,V]};return Z.firstOptions}function pQ($,J,Q){return $.arrivingDrawScope(()=>$.getRenderPipeline(J,Q))}function _V(a,b,c){return (_V=$c0C(112)).call(this,a,b,c)}var cQ=new WeakSet,wV=new WeakMap;function cq($){return u0(wV,$)}function dq($,J,Q){let Z=g5($).waterModules;return Y6(Z,J,()=>$.createShaderModule({label:Q,code:J}))}function gV($,J,Q,Z,q){if(Q===null)return J;if($.twin!==Q||$.twinFrom!==J||$.twinSame!==Z||$.twinOptions===void 0){let Y=K6(J?.standIn);if($.twin=Q,$.twinFrom=J,$.twinSame=Z,Z)$.twinOptions={...J,standIn:[Q,...Y],samePicture:!0};else $.twinOptions=q?{...J,standIn:[...Y,Q],standInCosts:!0}:{...J,standIn:[...Y,Q]}}return $.twinOptions}function MM($,J,Q,Z){if(Z.length===0)return;let q=zq(ZJ($,!1),J,Q),Y=v0($);for(let X of Z){let K=e5(X.overrides);DJ(q,Q,{params:K,structuralKey:X.key},Y,!1,null,tq((pZ()||!JZ()),K))}__sc.info(`[lume water] warm: ${Z.length} recipe(s) asked`)}function lq($){let J=$.params;return!!$.geometry.grid&&J.transparent&&$.vertexSource===void 0&&J.waveHeightScale>0&&(J.waveIntensity>0||J.swellAmplitude>0)}function nq(a,b,c,d,e,f){return (nq=$c0C(113)).call(this,a,b,c,d,e,f)}var A7=($)=>$.guestOnly===!0||$.nearGuest!==void 0,q6=($)=>$.cullProjection===void 0||$.cullCropsOwnLens===!0;function uV($,J,Q,Z,q,Y,X){J.enterScope(Y);try{let K=DJ($,J,Q,Z,q,null,X);if(X===n&&!J.compilesCostFramesOnThisDevice)Q1($,J,Q,Z,q);return K}finally{J.leaveScope(Y)}}var s={gpu:null,pipelines:null,look:null,lighting:null,motion:!1,stood:null,cuts:0,twin:null,same:!1,share:0};function dQ(){let{gpu:$,pipelines:J,look:Q,lighting:Z,motion:q,stood:Y,cuts:X,twin:K,same:j,share:z}=s;if($===null||J===null||Q===null||Z===null)throw Error("internal: the water surface's ask ran outside its call");return DJ($,J,Q,Z,q,Y,X,K,j,!0,z)}function mV($,J){let Q=J.sortCentre,Z=$.renderOrigin??pV;return $.pipelines.eye.sphere(Q[0]-Z[0],Q[1]-Z[1],Q[2]-Z[2],Pq(J))}var pV=[0,0,0];function lQ(a,b,c,d,e,f,g,h){return (lQ=$c0C(114)).apply(this,arguments)}function aq($){let J=(IY[$])?.rays??0;return (((IY[$])?.rays??1)>1)&&cZ(J)<J}function tq($,J){if(s5())return n;if(!j6())return 0;return($&&J.refractionEnabled?GJ:0)|(z6()?FJ:0)}function cV(a,b,c,d,e,f,g,h,i){return (cV=$c0C(115)).call(this,a,b,c,d,e,f,g,h,i)}function nQ($,J,Q,Z,q,Y){let X=Q$(Q,Z,q,Y);return X.descriptor!==null&&X.gpu===$&&X.pipelines===J}var dV=240;function lV(a,b,c){return (lV=$c0C(116)).call(this,a,b,c)}var R5=16,nV=[],iV=[];function iQ($,J){let Q=$.indexOf(J);if(Q>=0)return Q;return $.push(J),$.length-1}var aQ=new WeakMap,aV=1;function c$($){if(typeof $!=="object"||$===null)return 0;let J=aQ.get($);if(J===void 0)aQ.set($,J=aV++);return J}function tV($,J,Q,Z,q){let Y=$.viewByGroup.get(J.frameBindGroup);if(Y===void 0){let G=[],D=[],M=new Float32Array(24);Y={group:new WeakRef(J.frameBindGroup),passGroup:null,lighting:null,stood:null,motion:!1,motionMain:!1,guestOnly:!1,nearGuest:!1,cameraLayers:i5,shareColor:null,shareDepth:null,wordsRevision:-1,entries:new Map,looks:new Map,collects:0,ranged:new Set,gridCamera:new Float32Array(48),gridPlanes:M,gridForward:M.subarray(16,19),gridCull:-1,gridFog:new Float32Array(NZ),gridOcclusion:null,gridOcclusionRevision:void 0,wallHid:0,windows:null,drawGroups:[null,null,null,null],drawGroupKeys:["","","","","","","",""],farFirst:new Map,owed:new Set,waiting:new Set,tinting:new Set,readiness:-1,opaque:G,opaqueOwners:[],opaqueSub:[],alpha:D,alphaOwners:[],alphaSub:[],sortedView:new Float32Array(16),sortedOrigin:new Float64Array(3),sorted:!1,twin:!1,collectedAt:-1,kind:"main",drawsOpaque:{opaque:G},drawsAlpha:{alpha:D},drawsBoth:{opaque:G,alpha:D}},$.viewByGroup.set(J.frameBindGroup,Y),$.views.push(Y)}let X=J.motionVectors===!0,K=J.motionFrameId!==void 0,j=J.guestOnly===!0,z=J.nearGuest!==void 0,V=vZ(J),B=J.viewportShare,U=B?.colorView??null,H=B?.depthView??null;if(Y.passGroup!==Q||Y.lighting!==Z||Y.stood!==q||Y.motion!==X||Y.motionMain!==K||Y.guestOnly!==j||Y.nearGuest!==z||Y.cameraLayers!==V||Y.shareColor!==U||Y.shareDepth!==H||Y.wordsRevision!==$.wordsRevision){Y.passGroup=Q,Y.lighting=Z,Y.stood=q,Y.motion=X,Y.motionMain=K,Y.guestOnly=j,Y.nearGuest=z,Y.cameraLayers=V,Y.shareColor=U,Y.shareDepth=H,Y.wordsRevision=$.wordsRevision;for(let G of $.surfaces.values())Y.owed.add(G);for(let G of Y.entries.keys())Y.owed.add(G)}return Y}function oq($){$.windows?.texture.destroy(),$.windows=null,$.farFirst.forEach((J)=>J.buffer.destroy()),$.farFirst.clear(),$.drawGroups.fill(null),$.drawGroupKeys.fill(""),$.looks.clear(),$.entries.clear(),$.ranged.clear(),$.wallHid=0;for(let J of[$.opaque,$.opaqueOwners,$.opaqueSub,$.alpha,$.alphaOwners,$.alphaSub])p0(J,0)}function rq($,J){$.owed.delete(J),$.waiting.delete(J),$.tinting.delete(J);let Q=$.entries.get(J);if(Q===void 0)return;$.entries.delete(J),$.ranged.delete(Q),$.wallHid-=Q.wallHid;for(let q=Q.commands.length-1;q>=0;q-=1)Z1($,Q,q,!1,null,null);let Z=Q.viewLook;if(Z.entries-=1,Z.entries===0&&Z.look.members===0)$.looks.delete(Z.look)}function tQ($,J,Q,Z){for(let q=Z+1;q<$.length;q+=1){eq($,J,Q,q,q-1);}$.pop(),J.pop(),Q.pop()}function sQ($,J,Q,Z,q,Y){let X=$.length;for(;X>0&&(J[X-1].serial>q.serial||J[X-1].serial===q.serial&&Q[X-1]>Y);X-=1){eq($,J,Q,X-1,X);}$[X]=Z,J[X]=q,Q[X]=Y,q.at[Y]=X}function eq($,J,Q,Z,q){$[q]=$[Z],J[q]=J[Z],Q[q]=Q[Z],J[q].at[Q[q]]=q}function oV(a,b,c,d){return (oV=$c0C(117)).call(this,a,b,c,d)}function J1($,J,Q,Z,q,Y,X,K,j){let z=$.standRows?.has(j.id)===!0;if(Z.readAt===Q.collects&&(!z||Z.readForPicture))return Z.pipeline!==null;Z.readAt=Q.collects,Z.readForPicture=z;let V=Z.look;let B=KJ($,J,V);let U=q.motionVectors===!0;let H;{let J=V;let Q=tq($.refractionCut,J.params);H=(Q&n)!==0?Q:Q|(aq((W9(k9().tier)))?n$:0);}let G=U?1:0;let D=cV($,J,q,j,V,X,U,K,H);let M=q.pipelines.drawable(D);let C=oV($,J,Q,q);let W=D.pipeline!==null&&V.cutsDrawn[G]===n;let k=q.pipelines.compilesCostFramesOnThisDevice;let O=(H&n)!==0&&(W||!k)?Q1(J,q.pipelines,V,X,U,k):null;Z.tint=W?O?.pipeline??null:null;let P=O!==null&&O.pipeline===null&&!O.failed;if(Z.tintAhead=P&&k,Z.building=!D.pipeline&&!D.failed,Z.waiting=!D.pipeline||C===null||P&&!k,!M||!C)return Z.pipeline=null,!1;let T=q.viewportShare;let S=V.params.transparent&&T?.depthView&&(T.colorView||$.refractionOff&&!K7((W9(k9().tier))))?SV($,J,V,B,T.colorView,T.depthView):B.materialBindGroup;Z.readsColour=$.colourAsked&&S!==B.materialBindGroup&&Boolean(T?.colorView);let v=Z.bindGroups;return v[0]=q.frameBindGroup,v[1]=Y,v[2]=S,v[3]=C,Z.pipeline=M,!0}function Q1(a,b,c,d,e){return (Q1=$c0C(118)).apply(this,arguments)}function rV($,J){let{fragment:Q,depthStencil:Z,...q}=$;return{...q,label:`${$.label??"water"}/floor-tint`,...Q!==void 0?{fragment:{module:Q.module,entryPoint:D8,...Q.constants!==void 0?{constants:Q.constants}:{},targets:f5({motion:J,blend:W4,motionWriteMask:0})}}:{},...Z!==void 0?{depthStencil:{...Z,depthWriteEnabled:!1}}:{}}}function D5(a,b,c){return (D5=$c0C(119)).call(this,a,b,c)}function eV($,J){return{pipeline:$,bindGroups:J.bindGroups,...J.indexBuffer!==void 0?{indexBuffer:J.indexBuffer}:{},draw:J.draw,throughTwin:!1}}function $z($,J,Q,Z,q,Y,X,K){rq(Q,K);let j=K.look;if($.surfaces.get(K.id)!==K||K.slot<0||!K.surface||j===null||Z.guestOnly===!0&&K.clipPlane===null||!RZ(Q.cameraLayers,K.cameraLayers))return;if(K.foldedBy!==null)return;if(!IV($,j.params.channelFrame,K.geometry))return;let z=Q.looks.get(j);if(z===void 0)Q.looks.set(j,z={look:j,transparent:j.params.transparent,entries:0,bindGroups:[null,null,null,null],pipeline:null,tint:null,tintAhead:!1,readsColour:!1,readAt:-1,readForPicture:!1,waiting:!1});let V={record:K,serial:K.serial,viewLook:z,commands:[],sortables:[],at:[],farFirst:null,grid:null,level:0,stride:1,wallHid:0};Q.entries.set(K,V),z.entries+=1;let B=J1($,J,Q,z,Z,q,Y,X,K);if(V.stride=z.tint!==null&&z.transparent?2:1,z.waiting)Q.waiting.add(K);if(z.tintAhead)Q.tinting.add(K);if(!B||J$(K.fadeWord))return;let U=z.transparent;if(K.gridSigma>0&&QJ(K)){let H=K.slot*2**$7;let G={buffer:zQ(J.device),format:"uint16"};let D={indexCount:s8,firstIndex:c9,baseVertex:H,instanceCount:0,firstInstance:t0};let M={indexCount:c9,baseVertex:H,instanceCount:0,firstInstance:t0};C5(Q,V,D5(z,D,G),U,z.readsColour),C5(Q,V,D5(z,M,G),U,z.readsColour),V.grid={fan:D,moving:M}}else{if(K.triangles===0)return;V.farFirst=K.indexAt>=0?nq(K,Q,A7(Z),q6(Z),Z.camera,J.device):null;let H=V.farFirst?.buffer??(K.indexAt>=0?J.arena.indices.buffer:null),G=H!==null?{indexCount:V.farFirst?.count??K.triangles*3,instanceCount:1,firstIndex:V.farFirst!==null?0:K.indexAt,baseVertex:K.vertexAt,firstInstance:K.slot}:{vertexCount:K.triangles*3,instanceCount:1,firstVertex:K.vertexAt,firstInstance:K.slot};C5(Q,V,D5(z,G,H!==null?{buffer:H,format:"uint32"}:void 0),U,z.readsColour)}Q.ranged.add(V),CJ(Q,Z),K1($,J,Q,Z.camera,A7(Z),q6(Z),V)}function C5(a,b,c,d,e){return (C5=$c0C(120)).call(this,a,b,c,d,e)}function k5($,J,Q,Z,q,Y){for(let X=Q*J.stride;X<(Q+1)*J.stride;X+=1)Z1($,J,X,Z,q,Y)}function Z1(a,b,c,d,e,f){return (Z1=$c0C(121)).call(this,a,b,c,d,e,f)}function Jz(a,b,c){return (Jz=$c0C(122)).call(this,a,b,c)}function qz($){let{store:J,view:Q,camera:Z}=x,q=J?.gpu??null;if(J===null||q===null||Q===null||Z===null)return;K1(J,q,Q,Z,x.guest,x.windowed,$)}function CJ($,J){CZ(l5(J.cullProjection??J.camera.projection,J.camera.view,S5),$.gridPlanes),x.focal=DZ(J),$.gridOcclusion=n5(J),$.gridOcclusionRevision=$.gridOcclusion?.revision}var oQ=new Float64Array(24);function q1($){return Hz(oQ,U6($),$.transform,$.gridReach),oQ}var Y1=($,J)=>$?.hidesPoints(q1(J),8)===!0;function X1($,J,Q,Z){let q=$.gridPlanes,Y=J.drawArray[z9+3];if(!(Y>=0))return!1;let X=J.sortCentre,K=X[0]-Z[0],j=X[1]-Z[1],z=X[2]-Z[2];for(let V=0;V<(J.sea?5:6);V+=1)if(q[V*4]*K+q[V*4+1]*j+q[V*4+2]*z+q[V*4+3]<-Y)return!0;if(Y1($.gridOcclusion,J))return"walls";return $.gridFog[0]>0&&!J.params.depthWrite&&bZ($.gridFog,0,Q,$.gridForward,K,j,z,Y)}function GM($,J){let Q=$.peekStore(j0)?.views.find((q)=>q.kind==="main"),Z=0;for(let q of Q?.entries.values()??[]){if(Y1(J,q.record)){for(let Y of q.at)if(Y>=0)Z+=1/q.stride}}return Z}function FM($){let J=$.peekStore(j0),Q=J?.wallWithheld??0;if(J)J.wallWithheld=0;return Q}function DM($,J){let Q=$.peekStore(j0)?.viewByGroup.get(J.frameBindGroup);if(!Q)return 0;CJ(Q,J);let Z=0;for(let q of Q.waiting)if(Q.entries.get(q)?.viewLook.building&&(A7(J)||!X1(Q,q,J.camera.position,e($).origin)))Z+=1;return Z}function K1($,J,Q,Z,q,Y,X){let K=e($.scene).origin,j=!q&&X1(Q,X.record,Z.position,K),z=j===!1;Q.wallHid-=X.wallHid-(X.wallHid=j==="walls"?X.commands.length/X.stride:0);let V=X.grid;if(V===null){if(z){Yz:{let $$30=X,J$27=Z,Q$13=q,Z$7=K;{let $=$$30,J=J$27,Q=Q$13,Z=Z$7;let q=$.record,Y=q.geometry.ladder,X=$.commands[0]?.draw;if(!Y||X===void 0||"indirect"in X||$.farFirst!==null||q.indexAt<0)break Yz;$.level=IQ(Y,q,X,J,Z,x.focal,$.level,Q)}}}k5(Q,X,0,z,Z.view,K);return}let B=z?Xz($,Z,q,Y,X.record):null;if(B!==null&&(B.firstInstance&x$)!==0){OQ:{let $$12=J.arena,J$12=(Q.windows=Q.windows===null?kQ(J.arena):WQ(J.arena,Q.windows)),Q$6=X.record.slot,Z$2=B.window;{let $=$$12,J=J$12,Q=Q$6,Z=Z$2;if(Q<0)break OQ;Kj.set(Z),Y5($.device,J,Q,1,NQ,0)}}}let{moving:U,fan:H}=V;U.instanceCount=B?.instanceCount??0,U.firstInstance=t0+(B?.firstInstance??0),H.instanceCount=B?.fanInstanceCount??0,H.firstInstance=t0+(B?.fanFirstInstance??0),k5(Q,X,0,H.instanceCount>0,Z.view,K),k5(Q,X,1,U.instanceCount>0,Z.view,K)}function Xz($,J,Q,Z,q){let Y=$q(q);if(!Y)return null;let X=Q?null:J.position,K=X!==null&&Z?J.view:null;return VQ($.gridScratch,q.transform,Y,q.gridSigma,X,J.projection,q.drawArray,N$,q.gridFlat,K,q.gridReach)}function Vz($,J,Q){if(J.surfaces.size===0||!J.gpu)return;let Z=J.gpu,q=Q.passBindGroup??EZ(Q.device,Q.pipelines),Y=Q.lighting??v0();if(J.lighting!==Y){if(J.lightingWhole)J.lightingStood=J.lighting;J.lighting=Y,J.lightingWhole=!1}lV(J,Z,Q.pipelines);let X=dZ()&&!J.lightingWhole?J.lightingStood:null;let K=tV(J,Q,q,Y,X);K.collects+=1;let j=B7();K.collectedAt=j;if(J.views.length>1){{let $$27=J,J$24=j;{let $=$$27,J=J$24;let Q=$.views,Z=0;for(let q=0;q<Q.length;q+=1){let Y=Q[q],X=Y.group.deref();if(X!==void 0&&J-Y.collectedAt<=dV){Q[Z++]=Y;continue}if(oq(Y),X!==void 0)$.viewByGroup.delete(X)}p0(Q,Z)}}}Qz:{let $$28=K,J$25=Q;{let $=$$28,J=J$25;let Q=J.throughDepthLook===!0?void 0:!1;if(Q===$.twin)break Qz;$.twin=Q;for(let Z=0;Z<$.alpha.length;Z+=1)if($.alpha[Z].command.liquid===!0)$.alpha[Z].command.throughTwin=Q}}if(J.farFirst.size>0){{let $$31=J,J$28=K,Z$8=Z.device;{let $=$$31,J=J$28,Z=Z$8;x.view=J,x.camera=Q.camera,x.guest=A7(Q),x.windowed=q6(Q),x.device=Z,$.farFirst.forEach(Sj),L7()}}}if(OZ(WZ($),Q.viewFog===void 0&&Q.worldView!==!0&&Q.peelPass!==!0?MZ($):null,K.gridFog,0)||n5(Q)?.revision!==K.gridOcclusionRevision)K.gridCull=-1;if(K.ranged.size>0){Zz:{let $$29=J,J$26=K;{let $=$$29,J=J$26;let Z=Q.camera,q=J.gridCamera,Y=q6(Q)?1:0,X=J.gridCull!==Y,K=Q.cullProjection??Z.projection;for(let j=0;j<16&&!X;j+=1)X=q[j]!==Z.view[j]||q[16+j]!==Z.projection[j]||q[32+j]!==K[j];if(!X)break Zz;q.set(Z.view),q.set(Z.projection,16),q.set(K,32),J.gridCull=Y,x.store=$,x.view=J,x.camera=Z,x.guest=A7(Q),x.windowed=Y===1,CJ(J,Q),J.ranged.forEach(qz),L7()}}}let z=Q.pipelines.readinessRevision;if(K.readiness!==z){K.readiness=z;for(let H of K.waiting)K.owed.add(H);for(let H of K.tinting)K.owed.add(H)}else if(K.waiting.size>0){{let $$32=J,J$29=Z,Q$14=K,Z$9=Q;{let $=$$32,J=J$29,Q=Q$14,Z=Z$9;for(let K of Q.waiting){let j=Q.entries.get(K)?.viewLook;if(j===void 0){Q.owed.add(K);continue}let z=j.pipeline;if(J1($,J,Q,j,Z,q,Y,X,K),j.pipeline!==z||!j.waiting)Q.owed.add(K)}}}}if(K.owed.size>0){for(let H of K.owed){$z(J,Z,K,Q,q,Y,X,H);}K.owed.clear()}let V=e($).origin;Jz(K,Q,V);if(K.waiting.size===0)J.lightingWhole=!0;else J.drawsPending=!0;let v$14;zz:{let $=Q;if($.dry===!0){v$14="dry";break zz;}if($.guestOnly===!0){v$14="guest";break zz;}if($.nearGuest!==void 0){v$14="near-guest";break zz;}if($.camera.mirror===!0){v$14="mirror";break zz;}if($.liveTarget!==void 0){v$14="door";break zz;}if($.viewFit!==void 0){v$14="capture";break zz;}v$14="main";}K.kind=v$14;if(Q.cullSlot===void 0)J.wallWithheld+=K.wallHid;let B=K.opaque.length,U=K.alpha.length;if(B===0)return U===0?void 0:K.drawsAlpha;return U===0?K.drawsOpaque:K.drawsBoth}function j1($){let J=0;for(let{draw:Q}of $.commands)if(!("indirect"in Q))J+=kZ(Q);return J}function Bz($,J){if($===void 0||$===null)return-1;return $===J?0:1}function CM($){let J=$.peekStore(j0);if(!J)return null;let Q=e($).origin,Z=B7(),q=[];for(let Y of J.surfaces.values()){let X=q1(Y);let K=null;let j=0;let z=0;let V=[];for(let B of J.views){let U=B.entries.get(Y);if(U===void 0||U.commands.length===0)continue;let H=Z-B.collectedAt,G=Y.look?.gpu;V.push({kind:B.kind,framesSince:H,pipeline:U.viewLook.pipeline?.label??null,laid:U.at.filter((D)=>D>=0).length,material:Bz(U.viewLook.bindGroups[2],G?.materialBindGroup)});if(K===null||H<K){K=H;j=U.commands.length;z=j1(U)}}q.push({id:Y.id,sea:Y.sea,room:Y.slot>=0,framesSinceDrawn:K,draws:j,triangles:z,low:[X[0]+Q[0],X[1]+Q[1],X[2]+Q[2]],high:[X[21]+Q[0],X[22]+Q[1],X[23]+Q[2]],by:V,fade:Y.fadeWord})}return q.sort((Y,X)=>X.triangles-Y.triangles)}function kM($){let J=$.peekStore(j0),Q=J?.views.find((q)=>q.kind==="main");if(J===null||Q===void 0)return null;let Z=new Map;for(let[q,Y]of Q.entries){if(Y.commands.length===0)continue;let X;Uz:{let $=q;if($.sea){X="sea";break Uz;}if(oZ($.id)){X="painted";break Uz;}X=$.id.startsWith(tZ)?"marks":"things";}let K=Z.get(X)??{source:X,surfaces:0,draws:0,triangles:0};K.surfaces+=1;K.draws+=Y.commands.length;K.triangles+=j1(Y);Z.set(X,K)}return[...Z.values()].sort((q,Y)=>Y.triangles-q.triangles||Y.surfaces-q.surfaces)}function Hz($,J,Q,Z){V6(X0,J,Q);let q=Math.max(Z,0)*1.000001+0.001;for(let Y=0;Y<8;Y+=1)$[Y*3]=Y&1?X0[3]+q:X0[0]-q,$[Y*3+1]=Y&2?X0[4]+q:X0[1]-q,$[Y*3+2]=Y&4?X0[5]+q:X0[2]-q};

function aa($){throw Error(`lume water ripples: no kernel tap at r\u00b2 = ${$}`);
}

function ca(Z,J){for(let q of Z.surfaces.values()){if(q.rippleNamed)continue;let Y=iZ(q.bareParams.waveIntensity,J),X={detailNormalStrength:Y,detailNormalEnabled:Y>0};q.bareParams={...q.bareParams,...X},q.params={...q.params,...X},q.gridFlat=d9(q.params,q.gridSigma),q.mediumOpticsKey=x8(q.params),q.uniformsDirty=!0,P0(Z,q)}
}
function da(){throw Error("lume water: the moving water's field has no GPU state on this device");
}
function ea(J,Q,$){if(!J)return Q.mediumSources;return Hq(Q,$,J,Q.mediumViewSources),Q.mediumViewSources
}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{hPS as u4}from"./e1e86e16-4401931492059170.mjs";import"./a66ed850b9ae9a1e.mjs";import{Phf as F3,_Dq as G3}from"./0528d20b-dcf779343cd37139.mjs";import"./4449bbefbe91525c.mjs";import"./511c4ba8fc756907.mjs";import{DNU as P5,J8Q as $J,X4J as p2,apC as P7,gj3 as m0,lGg as B6,m4q as W7}from"./fd56cd25-5bf098c53caccd9c.mjs";import{Tj9 as oZ,mGG as tZ,opG as sZ}from"./a2703a322ac55ec5.mjs";import"./970690fd38ff6da5.mjs";import"./048929e9b938645c.mjs";import"./f33fb28295012c9a.mjs";import"./aa6878bc8e4bd109.mjs";import{jep as D3}from"./7af051fe6abb7418.mjs";import"./ec60b40868ae28d0.mjs";import"./297f4948753438c1.mjs";import"./1e4c4ccf6c4d8588.mjs";import"./31535d8b97f856ec.mjs";import{G2I as fZ}from"./857ab312-61ddda634feb5d33.mjs";import{A8T as q8,BXK as b6,BZQ as R,Co8 as f,DTe as Z8,DkF as H$,Du6 as gJ,EOz as Z7,Eha as X8,FZo as l6,HXe as _J,KV3K as y6,L6d as r7,MTU as r,N3y as EJ,OXS as Y7,OjY as y0,QRB as q$,RIw as NJ,UYQ as Y8,V6O as j8,WeM as wJ,XoK as s7,Xus as q0,ZTI as t$,Z_w as o7,aPR as Y9,b8o as R0,bnc as g2,c8X as C0,dke as O6,eTV as K8,euq as _2,fOx as P6,flP as K9,g1N as m2,iWF as K$,jGl as _7,mRT as fJ,ofI as x6,p39 as w2,pK_ as X9,qBY as d6,rzO as U$,tV$ as q7,usB as M$,wAz as D$,yHM as A4,z4n as w0}from"./dcf42229-34302342461efd1d.mjs";import"./2d4e748cc0e59c96.mjs";import"./18245dc615dd2fc6.mjs";import"./47c3b1e86883ac1a.mjs";import"./be3ce4f308da147d.mjs";import"./cb19f1a597a8ac05.mjs";import"./c522eb135f4cc01b.mjs";import"./96867ba91392ffbc.mjs";import{Hpl as G6,Mjc as iZ,bdb as u2,dAj as f2,lfG as WJ,zUn as e5,zs7 as aZ}from"./a9cc1ec7e83caf6a.mjs";import{xIb as kJ}from"./cfe77665f080a687.mjs";import"./30ca63f6a73d4637.mjs";import{v2d as p0}from"./e94dbab78277fe45.mjs";import"./fb1a6101eedcad37.mjs";import"./a3c47ad381141b7d.mjs";import"./9aba4d00162585a7.mjs";import"./19e8ac2898823807.mjs";import"./15b7dc390eb7835d.mjs";import"./8036015a501379d5.mjs";import{_H6 as lZ,aX0 as nZ}from"./128cad34f6c19beb.mjs";import"./9d9bc12a-e29a5ee001a31e07.mjs";import"./449c1aed-1cac84dffce26c54.mjs";import"./49829aea267b95a2.mjs";import"./48cdbd82cb8a70d0.mjs";import"./af4725680638eb2b.mjs";import"./de5348d4-ef532106910629cb.mjs";import"./0e28a35f3c3d2584.mjs";import"./eb1cfbd7-9ca70ed6fcce44db.mjs";import"./acb621c0-7b0d25d79a8a57b8.mjs";import"./e580560d961413d2.mjs";import"./2dd03b3c-ae3bad06f00c2956.mjs";import"./f437588d0894b236.mjs";import"./120e4628-1c7df5f90bc1406c.mjs";import"./1a610d2b-b07c3f882b0be176.mjs";import"./000cae3ed5fcf480.mjs";import"./3185c0c7683fd400.mjs";import"./56474b74bb87d97a.mjs";import"./3e20ec433601fc71.mjs";import"./b281e841655ca231.mjs";import"./09723e417d25bb2f.mjs";import"./0d004466878cd8d5.mjs";import"./b6a503490fc23cd3.mjs";import"./9fcf275e4b51bf10.mjs";import"./e89c4f25046f70a6.mjs";import"./4f29534f39c39839.mjs";import"./02dc5b34d72a28bd.mjs";import"./aa1ae7ade66c43fb.mjs";import"./131b3a88fea8aaa4.mjs";import"./12561c9e788df4bb.mjs";import"./3a1d23fd02ea6481.mjs";import"./56906242-8226fe4eb27aaad5.mjs";import"./c5a6cab2-79b40d38888397e0.mjs";import"./a0930bf163362e48.mjs";import"./b0ae852abe313b99.mjs";import"./4893bc22c87f5aee.mjs";import"./fe1722910da55e5a.mjs";import"./8bdcb1e2-04e4a4f04e3bf17d.mjs";import"./d876e061714751a8.mjs";import"./26868d54c285fced.mjs";import"./a22a069e-3b0604a0a7dced22.mjs";import"./31ed9c3be8aa11bb.mjs";import"./98f23d00f1405446.mjs";import"./13f788d7-400e6bff538dbefd.mjs";import"./044cde0b47918ed4.mjs";export{BM as setWaterSurfaceFade,CM as waterSurfaceCensus,Cq as waterClosedFacingOf,DM as waterDrawsOwedToPicture,FM as takeWaterWithheld,GM as waterDrawsHiddenUnder,HM as activeWaterMedia,Hj as waterRouteGeometryOf,Hz as waterSurfaceHull,KM as upsertWaterSurface,KX as waterMediumReachPx,MM as warmWaterPipelines,UM as waterSurfaceStands,VM as restateWaterSurfaceTransform,Wj as removeWaterSurface,XM as setWaterStandRows,ZJ as ensureWaterResources,h4 as WaterMediumPass,j0 as WATER_STORE,jM as setWaterRippleFollowsWaves,jX as mainFrameWaterMediumVariant,kM as waterSourceCensus,zM as setWaterSurfaceLayers};
