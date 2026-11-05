(() => {
 "use strict";
 const items=[...document.querySelectorAll(".work-heading,.editorial-project,.section-heading,.product-line,.studio-story,.studio-principles article,.capability-list article,.journal-card,.contact-intro,.contact-form")];
 if(!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(x=>x.classList.add("is-visible"));return;}
 items.forEach((x,i)=>{x.classList.add("reveal");x.style.transitionDelay=(i%3)*70+"ms";});
 const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
 items.forEach(x=>observer.observe(x));
})();