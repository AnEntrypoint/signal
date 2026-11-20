
var E=function(C,A){let B=Array.from({length:A.length+1},(x,z)=>z);for(let x=1;x<=C.length;x++){let z=[x];for(let q=1;q<=A.length;q++)z[q]=Math.min(B[q]+1,z[q-1]+1,B[q-1]+(C[x-1]===A[q-1]?0:1));B=z}return B[A.length]};
export{E as CWY};
