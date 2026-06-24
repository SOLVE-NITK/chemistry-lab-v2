export function startAnimationLoop(
  renderer,
  scene,
  camera,
  controls
) {

  function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
      scene,
      camera
    );
  }

  animate();
}