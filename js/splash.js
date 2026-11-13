(() => {
 "use strict";
 const splash=document.getElementById("siteSplash");
 if(!splash)return;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 let dismissed=false;
 const dismiss=()=>{
  if(dismissed)return;dismissed=true;
  splash.classList.add("is-hidden");
  splash.setAttribute("aria-hidden","true");
  window.setTimeout(()=>splash.remove(),reduced?0:760);
  document.body.classList.remove("has-splash");
 };
 // Do not wait for every image/font to finish downloading before revealing the hero.
 const show=()=>window.setTimeout(dismiss,reduced?0:850);
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",show,{once:true});
 else show();
 // Safety fallback if DOMContentLoaded is delayed for any reason.
 window.setTimeout(dismiss,2500);
})();