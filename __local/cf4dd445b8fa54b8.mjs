
var C=function(q,x){if(!q)return null;let z=x&65535&q.shapeMask;return q.bundles[z]??null},F=function(q){if(q===void 0||q.bundles.length===0)return!1;for(let x of q.bundles)if(x===null||x.geometry.indices.length>0)return!1;return!0},J=(q)=>q.parts.some((x)=>x.role==="solid");
export{C as I3X,F as pbr,J as jjg};
