(() => {
  "use strict";
  const toggle=document.getElementById("navToggle");
  const nav=document.getElementById("mobileNav");
  const closeButton=nav?.querySelector(".menu-close");
  if(!toggle||!nav)return;
  const close=()=>{toggle.setAttribute("aria-expanded","false");nav.classList.remove("open");nav.setAttribute("aria-hidden","true");nav.inert=true;document.body.classList.remove("menu-open");toggle.setAttribute("aria-label","Open menu");};
  const open=()=>{toggle.setAttribute("aria-expanded","true");nav.classList.add("open");nav.setAttribute("aria-hidden","false");nav.inert=false;document.body.classList.add("menu-open");toggle.setAttribute("aria-label","Close menu");closeButton?.focus({preventScroll:true});};
  toggle.addEventListener("click",()=>toggle.getAttribute("aria-expanded")==="true"?close():open());
  closeButton?.addEventListener("click",close);
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
  document.addEventListener("pointerdown",e=>{if(nav.classList.contains("open")&&!nav.contains(e.target)&&!toggle.contains(e.target))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){close();toggle.focus({preventScroll:true});}});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});history.replaceState(null,"",a.getAttribute("href"));}));
})();