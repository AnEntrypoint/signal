import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q,Z,$={haze:0,ground:0,wood:0,mist:0}){let X=q*180/kq,H=Math.exp(-(((X-8)/17)**2)),Q=Math.min(1,Math.max(0,(-X-4)/8)),z=0.5+0.5*Math.sign(Z);return $.haze=M.haze*(1+1.5*H+Q),$.ground=M.ground*(1+1.8*H*(0.6+0.4*z)+0.6*Q),$.wood=M.wood*(1+1.3*H*(0.5+0.5*z)-0.5*Q),$.mist=M.mist*Math.max(H*(0.2+0.8*z),0.1*Q),$})",()=>'(()=>({watchdogSmaller:"the air lit by the near sun\'s light, with no far land light"}))',()=>'(function(q,Z,$,X,H,Q,z,j){return Z.warmScope(()=>Z.getComputePipeline($,()=>({label:$,layout:q.createPipelineLayout({label:$,bindGroupLayouts:X}),compute:{module:q.createShaderModule({label:$,code:H()}),entryPoint:Q}}),j),z?"picture":"late")})',()=>'(function(q,Z,$,X,H,Q){let z=(V)=>Eq(q,Z,`lume/air/inject/${X?"ground":"bare"}/${V?"far-sun":"near-sun"}/${o()}`,$,()=>Tq({ground:X,farSun:V}),"airInject",Q,V?(qZ??=$c0I(1)):void 0),j=H?z(!0):null;return j===null||j.failed?z(!1):j})',()=>"(function(){if(this.standDown(),this.grid!==null)this.destroyGrid(this.grid);this.grid=null;for(let q of this.retired)this.destroyGrid(q);this.retired.length=0,this.window.destroy(),this.levelBuffer.destroy(),this.groundStandIn?.uniform.destroy(),this.groundStandIn?.directory.destroy()})",()=>"(function(q,Z,$,X,H,Q){let z=zq(q[0]+Z[0]-this.prevEye[0]-this.prevOrigin[0],q[1]+Z[1]-this.prevEye[1]-this.prevOrigin[1],q[2]+Z[2]-this.prevEye[2]-this.prevOrigin[2]),j=0;if(this.havePrev&&z<tq&&!X)j=z<0.0001&&$?0.95:0.9;if(this.handShare>0)j=a(j,this.handShare,s(this.handStartMs,H,Q)),this.handShare*=j;return j})",()=>'(function(q,Z,$){let X=this.pipelines,H=X.getBindGroupLayout(Cq,"lume frame"),Q=this.twinLayoutOf(o()),z=X.getBindGroupLayout(Zq,"lume air inject"),j=ZZ(this.device,X,[H,Q.layout,z],q,Z,$),V=Eq(this.device,X,"lume/air/integrate",[X.getBindGroupLayout($q,"lume air integrate")],()=>eq,"airIntegrate",$);if(j.pipeline===null||V.pipeline===null)return this.stood;if(this.stood?.inject!==j.pipeline)this.stood={inject:j.pipeline,integrate:V.pipeline,twin:Q};return this.stood})',()=>'(function(q){let Z=this.twinLayouts.get(q);if(Z!==void 0)return Z;let $=Pq(()=>[!1,!0].flatMap((z)=>[!1,!0].map((j)=>Tq({ground:j,farSun:z}))),function(){return}),X=bq($),Q={layout:this.pipelines.getBindGroupLayout(X.map((z)=>({...z,visibility:4})),"lume pass-lights air"),bindings:new Set(X.map((z)=>z.binding))};return this.twinLayouts.set(q,Q),Q})',()=>'(function(q,Z,$,X){let H=U(),Q=X!==null&&H!==null?X:this.noGround(H?.uniformBytes??0),z=X?.sun??yq(this.device).lightNoFarSun;return this.pipelines.getBindGroup({label:"lume air inject",layout:this.pipelines.getBindGroupLayout(Zq,"lume air inject"),entries:[{binding:0,resource:{buffer:this.window}},{binding:1,resource:Z},{binding:2,resource:q.scatterViews[$]},{binding:G,resource:{buffer:Q.uniform}},{binding:m,resource:{buffer:Q.directory}},{binding:d,resource:{buffer:z.words}},{binding:_,resource:z.field},{binding:9,resource:this.clamp}]})})',()=>'(function(q,Z){return this.pipelines.getBindGroup({label:"lume air integrate",layout:this.pipelines.getBindGroupLayout($q,"lume air integrate"),entries:[{binding:0,resource:{buffer:this.window}},{binding:1,resource:q.scatterViews[Z]},{binding:2,resource:q.binding.view},{binding:L,resource:{buffer:this.levelBuffer}}]})})']},function(){return[()=>'(function(q){let Z=Math.max(q,Jq());if(this.groundStandIn===null||this.groundStandIn.uniform.size<Z)this.groundStandIn?.uniform.destroy(),this.groundStandIn?.directory.destroy(),this.groundStandIn={uniform:this.device.createBuffer({label:"lume air no ground words",size:Z,usage:Vq()}),directory:this.device.createBuffer({label:"lume air no ground directory",size:16,usage:128})};return this.groundStandIn})']}],$c0XU=[0,10];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,11,2351611134345216);var $c0I=$c0C.i;function $c0P(f,h,k){h[k]=f;return f}
;const{$kG:U,AQIz:i,Brz:cq,CCi:Kq,Cdy:R,Crs:fq,EBB:l,FAd:o,FIK:Fq,GAb:Uq,GJk:n,Ggy:Yq,I0b:Nq,IK6:Wq,Jai:Xq,KwY:jq,Pug:_,QVw:Mq,QbK:Vq,UcB:Bq,X_S:Jq,_FD:E,_S$:vq,_rr:c,b2q:d,clN:mq,dBL:Oq,eaX:Gq,fRd:zq,h1y:Qq,i2C:F,if6:pq,jQT:bq,jqS:Hq,kpw:y,l8K:yq,mq1:Cq,mz2:h,pSj:Dq,rFb:A,sD6:I,sUb:T,tLM:Lq,tqX:Pq,ts0:kq,uaU:S,vx_:xq,wRZ:B,whK:P,xzm:wq}=$Lr;
;;class N{constructor(){this.from=0;this.to=0;this.startMs=NaN;}value(q){if(Number.isNaN(this.startMs))return this.to;let Z=Math.min(1,Math.max(0,(q-this.startMs)/w));return this.from+(this.to-this.from)*Z}get target(){return this.to===1?1:0}moving(q){return this.value(q)!==this.to}walk(q,Z,$){if(this.to===q&&(Number.isNaN(this.startMs)||!Z))return;let X=this.value($);if(this.to=q,Z||X===q){this.from=q,this.startMs=NaN;return}this.from=X,this.startMs=$}cut(){this.from=0,this.to=0,this.startMs=NaN}}function s(q,Z,$){return $?0:Math.max(0,1-(Z-q)/w)}function a(q,Z,$){if(Z<=0)return q;return Math.max(0,Math.min(q,$/Z))}var G=5,m=6,C=8,L=3,Sq=0.25,lq=`@group(2) @binding(0) var<uniform> airGrid: AirWindow;
@group(2) @binding(1) var airHistory: texture_2d_array<f32>;
@group(2) @binding(2) var airOut: texture_storage_2d_array<rgba16float, write>;
@group(2) @binding(9) var airClamp: sampler;
fn air_history(p: vec3<f32>) -> vec4<f32> {
  let top = f32(textureNumLayers(airHistory) - 1u);
  let at = clamp(p.z * (top + 1.0) - 0.5, 0.0, top);
  let near = floor(at);
  return mix(textureSampleLevel(airHistory, airClamp, p.xy, i32(near), 0.0), textureSampleLevel(airHistory, airClamp, p.xy, i32(min(near + 1.0, top)), 0.0), at - near);
}`,hq=`const AIR_PI: f32 = 3.14159265;
const AIR_WOOD_APART_M: f32 = ${t.toFixed(1)};
fn air_hg(c: f32, g: f32) -> f32 {
  let d = max(1.0 + g * g - 2.0 * g * c, 1e-4);
  return (1.0 - g * g) / (4.0 * AIR_PI * d * sqrt(d));
}
fn air_phase(c: f32) -> f32 {
  return mix(air_hg(c, airGrid.phase.y), air_hg(c, airGrid.phase.x), airGrid.phase.z);
}
fn air_tOfW(w: f32) -> f32 {
  return airGrid.depth.x * (exp(w * airGrid.depth.z) - 1.0);
}
fn air_wOfT(t: f32) -> f32 {
  return log(t / airGrid.depth.x + 1.0) / airGrid.depth.z;
}
fn air_ray(uv: vec2<f32>) -> vec3<f32> {
  let p = airGrid.invViewProj * vec4<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, ${n}, 1.0);
  return normalize(p.xyz / p.w - airGrid.eye.xyz);
}
fn air_past(P: vec3<f32>) -> vec4<f32> {
  let q = P + airGrid.shift.xyz;
  let clip = airGrid.prevViewProj * vec4<f32>(q, 1.0);
  if (clip.w <= 1e-4) {
    return vec4<f32>(0.0);
  }
  let uv = clip.xy / clip.w * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
  let w = air_wOfT(length(q - airGrid.prevEye.xyz));
  let inside = uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0 && w < 1.0;
  return vec4<f32>(uv, w, select(0.0, 1.0, inside));
}`,Aq=`struct AirGround {
  ground: f32,
  level: f32,
  found: f32,
}
fn air_landTopAt(k0: u32, x: f32, z: f32) -> vec2<f32> {
  let count = shells.head.x;
  for (var k = k0; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(x / b)) + row.anchor.x;
    let bz = i32(floor(z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return vec2<f32>(f32((i32(e.w << 16u)) >> 16u) * row.metres.x + row.metres.x, 1.0);
    }
  }
  return vec2<f32>(0.0);
}
fn air_levelShell() -> u32 {
  let count = shells.head.x;
  var k = 0u;
  loop {
    if (k + 1u >= count || shells.rows[k].metres.x * 8.0 >= 48.0) {
      break;
    }
    k = k + 1u;
  }
  return k;
}
fn air_ground(q: vec3<f32>) -> AirGround {
  var out = AirGround(0.0, 0.0, 0.0);
  if (shells.head.x == 0u) {
    return out;
  }
  let here = air_landTopAt(0u, q.x, q.z);
  if (here.y < 0.5) {
    return out;
  }
  out.ground = here.x;
  out.level = here.x;
  out.found = 1.0;
  let k = air_levelShell();
  let b = shells.rows[k].metres.x * 8.0;
  let u = q.xz / b - vec2<f32>(0.5);
  let i = floor(u);
  let f = u - i;
  var sum = 0.0;
  var weight = 0.0;
  for (var c = 0u; c < 4u; c = c + 1u) {
    let o = vec2<f32>(f32(c & 1u), f32(c >> 1u));
    let top = air_landTopAt(k, (i.x + o.x + 0.5) * b, (i.y + o.y + 0.5) * b);
    let w = mix(1.0 - f.x, f.x, o.x) * mix(1.0 - f.y, f.y, o.y);
    if (top.y > 0.5) {
      sum = sum + top.x * w;
      weight = weight + w;
    }
  }
  if (weight > 1e-3) {
    out.level = sum / weight;
  }
  return out;
}
fn air_shellFrame(P: vec3<f32>) -> vec3<f32> {
  return P - frame.cameraPosition + shells.eye.xyz;
}`,uq=`struct AirGround {
  ground: f32,
  level: f32,
  found: f32,
}
fn air_ground(q: vec3<f32>) -> AirGround {
  return AirGround(0.0, 0.0, 0.0);
}
fn air_shellFrame(P: vec3<f32>) -> vec3<f32> {
  return P + frame.renderOrigin;
}`,Iq=`
fn air_sunAt(P: vec3<f32>) -> f32 {
  let c = lighting_pickCascadeBounds(P, 0.0);
  if (c < 0) {
    return air_landSun(P);
  }
  let coord = passLights.cascadeMatrices[c] * vec4<f32>(P, 1.0);
  return mix(lume_shadowCompare(sunCascadeMap, shadowSampler, coord.xy, c, coord.z + passLights.cascadeBias[c]), 1.0, lighting_sunEdgeFade(coord.xy, lighting_viewDepth(P)));
}
fn air_sunNear(rd: vec3<f32>, t0: f32, t1: f32) -> f32 {
  if (passLights.shadowsEnabled < 0.5 || passLights.cascadeCount == 0u || passLights.clusterDepth.w <= 0.0) {
    return air_landSun(airGrid.eye.xyz + rd * mix(t0, t1, 0.5));
  }
  var lit = 0.0;
  for (var k = 0; k < 4; k = k + 1) {
    lit = lit + air_sunAt(airGrid.eye.xyz + rd * mix(t0, t1, (f32(k) + 0.5) * 0.25));
  }
  return lit * 0.25;
}
fn air_wood(P: vec3<f32>) -> f32 {
  if (passLights.shadowsEnabled < 0.5 || passLights.cascadeCount == 0u || passLights.clusterDepth.w <= 0.0) {
    return 0.0;
  }
  let w = i32(passLights.cascadeCount) - 1;
  let wide = passLights.cascadeMatrices[w] * vec4<f32>(P, 1.0);
  if (any(wide.xy < vec2<f32>(0.0)) || any(wide.xy > vec2<f32>(1.0))) {
    return 0.0;
  }
  let reference = wide.z + passLights.cascadeBias[w];
  let dims = vec2<f32>(textureDimensions(sunCascadeMap));
  let at = wide.xy * dims;
  let apart = clamp(AIR_WOOD_APART_M / max(passLights.cascadeTexelWorld[w], 1e-3), 1.0, 512.0);
  let up = max(passLights.sunDirection.y, 0.05);
  var cover = 0.0;
  for (var i = 0; i < 9; i = i + 1) {
    let o = vec2<f32>(f32(i % 3) - 1.0, f32(i / 3) - 1.0);
    let texel = vec2<i32>(clamp(at + o * apart, vec2<f32>(0.0), dims - vec2<f32>(1.0)));
    let reach = (reference - textureLoad(sunCascadeMap, texel, w, 0).x) * passLights.cascadeDepthRange[w];
    cover = cover + select(0.0, 1.0 / 9.0, reach * up > 2.0 && reach * up < 30.0 && reach < 80.0);
  }
  return smoothstep(0.35, 0.75, cover);
}
fn air_medium(P: vec3<f32>, h: f32, gr: AirGround, wood: f32) -> vec3<f32> {
  let far = distance(P.xz, airGrid.eye.xz);
  var e = airGrid.haze.x * (1.0 - smoothstep(0.3 * airGrid.haze.w, airGrid.haze.w, far)) * exp(clamp(-(h - airGrid.haze.z) / airGrid.haze.y, -30.0, 6.0));
  var motes = 0.0;
  if (gr.found > 0.5) {
    if (h < gr.ground - 1.5) {
      return vec3<f32>(0.0);
    }
    let fade = 1.0 - smoothstep(0.3 * airGrid.ground.z, airGrid.ground.z, far);
    let rise = max(h - gr.ground, 0.0);
    e = e + airGrid.ground.x * fade * exp(-rise / airGrid.ground.y);
    motes = airGrid.ground.w * wood * fade * exp(-rise / (airGrid.ground.y * 1.8));
    let over = h - gr.level;
    e = e + airGrid.mist.x * (1.0 - smoothstep(airGrid.mist.y - airGrid.mist.z, airGrid.mist.y + airGrid.mist.z, over)) * (1.0 - smoothstep(0.3 * airGrid.mist.w, airGrid.mist.w, far));
  }
  return vec3<f32>(e + motes * airGrid.motes.z, e * airGrid.phase.w, motes * airGrid.phase.w);
}

@compute @workgroup_size(${C}, ${C}, 1)
fn airInject(@builtin(global_invocation_id) g: vec3<u32>) {
  let G = airGrid.grid.xyz;
  if (g.x >= G.x || g.y >= G.y || g.z >= G.z) {
    return;
  }
  let rd = air_ray((vec2<f32>(g.xy) + vec2<f32>(0.5)) / vec2<f32>(G.xy));
  let t0 = air_tOfW(f32(g.z) / f32(G.z));
  let t1 = air_tOfW(f32(g.z + 1u) / f32(G.z));
  let P = airGrid.eye.xyz + rd * air_tOfW((f32(g.z) + 0.5) / f32(G.z));
  let share = u32(max(airGrid.shift.w, 1.0));
  let history = airGrid.prevEye.w;
  if (share > 1u && history > 0.0 && ((g.x + g.y * 3u + g.z * 5u + airGrid.grid.w) % share) != 0u) {
    let past = air_past(P);
    if (past.w > 0.5) {
      textureStore(airOut, g.xy, g.z, air_history(past.xyz));
      return;
    }
  }
  let q = air_shellFrame(P);
  let gr = air_ground(q);
  let wood = air_wood(P);
  let medium = air_medium(P, q.y, gr, wood);
  var L = vec3<f32>(0.0);
  if (medium.y + medium.z > 1e-7) {
    let S = passLights.sunDirection;
    let sun = passLights.sunColor * passLights.sunIntensity;
    var vis = lighting_cloudShadow(P + frame.renderOrigin);
    if (airGrid.flags.z > 0.5) {
      vis = vis * air_farSun(P, lighting_viewDepth(P));
    }
    if (S.y > -0.05) {
      if (vis > 0.0) {
        vis = vis * air_sunNear(rd, t0, t1);
      }
      let mu = dot(S, rd);
      L = L + sun * (vis * (air_phase(mu) * medium.y + air_hg(mu, airGrid.motes.x) * airGrid.motes.y * medium.z) * airGrid.gains.z);
      L = L + sun * (airGrid.gains.x * (0.35 + 0.65 * vis) / (4.0 * AIR_PI) * medium.y);
    }
    let skyMean = (lighting_indirectIrradiance(vec3<f32>(0.0, 1.0, 0.0)) + lighting_indirectIrradiance(vec3<f32>(0.0, -1.0, 0.0))) / (2.0 * AIR_PI);
    L = L + skyMean * (mix(1.0, 0.15, wood) * airGrid.gains.y * medium.y);
    L = L + lighting_pointLightsAt(P, 0.0) * (airGrid.gains.w / (4.0 * AIR_PI) * (medium.y + medium.z));
  }
  var cur = vec4<f32>(min(L, vec3<f32>(6.0e4)), min(medium.x, 6.0e4));
  if (history > 0.0) {
    let past = air_past(P);
    if (past.w > 0.5) {
      let keep = max(1.0 - (1.0 - history) * f32(share), 0.0);
      cur = mix(air_history(past.xyz), cur, 1.0 - keep);
    }
  }
  textureStore(airOut, g.xy, g.z, cur);
}`,Rq=`fn air_farSun(P: vec3<f32>, viewDepth: f32) -> f32 {
  return lume_farSun(P, viewDepth);
}
fn air_landSun(P: vec3<f32>) -> f32 {
  let count = u32(farSun.head.x);
  if (count == 0u) {
    return 1.0;
  }
  let p = P - farSun.origin.xyz;
  var lit = 0.0;
  var left = 1.0;
  for (var k = 0u; k < count; k = k + 1u) {
    let level = farSun.levels[k];
    if (level.lattice.w <= 0.0) {
      continue;
    }
    let at = p.xz / level.lattice.x;
    let off = max(abs(at - level.centre.xy), abs(at - level.centre.zw));
    let reach = level.lattice.w - max(off.x, off.y);
    if (reach <= 0.0) {
      continue;
    }
    let share = left * clamp(reach / ${i}.0, 0.0, 1.0);
    lit = lit + share * lume_farSunLit(k, p).x;
    left = left - share;
    if (left <= 0.0) {
      break;
    }
  }
  return lit + left;
}`,dq=`fn air_farSun(P: vec3<f32>, viewDepth: f32) -> f32 {
  return 1.0;
}
fn air_landSun(P: vec3<f32>) -> f32 {
  return 1.0;
}`;function r(q){return[lq,hq,q.ground?Aq:uq,q.farSun?Rq:dq,Iq].join(`
`)}var e=`@group(0) @binding(0) var<uniform> airGrid: AirWindow;
@group(0) @binding(1) var airIn: texture_2d_array<f32>;
@group(0) @binding(2) var airIntegrated: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(${L}) var<uniform> airLevel: vec4<f32>;
@compute @workgroup_size(${C}, ${C}, 1)
fn airIntegrate(@builtin(global_invocation_id) g: vec3<u32>) {
  let G = airGrid.grid.xyz;
  if (g.x >= G.x || g.y >= G.y) {
    return;
  }
  let level = clamp(airLevel.x, 0.0, 1.0);
  var acc = vec3<f32>(0.0);
  var through = 1.0;
  var t0 = 0.0;
  for (var z = 0u; z < G.z; z = z + 1u) {
    let t1 = airGrid.depth.x * (exp(f32(z + 1u) / f32(G.z) * airGrid.depth.z) - 1.0);
    let dt = t1 - t0;
    t0 = t1;
    let s = textureLoad(airIn, g.xy, z, 0);
    let e = max(s.a, 0.0);
    let x = e * dt;
    let slice = exp(-x);
    let len = select((1.0 - slice) / max(e, 1e-12), dt * (1.0 - 0.5 * x), x < 1e-3);
    acc = acc + through * max(s.rgb, vec3<f32>(0.0)) * len;
    through = through * slice;
    textureStore(airIntegrated, g.xy, z, vec4<f32>(min(acc, vec3<f32>(6.0e4)), min(1.0 - through, ${Sq})) * level);
  }
}`;var f=[{name:"low-",across:64,slices:40},{name:"low",across:96,slices:48},{name:"low+",across:128,slices:56},{name:"mid",across:160,slices:64},{name:"mid+",across:192,slices:80},{name:"high",across:224,slices:96}],O=1,_q=300,oq=2,p=3600,gq=12,sq={low:0,medium:1,high:1,ultra:3},aq={low:1,medium:2,high:4,ultra:5},qq=1;var nq=48,iq=30,tq=40;function rq(a,b){return (rq=$c0C(0)).apply(this,arguments)}var M={haze:0.00002,ground:0.00005,wood:0.003,mist:0.002,hazeReach:1500,groundReach:700,mistReach:600,phase:{forward:0.93,back:-0.2,forwardShare:0.75,albedo:0.92},motes:{g:0.6,gain:4,take:0.3}},Zq=[B(0,4,"uniform"),c(1,4,"float","2d-array"),R(2,4,"rgba16float","2d-array"),{binding:G,visibility:4,buffer:jq},B(m,4,"read-only-storage"),B(d,4,"uniform"),c(_,4,"uint","2d-array"),Hq(9,4,"filtering")],$q=[B(0,4,"uniform"),c(1,4,"float","2d-array"),R(2,4,"rgba16float","2d-array"),B(L,4,"uniform")];function Tq(q){let Z=q.ground?U():null;return Xq([Yq,mq(1),Lq(),Gq,Oq,cq,q.farSun?Wq(2):"",Z===null?"":Z.wgsl(2,G,m),r({ground:Z!==null,farSun:q.farSun})],`
`)}var eq=`${Kq}
${e}`,qZ;function Eq(a,b,c,d,e,f,g,h){return (Eq=$c0C(2)).call(this,a,b,c,d,e,f,g,h)}function ZZ(a,b,c,d,e,f){return (ZZ=$c0C(3)).call(this,a,b,c,d,e,f)}class $Z{constructor(q,Z){this.device=void 0;this.pipelines=void 0;this.window=void 0;this.words=new Float32Array(y/4);this.uwords=new Uint32Array(this.words.buffer);this.grid=null;this.retired=[];this.clamp=void 0;this.groundStandIn=null;this.twins=new WeakMap;this.twinLayouts=new Map;this.stood=null;this.served=null;this.published=null;this.tier=-2;this.klass="medium";this.lastMs=0;this.top=0;this.classTop=0;this.cappedAt=0;this.lastRead=0;this.share=1;this.plain=!1;this.plainAt=-1;this.overFloor=0;this.started=-1;this.samples=[];this.stableFrames=0;this.viewProj=new Float32Array(16);this.invViewProj=new Float32Array(16);this.prevViewProj=new Float32Array(16);this.prevEye=new Float64Array(3);this.prevOrigin=new Float64Array(3);this.havePrev=!1;this.ground=null;this.frameIndex=0;this.calls=0;this.stillFrames=0;this.sunElevation=NaN;this.rising=0;this.level=new N;this.levelBuffer=void 0;this.levelWords=new Float32Array(4);this.levelWritten=NaN;this.handView=null;this.handStartMs=0;this.handShare=0;this.airWords={haze:0,ground:0,wood:0,mist:0};this.put=(q,Z,$,X,H)=>{let Q=F[q]/4;this.words[Q]=Z,this.words[Q+1]=$,this.words[Q+2]=X,this.words[Q+3]=H};this.device=q;this.pipelines=Z;this.window=q.createBuffer({label:"lume air window",size:y,usage:64|8}),this.levelBuffer=q.createBuffer({label:"lume air level",size:16,usage:64|8}),this.clamp=xq(q)}standDown(){this.unpublish(),this.level.cut(),this.handView=null,this.handShare=0,l("air-arrival",0)}unpublish(){if(this.served!==null)A(this.served,null);this.served=null,this.published=null,this.havePrev=!1}declare(q,Z,$,X,H){if(this.calls+=1,this.served!==null&&this.served!==Z)this.unpublish();if(this.tier===-2)this.start(wq().tier);this.step(q),this.reap();let Q=Bq(),z=fq(Z),j=Z.pictureUnseen===!0||Fq(),V=this.plain&&this.published!==null&&this.level.value(Q)>0&&!j;if(this.plain&&!V||z===null||$.camera.isOrthographic)return this.standDown(),this.plain?P.budget:P.waiting;let K=T(z)===void 0?null:this.pipelinesFor(U()!==null,h(),Z.pictureUnseen!==!0),x=K===null?null:this.twinOf(z,K.twin);if(x===null||K===null)return this.standDown(),P.building;let J=this.ensureGrid(H.width/Math.max(H.height,1),Q);this.level.walk(this.plain?0:1,j,Q);let Y=$.camera.position,v=E($),D=pq(Z)==="";if(D&&this.havePrev&&J.binding===this.published&&!this.level.moving(Q)&&this.handShare<=0){if(this.stillFrames+=1,this.stillFrames>nq)return I(P.still,this.tier,this.lastMs>0)}else this.stillFrames=0;this.writeLevel(this.level.value(Q));let k=this.handView??J.scatterViews[J.current];if(this.handView=null,this.ground=X,J.current=this.run(q,Z,$,J,K,x,k,this.historyWeight(Y,v,D,$.motionHistoryValid===!1,Q,j),"air"),l("air-arrival",this.level.moving(Q)||this.handShare>0?1:0),this.prevViewProj.set(this.viewProj),this.prevEye.set(Y),this.prevOrigin.set(v),this.havePrev=!0,this.frameIndex+=1,this.started<0)this.started=this.calls;if(this.published!==J.binding)A(Z,J.binding),this.published=J.binding;return this.served=Z,I(P.ran,this.tier,this.lastMs>0)}declareForPicture(q,Z){let{grid:$,stood:X}=this;if($===null||X===null||this.served!==q||Z.passBindGroup===null||Z.camera.isOrthographic)return;let H=this.twinOf(Z.passBindGroup,X.twin);if(H===null)return;this.run(Z.graph,q,Z,$,X,H,$.scatterViews[$.current],0,void 0),this.stillFrames=0}run(q,Z,$,X,H,Q,z,j,V){vq($.camera.projection,$.camera.view,this.viewProj),Dq(this.viewProj,this.invViewProj),this.writeWindow(X,Z,$,j);let K=X.current===0?1:0,x=Math.ceil(X.across/C),J=Math.ceil(X.down/C);return q.addCompute("air",{dispatches:[{pipeline:H.inject,bindGroups:[$.frameBindGroup,Q,this.injectGroup(X,z,K,this.ground)],dispatch:[x,J,X.slices],debugLabel:"air inject"},{pipeline:H.integrate,bindGroups:[this.integrateGroup(X,K)],dispatch:[x,J,1],debugLabel:"air integrate"}],measured:V,paced:V===void 0?void 0:"read"}),K}line(q){if(q>=100){let Z=f[Math.min(f.length-1,q-100>>1)],$=this.grid,X=$===null?`${Z.across} across, ${Z.slices} deep`:`${$.across}x${$.down}x${$.slices}`,H=this.share>1?", half its froxels a frame":"",Q=this.lastMs>0?`its pass measured ${this.lastMs.toFixed(2)} ms a frame`:"its cost not measured yet";return`ON: grid ${Z.name} ${X}${H} (class ${this.klass}), ${Q} (its budget ${O} ms)`}if(q===P.building)return"OFF for now: its passes are building";if(q===P.waiting)return"OFF for now: the scene's lighting has no pass group yet";if(q===P.budget)return`OFF: over its budget, its smallest grid at half its froxels measured ${this.lastMs.toFixed(2)} ms a frame (its budget ${O} ms); tried again in ${Math.round(p/60)} s`;return"OFF"}dispose(){return $c0C(4).call(this)}start(q){this.klass=q,this.tier=sq[q],this.top=aq[q],this.classTop=this.top}step(q){if(this.stableFrames+=1,this.plain){{if((ba=ca.call(this))!==aa)return ba}return}if(this.started<0||this.calls-this.started<_q)return;if(this.top<this.classTop&&this.calls-this.cappedAt>p)this.top+=1,this.cappedAt=this.calls;let Z=q.lastGpuReadRevision;if(Z===this.lastRead)return;this.lastRead=Z;let $=q.lastGpuMeasuredMs.get("air");if($===void 0||!($>0)||this.stableFrames<8)return;{if((ba=ea.call(this,$))!==aa)return ba}}writeWindow(q,Z,$,X){let H=E($),Q=this.words,z=this.uwords,j=this.put;Q.set(this.viewProj,F.viewProj/4),Q.set(this.invViewProj,F.invViewProj/4),Q.set(this.havePrev?this.prevViewProj:this.viewProj,F.prevViewProj/4);let V=$.camera.position;j("eye",V[0],V[1],V[2],$.timeSeconds),j("prevEye",this.prevEye[0],this.prevEye[1],this.prevEye[2],X),j("shift",H[0]-this.prevOrigin[0],H[1]-this.prevOrigin[1],H[2]-this.prevOrigin[2],this.share);let K=F.grid/4;z[K]=q.across,z[K+1]=q.down,z[K+2]=q.slices,z[K+3]=this.frameIndex>>>0,j("depth",qq,u,Math.log(u/qq+1),1);let x=Nq(Z)?.sun??null,J=x?.sky===!0?Z.peekStore(S):null,Y=J?.physicalActive===!0?J.values.sunDirection[1]:null,v=Y===null?1:1-Uq(Y)[Mq],D=Y??-1;if(Y===null&&x!==null)D=-x.direction[1];let k=Math.asin(Math.min(1,Math.max(-1,D)));if(Qq(this.sunElevation)&&Math.abs(k-this.sunElevation)>0.000001)this.rising=k>this.sunElevation?1:-1;this.sunElevation=k;let W=rq(k,this.rising,this.airWords),b=M;j("haze",W.haze,250,0,b.hazeReach),j("ground",W.ground,8,b.groundReach,W.wood),j("mist",W.mist,2,1.2,b.mistReach);let g=Z.peekStore(S)?.script;j("phase",g&&!g.readsAtmosphere?1:b.phase.forward,b.phase.back,b.phase.forwardShare,b.phase.albedo),j("gains",0.06*v,1,v,1),j("motes",b.motes.g,b.motes.gain,b.motes.take,0),j("flags",0,U()!==null?1:0,h()?1:0,0),this.device.queue.writeBuffer(this.window,0,Q)}ensureGrid(q,Z){let $=f[this.tier],X=$.across,H=Math.max(8,Math.round(X/Math.max(q,0.25))),Q=this.grid;if(Q!==null&&Q.tier===this.tier&&Q.across===X&&Q.down===H)return Q;return fa.call(this,Q,Z,X,H,$);}historyWeight(a,b,c,d,e,f){return $c0P($c0C(5),$Z.prototype,"historyWeight").call(this,a,b,c,d,e,f)}writeLevel(q){if(q===this.levelWritten)return;ga.call(this,q);}reap(){for(let q=this.retired.length-1;q>=0;q-=1){{ba=ia.call(this,q);if(ba===ha)continue;}}}destroyGrid(q){q.scatter[0].destroy(),q.scatter[1].destroy(),q.integrated.destroy()}pipelinesFor(a,b,c){return $c0P($c0C(6),$Z.prototype,"pipelinesFor").call(this,a,b,c)}twinLayoutOf(a){return $c0P($c0C(7),$Z.prototype,"twinLayoutOf").call(this,a)}twinOf(q,Z){let $=this.twins.get(q),X=$?.get(Z.layout);if(X!==void 0)return X;let H=T(q);if(H===void 0)return null;let Q=this.device.createBindGroup({label:"lume pass-lights air",layout:Z.layout,entries:H.filter((z)=>Z.bindings.has(z.binding))});if($===void 0)this.twins.set(q,$=new Map);return $.set(Z.layout,Q),Q}injectGroup(a,b,c,d){return $c0P($c0C(8),$Z.prototype,"injectGroup").call(this,a,b,c,d)}integrateGroup(a,b){return $c0P($c0C(9),$Z.prototype,"integrateGroup").call(this,a,b)}noGround(a){return $c0P($c0C(10),$Z.prototype,"noGround").call(this,a)}};

function ca(){if(this.calls-this.plainAt<p)return;this.plain=!1,this.tier=0,this.share=2,this.lastMs=0,this.overFloor=0,this.samples.length=0,this.stableFrames=0,this.started=-1;
return aa}
function ea($){if(this.samples.push($),this.samples.length<gq)return;let X=this.samples.slice().sort((Q,z)=>Q-z),H=X[X.length>>1];if(this.lastMs=H,this.samples.length=0,this.stableFrames=0,H>O*1.25){if(this.top=Math.max(0,Math.min(this.top,this.tier-1)),this.cappedAt=this.calls,this.tier>0)this.tier-=1;else if(this.share===1)this.share=2;else if(++this.overFloor>=oq)this.plain=!0,this.plainAt=this.calls}else if(this.overFloor=0,H<O*0.45){if(this.share===2)this.share=1;else if(this.tier<this.top)this.tier+=1}
return aa}
function fa(Q,Z,X,H,$){if(Q!==null){if(Q.retiredAt=this.calls,this.retired.push(Q),this.havePrev)this.handView=Q.scatterViews[Q.current],this.handStartMs=Z,this.handShare=1}let z={width:X,height:H,depthOrArrayLayers:$.slices},j=8|4,V=this.device.createTexture({label:"lume air scatter a",dimension:"2d",size:z,format:"rgba16float",usage:j}),K=this.device.createTexture({label:"lume air scatter b",dimension:"2d",size:z,format:"rgba16float",usage:j}),x=this.device.createTexture({label:"lume air",dimension:"2d",size:z,format:"rgba16float",usage:j}),J={tier:this.tier,across:X,down:H,slices:$.slices,scatter:[V,K],scatterViews:[V.createView({dimension:"2d-array"}),K.createView({dimension:"2d-array"})],integrated:x,binding:{view:x.createView({dimension:"2d-array"}),window:this.window,sampler:this.clamp,server:this},current:0,retiredAt:-1};return this.grid=J,this.samples.length=0,this.stableFrames=0,J
}
function ga(q){this.levelWritten=q,this.levelWords[0]=q,this.device.queue.writeBuffer(this.levelBuffer,0,this.levelWords)
}
function ia(q){let Z=this.retired[q];if(Z.binding===this.published||this.calls-Z.retiredAt<iq){return ha}this.destroyGrid(Z),this.retired.splice(q,1)
}
function aa(){}var ba;function ha(){}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{pmU as w}from"./56ed3918-9d676508c812580b.mjs";import{M2B as u,yhq as t}from"./8f74fd37deb7ded5.mjs";export{$Z as AirVolume,M as AIR_ART,Tq as airInjectModuleWgsl,ZZ as airInjectPipeline,aq as AIR_TOP_TIER,eq as AIR_INTEGRATE_MODULE_WGSL,f as AIR_TIERS,qq as AIR_NEAR_M,rq as airOfSun,sq as AIR_START_TIER,u as AIR_FAR_M};
