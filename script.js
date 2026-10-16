(() => {
  const menuButton = document.getElementById("menuToggle");
  const menu = document.getElementById("menuOverlay");
  const backdrop = document.getElementById("backdrop");
  const closeButton = document.getElementById("closeMenu");
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && menu && backdrop && closeButton) {
    let lastFocused = null;

    const setMenu = (open) => {
      menu.classList.toggle("open", open);
      backdrop.classList.toggle("active", open);
      menuButton.classList.toggle("active", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      menu.inert = !open;
      document.body.classList.toggle("lock", open);

      if (open) {
        lastFocused = document.activeElement;
        closeButton.focus({ preventScroll: true });
      } else if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus({ preventScroll: true });
      }
    };

    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    closeButton.addEventListener("click", () => setMenu(false));
    backdrop.addEventListener("click", () => setMenu(false));
    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        setMenu(false);
      }
      if (event.key === "Tab" && menu.classList.contains("open")) {
        const focusable = [...menu.querySelectorAll('a[href], button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    ".section, .work-card, .service-item, .principles article, .process-steps > div, .contact-card"
  );

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    revealTargets.forEach((element) => element.classList.add("visible"));
  }
})();