
import { procedureState } from "../managers/procedureManager.js";
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

      const state =
    procedureState.statuses?.[step.id]?.[subIndex]?.status ?? "pending";
      let icon = "⭕";
      let subtitle = "Pending";

      switch (state) {

        case "active":
          icon = "🔵";
          subtitle = "Ready";
          break;

        case "running":
          icon = "🟡";
          subtitle = "In Progress";
          break;

        case "completed":
          icon = "✅";
          subtitle = "Completed";
          break;

      }

      row.classList.add(state);

      row.innerHTML = `
          <span class="substep-icon">${icon}</span>

          <div class="substep-content">

              <div class="substep-task">
                  ${substep.task}
              </div>

              <div class="substep-status">
                  ${subtitle}
              </div>

          </div>
      `;

      subList.appendChild(row);
    });

    card.appendChild(subList);
    container.appendChild(card);
  });
}