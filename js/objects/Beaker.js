import * as THREE from "three";
import { createBuretteTexture } from "../textures/buretteTexture.js";

export function createBeaker(scene) {
  const texture = createBuretteTexture();
  const points = [];
  const materialProperties = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0.05,
    thickness: 0.01,
    transparent: true,
    opacity: 0.95,
    // color: 0xdff6ff,
    color: 0xffffff,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });

  // 👉 Define profile (side outline of flask)
  points.push(new THREE.Vector2(0.0, 0.0));  // bottom center
  points.push(new THREE.Vector2(0.4, 0.0));  // base width
  points.push(new THREE.Vector2(0.4, 1));  // base width
  points.push(new THREE.Vector2(0.42, 1));  // base width

  const geometry = new THREE.LatheGeometry(points, 128);
  geometry.computeVertexNormals();

  const material = materialProperties;

  const beaker = new THREE.Mesh(geometry, material);
  beaker.name = "beaker";


   const rim = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.02, 16, 100),
    materialProperties
  );
  
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1;
  beaker.add(rim);

  const labelMesh = new THREE.Mesh(
    geometry.clone(),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    })
  );
  
  labelMesh.scale.set(1.01, 1.01, 1.01);
  beaker.add(labelMesh)
  
  beaker.name = "beaker";
  return beaker;
}