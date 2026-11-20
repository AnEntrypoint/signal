;const{LDz:j,HBs:q,aEa:G,XAh:Q,$L9:U}=$Ss;
var J="[A-Za-z0-9._~!$&'()*,;=-]+",V="[a-z0-9._~!$&'()*,;=-]+",z=j.source.slice(1,-1),Z=G.source.slice(1,-1),P=new RegExp(`^(?:(?:world:[A-Za-z0-9_.-]+|@@?${J}/${J})(?:@(${z}))?(?:/room:${Z})*|@(${z}))(?:\\s*\\+${z})?$`),R=new RegExp(`^@@?${V}/${V}(?:@${z})?$`),v=new RegExp(`^@@?${J}/${J}(?:@${z})?$`);function x(B,M=q){if(!B)return M;let $=B.trim();if(!$.includes("@"))return M;let X=P.exec($);return X===null?void 0:X[1]??X[2]??M}function y(B){if(R.test(B))return!0;if(!B.startsWith("@")||/\s/.test(B)||v.test(B))return!1;return}var C=0.1,H={desktop:6000,constrained:3000};;
Object.assign($Ss,{WUt:Q,fjO:y,l_m:U,poZ:H,tytG:C,ym6:x});

;import{S as $Ss}from"./8470e5fcd747a5a5.mjs";export{C as tytG,H as poZ,Q as WUt,U as l_m,x as ym6,y as fjO};
