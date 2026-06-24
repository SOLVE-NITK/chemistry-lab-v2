export const procedureState = {
  currentStep: 0,
  currentSubstep: 0
};


export function nextProcedureStep() {
  procedureState.currentStep++;
}