// Idle status indicator — shows a blinking dot when user is inactive
(function() {
  const indicator = document.createElement('span');
  indicator.className = 'idle-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  indicator.textContent = '●';

  // Append to pcb-header__status if it exists
  const headerStatus = document.querySelector('.pcb-header__status');
  if (headerStatus) {
    headerStatus.appendChild(indicator);
  }

  // Blink every 2s when idle (no mouse/keyboard activity for 5s)
  let idleTimer;
  let isIdle = false;

  function resetIdle() {
    isIdle = false;
    indicator.style.opacity = '1';
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { isIdle = true; }, 5000);
  }

  function blink() {
    if (isIdle) {
      indicator.style.opacity = indicator.style.opacity === '0.3' ? '1' : '0.3';
    }
  }

  document.addEventListener('mousemove', resetIdle);
  document.addEventListener('keydown', resetIdle);
  document.addEventListener('touchstart', resetIdle);

  setInterval(blink, 2000);
  resetIdle();
})();
