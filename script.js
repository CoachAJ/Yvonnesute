// ============================================================
// 4ABETTERU2 WELLNESS — interactions
// ============================================================

// Photo placeholders: when an image is missing, show the labeled frame
function markEmpty(img) {
  img.style.display = 'none';
  img.parentElement.classList.add('is-empty');
}

document.addEventListener('DOMContentLoaded', function () {
  // Current year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Newsletter (front-end only demo)
  var form = document.getElementById('nlForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('nlMsg');
      var email = document.getElementById('nlEmail');
      if (email && email.value) {
        msg.textContent = 'Thanks for submitting! 🌿';
        form.reset();
      }
    });
  }
});
