# 🌙 Moon Phases Simulator

An interactive **3D web simulator of the Moon's phases** built for education.

This project helps learners understand **why the Moon changes appearance during the lunar month** and how **solar and lunar eclipses** emerge from rare alignments by visualizing the Sun, Earth, Moon, orbital position, phase angle, and illumination state in real time.

It is designed to be visually clear, mobile-friendly, and accessible to a multilingual audience.

## Highlights

- **Interactive 3D scene** powered by Three.js
- **Educational phase model** based on the synodic month (`29.53059` days)
- **Four camera views**:
  - **Default** — balanced overview of the system
  - **Observer** — Moon-focused view from Earth's perspective
  - **Orbital** — top-down orbital view for geometry understanding
  - **Eclipse** — a dedicated teaching view for solar and lunar eclipses
- **Multilingual UI** with built-in support for:
  - English
  - Spanish
  - Italian
- **Dedicated eclipse learning mode** with:
  - solar / lunar eclipse toggle
  - a tilted lunar orbit to show why eclipses are rare
  - eclipse lineup readouts and alignment-window feedback
  - sunlight-driven shadow casting from Moon to Earth and Earth to Moon when the eclipse window is active
  - guide lines that make the Sun-Earth-Moon geometry easier to follow
  - an **"As seen from Earth" observation inset** showing the classic eclipse appearance: solar corona during a solar eclipse and the blood-red Moon during a lunar eclipse
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

This simulator is designed to explain both the **geometry of lunar phases** and the rarer **geometry of eclipses**, while keeping those two topics clearly separated.

### Important modeling choice

In the normal phase views, **Earth's shadow is not projected onto the Moon**.

That is deliberate: normal moon phases are **not** caused by Earth's shadow. Shadow projection is only enabled inside the dedicated **Eclipse** mode, where the simulator can safely teach the distinct geometry of:

- **solar eclipses** — the Moon casting a sunlight shadow toward Earth
- **lunar eclipses** — Earth casting a sunlight shadow onto the Moon

## Why this simulator is useful

Many Moon phase visualizations show the orbit but fail to make the Moon readable from the observer's point of view, or they blur together phases and eclipses. This project specifically improves that experience by:

- making the **Moon the visual hero** in Observer view
- using a proper **spherical Moon texture** instead of a baked full-moon photo
- explaining each phase with concise educational text
- exposing the relationship between **day, angle, and illumination**
- separating the **phase model** from the **eclipse teaching mode** so learners do not confuse them

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

This app is configured to deploy under the `/moon-simulator/` base path.

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
- **Eclipse** — dedicated solar/lunar eclipse learning mode with specialized framing

### Eclipse Mode

The eclipse mode is a focused teaching view rather than a general free-roam camera.

It lets you:

- switch between **solar** and **lunar** eclipse scenarios
- start from a clear eclipse-aligned setup instead of a random day in the cycle
- see the **alignment window** percentage used by the educational model
- see when the **70%+ shadow zone** is active
- follow the tilted orbit and guide lines as the bodies move through the eclipse setup
- observe sunlight-driven shadow casting during the active eclipse window

#### Earth Observer Inset

While in Eclipse mode, a circular inset panel labeled **"As seen from Earth"** appears in the corner. It renders what an observer on Earth would actually see during the eclipse:

- **Solar eclipse**: the Moon's dark silhouette slides across the Sun as the alignment window increases. Near totality (~75%+ alignment), a wispy solar corona with animated radial streamers becomes visible around the Moon's edge, the sky darkens, and stars fade in.
- **Lunar eclipse**: the Moon gradually darkens and shifts to a deep copper-red blood moon as the alignment window rises, with a subtle reddish glow at peak alignment.

The inset uses its own lightweight Three.js scene with an orthographic camera and correctly proportioned discs, independent of the main 3D view's simulation scale.

### Information Panel

The info panel updates live with:

- current phase
- illumination
- lunar day
- phase angle
- educational explanation
- misconception note when relevant

In Eclipse mode, the panel switches to eclipse-specific teaching content:

- solar / lunar eclipse selector
- alignment window percentage
- shadow zone threshold hint
- lineup explanation
- orbit tilt reminder
- mode-specific educational explanation

### Settings

The settings panel lets you adjust:

- current day
- playback speed
- orbit line visibility
- realistic scale mode
- camera auto-rotation
- lighting values

When Eclipse mode is entered, the app temporarily switches into a clearer teaching setup: slower playback, orbit line on, and readable non-realistic scale.

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

Translations cover static UI text, ARIA labels, phase names, eclipse learning content, descriptions, and settings labels.

## Project Structure

```text
src/
  i18n/          # locale dictionaries and translation wiring
  scene/         # Earth, Moon, Sun, stars, eclipse guides, corona shader
  simulation/    # phase math, eclipse state, and orbital system
  styles/        # app styling and responsive layout
  ui/            # controls, timeline, info panel, eclipse observer, language/view switchers
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

- stronger accessibility refinements
- richer educational overlays
- diamond ring effect and Baily's beads for the solar eclipse observation inset
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
