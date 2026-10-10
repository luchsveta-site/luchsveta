'use strict';
const header = document.getElementById('header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const closeMenu = () => {nav.classList.remove('is-open');burger.setAttribute('aria-expanded','false');};
burger.addEventListener('click', () => {const open = nav.classList.toggle('is-open');burger.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape') closeMenu();});

const plan = document.getElementById('signupPlan');
document.querySelectorAll('[data-plan]').forEach(link=>link.addEventListener('click',()=>{plan.value=link.dataset.plan;}));

const dialog = document.getElementById('reviewDialog');
const fullImage = document.getElementById('reviewFull');
let reviewOpener = null;
document.querySelectorAll('.review-zoom').forEach(link=>link.addEventListener('click',event=>{
  if(typeof dialog.showModal !== 'function') return;
  event.preventDefault();reviewOpener=link;
  fullImage.src=link.href;fullImage.alt=link.querySelector('img').alt;
  dialog.showModal();document.body.classList.add('review-open');
}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('review-open');reviewOpener?.focus();});

const form=document.getElementById('signupForm');
const status=document.getElementById('formStatus');
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const button=form.querySelector('button[type="submit"]');
  if(button.disabled)return;
  button.disabled=true;button.textContent='Отправляем…';status.textContent='';
  try{
    const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});
    if(!response.ok)throw new Error('Submission failed');
    status.textContent='Спасибо! Заявка отправлена. Светлана свяжется с вами по указанному контакту.';
    form.reset();
  }catch{
    status.textContent='Не удалось отправить заявку. Попробуйте еще раз или напишите Светлане в Telegram или WhatsApp по ссылкам рядом с формой.';
  }finally{button.disabled=false;button.textContent='Оставить заявку';}
});
