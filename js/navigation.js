(() => {
 "use strict";
 const toggle=document.getElementById("navToggle"),nav=document.getElementById("mobileNav"),closeButton=nav?.querySelector(".menu-close");
 if(!toggle||!nav)return;
 const rtl=document.documentElement.dir==="rtl",labelOpen=rtl?"باز کردن منو":"Open menu",labelClose=rtl?"بستن منو":"Close menu";
 const getSurface=()=>{
  const r=nav.getBoundingClientRect(),x=rtl?Math.min(innerWidth-8,r.left+Math.min(r.width*.5,220)):Math.max(8,r.right-Math.min(r.width*.5,220)),y=Math.min(innerHeight-8,Math.max(8,innerHeight*.5));
  for(const start of document.elementsFromPoint(x,y).filter(el=>el!==nav&&!nav.contains(el)&&!el.closest(".site-header"))){
   let el=start;
   while(el&&el!==document.documentElement){
    const bg=getComputedStyle(el).backgroundColor,m=bg.match(/rgba?\(([^)]+)\)/);
    if(m){const v=m[1].split(",").map(n=>parseFloat(n.trim())),a=v.length>3?v[3]:1;if(a>.08)return(.2126*v[0]+.7152*v[1]+.0722*v[2])/255>.56?"light":"dark";}
    el=el.parentElement;
   }
  }
  return "light";
 };
 const close=()=>{toggle.setAttribute("aria-expanded","false");nav.classList.remove("open");nav.setAttribute("aria-hidden","true");nav.inert=true;document.body.classList.remove("menu-open");document.body.removeAttribute("data-menu-surface");toggle.setAttribute("aria-label",labelOpen);};
 const open=()=>{document.body.setAttribute("data-menu-surface",getSurface());toggle.setAttribute("aria-expanded","true");nav.classList.add("open");nav.setAttribute("aria-hidden","false");nav.inert=false;document.body.classList.add("menu-open");toggle.setAttribute("aria-label",labelClose);closeButton?.focus({preventScroll:true});};
 toggle.addEventListener("click",()=>toggle.getAttribute("aria-expanded")==="true"?close():open());
 closeButton?.addEventListener("click",close);nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
 document.addEventListener("pointerdown",e=>{if(nav.classList.contains("open")&&!nav.contains(e.target)&&!toggle.contains(e.target))close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){close();toggle.focus({preventScroll:true});}});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(!target)return;e.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});history.replaceState(null,"",a.getAttribute("href"));}));
})();