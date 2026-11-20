import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'((j=null,J=!1)=>`@vertex\nfn vs(@builtin(vertex_index) vertexIndex: u32) -> VsOut {\n${LJ}\n${e({struct:"VsOut"})}\n  var out: VsOut;\n  let decoded = voxel_decode(survivorSlot, vertexIndex & 3u);\n  if (!voxel_stands(decoded.leave, decoded.seed, frame.fadeTime)) {\n    out.position = vec4<f32>(0.0, 0.0, -1.0, 1.0);\n    return out;\n  }\n  if (palette[decoded.paletteRow + ${UJ}u].y > 0.5) {\n    out.position = vec4<f32>(0.0, 0.0, -1.0, 1.0);\n    return out;\n  }\n  let chunkPose = chunkPoses[decoded.chunkSlot];\n${J?`${gJ}\n`:""}\n  let worldPos = chunkPose.at.xyz + chunkPoseTurn(chunkPose, decoded.localPos)${J?" + swayNow":""};\n  out.worldPos = worldPos;\n  out.worldNormal = chunkPoseTurn(chunkPose, decoded.localNormal);\n  out.uv = decoded.uv;\n${mJ}\n  out.cell = decoded.cell;\n  out.shade = decoded.shade;\n  let e0 = palette[decoded.paletteRow];\n  let e1 = palette[decoded.paletteRow + 1u];\n  let e2 = palette[decoded.paletteRow + 2u];\n  out.color = e0.xyz;\n  out.emissive = e1.xyz * e1.w;\n  out.surface = e2;\n${j===null?`${pJ}\n`:`${j}\n`}  let viewPos = frame.view * vec4<f32>(worldPos, 1.0);\n  out.viewZ = -viewPos.z;\n  out.position = frame.viewProj * vec4<f32>(worldPos, 1.0);\n  return out;\n}`)',()=>'((j,J,Q)=>`${j}\n  var litColor = ${J};\n  let f0 = mix(vec3<f32>(0.04), rgb, metalness);\n  let F = shade_fresnelSchlick(max(dot(paneN, paneV), 0.0), f0);\n  litColor += emissive;\n  litColor = shade_applyFog(litColor, in.viewZ, in.worldPos - frame.cameraPosition);\n${nJ}\n  return ${Q?"lume_staticMotionFragment(vec4f(litColor, coverage), in.worldPos)":"vec4<f32>(litColor, coverage)"};\n}`)',()=>'(function(j,J,Q,$,q,Z=!1){let H=J?`  if (alphaSample < cutout * 0.5 || (cutout < 0.5 && !front)) { discard; }\n`:"";if(j==="lit"){let Y="vec4<f32>(litColor, 1.0)";if($)Y=Z?"voxel_swayMotion(vec4f(litColor, 1.0), in.worldPos, in.swayStep)":"lume_staticMotionFragment(vec4f(litColor, 1.0), in.worldPos)";return`${H}  var litColor = ${q("N","V","in.worldPos")};\n  litColor += emissive;\n  litColor = shade_applyFog(litColor, in.viewZ, in.worldPos - frame.cameraPosition);\n  return ${Y};\n}`}let G=Q&&qj()!==null?`lume_surfaceRead(N, rgb, roughness, metalness, 1.0, emissive, vec4<f32>(0.0, 0.0, 0.0, ${(NQ??=$c0I(6))}))`:"lume_surfaceOut(N, rgb, roughness, metalness, 1.0, emissive)",B=G;if($)B=Z?`voxel_swaySurfaceMotion(${G}, in.worldPos, in.swayStep)`:`lume_surfaceStillMotion(${G}, in.worldPos)`;return`${H}  lume_surfacePoint = in.worldPos;\n  return ${B};\n}`})',()=>'(function(j,J,Q,$,q,Z=!1){if(J==="water-surface")return Q?`${Q.pane}\n  lume_surfacePoint = paneP;\n  return lume_surfaceRead(paneN, rgb, roughness, metalness, 1.0, vec3<f32>(0.0), vec4<f32>(paneP - in.worldPos, ${t}.0));\n}`:`  lume_surfacePoint = in.worldPos;\n  return lume_surfaceRead(N, rgb, roughness, metalness, 1.0, vec3<f32>(0.0), vec4<f32>(0.0, 0.0, 0.0, ${t}.0));\n}`;let H=J==="lit",G="textureLoad(waterLight, vec2<i32>(in.position.xy), 0).rgb";if(j==="glass"){return J==="glass-through"?FQ($,Q!==null):(Z?YQ:UQ)(q("N","V","in.worldPos","glassBodyAlbedo","glassFoldSky"),$,Q!==null);}if(Q){return lJ(Q.pane,H?q("paneN","paneV","paneP"):G,$);}return`  var litColor = ${H?q("N","V","in.worldPos"):G};\n  let f0 = mix(vec3<f32>(0.04), rgb, metalness);\n  let F = shade_fresnelSchlick(max(dot(N, V), 0.0), f0);\n  let transmitted = rgb * (vec3<f32>(1.0) - F);\n  litColor = mix(litColor, transmitted, 0.6);\n  litColor += emissive;\n  litColor = shade_applyFog(litColor, in.viewZ, in.worldPos - frame.cameraPosition);\n${sJ}\n  return ${$?"lume_staticMotionFragment(vec4f(litColor, coverage), in.worldPos)":"vec4<f32>(litColor, coverage)"};\n}`})']},function(){return[()=>'((j,J,Q=!1)=>`${Nj(Q)}\n  let glassBodyAlbedo = rgb * glassBody;\n  let glassMirrorDir = reflect(-V, N);\n  let glassDome = sky_domeMirror(glassMirrorDir);\n  let glassDrawn = glassDome.w > 0.5 && glassBody <= 0.0;\n  let glassFoldSky = select(1.0, 0.0, glassDrawn);\n  var litColor = ${j};\n  let glassCube = lume_cubeSampleLevel(iblEnvMap, iblSampler, glassMirrorDir, roughness * passLights.iblParams.y, passLights.iblParams.y + 1.0).rgb * passLights.iblParams.x * ${(1/a-1).toFixed(6)};\n  let glassCaptured = select(lighting_ambientIrradiance(glassMirrorDir) * 0.31830988618, glassCube * ${(1/(1-a)).toFixed(6)}, passLights.iblParams.x > 0.0);\n  let glassDomeKept = min(glassDome.rgb, glassCaptured);\n  let glassSky = select(select(lighting_ambientIrradiance(glassMirrorDir) * 0.31830988618, glassCube, passLights.iblParams.x > 0.0), glassDomeKept, glassDrawn);\n  litColor += glassSky * (glassF * lighting_groundOcclusion(in.worldPos, N));\n  litColor += emissive;\n  let glassToward = in.worldPos - frame.cameraPosition;\n  let glassLight = max(shade_applyFog(min(litColor, vec3<f32>(65504.0)), in.viewZ, glassToward) - shade_applyFog(vec3<f32>(0.0), in.viewZ, glassToward) * glassThrough, vec3<f32>(0.0));\n  return ${J?"lume_staticMotionFragment(vec4f(glassLight, glassBody), in.worldPos)":"vec4<f32>(glassLight, glassBody)"};\n}`)',()=>'((j,J,Q=!1)=>`${Nj(Q)}\n  let glassBodyAlbedo = rgb * glassBody;\n  let glassFoldSky = select(1.0, 0.0, glassBody <= 0.0);\n  var litColor = ${j};\n  litColor += passLights.ambientColor * glassF;\n  litColor += emissive;\n  let glassToward = in.worldPos - frame.cameraPosition;\n  let glassLight = max(shade_applyFog(min(litColor, vec3<f32>(65504.0)), in.viewZ, glassToward) - shade_applyFog(vec3<f32>(0.0), in.viewZ, glassToward) * glassThrough, vec3<f32>(0.0));\n  return ${J?"lume_staticMotionFragment(vec4f(glassLight, glassBody), in.worldPos)":"vec4<f32>(glassLight, glassBody)"};\n}`)',()=>'(()=>("select(0.0, lume_surfaceAxisWord(normalize(in.worldNormal) * select(1.0, -1.0, !front)), surf.soft > 0.0)"))',()=>'(()=>({color:{srcFactor:"zero",dstFactor:"src",operation:"add"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}}))',()=>'(function(j,J,Q,$,q){let Z=(J&1)===1?"storage":"vertex",H=(J&2)===2,G=(J&4)===4?Q:null,B=`terrain/voxel-bucket/glass${G?"/surface":""}/through/${z({motion:H})}${P(Z)}`;return q.getRenderPipeline(B,function(){let Y=JQ(Z,H,G);let D=$.createShaderModule({label:B,code:Y});let F=S(q,[Y]);let K=k($,B,[q.getBindGroupLayout(h,"lume frame"),F,G?q.getBindGroupLayout(V(G.layout),"terrain voxel bucket surface"):q.getBindGroupLayout(V(),"terrain voxel bucket")],F);return{label:B,layout:K,vertex:{module:D,entryPoint:"vs"},fragment:{module:D,entryPoint:"fs",targets:m({motion:H,blend:(WQ??=$c0I(7)),motionBlend:g})},depthStencil:A(!1),multisample:{count:p()}}},c(!1))})',()=>'(function(j,J,Q,$,q,Z,H,G,B,Y,D=null,F=!1){let K=J.programKey?f(J):"";let I=$&&Q?.programKey?f(Q):"";let U=Lj(AJ,j);let v$1;{let v$2;VQ:{let j$3=K,J$3=I,Q$3=$;{let j=j$3,J=J$3,Q=Q$3;let $=[j];if(!Q){v$2=$;break VQ;}if(J!==""&&J!==j)$.push(J);if(j!=="")$.push("");v$2=$;}}let j$2=v$2,J$2=q,Q$2=Z?y:d,$$2=H,q$2=G,Z$1=Y;{let j=j$2,J=J$2,Q=Q$2,$=$$2,q=q$2,Z=Z$1;let H=[];for(let G of j)for(let B of J?y:d)for(let Y of $?y:d)for(let D of q?y:d)for(let F of Q){let K=Z(G,B,F,Y,D);if(!H.includes(K))H.push(K)}v$1=H;}}let W=v$1.filter((C)=>C!==j);let N=CQ(D,c(B,W));let L=F?{...N,...Qj}:N;U.set(zJ(Q,$),L);return L})']},function(){return[()=>'(function(j,J,Q,$,q,Z,H,G=!1,B=!1,Y=!1,D=null){let F=!$;let K=p();let I=Z!==null?D:null;let U=(C,R,X,T,E)=>PQ(Z!==null,R,X,G,Q,T,K,E);let W=U("",H,F,B,Y)+(I===null?"":`/terms-${I.toString(36)}`);let N=Wj(W,void 0,!1);let L=N!==x?N:Ij(W,b(),void 0,!1,H&&Z!==null,F,B,Y,!0,U,Z!==null?OJ:null);return J.getRenderPipeline(W,function(){let C=Aj(iJ(Q,$,q,Z,H&&Z!==null,G,B,Y),"fs",K);let R=j.createShaderModule({label:W,code:C});let X=S(J,[C]);let T=k(j,W,[J.getBindGroupLayout(h,"lume frame"),X,Z?J.getBindGroupLayout(V(Z.layout),"terrain voxel bucket surface"):J.getBindGroupLayout(V(),"terrain voxel bucket")],X);return{label:W,layout:T,vertex:{module:R,entryPoint:"vs"},fragment:{module:R,entryPoint:"fs",targets:jj(G,K),...I===null?{}:{constants:{voxel_terms:I&65535,voxel_slant:I>>>16}}},primitive:{topology:"triangle-list",cullMode:PJ(F)},depthStencil:A(!0),multisample:{count:K}}},L)})',()=>'(()=>`@vertex\nfn vs(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {\n${LJ}\n${e("position")}\n  let decoded = voxel_decode(survivorSlot, vertexIndex & 3u);\n  if (!voxel_stands(decoded.leave, decoded.seed, shadowView.fadeTime)) { return vec4<f32>(0.0, 0.0, -1.0, 1.0); }\n  let chunkPose = chunkPoses[decoded.chunkSlot];\n  let worldPos = chunkPose.at.xyz + chunkPoseTurn(chunkPose, decoded.localPos);\n  return shadowView.viewProj * vec4<f32>(worldPos, 1.0);\n}\n`)']}],$c0XU=[0,4,10];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,12,3908963907141632);var $c0I=$c0C.i;
;const{$MH:bj,B3p:Hj,Dm3:$J,Dq1:e,EiQ:Lj,GNc:hj,Ggy:yj,Jai:Tj,KFY:t,KdH:A,L6f:Ej,M8T:zj,MfU:m,N0E:Kj,NDw:Pj,NKo:$j,NbW:vj,OVv:Bj,P2_:Gj,PvR:c,THT:fj,U4E:z,VI3:u,VR7:pj,WG4:qJ,Wrp:Qj,X4S:Aj,XHo:wj,XK8:jj,ZiU:ej,_rr:n,a7W:i,baA:a,bcH:lj,bin:gj,eYb:xj,fX9:Zj,gzd:ij,hqv:o,htm:_j,hxd:Oj,jJo:Sj,jqS:Vj,kQP:p,lKR:Jj,lSa:dj,mGj:l,mq1:h,nQ$:QJ,nUV:JJ,nnU:qj,nvi:uj,oAB:f,pJh:mj,r8W:cj,uMP:S,ueV:b,vIW:rj,vbn:P,vcF:kj,wRZ:M,xFq:g,yfJ:k,zKy:jJ}=$Lr;
;;;;;;;;;var kJ=XJ.flatMap((j,J)=>j.corners[2]===1?[J]:[]),w=lj.map(Pj),hJ=`fn voxel_ringShade(shade: u32, at: vec2<f32>) -> f32 {
  if ((shade & ${u}u) == ${u}u) { return 1.0; }
  let span = vec2<u32>(((shade >> 18u) & 0x1fu) + 1u, ((shade >> 23u) & 0x1fu) + 1u);
  let cell = min(vec2<u32>(max(floor(at), vec2<f32>(0.0))), span - vec2<u32>(1u));
  let f = clamp(at - vec2<f32>(cell), vec2<f32>(0.0), vec2<f32>(1.0));
  let levels = voxel_classLevels(shade, cell, span);
  let c = select(select(vec4<f32>(${w[0]}), vec4<f32>(${w[1]}), levels == vec4<u32>(1u)), select(vec4<f32>(${w[2]}), vec4<f32>(${w[3]}), levels == vec4<u32>(3u)), levels >= vec4<u32>(2u));
  if (c.x + c.w > c.z + c.y) {
    if (f.x + f.y <= 1.0) { return c.x + f.x * (c.y - c.x) + f.y * (c.z - c.x); }
    return c.w + (1.0 - f.x) * (c.z - c.w) + (1.0 - f.y) * (c.y - c.w);
  }
  if (f.x >= f.y) { return c.x + f.x * (c.y - c.x) + f.y * (c.w - c.y); }
  return c.x + f.y * (c.z - c.x) + f.x * (c.w - c.z);
}`,vJ=kJ.map((j)=>`dir == ${j}u`).join(" || "),wJ=2,yJ=1,MJ="storage",LJ=`  let survivorSlot = lume_survivors[vertexIndex >> 2u];
  let lumeSurvivorCulled = survivorSlot == ${_j}u;`,TJ=`${BJ}

${pj}

${hJ}

${KJ}

${DJ}

${FJ}

fn voxel_faceAxes(l: vec3<f32>, isAxisX: bool, isAxisY: bool) -> vec3<f32> {
  return vec3<f32>(select(l.x, l.z, isAxisX), select(l.y, l.z, isAxisY), select(select(l.z, l.y, isAxisY), l.x, isAxisX));
}

struct VoxelDecoded {
  localPos: vec3<f32>,
  localNormal: vec3<f32>,
  uv: vec2<f32>,
  cell: vec2<f32>,
  shade: u32,
  chunkSlot: u32,
  paletteRow: u32,
  leave: f32,
  seed: u32,
  lattice: vec2<f32>,
  uvSign: vec2<f32>,
  axis: u32,
  pinned: f32,
}

const VOXEL_LEAVE: f32 = ${NJ/1000};
fn voxel_stands(left: f32, seed: u32, now: f32) -> bool {
  let age = now + left;
  if (left >= 0.0 || age < 0.0) { return true; }
  if (age >= VOXEL_LEAVE) { return false; }
  var h = (seed ^ (seed >> 16u)) * 0x7feb352du;
  h = (h ^ (h >> 15u)) * 0x846ca68bu;
  return f32((h ^ (h >> 16u)) >> 8u) / 16777216.0 * VOXEL_LEAVE >= age;
}

fn voxel_decode(arenaQuad: u32, fetched: u32) -> VoxelDecoded {
  var out: VoxelDecoded;
  let chunkSlot = quadChunkOf(arenaQuad);
  out.chunkSlot = chunkSlot;
  let words = quadWords[arenaQuad];
  let placement = words.x;
  let faceValue = voxel_faceValueRead(placement, words.y);

  let corner = (fetched + select(0u, 1u, (placement & ${QJ}u) != 0u)) & 3u;

  let dir = placement & 0x7u;
  let slab = f32((placement >> 3u) & 0x1fu);
  let u0 = f32((placement >> 8u) & 0x1fu);
  let v0 = f32((placement >> 13u) & 0x1fu);
  let spanU = f32(((placement >> 18u) & 0x1fu) + 1u);
  let spanV = f32(((placement >> 23u) & 0x1fu) + 1u);
  let lowered = f32((faceValue >> 24u) & 1u);
  let surfaceOffset = f32((faceValue >> 25u) & 0x7fu) / 64.0;

  let params = chunkParams[chunkSlot];
  let cellSize = params.x;
  out.leave = params.z;
  out.seed = placement ^ (faceValue * 0x9e3779b1u) ^ (chunkSlot * 0x85ebca77u);
  let matIdx = faceValue & ${ij}u;
  ${YJ("paletteRow")}
  out.paletteRow = paletteRow;
  let inset = palette[paletteRow].w;

  let axis = dir >> 1u;
  let isAxisX = axis == 0u;
  let isAxisY = axis == 1u;
  let positive = (dir & 1u) == 0u;

  let uMin = u0 * cellSize;
  let uMax = (u0 + spanU) * cellSize;
  let vMin = v0 * cellSize;
  let topInset = lowered * inset;
  let vMax = select((v0 + spanV - topInset) * cellSize - surfaceOffset, (v0 + spanV) * cellSize, isAxisY);
  let planePositive = select((slab + 1.0) * cellSize, (slab + 1.0 - inset) * cellSize - surfaceOffset, isAxisY);
  let plane = select(slab * cellSize, planePositive, positive);

  let g1 = f32(corner >> 1u);
  let g2 = f32((corner ^ (corner >> 1u)) & 1u);
  let isPatternB = ${vJ};
  let cu = select(g1, g2, isPatternB);
  let cv = select(g2, g1, isPatternB);
  let c = u32(cu) + 2u * u32(cv);
  out.pinned = f32((faceValue >> (${ej}u + c)) & 1u);

  let pu = mix(uMin, uMax, cu);
  let pv = mix(vMin, vMax, cv);
  out.localPos = vec3f(select(pu, plane, isAxisX), select(pv, plane, isAxisY), select(select(plane, pv, isAxisY), pu, isAxisX));

  let sign = select(-1.0, 1.0, positive);
  out.localNormal = vec3f(sign * f32(isAxisX), sign * f32(isAxisY), sign * f32(axis == 2u));

  out.cell = vec2f(cu * spanU, cv * spanV);
  out.shade = voxel_ringClasses((faceValue >> 16u) & 0xffu) | (((placement >> 18u) & 0x3ffu) << 18u);
  out.lattice = vec2f(pu, pv);
  out.uv = out.lattice;
  if ((placement & ${o}u) == ${o}u) {
    let top = select(slab, slab + 1.0, positive);
    let at = (voxel_faceAxes(vec3f(u0 + cu, v0 + cv, top), isAxisX, isAxisY) + voxel_densityMove(voxel_densityCorners(arenaQuad, placement, words.y), c)) * cellSize;
    out.localPos = at;
    out.localNormal = voxel_densityNormal(voxel_densityNormals(arenaQuad, placement, words.y), c);
    out.shade = ${u}u;
    let onFace = voxel_faceAxes(at, isAxisX, isAxisY).xy;
    out.uv = onFace;
    out.lattice = onFace;
  } else if ((placement & ${jJ>>>0}u) != 0u) {
    let solid = ((words.y >> 25u) & 0x7fu) | select(0u, 0x80u, (placement & ${JJ>>>0}u) != 0u);
    let rounded = voxel_smoothCorner(i32(cu), i32(cv), solid, (words.y >> 16u) & 0xffu);
    let lattice = vec3f(u0 + cu, v0 + cv, select(slab, slab + 1.0, positive)) * cellSize;
    let at = lattice + vec3f(rounded.shift.x, rounded.shift.y, rounded.shift.z * sign) * cellSize;
    out.localPos = voxel_faceAxes(at, isAxisX, isAxisY);
    if ((placement & ${qJ>>>0}u) != 0u && voxel_smoothLowerTop(rounded.cells, isAxisY, positive)) {
      out.localPos.y = voxel_faceAxes(lattice, isAxisX, isAxisY).y - f32((placement >> (${$J}u + 2u * c)) & 3u) * 0.25 * cellSize;
    }
    let normal = vec3f(rounded.normal.x, rounded.normal.y, rounded.normal.z * sign);
    if (dot(normal, normal) > 1e-6) { out.localNormal = normalize(voxel_faceAxes(normal, isAxisX, isAxisY)); }
    out.uv = at.xy;
    out.lattice = at.xy;
  }
  out.uvSign = select(vec2f(select(1.0, -1.0, isAxisX == positive), -1.0), vec2f(1.0), isAxisY);
  out.axis = axis;
  out.uv = out.uvSign * out.uv;
  return out;
}
`,dJ=[M(0,1,"read-only-storage"),M(1,1,"read-only-storage"),M(2,1,"read-only-storage"),M(3,1,"read-only-storage"),M(4,1,"read-only-storage"),n(5,2,"float","2d-array"),Vj(6,2,"filtering"),M(7,2,"read-only-storage")],fJ=n(Dj,2,"float","2d-array"),Xj=[...dJ,l(Fj),fJ];function V(j=null){return j===null?Xj:[...Xj,...j]}var uJ=`${$j}
@group(2) @binding(0) var<storage, read> quadWords: array<vec2<u32>>;
@group(2) @binding(1) var<storage, read> quadChunkRefs: array<u32>;
@group(2) @binding(2) var<storage, read> chunkPoses: array<ChunkPose>;
@group(2) @binding(3) var<storage, read> chunkParams: array<vec4<f32>>;
@group(2) @binding(4) var<storage, read> palette: array<vec4<f32>>;
@group(2) @binding(5) var voxelAlbedo: texture_2d_array<f32>;
@group(2) @binding(6) var voxelSampler: sampler;
@group(2) @binding(7) var<storage, read> voxelAlbedoFloor: array<vec4<f32>>;`,Cj=`struct VsOut {
  @builtin(position) position: vec4<f32>,
  @location(0) worldPos: vec3<f32>,
  @location(1) worldNormal: vec3<f32>,
  @location(2) uv: vec2<f32>,
  @location(3) cell: vec2<f32>,
  @location(4) @interpolate(flat) color: vec3<f32>,
  @location(5) @interpolate(flat) emissive: vec3<f32>,
  @location(6) @interpolate(flat) surface: vec4<f32>,
  @location(7) @interpolate(flat) shade: u32,
  @location(8) viewZ: f32,
}`,gJ=`  let swayForce = palette[decoded.paletteRow + ${r}u].x;
  var swayNow = vec3f();
  var swayPrev = vec3f();
  if (swayForce > 0.0 && decoded.pinned < 0.5) {
    let swayChunk = chunkParams[decoded.chunkSlot].w;
    let swayAt = chunkPose.at.xz + frame.renderOrigin.xz;
    swayNow = voxel_swayAt(swayAt, frame.windTravel, frame.time, swayChunk);
    swayPrev = voxel_swayAt(swayAt, frame.prevWindTravel, frame.prevTime, swayChunk);
  }
  out.swayStep = swayNow - swayPrev;`,pJ=`  let faceTones = palette[decoded.paletteRow + ${r}u].yz;
  let faceTone = select(select(faceTones.x, faceTones.y, decoded.localNormal.y < -0.5), 0.0, decoded.localNormal.y > 0.5);
  if (faceTone > 0.5) { out.color = voxel_preJoinColor(faceTone); }`,mJ=`  let tile = palette[decoded.paletteRow + ${r}u].w;
  if (tile > 0.0) {
    let tileAt = voxel_faceAxes(chunkPose.at.xyz + frame.renderOrigin, decoded.axis == 0u, decoded.axis == 1u).xy;
    out.uv = decoded.uvSign * (terrain_tilePhase(tileAt, tile) + decoded.lattice * tile);
  }`,cJ=(...a)=>(cJ=$c0C(0))(...a),rJ=`${sj("voxel_floorGradScale")}

${nj("voxel_pixelEdgeUv")}`,VJ=`  let layer = floor(in.surface.w / 4.0);
  let flags = in.surface.w - layer * 4.0;
  let textured = step(2.0, flags);
  let cutout = step(1.0, flags - textured * 2.0);
  let albedoTexels = vec2<f32>(textureDimensions(voxelAlbedo, 0));
  let uvDdx = dpdx(in.uv);
  let uvDdy = dpdy(in.uv);
  let layerRow = voxelAlbedoFloor[u32(layer)];
  let floorScale = voxel_floorGradScale(uvDdx, uvDdy, albedoTexels, layerRow.x);
  let albedoUv = voxel_pixelEdgeUv(in.uv, uvDdx, uvDdy, albedoTexels, layerRow.w);
  let preJoin = vec4<f32>(voxel_preJoinColor(layerRow.z), 1.0 - cutout * sign(layer) * step(layerRow.y, 1.0));
  let albedo = select(preJoin, mix(textureSampleGrad(voxelAlbedo, voxelSampler, albedoUv, i32(layer), uvDdx * floorScale, uvDdy * floorScale), preJoin, layerRow.y), layer > 0.5 && layerRow.y < 1.0);
  let tintLuma = max(dot(in.color, vec3<f32>(0.2126, 0.7152, 0.0722)), 1e-4);
  let tinted = albedo.rgb * (in.color / tintLuma);
  let ao = voxel_ringShade(in.shade, in.cell);
  let rgb = mix(in.color, tinted, textured) * ${qj()?.CELL_LIGHT_CORNER_SHADE_WGSL??"ao"};
  let alphaSample = mix(1.0, albedo.a, textured);
  let N = normalize(in.worldNormal) * select(1.0, -1.0, !front);
  let V = ${dj("frame.cameraPosition - in.worldPos")};
  let emissive = albedo.rgb * in.emissive;`,tJ=()=>VJ.replaceAll("in.color","surf.rgb").replace("normalize(in.worldNormal)","normalize(in.worldNormal + surf.tilt)").replace("in.emissive;","surf.emissive;"),aJ=`  if (surf.soft > 0.0) { lighting_cellRead(in.worldPos, normalize(in.worldNormal) * select(1.0, -1.0, !front)); }
`,oJ=(j)=>j.includes("fn lighting_cellRead(")?aJ:"",sJ="  let coverage = in.surface.z * alphaSample;",nJ="  let coverage = mix(in.surface.z, 1.0, F.g) * alphaSample;",lJ=(j,J,Q)=>(lJ=$c0C(1))(j,J,Q);function EJ(j,J="vertex",Q=!0,$=Kj(),q=!1,Z=null,H=!1,G=!1,B=!1){return v(j,J,Q,$,q,Z,H,"lit",G,B)}function iJ(j="vertex",J=!0,Q,$=null,q=!1,Z=!1,H=!1,G=!1){return v("opaque",j,J,Q,Z,$,q,"surface",H,G)}function eJ(j,J,Q){return v("liquid",j,!1,J,!1,Q,!1,"water-surface")}function jQ(j,J,Q,$=!1){return v("liquid",j,!1,J,$,Q,!1,"water-sampled")}function JQ(j="vertex",J=!1,Q=null){return v("glass",j,!0,b(),J,Q,!1,"glass-through")}function v(j,J,Q,$,q,Z,H,G,B=!1,Y=!1){let D=B&&j==="opaque"&&(G==="lit"||G==="surface"),F=Y&&j==="opaque"&&(G==="lit"||G==="surface"),K=G==="lit",I=xj("pbr",$),U=Z!==null&&Yj(j)?Z:null,W=U!==null&&H&&j==="opaque",N=[`//${j}${U?", the surface arm":""}${K?"":`, ${G}`}`,yj];if(q&&G!=="water-surface")N.push(G==="surface"?uj:gj);N.push($.wgslDefs,...GQ(G,I.defs,q),uJ);if(U)N.push(U.bindings);if(N.push(i(MJ,wJ,Fj)),F)N.push(QQ,oj,aj);let L=`${Cj.slice(0,-1)}${U?U.vsOut:""}${D?`
  @location(13) swayStep: vec3<f32>,`:""}
}`;if(D){N.push(...ZQ(G,q));}N.push(TJ,ZJ,U||D?L:Cj,cJ(U?.vs??null,D),IJ,rJ);if(U){if(N.push(U.fsDefs),W)N.push(U.grownDefs);if(j==="liquid")N.push(U.paneDefs)}let C;BQ:{let j$1=U,J$1=W,Q$1=$,$$1=K?oJ(I.defs):"",q$1=HQ(G,q);{let j=j$1,J=J$1,Q=Q$1,$=$$1,q=q$1;if(j===null){C=`@fragment
fn fs(in: VsOut, @builtin(front_facing) front: bool) -> ${q} {
${VJ}
  let roughness = in.surface.x;
  let metalness = in.surface.y;`;break BQ;}C=`@fragment
fn fs(in: VsOut, @builtin(front_facing) front: bool) -> ${q} {
${j.fsPrologue(Q.sunDirection,Q.sunRadiance)}${J?`
${j.grownFs(Q.sunDirection)}`:""}
${$}${tJ()}
  let roughness = surf.roughness;
  let metalness = surf.metalness;`;}}N.push(F?qQ(C):C);let R=(X,T,E,O="rgb",_)=>I.litColor({N:X,V:T,P:E,albedo:O,roughness:"roughness",metalness:"metalness",emissive:"emissive",toonSteps:"4.0",transmission:"0.0",..._===void 0?{}:{occlusion:_}});N.push(j==="opaque"?KQ(G,Q,U!==null,q,R,D):DQ(j,G,U,q,R,mj($)!==""));return Tj(N.filter((X)=>X.length>0),`
`)}var QQ=`@group(2) @binding(${Dj}) var voxelRelief: texture_2d_array<f32>;`,$Q=`
  let reliefQ0 = dpdx(in.worldPos);
  let reliefQ1 = -dpdy(in.worldPos);
  let reliefRow = voxelAlbedoFloor[arrayLength(&voxelAlbedoFloor) / 2u + u32(layer)];
  let reliefMask = (1.0 - reliefRow.y) * (1.0 - layerRow.y);
  if (flags - floor(flags) > ${(WJ/2).toFixed(2)} && layer > 0.5 && reliefMask > 0.0) {
    let reliefTexels = vec2<f32>(textureDimensions(voxelRelief, 0));
    let reliefScale = voxel_floorGradScale(uvDdx, uvDdy, reliefTexels, reliefRow.x);
    let nro = textureSampleGrad(voxelRelief, voxelSampler, albedoUv, i32(layer), uvDdx * reliefScale, uvDdy * reliefScale);
    let nroMean = textureSampleLevel(voxelRelief, voxelSampler, vec2<f32>(0.5), i32(layer), 32.0);
    let mapN = lume_meanFreeNormal(patina_packedNormalTs(nro, 1.0), patina_packedNormalTs(nroMean, 1.0));
    N = normalize(mix(N, lume_perturbNormalGrad(N, reliefQ0, reliefQ1, uvDdx, -uvDdy, mapN), reliefMask));
    roughness = roughness * mix(1.0, nro.b, reliefMask * ${cj.toFixed(3)});
  }`;function qQ(j){return`${j.replace("  let N = ","  var N = ").replace("  let roughness = ","  var roughness = ")}${$Q}`}function ZQ(j,J){if(!J)return[s];return[s,j==="surface"?RJ:CJ]}function GQ(j,J,Q){if(j==="lit"||j==="glass-through")return[J];if(j==="surface")return[Sj(Q)];if(j==="water-surface")return[zj];return[Oj,wj]}function HQ(j,J){if(j==="surface")return kj(J);if(j==="water-surface")return"LumeSurfaceOut";return hj(J)}function KQ(a,b,c,d,e){return (KQ=$c0C(2)).apply(this,arguments)}function DQ(a,b,c,d,e){return (DQ=$c0C(3)).apply(this,arguments)}var Rj=`  if (!front || alphaSample < cutout * 0.5) { discard; }
  let glassCover = in.surface.z * alphaSample;
  let glassBody = select(0.0, glassCover, in.surface.z > ${rj.toFixed(6)});
  let glassF = shade_fresnelSchlick(max(dot(N, V), 0.0), vec3<f32>(0.04)).g;
  let glassThrough = mix(vec3<f32>(1.0), mix(in.color, tinted, textured), glassCover) * ((1.0 - glassF) * (1.0 - glassBody));`,Nj=(j)=>j?Rj.replace("mix(in.color, tinted, textured)","mix(surf.rgb, tinted, textured)"):Rj,FQ=(j,J=!1)=>`${Nj(J)}
  return ${j?"lume_staticMotionFragment(vec4f(glassThrough, 0.0), in.worldPos)":"vec4<f32>(glassThrough, 0.0)"};
}`,UQ=(...a)=>$c0C(4)(...a),YQ=(...a)=>$c0C(5)(...a),NQ;function A0(j,J,Q,$,q,Z=!1){let H=q==="sampled",G=H&&Z,B=`terrain/voxel-bucket/liquid${$?"/surface":""}/${H?`water-light/${z({motion:G})}`:Jj()}${P(Q)}`;return J.getRenderPipeline(B,function(){let Y=b();let D=H?jQ(Q,Y,$,G):eJ(Q,Y,$);let F=j.createShaderModule({label:B,code:D});let K=S(J,[D]);let I=[J.getBindGroupLayout(h,"lume frame"),K,$?J.getBindGroupLayout(V($.layout),"terrain voxel bucket surface"):J.getBindGroupLayout(V(),"terrain voxel bucket"),...H?[J.getBindGroupLayout(vj,"lume water light")]:[]];let U=k(j,B,I,K);return{label:B,layout:U,vertex:{module:F,entryPoint:"vs"},fragment:{module:F,entryPoint:"fs",targets:H?m({blend:bJ,motion:G,motionBlend:g}):jj()},depthStencil:A(!H),multisample:{count:1}}},H?Qj:c(!0))}var WQ,IQ={color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}},bJ={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},PJ=(j)=>j?"back":"none";function XQ(j,J,Q,$="vertex",q=!0,Z=Kj(),H,G=!1,B=null,Y=!1,D=!1,F=!1){let K=Q==="opaque"&&!q;D&&=Q==="opaque";F&&=Q==="opaque";if(B!==null&&Yj(Q)){return bQ(j,J,Q,$,K,Z,G,B,Y&&Q==="opaque",D,H,F);}let U=`${xJ(Q,K,$,G)}${D?"/sway":""}${F?"/relief":""}`;Z=Gj(Q==="glass"?b():Z,U);let W=`${U}${Hj(Z)}`;let N=Q==="glass"?void 0:H;let L=(X,T,E,O,_)=>(`${xJ(Q,E,$,G)}${O?"/sway":""}${_?"/relief":""}${X===""?"":`/light/${X}`}`);let C=Wj(W,N,!0);let R=C!==x?C:Ij(W,Z,N,!0,!1,K,D,F,Q==="opaque",L,Q==="glass"?Bj(Z,U,"pane"):null,Q==="liquid");if(Z.programKey)J.preparePictureScope(()=>XQ(j,J,Q,$,q,b(),void 0,G),!1);Zj(Z,W);return J.getRenderPipeline(W,function(){let X=EJ(Q,$,!K,Z,G,null,!1,D,F);return _J(j,J,W,X,Q,K,G,V(),"terrain voxel bucket")},R)}function _J(j,J,Q,$,q,Z,H,G,B){let Y=j.createShaderModule({label:Q,code:$}),D=S(J,[$]),F=k(j,Q,[J.getBindGroupLayout(h,"lume frame"),D,J.getBindGroupLayout(G,B)],D),K=q!=="opaque";return{label:Q,layout:F,vertex:{module:Y,entryPoint:"vs"},fragment:{module:Y,entryPoint:"fs",targets:m({motion:H,...K?{blend:q==="glass"?IQ:bJ,motionBlend:g}:{}})},primitive:{topology:"triangle-list",cullMode:PJ(Z)},depthStencil:A(!K),multisample:{count:p()}}}var OJ={watchdogSmaller:"the plain arm, each block in its own colour without the painted look"};var CQ=(j,J)=>j===null?J:{...J,...j};var RQ=function(a,b,c,d,e){return $c0C(8).call(this,a,b,c,d,e)};var MQ=GJ(1,8,RQ);function z0(j,J,Q,$,q=null){return HJ(MQ,0,(Q==="storage"?1:0)|($?2:0)|(q?4:0),q,j,J,fj)}var xJ=(j,J,Q,$)=>`terrain/voxel-bucket/${j}${J?"/solid":""}/${z({motion:$})}${P(Q)}`,Mj=(j,J,Q,$="opaque",q=!1)=>`terrain/voxel-bucket/${$}/surface${q?"/grown":""}${j?"/solid":""}/${z({motion:Q})}${P(J)}`,AJ=new Map,LQ="\x00narrow",y=[!0,!1],d=[!1],x={};function zJ(j,J){if(!J)return LQ;return j?.programKey?f(j):""}function Wj(j,J,Q){let $=AJ.get(j);if($===void 0)return x;let q=zJ(J,Q);return $.has(q)?$.get(q):x}function Ij(a,b,c,d,e,f,g,h,i,j){return (Ij=$c0C(9)).apply(this,arguments)}function bQ(j,J,Q,$,q,Z,H,G,B,Y=!1,D,F=!1){let K=`${Mj(q,$,H,Q,B)}${Y?"/sway":""}${F?"/relief":""}`;let I=Q!=="opaque";Z=Gj(Q==="glass"?b():Z,K);let U=Hj(Z);let W=`${K}${U}`;let N=Q==="glass"?void 0:D;let L=!J.inPictureWindow;let C=(T,E,O,_,SJ)=>`${Mj(O,$,H,Q,E)}${_?"/sway":""}${SJ?"/relief":""}${T===""?"":`/light/${T}`}`;let R=Wj(W,N,L);let X=R!==x?R:Ij(W,Z,N,L,B,q,Y,F,!I,C,Q==="glass"?Bj(Z,K,"pane"):OJ,Q==="liquid");Zj(Z,W);return J.getRenderPipeline(W,function(){let T=EJ(Q,$,!q,Z,H,G,B,Y,F);return _J(j,J,W,T,Q,q,H,V(G.layout),"terrain voxel bucket surface")},X)}function S0(a,b,c,d,e,f,g){return $c0C(10).apply(this,arguments)}var PQ=(j,J,Q,$,q,Z,H,G=!1)=>`terrain/voxel-bucket/opaque${j?`/surface${J?"/grown":""}`:""}${Q?"/solid":""}/${Jj($,H)}${P(q)}${Z?"/sway":""}${G?"/relief":""}`,_Q=`struct ShadowView {
  viewProj: mat4x4<f32>,
  cameraPosition: vec3<f32>,
  fadeTime: f32,
}
@group(0) @binding(0) var<uniform> shadowView: ShadowView;`,OQ=`${$j}
@group(1) @binding(0) var<storage, read> quadWords: array<vec2<u32>>;
@group(1) @binding(1) var<storage, read> quadChunkRefs: array<u32>;
@group(1) @binding(2) var<storage, read> chunkPoses: array<ChunkPose>;
@group(1) @binding(3) var<storage, read> chunkParams: array<vec4<f32>>;
@group(1) @binding(4) var<storage, read> palette: array<vec4<f32>>;`,xQ=()=>(xQ=$c0C(11))();function AQ(){return["//",_Q,OQ,i(MJ,yJ,Uj),TJ,xQ()].filter((j)=>j.length>0).join(`
`)}var zQ=[M(0,1,"read-only-storage"),M(1,1,"read-only-storage"),M(2,1,"read-only-storage"),M(3,1,"read-only-storage"),M(4,1,"read-only-storage")],SQ=[...zQ,l(Uj)];function kQ(){return SQ}function k0(j,J,Q="vertex",$=!1){let q=`terrain/voxel-bucket/shadow/${bj($)}${P(Q)}`;return J.getRenderPipeline(q,function(){let Z=j.createShaderModule({label:q,code:AQ()});let H=j.createPipelineLayout({label:q,bindGroupLayouts:[J.getBindGroupLayout(tj,"terrain voxel shadow view"),J.getBindGroupLayout(kQ(),"terrain voxel shadow arenas")]});return{label:q,layout:H,vertex:{module:Z,entryPoint:"vs"},depthStencil:Ej($)}})}var hQ=new Float32Array(1),h0=new Uint32Array(hQ.buffer);
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{ScD as CJ,bTc as s,z8n as RJ}from"./95d9a38e18ab36ba.mjs";import{aYQ as HJ,rwx as GJ}from"./8f944fa2fe6c16bd.mjs";import{Mhm as XJ}from"./f0c51ac357c8bf2e.mjs";import{F5L as IJ,F5i as BJ,LXO as DJ,M4f as FJ,NO$ as Dj,PXB as Yj,QSh as UJ,RJj as Uj,TDY as r,TqT as WJ,U0A as YJ,lPD as KJ,pmU as NJ,tlA as Fj}from"./56ed3918-9d676508c812580b.mjs";import{Ffa as ZJ}from"./3a143d46-c72a17da50e9068c.mjs";import{HU1 as nj,HYK as sj}from"./8036015a501379d5.mjs";import{xSe as aj}from"./09723e417d25bb2f.mjs";import{zM4 as tj}from"./0d004466878cd8d5.mjs";import{luT as oj}from"./fe1722910da55e5a.mjs";export{A0 as fDB,S0 as SHb,TJ as _Lh,V as vyT,XQ as M_A,jQ as icQ,k0 as M4J,kQ as zKA,z0 as dFO};
