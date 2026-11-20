
;var v=1,w=(b)=>b.value.kind==="road"||b.value.kind==="path";var B=function(b){let F=b.shared.value,Z=M(F,{sampleBaseHeight:(q,m)=>P(F,q,m,{applyMarks:!1})}),j=Q(Z,b.cell,b.grid);if((j.length===0?"":W(j))!==b.signature)return{version:v,same:!1,chunks:null,hard:null};let G=j.length===0?null:D(j,b.grid,{within:b.cell}),H=G!==null&&j.some(w)?j.filter((q)=>!w(q)):[],$=H.length>0?D(H,b.grid,{within:b.cell}):null;return{version:v,same:!0,chunks:G,hard:$}},O=K(Y,(b)=>Promise.resolve(B(b)));;

;import{JNz as Q,POK as Y,gVb as D,keY as W,m6H as K,s1F as M,sy_ as P}from"./2f5a32ad-a57e1e85bb0765e9.mjs";export{B as buildTerrainExclusionRasterOutput,O as terrainExclusionRasterJobBody};
