
function q(c,m){let g=m;while(c[g]!==g)c[g]=c[c[g]],g=c[g];return g}function u(c,m,g){let j=q(c,m),k=q(c,g);if(j<k)c[k]=j;else if(k<j)c[j]=k}
export{q as PZt,u as _oW};
