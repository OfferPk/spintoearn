/**
 * Screen rotation helpers for the enhanced Flappy Bird shell.
 * Previous revision of this file incorrectly contained CSS (duplicate of screen-rotation.css).
 * This placeholder keeps the script load from throwing a syntax error until a real
 * implementation is restored. Styles live in css/screen-rotation.css.
 */
(function () {
  function initScreenRotation() {
    console.warn(
      '[screen-rotation] Placeholder module loaded. CSS is available; JS behavior is not implemented yet.'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenRotation);
  } else {
    initScreenRotation();
  }

  window.initScreenRotation = initScreenRotation;
})();
