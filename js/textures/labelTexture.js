import * as THREE from "three";
// =========================================
// LABEL TEXTURE
// =========================================

export function createBottleLabel() {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 256;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";

  ctx.font = "90px Arial";
  ctx.textAlign = "center";

  ctx.fillText("h 80mm", 256, 100);
  ctx.fillText("d 40mm", 256, 170);

  return new THREE.CanvasTexture(canvas);

}