
(function () {
  const menuButton = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  const monthly = document.querySelector('[data-billing="monthly"]');
  const annual = document.querySelector('[data-billing="annual"]');
  const amount = document.querySelector('[data-price]');
  const cadence = document.querySelector('[data-cadence]');
  const annualNote = document.querySelector('[data-annual-note]');
  function setBilling(mode) {
    if (!monthly || !annual || !amount || !cadence) return;
    const isAnnual = mode === 'annual';
    monthly.classList.toggle('active', !isAnnual);
    annual.classList.toggle('active', isAnnual);
    amount.textContent = isAnnual ? '$350' : '$35';
    cadence.textContent = isAnnual ? '/year' : '/month';
    if (annualNote) annualNote.textContent = isAnnual ? 'Save $70 compared with monthly billing.' : 'Cancel anytime. Access continues through the paid period.';
  }
  if (monthly && annual) {
    monthly.addEventListener('click', () => setBilling('monthly'));
    annual.addEventListener('click', () => setBilling('annual'));
    setBilling('annual');
  }

  const banner = document.querySelector('.cookie-banner');
  const accept = document.querySelector('[data-cookie-accept]');
  const reject = document.querySelector('[data-cookie-reject]');
  const choice = localStorage.getItem('bonvanta_cookie_choice');
  function loadAnalytics() {
    const gaId = window.BONVANTA_GA_ID;
    if (!gaId || gaId === 'G-XXXXXXXXXX') return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true });
  }
  if (!choice && banner) banner.classList.add('show');
  if (choice === 'analytics') loadAnalytics();
  if (accept) accept.addEventListener('click', function () {
    localStorage.setItem('bonvanta_cookie_choice', 'analytics');
    banner.classList.remove('show');
    loadAnalytics();
  });
  if (reject) reject.addEventListener('click', function () {
    localStorage.setItem('bonvanta_cookie_choice', 'essential');
    banner.classList.remove('show');
  });
})();
