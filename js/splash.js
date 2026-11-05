(() => {
  "use strict";
  const splash = document.getElementById("siteSplash");
  if (!splash) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add("is-hidden");
    splash.setAttribute("aria-hidden", "true");
    window.setTimeout(() => splash.remove(), reduced ? 0 : 900);
    document.body.classList.remove("has-splash");
  };
  if (document.readyState === "complete") {
    window.setTimeout(dismiss, reduced ? 0 : 1250);
  } else {
    window.addEventListener("load", () => window.setTimeout(dismiss, reduced ? 0 : 1250), { once: true });
    window.setTimeout(dismiss, 3500);
  }
})();