(() => {
  "use strict";
  const splash = document.getElementById("siteSplash");
  if (!splash) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dismiss = () => {
    splash.classList.add("is-hidden");
    document.body.classList.remove("has-splash");
    window.setTimeout(() => splash.remove(), reduced ? 0 : 900);
  };
  if (document.readyState === "complete") {
    window.setTimeout(dismiss, reduced ? 0 : 1150);
  } else {
    window.addEventListener("load", () => window.setTimeout(dismiss, reduced ? 0 : 1150), { once: true });
    window.setTimeout(dismiss, 3200);
  }
})();