// Фон хедера при прокрутке
const header = document.getElementById('header');
const toggleHeaderBg = () => {
  if (window.scrollY > 40) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
toggleHeaderBg();
window.addEventListener('scroll', toggleHeaderBg);

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// Появление блоков при скролле
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Заглушка отправки формы заявки
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Заявка отправлена!';
    signupForm.reset();
    setTimeout(() => { btn.textContent = originalText; }, 2500);
  });
}
