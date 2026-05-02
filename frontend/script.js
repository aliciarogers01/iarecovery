const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const year = document.querySelector('#year');
const form = document.querySelector('#recovery-form');
const statusEl = document.querySelector('#form-status');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (form && statusEl) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());
    statusEl.textContent = 'Submitting request...';

    try {
      const response = await fetch('/api/recovery-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      statusEl.textContent = 'Request submitted. A representative will review it and follow up.';
    } catch (error) {
      statusEl.textContent = 'The website form is not connected yet. Please contact the office directly for now.';
    }
  });
}
