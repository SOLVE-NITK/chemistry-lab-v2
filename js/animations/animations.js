export function playAppearAnimation(object) {
  const finalScale = object.scale.clone();

  object.scale.set(0.01, 0.01, 0.01);

  let scale = 0.01;

  function animate() {

    scale += 0.05;

    if (scale >= 1) {
      object.scale.set(1, 1, 1);
      return;
    }

object.scale.lerp(finalScale, 0.1);
    requestAnimationFrame(animate);
  }

  animate();
}

// Usage: playAppearAnimation(balance);

export async function animateMoveToObject(substep) {

  function animate() {

    object.position.lerp(targetPosition, 0.08);

    if (
      object.position.distanceTo(targetPosition) > 0.01
    ) {
      requestAnimationFrame(animate);
    }

  }

  animate();
}

// usage:
// animateMoveToBalance(
//   weighingBottle,
//   balance.position.clone().add(new THREE.Vector3(0, 0.15, 0))
// );


export function animatePourIntoObject(object) {

  let angle = 0;

  function animate() {

    angle += 0.03;

    object.rotation.z = -angle;

    if (angle < Math.PI / 3) {
      requestAnimationFrame(animate);
    }

  }

  animate();
}


export function animateBalanceReading(
  element,
  targetMass
) {

  let value = 0;

  function animate() {

    value += 0.01;

    if (value > targetMass) {
      value = targetMass;
    }

    element.textContent =
      value.toFixed(3) + " g";

    if (value < targetMass) {
      requestAnimationFrame(animate);
    }

  }

  animate();
}

// const display = document.getElementById("balanceReading");

// animateBalanceReading(display, 0.372);


export async function animateRemoveObject(substep){

    console.log("Remove:", substep.object);

}

export async function animateSwirl(substep){

    console.log("Swirl:", substep.object);

}

export async function animateFillToMark(substep){

    console.log("Fill:", substep.object);

}

export async function animateInvert(substep){

    console.log("Invert:", substep.object);

}

export async function animateCloseStopper(substep){

    console.log("Close Stopper:", substep.object);

}