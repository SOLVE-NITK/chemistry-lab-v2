import {
    playAppearAnimation,
    animateMoveToObject,
    animatePourIntoObject,
    animateBalanceReading,
    animateRemoveObject,
    animateSwirl,
    animateFillToMark,
    animateInvert,
    animateCloseStopper
} from "../animations/animations.js";

export const animationRegistry = {

    appear: playAppearAnimation,

    moveToObject: animateMoveToObject,

    pourIntoObject: animatePourIntoObject,

    updateDisplay: animateBalanceReading,

    removeObject: animateRemoveObject,

    swirl: animateSwirl,

    fillToMark: animateFillToMark,

    invert: animateInvert,

    closeStopper: animateCloseStopper

};