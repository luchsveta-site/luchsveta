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

// Таймер обратного отсчёта до закрытия набора
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const deadline = new Date('2026-09-10T23:59:59');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');
  const pad = (n) => String(n).padStart(2, '0');

  const updateCountdown = () => {
    const diff = deadline - new Date();
    if (diff <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      clearInterval(countdownTimer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMinutes.textContent = pad(minutes);
    cdSeconds.textContent = pad(seconds);
  };

  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);
}

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
