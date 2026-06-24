import * as THREE from "three";
import { createPipetteTexture } from "../textures/pipetteTexture.js";
export function createPipette(scene) {
  const pipette = new THREE.Group();
  const texture = createPipetteTexture();
 texture.offset.x = -0.2;
  texture.offset.y = 0.1;
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

  const bulb = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0x4a78ff,
    roughness: 0.5
  })
);

  bulb.scale.y = 1.2;
  bulb.position.y = 2.8;
  bulb.position.x = -2.8;

  pipette.add(bulb);

  const material = materialProperties;
  const tube = new THREE.Mesh(
  new THREE.CylinderGeometry(0.06, 0.06, 2, 64), material
);

tube.position.y = 1.8;
tube.position.x = -2.8;

pipette.add(tube);


const tip = new THREE.Mesh(
  new THREE.ConeGeometry(0.062, 0.25, 32),
  material
);

tip.position.y = 0.7;
tip.position.x = -2.8;
tip.rotation.x = Math.PI;

pipette.add(tip);


const markingLayer = new THREE.Mesh(
  new THREE.CylinderGeometry(0.07, 0.07, 2, 64),
  new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  })
);

tube.add(markingLayer);

pipette.position.set(-2.5, 3.2, -1.5);
pipette.rotation.z = Math.PI / 2;
pipette.rotation.y = Math.PI / 2;

pipette.name="pipette";
return pipette;
}
