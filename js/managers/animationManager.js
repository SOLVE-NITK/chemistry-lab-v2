import { animationRegistry } from "../animations/animationRegistry.js";

export async function playCurrentAnimation(substep){

    if(!substep.animation) return;

    const animation =
        animationRegistry[substep.animation];

    if(!animation){

        console.warn(
            "Animation not found:",
            substep.animation
        );

        return;

    }

    await animation(substep);

}