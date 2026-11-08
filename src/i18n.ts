export type Lang = "en" | "am";

export const CONTACT = {
  phoneDisplay: "0953 850 002",
  phoneIntl: "+251953850002",
  whatsapp: "https://wa.me/251953850002",
  telegram: "https://t.me/mahir_7219",
  telegramHandle: "@mahir_7219",
};

export const waLink = (lang: Lang, code?: string | null) => {
  let msg =
    lang === "am"
      ? "ሰላም ፈርስትፎርም! ለንግዴ ነጻ የድረ-ገጽ ናሙና እፈልጋለሁ።"
      : "Hi Firstform! I'd like a free website prototype for my business.";
  if (code) msg += lang === "am" ? `\nየቅናሽ ኮድ፡ ${code}` : `\nOffer code: ${code}`;
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
};

export const tgLink = (lang: Lang, code?: string | null) => {
  if (!code) return CONTACT.telegram;
  const msg =
    lang === "am"
      ? `ሰላም ፈርስትፎርም! ነጻ የድረ-ገጽ ናሙና እፈልጋለሁ።\nየቅናሽ ኮድ፡ ${code}`
      : `Hi Firstform! I'd like a free website prototype.\nOffer code: ${code}`;
  return `${CONTACT.telegram}?text=${encodeURIComponent(msg)}`;
};

export const fmtETB = (n: number) => n.toLocaleString("en-US");

export const PROJECTS = [
  { id: "attikem", url: "https://attikem-furniture-landing-page.vercel.app/", name: "Attikem Furniture", accent: "from-amber-100 via-orange-50 to-white" },
  { id: "dream", url: "https://dazzling-kataifi-e1bc50.netlify.app/", name: "Dream Furniture PLC", accent: "from-stone-200 via-stone-100 to-white" },
  { id: "yegar", url: "https://soft-axolotl-afc50d.netlify.app/", name: "Yegar Nur", accent: "from-yellow-100 via-amber-50 to-white" },
  { id: "msgroup", url: "http://msgroup.page.gd/", name: "MS Group", accent: "from-sky-100 via-blue-50 to-white" },
];

const svc = (t: string, d: string, tag: string) => ({ title: t, desc: d, tag });

const en = {
  nav: {
    work: "Work",
    services: "What you get",
    pricing: "Pricing",
    why: "Why a website",
    faq: "FAQ",
    contact: "Contact",
    cta: "Get free prototype",
    langLabel: "Switch language",
  },
  hero: {
    badge: "Free custom prototype · Built for Ethiopian businesses",
    title1: "Your business.",
    title2: "Deserves to be seen.",
    title3: "Not just listed.",
    subtitle: "Firstform designs and builds fast, modern websites for Ethiopian businesses.",
    whatsapp: "Chat on WhatsApp",
    telegram: "Message on Telegram",
    call: "Call",
    note: "No deposit for the prototype. Pay only when you love it.",
    stats: [
      { value: "3", unit: "days", label: "from approval to launch" },
      { value: "0", unit: "ETB", label: "to see your prototype" },
      { value: "2", unit: "languages", label: "Amharic & English" },
      { value: "24/7", unit: "", label: "your site never closes" },
    ],
    mock: { title: "Your Business Name", tag: "Addis Ababa · Open now", cta: "Chat on WhatsApp", prototype: "Free prototype", delivered: "Delivered in 3 days" },
  },
  proof: {
    title: "Built for the businesses that keep Ethiopia running",
    items: ["Furniture showrooms", "Restaurants & cafés", "Clinics & pharmacies", "Salons & barbers", "Hotels & guest houses", "Real estate", "Schools & training", "Construction", "Retail shops", "Import & export", "Car rentals", "Law & consulting"],
  },
  services: {
    eyebrow: "Websites → systems → growth",
    title: "We build more than websites.",
    subtitle: "If your business needs a website, online store, management system or a custom digital workflow, Firstform can design and build it.",
    built: "Built around your workflow",
    items: [
      svc("Business websites", "Modern, fast, mobile-first websites for Ethiopian businesses.", "Web design & development"),
      svc("E-commerce", "Online shops with products, categories, checkout, orders and payments.", "Sell online"),
      svc("School systems", "Student, teacher, class, attendance, fee and parent workflows.", "Education"),
      svc("CMS & portals", "Let your team manage pages, news, products and private content.", "Content & accounts"),
      svc("Booking systems", "Appointments, rooms, tours, reservations and availability.", "Bookings"),
      svc("CRM & dashboards", "Manage leads, customers, staff and reports with custom dashboards.", "Business software"),
      svc("Payments & integrations", "Connect payment providers, APIs, messaging and other tools.", "Automation"),
      svc("SEO & local visibility", "Technical SEO, local search structure and Google Business support.", "Search"),
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything a modern business site needs. Nothing you don't.",
    subtitle: "A site that looks premium, loads instantly and makes it effortless for customers to reach you.",
    items: [
      { title: "Custom design, not a template", desc: "Every site is designed around your brand, products and customers." },
      { title: "Mobile-first, always", desc: "Most of your customers browse on a phone. Your site is designed there first." },
      { title: "One-tap WhatsApp & Telegram", desc: "Built-in chat and call buttons let customers reach you in seconds." },
      { title: "Found on Google", desc: "Local SEO, Google Maps and Google Business setup." },
      { title: "Amharic + English", desc: "Serve locals, diaspora and visitors in the language they prefer." },
      { title: "Fast & lightweight", desc: "Optimized to load quickly even on slow mobile data." },
      { title: "Domain & hosting handled", desc: "We set up your domain, hosting and security certificate." },
      { title: "Easy to update", desc: "Change prices, photos or hours by messaging us — or we teach you how." },
    ],
  },
  showcase: {
    eyebrow: "Selected work",
    title: "Real sites. Live today.",
    subtitle: "Every project below is live on the internet. Open it on your own phone and judge for yourself.",
    visit: "Visit live site",
    previewNote: "Live",
    liveNote: "Previews are captured directly from each live website.",
    openPhone: "Tap any project to open it on your phone.",
    filters: ["All", "Furniture", "Business"],
    projects: [
      { category: "Furniture showroom", desc: "Landing page with product highlights and one-tap contact.", tags: ["Landing page", "Product highlights", "Direct contact"] },
      { category: "Furniture store · Addis Ababa", desc: "Bilingual site with catalog, Google Maps and local SEO.", tags: ["Amharic + English", "Google Maps", "Local SEO"] },
      { category: "Home furnishing store", desc: "Full bilingual storefront with categories, gallery and FAQ.", tags: ["Amharic + English", "Catalog", "Gallery"] },
      { category: "Company website", desc: "Corporate presence with services overview and clear contact.", tags: ["Corporate", "Services", "Contact"] },
    ],
  },
  compare: {
    eyebrow: "Compare",
    title: "Why businesses choose Firstform.",
    subtitle: "An honest look at your options.",
    cols: ["Firstform", "Typical agency", "Social media only"],
    rows: [
      { label: "See your site before paying", values: ["Free prototype", "Deposit first", "—"] },
      { label: "Time to launch", values: ["3 days", "3–8 weeks", "Instant, but not yours"] },
      { label: "Price", values: ["Fixed, in ETB", "Quote + extras", "Free"] },
      { label: "Found on Google", values: ["Yes, local SEO", "Sometimes", "Rarely"] },
      { label: "Amharic + English", values: ["Included", "Extra cost", "Manual"] },
      { label: "You own it", values: ["Domain & site are yours", "Usually", "Platform owns it"] },
      { label: "How you talk to us", values: ["WhatsApp / Telegram", "Email & meetings", "—"] },
    ],
  },
  form: {
    eyebrow: "Request your free prototype",
    title: "Tell us about your business. We'll do the rest.",
    subtitle: "Fill this in and send it with one tap.",
    name: "Business name", namePh: "e.g. Selam Furniture",
    type: "Type of business", typePh: "Select one",
    types: ["Furniture / Showroom", "Restaurant / Café", "Clinic / Pharmacy", "Salon / Barber", "Hotel / Guest house", "Real estate", "School / Training", "Construction", "Retail shop", "Import / Export", "Other"],
    city: "City", cityPh: "e.g. Addis Ababa",
    hasSite: "Do you have a website today?", hasSiteOptions: ["No, not yet", "Yes, but it needs work"],
    sendWa: "Send via WhatsApp", sendTg: "Send via Telegram",
    privacy: "No account, no spam. Your message opens directly in WhatsApp or Telegram.",
    msgIntro: "Hi Firstform! I'd like a free website prototype.",
    msgName: "Business", msgType: "Type", msgCity: "City", msgSite: "Current website", msgNone: "Not provided",
  },
  process: {
    eyebrow: "How it works",
    title: "From first message to live website in 3 days.",
    subtitle: "No meetings, no paperwork. Just a conversation on WhatsApp or Telegram.",
    steps: [
      { day: "Day 0", title: "Say hello", desc: "Message us on WhatsApp or Telegram. Tell us your business name and what you do." },
      { day: "Day 1", title: "Get your free prototype", desc: "Within 24–48 hours we send you a custom prototype. No cost, no obligation." },
      { day: "Day 2–3", title: "Approve & we build", desc: "Love it? Choose a plan and we finish the full site." },
      { day: "Day 3", title: "Go live", desc: "Your domain is connected, your site is live, and we show you how to share it." },
    ],
  },
  trust: {
    eyebrow: "Trust, earned honestly",
    title: "No fake reviews. Just proof you can check.",
    subtitle: "We're a young studio, and we'd rather show you real work than invent five-star quotes.",
    points: [
      { title: "See it before you pay", desc: "Your free prototype is a real preview of your site." },
      { title: "Live links, not just screenshots", desc: "Every project we show is live on the internet." },
      { title: "Direct line to the builder", desc: "You talk to the person who designs and builds your site." },
      { title: "Clear, fixed prices", desc: "Prices in ETB, agreed upfront. No surprise fees." },
      { title: "You own everything", desc: "Your domain is in your name and the site is yours." },
      { title: "Pay in two halves", desc: "50% after you approve the prototype, 50% when live." },
    ],
    quoteLabel: "A note from Firstform",
    quote: "Most local businesses in Ethiopia still don't have a website — not because they don't need one, but because the process felt slow, expensive and confusing. We started Firstform to change that.",
    cta: "Ask us anything",
    ctaLine: "Still unsure? Talk to us first — no pitch, just honest answers.",
  },
  pricing: {
    eyebrow: "Choose your starting point",
    title: "Start simple. Build bigger when you need it.",
    subtitle: "From a focused business site to a complete digital system. Your prototype is always free.",
    popular: "Most popular",
    more: "More options",
    less: "Hide extra option",
    customBadge: "Build exactly what your business needs",
    customTitle: "Custom digital systems",
    customSubtitle: "When a normal website is not enough, we build the system behind your business.",
    customCta: "Explore custom systems",
    customPanelTitle: "What can Firstform build for you?",
    customPanelSubtitle: "Tell us the problem, workflow or idea.",
    customServices: [
      { title: "Content management system", desc: "Manage pages, news, products and content yourself." },
      { title: "School management system", desc: "Students, teachers, classes, attendance, fees and results." },
      { title: "Online shopping system", desc: "Products, cart, checkout, orders and delivery." },
      { title: "Payment accepting systems", desc: "Connect supported payment providers to your workflow." },
      { title: "Booking & reservation", desc: "Appointments, rooms, tours and availability." },
      { title: "CRM & customer portals", desc: "Leads, customers, staff workflows and dashboards." },
      { title: "Business dashboards", desc: "Turn your data into useful admin dashboards." },
      { title: "Automation & integrations", desc: "Connect forms, messaging, email and APIs." },
      { title: "Mobile apps & web apps", desc: "Custom browser-based applications for specific workflows." },
      { title: "SEO & search visibility", desc: "Technical SEO, local SEO and search-focused pages." },
    ],
    customFootnote: "Every custom project gets its own scope, timeline and proposal.",
    customTalk: "Discuss my project",
    perProject: "one-time",
    plans: [
      { name: "Launch", amount: 45000, price: "45,000", currency: "ETB", desc: "A focused website that gets your business online properly.", cta: "Get free prototype", features: ["One-page website (up to 6 sections)", "Custom, mobile-first design", "WhatsApp, Telegram & call buttons", "Google Maps & basic SEO", "Domain & hosting setup", "3-day delivery", "30 days of free changes"] },
      { name: "Business", amount: 90000, price: "90,000", currency: "ETB", desc: "A stronger web presence for businesses ready to grow.", cta: "Get free prototype", features: ["Everything in Launch", "Up to 5 pages", "Amharic + English bilingual", "Product or service catalog", "Photo gallery & contact form", "Google Business Profile setup", "Advanced local SEO", "60 days of free changes"] },
      { name: "Custom", amount: 0, price: "Let's build it", currency: "", desc: "E-commerce, school systems, portals, dashboards, payments and software.", cta: "Explore custom systems", features: ["Custom design & product planning", "CMS, e-commerce or business system", "Payments & third-party integrations", "Admin dashboards & user roles", "Automation & API integrations", "Dedicated timeline & support"] },
      { name: "Starter", amount: 30000, price: "30,000", currency: "ETB", desc: "A compact online presence with a .pro.et domain.", cta: "Ask about Starter", hidden: true, features: ["Focused one-page website", ".pro.et domain", "Mobile-first layout", "WhatsApp / Telegram contact", "Basic SEO", "Hosting setup"] },
    ],
    note: "Optional yearly renewal covers your domain & hosting — quoted transparently before launch.",
    priceRange: "From 30,000 ETB · custom projects quoted separately",
  },
  offer: {
    label: "Holiday offer",
    off: "20% off",
    offAll: "20% off every plan",
    preTitle: (h: string) => `${h} is almost here`,
    duringTitle: (g: string) => g,
    barText: (h: string) => `20% off all website plans for ${h}`,
    endsIn: "Ends in",
    ended: "Offer ended",
    claim: "Claim offer",
    claimWa: "Claim on WhatsApp",
    claimTg: "Claim on Telegram",
    heroBadge: (h: string) => `${h} offer · 20% off all plans`,
    pricingTitle: "Holiday prices. Everything included — plus bonuses.",
    pricingSubtitle: (h: string) => `Special ${h} pricing for a limited time.`,
    was: "Regular price",
    save: "You save",
    lockTitle: "Message us before the timer ends. Your price is locked.",
    lockBody: "Send us your business name before the offer closes and we'll lock the holiday price for you.",
    urgency: ["No deposit to lock the price — just a message", "Discount applies to all plans, including Custom", "Bonuses only while the offer is live"],
    codeLabel: "Your offer code",
    codeHint: "Share this code when you message us",
    bonusLabel: "Holiday bonuses",
    bonuses: [
      ["Extra design revision", "+15 days free changes"],
      ["Google Business Profile setup", "+30 extra days of free changes"],
      ["Priority scheduling", "Free strategy call"],
    ],
  },
  why: {
    eyebrow: "Why a website",
    title: "Your customers are already searching. Meet them there.",
    subtitle: "A website works while you sleep — answering questions, showing what you sell and making it easy to contact you.",
    reasons: [
      { title: "Be found on Google", desc: "People search for businesses like yours every day. A website with local SEO helps them find you." },
      { title: "Look established", desc: "A clean, modern site signals that you are serious and trustworthy." },
      { title: "Open 24/7", desc: "Your shop closes at night. Your website answers questions and takes messages while you sleep." },
      { title: "Own your audience", desc: "Social media algorithms change. Your website is yours." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    items: [
      { q: "How fast can you deliver?", a: "Most business sites go live in about 3 days after you approve the free prototype." },
      { q: "Do I need to pay for the prototype?", a: "No. The prototype is free. You only pay if you choose a plan and we build the full site." },
      { q: "Can the site be in Amharic?", a: "Yes. We build bilingual sites (Amharic + English) on the Business plan and above." },
      { q: "Who owns the website?", a: "You do. Domain is registered in your name and the site files are yours." },
      { q: "How do I pay?", a: "Bank transfer, Telebirr or CBE Birr. 50% after prototype approval, 50% when the site is live." },
      { q: "What if I need changes later?", a: "Launch includes 30 days of free changes; Business includes 60 days. After that we can help on a simple hourly or package basis." },
    ],
  },
  cta: {
    title: "Ready to go online?",
    subtitle: "Get your free prototype. No deposit. No obligation.",
    button: "Get free prototype",
  },
  reviews: {
    eyebrow: "Reviews",
    title: "What clients say",
    subtitle: "Real feedback from businesses we work with.",
    items: [
      { name: "Business owner", role: "Furniture store, Addis Ababa", text: "Clear process and a site that finally looks as good as our showroom." },
      { name: "Founder", role: "Local service business", text: "We got a free prototype first, then launched in days. Exactly what we needed." },
    ],
  },
  footer: {
    tagline: "Modern websites for Ethiopian businesses. Free prototype, 3-day delivery.",
    explore: "Explore",
    contact: "Contact",
    location: "Addis Ababa, Ethiopia",
    rights: "© 2026 Firstform. All rights reserved.",
    made: "Designed and built in Ethiopia.",
  },
  floating: { label: "Contact us" },
};

const am: typeof en = {
  ...en,
  nav: {
    work: "ስራዎች",
    services: "የሚገኙት",
    pricing: "ዋጋ",
    why: "ለምን ድረ-ገጽ",
    faq: "ጥያቄዎች",
    contact: "ያግኙን",
    cta: "ነጻ ናሙና ያግኙ",
    langLabel: "ቋንቋ ቀይር",
  },
  pricing: {
    ...en.pricing,
    eyebrow: "ግልጽ ዋጋ",
    title: "ቀላል እቅዶች። ሁሉም ተካትቷል።",
    subtitle: "ምንም የተደበቀ ክፍያ የለም። ከመክፈልዎ በፊት ነጻ ናሙና። በ3 ቀናት ውስጥ ማስጀመር።",
    popular: "በጣም የተመረጠ",
    perProject: "በፕሮጀክት",
    more: "ተጨማሪ አማራጮች",
    less: "ተጨማሪ ደብቅ",
    note: "ዋጋዎች በኢትዮጵያ ብር። Domain እና hosting ማዘጋጀት ተካትቷል።",
    customBadge: "ብጁ ሶፍትዌር",
    customPanelTitle: "ትልቅ ነገር ይፈልጋሉ?",
    customPanelSubtitle: "E-commerce፣ የትምህርት ቤት ሲስተም፣ ፖርታል፣ dashboard፣ ክፍያና ሶፍትዌር።",
    customFootnote: "የሚፈልጉትን ይንገሩን።",
    customTalk: "ስለ ብጁ ይነጋገሩ",
    plans: [
      { name: "Launch", amount: 45000, price: "45,000", currency: "ብር", desc: "ንግድዎን በትክክል ወደ ኦንላይን የሚያመጣ የተተኮረ ድረ-ገጽ።", cta: "ነጻ ናሙና ያግኙ", features: ["አንድ ገጽ (እስከ 6 ክፍሎች)", "ብጁ እና mobile-first ዲዛይን", "WhatsApp፣ Telegram እና ጥሪ", "Google Maps እና basic SEO", "Domain እና hosting ማዘጋጀት", "በ3 ቀናት ማስጀመር", "30 ቀናት ነጻ ለውጦች"] },
      { name: "Business", amount: 90000, price: "90,000", currency: "ብር", desc: "ለማደግ የተዘጋጀ ጠንካራ የድር መገኛ።", cta: "ነጻ ናሙና ያግኙ", features: ["Launch ላይ ያሉት ሁሉ", "እስከ 5 ገጾች", "አማርኛ + እንግሊዝኛ", "የምርት/አገልግሎት ካታሎግ", "Gallery እና contact form", "Google Business Profile ማዘጋጀት", "Advanced local SEO", "60 ቀናት ነጻ ለውጦች"] },
      { name: "Custom", amount: 0, price: "እንገንባው", currency: "", desc: "E-commerce፣ የትምህርት ቤት ሲስተም፣ ፖርታል፣ dashboard፣ ክፍያና ሶፍትዌር።", cta: "የብጁ ሲስተሞችን ይመልከቱ", features: ["ብጁ ዲዛይንና product planning", "CMS፣ e-commerce ወይም business system", "Payments እና integrations", "Admin dashboard እና user roles", "Automation እና API integrations", "የተለየ የጊዜ ሰሌዳና ድጋፍ"] },
      { name: "Starter", amount: 30000, price: "30,000", currency: "ብር", desc: "በ.pro.et domain የሚጀምር ቀላል የኦንላይን መገኛ።", cta: "ስለ Starter ይጠይቁ", hidden: true, features: ["የተተኮረ አንድ-ገጽ ድረ-ገጽ", ".pro.et domain", "Mobile-first አቀራረብ", "WhatsApp / Telegram", "Basic SEO", "Hosting ማዘጋጀት"] },
    ],
    priceRange: "ከ30,000 ብር ጀምሮ · ብጁ ፕሮጀክቶች በግምት",
  },
  footer: {
    tagline: "ለኢትዮጵያ ንግዶች ዘመናዊ ድረ-ገጾች። ነጻ ናሙና፣ በ3 ቀናት ማድረስ።",
    explore: "ያስሱ",
    contact: "ያግኙን",
    location: "አዲስ አበባ፣ ኢትዮጵያ",
    rights: "© 2026 ፈርስትፎርም። መብቱ በህግ የተጠበቀ ነው።",
    made: "በኢትዮጵያ የተነደፈና የተገነባ።",
  },
  floating: { label: "ያግኙን" },
};

export const dict: Record<Lang, typeof en> = { en, am };
export type Dict = typeof en;
