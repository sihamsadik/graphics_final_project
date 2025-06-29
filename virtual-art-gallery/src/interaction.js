// systems/interaction.js
import * as THREE from "three";

export function setupHoverPanel(scene, camera) {
  const raycaster = new THREE.Raycaster();

  window.addEventListener("mousemove", () => {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const panel = document.getElementById("infoPanel");
    const content = document.getElementById("infoContent");
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.userData?.title) {
        content.innerHTML = `
          <h3>${obj.userData.title}</h3>
          <p><strong>Artist:</strong> ${obj.userData.artist}</p>
          <p><strong>Year:</strong> ${obj.userData.year}</p>
        `;
        panel.style.display = "block";
      }
    }
  });

  document.getElementById("infoPanelClose").addEventListener("click", () => {
    document.getElementById("infoPanel").style.display = "none";
  });
}
