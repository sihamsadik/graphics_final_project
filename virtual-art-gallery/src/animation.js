
export function startLoop(renderer, scene, camera, controls, clock, directionFn) {
  function loop() {
    requestAnimationFrame(loop);
    const delta = clock.getDelta();
    const speed = 5;
    const direction = directionFn().multiplyScalar(speed * delta);
    const nextPos = controls.getObject().position.clone().add(direction);
    const playerBox = new THREE.Box3().setFromCenterAndSize(nextPos, new THREE.Vector3(1, 2, 1));

    const collision = window.collidables?.some(obj => {
      obj.userData.collider = new THREE.Box3().setFromObject(obj);
      return playerBox.intersectsBox(obj.userData.collider);
    });

    if (!collision) controls.getObject().position.copy(nextPos);
    renderer.render(scene, camera);
  }
  loop();
}
