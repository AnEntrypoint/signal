//# allFunctionsCalledOnLoad
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,435447,337276,88786,e=>{"use strict";var t=e.i(3361),r=e.i(266497),n=e.i(407748),o=e.i(289985),a=e.i(733461),i=e.i(924854);let l="__spawnPhoenixArrival",d="__spawnPhoenixMakes",s="data-phoenix-makes",u="data-phoenix-frame",w="data-phoenix-world",f="spawn-phoenix-row",h=`${r.P};display:block;border:0;-webkit-user-select:none;user-select:none`,c=String.raw`
(function () {
  try {
    var win = window, doc = document, root = doc.documentElement;
    if (win['${l}']) return;
    ${o.r};
    var KEY = '${"spawn.phoenix.arrivals"}', MAKES = '${d}', ATTR = '${s}', held = null, asked = null;
    function table() { try { var t = JSON.parse(win.localStorage.getItem(KEY) || '{}'); return t && typeof t === 'object' ? t : {}; } catch (e) { return {}; } }
    function write(t) { try { win.localStorage.setItem(KEY, JSON.stringify(t)); } catch (e) {} }
    function keep(row) {
      var t = table(), keys = [], key;
      t[win.location.pathname] = { world: row.world, title: row.title, play: row.play, make: row.make, door: row.door, hop: row.hop, makes: row.makes, at: Date.now() };
      for (key in t) keys.push(key);
      keys.sort(function (a, b) { return ((t[a] && t[a].at) || 0) - ((t[b] && t[b].at) || 0); });
      for (var i = 0; i < keys.length - ${24}; i++) delete t[keys[i]];
      write(t);
    }
    function isolates() {
      if (win.${n.DOCUMENT_ISOLATES_MARK}) return true;
      try { var says = (win.performance.getEntriesByType('navigation')[0] || {}).serverTiming || []; for (var i = 0; i < says.length; i++) if (says[i].name === '${"spawn-isolate"}') return true; } catch (e) {}
      return false;
    }
    function frames(world) {
      var all = doc.querySelectorAll('iframe[${u}]'), mine = [];
      for (var i = 0; i < all.length; i++) if (all[i].getAttribute('${w}') === world) mine.push(all[i]);
      return mine;
    }
    function made(world, title) {
      var frame = doc.createElement('iframe');
      frame.setAttribute('${u}', 'asking');
      frame.setAttribute('${w}', world);
      frame.setAttribute('title', title);
      frame.setAttribute('allow', '${"fullscreen; gamepad; autoplay; xr-spatial-tracking; microphone; camera; display-capture; geolocation"}');
      frame.setAttribute('style', '${h}');
      return frame;
    }
    function put(frame) {
      (doc.body || root).appendChild(frame);
      if (!doc.body && typeof MutationObserver === 'function') {
        // (a document with no body lays nothing out by itself, and a frame with no box is not drawn: the read lays it out)
        try { frame.getBoundingClientRect(); } catch (e) {}
        var seen = new MutationObserver(function () {
          if (!doc.body) return;
          seen.disconnect();
          if (frame.parentNode === root && doc.body.parentNode === root) root.insertBefore(doc.body, frame);
        });
        seen.observe(root, { childList: true });
      }
      return frame;
    }
    function frameOf(world, title) { return frames(world)[0] || put(made(world, title)); }
    function point(frame, link) {
      if (frame.getAttribute('src') === link) return;
      if (frame.hasAttribute('srcdoc')) { frame.setAttribute('src', link); frame.removeAttribute('srcdoc'); }
      else frame.src = link;
    }
    function makes() { var S = win[MAKES]; return held.row.door && S && S.world === held.row.world ? S.makes : 'no'; }
    // The page stands as the value says: the root's word for the shape, the hop, and the frame's link.
    function shown() {
      var row = held.row, m = makes();
      if (m === 'no' && row.hop && held.own) { win.location.replace(row.hop + win.location.search + win.location.hash); return; }
      if (row.door) { if (m === 'no') root.removeAttribute(ATTR); else root.setAttribute(ATTR, m); }
      if (win.location.hash || /[?&]room=/.test(win.location.search) || isolates()) return;
      var link = m === 'yes' ? row.make : m === 'no' || !row.play ? row.play : row.makes === 'yes' ? row.make : row.play;
      // (a link this arrival handed that the page's row no longer names: the kept row was older than the page)
      if (!link) { if (held.handed) { held.handed = null; unframe(row.world); } return; }
      var frame = frames(row.world)[0];
      if (!frame || frame.getAttribute('src') !== link) {
        if (asked !== row.world) {
          asked = row.world;
          try {
            var ask = win.fetch('${r.r}', { method: 'POST', credentials: 'same-origin', headers: ${a.I}, body: JSON.stringify({ world: row.world }) });
            ask.then(null, function () {});
            win['${"__spawnPhoenixAsked"}'] = { world: row.world, asked: ask };
          } catch (e) {}
        }
        if (!frame && follows === link) {
          if (landed === undefined) { held.handed = link; return; }
          if (landed && landed.link === link) {
            frame = made(row.world, row.title);
            frame.setAttribute('src', link);
            frame.setAttribute('srcdoc', landed.text);
            landed = null;
            put(frame);
            held.handed = link;
            return;
          }
        }
        point(frame || frameOf(row.world, row.title), link);
      }
      held.handed = link;
    }
    function ask(S, door, n) {
      win.fetch(door, { credentials: 'same-origin', cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (b) { return b && typeof b.makes === 'boolean' ? b.makes : null; }, function () { return null; })
        .then(function (m) {
          if (S !== win[MAKES] || !held) return;
          if (m === null) { win.setTimeout(function () { ask(S, door, n + 1); }, Math.min(8000, 500 * Math.pow(2, n))); return; }
          S.makes = held.row.makes = m ? 'yes' : 'no';
          if (held.own) keep(held.row);
          shown();
          var hear = S.hear.slice();
          for (var i = 0; i < hear.length; i++) hear[i]();
        });
    }
    function unframe(world) {
      var mine = frames(world);
      for (var i = 0; i < mine.length; i++) if (mine[i].parentNode) mine[i].parentNode.removeChild(mine[i]);
    }
    function leave() {
      unframe(held.row.world);
      if (win[MAKES] && win[MAKES].world === held.row.world) { win[MAKES] = undefined; root.removeAttribute(ATTR); }
      held = null;
    }
    function arrive(row, own) {
      if (held && held.row.world !== row.world) leave();
      if (!row.makes && held) row.makes = held.row.makes;
      held = { row: row, own: own || !!(held && held.own), handed: held ? held.handed : null };
      var S = win[MAKES];
      if (row.door && (!S || S.world !== row.world)) {
        S = win[MAKES] = { world: row.world, makes: 'no', hear: [] };
        if (/(?:^|;\s*)${i.c}(?:\.\d+)?=/.test(doc.cookie)) { S.makes = 'unread'; ask(S, row.door, 0); }
        else row.makes = 'no';
      }
      if (own) keep(row);
      shown();
    }
    win['${l}'] = { arrive: arrive, frame: frameOf, point: point };
    function path(value, head) { return typeof value === 'string' && value.indexOf(head) === 0 ? value : null; }
    // A row from before the page's own word, read as data: only a world's own links are opened.
    function rowOf(r) {
      if (!r || typeof r !== 'object' || typeof r.world !== 'string' || typeof r.title !== 'string') return null;
      return { world: r.world, title: r.title, play: path(r.play, '/core/'), make: path(r.make, '/core/'), door: path(r.door, '/api/phoenix/makes?'), hop: path(r.hop, '/@'), makes: r.makes === 'yes' || r.makes === 'no' ? r.makes : null };
    }
    function edgeRow(given) { try { return given && typeof given.core === 'string' ? rowOf(JSON.parse(given.core)) : null; } catch (e) { return null; } }
    var ends = false;
    function early(row) {
      if (!row || held) return;
      arrive(row, false);
      if (ends) return;
      ends = true;
      doc.addEventListener('DOMContentLoaded', function () {
        if (!held || held.own) return;
        leave();
        var t = table();
        delete t[win.location.pathname];
        write(t);
      });
    }
    // THE EDGE MAY SEND THE LINK'S DOCUMENT INSIDE THIS PAGE'S OWN ANSWER (@spawn/core/world-door-prefix DOOR_PREFIX_CORE_DOC_HOOK). follows: the
    // link whose document it said comes; landed: that document, or null where none comes. Until one of the two, the link is asked of nobody.
    var follows = null, landed;
    // THE TEXT IS WAITED FOR WHERE THAT IS THE SHORTER ROAD: it saves the frame one round trip and costs the door's whole answer, so the
    // page's own round trip, as this browser timed it, is weighed against the door's last answer, as the edge timed it (about). A
    // shorter trip starts the frame at its link now. A longer one waits for the text, no longer than that trip.
    function says(given) {
      if (!given || typeof given.doc !== 'string' || typeof given.about !== 'number') return;
      var trip = 0;
      try { var nav = win.performance.getEntriesByType('navigation')[0]; trip = nav ? nav.responseStart - nav.requestStart : 0; } catch (e) {}
      if (!(trip > given.about)) return;
      follows = given.doc;
      win.setTimeout(function () { if (landed !== undefined) return; landed = null; if (held) shown(); }, trip);
    }
    win['${t.Y}'] = function (d) {
      if (landed !== undefined) return;
      landed = d && typeof d.link === 'string' && typeof d.text === 'string' ? d : null;
      if (held) shown();
      landed = null;
    };
    doc.addEventListener('DOMContentLoaded', function () {
      if (landed !== undefined) return;
      landed = null;
      if (held) shown();
    });
    // (the edge says its row before this script where it holds it at the first byte, and after it when its store's read lands: this ear hears that)
    win['${t.Z}'] = function (given) { says(given); early(edgeRow(given)); };
    says(win['${t.b}']);
    early(rowOf(table()[win.location.pathname]) || edgeRow(win['${t.b}']));
  } catch (e) {}
})();
`;e.s(["s",0,l,"q",0,f,"x",0,c,"C",0,u,"U",0,s,"W",0,d],337276);var m=e.i(72873),p=e.i(38688);function k(){let e=Reflect.get(window,l);if("object"!=typeof e||null===e){let t=(0,m.D)(document);t.textContent=c,document.head.appendChild(t),t.remove(),e=Reflect.get(window,l)}return e}function y(e){k().arrive(e,!0)}e.s(["n",0,e=>`<script type="application/json" id="${f}">${JSON.stringify(e).replace(/</g,"\\u003c")}</script><script>(function(e,a){if(e&&a)a.arrive(JSON.parse(e.textContent),true)})(document.getElementById("${f}"),self.${l})</script>`,"R",0,function(e,t){return k().frame(e,t)},"W",0,(e,t)=>({world:e,title:t,play:(0,p.B)(e,"play"),make:null,door:null,hop:null,makes:null}),"_",0,(e,t,r,n,o,a)=>{let i=(0,p.B)(e,"make"),l=null;return a?l=i:null!==n||o||(l=(0,p.B)(e,"play")),{world:e,title:r,play:l,make:i,door:`/api/phoenix/makes?app=${encodeURIComponent(t)}`,hop:a?null:n,makes:null}},"t",0,function(e,t){k().point(e,t)},"P",0,y],435447);var v=e.i(271645);let g=`html[${s}] [data-phoenix-play]{display:none}`;function b(e){let t=Reflect.get(window,d);return"object"==typeof t&&null!==t&&Reflect.get(t,"world")===e?t:null}let S=()=>"unread",A=e=>b(e)?.makes??"unread",E=(0,v.createContext)(null);e.s(["X",0,g,"q",0,E,"g",0,A,"w",0,function(e){let t=e.world,r=(0,v.useCallback)(r=>{null===b(t)&&y({...e});let n=b(t);return null===n?()=>void 0:(n.hear.push(r),()=>{let e=n.hear.indexOf(r);e>=0&&n.hear.splice(e,1)})},[t,e]),n=(0,v.useCallback)(()=>A(t),[t]);return(0,v.useSyncExternalStore)(r,n,S)},"s",0,()=>(0,v.useContext)(E)],88786)}]);