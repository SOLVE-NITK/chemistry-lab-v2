
import * as THREE from "three";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

let scene;
let camera;
let renderer;
let controls;

let currentObject = null;

// Cache stores ONE original object per apparatus
const previewCache = new Map();

export function initPreview() {

  const container = document.getElementById("previewCanvas");

  scene = new THREE.Scene();

  scene.background =
      new THREE.Color("#07bd81");

  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(
    camera,
    renderer.domElement
  );

  controls.enableDamping = true;
  controls.enablePan = false;

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  animate();
}

function animate() {

  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

/**
 * Returns a CLONE from cache.
 */
function getPreviewObject(item, objectRegistry) {

  if (!previewCache.has(item.id)) {

    const factory = objectRegistry[item.id];

    if (!factory) {
      console.warn(`No factory found for ${item.id}`);
      return null;
    }

    // Create ONCE and cache
    previewCache.set(
      item.id,
      factory()
    );
  }

  // Clone for display
  return previewCache
    .get(item.id)
    .clone(true);
}

export function openPreview(
  item,
  objectRegistry
) {

  document
    .getElementById("inspectorPanel")
    .classList.add("open");

    // Wait for CSS transition to complete
  setTimeout(() => {
    resizePreview();
  }, 350);

  document
    .getElementById("previewTitle")
    .textContent = item.name;
  document
    .getElementById("previewDescription")
    .textContent = item.description;

  // Remove previous preview object
  if (currentObject) {

    scene.remove(currentObject);

    currentObject = null;
  }

  currentObject = getPreviewObject(
    item,
    objectRegistry
  );

  if (!currentObject) return;

  scene.add(currentObject);

  // Center the object
  const box = new THREE.Box3()
    .setFromObject(currentObject);

  const center = box.getCenter(
    new THREE.Vector3()
  );

  currentObject.position.sub(center);

  const size = box.getSize(
    new THREE.Vector3()
  );

  const maxDim = Math.max(
    size.x,
    size.y,
    size.z
  );

  camera.position.set(
    0,
    maxDim * 0.8,
    maxDim * 2.8
  );

  controls.target.set(0, 0, 0);
  controls.update();
}

export function closePreview() {

  document
    .getElementById("inspectorPanel")
    .classList.remove("open");
}

export function resizePreview() {

  const container = document.getElementById("previewCanvas");

  const width = container.clientWidth;
  const height = container.clientHeight;

  if (!width || !height) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}