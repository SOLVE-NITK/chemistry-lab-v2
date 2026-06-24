import * as THREE from "three";

export function addEdges(mesh, color = 0xffffff) {
  const edges = new THREE.EdgesGeometry(mesh.geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4
    })
  );

  mesh.add(line);
}