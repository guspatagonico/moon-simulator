# 🌙 Moon Phases Simulator

An interactive **3D web simulator of the Moon's phases** built for education.

This project helps learners understand **why the Moon changes appearance during the lunar month** by visualizing the Sun, Earth, Moon, orbital position, phase angle, and illuminated fraction in real time.

It is designed to be visually clear, mobile-friendly, and accessible to a multilingual audience.

## Highlights

- **Interactive 3D scene** powered by Three.js
- **Educational phase model** based on the synodic month (`29.53059` days)
- **Three camera views**:
  - **Default** — balanced overview of the system
  - **Observer** — Moon-focused view from Earth's perspective
  - **Orbital** — top-down orbital view for geometry understanding
- **Multilingual UI** with built-in support for:
  - English
  - Spanish
  - Italian
- **Touch-friendly mobile layout** with:
  - compact mobile POV selector
  - collapsible info drawer
  - larger timeline controls and step buttons
- **Educational overlays** showing:
  - phase name
  - illumination percentage
  - lunar day
  - phase angle
  - explanations and common misconceptions
- **Adjustable simulation controls** through a compact settings panel

## Educational Focus

This simulator is intentionally designed to explain the **geometry of lunar phases**, not eclipses.

### Important modeling choice

For this version, **Earth's shadow is not projected onto the Moon**.

That is deliberate: normal moon phases are **not** caused by Earth's shadow. Earth's shadow only matters during **lunar eclipses**, which are separate events and may be explored in a future optional mode.

## Why this simulator is useful

Many Moon phase visualizations show the orbit but fail to make the Moon readable from the observer's point of view. This project specifically improves that experience by:

- making the **Moon the visual hero** in Observer view
- using a proper **spherical Moon texture** instead of a baked full-moon photo
- explaining each phase with concise educational text
- exposing the relationship between **day, angle, and illumination**

## Tech Stack

- **Vite**
- **TypeScript**
- **Three.js**
- **lil-gui**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Controls

### Timeline

- Play / pause the simulation
- Change simulation speed
- Scrub through the lunar month
- Step backward or forward through the cycle

### View Modes

- **Default** — standard orbit view
- **Observer** — Earth-based Moon view with Moon-centered framing
- **Orbital** — top-down geometry view

### Information Panel

The info panel updates live with:

- current phase
- illumination
- lunar day
- phase angle
- educational explanation
- misconception note when relevant

### Settings

The settings panel lets you adjust:

- current day
- playback speed
- orbit line visibility
- realistic scale mode
- camera auto-rotation
- lighting values

## Mobile UX

The app has been specifically polished for smaller screens.

Notable mobile adaptations include:

- a compact top control cluster
- a native select for point-of-view switching
- a collapsible info panel drawer
- larger timeline touch targets
- a collapsed settings panel by default

## Languages

The interface currently supports:

- **English** (`en`)
- **Spanish** (`es`)
- **Italian** (`it`)

Translations cover static UI text, ARIA labels, phase names, descriptions, and settings labels.

## Project Structure

```text
src/
  i18n/          # locale dictionaries and translation wiring
  scene/         # Earth, Moon, Sun, stars
  simulation/    # phase math and orbital system
  styles/        # app styling and responsive layout
  ui/            # controls, timeline, info panel, language/view switchers
  main.ts        # app bootstrap, renderer, camera behavior
```

## Verification

This project is set up to validate cleanly with:

```bash
tsc --noEmit
npm run build
```

## Roadmap

Potential next steps:

- optional eclipse mode
- stronger accessibility refinements
- richer educational overlays
- screenshots / animated previews in the README
- deployment as a public demo

## Contributing

Issues, ideas, and educational improvements are welcome.

If you contribute, please prefer:

- small focused pull requests
- clear educational intent
- conventional commit messages

## License

This project is licensed under the **MIT License**.

See [LICENSE](./LICENSE) for details.
