import { sceneRegistry,getSceneObject } from "../registry/sceneRegistry.js";
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

// store original scale
object.userData.originalScale = object.scale.clone();

  scene.add(object);

  // animateAppear(object);

}

export function showObject(id){

    const object = getSceneObject(id);

    if(!object) return;

    object.visible = true;

    // animateAppear(object);

}


export function hideObject(id){

    const object = getSceneObject(id);

    if(!object) return;

    object.visible = false;

}


export function showObjects(ids){

    ids.forEach(id=>{

        showObject(id);

    });

}


export function hideObjects(ids){

    ids.forEach(id=>{

        hideObject(id);

    });

}



export function hideAllObjects(){

    Object.values(sceneRegistry).forEach(object=>{

        object.visible = false;

    });

}


export function showOnly(ids){

    hideAllObjects();

    showObjects(ids);

}

export function updateScene(sceneConfig){

    if(sceneConfig.show){

        showOnly(sceneConfig.show);

    }

    if(sceneConfig.hide){

        hideObjects(sceneConfig.hide);

    }

}