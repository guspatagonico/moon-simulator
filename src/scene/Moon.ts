import * as THREE from 'three';

const MOON_TEXTURE_URL =
  'https://threejs.org/examples/textures/planets/moon_1024.jpg';

export async function createMoon(scene: THREE.Scene): Promise<THREE.Mesh> {
  const geometry = new THREE.SphereGeometry(0.55, 64, 64);
  const textureLoader = new THREE.TextureLoader();

  let material: THREE.MeshStandardMaterial;

  try {
    const texture = await textureLoader.loadAsync(MOON_TEXTURE_URL);
    texture.colorSpace = THREE.SRGBColorSpace;
    material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.92,
      metalness: 0,
    });
  } catch {
    material = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.95,
      metalness: 0,
    });
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  scene.add(mesh);
  return mesh;
}
