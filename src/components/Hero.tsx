import { useLang } from "../context/LanguageContext";
import { PROJECTS } from "../i18n";
import { Check, Sparkle } from "./Icons";
import { WhatsAppButton, TelegramButton } from "./ui";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";

const shot = (url: string, w = 1400) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&vpw=1440&vph=900`;

export function Hero() {
  const { lang } = useLang();
  const { offer, remaining } = useOffer();
  const main = PROJECTS[0];
  const side = PROJECTS[1] ?? PROJECTS[0];

  return (
    <section id="top" className="relative overflow-hidden bg-white pb-16 pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.35]" style={{
          backgroundImage: "linear-gradient(to right, rgba(10,10,11,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,11,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 75%)",
        }} />
        <div className="absolute left-1/2 top-24 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-accent-500/[0.06] blur-[100px]" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          {offer && (
            <a href="#pricing" className="hero-offer rise mb-6 inline-flex" style={{ ["--d" as string]: "0ms" }}>
              <span><Sparkle width={12} height={12} /> {lang === "am" ? "20% ቅናሽ" : "20% off"}</span>
              {lang === "am" ? "የበዓል ቅናሽ" : "Holiday offer"}
              <strong><CountdownInline ms={remaining} /></strong>
            </a>
          )}

          <p className="rise text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500" style={{ ["--d" as string]: "60ms" }}>
            {lang === "am" ? "የንግድ ድረ-ገጽ ዲዛይን + ልማት" : "Website design + development for business"}
          </p>

          <h1
            className="rise mt-4 text-[clamp(2.75rem,7.5vw,5.25rem)] font-semibold leading-[0.95] tracking-tightest text-ink-950"
            style={{ ["--d" as string]: "120ms" }}
          >
            {lang === "am" ? (
              <>ንግድዎን <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #0a0a0b" }}>ኦንላይን</span> ያድርጉት።</>
            ) : (
              <>Make your business <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #0a0a0b" }}>look unforgettable.</span></>
            )}
          </h1>

          <p className="rise mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-600 sm:text-[17px]" style={{ ["--d" as string]: "200ms" }}>
            {lang === "am"
              ? "ለኢትዮጵያ ንግዶች ፈጣን፣ ዘመናዊ ድረ-ገጾችን እንገነባለን። ከመክፈልዎ በፊት የንግድዎን ነፃ ናሙና ይመልከቱ።"
              : "We design and build modern websites that make local businesses look established and ready for their next customer. See your free prototype before you pay."}
          </p>

          <div className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ ["--d" as string]: "280ms" }}>
            <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            <TelegramButton size="lg" className="w-full sm:w-auto" />
          </div>

          <div className="rise mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-500" style={{ ["--d" as string]: "340ms" }}>
            <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} className="text-emerald-600" /> {lang === "am" ? "ነፃ ናሙና" : "Free prototype"}</span>
            <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} className="text-emerald-600" /> {lang === "am" ? "3 ቀን ውስጥ" : "Launch in 3 days"}</span>
            <span className="inline-flex items-center gap-1.5"><Check width={14} height={14} className="text-emerald-600" /> {lang === "am" ? "ለሞባይል የተዘጋጀ" : "Mobile-first"}</span>
          </div>
        </div>

        <div className="hero-devices rise relative mx-auto mt-14 max-w-4xl" style={{ ["--d" as string]: "400ms" }}>
          <div className="hero-laptop">
            <div className="hero-laptop-bezel">
              <div className="hero-laptop-cam" />
              <div className="hero-laptop-screen">
                <div className="hero-browser-chrome">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="hero-url-pill">
                    <span className="text-emerald-600">⌁</span>
                    {main.name.toLowerCase().replace(/\s+/g, "")}.com
                  </div>
                </div>
                <img
                  src={shot(main.url, 1400)}
                  alt={`${main.name} website by Firstform`}
                  className="hero-screen-img"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="hero-laptop-base">
              <div className="hero-laptop-notch" />
            </div>
            <div className="hero-laptop-shadow" />
          </div>

          <div className="hero-phone-device">
            <div className="hero-phone-frame">
              <div className="hero-phone-notch" />
              <div className="hero-phone-screen">
                <img
                  src={shot(side.url, 700)}
                  alt={`${side.name} mobile website`}
                  className="hero-phone-img"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="hero-phone-shadow" />
          </div>

          <p className="mt-8 text-center text-[12px] font-medium text-ink-400">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {lang === "am" ? "የእውነተኛ ድረ-ገጾች ቅድመ-ዕይታ" : "Live website previews · Real projects"}
          </p>
        </div>
      </div>
    </section>
  );
}
