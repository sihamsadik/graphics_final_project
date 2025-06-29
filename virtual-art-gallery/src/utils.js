// utils.js
export const collidables = [];

export function addCollider(mesh) {
  mesh.userData.collider = new THREE.Box3().setFromObject(mesh);
  collidables.push(mesh);
}
