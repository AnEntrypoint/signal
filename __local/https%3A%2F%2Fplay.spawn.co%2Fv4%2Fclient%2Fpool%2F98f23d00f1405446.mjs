
function E(j,z,q,y){return C(j.get(q),j,z,q,y)}function C(j,z,q,y,A){return j!==void 0&&j.generation===y.generation?j.value:D(z,q,y,A)}function D(j,z,q,y){let A=q.generation,B=y(z,q);return j.set(q,{generation:A,value:B}),B}
export{E as Tvt};
