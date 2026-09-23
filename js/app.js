/**
 * App Main Controller: Handles client routing, settings dispatch & inquiries
 */
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
    document.getElementById('floatingWhatsapp').href = `https://wa.me/${settings.whatsapp}?text=Hey,%20I%20am%20looking%20for%20wedding%20services.`;
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
    document.getElementById('weddingInquiryForm').addEventListener('submit', (e) => {
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

  function exitAdmin() {
    window.location.hash = '#home';
  }

  return {
    init: () => {
      applySettings();
      ServicesModule.init();
      GalleryModule.init();
      EstimatorModule.init();
      ReviewsModule.init();
      AdminModule.init();
      initInquiryForm();

      window.addEventListener('hashchange', handleRoute);
      handleRoute();
    },
    applySettings,
    exitAdmin
  };
})();

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  AppRouter.init();
});