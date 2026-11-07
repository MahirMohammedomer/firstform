import { useLang } from "../context/LanguageContext";
import { Check, Sparkle, WhatsAppIcon, ArrowRight } from "./Icons";
import { Button } from "./ui";
import { waLink } from "../i18n";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";

const WORK_IMAGES = [
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85", alt: "Business analytics website", label: "Business website" },
  { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=85", alt: "Mobile web interface", label: "Mobile experience" },
  { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=700&q=85", alt: "E-commerce storefront", label: "Online store" },
];

function DashboardChart() {
  return (
    <svg viewBox="0 0 560 170" className="h-32 w-full sm:h-36" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="pwArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[34, 68, 102, 136].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#eef1f6" strokeWidth="1" />
      ))}
      <path
        d="M0,128 C40,120 60,96 95,100 C130,104 150,70 190,74 C230,78 250,96 285,84 C320,72 340,40 380,46 C420,52 440,30 480,34 C515,37 540,22 560,18 L560,170 L0,170 Z"
        fill="url(#pwArea)"
      />
      <path
        d="M0,128 C40,120 60,96 95,100 C130,104 150,70 190,74 C230,78 250,96 285,84 C320,72 340,40 380,46 C420,52 440,30 480,34 C515,37 540,22 560,18"
        fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"
      />
      <path
        d="M0,148 C50,144 80,132 120,136 C160,140 200,118 240,122 C280,126 320,110 360,112 C400,114 440,98 480,102 C520,106 545,94 560,92"
        fill="none" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round"
      />
      <circle cx="480" cy="34" r="4.5" fill="#2563eb" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();

  const stats = [
    { value: "+38%", label: "Visits" },
    { value: "128", label: "Leads" },
    { value: "24", label: "Orders" },
    { value: "#1", label: "Local rank" },
  ];

  return (
    <section
      id="top"
      className="hero-pw relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#1e3fbf 0%,#2b5fe3 34%,#4f83ee 58%,#9cc2f8 80%,#eaf2fe 92%,#ffffff 100%)",
      }}
    >
      <div className="hero-pw-glow" aria-hidden />
      <div className="pw-clouds" aria-hidden>
        <span className="pw-cloud pw-c1" />
        <span className="pw-cloud pw-c2" />
        <span className="pw-cloud pw-c3" />
        <span className="pw-cloud pw-c4" />
      </div>

      <div className="container-x relative pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Left copy */}
          <div className="max-w-xl">
            {offer && (
              <a
                href="#pricing"
                className="rise inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                style={{ ["--d" as string]: "0ms" }}
              >
                <Sparkle width={12} height={12} /> {t.offer.off} {t.offer.heroBadge(offer.holiday.name[lang])}
                <strong className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-blue-700"><CountdownInline ms={remaining} /></strong>
              </a>
            )}

            <div className="rise mt-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-100" style={{ ["--d" as string]: "60ms" }}>
              <span className="h-px w-8 bg-blue-200/70" />
              {lang === "am" ? "የንግድ ድረ-ገጽ ዲዛይን + ልማት" : "Website design + development for business"}
            </div>

            <h1 className="rise mt-6 text-[2.9rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.3rem]" style={{ ["--d" as string]: "140ms" }}>
              {lang === "am" ? (
                <><span className="block">ንግድዎን</span><span className="block text-blue-100">ኦንላይን</span></>
              ) : (
                <><span className="block">Make your business</span><span className="block text-blue-100">look unforgettable.</span></>
              )}
            </h1>

            <p className="rise mt-6 max-w-lg text-[17px] leading-relaxed text-blue-50/90 sm:text-lg" style={{ ["--d" as string]: "220ms" }}>
              {lang === "am" ? "ለኢትዮጵያ ንግዶች ፈጣን፣ ዘመናዊ እና ለደንበኞች ቀላል የሆኑ ድረ-ገጾችን እንገነባለን። ከመክፈልዎ በፊት የንግድዎን ነፃ ናሙና ይመልከቱ።" : "We design and build fast, modern websites that make your business look established and earn trust — see your own free prototype before you pay a single birr."}
            </p>

            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "300ms" }}>
              <Button variant="white" size="lg" href={waLink(lang, offer?.code)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <WhatsAppIcon width={18} height={18} />
                {t.hero.whatsapp}
              </Button>
              <Button variant="white" size="lg" href="#pricing" arrow className="w-full sm:w-auto">
                {t.nav.cta}
              </Button>
            </div>

            <div className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-blue-50" style={{ ["--d" as string]: "380ms" }}>
              <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} /> {lang === "am" ? "ነፃ ናሙና" : "Free prototype"}</span>
              <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} /> {lang === "am" ? "3 ቀን ውስጥ" : "Launch in 3 days"}</span>
              <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} /> {lang === "am" ? "ለሞባይል የተዘጋጀ" : "Mobile-first"}</span>
            </div>
          </div>

          {/* Right: floating dashboard mockup */}
          <div className="rise relative" style={{ ["--d" as string]: "240ms" }} aria-label="Preview of a Firstform client dashboard">
            <div className="mx-auto w-full max-w-[620px] rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(23,50,140,0.55),0_8px_24px_-12px_rgba(23,50,140,0.35)] ring-1 ring-black/5">
              <div className="flex h-11 items-center gap-4 rounded-t-2xl border-b border-ink-100 bg-ink-50/60 px-4">
                <div className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#dbe4f5]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#bfd3f8]" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]" />
                </div>
                <div className="mx-auto flex max-w-[260px] flex-1 items-center justify-center gap-1.5 rounded-md border border-ink-100 bg-white px-3 py-1 text-[11px] text-ink-400">
                  <span className="text-[9px] text-accent-600">●</span> yourbusiness.com
                </div>
                <span className="text-[11px] tracking-[0.2em] text-ink-300">•••</span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-bold tracking-tight text-ink-950">Your business dashboard</p>
                    <p className="mt-0.5 text-[11px] text-ink-400">Addis Ababa · Open now</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> Live
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-ink-100 bg-ink-50/50 p-3">
                      <p className="text-lg font-bold tracking-tight text-ink-950">{s.value}</p>
                      <p className="mt-0.5 truncate text-[10px] font-medium text-ink-400">{s.label}</p>
                      <p className="mt-1 text-[10px] font-bold text-accent-600">▲ +12%</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-ink-100 p-3">
                  <div className="mb-1 flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">Growth</span>
                    <span className="text-[10px] text-ink-300">30 days</span>
                  </div>
                  <DashboardChart />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {WORK_IMAGES.map((img, i) => (
                    <div key={img.label} className="relative overflow-hidden rounded-lg border border-ink-100">
                      <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <span className="absolute bottom-1 left-1 rounded bg-black/55 px-1.5 py-0.5 text-[8px] font-bold text-white">{String(i + 1).padStart(2, "0")} · {img.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating mini card */}
            <div className="absolute -bottom-6 -left-2 hidden items-center gap-3 rounded-2xl border border-ink-100 bg-white/95 p-3.5 pr-5 shadow-[0_24px_50px_-20px_rgba(23,50,140,0.45)] backdrop-blur sm:flex lg:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-accent-600"><Check width={18} height={18} /></span>
              <span>
                <b className="block text-[13px] font-bold text-ink-950">Prototype ready</b>
                <small className="block text-[11px] text-ink-400">Delivered in 3 days</small>
              </span>
              <ArrowRight width={15} height={15} className="text-ink-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
