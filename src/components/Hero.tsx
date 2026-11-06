import { useLang } from "../context/LanguageContext";
import { Check, Sparkle, ArrowUpRight } from "./Icons";
import { WhatsAppButton, TelegramButton } from "./ui";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";

const WORK_IMAGES = [
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85", alt: "Business analytics website", label: "Business website" },
  { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=85", alt: "Mobile web interface", label: "Mobile experience" },
  { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=700&q=85", alt: "E-commerce storefront", label: "Online store" },
];

export function Hero() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();

  return (
    <section id="top" className="hero-sky relative overflow-hidden">
      {/* Atmosphere: photo sky, star veil, overhead violet bloom and perspective floor */}
      <div className="hero-ambient" aria-hidden>
        <div className="hero-sky-photo" />
        <div className="hero-star-veil" />
        <div className="hero-aurora" />
        <div className="hero-perspective">
          <div className="hero-perspective-grid" />
          <div className="hero-perspective-fade" />
        </div>
      </div>

      <div className="container-x relative">
        {offer && (
          <a href="#pricing" className="hero-offer rise mb-6" style={{ ["--d" as string]: "0ms" }}>
            <span><Sparkle width={12} height={12} /> {t.offer.off}</span>
            {t.offer.heroBadge(offer.holiday.name[lang])}
            <strong><CountdownInline ms={remaining} /></strong>
          </a>
        )}

        {/* ---------------------------------------------------- centered copy */}
        <div className="hero-stage">
          <div className="hero-copy rise" style={{ ["--d" as string]: "40ms" }}>
            <div className="hero-kicker">
              <span className="hero-kicker-line" />
              <span>{t.hero.kicker}</span>
              <span className="hero-kicker-line hero-kicker-line-right" />
            </div>

            <h1 className="hero-title rise" style={{ ["--d" as string]: "120ms" }}>
              {/* A literal space keeps the accessible name intact even though the
                  spans are block-level. */}
              <span>
                {t.hero.titleLine1}
              </span>{" "}
              <span className="hero-title-outline">{t.hero.titleLine2}</span>
            </h1>

            <p className="hero-subtitle rise" style={{ ["--d" as string]: "220ms" }}>
              {t.hero.subtitleText}
            </p>

            <div className="hero-actions rise" style={{ ["--d" as string]: "320ms" }}>
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
              <TelegramButton size="lg" className="w-full sm:w-auto" />
            </div>

            <div className="hero-trustline rise" style={{ ["--d" as string]: "400ms" }}>
              <span><Check width={14} height={14} /> {t.hero.trustFree}</span>
              <span><Check width={14} height={14} /> {t.hero.trustDays}</span>
              <span><Check width={14} height={14} /> {t.hero.trustMobile}</span>
            </div>
          </div>

          {/* --------------------------------------- product stage (below copy) */}
          <div className="hero-visual rise" style={{ ["--d" as string]: "240ms" }} aria-label={t.hero.visualAria}>
            <div className="hero-visual-halo" aria-hidden />

            {/* Laptop / desktop browser — the anchor of the composition */}
            <div className="hero-browser">
              <div className="hero-browser-top">
                <div className="hero-browser-dots"><i /><i /><i /></div>
                <div className="hero-address"><span className="hero-lock">⌑</span> yourbusiness.com</div>
                <span className="hero-browser-menu">•••</span>
              </div>
              <div className="hero-site-preview">
                <div className="hero-site-nav"><span className="hero-site-logo">your<span>brand.</span></span><span>About&nbsp;&nbsp;&nbsp; Services&nbsp;&nbsp;&nbsp; Contact</span><b>Let's talk ↗</b></div>
                <div className="hero-site-body">
                  <div className="hero-site-copy"><span className="hero-site-eyebrow">MADE FOR WHAT'S NEXT</span><strong>Build a brand<br />people remember.</strong><p>Thoughtful digital experiences for ambitious businesses.</p><span className="hero-site-button">Explore our work&nbsp; ↗</span></div>
                  <div className="hero-site-photo"><img src={WORK_IMAGES[0].src} alt={WORK_IMAGES[0].alt} loading="eager" /></div>
                </div>
                <div className="hero-site-foot"><span>DESIGNED WITH PURPOSE</span><span>01 — 03</span></div>
              </div>
              <div className="hero-browser-base" aria-hidden><span /></div>
            </div>

            {/* Phone — overlaps the right edge of the laptop */}
            <div className="hero-mobile-card">
              <div className="hero-phone">
                <div className="hero-phone-notch" />
                <div className="hero-phone-screen">
                  <span className="hero-phone-brand">yourbrand.</span>
                  <img src={WORK_IMAGES[1].src} alt={WORK_IMAGES[1].alt} loading="lazy" />
                  <b>Made to move<br />your business.</b>
                  <span className="hero-phone-cta">Get started ↗</span>
                  <div className="hero-phone-lines"><i /><i /><i /></div>
                </div>
              </div>
            </div>

            {/* Work card — overlaps the left edge, in front of the laptop */}
            <div className="hero-floating-card hero-work-card">
              <div className="hero-card-head"><span className="hero-card-mark">F.</span><span><b>Selected work</b><small>Recent digital projects</small></span><ArrowUpRight width={16} height={16} /></div>
              <div className="hero-mini-projects">{WORK_IMAGES.map((img, i) => <div className="hero-mini-project" key={img.label}><img src={img.src} alt={img.alt} loading="lazy" /><span>{String(i + 1).padStart(2, "0")}</span></div>)}</div>
              <div className="hero-card-foot"><span className="hero-live-dot" /> <span>Design that works harder.</span></div>
            </div>
          </div>

          {/* Status pill — sits clear of the laptop base, below the composition */}
          <div className="hero-status-pill">
            <span className="hero-pulse-dot" />
            <span>{t.hero.visualLabel}</span>
          </div>
        </div>
      </div>

      <div className="hero-floor-fade" aria-hidden />
    </section>
  );
}
