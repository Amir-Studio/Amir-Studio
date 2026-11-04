(() => {
  document.documentElement.classList.add("js-motion");
  const menuButton=document.getElementById("menuToggle");
  const mobileNav=document.getElementById("mobileNav");
  const year=document.getElementById("year");
  if(year) year.textContent=String(new Date().getFullYear());
  if(menuButton&&mobileNav){
    const setMenu=open=>{
      menuButton.setAttribute("aria-expanded",String(open));
      menuButton.setAttribute("aria-label",open?"بستن منو":"باز کردن منو");
      mobileNav.classList.toggle("open",open);
      mobileNav.inert=!open;
      document.body.classList.toggle("menu-open",open);
    };
    menuButton.addEventListener("click",()=>setMenu(menuButton.getAttribute("aria-expanded")!=="true"));
    mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menuButton.getAttribute("aria-expanded")==="true"){setMenu(false);menuButton.focus();}});
    window.addEventListener("resize",()=>{if(window.innerWidth>700)setMenu(false);});
  }
  const items=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
    }),{threshold:.12,rootMargin:"0px 0px -30px 0px"});
    items.forEach(item=>observer.observe(item));
  }else items.forEach(item=>item.classList.add("visible"));
})();