// Public website analytics only. Never pass enquiry or chat data to Meta.
(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = true;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

// Explicit events only; automatic form/button detection and matching stay off.
fbq('set', 'autoConfig', false, '1058832506994750');
fbq('init', '1058832506994750');
fbq('track', 'PageView');

window.trackSolankiLead = function () {
  try { fbq('track', 'Lead'); } catch (_) { /* Analytics must not interrupt chat. */ }
};
