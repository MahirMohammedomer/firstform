import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { PROJECTS } from "../i18n";
import { Check, Sparkle } from "./Icons";
import { WhatsAppButton, TelegramButton } from "./ui";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";
import { cn } from "../utils/cn";

const shot = (url: string, width = 1600) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&vpw=1440&vph=900`;

function MainBrowser({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="hero-main-preview">
      <div className="hero-browserbar">
        <div className="flex gap-1.5">
          <span className="hero-dot bg-[#ff5f57]" />
          <span className="hero-dot bg-[#febc2e]" />
          <span className="hero-dot bg-[#28c840]" />
        </div>
        <div className="hero-url">
          <span className="hero-lock">⌁</span>
          {name.toLowerCase().replace(/ /g, "")}.com
        </div>
        <span className="hero-live">
          <i /> LIVE
        </span>
      </div>
      <div className="relative aspect-[16/9.5] overflow-hidden bg-ink-100">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-100 via-white to-ink-200" />
        )}
        <img
          src={shot(url)}
          alt={`${name} website designed and built by Firstform`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000",
            loaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
          )}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();

  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-32 sm:pt-36 lg:pt-40">
      {/* Ambient background */}
      <div className="hero-ambient" aria-hidden>
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-platform-glow" />
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

        {/* Floating product preview + platform */}
        <div className="hero-preview-wrap rise" style={{ ["--d" as string]: "520ms" }}>
          <div className="hero-platform" aria-hidden>
            <div className="hero-platform-grid" />
            <div className="hero-platform-fade" />
          </div>

          <div className="hero-preview-card">
            <MainBrowser url={PROJECTS[0].url} name={PROJECTS[0].name} />
            <div className="hero-preview-caption">
              <span>
                <b>{PROJECTS[0].name}</b> · live website by Firstform
              </span>
              <span className="hero-preview-badge">
                <i /> Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
