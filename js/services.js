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

  const honeymoonServices = [
    {
      title: "Exotic International Getaways",
      shortDesc: "Maldives overwater villas, Bali pool sanctuaries, Santorini sunset suites, Paris romance, and Swiss Alpine hideaways.",
      detailedDesc: "All-inclusive international honeymoon packages: luxury 5-star beachfront resorts, private infinity pools, express visa coordination, airport transfers, and sunset catamaran cruises."
    },
    {
      title: "Royal Palaces & Hill Retreats",
      shortDesc: "Heritage palace suites in Udaipur & Jaipur, luxury houseboats on Dal Lake Kashmir, and cozy private chalets in Manali.",
      detailedDesc: "Experience regal hospitality with heritage palace stays, private shikara rides, tea-estate luxury bungalows, couple spa sessions, and private stargazing bonfires."
    },
    {
      title: "Candlelight Dinners & Surprises",
      shortDesc: "Private beach gazebo dining, twilight yacht dinners, floral bed cabana styling, and customized romantic anniversary surprises.",
      detailedDesc: "Intimate dining experiences with private chefs, vintage wine, live acoustic musicians, floral path lighting, and bespoke gift hampers designed just for couples."
    },
    {
      title: "Couple Shoots & Cinematic Reels",
      shortDesc: "Destination couple portraits, 4K aerial drone coverage, curated Instagram reels, and timeless fine-art photo albums.",
      detailedDesc: "Top travel and fashion photographers to document your romantic journey. Includes scenic location scouting, drone shots, same-trip edited reels, and high-res digital albums."
    },
    {
      title: "Adventure & Island Glamping",
      shortDesc: "Scuba diving in coral lagoons, private desert glamping in Jaisalmer, Northern Lights glass igloos, and scenic helicopter tours.",
      detailedDesc: "Curated itineraries for thrill-loving couples: certified scuba diving, private dunes camping with cultural folk music, waterfall trekking, and scenic couple flights."
    },
    {
      title: "Honeymoon Travel Concierge",
      shortDesc: "End-to-end trip curation, priority bookings, surprise room turn-downs, and 24/7 dedicated on-call travel support.",
      detailedDesc: "Seamless honeymoon planning: customized daily itineraries, luxury flight & stay bookings, surprise champagne & chocolate room decor, and round-the-clock emergency support."
    }
  ];

  const serviceIcons = {
    "Decor & Theme Styling": "fa-palette",
    "Grand Entries & Effects": "fa-wand-magic-sparkles",
    "Catering & Live Food Stalls": "fa-utensils",
    "Photography & Cinematic Film": "fa-camera-retro",
    "Bridal Makeup & Mehendi": "fa-hand-sparkles",
    "DJ, Sound & Baraat Procession": "fa-music",
    "Day-of Coordination": "fa-calendar-check",
    "Exotic International Getaways": "fa-plane-departure",
    "Royal Palaces & Hill Retreats": "fa-landmark",
    "Candlelight Dinners & Surprises": "fa-champagne-glasses",
    "Couple Shoots & Cinematic Reels": "fa-camera-retro",
    "Adventure & Island Glamping": "fa-compass",
    "Honeymoon Travel Concierge": "fa-heart"
  };

  function renderWeddings() {
    const grid = document.getElementById('weddingServicesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    weddingServices.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-card-top">
          <span class="service-icon"><i class="fa ${serviceIcons[s.title] || 'fa-sparkles'}"></i></span>
          <span class="service-number">0${weddingServices.indexOf(s) + 1}</span>
        </div>
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
        <div class="service-card-top">
          <span class="service-icon"><i class="fa ${serviceIcons[s.title] || 'fa-cake-candles'}"></i></span>
          <span class="service-number">BIRTHDAY</span>
        </div>
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

  function renderHoneymoons() {
    const grid = document.getElementById('honeymoonServicesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    honeymoonServices.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-card-top">
          <span class="service-icon"><i class="fa ${serviceIcons[s.title] || 'fa-heart'}"></i></span>
          <span class="service-number">0${idx + 1}</span>
        </div>
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
      renderHoneymoons();
      initModalEvents();
    },
    renderBirthdays,
    renderHoneymoons,
    openModal
  };
})();