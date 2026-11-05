(() => {
 const art=document.querySelector(".hero-art");
 if(!art||matchMedia("(prefers-reduced-motion: reduce)").matches||matchMedia("(pointer: coarse)").matches)return;
 let frame=0;
 window.addEventListener("pointermove",e=>{
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   const x=(e.clientX/innerWidth-.5)*2;
   const y=(e.clientY/innerHeight-.5)*2;
   art.style.transform="perspective(1200px) rotateY("+(x*1.1)+"deg) rotateX("+(-y*.8)+"deg)";
   frame=0;
  });
 },{passive:true});
})();