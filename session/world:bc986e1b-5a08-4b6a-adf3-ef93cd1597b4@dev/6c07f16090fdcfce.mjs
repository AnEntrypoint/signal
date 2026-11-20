;const{pSo:E}=$Lr;
function N(j){return[j.label,j.dist,j.jointBounds,j.solidBounds,j.inside,j.jointTriangleStart,j.jointTriangles,j.primitiveTriangleStart,j.triangleInShell,j.jointClusterStart,j.clusterTriangleStart,j.clusterTriangles,j.clusterPrimitives,j.pieceBindBoxes,j.pieceShellTriangles,j.pieceWeightSums,j.pieceWeighStart,j.pieceWeighJoints,j.pieceWeighMost]}var z=new WeakMap;function F(j){let q=z.get(j.meshes);if(!q){q=a(q,j)}return q}function P(j){return z.get(j.meshes)}function Q(j,q){z.set(j.meshes,q),E(j.meshes)}var G={solids:new WeakSet,clouds:new WeakSet};function U(j,q){let H=F(j).solidFields;for(let[J,K]of q)H.set(J,K);G.solids.delete(j.meshes),E(j.meshes)}function V(j,q){F(j).bodyClouds=q,G.clouds.delete(j.meshes)}
;

function a(q,j){q={jointBoxes:new Map,solidFields:new Map},z.set(j.meshes,q);
return q}

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{F as Quc,G as Eau,N as FCR,P as Dhp,Q as eDU,U as ApN,V as oe$};
