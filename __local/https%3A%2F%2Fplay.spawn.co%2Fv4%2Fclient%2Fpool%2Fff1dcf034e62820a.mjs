
;var q=new Float64Array(3);function S(A,B){return q[0]=A,q[1]=B,P(q,0,1,q,2),q[2]}function P(A,B,L,C,E){let D=Math.abs(A[B]),F=Math.abs(A[B+L]);if(D===Number.POSITIVE_INFINITY||F===Number.POSITIVE_INFINITY){C[E]=Number.POSITIVE_INFINITY;return}if(D!==D||F!==F){C[E]=Number.NaN;return}let G=Math.max(D,F);if(G===0){C[E]=0;return}let k=0,K=0,j=D/G,I=j*j-K,J=k+I;K=J-k-I,k=J,j=F/G,I=j*j-K,J=k+I,k=J,C[E]=Math.sqrt(k)*G}
;

;import"./f11f54a2bd263bff.mjs";export{S as Nuk};
