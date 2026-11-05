(() => {
  "use strict";
  const splash = document.getElementById("splash");
  if (!splash) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dismiss = () => {
    splash.classList.add("hidden");
    splash.setAttribute("aria-hidden", "true");
    window.setTimeout(() => splash.remove(), reduced ? 80 : 900);
  };
  if (document.readyState === "complete") {
    window.setTimeout(dismiss, reduced ? 100 : 2100);
  } else {
    window.addEventListener("load", () => window.setTimeout(dismiss, reduced ? 100 : 2100), { once: true });
    window.setTimeout(dismiss, 3800);
  }
})();