import * as THREE from "three";

import {
    getCamera,
    getControls
} from "../registry/sceneRegistry.js";

import {
    getSceneObject
} from "../registry/sceneRegistry.js";

export function focusOnObject(id){

    const camera = getCamera();
    const controls = getControls();

    const object = getSceneObject(id);

    if(!object) return;

    const box = new THREE.Box3().setFromObject(object);

    const center = new THREE.Vector3();

    box.getCenter(center);

    const size = new THREE.Vector3();

    box.getSize(size);

    const distance = Math.max(size.x,size.y,size.z)*5;

    camera.position.set(

        center.x+distance,
        center.y+distance*0.6,
        center.z+distance

    );

    controls.target.copy(center);

    controls.update();

}