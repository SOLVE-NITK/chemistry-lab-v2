import { focusOnObject } from "./cameraManager.js";
import { animationRegistry } from "../registry/animationRegistry.js";
import { updateCurrentTask } from "./taskManager.js";
import {
    populateProcedurePanel
} from "../ui/procedurePanel.js";

import {
    enableInteraction
}
from "./interactionManager.js";
import { loadScene, resetScene } from "./sceneManager.js";
// import { showFeedback } from "./feedbackManager.js";   // optional (future)

export const procedureState = {

  statuses: {},
    procedureIndex: 0,

    substepIndex: 0,

    running: false,

    experiment: null,

    currentSubstep: null,


};

export function initializeProcedureStatus(experiment){

    procedureState.statuses = {};

    experiment.procedure.forEach((procedure, procedureIndex)=>{

        procedureState.statuses[procedure.id] =
            procedure.substeps.map((substep, subIndex)=>{

                return {

                    id: substep.id,

                    status:
                        procedureIndex === 0 && subIndex === 0
                            ? "active"
                            : "pending"

                };

            });

    });

}

export function startProcedure(experiment){

    procedureState.experiment = experiment;

    procedureState.procedureIndex = 0;

    procedureState.substepIndex = 0;

    procedureState.running = true;

    initializeProcedureStatus(experiment);

    loadCurrentSubstep();

    startCurrentStep();


}



export function loadCurrentSubstep(){

    const procedure =
        procedureState.experiment.procedure[
            procedureState.procedureIndex
        ];

    const substep =
        procedure.substeps[
            procedureState.substepIndex
        ];

    procedureState.currentSubstep = substep;

    // Update scene
    loadScene(substep);

    // Update current task
    updateCurrentTask(

        substep.instruction || substep.task,

        procedureState.substepIndex + 1,

        procedure.substeps.length

    );

    // if(substep.cameraFocus){

    // focusOnObject(
    //     substep.cameraFocus.target
    // );

// }

    // Refresh procedure panel
    populateProcedurePanel(

        procedureState.experiment,

        procedureState.procedureIndex,

        procedureState.substepIndex

    );

}



function runCurrentStep(){

        enableInteraction(
        procedureState.currentSubstep
    );

}
export function setRunning(){

    const procedure =
        procedureState.experiment.procedure[
            procedureState.procedureIndex
        ];

    procedureState.statuses[
        procedure.id
    ][
        procedureState.substepIndex
    ].status = "running";

}

export function startCurrentStep(){

    setRunning();
        populateProcedurePanel(procedureState.experiment);

    runCurrentStep();


}

export function completeCurrentSubstep(){

    playAnimation();

    

}

function playAnimation(){

    const step =
        procedureState.currentSubstep;

   const animation =
    animationRegistry[
        step.animation.type
    ];

    if(animation){

        animation(
            step,
            onAnimationFinished
        );
    }
    else{

        onAnimationFinished();
          

    }

}

function onAnimationFinished(){

  const procedure =
          procedureState.experiment.procedure[
              procedureState.procedureIndex
          ];

      procedureState.statuses[
          procedure.id
      ][
          procedureState.substepIndex
      ].status = "completed";

    if(step.feedback){

    console.log(step.feedback.success);

}

    nextSubstep();

}

export function nextSubstep(){

    const procedure =
        procedureState.experiment.procedure[
            procedureState.procedureIndex
        ];
    if(
    procedureState.substepIndex + 1 <
    procedure.substeps.length
){

    procedureState.statuses[
        procedure.id
    ][
        procedureState.substepIndex + 1
    ].status = "active";

}

    procedureState.substepIndex++;

    if(
        procedureState.substepIndex <
        procedure.substeps.length
    ){

        loadCurrentSubstep();
        startCurrentStep();
        return;

    }

    nextProcedure();

}

function nextProcedure(){

    procedureState.procedureIndex++;

    procedureState.substepIndex = 0;

    if(
        procedureState.procedureIndex >=
        procedureState.experiment.procedure.length
    ){

        finishExperiment();

        return;

    }

    const procedure =
        procedureState.experiment.procedure[
            procedureState.procedureIndex
        ];

    // Make first substep of the new procedure active
    procedureState.statuses[
        procedure.id
    ][0].status = "active";

    loadCurrentSubstep();

    startCurrentStep();

}

function finishExperiment(){

    procedureState.running = false;

    updateCurrentTask(

        "Experiment Completed",

        0,

        0

    );

}


export function resetCurrentStep(){

    arrangeWorkbench(procedureState.experiment);

    resetScene();

    loadCurrentSubstep();

    startCurrentStep();

}

export function getCurrentSubstep(){

    return procedureState.currentSubstep;

}

export function isProcedureFinished(){

    return !procedureState.running;

}