const AppRouter = (() => {
  function applySettings() {
    const settings = StorageModule.getSettings();

    document.getElementById('heroTitle').innerText = settings.heroTitle;
    document.getElementById('heroSubtitle').innerText = settings.heroSubtitle;

    document.getElementById('footerEmail').innerText = settings.email;
    document.getElementById('footerEmail').href = `mailto:${settings.email}`;

    document.getElementById('footerPhone').innerText = settings.phone;
    document.getElementById('footerPhone').href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;

    document.getElementById('footerHandle').innerText = settings.socialHandle;

    document.getElementById('floatingPhone').href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    document.getElementById('floatingWhatsapp').href = `https://wa.me/${settings.whatsapp}?text=Hey,%20I%20am%20looking%20for%20Event%20services.`;
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navContainer = document.querySelector('.nav-container');
    const navItems = document.querySelectorAll('.nav-item');

    if (!menuToggle || !navLinks || !navContainer) return;

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      navContainer.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuToggle.querySelector('i').className = isOpen ? 'fa fa-times' : 'fa fa-bars';
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navContainer.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open navigation menu');
          menuToggle.querySelector('i').className = 'fa fa-bars';
        }
      });
    });
  }

  function handleRoute() {
    const hash = window.location.hash;
    const mainView = document.getElementById('mainWebsiteView');
    const adminView = document.getElementById('adminContainer');

    if (hash === '#admin') {
      mainView.style.display = 'none';
      adminView.style.display = 'block';

      if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        AdminModule.showDashboard();
      } else {
        AdminModule.showLogin();
      }
    } else {
      adminView.style.display = 'none';
      mainView.style.display = 'block';
    }
  }

  function initInquiryForm() {
    const form = document.getElementById('weddingInquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const settings = StorageModule.getSettings();

      const name = document.getElementById('clientName').value.trim();
      const number = document.getElementById('clientNumber').value.trim();
      const date = document.getElementById('weddingDate').value.trim();
      const moreInfo = document.getElementById('moreInfo').value.trim();

      const inquiries = StorageModule.getInquiries();
      inquiries.unshift({ name, phone: number, date: date || 'Not specified', moreInfo: moreInfo || 'N/A' });
      StorageModule.saveInquiries(inquiries);

      const text = `Hey, I am looking for event planning services.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(number)}%0A*Event Date:* ${encodeURIComponent(date || 'Not specified')}%0A*Requirements:* ${encodeURIComponent(moreInfo || 'N/A')}`;
      window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
    });
  }

  return {
    init: () => {
      applySettings();
      initMobileMenu();
      ServicesModule.init();
      GalleryModule.init();
      EstimatorModule.init();
      ReviewsModule.init();
      AdminModule.init();
      initInquiryForm();

      window.addEventListener('hashchange', handleRoute);
      handleRoute();
    },
    applySettings
  };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  AppRouter.init();
});