;const{IVz:V,XWQ:j,azq:Z,ts0:K}=$Lr;
var J=65536,o=J*2;var U=J*V,YQ=Z*V;var q={scale:20,hue:10,value:0.12},X=340282346638528860000000000000000000000,H=0.000000000000000000000000000000000000011754943508222875,P=2.3,k=0.00000095367431640625,W=2.0009765625,NQ=function(Q){if(typeof Q!=="number")return q.scale;let $=Math.abs(Math.fround(Q));return isFinite($)&&U/$*P*(1+k)<=X?Q:q.scale},gQ=function(Q){let $=typeof Q==="number"?Q*K/180:NaN,Y=Math.abs(Math.fround($));if(!isFinite(Y))return q.hue*K/180;return Y<H?0:$},DQ=function(Q){if(typeof Q!=="number")return q.value;let $=Math.abs(Math.fround(Q));if(!(isFinite($)&&(1+$)*j*W<=X))return q.value;return $<H?0:Q};
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{DQ as F5c,NQ as _nT,gQ as B9q,q as Vnz};
