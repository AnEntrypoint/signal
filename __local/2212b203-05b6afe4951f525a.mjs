import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(j){if(j>this.tileCapacity||this.marks===null||this.list===null||this.args===null)this.marks?.release(),this.list?.release(),this.args?.release(),this.tileCapacity=j,this.marks=M(this.device,{label:"lume ink tile marks",size:j*4,usage:128},C),this.list=M(this.device,{label:"lume ink tile list",size:j*4,usage:128},C),this.args=M(this.device,{label:"lume ink line args",size:16,usage:128|256},C);return{marks:this.marks.resource,list:this.list.resource,args:this.args.resource}})',()=>'(function(j){return{label:`post/ink-tiles/${j}`,layout:this.device.createPipelineLayout({label:"post/ink-tiles",bindGroupLayouts:[this.pipelines.getBindGroupLayout(E,"lume ink tiles")]}),compute:{module:this.pipelines.shaderModule(n(this.device)?Dj:Hj,"post/ink-tiles"),entryPoint:j}}})']}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,4028258989375488);function $c0P(f,h,k){h[k]=f;return f}
;const{$T1:B,A2h:Jj,AyU:b,JZG:W,KdH:_,Kwj:Qj,MzO:Zj,SaH:zj,Snu:T,Vp4:jj,Weq:e,ZZw:M,ZcG:r,ZeJ:n,ZtX:X,_rr:Y,cBV:C,dSE:p,iFP:t,jvv:K,kQP:i,l8K:Yj,lgK:$j,ndt:s,q43:F,s14:x,s7R:o,trm:w,wRZ:Z,z2c:a,zw3:qj}=$Lr;
var Xj=Math.floor(W/w),O=4,G=4,A="rg32uint",g=0.001,Vj=Math.log2(1+g),V=8;function d(j){return Math.max(1,Math.min(Xj,Math.ceil(Jj()*j/zj)))}var vj=`struct InkTiles {
  reach: f32,
  across: u32,
  down: u32,
  halo: u32,
  eye: vec4<f32>,
}`,E=[Y(0,4,"uint"),Z(1,4,"storage"),Z(2,4,"storage"),Z(3,4,"storage"),Z(4,4,"uniform")],I=[Y(0,1|2,"uint"),Y(2,2,"unfilterable-float"),Z(3,1|2,"uniform"),Z(4,1,"read-only-storage"),Z(5,1,"read-only-storage")],f=[Y(0,1|2,"uint"),Y(1,2,"unfilterable-float"),Y(2,2,"unfilterable-float"),Z(3,1|2,"uniform"),Z(4,1,"read-only-storage"),Z(5,1,"read-only-storage"),Y(6,2,"uint"),Y(7,2,"unfilterable-float"),Y(8,2,"unfilterable-float")],Gj=["var<workgroup> inkTileEdge: atomic<u32>;",`
  if (li == 0u) { atomicStore(&inkTileEdge, 0u); }
  workgroupBarrier();
  if (ink_edge(gid, li, wid)) { atomicOr(&inkTileEdge, 1u); }
  workgroupBarrier();
  if (li == 0u) { inkTileMarks[wid.y * inkTiles.across + wid.x] = atomicLoad(&inkTileEdge); }`],bj=[`var<workgroup> inkTileEdge: array<u32, ${V*V}>;`,`
  inkTileEdge[li] = select(0u, 1u, ink_edge(gid, li, wid));
${qj((j)=>`inkTileEdge[${j}]`,"li",V*V,(j,q)=>`${j} | ${q}`)}
  if (li == 0u) { inkTileMarks[wid.y * inkTiles.across + wid.x] = inkTileEdge[0]; }`],Uj=([j,q])=>`${vj}
@group(0) @binding(0) var inkWord: texture_2d<u32>;
@group(0) @binding(1) var<storage, read_write> inkTileMarks: array<u32>;
@group(0) @binding(2) var<storage, read_write> inkTileArgs: array<atomic<u32>, 4>;
@group(0) @binding(3) var<storage, read_write> inkTileList: array<u32>;
@group(0) @binding(4) var<uniform> inkTiles: InkTiles;

${j}

fn ink_edge(gid: vec3<u32>, li: u32, wid: vec3<u32>) -> bool {
  if (li == 0u && wid.x == 0u && wid.y == 0u) {
    atomicStore(&inkTileArgs[0], 6u);
    atomicStore(&inkTileArgs[1], 0u);
    atomicStore(&inkTileArgs[2], 0u);
    atomicStore(&inkTileArgs[3], 0u);
  }
  let size = vec2<i32>(textureDimensions(inkWord));
  let p = vec2<i32>(gid.xy);
  if (p.x >= size.x || p.y >= size.y) { return false; }
  let here = textureLoad(inkWord, p, 0).r >> ${x}u;
  let right = textureLoad(inkWord, min(p + vec2<i32>(1, 0), size - 1), 0).r >> ${x}u;
  let down = textureLoad(inkWord, min(p + vec2<i32>(0, 1), size - 1), 0).r >> ${x}u;
  return here != right || here != down;
}

@compute @workgroup_size(${V}, ${V}) fn classify(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_index) li: u32, @builtin(workgroup_id) wid: vec3<u32>) {${q}
}

@compute @workgroup_size(64) fn gather(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= inkTiles.across * inkTiles.down) { return; }
  let tiles = vec2<i32>(i32(inkTiles.across), i32(inkTiles.down));
  let t = vec2<i32>(i32(gid.x % inkTiles.across), i32(gid.x / inkTiles.across));
  let halo = i32(inkTiles.halo);
  let lo = max(t - vec2<i32>(halo), vec2<i32>(0));
  let hi = min(t + vec2<i32>(halo), tiles - 1);
  for (var y = lo.y; y <= hi.y; y += 1) {
    for (var x = lo.x; x <= hi.x; x += 1) {
      if (inkTileMarks[y * tiles.x + x] != 0u) {
        inkTileList[atomicAdd(&inkTileArgs[1], 1u)] = gid.x;
        return;
      }
    }
  }
}
`,Hj=Uj(Gj),Dj=Uj(bj),xj=`${vj}
${jj}
@group(0) @binding(0) var inkWord: texture_2d<u32>;
@group(0) @binding(3) var<uniform> inkTiles: InkTiles;
@group(0) @binding(4) var<storage, read> inkTileList: array<u32>;
@group(0) @binding(5) var<storage, read> inkLineArgs: array<u32, 4>;

@vertex fn vs(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> @builtin(position) vec4<f32> {
  if (instance >= inkLineArgs[1]) { return ${t}; }
  let tile = inkTileList[instance];
  let corner = vec2<u32>((0x32u >> vertex) & 1u, (0x2cu >> vertex) & 1u);
  let size = vec2<f32>(textureDimensions(inkWord));
  let px = min(vec2<f32>(vec2<u32>(tile % inkTiles.across, tile / inkTiles.across) + corner) * ${V}.0, size);
  return vec4<f32>(px.x / size.x * 2.0 - 1.0, 1.0 - px.y / size.y * 2.0, 0.0, 1.0);
}

fn ink_order(d: f32) -> f32 {
  let e = inkTiles.eye;
  return select(e.x / -lume_view_z_of_depth(d, e.x, e.y, e.z, e.w) / e.w, d, d * e.w > 1.0);
}
`,Fj=`${xj}
@group(0) @binding(2) var sceneDepth: texture_2d<f32>;

@fragment fn rows(@builtin(position) position: vec4<f32>) -> @location(0) vec2<u32> {
  let size = vec2<i32>(textureDimensions(inkWord));
  let p = vec2<i32>(position.xy);
  let reach = i32(inkTiles.reach);
  var ids: array<u32, ${G}>;
  var first: array<f32, ${G}>;
  var most: array<f32, ${G}>;
  var kept = 0u;
  var row = 0u;
  for (var i = 0; i <= 2 * reach; i += 1) {
    let dx = select(-(i / 2), (i + 1) / 2, (i & 1) == 1);
    let x = p.x + dx;
    if (x < 0 || x >= size.x) { continue; }
    let id = textureLoad(inkWord, vec2<i32>(x, p.y), 0).r >> ${x}u;
    if (id == 0u) { continue; }
    var slot = kept;
    for (var k = 0u; k < kept; k += 1u) { if (ids[k] == id) { slot = k; } }
    if (slot == ${G}u) { continue; }
    let depth = ink_order(textureLoad(sceneDepth, vec2<i32>(x, p.y), 0).r);
    if (slot == kept) {
      ids[kept] = id;
      first[kept] = depth;
      most[kept] = depth;
      row = row | (u32(dx + 128) << (kept * 8u));
      kept += 1u;
    } else {
      most[slot] = max(most[slot], depth);
    }
  }
  var steps = 0u;
  for (var k = 0u; k < kept; k += 1u) {
    let step = ceil(log2(most[k] / first[k]) / ${Vj}) + 1.0;
    steps = steps | (u32(min(step, 255.0)) << (k * 8u));
  }
  return vec2<u32>(row, steps);
}
`,S=`${xj}
@group(0) @binding(1) var inkColor: texture_2d<f32>;
@group(0) @binding(2) var sceneDepth: texture_2d<f32>;
@group(0) @binding(6) var inkRows: texture_2d<u32>;
@group(0) @binding(7) var sceneDepthFar: texture_2d<f32>;
@group(0) @binding(8) var inkVeil: texture_2d<f32>;

struct InkBest { depth: f32, cover: f32, at: vec2<i32> }
var<private> ink_at: vec2<i32>;
var<private> ink_plane: vec4<f32>;

fn ink_on_plane(q: vec2<i32>, depth: f32) -> bool {
  let o = vec2<f32>(q - ink_at);
  return abs(depth - ink_plane.w - dot(ink_plane.xy, o)) <= ink_plane.z * (1.0 + abs(o.x) + abs(o.y));
}

fn ink_take(best: ptr<function, InkBest>, q: vec2<i32>, d2: f32, own: u32, behind: f32) -> bool {
  let word = textureLoad(inkWord, q, 0).r;
  let id = word >> ${x}u;
  if (id == 0u || id == own) { return false; }
  let carried = f32(word & ${W}u) / ${w}.0;
  let cover = clamp(max(carried, 1.0) - sqrt(d2) + 1.0, 0.0, 1.0) * min(carried, 1.0);
  if (cover <= 0.0) { return false; }
  let depth = textureLoad(sceneDepth, q, 0).r;
  let near = ink_order(depth);
  if (!(near > behind)) { return false; }
  if (ink_on_plane(q, depth)) {
    let size = vec2<i32>(textureDimensions(sceneDepth));
    let past = clamp(q + vec2<i32>(sign(vec2<f32>(q - ink_at))), vec2<i32>(0), size - 1);
    if (ink_on_plane(past, textureLoad(sceneDepth, past, 0).r)) { return false; }
  }
  let far = ink_order(textureLoad(sceneDepthFar, q, 0).r);
  if (!(far > behind) && behind * behind > near * far * ${(1+g)**2}) { return false; }
  if (cover < (*best).cover || (cover == (*best).cover && depth <= (*best).depth)) { return true; }
  *best = InkBest(depth, cover, q);
  return true;
}

fn ink_best(position: vec4<f32>) -> InkBest {
  let size = vec2<i32>(textureDimensions(inkWord));
  let p = vec2<i32>(position.xy);
  let own = textureLoad(inkWord, p, 0).r >> ${x}u;
  let here = textureLoad(sceneDepth, p, 0).r;
  let behind = ink_order(here) * ${1+g};
  let lo = here - vec2<f32>(textureLoad(sceneDepth, max(p - vec2<i32>(1, 0), vec2<i32>(0)), 0).r, textureLoad(sceneDepth, max(p - vec2<i32>(0, 1), vec2<i32>(0)), 0).r);
  let hi = vec2<f32>(textureLoad(sceneDepth, min(p + vec2<i32>(1, 0), size - 1), 0).r, textureLoad(sceneDepth, min(p + vec2<i32>(0, 1), size - 1), 0).r) - here;
  let slope = (lo + hi) * 0.5;
  let grain = exp2(floor(log2(here)) - 23.0) + (abs(slope.x) + abs(slope.y)) / 256.0;
  ink_at = p;
  ink_plane = vec4<f32>(slope, select(-1.0, grain, all(abs(hi - lo) <= vec2<f32>(2.0 * grain))), here);
  let reach = i32(inkTiles.reach);
  var best = InkBest(0.0, 0.0, p);
  let near = min(reach, ${O});
  let nearLimit = (f32(near) + 0.5) * (f32(near) + 0.5);
  for (var dy = -near; dy <= near; dy += 1) {
    for (var dx = -near; dx <= near; dx += 1) {
      let d2 = f32(dx * dx + dy * dy);
      if (d2 > nearLimit) { continue; }
      _ = ink_take(&best, clamp(p + vec2<i32>(dx, dy), vec2<i32>(0), size - 1), d2, own, behind);
    }
  }
  if (reach > ${O}) {
    let limit = (inkTiles.reach + 0.5) * (inkTiles.reach + 0.5);
    for (var dy = -reach; dy <= reach; dy += 1) {
      let y = p.y + dy;
      if (y < 0 || y >= size.y) { continue; }
      let row = textureLoad(inkRows, vec2<i32>(p.x, y), 0).rg;
      for (var k = 0u; k < ${G*8}u; k += 8u) {
        let kept = (row.x >> k) & 255u;
        if (kept == 0u) { break; }
        let dx = i32(kept) - 128;
        let d2 = f32(dx * dx + dy * dy);
        if (d2 > limit) { continue; }
        let q = vec2<i32>(p.x + dx, y);
        let word = textureLoad(inkWord, q, 0).r;
        let id = word >> ${x}u;
        if (id == own || ink_take(&best, q, d2, own, behind)) { continue; }
        let far = max(f32(word & ${W}u) / ${w}.0, 1.0) + 1.0;
        if (sqrt(d2) >= far) { continue; }
        let steps = (row.y >> k) & 255u;
        if (steps < 255u && ink_order(textureLoad(sceneDepth, q, 0).r) * exp2(f32(steps) * ${Vj}) <= behind) { continue; }
        for (var i = select(-2 * dx, 2 * dx - 1, dx > 0) + 1; i <= 2 * reach; i += 1) {
          let sx = select(-(i / 2), (i + 1) / 2, (i & 1) == 1);
          let s2 = f32(sx * sx + dy * dy);
          if (s2 > limit || sqrt(s2) >= far) { break; }
          let x = p.x + sx;
          if (x < 0 || x >= size.x || (textureLoad(inkWord, vec2<i32>(x, y), 0).r >> ${x}u) != id) { continue; }
          if (ink_take(&best, vec2<i32>(x, y), s2, own, behind)) { break; }
        }
      }
    }
  }
  return best;
}

@fragment fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  let best = ink_best(position);
  if (best.cover <= 0.0) { discard; }
  return vec4<f32>(textureLoad(inkColor, best.at, 0).rgb, best.cover * (1.0 - textureLoad(inkVeil, best.at, 0).r));
}

@fragment fn stand(@builtin(position) position: vec4<f32>) -> @builtin(frag_depth) f32 {
  let best = ink_best(position);
  if (best.cover < 0.5) { discard; }
  return best.depth;
}
`;class kj{constructor(j,q){this.device=void 0;this.pipelines=void 0;this.word=null;this.color=null;this.rowWords=null;this.tilesBuffer=null;this.marks=null;this.list=null;this.args=null;this.tileCapacity=0;this.lineTiles=0;this.tilesData=new ArrayBuffer(32);this.tilesFloats=new Float32Array(this.tilesData);this.tilesWords=new Uint32Array(this.tilesData);this.tilesKey="";this.line=null;this.stand=null;this.rows=null;this.lineGroup=null;this.rowsGroup=null;this.fieldColor={format:"rgba16float",clearValue:{r:0,g:0,b:0,a:0}};this.fieldWord={format:T,clearValue:{r:0,g:0,b:0,a:0}};this.fieldDepth={format:b,depthReadOnly:!0};this.fieldPass={colorAttachments:[this.fieldColor,this.fieldWord],depthStencil:this.fieldDepth,draws:[]};this.tileDispatches=[];this.tilesPass={dispatches:this.tileDispatches};this.rowsColor={format:A,clearValue:{r:0,g:0,b:0,a:0}};this.rowsPass={colorAttachments:[this.rowsColor],draws:(j)=>this.drawTiles(j,this.rows,this.rowsGroup)};this.lineColor={format:"rgba16float",load:"load"};this.linePass={colorAttachments:[this.lineColor],draws:(j)=>this.drawTiles(j,this.line,this.lineGroup)};this.standDepth={format:b,depthLoad:"load",depthStore:"store"};this.standPass={colorAttachments:[],depthStencil:this.standDepth,draws:(j)=>this.drawTiles(j,this.stand,this.lineGroup)};this.tilePasses=[this.fieldPass,this.rowsPass,this.linePass,this.standPass];this.restores=[u("nearest","ink.depth","lume ink depth"),u("farthest","ink.depth.far","lume ink far depth")];this.classifyPipeline=null;this.gatherPipeline=null;this.rowsDescriptor=()=>y(this.device,this.pipelines,"post/ink-rows",Fj,I,"rows",[{format:A}]);this.lineDescriptor=()=>y(this.device,this.pipelines,"post/ink-line",S,f,"fs",[{format:F(),blend:o}]);this.classifyDescriptor=()=>this.tilesDescriptor("classify");this.gatherDescriptor=()=>this.tilesDescriptor("gather");this.askClassify=()=>this.pipelines.getComputePipeline("post/ink-tiles/classify",this.classifyDescriptor);this.askGather=()=>this.pipelines.getComputePipeline("post/ink-tiles/gather",this.gatherDescriptor);this.device=j;this.pipelines=q}declare(j,q){if(q.draws.length===0)return;let z=F();this.askPrograms(q.height);let J=this.classifyPipeline,Q=this.gatherPipeline,v=d(q.height),U=v>O;if(this.line===null||U&&this.rows===null||J===null||Q===null)return;if(this.word=B(this.device,this.word,{width:q.width,height:q.height,format:T,label:"lume ink word"}),this.color=B(this.device,this.color,{width:q.width,height:q.height,format:z,label:"lume ink color"}),U)this.rowWords=B(this.device,this.rowWords,{width:q.width,height:q.height,format:A,label:"lume ink rows"});let k=q.samples!==1,[L,m]=k?this.restoreDepth(q)??[]:[q.depth,q.depth];if(!L||!m)return;if(k)for(let $ of this.restores)j.addRenderPass($.name,$.pass);this.fieldColor.view=this.color.view,this.fieldColor.format=z,this.fieldWord.view=this.word.view,this.fieldDepth.view=m,this.fieldPass.draws=q.draws;for(let $ of this.tilePasses)$.isolated=q.isolated,$.scissor=q.scissor??void 0;j.addRenderPass("ink.field",this.fieldPass);let H=Math.ceil(q.width/V),D=Math.ceil(q.height/V),h=this.tiles(v,H,D,q);this.lineTiles=H*D;let{marks:Mj,list:R,args:l}=this.tileBuffers(this.lineTiles),Bj=this.pipelines.getBindGroup({label:"lume ink tiles",layout:this.pipelines.getBindGroupLayout(E,"lume ink tiles"),entries:[{binding:0,resource:this.word.view},{binding:1,resource:{buffer:Mj}},{binding:2,resource:{buffer:l}},{binding:3,resource:{buffer:R}},{binding:4,resource:{buffer:h}}]}),N=[[H,D,1],[Math.ceil(H*D/64),1,1]];for(let $=0;$<2;$++){let P=this.tileDispatches[$]??={pipeline:J,bindGroups:[],dispatch:N[$]};P.pipeline=$===0?J:Q,P.bindGroups[0]=Bj,P.dispatch=N[$]}j.addCompute("ink.tiles",this.tilesPass);let c=[{binding:0,resource:this.word.view},{binding:2,resource:L},{binding:3,resource:{buffer:h}},{binding:4,resource:{buffer:R}},{binding:5,resource:{buffer:l}}];if(U&&this.rowWords!==null)this.rowsGroup=this.pipelines.getBindGroup({label:"lume ink rows",layout:this.pipelines.getBindGroupLayout(I,"lume ink rows"),entries:c}),this.rowsColor.view=this.rowWords.view,j.addRenderPass("ink.rows",this.rowsPass);if(this.lineGroup=this.pipelines.getBindGroup({label:"lume ink line",layout:this.pipelines.getBindGroupLayout(f,"lume ink line"),entries:[...c,{binding:1,resource:this.color.view},{binding:6,resource:U&&this.rowWords!==null?this.rowWords.view:this.word.view},{binding:7,resource:m},{binding:8,resource:q.veil??Yj(this.device).lookCoverPlaceholder.view()}]}),this.lineColor.view=q.sceneColor,this.lineColor.format=z,j.addRenderPass("ink.line",this.linePass),this.stand=q.stand?kj.askStand(this.device,this.pipelines,q.samples).pipeline:null,q.stand&&this.stand!==null)this.standDepth.view=q.stand,j.addRenderPass("ink.stand",this.standPass)}askPrograms(j){if(this.line=this.pipelines.getRenderPipeline(`post/ink-line/${F()}`,this.lineDescriptor).pipeline,this.rows=d(j)>O?this.pipelines.getRenderPipeline("post/ink-rows",this.rowsDescriptor).pipeline:null,this.classifyPipeline=K(this.device,this.pipelines,this.askClassify).pipeline,this.gatherPipeline=K(this.device,this.pipelines,this.askGather).pipeline,i()===1)return;for(let q of this.restores)$j(this.device,this.pipelines,q.pick)}static askStand(j,q,z){return q.getRenderPipeline(`post/ink-stand/s${z}`,()=>({...y(j,q,"post/ink-stand",S,f,"stand",[]),depthStencil:_(!0,p),multisample:{count:z}}))}destroy(){this.word=X(this.word),this.color=X(this.color),this.rowWords=X(this.rowWords);for(let j of this.restores)j.target=X(j.target);this.tilesBuffer?.release(),this.marks?.release(),this.list?.release(),this.args?.release(),this.tilesBuffer=null,this.marks=null,this.list=null,this.args=null,this.tileCapacity=0,this.lineTiles=0,this.tilesKey=""}tiles(j,q,z,{camera:J,depthScale:Q}){this.tilesBuffer??=M(this.device,{label:"lume ink tiles",size:32,usage:64|8},(k)=>this.device.queue.writeBuffer(k,0,this.tilesData));let v=e(J.projection,J.isOrthographic),U=`${j}/${q}/${z}/${J.near}/${J.far}/${v}/${Q}`;if(U!==this.tilesKey)this.tilesFloats.set([J.near,J.far,v,Q],4),this.tilesKey=U,this.tilesFloats[0]=j,this.tilesWords[1]=q,this.tilesWords[2]=z,this.tilesWords[3]=Math.ceil(j/V),this.device.queue.writeBuffer(this.tilesBuffer.resource,0,this.tilesData);return this.tilesBuffer.resource}tileBuffers(a){return $c0P($c0C(0),kj.prototype,"tileBuffers").call(this,a)}restoreDepth(j){let q=this.restores.map((z)=>Zj(this.device,this.pipelines,j.depth,z.pick));if(this.restores.forEach(function(z,J){z.pipeline=q[J]?.pipeline??null,z.groups[0]=q[J]?.group??null}),q.includes(null))return null;return this.restores.map((z)=>{return z.target=B(this.device,z.target,{width:j.width,height:j.height,format:b,label:z.label}),z.depth.view=z.target.view})}drawTiles(j,q,z){if(q===null||this.args===null||z===null)return;if(j.setPipeline(q),j.setBindGroup(0,z),r()||s())j.draw(6,this.lineTiles);else a(q),j.drawIndirect(this.args.resource,0)}tilesDescriptor(a){return $c0P($c0C(1),kj.prototype,"tilesDescriptor").call(this,a)}}function u(j,q,z){let J={format:b,depthLoad:"clear",depthStore:"store"},Q={pick:j,name:q,label:z,target:null,pipeline:null,groups:[null],depth:J,pass:{colorAttachments:[],depthStencil:J,draws:function(v){if(Q.pipeline!==null)Qj(v,Q.pipeline,Q.groups)}}};return Q}function y(j,q,z,J,Q,v,U){let k=q.shaderModule(J,z);return{label:z,layout:j.createPipelineLayout({label:z,bindGroupLayouts:[q.getBindGroupLayout(Q,z)]}),vertex:{module:k,entryPoint:"vs"},fragment:{module:k,entryPoint:v,targets:U}}};

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{Dj as INK_TILES_FXC_WGSL,Fj as INK_ROWS_WGSL,Hj as INK_TILES_WGSL,O as INK_EXACT_PX,S as INK_LINE_WGSL,V as INK_TILE_PX,d as inkSearchPx,kj as InkPasses};
