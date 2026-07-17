import * as THREE from "three";

import {
    getCamera,
    getRenderer,
    getScene
}
from "../registry/sceneRegistry.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let hoveredObject = null;

let selectedObject = null;

let pointerDownCallback = null;
let pointerMoveCallback = null;
let pointerUpCallback = null;


/**
 * Convert mouse position to normalized coordinates
 */
function updateMouse(event){

    const renderer = getRenderer();

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

}


/**
 * Find first intersected object
 */
export function getIntersectedObject(event){

    updateMouse(event);

    raycaster.setFromCamera(
        mouse,
        getCamera()
    );

    const intersects =
        raycaster.intersectObjects(
            getScene().children,
            true
        );

    if(intersects.length===0)
        return null;

    let object = intersects[0].object;

    while(
        object &&
        !object.userData.id &&
        object.parent
    ){

        object = object.parent;

    }

    return object;

}


/**
 * Register Pointer Down
 */
export function registerPointerDown(callback){

    removePointerDown();

    pointerDownCallback = event=>{

        const object =
            getIntersectedObject(event);

        callback(
            object,
            event
        );

    };

    getRenderer().domElement.addEventListener(

        "pointerdown",

        pointerDownCallback

    );

}


/**
 * Register Pointer Move
 */
export function registerPointerMove(callback){

    removePointerMove();

    pointerMoveCallback = event=>{

        callback(event);

    };

    getRenderer().domElement.addEventListener(

        "pointermove",

        pointerMoveCallback

    );

}


/**
 * Register Pointer Up
 */
export function registerPointerUp(callback){

    removePointerUp();

    pointerUpCallback = event=>{

        callback(event);

    };

    getRenderer().domElement.addEventListener(

        "pointerup",

        pointerUpCallback

    );

}


/**
 * Remove Pointer Down
 */
export function removePointerDown(){

    if(pointerDownCallback){

        getRenderer().domElement.removeEventListener(

            "pointerdown",

            pointerDownCallback

        );

    }

}


/**
 * Remove Pointer Move
 */
export function removePointerMove(){

    if(pointerMoveCallback){

        getRenderer().domElement.removeEventListener(

            "pointermove",

            pointerMoveCallback

        );

    }

}


/**
 * Remove Pointer Up
 */
export function removePointerUp(){

    if(pointerUpCallback){

        getRenderer().domElement.removeEventListener(

            "pointerup",

            pointerUpCallback

        );

    }

}


/**
 * Remove every interaction
 */
export function clearPointerEvents(){

    removePointerDown();

    removePointerMove();

    removePointerUp();

}


/**
 * Selected Object
 */

export function setSelectedObject(object){

    selectedObject = object;

}

export function getSelectedObject(){

    return selectedObject;

}

export function clearSelectedObject(){

    selectedObject = null;

}