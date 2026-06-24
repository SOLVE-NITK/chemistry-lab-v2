import { lockAnswer, quizState } from "../managers/quizManager.js";
import { shuffleArray } from "../utils/shuffleArray.js";
import { openPreview } from "../managers/previewManager.js";
import { objectRegistry } from "../registry/objectRegistry.js";
export function populateApparatusPanel(experiment,  containerId = "apparatusContent"
) {

const shuffledApparatus = shuffleArray([...experiment.apparatus]);  
const container = document.getElementById(containerId);
  container.innerHTML = "";
  shuffledApparatus.forEach((item) => {

    const option = document.createElement("div");
    option.className = "apparatus-option";
    option.dataset.id = item.id;

    const status = document.createElement("span");
    status.className = "apparatus-status";
    status.textContent = "⭕";

    const text = document.createElement("span");
    text.className = "apparatus-name";
    text.textContent = item.name;

    // Select this option
    option.addEventListener("click", () => {
        if(quizState.quizEnabled){
        // Remove previous selection
        document
          .querySelectorAll(".apparatus-option")
          .forEach((el) => {
            el.classList.remove("selected");
            el.querySelector(".apparatus-status").textContent = "⭕";
          });

        option.classList.add("selected");
        status.textContent = "🔘";

        quizState.selectedAnswer = item.id;
        lockAnswer(experiment);
      }
    });
    

    // Append children
    option.appendChild(status);
    option.appendChild(text);

    container.appendChild(option);
  });
}


export function populateApparatusReviewPanel(
  experiment,
  containerId = "apparatusContent"
) {

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  experiment.apparatus.forEach((item) => {

    const option = document.createElement("div");
    option.className = "apparatus-option review";
    option.dataset.id = item.id;

    // Left side: apparatus icon + name
    const left = document.createElement("div");
    left.className = "apparatus-left";

    const icon = document.createElement("span");
    icon.className = "apparatus-icon";
    icon.textContent = "🧪";

    const text = document.createElement("span");
    text.className = "apparatus-name";
    text.textContent = item.name;

    left.appendChild(icon);
    left.appendChild(text);

    // Right side: view button
    const viewBtn = document.createElement("button");
    viewBtn.className = "apparatus-view-btn";
    viewBtn.textContent = "👁️";

    viewBtn.addEventListener("click", (e) => {
        openPreview(item, objectRegistry);
        
    });

    option.appendChild(left);
    option.appendChild(viewBtn);

    container.appendChild(option);
  });
}