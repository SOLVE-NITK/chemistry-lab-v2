
import { openAccordion } from "../ui/openAccordian.js";
import { showApparatus } from "./apparatusManager.js";
import { populateApparatusReviewPanel } from "../ui/apparatusPanel.js";
import { setInstructions } from "../ui/instructionPanel.js";
import { updateCurrentTask } from "../managers/taskManager.js";
import { createWorkbench } from "../managers/workbenchManager.js";
import { initControlPanel } from "../ui/controlPanel.js";
import { appState } from "../managers/appStateManager.js";
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");

export const quizState = {
  currentQuestion: 0,
  selectedAnswer: null,
  score: 0,
  currentObject: null,
  quizEnabled:false
};


export function startQuiz(scene,experiment,objectRegistry){
  startBtn.disabled = true;
  nextBtn.disabled = true;
  quizState.quizEnabled = true;
  openAccordion("apparatusContent");
  showQuestion(scene,experiment,objectRegistry);

}


export function showQuestion(scene,experiment,objectRegistry){
  nextBtn.disabled = true;
  const apparatus = experiment.apparatus[quizState.currentQuestion];
  const description = experiment.apparatus[quizState.currentQuestion].description;
  const object = objectRegistry[apparatus.id]();
  quizState.currentObject = object;
  showApparatus(scene,object,apparatus);
  updateCurrentTask(
  `Identify the apparatus: ${description}`,
  quizState.currentQuestion+1,
  experiment.apparatus.length
);
}

export function updateApparatusIcons(correctId, selectedId) {
  const options = document.querySelectorAll(".apparatus-option");
  options.forEach((option) => {
    const icon = option.querySelector(".apparatus-status");
    if (option.dataset.id === correctId && selectedId===correctId) {
      // nextQuestion(scene,experiment,objectRegistry);
      icon.textContent = "✅";
      nextBtn.disabled = false;
    } else if (option.dataset.id === selectedId) {
      icon.textContent = "❌";
    } else {
      icon.textContent = "⭕";
    }
  });
}


// Clear Scene
function clearScene(scene){
  scene.remove(quizState.currentObject);
  quizState.currentObject = null;
}

export function lockAnswer(experiment) {
  const current = experiment.apparatus[quizState.currentQuestion];
  const correctId = current.id;
  const selectedId = quizState.selectedAnswer;
  updateApparatusIcons(correctId, selectedId);
  // Enable Next button, update score, etc.
}

// Next Question
export function nextQuestion(scene,experiment,objectRegistry){
  
  // console.log(quizState.currentQuestion,experiment.apparatus.length);
  quizState.currentQuestion++;
  if(quizState.currentQuestion >= experiment.apparatus.length)
    {
      clearScene(scene);
      // Open Instructions
        openAccordion("instructionContent");
        setInstructions("Apparatus Identification is Complete🥳", [
          "You can find the reference to apparatus by clicking 👁️ in the Apparatus Section",
          "We go ahead with the experiment procedure step by step."
        ]);
      // desktop
      finishApparatusQuiz(experiment);
      startBtn.textContent = "Start Experiment";
      startBtn.disabled = false;
      nextBtn.disabled = true;
      appState.phase = "procedure";
      createWorkbench( scene, experiment,objectRegistry);
      openAccordion("procedureContent");
      updateCurrentTask(`Task Complete. We go ahead with the experiment procedure step by step.`,0,);
    }
  else {
      clearScene(scene);
      showQuestion(scene,experiment,objectRegistry);
    }

}

export function finishApparatusQuiz(experiment, containerId = "apparatusContent") {
  populateApparatusReviewPanel(experiment, containerId);
}