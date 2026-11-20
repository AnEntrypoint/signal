;const{XAl:G}=$Lr;
var Y=0.25;var B="terrain:water",V="terrain:water:",W=(j)=>j===B||j.length>V.length&&j.startsWith(V);var U=Y*G;var H="terrain/mark-liquid",J=`${H}/`;var b="sea";var D=(j)=>j.startsWith(J)&&j.endsWith(`/${b}`)&&j.slice(J.length).split("/").length===3;var F=function(j){if(!j.startsWith(J))return!1;let $=j.indexOf("/",J.length),O=j.lastIndexOf("@");return $>0&&O>$+1&&W(j.slice($+1,O))};var M=1.6;var P=M;var N="engine/portal-rift",R="engine/portal-rift-halo",_="halo";
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{D as opG,F as Tj9,J as mGG,N as d7m,P as Ca9,R as qfr,_ as APY};
