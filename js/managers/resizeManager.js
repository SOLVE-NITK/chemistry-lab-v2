export function initResizeHandler(
  renderer,
  camera
) {

  function onResize() {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );
  }

  window.addEventListener(
    "resize",
    onResize
  );

  onResize();
}