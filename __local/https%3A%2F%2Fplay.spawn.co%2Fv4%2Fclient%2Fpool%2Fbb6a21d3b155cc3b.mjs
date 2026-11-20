;const{XAl:G,e0h:B}=$Lr;
var Q=0.25;var Y="terrain:water",O="terrain:water:",W=(j)=>j===Y||j.length>O.length&&j.startsWith(O);var A=Q*G;var v=(j)=>j instanceof Int16Array?j:B(j,Int16Array,Int32Array);var q="terrain/mark-liquid",J=`${q}/`;var H="sea";var S=(j)=>j.startsWith(J)&&j.endsWith(`/${H}`)&&j.slice(J.length).split("/").length===3;var T=function(j){if(!j.startsWith(J))return!1;let $=j.indexOf("/",J.length),V=j.lastIndexOf("@");return $>0&&V>$+1&&W(j.slice($+1,V))};var b=1.6;var P=b;var p="engine/portal-rift",E="engine/portal-rift-halo",I="halo";
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{E as qfr,I as APY,J as mGG,P as Ca9,S as opG,T as Tj9,p as d7m,v as G$P};
