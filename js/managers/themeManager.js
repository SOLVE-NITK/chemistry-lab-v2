export function initTheme() {

  const toggle =
    document.getElementById(
      "themeBtn"
    );

  toggle.addEventListener(
    "click",
    () => {

      document.documentElement
        .classList.toggle("dark");
    }
  );
}