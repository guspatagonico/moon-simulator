import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createEarth, updateEarth } from './scene/Earth';
import { createMoon } from './scene/Moon';
import { createStarfield } from './scene/Stars';
import { createSun } from './scene/Sun';
import { SYNODIC_PERIOD } from './simulation/MoonPhase';
import { createOrbitalSystem } from './simulation/OrbitalSystem';
import { SimulationStore, createDefaultState } from './simulation/SimulationState';
import { createInfoPanel } from './ui/InfoPanel';
import { createTimeline } from './ui/Timeline';
import { createControls } from './ui/Controls';
import { createViewSwitcher } from './ui/ViewSwitcher';
import { createLanguageSwitcher } from './ui/LanguageSwitcher';
import { i18n, t } from './i18n/i18n';

export const simulationStore = new SimulationStore(createDefaultState());

const canvas = document.getElementById('scene-canvas');

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('Canvas with id "scene-canvas" was not found');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02050c);

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 8, 25);
const ORBITAL_CAMERA_POSITION = new THREE.Vector3(0, 40, 0.01);
const ORIGIN = new THREE.Vector3(0, 0, 0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.copy(DEFAULT_CAMERA_POSITION);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 100;
controls.enablePan = false;

const stars = createStarfield();
scene.add(stars);

const clock = new THREE.Clock();

const setCameraFov = (nextFov: number): void => {
  if (Math.abs(camera.fov - nextFov) > 0.001) {
    camera.fov = nextFov;
    camera.updateProjectionMatrix();
  }
};

const getObserverFov = (distanceToMoon: number): number => {
  const angularDiameter = 2 * Math.atan(0.55 / Math.max(distanceToMoon, 0.001));
  return THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(angularDiameter / 0.28), 5, 28);
};

const hideLoadingScreen = (): void => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen instanceof HTMLElement) {
    loadingScreen.classList.add('hidden');
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.style.display = 'none';
    }, { once: true });
  }
};

const syncStaticText = (): void => {
  document.documentElement.lang = i18n.getLocale();
  document.title = t('app.pageTitle');

  const titleHeading = document.querySelector('.app-title h1');
  if (titleHeading instanceof HTMLElement) {
    titleHeading.textContent = t('app.title');
  }

  const titleSubtitle = document.querySelector('.app-title p');
  if (titleSubtitle instanceof HTMLElement) {
    titleSubtitle.textContent = t('app.subtitle');
  }

  const loadingText = document.querySelector('#loading-screen p');
  if (loadingText instanceof HTMLElement) {
    loadingText.textContent = t('app.loading');
  }

  canvas.setAttribute('aria-label', t('aria.canvas'));

  const infoPanel = document.getElementById('info-panel');
  if (infoPanel instanceof HTMLElement) {
    infoPanel.setAttribute('aria-label', t('aria.infoPanel'));
  }

  const timelineBar = document.getElementById('timeline-bar');
  if (timelineBar instanceof HTMLElement) {
    timelineBar.setAttribute('aria-label', t('aria.timeline'));
  }

  const viewSwitcher = document.getElementById('view-switcher');
  if (viewSwitcher instanceof HTMLElement) {
    viewSwitcher.setAttribute('aria-label', t('aria.viewSwitcher'));
  }
};

const init = async (): Promise<void> => {
  const [earth, moon] = await Promise.all([createEarth(scene), createMoon(scene)]);

  const sun = createSun(scene);
  const orbitalSystem = createOrbitalSystem(moon);
  scene.add(orbitalSystem.pivot);
  scene.add(orbitalSystem.orbitLine);

  const applyState = (): void => {
    const state = simulationStore.get();
    orbitalSystem.orbitLine.visible = state.showOrbitLine;
    orbitalSystem.setRealisticScale(state.realisticScale);
  };

  simulationStore.subscribe(() => {
    applyState();
  });

  applyState();
  sun.light.position.set(100, 0, 0);
  hideLoadingScreen();
  createInfoPanel();
  createTimeline();
  const controlsState = createControls();
  createViewSwitcher();
  createLanguageSwitcher();
  syncStaticText();

  i18n.onLanguageChange(() => {
    syncStaticText();
  });

  const moonWorldPos = new THREE.Vector3();
  const observerDirection = new THREE.Vector3();
  const observerPosition = new THREE.Vector3();
  let previousViewMode = simulationStore.get().viewMode;
  let returningToDefault = false;

  const animate = (): void => {
    const delta = clock.getDelta();
    const state = simulationStore.get();

    if (state.isPlaying) {
      const nextDay = (state.currentDay + delta * state.playSpeed) % SYNODIC_PERIOD;
      simulationStore.update({ currentDay: nextDay });
    }

    const currentState = simulationStore.get();
    if (currentState.viewMode !== previousViewMode && currentState.viewMode === 'default') {
      returningToDefault = true;
    }

    orbitalSystem.setDay(currentState.currentDay);
    updateEarth(earth, delta);
    controls.autoRotate = controlsState.params.autoRotate;
    controls.autoRotateSpeed = controlsState.params.autoRotateSpeed;
    sun.light.intensity = controlsState.params.sunIntensity;
    sun.ambient.intensity = controlsState.params.ambientIntensity;

    moon.getWorldPosition(moonWorldPos);

    if (currentState.viewMode === 'observer') {
      controls.enabled = false;
      observerDirection.copy(moonWorldPos).normalize();
      observerPosition.copy(observerDirection).multiplyScalar(2.45);
      observerPosition.y += 0.45;
      camera.position.copy(observerPosition);
      setCameraFov(getObserverFov(camera.position.distanceTo(moonWorldPos)));
      controls.target.copy(moonWorldPos);
      camera.lookAt(moonWorldPos);
    } else if (currentState.viewMode === 'orbital') {
      controls.enabled = false;
      setCameraFov(50);
      camera.position.copy(ORBITAL_CAMERA_POSITION);
      controls.target.copy(ORIGIN);
      camera.lookAt(ORIGIN);
    } else {
      setCameraFov(60);
      controls.enabled = true;
      if (returningToDefault) {
        camera.position.lerp(DEFAULT_CAMERA_POSITION, 0.12);
        controls.target.lerp(ORIGIN, 0.12);
        if (camera.position.distanceTo(DEFAULT_CAMERA_POSITION) < 0.05 && controls.target.distanceTo(ORIGIN) < 0.05) {
          returningToDefault = false;
        }
      }
    }

    if (controls.enabled) {
      controls.update();
    }
    renderer.render(scene, camera);
    previousViewMode = currentState.viewMode;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

const onResize = (): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener('resize', onResize);

void init();
