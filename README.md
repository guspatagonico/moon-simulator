# 🌙 Moon Phases Simulator

An interactive **3D simulator of the Moon's phases and eclipses**, built for education.

Explore the Sun–Earth–Moon system in real time: watch the Moon orbit, understand why its appearance changes throughout the lunar month, and discover how solar and lunar eclipses emerge from rare alignments — all from four different camera perspectives.

Designed to be visually clear, mobile-friendly, and accessible in English, Spanish, and Italian.

## What You Can Do

### 🌓 Explore Lunar Phases

The simulator models a complete **synodic month** (29.53 days). As the Moon orbits Earth, an information panel shows you:

- The current **phase name** (🌑 New Moon → 🌒 Waxing Crescent → 🌓 First Quarter → 🌔 Waxing Gibbous → 🌕 Full Moon → 🌖 Waning Gibbous → 🌗 Last Quarter → 🌘 Waning Crescent)
- **Illumination** percentage
- **Lunar day** and **phase angle**
- A concise **explanation** of why the Moon looks the way it does at each phase
- **Common misconception** notes — such as the widespread but incorrect belief that phases are caused by Earth's shadow

### 🔭 Four Camera Views

Switch perspectives to understand the geometry from different angles:

| View | What it shows |
|------|---------------|
| **Default** | Balanced overview of the entire Sun–Earth–Moon system |
| **Observer** | Moon-focused view from Earth's perspective — the Moon is the visual hero |
| **Orbital** | Top-down view for understanding the orbital geometry |
| **Eclipse** | Dedicated teaching mode for solar and lunar eclipses |

### 🌑 Eclipse Learning Mode

A focused teaching view that separates eclipse geometry from everyday lunar phases.

**Why this matters:** Normal moon phases are _not_ caused by Earth's shadow. The simulator deliberately disables shadow projection outside of Eclipse mode so learners don't confuse the two phenomena.

In Eclipse mode you can:

- Toggle between **solar** and **lunar** eclipse scenarios
- See a **tilted lunar orbit** (5.1°) that explains why eclipses are rare
- Track the **alignment window** percentage as the Sun, Earth, and Moon line up
- Watch **shadow casting** activate when the alignment reaches the 70%+ threshold
- Follow **guide lines** that make the Sun–Earth–Moon geometry easier to read

#### "As Seen from Earth" Inset

A circular observation panel appears in the corner, showing what an observer on Earth would actually see:

- **Solar eclipse** — the Moon's dark silhouette slides across the Sun. Near totality, an animated **solar corona** with wispy radial streamers becomes visible, the sky darkens, and stars fade in.
- **Lunar eclipse** — the Moon gradually darkens and shifts to a deep **copper-red blood moon**, with a subtle reddish glow at peak alignment.

### ⏱ Timeline Controls

- **Play / Pause** the simulation (or press **Space**)
- Choose from **5 speed presets**: 0.25×, 0.5×, 1×, 2×, 4×
- **Scrub** through the lunar month with a slider marked at key phase positions
- **Step** backward or forward by half a day (or press **← →** arrow keys)

### ⚙️ Settings

A compact settings panel lets you fine-tune:

- Current day and playback speed
- Orbit line visibility
- Realistic vs. exaggerated scale
- Camera auto-rotation and rotation speed
- Sun and ambient lighting intensity

When entering Eclipse mode, the simulator automatically adjusts to a clearer teaching setup: slower playback, orbit line visible, and readable non-realistic scale.

### 🌍 Three Languages

All interface text, phase names, eclipse content, educational descriptions, and accessibility labels are fully translated in:

- **English**
- **Spanish**
- **Italian**

### 📱 Mobile-Friendly

The app adapts to smaller screens with:

- A compact control cluster at the top
- A native dropdown for view switching
- A collapsible info panel drawer
- Touch-friendly timeline controls
- Responsive eclipse inset sizing

### 💾 Remembers Your Preferences

Your last selected **language** and **view mode** are saved automatically and restored on your next visit.

## Getting Started

```bash
npm install       # Install dependencies
npm run dev       # Start the dev server
npm run build     # Production build
npm run preview   # Preview the production build
```

The app is configured to deploy under the `/moon-simulator/` base path.

Built with [Three.js](https://threejs.org/), TypeScript, and [Vite](https://vitejs.dev/).

## Roadmap

- Stronger accessibility refinements
- Richer educational overlays
- Diamond ring effect and Baily's beads for the solar eclipse observation inset
- Screenshots and animated previews in this README
- Deployment as a public demo

## Contributing

Issues, ideas, and educational improvements are welcome.

Please prefer small, focused pull requests with clear educational intent and conventional commit messages.

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.
