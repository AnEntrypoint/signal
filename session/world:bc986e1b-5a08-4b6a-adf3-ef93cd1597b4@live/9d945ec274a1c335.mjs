import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(j,P,z){let J=P*28;j[J+K.anchor]=z.anchor[0],j[J+K.anchor+1]=z.anchor[1],j[J+K.anchor+2]=z.anchor[2],j[J+K.outlineWidth]=z.outlineWidth,j[J+K.baseRotation]=z.baseRotation[0],j[J+K.baseRotation+1]=z.baseRotation[1],j[J+K.baseRotation+2]=z.baseRotation[2],j[J+K.baseRotation+3]=z.baseRotation[3],j[J+K.local]=z.local[0],j[J+K.local+1]=z.local[1],j[J+K.local+2]=z.local[2],j[J+K.local+3]=z.local[3],j[J+K.uvScale]=z.uvScale[0],j[J+K.uvScale+1]=z.uvScale[1],j[J+K.uvOffset]=z.uvOffset[0],j[J+K.uvOffset+1]=z.uvOffset[1],j[J+K.fill]=z.fill[0],j[J+K.fill+1]=z.fill[1],j[J+K.fill+2]=z.fill[2],j[J+K.fill+3]=z.fill[3],j[J+K.outline]=z.outline[0],j[J+K.outline+1]=z.outline[1],j[J+K.outline+2]=z.outline[2],j[J+K.worldLineHeight]=z.worldLineHeight,j[J+K.distanceRange]=z.distanceRange,j[J+K.emissive]=z.emissive,j[J+K.flags]=z.billboardMode+(z.pixelSnap?4:0),j[J+K.sortDepth2D]=z.sortDepth2D})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,1,2145376107757568);
;const{L24:v,Y0s:U,m1u:$}=$Lr;
;var Y=28,M=112,V={fixed:0,yaw:1,full:2},L=4,B=8,D=16,f=32,K={anchor:0,outlineWidth:3,baseRotation:4,local:8,uvScale:12,uvOffset:14,fill:16,outline:20,worldLineHeight:23,distanceRange:24,emissive:25,flags:26,sortDepth2D:27};function x(a,b,c){return (x=$c0C(0)).call(this,a,b,c)}var R=`struct TextInstance {
  anchor: vec4f,
  baseRotation: vec4f,
  local: vec4f,
  uvScaleOffset: vec4f,
  fill: vec4f,
  outline: vec4f,
  misc: vec4f,
}`;var c=[0,0,0,1];function C(j,P,z){let J=q(j,z);return{quat:J===V.fixed?G(P,z,[0,0,0,1]):c,gpuMode:J}}function q(j,P){if(P==="2d-side"||P==="2d-top")return V.fixed;let z=j.billboard??"yaw";if(z==="none")return V.fixed;return z==="full"?V.full:V.yaw}function G(j,P,z){if(P==="2d-side")return H(j.rotation,z);if(P==="2d-top")return Q(j.rotation,z);return z[0]=j.rotation[0],z[1]=j.rotation[1],z[2]=j.rotation[2],z[3]=j.rotation[3],z}var m=1,W=-1;function k(j){return j.sortingLayer!==void 0||j.sortingOrder!==void 0}function I(j,P,z,J,Z=$){if(!k(j))return 0;return v(j,0,P,z,J,Z)}function O(j,P,z,J,Z=$){if(P==="3d")return 0;if(!k(j))return W;return U(j,0,P,z,J,Z)}function F(j,P,z){if(z==="3d")return j;if(!k(P))return`${j}|anchor`;return`${j}|${P.sortingLayer??0}|${P.sortingOrder??0}`}function N(j,P){return j&&P!=="3d"}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{SB9 as Q,nrt as H}from"./dc77b26eb0e1a270.mjs";export{B as vhV,C as vnm,D as rJd,F as IrQ,G as LGN,I as eCQ,K as It$,L as Lzh,M as mw3,N as CiT,O as YOt,R as r9n,V as rJm,Y as CBQ,f as CiM,m as Hbr,q as ULL,x as UgJ};
