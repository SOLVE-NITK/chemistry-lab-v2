import { getSceneObject, getAllSceneObjects }
from "../registry/sceneRegistry.js";

const DIM_OPACITY = 0.25;
const NORMAL_OPACITY = 1;

export let focusedObjects = [];


function setOpacity(object, opacity) {

    object.traverse(child => {

        if (!child.isMesh) return;

        if (!child.material) return;

        child.material.transparent = opacity < 1;
        child.material.opacity = opacity;

    });

}

export function highlightObjects(ids = []) {

    focusedObjects = ids;

    getAllSceneObjects().forEach(object => {

        if (ids.includes(object.userData.id)) {

            setOpacity(object, NORMAL_OPACITY);

        }
        else {

            setOpacity(object, DIM_OPACITY);

        }

    });

}

// restore all objects to normal opacity

export function restoreObjects() {

    getAllSceneObjects().forEach(object => {

        setOpacity(
            object,
            NORMAL_OPACITY
        );

    });

}





export function pulseObject(id) {

    const object =
        getSceneObject(id);

    if (!object) return;

    let growing = true;

    const original = object.scale.clone();

    const interval = setInterval(() => {

        if (growing) {

            object.scale.multiplyScalar(1.01);

            if (object.scale.x > original.x * 1.08)
                growing = false;

        }
        else {

            object.scale.multiplyScalar(0.99);

            if (object.scale.x <= original.x) {

                object.scale.copy(original);

                clearInterval(interval);

            }

        }

    }, 16);

}