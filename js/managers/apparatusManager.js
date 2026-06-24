import { animateAppear } from "../animations/appear.js";
import * as THREE from "three";

export function showApparatus(
  scene,
  object,
  config
){

  const TABLE_TOP_Y = -0.4;
const box =
new THREE.Box3().setFromObject(object);

const size =
new THREE.Vector3();

box.getSize(size);

// TABLE_TOP_Y + height / 2,
const height = size.y;
  object.position.set(
    config.position[0],
    config.position[1],
    config.position[2]
  );

  object.rotation.set(
    ...config.rotation
  );

  object.scale.set(
    ...config.scale
  );

  scene.add(object);

  // animateAppear(object);

}