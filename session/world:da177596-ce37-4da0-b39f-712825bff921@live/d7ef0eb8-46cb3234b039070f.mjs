import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'((J,$)=>function(q,Y){for(let B=0;B<J;B++)for(let{index:j,share:V}of q){let U=Array.from({length:B},(P,G)=>` && ${j} != pickIndex${G}`).join(""),H=Y?`(${V} > pickWeight${B} || (${V} == pickWeight${B} && ${j} < pickIndex${B}))`:`${V} > pickWeight${B}`;$.push(`    if (${H}${U}) { pickIndex${B} = ${j}; pickWeight${B} = ${V}; }`)}})',()=>'(function(z,J){let{near:$}=z;let X=z.hasPbrLayers&&$&&(z.tier===0||J===0);let Z=(z.detailNormals||z.hasPbrLayers)&&$&&J===0;let Q=X||Z;let q=z.hasPbrLayers&&!X;let Y=z.hasStochasticLayers&&$;let B=z.drifts>=2;let j=z.drifts===3;let V=z.hasPixelLayers;let U=z.textured?"terrain_albedoTexels(fineRow.xy)":"vec2<f32>(textureDimensions(albedoArray, 0))";let H=z.textured?"terrain_nroTexels(nroFineRow)":"vec2<f32>(textureDimensions(nroArray, 0))";let G=function(L,C,b,O){let y=(V?`terrain_pixelEdgeUv(${C}, ${b}, ${O}, ${L==="nro"?H:U}, pixelEdge)`:C);if(L==="nro")return z.textured?`terrain_nroGrad(${y}, nroLayer, nroFineRow, ${b}, ${O})`:`textureSampleGrad(nroArray, atlasSampler, ${y}, nroLayer, ${b}, ${O})`;return z.textured?`terrain_albedoGrad(${y}, albedoLayer, fineRow.xy, ${b}, ${O})`:`textureSampleGrad(albedoArray, atlasSampler, ${y}, albedoLayer, ${b}, ${O})`};let F=(L,C,b,O,y)=>[..."ABC"].map(function(p1,f1){let d1=`${C} + ${b}.offset${p1}`;return`${G(L,d1,O,y)} * ${b}.weights.${"xyz"[f1]}`}).join(" + ");let M=`let nroFloor = uvScale * max(fineRow.w * spanTop, 1.0);\n        let nroDdx = uvDdx * nroFloor;\n        let nroDdy = uvDdy * nroFloor;\n        ${Y?`var nroSample = vec4<f32>(0.0);\n        if (antiTiling) { nroSample = ${F("nro","layerUv","jitter","nroDdx","nroDdy")}; } else { nroSample = ${G("nro","layerUv","nroDdx","nroDdy")}; }`:`let nroSample = ${G("nro","layerUv","nroDdx","nroDdy")};`}`;let k=`var jitter: StochasticTileSample;\n      if (antiTiling) { jitter = stochastic_tileSample(worldPos.xz * uvScale, f32(layer) * 13.0); }`;let K=(L,C,b,O)=>`let planeUv = vec2<f32>(worldPos.${L}, worldPos.y) * uvScale;\n          let ${O}Floor = uvScale * max(${b}.w * ${C}, 1.0);\n          let ${O}Ddx = vec2<f32>(worldDdx.${L}, worldDdx.y) * ${O}Floor;\n          let ${O}Ddy = vec2<f32>(worldDdy.${L}, worldDdy.y) * ${O}Floor;`;let S=`      let uvScale = mainRow.z;\n      let layerUv = terrain_tilePhase(in.tileOrigin, uvScale) + in.uvMeters * uvScale;`;let D=`      let albedoLayer = i32(max(mainRow.y, 0.0));\n      let albedoFloor = uvScale * max(foldRow.w * spanTop, 1.0);\n      let albedoDdx = uvDdx * albedoFloor;\n      let albedoDdy = uvDdy * albedoFloor;`;return{nro:X,derive:Z,normals:Q,meanRough:q,stochastic:Y,apart:B,each:j,pixel:V,tap:G,jittered:F,nroTop:M,jitterTop:`var jitter: StochasticTileSample;\n      if (antiTiling) { jitter = stochastic_tileSample(worldPos.xz * uvScale, f32(layer) * 13.0); }`,uvLines:`      let uvScale = mainRow.z;\n      let layerUv = terrain_tilePhase(in.tileOrigin, uvScale) + in.uvMeters * uvScale;`,albedoLines:`      let albedoLayer = i32(max(mainRow.y, 0.0));\n      let albedoFloor = uvScale * max(foldRow.w * spanTop, 1.0);\n      let albedoDdx = uvDdx * albedoFloor;\n      let albedoDdy = uvDdy * albedoFloor;`,albedoTexels:U,planeFrame:K}})']},function(){return[()=>"(function(z,J,$){return v(`  var albedo${J} = vec3<f32>(0.0);`,z.carvesSeams&&`  var height${J} = 0.5;\n  var heightPacked${J} = false;\n  var grain${J} = 0.0;`,Cz(z,J).derive&&`  var lumaCentre${J} = 0.0;`,z.carvesSeams&&`  if (pickWeight${J} > 0.0) {\n      let layer = pickIndex${J};\n      grain${J} = ${V0(J)};\n${Y0}\n${j0(z,J,$)}\n  }`)})",()=>'(function(z,J,$){let X=Cz(z,J),Z=(z.hasNoiseLayers||z.hasGradientLayers)&&`      if (mainRow.x >= ${c1}) {\n        let aux = terrain_paramsRow(layer, ${hz}u);\n        var t = heightNorm;\n${z.hasNoiseLayers?`        if (mainRow.x < ${a1}) {\n          let scale = max(aux.x, 1e-4);\n          ${z.biplanar?"if (noisePlanes.x >= 1.0) { t = terrain_paintNoise(worldPos.xz / scale, aux.y); } else { t = noisePlanes.x * terrain_paintNoise(worldPos.xz / scale, aux.y) + noisePlanes.y * terrain_paintNoise(worldPos.zy / scale, aux.y) + noisePlanes.z * terrain_paintNoise(worldPos.xy / scale, aux.y); }":"t = terrain_paintNoise(worldPos.xz / scale, aux.y);"}\n        }`:""}\n        color = terrain_colorFromStops(${xJ(pJ)}, t, aux.z);\n      }`,Q=z.hasHeightTint&&`      if (tintRow.a > 0.0) {\n        let tintStops = terrain_paramsRow(layer, ${hz}u).w;\n        let heightTintColor = terrain_colorFromStops(${xJ(fJ)}, heightNorm, tintStops);\n        color = terrain_applyTint(color, heightTintColor, tintRow.a);\n      }`;return v(`  if (resolved${J} > 0.0) {\n      let layer = pickIndex${J};`,Y0,`      let tintRow = terrain_paramsRow(layer, ${Xz}u);`,z.textured&&!z.carvesSeams&&j0(z,J,$),X.apart&&`      let pbr2Row = terrain_paramsRow(layer, ${I}u);`,X.each&&`      let emissiveRow = terrain_paramsRow(layer, ${Az}u);`,"      var color = joinRow.rgb;",z.textured&&`      color = mix(terrain_applyTintFold(albedo${J}, tintRow.rgb, foldRow.xyz), joinRow.rgb, joinRow.a);`,Z,Q,X.apart&&`      color = terrain_applyMacroNoise(color, ${X.each?"terrain_drift(worldPos.xz, emissiveRow.w)":"driftNoise"}, pbr2Row.w, pbr2Row.z);`,`      colorSum += color * resolved${J};\n  }`)})',()=>'(function(z,J,$){let X=Cz(z,J),{nro:Z,derive:Q,normals:q,meanRough:Y,stochastic:B,tap:j,jittered:V}=X,U=v(z.shadesNormals&&(q?`    normalSum += normalTs${J} * resolved${J};`:`    normalSum += vec3<f32>(0.0, 0.0, resolved${J});`),Z&&z.biplanar&&`    reliefSum += relief${J} * resolved${J};`,z.hasPbrLayers&&`    roughnessSum += roughness${J} * resolved${J};`,z.hasPbrLayers&&`    metalnessSum += metalness${J} * resolved${J};`,z.hasEmissiveLayers&&`    emissiveSum += emissive${J} * resolved${J};`);if(!q&&!z.hasPbrLayers&&!z.hasEmissiveLayers)return U;let H=Q&&`      if (${Z?"!nroOn && joined":"joined"}) {\n        let texel = terrain_albedoTexelAtMip(albedoDdx, albedoDdy, ${X.albedoTexels});\n        let lumaU = terrain_luma(${j("albedo","layerUv + vec2<f32>(texel.x, 0.0)","albedoDdx","albedoDdy")}.rgb);\n        let lumaV = terrain_luma(${j("albedo","layerUv + vec2<f32>(0.0, texel.y)","albedoDdx","albedoDdy")}.rgb);\n        normalTs${J} = normalize(vec3<f32>(-(lumaU - lumaCentre${J}) * ${dz.toFixed(2)}, -(lumaV - lumaCentre${J}) * ${dz.toFixed(2)}, 1.0));\n      }`,P=v(Z&&`      if (nroOn) {\n        ${B?`${X.jitterTop}\n        `:""}${X.nroTop}\n        normalTs${J} = patina_packedNormalTs(vec4<f32>(nroSample.rg - nroShift, nroSample.ba), pbrRow.y) * vec3<f32>(1.0, -1.0, 1.0);\n        roughness${J} = terrain_patinaRoughness(patina_packedRoughness(nroSample), pbr2Row.x);\n      }`,H),G=(k,K,S,D)=>`        if (${k} > 0.0) {\n          ${X.planeFrame(K,S,"fineRow","planeNro")}\n          ${B?`if (antiTiling) { let planeJitter = stochastic_tileSample(planeUv, f32(layer) * 13.0); ${D} = ${V("nro","planeUv","planeJitter","planeNroDdx","planeNroDdy")}; } else { ${D} = ${j("nro","planeUv","planeNroDdx","planeNroDdy")}; }`:`${D} = ${j("nro","planeUv","planeNroDdx","planeNroDdy")};`}\n          sideNro += ${D} * ${k};\n        }`,F=z.biplanar&&q&&v("      if (sideWeight > 1e-3) {",q&&`        normalTs${J} = mix(normalTs${J}, vec3<f32>(0.0, 0.0, 1.0), sideWeight);`,Z&&`        if (nroOn) {\n        var sideNro = vec4<f32>(0.0);\n        var sideNroX = vec4<f32>(0.0);\n        var sideNroZ = vec4<f32>(0.0);\n${G("sideShare.x","z","spanSide.x","sideNroX")}\n${G("sideShare.y","x","spanSide.y","sideNroZ")}\n          roughness${J} = mix(roughness${J}, terrain_patinaRoughness(patina_packedRoughness(sideNro), pbr2Row.x), sideWeight);\n          relief${J} = terrain_sideRelief(sideNroX.rg - nroShift, sideNroZ.rg - nroShift, pbrRow.y, sideShare, normalLocal) * sideWeight;\n        }`,"      }"),M=(q||Y)&&v(q&&X.uvLines,Q&&X.albedoLines,X.pixel&&q&&`      let pixelEdge = terrain_paramsRow(layer, ${R}u).z;`,"      let joined = joinRow.a < 1.0;",B&&Z&&`      let antiTiling = u32(pbr2Row.y) == ${lz.stochastic}u;`,Z&&`      let nroOn = joined && pbrRow.x >= 0.0;\n      let nroLayer = i32(max(pbrRow.x, 0.0));\n      var nroShift = vec2<f32>(0.0);\n      if (nroOn && fineRow.z > 0.5) { nroShift = terrain_paramsRow(layer, ${_}u).rg - vec2<f32>(0.5); }`,Y&&`      if (joined && pbrRow.x >= 0.0) { roughness${J} = terrain_patinaRoughness(patina_packedRoughness(terrain_paramsRow(layer, ${_}u)), pbr2Row.x); }`,q&&(z.biplanar?`      if (sideWeight < 1.0) {\n${P}\n      }`:P),F);return v(`  if (resolved${J} > 0.0) {`,q&&`  var normalTs${J} = vec3<f32>(0.0, 0.0, 1.0);`,z.hasPbrLayers&&`  var roughness${J} = 1.0;`,Z&&z.biplanar&&`  var relief${J} = vec3<f32>(0.0);`,`  let layer = pickIndex${J};`,q&&`      let mainRow = terrain_paramsRow(layer, ${T}u);`,Q&&`      let foldRow = terrain_paramsRow(layer, ${h}u);`,(q||Y)&&`      let joinRow = terrain_paramsRow(layer, ${x}u);`,z.hasPbrLayers&&`      let pbrRow = terrain_paramsRow(layer, ${u}u);`,z.hasPbrLayers&&`      let pbr2Row = terrain_paramsRow(layer, ${I}u);`,Z&&`      let fineRow = terrain_paramsRow(layer, ${W}u);`,Z&&`      var nroFineRow = vec2<f32>(0.0);\n      if (${$}) { nroFineRow = terrain_paramsRow(layer, ${R}u).xy; }`,!Z&&Q&&`      var fineRow = vec4<f32>(0.0);\n      if (${$}) { fineRow = terrain_paramsRow(layer, ${W}u); }`,z.hasPbrLayers&&`      let metalness${J} = clamp(pbrRow.z, 0.0, 1.0);`,z.hasEmissiveLayers&&`      let emissive${J} = terrain_paramsRow(layer, ${Az}u).rgb;`,M,U,"  }")})']},function(){return[()=>'(function(z,J){let{count:$,shadesNormals:X,sharpen:Z}=z,Q=Array.from({length:$},(V,U)=>U),q=(V)=>Q.map(V).join(`\n`),Y=(V)=>Q.map(V).join(" + "),B=Z&&$>1,j=Q.filter((V)=>Cz(z,V).nro&&z.biplanar);return v(B&&`  let weightSum = max(${Y((V)=>`pickWeight${V}`)}, 1e-5);`,`  let squareInv = 1.0 / max(${Y((V)=>`pickWeight${V} * pickWeight${V}`)}, 1e-10);`,B&&v(`  let faceCarve = smoothstep(${iJ}, ${rJ}, normalLocal.y);`,z.carvesSeams&&"  var grainShare = 0.0;",q((V)=>z.carvesSeams?`  var adjusted${V} = -1.0;\n  if (pickWeight${V} > 0.0) {\n    ${nJ(`height${V}`,`heightPacked${V}`)}\n    grainShare = max(grainShare, undecided);\n    adjusted${V} = pickWeight${V} / weightSum + (heightBias + grain${V} * ${kz} * undecided) * faceCarve;\n  }`:`  var adjusted${V} = -1.0;\n  if (pickWeight${V} > 0.0) { adjusted${V} = pickWeight${V} / weightSum + ${V0(V)} * ${kz} * faceCarve; }`),`  let maxAdjusted = ${Q.map((V)=>`adjusted${V}`).reduce((V,U)=>`max(${V}, ${U})`)};\n  let aaWidth = max(fwidth(maxAdjusted), 1e-4);`,z.carvesSeams?`  let blendWidth = max(aaWidth, max(${dJ}, (1.0 - ditherFade) * ${kz} * grainShare));\n  let sharpness = heightInfluence;\n  let creaseTell = 0.0;`:`  let blendWidth = aaWidth;\n  let creaseTell = smoothstep(${lJ}, ${cJ}, in.groundBend);\n  let sharpness = ditherFade * (1.0 - creaseTell);`),q(function(V){let U=B?`mix(pickWeight${V} * pickWeight${V} * squareInv, pickWeight${V} / weightSum, creaseTell)`:`pickWeight${V} * pickWeight${V} * squareInv`,H=B?`mix(${U}, smoothstep(maxAdjusted - blendWidth, maxAdjusted, adjusted${V}), sharpness)`:U;return V===0?`  let resolved0 = select(0.0, ${H}, pickWeight0 > 0.0);`:`  var resolved${V} = 0.0;\n  if (pickWeight${V} > 0.0) { resolved${V} = ${H}; }`}),`  let resolvedSum = ${Y((V)=>`resolved${V}`)};\n  let hasBlend = resolvedSum > 1e-5;\n  let resolvedInv = 1.0 / max(resolvedSum, 1e-5);\n  var colorSum = vec3<f32>(0.0);`,q((V)=>o1(z,V,J)),"  var mixed = colorSum * resolvedInv;",Z&&`  mixed *= mix(${1-pz}, ${1+pz}, macroVariation);`,z.drifts===1&&`  let driftRow = terrain_paramsRow(pickIndex0, ${I}u);\n  mixed = terrain_applyMacroNoise(mixed, driftNoise, driftRow.w, driftRow.z);`,`  var finalAlbedo = clamp(select(pool.fallbackColor, mixed * mix(${N[0]}, ${N[1]}, heightNorm), hasBlend), vec3<f32>(0.0), vec3<f32>(1.0));`,X&&"  var normalSum = vec3<f32>(0.0);",X&&j.length>0&&"  var reliefSum = vec3<f32>(0.0);",z.hasPbrLayers&&`  var roughnessSum = 0.0;\n  var metalnessSum = 0.0;`,z.hasEmissiveLayers&&"  var emissiveSum = vec3<f32>(0.0);",q((V)=>s1(z,V,J)),z.hasEmissiveLayers?"  let finalEmissive = select(vec3<f32>(0.0), emissiveSum * resolvedInv, hasBlend);":"  let finalEmissive = vec3<f32>(0.0);",X&&"  let finalNormalTs = select(vec3<f32>(0.0, 0.0, 1.0), normalize(normalSum * resolvedInv + vec3<f32>(0.0, 0.0, 1e-4)), hasBlend);",X&&(j.length>0?"  let finalSideRelief = select(vec3<f32>(0.0), reliefSum * resolvedInv, hasBlend);":"  let finalSideRelief = vec3<f32>(0.0);"),z.hasPbrLayers&&`  let finalRoughness = clamp(select(1.0, roughnessSum * resolvedInv, hasBlend), 0.0, 1.0);\n  let finalMetalness = clamp(select(0.0, metalnessSum * resolvedInv, hasBlend), 0.0, 1.0);`)})']},function(){return[()=>'((j,S)=>(L)=>j.tier===0?`clamp(${S("terrain_fadedOctave3",L,1,"macroFootprint")} * 0.5 + ${S("terrain_fadedOctave1",L,2,"macroFootprint * 2.0")} * 0.25, 0.0, 1.0)`:S("terrain_fadedOctave3",L,1,"macroFootprint"))',()=>'(function(z,J,$,X,Z,Q){if(!U0(z)){let B=X($);return{code:B,module:z.createShaderModule({label:Q,code:B}),vs:"vs",fs:"fs"}}let q;{let z$1=$,J$1=X;{let z=z$1,J=J$1;let $=q2(z);let X=$.map(J);let Z=B0(X);q={texts:X,code:Z.code,entries:Z.entries,member:$.indexOf(z),words:$};}}let Y=q.entries[q.member]??{};return{code:q.texts[q.member]??X($),module:J.shaderModule(q.code,`terrain/surface-family/${Z}`),vs:Y.vs??"vs",fs:Y.fs??"fs"}})',()=>'(function(z="vertex",J=!1){let $=w(z,1,jJ),X=J?`struct ShadowVsOut {\n  @builtin(position) position: vec4<f32>,\n  @location(0) uvMeters: vec2<f32>,\n  @location(1) @interpolate(flat) slot: u32,\n}\n\n${l}\n\n`:"",Z=J?"ShadowVsOut":"@builtin(position) vec4<f32>",Q=J?`  var out: ShadowVsOut;\n  out.position = shadowView.viewProj * vec4<f32>(worldPos, 1.0);\n  out.uvMeters = uv;\n  out.slot = slot;\n  return out;`:"  return shadowView.viewProj * vec4<f32>(worldPos, 1.0);",q=J?`\n@fragment\nfn fs(in: ShadowVsOut) {\n${c}\n}\n`:"";return`\nstruct ShadowView {\n  viewProj: mat4x4<f32>,\n  cameraPosition: vec3<f32>,\n  _pad0: f32,\n}\n@group(0) @binding(0) var<uniform> shadowView: ShadowView;\n${d}\n@group(1) @binding(0) var<uniform> pool: TerrainPool;\n@group(1) @binding(1) var<storage, read> heights: array<u32>;\n${vJ(1,2)}\n@group(1) @binding(${YJ}) var<storage, read> slotOrigins: array<vec4<f32>>;\n${$===""?"":`${$}\n`}\nfn terrain_texRes() -> i32 {\n  return i32(pool.textureResolution);\n}\n\n${bJ("terrain_heightTexel")}\n\n${U1("terrain_heightTexel",1,VJ)}\n\n${K1()}\n\n${P1}\n${mz}\n\n${X}@vertex\nfn vs(${M1(z)}) -> ${Z} {\n${k0(z)}\n${O0(J?{struct:"ShadowVsOut"}:"position")}\n${Y1}\n${V1}\n  let transform = terrain_slotTransform(slot);\n${B1}\n  let originY = slotOrigin.x;\n  let gridX = i32(round(uv.x / pool.spacing));\n  let gridZ = i32(round(uv.y / pool.spacing));\n  let renderXZ = (transform * vec4<f32>(uv.x, 0.0, uv.y, 1.0)).xz;\n  let height = terrain_casterHeight(slot, gridX, gridZ, terrain_heightTexel(terrain_heightTexel_tile(slot), gridX + 1, gridZ + 1), renderXZ, shadowView.cameraPosition.xz);\n  var groundY = height;\n  if (skirt > 0.5 && !terrain_seamFlush(tileSlot, tilePatch, gridX, gridZ, skirtOut)) { groundY = terrain_casterSkirtY(slot, gridX, gridZ, skirtAlong, height, slotOrigin, slotSides, ringStride); }\n${C1}\n  let localY = groundY - originY - TERRAIN_SURFACE_DRAW_DROP;\n  let worldPos = (transform * vec4<f32>(position.x, localY, position.z, 1.0)).xyz;\n${Q}\n}\n${q}`})',()=>'(function(z){let J=g0("pbr",z),$=J.litColor({N:"N",geometryNormal:"normalLocal",V:"V",P:"in.worldPos",albedo:"finalAlbedo",roughness:"roughness",metalness:"metalness",emissive:"finalEmissive",toonSteps:"4.0",transmission:"0.0"});return{preamble:`${z.wgslDefs}\n${J.defs}`,lit:$}})',()=>"(function(z,J,$,X,Z,Q,q=!1){let Y=Dz($,X,Z,Q),B=`${Y}${LJ(q)}`,j=function(){let U=M2($,X,Z,Q,q);return SJ(wz(z,(H,P)=>J.getBindGroupLayout(H,P),$,U,X,Z,Y,Q),B,q&&kJ(U))};if(!X&&!Z){let U=t($,!1,Q);return J.getRenderPipeline(B,j,Kz([...q?[Y]:[],...n(J,U)?[U]:[]]))}let V=K2(z,J,$,Q,q,Y);return J.getRenderPipeline(B,j,X?sz(V):Kz(V))})"]},function(){return[()=>'(function(z,J,$="vertex",X=!1,Z=!1){let Q=(`terrain/shadow/${L0(X)}${v0($)}${Z?"/holes":""}`);return J.getRenderPipeline(Q,function(){let q=z.createShaderModule({label:Q,code:Y2($,Z)});let Y=z.createPipelineLayout({label:Q,bindGroupLayouts:[J.getBindGroupLayout($1,"terrain shadow view"),J.getBindGroupLayout(j2($,Z),"terrain shadow draw")]});return{label:Q,layout:Y,vertex:{module:q,entryPoint:"vs",buffers:z1($)},...Z?{fragment:{module:q,entryPoint:"fs",targets:[]}}:{},primitive:b0,depthStencil:D0(X)}})})',()=>'(function(z,J){let $=z.pbr&&J.response!==void 0?J.response:null;return`${$===null?"":`\nvar<private> ${$}: vec2<f32> = vec2<f32>(1.0, 0.0);\n`}\nfn ${J.fn}(${J.params}, worldDdx: vec2<f32>, worldDdy: vec2<f32>) -> vec3<f32> {\n  let worldAbs = lume_worldFromRender(${J.worldPos});\n  let heightNorm = clamp((worldAbs.y - horizon.heightMin) / max(horizon.heightSpan, 1e-4), 0.0, 1.0);\n  let columns = max(horizon.thetaCount, 1u);\n  let lastRow = max(horizon.ringCount, 1u) - 1u;\n  let rowAt = clamp(${J.row}, 0.0, f32(lastRow));\n  let row = min(u32(rowAt), lastRow);\n  let fr = rowAt - f32(row);\n  let rel = ${J.worldPos}.xz - horizon.center.xz;\n  let around = fract(atan2(rel.y, rel.x) * 0.15915494) * f32(columns);\n  let column = min(u32(around), columns - 1u);\n  let fc = clamp(around - f32(column), 0.0, 1.0);\n  let cell = (row * columns + column) * ${G1}u;\n  let corner0 = horizonCells[cell];\n  let corner1 = horizonCells[cell + 1u];\n  let corner2 = horizonCells[cell + 2u];\n  let corner3 = horizonCells[cell + 3u];\n  let weights = mix(mix(unpack4x8unorm(corner0), unpack4x8unorm(corner1), fc), mix(unpack4x8unorm(corner2), unpack4x8unorm(corner3), fc), fr).xyz;\n  let shares = weights * weights;\n  let footprints = ${z.textured?"vec2<f32>(terrain_farFootprint(worldDdx, worldDdy, vec2<f32>(textureDimensions(albedoArray, 0))), terrain_farFootprint(worldDdx, worldDdy, vec2<f32>(textureDimensions(albedoFine, 0))))":"vec2<f32>(0.0)"};\n  let drift = ${z.drifts===1?"terrain_macroNoise(worldAbs.xz, horizon.driftScale)":"vec2<f32>(0.5)"};\n  var albedo = vec3<f32>(0.0);${$===null?"":`\n  var response = vec2<f32>(0.0);`}\n  for (var k = 0u; k < 3u; k++) {\n    let share = select(select(shares.z, shares.y, k == 1u), shares.x, k == 0u);\n    if (k > 0u && !(share > 0.0)) { continue; }\n    let corner = select(select(corner2, corner1, k == 1u), corner0, k == 0u);\n    albedo += ${J.layerColor}(corner >> 24u, worldAbs.xz, heightNorm, worldDdx, worldDdy, footprints, drift) * share;${$===null?"":`\n    response += lume_horizon_layer_response(corner >> 24u) * share;`}\n  }\n${$===null?"":`  let responseMixed = response / max(shares.x + shares.y + shares.z, 1e-6);\n  ${$} = vec2<f32>(clamp(responseMixed.x, ${Zz}, 1.0), clamp(responseMixed.y, 0.0, 1.0));\n`}  return albedo / max(shares.x + shares.y + shares.z, 1e-6);\n}`})',()=>"(function(z,J){return`  var lit = shade_ambientPbr(N, V, albedo, ${z}, ${J}, lighting_indirectIrradiance(N));\n  let sunRadiance = passLights.sunColor * passLights.sunIntensity;\n  if (sunRadiance.r + sunRadiance.g + sunRadiance.b > 0.0) { lit = lit + shade_cookTorranceSun(N, V, passLights.sunDirection, albedo, ${z}, ${J}, sunRadiance, passLights.iblParams.z); }`})"]},function(){return[()=>'(function(z,J,$,X,Z){let Q=`in: HorizonVertexOut, worldDdx: vec2<f32>, worldDdy: vec2<f32>${Z?", yields: bool":""}`,q=(V)=>X?`  if (horizon.ground == 0u || horizon.layerCount == 0u) { return ${V}; }\n`:"";if(J){let U=Z?`  var albedo = vec3<f32>(0.0);\n  if (!yields) { albedo = lume_horizon_albedo(in, worldDdx, worldDdy); }`:"  let albedo = lume_horizon_albedo(in, worldDdx, worldDdy);";let H=$.fogged?`  lume_surfacePoint = in.worldPos;\n  return lume_surfaceUnlitAs(lume_surfaceOut(normalize(in.normal), shade_fogColor(in.worldPos - frame.cameraPosition), 1.0, 0.0, 0.0, vec3<f32>(0.0)), true);`:"  return lume_surfaceUnlit(shade_fogColor(in.worldPos - frame.cameraPosition));";let P=$.ground?`${q("lume_surfaceUnlit(shade_fogColor(in.worldPos - frame.cameraPosition))")}${U}\n  lume_surfacePoint = in.worldPos;\n${G0($,"albedo")}  return lume_surfaceOut(N, finalAlbedo, roughness, ${zJ($,"y")}, 0.0, vec3<f32>(0.0));`:H;return`${_z(z)}\n\nfn lume_horizon_surface(${Q}) -> LumeSurfaceOut {\n${P}\n}`}let Y="shade_fogColor(in.worldPos - frame.cameraPosition)";let B=$.fogged?"  return shade_applyFog(vec3<f32>(0.0), in.viewZ, in.worldPos - frame.cameraPosition);":`  return ${Y};`;let j=$.ground?`${q(Y)}${G0($,"lume_horizon_albedo(in, worldDdx, worldDdy)")}  let albedo = finalAlbedo;\n  let V = ${Oz("frame.cameraPosition - in.worldPos")};\n${u1("roughness",zJ($,"y"))}\n  return shade_applyFog(lit, in.viewZ, in.worldPos - frame.cameraPosition);`:B;return`\nfn lume_horizon_color(${Q}) -> vec3<f32> {\n${Z?`  if (yields) { return vec3<f32>(0.0); }\n`:""}${j}\n}`})',()=>'(function(z=!1,J=!1,$=null){let X=$===null;let Z=$??uz;let Q=X||!Z.ground;let q=J?Jz:m;let Y=`@group(1) @binding(8) var<uniform> iblSh: array<vec4<f32>, 9>;\n${T0}\n${y0}\n${E0(1)}\n${w0}\n${J1}\n${CJ}`;let B=["//",g,z?q:"",zz,JJ,"@group(1) @binding(0) var<uniform> passLights: PassLights;",Q||!J?A0(1):"",J&&Q?`${N0}\n${I0}`:"",J?"":Y,...h2(Z),n0,r0,i0,Z.yields?ZJ:"",Z.holes?qJ:"",Z.ground?(`${QJ}\n\n${WJ("lume_horizon_layer_color","lume_horizon_paramsRow",Z)}\n${Z.pbr?`\n${w1}\n`:""}\n${m1(Z,g1)}`):"",Z.ground&&Z.wet?$z:"",g2(z,J,Z,X,Z.yields||Z.holes),u2(z,J,Z),""];return B.filter((j,V)=>j.length>0||V===B.length-1).join(`\n`)})',()=>"(function(z,J,$=!1,X=-1){let Z={colorFormat:Gz(),samples:i(),motion:$},Q=y1(X);return J.getRenderPipeline(iz(Z,Q),()=>s0(z,J,Z,h1($,!1,X<0?null:TJ(X)),Q),X<0?XJ:{peelCull:!0,standIn:iz(Z),samePicture:!0,standInCosts:!0})})"]}],$c0XU=[0,2,5,6,11,14];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,17,2965559317626880);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[0,2,3,6,7]]);
;const{$MH:L0,$U0:t,AIE:n0,AUv:tz,BDo:Lz,BQ7:N0,BYs:f0,Brz:CJ,DEr:l0,DIS:yz,Dq1:O0,E0V:T0,Ebw:k0,EqR:W0,FAd:MJ,FKD:u0,GBU:Rz,GNc:s,GWk:K0,GgD:X1,Ggy:g,Grh:jJ,H37:e0,HGI:I0,I1_:r0,IJq:ZJ,JQz:yJ,J_p:UJ,KOP:Z1,Khe:e,KzT:p0,L6f:D0,LGJ:Iz,LbY:kJ,LgY:qJ,N0E:gz,Nx2:zz,P2_:HJ,Pjz:_0,QKzX:XJ,Sf$:QJ,SpJ:E0,ULm:s0,W3x:Fz,X4S:m0,XGU:Pz,XJZ:VJ,Y0g:o0,YkK:d0,YmG:h0,_7c:c0,a7W:w,aj7:U0,apd:q1,apl:JJ,b18:x0,bin:m,cYp:_J,dBL:J1,dEj:t0,eYb:g0,ech:$J,fUi8:LJ,fX9:PJ,fsr:DJ,has:Dz,hxd:w0,iww:B0,jJo:_z,kQP:i,kl9:YJ,lKY:b0,lSa:Oz,mGj:S0,mR0:RJ,mwU:vz,myS:FJ,nLO:M0,nOUB:BJ,nvi:Jz,oAB:KJ,oBv:A0,pfC:a0,q43:Gz,qaQ:wz,r2n:bz,tWh:y0,txa:i0,u77:wJ,ueV:GJ,unL:R0,vOR:SJ,vbn:v0,vcF:o,wRZ:a,x2k:C0,yBW:z1,yKJ:iz,ybj:gJ}=$Lr;
;;;;;var l1=`fn terrain_fadedOctave3(p: vec2<f32>, fade: f32) -> f32 {
  if (fade <= 0.0) { return 0.5; }
  return mix(0.5, terrain_lattice3(p), fade);
}
fn terrain_fadedOctave1(p: vec2<f32>, fade: f32) -> f32 {
  if (fade <= 0.0) { return 0.5; }
  return mix(0.5, terrain_lattice1(p), fade);
}
fn terrain_fadedGrain(p: vec2<f32>, fade: f32) -> f32 {
  if (fade <= 0.0) { return 0.0; }
  return (terrain_lattice3(p) - 0.5) * fade;
}`,c1="1.5",a1="2.5";function Mz(z){let J=A(z),$=J.tier<2,X=J.hasPbrLayers&&J.textured;return qz({...J,tier:$?J.tier:2,hasPbrLayers:X,carvesSeams:J.carvesSeams&&$&&J.textured,detailNormals:J.detailNormals&&$&&J.textured&&!X,hasStochasticLayers:J.hasStochasticLayers&&$&&J.textured,hasPixelLayers:J.hasPixelLayers&&J.textured,hasFineAlbedo:J.hasFineAlbedo&&J.textured})}function az(z){return qz({...A(Mz(z)),hasFineAlbedo:!1,wet:!1})}function Q0(z){let J=A(Mz(z)),$=J.textured&&J.hasFineAlbedo,X=J.wet;if(!$&&!X)return;return{...$?{[vz]:1}:{},...X?{[Iz]:1}:{}}}var v=(...z)=>z.filter(gJ).join(`
`);function n1(z){let{count:J}=z;if(J<2)return`  let pickIndex0 = ${z.wholeTiles?"in.tileLayer & 63u":"0u"};
  let pickWeight0 = 1.0;`;let $=[];for(let q=0;q<J;q++)$.push(`  var pickIndex${q} = 0u;`,`  var pickWeight${q} = 0.0;`);$.push(`  let tileLayer = in.tileLayer;
  if (tileLayer < ${z.layers||64}u) {
  pickIndex0 = tileLayer;
  pickWeight0 = bilinear.x + bilinear.y + bilinear.z + bilinear.w;
  } else {`,sJ),$.push(`  let slots00 = terrain_wordSlots(word00);
  let slots10 = terrain_wordSlots(word10);
  let slots01 = terrain_wordSlots(word01);
  let slots11 = terrain_wordSlots(word11);`);let X=function(a,b){return (X=$c0C(0)(J,$)).call(this,a,b)};$.push("  if (word00 == word10 && word00 == word01 && word00 == word11) {",...[0,1,2].map((q)=>`    let oneShare${q} = terrain_oneShare(slots00.l${q}, slots00, bilinear, ${z.layers||64}u);`)),X([0,1,2].map((q)=>({index:`slots00.l${q}`,share:`oneShare${q}`})),z.layers>0),$.push("  } else {");let Z=(q)=>`terrain_layerShare(${q}, slots00, slots10, slots01, slots11, bilinear)`,Q=[];if(z.layers>0){for(let q=0;q<z.layers;q++){$.push(`    let share${q} = ${Z(`${q}u`)};`);Q.push({index:`${q}u`,share:`share${q}`});}}else{let q=["00","10","01","11"];for(let Y=0;Y<12;Y++){let B=q[Math.floor(Y/3)];$.push(`    let entry${Y} = (word${B} >> ${26-6*(Y%3)}u) & 0x3fu;`,`    let share${Y} = ${Z(`entry${Y}`)};`);Q.push({index:`entry${Y}`,share:`share${Y}`})}}if(X(Q,!1),$.push(`  }
  }`),z.layers===0)for(let q=0;q<J;q++)$.push(`  pickIndex${q} = terrain_layerOf(in.slot, pickIndex${q});`);return $.join(`
`)}var r1=`
struct TerrainWordSlots { l0: u32, l1: u32, l2: u32, q0: u32, q1: u32, q2: u32 }
fn terrain_wordSlots(word: u32) -> TerrainWordSlots {
  let l = terrain_wordLayers(word);
  let q = terrain_wordQuanta(word);
  return TerrainWordSlots(l.x, l.y, l.z, q.x, q.y, q.z);
}
fn terrain_layerWeight(layer: u32, slots: TerrainWordSlots) -> f32 {
  return f32(select(0u, slots.q0, slots.l0 == layer) + select(0u, slots.q1, slots.l1 == layer) + select(0u, slots.q2, slots.l2 == layer)) / 127.0;
}
fn terrain_layerShare(layer: u32, slots00: TerrainWordSlots, slots10: TerrainWordSlots, slots01: TerrainWordSlots, slots11: TerrainWordSlots, bilinear: vec4<f32>) -> f32 {
  return terrain_layerWeight(layer, slots00) * bilinear.x + terrain_layerWeight(layer, slots10) * bilinear.y + terrain_layerWeight(layer, slots01) * bilinear.z + terrain_layerWeight(layer, slots11) * bilinear.w;
}
fn terrain_oneShare(layer: u32, slots: TerrainWordSlots, bilinear: vec4<f32>, bound: u32) -> f32 {
  let weight = terrain_layerWeight(layer, slots);
  return select(0.0, weight * bilinear.x + weight * bilinear.y + weight * bilinear.z + weight * bilinear.w, layer < bound);
}`,i1=`
fn terrain_tileLayer(slot: u32) -> u32 {
  let entry = terrain_blendEntry(slot);
  let word = blendWords[entry & 0xffffffe0u];
  return select(64u, word >> 26u, (entry & 31u) == 0u && (word & 0x3fffu) == 0x3f80u);
}`;function Cz(a,b){return (Cz=$c0C(1)).call(this,a,b)}function j0(z,J,$){let X=Cz(z,J),{nro:Z,derive:Q,stochastic:q,pixel:Y,tap:B,jittered:j}=X,V=z.textured?"terrain_albedoLevel(layerUv, albedoLayer, fineRow.xy, 32.0)":"textureSampleLevel(albedoArray, atlasSampler, layerUv, albedoLayer, 32.0)",U=(M)=>`select(clamp(0.5 + (terrain_luma(${M}.rgb) - meanLuma) * ${tJ.toFixed(2)}, 0.0, 1.0), patina_packedHeight(${M}), pbrRow.w > 0.5)`,H=Q&&`      if (${Z?"!nroOn && joined":"joined"}) {
        ${q?`var centre = top;
        if (antiTiling) { centre = ${B("albedo","layerUv","albedoDdx","albedoDdy")}; }`:"let centre = top;"}
        lumaCentre${J} = terrain_luma(centre.rgb);
      }`,P=v(q?`      ${X.jitterTop}
      var top = vec4<f32>(0.0);
      if (antiTiling) {
        top = stochastic_keepContrast(${j("albedo","layerUv","jitter","albedoDdx","albedoDdy")}, ${V}, jitter.weights);
      } else {
        top = ${B("albedo","layerUv","albedoDdx","albedoDdy")};
      }`:`      let top = ${B("albedo","layerUv","albedoDdx","albedoDdy")};`,`      albedo${J} = top.rgb;`,z.carvesSeams&&`      height${J} = ${U("top")};`,H),G=(M,k,K)=>`        if (${M} > 0.0) {
          ${X.planeFrame(k,K,"foldRow","plane")}
${q?`          if (antiTiling) {
            let planeJitter = stochastic_tileSample(planeUv, f32(layer) * 13.0);
            sideAlbedo += stochastic_keepContrast(${j("albedo","planeUv","planeJitter","planeDdx","planeDdy")}, ${V}, planeJitter.weights) * ${M};
          } else {
            sideAlbedo += ${B("albedo","planeUv","planeDdx","planeDdy")} * ${M};
          }`:`          sideAlbedo += ${B("albedo","planeUv","planeDdx","planeDdy")} * ${M};`}
        }`,F=z.biplanar&&v(`      if (sideWeight > 1e-3) {
        var sideAlbedo = vec4<f32>(0.0);`,G("sideShare.x","z","spanSide.x"),G("sideShare.y","x","spanSide.y"),`        albedo${J} = mix(albedo${J}, sideAlbedo.rgb, sideWeight);`,z.carvesSeams&&`        height${J} = mix(height${J}, ${U("sideAlbedo")}, sideWeight);`,"      }");return v((z.carvesSeams||Z&&Q)&&`      let pbrRow = terrain_paramsRow(layer, ${u}u);`,z.textured&&`      var fineRow = vec4<f32>(0.0);
      if (${$}) { fineRow = terrain_paramsRow(layer, ${W}u); }`,X.uvLines,X.albedoLines,Y&&`      let pixelEdge = terrain_paramsRow(layer, ${R}u).z;`,(z.carvesSeams||Q)&&"      let joined = joinRow.a < 1.0;",z.carvesSeams&&`      heightPacked${J} = pbrRow.w > 0.5;
      var meanLuma = 0.5;
      if (heightInfluence > 0.0 && !heightPacked${J}) { meanLuma = terrain_luma(${V}.rgb); }`,q&&`      let antiTiling = u32(terrain_paramsRow(layer, ${I}u).y) == ${lz.stochastic}u;`,Z&&Q&&"      let nroOn = joined && pbrRow.x >= 0.0;",z.biplanar?`      if (sideWeight < 1.0) {
${P}
      }`:P,F,z.carvesSeams&&`      height${J} = select(0.5, height${J}, joined);`)}var xJ=(z)=>[0,1,2,3].map((J)=>`terrain_paramsRow(layer, ${z+J}u)`).join(", "),Y0=`      let mainRow = terrain_paramsRow(layer, ${T}u);
      let foldRow = terrain_paramsRow(layer, ${h}u);
      let joinRow = terrain_paramsRow(layer, ${x}u);`,V0=(z)=>`terrain_fadedGrain(worldPos.xz * ${cz}.0 + vec2<f32>(f32(pickIndex${z}) * 37.0, f32(pickIndex${z}) * 59.0), ditherFade)`;function t1(a,b,c){return (t1=$c0C(2)).call(this,a,b,c)}function o1(a,b,c){return (o1=$c0C(3)).call(this,a,b,c)}function s1(a,b,c){return (s1=$c0C(4)).call(this,a,b,c)}function e1(a,b){return (e1=$c0C(5)).call(this,a,b)}var J2={fine:vz,wet:Iz,overrides:!0};function $2(z,J=J2){let $=az(z),X=A($),Z=X.tier<2,Q=X.wholeTiles?1:Math.min(fz,X.layers||fz),q=Q>1,Y=Z&&(X.carvesSeams||X.tier===0),B=Z&&(X.hasPbrLayers||X.detailNormals),j={...X,carvesSeams:X.carvesSeams&&q,count:Q,near:Z,shadesNormals:B,sharpen:Y},V=j.drifts!==0,U=j.textured,H=V||Y,P=j.layers>0,G=P?`@group(2) @binding(${wJ}) var<uniform> layerRows: array<vec4<f32>, ${hJ*j.layers}>;
fn terrain_layerRow(layer: u32, row: u32) -> vec4<f32> {
  return layerRows[row * ${j.layers}u + min(layer, ${j.layers-1}u)];
}`:null,F=(S)=>P?S.replaceAll("terrain_paramsRow(","terrain_layerRow("):S,M=[];if(j.textured&&J.overrides)M.push(`override ${vz}: bool = false;`);if(M.push(...J.overrides?[`override ${Iz}: bool = false;`]:[],Nz,$z),q)M.push(r1);if(q||j.wholeTiles)M.push(i1);if(M.push(Yz),j.hasHeightTint)M.push(jz);if(j.hasNoiseLayers||j.hasGradientLayers||j.hasHeightTint)M.push(Uz);if(j.hasNoiseLayers)M.push(p);if(M.push(H?RJ:yJ),Y)M.push(l1);if(V)M.push(`${Bz}
${_J}`);if(j.biplanar)M.push(z0);if(U)M.push(mJ,J0,Wz(`${J.fine} && fine.x >= 1.0`),j.hasPbrLayers&&Z?$0(`${J.fine} && nfine.x >= 1.0`):"",f);if(j.hasStochasticLayers&&Z)M.push(uJ);if(U&&j.hasPixelLayers)M.push(xz);let k=[`  let texelF = in.uvMeters / pool.chunkWorldSize * (pool.resolution - 1.0) + vec2<f32>(1.5);
  let worldPos = lume_worldFromRender(in.worldPos);
  let worldDdx = dpdx(in.worldPos);
  let worldDdy = dpdy(in.worldPos);
  let tile = terrain_heightTexel_tile(in.slot);`];if(U)k.push("  let uvDdx = dpdx(in.uvMeters);","  let uvDdy = dpdy(in.uvMeters);");if(Y)k.push("  let noiseFootprint = max(length(worldDdx.xz), length(worldDdy.xz));");let K=[];if(K.push("  let normalLocal = normalize(in.normalLocal);","  let heightNorm = in.heightNorm;"),q)K.push(`  let texelB = in.uvMeters / pool.chunkWorldSize * (pool.blendResolution - 1.0) + vec2<f32>(1.5);
  let gatherOrigin = floor(texelB - vec2<f32>(0.5));
  let gatherFrac = texelB - vec2<f32>(0.5) - gatherOrigin;
  var bilinear = vec4<f32>((1.0 - gatherFrac.x) * (1.0 - gatherFrac.y), gatherFrac.x * (1.0 - gatherFrac.y), (1.0 - gatherFrac.x) * gatherFrac.y, gatherFrac.x * gatherFrac.y);
  var gx = i32(gatherOrigin.x);
  var gz = i32(gatherOrigin.y);`);if(j.biplanar)K.push("  let drawnCross = cross(worldDdx, worldDdy);");if(j.biplanar)K.push(`  var sideWeight = 0.0;
  var sideShare = vec2<f32>(0.0);
${X0(q)}
  let noisePlanes = terrain_noiseShares(sideWeight, sideShare);`);if(U)K.push(`  let topSpread = dot(uvDdx, uvDdx) + dot(uvDdy, uvDdy);
  let topArea = abs(uvDdx.x * uvDdy.y - uvDdx.y * uvDdy.x);
  let spanTop = sqrt(0.5 * (topSpread + sqrt(max(topSpread * topSpread - 4.0 * topArea * topArea, 0.0)))) / max(topArea, 1e-12);${j.biplanar?`
  var spanSide = vec2<f32>(0.0);
  if (sideWeight > 1e-3) {
    let faceSpread = dot(worldDdx, worldDdx) + dot(worldDdy, worldDdy);
    spanSide = vec2<f32>(sqrt(0.5 * (faceSpread + sqrt(max(faceSpread * faceSpread - 4.0 * dot(drawnCross, drawnCross), 0.0))))) / max(abs(drawnCross.xz), vec2<f32>(1e-12));
  }`:""}`);if(Y){let S=(L,C,b,O)=>`${L}(${C} * ${Sz*b}.0, 1.0 - smoothstep(0.25, 0.75, ${O}))`,D=(L)=>(D=$c0C(6)(j,S))(L);K.push(j.biplanar?`  var macroSpan = noiseFootprint;
  if (noisePlanes.x < 1.0) { macroSpan = max(length(worldDdx), length(worldDdy)); }
  let macroFootprint = macroSpan * ${Sz}.0;
  let macroTop = ${D("worldPos.xz")};
  var macroVariation = macroTop;
  if (noisePlanes.x < 1.0) { macroVariation = noisePlanes.x * macroTop + noisePlanes.y * ${D("worldPos.zy")} + noisePlanes.z * ${D("worldPos.xy")}; }`:`  let macroFootprint = noiseFootprint * ${Sz}.0;
  let macroVariation = ${D("worldPos.xz")};`)}if(Y&&q)K.push(`  let ditherFade = 1.0 - smoothstep(0.25, 0.75, noiseFootprint * ${cz}.0);`);K.push(n1(j));if(j.drifts>0&&j.drifts<3){let S=(C)=>`terrain_paramsRow(pickIndex${C}, ${Az}u).w`;let D=(C)=>`(terrain_paramsRow(pickIndex${C}, ${I}u).z != 0.0 || terrain_paramsRow(pickIndex${C}, ${I}u).w != 0.0)`;let L=S(j.drifts===1?0:Q-1);if(j.drifts===2){for(let C=Q-2;C>=0;C--){L=`select(${L}, ${S(C)}, ${D(C)})`;}}K.push(F(`  let driftNoise = terrain_drift(worldPos.xz, ${L});`))}if(j.carvesSeams)K.push(`  ${aJ}`);if(j.textured){for(let S=0;S<Q;S++){K.push(F(t1(j,S,J.fine)));}}K.push(F(e1(j,J.fine)));K.push("  var N = normalLocal;","  var roughness = 1.0;",`  ${j.hasPbrLayers?"var":"let"} metalness = 0.0;`);if(j.hasPbrLayers)K.push(`  roughness = clamp(finalRoughness, ${Zz}, 1.0);`,"  metalness = finalMetalness;");if(B)K.push(`  {
${eJ}
  }`);return K.push(`  if (${J.wet}) {
${Vz("terrain_lowBilinear(tile, texelF)")}
  }`),{textWord:$,facts:j,uniformRows:P,rowsDecl:G,noise:j.hasNoiseLayers?Ez:null,helpers:M,head:k,body:K}}function nz(z,J,$,X,Z){let Q=$2(Z),{textWord:q,uniformRows:Y}=Q,B=Z0(J,X),j=[];if(j.push(`//${q}`),j.push(g),X)j.push("surface"in J?Jz:m);if(j.push(zz),j.push(J.preamble),j.push(B.decl),j.push(d),j.push(oJ),Q.rowsDecl!==null)j.push(Q.rowsDecl);if(j.push(w(z,3,e)),Q.noise!==null)j.push(Q.noise);if(j.push(Tz("3u")),j.push(Qz("terrain_heightTexel")),$)j.push(l);j.push(...Q.helpers);j.push(q0(z,Q.facts.tier===0&&Q.facts.count>1&&!Q.facts.carvesSeams,(Y?"":`
  out.viewZ = out.viewZ + terrain_paramsRow(0u, 0u).x * 1e-30;`),Q.facts.count>1||Q.facts.wholeTiles));j.push(`${B.entry}@fragment
fn fs(in: VsOut) -> ${"surface"in J?o(X):s(X)} {`);if($)j.push(c);if(j.push(...Q.head),j.push(B.skip.trimEnd()),j.push(...Q.body),"surface"in J)j.push("  lume_surfacePoint = in.worldPos;"),j.push(X?`  return lume_surfaceStillMotion(lume_surfaceOut(N, finalAlbedo, roughness, metalness, 1.0, finalEmissive), in.worldPos);
}`:`  return lume_surfaceOut(N, finalAlbedo, roughness, metalness, 1.0, finalEmissive);
}`);else j.push(`  let V = ${Oz("frame.cameraPosition - in.worldPos")};`,`  var lit = ${J.lit};`,"  lit += finalEmissive;","  lit = shade_applyFog(lit, in.viewZ, in.worldPos - frame.cameraPosition);"),j.push(X?`  return lume_staticMotionFragment(vec4f(lit, 1.0), in.worldPos);
}`:`  return vec4<f32>(lit, 1.0);
}`);return j.filter((V)=>V.length>0).join(`
`)}var X2={joinedSlots:new Map};function q2(z){let J=A(z);let $=({hasPbrLayers:J.hasPbrLayers,hasTexturedLayers:J.textured,hasEmissiveLayers:J.hasEmissiveLayers,hasNoiseLayers:J.hasNoiseLayers,hasGradientLayers:J.hasGradientLayers,hasHeightTint:J.hasHeightTint,hasStochasticLayers:J.hasStochasticLayers,hasPixelLayers:J.hasPixelLayers,drifts:J.drifts,layerCount:J.layers===0?M0+1:J.layers,albedoFine:X2});let X=[];for(let Z of C0){let Q=az(qz(K0($,Z))|z&E.wholeTiles);if(!X.includes(Q))X.push(Q)}if(!X.includes(z))X.push(z);return X}function rz(a,b,c,d,e,f){return (rz=$c0C(7)).call(this,a,b,c,d,e,f)}var n3=80,r3={viewProj:0,cameraPosition:64,fadeTime:76};function j2(z,J=!1){let $=J?1|2:1,X=[a(0,$,"uniform"),a(1,$,"read-only-storage"),a(2,1,"read-only-storage"),a(YJ,1,"read-only-storage"),a(VJ,1,"read-only-storage")];if(z==="storage")X.push(S0(jJ));return X}function Y2(){return (Y2=$c0C(8)).apply(this,arguments)}function b1(a){return (b1=$c0C(9)).call(this,a)}function V2(z="vertex",J=gz(),$=!1,X=!1,Z=!1){return EJ(z,b1(J),$,X,Z)}function P0(z="vertex",J=!1,$=!1,X=!1,Z=!1){return EJ(z,({preamble:`${GJ().wgslDefs}
${_z(X)}`,surface:!0}),J,X,$,Z)}function M2(z,J=!1,$=!1,X=!1,Z=!1){if(!J&&!$&&!X&&!Z){return R0()?P0(z):t0[z];}return P0(z,J,$,X,!0)}function i3(z,J,$="vertex",X=!1,Z=!1,Q=!1,q=null,Y=!1){if(q!==null&&!Z&&A(q).tier>2){let v$1;{let z=q;let J=A(z);v$1=(J.textured?1:0)|(J.hasNoiseLayers?2:0)|(J.hasNoiseLayers||J.hasGradientLayers?4:0)|(J.hasHeightTint?8:0)|(J.drifts!==0?32:0)|(J.hasPbrLayers?x1:0);}return Hz(z,J,$,X,Q,v$1);}if(q!==null&&Lz()&&!Z){return G2(z,J,$,X,Q,q,Y);}if(!Z&&Z1()==="unrolled")return Hz(z,J,$,X,Q);return NJ(z,J,$,X,Z,Q,Y)}function r(z,J,$,X,Z=!1){let Q=Dz(z,J,!1,$,!0);return`${X===null?Q:`${Q}${DJ(Mz(X))}`}${LJ(Z)}`}function C2(z,J,$,X,Z){let Q=[];for(let q of X===null||(X&E.fineAlbedo)!==0?[X]:[X,X|E.fineAlbedo]){if(Z)Q.push(r(z,J,$,q,!0));Q.push(r(z,J,$,q))}return Q}function L1(z,J,$){let X=J|E.fineAlbedo;return X!==J&&$(X).some((Z)=>z.peekRenderHandle(Z)?.failed===!1)?X:J}function t3(z,J){let $=z.peekRenderHandle(J);return $===void 0||u0($)===null||$.failed?null:$}function o3(z,J,$="vertex",X=!1){return Lz()?Hz(z,J,$,!1,X):NJ(z,J,$,!1,!1,X)}function NJ(a,b,c,d,e,f){return (NJ=$c0C(10)).apply(this,arguments)}function K2(z,J,$,X,Z,Q){let q=Lz();if(q)Hz(z,J,$,!1,X);else J.preparePictureScope(()=>NJ(z,J,$,!1,!1,X),!1);return[...Z?[Q]:[],q?t($,!1,X):Dz($,!1,!1,X)]}function Hz(z,J,$,X,Z,Q=-1){let q=(V)=>t($,V,Z,Q);let Y=q(X);let B=X?[q(!1)].filter((V)=>n(J,V)):[];let j={...!X&&H2,...B.length>0&&{standIn:B,standInCosts:!0}};return J.getRenderPipeline(Y,()=>wz(z,(V,U)=>J.getBindGroupLayout(V,U),$,_1($,X,Z,!1,Q),X,!1,Y,Z),j)}var s3=(z)=>/^terrain\/surface\/.*\/coarse(\/f\d+)?$/.test(z.label);function F2(z,J,$,X,Z){let Q=X.flatMap((q)=>[...Z?[r(J,!1,$,q,!0)]:[],r(J,!1,$,q)]);return[...new Set([...Q,t(J,!1,$)])].filter((q)=>n(z,q))}var oz={peelCull:!0,depthArm:!0},H2={depthArm:!0};function Kz(z){return z.length===0?oz:{...oz,standIn:z}}function sz(z){return{peelCull:!0,standIn:z,standInCosts:!0}}function n(z,J){return z.peekRenderPipeline(J)!==null}function G2(z,J,$,X,Z,Q,q=!1){let Y=L1(J,Q,(G)=>C2($,X,Z,G,q));let B=r($,X,Z,Y);let j=r($,X,Z,Y,q);let V=function(){let G=i();let F=rz(z,J,Y,(M)=>m0((nz($,({preamble:`${GJ().wgslDefs}
${_z(Z)}`,surface:!0}),X,Z,M)),"fs",G),Dz($,X,!1,Z,!0),j);return SJ((k1((wz(z,(M,k)=>J.getBindGroupLayout(M,k),$,F,X,!1,j,Z)),Q0(Y))),j,q&&kJ(F.code))};let U=q?[B]:[];let H=X?F2(J,$,Z,[Y],q):[];let P=t($,X,Z);if(X&&n(J,P))U.push(P);else if(!n(J,j)&&H.length===0&&!U.some((G)=>n(J,G)))Hz(z,J,$,X,Z),U.push(P);return U.push(...H),J.getRenderPipeline(j,V,{...X?{peelCull:!0}:oz,standIn:U,standInCosts:!0})}function b2(z,J=gz(),$=!1,X=!1,Z=!1,Q=bz()){if(!J.programKey)BJ(null);return UJ(V2(z,J,$,X,Z),Q)}function F0(z,J,$="vertex",X=gz(),Z,Q=!1,q=!1,Y=!1,B=null,j=l0()){let V={colorFormat:Gz(),samples:i(),motion:q},U=MJ();if(B!==null&&Lz()&&!Y){return D2(z,J,$,X,Z,Q,q,B,j);}let H=bz(),P=`${Rz(V,$,!1,U)}${yz(j)}`,G=(D)=>`${Rz(V,$,Q,U,Y)}${yz(D)}`,F=G(j);X=HJ(X,F);let M=(D)=>function(){let L=b2($,X,Q,q,Y,H);return O1({...Fz(z,(C,b)=>J.getBindGroupLayout(C,b),V,$,L,Q,Y),label:D},j,L)};if(!X.programKey){let D=ez(G,j);if(!Q&&!Y)return J.getRenderPipeline(F,M(F),Kz(D));J.preparePictureScope(()=>F0(z,J,$,X,void 0,!1,q,!1,null,j),!1);D.push(P);return J.getRenderPipeline(F,M(F),Q?sz(D):Kz(D))}J.preparePictureScope(()=>F0(z,J,$,GJ(),void 0,Q,q,Y,null,j),!1);let k=`/light/${KJ(X)}`,K=`${F}${k}`,S=[...ez((D)=>`${G(D)}${k}`,j),...FJ(F,X,Z)];if(Q||Y)S.push(`${P}${k}`,P);PJ(X,K);return J.getRenderPipeline(K,M(K),Q?sz(S):Kz(S))}function D2(z,J,$,X,Z,Q,q,Y,B){let j={colorFormat:Gz(),samples:i(),motion:q};let V=MJ();let U=(C,b=Q)=>`${Rz(j,$,b,V,!1,!0)}${yz(C)}`;let H=U(B);let P=HJ(X,H);let G=bz();let F=P.programKey?`/light/${KJ(P)}`:"";let M=(C)=>DJ(Mz(C));let k=L1(J,Y,(C)=>[`${H}${F}${M(C)}`]);let K=`${H}${F}${M(k)}`;let D=[...new Set([...((C)=>[`${U(B,C)}${F}`,...ez((b)=>`${U(b,C)}${F}`,B),...FJ(U(B,C),P,Z)].map((b)=>`${b}${M(k)}`))(Q),Pz(j,$,Q),Pz(j,$,Q,!0)])].filter((C)=>C!==K);let L=function(){if(!P.programKey)BJ(null);let C=rz(z,J,k,(b)=>UJ((nz($,b1(P),Q,q,b)),G),`${H}${F}`,K);return O1((k1((Fz(z,(b,O)=>J.getBindGroupLayout(b,O),j,$,C,Q,!1,K)),Q0(k))),B,C.code)};return PJ(P,K),J.getRenderPipeline(K,L,{peelCull:!0,standIn:D,floor:()=>L2(z,J,$,q,Q)})}function k1(z,J){if(J===void 0||z.fragment===void 0)return z;return{...z,fragment:{...z.fragment,constants:{...z.fragment.constants,...J}}}}function O1(z,J,$){let X=c0($)&(h0|f0);return k1(z,a0(J&X))}function ez(z,J){let $=bz()?d0().map(z):[];for(let X of p0){let Z=J|X;if(Z===J)continue;let Q=z(Z);if(!$.includes(Q))$.push(Q)}return $}function L2(z,J,$="vertex",X=!1,Z=!1){let Q=(V,U)=>J.getBindGroupLayout(V,U),q={colorFormat:Gz(),samples:i(),motion:X},Y=Pz(q,$,Z),B=J.getRenderPipeline(Y,()=>Fz(z,Q,q,$,_1($,Z,X,!0),Z,!1,Y),S2);if(!B.failed||!X1(J.parkWord(B)))return B;let j=Pz(q,$,Z,!0);return J.getRenderPipeline(j,()=>Fz(z,Q,q,$,v2($,X,Z),Z,!1,j),{floor:!0})}var S2={floor:!0,watchdogSmaller:"the smallest plain ground",watchdogFloor:!0},v1=`@group(2) @binding(0) var<uniform> pool: TerrainPool;
@group(2) @binding(1) var<storage, read> heights: array<u32>;`,I1=`
  @location(4) uvMeters: vec2<f32>,
  @location(5) @interpolate(flat) slot: u32,`,A1=`
  out.uvMeters = uv;
  out.slot = slot;`,k2=`
  @location(6) paintUv: vec2<f32>,
  @location(7) paintShare: f32,
  @location(8) @interpolate(flat) paintLayer: u32,
  @location(9) paintPick: f32,`,O2=`
  let pq = vec3<f32>(terrain_wordQuanta(word));
  let pt = max(pq.x, max(pq.y, pq.z));
  let pl = terrain_layerOf(slot, terrain_wordLayers(word)[select(select(0u, 1u, pq.y > pq.x), 2u, pq.z > max(pq.x, pq.y))]);
  let pm = terrain_paramsRow(pl, ${T}u);
  let pj = terrain_paramsRow(pl, ${x}u).a;
  out.paintLayer = pl;
  out.paintPick = f32(pl);
  out.paintUv = terrain_tilePhase(lume_worldFromRender(transform[3].xyz).xz, pm.z) + uv * pm.z;
  out.paintShare = select(0.0, pt * pt / max(dot(pq, pq), 1.0) * (1.0 - pj) * mix(${N[0]}, ${N[1]}, heightNorm) * smoothstep(0.5, 0.8, normal.y), pool.layerCount >= 0.5 && pm.x < 0.5 && pj < 1.0);`,E1=`struct VsOut {
  @builtin(position) @invariant position: vec4<f32>,
  @location(0) worldPos: vec3<f32>,
  @location(1) normal: vec3<f32>,`;function N1(){return`${vJ(3,0)}
@group(3) @binding(1) var<storage, read> slotOrigins: array<vec4<f32>>;`}function T1(z,J){return`${H1(z,J)}
  let localY = groundY - slotOrigin.x - TERRAIN_SURFACE_DRAW_DROP;
  let worldPos = (transform * vec4<f32>(position.x, localY, position.z, 1.0)).xyz;
  out.worldPos = worldPos;
  out.position = frame.viewProj * vec4<f32>(worldPos, 1.0);
${Q1}
  let dx = (terrain_heightTexel(heightTile, gridX + 2, gridZ + 1) - terrain_heightTexel(heightTile, gridX, gridZ + 1)) / (pool.spacing * 2.0);
  let dz = (terrain_heightTexel(heightTile, gridX + 1, gridZ + 2) - terrain_heightTexel(heightTile, gridX + 1, gridZ)) / (pool.spacing * 2.0);
  var normal = normalize(vec3<f32>(-dx, 1.0, -dz));`}function v2(z,J=!1,$=!1){return`// lume terrain plain ground (terrainSurfacePlainWgsl)
${g}
${$J.replace(W0,x0.replace(/shade_air\((.+), toward\)/g,"$1").replace("shade_fogColor(toward)","shade_fogLean(normalize(toward), shade_fogTurn(normalize(toward)))"))}
${J?m:""}
${d}
${v1}
${N1()}
${w(z,3,e)}
${bJ("terrain_heightTexel")}
${Qz("terrain_heightTexel",void 0,!1)}
${$?l:""}
${mz}

${E1}${$?I1:""}
}

${T1(z,!0)}
  out.normal = normal;${$?A1:""}
  return out;
}

${W1($,J,"pool.fallbackColor")}`}function W1(z,J,$){return`@fragment
fn fs(in: VsOut) -> ${s(J)} {
${z?`${c}
`:""}  let sun = passLights.sunColor * passLights.sunIntensity * max(dot(normalize(in.normal), passLights.sunDirection), 0.0);
  let viewZ = -(frame.view * vec4<f32>(in.worldPos, 1.0)).z;
  let color = vec4<f32>(shade_applyFog(${$} * (sun + passLights.ambientMean) * ${_0}, viewZ, in.worldPos - frame.cameraPosition), 1.0);
  return ${J?"lume_staticMotionFragment(color, in.worldPos)":"color"};
}`}function e3(a,b){return (e3=$c0C(11)).apply(this,arguments)}var z4=`${ZJ}
${qJ}
${QJ}`,J4=63,A2=64,E2=128,N2=256,x1=512,T2=1024,W2=2048,x2=[0,1,2,2],TJ=(z)=>({ground:(z&A2)!==0,textured:(z&1)!==0,noise:(z&2)!==0,stops:(z&4)!==0,heightTint:(z&8)!==0,drifts:x2[z>>4&3],holes:(z&E2)!==0,yields:(z&N2)!==0,fogged:(z&T2)!==0,pbr:(z&x1)!==0,wet:(z&W2)!==0}),y1=(z)=>z<0?"":`/f${z}`,uz={ground:!0,textured:!0,noise:!0,stops:!0,heightTint:!0,drifts:2,holes:!0,yields:!0,fogged:!1,pbr:!0,wet:!0},y2=(z,J,$=uz)=>`${$.noise?p:""}
${WJ(z,J,{...$,drifts:$.drifts&&2},!0)}`,R1=`fn terrain_farFootprint(ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>) -> f32 {
  let a = ddx * texels;
  let b = ddy * texels;
  let spread = dot(a, a) + dot(b, b);
  let area = abs(a.x * b.y - a.y * b.x);
  let major = sqrt(0.5 * (spread + sqrt(max(spread * spread - 4.0 * area * area, 0.0))));
  return area / max(major, 1e-12);
}
fn terrain_farFloorScale(lodFloor: f32, footprint: f32) -> f32 {
  return select(1.0, max(exp2(lodFloor) / max(footprint, 1e-8), 1.0), lodFloor > 0.0);
}`;function WJ(z,J,$,X=!1){let Z=(q)=>`${J}(layer, ${q}u)`,Q=[];if(Q.push(`fn ${z}(layer: u32, worldXZ: vec2<f32>, heightNorm: f32${X?"":", worldDdx: vec2<f32>, worldDdy: vec2<f32>, footprints: vec2<f32>, drift: vec2<f32>"}) -> vec3<f32> {`),Q.push(`  let mainRow = ${Z(T)};`,`  let tintRow = ${Z(Xz)};`,`  var color = ${$.textured?`${Z(x)}.rgb`:"tintRow.rgb"};`),$.textured)Q.push(`  if (mainRow.x < 0.5) {
${X?"    let mean = textureSampleLevel(albedoArray, atlasSampler, vec2<f32>(0.5, 0.5), i32(max(mainRow.y, 0.0)), 32.0);":`    let uvScale = mainRow.z;
    let gx = worldDdx * uvScale;
    let gy = worldDdy * uvScale;
    let fineRow = ${Z(W)}.xy;
    let tileUv = terrain_tilePhase(worldXZ, uvScale);
    let spans = footprints * abs(uvScale);
    var mean: vec4<f32>;
    if (fineRow.x >= 1.0) {
      let fineScale = terrain_farFloorScale(fineRow.y, spans.y);
      mean = textureSampleGrad(albedoFine, atlasSampler, tileUv, i32(fineRow.x - 1.0), gx * fineScale, gy * fineScale);
    } else {
      let floorScale = terrain_farFloorScale(${Z(OJ)}.x, spans.x);
      mean = textureSampleGrad(albedoArray, atlasSampler, tileUv, i32(max(mainRow.y, 0.0)), gx * floorScale, gy * floorScale);
    }`}
    color = terrain_applyTintFold(mean.rgb, tintRow.rgb, ${Z(h)}.xyz);
  }`);if($.stops)Q.push(`  if (mainRow.x >= 1.5) {
    let aux = ${Z(2)};
    var t = heightNorm;${$.noise?`
    if (mainRow.x < 2.5) { t = terrain_paintNoise(worldXZ / max(aux.x, 1e-4), aux.y); }`:""}
    color = terrain_colorFromStops(${Z(3)}, ${Z(4)}, ${Z(5)}, ${Z(6)}, t, aux.z);
  }`);if($.heightTint)Q.push(`  if (tintRow.a > 0.0) { color = terrain_applyTint(color, terrain_colorFromStops(${Z(7)}, ${Z(8)}, ${Z(9)}, ${Z(10)}, heightNorm, ${Z(2)}.w), tintRow.a); }`);if($.drifts!==0)Q.push(`  let macroRow = ${Z(13)};`,`  if (macroRow.w != 0.0 || macroRow.z != 0.0) { color = terrain_applyMacroNoise(color, ${$.drifts===1?"drift":`terrain_macroNoise(worldXZ, ${Z(12)}.w)`}, macroRow.w, macroRow.z); }`);return Q.push("  return color;","}"),Q.join(`
`)}function H0(z,J,$){return`  var ${z}: ${J};
  var sum = 0.0;
  let quanta = terrain_wordQuanta(word);
  for (var k = 0u; k < 3u; k++) {
    let weight = f32(quanta[k]) / ${q1}.0;
    let w = weight * weight;
    sum += w;
    if (k > 0u && w <= 0.0) { continue; }
    let c = ${$("terrain_wordLayers(word)[k]")} * w;
    ${z} = select(${z} + c, c, k == 0u);
  }
  ${z} = ${z} / max(sum, 1e-4);`}var R2=`fn terrain_coarsePaint(layer: u32, share: f32, uv: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>) -> vec3<f32> {
if (share <= 0.0) { return vec3<f32>(0.0); }
let m = i32(max(terrain_paramsRow(layer, ${T}u).y, 0.0));
let f = terrain_paramsRow(layer, ${W}u).xy;
let t = terrain_albedoTexels(f);
let lod = max(round(log2(max(max(length(ddx * t), length(ddy * t)), 1.0))), select(terrain_paramsRow(layer, ${OJ}u).x, f.y, f.x >= 1.0));
let picture = terrain_albedoLevel(terrain_pixelEdgeUv(uv, ddx, ddy, t, terrain_paramsRow(layer, ${R}u).z), m, f, lod).rgb;
return terrain_applyTintFold(picture - textureSampleLevel(albedoArray, atlasSampler, vec2<f32>(0.5), m, 32.0).rgb, terrain_paramsRow(layer, ${Xz}u).rgb, terrain_paramsRow(layer, ${h}u).xyz) * share;
}`;function _1(z,J=!1,$=!1,X=!1,Z=-1){let Q=Z<0?uz:TJ(Z),q=Z>=0&&Q.textured,Y=[`//${X?", lit":""}`,g,zz];if(X)Y.push($J,$?m:"");else Y.push($?Jz:"",_z($),JJ,"@group(1) @binding(0) var<uniform> passLights: PassLights;");Y.push(d,`${v1}
@group(2) @binding(2) var<storage, read> blendWords: array<u32>;
@group(2) @binding(3) var<storage, read> layerParams: array<vec4<f32>>;
@group(2) @binding(4) var albedoArray: texture_2d_array<f32>;
@group(2) @binding(5) var atlasSampler: sampler;${q?`
@group(2) @binding(7) var albedoFine: texture_2d_array<f32>;`:""}
${N1()}`,w(z,3,e),j1,jz,Yz,F1,Uz,Tz("3u"),X?"":`${Nz}
${AJ}
${$z}`,Qz("terrain_heightTexel"));if(J)Y.push(l);if(Y.push(mz),Y.push(y2("terrain_coarseLayerColor","terrain_paramsRow",Q)),q)Y.push(f,xz,Wz("fine.x >= 1.0"),R2);if(Y.push(`fn terrain_coarseColor(slot: u32, word: u32, worldAbs: vec3<f32>, heightNorm: f32) -> vec3<f32> {
  if (pool.layerCount < 0.5) { return pool.fallbackColor; }
${H0("albedo","vec3<f32>",(B)=>`terrain_coarseLayerColor(terrain_layerOf(slot, ${B}), worldAbs.xz, heightNorm)`)}
  return clamp(albedo * mix(${N[0]}, ${N[1]}, heightNorm), vec3<f32>(0.0), vec3<f32>(1.0));
}`),!X)Y.push(`
fn terrain_coarseLayerResponse(layer: u32) -> vec2<f32> {
  let pbrRow = terrain_paramsRow(layer, ${u}u);
  var roughness = 1.0;
  if (terrain_paramsRow(layer, ${T}u).x < 0.5 && terrain_paramsRow(layer, ${x}u).a < 1.0 && pbrRow.x >= 0.0) {
    roughness = terrain_patinaRoughness(terrain_paramsRow(layer, ${_}u).b, terrain_paramsRow(layer, ${I}u).x);
  }
  return vec2<f32>(roughness, clamp(pbrRow.z, 0.0, 1.0));
}

fn terrain_coarseResponse(slot: u32, word: u32) -> vec2<f32> {
${!Q.pbr?"  return vec2<f32>(1.0, 0.0);":`  if (pool.layerCount < 0.5 || (u32(pool.shading) & ${E.pbr}u) == 0u) { return vec2<f32>(1.0, 0.0); }
${H0("response","vec2<f32>",(B)=>`terrain_coarseLayerResponse(terrain_layerOf(slot, ${B}))`)}
  return vec2<f32>(clamp(response.x, ${Zz}, 1.0), clamp(response.y, 0.0, 1.0));`}
}`);if(Y.push(`${E1}
  @location(2) color: vec3<f32>,${X?"":`
  @location(3) response: vec3<f32>,`}${J?I1:""}${q?k2:""}
}

${T1(z,!1)}
  if (arrival.x < 1.0) { normal = normalize(mix(terrain_scaleNormal(heightTile, gridX, gridZ, i32(arrival.y)), normal, arrival.x)); }
  out.normal = normal;
  let heightNorm = clamp((height - pool.verticalMin) * pool.verticalRangeInv, 0.0, 1.0);
  let word = terrain_vertexWordAt(slot, gridX, gridZ);
  out.color = terrain_coarseColor(slot, word, lume_worldFromRender(worldPos), heightNorm);${X?"":`
  var low = 0.0;
  if ((u32(pool.shading) & ${E.wet}u) != 0u) { low = terrain_lowBilinear(heightTile, vec2<f32>(f32(gridX), f32(gridZ)) + vec2<f32>(1.5)); }
  out.response = vec3<f32>(terrain_coarseResponse(slot, word), low);`}${J?A1:""}${q?O2:""}
  return out;
}
`),X)return[...Y,W1(J,$,"in.color")].join(`
`);if(Y.push(`@fragment
fn fs(in: VsOut) -> ${o($)} {`),J)Y.push(c);return Y.push(`  lume_surfacePoint = in.worldPos;
  var N = normalize(in.normal);
  var finalAlbedo = in.color;${q?`
  finalAlbedo = clamp(in.color + terrain_coarsePaint(in.paintLayer, in.paintShare * (1.0 - min(abs(in.paintPick - f32(in.paintLayer)), 1.0)), in.paintUv, dpdx(in.paintUv), dpdy(in.paintUv)), vec3<f32>(0.0), vec3<f32>(1.0));`:""}
  var roughness = in.response.x;
  if ((u32(pool.shading) & ${E.wet}u) != 0u) {
${Vz("in.response.z")}
  }
  let surface = lume_surfaceOut(N, finalAlbedo, roughness, in.response.y, 1.0, vec3<f32>(0.0));
  return ${$?"lume_surfaceStillMotion(surface, in.worldPos)":"surface"};
}`),Y.join(`
`)}var w1=`${AJ}

fn lume_horizon_layer_response(layer: u32) -> vec2<f32> {
  let pbrRow = lume_horizon_paramsRow(layer, ${u}u);
  var roughness = 1.0;
  if (pbrRow.x >= 0.0) { roughness = terrain_patinaRoughness(lume_horizon_paramsRow(layer, ${_}u).b, lume_horizon_paramsRow(layer, ${I}u).x); }
  return vec2<f32>(roughness, clamp(pbrRow.z, 0.0, 1.0));
}`;function $4(z,J=uz){return[p,IJ,Bz,f,R1,WJ(z.layerColor,"lume_horizon_paramsRow",J),J.pbr&&z.response!==void 0?w1:"",m1(J,z)]}var g1={fn:"lume_horizon_albedo",params:"in: HorizonVertexOut",worldPos:"in.worldPos",row:"in.row",layerColor:"lume_horizon_layer_color",response:"lume_horizon_response"};function m1(a,b){return (m1=$c0C(12)).call(this,a,b)}function u1(a,b){return (u1=$c0C(13)).call(this,a,b)}var w2={x:"1.0",y:"0.0"};var zJ=(z,J)=>z.pbr?`${g1.response}.${J}`:w2[J];var G0=(z,J)=>`  var finalAlbedo = ${J};
  var N = normalize(in.normal);
  var roughness = ${zJ(z,"x")};
${z.wet?`${Vz("0.0")}
`:""}`;function g2(a,b,c,d,e){return (g2=$c0C(14)).call(this,a,b,c,d,e)}var m2="lume_horizon_lit";function X4(){return`${CJ.trim()}

fn ${m2}(N: vec3<f32>, V: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32) -> vec3<f32> {
${u1("roughness","metalness")}
  return lit;
}`}function u2(z,J,$){let X=[$.yields?"lume_horizon_under_a_chunk(in.worldPos)":"",$.holes?"lume_horizon_holed(in.worldPos)":""].filter((q)=>q.length>0),Z=`in, worldDdx, worldDdy${X.length>0?", yields":""}`,Q=[X.length>0?`  let yields = ${X.join(" | ")};
  if (yields) { discard; }`:"",`  let worldDdx = dpdx(in.worldPos).xz;
  let worldDdy = dpdy(in.worldPos).xz;`].filter((q)=>q.length>0).join(`
`);if(J)return`@fragment
fn fs(in: HorizonVertexOut) -> ${o(z)} {
${Q}
  return ${z?`lume_surfaceStillMotion(lume_horizon_surface(${Z}), in.worldPos)`:`lume_horizon_surface(${Z})`};
}`;return`@fragment
fn fs(in: HorizonVertexOut) -> ${s(z)} {
${Q}
  return ${z?`lume_staticMotionFragment(vec4f(lume_horizon_color(${Z}), 1.0), in.worldPos)`:`vec4<f32>(lume_horizon_color(${Z}), 1.0)`};
}`}function h2(z){if(!z.ground)return[];let J=z.drifts!==0;return[z.noise||J?Ez:"",z.noise?p:"",J?`${IJ}
${Bz}`:"",z.heightTint?jz:"",z.textured?`${Yz}
${f}
${R1}`:"",z.stops||z.heightTint?Uz:""]}function h1(){return (h1=$c0C(15)).apply(this,arguments)}function Z4(a,b){return (Z4=$c0C(16)).apply(this,arguments)}function q4(z,J,$=!1,X=-1){let Z=y1(X);return J.getRenderPipeline(tz($,Z),()=>e0(z,J,$,$||X>=0?h1($,!0,X<0?null:TJ(X)):o0,Z),X<0?XJ:aa($))}
;

function aa($){return({peelCull:!0,standIn:tz($),samePicture:!0,standInCosts:!0})}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{iyr as G1}from"./26ffa603-df04330d42aa0054.mjs";import{$Ur as tJ,AOH as Z0,BHw as M1,BsO as dJ,CSp as Ez,ENZ as pz,Ffa as f,GVV as V1,GX7 as Sz,HHM as $z,HT9 as q0,HWj as lJ,Hqj as l,I0P as Nz,IKF as uJ,ImK as Q1,JUY as fz,JUa as T,Jgx as oJ,KEp as C1,L1d as d,LSY as W,MCH as J0,M_u as kz,MhP as _,Mi0 as EJ,NGQ as eJ,NQ5 as vJ,NUg as qz,Nvx as x,NyZ as U1,Nzs as K1,OUg as Wz,QD5 as iJ,QQZ as nJ,QQm as IJ,R$O as dz,RnX as cz,SlZ as fJ,Sq4 as Qz,U$V as xz,U_O as N,Xza as Az,Y91 as u,YNC as pJ,YVS as aJ,YrD as jz,Z2I as X0,ZSS as E,_HQ as Vz,_lr as Y1,_rl as I,aDK as Zz,b1b as rJ,cTx as OJ,cdu as c,eBN as F1,eNv as j1,gDc as Xz,hcB as h,kpD as lz,lGU as hJ,mv4 as hz,naD as A,nme as Uz,pes as mz,ppB as Yz,rQq as sJ,rYt as Tz,s0C as B1,sdW as AJ,tER as z0,twK as $0,u1a4 as cJ,u5c as p,x4$ as H1,xWK as Bz,yFn as R,z1F as P1}from"./3a143d46-c72a17da50e9068c.mjs";import{j6w as bJ}from"./73c224890e5dcb5e.mjs";import{zM4 as $1}from"./0d004466878cd8d5.mjs";import{luT as mJ}from"./fe1722910da55e5a.mjs";export{$2 as RSR,$4 as t6N,A2 as Efa,C2 as gHM,E2 as j83,F0 as qYp,H0 as e8N,J4 as ktX,L2 as $ZD,M2 as k6K,N2 as G79,Q0 as IGp,T2 as tjE,TJ as Duc,W2 as lJl,X4 as Vv4,Z4 as CVu,_1 as q_T,az as KIa,e3 as ckN,i3 as jqI,j2 as e4X,m2 as nnL,n3 as NZL,o3 as sge,q4 as wQ5P,r3 as JPvb,s3 as p57,t3 as $VD,uz as mdB,x1 as DY3,y1 as JVc,y2 as Y5q,z4 as fpx};
