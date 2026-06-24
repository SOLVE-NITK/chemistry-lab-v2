import * as THREE from "three";
import { createBuretteTexture } from "../textures/buretteTexture.js";
import { APPARATUS } from "../constants/textureConstants.js";
export function createFlask(scene) {
  const texture = createBuretteTexture({ maxVolume: APPARATUS.flask.maxVolume, height: APPARATUS.flask.height });
  const points = [];
  const materialProperties = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      roughness: 0.05,
      thickness: 0.01,
      transparent: true,
      opacity: 0.95,
      color: 0xffffff,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide
    });

  // 👉 Define profile (side outline of flask)
  points.push(new THREE.Vector2(0.0, 0.0));  // bottom center
  points.push(new THREE.Vector2(0.5, 0.0));  // base width
  points.push(new THREE.Vector2(0.5, 0.1));  // neck start
  points.push(new THREE.Vector2(0.2, 0.8));  // neck
  points.push(new THREE.Vector2(0.2, 1));  // top
  points.push(new THREE.Vector2(0.2, 1));  // top

  const geometry = new THREE.LatheGeometry(points, 128);

  geometry.computeVertexNormals();

  const material = materialProperties;

  const flask = new THREE.Mesh(geometry, material);

  // flask.position.set(0, 1, 0);
  flask.name = "flask";


  const rim = new THREE.Mesh(
  new THREE.TorusGeometry(0.2, 0.02, 16, 100),
  materialProperties
);

rim.rotation.x = Math.PI / 2;
rim.position.y = 1;

const labelMesh = new THREE.Mesh(
  geometry.clone(),
  new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  })
);

labelMesh.scale.set(1.01, 1.01, 1.01);
flask.add(labelMesh)
flask.add(rim);
flask.name = "flask";
  return flask;
}