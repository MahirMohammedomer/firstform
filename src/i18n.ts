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
    services: "Services",
    work: "Work",
    process: "Process",
    pricing: "Pricing",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    cta: "Free prototype",
  },
  pricing: {
    eyebrow: "Transparent pricing",
    title: "Simple plans. Everything included.",
    subtitle: "No hidden fees. Free prototype before you pay. Launch in as little as 3 days.",
    popular: "Most popular",
    perProject: "per project",
    more: "Show Starter plan",
    less: "Hide Starter plan",
    note: "Prices in Ethiopian Birr. Domain and first-year hosting setup included. Custom projects quoted separately.",
    customBadge: "Custom software",
    customPanelTitle: "Need something bigger?",
    customPanelSubtitle: "E-commerce, school systems, portals, dashboards, payments and custom software.",
    customFootnote: "Tell us what you need and we will map the right approach.",
    customTalk: "Talk about custom",
    customServices: [
      { title: "E-commerce", desc: "Online stores with payments and inventory." },
      { title: "School systems", desc: "Student, staff and parent portals." },
      { title: "Business dashboards", desc: "Turn your data into useful admin dashboards and reports." },
    ],
    plans: [
      {
        name: "Launch",
        amount: 45000,
        price: "45,000",
        currency: "ETB",
        desc: "A focused website that puts your business online the right way.",
        cta: "Get free prototype",
        features: [
          "One page (up to 6 sections)",
          "Custom mobile-first design",
          "WhatsApp, Telegram and call",
          "Google Maps and basic SEO",
          "Domain and hosting setup",
          "Launch in 3 days",
          "30 days of free changes",
        ],
      },
      {
        name: "Business",
        amount: 90000,
        price: "90,000",
        currency: "ETB",
        desc: "A stronger web presence built to grow with you.",
        cta: "Get free prototype",
        features: [
          "Everything in Launch",
          "Up to 5 pages",
          "Amharic + English bilingual",
          "Product or service catalog",
          "Photo gallery & contact form",
          "Google Business Profile setup",
          "Advanced local SEO",
          "60 days of free changes",
        ],
      },
      {
        name: "Custom",
        amount: 0,
        price: "Let's build it",
        currency: "",
        desc: "E-commerce, school systems, portals, dashboards, payments and software.",
        cta: "See custom systems",
        features: [
          "Custom design and product planning",
          "CMS, e-commerce or business system",
          "Payments and integrations",
          "Admin dashboard and user roles",
          "Automation and API integrations",
          "Dedicated timeline and support",
        ],
      },
      {
        name: "Starter",
        amount: 30000,
        price: "30,000",
        currency: "ETB",
        desc: "A compact online presence with a .pro.et domain.",
        cta: "Ask about Starter",
        hidden: true,
        features: [
          "Focused one-page website",
          ".pro.et domain",
          "Mobile-first approach",
          "WhatsApp / Telegram",
          "Basic SEO",
          "Hosting setup",
        ],
      },
    ],
    priceRange: "From 30,000 ETB · custom projects quoted separately",
  },
  offer: {
    label: "Holiday offer",
    off: "20% off",
    offAll: "20% off every website plan",
    endsIn: "Offer ends in",
    claim: "Claim with code",
    claimWa: "Claim on WhatsApp",
    claimTg: "Claim on Telegram",
    preTitle: (h: string) => `${h} is coming — lock your price early`,
    pricingTitle: "Holiday prices. Everything included — plus bonuses.",
    pricingSubtitle: (h: string) => `Special ${h} pricing for a limited time.`,
    was: "Regular price",
    save: "You save",
    lockTitle: "Message us before the timer ends. Your price is locked.",
    lockBody:
      "You don't need to decide everything today. Send us your business name before the offer closes and we'll lock the holiday price for you — even if we start building after the holiday.",
    urgency: [
      "No deposit to lock the price — just a message",
      "Discount applies to all plans, including Custom",
      "Bonuses only while the offer is live",
    ],
    codeLabel: "Your offer code",
    codeHint: "Share this code when you message us",
    bonusLabel: "Holiday bonuses",
    bonuses: [
      ["Extra design revision", "+15 days free changes"],
      ["Google Business Profile setup (normally Business plan only)", "+30 extra days of free changes (60 total)"],
      ["Priority scheduling", "Free strategy call"],
    ],
  },
  hero: { title: "", subtitle: "" },
  services: { eyebrow: "Services", title: "What we build", subtitle: "", items: [] as { title: string; desc: string; tag: string }[] },
  why: { eyebrow: "Why Firstform", title: "Built for local businesses", subtitle: "", items: [] as { title: string; desc: string }[] },
  process: { eyebrow: "Process", title: "How it works", subtitle: "", steps: [] as { title: string; desc: string }[] },
  proof: { eyebrow: "Proof", title: "Real results", items: [] as { value: string; label: string }[] },
  reviews: { eyebrow: "Reviews", title: "What clients say", subtitle: "", items: [] as { name: string; role: string; text: string }[] },
  faq: { eyebrow: "FAQ", title: "Common questions", items: [] as { q: string; a: string }[] },
  cta: { title: "Ready to go online?", subtitle: "", button: "Get free prototype" },
  footer: {
    tagline: "Websites for Ethiopian businesses.",
    rights: "© 2026 Firstform. All rights reserved.",
    made: "Designed and built in Ethiopia.",
  },
  floating: { label: "Contact" },
  compare: { eyebrow: "", title: "", subtitle: "", items: [] as any[] },
  features: { eyebrow: "", title: "", subtitle: "", items: [] as any[] },
  showcase: { eyebrow: "", title: "", subtitle: "", filters: [] as string[], items: [] as any[] },
  trust: { items: [] as string[] },
};

const am: typeof en = {
  ...en,
  nav: {
    services: "አገልግሎቶች",
    work: "ስራዎች",
    process: "ሂደት",
    pricing: "ዋጋ",
    reviews: "ግምገማዎች",
    faq: "ጥያቄዎች",
    contact: "ያግኙን",
    cta: "ነጻ ናሙና",
  },
  pricing: {
    ...en.pricing,
    eyebrow: "ግልጽ ዋጋ",
    title: "ቀላል እቅዶች። ሁሉም ተካትቷል።",
    subtitle: "ምንም የተደበቀ ክፍያ የለም። ከመክፈልዎ በፊት ነጻ ናሙና። በ3 ቀናት ውስጥ ማስጀመር።",
    popular: "በጣም የተመረጠ",
    perProject: "በፕሮጀክት",
    more: "Starter እቅድ አሳይ",
    less: "Starter ደብቅ",
    note: "ዋጋዎች በኢትዮጵያ ብር። Domain እና የመጀመሪያ ዓመት hosting ማዘጋጀት ተካትቷል።",
    customBadge: "ብጁ ሶፍትዌር",
    customPanelTitle: "ትልቅ ነገር ይፈልጋሉ?",
    customPanelSubtitle: "E-commerce፣ የትምህርት ቤት ሲስተም፣ ፖርታል፣ dashboard፣ ክፍያና ሶፍትዌር።",
    customFootnote: "የሚፈልጉትን ይንገሩን እና ትክክለኛውን አቀራረብ እናስቀምጣለን።",
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
    tagline: "ለኢትዮጵያ ንግዶች ድረ-ገጾች።",
    rights: "© 2026 ፈርስትፎርም። መብቱ በህግ የተጠበቀ ነው።",
    made: "በኢትዮጵያ የተነደፈና የተገነባ።",
  },
  floating: { label: "ያግኙን" },
};

export const dict: Record<Lang, typeof en> = { en, am };
export type Dict = typeof en;
