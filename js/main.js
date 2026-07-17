
import { initScene }
from "./logic/initScene.js";

import { registerScene } from "./registry/sceneRegistry.js";


import { createTable }
from "./objects/Table.js";

import { startAnimationLoop }
from "./managers/animationLoop.js";

import { initResizeHandler }
from "./managers/resizeManager.js";

import { initTheme }
from "./managers/themeManager.js";

import { initDesktopAccordion }
from "./ui/desktopAccordion.js";

import { initMobileAccordion }
from "./ui/mobileAccordion.js";

import { initMobileSheet }
from "./ui/mobileSheet.js";
import { initFloatingControl } from "./ui/floatingControls.js";

import { initControlPanel } from "./ui/controlPanel.js";
import { appState } from "./managers/appStateManager.js";

import { objectRegistry }
from "./registry/objectRegistry.js";

import { showApparatus } from "./managers/apparatusManager.js";
import { populateApparatusPanel } from "./ui/apparatusPanel.js";


import { populateProcedurePanel } from "./ui/procedurePanel.js";
import { procedureState } from "./managers/procedureManager.js";

import {initPreview,closePreview} from "./managers/previewManager.js";

// Quiz
import { startQuiz, nextQuestion } from "./managers/quizManager.js";

import {
  initInstructionPanel,
  setInstructions
} from "./ui/instructionPanel.js";

// Loader update
function updateLoader(percent,text){

  document
  .getElementById("progressBar")
  .style.width = `${percent}%`;

  document
  .getElementById("loadingText")
  .textContent = text;
}


updateLoader(
  20,
  "Creating Scene..."
);
// LOAD EXPERIMENT
const experiment =
await fetch("../data/experiment.json")
.then(res=>res.json());


// LOAD APPARATUS PANEL
populateApparatusPanel(experiment);


updateLoader(
  40,
  "Loading Table..."
);
// SCENE

const world = initScene();
registerScene(world);
const {
    scene,
    camera,
    renderer,
    controls
} = world;

createTable(scene);





updateLoader(
  100,
  "Ready"
);

setTimeout(()=>{

  document
  .getElementById("loader")
  .classList.add("hide");
  
},500);

// MANAGERS

initResizeHandler(
  renderer,
  camera
);

initTheme();


// UI

initDesktopAccordion();

initMobileAccordion(experiment);

initMobileSheet();

initFloatingControl();


initInstructionPanel()

initPreview();


document
  .getElementById("closeInspector")
  .addEventListener(
    "click",
    closePreview
  );

// START LOOP

startAnimationLoop(
  renderer,
  scene,
  camera,
  controls
);


// Control Buttons
initControlPanel(
    scene,
    experiment,
    objectRegistry
);



// Apparatus & Procedure panels
const apparatusContent = document.getElementById("apparatusContent");
const procedureContent = document.getElementById("procedureContent");




// Current task management
const overlay =
document.getElementById(
  "currentTaskOverlay"
);

const button =
document.getElementById(
  "toggleTaskBtn"
);

button.addEventListener(
  "click",
  () => {

    overlay.classList.toggle(
      "collapsed"
    );

    button.textContent =
      overlay.classList.contains(
        "collapsed"
      )
      ? "▼"
      : "▲";
  }
);



// After loading experiment.json
populateProcedurePanel(
  experiment,
  procedureState.currentStep,
  procedureState.currentSubstep
);