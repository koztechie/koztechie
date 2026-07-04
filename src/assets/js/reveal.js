// Staggered reveal on page load
(function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const items = document.querySelectorAll('[data-reveal]');
  const baseDelay = 100; // ms
  const stagger = 80;    // ms between items

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('is-visible');
    }, baseDelay + (index * stagger));
  });
})();
