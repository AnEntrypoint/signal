
var G=4;function H(B,E){if(E<=1)return B;let D=[...B].sort((q,F)=>F.weight-q.weight).slice(0,4),A=0;for(let q of D)A+=q.weight;return D.map((q)=>({joint:q.joint,weight:A>0?q.weight/A:0}))}
export{G as L7F,H as syI};
