import { useLang } from "../context/LanguageContext";
import { CONTACT, waLink } from "../i18n";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./Icons";
import { useOffer } from "../context/OfferContext";

/* Gravity-style isometric illustration: server cubes + floating browser card */
function IsoArt() {
  const cube = (cx: number, cy: number, s: number, top: string, left: string, right: string) => {
    const w = s * 0.866;
    const h = s * 0.5;
    const N = `${cx},${cy - h * 2}`;
    const E = `${cx + w},${cy - h}`;
    const S = `${cx},${cy}`;
    const W = `${cx - w},${cy - h}`;
    return (
      <g>
        <polygon points={`${N} ${E} ${S} ${W}`} fill={top} />
        <polygon points={`${W} ${S} ${cx},${cy + s} ${cx - w},${cy - h + s}`} fill={left} />
        <polygon points={`${E} ${S} ${cx},${cy + s} ${cx + w},${cy - h + s}`} fill={right} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 520 400" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ctaCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>
      </defs>
      {/* ground grid */}
      {[60, 120, 180, 240, 300, 360].map((y) => (
        <line key={y} x1="40" y1={y} x2="480" y2={y} stroke="#e8eaf3" strokeWidth="1" />
      ))}
      {[40, 110, 180, 250, 320, 390, 460].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="380" stroke="#e8eaf3" strokeWidth="1" />
      ))}
      {/* connection lines + dots */}
      <path d="M150 260 L260 200 L370 250 L260 200 L260 120" stroke="#c7cbf0" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      {[[150, 260], [370, 250], [260, 120]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#a5b4fc" />
      ))}
      {/* cubes */}
      {cube(150, 250, 46, "#c4b5fd", "#7c3aed", "#5b21b6")}
      {cube(370, 240, 46, "#c4b5fd", "#7c3aed", "#5b21b6")}
      {cube(260, 190, 64, "#ddd6fe", "#8b5cf6", "#6d28d9")}
      {/* gear on the big cube's right face */}
      <g transform="translate(292 205) scale(0.9)">
        <circle r="14" fill="#fff" opacity="0.92" />
        <circle r="5" fill="#6d28d9" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1={Math.cos((a * Math.PI) / 180) * 6} y1={Math.sin((a * Math.PI) / 180) * 6} x2={Math.cos((a * Math.PI) / 180) * 12} y2={Math.sin((a * Math.PI) / 180) * 12} stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>
      {/* floating browser card */}
      <g transform="translate(330 60)">
        <rect x="0" y="0" width="150" height="100" rx="12" fill="url(#ctaCard)" stroke="#e0e4f5" strokeWidth="1.5" />
        <rect x="0" y="0" width="150" height="22" rx="12" fill="#eef2ff" />
        <circle cx="14" cy="11" r="3" fill="#f4a39d" />
        <circle cx="25" cy="11" r="3" fill="#f1cf75" />
        <circle cx="36" cy="11" r="3" fill="#8bc7a0" />
        <rect x="14" y="34" width="52" height="8" rx="4" fill="#6366f1" />
        <rect x="14" y="50" width="122" height="6" rx="3" fill="#e5e9f8" />
        <rect x="14" y="62" width="100" height="6" rx="3" fill="#e5e9f8" />
        <path d="M14 88 L40 74 L62 82 L92 66 L136 72" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
      <circle cx="90" cy="90" r="5" fill="#fbbf24" />
      <circle cx="450" cy="320" r="5" fill="#a5b4fc" />
      <circle cx="60" cy="330" r="4" fill="#f9a8d4" />
    </svg>
  );
}

export function CTA() {
  const { t, lang } = useLang();
  const { offer } = useOffer();

  return (
    <section id="contact" className="cta-split-wrap scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <Reveal dir="scale">
        <div className="cta-split mx-auto grid max-w-7xl items-center gap-10 overflow-hidden lg:grid-cols-2">
          {/* Left: brand lockup + copy + pill CTA (Gravity style) */}
          <div className="px-7 py-12 sm:px-12 lg:py-20">
            <div className="cta-brand">
              <span className="cta-brand-mark">F</span>
              <span className="cta-brand-name">Firstform</span>
            </div>
            <h2 className="mt-7 max-w-md text-balance text-[2rem] font-medium leading-[1.15] tracking-tight text-ink-700 sm:text-[2.6rem]">
              {t.cta.title}{" "}
              <b className="font-bold text-ink-950">{lang === "am" ? t.cta.eyebrow : "before you pay."}</b>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-500">{t.cta.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={waLink(lang, offer?.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill"
              >
                {t.nav.cta}
                <ArrowRight width={16} height={16} />
              </a>
              <a href={`tel:${CONTACT.phoneIntl}`} className="text-[14px] font-semibold text-ink-400 transition hover:text-ink-700">
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 text-[13px] text-ink-400">{t.cta.micro}</p>
          </div>

          {/* Right: isometric illustration */}
          <div className="cta-art px-4 pb-8 lg:px-8 lg:pb-0" aria-hidden>
            <IsoArt />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
