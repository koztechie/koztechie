// KOZTECHIE — Staggered reveal on load
(function () {
  'use strict';

  function revealBlocks() {
    const blocks = document.querySelectorAll('[data-reveal]');
    if (!blocks.length) return;

    blocks.forEach(function (block) {
      const order = parseInt(block.getAttribute('data-reveal'), 10) || 0;
      const delay  = 200 + (order * 180);
      setTimeout(function () {
        block.classList.add('is-visible');
      }, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealBlocks);
  } else {
    revealBlocks();
  }
})();
