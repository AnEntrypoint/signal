() => {
  const keys = Object.keys(window).filter((k) => /spawn|kernel|tome|realm|lane|witness|gpu/i.test(k));
  const globals = {};
  for (const k of keys) {
    try {
      const v = window[k];
      globals[k] = v === null ? 'null' : typeof v === 'function' ? 'fn' : typeof v === 'object' ? Object.prototype.toString.call(v) + (Array.isArray(v) ? ' len ' + v.length : '') : String(v).slice(0, 80);
    } catch (e) { globals[k] = 'ERR'; }
  }
  return {
    url: location.href.slice(0, 260),
    title: document.title,
    cls: document.documentElement.className,
    globals,
    marks: performance.getEntriesByType('mark').map((m) => m.name).slice(0, 120),
    lsKeys: Object.keys(localStorage).slice(0, 60),
    ssKeys: Object.keys(sessionStorage).slice(0, 60),
    body: (document.body ? document.body.innerText : '').slice(0, 600),
    canvases: [...document.querySelectorAll('canvas')].map((c) => c.width + 'x' + c.height + ' ' + c.getBoundingClientRect().width.toFixed(0) + 'x' + c.getBoundingClientRect().height.toFixed(0)),
    gpu: typeof navigator.gpu,
    iframes: [...document.querySelectorAll('iframe')].map((f) => (f.getAttribute('src') || '').slice(0, 160)),
  };
}