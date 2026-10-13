import { useMemo, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useOffer } from "../context/OfferContext";
import { CONTACT } from "../i18n";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";
import { Check, TelegramIcon, WhatsAppIcon, Sparkle, Clock, Shield } from "./Icons";
import { cn } from "../utils/cn";

const inputCls =
  "h-12 w-full rounded-2xl border border-ink-200 bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-300 hover:border-ink-300 focus:border-ink-950 focus:ring-4 focus:ring-ink-950/8 focus:outline-none";

export function PrototypeForm() {
  const { t, lang } = useLang();
  const { offer } = useOffer();
  const f = t.form;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [hasSite, setHasSite] = useState(0);

  const message = useMemo(() => {
    const lines = [
      f.msgIntro,
      "",
      `${f.msgName}: ${name.trim() || f.msgNone}`,
      `${f.msgType}: ${type || f.msgNone}`,
      `${f.msgCity}: ${city.trim() || f.msgNone}`,
      `${f.msgSite}: ${f.hasSiteOptions[hasSite]}`,
    ];
    if (offer) lines.push(lang === "am" ? `የቅናሽ ኮድ፡ ${offer.code}` : `Offer code: ${offer.code}`);
    return lines.join("\n");
  }, [name, type, city, hasSite, f, offer, lang]);

  const encoded = encodeURIComponent(message);
  const waHref = `${CONTACT.whatsapp}?text=${encoded}`;
  const tgHref = `${CONTACT.telegram}?text=${encoded}`;

  const perks = [
    { icon: Sparkle, en: "Free custom prototype", am: "ነጻ ብጁ ናሙና" },
    { icon: Clock, en: "Reply within 24–48h", am: "በ24–48 ሰዓት ውስጥ መልስ" },
    { icon: Shield, en: "No obligation", am: "ምንም ግዴታ የለም" },
  ];

  return (
    <section id="prototype" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal dir="left">
              <SectionHeader align="left" eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} />
            </Reveal>
            <Reveal dir="left" delay={120}>
              <ul className="mt-8 space-y-3">
                {perks.map((p) => (
                  <li key={p.en} className="flex items-center gap-3 text-[15px] text-ink-700">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-white">
                      <p.icon width={15} height={15} />
                    </span>
                    {lang === "am" ? p.am : p.en}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal dir="scale" delay={100}>
            <form
              className="relative rounded-[28px] border border-ink-900/8 bg-white p-5 shadow-lift sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waHref, "_blank", "noopener,noreferrer");
              }}
            >
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent-100/60 blur-3xl" aria-hidden />
              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{f.name}</span>
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder={f.namePh} autoComplete="organization" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{f.type}</span>
                  <span className="relative block">
                    <select className={cn(inputCls, "appearance-none pr-10", !type && "text-ink-400")} value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="">{f.typePh}</option>
                      {f.types.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-700">{f.city}</span>
                  <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder={f.cityPh} autoComplete="address-level2" />
                </label>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-1.5 block text-[13px] font-medium text-ink-700">{f.hasSite}</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {f.hasSiteOptions.map((o, i) => (
                      <button
                        type="button"
                        key={o}
                        onClick={() => setHasSite(i)}
                        aria-pressed={hasSite === i}
                        className={cn(
                          "flex h-12 items-center justify-center gap-2 rounded-2xl border px-3 text-[14px] font-medium transition-all duration-300",
                          hasSite === i ? "border-ink-950 bg-ink-950 text-white" : "border-ink-200 bg-white text-ink-700 hover:border-ink-400",
                        )}
                      >
                        {hasSite === i && <Check width={14} height={14} />}
                        <span className="truncate">{o}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-6 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:bg-[#1fbf5b] active:scale-[0.98]"
                >
                  <WhatsAppIcon width={18} height={18} /> {f.sendWa}
                </a>
                <a
                  href={tgHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-[#2aabee] px-6 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(42,171,238,0.6)] transition-all duration-300 hover:bg-[#1d9bdc] active:scale-[0.98]"
                >
                  <TelegramIcon width={18} height={18} /> {f.sendTg}
                </a>
              </div>
              <p className="relative mt-4 text-center text-[12px] leading-relaxed text-ink-400">{f.privacy}</p>
              <button type="submit" className="sr-only">
                {f.sendWa}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
