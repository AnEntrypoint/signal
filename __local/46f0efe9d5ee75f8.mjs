
;;var b=H({name:"screenPictures",realm:"ui"}),y=!0,X="screenpics";function F(j,q){return G(new URLSearchParams(q??""),X)??(y||b.stagingOrDev(j))}var I=(function(j,q){if(new URLSearchParams(q??"").get(X)==="off")j.searchParams.set(B,"off")});var K=!1;function T(){return K}var L=/^\/cdn\/[^?#]+\.(?:png|webp)(?=[?#]|$)/i,V=`${B}=${J}`,k=new RegExp(`[?&]${B}=`);function W(j){if(!L.test(j))return j;let q=j.indexOf("#"),z=q===-1?j:j.slice(0,q);if(k.test(z))return j;return`${z}${z.includes("?")?"&":"?"}${V}${q===-1?"":j.slice(q)}`}function D(j){return j.split(",").map(function(q){let z=q.trim();if(!z)return"";let[Z,...$]=z.split(/\s+/);return[W(Z),...$].join(" ")}).filter(Boolean).join(", ")}
;

;import{LCL as B,Plk as J}from"./5827930fb303a181.mjs";import{A56 as H,uKd as G}from"./aabb4631-33aaa860f9130c90.mjs";export{D as Bwc,F as FbD,I as p68,T as pfs,W as y_r};
