export function initFloatingControl(){
  function floatControl(){
    document.documentElement.style.setProperty(
      "--mobile-sheet-height",
      "80px"
    );
  }
 floatControl();
}