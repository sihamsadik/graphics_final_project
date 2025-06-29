import * as THREE from 'three';
export function setupLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6));
}