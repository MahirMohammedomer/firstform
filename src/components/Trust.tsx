import { useLang } from "../context/LanguageContext";
import { CONTACT, waLink } from "../i18n";
import { Reveal } from "./Reveal";
import { Button, SectionHeader } from "./ui";
import { Eye, Link, User, Tag, WhatsAppIcon, TelegramIcon, Shield, Check } from "./Icons";

const icons = [Eye, Link, User, Tag, Shield, Check];

export function Trust() {
  const { t, lang } = useLang();

  return (
    <section id="trust" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal dir="left">
              <SectionHeader align="left" eyebrow={t.trust.eyebrow} title={t.trust.title} subtitle={t.trust.subtitle} />
            </Reveal>

            <Reveal dir="left" delay={150} className="mt-10">
              <figure className="relative overflow-hidden rounded-[28px] border border-ink-900/8 bg-gradient-to-br from-ink-50 to-white p-7 sm:p-9">
                <span className="pointer-events-none absolute -top-6 -right-2 text-[140px] leading-none font-serif text-ink-900/[0.05] select-none" aria-hidden>
                  “
                </span>
                <figcaption className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent-600">{t.trust.quoteLabel}</figcaption>
                <blockquote className="mt-4 text-[17px] leading-relaxed text-ink-800 sm:text-lg">{t.trust.quote}</blockquote>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-900/8 pt-6">
                  <a
                    href={waLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-900 ring-1 ring-ink-200 transition hover:ring-[#25d366]"
                  >
                    <WhatsAppIcon width={15} height={15} className="text-[#25d366]" /> {CONTACT.phoneDisplay}
                  </a>
                  <a
                    href={CONTACT.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink-900 ring-1 ring-ink-200 transition hover:ring-[#2aabee]"
                  >
                    <TelegramIcon width={15} height={15} className="text-[#2aabee]" /> {CONTACT.telegramHandle}
                  </a>
                </div>
              </figure>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {t.trust.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="li" key={p.title} delay={i * 90} dir="right">
                  <article className="card-lift group h-full rounded-[24px] border border-ink-900/8 bg-white p-6 sm:p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-50 text-accent-600 transition-all duration-500 group-hover:bg-accent-500 group-hover:text-white">
                      <Icon width={20} height={20} />
                    </span>
                    <h3 className="mt-6 text-[17px] font-semibold tracking-tight text-ink-950">{p.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{p.desc}</p>
                  </article>
                </Reveal>
              );
            })}
            <Reveal as="li" delay={400} dir="right" className="sm:col-span-2">
              <div className="flex flex-col items-start justify-between gap-4 rounded-[24px] bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:p-7">
                <p className="text-[15px] text-white/70">{t.trust.ctaLine}</p>
                <Button variant="white" size="md" href={CONTACT.telegram} target="_blank" rel="noopener noreferrer" arrow className="shrink-0">
                  {t.trust.cta}
                </Button>
              </div>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
