import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(j){if(j.length>D)throw Error(`packCornerBits: ${j.length} corners, at most ${D}`);let z=[0,0,0,0];j.forEach(function(q,y){if(!Number.isInteger(q)||q<0||q>7){{throw Error(`packCornerBits: corner ${y} is ${q}, not a three-bit code`);\n}}z[Math.floor(y/10)]=(z[Math.floor(y/10)]|q<<y%10*3)>>>0});return z})",()=>'(function(j,z){let q=G(z);return`fn ${j}(v: u32) -> vec3<f32> {\n  let words = vec4<u32>(${q.map((y)=>`${y}u`).join(", ")});\n  let q = v / 10u;\n  let c = ${F("q",["words.x","words.y","words.z","words.w"])} >> ((v % 10u) * 3u);\n  return vec3<f32>(vec3<u32>(c, c >> 1u, c >> 2u) & vec3<u32>(1u));\n}`})']}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,92701925048320);
;const{YnC:F}=$Lr;
var D=40,J=[0,4,6,0,6,2,1,3,7,1,7,5,0,1,5,0,5,4,2,6,7,2,7,3,0,2,3,0,3,1,4,5,7,4,7,6];function K(j){return(j[0]>0?1:0)|(j[1]>0?2:0)|(j[2]>0?4:0)}function G(a){return (G=$c0C(0)).call(this,a)}function P(a,b){return (P=$c0C(1)).call(this,a,b)}
;



;import{R as $Lr}from"./52e971dc2a986655.mjs";export{J as eX5,K as I0l,P as mW0};
