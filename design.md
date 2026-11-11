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

**How it moves** (read off 36 timed stills of 12 TAS films and his Resolume effects Pulse, Color Drift, Radial; not yet off playing footage, which the workshop could not reach):
- the structure holds, the light travels through it; resting elements are graphite, not lit.
- slow is the default: big forms 1 turn per 48-96 s; one fast thing per section, only in flight and peak.
- the kick is a ripple travelling out from the centre, not a flash; bar = a step; phrase = a palette swap.
- one hue family at a time, the whole world swapping together; rainbow only at the peak.
- colour drifts along strokes; strokes draw themselves on.
- black is half the frame; seed, deep, reset, return are near-monochrome.
- mirrored about x = 0; one shared breath per phrase.
- the camera holds on the axis and creeps; the tunnel is the only fast flight.

**Numbers that are my pick:** section names and boundaries (on the measured phrases), camera path, gain 0.8 (was 0.7).

**Open.** Whether the creator wants words/titles back on screen (the old kinetic words went with the old stage).

- 2026-11-11: cleared the starter for a fresh start; set up as a motion-graphics cinematic stage (creator: "motion graphics cinematics", not music videos).
- 2026-11-11: rebuilt as the acid-mandala trip on the creator's track; the old 24 s neon ring stage and its 120 bpm placeholder retired (creator's lock-in plan).

- 2026-11-11: creator: "not everything is fast, not everything is normal visuals". Old rule: everything counter-rotating and flashing on the beat. New rule: the How it moves list above; camera re-cut to holds and creeps.
- 2026-11-11: creator: "camera bending is important, different layers exposing and hiding others to compose, not just everything showing at once". New: score.yml `layers` (when each layer is cut in and out, by iris wipe) and `lens` (bulge, swirl, mirror fold per section); trip.js shown() and bendUv(). Windows and lens numbers are my pick.
- 2026-11-11: creator: "hyperbolic camera effects are common in tas visuals, and we must vary our strategies for meaningful mathematic compositions as much as possible". New: lens gains hyper (Poincare/Mobius) and droste (log-polar recursion); score.yml `maths` gives each section its own family (inversion, interference, phyllotaxis, log spiral, torus knot, D6 hex, {7,3} tiling, rose/Lissajous, p6m kaleidoscope). Which maths goes where is my pick.
- 2026-11-11: creator: "we must get it to be different every time too maximizing replay variety". New: each roll carries a seed (world.state.cine.seed), pushed to every trip material and the look as params.seed; trip.js c.rnd/c.pick/c.hue/c.dir; the lens and the camera path vary by it. What the seed varies is my pick.
