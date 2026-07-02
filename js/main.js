// ===================================================
// VAMOS COLLECTIVE — Shared Site Script
// ===================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after clicking a link (mobile)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Contact form submission ---------- */
  // This form uses Formspree (a free service — 50 submissions/month on the
  // free plan) so messages land in your inbox without needing your own backend.
  //
  // TO ACTIVATE:
  // 1. Go to https://formspree.io and sign up free with your startup Gmail.
  // 2. Create a new form, and copy the endpoint it gives you
  //    (looks like: https://formspree.io/f/abc123xy)
  // 3. Paste that endpoint below, replacing YOUR_FORMSPREE_ENDPOINT.
  // Until you do this, the form will show a friendly message instead of
  // silently failing.
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT';

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = document.getElementById('form-status');
      var submitBtn = contactForm.querySelector('button[type="submit"]');

      if (FORMSPREE_ENDPOINT.indexOf('YOUR_FORMSPREE_ENDPOINT') !== -1) {
        statusEl.textContent = 'Form not connected yet — see js/main.js for the 2-minute Formspree setup.';
        statusEl.className = 'form-status error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function (response) {
          if (response.ok) {
            statusEl.textContent = "Message sent — we'll get back to you soon.";
            statusEl.className = 'form-status success';
            contactForm.reset();
          } else {
            statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
            statusEl.className = 'form-status error';
          }
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
          statusEl.className = 'form-status error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  /* ---------- Placeholder Google Form buttons ---------- */
  // The "Find a Tutor" intake form link hasn't been created yet. This keeps
  // the button from doing nothing silently — replace the href in
  // find-a-tutor.html once you have a real Google Form link.
  document.querySelectorAll('[data-placeholder-link="true"]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Add your Google Form link in find-a-tutor.html to activate this button.');
    });
  });

});
