const AdminModule = (() => {
  function initAuth() {
    const loginForm = document.getElementById('adminLoginForm');
    const errorMsg = document.getElementById('loginErrorMsg');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('adminUser').value.trim();
      const pass = document.getElementById('adminPass').value.trim();

      if (user === 'Admin@1' && pass === 'Admin@1') {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        errorMsg.style.display = 'none';
        loginForm.reset();
        showDashboard();
      } else {
        errorMsg.style.display = 'block';
      }
    });

    document.getElementById('btnAdminLogout').onclick = () => {
      sessionStorage.removeItem('isAdminLoggedIn');
      showLogin();
    };

    document.getElementById('btnBackToSite').onclick = () => { window.location.hash = '#home'; };
    document.getElementById('btnViewLiveSite').onclick = () => { window.location.hash = '#home'; };
  }

  function showDashboard() {
    document.getElementById('adminLoginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';

    const settings = StorageModule.getSettings();
    document.getElementById('editHeroTitle').value = settings.heroTitle;
    document.getElementById('editHeroSubtitle').value = settings.heroSubtitle;
    document.getElementById('editPhone').value = settings.phone;
    document.getElementById('editWhatsapp').value = settings.whatsapp;
    document.getElementById('editEmail').value = settings.email;
    document.getElementById('editSocialHandle').value = settings.socialHandle;
    document.getElementById('estimatorWeddingRate').value = settings.estimatorRates.perGuest.wedding;
    document.getElementById('estimatorPreweddingRate').value = settings.estimatorRates.perGuest.prewedding;
    document.getElementById('estimatorBirthdayRate').value = settings.estimatorRates.perGuest.birthday;
    document.getElementById('estimatorDecorCost').value = settings.estimatorRates.fixedCost.decor;
    document.getElementById('estimatorPhotoCost').value = settings.estimatorRates.fixedCost.photo;
    document.getElementById('estimatorDjCost').value = settings.estimatorRates.fixedCost.dj;
    document.getElementById('estimatorCoordinationCost').value = settings.estimatorRates.fixedCost.coordination;
    document.getElementById('estimatorRangePercent').value = settings.estimatorRates.highRangePercent;

    renderAdminGallery();
    renderAdminBirthdays();
    renderAdminReviews();
    renderAdminInquiries();
  }

  function showLogin() {
    document.getElementById('adminLoginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
  }

  function initTabs() {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }

  // Portfolio Photos
  function initPortfolioForm() {
    document.getElementById('addImageForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('newImageCategory').value;
      const urlInput = document.getElementById('newImageUrl').value.trim();
      const fileInput = document.getElementById('newImageFile').files[0];

      if (fileInput) {
        const reader = new FileReader();
        reader.onload = (evt) => saveImage(category, evt.target.result);
        reader.readAsDataURL(fileInput);
      } else if (urlInput) {
        saveImage(category, urlInput);
      } else {
        alert('Please upload an image file or provide an image URL.');
      }
    });
  }

  function saveImage(category, url) {
    const gallery = StorageModule.getGallery();
    gallery.unshift({ id: Date.now(), category, url });
    StorageModule.saveGallery(gallery);

    GalleryModule.render();
    renderAdminGallery();
    document.getElementById('addImageForm').reset();
    alert('Portfolio image added successfully!');
  }

  function renderAdminGallery() {
    const list = document.getElementById('adminGalleryList');
    list.innerHTML = '';
    const gallery = StorageModule.getGallery();

    gallery.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = 'admin-photo-card';
      card.innerHTML = `
        <span class="admin-photo-badge">${StorageModule.escapeHtml(img.category)}</span>
        <img src="${img.url}" alt="Portfolio">
        <button class="admin-photo-del" onclick="AdminModule.deleteGalleryImage(${idx})">Delete</button>
      `;
      list.appendChild(card);
    });
  }

  function deleteGalleryImage(index) {
    if (confirm('Delete this image from the portfolio?')) {
      const gallery = StorageModule.getGallery();
      gallery.splice(index, 1);
      StorageModule.saveGallery(gallery);
      GalleryModule.render();
      renderAdminGallery();
    }
  }

  // Birthday Services CRUD
  function initBirthdayForm() {
    const form = document.getElementById('birthdayServiceForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('editBirthdayServiceId').value;
      const title = document.getElementById('bdayTitle').value.trim();
      const shortDesc = document.getElementById('bdayShortDesc').value.trim();
      const detailedDesc = document.getElementById('bdayDetailedDesc').value.trim();

      const services = StorageModule.getBirthdayServices();

      if (editId) {
        const target = services.find(s => s.id === editId);
        if (target) {
          target.title = title;
          target.shortDesc = shortDesc;
          target.detailedDesc = detailedDesc;
        }
      } else {
        services.push({ id: 'bday-' + Date.now(), title, shortDesc, detailedDesc });
      }

      StorageModule.saveBirthdayServices(services);
      ServicesModule.renderBirthdays();
      renderAdminBirthdays();
      resetBirthdayForm();
      alert('Birthday service saved successfully!');
    });

    document.getElementById('bdayCancelEditBtn').onclick = resetBirthdayForm;
  }

  function renderAdminBirthdays() {
    const list = document.getElementById('adminBirthdayList');
    list.innerHTML = '';
    const services = StorageModule.getBirthdayServices();

    services.forEach(s => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${StorageModule.escapeHtml(s.title)}</strong>
          <p style="font-size:12px; color:#666;">${StorageModule.escapeHtml(s.shortDesc)}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn-edit" onclick="AdminModule.editBirthdayService('${s.id}')">Edit</button>
          <button class="admin-delete-btn" onclick="AdminModule.deleteBirthdayService('${s.id}')">Delete</button>
        </div>
      `;
      list.appendChild(box);
    });
  }

  function editBirthdayService(id) {
    const services = StorageModule.getBirthdayServices();
    const service = services.find(s => s.id === id);
    if (!service) return;

    document.getElementById('editBirthdayServiceId').value = service.id;
    document.getElementById('bdayTitle').value = service.title;
    document.getElementById('bdayShortDesc').value = service.shortDesc;
    document.getElementById('bdayDetailedDesc').value = service.detailedDesc;

    document.getElementById('birthdayFormHeading').innerText = 'Edit Birthday Service';
    document.getElementById('bdaySubmitBtn').innerText = 'Save Changes';
    document.getElementById('bdayCancelEditBtn').style.display = 'block';
  }

  function resetBirthdayForm() {
    document.getElementById('editBirthdayServiceId').value = '';
    document.getElementById('birthdayServiceForm').reset();
    document.getElementById('birthdayFormHeading').innerText = 'Add New Birthday Service';
    document.getElementById('bdaySubmitBtn').innerText = 'Add Service';
    document.getElementById('bdayCancelEditBtn').style.display = 'none';
  }

  function deleteBirthdayService(id) {
    if (confirm('Delete this birthday service?')) {
      let services = StorageModule.getBirthdayServices();
      services = services.filter(s => s.id !== id);
      StorageModule.saveBirthdayServices(services);
      ServicesModule.renderBirthdays();
      renderAdminBirthdays();
    }
  }

  // General Settings
  function initSettingsForm() {
    document.getElementById('editContentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        heroTitle: document.getElementById('editHeroTitle').value,
        heroSubtitle: document.getElementById('editHeroSubtitle').value,
        phone: document.getElementById('editPhone').value,
        whatsapp: document.getElementById('editWhatsapp').value,
        email: document.getElementById('editEmail').value,
        socialHandle: document.getElementById('editSocialHandle').value,
        estimatorRates: {
          perGuest: {
            wedding: Number(document.getElementById('estimatorWeddingRate').value),
            prewedding: Number(document.getElementById('estimatorPreweddingRate').value),
            birthday: Number(document.getElementById('estimatorBirthdayRate').value)
          },
          fixedCost: {
            decor: Number(document.getElementById('estimatorDecorCost').value),
            photo: Number(document.getElementById('estimatorPhotoCost').value),
            dj: Number(document.getElementById('estimatorDjCost').value),
            coordination: Number(document.getElementById('estimatorCoordinationCost').value)
          },
          highRangePercent: Number(document.getElementById('estimatorRangePercent').value)
        }
      };

      StorageModule.saveSettings(updated);
      AppRouter.applySettings();
      EstimatorModule.refresh();
      alert('Settings updated successfully!');
    });
  }

  function renderAdminReviews() {
    const list = document.getElementById('adminReviewsList');
    list.innerHTML = '';
    const reviews = StorageModule.getReviews();

    reviews.forEach((rev, idx) => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${StorageModule.escapeHtml(rev.author)} (${StorageModule.escapeHtml(rev.city)}) - ${rev.rating}⭐</strong>
          <p style="font-size:12px; color:#666;">${StorageModule.escapeHtml(rev.comment)}</p>
        </div>
        <button class="admin-delete-btn" onclick="AdminModule.deleteReview(${idx})">Delete</button>
      `;
      list.appendChild(box);
    });
  }

  function deleteReview(index) {
    if (confirm('Delete this review?')) {
      const reviews = StorageModule.getReviews();
      reviews.splice(index, 1);
      StorageModule.saveReviews(reviews);
      ReviewsModule.render();
      renderAdminReviews();
    }
  }

  function renderAdminInquiries() {
    const list = document.getElementById('adminInquiriesList');
    list.innerHTML = '';
    const inquiries = StorageModule.getInquiries();

    if (inquiries.length === 0) {
      list.innerHTML = '<p style="font-size:13px; color:#888;">No inquiries received yet.</p>';
      return;
    }

    inquiries.forEach(inq => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${StorageModule.escapeHtml(inq.name)} - ${StorageModule.escapeHtml(inq.phone)}</strong>
          <p style="font-size:12px; color:#666;">Date: ${StorageModule.escapeHtml(inq.date)} | Info: ${StorageModule.escapeHtml(inq.moreInfo)}</p>
        </div>
      `;
      list.appendChild(box);
    });
  }

  return {
    init: () => {
      initAuth();
      initTabs();
      initPortfolioForm();
      initBirthdayForm();
      initSettingsForm();
    },
    showDashboard,
    showLogin,
    deleteGalleryImage,
    editBirthdayService,
    deleteBirthdayService,
    resetBirthdayForm,
    deleteReview
  };
})();