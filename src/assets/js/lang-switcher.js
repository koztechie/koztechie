// Lang switcher — store preference, restore on root redirect
(function () {
  'use strict';
  const STORAGE_KEY = 'koztechie_lang';
  const SUPPORTED = ['en', 'uk', 'es', 'de'];

  // On root (/), redirect to stored preference or browser language
  if (window.location.pathname === '/' || window.location.pathname === '') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) {
      window.location.replace('/' + stored + '/');
      return;
    }
    const browser = navigator.language.slice(0, 2).toLowerCase();
    const target = SUPPORTED.includes(browser) ? browser : 'en';
    window.location.replace('/' + target + '/');
    return;
  }

  // Store current lang preference
  const match = window.location.pathname.match(/^\/([a-z]{2})\//);
  if (match && SUPPORTED.includes(match[1])) {
    localStorage.setItem(STORAGE_KEY, match[1]);
  }
})();
