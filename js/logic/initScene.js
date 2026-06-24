import * as THREE from "three";

import {
  OrbitControls
}
from
"https://cdn.jsdelivr.net/npm/three@0.170/examples/jsm/controls/OrbitControls.js";

export function initScene() {
const CAMERA_PRESETS = {
  labView: {
    pos: [0, -6, 5],
    target: [0, -5, -5]
  }
};
  const container =
    document.querySelector("#app");

  // SCENE

  const scene =
    new THREE.Scene();

  scene.background =
    new THREE.Color("#f7b11a");

  // CAMERA

  const camera =
    new THREE.PerspectiveCamera(
      45,
      container.clientWidth /
      container.clientHeight,
      0.1,
      100
    );

   camera.position.set(...CAMERA_PRESETS.labView.pos);
  camera.lookAt(...CAMERA_PRESETS.labView.target);
  camera.updateProjectionMatrix();

  // camera.lookAt(0, -5, -1);

  // RENDERER

  const renderer =
    new THREE.WebGLRenderer({
      antialias: true
    });

  renderer.shadowMap.enabled = true;
  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      1.5
    )
  );


  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

  renderer.physicallyCorrectLights = true;

  container.innerHTML = "";

  container.appendChild(
    renderer.domElement
  );

  // CONTROLS

  const controls =
    new OrbitControls(
      camera,
      renderer.domElement
    );

  controls.enableDamping = true;     // smooth movement
  controls.dampingFactor = 0.05;

  controls.enableZoom = true;        // zoom
  controls.enablePan = true;         // move scene

  controls.minDistance = 2;          // zoom limit (near)
  controls.maxDistance = 20;         // zoom limit (far)

  controls.maxPolarAngle = Math.PI / 2; // prevent going below table

  controls.update();

  // LIGHTS

  const directional =
    new THREE.DirectionalLight(
      0xffffff,
      1
    );

  directional.position.set(
    5,
    5,
    5
  );

  directional.castShadow = true;

  scene.add(directional);

  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      0.2
    );

  scene.add(ambient);

  const hemiLight =
    new THREE.HemisphereLight(
      0xffffff,
      0x444444,
      1
    );

  scene.add(hemiLight);

  return {
    scene,
    camera,
    renderer,
    controls
  };
}