import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(z){return`${dq(z)}\nfn morph_sum(vertex: u32) -> MorphSum {\n  var sum: MorphSum;\n  sum.position = vec3<f32>(0.0);\n  sum.normal = vec3<f32>(0.0);\n  let entries = ${m}u + morphRows[0] + 1u;\n  let words = arrayLength(&morphRows);\n  let count = min(morphRows[1], (words - min(entries, words)) / ${N}u);\n  let start = morphRows[${m}u + vertex];\n  let end = min(min(morphRows[${m}u + vertex + 1u], count), start + morph.targetCount);\n${nq}\n}`})",()=>'(function(z,Z){let q=pq(z).split("fn morph_sum(vertex: u32)")[1];return`@group(${z}) @binding(${Z}) var<storage, read> previousMorph: MorphParams;\nfn previous_morph_sum(vertex: u32)${q.replaceAll("morph.weights","previousMorph.weights")}`})',()=>"(function(z=c){return`\n${h}\n@group(0) @binding(0) var<uniform> view: TableView;\n@group(0) @binding(1) var<storage, read> runs: array<vec4<u32>>;\n@group(0) @binding(2) var<storage, read> lists: array<vec4<u32>>;\n@group(0) @binding(3) var<storage, read_write> counts: array<atomic<u32>>;\n@group(0) @binding(4) var<storage, read_write> args: array<u32>;\n\n@compute @workgroup_size(${z})\nfn seal_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_index) lane: u32) {\n  let r = (wid.y * ${I}u + wid.x) * ${z}u + lane;\n  if (r == 0u) {\n    atomicStore(&counts[${_q}u], atomicExchange(&counts[${TZ}u], 0u));\n    atomicStore(&counts[${z2}u], atomicExchange(&counts[${xz}u], 0u));\n  }\n  if (r >= view.head.w) { return; }\n  seal_run(r);\n  if ((r & 31u) == 0u) {\n    let word = bitcast<u32>(view.spare0.w) + (r >> 5u) * ${Oz}u;\n    for (var k = 0u; k < ${Oz}u; k = k + 2u) { atomicStore(&counts[word + k + 1u], atomicExchange(&counts[word + k], 0u)); }\n  }\n}\n\nfn seal_run(r: u32) {\n  let run = runs[r];\n  let base = ${T}u + r * 4u;\n  let kept = min(atomicExchange(&counts[base], 0u), run.x);\n  let fold = atomicExchange(&counts[base + 1u], 0u);\n  var list = vec4<u32>(0u);\n  if (kept != 0u && run.z != 0u) { list = lists[run.y]; }\n  else if (kept != 0u && fold != 0u) { list = lists[run.y + 15u - fold]; }\n  let at = r * ${R}u;\n  args[at] = list.y;\n  args[at + 1u] = select(0u, kept, list.y != 0u);\n  args[at + 2u] = list.x;\n  args[at + 3u] = 0u;\n  args[at + 4u] = 0u;\n  atomicStore(&counts[base + 2u], list.y);\n  atomicStore(&counts[base + 3u], list.z);\n  if (kept != 0u) { atomicAdd(&counts[0], kept * (list.y / 3u)); }\n}\n`})",()=>'(function(z=c,Z=!1){let q=Z?`@group(0) @binding(4) var<storage, read> roads: array<vec4<u32>>;\n@group(0) @binding(5) var<storage, read> blocks: array<vec4<u32>>;\n@group(0) @binding(7) var<storage, read> counts: array<u32>;\n@group(0) @binding(8) var<storage, read> memory: array<vec2<u32>>;`:`@group(0) @binding(4) var<storage, read> want: array<vec4<u32>>;\n@group(0) @binding(5) var<storage, read> draws: array<vec4<u32>>;`,$=Z?`  let word = memory[item].x;\n  if ((word & 0x10000u) == 0u) { return; }\n  let road = roads[2u * item];\n  if (road.x == NONE) { return; }\n  let chose = word & 0xffu;\n  let fadeOther = (word >> ${C}u) & 15u;\n  let main = blocks[select(road.x, roads[2u * item + 1u].x, fadeOther != 0u)];\n  let drawn = ${T}u + (main.x + select((main.w >> ((chose - 1u) * 4u)) & 15u, 0u, chose == 0u)) * 4u;\n  let code = counts[drawn + 3u];\n  let own = counts[drawn + 2u] / 3u;\n  if (own == 0u) { return; }\n  var otherCode = 0u;\n  var otherTriangles = 0u;\n  if (fadeOther != 0u) {\n    let otherRun = ${T}u + (main.x + select((main.w >> ((fadeOther - 2u) * 4u)) & 15u, 0u, fadeOther == 1u)) * 4u;\n    otherCode = counts[otherRun + 3u] + 1u;\n    otherTriangles = counts[otherRun + 2u] / 3u;\n  }\n  let inked = (word & 0x20000u) != 0u && road.y != NONE;\n  var inkOwn = 0u;\n  if (inked) {\n    let ink = blocks[road.y];\n    inkOwn = counts[${T}u + (ink.x + select((ink.w >> ((chose - 1u) * 4u)) & 15u, 0u, chose == 0u)) * 4u + 2u] / 3u;\n  }`:`  let kept = want[item];\n  let classes = view.head.w / max(view.head.z, 1u);\n  let drew = draws[2u * item].y;\n  let other = draws[2u * item + 1u];\n  if (kept.x == NONE || (drew & ${p}u) == 0u || !tbl_stood(kept.x >> ${k}u, classes)) { return; }\n  let code = (kept.w >> 27u) & 15u;\n  let own = drew & ${K}u;\n  let otherCode = other.z;\n  let otherTriangles = other.y & ${K}u;\n  let inked = kept.y != NONE && (drew & ${Mz}u) != 0u && tbl_stood(kept.y >> ${k}u, classes);`;return`\n${H}\n${h}\nstruct TableCensusAsk { slots: u32, marks: u32, spare0: u32, spare1: u32 }\n@group(0) @binding(0) var<uniform> view: TableView;\n@group(0) @binding(1) var<uniform> ask: TableCensusAsk;\n@group(0) @binding(2) var<storage, read> tableInstances: array<TableInstance>;\n@group(0) @binding(3) var<storage, read> tableItems: array<TableItem>;\n${q}\n@group(0) @binding(6) var<storage, read_write> sums: array<atomic<u32>>;\n\nfn tbl_stood(bin: u32, classes: u32) -> bool {\n  let si = (bin % classes) * ${Lz}u + bin / classes;\n${Tz}\n}\n\n@compute @workgroup_size(${z})\nfn census_main(@builtin(global_invocation_id) gid: vec3<u32>) {\n  let item = gid.x;\n  if (item >= view.head.y) { return; }\n  if ((tableItems[item].head.w & ${k2}u) == 0u) { return; }\n${$}\n  let moving = (tableInstances[tableItems[item].head.x].flags.x & ${tz}u) != 0u;\n  if ((view.head2.z == 2u && !moving) || (view.head2.z == 1u && moving)) { return; }\n  let body = tableInstances[tableItems[item].head.x].body;\n  if (body.y >= ask.slots) { return; }\n  let level = min(code, ${Uz-1}u);\n  var triangles = own;\n  if (inked) { triangles = triangles + ${Z?"inkOwn":"own"}; }\n  let base = body.y * ${m2}u;\n  atomicAdd(&sums[base + ${n.triangles}u], triangles);\n  atomicAdd(&sums[base + ${n.draws}u + level], 1u);\n  atomicAdd(&sums[base + ${n.levelTriangles}u + level], triangles);\n  if (otherCode != 0u) {\n    let otherLevel = min(otherCode - 1u, ${Uz-1}u);\n    atomicAdd(&sums[base + ${n.triangles}u], otherTriangles);\n    atomicAdd(&sums[base + ${n.draws}u + otherLevel], 1u);\n    atomicAdd(&sums[base + ${n.levelTriangles}u + otherLevel], otherTriangles);\n  }\n  let mark = ask.marks + (body.x >> 5u);\n  let bit = 1u << (body.x & 31u);\n  if (mark < arrayLength(&sums) && (atomicOr(&sums[mark], bit) & bit) == 0u) { atomicAdd(&sums[base + ${n.copies}u], 1u); }\n}\n`})']},function(){return[()=>"(function(z){return`\n@group(0) @binding(0) var<storage, read> jobs: array<vec4<u32>>;\n@group(0) @binding(1) var<storage, read_write> indices: array<u32>;\n${sz(0,2,z)}\n\n@compute @workgroup_size(64)\nfn standing_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>) {\n  let j = wid.y * ${I}u + wid.x;\n  if (j >= arrayLength(&jobs)) { return; }\n  let job = jobs[j];\n  let triangles = job.y & ${wZ-1}u;\n  let base = job.z << ${D}u;\n  for (var t = lid.x; t < triangles; t = t + 64u) {\n    let w = t * 3u;\n    var c = vec3<u32>(base + w, base + w + 1u, base + w + 2u);\n    if (job.x != ${Zz}u) { c = vec3<u32>(base + tbl_index(job.x, w), base + tbl_index(job.x, w + 1u), base + tbl_index(job.x, w + 2u)); }\n    if ((job.y & ${wZ}u) != 0u) { c = c.xzy; }\n    let at = (job.w + t) * 3u;\n    indices[at] = c.x;\n    indices[at + 1u] = c.y;\n    indices[at + 2u] = c.z;\n  }\n}\n`})",()=>"(function(z){return`\n@group(0) @binding(0) var<storage, read> jobs: array<vec4<u32>>;\n${Array.from({length:z-1},(q,$)=>`@group(0) @binding(${1+$}) var<storage, read> tableSlab${$}: array<u32>;`).join(`\n`)}\n@group(0) @binding(${z}) var<storage, read_write> tableSlab${z-1}: array<u32>;\n${W(z,(q)=>`tableSlab${q}`)}\nfn tbl_pos(stream: u32, v: u32) -> vec3<f32> {\n  return vec3<f32>(bitcast<f32>(tbl_geo(stream + v * 3u)), bitcast<f32>(tbl_geo(stream + v * 3u + 1u)), bitcast<f32>(tbl_geo(stream + v * 3u + 2u)));\n}\n${vq()}\nfn tbl_corner(job: vec4u, w: u32) -> vec3f {\n  return tbl_pos(job.w, select(w, tbl_index(job.x, w), job.x != ${Zz}u));\n}\nfn tbl_face(job: vec4u, w: u32) -> vec3f {\n  let p = tbl_corner(job, w);\n  let n = cross(tbl_corner(job, w + 1u) - p, tbl_corner(job, w + 2u) - p);\n  return select(vec3f(), normalize(n), dot(n, n) > 0.0);\n}\n${rZ}\n\n@compute @workgroup_size(64)\nfn bound_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>) {\n  let j = wid.y * ${I}u + wid.x;\n  if (j >= arrayLength(&jobs)) { return; }\n  let job = jobs[j];\n  let chunks = (job.y + ${U-1}u) >> ${V}u;\n  for (var c = lid.x; c < chunks; c = c + 64u) {\n    var lo = vec3<f32>(3.4e38);\n    var hi = vec3<f32>(-3.4e38);\n    var mean = vec3f();\n    let first = (c << ${V}u) * 3u;\n    let end = min(job.y, (c + 1u) << ${V}u) * 3u;\n    for (var w = first; w < end; w = w + 1u) {\n      let p = tbl_corner(job, w);\n      lo = min(lo, p);\n      hi = max(hi, p);\n      if (w % 3u == 0u) { mean += tbl_face(job, w); }\n    }\n    var cone = 0xf000u;\n    if (dot(mean, mean) > 0.0) {\n      let k = vec3u(round(normalize(mean) * 7.5 + 7.5));\n      let code = k.x | (k.y << 4u) | (k.z << 8u);\n      let axis = tbl_coneAxis(code);\n      var least = 1.0;\n      for (var w = first; w < end; w += 3u) {\n        let n = tbl_face(job, w);\n        if (dot(n, n) > 0.0) { least = min(least, dot(n, axis)); }\n      }\n      let steps = ceil(sqrt(1.0 - least * least) * 14.0014 + 1e-4);\n      if (least > 0.0 && steps <= 14.0) { cone = code | (u32(steps) << 12u); }\n    }\n    let radius = (bitcast<u32>(length(hi - lo) * 0.5) + 0x7fffu) >> 15u;\n    let centre = (lo + hi) * 0.5;\n    let at = job.z - ${zz(z)}u + c * 4u;\n    tableSlab${z-1}[at] = bitcast<u32>(centre.x);\n    tableSlab${z-1}[at + 1u] = bitcast<u32>(centre.y);\n    tableSlab${z-1}[at + 2u] = bitcast<u32>(centre.z);\n    tableSlab${z-1}[at + 3u] = radius | (cone << 16u);\n  }\n}\n`})"]},function(){return[()=>'(function(z){let Z=Array.from({length:z-1},(q,$)=>`@group(0) @binding(${4+$}) var<storage, read> tableSlab${$}: array<u32>;`).join(`\n`);return`\n${H}\n@group(0) @binding(0) var<storage, read> bakeJobs: array<vec2<u32>>;\n@group(0) @binding(1) var<storage, read> tableItems: array<TableItem>;\n@group(0) @binding(2) var<storage, read> tableParts: array<TablePart>;\n@group(0) @binding(3) var<storage, read> tablePoses: array<mat4x4<f32>>;\n${Z}\n@group(0) @binding(${4+z-1}) var<storage, read_write> tablePage: array<u32>;\n${W(z,(q)=>q===z-1?"tablePage":`tableSlab${q}`)}\n${W(z,(q)=>q===z-1?"tablePage":`tableSlab${q}`,2)}\n${W(z,(q)=>q===z-1?"tablePage":`tableSlab${q}`,3)}\nfn tbl_geoF(address: u32) -> f32 {\n  return bitcast<f32>(tbl_geo(address));\n}\n${Uq}\n${Mq}\nfn tbl_bakeSnorm(value: f32) -> u32 {\n  return bitcast<u32>(i32(round(clamp(value / ${Qz}.0, -1.0, 1.0) * 32767.0))) & 0xffffu;\n}\n@compute @workgroup_size(${Dz})\nfn bake_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_index) lid: u32) {\n  let index = wid.y + wid.z * ${p2}u;\n  if (index >= bakeJobs[0].x) { return; }\n  let source = bakeJobs[index * 2u + 1u];\n  let into = bakeJobs[index * 2u + 2u];\n  let head = into.y - ${zz(z)}u;\n  let n = min(tbl_geo(source.x), tablePage[head]);\n  let entries = head + ${m}u + tablePage[head] + 1u;\n  let last = min((wid.x + 1u) * ${dZ}u, n);\n  for (var v = wid.x * ${dZ}u + lid; v < last; v = v + ${Dz}u) {\n    let sum = tbl_morph(source.x, source.y, into.x, v);\n    let e = entries + v * ${N}u;\n    tablePage[e] = 0u;\n    tablePage[e + 1u] = bitcast<u32>(sum.position.x);\n    tablePage[e + 2u] = bitcast<u32>(sum.position.y);\n    tablePage[e + 3u] = bitcast<u32>(sum.position.z);\n    tablePage[e + 4u] = tbl_bakeSnorm(sum.normal.x) | (tbl_bakeSnorm(sum.normal.y) << 16u);\n    tablePage[e + 5u] = tbl_bakeSnorm(sum.normal.z);\n  }\n}\n`})',()=>"(function(){return`\n${h}\n@group(0) @binding(0) var<storage, read> slotJobs: array<u32>;\n@group(0) @binding(1) var<storage, read> draws: array<vec4<u32>>;\n@group(0) @binding(2) var<storage, read> want: array<vec4<u32>>;\n@group(0) @binding(3) var<storage, read_write> slotArgs: array<atomic<u32>>;\n@group(0) @binding(4) var<storage, read_write> stats: array<atomic<u32>>;\n@group(0) @binding(5) var<storage, read_write> slotSpans: array<u32>;\n@group(0) @binding(6) var<uniform> view: TableView;\n${Pz}\nstruct SlotJob {\n  item: u32,\n  slot: u32,\n  tris: u32,\n  code: u32,\n  corners: u32,\n}\nfn slot_job(index: u32) -> SlotJob {\n  var job: SlotJob;\n  job.corners = 0u;\n  let at = ${pZ}u + index * 4u;\n  let cascade = slotJobs[at + 3u];\n  let shadowView = view.head.x != ${t}u;\n  if (shadowView && cascade != 0u) { return job; }\n  let role = select(cascade + 1u, 0u, shadowView);\n  let first = bitcast<u32>(view.spare1.z);\n  if (role < first || role >= first + bitcast<u32>(view.spare1.w)) { return job; }\n  job.item = slotJobs[at];\n  job.slot = role * view.head2.w + job.item;\n  let named = draws[2u * job.slot];\n  job.tris = named.y & ${K}u;\n  if (job.tris == 0u || named.x == NONE) { return job; }\n  job.code = (want[job.slot].w >> 27u) & 15u;\n  if (job.code >= ${C2}u) { return job; }\n  job.corners = slotJobs[slotJobs[at + 1u] + job.code];\n  return job;\n}\n@compute @workgroup_size(${Dz})\nfn slot_main(@builtin(global_invocation_id) gid: vec3<u32>) {\n  let index = gid.x;\n  if (phase == 0u) {\n    if (index < slotJobs[1]) { atomicStore(&slotArgs[index * ${nZ}u], 0u); }\n    return;\n  }\n  if (index >= slotJobs[0]) { return; }\n  let job = slot_job(index);\n  if (job.corners == 0u) { return; }\n  let at = ${pZ}u + index * 4u;\n  let bin = slotJobs[at + 2u];\n  let cascade = slotJobs[at + 3u];\n  let window = cascade * slotJobs[2] + bin;\n  let wat = window * ${nZ}u;\n  let spans = (job.corners + ${u-1}u) / ${u}u;\n  let room = slotJobs[slotJobs[3] + window] * ${u}u;\n  let before = atomicAdd(&slotArgs[wat], spans * ${u}u);\n  if (before + spans * ${u}u > room) { atomicMin(&slotArgs[wat], room); }\n  let laid = min(spans, select(0u, (room - before) / ${u}u, before < room));\n  let firstSpan = (atomicLoad(&slotArgs[wat + 2u]) - ${Iz}u) / ${u}u + before / ${u}u;\n  for (var s = 0u; s < laid; s = s + 1u) {\n    let o = (firstSpan + s) * ${Fq}u;\n    slotSpans[o] = job.item + 1u;\n    slotSpans[o + 1u] = job.code;\n    slotSpans[o + 2u] = s * ${u}u;\n    slotSpans[o + 3u] = job.corners;\n  }\n  let shadowView = view.head.x != ${t}u;\n  let viewBin = select(bin, (bin / ${s}u) * max(view.head.w / max(view.head.z, 1u), 1u) + ${A}u + cascade * ${s}u + bin % ${s}u, !shadowView);\n  atomicAdd(&stats[viewBin], job.tris);\n}\n`})"]},function(){return[()=>"(function(z){return`if (tableVertexIndex >= ${Iz}u) {\n    let tableC = tableVertexIndex - ${Iz}u;\n    let tableS = tableC / ${u}u;\n    let tableO = tableS * ${Fq}u;\n    let tableSpan = vec4u(tableSpans[tableO], tableSpans[tableO + 1u], tableSpans[tableO + 2u], tableSpans[tableO + 3u]);\n    if (tableSpan.x == 0u) { ${z} }\n    tableItemIndex = tableSpan.x - 1u;\n    let tableHead = tableItems[tableItemIndex].head;\n    tableInstanceIndex = tableHead.x;\n    tablePart = tableHead.y;\n    let tableOwn = tableParts[tablePart].head;\n    var tableCount = tableOwn.w;\n    var tableList = ${Zz}u;\n    if (tableSpan.y > 0u) {\n      var tableLevel = tableParts[tablePart].levels[min(tableSpan.y, ${X}u) - 1u];\n      if (tableSpan.y > ${X}u) { tableLevel = tableParts[tablePart].casterLevels[min(tableSpan.y - ${X}u, ${X}u) - 1u]; }\n      tableList = tableLevel.x;\n      tableCount = tableLevel.y;\n    }\n    let tableK = tableSpan.z + (tableC - tableS * ${u}u);\n    let tableTri = tableK / 3u;\n    if (tableK >= tableSpan.w || tableTri >= tableCount / 3u) { ${z} }\n    var tableCorner = tableK - tableTri * 3u;\n    if ((tableInstances[tableInstanceIndex].flags.x & ${yz}u) != 0u && tableCorner != 0u) { tableCorner = 3u - tableCorner; }\n    tableV = tableTri * 3u + tableCorner;\n    if (tableSpan.y > 0u) { tableV = tbl_index(tableList, tableV); }\n    else if ((tableOwn.x & ${zq}u) != 0u) { tableV = tbl_index(tableOwn.z, tableV); }\n  } else `})",()=>'(function(z,Z=!1,q=!0,$=!0){if(Z)return`  let motionShown = tbl_motionShown(tableItem, tableInstance);\n  let previousPosition = in.position;\n  let previousModel = tbl_previousModel(tableItem.head.x);\n  var previousWorldPos = vec4f((previousModel * vec4f(previousPosition, 1.0)).xyz, 1.0);`;return`  let motionShown = tbl_motionShown(tableItem, tableInstance);\n  var previousPosition = in.position;${(q?`\n  if ((tableItem.head.w & ${_Z}u) != 0u) { previousPosition = previousPosition + tbl_morph(tableItem.morph.x, tableItem.morph.w, tableItem.morph.z, ${(z===0?"tableIn_vertex":"tableV")}).position; }`:"")}\n  var previousModel = tbl_previousModel(tableItem.head.x);\n  if ((tableItem.head.w & ${w|G}u) != 0u) { previousModel = tbl_poseModel(tableItem, tableInstance, previousModel, ${uq($,!0)}, true, tbl_shiftUnder(tableInstance.previousOrigin)); }\n  var previousWorldPos = vec4f((previousModel * vec4f(previousPosition, 1.0)).xyz, 1.0);`})',()=>"(function(){let z=`tbl_tapLevel${r2}(tableMat, tbl_place(tableMat, in.uv), 0.0, vec4<f32>(1.0))`,Z=`tbl_tapLevel${t2}(tableMat, tbl_place(tableMat, in.uv), 0.0, vec4<f32>(1.0)).g`;return`  let tableRow = tableItems[in.tableItem.x];\n  let tableMat = in.tableItem.y;\n  let tableBase = ${z};\n  let tablePacked = (u32(tableMaterials[tableMat].factors.w) & ${S2}u) != 0u;\n  let albedo4 = vec4<f32>(tableBase.rgb, select(tableBase.a, 1.0, tablePacked) * ${Z}) * in.vertexColor;\n  if (albedo4.a * tableRow.color.a < tableMaterials[tableMat].factors.x) { discard; }`})"]}],$c0XU=[0,4,6,8];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,11,230887908179968);
;const{IzZ:N,N1n:m,aGP:Qz}=$Lr.$S;const{$Mh:NZ,D4Z:iz,DbO:F,Dq4:oz,EK0:RZ,EVH:_z,NDw:M,RrI:WZ,ZoY:Rz,_rr:qZ,jqS:ZZ,m3Z:Nz,oKY:kZ,rmU:vZ,s0T:IZ,ts0:DZ,ucl:iZ,v1E:OZ,v7l:YZ,vo1:Xz,w7q:xZ,wWs:Vz,zdD:oZ}=$Lr;
;var zZ=((z)=>`  let casterDoor = ${_z("in.position.xy")};
  if (select(casterDoor, 1.0 - casterDoor, ${z} < 0.0) < abs(${z})) { discard; }`);var bq=4294967295,$Z=255;function E2(z){let Z=[];for(let q=0;q<z;q+=1)Z.push(qZ(q,2,"float","2d-array"));return Z.push(ZZ(z,2,"filtering")),Z}function QZ(z,Z){return`
struct TablePicture { cls: u32, layer: u32, whole: u32, wh: u32, deepest: u32, clamp: f32, inv: vec2<f32>, scale: vec2<f32> }
${Array.from({length:Z},(q,$)=>`@group(2) @binding(${$}) var picMap${$}: texture_2d_array<f32>;`).join(`
`)}
@group(2) @binding(${Z}) var picSampler: sampler;
const PIC_ANISO: f32 = ${z}.0;

fn pic_fold(t: f32, mode: u32, inset: f32) -> f32 {
  if (mode == 1u) { return clamp(t, inset, 1.0 - inset); }
  if (mode == 2u) { let m = t - 2.0 * floor(t * 0.5); return clamp(select(m, 2.0 - m, m > 1.0), inset, 1.0 - inset); }
  return t;
}
fn pic_centre(t: vec2<f32>, size: vec2<f32>, level: f32) -> vec2<f32> {
  let texels = max(floor(size * exp2(-max(floor(level), 0.0))), vec2<f32>(1.0));
  return (floor(t * texels) + 0.5) / texels;
}
fn pic_nearest(word: u32, lod: f32) -> bool {
  return select((word & 32u) != 0u, (word & 16u) != 0u, lod <= 0.0);
}
fn pic_size(r: TablePicture) -> vec2<f32> {
  return vec2<f32>(f32(r.wh & 0xffffu), f32(r.wh >> 16u));
}
fn pic_row(id: u32) -> TablePicture {
  if (id == ${bq}u) { return TablePicture(); }
  return pictures[id];
}
fn pic_wholeLayer(id: u32) -> i32 {
  let r = pic_row(id);
  return select(-1, i32(r.layer), r.whole != 0u);
}
struct PicAt { t: vec2<f32>, dx: vec2<f32>, dy: vec2<f32>, layer: i32 }
fn pic_none() -> PicAt {
  return PicAt(vec2<f32>(0.0), vec2<f32>(0.0), vec2<f32>(0.0), -1);
}
fn pic_read(map: texture_2d_array<f32>, a: PicAt) -> vec4<f32> {
${z>1?"  return textureSampleGrad(map, picSampler, a.t, a.layer, a.dx, a.dy);":`  let s = vec2<f32>(textureDimensions(map));
  let x = a.dx * s;
  let y = a.dy * s;
  return textureSampleLevel(map, picSampler, a.t, a.layer, 0.5 * log2(max(max(dot(x, x), dot(y, y)), 1e-16)));`}
}
fn pic_level(t: vec2<f32>, level: f32, r: TablePicture) -> PicAt {
  let g = exp2(level) * r.inv * r.scale;
  return PicAt(t * r.scale, vec2<f32>(g.x, 0.0), vec2<f32>(0.0, g.y), i32(r.layer));
}
fn pic_folded(r: TablePicture, size: vec2<f32>, word: u32, uv: vec2<f32>, lod: f32, nearest: bool) -> PicAt {
  let inset = (0.5 * exp2(ceil(max(lod, 0.0)))) * r.inv;
  var t = vec2<f32>(pic_fold(uv.x, word & 3u, inset.x), pic_fold(uv.y, (word >> 2u) & 3u, inset.y));
  let level = select(lod, clamp(round(lod), ceil(r.clamp), f32(r.deepest)), (word & 64u) != 0u);
  if (nearest) { t = pic_centre(t, size, level); }
  return pic_level(t, level, r);
}
fn pic_at(id: u32, word: u32, uv: vec2<f32>, ddxIn: vec2<f32>, ddyIn: vec2<f32>) -> PicAt {
  let r = pic_row(id);
  if (r.wh == 0u) { return pic_none(); }
  let size = pic_size(r);
  let sx = ddxIn * size;
  let sy = ddyIn * size;
  let lx2 = dot(sx, sx);
  let ly2 = dot(sy, sy);
  let major = sqrt(max(lx2, ly2));
  let plain = (word & 0x7fu) == 0u;
  let n = min(ceil(major * inverseSqrt(max(min(lx2, ly2), 1e-16))), select(1.0, PIC_ANISO, plain));
  let raw = log2(max(major / n, 1e-8));
  let lod = clamp(raw, r.clamp, f32(r.deepest));
  let nearest = pic_nearest(word, lod);
  if (plain && !nearest) { let k = exp2(lod - raw) * r.scale; return PicAt(uv * r.scale, ddxIn * k, ddyIn * k, i32(r.layer)); }
  return pic_folded(r, size, word, uv, lod, nearest);
}
fn pic_atLevel(id: u32, word: u32, uv: vec2<f32>, at: f32) -> PicAt {
  let r = pic_row(id);
  if (r.wh == 0u) { return pic_none(); }
  let lod = clamp(at, r.clamp, f32(r.deepest));
  return pic_folded(r, pic_size(r), word, uv, lod, pic_nearest(word, lod));
}
fn pic_mean(id: u32, word: u32) -> PicAt {
  let r = pic_row(id);
  if (r.wh == 0u) { return pic_none(); }
  let deepest = f32(r.deepest);
  var t = vec2<f32>(0.5);
  if (pic_nearest(word, deepest)) { t = pic_centre(t, pic_size(r), deepest); }
  return pic_level(t, deepest, r);
}
`}var JZ=4,q3={targetCount:0,weights:4},mq=4294967295,Gz=(z,Z,q,$)=>`var w = bitcast<f32>(${Z});
    if (${z} != ${mq}u) {
      let p = ${$};
      w = p - min(max(p, w), bitcast<f32>(${q}));
    }`,wq=`struct MorphParams {
  targetCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  weights: array<u32>,
}`,Hz=`struct MorphSum {
  position: vec3<f32>,
  normal: vec3<f32>,
}
fn morph_snorm16(bits: u32) -> f32 {
  return f32(bitcast<i32>(bits << 16u) >> 16u) * (${Qz}.0 / 32767.0);
}`;function dq(z){return`${wq}
${Hz}
@group(${z}) @binding(${Jz.deltas}) var<storage, read> morphRows: array<u32>;
@group(${z}) @binding(${Jz.params}) var<storage, read> morph: MorphParams;
@group(${z}) @binding(${Jz.poses}) var<storage, read> morphPoses: array<f32>;`}var nq=`  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${N}u;
    let k = morphRows[e] * 3u;
    let s = morph.weights[k];
    ${Gz("s","morph.weights[k + 1u]","morph.weights[k + 2u]","morphPoses[s]")}
    sum.position = sum.position + vec3<f32>(bitcast<f32>(morphRows[e + 1u]), bitcast<f32>(morphRows[e + 2u]), bitcast<f32>(morphRows[e + 3u])) * w;
    let nxy = morphRows[e + 4u];
    sum.normal = sum.normal + vec3<f32>(morph_snorm16(nxy), morph_snorm16(nxy >> 16u), morph_snorm16(morphRows[e + 5u])) * w;
  }
  return sum;`;function pq(a){return (pq=$c0C(0)).call(this,a)}function $3(a,b){return ($3=$c0C(1)).call(this,a,b)}var Cq=16;function Oq(z,Z){if(!z)return`material.materialClip[${Z}]`;let q=Cq+Z*4;return`vec4<f32>(${[0,1,2,3].map(($)=>`tbl_glassF(tableItem.head2.w + ${q+$}u)`).join(", ")})`}function bz(z,Z,q,$){if(z===null)return[];let Q=[`  let materialClipPoint = ${q} + ${$};`];for(let j of z.count>4?[0,4]:[0]){let v=[];for(let Y=0;Y<4;Y+=1){v.push(j+Y<z.count?jZ(Oq(Z,j+Y),"materialClipPoint"):"0.0");}Q.push(`  let materialClip${j===0?"A":"B"} = vec4<f32>(${v.join(", ")});`)}return Q}function mz(z){if(z===null)return[];return z.count>4?["  out.materialClipA = materialClipA;","  out.materialClipB = materialClipB;"]:["  out.materialClipA = materialClipA;"]}function wz(z,Z){if(z===null)return[];return aa(z,Z);}var Wq=["x","y","z","w"];function jz(z){if(z===null)return[];return[`  if (${XZ(z,(Z)=>`in.materialClip${Z<4?"A":"B"}.${Wq[Z%4]}`)}) { discard; }`]}function j3(z){return z===null?"":ba(z)}var a=`struct CullCamera {
  planes: array<vec4<f32>, 6>,
  camPos: vec3<f32>,
  camNear: f32,
  focalPixels: f32,
  orthoPixels: f32,
  projectionDepthScale: f32,
  projectionDepthOffset: f32,
  prevFocus: vec3<f32>,
  rasterShare: f32,
  focus: vec3<f32>,
  farReach: f32,
  fogCull: vec4<f32>,
  skylineEye: vec3<f32>,
  skylineOn: f32,
  skylineSlack: vec2<f32>,
  memoryOwner: f32,
  lensFar: f32,
  skyline: array<vec4<f32>, ${xZ/4}>,
  coverWindow: vec4<f32>,
  coverBand: vec4<f32>,
  //${F}\u00b2 cells, row-major, an uncovered cell past every depth.
  eyeGate: vec4<f32>,
  eyeViewProj: array<mat4x4<f32>, ${Xz}>,
  eyeCells: array<vec4<f32>, ${F*F*Xz/4}>,
}
`,yZ=`fn planeDistance(index: u32, p: vec3<f32>) -> f32 {
  let plane = camera.planes[index];
  return dot(plane.xyz, p) + plane.w;
}`,FZ=`fn cull_hash2D(p: vec2<f32>) -> f32 {
  return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453123);
}`,KZ=`fn eyeGateHides(e: u32, c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
  let m = camera.eyeViewProj[e];
  let rowW = vec3<f32>(m[0].w, m[1].w, m[2].w);
  let w = dot(rowW, c) + m[3].w;
  let near = camera.eyeGate[1u + e];
  let reach = dot(abs(rowW), h);
  let nearest = w - min(r * length(rowW), reach);
  if (!(w - reach > near * 0.5) || !(nearest > near)) { return false; }
  var lo = vec2<f32>(3e38);
  var hi = vec2<f32>(-3e38);
  for (var k = 0u; k < 8u; k = k + 1u) {
    let p = c + vec3<f32>(select(-h.x, h.x, (k & 1u) != 0u), select(-h.y, h.y, (k & 2u) != 0u), select(-h.z, h.z, (k & 4u) != 0u));
    let clip = m * vec4<f32>(p, 1.0);
    let s = vec2<f32>((clip.x / clip.w + 1.0) * ${M(F/2)}, (1.0 - clip.y / clip.w) * ${M(F/2)});
    lo = min(lo, s);
    hi = max(hi, s);
  }
  if (hi.x < 0.0 || hi.y < 0.0 || lo.x > ${M(F)} || lo.y > ${M(F)}) { return true; }
  let c0 = u32(clamp(floor(lo.x), 0.0, ${M(F-1)}));
  let c1 = u32(clamp(floor(hi.x), 0.0, ${M(F-1)}));
  let r0 = u32(clamp(floor(lo.y), 0.0, ${M(F-1)}));
  let r1 = u32(clamp(floor(hi.y), 0.0, ${M(F-1)}));
  if ((c1 - c0 + 1u) * (r1 - r0 + 1u) > ${vZ}u) { return false; }
  let limit = nearest - nearest * ${M(YZ)} - ${M(kZ)};
  let base = e * ${F*F}u;
  for (var row = r0; row <= r1; row = row + 1u) {
    for (var col = c0; col <= c1; col = col + 1u) {
      let i = base + row * ${F}u + col;
      if (!(camera.eyeCells[i >> 2u][i & 3u] < limit)) { return false; }
    }
  }
  return true;
}`,fZ=`fn eyesHide(c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
  let eyes = min(u32(max(camera.eyeGate.x, 0.0)), ${Xz}u);
  if (eyes == 0u) { return false; }
  for (var e = 0u; e < eyes; e = e + 1u) {
    if (!eyeGateHides(e, c, h, r)) { return false; }
  }
  return true;
}`;var Pz="@group(1) @binding(0) var<uniform> phase: u32;",nz=24,BZ=12,n3=BZ*nz,Dq="0.0009765625",UZ=65536,U=16,V=4,VZ=U*3,k=17,y=(1<<k)-1,pz=2147483648,Cz=67108864,p3=67108863,p=1073741824,Mz=536870912,_=22,Iq=532676608,K=4194303,e=Iq>>>_,rZ=`
fn tbl_coneAxis(c: u32) -> vec3f {
  return normalize(vec3f(vec3u(c, c >> 4u, c >> 8u) & vec3u(15u)) - 7.5);
}
`,D=6,C3=2**(30-D),Yz=1073741824,oq=18,Nq=19,iq=20,kz=4096,R=5,Rq=Yz,tZ=536870912,Bq=tZ-1,c=256,rq=64,X=7,L=(1<<X)-1;function O3(z,Z){return z>X&&Z===X-1?z-1:Z}function W3(z){if(z.length<=X)return z.slice();let Z=z.slice(0,X-1);return Z.push(z[z.length-1]),Z}var D3=28,tq=67108864,I3=134217728,o3=tq-1,SZ=1.25,N3=72,i3=44,R3=24+8*X,B3=32,r3=28,lZ=10,Bz=8,PZ="tbl_wear",Sq=(1<<lZ)-1,dz="tbl_eyeWalks",lq=8,t3=16,aq=255;function S3(){return WZ()?Bz:1}function l3(z){return z.still!==!0&&OZ()}function aZ(z,Z){return z%(Bz/Z)*Z}var a3={model:0,origin:16,clipPlane:20,clipPlane2:24,sphere:28,flags:32,previousModel:36,previousOrigin:52,body:56,scale:58,reach:59,hideEye:60,level:64,layers:68,own:69},Lq=1,eq=2,LZ=4,Tq=8,L3=16,yz=32,rz=64,eZ=128,sq=4,Aq=20,Eq=Math.sin(Aq*DZ/180),T=8,TZ=1,xz=2,_q=3,z2=4,Oz=8,Z2=0,q2=2,MZ=4,i=6,$2=2,e3=8,tz=256,Q2=512,J2=1024,sZ=2048,j2=4096,X2=8192,x2=16384,v2=32768,Y2=65536,T3={instance:0,part:1,material:2,flags:3,pipe:4,sortLayer:6,planes:7,color:8,opacity:11,emissive:12,inkA:15,flash:16,hide:19,metalness:20,roughness:21,cover:22,inkB:23,emissiveMap:24,dissolve:27,levelRefused:29,born:30,tie:31,pose:32,previousPose:33,headRow:34,nearHide:35,morphRows:36,morphWeights:37,morphTargets:38,morphPrevious:39,spanFirst:40},k2=1,Sz=2,uz=4,uZ=8,AZ=16,y2=32,lz=64,hZ=128,EZ=256,gZ=512,w=1024,G=2048;function s3(z){return(z&(w|G))!==0}var _Z=4096,F2=8192,K2=16384,f2="0.000003814697265625",U2=64;function V2(z){return`  let tableTie = bitcast<u32>(tableItem.spare.w);
  if (tableTie != 0u) { ${z}.z = ${z}.z * (1.0 + f32(min(tableTie, ${U2}u)) * ${f2}); }`}var P2=32768,M2=65536,A3={flags:0,vertexCount:1,ownIndex:2,ownCount:3,position:4,normal:5,uv:6,uvB:7,color:8,levelCount:9,casterCount:10,ownBounds:11,sphere:12,levels:16,casterLevels:16+4*X,extent:16+8*X,joints:20+8*X,weights:21+8*X,tangent:22+8*X,morphRows:23+8*X},zq=1,cZ=2,GZ=4,HZ=8,bZ=16,E3=32,_3=64,Fz=26,Zz=4294967295,u2=2147483648,J={opaque:0,opaqueDouble:1,cutout:2,cutoutDouble:3,blend:4,overlay:5,viewmodelOpaque:6,viewmodelOpaqueDouble:7,viewmodelCutout:8,viewmodelCutoutDouble:9,viewmodelBlend:10,viewmodelOverlay:11,ink:12};function Zq(z){return z>=J.viewmodelOpaque&&z<=J.viewmodelOverlay?z-J.viewmodelOpaque:z}function h2(z){let Z=Zq(z);return Z===J.cutout||Z===J.cutoutDouble?z-J.cutout:-1}function g2(z){let Z=Zq(z);return Z===J.opaque||Z===J.opaqueDouble?z+J.cutout:-1}function z4(z){let Z=g2(z);return Z<0?h2(z):Z}var qq=13,s=2,Z4=[J.blend,J.overlay,J.viewmodelBlend,J.viewmodelOverlay],q4={none:0,clip:1,near:2},t=0,c2={none:0,sight:1,hides:2},mZ=Mz,$q=4294967294,r=2048,C=12,Kz=1,hz=2,Qq=1,O=1073741824,$4=1,az=2,A=qq,fz=20,Lz=1024,E=qq*Lz/32,d=oZ,Q4=44+E+16*d+4+fz*d,J4={head:0,head2:4,lens:8,texel:12,drawn:14,room:15,roadDrawn:15,texelEye:16,roomSerial:19,floor:20,origin:24,sortRoom:27,near:28,movers:29,roles:30,bits:27,outLane:32,slots:33,layers:34,eye:36,fade:40,stood:44,occluders:44+E,occluderWords:44+E+16*d,casters:44+E+16*d+4},H=`
struct TableInstance {
  model: mat4x4<f32>,
  origin: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  sphere: vec4<f32>,
  flags: vec4<u32>,
  previousModel: mat4x4<f32>,
  previousOrigin: vec4<f32>,
  body: vec4<u32>,
  hideEye: vec4<f32>,
  level: vec4<f32>,
  layers: vec4<u32>,
}
struct TableItem {
  head: vec4<u32>,
  head2: vec4<u32>,
  color: vec4<f32>,
  emissive: vec4<f32>,
  flash: vec4<f32>,
  pbr: vec4<f32>,
  emissiveMap: vec4<f32>,
  spare: vec4<f32>,
  pose: vec4<u32>,
  morph: vec4<u32>,
  span: vec4<u32>,
}
struct TablePart {
  head: vec4<u32>,
  streams: vec4<u32>,
  streams2: vec4<u32>,
  sphere: vec4<f32>,
  levels: array<vec4<u32>, ${X}>,
  casterLevels: array<vec4<u32>, ${X}>,
  extent: vec4<f32>,
  skin: vec4<u32>,
}
`,h=`
struct TableView {
  head: vec4<u32>,
  head2: vec4<u32>,
  lens: vec4<f32>,
  texel: vec4<f32>,
  texelEye: vec4<f32>,
  floor: vec4<f32>,
  spare0: vec4<f32>,
  spare1: vec4<f32>,
  spare2: vec4<f32>,
  eye: vec4<f32>,
  clock: vec4<f32>,
  stood: array<vec4<u32>, ${E/4}>,
  occluders: array<mat4x4<f32>, ${d}>,
  occluderWords: vec4<u32>,
  casters: array<vec4<f32>, ${fz/4*d}>,
}
const NONE = ${Zz}u;
fn tbl_sort_room(n: u32) -> u32 {
  var room = 1u;
  while (room < n) { room = room << 1u; }
  return room;
}
`,ez=`
@group(0) @binding(0) var<uniform> camera: CullCamera;
@group(0) @binding(1) var<uniform> view: TableView;
@group(0) @binding(2) var<storage, read> tableInstances: array<TableInstance>;
@group(0) @binding(3) var<storage, read> tableItems: array<TableItem>;
@group(0) @binding(4) var<storage, read> tableParts: array<TablePart>;
`;function S(z){return`
fn tbl_modelUnder(m: mat4x4<f32>, o: vec4<f32>) -> mat4x4<f32> {
  if (o.w < 0.5 || o.w > 1.5) { return m; }
  var out = m;
  out[3] = vec4<f32>(m[3].xyz + (o.xyz - ${z}), m[3].w);
  return out;
}
fn tbl_shiftUnder(o: vec4<f32>) -> vec3<f32> {
  return select(o.xyz - ${z}, vec3<f32>(0.0), o.w < 0.5 || o.w > 1.5);
}
fn tbl_planeUnder(p: vec4<f32>, o: vec4<f32>) -> vec4<f32> {
  let shift = select(vec3<f32>(0.0), o.xyz - ${z}, o.w > 0.5);
  return vec4<f32>(p.xyz, p.w - dot(p.xyz, shift));
}
fn tbl_ride(a: mat4x4<f32>, m: mat4x4<f32>) -> mat4x4<f32> {
  let r = mat3x3<f32>(a[0].xyz, a[1].xyz, a[2].xyz);
  return mat4x4<f32>(vec4<f32>(r * m[0].xyz, m[0].w), vec4<f32>(r * m[1].xyz, 0.0), vec4<f32>(r * m[2].xyz, m[2].w), vec4<f32>(r * m[3].xyz + a[3].xyz, m[3].w));
}
fn tbl_instanceModel(i: u32) -> mat4x4<f32> {
  let row = tableInstances[i];
  let m = tbl_modelUnder(row.model, row.origin);
  if (m[1].w < 0.5) { return m; }
  let anchor = tableInstances[u32(m[1].w) - 1u];
  return tbl_ride(tbl_modelUnder(anchor.model, anchor.origin), m);
}
fn tbl_previousModel(i: u32) -> mat4x4<f32> {
  let row = tableInstances[i];
  let m = tbl_modelUnder(row.previousModel, row.previousOrigin);
  if (m[1].w < 0.5) { return m; }
  let anchor = tableInstances[u32(m[1].w) - 1u];
  return tbl_ride(tbl_modelUnder(anchor.previousModel, anchor.previousOrigin), m);
}
`}var gz=`
fn tbl_visit(g: u32) -> vec3<u32> {
  let listed = bitcast<u32>(view.spare1.y);
  let n = select(view.head.y, listed, listed != 0u);
  if (g >= n * bitcast<u32>(view.spare1.w)) { return vec3<u32>(NONE); }
  let r = g / n;
  let k = g - r * n;
  let role = bitcast<u32>(view.spare1.z) + r;
  var item = select(k, tbl_near(k), role == 0u);
  if (listed != 0u) { item = moverList[k]; }
  return vec3<u32>(role * view.head2.w + item, item, role);
}
`,cz=`
fn tbl_near(k: u32) -> u32 {
  let at = bitcast<u32>(view.spare1.x) >> 1u;
  if (at == 0u) { return k; }
  let placed = want[at + (k >> 2u)][k & 3u];
  return select(placed - 1u, k, placed == 0u);
}
`,G2=1024;function j4(z=c){return`
${a}
${H}
${h}
${ez}
@group(0) @binding(5) var<storage, read_write> want: array<vec4<u32>>;
${cz}
${S("view.spare0.xyz")}
const RUN = ${G2}u;
const W = ${z}u;
var<workgroup> wgPair: array<vec2<u32>, RUN>;

@compute @workgroup_size(${z})
fn near_main(@builtin(local_invocation_id) lid: vec3<u32>, @builtin(workgroup_id) wid: vec3<u32>) {
  let word = bitcast<u32>(view.spare1.x);
  let first = i32(wid.x * RUN) - i32((word & 1u) * (RUN / 2u));
  let lo = u32(max(first, 0));
  let hi = u32(clamp(first + i32(RUN), 0, i32(view.head.y)));
  for (var i = lid.x; i < RUN; i = i + W) {
    var pair = vec2<u32>(NONE);
    if (lo + i < hi) {
      let item = tbl_near(lo + i);
      let it = tableItems[item];
      let toward = (tbl_instanceModel(it.head.x) * vec4<f32>(tableParts[it.head.y].sphere.xyz, 1.0)).xyz - camera.camPos;
      pair = vec2<u32>(bitcast<u32>(dot(toward, toward)), item);
    }
    wgPair[i] = pair;
  }
  workgroupBarrier();
  for (var k = 2u; k <= RUN; k = k << 1u) {
    for (var j = k >> 1u; j > 0u; j = j >> 1u) {
      for (var i = lid.x; i < RUN; i = i + W) {
        let l = i ^ j;
        if (l > i) {
          let a = wgPair[i];
          let b = wgPair[l];
          if ((b.x < a.x || (b.x == a.x && b.y < a.y)) == ((i & k) == 0u)) {
            wgPair[i] = b;
            wgPair[l] = a;
          }
        }
      }
      workgroupBarrier();
    }
  }
  for (var i = lid.x * 4u; i < RUN; i = i + W * 4u) {
    if (lo + i < hi) {
      want[(word >> 1u) + ((lo + i) >> 2u)] = vec4<u32>(wgPair[i].y, wgPair[i + 1u].y, wgPair[i + 2u].y, wgPair[i + 3u].y) + vec4<u32>(1u);
    }
  }
}
`}var Jq=`
fn tbl_cameraDraws(flags: u32, itemFlags: u32) -> bool {
  if ((itemFlags & ${P2}u) != 0u) { return (itemFlags & ${M2}u) != 0u && (flags & ${LZ}u) != 0u; }
  return (flags & ${eq}u) != 0u;
}
`,jq=`
fn tbl_roleItems() -> u32 {
  let listed = bitcast<u32>(view.spare1.y);
  return select(view.head.y, listed, listed != 0u);
}
fn tbl_roleOfBin(bin: u32) -> u32 {
  let cls = bin % max(view.head.w / max(view.head.z, 1u), 1u);
  return select(1u + (max(cls, ${A}u) - ${A}u) / ${s}u, 0u, cls < ${A}u);
}
fn tbl_roleBlocks(role: u32, block: u32) -> vec2<u32> {
  let n = tbl_roleItems();
  let first = bitcast<u32>(view.spare1.z);
  if (n == 0u || role < first || role >= first + bitcast<u32>(view.spare1.w)) { return vec2<u32>(0u); }
  let r = role - first;
  return vec2<u32>((r * n) / block, ((r + 1u) * n - 1u) / block + 1u);
}
`,Wz="  let scale = sqrt(max(max(dot(model[0].xyz, model[0].xyz), dot(model[1].xyz, model[1].xyz)), dot(model[2].xyz, model[2].xyz)));",Tz="  return ((view.stood[si >> 7u][(si >> 5u) & 3u] >> (si & 31u)) & 1u) != 0u;";function Xq(z){return`var<workgroup> wgBin: array<u32, ${z}>;
var<workgroup> wgChunks: array<u32, ${z}>;
var<workgroup> wgInkBin: array<u32, ${z}>;
fn tbl_sumLeg(bin: u32, tier: u32, lane: u32, block: u32, bins: u32, ink: bool) {
  if (bin == NONE) { return; }
  let key = (bin << 1u) | tier;
  var sum = 0u;
  for (var j = 0u; j < ${z}u; j = j + 1u) {
    if (wgBin[j] == key) {
      if (j > lane || (ink && j == lane)) { return; }
      sum += wgChunks[j];
    }
    if (wgInkBin[j] == key) {
      if (j > lane) { return; }
      sum += wgChunks[j];
    }
  }
  blockSums[(block * 2u + tier) * bins + bin] = sum;
}`}var xq=()=>`fn tbl_stood(cls: u32, pipe: u32) -> bool {
  let si = cls * ${Lz}u + pipe;
${Tz}
}`,vq=()=>`fn tbl_index(list: u32, k: u32) -> u32 {
  if ((list & ${u2}u) == 0u) { return tbl_geo(list + k); }
  return (tbl_geo((list & 0x7fffffffu) + (k >> 1u)) >> ((k & 1u) * 16u)) & 0xffffu;
}`,Yq=()=>`
${Jq}
${KZ}
${fZ}
fn tbl_ownsMemory() -> bool {
  return view.clock.x >= 0.0 && (camera.memoryOwner != 0.0 || view.clock.z > 0.5);
}
${yZ}
${FZ}
fn tbl_inFrustum(c: vec3<f32>, r: f32, nearPad: f32) -> bool {
  for (var k = 0u; k < 4u; k = k + 1u) { if (planeDistance(k, c) < -r) { return false; } }
  if (planeDistance(4u, c) < -(r + nearPad)) { return false; }
  return planeDistance(5u, c) >= -r;
}
fn tbl_level(p: u32, caster: bool, tolerance: f32, scale: f32, held: u32, refused: u32) -> u32 {
  if (!(tolerance > 0.0)) { return NONE; }
  let n = min(select(tableParts[p].streams2.y, tableParts[p].streams2.z, caster), ${X}u);
  for (var k = i32(n) - 1; k >= 0; k = k - 1) {
    let row = select(tableParts[p].levels[k], tableParts[p].casterLevels[k], caster);
    if (row.x == NONE || ((refused >> u32(k)) & 1u) != 0u) { continue; }
    let allow = select(tolerance, tolerance * LEVEL_HELD, held == u32(k));
    if (bitcast<f32>(row.z) * scale <= allow) { return select(NONE, u32(k), row.y < tableParts[p].head.w - 1u); }
  }
  return NONE;
}
fn tbl_padPixelMetres(d: f32, bias: bool) -> f32 {
  let w = view.lens.y;
  var widen = 1.0;
  if (bias && view.lens.z > 0.0 && d > view.lens.w) { widen = min(exp2(view.lens.z), d / view.lens.w); }
  return select(((1.0 - w) * d + w) / view.lens.x, 1.0 / view.lens.x, w >= 1.0) * widen;
}
struct TblJudged {
  keep: bool,
  live: bool,
  shadow: bool,
  viewmodel: bool,
  nearLane: bool,
  posed: bool,
  part: u32,
  instance: u32,
  flags: u32,
  itemFlags: u32,
  level: u32,
  center: vec3<f32>,
  radius: f32,
  leveled: bool,
  held: u32,
}
fn tbl_pastSides(cascade: u32, c: vec3<f32>, r: f32) -> bool {
  let at = cascade * ${fz/4}u;
  let words = view.casters[at + 4u];
  if (words.y < 0.5) { return true; }
  for (var k = 0u; k < 4u; k = k + 1u) {
    let p = view.casters[at + k];
    if (dot(p.xyz, c) + p.w < -(r + words.x)) { return true; }
  }
  return false;
}
fn tbl_judge(slot: u32, item: u32, kind: u32, cascade: u32) -> TblJudged {
  var judged: TblJudged;
  judged.keep = false;
  judged.level = NONE;
  judged.leveled = false;
  let itHead = tableItems[item].head;
  let itemFlags = itHead.w;
  judged.itemFlags = itemFlags;
  if ((itemFlags & 1u) == 0u) { return judged; }
  let instance = itHead.x;
  let rowFlags = tableInstances[instance].flags;
  let flags = rowFlags.x;
  let part = itHead.y;
  let shadow = kind != ${t}u;
  judged.instance = instance;
  judged.flags = flags;
  judged.part = part;
  judged.shadow = shadow;
  var live = (flags & ${Lq}u) != 0u && (flags & ${J2}u) == 0u && (tableInstances[instance].layers.x & bitcast<u32>(view.spare2.z)) != 0u;
  let moving = (flags & ${tz}u) != 0u;
  if (shadow) {
    let layer = view.head2.z;
    let cover = view.floor.y > 0.5;
    live = live && (flags & ${LZ}u) != 0u && (itemFlags & ${y2}u) != 0u;
    live = live && select((flags & ${Tq}u) != 0u, (flags & ${j2}u) == 0u, cover);
    live = live && !(layer == 1u && moving) && !(layer == 2u && !moving) && !(cover && layer == 2u && (flags & ${X2}u) == 0u);
  } else {
    live = live && tbl_cameraDraws(flags, itemFlags) && (itemFlags & ${F2}u) == 0u;
    live = live && !(view.head2.z == 1u && moving) && !(view.head2.z == 2u && !moving);
    if (view.floor.z > 1.5) { live = live && (rowFlags.w & bitcast<u32>(view.floor.w)) != 0u; }
    else if (view.floor.z > 0.5) { live = live && (any(tableInstances[instance].clipPlane != vec4<f32>(0.0)) || any(tableInstances[instance].clipPlane2 != vec4<f32>(0.0))); }
    live = live && (rowFlags.w & bitcast<u32>(view.spare2.x)) == 0u;
  }
  judged.live = live;
  if (!live) { return judged; }
  let model = tbl_instanceModel(instance);
  let modelScale = sqrt(max(max(dot(model[0].xyz, model[0].xyz), dot(model[1].xyz, model[1].xyz)), dot(model[2].xyz, model[2].xyz)));
  let posed = (itemFlags & ${w|G}u) != 0u;
  let bodyWords = tableInstances[instance].body;
  let rowScale = bitcast<f32>(bodyWords.z);
  let scale = select(modelScale, rowScale, rowScale > 0.0);
  let center = (model * vec4<f32>(select(tableParts[part].sphere.xyz, tableInstances[instance].sphere.xyz, posed), 1.0)).xyz;
  let radius = select(tableParts[part].sphere.w * modelScale, tableInstances[instance].sphere.w * modelScale, posed);
  let viewmodel = (flags & ${rz}u) != 0u;
  judged.viewmodel = viewmodel;
  judged.center = center;
  judged.radius = radius;
  judged.posed = posed;
  var keep = true;
  let nearLane = view.floor.z > 1.5;
  judged.nearLane = nearLane;
  if (kind != ${az}u && !viewmodel && !nearLane) { keep = tbl_inFrustum(center, radius, select(camera.camNear, 0.0, shadow)); }
  if (keep && cascade != NONE) { keep = !tbl_pastSides(cascade, center, radius); }
  let reach = bitcast<f32>(bodyWords.w);
  let bodyCenter = (model * vec4<f32>(tableInstances[instance].sphere.xyz, 1.0)).xyz;
  if (keep && reach > 0.0 && !viewmodel && !nearLane && view.eye.w > 0.5 && length(bodyCenter - view.eye.xyz) > reach) { keep = false; }
  if (keep && !shadow && !viewmodel && !nearLane) {
    let exempt = (flags & ${eZ}u) != 0u;
    if ((flags & ${Q2}u) != 0u && (itemFlags & (${Sz}u | ${uz}u)) == 0u && fogHides(center, radius)) { keep = false; }
    if (keep && posed && cascade == NONE && (flags & ${Y2}u) != 0u && eyesHide(center, vec3<f32>(radius), radius)) { keep = false; }
    let bodyRadius = tableInstances[instance].sphere.w * modelScale;
    let key = f32(rowFlags.y);
    if (keep && !exempt && view.floor.x > 0.0 && (camera.focalPixels > 0.0 || camera.orthoPixels > 0.0)) {
      let viewDepth = planeDistance(4u, bodyCenter) + camera.camNear;
      let clipW = camera.projectionDepthScale * viewDepth + camera.projectionDepthOffset;
      let pixelScale = max(camera.focalPixels, camera.orthoPixels) / max(clipW, 1e-4);
      let verdict = (memory[slot].x >> 8u) & 3u;
      let floorPx = view.floor.x * select(1.0, select(1.0 - SIZE_FLOOR_HYSTERESIS, 1.0 + SIZE_FLOOR_HYSTERESIS, verdict == 2u), verdict != 0u);
      let sizeT = clamp((bodyRadius * pixelScale) / floorPx - 1.0, 0.0, 1.0);
      let sizeKeep = sizeT * sizeT * (3.0 - 2.0 * sizeT);
      let stands = cull_hash2D(vec2<f32>(key * 0.7548777, key * 0.5698403)) < sizeKeep;
      if (tbl_ownsMemory()) { memory[slot].x = (memory[slot].x & 0xfffffcffu) | (select(2u, 1u, stands) << 8u); }
      keep = stands;
    }
    if (keep && !exempt && camera.farReach > 0.0) {
      let farT = clamp((length(bodyCenter - camera.camPos) - bodyRadius - camera.farReach) / (camera.farReach * FAR_BAND), 0.0, 1.0);
      let farShare = 1.0 - farT * farT * (3.0 - 2.0 * farT);
      keep = cull_hash2D(vec2<f32>(key * 0.3183099, key * 0.6180339)) < farShare;
    }
  }
  if (!keep) { return judged; }
  var level = NONE;
  let held = (memory[slot].x & 0xffu);
  let heldLevel = select(held - 1u, NONE, held == 0u);
  let casterCut = (itemFlags & ${EZ}u) != 0u;
  let refused = bitcast<u32>(tableItems[item].spare.y);
  if (shadow) {
    var texel = view.texel.x;
    if (cascade != NONE) { texel = view.casters[cascade * ${fz/4}u + 4u].x; }
    else if (view.texel.y > 0.0) { texel = view.texel.y * max(length(center - view.texelEye.xyz) - radius, 0.0); }
    level = tbl_level(part, !casterCut, texel, scale, heldLevel, select(refused & ${L}u, (refused >> 8u) & ${L}u, !casterCut));
    memory[slot].x = (memory[slot].x & 0xffffff00u) | select(level + 1u, 0u, level == NONE);
  } else if (!viewmodel && !nearLane && view.lens.x > 0.0) {
    let levelAt = tableInstances[instance].level;
    let own = max(length(center - camera.camPos) - radius, 0.0);
    let whole = select(own, max(length((model * vec4<f32>(levelAt.xyz, 1.0)).xyz - camera.camPos) - (levelAt.w - 1.0) * modelScale, 0.0), levelAt.w > 0.5);
    let floorMetres = bitcast<f32>(tableInstances[instance].layers.y);
    let mainRefused = refused & ${L}u;
    let wholeMetres = tbl_padPixelMetres(whole, true);
    level = tbl_level(part, false, select(wholeMetres, 0.0, wholeMetres < floorMetres), scale, heldLevel, mainRefused);
    let far = (refused >> 16u) & ${L}u;
    let ownMetres = tbl_padPixelMetres(own, true);
    if (!posed && whole < own && tableParts[part].head.w > 0u && ((far >> level) & 1u) == 0u) {
      level = tbl_level(part, false, select(ownMetres, 0.0, ownMetres < floorMetres), scale, heldLevel, mainRefused | far);
    }
    judged.leveled = true;
    judged.held = held;
  }
  judged.level = level;
  judged.keep = true;
  return judged;
}
`,X4=`
fn tbl_levelHide(word: u32) -> f32 {
  if (word == 0u) { return 0.0; }
  let anchor = bitcast<f32>(word & 0xfffffffcu);
  let rising = (word & ${hz}u) != 0u;
  let beta = clamp(select(anchor - frame.fadeTime, frame.fadeTime - anchor, rising) / ${Vz/1000}, 0.0, 1.0);
  let coverage = beta * beta * (3.0 - 2.0 * beta);
  return select(coverage, -(1.0 - coverage), (word & ${Kz}u) != 0u);
}
`,H2=`
const FADE_S: f32 = ${Vz/1000};
fn tbl_fade(slot: u32, item: u32, chosen: u32, held: u32, itemFlags: u32, drew: bool) -> vec3<u32> {
  let now = view.clock.x;
  var m = memory[slot];
  var code = select(chosen + 1u, 0u, chosen == NONE);
  var other = (m.x >> ${C}u) & 15u;
  var rising = (m.x & ${r}u) != 0u;
  var anchor = bitcast<f32>(m.y);
  var asked = false;
  let pipe = min(tableItems[item].head2.x & 0xffffu, max(view.head.z, 1u) - 1u);
  let blended = (itemFlags & ${Sz}u) != 0u;
  let stood = blended || tbl_stood(select(${J.cutout}u, ${J.cutoutDouble}u, (itemFlags & ${AZ}u) != 0u), pipe);
  if (other != 0u && (now <= 0.0 || !drew || !stood || now >= select(anchor, anchor + FADE_S, rising))) { other = 0u; }
  if (now > 0.0 && drew && code != held) {
    if (other == 0u) {
      let fades = (itemFlags & (${lz}u | ${uz}u)) == 0u && tableItems[item].flash.w == 0.0;
      let listed = blended || view.clock.y > 0.5;
      if (fades && stood && listed) {
        other = held + 1u;
        rising = true;
        anchor = now;
      } else if (fades) {
        code = held;
        asked = stood;
      }
    } else if (code + 1u == other) {
      let beta = clamp(select(anchor - now, now - anchor, rising) / FADE_S, 0.0, 1.0);
      other = held + 1u;
      rising = !rising;
      anchor = select(now + beta * FADE_S, now - beta * FADE_S, rising);
    } else { code = held; }
  }
  let anchorBits = bitcast<u32>(anchor) & 0xfffffffcu;
  m.x = (m.x & ${~(255|r|15<<C)>>>0}u) | code | (other << ${C}u) | select(0u, ${r}u, rising);
  m.y = select(0u, anchorBits, other != 0u);
  memory[slot] = m;
  var word = select(0u, anchorBits | select(0u, ${hz}u, rising), other != 0u);
  if (asked) { word = ${Qq}u; }
  return vec3<u32>(select(code - 1u, NONE, code == 0u), other, word);
}
`;function x4(z=c){return`
${a}
${H}
${h}
${ez}
@group(0) @binding(5) var<storage, read_write> want: array<vec4<u32>>;
@group(0) @binding(6) var<storage, read_write> draws: array<vec4<u32>>;
@group(0) @binding(7) var<storage, read_write> memory: array<vec2<u32>>;
@group(0) @binding(8) var<storage, read_write> blockSums: array<u32>;
@group(0) @binding(9) var<storage, read_write> sortList: array<atomic<u32>>;
@group(0) @binding(10) var<storage, read> moverList: array<u32>;
${Array.from({length:d},(Z,q)=>`@group(0) @binding(${11+q}) var occluderPyramid${q}: texture_2d<f32>;`).join(`
`)}
${gz}
${cz}
${jq}
${S("view.spare0.xyz")}
${iz}
const SIZE_FLOOR_HYSTERESIS: f32 = ${Nz};
const FAR_BAND: f32 = ${Rz};
const LEVEL_HELD: f32 = ${SZ};
${Xq(z)}
var<workgroup> wgOccluder: array<u32, ${z}>;
${Yq()}
${H2}
${xq()}
fn tbl_listOf(part: u32, level: u32, casterList: bool) -> vec3<u32> {
  if (level == NONE) { return vec3<u32>(tableParts[part].head.z, tableParts[part].head.w, 0u); }
  let row = select(tableParts[part].levels[level], tableParts[part].casterLevels[level], casterList);
  return vec3<u32>(row.x, row.y, level + select(1u, ${X+1}u, casterList));
}

fn standing_pyramid(k: u32, p: vec2<i32>, level: u32) -> f32 {
  switch (k) {
${Array.from({length:d},(Z,q)=>`    case ${q}u: { return textureLoad(occluderPyramid${q}, p, i32(level)).r; }`).join(`
`)}
    default: { return 1.0; }
  }
}
${NZ}
@compute @workgroup_size(${z})
fn select_main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>, @builtin(workgroup_id) wid: vec3<u32>) {
  let visit = tbl_visit(gid.x);
  let slot = visit.x;
  let item = visit.y;
  let caster = visit.z >= 1u;
  let cascade = select(NONE, max(visit.z, 1u) - 1u, caster);
  let kind = select(view.head.x, ${az}u, caster);
  let shapes = max(view.head.z, 1u);
  let roleClasses = select(0u, ${A}u + (max(visit.z, 1u) - 1u) * ${s}u, caster);
  let bins = view.head.w;
  let classes = bins / shapes;
  for (var b = lid.x; b < 2u * bins; b = b + ${z}u) { blockSums[wid.x * 2u * bins + b] = 0u; }
  storageBarrier();
  var bin = NONE;
  var inkBin = NONE;
  var chunks = 0u;
  var spanFirst = 0u;
  var spanCount = 0u;
  var listCode = 0u;
  var drawn = 0u;
  var inkDrawn = 0u;
  var slotted = false;
  var slotDraw = vec4<u32>(NONE, 0u, 0u, 0u);
  var slotBins = vec2<u32>(NONE, NONE);
  var occluderMark = 0u;
  if (item < view.head.y) {
    let born = bitcast<u32>(tableItems[item].spare.z) & ${e}u;
    let mark = draws[2u * slot].y;
    if (((mark >> ${_}u) & ${e}u) == born && ((bitcast<u32>(view.texel.z) >> visit.z) & 1u) != 0u) {
      drawn = select(0u, 1u, (mark & ${p}u) != 0u);
      inkDrawn = select(0u, 1u, (mark & ${Mz}u) != 0u);
    }
    let itHead = tableItems[item].head;
    slotted = bitcast<u32>(view.spare2.y) != 0u && (itHead.w & ${K2}u) != 0u && kind != ${t}u;
    slotDraw = vec4<u32>(NONE, 0u, itHead.y, itHead.x);
    let judged = tbl_judge(slot, item, kind, cascade);
    var kept = judged.keep;
    if (kept && caster && ((view.occluderWords.x >> cascade) & 1u) != 0u && (judged.flags & ${tz}u) != 0u) {
      occluderMark = 1u;
      if (standing_hides(cascade, view.occluders[cascade], judged.center, judged.radius)) {
        occluderMark = 257u;
        kept = false;
      }
    }
    if (kept) {
          let part = judged.part;
          let instance = judged.instance;
          let flags = judged.flags;
          let itemFlags = judged.itemFlags;
          let shadow = judged.shadow;
          let viewmodel = judged.viewmodel;
          let nearLane = judged.nearLane;
          let posed = judged.posed;
          let center = judged.center;
          var level = judged.level;
          var fade = vec3<u32>(level, 0u, 0u);
          if (judged.leveled && tbl_ownsMemory()) { fade = tbl_fade(slot, item, level, judged.held, itemFlags, drawn != 0u); }
          else if (judged.leveled && view.clock.x < 0.0) {
            fade.x = select(judged.held - 1u, NONE, judged.held == 0u);
            if (select(level + 1u, 0u, level == NONE) != judged.held) { inkDrawn = 1u; }
          }
          level = fade.x;
          let fading = fade.y != 0u;
          let casterCut = (itemFlags & ${EZ}u) != 0u;
          let list = tbl_listOf(part, level, shadow && !casterCut);
          let indexAddr = list.x;
          let count = list.y;
          listCode = list.z;
          var otherList = vec3<u32>(NONE, 0u, 0u);
          if (fading) { otherList = tbl_listOf(part, select(fade.y - 2u, NONE, fade.y == 1u), false); }
          let tris = min(count / 3u, ${K}u);
          let otherTris = min(otherList.y / 3u, ${K}u);
          let mirrored = select(0u, 0x80000000u, (flags & ${yz}u) != 0u);
          let pipeWord = tableItems[item].head2.x;
          let pipe = min(select(pipeWord & 0xffffu, pipeWord >> 16u, shadow), shapes - 1u);
          var cls = 0u;
          if (shadow) {
            cls = select(0u, 1u, casterCut || (posed && tableItems[item].flash.w != 0.0));
          } else {
            let double = (itemFlags & ${AZ}u) != 0u;
            let blend = (itemFlags & ${Sz}u) != 0u;
            let overlay = (itemFlags & ${uz}u) != 0u;
            let clipped = any(tableInstances[instance].clipPlane != vec4<f32>(0.0)) || any(tableInstances[instance].clipPlane2 != vec4<f32>(0.0));
            let cuts = (itemFlags & (${uZ}u | ${hZ}u)) != 0u || tableItems[item].flash.w != 0.0 || tableItems[item].pbr.z != 0.0 || bitcast<f32>(tableItems[item].pose.w) != 0.0 || clipped || nearLane || fading;
            if (overlay) { cls = ${J.overlay}u; }
            else if (blend) { cls = ${J.blend}u; }
            else if (cuts) {
              cls = select(${J.cutout}u, ${J.cutoutDouble}u, double);
              let near = bitcast<f32>(tableItems[item].pose.w);
              let wordsCut = (itemFlags & (${uZ}u | ${hZ}u)) == 0u && tableItems[item].flash.w == 0.0 && !fading && near >= 0.0 && near < 1.0 && view.floor.z < 0.5 && tableItems[item].pbr.z < ${iZ}.0;
              let section = select(0u, ${J.viewmodelOpaque}u, viewmodel);
              let plain = select(${J.opaque}u, ${J.opaqueDouble}u, double);
              if (wordsCut && !tbl_stood(cls + section, pipe) && tbl_stood(plain + section, pipe)) { cls = plain; }
            }
            else { cls = select(${J.opaque}u, ${J.opaqueDouble}u, double); }
            if (viewmodel) { cls = cls + ${J.viewmodelOpaque}u; }
            if ((itemFlags & ${lz}u) != 0u && !blend && !overlay) { inkBin = pipe * classes + ${J.ink}u; }
          }
          if (slotted) {
            slotDraw = vec4<u32>(indexAddr, tris | select(0u, 0x80000000u, (flags & ${yz}u) != 0u), part, instance);
            slotBins = vec2<u32>(pipe * classes + roleClasses + cls, inkBin);
            inkBin = NONE;
          } else {
          spanCount = (tableParts[part].head.y + ${(1<<D)-1}u) >> ${D}u;
          spanFirst = tableItems[item].span.x;
          draws[2u * slot] = vec4<u32>(indexAddr, tris | (born << ${_}u) | mirrored, part, instance);
          draws[2u * slot + 1u] = vec4<u32>(otherList.x, otherTris | mirrored, select(0u, otherList.z + 1u, fading), fade.z);
          if (spanFirst == NONE) {
            spanCount = 0u;
            inkBin = NONE;
          }
          else {
          let heldChunks = min((tris + ${U-1}u) >> ${V}u, ${y}u);
          chunks = min(heldChunks + ((otherTris + ${U-1}u) >> ${V}u), ${y}u);
          bin = pipe * classes + roleClasses + cls;
          if (!shadow && (cls == ${J.blend}u || cls == ${J.overlay}u || cls == ${J.viewmodelBlend}u || cls == ${J.viewmodelOverlay}u)) {
            let at = atomicAdd(&sortList[0], 1u);
            if (at < view.head2.w) {
              let depth = max(dot(camera.planes[4].xyz, center) + camera.planes[4].w, 0.0);
              let order = u32(clamp(bitcast<i32>(tableItems[item].head2.y) + 32768, 0, 65535));
              atomicStore(&sortList[2u + at * 3u], (bin << 16u) | order);
              atomicStore(&sortList[3u + at * 3u], 0xffffffffu - bitcast<u32>(depth));
              atomicStore(&sortList[4u + at * 3u], slot);
            }
          }
          }
          }
    } else {
      draws[2u * slot].y = 0u;
      draws[2u * slot + 1u].z = 0u;
    }
    want[slot] = vec4<u32>(select((bin << ${k}u) | chunks, NONE, bin == NONE), select((inkBin << ${k}u) | chunks, NONE, inkBin == NONE), spanFirst, spanCount | (inkDrawn << 26u) | (listCode << 27u) | (drawn << 31u));
    if (slotted) {
      draws[2u * slot] = slotDraw;
      draws[2u * slot + 1u] = vec4<u32>(NONE, 0u, 0u, 0u);
      want[slot] = vec4<u32>(select(slotBins.x << ${k}u, NONE, slotBins.x == NONE), select(slotBins.y << ${k}u, NONE, slotBins.y == NONE), NONE, listCode << 27u);
    }
  }
  let tier = 1u - drawn;
  let inkTier = 1u - inkDrawn;
  wgBin[lid.x] = select((bin << 1u) | tier, NONE, bin == NONE);
  wgChunks[lid.x] = chunks;
  wgInkBin[lid.x] = select((inkBin << 1u) | inkTier, NONE, inkBin == NONE);
  wgOccluder[lid.x] = occluderMark;
  workgroupBarrier();
  if (lid.x == 0u && view.occluderWords.x != 0u) {
    var tested = 0u;
    var dropped = 0u;
    for (var j = 0u; j < ${z}u; j = j + 1u) {
      tested = tested + (wgOccluder[j] & 0xffu);
      dropped = dropped + (wgOccluder[j] >> 8u);
    }
    if (tested > 0u) {
      let counts = 2u + 3u * tbl_sort_room(view.head2.w);
      atomicAdd(&sortList[counts], tested);
      atomicAdd(&sortList[counts + 1u], dropped);
    }
  }
  tbl_sumLeg(bin, tier, lid.x, wid.x, bins, false);
  tbl_sumLeg(inkBin, inkTier, lid.x, wid.x, bins, true);
}
`}function v4(z=c){return`
${a}
${H}
${h}
${ez}
@group(0) @binding(5) var<storage, read> roads: array<vec4<u32>>;
@group(0) @binding(6) var<storage, read> blocks: array<vec4<u32>>;
@group(0) @binding(7) var<storage, read_write> memory: array<vec2<u32>>;
@group(0) @binding(8) var<storage, read_write> counts: array<atomic<u32>>;
@group(0) @binding(9) var<storage, read_write> survivors: array<u32>;
@group(0) @binding(10) var<storage, read> moverList: array<u32>;
${gz}
fn tbl_near(k: u32) -> u32 { return k; }
${S("view.spare0.xyz")}
${iz}
const SIZE_FLOOR_HYSTERESIS: f32 = ${Nz};
const FAR_BAND: f32 = ${Rz};
const LEVEL_HELD: f32 = ${SZ};
const ROAD_PAD_METRES: f32 = ${sq.toFixed(1)};
const ROAD_PAD_SINE: f32 = ${Eq.toFixed(6)};
const FADE_S: f32 = ${Vz/1000};
const NO_LEVEL: u32 = 0xfffffffeu;
${Yq()}
fn tbl_stoodAt(si: u32) -> bool {
${Tz}
}
fn tbl_padKeeps(j: TblJudged) -> bool {
  if (j.viewmodel) { return true; }
  let reach = j.radius * (1.0 + ROAD_PAD_SINE) + ROAD_PAD_METRES + ROAD_PAD_SINE * length(j.center - camera.camPos);
  for (var k = 0u; k < 4u; k = k + 1u) { if (planeDistance(k, j.center) < -reach) { return false; } }
  if ((j.flags & ${eZ}u) != 0u) { return true; }
  let model = tbl_instanceModel(j.instance);
${Wz}
  let bodyCenter = (model * vec4<f32>(tableInstances[j.instance].sphere.xyz, 1.0)).xyz;
  let bodyRadius = tableInstances[j.instance].sphere.w * scale;
  let distance = length(bodyCenter - camera.camPos);
  if (view.floor.x > 0.0 && (camera.focalPixels > 0.0 || camera.orthoPixels > 0.0)) {
    let viewDepth = max(planeDistance(4u, bodyCenter) + camera.camNear - ROAD_PAD_SINE * distance - ROAD_PAD_METRES, camera.camNear);
    let clipW = camera.projectionDepthScale * viewDepth + camera.projectionDepthOffset;
    let pixelScale = max(camera.focalPixels, camera.orthoPixels) / max(clipW, 1e-4);
    if (bodyRadius * pixelScale <= view.floor.x * (1.0 - SIZE_FLOOR_HYSTERESIS)) { return false; }
  }
  return !(camera.farReach > 0.0 && distance - bodyRadius - ROAD_PAD_METRES >= camera.farReach * (1.0 + FAR_BAND));
}
fn tbl_padLevels(j: TblJudged, item: u32) -> vec2<u32> {
  if (j.viewmodel || j.nearLane || !(view.lens.x > 0.0)) { return vec2<u32>(NONE); }
  let model = tbl_instanceModel(j.instance);
${Wz}
  let d = max(length(j.center - camera.camPos) - j.radius, 0.0);
  let near = max(d - ROAD_PAD_METRES * 0.5, 0.0);
  let far = d + ROAD_PAD_METRES * 0.5;
  let refused = bitcast<u32>(tableItems[item].spare.y) & ${L}u;
  return vec2<u32>(tbl_level(j.part, false, tbl_padPixelMetres(near, false), scale, NONE, refused), tbl_level(j.part, false, tbl_padPixelMetres(far, true), scale, NONE, refused));
}
fn tbl_ordinal(b: vec4<u32>, level: u32) -> u32 {
  return select((b.w >> (level * 4u)) & 15u, 0u, level == NONE);
}
fn tbl_levelOfOrdinal(b: vec4<u32>, o: u32) -> u32 {
  if (o == 0u) { return NONE; }
  for (var k = 0u; k < ${X}u; k = k + 1u) { if (((b.w >> (k * 4u)) & 15u) == o) { return k; } }
  return NONE;
}
fn tbl_run(block: u32, level: u32) -> u32 {
  if (block == NONE) { return NONE; }
  let b = blocks[block];
  if (b.z == 0u) { return NONE; }
  return b.x + tbl_ordinal(b, level);
}
fn tbl_bit(r: u32, word: u32) {
  if (r == NONE) { return; }
  atomicOr(&counts[bitcast<u32>(view.spare0.w) + (r >> 5u) * ${Oz}u + word], 1u << (r & 31u));
}
fn tbl_drawn(r: u32) -> bool {
  if (r == NONE) { return false; }
  let at = bitcast<u32>(view.texel.w);
  if (at == NONE) { return true; }
  return ((atomicLoad(&counts[at + (r >> 5u)]) >> (r & 31u)) & 1u) != 0u;
}
fn tbl_place(block: u32, level: u32, held: u32, drew: bool) -> u32 {
  if (block == NONE) { return NO_LEVEL; }
  let b = blocks[block];
  if (b.z == 0u) { return NO_LEVEL; }
  let want = tbl_ordinal(b, level);
  if (tbl_drawn(b.x + want)) { return level; }
  tbl_bit(b.x + want, ${i}u);
  atomicAdd(&counts[${xz}u], 1u);
  if (drew && tbl_drawn(b.x + tbl_ordinal(b, held))) { return held; }
  var top = 0u;
  for (var k = 0u; k < ${X}u; k = k + 1u) { top = max(top, (b.w >> (k * 4u)) & 15u); }
  for (var step = 1u; step <= ${X}u; step = step + 1u) {
    if (want >= step && tbl_drawn(b.x + want - step)) { return tbl_levelOfOrdinal(b, want - step); }
    if (want + step <= top && tbl_drawn(b.x + want + step)) { return tbl_levelOfOrdinal(b, want + step); }
  }
  return NO_LEVEL;
}
fn tbl_occupy(block: u32, levels: vec2<u32>) {
  if (block == NONE) { return; }
  let b = blocks[block];
  if (b.z == 0u) { return; }
  var top = 0u;
  for (var k = 0u; k < ${X}u; k = k + 1u) { top = max(top, (b.w >> (k * 4u)) & 15u); }
  let first = min(tbl_ordinal(b, levels.x), top);
  let last = min(tbl_ordinal(b, levels.y), top);
  for (var k = 0u; k <= ${X}u; k = k + 1u) {
    let o = first + k;
    if (o > last) { break; }
    tbl_bit(b.x + o, ${Z2}u);
  }
}
fn tbl_append(block: u32, level: u32, item: u32, word: u32, fold: bool, exact: bool) {
  if (block == NONE) { return; }
  let b = blocks[block];
  if (b.z == 0u) { return; }
  let ordinal = tbl_ordinal(b, level);
  let r = select(b.x + ordinal, b.x, fold);
  let run = ${T}u + r * 4u;
  let at = atomicAdd(&counts[run], 1u);
  if (at < b.z) {
    let s = 2u * (b.y + select(ordinal * b.z, 0u, fold) + at);
    survivors[s] = item;
    survivors[s + 1u] = word;
  }
  if (fold) { atomicMax(&counts[run + 1u], 15u - ordinal); }
  if (exact && !fold) { tbl_bit(r, ${q2}u); }
}
fn tbl_codeLevel(code: u32) -> u32 {
  return select(code - 1u, NONE, code == 0u);
}

@compute @workgroup_size(${z})
fn fetch_main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x == 0u) { atomicStore(&counts[0], 0u); }
  let visit = tbl_visit(gid.x);
  let slot = visit.x;
  let item = visit.y;
  if (item >= view.head.y) { return; }
  let judged = tbl_judge(slot, item, view.head.x, NONE);
  var m = memory[slot];
  let gated = !judged.shadow && view.head2.z != 0u && view.floor.z < 0.5;
  let owns = tbl_ownsMemory();
  let road = roads[2u * item];
  let twin = roads[2u * item + 1u];
  if (judged.keep && judged.shadow) { tbl_append(road.z, judged.level, item, 0u, true, false); }
  var kept = 0u;
  if (judged.keep && !judged.shadow) {
    var leg = road.x;
    if (judged.nearLane && road.w != NONE) { leg = road.w; }
    let drew = (m.x & 0x10000u) != 0u;
    let heldCode = m.x & 0xffu;
    let held = tbl_codeLevel(heldCode);
    var code = select(judged.level + 1u, 0u, judged.level == NONE);
    var other = (m.x >> ${C}u) & 15u;
    var rising = (m.x & ${r}u) != 0u;
    var anchor = bitcast<f32>(m.y);
    let now = view.clock.x;
    let fading = gated && owns && now > 0.0 && judged.leveled;
    let fades = fading && twin.x != NONE && (judged.itemFlags & (${lz}u | ${uz}u)) == 0u && tableItems[item].flash.w == 0.0;
    if (other != 0u && (!fading || !drew || (twin.x != NONE && !tbl_stoodAt(twin.y)) || now >= select(anchor, anchor + FADE_S, rising))) { other = 0u; }
    if (fading && drew && code != heldCode) {
      if (other == 0u) {
        let twinHeld = tbl_run(twin.x, held);
        let twinNew = tbl_run(twin.x, tbl_codeLevel(code));
        let stood = fades && tbl_stoodAt(twin.y);
        if (stood && tbl_drawn(twinHeld) && tbl_drawn(twinNew)) {
          other = heldCode + 1u;
          rising = true;
          anchor = now;
        } else if (stood) {
          tbl_bit(twinHeld, ${i}u);
          tbl_bit(twinNew, ${i}u);
          tbl_bit(tbl_run(leg, tbl_codeLevel(code)), ${i}u);
          atomicAdd(&counts[${xz}u], 1u);
          code = heldCode;
        } else if (fades) {
          code = heldCode;
        }
      } else if (code + 1u == other) {
        let beta = clamp(select(anchor - now, now - anchor, rising) / FADE_S, 0.0, 1.0);
        other = heldCode + 1u;
        rising = !rising;
        anchor = select(now + beta * FADE_S, now - beta * FADE_S, rising);
      } else { code = heldCode; }
    }
    let level = tbl_codeLevel(code);
    let otherLevel = select(other - 2u, NONE, other <= 1u);
    if (other != 0u && !(tbl_drawn(tbl_run(twin.x, level)) && tbl_drawn(tbl_run(twin.x, otherLevel)))) { other = 0u; }
    if (other != 0u) {
      let anchorBits = bitcast<u32>(anchor) & 0xfffffffcu;
      let base = anchorBits | select(0u, ${hz}u, rising);
      tbl_append(twin.x, level, item, base | select(0u, ${Kz}u, rising), false, true);
      tbl_append(twin.x, otherLevel, item, base | select(${Kz}u, 0u, rising), false, true);
      tbl_bit(tbl_run(leg, level), ${i}u);
      atomicAdd(&counts[${TZ}u], 1u);
      kept = 0x10000u;
    } else {
      let placed = tbl_place(leg, level, held, drew);
      if (placed != NO_LEVEL) {
        code = select(placed + 1u, 0u, placed == NONE);
        tbl_append(leg, placed, item, 0u, false, gated);
        kept = 0x10000u;
      }
    }
    let inkRun = tbl_run(road.y, tbl_codeLevel(code));
    if (kept != 0u && inkRun != NONE) {
      if (tbl_drawn(inkRun)) {
        tbl_append(road.y, tbl_codeLevel(code), item, 0u, false, gated);
        kept = kept | 0x20000u;
      } else {
        tbl_bit(inkRun, ${i}u);
        atomicAdd(&counts[${xz}u], 1u);
      }
    }
    if (owns && judged.leveled) {
      m.x = (m.x & ${~(255|r|15<<C)>>>0}u) | code | (other << ${C}u) | select(0u, ${r}u, rising);
      m.y = select(0u, bitcast<u32>(anchor) & 0xfffffffcu, other != 0u);
    }
  }
  if (gated && judged.live) {
    if (view.head2.z == 1u && (judged.keep || tbl_padKeeps(judged))) {
      let levels = tbl_padLevels(judged, item);
      tbl_occupy(road.x, levels);
      tbl_occupy(road.y, levels);
    }
    let liveLevel = tbl_codeLevel(m.x & 0xffu);
    tbl_bit(tbl_run(road.x, liveLevel), ${MZ}u);
    tbl_bit(tbl_run(road.y, liveLevel), ${MZ}u);
  }
  m.x = (m.x & 0xff00ffffu) | kept;
  if (!judged.shadow) { memory[slot] = m; }
}
`}function Y4(){return (Y4=$c0C(2)).apply(this,arguments)}var kq=`fn occ_texel(i: u32) -> f32 {
  return occPyramid[i];
}`;function k4(z=c){return`
${H}
${h}
${oz}
@group(0) @binding(0) var<uniform> view: TableView;
@group(0) @binding(1) var<uniform> occView: OcclusionView;
@group(0) @binding(2) var<storage, read> tableInstances: array<TableInstance>;
@group(0) @binding(3) var<storage, read> tableItems: array<TableItem>;
@group(0) @binding(4) var<storage, read> tableParts: array<TablePart>;
@group(0) @binding(5) var<storage, read_write> want: array<vec4<u32>>;
@group(0) @binding(6) var<storage, read_write> marks: array<vec4<u32>>;
@group(0) @binding(7) var<storage, read_write> blockSums: array<u32>;
@group(0) @binding(8) var<storage, read> occPyramid: array<f32>;
@group(0) @binding(9) var<storage, read> moverList: array<u32>;
${Pz}
${gz}
${cz}
${S("view.spare0.xyz")}
${kq}
${Jq}
${Xq(z)}

${xq()}

@compute @workgroup_size(${z})
fn occlude_main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>, @builtin(workgroup_id) wid: vec3<u32>) {
  let visit = tbl_visit(gid.x);
  let slot = visit.x;
  let item = visit.y;
  let bins = view.head.w;
  let classes = bins / max(view.head.z, 1u);
  for (var b = lid.x; b < 2u * bins; b = b + ${z}u) { blockSums[wid.x * 2u * bins + b] = 0u; }
  storageBarrier();
  var bin = NONE;
  var inkBin = NONE;
  var chunks = 0u;
  var tier = 1u;
  var inkTier = 1u;
  if (item < view.head.y) {
    let mine = want[slot];
    tier = select(1u, 0u, (mine.w & ${pz}u) != 0u);
    inkTier = select(1u, 0u, (mine.w & ${Cz}u) != 0u);
    let it = tableItems[item];
    let flags = tableInstances[it.head.x].flags.x;
    let kept = mine.x != NONE;
    var shown = kept;
    if (kept) {
      bin = mine.x >> ${k}u;
      chunks = mine.x & ${y}u;
      if (mine.y != NONE) { inkBin = mine.y >> ${k}u; }
      let cls = bin % classes;
      let viewmodel = (flags & ${rz}u) != 0u;
      let posed = (it.head.w & ${w|G}u) != 0u;
      let part = it.head.y;
      let centre = tableParts[part].sphere.xyz;
      let extent = tableParts[part].extent.xyz;
      let born = bitcast<u32>(it.spare.z) & ${e}u;
      if (phase == ${c2.hides}u) {
        let sight = marks[2u * slot].y;
        let sightDrew = visit.z == 0u && (sight & ${p}u) != 0u && ((sight >> ${_}u) & ${e}u) == born;
        let tested = visit.z == 0u && !viewmodel && !posed && (cls <= ${J.cutoutDouble}u || cls == ${J.blend}u) && inkBin == NONE;
        var hidden = false;
        if ((tested || sightDrew) && occView.hides != 0u) {
          let b = occ_box(centre - extent, centre + extent, occView.viewProj * tbl_instanceModel(it.head.x));
          hidden = b.state == OCC_OUTSIDE || (b.state == OCC_PROJECTED && occ_hidden(b));
        }
        if (sightDrew) {
          shown = false;
          marks[2u * slot].y = (sight & ~${mZ}u) | select(0u, ${mZ}u, hidden);
        } else if (tested) {
          shown = !hidden;
        }
      } else {
        let row = tableInstances[it.head.x];
        let cut = it.flash.w != 0.0 || it.pbr.z != 0.0 || any(row.clipPlane != vec4<f32>(0.0)) || any(row.clipPlane2 != vec4<f32>(0.0)) || it.head2.w != NONE;
        let eye = marks[2u * slot].y;
        let eyeBorn = ((eye >> ${_}u) & ${e}u) == born;
        let eyeDrew = (eye & ${p}u) != 0u && eyeBorn;
        let sightLaid = (mine.w & ${pz}u) != 0u;
        let left = (mine.w & ${Cz}u) != 0u;
        let sightDrew = sightLaid && !left;
        let still = marks[2u * slot + 1u].z == 0u;
        if (visit.z == 0u && sightLaid && eyeBorn) { marks[2u * slot].y = eye | ${p}u; }
        shown = !viewmodel && !posed && !cut && (cls == ${J.opaque}u || cls == ${J.opaqueDouble}u) && inkBin == NONE && (eyeDrew || sightDrew) && !left && still && tbl_stood(cls, bin / classes);
        inkBin = NONE;
      }
    }
    if (!shown) {
      bin = NONE;
      inkBin = NONE;
      chunks = 0u;
    }
    if (kept) { want[slot] = vec4<u32>(select((bin << ${k}u) | chunks, NONE, bin == NONE), select((inkBin << ${k}u) | chunks, NONE, inkBin == NONE), mine.z, mine.w); }
  }
  wgBin[lid.x] = select((bin << 1u) | tier, NONE, bin == NONE);
  wgChunks[lid.x] = chunks;
  wgInkBin[lid.x] = select((inkBin << 1u) | inkTier, NONE, inkBin == NONE);
  workgroupBarrier();
  tbl_sumLeg(bin, tier, lid.x, wid.x, bins, false);
  tbl_sumLeg(inkBin, inkTier, lid.x, wid.x, bins, true);
}
`}function y4(z,Z=c){return`
${a}
${H}
${h}
${oz}
@group(0) @binding(0) var<uniform> view: TableView;
@group(0) @binding(1) var<uniform> camera: CullCamera;
@group(0) @binding(2) var<uniform> occView: OcclusionView;
@group(0) @binding(3) var<storage, read> draws: array<vec4<u32>>;
@group(0) @binding(4) var<storage, read_write> chunks: array<vec4<u32>>;
@group(0) @binding(5) var<storage, read> binStarts: array<u32>;
@group(0) @binding(6) var<storage, read> tableInstances: array<TableInstance>;
@group(0) @binding(7) var<storage, read> tablePage: array<u32>;
@group(0) @binding(8) var<storage, read> occPyramid: array<f32>;
@group(0) @binding(9) var<storage, read_write> ranks: array<u32>;
@group(0) @binding(10) var<storage, read_write> stats: array<atomic<u32>>;
${S("view.spare0.xyz")}
${kq}
var<workgroup> wgKept: array<u32, ${Z}>;
var<workgroup> wgBin: array<u32, ${Z}>;
var<workgroup> wgHidden: array<u32, ${Z}>;

${w2(z)}
fn tbl_chunkList(entry: vec4<u32>) -> vec2<u32> {
  let slot = (entry.x & ${O-1}u) - 1u;
  let d = draws[2u * slot];
  if ((entry.x & ${O}u) != 0u) { return vec2<u32>(d.z + min(((d.y & ${K}u) + ${U-1}u) >> ${V}u, ${y}u), draws[2u * slot + 1u].y & ${K}u); }
  return vec2<u32>(select(d.z, d.w, (entry.x >> 31u) != 0u), d.y & ${K}u);
}

fn tbl_binOf(s: u32) -> u32 {
  var lo = 0u;
  var hi = view.head.w;
  loop {
    if (hi - lo <= 1u) { break; }
    let mid = (lo + hi) >> 1u;
    if (binStarts[mid] <= s) { lo = mid; } else { hi = mid; }
  }
  return lo;
}

${rZ}
fn tbl_chunkFacesAway(m: mat4x4<f32>, centre: vec3f, bound: f32, cone: u32) -> bool {
  let s = f32(cone >> 12u) / 14.0;
  let i = mat3x3f(cross(m[1].xyz, m[2].xyz), cross(m[2].xyz, m[0].xyz), cross(m[0].xyz, m[1].xyz));
  let det = dot(m[0].xyz, i[0]);
  let v = centre - (camera.camPos - m[3].xyz) * i / det;
  let far = length(v);
  return s <= 1.0 && abs(det) > 1e-3 * length(m[0].xyz) * length(m[1].xyz) * length(m[2].xyz) && dot(tbl_coneAxis(cone), v) > s * far + bound * (1.0 + s) + 1e-3 * far;
}

fn tbl_chunkKept(s: u32, bin: u32) -> bool {
  let entry = chunks[s];
  if (entry.w == NONE || view.head.x == ${az}u || view.floor.z > 1.5) { return true; }
  let slot = (entry.x & ${O-1}u) - 1u;
  if (slot >= view.head2.w) { return true; }
  if ((tableInstances[entry.z].flags.x & ${rz|x2}u) != 0u) { return true; }
  let ink = (entry.x >> 31u) != 0u;
  let at = tbl_pageWord(entry.w) + (s - tbl_chunkList(entry).x) * 4u;
  let centre = vec3<f32>(bitcast<f32>(tablePage[at]), bitcast<f32>(tablePage[at + 1u]), bitcast<f32>(tablePage[at + 2u]));
  let word = tablePage[at + 3u];
  let bound = bitcast<f32>((word & 0xffffu) << 15u);
  let model = tbl_instanceModel(entry.z);
${Wz}
  let c = (model * vec4<f32>(centre, 1.0)).xyz;
  let r = bound * scale;
  for (var k = 0u; k < 4u; k = k + 1u) { if (dot(camera.planes[k].xyz, c) + camera.planes[k].w < -r) { return false; } }
  let nearPad = select(camera.camNear, 0.0, view.head.x != ${t}u);
  if (dot(camera.planes[4].xyz, c) + camera.planes[4].w < -(r + nearPad)) { return false; }
  if (dot(camera.planes[5].xyz, c) + camera.planes[5].w < -r) { return false; }
  let cls = bin % (view.head.w / max(view.head.z, 1u));
  if (!ink && bitcast<u32>(view.spare2.w) != 0u && (cls == ${J.opaque}u || cls == ${J.cutout}u) && tbl_chunkFacesAway(model, centre, bound, word >> 16u)) { return false; }
  if (occView.hides == 0u || ink) { return true; }
  let b = occ_box(c - vec3<f32>(r), c + vec3<f32>(r), occView.viewProj);
  return !(b.state == OCC_OUTSIDE || (b.state == OCC_PROJECTED && occ_hidden(b)));
}

@compute @workgroup_size(${Z})
fn chunks_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_index) lane: u32) {
  let block = wid.y * ${I}u + wid.x;
  let s = block * ${Z}u + lane;
  let total = binStarts[view.head.w];
  var kept = 0u;
  var bin = 0u;
  var hidden = 0u;
  if (s < total) {
    bin = tbl_binOf(s) + 1u;
    if (tbl_chunkKept(s, bin - 1u)) { kept = 1u; }
    else {
      let entry = chunks[s];
      chunks[s] = vec4<u32>(entry.xyz, ${$q}u);
      let list = tbl_chunkList(entry);
      hidden = min(${U}u, list.y - min(list.y, (s - list.x) * ${U}u));
    }
  }
  wgKept[lane] = kept;
  wgBin[lane] = bin;
  wgHidden[lane] = hidden;
  workgroupBarrier();
  for (var off = 1u; off < ${Z}u; off = off << 1u) {
    var prior = 0u;
    var priorHidden = 0u;
    if (lane >= off) { prior = wgKept[lane - off]; priorHidden = wgHidden[lane - off]; }
    workgroupBarrier();
    wgKept[lane] = wgKept[lane] + prior;
    wgHidden[lane] = wgHidden[lane] + priorHidden;
    workgroupBarrier();
  }
  if (s < total) { ranks[s] = wgKept[lane] - kept; }
  if (lane == ${Z-1}u) { ranks[view.head2.y + block] = wgKept[lane]; }
  if (bin != 0u && (lane == ${Z-1}u || wgBin[min(lane + 1u, ${Z-1}u)] != bin)) {
    let first = max(binStarts[bin - 1u], block * ${Z}u) - block * ${Z}u;
    let sum = wgHidden[lane] - select(0u, wgHidden[max(first, 1u) - 1u], first > 0u);
    if (sum != 0u) { atomicSub(&stats[bin - 1u], sum); }
  }
}
`}var B=32;function F4(z){return Math.ceil(Math.max(0,z)/B)}var yq=`
fn tbl_blockAt(k: u32, tier: u32, b: u32) -> u32 {
  let bins = view.head.w;
  return blockSums[(k * 2u + tier) * bins + b] + blockSums[((view.head2.x + k / ${B}u) * 2u + tier) * bins + b];
}
`;function K4(z=c,Z=rq){return`
${h}
@group(0) @binding(0) var<uniform> view: TableView;
@group(0) @binding(1) var<storage, read_write> blockSums: array<u32>;
@group(0) @binding(2) var<storage, read_write> binStarts: array<u32>;
@group(0) @binding(3) var<storage, read_write> stats: array<u32>;
@group(0) @binding(4) var<storage, read_write> sortList: array<u32>;
@group(0) @binding(5) var<storage, read_write> cut: array<u32>;
@group(0) @binding(6) var<storage, read_write> ranks: array<u32>;
@group(0) @binding(7) var<storage, read_write> args: array<u32>;
${Pz}

var<workgroup> scanRuns: array<vec2<u32>, ${z}>;

${jq}
${yq}
fn tbl_fits(b: u32, tier: u32, total: u32, room: u32) -> u32 {
  if (total <= room) { return total; }
  let walked = tbl_roleBlocks(tbl_roleOfBin(b), ${Z}u);
  var lo = walked.x;
  var hi = min(walked.y, view.head2.x) - 1u;
  while (lo < hi) {
    let mid = (lo + hi + 1u) >> 1u;
    if (tbl_blockAt(mid, tier, b) <= room) { lo = mid; } else { hi = mid - 1u; }
  }
  return tbl_blockAt(lo, tier, b);
}

fn scan_blocks(wid: vec3<u32>, lid: vec3<u32>) {
  let bins = view.head.w;
  let blocks = view.head2.x;
  let b = wid.x * ${z}u + lid.x;
  let first = wid.y * ${B}u;
  if (b >= bins || first >= blocks) { return; }
  let walked = tbl_roleBlocks(tbl_roleOfBin(b), ${Z}u);
  var drawn = 0u;
  var newcomers = 0u;
  for (var i = 0u; i < ${B}u; i = i + 1u) {
    let k = first + i;
    if (k >= blocks) { break; }
    if (k < walked.x || k >= walked.y) { continue; }
    let at = k * 2u * bins + b;
    let d = blockSums[at];
    blockSums[at] = drawn;
    drawn = drawn + d;
    let n = blockSums[at + bins];
    blockSums[at + bins] = newcomers;
    newcomers = newcomers + n;
  }
  let at = (blocks + wid.y) * 2u * bins + b;
  blockSums[at] = drawn;
  blockSums[at + bins] = newcomers;
}

fn scan_segments(wid: vec3<u32>, lid: vec3<u32>) {
  let bins = view.head.w;
  let blocks = view.head2.x;
  let b = wid.x * ${z}u + lid.x;
  if (b >= bins) { return; }
  let held = bins + 1u;
  let fresh = held + bins;
  let segments = (blocks + ${B-1}u) / ${B}u;
  var drawn = 0u;
  var newcomers = 0u;
  for (var g = 0u; g < segments; g = g + 1u) {
    let at = (blocks + g) * 2u * bins + b;
    let d = blockSums[at];
    blockSums[at] = drawn;
    drawn = drawn + d;
    let n = blockSums[at + bins];
    blockSums[at + bins] = newcomers;
    newcomers = newcomers + n;
  }
  binStarts[held + b] = drawn;
  binStarts[fresh + b] = newcomers;
  stats[b] = 0u;
}

fn scan_compact(lane: u32) {
  let bins = view.head.w;
  let total = binStarts[bins];
  let cap = view.head2.y;
  let blocks = (total + ${z-1}u) / ${z}u;
  var carry = 0u;
  for (var base = 0u; base < (cap + ${z-1}u) / ${z}u; base = base + ${z}u) {
    let b = base + lane;
    var count = 0u;
    if (b < blocks) { count = ranks[cap + b]; }
    scanRuns[lane].x = count;
    workgroupBarrier();
    for (var off = 1u; off < ${z}u; off = off << 1u) {
      var prior = 0u;
      if (lane >= off) { prior = scanRuns[lane - off].x; }
      workgroupBarrier();
      scanRuns[lane].x = scanRuns[lane].x + prior;
      workgroupBarrier();
    }
    if (b < blocks) { ranks[cap + b] = carry + scanRuns[lane].x - count; }
    carry = carry + scanRuns[${z-1}u].x;
    workgroupBarrier();
  }
  storageBarrier();
  for (var b = lane; b < bins; b = b + ${z}u) {
    let s0 = binStarts[b];
    let s1 = binStarts[b + 1u];
    var p0 = carry;
    var p1 = carry;
    if (s0 < total) { p0 = ranks[cap + s0 / ${z}u] + ranks[s0]; }
    if (s1 < total) { p1 = ranks[cap + s1 / ${z}u] + ranks[s1]; }
    args[b * ${R}u] = (p1 - p0) * ${VZ}u;
    args[b * ${R}u + 1u] = 1u;
    args[b * ${R}u + 2u] = p0 * ${VZ}u;
    args[b * ${R}u + 3u] = 0u;
    args[b * ${R}u + 4u] = 0u;
  }
}

@compute @workgroup_size(${z})
fn scan_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>) {
  switch (phase) {
  case 0u: { scan_blocks(wid, lid); }
  case 1u: { scan_segments(wid, lid); }
  case 3u: { scan_compact(lid.x); }
  default: {
  let bins = view.head.w;
  let capacity = view.head2.y;
  let room = min(bitcast<u32>(view.texel.w), capacity);
  let held = bins + 1u;
  let fresh = held + bins;
  let per = (bins + ${z-1}u) / ${z}u;
  let lo = min(lid.x * per, bins);
  let hi = min(lo + per, bins);
  var mine = vec2<u32>(0u);
  for (var b = lo; b < hi; b = b + 1u) { mine = mine + vec2<u32>(binStarts[held + b], binStarts[fresh + b]); }
  scanRuns[lid.x] = mine;
  workgroupBarrier();
  for (var off = 1u; off < ${z}u; off = off << 1u) {
    var prior = vec2<u32>(0u);
    if (lid.x >= off) { prior = scanRuns[lid.x - off]; }
    workgroupBarrier();
    scanRuns[lid.x] = scanRuns[lid.x] + prior;
    workgroupBarrier();
  }
  let asked = scanRuns[${z-1}u];
  var before = scanRuns[lid.x] - mine;
  let newRoom = room - min(asked.x, room);
  var laid = 0u;
  for (var b = lo; b < hi; b = b + 1u) {
    let drawn = binStarts[held + b];
    let newcomers = binStarts[fresh + b];
    let d = tbl_fits(b, 0u, drawn, capacity - min(before.x, capacity));
    let n = tbl_fits(b, 1u, newcomers, newRoom - min(before.y, newRoom));
    binStarts[held + b] = d;
    binStarts[fresh + b] = n;
    laid = laid + d + n;
    before = before + vec2<u32>(drawn, newcomers);
  }
  workgroupBarrier();
  scanRuns[lid.x] = vec2<u32>(laid, 0u);
  workgroupBarrier();
  for (var off = 1u; off < ${z}u; off = off << 1u) {
    var prior = 0u;
    if (lid.x >= off) { prior = scanRuns[lid.x - off].x; }
    workgroupBarrier();
    scanRuns[lid.x].x = scanRuns[lid.x].x + prior;
    workgroupBarrier();
  }
  var start = scanRuns[lid.x].x - laid;
  for (var b = lo; b < hi; b = b + 1u) {
    binStarts[b] = start;
    start = start + binStarts[held + b] + binStarts[fresh + b];
  }
  if (lid.x == ${z-1}u) {
    binStarts[bins] = scanRuns[${z-1}u].x;
    stats[bins] = asked.x + asked.y;
    stats[bins + 1u] = 0u;
    stats[bins + 2u] = 0u;
    let total = asked.x + asked.y;
    if (total > room) {
      let serial = bitcast<u32>(view.texelEye.w);
      if (serial > cut[0]) {
        cut[0] = serial;
        cut[1] = total;
      } else if (serial == cut[0]) {
        cut[1] = max(cut[1], total);
      }
    }
    let tail = arrayLength(&stats) - 2u;
    stats[tail] = cut[1];
    stats[tail + 1u] = cut[0];
    let counts = 2u + 3u * tbl_sort_room(view.head2.w);
    stats[bins + 1u] = sortList[counts];
    stats[bins + 2u] = sortList[counts + 1u];
    sortList[counts] = 0u;
    sortList[counts + 1u] = 0u;
  }
  }
  }
}
`}function f4(z=c,Z=z){let q=[];for(let Q=z>>1;Q>=1;Q>>=1)q.push(Q);let $=Math.ceil(2*y*z/Z);return`
${h}
${H}
@group(0) @binding(0) var<uniform> view: TableView;
@group(0) @binding(1) var<storage, read> want: array<vec4<u32>>;
@group(0) @binding(2) var<storage, read_write> draws: array<vec4<u32>>;
@group(0) @binding(3) var<storage, read> blockSums: array<u32>;
@group(0) @binding(4) var<storage, read> binStarts: array<u32>;
@group(0) @binding(5) var<storage, read_write> chunks: array<vec4<u32>>;
@group(0) @binding(6) var<storage, read_write> stats: array<atomic<u32>>;
@group(0) @binding(7) var fades: texture_storage_2d<r32uint, write>;
@group(0) @binding(8) var<storage, read> tableParts: array<TablePart>;
@group(0) @binding(9) var<storage, read> moverList: array<u32>;
@group(0) @binding(10) var<storage, read_write> sortList: array<u32>;
${Pz}
${gz}
${cz}
${yq}
var<workgroup> wgWant: array<vec2<u32>, ${z}>;
var<workgroup> wgTier: array<vec2<u32>, ${z}>;
var<workgroup> wgLaid: array<vec2<u32>, ${z}>;
var<workgroup> wgCount: array<vec4<u32>, ${z}>;
var<workgroup> wgHead: array<vec4<u32>, ${z}>;
var<workgroup> wgRun: array<vec4<u32>, ${z}>;
var<workgroup> wgFade: array<vec4<u32>, ${z}>;
var<workgroup> wgChunkAt: array<u32, ${z}>;

fn tbl_sorted(bin: u32, classes: u32) -> bool {
  let cls = bin % classes;
  return cls == ${J.blend}u || cls == ${J.overlay}u || cls == ${J.viewmodelBlend}u || cls == ${J.viewmodelOverlay}u;
}
fn tbl_boundsOf(part: u32, code: u32) -> u32 {
  if (code >= ${X+1}u) { return tableParts[part].casterLevels[code - ${X+1}u].w; }
  if (code >= 1u) { return tableParts[part].levels[code - 1u].w; }
  return tableParts[part].streams2.w;
}

fn tbl_chunkOwner(j: u32) -> u32 {
  var t = 0u;
${q.map((Q)=>`  t = select(t, t + ${Q}u, wgChunkAt[t + ${Q}u] <= j);`).join(`
`)}
  return t;
}

fn emit_step(lid: vec3<u32>, wid: vec3<u32>) {
  let own = lid.x < ${z}u;
  let visit = tbl_visit(select(NONE, wid.x * ${z}u + lid.x, own));
  let slot = visit.x;
  let item = visit.y;
  let bins = view.head.w;
  let classes = bins / max(view.head.z, 1u);
  let held = bins + 1u;
  let capacity = view.head2.y;
  let shadow = view.head.x != ${t}u || visit.z >= 1u;
  var mine = vec4<u32>(NONE, NONE, 0u, 0u);
  if (item < view.head.y) { mine = want[slot]; }
  let kept = item < view.head.y && mine.x != NONE && mine.z != NONE;
  let inked = kept && mine.y != NONE;
  let bin0 = mine.x >> ${k}u;
  let bin1 = mine.y >> ${k}u;
  let chunks0 = mine.x & ${y}u;
  let chunks1 = mine.y & ${y}u;
  let tier0 = select(1u, 0u, (mine.w & ${pz}u) != 0u);
  let tier1 = select(1u, 0u, (mine.w & ${Cz}u) != 0u);
  if (own) {
    wgWant[lid.x] = select(vec2<u32>(NONE), mine.xy, kept);
    wgTier[lid.x] = vec2<u32>(tier0, tier1);
  }
  workgroupBarrier();
  var before0 = 0u;
  var before1 = 0u;
  if (own) {
    for (var j = 0u; j < ${z}u; j = j + 1u) {
      let other = wgWant[j];
      let ot = wgTier[j];
      let earlier = j < lid.x;
      let hasX = other.x != NONE;
      let hasY = other.y != NONE;
      let binX = other.x >> ${k}u;
      let binY = other.y >> ${k}u;
      let chunksX = other.x & ${y}u;
      let chunksY = other.y & ${y}u;
      if (earlier) {
        before0 = before0 + select(0u, chunksX, hasX && binX == bin0 && ot.x == tier0) + select(0u, chunksY, hasY && binY == bin0 && ot.y == tier0);
        before1 = before1 + select(0u, chunksX, hasX && binX == bin1 && ot.x == tier1) + select(0u, chunksY, hasY && binY == bin1 && ot.y == tier1);
      }
    }
  }
  let at0 = tbl_blockAt(wid.x, tier0, select(0u, bin0, kept)) + before0;
  let at1 = tbl_blockAt(wid.x, tier1, select(0u, bin1, inked)) + before1;
  let laid0 = kept && at0 + chunks0 <= binStarts[held + tier0 * bins + bin0];
  let laid1 = inked && at1 + chunks1 <= binStarts[held + tier1 * bins + bin1];
  let runs0 = laid0 && !(!shadow && tbl_sorted(bin0, classes));
  var d = vec4<u32>(0u);
  var e = vec4<u32>(0u);
  var count = vec4<u32>(0u, 0u, 0u, slot + 1u);
  if (kept) {
    d = draws[2u * slot];
    e = draws[2u * slot + 1u];
    count = vec4<u32>((d.y & ${K}u) + select(0u, e.y & ${K}u, e.z != 0u), 0u, select(0u, chunks0, runs0) + select(0u, chunks1, laid1), slot + 1u);
  }
  if (own) {
    wgLaid[lid.x] = vec2<u32>(select(0u, 1u, laid0), select(0u, 1u, laid1));
    wgCount[lid.x] = count;
  }
  workgroupBarrier();
  var gauge0 = 0u;
  var gauge1 = 0u;
  var last0 = true;
  var last1 = true;
  var chunkAt = 0u;
  if (own) {
    for (var j = 0u; j < ${z}u; j = j + 1u) {
      let other = wgWant[j];
      let l = wgLaid[j];
      let c = wgCount[j];
      let earlier = j < lid.x;
      let later = j > lid.x;
      let binX = other.x >> ${k}u;
      let binY = other.y >> ${k}u;
      let x0 = l.x != 0u && binX == bin0;
      let y0 = l.y != 0u && binY == bin0;
      let x1 = l.x != 0u && binX == bin1;
      let y1 = l.y != 0u && binY == bin1;
      if (earlier) { chunkAt = chunkAt + c.z; }
      gauge0 = gauge0 + select(0u, c.x, x0) + select(0u, c.x, y0);
      gauge1 = gauge1 + select(0u, c.x, x1) + select(0u, c.x, y1);
      if (later && (x0 || y0)) { last0 = false; }
      if (later && (x1 || y1)) { last1 = false; }
    }
  }
  var head = vec4<u32>(0u);
  var run = vec4<u32>(0u, 0u, 0u, NONE);
  var fade = vec4<u32>(NONE, 0u, NONE, NONE);
  if (kept) {
    let part = d.z;
    let instance = d.w;
    head = vec4<u32>(item + 1u, mine.z, part, instance);
    run.w = tbl_boundsOf(part, (mine.w >> 27u) & 15u);
    if (e.z != 0u) {
      fade = vec4<u32>(0u, e.w, min(((d.y & ${K}u) + ${U-1}u) >> ${V}u, ${y}u), tbl_boundsOf(part, e.z - 1u));
      if (laid0) { atomicAdd(&stats[bins + 1u], 1u); }
    }
    let fadeAt = vec2<u32>(item % ${kz}u, item / ${kz}u);
    if (!shadow && fadeAt.y < textureDimensions(fades).y) { textureStore(fades, vec2<i32>(fadeAt), vec4<u32>(select(0u, e.w, e.z != 0u), 0u, 0u, 0u)); }
    if (e.z == 0u && e.w == ${Qq}u) { atomicAdd(&stats[bins + 2u], 1u); }
    if (laid0 && last0) { atomicAdd(&stats[bin0], gauge0); }
    if (laid1 && last1 && bin1 != bin0) { atomicAdd(&stats[bin1], gauge1); }
    if (runs0) {
      let first = binStarts[bin0] + select(binStarts[held + bin0], 0u, tier0 == 0u) + at0;
      d.z = first;
      run.x = first;
      run.y = chunks0;
    }
    if (laid1) {
      let first = binStarts[bin1] + select(binStarts[held + bin1], 0u, tier1 == 0u) + at1;
      d.w = first;
      run.z = first;
    }
    d.y = d.y | select(0u, ${p}u, laid0) | select(0u, ${Mz}u, laid1);
    draws[2u * slot] = d;
  }
  if (own) {
    wgHead[lid.x] = head;
    wgRun[lid.x] = run;
    wgFade[lid.x] = fade;
    wgChunkAt[lid.x] = chunkAt;
  }
  workgroupBarrier();
  let chunkTotal = wgChunkAt[${z-1}u] + wgCount[${z-1}u].z;
  for (var k = 0u; k < ${$}u; k = k + 1u) {
    let j = k * ${Z}u + lid.x;
    if (j >= chunkTotal) { break; }
    let t = tbl_chunkOwner(j);
    let r = wgRun[t];
    let f = wgFade[t];
    let local = j - wgChunkAt[t];
    let ink = local >= r.y;
    let at = select(r.x + local, r.z + local - r.y, ink);
    if (at < capacity) {
      let h = wgHead[t];
      let otherSide = !ink && local >= f.z;
      chunks[at] = vec4<u32>(wgCount[t].w | select(0u, 0x80000000u, ink) | select(0u, ${O}u, otherSide), h.y, h.w, select(r.w, f.w, otherSide));
    }
  }
}
${b2(Z)}
@compute @workgroup_size(${Z})
fn emit_main(@builtin(local_invocation_id) lid: vec3<u32>, @builtin(workgroup_id) wid: vec3<u32>) {
  if (phase == 0u) { emit_step(lid, wid); } else { order_step(lid); }
}
`}function b2(z){let Z=[];for(let $=1;$<z;$<<=1)Z.push($);let q=($,Q)=>Z.map((j)=>`  {
    var v = ${$}[lid.x];
    if (lid.x >= ${j}u) { v = ${Q("v",`${$}[lid.x - ${j}u]`)}; }
    workgroupBarrier();
    ${$}[lid.x] = v;
    workgroupBarrier();
  }`).join(`
`);return`
fn tbl_key(i: u32) -> vec3<u32> {
  return vec3<u32>(sortList[2u + i * 3u], sortList[3u + i * 3u], sortList[4u + i * 3u]);
}
fn tbl_before(a: vec3<u32>, b: vec3<u32>) -> bool {
  if (a.x != b.x) { return a.x < b.x; }
  if (a.y != b.y) { return a.y < b.y; }
  return a.z < b.z;
}
fn tbl_put(i: u32, k: vec3<u32>) {
  sortList[2u + i * 3u] = k.x;
  sortList[3u + i * 3u] = k.y;
  sortList[4u + i * 3u] = k.z;
}

var<workgroup> orderCount: u32;
var<workgroup> orderSum: array<u32, ${z}>;
var<workgroup> orderBase: array<u32, ${z}>;

fn order_step(lid: vec3<u32>) {
  if (lid.x == 0u) { orderCount = min(sortList[0], view.head2.w); }
  let n = workgroupUniformLoad(&orderCount);
  var size = 1u;
  while (size < n) { size = size << 1u; }
  var room = 1u;
  while (room < bitcast<u32>(view.spare0.w)) { room = room << 1u; }
  for (var i = n + lid.x; i < size; i = i + ${z}u) { tbl_put(i, vec3<u32>(NONE)); }
  storageBarrier();
  workgroupBarrier();
  for (var k = 2u; k <= room; k = k << 1u) {
    for (var j = k >> 1u; j > 0u; j = j >> 1u) {
      if (k <= size) {
        for (var i = lid.x; i < size; i = i + ${z}u) {
          let l = i ^ j;
          if (l > i) {
            let a = tbl_key(i);
            let b = tbl_key(l);
            let ascending = (i & k) == 0u;
            if (select(tbl_before(a, b), tbl_before(b, a), ascending)) {
              tbl_put(i, b);
              tbl_put(l, a);
            }
          }
        }
      }
      storageBarrier();
      workgroupBarrier();
    }
  }
  let per = (n + ${z-1}u) / ${z}u;
  let first = min(n, lid.x * per);
  let end = min(n, first + per);
  var sum = 0u;
  for (var i = first; i < end; i = i + 1u) {
    let slot = sortList[4u + i * 3u];
    var laid = 0u;
    if ((draws[2u * slot].y & ${p}u) != 0u) { laid = 0x80000000u | (want[slot].x & ${y}u); }
    sortList[3u + i * 3u] = laid;
    sum = sum + (laid & ${y}u);
  }
  orderSum[lid.x] = sum;
  workgroupBarrier();
${q("orderSum",($,Q)=>`${$} + ${Q}`)}
  let before = orderSum[lid.x] - sum;
  var at = before;
  var began = 0u;
  for (var i = first; i < end; i = i + 1u) {
    if (i == 0u || (sortList[2u + (i - 1u) * 3u] >> 16u) != (sortList[2u + i * 3u] >> 16u)) { began = at; }
    at = at + (sortList[3u + i * 3u] & ${y}u);
  }
  orderBase[lid.x] = began;
  workgroupBarrier();
${q("orderBase",($,Q)=>`max(${$}, ${Q})`)}
  at = before;
  began = select(0u, orderBase[max(lid.x, 1u) - 1u], lid.x > 0u);
  for (var i = first; i < end; i = i + 1u) {
    let b = sortList[2u + i * 3u] >> 16u;
    if (i == 0u || (sortList[2u + (i - 1u) * 3u] >> 16u) != b) { began = at; }
    let laid = sortList[3u + i * 3u];
    let count = laid & ${y}u;
    if (laid != 0u) {
      let slot = sortList[4u + i * 3u];
      let place = binStarts[b] + at - began;
      var d = draws[2u * slot];
      d.z = place;
      draws[2u * slot] = d;
      let w = want[slot];
      let fading = draws[2u * slot + 1u].z != 0u;
      let held = select(count, min(((d.y & ${K}u) + ${U-1}u) >> ${V}u, ${y}u), fading);
      for (var c = 0u; c < count; c = c + 1u) {
        chunks[place + c] = vec4<u32>((slot + 1u) | select(0u, ${O}u, c >= held), w.z, 0u, NONE);
      }
    }
    at = at + count;
  }
  if (lid.x == 0u) { sortList[0] = 0u; }
}
`}var Uz=X+1,n={copies:0,triangles:1,draws:2,levelTriangles:2+Uz},m2=2+Uz*2;function U4(){return (U4=$c0C(3)).apply(this,arguments)}var I=32768;function V4(z){return[Math.min(z,I),Math.ceil(z/I),1]}function zz(z){return(z-1)*2**Fz}function w2(z){return`fn tbl_pageWord(address: u32) -> u32 {
  if ((address >> ${Fz}u) == ${z-1}u) { return address & 0x3ffffffu; }
  return address - ${zz(z)}u;
}`}function W(z,Z,q=1,$=z-1){let Q=z-1,j=q===1?"tbl_geo":`tbl_geo${q}`,v=q===1?"u32":`vec${q}<u32>`,Y=(f,x)=>q===1?`${f}[${x}]`:`${v}(${Array.from({length:q},(l,g)=>`${f}[(${x}) + ${g}u]`).join(", ")})`,P=Array.from({length:Math.min($,Q)},(f,x)=>`    case ${x}u: { return ${Y(Z(x),"w")}; }`).join(`
`);return`fn ${j}(address: u32) -> ${v} {
  if (address >= ${zz(z)}u) {
    if (address == ${Zz}u) { return ${v}(0u); }
    if ((address >> ${Fz}u) == ${Q}u) { return ${Y(Z(Q),"address & 0x3ffffffu")}; }
    return ${Y(Z(Q),`address - ${zz(z)}u`)};
  }
  let w = address & 0x3ffffffu;
  switch (address >> ${Fz}u) {
${P}
    default: { return ${v}(0u); }
  }
}`}function sz(z,Z,q,$=q-1){return`
${Array.from({length:q},(j,v)=>`@group(${z}) @binding(${Z+v}) var<storage, read> tableSlab${v}: array<u32>;`).join(`
`)}
${W(q,(j)=>`tableSlab${j}`,1,$)}
${W(q,(j)=>`tableSlab${j}`,2,$)}
${W(q,(j)=>`tableSlab${j}`,3,$)}
fn tbl_geoF(address: u32) -> f32 {
  return bitcast<f32>(tbl_geo(address));
}
${vq()}
`}function P4(z,Z=c){return`
${h}
@group(0) @binding(0) var<uniform> view: TableView;
@group(0) @binding(1) var<storage, read> draws: array<vec4<u32>>;
@group(0) @binding(2) var<storage, read> chunks: array<vec4<u32>>;
@group(0) @binding(3) var<storage, read> binStarts: array<u32>;
@group(0) @binding(4) var<storage, read_write> indices: array<u32>;
@group(0) @binding(5) var<storage, read> ranks: array<u32>;
${sz(0,6,z)}

@compute @workgroup_size(${Z})
fn expand_main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_index) lane: u32) {
  let thread = (wid.y * ${I}u + wid.x) * ${Z}u + lane;
  //${U}
  let s = thread >> ${V}u;
  if (s >= binStarts[view.head.w]) { return; }
  let entry = chunks[s];
  if (entry.w == ${$q}u) { return; }
  let slot = (entry.x & ${O-1}u) - 1u;
  let held = draws[2u * slot];
  var first = select(held.z, held.w, (entry.x >> 31u) != 0u);
  var d = held;
  let leaving = (entry.x & ${O}u) != 0u;
  if (leaving) {
    first = held.z + min(((held.y & ${K}u) + ${U-1}u) >> ${V}u, ${y}u);
    d = draws[2u * slot + 1u];
  }
  let t = ((s - first) << ${V}u) + (thread & ${U-1}u);
  let base = (entry.y << ${D}u) | select(0u, ${Yz}u, leaving);
  var c = vec3<u32>(base);
  if (t < (d.y & ${K}u)) {
    let w = t * 3u;
    if (d.x != NONE) { c = vec3<u32>(base + tbl_index(d.x, w), base + tbl_index(d.x, w + 1u), base + tbl_index(d.x, w + 2u)); }
    else { c = vec3<u32>(base + w, base + w + 1u, base + w + 2u); }
    if ((d.y >> 31u) != 0u) { c = c.xzy; }
  }
  let place = ranks[view.head2.y + s / ${Z}u] + ranks[s];
  let at = ((place << ${V}u) + (thread & ${U-1}u)) * 3u;
  indices[at] = c.x;
  indices[at + 1u] = c.y;
  indices[at + 2u] = c.z;
}
`}var M4=4,wZ=2147483648;function u4(a){return (u4=$c0C(4)).call(this,a)}function h4(a){return (h4=$c0C(5)).call(this,a)}var d2={position:0,normal:1,uv:2,color:3,joints:4,weights:5,item:6,uvB:8,fade:9},n2=[{stride:12,stepMode:"vertex",attributes:[["position","float32x3",0]]},{stride:4,stepMode:"vertex",attributes:[["normal","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["uv","float32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["uvB","float32x2",0]]},{stride:4,stepMode:"vertex",attributes:[["color","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["joints","uint32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["weights","uint32x2",0]]},{stride:4*$2,stepMode:"instance",attributes:[["item","uint32",0],["fade","uint32",4]]}],dZ=1024,Dz=64,p2=65535;function g4(a){return (g4=$c0C(6)).call(this,a)}var Iz=2147483648,u=63,Fq=4,nZ=4,C2=1+2*X,pZ=4;function c4(){return (c4=$c0C(7)).call(this)}function Kq(z,Z,q,$=!1,Q=!0,j=!0,v=Z-1){let Y=`@group(${z}) @binding(4) var<storage, read> tablePageWords: array<u32>;
fn tbl_pageWord(address: u32) -> u32 {
  return tablePageWords[address];
}
fn tbl_glassF(address: u32) -> f32 {
  return bitcast<f32>(tablePageWords[address]);
}`,P=`@group(${z}) @binding(3) var<storage, read> tableSpans: array<u32>;
@group(${z}) @binding(${oq}) var tableFades: texture_2d<u32>;
fn tbl_fadeWord(item: u32, leaving: bool) -> u32 {
  let at = vec2<u32>(item % ${kz}u, item / ${kz}u);
  let rows = textureDimensions(tableFades, 0).y;
  let word = select(0u, textureLoad(tableFades, vec2<i32>(vec2<u32>(at.x, min(at.y, rows - 1u))), 0).x, at.y < rows);
  let to = ((word & ${hz}u) != 0u) != leaving;
  return select(0u, word | select(0u, ${Kz}u, to), word != 0u);
}
${sz(z,5,Z,v)}
fn tbl_glassF(address: u32) -> f32 {
  return tbl_geoF(address);
}`,f=Z===0?Y:P,x="";if(!$&&Q)x=Z===0?Vq((l,g)=>`vec${g}<u32>(${Array.from({length:g},(qz,o)=>`tbl_pageWord(${l} + ${o}u)`).join(", ")})`):Mq;else if(!$&&Z!==0)x=Pq;return`
${H}
@group(${z}) @binding(0) var<storage, read> tableInstances: array<TableInstance>;
@group(${z}) @binding(1) var<storage, read> tableItems: array<TableItem>;
@group(${z}) @binding(2) var<storage, read> tableParts: array<TablePart>;
${f}
${$?"":`@group(${z}) @binding(${O2(Z)}) var<storage, read> tablePoses: array<mat4x4<f32>>;`}
${S(q)}
${$?W2:Uq}${!$&&j?I2:""}
${x}
`}function vz(z){if(z!==0)return["@builtin(vertex_index) tableVertexIndex: u32","@builtin(instance_index) tableDirect: u32"];let Z={position:"vec3<f32>",normal:"u32",uv:"vec2<f32>",uvB:"vec2<f32>",color:"u32",joints:"vec2<u32>",weights:"vec2<u32>",item:"u32",fade:"u32"};return[...n2.flatMap((q)=>q.attributes.map(([$])=>`@location(${d2[$]}) tableIn_${$}: ${Z[$]}`)),"@builtin(vertex_index) tableIn_vertex: u32"]}function O2(z){return 5+z}var fq=`
struct TableSkinVertex {
  joints: vec4<u32>,
  weights: vec4<f32>,
}
struct TableEyeRows {
  rows: vec4<u32>,
  hide: vec4<f32>,
  head: vec4<f32>,
}
`,W2=`${fq}fn tbl_motionShown(it: TableItem, inst: TableInstance) -> bool {
  return (inst.flags.x & ${sZ}u) != 0u;
}
`,D2=`
fn tbl_poseRows(it: TableItem, previous: bool, s: TableSkinVertex) -> mat4x4<f32> {
  let row = select(it.pose.x, it.pose.y, previous);
  if ((it.head.w & ${G}u) != 0u) { return tablePoses[row]; }
  return tbl_skinBlend(row, s);
}
fn tbl_poseModel(it: TableItem, inst: TableInstance, model: mat4x4<f32>, posed: mat4x4<f32>, previous: bool, shift: vec3<f32>) -> mat4x4<f32> {
  var rowModel = inst.model;
  if (previous) { rowModel = inst.previousModel; }
  if ((inst.flags.x & ${v2}u) == 0u || rowModel[1].w >= 0.5) { return model * posed; }
  let w = vec4f(0, 0, 0, 1) * posed;
  return posed + mat4x4f(vec4f(shift * w.x, 0.0), vec4f(shift * w.y, 0.0), vec4f(shift * w.z, 0.0), vec4f(shift * w.w, 0.0));
}
fn tbl_viewNearHide(it: TableItem, inst: TableInstance, viewEye: vec3<f32>, now: vec3<f32>) -> f32 {
  let hide = bitcast<f32>(it.pose.w);
  if (hide == 0.0 || inst.hideEye.w < 0.5) { return 0.0; }
  let shift = select(vec3f(), inst.origin.xyz - now, inst.origin.w > 0.5);
  return select(0.0, hide, distance(inst.hideEye.xyz + shift, viewEye) < 0.01);
}
fn tbl_motionShown(it: TableItem, inst: TableInstance) -> bool {
  if ((inst.flags.x & ${sZ}u) == 0u) { return false; }
  if ((it.head.w & ${w|G}u) == 0u) { return true; }
  return (tablePoses[it.pose.y] * vec4f(0, 0, 0, 1)).w > 0.5;
}
`,I2=`override ${dz} = true;
fn tbl_rowJoint(flagged: mat4x4f, joint: u32) -> f32 {
  let lane = joint / ${nz}u;
  if (lane >= ${BZ}u) { return 0.0; }
  let column = lane / 4u;
  let picked = flagged * vec4f(f32(column == 0u), f32(column == 1u), f32(column == 2u), f32(column == 3u));
  let at = lane % 4u;
  let flags = u32(dot(picked, vec4f(f32(at == 0u), f32(at == 1u), f32(at == 2u), f32(at == 3u))));
  return f32((flags >> (joint % ${nz}u)) & 1u);
}
fn tbl_eyeOf(joints: vec4<u32>, headRow: u32, hide: f32) -> TableEyeRows {
  if (!${dz} || !(hide < 0.0) || headRow == 0xffffffffu) { return TableEyeRows(); }
  let head = tablePoses[headRow];
  let count = u32((head * vec4f(0, 0, 0, 1)).w) / ${UZ}u;
  let flags = vec4f(tbl_rowJoint(head, joints.x), tbl_rowJoint(head, joints.y), tbl_rowJoint(head, joints.z), tbl_rowJoint(head, joints.w));
  var eye = TableEyeRows(vec4u(headRow), select(flags, vec4f(), hide < -1.0), flags);
  for (var k = 1u; k <= count; k = k + 1u) {
    let hidden = tablePoses[headRow - k];
    let flagged = vec4f(tbl_rowJoint(hidden, joints.x), tbl_rowJoint(hidden, joints.y), tbl_rowJoint(hidden, joints.z), tbl_rowJoint(hidden, joints.w)) > vec4f();
    eye.rows = select(eye.rows, vec4u(headRow - k), flagged);
    eye.hide = select(eye.hide, vec4f(1.0), flagged);
  }
  return eye;
}
fn tbl_headJoint(m: mat4x4f, picked: u32, hide: f32, root: u32) -> mat4x4f {
  let pivotBind = tablePoses[picked] * vec4f(0, 0, 0, 1);
  let pivot = (tablePoses[root + (u32(pivotBind.w) % ${UZ}u) + 1u] * vec4f(pivotBind.xyz, 1.0)).xyz;
  let keep = ${Dq};
  let shrunk = m * keep + mat4x4f(vec4f(), vec4f(), vec4f(), vec4f(pivot * (1.0 - keep), 1.0 - keep));
  return m * (1.0 - hide) + shrunk * hide;
}
fn tbl_poseRowsEye(it: TableItem, previous: bool, s: TableSkinVertex, eye: TableEyeRows, hide: f32) -> mat4x4f {
  if (!${dz} || hide > -1.0 || (it.head.w & ${G}u) != 0u) { return tbl_poseRows(it, previous, s); }
  let root = select(it.pose.x, it.pose.y, previous);
  return tbl_headJoint(tablePoses[root + s.joints.x + 1u], eye.rows.x, eye.hide.x, root) * s.weights.x + tbl_headJoint(tablePoses[root + s.joints.y + 1u], eye.rows.y, eye.hide.y, root) * s.weights.y + tbl_headJoint(tablePoses[root + s.joints.z + 1u], eye.rows.z, eye.hide.z, root) * s.weights.z + tbl_headJoint(tablePoses[root + s.joints.w + 1u], eye.rows.w, eye.hide.w, root) * s.weights.w;
}
`,Uq=`${fq}
fn tbl_skinBlend(root: u32, s: TableSkinVertex) -> mat4x4<f32> {
  return tablePoses[root + s.joints.x + 1u] * s.weights.x + tablePoses[root + s.joints.y + 1u] * s.weights.y + tablePoses[root + s.joints.z + 1u] * s.weights.z + tablePoses[root + s.joints.w + 1u] * s.weights.w;
}
${D2}`;function Vq(z){return`
${Hz}
fn tbl_morph(rows: u32, weights: u32, targets: u32, v: u32) -> MorphSum {
  var sum = MorphSum(vec3f(), vec3f());
  let head = ${z("rows",2)};
  let entries = rows + ${m}u + head.x + 1u;
  let at = ${z(`rows + ${m}u + v`,2)};
  let start = at.x;
  let end = min(min(at.y, head.y), start + targets);
  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${N}u;
    let a = ${z("e",3)};
    if (a.x >= targets) { continue; }
    let k = ${z(`weights + ${JZ}u + a.x * 3u`,3)};
    ${Gz("k.x","k.y","k.z","tablePoses[k.x >> 4u][(k.x >> 2u) & 3u][k.x & 3u]")}
    if (w == 0.0) { continue; }
    let b = ${z("e + 3u",3)};
    sum.position = sum.position + vec3f(bitcast<f32>(a.y), bitcast<f32>(a.z), bitcast<f32>(b.x)) * w;
    sum.normal = sum.normal + vec3f(morph_snorm16(b.y), morph_snorm16(b.y >> 16u), morph_snorm16(b.z)) * w;
  }
  return sum;
}`}var Pq=`
fn tbl_skinVertex(part: u32, v: u32) -> TableSkinVertex {
  let j = tbl_geo2(tableParts[part].skin.x + v * 2u);
  let w = tbl_geo2(tableParts[part].skin.y + v * 2u);
  return TableSkinVertex(vec4u(j.x & 0xffffu, j.x >> 16u, j.y & 0xffffu, j.y >> 16u), vec4f(unpack2x16unorm(w.x), unpack2x16unorm(w.y)));
}
`,Mq=`${Vq(((z,Z)=>`tbl_geo${Z}(${z})`))}
${Pq}`;function o2(a){return (o2=$c0C(8)).call(this,a)}function uq(z,Z){return z?`tbl_poseRowsEye(tableItem, ${Z}, tableSkin, tableEye, tableNearHide)`:`tbl_poseRows(tableItem, ${Z}, tableSkin)`}function hq(z,Z,q=!1,$=!0,Q=!1,j=!1,v=!1,Y=!0,P=!0){let f=$&&!Q&&!j?"tbl_viewNearHide(tableItem, tableInstance, frame.cameraPosition, frame.renderOrigin)":"0.0",x=$&&!j&&P,l=x?"    tableEye = tbl_eyeOf(tableSkin.joints, tableItem.pose.z, tableNearHide);":"",g=(o,$z)=>`  var position = in.position;
  var normal = in.normal;${Q||!Y?"":`
  if ((tableItem.head.w & ${_Z}u) != 0u) {
    let tableMorph = tbl_morph(tableItem.morph.x, tableItem.morph.y, tableItem.morph.z, ${o});
    position = position + tableMorph.position;
    normal = normal + tableMorph.normal;
  }`}
  var tableSkin = TableSkinVertex(vec4u(0u), vec4f());
  var tableEye = TableEyeRows(vec4u(0u), vec4f(), vec4f());${Q?"":`
  if ((tableItem.head.w & ${w}u) != 0u) {
    tableSkin = ${$z};
${l}
  }`}`;return`${z===0?`
  let tableItemIndex = tableIn_item;
  let tableHead = tableItems[tableItemIndex].head;
  let tableInstanceIndex = tableHead.x;
  let tablePart = tableHead.y;
  let tableFadeWord = tableIn_fade;
  let tableItem = tableItems[tableItemIndex];
  let tableInstance = tableInstances[tableInstanceIndex];
  let tableFlags = tableParts[tablePart].head.x;
  let tableNearHide = ${f};
  var in: VertexIn;
  in.position = tableIn_position;
  in.normal = select(vec3f(0.0, 1.0, 0.0), lume_modelOctDecode(unpack2x16snorm(tableIn_normal)), (tableFlags & ${cZ}u) != 0u);
  in.uv = select(in.uv, tableIn_uv, (tableFlags & ${GZ}u) != 0u);
  in.uvB = select(in.uv, tableIn_uvB, (tableFlags & ${HZ}u) != 0u);
  in.color = select(vec4f(1.0), lume_modelSrgbDecode(unpack4x8unorm(tableIn_color)), (tableFlags & ${bZ}u) != 0u && (tableItem.head.w & ${gZ}u) == 0u);
${g("tableIn_vertex","TableSkinVertex(vec4u(tableIn_joints.x & 0xffffu, tableIn_joints.x >> 16u, tableIn_joints.y & 0xffffu, tableIn_joints.y >> 16u), vec4f(unpack2x16unorm(tableIn_weights.x), unpack2x16unorm(tableIn_weights.y)))")}`:`
  var tableItemIndex = 0u;
  var tableInstanceIndex = 0u;
  var tablePart = 0u;
  var tableV = 0u;
  var tableFadeWord = 0u;
  let tableDrawItem = tableDirect & ${Bq}u;
  let tableDrawLeaving = (tableDirect & ${Rq}u) != 0u;
  ${v&&!Q?o2(Z):""}if (tableDrawItem == 0u) {
    let tableLeaving = tableDrawLeaving || (tableVertexIndex & ${Yz}u) != 0u;
    let tableVertex = tableVertexIndex & ${Yz-1}u;
    let tableSpan = tableSpans[tableVertex >> ${D}u];
    if (tableSpan == 0u) { ${Z} }
    tableItemIndex = tableSpan - 1u;
    let tableHead = tableItems[tableItemIndex].head;
    tableV = tableVertex - (tableItems[tableItemIndex].span.x << ${D}u);
    tablePart = tableHead.y;
    tableInstanceIndex = tableHead.x;
    tableFadeWord = tbl_fadeWord(tableItemIndex, tableLeaving);
  } else {
    tableItemIndex = tableDrawItem - 1u;
    if ((tableDirect & ${tZ}u) != 0u) { tableFadeWord = tbl_fadeWord(tableItemIndex, tableDrawLeaving); }
    let tableHead = tableItems[tableItemIndex].head;
    tableInstanceIndex = tableHead.x;
    tablePart = tableHead.y;
    let tableOwn = tableParts[tablePart].head;
    let tableCode = select(0u, min(tableVertexIndex / tableOwn.w, ${2*X}u), tableOwn.w > 0u);
    let tableK = tableVertexIndex - tableCode * tableOwn.w;
    var tableCount = tableOwn.w;
    var tableList = 0u;
    if (tableCode > 0u) {
      var tableLevel = tableParts[tablePart].levels[min(tableCode, ${X}u) - 1u];
      if (tableCode > ${X}u) { tableLevel = tableParts[tablePart].casterLevels[tableCode - ${X+1}u]; }
      tableList = tableLevel.x;
      tableCount = tableLevel.y;
    }
    let tableTri = tableK / 3u;
    if (tableTri >= tableCount / 3u) { ${Z} }
    var tableCorner = tableK - tableTri * 3u;
    if ((tableInstances[tableInstanceIndex].flags.x & ${yz}u) != 0u && tableCorner != 0u) { tableCorner = 3u - tableCorner; }
    tableV = tableTri * 3u + tableCorner;
    if (tableCode > 0u) { tableV = tbl_index(tableList, tableV); }
    else if ((tableOwn.x & ${zq}u) != 0u) { tableV = tbl_index(tableOwn.z, tableV); }
  }
  let tableItem = tableItems[tableItemIndex];
  let tableInstance = tableInstances[tableInstanceIndex];
  let tableFlags = tableParts[tablePart].head.x;
  let tableStreams = tableParts[tablePart].streams;
  let tableStreams2 = tableParts[tablePart].streams2;
  let tableNearHide = ${f};
  let tableTangentAt = tableParts[tablePart].skin.z + tableV;
  var in: VertexIn;
  let tablePos = tableStreams.x + tableV * 3u;
  in.position = bitcast<vec3<f32>>(tbl_geo3(tablePos));
  in.normal = vec3f(0.0, 1.0, 0.0);
  if ((tableFlags & ${cZ}u) != 0u) { in.normal = lume_modelOctDecode(unpack2x16snorm(tbl_geo(tableStreams.y + tableV))); }
  if ((tableFlags & ${GZ}u) != 0u) { in.uv = bitcast<vec2<f32>>(tbl_geo2(tableStreams.z + tableV * 2u)); }
  in.uvB = in.uv;
  if ((tableFlags & ${HZ}u) != 0u) { in.uvB = bitcast<vec2<f32>>(tbl_geo2(tableStreams.w + tableV * 2u)); }
  in.color = vec4f(1.0);
  if ((tableFlags & ${bZ}u) != 0u && (tableItem.head.w & ${gZ}u) == 0u) { in.color = lume_modelSrgbDecode(unpack4x8unorm(tbl_geo(tableStreams2.x + tableV))); }
${g("tableV","tbl_skinVertex(tablePart, tableV)")}`}
  var instance: ModelInstance;
  instance.model = tbl_instanceModel(tableItem.head.x);${Q?"":`
  if ((tableItem.head.w & ${w|G}u) != 0u) { instance.model = tbl_poseModel(tableItem, tableInstance, instance.model, ${uq(x,!1)}, false, tbl_shiftUnder(tableInstance.origin)); }`}
  instance.model[0].w = bitcast<f32>(tableItem.head2.z);
  instance.color = tableItem.color;
  instance.emissive = tableItem.emissive;
  instance.flash = tableItem.flash;
  instance.pbr = tableItem.pbr;
  instance.emissiveMap = tableItem.emissiveMap;
  instance.clipPlane = tbl_planeUnder(tableInstance.clipPlane, tableInstance.origin);
  instance.clipPlane2 = tbl_planeUnder(tableInstance.clipPlane2, tableInstance.origin);
  instance.origin = vec4f();
${q?N2:""}`}function G4(a){return (G4=$c0C(9)).apply(this,arguments)}var H4="vec2f(dot(tableSkin.weights, tableEye.hide), dot(tableSkin.weights, tableEye.head))",N2=`  let tableGlassAt = tableItem.head2.w;
  let tableGlassOrigin = vec4<f32>(tbl_glassF(tableGlassAt + 12u), tbl_glassF(tableGlassAt + 13u), tbl_glassF(tableGlassAt + 14u), tbl_glassF(tableGlassAt + 15u));
  instance.viewDepthPlane = tbl_planeUnder(vec4<f32>(tbl_glassF(tableGlassAt), tbl_glassF(tableGlassAt + 1u), tbl_glassF(tableGlassAt + 2u), tbl_glassF(tableGlassAt + 3u)), tableGlassOrigin);
  instance.viewFacePlane = tbl_planeUnder(vec4<f32>(tbl_glassF(tableGlassAt + 4u), tbl_glassF(tableGlassAt + 5u), tbl_glassF(tableGlassAt + 6u), tbl_glassF(tableGlassAt + 7u)), tableGlassOrigin);
  instance.viewFaceState = vec4<f32>(tbl_glassF(tableGlassAt + 8u), tbl_glassF(tableGlassAt + 9u), tbl_glassF(tableGlassAt + 10u), tbl_glassF(tableGlassAt + 11u));
`;function b4(z,Z,q,$=lq){return`
struct TableMaterial {
  place: vec4<f32>,
  factors: vec4<f32>,
  maps: array<vec4<u32>, ${lZ/2}>,
  coat: vec4<f32>,
}
@group(${z}) @binding(${Nq}) var<storage, read> tableMaterials: array<TableMaterial>;
@group(${z}) @binding(${iq}) var<storage, read> pictures: array<TablePicture>;
${QZ(RZ(),Bz)}
override ${PZ}: u32 = ${Sq}u;
fn tbl_wears(slot: u32) -> bool {
  return (${PZ} & (1u << slot)) != 0u;
}
fn tbl_place(m: u32, uv: vec2<f32>) -> vec2<f32> {
  let place = tableMaterials[m].place;
  return uv * place.xy + place.zw;
}
fn tbl_slot(m: u32, slot: u32) -> vec2<u32> {
  let pair = tableMaterials[m].maps[slot / 2u];
  return select(pair.xy, pair.zw, (slot & 1u) == 1u);
}
fn tbl_arm(word: u32) -> u32 {
  return (word >> ${$}u) & ${aq}u;
}
${i2(Z,q)}${Z.map((Q,j)=>R2(Q,aZ(j,q),q)).join("")}`}function CZ(z,Z,q){if(Z===1)return`  return ${q(`picMap${z}`)};
`;return ca(Z,q,z);}function i2(z,Z){return[...new Set(z.map(($,Q)=>aZ(Q,Z)))].map(($)=>`fn tbl_grad_${$}(arm: u32, a: PicAt) -> vec4<f32> {
${CZ($,Z,(Q)=>`pic_read(${Q}, a)`)}}
${Z===1?`@diagnostic(off, derivative_uniformity)
fn tbl_bias_${$}(arm: u32, uv: vec2<f32>, layer: i32, lodShift: f32) -> vec4<f32> {
${CZ($,Z,(Q)=>`textureSampleBias(${Q}, picSampler, uv, layer, lodShift)`)}}
`:""}`).join("")}function R2(z,Z,q){let $=`  if (!tbl_wears(${z}u)) { return neutral; }
  let s = tbl_slot(m, ${z}u);
`;let Q=`  if (a.layer < 0) { return neutral; }
  return tbl_grad_${Z}(tbl_arm(s.y), a);
`;let j=q===1?`  if (whole >= 0) { return tbl_bias_${Z}(tbl_arm(s.y), uv, whole, lodShift); }
  let a = pic_at(s.x, s.y, uv, ddx, ddy);
`:(`  var a = PicAt(uv, ddx, ddy, whole);
  if (whole < 0) { a = pic_at(s.x, s.y, uv, ddx, ddy); }
`);return`@diagnostic(off, derivative_uniformity)
fn tbl_tap${z}(m: u32, uv: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>, lodShift: f32, neutral: vec4<f32>) -> vec4<f32> {
${$}  let whole = select(-1, pic_wholeLayer(s.x), (s.y & ${$Z}u) == 0u);
${j}${Q}}
${B2.includes(z)?(`fn tbl_mean${z}(m: u32, neutral: vec4<f32>) -> vec4<f32> {
${$}  let a = pic_mean(s.x, s.y);
${Q}}
`):""}
fn tbl_tapLevel${z}(m: u32, uv: vec2<f32>, level: f32, neutral: vec4<f32>) -> vec4<f32> {
${$}  let a = pic_atLevel(s.x, s.y, uv, level);
${Q}}
`}var gq=`struct ModelInstance {
  model: mat4x4<f32>,
  color: vec4<f32>,
  emissive: vec4<f32>,
  flash: vec4<f32>,
  pbr: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  origin: vec4<f32>,
}`,cq=`struct VertexIn {
  position: vec3<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  uvB: vec2<f32>,
  color: vec4<f32>,
}`;function Gq(){return (Gq=$c0C(10)).call(this)}var B2=[1,9],r2=0,t2=6,S2=4,m4=[0,1,2,3,4,5,6];function w4(z,Z,q,$,Q,j,v=null){let P=[...bz(v,!0,"worldPos","maskView.renderOrigin"),...mz(v)].map((x)=>`${x}
`).join("");return[`//${$?" cut":""}${v===null?"":" clip"}`,z,gq,Kq(1,q,"maskView.renderOrigin"),cq,Q,j,`struct TableMaskVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
  @location(1) uv: vec2<f32>,
  @location(2) vertexColor: vec4<f32>,
  @location(3) @interpolate(flat) tableItem: vec2<u32>,
${wz(v,4).map((x)=>`${x}
`).join("")}}`,`@vertex fn vs(${vz(q).join(", ")}) -> TableMaskVaryings {
${hq(q,"var tableOff: TableMaskVaryings; tableOff.position = vec4<f32>(2.0, 2.0, 2.0, 1.0); return tableOff;",!1,!1)}
  let worldPos = (instance.model * vec4<f32>(position, 1.0)).xyz;
  var out: TableMaskVaryings;
  out.position = maskView.viewProj * vec4<f32>(worldPos, 1.0);
${V2("out.position")}
  out.viewZ = (maskView.view * vec4<f32>(worldPos, 1.0)).z;
  out.uv = in.uv;
  out.vertexColor = in.color;
  out.tableItem = vec2<u32>(tableItemIndex, tableItem.head.z);
${P}  return out;
}`,Z("TableMaskVaryings",[...jz(v),...$?[Gq()]:[]])].join(`

`)}var l2=`  let tableRampWord = select(0.0, tableItem.flash.w, (tableItem.head.w & ${w|G}u) != 0u);
  var tableRamp = tableRampWord;
  if (abs(tableRampWord) > 1.0) { tableRamp = sign(tableRampWord) * ${IZ("abs(tableRampWord)","shadowView.fadeTime")}; }`;function d4(z,Z,q,$,Q,j,v=null,Y=!1,P=!0){let f=(b)=>hq(Z,b,!1,!1,Y,!1,!0,P,!1),x=[`//${q?" cut":""}${v===null?"":" clip"}${Y?" still":""}${!Y&&!P?" no-keys":""}`,`${z}
@group(0) @binding(0) var<uniform> shadowView: ShadowView;`,gq,Kq(1,Z,"shadowView.renderOrigin",Y,P,!1),cq,$],l="return vec4<f32>(2.0, 2.0, 2.0, 1.0);";if(!q&&v===null){x.push(`@vertex fn vs(${vz(Z).join(", ")}) -> @builtin(position) vec4<f32> {
${f("return vec4<f32>(2.0, 2.0, 2.0, 1.0);")}
  return shadowView.viewProj * vec4<f32>((instance.model * vec4<f32>(position, 1.0)).xyz, 1.0);
}`);return x.join(`

`);}let g=[...bz(v,!0,"worldPos","shadowView.renderOrigin"),...mz(v)].map((b)=>`${b}
`).join(""),qz=v===null?"":`  let worldPos = (instance.model * vec4<f32>(position, 1.0)).xyz;
`,o=v===null?"(instance.model * vec4<f32>(position, 1.0)).xyz":"worldPos",$z=(b)=>wz(v,b).map((Hq)=>`${Hq}
`).join(""),Az="var tableOff: CasterVaryings; tableOff.position = vec4<f32>(2.0, 2.0, 2.0, 1.0); return tableOff;";if(!q){x.push(`struct CasterVaryings {
  @builtin(position) position: vec4<f32>,
${$z(0)}}`);x.push(`@vertex fn vs(${vz(Z).join(", ")}) -> CasterVaryings {
${f(Az)}
${qz}  var out: CasterVaryings;
  out.position = shadowView.viewProj * vec4<f32>(${o}, 1.0);
${g}  return out;
}`);let b=jz(v).join(`
`);return x.push(j),x.push(`@fragment fn fs(in: CasterVaryings) {
${b}
}`),x.push(`@fragment fn fs_cover(in: CasterVaryings) {
${b}
  if (cover_underGround(in.position)) { discard; }
}`),x.join(`

`)}x.push(Q);x.push(`struct CasterVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) vertexColor: vec4<f32>,
  @location(2) @interpolate(flat) tableItem: vec2<u32>,
  @location(3) @interpolate(flat) fadeHide: f32,
${$z(4)}}`);x.push(`@vertex fn vs(${vz(Z).join(", ")}) -> CasterVaryings {
${f(Az)}
${Y?"  let tableRamp = 0.0;":l2}
  if (abs(tableRamp) >= 1.0) { var tableGone: CasterVaryings; tableGone.position = vec4<f32>(2.0, 2.0, 2.0, 1.0); return tableGone; }
${qz}  var out: CasterVaryings;
  out.fadeHide = tableRamp;
  out.position = shadowView.viewProj * vec4<f32>(${o}, 1.0);
  out.uv = in.uv;
  out.vertexColor = in.color;
  out.tableItem = vec2<u32>(tableItemIndex, tableItem.head.z);
${g}  return out;
}`);let Ez=[...jz(v),Gq(),zZ("in.fadeHide")].join(`
`);return x.push(j),x.push(`@fragment fn fs(in: CasterVaryings) {
${Ez}
}`),x.push(`@fragment fn fs_cover(in: CasterVaryings) {
${Ez}
  if (cover_underGround(in.position)) { discard; }
}`),x.join(`

`)}
;

function aa(z,Z){return z.count>4?[`  @location(${Z}) materialClipA: vec4<f32>,`,`  @location(${Z+1}) materialClipB: vec4<f32>,`]:[`  @location(${Z}) materialClipA: vec4<f32>,`]
}
function ba(z){return(`/mclip${z.count}${z.intersection?"i":""}`)}
function ca(Z,q,z){return`  switch arm {
${Array.from({length:Z},(Q,j)=>`    ${j===0?"default":`case ${j}u`}: { return ${q(`picMap${z+j}`)}; }
`).join("")}  }
`
}



;import{R as $Lr}from"./52e971dc2a986655.mjs";import{$vw as Jz,LlV as jZ,PXH as XZ}from"./b0ae852abe313b99.mjs";export{$2 as O5$,$3 as WUs,$4 as Ut9,A as k4I,A3 as MAy,AZ as rxB,Aq as EwI,B3 as Gm_,BZ as dE6,Bz as rzu,C2 as qq7,C3 as ZBe,Cq as jN9,D as bBT,D3 as oRh,Dq as GWF,Dz as DxX,E as gJN,E2 as h8l,E3 as fZe,EZ as s7m,F2 as V4t,F4 as uqz,Fq as eYK,Fz as ve5,G as xUl,G2 as H$F,G4 as s$0,GZ as Mmj,H4 as ATm,HZ as AUB,I3 as YE_,Iz as H9W,J as aZc,J2 as hDp,J4 as hZq,JZ as vgS,K as Iw$,K2 as GDV,K4 as Q4I$,Kq as QFf,Kz as Cle,L as QQA,L3 as FQL,LZ as HGC,Lq as y$K,Lz as Qf9,M2 as UfB,M4 as Icg,Mz as H84,N as nhu,N3 as OPM,Nq as d3H,O as Kjb,O2 as P3s,O3 as XpT,Oz as Jv9,P2 as JUA,P4 as ffG,PZ as b_x,Q2 as FMZ,Q4 as UZM,R as tY7,R3 as VMd,Rq as p1G,S3 as c9E,SZ as oyo,Sq as rLb,Sz as jEP,T as aOB,T3 as WsF,Tq as lZE,U as jb1,U4 as Wly,UZ as Nv9,Uz as lIU,V2 as K$8,V4 as HQY,VZ as OTi,W3 as gqR,X as Dnl,X2 as FIf,X4 as k91,Y2 as _Be,Y4 as G3o,Z4 as uNa,Zq as I3x,Zz as aRX,_3 as mop,_Z as X45,_q as wru,a3 as p6M,aZ as lmk,aq as bEp,az as gQ4,b4 as fPO,bZ as xkF,bq as jJ8,bz as SUr,c as Q0p,c2 as hXJ,c4 as snw,cZ as CEK,cq as lnP,d as oMi,d2 as s_K,d4 as FhH,dZ as fdt,dz as pvM,e as aTp,e3 as nGB,eZ as Dv9,eq as CnA,f4 as e1G,fz as qLr,g2 as HGL,g4 as zI0,gZ as MtD,gq as bMG,h2 as Jxn,h4 as RIF,hZ as kaY,hq as pQg,hz as daj,i3 as TiM,iq as Pr_,j2 as xNN,j3 as dVV,j4 as dIP,jz as bcA,k as ws6,k2 as nzv,k4 as dzx,kz as h56,l3 as nqUn,lZ as wHC,lq as EzJ,lz as ehP,m as rdy,m2 as NSI,m4 as mUN,mq as hvk,mz as _0$,n as gB6,n2 as h39,n3 as XVJ,nZ as $fq,nz as A7D,o3 as i3t,oq as eDa,p as ecZ,p2 as R3T,p3 as FX_,pZ as z7l,pq as ePZ,q3 as eX0,q4 as BgV,qq as wiE,r3 as x79,rq as wx_,rz as PCJ,s as Xdi,s3 as qL9,sZ as IMp,sq as FKn,t as AX$,t3 as L6W,tZ as K6B,tq as gSZ,tz as bA_,u as l9i,u2 as eWp,u4 as vgk,uZ as NLT,uz as anm,v2 as e5Z,v4 as HWV,vz as G6n,w as VYS,w4 as lyQ,wZ as cMY,wz as wOD,x2 as jY0,x4 as $As,y as e4L,y2 as W5A,y4 as C$X,yz as g7d,z4 as Q8b,zZ as xno,zq as YqQ};
