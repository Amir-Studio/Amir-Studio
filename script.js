(() => {
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const loader=$("#pageLoader"),header=$("#siteHeader"),progress=$("#scrollProgress"),glow=$("#pointerGlow");
const toggle=$("#menuToggle"),panel=$("#menuPanel"),close=$("#menuClose"),year=$("#year");
if(year)year.textContent=String(new Date().getFullYear());
const hide=()=>window.setTimeout(()=>loader?.classList.add("is-hidden"),380);
if(document.readyState==="complete")hide();else window.addEventListener("load",hide,{once:true});
window.setTimeout(hide,2200);
let returnFocus=null;
function setMenu(open){
 if(!panel||!toggle)return;
 panel.classList.toggle("open",open);toggle.classList.toggle("active",open);
 toggle.setAttribute("aria-expanded",String(open));panel.setAttribute("aria-hidden",String(!open));
 panel.inert=!open;document.body.classList.toggle("menu-open",open);
 if(open){returnFocus=document.activeElement;close?.focus({preventScroll:true});}
 else if(returnFocus?.focus)returnFocus.focus({preventScroll:true});
}
toggle?.addEventListener("click",()=>setMenu(toggle.getAttribute("aria-expanded")!=="true"));
close?.addEventListener("click",()=>setMenu(false));
$$(".menu-links a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&panel?.classList.contains("open"))setMenu(false);
 if(e.key==="Tab"&&panel?.classList.contains("open")){
  const f=$$('a[href],button:not([disabled])',panel),first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
let busy=false;
function scrollUpdate(){
 const max=document.documentElement.scrollHeight-innerHeight;
 if(progress)progress.style.width=(max>0?scrollY/max*100:0).toFixed(2)+"%";
 header?.classList.toggle("is-scrolled",scrollY>28);busy=false;
}
addEventListener("scroll",()=>{if(!busy){requestAnimationFrame(scrollUpdate);busy=true;}},{passive:true});scrollUpdate();
const items=$$(".reveal");
if("IntersectionObserver"in window&&!reduced){
 const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target);}
 }),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
 items.forEach((item,i)=>{item.style.transitionDelay=(i%3)*65+"ms";observer.observe(item);});
}else items.forEach(item=>item.classList.add("is-visible"));
if(glow&&matchMedia("(hover:hover) and (pointer:fine)").matches&&!reduced){
 let queued=false;
 addEventListener("pointermove",e=>{
  if(queued)return;queued=true;
  requestAnimationFrame(()=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";glow.style.opacity=".9";queued=false;});
 },{passive:true});
 document.addEventListener("pointerleave",()=>glow.style.opacity="0");
}
if(!reduced&&matchMedia("(hover:hover) and (pointer:fine)").matches){
 $$(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
   const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.09,y=(e.clientY-r.top-r.height/2)*.12;
   el.style.transform=`translate3d(${x}px,${y}px,0)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
 });
 const visual=$(".hero-visual"),hero=$(".hero");
 hero?.addEventListener("pointermove",e=>{
  if(e.pointerType==="touch")return;
  const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  if(visual)visual.style.translate=`${x*9}px ${y*9}px`;
 });
 hero?.addEventListener("pointerleave",()=>{if(visual)visual.style.translate="";});
}
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const target=$(a.getAttribute("href"));if(!target)return;
 e.preventDefault();target.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
 history.replaceState(null,"",a.getAttribute("href"));
}));
})();