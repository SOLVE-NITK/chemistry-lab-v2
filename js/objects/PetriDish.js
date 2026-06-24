
import * as THREE from "three";
export function createPetriDish() {
const dish = new THREE.Mesh(

  new THREE.CylinderGeometry(
    0.6,
    0.6,
    0.04,
    128
  ),

  new THREE.MeshPhysicalMaterial({

    transmission: 1,

    transparent: true,

    roughness: 0,

    thickness: 0.15,

    color: 0xdff6ff

  })
);

dish.name="petriDish";
return dish;
}