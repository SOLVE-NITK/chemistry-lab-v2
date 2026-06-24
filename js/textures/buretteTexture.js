import * as THREE from "three";

export function createBuretteTexture({
  maxVolume = 50,
  height = 0.5
} = {}) {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 512;
  canvas.height = 2048;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.font = "32px Arial";

  // 🔥 pixels per mL
  const pixelsPerML = canvas.height / maxVolume;

  for (let i = 0; i <= maxVolume; i++) {

const y = canvas.height - (i * pixelsPerML);
    // minor tick
    ctx.beginPath();
    ctx.moveTo(380, y);
    ctx.lineTo(450, y);
    ctx.stroke();

    // major tick
    if (i % 5 === 0) {

      ctx.beginPath();
      ctx.moveTo(300, y);
      ctx.lineTo(450, y);
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillText(i.toString(), 220, y + 10);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  texture.needsUpdate = true;

  return texture;
}