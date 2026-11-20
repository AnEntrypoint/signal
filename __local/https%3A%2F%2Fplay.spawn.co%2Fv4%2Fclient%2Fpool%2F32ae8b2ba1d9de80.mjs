;;;;;;;;;;
;var G=1.75;var X=1.25;var N=X*G*G;var Y=2/(Math.sqrt(3)*1080),$=0.8;var Z=2376512323,k=3625334849,z=3407524639,U=2146121005,j=2221713035,K=0.00000005960464477539063;var q=(W)=>`0x${W.toString(16)}u`,F=`const LOD_BAND_START: f32 = ${$};
fn lod_band_share(distance: f32, handover: f32) -> f32 {
  return clamp((distance / max(handover, 1e-9) - LOD_BAND_START) / (1.0 - LOD_BAND_START), 0.0, 1.0);
}
fn lod_cell_hash(cell: vec3<i32>) -> f32 {
  var h = (bitcast<u32>(cell.x) * ${q(Z)}) ^ (bitcast<u32>(cell.y) * ${q(k)}) ^ (bitcast<u32>(cell.z) * ${q(z)});
  h = (h ^ (h >> 16u)) * ${q(U)};
  h = (h ^ (h >> 15u)) * ${q(j)};
  h = h ^ (h >> 16u);
  return f32(h >> 8u) * ${K};
}
`,M=null;var O=V(J);function P(){return Q(J),M??Y}var E=String;;
;

;import"./26ceb10f-96826d3638767842.mjs";import"./60d2a80e-d0be0a5e0e7ba6f2.mjs";import"./f11f54a2bd263bff.mjs";import"./20f93b1007c06457.mjs";import"./f81c9654-0df44d858734c87d.mjs";import"./694b4455cf715332.mjs";import"./46b1c77c67f7de91.mjs";import"./4765ec0c-dcdcc72a40accabf.mjs";import"./59031fb6a4af82a1.mjs";import"./bfa01a2f-3c7be3138b23bafd.mjs";import{Q9j as Q,SH_ as V,xxS as J}from"./874b9df21ad34855.mjs";import"./bfa01a2f-3c7be3138b23bafd.mjs";export{$ as NdZ,E as MRE,P as yoA,Y as CCo};
