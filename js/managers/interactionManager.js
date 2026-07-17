import { interactionRegistry } from "../registry/interactionRegistry.js";
import { clearPointerEvents } from "./raycastManager.js";

let currentHandler = null;

export function enableInteraction(substep) {

    disableInteraction();

    const handler =
        interactionRegistry[substep.interaction];

    if (!handler) {

        console.warn(
            "Unknown interaction:",
            substep.interaction
        );

        return;
    }

    currentHandler = handler(substep);

}

export function disableInteraction() {

    clearPointerEvents();

    if (
        currentHandler &&
        typeof currentHandler.disable === "function"
    ) {

        currentHandler.disable();

    }

    currentHandler = null;

}

/*
|--------------------------------------------------------------------------
| Wrappers used by interaction files
|--------------------------------------------------------------------------
*/

