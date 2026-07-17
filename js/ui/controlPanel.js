import { appState }
from "../managers/appStateManager.js";

import {
    startQuiz,
    nextQuestion
}
from "../managers/quizManager.js";

import {
    procedureState,
    startProcedure,
    startCurrentStep,
    nextSubstep,
    resetCurrentStep
}
from "../managers/procedureManager.js";

export function initControlPanel(
    scene,
    experiment,
    objectRegistry
){

    const startBtn =
        document.getElementById("start-btn");

    const nextBtn =
        document.getElementById("next-btn");

    const resetBtn =
        document.getElementById("reset-btn");

    startBtn.onclick = ()=>{

        if(appState.phase==="quiz"){

            startQuiz(
                scene,
                experiment,
                objectRegistry
            );

        }

        else if(appState.phase==="procedure"){

            if(!procedureState.running){

                    startProcedure(experiment);

                }
                else{

                    startCurrentStep();

                }
        }

    };

    nextBtn.onclick = ()=>{

        if(appState.phase==="quiz"){

            nextQuestion(
                scene,
                experiment,
                objectRegistry
            );

        }

        else if(appState.phase==="procedure"){

            nextSubstep();

        }

    };

    resetBtn.onclick = ()=>{

        if(appState.phase==="procedure"){

            resetCurrentStep();

        }

    };

}