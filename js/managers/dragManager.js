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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const dragPlane = new THREE.Plane(new THREE.Vector3(0,1,0),0);

let draggingObject = null;
let targetObject = null;
let successCallback = null;
let currentStep = null;

const intersection = new THREE.Vector3();

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

        draggingObject=null;

        currentStep = step;

        targetObject =
            getSceneObject(step.target);
        successCallback=onSuccess;

        registerPointerDown((object)=>{
          
            console.log("Pointer Down");
            if(!object) return;

            if(object.userData.id!==step.object) return;

            draggingObject=object;
            getControls().enabled = false;
            console.log("Dragging:", draggingObject.userData.id);

        });

        registerPointerMove((event)=>{
          console.log("Moving...");
            if(!draggingObject) return;

            updateMouse(event);

            raycaster.setFromCamera(mouse,getCamera());

            raycaster.ray.intersectPlane(
                dragPlane,
                intersection
            );

            draggingObject.position.copy(intersection);

        });

        registerPointerUp(()=>{
console.log("Released");
            if(!draggingObject) return;

            const distance=
                draggingObject.position.distanceTo(
                    targetObject.position
                );

           if(distance <
currentStep.snapDistance){

    //--------------------------------------------------
    // Snap to snapPoint if available
    //--------------------------------------------------

    if(currentStep.snapPoint){

        const snap =
            getSceneObject(currentStep.snapPoint);

        if(snap){

            draggingObject.position.copy(

                snap.getWorldPosition(

                    new THREE.Vector3()

                )

            );

            draggingObject.quaternion.copy(

                snap.getWorldQuaternion(

                    new THREE.Quaternion()

                )

            );

        }

    }

    //--------------------------------------------------
    // Otherwise snap to target center
    //--------------------------------------------------

    else{

        draggingObject.position.copy(

            targetObject.position

        );

    }

    if(successCallback){

        successCallback();

    }

}
            getControls().enabled = true;
            draggingObject=null;

        });

    },

    disable(){

        clearPointerEvents();

        draggingObject=null;

    }

};