import * as THREE from "three";

import {
    registerSceneObject,
    getSceneObject,
    getAllSceneObjects
} from "../registry/sceneRegistry.js";

export function createWorkbench(
    scene,
    experiment,
    objectRegistry
) {

    experiment.workbenchLayout.forEach(item => {

        const factory = objectRegistry[item.id];

        if (!factory) return;

        const object = factory();

        object.visible = true;

        object.position.set(
            item.position[0],
            item.position[1],
            item.position[2]
        );

        object.rotation.set(
            item.rotation[0],
            item.rotation[1],
            item.rotation[2]
        );

        object.scale.set(
            item.scale[0],
            item.scale[1],
            item.scale[2]
        );

        scene.add(object);

        registerSceneObject(
            item.id,
            object
        );

    });

}

/*----------------------------------------*/

export function arrangeWorkbench(
    experiment
){

    experiment.workbenchLayout.forEach(item=>{

        const object =
            getSceneObject(item.id);

        if(!object) return;

        object.visible = true;

        object.position.set(
            item.position[0],
            item.position[1],
            item.position[2]
        );

        object.rotation.set(
            item.rotation[0],
            item.rotation[1],
            item.rotation[2]
        );

    });

}

/*----------------------------------------*/

export function hideWorkbench(){

    getAllSceneObjects().forEach(object=>{

        object.visible = false;

    });

}

/*----------------------------------------*/

export function showWorkbench(){

    getAllSceneObjects().forEach(object=>{

        object.visible = true;

    });

}

/*----------------------------------------*/

export function clearWorkbench(){

    getAllSceneObjects().forEach(object=>{

        object.visible = false;

    });

}

/*----------------------------------------*/

export function getWorkbenchObject(id){

    return getSceneObject(id);

}