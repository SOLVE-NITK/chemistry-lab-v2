import * as THREE from "three";

export function createPipetteTexture({
  maxVolume = 15,
  height = 0.5
} = {}){

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 2048;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#555";
  ctx.fillStyle = "#555";
  ctx.font = "32px Arial";
  const pixelsPerML = canvas.height / maxVolume;

  for (let i = 0; i <= maxVolume; i++) {

const y = canvas.height - (i * pixelsPerML);

    ctx.beginPath();
    ctx.moveTo(300, y);
    ctx.lineTo(420, y);
    ctx.stroke();

    ctx.fillText(i.toString(), 220, y + 10);
  }

  return new THREE.CanvasTexture(canvas);
}