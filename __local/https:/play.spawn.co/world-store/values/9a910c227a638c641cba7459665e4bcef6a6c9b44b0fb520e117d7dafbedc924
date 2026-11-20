// A player paid to play their own song: the whole room's next roll is that song, from the top, in 1.5 s.
// The song was measured in the buyer's browser (ui.js) and waits on their body (player.js).
export function onPurchase(ctx, buyer) {
  const song = buyer.state?.ownSong
  if (!song?.music) return
  ctx.world.state.cine = { start: ctx.now() + 1500, by: buyer.id, seed: Math.floor(ctx.random() * 9973) + 1, track: song, who: buyer.displayName ?? 'someone' }
  ctx.emit('screenFlash', { color: '#ff3fb4', duration: 0.6, intensity: 0.35 }, { audience: 'all' })
  ctx.emit('playSound', { clip: 'cdn/moodboard-scifi-neon/sfx-rising-shimmer-synth-swell-into-bass-drop.mp3', volume: 0.6 }, { audience: 'all' })
}
