# Signal Stage

**What it is.** A motion-graphics cinematic you stand inside: one 3 min 18 s psychedelic trip in the manner of TAS Visuals, flown by a shared camera, cut to the creator's track. Not a music video, not a game with a win: you press P (or ROLL) and everyone in the room takes the same trip on the same beat. Between rolls the field is walkable and keeps breathing silently.

**The track.** `/cdn/music-fromage-retro-synthwave-beat-0c2764y0.mp3`, measured: 160 bpm exactly, first beat 0.35 s, bar 1.5 s, phrase (8 bars) 12 s, 198 s long. Sub-bass breakdowns at 48.35, 84.35, 180.35; a fill that drops out at 93.35; fullest from 132.35, brightest from 156.35; silence from 192. `scripts/lib/data/score.yml`.

**The trip, by section** (every cut on a phrase line):
seed (void, the Eye's lid opens) → pulse (iris rings fire on the kick) → bloom (the mandala field grows outward, stalks rise, serpents grow) → deep (sink through the pupil) → flight (the tunnel) → hex (line-art chamber, the hands reach) → reset (overhead, line-art, colour drains back) → ascent (kaleidoscope folds in, the sun-eye rises) → peak (everything turns) → return (back out, lid closes, black).

**The pieces.** field-*, eye-*, tunnel-*, chamber-*, serpents-* (scripted geometry + shader materials), `scripts/sky.js`, `scripts/look-trip.js`. All motion is shader math off one clock, `scripts/lib/trip.js`; the director (`scripts/stage.js`) only starts the track and hands the shaders the start time. Camera keys: `scripts/lib/data/shots.yml`.

**What makes it TAS** (from his interviews, three of his video stills, the creator's three pictures):
- "dense scenes formed by patterns of fantastic order that seem intelligent and alive": nothing is a plain colour; stripes carry dots, dots carry pupils, edges carry beads.
- ultramarine and violet as the body, hot beads and rims on top, black between.
- concentric eyes and portals as the centre of every composition; neighbours counter-rotate.
- diamond-lattice serpents, triangle teeth, bead rows, moire contour lines.
- peaks composed in left-right mirror symmetry.
- the music is the conductor: kick = ripple from the centre, bar = step, phrase = scene.

**Numbers that are my pick:** section names and boundaries (on the measured phrases), camera path, gain 0.8 (was 0.7).

**Open.** Whether the creator wants words/titles back on screen (the old kinetic words went with the old stage).

- 2026-11-11: cleared the starter for a fresh start; set up as a motion-graphics cinematic stage (creator: "motion graphics cinematics", not music videos).
- 2026-11-11: rebuilt as the acid-mandala trip on the creator's track; the old 24 s neon ring stage and its 120 bpm placeholder retired (creator's lock-in plan).
