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
  {
    id: "attikem",
    url: "https://attikem-furniture-landing-page.vercel.app/",
    name: "Attikem Furniture",
    accent: "from-amber-100 via-orange-50 to-white",
  },
  {
    id: "dream",
    url: "https://dazzling-kataifi-e1bc50.netlify.app/",
    name: "Dream Furniture PLC",
    accent: "from-stone-200 via-stone-100 to-white",
  },
  {
    id: "yegar",
    url: "https://soft-axolotl-afc50d.netlify.app/",
    name: "Yegar Nur",
    accent: "from-yellow-100 via-amber-50 to-white",
  },
  {
    id: "msgroup",
    url: "http://msgroup.page.gd/",
    name: "MS Group",
    accent: "from-sky-100 via-blue-50 to-white",
  },
];

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
    subtitle:
      "Firstform designs and builds fast, modern websites and digital systems for Ethiopian businesses. See your business come alive online before you pay a single birr.",
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
    mock: {
      title: "Your Business Name",
      tag: "Addis Ababa · Open now",
      cta: "Chat on WhatsApp",
      prototype: "Free prototype",
      delivered: "Delivered in 3 days",
    },
  },
  proof: {
    title: "Built for the businesses that keep Ethiopia running",
    items: [
      "Furniture showrooms",
      "Restaurants & cafés",
      "Clinics & pharmacies",
      "Salons & barbers",
      "Hotels & guest houses",
      "Real estate",
      "Schools & training",
      "Construction",
      "Retail shops",
      "Import & export",
      "Car rentals",
      "Law & consulting",
    ],
  },
  services: {
    eyebrow: "Websites → systems → growth",
    title: "We build more than websites.",
    subtitle: "If your business needs a website, online store, management system or a custom digital workflow, Firstform can design and build it around the way you actually work.",
    built: "Built around your workflow",
    items: [
      { title: "Business websites", desc: "Modern, fast, mobile-first websites for Ethiopian businesses, organizations and professionals.", tag: "Web design & development" },
      { title: "E-commerce", desc: "Online shops with products, categories, checkout, orders, delivery workflows and payments.", tag: "Sell online" },
      { title: "School systems", desc: "Student, teacher, class, attendance, fee, result and parent-management workflows.", tag: "Education" },
      { title: "CMS & portals", desc: "Let your team manage pages, news, products, media, members and private content.", tag: "Content & accounts" },
      { title: "Booking systems", desc: "Appointments, rooms, tours, reservations, schedules and availability in one place.", tag: "Bookings" },
      { title: "CRM & dashboards", desc: "Manage leads, customers, staff, operations and reports with custom dashboards.", tag: "Business software" },
      { title: "Payments & integrations", desc: "Connect supported payment providers, APIs, messaging, email and other tools.", tag: "Automation" },
      { title: "SEO & local visibility", desc: "Technical SEO, local search structure, Google Business support and content designed to be discoverable.", tag: "Search" },
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything a modern business site needs. Nothing you don't.",
    subtitle:
      "We keep it focused: a site that looks premium, loads instantly and makes it effortless for customers to reach you.",
    items: [
      {
        title: "Custom design, not a template",
        desc: "Every site is designed around your brand, products and customers — never a copy-paste theme.",
      },
      {
        title: "Mobile-first, always",
        desc: "Most of your customers browse on a phone. Your site is designed there first, and looks perfect everywhere.",
      },
      {
        title: "One-tap WhatsApp & Telegram",
        desc: "Built-in chat and call buttons let customers reach you in seconds — the way Ethiopians already communicate.",
      },
      {
        title: "Found on Google",
        desc: "Local SEO, Google Maps and Google Business setup so nearby customers actually discover you.",
      },
      {
        title: "Amharic + English",
        desc: "Serve locals, diaspora and visitors in the language they prefer, with a single tap.",
      },
      {
        title: "Fast & lightweight",
        desc: "Optimized to load quickly even on slow mobile data — no waiting, no lost customers.",
      },
      {
        title: "Domain & hosting handled",
        desc: "We set up your .com or .et domain, hosting and security certificate. You just approve.",
      },
      {
        title: "Easy to update",
        desc: "Change prices, photos or opening hours by simply messaging us — or we teach you how.",
      },
    ],
  },
  showcase: {
    eyebrow: "Selected work",
    title: "Real sites. Live today.",
    subtitle:
      "Every project below is live on the internet. Open it on your own phone, tap around, and judge for yourself.",
    visit: "Visit live site",
    previewNote: "Live",
    liveNote: "Previews are captured directly from each live website — nothing is mocked up.",
    openPhone: "Tap any project to open it on your phone.",
    filters: ["All", "Furniture", "Business"],
    projects: [
      {
        category: "Furniture showroom",
        desc: "Landing page with product highlights, brand story and one-tap contact.",
        tags: ["Landing page", "Product highlights", "Direct contact"],
      },
      {
        category: "Furniture store · Addis Ababa",
        desc: "Bilingual site with catalog, Google Maps and local SEO structured data.",
        tags: ["Amharic + English", "Google Maps", "Local SEO"],
      },
      {
        category: "Home furnishing store",
        desc: "Full bilingual storefront with categories, services, gallery and FAQ.",
        tags: ["Amharic + English", "Catalog", "Gallery", "FAQ"],
      },
      {
        category: "Company website",
        desc: "Corporate presence with services overview and clear ways to get in touch.",
        tags: ["Corporate", "Services", "Contact"],
      },
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
    subtitle: "Fill this in and send it with one tap. We'll reply with questions (if any) and start on your prototype.",
    name: "Business name",
    namePh: "e.g. Selam Furniture",
    type: "Type of business",
    typePh: "Select one",
    types: [
      "Furniture / Showroom",
      "Restaurant / Café",
      "Clinic / Pharmacy",
      "Salon / Barber",
      "Hotel / Guest house",
      "Real estate",
      "School / Training",
      "Construction",
      "Retail shop",
      "Import / Export",
      "Other",
    ],
    city: "City",
    cityPh: "e.g. Addis Ababa",
    hasSite: "Do you have a website today?",
    hasSiteOptions: ["No, not yet", "Yes, but it needs work"],
    sendWa: "Send via WhatsApp",
    sendTg: "Send via Telegram",
    privacy: "No account, no spam. Your message opens directly in your own WhatsApp or Telegram app.",
    msgIntro: "Hi Firstform! I'd like a free website prototype.",
    msgName: "Business",
    msgType: "Type",
    msgCity: "City",
    msgSite: "Current website",
    msgNone: "Not provided",
  },
  process: {
    eyebrow: "How it works",
    title: "From first message to live website in 3 days.",
    subtitle: "No meetings, no paperwork. Just a conversation on WhatsApp or Telegram.",
    steps: [
      {
        day: "Day 0",
        title: "Say hello",
        desc: "Message us on WhatsApp or Telegram. Tell us your business name and what you do. That's it.",
      },
      {
        day: "Day 1",
        title: "Get your free prototype",
        desc: "Within 24–48 hours we send you a custom prototype of your actual site. No cost, no obligation.",
      },
      {
        day: "Day 2–3",
        title: "Approve & we build",
        desc: "Love it? Choose a plan and we finish the full site — content, photos, contact buttons, SEO.",
      },
      {
        day: "Day 3",
        title: "Go live",
        desc: "Your domain is connected, your site is live, and we show you how to share it with customers.",
      },
    ],
  },
  trust: {
    eyebrow: "Trust, earned honestly",
    title: "No fake reviews. Just proof you can check.",
    subtitle:
      "We're a young studio, and we'd rather show you real work than invent five-star quotes. Here's how we remove the risk for you.",
    points: [
      {
        title: "See it before you pay",
        desc: "Your free prototype is a real preview of your site — not a slideshow, not a promise.",
      },
      {
        title: "Live links, not just screenshots",
        desc: "Every project we show is live on the internet. Open it on your own phone right now.",
      },
      {
        title: "Direct line to the builder",
        desc: "You talk to the person who designs and builds your site. No account managers, no runaround.",
      },
      {
        title: "Clear, fixed prices",
        desc: "Prices in ETB, agreed upfront. No surprise fees at launch.",
      },
      {
        title: "You own everything",
        desc: "Your domain is registered in your name and the site is yours. Leave anytime — take it with you.",
      },
      {
        title: "Pay in two halves",
        desc: "50% after you approve the prototype, 50% when your site is live. Never before you've seen results.",
      },
    ],
    quoteLabel: "A note from Firstform",
    quote:
      "Most local businesses in Ethiopia still don't have a website — not because they don't need one, but because the process felt slow, expensive and confusing. We started Firstform to change that: show you your site first, deliver in days, and speak your language.",
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
    customPanelSubtitle: "Tell us the problem, workflow or idea. We will design the right system instead of forcing your business into a template.",
    customServices: [
      { title: "Content management system", desc: "Manage pages, news, products, photos and content yourself." },
      { title: "School management system", desc: "Students, teachers, classes, attendance, fees, results and parent access." },
      { title: "Online shopping system", desc: "Products, categories, cart, checkout, orders and delivery workflows." },
      { title: "Payment accepting systems", desc: "Connect supported Ethiopian or international payment providers to your workflow." },
      { title: "Booking & reservation", desc: "Appointments, rooms, tours, services, schedules and availability." },
      { title: "CRM & customer portals", desc: "Leads, customers, staff workflows, dashboards and private accounts." },
      { title: "Business dashboards", desc: "Turn your data into useful admin dashboards and reports." },
      { title: "Automation & integrations", desc: "Connect forms, messaging, email, APIs, spreadsheets and business tools." },
      { title: "Mobile apps & web apps", desc: "Custom browser-based applications or mobile products for specific workflows." },
      { title: "SEO & search visibility", desc: "Technical SEO, local SEO, content structure and search-focused landing pages." },
    ],
    customFootnote: "Every custom project gets its own scope, timeline and proposal before development starts.",
    customTalk: "Discuss my project",
    perProject: "one-time",
    plans: [
      {
        name: "Launch", amount: 15000, price: "15,000", currency: "ETB",
        desc: "A focused website that gets your business online properly.", cta: "Get free prototype",
        features: ["One-page website (up to 6 sections)", "Custom, mobile-first design", "WhatsApp, Telegram & call buttons", "Google Maps & basic SEO", "Domain & hosting setup", "3-day delivery", "30 days of free changes"],
      },
      {
        name: "Business", amount: 30000, price: "30,000", currency: "ETB",
        desc: "A stronger web presence for businesses ready to grow.", cta: "Get free prototype",
        features: ["Everything in Launch", "Up to 5 pages", "Amharic + English bilingual", "Product or service catalog", "Photo gallery & contact form", "Google Business Profile setup", "Advanced local SEO", "60 days of free changes"],
      },
      {
        name: "Custom", amount: 0, price: "Let's build it", currency: "",
        desc: "E-commerce, school systems, portals, dashboards, payments and software built around your workflow.", cta: "Explore custom systems",
        features: ["Custom design & product planning", "CMS, e-commerce or business system", "Payments & third-party integrations", "Admin dashboards & user roles", "Automation & API integrations", "Dedicated timeline & support"],
      },
      {
        name: "Starter", amount: 10000, price: "10,000", currency: "ETB",
        desc: "A compact online presence with a .pro.et domain.", cta: "Ask about Starter", hidden: true,
        features: ["Focused one-page website", ".pro.et domain", "Mobile-first layout", "WhatsApp / Telegram contact", "Basic SEO", "Hosting setup"],
      },
    ],
    note: "Optional yearly renewal covers your domain & hosting — quoted transparently before launch.",
    priceRange: "From 10,000 ETB · custom projects quoted separately",
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
    pricingSubtitle: (h: string) => `To celebrate ${h}, every plan is 20% off and comes with extra bonuses. Prices in Ethiopian Birr. The prototype is still free.`,
    was: "Regular price",
    save: "You save",
    bonusLabel: "Holiday bonus",
    codeLabel: "Your offer code",
    codeHint: "Mention it when you message us — or use the buttons and it's added automatically.",
    lockTitle: "Message us before the timer ends. Your price is locked.",
    lockBody:
      "You don't need to decide everything today. Send us your business name before the offer closes and we'll lock the holiday price for you — even if we start building after the holiday.",
    urgency: [
      "No deposit to lock the price — just a message",
      "Free prototype first, as always",
      "Discount applies to all plans, including Custom",
    ],
    units: { d: "days", h: "hrs", m: "min", s: "sec" },
    bonuses: [
      ["Google Business Profile setup (normally Business plan only)", "+30 extra days of free changes (60 total)"],
      ["First-year domain & hosting renewal on us", "+30 extra days of free changes (90 total)", "Free logo refresh & brand colour palette"],
      ["20% off your first milestone", "Free scoping session & written proposal"],
    ],
    dockBadge: "−20%",
  },
  why: {
    eyebrow: "Why now",
    title: "Your customers are already searching. Are they finding you?",
    subtitle: "A website isn't a luxury anymore. It's how people decide who to call.",
    reasons: [
      {
        title: "Open 24/7",
        desc: "Your shop closes at night. Your website answers questions, shows prices and takes messages while you sleep.",
      },
      {
        title: "Own your presence",
        desc: "Facebook pages and Telegram channels can change rules or disappear. A website is yours — forever.",
      },
      {
        title: "Look as good as you are",
        desc: "A professional site makes a small business feel established and trustworthy — before the first call.",
      },
      {
        title: "Reach diaspora & visitors",
        desc: "Ethiopians abroad and tourists search in English. Meet them where they're already looking.",
      },
      {
        title: "Google, not just word of mouth",
        desc: "When someone searches “furniture near me” or “clinic in Bole”, you should be the one they find.",
      },
      {
        title: "Get ahead of competitors",
        desc: "Most local businesses still have no website. Being first is an advantage that won't last forever.",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Everything you might want to know.",
    items: [
      {
        q: "Is the prototype really free?",
        a: "Yes. We build a custom prototype of your website at no cost and with no obligation. If you don't like it, you owe nothing — and you can keep the ideas.",
      },
      {
        q: "How can you deliver a website in 3 days?",
        a: "We start from your approved prototype and a refined design system, and we focus on what actually matters: clarity, speed and easy contact. Larger custom projects take longer — we agree on a timeline before starting.",
      },
      {
        q: "What do you need from me?",
        a: "Your business name, what you offer, your phone/WhatsApp number, location and any photos or logo you have. No photos yet? We'll guide you on what to shoot with your phone.",
      },
      {
        q: "Do I need to understand technology?",
        a: "Not at all. We handle domain, hosting, setup and launch. You just chat with us on WhatsApp or Telegram like you would with a friend.",
      },
      {
        q: "Can I update the site later?",
        a: "Yes. Small changes are free during your support period. After that, message us and we'll update it quickly for a small fee — or we can teach you to do it yourself.",
      },
      {
        q: "How do I pay?",
        a: "Bank transfer, Telebirr or CBE Birr. 50% after you approve the prototype, 50% when your site goes live.",
      },
      {
        q: "Do you work outside Addis Ababa?",
        a: "Yes. Everything happens over WhatsApp, Telegram and phone — we work with businesses anywhere in Ethiopia.",
      },
    ],
  },
  cta: {
    eyebrow: "Start today",
    title: "Ready to see your website?",
    subtitle: "Send us your business name today. Get a free prototype in 24–48 hours.",
    whatsapp: "Chat on WhatsApp",
    telegram: "Message on Telegram",
    call: "Call us",
    micro: "Usually replies within an hour · Mon–Sat",
  },
  footer: {
    tagline: "Modern websites for Ethiopian businesses. Free prototype, 3-day delivery.",
    explore: "Explore",
    contact: "Contact",
    location: "Addis Ababa, Ethiopia",
    rights: "© 2026 Firstform. All rights reserved.",
    made: "Designed & built in Ethiopia.",
  },
  floating: {
    label: "Contact us",
  },
};

const am: typeof en = {
  nav: {
    work: "ሥራዎቻችን",
    services: "የሚያገኙት",
    pricing: "ዋጋ",
    why: "ለምን ድረ-ገጽ",
    faq: "ጥያቄዎች",
    contact: "ያግኙን",
    cta: "ነጻ ናሙና ያግኙ",
    langLabel: "ቋንቋ ይቀይሩ",
  },
  hero: {
    badge: "ነጻ ብጁ ናሙና · ለኢትዮጵያ ንግዶች የተሠራ",
    title1: "ንግድዎ።",
    title2: "እንዲታይ ይገባዋል።",
    title3: "ማስታወቂያ ብቻ አይደለም።",
    subtitle:
      "ፈርስትፎርም ለኢትዮጵያ ንግዶች ዘመናዊ ድረ-ገጾችንና ዲጂታል ሲስተሞችን ይነድፋል፣ ይገነባል። አንድም ብር ከመክፈልዎ በፊት የንግድዎን የራሱ ነጻ ናሙና ይመልከቱ።",
    whatsapp: "በዋትስአፕ ያግኙን",
    telegram: "በቴሌግራም ይላኩ",
    call: "ይደውሉ",
    note: "ለናሙናው ቅድመ ክፍያ አያስፈልግም። ሲወዱት ብቻ ይክፈሉ።",
    stats: [
      { value: "3", unit: "ቀናት", label: "ከማጽደቅ እስከ ማስጀመር" },
      { value: "0", unit: "ብር", label: "ናሙናዎን ለማየት" },
      { value: "2", unit: "ቋንቋዎች", label: "አማርኛ እና እንግሊዝኛ" },
      { value: "24/7", unit: "", label: "ድረ-ገጽዎ በጭራሽ አይዘጋም" },
    ],
    mock: {
      title: "የንግድዎ ስም",
      tag: "አዲስ አበባ · አሁን ክፍት",
      cta: "በዋትስአፕ ያግኙን",
      prototype: "ነጻ ናሙና",
      delivered: "በ3 ቀናት ደርሷል",
    },
  },
  proof: {
    title: "ኢትዮጵያን ለሚያንቀሳቅሱ ንግዶች የተሠራ",
    items: [
      "የፈርኒቸር ሾውሩሞች",
      "ሬስቶራንቶችና ካፌዎች",
      "ክሊኒኮችና ፋርማሲዎች",
      "ሳሎኖችና ፀጉር ቤቶች",
      "ሆቴሎችና ማረፊያዎች",
      "ሪል እስቴት",
      "ት/ቤቶችና ሥልጠና",
      "ኮንስትራክሽን",
      "የችርቻሮ ሱቆች",
      "ኢምፖርት ኤክስፖርት",
      "የመኪና ኪራይ",
      "ሕግና አማካሪ",
    ],
  },
  services: {
    eyebrow: "ድረ-ገጽ → ሲስተም → እድገት",
    title: "ከድረ-ገጽ በላይ እንገነባለን።",
    subtitle: "ንግድዎ ድረ-ገጽ፣ የመስመር ላይ ሱቅ፣ የአስተዳደር ሲስተም ወይም ብጁ የሥራ ሂደት ካስፈለገው፣ በትክክለኛው የንግድዎ አሠራር ላይ እንዲመሠረት እንነድፋለን።",
    built: "በሥራ ሂደትዎ መሠረት የተሠራ",
    items: [
      { title: "የንግድ ድረ-ገጾች", desc: "ለኢትዮጵያ ንግዶች፣ ድርጅቶችና ባለሙያዎች ዘመናዊ፣ ፈጣንና mobile-first ድረ-ገጾች።", tag: "Web design & development" },
      { title: "E-commerce", desc: "ምርቶች፣ ምድቦች፣ checkout፣ ትዕዛዞች፣ ማድረስና ክፍያ።", tag: "Online shop" },
      { title: "የትምህርት ቤት ሲስተሞች", desc: "የተማሪ፣ መምህር፣ ክፍል፣ መገኘት፣ ክፍያ፣ ውጤትና የወላጅ ሂደቶች።", tag: "Education" },
      { title: "CMS እና ፖርታል", desc: "ቡድንዎ ገጾችን፣ ዜናዎችን፣ ምርቶችን፣ ሚዲያንና የግል ይዘትን ያስተዳድር።", tag: "Content & accounts" },
      { title: "Booking ሲስተሞች", desc: "ቀጠሮ፣ ክፍል፣ ጉብኝት፣ reservation፣ ሰሌዳና availability።", tag: "Bookings" },
      { title: "CRM እና dashboards", desc: "ሊድስን፣ ደንበኞችን፣ ሰራተኞችን፣ ሥራዎችንና ሪፖርቶችን በብጁ dashboard ያስተዳድሩ።", tag: "Business software" },
      { title: "Payments እና integrations", desc: "የሚደገፉ የክፍያ አቅራቢዎችን፣ APIs፣ messaging፣ emailና ሌሎች መሳሪያዎችን ያገናኙ።", tag: "Automation" },
      { title: "SEO እና local visibility", desc: "Technical SEO፣ local search መዋቅር፣ Google Business ድጋፍና ለፍለጋ የተዘጋጀ ይዘት።", tag: "Search" },
    ],
  },
  features: {
    eyebrow: "የሚያገኙት",
    title: "ዘመናዊ የንግድ ድረ-ገጽ የሚያስፈልገው ሁሉ። የማያስፈልግዎ ምንም።",
    subtitle:
      "ትኩረት እናደርጋለን፦ ፕሪሚየም የሚመስል፣ ወዲያውኑ የሚጫን እና ደንበኞች በቀላሉ እንዲያገኙዎት የሚያደርግ ድረ-ገጽ።",
    items: [
      {
        title: "ብጁ ዲዛይን፣ ቴምፕሌት አይደለም",
        desc: "እያንዳንዱ ድረ-ገጽ በብራንድዎ፣ በምርቶችዎና በደንበኞችዎ ዙሪያ ይነደፋል — በጭራሽ የተገለበጠ ቴም አይደለም።",
      },
      {
        title: "ሁልጊዜ ለሞባይል ቅድሚያ",
        desc: "አብዛኞቹ ደንበኞችዎ በስልክ ይጎበኛሉ። ድረ-ገጽዎ በመጀመሪያ ለስልክ ይነደፋል፣ በሁሉም ቦታ ፍጹም ይመስላል።",
      },
      {
        title: "በአንድ ንክኪ ዋትስአፕና ቴሌግራም",
        desc: "የተገነቡ የቻትና የጥሪ አዝራሮች ደንበኞች በሰከንዶች እንዲያገኙዎት ያደርጋሉ — ኢትዮጵያውያን በሚግባቡበት መንገድ።",
      },
      {
        title: "በጉግል ይገኙ",
        desc: "የአካባቢ SEO፣ ጉግል ማፕስና ጉግል ቢዝነስ ማዋቀር — በአቅራቢያ ያሉ ደንበኞች በእርግጥ እንዲያገኙዎት።",
      },
      {
        title: "አማርኛ + እንግሊዝኛ",
        desc: "የአካባቢ ነዋሪዎችን፣ ዲያስፖራንና ጎብኚዎችን በሚመርጡት ቋንቋ በአንድ ንክኪ ያገልግሉ።",
      },
      {
        title: "ፈጣንና ቀላል",
        desc: "በዝግተኛ የሞባይል ዳታ እንኳን በፍጥነት እንዲጫን የተመቻቸ — መጠበቅ የለም፣ የሚጠፉ ደንበኞች የሉም።",
      },
      {
        title: "ዶሜንና ሆስቲንግ ተይዞልዎታል",
        desc: "የእርስዎን .com ወይም .et ዶሜን፣ ሆስቲንግና የደህንነት ሰርተፍኬት እናዘጋጃለን። እርስዎ ያጸድቁ ብቻ።",
      },
      {
        title: "ለማዘመን ቀላል",
        desc: "ዋጋዎችን፣ ፎቶዎችን ወይም የሥራ ሰዓታትን በመልእክት ብቻ ይቀይሩ — ወይም እንዴት እንደሚደረግ እናስተምርዎታለን።",
      },
    ],
  },
  showcase: {
    eyebrow: "የተመረጡ ሥራዎች",
    title: "እውነተኛ ድረ-ገጾች። ዛሬ በሥራ ላይ።",
    subtitle:
      "ከዚህ በታች ያሉት ፕሮጀክቶች ሁሉ በኢንተርኔት ላይ በሥራ ላይ ናቸው። በራስዎ ስልክ ይክፈቱ፣ ይጫኑ፣ በራስዎ ይፍረዱ።",
    visit: "ድረ-ገጹን ይጎብኙ",
    previewNote: "ቀጥታ",
    liveNote: "ቅድመ እይታዎቹ ከእያንዳንዱ ቀጥታ ድረ-ገጽ በቀጥታ የተወሰዱ ናቸው — ምንም የተሠራ አይደለም።",
    openPhone: "ማንኛውንም ፕሮጀክት ነክተው በስልክዎ ይክፈቱ።",
    filters: ["ሁሉም", "ፈርኒቸር", "ንግድ"],
    projects: [
      {
        category: "የፈርኒቸር ሾውሩም",
        desc: "የምርት ማድመቂያዎች፣ የብራንድ ታሪክና በአንድ ንክኪ ግንኙነት ያለው ማረፊያ ገጽ።",
        tags: ["ማረፊያ ገጽ", "የምርት ማድመቂያ", "ቀጥተኛ ግንኙነት"],
      },
      {
        category: "የፈርኒቸር መደብር · አዲስ አበባ",
        desc: "ካታሎግ፣ ጉግል ማፕስና የአካባቢ SEO ያለው ባለሁለት ቋንቋ ድረ-ገጽ።",
        tags: ["አማርኛ + እንግሊዝኛ", "ጉግል ማፕስ", "የአካባቢ SEO"],
      },
      {
        category: "የቤት ዕቃ መደብር",
        desc: "ምድቦች፣ አገልግሎቶች፣ ጋለሪና ጥያቄዎች ያሉት ሙሉ ባለሁለት ቋንቋ የመደብር ገጽ።",
        tags: ["አማርኛ + እንግሊዝኛ", "ካታሎግ", "ጋለሪ", "ጥያቄዎች"],
      },
      {
        category: "የድርጅት ድረ-ገጽ",
        desc: "የአገልግሎት አጠቃላይ እይታና ግልጽ የመገናኛ መንገዶች ያሉት የድርጅት ገጽ።",
        tags: ["ድርጅታዊ", "አገልግሎቶች", "ግንኙነት"],
      },
    ],
  },
  compare: {
    eyebrow: "ያወዳድሩ",
    title: "ንግዶች ፈርስትፎርምን ለምን ይመርጣሉ።",
    subtitle: "አማራጮችዎን በታማኝነት ይመልከቱ።",
    cols: ["ፈርስትፎርም", "የተለመደ ኤጀንሲ", "ማህበራዊ ሚዲያ ብቻ"],
    rows: [
      { label: "ከመክፈል በፊት ድረ-ገጽዎን ማየት", values: ["ነጻ ናሙና", "መጀመሪያ ቅድመ ክፍያ", "—"] },
      { label: "እስከ ማስጀመር ያለው ጊዜ", values: ["3 ቀናት", "3–8 ሳምንታት", "ወዲያውኑ፣ ግን የእርስዎ አይደለም"] },
      { label: "ዋጋ", values: ["ቋሚ፣ በብር", "ግምት + ተጨማሪዎች", "ነጻ"] },
      { label: "በጉግል መገኘት", values: ["አዎ፣ የአካባቢ SEO", "አንዳንዴ", "ብዙም አይደለም"] },
      { label: "አማርኛ + እንግሊዝኛ", values: ["ተካትቷል", "ተጨማሪ ክፍያ", "በእጅ"] },
      { label: "ባለቤትነት", values: ["ዶሜንና ድረ-ገጽ የእርስዎ", "በአብዛኛው", "ፕላትፎርሙ ባለቤት ነው"] },
      { label: "እንዴት እንደሚያገኙን", values: ["ዋትስአፕ / ቴሌግራም", "ኢሜይልና ስብሰባ", "—"] },
    ],
  },
  form: {
    eyebrow: "ነጻ ናሙናዎን ይጠይቁ",
    title: "ስለ ንግድዎ ይንገሩን። ቀሪውን እኛ እናደርጋለን።",
    subtitle: "ይህንን ሞልተው በአንድ ንክኪ ይላኩ። ጥያቄ ካለን እንመልሳለን፣ ናሙናዎን እንጀምራለን።",
    name: "የንግድ ስም",
    namePh: "ለምሳሌ፦ ሰላም ፈርኒቸር",
    type: "የንግድ ዓይነት",
    typePh: "አንዱን ይምረጡ",
    types: [
      "ፈርኒቸር / ሾውሩም",
      "ሬስቶራንት / ካፌ",
      "ክሊኒክ / ፋርማሲ",
      "ሳሎን / ፀጉር ቤት",
      "ሆቴል / ማረፊያ",
      "ሪል እስቴት",
      "ት/ቤት / ሥልጠና",
      "ኮንስትራክሽን",
      "የችርቻሮ ሱቅ",
      "ኢምፖርት / ኤክስፖርት",
      "ሌላ",
    ],
    city: "ከተማ",
    cityPh: "ለምሳሌ፦ አዲስ አበባ",
    hasSite: "ዛሬ ድረ-ገጽ አለዎት?",
    hasSiteOptions: ["የለም፣ ገና", "አዎ፣ ግን መሻሻል ያስፈልገዋል"],
    sendWa: "በዋትስአፕ ይላኩ",
    sendTg: "በቴሌግራም ይላኩ",
    privacy: "አካውንት የለም፣ ስፓም የለም። መልእክትዎ በራስዎ ዋትስአፕ ወይም ቴሌግራም መተግበሪያ ውስጥ በቀጥታ ይከፈታል።",
    msgIntro: "ሰላም ፈርስትፎርም! ነጻ የድረ-ገጽ ናሙና እፈልጋለሁ።",
    msgName: "ንግድ",
    msgType: "ዓይነት",
    msgCity: "ከተማ",
    msgSite: "አሁን ያለ ድረ-ገጽ",
    msgNone: "አልተሰጠም",
  },
  process: {
    eyebrow: "እንዴት እንደሚሠራ",
    title: "ከመጀመሪያ መልእክት እስከ ቀጥታ ድረ-ገጽ በ3 ቀናት።",
    subtitle: "ስብሰባ የለም፣ ወረቀት የለም። በዋትስአፕ ወይም በቴሌግራም ውይይት ብቻ።",
    steps: [
      {
        day: "ቀን 0",
        title: "ሰላም ይበሉ",
        desc: "በዋትስአፕ ወይም በቴሌግራም ይላኩልን። የንግድዎን ስምና ምን እንደሚሠሩ ይንገሩን። ያ ብቻ ነው።",
      },
      {
        day: "ቀን 1",
        title: "ነጻ ናሙናዎን ያግኙ",
        desc: "በ24–48 ሰዓታት ውስጥ የራስዎን ድረ-ገጽ ብጁ ናሙና እንልክልዎታለን። ክፍያ የለም፣ ግዴታ የለም።",
      },
      {
        day: "ቀን 2–3",
        title: "ያጽድቁ፣ እኛ እንገንባ",
        desc: "ወደዱት? ዕቅድ ይምረጡ፣ ሙሉ ድረ-ገጹን እንጨርሳለን — ይዘት፣ ፎቶዎች፣ የግንኙነት አዝራሮች፣ SEO።",
      },
      {
        day: "ቀን 3",
        title: "በቀጥታ ይሂዱ",
        desc: "ዶሜንዎ ተገናኝቷል፣ ድረ-ገጽዎ በሥራ ላይ ነው፣ ለደንበኞች እንዴት እንደሚያጋሩ እናሳይዎታለን።",
      },
    ],
  },
  trust: {
    eyebrow: "በታማኝነት የተገኘ እምነት",
    title: "የውሸት ግምገማዎች የሉም። ማረጋገጥ የሚችሉት ማስረጃ ብቻ።",
    subtitle:
      "ወጣት ስቱዲዮ ነን፤ የፈጠራ ባለአምስት ኮከብ ግምገማዎችን ከመፍጠር ይልቅ እውነተኛ ሥራ ማሳየትን እንመርጣለን። ስጋቱን እንዴት እንደምናስወግድልዎ ይህ ነው።",
    points: [
      {
        title: "ከመክፈልዎ በፊት ይመልከቱ",
        desc: "ነጻ ናሙናዎ የድረ-ገጽዎ እውነተኛ ቅድመ እይታ ነው — ስላይድ ሾው አይደለም፣ ተስፋ አይደለም።",
      },
      {
        title: "ቀጥታ ሊንኮች፣ ስክሪንሾት ብቻ አይደለም",
        desc: "የምናሳየው እያንዳንዱ ፕሮጀክት በኢንተርኔት ላይ በሥራ ላይ ነው። አሁኑኑ በራስዎ ስልክ ይክፈቱ።",
      },
      {
        title: "ከሠሪው ጋር ቀጥተኛ መስመር",
        desc: "ድረ-ገጽዎን ከሚነድፈውና ከሚገነባው ሰው ጋር ይነጋገራሉ። አካውንት ማናጀር የለም፣ መዞር የለም።",
      },
      {
        title: "ግልጽ፣ ቋሚ ዋጋዎች",
        desc: "ዋጋዎች በብር፣ አስቀድሞ የተስማማንበት። በማስጀመሪያ ጊዜ ድንገተኛ ክፍያ የለም።",
      },
      {
        title: "ሁሉም ነገር የእርስዎ ነው",
        desc: "ዶሜንዎ በስምዎ ይመዘገባል፣ ድረ-ገጹም የእርስዎ ነው። በማንኛውም ጊዜ ይውጡ — ይዘውት ይሂዱ።",
      },
      {
        title: "በሁለት ግማሽ ይክፈሉ",
        desc: "ናሙናውን ካጸደቁ በኋላ 50%፣ ድረ-ገጽዎ በሥራ ላይ ሲውል 50%። ውጤት ከማየትዎ በፊት በጭራሽ።",
      },
    ],
    quoteLabel: "ከፈርስትፎርም ማስታወሻ",
    quote:
      "በኢትዮጵያ ያሉ አብዛኞቹ የአካባቢ ንግዶች አሁንም ድረ-ገጽ የላቸውም — ስለማያስፈልጋቸው ሳይሆን፣ ሂደቱ ዘገምተኛ፣ ውድና ግራ አጋቢ ስለሚመስል ነው። ፈርስትፎርምን የጀመርነው ይህንን ለመቀየር ነው፦ ድረ-ገጽዎን መጀመሪያ እናሳይዎታለን፣ በቀናት ውስጥ እናደርሳለን፣ በቋንቋዎ እንነጋገራለን።",
    cta: "ማንኛውንም ይጠይቁን",
    ctaLine: "አሁንም እርግጠኛ አይደሉም? መጀመሪያ ያናግሩን — ማሳመን የለም፣ ታማኝ መልሶች ብቻ።",
  },
  pricing: {
    eyebrow: "የመጀመሪያ ምርጫዎን ይምረጡ",
    title: "በቀላሉ ይጀምሩ። ሲያስፈልግ ያሳድጉ።",
    subtitle: "ከቀላል የንግድ ድረ-ገጽ እስከ ሙሉ ዲጂታል ሲስተም። ናሙናው ሁልጊዜ ነጻ ነው።",
    popular: "በጣም የሚመከር",
    more: "ተጨማሪ አማራጭ",
    less: "ተጨማሪውን ደብቅ",
    customBadge: "የንግድዎን ፍላጎት በትክክል የሚከተል",
    customTitle: "ብጁ ዲጂታል ሲስተሞች",
    customSubtitle: "ተራ ድረ-ገጽ በቂ ካልሆነ የንግድዎን ሥራ የሚያስኬደውን ሲስተም እንገነባለን።",
    customCta: "የብጁ ሲስተሞችን ይመልከቱ",
    customPanelTitle: "Firstform ምን ሊገነባልዎት ይችላል?",
    customPanelSubtitle: "ችግሩን፣ የሥራ ሂደቱን ወይም ሀሳቡን ይንገሩን። ንግድዎን ከቴምፕሌት ጋር ከማስገደድ ይልቅ ተስማሚውን ሲስተም እንነድፋለን።",
    customServices: [
      { title: "የይዘት አስተዳደር ሲስተም", desc: "ገጾች፣ ዜናዎች፣ ምርቶች፣ ፎቶዎችና ይዘቶችን እርስዎ ማስተዳደር።" },
      { title: "የትምህርት ቤት አስተዳደር", desc: "ተማሪዎች፣ መምህራን፣ ክፍሎች፣ መገኘት፣ ክፍያ፣ ውጤትና የወላጅ መዳረሻ።" },
      { title: "የመስመር ላይ ሱቅ", desc: "ምርቶች፣ ምድቦች፣ ጋሪ፣ checkout፣ ትዕዛዝና የማድረስ ሂደት።" },
      { title: "የክፍያ መቀበያ ሲስተሞች", desc: "የሚደገፉ የኢትዮጵያ ወይም ዓለም አቀፍ የክፍያ አቅራቢዎችን ከሥራዎ ጋር ማገናኘት።" },
      { title: "ቦታ ማስያዣ", desc: "ቀጠሮዎች፣ ክፍሎች፣ ጉብኝቶች፣ አገልግሎቶችና የጊዜ ሰሌዳዎች።" },
      { title: "CRM እና የደንበኛ ፖርታል", desc: "ሊድስ፣ ደንበኞች፣ የሰራተኛ ሂደቶች፣ dashboardsና የግል መለያዎች።" },
      { title: "የንግድ Dashboard", desc: "መረጃዎን ወደ ጠቃሚ የአስተዳደር ማሳያዎችና ሪፖርቶች መቀየር።" },
      { title: "Automation እና Integrations", desc: "Forms፣ messaging፣ email፣ APIs፣ spreadsheetsና የንግድ መሳሪያዎችን ማገናኘት።" },
      { title: "Mobile እና Web Apps", desc: "ለተለየ የሥራ ሂደት ብጁ web application ወይም mobile product።" },
      { title: "SEO እና የፍለጋ ታይነት", desc: "Technical SEO፣ local SEO፣ የይዘት መዋቅርና ለፍለጋ የተዘጋጁ ገጾች።" },
    ],
    customFootnote: "እያንዳንዱ ብጁ ፕሮጀክት ከልማት በፊት የራሱ ወሰን፣ የጊዜ ሰሌዳና ፕሮፖዛል ይኖረዋል።",
    customTalk: "ስለ ፕሮጀክቴ እንወያይ",
    perProject: "አንድ ጊዜ",
    plans: [
      { name: "Launch", amount: 15000, price: "15,000", currency: "ብር", desc: "ንግድዎን በትክክል ወደ ኦንላይን የሚያመጣ የተተኮረ ድረ-ገጽ።", cta: "ነጻ ናሙና ያግኙ", features: ["አንድ ገጽ (እስከ 6 ክፍሎች)", "ብጁ እና mobile-first ዲዛይን", "WhatsApp፣ Telegram እና ጥሪ", "Google Maps እና basic SEO", "Domain እና hosting ማዘጋጀት", "በ3 ቀናት ማስጀመር", "30 ቀናት ነጻ ለውጦች"] },
      { name: "Business", amount: 30000, price: "30,000", currency: "ብር", desc: "ለማደግ የተዘጋጀ ጠንካራ የድር መገኛ።", cta: "ነጻ ናሙና ያግኙ", features: ["Launch ላይ ያሉት ሁሉ", "እስከ 5 ገጾች", "አማርኛ + እንግሊዝኛ", "የምርት/አገልግሎት ካታሎግ", "Gallery እና contact form", "Google Business Profile ማዘጋጀት", "Advanced local SEO", "60 ቀናት ነጻ ለውጦች"] },
      { name: "Custom", amount: 0, price: "እንገንባው", currency: "", desc: "E-commerce፣ የትምህርት ቤት ሲስተም፣ ፖርታል፣ dashboard፣ ክፍያና ሶፍትዌር።", cta: "የብጁ ሲስተሞችን ይመልከቱ", features: ["ብጁ ዲዛይንና product planning", "CMS፣ e-commerce ወይም business system", "Payments እና integrations", "Admin dashboard እና user roles", "Automation እና API integrations", "የተለየ የጊዜ ሰሌዳና ድጋፍ"] },
      { name: "Starter", amount: 10000, price: "10,000", currency: "ብር", desc: "በ.pro.et domain የሚጀምር ቀላል የኦንላይን መገኛ።", cta: "ስለ Starter ይጠይቁ", hidden: true, features: ["የተተኮረ አንድ-ገጽ ድረ-ገጽ", ".pro.et domain", "Mobile-first አቀራረብ", "WhatsApp / Telegram", "Basic SEO", "Hosting ማዘጋጀት"] },
    ],
    note: "ዓመታዊ እድሳት የdomain እና hosting ወጪን ይሸፍናል — ከማስጀመርዎ በፊት ግልጽ ዋጋ እንሰጣለን።",
    priceRange: "ከ10,000 ብር ጀምሮ · ብጁ ፕሮጀክቶች በግምት",
  },
  offer: {
    label: "የበዓል ቅናሽ",
    off: "20% ቅናሽ",
    offAll: "በሁሉም ዕቅዶች 20% ቅናሽ",
    preTitle: (h: string) => `${h} ተቃርቧል`,
    duringTitle: (g: string) => g,
    barText: (h: string) => `ለ${h} በሁሉም የድረ-ገጽ ዕቅዶች 20% ቅናሽ`,
    endsIn: "የሚያበቃው በ",
    ended: "ቅናሹ አብቅቷል",
    claim: "ቅናሹን ይውሰዱ",
    claimWa: "በዋትስአፕ ይውሰዱ",
    claimTg: "በቴሌግራም ይውሰዱ",
    heroBadge: (h: string) => `የ${h} ቅናሽ · በሁሉም ዕቅዶች 20%`,
    pricingTitle: "የበዓል ዋጋዎች። ሁሉም ተካትቷል — ከጉርሻ ጋር።",
    pricingSubtitle: (h: string) => `${h}ን ለማክበር እያንዳንዱ ዕቅድ 20% ቅናሽ አለው፣ ተጨማሪ ጉርሻዎችም አሉት። ዋጋዎች በኢትዮጵያ ብር። ናሙናው አሁንም ነጻ ነው።`,
    was: "መደበኛ ዋጋ",
    save: "የሚቆጥቡት",
    bonusLabel: "የበዓል ጉርሻ",
    codeLabel: "የቅናሽ ኮድዎ",
    codeHint: "ሲልኩልን ይጥቀሱት — ወይም አዝራሮቹን ይጠቀሙ፣ በራስ-ሰር ይታከላል።",
    lockTitle: "ሰዓቱ ከማለቁ በፊት ይላኩልን። ዋጋዎ ይቆለፋል።",
    lockBody:
      "ዛሬ ሁሉንም መወሰን አያስፈልግዎትም። ቅናሹ ከመዘጋቱ በፊት የንግድዎን ስም ይላኩልን፣ የበዓሉን ዋጋ እንቆልፍልዎታለን — ከበዓሉ በኋላ መገንባት ብንጀምርም እንኳ።",
    urgency: [
      "ዋጋ ለመቆለፍ ቅድመ ክፍያ አያስፈልግም — መልእክት ብቻ",
      "እንደ ሁልጊዜው መጀመሪያ ነጻ ናሙና",
      "ቅናሹ ብጁን ጨምሮ በሁሉም ዕቅዶች ላይ ይሠራል",
    ],
    units: { d: "ቀን", h: "ሰዓት", m: "ደቂቃ", s: "ሰከንድ" },
    bonuses: [
      ["ጉግል ቢዝነስ ፕሮፋይል ማዋቀር (በመደበኛ በቢዝነስ ዕቅድ ብቻ)", "+30 ተጨማሪ ቀናት ነጻ ለውጦች (በድምሩ 60)"],
      ["የመጀመሪያ ዓመት ዶሜንና ሆስቲንግ እድሳት በእኛ", "+30 ተጨማሪ ቀናት ነጻ ለውጦች (በድምሩ 90)", "ነጻ የሎጎ ማደስና የብራንድ ቀለም ምርጫ"],
      ["በመጀመሪያው ደረጃ 20% ቅናሽ", "ነጻ የወሰን ውይይትና የጽሑፍ ፕሮፖዛል"],
    ],
    dockBadge: "−20%",
  },
  why: {
    eyebrow: "ለምን አሁን",
    title: "ደንበኞችዎ አስቀድመው እየፈለጉ ነው። እርስዎን እያገኙ ነው?",
    subtitle: "ድረ-ገጽ ከአሁን በኋላ ቅንጦት አይደለም። ሰዎች ማንን እንደሚደውሉ የሚወስኑበት መንገድ ነው።",
    reasons: [
      {
        title: "24/7 ክፍት",
        desc: "ሱቅዎ በሌሊት ይዘጋል። ድረ-ገጽዎ እርስዎ ሲተኙ ጥያቄዎችን ይመልሳል፣ ዋጋዎችን ያሳያል፣ መልእክቶችን ይቀበላል።",
      },
      {
        title: "የራስዎ ይሁን",
        desc: "የፌስቡክ ገጾችና የቴሌግራም ቻናሎች ደንቦችን ሊቀይሩ ወይም ሊጠፉ ይችላሉ። ድረ-ገጽ የእርስዎ ነው — ለዘላለም።",
      },
      {
        title: "እንደሆኑት ያማሩ",
        desc: "ሙያዊ ድረ-ገጽ ትንሽ ንግድን የተቋቋመና ታማኝ ያስመስላል — ከመጀመሪያው ጥሪ በፊት።",
      },
      {
        title: "ዲያስፖራንና ጎብኚዎችን ይድረሱ",
        desc: "በውጭ ያሉ ኢትዮጵያውያንና ቱሪስቶች በእንግሊዝኛ ይፈልጋሉ። አስቀድመው በሚፈልጉበት ቦታ ያግኟቸው።",
      },
      {
        title: "ጉግል፣ በአፍ ወሬ ብቻ አይደለም",
        desc: "አንድ ሰው “በአቅራቢያዬ ፈርኒቸር” ወይም “ቦሌ ክሊኒክ” ሲፈልግ፣ የሚያገኘው እርስዎን መሆን አለበት።",
      },
      {
        title: "ከተወዳዳሪዎች ይቅደሙ",
        desc: "አብዛኞቹ የአካባቢ ንግዶች አሁንም ድረ-ገጽ የላቸውም። ቀዳሚ መሆን ለዘላለም የማይቆይ ጥቅም ነው።",
      },
    ],
  },
  faq: {
    eyebrow: "ጥያቄዎች",
    title: "ማወቅ የሚፈልጉት ሁሉ።",
    items: [
      {
        q: "ናሙናው በእውነት ነጻ ነው?",
        a: "አዎ። የድረ-ገጽዎን ብጁ ናሙና ያለ ክፍያና ያለ ግዴታ እንሠራለን። ካልወደዱት ምንም አይከፍሉም — ሃሳቦቹንም መያዝ ይችላሉ።",
      },
      {
        q: "እንዴት በ3 ቀናት ድረ-ገጽ ማድረስ ትችላላችሁ?",
        a: "ከጸደቀው ናሙናዎና ከተጣራ የዲዛይን ሥርዓት እንጀምራለን፣ በእውነት አስፈላጊ በሆነው ላይ እናተኩራለን፦ ግልጽነት፣ ፍጥነትና ቀላል ግንኙነት። ትላልቅ ብጁ ፕሮጀክቶች ረዘም ያለ ጊዜ ይወስዳሉ — ከመጀመራችን በፊት በጊዜ ሰሌዳ እንስማማለን።",
      },
      {
        q: "ከእኔ ምን ያስፈልጋችኋል?",
        a: "የንግድዎ ስም፣ የሚያቀርቡት፣ ስልክ/ዋትስአፕ ቁጥርዎ፣ አድራሻዎ እና ያሉዎት ፎቶዎች ወይም ሎጎ። ገና ፎቶ የለም? በስልክዎ ምን እንደሚያነሱ እንመራዎታለን።",
      },
      {
        q: "ቴክኖሎጂ መረዳት አለብኝ?",
        a: "በጭራሽ። ዶሜን፣ ሆስቲንግ፣ ማዋቀርና ማስጀመርን እኛ እንይዛለን። እርስዎ ከጓደኛ ጋር እንደሚያደርጉት በዋትስአፕ ወይም በቴሌግራም ከእኛ ጋር ይወያዩ ብቻ።",
      },
      {
        q: "ድረ-ገጹን በኋላ ማዘመን እችላለሁ?",
        a: "አዎ። በድጋፍ ጊዜዎ ውስጥ ትናንሽ ለውጦች ነጻ ናቸው። ከዚያ በኋላ መልእክት ይላኩልን፣ በትንሽ ክፍያ በፍጥነት እናዘምናለን — ወይም እራስዎ እንዲያደርጉ እናስተምርዎታለን።",
      },
      {
        q: "እንዴት እከፍላለሁ?",
        a: "በባንክ ዝውውር፣ በቴሌብር ወይም በሲቢኢ ብር። ናሙናውን ካጸደቁ በኋላ 50%፣ ድረ-ገጽዎ በሥራ ላይ ሲውል 50%።",
      },
      {
        q: "ከአዲስ አበባ ውጭ ትሠራላችሁ?",
        a: "አዎ። ሁሉም ነገር በዋትስአፕ፣ በቴሌግራምና በስልክ ይከናወናል — በኢትዮጵያ በማንኛውም ቦታ ካሉ ንግዶች ጋር እንሠራለን።",
      },
    ],
  },
  cta: {
    eyebrow: "ዛሬ ይጀምሩ",
    title: "ድረ-ገጽዎን ለማየት ዝግጁ ነዎት?",
    subtitle: "የንግድዎን ስም ዛሬ ይላኩልን። በ24–48 ሰዓታት ውስጥ ነጻ ናሙና ያግኙ።",
    whatsapp: "በዋትስአፕ ያግኙን",
    telegram: "በቴሌግራም ይላኩ",
    call: "ይደውሉልን",
    micro: "በአብዛኛው በአንድ ሰዓት ውስጥ እንመልሳለን · ሰኞ–ቅዳሜ",
  },
  footer: {
    tagline: "ለኢትዮጵያ ንግዶች ዘመናዊ ድረ-ገጾች። ነጻ ናሙና፣ በ3 ቀናት ማድረስ።",
    explore: "ያስሱ",
    contact: "ያግኙን",
    location: "አዲስ አበባ፣ ኢትዮጵያ",
    rights: "© 2026 ፈርስትፎርም። መብቱ በህግ የተጠበቀ ነው።",
    made: "በኢትዮጵያ የተነደፈና የተገነባ።",
  },
  floating: {
    label: "ያግኙን",
  },
};

export const dict: Record<Lang, typeof en> = { en, am };
export type Dict = typeof en;
