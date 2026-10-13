import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { PROJECTS } from "../i18n";
import { ArrowUpRight, Check, Sparkle } from "./Icons";
import { WhatsAppButton, TelegramButton } from "./ui";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";
import { cn } from "../utils/cn";

const shot = (url: string, width = 1400) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&vpw=1440&vph=1000`;

function BrowserPreview({ url, name, className = "", mobile = false }: { url: string; name: string; className?: string; mobile?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("hero-browser overflow-hidden", mobile ? "hero-phone" : "", className)}>
      <div className="hero-browserbar">
        <div className="flex gap-1.5">
          <span className="hero-dot bg-[#ff5f57]" /><span className="hero-dot bg-[#febc2e]" /><span className="hero-dot bg-[#28c840]" />
        </div>
        <div className="hero-url"><span className="hero-lock">⌁</span>{name.toLowerCase().replace(/ /g, "")}.com</div>
        <span className="hero-live"><i /> LIVE</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-100 via-white to-ink-200" />}
        <img
          src={shot(url, mobile ? 700 : 1400)}
          alt={`${name} website designed and built by Firstform`}
          loading={mobile ? "lazy" : "eager"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={cn("absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000", loaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0")}
        />
      </div>
    </div>
  );
}

function HeroWorkWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      setPointer({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
    };
    const leave = () => setPointer({ x: 0, y: 0 });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);

  const transform = (x: number, y: number, depth: number, base = "") => ({ transform: `${base} translate3d(${x * depth}px, ${y * depth}px, 0)` });

  return (
    <div ref={ref} className="hero-workwall" aria-label="Examples of websites built by Firstform">
      <div className="hero-orbit hero-orbit-a" />
      <div className="hero-orbit hero-orbit-b" />

      <div className="hero-project-label hero-project-label-a" style={transform(pointer.x, pointer.y, -9)}>
        <span className="hero-project-index">01</span>
        <span>Furniture</span>
      </div>
      <div className="hero-project-label hero-project-label-b" style={transform(pointer.x, pointer.y, 8)}>
        <span className="hero-project-index">02</span>
        <span>Business</span>
      </div>

      <div className="hero-main-browser" style={transform(pointer.x, pointer.y, 12, "translateX(-50%)")}>
        <BrowserPreview url={PROJECTS[0].url} name={PROJECTS[0].name} />
        <div className="hero-browser-caption">
          <span><b>Attikem Furniture</b> · responsive website</span>
          <ArrowUpRight width={15} height={15} />
        </div>
      </div>

      <div className="hero-side-browser hero-side-left" style={transform(pointer.x, pointer.y, -18, "rotate(-7deg)")}>
        <BrowserPreview url={PROJECTS[1].url} name={PROJECTS[1].name} />
      </div>
      <div className="hero-side-browser hero-side-right" style={transform(pointer.x, pointer.y, 22, "rotate(7deg)")}>
        <BrowserPreview url={PROJECTS[2].url} name={PROJECTS[2].name} />
      </div>

      <div className="hero-phone-card" style={transform(pointer.x, pointer.y, 28, "rotate(3deg)")}>
        <BrowserPreview url={PROJECTS[0].url} name={PROJECTS[0].name} mobile />
        <div className="hero-phone-notch" />
      </div>

      <div className="hero-cursor" style={{ transform: `translate3d(${pointer.x * 22}px, ${pointer.y * 22}px, 0)` }}>
        <span />
        <b>Firstform</b>
      </div>

      <div className="hero-work-pill">
        <span className="hero-pulse-dot" />
        <span>Real websites. Real businesses.</span>
      </div>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-36 sm:pt-40 lg:pt-44">
      <div className="hero-ambient" aria-hidden>
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-6xl text-center">
          {offer && (
            <a href="#pricing" className="hero-offer rise" style={{ ["--d" as string]: "0ms" }}>
              <span><Sparkle width={12} height={12} /> {t.offer.off}</span>
              {t.offer.heroBadge(offer.holiday.name[lang])}
              <strong><CountdownInline ms={remaining} /></strong>
            </a>
          )}

          <div className="rise hero-kicker" style={{ ["--d" as string]: offer ? "100ms" : "0ms" }}>
            <span className="hero-kicker-line" />
            <span>{lang === "am" ? "የንግድ ድረ-ገጽ ዲዛይን + ልማት" : "WEBSITE DESIGN + DEVELOPMENT FOR BUSINESS"}</span>
            <span className="hero-kicker-line" />
          </div>

          <h1 className="rise hero-title" style={{ ["--d" as string]: offer ? "180ms" : "100ms" }}>
            <span>{lang === "am" ? "ንግድዎን" : "Make your business"}</span>
            <span className="hero-title-outline">{lang === "am" ? "ኦንላይን" : "look unforgettable."}</span>
          </h1>

          <p className="rise hero-subtitle" style={{ ["--d" as string]: "280ms" }}>
            {lang === "am"
              ? "ለኢትዮጵያ ንግዶች ፈጣን፣ ዘመናዊ እና ለደንበኞች ቀላል የሆኑ ድረ-ገጾችን እንገነባለን። ከመክፈልዎ በፊት የንግድዎን ነፃ ናሙና ይመልከቱ።"
              : "We design and build modern websites that make local businesses look established, credible and ready for their next customer. See your own free prototype before you pay."}
          </p>

          <div className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ ["--d" as string]: "380ms" }}>
            <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            <TelegramButton size="lg" className="w-full sm:w-auto" />
          </div>

          <div className="rise hero-trustline" style={{ ["--d" as string]: "460ms" }}>
            <span><Check width={14} height={14} /> {lang === "am" ? "ነፃ ናሙና" : "Free prototype"}</span>
            <span><Check width={14} height={14} /> {lang === "am" ? "3 ቀን ውስጥ" : "Launch in 3 days"}</span>
            <span><Check width={14} height={14} /> {lang === "am" ? "ለሞባይል የተዘጋጀ" : "Mobile-first"}</span>
          </div>
        </div>

        <HeroWorkWall />

        <div className="rise hero-bottom-note" style={{ ["--d" as string]: "900ms" }}>
          <div className="hero-bottom-line" />
          <span>{lang === "am" ? "የምንሰራውን ይመልከቱ" : "Scroll to see what we build"}</span>
          <span className="hero-scroll-arrow">↓</span>
          <div className="hero-bottom-line" />
        </div>
      </div>
    </section>
  );
}
