// Small, purposeful interactions. No heavy libraries.
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Reveal sections gently as they enter the viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(18px)';
  section.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(section);
});

document.querySelectorAll('.section').forEach(section => {
  const reveal = () => {
    if (section.classList.contains('is-visible')) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  };
  section.addEventListener('transitionend', reveal);
});

// Lightweight magnetic feel for primary buttons on desktop.
document.querySelectorAll('.button-primary').forEach(button => {
  button.addEventListener('mousemove', e => {
    if (window.innerWidth < 850) return;
    const r = button.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.08;
    const y = (e.clientY - r.top - r.height / 2) * 0.08;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener('mouseleave', () => button.style.transform = '');
});
