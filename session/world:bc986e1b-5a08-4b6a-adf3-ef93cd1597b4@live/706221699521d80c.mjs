
function M(v,G=","){let H=[],J=0,F="",K=0;for(let z=0;z<v.length;z++){let k=v[z];if(k==="\\")z++;else if(F!=="")F=k===F?"":F;else if(k==='"'||k==="'")F=k;else if(k==="("||k==="[")J++;else if(k===")"||k==="]")J--;else if(k===G&&J===0)H.push(v.slice(K,z).trim()),K=z+1}return H.push(v.slice(K).trim()),H.filter(Boolean)}var Q=function(v,G){try{return v.matches(G)}catch{return!1}};
export{M as o76,Q as MfE};
