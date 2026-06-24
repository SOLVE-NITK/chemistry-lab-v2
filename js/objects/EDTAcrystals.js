// 📁 objects/EDTACrystals.js

import * as THREE from "three";
import { createPetriDish } from "./PetriDish.js";

export function createEDTACrystals() {

  const group = new THREE.Group();

  // ---------------------------------------
  // Shared Material
  // ---------------------------------------

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0
  });

  // ---------------------------------------
  // Shared Geometries
  // ---------------------------------------

  const tetra = new THREE.TetrahedronGeometry(0.012);
  const octa = new THREE.OctahedronGeometry(0.010);
  const cone = new THREE.ConeGeometry(0.008, 0.020, 4);

  const count = 200;

  const tetraMesh = new THREE.InstancedMesh(
    tetra,
    material,
    count
  );

  const octaMesh = new THREE.InstancedMesh(
    octa,
    material,
    count
  );

  const coneMesh = new THREE.InstancedMesh(
    cone,
    material,
    count
  );

  tetraMesh.castShadow = true;
  octaMesh.castShadow = true;
  coneMesh.castShadow = true;

  tetraMesh.receiveShadow = true;
  octaMesh.receiveShadow = true;
  coneMesh.receiveShadow = true;

  const dummy = new THREE.Object3D();

  function fill(mesh, total) {

    for (let i = 0; i < total; i++) {

      const radius = Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;

      dummy.position.set(
        Math.cos(angle) * radius,
        (1 - radius / 0.35) * 0.18 * Math.random(),
        Math.sin(angle) * radius
      );

      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.6 + Math.random() * 0.6;

      dummy.scale.set(
        scale,
        scale,
        scale
      );

      dummy.updateMatrix();

      mesh.setMatrixAt(
        i,
        dummy.matrix
      );
    }

    mesh.instanceMatrix.needsUpdate = true;
  }

  fill(tetraMesh, count);
  fill(octaMesh, count);
  fill(coneMesh, count);

  group.add(
    tetraMesh,
    octaMesh,
    coneMesh
  );

  // ---------------------------------------
  // Petri Dish
  // ---------------------------------------

  const petriDish = createPetriDish();

  petriDish.position.y = -0.05;

  group.add(petriDish);

  group.name = "edtaCrystals";

  return group;
}