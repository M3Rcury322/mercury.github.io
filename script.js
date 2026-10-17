
(() => {
  'use strict';

  function init() {
    const body = document.body;

    // Отмечаем, что JavaScript запустился
    body.classList.add('js-ready');

    // Звёзды
    const stars = document.getElementById('stars');

    if (stars && stars.children.length === 0) {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 100; i++) {
        const star = document.createElement('i');
        star.className = 'star-dot';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', 2.5 + Math.random() * 5 + 's');
        star.style.setProperty('--delay', -Math.random() * 7 + 's');

        const size = Math.random() > 0.9 ? 3 : 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = 0.3 + Math.random() * 0.7;

        fragment.appendChild(star);
      }

      stars.appendChild(fragment);
    }

    // Переключение темы
    const theme = document.getElementById('themeToggle');

    if (theme) {
      theme.addEventListener('click', () => {
        const light = body.classList.toggle('light');
        theme.setAttribute(
          'aria-label',
          light ? 'Включить тёмную тему' : 'Включить светлую тему'
        );
      });
    }

    // Мобильное меню
    const menu = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menu && nav) {
      menu.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
          menu.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-label', 'Открыть меню');
        });
      });
    }

    // Анимация появления элементов
    const elements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      elements.forEach(element => observer.observe(element));
    } else {
      elements.forEach(element => element.classList.add('visible'));
    }

    // Кнопка наверх
    const toTop = document.getElementById('toTop');

    if (toTop) {
      const update = () => {
        toTop.classList.toggle('visible', window.scrollY > 400);
      };

      window.addEventListener('scroll', update, { passive: true });

      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      update();
    }

    console.log('Полу-Месяцы: script.js запущен успешно');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
