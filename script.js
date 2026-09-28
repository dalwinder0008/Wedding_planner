document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DEFAULT INITIAL DATA & STORAGE[cite: 3, 4, 5]
  // ==========================================
  const defaultSettings = {
    heroTitle: "Complete Your Dream For The Best Wedding",
    heroSubtitle: "Leave the planning stress to us. Creating unforgettable memories for your special day is our utmost commitment.",
    phone: "+91 98887 13224",
    whatsapp: "919888713224",
    email: "dalwinderkarnawal1322@gmail.com",
    socialHandle: "@grandeventsindia"
  };

  const defaultBirthdayServices = [
    {
      id: "bday-1",
      title: "Concept, Theme & Decor",
      shortDesc: "Jungle Safari, Superhero, Retro, Neon/Glow, and Minimalist themes. Organic balloon arches, plinths, and customized backdrop styling.",
      detailedDesc: "Customized theme backdrops, pastel balloon arches, neon sign boards, plinths/pedestals, cut-outs, and curated cake table centerpieces."
    },
    {
      id: "bday-2",
      title: "Venue & Gourmet Catering",
      shortDesc: "Lawn, poolside, banquet hall, or farmhouse reservations, customized designer theme cakes, and kid-friendly live snack counters.",
      detailedDesc: "Venue booking and layout design, designer fondant multi-tier cake, finger foods, pizza, pasta, popcorn, and cotton candy live counters."
    },
    {
      id: "bday-3",
      title: "Entertainment & Activities",
      shortDesc: "Energetic event emcee/anchor, interactive magic shows, cartoon mascots, balloon twisting artists, face painters, and party games.",
      detailedDesc: "Professional games emcee, certified magician, Disney/Marvel mascot characters, face painting, temporary tattoo artists, and return gift curation."
    },
    {
      id: "bday-4",
      title: "Photography & Party Flow",
      shortDesc: "Candid birthday photography, short reels coverage, and scheduled coordination so parents can enjoy the party worry-free.",
      detailedDesc: "Candid family and kids portraits, instant video reels, seamless cake cutting schedule, and hassle-free guest hospitality."
    }
  ];

  const defaultGallery = [
    { id: 1, category: "wedding", url: "public/g-entry.webp" },
    { id: 2, category: "wedding", url: "public/luxury-wedding-car-baraat-arrival-ecr-chennai-gallery_section-9-1.jpg" },
    { id: 3, category: "haldi", url: "public/Indian-bridal-makeup-looks-2.jpg" },
    { id: 4, category: "sangeet", url: "public/dayofcoordination.jpg" },
    { id: 5, category: "birthday", url: "public/Brthday/concept,themeand%20decoration.jpg" },
    { id: 6, category: "wedding", url: "public/shooting.jpg" },
    { id: 7, category: "wedding", url: "public/foodandketringt.jpg" }
  ];

  const defaultReviews = [
    {
      id: 1,
      author: "Amanpreet & Simran",
      city: "Chandigarh",
      rating: 5,
      comment: "From the vibrant Haldi setup to the royal wedding reception, everything was executed flawlessly. Our guests could not stop praising the decor and catering!"
    },
    {
      id: 2,
      author: "Rohit & Ananya",
      city: "Delhi NCR",
      rating: 5,
      comment: "The baraat procession and DJ production were on another level! The coordination was so smooth that we truly enjoyed every second without any stress."
    },
    {
      id: 3,
      author: "Neha Sharma",
      city: "Ludhiana",
      rating: 5,
      comment: "We booked them for our son's 5th birthday with a Jungle Safari theme. The mascots and interactive games kept the kids thoroughly entertained. A 10/10 service!"
    }
  ];

  // Retrieve data from localStorage
  let currentSettings = JSON.parse(localStorage.getItem('grand_settings')) || defaultSettings;
  let currentBirthdayServices = JSON.parse(localStorage.getItem('grand_birthday_services')) || defaultBirthdayServices;
  let currentGallery = JSON.parse(localStorage.getItem('grand_gallery')) || defaultGallery;
  let currentReviews = JSON.parse(localStorage.getItem('grand_reviews')) || defaultReviews;
  let currentInquiries = JSON.parse(localStorage.getItem('grand_inquiries')) || [];

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ==========================================
  // 2. DOM RENDERING (CLIENT FRONTEND)[cite: 3, 4, 5]
  // ==========================================
  function applySettingsToDOM() {
    document.getElementById('heroTitle').innerText = currentSettings.heroTitle;
    document.getElementById('heroSubtitle').innerText = currentSettings.heroSubtitle;

    document.getElementById('footerEmail').innerText = currentSettings.email;
    document.getElementById('footerEmail').href = `mailto:${currentSettings.email}`;

    document.getElementById('footerPhone').innerText = currentSettings.phone;
    document.getElementById('footerPhone').href = `tel:${currentSettings.phone.replace(/[^0-9+]/g, '')}`;

    document.getElementById('footerHandle').innerText = currentSettings.socialHandle;

    document.getElementById('floatingPhone').href = `tel:${currentSettings.phone.replace(/[^0-9+]/g, '')}`;
    document.getElementById('floatingWhatsapp').href = `https://wa.me/${currentSettings.whatsapp}?text=Hey,%20I%20am%20looking%20for%20wedding%20services.`;
  }

  function renderBirthdayServices() {
    const grid = document.getElementById('birthdayServicesGrid');
    grid.innerHTML = '';
    currentBirthdayServices.forEach((service) => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div>
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.shortDesc)}</p>
        </div>
        <button class="open-modal-btn" onclick="openModal('${escapeHtml(service.title)}', '${escapeHtml(service.detailedDesc)}')">
          View Service Details <i class="fa fa-arrow-right"></i>
        </button>
      `;
      grid.appendChild(card);
    });
  }

  function renderGallery(activeCategory = 'all') {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    currentGallery.forEach(item => {
      if (activeCategory === 'all' || item.category === activeCategory) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.setAttribute('data-category', item.category);
        div.innerHTML = `<img src="${item.url}" alt="${escapeHtml(item.category)}">`;
        grid.appendChild(div);
      }
    });
  }

  function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';
    currentReviews.forEach(r => {
      let starHtml = '';
      for (let i = 0; i < r.rating; i++) {
        starHtml += '<i class="fa fa-star"></i>';
      }
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <div class="stars">${starHtml}</div>
        <p>"${escapeHtml(r.comment)}"</p>
        <span class="client-name serif-font">- ${escapeHtml(r.author)} (${escapeHtml(r.city)})</span>
      `;
      container.appendChild(card);
    });
  }

  // Initial Frontend Render
  applySettingsToDOM();
  renderBirthdayServices();
  renderGallery();
  renderReviews();

  // ==========================================
  // 3. ROUTING (#admin) & AUTH
  // ==========================================
  function handleRouting() {
    const hash = window.location.hash;
    const mainView = document.getElementById('mainWebsiteView');
    const adminContainer = document.getElementById('adminContainer');

    if (hash === '#admin') {
      mainView.style.display = 'none';
      adminContainer.style.display = 'block';

      if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminDashboard();
      } else {
        showAdminLogin();
      }
    } else {
      adminContainer.style.display = 'none';
      mainView.style.display = 'block';
    }
  }

  window.addEventListener('hashchange', handleRouting);
  handleRouting();

  window.exitAdmin = function() {
    window.location.hash = '#home';
  };

  const loginForm = document.getElementById('adminLoginForm');
  const loginErrorMsg = document.getElementById('loginErrorMsg');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();

    if (user === 'Admin@1' && pass === 'Admin@1') {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      loginErrorMsg.style.display = 'none';
      loginForm.reset();
      showAdminDashboard();
    } else {
      loginErrorMsg.style.display = 'block';
    }
  });

  function showAdminLogin() {
    document.getElementById('adminLoginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
  }

  function showAdminDashboard() {
    document.getElementById('adminLoginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';

    // Populate Settings Tab
    document.getElementById('editHeroTitle').value = currentSettings.heroTitle;
    document.getElementById('editHeroSubtitle').value = currentSettings.heroSubtitle;
    document.getElementById('editPhone').value = currentSettings.phone;
    document.getElementById('editWhatsapp').value = currentSettings.whatsapp;
    document.getElementById('editEmail').value = currentSettings.email;
    document.getElementById('editSocialHandle').value = currentSettings.socialHandle;

    renderAdminGalleryList();
    renderAdminBirthdayList();
    renderAdminReviewsList();
    renderAdminInquiriesList();
  }

  window.adminLogout = function() {
    sessionStorage.removeItem('isAdminLoggedIn');
    showAdminLogin();
  };

  // Tab Switching Inside Admin
  window.switchAdminTab = function(tabId) {
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
  };

  // ==========================================
  // 4. ADMIN: PORTFOLIO IMAGE MANAGEMENT[cite: 3]
  // ==========================================
  document.getElementById('addImageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('newImageCategory').value;
    const urlInput = document.getElementById('newImageUrl').value.trim();
    const fileInput = document.getElementById('newImageFile').files[0];

    if (fileInput) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        saveNewImage(category, evt.target.result);
      };
      reader.readAsDataURL(fileInput);
    } else if (urlInput) {
      saveNewImage(category, urlInput);
    } else {
      alert('Please upload an image file or provide a direct image URL.');
    }
  });

  function saveNewImage(category, finalUrl) {
    const newEntry = {
      id: Date.now(),
      category: category,
      url: finalUrl
    };

    currentGallery.unshift(newEntry);
    localStorage.setItem('grand_gallery', JSON.stringify(currentGallery));

    renderGallery();
    renderAdminGalleryList();
    document.getElementById('addImageForm').reset();
    alert('Portfolio image added successfully!');
  }

  function renderAdminGalleryList() {
    const list = document.getElementById('adminGalleryList');
    list.innerHTML = '';
    currentGallery.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = 'admin-photo-card';
      card.innerHTML = `
        <span class="admin-photo-badge">${escapeHtml(img.category)}</span>
        <img src="${img.url}" alt="Portfolio">
        <button class="admin-photo-del" onclick="deletePortfolioImage(${idx})">Delete</button>
      `;
      list.appendChild(card);
    });
  }

  window.deletePortfolioImage = function(index) {
    if (confirm('Are you sure you want to remove this image from the portfolio?')) {
      currentGallery.splice(index, 1);
      localStorage.setItem('grand_gallery', JSON.stringify(currentGallery));
      renderGallery();
      renderAdminGalleryList();
    }
  };

  // ==========================================
  // 5. ADMIN: BIRTHDAY PLANNER SERVICES CRUD[cite: 4]
  // ==========================================
  const birthdayForm = document.getElementById('birthdayServiceForm');

  birthdayForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editBirthdayServiceId').value;
    const title = document.getElementById('bdayTitle').value.trim();
    const shortDesc = document.getElementById('bdayShortDesc').value.trim();
    const detailedDesc = document.getElementById('bdayDetailedDesc').value.trim();

    if (editId) {
      // Update Existing
      const item = currentBirthdayServices.find(s => s.id === editId);
      if (item) {
        item.title = title;
        item.shortDesc = shortDesc;
        item.detailedDesc = detailedDesc;
      }
    } else {
      // Add New
      const newService = {
        id: 'bday-' + Date.now(),
        title,
        shortDesc,
        detailedDesc
      };
      currentBirthdayServices.push(newService);
    }

    localStorage.setItem('grand_birthday_services', JSON.stringify(currentBirthdayServices));
    renderBirthdayServices();
    renderAdminBirthdayList();
    resetBirthdayForm();
    alert('Birthday service saved successfully!');
  });

  function renderAdminBirthdayList() {
    const list = document.getElementById('adminBirthdayList');
    list.innerHTML = '';
    currentBirthdayServices.forEach((s) => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${escapeHtml(s.title)}</strong>
          <p style="font-size:12px; color:#666;">${escapeHtml(s.shortDesc)}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn-edit" onclick="editBirthdayService('${s.id}')">Edit</button>
          <button class="admin-delete-btn" onclick="deleteBirthdayService('${s.id}')">Delete</button>
        </div>
      `;
      list.appendChild(box);
    });
  }

  window.editBirthdayService = function(id) {
    const service = currentBirthdayServices.find(s => s.id === id);
    if (!service) return;

    document.getElementById('editBirthdayServiceId').value = service.id;
    document.getElementById('bdayTitle').value = service.title;
    document.getElementById('bdayShortDesc').value = service.shortDesc;
    document.getElementById('bdayDetailedDesc').value = service.detailedDesc;

    document.getElementById('birthdayFormHeading').innerText = 'Edit Birthday Service';
    document.getElementById('bdaySubmitBtn').innerText = 'Save Changes';
    document.getElementById('bdayCancelEditBtn').style.display = 'block';
  };

  window.resetBirthdayForm = function() {
    document.getElementById('editBirthdayServiceId').value = '';
    birthdayForm.reset();
    document.getElementById('birthdayFormHeading').innerText = 'Add New Birthday Service';
    document.getElementById('bdaySubmitBtn').innerText = 'Add Service';
    document.getElementById('bdayCancelEditBtn').style.display = 'none';
  };

  window.deleteBirthdayService = function(id) {
    if (confirm('Are you sure you want to delete this birthday service?')) {
      currentBirthdayServices = currentBirthdayServices.filter(s => s.id !== id);
      localStorage.setItem('grand_birthday_services', JSON.stringify(currentBirthdayServices));
      renderBirthdayServices();
      renderAdminBirthdayList();
    }
  };

  // ==========================================
  // 6. ADMIN: GENERAL SETTINGS & FOOTER[cite: 1, 5]
  // ==========================================
  document.getElementById('editContentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    currentSettings.heroTitle = document.getElementById('editHeroTitle').value;
    currentSettings.heroSubtitle = document.getElementById('editHeroSubtitle').value;
    currentSettings.phone = document.getElementById('editPhone').value;
    currentSettings.whatsapp = document.getElementById('editWhatsapp').value;
    currentSettings.email = document.getElementById('editEmail').value;
    currentSettings.socialHandle = document.getElementById('editSocialHandle').value;

    localStorage.setItem('grand_settings', JSON.stringify(currentSettings));
    applySettingsToDOM();
    alert('Website and Footer details updated successfully!');
  });

  // Admin Reviews & Inquiries
  function renderAdminReviewsList() {
    const list = document.getElementById('adminReviewsList');
    list.innerHTML = '';
    if (currentReviews.length === 0) {
      list.innerHTML = '<p style="font-size:13px; color:#888;">No reviews available.</p>';
      return;
    }
    currentReviews.forEach((rev, idx) => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${escapeHtml(rev.author)} (${escapeHtml(rev.city)}) - ${rev.rating}⭐</strong>
          <p style="font-size:12px; color:#666;">${escapeHtml(rev.comment)}</p>
        </div>
        <button class="admin-delete-btn" onclick="deleteReview(${idx})">Delete</button>
      `;
      list.appendChild(box);
    });
  }

  window.deleteReview = function(index) {
    if (confirm('Delete this client review?')) {
      currentReviews.splice(index, 1);
      localStorage.setItem('grand_reviews', JSON.stringify(currentReviews));
      renderReviews();
      renderAdminReviewsList();
    }
  };

  function renderAdminInquiriesList() {
    const list = document.getElementById('adminInquiriesList');
    list.innerHTML = '';
    if (currentInquiries.length === 0) {
      list.innerHTML = '<p style="font-size:13px; color:#888;">No contact inquiries received yet.</p>';
      return;
    }
    currentInquiries.forEach((inq) => {
      const box = document.createElement('div');
      box.className = 'admin-item-box';
      box.innerHTML = `
        <div>
          <strong>${escapeHtml(inq.name)} - ${escapeHtml(inq.phone)}</strong>
          <p style="font-size:12px; color:#666;">Date: ${escapeHtml(inq.date)} | Info: ${escapeHtml(inq.moreInfo)}</p>
        </div>
      `;
      list.appendChild(box);
    });
  }

  // ==========================================
  // 7. USER REVIEW SUBMISSION
  // ==========================================
  document.getElementById('userReviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('reviewAuthor').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    const newRev = { id: Date.now(), author, city, rating, comment };
    currentReviews.unshift(newRev);
    localStorage.setItem('grand_reviews', JSON.stringify(currentReviews));

    renderReviews();
    document.getElementById('userReviewForm').reset();
    alert('Thank you! Your review has been submitted.');
  });

  // ==========================================
  // 8. CONTACT FORM & WHATSAPP[cite: 1]
  // ==========================================
  document.getElementById('weddingInquiryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const number = document.getElementById('clientNumber').value.trim();
    const date = document.getElementById('weddingDate').value.trim();
    const moreInfo = document.getElementById('moreInfo').value.trim();

    currentInquiries.unshift({ name, phone: number, date: date || 'Not specified', moreInfo: moreInfo || 'N/A' });
    localStorage.setItem('grand_inquiries', JSON.stringify(currentInquiries));

    const text = `Hey, I am looking for event planning services.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(number)}%0A*Event Date:* ${encodeURIComponent(date || 'Not specified')}%0A*Requirements:* ${encodeURIComponent(moreInfo || 'N/A')}`;
    window.open(`https://wa.me/${currentSettings.whatsapp}?text=${text}`, '_blank');
  });

  // ==========================================
  // 9. MODAL & BUDGET ESTIMATOR & GALLERY FILTER[cite: 3]
  // ==========================================
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBookBtn = document.getElementById('modalBookBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  window.openModal = function(title, description) {
    modalTitle.innerText = title;
    modalDesc.innerText = description;
    modalBookBtn.onclick = function() {
      const text = `Hey, I am interested in booking your *${title}* service. Please share packages and details.`;
      window.open(`https://wa.me/${currentSettings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    };
    modal.style.display = 'flex';
  };

  closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none';
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-category');
      renderGallery(category);
    });
  });

  // Estimator
  const calcEventType = document.getElementById('calcEventType');
  const guestCount = document.getElementById('guestCount');
  const guestCountVal = document.getElementById('guestCountVal');
  const srvDecor = document.getElementById('srvDecor');
  const srvCatering = document.getElementById('srvCatering');
  const srvPhoto = document.getElementById('srvPhoto');
  const srvDj = document.getElementById('srvDj');
  const srvCoordination = document.getElementById('srvCoordination');
  const estimatedPriceDisplay = document.getElementById('estimatedPriceDisplay');
  const btnSendBudget = document.getElementById('btnSendBudget');

  function calculateBudget() {
    const eventType = calcEventType.value;
    const guests = parseInt(guestCount.value);
    
    let baseRate = 0;
    if (eventType === 'wedding') baseRate = 1200;
    else if (eventType === 'prewedding') baseRate = 800;
    else if (eventType === 'birthday') baseRate = 500;

    let serviceMultiplier = 0;
    if (srvDecor.checked) serviceMultiplier += 45000;
    if (srvCatering.checked) serviceMultiplier += guests * baseRate;
    if (srvPhoto.checked) serviceMultiplier += 35000;
    if (srvDj.checked) serviceMultiplier += 25000;
    if (srvCoordination.checked) serviceMultiplier += 20000;

    const minEstimate = Math.round(serviceMultiplier);
    const maxEstimate = Math.round(serviceMultiplier * 1.25);

    const formatted = `₹ ${minEstimate.toLocaleString('en-IN')} - ₹ ${maxEstimate.toLocaleString('en-IN')}`;
    estimatedPriceDisplay.innerText = formatted;
    return formatted;
  }

  guestCount.addEventListener('input', () => {
    guestCountVal.innerText = guestCount.value;
    calculateBudget();
  });

  [calcEventType, srvDecor, srvCatering, srvPhoto, srvDj, srvCoordination].forEach(element => {
    element.addEventListener('change', calculateBudget);
  });

  btnSendBudget.addEventListener('click', () => {
    const eventType = calcEventType.value;
    const guests = guestCount.value;
    const budget = estimatedPriceDisplay.innerText;
    const msg = `Hey, I checked your online Event Estimator:%0A*Event:* ${eventType}%0A*Guests:* ${guests}%0A*Estimated Budget:* ${budget}%0APlease share the best customized quote!`;
    window.open(`https://wa.me/${currentSettings.whatsapp}?text=${msg}`, '_blank');
  });

  calculateBudget();
});