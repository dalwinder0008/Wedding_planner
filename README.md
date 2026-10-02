# WedHappy - Luxury Wedding Planner & Event Management Platform

**WedHappy** (`wedhappy.in`) is a modern, responsive, and SEO-optimized web application designed for luxury wedding planning, birthday celebrations, and event management services across India.

---

## 🌟 Features

- **Luxury Event Showcase**: Dedicated sections for Wedding Planning Services (Decor & Styling, Grand Entries, Catering, Photography, Makeup, DJ & Sound, Day-of Coordination) and Birthday Party Planning.
- **Interactive Budget Estimator**: Dynamic event cost calculator based on guest count, event type (Full Wedding, Pre-Wedding, Birthday), and customizable service selections.
- **Real Portfolio Gallery**: Filterable photo gallery showcasing real weddings, Haldi & Mehendi ceremonies, Sangeet & DJ nights, and birthday events.
- **Client Reviews & Testimonials**: Client feedback showcase with a submission form for new client reviews saved in LocalStorage.
- **WhatsApp Integration**: Instant one-click WhatsApp inquiry routing for service bookings, budget estimations, and direct contact.
- **Admin Portal (`#admin`)**: Password-protected client-side management dashboard allowing site administrators to:
  - Add/delete portfolio gallery photos (via file upload or URL).
  - Create, edit, or delete birthday planning services.
  - Dynamically update hero text, contact info, social handles, and budget estimator rates.
  - View submitted client inquiries and manage reviews.

---

## 🔍 Search Engine Optimization (SEO)

WedHappy is fully optimized for search engines and social media sharing:
- **Schema.org Structured Data**: Integrated JSON-LD `EventPlanner` schema with service catalog, pricing range, and contact details.
- **Meta Tags & Keywords**: Complete `description`, `keywords`, canonical URLs, and `robots` directive (`index, follow`).
- **Social Sharing (OpenGraph & Twitter Cards)**: Tailored Open Graph and Twitter Card tags for rich sharing previews on WhatsApp, Facebook, LinkedIn, and X.
- **Indexing Files**: Complete `sitemap.xml` and `robots.txt` included for web crawlers.

---

## 📁 Codebase Architecture

The project uses a clean, modular frontend architecture without heavy frameworks:

```
├── index.html            # Main HTML page (Client view + Admin modal view)
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # XML Sitemap
├── css/
│   ├── main.css          # Core styles, layout, variables, typography
│   ├── components.css    # Cards, forms, modal, buttons, gallery styles
│   └── admin.css         # Admin portal styling & control panel layout
├── js/
│   ├── storage.js        # LocalStorage persistence & default data state
│   ├── services.js       # Wedding & Birthday services rendering & modal logic
│   ├── gallery.js        # Portfolio rendering & category filter logic
│   ├── estimator.js      # Budget calculator logic & rate calculations
│   ├── reviews.js        # Reviews rendering & submission form logic
│   ├── admin.js          # Admin portal authentication, CRUD forms & tab routing
│   └── app.js            # App initialization, main router (#admin), & navigation
└── public/               # Optimized image assets and brand media
```

---

## 🔐 Admin Portal Access

To access the control panel:
1. Navigate to `index.html#admin` or click the **Admin** link in the navigation header.
2. Login with default credentials:
   - **Username**: `Admin`
   - **Password**: `Admin`

*(Note: Content changes are stored locally in the browser's `localStorage` for instant testing and demonstration.)*

---

## 🚀 Getting Started

### Local Development
Since WedHappy is built with standard Web technologies (HTML/CSS/JS), you can serve it with any local static web server:

Using Python:
```bash
python3 -m http.server 3000
```
Open `http://localhost:3000` in your web browser.

---

## 📄 License

&copy; WedHappy.in. All rights reserved.
