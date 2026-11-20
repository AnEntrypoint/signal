
function M(g,q){let B=new Set,G=[...q];for(let J=G.pop();J!==void 0;J=G.pop()){if(B.has(J))continue;B.add(J);for(let P of g[J]?.children??[])G.push(P)}return B}function Q(g,q){let B=M(g,q);return new Set(q.length===0?[]:g.flatMap((G,J)=>B.has(J)?[]:[J]))}function Z(g,q){for(let B of Q(g,q)){{let B$1=B;{let B=B$1;let G=g[B];G.meshIndex=G.skinIndex=null,delete G.light
}}}}function $(g){g.forEach((q,B)=>q.children.forEach((G)=>g[G].parent=B))}var W="spawnRestUnseen";function H(g){if(typeof g!=="object"||g===null)return!1;let q=g.extras;if(typeof q!=="object"||q===null||Array.isArray(q))return!1;return q[W]===!0}function I(g){return M(g,g.flatMap((q,B)=>q?.restUnseen===!0?[B]:[]))}
export{$ as ZOx,H as UUl,I as p0w,M as or9,Q as cen,Z as VCj};
