
export function openAccordion(id) {

  // Close all accordions
  document.querySelectorAll(".accordion-content")
    .forEach(content => {
      content.classList.add("hide");
    });

  document.querySelectorAll(".accordion-header")
    .forEach(header => {
      header.classList.remove("active");
    });

  // Open the requested accordion
  const content = document.getElementById(id);
  const header = content?.previousElementSibling;

  if (content && header) {
    content.classList.remove("hide");
    header.classList.add("active");
  }
}