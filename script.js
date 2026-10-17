
(() => {
  'use strict';

  function init() {
    // 1. ЗВЁЗДНЫЙ ФОН
    const stars = document.getElementById('stars');

    if (stars && !stars.dataset.initialized) {
      stars.dataset.initialized = 'true';

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 100; i++) {
        const star = document.createElement('i');
        star.className = 'star-dot';

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty(
          '--duration',
          `${2 + Math.random() * 5}s`
        );
        star.style.setProperty(
          '--delay',
          `${Math.random() * -7}s`
        );

        const size = Math.random() > 0.9 ? 3 : 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = `${0.3 + Math.random() * 0.7}`;

        fragment.appendChild(star);
      }

      stars.appendChild(fragment);
    }

    // 2. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle && !themeToggle.dataset.initialized) {
      themeToggle.dataset.initialized = 'true';

      themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');

        themeToggle.setAttribute(
          'aria-label',
          isLight ? 'Включить тёмную тему' : 'Включить светлую тему'
        );
      });
    }

    // 3. МОБИЛЬНОЕ МЕНЮ
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav && !menuToggle.dataset.initialized) {
      menuToggle.dataset.initialized = 'true';

      menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');

        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
          'aria-label',
          isOpen ? 'Закрыть меню' : 'Открыть меню'
        );
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Открыть меню');
        });
      });
    }

    // 4. ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08
      });

      revealElements.forEach(element => observer.observe(element));
    } else {
      revealElements.forEach(element => {
        element.classList.add('visible');
      });
    }

    // 5. КНОПКА ВОЗВРАТА НАВЕРХ
    const toTop = document.getElementById('toTop');

    if (toTop) {
      const updateToTop = () => {
        toTop.classList.toggle('visible', window.scrollY > 400);
      };

      window.addEventListener('scroll', updateToTop, {
        passive: true
      });

      toTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      updateToTop();
    }

    console.log('☾ Полу-Месяцы: JavaScript загружен');
  }

  // Ждём, пока HTML будет готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
