var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;var F=new Map,E=new Map;var Q=U("decoration-mesh",Z,function(j){H:{let x=F.get(j.requestId);if(x===void 0||j.lanes===void 0)break H;F.delete(j.requestId);let A=[x,...x.levels??[]];for(let[M,J,K]of X(j.lanes)){let C=A[M];if(C!==void 0)C[J]=K}}return j.geometry},(j)=>`[decoration-mesh] the codec worker could not compose a mesh (${j.fault??"no reason"}): it composes on the render thread`);function O(j,x,A,M=!1){let J=E.get(j);if(J!==void 0)return J.push(function(){if(!O(j,x,A))A(null)}),!0;if(!W(j))return N(j),!1;let K=M?Y(j):null;if(K===null){return a(j,x,A);}V(j);let C=0;let _=function(z){let $=F.delete(C),D=E.get(j)??[];E.delete(j);if($){b(j);}A(z);for(let G of D)G()};E.set(j,[]);let P=Q.ask(function(z){return C=z,F.set(z,j),{kind:"decoration-geometry-compose",requestId:z,transfer:j,sink:x,moved:!0}},_,K);if(!P)F.delete(C),E.delete(j);return P}
;

function a(j,x,A){return Q.ask((z)=>({kind:"decoration-geometry-compose",requestId:z,transfer:j,sink:x}),A);
}
function b(j){N(j),__sc.warn(`[decoration-mesh] the codec worker ended holding the lanes of mesh ${j.signature}: its items draw when its row comes again`);
}

;import{Ast as Y,M8f as Z,TyV as V,U3r as X,efG as N,nal as W}from"./d78d80a5-ec7dd8a579991798.mjs";import{A7z as U}from"./044cde0b47918ed4.mjs";export{O as BkR};
