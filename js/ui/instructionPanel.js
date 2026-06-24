// ui/instructionPanel.js

export function initInstructionPanel() {
  // const header = document.getElementById("instructionHeader");
  // const content = document.getElementById("instructionContent");

  // if (!header || !content) return;

  // header.addEventListener("click", () => {
  //   header.classList.toggle("active");
  //   content.classList.toggle("hide");
  // });
  setInstructions("Apparatus Identification", [
    "Click on the start button to start the experiment",
    "Observe the apparatus displayed on the table.",
    "Find its correct name in the Apparatus list.",
    "Click the apparatus name to check your answer.",
    "After identifying, click Next to continue.",
    "Complete all apparatus before starting the procedure."
  ])
}

export function setInstructions(title, steps = []) {
  const titleElement = document.getElementById("instructionTitle");
  const listElement = document.getElementById("instructionList");

  if (!titleElement || !listElement) return;

  titleElement.textContent = title;
  listElement.innerHTML = "";

  steps.forEach((step) => {
    const li = document.createElement("li");
    li.innerHTML = step;
    listElement.appendChild(li);
  });
}