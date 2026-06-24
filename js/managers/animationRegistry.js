import {
  playAppearAnimation,
  animateMoveToBalance,
  animateCrystalPour,
  animateBalanceReading
} from "./animations.js";

export const animationRegistry = {
  appear: playAppearAnimation,
  moveToBalance: animateMoveToBalance,
  pourCrystals: animateCrystalPour,
  updateDisplay: animateBalanceReading
};