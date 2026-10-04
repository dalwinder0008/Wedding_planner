const StorageModule = (() => {
  const KEYS = {
    SETTINGS: 'grand_settings',
    BIRTHDAY_SERVICES: 'grand_birthday_services',
    GALLERY: 'grand_gallery',
    REVIEWS: 'grand_reviews',
    INQUIRIES: 'grand_inquiries'
  };

  const defaultSettings = {
    heroTitle: "Your once-in-a-lifetime celebration, beautifully planned.",
    heroSubtitle: "From the first moodboard to the final vidaai, we design warm, joyful celebrations that feel completely yours.",
    phone: "+91 8837531768",
    whatsapp: "918837531768",
    email: "Ashish73409@gmail.com",
    socialHandle: "@wedhappy.in",
    estimatorRates: {
      perGuest: { wedding: 1200, prewedding: 800, birthday: 500 },
      fixedCost: { decor: 45000, photo: 35000, dj: 25000, coordination: 20000 },
      highRangePercent: 25
    }
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
    { id: 4, category: "sangeet", url: "public/dj.webp" },
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

  function get(key, fallback) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getSettings() {
    const settings = get(KEYS.SETTINGS, {});
    const estimatorRates = settings.estimatorRates || {};

    return {
      ...defaultSettings,
      ...settings,
      estimatorRates: {
        ...defaultSettings.estimatorRates,
        ...estimatorRates,
        perGuest: { ...defaultSettings.estimatorRates.perGuest, ...(estimatorRates.perGuest || {}) },
        fixedCost: { ...defaultSettings.estimatorRates.fixedCost, ...(estimatorRates.fixedCost || {}) }
      }
    };
  }

  return {
    getSettings,
    saveSettings: (settings) => set(KEYS.SETTINGS, settings),

    getBirthdayServices: () => get(KEYS.BIRTHDAY_SERVICES, defaultBirthdayServices),
    saveBirthdayServices: (services) => set(KEYS.BIRTHDAY_SERVICES, services),

    getGallery: () => get(KEYS.GALLERY, defaultGallery),
    saveGallery: (gallery) => set(KEYS.GALLERY, gallery),

    getReviews: () => get(KEYS.REVIEWS, defaultReviews),
    saveReviews: (reviews) => set(KEYS.REVIEWS, reviews),

    getInquiries: () => get(KEYS.INQUIRIES, []),
    saveInquiries: (inquiries) => set(KEYS.INQUIRIES, inquiries),

    escapeHtml: (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  };
})();
