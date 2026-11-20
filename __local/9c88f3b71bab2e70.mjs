;;;;;;;;;;
;var k=`
fn dot2(v: vec2f) -> f32 { return dot(v, v); }

fn sdQuadratic(pos: vec2f, A: vec2f, B: vec2f, C: vec2f) -> f32 {
  let a = B - A;
  let b = A - 2.0 * B + C;
  let c = a * 2.0;
  let d = A - pos;
  if (dot2(b) < 1e-12) {
    let e = C - A;
    let t = clamp(dot(pos - A, e) / max(dot2(e), 1e-12), 0.0, 1.0);
    return length(pos - (A + t * e));
  }
  let kk = 1.0 / dot2(b);
  let kx = kk * dot(a, b);
  let ky = kk * (2.0 * dot2(a) + dot(d, b)) / 3.0;
  let kz = kk * dot(d, a);
  let p = ky - kx * kx;
  let q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;
  let h = q * q + 4.0 * p * p * p;
  var res = 0.0;
  if (h >= 0.0) {
    let sh = sqrt(h);
    let x = (vec2f(sh, -sh) - q) / 2.0;
    let uv = sign(x) * pow(abs(x), vec2f(1.0 / 3.0));
    var s = uv.x + uv.y;
    s = s - (s * (s * s + 3.0 * p) + q) / max(3.0 * (s * s + p), 1e-12);
    let t = clamp(s - kx, 0.0, 1.0);
    res = dot2(d + (c + b * t) * t);
  } else {
    let z = sqrt(-p);
    let v = acos(q / (p * z * 2.0)) / 3.0;
    let m = cos(v);
    let n = sin(v) * 1.7320508075688772;
    let three = clamp(vec3f(m + m, -n - m, n - m) * z - kx, vec3f(0.0), vec3f(1.0));
    res = min(dot2(d + (c + b * three.x) * three.x), dot2(d + (c + b * three.y) * three.y));
  }
  return sqrt(res);
}
`;
;

;import"./89a7a8b67e5ccece.mjs";import"./26ceb10f-49e18729068cd5df.mjs";import"./36bad4b5-c35867ec88f49b93.mjs";import"./6013db8f3213cfbc.mjs";import"./4953a97fb1e990b7.mjs";import"./46b1c77c67f7de91.mjs";import"./9959d013-206ed91ad8a1f4fe.mjs";import"./28eaa8f9-50fa1514558f9aa0.mjs";import"./c34ac5348a859a57.mjs";import"./9ea24b35-1e1b57998df92b8d.mjs";import{Aiu as C,CZQ as d,CoE as s,DZ2 as i,Ss4 as a,fCM as _,m1D as f,o$o as r,pPp as h,tfO as o,vMi as c,yw7 as l}from"./9ea24b35-1e1b57998df92b8d.mjs";export{C as $Kn,_ as vs8,a as F8Z,c as mEI,d as xVj,f as fqg,h as JYI,i as wTp,k as BJ$,l as oNv,o as tlq,r as XKx,s as Z1N};
