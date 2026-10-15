const AppRouter = (() => {
  function applySettings() {
    const settings = StorageModule.getSettings();

    const heroTitleEl = document.getElementById('heroTitle');
    if (heroTitleEl) heroTitleEl.innerText = settings.heroTitle;

    const heroSubtitleEl = document.getElementById('heroSubtitle');
    if (heroSubtitleEl) heroSubtitleEl.innerText = settings.heroSubtitle;

    const footerEmailEl = document.getElementById('footerEmail');
    if (footerEmailEl) {
      footerEmailEl.innerHTML = `<i class="fa-solid fa-envelope" aria-hidden="true"></i> ${StorageModule.escapeHtml(settings.email)}`;
      footerEmailEl.href = `mailto:${settings.email}`;
    }

    const footerPhoneEl = document.getElementById('footerPhone');
    if (footerPhoneEl) {
      footerPhoneEl.innerHTML = `<i class="fa-solid fa-phone" aria-hidden="true"></i> ${StorageModule.escapeHtml(settings.phone)} <span class="contact-tag">Call Only</span>`;
      footerPhoneEl.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    }

    const phone2El = document.getElementById('footerPhone2');
    if (phone2El) {
      const p2 = settings.phone2 || '+91 88375 31768';
      phone2El.innerHTML = `<i class="fa-solid fa-phone" aria-hidden="true"></i> ${StorageModule.escapeHtml(p2)} <span class="contact-tag">Call</span>`;
      phone2El.href = `tel:${p2.replace(/[^0-9+]/g, '')}`;
    }

    const footerWhatsappEl = document.getElementById('footerWhatsapp');
    if (footerWhatsappEl) {
      footerWhatsappEl.innerHTML = `<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> +91 88375 31768 <span class="contact-tag-wa">WhatsApp Only</span>`;
      footerWhatsappEl.href = `https://wa.me/${settings.whatsapp}`;
    }

    const footerYearEl = document.getElementById('footerYear');
    if (footerYearEl) footerYearEl.innerText = new Date().getFullYear();

    const floatingPhoneEl = document.getElementById('floatingPhone');
    if (floatingPhoneEl) floatingPhoneEl.href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;

    const floatingWhatsappEl = document.getElementById('floatingWhatsapp');
    if (floatingWhatsappEl) floatingWhatsappEl.href = `https://wa.me/${settings.whatsapp}?text=Hey,%20I%20am%20looking%20for%20Event%20services.`;
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
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = isOpen ? 'fa fa-times' : 'fa fa-bars';
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          navContainer.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open navigation menu');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fa fa-bars';
        }
      });
    });
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

  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other open items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  return {
    init: () => {
      applySettings();
      initMobileMenu();
      ServicesModule.init();
      GalleryModule.init();
      ReviewsModule.init();
      initInquiryForm();
      initFaqAccordion();
    },
    applySettings
  };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  AppRouter.init();
});