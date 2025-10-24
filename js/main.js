document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (btn) {
    btn.addEventListener('click', function () {
      if (nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }
  var path = window.location.pathname.toLowerCase();
  var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (el) {
    var href = el.getAttribute('href');
    if (!href) return;
    var hrefFile = href.split('/').pop().toLowerCase();
    if (hrefFile === file || (file.startsWith(hrefFile.replace('.html', '')) && hrefFile.indexOf('_ru') === -1 && file.indexOf('_ru') === -1)) {
      el.classList.add('active');
    }
  });
  var isRu = file.indexOf('_ru') !== -1;
  document.querySelectorAll('.lang-switch a').forEach(function (el) {
    var href = el.getAttribute('href') || '';
    if (isRu && href.indexOf('_ru') !== -1) el.classList.add('active');
    if (!isRu && href.indexOf('_ru') === -1) el.classList.add('active');
  });
  var counters = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && counters.length) {
    var started = false;
    var obs = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(function (el) {
            animateCount(el, parseInt(el.getAttribute('data-target') || '0', 10));
          });
          observer.disconnect();
        }
      });
    }, {threshold: 0.4});
    obs.observe(counters[0]);
  } else {
    counters.forEach(function (el) {
      animateCount(el, parseInt(el.getAttribute('data-target') || '0', 10));
    });
  }
});
function animateCount(el, target) {
  var duration = 1200;
  var start = 0;
  var startTime = null;
  var unit = el.getAttribute('data-unit') || '';
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var value = Math.floor(progress * (target - start) + start);
    el.textContent = value.toLocaleString() + (unit ? unit : '');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString() + (unit ? unit : '');
    }
  }
  window.requestAnimationFrame(step);
}
function fakeSubmit(e) {
  e.preventDefault();
  alert('Хабарлама алынды. Рақмет!');
  return false;
}
