import * as THREE from 'three';
import { dayToPhaseAngle, getPhaseInfo, type PhaseInfo } from './MoonPhase';

const READABLE_ORBIT_RADIUS = 10;
const REALISTIC_ORBIT_RADIUS = 60;

const buildOrbitGeometry = (radius: number): THREE.BufferGeometry => {
  const points: THREE.Vector3[] = [];
  const segments = 128;

  for (let i = 0; i <= segments; i += 1) {
    const t = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
  }

  return new THREE.BufferGeometry().setFromPoints(points);
};

export interface OrbitalSystem {
  pivot: THREE.Group;
  orbitLine: THREE.Line;
  setDay: (day: number) => PhaseInfo;
  setRealisticScale: (realistic: boolean) => void;
}

export function createOrbitalSystem(moon: THREE.Mesh): OrbitalSystem {
  const pivot = new THREE.Group();
  pivot.position.set(0, 0, 0);

  const orbitMaterial = new THREE.LineBasicMaterial({
    color: 0x334466,
    transparent: true,
    opacity: 0.3,
  });

  let currentRadius = READABLE_ORBIT_RADIUS;
  const orbitLine = new THREE.Line(buildOrbitGeometry(currentRadius), orbitMaterial);
  moon.position.set(currentRadius, 0, 0);
  pivot.add(moon);

  const setDay = (day: number): PhaseInfo => {
    const phaseAngle = dayToPhaseAngle(day);
    pivot.rotation.y = -THREE.MathUtils.degToRad(phaseAngle);
    return getPhaseInfo(day);
  };

  const setRealisticScale = (realistic: boolean): void => {
    const nextRadius = realistic ? REALISTIC_ORBIT_RADIUS : READABLE_ORBIT_RADIUS;
    if (nextRadius === currentRadius) {
      return;
    }

    currentRadius = nextRadius;
    moon.position.set(currentRadius, 0, 0);
    const previousGeometry = orbitLine.geometry;
    orbitLine.geometry = buildOrbitGeometry(currentRadius);
    previousGeometry.dispose();
  };

  return { pivot, orbitLine, setDay, setRealisticScale };
}
