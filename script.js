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

  // Refresh USD conversion on every visit; do not reuse a stale browser cache.
  const rateStatus=document.querySelector("[data-rate-status]");
  const priceNodes=[...document.querySelectorAll("[data-usd]")];
  const rateUrl="https://raw.githubusercontent.com/iran-market/iran-market.github.io/main/data/popular.json";
  const findUsdNode=value=>{
    if(!value||typeof value!=="object") return null;
    if(Array.isArray(value)){for(const item of value){const found=findUsdNode(item);if(found)return found;}return null;}
    if(value.symbol==="USD_IRR_FREE"||value.code==="USD_IRR_FREE"||value.name==="USD_IRR_FREE") return value;
    for(const child of Object.values(value)){const found=findUsdNode(child);if(found)return found;}
    return null;
  };
  const updatePrices=async()=>{
    if(!priceNodes.length)return;
    try{
      const response=await fetch(rateUrl+"?visit="+Date.now(),{cache:"no-store"});
      if(!response.ok)throw new Error("rate unavailable");
      const payload=await response.json();
      const node=findUsdNode(payload);
      const raw=node&&(node.price??node.value??node.close??node.p??node.rate);
      const rate=Number(String(raw??"").replace(/,/g,""));
      if(!Number.isFinite(rate)||rate<=0)throw new Error("invalid rate");
      const toman=rate>1000000?rate/10:rate;
      priceNodes.forEach(el=>{
        const usd=Number(el.dataset.usd);
        el.textContent="حدود "+new Intl.NumberFormat("fa-IR",{maximumFractionDigits:0}).format(usd*toman)+" تومان";
      });
      if(rateStatus)rateStatus.textContent="نرخ تبدیل از منبع بازار · "+new Intl.NumberFormat("fa-IR").format(toman)+" تومان برای هر دلار";
    }catch(error){
      priceNodes.forEach(el=>el.textContent="معادل تومانی موقتاً در دسترس نیست");
      if(rateStatus)rateStatus.textContent="نرخ زنده دریافت نشد؛ مبالغ دلاری معتبرند.";
    }
  };
  updatePrices();
  const items=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
    }),{threshold:.12,rootMargin:"0px 0px -30px 0px"});
    items.forEach(item=>observer.observe(item));
  }else items.forEach(item=>item.classList.add("visible"));
})();