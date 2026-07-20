import * as THREE from "three";

import {
    getSceneObject,
    getCamera,
    getRenderer,
    getControls
} from "../registry/sceneRegistry.js";

import {
    registerPointerDown,
    registerPointerMove,
    registerPointerUp,
    clearPointerEvents
} from "./raycastManager.js";

import {
        getSnapPosition,
    getSnapQuaternion,
    showSnapIndicator,
    hideSnapIndicator
} from "./snapPointManager.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const dragPlane = new THREE.Plane(
    new THREE.Vector3(0,1,0),
    0
);

const intersection = new THREE.Vector3();

let draggingObject = null;
let targetObject = null;
let currentStep = null;
let successCallback = null;

let originalPosition = new THREE.Vector3();

function updateMouse(event){

    const renderer = getRenderer();

    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX-rect.left)/rect.width)*2-1;

    mouse.y =
        -((event.clientY-rect.top)/rect.height)*2+1;

}

export const dragManager={

    enable(step,onSuccess){

        currentStep = step;

        successCallback = onSuccess;

        draggingObject = null;

        targetObject =
            getSceneObject(step.target);

        registerPointerDown((object)=>{

            if(!object) return;

            if(object.userData.id !== step.object) return;

            draggingObject = object;

            originalPosition.copy(
                draggingObject.position
            );

            getControls().enabled = false;

            if(step.snap){

                showSnapIndicator(step.snap);

            }

        });

        registerPointerMove((event)=>{

            if(!draggingObject) return;

            updateMouse(event);

            raycaster.setFromCamera(
                mouse,
                getCamera()
            );

            raycaster.ray.intersectPlane(
                dragPlane,
                intersection
            );

            draggingObject.position.x =
                intersection.x;

            draggingObject.position.z =
                intersection.z;

        });

        registerPointerUp(()=>{

            if(!draggingObject){

                getControls().enabled = true;
                return;

            }

            console.log("Snap Position:", getSnapPosition(currentStep.snap));

console.log("Bottle Origin:", draggingObject.position);

            let snapped = false;

                    const snapPosition =
            getSnapPosition(currentStep.snap);

        const dx =
    draggingObject.position.x -
    snapPosition.x;

const dz =
    draggingObject.position.z -
    snapPosition.z;

const distance =
    Math.sqrt(dx*dx + dz*dz);

console.log(distance);
            if(distance <= currentStep.snapDistance){

//                 draggingObject.position.copy(
//     getSnapPosition(currentStep.snap)
// );

  snapped = true;

    draggingObject.position.copy(
        getSnapPosition(currentStep.snap)
    );

    if(currentStep.placementOffset){

        draggingObject.position.x += currentStep.placementOffset[0];
        draggingObject.position.y += currentStep.placementOffset[1];
        draggingObject.position.z += currentStep.placementOffset[2];

    }

    draggingObject.quaternion.copy(
        getSnapQuaternion(currentStep.snap)
    );

// successCallback();

// dragManager.disable();

            }

            if(snapped){

                if(successCallback){

                    successCallback();

                }

                dragManager.disable();

            }
            else{

                draggingObject.position.copy(
                    originalPosition
                );

            }

            if(step.snap){

                hideSnapIndicator(step.snap);

            }

            draggingObject = null;

            getControls().enabled = true;

        });

    },

    disable(){

        clearPointerEvents();

        draggingObject = null;

        getControls().enabled = true;

    }

};