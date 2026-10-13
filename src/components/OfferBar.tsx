import { useLang } from "../context/LanguageContext";
import { useOffer } from "../context/OfferContext";
import { CountdownInline } from "./Countdown";
import { ArrowRight } from "./Icons";

/** Slim announcement bar shown above the navbar while a holiday offer is live. */
export function OfferBar() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();
  if (!offer) return null;

  const h = offer.holiday;
  const headline = offer.phase === "pre" ? t.offer.preTitle(h.name[lang]) : t.offer.duringTitle(h.greeting[lang]);

  return (
    <a
      href="#pricing"
      className="group mb-2 flex items-center justify-center gap-x-3 gap-y-1 rounded-full bg-ink-950 px-4 py-2 text-[12.5px] font-medium text-white shadow-lift ring-1 ring-white/10 transition-colors hover:bg-ink-800 sm:text-[13px]"
      aria-label={`${headline} — ${t.offer.offAll}. ${t.offer.claim}`}
    >
      <span className="inline-flex shrink-0 items-center rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-2 py-0.5 text-[11px] font-bold tracking-wide text-ink-950">
        {t.offer.off}
      </span>
      <span className="min-w-0 truncate">
        <span className="font-semibold">{headline}</span>
        <span className="hidden text-white/70 sm:inline"> · {t.offer.offAll}</span>
      </span>
      <span className="hidden h-3 w-px bg-white/20 md:block" aria-hidden />
      <span className="hidden shrink-0 items-center gap-1.5 text-white/70 md:inline-flex">
        {t.offer.endsIn} <CountdownInline ms={remaining} className="font-semibold text-white" />
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5">
        <span className="hidden sm:inline">{t.offer.claim}</span>
        <ArrowRight width={14} height={14} />
      </span>
    </a>
  );
}
