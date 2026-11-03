// Small enhancements for the site. Every page works without this file.
(function () {
  var root = document.documentElement;

  // ---- 1. Light/dark theme toggle -----------------------------------------
  // The chosen theme is stored in this browser only; with no stored choice the
  // page follows the operating-system setting. (A one-line script in each
  // page's <head> applies the stored choice before first paint, so there is
  // no flash of the wrong theme.)
  var button = document.querySelector('.theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var themeMeta = document.querySelector('meta[name="theme-color"]:not([media])');

  function current() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return systemDark.matches ? 'dark' : 'light';
  }
  function sync() {
    var next = current() === 'dark' ? 'light' : 'dark';
    if (button) {
      button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
      button.title = 'Switch to ' + next + ' mode';
    }
    // Keep the mobile browser chrome in step with the page background.
    if (themeMeta) themeMeta.content = getComputedStyle(document.body).backgroundColor;
  }
  if (button) {
    button.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }
  if (systemDark.addEventListener) systemDark.addEventListener('change', sync);
  sync();

  // ---- 2. Copy-email button -------------------------------------------------
  // The address is shown as "user (at) domain" to deter scrapers; the button
  // assembles the real address and copies it.
  document.querySelectorAll('.copy-btn[data-user]').forEach(function (btn) {
    if (!navigator.clipboard) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var addr = btn.getAttribute('data-user') + '@' + btn.getAttribute('data-domain');
      navigator.clipboard.writeText(addr).then(function () {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      });
    });
  });

  // ---- 3. Instant navigation fallback --------------------------------------
  // Chrome and Edge prerender a page as soon as you hover its link (see the
  // <script type="speculationrules"> block in each page). For other browsers,
  // prefetch the HTML on hover/touch so the click is served from cache.
  var supportsRules = HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules');
  if (supportsRules) return;
  var done = {};
  function warm(e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.origin !== location.origin || !/\.html$|\/$/.test(a.pathname)) return;
    if (a.pathname === location.pathname || done[a.pathname]) return;
    done[a.pathname] = true;
    var l = document.createElement('link');
    l.rel = 'prefetch'; l.href = a.pathname;
    document.head.appendChild(l);
  }
  document.addEventListener('mouseover', warm, { passive: true });
  document.addEventListener('touchstart', warm, { passive: true });
  document.addEventListener('focusin', warm);
})();
