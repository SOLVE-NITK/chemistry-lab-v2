import { interactionRegistry } from "../registry/interactionRegistry.js";

let currentInteraction = null;

/**
 * Start interaction for current substep
 */
export function enableInteraction(substep) {

    disableInteraction();

    const interaction =
        interactionRegistry[substep.interaction];

    if (!interaction) {

        console.warn(
            "Unknown interaction:",
            substep.interaction
        );

        return;
    }

    currentInteraction = interaction(substep);

}

/**
 * Stop current interaction
 */
export function disableInteraction() {

    if (
        currentInteraction &&
        typeof currentInteraction.disable === "function"
    ) {

        currentInteraction.disable();

    }

    currentInteraction = null;

}

/**
 * Returns active interaction
 */
export function getCurrentInteraction() {

    return currentInteraction;

}