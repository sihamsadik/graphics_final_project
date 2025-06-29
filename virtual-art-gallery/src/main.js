// main.js
import * as THREE from 'three';
import { buildMaze } from './bodies.js';
import { setupLights } from './systems/lights.js';
import { setupControls } from './systems/controls.js';
import { setupHoverPanel } from './systems/interaction.js';
import { startLoop } from './animation.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();
const texLoader = new THREE.TextureLoader();
const controls = setupControls(camera, document.body);
scene.add(controls.getObject());

buildMaze(scene, texLoader);
setupLights(scene);
setupHoverPanel(scene, camera);

// Movement
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
document.addEventListener('keydown', (e) => {
  if (e.code === 'KeyW' || e.code === 'ArrowUp') moveForward = true;
  if (e.code === 'KeyS' || e.code === 'ArrowDown') moveBackward = true;
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') moveLeft = true;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') moveRight = true;
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyW' || e.code === 'ArrowUp') moveForward = false;
  if (e.code === 'KeyS' || e.code === 'ArrowDown') moveBackward = false;
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') moveLeft = false;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') moveRight = false;
});

camera.position.set(7, 1.6, 7);
controls.getObject().position.copy(camera.position);

startLoop(renderer, scene, camera, controls, clock, () => {
  const dir = new THREE.Vector3();
  if (moveForward) dir.z -= 1;
  if (moveBackward) dir.z += 1;
  if (moveLeft) dir.x -= 1;
  if (moveRight) dir.x += 1;
  return dir.normalize();
});
