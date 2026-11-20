
;var I="lume_ground",$=6,F=1+$,y=64;function M(q,j,J){let K=(Math.imul(q,2654435761)^Math.imul(j,2246822519)^Math.imul(J,3266489917))>>>0;return(K^K>>>15)>>>0}function P(q,j){return`
fn ${j}Row(row: u32) -> vec4f {
let at = row * 4u;
return bitcast<vec4f>(vec4u(${q}[at], ${q}[at + 1u], ${q}[at + 2u], ${q}[at + 3u]));
}

fn ${j}At(i: u32) -> f32 {
return bitcast<f32>(${q}[i]);
}

${Y(`${j}Post`,"",((J)=>`${q}[${J}]`))}

${Q(`${j}HoleGone`,`${j}At`)}

fn ${j}(worldX: f32, worldZ: f32) -> vec2f {
let head = ${j}Row(0u);
let classes = min(u32(head.y), ${$}u);
let mask = u32(head.z);
let hashBase = u32(head.w);
var best = 0u;
var bestLod = 1e30;
for (var k = 0u; k < classes; k++) {
let size = ${j}At((1u + k) * 4u);
if (size <= 0.0) {
continue;
}
let edge = size * 1e-5;
let low = floor((vec2f(worldX, worldZ) - edge) / size);
let high = floor((vec2f(worldX, worldZ) + edge) / size);
for (var corner = 0u; corner < 4u; corner++) {
let cellX = low.x + f32(corner & 1u);
let cellZ = low.y + f32(corner >> 1u);
if (cellX > high.x || cellZ > high.y) {
continue;
}
var h = (bitcast<u32>(i32(cellX)) * 0x9e3779b1u) ^ (bitcast<u32>(i32(cellZ)) * 0x85ebca77u) ^ (k * 0xc2b2ae3du);
h = (h ^ (h >> 15u)) & mask;
for (var probe = 0u; probe < ${y}u; probe++) {
let cell = ${j}Row(hashBase + h);
if (cell.w < 0.5) {
break;
}
if (cell.x == cellX && cell.y == cellZ && cell.z == f32(k)) {
let slot = u32(cell.w) - 1u;
let placement = ${j}Row(${F}u + slot * 2u);
let lod = ${j}At((${F+1}u + slot * 2u) * 4u + 1u);
let localX = worldX - placement.x;
let localZ = worldZ - placement.y;
if (lod < bestLod && localX >= -edge && localZ >= -edge && localX <= placement.z + edge && localZ <= placement.z + edge) {
best = slot + 1u;
bestLod = lod;
}
}
h = (h + 1u) & mask;
}
}
}
if (best == 0u) {
return vec2f(0.0, 0.0);
}
let placement = ${j}Row(${F}u + (best - 1u) * 2u);
let chunkMeta = ${j}Row(${F+1}u + (best - 1u) * 2u);
let resolution = placement.w;
let spacing = placement.z / (resolution - 1.0);
let gridX = clamp((worldX - placement.x) / spacing, 0.0, resolution - 1.0);
let gridZ = clamp((worldZ - placement.y) / spacing, 0.0, resolution - 1.0);
let x0 = min(floor(gridX), resolution - 2.0);
let z0 = min(floor(gridZ), resolution - 2.0);
let tx = gridX - x0;
let tz = gridZ - z0;
let padded = resolution + 2.0;
if (chunkMeta.z >= 0.0) {
let holeAt = u32(chunkMeta.z);
let word = ${j}At(holeAt + u32(z0 * (resolution - 1.0) + x0));
if (${j}HoleGone(word, holeAt + u32(padded * padded), vec2f(tx, tz))) {
return vec2f(0.0, 0.0);
}
}
let tile = ${j}PostHead(u32(chunkMeta.x));
let x = u32(x0) + 1u;
let z = u32(z0) + 1u;
let side = u32(padded);
let h00 = ${j}Post(tile, x, z, side);
let h10 = ${j}Post(tile, x + 1u, z, side);
let h01 = ${j}Post(tile, x, z + 1u, side);
let h11 = ${j}Post(tile, x + 1u, z + 1u, side);
let north = h00 + (h10 - h00) * tx;
let south = h01 + (h11 - h01) * tx;
return vec2f(north + (south - north) * tz + chunkMeta.w, 1.0);
}
`}
;

;import{CfE as Y,QE8 as Q}from"./73c224890e5dcb5e.mjs";export{$ as HVX,F as vzI,I as Ppi,M as mmX,P as J8s,y as N1R};
