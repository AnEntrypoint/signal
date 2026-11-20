;const{qs_:P}=$Lr;
;class S{constructor(q,z,H=null){this.arena=void 0;this.label=void 0;this.slots=new Map;this.hookGraph=null;this.flushHook=function(){return};this.recycleHook=function(){return};this.recycles=void 0;this.label=z,this.arena=H??P(q).uniform,this.recycles=H===null}bindGroup(q,z,H,J,K,x){let j=this.slots.get(J);if(!j){j=a.call(this,j,K,x,J)}if(!this.arena.hasPending)z.addPreSubmitUpload(this.flushHookFor(z));if(this.arena.write(j.offset,K),!j.bindGroup||j.generation!==this.arena.generation||j.floor!==x){b.call(this,j,x,q,J,H);}return j.bindGroup}flushHookFor(q){if(this.hookGraph!==q)this.mintHooks(q);return this.flushHook}mintHooks(q){this.hookGraph=q,this.recycleHook=()=>this.arena.recycle(),this.flushHook=()=>{if(this.arena.flush(),this.recycles&&this.arena.hasRetired)q.addPreSubmitUpload(this.recycleHook)}}dispose(){for(let q of this.slots.values())this.arena.free(q.offset,q.sizeBytes);this.slots.clear()}}
;

function a(j,K,x,J){j={offset:0,sizeBytes:K.byteLength,bindGroup:null,generation:-1,floor:x},j.offset=this.arena.alloc(j.sizeBytes),this.slots.set(J,j);
return j}
function b(j,x,q,J,H){let M=[{binding:0,resource:{buffer:this.arena.buffer,offset:j.offset,size:j.sizeBytes}}];if(x)M.push({binding:Q,resource:x});j.bindGroup=q.createBindGroup({label:`${this.label} ${J}`,layout:H,entries:M}),j.generation=this.arena.generation,j.floor=x
}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{Bvg as Q}from"./4893bc22c87f5aee.mjs";export{S as oAG};
