;const{$zE:P,WAd:Q,zfZ:N}=$Lr;
var H=new N("texture-rank-walk",function(z){for(let q of z.worn.values())q.unhear?.();z.worn.clear()});function J(z,q,j,B){q.unhear?.(),q.speaker=B,q.rank=NaN,q.unhear=B.watchTextureWait?.(j,()=>z.road.add(j))??null,z.moved.add(j)}function F(z,q,j,B,E){let D=z.store(H,()=>({key:NaN,worn:new Map,moved:new Set,road:new Set,one:[]})),C=D.worn.get(j);if(C===void 0){let v$1;{let C$1=C;{let C=C$1;C={speaker:q,wearers:new Map,best:null,rank:NaN,owed:!1,unhear:null},D.worn.set(j,C),J(D,C,j,q);
v$1=C;}}C=v$1}else if(C.speaker.noteTextureRank===void 0&&q.noteTextureRank!==void 0)J(D,C,j,q);C.wearers.set(B,E),X(z,B,j)}function M(z,q,j){let B=z.peekStore(H),E=B?.worn.get(q);if(B===null||E===void 0||!E.wearers.delete(j))return;if(E.best===j)B.moved.add(q);if(E.wearers.size>0)return;E.unhear?.(),B.worn.delete(q)}function X(z,q,j){let B=z.peekStore(H);if(B===null||B.worn.get(j)?.owed!==!0)return;B.one.push(j,q)}function g(z,q,j){let B=z.peekStore(H);if(B===null)return;for(let[E,D]of B.worn)if(D.speaker===q)J(B,D,E,j)}function I(z){let q=z.peekStore(H);if(q!==null)q.key=NaN}function T(z,q,j){if(j!==z.rank&&!Number.isNaN(j))z.speaker.noteTextureRank?.(q,j);z.rank=j}function U(z,q){let j=z.speaker.getTextureAssetInfo?.(q);return z.owed=j===null||j===void 0||z.speaker.textureLoadOnRoad?.(q)===!0}function S(z,q){let j=z.peekStore(H);if(j===null)return;for(let C of j.road){{let C$2=C;{let C=C$2;let G=j.worn.get(C),V=G?.owed;if(G!==void 0&&U(G,C)&&!V)j.moved.add(C)
}}}j.road.clear();let B=Q(q);if(B!==j.key){{for(let[C,G]of j.worn)if(G.owed)j.moved.add(C)
}}if(j.key=B,j.moved.size===0&&j.one.length===0)return;let E=j.frame=P(q,j.frame),D="";for(let C of j.one){if(typeof C==="string")D=C;else {Y:{let z$1=j,q$1=D,j$1=C,B$1=E,E$1=q;{let z=z$1,q=q$1,j=j$1,B=B$1,E=E$1;{let v$2;d:{let D=z.worn.get(q),C=D?.wearers.get(j);if(D===void 0||C===void 0||!D.owed||z.moved.has(q))break d;if(Number.isNaN(D.rank)){z.moved.add(q);break d;}let G=C.rank(j,B,E);if(j===D.best&&!(G>=D.rank))z.moved.add(q);else if(j===D.best||G>D.rank){D.best=j;T(D,q,G)}
v$2=b;}if((c=v$2)!==b){(c);break Y;}}}}}}j.one.length=0;for(let C of j.moved){let G=j.worn.get(C);if(G!==void 0){Z:{let z$2=G,q$2=C,j$2=E,B$2=q;{let z=z$2,q=q$2,j=j$2,B=B$2;if(!U(z,q))break Z;let E=NaN;z.best=null;for(let[D,C]of z.wearers){let G=C.rank(D,j,B);if(Number.isNaN(E)||G>E)E=G,z.best=D}T(z,q,E)}}}}j.moved.clear()}
;





function b(){}var c;function i(){}

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{F as I8l,I as pmc,M as Hb2,S as wni,X as _JI,g as cT9};
