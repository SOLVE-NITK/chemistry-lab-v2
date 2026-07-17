import {
    showOnly,
    showObjects,
    hideObjects
}
from "./apparatusManager.js";

// import {
//     focusObject,
//     resetCamera
// }
// from "./focusManager.js";

import {
    highlightObjects,
    restoreObjects,
    pulseObject
}
from "./focusManager.js";

/**
 * Load everything required for a procedure substep.
 */


export function loadScene(substep){

    if(!substep) return;

    restoreObjects();

    if(substep.scene){

        if(substep.scene.show){

            showOnly(substep.scene.show);

        }

        if(substep.scene.hide){

            hideObjects(substep.scene.hide);

        }

        if(substep.scene.highlight){

            highlightObjects(
                substep.scene.highlight
            );

            pulseObject(
                substep.scene.highlight[0]
            );

        }

    }

}

export function resetScene(){

    restoreObjects();

}

