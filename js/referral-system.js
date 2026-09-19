/**
 * Referral system helpers for the enhanced Flappy Bird shell.
 * Previous revision of this file incorrectly contained CSS (duplicate of referral-system.css).
 * This placeholder keeps the script load from throwing a syntax error until a real
 * implementation is restored. Styles live in css/referral-system.css.
 */
(function () {
  function initReferralSystem() {
    console.warn(
      '[referral-system] Placeholder module loaded. CSS is available; JS behavior is not implemented yet.'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReferralSystem);
  } else {
    initReferralSystem();
  }

  window.initReferralSystem = initReferralSystem;
})();
