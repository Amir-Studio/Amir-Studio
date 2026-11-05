(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = $("#siteHeader");
  const progress = $("#topLine");
  const toggle = $("#menuToggle");
  const nav = $("#mobileNav");
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const setMenu = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    nav.setAttribute("aria-hidden", String(!open));
    nav.inert = !open;
    document.body.classList.toggle("menu-open", open);
  };
  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$(".mobile-nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      setMenu(false);
      toggle?.focus({ preventScroll: true });
    }
  });

  let queued = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
    header?.classList.toggle("is-scrolled", window.scrollY > 30);
    queued = false;
  };
  window.addEventListener("scroll", () => {
    if (!queued) {
      window.requestAnimationFrame(updateScroll);
      queued = true;
    }
  }, { passive: true });
  updateScroll();

  const reveal = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    reveal.forEach(item => observer.observe(item));
  } else {
    reveal.forEach(item => item.classList.add("is-visible"));
  }

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = $(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", anchor.getAttribute("href"));
    });
  });
})();