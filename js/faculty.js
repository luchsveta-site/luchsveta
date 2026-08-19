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

// FAQ-аккордеон
document.querySelectorAll('.faq__item').forEach(item => {
  const question = item.querySelector('.faq__question');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.faq__item').forEach(i => i.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });
});

// Кнопки «Оставить заявку» на карточках курсов — подставляют курс и ведут к форме
const courseInput = document.getElementById('signupCourse');
document.querySelectorAll('.js-request-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (courseInput) courseInput.value = btn.dataset.course || '';
    const signup = document.getElementById('signup');
    if (signup) signup.scrollIntoView({ behavior: 'smooth' });
  });
});

// Отправка формы заявки в Netlify Forms
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('button');
    const originalText = btn.textContent;
    const data = new URLSearchParams(new FormData(signupForm)).toString();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    })
      .then(() => {
        btn.textContent = 'Заявка отправлена!';
        signupForm.reset();
        setTimeout(() => { btn.textContent = originalText; }, 2500);
      })
      .catch(() => {
        alert('Не удалось отправить форму. Попробуйте ещё раз или напишите нам напрямую.');
      });
  });
}
