
var B=["srgb","srgb+mips","linear","linear+mips"],F=/\/value\.([0-9a-f]{64})\.ktx2(?:[?#].*)?$/;function H(b){return F.exec(b)?.[1]??null}function J(b,j){return`${b}${j?"+mips":""}`}function G(b,j){return`${b} sha256:${j}`}var q=[];function Q(b){q.push(new WeakRef(b))}function V(b){for(let j=q.length-1;j>=0;j--){let v=q[j].deref();if(v===void 0){q.splice(j,1);continue}for(let z of B){let k=v.get(G(z,b));if(k!==void 0&&a(k))return!0}}return!1}
;

function a(k){return(!(k.settled&&k.texture===null&&k.picture===null))}

;export{G as Dbf,H as tlO,J as ynx,Q as $Pf,V as TIY};
