import { populateApparatusPanel, populateApparatusReviewPanel } from "./apparatusPanel.js";
import { quizState } from "../managers/quizManager.js";
export function initMobileAccordion(experiment) {

  const mobileSheet =
    document.getElementById(
      "mobileSheet"
    );

  const mobileContent =
    document.getElementById(
      "mobileSheetContent"
    );

  const handle =
    document.getElementById(
      "sheetHandle"
    );

  handle.addEventListener(
    "click",
    () => {

      mobileSheet.classList.toggle(
        "active"
      );
    }
  );

  const tabs =
    document.querySelectorAll(
      ".mobile-tab"
    );

  tabs.forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        mobileSheet.classList.add(
          "active"
        );

        tabs.forEach(btn => {

          btn.classList.remove(
            "active"
          );
        });

        tab.classList.add(
          "active"
        );
      }
    );
  });

  document
    .querySelectorAll("[data-panel]")
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const panel =
            btn.dataset.panel;

          mobileSheet.classList.add(
            "active"
          );

          if(panel === "instructions"){
            mobileContent.innerHTML=document.getElementById("instructionContent").innerHTML;
          }

          if(panel === "procedure") {

            mobileContent.innerHTML =
              document.getElementById(
                "procedureContent"
              ).innerHTML;
          }

          if(panel === "apparatus") {

            // mobileContent.innerHTML =
            //   document.getElementById(
            //     "apparatusContent"
            //   ).innerHTML;
              if(quizState.currentQuestion >= experiment.apparatus.length){
                populateApparatusReviewPanel(experiment,"mobileSheetContent");
              }
            else {
              populateApparatusPanel(experiment,"mobileSheetContent");
            }
          }
        }
      );
    });
}