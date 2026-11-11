// The HUD: a roll button when idle; letterbox, the shot's word and a progress line while rolling.
import { CINE, cineTime, shotAt } from './lib/cine.js'

const STYLE = `<style>
@keyframes cine-grow { from { width: 0 } to { width: 100% } }
@keyframes cine-word { 0% { opacity: 0; letter-spacing: 1.2em; filter: blur(8px) } 18% { opacity: 1; letter-spacing: .45em; filter: blur(0) } 80% { opacity: 1; letter-spacing: .38em } 100% { opacity: 0; letter-spacing: .3em } }
@keyframes cine-bar { from { height: 0 } to { height: 11vh } }
</style>`

export default function render(ctx, player) {
  const t = cineTime(ctx)
  const key = ctx.world.inputs?.actions?.cine?.label
  if (t == null) {
    return `${STYLE}<div style="position:absolute;left:24px;bottom:24px;display:flex;gap:12px;align-items:center;font-family:inherit">
      <button onclick="sendAction('cine')" style="pointer-events:auto;background:#0b0f1a;border:1px solid #39d0ff;color:#bff3ff;padding:10px 18px;font-size:18px;letter-spacing:.2em;box-shadow:0 0 18px #39d0ff55;cursor:pointer">▶ ROLL${key ? ` <span style="opacity:.6">[${key}]</span>` : ''}</button>
      <span style="color:#7f95a3;font-size:14px;letter-spacing:.15em">${CINE.duration}s · ${CINE.keys.length - 1} shots · ${CINE.bpm} bpm</span>
    </div>`
  }
  const shot = shotAt(t)
  const into = t - shot.t
  const word = shot.word
    ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
        <div style="color:#f4fbff;font-size:9vh;letter-spacing:.4em;text-shadow:0 0 24px #39d0ff,0 0 4px #fff;animation:cine-word 3s ease-out ${-into}s forwards">${shot.word}</div></div>`
    : ''
  return `${STYLE}
    <div style="position:absolute;left:0;right:0;top:0;background:#000;animation:cine-bar .6s ease-out ${-t}s forwards"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;background:#000;animation:cine-bar .6s ease-out ${-t}s forwards"></div>
    ${word}
    <div style="position:absolute;left:0;bottom:0;height:2px;background:#39d0ff;box-shadow:0 0 10px #39d0ff;animation:cine-grow ${CINE.duration}s linear ${-t}s forwards"></div>
    <button onclick="sendAction('cine')" style="pointer-events:auto;position:absolute;right:90px;bottom:3vh;background:none;border:1px solid #39d0ff66;color:#7fdcff;padding:4px 10px;font-size:13px;letter-spacing:.2em">■ CUT${key ? ` [${key}]` : ''}</button>`
}
