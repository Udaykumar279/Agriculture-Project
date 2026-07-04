/* ==========================================================================
   AGRICULTURE EDUCATIONAL WEBSITE — SCRIPT
   Vanilla JS only. Sections: nav, reveal-on-scroll, data-driven cards,
   counters, gallery, accordion, contact validation, back-to-top.
   ========================================================================== */

/* ---------- SMALL SVG ICON LIBRARY (inline, no external deps) ---------- */
const ICONS = {
  leaf: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21C7 21 3 17 3 12c0-6 6-9 15-9 0 9-3 15-9 15-1.5 0-3-.3-4-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  wheat: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M9 6c0 1.5-1.5 3-3 3M15 6c0 1.5 1.5 3 3 3M8 11c0 1.5-1.5 3-3 3M16 11c0 1.5 1.5 3 3 3M8.5 16c0 1.5-1.2 2.7-2.5 2.7M15.5 16c0 1.5 1.2 2.7 2.5 2.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/><path d="M2 3h2l2.6 12.4A2 2 0 0 0 8.5 17h8.9a2 2 0 0 0 2-1.6L21 7H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mix: '<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="16" cy="16" r="4" stroke="currentColor" stroke-width="1.8"/></svg>',
  organic: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  palm: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 22V12M12 12c-3-4-8-3-9-1 3 2 6 1 9 1ZM12 12c3-4 8-3 9-1-3 2-6 1-9 1ZM12 12C10 8 11 4 12 2c1 2 2 6 0 10Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  factory: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 21V10l6 4v-4l6 4V6l6 5v10H3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  land: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 20h20M4 20l4-9 4 5 3-4 3 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3s6 7 6 11.2A6 6 0 0 1 6 14.2C6 10 12 3 12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M2 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5M17 8.2c1.3.3 2.3 1.4 2.3 2.8 0 1.4-1 2.5-2.3 2.8M22 20c0-2.6-2-4.4-4.5-5.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v10M9.5 9.5c0-1.4 1.2-2 2.5-2s2.5.7 2.5 1.8-1 1.7-2.5 2-2.5.9-2.5 2 1.2 1.7 2.5 1.7 2.5-.6 2.5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" stroke="currentColor" stroke-width="1.5"/></svg>',
  tree: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 22v-7M12 15 8 9h8l-4 6ZM12 9 9 4h6l-3 5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  house: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11 12 4l8 7M6 10v10h12V10" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  cow: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 10c0-3 3-5 8-5s8 2 8 5-1 4-1 6-1 3-3 3H8c-2 0-3-1-3-3s-1-3-1-6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>',
  ship: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 15h18l-2 5H5l-2-5ZM6 15V7h12v8M12 3v4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  recycle: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 8 4 13h6M17 8l3 5h-6M12 4l3 5-3 5-3-5 3-5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  fish: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 12c4-5 12-5 16 0-4 5-12 5-16 0Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="11" r=".8" fill="currentColor"/><path d="M19 9l2-3M19 15l2 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  micro: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M9 15v3a3 3 0 0 0 6 0v-3M6 10h12M7 15h10a3 3 0 0 0 0-6H7a3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  dna: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3c0 6 12 12 12 18M18 3c0 6-12 12-12 18M5 8h14M5 16h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  drone: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 9.5 6 5M12 9.5l6-4.5M12 14.5 6 19M12 14.5l6 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="5" cy="4" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="19" cy="4" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="5" cy="20" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="19" cy="20" r="2" stroke="currentColor" stroke-width="1.4"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 18h10a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6-1.6A4.5 4.5 0 0 0 7 18Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  greenhouse: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 12 12 5l9 7M5 12v8h14v-8M9 20v-6h6v6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  bug: '<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="13" rx="5" ry="7" stroke="currentColor" stroke-width="1.6"/><path d="M12 6V3M8 8 5 6M16 8l3-2M6 13H3M21 13h-3M8 18l-3 2M16 18l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M6 7h12M6 7l-3 6a3 3 0 0 0 6 0L6 7ZM18 7l-3 6a3 3 0 0 0 6 0l-3-6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  tool: '<svg viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.6"/></svg>',
};

/* ---------- CONTENT DATA ---------- */
const typesData = [
  {icon:'house', name:'Subsistence Agriculture', text:'Farming mainly to feed the farmer\'s own family, with little or no surplus for sale.'},
  {icon:'cart', name:'Commercial Agriculture', text:'Large-scale farming focused on producing crops and livestock purely for the market.'},
  {icon:'mix', name:'Mixed Farming', text:'Growing crops alongside raising livestock on the same farm to balance income and risk.'},
  {icon:'organic', name:'Organic Farming', text:'Cultivation without synthetic chemicals, relying on natural fertilisers and pest control.'},
  {icon:'palm', name:'Plantation Farming', text:'Large single-crop estates like tea, coffee or rubber, often grown for export.'},
  {icon:'layers', name:'Intensive Farming', text:'Maximising output from a small area using heavy labour, capital, and inputs.'},
  {icon:'land', name:'Extensive Farming', text:'Farming large land areas with lower input per acre, common where land is abundant.'},
  {icon:'sun', name:'Dry Farming', text:'Growing crops in low-rainfall regions using soil moisture conservation techniques.'},
  {icon:'drop', name:'Irrigation Farming', text:'Using canals, wells or pumps to supply water to fields artificially.'},
  {icon:'flower', name:'Horticulture', text:'Cultivation of fruits, vegetables, flowers and ornamental plants.'},
];

const importanceData = [
  {icon:'wheat', name:'Food Production', text:'The primary source of grains, fruits, vegetables and dairy that feed the world.'},
  {icon:'people', name:'Employment Generation', text:'Provides livelihood to nearly a third of the global workforce.'},
  {icon:'coin', name:'Economic Growth', text:'Contributes significantly to national income, especially in developing countries.'},
  {icon:'factory', name:'Raw Materials for Industries', text:'Supplies cotton, sugarcane, rubber and more to textile, food and other industries.'},
  {icon:'tree', name:'Environmental Protection', text:'Sustainable practices help conserve soil, water and biodiversity.'},
  {icon:'house', name:'Rural Development', text:'Anchors rural infrastructure, markets, and community life.'},
  {icon:'cow', name:'Livestock Support', text:'Feed crops and grazing land sustain dairy, poultry and meat production.'},
  {icon:'ship', name:'Export Earnings', text:'Agricultural exports bring valuable foreign exchange to nations.'},
  {icon:'recycle', name:'Sustainable Development', text:'Balances present food needs with long-term ecological health.'},
];

const branchesData = [
  {icon:'wheat', name:'Agronomy', text:'The science of crop production and soil management for better yields.'},
  {icon:'flower', name:'Horticulture', text:'Study and cultivation of fruits, vegetables and ornamental plants.'},
  {icon:'tree', name:'Forestry', text:'Management and conservation of forests and woodland resources.'},
  {icon:'cow', name:'Animal Husbandry', text:'Breeding and care of livestock for food, labour and by-products.'},
  {icon:'fish', name:'Fisheries', text:'Farming and harvesting of fish and other aquatic organisms.'},
  {icon:'land', name:'Soil Science', text:'Study of soil formation, fertility and conservation.'},
  {icon:'gear', name:'Agricultural Engineering', text:'Design of farm machinery, tools and irrigation systems.'},
  {icon:'chart', name:'Agricultural Economics', text:'Applies economic theory to farm production, markets and policy.'},
  {icon:'dna', name:'Plant Breeding', text:'Developing improved crop varieties through genetics and selection.'},
  {icon:'micro', name:'Agricultural Biotechnology', text:'Using biotechnology to enhance crops, pest resistance and yield.'},
];

const techData = [
  {icon:'chart', name:'Precision Farming', text:'Uses data and GPS mapping to apply the right input at the right place and time.'},
  {icon:'drop', name:'Smart Irrigation', text:'Sensors and automation deliver water precisely when and where crops need it.'},
  {icon:'drone', name:'Drones in Agriculture', text:'Aerial drones monitor crop health, spray inputs, and map fields quickly.'},
  {icon:'micro', name:'AI in Farming', text:'Machine learning predicts yields, detects disease, and optimises decisions.'},
  {icon:'cloud', name:'IoT Sensors', text:'Connected sensors track soil moisture, temperature and nutrients in real time.'},
  {icon:'greenhouse', name:'Greenhouse Farming', text:'Controlled environments allow year-round growing regardless of climate.'},
  {icon:'flask', name:'Hydroponics', text:'Growing plants in nutrient-rich water without soil, saving space and water.'},
  {icon:'layers', name:'Vertical Farming', text:'Stacked growing layers maximise yield per square foot in urban spaces.'},
];

const benefitsData = [
  {icon:'tree', text:'Protects the environment for future generations'},
  {icon:'land', text:'Improves soil fertility through natural practices'},
  {icon:'drop', text:'Saves water via efficient irrigation methods'},
  {icon:'recycle', text:'Reduces pollution from chemical runoff'},
  {icon:'fish', text:'Supports biodiversity in soil, water and air'},
  {icon:'organic', text:'Produces healthier, chemical-free food'},
];

const challengesData = [
  {icon:'sun', name:'Climate Change', text:'Unpredictable rainfall and rising temperatures disrupt crop cycles.'},
  {icon:'drop', name:'Water Scarcity', text:'Falling groundwater levels threaten irrigation-dependent farming.'},
  {icon:'land', name:'Soil Erosion', text:'Loss of fertile topsoil reduces long-term productivity.'},
  {icon:'bug', name:'Pest Attacks', text:'Insects and diseases can destroy large portions of a harvest.'},
  {icon:'scale', name:'Market Price Fluctuations', text:'Unstable prices make farm income unpredictable.'},
  {icon:'tool', name:'Lack of Modern Equipment', text:'Many small farmers still rely on outdated, inefficient tools.'},
  {icon:'people', name:'Labour Shortage', text:'Migration to cities has reduced the availability of farm workers.'},
];

const schemesData = [
  {icon:'coin', name:'PM-KISAN', text:'Provides direct income support of ₹6,000 per year to eligible farmer families.'},
  {icon:'shield', name:'PMFBY (Crop Insurance)', text:'Pradhan Mantri Fasal Bima Yojana insures crops against natural calamities.'},
  {icon:'clipboard', name:'Soil Health Card', text:'Gives farmers soil nutrient reports with recommendations for better yield.'},
  {icon:'drop', name:'PMKSY (Irrigation)', text:'Pradhan Mantri Krishi Sinchayee Yojana expands assured irrigation coverage.'},
  {icon:'cart', name:'e-NAM', text:'A national online market connecting farmers to buyers for better prices.'},
  {icon:'card', name:'Kisan Credit Card', text:'Offers farmers timely, affordable credit for agricultural needs.'},
];

const galleryData = [
  {url:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80', caption:'Crop Cultivation'},
  {url:'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=700&q=80', caption:'Tractors'},
  {url:'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=700&q=80', caption:'Irrigation'},
  {url:'https://images.unsplash.com/photo-1595855759920-86582396756c?auto=format&fit=crop&w=700&q=80', caption:'Organic Farming'},
  {url:'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80', caption:'Greenhouses'},
  {url:'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=700&q=80', caption:'Harvesting'},
  {url:'https://images.unsplash.com/photo-1619566636858-adf3d47445b3?auto=format&fit=crop&w=700&q=80', caption:'Fresh Fruits'},
  {url:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80', caption:'Vegetables'},
];

const faqData = [
  {q:'What is Agriculture?', a:'Agriculture is the practice of cultivating soil, growing crops, and raising livestock to produce food, fiber and other useful goods for human life.'},
  {q:'Why is Agriculture important?', a:'It provides food security, generates employment, supplies raw materials to industry, and supports rural economies and environmental balance.'},
  {q:'What are the major types of farming?', a:'Major types include subsistence, commercial, mixed, organic, plantation, intensive, extensive, dry, irrigation and horticultural farming.'},
  {q:'What is Organic Farming?', a:'Organic farming grows crops and raises animals without synthetic pesticides or fertilisers, relying on natural processes to maintain soil health.'},
  {q:'What is Sustainable Agriculture?', a:'Sustainable agriculture meets today\'s food needs while protecting soil, water and biodiversity so future generations can farm the same land.'},
];

/* ---------- FALLBACK IMAGE (inline SVG data URI) ---------- */
function handleImgError(img){
  img.onerror = null;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="500" viewBox="0 0 700 500">
      <rect width="700" height="500" fill="#E8E2D0"/>
      <path d="M0 380 Q175 320 350 380 T700 380 V500 H0 Z" fill="#8FC46E"/>
      <path d="M0 420 Q175 380 350 420 T700 420 V500 H0 Z" fill="#6FA85C"/>
      <circle cx="580" cy="110" r="55" fill="#E3B23C"/>
    </svg>`
  );
}

/* ---------- RENDER HELPERS ---------- */
function renderCards(container, data, extraClass=''){
  container.innerHTML = data.map(item => `
    <div class="info-card reveal ${extraClass}">
      <div class="card-icon">${ICONS[item.icon] || ICONS.leaf}</div>
      <h3>${item.name}</h3>
      <p>${item.text}</p>
    </div>
  `).join('');
}

function renderBenefits(container, data){
  container.innerHTML = data.map(item => `
    <div class="benefit-item reveal">
      <span class="b-icon">${ICONS[item.icon] || ICONS.leaf}</span>
      <span class="b-text">${item.text}</span>
    </div>
  `).join('');
}

function renderGallery(container, data){
  container.innerHTML = data.map(item => `
    <div class="gallery-item reveal">
      <img src="${item.url}" alt="${item.caption}" loading="lazy" onerror="handleImgError(this)">
      <div class="gallery-caption">${item.caption}</div>
    </div>
  `).join('');
}

function renderAccordion(container, data){
  container.innerHTML = data.map((item, i) => `
    <div class="accordion-item reveal ${i===0 ? 'open':''}">
      <button class="accordion-question" data-index="${i}">
        <span>${item.q}</span>
        <span class="plus"></span>
      </button>
      <div class="accordion-answer"><p>${item.a}</p></div>
    </div>
  `).join('');
}

/* ---------- INIT CONTENT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCards(document.getElementById('typesGrid'), typesData);
  renderCards(document.getElementById('importanceGrid'), importanceData);
  renderCards(document.getElementById('branchesGrid'), branchesData);
  renderCards(document.getElementById('techGrid'), techData);
  renderCards(document.getElementById('challengesGrid'), challengesData);
  renderCards(document.getElementById('schemesGrid'), schemesData);
  renderBenefits(document.getElementById('benefitList'), benefitsData);
  renderGallery(document.getElementById('galleryGrid'), galleryData);
  renderAccordion(document.getElementById('accordion'), faqData);

  initAccordionEvents();
  observeReveals();
  initCounters();

  // hide loader once everything is rendered
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 350);
});

/* ---------- NAVBAR: scroll shadow + active link + mobile menu ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  toggleBackToTop();
  setActiveNavLink();
}, {passive:true});

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// close mobile menu + smooth scroll on link click
document.querySelectorAll('.nav-link, .smooth-scroll').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        const offset = target.offsetTop - (window.innerWidth <= 900 ? 66 : 76) + 1;
        window.scrollTo({top:offset, behavior:'smooth'});
      }
    }
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
  });
});

function setActiveNavLink(){
  const sections = document.querySelectorAll('section[id]');
  let currentId = sections[0] ? sections[0].id : '';
  const scrollPos = window.scrollY + 140;
  sections.forEach(sec => {
    if(scrollPos >= sec.offsetTop) currentId = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}

/* ---------- REVEAL ON SCROLL ---------- */
function observeReveals(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- ANIMATED STATISTICS COUNTER ---------- */
function initCounters(){
  const statNumbers = document.querySelectorAll('.stat-number');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  statNumbers.forEach(el => io.observe(el));
}

function animateCount(el){
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function frame(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value).toLocaleString()) + suffix;
    if(progress < 1){
      requestAnimationFrame(frame);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString()) + suffix;
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- FAQ ACCORDION EVENTS ---------- */
function initAccordionEvents(){
  document.getElementById('accordion').addEventListener('click', (e) => {
    const btn = e.target.closest('.accordion-question');
    if(!btn) return;
    const item = btn.closest('.accordion-item');
    const answer = item.querySelector('.accordion-answer');
    const wasOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.accordion-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.accordion-answer').style.maxHeight = null;
    });

    if(!wasOpen){
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  // set initial open item's max-height
  const firstOpen = document.querySelector('.accordion-item.open .accordion-answer');
  if(firstOpen) firstOpen.style.maxHeight = firstOpen.scrollHeight + 'px';
}

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
function toggleBackToTop(){
  backToTop.classList.toggle('show', window.scrollY > 600);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

/* ---------- CONTACT FORM VALIDATION ---------- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  valid = validateField('name', v => v.trim().length >= 2, 'Please enter your full name.') && valid;
  valid = validateField('email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Please enter a valid email address.') && valid;
  valid = validateField('subject', v => v.trim().length >= 3, 'Please enter a subject (min 3 characters).') && valid;
  valid = validateField('message', v => v.trim().length >= 10, 'Message should be at least 10 characters.') && valid;

  const successEl = document.getElementById('formSuccess');
  if(valid){
    successEl.textContent = '✓ Thank you! Your message has been received.';
    contactForm.reset();
    document.querySelectorAll('.form-row').forEach(row => row.classList.remove('invalid'));
    setTimeout(() => successEl.textContent = '', 5000);
  } else {
    successEl.textContent = '';
  }
});

function validateField(id, testFn, message){
  const input = document.getElementById(id);
  const row = input.closest('.form-row');
  const errorEl = document.getElementById(id + 'Error');
  const isValid = testFn(input.value);

  row.classList.toggle('invalid', !isValid);
  errorEl.textContent = isValid ? '' : message;
  return isValid;
}

// live-clear error while typing
['name','email','subject','message'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => {
    input.closest('.form-row').classList.remove('invalid');
    document.getElementById(id + 'Error').textContent = '';
  });
});