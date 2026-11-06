import { useLang } from "../context/LanguageContext";
import { Check, Sparkle } from "./Icons";
import { WhatsAppButton, TelegramButton } from "./ui";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";

const WORK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    alt: "Modern business dashboard",
    label: "Business sites",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    alt: "Mobile website design",
    label: "Mobile-first",
  },
  {
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
    alt: "E-commerce website",
    label: "E-commerce",
  },
  {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    alt: "Clean website design",
    label: "Clean design",
  },
];

export function Hero() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();

  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-32 sm:pt-36 lg:pt-40">
      {/* Ambient background + strong perspective lines */}
      <div className="hero-ambient" aria-hidden>
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        {/* Strong growing perspective lines (Wope-style) */}
        <div className="hero-perspective">
          <div className="hero-perspective-grid" />
          <div className="hero-perspective-fade" />
        </div>
      </div>

      <div className="container-x relative">
        {/* Text content */}
        <div className="mx-auto max-w-4xl text-center">
          {offer && (
            <a
              href="#pricing"
              className="hero-offer rise"
              style={{ ["--d" as string]: "0ms" }}
            >
              <span>
                <Sparkle width={12} height={12} /> {t.offer.off}
              </span>
              {t.offer.heroBadge(offer.holiday.name[lang])}
              <strong>
                <CountdownInline ms={remaining} />
              </strong>
            </a>
          )}

          <div
            className="rise hero-kicker"
            style={{ ["--d" as string]: offer ? "80ms" : "0ms" }}
          >
            <span className="hero-kicker-line" />
            <span>
              {lang === "am"
                ? "የንግድ ድረ-ገጽ ዲዛይን + ልማት"
                : "WEBSITE DESIGN + DEVELOPMENT FOR BUSINESS"}
            </span>
            <span className="hero-kicker-line" />
          </div>

          <h1
            className="rise hero-title"
            style={{ ["--d" as string]: offer ? "160ms" : "80ms" }}
          >
            {lang === "am" ? (
              <>
                <span>ንግድዎን</span>
                <span className="hero-title-outline">ኦንላይን</span>
              </>
            ) : (
              <>
                <span>Make your business</span>
                <span className="hero-title-outline">look unforgettable.</span>
              </>
            )}
          </h1>

          <p
            className="rise hero-subtitle"
            style={{ ["--d" as string]: "260ms" }}
          >
            {lang === "am"
              ? "ለኢትዮጵያ ንግዶች ፈጣን፣ ዘመናዊ እና ለደንበኞች ቀላል የሆኑ ድረ-ገጾችን እንገነባለን። ከመክፈልዎ በፊት የንግድዎን ነፃ ናሙና ይመልከቱ።"
              : "We design and build modern websites that make local businesses look established, credible and ready for their next customer. See your own free prototype before you pay."}
          </p>

          <div
            className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ ["--d" as string]: "360ms" }}
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            <TelegramButton size="lg" className="w-full sm:w-auto" />
          </div>

          <div
            className="rise hero-trustline"
            style={{ ["--d" as string]: "440ms" }}
          >
            <span>
              <Check width={14} height={14} />{" "}
              {lang === "am" ? "ነፃ ናሙና" : "Free prototype"}
            </span>
            <span>
              <Check width={14} height={14} />{" "}
              {lang === "am" ? "3 ቀን ውስጥ" : "Launch in 3 days"}
            </span>
            <span>
              <Check width={14} height={14} />{" "}
              {lang === "am" ? "ለሞባይል የተዘጋጀ" : "Mobile-first"}
            </span>
          </div>
        </div>

        {/* Image collection sitting on the perspective lines */}
        <div className="hero-gallery rise" style={{ ["--d" as string]: "520ms" }}>
          <div className="hero-gallery-track">
            {WORK_IMAGES.map((img, i) => (
              <div
                key={i}
                className="hero-gallery-card"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="hero-gallery-img-wrap">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="hero-gallery-label">{img.label}</div>
              </div>
            ))}
          </div>

          <div className="hero-gallery-caption">
            <span className="hero-pulse-dot" />
            {lang === "am"
              ? "የምንገነባቸው ድረ-ገጾች"
              : "Websites we design & build"}
          </div>
        </div>
      </div>
    </section>
  );
}
