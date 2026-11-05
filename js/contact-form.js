(() => {
 const form=document.getElementById("contactForm");
 if(!form)return;
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent("AmirStudio project inquiry — "+data.get("name"));
  const body=encodeURIComponent("Name: "+data.get("name")+"\nEmail: "+data.get("email")+"\n\nProject details:\n"+data.get("message"));
  window.location.href="mailto:projects.amirstudio@gmail.com?subject="+subject+"&body="+body;
 });
})();