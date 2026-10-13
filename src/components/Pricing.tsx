import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useOffer } from "../context/OfferContext";
import { fmtETB, tgLink, waLink } from "../i18n";
import { Reveal } from "./Reveal";
import { Button, SectionHeader } from "./ui";
import { Check, Sparkle, Gift, Copy, WhatsAppIcon, TelegramIcon, Shield, ArrowUpRight, X } from "./Icons";
import { CountdownBoxes } from "./Countdown";
import { cn } from "../utils/cn";

function OfferStrip() {
  const { t, lang } = useLang();
  const { offer, remaining } = useOffer();
  const [copied, setCopied] = useState(false);
  if (!offer) return null;
  const h = offer.holiday;
  const headline = offer.phase === "pre" ? t.offer.preTitle(h.name[lang]) : h.greeting[lang];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — code is still visible */
    }
  };

  return (
    <Reveal dir="scale" className="mt-12 sm:mt-14">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-950 p-6 text-white shadow-lift sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="drift absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-amber-400/25 blur-[120px]" />
          <div className="drift-slow absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-accent-500/25 blur-[120px]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-ink-950">
              <Sparkle width={12} height={12} /> {t.offer.label} · {t.offer.off}
            </span>
            <h3 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tightest sm:text-4xl">{headline}</h3>
            <p className="mt-2 text-lg text-white/70">{t.offer.offAll}</p>

            <div className="mt-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.offer.endsIn}</p>
              <CountdownBoxes ms={remaining} light className="mt-3" />
            </div>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={waLink(lang, offer.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,0.6)] transition-all hover:bg-[#1fbf5b] active:scale-[0.98]"
              >
                <WhatsAppIcon width={18} height={18} /> {t.offer.claimWa}
              </a>
              <a
                href={tgLink(lang, offer.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 text-[15px] font-medium text-white ring-1 ring-white/20 transition-all hover:bg-white/15 active:scale-[0.98]"
              >
                <TelegramIcon width={18} height={18} /> {t.offer.claimTg}
              </a>
            </div>
          </div>

          <div className="rounded-[22px] bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink-950">
                <Shield width={18} height={18} />
              </span>
              <div>
                <p className="text-[17px] font-semibold leading-snug">{t.offer.lockTitle}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">{t.offer.lockBody}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
              {t.offer.urgency.map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-[14px] text-white/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <Check width={11} height={11} />
                  </span>
                  {u}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{t.offer.codeLabel}</p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <span className="font-mono text-xl font-semibold tracking-wider">{offer.code}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-[13px] font-medium text-ink-950 transition hover:bg-ink-100"
                >
                  {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
                  {copied ? "✓" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-[12px] text-white/50">{t.offer.codeHint}</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  const { t, lang } = useLang();
  const [showStarter, setShowStarter] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const { offer, price, saving } = useOffer();
  const h = offer?.holiday;

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-ink-50/70 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" aria-hidden />
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow={offer ? `${t.offer.label} · ${t.offer.off}` : t.pricing.eyebrow}
            title={offer ? t.offer.pricingTitle : t.pricing.title}
            subtitle={offer && h ? t.offer.pricingSubtitle(h.name[lang]) : t.pricing.subtitle}
          />
        </Reveal>

        <OfferStrip />

        <div className={cn("grid gap-5 lg:grid-cols-3 lg:items-stretch", offer ? "mt-8 sm:mt-10" : "mt-14 sm:mt-16")}>
          {t.pricing.plans.filter((plan) => !plan.hidden || showStarter).map((plan, i) => {
            const popular = i === 0;
            const custom = plan.name === "Custom";
            const discounted = offer && plan.amount > 0 ? price(plan.amount) : null;
            const saved = offer && plan.amount > 0 ? saving(plan.amount) : 0;
            const bonuses = offer ? (t.offer.bonuses[i] ?? []) : [];
            return (
              <Reveal key={plan.name} delay={i * 110} dir="scale" className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[28px] p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8",
                    popular
                      ? "bg-ink-950 text-white shadow-lift ring-1 ring-ink-950 lg:-my-3 lg:scale-[1.02] hover:lg:scale-[1.035]"
                      : "border border-ink-900/8 bg-white text-ink-950 hover:-translate-y-1.5 hover:shadow-lift",
                  )}
                >
                  <div className="absolute -top-3.5 left-7 flex gap-2">
                    {popular && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-accent-500/30">
                        <Sparkle width={12} height={12} /> {t.pricing.popular}
                      </span>
                    )}
                    {offer && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-amber-400/30">
                        {t.offer.off}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[15px] font-semibold uppercase tracking-[0.14em] opacity-70">{plan.name}</h3>

                  {/* Price */}
                  <div className="mt-4">
                    {discounted !== null && (
                      <p className={cn("text-[14px]", popular ? "text-white/50" : "text-ink-400")}>
                        <span className="sr-only">{t.offer.was}: </span>
                        <s className="decoration-2">{fmtETB(plan.amount)} {plan.currency}</s>
                      </p>
                    )}
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className={cn("font-semibold tracking-tightest", custom ? "text-[2rem] sm:text-[2.25rem]" : "text-[2.75rem] sm:text-5xl")}>
                        {discounted !== null ? fmtETB(discounted) : plan.price}
                      </span>
                      {plan.currency && <span className="text-lg font-medium opacity-60">{plan.currency}</span>}
                      {!custom && <span className="w-full text-[13px] opacity-50 sm:w-auto">· {t.pricing.perProject}</span>}
                    </div>
                    {saved > 0 && (
                      <span className={cn("mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold", popular ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-50 text-emerald-700")}>
                        <Sparkle width={11} height={11} /> {t.offer.save} {fmtETB(saved)} {plan.currency}
                      </span>
                    )}
                    {custom && offer && (
                      <span className={cn("mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold", "bg-emerald-50 text-emerald-700")}>
                        <Sparkle width={11} height={11} /> {t.offer.off}
                      </span>
                    )}
                  </div>

                  <p className={cn("mt-3 text-[15px] leading-relaxed", popular ? "text-white/60" : "text-ink-500")}>{plan.desc}</p>

                  {custom ? (
                    <a
                      href="/custom-software-ethiopia"
                      className={cn(
                        "mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-all active:scale-[0.98]",
                        popular ? "bg-white text-ink-950 hover:bg-ink-100" : "bg-ink-950 text-white hover:bg-ink-800",
                      )}
                    >
                      {plan.cta} <ArrowUpRight width={17} height={17} />
                    </a>
                  ) : (
                    <Button
                      href={waLink(lang, offer?.code)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={popular ? "white" : "primary"}
                      size="lg"
                      arrow
                      className="mt-7 w-full"
                    >
                      {offer ? t.offer.claim : plan.cta}
                    </Button>
                  )}

                  <ul className="mt-8 space-y-3 border-t pt-7" style={{ borderColor: popular ? "rgba(255,255,255,0.1)" : "rgba(10,10,11,0.08)" }}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", popular ? "bg-white/10 text-white" : "bg-emerald-50 text-emerald-600")}>
                          <Check width={12} height={12} />
                        </span>
                        <span className={popular ? "text-white/85" : "text-ink-700"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {bonuses.length > 0 && (
                    <div className={cn("mt-6 rounded-2xl p-4 ring-1", popular ? "bg-amber-400/10 ring-amber-300/20" : "bg-amber-50 ring-amber-200/60")}>
                      <p className={cn("flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em]", popular ? "text-amber-300" : "text-amber-700")}>
                        <Gift width={13} height={13} /> {t.offer.bonusLabel}
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {bonuses.map((b) => (
                          <li key={b} className={cn("flex items-start gap-2.5 text-[14px] leading-snug", popular ? "text-white/85" : "text-ink-700")}>
                            <span className={cn("mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full", popular ? "bg-amber-300 text-ink-950" : "bg-amber-400 text-white")}>
                              <Check width={10} height={10} />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => setShowStarter((v) => !v)}
            className="group inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2.5 text-[13px] font-medium text-ink-700 shadow-soft transition hover:-translate-y-0.5 hover:border-ink-900/20 hover:text-ink-950"
          >
            {showStarter ? t.pricing.less : t.pricing.more}
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-950 text-white transition-transform duration-500 group-hover:rotate-90">
              {showStarter ? <X width={11} height={11} /> : <span className="text-base leading-none">+</span>}
            </span>
          </button>
        </div>

        <Reveal delay={300}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-ink-400">{t.pricing.note}</p>
        </Reveal>

        {customOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="custom-project-title">
            <button type="button" className="absolute inset-0 cursor-default" aria-label="Close custom project" onClick={() => setCustomOpen(false)} />
            <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[30px] bg-white p-6 shadow-lift sm:p-8 lg:p-10">
              <button type="button" onClick={() => setCustomOpen(false)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-ink-50 text-ink-700 transition hover:bg-ink-100 hover:text-ink-950" aria-label="Close">
                <X width={18} height={18} />
              </button>
              <div className="max-w-2xl pr-12">
                <span className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">{t.pricing.customBadge}</span>
                <h3 id="custom-project-title" className="mt-4 text-3xl font-semibold tracking-tightest text-ink-950 sm:text-5xl">{t.pricing.customPanelTitle}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-500 sm:text-lg">{t.pricing.customPanelSubtitle}</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t.pricing.customServices.map((service, i) => (
                  <a key={service.title} href={`/custom-software-ethiopia#service-${i + 1}`} className="group rounded-2xl border border-ink-900/8 bg-ink-50/60 p-5 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] text-ink-300">0{i + 1}</span>
                      <ArrowUpRight width={15} height={15} className="text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-950" />
                    </div>
                    <h4 className="mt-6 text-[16px] font-semibold text-ink-950">{service.title}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{service.desc}</p>
                  </a>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-ink-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <p className="max-w-2xl text-[14px] leading-relaxed text-white/65">{t.pricing.customFootnote}</p>
                <a href={tgLink(lang, offer?.code)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-ink-950 transition hover:bg-ink-100">
                  {t.pricing.customTalk} <ArrowUpRight width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
