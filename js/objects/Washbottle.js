// 📁 objects/WashBottle.js

import * as THREE from "three";

export function createWashBottle() {

  const bottle = new THREE.Group();

  // =========================================
  // MATERIALS
  // =========================================

  const plasticMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 0.85,
    transparent: true,
    opacity: 0.95,
    roughness: 0.2,
    thickness: 0.5,
    color: 0xdfe7f2,
    ior: 1.35
  });

  const redMaterial = new THREE.MeshStandardMaterial({
    color: 0xcc1111,
    roughness: 0.4
  });

  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xdd2222,
    roughness: 0.7
  });

  // =========================================
  // BOTTLE BODY
  // =========================================

  const body = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.7,
      0.72,
      2.5,
      128
    ),

    plasticMaterial
  );

  body.position.y = 1.3;

  bottle.add(body);

  // =========================================
  // BOTTOM ROUNDING
  // =========================================

  const bottom = new THREE.Mesh(

    new THREE.SphereGeometry(
      0.72,
      64,
      64
    ),

    plasticMaterial
  );

  bottom.scale.y = 0.35;

  bottom.position.y = 0.05;

  bottle.add(bottom);

  // =========================================
  // NECK
  // =========================================

  const neck = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.22,
      0.22,
      0.3,
      64
    ),

    plasticMaterial
  );

  neck.position.y = 2.75;

  bottle.add(neck);

  // =========================================
  // RED CAP
  // =========================================

  const cap = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.42,
      0.42,
      0.4,
      64
    ),

    capMaterial
  );

  cap.position.y = 2.6;

  bottle.add(cap);

  // =========================================
  // CAP RIDGES
  // =========================================

  for (let i = 0; i < 28; i++) {

    const ridge = new THREE.Mesh(

      new THREE.BoxGeometry(
        0.02,
        0.2,
        0.05
      ),

      redMaterial
    );

    const angle = (i / 28) * Math.PI * 2;

    ridge.position.set(
      Math.cos(angle) * 0.42,
      2.6,
      Math.sin(angle) * 0.42
    );

    ridge.lookAt(0, 2.6, 0);

    bottle.add(ridge);
  }

  // =========================================
  // BENT SPOUT
  // =========================================

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.7, 0),
    new THREE.Vector3(0, 1.2, -0.2),
    new THREE.Vector3(-0.7, 1.5, -0.3)
  ]);

  const spoutGeometry = new THREE.TubeGeometry(
    curve,
    100,
    0.07,
    32,
    false
  );

  const spout = new THREE.Mesh(
    spoutGeometry,
    redMaterial
  );

  spout.position.y = 2.8;

  bottle.add(spout);

  // =========================================
  // WATER INSIDE
  // =========================================

  const water = new THREE.Mesh(

    new THREE.CylinderGeometry(
      0.66,
      0.68,
      1.4,
      64
    ),

    new THREE.MeshPhysicalMaterial({
      color: 0xbfd7ea,
      transmission: 0.9,
      transparent: true,
      opacity: 0.5,
      roughness: 0
    })
  );

  water.position.y = 0.7;

  bottle.add(water);

  // =========================================
  // LABEL
  // =========================================

  const labelTexture = createLabelTexture();

  const label = new THREE.Mesh(

    new THREE.PlaneGeometry(0.7, 0.45),

    new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true
    })
  );

  label.position.set(0, 1.3, 0.72);

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
  bottle.name = "washbottle";
  bottle.scale.set(0.5,0.5,0.5);

  bottle.name= "washbottle";
  return bottle;
}


// =========================================
// LABEL TEXTURE
// =========================================

function createLabelTexture() {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 256;

  // paper
  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // text
  ctx.fillStyle = "#444";
  ctx.font = "bold 42px Arial";
  ctx.textAlign = "center";

  ctx.fillText("Distilled", 256, 100);
  ctx.fillText("Water", 256, 170);

  return new THREE.CanvasTexture(canvas);
}