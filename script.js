document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const revealTargets = document.querySelectorAll('.clay');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.classList.add('pre-reveal');
  observer.observe(el);
});
