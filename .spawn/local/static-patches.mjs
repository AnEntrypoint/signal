const TICK = String.fromCharCode(96);
const DOLLAR_BRACE = '$' + '{';
const PIVOT_SPEC = '$Xi(e,t,' + TICK + 'boundless|' + DOLLAR_BRACE + 'cQ2(n)}' + TICK + ')';
const SPAWN_BARE = 'if(S.bare==="3d")RI$(';
const SUMMARY_CALLER = 'function Bk(e,t,r,i,n,l,s=0,o){let a=v7();if(a===null)return null;';
const REALM_HOST = 'let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);if(i!==void 0)return\x60\x24{t}-\x24{i}.\x24{whv}\x60;return r.includes(".")?\x60\x24{t}-\x24{r}\x60:\x60\x24{t}.\x24{r}\x60});';

export function staticPatches(basePath, manifest) {
  const sessionSegment = basePath.split('/').filter(Boolean).length + 2;
  return [
    ['w=!c&&Gt()', 'w=!c'],
    ['var r=decodeURIComponent(n.pathname.split("/")[2]||"")', 'var r=decodeURIComponent(n.pathname.split("/")[' + sessionSegment + ']||"")'],
    ['var t=e.ok?e.headers.get("x-spawn-manifest"):null', 'var t=e.ok?(e.headers.get("x-spawn-manifest")||"' + manifest + '"):null'],
    ['&&!aUQ(e,t)&&' + PIVOT_SPEC, '&&!aUQ(e,t)&&!String(t).startsWith("engine-warm|")&&' + PIVOT_SPEC],
    [SPAWN_BARE, 'if(S.bare==="3d"&&!/^player\\/c_actor:pa_0+$/.test(t))RI$('],
    [SUMMARY_CALLER, SUMMARY_CALLER.replace('let a=v7();', 'let a=null;'), 'let a=v7();if(a===null)return null;'],
    [REALM_HOST, 'return null});', 'let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);'],
  ];
}

export function createPatcher(patches) {
  const patched = new Map(patches.map(([from]) => [from, 0]));
  const patch = (text) => patches.reduce((out, [from, to]) => {
    const count = out.split(from).length - 1;
    if (count > 1) throw new Error('static patch pattern matched ' + count + ' times in one file: ' + from.slice(0, 80));
    if (count === 0) return out;
    patched.set(from, patched.get(from) + 1);
    return out.replace(from, () => to);
  }, text);
  const verify = (files) => {
    for (const [from, count] of patched) if (count === 0) throw new Error('static patch pattern not found in any file: ' + from.slice(0, 80));
    for (const file of files.values()) {
      const text = file.body.toString('utf8');
      for (const [from, , guard = from] of patches) if (text.includes(guard)) throw new Error('static patch pattern left in a file: ' + guard.slice(0, 80));
    }
  };
  return { patch, verify };
}
