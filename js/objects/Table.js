import * as THREE from "three";

export function createTable(scene) {

  const table = new THREE.Group();

  // Top surface
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.2, 4),
    new THREE.MeshStandardMaterial({
      color: 0x8b6f47, // wood
      roughness: 0.8
    })
  );
  top.position.y = 0;

  // Legs
  const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });

  const positions = [
    [-2.5, -1, -1.5],
    [2.5, -1, -1.5],
    [-2.5, -1, 1.5],
    [2.5, -1, 1.5]
  ];

  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(...pos);
    table.add(leg);
  });

  table.add(top);

  table.position.y = 0; // lift table
  table.position.x = -2.5; // center table
  table.name = "labTable";

  scene.add(table);
  
  return table;
}