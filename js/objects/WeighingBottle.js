
import * as THREE from "three";
import { createBottleLabel } from "../textures/labelTexture.js";
export function createWeighingBottle() {

  const bottle = new THREE.Group();

  // =========================================
  // GLASS MATERIAL
  // =========================================

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    transparent: true,
    opacity: 0.95,
    roughness: 0.05,
    thickness: 0.4,
    ior: 1.45,
    color: 0xe8f7ff,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });

  // =========================================
  // BOTTLE BODY
  // =========================================

  const body = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.4,   // top radius
      0.4,   // bottom radius
      1,   // height
      128,
      1,
      true   // open ended
    ),

    glassMaterial
  );

  body.position.y = 1.25;

  bottle.add(body);

  // =========================================
  // BOTTOM DISC
  // =========================================

  const bottom = new THREE.Mesh(

    new THREE.CircleGeometry(0.4, 128),

    glassMaterial
  );

  bottom.rotation.x = -Math.PI / 2;

  bottom.position.y = 0.8; // slight offset to prevent z-fighting

  bottle.add(bottom);

  // =========================================
  // TOP RIM
  // =========================================

  const rim = new THREE.Mesh(

    new THREE.TorusGeometry(0.42, 0.03, 32, 100),

    glassMaterial
  );

  rim.rotation.x = Math.PI / 2;

  rim.position.y = 1.75;

  bottle.add(rim);

  // =========================================
  // STOPPER BASE
  // =========================================
  const stopper = new THREE.Group();

  const stopperBase = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.35,
      0.35,
      0.18,
      64
    ),

    glassMaterial
  );

  stopperBase.position.y = 2.62;

  stopper.add(stopperBase);

  // =========================================
  // STOPPER KNOB
  // =========================================

  const stopperKnob = new THREE.Mesh(

    new THREE.SphereGeometry(
      0.28,
      64,
      64
    ),

    glassMaterial
  );

  stopperKnob.position.y = 3;

  stopperKnob.scale.y = 1.1;

  stopper.add(stopperKnob);

  stopper.position.y = -0.8;

  bottle.add(stopper);

  // =========================================
  // TEXT LABEL
  // =========================================

  const texture = createBottleLabel();

  const label = new THREE.Mesh(

    new THREE.PlaneGeometry(0.5, 0.25),

    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    })
  );

  label.position.set(0, 1.2, 0.41);

  bottle.add(label);

  // =========================================
  // SHADOWS
  // =========================================

  bottle.traverse((child) => {

    if (child.isMesh) {

      child.castShadow = true;
      child.receiveShadow = true;

    }

  });


  bottle.name = "weighingBottle";
  bottle.scale.set(0.5,0.5,0.5);

  bottle.name= "weighingBottle";
  return bottle;
}
