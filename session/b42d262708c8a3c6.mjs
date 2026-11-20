
;var q=8,L=0.4,B=function(){let b=[];for(let k=0;k<q;k+=1)for(let j=0;j<q;j+=1)b.push([(j+0.5)/q,(k+0.5)/q]);return b};function F(b){if(b===null||!b.ok||b.points===void 0)return null;let k=b.matches??[],j=b.points;if(j.length===0)return null;return j.filter((z)=>z.rows.some((x)=>k[x]?.visible===!0&&k[x]?.painted===!0)).length/j.length}async function M(){let b=y();if(b===null)return 0;try{return F((await b({target:"game",query:{verb:"hits",at:B()}})).read)}catch{return null}}
;

;import{WL1 as y}from"./aabb4631-1df0904cd068376f.mjs";export{B as oEQ,F as $vn,L as nhd,M as yxN};
