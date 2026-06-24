export function updateCurrentTask(
  text,
  currentStep,
  totalSteps
) {
  document.getElementById("currentTaskText").textContent = text;

  if(currentStep!=0 && totalSteps!=0)
  document.getElementById("taskProgress").textContent =
    `Step ${currentStep} / ${totalSteps}`;

  const overlay = document.getElementById("currentTaskOverlay");

  // Restart animation
  overlay.classList.remove("flash");
  void overlay.offsetWidth;
  overlay.classList.add("flash");
}