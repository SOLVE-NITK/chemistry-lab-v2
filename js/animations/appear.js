export function animateAppear(object) {
  console.log(object)
  let scale = 0;
  let scaleLimit = object.name === "washbottle" || object.name === "balance" ? 0.5 : 1;
// start invisible
  object.scale.set(0, 0, 0);
  function grow() {

    scale += 0.05;

    object.scale.set(scale, scale, scale);

    if (scale < scaleLimit) {
      requestAnimationFrame(grow);
    } else {
        object.scale.set(scaleLimit, scaleLimit, scaleLimit);
    }
  }

  grow();
}