export function populateProcedurePanel(
  experiment,
  currentStepIndex = 0,
  currentSubstepIndex = 0
) {
  const container = document.getElementById("procedureContent");
  container.innerHTML = "";

  experiment.procedure.forEach((step, stepIndex) => {

    const card = document.createElement("div");
    card.className = "procedure-step";

    card.innerHTML = `
      <div class="procedure-title">
        Step ${stepIndex + 1}: ${step.title}
      </div>
    `;

    // Show substeps
    const subList = document.createElement("div");
    subList.className = "procedure-substeps";

    step.substeps.forEach((substep, subIndex) => {

      const row = document.createElement("div");
      row.className = "procedure-substep";

      let icon = "○";

      if (stepIndex < currentStepIndex) {
        icon = "✓";
      } else if (
        stepIndex === currentStepIndex &&
        subIndex < currentSubstepIndex
      ) {
        icon = "✓";
      } else if (
        stepIndex === currentStepIndex &&
        subIndex === currentSubstepIndex
      ) {
        icon = "▶";
      }

      row.innerHTML = `
        <span class="substep-icon">${icon}</span>
        <span>${substep.task}</span>
      `;

      subList.appendChild(row);
    });

    card.appendChild(subList);
    container.appendChild(card);
  });
}