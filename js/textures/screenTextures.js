import * as THREE from "three";

export function createScreenTexture(value = "0.000") {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 256;

  // background
  ctx.fillStyle = "#c6df88";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // value
  ctx.fillStyle = "#0c0c0b";
  ctx.font = "bold 90px monospace";

  ctx.textAlign = "center";

  ctx.fillText(value, 220, 150);

  // unit
  ctx.font = "50px Arial";
  ctx.fillText("g", 420, 150);

  const texture = new THREE.CanvasTexture(canvas);

  return texture;
}