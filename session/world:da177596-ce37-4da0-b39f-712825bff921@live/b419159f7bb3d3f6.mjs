
;var R=W();var I=(function(j,A,D){let q=new Float32Array(D*3),P=0;for(let K=0;K<D;K++){let U=A[P],V=0,X=0,Z=0;for(let Q=0;Q<U;Q++){let F=A[P+1+Q]*3,J=A[P+1+(Q+1)%U]*3;V+=(j[F+1]-j[J+1])*(j[F+2]+j[J+2]),X+=(j[F+2]-j[J+2])*(j[F]+j[J]),Z+=(j[F]-j[J])*(j[F+1]+j[J+1])}$(V,X,Z,R),q[K*3]=R.x,q[K*3+1]=R.y,q[K*3+2]=R.z,P+=1+U}return q});var x=(function(){let j=Math.sqrt(2),A=Math.sqrt(2+j)/2,D=j/2,q=Math.sqrt(2-j)/2;return[1,A,D,q,0,-q,-D,-A,-1,-A,-D,-q,0,q,D,A]})();
;

;import{TCQ as W,qap as $}from"./b55bce0857aae25e.mjs";export{I as W0i,x as IF0};
