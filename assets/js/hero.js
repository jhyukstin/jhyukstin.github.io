/**
 * Cinematic hero — progressive enhancement only.
 *
 * The entrance animation is pure CSS and runs without this file. This script
 * adds the two things CSS cannot do on its own:
 *
 *   1. a restrained pointer parallax (desktop, fine pointers only)
 *   2. the scroll hand-off from the hero into the page, plus the header
 *      switching from transparent to its normal paper bar
 *
 * Everything is written to CSS custom properties and consumed by transforms,
 * so no layout is ever recalculated. Both effects are skipped entirely when
 * the visitor prefers reduced motion.
 */
(function () {
  'use strict';

  var hero = document.querySelector('[data-cine]');
  if (!hero) return;

  var header = document.querySelector('.site-header');
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  var scrollQueued = false;
  var pointerQueued = false;
  var pointerX = 0;
  var pointerY = 0;

  /* ---------------------------------------------------- header height ---- */
  // The hero is sized against the real header height so it fills the viewport
  // exactly, on any breakpoint, without hard-coding a value.
  function measureHeader() {
    if (!header) return;
    root.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  /* ----------------------------------------------------------- scroll ---- */
  function applyScroll() {
    scrollQueued = false;
    var height = hero.offsetHeight || 1;
    var progress = window.scrollY / height;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    if (!reduceMotion.matches) {
      hero.style.setProperty('--scroll', progress.toFixed(4));
    }
    if (header) {
      // Keep the header transparent while the dark hero is behind it.
      header.classList.toggle('site-header--ghost', progress < 0.82);
    }
  }

  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(applyScroll);
  }

  /* ---------------------------------------------------------- pointer ---- */
  function applyPointer() {
    pointerQueued = false;
    hero.style.setProperty('--mx', pointerX.toFixed(3));
    hero.style.setProperty('--my', pointerY.toFixed(3));
  }

  function onPointerMove(event) {
    // Normalised to -1..1 from the centre of the viewport.
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    if (pointerQueued) return;
    pointerQueued = true;
    requestAnimationFrame(applyPointer);
  }

  function resetPointer() {
    pointerX = 0;
    pointerY = 0;
    applyPointer();
  }

  /* ------------------------------------------------------------ wiring --- */
  function enablePointer() {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', resetPointer);
  }

  function disablePointer() {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('blur', resetPointer);
    resetPointer();
  }

  function syncPointerEffect() {
    if (finePointer.matches && !reduceMotion.matches) enablePointer();
    else disablePointer();
  }

  function onMotionPreferenceChange() {
    if (reduceMotion.matches) hero.style.removeProperty('--scroll');
    else applyScroll();
    syncPointerEffect();
  }

  function teardown() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    disablePointer();
  }

  function onResize() {
    measureHeader();
    applyScroll();
  }

  // Older Safari only has addListener on MediaQueryList.
  function listen(query, handler) {
    if (query.addEventListener) query.addEventListener('change', handler);
    else if (query.addListener) query.addListener(handler);
  }

  measureHeader();
  applyScroll();
  syncPointerEffect();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pagehide', teardown, { once: true });
  listen(reduceMotion, onMotionPreferenceChange);
  listen(finePointer, syncPointerEffect);
})();
