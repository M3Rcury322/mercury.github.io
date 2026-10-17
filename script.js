(() => {
  const stars = document.getElementById('stars');
  // Небольшие звёзды создаются один раз, чтобы фон оставался лёгким.
  for (let i = 0; i < 85; i++) {
    const star = document.createElement('i');
    star.className = 'star-dot';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2.5 + Math.random() * 5}s`);
    star.style.setProperty('--delay', `${Math.random() * -7}s`);
    star.style.opacity = `${0.25 + Math.random() * 0.65}`;
    const size = Math.random() > .9 ? 3 : 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    stars.appendChild(star);
  }

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const light = document.body.classList.toggle('light');
    themeToggle.setAttribute('aria-label', light ? 'Включить тёмную тему' : 'Включить светлую тему');
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
