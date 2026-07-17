import { dragManager } from "../managers/dragManager.js";

import {
    completeCurrentSubstep
} from "../managers/procedureManager.js";

export function enableDrag(step){

    dragManager.enable(

    step,

    ()=>{

        completeCurrentSubstep();

    }

);

    return dragManager;

}