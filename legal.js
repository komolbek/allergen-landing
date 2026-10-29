// Shows one language: ?lang= → saved choice from the landing → browser language → en.
(function () {
  var langs = ['ru', 'uz', 'en'];
  var q = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var nav = (navigator.language || '').slice(0, 2).toLowerCase();
  var lang = [q, saved, nav].filter(function (l) { return langs.indexOf(l) >= 0; })[0] || 'en';
  document.documentElement.classList.add('js');
  document.documentElement.lang = lang;
  var art = document.querySelector('article[data-lang="' + lang + '"]');
  art.classList.add('on');
  document.title = art.querySelector('h1').textContent + ' — Allergen Diary';
  document.querySelectorAll('.langs a').forEach(function (a) {
    if (a.getAttribute('data-l') === lang) a.setAttribute('aria-current', 'true');
  });
  document.querySelectorAll('a[data-keep-lang]').forEach(function (a) {
    a.href = a.getAttribute('href') + '?lang=' + lang;
  });
})();
