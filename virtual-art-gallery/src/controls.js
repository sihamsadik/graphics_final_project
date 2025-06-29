import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export function setupControls(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);
  domElement.addEventListener('click', () => controls.lock());
  return controls;
}