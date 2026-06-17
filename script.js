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

  // Booking Form Handling
  var bookingForm = document.getElementById('bookingForm');
  var formSuccess = document.getElementById('formSuccess');
  
  if (bookingForm) {
    // Set minimum date to today
    var dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
    
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Show loading state
      var submitBtn = bookingForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      var formData = new FormData(bookingForm);
      
      // Submit to Netlify
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function () {
        // Show success message
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function (error) {
        alert('There was an error submitting your form. Please try again or contact us directly.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});

// Reset form function (global scope for onclick)
function resetForm() {
  var bookingForm = document.getElementById('bookingForm');
  var formSuccess = document.getElementById('formSuccess');
  
  if (bookingForm && formSuccess) {
    bookingForm.reset();
    formSuccess.style.display = 'none';
    bookingForm.style.display = 'flex';
    bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset button state
    var submitBtn = bookingForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Request My Free Consultation →';
      submitBtn.disabled = false;
    }
  }
}
