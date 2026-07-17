import { getSceneObject }
from "../registry/sceneRegistry.js";

import {
    completeCurrentSubstep
}
from "../managers/procedureManager.js";

let object;

function onClick(){

    object.removeEventListener(
        "click",
        onClick
    );

    completeCurrentSubstep();

}

export function enableClick(step){

    object = getSceneObject(
        step.object
    );

    object.userData.clickable = true;

    object.userData.onClick = onClick;

}

enableClick.disable = function(){

    if(object){

        object.userData.clickable = false;

        object.userData.onClick = null;

    }

}