// Let new visitors see useful details and contact the team before giving a profile.
(() => {
  const entry = document.querySelector('#entry-panel');
  const opener = document.querySelector('#web-enquiry-open');
  const welcome = document.querySelector('.welcome-message');
  const date = document.querySelector('.date-chip');
  const reminders = gate.nextElementSibling;
  function syncEntry() {
    const saved = Boolean(profile && gate.hidden);
    entry.hidden = saved;
    document.querySelector('.client-hub')?.toggleAttribute('hidden', !saved);
    if (saved) {
      welcome.hidden = false;
      date.hidden = false;
      reminders.hidden = false;
      chatForm.hidden = false;
    }
  }
  if (!profile) {
    gate.hidden = true;
    welcome.hidden = true;
    date.hidden = true;
    reminders.hidden = true;
    chatForm.hidden = true;
  }
  opener.addEventListener('click', () => {
    gate.hidden = false;
    welcome.hidden = false;
    reminders.hidden = false;
    opener.setAttribute('aria-expanded', 'true');
    gate.scrollIntoView({ behavior: 'smooth', block: 'start' });
    gate.elements.name.focus({ preventScroll: true });
  });
  new MutationObserver(syncEntry).observe(gate, { attributes: true, attributeFilter: ['hidden'] });
  syncEntry();
  document.querySelectorAll('[data-contact-channel]').forEach(link => {
    link.addEventListener('click', () => {
      // A click is intent, not a sent WhatsApp message or a captured lead.
      try { window.fbq?.('trackCustom', 'ContactIntent', { channel: link.dataset.contactChannel }); } catch {}
    });
  });
})();
