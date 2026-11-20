;const{Cuu:j,HyE:v,Jeu:u,VI3:k,nQ$:c,nUV:q,zKy:n}=$Lr;
var z=`fn voxel_ringClasses(ring: u32) -> u32 {
  let side = (vec4<u32>(ring) >> vec4<u32>(3u, 4u, 1u, 6u)) & vec4<u32>(1u);
  let diagonal = ((vec4<u32>(ring) >> vec4<u32>(0u, 2u, 5u, 7u)) & vec4<u32>(1u)) | (side.xyxy & side.zzww);
  let sides = side.x * 0x4108u + side.y * 0x10420u + side.z * 0x580u + side.w * 0x16000u;
  let diagonals = diagonal.x * 0x100u + diagonal.y * 0x400u + diagonal.z * 0x4000u + diagonal.w * 0x10000u;
  return ${k}u - sides - diagonals;
}

fn voxel_classLevels(classes: u32, cell: vec2<u32>, span: vec2<u32>) -> vec4<u32> {
  let lo = select(vec2<u32>(0u), vec2<u32>(2u, 6u), cell == vec2<u32>(0u));
  let hi = select(vec2<u32>(0u), vec2<u32>(4u, 12u), cell + vec2<u32>(1u) == span);
  return (vec4<u32>(classes) >> (vec4<u32>(lo.x, hi.x, lo.x, hi.x) + vec4<u32>(lo.y, lo.y, hi.y, hi.y))) & vec4<u32>(3u);
}`,$=`fn voxel_ringBit(ring: u32, i: i32, j: i32) -> u32 {
  let k = u32((j + 1) * 3 + (i + 1));
  return (ring >> select(k, k - 1u, k > 4u)) & 1u;
}

fn voxel_faceValueRead(placement: u32, value: u32) -> u32 {
  if ((placement & ${n>>>0}u) == 0u) { return value; }
  return value & 0x0100ffffu;
}

${z}`,W=`
struct VoxelSmoothCorner {
  shift: vec3<f32>,
  normal: vec3<f32>,
  cells: u32,
}

fn voxel_smoothCorner(cu: i32, cv: i32, solid: u32, open: u32) -> VoxelSmoothCorner {
  var cells = 0u;
  for (var s = 0u; s < 8u; s = s + 1u) {
    let i = cu - 1 + i32(s & 1u);
    let j = cv - 1 + i32((s >> 1u) & 1u);
    let layer = s >> 2u;
    cells = cells | (select(voxel_ringBit(select(open, solid, layer == 0u), i, j), select(0u, 1u, layer == 0u), i == 0 && j == 0) << s);
  }
  var sum = vec3<f32>(0.0);
  var count = 0.0;
  var grad = vec3<f32>(0.0);
  for (var s = 0u; s < 8u; s = s + 1u) {
    let p = vec3<f32>(f32(s & 1u), f32((s >> 1u) & 1u), f32(s >> 2u)) - vec3<f32>(0.5);
    let here = (cells >> s) & 1u;
    grad = grad + (1.0 - 2.0 * f32(here)) * p;
    if ((s & 1u) == 0u && here != ((cells >> (s | 1u)) & 1u)) { sum = sum + vec3<f32>(0.0, p.y, p.z); count = count + 1.0; }
    if ((s & 2u) == 0u && here != ((cells >> (s | 2u)) & 1u)) { sum = sum + vec3<f32>(p.x, 0.0, p.z); count = count + 1.0; }
    if ((s & 4u) == 0u && here != ((cells >> (s | 4u)) & 1u)) { sum = sum + vec3<f32>(p.x, p.y, 0.0); count = count + 1.0; }
  }
  let rare = select(cells, cells ^ 0xffu, countOneBits(cells) > 4u);
  var lean = 8u;
  if (countOneBits(rare) == 1u) { lean = firstTrailingBit(rare); }
  if (countOneBits(rare) == 3u) {
    for (var axis = 0u; axis < 3u; axis = axis + 1u) {
      let low = select(select(0x0fu, 0x33u, axis == 1u), 0x55u, axis == 0u);
      let layer = select(low ^ 0xffu, low, (rare & low) == rare);
      if ((rare & layer) == rare) { lean = firstTrailingBit(layer & ~rare) ^ (7u ^ (1u << axis)); }
    }
  }
  var out: VoxelSmoothCorner;
  out.shift = sum / max(count, 1.0);
  if (lean < 8u) { out.shift = 0.5 * (vec3<f32>(f32(lean & 1u), f32((lean >> 1u) & 1u), f32(lean >> 2u)) - vec3<f32>(0.5)); }
  out.normal = grad;
  out.cells = cells;
  return out;
}

fn voxel_smoothLowerTop(cells: u32, isAxisY: bool, positive: bool) -> bool {
  for (var s = 0u; s < 8u; s = s + 1u) {
    let lower = select((s & 2u) == 0u, ((s & 4u) == 0u) == positive, isAxisY);
    let over = select(s | 2u, s ^ 4u, isAxisY);
    if (lower && ((cells >> s) & 1u) == 1u && ((cells >> over) & 1u) == 0u) { return true; }
  }
  return false;
}`,Y=`
struct VoxelSmoothPlane {
  a: vec3<f32>,
  b: vec3<f32>,
  valley: bool,
}

fn voxel_smoothPlaneThrough(p: vec3<f32>, q: vec3<f32>, r: vec3<f32>) -> vec4<f32> {
  let n = cross(q - p, r - p);
  if (abs(n.z) < 1e-6) { return vec4<f32>(0.0); }
  return vec4<f32>(p.z - dot(n.xy, vec2<f32>(0.5) - p.xy) / n.z, -n.xy / n.z, 1.0);
}

fn voxel_smoothPlane(placement: u32, value: u32) -> VoxelSmoothPlane {
  let solid = ((value >> 25u) & 0x7fu) | select(0u, 0x80u, (placement & ${q>>>0}u) != 0u);
  let open = (value >> 16u) & 0xffu;
  let p0 = vec3<f32>(0.0, 0.0, 0.0) + voxel_smoothCorner(0, 0, solid, open).shift;
  let p1 = vec3<f32>(1.0, 0.0, 0.0) + voxel_smoothCorner(1, 0, solid, open).shift;
  let p2 = vec3<f32>(1.0, 1.0, 0.0) + voxel_smoothCorner(1, 1, solid, open).shift;
  let p3 = vec3<f32>(0.0, 1.0, 0.0) + voxel_smoothCorner(0, 1, solid, open).shift;
  return voxel_smoothPlaneOf(p0, p1, p2, p3, (placement & ${c}u) != 0u);
}

fn voxel_smoothPlaneOf(p0: vec3<f32>, p1: vec3<f32>, p2: vec3<f32>, p3: vec3<f32>, flip: bool) -> VoxelSmoothPlane {
  var a = voxel_smoothPlaneThrough(p0, p1, p2);
  var b = voxel_smoothPlaneThrough(p0, p2, p3);
  var off = p1;
  if (flip) {
    a = voxel_smoothPlaneThrough(p0, p1, p3);
    b = voxel_smoothPlaneThrough(p1, p2, p3);
    off = p0;
  }
  let flat = vec4<f32>((p0.z + p1.z + p2.z + p3.z) * 0.25, 0.0, 0.0, 1.0);
  let planeA = select(select(flat, b, b.w > 0.5), a, a.w > 0.5);
  let planeB = select(planeA, b, b.w > 0.5);
  var out: VoxelSmoothPlane;
  out.a = planeA.xyz;
  out.b = planeB.xyz;
  out.valley = off.z > planeB.x + dot(planeB.yz, off.xy - vec2<f32>(0.5)) + 1e-6;
  return out;
}

fn voxel_smoothRise(plane: VoxelSmoothPlane, f: vec2<f32>) -> f32 {
  let a = plane.a.x + dot(plane.a.yz, f - vec2<f32>(0.5));
  let b = plane.b.x + dot(plane.b.yz, f - vec2<f32>(0.5));
  return clamp(select(min(a, b), max(a, b), plane.valley), -1.0, 1.0);
}`,Z=`fn voxel_densityField(placement: u32, value: u32) -> u32 {
  return ((placement >> 18u) & 0x1ffu) | (((value >> 16u) & 0xffu) << 9u) | (((value >> 25u) & 0x7fu) << 17u);
}

fn voxel_densityBits(w: vec3<u32>, c: u32) -> u32 {
  var bits = w.z >> 8u;
  if (c == 0u) {
    bits = w.x & 0xffffffu;
  } else if (c == 1u) {
    bits = (w.x >> 24u) | ((w.y & 0xffffu) << 8u);
  } else if (c == 2u) {
    bits = (w.y >> 16u) | ((w.z & 0xffu) << 16u);
  }
  return bits;
}

fn voxel_densityMove(w: vec3<u32>, c: u32) -> vec3<f32> {
  let bits = voxel_densityBits(w, c);
  return (vec3<f32>(f32(bits & 0xffu), f32((bits >> 8u) & 0xffu), f32((bits >> 16u) & 0xffu)) - vec3<f32>(128.0)) / 128.0;
}

fn voxel_densityNormal(w: vec3<u32>, c: u32) -> vec3<f32> {
  let bits = voxel_densityBits(w, c);
  let u = min(1.0, f32(bits & 0xfffu) / 4092.0 * 2.0 - 1.0);
  let v = min(1.0, f32((bits >> 12u) & 0xfffu) / 4092.0 * 2.0 - 1.0);
  let y = 1.0 - abs(u) - abs(v);
  let t = max(-y, 0.0);
  return normalize(vec3<f32>(u + select(t, -t, u >= 0.0), y, v + select(t, -t, v >= 0.0)));
}`,U=`
fn voxel_densityUpPlane(w: vec3<u32>, placement: u32) -> VoxelSmoothPlane {
  let m0 = voxel_densityMove(w, 0u);
  let m1 = voxel_densityMove(w, 1u);
  let m2 = voxel_densityMove(w, 2u);
  let m3 = voxel_densityMove(w, 3u);
  let flip = (placement & ${c}u) != 0u;
  return voxel_smoothPlaneOf(vec3<f32>(m0.x, m0.z, m0.y + 0.5), vec3<f32>(1.0 + m1.x, m1.z, m1.y + 0.5), vec3<f32>(1.0 + m3.x, 1.0 + m3.z, m3.y + 0.5), vec3<f32>(m2.x, 1.0 + m2.z, m2.y + 0.5), flip);
}

fn voxel_densityStepsPlane(steps: u32, placement: u32) -> VoxelSmoothPlane {
  let h = vec4<f32>(f32(steps & 63u), f32((steps >> 6u) & 63u), f32((steps >> 12u) & 63u), f32((steps >> 18u) & 63u)) / ${v}.0 - vec4<f32>(0.5);
  let flip = (placement & ${c}u) != 0u;
  return voxel_smoothPlaneOf(vec3<f32>(0.0, 0.0, h.x), vec3<f32>(1.0, 0.0, h.y), vec3<f32>(1.0, 1.0, h.w), vec3<f32>(0.0, 1.0, h.z), flip);
}`,d=`fn voxel_arenaU32(at: u32) -> u32 {
  let pair = quadWords[at >> 1u];
  return select(pair.x, pair.y, (at & 1u) == 1u);
}

fn voxel_densityCorners(arenaQuad: u32, placement: u32, value: u32) -> vec3<u32> {
  let at = arenaQuad * 2u + voxel_densityField(placement, value);
  return vec3<u32>(voxel_arenaU32(at), voxel_arenaU32(at + 1u), voxel_arenaU32(at + 2u));
}

fn voxel_densityNormals(arenaQuad: u32, placement: u32, value: u32) -> vec3<u32> {
  let at = arenaQuad * 2u + voxel_densityField(placement, value) + ${u}u;
  return vec3<u32>(voxel_arenaU32(at), voxel_arenaU32(at + 1u), voxel_arenaU32(at + 2u));
}`,e=["opaque","glass","liquid"],J=6,p=J*4,s=3,x=4,D=5,G=(b,g="params",h="matIdx")=>`let ${b}At = u32(${g}.y + 0.5) * 4u + max(${h}, 1u) - 1u;
  let ${b} = u32(palette[${b}At >> 2u][${b}At & 3u] + 0.5);`,H=(b,g,h)=>(b[g*4+Math.max(h,1)-1]??0)*4,f=300,y=64,F=j/64,C=0.5,R=11,V=8,i=5,B=(b)=>b==="opaque"||b==="liquid"||b==="glass",X=`fn voxel_preJoinColor(word: f32) -> vec3<f32> {
  if (word < 0.5) { return vec3<f32>(1.0); }
  let hex = u32(word - 1.0);
  let srgb = vec3<f32>(f32((hex >> 16u) & 255u), f32((hex >> 8u) & 255u), f32(hex & 255u)) / 255.0;
  return select(pow(srgb * 0.9478672986 + 0.0521327014, vec3<f32>(2.4)), srgb * 0.0773993808, srgb < vec3<f32>(0.04045));
}`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$ as F5i,B as PXB,C as TqT,D as TDY,F as rsl,G as U0A,H as Fuy,J as QN6,R as NO$,U as lbV,V as tlA,W as lPD,X as F5L,Y as Ff5,Z as LXO,d as M4f,e as T5s,f as pmU,i as RJj,p as ZDW,s as YMO,x as QSh,y as Xa_,z as art};
