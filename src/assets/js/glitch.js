// KOZTECHIE — Glitch flicker controller
(function () {
  'use strict';

  const GLITCH_MIN_INTERVAL = 3500;
  const GLITCH_MAX_INTERVAL = 8000;
  const GLITCH_DURATION     = 220;

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function scheduleGlitch(el) {
    const delay = randomBetween(GLITCH_MIN_INTERVAL, GLITCH_MAX_INTERVAL);
    setTimeout(function () {
      el.classList.add('is-glitching');
      setTimeout(function () {
        el.classList.remove('is-glitching');
        scheduleGlitch(el);
      }, GLITCH_DURATION);
    }, delay);
  }

  function init() {
    const nameEl = document.querySelector('#site-name');
    if (!nameEl) return;
    scheduleGlitch(nameEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
