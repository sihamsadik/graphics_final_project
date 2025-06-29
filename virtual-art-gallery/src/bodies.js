
import * as THREE from 'three';
import { collidables, addCollider } from './utils.js';

export function buildMaze(scene, texLoader, artworks) {
  const layout = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,1],
    [1,0,1,0,1,0,1,1],
    [1,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,0,1],
    [1,0,0,0,0,1,0,1],
    [1,1,1,1,0,1,0,1],
    [1,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1]
  ];

  const CELL_SIZE = 5;
  const WALL_HEIGHT = 3;
  const floorTex = texLoader.load('/textures/floor.jpg');
  const wallTex = texLoader.load('/textures/realistic_wall.jpg');
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(2, 2);

  const floorMat = new THREE.MeshStandardMaterial({ map: floorTex });
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex });

  let artIndex = 0;
  for (let z = 0; z < layout.length; z++) {
    for (let x = 0; x < layout[z].length; x++) {
      const cell = layout[z][x];
      const worldX = x * CELL_SIZE;
      const worldZ = z * CELL_SIZE;

      const floor = new THREE.Mesh(new THREE.PlaneGeometry(CELL_SIZE, CELL_SIZE), floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(worldX, 0, worldZ);
      scene.add(floor);
      addCollider(floor);

      if (cell === 1) {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE), wallMat);
        wall.position.set(worldX, WALL_HEIGHT / 2, worldZ);
        scene.add(wall);
        addCollider(wall);
      } else {
        const { texture, title, artist, year } = artworks[artIndex % artworks.length];
        const addPainting = (px, pz, rotY) => {
          const art = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 1.5),
            new THREE.MeshStandardMaterial({ map: texture })
          );
          art.position.set(px, 1.5, pz);
          art.rotation.y = rotY;
          art.userData = { title, artist, year };
          scene.add(art);
        };
        addPainting(worldX - 2, worldZ - CELL_SIZE / 2 + 0.1, 0);
        addPainting(worldX + 2, worldZ + CELL_SIZE / 2 - 0.1, Math.PI);
        artIndex++;
      }
    }
  }
}
