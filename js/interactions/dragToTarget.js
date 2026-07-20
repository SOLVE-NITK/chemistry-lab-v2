import { dragManager } from "../managers/dragManager.js";

export function enableDrag(substep) {

    dragManager.enable(

        substep,

        () => {

            if (typeof substep.onComplete === "function") {

                substep.onComplete();

            }

        }

    );

    return {

        disable() {

            dragManager.disable();

        }

    };

}