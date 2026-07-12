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

  const strings = {
    en: { month: '/month', year: '/year', annual: 'Save $70 compared with monthly billing.', monthly: 'Cancel anytime. Access continues through the paid period.' },
    de: { month: '/Monat', year: '/Jahr', annual: 'Sie sparen 70 $ gegenüber monatlicher Abrechnung.', monthly: 'Jederzeit kündbar. Der Zugang bleibt bis zum Ende des bezahlten Zeitraums aktiv.' },
    es: { month: '/mes', year: '/año', annual: 'Ahorra 70 $ frente a la facturación mensual.', monthly: 'Cancela cuando quieras. El acceso continúa hasta el final del periodo pagado.' },
    fr: { month: '/mois', year: '/an', annual: 'Économisez 70 $ par rapport à la facturation mensuelle.', monthly: 'Résiliez à tout moment. L’accès reste actif jusqu’à la fin de la période payée.' }
  };
  const lang = (document.documentElement.lang || 'en').slice(0,2);
  const s = strings[lang] || strings.en;
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
    cadence.textContent = isAnnual ? s.year : s.month;
    if (annualNote) annualNote.textContent = isAnnual ? s.annual : s.monthly;
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
  function updateConsent(granted) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
    gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }
  if (!choice && banner) banner.classList.add('show');
  if (choice === 'analytics') updateConsent(true);
  if (choice === 'essential') updateConsent(false);
  if (accept) accept.addEventListener('click', function () {
    localStorage.setItem('bonvanta_cookie_choice', 'analytics');
    if (banner) banner.classList.remove('show');
    updateConsent(true);
  });
  if (reject) reject.addEventListener('click', function () {
    localStorage.setItem('bonvanta_cookie_choice', 'essential');
    if (banner) banner.classList.remove('show');
    updateConsent(false);
  });
})();
