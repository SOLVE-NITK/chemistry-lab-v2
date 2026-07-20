import { enableClick } from "../interactions/click.js";
import { enableDrag } from "../interactions/dragToTarget.js";
import { enableDragAway } from "../interactions/dragAway.js";
import { enableRotation } from "../interactions/dragRotate.js";
import { enableSlider } from "../interactions/slider.js";

export const interactionRegistry = {
    
    click: enableClick,
    dragToTarget: enableDrag,


    dragAway: enableDragAway,

    dragRotate: enableRotation,

    slider: enableSlider

};