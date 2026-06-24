import * as THREE from "three";
import { createScreenTexture } from "../textures/screenTextures.js";

export function createBalance() {

  const balance = new THREE.Group();

  // =========================
  // MAIN BODY
  // =========================

  const body = new THREE.Mesh(

    new THREE.BoxGeometry(5, 1, 3),

    new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.6
    })
  );

  body.position.y = 0.5;

  balance.add(body);

  // =========================
  // TOP PANEL
  // =========================

  const topPanel = new THREE.Mesh(

    new THREE.BoxGeometry(4.8, 0.05, 2.8),

    new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.5
    })
  );

  topPanel.position.y = 1.02;

  balance.add(topPanel);

  // =========================
  // WEIGHING PLATE
  // =========================

  const plate = new THREE.Mesh(

    new THREE.CylinderGeometry(1.2, 1.2, 0.2, 64),

    new THREE.MeshStandardMaterial({
      color: 0xefefef,
      metalness: 0.7,
      roughness: 0.3
    })
  );

  plate.position.y = 1.2;

  balance.add(plate);

  // =========================
  // DISPLAY SCREEN
  // =========================

  const screenTexture = createScreenTexture("0.000");

  const screen = new THREE.Mesh(

    new THREE.PlaneGeometry(1.8, 0.6),

    new THREE.MeshBasicMaterial({
      map: screenTexture
    })
  );

  screen.position.set(0, 0.5, 1.51);

  balance.add(screen);

  // =========================
  // BUTTONS
  // =========================

  const buttonColors = [
    0xff0000,
    0x00aa66,
    0x0088ff,
    0xffcc00
  ];

  for (let i = 0; i < 4; i++) {

    const button = new THREE.Mesh(

      new THREE.CylinderGeometry(0.12, 0.12, 0.08, 32),

      new THREE.MeshStandardMaterial({
        color: buttonColors[i]
      })
    );

    button.rotation.x = Math.PI / 2;

    button.position.set(
      1.2 + i * 0.3,
      0.45,
      1.52
    );

    balance.add(button);
  }

  // =========================
  // SIDE KNOB
  // =========================

  const knob = new THREE.Mesh(

    new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32),

    new THREE.MeshStandardMaterial({
      color: 0x222222
    })
  );

  knob.rotation.x = -Math.PI / 2;

  knob.position.set(-1.5, 0.45, 1.52);

  balance.add(knob);
  balance.scale.set(0.5, 0.5, 0.5);

  balance.name = "balance";
  return balance;
}