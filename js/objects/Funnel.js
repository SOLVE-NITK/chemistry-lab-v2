// 📁 objects/Funnel.js

import * as THREE from "three";

export function createFunnel() {

  const funnel = new THREE.Group();

  // =========================================
  // GLASS MATERIAL
  // =========================================

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    transparent: true,
    opacity: 0.95,
    roughness: 0.03,
    thickness: 0.25,
    ior: 1.45,
    color: 0xe8f7ff,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });

  // =========================================
  // FUNNEL CONE
  // =========================================

  const cone = new THREE.Mesh(

     new THREE.CylinderGeometry(
      0.3,
      0.04,
      1.5,
      64,
      1,
      true
    ),

    glassMaterial
  );

  cone.position.y = 1.2;
  // cone.rotation.y = Math.PI / 4;
  funnel.add(cone);


   // =========================================
  // TOP RIM
  // =========================================

  const rim = new THREE.Mesh(

    new THREE.TorusGeometry(
      0.32,
      0.03,
      32,
      100
    ),

    glassMaterial
  );

  rim.rotation.x = Math.PI / 2;

  rim.position.y = 2;

  funnel.add(rim);

  // =========================================
  // STEM / PIPE
  // =========================================

  const stem = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.04,
      0.04,
      1.5,
      64,
      1,
      true
    ),

    glassMaterial
  );

  stem.position.y = -0.2;

  funnel.add(stem);

 

  // =========================================
  // STEM END RING
  // =========================================

  const stemRing = new THREE.Mesh(

    new THREE.TorusGeometry(
      0.04,
      0.01,
      16,
      50
    ),

   glassMaterial
  );

  stemRing.rotation.x = Math.PI / 2;

  stemRing.position.y = -0.95;

  funnel.add(stemRing);

  // =========================================
  // SHADOWS
  // =========================================

  // funnel.traverse((child) => {

  //   if (child.isMesh) {

  //     child.castShadow = true;
  //     child.receiveShadow = true;

  //   }

  // });

  funnel.scale.y=0.5;
  funnel.name= "funnel";
  return funnel;
}