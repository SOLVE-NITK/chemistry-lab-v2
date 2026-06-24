import { quizState } from "../managers/quizManager.js";

export function initDesktopAccordion() {

  const headers =
    document.querySelectorAll(
      ".accordion-header"
    );

  

  headers.forEach(header => {

    header.addEventListener(
      "click",
      () => {

      // Close all other accordions
      headers.forEach((other) => {
        if (other !== header) {
          other.classList.remove("active");
          other.nextElementSibling.classList.add("hide");
        }
      });
      
      console.log(header.nextElementSibling)
        header.classList.toggle(
          "active"
        );

        const content =
          header.nextElementSibling;

        content.classList.toggle(
          "hide"
        );
      }
    );
  });
  if(quizState.quizEnabled){
        document.getElementById("apparatusContent").classList.remove("hide")
        document.getElementById("apparatusContent").classList.add("active")
      }
}