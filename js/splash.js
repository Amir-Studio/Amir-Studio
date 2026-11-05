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
 const show=()=>window.setTimeout(dismiss,reduced?0:1100);
 if(document.readyState==="complete")show();
 else{window.addEventListener("load",show,{once:true});window.setTimeout(dismiss,4200);}
})();