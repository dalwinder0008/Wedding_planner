const ServicesModule = (() => {
  const weddingServices = [
    {
      title: "Decor & Theme Styling",
      shortDesc: "Bespoke themes for Haldi, Mehendi, Sangeet, and Wedding ceremonies. Stage setup, mandap floral arch, fairy lights, and ambient chandeliers.",
      detailedDesc: "Customized color themes for Haldi (boho/yellow), Mehendi, and Wedding. Includes mandap setup, floral entry arches, fairy lights, chandeliers, and designer stages."
    },
    {
      title: "Grand Entries & Effects",
      shortDesc: "Signature bride and groom royal entries, cold pyros, low-fog dry ice clouds, floral showers, and interactive guest photobooths.",
      detailedDesc: "Bridal entry concepts, cold spark pyrotechnics, low fog smoke machines, personalized entrance background music, and floral confetti cannons."
    },
    {
      title: "Catering & Live Food Stalls",
      shortDesc: "Private food tasting sessions, multi-cuisine gourmet menus, authentic traditional flavours, and luxury live food counters.",
      detailedDesc: "Curated gourmet menu planning, food tastings, live chaat and pasta counters, beverage catering, professional servers, and luxury tableware setup."
    },
    {
      title: "Photography & Cinematic Film",
      shortDesc: "Pre-wedding outdoor shoots, candid moments, cinematic wedding documentaries, drone cinematography, and social media reels.",
      detailedDesc: "Dedicated candid and traditional photographers, 4K aerial drone coverage, teaser videos, cinematic full-length film, and fine-art albums."
    },
    {
      title: "Bridal Makeup & Mehendi",
      shortDesc: "Leading bridal makeup artists (MUA) for airbrush and HD finishes, family hair styling, and professional mehendi artists.",
      detailedDesc: "Top celebrity and luxury makeup artists, custom bridal hairstyles, family grooming packages, and organic dark-stain bridal mehendi artists."
    },
    {
      title: "DJ, Sound & Baraat Procession",
      shortDesc: "Live dhol ensembles, royal vintage car hire, luxury baggi/ghodi, concert-grade sound systems, and celebrity DJs.",
      detailedDesc: "Vintage car booking for the wedding procession, traditional dhol troupes, LED dynamic dance floor, concert line array sound, and intelligent moving lighting."
    },
    {
      title: "Day-of Coordination",
      shortDesc: "Minute-by-minute itinerary schedule (Haldi, Jaimala, Phere, Bidaai) and proactive crisis management for peace of mind.",
      detailedDesc: "Dedicated on-site event managers, flawless run-sheet coordination, guest greeting, stage timing management, and vendor crisis handling."
    }
  ];

  function renderWeddings() {
    const grid = document.getElementById('weddingServicesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    weddingServices.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div>
          <h3>${StorageModule.escapeHtml(s.title)}</h3>
          <p>${StorageModule.escapeHtml(s.shortDesc)}</p>
        </div>
        <button class="open-modal-btn" onclick="ServicesModule.openModal('${StorageModule.escapeHtml(s.title)}', '${StorageModule.escapeHtml(s.detailedDesc)}')">
          View Service Details <i class="fa fa-arrow-right"></i>
        </button>
      `;
      grid.appendChild(card);
    });
  }

  function renderBirthdays() {
    const grid = document.getElementById('birthdayServicesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const list = StorageModule.getBirthdayServices();
    list.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div>
          <h3>${StorageModule.escapeHtml(s.title)}</h3>
          <p>${StorageModule.escapeHtml(s.shortDesc)}</p>
        </div>
        <button class="open-modal-btn" onclick="ServicesModule.openModal('${StorageModule.escapeHtml(s.title)}', '${StorageModule.escapeHtml(s.detailedDesc)}')">
          View Service Details <i class="fa fa-arrow-right"></i>
        </button>
      `;
      grid.appendChild(card);
    });
  }

  function openModal(title, description) {
    const modal = document.getElementById('serviceModal');
    const settings = StorageModule.getSettings();

    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = description;
    
    document.getElementById('modalBookBtn').onclick = () => {
      const text = `Hey, I am interested in booking your *${title}* service. Please share packages and details.`;
      window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    };

    modal.style.display = 'flex';
  }

  function initModalEvents() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('closeModalBtn');

    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  return {
    init: () => {
      renderWeddings();
      renderBirthdays();
      initModalEvents();
    },
    renderBirthdays,
    openModal
  };
})();