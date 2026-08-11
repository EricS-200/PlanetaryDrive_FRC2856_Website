# Deterministic CAD explosion renderer

This tool loads `robot-assets/source/robot.glb`, keeps an orthographic camera fixed,
and translates the model's original CAD nodes into a spatially grouped exploded
view. It does not use image or video generation. The default master is 3840×2160
at 60 FPS with warm-key/cool-rim studio lighting and a reflection environment,
on a pure black background; the twelve CAD bodies forming the three paired shooter
wheels are restored to orange.

Run the exact-frame master renderer from the repository root with the bundled
Playwright package available on `NODE_PATH`:

```powershell
$env:NODE_PATH = 'C:\Users\eeeri\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
node scripts\render_robot_explosion_offline.cjs
```

Useful checks:

```powershell
node scripts\render_robot_explosion.cjs --camera-sweep
node scripts\render_robot_explosion.cjs --camera=2 --width=1280 --height=720 --preview-only
```

Outputs are written under `output/robot-explosion/`. The default master is
`robot-explosion-low-iso-4k60-cinematic.mp4`: H.264, 3840×2160, 60 FPS, 360
frames, and six seconds long. The offline renderer creates one deterministic PNG
frame at a time and streams it directly to FFmpeg, so the master does not depend
on browser real-time capture performance.

## Full cinematic sequence

The full-sequence renderer produces a 12-second, 720-frame 4K60 master containing
a fade up from darkness, explosion, eased 360-degree rotation around the robot's
vertical axis, reassembly, and final hold. The camera and lighting rig remain
fixed, and the robot finishes at exactly its original rotation.

```powershell
node scripts\render_robot_full_sequence_offline.cjs
```

For fast timeline and framing checks before a master render:

```powershell
node scripts\render_robot_full_sequence_offline.cjs --preview-only --width=1280 --height=720
```

The output is `robot-full-sequence-4k60-cinematic.mp4`.
