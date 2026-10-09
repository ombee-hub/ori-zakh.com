// Ori Zakh — cookie notice. Loaded on the home page only; shown until the visitor makes a choice.
(function () {
  var KEY = 'oz-cookie-consent';
  try { if (localStorage.getItem(KEY)) return; } catch (e) { /* storage blocked: show the notice */ }

  function build() {
    var box = document.createElement('section');
    box.className = 'cookie-banner';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie notice');
    box.innerHTML =
      '<h2>We use cookies</h2>' +
      '<p>This site uses essential browser storage and third-party services (Google Fonts, YouTube) to work properly and to improve your experience. ' +
      'Read more in our <a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-actions">' +
        '<button class="cookie-accept">Accept</button>' +
        '<button class="cookie-decline">Essential only</button>' +
      '</div>';
    document.body.appendChild(box);
    document.body.classList.add('has-cookie-banner');
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('show'); }); });

    function choose(value) {
      try { localStorage.setItem(KEY, JSON.stringify({ choice: value, date: new Date().toISOString() })); } catch (e) {}
      box.classList.remove('show');
      document.body.classList.remove('has-cookie-banner');
      setTimeout(function () { box.remove(); }, 400);
    }
    box.querySelector('.cookie-accept').addEventListener('click', function () { choose('all'); });
    box.querySelector('.cookie-decline').addEventListener('click', function () { choose('essential'); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
